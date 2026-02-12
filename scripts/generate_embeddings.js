import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// --- Configuración ---
const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const CHUNK_SIZE = 800;       // caracteres por fragmento
const CHUNK_OVERLAP = 150;    // solapamiento entre fragmentos
const EMBEDDING_MODEL = 'text-embedding-3-small'; // 1536 dimensiones
const BATCH_SIZE = 20;        // embeddings por lote (evitar rate limits)

// --- Utilidades ---

/**
 * Divide texto largo en fragmentos con solapamiento
 */
function chunkText(text, chunkSize = CHUNK_SIZE, overlap = CHUNK_OVERLAP) {
    if (!text || text.trim().length === 0) return [];

    const cleanText = text
        .replace(/<[^>]*>/g, '')     // remover HTML
        .replace(/\s+/g, ' ')        // normalizar espacios
        .trim();

    if (cleanText.length <= chunkSize) {
        return [cleanText];
    }

    const chunks = [];
    let start = 0;

    while (start < cleanText.length) {
        let end = start + chunkSize;

        // Intentar cortar en un punto natural (., !, ?, \n)
        if (end < cleanText.length) {
            const lastPeriod = cleanText.lastIndexOf('.', end);
            const lastNewline = cleanText.lastIndexOf('\n', end);
            const breakPoint = Math.max(lastPeriod, lastNewline);
            if (breakPoint > start + chunkSize * 0.5) {
                end = breakPoint + 1;
            }
        }

        chunks.push(cleanText.slice(start, end).trim());
        start = end - overlap;
    }

    return chunks.filter(c => c.length > 50); // ignorar fragmentos muy cortos
}

/**
 * Extrae texto plano del contenido JSONB de teología básica
 */
function extractTeologiaText(jsonContent) {
    if (!jsonContent) return '';

    let text = '';

    if (typeof jsonContent === 'string') return jsonContent;

    // El contenido puede tener diferentes estructuras
    if (jsonContent.titulo) text += jsonContent.titulo + '. ';
    if (jsonContent.introduccion) text += jsonContent.introduccion + ' ';

    // Secciones
    if (Array.isArray(jsonContent.secciones)) {
        for (const sec of jsonContent.secciones) {
            if (sec.titulo) text += sec.titulo + '. ';
            if (sec.contenido) text += sec.contenido + ' ';
            if (sec.texto) text += sec.texto + ' ';
            if (Array.isArray(sec.puntos)) {
                text += sec.puntos.join('. ') + ' ';
            }
            if (Array.isArray(sec.subsecciones)) {
                for (const sub of sec.subsecciones) {
                    if (sub.titulo) text += sub.titulo + '. ';
                    if (sub.contenido) text += sub.contenido + ' ';
                    if (sub.texto) text += sub.texto + ' ';
                }
            }
        }
    }

    // Conclusión
    if (jsonContent.conclusion) text += jsonContent.conclusion + ' ';

    // Reflexión
    if (jsonContent.reflexion) text += jsonContent.reflexion + ' ';

    return text.trim();
}

/**
 * Genera embeddings en lotes
 */
async function generateEmbeddings(texts) {
    const results = [];

    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
        const batch = texts.slice(i, i + BATCH_SIZE);
        console.log(`  Generando embeddings ${i + 1}-${i + batch.length} de ${texts.length}...`);

        const response = await openai.embeddings.create({
            model: EMBEDDING_MODEL,
            input: batch
        });

        results.push(...response.data.map(d => d.embedding));

        // Pausa para no exceder rate limits
        if (i + BATCH_SIZE < texts.length) {
            await new Promise(r => setTimeout(r, 500));
        }
    }

    return results;
}

