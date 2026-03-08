import BiographyTemplate from '../../components/BiographyTemplate';

/**
 * Biografía de Martín Lutero
 *
 * CÓMO AGREGAR IMÁGENES A UNA SECCIÓN:
 *   image: {
 *     src: `${import.meta.env.BASE_URL}img/reformadores/nombre-imagen.jpg`,
 *     alt: 'Descripción de la imagen',
 *     caption: 'Pie de foto opcional',
 *   },
 *   imagePosition: 'right',   // 'right' | 'left' | 'full'
 *
 * RETRATO PRINCIPAL:
 *   Reemplazá `portrait: null` con:
 *   portrait: `${import.meta.env.BASE_URL}img/reformadores/lutero.jpg`,
 */

const biography = {
    slug: 'lutero',
    name: 'Martín Lutero',
    epithet: 'El Monje que Sacudió al Mundo',
    dates: '1483 – 1546',
    portrait: null,
    // portrait: `${import.meta.env.BASE_URL}img/reformadores/lutero.jpg`,

    sections: [
        {
            id: 'contexto',
            title: 'El Mundo que Lutero Heredó',
            content: `
                <p>
                    El 10 de noviembre de 1483, en la pequeña ciudad de Eisleben, en el corazón del Sacro Imperio Romano Germánico,
                    nació un niño que sus padres bautizaron Martín, en honor al santo cuya festividad caía al día siguiente.
                    Nadie en ese momento podía imaginar que ese niño de minero saxón partiría en dos la historia de la Iglesia
                    occidental.
                </p>
                <p>
                    El mundo que Lutero heredó era el del ocaso de la Edad Media. Hacía solo treinta años que Johannes Gutenberg
                    había perfeccionado la imprenta de tipos móviles en Maguncia, y su invención estaba transformando silenciosamente
                    la circulación del conocimiento: lo que antes tardaba años en copiarse a mano ahora podía reproducirse en miles
                    de ejemplares en cuestión de días. Ningún otro instrumento haría más por la Reforma que esta máquina.
                </p>
                <p>
                    En Italia, el Renacimiento estaba en pleno apogeo. Leonardo da Vinci tenía un año más que Lutero; Miguel Ángel,
                    ocho años menos. Erasmo de Rotterdam —el humanista más influyente de Europa— publicaría en 1516 su edición
                    crítica del Nuevo Testamento en griego, la primera herramienta que permitiría leer las Escrituras sin depender
                    del latín de la Vulgata. Ese texto sería el que Lutero usaría para su traducción alemana.
                </p>
                <p>
                    Pero debajo del esplendor renacentista, la Iglesia atravesaba una crisis profunda. El papado acababa de salir
                    del Gran Cisma de Occidente —décadas en que hubo simultáneamente dos y hasta tres papas enfrentados—.
                    La simonía era práctica corriente: los obispados y cardenalatos se compraban y vendían. Las indulgencias
                    se comercializaban como mercancía. El clero era mayoritariamente ignorante y con frecuencia corrupto. Y el pueblo
                    —analfabeto, supersticioso, aterrorizado por la muerte y el purgatorio— pagaba por sacramentos que, según la
                    doctrina oficial, eran el único pasaje a la salvación.
                </p>
                <p>
                    En ese mundo nació Martín Lutero. Y en ese mundo comenzó a hacerse una pregunta que lo devoraría durante años:
                    <em>¿Cómo puede un pecador hallarse ante un Dios justo?</em>
                </p>
            `,
        },
        {
            id: 'tormenta',
            title: 'La Tormenta Interior: Un Monje en Busca de Dios',
            content: `
                <p>
                    Hans Lutero, el padre de Martín, era un hombre de carácter duro y ambiciones claras. Había ascendido desde el trabajo
                    en las minas de cobre hasta convertirse en empresario mediano, y había invertido todo su orgullo en que su hijo mayor
                    estudiara leyes y asegurara el ascenso de la familia. Martín obedeció: estudió en Erfurt, la universidad más prestigiosa
                    de Alemania, y en 1505 estaba a punto de comenzar los estudios de derecho.
                </p>
                <p>
                    Entonces llegó la tormenta.
                </p>
                <p>
                    El 2 de julio de 1505, regresando a pie desde Mansfeld hacia Erfurt, una tormenta violenta atrapó al joven Lutero
                    cerca del pueblo de Stotternheim. Un rayo cayó tan cerca de él que lo derribó al suelo. Convencido de que iba a morir,
                    gritó en el instante más primitivo de su terror: <em>"¡Santa Ana, sálvame y me haré monje!"</em>
                </p>
                <p>
                    Dos semanas después, para consternación de su padre y de sus amigos, entró al monasterio agustino de Erfurt.
                    Hans Lutero no le habló durante meses.
                </p>
                <p>
                    Dentro del monasterio, Lutero se entregó a la vida religiosa con una intensidad que alarmaba a sus superiores.
                    Ayunaba hasta desvanecerse. Pasaba horas en la celda de confesión. Realizaba penitencias extremas. Pero cuanto más
                    esfuerzo ponía, menos paz encontraba. Lo perseguía lo que él llamaría <em>Anfechtungen</em>: ataques de terror espiritual,
                    convicción aplastante de que era irremediablemente reprobado, que Dios no podía sino odiarlo.
                </p>
                <p>
                    Su confesor, Johann von Staupitz, vicario general de los agustinos, intentó orientarlo. Pero Lutero no encontraba
                    consuelo en los sacramentos, en las penitencias, ni en los santos. La pregunta lo devoraba: <em>¿Cómo puede el hombre
                    ser justo ante un Dios perfectamente justo?</em> Cuanto más intentaba satisfacer la justicia divina con sus obras,
                    más enorme se le hacía la brecha.
                </p>
                <p>
                    Fue Staupitz quien lo envió a enseñar teología en la recién fundada Universidad de Wittenberg, en 1508, y quien
                    lo dirigió a concentrarse en Cristo en lugar de en sus propias obras. Y fue en esa misma universidad, preparando
                    clases sobre los Salmos y las cartas de Pablo, donde la respuesta finalmente llegó.
                </p>
                <p>
                    Leyendo Romanos 1:17 —<em>"el justo vivirá por la fe"</em>— Lutero tuvo lo que la historia llama la <em>experiencia
                    de la torre</em>. La frase que durante años le había parecido una amenaza —"la justicia de Dios"— la entendió de
                    pronto de manera completamente distinta: no era la justicia con la que Dios castiga al pecador, sino la justicia
                    que Dios <em>otorga</em> al pecador por fe. La salvación no era una recompensa que se ganaba; era un regalo que
                    se recibía.
                </p>
                <p>
                    Décadas después, Lutero escribió sobre ese momento: <em>"Me sentí completamente renacido y como si hubiera entrado
                    por las puertas abiertas al paraíso mismo."</em>
                </p>
            `,
        },
        {
            id: 'tesis',
            title: 'Las 95 Tesis: El Día que Cambió la Historia',
            content: `
                <p>
                    La chispa que encendió la hoguera tenía nombre: Johann Tetzel.
                </p>
                <p>
                    Tetzel era un fraile dominico con un don extraordinario para el espectáculo. Recorría las ciudades alemanas vendiendo
                    indulgencias —documentos que, según se predicaba, reducían el tiempo en el purgatorio— con el eslogan que se hizo
                    célebre: <em>"En cuanto la moneda en el cofre suena, el alma del purgatorio al cielo vuela."</em>
                    El dinero recaudado tenía un destino preciso: pagar la construcción de la nueva Basílica de San Pedro en Roma y,
                    de paso, solventar las deudas del arzobispo Alberto de Maguncia, quien había pagado fortunas a la familia bancaria
                    Fugger para comprar su cargo eclesiástico.
                </p>
                <p>
                    Los feligreses de Wittenberg cruzaban la frontera para comprar las indulgencias de Tetzel y luego regresaban a
                    confesarse con Lutero diciéndole que ya no necesitaban cambiar su conducta porque tenían el papel que los garantizaba.
                    Para Lutero, que había luchado con el alma durante años para hallar la gracia, eso era escandaloso.
                </p>
                <p>
                    El 31 de octubre de 1517, víspera del Día de Todos los Santos, Lutero escribió sus <em>Noventa y Cinco Tesis</em>
                    —formalmente, <em>Disputatio pro Declaratione Virtutis Indulgentiarum</em>— y, según la tradición, las clavó en la
                    puerta de la Iglesia del Castillo de Wittenberg, que funcionaba como tablón de anuncios académico. También envió
                    copias al arzobispo de Maguncia y a otros obispos.
                </p>
                <p>
                    Las tesis estaban escritas en latín, el idioma de los académicos, para provocar un debate teológico interno.
                    Lutero no pretendía romper con la Iglesia. No esperaba más que una disputa escolástica.
                </p>
                <p>
                    Lo que ocurrió lo dejó atónito. Alguien tradujo las tesis al alemán y las llevó a una imprenta. En dos semanas
                    estaban circulando por toda Alemania. En dos meses, habían cruzado Europa. La imprenta de Gutenberg hizo en días
                    lo que habría tardado décadas sin ella. Lutero se encontró, de la noche a la mañana, en el centro de un incendio
                    que él mismo no había previsto.
                </p>
                <p>
                    El Elector de Sajonia, Federico el Sabio, se negó a entregar a Lutero a Roma por razones en parte políticas —los
                    príncipes alemanes resentían profundamente el flujo de dinero hacia Italia— y en parte porque la opinión pública
                    alemana había comenzado a ver en Lutero al hombre que se atrevía a decir en voz alta lo que muchos pensaban.
                </p>
            `,
        },
        {
            id: 'ruptura',
            title: 'La Ruptura con Roma: Tres Tratados y una Hoguera',
            content: `
                <p>
                    Roma no respondió al debate teológico. Respondió con presión política. Y esa presión fue lo que convenció a Lutero,
                    paso a paso, de que el problema no era solo la corrupción de algunos eclesiásticos sino la arquitectura misma del
                    sistema.
                </p>
                <p>
                    En el debate de Leipzig de 1519, el teólogo Johann Eck maniobró a Lutero para que declarara que el Concilio de
                    Constanza —que había quemado a Jan Hus un siglo antes— podía haberse equivocado. Para Lutero fue un momento
                    decisivo: si los concilios podían errar, si los papas podían errar, entonces la única autoridad infalible era
                    la Escritura. <em>Sola Scriptura.</em>
                </p>
                <p>
                    En 1520 escribió en torrente los tres grandes tratados que definieron la Reforma:
                </p>
                <ul>
                    <li>
                        <strong>A la Nobleza Cristiana de la Nación Alemana:</strong> llamó a los príncipes a reformar la Iglesia,
                        derribando las "tres murallas" con que Roma se protegía: la superioridad del clero sobre los laicos, la
                        autoridad exclusiva del papa para interpretar la Escritura, y la prerrogativa papal de convocar concilios.
                    </li>
                    <li>
                        <strong>El Cautiverio Babilónico de la Iglesia:</strong> atacó el sistema sacramental medieval, reduciendo
                        los siete sacramentos a dos —bautismo y comunión— y negando la doctrina de la transubstanciación tal como
                        Roma la enseñaba.
                    </li>
                    <li>
                        <strong>La Libertad del Cristiano:</strong> expuso la paradoja central de la fe evangélica con una frase
                        de antología: <em>"El cristiano es el señor perfectamente libre de todas las cosas y no está sujeto a nadie.
                        El cristiano es el siervo perfectamente sumiso a todas las cosas y está sujeto a todos."</em> La libertad
                        que da el evangelio no produce licencia, sino servicio.
                    </li>
                </ul>
                <p>
                    En junio de 1520, el papa León X lanzó la bula <em>Exsurge Domine</em> amenazando con la excomunión si Lutero
                    no retractaba cuarenta y uno de sus postulados en sesenta días.
                </p>
                <p>
                    El 10 de diciembre de 1520, Lutero quemó la bula papal en la Puerta de Elster de Wittenberg, ante una multitud
                    de estudiantes y profesores. Había cruzado el punto sin retorno.
                </p>
                <p>
                    El 3 de enero de 1521, el papa lo excomulgó formalmente. Lutero tenía treinta y siete años.
                </p>
            `,
        },
        {
            id: 'worms',
            title: 'Worms: «Aquí Estoy»',
            content: `
                <p>
                    El nuevo emperador del Sacro Imperio, Carlos V —dueño de España, los Países Bajos, Nápoles, Sicilia y los territorios
                    de las Américas recién descubiertas; el hombre más poderoso del mundo en ese momento— convocó a Lutero a comparecer
                    ante la Dieta Imperial reunida en Worms en abril de 1521.
                </p>
                <p>
                    Sus amigos le suplicaron que no fuera. Le recordaron que Jan Hus había recibido un salvoconducto parecido cien años
                    antes y había sido quemado de todas formas. Lutero respondió: <em>"Aunque hubiera tantos demonios en Worms como
                    tejas en los techos, yo igualmente entraría."</em>
                </p>
                <p>
                    El 17 y 18 de abril de 1521, ante el emperador, los príncipes del Imperio, los cardenales y el nuncio papal,
                    Lutero fue interrogado. Se le presentó una pila de sus escritos y se le preguntó si los retractaba. El primer día
                    pidió tiempo para reflexionar. El segundo día respondió con una declaración que quedaría grabada en la historia:
                </p>
                <blockquote>
                    <em>"A menos que sea convencido por el testimonio de las Escrituras o por argumentos claros y evidentes de la razón
                    —pues no acepto la autoridad de papas ni de concilios solos, ya que es evidente que se han equivocado con frecuencia
                    y se han contradicho mutuamente— estoy atado por las Escrituras que he citado, y mi conciencia está cautiva
                    a la Palabra de Dios. No puedo ni quiero retractarme de nada, porque actuar en contra de la conciencia
                    no es seguro ni está en nuestras manos. Aquí estoy. No puedo hacer otra cosa. Que Dios me ayude. Amén."</em>
                </blockquote>
                <p>
                    Carlos V lo declaró hereje y proscrito del Imperio. Cualquiera podía matarlo sin consecuencias legales.
                </p>
                <p>
                    Federico el Sabio, elector de Sajonia, organizó un simulacro de secuestro. Un grupo de jinetes enmascarados interceptó
                    el carruaje de Lutero en el bosque y lo llevó al castillo de Wartburg, en las colinas de Turingia, donde vivió
                    disfrazado de caballero, bajo el nombre de <em>Junker Jörg</em>.
                </p>
                <p>
                    En el Wartburg, en once semanas de trabajo febril, Lutero tradujo el Nuevo Testamento al alemán, usando el texto
                    griego de Erasmo. El <em>Nuevo Testamento de Septiembre</em>, publicado en 1522, se imprimió en ediciones de miles
                    de ejemplares que se agotaron de inmediato. Por primera vez en la historia, el pueblo alemán podía leer la Palabra
                    de Dios en su propia lengua sin mediación clerical.
                </p>
                <p>
                    También escribió sus grandes himnos, entre ellos <em>Castillo Fuerte es Nuestro Dios</em> —<em>Ein feste Burg ist
                    unser Gott</em>—, basado en el Salmo 46. Aquella canción se convertiría en el himno de la Reforma.
                </p>
            `,
        },
        {
            id: 'legado',
            title: 'Legado: El Mundo Después de Lutero',
            content: `
                <p>
                    La vida de Lutero después de Worms no estuvo exenta de sombras. La Guerra de los Campesinos (1524–1525), en la
                    que sectores radicales usaron el lenguaje reformador para justificar una revuelta social, puso a Lutero en una
                    posición difícil. Su llamado a los príncipes a sofocar la rebelión con violencia le ganó la amargura de muchos
                    que lo habían visto como un libertador. Es una página oscura que sus biógrafos honestos no pueden pasar en silencio.
                </p>
                <p>
                    En 1525, Lutero se casó con Katharina von Bora, una ex monja que había escapado de su convento. El matrimonio
                    de un sacerdote con una monja era un escándalo deliberado, una demostración teológica en acto: el celibato obligatorio
                    no era mandato bíblico, el matrimonio era honroso, y la vida del hogar era una vocación sagrada. Tuvieron seis hijos.
                    Katharina administraba la casa, el huerto, la cervecería y las finanzas con una eficiencia que Lutero admiraba
                    abiertamente. La llamaba <em>mi señor Katy</em>.
                </p>
                <p>
                    En 1530, Felipe Melanchton —el colaborador más cercano de Lutero, genio teológico a quien Lutero llamaba
                    <em>"el precéptor de Alemania"</em>— redactó la Confesión de Augsburgo, la exposición sistemática de la doctrina
                    luterana presentada ante el emperador Carlos V. Es hasta hoy el documento confesional central del luteranismo.
                </p>
                <p>
                    Lutero continuó trabajando hasta el final: predicando, escribiendo, traduciendo. En 1534 se publicó la Biblia
                    alemana completa, el trabajo más ambicioso de su vida, que además de ser un monumento teológico fue fundacional
                    para la unificación del idioma alemán. Lo que la Biblia del Rey Jacobo haría para el inglés, la Biblia de Lutero
                    lo hizo para el alemán.
                </p>
                <p>
                    El 18 de febrero de 1546, Lutero murió en Eisleben —la misma ciudad donde había nacido sesenta y dos años antes—,
                    mientras viajaba para mediar en una disputa entre dos condes. Sus últimas palabras escritas fueron: <em>"Somos
                    mendigos. Esto es verdad."</em>
                </p>
                <p>
                    Detrás de él dejaba una Iglesia dividida para siempre, una Europa transformada, un idioma enriquecido,
                    una teología que ponía la gracia y la fe en el centro, y la certeza —comprada al precio de una vida entera de
                    lucha— de que la Palabra de Dios es suficiente para que cualquier ser humano encuentre el camino a Dios.
                </p>
                <p>
                    El principio de los <em>cinco solas</em> que él contribuyó a forjar —<em>sola Scriptura, sola fide, sola gratia,
                    solus Christus, soli Deo gloria</em>— sigue siendo la espina dorsal teológica de las Iglesias que llevan su herencia.
                </p>
            `,
        },
    ],

    quote: {
        text: 'Aquí estoy, no puedo hacer otra cosa. Que Dios me ayude. Amén.',
        attribution: 'Martín Lutero — Dieta de Worms, 18 de abril de 1521',
    },

    timeline: [
        { year: '1483', event: 'Nace el 10 de noviembre en Eisleben, Sajonia.' },
        { year: '1501', event: 'Ingresa a la Universidad de Erfurt, la más prestigiosa de Alemania.' },
        { year: '1505', event: 'El rayo de Stotternheim. Voto a Santa Ana. Entra al monasterio agustino de Erfurt.' },
        { year: '1507', event: 'Ordenado sacerdote. Su primera misa lo paraliza de terror ante la santidad de Dios.' },
        { year: '1508', event: 'Enviado a enseñar teología en la nueva Universidad de Wittenberg por Staupitz.' },
        { year: 'c. 1515', event: 'La "experiencia de la torre": Romanos 1:17 y el descubrimiento de la justicia imputada.' },
        { year: '1516', event: 'Erasmo publica su Nuevo Testamento griego, herramienta que Lutero usará para su traducción.' },
        { year: '1517', event: '31 de octubre: las 95 Tesis. La imprenta las difunde por toda Europa en semanas.' },
        { year: '1519', event: 'Debate de Leipzig con Johann Eck. Lutero defiende que los concilios pueden errar.' },
        { year: '1520', event: 'Los tres grandes tratados reformadores. Quema la bula papal en la Puerta de Elster.' },
        { year: '1521', event: 'Enero: excomunión. Abril: Dieta de Worms. "Aquí estoy." Secuestro al Wartburg.' },
        { year: '1522', event: 'Traducción del Nuevo Testamento al alemán en 11 semanas. El Nuevo Testamento de Septiembre.' },
        { year: '1525', event: 'Guerra de los Campesinos. Se casa con Katharina von Bora.' },
        { year: '1529', event: 'Coloquio de Marburgo: ruptura con Zuinglio sobre la Cena del Señor.' },
        { year: '1530', event: 'Confesión de Augsburgo, presentada ante el emperador Carlos V por Melanchton.' },
        { year: '1534', event: 'Publicación de la Biblia alemana completa, monumento lingüístico y teológico.' },
        { year: '1546', event: '18 de febrero: muere en Eisleben. Sus últimas palabras: "Somos mendigos. Esto es verdad."' },
    ],
};

const Lutero = () => (
    <BiographyTemplate
        biography={biography}
        seriesName="Reformadores"
        seriesPath="/reformadores"
    />
);

export default Lutero;
