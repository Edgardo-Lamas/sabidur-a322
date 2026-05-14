import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const sections = [
    { id: 'c4-s1', title: '1. Qué significa esta perfección de Dios' },
    { id: 'c4-s2', title: '2. Cómo se revela en la Escritura' },
    { id: 'c4-s3', title: '3. Cómo se ve en Cristo' },
    { id: 'c4-s4', title: '4. Cómo transforma al creyente' },
];

const PerfeccionesCapitulo4 = () => {
    const handleDownloadPDF = () => {
        window.print();
    };

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title="La Inmutabilidad de Dios — Las Perfecciones de Dios · Capítulo 4"
                description="¿Qué significa que Dios no cambie? El cuarto capítulo explora la inmutabilidad: su significado teológico, su revelación en la Escritura, su expresión en Cristo y su poder para anclar el alma en medio de la inestabilidad."
                url="/estudio/perfecciones-de-dios/capitulo-4"
            />
            <div className="max-w-4xl mx-auto px-4 pt-8">
                <Breadcrumbs title="La Inmutabilidad de Dios — Capítulo 4" />
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">

                {/* Header del capítulo */}
                <header className="mb-12 pb-8 border-b border-sabiduria-gray/20">
                    <Link
                        to="/estudio/perfecciones-de-dios"
                        className="inline-flex items-center gap-2 text-sabiduria-gold text-sm font-bold uppercase tracking-widest mb-6 hover:opacity-75 transition-opacity"
                    >
                        Las Perfecciones de Dios · Capítulo 4 de 14
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-serif text-sabiduria-navy mb-3 leading-tight">
                        La Inmutabilidad de Dios
                    </h1>
                    <p className="text-2xl font-serif text-sabiduria-gold">
                        El que es el mismo ayer, hoy y por los siglos
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
                    <div id="c4-s1" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            1. Qué significa esta perfección de Dios
                        </h2>
                        <div className="teologia-content">
                            <p>Vivimos en un mundo que celebra el cambio. Los líderes cambian de postura, las personas cambian de carácter, las instituciones cambian de rumbo. En ese contexto, decir que Dios no cambia puede sonar a rigidez o a indiferencia. Pero la inmutabilidad de Dios no es una limitación: es una de las más grandes noticias del universo.</p>

                            <p>La inmutabilidad es aquella perfección por la cual Dios permanece idéntico a sí mismo en su ser, en sus atributos, en sus propósitos y en sus promesas. No crece, no disminuye, no evoluciona, no se deteriora. Lo que Dios es hoy, lo ha sido siempre, y lo será eternamente. Su carácter no fluctúa según las circunstancias, su voluntad no es inestable, y su amor no depende de nuestro rendimiento.</p>

                            <p>Esta verdad está anclada en la naturaleza misma de Dios. Él es <em>a se</em> —existe de sí mismo, sin depender de nada externo—, y su ser es simple, no compuesto de partes que puedan reorganizarse. Si Dios pudiera cambiar, habría solo dos posibilidades: mejorar, lo que implicaría que antes no era perfectamente bueno; o empeorar, lo que significaría que dejó de serlo. Ninguna de las dos es posible. Por eso la inmutabilidad no es un capricho teológico, sino una consecuencia lógica de la perfección divina.</p>

                            <p>Ahora bien, es crucial distinguir la inmutabilidad de la inmovilidad. Dios actúa en la historia, responde a la oración, se relaciona con sus criaturas. Lo que no cambia es su esencia, su carácter y su propósito eterno. Lo que cambia, cuando parece que Dios «reacciona», somos nosotros: nuestra posición frente a Él, nuestra conducta, nuestra respuesta a su llamado. Dios es, como lo describió la tradición teológica, <em>actus purus</em> —pura acción y vitalidad infinita— sin que esa actividad implique cambio en lo que Él es.</p>
                        </div>
                    </div>

                    {/* Sección 2 */}
                    <div id="c4-s2" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            2. Cómo se revela en la Escritura
                        </h2>
                        <div className="teologia-content">
                            <p>La Biblia no presenta la inmutabilidad de Dios como un concepto abstracto para filósofos. La proclama como el fundamento de la confianza del pueblo de Dios en medio de la historia.</p>

                            <blockquote>
                                «Porque yo Jehová no cambio; por esto, hijos de Jacob, no habéis sido consumidos.»
                                <br /><em>— Malaquías 3:6</em>
                            </blockquote>

                            <p>Esta es quizás la declaración más directa de toda la Escritura. Y nótese el contexto: Dios no dice que no cambia para impresionar a los teólogos. Lo dice como razón de la supervivencia de Israel. La nación había fallado repetidamente, pero Dios no abandonó su pacto porque su naturaleza no lo permite. La inmutabilidad divina es literalmente la razón por la que el pueblo de Dios existe.</p>

                            <blockquote>
                                «Dios no es hombre, para que mienta, ni hijo de hombre para que se arrepienta. Él dijo, ¿y no hará? Habló, ¿y no lo ejecutará?»
                                <br /><em>— Números 23:19</em>
                            </blockquote>

                            <blockquote>
                                «Toda buena dádiva y todo don perfecto desciende de lo alto, del Padre de las luces, en el cual no hay mudanza, ni sombra de variación.»
                                <br /><em>— Santiago 1:17</em>
                            </blockquote>

                            <blockquote>
                                «Ellos perecerán, mas tú permanecerás; y todos ellos como una vestidura se envejecerán... pero tú eres el mismo, y tus años no se acabarán.»
                                <br /><em>— Salmo 102:26-27</em>
                            </blockquote>

                            <p>En el Antiguo Testamento, esta perfección está vinculada al nombre de Dios: <em>Yahvé</em>, que significa «Yo Soy el que Soy». No «Yo era» ni «Yo seré», sino «Yo Soy»: existencia constante, sin fluctuación. Y esa constancia es el fundamento de su fidelidad al pacto. Israel rompe el pacto; Dios no. Israel olvida; Dios recuerda. La asimetría no es debilidad del pueblo solamente —es la fortaleza del Dios que no cambia.</p>

                            <p>El Nuevo Testamento confirma y profundiza esta verdad. Hebreos afirma que los dones y el llamamiento de Dios son irrevocables. El propósito redentor de Dios no es una improvisación histórica; es la ejecución de un plan eterno que no se altera. La salvación descansa sobre la constancia de Dios, no sobre la nuestra.</p>

                            <h4>Una pregunta legítima</h4>
                            <p>¿Qué hacemos con los pasajes que dicen que Dios «se arrepintió» de algo, como en Génesis 6:6 o Jonás 3:10? La respuesta es que esos textos usan lo que los teólogos llaman <em>antropopatismos</em> —lenguaje humano para describir la acción de Dios desde nuestra perspectiva—. Lo que cambia en esos casos no es Dios, sino la situación del ser humano frente a Él. Cuando el pecador se arrepiente, cambia la forma en que experimenta a Dios. El Dios inmutable responde de manera coherente con su carácter santo: perdona al que se humilla, resiste al que persiste en el orgullo. Eso no es cambio en Dios; es consistencia perfecta.</p>

                            <p>La inmutabilidad sostiene todos los demás atributos: su amor es amor eterno, su justicia no se negocia, su verdad no se relativiza, su soberanía no fluctúa. Como escribe Louis Berkhof, la inmutabilidad califica todas las demás perfecciones divinas. Es el suelo sobre el que se para todo lo demás que Dios es.</p>
                        </div>
                    </div>

                    {/* Sección 3 */}
                    <div id="c4-s3" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            3. Cómo se ve en Cristo
                        </h2>
                        <div className="teologia-content">
                            <p>Si quisiéramos ver la inmutabilidad de Dios con ojos, la veríamos en Jesucristo.</p>

                            <blockquote>
                                «Jesucristo es el mismo ayer, y hoy, y por los siglos.»
                                <br /><em>— Hebreos 13:8</em>
                            </blockquote>

                            <p>Esta declaración no es solo una frase de consuelo para imprimir en calendarios. Es una afirmación teológica de primera magnitud: el Jesús que caminó por Galilea, que perdonó pecados, que resucitó de entre los muertos, es el mismo que intercede hoy, y el mismo que reinará para siempre. No hay versión actualizada de Cristo. No hay Jesús 2.0. El que fue es el que es.</p>

                            <p>La encarnación podría parecer una contradicción: si Dios es inmutable, ¿cómo puede hacerse hombre? Pero la encarnación no fue un cambio en la naturaleza divina, sino la asunción de una naturaleza humana. El Hijo no dejó de ser Dios; se dio a conocer plenamente en forma humana. Dios no cambió lo que era; añadió lo que no tenía. Y esa distinción es crucial.</p>

                            <p>En la vida de Jesús vemos la inmutabilidad divina convertida en conducta. Sus palabras coinciden con su carácter. Sus obras reflejan su naturaleza. No hay doblez, no hay contradicción entre lo que dice y lo que hace, entre lo que promete y lo que cumple. Una vida perfectamente consistente, de principio a fin.</p>

                            <p>La cruz es quizás donde esto se ve con mayor claridad. La muerte de Cristo no fue una reacción de Dios ante una situación inesperada. Fue la ejecución de un plan trazado antes de la fundación del mundo. Pedro lo dice en Hechos 2:23: fue entregado «por el determinado consejo y anticipado conocimiento de Dios». El amor, la justicia y la gracia que se manifiestan en el Calvario no son improvisación. Son el despliegue de un propósito eterno e inmutable.</p>

                            <p>Y hoy, resucitado y glorificado, Cristo intercede por los suyos «para siempre» (Hebreos 7:25). Su sacerdocio no caduca, su amor no se agota, su presencia no falla. El creyente no depende de un Salvador que pueda cambiar de parecer o cansarse. Depende del que permanece para siempre.</p>
                        </div>
                    </div>

                    {/* Sección 4 */}
                    <div id="c4-s4" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            4. Cómo transforma al creyente
                        </h2>
                        <div className="teologia-content">

                            <h4>El desafío de nuestra propia inconsistencia</h4>
                            <p>Antes de hablar del consuelo que trae la inmutabilidad de Dios, hay que dejar que nos confronte. Somos criaturas inconsistentes: prometemos y fallamos, comenzamos con fervor y nos enfriamos, creemos con convicción y luego dudamos. Hay una brecha dolorosa entre quiénes queremos ser y quiénes somos en realidad.</p>

                            <p>Conocer a un Dios inmutable nos pone frente a un espejo. Nos confronta con nuestra mutabilidad, con lo fácil que cambiamos según el viento de las circunstancias o las modas espirituales. Y nos invita a algo más: a crecer hacia la firmeza, a desarrollar una fe que no dependa del clima emocional del momento.</p>

                            <p>El creyente es llamado a reflejar, en su medida y progresivamente, esa constancia. No como perfección propia, sino como fruto de una vida transformada por el Espíritu. La firmeza en la obediencia, la lealtad en el compromiso, la perseverancia en la fe —todo ello es una imitación criatural del Dios que no cambia.</p>

                            <h4>El ancla del alma</h4>
                            <p>Pero la inmutabilidad de Dios no es solo un desafío moral. Es una de las verdades más consoladoras de toda la Escritura.</p>

                            <p>Vivimos en un mundo donde todo cambia. Las personas cambian sus afectos. Las promesas se rompen. Los planes se frustran. Los que amamos enferman o se van. Las instituciones en las que confiábamos decepcionan. En ese torrente de inestabilidad, el creyente tiene un punto fijo: un Dios que no cambia.</p>

                            <p>Charles Ryrie lo sintetiza con precisión pastoral: la eternidad e inmutabilidad de Dios nos dan la certidumbre de que su control providencial sobre todas las cosas está garantizado. No es un Dios que estaba atento ayer pero hoy está distraído. No es un Dios que fue misericordioso en el pasado pero hoy está irritado. Lo que Dios es, lo es siempre. Y lo que Dios ha prometido en Cristo, permanece.</p>

                            <p>Esto significa que el creyente no necesita preguntarse si encontrará a Dios de buen humor. No necesita ganarse su favor cada día desde cero. En Cristo, la disposición de Dios hacia el que viene con fe es siempre gracia y misericordia —no porque las circunstancias lo ameriten, sino porque Dios es lo que es, y no puede dejar de serlo.</p>

                            <h4>La obra del Espíritu Santo</h4>
                            <p>¿Cómo se produce en nosotros esta estabilidad que tanto necesitamos? No por esfuerzo propio. El Espíritu Santo, que habita en el creyente, es el agente de su transformación. Él sostiene cuando la fe tiembla, afirma cuando la duda presiona, y conforma progresivamente al creyente a la imagen de Cristo —que es el mismo por los siglos.</p>

                            <p>La vida cristiana deja de ser una oscilación constante entre la euforia y el desánimo, y comienza a tomar la forma de la perseverancia. No porque el creyente sea fuerte, sino porque está anclado a un Dios que no cambia.</p>

                            <h4>Una palabra para hoy</h4>
                            <p>Las circunstancias que enfrentas hoy —la relación que se deterioró, el sueño que no se cumplió, la prueba que no esperabas— no tomaron a Dios por sorpresa. Su amor hacia ti no disminuyó por lo que ocurrió. Su propósito contigo no fue cancelado por lo que fallaste.</p>

                            <p>Porque Dios no cambia, sus promesas siguen en pie. Porque Dios no cambia, su gracia sigue disponible. Porque Dios no cambia, tú puedes levantarte hoy con la misma confianza con que comenzaste, y seguir.</p>

                            <blockquote>
                                «Los que esperan en Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.»
                                <br /><em>— Isaías 40:31</em>
                            </blockquote>

                            <p className="text-sm text-sabiduria-gray text-center mt-10">Serie: Las Perfecciones de Dios · Capítulo 4 de 14 · Sabiduría para el Corazón</p>
                        </div>
                    </div>

                </article>

                {/* Navegación entre capítulos */}
                <div className="pt-8 border-t border-sabiduria-gray/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <Link
                        to="/estudio/perfecciones-de-dios/capitulo-3"
                        className="inline-flex items-center gap-2 text-sabiduria-navy hover:text-sabiduria-gold font-medium transition-colors"
                    >
                        <ArrowLeft size={18} /> Capítulo 3 — La Santidad
                    </Link>
                    <Link
                        to="/estudio/perfecciones-de-dios/capitulo-5"
                        className="inline-flex items-center gap-2 text-sabiduria-navy hover:text-sabiduria-gold font-medium transition-colors"
                    >
                        Capítulo 5 — La Justicia de Dios <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default PerfeccionesCapitulo4;
