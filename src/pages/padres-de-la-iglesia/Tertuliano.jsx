import BiographyTemplate from '../../components/BiographyTemplate';

const biography = {
    slug: 'tertuliano',
    name: 'Tertuliano',
    epithet: 'El Padre del Latín Cristiano',
    dates: 'c. 155 – c. 220',
    portrait: null,
    heroImage: `${import.meta.env.BASE_URL}img/padres-de-la-iglesia/tertuliano-hero.jpg`,

    sections: [
        {
            id: 'conversion',
            title: 'El Jurista de Cartago',
            content: `
                <p>
                    Tertuliano nació en Cartago, la gran ciudad del norte de África —hoy Túnez—,
                    alrededor del año 155. Su padre era centurión al servicio del procónsul
                    de África; él mismo recibió una educación esmerada en retórica y derecho,
                    las disciplinas que formaban a los hombres del poder en el mundo romano.
                    Todo indica que ejerció como abogado, posiblemente en Roma, y que era
                    pagano hasta la médula: conocía la mitología, frecuentaba el anfiteatro,
                    participaba de la vida social del Imperio sin conflicto aparente.
                </p>
                <p>
                    La conversión al cristianismo llegó alrededor del año 193–197, en Cartago,
                    ya pasada la treintena. No conocemos los detalles de ese giro —Tertuliano
                    no escribió unas Confesiones—, pero su propia obra ofrece una pista.
                    En su <em>Apologeticum</em> menciona que la sangre de los mártires
                    lo había impresionado profundamente: hombres y mujeres que morían cantando,
                    que enfrentaban el tormento con una serenidad que ninguna filosofía
                    le había prometido a nadie. La fortaleza de los mártires era, para él,
                    una demostración de que aquella fe tenía algo que las religiones paganas
                    no tenían.
                </p>
                <p>
                    Lo que el mundo romano recibió con su conversión no fue exactamente
                    un temperamento manso. Tertuliano llevó al servicio de la fe cristiana
                    la combatividad del abogado, la agudeza del retórico y una ironía mordaz
                    que todavía hace sonreír —y a veces incomoda— al lector moderno.
                    Nunca aprendió a ser diplomático. Fue exactamente el tipo de hombre
                    que la Iglesia a veces necesita y que casi siempre encuentra difícil
                    de manejar.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
        {
            id: 'apologetica',
            title: 'La Pluma al Servicio de la Fe',
            content: `
                <p>
                    El <em>Apologeticum</em> (197) es su primera gran obra y sigue siendo
                    una de las piezas de apologética más brillantes de la Antigüedad.
                    Dirigido nominalmente a los gobernadores romanos de las provincias,
                    era en realidad un alegato público en defensa de los cristianos contra
                    las acusaciones que el mundo romano formulaba contra ellos: que eran
                    ateos (rechazaban los dioses del Estado), incestuosos (se llamaban entre
                    sí «hermanos» y «hermanas» y se besaban), caníbales (comían el cuerpo
                    y bebían la sangre de su Señor) y enemigos del Imperio.
                </p>
                <p>
                    Tertuliano desmontó los cargos uno a uno con la precisión de un abogado
                    y la elocuencia de un retórico, y luego pasó al ataque: los romanos
                    perseguían a los cristianos sin examinar los hechos, solo por el nombre.
                    Si alguien cometía un crimen, se lo castigaba por el crimen;
                    a los cristianos se los castigaba por ser cristianos.
                    Aquello era, en términos jurídicos, un absurdo. Termina con la frase
                    que lo hizo famoso para siempre:
                    <em>«La sangre de los mártires es semilla de la Iglesia»</em>.
                    Cada ejecución producía nuevos creyentes. Roma no podía ganar ese juego.
                </p>
                <p>
                    Su <em>De Praescriptione Haereticorum</em> («Sobre la prescripción
                    contra los herejes», c. 200) es igualmente genial en su método.
                    El término jurídico <em>praescriptio</em> era un recurso procesal que
                    permitía rechazar una demanda antes de que entrara a juicio por razones
                    formales. Tertuliano lo aplica a las herejías: los gnósticos no tienen
                    derecho a disputar sobre la Escritura porque la Escritura no es su
                    propiedad. Es la Iglesia apostólica quien posee las Escrituras,
                    quien las ha transmitido fielmente desde los apóstoles.
                    El herético es un intruso que quiere litigar con documentos que no le pertenecen.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
        {
            id: 'trinidad',
            title: 'El Teólogo de la Trinidad',
            content: `
                <p>
                    El regalo más duradero de Tertuliano a la teología cristiana no es
                    su apologética sino su vocabulario. Escribiendo en latín —fue el primer
                    gran teólogo en hacerlo con sistematicidad—, tuvo que inventar un lenguaje
                    técnico para hablar de realidades que la lengua latina no había necesitado
                    expresar antes. Y lo hizo con una precisión que la Iglesia adoptó
                    y nunca abandonó.
                </p>
                <p>
                    Fue Tertuliano quien introdujo el término <strong>Trinitas</strong>
                    —Trinidad— para referirse a la relación entre el Padre, el Hijo y el
                    Espíritu Santo. Fue él quien articuló que los Tres son «una sola
                    sustancia en tres personas» (<em>una substantia, tres personae</em>),
                    la fórmula que el Concilio de Nicea y sus sucesores confirmarían
                    y que las iglesias occidentales siguen usando. Sin Tertuliano no habría
                    vocabulario trinitario latino; sin ese vocabulario, el debate de Nicea
                    habría sido aún más caótico de lo que fue.
                </p>
                <p>
                    También fue pionero en la cristología: en su <em>Adversus Praxean</em>
                    articuló que Cristo tiene «dos sustancias» o naturalezas —divina y
                    humana— en «una sola persona», anticipando en más de dos siglos
                    la fórmula del Concilio de Calcedonia (451) que definió la fe cristiana
                    sobre la persona de Cristo. La teología buscó durante generaciones
                    el lenguaje preciso; Tertuliano lo había esbozado ya en el siglo II.
                </p>
                <p>
                    También acuñó o fijó en su uso cristiano términos como <em>sacramentum</em>,
                    <em>satisfactio</em>, <em>meritum</em> y <em>peccatum originale</em>
                    (pecado original). La teología latina medieval y la teología de la
                    Reforma hablan el idioma de Tertuliano sin saberlo.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
        {
            id: 'montanismo',
            title: 'El Giro Montanista',
            content: `
                <p>
                    El personaje más fascinante y más trágico de Tertuliano es el que emerge
                    en la segunda mitad de su vida. Alrededor del año 207, se adhirió al
                    movimiento montanista, una corriente carismática nacida en Frigia
                    (Asia Menor) que predicaba la inminencia del fin del mundo, la superioridad
                    de la profecía del Espíritu sobre la autoridad del obispo, y una ascesis
                    radical: ayunos estrictos, prohibición del segundo matrimonio, rechazo
                    de la huida ante la persecución (el mártir voluntario era superior
                    al que escapaba).
                </p>
                <p>
                    En el montanismo, Tertuliano encontró la radicalidad que su temperamento
                    exigía. La Iglesia grande, con sus obispos conciliadores y sus fieles
                    de segunda clase, le parecía demasiado blanda. Los montanistas le ofrecían
                    una comunidad de los verdaderamente comprometidos. Sus escritos de esta
                    época son más severos, más duros con los que no compartían su rigorismo,
                    y muestran una eclesiología que se alejaba peligrosamente de la tradición
                    apostólica que él mismo había defendido con tanta brillantez.
                </p>
                <p>
                    Al final, según el testimonio de Agustín, ni siquiera los montanistas
                    le parecieron suficientemente rigurosos: abandonó ese grupo y formó
                    su propia pequeña comunidad, los «tertulianistas», que existió en Cartago
                    durante al menos dos siglos más. Había nacido demasiado combativo para
                    caber en ninguna comunidad que no fuera la que él mismo controlaba.
                </p>
                <p>
                    Su caso plantea una pregunta que la historia cristiana no puede eludir:
                    ¿cómo puede un hombre defender con una lucidez extraordinaria la doctrina
                    de la Iglesia apostólica y terminar fuera de ella? La respuesta no es
                    simple. El rigorismo puede ser una virtud que se vuelve vicio cuando
                    se convierte en el único criterio de autenticidad cristiana, desplazando
                    a la gracia, a la misericordia y a la comunión.
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
                    Tertuliano murió alrededor del año 220, aunque algunos sugieren que vivió
                    hasta edad muy avanzada. La fecha es incierta; lo que no lo es es su lugar
                    en la historia de la teología cristiana.
                </p>
                <p>
                    Jerónimo, el gran erudito del siglo IV que tradujo la Biblia al latín,
                    lo definió en pocas palabras: «¿Qué hay en Tertuliano que no sea agudo
                    e ingenioso?». Cipriano de Cartago, su sucesor en la tradición teológica
                    africana, lo leía diariamente y lo llamaba simplemente «el maestro».
                    Agustín conocía su obra en profundidad; aunque no lo siguió en el
                    montanismo ni en muchas de sus posiciones más radicales, absorbió su
                    vocabulario y su modo de pensar de un modo que es difícil de calibrar
                    con precisión.
                </p>
                <p>
                    Los Reformadores no lo ignoraron. Tertuliano aparece en los debates
                    sobre la naturaleza de la Iglesia, la autoridad de la tradición,
                    la doctrina trinitaria y la cristología. Calvino lo cita cuando necesita
                    mostrar que las doctrinas reformadas tienen raíces patrísticas sólidas.
                    La Reforma fue, entre otras cosas, una vuelta a los Padres contra
                    las acumulaciones medievales; y Tertuliano, a pesar de —o quizás a causa de—
                    su temperamento intransigente, era un aliado útil en esa polémica.
                </p>
                <p>
                    Su lección es ambivalente e irremplazable. Nos muestra que el genio
                    intelectual al servicio de la fe puede construir catedrales de lenguaje
                    que la Iglesia habitará durante siglos. Y nos recuerda que ese mismo
                    genio, cuando se divorcia de la humildad y la comunión, puede terminar
                    solo en un cuarto que él mismo construyó y del que no sabe cómo salir.
                    La ortodoxia sin caridad no es la fe de Cristo.
                    Tertuliano lo sabía mejor que nadie, y no siempre lo vivió.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
    ],

    quote: {
        text: 'La sangre de los mártires es semilla de la Iglesia.',
        source: 'Tertuliano, Apologeticum L.13',
    },

    timeline: [
        { year: 'c. 155–160', event: 'Nace en Cartago, provincia romana de África (actual Túnez). Su padre es centurión al servicio del procónsul.' },
        { year: 'c. 175–185', event: 'Educación en retórica y derecho en Cartago y posiblemente en Roma. Ejerce como abogado.' },
        { year: 'c. 193–197', event: 'Conversión al cristianismo en Cartago. La fortaleza de los mártires lo impresiona decisivamente.' },
        { year: '197',        event: 'Escribe el Apologeticum, brillante defensa del cristianismo ante las autoridades romanas.' },
        { year: 'c. 198–200', event: 'Escribe De Praescriptione Haereticorum, Adversus Marcionem y De Baptismo.' },
        { year: 'c. 200–206', event: 'Período de máxima producción teológica: Adversus Praxean (donde formula Trinitas y la cristología de dos naturalezas), De Anima, De Resurrectione.' },
        { year: 'c. 207',     event: 'Se adhiere al movimiento montanista. Sus escritos se vuelven más rigoristas y severos.' },
        { year: 'c. 207–212', event: 'Obras montanistas: De Corona, De Fuga in Persecutione, De Exhortatione Castitatis.' },
        { year: 'c. 213–220', event: 'Rompe con los montanistas ordinarios. Funda su propio grupo rigorista, los "tertulianistas".' },
        { year: 'c. 220',     event: 'Fecha probable de su muerte, aunque algunos testimonios sugieren que vivió hasta edad muy avanzada.' },
        { year: 's. IV',      event: 'Jerónimo lo llama "el maestro". Cipriano de Cartago lo lee diariamente. Agustín reporta que la comunidad tertulianista aún existe en Cartago.' },
    ],
};

const Tertuliano = () => {
    return (
        <BiographyTemplate
            biography={biography}
            seriesName="Padres de la Iglesia"
            seriesPath="/padres-de-la-iglesia"
        />
    );
};

export default Tertuliano;
