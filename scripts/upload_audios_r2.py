#!/usr/bin/env python3
"""
Sube los audios de predicaciones a Cloudflare R2 (bucket spc-audio).

- Lee predicaciones.json: solo sube los 612 archivos que el sitio usa.
- Reanudable: omite lo ya subido (compara tamaño con HEAD a R2).
- OneDrive Files On-Demand: al leer un archivo "solo en la nube" OneDrive lo
  baja automáticamente; después de subirlo se libera del disco (brctl evict)
  para no llenar los ~17 GB libres.
- Por tandas: --max N corta después de N subidas efectivas.

Uso (a las 5 AM):
  source ~/.zprofile && caffeinate -i python3 scripts/upload_audios_r2.py --max 150

Opciones:
  --max N          máximo de archivos a subir en esta corrida (default: todos)
  --solo-en-disco  subir solo los que ya están materializados (no baja nada)
  --dry-run        mostrar qué haría sin subir nada
  --sin-analisis   no analizar calidad (por defecto analiza cada archivo subido
                   y guarda scripts/reporte_calidad_5am.json)
"""
import argparse
import json
import os
import shutil
import subprocess
import sys
import time
import unicodedata
from urllib.parse import urlparse, unquote

import boto3
from botocore.config import Config

BASE = os.path.expanduser(
    "~/Library/CloudStorage/OneDrive-Personal/"
    "Audios seleccionados para subir a internet/"
    "Selección de predicaciones para subir a internet"
)
PRED_JSON = os.path.join(os.path.dirname(__file__), "..", "src", "data", "predicaciones.json")
CONTENT_TYPES = {".mp3": "audio/mpeg", ".m4a": "audio/mp4", ".wav": "audio/wav"}


def norm(s):
    return unicodedata.normalize("NFC", s).strip().lower()


def es_dataless(path):
    st = os.stat(path)
    return st.st_blocks * 512 < st.st_size * 0.5


