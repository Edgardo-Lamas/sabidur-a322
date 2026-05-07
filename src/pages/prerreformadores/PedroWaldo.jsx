import BiographyTemplate from '../../components/BiographyTemplate';

/**
 * Biografía de Pedro Waldo
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
 *   portrait: `${import.meta.env.BASE_URL}img/prerreformadores/pedro-waldo.jpg`,
 */

const biography = {
    slug: 'pedro-waldo',
    name: 'Pedro Waldo',
    epithet: 'El Mercader que Renunció a Todo',
    dates: 'c. 1140 – c. 1218',
    portrait: null,
    heroImage: `${import.meta.env.BASE_URL}img/prerreformadores/pedro-waldo-hero.jpg`,
    // portrait: `${import.meta.env.BASE_URL}img/prerreformadores/pedro-waldo.jpg`,

    sections: [
        {
            id: 'contexto',
            title: 'Contexto Histórico',
            content: `
                <p>
                    Antes de Wycliffe. Antes de Hus. Antes de que la Reforma tuviera nombre,
                    hubo un mercader en Lyon que leyó el Evangelio y decidió tomárselo al pie
                    de la letra. Eso fue suficiente para poner en marcha un movimiento que
                    Roma no pudo extinguir en cuatro siglos de intentarlo.
                </p>
                <p>
                    Lyon, en el siglo XII, era una de las ciudades comerciales más prósperas
                    de Europa. Cruce de rutas mercantiles entre Italia, Francia y el norte del
                    continente, producía riqueza en abundancia para quienes sabían trabajar.
                    Pedro Waldo —cuyo nombre en las fuentes aparece también como
                    <em>Valdes</em> o <em>Vaudès</em>— era uno de esos hombres.
                    Comerciante exitoso, poseía bienes raíces, préstamos a interés y la posición
                    social que acompañaba a todo eso. Tenía esposa, hijas y un lugar en el
                    mundo. Lo tenía todo.
                </p>
                <p>
                    La Iglesia Católica del siglo XII vivía en la misma contradicción de siempre,
                    pero agudizada: el papa Alejandro III ejercía un poder político sin precedentes,
                    los obispos acumulaban tierras y riquezas, el clero local era frecuentemente
                    ignorante y moral mente laxo. El Evangelio se leía en latín, una lengua que
                    el pueblo llano no entendía, y su interpretación quedaba reservada a los
                    letrados de la Iglesia. La Palabra de Dios era, en la práctica, propiedad
                    de una institución.
                </p>
                <p>
                    En ese mundo, hacia 1173, algo quebró a Pedro Waldo.
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
                    La ruptura fue doble: primero espiritual, luego institucional.
                </p>
                <p>
                    Según las fuentes más antiguas, Waldo escuchó a un trovador callejero
                    cantar la historia de San Alejo —un noble romano que abandonó su fortuna
                    para vivir como peregrino pobre— y algo se movió por dentro. Ese mismo
                    período, un amigo suyo cayó muerto de repente durante una cena. La muerte
                    sin aviso. La riqueza que no salva. Waldo fue a buscar a un teólogo y le
                    preguntó sin rodeos: <em>"¿Cuál es el camino más seguro hacia Dios?"</em>
                </p>
                <p>
                    El teólogo le citó a Jesús: <em>"Si quieres ser perfecto, ve, vende lo que
                    tienes, dáselo a los pobres, y tendrás tesoro en el cielo;
                    y ven y sígueme."</em> (Mateo 19:21)
                </p>
                <p>
                    Waldo se fue a casa. Llamó a su esposa y le dio a elegir: los bienes
                    inmuebles o el dinero y las propiedades móviles. Ella eligió los inmuebles.
                    Waldo colocó a sus hijas bajo el cuidado de un convento para su educación,
                    distribuyó el resto de su fortuna entre los pobres de Lyon, y comenzó a
                    predicar. Era un laico sin formación clerical. No tenía permiso de nadie.
                    Tenía el Evangelio.
                </p>
                <p>
                    Pero no podía predicar lo que no entendía, y el Evangelio estaba en latín.
                    Waldo tomó entonces una decisión que lo convierte en pionero histórico de
                    una magnitud que no siempre se reconoce: <strong>encargó la primera
                    traducción de porciones de la Escritura al idioma del pueblo</strong>.
                    Contrató a dos clérigos —Bernardo Ydros y un maestro llamado Esteban— para
                    que tradujeran los Evangelios y otros textos bíblicos al occitano provenzal,
                    el idioma hablado en el sur de Francia. Esto ocurrió hacia 1173.
                    Doscientos años antes que Wycliffe, doscientos años antes que Tyndale.
                </p>
                <p>
                    Con ese texto en mano, Waldo y sus compañeros comenzaron a recorrer las
                    calles de Lyon predicando. Sus seguidores fueron llamados primero
                    <em>"los Pobres de Lyon"</em>, luego <em>Valdenses</em> o
                    <em>Waldenses</em>. Iban de dos en dos, como los discípulos. Vivían de
                    la caridad. Citaban la Escritura. Cuestionaban la necesidad de mediadores
                    humanos entre el alma y Dios.
                </p>
                <p>
                    El choque con la institución era inevitable. El arzobispo de Lyon les
                    prohibió predicar. Waldo respondió con el texto que Dios le había dado:
                    <em>"Es mejor obedecer a Dios que a los hombres."</em> (Hechos 5:29)
                    Siguieron predicando.
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
                    En 1179, durante el Tercer Concilio de Letrán, Pedro Waldo viajó a Roma.
                    Llevó consigo su Biblia en provenzal y pidió audiencia con el papa Alejandro III.
                    El encuentro fue extraño y revelador: el papa lo abrazó, aprobó su voto
                    de pobreza apostólica y elogió su devoción. Pero prohibió la predicación
                    pública sin autorización del clero local. El Papa reconocía la devoción
                    de Waldo. Lo que no podía tolerar era la idea de que cualquier laico pudiera
                    interpretar y predicar la Escritura por su cuenta.
                </p>
                <p>
                    Waldo regresó a Lyon y continuó predicando.
                </p>
                <p>
                    La respuesta llegó en 1184. En el Sínodo de Verona, el papa Lucio III emitió
                    la bula <em>Ad abolendam</em>, uno de los primeros documentos fundacionales
                    de la Inquisición medieval. En ese decreto, los Valdenses quedaban incluidos
                    en la lista de movimientos heréticos sujetos a persecución. La excomunión
                    era oficial. El movimiento, oficialmente ilegal.
                </p>
                <p>
                    Lo que siguió fueron décadas de persecución creciente. Waldo y sus
                    seguidores fueron expulsados de Lyon. Se dispersaron por el sur de Francia,
                    el norte de Italia, Cataluña, el Rin alemán y los Balcanes. Donde iban,
                    predicaban. Donde los perseguían, se refugiaban en las montañas.
                    Las doctrinas del movimiento se fueron radicalizando con el tiempo:
                    rechazaron el purgatorio, las indulgencias, los juramentos, el poder
                    sacramental exclusivo del clero, y eventualmente la misa misma.
                </p>
                <p>
                    La Cruzada Albigense (1209–1229), lanzada contra los cátaros del sur de
                    Francia, barrió también con muchas comunidades valdenses que habitaban
                    la misma región. Los ejércitos papales no distinguían mucho entre un
                    tipo de hereje y otro. Murieron miles. Pero el movimiento no murió.
                </p>
                <p>
                    Los Valdenses se refugiaron en los valles alpinos del Piamonte, en el
                    actual noroeste de Italia. Allí, entre montañas inaccesibles en invierno,
                    sobrevivieron siglos de Inquisición, masacres periódicas y presión constante.
                    Pedro Waldo no vivió para ver todo eso. Murió en fecha incierta, alrededor
                    de 1218, probablemente en algún lugar de Europa central. No hay lápida.
                    No hay sepulcro conocido. Solo el movimiento que dejó.
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
                    El aporte de Pedro Waldo es inseparable de su gestura fundacional:
                    <strong>poner la Escritura en manos del pueblo en su propio idioma</strong>.
                    La traducción que encargó hacia 1173 precedió en dos siglos a la Biblia
                    inglesa de Wycliffe, y en tres a la alemana de Lutero. No fue un erudito
                    universitario quien lo hizo, sino un comerciante que simplemente quería
                    entender lo que Jesús decía.
                </p>
                <p>
                    El movimiento valdense articuló posiciones teológicas que la Reforma
                    haría suyas cuatro siglos después:
                </p>
                <ul>
                    <li>
                        <strong>La Escritura como autoridad suprema.</strong> Los Valdenses
                        memoraban pasajes enteros de la Biblia —los llamaban "las joyas"— y
                        los transmitían oralmente a lo largo de generaciones. La Palabra
                        no necesitaba mediación clerical para llegar al corazón.
                    </li>
                    <li>
                        <strong>El sacerdocio universal.</strong> Los laicos podían predicar
                        y administrar sacramentos. La gracia no estaba atada a la ordenación.
                    </li>
                    <li>
                        <strong>El rechazo a las prácticas sin base escritural.</strong>
                        El purgatorio, las indulgencias, las misas por los muertos, los
                        juramentos: todo lo que no encontraba fundamento en la Escritura
                        era rechazado.
                    </li>
                    <li>
                        <strong>La vida apostólica como modelo.</strong> Pobreza voluntaria,
                        itinerancia, predicación sin salario. El Evangelio se vivía, no se
                        administraba desde un palacio.
                    </li>
                </ul>
                <p>
                    Calvino, Zwingli y Lutero llegarían a las mismas conclusiones desde la
                    universidad y el humanismo renacentista. Waldo llegó allí desde el
                    Evangelio y el mercado de Lyon.
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
                    El legado de Pedro Waldo tiene algo que ningún otro prerreformador posee:
                    <strong>una comunidad viva que sobrevivió</strong>.
                </p>
                <p>
                    En 1532, en los valles alpinos del Piamonte, se reunieron los líderes de
                    las comunidades valdenses supervivientes. Llegó hasta ellos un predicador
                    reformado, Guillaume Farel —el mismo que años después presionaría a Calvino
                    para que se quedara en Ginebra—. En el Sínodo de Chanforan, los Valdenses
                    votaron unirse formalmente a la Reforma Protestante. Eran, literalmente,
                    la congregación más antigua en existencia con raíces en la disidencia
                    pre-Reforma. El árbol de Waldo ya tenía trescientos cincuenta años
                    cuando se injertó en el tronco de la Reforma.
                </p>
                <p>
                    Pero la persecución no terminó con la Reforma. En abril de 1655, durante
                    lo que se llamó la <em>"Pascua Piamontesa"</em>, las tropas del duque de
                    Saboya masacraron comunidades valdenses en los valles alpinos. La noticia
                    llegó a Inglaterra. Oliver Cromwell protestó ante los poderes europeos.
                    John Milton, secretario de latín del gobierno inglés, escribió el soneto
                    que inmortalizó la matanza:
                </p>
                <blockquote>
                    "Venga, oh Señor, a tus santos masacrados que yacen en los fríos Alpes
                    muertos como huesos en el antiguo suelo..."
                    <br/><em>— John Milton, "On the Late Massacre in Piedmont" (1655)</em>
                </blockquote>
                <p>
                    La Iglesia Valdense (<em>Chiesa Valdese</em>) existe hasta hoy en Italia,
                    con congregaciones en América Latina y vínculos ecuménicos mundiales.
                    Es, por origen histórico, la denominación protestante más antigua del mundo.
                </p>
                <p>
                    Todo comenzó con un mercader en Lyon que escuchó a un trovador, preguntó
                    a un teólogo, vendió sus bienes y comenzó a caminar con el Evangelio
                    en la mano. Hace ochocientos cincuenta años.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
    ],

    quote: {
        text: 'Es mejor obedecer a Dios que a los hombres.',
        source: 'Pedro Waldo, al arzobispo de Lyon que le prohibió predicar',
    },

    timeline: [
        { year: 'c. 1140', event: 'Nace en Lyon o sus alrededores, en el sur de Francia. Mercader próspero.' },
        { year: 'c. 1173', event: 'Crisis espiritual: escucha la historia de San Alejo y presencia la muerte súbita de un amigo. Busca consejo y le citan Mateo 19:21.' },
        { year: 'c. 1173', event: 'Encarga la traducción de porciones de la Escritura al occitano provenzal: la primera traducción bíblica vernácula de la Edad Media occidental.' },
        { year: 'c. 1176', event: 'Distribuye su fortuna entre los pobres. Su esposa recibe los bienes raíces; sus hijas quedan en un convento. Comienza a predicar como laico itinerante.' },
        { year: '1179',    event: 'Tercer Concilio de Letrán, Roma. El papa Alejandro III lo abraza, aprueba su voto de pobreza, pero restringe la predicación laica. Waldo continúa predicando.' },
        { year: 'c. 1181', event: 'El arzobispo de Lyon le prohíbe predicar explícitamente. Waldo cita Hechos 5:29 y no obedece.' },
        { year: '1184',    event: 'Sínodo de Verona: el papa Lucio III emite Ad abolendam. Los Valdenses son declarados herejes y sujetos a persecución. Comienza el exilio definitivo.' },
        { year: 'c. 1184–1200', event: 'Los "Pobres de Lyon" se dispersan por el sur de Francia, norte de Italia, Cataluña, Renania y los Balcanes. El movimiento crece a pesar de la persecución.' },
        { year: 'c. 1218', event: 'Muerte de Pedro Waldo en fecha y lugar inciertos. Probablemente en Europa central. No hay sepulcro conocido.' },
        { year: '1209–1229', event: 'La Cruzada Albigense arrasa el sur de Francia. Los Valdenses son perseguidos junto a los cátaros. Muchas comunidades destruidas.' },
        { year: 'siglos XIII–XV', event: 'Los Valdenses sobreviven la Inquisición refugiándose en los valles alpinos del Piamonte. Transmiten la Escritura oralmente de generación en generación.' },
        { year: '1532',    event: 'Sínodo de Chanforan: los Valdenses supervivientes votan unirse formalmente a la Reforma Protestante. Guillaume Farel los vincula con Calvino y Ginebra.' },
        { year: '1655',    event: '"Pascua Piamontesa": masacre de comunidades valdenses por tropas del duque de Saboya. Oliver Cromwell protesta. John Milton escribe su famoso soneto.' },
        { year: 'Hoy',     event: 'La Chiesa Valdese existe en Italia y América Latina. Es, por origen histórico, la denominación protestante más antigua del mundo.' },
    ],
};

const PedroWaldo = () => {
    return (
        <BiographyTemplate
            biography={biography}
            seriesName="Prerreformadores"
            seriesPath="/prerreformadores"
        />
    );
};

export default PedroWaldo;
