import BiographyTemplate from '../../components/BiographyTemplate';

/**
 * Biografía de William Tyndale
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
 *   portrait: `${import.meta.env.BASE_URL}img/prerreformadores/tyndale.jpg`,
 */

const biography = {
    slug: 'tyndale',
    name: 'William Tyndale',
    epithet: 'El Traductor que Pagó con su Vida',
    dates: 'c. 1494 – 1536',
    portrait: null,
    heroImage: `${import.meta.env.BASE_URL}img/prerreformadores/tyndale-hero.jpg`,
    // portrait: `${import.meta.env.BASE_URL}img/prerreformadores/tyndale.jpg`,

    sections: [
        {
            id: 'contexto',
            title: 'Contexto Histórico',
            content: `
                <p>
                    El mundo en que nació William Tyndale, hacia 1494, era un mundo que se
                    estaba rompiendo en pedazos y reconstruyendo al mismo tiempo.
                </p>
                <p>
                    Dos años antes, Colón había llegado a América. El año de su nacimiento,
                    Colón emprendía su segundo viaje. El planeta se estaba agrandando de golpe.
                    En Portugal, Vasco de Gama abría la ruta marítima a Asia. En 1519, cuando
                    Tyndale tenía veinticinco años, Magallanes comenzaba la primera
                    circunnavegación del globo. El horizonte de lo posible se había expandido
                    de un modo que ninguna generación anterior había conocido.
                </p>
                <p>
                    En ese mismo período, Erasmo de Rotterdam publicaba su edición crítica
                    del Nuevo Testamento en griego original (1516). Era la primera vez en
                    siglos que los eruditos podían leer el texto bíblico tal como lo habían
                    escrito sus autores, sin el filtro de la Vulgata latina. Un año después,
                    en 1517, Martín Lutero clavaba sus noventa y cinco tesis en Wittenberg.
                    La Reforma estaba en marcha. En 1522, mientras Tyndale estudiaba en
                    Cambridge, Lutero publicaba su Nuevo Testamento en alemán. En ese mismo
                    año murió Magallanes en Filipinas, pero su tripulación completó la vuelta
                    al mundo. El globo había sido circunnavegado. El texto sagrado estaba
                    en el idioma del pueblo alemán.
                </p>
                <p>
                    Inglaterra, sin embargo, era otra historia. El rey Enrique VIII —joven,
                    culto, teólogo aficionado, condecorado por el papa con el título de
                    <em>"Defensor de la Fe"</em> por su escrito contra Lutero— gobernaba
                    un reino donde la Biblia existía en latín y donde ningún laico podía
                    leerla en inglés sin riesgo de muerte. La Iglesia inglesa, con el
                    cardenal Thomas Wolsey al frente, defendía ese monopolio con ferocidad.
                    En ese punto de tensión entre el mundo que se abría y la institución que
                    se cerraba, William Tyndale tomó la decisión de su vida.
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
                    Tyndale estudió en Oxford y luego en Cambridge, donde el humanismo
                    erasmista circulaba en conversaciones clandestinas. Leyó el griego del
                    Nuevo Testamento de Erasmo. Leyó a Lutero. Y llegó a una convicción que
                    ya no podía desechar: la ignorancia espiritual del pueblo inglés no era
                    un accidente sino una política deliberada, y la única solución era
                    la Biblia en inglés.
                </p>
                <p>
                    Un día, en una discusión con un clérigo erudito que defendía la
                    autoridad de la Iglesia sobre la Escritura, Tyndale respondió con una
                    frase que quedó grabada en la historia:
                    <em>"Si Dios me preserva la vida, antes de que pasen muchos años haré
                    que un muchacho que ara la tierra sepa más de la Escritura que tú."</em>
                </p>
                <p>
                    No era arrogancia. Era un programa. Tyndale viajó a Londres en 1523
                    a buscar el apoyo del obispo Cuthbert Tunstall, uno de los prelados más
                    cultos de Inglaterra, para emprender la traducción. Tunstall lo rechazó.
                    No había lugar para ese proyecto en la Iglesia inglesa. Tyndale entendió
                    lo que eso significaba: tendría que hacerlo solo, fuera de Inglaterra,
                    y contra la voluntad de las dos instituciones más poderosas del reino.
                </p>
                <p>
                    En 1524 cruzó el mar del Norte. Visitó probablemente a Lutero en
                    Wittenberg. Se instaló en Hamburgo. Tenía el Nuevo Testamento griego
                    de Erasmo, su dominio del inglés, su fe, y muy poco dinero. Comenzó a
                    traducir.
                </p>
                <p>
                    El texto que produjo no era una traducción académica. Era Escritura viva.
                    Tyndale tenía el oído más fino de su generación para el inglés hablado,
                    y lo usó. <em>"The salt of the earth." "Lead us not into temptation."
                    "Ask and it shall be given you." "Blessed are the pure in heart."</em>
                    Esas frases existen en inglés —y por ende en gran parte del mundo
                    de habla inglesa— porque Tyndale las eligió.
                    Al español lo hemos citado en sermones durante siglos
                    sin saber que detrás estaba él.
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
                    En 1525, en la imprenta de Colonia, los agentes de Enrique VIII irrumpieron
                    y confiscaron las primeras páginas del Nuevo Testamento impreso.
                    Tyndale escapó a Worms con los manuscritos. En 1526, el primer Nuevo
                    Testamento inglés impreso salía de la prensa: seis mil ejemplares,
                    del tamaño de una mano, perfectamente transportables, listos para cruzar
                    el Canal de la Mancha escondidos en balas de tela y barriles de trigo.
                </p>
                <p>
                    La reacción fue instantánea. El obispo Tunstall —el mismo que había
                    rechazado financiar la traducción— pagó a un comerciante llamado
                    Augustine Packington para que comprara en Amberes todos los ejemplares
                    disponibles y los entregara para ser quemados públicamente.
                    Packington era amigo de Tyndale. Le vendió al obispo los libros del
                    propio Tyndale, al precio que Tyndale le pidió.
                    Tyndale recibió el dinero, saldó sus deudas, e imprimió una edición
                    revisada y mejorada. Cuando alguien preguntó cómo era posible que
                    los libros siguieran circulando después de haber sido quemados,
                    Tyndale respondió, según se cuenta, que el obispo había sido muy gentil:
                    le había ayudado a financiar una versión mejor.
                </p>
                <p>
                    Durante once años, Tyndale vivió en el exilio europeo como prófugo.
                    Publicó su Pentateuco en inglés (1530), trabajó en los libros
                    históricos del Antiguo Testamento, escribió tratados teológicos.
                    Enrique VIII intentó convencerlo de volver prometiéndole protección
                    —siempre que apoyara el divorcio real—. Tyndale se negó: no podía
                    endosar lo que la Escritura no permitía.
                </p>
                <p>
                    En mayo de 1535, en Amberes, fue traicionado por un joven inglés llamado
                    Henry Phillips, probablemente un espía al servicio de intereses católicos
                    ingleses. Phillips lo invitó a cenar y lo entregó a los agentes imperiales
                    que esperaban en la calle. Tyndale fue arrestado y llevado al castillo
                    de Vilvoorde, a dieciséis kilómetros de Bruselas, bajo jurisdicción
                    del Imperio de Carlos V.
                </p>
                <p>
                    Estuvo preso dieciséis meses. Durante ese tiempo escribió una carta
                    al gobernador del castillo que se ha conservado. No pedía la libertad.
                    Pedía una gorra más abrigada porque el frío le entumecía los dedos,
                    una vela porque la oscuridad le dañaba los ojos, y —sobre todo—
                    su Biblia hebrea, su gramática hebrea y su diccionario hebreo.
                    Quería seguir traduciendo el Antiguo Testamento en la celda donde
                    esperaba la muerte.
                </p>
                <p>
                    El 6 de octubre de 1536, fue conducido al lugar de la ejecución.
                    Lo estrangularon. Luego quemaron el cadáver. Sus últimas palabras,
                    registradas por John Foxe, fueron una oración:
                    <em>"Señor, abre los ojos del rey de Inglaterra."</em>
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
                    El aporte de Tyndale tiene dos dimensiones: la lingüística y la teológica,
                    y las dos son inseparables.
                </p>
                <p>
                    Su traducción no era un ejercicio académico. Era un acto teológico.
                    Tyndale creía, con toda su convicción, que la gracia de Dios no necesita
                    mediadores humanos para llegar al corazón, que la justificación es por
                    fe y no por obras, y que cada creyente tiene el derecho y el deber
                    de leer y entender la Palabra por sí mismo. Traducir la Biblia al inglés
                    era la consecuencia práctica de esa teología.
                </p>
                <p>
                    Para hacerlo bien, aprendió griego y hebreo con una profundidad que
                    admiró incluso a sus enemigos. Su Nuevo Testamento tomaba el texto
                    griego de Erasmo como fuente —no la Vulgata latina—, lo que significaba
                    que algunas traducciones tradicionales cambiaban. El término
                    <em>ekklesia</em> (asamblea) pasaba a ser "congregation" en lugar
                    de "church"; <em>presbyteros</em> (anciano) dejaba de ser "priest".
                    Pequeños cambios con consecuencias enormes: cuestionaban la arquitectura
                    del poder clerical en el idioma mismo de la Biblia.
                </p>
                <p>
                    Sus obras teológicas complementaron la traducción. En
                    <em>La Obediencia del Hombre Cristiano</em> (1528) argumentó que la
                    autoridad del rey era legítima sobre la Iglesia en asuntos civiles,
                    pero que la Escritura era la autoridad suprema sobre la conciencia.
                    Enrique VIII leyó ese libro con entusiasmo —hasta que Tyndale aplicó
                    el mismo principio para oponerse al divorcio real—.
                    En <em>La Parábola del Mamón Impío</em> (1528) desarrolló la doctrina
                    de la justificación por fe con una claridad que habría podido firmar Lutero.
                </p>
                <p>
                    El impacto lingüístico de Tyndale en el inglés es difícil de exagerar.
                    Se le atribuyen palabras y frases que hoy forman parte del idioma:
                    <em>Passover</em> (Pascua), <em>atonement</em> (expiación),
                    <em>scapegoat</em> (chivo expiatorio), <em>mercy seat</em>,
                    <em>long-suffering</em>. Y decenas de expresiones que el mundo
                    de habla inglesa cita sin saber que las acuñó un hombre que murió
                    estrangulado en Flandes por haberlas escrito.
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
                    La ironía de la historia de Tyndale es tan perfecta que parece inventada.
                </p>
                <p>
                    Enrique VIII lo había perseguido durante años. Había intentado capturarlo,
                    había autorizado el embargo de sus libros, había presionado a los gobiernos
                    europeos para que lo extraditaran. Tyndale murió en 1536 bajo jurisdicción
                    imperial. En 1537 —un año después de su ejecución—, Enrique VIII autorizó
                    la "Biblia de Matthews", una traducción al inglés para uso de todo su reino.
                    Era, en su mayor parte, la traducción de William Tyndale con otro nombre.
                    En 1539, autorizó la <em>Great Bible</em>, que se colocó en todas las
                    iglesias de Inglaterra. Seguía siendo, en su mayor parte, Tyndale.
                </p>
                <p>
                    En 1611, el rey Jacobo I encargó la versión que el mundo conoce como
                    la <em>Biblia del Rey Jacobo</em>. Los eruditos que la produjeron
                    compararon sus borradores con las versiones anteriores, y una y otra vez
                    eligieron el texto de Tyndale por encima de todos los demás.
                    Se calcula que aproximadamente el <strong>ochenta y tres por ciento
                    del Nuevo Testamento de la Biblia del Rey Jacobo</strong> es texto
                    de Tyndale con cambios mínimos. La Biblia que los peregrinos llevaron
                    al Nuevo Mundo, la Biblia que formó el carácter religioso de Estados
                    Unidos, la Biblia que Shakespeare y Milton leyeron —era, en sus huesos,
                    la Biblia de un hombre que había sido estrangulado en Flandes
                    cuarenta años antes.
                </p>
                <p>
                    Sus últimas palabras fueron una oración por el rey que lo había perseguido:
                    <em>"Señor, abre los ojos del rey de Inglaterra."</em>
                    John Foxe, quien la registró, añadió: y Dios lo hizo pronto.
                </p>
                <p>
                    Tres siglos después de su muerte, el lingüista y crítico David Daniell
                    escribió: <em>"La Biblia inglesa es la Biblia de Tyndale.
                    Todo lo demás es revisión."</em>
                    No hay epitafio más justo para el muchacho de Gloucestershire
                    que quiso que el que ara la tierra entendiera el Evangelio.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
    ],

    quote: {
        text: 'Señor, abre los ojos del rey de Inglaterra.',
        source: 'William Tyndale — últimas palabras antes de ser ejecutado en Vilvoorde, 1536',
    },

    timeline: [
        { year: 'c. 1494', event: 'Nace en Gloucestershire, Inglaterra. Ese año Colón emprende su segundo viaje al Nuevo Mundo.' },
        { year: '1516',    event: 'Erasmo publica su Nuevo Testamento en griego original. Tyndale, estudiante en Cambridge, lo lee. Este texto será la base de su traducción.' },
        { year: '1517',    event: 'Lutero clava sus 95 tesis en Wittenberg. Tyndale tiene 23 años. La Reforma estalla en el continente.' },
        { year: '1522',    event: 'Lutero publica su Nuevo Testamento en alemán. Tyndale decide hacer lo mismo en inglés.' },
        { year: 'c. 1523', event: 'En una discusión con un clérigo, pronuncia su promesa: "...haré que el que ara la tierra sepa más de la Escritura que tú."' },
        { year: '1523',    event: 'Viaja a Londres y busca el apoyo del obispo Tunstall para su traducción. Es rechazado. Decide trabajar solo en el continente.' },
        { year: '1524',    event: 'Huye de Inglaterra. Visita probablemente a Lutero en Wittenberg. Se instala en Hamburgo y comienza a traducir.' },
        { year: '1525',    event: 'Los agentes del rey interrumpen la impresión en Colonia. Tyndale escapa a Worms con sus manuscritos.' },
        { year: '1526',    event: 'El primer Nuevo Testamento impreso en inglés sale de las prensas de Worms. Miles de ejemplares se contrabandean a Inglaterra en balas de tela y barriles.' },
        { year: '1527',    event: 'El obispo Tunstall compra todos los ejemplares disponibles y los quema. Tyndale usa el dinero para imprimir una edición revisada y superior.' },
        { year: '1528',    event: 'Publica La Obediencia del Hombre Cristiano y La Parábola del Mamón Impío. Enrique VIII lee el primero con admiración.' },
        { year: '1530',    event: 'Publica el Pentateuco en inglés: la primera traducción impresa de la Torá al inglés, basada en el hebreo original.' },
        { year: '1530',    event: 'Publica La Práctica de los Prelados, oponiéndose al divorcio de Enrique VIII. El rey, que antes lo admiraba, ahora lo persigue activamente.' },
        { year: 'May 1535', event: 'Traicionado por Henry Phillips en Amberes. Arrestado y trasladado al castillo de Vilvoorde, cerca de Bruselas.' },
        { year: '1535–36', event: 'Encarcelado 16 meses en Vilvoorde. Escribe al gobernador pidiendo una vela, una gorra de abrigo y su Biblia hebrea para seguir traduciendo.' },
        { year: '6 Oct 1536', event: 'Estrangulado y quemado en Vilvoorde. Sus últimas palabras: "Señor, abre los ojos del rey de Inglaterra."' },
        { year: '1537',    event: 'Un año después de su muerte, Enrique VIII autoriza la "Biblia de Matthews", basada en gran parte en la traducción de Tyndale.' },
        { year: '1539',    event: 'La Gran Biblia —también basada en Tyndale— se coloca en todas las iglesias de Inglaterra por orden del rey que lo había perseguido.' },
        { year: '1611',    event: 'La Biblia del Rey Jacobo se publica. El 83% del Nuevo Testamento es texto de Tyndale. La Biblia del mundo angloparlante lleva, en sus huesos, su voz.' },
    ],
};

const Tyndale = () => {
    return (
        <BiographyTemplate
            biography={biography}
            seriesName="Prerreformadores"
            seriesPath="/prerreformadores"
        />
    );
};

export default Tyndale;
