import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

async function indexContent() {
    console.log('--- Iniciando Preparación de Indexación RAG ---');

    // 1. Obtener artículos
    const { data: articulos } = await supabase.from('articulos').select('id, title, content');

    // 2. Obtener ensayos
    const { data: ensayos } = await supabase.from('ensayos').select('id, title, content');

    console.log(`Procesando ${articulos?.length || 0} artículos y ${ensayos?.length || 0} ensayos...`);

    // NOTA: Para generar embeddings reales necesitamos una API Key de OpenAI o similar.
    // Por ahora, este script estructura los datos. En n8n se hará la generación real.

    console.log('Sugerencia técnico: Los fragmentos deben ser de ~500-1000 caracteres con solapamiento.');

    // Este script es un blueprint. La lógica de fragmentación fina se puede mover a n8n
    // para aprovechar sus nodos nativos de AI.

    console.log('--- Estructura lista para n8n ---');
}

// indexContent();
