-- Tablas para Sabiduría para el Corazón

-- 1. Artículos (Metadata y links)
CREATE TABLE public.articulos (
    id SERIAL PRIMARY KEY,
    category TEXT,
    title TEXT NOT NULL,
    excerpt TEXT,
    date DATE,
    slug TEXT UNIQUE NOT NULL,
    pdf_url TEXT,
    image TEXT,
    content TEXT, -- Para el contenido largo si viene de textos.articulos
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Ensayos
CREATE TABLE public.ensayos (
    id SERIAL PRIMARY KEY,
    category TEXT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    author TEXT,
    date DATE,
    excerpt TEXT,
    content TEXT,
    biblical_references JSONB,
    pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Lecturas Diarias
CREATE TABLE public.lecturas_diarias (
    id SERIAL PRIMARY KEY,
    verse TEXT NOT NULL,
    reference TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Productos / Librería
CREATE TABLE public.productos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT,
    category TEXT,
    price DECIMAL,
    currency TEXT DEFAULT 'USD',
    description TEXT,
    image TEXT,
    slug TEXT UNIQUE,
    checkout_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    bestseller BOOLEAN DEFAULT FALSE,
    stock INTEGER,
    format TEXT,
    pages INTEGER,
    publisher TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Estudios Bíblicos
CREATE TABLE public.estudios_biblicos (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    meta_description TEXT,
    intro_text TEXT,
    youtube_id TEXT,
    author TEXT,
    video_duration TEXT,
    timestamps JSONB,
    sections JSONB,
    reflection TEXT,
    estudios_relacionados JSONB, -- Array de slugs
    cta_text TEXT,
    cta_link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Teología Básica (Knowledge base)
CREATE TABLE public.teologia_basica (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT,
    description TEXT,
    content JSONB, -- Estructura completa del archivo json individual
    order_index INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Configuración Global (Hero, Social, etc.)
CREATE TABLE public.site_config (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security) - Por ahora permitimos lectura pública
ALTER TABLE public.articulos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ensayos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lecturas_diarias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estudios_biblicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teologia_basica ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura para anon
CREATE POLICY "Allow public read" ON public.articulos FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.ensayos FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.lecturas_diarias FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.productos FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.estudios_biblicos FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.teologia_basica FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.site_config FOR SELECT USING (true);
