import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const sections = [
    { id: 'c2-s1', title: '1. Qué significa esta perfección de Dios' },
    { id: 'c2-s2', title: '2. Cómo se revela en la Escritura' },
    { id: 'c2-s3', title: '3. Cómo se ve en Cristo' },
    { id: 'c2-s4', title: '4. El lugar del hombre frente a la eternidad de Dios' },
    { id: 'c2-s5', title: '5. La consecuencia consoladora' },
    { id: 'c2-s6', title: '6. Un desafío para hoy' },
];

const PerfeccionesCapitulo2 = () => {
    const handleDownloadPDF = () => {
        window.print();
    };

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title="La Eternidad de Dios — Las Perfecciones de Dios · Capítulo 2"
                description="El que fue, el que es y el que ha de venir. El segundo capítulo explora la eternidad de Dios: su significado teológico, su revelación en la Escritura, su expresión en Cristo y su obra transformadora en el creyente."
                url="/estudio/perfecciones-de-dios/capitulo-2"
            />
            <div className="max-w-4xl mx-auto px-4 pt-8">
                <Breadcrumbs title="La Eternidad de Dios — Capítulo 2" />
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">

                {/* Header del capítulo */}
                <header className="mb-12 pb-8 border-b border-sabiduria-gray/20">
                    <Link
                        to="/estudio/perfecciones-de-dios"
                        className="inline-flex items-center gap-2 text-sabiduria-gold text-sm font-bold uppercase tracking-widest mb-6 hover:opacity-75 transition-opacity"
                    >
                        Las Perfecciones de Dios · Capítulo 2 de 14
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-serif text-sabiduria-navy mb-3 leading-tight">
                        La Eternidad de Dios
                    </h1>
                    <p className="text-2xl font-serif text-sabiduria-gold">
                        El que fue, el que es y el que ha de venir
                    </p>
                </header>

                {/* Botón PDF */}
                <div className="flex justify-end mb-8 print:hidden">
                    <button onClick={handleDownloadPDF} className="btn-pdf-discrete flex items-center gap-2">
                        <Download size={16} /> Descargar PDF
                    </button>
                </div>

                {/* Índice */}
                <nav className="bg-white p-6 mb-14 border border-sabiduria-gray/10 shadow-sm print:hidden">
                    <h2 className="text-base font-serif text-sabiduria-navy mb-4 flex items-center gap-2 font-semibold">
                        <BookOpen size={18} className="text-sabiduria-gold" /> Contenido de este capítulo
                    </h2>
                    <ul className="space-y-1.5 text-sm">
                        {sections.map(s => (
                            <li key={s.id}>
                                <a href={`#${s.id}`} className="text-sabiduria-gray hover:text-sabiduria-gold transition-colors">
                                    {s.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Contenido */}
                <article className="mb-16">

                    <div id="c2-s1" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            1. Qué significa esta perfección de Dios
                        </h2>
                        <div className="teologia-content">
                            <p>Decir que Dios es eterno no es simplemente decir que Dios existe hace mucho tiempo. Los dinosaurios existieron hace mucho tiempo, y nadie los llama eternos. La eternidad de Dios es una categoría completamente diferente: significa que Su existencia se extiende sin límite de tiempo hacia atrás y hacia adelante, sin ninguna interrupción, sin ningún origen y sin ningún final posible.</p>
                            <p>El teólogo Luis Berkhof lo define con precisión magistral: la eternidad es esa perfección de Dios por la cual Él se eleva por encima de todos los límites temporales y toda la sucesión de los momentos, y posee el todo de Su existencia en un presente indivisible. No es que Dios haya tenido un pasado muy largo. Es que Dios vive en un eterno ahora donde el pasado y el futuro existen simultáneamente ante Sus ojos, sin que nada lo sorprenda, sin que nada lo interrumpa.</p>
                            <p>A diferencia de las criaturas, cuya existencia depende de causas externas, Dios es <em>a se</em>: existe de Sí mismo. Si Dios no tiene inicio en el tiempo, entonces nadie lo creó, nadie lo trajo a la existencia. La eternidad y la aseidad son dos caras de la misma verdad: Dios es la causa incausada, el ser que no debe su existencia a nada ni a nadie.</p>
                            <blockquote>"Dios habita en la eternidad, pero el tiempo habita en Dios. Él ya ha vivido todos nuestros mañanas así como ha vivido todos nuestros ayeres." — <em>A.W. Tozer, El Conocimiento del Dios Santo</em></blockquote>
                        </div>
                    </div>

                    <div id="c2-s2" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            2. Cómo se revela en la Escritura
                        </h2>
                        <div className="teologia-content">
                            <p>La Biblia no intenta probar la eternidad de Dios. La proclama. Desde el primer versículo del Génesis hasta el último capítulo del Apocalipsis, las Escrituras presentan a un Dios que existía antes de todo y que existirá después de todo. Algunos textos clave anclan esta verdad:</p>
                            <ul>
                                <li><strong>Salmo 90:2:</strong> "Antes que naciesen los montes y formases la tierra y el mundo, desde el siglo y hasta el siglo, tú eres Dios."</li>
                                <li><strong>Génesis 21:33:</strong> Aquí aparece el nombre <em>El Olam</em>, el Dios Eterno, que en hebreo significa literalmente "el Dios de la eternidad".</li>
                                <li><strong>Isaías 57:15:</strong> "El Alto y Sublime, el que habita la eternidad" — Dios habita en la eternidad como en Su morada natural.</li>
                                <li><strong>2 Pedro 3:8:</strong> "Un día delante del Señor es como mil años, y mil años como un día." La eternidad de Dios no es tiempo acumulado; es una existencia infinitamente por encima del tiempo.</li>
                                <li><strong>Apocalipsis 6:9-11:</strong> Los mártires claman desde el cielo y Dios les pide que esperen. Aunque eterno, Dios interactúa con la historia humana, conoce su sucesión, y la gobierna con precisión.</li>
                            </ul>
                            <p>La relación entre estos textos es elocuente: el Antiguo Testamento establece la eternidad de Dios como fundamento de Su carácter. El Nuevo Testamento la confirma y la conecta con Su gobierno soberano sobre la historia y el destino de Sus hijos.</p>
                        </div>
                    </div>

                    <div id="c2-s3" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            3. Cómo se ve en Cristo
                        </h2>
                        <div className="teologia-content">
                            <p>La eternidad de Dios no es una abstracción filosófica. En Jesucristo, la eternidad se hizo carne y habitó entre nosotros. El prólogo de Juan lo proclama sin rodeos: "En el principio era el Verbo... y el Verbo era Dios." Antes de que existiera el primer átomo del universo, Cristo ya era.</p>
                            <p>Cuando los fariseos desafiaron a Jesús diciéndole que Abraham había muerto, Él respondió con una frase que hizo que quisieran apedrearlo: <em>"Antes de que Abraham fuese, yo soy"</em> (Juan 8:58). No dijo "yo era". Dijo "yo soy". Usó el mismo nombre que Dios reveló a Moisés en la zarza ardiente. Es la declaración más directa de eternidad divina que existe en los evangelios.</p>
                            <p>En la cruz, el eterno irrumpe en el tiempo de la manera más radical: el que no tiene principio ni fin experimenta muerte. El que vive en un eterno presente es clavado en un momento concreto de la historia. La eternidad de Dios no lo puso a distancia del sufrimiento humano; lo equipó para cargarlo completamente.</p>
                            <p>En Apocalipsis 1:8, el Cristo resucitado se presenta así: "Yo soy el Alfa y la Omega, principio y fin, el que es y que era y que ha de venir." La eternidad de Cristo no es solo un atributo teológico. Es una promesa: el que te salvó no puede desaparecer, no puede cambiar, no puede cansarse de ti.</p>
                        </div>
                    </div>

                    <div id="c2-s4" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            4. El lugar del hombre frente a la eternidad de Dios
                        </h2>
                        <div className="teologia-content">
                            <p>Antes de hablar de consuelo, hay que hablar de humildad. Uno de los problemas más profundos del ser humano moderno es que ha perdido el sentido de su lugar. Actuamos, hablamos y cuestionamos como si Dios nos debiera explicaciones. Como si el universo girara en torno a nuestra agenda. La eternidad de Dios es el primer correctivo.</p>
                            <p>Job lo entendió de la manera más dura. Durante capítulos enteros, Job reclamó audiencia con Dios, exigió respuestas, cuestionó la justicia divina. Y Dios respondió. Pero no con lo que Job esperaba. Respondió desde el torbellino con una pregunta devastadora: <em>"¿Dónde estabas tú cuando puse los fundamentos de la tierra?"</em> (Job 38:4). Y siguió preguntando durante cuatro capítulos: ¿Quién domina el mar? ¿Quién llama al alba? ¿Quién ató las Pléyades? ¿Quién formó al leviatán?</p>
                            <p>Dios no respondió las preguntas de Job. Le hizo las Suyas. Y eso fue suficiente. Job, que había exigido audiencia, solo pudo responder: <em>"He aquí que yo soy vil; ¿qué te responderé? Mi mano pongo sobre mi boca"</em> (Job 40:4). La confrontación con la grandeza eterna de Dios no produce debate. Produce silencio y adoración.</p>
                            <p>Eclesiastés 3:11 dice que Dios "ha puesto eternidad en el corazón" del hombre. Tozer lo describe como la gloria y la miseria del ser humano: estamos hechos del material de la eternidad, anhelamos la permanencia, pero habitamos en el tiempo que nos desgasta y nos recuerda que somos polvo. Esa tensión no es un error del diseño. Es una brújula que nos apunta hacia Dios.</p>
                            <p>La respuesta correcta a la eternidad de Dios no es la del filósofo que "resuelve" el problema del tiempo infinito. Es la de Job en el capítulo 42: postrarse, callar y adorar. Comprender lo que podamos de la infinitud de Dios con nuestra mente finita, y en ese proceso, obedecer.</p>
                        </div>
                    </div>

                    <div id="c2-s5" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            5. La consecuencia consoladora
                        </h2>
                        <div className="teologia-content">
                            <p>Pero hay otra cara de esta verdad, y es profundamente consoladora. Charles Ryrie lo sintetiza con precisión pastoral: la eternidad de Dios nos da la certidumbre de que Dios nunca ha dejado, ni dejará jamás de existir. Y por lo tanto, Su control providencial que sustenta todas las cosas y todos los eventos está garantizado.</p>
                            <p>En un mundo donde todo cambia, donde las personas cambian sus afectos, donde los gobiernos caen, donde los planes se frustran, hay Alguien que no está apurado, que no tiene fechas límite que lo angustien, cuyo amor no tuvo principio y no tendrá fin. Eso no es poesía religiosa. Es la roca sobre la que se construye una vida espiritual que resiste cualquier tormenta.</p>
                            <p>Moisés, al final de su vida, escribió el Salmo 90. Había visto generaciones nacer y morir en el desierto. Había enterrado sueños y amigos. Y aun así, escribió: <em>"Señor, tú has sido nuestro refugio de generación en generación."</em> La eternidad de Dios no es un concepto para el aula teológica. Es el refugio del creyente zarandeado por el tiempo.</p>
                        </div>
                    </div>

                    <div id="c2-s6" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            6. Un desafío para hoy
                        </h2>
                        <div className="teologia-content">
                            <p>Si Dios es eterno, entonces ninguna de las crisis que enfrentas hoy lo tomó por sorpresa. Él ya vio ese diagnóstico, esa ruptura, esa deuda, ese sueño que se desmorona, antes de que existiera el primer día de tu vida. No está buscando cómo resolver tu situación. Ya lo hizo.</p>
                            <p>La pregunta no es si Dios tiene el control. La pregunta es si tú vas a vivir como alguien que cree que lo tiene.</p>
                            <p>Así como Job, cuando fue confrontado por la eternidad y la grandeza de Dios, pasó de la queja al silencio y del silencio a la adoración, el conocimiento de la eternidad divina debe mover al creyente de la ansiedad a la confianza, del cuestionamiento a la obediencia, del miedo al descanso.</p>
                            <blockquote>"Enséñanos a contar nuestros días, de tal manera que traigamos al corazón sabiduría." — <em>Salmo 90:12</em></blockquote>
                            <p className="text-sm text-sabiduria-gray text-center mt-10">Serie: Las Perfecciones de Dios · Capítulo 2 de 14 · Sabiduría para el Corazón</p>
                        </div>
                    </div>

                </article>

                {/* Navegación entre capítulos */}
                <div className="pt-8 border-t border-sabiduria-gray/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <Link
                        to="/estudio/perfecciones-de-dios/capitulo-1"
                        className="inline-flex items-center gap-2 text-sabiduria-navy hover:text-sabiduria-gold font-medium transition-colors"
                    >
                        <ArrowLeft size={18} /> Capítulo 1 — El Amor
                    </Link>
                    <Link
                        to="/estudio/perfecciones-de-dios/capitulo-3"
                        className="inline-flex items-center gap-2 text-sabiduria-navy hover:text-sabiduria-gold font-medium transition-colors"
                    >
                        Capítulo 3 — La Santidad <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default PerfeccionesCapitulo2;
