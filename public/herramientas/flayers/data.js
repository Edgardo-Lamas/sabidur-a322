/* =====================================================================
   data.js — Catálogo inicial: versículos (RVR1960) y fondos cósmicos.
   Todo es editable/ampliable por el usuario; esto es solo la semilla.
   ===================================================================== */

window.SEED_VERSES = [
  { text: "Los cielos cuentan la gloria de Dios, y el firmamento anuncia la obra de sus manos.", ref: "Salmos 19:1" },
  { text: "En el principio creó Dios los cielos y la tierra.", ref: "Génesis 1:1" },
  { text: "Cuando veo tus cielos, obra de tus dedos, la luna y las estrellas que tú formaste, digo: ¿Qué es el hombre, para que tengas de él memoria?", ref: "Salmos 8:3-4" },
  { text: "Él cuenta el número de las estrellas; a todas ellas llama por sus nombres.", ref: "Salmos 147:4" },
  { text: "Levantad en alto vuestros ojos, y mirad quién creó estas cosas; él saca y cuenta su ejército; a todas llama por sus nombres.", ref: "Isaías 40:26" },
  { text: "Por la palabra de Jehová fueron hechos los cielos, y todo el ejército de ellos por el aliento de su boca.", ref: "Salmos 33:6" },
  { text: "Él extiende el norte sobre vacío, cuelga la tierra sobre nada.", ref: "Job 26:7" },
  { text: "¡Oh Jehová, Señor nuestro, cuán glorioso es tu nombre en toda la tierra!", ref: "Salmos 8:1" },
  { text: "Porque en él fueron creadas todas las cosas, las que hay en los cielos y las que hay en la tierra, visibles e invisibles.", ref: "Colosenses 1:16" },
  { text: "Digno eres, Señor, de recibir la gloria y la honra y el poder; porque tú creaste todas las cosas.", ref: "Apocalipsis 4:11" }
];

/* Los fondos se definen como presets procedurales en backgrounds.js.
   Aquí solo declaramos el orden y los nombres visibles del catálogo. */
window.SEED_BACKGROUNDS = [
  { id: "nebula-violeta",  name: "Nebulosa Violeta" },
  { id: "vialactea",       name: "Vía Láctea" },
  { id: "aurora",          name: "Aurora Celeste" },
  { id: "galaxia",         name: "Galaxia Espiral" },
  { id: "nebula-zafiro",   name: "Nebulosa Zafiro" },
  { id: "nebula-dorada",   name: "Nebulosa Dorada" },
  { id: "meteoros",        name: "Lluvia de Estrellas" },
  { id: "planeta",         name: "Mundos Lejanos" },
  { id: "amanecer",        name: "Amanecer Cósmico" },
  { id: "nebula-esmeralda",name: "Nebulosa Esmeralda" }
];

/* Estilos de animación de la tipografía (cada flayer puede ser distinto). */
window.ANIM_STYLES = [
  { id: "fundido",    name: "Fundido" },
  { id: "desenfoque", name: "Desenfoque" },
  { id: "ascenso",    name: "Ascenso" },
  { id: "escala",     name: "Escala" },
  { id: "deslizar",   name: "Deslizar" },
  { id: "resplandor", name: "Resplandor" }
];

/* Formatos de salida (proporción) para distintas redes. */
window.ASPECTS = [
  { id: "9-16", name: "9:16", label: "Historias", w: 1080, h: 1920 },
  { id: "4-5",  name: "4:5",  label: "Feed",      w: 1080, h: 1350 },
  { id: "1-1",  name: "1:1",  label: "Cuadrado",  w: 1080, h: 1080 }
];

/* Color del texto del versículo. */
window.TEXT_COLORS = [
  { id: "marfil", name: "Marfil", ink: "#F6F3EA" },
  { id: "dorado", name: "Dorado", ink: "#F0DBA8" },
  { id: "blanco", name: "Blanco", ink: "#FFFFFF" }
];
