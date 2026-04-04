import { Link } from 'react-router-dom';
import { ArrowLeft, Download, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const sections = [
    { id: 'c3-s1', title: '1. Qué significa esta perfección de Dios' },
    { id: 'c3-s2', title: '2. Cómo se revela en la Escritura' },
    { id: 'c3-s3', title: '3. Cómo se ve en Cristo' },
    { id: 'c3-s4', title: '4. Cómo transforma al creyente' },
];

const PerfeccionesCapitulo3 = () => {
    const handleDownloadPDF = () => {
        window.print();
    };

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title="La Santidad de Dios — Las Perfecciones de Dios · Capítulo 3"
                description="El Dios que es Luz, y en quien no hay ninguna tiniebla. El tercer capítulo explora la santidad de Dios: su significado teológico, su revelación en la Escritura, su expresión perfecta en Cristo y su obra transformadora en el creyente."
                url="/estudio/perfecciones-de-dios/capitulo-3"
            />
            <div className="max-w-4xl mx-auto px-4 pt-8">
                <Breadcrumbs title="La Santidad de Dios — Capítulo 3" />
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">

                {/* Header del capítulo */}
                <header className="mb-12 pb-8 border-b border-sabiduria-gray/20">
                    <Link
                        to="/estudio/perfecciones-de-dios"
                        className="inline-flex items-center gap-2 text-sabiduria-gold text-sm font-bold uppercase tracking-widest mb-6 hover:opacity-75 transition-opacity"
                    >
                        Las Perfecciones de Dios · Capítulo 3 de 14
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-serif text-sabiduria-navy mb-3 leading-tight">
                        La Santidad de Dios
                    </h1>
                    <p className="text-2xl font-serif text-sabiduria-gold">
                        El Dios que es Luz, y en quien no hay ninguna tiniebla
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

                    <div id="c3-s1" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            1. Qué significa esta perfección de Dios
                        </h2>
                        <div className="teologia-content">
                            <p>La santidad de Dios no es simplemente uno más en la lista de Sus atributos. Es algo diferente: es el atributo que tiñe a todos los demás. La justicia de Dios es una justicia santa. El amor de Dios es un amor santo. Su misericordia, Su poder, Su sabiduría, todo existe en función de Su santidad. Los teólogos la han llamado «el hilo de oro» que atraviesa toda la revelación.</p>
                            <p>Esto significa que no se puede entender bien a Dios sin entender Su santidad. Y también significa que no se puede entender bien el evangelio sin ella, porque el evangelio es la respuesta de un Dios santo a un mundo en pecado.</p>
                            <p>La palabra hebrea más usada para santidad es <em>qādôsh</em>, que proviene de una raíz cuyo significado es separar o cortar. Teológicamente, esto dice algo muy preciso: Dios está absolutamente separado de todo lo que es imperfecto, corrupto o malo. No hay en Él sombra de variación.</p>
                            <p>Pero hay que tener cuidado aquí. La santidad de Dios no es únicamente una separación negativa, como si Dios fuera simplemente alguien que no peca. La santidad es también algo positivo: es la plenitud perfecta de todo bien. Dios no es santo porque se ajuste a una norma externa de bondad. Él <em>es</em> esa norma. Su carácter es el estándar supremo de lo que significa ser bueno, justo y verdadero.</p>
                            <p>Habacuc lo expresa con una imagen poderosa: «Muy limpio eres de ojos para ver el mal» (Hab. 1:13). El pecado no es algo que Dios tolera en pequeñas dosis. Es algo radicalmente incompatible con Su naturaleza.</p>

                            <h3>La diferencia entre la santidad de Dios y la santidad humana</h3>
                            <p>Esta distinción es importante para no confundir categorías. La santidad de Dios es intrínseca: le pertenece por lo que Él es en Sí mismo, desde siempre y para siempre. Es inmutable. Dios no puede dejar de ser santo del mismo modo que no puede dejar de ser Dios.</p>
                            <p>La santidad del creyente, en cambio, es derivada. No nace de la naturaleza humana sino de la gracia de Dios. Es progresiva, depende de la obra continua del Espíritu Santo, y no será perfecta hasta la glorificación final. El creyente es santo no por lo que es, sino por lo que Dios hace en él.</p>
                            <p>Confundir estos dos tipos de santidad lleva a dos errores opuestos: o el orgullo espiritual del que cree que ya ha alcanzado algo, o la desesperanza del que cree que nunca podrá acercarse a Dios.</p>
                        </div>
                    </div>

                    <div id="c3-s2" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            2. Cómo se revela en la Escritura
                        </h2>
                        <div className="teologia-content">
                            <p>La Biblia no menciona la santidad de Dios como si fuera un detalle secundario. La proclama con una consistencia y una intensidad que no tiene paralelo con ningún otro atributo. El único atributo que se repite tres veces en la Escritura —en Isaías 6 y en Apocalipsis 4— es precisamente este: «Santo, santo, santo.»</p>

                            <h3>En el Antiguo Testamento</h3>
                            <p>El Antiguo Testamento construye toda su arquitectura sobre la santidad de Dios. El sistema levítico, el tabernáculo, el sacerdocio, los sacrificios: todo ese sistema existe para comunicar una sola verdad fundamental: Dios es absolutamente santo y el hombre pecador no puede acercarse a Él sin mediación.</p>
                            <ul>
                                <li><strong>Levítico 11:44</strong> establece el imperativo que atraviesa toda la Ley: «Sed santos, porque yo soy santo.» El modelo para la conducta del pueblo no es una norma cultural ni una convención religiosa. Es el carácter de Dios mismo.</li>
                                <li><strong>Isaías 6:1–5</strong> es quizás la escena más impactante de todo el Antiguo Testamento. Isaías ve al Señor exaltado, los serafines lo adoran cantando «Santo, santo, santo», y la reacción del profeta no es admiración ni euforia religiosa. Es terror: «¡Ay de mí, que soy hombre de labios impuros!» La santidad de Dios no consuela en primer lugar: revela. Muestra al hombre lo que realmente es delante de Dios.</li>
                                <li><strong>Habacuc 1:12–13</strong> añade la dimensión ética: Dios no puede mirar el mal con aprobación. Su santidad no es indiferente a la injusticia. Esta es la razón por la cual el pecado tiene consecuencias: no porque Dios sea arbitrario, sino porque Su naturaleza es incompatible con la maldad.</li>
                            </ul>

                            <h3>En el Nuevo Testamento</h3>
                            <p>El Nuevo Testamento no suaviza la santidad de Dios. La confirma y la lleva a su plena revelación en Cristo.</p>
                            <ul>
                                <li><strong>Juan 17:11:</strong> Jesús ora al «Padre Santo», usando ese título en el contexto de la intercesión por Sus discípulos. La santidad del Padre es el fundamento sobre el cual descansa la oración del Hijo.</li>
                                <li><strong>1 Juan 1:5:</strong> «Dios es luz, y en Él no hay ninguna tiniebla.» La imagen de la luz no solo comunica pureza, sino también claridad y revelación. La santidad de Dios expone todo lo que está oculto.</li>
                                <li><strong>1 Pedro 1:15–16:</strong> Pedro retoma directamente el mandato de Levítico y lo aplica a la iglesia del Nuevo Testamento. La santidad sigue siendo el llamado del pueblo de Dios, ahora bajo el nuevo pacto y con la presencia del Espíritu Santo.</li>
                            </ul>
                            <p>Lo que une el Antiguo y el Nuevo Testamento en este punto es la misma realidad: la santidad de Dios produce en el ser humano, inevitablemente, conciencia de su propia condición. Quien realmente ve a Dios tal como es, se ve a sí mismo tal como es.</p>
                        </div>
                    </div>

                    <div id="c3-s3" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            3. Cómo se ve en Cristo
                        </h2>
                        <div className="teologia-content">
                            <p>Jesucristo es la revelación perfecta del carácter de Dios. Si quieres saber cómo es la santidad de Dios cuando toma forma humana y camina por la historia, mira a Jesús.</p>

                            <h3>Una vida de santidad activa</h3>
                            <p>La santidad de Jesús no era el aislamiento del que evita el contacto con el mundo para no contaminarse. Era algo mucho más poderoso: era una pureza activa. Jesús tocó leprosos sin contaminarse. Cenó con pecadores sin volverse como ellos. Habló con una autoridad moral que asombraba a todos porque Sus palabras y Su vida eran absolutamente coherentes. Nunca hubo en Él contradicción entre lo que enseñaba y lo que hacía.</p>
                            <p>Cuando los fariseos buscaban acusarlo, no podían encontrar nada. No porque no lo intentaran, sino porque no había nada que encontrar. Su santidad no era la santidad del que cumple reglas: era la santidad de Alguien que era, en Su ser más profundo, puro.</p>

                            <h3>La cruz: donde la santidad y el amor se encuentran</h3>
                            <p>Pero el lugar donde la santidad de Dios brilla con mayor claridad no es en la vida de Jesús. Es en Su muerte.</p>
                            <p>Dios es santo. Eso significa que el pecado no puede simplemente ser ignorado o pasado por alto. La santidad de Dios demanda que el pecado sea juzgado. Esta no es una verdad cruel; es una verdad justa. Un Dios que ignorara el pecado no sería bueno; sería indiferente.</p>
                            <p>En la cruz ocurre lo que la teología llama el «admirable intercambio»: Cristo, que no tiene pecado, carga con el pecado del mundo. La ira santa de Dios cae sobre el Hijo en lugar de caer sobre los culpables. Y así, en ese único momento de la historia, la santidad de Dios que juzga el pecado y el amor de Dios que salva al pecador se manifiestan al mismo tiempo, en el mismo lugar, a través de la misma obra.</p>
                            <p>Es allí donde se ve con claridad lo que significa la frase central de esta serie: amar no es hacer sentir bien a una persona, sino conducirla hacia el bien que Dios define. El amor de Dios no minimizó el pecado. Lo juzgó. Y pagó el precio para que el pecador pudiera ser libre.</p>
                        </div>
                    </div>

                    <div id="c3-s4" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            4. Cómo transforma al creyente
                        </h2>
                        <div className="teologia-content">
                            <p>Conocer la santidad de Dios no es un ejercicio para teólogos. Produce transformaciones concretas en la vida del creyente.</p>

                            <h3>Primero: produce conciencia real del pecado</h3>
                            <p>El problema más profundo del ser humano moderno no es la falta de información sobre Dios. Es que ha perdido el sentido de lo que el pecado realmente significa. Cuando se reduce a Dios a un ser comprensivo que acepta todo, el pecado deja de verse como lo que es: una rebelión contra la santidad absoluta.</p>
                            <p>La visión de la santidad de Dios rompe esa ilusión. Isaías, que era un hombre de Dios, un profeta, quedó destruido ante la visión del Señor santo. No dijo «qué hermoso es esto». Dijo «¡Ay de mí!» Pedro, cuando vio la gloria de Jesús en la pesca milagrosa, no celebró. Dijo: «Apártate de mí, Señor, porque soy hombre pecador» (Lc. 5:8). La santidad de Dios revela con precisión lo que el corazón humano realmente es.</p>
                            <p>Esta conciencia del pecado no es un fin en sí misma. Es el camino hacia el arrepentimiento genuino, que es el camino hacia la gracia.</p>

                            <h3>Segundo: establece un nuevo estándar para la vida</h3>
                            <p>La santidad de Dios transforma la pregunta que el creyente se hace frente a cada decisión. La pregunta del legalismo es «¿está permitido?» La pregunta de la santidad es «¿esto refleja el carácter de Dios?»</p>
                            <p>Esta diferencia no es trivial. El legalismo busca los límites del permiso. La santidad busca la semejanza con Dios. Son dos orientaciones completamente distintas de la vida espiritual. Una produce personas que empujan los límites hasta el borde. La otra produce personas que quieren parecerse más a Cristo.</p>

                            <h3>Tercero: la transforma por la obra del Espíritu</h3>
                            <p>Y aquí está la diferencia más importante con cualquier sistema de moralismo religioso: esta transformación no es el resultado del esfuerzo humano. Es la obra del Espíritu Santo.</p>
                            <p>El Espíritu usa la Palabra de Dios para renovar la mente, cambiar los afectos, transformar la voluntad. No impone conductas desde afuera. Obra desde adentro, en las regiones más profundas del ser, para que el creyente quiera lo que Dios quiere. La santidad cristiana no es la perfección del disciplinado. Es el fruto del que vive en comunión con el Dios santo.</p>

                            <h3>El destino de esta transformación</h3>
                            <p>La santidad a la que Dios llama al creyente no terminará en esta vida. Habrá un momento —la glorificación— en que esa obra será completada, y el creyente será plenamente conforme a la imagen de Cristo. La santidad no es solo una exigencia moral. Es una promesa escatológica: «Seremos semejantes a él, porque le veremos tal como él es» (1 Jn. 3:2).</p>

                            <blockquote>
                                «¡Ay de mí, que soy hombre de labios impuros, y habito en medio de pueblo que tiene labios impuros; han visto mis ojos al Rey, el Señor de los ejércitos!»
                                <br /><em>— Isaías 6:5</em>
                            </blockquote>

                            <p>¿Con qué frecuencia tu vida espiritual gira alrededor de la pregunta «¿qué me está permitido?» en lugar de «¿cómo me parezco más a Dios?» La santidad de Dios no solo define lo que Él es. Define lo que Su pueblo está llamado a ser, y lo que el Espíritu Santo está obrando en ti, ahora mismo, para llevarte allí.</p>

                            <p className="text-sm text-sabiduria-gray text-center mt-10">Serie: Las Perfecciones de Dios · Capítulo 3 de 14 · Sabiduría para el Corazón</p>
                        </div>
                    </div>

                </article>

                {/* Navegación entre capítulos */}
                <div className="pt-8 border-t border-sabiduria-gray/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <Link
                        to="/estudio/perfecciones-de-dios/capitulo-2"
                        className="inline-flex items-center gap-2 text-sabiduria-navy hover:text-sabiduria-gold font-medium transition-colors"
                    >
                        <ArrowLeft size={18} /> Capítulo 2 — La Eternidad
                    </Link>
                    <div className="text-sm text-sabiduria-gray italic">
                        Capítulo 4 — Próximamente
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PerfeccionesCapitulo3;
