# -*- coding: utf-8 -*-
"""
Genera una imagen OG tipográfica 1200x630 con la paleta del sitio, SIN FLUX.

Para qué existe: la cuenta de BFL puede quedarse sin crédito (pasó el 2026-08-26,
la API devuelve 402 "Insufficient credits" con la clave válida). Esto no depende
de ninguna API y da una tarjeta on-brand: navy, dorado, Georgia.

Uso: editar el bloque TEXTOS de abajo y ejecutar. Después SIEMPRE regrabar a
JPEG baseline, que es lo que WhatsApp sabe decodificar:

    python3 scripts/generate-og-tipografica.py
    ffmpeg -y -i /tmp/og-lucha.png -q:v 2 public/img/<slug>-og.jpg
    file public/img/<slug>-og.jpg      # tiene que decir "baseline"

Primera salida: img/todo-aquel-que-lucha-og.jpg (ensayo del 2026-08-26).
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import random, math

W, H = 1200, 630
NAVY   = (26, 29, 35)
GOLD   = (197, 160, 89)
GOLD_D = (122, 92, 30)
CREAM  = (247, 244, 237)
GRAY   = (150, 152, 158)

G      = "/System/Library/Fonts/Supplemental/Georgia.ttf"
GB     = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
GI     = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"
TNR    = "/System/Library/Fonts/Supplemental/Times New Roman.ttf"

f = lambda p, s: ImageFont.truetype(p, s)

img = Image.new("RGB", (W, H), NAVY)
d = ImageDraw.Draw(img)

# --- degradado sutil: un halo cálido arriba a la izquierda ---
grad = Image.new("L", (W, H), 0)
gd = ImageDraw.Draw(grad)
for r in range(760, 0, -8):
    v = int(40 * (1 - r / 760.0) ** 1.6)
    gd.ellipse([330 - r, 40 - r, 330 + r, 40 + r], fill=v)
grad = grad.filter(ImageFilter.GaussianBlur(60))
img = Image.composite(Image.new("RGB", (W, H), (58, 52, 42)), img, grad)
d = ImageDraw.Draw(img)

# --- grano de lienzo ---
rnd = random.Random(925)
noise = Image.new("L", (W, H))
noise.putdata([128 + rnd.randint(-9, 9) for _ in range(W * H)])
img = Image.blend(img, Image.merge("RGB", (noise, noise, noise)), 0.045)
d = ImageDraw.Draw(img)


# --- marco fino dorado ---
d.rectangle([28, 28, W - 29, H - 29], outline=(70, 66, 58), width=1)

# --- eyebrow ---
eb = "SABIDURÍA PARA EL CORAZÓN"
fe = f(G, 17)
sp = "".join(ch + "  " for ch in eb).rstrip()
d.text((W // 2, 104), sp, font=fe, fill=GOLD_D, anchor="mm")

# --- filete corto ---
d.line([(W // 2 - 46, 132), (W // 2 + 46, 132)], fill=GOLD, width=1)

# --- título ---
d.text((W // 2, 232), "Todo aquel", font=f(G, 84), fill=CREAM, anchor="mm")
d.text((W // 2, 330), "que lucha", font=f(G, 84), fill=CREAM, anchor="mm")

# --- rombo + reglas ---
cy = 412
d.line([(W // 2 - 240, cy), (W // 2 - 26, cy)], fill=(88, 82, 70), width=1)
d.line([(W // 2 + 26, cy), (W // 2 + 240, cy)], fill=(88, 82, 70), width=1)
d.polygon([(W // 2, cy - 7), (W // 2 + 7, cy), (W // 2, cy + 7), (W // 2 - 7, cy)], fill=GOLD)

# --- griego ---
gk = Image.new("RGBA", (W, H), (0, 0, 0, 0))
ImageDraw.Draw(gk).text((W // 2, 462), "ὁ ἀγωνιζόμενος", font=f(TNR, 40),
                        fill=GOLD + (190,), anchor="mm")
img = Image.alpha_composite(img.convert("RGBA"), gk).convert("RGB")
d = ImageDraw.Draw(img)

# --- referencia ---
d.text((W // 2, 512), "1 Corintios 9:25a", font=f(GB, 28), fill=GOLD, anchor="mm")
d.text((W // 2, 556), "Estudio de 1 Corintios 9:24-27  ·  Segundo ensayo",
       font=f(GI, 22), fill=GRAY, anchor="mm")

img.save("/tmp/og-lucha.png")
print("listo /tmp/og-lucha.png", img.size)