// --- Proceso principal ---
async function main() {
    console.log('=== Generación de Embeddings para RAG ===\n');

    // Verificar conexiones
    if (!process.env.OPENAI_API_KEY) {
        console.error('❌ OPENAI_API_KEY no está en .env');
        process.exit(1);
    }

    // Limpiar tabla existente
    console.log('🗑️  Limpiando tabla document_sections...');
    const { error: deleteError } = await supabase.from('document_sections').delete().gte('id', 0);
    if (deleteError) {
        console.error('Error limpiando tabla:', deleteError.message);
        console.log('Asegurate de haber ejecutado setup_rag.sql en Supabase primero.');
        process.exit(1);
    }

    const allSections = []; // { content, metadata }

    // 1. Artículos
    console.log('\n📄 Procesando artículos...');
    const { data: articulos, error: artErr } = await supabase
        .from('articulos')
        .select('id, title, content, category, slug');

    if (artErr) {
        console.error('Error obteniendo artículos:', artErr.message);
    } else {
        let artCount = 0;
        for (const art of articulos || []) {
            const text = art.content || art.title;
            const chunks = chunkText(text);
            for (const chunk of chunks) {
                allSections.push({
                    content: chunk,
                    metadata: {
                        source: 'articulo',
                        title: art.title,
                        document_id: art.id,
                        slug: art.slug,
                        category: art.category
                    },
                    document_id: art.id,
                    ensayo_id: null
                });
                artCount++;
            }
        }
        console.log(`  → ${articulos?.length || 0} artículos → ${artCount} fragmentos`);
    }

    // 2. Ensayos
    console.log('\n📝 Procesando ensayos...');
    const { data: ensayos, error: ensErr } = await supabase
        .from('ensayos')
        .select('id, title, content, category, slug, author');

    if (ensErr) {
        console.error('Error obteniendo ensayos:', ensErr.message);
    } else {
        let ensCount = 0;
        for (const ens of ensayos || []) {
            const text = ens.content || ens.title;
            const chunks = chunkText(text);
            for (const chunk of chunks) {
                allSections.push({
                    content: chunk,
                    metadata: {
                        source: 'ensayo',
                        title: ens.title,
                        ensayo_id: ens.id,
                        slug: ens.slug,
                        category: ens.category,
                        author: ens.author
                    },
                    document_id: null,
                    ensayo_id: ens.id
                });
                ensCount++;
            }
        }
        console.log(`  → ${ensayos?.length || 0} ensayos → ${ensCount} fragmentos`);
    }

    // 3. Teología Básica
    console.log('\n📖 Procesando teología básica...');
    const { data: teologia, error: teoErr } = await supabase
        .from('teologia_basica')
        .select('id, title, content, slug, category, description');

    if (teoErr) {
        console.error('Error obteniendo teología:', teoErr.message);
    } else {
        let teoCount = 0;
        for (const teo of teologia || []) {
            const text = extractTeologiaText(teo.content) || teo.description || teo.title;
            const chunks = chunkText(text);
            for (const chunk of chunks) {
                allSections.push({
                    content: chunk,
                    metadata: {
                        source: 'teologia_basica',
                        title: teo.title,
                        slug: teo.slug,
                        category: teo.category
                    },
                    document_id: null,
                    ensayo_id: null
                });
                teoCount++;
            }
        }
        console.log(`  → ${teologia?.length || 0} capítulos → ${teoCount} fragmentos`);
    }

    // 4. Estudios Bíblicos (secciones)
    console.log('\n🎓 Procesando estudios bíblicos...');
    const { data: estudios, error: estErr } = await supabase
        .from('estudios_biblicos')
        .select('id, title, intro_text, sections, reflection, slug');

    if (estErr) {
        console.error('Error obteniendo estudios:', estErr.message);
    } else {
        let estCount = 0;
        for (const est of estudios || []) {
            let text = est.intro_text || '';
            if (Array.isArray(est.sections)) {
                for (const sec of est.sections) {
                    if (sec.title) text += ' ' + sec.title;
                    if (sec.content) text += ' ' + sec.content;
                    if (sec.text) text += ' ' + sec.text;
                }
            }
            if (est.reflection) text += ' ' + est.reflection;

            const chunks = chunkText(text || est.title);
            for (const chunk of chunks) {
                allSections.push({
                    content: chunk,
                    metadata: {
                        source: 'estudio_biblico',
                        title: est.title,
                        slug: est.slug
                    },
                    document_id: null,
                    ensayo_id: null
                });
                estCount++;
            }
        }
        console.log(`  → ${estudios?.length || 0} estudios → ${estCount} fragmentos`);
    }

    console.log(`\n📊 Total: ${allSections.length} fragmentos para indexar`);

    if (allSections.length === 0) {
        console.log('⚠️  No hay contenido para indexar. Verifica que las tablas tengan datos.');
        return;
    }

    // Generar embeddings
    console.log('\n🧠 Generando embeddings con OpenAI...');
    const texts = allSections.map(s => s.content);
    const embeddings = await generateEmbeddings(texts);

    // Insertar en Supabase
    console.log('\n💾 Insertando en document_sections...');
    let inserted = 0;

    for (let i = 0; i < allSections.length; i += BATCH_SIZE) {
        const batch = allSections.slice(i, i + BATCH_SIZE).map((section, idx) => ({
            content: section.content,
            metadata: section.metadata,
            document_id: section.document_id,
            ensayo_id: section.ensayo_id,
            embedding: JSON.stringify(embeddings[i + idx])
        }));

        const { error: insertError } = await supabase
            .from('document_sections')
            .insert(batch);

        if (insertError) {
            console.error(`Error insertando lote ${i}:`, insertError.message);
        } else {
            inserted += batch.length;
        }
    }

    console.log(`\n✅ Indexación completada: ${inserted}/${allSections.length} fragmentos insertados`);

    // Verificación
    const { count } = await supabase
        .from('document_sections')
        .select('*', { count: 'exact', head: true });

    console.log(`📊 Total registros en document_sections: ${count}`);
    console.log('\n=== Proceso finalizado ===');
}

main().catch(err => {
    console.error('Error fatal:', err);
    process.exit(1);
});
