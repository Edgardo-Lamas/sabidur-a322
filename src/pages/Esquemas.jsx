import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Info, HelpCircle, X, BookOpen, Layers } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

// Datos para el mapa conceptual de ejemplo: Ordo Salutis
const ORDO_SALUTIS_NODES = [
    {
        id: 'eleccion',
        label: '1. Elección',
        shortDesc: 'Decreto eterno de Dios para salvación.',
        title: 'La Elección Soberana',
        definition: 'El acto soberano, eterno e incondicional de Dios por el cual escoge en Cristo a personas específicas de entre la humanidad caída para concederles la salvación, no basado en méritos previstos sino en el puro afecto de Su voluntad.',
        verses: [
            { citation: 'Efesios 1:4-5', text: 'Según nos escogió en él antes de la fundación del mundo, para que fuésemos santos y sin mancha delante de él, en amor habiéndonos predestinado para ser adoptados hijos suyos por medio de Jesucristo, según el puro afecto de su voluntad.' },
            { citation: 'Romanos 9:11', text: 'Pues no habían aún nacido, ni habían hecho aún bien ni mal, para que el propósito de Dios conforme a la elección permaneciese, no por las obras sino por el que llama.' }
        ],
        reflection: 'La elección nos recuerda que nuestra salvación inicia y descansa enteramente en la gracia divina, no en nuestro propio esfuerzo, produciendo profunda humildad.'
    },
    {
        id: 'llamamiento',
        label: '2. Llamamiento',
        shortDesc: 'La convocación interna y externa de Dios.',
        title: 'El Llamamiento Eficaz',
        definition: 'La proclamación externa del evangelio acompañada por la obra interna, poderosa e irresistible del Espíritu Santo en el corazón de los elegidos, atrayéndolos eficazmente hacia la fe en Jesucristo.',
        verses: [
            { citation: 'Romanos 8:30', text: 'Y a los que predestinó, a éstos también llamó; y a los que llamó, a éstos también justificó; y a los que justificó, a éstos también glorificó.' },
            { citation: '1 Pedro 2:9', text: 'Mas vosotros sois linaje escogido, real sacerdocio, nación santa, pueblo adquirido por Dios, para que anunciéis las virtudes de aquel que os llamó de las tinieblas a su luz admirable.' }
        ],
        reflection: '¿Has escuchado la voz del Pastor llamándote por tu nombre a través del evangelio? Su llamado siempre nos saca de la oscuridad.'
    },
    {
        id: 'regeneracion',
        label: '3. Regeneración',
        shortDesc: 'El nuevo nacimiento espiritual.',
        title: 'La Regeneración (Nuevo Nacimiento)',
        definition: 'El acto instantáneo y sobrenatural de Dios mediante el cual imparte nueva vida espiritual al pecador espiritualmente muerto, transformando las inclinaciones fundamentales de su corazón y capacitándolo para responder con fe.',
        verses: [
            { citation: 'Juan 3:3', text: 'Respondió Jesús y le dijo: De cierto, de cierto te digo, que el que no naciere de nuevo, no puede ver el reino de Dios.' },
            { citation: 'Tito 3:5', text: 'Nos salvó, no por obras de justicia que nosotros hubiéramos hecho, sino por su misericordia, por el lavamiento de la regeneración y por la renovación en el Espíritu Santo.' }
        ],
        reflection: 'La regeneración precede a la fe: no creemos para nacer de nuevo; nacemos de nuevo para poder creer.'
    },
    {
        id: 'conversion',
        label: '4. Conversión',
        shortDesc: 'Arrepentimiento genuino y fe salvadora.',
        title: 'La Conversión',
        definition: 'La respuesta consciente y activa del pecador regenerado ante el llamado de Dios, que consta de dos partes inseparables: el arrepentimiento (volverse del pecado con dolor y aborrecimiento) y la fe (confiar únicamente en la persona y obra de Cristo).',
        verses: [
            { citation: 'Hechos 3:19', text: 'Así que, arrepentíos y convertíos, para que sean borrados vuestros pecados; para que vengan de la presencia del Señor tiempos de refrigerio.' },
            { citation: 'Efesios 2:8', text: 'Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios.' }
        ],
        reflection: 'La verdadera fe no es mero conocimiento intelectual, sino una entrega total y confiada al Salvador.'
    },
    {
        id: 'justificacion',
        label: '5. Justificación',
        shortDesc: 'La declaración legal de "justo".',
        title: 'La Justificación',
        definition: 'El acto judicial de Dios por el cual declara justo al pecador, perdonando todos sus pecados e imputándole la justicia perfecta de Cristo, recibida únicamente por medio de la fe.',
        verses: [
            { citation: 'Romanos 5:1', text: 'Justificados, pues, por la fe, tenemos paz para con Dios por medio de nuestro Señor Jesucristo.' },
            { citation: 'Romanos 3:24', text: 'Siendo justificados gratuitamente por su gracia, mediante la redención que es en Cristo Jesús.' }
        ],
        reflection: 'En la cruz, nuestra culpa fue cargada en Cristo, y su justicia nos fue otorgada. Dios nos mira como si nunca hubiésemos pecado.'
    },
    {
        id: 'adopcion',
        label: '6. Adopción',
        shortDesc: 'Recibidos en la familia de Dios.',
        title: 'La Adopción',
        definition: 'El acto de la gracia de Dios por el cual el creyente justificado es introducido formalmente en la familia celestial, recibiendo todos los privilegios, derechos y deberes de un hijo de Dios.',
        verses: [
            { citation: 'Juan 1:12', text: 'Mas a todos los que le recibieron, a los que creen en su nombre, les dio potestad de ser hechos hijos de Dios.' },
            { citation: 'Gálatas 4:5', text: 'Para que redimiese a los que estaban bajo la ley, a fin de que recibiésemos la adopción de hijos.' }
        ],
        reflection: 'Ahora somos herederos de Dios y coherederos con Cristo, pudiendo clamar con confianza: ¡Abba, Padre!'
    },
    {
        id: 'santificacion',
        label: '7. Santificación',
        shortDesc: 'El proceso de crecer a la semejanza de Cristo.',
        title: 'La Santificación',
        definition: 'La obra progresiva y cooperativa de Dios y el creyente por la cual este es liberado cada vez más del poder del pecado y conformado a la imagen de Jesucristo en todo su ser.',
        verses: [
            { citation: '1 Tesalonicenses 4:3', text: 'Pues la voluntad de Dios es vuestra santificación; que os apartéis de fornicación.' },
            { citation: 'Hebreos 12:14', text: 'Seguid la paz con todos, y la santidad, sin la cual nadie verá al Señor.' }
        ],
        reflection: 'Aunque la justificación es perfecta e instantánea, la santificación dura toda la vida y demanda disciplina y dependencia del Espíritu.'
    },
    {
        id: 'perseverancia',
        label: '8. Perseverancia',
        shortDesc: 'La preservación divina del creyente.',
        title: 'La Perseverancia de los Santos',
        definition: 'La doctrina de que todos los verdaderamente nacidos de nuevo son guardados y preservados por el poder de Dios, perseverando en la fe hasta el fin de sus vidas, de modo que ninguno se perderá.',
        verses: [
            { citation: 'Juan 10:28', text: 'Y yo les doy vida eterna; y no perecerán jamás, ni nadie las arrebatará de mi mano.' },
            { citation: 'Filipenses 1:6', text: 'Estando persuadido de esto, que el que comenzó en vosotros la buena obra, la perfeccionará hasta el día de Jesucristo.' }
        ],
        reflection: 'Nuestra seguridad no descansa en la fuerza de nuestro agarre a Dios, sino en la fuerza del inquebrantable agarre de Dios hacia nosotros.'
    },
    {
        id: 'glorificacion',
        label: '9. Glorificación',
        shortDesc: 'La consumación final en la eternidad.',
        title: 'La Glorificación',
        definition: 'La culminación final y perfecta del plan de salvación en la eternidad, en la cual el creyente es liberado por completo de la presencia del pecado y su cuerpo es resucitado y transformado a la semejanza del cuerpo glorioso de Cristo.',
        verses: [
            { citation: '1 Corintios 15:52', text: 'En un momento, en un abrir y cerrar de ojos, a la final trompeta; porque se tocará la trompeta, y los muertos serán resucitados incorruptibles, y nosotros seremos transformados.' },
            { citation: 'Filipenses 3:21', text: 'El cual transformará el cuerpo de la humillación nuestra, para que sea semejante al cuerpo de la gloria suya, por el poder con el cual puede también sujetar a sí mismo todas las cosas.' }
        ],
        reflection: 'La glorificación es la meta última del plan redentor: el fin absoluto del llanto, el pecado y la muerte física.'
    }
];

