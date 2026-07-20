#!/usr/bin/env python3
"""
Analiza la calidad de los audios de predicaciones que están materializados
en disco (NO baja nada de OneDrive — los "solo en la nube" se omiten).

Por archivo:
  - ffprobe: bitrate, sample rate, canales, duración (instantáneo, solo header)
  - ffmpeg volumedetect sobre una muestra de 60 s del medio: volumen medio y pico

Marca sospechosos:
  - bitrate < 64 kbps  → calidad baja
  - sample rate < 22050 Hz
  - volumen medio < -30 dB → se escucha muy bajo
  - pico > -0.5 dB → probable saturación/clipping
  - duración < 60 s → archivo posiblemente cortado

Salida: scripts/reporte_calidad_audios.json + resumen por consola.
Uso:  python3 scripts/analizar_audios.py [--todos]  (--todos incluye dataless: BAJA DATOS)
"""
import argparse
import json
import os
import re
import subprocess
import sys
import unicodedata

BASE = os.path.expanduser(
    "~/Library/CloudStorage/OneDrive-Personal/"
    "Audios seleccionados para subir a internet/"
    "Selección de predicaciones para subir a internet"
)
PRED_JSON = os.path.join(os.path.dirname(__file__), "..", "src", "data", "predicaciones.json")
SALIDA = os.path.join(os.path.dirname(__file__), "reporte_calidad_audios.json")


def norm(s):
    return unicodedata.normalize("NFC", s).strip().lower()


def es_dataless(path):
    st = os.stat(path)
    return st.st_blocks * 512 < st.st_size * 0.5


def ffprobe_info(path):
    r = subprocess.run(
        ["ffprobe", "-v", "quiet", "-print_format", "json",
         "-show_format", "-show_streams", path],
        capture_output=True, text=True, timeout=60,
    )
    if r.returncode != 0:
        return None
    d = json.loads(r.stdout)
    fmt = d.get("format", {})
    audio = next((s for s in d.get("streams", []) if s.get("codec_type") == "audio"), {})
    return {
        "dur_s": float(fmt.get("duration", 0) or 0),
        "bitrate_kbps": round(int(fmt.get("bit_rate", 0) or 0) / 1000),
        "sample_rate": int(audio.get("sample_rate", 0) or 0),
        "canales": int(audio.get("channels", 0) or 0),
        "codec": audio.get("codec_name", "?"),
    }


def volumen_muestra(path, dur_s):
    """volumedetect sobre 60 s del medio del archivo."""
    inicio = max(0, dur_s / 2 - 30)
    r = subprocess.run(
        ["ffmpeg", "-hide_banner", "-ss", str(int(inicio)), "-t", "60",
         "-i", path, "-af", "volumedetect", "-f", "null", "-"],
        capture_output=True, text=True, timeout=120,
    )
    medio = re.search(r"mean_volume:\s*(-?[\d.]+) dB", r.stderr)
    pico = re.search(r"max_volume:\s*(-?[\d.]+) dB", r.stderr)
    return (
        float(medio.group(1)) if medio else None,
        float(pico.group(1)) if pico else None,
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--todos", action="store_true", help="incluir los solo-en-nube (BAJA DATOS)")
    args = ap.parse_args()

    episodios = {}

    def walk(o):
        if isinstance(o, dict):
            if "archivo" in o and "url" in o:
                episodios[norm(o["archivo"])] = o.get("titulo", o["archivo"])
            for v in o.values():
                walk(v)
        elif isinstance(o, list):
            for v in o:
                walk(v)

    walk(json.load(open(PRED_JSON)))

    locales = {}
    for root, _, files in os.walk(BASE):
        for f in files:
            if not f.startswith("."):
                locales.setdefault(norm(f), os.path.join(root, f))

    objetivo = [(locales[k], titulo) for k, titulo in episodios.items() if k in locales]
    resultados, sospechosos, omitidos_nube, errores = [], [], 0, 0

    for i, (path, titulo) in enumerate(objetivo, 1):
        if not args.todos and es_dataless(path):
            omitidos_nube += 1
            continue
        nombre = os.path.basename(path)
        try:
            info = ffprobe_info(path)
            if info is None:
                raise RuntimeError("ffprobe falló (¿archivo corrupto?)")
            medio, pico = volumen_muestra(path, info["dur_s"])
            problemas = []
            if info["bitrate_kbps"] and info["bitrate_kbps"] < 64:
                problemas.append(f"bitrate bajo ({info['bitrate_kbps']} kbps)")
            if info["sample_rate"] and info["sample_rate"] < 22050:
                problemas.append(f"sample rate bajo ({info['sample_rate']} Hz)")
            if medio is not None and medio < -30:
                problemas.append(f"volumen muy bajo (medio {medio} dB)")
            if pico is not None and pico > -0.5:
                problemas.append(f"posible saturación (pico {pico} dB)")
            if info["dur_s"] < 60:
                problemas.append(f"muy corto ({info['dur_s']:.0f} s)")
            fila = {"archivo": nombre, "titulo": titulo, **info,
                    "vol_medio_db": medio, "vol_pico_db": pico, "problemas": problemas}
            resultados.append(fila)
            if problemas:
                sospechosos.append(fila)
                print(f"[{i}/{len(objetivo)}] ⚠️  {nombre}: {'; '.join(problemas)}")
            elif i % 25 == 0:
                print(f"[{i}/{len(objetivo)}] ... analizando (último OK: {nombre})")
        except Exception as e:
            errores += 1
            resultados.append({"archivo": nombre, "titulo": titulo, "error": str(e)})
            print(f"[{i}/{len(objetivo)}] ❌ {nombre}: {e}")

    json.dump({"analizados": len(resultados), "sospechosos": sospechosos,
               "resultados": resultados},
              open(SALIDA, "w"), ensure_ascii=False, indent=1)

    print("\n══════════ RESUMEN CALIDAD ══════════")
    print(f"Analizados: {len([r for r in resultados if 'error' not in r])}")
    print(f"Sospechosos: {len(sospechosos)}")
    print(f"Errores/corruptos: {errores}")
    print(f"Omitidos (solo en nube, sin --todos): {omitidos_nube}")
    print(f"Reporte completo: {SALIDA}")


if __name__ == "__main__":
    main()
