#!/usr/bin/env python3
"""
PDF: El Tanaj — El Canon Hebreo: Memoria, Pacto e Identidad de un Pueblo
Paleta: navy profundo + dorado + crema
4 ilustraciones FLUX
"""
import os, fitz
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.platypus import BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, PageBreak, Image
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.pdfgen import canvas as rl_canvas

W, H = A4

BASE        = "/Users/edgardolamas/Desktop/Trabajos de edicion/WEBS/Sabiduria para el corazon"
IMG_DIR     = f"{BASE}/public/img/pdf"
ILLUS_CAP1  = f"{IMG_DIR}/tanaj_illus_1.jpg"
ILLUS_CAP2  = f"{IMG_DIR}/tanaj_illus_2.jpg"
ILLUS_CAP3  = f"{IMG_DIR}/tanaj_illus_3.jpg"
ILLUS_CAP4  = f"{IMG_DIR}/tanaj_illus_4.jpg"
OUTPUT      = f"{BASE}/public/pdf/El-Tanaj.pdf"
TMP_COVER   = "/tmp/tanaj_cover_page.pdf"
TMP_CONTENT = "/tmp/tanaj_content_pages.pdf"

NAVY_DEEP   = (15,  35,  75)
NAVY_MID    = (30,  60, 110)
GOLD        = (197, 160,  89)
GOLD_LIGHT  = (220, 190, 130)
CREAM       = (252, 248, 238)
WHITE       = (255, 255, 255)

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
    pdfmetrics.registerFont(TTFont("Baskerville", "/System/Library/Fonts/Supplemental/Baskerville.ttc", subfontIndex=0))
    pdfmetrics.registerFont(TTFont("Baskerville-Bold", "/System/Library/Fonts/Supplemental/Baskerville.ttc", subfontIndex=1))
    TITLE_FONT = "Baskerville"; TITLE_BOLD = "Baskerville-Bold"
except:
    TITLE_FONT = TITLE_BOLD = BOLD_FONT


def build_cover():
    print("Generando portada...")
    import math
    c = rl_canvas.Canvas(TMP_COVER, pagesize=A4)
    for i in range(int(H)):
        t = i / H
        r = (NAVY_DEEP[0] + t * (NAVY_MID[0] - NAVY_DEEP[0])) / 255
        g = (NAVY_DEEP[1] + t * (NAVY_MID[1] - NAVY_DEEP[1])) / 255
        b = (NAVY_DEEP[2] + t * (NAVY_MID[2] - NAVY_DEEP[2])) / 255
        c.setFillColorRGB(r, g, b)
        c.rect(0, i, W, 1, fill=1, stroke=0)
    cx, cy = W/2, H/2 + 20
    size = 70
    c.setStrokeColorRGB(*[x/255 for x in GOLD], alpha=0.25)
    c.setLineWidth(0.6)
    for angle_offset in [0, 60]:
        pts = []
        for k in range(3):
            angle = math.radians(angle_offset + k * 120 - 90)
            pts.append((cx + size * math.cos(angle), cy + size * math.sin(angle)))
        c.setFillColorRGB(*[x/255 for x in GOLD], alpha=0.08)
        p = c.beginPath()
        p.moveTo(*pts[0]); p.lineTo(*pts[1]); p.lineTo(*pts[2]); p.close()
        c.drawPath(p, fill=1, stroke=1)
    c.setStrokeColorRGB(*[x/255 for x in GOLD], alpha=0.6)
    c.setLineWidth(1.5)
    c.line(50, H - 60, W - 50, H - 60)
    c.setFillColorRGB(*[x/255 for x in GOLD], alpha=0.85)
    c.setFont(BOLD_FONT, 7)
    c.drawCentredString(W/2, H - 48, "S A B I D U R Í A   P A R A   E L   C O R A Z Ó N")
    c.setFont(BODY_FONT, 7)
    c.drawCentredString(W/2, H - 60, "L I B R O S   S A G R A D O S   D E   I S R A E L")
    c.setFillColorRGB(*[x/255 for x in GOLD_LIGHT], alpha=0.7)
    c.setFont(BODY_FONT, 8)
    c.drawCentredString(W/2, H - 78, "T O R Á   ·   N E V I ' I M   ·   K E T U V I M")
    c.setStrokeColorRGB(*[x/255 for x in GOLD], alpha=0.5)
    c.setLineWidth(0.8)
    c.line(60, H - 88, W - 60, H - 88)
    c.setFillColorRGB(*[x/255 for x in WHITE], alpha=0.97)
    c.setFont(TITLE_BOLD, 58)
    c.drawCentredString(W/2, H - 148, "El Tanaj")
    c.setStrokeColorRGB(*[x/255 for x in GOLD], alpha=0.8)
    c.setLineWidth(1.2)
    c.line(W/2 - 90, H - 162, W/2 + 90, H - 162)
    c.setFillColorRGB(*[x/255 for x in GOLD_LIGHT], alpha=0.95)
    c.setFont(TITLE_FONT, 15)
    c.drawCentredString(W/2, H - 183, "El Canon Hebreo: Memoria, Pacto e Identidad")
    c.setFillColorRGB(*[x/255 for x in WHITE], alpha=0.65)
    c.setFont(BODY_FONT, 9)
    c.drawCentredString(W/2, H - 202, "Una aproximación histórico-teológica al canon hebreo")
    c.setStrokeColorRGB(*[x/255 for x in GOLD], alpha=0.4)
    c.setLineWidth(0.6)
    c.line(80, 110, W - 80, 110)
    c.setFillColorRGB(*[x/255 for x in GOLD_LIGHT], alpha=0.9)
    c.setFont(BOLD_FONT, 10)
    c.drawCentredString(W/2, 90, "Edgardo Lamas")
    c.setFillColorRGB(*[x/255 for x in WHITE], alpha=0.5)
    c.setFont(BODY_FONT, 8)
    c.drawCentredString(W/2, 76, "2025")
    c.showPage(); c.save()
    print("  Portada OK")


