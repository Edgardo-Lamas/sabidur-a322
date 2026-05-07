import BiographyTemplate from '../../components/BiographyTemplate';

/**
 * Biografía de Juan Calvino
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
 *   portrait: `${import.meta.env.BASE_URL}img/reformadores/calvino.jpg`,
 */

const biography = {
    slug: 'calvino',
    name: 'Juan Calvino',
    epithet: 'El Teólogo de la Soberanía de Dios',
    dates: '1509 – 1564',
    portrait: null,
    heroImage: `${import.meta.env.BASE_URL}img/reformadores/calvino-hero.jpg`,
    // portrait: `${import.meta.env.BASE_URL}img/reformadores/calvino.jpg`,

    sections: [
        {
            id: 'contexto',
            title: 'El Mundo que Formó a Calvino',
            content: `
                <p>
                    El 10 de julio de 1509, en la ciudad de Noyon, en la Picardía francesa, nació Jean Cauvin —latinizado
                    luego como <em>Calvinus</em>, españolizado como <em>Calvino</em>—. Tenía veintiséis años cuando Lutero
                    clavó sus tesis. Era, en todos los sentidos, la segunda generación de la Reforma: no fue él quien encendió
                    el fuego, sino quien lo organizó.
                </p>
                <p>
                    Francia en 1509 era uno de los reinos más poderosos de Europa, gobernada por Francisco I, monarca que
                    mezclaba con extraña coherencia el mecenazgo de las artes y el humanismo renacentista con la persecución
                    brutal de quienes desafiaban la ortodoxia religiosa. Leonardo da Vinci murió en el castillo de Amboise,
                    invitado por Francisco I, en 1519. Unos años después, el mismo rey firmaría los edictos que mandarían
                    a la hoguera a los primeros protestantes franceses.
                </p>
                <p>
                    El padre de Calvino, Gérard Cauvin, era notario y secretario del obispo de Noyon —un funcionario eclesiástico
                    de clase media con buenas conexiones—. Gracias a sus vínculos, Calvino pudo estudiar en París desde los catorce
                    años, en el Collège de Montaigu, el mismo que había formado a Erasmo de Rotterdam décadas antes. Allí aprendió
                    la disciplina intelectual rigurosa del humanismo cristiano; allí también conoció la incomodidad y la severidad
                    de una educación sin concesiones.
                </p>
                <p>
                    Su padre lo envió luego a estudiar leyes en Orléans y Bourges, donde entró en contacto con los mejores juristas
                    de Francia y aprendió el método que marcaría su teología para siempre: precisión en los términos, rigor en la
                    argumentación, claridad en la exposición. Cuando Gérard Cauvin murió en 1531 —en conflicto con el capítulo
                    catedralicio de Noyon, excomulgado— Calvino abandonó los estudios legales y se consagró a las humanidades.
                    Publicó en 1532 un comentario académico sobre el <em>De Clementia</em> de Séneca. Tenía veintidós años
                    y aspiraba a ser un erudito humanista, no un reformador.
                </p>
                <p>
                    Pero Dios tenía otros planes, y los ejecutó sin consultar las preferencias del joven Calvino.
                </p>
            `,
        },
        {
            id: 'conversion',
            title: 'La Conversión Súbita y el Exilio',
            content: `
                <p>
                    Calvino describe su conversión en uno de los pocos pasajes autobiográficos que dejó, en el prefacio a su
                    comentario de los Salmos. Lo hace con una llamativa ausencia de detalle dramático:
                </p>
                <blockquote>
                    <em>"Dios, por una conversión súbita, subyugó y redujo a docilidad mi corazón, que para mi edad
                    era demasiado endurecido en estas cosas."</em>
                </blockquote>
                <p>
                    "Conversión súbita." No hay rayo, no hay tormenta, no hay visión. Solo la descripción de un corazón que
                    resistía y que fue doblegado por algo más grande que él mismo. Era aproximadamente 1533. Calvino tenía
                    veinticuatro años.
                </p>
                <p>
                    La conversión no tardó en tener consecuencias. En noviembre de 1533, su amigo Nicolás Cop fue elegido rector
                    de la Universidad de París y pronunció un discurso inaugural que sonaba sospechosamente evangélico —algunos
                    historiadores creen que Calvino lo ayudó a redactarlo—. La reacción de las autoridades fue inmediata.
                    Cop huyó a Basilea. Calvino escapó de París descolgándose por una ventana con sábanas anudadas, según cuenta
                    la tradición.
                </p>
                <p>
                    El octubre siguiente, en la noche del 17 al 18 de octubre de 1534, ocurrió el <em>Affaire des Placards</em>:
                    carteles violentamente anticatólicos aparecieron pegados en plazas y puertas de iglesias de varias ciudades
                    francesas, incluida la puerta de la habitación del rey Francisco I en el castillo de Amboise. La reacción
                    fue una persecución feroz. En los meses siguientes fueron quemados vivos varios protestantes en París.
                    Calvino huyó de Francia definitivamente. Tenía veinticinco años y no volvería jamás a vivir en su patria.
                </p>
                <p>
                    Se instaló en Basilea, bajo identidad falsa, y en ese exilio escribió en pocos meses la primera edición
                    de la obra que lo haría inmortal.
                </p>
            `,
        },
        {
            id: 'instituciones',
            title: 'Las Instituciones: Un Joven de Veintiséis Años Sistematiza la Reforma',
            content: `
                <p>
                    En 1536, Calvino publicó en Basilea la primera edición de su <em>Institutio Christianae Religionis</em>
                    —<em>Institución de la Religión Cristiana</em>—. Tenía veintiséis años. El libro tenía seis capítulos
                    y el tamaño de un manual de catecismo. Era una exposición sistemática de la fe evangélica dirigida, en su
                    prefacio, directamente al rey Francisco I de Francia, en defensa de los protestantes franceses perseguidos.
                </p>
                <p>
                    La obra creció durante tres décadas. La edición definitiva, publicada en 1559, tenía cuatro libros y ochenta
                    capítulos. Es, sin discusión, la obra teológica más influyente de la Reforma Protestante: más sistemática
                    que los escritos de Lutero, más accesible que la escolástica medieval, escrita con una claridad y una fuerza
                    que sus contemporáneos reconocieron de inmediato como extraordinarias.
                </p>
                <p>
                    El centro de las Instituciones es la soberanía absoluta de Dios. Todo parte de ahí. El conocimiento de Dios
                    y el conocimiento del hombre son las dos columnas del edificio: cuanto más vemos a Dios en Su gloria,
                    más vemos al hombre en su miseria; cuanto más vemos al hombre en su miseria, más necesitamos mirar a Dios
                    en Su gloria. Calvino toma ese movimiento y lo desarrolla con implacable coherencia: la caída total del
                    hombre, la elección soberana de Dios, la justificación por fe, la vida de la Iglesia, los sacramentos,
                    el gobierno civil. Cada pieza encaja. Cada doctrina lleva a la siguiente con rigor casi matemático.
                </p>
                <p>
                    La doctrina de la predestinación —que Dios elige soberanamente a quienes salva, sin que su elección dependa
                    de nada previsto en el elegido— es quizás la más debatida de su teología. Calvino no la inventó; estaba
                    en Agustín, estaba en Pablo. Pero Calvino la expuso con una coherencia que nadie antes había alcanzado,
                    y con la convicción de que negarla era quitar gloria a Dios para dársela al hombre. Para él no era una
                    doctrina aterradora sino consoladora: la certeza de la salvación no descansa en la firmeza del creyente
                    sino en el propósito eterno de Dios.
                </p>
                <p>
                    Pero antes de que las Instituciones pudieran cambiar el mundo, Calvino tuvo que pasar por Ginebra.
                    Y Ginebra iba a cambiarle a él la vida.
                </p>
            `,
        },
        {
            id: 'ginebra',
            title: 'Ginebra: El Hombre que no Quería Quedarse',
            content: `
                <p>
                    En el verano de 1536, Calvino viajaba de París hacia Estrasburgo cuando una guerra entre Francisco I
                    y Carlos V lo obligó a tomar una ruta alternativa. El desvío lo llevó a Ginebra.
                </p>
                <p>
                    Ginebra acababa de sacudirse el dominio del duque de Saboya y de su obispo, y había abrazado la Reforma
                    impulsada por el predicador Guillaume Farel —un hombre de temperamento volcánico, exactamente opuesto al
                    de Calvino—. Farel se enteró de que el joven autor de las Instituciones estaba de paso en la ciudad y
                    fue a buscarlo. Le rogó que se quedara a trabajar en la Reforma de Ginebra.
                </p>
                <p>
                    Calvino declinó. Tenía planes en Estrasburgo; quería estudiar, escribir, vivir en silencio. Era, por
                    temperamento, un hombre de biblioteca, no un pastor de ciudad. Farel insistió. Calvino volvió a negarse.
                    Entonces Farel pronunció una de las frases más dramáticas de la historia de la Reforma:
                </p>
                <blockquote>
                    <em>"¡Que Dios maldiga tu reposo y la tranquilidad que buscas, si en tan grande necesidad te apartas
                    y niegas tu socorro!"</em>
                </blockquote>
                <p>
                    Calvino, según su propio relato, sintió ese momento como si Dios mismo lo amenazara. Se quedó en Ginebra.
                    Tenía veintisiete años.
                </p>
                <p>
                    La primera experiencia ginebrína duró menos de dos años. Calvino y Farel chocaron con el Pequeño Consejo
                    de la ciudad, que se negaba a aceptar las reformas disciplinares que ellos consideraban indispensables.
                    En 1538 fueron expulsados. Calvino partió a Estrasburgo, donde pastoreó durante tres años una congregación
                    de refugiados franceses, trabajó junto a Martín Bucero —el reformador más experimentado de la época—,
                    asistió a los coloquios teológicos entre protestantes y católicos, y se casó con Idelette de Bure, viuda
                    con hijos, a quien amó profundamente hasta su muerte en 1549. Nunca volvió a casarse.
                </p>
                <p>
                    Mientras Calvino estaba en Estrasburgo, Ginebra descendió al caos. El Consejo lo llamó de vuelta en 1541.
                    Calvino regresó con la misma renuencia con que había llegado la primera vez. <em>"Preferiría cien otras
                    muertes antes que esa cruz"</em>, escribió a un amigo. Pero regresó.
                </p>
            `,
        },
        {
            id: 'ciudad',
            title: 'La Ciudad de Dios y el Asunto Serveto',
            content: `
                <p>
                    La segunda etapa en Ginebra duró veintitrés años, hasta su muerte. En ese período, Calvino transformó
                    la ciudad en lo que el reformador escocés John Knox llamaría <em>"la escuela de Cristo más perfecta
                    que jamás existió en la tierra desde los días de los apóstoles"</em>.
                </p>
                <p>
                    Estableció la Compañía de Pastores para la formación y supervisión del clero; el Consistorio,
                    órgano de disciplina eclesiástica que supervisaba la conducta moral de los ciudadanos; y en 1559,
                    apenas cinco años antes de morir, fundó la Academia de Ginebra para formar pastores y maestros
                    protestantes que se dispersarían por toda Europa. Por esa academia pasaron John Knox, Teodoro de Beza
                    —su sucesor—, y cientos de jóvenes que llevarían la Reforma a Francia, los Países Bajos, Hungría,
                    Polonia e Inglaterra.
                </p>
                <p>
                    Pero el legado de Calvino tiene también una sombra que la historia no puede ignorar ni la piedad
                    borrar: el caso de Miguel Servet.
                </p>
                <p>
                    Servet era un médico y teólogo español que negaba la doctrina de la Trinidad y había publicado escritos
                    violentamente anticristianos. En 1553, de manera imprudente —nadie hasta hoy sabe bien por qué—, se
                    presentó en Ginebra, ciudad gobernada por su enemigo declarado. Fue arrestado. El Consejo de Ginebra
                    lo condenó a muerte por herejía. Calvino apoyó la condena aunque solicitó que la ejecución fuera por
                    decapitación en lugar de hoguera —petición que el Consejo rechazó—. Servet murió quemado el 27 de octubre
                    de 1553.
                </p>
                <p>
                    El asunto generó polémica inmediata. Sebastián Castellio —humanista que había sido discípulo de Calvino—
                    lo atacó con el argumento que la historia terminó adoptando: matar a un hombre no es defender una doctrina,
                    es matar a un hombre. No existe justificación para la pena capital por razones de conciencia.
                </p>
                <p>
                    Los biógrafos honestos de Calvino no eluden el episodio. Calvino fue un hombre de su siglo: para él,
                    la herejía era un crimen público que amenazaba la ciudad. Que estuviera equivocado en eso no invalida
                    su teología, pero tampoco puede ser ignorado bajo la alfombra. La grandeza de un hombre se mide también
                    por sus sombras.
                </p>
                <p>
                    Calvino pasó sus últimos años dictando desde la cama, demasiado enfermo para caminar pero demasiado
                    comprometido para dejar de trabajar. Cuando sus amigos le rogaban que descansara, respondía:
                    <em>"¿Queréis que el Señor me encuentre ocioso?"</em>
                    Murió el 27 de mayo de 1564. Tenía cincuenta y cuatro años.
                    Por instrucción expresa, fue enterrado en una tumba sin nombre ni marca.
                </p>
            `,
        },
        {
            id: 'legado',
            title: 'Legado: La Soberanía de Dios como Fundamento',
            content: `
                <p>
                    El impacto de Calvino sobre la historia de la Iglesia es tan vasto que resulta difícil resumirlo
                    sin caer en la superficialidad. Sus escritos llenan cincuenta y nueve volúmenes en la edición crítica:
                    comentarios sobre casi todos los libros de la Biblia, más de cuatro mil cartas, miles de sermones
                    (una parte de los cuales se conserva), tratados teológicos y polémicos.
                </p>
                <p>
                    Pero su influencia va más allá de los textos. Los hugonotes franceses —que llegaron a ser un diez por
                    ciento de la población de Francia antes de las guerras de religión— siguieron su teología.
                    Los reformados holandeses que construyeron la República de los Países Bajos, la democracia moderna más
                    temprana de Europa, lo tenían como padre teológico. John Knox llevó su eclesiología a Escocia y fundó
                    la Iglesia Presbiteriana. Los puritanos ingleses y los peregrinos del <em>Mayflower</em> que cruzaron
                    el Atlántico en 1620 llevaban en sus alforjas su teología.
                </p>
                <p>
                    El sociólogo Max Weber argumentó, en su célebre <em>La ética protestante y el espíritu del capitalismo</em>,
                    que la ética calvinista —el trabajo como vocación, la austeridad, la reinversión del beneficio— fue
                    uno de los motores culturales del capitalismo moderno. La tesis es debatida, pero la influencia cultural
                    del calvinismo sobre la civilización occidental difícilmente pueda exagerarse.
                </p>
                <p>
                    La teología de Calvino, en su núcleo, descansa sobre una sola convicción: Dios es soberano en todo.
                    En la creación, en la historia, en la salvación. El hombre no se salva porque quiso hacerlo; se salva
                    porque Dios quiso salvarlo. La gloria es de Dios en todo y siempre. <em>Soli Deo gloria.</em>
                </p>
                <p>
                    Esa convicción no produjo en Calvino pasividad ni fatalismo. Produjo una energía extraordinaria:
                    si Dios es soberano, el trabajo del hombre en Su reino tiene peso eterno. Si Dios es soberano,
                    el fracaso no es la última palabra. Si Dios es soberano, la ciudad puede ser reformada, la Iglesia
                    puede ser purificada, la vida entera puede ser vivida <em>coram Deo</em> —delante de Dios— como acto
                    de adoración.
                </p>
                <p>
                    Calvino murió a los cincuenta y cuatro años, consumido por trabajo y enfermedad, en una tumba sin nombre.
                    Pero su pensamiento sigue siendo, cinco siglos después, uno de los sistemas teológicos más coherentes
                    y comprensivos que el protestantismo ha producido.
                </p>
            `,
        },
    ],

    quote: {
        text: 'Nuestro corazón es una fábrica perpetua de ídolos.',
        attribution: 'Juan Calvino — Institución de la Religión Cristiana',
    },

    timeline: [
        { year: '1509', event: 'Nace el 10 de julio en Noyon, Picardía, Francia.' },
        { year: '1523', event: 'Parte a París para estudiar en el Collège de Montaigu.' },
        { year: '1528', event: 'Estudia leyes en Orléans por orden de su padre.' },
        { year: '1531', event: 'Muere su padre. Calvino abandona el derecho y se dedica a las humanidades.' },
        { year: '1532', event: 'Publica un comentario sobre el "De Clementia" de Séneca. Tiene 22 años.' },
        { year: '1533', event: 'Conversión súbita. Huye de París tras el discurso de Nicolás Cop.' },
        { year: '1534', event: 'Affaire des Placards. Persecución de protestantes en Francia. Exilio definitivo.' },
        { year: '1536', event: 'Publica la primera edición de las Instituciones (6 capítulos). Tiene 26 años.' },
        { year: '1536', event: 'De paso en Ginebra, Farel lo amenaza con la maldición divina. Se queda.' },
        { year: '1538', event: 'Expulsado de Ginebra por el Consejo. Se instala en Estrasburgo.' },
        { year: '1540', event: 'Se casa con Idelette de Bure, viuda con hijos.' },
        { year: '1541', event: 'Regresa a Ginebra llamado por el Consejo. Establece las Ordenanzas Eclesiásticas.' },
        { year: '1549', event: 'Muere Idelette de Bure. Calvino no vuelve a casarse.' },
        { year: '1553', event: 'Miguel Servet es quemado en Ginebra. Polémica sobre tolerancia religiosa.' },
        { year: '1559', event: 'Edición definitiva de las Instituciones (80 capítulos). Fundación de la Academia de Ginebra.' },
        { year: '1559', event: 'Obtiene la ciudadanía ginebrína, tras 23 años en la ciudad.' },
        { year: '1564', event: 'Muere el 27 de mayo. Por instrucción suya, enterrado en tumba sin nombre ni marca.' },
    ],
};

const Calvino = () => (
    <BiographyTemplate
        biography={biography}
        seriesName="Reformadores"
        seriesPath="/reformadores"
    />
);

export default Calvino;
