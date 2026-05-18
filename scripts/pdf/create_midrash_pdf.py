#!/usr/bin/env python3
"""
PDF: El Midrash — La Palabra que Siempre Tiene Más que Decir
Artículo completo con ilustraciones FLUX por capítulo.
Paleta: carmesí profundo + oro vino + pergamino cálido.
"""
import os, fitz
from PIL import Image as PILImage, ImageEnhance
import numpy as np
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, PageBreak, Image
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.pdfgen import canvas as rl_canvas

W, H = A4

BASE          = "/Users/edgardolamas/Desktop/Trabajos de edicion/WEBS/Sabiduria para el corazon"
IMG_DIR       = f"{BASE}/public/img/pdf"
COVER_IMG     = f"{IMG_DIR}/midrash_cover.jpg"
TEXTURE_IMG   = f"{IMG_DIR}/midrash_texture.jpg"
TEXTURE_READY = "/tmp/midrash_tex_ready.png"
ILLUS_1       = f"{IMG_DIR}/midrash_illus_1.jpg"
ILLUS_2       = f"{IMG_DIR}/midrash_illus_2.jpg"
ILLUS_3       = f"{IMG_DIR}/midrash_illus_3.jpg"
ILLUS_4       = f"{IMG_DIR}/midrash_illus_4.jpg"
OUTPUT        = f"{BASE}/public/pdf/El-Midrash.pdf"
TMP_COVER     = "/tmp/midrash_cover_page.pdf"
TMP_CONTENT   = "/tmp/midrash_content_pages.pdf"

# Paleta carmesí — identidad visual El Midrash
CRIMSON_DEEP  = (55, 10, 18)
CRIMSON_MID   = (100, 20, 30)
WINE_GOLD     = (190, 148, 48)
GOLD_LIGHT    = (215, 182, 80)
PARCHMENT     = (242, 232, 210)
CREAM         = (252, 248, 238)

FONT_DIR = "/System/Library/Fonts/Supplemental/"
try:
    pdfmetrics.registerFont(TTFont("Georgia",        FONT_DIR + "Georgia.ttf"))
    pdfmetrics.registerFont(TTFont("Georgia-Bold",   FONT_DIR + "Georgia Bold.ttf"))
    pdfmetrics.registerFont(TTFont("Georgia-Italic", FONT_DIR + "Georgia Italic.ttf"))
    registerFontFamily("Georgia", normal="Georgia", bold="Georgia-Bold", italic="Georgia-Italic")
    BODY_FONT = "Georgia"; BOLD_FONT = "Georgia-Bold"; ITAL_FONT = "Georgia-Italic"
except:
    BODY_FONT = BOLD_FONT = ITAL_FONT = "Times-Roman"
try:
    pdfmetrics.registerFont(TTFont("Baskerville",      "/System/Library/Fonts/Supplemental/Baskerville.ttc", subfontIndex=0))
    pdfmetrics.registerFont(TTFont("Baskerville-Bold", "/System/Library/Fonts/Supplemental/Baskerville.ttc", subfontIndex=1))
    TITLE_FONT = "Baskerville"; TITLE_BOLD = "Baskerville-Bold"
except:
    TITLE_FONT = TITLE_BOLD = BOLD_FONT
try:
    pdfmetrics.registerFont(TTFont("SFHebrew", "/System/Library/Fonts/SFHebrew.ttf"))
    HEB_FONT = "SFHebrew"
except:
    HEB_FONT = BODY_FONT

import re as _re
_HEB_BLOCK = _re.compile(r'[֐-׿יִ-ﭏ]+')

def heb(text):
    """Wrap Hebrew character runs in the SFHebrew font tag."""
    return _HEB_BLOCK.sub(lambda m: f'<font name="{HEB_FONT}">{m.group()}</font>', text)


def prepare_texture():
    tex = PILImage.open(TEXTURE_IMG).convert("RGBA")
    tex = tex.resize((595, 842), PILImage.LANCZOS)
    rgb = tex.convert("RGB")
    rgb = ImageEnhance.Brightness(rgb).enhance(0.86)
    rgb = ImageEnhance.Color(rgb).enhance(0.60)
    # Tinte carmesí muy sutil
    arr = np.array(rgb, dtype=np.float32)
    arr[:, :, 0] = np.clip(arr[:, :, 0] * 1.08, 0, 255)
    arr[:, :, 2] = np.clip(arr[:, :, 2] * 0.92, 0, 255)
    rgb = PILImage.fromarray(arr.astype(np.uint8))
    tex = rgb.convert("RGBA")
    arr2 = np.array(tex, dtype=np.float32)
    arr2[:, :, 3] = 52
    tex = PILImage.fromarray(np.clip(arr2, 0, 255).astype(np.uint8))
    tex.save(TEXTURE_READY)


def build_cover():
    print("Generando portada...")
    img = PILImage.open(COVER_IMG).convert("RGB").resize((595, 842), PILImage.LANCZOS)
    bg = "/tmp/midrash_cover_bg.jpg"; img.save(bg, quality=95)
    c = rl_canvas.Canvas(TMP_COVER, pagesize=A4)
    c.drawImage(bg, 0, 0, width=W, height=H)
    # Gradiente superior
    for i in range(170):
        c.setFillColorRGB(0.18, 0.03, 0.05, alpha=0.82*(1-i/170)**0.65)
        c.rect(0, H-i-1, W, 1, fill=1, stroke=0)
    # Gradiente inferior
    for i in range(260):
        c.setFillColorRGB(0.14, 0.02, 0.04, alpha=0.90*(1-i/260)**0.50)
        c.rect(0, i, W, 1, fill=1, stroke=0)
    # Franja dorada superior
    c.setFillColorRGB(*[x/255 for x in WINE_GOLD], alpha=0.88)
    c.rect(0, H-38, W, 38, fill=1, stroke=0)
    c.setFillColorRGB(*[x/255 for x in CRIMSON_DEEP])
    c.setFont(BODY_FONT, 8)
    c.drawCentredString(W/2, H-24, "S A B I D U R Í A   P A R A   E L   C O R A Z Ó N")
    c.setFont(BODY_FONT, 7)
    c.drawCentredString(W/2, H-33, "L I B R O S   S A G R A D O S   D E   I S R A E L")
    # Subtítulo serie
    c.setFillColorRGB(*[x/255 for x in GOLD_LIGHT], alpha=0.85)
    c.setFont(BODY_FONT, 8)
    c.drawCentredString(W/2, H-62, "T O R Á   ·   T A N A J   ·   T A L M U D   ·   M I S H N Á   ·   M I D R A S H")
    c.setStrokeColorRGB(*[x/255 for x in WINE_GOLD], alpha=0.65); c.setLineWidth(0.8)
    c.line(60, H-72, W-60, H-72)
    # Título principal
    c.setFillColorRGB(1, 1, 1, alpha=0.97); c.setFont(TITLE_BOLD, 58)
    c.drawCentredString(W/2, H-132, "El Midrash")
    c.setStrokeColorRGB(*[x/255 for x in WINE_GOLD], alpha=0.80); c.setLineWidth(1.2)
    c.line(W/2-120, H-146, W/2+120, H-146)
    c.setFillColorRGB(*[x/255 for x in GOLD_LIGHT], alpha=0.95); c.setFont(TITLE_FONT, 16)
    c.drawCentredString(W/2, H-168, "La Palabra que Siempre Tiene Más que Decir")
    c.setFillColorRGB(1, 1, 1, alpha=0.68); c.setFont(BODY_FONT, 9)
    c.drawCentredString(W/2, H-190, "Método, Historia y Significado Teológico de la Exégesis Rabínica")
    # Autor y fecha (inferior)
    c.setStrokeColorRGB(*[x/255 for x in WINE_GOLD], alpha=0.45); c.setLineWidth(0.6)
    c.line(80, 112, W-80, 112)
    c.setFillColorRGB(*[x/255 for x in GOLD_LIGHT], alpha=0.90); c.setFont(BOLD_FONT, 10)
    c.drawCentredString(W/2, 92, "Edgardo Lamas")
    c.setFillColorRGB(1, 1, 1, alpha=0.48); c.setFont(BODY_FONT, 8)
    c.drawCentredString(W/2, 78, "Mayo 2026")
    c.showPage(); c.save()
    print("  Portada OK")


