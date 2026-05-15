#!/usr/bin/env python3
"""
PDF: La Mishná — La Palabra que Sobrevivió al Templo
Artículo completo con ilustraciones FLUX por capítulo.
Paleta: oliva profundo + oro cálido + pergamino.
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
COVER_IMG     = f"{IMG_DIR}/mishna_cover.jpg"
TEXTURE_IMG   = f"{IMG_DIR}/mishna_texture.jpg"
TEXTURE_READY = "/tmp/mishna_tex_ready.jpg"
ILLUS_1       = f"{IMG_DIR}/mishna_illus_1.jpg"
ILLUS_2       = f"{IMG_DIR}/mishna_illus_2.jpg"
ILLUS_3       = f"{IMG_DIR}/mishna_illus_3.jpg"
ILLUS_4       = f"{IMG_DIR}/mishna_illus_4.jpg"
OUTPUT        = f"{BASE}/public/pdf/La-Mishna.pdf"
TMP_COVER     = "/tmp/mishna_cover_page.pdf"
TMP_CONTENT   = "/tmp/mishna_content_pages.pdf"

# Paleta oliva — identidad visual La Mishná
OLIVE_DEEP   = (20, 35, 15)
OLIVE_MID    = (48, 70, 28)
OLIVE_GOLD   = (178, 152, 55)
GOLD_LIGHT   = (208, 183, 88)
PARCHMENT    = (238, 232, 205)
CREAM        = (250, 247, 234)

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


def prepare_texture():
    # Fondo crema sólido + textura como marca de agua a baja opacidad
    # Resultado: fondo limpio y legible, con textura sutil
    tex = PILImage.open(TEXTURE_IMG).convert("RGBA")
    tex = tex.resize((595, 842), PILImage.LANCZOS)
    # Reducir saturación y brillo ligeramente
    rgb = tex.convert("RGB")
    rgb = ImageEnhance.Brightness(rgb).enhance(0.88)
    rgb = ImageEnhance.Color(rgb).enhance(0.65)
    tex = rgb.convert("RGBA")
    # Alpha: 55/255 ≈ 22% — solo una huella sutil
    arr = np.array(tex, dtype=np.float32)
    arr[:, :, 3] = 55
    tex = PILImage.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    tex.save(TEXTURE_READY.replace(".jpg", ".png"))


TEXTURE_READY_PNG = TEXTURE_READY.replace(".jpg", ".png")


def build_cover():
    print("Generando portada...")
    img = PILImage.open(COVER_IMG).convert("RGB").resize((595, 842), PILImage.LANCZOS)
    bg = "/tmp/mishna_cover_bg.jpg"; img.save(bg, quality=95)
    c = rl_canvas.Canvas(TMP_COVER, pagesize=A4)
    c.drawImage(bg, 0, 0, width=W, height=H)
    for i in range(160):
        c.setFillColorRGB(0.06, 0.11, 0.04, alpha=0.80*(1-i/160)**0.7)
        c.rect(0, H-i-1, W, 1, fill=1, stroke=0)
    for i in range(240):
        c.setFillColorRGB(0.04, 0.08, 0.02, alpha=0.88*(1-i/240)**0.55)
        c.rect(0, i, W, 1, fill=1, stroke=0)
    c.setFillColorRGB(*[x/255 for x in OLIVE_GOLD], alpha=0.9)
    c.rect(0, H-38, W, 38, fill=1, stroke=0)
    c.setFillColorRGB(*[x/255 for x in OLIVE_DEEP])
    c.setFont(BODY_FONT, 8)
    c.drawCentredString(W/2, H-24, "S A B I D U R Í A   P A R A   E L   C O R A Z Ó N")
    c.setFont(BODY_FONT, 7)
    c.drawCentredString(W/2, H-33, "L I B R O S   S A G R A D O S   D E   I S R A E L")
    c.setFillColorRGB(*[x/255 for x in GOLD_LIGHT], alpha=0.85)
    c.setFont(BODY_FONT, 8)
    c.drawCentredString(W/2, H-62, "T O R Á   ·   T A N A J   ·   T A L M U D   ·   M I S H N Á")
    c.setStrokeColorRGB(*[x/255 for x in OLIVE_GOLD], alpha=0.7); c.setLineWidth(0.8)
    c.line(60, H-72, W-60, H-72)
    c.setFillColorRGB(1, 1, 1, alpha=0.97); c.setFont(TITLE_BOLD, 60)
    c.drawCentredString(W/2, H-132, "La Mishná")
    c.setStrokeColorRGB(*[x/255 for x in OLIVE_GOLD], alpha=0.8); c.setLineWidth(1.2)
    c.line(W/2-110, H-146, W/2+110, H-146)
    c.setFillColorRGB(*[x/255 for x in GOLD_LIGHT], alpha=0.95); c.setFont(TITLE_FONT, 17)
    c.drawCentredString(W/2, H-168, "La Palabra que Sobrevivió al Templo")
    c.setFillColorRGB(1, 1, 1, alpha=0.70); c.setFont(BODY_FONT, 9)
    c.drawCentredString(W/2, H-190, "Origen, Estructura y Significado Teológico del Primer Código de la Ley Oral")
    c.setStrokeColorRGB(*[x/255 for x in OLIVE_GOLD], alpha=0.5); c.setLineWidth(0.6)
    c.line(80, 112, W-80, 112)
    c.setFillColorRGB(*[x/255 for x in GOLD_LIGHT], alpha=0.9); c.setFont(BOLD_FONT, 10)
    c.drawCentredString(W/2, 92, "Edgardo Lamas")
    c.setFillColorRGB(1, 1, 1, alpha=0.50); c.setFont(BODY_FONT, 8)
    c.drawCentredString(W/2, 78, "Mayo 2026")
    c.showPage(); c.save()
    print("  Portada OK")


def build_metadata(c):
    c.setFillColorRGB(*[x/255 for x in OLIVE_DEEP]); c.rect(0, 0, W, H, fill=1, stroke=0)
    try:
        tex = PILImage.open(TEXTURE_IMG).convert("RGBA"); arr = np.array(tex, dtype=np.float32)
        arr[:, :, 3] = 28; tex = PILImage.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
        tex = tex.resize((595, 842), PILImage.LANCZOS); tp = "/tmp/mishna_tex_dark.png"; tex.save(tp)
        c.drawImage(tp, 0, 0, width=W, height=H, mask='auto')
    except: pass
    c.setStrokeColorRGB(*[x/255 for x in OLIVE_GOLD], alpha=0.7); c.setLineWidth(1.5)
    c.rect(28, 28, W-56, H-56, fill=0, stroke=1)
    c.setLineWidth(0.5); c.setStrokeColorRGB(*[x/255 for x in OLIVE_GOLD], alpha=0.3)
    c.rect(34, 34, W-68, H-68, fill=0, stroke=1)
    c.setFillColorRGB(*[x/255 for x in OLIVE_GOLD]); c.setFont(TITLE_BOLD, 26)
    c.drawCentredString(W/2, H-88, "La Mishná")
    c.setFont(TITLE_FONT, 12)
    c.drawCentredString(W/2, H-108, "La Palabra que Sobrevivió al Templo")
    c.setStrokeColorRGB(*[x/255 for x in OLIVE_GOLD], alpha=0.5); c.setLineWidth(0.8)
    c.line(80, H-122, W-80, H-122)
    info = [
        ("Serie",        "Libros Sagrados del Pueblo de Israel"),
        ("Número",       "V de la serie"),
        ("Autor",        "Edgardo Lamas"),
        ("Colaboración", "Claude (Anthropic) — IA Especializada"),
        ("Fecha",        "Mayo 2026"),
        ("Fuentes",      "Baron, Halivni, Halevy, Jaffé, Encyclopaedia Judaica"),
        ("Publicación",  "Biblioteca Virtual Sabiduría para el Corazón"),
    ]
    y = H-162
    for label, value in info:
        c.setFillColorRGB(*[x/255 for x in OLIVE_GOLD], alpha=0.7); c.setFont(BOLD_FONT, 8)
        c.drawString(70, y, label.upper())
        c.setFillColorRGB(1, 1, 1, alpha=0.85); c.setFont(BODY_FONT, 9)
        c.drawString(185, y, value)
        y -= 22
    c.setStrokeColorRGB(*[x/255 for x in OLIVE_GOLD], alpha=0.3); c.setLineWidth(0.5)
    c.line(70, y-10, W-70, y-10)
    c.setFillColorRGB(*[x/255 for x in GOLD_LIGHT], alpha=0.6); c.setFont(ITAL_FONT, 8)
    c.drawCentredString(W/2, y-26, "Este estudio examina la Mishná como el primer código de la Ley Oral,")
    c.drawCentredString(W/2, y-38, "desde una perspectiva histórico-teológica cristiana reformada.")
    c.setFillColorRGB(*[x/255 for x in OLIVE_GOLD], alpha=0.85); c.setFont(ITAL_FONT, 10)
    c.drawCentredString(W/2, H//2-26, "«La Mishná es el testimonio de lo que el amor")
    c.drawCentredString(W/2, H//2-40, "por la palabra de Dios puede producir")
    c.drawCentredString(W/2, H//2-54, "en una comunidad que ha perdido todo lo demás.»")
    c.setFont(BODY_FONT, 8); c.setFillColorRGB(*[x/255 for x in GOLD_LIGHT], alpha=0.5)
    c.drawCentredString(W/2, H//2-70, "— Edgardo Lamas")
    c.setFillColorRGB(*[x/255 for x in OLIVE_GOLD], alpha=0.4); c.setFont(BODY_FONT, 7)
    c.drawCentredString(W/2, 45, "sabiduriadelcorazon.com")


def make_page_bg(canvas_obj, doc):
    canvas_obj.saveState()
    # 1. Fondo crema sólido — base limpia y legible
    canvas_obj.setFillColorRGB(0.965, 0.945, 0.900)
    canvas_obj.rect(0, 0, W, H, fill=1, stroke=0)
    # 2. Textura como marca de agua a ~22% opacidad
    canvas_obj.drawImage(TEXTURE_READY_PNG, 0, 0, width=W, height=H, mask='auto')
    # 3. Franja lateral decorativa
    canvas_obj.setFillColorRGB(*[x/255 for x in OLIVE_GOLD], alpha=0.55)
    canvas_obj.rect(28, 50, 2.5, H-100, fill=1, stroke=0)
    canvas_obj.restoreState()


def make_page_decorations(canvas_obj, doc):
    canvas_obj.saveState()
    canvas_obj.setFillColorRGB(*[x/255 for x in OLIVE_DEEP], alpha=0.88)
    canvas_obj.rect(0, H-32, W, 32, fill=1, stroke=0)
    canvas_obj.setFillColorRGB(*[x/255 for x in OLIVE_GOLD])
    canvas_obj.setFont(BOLD_FONT, 7)
    canvas_obj.drawString(44, H-14, "LA MISHNÁ")
    canvas_obj.setFont(BODY_FONT, 7)
    canvas_obj.setFillColorRGB(*[x/255 for x in GOLD_LIGHT], alpha=0.8)
    canvas_obj.drawCentredString(W/2, H-14, "La Palabra que Sobrevivió al Templo")
    canvas_obj.setFont(BODY_FONT, 7)
    canvas_obj.setFillColorRGB(*[x/255 for x in OLIVE_GOLD], alpha=0.9)
    canvas_obj.drawRightString(W-44, H-14, f"Pág. {doc.page}")
    canvas_obj.setFillColorRGB(*[x/255 for x in OLIVE_DEEP], alpha=0.85)
    canvas_obj.rect(0, 0, W, 28, fill=1, stroke=0)
    canvas_obj.setFillColorRGB(*[x/255 for x in OLIVE_GOLD], alpha=0.6)
    canvas_obj.setLineWidth(0.5)
    canvas_obj.line(44, 28, W-44, 28)
    canvas_obj.setFillColorRGB(*[x/255 for x in GOLD_LIGHT], alpha=0.55)
    canvas_obj.setFont(ITAL_FONT, 7)
    canvas_obj.drawCentredString(W/2, 10, "Biblioteca Virtual Sabiduría para el Corazón  ·  sabiduriadelcorazon.com")
    canvas_obj.restoreState()


def s(name, **kw):
    defaults = dict(fontName=BODY_FONT, fontSize=10, leading=17,
                    textColor=colors.HexColor("#120F08"),
                    spaceAfter=7, spaceBefore=0, alignment=TA_JUSTIFY)
    defaults.update(kw)
    return ParagraphStyle(name, **defaults)


def build_content():
    print("Generando contenido...")
    prepare_texture()

    G = colors.HexColor("#B29837")

    styles = {
        "chap": s("chap", fontName=TITLE_BOLD, fontSize=17, leading=22,
                  textColor=colors.HexColor("#1A1A06"), spaceBefore=20, spaceAfter=4,
                  alignment=TA_LEFT),
        "chap_sub": s("chap_sub", fontName=TITLE_FONT, fontSize=12, leading=16,
                      textColor=colors.HexColor("#2E3A10"), spaceBefore=2, spaceAfter=12,
                      alignment=TA_LEFT),
        "sec": s("sec", fontName=BOLD_FONT, fontSize=11, leading=15,
                 textColor=colors.HexColor("#2E3A10"), spaceBefore=14, spaceAfter=5,
                 alignment=TA_LEFT),
        "body": s("body", fontSize=10, leading=17, spaceAfter=7,
                  textColor=colors.HexColor("#120F08"), alignment=TA_JUSTIFY),
        "ital": s("ital", fontName=ITAL_FONT, fontSize=10, leading=17,
                  textColor=colors.HexColor("#1E2A0A"), spaceAfter=7, alignment=TA_JUSTIFY),
        "quote": s("quote", fontName=ITAL_FONT, fontSize=9.5, leading=15,
                   textColor=colors.HexColor("#2E3A10"), leftIndent=28, rightIndent=28,
                   spaceBefore=6, spaceAfter=6, alignment=TA_JUSTIFY),
        "label": s("label", fontName=BOLD_FONT, fontSize=8, leading=12,
                   textColor=colors.HexColor("#2E3A10"), spaceAfter=3, alignment=TA_LEFT),
        "meta": s("meta", fontSize=9, leading=14, textColor=colors.HexColor("#2E3A10"),
                  spaceAfter=4, alignment=TA_LEFT),
        "title_main": s("title_main", fontName=TITLE_BOLD, fontSize=22, leading=28,
                        textColor=colors.HexColor("#1A1A06"), spaceBefore=18, spaceAfter=4,
                        alignment=TA_LEFT),
        "title_sub": s("title_sub", fontName=TITLE_FONT, fontSize=13, leading=18,
                       textColor=colors.HexColor("#2E3A10"), spaceBefore=2, spaceAfter=14,
                       alignment=TA_LEFT),
        "editorial": s("editorial", fontName=ITAL_FONT, fontSize=9.5, leading=15,
                       textColor=colors.HexColor("#1E2A0A"), leftIndent=18, rightIndent=18,
                       spaceAfter=7, alignment=TA_JUSTIFY),
        "biblio": s("biblio", fontName=ITAL_FONT, fontSize=9, leading=14,
                    textColor=colors.HexColor("#2E3A10"), leftIndent=20, spaceAfter=3,
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
    story += [
        Spacer(1, 28),
        Paragraph("La Mishná", styles["title_main"]),
        Paragraph("La Palabra que Sobrevivió al Templo", styles["title_sub"]),
        HR(),
        Paragraph("<i>Origen, Estructura y Significado Teológico del Primer Código de la Ley Oral</i>",
                  styles["ital"]),
        Spacer(1, 6),
        Paragraph("<i>Una aproximación histórico-teológica al nacimiento, contenido e impacto "
                  "doctrinal de la Mishná, desde una perspectiva cristiana reformada.</i>",
                  styles["editorial"]),
        Spacer(1, 10),
        Paragraph("AUTOR", styles["label"]),
        Paragraph("Edgardo Lamas · Asistencia Técnica de IA Especializada (Claude, Anthropic)",
                  styles["meta"]),
        Spacer(1, 4),
        Paragraph("Este trabajo fue elaborado mediante el uso de inteligencia artificial "
                  "especializada (Claude, Anthropic), bajo supervisión y curaduría editorial "
                  "del autor. Se han utilizado fuentes académicas reconocidas en el campo de "
                  "los estudios judaicos y la historia del judaísmo posbíblico, incluyendo, "
                  "entre otros:", styles["body"]),
        Paragraph("Baron, Salo W. — <i>Historia social y religiosa del pueblo judío</i>", styles["biblio"]),
        Paragraph("Halevy, Isaac — <i>Dorot Harishonim</i>", styles["biblio"]),
        Paragraph("Halivni, David Weiss — <i>Meqorot Umesorot</i>", styles["biblio"]),
        Paragraph("Jaffé, Dan — <i>El Talmud y los orígenes judíos del cristianismo</i>", styles["biblio"]),
        Paragraph("Buswell, J. Oliver — <i>Teología Sistemática</i>", styles["biblio"]),
        Paragraph("Ryrie, Charles — <i>Teología Básica</i>", styles["biblio"]),
        Paragraph("Trenchard, Ernesto — <i>Bosquejos de Doctrina Fundamental</i>", styles["biblio"]),
        Paragraph("Encyclopaedia Judaica (Keter Publishing)", styles["biblio"]),
        Paragraph("The Cambridge History of Judaism", styles["biblio"]),
        Spacer(1, 8),
        Paragraph("FECHA", styles["label"]),
        Paragraph("Mayo 2026 · Biblioteca Virtual Sabiduría para el Corazón", styles["meta"]),
        HR(),
        Paragraph("<b>Nota editorial</b>", styles["sec"]),
        Paragraph("Este artículo forma parte de la sección <i>\"Libros Sagrados de Israel\"</i> "
                  "de la Biblioteca Virtual Sabiduría para el Corazón, y debe leerse en "
                  "continuidad con el estudio precedente sobre el Talmud. Si aquel documento "
                  "exploró la gran catedral del pensamiento rabínico en su forma acabada, este "
                  "se ocupa de sus cimientos: la Mishná es, en rigor, la piedra sobre la que "
                  "toda la arquitectura talmúdica fue levantada. Quien comprenda la Mishná "
                  "comprenderá, en su raíz, no solo al judaísmo rabínico, sino también el mundo "
                  "en que Jesús enseñó y Pablo escribió.", styles["editorial"]),
        PageBreak(),
    ]

    # ── INTRODUCCIÓN ─────────────────────────────────────────────────────────
    story += [
        Paragraph("La Palabra que Sobrevivió al Templo", styles["chap"]),
        Paragraph("Introducción", styles["chap_sub"]),
        Paragraph("Hay momentos en la historia en que una civilización entera se ve obligada "
                  "a reinventarse o morir. El año 70 de la era común fue uno de esos momentos "
                  "para el pueblo judío. Cuando las legiones del general Tito redujeron el "
                  "Segundo Templo de Jerusalén a escombros humeantes, no solo cayó un edificio: "
                  "colapsó el eje teológico, ritual y político sobre el cual el judaísmo había "
                  "organizado su existencia durante más de cinco siglos. El sacerdocio levítico "
                  "quedó sin función. Los sacrificios expiatorios, ordenados por la Torá escrita "
                  "como el mecanismo central de la relación entre Israel y su Dios, quedaron "
                  "materialmente imposibles. La pregunta que quedó flotando sobre las ruinas no "
                  "era solo política —¿cómo sobrevivirá el pueblo?— sino profundamente teológica: "
                  "¿puede Israel seguir siendo Israel sin el Templo?", styles["body"]),
        Paragraph("La respuesta que el judaísmo rabínico daría a esa pregunta a lo largo de los "
                  "siglos siguientes es una de las hazañas intelectuales y espirituales más "
                  "extraordinarias de la historia humana, y su instrumento principal fue la "
                  "<b>Mishná</b> (מִשְׁנָה). Esta obra, cuyo nombre deriva de la raíz hebrea "
                  "<i>shanah</i> —«repetir», «estudiar», «enseñar de nuevo»— constituye el "
                  "primer gran código sistemático de la Ley Oral (<i>Torah she-be'al peh</i>), "
                  "redactada y clausurada hacia el año 200 de la era común bajo el liderazgo de "
                  "Rabbí Yehudá haNasí en la región de Galilea. Comprende sesenta y tres tratados "
                  "organizados en seis grandes órdenes temáticos, y abarca desde leyes agrícolas "
                  "y normas de pureza ritual hasta derecho matrimonial, penal y civil. Pero la "
                  "Mishná no es, en rigor, simplemente un código legal. Es el documento fundacional "
                  "de una nueva forma de ser pueblo de Dios en el exilio: una forma que no depende "
                  "de un territorio, ni de un edificio, ni de un sacerdocio hereditario, sino de "
                  "la palabra estudiada, debatida y transmitida de generación en generación.",
                  styles["body"]),
        Paragraph("Para el lector cristiano reformado, la Mishná no es un texto ajeno. Es, en "
                  "buena medida, el mundo en que el Nuevo Testamento fue escrito. Las controversias "
                  "de Jesús con los fariseos, los debates de Pablo sobre la ley y la gracia, la "
                  "formación de Gamaliel que el apóstol reclama como credencial en Hechos 22:3 "
                  "—todo ello solo puede entenderse plenamente desde la matriz de pensamiento que "
                  "la Mishná codifica. Al mismo tiempo, desde la perspectiva de la suficiencia de "
                  "las Escrituras, el estudio de este corpus plantea una pregunta teológica de "
                  "primera importancia: ¿puede la tradición interpretativa humana adquirir "
                  "autoridad equiparable a la revelación escrita? La respuesta que el judaísmo "
                  "rabínico da, y la respuesta que la tradición reformada ofrece en contrapartida, "
                  "constituyen uno de los diálogos más ricos y más serios de la historia del "
                  "pensamiento religioso.", styles["body"]),
        HR(),
    ]

    # ── CAPÍTULO I ───────────────────────────────────────────────────────────
    story += [
        Paragraph("Capítulo I — El Nacimiento de una Obra Imprescindible: Crisis, Personajes y Vocación",
                  styles["chap"]),
        Paragraph("<b>La catástrofe que lo cambió todo</b>", styles["sec"]),
        Paragraph("Para comprender la Mishná es imprescindible comenzar donde ella misma comenzó: "
                  "en la tragedia. La destrucción del Templo en el año 70 d.C. no fue un desastre "
                  "entre otros en la larga historia de sufrimientos del pueblo judío. Fue, en "
                  "términos teológicos, una crisis de proporciones sinaíticas: si en el Sinaí "
                  "Dios había establecido el sistema de culto que organizaba la relación entre "
                  "Israel y su Señor, la destrucción del Templo parecía desmantelar ese sistema "
                  "por completo. ¿Cómo se expiarían los pecados sin el <i>Yom Kipur</i> "
                  "sacerdotal? ¿Cómo se agradecería la cosecha sin las primicias ofrecidas en "
                  "el altar? ¿Cómo se mantendría la pureza ritual sin los rituales del Templo?",
                  styles["body"]),
        Paragraph("La respuesta rabínica fue, en su forma más radical, una operación de "
                  "<i>traducción</i>: traducir el sistema sacrificial en un sistema de estudio, "
                  "oración y observancia halájica. El sacrificio del animal fue reemplazado por "
                  "el estudio de las leyes del sacrificio —un principio que ya los profetas habían "
                  "anticipado: «Porque misericordia quiero, y no sacrificio, y conocimiento de "
                  "Dios más que holocaustos» (Oseas 6:6). La sinagoga (<i>Beit Knesset</i>) y "
                  "la casa de estudio (<i>Beit Midrash</i>) se convirtieron en los nuevos centros "
                  "de la vida nacional. El pueblo que había organizado su existencia en torno al "
                  "altar organizó su existencia en torno al texto.", styles["body"]),
        Paragraph("Esta transformación no fue espontánea. Tuvo un arquitecto: Rabbán Yojanán "
                  "ben Zakkai, el sabio que, según la tradición, escapó de Jerusalén sitiada "
                  "escondido en un ataúd y se presentó ante el general Vespasiano para pedirle "
                  "un único favor: permiso para establecer una academia en Yavné, una pequeña "
                  "ciudad costera lejos del fragor de la guerra. Vespasiano, quizás sin "
                  "comprender del todo lo que estaba autorizando, concedió la petición. Desde "
                  "esa academia en Yavné, Rabbán Yojanán ben Zakkai comenzó el trabajo de "
                  "reorganizar la vida judía sin Templo, adaptando las leyes y los ritos, "
                  "creando precedentes institucionales, nombrando autoridades. No salvó el "
                  "edificio. Salvó algo más duradero: la tradición intelectual que haría posible "
                  "la sobrevivencia del pueblo durante los dos milenios siguientes.",
                  styles["body"]),
        Paragraph("La segunda gran catástrofe que aceleró el proceso fue la rebelión de Bar "
                  "Kojba entre los años 132 y 135 d.C., aplastada brutalmente por el emperador "
                  "Adriano. Tras esa derrota, los romanos prohibieron la enseñanza de la Torá "
                  "y ejecutaron a muchos de los grandes maestros —entre ellos el célebre Rabbí "
                  "Akiva, que murió bajo tortura mientras recitaba el <i>Shemá</i>. La "
                  "persecución romana hizo urgente lo que antes era simplemente importante: si "
                  "la tradición oral podía perderse con la muerte de sus custodios humanos, era "
                  "necesario fijarla por escrito. La Mishná fue, en parte, una respuesta al "
                  "martirio.", styles["body"]),
    ]

    # IL1
    story += illus(ILLUS_1, "Rabbán Yojanán ben Zakkai funda la academia de Yavné (c. 70 d.C.), "
                   "preservando la tradición oral tras la destrucción del Templo.")

    story += [
        Paragraph("<b>Hillel, Shammai y los cimientos del debate</b>", styles["sec"]),
        Paragraph("Antes de que existiera la Mishná como texto, existían las escuelas que la "
                  "harían posible. Y antes de las escuelas, existían dos figuras monumentales "
                  "cuya tensión creativa generó el método dialéctico que define el pensamiento "
                  "mishnaico: Hillel el Viejo (<i>Hillel ha-Zaqen</i>) y Shammai.",
                  styles["body"]),
        Paragraph("Hillel llegó a Jerusalén desde Babilonia, probablemente durante el reinado "
                  "de Herodes, con una reputación que precedía a su persona. La tradición narra "
                  "que era tan pobre que a veces no tenía el dinero para pagar la entrada a la "
                  "academia de estudio, y que en una ocasión de invierno fue encontrado medio "
                  "congelado en el techo del <i>Beit Midrash</i>, donde se había trepado para "
                  "escuchar la lección a través de una abertura. Ese detalle biográfico —si es "
                  "histórico o legendario, importa menos que lo que revela— dice algo esencial "
                  "sobre el hombre: el estudio era para él literalmente más importante que la "
                  "supervivencia física. Hillel fundó una escuela (<i>Bet Hillel</i>) que tendía "
                  "hacia interpretaciones más flexibles y accesibles, especialmente sensibles a "
                  "las necesidades de las clases trabajadoras y a la realidad de la diáspora. "
                  "Su hermenéutica era expansiva, su tono pastoral, su método fundamentalmente "
                  "empático.", styles["body"]),
        Paragraph("Shammai, en contraste, representaba una visión más austera y rigurosa. Su "
                  "escuela (<i>Bet Shammai</i>) estaba vinculada a los círculos aristocráticos "
                  "de Jerusalén y tendía hacia interpretaciones más estrictas, más literales, "
                  "menos dispuestas a ceder ante las presiones del contexto social. La tradición "
                  "lo describe como un hombre de carácter difícil, severo en el trato, inflexible "
                  "en sus convicciones. Una anécdota famosa lo ilustra: cuando un gentil se "
                  "acercó a Shammai con la petición de que le enseñara toda la Torá mientras se "
                  "mantenía en un pie, Shammai lo echó con una palmeta de constructor. El mismo "
                  "gentil fue luego a Hillel con la misma petición, y Hillel respondió: «Lo que "
                  "es odioso para ti, no lo hagas a tu prójimo. Eso es toda la Torá; el resto "
                  "es comentario. Ve y estudia.»", styles["body"]),
        Paragraph("Los debates entre Bet Hillel y Bet Shammai son el corazón dialéctico de la "
                  "Mishná. Se registran en centenares de disputas sobre práctica halájica: si el "
                  "vino del sábado debe bendecirse antes o después del pan, cómo encender las "
                  "luces de Janucá, cuándo se considera consumado un divorcio, qué constituye "
                  "trabajo prohibido en el Shabat. Pero lo que hace extraordinaria la Mishná no "
                  "es que haya resuelto estos debates eligiendo siempre a uno de los dos "
                  "contendientes. Es que los conservó ambos, con sus argumentos respectivos, "
                  "bajo el principio teológico que se volvería uno de los más audaces del "
                  "pensamiento rabínico: <i>Elu ve-elu divré Elohim jaim</i> — «estas y aquellas "
                  "son palabras del Dios vivo». La verdad, para el judaísmo rabínico, no siempre "
                  "se resuelve en una sola opinión. A veces habita en la tensión entre dos voces "
                  "que no pueden reconciliarse del todo, porque la realidad de Dios desborda "
                  "cualquier formulación humana singular.", styles["body"]),
        Paragraph("Para la perspectiva reformada, este principio merece una consideración "
                  "cuidadosa. No se trata, como podría parecer a primera vista, de un relativismo "
                  "teológico. Los sabios rabínicos no afirmaban que toda interpretación fuera "
                  "igualmente válida. Afirmaban que el debate honesto entre intérpretes serios y "
                  "comprometidos con la voluntad divina produce, en sí mismo, una forma de "
                  "aproximación a la verdad que la imposición autoritaria de una sola voz no "
                  "puede alcanzar. La práctica <i>halájica</i> terminó siguiendo mayoritariamente "
                  "a la escuela de Hillel —no porque Shammai estuviera equivocado en todo, sino "
                  "porque la humildad y flexibilidad de Hillel producían una ley más sustentable "
                  "para un pueblo en diáspora— pero los argumentos de Shammai se preservaron, "
                  "porque también ellos eran «palabras del Dios vivo». Este respeto por la "
                  "disidencia honesta dentro de un marco de autoridad compartida tiene resonancias "
                  "con la mejor tradición de la teología reformada, que ha sabido distinguir entre "
                  "los fundamentos indiscutibles del evangelio y las conclusiones teológicas sobre "
                  "las cuales personas piadosas y bíblicamente comprometidas pueden diferir.",
                  styles["body"]),
    ]

    # IL2
    story += illus(ILLUS_2, "Hillel y Shammai debaten en el patio del Templo. Sus escuelas "
                   "definieron el método dialéctico que caracteriza a la Mishná.")

    story += [
        Paragraph("<b>Yehudá haNasí: el arquitecto del canon mishnaico</b>", styles["sec"]),
        Paragraph("Si Hillel y Shammai proveyeron los materiales, Rabbí Yehudá haNasí fue el "
                  "arquitecto que convirtió esos materiales en una estructura duradera. Conocido "
                  "simplemente como «Rabbí» —un título que en la tradición rabínica significa "
                  "que ningún nombre adicional es necesario— fue el <i>Nasi</i> (príncipe o "
                  "patriarca) de la comunidad judía en Palestina durante el período de la llamada "
                  "<i>Pax Romana</i>, cuando la presión sobre el pueblo judío había cedido lo "
                  "suficiente como para permitir un trabajo de sistematización sin el riesgo "
                  "inmediato de persecución.", styles["body"]),
        Paragraph("La vida de Yehudá haNasí es, en sí misma, una historia fascinante de poder, "
                  "relaciones y vocación. Nieto de Gamaliel II y bisnieto del Gamaliel que "
                  "menciona Pablo en Hechos, Yehudá haNasí era heredero de la dinastía de Hillel "
                  "y representaba, ante las autoridades romanas, la continuidad del liderazgo "
                  "judío reconocido. La tradición talmúdica lo recuerda como un hombre de enorme "
                  "riqueza —se dice que sus establos eran más ricos que los del rey persa— y de "
                  "una amistad personal con el emperador Marco Aurelio (o quizás con Antonino "
                  "Pío, las fuentes son ambiguas al respecto). Esa cercanía con el poder romano "
                  "no era solo un dato biográfico curioso: le daba a Yehudá haNasí el espacio "
                  "político para hacer lo que ningún predecesor había podido hacer con tanta "
                  "autoridad: compilar, seleccionar y dar forma definitiva a la tradición oral "
                  "del pueblo.", styles["body"]),
        Paragraph("El proceso de redacción de la Mishná fue, según todas las indicaciones, un "
                  "trabajo de décadas. Yehudá haNasí no inventó el material que compiló; lo "
                  "encontró distribuido en tradiciones orales, en memorias de disputas escolares, "
                  "en fragmentos de enseñanzas anteriores transmitidas por los <i>Tannaim</i> "
                  "—los «repetidores», los maestros de la generación anterior cuyas enseñanzas "
                  "serían la materia prima de la obra. Su tarea fue editorial en el sentido más "
                  "profundo del término: seleccionar qué incluir y qué omitir, organizar el "
                  "material en los seis órdenes temáticos que dan a la Mishná su estructura "
                  "característica, y establecer un hebreo técnico, conciso y preciso que pudiera "
                  "ser memorizado y transmitido con exactitud.", styles["body"]),
        Paragraph("Hay una tensión académica profunda sobre la naturaleza de esta tarea. Isaac "
                  "Halevy, en su monumental <i>Dorot Harishonim</i>, defiende la postura "
                  "tradicional: Yehudá haNasí fue principalmente un conservador, un custodio de "
                  "una tradición inmutable que se remontaba a los hombres de la Gran Asamblea y, "
                  "en última instancia, al propio Moisés. Desde esta perspectiva, la Mishná es "
                  "la transcripción —selectiva pero fiel— de una revelación que siempre había "
                  "existido en forma oral. David Weiss Halivni, en cambio, propone en su "
                  "<i>Meqorot Umesorot</i> una imagen más compleja: Yehudá haNasí fue también "
                  "un editor creativo, que a veces reconstruyó sentencias breves y categóricas "
                  "transmitidas por los <i>Tannaim</i> (<i>memrot</i>), dándoles una estructura "
                  "dialéctica más elaborada para hacerlas aplicables a las realidades de la vida "
                  "en la diáspora. Las «explicaciones forzadas» (<i>dehuqim</i>) que Halivni "
                  "identifica en el texto —argumentos que parecen esforzarse demasiado para "
                  "armonizar tradiciones contradictorias— serían el rastro de esa labor "
                  "reconstructiva.", styles["body"]),
        Paragraph("Lo que parece indiscutible es que Yehudá haNasí actuó con una conciencia "
                  "clara de lo que estaba en juego. Él mismo habría dicho, según la tradición, "
                  "que publicó la Mishná porque «las fuerzas [del pueblo] han disminuido y se "
                  "ha extendido el Imperio Romano, y yo temo que la Torá se olvide de Israel». "
                  "El gesto es de una honestidad desconcertante: el gran <i>Nasi</i>, el hombre "
                  "más poderoso del judaísmo de su tiempo, admitiendo que el peligro del olvido "
                  "era tan real que justificaba romper con la tradición de mantener la Ley Oral "
                  "exclusivamente en forma oral. La escritura de la Mishná fue, en este sentido, "
                  "un acto de humildad institucional: reconocer que la memoria humana, por más "
                  "entrenada y devota que sea, no es una garantía suficiente para la supervivencia "
                  "de una herencia que ha costado siglos construir.", styles["body"]),
        Paragraph("<b>Los Tannaim: la comunidad de transmisores</b>", styles["sec"]),
        Paragraph("La Mishná no es la obra de un solo hombre, aunque un solo hombre le diera su "
                  "forma definitiva. Es el depósito de una comunidad intelectual y espiritual que "
                  "actuó durante casi dos siglos: los <i>Tannaim</i> (תַּנָּאִים), los sabios "
                  "cuyas enseñanzas constituyen el contenido de la obra. El término arameo "
                  "<i>tanná</i> significa «repetidor» o «docente», y refleja con precisión la "
                  "naturaleza de su oficio: eran hombres que habían consagrado su vida a recibir "
                  "la tradición de sus maestros, a internalizarla mediante la repetición constante, "
                  "y a transmitirla a sus propios discípulos en la cadena ininterrumpida de "
                  "transmisión que la Mishná misma describe en el primer capítulo del tratado "
                  "<i>Avot</i>: «Moisés recibió la Torá del Sinaí y la transmitió a Josué, "
                  "Josué a los ancianos, los ancianos a los profetas, y los profetas a los "
                  "hombres de la Gran Asamblea...»", styles["body"]),
        Paragraph("Entre los <i>Tannaim</i> más significativos se encuentran figuras cuyas "
                  "historias iluminan el contexto en que la Mishná tomó forma. Rabbí Akiva ben "
                  "Yosef, quizás el más influyente de todos, llegó al estudio de la Torá de "
                  "manera tardía —se dice que comenzó a aprender a leer a los cuarenta años, "
                  "impulsado por su esposa Raquel, hija de un hombre rico que lo había rechazado "
                  "como yerno precisamente por su ignorancia— y se convirtió en el maestro por "
                  "excelencia de su generación, con una capacidad para derivar leyes de cada "
                  "detalle del texto bíblico que sus propios contemporáneos encontraban asombrosa. "
                  "La tradición narra que incluso Moisés, en una visión, fue transportado al "
                  "futuro para escuchar a Akiva enseñar, y no pudo seguir los argumentos; pero "
                  "cuando un discípulo preguntó cuál era el origen de una ley, Akiva respondió "
                  "«halajá dada a Moisés en el Sinaí», y Moisés quedó tranquilo. Es una anécdota "
                  "teológicamente densa: sugiere que la interpretación rabínica, aunque humana "
                  "en su forma, participa de la revelación original en su sustancia.",
                  styles["body"]),
        Paragraph("Rabbí Akiva murió bajo tortura romana por negarse a dejar de enseñar la Torá. "
                  "Se dice que mientras los verdugos desgarraban su carne con peines de hierro, "
                  "él recitaba el <i>Shemá</i>, y cuando sus discípulos le preguntaron cómo "
                  "podía mantener esa serenidad, respondió: «Toda mi vida me preocupé por el "
                  "versículo “amarás al Señor tu Dios con todo tu corazón, con toda tu alma y "
                  "con todas tus fuerzas”, preguntándome cuándo podría cumplirlo. Ahora que "
                  "tengo la oportunidad, ¿no habría de aprovecharla?» Su muerte, como la de los "
                  "otros «diez mártires» que la tradición conmemora en el servicio de <i>Yom "
                  "Kipur</i>, se convirtió en el paradigma del <i>Kiddush Hashem</i> —la "
                  "santificación del nombre de Dios a través del martirio— y su figura quedó "
                  "indisolublemente ligada a la Mishná que su trabajo contribuyó a formar.",
                  styles["body"]),
        PageBreak(),
    ]

    # ── CAPÍTULO II ──────────────────────────────────────────────────────────
    story += [
        Paragraph("Capítulo II — La Arquitectura del Texto: Estructura, Contenido y Método",
                  styles["chap"]),
        Paragraph("<b>Los seis órdenes: una cartografía de la vida sagrada</b>", styles["sec"]),
        Paragraph("La Mishná está organizada en seis grandes órdenes o <i>Sedarim</i> (סדרים), "
                  "cada uno de los cuales corresponde a un ámbito fundamental de la existencia "
                  "humana bajo la Ley de Dios. Esta organización no es burocrática ni arbitraria: "
                  "refleja una visión teológica coherente según la cual la totalidad de la vida "
                  "—desde la tierra que se labra hasta el cuerpo que se purifica, desde el "
                  "matrimonio que se contrae hasta el sacrificio que se ofrece— está "
                  "potencialmente santificada por la obediencia a la voluntad divina. El estudio "
                  "de cada orden es, en este sentido, un acto de contemplación: una mirada a la "
                  "manera en que Dios ordena la realidad.", styles["body"]),
        Paragraph("El primero de los órdenes es <b><i>Zeraim</i></b> («Semillas»), que trata "
                  "sobre las leyes agrícolas, los diezmos, las ofrendas de primicia y las oraciones "
                  "que estructuran la relación del ser humano con la tierra. El tratado que abre "
                  "este orden y, por tanto, abre toda la Mishná, es <i>Berajot</i> («Bendiciones»), "
                  "dedicado a las oraciones y bendiciones de la vida cotidiana. Esta elección no "
                  "es accidental: al poner la oración en primer lugar, la Mishná declara desde "
                  "su primera página que el fundamento de toda vida ordenada es la orientación "
                  "del corazón hacia Dios.", styles["body"]),
        Paragraph("El segundo orden, <b><i>Moed</i></b> («Festividad»), es quizás el más "
                  "íntimamente familiar para el lector del Nuevo Testamento. Contiene doce "
                  "tratados que regulan el tiempo sagrado: el <i>Shabat</i>, las festividades "
                  "anuales —Pésaj, Shavuot, Sucot, Janucá, Rosh Hashaná, Yom Kipur—, los días "
                  "de ayuno. El tratado <i>Shabat</i> contiene la famosa lista de las treinta y "
                  "nueve categorías principales de trabajo prohibido (<i>avot melajot</i>), "
                  "derivadas de los tipos de trabajo empleados en la construcción del Tabernáculo "
                  "en el desierto. Esta lista —que incluye sembrar, arar, cosechar, tejer, "
                  "escribir, encender fuego y transportar objetos en el espacio público— fue el "
                  "terreno principal de los debates entre Bet Hillel y Bet Shammai, y es "
                  "precisamente el contexto en que deben entenderse las controversias entre Jesús "
                  "y los fariseos sobre las actividades lícitas en el día de reposo.",
                  styles["body"]),
        Paragraph("El tercer orden, <b><i>Nashim</i></b> («Mujeres»), contiene el derecho de "
                  "familia del judaísmo rabínico: matrimonio, divorcio, votos, moral sexual. El "
                  "tratado <i>Ketubot</i> regula el contrato matrimonial (<i>Ketubá</i>), que "
                  "establece las obligaciones financieras del marido hacia la esposa y sus hijos "
                  "en caso de divorcio o viudedad —un instrumento que funcionaba, en la práctica, "
                  "como un seguro social primitivo que protegía a la mujer de la arbitrariedad "
                  "masculina. El tratado <i>Gittin</i> regula el proceso de divorcio, y es el "
                  "trasfondo preciso del debate en que Jesús fue interpelado sobre si era lícito "
                  "divorciarse «por cualquier causa» (Mateo 19:3) —una pregunta que refleja "
                  "exactamente la disputa entre Bet Shammai, que restringía el divorcio a casos "
                  "de infidelidad, y Bet Hillel, que lo permitía por motivos más amplios.",
                  styles["body"]),
        Paragraph("El cuarto orden, <b><i>Nezikin</i></b> («Daños»), es el más extenso de los "
                  "seis y corresponde al derecho civil, penal y mercantil. Sus diez tratados "
                  "cubren todo el espectro de las disputas humanas: daños a la propiedad, robo, "
                  "préstamos, contratos, testimonios, sanciones penales, organización de los "
                  "tribunales. El tratado <i>Sanhedrín</i> regula la composición y procedimientos "
                  "del gran tribunal de setenta y un jueces que tenía jurisdicción sobre los casos "
                  "capitales. El tratado <i>Avot</i> («Padres»), incluido en este orden por "
                  "razones que los comentaristas han debatido durante siglos, es el más leído y "
                  "conocido de toda la Mishná: una colección de máximas éticas de los grandes "
                  "maestros que funciona como la conciencia moral de la obra entera.",
                  styles["body"]),
        Paragraph("El quinto orden, <b><i>Kodashim</i></b> («Santidades»), documenta las leyes "
                  "del culto sacrificial del Templo: los tipos de sacrificios, las normas del "
                  "servicio sacerdotal, la arquitectura y las medidas del edificio sagrado. Este "
                  "orden presenta una particularidad teológicamente significativa: fue redactado "
                  "y clausurado en el año 200 d.C., más de un siglo después de la destrucción "
                  "del Templo al que se refiere. Los sabios preservaron meticulosamente unas "
                  "leyes que sabían que no podían ser practicadas, bajo el principio de que el "
                  "estudio de las leyes del sacrificio equivale, en cierta medida, a la "
                  "realización del sacrificio mismo. Hay en esto un eco de Proverbios 21:3: "
                  "«El hacer justicia y juicio es a Jehová más agradable que el sacrificio.»",
                  styles["body"]),
        Paragraph("El sexto y más extenso orden, <b><i>Tohorot</i></b> («Purezas»), detalla "
                  "las leyes de pureza e impureza ritual: las fuentes de contaminación, los "
                  "procesos de purificación, el uso de la <i>Micvé</i> (el baño ritual de "
                  "inmersión), las leyes de la <i>Nidá</i> (impureza menstrual). El tratado "
                  "<i>Yadayim</i> («Manos») regula específicamente el lavado ritual de manos "
                  "antes de las comidas —la práctica cuya omisión por parte de los discípulos "
                  "de Jesús provocó la confrontación documentada en Mateo 15 y Marcos 7.",
                  styles["body"]),
        Paragraph("<b>Halajá y Aggadá: los dos lenguajes de la revelación</b>", styles["sec"]),
        Paragraph("La Mishná habla dos lenguajes que, aunque distintos en naturaleza, están "
                  "íntimamente entrelazados a lo largo de sus páginas. El primero es el lenguaje "
                  "de la <i>Halajá</i> (הֲלָכָה) —de la raíz <i>halaj</i>, «caminar» o «andar»— "
                  "que designa el cuerpo normativo de leyes que regulan la conducta concreta del "
                  "creyente. La <i>Halajá</i> es la respuesta a la pregunta «¿cómo se camina?»: "
                  "¿cómo se celebra el Shabat, cómo se contrae matrimonio, cómo se trata al "
                  "extranjero, cómo se purifica el cuerpo? Es el lenguaje de la ley entendida "
                  "no como opresión sino como guía: el camino que Dios ha trazado para que su "
                  "pueblo ande en santidad por el mundo.", styles["body"]),
        Paragraph("El segundo lenguaje es el de la <i>Aggadá</i> (אַגָּדָה, «narración» o "
                  "«relato»), que comprende el material no estrictamente legal de la Mishná: "
                  "las anécdotas sobre los maestros, las máximas éticas, las parábolas, las "
                  "reflexiones sobre el sentido de la vida y la naturaleza de Dios. Si la "
                  "<i>Halajá</i> es el esqueleto de la Mishná, la <i>Aggadá</i> es su alma. "
                  "Las máximas del tratado <i>Avot</i> son el ejemplo más puro de este género: "
                  "«Sobre tres cosas se sostiene el mundo: sobre la Torá, sobre el culto y sobre "
                  "los actos de bondad» (Avot 1:2); «No seas como los siervos que sirven al amo "
                  "para recibir recompensa, sino como los que sirven sin esperar recompensa» "
                  "(Avot 1:3); «En un lugar donde no hay hombres [íntegros], esfuérzate por ser "
                  "un hombre» (Avot 2:6).", styles["body"]),
        Paragraph("La relación entre <i>Halajá</i> y <i>Aggadá</i> es, en sí misma, una "
                  "declaración teológica. La ley sin narrativa se convierte en formalismo; la "
                  "narrativa sin ley se convierte en sentimentalismo. La Mishná los mantiene "
                  "juntos porque entiende que obedecer a Dios requiere tanto la orientación "
                  "práctica de la <i>Halajá</i> como la motivación interior que solo la "
                  "<i>Aggadá</i> —con sus historias de amor, sacrificio, humildad y sabiduría— "
                  "puede cultivar. Esta integración tiene un paralelo notable en la estructura "
                  "del Nuevo Testamento, donde la enseñanza ética de Jesús es inseparable de "
                  "la narrativa de su vida, y donde las instrucciones prácticas de Pablo están "
                  "siempre enraizadas en la narración del evangelio.", styles["body"]),
        Paragraph("<b>El método dialéctico: preservar el desacuerdo como acto teológico</b>",
                  styles["sec"]),
        Paragraph("Una de las características más llamativas de la Mishná para el lector moderno "
                  "—y especialmente para el lector formado en tradiciones que valoran la claridad "
                  "doctrinal y la uniformidad de la enseñanza— es que el texto preserva "
                  "sistemáticamente las opiniones de la minoría junto a las de la mayoría. Cuando "
                  "Bet Shammai y Bet Hillel difieren, la Mishná registra ambas posiciones. Cuando "
                  "un maestro individual disiente de la mayoría de sus colegas, su voz queda "
                  "registrada. Cuando un argumento fue rechazado pero era intelectualmente serio, "
                  "se conserva para que futuras generaciones puedan considerarlo.",
                  styles["body"]),
        Paragraph("El principio que subyace a esta práctica es explícito en el tratado "
                  "<i>Eduyot</i>: «¿Por qué se registran las palabras de la minoría junto a las "
                  "de la mayoría, si la ley no sigue a la minoría? Para que si un tribunal futuro "
                  "prefiere la opinión de la minoría, pueda apoyarse en ella.» Hay aquí una "
                  "epistemología profundamente humilde: el reconocimiento de que ninguna generación "
                  "tiene acceso a la verdad completa, y que la preservación del desacuerdo honesto "
                  "es una forma de mantener abierta la posibilidad de una comprensión más profunda "
                  "en el futuro.", styles["body"]),
        Paragraph("El método dialéctico de la Mishná presenta, sin embargo, un desafío teológico "
                  "importante desde la perspectiva reformada. Si toda opinión seria es "
                  "potencialmente «palabra del Dios vivo», ¿dónde está el criterio para la verdad? "
                  "La respuesta rabínica apunta a la comunidad de práctica —la <i>Halajá</i> que "
                  "finalmente se establece no por decreto individual sino por consenso generacional— "
                  "y a la tradición transmitida. La respuesta reformada, en cambio, señala a la "
                  "Escritura como árbitro último: la <i>sola Scriptura</i> no como rechazo del "
                  "estudio y la reflexión, sino como criterio por encima del cual ninguna tradición "
                  "puede colocarse. Aquí reside una de las diferencias más fundamentales entre el "
                  "judaísmo rabínico y el protestantismo reformado, y una de las más fecundas para "
                  "el diálogo entre ambas tradiciones.", styles["body"]),
        PageBreak(),
    ]

    # ── CAPÍTULO III ─────────────────────────────────────────────────────────
    story += [
        Paragraph("Capítulo III — La Mishná y el Nuevo Testamento: El Mismo Mundo, Respuestas Distintas",
                  styles["chap"]),
        Paragraph("<b>Jesús en el mundo de la Mishná</b>", styles["sec"]),
        Paragraph("El ministerio público de Jesús de Nazaret transcurrió exactamente en el "
                  "período de los <i>Tannaim</i>. Los maestros cuyas enseñanzas la Mishná recoge "
                  "—Hillel, Shammai, Gamaliel el Viejo, Rabbí Akiva— son contemporáneos o casi "
                  "contemporáneos de Jesús. Las controversias que los evangelios registran entre "
                  "Jesús y los fariseos no son debates abstractos entre posiciones teológicas: "
                  "son intervenciones específicas en debates halájicos que la Mishná también "
                  "registra, aunque con voces y conclusiones distintas.", styles["body"]),
        Paragraph("El episodio de Mateo 15:1-9 y Marcos 7:1-13 es uno de los más iluminadores. "
                  "Los fariseos y escribas llegados desde Jerusalén le preguntan a Jesús por qué "
                  "sus discípulos no se lavan las manos antes de comer, «porque no guardan la "
                  "tradición de los ancianos». El lavado ritual de manos antes de las comidas "
                  "—el <i>netilat yadayim</i>— no es una prescripción de la Torá escrita; es "
                  "una extensión halájica, una «tradición de los ancianos» que el orden "
                  "<i>Tohorot</i> de la Mishná sistematiza en detalle. La respuesta de Jesús "
                  "es teológicamente precisa: no cuestiona la práctica del lavado en sí misma, "
                  "sino la pretensión de que esta tradición interpretativa humana pueda colocarse "
                  "al mismo nivel que —o incluso por encima de— el mandamiento de Dios. La cita "
                  "de Isaías 29:13 que Jesús emplea —«este pueblo de labios me honra, pero su "
                  "corazón está lejos de mí, pues en vano me rinden culto, enseñando como "
                  "doctrinas mandamientos de hombres»— es precisamente la objeción que la "
                  "doctrina reformada de la suficiencia de las Escrituras articula frente a "
                  "cualquier sistema que eleve la tradición humana a la misma autoridad que la "
                  "revelación escrita.", styles["body"]),
        Paragraph("El caso del <i>Corbán</i> que Jesús analiza en el mismo pasaje es igualmente "
                  "revelador. La palabra <i>Korban</i> (קָרְבָּן) designa una ofrenda dedicada "
                  "a Dios, y la práctica que Jesús critica consiste en que un hombre podía "
                  "declarar «corbán» los bienes que de otra manera estaría obligado a usar para "
                  "sostener a sus padres ancianos, eludiendo así el mandamiento de honrar al "
                  "padre y a la madre. El tratado <i>Nedarim</i> de la Mishná registra debates "
                  "sobre casos similares, y aunque algunos maestros intentaron limitar los abusos "
                  "de esta práctica, la crítica de Jesús apunta a un problema estructural: cuando "
                  "la tradición interpretativa se desarrolla con suficiente autonomía y sofisticación "
                  "técnica, puede llegar a producir resultados que contradicen el espíritu —e "
                  "incluso la letra— del texto que pretende interpretar.", styles["body"]),
        Paragraph("Los debates sobre el Shabat merecen una atención particular. El principio de "
                  "<i>Pikuaj Nefesh</i> —la preservación de la vida humana que suspende "
                  "prácticamente todos los mandamientos, incluidas las restricciones del Shabat— "
                  "ya estaba siendo debatido en el período mishnaico, y Jesús lo invoca "
                  "implícitamente en sus sanaciones sabáticas. Cuando pregunta a sus adversarios "
                  "«¿es lícito en el Shabat hacer bien o hacer mal, salvar una vida o matar?» "
                  "(Marcos 3:4), no está introduciendo una idea nueva en el debate; está tomando "
                  "partido en un debate que la tradición rabínica reconocía. Los maestros de Bet "
                  "Hillel tendían hacia interpretaciones más amplias del <i>Pikuaj Nefesh</i>; "
                  "los de Bet Shammai, hacia interpretaciones más restrictivas. La diferencia "
                  "entre Jesús y sus interlocutores no reside en la legitimidad del principio, "
                  "sino en la autoridad con que Jesús lo aplica: él no debate como un <i>Tanná</i> "
                  "que apela a la cadena de la tradición, sino como alguien que habla «con "
                  "autoridad, y no como los escribas» (Mateo 7:29).", styles["body"]),
    ]

    # IL3
    story += illus(ILLUS_3, "Jesús debate con los fariseos en el patio del Templo. Sus controversias "
                   "se inscriben directamente en los debates halájicos de la Mishná.")

    story += [
        Paragraph("<b>Pablo formado a los pies de Gamaliel</b>", styles["sec"]),
        Paragraph("La figura de Gamaliel el Viejo —nieto de Hillel y uno de los <i>Tannaim</i> "
                  "más respetados de su generación— conecta directamente la Mishná con la teología "
                  "paulina. Pablo afirma en Hechos 22:3 haber sido educado «a los pies de "
                  "Gamaliel», y usa esta formación como credencial de su competencia en la ley "
                  "judía. Gamaliel aparece en los Hechos de los Apóstoles no solo como maestro "
                  "de Pablo, sino como voz de moderación en el Sanedrín: es él quien, ante la "
                  "propuesta de ejecutar a los apóstoles, pronuncia el famoso argumento que evoca "
                  "a Teudas y Judas el Galileo para concluir: «Os digo que os apartéis de estos "
                  "hombres y dejadlos; porque si este consejo o esta obra es de los hombres, se "
                  "desvanecerá; mas si es de Dios, no la podréis destruir» (Hechos 5:38-39).",
                  styles["body"]),
        Paragraph("Esta formación mishnaica de Pablo tiene consecuencias que los exegetas "
                  "reformados han reconocido progresivamente. El vocabulario técnico que Pablo "
                  "emplea en sus cartas —<i>nomos</i> (ley), <i>dikaiosyne</i> (justicia/ "
                  "justificación), <i>pistis</i> (fe), <i>ergon</i> (obra)— no puede entenderse "
                  "plenamente sin la matriz halájica en que Pablo lo aprendió. Cuando Pablo "
                  "escribe en Romanos que «por las obras de la ley ninguna carne será justificada "
                  "delante de él» (Romanos 3:20), el término «obras de la ley» no se refiere a "
                  "la actividad moral en general, sino específicamente a las observancias halájicas "
                  "que marcaban la frontera entre Israel y las naciones —la circuncisión, las "
                  "leyes alimentarias, las normas de pureza— precisamente las categorías que la "
                  "Mishná organiza y regula. La argumentación de Pablo no es un rechazo de la ley "
                  "como tal —«¿luego invalidamos por la fe la ley? En ninguna manera, sino que "
                  "confirmamos la ley» (Romanos 3:31)— sino una reubicación de su función: la "
                  "ley como <i>paidagogos</i>, como pedagogo que nos conduce a Cristo (Gálatas "
                  "3:24), no como sistema de méritos acumulados ante Dios.", styles["body"]),
        Paragraph("La alegoría de Agar y Sara en Gálatas 4 —que Saul Lieberman señalaba como "
                  "ejemplo del uso paulino de las herramientas hermenéuticas rabínicas "
                  "(<i>middot</i>)— muestra a un Pablo que no ha abandonado el método "
                  "interpretativo de sus maestros mishnaicos, sino que lo ha reorientado por "
                  "completo hacia el evangelio de Cristo. La tipología, la analogía, la "
                  "interpretación de un texto a la luz de otro: estas son las técnicas que "
                  "Gamaliel le enseñó, y que Pablo ahora emplea para demostrar que la promesa "
                  "hecha a Abraham precede y supera a la ley dada a Moisés, y que en Cristo "
                  "todos los creyentes —judíos y gentiles— son herederos de esa promesa.",
                  styles["body"]),
        Paragraph("<b>La diferencia que importa: revelación versus tradición</b>", styles["sec"]),
        Paragraph("El encuentro entre el mundo mishnaico y el Nuevo Testamento no es simplemente "
                  "una cuestión de contexto histórico o lingüístico. Es un encuentro teológico de "
                  "primera magnitud, y la pregunta central que genera no ha perdido nada de su "
                  "urgencia: ¿cuál es la relación entre la revelación escrita y la tradición "
                  "interpretativa que se desarrolla alrededor de ella?", styles["body"]),
        Paragraph("El judaísmo mishnaico respondió que la Torá oral es inseparable de la Torá "
                  "escrita: que Dios entregó a Moisés en el Sinaí no solo las tablas de la ley "
                  "sino también las instrucciones para su interpretación, y que la cadena de "
                  "transmisión que llega hasta los <i>Tannaim</i> es tan sagrada como el texto "
                  "que interpreta. Esta posición tiene una lógica pastoral poderosa: sin una "
                  "tradición interpretativa autoritativa, cada generación queda a merced de sus "
                  "propias inclinaciones, y el texto sagrado puede ser distorsionado en cualquier "
                  "dirección. El problema, como Jesús señaló en Mateo 15, es que la tradición "
                  "también puede crecer hasta encubrir —o incluso contradecir— el mandamiento "
                  "divino que pretende interpretar.", styles["body"]),
        Paragraph("La tradición reformada —con su principio de <i>sola Scriptura</i>— representa "
                  "una respuesta diferente al mismo problema. No rechaza la interpretación ni la "
                  "tradición; reconoce que el texto necesita ser interpretado, y que la "
                  "interpretación se realiza siempre en comunidad y en continuidad con los que "
                  "interpretaron antes. Pero insiste en que la tradición interpretativa, por más "
                  "venerable que sea, siempre debe estar dispuesta a someterse al juicio de la "
                  "Escritura misma. El canon no es la iglesia ni la academia rabínica: el canon "
                  "es el texto que tanto la iglesia como la academia interpretan. Esta distinción "
                  "no es una arrogancia protestante; es, precisamente, el argumento de Jesús en "
                  "Mateo 15: el mandamiento de Dios tiene una prioridad que ninguna «tradición "
                  "de los ancianos» puede cancelar.", styles["body"]),
        PageBreak(),
    ]

    # ── CAPÍTULO IV ──────────────────────────────────────────────────────────
    story += [
        Paragraph("Capítulo IV — El Legado: Maimónides, la Escolástica y la Perspectiva Reformada",
                  styles["chap"]),
        Paragraph("<b>Maimónides: el racionalismo que sistematizó la Mishná</b>", styles["sec"]),
        Paragraph("Si Yehudá haNasí compiló la Mishná, fue Moshé ben Maimón —el Rambam, conocido "
                  "en el mundo latino como Maimónides— quien la convirtió en un sistema filosófico "
                  "coherente accesible al mundo entero. Nacido en Córdoba en 1138, en el corazón "
                  "de la España islámica, Maimónides creció en un mundo intelectualmente "
                  "extraordinario: el <i>Al-Ándalus</i> del siglo XII era el lugar en que la "
                  "filosofía griega, la ciencia árabe y la teología judía se encontraban en una "
                  "conversación que no tenía equivalente en ningún otro lugar de la tierra "
                  "conocida. Aristóteles era leído junto a Avicena, y ambos junto al Talmud.",
                  styles["body"]),
        Paragraph("La vida de Maimónides fue, sin embargo, mucho más dramática de lo que sugiere "
                  "la imagen serena del filósofo en su estudio. Cuando los almohades —una dinastía "
                  "bereber de extremo rigorismo islámico— conquistaron Córdoba en 1148, el joven "
                  "Maimónides tenía diez años. Los almohades dieron a los judíos y cristianos la "
                  "opción de convertirse al islam, emigrar o morir. La familia de Maimónides "
                  "eligió el exilio, y durante los siguientes años vagó por el norte de África, "
                  "viviendo a veces en una conversión forzada que los historiadores aún debaten, "
                  "hasta que finalmente se estableció en Fustat, el antiguo Cairo, donde "
                  "Maimónides pasaría la mayor parte de su vida adulta ejerciendo como médico "
                  "de la corte del sultán Saladino y como líder (<i>nagid</i>) de la comunidad "
                  "judía de Egipto.", styles["body"]),
        Paragraph("En ese contexto de exilio y responsabilidad comunal, Maimónides acometió la "
                  "tarea más ambiciosa de la historia del pensamiento judío medieval: sistematizar "
                  "toda la ley halájica en un código único, organizado racionalmente, sin los "
                  "debates y las discusiones de la Mishná y el Talmud. El resultado fue el "
                  "<i>Mishné Torá</i> (c. 1180), catorce volúmenes que organizan la totalidad "
                  "de la ley judía en categorías temáticas con una claridad y una precisión que "
                  "sus contemporáneos encontraron, a la vez, admirable y desconcertante. Admirable "
                  "porque, por primera vez en la historia, cualquier judío podía acceder "
                  "directamente a la decisión halájica sin necesidad de navegar los océanos del "
                  "debate talmúdico. Desconcertante porque, al suprimir las discusiones y presentar "
                  "solo las conclusiones, Maimónides parecía clausurar el debate que era, para la "
                  "tradición rabínica, la forma misma del estudio sagrado.", styles["body"]),
        Paragraph("La polémica que el <i>Mishné Torá</i> generó fue enorme. Abraham ben David de "
                  "Posquières, uno de los críticos más incisivos, le reprochó a Maimónides haber "
                  "«actuado arrogantemente» al pretender resolver por decreto lo que siglos de "
                  "debate habían mantenido abierto. Maimónides respondió, en esencia, que la "
                  "complejidad del exilio y la dispersión hacían urgente una guía accesible para "
                  "el judío común. La discusión refleja una tensión perenne en cualquier tradición "
                  "teológica: entre la riqueza del debate abierto y la necesidad de la claridad "
                  "pastoral.", styles["body"]),
        Paragraph("La segunda gran obra de Maimónides, la <i>Guía de los Perplejos</i> "
                  "(<i>Moreh Nevujim</i>), llevó la sistematización un paso más allá: intentó "
                  "reconciliar la revelación judía con la filosofía aristotélica tal como había "
                  "llegado a través de los pensadores árabes. Para Maimónides, la razón y la "
                  "revelación no podían contradecirse, porque ambas tenían el mismo Autor. Los "
                  "antropomorfismos bíblicos debían ser interpretados alegóricamente; los "
                  "mandamientos tenían una racionalidad intrínseca que podía ser articulada "
                  "filosóficamente; la perfección humana se alcanzaba a través del conocimiento "
                  "intelectual de Dios.", styles["body"]),
        Paragraph("La influencia de Maimónides en el pensamiento cristiano medieval fue directa "
                  "y documentada. Tomás de Aquino lo cita como «Rabbi Moyses» en la <i>Suma "
                  "Teológica</i> y le debe, entre otras cosas, su sistematización de los "
                  "argumentos para la existencia de Dios. Alberto Magno, Pedro Abelardo y otros "
                  "escolásticos bebieron de la síntesis maimonidiana entre razón aristotélica y "
                  "revelación bíblica. El «averroísmo latino» —el movimiento filosófico que "
                  "introdujo la filosofía de Aristóteles en las universidades europeas a través "
                  "de la mediación árabe y judía— no puede entenderse sin la figura de Maimónides "
                  "como puente entre los mundos intelectuales del islam, el judaísmo y el "
                  "cristianismo medieval.", styles["body"]),
    ]

    # IL4
    story += illus(ILLUS_4, "Rabbí Akiva recita el Shemá en su martirio (c. 135 d.C.). "
                   "Su figura quedó indisolublemente ligada a la Mishná que su trabajo contribuyó a formar.")

    story += [
        Paragraph("<b>La Halajá como camino: una reflexión teológica final</b>", styles["sec"]),
        Paragraph("La palabra <i>Halajá</i> —«el camino», «el andar»— captura algo esencial sobre "
                  "la visión teológica que la Mishná encarna. No se trata de una colección de "
                  "normas arbitrarias impuestas desde afuera; es la articulación de lo que "
                  "significa <i>caminar</i> con Dios en la totalidad de la existencia. Cada "
                  "mandamiento es una oportunidad de santidad; cada acto cotidiano es "
                  "potencialmente un acto de adoración; cada momento del tiempo puede ser "
                  "santificado por la obediencia consciente a la voluntad divina. Esta visión "
                  "tiene resonancias profundas con la ética reformada, que ha insistido "
                  "—especialmente en la tradición calvinista— en que la ley de Dios, en su "
                  "dimensión moral, sigue siendo una guía para el creyente redimido, no como "
                  "camino de salvación sino como camino de gratitud.", styles["body"]),
        Paragraph("La diferencia fundamental, sin embargo, permanece. Para el judaísmo mishnaico, "
                  "la Halajá es el sistema completo de la respuesta humana a Dios, y su estudio "
                  "y práctica son, en sí mismos, formas de relación con el Divino. Para la "
                  "teología reformada, ese camino ha sido recorrido por Jesús en lugar de los "
                  "creyentes, y los creyentes andan por él no para ganar la aprobación de Dios "
                  "sino porque han sido ya aprobados en Cristo. La ley revela la voluntad de "
                  "Dios; el evangelio revela la gracia de Dios; y solo desde la gracia puede la "
                  "ley cumplir su función legítima como guía de vida sin convertirse en yugo de "
                  "esclavitud.", styles["body"]),
        Paragraph("Esta diferencia no elimina la deuda. El cristiano que lee la Mishná no lee "
                  "un texto ajeno. Lee el mundo de Jesús, el vocabulario de Pablo, el sustrato "
                  "cultural del que brotó el Nuevo Testamento. Lee la respuesta extraordinariamente "
                  "valiente y creativa de un pueblo que, ante la destrucción de su mundo, encontró "
                  "en la palabra estudiada y transmitida una forma de seguir siendo pueblo de "
                  "Dios. Y en esa respuesta —imperfecta, humana, a veces equivocada, pero "
                  "profundamente honesta— hay algo que ilumina, por contraste y por analogía, "
                  "la respuesta definitiva que el Nuevo Testamento proclama: que el Templo que "
                  "no puede ser destruido no está hecho de piedra sino de carne, y que el "
                  "<i>Nasi</i> que sobrevive a la catástrofe del juicio divino no es Yehudá "
                  "el Príncipe sino Jesús, el Hijo de David, a quien «la muerte ya no se "
                  "enseñorea» (Romanos 6:9).", styles["body"]),
        Paragraph("<b>La Mishná y la suficiencia de las Escrituras</b>", styles["sec"]),
        Paragraph("La pregunta con la que abrimos este estudio —¿puede la tradición interpretativa "
                  "humana adquirir autoridad equiparable a la revelación escrita?— puede ahora "
                  "responderse con mayor precisión. La Mishná representa el resultado más "
                  "sofisticado e impresionante de un proyecto que intenta responder a esa pregunta "
                  "afirmativamente: construir un corpus de interpretación que sea, en su totalidad, "
                  "tan sagrado y vinculante como el texto que interpreta. La grandeza del proyecto "
                  "es real, y el lector honesto no puede sino admirar la profundidad intelectual, "
                  "la seriedad espiritual y el amor genuino por Dios y por su pueblo que la Mishná "
                  "despliega en cada página.", styles["body"]),
        Paragraph("Pero la perspectiva reformada insiste en que la grandeza del proyecto no "
                  "resuelve el problema teológico que plantea. Cuando la tradición oral adquiere "
                  "autoridad autónoma frente al texto escrito, el mecanismo de corrección que el "
                  "propio texto provee —el regreso constante a la fuente, la posibilidad de decir "
                  "«está escrito» frente a cualquier acumulación de interpretaciones previas— "
                  "queda bloqueado. El resultado, como Jesús señaló en Mateo 15, puede ser que "
                  "las tradiciones elaboradas para proteger la ley terminen sustituyéndola. La "
                  "suficiencia de las Escrituras no es un slogan polemista; es la garantía "
                  "estructural de que la palabra de Dios siempre puede hablar más alto que la "
                  "voz de cualquier tradición, por venerable que sea.", styles["body"]),
        Paragraph("Esta convicción no produce desdén hacia la Mishná. Produce, al contrario, un "
                  "tipo específico de gratitud. La Mishná nos ayuda a entender lo que Jesús decía "
                  "y a quiénes se lo decía. Nos permite ver con claridad los debates en que Pablo "
                  "tomó partido. Nos muestra el horizonte de expectativas y el vocabulario "
                  "compartido de un mundo que el Nuevo Testamento asume sin explicar. Estudiarla "
                  "no es sustituir la revelación por la tradición; es usar la tradición para leer "
                  "mejor la revelación.", styles["body"]),
        HR(),
    ]

    # ── CONCLUSIÓN ───────────────────────────────────────────────────────────
    story += [
        Paragraph("Conclusión: La Palabra que Camina", styles["chap"]),
        Paragraph("La Mishná es, en su sentido más profundo, un testimonio de lo que el amor por "
                  "la palabra de Dios puede producir en una comunidad que ha perdido todo lo demás. "
                  "Sin Templo, sin sacerdocio, sin tierra propia, sin poder político, el pueblo "
                  "judío de los siglos I al III respondió a la catástrofe con un acto de absoluta "
                  "fidelidad intelectual: se sentó a estudiar, a debatir, a preservar, y en ese "
                  "acto encontró una forma de presencia divina que no dependía de ninguna "
                  "arquitectura de piedra.", styles["body"]),
        Paragraph("Hay algo proféticamente anticipatorio en este gesto. Cuando el autor de la "
                  "carta a los Hebreos escribe que «tenemos un sumo sacerdote que se sentó a la "
                  "diestra del trono de la Majestad en los cielos, ministro del santuario y del "
                  "verdadero tabernáculo que levantó el Señor, y no el hombre» (Hebreos 8:1-2), "
                  "está articulando la convicción de que el verdadero Templo nunca estuvo hecho "
                  "de piedra. La Mishná, paradójicamente, preparó al pueblo judío para vivir sin "
                  "Templo durante dos milenios. El Nuevo Testamento proclama que el Templo "
                  "verdadero ha venido al mundo en la persona de Jesús, y que en él habita "
                  "«corporalmente toda la plenitud de la Deidad» (Colosenses 2:9).",
                  styles["body"]),
        Paragraph("La <i>Halajá</i> —el camino— encuentra en Cristo a aquel que dijo «yo soy "
                  "el camino» (Juan 14:6). No como abolición de la ley, sino como su cumplimiento: "
                  "«No penséis que he venido para abrogar la ley o los profetas; no he venido "
                  "para abrogar, sino para cumplir» (Mateo 5:17). El estudio de la Mishná es, "
                  "para el lector cristiano, un ejercicio de comprensión del camino que Jesús "
                  "recorrió, del vocabulario en que habló, del mundo en que predicó. Y en ese "
                  "recorrido, la distancia entre el <i>Beit Midrash</i> de Yavné y el Sermón "
                  "del Monte no es tan grande como a veces parece: en ambos lugares, hombres y "
                  "mujeres se inclinaban sobre un texto sagrado, preguntándose cómo vivir de "
                  "acuerdo con la voluntad del Dios vivo.", styles["body"]),
        Paragraph("La diferencia —la diferencia que lo cambia todo— es que en el Sermón del "
                  "Monte, el intérprete y el texto son uno.", styles["ital"]),
        HR(),
        Paragraph("<b>Nota editorial final</b>", styles["sec"]),
        Paragraph("Este artículo forma parte de la sección <i>\"Libros Sagrados de Israel\"</i> "
                  "de la Biblioteca Virtual Sabiduría para el Corazón. Ha sido elaborado en "
                  "continuidad con los estudios precedentes sobre La Torá y El Talmud. En "
                  "próximas entregas: El Midrash, la Septuaginta y el Tanaj.",
                  styles["editorial"]),
        Spacer(1, 20),
    ]

    doc.build(story)
    print("  Contenido OK")


def merge_pdf():
    print("Fusionando PDF final...")
    result = fitz.open()
    cov = fitz.open(TMP_COVER); result.insert_pdf(cov); cov.close()
    tmp_meta = "/tmp/mishna_meta_page.pdf"
    c = rl_canvas.Canvas(tmp_meta, pagesize=A4)
    build_metadata(c); c.showPage(); c.save()
    meta = fitz.open(tmp_meta); result.insert_pdf(meta); meta.close()
    con = fitz.open(TMP_CONTENT); result.insert_pdf(con); con.close()
    result.save(OUTPUT)
    result.close()
    pages = fitz.open(OUTPUT).page_count
    size_kb = os.path.getsize(OUTPUT) // 1024
    print(f"  PDF final: {OUTPUT}")
    print(f"  Páginas: {pages}  |  Tamaño: {size_kb} KB")


if __name__ == "__main__":
    build_cover()
    build_content()
    merge_pdf()
    print("✓ La-Mishna.pdf listo")
