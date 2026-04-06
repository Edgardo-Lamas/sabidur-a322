import { z } from 'zod';

// ── Artículo ──────────────────────────────────────────────────────────────────
export const ArticleSchema = z.object({
  id: z.union([z.string(), z.number()]),
  slug: z.string().min(1),
  title: z.string().min(1),
  category: z.string().optional(),
  image: z.string().optional(),
  excerpt: z.string().optional(),
  date: z.string().optional(),
  content: z.string().optional(),
  pdfUrl: z.string().optional(),
  relatedArticles: z.array(z.unknown()).optional(),
});

export const ArticlesArraySchema = z.array(ArticleSchema);

// ── Ensayo ────────────────────────────────────────────────────────────────────
export const EssaySchema = z.object({
  id: z.union([z.string(), z.number()]),
  slug: z.string().min(1),
  title: z.string().min(1),
  category: z.string().optional(),
  excerpt: z.string().optional(),
  date: z.string().optional(),
  content: z.string().optional(),
});

export const EssaysArraySchema = z.array(EssaySchema);

// ── Bosquejo ──────────────────────────────────────────────────────────────────
export const OutlineSchema = z.object({
  id: z.union([z.string(), z.number()]),
  slug: z.string().min(1),
  title: z.string().min(1),
  category: z.string().optional(),
  excerpt: z.string().optional(),
  date: z.string().optional(),
  content: z.string().optional(),
});

export const OutlinesArraySchema = z.array(OutlineSchema);

// ── Lectura diaria ────────────────────────────────────────────────────────────
export const DailyReadingSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string().min(1),
  date: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
});

export const DailyReadingsArraySchema = z.array(DailyReadingSchema);

// ── Validador de desarrollo ───────────────────────────────────────────────────
/**
 * Valida un array de datos contra un schema Zod solo en desarrollo.
 * Imprime advertencias en consola sin lanzar errores en producción.
 *
 * @param {z.ZodSchema} schema
 * @param {unknown} data
 * @param {string} label - nombre descriptivo para el log
 */
export function validateInDev(schema, data, label) {
  if (!import.meta.env.DEV) return;
  const result = schema.safeParse(data);
  if (!result.success) {
    console.warn(`[Schema:${label}] Datos inválidos:`, result.error.flatten());
  }
}