def build_metadata(c):
    c.setFillColorRGB(*[x/255 for x in CRIMSON_DEEP]); c.rect(0, 0, W, H, fill=1, stroke=0)
    try:
        tex = PILImage.open(TEXTURE_IMG).convert("RGBA"); arr = np.array(tex, dtype=np.float32)
        arr[:, :, 3] = 25; tex = PILImage.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
        tex = tex.resize((595, 842), PILImage.LANCZOS); tp = "/tmp/midrash_tex_dark.png"; tex.save(tp)
        c.drawImage(tp, 0, 0, width=W, height=H, mask='auto')
    except: pass
    c.setStrokeColorRGB(*[x/255 for x in WINE_GOLD], alpha=0.70); c.setLineWidth(1.5)
    c.rect(28, 28, W-56, H-56, fill=0, stroke=1)
    c.setLineWidth(0.5); c.setStrokeColorRGB(*[x/255 for x in WINE_GOLD], alpha=0.30)
    c.rect(34, 34, W-68, H-68, fill=0, stroke=1)
    c.setFillColorRGB(*[x/255 for x in WINE_GOLD]); c.setFont(TITLE_BOLD, 26)
    c.drawCentredString(W/2, H-88, "El Midrash")
    c.setFont(TITLE_FONT, 12)
    c.drawCentredString(W/2, H-108, "La Palabra que Siempre Tiene Más que Decir")
    c.setStrokeColorRGB(*[x/255 for x in WINE_GOLD], alpha=0.45); c.setLineWidth(0.8)
    c.line(80, H-122, W-80, H-122)
    info = [
        ("Serie",        "Libros Sagrados del Pueblo de Israel"),
        ("Número",  "V de la serie"),
        ("Autor",        "Edgardo Lamas"),
        ("Colaboración", "Claude (Anthropic) — IA Especializada"),
        ("Fecha",        "Mayo 2026"),
        ("Fuentes",      "Neusner, Porton, Zunz, Jaffé, Encyclopaedia Judaica"),
        ("Publicación", "Biblioteca Virtual Sabiduría para el Corazón"),
    ]
    y = H-162
    for label, value in info:
        c.setFillColorRGB(*[x/255 for x in WINE_GOLD], alpha=0.70); c.setFont(BOLD_FONT, 8)
        c.drawString(70, y, label.upper())
        c.setFillColorRGB(1, 1, 1, alpha=0.85); c.setFont(BODY_FONT, 9)
        c.drawString(185, y, value)
        y -= 22
    c.setStrokeColorRGB(*[x/255 for x in WINE_GOLD], alpha=0.25); c.setLineWidth(0.5)
    c.line(70, y-10, W-70, y-10)
    c.setFillColorRGB(*[x/255 for x in GOLD_LIGHT], alpha=0.60); c.setFont(ITAL_FONT, 8)
    c.drawCentredString(W/2, y-26, "Este estudio examina el Midrash como método, historia y corpus literario,")
    c.drawCentredString(W/2, y-38, "desde una perspectiva histórico-teológica cristiana reformada.")
    c.setFillColorRGB(*[x/255 for x in WINE_GOLD], alpha=0.85); c.setFont(ITAL_FONT, 10)
    c.drawCentredString(W/2, H//2-26, "«El Midrash es la búsqueda del alma del texto,")
    c.drawCentredString(W/2, H//2-40, "la convicción de que la palabra de Dios contiene")
    c.drawCentredString(W/2, H//2-54, "siempre más de lo que una sola lectura puede agotar.»")
    c.setFont(BODY_FONT, 8); c.setFillColorRGB(*[x/255 for x in GOLD_LIGHT], alpha=0.50)
    c.drawCentredString(W/2, H//2-70, "— Edgardo Lamas")
    c.setFillColorRGB(*[x/255 for x in WINE_GOLD], alpha=0.40); c.setFont(BODY_FONT, 7)
    c.drawCentredString(W/2, 45, "sabiduriadelcorazon.com")


def make_page_bg(canvas_obj, doc):
    canvas_obj.saveState()
    # 1. Fondo crema sólido
    canvas_obj.setFillColorRGB(0.988, 0.972, 0.934)
    canvas_obj.rect(0, 0, W, H, fill=1, stroke=0)
    # 2. Textura como marca de agua ~20% opacidad
    canvas_obj.drawImage(TEXTURE_READY, 0, 0, width=W, height=H, mask='auto')
    # 3. Franja lateral decorativa carmesí
    canvas_obj.setFillColorRGB(*[x/255 for x in WINE_GOLD], alpha=0.50)
    canvas_obj.rect(28, 50, 2.5, H-100, fill=1, stroke=0)
    canvas_obj.restoreState()


def make_page_decorations(canvas_obj, doc):
    canvas_obj.saveState()
    # Header
    canvas_obj.setFillColorRGB(*[x/255 for x in CRIMSON_DEEP], alpha=0.90)
    canvas_obj.rect(0, H-32, W, 32, fill=1, stroke=0)
    canvas_obj.setFillColorRGB(*[x/255 for x in WINE_GOLD])
    canvas_obj.setFont(BOLD_FONT, 7)
    canvas_obj.drawString(44, H-14, "EL MIDRASH")
    canvas_obj.setFont(BODY_FONT, 7)
    canvas_obj.setFillColorRGB(*[x/255 for x in GOLD_LIGHT], alpha=0.80)
    canvas_obj.drawCentredString(W/2, H-14, "La Palabra que Siempre Tiene Más que Decir")
    canvas_obj.setFont(BODY_FONT, 7)
    canvas_obj.setFillColorRGB(*[x/255 for x in WINE_GOLD], alpha=0.90)
    canvas_obj.drawRightString(W-44, H-14, f"Pág. {doc.page}")
    # Footer
    canvas_obj.setFillColorRGB(*[x/255 for x in CRIMSON_DEEP], alpha=0.85)
    canvas_obj.rect(0, 0, W, 28, fill=1, stroke=0)
    canvas_obj.setFillColorRGB(*[x/255 for x in WINE_GOLD], alpha=0.55)
    canvas_obj.setLineWidth(0.5)
    canvas_obj.line(44, 28, W-44, 28)
    canvas_obj.setFillColorRGB(*[x/255 for x in GOLD_LIGHT], alpha=0.55)
    canvas_obj.setFont(ITAL_FONT, 7)
    canvas_obj.drawCentredString(W/2, 10, "Biblioteca Virtual Sabiduría para el Corazón  ·  sabiduriadelcorazon.com")
    canvas_obj.restoreState()


def s(name, **kw):
    defaults = dict(fontName=BODY_FONT, fontSize=10, leading=17,
                    textColor=colors.HexColor("#1A0506"),
                    spaceAfter=7, spaceBefore=0, alignment=TA_JUSTIFY)
    defaults.update(kw)
    return ParagraphStyle(name, **defaults)


def build_content():
    print("Generando contenido...")
    prepare_texture()

    G = colors.HexColor("#BE9430")

    styles = {
        "chap": s("chap", fontName=TITLE_BOLD, fontSize=17, leading=22,
                  textColor=colors.HexColor("#2A0408"), spaceBefore=20, spaceAfter=4,
                  alignment=TA_LEFT),
        "chap_sub": s("chap_sub", fontName=TITLE_FONT, fontSize=12, leading=16,
                      textColor=colors.HexColor("#4A0C12"), spaceBefore=2, spaceAfter=12,
                      alignment=TA_LEFT),
        "sec": s("sec", fontName=BOLD_FONT, fontSize=11, leading=15,
                 textColor=colors.HexColor("#4A0C12"), spaceBefore=14, spaceAfter=5,
                 alignment=TA_LEFT),
        "body": s("body", fontSize=10, leading=17, spaceAfter=7,
                  textColor=colors.HexColor("#1A0506"), alignment=TA_JUSTIFY),
        "ital": s("ital", fontName=ITAL_FONT, fontSize=10, leading=17,
                  textColor=colors.HexColor("#2A0C10"), spaceAfter=7, alignment=TA_JUSTIFY),
        "quote": s("quote", fontName=ITAL_FONT, fontSize=9.5, leading=15,
                   textColor=colors.HexColor("#4A0C12"), leftIndent=28, rightIndent=28,
                   spaceBefore=6, spaceAfter=6, alignment=TA_JUSTIFY),
        "label": s("label", fontName=BOLD_FONT, fontSize=8, leading=12,
                   textColor=colors.HexColor("#4A0C12"), spaceAfter=3, alignment=TA_LEFT),
        "meta": s("meta", fontSize=9, leading=14, textColor=colors.HexColor("#4A0C12"),
                  spaceAfter=4, alignment=TA_LEFT),
        "title_main": s("title_main", fontName=TITLE_BOLD, fontSize=22, leading=28,
                        textColor=colors.HexColor("#2A0408"), spaceBefore=18, spaceAfter=4,
                        alignment=TA_LEFT),
        "title_sub": s("title_sub", fontName=TITLE_FONT, fontSize=13, leading=18,
                       textColor=colors.HexColor("#4A0C12"), spaceBefore=2, spaceAfter=14,
                       alignment=TA_LEFT),
        "editorial": s("editorial", fontName=ITAL_FONT, fontSize=9.5, leading=15,
                       textColor=colors.HexColor("#2A0C10"), leftIndent=18, rightIndent=18,
                       spaceAfter=7, alignment=TA_JUSTIFY),
        "biblio": s("biblio", fontName=ITAL_FONT, fontSize=9, leading=14,
                    textColor=colors.HexColor("#4A0C12"), leftIndent=20, spaceAfter=3,
                    alignment=TA_LEFT),
    }

    def HR():
        from reportlab.platypus import HRFlowable
        return HRFlowable(width="85%", thickness=0.6, color=G, spaceAfter=10, spaceBefore=6)

    def illus(path, caption=None):
        items = [Spacer(1, 8), Image(path, width=W-110, height=(W-110)/3.17, kind='proportional')]
        if caption:
            items.append(Paragraph(f"<i>{caption}</i>", styles["quote"]))
        items.append(Spacer(1, 8))
        return items

    doc = BaseDocTemplate(TMP_CONTENT, pagesize=A4, leftMargin=55, rightMargin=44,
                          topMargin=48, bottomMargin=42)
    frame = Frame(doc.leftMargin, doc.bottomMargin,
                  doc.width, doc.height + doc.topMargin - 48,
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame],
                                       onPage=make_page_bg,
                                       onPageEnd=make_page_decorations)])

    story = []

    # ── PORTADILLA INTERNA ──────────────────────────────────────────────────
    story.append(Spacer(1, 22))
    story.append(Paragraph("EL MIDRASH", styles["label"]))
    story.append(Paragraph("La Palabra que Siempre Tiene Más que Decir", styles["title_main"]))
    story.append(Paragraph(
        "Método, Historia y Significado Teológico de la Exégesis Rabínica",
        styles["title_sub"]))
    story.append(HR())
    story.append(Paragraph(
        "<i>Una aproximación histórico-teológica al origen, estructura e impacto doctrinal "
        "del Midrash, desde una perspectiva cristiana reformada.</i>",
        styles["editorial"]))
    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>Autor:</b> Edgardo Lamas", styles["meta"]))
    story.append(Paragraph("<b>Asistencia Técnica de IA Especializada</b>", styles["meta"]))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Este trabajo fue elaborado mediante el uso de inteligencia artificial especializada "
        "(Claude, Anthropic), bajo supervisión y curaduría editorial del autor. "
        "Se han utilizado fuentes académicas reconocidas en el campo de los estudios "
        "judaícos y la historia de la exégesis bíblica.",
        styles["body"]))
    story.append(Spacer(1, 4))
    fuentes = [
        "Neusner, Jacob. <i>Introduction to Rabbinic Literature</i>",
        "Porton, Gary. <i>Understanding Rabbinic Midrash</i>",
        "Zunz, Leopold. <i>Die gottesdienstlichen Vorträge der Juden</i>",
        "Jaffé, Dan. <i>El Talmud y los orígenes judíos del cristianismo</i>",
        "Buswell, J. Oliver. <i>Teología Sistemática</i>",
        "Ryrie, Charles. <i>Teología Básica</i>",
        "Encyclopaedia Judaica (Keter Publishing)",
        "The Cambridge History of Judaism",
    ]
    for f in fuentes:
        story.append(Paragraph(f"• {f}", styles["biblio"]))
    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>Fecha:</b> Mayo 2026", styles["meta"]))
    story.append(Paragraph("<i>Biblioteca Virtual “Sabiduría para el Corazón”</i>", styles["meta"]))
    story.append(HR())

    # ── NOTA EDITORIAL ──────────────────────────────────────────────────────
    story.append(Paragraph("Nota editorial", styles["chap"]))
    story.append(Paragraph(
        "Este artículo es el cuarto de la serie “Libros Sagrados de Israel” de la Biblioteca "
        "Virtual Sabiduría para el Corazón, y debe leerse en continuidad con los estudios "
        "precedentes sobre La Torá, El Talmud y La Mishná. Si aquellos documentos exploraron "
        "los grandes cuerpos normativos del judaísmo —la ley escrita, la ley oral codificada "
        "y su gran comentario enciclopédico— este se ocupa del método que los atraviesa a todos: "
        "el arte de buscar en el texto sagrado más de lo que el texto, a primera vista, parece decir. "
        "El Midrash no es un libro. Es una manera de leer. Y esa manera de leer cambió para siempre "
        "la historia de la interpretación bíblica, tanto dentro como fuera del judaísmo.",
        styles["body"]))
    story.append(HR())

    # ── PRÓLOGO ─────────────────────────────────────────────────────────────
    story.append(Paragraph("Prólogo: El Texto que Nunca Termina", styles["chap"]))
    story.append(Paragraph(
        "Hay una pregunta que todo lector serio de la Biblia ha enfrentado en algún momento, "
        "aunque no siempre con ese nombre: ¿qué hace uno con los silencios del texto? La Torá "
        "narra que Abraham salió de Ur de los caldeos en obediencia a la voz de Dios, pero no dice "
        "qué sintió al despedirse de su familia, ni qué pensó durante las noches en el desierto, "
        "ni por qué Dios lo eligió a él entre todos los hombres de su generación. El texto es "
        "lacónico donde el lector querría profusión; austero donde el corazón busca calor; "
        "enigmático donde la mente necesita claridad. Los silencios de la Escritura no son "
        "accidentales. Pero tampoco son un muro.",
        styles["body"]))
    story.append(Paragraph(
        "El judaísmo rabínico respondió a esos silencios con el Midrash. No para inventar lo que "
        "el texto no dice —aunque a veces la línea entre la imaginación piadosa y la invención "
        "creativa es delgada— sino para escuchar lo que el texto dice en sus frecuencias más "
        "profundas, en las capas de sentido que la lectura apresurada no alcanza. El nombre lo "
        "dice todo: <i>Midrash</i> (<font name='SFHebrew'>מידרש</font>) proviene de la raíz hebrea <i>darash</i> (<font name='SFHebrew'>דרש</font>), "
        "que significa «buscar», «oligar», «estudia con atención». El Midrash es la búsqueda "
        "del alma del texto, la convicción de que la palabra de Dios contiene siempre más de "
        "lo que una sola lectura puede agotar.",
        styles["body"]))
    story.append(Paragraph(
        "Para el lector cristiano reformado, esta convicción no es ajena. Toda la tradición "
        "hermenéutica reformada, desde la <i>analogia Scripturae</i> de la exégesis calvinista hasta "
        "el principio de que la Escritura es su propio intérprete, parte de una premisa similar: "
        "que el texto bíblico tiene una densidad de sentido que solo se revela en la lectura "
        "paciente, cruzada, orante. Lo que distingue al Midrash de esta hermenéutica no es la "
        "actitud ante el texto —en ambos casos es de reverencia activa— sino el lugar que se le "
        "asigna a la tradición interpretativa en relación con la Escritura misma. Esa distinción, "
        "como veremos, es teológicamente decisiva. Pero para entenderla bien, hay que entender "
        "primero qué es el Midrash, cómo nació, cómo funciona y qué produjo.",
        styles["body"]))
    story.append(HR())

    # ── CAPÍTULO I ──────────────────────────────────────────────────────────
    story.append(Paragraph("Capítulo I — Qué es el Midrash: Nombre, Naturaleza y Lugar en la Literatura Rabínica", styles["chap"]))

    story.append(Paragraph("Tres acepciones de una misma palabra", styles["sec"]))
    story.append(Paragraph(
        "El término Midrash presenta una complejidad semántica que los estudiosos han señalado "
        "consistentemente. Jacob Neusner y Gary Porton, dos de los académicos más rigurosos "
        "en este campo, distinguen al menos tres acepciones técnicas del término que conviene "
        "no confundir. La primera acepción es el Midrash como <i>proceso</i>: la actividad interpretativa "
        "de buscar el sentido del texto sagrado más allá de su superficie literal. La segunda es "
        "el Midrash como <i>método</i>: el conjunto de técnicas hermenéuticas que ese proceso emplea, "
        "incluyendo la comparación entre pasajes, la derivación de principios a partir de detalles "
        "gramaticales, el uso de la parábola y la analogía. La tercera es el Midrash como "
        "<i>corpus</i>: las colecciones físicas de textos que recogen el resultado de ese proceso y "
        "ese método a lo largo de los siglos, desde los comentarios tanaíticos del siglo I hasta "
        "las grandes antologías medievales del siglo XIII.",
        styles["body"]))
    story.append(Paragraph(
        "Esta triple distinción importa porque evita un error frecuente: pensar que el Midrash "
        "es simplemente un libro, o una colección de libros, que puede estudiarse como se estudia "
        "el Talmud. El Midrash es, antes que nada, una manera de estar frente al texto. Una "
        "actitud. Un impulso. Los textos midráshicos son el sedimento escrito de esa actitud, "
        "pero el espíritu midráshico precede y excede cualquier texto en particular.",
        styles["body"]))

    story.append(Paragraph("La diferencia con la Mishná y el Talmud", styles["sec"]))
    story.append(Paragraph(
        "Para el lector que viene de los artículos anteriores de esta serie, es necesario "
        "establecer con claridad las diferencias estructurales entre el Midrash y los otros "
        "grandes cuerpos de la literatura rabínica. La Mishná, como vimos, es una codificación "
        "<i>temática</i> de la Ley Oral: organiza el material en seis órdenes (<i>sedarim</i>) "
        "independientes del orden del texto bíblico, agrupando las leyes por categorías "
        "—agricultura, festividades, derecho de familia— con una lógica sistemática que se "
        "aleja deliberadamente de la secuencia narrativa de la Torá. El Talmud, por su parte, "
        "es el comentario enciclopédico de la Mishná: toma cada párrafo mishnáico y lo desarrolla "
        "en un debate dialéctico que puede extenderse por decenas de páginas, incorporando "
        "opiniones, casos, anécdotas y principios de toda la tradición rabínica.",
        styles["body"]))
    story.append(Paragraph(
        "El Midrash es radicalmente distinto en su estructura. A diferencia de la Mishná, que "
        "se organiza temáticamente, el Midrash sigue generalmente el orden de los versículos "
        "bíblicos, comentándolos uno por uno, a veces letra por letra. Es <i>exegético</i> en su "
        "forma más pura: nace del texto, vive en el texto y regresa al texto. Esta diferencia "
        "no es solo formal; refleja una diferencia de propósito. La Mishná busca codificar la "
        "ley para que pueda ser aplicada. El Midrash busca <i>profundizar</i> el texto para que "
        "pueda ser comprendido, amado y vivido en toda su riqueza. La Mishná es la arquitectura; "
        "el Midrash es el alma que habita en esa arquitectura.",
        styles["body"]))

    story.append(Paragraph("Los dos grandes géneros: Halajá y Aggadá", styles["sec"]))
    story.append(Paragraph(
        "Dentro del universo midráshico, la distinción más fundamental es la que separa el "
        "<i>Midrash Halajá</i> del <i>Midrash Aggadá</i>. El primero es interpretación normativa y "
        "legal: busca identificar las fuentes de las leyes tradicionales en el texto bíblico, "
        "derivar principios jurídicos de los detalles del texto, y resolver contradicciones "
        "aparentes entre diferentes pasajes. Los grandes Midrashim halájicos del período "
        "tanaítico —la <i>Mejiltá</i> sobre el Éxodo, el <i>Sifrá</i> sobre el Levítico, el <i>Sifré</i> "
        "sobre Números y Deuteronomio— son obras de una densidad técnica considerable, donde "
        "cada palabra del texto bíblico se convierte en el punto de partida para una discusión "
        "jurídica.",
        styles["body"]))
    story.append(Paragraph(
        "El <i>Midrash Aggadá</i>, en cambio, es interpretación narrativa, ética y homilética. "
        "Utiliza la parábola, la leyenda, la expansión imaginativa del texto y la comparación "
        "entre pasajes para extraer lecciones morales, consuelos espirituales y verdades "
        "teológicas. Es el Midrash del corazón además de la mente, el que llena los silencios "
        "del texto con voces que buscan no tanto establecer qué debe hacerse como revelar "
        "qué significa lo que Dios ha hecho. El <i>Midrash Rabá</i> —la gran colección de "
        "comentarios aggádicos sobre el Pentateuco y los cinco rollos— es el ejemplo más "
        "monumental de este género, y el que más directamente ha influido en la imaginación "
        "espiritual del judaísmo a lo largo de los siglos.",
        styles["body"]))
    story.append(Paragraph(
        "Hay un tercer género, más especializado, que merece mención: el <i>Pésher</i> (<font name='SFHebrew'>פשר</font>), "
        "el método de interpretación visionaria que caracteriza a los manuscritos de Qumrán. "
        "El <i>Pésher</i> postula la existencia de un significado oculto en el texto bíblico, "
        "destinado a ser revelado solo a la comunidad de los elegidos que posee la clave "
        "interpretativa. Esta forma de Midrash, más esotérica y exclusiva, está en las "
        "antípodas del espíritu democrático y pedagógico que caracterizará al Midrash "
        "rabínico posterior, pero ilumina el amplio espectro de posibilidades hermenéuticas "
        "que el impulso <i>darásico</i> podía producir.",
        styles["body"]))
    story.append(HR())

    # ── CAPÍTULO II ─────────────────────────────────────────────────────────
    story.append(Paragraph("Capítulo II — Origen e Historia: De Esdras a los Grandes Corpus Medievales", styles["chap"]))

    story.append(Paragraph("El momento fundacional: Nehemías 8", styles["sec"]))
    story.append(Paragraph(
        "Si hay un momento en la historia del pueblo de Israel que puede identificarse como "
        "el nacimiento del espíritu midráshico, ese momento está registrado en Nehemías 8. "
        "El año es aproximadamente el 458 antes de Cristo. El pueblo ha regresado del exilio "
        "babilónico, ha reconstruido los muros de Jerusalén bajo el liderazgo de Nehemías, y "
        "ahora se reúne en la plaza frente a la puerta del Agua para escuchar a Esdras el "
        "Escriba. El texto describe la escena con una precisión visual que sugiere su "
        "importancia monumental: Esdras sube a un estrado de madera construido expresamente "
        "para la ocasión, abre el rollo de la Torá ante toda la asamblea, y el pueblo, al "
        "verlo abrirse, se pone de pie. Esdras bendice al Señor Dios grande, y el pueblo "
        "responde: «Amén, Amén», alzando sus manos, inclinándose y postrándose ante el "
        "Señor con el rostro en tierra.",
        styles["body"]))

    # ILUSTRACIÓN 1 — Esdras leyendo la Torá
    story.extend(illus(ILLUS_1,
        "Esdras el Escriba lee la Torá desde un estrado de madera ante la asamblea reunida "
        "en Jerusalén (Nehemías 8). Este momento fundacional marca el nacimiento del espíritu midráshico."))

    story.append(Paragraph(
        "Lo que sigue es la clave de todo: «Y leían en el libro de la ley de Dios claramente, "
        "y ponían el sentido, de modo que entendiesen la lectura» (Nehemías 8:8). La frase "
        "hebrea que se traduce como «ponían el sentido» (<i>mephorash</i>) ha sido objeto de "
        "interpretaciones diversas, pero su núcleo es claro: los levitas que asistían a "
        "Esdras no se limitaban a leer el texto en voz alta, sino que lo <i>explicaban</i>, lo "
        "<i>traducían</i> al arameo que el pueblo ya hablaba cotidianamente, lo <i>aplicaban</i> "
        "a las circunstancias del presente. Estaban haciendo Midrash antes de que el "
        "Midrash tuviera ese nombre.",
        styles["body"]))
    story.append(Paragraph(
        "La figura de Esdras es, en este sentido, fundacional para entender no solo el "
        "Midrash sino toda la tradición interpretativa que produjo la literatura rabínica. "
        "La tradición judía lo considera el «segundo Moisés» —una afirmación que el Talmud "
        "formula con una audacia característica: «Si Moisés no hubiera precedido a Esdras, "
        "Esdras habría sido digno de recibir la Torá para Israel»— porque así como Moisés "
        "entregó la Torá escrita al pueblo, Esdras entregó el método para que esa Torá "
        "siguiera siendo una palabra viva en cada generación.",
        styles["body"]))
    story.append(Paragraph(
        "La crisis del exilio había producido, entre otras consecuencias, una brecha "
        "lingüística y cultural entre el texto sagrado —escrito en el hebreo clásico de "
        "los siglos anteriores— y el pueblo que debía vivir por ese texto. La labor de "
        "Esdras fue tender ese puente. Y al tenderlo, estableció el principio que gobernaría "
        "toda la exégesis rabínica posterior: que la revelación no es un evento estático "
        "ocurrido en el Sinaí y congelado para siempre en un texto, sino un diálogo continuo "
        "que cada generación debe entablar con ese texto desde su propia situación, su "
        "propio lenguaje y sus propias preguntas.",
        styles["body"]))

    story.append(Paragraph("De los Tannaim a los grandes corpus medievales", styles["sec"]))
    story.append(Paragraph(
        "El desarrollo histórico del Midrash como corpus literario puede seguirse en tres "
        "grandes períodos. El primero corresponde a los <i>Midrashim</i> tanaíticos —los que "
        "llevan la marca de los <i>Tannaim</i>, los maestros cuyas enseñanzas forman también la "
        "Mishná— y se extiende aproximadamente hasta el siglo III de la era común. Estas "
        "obras, de carácter predominantemente halájico, son las más antiguas y las más "
        "cercanas al texto bíblico en su metodología: la <i>Mejiltá</i> sobre el Éxodo, el "
        "<i>Sifrá</i> sobre el Levítico y el <i>Sifré</i> sobre Números y Deuteronomio siguen el "
        "texto versículo por versículo con una atención casi microscópica al detalle "
        "gramatical y jurídico.",
        styles["body"]))
    story.append(Paragraph(
        "El segundo período, que se extiende entre los siglos V y XII, es el de la gran "
        "floración de los <i>Midrashim</i> aggádicos. El <i>Midrash Rabá</i> —literalmente, el "
        "«Gran Midrash»— es la colección más monumental de este período: cubre el "
        "Pentateuco completo y los cinco rollos (<i>Megilot</i>) con comentarios que mezclan "
        "la exégesis halájica, la narrativa expansiva, la parábola y la homilética en "
        "proporciones variables según el libro comentado. El <i>Midrash Tanhuma</i>, del siglo "
        "IX, es especialmente notable por su estructura homilética: cada sección comienza "
        "con una pregunta de carácter legal que parece no tener relación con el pasaje "
        "narrativo que se va a comentar, y la habilidad del intérprete consiste en tender "
        "el puente entre esa pregunta aparentemente abstracta y la narrativa bíblica "
        "concreta, revelando en el proceso una unidad de sentido que no era evidente al inicio.",
        styles["body"]))
    story.append(Paragraph(
        "El tercer período, entre los siglos X y XIII, produce las grandes antologías que "
        "recopilan y sistematizan el material midráshico precedente. El <i>Ialkut Shimoni</i> "
        "—atribuido al siglo XIII aunque su datación es debatida— es la más ambiciosa de "
        "estas antologías: cubre el Tanaj completo con citas y adaptaciones de más de "
        "cincuenta fuentes midráshicas diferentes, convirtiéndose en una especie de "
        "enciclopedia del pensamiento midráshico que ha sido consultada sin interrupción "
        "hasta el presente.",
        styles["body"]))
    story.append(Paragraph(
        "Un caso emblemático de las complejidades de datación midráshica es el de los "
        "<i>Pirkei de-Rabbí Eliézer</i>, una obra que la tradición atribuía al Tanaím del siglo "
        "II pero que el filólogo Leopold Zunz demostró en el siglo XIX había sido redactada "
        "en el siglo VIII, a juzgar por sus alusiones al Islam y su uso de un hebreo "
        "notablemente más tardío. Este caso ilumina tanto la riqueza como la complejidad "
        "del corpus midráshico: obras que se presentan como antiguas pueden ser productos "
        "de períodos muy posteriores, y la labor de distinguir los estratos históricos en "
        "estos textos es una tarea que la crítica académica no ha concluido.",
        styles["body"]))
    story.append(HR())

    # ── CAPÍTULO III ────────────────────────────────────────────────────────
    story.append(Paragraph("Capítulo III — El PaRDeS: Los Cuatro Niveles de la Interpretación Sagrada", styles["chap"]))

    story.append(Paragraph("La arquitectura de un sistema", styles["sec"]))
    story.append(Paragraph(
        "El sistema hermenéutico más sofisticado que el judaísmo medieval desarrolló para "
        "organizar y legitimar el método midráshico se condensa en el acrónimo PaRDeS "
        "(<font name='SFHebrew'>פַּרְדֵס</font>), palabra hebrea que significa literalmente «huerto» o «paraíso» —no por "
        "casualidad, pues la tradición sugiere que adentrarse en los misterios del texto "
        "sagrado era análogo a adentrarse en el jardín del Edén, con todos sus peligros y "
        "todas sus maravillas. El acrónimo articula cuatro niveles de interpretación: "
        "<i>Peshat</i>, <i>Remez</i>, <i>Derash</i> y <i>Sod</i>, cada uno de los cuales representa una "
        "manera distinta de relacionarse con el texto y una profundidad distinta de sentido "
        "que el texto contiene.",
        styles["body"]))
    story.append(Paragraph(
        "Lo primero que debe decirse sobre este sistema es que no es una teoría de la "
        "ambigüedad textual. Los intérpretes medievales no sostenían que el texto pudiera "
        "significar cualquier cosa, ni que todos los niveles tuvieran igual validez en todas "
        "las circunstancias. El <i>Peshat</i> —el sentido literal, el significado gramatical e "
        "histórico inmediato del texto— tiene siempre una prioridad fundacional que los "
        "otros niveles no pueden cancelar. Un comentario <i>Derash</i> que contradiga abiertamente "
        "el <i>Peshat</i> no es enriquecimiento sino distorsión. El PaRDeS no es un sistema de "
        "relativismo hermenéutico; es una arquitectura de sentido en la que cada nivel se "
        "edifica sobre el anterior sin reemplazarlo.",
        styles["body"]))

    # ILUSTRACIÓN 2 — PaRDeS / académia rabínica
    story.extend(illus(ILLUS_2,
        "Un sabio rabínico explica los cuatro niveles del PaRDeS a sus discípulos: Peshat, "
        "Remez, Derash y Sod. El método midráshico como arquitectura de sentido sobre el texto sagrado."))

    story.append(Paragraph("El Peshat: la fidelidad al texto", styles["sec"]))
    story.append(Paragraph(
        "El <i>Peshat</i> (<font name='SFHebrew'>פְשָֹט</font>), cuya raíz significa literalmente «extender» o «desplegar», es el "
        "sentido llano, directo y gramaticalmente fundado del texto. Es la respuesta a la "
        "pregunta más básica: ¿qué dice este texto, en su contexto original, en su lenguaje "
        "propio, para sus lectores originales? El <i>Peshat</i> no es sinónimo de «literalismo» "
        "en el sentido mecánico del término —el judaísmo rabínico reconocía desde muy "
        "temprano que la Escritura emplea figuras retóricas, metáforas y géneros literarios "
        "diversos que no pueden leerse como si fueran reportes periodísticos— pero sí es "
        "sinónimo de honestidad filológica e histórica: el compromiso de no hacer decir al "
        "texto lo que el intérprete quiere escuchar sino lo que el texto efectivamente dice.",
        styles["body"]))

    story.append(Paragraph("El Remez: la alusión que trasciende", styles["sec"]))
    story.append(Paragraph(
        "El <i>Remez</i> (<font name='SFHebrew'>רֶמֶז</font>), que significa «pista» o «alusión», es el nivel alegórico o "
        "simbólico de la interpretación: el nivel en que el texto apunta, mediante su "
        "lenguaje concreto e histórico, a verdades que trascienden ese contexto. El "
        "<i>Remez</i> no abandona el <i>Peshat</i> —no dice que el texto no significa lo que "
        "dice— sino que añade una capa: que además de lo que dice, el texto señala hacia "
        "algo más. La tipología bíblica, tal como la desarrolló la exégesis cristiana "
        "patrística, funciona en esta capa: cuando el autor de la carta a los Hebreos "
        "interpreta el sacerdocio de Melquisedec como figura del sacerdocio de Cristo, "
        "no está negando que Melquisedec fue una figura histórica concreta, sino "
        "afirmando que esa figura histórica concreta <i>apunta</i> a una realidad mayor.",
        styles["body"]))
    story.append(Paragraph(
        "Los paralelos entre el sistema del PaRDeS y el sistema de los cuatro sentidos "
        "de la Escritura desarrollado por los Padres de la Iglesia —Clemente de "
        "Alejandría, Orígenes, y más tarde Agustín y la escolástica medieval— no son "
        "accidentales. Ambos sistemas emergieron del mismo contexto cultural "
        "helenístico-judío del mundo mediterráneo tardíoantiguo, y ambos responden a la "
        "misma intuición fundamental: que un texto que pretende ser palabra de Dios debe "
        "ser capaz de decir más de lo que cualquier lectura individual, por más cuidadosa "
        "que sea, puede agotar.",
        styles["body"]))

    story.append(Paragraph("El Derash: la búsqueda que interpela", styles["sec"]))
    story.append(Paragraph(
        "El <i>Derash</i> (<font name='SFHebrew'>דְרָש</font>) —que es, no casualmente, la raíz del término <i>Midrash</i> "
        "mismo— es el nivel inquisitivo, homilético y aplicativo de la interpretación. "
        "Es el nivel en que el intérprete no se contenta con establecer qué dijo el "
        "texto en su contexto original sino que pregunta qué <i>dice</i> el texto a esta "
        "comunidad, en esta circunstancia, ante este desafío. El <i>Derash</i> es el nivel "
        "de la aplicación creativa: toma el texto del pasado y lo proyecta sobre el "
        "presente, estableciendo analogías, extrayendo principios, convocando ecos y "
        "resonancias que el lector no advertía antes de que el intérprete los señalara.",
        styles["body"]))
    story.append(Paragraph(
        "Es en el nivel del <i>Derash</i> donde el Midrash despliega toda su riqueza "
        "narrativa e imaginativa. Las expansiones del texto bíblico que caracterizan "
        "el <i>Midrash Aggadá</i> —las anécdotas sobre personajes bíblicos que el texto "
        "no menciona, los diálogos entre Dios y sus ángeles, las parábolas que iluminan "
        "un mandamiento desde un ángulo inesperado— operan en esta capa. No pretenden "
        "ser historia en el sentido moderno del término; pretenden ser <i>verdad</i> en un "
        "sentido más profundo: la verdad de lo que el texto implica, la verdad de lo "
        "que la comunidad necesita escuchar.",
        styles["body"]))

    story.append(Paragraph("El Sod: el misterio que no se agota", styles["sec"]))
    story.append(Paragraph(
        "El <i>Sod</i> (<font name='SFHebrew'>סוד</font>), que significa «secreto», es el nivel místico o esotérico de la "
        "interpretación: el nivel en que el texto revela —o más bien, insinúa— los "
        "misterios divinos que ningún lenguaje humano puede articular plenamente. El "
        "<i>Sod</i> está asociado con la tradición de la Kabalá (<font name='SFHebrew'>קַבָּלָה</font>), la corriente "
        "mística del judaísmo que ve en cada letra del texto sagrado no solo un signo "
        "lingüístico sino un canal de energía espiritual, una ventana hacia las "
        "estructuras más profundas de la realidad divina.",
        styles["body"]))
    story.append(Paragraph(
        "Para la tradición reformada, el nivel del <i>Sod</i> plantea las preguntas más "
        "difíciles. El misticismo especulativo que caracteriza a la Kabalá es difícilmente "
        "reconciliable con la sobriedad hermenéutica que el protestantismo reformado ha "
        "cultivado. El principio de que la Escritura es su propio intérprete "
        "(<i>Scriptura Scripturae interpres</i>) apunta hacia el nivel del <i>Peshat</i> y del "
        "<i>Derash</i> como los territorios primarios de la exégesis legítima, y mira con "
        "cautela cualquier sistema que pretenda descifrar significados «ocultos» en el "
        "texto que solo los iniciados pueden acceder. Esa cautela no es arrogancia; "
        "es la honestidad de reconocer que «las cosas secretas pertenecen al Señor "
        "nuestro Dios; mas las reveladas, a nosotros y a nuestros hijos para siempre» "
        "(Deuteronomio 29:29).",
        styles["body"]))
    story.append(HR())

    # ── CAPÍTULO IV ─────────────────────────────────────────────────────────
    story.append(Paragraph("Capítulo IV — Los Grandes Intérpretes: Rabbí Akiva, Rashi y la Cadena de la Exégesis", styles["chap"]))

    story.append(Paragraph("Rabbí Akiva: el midrashista por excelencia", styles["sec"]))
    story.append(Paragraph(
        "Si hay un nombre que simboliza el espíritu midráshico en su forma más radical "
        "y más bella, ese nombre es el de Rabbí Akiva ben Yosef. Lo que hace de Akiva "
        "una figura única en la historia de la exégesis judía no es solo la profundidad "
        "de su erudición —que fue excepcional— sino la radicalidad de su método: su "
        "convicción de que cada letra del texto sagrado, cada tilde, cada partícula "
        "gramatical aparentemente superflua, contenía una revelación que el intérprete "
        "comprometido podía y debía extraer.",
        styles["body"]))
    story.append(Paragraph(
        "La tradición talmúdica narra una anécdota que ilumina este método con la claridad "
        "de una parábola. Moisés, en una visión, es transportado al futuro para asistir a "
        "la academia de Rabbí Akiva. Allí escucha a Akiva derivar montañas de leyes de "
        "cada pequeño detalle del texto bíblico —incluyendo las pequeñas coronas "
        "ornamentales (<i>taguim</i>) que adornan ciertas letras— y Moisés no puede seguir "
        "los argumentos. Se siente desconcertado, casi humillado. Pero cuando un "
        "discípulo le pregunta a Akiva cuál es el origen de una ley particularmente "
        "elaborada, Akiva responde sin vacilar: «Halajá dada a Moisés en el Sinaí.» Y "
        "Moisés queda tranquilo.",
        styles["body"]))
    story.append(Paragraph(
        "Akiva llegó al estudio tardíamente —la tradición dice que aprendió a leer a "
        "los cuarenta años— impulsado por el amor y el sacrificio de su esposa Raquel, "
        "hija del adinerado Kalba Savua. Kalba Savua los desheredad. Akiva y Raquel "
        "vivieron en la pobreza más extrema mientras él estudiaba. Cuando Akiva regresó, "
        "años después, al frente de veinticuatro mil discípulos, reconoció públicamente "
        "ante la multitud que todo lo que había alcanzado era mérito de Raquel. "
        "«Todo lo mío y lo vuestro es de ella», declaró. Es una de las frases más "
        "hermosas de la literatura rabínica.",
        styles["body"]))
    story.append(Paragraph(
        "La muerte de Akiva fue tan extraordinaria como su vida. Ejecutado por los "
        "romanos durante la persecución posterior a la rebelión de Bar Kojba, fue "
        "sometido a tortura mientras sus discípulos miraban con horror. El texto "
        "talmúdico describe cómo, mientras los verdugos desgarraban su carne con "
        "peines de hierro, Akiva recitaba el <i>Shemá</i> con una serenidad que sus "
        "discípulos no podían comprender. «Toda mi vida me preocupé por el "
        "versículo ‘amarás al Señor tu Dios con todo tu corazón, con toda tu "
        "alma y con todas tus fuerzas’, preguntándome cuándo podría cumplirlo "
        "completamente. Ahora que tengo la oportunidad de amar a Dios con toda "
        "mi alma —incluso cuando me la quitan— ¿no habría de aprovecharla?» "
        "Expiró en la palabra <i>Ejad</i> —«Uno»— la última palabra del <i>Shemá</i>.",
        styles["body"]))

    story.append(Paragraph("Rashi: el maestro de la claridad", styles["sec"]))
    story.append(Paragraph(
        "Siete siglos después de Rabbí Akiva, en la ciudad de Troyes, en la región de "
        "Champaña al norte de Francia, nació el hombre cuyo comentario al Tanaj y al "
        "Talmud se convertiría en el más influyente de toda la historia judía. Rabbí "
        "Shlomp Yitzjaquí —conocido universalmente por el acrónimo Rashi— nació en "
        "el año 1040 y vivió hasta el 1105, pasando la mayor parte de su vida adulta "
        "en Troyes, donde era propietario de viñedos y donde fundó la academia que "
        "formó a los que serían sus sucesores intelectuales más importantes, los "
        "<i>Tosafistas</i>.",
        styles["body"]))

    # ILUSTRACIÓN 3 — Rashi
    story.extend(illus(ILLUS_3,
        "Rashi (Rabbí Shlomó Yitzjaquí, 1040–1105) escribe su comentario en Troyes, Francia. "
        "Su obra se convertiría en el comentario bíblico más influyente de la historia judía."))

    story.append(Paragraph(
        "La vida de Rashi transcurrió en uno de los períodos más violentos de la historia "
        "judía en Europa. Las Cruzadas comenzaron en 1096, cuando Rashi tenía cincuenta "
        "y seis años, y los pogroms que acompañaron el paso de los cruzados por el Rin "
        "destruyeron comunidades que habían florecido durante siglos en ciudades como "
        "Maguncia, Worms y Espira —precisamente las ciudades donde Rashi había estudiado "
        "en su juventud. El comentario de Rashi fue escrito, en parte, en la sombra de esa "
        "violencia, y su énfasis en la claridad y la accesibilidad del texto puede leerse "
        "también como un acto de resistencia.",
        styles["body"]))
    story.append(Paragraph(
        "El método de Rashi es, en primera instancia, un método de <i>Peshat</i>: su objetivo "
        "declarado es encontrar el sentido literal, gramatical e histórico del texto, y "
        "cuando la explicación halájica tradicional le parece forzada o contradictoria "
        "con ese sentido, no duda en señalarlo. «Este versículo no dice más que su "
        "sentido literal», es una frase que aparece repetidamente en su comentario, como "
        "una declaración de principio.",
        styles["body"]))
    story.append(Paragraph(
        "La influencia de Rashi en la exégesis cristiana es un capítulo fascinante. "
        "Nicolás de Lira (1270-1349), el franciscano que fue quizás el comentarista "
        "bíblico cristiano más influyente del período medieval, conocía el comentario "
        "de Rashi y lo utilizó extensamente. Y Nicolás de Lira, a su vez, influyó en "
        "Martín Lutero —quien lo citó repetidamente en sus comentarios— hasta el "
        "punto de que un dicho popular en los círculos humanistas del siglo XVI "
        "afirmaba: «Si Lira no hubiera tañido la lira, Lutero no habría bailado.» La "
        "cadena que conecta la exégesis de Rashi en Troyes con la Reforma protestante "
        "en Wittenberg es larga y sinuosa, pero es real.",
        styles["body"]))
    story.append(HR())

    # ── CAPÍTULO V ──────────────────────────────────────────────────────────
    story.append(Paragraph("Capítulo V — El Midrash y el Nuevo Testamento: Tipología, Parábolas y Pablo", styles["chap"]))

    story.append(Paragraph("Jesús como maestro midráshico", styles["sec"]))
    story.append(Paragraph(
        "La figura de Jesús de Nazaret, tal como los evangelios la presentan, es inseparable "
        "del mundo del Midrash. Jesús es reconocido en los evangelios como <i>Rabbí</i> "
        "—maestro— y su estilo de enseñanza comparte características fundamentales con "
        "el método midráshico: el uso extensivo de la parábola (<i>mashal</i>), la derivación "
        "de principios éticos a partir de detalles del texto bíblico, la comparación "
        "entre pasajes aparentemente no relacionados para iluminar un punto teológico, "
        "la capacidad de encontrar en una historia conocida un significado que sus oyentes "
        "no habían advertido antes.",
        styles["body"]))
    story.append(Paragraph(
        "Las parábolas de Jesús son, en su forma, idénticas al <i>mashal</i> rabínico: una "
        "historia tomada de la experiencia cotidiana —un sembrador que sale a sembrar, "
        "una mujer que busca una moneda perdida, un padre que tiene dos hijos— que "
        "funciona como vehículo para una verdad que trasciende la historia concreta. "
        "Los rabinos que eran contemporáneos de Jesús usaban exactamente el mismo género "
        "con exactamente la misma estructura: «A qué se puede comparar esto... a un rey "
        "que tenía...». La diferencia entre las parábolas de Jesús y las parábolas "
        "rabínicas no reside en la forma sino en el contenido y en la autoridad con que "
        "son pronunciadas.",
        styles["body"]))
    story.append(Paragraph(
        "El Sermón del Monte es, en muchos sentidos, el texto más midráshico del Nuevo "
        "Testamento. La estructura de las antítesis —«oísteis que fue dicho... pero yo "
        "os digo»— sigue la lógica de una confrontación hermenéutica: Jesús no niega "
        "el texto bíblico que cita, sino que profundiza su sentido hasta el nivel que el "
        "método midráshico llamaría <i>Sod</i>, el nivel del significado más interior. "
        "Cuando dice que quien mira a una mujer con deseo ya ha cometido adulterio en "
        "su corazón (Mateo 5:28), no está contradiciendo el mandamiento sino llevándolo "
        "a su raíz más profunda, al deseo que precede al acto.",
        styles["body"]))

    # ILUSTRACIÓN 4 — Jesús en el Templo
    story.extend(illus(ILLUS_4,
        "Jesús enseña en los atrios del Templo de Jerusalén. Su estilo de enseñanza comparte "
        "características fundamentales con el método midráshico: la parábola, la analogía, "
        "la profundización del texto sagrado."))

    story.append(Paragraph("El uso paulino del Midrash", styles["sec"]))
    story.append(Paragraph(
        "El apóstol Pablo, formado en la tradición rabínica bajo la tutela de Gamaliel, "
        "despliega en sus cartas un repertorio de técnicas hermenéuticas que los "
        "estudiosos del judaísmo reconocen como midráshicas. El caso más explícito y "
        "más debatido es la alegoría de Gálatas 4:21-31, donde Pablo toma la historia "
        "de Agar y Sara —dos mujeres históricas, madres de dos hijos de Abraham— y "
        "las presenta como «alegoria» de los dos pactos: el de la ley, que conduce a la "
        "esclavitud, y el de la promesa, que conduce a la libertad.",
        styles["body"]))
    story.append(Paragraph(
        "Aún más técnicamente midráshico es el argumento de Gálatas 3:16, donde Pablo "
        "basa una conclusión teológica de primera importancia —que la promesa fue hecha "
        "a Cristo, no a «muchos»— en el hecho de que el texto del Génesis usa el "
        "singular «simiente» (<i>zera</i>) y no el plural «simientes». «No dice: 'y a las "
        "simientes', como si hablase de muchos, sino como de uno: 'y a tu simiente', "
        "la cual es Cristo.» Este tipo de argumento, que extrae una conclusión doctrinal "
        "del número gramatical de una sola palabra, es precisamente el método que los "
        "<i>Tannaim</i> empleaban en sus debates halájicos.",
        styles["body"]))
    story.append(Paragraph(
        "Saul Lieberman, uno de los grandes académicos del judaísmo del siglo XX, "
        "señaló en sus investigaciones que Pablo emplea consistentemente las mismas "
        "herramientas hermenéuticas —las <i>middot</i>, las reglas de interpretación— que "
        "los maestros de la Mishná. Esto no significa que Pablo sea simplemente un "
        "Tanaím que ha cambiado de religión; significa que Pablo es un intérprete "
        "formado en la mejor tradición exegética de su tiempo, que emplea esa formación "
        "al servicio de una proclamación radicalmente nueva: que Cristo es la clave que "
        "abre el sentido último de toda la Escritura.",
        styles["body"]))

    story.append(Paragraph("La tipología como Midrash cristológico", styles["sec"]))
    story.append(Paragraph(
        "La tipología bíblica —el procedimiento hermenéutico que ve en las personas, "
        "eventos e instituciones del Antiguo Testamento figuras o «tipos» que prefiguran "
        "las realidades del Nuevo— es, en su estructura, una forma de exégesis midráshica "
        "aplicada al servicio de la cristología. Cuando el autor de la carta a los "
        "Hebreos interpreta el sistema sacrificial del Levítico como «sombra de los "
        "bienes venideros» (Hebreos 10:1), cuando Juan el Bautista presenta a Jesús como "
        "el «Cordero de Dios que quita el pecado del mundo» (Juan 1:29) evocando la "
        "tipología pascual, cuando Pablo escribe que «neestra Pascua, que es Cristo, "
        "ya fue sacrificada por nosotros» (1 Corintios 5:7), todos ellos están operando "
        "en el nivel midráshico del <i>Remez</i>: afirmando que el texto del Antiguo "
        "Testamento <i>apunta</i> hacia una realidad que lo trasciende y lo completa.",
        styles["body"]))
    story.append(Paragraph(
        "La diferencia fundamental entre la tipología cristiana y el Midrash judío no "
        "reside en el método sino en el centro al que el método apunta. Para el Midrash "
        "rabínico, el texto apunta hacia la Torá misma —hacia una comprensión siempre "
        "más profunda de la voluntad de Dios revelada en los mandamientos— o hacia la "
        "historia de Israel como comunidad elegida. Para la tipología cristiana, el texto "
        "apunta hacia Cristo: hacia la persona, la obra y el reino del Mesías que ha venido "
        "y que vendrá. Es la misma lente hermenéutica apuntando en direcciones distintas.",
        styles["body"]))
    story.append(HR())

    # ── CONCLUSIÓN ───────────────────────────────────────────────────────────
    story.append(Paragraph("Conclusión: La Palabra que Siempre Tiene Más que Decir", styles["chap"]))
    story.append(Paragraph(
        "El Midrash nació de una pregunta que no ha envejecido: ¿cómo hace una comunidad "
        "para mantener viva la palabra de Dios en cada generación, en cada circunstancia, "
        "ante cada nuevo desafío que la historia presenta? La respuesta que el judaísmo "
        "rabínico articuló a lo largo de siglos de práctica interpretativa es notable "
        "por su honestidad: la palabra de Dios se mantiene viva no porque sea simple sino "
        "porque es inagotable. No porque diga siempre lo mismo sino porque siempre tiene "
        "más que decir. El Midrash es el documento de esa convicción y el instrumento de "
        "esa práctica.",
        styles["body"]))
    story.append(Paragraph(
        "Para el lector cristiano reformado, el Midrash es, al mismo tiempo, familiar y "
        "desafiante. Familiar porque el impulso que lo anima —la búsqueda paciente, "
        "reverente y comprometida del sentido más profundo del texto sagrado— es el mismo "
        "impulso que anima la mejor tradición de la exégesis reformada. Desafiante porque "
        "el Midrash eleva la tradición interpretativa a un nivel de autoridad que la "
        "doctrina de la <i>sola Scriptura</i> no puede aceptar sin reservas. La cadena de "
        "transmisión que el judaísmo rabínico reivindica —de Moisés a Josué, de Josué "
        "a los ancianos, de los ancianos a los profetas, de los profetas a los hombres "
        "de la Gran Asamblea, y de allí a los <i>Tannaim</i> y sus sucesores— es, para el "
        "judaísmo, tan sagrada como el texto que esa cadena interpreta. Para la "
        "tradición reformada, esa cadena es preciosa pero no sagrada: puede enriquecer "
        "la lectura del texto, puede iluminar su sentido, puede preservar perspectivas "
        "que de otro modo se perderían, pero no puede colocarse por encima del texto "
        "ni hablar con la misma autoridad que el texto.",
        styles["body"]))
    story.append(Paragraph(
        "Esa diferencia es real y no debe minimizarse. Pero tampoco debe impedir al "
        "lector cristiano aprender del Midrash lo que el Midrash tiene para enseñar. "
        "Aprender que el texto sagrado tiene siempre más que decir que lo que una sola "
        "lectura puede agotar. Aprender que el silencio del texto no es vacío sino "
        "profundidad. Aprender que la búsqueda honesta del sentido —el <i>darash</i> que "
        "da nombre al Midrash— es en sí misma un acto de amor hacia el Dios que habla "
        "en ese texto. Y aprender, sobre todo, que la palabra que Jesús empleó para "
        "describir su relación con la Escritura no fue «cancelar» ni «superar» sino "
        "«cumplir»: «No penséis que he venido para abrogar la ley o los profetas; "
        "no he venido para abrogar, sino para cumplir» (Mateo 5:17).",
        styles["body"]))
    story.append(Paragraph(
        "El Midrash pasó siglos buscando ese cumplimiento en cada letra, en cada sílaba, "
        "en cada silencio del texto sagrado. La fe cristiana proclama que ese cumplimiento "
        "ha venido —en una persona, en una historia, en una muerte y en una resurrección "
        "que abre el sentido de toda la Escritura precedente. No como la cancelación del "
        "Midrash sino como su respuesta. No como el fin de la búsqueda sino como la "
        "revelación de lo que siempre se estaba buscando.",
        styles["body"]))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "<b>La palabra sigue teniendo más que decir. Y el que tiene oídos para oír, que oiga.</b>",
        styles["ital"]))
    story.append(HR())

    # ── NOTA EDITORIAL FINAL ─────────────────────────────────────────────────
    story.append(Paragraph("Nota editorial final", styles["sec"]))
    story.append(Paragraph(
        "Este artículo forma parte de la sección <i>“Libros Sagrados de Israel”</i> de la "
        "Biblioteca Virtual Sabiduría para el Corazón. Ha sido elaborado en continuidad "
        "con los estudios precedentes sobre La Torá, El Talmud y La Mishná. "
        "En próximas entregas: La Septuaginta y el Tanaj.",
        styles["editorial"]))

    doc.build(story)
    print("  Contenido OK")


