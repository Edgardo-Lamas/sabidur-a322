import BiographyTemplate from '../../components/BiographyTemplate';

/**
 * Biografía de Girolamo Savonarola
 *
 * CÓMO AGREGAR IMÁGENES A UNA SECCIÓN:
 *   image: {
 *     src: `${import.meta.env.BASE_URL}img/prerreformadores/nombre-imagen.jpg`,
 *     alt: 'Descripción de la imagen',
 *     caption: 'Pie de foto opcional',
 *   },
 *   imagePosition: 'right',   // 'right' | 'left' | 'full'
 *
 * RETRATO PRINCIPAL:
 *   Reemplazá `portrait: null` con:
 *   portrait: `${import.meta.env.BASE_URL}img/prerreformadores/savonarola.jpg`,
 */

const biography = {
    slug: 'savonarola',
    name: 'Girolamo Savonarola',
    epithet: 'El Profeta Incómodo de Florencia',
    dates: '1452 – 1498',
    portrait: null,
    // portrait: `${import.meta.env.BASE_URL}img/prerreformadores/savonarola.jpg`,

    sections: [
        {
            id: 'contexto',
            title: 'Contexto Histórico',
            content: `
                <p>
                    Para entender a Savonarola hay que entender el mundo en que vivió:
                    uno de los momentos más deslumbrantes y más corruptos de la historia occidental.
                </p>
                <p>
                    Era 1452. En Maguncia, Johannes Gutenberg acababa de terminar su prensa de tipos
                    móviles: el libro nunca volvería a ser el mismo. Al año siguiente, en 1453,
                    los cañones otomanos de Mehmed II derrumbaron las murallas de Constantinopla
                    y pusieron fin al Imperio Bizantino. Miles de eruditos griegos huyeron hacia
                    Occidente cargando manuscritos clásicos, y esa avalancha de conocimiento antiguo
                    cayó sobre Italia como gasolina sobre una brasa. El Renacimiento estaba
                    en pleno apogeo.
                </p>
                <p>
                    Florencia era su epicentro. Los Medici —la familia banquera más poderosa de
                    Europa— financiaban el arte, la filosofía y el humanismo con generosidad
                    calculada. En los talleres de la ciudad trabajaban Leonardo da Vinci,
                    Sandro Botticelli y el joven Miguel Ángel. Los palacios competían en belleza.
                    Los filósofos debatían a Platón. Los cardenales iban a la ópera. La Antigüedad
                    clásica era la nueva religión de los cultos.
                </p>
                <p>
                    Y mientras tanto, en Roma, reinaba Rodrigo Borgia con el nombre de
                    Alejandro VI. Padre de varios hijos ilegítimos —entre ellos César Borgia
                    y Lucrecia Borgia—, había comprado el papado con sobornos descarados.
                    Organizaba banquetes de escándalo en el Vaticano. Distribuía cargos
                    eclesiásticos entre sus parientes. Era, en todos los sentidos, exactamente
                    lo que el Evangelio no podía tolerar en quien reclamaba ser el vicario de Cristo.
                </p>
                <p>
                    En ese mundo —brillante en la superficie, podrido en el centro—
                    nació Girolamo Savonarola en Ferrara en 1452. Su abuelo era un médico
                    famoso, y la familia esperaba que siguiera esa carrera. Dios tenía otros planes.
                    En 1475, a los veintitrés años, Savonarola abandonó su casa en secreto,
                    dejó una carta a su padre y entró al convento dominico de San Domenico
                    en Bolonia. La carta decía: <em>"La razón de mi huida ha sido la gran miseria
                    del mundo."</em>
                </p>
            `,
            image: null,
            imagePosition: null,
        },
        {
            id: 'conflicto',
            title: 'Conflicto Doctrinal',
            content: `
                <p>
                    Como predicador, Savonarola fue un fracaso al principio. Su primera misión
                    en Florencia en 1482 pasó inadvertida: voz seca, gestos torpes, audiencias
                    pequeñas. Se marchó sin pena ni gloria. Pasó años predicando en ciudades
                    del norte de Italia, refinando su voz, estudiando los profetas del Antiguo
                    Testamento, convenciéndose de que Dios le había dado un mensaje específico
                    para su tiempo.
                </p>
                <p>
                    El mensaje era simple y devastador: <strong>Dios iba a juzgar a Italia,
                    y la señal llegaría pronto</strong>. No era teología especulativa.
                    Era profecía concreta. Y en tres ocasiones, la historia le dio la razón.
                    Savonarola predijo públicamente la muerte de Lorenzo de Medici, la muerte
                    del papa Inocencio VIII, y la invasión de Italia por un rey extranjero.
                    En 1492, Lorenzo el Magnífico murió. Semanas después murió Inocencio VIII.
                    Ese mismo año, Cristóbal Colón llegó al Nuevo Mundo. Y en 1494, Carlos VIII
                    de Francia cruzó los Alpes con un ejército y barrió la península como
                    nadie lo había hecho desde los romanos.
                </p>
                <p>
                    Florencia quedó conmocionada. El heredero Medici huyó. Y el fraile dominico
                    de voz áspera y ojos ardientes que había predicado todo eso se convirtió
                    de la noche a la mañana en el hombre más escuchado de la ciudad.
                </p>
                <p>
                    Desde el púlpito de la catedral de Santa María del Fiore —la misma cúpula
                    de Brunelleschi que hoy sigue siendo el horizonte de Florencia—, Savonarola
                    tronaba. Sus sermones sobre Amós, Zacarías y el Apocalipsis podían durar
                    horas. Decenas de miles los escuchaban. Lloraban. Se confesaban en masa.
                    Botticelli pintó su <em>Natividad Mística</em> bajo su influencia.
                    El joven Miguel Ángel, según se cuenta, nunca olvidó esa voz.
                </p>
                <p>
                    Su blanco era doble: la Florencia mundana del Renacimiento y la Roma
                    corrupta de los Borgia. El Renacimiento, argumentaba, había puesto al
                    hombre en el centro y había desplazado a Dios. La cultura de los
                    <em>studia humanitatis</em>, los banquetes, los espejos, las canciones
                    obscenas, los juegos de azar —todo eso era idolatría vestida de elegancia.
                    Y Roma, la cabeza de la Iglesia, predicaba con el ejemplo más perverso posible.
                    <em>"¡Huye de Roma!"</em>, clamaba desde el púlpito. <em>"¡El Anticristo
                    está aquí! ¡El que ocupa la silla de Pedro deshonra la memoria de Cristo!"</em>
                </p>
            `,
            image: null,
            imagePosition: null,
        },
        {
            id: 'persecucion',
            title: 'Persecución y Crisis',
            content: `
                <p>
                    Entre 1494 y 1498, Savonarola gobernó Florencia. No con un cargo político,
                    sino con algo más poderoso: la autoridad moral de quien había predicho
                    lo que nadie más se atrevía a decir. Estableció una república cristiana:
                    instituciones más democráticas, ayuda a los pobres, leyes contra la usura
                    y la sodomía. Florencia, declaró, tenía un rey: Jesucristo.
                </p>
                <p>
                    En 1497 organizó la acción que lo inmortalizó —y que lo perseguiría—:
                    la <strong>Hoguera de las Vanidades</strong>.
                    Sus jóvenes seguidores recorrieron la ciudad recolectando espejos,
                    cosméticos, naipes, libros paganos, instrumentos musicales, pinturas
                    de desnudos y cualquier objeto que consideraran instrumento del pecado.
                    Todo se apilaba en la Piazza della Signoria. Y se quemaba.
                    Botticelli, según algunas fuentes, arrojó él mismo algunas de sus obras
                    a las llamas. La Florencia del arte y la belleza miraba arder su propio lujo.
                </p>
                <p>
                    Alejandro VI lo observaba todo desde Roma con creciente irritación.
                    Primero intentó comprarlo: le ofreció el capelo cardenalicio.
                    Savonarola respondió que no quería chapeles rojos sino uno rojo de sangre
                    —el martirio—, si ese era el precio de la verdad.
                    En 1497, el papa lo excomulgó.
                </p>
                <p>
                    Savonarola continuó celebrando misa. Continuó predicando.
                    Pero sus apoyos en Florencia comenzaron a erosionarse. La ciudad estaba
                    cansada. La austeridad tenía sus límites. Un incidente grotesco precipitó
                    su caída: sus rivales franciscanos lo desafiaron a una "prueba de fuego"
                    —una ordalía medieval donde ambos bandos caminarían sobre brasas y la
                    intervención divina mostraría quién tenía razón—. Savonarola no quiso
                    participar personalmente; envió a un fraile sustituto. La multitud que
                    esperaba el espectáculo se sintió defraudada. Cuando encima llovió y el
                    evento se canceló, el pueblo interpretó eso como una señal divina
                    en contra del fraile.
                </p>
                <p>
                    El 8 de abril de 1498, Savonarola fue arrestado. Sometido a tortura,
                    firmó una "confesión" que luego retractó, declarando que había sido
                    obtenida por la violencia. Fue sometido a un juicio sumario.
                    El 23 de mayo de 1498, en la misma Piazza della Signoria donde habían
                    ardido las vanidades, fue colgado junto a dos frailes compañeros,
                    y los tres cadáveres fueron quemados para que no quedaran reliquias.
                    Las cenizas se arrojaron al río Arno.
                </p>
                <p>
                    Tenía cuarenta y cinco años.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
        {
            id: 'aporte',
            title: 'Aporte Teológico',
            content: `
                <p>
                    Savonarola no era un reformador doctrinal en el sentido de Wycliffe o Hus.
                    Nunca cuestionó la transubstanciación, los sacramentos ni la estructura
                    jerárquica de la Iglesia en principio. Lo que cuestionó fue algo diferente,
                    y quizás más urgente para su momento: la total incoherencia moral entre
                    el Evangelio y quienes decían representarlo.
                </p>
                <p>
                    Su aporte teológico fue fundamentalmente <strong>profético</strong>.
                    Recuperó para la predicación cristiana la tradición de los profetas bíblicos:
                    Amós denunciando a los ricos que pisotean a los pobres, Jeremías anunciando
                    juicio sobre Jerusalén, el Apocalipsis hablando de la gran ramera.
                    Aplicó esas imágenes a Roma con una literalidad que hizo temblar a
                    cardenales y a papas.
                </p>
                <p>
                    Articuló además una idea que resonará en toda la Reforma posterior:
                    <strong>la corrupción de la Iglesia no es accidental sino sistémica</strong>,
                    y no puede corregirse con más cardenales o más decretos sino solo con
                    un retorno radical al Evangelio. La Escritura, para Savonarola, era el
                    espejo en el que la Roma de su tiempo debía mirarse —y lo que veía
                    era irreconocible—.
                </p>
                <p>
                    También legó un modelo político-teológico: la ciudad cristiana gobernada
                    por la ley de Dios, no por las intrigas de los príncipes. Calvino lo
                    estudiaría con atención antes de construir su propia Ginebra.
                    El experimento fue imperfecto, incluso autoritario en momentos,
                    pero la pregunta que planteó —<em>¿qué significa que Jesucristo sea
                    el Señor de una ciudad?</em>— no era trivial.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
        {
            id: 'legado',
            title: 'Legado Espiritual',
            content: `
                <p>
                    El legado de Savonarola es complejo, y la honestidad lo exige.
                </p>
                <p>
                    La Hoguera de las Vanidades destruyó obras de arte de valor incalculable.
                    Su régimen en Florencia tuvo rasgos autoritarios. Su apocalipticismo
                    podía volverse rígido y moralista de un modo que aplastaba más que liberaba.
                    No era un hombre sin sombras.
                </p>
                <p>
                    Pero lo que hizo fue extraordinario. Se paró frente a Alejandro VI —el papa
                    más corrupto de la historia moderna de la Iglesia— cuando nadie más tenía
                    valor de hacerlo. Lo denunció por nombre, desde el púlpito, ante decenas
                    de miles de personas, sin eufemismos. Y lo pagó con la vida.
                </p>
                <p>
                    Martín Lutero lo leyó. Lo consideró un mártir. En 1523, escribió una
                    introducción a las meditaciones de Savonarola sobre los Salmos 31 y 51
                    que el fraile florentino había escrito en su celda durante las semanas
                    previas a su ejecución. Lutero declaró: <em>"Savonarola murió como
                    un cristiano."</em> No era elogio menor viniendo de quien venía.
                </p>
                <p>
                    El año de su muerte —1498— fue también el año en que Vasco de Gama
                    llegó a la India abriendo la ruta marítima a Asia. El mundo se estaba
                    expandiendo en todas direcciones. En veinte años más, Lutero clavaría sus
                    tesis. En treinta, Calvino nacería. El tiempo de la Reforma estaba llegando,
                    y Savonarola fue una de las últimas voces que rugieron en la antesala,
                    exigiendo que la Iglesia recordara lo que era antes de que alguien
                    más lo exigiera con martillo y papel.
                </p>
                <p>
                    Hay una placa en la Piazza della Signoria de Florencia, exactamente donde
                    lo colgaron y lo quemaron. Dice simplemente: <em>Qui bruciò Girolamo
                    Savonarola.</em> Aquí ardió Girolamo Savonarola. La ciudad que lo mató
                    no lo olvidó nunca.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
    ],

    quote: {
        text: 'No quiero el capelo rojo que me ofrecen. Quiero uno rojo de sangre, si ese es el precio de la verdad.',
        source: 'Girolamo Savonarola, al recibir la oferta del cardenalato de Alejandro VI',
    },

    timeline: [
        { year: '1452', event: 'Nace en Ferrara, Italia, el 21 de septiembre. Ese mismo año Gutenberg termina su imprenta de tipos móviles.' },
        { year: '1453', event: 'Constantinopla cae ante los otomanos. Miles de eruditos griegos huyen a Italia con manuscritos clásicos, acelerando el Renacimiento.' },
        { year: '1475', event: 'A los 23 años, abandona su casa en secreto y entra al convento dominico de San Domenico en Bolonia. Su carta al padre: "La razón de mi huida ha sido la gran miseria del mundo."' },
        { year: '1482', event: 'Primera misión en Florencia como predicador en San Marco. Fracaso. Las audiencias son pequeñas; su estilo no conecta.' },
        { year: '1484–89', event: 'Predica en ciudades del norte de Italia. Desarrolla su estilo profético. Sus sermones sobre Amós y el Apocalipsis comienzan a ganar fama.' },
        { year: '1490', event: 'Lorenzo de Medici lo invita de regreso a Florencia. Savonarola predica en San Marco y luego en el Duomo. Las multitudes se multiplican.' },
        { year: '1492', event: 'Tres profecías se cumplen en semanas: muere Lorenzo de Medici, muere el papa Inocencio VIII, Carlos VIII comienza a preparar la invasión de Italia. Ese mismo año Colón llega a América.' },
        { year: '1494', event: 'Carlos VIII de Francia invade Italia. Savonarola lo interpreta como el "gladius Dei" —la espada de Dios—. Los Medici huyen de Florencia. Savonarola se convierte en la voz dominante de la ciudad.' },
        { year: '1494–98', event: 'Florencia como "república cristiana": reformas democráticas, leyes de moralidad pública, apoyo a los pobres. Cristo declarado oficialmente "Rey de Florencia".' },
        { year: '1497', event: 'Hoguera de las Vanidades en la Piazza della Signoria: espejos, cosméticos, naipes, libros paganos, pinturas. Botticelli habría quemado algunas de sus propias obras.' },
        { year: '1497', event: 'El papa Alejandro VI (Borgia) lo excomulga. Savonarola continúa celebrando misa y predicando.' },
        { year: 'Feb 1498', event: 'Sus rivales franciscanos lo desafían a una ordalía de fuego. El evento colapsa por lluvia y disputas. La multitud, decepcionada, comienza a volverse en su contra.' },
        { year: '8 Abr 1498', event: 'Arrestado por el gobierno florentino. Sometido a tortura. Firma una confesión que luego retracta.' },
        { year: '23 May 1498', event: 'Colgado y quemado en la Piazza della Signoria junto a dos frailes compañeros. Tenía 45 años. Las cenizas se arrojan al Arno.' },
        { year: '1498', event: 'Ese mismo año, Vasco de Gama llega a la India. El mundo se expande. Veinte años después, Lutero clava sus tesis.' },
        { year: '1523', event: 'Lutero escribe una introducción a las meditaciones de Savonarola y declara: "Savonarola murió como un cristiano."' },
    ],
};

const Savonarola = () => {
    return (
        <BiographyTemplate
            biography={biography}
            seriesName="Prerreformadores"
            seriesPath="/prerreformadores"
        />
    );
};

export default Savonarola;
