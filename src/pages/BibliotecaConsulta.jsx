import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Book, BookOpen, Search, Filter, ArrowLeft, Bookmark, User, GraduationCap } from 'lucide-react';
import SEO from '../components/SEO';

/**
 * Datos completos del catálogo de libros organizados por pasillos
 */
const catalogoLibros = [
    // PASILLO 1: Fundamentos de la Fe
    {
        id: 1,
        titulo: "Teología Sistemática",
        autor: "Louis Berkhof",
        pasillo: "Fundamentos de la Fe",
        nivel: "Avanzado",
        resena: "Obra clásica para comprender de forma ordenada las grandes doctrinas de la fe cristiana."
    },
    {
        id: 2,
        titulo: "Dogmática Cristiana",
        autor: "Herman Bavinck",
        pasillo: "Fundamentos de la Fe",
        nivel: "Avanzado",
        resena: "Referencia profunda y reflexiva de la teología reformada en diálogo con la historia."
    },
    {
        id: 3,
        titulo: "Teología Básica",
        autor: "Charles Ryrie",
        pasillo: "Fundamentos de la Fe",
        nivel: "Básico",
        resena: "Introducción clara y accesible a los principales temas de la teología cristiana."
    },
    {
        id: 4,
        titulo: "Teología Sistemática",
        autor: "Wayne Grudem",
        pasillo: "Fundamentos de la Fe",
        nivel: "Intermedio",
        resena: "Manual contemporáneo ampliamente utilizado para el estudio ordenado de la doctrina bíblica."
    },
    {
        id: 5,
        titulo: "Hacia el conocimiento de Dios",
        autor: "J. I. Packer",
        pasillo: "Fundamentos de la Fe",
        nivel: "Básico",
        resena: "Una invitación a conocer a Dios no solo con la mente, sino también con el corazón."
    },

    // PASILLO 2: Comentarios y Estudios Bíblicos
    {
        id: 6,
        titulo: "Comentario Bíblico",
        autor: "Matthew Henry",
        pasillo: "Comentarios y Estudios Bíblicos",
        nivel: "Intermedio",
        resena: "Clásico devocional y exegético que acompaña la lectura reflexiva de toda la Escritura."
    },
    {
        id: 7,
        titulo: "Comentario al Nuevo Testamento",
        autor: "William MacDonald",
        pasillo: "Comentarios y Estudios Bíblicos",
        nivel: "Básico",
        resena: "Comentario claro y pastoral, útil tanto para estudio personal como para enseñanza."
    },
    {
        id: 8,
        titulo: "Comentario al Nuevo Testamento",
        autor: "William Barclay",
        pasillo: "Comentarios y Estudios Bíblicos",
        nivel: "Intermedio",
        resena: "Exposición accesible con riqueza histórica y cultural del mundo del Nuevo Testamento."
    },
    {
        id: 9,
        titulo: "El Tesoro de David",
        autor: "Charles Spurgeon",
        pasillo: "Comentarios y Estudios Bíblicos",
        nivel: "Intermedio",
        resena: "Meditaciones profundas sobre los Salmos desde una espiritualidad viva y reverente."
    },
    {
        id: 10,
        titulo: "Comentarios y estudios bíblicos",
        autor: "John Stott",
        pasillo: "Comentarios y Estudios Bíblicos",
        nivel: "Intermedio",
        resena: "Exposición bíblica equilibrada, fiel al texto y sensible al contexto contemporáneo."
    },

    // PASILLO 3: Vida Cristiana y Discipulado
    {
        id: 11,
        titulo: "Mero Cristianismo",
        autor: "C. S. Lewis",
        pasillo: "Vida Cristiana y Discipulado",
        nivel: "Básico",
        resena: "Defensa razonada de la fe cristiana, escrita con claridad y profundidad intelectual."
    },
    {
        id: 12,
        titulo: "El conocimiento del Dios Santo",
        autor: "A. W. Tozer",
        pasillo: "Vida Cristiana y Discipulado",
        nivel: "Intermedio",
        resena: "Llamado reverente a redescubrir la santidad y grandeza de Dios."
    },
    {
        id: 13,
        titulo: "Esperando en Dios",
        autor: "Andrew Murray",
        pasillo: "Vida Cristiana y Discipulado",
        nivel: "Básico",
        resena: "Guía espiritual para cultivar la paciencia, la oración y la dependencia del Señor."
    },
    {
        id: 14,
        titulo: "Sed de Dios",
        autor: "John Piper",
        pasillo: "Vida Cristiana y Discipulado",
        nivel: "Intermedio",
        resena: "Invitación apasionada a buscar la satisfacción suprema en la gloria de Dios."
    },
    {
        id: 15,
        titulo: "Cómo escuchar la voz de Dios",
        autor: "Charles Stanley",
        pasillo: "Vida Cristiana y Discipulado",
        nivel: "Básico",
        resena: "Orientación práctica para discernir la guía del Señor en la vida diaria."
    },

    // PASILLO 4: Historia de la Iglesia y Biografías
    {
        id: 16,
        titulo: "Guerras de los Judíos",
        autor: "Flavio Josefo",
        pasillo: "Historia de la Iglesia y Biografías",
        nivel: "Avanzado",
        resena: "Testimonio histórico clave para comprender el contexto del mundo bíblico."
    },
    {
        id: 17,
        titulo: "Historia del Cristianismo",
        autor: "Justo L. González",
        pasillo: "Historia de la Iglesia y Biografías",
        nivel: "Intermedio",
        resena: "Recorrido panorámico por veinte siglos de historia de la iglesia cristiana."
    },
    {
        id: 18,
        titulo: "El Libro de los Mártires",
        autor: "John Foxe",
        pasillo: "Historia de la Iglesia y Biografías",
        nivel: "Intermedio",
        resena: "Relatos que preservan la memoria del testimonio fiel de la iglesia a lo largo de los siglos."
    },
    {
        id: 19,
        titulo: "Lutero: Biografía",
        autor: "Roland Bainton",
        pasillo: "Historia de la Iglesia y Biografías",
        nivel: "Intermedio",
        resena: "Vida y pensamiento del reformador que cambió la historia de la iglesia."
    },
    {
        id: 20,
        titulo: "Spurgeon: Biografía",
        autor: "Arnold Dallimore",
        pasillo: "Historia de la Iglesia y Biografías",
        nivel: "Intermedio",
        resena: "La vida del príncipe de los predicadores, modelo de pasión y fidelidad pastoral."
    },

    // PASILLO 5: Herramientas de Estudio y Apologética
    {
        id: 21,
        titulo: "Hermenéutica Bíblica",
        autor: "Bernard Ramm",
        pasillo: "Herramientas de Estudio y Apologética",
        nivel: "Avanzado",
        resena: "Fundamentos para interpretar correctamente las Escrituras con rigor y reverencia."
    },
    {
        id: 22,
        titulo: "Más que un carpintero",
        autor: "Josh McDowell",
        pasillo: "Herramientas de Estudio y Apologética",
        nivel: "Básico",
        resena: "Defensa accesible de la fe cristiana, ideal para responder preguntas fundamentales."
    },
    {
        id: 23,
        titulo: "Cómo nos llegó la Biblia",
        autor: "Neil Lightfoot",
        pasillo: "Herramientas de Estudio y Apologética",
        nivel: "Básico",
        resena: "Introducción a la historia del texto bíblico, su transmisión y preservación."
    },

    // PASILLO 6: Liderazgo, Ministerio y Misiones
    {
        id: 24,
        titulo: "Liderazgo cristiano",
        autor: "John Maxwell",
        pasillo: "Liderazgo, Ministerio y Misiones",
        nivel: "Básico",
        resena: "Principios bíblicos aplicados al desarrollo del liderazgo en la iglesia."
    },
    {
        id: 25,
        titulo: "El arte de aconsejar bíblicamente",
        autor: "John MacArthur",
        pasillo: "Liderazgo, Ministerio y Misiones",
        nivel: "Intermedio",
        resena: "Guía pastoral para el cuidado de almas fundamentado en las Escrituras."
    },
    {
        id: 26,
        titulo: "La predicación bíblica",
        autor: "Haddon Robinson",
        pasillo: "Liderazgo, Ministerio y Misiones",
        nivel: "Avanzado",
        resena: "Manual clásico de homilética para una predicación fiel y efectiva."
    },
];