def merge_pdf():
    print("Unificando PDF...")
    doc = fitz.open()
    # 1. Portada
    cover = fitz.open(TMP_COVER)
    doc.insert_pdf(cover); cover.close()
    # 2. Subportada (pág. con metadata — contenido pág. 1)
    content = fitz.open(TMP_CONTENT)
    doc.insert_pdf(content, from_page=0, to_page=0)
    content2 = fitz.open(TMP_CONTENT)
    # 3. Resto del contenido (pág. 2+)
    if content2.page_count > 1:
        doc.insert_pdf(content2, from_page=1)
    content.close(); content2.close()
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    doc.save(OUTPUT, deflate=True)
    doc.close()
    size_mb = os.path.getsize(OUTPUT) / 1024 / 1024
    print(f"  PDF guardado: {OUTPUT} ({size_mb:.1f} MB)")


if __name__ == "__main__":
    build_cover()
    build_content()
    # Reemplazar pág. 1 de content con metadata dibujada en canvas
    # Construir subportada separada e insertar
    print("Generando subportada...")
    TMP_META = "/tmp/midrash_meta_page.pdf"
    c = rl_canvas.Canvas(TMP_META, pagesize=A4)
    build_metadata(c)
    c.showPage(); c.save()
    # Unir: cover + meta + content (sin pág.1)
    print("Unificando PDF final...")
    doc = fitz.open()
    cover_f = fitz.open(TMP_COVER)
    doc.insert_pdf(cover_f); cover_f.close()
    meta_f = fitz.open(TMP_META)
    doc.insert_pdf(meta_f); meta_f.close()
    content_f = fitz.open(TMP_CONTENT)
    doc.insert_pdf(content_f); content_f.close()
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    doc.save(OUTPUT, deflate=True); doc.close()
    size_mb = os.path.getsize(OUTPUT) / 1024 / 1024
    print(f"\nListo: {OUTPUT} ({size_mb:.1f} MB)")
