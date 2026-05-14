import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const sections = [
    { id: 'c5-s1', title: '1. Qué significa esta perfección de Dios' },
    { id: 'c5-s2', title: '2. Cómo se revela en la Escritura' },
    { id: 'c5-s3', title: '3. Cómo se ve en Cristo' },
    { id: 'c5-s4', title: '4. Cómo transforma al creyente' },
];

const PerfeccionesCapitulo5 = () => {
    const handleDownloadPDF = () => {
        window.print();
    };

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title="La Justicia de Dios — Las Perfecciones de Dios · Capítulo 5"
                description="¿Qué significa que Dios sea justo? El quinto capítulo explora la justicia como rectitud eterna, su revelación en la Escritura, su expresión perfecta en la cruz y su poder para transformar al creyente justificado."
                url="/estudio/perfecciones-de-dios/capitulo-5"
            />
            <div className="max-w-4xl mx-auto px-4 pt-8">
                <Breadcrumbs title="La Justicia de Dios — Capítulo 5" />
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">

                {/* Header del capítulo */}
                <header className="mb-12 pb-8 border-b border-sabiduria-gray/20">
                    <Link
                        to="/estudio/perfecciones-de-dios"
                        className="inline-flex items-center gap-2 text-sabiduria-gold text-sm font-bold uppercase tracking-widest mb-6 hover:opacity-75 transition-opacity"
                    >
                        Las Perfecciones de Dios · Capítulo 5 de 14
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-serif text-sabiduria-navy mb-3 leading-tight">
                        La Justicia de Dios
                    </h1>
                    <p className="text-2xl font-serif text-sabiduria-gold">
                        El Juez de toda la tierra siempre hará lo recto
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

                    {/* Sección 1 */}
                    <div id="c5-s1" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            1. Qué significa esta perfección de Dios
                        </h2>
                        <div className="teologia-content">
                            <p>Si Dios no fuera justo, Su amor sería capricho y Su perdón sería complicidad con el mal.</p>

                            <p>La justicia de Dios es la rectitud de Su naturaleza, en virtud de la cual Él siempre actúa en perfecta armonía con Su propio carácter. No estamos hablando de una norma externa a la que Dios deba someterse, como si existiera un tribunal por encima de Él. La justicia de Dios <em>es</em> Dios mismo: Su rectitud no le fue otorgada, no puede serle quitada, y no varía según las circunstancias.</p>

                            <p>Luis Berkhof lo expresa con precisión: la justicia de Dios es la santidad divina en acción, especialmente en Su función como Gobernador moral del universo. La <strong>santidad</strong> describe la pureza de Su esencia y Su separación total del mal. La <strong>justicia</strong> es esa santidad actuando sobre la creación: juzgando, gobernando, retribuyendo.</p>

                            <p>Es importante no separar la justicia del amor. Un error común es imaginarlos como fuerzas opuestas dentro de Dios, como si Su corazón estuviera dividido entre castigar y perdonar. Pero la Escritura no presenta ese conflicto. El amor de Dios no es una debilidad que hace la vista gorda ante el pecado. Es un amor justo que provee el medio para satisfacer las demandas de Su propia ley y así poder perdonar al amado. Como principio central de esta serie: amar no es hacer sentir bien a alguien, sino conducirlo hacia el bien que Dios define. Y la justicia divina es la medida permanente de ese bien.</p>

                            <p>Los teólogos distinguen dos dimensiones de esta perfección:</p>

                            <ul>
                                <li><strong>Rectitud moral absoluta:</strong> la justicia de Dios en Sí mismo; Su perfección ética eterna, independiente de la creación.</li>
                                <li><strong>Justicia retributiva:</strong> la aplicación de esa rectitud al tratar con el pecado, exigiendo que este reciba su consecuencia proporcional.</li>
                            </ul>

                            <p>A diferencia de la justicia humana —parcial, ignorante, corruptible—, la justicia de Dios es perfecta porque descansa en un conocimiento omnisciente de cada corazón y cada acto.</p>
                        </div>
                    </div>

                    {/* Sección 2 */}
                    <div id="c5-s2" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            2. Cómo se revela en la Escritura
                        </h2>
                        <div className="teologia-content">
                            <p>La Biblia no argumenta la justicia de Dios; la proclama y la celebra.</p>

                            <blockquote>
                                «El Juez de toda la tierra, ¿no ha de hacer lo que es justo?»
                                <br /><em>— Génesis 18:25</em>
                            </blockquote>

                            <p>Abraham hace esta pregunta antes de interceder por Sodoma. No está cuestionando a Dios; está descansando en Su carácter. Es la fe que apela a quien Dios ya es. El texto supone lo que la historia confirmará: Dios no puede actuar de manera injusta porque hacerlo sería contradecir Su propia naturaleza.</p>

                            <blockquote>
                                «Justicia y juicio son el cimiento de tu trono.»
                                <br /><em>— Salmo 89:14</em>
                            </blockquote>

                            <p>El gobierno de Dios no es arbitrario. Su reino se levanta sobre una base moral inquebrantable. Los Salmos 9 y 145 celebran a un Dios que vindica al inocente, que conoce el clamor del pobre, que no puede ser sobornado ni engañado. <strong>Deuteronomio 32:4</strong> lo sintetiza: <em>«Dios de verdad, sin ninguna iniquidad en Él; es justo y recto.»</em></p>

                            <p>En el Nuevo Testamento, la justicia de Dios se revela con mayor profundidad —y mayor urgencia. <strong>Romanos 1–3</strong> establece que la ira de Dios se revela desde el cielo contra toda impiedad. Pablo construye un argumento demoledor: tanto gentiles como judíos son culpables ante el tribunal divino. Ningún esfuerzo humano puede satisfacer las exigencias de un Dios perfectamente justo.</p>

                            <p>Pero entonces llega el centro del Evangelio: <strong>Romanos 3:25-26.</strong></p>

                            <blockquote>
                                «A quien Dios puso como propiciación por medio de la fe en su sangre... para manifestar su justicia... a fin de que él sea el justo, y el que justifica al que es de la fe de Jesús.»
                                <br /><em>— Romanos 3:25-26</em>
                            </blockquote>

                            <p>Aquí la justicia y la gracia no se anulan mutuamente; se encuentran. La justicia de Dios no fue sacrificada para que el pecador pudiera ser perdonado. Fue satisfecha. Y eso cambia todo.</p>

                            <p>La justicia también está entretejida con el concepto de pacto. Dios es fiel a Su palabra. Cuando juzga, cumple lo que prometió. Cuando salva, también cumple lo que prometió. La gracia no es la suspensión de la justicia, sino el regalo inmerecido de que Dios mismo haya provisto la satisfacción que Su justicia exige.</p>
                        </div>
                    </div>

                    {/* Sección 3 */}
                    <div id="c5-s3" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            3. Cómo se ve en Cristo
                        </h2>
                        <div className="teologia-content">
                            <p>La cruz es el evento donde la justicia de Dios y Su amor redentor no se contradicen, sino que se abrazan.</p>

                            <p>En la cruz, Dios no suspendió Su justicia para poder perdonar. La ejecutó plenamente. El pecado fue castigado. La ley fue cumplida. La deuda fue pagada. Y fue el propio Hijo de Dios quien lo hizo posible.</p>

                            <p><strong>Cristo como propiciación.</strong> La palabra griega <em>hilasterion</em> que aparece en Romanos 3:25 es la misma usada en la traducción griega del Antiguo Testamento para el propiciatorio del arca del pacto: el lugar donde la sangre del sacrificio era derramada ante la presencia de Dios. Cristo no solo cargó con nuestro pecado; satisfizo y apartó la ira personal de Dios contra ese pecado. El creyente no vive bajo una ira divina contenida. Vive bajo la paz de un Juez que ya ha dictado sentencia, y la sentencia fue ejecutada sobre Otro.</p>

                            <p><strong>El justo por los injustos.</strong> Primera de Pedro 3:18 lo expresa sin rodeos: <em>«Cristo también padeció una sola vez por los pecados, el justo por los injustos, para llevarnos a Dios.»</em> No murió como ejemplo moral. Murió como sustituto penal, cargando la maldición de la ley que nosotros merecíamos.</p>

                            <p><strong>La imputación: el admirable intercambio.</strong> La justicia de Dios resuelve la tensión mediante un acto de gracia radical:</p>

                            <ol>
                                <li>Nuestros pecados fueron imputados —cargados legalmente— a la cuenta de Cristo.</li>
                                <li>La justicia perfecta de Cristo fue imputada —acreditada— a nuestra cuenta.</li>
                            </ol>

                            <p>El resultado es que el creyente es constituido legalmente justo, no por su bondad interna, sino por estar <em>en Cristo</em>. La justicia que Dios exige es la misma justicia que Dios provee.</p>
                        </div>
                    </div>

                    {/* Sección 4 */}
                    <div id="c5-s4" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            4. Cómo transforma al creyente
                        </h2>
                        <div className="teologia-content">

                            <h4>La seguridad del que ha sido justificado</h4>
                            <p>El conocimiento de la justicia de Dios es una de las mayores fuentes de paz espiritual. Si Dios es justo, y Cristo ya pagó completamente la deuda del creyente, Dios no puede exigir ese pago dos veces. No por incapacidad, sino porque su propia justicia lo impide.</p>

                            <blockquote>
                                «Ninguna condenación hay para los que están en Cristo Jesús.»
                                <br /><em>— Romanos 8:1</em>
                            </blockquote>

                            <p>Esta no es poesía religiosa. Es una sentencia legal. El Juez Supremo ya ha dictado el fallo. La causa está cerrada. No hay apelación posible porque no hay irregularidad en el proceso: el precio fue pagado, la justicia fue satisfecha, el caso fue resuelto.</p>

                            <p>Esto transforma la vida espiritual de adentro hacia afuera. Ya no vivimos tratando de obtener la aprobación de un Dios que nos mira con desconfianza. Vivimos desde la seguridad de una adopción que no depende de nuestro rendimiento sino de la justicia de Otro.</p>

                            <h4>El llamado a reflejar Su justicia</h4>
                            <p>Ser justificados produce santificación. El creyente que comprende lo que fue hecho por él no puede permanecer indiferente ante la injusticia en el mundo. Miqueas 6:8 resume el llamado: <em>«Solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios.»</em></p>

                            <p>La pregunta que gobierna la vida ya no es únicamente «¿qué me conviene?» o «¿qué me agrada?», sino «¿qué es justo y recto ante el Dios que me salvó?». El creyente justificado busca honestidad en sus tratos, integridad en sus compromisos, y defensa del débil y del vulnerable, no como condición para ser amado por Dios, sino como fruto de quien ya lo es.</p>

                            <h4>La paz ante la injusticia del mundo</h4>
                            <p>Vivir bajo un Dios justo también transforma la manera en que respondemos al sufrimiento injusto.</p>

                            <p>Cuando la injusticia parece triunfar, cuando el inocente es condenado y el culpable prospera, la tentación es tomar la justicia por mano propia o caer en la amargura. Pero el creyente tiene una alternativa que el mundo no comprende: encomendar su causa al que juzga justamente. Como Cristo, que ante el sufrimiento injusto <em>«se encomendaba al que juzga justamente»</em> (1 Pedro 2:23).</p>

                            <p>El juicio final no es una amenaza vacía. Es la garantía de que el mal no tendrá la última palabra. Romanos 2:6 lo afirma: Dios <em>«pagará a cada uno conforme a sus obras.»</em> Esa certeza no produce venganza; produce descanso. Hay un Juez que no puede ser comprado ni engañado, que conoce cada secreto y que, en el tiempo que Él ha fijado, hará justicia perfecta.</p>

                            <blockquote>
                                «¿Puede un Dios justo justificar al pecador? Solo a través de un Sustituto Divino. Esto dice de Dios que Su santidad es tan alta que no puede ser ignorada, pero Su amor es tan profundo que Él mismo pagó el precio. De nosotros dice que somos tan pecadores que nada menos que la muerte del Hijo de Dios podía salvarnos, pero tan amados que Dios prefirió esa muerte antes que vernos perdidos.»
                            </blockquote>

                            <p>La vida del creyente, entonces, no es la de alguien que teme a un juez severo, sino la de alguien que ha sido declarado inocente por ese mismo Juez, a un costo que él jamás podría haber pagado. Esa es la justicia de Dios: no una fuerza que aplasta, sino la roca sobre la que descansa nuestra salvación.</p>

                            <blockquote>
                                «Justicia y juicio son el cimiento de su trono.»
                                <br /><em>— Salmo 89:14</em>
                            </blockquote>

                            <p className="text-sm text-sabiduria-gray text-center mt-10">Serie: Las Perfecciones de Dios · Capítulo 5 de 14 · Sabiduría para el Corazón</p>
                        </div>
                    </div>

                </article>

                {/* Navegación entre capítulos */}
                <div className="pt-8 border-t border-sabiduria-gray/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <Link
                        to="/estudio/perfecciones-de-dios/capitulo-4"
                        className="inline-flex items-center gap-2 text-sabiduria-navy hover:text-sabiduria-gold font-medium transition-colors"
                    >
                        <ArrowLeft size={18} /> Capítulo 4 — La Inmutabilidad
                    </Link>
                    <div className="text-sm text-sabiduria-gray italic">
                        Capítulo 6 — Próximamente
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PerfeccionesCapitulo5;
