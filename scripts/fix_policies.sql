-- Permitir inserción/actualización temporal para el rol anon (necesario para la migración inicial)

-- 1. Artículos
DROP POLICY IF EXISTS "Allow anon insert" ON public.articulos;
CREATE POLICY "Allow anon insert" ON public.articulos FOR ALL USING (true) WITH CHECK (true);

-- 2. Ensayos
DROP POLICY IF EXISTS "Allow anon insert" ON public.ensayos;
CREATE POLICY "Allow anon insert" ON public.ensayos FOR ALL USING (true) WITH CHECK (true);

-- 3. Lecturas Diarias
DROP POLICY IF EXISTS "Allow anon insert" ON public.lecturas_diarias;
CREATE POLICY "Allow anon insert" ON public.lecturas_diarias FOR ALL USING (true) WITH CHECK (true);

-- 4. Productos
DROP POLICY IF EXISTS "Allow anon insert" ON public.productos;
CREATE POLICY "Allow anon insert" ON public.productos FOR ALL USING (true) WITH CHECK (true);

-- 5. Estudios Bíblicos
DROP POLICY IF EXISTS "Allow anon insert" ON public.estudios_biblicos;
CREATE POLICY "Allow anon insert" ON public.estudios_biblicos FOR ALL USING (true) WITH CHECK (true);

-- 6. Teología Básica
DROP POLICY IF EXISTS "Allow anon insert" ON public.teologia_basica;
CREATE POLICY "Allow anon insert" ON public.teologia_basica FOR ALL USING (true) WITH CHECK (true);

-- 7. Configuración Global
DROP POLICY IF EXISTS "Allow anon insert" ON public.site_config;
CREATE POLICY "Allow anon insert" ON public.site_config FOR ALL USING (true) WITH CHECK (true);