/**
 * Configuración de los pasillos temáticos
 */
const pasillos = [
    {
        id: 1,
        nombre: "Fundamentos de la Fe",
        subtitulo: "Teología Sistemática y Doctrina",
        descripcion: "Obras que ayudan a comprender de manera ordenada las grandes doctrinas de la fe cristiana, ofreciendo estructura y claridad para quienes desean profundizar en el conocimiento de Dios."
    },
    {
        id: 2,
        nombre: "Comentarios y Estudios Bíblicos",
        subtitulo: "Exégesis y exposición de las Escrituras",
        descripcion: "Herramientas valiosas para el estudio contextual y exegético de la Biblia, que permiten comprender mejor el trasfondo histórico, cultural y lingüístico de cada pasaje."
    },
    {
        id: 3,
        nombre: "Vida Cristiana y Discipulado",
        subtitulo: "Crecimiento espiritual y formación del carácter",
        descripcion: "Lecturas orientadas al crecimiento espiritual, la formación del carácter cristiano y la vida devocional que nutren el alma y acompañan el camino de la fe."
    },
    {
        id: 4,
        nombre: "Historia de la Iglesia y Biografías",
        subtitulo: "El testimonio de quienes nos precedieron",
        descripcion: "Obras que nos conectan con el testimonio histórico de la fe cristiana, fortaleciendo nuestra identidad como pueblo de Dios a través de las luchas, fidelidad y legado de quienes nos precedieron."
    },
    {
        id: 5,
        nombre: "Herramientas de Estudio y Apologética",
        subtitulo: "Interpretación bíblica y defensa de la fe",
        descripcion: "Recursos esenciales para interpretar correctamente las Escrituras y responder con fundamento las preguntas que surgen en el estudio bíblico y la vida de fe."
    },
    {
        id: 6,
        nombre: "Liderazgo, Ministerio y Misiones",
        subtitulo: "Servicio pastoral y formación para el ministerio",
        descripcion: "Obras que orientan a quienes han sido llamados a pastorear, enseñar o servir en alguna área del ministerio, con fundamento bíblico y formación continua."
    }
];

