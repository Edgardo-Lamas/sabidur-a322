"""
Templo de Salomón — Render Fotorrealista
Blender 4.x headless script
Uso: blender --background --python scripts/render_templo.py
Salida: public/img/templo/render_*.png
"""

import bpy
import bmesh
import os
import math
from mathutils import Vector, Euler

# ── Rutas ─────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
OUT_DIR = os.path.join(PROJECT_DIR, "public", "img", "templo")
os.makedirs(OUT_DIR, exist_ok=True)

# ── Constantes ────────────────────────────────────────────
IN = 0.0254          # 1 pulgada = 0.0254 m
CODO = 18.11 * IN    # 1 codo hebreo en metros

# ── Limpieza de escena ────────────────────────────────────
bpy.ops.wm.read_factory_settings(use_empty=True)
for block in [bpy.data.meshes, bpy.data.lights, bpy.data.cameras]:
    for item in block:
        block.remove(item)

# ══════════════════════════════════════════════════════════
# MATERIALES
# ══════════════════════════════════════════════════════════
def make_mat(name, r, g, b, metallic=0.0, roughness=0.6, alpha=1.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (r, g, b, alpha)
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    return mat

MATS = {
    "sandstone":   make_mat("sandstone",   0.76, 0.70, 0.50, roughness=0.80),
    "limestone":   make_mat("limestone",   0.92, 0.88, 0.78, roughness=0.75),
    "gold":        make_mat("gold",        0.83, 0.66, 0.20, metallic=0.95, roughness=0.15),
    "marble":      make_mat("marble",      0.94, 0.92, 0.86, roughness=0.50),
    "bronze":      make_mat("bronze",      0.72, 0.45, 0.20, metallic=0.90, roughness=0.30),
    "cedar":       make_mat("cedar",       0.55, 0.35, 0.17, roughness=0.70),
    "cedar_dark":  make_mat("cedar_dark",  0.39, 0.25, 0.12, roughness=0.72),
    "olive_wood":  make_mat("olive_wood",  0.51, 0.39, 0.22, roughness=0.68),
    "shadow":      make_mat("shadow",      0.04, 0.03, 0.02, roughness=0.95),
    "stone":       make_mat("stone",       0.78, 0.72, 0.61, roughness=0.82),
    "win_stone":   make_mat("win_stone",   0.25, 0.22, 0.16, roughness=0.85),
    "limestone2":  make_mat("limestone2",  0.88, 0.84, 0.74, roughness=0.77),
}

# ══════════════════════════════════════════════════════════
# FUNCIÓN BBOX
# ══════════════════════════════════════════════════════════
def bbox(name, mat_key, x0, y0, z0, x1, y1, z1, collection=None):
    s = IN  # escala: pulgadas → metros
    bm = bmesh.new()
    verts = [
        bm.verts.new(Vector((x0*s, y0*s, z0*s))),
        bm.verts.new(Vector((x1*s, y0*s, z0*s))),
        bm.verts.new(Vector((x1*s, y1*s, z0*s))),
        bm.verts.new(Vector((x0*s, y1*s, z0*s))),
        bm.verts.new(Vector((x0*s, y0*s, z1*s))),
        bm.verts.new(Vector((x1*s, y0*s, z1*s))),
        bm.verts.new(Vector((x1*s, y1*s, z1*s))),
        bm.verts.new(Vector((x0*s, y1*s, z1*s))),
    ]
    bm.verts.ensure_lookup_table()
    for fi in [(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]:
        bm.faces.new([verts[i] for i in fi])
    bm.normal_update()
    mesh = bpy.data.meshes.new(name)
    bm.to_mesh(mesh)
    bm.free()
    obj = bpy.data.objects.new(name, mesh)
    mat = MATS.get(mat_key, MATS["limestone"])
    obj.data.materials.append(mat)
    coll = collection or bpy.context.scene.collection
    coll.objects.link(obj)
    return obj

def make_coll(name, parent=None):
    c = bpy.data.collections.new(name)
    (parent or bpy.context.scene.collection).children.link(c)
    return c

# ══════════════════════════════════════════════════════════
# COORDENADAS DEL MODELO (en pulgadas, directo del SketchUp)
# ══════════════════════════════════════════════════════════
CODO_IN = 18.11
W=20*CODO_IN; D_UL=10*CODO_IN; D_HK=40*CODO_IN; D_DB=20*CODO_IN
H_MAIN=30*CODO_IN; PLAT_H=5*CODO_IN
Y0=0; Y1=D_UL; Y2=D_UL+D_HK; Y3=D_UL+D_HK+D_DB
ZB=PLAT_H; ZT=ZB+H_MAIN; XL=-W/2
WO = 0.5   # pulgadas de offset para evitar Z-fighting en caras coincidentes a X=±181.1"

# ─── SESIÓN 1 — Edificio principal ───────────────────────
c1 = make_coll("Templo_Salomon")

# Plataforma Moriah
bbox("Plataforma_Moriah","sandstone", -452.75,-362.2,0, 452.75,1629.9,90.55, c1)
# Escalones (5)
for i,(w,y0s,y1s,z0s,z1s) in enumerate([
    (271.65,-90.55,-72.44, 0,18.11),
    (253.54,-72.44,-54.33,18.11,36.22),
    (235.43,-54.33,-36.22,36.22,54.33),
    (217.32,-36.22,-18.11,54.33,72.44),
    (199.21,-18.11, 0,    72.44,90.55),
]):
    bbox(f"Escalon_{i+1}","limestone", -w,y0s,z0s, w,y1s,z1s, c1)

# Ulam, Hekal, Debir
bbox("Ulam_Vestibulo",     "limestone", XL,Y0,ZB, -XL,Y1,ZT, c1)
bbox("Hekal_Lugar_Santo",  "limestone", XL,Y1,ZB, -XL,Y2,ZT, c1)
bbox("Debir_Lugar_Santisimo","gold",    XL,Y2,ZB, -XL,Y3,ZT, c1)

PAR_H=1.8*CODO_IN; PAR_T=1.1*CODO_IN; CORN_H=0.5*CODO_IN; CORN_X=0.4*CODO_IN
# Parapetos
bbox("Parapeto_Frente","limestone", XL,Y0,ZT, -XL,Y0+PAR_T,ZT+PAR_H, c1)
bbox("Parapeto_Atras", "limestone", XL,Y3-PAR_T,ZT, -XL,Y3,ZT+PAR_H, c1)
bbox("Parapeto_Este",  "limestone", -XL-PAR_T,Y0,ZT, -XL,Y3,ZT+PAR_H, c1)
bbox("Parapeto_Oeste", "limestone", XL,Y0,ZT, XL+PAR_T,Y3,ZT+PAR_H, c1)
# Cornisas
bbox("Cornisa_Frente","marble", XL-CORN_X,Y0-CORN_X,ZT-CORN_H, -XL+CORN_X,Y0+PAR_T,ZT, c1)
bbox("Cornisa_Atras", "marble", XL-CORN_X,Y3-PAR_T,ZT-CORN_H, -XL+CORN_X,Y3+CORN_X,ZT, c1)
bbox("Cornisa_Este",  "marble", -XL-CORN_X,Y0,ZT-CORN_H, -XL-WO,Y3,ZT, c1)
bbox("Cornisa_Oeste", "marble", XL+WO,Y0,ZT-CORN_H, XL+CORN_X,Y3,ZT, c1)

# ─── SESIÓN 2 — Atrio y columnas ─────────────────────────
c2 = make_coll("Atrio_y_Columnas")

COL_W=3*CODO_IN; COL_CAP=4*CODO_IN; COL_H=18*CODO_IN; COL_CAP_H=5*CODO_IN
# Jaquín y Boaz
for cx, nm in [(7*CODO_IN,"Jaquin"), (-7*CODO_IN,"Boaz")]:
    bbox(f"Col_{nm}_Fuste","bronze",
         cx-COL_W/2,-2.5*CODO_IN,ZB, cx+COL_W/2,0.5*CODO_IN,ZB+COL_H, c2)
    bbox(f"Col_{nm}_Cap","bronze",
         cx-COL_CAP/2,-3*CODO_IN,ZB+COL_H, cx+COL_CAP/2,CODO_IN,ZB+COL_H+COL_CAP_H, c2)

# Altar de bronce (escalonado)
for i,(hw,hy,zh,zh2) in enumerate([
    (10*CODO_IN,10*CODO_IN,ZB,       ZB+3*CODO_IN),
    (8.5*CODO_IN,8.5*CODO_IN,ZB+3*CODO_IN,ZB+6*CODO_IN),
    (7*CODO_IN,  7*CODO_IN,  ZB+6*CODO_IN,ZB+10*CODO_IN),
]):
    bbox(f"Altar_N{i+1}","bronze",
         -hw,-Y1-hw*2,zh, hw,-Y1-hw*0,zh2, c2)

# Mar de bronce + 12 toros
MCX=18*CODO_IN; MCY=Y2-15*CODO_IN
bbox("Mar_Cuba","bronze", MCX,MCY,ZB+2.5*CODO_IN, MCX+10*CODO_IN,MCY+10*CODO_IN,ZB+7.5*CODO_IN, c2)
for j in range(3):
    for side,sx,ey in [("N",MCX+1.5*CODO_IN*(j+0.5),MCY),("S",MCX+1.5*CODO_IN*(j+0.5),MCY+10*CODO_IN),
                       ("E",MCX+10*CODO_IN,MCY+2*CODO_IN*(j+0.5)),("W",MCX,MCY+2*CODO_IN*(j+0.5))]:
        bbox(f"Toro_{side}{j+1}","bronze", sx-CODO_IN,ey-1.25*CODO_IN,ZB, sx+CODO_IN,ey+1.25*CODO_IN,ZB+2.5*CODO_IN, c2)

# Muros del atrio
COURT=40*CODO_IN; WT2=1.5*CODO_IN
bbox("Muro_Sur",  "stone",  COURT-WT2,-30*CODO_IN,ZB, COURT,90*CODO_IN,ZB+6*CODO_IN, c2)
bbox("Muro_Norte","stone", -COURT,-30*CODO_IN,ZB, -COURT+WT2,90*CODO_IN,ZB+6*CODO_IN, c2)
bbox("Muro_Fondo","stone", -COURT,90*CODO_IN-WT2,ZB, COURT,90*CODO_IN,ZB+6*CODO_IN, c2)
bbox("Muro_FrtIzq","stone",-COURT,-30*CODO_IN,ZB, -8*CODO_IN,-30*CODO_IN+WT2,ZB+6*CODO_IN, c2)
bbox("Muro_FrtDer","stone",  8*CODO_IN,-30*CODO_IN,ZB, COURT,-30*CODO_IN+WT2,ZB+6*CODO_IN, c2)

# ─── SESIÓN 3 — Yatsía e interior ────────────────────────
c3 = make_coll("Yatsia_e_Interior")

for piso,w in enumerate([5*CODO_IN,6*CODO_IN,7*CODO_IN]):
    z0=ZB+piso*5*CODO_IN; z1=z0+5*CODO_IN
    bbox(f"Yatsia_P{piso+1}_Oeste","limestone2", XL-w,Y1,z0, XL,Y3,z1, c3)
    bbox(f"Yatsia_P{piso+1}_Este", "limestone2", -XL,Y1,z0, -XL+w,Y3,z1, c3)

MEN_SZ=CODO_IN; MEN_H=4*CODO_IN
for j,my in enumerate([Y1+6*CODO_IN,Y1+14*CODO_IN,Y1+22*CODO_IN,Y1+30*CODO_IN,Y1+37*CODO_IN]):
    for side,sx in [("N",-5*CODO_IN),("S",5*CODO_IN)]:
        bbox(f"Menorah_{side}{j+1}","gold",
             sx-MEN_SZ/2,my-MEN_SZ/2,ZB, sx+MEN_SZ/2,my+MEN_SZ/2,ZB+MEN_H, c3)

bbox("Mesa_Pan","gold", -6*CODO_IN,Y1+4*CODO_IN,ZB, -3*CODO_IN,Y1+5*CODO_IN,ZB+1.5*CODO_IN, c3)
bbox("Altar_Incienso","gold", -0.5*CODO_IN,Y2-3*CODO_IN,ZB, 0.5*CODO_IN,Y2-2*CODO_IN,ZB+2*CODO_IN, c3)

CHER_H=10*CODO_IN
for j,cx in enumerate([-5*CODO_IN,5*CODO_IN]):
    bbox(f"Querubin_{j+1}","gold", cx-CODO_IN,Y2+9*CODO_IN,ZB, cx+CODO_IN,Y2+11*CODO_IN,ZB+CHER_H, c3)
bbox("Querubines_Alas","gold", XL,Y2+9.5*CODO_IN,ZB+5*CODO_IN, -XL,Y2+10.5*CODO_IN,ZB+CHER_H, c3)
bbox("Arca_del_Pacto","gold", -1.25*CODO_IN,Y2+9.75*CODO_IN,ZB, 1.25*CODO_IN,Y2+10.75*CODO_IN,ZB+1.5*CODO_IN, c3)

# ─── SESIÓN 4 — Acabados y ventanas ──────────────────────
c4 = make_coll("Acabados_y_Ventanas")

FT=0.25*CODO_IN; CT=0.40*CODO_IN
bbox("Piso_Ulam", "cedar",      XL,Y0,ZB, -XL,Y1,ZB+FT, c4)
bbox("Piso_Hekal","cedar",      XL,Y1,ZB, -XL,Y2,ZB+FT, c4)
bbox("Piso_Debir","cedar_dark", XL,Y2,ZB, -XL,Y3,ZB+FT, c4)
bbox("Cedro_Hekal_N","cedar",  XL+WO,Y1,ZB, XL+CT,Y2,ZT, c4)
bbox("Cedro_Hekal_S","cedar", -XL-CT,Y1,ZB, -XL-WO,Y2,ZT, c4)
bbox("Cedro_Hekal_Techo","cedar", XL,Y1,ZT-CT, -XL,Y2,ZT-0.5, c4)
bbox("Cedro_Tabique","cedar",  XL+WO,Y2-CT,ZB, -XL-WO,Y2,ZT-0.5, c4)
bbox("Oro_Debir_N","gold",  XL+WO,Y2,ZB, XL+CT,Y3,ZT-0.5, c4)
bbox("Oro_Debir_S","gold", -XL-CT,Y2,ZB, -XL-WO,Y3,ZT-0.5, c4)
bbox("Oro_Debir_Fondo","gold", XL+WO,Y3-CT,ZB, -XL-WO,Y3,ZT-0.5, c4)
bbox("Oro_Debir_Techo","gold", XL,Y2,ZT-CT, -XL,Y3,ZT-0.5, c4)

WIN_W=1.8*CODO_IN; WIN_H=2.5*CODO_IN; WIN_D=0.35*CODO_IN; WIN_Z0=ZB+22*CODO_IN
for j,wy in enumerate([Y1+7*CODO_IN,Y1+17*CODO_IN,Y1+27*CODO_IN,Y1+36*CODO_IN]):
    n=str(j+1)
    bbox(f"Ventana_N{n}","win_stone", XL-WIN_D,wy-WIN_W/2,WIN_Z0, XL,wy+WIN_W/2,WIN_Z0+WIN_H, c4)
    bbox(f"Ventana_S{n}","win_stone", -XL,wy-WIN_W/2,WIN_Z0, -XL+WIN_D,wy+WIN_W/2,WIN_Z0+WIN_H, c4)

# ─── SESIÓN 5 — Puertas ──────────────────────────────────
c5 = make_coll("Puertas_Templo")

PIE=0.9*CODO_IN; UDOOR_W=10*CODO_IN; UDOOR_H=20*CODO_IN
bbox("Ulam_Hueco","shadow", -UDOOR_W/2,-0.3,ZB, UDOOR_W/2,PIE,ZB+UDOOR_H, c5)
bbox("Ulam_Pilaster_Izq","limestone", XL+WO,-PIE,ZB, -UDOOR_W/2,PIE,ZT, c5)
bbox("Ulam_Pilaster_Der","limestone",  UDOOR_W/2,-PIE,ZB, -XL-WO,PIE,ZT, c5)
bbox("Ulam_Lintel","limestone", XL+WO,-PIE,ZB+UDOOR_H, -XL-WO,PIE,ZT, c5)
DL_T=0.22*CODO_IN
bbox("Ulam_Hoja_Izq","cedar", -UDOOR_W/2+0.3*CODO_IN,0.25*CODO_IN,ZB, -0.3*CODO_IN,0.25*CODO_IN+DL_T,ZB+UDOOR_H-0.4*CODO_IN, c5)
bbox("Ulam_Hoja_Der","cedar",  0.3*CODO_IN,0.25*CODO_IN,ZB, UDOOR_W/2-0.3*CODO_IN,0.25*CODO_IN+DL_T,ZB+UDOOR_H-0.4*CODO_IN, c5)

HDOOR_W=5*CODO_IN; HDOOR_H=13*CODO_IN; PIE2=0.7*CODO_IN
bbox("Hekal_Hueco","shadow", -HDOOR_W/2,Y1-0.2,ZB, HDOOR_W/2,Y1+PIE2,ZB+HDOOR_H, c5)
bbox("Hekal_Pilaster_Izq","limestone", XL+WO,Y1-PIE2,ZB, -HDOOR_W/2,Y1+PIE2,ZT, c5)
bbox("Hekal_Pilaster_Der","limestone",  HDOOR_W/2,Y1-PIE2,ZB, -XL-WO,Y1+PIE2,ZT, c5)
bbox("Hekal_Lintel","limestone", XL+WO,Y1-PIE2,ZB+HDOOR_H, -XL-WO,Y1+PIE2,ZT, c5)
bbox("Hekal_Hoja_Izq","olive_wood", -HDOOR_W/2+0.3*CODO_IN,Y1+0.3*CODO_IN,ZB, -0.3*CODO_IN,Y1+0.3*CODO_IN+DL_T,ZB+HDOOR_H-0.3*CODO_IN, c5)
bbox("Hekal_Hoja_Der","olive_wood",  0.3*CODO_IN,Y1+0.3*CODO_IN,ZB, HDOOR_W/2-0.3*CODO_IN,Y1+0.3*CODO_IN+DL_T,ZB+HDOOR_H-0.3*CODO_IN, c5)

DDOOR_W=4*CODO_IN; DDOOR_H=10*CODO_IN
bbox("Debir_Hueco","shadow", -DDOOR_W/2,Y2-0.2,ZB, DDOOR_W/2,Y2+PIE2,ZB+DDOOR_H, c5)
bbox("Debir_Hoja_Izq","olive_wood", -DDOOR_W/2+0.3*CODO_IN,Y2+0.3*CODO_IN,ZB, -0.3*CODO_IN,Y2+0.3*CODO_IN+DL_T,ZB+DDOOR_H-0.3*CODO_IN, c5)
bbox("Debir_Hoja_Der","olive_wood",  0.3*CODO_IN,Y2+0.3*CODO_IN,ZB, DDOOR_W/2-0.3*CODO_IN,Y2+0.3*CODO_IN+DL_T,ZB+DDOOR_H-0.3*CODO_IN, c5)

# ─── SESIÓN 6 — Carros de bronce ─────────────────────────
c6 = make_coll("Carros_de_Bronce")

CART_L=4*CODO_IN; CART_H=3*CODO_IN; WHL_OVH=0.7*CODO_IN; WHL_H=1.5*CODO_IN
BASIN_L=3*CODO_IN; BASIN_H=1.2*CODO_IN
cart_ys=[Y1+n*CODO_IN for n in [6,18,30,42,54]]

for j,cy in enumerate(cart_ys):
    n=str(j+1)
    for side,cx in [("E",460.0),("O",-460.0)]:
        bbox(f"Carro_{side}{n}_Cuerpo","bronze",
             cx-CART_L/2, cy-CART_L/2, ZB,
             cx+CART_L/2, cy+CART_L/2, ZB+CART_H, c6)
        bbox(f"Carro_{side}{n}_Ruedas","bronze",
             cx-CART_L/2-WHL_OVH, cy-CART_L/2, ZB,
             cx+CART_L/2+WHL_OVH, cy+CART_L/2, ZB+WHL_H, c6)
        bbox(f"Carro_{side}{n}_Palangana","bronze",
             cx-BASIN_L/2, cy-BASIN_L/2, ZB+CART_H,
             cx+BASIN_L/2, cy+BASIN_L/2, ZB+CART_H+BASIN_H, c6)

bbox("Torre_Escalera","limestone2", -XL,Y1,ZB, -XL+3*CODO_IN,Y1+3*CODO_IN,ZB+15*CODO_IN, c6)

# ══════════════════════════════════════════════════════════
# ILUMINACIÓN
# ══════════════════════════════════════════════════════════
scene = bpy.context.scene
world = bpy.data.worlds.new("World")
scene.world = world
world.use_nodes = True
bg = world.node_tree.nodes["Background"]
bg.inputs["Color"].default_value = (0.60, 0.72, 0.90, 1.0)
bg.inputs["Strength"].default_value = 2.0   # cielo brillante = mucho fill

# Sol principal desde el frente-derecha (ilumina fachada Y=0 y lado X+)
bpy.ops.object.light_add(type='SUN', location=(0, 0, 0))
sun = bpy.context.active_object
sun.data.energy = 6.0
sun.data.angle = math.radians(3)
# Apunta desde X+, Y-, Z+ (frente-derecha-alto) → ilumina la fachada frontal
sun.rotation_euler = Euler((math.radians(55), 0, math.radians(40)), 'XYZ')

# Luz de relleno cenital (suaviza sombras en la toma aérea)
bpy.ops.object.light_add(type='AREA', location=(0, 16, 40))
fill = bpy.context.active_object
fill.data.energy = 2000
fill.data.size = 50
fill.data.color = (0.9, 0.85, 0.75)  # luz cálida

# Luz de relleno este — ilumina las paredes laterales del edificio
bpy.ops.object.light_add(type='AREA', location=(28, 16, 9))
east_fill = bpy.context.active_object
east_fill.data.energy = 1400
east_fill.data.size = 35
east_fill.data.color = (0.92, 0.94, 1.0)  # ligeramente fría (cielo)

# ══════════════════════════════════════════════════════════
# RENDER
# ══════════════════════════════════════════════════════════
scene.render.engine = 'CYCLES'
scene.cycles.samples = 256
scene.cycles.use_denoising = True
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.image_settings.file_format = 'PNG'

def add_camera(name, loc, look_at, fov_deg=40):
    bpy.ops.object.camera_add(location=loc)
    cam_obj = bpy.context.active_object
    cam_obj.name = name
    cam = cam_obj.data
    cam.lens_unit = 'FOV'
    cam.angle = math.radians(fov_deg)
    direction = Vector(look_at) - Vector(loc)
    rot_quat = direction.to_track_quat('-Z', 'Y')
    cam_obj.rotation_euler = rot_quat.to_euler()
    return cam_obj

# Medidas clave en metros  (modelo: X±4.6m, Y 0-32m, Z 0-16m)
W_m  = 724.4 * IN    # 18.4m — mitad del ancho del atrio (muro exterior)
L_m  = Y3   * IN    # 32.2m — largo total del templo
H_m  = ZT   * IN    # 16.1m — altura total del templo
MX   = 0            # centro X
MY   = (Y3/2) * IN  # 16.1m — centro Y (profundidad)
MZ   = (ZT/2) * IN  # 8.0m  — mitad de altura
MCX_m = MCX  * IN   #  8.3m — centro X del Mar de Bronce
MCY_m = MCY  * IN   # 16.1m — centro Y del Mar de Bronce
ZB_m  = ZB   * IN   #  2.3m — altura de la plataforma

CAMERAS = [
    # Vista exterior SE — fachada + lado derecho del templo
    ("render_exterior_SE",
     (W_m*2.2, -L_m*0.5, H_m*2.0),
     (MX, MY*0.35, H_m*0.4),
     45),
    # Vista aérea cenital
    ("render_aerea",
     (MX, MY, H_m*4.5),
     (MX, MY, 0),
     55),
    # Fachada frontal — Ulam + pilastras + columnas
    ("render_fachada",
     (MX, -L_m*0.7, H_m*0.6),
     (MX, MY*0.15, H_m*0.35),
     42),
    # Mar de Bronce — desde el E mirando O, Mar en primer plano, Hekal de fondo
    ("render_atrio_mar_bronce",
     (MCX_m + 6.0, MCY_m - 1.0, ZB_m + 7.0),
     (MCX_m + CODO, MCY_m + 3.0, ZB_m + 2.0),
     50),
    # Lateral este — perfil escalonado de la Yatsía, cámara perpendicular al muro E
    ("render_lateral_yatsia",
     (13.0, MY*0.6, 6.5),
     (5.5, MY*0.65, 5.0),
     52),
]

# ══════════════════════════════════════════════════════════
# RENDERIZAR
# ══════════════════════════════════════════════════════════
print(f"\n{'='*50}")
print(f"Templo de Salomón — Renderizando {len(CAMERAS)} vistas")
print(f"Salida: {OUT_DIR}")
print(f"{'='*50}\n")

for cam_name, loc, look_at, fov in CAMERAS:
    cam_obj = add_camera(cam_name, loc, look_at, fov)
    scene.camera = cam_obj
    out_path = os.path.join(OUT_DIR, f"{cam_name}.png")
    scene.render.filepath = out_path
    print(f"Renderizando: {cam_name}...")
    bpy.ops.render.render(write_still=True)
    print(f"  -> Guardado: {out_path}")

print(f"\nListo! {len(CAMERAS)} renders en {OUT_DIR}")
