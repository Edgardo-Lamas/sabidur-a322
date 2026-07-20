#!/usr/bin/env python3
"""
Normaliza el volumen de los audios marcados "volumen muy bajo" en el reporte
de calidad (loudnorm EBU R128, -16 LUFS — estándar para voz/podcast).

- NO toca los originales de OneDrive: escribe copias en scripts/normalizados/
- El script de subida usa automáticamente la copia normalizada si existe.
- Solo procesa archivos ya materializados en disco (no baja nada).

Uso:  python3 scripts/normalizar_audios.py
"""
import json
import os
import subprocess
import unicodedata

BASE = os.path.expanduser(
    "~/Library/CloudStorage/OneDrive-Personal/"
    "Audios seleccionados para subir a internet/"
    "Selección de predicaciones para subir a internet"
)
DIR = os.path.dirname(os.path.abspath(__file__))
DESTINO = os.path.join(DIR, "normalizados")
REPORTES = [os.path.join(DIR, "reporte_calidad_audios.json"),
            os.path.join(DIR, "reporte_calidad_5am.json")]

CODECS = {".mp3": ["-c:a", "libmp3lame", "-b:a", "128k"],
          ".m4a": ["-c:a", "aac", "-b:a", "128k"],
          ".wav": ["-c:a", "pcm_s16le"]}


def norm(s):
    return unicodedata.normalize("NFC", s).strip().lower()


def es_dataless(path):
    st = os.stat(path)
    return st.st_blocks * 512 < st.st_size * 0.5


def main():
    os.makedirs(DESTINO, exist_ok=True)

    bajos = {}
    for rep in REPORTES:
        if not os.path.exists(rep):
            continue
        for r in json.load(open(rep)).get("resultados", []):
            v = r.get("vol_medio_db")
            if v is not None and v < -30:
                bajos[norm(r["archivo"])] = r["archivo"]
    print(f"Archivos con volumen muy bajo en reportes: {len(bajos)}")

    locales = {}
    for root, _, files in os.walk(BASE):
        for f in files:
            if not f.startswith("."):
                locales.setdefault(norm(f), os.path.join(root, f))

    hechos = saltados = errores = 0
    for k, nombre in sorted(bajos.items()):
        if k not in locales:
            continue
        src = locales[k]
        dst = os.path.join(DESTINO, os.path.basename(src))
        if os.path.exists(dst) and os.path.getsize(dst) > 0:
            saltados += 1
            continue
        if es_dataless(src):
            print(f"· {nombre}: solo en nube — se normalizará en otra pasada")
            saltados += 1
            continue
        ext = os.path.splitext(src)[1].lower()
        cmd = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", src,
               "-af", "loudnorm=I=-16:TP=-1.5:LRA=11",
               *CODECS.get(ext, ["-c:a", "libmp3lame", "-b:a", "128k"]), dst]
        print(f"Normalizando {nombre} ... ", end="", flush=True)
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode == 0:
            hechos += 1
            print("OK")
        else:
            errores += 1
            print(f"ERROR: {r.stderr[-200:]}")
            if os.path.exists(dst):
                os.remove(dst)

    print(f"\nNormalizados: {hechos} · Saltados: {saltados} · Errores: {errores}")
    print(f"Copias en: {DESTINO}")


if __name__ == "__main__":
    main()