def evict(path):
    """Libera la copia local (equivale a 'Quitar descarga' de Finder).

    OneDrive usa File Provider (no CloudDocs), así que brctl no funciona:
    se usa fileproviderctl y brctl queda de fallback por si cambia la ruta.
    """
    r = subprocess.run(["fileproviderctl", "evict", path],
                       capture_output=True, text=True)
    if r.returncode == 0:
        return True
    r = subprocess.run(["brctl", "evict", path], capture_output=True, text=True)
    return r.returncode == 0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--max", type=int, default=0, help="máximo de subidas en esta corrida")
    ap.add_argument("--solo-en-disco", action="store_true")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--sin-analisis", action="store_true")
    args = ap.parse_args()

    analisis = []
    if not args.sin_analisis:
        try:
            from analizar_audios import ffprobe_info, volumen_muestra
        except ImportError:
            args.sin_analisis = True

    for var in ("R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET", "R2_ENDPOINT"):
        if not os.environ.get(var):
            sys.exit(f"Falta la variable {var} — ejecutar: source ~/.zprofile")

    s3 = boto3.client(
        "s3",
        endpoint_url=os.environ["R2_ENDPOINT"],
        aws_access_key_id=os.environ["R2_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["R2_SECRET_ACCESS_KEY"],
        config=Config(retries={"max_attempts": 5, "mode": "adaptive"}),
    )
    bucket = os.environ["R2_BUCKET"]

    # 1. Episodios que el sitio espera → clave R2
    episodios = {}

    def walk(o):
        if isinstance(o, dict):
            if "archivo" in o and "url" in o:
                key = unquote(urlparse(o["url"]).path.lstrip("/"))
                episodios[norm(o["archivo"])] = key
            for v in o.values():
                walk(v)
        elif isinstance(o, list):
            for v in o:
                walk(v)

    walk(json.load(open(PRED_JSON)))

    # 2. Archivos locales
    locales = {}
    for root, _, files in os.walk(BASE):
        for f in files:
            if not f.startswith("."):
                locales.setdefault(norm(f), os.path.join(root, f))

    normalizados = os.path.join(os.path.dirname(os.path.abspath(__file__)), "normalizados")

    pendientes = []  # (path, key, size, dataless)
    for k, key in episodios.items():
        if k in locales:
            path = locales[k]
            # si existe versión normalizada (volumen corregido), subir esa
            n = os.path.join(normalizados, os.path.basename(path))
            if os.path.exists(n) and os.path.getsize(n) > 0:
                path = n
            pendientes.append((path, key, os.stat(path).st_size, es_dataless(path)))

    # Primero los que ya están en disco (no gastan datos de bajada)
    pendientes.sort(key=lambda t: (t[3], t[2]))
    if args.solo_en_disco:
        pendientes = [t for t in pendientes if not t[3]]

    subidos = omitidos = errores = 0
    bytes_subidos = 0
    inicio = time.time()

    for i, (path, key, size, dataless) in enumerate(pendientes, 1):
        if args.max and subidos >= args.max:
            print(f"\n— Tope de {args.max} subidas alcanzado —")
            break
        nombre = os.path.basename(path)
        if dataless:
            # brctl/fileproviderctl no liberan archivos de OneDrive en este
            # macOS: los materializados se acumulan. Guardián de disco:
            libre_gb = shutil.disk_usage("/").free / 1e9
            if libre_gb < 3.0:
                print(f"\n— Disco casi lleno ({libre_gb:.1f} GB libres). "
                      "Liberar espacio en Finder (clic derecho en la carpeta "
                      "de audios → Quitar descarga) y relanzar. —")
                break
        try:
            head = s3.head_object(Bucket=bucket, Key=key)
            if head["ContentLength"] == size:
                omitidos += 1
                continue
        except s3.exceptions.ClientError:
            pass  # no existe → subir

        mb = size / 1e6
        tag = " [nube→disco]" if dataless else ""
        if args.dry_run:
            print(f"[{i}/{len(pendientes)}] SUBIRÍA {nombre} ({mb:.0f} MB){tag} → {key}")
            subidos += 1
            continue

        print(f"[{i}/{len(pendientes)}] {nombre} ({mb:.0f} MB){tag} ... ", end="", flush=True)
        try:
            ext = os.path.splitext(path)[1].lower()
            s3.upload_file(
                path, bucket, key,
                ExtraArgs={"ContentType": CONTENT_TYPES.get(ext, "application/octet-stream")},
            )
            subidos += 1
            bytes_subidos += size
            if not args.sin_analisis:
                try:  # analizar ANTES de liberar del disco
                    info = ffprobe_info(path)
                    medio, pico = volumen_muestra(path, info["dur_s"]) if info else (None, None)
                    problemas = []
                    if info:
                        if info["bitrate_kbps"] and info["bitrate_kbps"] < 64:
                            problemas.append(f"bitrate bajo ({info['bitrate_kbps']} kbps)")
                        if medio is not None and medio < -30:
                            problemas.append(f"volumen muy bajo ({medio} dB)")
                        if pico is not None and pico > -0.5:
                            problemas.append(f"posible saturación (pico {pico} dB)")
                        if info["dur_s"] < 60:
                            problemas.append(f"muy corto ({info['dur_s']:.0f} s)")
                    analisis.append({"archivo": nombre, **(info or {}),
                                     "vol_medio_db": medio, "vol_pico_db": pico,
                                     "problemas": problemas})
                except Exception:
                    pass
            if dataless:
                evict(path)  # liberar el disco de nuevo
            gb = bytes_subidos / 1e9
            mins = (time.time() - inicio) / 60
            print(f"OK  (total corrida: {gb:.2f} GB en {mins:.0f} min)")
        except Exception as e:
            errores += 1
            print(f"ERROR: {e}")
            if errores >= 10:
                print("Demasiados errores seguidos — cortando (¿se cayó la conexión?)")
                break

    if analisis:
        rep = os.path.join(os.path.dirname(__file__), "reporte_calidad_5am.json")
        previos = []
        if os.path.exists(rep):
            previos = json.load(open(rep)).get("resultados", [])
        ya = {r["archivo"] for r in previos}
        previos += [a for a in analisis if a["archivo"] not in ya]
        json.dump({"resultados": previos,
                   "sospechosos": [r for r in previos if r.get("problemas")]},
                  open(rep, "w"), ensure_ascii=False, indent=1)
        con_prob = len([a for a in analisis if a["problemas"]])
        print(f"\nCalidad: {con_prob} sospechosos en esta corrida → {rep}")

    print("\n══════════ RESUMEN ══════════")
    print(f"Subidos:  {subidos}  ({bytes_subidos/1e9:.2f} GB)")
    print(f"Omitidos (ya estaban en R2): {omitidos}")
    print(f"Errores:  {errores}")
    print(f"Pendientes totales del sitio: {len(pendientes)}")
    print(f"Tiempo: {(time.time()-inicio)/60:.0f} min")


if __name__ == "__main__":
    main()
