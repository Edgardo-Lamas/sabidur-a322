-- 1. Habilitar la extensión pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Crear tabla para fragmentos de documentos (para RAG)
CREATE TABLE IF NOT EXISTS public.document_sections (
    id BIGSERIAL PRIMARY KEY,
    document_id INT REFERENCES public.articulos(id) ON DELETE CASCADE,
    ensayo_id INT REFERENCES public.ensayos(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    metadata JSONB,
    embedding VECTOR(1536) -- Tamaño estándar para OpenAI embeddings (text-embedding-3-small/ada-002)
);

-- 3. Habilitar RLS
ALTER TABLE public.document_sections ENABLE ROW LEVEL SECURITY;

-- 4. Política de lectura pública
CREATE POLICY "Allow public read access" ON public.document_sections
    FOR SELECT USING (true);

-- 5. Función para búsqueda semántica (similarity search)
-- Esta función será llamada desde n8n or el backend
CREATE OR REPLACE FUNCTION match_document_sections (
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id BIGINT,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    ds.id,
    ds.content,
    ds.metadata,
    1 - (ds.embedding <=> query_embedding) AS similarity
  FROM document_sections ds
  WHERE 1 - (ds.embedding <=> query_embedding) > match_threshold
  ORDER BY ds.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