const Esquemas = () => {
    const [selectedTab, setSelectedTab] = useState('mapas');
    const [activeNode, setActiveNode] = useState(null);

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title="Esquemas y Recursos Visuales"
                description="Líneas de tiempo históricas, mapas conceptuales teológicos y recursos visuales estructurados para el estudio bíblico."
                url="/esquemas"
            />

            {/* Breadcrumbs */}
            <div className="max-w-6xl mx-auto px-4 pt-8">
                <Breadcrumbs
                    customItems={[
                        { label: 'Esquemas Visuales' }
                    ]}
                />
            </div>

            {/* Hero */}
            <header className="relative bg-sabiduria-navy text-white overflow-hidden py-16 md:py-24 mt-4">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A059' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }} />
                </div>

                <div className="relative max-w-6xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-sabiduria-gold/30 mb-6 bg-sabiduria-navy">
                        <Layers className="text-sabiduria-gold" size={28} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
                        Esquemas y Recursos Visuales
                    </h1>
                    <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
                        Herramientas gráficas y diagramas interactivos diseñados para estructurar y comprender de manera clara las verdades de la Escritura y la historia.
                    </p>
                </div>
            </header>

            {/* Tabs Selector */}
            <div className="max-w-6xl mx-auto px-4 pt-12">
                <div className="flex border-b border-sabiduria-gray/10">
                    <button
                        onClick={() => setSelectedTab('mapas')}
                        className={`flex items-center gap-2 px-6 py-4 font-heading font-semibold text-sm uppercase tracking-wider border-b-2 transition-all ${
                            selectedTab === 'mapas'
                                ? 'border-sabiduria-gold text-sabiduria-gold'
                                : 'border-transparent text-sabiduria-gray hover:text-sabiduria-navy'
                        }`}
                    >
                        <Layers size={18} />
                        Mapas Conceptuales
                    </button>
                    <button
                        onClick={() => setSelectedTab('cronologia')}
                        className={`flex items-center gap-2 px-6 py-4 font-heading font-semibold text-sm uppercase tracking-wider border-b-2 transition-all ${
                            selectedTab === 'cronologia'
                                ? 'border-sabiduria-gold text-sabiduria-gold'
                                : 'border-transparent text-sabiduria-gray hover:text-sabiduria-navy'
                        }`}
                    >
                        <Clock size={18} />
                        Líneas de Tiempo
                    </button>
                </div>
            </div>

            {/* Main Content Areas */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                {selectedTab === 'mapas' ? (
                    <div>
                        {/* Introducción a Mapas Conceptuales */}
                        <div className="mb-10 max-w-3xl">
                            <h2 className="text-2xl font-serif text-sabiduria-navy mb-3">
                                Diagramas Doctrinales Interactivos
                            </h2>
                            <p className="text-sabiduria-gray text-base leading-relaxed">
                                Explora conceptos teológicos clave de forma estructurada. Haz clic en cualquiera de los nodos del diagrama para abrir el panel con su definición, fundamentos bíblicos y reflexiones prácticas.
                            </p>
                        </div>

                        {/* Contenedor del Mapa Conceptual (Ordo Salutis) */}
                        <div className="bg-white border border-sabiduria-gray/10 rounded-sm p-6 md:p-10 shadow-sm relative overflow-hidden">
                            <div className="border-b border-sabiduria-gray/10 pb-4 mb-8 flex justify-between items-center">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-sabiduria-gold">
                                        Ejemplo de Esquema Interactivo
                                    </span>
                                    <h3 className="text-xl font-serif text-sabiduria-navy font-bold mt-1">
                                        Ordo Salutis (El Orden de la Salvación)
                                    </h3>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-sabiduria-gray/60 bg-sabiduria-bg px-2.5 py-1 rounded-full">
                                    <Info size={14} />
                                    <span>Haz clic en un nodo</span>
                                </div>
                            </div>

                            {/* Node Flow (Responsive Flex Grid with Connectors) */}
                            <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-y-8 gap-x-4 py-6">
                                {ORDO_SALUTIS_NODES.map((node, i) => (
                                    <React.Fragment key={node.id}>
                                        {/* Node Card */}
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setActiveNode(node)}
                                            className={`w-full sm:w-56 p-5 border text-left rounded-sm transition-all shadow-sm ${
                                                activeNode?.id === node.id
                                                    ? 'border-sabiduria-gold bg-sabiduria-navy text-white'
                                                    : 'border-sabiduria-gray/10 bg-sabiduria-bg/30 hover:border-sabiduria-gold/60 text-sabiduria-navy'
                                            }`}
                                        >
                                            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${
                                                activeNode?.id === node.id ? 'text-sabiduria-gold' : 'text-sabiduria-gold'
                                            }`}>
                                                Paso {i + 1}
                                            </span>
                                            <h4 className="font-serif font-bold text-base leading-snug mb-1">
                                                {node.label.split('. ')[1]}
                                            </h4>
                                            <p className={`text-xs line-clamp-2 leading-relaxed ${
                                                activeNode?.id === node.id ? 'text-white/60' : 'text-sabiduria-gray'
                                            }`}>
                                                {node.shortDesc}
                                            </p>
                                        </motion.button>

                                        {/* Connector Arrow (Hidden on last item, vertical on small screens, horizontal on large) */}
                                        {i < ORDO_SALUTIS_NODES.length - 1 && (
                                            <div className="flex items-center justify-center shrink-0 w-8 h-8 text-sabiduria-gold/40">
                                                <svg className="w-6 h-6 rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Info Box Footer */}
                            <div className="mt-8 bg-sabiduria-navy/5 p-4 border border-sabiduria-navy/10 rounded-sm text-center flex items-center justify-center gap-2">
                                <HelpCircle size={18} className="text-sabiduria-gold" />
                                <p className="text-sm text-sabiduria-navy/80">
                                    Estamos diseñando nuevos esquemas visuales (como <strong>Las 12 Tribus de Israel</strong>, la <strong>Genealogía Mesiánica</strong> y más). ¡Pronto podrás verlos aquí!
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        {/* Sección de Líneas de Tiempo */}
                        <div className="mb-10 max-w-3xl">
                            <h2 className="text-2xl font-serif text-sabiduria-navy mb-3">
                                Cronologías y Linajes Históricos
                            </h2>
                            <p className="text-sabiduria-gray text-base leading-relaxed">
                                Explora la providencia de Dios a través de las edades, analizando fechas, reinados y la genealogía bíblica de manera lineal y estructurada.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Card: El Hilo del Tiempo */}
                            <motion.article 
                                whileHover={{ y: -4 }}
                                className="bg-white border border-sabiduria-gray/10 rounded-sm overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="h-48 bg-sabiduria-navy flex items-center justify-center relative">
                                    <div className="absolute inset-0 opacity-5" style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z' fill='%23C5A059' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")`
                                    }} />
                                    <Clock size={64} className="text-sabiduria-gold opacity-80" />
                                </div>
                                <div className="p-6 flex-grow flex flex-col justify-between">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-sabiduria-gold block mb-2">
                                            Estudio Cronológico
                                        </span>
                                        <h3 className="text-xl font-serif text-sabiduria-navy font-bold mb-3">
                                            El Hilo del Tiempo
                                        </h3>
                                        <p className="text-sabiduria-gray text-sm leading-relaxed mb-6">
                                            Una investigación exhaustiva en tres partes sobre la cronología bíblica, los linajes patriarcales y cómo Dios gobierna la historia soberanamente.
                                        </p>
                                    </div>
                                    <Link
                                        to="/estudio/hilo-del-tiempo"
                                        className="inline-flex items-center gap-1.5 text-sabiduria-gold hover:text-sabiduria-navy font-semibold text-sm transition-colors mt-auto"
                                    >
                                        Ver línea de tiempo
                                        <span className="text-xs">→</span>
                                    </Link>
                                </div>
                            </motion.article>

                            {/* Card: Próximamente */}
                            <div className="bg-white/40 border border-dashed border-sabiduria-gray/20 rounded-sm p-8 flex flex-col items-center justify-center text-center">
                                <Clock size={40} className="text-sabiduria-gray/30 mb-4" />
                                <h3 className="text-lg font-serif text-sabiduria-navy/70 font-semibold mb-2">
                                    Nuevas Cronologías en Camino
                                    </h3>
                                <p className="text-sabiduria-gray/60 text-sm max-w-xs">
                                    Pronto se añadirán esquemas del exilio babilónico, la cronología del Nuevo Testamento y los reinados de Judá e Israel.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Sliding Drawer for Node Detail */}
            <AnimatePresence>
                {activeNode && (
                    <>
                        {/* Overlay backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveNode(null)}
                            className="fixed inset-0 bg-black z-50 cursor-pointer"
                        />

                        {/* Drawer body */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-full sm:w-[500px] bg-white z-50 shadow-2xl overflow-y-auto border-l border-sabiduria-gray/10 flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="p-6 bg-sabiduria-navy text-white flex justify-between items-center sticky top-0 z-10 border-b border-white/10">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-sabiduria-gold block mb-1">
                                        Esquema: Ordo Salutis
                                    </span>
                                    <h3 className="text-xl font-serif font-bold">
                                        {activeNode.title}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setActiveNode(null)}
                                    className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                                    aria-label="Cerrar panel"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Drawer Content */}
                            <div className="p-6 space-y-8 flex-grow">
                                {/* Definición */}
                                <section>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-sabiduria-gold mb-3 flex items-center gap-1.5">
                                        <Info size={14} />
                                        Definición Teológica
                                    </h4>
                                    <p className="text-sabiduria-navy text-base leading-relaxed text-justify">
                                        {activeNode.definition}
                                    </p>
                                </section>

                                {/* Fundamento Bíblico */}
                                <section className="bg-sabiduria-bg/40 p-5 rounded-sm border border-sabiduria-gray/10">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-sabiduria-gold mb-4 flex items-center gap-1.5">
                                        <BookOpen size={14} />
                                        Fundamento Bíblico
                                    </h4>
                                    <div className="space-y-4">
                                        {activeNode.verses.map((verse, idx) => (
                                            <div key={idx} className="border-b border-sabiduria-gray/10 last:border-b-0 pb-3 last:pb-0">
                                                <span className="block font-heading font-semibold text-sabiduria-navy text-xs mb-1">
                                                    {verse.citation}
                                                </span>
                                                <p className="text-sabiduria-gray text-xs italic leading-relaxed">
                                                    "{verse.text}"
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Reflexión */}
                                <section>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-sabiduria-gold mb-3">
                                        Reflexión Práctica
                                    </h4>
                                    <div className="border-l-2 border-sabiduria-gold pl-4 py-1 italic text-sabiduria-gray text-sm leading-relaxed">
                                        {activeNode.reflection}
                                    </div>
                                </section>
                            </div>

                            {/* Drawer Footer */}
                            <div className="p-6 border-t border-sabiduria-gray/10 bg-sabiduria-bg/20 flex justify-end sticky bottom-0">
                                <button
                                    onClick={() => setActiveNode(null)}
                                    className="bg-sabiduria-navy text-white px-5 py-2 text-sm font-semibold rounded-sm hover:bg-sabiduria-navy/90 transition-colors"
                                >
                                    Entendido
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </main>
    );
};

export default Esquemas;
