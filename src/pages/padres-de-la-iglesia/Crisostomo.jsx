import BiographyTemplate from '../../components/BiographyTemplate';

const biography = {
    slug: 'crisostomo',
    name: 'Juan Crisóstomo',
    epithet: 'La Boca de Oro',
    dates: 'c. 347 – 407',
    portrait: null,
    heroImage: `${import.meta.env.BASE_URL}img/padres-de-la-iglesia/crisostomo-hero.jpg`,

    sections: [
        {
            id: 'formacion',
            title: 'La Escuela de Antioquía',
            content: `
                <p>
                    Juan nació en Antioquía, la tercera ciudad del Imperio romano, alrededor
                    del año 347. Su padre, oficial militar, murió poco después de su nacimiento,
                    y su madre Antusa —viuda a los veinte años— decidió no volverse a casar
                    para dedicarse a la educación de su hijo. Cuando Juan tenía alrededor de
                    veinte años, el retórico más famoso del mundo griego, Libanio de Antioquía,
                    lo habría querido como sucesor en su cátedra. Se cuenta que cuando alguien
                    le preguntó en su vejez quién lo sucedería, respondió: «Juan, si los
                    cristianos no me lo hubiesen quitado».
                </p>
                <p>
                    Pero Juan fue bautizado en 369 por el obispo Melecio de Antioquía y eligió
                    un camino diferente. Estudió teología bajo Diodoro de Tarso, uno de los
                    maestros de la escuela antioquena de interpretación bíblica —una escuela
                    que privilegiaba el sentido literal e histórico de la Escritura sobre la
                    alegoría especulativa de Alejandría—. Esa formación marcaría toda su
                    predicación: Juan siempre predicó <em>desde</em> el texto, versículo a
                    versículo, buscando lo que el autor quiso decir antes de buscar lo que
                    el intérprete querría que dijera.
                </p>
                <p>
                    Hacia el año 371, movido por el deseo de vida contemplativa, se unió a
                    una comunidad ascética en las montañas cercanas a Antioquía, bajo la
                    dirección del monje Carterio. Dos años después se retiró a vivir solo
                    en una cueva, practicando una austeridad severa que dañó permanentemente
                    su estómago y sus riñones. En 381 la salud lo obligó a regresar a
                    la ciudad. Fue ordenado diácono. En 386, el obispo Flaviano lo ordenó
                    presbítero y le encomendó la predicación en la catedral principal de
                    Antioquía. Había encontrado su vocación.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
        {
            id: 'predicacion',
            title: 'La Boca de Oro de Antioquía',
            content: `
                <p>
                    Durante once años, Juan predicó en Antioquía con una regularidad y una
                    profundidad que no tienen parangón en la historia de la Iglesia antigua.
                    Sus homilías sobre el Evangelio de Mateo (noventa discursos), el Evangelio
                    de Juan (ochenta y ocho), la Carta a los Romanos (treinta y dos),
                    las Cartas a los Corintios, Gálatas, Efesios, Filipenses, Colosenses:
                    una exposición sistemática del Nuevo Testament libro por libro, semana
                    a semana, que sigue siendo hoy una fuente de primera categoría para
                    la predicación y la exégesis.
                </p>
                <p>
                    Su método era la exposición directa del texto. Explicaba el significado
                    de las palabras griegas, reconstruía el contexto histórico, identificaba
                    la intención del autor y luego aplicaba con una franqueza que desconcertaba
                    a los oyentes más acomodados. Porque Juan no predicaba para halagar.
                    Predicaba sobre el dinero con una radicalidad que incomodaba a los ricos
                    de Antioquía: <em>«¿Quieres honrar el cuerpo de Cristo? No lo desprecies
                    cuando está desnudo. No lo honres en el templo con ropas de seda mientras
                    lo dejas fuera sin abrigo y tiritando de frío»</em>. La conexión entre
                    la Eucaristía y el pobre era para él teológicamente inseparable.
                </p>
                <p>
                    En el año 387, durante los llamados «Motines de las Estatuas», la población
                    de Antioquía derribó en un estallido de furia las estatuas del emperador
                    Teodosio en protesta por un nuevo impuesto. El delito era de lesa majestad
                    y podía costar a la ciudad su estatuto privilegiado —o algo peor—.
                    Durante las semanas de espera, mientras el obispo Flaviano viajaba a
                    implorar clemencia al emperador, Juan predicó veintiuna homilías consecutivas
                    que caldearon, consolaron y mantuvieron en pie a una ciudad paralizada
                    por el terror. Son algunas de las piezas de retórica pastoral más brillantes
                    que se conservan de la Antigüedad.
                </p>
                <p>
                    Fue en Antioquía donde sus oyentes le dieron el sobrenombre que lo
                    acompañaría para siempre: <em>Chrysostomos</em>, «boca de oro».
                    No era un nombre que él mismo usara. Era el reconocimiento espontáneo
                    de quienes lo escuchaban semana tras semana de que aquel hombre tenía
                    el don extraño de hacer que las Escrituras ardieran.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
        {
            id: 'constantinopla',
            title: 'El Obispo de Constantinopla',
            content: `
                <p>
                    En el año 397 murió el arzobispo de Constantinopla, la capital imperial.
                    El emperor Arcadio, aconsejado por su primer ministro Eutropio, eligió
                    a Juan de Antioquía para el cargo más importante de la Iglesia oriental.
                    Juan fue trasladado prácticamente a la fuerza —para evitar las intrigas
                    que acompañaban cualquier elección en la capital— y consagrado arzobispo
                    en febrero del 398.
                </p>
                <p>
                    Lo que encontró en Constantinopla lo horrorizó. El clero de la capital
                    vivía en un lujo ostentoso, banqueteaba con los ricos y ignoraba a los
                    pobres. Los obispos que visitaban la ciudad eran entretenidos en el
                    palacio arzobispal con una magnificencia que competía con la corte imperial.
                    Juan acabó con todo eso en las primeras semanas. Vendió los muebles
                    suntuosos del palacio y el dinero fue a hospitales. Dejó de recibir
                    invitaciones de la aristocracia —y de darlas—. Organizó una red de
                    asistencia a los pobres de la ciudad. Reformó el clero con una mano dura
                    que no distinguía entre el subordinado humilde y el obispo poderoso.
                </p>
                <p>
                    Era inevitable que hiciera enemigos. El más peligroso resultó ser Teófilo
                    de Alejandría, quien había aspirado a imponer su propio candidato en
                    Constantinopla y nunca perdonó a Juan su nombramiento. La oportunidad
                    llegó cuando Juan acogió en la capital a un grupo de monjes egipcios —los
                    llamados «Hermanos Altos»— que habían sido expulsados por Teófilo en el
                    contexto de la controversia origenista. Teófilo los había condenado como
                    herejes. Juan los recibió con caridad, sin pronunciarse sobre la doctrina,
                    y escribió a Teófilo pidiéndole explicaciones. Aquello fue la declaración
                    de guerra.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
        {
            id: 'conflicto',
            title: 'El Conflicto y el Exilio',
            content: `
                <p>
                    Teófilo de Alejandría organizó una coalición de obispos descontentos
                    y convocó un sínodo en el palacio de «La Encina», en las afueras de
                    Constantinopla, en el año 403. El proceso fue una farsa jurídica:
                    los acusadores eran los jueces, los cargos eran en su mayoría absurdos,
                    y Juan fue condenado sin haber podido defenderse. El emperor Arcadio
                    firmó el decreto de exilio.
                </p>
                <p>
                    Pero la noche antes de que pudiera ser embarcado, un temblor de tierra
                    sacudió Constantinopla. La emperatriz Eudoxia, aterrorizada, interpretó
                    el terremoto como señal divina y ordenó el regreso de Juan. El pueblo
                    de la ciudad, que lo amaba, lo recibió en triunfo.
                </p>
                <p>
                    La reconciliación duró dos meses. En septiembre de 403 se erigió cerca
                    de la catedral una estatua de plata de la emperatriz Eudoxia, con festejos
                    ruidosos que perturbaban los oficios. Juan predicó contra aquella
                    ostentación con la misma franqueza con que predicaba contra cualquier
                    otra. Sus palabras llegaron a oídos de Eudoxia con el añadido de que
                    el obispo la había llamado «una nueva Herodías que pide la cabeza del
                    Bautista» —exageración de sus enemigos, pero suficiente—. El emperor
                    firmó un segundo decreto de exilio en el año 404.
                </p>
                <p>
                    Esta vez no hubo regreso. Juan fue enviado primero a Cucusus, en Armenia,
                    una ciudad azotada por el frío y las incursiones bárbaras. Allí continuó
                    escribiendo cartas —más de doscientas han sobrevivido— a sus amigos,
                    a sus fieles, a obispos de todo el Oriente que le eran leales.
                    Cuando sus carceleros vieron que aquello no doblegaba su influencia,
                    recibieron la orden de marcharlo hasta el extremo oriental del Imperio,
                    a Pityus, en la costa del mar Negro, con la instrucción implícita
                    de que no llegara vivo. Bajo lluvia y frío, a marchas forzadas,
                    Juan de Crisóstomo murió el 14 de septiembre de 407 en Comana, Ponto,
                    con las palabras que siempre había pronunciado al final de sus sermones:
                    <em>«Gloria a Dios por todas las cosas»</em>.
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
                    Treinta y un años después de su muerte, en el año 438, los restos de
                    Juan Crisóstomo fueron trasladados solemnemente a Constantinopla.
                    El emperor Teodosio II y su hermana Pulqueria salieron a recibirlos.
                    Se dice que el joven emperor se arrodilló ante el ataúd y en nombre
                    de sus padres —Arcadio y Eudoxia, los que lo habían enviado a morir—
                    pidió perdón. La rehabilitación fue completa.
                </p>
                <p>
                    Su legado es doble. Como predicador, dejó el modelo más acabado de
                    lo que la tradición cristiana llamará predicación expositiva: la homilía
                    que sigue el texto versículo a versículo, explica su sentido histórico
                    y gramatical, y lo aplica a la vida concreta de los oyentes sin
                    condescendencia ni ornamentos superfluos. Quince siglos después,
                    los reformadores protestantes —que predicaban desde el texto abierto
                    semana tras semana, libro por libro— reconocerían en Crisóstomo
                    un precursor de su método. Calvino lo citó con admiración; Erasmo
                    editó sus obras con entusiasmo.
                </p>
                <p>
                    Como pastor, dejó una convicción que choca con la comodidad de toda
                    generación: que no hay separación posible entre la adoración y la
                    justicia, entre lo que se dice en el altar y lo que se hace con
                    el dinero. Su insistencia en que Cristo está presente en el pobre
                    con la misma realidad con que está presente en la Eucaristía es
                    incómoda para cualquier tipo de religiosidad que quiera ser espiritual
                    sin ser material, devota sin ser generosa.
                </p>
                <p>
                    La Iglesia ortodoxa oriental lo venera como uno de los Tres Santos
                    Jerarcas. La Liturgia de San Juan Crisóstomo, que lleva su nombre,
                    es la más celebrada del mundo cristiano oriental. El hombre que murió
                    solo en el camino a Pityus es hoy recordado en los dos pulmones
                    del cristianismo, el oriental y el occidental, como el modelo del
                    pastor que predicó la verdad sin calcular el precio.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
    ],

    quote: {
        text: 'Si no puedes encontrar a Cristo en el mendigo que está a las puertas de la iglesia, tampoco lo encontrarás en el cáliz.',
        source: 'Juan Crisóstomo, Homilías sobre Mateo',
    },

    timeline: [
        { year: 'c. 347',   event: 'Nace en Antioquía (actual Turquía). Su padre muere poco después; su madre Antusa decide no volver a casarse.' },
        { year: 'c. 367',   event: 'Estudia retórica con Libanio, el orador más famoso de la época. Libanio lo habría querido como sucesor.' },
        { year: '369',      event: 'Bautizado por el obispo Melecio de Antioquía. Abandona la carrera retórica.' },
        { year: 'c. 370',   event: 'Estudia teología bajo Diodoro de Tarso, maestro de la interpretación bíblica antioquena.' },
        { year: '371–378',  event: 'Vida ascética con el monje Carterio; luego dos años de soledad en una cueva. La austeridad dañará permanentemente su salud.' },
        { year: '381',      event: 'Regresa a Antioquía por problemas de salud. Ordenado diácono por el obispo Melecio.' },
        { year: '386',      event: 'Ordenado presbítero. El obispo Flaviano le encomienda la predicación en la catedral principal de Antioquía.' },
        { year: '386–397',  event: 'Once años de predicación en Antioquía. Homilías sobre Mateo, Juan, Romanos, Corintios, Gálatas, Efesios.' },
        { year: '387',      event: 'Motines de las Estatuas: predica 21 homilías consecutivas para sostener a una ciudad paralizada por el terror imperial.' },
        { year: '398',      event: 'Nombrado arzobispo de Constantinopla por el emperor Arcadio. Reforma el clero y redistribuye la riqueza del arzobispado.' },
        { year: '403',      event: 'El Sínodo de "La Encina", convocado por Teófilo de Alejandría, lo condena en un proceso amañado. Primer exilio, revocado por un terremoto.' },
        { year: '404',      event: 'Segundo exilio, definitivo. Enviado a Cucusus, Armenia, donde continúa escribiendo más de 200 cartas.' },
        { year: '407',      event: 'Muere el 14 de septiembre en Comana, Ponto, exhausto por la marcha forzada. Sus últimas palabras: "Gloria a Dios por todas las cosas".' },
        { year: '438',      event: 'Sus restos son trasladados triunfalmente a Constantinopla. El emperor Teodosio II pide perdón ante su ataúd.' },
    ],
};

const Crisostomo = () => {
    return (
        <BiographyTemplate
            biography={biography}
            seriesName="Padres de la Iglesia"
            seriesPath="/padres-de-la-iglesia"
        />
    );
};

export default Crisostomo;
