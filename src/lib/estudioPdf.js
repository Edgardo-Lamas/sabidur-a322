/* PDF del estudio con el Agente Spurgeon (18/11/2026).
 *
 * Se arma en el navegador con lo que Spurgeon YA contestó: no vuelve a llamar a
 * ningún modelo, así que no suma gasto. Va el recorrido completo, en orden, sin
 * resumen escrito por IA (decisión de Edgardo): un índice de las preguntas, cada
 * pregunta con su respuesta, y al final una síntesis armada sólo reacomodando
 * lo que ya está — versículos citados, lecturas del sitio y preguntas pendientes.
 *
 * jsPDF se carga recién cuando alguien toca el botón (import dinámico), para no
 * sumarle peso a cada página del sitio.
 */

const SITIO = 'https://sabiduriaparaelcorazon.com';
const NAVY = [26, 29, 35];
const ORO = [197, 160, 89];
const ORO_TEXTO = [122, 92, 30]; // el dorado que contrasta como texto sobre fondo claro
const CUERPO = [44, 62, 80];
const GRIS = [110, 110, 110];

// Las fuentes estándar del PDF sólo cubren el alfabeto latino (WinAnsi): una letra
// griega o hebrea saldría como basura, así que se quita.
const EXTRA_WINANSI = '€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ';
const limpiar = (t) => [...String(t ?? '')]
    .filter((c) => c.charCodeAt(0) <= 255 || EXTRA_WINANSI.includes(c))
    .join('')
    .replace(/[ \t]+/g, ' ')
    .trim();

// ── Referencias bíblicas citadas dentro del texto ──────────────────
const LIBROS = [
    'Génesis', 'Éxodo', 'Levítico', 'Números', 'Deuteronomio', 'Josué', 'Jueces', 'Rut',
    '1 Samuel', '2 Samuel', '1 Reyes', '2 Reyes', '1 Crónicas', '2 Crónicas', 'Esdras',
    'Nehemías', 'Ester', 'Job', 'Salmos', 'Salmo', 'Proverbios', 'Eclesiastés', 'Cantares',
    'Isaías', 'Jeremías', 'Lamentaciones', 'Ezequiel', 'Daniel', 'Oseas', 'Joel', 'Amós',
    'Abdías', 'Jonás', 'Miqueas', 'Nahúm', 'Habacuc', 'Sofonías', 'Hageo', 'Zacarías',
    'Malaquías', 'Mateo', 'Marcos', 'Lucas', 'Juan', 'Hechos', 'Romanos', '1 Corintios',
    '2 Corintios', 'Gálatas', 'Efesios', 'Filipenses', 'Colosenses', '1 Tesalonicenses',
    '2 Tesalonicenses', '1 Timoteo', '2 Timoteo', 'Tito', 'Filemón', 'Hebreos', 'Santiago',
    '1 Pedro', '2 Pedro', '1 Juan', '2 Juan', '3 Juan', 'Judas', 'Apocalipsis',
];
const RE_CITA = new RegExp(
    `(${[...LIBROS].sort((a, b) => b.length - a.length).join('|')})\\s+(\\d{1,3}):(\\d{1,3}(?:\\s?[-–]\\s?\\d{1,3})?(?:,\\s?\\d{1,3})*)`,
    'g',
);
const normalizarRef = (r) => r.replace(/\s+/g, ' ').replace(/\s?[-–]\s?/g, '-').replace(/,\s?/g, ', ').trim();

/** Las preguntas con su respuesta, en orden. Sólo respuestas reales de Spurgeon. */
export function paresDelEstudio(messages) {
    const pares = [];
    messages.forEach((m, i) => {
        if (m.role !== 'assistant' || !m.respuesta) return;
        const q = messages[i - 1];
        if (q?.role === 'user') pares.push({ pregunta: q.content, ...m });
    });
    return pares;
}

function sintesis(pares) {
    const versiculos = new Map(); // ref normalizada → { ref, texto }
    const agregar = (ref, texto) => {
        const k = normalizarRef(ref);
        const previo = versiculos.get(k);
        if (!previo) versiculos.set(k, { ref: k, texto: texto || '' });
        else if (texto && !previo.texto) previo.texto = texto;
    };
    const lecturas = new Map();
    for (const p of pares) {
        for (const m of String(p.content).matchAll(RE_CITA)) agregar(`${m[1]} ${m[2]}:${m[3]}`);
        if (p.verse?.reference) agregar(p.verse.reference, p.verse.text);
        for (const l of p.suggestedLinks || []) {
            if (!l?.url || l.url === '/donaciones' || lecturas.has(l.url)) continue;
            lecturas.set(l.url, { titulo: l.title, url: l.external ? l.url : `${SITIO}${l.url}` });
        }
    }
    const hechas = new Set(pares.map((p) => p.pregunta.trim().toLowerCase()));
    const ultima = pares[pares.length - 1];
    const pendientes = (ultima?.suggestedQuestions || []).filter((q) => !hechas.has(q.trim().toLowerCase()));
    // Los versículos en el orden de la Biblia, de Génesis a Apocalipsis. Una cita que
    // no se reconoce (una abreviatura, por ejemplo) va al final.
    const orden = (ref) => {
        const m = /^(.*?)\s+(\d+):(\d+)/.exec(ref);
        const libro = m ? LIBROS.indexOf(m[1] === 'Salmo' ? 'Salmos' : m[1]) : -1;
        return libro < 0 ? [999, 0, 0] : [libro, Number(m[2]), Number(m[3])];
    };
    const enOrden = [...versiculos.values()].sort((a, b) => {
        const x = orden(a.ref), y = orden(b.ref);
        return x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
    });
    return { versiculos: enOrden, lecturas: [...lecturas.values()], pendientes };
}

