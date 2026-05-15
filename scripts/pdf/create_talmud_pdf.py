#!/usr/bin/env python3
"""
PDF: El Talmud — La Torah en el Exilio
Artículo completo con ilustraciones FLUX por capítulo.
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
COVER_IMG     = f"{IMG_DIR}/talmud_cover.jpg"
TEXTURE_IMG   = f"{IMG_DIR}/talmud_texture.jpg"
TEXTURE_READY = "/tmp/talmud_tex_ready.jpg"   # sí puede ser /tmp — se regenera en cada run
ILLUS_CAP1    = f"{IMG_DIR}/talmud_illus_1.jpg"
ILLUS_CAP2    = f"{IMG_DIR}/talmud_illus_2.jpg"
ILLUS_CAP3    = f"{IMG_DIR}/talmud_illus_3.jpg"
ILLUS_CAP4    = f"{IMG_DIR}/talmud_illus_4.jpg"
OUTPUT        = f"{BASE}/public/pdf/El-Talmud.pdf"
TMP_COVER     = "/tmp/talmud_cover_page.pdf"
TMP_CONTENT   = "/tmp/talmud_content_pages.pdf"

BROWN_DEEP  = (44, 18, 6)
BROWN_MID   = (74, 40, 16)
AMBER_GOLD  = (197, 144, 42)
AMBER_LIGHT = (220, 170, 80)
PARCHMENT   = (242, 220, 190)
CREAM       = (252, 245, 232)
BURGUNDY    = (123, 29, 14)

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
    tex = PILImage.open(TEXTURE_IMG).convert("RGB")
    tex = tex.resize((595, 842), PILImage.LANCZOS)
    tex = ImageEnhance.Brightness(tex).enhance(0.78)
    tex = ImageEnhance.Color(tex).enhance(0.80)
    tex.save(TEXTURE_READY, quality=92)


def build_cover():
    print("Generando portada...")
    img = PILImage.open(COVER_IMG).convert("RGB").resize((595, 842), PILImage.LANCZOS)
    bg = "/tmp/talmud_cover_bg.jpg"; img.save(bg, quality=95)
    c = rl_canvas.Canvas(TMP_COVER, pagesize=A4)
    c.drawImage(bg, 0, 0, width=W, height=H)
    for i in range(180):
        c.setFillColorRGB(0.08, 0.04, 0.01, alpha=0.75*(1-i/180)**0.7)
        c.rect(0, H-i-1, W, 1, fill=1, stroke=0)
    for i in range(220):
        c.setFillColorRGB(0.05, 0.02, 0.00, alpha=0.85*(1-i/220)**0.6)
        c.rect(0, i, W, 1, fill=1, stroke=0)
    c.setFillColorRGB(*[x/255 for x in AMBER_GOLD], alpha=0.9)
    c.rect(0, H-38, W, 38, fill=1, stroke=0)
    c.setFillColorRGB(*[x/255 for x in BROWN_DEEP])
    c.setFont(BODY_FONT, 8); c.drawCentredString(W/2, H-24, "S A B I D U R Í A   P A R A   E L   C O R A Z Ó N")
    c.setFont(BODY_FONT, 7); c.drawCentredString(W/2, H-33, "L I B R O S   S A G R A D O S   D E   I S R A E L")
    c.setFillColorRGB(*[x/255 for x in AMBER_LIGHT], alpha=0.85)
    c.setFont(BODY_FONT, 8); c.drawCentredString(W/2, H-64, "T O R A H   ·   T A L M U D   ·   M I D R A S H")
    c.setStrokeColorRGB(*[x/255 for x in AMBER_GOLD], alpha=0.7); c.setLineWidth(0.8)
    c.line(60, H-74, W-60, H-74)
    c.setFillColorRGB(1, 1, 1, alpha=0.97); c.setFont(TITLE_BOLD, 62)
    c.drawCentredString(W/2, H-130, "El Talmud")
    c.setStrokeColorRGB(*[x/255 for x in AMBER_GOLD], alpha=0.8); c.setLineWidth(1.2)
    c.line(W/2-100, H-144, W/2+100, H-144)
    c.setFillColorRGB(*[x/255 for x in AMBER_LIGHT], alpha=0.95); c.setFont(TITLE_FONT, 18)
    c.drawCentredString(W/2, H-168, "La Torah en el Exilio")
    c.setFillColorRGB(1,1,1,alpha=0.75); c.setFont(BODY_FONT, 9)
    c.drawCentredString(W/2, H-192, "Historia, Autoridad y Significado Teológico de la Ley Oral")
    c.setStrokeColorRGB(*[x/255 for x in AMBER_GOLD], alpha=0.5); c.setLineWidth(0.6)
    c.line(80, 110, W-80, 110)
    c.setFillColorRGB(*[x/255 for x in AMBER_LIGHT], alpha=0.9); c.setFont(BOLD_FONT, 10)
    c.drawCentredString(W/2, 90, "Edgardo Lamas")
    c.setFillColorRGB(1,1,1,alpha=0.5); c.setFont(BODY_FONT, 8)
    c.drawCentredString(W/2, 76, "Julio 2025")
    c.showPage(); c.save()
    print("  Portada OK")


def build_metadata(c):
    c.setFillColorRGB(*[x/255 for x in BROWN_DEEP]); c.rect(0,0,W,H,fill=1,stroke=0)
    try:
        tex = PILImage.open(TEXTURE_IMG).convert("RGBA"); arr = np.array(tex, dtype=np.float32)
        arr[:,:,3] = 35; tex = PILImage.fromarray(np.clip(arr,0,255).astype(np.uint8))
        tex = tex.resize((595,842), PILImage.LANCZOS); tp="/tmp/talmud_tex_dark.png"; tex.save(tp)
        c.drawImage(tp,0,0,width=W,height=H,mask='auto')
    except: pass
    c.setStrokeColorRGB(*[x/255 for x in AMBER_GOLD],alpha=0.7); c.setLineWidth(1.5)
    c.rect(28,28,W-56,H-56,fill=0,stroke=1)
    c.setLineWidth(0.5); c.setStrokeColorRGB(*[x/255 for x in AMBER_GOLD],alpha=0.3)
    c.rect(34,34,W-68,H-68,fill=0,stroke=1)
    c.setFillColorRGB(*[x/255 for x in AMBER_GOLD]); c.setFont(TITLE_BOLD,28)
    c.drawCentredString(W/2, H-90, "El Talmud")
    c.setFont(TITLE_FONT,13); c.drawCentredString(W/2, H-112, "La Torah en el Exilio")
    c.setStrokeColorRGB(*[x/255 for x in AMBER_GOLD],alpha=0.5); c.setLineWidth(0.8)
    c.line(80,H-126,W-80,H-126)
    info = [
        ("Serie",        "Libros Sagrados del Pueblo de Israel"),
        ("Número",       "IV de la serie"),
        ("Autor",        "Edgardo Lamas"),
        ("Colaboración", "Claude (Anthropic) — IA Especializada"),
        ("Fecha",        "Julio 2025"),
        ("Fuentes",      "Neusner, Schürer, Halivni, Halevy, Encyclopaedia Judaica"),
        ("Publicación",  "Biblioteca Virtual Sabiduría para el Corazón"),
    ]
    y = H-168
    for label, value in info:
        c.setFillColorRGB(*[x/255 for x in AMBER_GOLD],alpha=0.7); c.setFont(BOLD_FONT,8); c.drawString(70,y,label.upper())
        c.setFillColorRGB(1,1,1,alpha=0.85); c.setFont(BODY_FONT,9); c.drawString(185,y,value)
        y -= 22
    c.setStrokeColorRGB(*[x/255 for x in AMBER_GOLD],alpha=0.3); c.setLineWidth(0.5); c.line(70,y-10,W-70,y-10)
    c.setFillColorRGB(*[x/255 for x in AMBER_LIGHT],alpha=0.6); c.setFont(ITAL_FONT,8)
    c.drawCentredString(W/2,y-28,"Este estudio examina el Talmud como la obra central del judaísmo posbíblico,")
    c.drawCentredString(W/2,y-40,"desde una perspectiva histórico-teológica cristiana reformada.")
    c.setFillColorRGB(*[x/255 for x in AMBER_GOLD],alpha=0.85); c.setFont(ITAL_FONT,10)
    c.drawCentredString(W/2,H//2-30,"«Hay libros que nacen de la victoria")
    c.drawCentredString(W/2,H//2-44,"y hay libros que nacen de la derrota.»")
    c.setFont(BODY_FONT,8); c.setFillColorRGB(*[x/255 for x in AMBER_LIGHT],alpha=0.5)
    c.drawCentredString(W/2,H//2-60,"— Edgardo Lamas")
    c.setFillColorRGB(*[x/255 for x in AMBER_GOLD],alpha=0.4); c.setFont(BODY_FONT,7)
    c.drawCentredString(W/2,45,"sabiduriadelcorazon.com")


def make_page_bg(canvas_obj, doc):
    canvas_obj.saveState()
    canvas_obj.drawImage(TEXTURE_READY, 0, 0, width=W, height=H)
    canvas_obj.setFillColorRGB(*[x/255 for x in AMBER_GOLD], alpha=0.5)
    canvas_obj.rect(28, 50, 2.5, H-100, fill=1, stroke=0)
    canvas_obj.restoreState()


def make_page_decorations(canvas_obj, doc):
    canvas_obj.saveState()
    canvas_obj.setFillColorRGB(*[x/255 for x in BROWN_DEEP],alpha=0.9)
    canvas_obj.rect(0,H-38,W,38,fill=1,stroke=0)
    canvas_obj.setFillColorRGB(*[x/255 for x in AMBER_LIGHT])
    canvas_obj.setFont(BODY_FONT,7)
    canvas_obj.drawString(42,H-16,"EL TALMUD — LA TORAH EN EL EXILIO")
    canvas_obj.drawRightString(W-42,H-16,"SABIDURÍA PARA EL CORAZÓN")
    canvas_obj.setStrokeColorRGB(*[x/255 for x in AMBER_GOLD],alpha=0.4); canvas_obj.setLineWidth(0.5)
    canvas_obj.line(42,H-24,W-42,H-24)
    canvas_obj.setFillColorRGB(*[x/255 for x in BROWN_DEEP],alpha=0.85)
    canvas_obj.rect(0,0,W,36,fill=1,stroke=0)
    canvas_obj.setStrokeColorRGB(*[x/255 for x in AMBER_GOLD],alpha=0.4)
    canvas_obj.line(42,36,W-42,36)
    canvas_obj.setFillColorRGB(*[x/255 for x in AMBER_LIGHT]); canvas_obj.setFont(BODY_FONT,7)
    canvas_obj.drawCentredString(W/2,14,f"Libros Sagrados de Israel  ·  {doc.page}")
    canvas_obj.restoreState()


def get_styles():
    black    = colors.Color(0,0,0)
    sepia    = colors.Color(*[x/255 for x in BROWN_MID])
    burgundy = colors.Color(*[x/255 for x in BURGUNDY])
    return {
        "intro":      ParagraphStyle("intro", fontName=ITAL_FONT, fontSize=11,
                          textColor=sepia, leading=18, alignment=TA_CENTER,
                          spaceAfter=20, leftIndent=30, rightIndent=30),
        "chapter":    ParagraphStyle("chapter", fontName=TITLE_BOLD, fontSize=18,
                          textColor=burgundy, leading=24, spaceBefore=24, spaceAfter=6),
        "section":    ParagraphStyle("section", fontName=BOLD_FONT, fontSize=12,
                          textColor=black, leading=16, spaceBefore=18, spaceAfter=6),
        "subsection": ParagraphStyle("subsection", fontName=BOLD_FONT, fontSize=10,
                          textColor=black, leading=14, spaceBefore=12, spaceAfter=4),
        "body":       ParagraphStyle("body", fontName=BODY_FONT, fontSize=9.5,
                          textColor=black, leading=16.5, alignment=TA_JUSTIFY, spaceAfter=9),
        "quote":      ParagraphStyle("quote", fontName=ITAL_FONT, fontSize=9.5,
                          textColor=sepia, leading=16, alignment=TA_JUSTIFY,
                          leftIndent=24, rightIndent=24, spaceAfter=10, spaceBefore=10),
        "footer_note": ParagraphStyle("footer_note", fontName=ITAL_FONT, fontSize=8,
                          textColor=sepia, leading=12, alignment=TA_CENTER, spaceBefore=20),
    }


def illus(path, fw):
    img = Image(path, width=fw, height=fw*(400/1200)); img.hAlign='CENTER'; return img


def build_content():
    print("Generando páginas de contenido...")
    st = get_styles(); story = []; FW = W-48-42
    def P(t, s="body"): return Paragraph(t, st[s])
    def SP(h=8): return Spacer(1,h)

    story.append(P("LIBROS SAGRADOS DE ISRAEL — SABIDURÍA PARA EL CORAZÓN","section"))
    story.append(P("El Talmud: La Torah en el Exilio","chapter"))
    story.append(P("<i>Historia, Autoridad y Significado Teológico de la Ley Oral</i>","intro"))
    story.append(SP(8))
    story.append(P("<b>Nota editorial</b>","subsection"))
    story.append(P("Este artículo forma parte de la sección <i>«Libros Sagrados de Israel»</i> de la Biblioteca Virtual Sabiduría para el Corazón. El presente número examina el Talmud como la obra central del judaísmo posbíblico, con especial atención a su relación con la Torah escrita, su pretensión de autoridad revelada, y la respuesta que la tradición cristiana reformada ofrece a las preguntas teológicas que esta obra monumental plantea."))
    story.append(SP(10))
    story.append(P("<b>Introducción: El libro que reemplazó al Templo</b>","section"))
    story.append(P("Hay libros que nacen de la victoria y hay libros que nacen de la derrota. El Talmud pertenece a la segunda categoría. No surgió en los atrios iluminados de un Israel soberano, sino en las cenizas humeantes de Jerusalén conquistada, entre un pueblo que había perdido su territorio, su sacerdocio y el centro mismo de su culto. Y sin embargo, de esa catástrofe emergió una de las obras más monumentales de la historia religiosa de la humanidad: una enciclopedia de más de dos millones y medio de palabras que pretende nada menos que ser la voz de Dios hablando a Israel en el exilio."))
    story.append(P("El nombre mismo del Talmud declara su propósito. Del hebreo <i>lamad</i>, que significa enseñar o estudiar, el Talmud se presenta como el instrumento por excelencia del conocimiento divino: no la revelación primaria, sino su extensión viva y operante en cada generación. Su subtítulo teológico podría ser este: lo que Dios dijo en el Sinaí y que aún no había sido escrito. Comprender el Talmud es comprender la decisión más audaz del judaísmo posbíblico, la decisión de construir un santuario de palabras en el lugar donde ya no había piedras."))
    story.append(P("Para el lector cristiano y en particular para quien se acerca desde la perspectiva reformada, el Talmud no es un texto extraño ni enemigo. Es el mundo intelectual y espiritual en el que Jesús debatió con los fariseos, en el que Pablo aprendió a argumentar a los pies de Gamaliel, y en el que el vocabulario del Nuevo Testamento recibió su primera gramática. Estudiarlo con seriedad es honrar la continuidad de la revelación y comprender, con mayor profundidad y con mayor gratitud, por qué el evangelio es la novedad absoluta que es."))

    story.append(PageBreak())

    story.append(P("Capítulo I","chapter"))
    story.append(P("Origen, Estructura y el Santuario Portátil","section"))
    story.append(SP(6))
    story.append(illus(ILLUS_CAP1, FW))
    story.append(SP(14))

    story.append(P("<b>El catalizador: la destrucción del Segundo Templo</b>","subsection"))
    story.append(P("El año 70 de nuestra era no es simplemente una fecha en el calendario de la historia antigua. Es la coordenada que divide el judaísmo en dos épocas radicalmente distintas. Cuando las legiones romanas de Tito derribaron los muros del Segundo Templo y consumieron sus cámaras en las llamas, no destruyeron solamente un edificio. Destruyeron el sistema entero sobre el que la vida religiosa de Israel se articulaba: los sacrificios expiatorios, el sacerdocio levítico, el calendario cúltico anclado en Jerusalén. Para el pueblo judío, fue el equivalente de perder simultáneamente el Estado, la iglesia y la Biblia como texto vivo, todo en una misma tarde."))
    story.append(P("La respuesta del judaísmo naciente a esta catástrofe fue, paradójicamente, una de las hazañas intelectuales y espirituales más extraordinarias de la historia humana. Liderados por Rabbán Yojanán ben Zakkai, quien —según la tradición— escapó de Jerusalén sitiada oculto en un féretro para obtener de las autoridades romanas el permiso de establecer una academia en Yavne, los sabios del período iniciaron un proceso de reconfiguración radical de la identidad judía. El eje de la santidad se desplazó desde el espacio físico del Templo hacia el texto, desde el altar hacia la mesa de estudio, desde el sacrificio de animales hacia la <i>tefila</i>, la oración, que los rabinos llamaron «el servicio del corazón». En ese desplazamiento nació el Talmud."))
    story.append(P("El proceso se desarrolló en dos grandes etapas que conviene distinguir con cuidado, pues su diferencia no es solo cronológica sino también teológica. La primera etapa produjo la <i>Mishná</i> —del hebreo <i>mishnáh</i>, que significa reiteración—, el código base de la Ley Oral redactado en hebreo posbíblico y cerrado hacia el año 200 de la era común bajo el liderazgo de Rabbí Yehudá ha-Nasí. La Mishná organiza en seis órdenes o <i>Sedarim</i> la totalidad del derecho judío, desde las leyes agrícolas hasta las normas de pureza ritual, desde las fiestas del calendario hasta los procedimientos judiciales. Es un texto de una economía verbal notable: expone las posiciones de distintas escuelas sin siempre resolverlas, preservando el desacuerdo como parte del registro sagrado."))
    story.append(P("La segunda etapa produjo la <i>Guemará</i>, que en arameo significa complemento, y consiste en los vastos comentarios y debates que los sabios llamados <i>Amoraim</i> desarrollaron sobre cada tratado de la Mishná durante los tres siglos siguientes. La Guemará no es un comentario en el sentido ordinario de la palabra. Es una conversación transcontinental, multigeneracional y frecuentemente disputada, en la que los argumentos se extienden por páginas enteras sin arribar a una conclusión, en la que una pregunta lanza diez respuestas y cada respuesta desencadena otras tantas preguntas. El resultado de unir la Mishná con la Guemará es el Talmud, una obra que el judaísmo no terminó de escribir sino que terminó de compilar, porque el debate en sus páginas nunca cesa realmente."))

    story.append(SP(8))
    story.append(P("<b>Dos Talmudes, un problema</b>","subsection"))
    story.append(P("El primer dato que sorprende al lector es que existen en realidad dos Talmudes, no uno. El <i>Talmud de Jerusalén</i> o palestinense —conocido en hebreo como <i>Yerushalmí</i>— fue compilado en las academias de Galilea, principalmente en Tiberíades y Séforis, y quedó cerrado hacia finales del siglo cuarto de la era común. Su redacción fue, según los académicos, apresurada e incompleta, reflejo de la inestabilidad política bajo el dominio romano-bizantino tardío y de la presión creciente sobre las comunidades judías de Palestina. Está escrito en arameo occidental y es comparativamente breve."))
    story.append(P("El <i>Talmud de Babilonia</i> —el <i>Bavlí</i>— es otro asunto por completo. Elaborado en las academias mesopotámicas de Sura, Pumbedita y Nehardea, bajo la relativa tolerancia del Imperio Sasánida, el <i>Bavlí</i> es entre cinco y ocho veces más extenso que su contraparte palestinense. Está redactado en arameo oriental con numerosas influencias persas, y abarca treinta y seis tratados y medio de un análisis legal que se despliega con una profundidad y una sofisticación argumentativa sin precedentes en la literatura religiosa de la Antigüedad. Es este Talmud, y no el palestinense, el que Maimónides declaró vinculante para todo Israel, el que se convirtió en la norma definitiva del judaísmo en la diáspora, y el que hasta hoy es el objeto central del estudio rabínico en las academias del mundo."))
    story.append(P("La diferencia entre ambos textos no es meramente de extensión. El <i>Yerushalmí</i> ofrece una atmósfera más próxima al período de los <i>Tanaítas</i>, los sabios de la época de la Mishná, y es por eso especialmente valioso para comprender el trasfondo del Nuevo Testamento: sus debates reflejan un judaísmo que todavía recuerda el Templo con nostalgia vívida, que todavía discute leyes para las que ya no hay aplicación práctica porque el altar ya no existe, como si mantener la discusión fuera en sí mismo un acto de esperanza. El <i>Bavlí</i>, en cambio, porta la marca de una diáspora ya consolidada, de un judaísmo que ha aprendido a sobrevivir sin territorio, y de una racionalidad legal que ha incorporado siglos de experiencia en el arte de adaptar mandamientos intemporales a circunstancias siempre cambiantes."))
    story.append(P("La investigación académica moderna ha debatido con intensidad la naturaleza de la redacción final del <i>Bavlí</i>. Isaac Halevy, en su obra <i>Dorot Harishonim</i>, defiende una posición tradicionalista según la cual el núcleo argumentativo del Talmud fue fijado por los propios <i>Amoraim</i>, particularmente por los sabios Abaye y Rava en el siglo cuarto. David Weiss Halivni, en cambio, ha propuesto en <i>Meqorot Umesorot</i> una teoría más perturbadora para la sensibilidad ortodoxa: la mayor parte de la dialéctica argumentativa del <i>Bavlí</i> sería obra de una clase de sabios anónimos, los <i>Stammaim</i>, que operaron entre los siglos sexto y octavo reconstruyendo debates que la memoria oral había fragmentado. Si Halivni está en lo correcto —y hay evidencia textual considerable para su posición—, el Talmud no es simplemente la transcripción de una conversación antigua sino, en medida significativa, la reconstrucción editorial de esa conversación."))
    story.append(P("Esta discusión no es un tecnicismo académico sin consecuencias. Toca directamente la pregunta sobre la naturaleza de la autoridad talmúdica, que es la pregunta teológica central de este estudio."))

    story.append(SP(8))
    story.append(P("<b>El santuario portátil: teología de la supervivencia</b>","subsection"))
    story.append(P("El concepto que mejor resume la función del Talmud en la historia judía es el que los propios sabios articularon con una imagen de extraordinaria belleza y de profunda ambigüedad teológica: el <i>santuario portátil</i>. La frase captura la idea de que, al perder el Templo, Israel no perdió el acceso a la presencia divina, sino que encontró un nuevo vehículo para esa presencia en el texto y en su estudio. El <i>Beit Midrash</i>, la casa de estudio, sería en adelante lo que el <i>Beit HaMikdash</i>, el Templo, había sido: el lugar donde el cielo y la tierra se encontraban."))
    story.append(P("Para entender el peso de esta afirmación es necesario recordar lo que el Templo significaba en la teología bíblica. El Templo no era simplemente el lugar donde se ofrecían sacrificios. Era, según la comprensión del Antiguo Testamento, el punto de contacto entre la gloria de Dios y la tierra de los hombres, el lugar donde la <i>Shejiná</i>, la presencia divina, habitaba entre su pueblo. Cuando Salomón lo consagró, el fuego descendió del cielo y la gloria de Dios llenó el edificio hasta que los sacerdotes no pudieron sostenerse en pie (2 Crónicas 7:1-3). Su destrucción no era, por tanto, la pérdida de un edificio sino el retiro aparente de la presencia divina, el silencio de Dios en el único idioma que Israel conocía para su adoración."))
    story.append(P("La solución rabínica fue audaz: si Dios ya no puede ser encontrado en el Templo, puede ser encontrado en la Torah. Si el altar ya no puede recibir sacrificios, la mesa de estudio puede recibir una devoción equivalente. El <i>sofer</i> que estudia toda la noche ocupa el lugar del sacerdote que velaba en el Templo. Esta transferencia no fue arbitraria: se apoyó en textos bíblicos que los rabinos interpretaron en esa dirección, particularmente en el énfasis de los profetas en el conocimiento de Dios por encima del sacrificio ritual. El propio Oseas había dicho: «Porque misericordia quiero, y no sacrificio, y conocimiento de Dios más que holocaustos» (Oseas 6:6). Es precisamente este texto el que Jesús citaría en sus debates con los fariseos, lo que sugiere que el argumento era parte de una conversación interna del pensamiento bíblico que distintas tradiciones resolvieron de maneras distintas."))
    story.append(P("Históricamente, el santuario portátil demostró ser exactamente lo que los sabios prometieron: un sistema de identidad comunitaria capaz de sostener a un pueblo disperso por todo el mundo conocido sin perder su cohesión. Las comunidades judías de Babilonia, de Roma, de Alejandría, de Persia y más tarde de España, del Imperio Otomano y de Europa oriental, todas ellas distintas en idioma, en costumbres y en contexto político, permanecieron reconociblemente el mismo pueblo porque compartían el mismo texto y el mismo método de estudio. En esto el Talmud no tiene paralelo en la historia de las religiones: fue el primer sistema en la historia capaz de mantener la identidad de una nación sin territorio, sin estado y sin templo durante casi dos milenios."))
    story.append(P("Para el cristiano reformado, sin embargo, esta solución plantea una pregunta que no puede ser esquivada. Si el Templo fue destruido —y aquí la perspectiva reformada coincide con el testimonio del Nuevo Testamento (Mateo 24:2, Lucas 21:20-24)— como acto de juicio histórico-redentor en el que el sistema sacrificial del Antiguo Testamento llegaba a su cumplimiento tipológico en la obra del Mediador prometido, entonces el «santuario portátil» talmúdico representa no simplemente una solución de ingenio humano sino una alternativa al cumplimiento ofrecido en Cristo. Esta no es una afirmación de superioridad cultural ni de triunfalismo teológico. Es simplemente la consecuencia lógica de tomar en serio tanto la destrucción del Templo como el anuncio de Jesús: «Destruid este templo y en tres días lo levantaré» (Juan 2:19)."))
    story.append(P("«El libro que pretende reemplazar al Templo es, desde la perspectiva del Nuevo Testamento, una respuesta a una pregunta a la que ya se había dado respuesta en la cruz y en la resurrección.»","quote"))

    story.append(PageBreak())

    story.append(P("Capítulo II","chapter"))
    story.append(P("Autoridad, Tradición y la Respuesta Reformada","section"))
    story.append(SP(6))
    story.append(illus(ILLUS_CAP2, FW))
    story.append(SP(14))

    story.append(P("<b>La pretensión de la Ley Oral</b>","subsection"))
    story.append(P("La pregunta más importante que el Talmud plantea a la teología no es histórica sino epistemológica: ¿de dónde viene su autoridad? La respuesta del judaísmo rabínico ortodoxo es categórica y merece ser comprendida en sus propios términos antes de ser evaluada críticamente. Según esta postura, la Ley Oral no es una creación de los sabios del período rabínico sino una revelación sinaítica paralela a la Torah escrita. Moisés habría recibido en el Sinaí no solo los cinco libros que conocemos sino también un cuerpo de instrucciones orales que no fueron escritas en ese momento sino transmitidas de generación en generación: de Moisés a Josué, de Josué a los ancianos, de los ancianos a los profetas, de los profetas a los hombres de la Gran Asamblea, y de allí a los <i>Tanaítas</i> que los fijaron por escrito en la Mishná. La propia Mishná codificó esta cadena de transmisión en su primer tratado: «Moisés recibió la Torah en el Sinaí y la transmitió a Josué, Josué a los ancianos, los ancianos a los profetas, y los profetas a los hombres de la Gran Asamblea» (Avot 1:1)."))
    story.append(P("Esta afirmación tiene consecuencias teológicas de enorme alcance. Significa que el Talmud no es simplemente un comentario humano sobre la Escritura, por más sabio y piadoso que sea, sino una parte de la revelación misma. Significa que la Torah escrita es, en cierto sentido, incompleta sin la Torah oral que la explica, la extiende y la aplica. Y significa que la autoridad del texto talmúdico no deriva de la sabiduría de sus redactores sino de su participación en una cadena revelacional que remonta al Sinaí. El Talmud, desde esta perspectiva, no es simplemente sobre la Palabra de Dios: es Palabra de Dios."))
    story.append(P("Maimónides —Moshé ben Maimón, el <i>Rambam</i>, figura cumbre de la filosofía y la codificación jurídica del judaísmo medieval— fue quien con mayor sistematicidad articuló la autoridad universal del Talmud de Babilonia. En su introducción al <i>Mishné Torá</i>, compuesto hacia el año 1180 en Egipto, declaró que todo lo contenido en el Talmud babilónico es vinculante para todo Israel, precisamente porque sus sabios representaban la totalidad o la mayoría de los eruditos de la nación. El mérito del <i>Mishné Torá</i> consiste en que Maimónides tomó la masa informe de debates y posiciones divergentes del Talmud y la organizó en catorce libros temáticos con decisiones categóricas, eliminando deliberadamente el <i>shakla ve-tarya</i>, el «dar y tomar» dialéctico, para ofrecer respuestas directas a quienes buscaban saber qué hacer sin necesitar ser eruditos talmúdicos."))
    story.append(P("Pero incluso Maimónides, el gran sistematizador, reconocía una distinción que la tradición posterior tendió a oscurecer. En su <i>Sefer HaMitzvot</i>, distinguía entre leyes de origen sinaítico genuino y leyes de origen rabínico, derivadas por los sabios mediante herramientas hermenéuticas conocidas como <i>middot</i>. Estas últimas, reconocía, tienen un estatus diferente: son obligatorias, pero no poseen la misma autoridad que los mandamientos directamente revelados. Si Maimónides tenía razón, entonces el Talmud es una obra de dos naturalezas —parte revelación transmitida, parte elaboración humana— y no siempre es posible distinguir claramente entre una y otra dentro del texto mismo."))

    story.append(SP(8))
    story.append(P("<b>El principio <i>Elu ve-elu</i> y el problema del pluralismo revelacional</b>","subsection"))
    story.append(P("Ningún principio del pensamiento talmúdico desafía más directamente la epistemología reformada que el axioma <i>Elu ve-elu divré Elohim jaim</i>: «estas y aquellas son palabras del Dios vivo.» Esta formulación fue elaborada para arbitrar el célebre conflicto entre las escuelas de Hilel y Shamai, dos maestros del siglo primero cuyas posiciones sobre cientos de cuestiones legales son diametralmente opuestas. La tradición cuenta que una voz celestial, una <i>Bat Kol</i>, intervino en la academia de Yavne para declarar que ambas escuelas portaban la verdad divina, aunque la práctica cotidiana siguiera la escuela de Hilel por su mayor humildad."))
    story.append(P("El principio es de una elegancia intelectual innegable: permite que interpretaciones contradictorias coexistan bajo una misma autoridad sagrada, transforma el desacuerdo en riqueza en lugar de en crisis, y otorga al debate mismo un valor teológico intrínseco. El Talmud comenzaría simbólicamente en la página dos —no en la uno— para señalar que ningún estudio ha comenzado realmente: el texto presupone una conversación anterior que el lector debe traer consigo. El debate no tiene fin porque la verdad divina es más amplia que cualquier formulación humana que pretenda capturarla definitivamente."))
    story.append(P("Desde la perspectiva reformada, sin embargo, el principio <i>Elu ve-elu</i> plantea una dificultad de fondo. Si dos posiciones contradictorias son simultáneamente «palabras del Dios vivo», entonces la revelación no tiene un contenido determinado sino un carácter procedimental: lo sagrado no está en lo que se dice sino en cómo se dice, en el diálogo mismo más que en sus conclusiones. Esto transforma la revelación de un evento que ocurrió en el Sinaí —y que puede, por tanto, ser recibido, transmitido y obedecido con fidelidad— en un proceso continuo de interpretación comunitaria que no tiene punto de llegada. Para la tradición reformada, cuyo principio hermenéutico cardinal es la <i>sola Scriptura</i>, este es precisamente el peligro que Jesús identificó cuando confrontó a los fariseos en Mateo 15. La acusación de Cristo no era que los fariseos estudiaran demasiado: era que la tradición oral había adquirido una autoridad que desplazaba al texto que pretendía servir. «Por qué también vosotros quebrantáis el mandamiento de Dios por vuestra tradición» (Mateo 15:3)."))

    story.append(SP(8))
    story.append(P("<b>Pablo, Gamaliel y la dialéctica talmúdica</b>","subsection"))
    story.append(SP(6))
    story.append(illus(ILLUS_CAP3, FW))
    story.append(SP(14))
    story.append(P("Que Pablo de Tarso fue formado en la tradición que luego cristalizaría en el Talmud no es una especulación académica sino un dato biográfico que el propio apóstol declara con orgullo. «Soy judío —dijo ante la multitud de Jerusalén— nacido en Tarso de Cilicia, pero criado en esta ciudad, instruido a los pies de Gamaliel, conforme a la exactitud de la ley de nuestros padres» (Hechos 22:3). Gamaliel el Viejo, nieto de Hilel y primero de los sabios en recibir el título de <i>Rabbán</i>, representaba la cumbre del saber farisaico de su época. Ser formado a sus pies significaba adquirir no solo conocimiento legal sino un método de razonamiento, un repertorio de herramientas hermenéuticas y una sensibilidad argumentativa que Pablo nunca abandonó, incluso después de su encuentro en el camino a Damasco."))
    story.append(P("Las huellas de esa formación son visibles a lo largo de las epístolas. En Gálatas 3:16, Pablo elabora un argumento sobre el término «simiente» en singular frente al plural que es perfectamente talmúdico en su lógica: la exégesis minuciosa de una sola palabra para extraer consecuencias doctrinales de gran alcance es precisamente el método del <i>pilpul</i> rabínico, la dialéctica argumentativa que los académicos del Talmud llevarían a su máxima expresión. En Gálatas 4:21-31, realiza lo que los rabinos llamaban <i>drash</i>, una lectura alegórica del texto que descubre significados latentes bajo la superficie narrativa, aplicando la historia de Agar y Sara como imagen tipológica del contraste entre la Torah como esclavitud y el evangelio como libertad. En Romanos, el uso del término griego <i>nomos</i> sin artículo para referirse a la ley como principio abstracto frente al uso con artículo para referirse a la Torah específica del Sinaí refleja una sofisticación en el manejo de las categorías legales que solo se entiende plenamente desde el trasfondo talmúdico."))
    story.append(P("Pero Pablo no empleó estas herramientas para arribar a conclusiones talmúdicas. Las empleó para demoler las premisas que las fundaban. La Torah es el <i>paidagogos</i>, el pedagogo que conduce al niño hasta la escuela sin ser él mismo el maestro (Gálatas 3:24). Ha cumplido su función preparatoria: ha revelado la culpa universal, ha establecido la necesidad de la expiación y ha prefigurado, en cada sacrificio y en cada rito de pureza, la obra del Mediador definitivo. Cuando ese Mediador llega, el pedagogo es relevado de su función. No porque la ley sea mala —«¿Luego la ley es pecado? En ninguna manera» (Romanos 7:7)— sino porque ha sido cumplida en Aquel que es el fin de la ley para justicia a todo aquel que cree (Romanos 10:4)."))

    story.append(SP(8))
    story.append(P("<b>Maimónides, la razón y los límites de la codificación</b>","subsection"))
    story.append(SP(6))
    story.append(illus(ILLUS_CAP4, FW))
    story.append(SP(14))
    story.append(P("La figura de Maimónides merece una consideración separada no solo por su importancia en la historia del judaísmo sino por los puentes que su pensamiento tiende hacia la tradición filosófica y teológica cristiana. Nacido en Córdoba en 1138 y formado en el cruce entre el mundo árabe y la herencia talmúdica, Maimónides fue el primer pensador judío que intentó integrar sistemáticamente la filosofía aristotélica con la revelación bíblica, un proyecto que Tomás de Aquino llevaría más tarde al ámbito cristiano reconociendo explícitamente la influencia del <i>Rambam</i>."))
    story.append(P("Su obra más influyente en términos filosóficos, la <i>Guía de los Perplejos</i>, propone que la ley talmúdica no es un fin en sí misma sino un instrumento para la perfección del alma: el cumplimiento meticuloso de los mandamientos refina las facultades morales del ser humano y lo dispone para el conocimiento de Dios a través de la razón. Esta afirmación tiene una implicación que no siempre es advertida: si la ley es un instrumento para un fin que la trasciende, entonces la ley no tiene la última palabra. El <i>Mishné Torá</i>, su monumental código legal, y la <i>Guía de los Perplejos</i>, su obra filosófica, conviven en una tensión que el propio Maimónides nunca resolvió completamente: entre el rigor de la obediencia legal y el horizonte de la contemplación racional."))
    story.append(P("Para la perspectiva reformada, la grandeza intelectual de Maimónides no oscurece la pregunta que su obra no puede responder: ¿puede la razón, por más refinada que sea por la práctica de los mandamientos, alcanzar el conocimiento de Dios que la Escritura describe como el fin de la existencia humana? La respuesta reformada es negativa. El problema no es que el proyecto de Maimónides fuera impreciso o insuficientemente filosófico. El problema es que ningún sistema legal, por más sabio que sea, puede producir la justicia que Dios requiere, porque la fuente de injusticia no está en la ignorancia de la ley sino en la condición del corazón humano ante Dios. La ley puede revelar esa condición —y es la función que Pablo reconoce como primera utilidad de la Torah—, pero no puede remediarla."))

    story.append(SP(8))
    story.append(P("<b>La suficiencia de las Escrituras y el honor al Israel según la carne</b>","subsection"))
    story.append(P("Afirmar la suficiencia de las Escrituras frente a la pretensión talmúdica de una Ley Oral revelada no es, para la perspectiva reformada, un acto de antagonismo hacia el pueblo judío sino un acto de fidelidad a la misma Torah que el Talmud pretende honrar. La <i>sola Scriptura</i> no es un principio anticuado de las guerras confesionales del siglo dieciséis: es la convicción de que la Palabra de Dios, en su forma escrita y canonizada, es normativa, suficiente e interpretable en sí misma, sin necesidad de una tradición paralela que iguale su autoridad. Esta convicción fue compartida, en sus fundamentos, por los reformadores del siglo dieciséis precisamente porque la leyeron en el Antiguo Testamento: «A la ley y al testimonio —declaró Isaías—: si no dijeren conforme a esto, es porque no les ha amanecido» (Isaías 8:20)."))
    story.append(P("El honor genuino al Israel histórico y al pueblo judío contemporáneo no consiste en afirmar que el Talmud es Palabra de Dios cuando la lógica de la revelación progresiva sugiere que no lo es. Consiste en tomarlo en serio como el testimonio de un pueblo que, frente a una catástrofe histórica que el Nuevo Testamento interpreta como juicio y cumplimiento simultáneos, respondió con una creatividad espiritual e intelectual sin paralelo, preservando la Torah escrita con una fidelidad textual que los descubrimientos de Qumrán han confirmado de manera impresionante. Consiste también en reconocer que el Talmud es el contexto indispensable sin el cual el vocabulario del Nuevo Testamento queda parcialmente opaco: la justicia, la misericordia, el pacto, la expiación, el sacerdocio, la promesa. Ninguno de estos términos puede ser leído correctamente sin el trasfondo que el mundo del Segundo Templo y su herencia rabínica proporcionan."))
    story.append(P("Y consiste, sobre todo, en mantener viva la promesa de Romanos 11: que el endurecimiento de una parte de Israel no es permanente, que los dones y el llamamiento de Dios son irrevocables, y que en el misterio de la historia redentora Israel será injertado de nuevo en el olivo del que proviene, no mediante el abandono del judaísmo sino mediante el reconocimiento del Mesías que el judaísmo más fiel esperaba y que las páginas más profundas del Talmud —en sus discusiones sobre la naturaleza del Mesías, el sufrimiento del justo y la renovación del pacto— a veces rozan sin nombrar."))

    story.append(SP(8))
    story.append(P("<b>Conclusión: El diálogo que no ha terminado</b>","subsection"))
    story.append(P("El Talmud es, en definitiva, el registro de un pueblo que amó a Dios en el exilio y que encontró en el texto y en su estudio la forma de mantener ese amor vivo a través de la diáspora, las persecuciones y la distancia de siglos. Que la forma que eligió para ese amor no es la que el Nuevo Testamento propone no disminuye la magnitud del esfuerzo ni la profundidad de la devoción. El escriba que pasa toda la noche sobre un tratado difícil no está haciendo algo trivial, aunque lo esté haciendo en la dirección equivocada. La seriedad con que el judaísmo talmúdico tomó la pregunta de cómo vivir ante Dios es exactamente la seriedad con que el evangelio exige ser recibido."))
    story.append(P("Para el cristiano reformado que estudia el Talmud, la experiencia debería producir dos cosas a la vez: una mayor comprensión de la revelación en su continuidad histórica, pues el Nuevo Testamento no puede ser leído en plenitud sin el trasfondo que el mundo rabínico proporciona; y una mayor gratitud por el evangelio, porque solo frente a la magnitud del esfuerzo humano por alcanzar a Dios mediante la obediencia legal se comprende en toda su dimensión la gracia que consiste en que Dios descendió a buscar al hombre que no podía ascender."))
    story.append(P("«La Torah condena. La Torah revela la culpa. La Torah señala hacia el altar. Y el altar señalaba, en cada sacrificio y en cada gota de sangre derramada sobre el propiciatorio, hacia Aquel que vendría a cumplir lo que ningún sistema de ley, por más sabio y por más venerado que sea, puede hacer: quitar el pecado del mundo.»","quote"))
    story.append(SP(16))
    story.append(P("Biblioteca Virtual «Sabiduría para el Corazón»  ·  Serie: Los Libros Sagrados de Israel  ·  Julio 2025","footer_note"))

    doc = BaseDocTemplate(TMP_CONTENT, pagesize=A4, leftMargin=48, rightMargin=42, topMargin=52, bottomMargin=52)
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='normal')
    doc.addPageTemplates([PageTemplate(id='content', frames=frame, onPage=make_page_bg, onPageEnd=make_page_decorations)])
    doc.build(story)
    print("  Contenido OK")


def merge_pdf():
    print("Combinando páginas...")
    meta_path = "/tmp/talmud_meta_page.pdf"
    c = rl_canvas.Canvas(meta_path, pagesize=A4)
    build_metadata(c); c.showPage(); c.save()
    final = fitz.open()
    for path in [TMP_COVER, meta_path, TMP_CONTENT]:
        src = fitz.open(path); final.insert_pdf(src); src.close()
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    final.save(OUTPUT); final.close()
    print(f"Guardado: {OUTPUT}  ({fitz.open(OUTPUT).page_count} páginas)")


if __name__ == "__main__":
    prepare_texture()
    build_cover()
    build_content()
    merge_pdf()
    print("✓ El-Talmud.pdf listo")