def build_metadata(c):
    c.setFillColorRGB(*[x/255 for x in NAVY_DEEP])
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setStrokeColorRGB(*[x/255 for x in GOLD], alpha=0.7)
    c.setLineWidth(1.5)
    c.rect(28, 28, W-56, H-56, fill=0, stroke=1)
    c.setLineWidth(0.4)
    c.setStrokeColorRGB(*[x/255 for x in GOLD], alpha=0.3)
    c.rect(34, 34, W-68, H-68, fill=0, stroke=1)
    c.setFillColorRGB(*[x/255 for x in GOLD])
    c.setFont(TITLE_BOLD, 28)
    c.drawCentredString(W/2, H - 90, "El Tanaj")
    c.setFont(TITLE_FONT, 13)
    c.drawCentredString(W/2, H - 112, "El Canon Hebreo: Memoria, Pacto e Identidad de un Pueblo")
    c.setStrokeColorRGB(*[x/255 for x in GOLD], alpha=0.5)
    c.setLineWidth(0.8)
    c.line(80, H - 126, W - 80, H - 126)
    info = [
        ("Serie",        "Libros Sagrados del Pueblo de Israel"),
        ("Número",       "III de la serie"),
        ("Autor",        "Edgardo Lamas"),
        ("Colaboración", "Claude (Anthropic) — IA Especializada"),
        ("Fecha",        "2025"),
        ("Fuentes",      "Ryrie, Berkhof, Scholem, The Jewish Study Bible"),
        ("Publicación",  "Biblioteca Virtual Sabiduría para el Corazón"),
    ]
    y = H - 168
    for label, value in info:
        c.setFillColorRGB(*[x/255 for x in GOLD], alpha=0.7)
        c.setFont(BOLD_FONT, 8); c.drawString(70, y, label.upper())
        c.setFillColorRGB(1, 1, 1, alpha=0.85)
        c.setFont(BODY_FONT, 9); c.drawString(185, y, value)
        y -= 22
    c.setStrokeColorRGB(*[x/255 for x in GOLD], alpha=0.3)
    c.setLineWidth(0.5); c.line(70, y - 10, W - 70, y - 10)
    c.setFillColorRGB(*[x/255 for x in GOLD], alpha=0.85)
    c.setFont(ITAL_FONT, 10)
    c.drawCentredString(W/2, H//2 - 20, "«Tu palabra es una lámpara a mis pies")
    c.drawCentredString(W/2, H//2 - 34, "y una lumbrera a mi camino.»")
    c.setFont(BODY_FONT, 8)
    c.setFillColorRGB(*[x/255 for x in GOLD_LIGHT], alpha=0.5)
    c.drawCentredString(W/2, H//2 - 50, "— Salmo 119:105")
    c.setFillColorRGB(*[x/255 for x in GOLD], alpha=0.4)
    c.setFont(BODY_FONT, 7)
    c.drawCentredString(W/2, 45, "sabiduriadelcorazon.com")


def make_page_bg(canvas_obj, doc):
    canvas_obj.saveState()
    canvas_obj.setFillColorRGB(*[x/255 for x in CREAM])
    canvas_obj.rect(0, 0, W, H, fill=1, stroke=0)
    canvas_obj.setFillColorRGB(*[x/255 for x in GOLD], alpha=0.45)
    canvas_obj.rect(28, 50, 2.5, H - 100, fill=1, stroke=0)
    canvas_obj.restoreState()


def make_page_decorations(canvas_obj, doc):
    canvas_obj.saveState()
    canvas_obj.setFillColorRGB(*[x/255 for x in NAVY_DEEP])
    canvas_obj.rect(0, H - 38, W, 38, fill=1, stroke=0)
    canvas_obj.setFillColorRGB(*[x/255 for x in GOLD_LIGHT])
    canvas_obj.setFont(BODY_FONT, 7)
    canvas_obj.drawString(42, H - 16, "EL TANAJ — EL CANON HEBREO")
    canvas_obj.drawRightString(W - 42, H - 16, "SABIDURÍA PARA EL CORAZÓN")
    canvas_obj.setStrokeColorRGB(*[x/255 for x in GOLD], alpha=0.5)
    canvas_obj.setLineWidth(0.5)
    canvas_obj.line(42, H - 24, W - 42, H - 24)
    canvas_obj.setFillColorRGB(*[x/255 for x in NAVY_DEEP])
    canvas_obj.rect(0, 0, W, 36, fill=1, stroke=0)
    canvas_obj.setStrokeColorRGB(*[x/255 for x in GOLD], alpha=0.4)
    canvas_obj.line(42, 36, W - 42, 36)
    canvas_obj.setFillColorRGB(*[x/255 for x in GOLD_LIGHT])
    canvas_obj.setFont(BODY_FONT, 7)
    canvas_obj.drawCentredString(W/2, 14, f"Libros Sagrados de Israel  ·  {doc.page}")
    canvas_obj.restoreState()


def get_styles():
    navy     = colors.Color(*[x/255 for x in NAVY_DEEP])
    navy_mid = colors.Color(*[x/255 for x in NAVY_MID])
    black    = colors.Color(0, 0, 0)
    return {
        "intro":    ParagraphStyle("intro", fontName=ITAL_FONT, fontSize=11,
                        textColor=navy_mid, leading=18, alignment=TA_CENTER,
                        spaceAfter=20, leftIndent=30, rightIndent=30),
        "chapter":  ParagraphStyle("chapter", fontName=TITLE_BOLD, fontSize=18,
                        textColor=navy, leading=24, spaceBefore=24, spaceAfter=6),
        "section":  ParagraphStyle("section", fontName=BOLD_FONT, fontSize=12,
                        textColor=navy, leading=16, spaceBefore=18, spaceAfter=6),
        "subsection": ParagraphStyle("subsection", fontName=BOLD_FONT, fontSize=10,
                        textColor=black, leading=14, spaceBefore=12, spaceAfter=4),
        "body":     ParagraphStyle("body", fontName=BODY_FONT, fontSize=11,
                        textColor=black, leading=19, alignment=TA_JUSTIFY, spaceAfter=11),
        "quote":    ParagraphStyle("quote", fontName=ITAL_FONT, fontSize=10.5,
                        textColor=navy_mid, leading=18, alignment=TA_JUSTIFY,
                        leftIndent=24, rightIndent=24, spaceAfter=10, spaceBefore=10),
        "num_section": ParagraphStyle("num_section", fontName=TITLE_BOLD, fontSize=13,
                        textColor=navy, leading=18, spaceBefore=22, spaceAfter=6),
        "footer_note": ParagraphStyle("footer_note", fontName=ITAL_FONT, fontSize=8,
                        textColor=navy_mid, leading=12, alignment=TA_CENTER, spaceBefore=20),
        "biblio":   ParagraphStyle("biblio", fontName=BODY_FONT, fontSize=8.5,
                        textColor=black, leading=14, spaceAfter=4),
    }


def illus(path, frame_width):
    h = frame_width * (400 / 1200)
    img = Image(path, width=frame_width, height=h)
    img.hAlign = 'CENTER'
    return img


def build_content():
    print("Generando páginas de contenido...")
    st = get_styles()
    story = []
    FW = W - 48 - 42

    def P(text, style="body"): return Paragraph(text, st[style])
    def SP(h=8): return Spacer(1, h)
    def SEC(num, title): return Paragraph(f"{num}   {title}", st["num_section"])

    story.append(P("LIBROS SAGRADOS DE ISRAEL — SABIDURÍA PARA EL CORAZÓN", "section"))
    story.append(P("El Tanaj: Voz Antigua, Memoria Viva", "chapter"))
    story.append(P("<i>Una aproximación histórico-teológica a la formación, estructura y significado universal del canon hebreo.</i>", "intro"))
    story.append(SP(10))

    story.append(P("Hay textos que no solo narran la historia de un pueblo sino que la sostienen. El Tanaj es uno de esos textos. Más que una colección de libros antiguos, es el documento fundacional de la existencia judía, el testimonio escrito de un pueblo que comprendió que su historia era inseparable de su relación con Dios."))
    story.append(P("A diferencia de la Torá —cuya centralidad ya fue examinada en estas páginas— el Tanaj como corpus plantea preguntas distintas y de igual profundidad. ¿Cómo llegó a conformarse un canon que abarca desde la narrativa de la creación hasta la poesía más íntima del alma humana? ¿Qué proceso histórico, comunitario y teológico determinó que ciertos libros pertenecían a ese conjunto sagrado y otros no?"))
    story.append(P("El presente artículo explora el territorio más amplio del canon hebreo: la arquitectura tripartita del Tanaj, su proceso de canonización, su vida litúrgica a través de la Haftará y las Meguilot, los métodos exegéticos que generaciones de sabios desarrollaron para interrogarlo, y su impacto en la cultura universal y en el Estado moderno de Israel."))
    story.append(SP(8))

    story.append(illus(ILLUS_CAP1, FW))
    story.append(SP(14))

    story.append(SEC("1", "El Nombre y la Estructura: Un Acrónimo que Contiene un Mundo"))
    story.append(P("El término Tanaj es un acrónimo formado por las primeras letras de las tres grandes secciones de la Biblia hebrea: <i>Torá</i> (Instrucción), <i>Nevi'im</i> (Profetas) y <i>Ketuvim</i> (Escritos). El nombre del canon no es el de un libro, ni el de un autor, ni el de un evento fundacional: es la suma de tres categorías de texto, tres voces que el pueblo de Israel reconoció como portadoras de la misma autoridad divina."))
    story.append(P("Si la Torá es la voz de Dios hacia el hombre, y los Nevi'im son el eco de esa voz en la historia, los Ketuvim son la voz del hombre que responde —a veces con certeza, a veces con perplejidad— desde la profundidad de una relación que lo define."))
    story.append(P("No es casual que Jesús nombre las Escrituras con esa misma estructura tripartita: «Era necesario que se cumpliese todo lo que está escrito acerca de mí en la Ley de Moisés, en los Profetas y en los Salmos» (Lucas 24:44). La arquitectura del Tanaj no es ajena a la hermenéutica cristiana: la precede y la fundamenta."))

    story.append(SEC("2", "Los Nevi'im: Cuando la Historia se Convierte en Profecía"))
    story.append(P("Los Nevi'im se dividen en Profetas Anteriores (<i>Nevi'im Rishonim</i>) —Josué, Jueces, Samuel y Reyes— y Profetas Posteriores (<i>Nevi'im Ajaronim</i>) —Isaías, Jeremías, Ezequiel y el Libro de los Doce. El Tanaj los llama Profetas porque la historia de Israel no es una crónica política: es una interpretación teológica del devenir de un pueblo a la luz de su fidelidad o infidelidad al pacto sinaítico."))
    story.append(P("La profecía hebrea no es primariamente predicción del futuro. Es la palabra de Dios que lee el presente a la luz del pasado y llama al pueblo a la fidelidad. Para la fe cristiana, los Nevi'im son inseparables de la comprensión de Jesucristo: sin Isaías 53 no hay comprensión de la cruz; sin Daniel 7 no hay comprensión del título «Hijo del Hombre»; sin la teología davídica no hay comprensión de la realeza mesiánica."))

    story.append(SEC("3", "Los Ketuvim: La Totalidad de la Experiencia Humana ante Dios"))
    story.append(P("Los Ketuvim comprenden los Salmos, los Proverbios, Job, las cinco Meguilot (Cantar de los Cantares, Rut, Lamentaciones, Eclesiastés y Ester), Daniel, Esdras, Nehemías y las Crónicas. Esta diversidad afirma que Dios no se relaciona con el ser humano únicamente a través de la ley y la profecía, sino también a través del canto, la pregunta, el duelo, la duda y el amor."))
    story.append(P("La posición de las Crónicas como libro final del canon hebreo es elocuente: el Tanaj concluye no con la desolación del exilio sino con la promesa del regreso —el edicto de Ciro que autoriza a los exiliados a regresar a Jerusalén."))

    story.append(SEC("4", "La Canonización: Un Proceso Comunitario, Existencial y Litúrgico"))
    story.append(P("El canon del Tanaj no fue el resultado de una decisión conciliar tomada en un momento preciso. Fue el resultado de un proceso largo, orgánico y comunitario que se extendió a lo largo de siglos. El Concilio de Jamnia (Yavné, ca. 90 d.C.) no creó el canon: lo ratificó. Los manuscritos de Qumrán muestran que la comunidad judía ya reconocía como autoritativos casi todos los libros del Tanaj un siglo antes del Concilio."))
    story.append(P("Esta distinción tiene implicaciones teológicas fundamentales: la canonicidad no fue creada por el concilio sino descubierta por él. Dios preservó su Palabra a través de la vida de su pueblo, y el pueblo, al reconocerla, articuló lo que el Espíritu había obrado en su seno a lo largo de los siglos."))
    story.append(P("Las iglesias de la Reforma, siguiendo el principio de <i>sola Scriptura</i> y adoptando el canon hebreo de 39 libros, tomaron una posición explícita: los libros autoritativos del Antiguo Testamento son los mismos que Dios confió al pueblo de Israel, «a quienes han sido confiados los oráculos de Dios» (Romanos 3:2)."))

    story.append(SEC("5", "La Vida Litúrgica: La Haftará y las Cinco Meguilot"))
    story.append(P("La práctica de la Haftará consiste en la lectura pública de un pasaje de los Nevi'im inmediatamente después de la <i>Parashá</i> semanal. Las Cinco Meguilot establecen una correspondencia entre texto sagrado y tiempo sagrado: el Cantar de los Cantares en Pésaj; Rut en Shavuot; las Lamentaciones en Tishá b'Av; el Eclesiastés en Sucot; y Ester en Purim."))
    story.append(P("El libro de Ester es notable porque es el único texto del Tanaj en que el nombre de Dios no aparece explícitamente, aunque su presencia se percibe en cada giro providencial. Para la teología reformada, esto es en sí misma una enseñanza: Dios actúa en la historia también a través de la acción ordinaria de hombres y mujeres que actúan con valentía y fidelidad."))
    story.append(P("«Cuando la comunidad escucha a Isaías después de leer el relato de la vocación de Moisés, lo que experimenta es la continuidad interior del testimonio bíblico: los profetas son los intérpretes autorizados de la Ley.»", "quote"))

    story.append(PageBreak())

    story.append(illus(ILLUS_CAP2, FW))
    story.append(SP(14))

    story.append(SEC("6", "Los Grandes Intérpretes y el Método PaRDeS"))
    story.append(P("El acrónimo PaRDeS designa cuatro niveles complementarios de lectura: <i>Pshat</i> (sentido literal), <i>Remez</i> (alusión tipológica), <i>Drash</i> (sentido homilético) y <i>Sod</i> (sentido místico). Sus grandes maestros fueron Rashi (1040-1105), Abraham ibn Ezra (1089-1167), Maimónides (1135-1204) y Nahmánides (1194-1270)."))
    story.append(P("Para el lector reformado, la insistencia en el <i>Pshat</i> como fundamento de toda interpretación válida encuentra un eco genuino en la hermenéutica de Calvino y Lutero: el significado histórico-gramatical del texto debe gobernar toda lectura posterior. Ningún nivel más profundo puede contradecir lo que el <i>Pshat</i> establece."))

    story.append(SEC("7", "La Academia Israelí y el Estudio Crítico del Tanaj"))
    story.append(SP(6))
    story.append(illus(ILLUS_CAP3, FW))
    story.append(SP(14))
    story.append(P("Los hallazgos de Qumrán (1947) revelaron una estabilidad textual de más de mil años entre los manuscritos del siglo II a.C. y los manuscritos masoréticos medievales, confirmando con evidencia empírica lo que la tradición religiosa siempre había afirmado: el texto del Tanaj fue preservado con fidelidad extraordinaria."))
    story.append(P("Esta fidelidad textual no fue accidental. Fue el resultado de siglos de trabajo meticuloso por parte de los masoretas, los sabios judíos de los siglos VI al X que desarrollaron un sistema extraordinariamente preciso de vocales, acentos y notas marginales para garantizar la transmisión exacta del texto hebreo. Los masoretas contaban no solo palabras sino letras, identificaban la letra central de cada libro, y registraban cualquier peculiaridad textual con un cuidado que no tiene paralelo en la historia de la transmisión de textos antiguos. Su trabajo es, entre otras cosas, un testimonio de la convicción de que cada letra del texto sagrado importa."))
    story.append(P("La Academia de la Lengua Hebrea ha estudiado la continuidad del hebreo bíblico —el hecho de que el mismo idioma en que fueron escritos los Salmos e Isaías sea hoy la lengua cotidiana de millones de personas es uno de los fenómenos más extraordinarios de la historia cultural de la humanidad."))

    story.append(SEC("8", "El Tanaj en la Cultura Universal"))
    story.append(P("Los Salmos han servido durante tres mil años como el cancionero de la humanidad creyente. Calvino los llamó «una anatomía del alma» y el canto salmódico fue durante siglos la característica más distintiva del culto reformado. Su importancia para la cultura universal es difícil de exagerar: de los Salmos tomó Dante imágenes para la <i>Commedia</i>, Shakespeare frases para sus tragedias, Handel melodías para el <i>Mesías</i>, y Beethoven —según el testimonio de sus contemporáneos— sentido para sus últimas sonatas."))
    story.append(P("El libro de Job y las Lamentaciones representan otro legado singular del Tanaj: la legitimidad del lamento, la honestidad de la duda, el derecho de la criatura a interpelar a su Creador desde el dolor. Ninguna tradición religiosa antigua preservó con mayor franqueza el grito del ser humano que sufre y no entiende. El Salmo 88 concluye sin resolución, en la oscuridad, sin el «pero confío en ti» que clausura casi todos los demás salmos de lamento. El Tanaj no falsifica la experiencia humana: la lleva ante Dios exactamente como es."))
    story.append(P("La ética profética del Tanaj —su insistencia en que la relación auténtica con Dios se manifiesta en el trato justo al pobre, al huérfano, a la viuda y al extranjero— ha sido uno de los legados más fecundos de las Escrituras hebreas. Cuando Martin Luther King Jr. pronunció su discurso más célebre, eligió las palabras de Amós: «sino que corra el juicio como las aguas, y la justicia como impetuoso arroyo» (Amós 5:24)."))

    story.append(SEC("9", "El Tanaj, el Sionismo y el Estado Moderno de Israel"))
    story.append(P("El movimiento sionista, fundado en gran medida por judíos laicos, encontró en el Tanaj la narrativa que daba sentido a su empresa. El hebreo mismo fue resucitado como lengua vernácula por Eliezer Ben Yehuda a fines del siglo XIX y adoptado como idioma oficial del Estado de Israel —fenómeno sin precedente en la historia de las civilizaciones."))
    story.append(P("En el Israel contemporáneo, el Tanaj es simultáneamente la Escritura sagrada para los judíos observantes y el documento fundacional de la identidad nacional para los israelíes laicos. Un texto que genera controversia es un texto que sigue siendo relevante: el Tanaj sigue siendo ambas cosas."))

    story.append(SEC("10", "El Tanaj y el Nuevo Testamento: Una Sola Historia, Dos Actos"))
    story.append(SP(6))
    story.append(illus(ILLUS_CAP4, FW))
    story.append(SP(14))
    story.append(P("Para el lector cristiano reformado, el Tanaj y el Nuevo Testamento forman una sola historia de salvación que avanza desde la promesa hacia el cumplimiento. Agustín de Hipona lo formuló con precisión insuperable: «El Nuevo Testamento está latente en el Antiguo; el Antiguo está patente en el Nuevo.»"))
    story.append(P("La diferencia más notable entre el canon hebreo y el Antiguo Testamento protestante no reside en los libros incluidos —que son exactamente los mismos— sino en su organización. El Tanaj concluye con las Crónicas y su nota de esperanza; el Antiguo Testamento cristiano concluye con Malaquías y su promesa mesiánica explícita, creando la expectativa que el Nuevo Testamento declara cumplida en Jesucristo."))
    story.append(P("Leer el Salmo 22 conociendo que Jesús lo pronunció desde la cruz no empobrece la lectura del Salmo 22 sino que la profundiza. El que escribió «Dios mío, Dios mío, ¿por qué me has abandonado?» estaba describiendo su angustia personal; el que lo pronunció en el Gólgota estaba asumiendo esa angustia en su versión más radical y más universal. Así funciona la tipología bíblica: los textos del Tanaj no son simplemente predicciones que el Nuevo Testamento verifica, sino prefiguraciones que el Nuevo Testamento cumple y, al cumplirlas, revela en toda su profundidad."))

    story.append(SEC("11", "Conclusión: El Tanaj como Faro y como Espejo"))
    story.append(P("El Salmo 119 declara: «Tu palabra es una lámpara a mis pies y una lumbrera a mi camino» (v. 105). Una lámpara no ilumina todo el horizonte de una sola vez: ilumina el paso siguiente, lo suficiente para que el caminante no tropiece."))
    story.append(P("Para el pueblo judío, el Tanaj ha sido exactamente eso durante más de dos milenios: la lámpara que iluminó el camino a través del exilio en Babilonia, la persecución en Roma, la expulsión de España, los pogromos de Europa del Este, el horror del Holocausto y la ardua construcción de un Estado. Para el lector cristiano, el Tanaj es además un espejo en el que la fe puede reconocerse con mayor profundidad. Leer a Isaías conociendo a Cristo no empobrece la lectura de Isaías sino que la enriquece."))
    story.append(P("Hay dos movimientos que se necesitan mutuamente. El primero es leer el Tanaj en su propio peso, sin apresurarse a pasar el texto hebreo por el filtro del Nuevo Testamento antes de haberlo escuchado en sus propios términos: la promesa hecha a Abraham, el tabernáculo en el desierto, la voz de los profetas que clamaban en la oscuridad de la apostasía nacional. El segundo es leer el Tanaj desde el cumplimiento, descubriendo en cada figura, en cada tipo, en cada promesa la sombra del que vendría. Estos dos movimientos no se contradicen: se complementan, porque la Escritura es una y su autor es uno, y lo que Dios comenzó a decir en Génesis 1 todavía no ha terminado de decirse."))
    story.append(P("La iglesia cristiana cometió históricamente el error de abandonar el Antiguo Testamento o de leerlo solo como prólogo, perdiéndose así las tres cuartas partes del consejo de Dios. La tradición reformada, con su insistencia en la unidad de los dos Testamentos y en el único pacto de gracia que los articula, ofreció una corrección necesaria. Volver al Tanaj no es volver hacia atrás: es profundizar la comprensión del único evangelio que siempre existió, el evangelio del Cordero que fue inmolado desde antes de la fundación del mundo."))
    story.append(P("«El Tanaj no es el prólogo de una historia más importante: es la primera mitad de la única historia que importa. Y esa historia no ha llegado todavía a su última página.»", "quote"))
    story.append(P("El mismo Dios que llamó a Abraham, que habló a Moisés, que inspiró a David, que envió a Isaías y que cumplió en Jesucristo todas sus promesas, continúa actuando en la historia hacia la consumación que los profetas del Tanaj describieron: un cielo nuevo y una tierra nueva, el tabernáculo de Dios con los hombres, las naciones sanadas por las hojas del árbol de vida."))

    story.append(SP(16))
    story.append(P("Biblioteca Virtual «Sabiduría para el Corazón»  ·  Serie: Los Libros Sagrados de Israel  ·  2025", "footer_note"))

    story.append(PageBreak())
    story.append(P("Fuentes Consultadas", "section"))
    story.append(SP(8))
    fuentes = [
        "Douglas, J.D. y Tenney, M.C. <i>Diccionario Bíblico Mundo Hispano.</i> Editorial Mundo Hispano.",
        "Pfeiffer, Charles F. <i>Diccionario Bíblico Arqueológico.</i> Editorial Caribe.",
        "Ryrie, Charles C. <i>Teología Básica.</i> Editorial Unilit.",
        "Berkhof, Luis. <i>Introducción a la Teología Sistemática.</i> The Banner of Truth Trust.",
        "Scholem, Gershom. <i>Major Trends in Jewish Mysticism.</i> Schocken Books.",
        "<i>The Jewish Study Bible.</i> Oxford University Press.",
        "<i>Encyclopaedia Judaica.</i> Keter Publishing.",
        "Lamas, Edgardo. <i>La Torá: Historia, Transmisión y Significado Universal.</i> Biblioteca Virtual Sabiduría para el Corazón, 2025.",
    ]
    for f in fuentes:
        story.append(Paragraph(f, st["biblio"]))

    doc = BaseDocTemplate(TMP_CONTENT, pagesize=A4,
        leftMargin=48, rightMargin=42, topMargin=52, bottomMargin=52)
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='normal')
    doc.addPageTemplates([
        PageTemplate(id='content', frames=frame,
            onPage=make_page_bg, onPageEnd=make_page_decorations)
    ])
    doc.build(story)
    print("  Contenido OK")


def merge_pdf():
    print("Combinando páginas...")
    meta_path = "/tmp/tanaj_meta_page.pdf"
    c = rl_canvas.Canvas(meta_path, pagesize=A4)
    build_metadata(c); c.showPage(); c.save()
    final = fitz.open()
    for path in [TMP_COVER, meta_path, TMP_CONTENT]:
        src = fitz.open(path); final.insert_pdf(src); src.close()
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    final.save(OUTPUT); final.close()
    print(f"Guardado: {OUTPUT}  ({fitz.open(OUTPUT).page_count} páginas)")


if __name__ == "__main__":
    build_cover()
    build_content()
    merge_pdf()
    print("✓ El-Tanaj.pdf listo")