/**
 * Componente de ficha de libro
 */
const FichaLibro = ({ libro }) => {
    const getNivelColor = (nivel) => {
        switch (nivel) {
            case 'Básico': return 'bg-green-100 text-green-700';
            case 'Intermedio': return 'bg-amber-100 text-amber-700';
            case 'Avanzado': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="bg-white border border-sabiduria-gray/10 rounded-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-3 mb-4">
                <Book size={20} className="text-sabiduria-gold flex-shrink-0 mt-1" />
                <div className="flex-1">
                    <h4 className="font-serif text-lg text-sabiduria-navy font-medium leading-tight">
                        {libro.titulo}
                    </h4>
                    <p className="text-sm text-sabiduria-gray/70 italic mt-1">
                        {libro.autor}
                    </p>
                </div>
            </div>

            <div className="mb-4">
                <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getNivelColor(libro.nivel)}`}>
                    {libro.nivel}
                </span>
            </div>

            <p className="text-sm text-sabiduria-gray leading-relaxed mb-4">
                {libro.resena}
            </p>

            <button
                className="text-sm text-sabiduria-gold hover:text-sabiduria-navy transition-colors inline-flex items-center gap-2"
                onClick={() => { }}
            >
                <User size={14} />
                Más sobre el autor
            </button>
        </div>
    );
};

/**
 * Componente de pasillo temático
 */
const PasilloTematico = ({ pasillo, libros, index }) => {
    const esImpar = index % 2 !== 0;

    return (
        <section className={`py-12 px-4 ${esImpar ? 'bg-[#F5F0E8]' : 'bg-white'}`}>
            <div className="max-w-6xl mx-auto">
                {/* Título del pasillo con línea vertical */}
                <div className="flex items-start gap-4 mb-8 pl-4 border-l-[3px] border-sabiduria-gold">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-serif text-sabiduria-navy mb-1">
                            {pasillo.nombre}
                        </h3>
                        <p className="text-sabiduria-gold italic text-sm">
                            {pasillo.subtitulo}
                        </p>
                    </div>
                </div>

                <p className="text-sabiduria-gray leading-relaxed max-w-3xl mb-10">
                    {pasillo.descripcion}
                </p>

                {/* Grid de fichas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {libros.map((libro) => (
                        <FichaLibro key={libro.id} libro={libro} />
                    ))}
                </div>
            </div>
        </section>
    );
};

/**
 * Componente principal de la landing page
 */
const BibliotecaConsulta = () => {
    const [busqueda, setBusqueda] = useState('');
    const [filtroPasillo, setFiltroPasillo] = useState('');
    const [filtroNivel, setFiltroNivel] = useState('');

    // Filtrar libros para el catálogo
    const librosFiltrados = useMemo(() => {
        return catalogoLibros.filter(libro => {
            const coincideBusqueda = busqueda === '' ||
                libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                libro.autor.toLowerCase().includes(busqueda.toLowerCase());
            const coincidePasillo = filtroPasillo === '' || libro.pasillo === filtroPasillo;
            const coincideNivel = filtroNivel === '' || libro.nivel === filtroNivel;
            return coincideBusqueda && coincidePasillo && coincideNivel;
        });
    }, [busqueda, filtroPasillo, filtroNivel]);

    return (
        <div className="min-h-screen bg-sabiduria-bg">
            <SEO
                title="Biblioteca de Consulta | Catálogo Completo"
                description="Una selección curada de libros fundamentales para el estudio bíblico, teológico y la vida cristiana."
            />

            {/* ════════════════════════════════════════════════════════════════
                ENCABEZADO
            ════════════════════════════════════════════════════════════════ */}
            <header
                className="py-20 px-4 relative"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
                }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    {/* Botón volver */}
                    <Link
                        to="/biblioteca"
                        className="inline-flex items-center gap-2 text-sabiduria-gray hover:text-sabiduria-gold transition-colors mb-8"
                    >
                        <ArrowLeft size={18} />
                        Volver a Biblioteca
                    </Link>

                    <div className="flex items-center justify-center gap-3 mb-6">
                        <BookOpen size={40} className="text-sabiduria-gold" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-sabiduria-navy mb-6">
                        Biblioteca de Consulta
                    </h1>

                    <p className="text-lg text-sabiduria-gray leading-relaxed max-w-2xl mx-auto">
                        Una selección curada de libros fundamentales para el estudio bíblico, teológico y la vida cristiana, recomendados como apoyo al trabajo pastoral y formativo de Sabiduría para el Corazón.
                    </p>
                </div>
            </header>

            {/* ════════════════════════════════════════════════════════════════
                PASILLOS TEMÁTICOS
            ════════════════════════════════════════════════════════════════ */}
            {pasillos.map((pasillo, index) => {
                const librosDelPasillo = catalogoLibros.filter(
                    libro => libro.pasillo === pasillo.nombre
                );
                return (
                    <PasilloTematico
                        key={pasillo.id}
                        pasillo={pasillo}
                        libros={librosDelPasillo}
                        index={index}
                    />
                );
            })}

            {/* ════════════════════════════════════════════════════════════════
                CATÁLOGO COMPLETO
            ════════════════════════════════════════════════════════════════ */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif text-sabiduria-navy mb-4">
                            Catálogo Completo de Obras Recomendadas
                        </h2>
                        <p className="text-sabiduria-gray max-w-2xl mx-auto">
                            Consulte el listado completo de libros que forman parte de nuestra biblioteca de referencia.
                        </p>
                    </div>

                    {/* Buscador y filtros */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="relative flex-1">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-sabiduria-gray/50" />
                            <input
                                type="text"
                                placeholder="Buscar por título o autor..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-sabiduria-gray/20 rounded-sm focus:outline-none focus:border-sabiduria-gold transition-colors"
                            />
                        </div>
                        <select
                            value={filtroPasillo}
                            onChange={(e) => setFiltroPasillo(e.target.value)}
                            className="px-4 py-3 border border-sabiduria-gray/20 rounded-sm focus:outline-none focus:border-sabiduria-gold transition-colors bg-white"
                        >
                            <option value="">Todas las áreas</option>
                            {pasillos.map(p => (
                                <option key={p.id} value={p.nombre}>{p.nombre}</option>
                            ))}
                        </select>
                        <select
                            value={filtroNivel}
                            onChange={(e) => setFiltroNivel(e.target.value)}
                            className="px-4 py-3 border border-sabiduria-gray/20 rounded-sm focus:outline-none focus:border-sabiduria-gold transition-colors bg-white"
                        >
                            <option value="">Todos los niveles</option>
                            <option value="Básico">Básico</option>
                            <option value="Intermedio">Intermedio</option>
                            <option value="Avanzado">Avanzado</option>
                        </select>
                    </div>

                    {/* Tabla del catálogo */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b-2 border-sabiduria-gold/30">
                                    <th className="text-left py-4 px-4 font-serif text-sabiduria-navy">Título</th>
                                    <th className="text-left py-4 px-4 font-serif text-sabiduria-navy">Autor</th>
                                    <th className="text-left py-4 px-4 font-serif text-sabiduria-navy hidden md:table-cell">Área Temática</th>
                                    <th className="text-left py-4 px-4 font-serif text-sabiduria-navy">Nivel</th>
                                </tr>
                            </thead>
                            <tbody>
                                {librosFiltrados.map((libro, index) => (
                                    <tr
                                        key={libro.id}
                                        className={`border-b border-sabiduria-gray/10 hover:bg-sabiduria-bg/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-sabiduria-bg/20'
                                            }`}
                                    >
                                        <td className="py-4 px-4">
                                            <span className="font-medium text-sabiduria-navy">{libro.titulo}</span>
                                        </td>
                                        <td className="py-4 px-4 text-sabiduria-gray italic">{libro.autor}</td>
                                        <td className="py-4 px-4 text-sabiduria-gray text-sm hidden md:table-cell">{libro.pasillo}</td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-block px-2 py-1 text-xs rounded ${libro.nivel === 'Básico' ? 'bg-green-100 text-green-700' :
                                                libro.nivel === 'Intermedio' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                {libro.nivel}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p className="text-center text-sabiduria-gray/60 text-sm mt-6">
                        Mostrando {librosFiltrados.length} de {catalogoLibros.length} obras
                    </p>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════════
                NOTA EDITORIAL
            ════════════════════════════════════════════════════════════════ */}
            <section className="py-12 px-4 bg-[#F5F0E8]">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="border-l-4 border-sabiduria-gold/50 pl-6 text-left">
                        <p className="text-sabiduria-gray leading-relaxed italic">
                            Esta biblioteca no reemplaza la lectura de las Escrituras. Los libros aquí recomendados acompañan, orientan y enriquecen el estudio bíblico y la formación cristiana.
                        </p>
                    </div>
                </div>
            </section>

            {/* Botón volver */}
            <div className="py-12 text-center bg-white">
                <Link
                    to="/biblioteca"
                    className="inline-flex items-center gap-2 text-sabiduria-gold hover:text-sabiduria-navy transition-colors font-medium"
                >
                    <ArrowLeft size={18} />
                    Volver a Biblioteca
                </Link>
            </div>
        </div>
    );
};

export default BibliotecaConsulta;
