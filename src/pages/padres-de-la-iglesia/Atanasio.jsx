import BiographyTemplate from '../../components/BiographyTemplate';

const biography = {
    slug: 'atanasio',
    name: 'Atanasio de Alejandría',
    epithet: 'El Campeón de la Trinidad',
    dates: 'c. 296 – 373',
    portrait: null,
    heroImage: `${import.meta.env.BASE_URL}img/padres-de-la-iglesia/atanasio-hero.jpg`,

    sections: [
        {
            id: 'formacion',
            title: 'El Joven de Alejandría',
            content: `
                <p>
                    Atanasio nació en Alejandría alrededor del año 296, en el seno de una familia
                    cristiana de la ciudad más cosmopolita del Imperio. Alejandría era el cerebro
                    del mundo antiguo: allí convivían la filosofía griega, la cultura judía, el
                    pensamiento egipcio y, desde el siglo I, un floreciente cristianismo que había
                    producido a Orígenes y Clemente —las mentes más ambiciosas del pensamiento
                    cristiano temprano—. En ese ambiente intelectualmente saturado, el joven
                    Atanasio recibió una formación que combinaba las letras clásicas con la
                    teología cristiana, y que lo preparó para la tarea que lo esperaba.
                </p>
                <p>
                    Siendo todavía adolescente entró al servicio del obispo Alejandro de Alejandría
                    como secretario y lector. El obispo reconoció en él una inteligencia poco común
                    y una determinación que pocas veces se ven juntas en un joven. Alrededor del
                    año 318, cuando Atanasio tendría unos veintidós años, escribió sus primeras
                    obras teológicas de importancia: <em>Contra los Gentiles</em> y
                    <em>De Incarnatione</em> (Sobre la Encarnación). La segunda es una de las
                    joyas de la literatura patrística: una exposición clara, elegante y profunda
                    de por qué el Hijo de Dios tuvo que hacerse hombre, y de qué significa la
                    muerte y resurrección de Cristo para la humanidad. La escribió siendo
                    prácticamente un muchacho, y sigue siendo leída con provecho mil setecientos
                    años después.
                </p>
                <p>
                    Pero la tormenta que definiría toda su vida ya se estaba formando.
                    En la misma Alejandría, un presbítero llamado Arrio estaba enseñando una
                    doctrina sobre Cristo que, de triunfar, habría cambiado el cristianismo
                    de manera irreversible.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
        {
            id: 'nicea',
            title: 'El Concilio de Nicea',
            content: `
                <p>
                    Arrio era un predicador popular y un hombre de indudable inteligencia.
                    Su doctrina era aparentemente simple: el Hijo de Dios es la primera y más
                    excelsa de las criaturas divinas, pero es una criatura. Hubo un tiempo en
                    que el Hijo no existía. El Padre es eterno; el Hijo tuvo un comienzo.
                    No son iguales en naturaleza. Su eslogan era devastadoramente memorizable:
                    <em>«Hubo un tiempo en que no era»</em>.
                </p>
                <p>
                    El obispo Alejandro condenó la doctrina de Arrio y lo expulsó de Alejandría,
                    pero Arrio consiguió el apoyo de influyentes obispos en otras provincias —en
                    particular de Eusebio de Nicomedia, consejero eclesiástico del emperor
                    Constantino—. La controversia se extendió por todo el Imperio con una velocidad
                    que alarmó al propio Constantino, quien acababa de unificar el Imperio
                    y no quería una Iglesia dividida como factor de inestabilidad.
                    En el 325 convocó un concilio en Nicea, en Bitinia, al que asistieron
                    alrededor de trescientos obispos de todo el mundo cristiano.
                </p>
                <p>
                    Atanasio asistió como diácono y secretario del obispo Alejandro.
                    Tenía menos de treinta años y no podía votar, pero su presencia fue
                    decisiva en los debates. El concilio rechazó la doctrina de Arrio
                    y formuló el Credo que todavía recitamos: el Hijo es <em>«de la misma
                    sustancia que el Padre»</em> (<em>homoousios</em> en griego).
                    Arrio fue exiliado. El arrianismo fue condenado.
                </p>
                <p>
                    Atanasio regresó a Alejandría convencido de que la batalla estaba ganada.
                    En el 328, a la muerte del obispo Alejandro, fue consagrado su sucesor.
                    Tenía aproximadamente treinta años. Le esperaban cuarenta y cinco años
                    de episcopado, cinco exilios y la experiencia de ver cómo la decisión
                    de Nicea era sistemáticamente traicionada por emperadores y obispos que
                    habrían preferido una fórmula de compromiso que salvara la paz política
                    a costa de la verdad teológica.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
        {
            id: 'exilios',
            title: 'Atanasio contra el Mundo',
            content: `
                <p>
                    La muerte de Constantino en el 337 abrió la puerta a la revancha arriana.
                    Sus hijos que lo sucedieron —en particular Constancio II, que gobernó el
                    Oriente y luego todo el Imperio— eran favorables al arrianismo o a fórmulas
                    de compromiso que lo suavizaban sin condenarlo. La maquinaria imperial
                    se puso al servicio de la revisión de Nicea.
                </p>
                <p>
                    Atanasio sufrió cinco exilios en cuarenta y cinco años de episcopado,
                    expulsado sucesivamente por cuatro emperadores diferentes.
                    El primero lo llevó a Tréveris, en Galia, en el 335.
                    El segundo a Roma en el 339, donde el papa Julio I lo recibió y lo defendió.
                    El tercero al desierto de Egipto en el 356, donde vivió escondido entre
                    los monjes durante seis años, escribiendo sin parar.
                    El cuarto, brevísimo, bajo el emperor Juliano el Apóstata en el 362.
                    El quinto bajo el arriano Valente en el 365–366, del que regresó en
                    cuatro meses cuando la amenaza de disturbios populares obligó al emperor
                    a ceder.
                </p>
                <p>
                    En sus peores momentos, cuando el arrianismo parecía haber conquistado
                    a casi todos los obispos del Imperio y cuando sus propios colaboradores
                    le aconsejaban ceder en algo para sobrevivir, alguien le dijo que el
                    mundo entero estaba contra él. Su respuesta quedó para siempre en la
                    historia del pensamiento cristiano: <em>«Atanasio contra el mundo»</em>
                    (<em>Athanasius contra mundum</em>). No era arrogancia. Era la convicción
                    de que si el mundo entero se equivocaba en algo tan fundamental como
                    quién es Cristo, no quedaba otra opción que mantenerse en pie aunque
                    se estuviera solo.
                </p>
                <p>
                    La tenacidad de Atanasio no era una virtud aislada: era la consecuencia
                    de su teología. Para él, la cuestión no era un tecnicismo filosófico.
                    Si el Hijo no es verdadero Dios —de la misma sustancia que el Padre—,
                    entonces la salvación no existe. Solo Dios puede salvar al hombre.
                    Si Cristo es una criatura, por excelsa que sea, su muerte y resurrección
                    no tienen poder para reconciliar al ser humano con Dios. El arrianismo
                    no era solo un error doctrinal; era la destrucción del evangelio.
                    Por eso no podía ceder.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
        {
            id: 'teologia',
            title: 'La Teología de la Encarnación',
            content: `
                <p>
                    El argumento central de Atanasio tiene una elegancia casi matemática.
                    En su <em>De Incarnatione</em>, escrito décadas antes de que la controversia
                    arriana comenzara, ya estaba el núcleo de todo: Dios creó al ser humano
                    a su imagen, para la comunión con Él. El pecado destruyó esa imagen y
                    condenó al hombre a la corrupción y la muerte. Solo quien es plenamente
                    Dios puede restaurar la imagen divina en el hombre. Solo quien se hace
                    plenamente hombre puede tomar sobre sí la muerte del hombre y vencerla.
                    El Salvador tiene que ser verdadero Dios y verdadero hombre, o la salvación
                    es una ilusión.
                </p>
                <p>
                    De allí su fórmula clásica, que los Reformadores citarían con admiración:
                    <em>«Dios se hizo hombre para que el hombre pudiera llegar a ser dios»</em>.
                    No «dios» en el sentido pagano de adquirir poderes divinos, sino en el
                    sentido bíblico de ser restaurado a la comunión plena con Dios, de
                    participar de la naturaleza divina (2 Pedro 1:4). La <em>theosis</em>
                    —la deificación o divinización— no es una idea pagana injertada en el
                    cristianismo; es la consecuencia lógica de la Encarnación.
                </p>
                <p>
                    Atanasio también contribuyó decisivamente a la cuestión del canon bíblico.
                    En su carta pastoral de Pascua del año 367 —la Carta Festal XXXIX—
                    enumeró por primera vez en la historia los veintisiete libros que hoy
                    componen el Nuevo Testamento, exactamente los mismos, ni más ni menos.
                    El documento más antiguo que contiene la lista del canon neotestamentario
                    tal y como lo conocemos lleva la firma de Atanasio de Alejandría.
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
                    Atanasio murió el 2 de mayo del 373, en su cama, en Alejandría,
                    habiendo regresado de su último exilio siete años antes.
                    Había sido obispo de Alejandría durante cuarenta y cinco años,
                    de los cuales pasó diecisiete en el destierro.
                </p>
                <p>
                    El arrianismo no murió con él. Sobrevivió entre las tribus germánicas
                    que habían sido evangelizadas por misioneros arrianos, y dominó el
                    Occidente bárbaro durante otro siglo. Pero dentro del Imperio, la
                    ortodoxia de Nicea triunfó definitivamente en el Concilio de
                    Constantinopla del 381, ocho años después de la muerte de Atanasio.
                    El Credo Niceno-Constantinopolitano que ese concilio ratificó —el que
                    las iglesias siguen recitando hoy— es el monumento a su tenacidad.
                </p>
                <p>
                    Los Reformadores del siglo XVI lo admiraron sin reservas. Calvino lo
                    cita frecuentemente como testigo de la doctrina de la Trinidad y la
                    plena divinidad de Cristo. Cuando los reformadores afirmaban que
                    querían recuperar la fe de los primeros siglos contra las corrupciones
                    medievales, era en parte a Atanasio a quien querían recuperar:
                    el obispo que se negó a doblegarse ante el poder imperial cuando
                    el poder imperial quería una doctrina a su conveniencia.
                </p>
                <p>
                    Su lección sigue siendo urgente. En cada generación aparece la tentación
                    de suavizar la doctrina de Cristo para hacerla más aceptable, más moderna,
                    menos escandalosa. Atanasio enseña que esa suavización no es tolerancia
                    sino traición: no al teólogo que formuló el dogma, sino al evangelio
                    que hace posible la salvación. Si Cristo no es Dios, no hay evangelio.
                    Y si no hay evangelio, no hay nada que predicar.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
    ],

    quote: {
        text: 'Dios se hizo hombre para que el hombre pudiera llegar a ser dios.',
        source: 'Atanasio de Alejandría, De Incarnatione',
    },

    timeline: [
        { year: 'c. 296',   event: 'Nace en Alejandría, Egipto, en una familia cristiana.' },
        { year: 'c. 312',   event: 'Entra al servicio del obispo Alejandro de Alejandría como secretario y lector.' },
        { year: 'c. 318',   event: 'Escribe Contra los Gentiles y De Incarnatione, joyas tempranas de la teología patrística.' },
        { year: '318–319',  event: 'Arrio comienza a predicar su doctrina en Alejandría. El obispo Alejandro lo condena y expulsa.' },
        { year: '325',      event: 'Asiste al Concilio de Nicea como diácono de Alejandro. El concilio condena el arrianismo y formula el Credo. Atanasio tiene menos de 30 años.' },
        { year: '328',      event: 'Consagrado obispo de Alejandría tras la muerte del obispo Alejandro. Tiene aproximadamente 30 años.' },
        { year: '335',      event: 'Primer exilio a Tréveris (Galia), por orden del Concilio de Tiro, controlado por los arrianos.' },
        { year: '337',      event: 'Regresa a Alejandría tras la muerte del emperor Constantino.' },
        { year: '339',      event: 'Segundo exilio a Roma. El papa Julio I lo recibe, defiende y declara inocente.' },
        { year: '346',      event: 'Regresa triunfalmente a Alejandría. Período de relativa paz.' },
        { year: '356',      event: 'Tercer exilio, el más largo (6 años). Huye al desierto de Egipto y vive entre los monjes. Escribe sin parar.' },
        { year: '362',      event: 'Cuarto exilio, breve, bajo el emperor Juliano el Apóstata.' },
        { year: '365–366',  event: 'Quinto exilio bajo el arriano Valente, de apenas 4 meses.' },
        { year: '367',      event: 'Escribe la Carta Festal XXXIX: el primer documento que lista los 27 libros del Nuevo Testamento.' },
        { year: '373',      event: 'Muere en Alejandría el 2 de mayo, en su cama, tras 45 años de episcopado y 17 en el destierro.' },
        { year: '381',      event: 'El Concilio de Constantinopla confirma definitivamente el Credo de Nicea. La causa de Atanasio triunfa ocho años después de su muerte.' },
    ],
};

const Atanasio = () => {
    return (
        <BiographyTemplate
            biography={biography}
            seriesName="Padres de la Iglesia"
            seriesPath="/padres-de-la-iglesia"
        />
    );
};

export default Atanasio;
