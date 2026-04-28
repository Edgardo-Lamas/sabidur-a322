import BiographyTemplate from '../../components/BiographyTemplate';

const biography = {
    slug: 'agustin',
    name: 'Agustín de Hipona',
    epithet: 'El Doctor de la Gracia',
    dates: '354 – 430',
    portrait: null,

    sections: [
        {
            id: 'camino',
            title: 'El Camino hacia la Fe',
            content: `
                <p>
                    Agustín nació en Tagaste, una ciudad menor de la provincia romana de Numidia
                    —en el norte del África que hoy es Argelia— el 13 de noviembre de 354.
                    Su madre, Mónica, era cristiana devota; su padre, Patricio, un hombre pagano
                    que se bautizaría solo en su lecho de muerte. Esa tensión doméstica entre la
                    fe materna y el mundo pagano definiría los primeros treinta años de la vida
                    de su hijo.
                </p>
                <p>
                    Era un muchacho brillante y lo sabía. A los dieciséis años fue enviado a
                    Cartago a estudiar retórica —la disciplina más valorada del mundo romano—,
                    y allí encontró todo lo que los jóvenes brillantes siempre encuentran lejos
                    de casa: libertad sin límites, una compañera con quien vivió más de una
                    década y tuvo un hijo (Adeodato, «don de Dios»), y la filosofía maniquea,
                    que prometía explicar el mal del mundo sin ensuciarse las manos con la
                    responsabilidad personal. El maniqueísmo dividía la realidad en dos
                    principios eternos en guerra —el Bien y el Mal— y liberaba al hombre de
                    culpa: «no soy yo quien peca, sino la oscuridad que hay en mí».
                    Para un joven que quería ser inteligente sin ser casto, era una doctrina
                    conveniente.
                </p>
                <p>
                    Pasó nueve años entre los maniqueos. Luego viajó a Roma y después a Milán,
                    donde le esperaba la cátedra de retórica más prestigiosa del Imperio.
                    Fue en Milán donde escuchó predicar a Ambrosio, el obispo que llenaba las
                    iglesias con sus sermones y que interpretaba las Escrituras de un modo que
                    Agustín nunca había considerado. Comenzó a ir a la iglesia no para creer
                    sino para estudiar la técnica oratoria del obispo. Dios lo esperaba con
                    paciencia al final del pasillo.
                </p>
                <p>
                    La conversión llegó en agosto del año 386 en el jardín de una villa en Milán.
                    Agustín estaba destrozado por una lucha interna que llevaría a las páginas
                    más honestas jamás escritas en la historia de la espiritualidad cristiana.
                    Él mismo lo describió: quería ser casto, pero todavía no. Sabía que el
                    camino era la fe de su madre, pero sentía que sus viejos hábitos le tiraban
                    de la ropa. En ese momento de crisis escuchó la voz de un niño que cantaba
                    en el jardín vecino: <em>«Tolle, lege»</em> —«toma, lee»—. Abrió la carta
                    de Pablo a los Romanos en el pasaje que cayó bajo sus ojos: <em>«No en
                    glotonerías y borracheras, no en lujurias y lascivias... sino vestíos del
                    Señor Jesucristo, y no proveáis para los deseos de la carne»</em>
                    (Romanos 13:13–14). No hizo falta más. En ese instante, escribió,
                    «una luz de certeza inundó mi corazón, y toda la oscuridad de la duda
                    se disipó».
                </p>
                <p>
                    El 25 de abril de 387, Ambrosio lo bautizó junto a su hijo Adeodato.
                    Mónica, que había seguido a su hijo hasta Milán llorando y rogando por él
                    durante años, vivió para verlo. Murió pocos meses después en Ostia,
                    camino de regreso a África, en paz.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
        {
            id: 'pastor',
            title: 'El Pastor de Hipona',
            content: `
                <p>
                    Agustín regresó a África con la intención de llevar una vida monástica y
                    contemplativa en su ciudad natal. Fue ordenado presbítero en Hipona en el
                    año 391, casi en contra de su voluntad —la congregación lo aclamó y el
                    obispo Valerio lo presentó ante el pueblo antes de que pudiera negarse—.
                    En 395 fue consagrado obispo coadjutor, y al año siguiente obispo titular
                    de Hipona, cargo que ejercería hasta su muerte treinta y cuatro años después.
                </p>
                <p>
                    El África del norte cristiana era un campo de batalla. El cisma donatista
                    llevaba más de ochenta años dividiendo a las iglesias: los donatistas
                    sostenían que la validez de los sacramentos dependía de la pureza moral
                    del ministro que los administraba, y que la Iglesia debía ser una comunidad
                    de santos sin mancha visible. Quienes durante la persecución de Diocleciano
                    habían entregado los libros sagrados a las autoridades romanas
                    —los <em>traditores</em>, los traidores— habían contaminado a toda la
                    Iglesia, y los donatistas eran la única alternativa pura.
                </p>
                <p>
                    Agustín los enfrentó con paciencia y sin descanso. Su argumento central
                    era que la Iglesia visible en esta tierra siempre será una mezcla de trigo
                    y cizaña —la separación definitiva le corresponde a Dios en el juicio final—,
                    y que la validez de los sacramentos descansa en Cristo, no en la virtud
                    del ministro. <em>«Cuando Pedro bautiza, Cristo bautiza; cuando Judas
                    bautiza, Cristo bautiza»</em>. Escribió contra ellos, debatió con ellos,
                    y en la Conferencia de Cartago de 411 —el debate más largo y documentado
                    de la Antigüedad cristiana— los derrotó en el campo intelectual.
                </p>
                <p>
                    La controversia donatista le enseñó algo que marcaría toda su teología:
                    que el ser humano no puede salvar al ser humano. La pureza de la Iglesia
                    no proviene de la santidad de sus miembros sino de la gracia de su Señor.
                    Esa convicción lo llevó directamente a su gran batalla doctrinal.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
        {
            id: 'pelagianismo',
            title: 'La Controversia Pelagiana',
            content: `
                <p>
                    Hacia el año 410, un monje bretón llamado Pelagio llegó a Roma con una
                    doctrina que sonaba ennoblecedora y resultaba ser devastadora. Pelagio
                    sostenía que Dios había creado al ser humano con la capacidad libre y plena
                    de elegir el bien, que el pecado de Adán solo afectó a Adán —no a su
                    descendencia—, y que cada persona podía, mediante el esfuerzo moral y
                    la imitación de Cristo, alcanzar la perfección que Dios requería.
                    La gracia existía, sí, pero como ayuda externa —la ley, el ejemplo de Cristo,
                    el perdón de los pecados pasados—, no como transformación interior de
                    la voluntad. En el fondo: el hombre puede, si quiere.
                </p>
                <p>
                    Para Agustín, aquello era exactamente lo opuesto a su propia experiencia
                    y a lo que las Escrituras enseñaban. Él <em>sabía</em> que no podía.
                    Lo había experimentado durante años en Milán: conocía el bien, lo deseaba
                    incluso, y no podía alcanzarlo. Su voluntad estaba esclavizada. No por una
                    fuerza cósmica exterior —como había creído entre los maniqueos— sino por
                    el peso acumulado de sus propias elecciones. El pecado original no era
                    un mal ejemplo que Adán dio a sus descendientes; era una ruina real,
                    heredada, que afectaba la razón y la voluntad de toda la raza humana.
                </p>
                <p>
                    La respuesta de Agustín fue su gran doctrina de la gracia. Dios, en su
                    soberanía, elige a quiénes salvará —no en virtud de méritos previstos
                    sino de su misericordia libre e inmerecida—. La gracia no solo perdona
                    el pecado sino que transforma la voluntad desde dentro, haciéndola capaz
                    de querer lo que antes era incapaz de querer. Sin esa gracia preveniente,
                    nadie busca a Dios. Con ella, nadie puede resistirse definitivamente.
                    <em>«Nos hiciste para ti, Señor, y nuestro corazón está inquieto
                    hasta que descanse en ti»</em>: lo había escrito al comienzo de sus
                    Confesiones, y era la síntesis más breve de toda su teología.
                </p>
                <p>
                    La controversia duró décadas. Pelagio fue condenado en los concilios de
                    Cartago y Mileve (416), y el papa Inocencio I confirmó la condena.
                    Pero el problema no murió con Pelagio: el semipelagianismo —que admitía
                    la necesidad de la gracia pero sostenía que el primer movimiento hacia
                    Dios dependía del hombre— continuó siendo debatido. Agustín respondió
                    hasta el final de su vida. Sus obras sobre la gracia y la predestinación
                    serían leídas con avidez mil años después por Lutero y Calvino,
                    que reconocerían en ellas el mapa de su propia teología.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
        {
            id: 'obras',
            title: 'Las Grandes Obras',
            content: `
                <p>
                    Agustín escribió durante cuarenta años con una productividad que todavía
                    asombra a los estudiosos: más de cien libros, novecientos sermones y
                    doscientas cartas que han llegado hasta nosotros. Tres obras definen su
                    lugar en la historia del pensamiento occidental.
                </p>
                <p>
                    Las <strong>Confesiones</strong> (397–401) son el primer gran relato
                    autobiográfico de la literatura universal. No es, como se las llama a veces,
                    una simple autobiografía; son una larga oración, una conversación en voz alta
                    con Dios sobre la propia vida. Agustín narra con una franqueza sin precedentes
                    su juventud disoluta, sus años entre los maniqueos, su búsqueda filosófica,
                    su lucha interior y su conversión. Pero todo está enmarcado en una teología:
                    la historia de cómo la gracia de Dios persiguió a un hombre que huía de ella
                    y finalmente lo alcanzó. Trece siglos después, Lutero las leerá y llorará.
                </p>
                <p>
                    <strong>La Ciudad de Dios</strong> (<em>De Civitate Dei</em>, 413–426),
                    escrita en respuesta al saqueo de Roma por los visigodos en 410, es el
                    primer gran sistema de filosofía de la historia cristiana. Agustín distingue
                    dos ciudades que conviven mezcladas en esta tierra: la Ciudad de Dios,
                    fundada sobre el amor a Dios hasta el desprecio de uno mismo, y la Ciudad
                    del Mundo, fundada sobre el amor a uno mismo hasta el desprecio de Dios.
                    Roma no es eterna. Solo la Ciudad de Dios lo es. El argumento destruyó la
                    idea de que el Imperio romano era la encarnación visible del reino divino
                    —una ilusión peligrosa que había crecido desde Constantino— y liberó a la
                    teología cristiana de estar atada al destino de cualquier nación o civilización.
                </p>
                <p>
                    <strong>De Trinitate</strong> (399–419) es su obra teológica más rigurosa.
                    Durante veinte años desarrolló la doctrina de la Trinidad con una profundidad
                    filosófica que ningún autor anterior había alcanzado. Su propuesta de
                    encontrar en la mente humana —memoria, entendimiento, voluntad— una
                    «imagen» de la Trinidad abrió siglos de reflexión teológica y psicológica.
                    La pneumatología occidental —la doctrina del Espíritu Santo que procede
                    del Padre <em>y del Hijo</em> (<em>Filioque</em>)— se apoya en gran medida
                    en el pensamiento de Agustín.
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
                    El 28 de agosto del año 430, Agustín murió en Hipona mientras los vándalos
                    sitiaban la ciudad. Tenía setenta y cinco años. A su cabecera había pedido
                    que pegaran en la pared los salmos penitenciales para poder leerlos durante
                    sus últimos días. Murió leyendo los Salmos.
                </p>
                <p>
                    Dos semanas después de su muerte, Hipona cayó. Casi toda la estructura
                    eclesiástica y cultural del África romana que él conoció desapareció bajo
                    las invasiones bárbaras. Pero sus libros sobrevivieron y viajaron a Europa,
                    donde se convirtieron en el fundamento de la teología medieval.
                    Anselmo de Canterbury, Tomás de Aquino, Buenaventura: todos lo leen,
                    lo citan, debaten con él. No siempre están de acuerdo, pero ninguno puede
                    ignorarlo.
                </p>
                <p>
                    La Reforma del siglo XVI fue, en gran medida, un regreso a Agustín contra
                    la escolástica tardía que lo había domesticado. Lutero era monje agustino
                    y leyó a su maestro con ojos nuevos; en la doctrina de la gracia y la
                    incapacidad de la voluntad humana encontró la clave que resolvió la crisis
                    espiritual que lo estaba destruyendo. Calvino lo cita más que a ningún otro
                    Padre en las Instituciones. Los anglicanos, los presbiterianos, los
                    reformados: todos beben de Agustín cuando hablan de gracia, soberanía
                    divina y predestinación.
                </p>
                <p>
                    Dieciséis siglos después, sigue siendo el teólogo más discutido de la
                    historia cristiana. Sus errores —una eclesiología que legitimó la coerción
                    estatal en asuntos de fe, una visión del sexo marcada por tensiones que
                    nunca resolvió del todo— son reales y han sido señalados. Pero su
                    comprensión de la gracia, de la incapacidad humana, del descanso de
                    la voluntad en Dios como único fundamento de la paz, sigue siendo
                    una de las contribuciones más luminosas de cualquier mente cristiana.
                    Nunca dejó de ser el hombre que escribió en el jardín de Milán:
                    inquieto hasta encontrar reposo en Dios.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
    ],

    quote: {
        text: 'Nos hiciste para ti, Señor, y nuestro corazón está inquieto hasta que descanse en ti.',
        source: 'Agustín de Hipona, Confesiones I.1',
    },

    timeline: [
        { year: '354',      event: 'Nace en Tagaste, Numidia (actual Argelia), el 13 de noviembre. Su madre Mónica es cristiana; su padre Patricio, pagano.' },
        { year: '370',      event: 'Va a Cartago a estudiar retórica. Comienza su vida irregular; toma una compañera con quien tendrá un hijo.' },
        { year: '372',      event: 'Nace su hijo Adeodato ("don de Dios").' },
        { year: '373',      event: 'Lee el Hortensio de Cicerón y se inflama por la búsqueda de la sabiduría. Se une a la secta maniquea.' },
        { year: '383',      event: 'Viaja a Roma. Decepciona a los maniqueos al conocer a Fausto de Mileve y encontrarlo vacío de respuestas.' },
        { year: '384',      event: 'Obtiene la cátedra imperial de retórica en Milán. Comienza a escuchar predicar a Ambrosio.' },
        { year: '386',      event: 'En agosto, en el jardín de Milán, escucha "Tolle, lege" y lee Romanos 13:13-14. Conversión. Renuncia a su cátedra.' },
        { year: '387',      event: 'Bautizado por Ambrosio el 25 de abril. Muerte de su madre Mónica en Ostia camino de regreso a África.' },
        { year: '388',      event: 'Regresa a Tagaste. Funda una pequeña comunidad monástica. Muere su hijo Adeodato.' },
        { year: '391',      event: 'Ordenado presbítero en Hipona, casi por aclamación de la congregación.' },
        { year: '395',      event: 'Consagrado obispo coadjutor de Hipona. Al año siguiente, obispo titular.' },
        { year: '397–401',  event: 'Escribe las Confesiones, primer gran relato autobiográfico de la literatura universal.' },
        { year: '399–419',  event: 'Trabaja en De Trinitate, su obra filosófica más rigurosa.' },
        { year: '411',      event: 'Conferencia de Cartago: derrota intelectual del donatismo en el debate más documentado de la Antigüedad.' },
        { year: '412–430',  event: 'Controversia pelagiana. Escribe De Natura et Gratia, De Gratia et Libero Arbitrio y De Praedestinatione Sanctorum.' },
        { year: '413–426',  event: 'Escribe La Ciudad de Dios (22 libros), primer gran sistema cristiano de filosofía de la historia.' },
        { year: '430',      event: 'Muere el 28 de agosto en Hipona, sitiada por los vándalos. Muere leyendo los salmos penitenciales en la pared.' },
    ],
};

const Agustin = () => {
    return (
        <BiographyTemplate
            biography={biography}
            seriesName="Padres de la Iglesia"
            seriesPath="/padres-de-la-iglesia"
        />
    );
};

export default Agustin;
