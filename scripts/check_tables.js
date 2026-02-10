import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

async function checkTables() {
    const tables = [
        'articulos',
        'ensayos',
        'lecturas_diarias',
        'productos',
        'estudios_biblicos',
        'teologia_basica',
        'site_config'
    ];

    console.log('--- Comprobando contenido de tablas en Supabase ---');

    for (const table of tables) {
        try {
            const { count, error } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });

            if (error) {
                console.log(`❌ Tabla "${table}": No encontrada o error (${error.message})`);
            } else {
                console.log(`✅ Tabla "${table}": Existe (${count === null ? '0' : count} filas)`);
            }
        } catch (e) {
            console.log(`❌ Tabla "${table}": Error inesperado (${e.message})`);
        }
    }
}

checkTables();
