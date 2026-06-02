import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY no están definidos en el .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const contentPath = path.join(__dirname, '../src/data/content.json');
const textosPath = path.join(__dirname, '../src/data/textos.json');
const knowledgeDir = path.join(__dirname, '../src/data/knowledge');

async function migrate() {
    console.log('--- Iniciando Migración ---');

    const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    let textosData = { articulos: [], ensayos: [] };
    try {
        textosData = JSON.parse(fs.readFileSync(textosPath, 'utf8'));
    } catch (e) {
        console.warn('No se pudo leer textos.json, usando valores vacíos');
    }

    // 1. Artículos
    console.log('Migrando artículos...');
    const { articles } = content;
    const textosArticulos = textosData.articulos || [];

    const articulatedData = articles.map(art => {
        const detail = textosArticulos.find(t => t.slug === art.slug);
        return {
            category: art.category,
            title: art.title,
            excerpt: art.excerpt,
            date: art.date,
            slug: art.slug,
            pdf_url: art.pdfUrl || detail?.pdfUrl,
            image: art.image,
            content: detail?.content || null
        };
    });

    for (const item of articulatedData) {
        const { error } = await supabase.from('articulos').upsert(item, { onConflict: 'slug' });
        if (error) console.error(`Error en artículo ${item.slug}:`, error.message);
    }

    // 2. Ensayos
    console.log('Migrando ensayos...');
    const textosEnsayos = textosData.ensayos || [];

    for (const item of textosEnsayos) {
        const entry = {
            category: item.category,
            title: item.title,
            slug: item.slug,
            author: item.author,
            date: item.date,
            excerpt: item.excerpt,
            content: item.content,
            biblical_references: item.biblicalReferences,
            pdf_url: item.pdfUrl
        };
        const { error } = await supabase.from('ensayos').upsert(entry, { onConflict: 'slug' });
        if (error) console.error(`Error en ensayo ${item.slug}:`, error.message);
    }

    // 3. Lecturas Diarias
    console.log('Migrando lecturas diarias...');
    const { dailyReadings } = content;
    for (const item of dailyReadings) {
        const { error } = await supabase.from('lecturas_diarias').upsert({
            id: item.id,
            verse: item.verse,
            reference: item.reference
        });
        if (error) console.error(`Error en lectura ${item.id}:`, error.message);
    }

    // 4. Productos
    console.log('Migrando productos...');
    const products = content.products || [];
    for (const item of products) {
        const entry = {
            title: item.title,
            author: item.author,
            category: item.category,
            price: item.price,
            currency: item.currency,
            description: item.description,
            image: item.image,
            slug: item.slug,
            checkout_url: item.checkoutUrl,
            featured: item.featured,
            bestseller: item.bestseller,
            stock: (item.stock === true || item.stock === 'true') ? 1 : 0, // Handle boolean or string to match integer column
            format: item.format,
            pages: item.pages,
            publisher: item.publisher
        };
        const { error } = await supabase.from('productos').upsert(entry, { onConflict: 'slug' });
        if (error) console.error(`Error en producto ${item.slug}:`, error.message);
    }

    // 5. Estudios Bíblicos
    console.log('Migrando estudios bíblicos...');
    const estudios = content.estudios || [];
    for (const item of estudios) {
        const entry = {
            slug: item.slug,
            title: item.title,
            meta_description: item.metaDescription,
            intro_text: item.introText,
            youtube_id: item.youtubeId,
            author: item.author,
            video_duration: item.videoDuration,
            timestamps: item.timestamps,
            sections: item.sections,
            reflection: item.reflection,
            estudios_relacionados: item.estudiosRelacionados,
            cta_text: item.ctaText,
            cta_link: item.ctaLink
        };
        const { error } = await supabase.from('estudios_biblicos').upsert(entry, { onConflict: 'slug' });
        if (error) console.error(`Error en estudio ${item.slug}:`, error.message);
    }

    // 6. Teología Básica (Knowledge)
    console.log('Migrando teología básica...');
    let knowledgeIndex = { documentos_teologia_sistematica: [] };
    try {
        knowledgeIndex = JSON.parse(fs.readFileSync(path.join(knowledgeDir, 'index.json'), 'utf8'));
    } catch (e) {
        console.warn('No se pudo leer index.json de knowledge');
    }

    const capitulosTeologia = content.teologiaBasica?.capitulos || [];

    for (const cap of capitulosTeologia) {
        const fileName = knowledgeIndex.documentos_teologia_sistematica.find(d => d.tema === cap.titulo || d.id === cap.slug)?.archivo;
        let detailContent = null;
        if (fileName) {
            try {
                detailContent = JSON.parse(fs.readFileSync(path.join(knowledgeDir, fileName), 'utf8'));
            } catch (e) {
                console.warn(`No se pudo leer el archivo ${fileName} para el capítulo ${cap.slug}`);
            }
        }

        const entry = {
            slug: cap.slug,
            title: cap.titulo,
            category: 'Teología Básica',
            description: cap.descripcion,
            content: detailContent,
            order_index: cap.numero
        };
        const { error } = await supabase.from('teologia_basica').upsert(entry, { onConflict: 'slug' });
        if (error) console.error(`Error en teología ${cap.slug}:`, error.message);
    }

    // 7. Configuración Global
    console.log('Migrando configuración global...');
    const globalConfig = {
        hero: content.hero,
        social: content.social,
        heroGrid: content.heroGrid,
        heroVideos: content.heroVideos,
        featuredTopics: content.featuredTopics,
        productCategories: content.productCategories,
        bookstore: content.bookstore,
        dailyReadingConfig: content.dailyReadingConfig,
        storeConfig: content.storeConfig
    };

    for (const [key, value] of Object.entries(globalConfig)) {
        if (value) {
            const { error } = await supabase.from('site_config').upsert({
                key: key,
                value: value
            });
            if (error) console.error(`Error en config ${key}:`, error.message);
        }
    }

    console.log('--- Migración Finalizada ---');
}

migrate();
