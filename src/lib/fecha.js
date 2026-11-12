/* Fechas de publicación del contenido (`date` en los JSON: "2026-09-05").
 *
 * `new Date('2026-09-05')` se interpreta como medianoche en UTC, y al
 * formatearla en Argentina (UTC−3) cae en el día anterior: el sitio entero
 * mostraba cada texto con un día menos. Acá una fecha sin hora se arma como
 * fecha LOCAL, así el día que se ve es el que está escrito en el JSON.
 * Una fecha con hora (ISO completo) se respeta tal cual.
 */
export function aFecha(valor) {
  if (!valor) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(valor).trim());
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(valor);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatearFecha(valor, opciones) {
  const d = aFecha(valor);
  return d ? d.toLocaleDateString('es-ES', opciones) : '';
}
