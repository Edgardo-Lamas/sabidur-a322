import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const SedymModulo3 = () => {
    const [expandedClasses, setExpandedClasses] = useState({});

    const toggleClass = (id) => {
        setExpandedClasses(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const expandAll = () => {
        const allExpanded = {};
        [...classesPracticas, ...clasesTeologicas].forEach(c => {
            allExpanded[c.id] = true;
        });
        setExpandedClasses(allExpanded);
    };

    const collapseAll = () => {
        setExpandedClasses({});
    };

    const handleDownloadPDF = () => {
        expandAll();
        setTimeout(() => {
            window.print();
        }, 300);
    };

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title="SEDYM Módulo 3 - Curso de Formación Cristiana"
                description="Curso de formación cristiana sobre liderazgo en células, doctrina de la Iglesia, autoridad espiritual y consolidación."
                url="/estudio/sedym-modulo-3"
            />
            <div className="max-w-4xl mx-auto px-4 pt-8">
                <Breadcrumbs title="SEDYM Módulo 3" />
            </div>

            <div id="sedym-content" className="max-w-4xl mx-auto px-4 py-8">
                <header className="text-center mb-12 pb-8 border-b border-sabiduria-gray/20">
                    <h1 className="text-4xl md:text-5xl font-serif text-sabiduria-navy mb-4">SEDYM</h1>
                    <p className="text-2xl font-serif text-sabiduria-gold mb-2">Módulo 3</p>
                    <p className="text-sabiduria-gray text-lg">Curso de Formación Cristiana</p>
                </header>

                <div className="flex flex-wrap gap-4 justify-center mb-8 print:hidden">
                    <button onClick={handleDownloadPDF} className="btn-pdf-discrete flex items-center gap-2">
                        <Download size={18} /> Descargar PDF
                    </button>
                    <button onClick={expandAll} className="btn-pdf-discrete">Expandir Todo</button>
                    <button onClick={collapseAll} className="btn-pdf-discrete">Colapsar Todo</button>
                </div>

                <nav className="bg-white p-6 mb-12 border border-sabiduria-gray/10 shadow-sm">
                    <h2 className="text-xl font-serif text-sabiduria-navy mb-4 flex items-center gap-2">
                        <BookOpen size={20} className="text-sabiduria-gold" /> Índice del Curso
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-bold text-sabiduria-navy mb-2 uppercase text-sm tracking-wider">Parte Práctica</h3>
                            <ul className="space-y-1 text-sm">
                                {classesPracticas.map(c => (
                                    <li key={c.id}><a href={`#${c.id}`} className="text-sabiduria-gray hover:text-sabiduria-gold transition-colors">{c.title}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-sabiduria-navy mb-2 uppercase text-sm tracking-wider">Parte Teológica</h3>
                            <ul className="space-y-1 text-sm">
                                {clasesTeologicas.map(c => (
                                    <li key={c.id}><a href={`#${c.id}`} className="text-sabiduria-gray hover:text-sabiduria-gold transition-colors">{c.title}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>

                <section className="mb-16">
                    <h2 className="text-3xl font-serif text-sabiduria-navy text-center mb-8 pb-4 border-b-2 border-sabiduria-gold">PARTE PRÁCTICA</h2>
                    {classesPracticas.map(clase => (
                        <ClassSection key={clase.id} clase={clase} isExpanded={expandedClasses[clase.id]} onToggle={() => toggleClass(clase.id)} />
                    ))}
                </section>

                <section>
                    <h2 className="text-3xl font-serif text-sabiduria-navy text-center mb-8 pb-4 border-b-2 border-sabiduria-gold">PARTE TEOLÓGICA</h2>
                    {clasesTeologicas.map(clase => (
                        <ClassSection key={clase.id} clase={clase} isExpanded={expandedClasses[clase.id]} onToggle={() => toggleClass(clase.id)} />
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

const ClassSection = ({ clase, isExpanded, onToggle }) => (
    <article id={clase.id} className="mb-6 bg-white border border-sabiduria-gray/10 shadow-sm">
        <button onClick={onToggle} className="w-full p-6 flex justify-between items-center text-left hover:bg-sabiduria-bg/50 transition-colors">
            <h3 className="text-xl font-serif text-sabiduria-navy">{clase.title}</h3>
            {isExpanded ? <ChevronUp className="text-sabiduria-gold" /> : <ChevronDown className="text-sabiduria-gray" />}
        </button>
        {isExpanded && (
            <div className="px-6 pb-6 text-outline" dangerouslySetInnerHTML={{ __html: clase.content }} />
        )}
    </article>
);

// CLASES PRÁCTICAS
const classesPracticas = [
    {
        id: 'clase-p1',
        title: 'Clase 1: Valores Esenciales del Cristiano (Parte 1)',
        content: `<p><strong>INTRODUCCIÓN:</strong> A lo largo de las próximas dos clases veremos qué valores son necesarios para ser imitadores de Cristo. En esta primera clase hablaremos acerca de los dos primeros valores que esperamos en un cristiano comprometido con Jesús.</p>
<h4>A- LA ESPIRITUALIDAD</h4>
<p>De la misma forma que un gran edificio debe estar sostenido por grandes columnas, todo cristiano que quiera crecer debe estar fundamentado con pilares que lo mantengan firme. El valor de la espiritualidad parece un valor muy subjetivo, muy abstracto, muy intangible, entonces... ¿Cómo hago práctica la espiritualidad?</p>
<p><strong>1- La espiritualidad es poner en ........</strong></p>
<p>Poner el espíritu en primer lugar significa que ahora el alma y el cuerpo van a estar debajo de lo que importa espiritualmente en nuestras vidas. Esto no quiere decir que dejemos a un lado nuestras responsabilidades tales como ir a trabajar, cuidar nuestro cuerpo, atender a nuestra familia, sino que por el contrario es poner nuestra vida en oración para que luego, podamos cumplir nuestras obligaciones llenos del Señor.</p>
<p><strong>2- La espiritualidad es un firme ........</strong></p>
<p>Job 29:6. La Biblia habla de estar constantemente "lavando nuestros pasos". Esto es porque nos vamos ensuciando en el caminar cotidiano, con cosas que nos pasan, con cuestiones que escuchamos, con cosas que hacemos o decimos. Lavarnos significa arrepentirnos. La palabra que recibimos de parte de Dios nos lava, nos confronta y nos provoca arrepentimiento.</p>
<p><strong>3- La espiritualidad es un anhelo ........</strong></p>
<p>Todos anhelamos que Dios visite nuestras vidas, nuestros hogares, nuestras familias, nuestras células, la iglesia. El anhelo por el avivamiento marca una de las características de un hombre espiritual que en su oración dice: ¡Señor todos los días de mi vida yo voy a esperar que nos visites con un avivamiento!</p>
<h4>B- ACTITUD POSITIVA</h4>
<p>Definitivamente ser personas positivas será uno de los secretos en la vida cristiana. Tanto el tener una actitud positiva o negativa se adquiere y luego se desarrolla. No es fácil cuando cargamos con la mochila de un pasado negativo, tal vez provenimos de una familia en la que habitualmente se remarcaba "el vaso medio vacío". ¿Cómo se desarrolla una actitud positiva?</p>
<p><strong>1- Cambiando nuestra manera de ........</strong></p>
<p>La palabra de Dios es esencial para que esto se logre. Reemplazar pensamientos negativos por pensamientos de Dios. Esto lo podemos lograr llenándonos de su Palabra. Filipenses 4:13 / 1 Samuel 17:33. Debemos pensar menos en los problemas y más en las soluciones, buscar siempre el lado positivo en todas las cosas.</p>
<p><strong>2- Cambiar nuestra manera de ........</strong></p>
<p>Existen personas que a flor de piel usan expresiones tales como: "no se puede"; "es imposible"; "esto es demasiado"; "nunca lo voy a alcanzar". Estas palabras bloquearán el don que Dios nos ha dado, la salida a todos nuestros problemas y desatará un espíritu de desesperación. Qué diferente es creer y declarar que Dios siempre me ayudará a encontrar la salida. Génesis 22:5. Si queremos conocer cuál es el grado de negatividad en nuestras vidas, sólo debemos prestar atención a los dichos que salen de nuestra boca.</p>
<p><strong>3- Cambiar nuestra manera de ........</strong></p>
<p>Esto implica muchas veces negar nuestra propia naturaleza que nos dice: "no vayas, no vale la pena, quedate en casa". Cuando usted realmente no quiera o no sienta hacer lo que hay que hacer, hágalo y luego sentirá hacerlo. La actitud positiva nos lleva a hacer las cosas igual y a hacerlas de buena gana. Hace que descubramos la alegría de la vida, en lo cotidiano.</p>
<p>En marzo de 1992, la revista Florida Trend contenía un artículo sobre el humor en el trabajo escrito por la consultora Leslie Gibson. Ella dice que, como promedio, un niño de cuatro años de edad ríe 400 veces al día, mientras que los adultos solo ríen de 15 a 16 veces. La alegría estimula la creatividad, la alegría nos relaja para enfrentar las responsabilidades diarias.</p>
<p>El propósito de todo esto es ayudarnos a crecer. La buena noticia es que Dios estará con nosotros. Para cada problema Dios ha preparado una salida.</p>
<p><strong>CONCLUSIÓN:</strong> Si deseamos ver una Nación transformada por el poder de Dios debemos orar por ello, pero teniendo un fuerte compromiso en nuestra santidad y en la búsqueda constante de Dios. Dios nos ayudará a:</p>
<ul>
<li><strong>Descubrir nuestras ........</strong> Dios a cada uno nos ha dado fortalezas, puntos fuertes. Descubrir cuál es el don que Dios nos dio y concentrarnos en eso.</li>
<li><strong>Controlar los ........</strong> Concentrarnos siempre en las soluciones, no en los problemas.</li>
<li><strong>Desarrollar la ........</strong> Es la actitud de no abandonar hasta alcanzar la meta.</li>
</ul>
<p>Tomar las adversidades no como un complot de la vida en su contra sino como oportunidades para crecer.</p>`
    },
    {
        id: 'clase-p2',
        title: 'Clase 2: Valores Esenciales del Cristiano (Parte 2)',
        content: `<p><strong>INTRODUCCIÓN:</strong> En esta segunda clase hablaremos acerca de los otros dos valores que esperamos en un cristiano comprometido con Jesús.</p>
<h4>A- ........</h4>
<p>El primer valor que veremos es el de tener una visión amplia, una visión sin límites, una visión que proviene de Dios. Hechos 2:17. Dios quiere desafiarnos a que nunca dejemos de soñar.</p>
<p><strong>1- Una visión ........</strong></p>
<p>Aquel que posee una visión ilimitada es el que por ejemplo estudia en la facultad y cuando va caminando por los pasillos, sueña con esa facultad que va a ser totalmente para Cristo. Es aquel que sueña y cuando se baja del colectivo camina esa cuadra para llegar a su casa y piensa: "Yo sé que llegará el día en que mi barrio será todo para Jesucristo". De esos sueños son los que Dios quiere que nos llenemos. Esto significa seguir creyéndole a Dios.</p>
<p>Es la persona que cree y trabaja para traer gente nueva a la célula o al culto, cada semana. ¿Qué visión estamos teniendo hoy? ¿Estamos teniendo la visión que tiene Dios? Que aun lo malo puede convertirse en bendición...</p>
<p><strong>2- Todo comienza por ........</strong></p>
<p>Todo aquel que quiera crecer deberá tener sueños grandes. ¿Cuál es el sueño que te consume? De cierto, si perseveras, Dios lo cumplirá.</p>
<h4>B- ........</h4>
<p>Es el valor que implica un esfuerzo perseverante. Es la persona que lo entrega todo, que ha resignado de sí mismo, de su tiempo, de su vida en pos de la visión y del llamado que Dios le entregó.</p>
<p>2ª Corintios 12:14-15. Pablo sabía que sin trabajo fuerte no se alcanzaría nada. Pablo sabía que sin sacrificio no llegaría a cumplir el propósito de Dios. El corazón de Pablo estaba entregado a tal punto de dar su propia vida, si hubiera sido necesario...</p>
<p>La entrega total es dar todo en las pequeñas y en las grandes cosas:</p>
<p><strong>1- EN LAS ........</strong></p>
<p>La mayoría de las personas creen que el conocido Thomas Edison era un genio creativo. Esto lo demostró en el trabajo duro. "Genio", decía él, "es 99% de transpiración y 1% de inspiración". El esfuerzo que dediquemos en lo cotidiano será fundamental para que veamos frutos a corto y a largo plazo.</p>
<p><strong>2- EN LAS ........</strong></p>
<p>Es imposible alcanzar algo en la vida si no es con sacrificio y esfuerzo. Y cuanto mayor es la posición en el liderazgo o en lo que anhelemos obtener, mayor debe de ser la entrega.</p>
<p>Algunas personas quieren alcanzar éxito en la vida sin esforzarse o sin experimentar antes golpes y fracasos. Todos hemos experimentado "la caída". Es lo que hacemos después de ella, lo que hace la diferencia. Muchas veces esto es lo que separa a las personas que obtienen grandes logros, de las que no logran nada en la vida.</p>
<p><strong>CONCLUSIÓN:</strong> "La cosecha ya está preparada". Debemos comprender que tenemos una cita divina, un compromiso con Dios, porque las almas están preparadas. Argentina está preparada. "Los campos ya están listos" lo que Dios está necesitando son soñadores, hombres y mujeres que le crean y que le digan: "Señor yo no tengo mucho, pero lo que voy a recibir es un sueño tuyo. Yo te voy a creer, voy a soñar, yo lo voy a ver, yo voy a ver Argentina transformada por el poder de tu evangelio".</p>`
    },
    {
        id: 'clase-p3',
        title: 'Clase 3: Beneficios de los Grupos Pequeños',
        content: `<p><strong>INTRODUCCIÓN:</strong> El crecimiento constante de la iglesia genera que se pierda contacto con la gente nueva. Pueden venir un domingo y a la otra semana faltar y no nos vamos a dar cuenta. Para suplir esta necesidad es fundamental la labor de las células. Nombraremos algunos beneficios de este trabajo.</p>
<h4>A- ........</h4>
<h4>B- ........</h4>
<p><strong>1- La importancia de conocer el nombre de cada uno</strong></p>
<p>El grupo pequeño permite conocer directamente a cada uno de los que lo integran y que el nuevo conozca gente de la iglesia y que a su vez sienta que lo conocen por nombre, que no es simplemente uno más sino que saben su nombre.</p>
<p><strong>2- Desarrollo de potencialidades</strong></p>
<p>Además de conocer a cada uno por nombre, sus necesidades, su familia, etc., también nos permite descubrir talentos o habilidades que pueden ser utilizados para edificación de la iglesia (canto, literatura, electricidad, música, etc.) y para crecimiento de la persona.</p>
<p>Gálatas 6:2 - Santiago 5:16. También la célula es el lugar propicio para conocer las necesidades de cada uno de los integrantes del grupo y se puede orar específicamente por esa necesidad.</p>
<p><strong>Algunos ejemplos prácticos para aplicar:</strong></p>
<ul>
<li>Lista de oraciones específicas con el nombre y la necesidad de cada persona.</li>
<li>Entregar un papelito donde anotar la petición y orar juntos durante la reunión.</li>
</ul>
<h4>C- ........</h4>
<h4>D- ........</h4>
<p>Realizar una "ofrenda de oración", es decir, utilizar la bolsa donde se recoge la ofrenda y luego de que cada uno escriba su petición en un papel, colocarlo en la bolsa y "cada uno saca uno" comprometiéndose a orar esa semana por ese integrante y su necesidad.</p>
<p>Es fundamental que toda la iglesia esté unida en la visión y alineada en pos de un mismo objetivo. Esto se logra a través de:</p>
<p><strong>1- ........</strong></p>
<p>Los temas que se dan en las células ayudan a conseguir este fin. Cada persona que está integrada a una célula conoce cuáles son los principios y la dirección que Dios nos va dando como iglesia.</p>
<p>Cada grupo recibirá de su H.M., quien a su vez ha recibido anteriormente, las metas que la congregación debe alcanzar y los pasos a seguir para poder cumplirla. Es como el torrente sanguíneo que circula por todo el cuerpo y hace que realmente todos reciban el mismo alimento.</p>
<h4>E- ........</h4>
<p>Como vimos en las clases anteriores, las células son utilizadas para ganar almas. Si logramos que cada uno de los que asisten se comprometan a invitar personas que no conocen a Cristo, se produce un efecto de multiplicación.</p>
<p>Para la persona que hace poco que asiste, la célula se convierte en el lugar donde puede comenzar a dar. El orar por otra persona, el invitar gente nueva, el participar de alguna actividad de la célula, el realizar un llamado, etc., son oportunidades que le permiten dar de lo que Dios ya le ha dado.</p>
<p><strong>CONCLUSIÓN:</strong> Un creyente que no se multiplica es un creyente sin frutos. La parábola de la higuera estéril en Marcos 11:12-14 es un ejemplo de una persona sin frutos. La higuera tenía hojas pero no tenía higos, aunque no era tiempo de dar fruto tampoco era tiempo que tuviera hojas. Una higuera con hojas era una promesa de higo. Las hojas pueden ser nuestra apariencia religiosa pero el fruto es la multiplicación. Oremos para que no seamos simplemente "buenos creyentes" sino cristianos con frutos porque "el que gana almas es sabio" Proverbios 11:30.</p>`
    },
    {
        id: 'clase-p4',
        title: 'Clase 4: Importancia de la Célula',
        content: `<p><strong>INTRODUCCIÓN:</strong> Sabemos que la visión es alcanzar la ciudad para Cristo y que la misión es el compromiso de acción para alcanzar esa visión: trabajar con células.</p>
<p>Para que esto ocurra debemos entender en qué consiste el buen funcionamiento de la célula. Recordemos que la célula no la hace solo el/la Hermano/a Mayor sino también, todos aquellos que la integran.</p>
<h4>A- ¿Qué es una célula?</h4>
<p>Para comprender el propósito de una célula primeramente debemos conocer lo que "NO" es una célula:</p>
<ul>
<li>La célula no es una ........ en la que se encuentran varias personas para charlar de diversos temas, para reírse de distintos chistes que se cuentan y para comer y tomar cosas ricas.</li>
<li>Tampoco es una ........ en la que la gente va solo a contar sus problemas y hay uno que los escucha. Claro que en la célula generalmente hay un momento en el que compartimos nuestras cargas y necesidades para orar, pero esto no lo es todo.</li>
<li>Por último la célula no debe ser un ........ para algunos pocos en la que pasan los años y son siempre los mismos pocos que se reúnen, los que van a recibir aliento y Palabra del H.M. para sentirnos bien y seguir engordando espiritualmente.</li>
</ul>
<h4>B- Características de una célula</h4>
<p><strong>1- Tiene ........</strong></p>
<p>Así como nuestro cuerpo está formado por millones de células que hacen de nosotros un ser viviente, la célula debe tener vida, esto significa crecer y reproducirse.</p>
<p>Hay cuatro grupos primarios entre los que podemos encontrar personas para hablarles del Señor:</p>
<ul>
<li>Familiares y amigos</li>
<li>Compañeros de trabajo o estudios</li>
<li>Amigos y vecinos</li>
<li>Personas desconocidas</li>
</ul>
<p>Orar por ellas será primordial para que Dios toque el corazón y así en el momento de recibir el mensaje, lo acepten con naturalidad. Marcos 16:15</p>
<p><strong>2- Es un lugar de ........</strong></p>
<p>La célula debe generar un ambiente tal que las vidas que lleguen encuentren el lugar propicio para sentirse cómodos, abrir sus corazones, recibir el mensaje de parte de Dios y ser ministradas.</p>
<p><strong>3- Es un lugar donde se ........</strong></p>
<p>La ministración en una célula es fundamental para tener éxito en la misma. Cuando se ministra se imparte el poder de Dios, y los milagros empiezan a ocurrir. Lucas 4:38-39</p>
<p><strong>4- Es un agente de ........</strong></p>
<p>La célula tiene una doble función: Por un lado recibir a la persona nueva que llega a la célula, y ayudarla en el proceso de su transformación, hasta que cada persona descubra que es capaz aún de poder servirle al Señor de diferentes maneras.</p>
<p>Pero por otra parte la célula es un medio para impactar los lugares en donde está implantada: un barrio, una ciudad, una nación.</p>
<p><strong>CONCLUSIÓN:</strong> Sumémonos a ser parte de este gran desafío de transformar nuestra Nación para Cristo. No seamos meros espectadores, esperando que tal vez todo el trabajo lo lleve adelante el hermano mayor, sino siendo más bien hacedores de la Palabra e imitadores de Jesús.</p>`
    },
    {
        id: 'clase-p5',
        title: 'Clase 5: Principios de Liderazgo en las C.O.E.',
        content: `<p><strong>INTRODUCCIÓN:</strong> El declararnos cristianos conlleva el hecho de que dejamos huellas en el lugar a donde vayamos. Fuimos llamados a impactar vidas, en nuestro trabajo, en nuestro hogar, en los ámbitos donde nos movemos.</p>
<h4>A- ¿QUÉ ES UN HERMANO/A MAYOR?</h4>
<p><strong>1- ........</strong></p>
<p><strong>2- ........</strong> Marcos 9:35. Un H.M. es aquel que sirve en la intimidad a Dios. Es el primero en llegar y el último en irse, es aquel que está en el lugar donde Dios lo pone, sin importar cuál es el lugar. Es aquel que está en tiempo y fuera de tiempo.</p>
<p>Génesis 12:1. La única visión que Abraham siguió fue la que Dios le dio. El patriarca dejó de lado cosas extremadamente importantes para aquellos momentos: su casa, su tierra y su parentela. Pero no solo siguió la visión de Dios a costa de dejar su tierra y su parentela, sino que puso sus ojos en un lugar que no conocía.</p>
<p><strong>3- ........</strong> Nehemías 1:3-4. Nehemías gozaba de los privilegios de vivir en Susa, capital del imperio Medio-Persa, pero su corazón estaba puesto en la necesidad que padecía su pueblo, Israel. Oró durante cuatro meses, para que Dios abriera las puertas necesarias en lo espiritual. Nehemías fue un líder motivado solo por Dios y para Dios.</p>
<p><strong>4- ........</strong> Hechos 4:3-4. En la primera predicación de Pedro, aquel discípulo que había negado a Jesús, tres mil personas fueron sumadas a las filas del Señor; y en su segundo día, fueron cinco mil más los varones que le seguían.</p>
<p><strong>5- ........</strong> Hechos 14:21-22. Estos verdaderos líderes de Dios, no solo tenían gente que les seguía, sino que esas personas eran discípulos, más allá del alto precio que por aquella época debían exponerse a pagar.</p>
<h4>B- EL LLAMADO</h4>
<p>"...He aquí llamarás a gente que no conociste y gentes que no te conocieron correrán a ti por causa de Jehová tu Dios, y del Santo de Israel quien te ha honrado..." Isaías 55:5</p>
<p><strong>1- ¿QUIÉN LLAMA?</strong></p>
<p>2ª Timoteo 1:9 / Marcos 3:14-15. El mismo Jesús que nos salvó es ahora el que nos llama. En primer lugar nos llama para pasar tiempo junto a Él.</p>
<p>Primero se debe "Ser" para luego "Hacer". Es decir que nuestro "hacer" en el camino de Dios va a depender directamente de nuestro "ser" en la intimidad con nuestro Dios. Por eso la Biblia nos enseña que Jesús llamó a sus discípulos primeramente para que estuvieran con él, y luego para predicar, sanar y echar fuera demonios.</p>
<p><strong>2- ¿QUÉ VE DIOS DE LOS QUE LLAMA?</strong></p>
<p>Dios no elige a las personas por lo que son, sino por lo que pueden llegar a ser. Somos como el barro en las manos del alfarero. Con el correr del tiempo Él va moldeándonos hasta llegar a tener la forma deseada. Nuestro Gran alfarero nos moldeará para llevarnos a ser ........</p>
<h4>C- DIOS ........ A TODOS</h4>
<p>Podemos ver, a través de la palabra, a hombres de Dios, cuyas vidas fueron grandemente usadas luego de pasar por las manos del alfarero. 1º Samuel 16. Todos tenemos nuestro lugar dentro del Plan de Dios para "Alcanzar la ciudad para Cristo". Todos, sin excepción, fuimos llamados para su obra. La dificultad, generalmente, no está en el que llama, sino en los que están dispuesto a escuchar "su llamado". Mateo 28:19</p>
<h4>D- DIOS ........ A LOS QUE LLAMA</h4>
<p>2ª Timoteo 1:7. El Señor siempre buscó a valientes, tomó y llamó a aquellos que mostraron el espíritu de un valiente. Dios derrama sobre sus valientes los caracteres del espíritu que él necesita, esto es, poder, amor y dominio propio. Hechos 1:8 / Romanos 5:5 / Gálatas 5:22-23</p>
<p>1ª Corintios 12:7-11. Los "dones espirituales" son las herramientas que Dios pone en nuestras manos para hacer la obra que nos encomendó. 1ª Corintios 12:31</p>
<p><strong>CONCLUSIÓN:</strong> Atrevernos a ser instrumentos en las manos de Dios, es nuestro desafío. Podemos ser útiles liderando en el ámbito en donde habitualmente nos movemos.</p>`
    },
    {
        id: 'clase-p6',
        title: 'Clase 6: El Precio del Liderazgo en las C.O.E.',
        content: `<p><strong>INTRODUCCIÓN:</strong> El ser Hermanos/as Mayores conlleva la responsabilidad de guiar a personas que nos siguen y a quienes debemos formar. Esto traerá a nuestras vidas un esfuerzo mayor, una inversión de tiempo. Un desgaste físico que muchas veces no sabremos cómo manejar, pasaremos momentos de soledad, de desengaño y desilusión. Todo esto es el precio de decir que sí al llamado del Señor.</p>
<h4>A- ........</h4>
<h4>B- ........</h4>
<p>Si uno no puede aceptar la crítica, eso significa que está emocionalmente inmaduro. Un líder está en la pantalla, está muy visible, por lo tanto la crítica vendrá y deberá soportarla.</p>
<h4>C- ........</h4>
<h4>D- ........</h4>
<p>Un líder sabio tratará de hallar equilibrio y buscará un pasatiempo, una marcha más lenta para reducir la tensión. El cuidado adecuado de la salud, el descanso y el equilibrio ayudarán a que el líder mantenga su capacidad para persistir. La solución no está en trabajar más intensamente, sino más hábilmente.</p>
<p>Nehemías 1:4. Nehemías recibió la noticia de la destrucción y afrenta en que se encontraba el pueblo de Israel, pero antes de la acción, se sentó, pensó, lloró, hizo duelo, ayunó y oró.</p>
<p>Para identificarse con las personas, el líder tiene que pagar el precio de apartar tiempo para conocerlas, compartir sus emociones, victorias y derrotas.</p>
<h4>E- ........</h4>
<p>El líder debe hacer un presupuesto cuidadoso de su tiempo de la misma forma como presupuestamos nuestro dinero.</p>
<h4>F- ........</h4>
<p>Siempre existe una posibilidad cierta para el líder, que en alguna parte sea calumniado, por su fe o por su perspectiva cristiana sobre las cosas. Jesús anduvo por ese sendero: "A los suyos vino y los suyos no le recibieron" Juan 1:11.</p>
<p><strong>CONCLUSIÓN:</strong> No nos desalentemos si algunos de estos puntos suceden en nuestra vida como Hermanos/as Mayores. Si los apóstoles, los profetas y el mismo Jesús lo padecieron, sintámonos contentos de ser partícipes de estas experiencias que se convertirán en beneficio para nuestro crecimiento y el de nuestro liderazgo.</p>`
    },
    {
        id: 'clase-p8',
        title: 'Clase 8: La Persona del Hermano/a Mayor',
        content: `<p><strong>INTRODUCCIÓN:</strong> Como vimos en la clase anterior, un Hermano/a Mayor es algo más que una persona que tiene seguidores.</p>
<p>De hecho, todas las asociaciones, grupos de música, barras de amigos, banda de ladrones, etc., tienen líderes a quienes siguen. Lo que difiere es la característica, la personalidad y el carácter del hombre o mujer de Dios que es levantado como Hno/a Mayor.</p>
<h4>CARACTERÍSTICAS DE UN/A HERMANO/A MAYOR</h4>
<p><strong>A- ........</strong></p>
<p>Todo líder necesita mostrar su rectitud de carácter y una vida llena de Dios, en la que los principios bíblicos y morales sean evidentes. Ser íntegro significa ser uno solo, no tener una vida en la iglesia y otra en el colegio, en el hogar o en el trabajo; no tener doblez. 1ª Timoteo 3:8.</p>
<p>"Integridad". El ser de una sola pieza evitará que el diablo encuentre hendijas o rajaduras por las cuales introducirse para afectar nuestras vidas espiritualmente.</p>
<p><strong>B- ........</strong></p>
<p>El H.M. debe ser leal primeramente al Señor, luego a sus superiores que lo presiden en la iglesia, y a aquellos a quienes él les enseña. Hebreos 13:7. La lealtad implica en sí mismo el permanecer en obediencia a nuestros líderes, generando así el campo propicio para el pastoreo de nuestras vidas. Hebreos 13:17</p>
<p><strong>C- ........</strong></p>
<p>La palabra "Fiel" significa digno de fe y crédito. Ser fiel es estar siempre dispuesto a responder de acuerdo a la confianza depositada en nosotros, como en la parábola de los dos talentos. Quien más había trabajado y más había producido fue el más fiel y por eso recibió aun más. Mateo 25:14-30</p>
<p><strong>D- ........</strong></p>
<p>Cuanto mayor sea nuestro compromiso, mayor será la presión, esto exige el estar dispuestos a aceptar la responsabilidad, tomar la iniciativa, y perseverar con la tarea hasta que sea terminada. A medida que crecemos espiritualmente, sentiremos que la presión es mayor y que nuestra responsabilidad también es mayor.</p>
<p><strong>E- ........</strong></p>
<p>En toda construcción hay puntos estratégicos que soportan la mayor presión de toda la estructura, son fuertes bases o columnas de las cuales depende todo el edificio, y están preparadas para recibir todo el peso y la presión de la obra. Anímese a tener esa misma firmeza y disposición para estar y ocupar esos lugares.</p>
<p><strong>F- ........</strong></p>
<p>Esto es el entusiasmo y dedicación demostrado al realizar el trabajo aceptado. Este entusiasmo se debe contagiar al resto del grupo. Filipenses 3:17 / 1ª Corintios 11:1</p>
<p><strong>G- ........</strong></p>
<p>Es la habilidad de tratar con los demás sin ofenderlos, es la destreza de decir y hacer lo recto, en los momentos y lugares adecuados. Debo saber expresar nuestras más firmes y profundas convicciones con amor y misericordia, sin que por ello se pierda efectividad. 2ª Timoteo 1:7</p>
<p>Dios nos dio un espíritu de valentía; pero ese espíritu no solo debe brillar por el poder que Dios derrama sino que también es necesario que con ese fluir de poder haya amor, y dominio propio.</p>`
    },
    {
        id: 'clase-p9',
        title: 'Clase 9: Peligros del Hermano/a Mayor (Parte 1)',
        content: `<p><strong>INTRODUCCIÓN:</strong> Pablo, escribiendo a Timoteo le dice: "...Ten cuidado de ti mismo...". Le advierte de que el peligro de caer, en nuestra vida espiritual, no está afuera, sino dentro nuestro.</p>
<p>Por eso es importante cuidar nuestro corazón porque de él vierte la vida, y no podremos crecer sanamente si nuestro corazón se contamina.</p>
<h4>A- ........</h4>
<p>En algún momento, va a suceder que comenzaremos a ver que crecemos, que las oraciones por las necesidades son contestadas, que cuando nos reunimos la presencia de Dios desciende de una manera especial, en definitiva, veremos que lo que estamos haciendo progresa, avanza. Ese es el momento en que el diablo intentará hacer dos cosas:</p>
<ol>
<li>Quitarle la gloria a quien es el único digno de merecerla: Dios.</li>
<li>Sembrar en nuestros corazones la semilla del orgullo.</li>
</ol>
<p><strong>Hay señales que nos tienen que servir de alerta, de que esta semilla comenzó a echar sus primeras raíces:</strong></p>
<p><strong>Sentimientos de superioridad:</strong></p>
<p>1- ........ Comenzaremos a sentirnos un poco por encima de las personas que están a nuestro nivel.</p>
<p>2- ........ Le restamos autoridad al consejo de nuestros líderes superiores, o directamente comenzamos a ignorarles y no pedirles ningún tipo de orientación. Dios mira nuestra actitud. Lucas 18:9-14</p>
<h4>B- ........</h4>
<p>Debemos cuidarnos entre nosotros y fundamentalmente cuidar a nuestros líderes, no solo no hablar mal de nadie, sino tampoco prestar nuestro oído o permitir que otros lo hagan. Números 12.</p>
<h4>C- ........</h4>
<p>1ª Samuel 15:23. La Biblia condena este pecado cuando dice: "Porque como pecado de adivinación es la rebelión..." Respetar y obedecer las cosas que nos aconsejan que hagamos, y si surge alguna diferencia, con una actitud correcta, poder hablarla, pero nunca rebelarnos ni generar rebelión contra nuestros líderes.</p>
<h4>D- ........</h4>
<p>Dios nos está dando visiones, revelaciones de lo que hará con nuestras vidas y con nuestra iglesia, el riesgo es que nos dejemos llevar por nuestros propios pensamientos y no por lo que Dios dice. 2ª Pedro 1:19</p>
<h4>E- ........</h4>
<p>Puede estar íntimamente relacionado con el punto anterior. Si seguimos con nuestros propios pensamientos, comenzamos a alejarnos de la visión de la iglesia y comenzaremos a tener una visión propia, diferente a la del resto del cuerpo.</p>
<p>La palabra "división" significa "existencia de dos visiones". Cuando un enemigo no puede contra otro, lo que hace es aliarse a él o dividirlo. Satanás no está dispuesto a aliarse, por lo que debemos estar atentos.</p>`
    },
    {
        id: 'clase-p10',
        title: 'Clase 10: Peligros del Hermano/a Mayor (Parte 2)',
        content: `<p><strong>INTRODUCCIÓN:</strong> Continuaremos viendo cuáles son los peligros a los que se pueden enfrentar.</p>
<h4>A- ........</h4>
<p>El conformismo se da cuando alcanzamos una meta, aunque haya sido muy alta y nos detenemos allí. Si llegamos al objetivo, inmediatamente debemos plantearnos nuevos desafíos, porque el conformarnos significaría detenernos, y detenernos significaría retroceder. Permanentemente tenemos que desafiarnos a ir más allá de donde estamos hoy.</p>
<h4>B- ........</h4>
<p>Deuteronomio 31:7-8. Moisés le dice a Josué que será él quien heredará la tierra que Jehová juró a sus padres. Nosotros somos portadores de una tremenda realidad espiritual, el Señor entregó la Ciudad de Buenos Aires a sus hijos y así como Josué no temió ni se intimó, nosotros tampoco debemos hacerlo.</p>
<h4>C- ........</h4>
<p>Definimos como negligencia al descuido u omisión respecto a las conductas que se deben observar. Una persona negligente nunca consigue lo que busca. La negligencia camina siempre tomada de la mano de la desobediencia de la palabra de Dios. El antónimo de negligente es "diligente". Proverbios 13:4.</p>
<h4>D- ........</h4>
<p>"Nada hagáis por contienda o vanagloria, antes bien con humildad estimando cada uno a los demás como superiores a él mismo..." Filipenses 2:3.</p>
<h4>E- ........</h4>
<p>"...Pues vio entre los despojos un manto babilónico muy bueno, y doscientos ciclos de plata, y un lingote de oro de peso de cincuenta ciclos, lo cual codicié y tomé y he aquí que está escondido bajo tierra en medio de mi tienda, y el dinero debajo de ello..." Josué 7:21</p>
<h4>F- ........</h4>
<p>2ª Corintios 6:14. No debemos permitir que nuestros deseos por encontrar a la persona idónea pueda ser motivo de distracción, haciéndonos quitar los ojos de la meta.</p>
<h4>G- ........</h4>
<p>Colosenses 3:23-24. Siempre debemos hacer todas las cosas para Dios, una tarjeta, una cartelera, una palabra para compartir en la célula, o una prédica; sin esperar el reconocimiento de los hombres. Salmo 121:1</p>
<h4>H- ........</h4>
<p>"...Porque no os ha dado Dios Espíritu de cobardía sino de poder, de amor y de dominio propio..." 2ª Timoteo 1:7. Miedo a enfrentar los desafíos, inseguridad para tomar decisiones. Temor a lo por venir. Temor a no poder cumplir con lo que nos proponen, etc.</p>
<p>El amor echa fuera ese temor. Amando a Dios y a las almas que se pierden, el temor no tiene cabida porque nos enfrentaremos a todo por amor a ellos, como un padre por sus hijos y como un hijo por su padre.</p>
<p><strong>CONCLUSIÓN:</strong> Dios nos está llevando a un nuevo nivel espiritual y ministerial. ¡El lugar en el que ustedes están parados es importante! No teman, Dios estará con ustedes en cada momento, solo tienen que confiar en sus manos y dejar que Él cumpla su propósito en ustedes: Ser parte de la visión de "Alcanzar la ciudad para Cristo". La mies es mucha, corran a recogerla. ¡Dios los bendiga!</p>`
    }
];

// CLASES TEOLÓGICAS
const clasesTeologicas = [
    {
        id: 'clase-t1',
        title: 'Clase 1: Doctrina de la Iglesia (Parte 1)',
        content: `<p><strong>INTRODUCCIÓN:</strong> La palabra Iglesia proviene del vocablo griego ........ que quiere decir ........ En el tiempo del Nuevo Testamento significaba una asamblea de personas. No es un lugar para reuniones, es ............</p>
<h4>A- LA IGLESIA DEL NUEVO TESTAMENTO</h4>
<p>La iglesia comenzó en el día de Pentecostés cuando el Espíritu Santo descendió sobre los 120 discípulos que estaban en el aposento alto esperando el cumplimiento de la promesa de Dios.</p>
<p>La primera iglesia se reunía en diferentes casas de Jerusalén, pero se hace referencia a ella como una sola iglesia. Hechos 2:47.</p>
<p>Más tarde la palabra iglesia fue usada para describir congregaciones locales en varios lugares tales como: Jerusalén, Antioquía, Galacia, Éfeso y Corinto. Sin embargo tiene un significado más extenso en pasajes como: 1ª Corintios 15:9; Gálatas 1:1-2 y 13; Mateo 16:18.</p>
<h4>1- LAS ORDENANZAS DE LA IGLESIA</h4>
<p>¿Qué es una ordenanza? Es un ........ Jesús dejó dos ordenanzas que fueron confirmadas por los apóstoles tanto en la enseñanza como en la práctica.</p>
<p><strong>a- ........</strong> La palabra "bautismo" significa ........ Marcos 1:10; Juan 3:23.</p>
<p>El bautismo es un evento que se lleva a cabo una vez y para siempre en la vida de un creyente, y simboliza su unión espiritual con Jesucristo. Romanos 6:4-5. El bautismo en agua no tiene poder salvador en sí mismo. Se bautiza a la gente, no para ser salva, sino porque es salva.</p>
<p><strong>b- ........</strong> El servicio de la Santa Cena fue instituido por el Señor Jesús la noche antes de su juicio y crucifixión. El mismo consiste de pan y vino. El pan, que representa el cuerpo del Señor Jesús, significa que el creyente participa de la vida y la naturaleza de Jesucristo por medio de la fe. El fruto de la vid representa la sangre vertida en el Calvario por la remisión de nuestros pecados.</p>
<ul>
<li>Frecuencia de la Cena del Señor: Podemos participar con tanta frecuencia como deseemos hasta el regreso del Señor Jesús. 1ª Corintios 11:25-26.</li>
<li>Santidad de la Cena del Señor: Muchos estaban enfermos y aún algunos habían muerto por haber participado indignamente. 1ª Corintios 11:27-30.</li>
</ul>
<h4>B- ILUSTRACIONES DE LA IGLESIA</h4>
<p>La iglesia es:</p>
<p>1. ........ El uso de esta expresión nos da a entender que la iglesia no es una organización, sino que tiene propiedades orgánicas.</p>
<p>2. ........ Todas las células actúan en forma activa y con fines de desarrollo en sí mismas. Así también ocurre en el cuerpo de Cristo. Cada nuevo creyente se une a millones que ya son parte de un cuerpo: el de Cristo. 1ª Corintios 12:13</p>
<p>3. ........ Un templo es comúnmente un espacio en el cual Dios se manifiesta particularmente y donde las personas pueden recurrir a Él cuando lo desean. En el templo, los creyentes podemos darle a Dios nuestra alabanza, adoración, oración y también nuestras buenas obras. 2ª Corintios 6:16</p>
<p>4. ........ Esta expresión intenta representar la estrecha comunión y relación que existe entre Dios y su pueblo. Se hace un paralelismo con el matrimonio intentando demostrar amor, comprensión, respeto, pero también responsabilidad. Efesios 5:32-33 / Mateo 25:1-13</p>`
    },
    {
        id: 'clase-t2',
        title: 'Clase 2: Doctrina de la Iglesia (Parte 2)',
        content: `<p><strong>INTRODUCCIÓN:</strong> Es necesario comprender que la iglesia es mucho más que un número de personas que se reúnen regularmente para participar conjuntamente de una serie de actividades. El poder de la iglesia consiste en ser un pueblo dirigido por un Rey.</p>
<h4>A- EL DESTINO DE LA IGLESIA</h4>
<p><strong>1- ........</strong> Esta posición de exaltación le da al cristiano su posición de poder y autoridad espiritual. Es por esto que Dios hace posible que el creyente eche demonios en el nombre de Jesús. Sin embargo, vendrá un tiempo cuando participaremos en su gloria manifestada públicamente. Romanos 8:18-25 / 1ª Corintios 15:53</p>
<p><strong>2- ........</strong> La iglesia también estará al lado de Cristo cuando tome completa y total posesión de la tierra para la gloria de Dios. Mateo 5:5. Él le entregó el título de propiedad a Jesucristo quien asumirá el trono de David a su regreso a la tierra.</p>
<h4>B- QUIÉNES INTEGRAN LA IGLESIA</h4>
<p>Si tuviéramos que compararla, la Iglesia es semejante a una familia, la cual está integrada por:</p>
<ul>
<li><strong>El pastor:</strong> Quien cumple la misma función que el padre de familia. Él es quien, al escuchar la voz de Dios, trae el alimento espiritual a ella, orando y velando por las necesidades del pueblo que Dios le ha confiado. También, como el padre en el hogar, es la autoridad máxima dentro de la familia.</li>
<li><strong>Los Hermanos Mayores:</strong> Son los que sencillamente, por tener algo más de experiencia en la Palabra de Dios y en el servicio de la iglesia, ayudan a la gran tarea de discipular a cada miembro de la iglesia.</li>
<li><strong>Los miembros:</strong> Como en toda familia, la relación entre todos debiera ser de respeto, amor y ayuda mutua.</li>
</ul>
<p>Veamos algunos consejos para mantener la armonía entre hermanos:</p>
<ul>
<li>No haciéndonos mal los unos a los otros. Romanos 13:10. Si hacemos el bien a los demás evidentemente tarde o temprano cosecharemos el bien de los otros.</li>
<li>Ayudando al otro. Gálatas 5:13. Debemos ayudar al que lo necesite: un llamado por teléfono, un oído dispuesto en un momento de dolor, sanará al que está caído.</li>
<li>Expresando un amor genuino. Romanos 12:9-10. La expresión del amor es fundamental, un saludo, un abrazo, no tan sólo por compromiso, sino porque el Señor nos ve a todos como sus hijos.</li>
</ul>
<h4>C- QUÉ FUNCIÓN CUMPLE LA IGLESIA</h4>
<p>La obra de la iglesia es crucial ya que sobre sus integrantes el Señor depositó la "Gran Comisión". Romanos 10:14</p>
<p>1- ........ SALVACIÓN. Esta es la tarea esencial de todo cristiano, que toda criatura alcance la salvación e ingrese a la Gracia de Dios.</p>
<p>2- ........ PARA LA ADORACIÓN. Allí en la congregación es donde Dios desciende de una manera especial y poderosa. Salmo 133; Hechos 4:31.</p>
<p>3- ........ UNA COMUNIÓN ENTRE LOS HERMANOS. Hechos 2:46. Como seres humanos necesitamos del contacto y la interacción con los otros. La iglesia proporciona además de la unidad de la Paternidad de Dios y el Señorío de Cristo, un nuevo entorno social, donde se favorece la restauración y el inicio de una nueva vida, conforme a lo establecido en la Palabra de Dios.</p>
<p><strong>CONCLUSIÓN:</strong> En vista del gran destino de la Iglesia, de estar junto a Jesús cuando Él gobierne sobre todo, ¿no debiéramos esmerarnos aún más por ser hallado fieles? 2ª Corintios 7:1. Hemos sido llamados a aumentar el Reino de Dios. Nuestra iglesia ha recibido una estrategia de parte del Señor para llevar a cabo esa meta: discipulado por células. La visión es: "Alcanzar la Ciudad para Cristo" y añadir a los que han de ser salvos. Dios puede hacerlo de muchas maneras pero prefirió contar con nosotros, sus hijos. ¿Estamos dispuestos a ponernos en las manos de Él?</p>`
    },
    {
        id: 'clase-t3',
        title: 'Clase 3: Autoridad Espiritual',
        content: `<p><strong>INTRODUCCIÓN:</strong> El hombre es un ser social que se desarrolla continuamente relacionándose con los demás. Por eso, es importante poder reconocer las diferentes autoridades en los lugares donde nos movemos. Nuestra obediencia a ellos es parte de nuestro deber como cristianos. Sin duda, tenemos una naturaleza rebelde pero en las manos del Espíritu Santo sabremos sujetarnos a las autoridades y gozarnos en ello.</p>
<h4>A- LOS HOMBRES DEBEN ........ A LA AUTORIDAD DELEGADA</h4>
<p><strong>1- ........</strong> La palabra "Delegado" significa: otorgado a otro, cedido, autorizado, permitido. Esta autoridad es representativa, o sea que no es propia, sino dada por una autoridad superior (Ej. El agente de policía). La autoridad espiritual es un regalo de Dios, y algún día daremos cuenta de cómo la hemos utilizado. Romanos 13:1. Toda autoridad proviene de Dios.</p>
<ul>
<li>1ª Pedro 2:13-14 - Instituciones humanas.</li>
<li>Éxodo 22:28 - Aunque los gobernantes de las naciones no crean en Dios no debemos maldecirlos.</li>
<li>Romanos 13:7 - Los símbolos de la sujeción a las autoridades terrenales son cuatro: Tributos, impuestos, respeto y honra.</li>
<li>2ª Pedro 2:10 - Hablar mal de las autoridades es una actitud carnal.</li>
</ul>
<p><strong>2- ........</strong> Efesios 5:22,24 Las casadas sujetas al marido. Efesios 6:1-3 Los hijos a los padres. Colosenses 3:18-22 Los empleados a sus jefes. Otros pasajes: Efesios 6:5-7; 1ª Timoteo 6:1; Tito 2:9-10</p>
<p><strong>3- ........</strong> 1ª Tesalonicenses 5:12-13; 1ª Timoteo 5:17 - Al liderazgo, pastores, predicadores y maestros. 1ª Corintios 16:15-16 - A todos los obreros del Señor.</p>
<h4>B- EJERCIENDO LA AUTORIDAD DELEGADA</h4>
<p><strong>1- ........ PARA EJERCERLA</strong></p>
<ul>
<li>Debe saber que toda autoridad viene de Dios. Romanos 13:1</li>
<li>Debe mantenerse en comunión constante con el Señor Jesús. Juan 5:19-20; Josué 1:8</li>
<li>Debe creerle ante todo a Dios, que Él provee seguridad y prosperidad. 2ª Crónicas 20:20</li>
<li>Debe conocer la autoridad que le ha sido delegada. 2ª Corintios 10:3-5. Ahora somos hijos de Dios no solo criaturas. Tenemos armas que nos han sido dadas: oración, ayuno, Palabra, santidad, comunión.</li>
<li>Debe negarse a si mismo. No debe establecer su propia autoridad, sino esperar el respeto natural por la delegación y el respaldo de Dios.</li>
</ul>
<h4>C- ........ AL CUERPO</h4>
<p>Efesios 1:18-23; 3:20 / 1ª Corintios 12:12-21. Al cuerpo humano le es natural y agradable obedecer a la cabeza, cuando algún miembro no actúa conforme a las directivas del cerebro es cuando hay perturbaciones físicas.</p>
<h4>D- ........ DE NUESTRA AUTORIDAD ESPIRITUAL</h4>
<ul>
<li>Confundir la fuente de autoridad con el método o la fórmula. Hechos 8:18-22</li>
<li>Falta de pureza, de santidad: no avala nuestra palabra. Nuestro testimonio no es creíble.</li>
<li>Falta de vida devocional.</li>
<li>Falta de confianza en Dios.</li>
<li>Rebeldía. Génesis 2:16-17; 9:20-27; Levítico 10:1-2. Toda la autoridad proviene de Dios, si no tenemos firme este principio, nos será más difícil identificar nuestros principios de rebeldía.</li>
</ul>
<h4>1- ........ DE LA REBELDÍA</h4>
<p>Mateo 12:34, Judas 1:8-10, Efesios 5:6; 2ª Pedro 2:10-12. Maldecir significa decir mal, hablar mal, etc.</p>
<p><strong>2- ........</strong> Romanos 9:11,24. Cuando hay decisiones de las autoridades que no están de acuerdo con nuestros razonamientos, deberíamos charlarlo y finalmente dar lugar a la obediencia en amor.</p>
<p><strong>3- ........</strong> 2ª Corintios 10:4-6. El pensamiento se hace fuerte al buscar una justificación, una razón que nos parezca valedera y luego se traduce en palabras. Filipenses 4:8</p>
<h4>........ A TOMAR</h4>
<p>Deuteronomio 13:3-10</p>
<ul>
<li>No dar oídos, o no escuchar mentiras (vs. 3)</li>
<li>No dar concesiones (vs.8)</li>
<li>Matar al enemigo (vs.9) (no en sentido literal!!!) Apedrearlo (con la Palabra) (vs. 10)</li>
</ul>
<p><strong>CONCLUSIÓN:</strong> Debemos esperar a Dios para conseguir la autoridad y cuidar de no perderla. En 1ª Samuel 24 nos habla acerca de lo que ocurrió en Engadi. David cortó la orilla del manto de Saúl y se turbó su corazón, porque su conciencia era sumamente sensible. David podía someterse a la autoridad. Jamás invalidó la autoridad de Saúl; simplemente esperaba en Dios para conseguir su autoridad. No trató de ayudar a Dios para que lo hiciera; en cambio voluntariamente esperaba en Él. Todo aquel que ha de ser autoridad delegada de Dios, debe aprender a no tratar de conseguir autoridad por sí mismo o por imitación.</p>`
    },
    {
        id: 'clase-t4',
        title: 'Clase 4: Principios y Práctica de la Consejería',
        content: `<p><strong>INTRODUCCIÓN:</strong> El Señor Jesucristo ha pagado el mayor precio para transformar destinos. Tenemos en la Consejería Bíblica un arma poderosa de restauración.</p>
<h4>A- BASES PARA UNA CONSEJERÍA EFICAZ</h4>
<p>1- Con uso de la Palabra. 2ª Timoteo 3:16-17.</p>
<p>2- Como expresión del ........ de Dios. Juan 15:12.</p>
<p>3- Bajo la ........ y la ........ del Espíritu Santo. Juan 14:26.</p>
<h4>B- EXPLICARLE AL ACONSEJADO</h4>
<ol><li>Es importante que acepte su pecado. Ezequiel 18:20.</li><li>Tenemos la certeza del perdón de Dios. Hebreos 4:14-16.</li><li>Aceptar el perdón conlleva permanecer en una nueva manera de actuar. Colosenses 1:10.</li></ol>
<h4>C- ACTITUDES NECESARIAS EN EL CORAZÓN DE LOS CONSEJEROS</h4>
<p>1- Tener el ........ 2ª Corintios 7:1.</p>
<p>2- Ser discípulos. 2ª Timoteo 1:13-14.</p>
<p>3- ........ No seguir a las emociones engañosas.</p>
<p>4- No hay ........ de personas. Romanos 15:7.</p>
<p>5- Tener ........ 1ª Corintios 13:4-7.</p>
<h4>D- ACONSEJANDO EN EL ESPÍRITU</h4>
<p>1- La obra la hace el ........ Juan 14:16-17.</p>
<p>2- La Palabra de Dios es el eje. 2ª Timoteo 3:16-17.</p>
<p>3- Saber oír al Espíritu y al aconsejado. Romanos 8:26-27.</p>
<h4>G- TRES PROPÓSITOS DE LA CONSEJERÍA</h4>
<ol><li>Sacar a luz el pecado.</li><li>Corregir el error.</li><li>Establecer un nuevo estilo de vida.</li></ol>
<p><strong>CONCLUSIÓN:</strong> El Señor cuenta con nosotros para derramar su misericordia sobre todo aquél que sufre.</p>`
    },
    {
        id: 'clase-t6',
        title: 'Clase 6: Bases de la Consolidación',
        content: `<p><strong>INTRODUCCIÓN:</strong> La visión para alcanzar la Ciudad consta de 4 pasos:</p>
<p>1- ........</p>
<p>2- ........</p>
<p>3- ........</p>
<p>4- ........</p>
<h4>A- ¿QUÉ ES LA CONSOLIDACIÓN?</h4>
<p>Es el cuidado intenso y diligente que debemos proveer al nuevo convertido para que logre integrarse al cuerpo de Cristo.</p>
<p>Verbos que reemplazan "consolidar":</p>
<p>1- ........ 2- ........ 3- ........ 4- ........ 5- ........ 6- ........ 7- ........ 8- ........</p>
<p>Implica una acción perseverante y desinteresada motivada por el amor.</p>
<h4>B- ¿CUÁL ES EL ALCANCE DE LA CONSOLIDACIÓN?</h4>
<p>Desde que la persona acepta a Cristo hasta que se afirme en su decisión y se involucre en la Iglesia.</p>
<h4>C- ALGUNOS CONCEPTOS</h4>
<p>1- El consolidador debe ........ constantemente. 2ª Corintios 9:6.</p>
<p>2- El consolidador debe trabajar en ........</p>
<h4>D- CÓMO ADOCTRINAR A LOS NUEVOS CREYENTES (Hechos 2:41-47)</h4>
<p>Adoctrinar es hacer de las enseñanzas un estilo de vida.</p>
<p><strong>Desarrollar:</strong></p>
<p>a- ........ Hechos 2:42. Brindarle sentido de pertenencia.</p>
<p>b- ........ Enseñar la necesidad de vivir en santidad. Josué 3:5.</p>
<p>c- ........ Hechos 2:42. Enseñar cómo y dónde orar. Jeremías 29:12-13.</p>`
    },
    {
        id: 'clase-t7',
        title: 'Clase 7: Preparándonos para Consolidar',
        content: `<p><strong>INTRODUCCIÓN:</strong> Todo aquel que anhela tener éxito en la consolidación deberá prepararse de forma excelente. Efesios 3:20.</p>
<h4>A- LA PREPARACIÓN SE FUNDAMENTA EN:</h4>
<p><strong>1- ........</strong> Cualquiera que aspire a ser usado por Dios deberá vivir en santidad. "Lo único que nos quita autoridad es el pecado oculto".</p>
<p><strong>2- ........</strong> La compasión fue la clave del éxito de Jesús. Lucas 7:11-15.</p>
<p>El modelo de Jesús (Filipenses 2:1-11):</p>
<ol><li>Acercarnos considerando al otro como superior.</li><li>No estimarnos a nosotros mismos.</li><li>Despojarnos de nosotros mismos.</li><li>Tomar forma de siervo.</li><li>Hacernos semejante al hombre.</li><li>Humillarnos.</li></ol>
<p><strong>3- ........</strong></p>
<p><strong>4- ........</strong> Juan 3:11. No hay forma de conocer la Biblia si no sacamos tiempo para leerla.</p>
<p><strong>5- ........</strong> La disposición se refleja en la actitud al escuchar la voz de Dios.</p>
<p><strong>CONCLUSIÓN:</strong> Dios espera que desarrollemos un corazón de pastor, con amor y misericordia.</p>`
    },
    {
        id: 'clase-t8',
        title: 'Clase 8: El Momento de la Entrega',
        content: `<p><strong>INTRODUCCIÓN:</strong> Hay un momento especial y único: cuando la persona entrega su vida al Señor Jesús.</p>
<h4>A- ........</h4>
<p>En ese instante los Hermanos Mayores deberán dirigirse al altar con las tarjetas para tomar los datos.</p>
<p>Consejos a dar al recién convertido:</p>
<p>1- ........ 2- ........ 3- ........ 4- ........ 5- ........ 6- ........</p>
<p><strong>1- PRESENTACIÓN</strong></p>
<p>Presentarse y preguntar los nombres informalmente. Esto hará sentir más cómodas a las personas.</p>
<p><strong>2- ........</strong></p>
<p><strong>3- ........</strong></p>
<p>El objetivo principal es verificar que la persona haya comprendido el paso que dio.</p>
<p><strong>4- ........</strong></p>
<p>Completar la tarjeta con letra clara. Todos los datos son importantes.</p>
<p><strong>Cómo prepararse para realizar la llamada:</strong></p>
<ol><li>En oración por la necesidad de la persona.</li><li>Buscando el sitio apropiado.</li><li>Planificando el tiempo.</li><li>Repasando el nombre y la necesidad.</li></ol>`
    },
    {
        id: 'clase-t9',
        title: 'Clase 9: La Visita',
        content: `<p><strong>INTRODUCCIÓN:</strong> Jesús sabía cuán importante era la visitación.</p>
<ul><li>Mateo 8:14-15 - Visitó la casa de la suegra de Pedro.</li><li>Lucas 19:1-10 - Después de visitar a Zaqueo, éste no volvió a ser el mismo.</li><li>Marcos 6:7-11 - Entrenó a sus discípulos y los envió de dos en dos.</li></ul>
<h4>A- CÓMO REALIZAR LA VISITA CON ÉXITO</h4>
<p><strong>1- ........</strong> En nuestro corazón debe haber un constante deseo de que Dios asombre nuestros ojos.</p>
<p><strong>2- ........</strong></p>
<p><strong>3- ........</strong> Ir acompañado, como los doce y los setenta enviados por Jesús.</p>
<p><strong>4- ........</strong> Ser puntual y cumplir con el compromiso.</p>
<p><strong>5- ........</strong> Seleccionar el pasaje bíblico preparado y explicarlo en 5 minutos.</p>
<p><strong>6- ........</strong> Motivarle a ser parte de una célula y seguir asistiendo al culto.</p>
<p><strong>7- ........</strong> Terminar orando por la persona y su familia.</p>
<p><strong>Consejos:</strong></p>
<ol><li>Cuide su aspecto personal - usted es un embajador de Cristo.</li><li>Llame a la puerta con naturalidad.</li><li>Hable y escuche.</li><li>Dialogue en lugar de predicar.</li><li>No contradiga a su acompañante.</li><li>No hablen los dos al mismo tiempo.</li><li>Tome solo el tiempo acordado (15 a 20 minutos).</li><li>No visite en horario de la comida.</li></ol>`
    },
    {
        id: 'clase-t11',
        title: 'Clase 11: La Familia y el Ministerio',
        content: `<p><strong>INTRODUCCIÓN:</strong> Hay un gran sueño que Dios tiene: Transformarnos y convertirnos en transformadores de nuestra familia.</p>
<h4>A- EL DESAFÍO DE LLEVAR ........</h4>
<p>Deuteronomio 6:6-7. Como líderes debemos establecer el reinado del Señor en cada ámbito de nuestras vidas, y dar cuidado y respeto a nuestros seres queridos. Esto es nuestro "testimonio en el hogar".</p>
<h4>B- EL DESAFÍO DE ESTAR ........</h4>
<p>Salmos 139:23-24. Es necesario valentía para reconocer que existen áreas que aún tenemos que mejorar. Cuando algunas situaciones se manifiestan en el hogar, evidencian que aún el Señor no es el centro de esa familia.</p>
<h4>C- DESAFÍO DE SER ........</h4>
<p>El sacerdocio es una de las funciones que Dios espera que ejerzamos dentro de nuestros hogares. Sacerdote es aquel capaz de interceder delante de Dios.</p>
<p>El alcance de un sacerdote:</p>
<ul><li>Alcanza perdón de pecados.</li><li>Alcanza fe de salvación para que otros puedan creer.</li><li>Alcanza justicia de Dios para las vidas.</li><li>Alcanza la moral cotidiana en medio de la familia.</li></ul>
<p><strong>CONCLUSIÓN:</strong> Nuestra primera meta es que nuestra familia conozca de Cristo. Debemos orar: "Señor, danos la gracia para poder ser ejemplo en nuestro hogar".</p>`
    }
];

export default SedymModulo3;