export async function descargarEstudioPdf(messages) {
    const pares = paresDelEstudio(messages);
    if (!pares.length) return;
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });

    const W = 210, H = 297, M = 20, ANCHO = W - 2 * M, PIE = H - 18;
    let y = M;

    const fuente = (familia, estilo, tam, color = CUERPO) => {
        doc.setFont(familia, estilo);
        doc.setFontSize(tam);
        doc.setTextColor(...color);
    };
    const nuevaPagina = () => { doc.addPage(); y = M; };
    const lugar = (alto) => { if (y + alto > PIE - 6) nuevaPagina(); };
    // Párrafo con salto de página automático, renglón por renglón.
    const parrafo = (texto, { tam = 11, inter = 1.45, x = M, ancho = ANCHO, familia = 'times', estilo = 'normal', color = CUERPO, despues = 3 } = {}) => {
        fuente(familia, estilo, tam, color);
        const alto = tam * 0.3528 * inter;
        const lineas = doc.splitTextToSize(limpiar(texto), ancho);
        lineas.forEach((l, i) => {
            lugar(alto);
            const ultima = i === lineas.length - 1;
            doc.text(l, x, y + alto * 0.75, ultima ? undefined : { align: 'justify', maxWidth: ancho });
            y += alto;
        });
        y += despues;
    };
    const rotulo = (texto) => {
        lugar(14);
        fuente('helvetica', 'bold', 8.5, ORO_TEXTO);
        doc.setCharSpace(0.6);
        doc.text(limpiar(texto).toUpperCase(), M, y + 4);
        doc.setCharSpace(0);
        y += 7;
    };
    const filete = () => {
        lugar(8);
        doc.setDrawColor(...ORO);
        doc.setLineWidth(0.3);
        doc.line(M, y + 2, M + 30, y + 2);
        y += 7;
    };

    // ── Portada del estudio ──
    // el logo del sitio, dibujado: SABIDURÍA en dorado con sus dos esquinas
    doc.setDrawColor(...ORO);
    doc.setLineWidth(0.5);
    doc.line(M, y, M + 7, y); doc.line(M, y, M, y + 5);
    fuente('times', 'bold', 22, ORO_TEXTO);
    doc.setCharSpace(1.2);
    doc.text('SABIDURÍA', M + 5, y + 9);
    doc.setCharSpace(0.5);
    fuente('times', 'normal', 9, ORO_TEXTO);
    doc.text('para el Corazón', M + 15, y + 14);
    doc.setCharSpace(0);
    doc.line(M + 50, y + 16, M + 57, y + 16); doc.line(M + 57, y + 11, M + 57, y + 16);
    y += 30;

    fuente('times', 'bold', 24, NAVY);
    doc.text('Estudio con el Agente Spurgeon', M, y);
    y += 8;
    const hoy = new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Argentina/Buenos_Aires' });
    fuente('helvetica', 'normal', 10, GRIS);
    doc.text(`${hoy} · ${pares.length} ${pares.length === 1 ? 'pregunta' : 'preguntas'}`, M, y);
    y += 8;
    parrafo('Las respuestas las redactó un asistente con inteligencia artificial a partir de los estudios del sitio. Acompañan el estudio personal y no reemplazan la guía pastoral.', { tam: 9, familia: 'helvetica', estilo: 'italic', color: GRIS, despues: 6 });

    rotulo('Preguntas de este estudio');
    pares.forEach((p, i) => parrafo(`${i + 1}.  ${p.pregunta}`, { tam: 11.5, despues: 1.2 }));
    y += 6;

    // ── Cada pregunta con su respuesta ──
    pares.forEach((p, i) => {
        lugar(40);
        filete();
        rotulo(`Pregunta ${i + 1}`);
        parrafo(p.pregunta, { tam: 15, familia: 'times', estilo: 'bold', color: NAVY, inter: 1.3, despues: 4 });
        parrafo(p.content, { despues: 4 });

        if (p.verse?.text) {
            fuente('times', 'italic', 11);
            const lineas = doc.splitTextToSize(limpiar(`«${p.verse.text}»`), ANCHO - 10);
            const alto = lineas.length * 11 * 0.3528 * 1.4 + 11;
            lugar(alto);
            doc.setFillColor(250, 246, 237);
            doc.rect(M, y, ANCHO, alto, 'F');
            doc.setFillColor(...ORO);
            doc.rect(M, y, 1.2, alto, 'F');
            let yy = y + 6;
            fuente('times', 'italic', 11, CUERPO);
            lineas.forEach((l) => { doc.text(l, M + 6, yy); yy += 11 * 0.3528 * 1.4; });
            fuente('helvetica', 'bold', 8.5, ORO_TEXTO);
            doc.text(`— ${limpiar(p.verse.reference).toUpperCase()}`, M + 6, yy + 1);
            y += alto + 5;
        }

        const lecturas = (p.suggestedLinks || []).filter((l) => l?.url && l.url !== '/donaciones');
        if (lecturas.length) {
            fuente('helvetica', 'bold', 8, GRIS);
            lugar(8);
            doc.text('LECTURAS SUGERIDAS', M, y + 3);
            y += 6;
            lecturas.forEach((l) => {
                lugar(6);
                const url = l.external ? l.url : `${SITIO}${l.url}`;
                fuente('helvetica', 'normal', 9.5, NAVY);
                doc.textWithLink(`• ${limpiar(l.title)}`, M + 2, y + 3, { url });
                y += 5;
            });
            y += 4;
        }
        y += 4;
    });

    // ── Síntesis: lo mismo, reacomodado ──
    const { versiculos, lecturas, pendientes } = sintesis(pares);
    nuevaPagina();
    fuente('times', 'bold', 20, NAVY);
    doc.text('Síntesis del estudio', M, y + 6);
    y += 12;
    parrafo('Todo lo que aparece en esta página sale de las respuestas anteriores.', { tam: 9, familia: 'helvetica', estilo: 'italic', color: GRIS, despues: 5 });

    if (versiculos.length) {
        rotulo('Versículos citados');
        versiculos.forEach((v) => {
            if (v.texto) {
                parrafo(v.ref, { tam: 11, familia: 'times', estilo: 'bold', color: NAVY, despues: 0.5 });
                parrafo(`«${v.texto}»`, { tam: 10.5, estilo: 'italic', x: M + 4, ancho: ANCHO - 4, despues: 3 });
            } else {
                parrafo(v.ref, { tam: 11, familia: 'times', estilo: 'bold', color: NAVY, despues: 2 });
            }
        });
        y += 4;
    }
    if (lecturas.length) {
        rotulo('Para seguir leyendo en el sitio');
        lecturas.forEach((l) => {
            lugar(11);
            fuente('helvetica', 'bold', 10, NAVY);
            doc.textWithLink(limpiar(l.titulo), M, y + 3.5, { url: l.url });
            fuente('helvetica', 'normal', 8.5, GRIS);
            doc.textWithLink(l.url.replace('https://', ''), M, y + 8, { url: l.url });
            y += 12;
        });
        y += 3;
    }
    if (pendientes.length) {
        rotulo('Preguntas para seguir otro día');
        pendientes.forEach((q) => parrafo(`•  ${q}`, { tam: 11, despues: 1.5 }));
        y += 4;
    }

    // ── El aporte, como invitación ──
    lugar(30);
    y += 4;
    doc.setDrawColor(...ORO);
    doc.setLineWidth(0.4);
    doc.rect(M, y, ANCHO, 24);
    fuente('times', 'bold', 12, NAVY);
    doc.text('¿Te sirvió este estudio?', M + 6, y + 8);
    fuente('helvetica', 'normal', 9.5, CUERPO);
    doc.text('Sabiduría para el Corazón se sostiene con aportes voluntarios. Si quieres ayudar:', M + 6, y + 14);
    fuente('helvetica', 'bold', 9.5, ORO_TEXTO);
    doc.textWithLink('sabiduriaparaelcorazon.com/donaciones', M + 6, y + 19.5, { url: `${SITIO}/donaciones` });

    // ── Pie de cada página ──
    const total = doc.getNumberOfPages();
    for (let n = 1; n <= total; n++) {
        doc.setPage(n);
        doc.setDrawColor(225, 225, 225);
        doc.setLineWidth(0.2);
        doc.line(M, PIE, W - M, PIE);
        fuente('helvetica', 'normal', 7.5, GRIS);
        doc.textWithLink('sabiduriaparaelcorazon.com', M, PIE + 5, { url: SITIO });
        doc.text('Este estudio se sostiene con aportes voluntarios', W / 2, PIE + 5, { align: 'center' });
        doc.text(`${n} / ${total}`, W - M, PIE + 5, { align: 'right' });
    }

    const dia = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' }).format(new Date());
    doc.save(`Estudio-Spurgeon-${dia}.pdf`);
}
