import React from 'react';
import { Book, Download, FileText, BookOpen, GraduationCap, Bookmark } from 'lucide-react';
import content from '../data/content.json';

const Biblioteca = () => {
    const baseUrl = import.meta.env.BASE_URL;

    // Datos de cada sección
    const documentosPropios = content.biblioteca?.documentos || [];
    const bibliotecaConsulta = content.biblioteca?.consulta || [];
    const cuadernoTeologico = content.biblioteca?.cuaderno || [];
    const ebooks = content.biblioteca?.ebooks || [];

    // Componente para renderizar una sección
    const SeccionBiblioteca = ({ id, icon: Icon, titulo, descripcion, items, children }) => (
        <section id={id} className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Título de sección */}
                <div className="flex items-center gap-3 mb-4">
                    <Icon size={28} className="text-sabiduria-gold" />
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-sabiduria-navy">
                        {titulo}
                    </h2>
                </div>

                {/* Descripción */}
                {descripcion && (
                    <p className="text-sabiduria-gray leading-relaxed max-w-3xl mb-10">
                        {descripcion}
                    </p>
                )}

                {/* Contenido */}
                {children}
            </div>
        </section>
    );

    // Componente placeholder para secciones vacías
    const PlaceholderVacio = ({ mensaje }) => (
        <div className="text-center py-12 text-sabiduria-gray border border-dashed border-sabiduria-gray/20 rounded-sm">
            <p className="text-sm italic">{mensaje || "Próximamente se añadirá contenido."}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-sabiduria-bg">

            {/* ═══════════════════════════════════════════════════════════════════
          SECCIÓN 1: Introducción General
      ═══════════════════════════════════════════════════════════════════ */}
            <header className="relative py-16 md:py-24 overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${baseUrl}img/biblioteca-hero.jpg)`,
                    }}
                />
                {/* Overlay suave cálido */}
                <div className="absolute inset-0 bg-sabiduria-bg/55" />

                {/* Contenido */}
                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-sabiduria-navy mb-6">
                        Biblioteca
                    </h1>
                    <p className="text-xl text-sabiduria-gold font-serif italic mb-8">
                        Lecturas para la fe cristiana
                    </p>
                    <p className="text-sabiduria-gray leading-relaxed max-w-2xl mx-auto">
                        Esta biblioteca reúne lecturas seleccionadas para acompañar la fe cristiana:
                        documentos formativos, libros de estudio y materiales para la reflexión bíblica.
                        Cada recurso ha sido elegido con cuidado, buscando claridad, profundidad y edificación,
                        y procurando que la lectura conduzca a una comprensión más fiel de las Escrituras.
                    </p>
                </div>
            </header>

            {/* ═══════════════════════════════════════════════════════════════════
          SECCIÓN 2: Documentos de Sabiduría para el Corazón
      ═══════════════════════════════════════════════════════════════════ */}
            <SeccionBiblioteca
                id="documentos"
                icon={FileText}
                titulo="Documentos de Sabiduría para el Corazón"
                descripcion="En esta sección se reúnen documentos producidos o editados especialmente para Sabiduría para el Corazón. Incluye estudios extensos, ediciones cuidadas y materiales pensados para una lectura atenta y formativa, ofrecidos como parte del trabajo pastoral y educativo del sitio."
            >
                {documentosPropios.length > 0 ? (
                    <div className="space-y-12">
                        {documentosPropios.map((doc) => (
                            <article
                                key={doc.id}
                                className="bg-white border border-sabiduria-gray/10 rounded-sm overflow-hidden"
                            >
                                <div className="p-8 md:p-12">
                                    {/* Categoría */}
                                    <span className="text-sabiduria-gold uppercase tracking-widest text-xs font-semibold">
                                        {doc.categoria}
                                    </span>

                                    {/* Título */}
                                    <h3 className="text-2xl md:text-3xl font-serif text-sabiduria-navy mt-3 mb-2">
                                        {doc.titulo}
                                    </h3>

                                    {/* Subtítulo */}
                                    {doc.subtitulo && (
                                        <p className="text-lg text-sabiduria-gray/70 font-serif italic mb-6">
                                            {doc.subtitulo}
                                        </p>
                                    )}

                                    {/* Descripción pastoral */}
                                    <p className="text-sabiduria-gray leading-relaxed text-justify max-w-3xl mb-8">
                                        {doc.descripcion}
                                    </p>

                                    {/* Botones de acción */}
                                    <div className="flex flex-wrap gap-4">
                                        <a
                                            href={`${baseUrl}${doc.pdfUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-sabiduria-navy text-white font-medium rounded-sm hover:bg-sabiduria-navy/90 transition-colors"
                                        >
                                            <BookOpen size={18} />
                                            Ver documento
                                        </a>
                                        <a
                                            href={`${baseUrl}${doc.pdfUrl}`}
                                            download
                                            className="inline-flex items-center gap-2 px-6 py-3 border border-sabiduria-navy text-sabiduria-navy font-medium rounded-sm hover:bg-sabiduria-navy/5 transition-colors"
                                        >
                                            <Download size={18} />
                                            Descargar PDF
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}

                        {/* Nota contemplativa */}
                        <div className="text-center pt-4">
                            <p className="text-sabiduria-gray/60 text-sm italic max-w-xl mx-auto">
                                Estos documentos se ofrecen en su formato original para preservar
                                fielmente el diseño, las imágenes y la experiencia de lectura contemplativa.
                            </p>
                        </div>
                    </div>
                ) : (
                    <PlaceholderVacio />
                )}
            </SeccionBiblioteca>

            {/* Separador */}
            <div className="max-w-6xl mx-auto px-4">
                <hr className="border-sabiduria-gray/10" />
            </div>

            {/* ═══════════════════════════════════════════════════════════════════
          SECCIÓN 3: Biblioteca de Consulta
      ═══════════════════════════════════════════════════════════════════ */}
            <section
                id="consulta"
                className="py-16 px-4 relative"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
                }}
            >
                <div className="max-w-6xl mx-auto">
                    {/* Encabezado de sección */}
                    <div className="flex items-center gap-3 mb-4">
                        <BookOpen size={28} className="text-sabiduria-gold" />
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-sabiduria-navy">
                            Biblioteca de Consulta
                        </h2>
                    </div>
                    <p className="text-sabiduria-gray leading-relaxed max-w-3xl mb-10">
                        La Biblioteca de Consulta ofrece una selección curada de libros recomendados para el estudio serio de las Escrituras, la teología cristiana y la vida de fe. No busca reemplazar la lectura de los libros ni ofrecer descargas, sino orientar al lector, aportar criterio y acompañar el estudio con discernimiento pastoral.
                    </p>

                    {bibliotecaConsulta.length > 0 ? (
                        <div className="space-y-0">
                            {/* Categorías con fondos alternados */}
                            {bibliotecaConsulta.map((seccion, seccionIndex) => (
                                <div
                                    key={seccion.id}
                                    className={`py-10 px-6 md:px-10 -mx-4 md:-mx-6 ${seccionIndex % 2 === 0
                                        ? 'bg-white'
                                        : 'bg-[#F5F0E8]'
                                        }`}
                                >
                                    {/* Título de categoría con línea vertical */}
                                    <div className="flex items-center gap-4 mb-8 pl-4 border-l-[3px] border-sabiduria-gold">

                                        <h3 className="text-xl md:text-2xl font-serif text-sabiduria-navy">
                                            {seccion.categoria}
                                        </h3>
                                    </div>

                                    {/* Grid de libros */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {seccion.libros.map((libro, index) => (
                                            <div
                                                key={index}
                                                className={`group border border-sabiduria-gray/10 rounded-sm p-5 hover:border-sabiduria-gold/30 transition-all duration-300 cursor-default ${seccionIndex % 2 === 0
                                                    ? 'bg-sabiduria-bg/30'
                                                    : 'bg-white'
                                                    }`}
                                            >
                                                {/* Contenido visible siempre */}
                                                <div className="flex items-start gap-3">
                                                    <Bookmark size={18} className="text-sabiduria-gold flex-shrink-0 mt-1" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-sabiduria-navy leading-tight">
                                                            {libro.titulo}
                                                        </p>
                                                        <p className="text-sm text-sabiduria-gray/70 italic mt-1">
                                                            {libro.autor}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Frase revelada al hover */}
                                                {libro.frase && (
                                                    <div className="mt-3 pt-3 border-t border-sabiduria-gray/10 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-24 transition-all duration-500 ease-out">
                                                        <p className="text-sm text-sabiduria-gray leading-relaxed">
                                                            {libro.frase}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* Nota editorial */}
                            <div className="bg-white border-l-4 border-sabiduria-gold/50 p-6 mt-6 mx-0">
                                <p className="text-sabiduria-gray text-sm leading-relaxed">
                                    <strong className="text-sabiduria-navy">Nota editorial:</strong> La Biblioteca de Consulta presenta una selección representativa de obras recomendadas. Otros autores y libros forman parte de la biblioteca de estudio del sitio y serán presentados en secciones complementarias.
                                </p>
                            </div>

                            {/* Botón hacia landing page */}
                            <div className="text-center mt-16 mb-6">
                                <a
                                    href="/biblioteca/consulta"
                                    className="inline-flex items-center gap-3 px-8 py-4 border-2 border-sabiduria-gold/60 text-sabiduria-gold rounded-md hover:bg-[#F5F0E8] hover:border-sabiduria-gold transition-all duration-500 ease-out group"
                                >
                                    <span className="text-lg">📚</span>
                                    <span className="font-serif text-lg tracking-wide">Ver la Biblioteca Completa</span>
                                </a>
                            </div>
                        </div>
                    ) : (
                        <PlaceholderVacio />
                    )}
                </div>
            </section>

            {/* Separador */}
            <div className="max-w-6xl mx-auto px-4">
                <hr className="border-sabiduria-gray/10" />
            </div>

            {/* ═══════════════════════════════════════════════════════════════════
          SECCIÓN 4: Cuaderno Teológico de Estudio
      ═══════════════════════════════════════════════════════════════════ */}
            <SeccionBiblioteca
                id="cuaderno"
                icon={GraduationCap}
                titulo="Cuaderno Teológico de Estudio"
                descripcion="Algunos materiales de estudio se trabajan en un cuaderno teológico de consulta, preparado con fines educativos y formativos. Este cuaderno reúne notas, síntesis, comparaciones y estudios elaborados a partir de diversas fuentes, con el propósito de ayudar al lector a comprender mejor los grandes temas de la fe cristiana. No ofrece acceso directo a las obras originales ni las reemplaza, sino que acompaña el proceso de estudio de manera guiada."
            >
                {cuadernoTeologico.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Items se renderizarán aquí */}
                    </div>
                ) : (
                    <PlaceholderVacio />
                )}
            </SeccionBiblioteca>

            {/* Separador */}
            <div className="max-w-6xl mx-auto px-4">
                <hr className="border-sabiduria-gray/10" />
            </div>

            {/* ═══════════════════════════════════════════════════════════════════
          SECCIÓN 5: Ebooks Disponibles para Descargar
      ═══════════════════════════════════════════════════════════════════ */}
            <SeccionBiblioteca
                id="ebooks"
                icon={Book}
                titulo="Ebooks Disponibles para Descargar"
                descripcion="A continuación se ofrecen ebooks seleccionados para lectura y estudio personal. Todos los materiales disponibles en esta sección se encuentran en dominio público, cuentan con autorización expresa o son producción propia de Sabiduría para el Corazón."
            >
                {ebooks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ebooks.map((ebook) => (
                            <article
                                key={ebook.id}
                                className="bg-white border border-sabiduria-gray/10 rounded-sm overflow-hidden group hover:shadow-lg transition-shadow duration-300"
                            >
                                {/* Imagen de portada */}
                                <div className="aspect-[3/4] overflow-hidden bg-sabiduria-bg">
                                    <img
                                        src={`${baseUrl}${ebook.imagenUrl}`}
                                        alt={`Portada de ${ebook.titulo}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Contenido */}
                                <div className="p-6">
                                    {/* Categoría */}
                                    <span className="text-sabiduria-gold uppercase tracking-widest text-xs font-semibold">
                                        {ebook.categoria}
                                    </span>

                                    {/* Título */}
                                    <h3 className="text-xl font-serif text-sabiduria-navy mt-2 mb-1 leading-tight">
                                        {ebook.titulo}
                                    </h3>

                                    {/* Autor */}
                                    {ebook.autor && (
                                        <p className="text-sm text-sabiduria-gray/70 italic mb-4">
                                            {ebook.autor}
                                        </p>
                                    )}

                                    {/* Descripción */}
                                    <p className="text-sabiduria-gray text-sm leading-relaxed mb-6 line-clamp-4">
                                        {ebook.descripcion}
                                    </p>

                                    {/* Botón de descarga */}
                                    <a
                                        href={`${baseUrl}${ebook.pdfUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 bg-sabiduria-navy text-white text-sm font-medium rounded-sm hover:bg-sabiduria-navy/90 transition-colors"
                                    >
                                        <Download size={16} />
                                        Descargar PDF
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <PlaceholderVacio />
                )}
            </SeccionBiblioteca>

            {/* ═══════════════════════════════════════════════════════════════════
          Nota final
      ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-8 px-4 border-t border-sabiduria-gray/10">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-sabiduria-gray text-sm italic">
                        Todos los materiales se ofrecen en formato PDF para lectura y descarga gratuita.
                        Esta biblioteca se irá ampliando de manera progresiva.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Biblioteca;
