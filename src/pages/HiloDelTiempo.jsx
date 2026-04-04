import { Link } from 'react-router-dom';
import { ArrowLeft, Download, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { sanitizeHTML } from '../lib/sanitize';

const HiloDelTiempo = () => {
    const handleDownloadPDF = () => {
        window.print();
    };

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title="El Hilo del Tiempo - Cronología y Genealogía Bíblica"
                description="Ensayo en tres partes sobre cronología bíblica, genealogías y la fidelidad de Dios a través de las generaciones."
                url="/estudio/hilo-del-tiempo"
            />
            <div className="max-w-4xl mx-auto px-4 pt-8">
                <Breadcrumbs title="El Hilo del Tiempo" />
            </div>

            <div id="hilo-content" className="max-w-4xl mx-auto px-4 py-8">
                <header className="text-center mb-12 pb-8 border-b border-sabiduria-gray/20">
                    <h1 className="text-4xl md:text-5xl font-serif text-sabiduria-navy mb-4">El Hilo del Tiempo</h1>
                    <p className="text-2xl font-serif text-sabiduria-gold mb-4">Cronología y Genealogía como Testimonio de la Fidelidad de Dios</p>
                    <p className="text-sabiduria-gray text-lg text-justify max-w-3xl mx-auto">La Biblia no solo cuenta historias: también revela el diseño de Dios a través del tiempo. Las cronologías bíblicas muestran que nada ocurre al azar. Cada generación, cada promesa y cada cumplimiento forman parte de un plan perfecto. Esta serie explora cómo Dios gobierna la historia y cómo eso fortalece nuestra fe hoy.</p>
                </header>

                <div className="flex justify-center mb-8 print:hidden">
                    <button onClick={handleDownloadPDF} className="btn-pdf-discrete flex items-center gap-2">
                        <Download size={18} /> Descargar PDF
                    </button>
                </div>

                <nav className="bg-white p-6 mb-14 border border-sabiduria-gray/10 shadow-sm print:hidden">
                    <h2 className="text-xl font-serif text-sabiduria-navy mb-4 flex items-center gap-2">
                        <BookOpen size={20} className="text-sabiduria-gold" /> Índice del Estudio
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h3 className="font-bold text-sabiduria-navy mb-2 uppercase text-sm tracking-wider">Parte 1</h3>
                            <ul className="space-y-1 text-sm">
                                {parte1.map(s => (
                                    <li key={s.id}><a href={`#${s.id}`} className="text-sabiduria-gray hover:text-sabiduria-gold transition-colors">{s.title}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-sabiduria-navy mb-2 uppercase text-sm tracking-wider">Parte 2</h3>
                            <ul className="space-y-1 text-sm">
                                {parte2.map(s => (
                                    <li key={s.id}><a href={`#${s.id}`} className="text-sabiduria-gray hover:text-sabiduria-gold transition-colors">{s.title}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-sabiduria-navy mb-2 uppercase text-sm tracking-wider">Parte 3</h3>
                            <ul className="space-y-1 text-sm">
                                {parte3.map(s => (
                                    <li key={s.id}><a href={`#${s.id}`} className="text-sabiduria-gray hover:text-sabiduria-gold transition-colors">{s.title}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* PARTE 1 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-serif text-sabiduria-navy text-center mb-10 pb-4 border-b-2 border-sabiduria-gold uppercase tracking-wide">
                        Parte 1 — El Esqueleto de la Historia de la Redención
                    </h2>
                    {parte1.map(section => (
                        <div key={section.id} id={section.id} className="mb-14 scroll-mt-24">
                            <h3 className="text-xl font-serif text-sabiduria-navy font-semibold mb-5 pb-3 border-b border-sabiduria-gray/20">
                                {section.title}
                            </h3>
                            <div className="teologia-content" dangerouslySetInnerHTML={{ __html: sanitizeHTML(section.content) }} />
                        </div>
                    ))}
                </section>

                {/* PARTE 2 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-serif text-sabiduria-navy text-center mb-10 pb-4 border-b-2 border-sabiduria-gold uppercase tracking-wide">
                        Parte 2 — Las Cronologías como Revelación del Pacto
                    </h2>
                    {parte2.map(section => (
                        <div key={section.id} id={section.id} className="mb-14 scroll-mt-24">
                            <h3 className="text-xl font-serif text-sabiduria-navy font-semibold mb-5 pb-3 border-b border-sabiduria-gray/20">
                                {section.title}
                            </h3>
                            <div className="teologia-content" dangerouslySetInnerHTML={{ __html: sanitizeHTML(section.content) }} />
                        </div>
                    ))}
                </section>

                {/* PARTE 3 */}
                <section>
                    <h2 className="text-2xl font-serif text-sabiduria-navy text-center mb-10 pb-4 border-b-2 border-sabiduria-gold uppercase tracking-wide">
                        Parte 3 — El Tiempo Redimido
                    </h2>
                    {parte3.map(section => (
                        <div key={section.id} id={section.id} className="mb-14 scroll-mt-24">
                            <h3 className="text-xl font-serif text-sabiduria-navy font-semibold mb-5 pb-3 border-b border-sabiduria-gray/20">
                                {section.title}
                            </h3>
                            <div className="teologia-content" dangerouslySetInnerHTML={{ __html: sanitizeHTML(section.content) }} />
                        </div>
                    ))}
                </section>
            </div>

            <div className="max-w-4xl mx-auto px-4 pb-16">
                <div className="pt-8 border-t border-sabiduria-gray/10">
                    <Link to="/ensayos" className="inline-flex items-center gap-2 text-sabiduria-navy hover:text-sabiduria-gold font-medium transition-colors">
                        <ArrowLeft size={18} /> Volver a Ensayos
                    </Link>
                </div>
            </div>
        </main>
    );
};

// PARTE 1: El Hilo del Tiempo
const parte1 = [
    {
        id: 'p1-introduccion',
        title: '1. Introducción: El Esqueleto de la Historia de la Redención',
        content: `<p>Seamos honestos: en nuestra lectura de las Escrituras, las cronologías y genealogías a menudo se perciben como desiertos textuales, pasajes áridos que el lector moderno se siente tentado a omitir en su búsqueda de alimento espiritual. Sin embargo, esta perspectiva ignora su función vital. Estos registros no son apéndices estériles; son el esqueleto mismo que sostiene la formidable estructura de la historia de la redención.</p>
<p>Constituyen el armazón histórico que demuestra de manera irrefutable que la fe cristiana no se fundamenta en mitos atemporales o filosofías abstractas, sino en la intervención tangible y soberana de Dios en eventos, lugares y vidas humanas reales. Son la evidencia documental de que el Creador del universo ha entrado en el tiempo y el espacio para ejecutar Su plan.</p>
<p>El propósito de este ensayo es, por tanto, demostrar cómo un estudio atento de estas líneas de tiempo y linajes revela el carácter de un Dios que actúa soberanamente en la historia. Exploraremos cómo el hilo ininterrumpido de las generaciones y el calendario de los eventos históricos testifican del cumplimiento fiel de Sus promesas pactales, anclando la esperanza del creyente no en un sentimiento subjetivo, sino en la fidelidad comprobada del Señor de la historia.</p>
<p>Al trazar este hilo, desde los patriarcas hasta la llegada del Mesías, veremos que cada nombre y cada era son un eslabón en la cadena de la providencia divina.</p>`
    },
    {
        id: 'p1-fe-historia',
        title: '2. La Fe Anclada en la Historia: Evidencia Arqueológica',
        content: `<p>La fe cristiana es, por su diseño divino, una fe histórica. No se nos invita a abrazar un mito, sino a investigar un "relato bien ordenado" de eventos, tal como lo establece Lucas en su prólogo (Lucas 1:1-4). El apóstol Pablo, de manera similar, ancla la totalidad del evangelio en la historicidad de la muerte y resurrección de Cristo (1 Corintios 15:3-8).</p>
<p>La arqueología juega un papel apologético crucial. Aunque no puede "probar" la fe en un sentido espiritual, sí establece un marco histórico verificable y congruente, demostrando que la narrativa bíblica está firmemente incrustada en la misma realidad empírica que estudian los historiadores seculares.</p>
<h4>Análisis de Figuras y Eventos Históricos Confirmados</h4>
<p><strong>El Imperio Asirio y el Reino de Judá:</strong> La confrontación entre el profeta Isaías, el rey Ezequías y el poderío de Asiria no es una leyenda, sino un evento geopolítico real. Esto lo confirma el propio rey asirio, Senaquerib, quien en su famoso prisma de arcilla relata su campaña del 701 a.C. y se jacta de haber asediado Jerusalén.</p>
<p><strong>El Imperio Babilónico y el Exilio:</strong> El exilio de Judá en Babilonia, un punto de inflexión en la historia de Israel y en la genealogía mesiánica, está igualmente validado por la arqueología. Las tablillas administrativas babilónicas registran las raciones asignadas al rey Joaquín de Judá durante su cautiverio.</p>
<p><strong>El Imperio Romano y el Nuevo Testamento:</strong> La existencia de Poncio Pilato fue confirmada con el descubrimiento de una inscripción en piedra en Cesarea Marítima. Este hallazgo demuestra que el gobernador romano que juzgó a Cristo fue una persona real.</p>
<h4>Síntesis del Valor Apologético</h4>
<p>Estos ejemplos demuestran que la Biblia habla de personas, lugares y eventos reales. Un Dios que actúa en la historia tangible es un Dios en quien se puede confiar para actuar en las realidades concretas de nuestra vida hoy.</p>`
    },
    {
        id: 'p1-pacto',
        title: '3. El Pacto a Través de las Generaciones',
        content: `<p>El hilo conductor que une los eventos de la historia bíblica es el concepto teológico del pacto. Las cronologías no son simplemente una sucesión de años, sino el calendario del cumplimiento progresivo de las promesas de Dios.</p>
<h4>Análisis de Hitos del Pacto en su Contexto Histórico</h4>
<p><strong>El Contexto Patriarcal de Abraham:</strong> La era de los patriarcas se sitúa en un contexto histórico reconocible del segundo milenio a.C. Cuando Dios le hace a Abraham la promesa de una tierra y una descendencia, no lo hace en un tiempo de "érase una vez", sino en una tierra poblada por grupos semíticos nómadas y ciudades-estado concretas.</p>
<p><strong>El Éxodo y la Formación de un Pueblo:</strong> El Éxodo, situado históricamente entre la promesa a Abraham y el establecimiento de la monarquía, se erige como el acto redentor fundamental que forjó a Israel como el pueblo del pacto de Dios.</p>
<p><strong>El Pacto Davídico y la Centralidad de Jerusalén:</strong> Con el rey David, Dios establece un pacto de un linaje real eterno (2 Samuel 7), y lo vincula a una ciudad específica: Jerusalén. La elección de una ciudad real e histórica subraya la naturaleza terrenal y concreta del plan de Dios.</p>
<h4>Evaluación de la Fidelidad Divina</h4>
<p>En cada uno de estos hitos, vemos a un Dios que cumple Sus promesas en el momento preciso, a menudo a pesar de la fragilidad, la duda y el pecado de su pueblo. La cronología bíblica es el testimonio de la paciencia y la soberanía de Dios.</p>`
    },
    {
        id: 'p1-genealogias',
        title: '4. Las Genealogías: Cartografía del Linaje Redentor',
        content: `<p>Si las cronologías son el esqueleto de la historia bíblica, las genealogías son su sistema circulatorio, los vasos sanguíneos que transportan la promesa vivificante de la redención a través del tiempo. No son meros registros familiares para establecer derechos de herencia, sino "mapas teológicos" cuidadosamente trazados.</p>
<h4>Análisis Teológico de las Genealogías Mesiánicas</h4>
<p>Las dos genealogías de Jesús en el Nuevo Testamento, en Mateo 1 y Lucas 3, son la culminación de este mapa redentor. Mateo, escribiendo a una audiencia judía, traza el linaje de Jesús desde Abraham y enfatiza su legitimidad como heredero del trono de David. Lucas lleva el linaje hasta Adán, presentando a Jesús como el Redentor de toda la humanidad.</p>
<p>Es significativo que estos listados incluyan a gentiles (como Rahab y Rut) y a pecadores notorios. Esto subraya una verdad profunda: la soberanía y la gracia de Dios obran a través de la historia humana, no por los méritos de las personas, sino a pesar de su imperfección.</p>
<h4>La Historia como Testigo del Linaje</h4>
<p>El linaje davídico fue puesto a prueba hasta el extremo con la devastación de Jerusalén y el exilio babilónico. Que la promesa de un Redentor pudiera ser transmitida a través de la gloria de la monarquía, la desesperación del exilio y la humilde restauración bajo un imperio extranjero, es uno de los más grandes testimonios de la fidelidad soberana de Dios.</p>`
    },
    {
        id: 'p1-tiempo',
        title: '5. El Tiempo como Herramienta Divina',
        content: `<p>En la narrativa bíblica, el tiempo no es un simple contenedor pasivo de eventos; es una herramienta activa en las manos de un Dios soberano para la formación de la fe y el carácter de Su pueblo. Las largas esperas, los silencios aparentes y los siglos que transcurren entre la promesa y el cumplimiento no son un defecto del plan divino, sino una parte integral de él.</p>
<h4>El Valor Formativo de la Espera</h4>
<p>Los extensos períodos de tiempo que vemos en la Escritura —como los casi dos mil años entre la promesa a Abraham y el ministerio de Cristo— no son "tiempo muerto". Son un taller espiritual activo. La fe no se forja en la gratificación instantánea, sino en la espera paciente.</p>
<h4>La Cronología como Mandato de la Memoria</h4>
<p>En Su sabiduría, Dios ordena explícitamente a Su pueblo recordar Sus actos poderosos en la historia (Deuteronomio 8, Josué 4). Mientras los reyes paganos registraban la historia para inmortalizar su propia gloria, Dios ordena el recuerdo de Sus actos para revelar Su carácter, fomentar la confianza y edificar la fe de Su pueblo.</p>
<p>Dios usa la historia como el gran "museo" de Su fidelidad. Cada vez que leemos las cronologías y genealogías, se nos invita a un recorrido por la fidelidad de Dios.</p>`
    },
    {
        id: 'p1-conclusion',
        title: '6. Conclusión y Aplicación Pastoral',
        content: `<p>Hemos recorrido el hilo del tiempo y hemos descubierto que las cronologías y genealogías de la Escritura son mucho más que simples registros. Son la prueba documental de un Dios que se ha comprometido con la historia humana de manera tangible, personal y fiel.</p>
<h4>Aplicaciones Prácticas</h4>
<p><strong>1. Confianza en los Procesos de Dios.</strong> En nuestros momentos de espera, cuando las promesas de Dios parecen lejanas, podemos mirar hacia atrás en la historia de la redención. El Dios que obró pacientemente a través de siglos es el mismo Dios que está obrando en nuestros períodos de espera.</p>
<p><strong>2. Seguridad en la Fidelidad de Dios.</strong> La historia es la mayor evidencia del carácter de Dios. Su fidelidad no es una teoría, sino un hecho demostrado a lo largo de miles de años.</p>
<p><strong>3. Nuestro Lugar en la Historia.</strong> Al estudiar las genealogías, nos damos cuenta de que somos parte de una larga cadena de fidelidad. Ahora es nuestro turno. Somos eslabones en esa misma cadena, llamados a vivir de tal manera que nuestra vida sea un testimonio del mismo Dios de la historia.</p>
<p class="text-center text-xl font-serif italic text-sabiduria-gold mt-8">En cada nombre y en cada fecha, trazamos el hilo del tiempo tejido por la mano soberana de un Dios que cumple Sus promesas.</p>`
    }
];

// PARTE 2: Las Cronologías como Revelación del Pacto
const parte2 = [
    {
        id: 'p2-testimonio',
        title: '1. Las cronologías como testimonio de un Dios que guarda pacto',
        content: `<p>Cuando abrimos las Escrituras, descubrimos que el tiempo no es una mera sucesión de fechas y eventos; es el lienzo sobre el cual Dios pinta la historia de su fidelidad. A lo largo de centurias, estas líneas de tiempo trazan un patrón inconfundible: el de un Dios que establece pactos y los cumple con una fidelidad inquebrantable.</p>
<p>En el corazón de esta revelación se encuentra el concepto bíblico de "pacto" o "alianza". Este no es un contrato entre iguales, sino una iniciativa soberana y divina, basada en el "libre amor y bondad de Dios hacia su pueblo".</p>
<p>La fidelidad de Dios no se fundamenta en un momento aislado, sino en una continuidad generacional. Cuando Dios se revela a Moisés desde la zarza ardiente, no se presenta como una deidad nueva, sino como <em>"el Dios de tu padre, el Dios de Abraham, el Dios de Isaac y el Dios de Jacob"</em> (Éxodo 3:6).</p>
<p>Es precisamente el paso del tiempo el que sirve como escenario donde esta fidelidad se prueba y se manifiesta. La promesa de un hijo a Abraham y Sara se cumplió "después de muchos duros años de espera", cuando humanamente parecía imposible.</p>
<blockquote class="blockquote-gold">"Conoce, pues, que Jehová tu Dios es Dios, Dios fiel, que guarda el pacto y la misericordia a los que le aman y guardan sus mandamientos, hasta mil generaciones."<footer class="mt-2 text-sabiduria-gray">— Deuteronomio 7:9</footer></blockquote>`
    },
    {
        id: 'p2-genealogias',
        title: '2. Genealogías: más que listas de nombres',
        content: `<p>¿Alguna vez se ha preguntado por qué la Biblia incluye esas largas y, a primera vista, aburridas listas de nombres? Lejos de ser un mero apéndice, las genealogías son en realidad un mapa del tesoro de la fidelidad de Dios.</p>
<p>Son herramientas teológicas cruciales cuya función principal no es meramente biográfica, sino trazar la continuidad ininterrumpida del plan redentor de Dios a lo largo de la historia. Las genealogías son el <strong>ADN espiritual de la salvación</strong>, el hilo dorado que demuestra que la historia no es una serie de eventos inconexos.</p>
<h4>La función teológica de las genealogías</h4>
<p>Un ejemplo magistral se encuentra en 1 Crónicas, que "comienza con listas tribales que establecen los antecedentes de la nación". El cronista no está simplemente archivando datos; está reconstruyendo la identidad de un Israel post-exilio.</p>
<p>El evangelista Mateo no comienza su relato con un milagro o un sermón, sino con un "árbol genealógico que conecta firmemente a Jesús con la historia del Antiguo Testamento". Jesús no es una figura aislada, sino la culminación de todas las promesas hechas a Abraham y a David.</p>
<h4>Ejemplos fundamentales</h4>
<ul>
<li><strong>Génesis 5 y 11:</strong> Trazan la línea de la promesa desde Adán hasta Abraham</li>
<li><strong>Mateo 1 y Lucas 3:</strong> Establecen el linaje legal y humano del Mesías</li>
</ul>`
    },
    {
        id: 'p2-abraham-cristo',
        title: '3. El pacto a través del tiempo: de Abraham a Cristo',
        content: `<p>El pacto con Abraham constituye el punto de partida fundamental del plan redentor de Dios, una promesa que se desarrolla progresivamente a lo largo de toda la historia bíblica. No fue un evento aislado, sino la siembra de una semilla divina destinada a crecer a través de las generaciones.</p>
<h4>La promesa inicial del pacto abrahámico</h4>
<p>Era triple: una descendencia, una tierra y una bendición para todas las naciones. Dios prometió solemnemente que los descendientes de Abraham serían "tan numerosos como las arenas de la playa" y que heredarían la tierra de Canaán.</p>
<h4>El desarrollo y la expansión de este pacto</h4>
<ul>
<li>La espectacular liberación de la esclavitud en Egipto fue el cumplimiento directo de la promesa hecha a los patriarcas.</li>
<li>El pacto davídico representó una nueva fase, especificando el linaje real a través del cual vendría el Mesías.</li>
</ul>
<h4>La culminación definitiva en Jesucristo</h4>
<p>El apóstol Pablo, en Gálatas 3, argumenta que la verdadera descendencia de Abraham no se define por la etnicidad, sino por la fe. A través de la fe en Cristo, los creyentes gentiles se convierten en "hijos de Abraham" y son plenamente integrados en el "pueblo de la alianza divina".</p>
<p class="text-center font-serif italic text-sabiduria-gold">La promesa de que en Abraham serían benditas todas las familias de la tierra se cumple de una manera que trasciende todas las fronteras.</p>`
    },
    {
        id: 'p2-tiempo-prueba',
        title: '4. El tiempo como prueba de la paciencia y soberanía de Dios',
        content: `<p>En la narrativa bíblica, la "espera" no es un vacío ni una evidencia de la ausencia de Dios; es un elemento intencional y teológicamente significativo en Su plan. Los largos períodos cronológicos entre la promesa y su cumplimiento son la demostración de la paciencia y la soberanía de Dios.</p>
<h4>La historia de Abraham y Sara</h4>
<p>Es el arquetipo de la fe probada por el tiempo. Abraham "no dudó, por incredulidad, de la promesa de Dios, sino que se fortaleció en fe, dando gloria a Dios" (Romanos 4). Su espera no fue pasiva, sino un acto de confianza sostenida que Dios le acreditó como justicia.</p>
<h4>Los cuarenta años en el desierto</h4>
<p>Lo que pudo haber sido un viaje corto se convirtió en la odisea de una generación. Esta demora sirvió al propósito divino de formar "una nueva generación" que confiaría en Su poder para entrar en la tierra prometida.</p>
<h4>Interpretación teológica</h4>
<p>La carta a los Hebreos presenta a los patriarcas como ejemplos de perseverancia. En Hebreos 6:13–20, el autor razona que, así como Abraham, "habiendo esperado con paciencia, alcanzó la promesa", los creyentes podemos aferrarnos a la esperanza que tenemos como un ancla segura y firme para el alma.</p>`
    },
    {
        id: 'p2-pastoral',
        title: '5. Dimensión pastoral: leer nuestra historia a la luz del pacto',
        content: `<p>Comprender la fidelidad intergeneracional de Dios transforma nuestra fe personal de una experiencia aislada a una participación consciente en la gran y continua historia del pacto de Dios.</p>
<h4>Principios prácticos para la vida diaria</h4>
<p><strong>Confiar en los Tiempos de Dios:</strong> Las historias de Abraham esperando a Isaac, José sufriendo en Egipto antes de ser exaltado, y el pueblo de Israel en el exilio, nos enseñan a mantener la fe durante los períodos de espera. Una demora no es una negación.</p>
<p><strong>Ver Nuestra Herencia Espiritual:</strong> Las genealogías nos animan a vernos como parte de una "gran nube de testigos" (Hebreos 11). No estamos solos en nuestra carrera de fe. Estamos conectados con una comunidad de creyentes que han confiado en las mismas promesas.</p>
<p><strong>Vivir como Pueblo del Pacto:</strong> La certeza de las promesas de Dios, demostrada a lo largo de milenios de historia registrada, debe motivar una vida de obediencia y confianza hoy. Esta seguridad nos libera del miedo y nos impulsa a vivir con valentía y santidad.</p>
<blockquote class="blockquote-gold">Leamos nuestra propia historia a la luz del pacto eterno de Dios. Que nuestras luchas, esperas y triunfos adquieran un significado más profundo al ser vistos como parte de la gran narrativa de Su fidelidad.</blockquote>`
    }
];

// PARTE 3: El Tiempo Redimido
const parte3 = [
    {
        id: 'p3-cumplimiento',
        title: '1. El Tiempo que Apunta al Cumplimiento Final',
        content: `<p>Desde la perspectiva bíblica, el tiempo no es un mero registro de eventos pasados ni una sucesión cíclica sin destino. Es, fundamentalmente, una narrativa con un propósito divino (teleológica) que se despliega con intención soberana.</p>
<h4>La Dimensión Profética de la Cronología</h4>
<p>Un ejemplo primordial se encuentra en la visión profética de la estatua en el libro de Daniel. En este sueño, se revela una sucesión de cuatro grandes reinos terrenales, representados por distintas partes de una imponente estatua (Daniel 2). Sin embargo, la culminación no es otro imperio humano, sino la aparición de una piedra que destruye la estatua y se convierte en una montaña que llena toda la tierra.</p>
<p>Daniel interpreta esta piedra como el «reino de Dios», un reino final y eterno que prevalecerá sobre todos los poderes mundanos.</p>
<h4>El Cumplimiento del Tiempo en Cristo</h4>
<p>La encarnación no fue un evento aislado, sino el «cumplimiento del tiempo» (Gálatas 4:4), el momento para el cual toda la historia anterior había sido una cuidadosa preparación.</p>
<blockquote class="blockquote-gold">"Dios, habiendo hablado muchas veces y de muchas maneras en otro tiempo a los padres por los profetas, en estos últimos días nos ha hablado por el Hijo."<footer class="mt-2 text-sabiduria-gray">— Hebreos 1:1-2</footer></blockquote>
<p>En Cristo, toda la historia de la salvación encuentra su significado y propósito. Su vida, muerte y resurrección inauguran una nueva era, redefiniendo el propósito del tiempo mismo.</p>`
    },
    {
        id: 'p3-esperanza',
        title: '2. Cronología y Esperanza Escatológica',
        content: `<p>La estructura temporal de la Biblia, al apuntar hacia un fin glorioso y predeterminado, se convierte en la fuente principal de la esperanza cristiana. Esta esperanza no es un optimismo vago, sino una certeza anclada en las promesas futuras de un Dios que ha demostrado su fidelidad a lo largo de la historia.</p>
<h4>Viviendo entre el «Ya» y el «Todavía No»</h4>
<p>El creyente habita en una tensión existencial única. Sus miembros recibieron el poder del Espíritu Santo en Pentecostés para ser testigos «hasta lo último de la tierra» (Hechos 1:8), pero este ministerio comenzó justo después de que preguntaran por la restauración final del reino (Hechos 1:6).</p>
<p>Esta tensión es lo que la teología describe como vivir entre el «ya» y el «todavía no». El «ya» es la llegada de aquella «piedra» profetizada en Daniel 2. El «todavía no» es la expectación de que esa piedra se convierta en la «gran montaña que llenó toda la tierra».</p>
<h4>La Promesa de la Restauración Final</h4>
<p>La esperanza cristiana encuentra su imagen más vívida en las visiones de Apocalipsis 21-22: un «cielo nuevo y una tierra nueva» donde Dios habita con su pueblo, donde no hay más llanto, dolor ni muerte.</p>
<blockquote class="blockquote-gold">"El que quiera, tome gratuitamente del agua de la vida."<footer class="mt-2 text-sabiduria-gray">— Apocalipsis 22:17</footer></blockquote>
<p>El apóstol Pablo, en Romanos 8, articula esta dinámica al contrastar el «sufrimiento presente» con la «gloria futura» (Romanos 8:18-25).</p>`
    },
    {
        id: 'p3-ubicacion',
        title: '3. Vivir Conscientes de Nuestra Ubicación en la Historia de Dios',
        content: `<p>La teología bíblica nos invita a abrazar el concepto de «ubicación histórica». La vida de cada creyente no es un accidente cronológico, sino una inserción intencionada en la gran historia redentora de Dios.</p>
<h4>El Propósito Divino en el Tiempo y el Espacio</h4>
<p>El apóstol Pablo, en su discurso en Atenas, articuló un principio providencial fundamental: que Dios ha determinado «los tiempos» y «los límites de su habitación» para que las naciones lo busquen (Hechos 17:26-27).</p>
<p>Vemos este patrón cuando Dios llama a Abraham a salir de Ur, o cuando guía a Israel a través de un desierto específico en un tiempo preciso. Nuestra existencia en un siglo y lugar determinados no es una casualidad.</p>
<h4>Una Generación con un Llamado Específico</h4>
<p>La historia de Ester sirve como un arquetipo poderoso. En un momento de crisis, Mardoqueo la desafía con la idea de que ha sido posicionada en un lugar de influencia <em>«para una ocasión como esta»</em> (Ester 4:14).</p>
<p>Al igual que ella, cada generación de creyentes se enfrenta a desafíos y oportunidades únicos. Dios nos posiciona en nuestro contexto particular no para nuestra propia comodidad, sino para ser agentes de su propósito redentor.</p>`
    },
    {
        id: 'p3-mayordomia',
        title: '4. El Tiempo como Mayordomía Espiritual',
        content: `<p>Desde una perspectiva bíblica, el tiempo es un don sagrado, un recurso finito que se nos confía para administrarlo con sabiduría. La mayordomía del tiempo se convierte así en un componente esencial del discipulado cristiano.</p>
<h4>Redimir y Discernir los Tiempos</h4>
<p>El mandato apostólico de «aprovechando bien el tiempo» (Efesios 5:16; cf. Colosenses 4:5) no es un llamado a una actividad frenética, sino a una vida de sabiduría práctica.</p>
<p>Redimir el tiempo es la aplicación del discernimiento divino a los deberes, relaciones y decisiones cotidianas. Debido a que Dios nos ha ubicado soberanamente en este momento histórico (Hechos 17), nuestra mayordomía del tiempo (Efesios 5) es la respuesta directa a nuestro llamado generacional.</p>
<h4>Una Vida con Propósito: La Oración de Moisés</h4>
<blockquote class="blockquote-gold">"Enséñanos de tal modo a contar nuestros días, que traigamos al corazón sabiduría."<footer class="mt-2 text-sabiduria-gray">— Salmo 90:12</footer></blockquote>
<p>El reconocimiento de la brevedad de la vida es un catalizador poderoso para buscar la sabiduría. Lejos de conducir a la desesperación, esta conciencia debe impulsar al creyente a vivir con un propósito eterno, alineando las prioridades diarias con los valores del Reino de Dios.</p>`
    },
    {
        id: 'p3-cuerpo-cristo',
        title: '5. De la Línea Genealógica al Cuerpo de Cristo',
        content: `<p>El plan redentor de Dios muestra una expansión progresiva, pasando de un enfoque en un linaje físico a la formación de una familia espiritual global. Con la venida de Cristo, la promesa se expande de manera radical, creando un nuevo pueblo, la Iglesia.</p>
<h4>Herederos de la Promesa por la Fe</h4>
<p>El apóstol Pablo, en Gálatas, articula un cambio de paradigma revolucionario. La herencia de las promesas de Dios ya no se limita a la descendencia física de Abraham; <strong>la fe en Jesucristo se convierte en el criterio nuevo y definitivo de pertenencia</strong>.</p>
<p>Por la fe, creyentes de todas las naciones son insertados en la línea de la promesa, creando una sola familia unida en Cristo (Gálatas 3:26-29).</p>
<h4>Un Templo Espiritual y un Pueblo Santo</h4>
<p>La Iglesia es descrita como un «edificio» o «templo» espiritual, con los apóstoles y profetas como fundamento y con Cristo mismo como la piedra angular (Efesios 2:19-22).</p>
<p>Pedro describe a la Iglesia como un «pueblo escogido» y un «real sacerdocio» (1 Pedro 2:9-10), demostrando que la Iglesia es la continuación y el cumplimiento del propósito de Dios de tener un pueblo santo para sí a lo largo de la historia.</p>`
    },
    {
        id: 'p3-conclusion',
        title: '6. Conclusión Pastoral: Vivir Entre la Memoria y la Esperanza',
        content: `<p>La vida cristiana se vive en el espacio sagrado entre la memoria y la esperanza. Somos un pueblo llamado a mirar hacia atrás con gratitud y hacia adelante con confianza.</p>
<h4>Vivimos de la Memoria</h4>
<p>Recordamos el pacto con Abraham. Recordamos el Éxodo. Recordamos la promesa a David, de un reino que no tendría fin. Y, sobre todo, recordamos la cruz y la tumba vacía. Mirar hacia atrás es recordar que el Dios que actuó poderosamente en el pasado es el mismo Dios que nos sostiene hoy.</p>
<h4>Vivimos por la Esperanza</h4>
<p>Nuestra mirada se proyecta hacia adelante, hacia la consumación prometida. Anhelamos el día descrito en Apocalipsis, cuando la justicia será plena, el mal será erradicado y una nueva creación emergerá. Este no es un sueño incierto, sino nuestro destino seguro.</p>
<h4>Nuestro Llamado</h4>
<p>Le invito a verse a sí mismo como lo que es: un participante activo y valioso en la gran y continua historia de Dios. No es usted un espectador, sino un actor a quien se le ha asignado un papel único.</p>
<p>Abrace su ubicación en esta magnífica narrativa. Viva con la sabiduría forjada por la memoria de la fidelidad de Dios y con la energía vibrante que proviene de la esperanza en su triunfo final.</p>
<p class="text-center text-xl font-serif italic text-sabiduria-gold mt-8">Su vida, aquí y ahora, es su oportunidad de añadir un capítulo de fe y obediencia al plan eterno de Dios.</p>`
    }
];

export default HiloDelTiempo;
