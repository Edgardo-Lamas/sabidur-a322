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
          SECCIÓN 3: Biblioteca de Consulta
      ═══════════════════════════════════════════════════════════════════ */}
            <SeccionBiblioteca
                id="consulta"
                icon={BookOpen}
                titulo="Biblioteca de Consulta"
                descripcion="No todos los libros de consulta pueden ofrecerse públicamente para su descarga. Por ello, esta sección presenta una selección de obras recomendadas junto con orientaciones, descripciones y guías de uso, pensadas especialmente para estudiantes de las Escrituras. El objetivo no es reemplazar la lectura de los libros, sino acompañarla con criterio, contexto y discernimiento."
            >
                {bibliotecaConsulta.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
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
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                        {/* Items se renderizarán aquí */}
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
