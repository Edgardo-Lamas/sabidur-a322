import BiographyTemplate from '../../components/BiographyTemplate';

const biography = {
    slug: 'ireneo',
    name: 'Ireneo de Lyon',
    epithet: 'El Arquitecto de la Ortodoxia',
    dates: 'c. 130 – c. 202',
    portrait: null,
    heroImage: `${import.meta.env.BASE_URL}img/padres-de-la-iglesia/ireneo-hero.jpg`,

    sections: [
        {
            id: 'formacion',
            title: 'De Esmirna a Lyon',
            content: `
                <p>
                    Ireneo nació probablemente en Esmirna, en Asia Menor, alrededor del año 130.
                    Lo que sabemos de su infancia lo contó él mismo, y con una emoción que todavía
                    se siente a través de los siglos. Siendo niño o joven, escuchó predicar al
                    obispo Policarpo de Esmirna. Y Policarpo había conocido al apóstol Juan.
                    «Recuerdo los eventos de aquella época con más claridad que los de ayer»,
                    escribiría Ireneo ya anciano en una carta a su amigo Florino,
                    «porque lo que aprendemos de niños crece junto con el alma y se une a ella.
                    Recuerdo dónde se sentaba el bienaventurado Policarpo para predicar,
                    cómo era su porte, sus discursos a las multitudes, cómo describía su
                    relación con Juan y con los demás que habían visto al Señor».
                </p>
                <p>
                    Esa cadena —Juan, Policarpo, Ireneo— no era para él un dato biográfico
                    pintoresco. Era el fundamento de toda su teología. La fe que él enseñaba
                    no era una especulación filosófica construida en un escritorio;
                    era la misma fe que un hombre había recibido del apóstol que reclinó
                    su cabeza en el pecho del Señor. La continuidad importaba.
                    La tradición importaba. La transmisión fiel de lo que Cristo había
                    enseñado importaba.
                </p>
                <p>
                    En algún momento de su vida Ireneo se trasladó al Occidente latino y llegó
                    a Lyon, en la Galia romana. En el año 177, durante la persecución del
                    emperor Marco Aurelio, la comunidad cristiana de Lyon sufrió una represión
                    brutal: cuarenta y ocho fieles fueron torturados y ejecutados, entre ellos
                    su obispo Potino, un anciano de noventa años. La comunidad sobreviviente
                    envió a Ireneo a Roma para llevar una carta de intercesión al papa Eleuterio.
                    Cuando regresó, fue elegido obispo en lugar del mártir Potino.
                    Tenía alrededor de cuarenta y siete años.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
        {
            id: 'gnosticismo',
            title: 'El Mundo Gnóstico',
            content: `
                <p>
                    La amenaza que Ireneo tuvo que enfrentar era más sutil y más peligrosa
                    que una persecución abierta. El gnosticismo —en sus múltiples variantes:
                    valentiniana, basilidiana, marcionita— no se presentaba como una religión
                    alternativa al cristianismo sino como su versión superior, espiritual,
                    reservada a los que tenían el conocimiento (<em>gnosis</em>) necesario
                    para comprenderla.
                </p>
                <p>
                    Los sistemas gnósticos eran elaborados y deslumbrantes: describían el
                    mundo como el producto de una caída en el reino de la materia desde
                    un mundo superior de luz y espíritu. El Dios del Antiguo Testamento
                    —el Creador del mundo material— era un ser inferior e ignorante, el
                    Demiurgo. El verdadero Dios Supremo era el Padre de la Luz, desconocido
                    e inalcanzable. Cristo había venido no para encarnarse —¿cómo iba a
                    mezclarse la luz divina con la materia corrupta?— sino para revelar
                    la <em>gnosis</em> que permitía al espíritu escapar de la prisión
                    del cuerpo y regresar a su origen celestial.
                </p>
                <p>
                    Las consecuencias prácticas eran demoledoras para el evangelio.
                    Si la materia es mala, la creación no es buena. Si el Creador no es el
                    verdadero Dios, el Antiguo Testamento es irrelevante o dañino.
                    Si Cristo no se encarnó realmente, no murió realmente, no resucitó
                    realmente. Si la salvación es gnosis —conocimiento reservado a unos pocos—,
                    no hay gracia universal ni evangelio para todo el mundo.
                    Si el cuerpo es una cárcel de la que el espíritu debe escapar,
                    la resurrección corporal no tiene sentido.
                </p>
                <p>
                    Ireneo entendió que aquello no era una variante del cristianismo.
                    Era su negación sistemática, disfrazada con vocabulario cristiano.
                    Y decidió responder.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
        {
            id: 'adversus',
            title: 'Contra las Herejías',
            content: `
                <p>
                    Entre los años 180 y 185 Ireneo escribió su obra monumental:
                    <em>Adversus Haereses</em> («Contra las Herejías»), en cinco libros.
                    Es el primer gran tratado de teología sistemática de la historia cristiana
                    y el primer gran manual de heresología —el estudio de las herejías—.
                    Su método es doble: primero expone con detalle las doctrinas de los
                    gnósticos (los dos primeros libros) y luego las refuta desde las
                    Escrituras y la tradición apostólica (los tres restantes).
                </p>
                <p>
                    Sus armas contra el gnosticismo son tres, y las tres resultarían
                    fundamentales para el desarrollo del pensamiento cristiano.
                </p>
                <p>
                    Primera: la <strong>regla de fe</strong> (<em>regula fidei</em>).
                    Frente a la infinita variedad de sistemas gnósticos, Ireneo señala que
                    hay un contenido fijo de la fe cristiana —la doctrina sobre el Padre,
                    el Hijo, el Espíritu Santo, la creación, la encarnación, la redención,
                    la resurrección— que las iglesias apostólicas de todo el mundo confiesan
                    unánimemente. Si alguien enseña algo diferente, no es más espiritual:
                    es simplemente herético.
                </p>
                <p>
                    Segunda: la <strong>sucesión apostólica</strong> como criterio de autoridad.
                    Los gnósticos apelaban a una tradición secreta transmitida aparte de
                    los apóstoles. Ireneo responde que eso es inverificable e inverosímil:
                    la verdadera tradición apostólica es la que se puede rastrear públicamente
                    en las iglesias que los apóstoles fundaron y que han tenido una sucesión
                    verificable de obispos desde entonces. Presenta la lista de obispos
                    de Roma como ejemplo. No es el papado medieval lo que defiende, sino
                    la verificabilidad pública de la doctrina recibida de los apóstoles.
                </p>
                <p>
                    Tercera: el <strong>canon bíblico</strong>. Ireneo es el primer escritor
                    que cita los cuatro Evangelios como autoridad canónica igual y
                    complementaria —Mateo, Marcos, Lucas y Juan—, rechazando tanto
                    los evangelios gnósticos como la reducción marcionita a un solo evangelio
                    (una versión mutilada de Lucas). Su argumento de que deben ser cuatro
                    —como los cuatro puntos cardinales, como las cuatro bestias del Apocalipsis—
                    es débil por sí solo, pero su insistencia en los cuatro sentó un precedente
                    que el concilio posterior confirmaría.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
        {
            id: 'recapitulacion',
            title: 'La Recapitulación',
            content: `
                <p>
                    El aporte teológico más original de Ireneo es su doctrina de la
                    <strong>recapitulación</strong> (<em>anakephalaiosis</em>).
                    Tomando el término de la carta de Pablo a los Efesios (1:10), Ireneo
                    desarrolla una visión de la historia de la salvación que tiene una belleza
                    arquitectónica difícil de encontrar en otro teólogo de la Antigüedad.
                </p>
                <p>
                    Cristo, el Hijo de Dios encarnado, recapitula —resume, repite, revierte—
                    toda la historia de la humanidad desde Adán. Donde Adán desobedeció,
                    Cristo obedeció. Donde Adán cedió a la tentación del diablo, Cristo
                    la resistió. Donde la humanidad se había perdido, Cristo la recogió.
                    No es una mera sustitución legal —Cristo muere en lugar del pecador—
                    sino una recapitulación real: Cristo recorre el camino completo de la
                    humanidad hacia atrás, reparando cada punto de ruptura, restaurando
                    la imagen divina que el pecado había desfigurado.
                </p>
                <p>
                    Esta visión le permitió a Ireneo defender con toda convicción la bondad
                    de la creación material contra los gnósticos. Si el mismo Hijo de Dios
                    asumió carne humana, la materia no es mala. Si Cristo resucitó con
                    un cuerpo real, la resurrección corporal es real. Si Dios creó el
                    mundo material y lo declaró «muy bueno», el Creador y el Redentor son
                    el mismo Dios. El Antiguo Testamento y el Nuevo son los dos testamentos
                    del mismo Dios que actúa en la historia.
                </p>
                <p>
                    Su frase más conocida lo resume todo:
                    <em>«La gloria de Dios es el hombre plenamente vivo,
                    y la vida del hombre es la visión de Dios»</em>.
                    No el desprecio del cuerpo ni la huida de la materia,
                    sino el hombre entero —cuerpo y alma, historia y eternidad—
                    plenamente vivo en la presencia de Dios: eso es lo que la redención
                    de Cristo hace posible.
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
                    Ireneo murió alrededor del año 202, posiblemente como mártir durante
                    la persecución de Septimio Severo, aunque los testimonios históricos
                    no son concluyentes. Lo que sí es seguro es que dejó detrás de sí
                    una iglesia más definida, más articulada y más capaz de distinguir
                    el evangelio de sus imitaciones que la que encontró.
                </p>
                <p>
                    Su legado tiene varias dimensiones. Como <strong>heresiólogo</strong>,
                    estableció el método que la Iglesia usaría durante siglos para responder
                    a las desviaciones doctrinales: exposición detallada, refutación desde
                    la Escritura, apelación a la tradición apostólica verificable.
                    Como <strong>teólogo bíblico</strong>, fue el primero en articular
                    la unidad del Antiguo y Nuevo Testamento como dos momentos de la
                    misma historia de salvación, contra la fractura marcionita que quería
                    eliminar el Antiguo Testamento del canon cristiano.
                </p>
                <p>
                    Los Reformadores lo leyeron con cuidado. Calvino lo cita cuando necesita
                    mostrar que la doctrina de la Trinidad tiene raíces en los primeros siglos.
                    Los teólogos protestantes del siglo XVII lo invocan en la controversia
                    sobre el canon. En el siglo XX su doctrina de la recapitulación fue
                    redescubierta por teólogos como Gustaf Aulén y Hans Urs von Balthasar,
                    que encontraron en ella una visión de la expiación más rica que
                    las categorías puramente jurídicas que a veces dominan la teología occidental.
                </p>
                <p>
                    Pero quizás su legado más urgente es el más simple: la insistencia en
                    que la fe cristiana tiene un contenido verificable, transmitido públicamente
                    desde los apóstoles, que no puede ser reemplazado por ninguna gnosis
                    más sofisticada, más espiritual o más intelectualmente atractiva.
                    En una época que vuelve a producir sistemas espirituales que prometen
                    el conocimiento superior a los iniciados, Ireneo sigue siendo
                    un guía necesario.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
    ],

    quote: {
        text: 'La gloria de Dios es el hombre plenamente vivo, y la vida del hombre es la visión de Dios.',
        source: 'Ireneo de Lyon, Adversus Haereses IV.20.7',
    },

    timeline: [
        { year: 'c. 130',   event: 'Nace probablemente en Esmirna, Asia Menor (actual Turquía).' },
        { year: 'c. 140–155', event: 'Siendo niño o joven, escucha y conoce al obispo Policarpo de Esmirna, discípulo del apóstol Juan.' },
        { year: 'c. 160',   event: 'Se establece en Lyon, Galia (actual Francia), como presbítero de la comunidad cristiana.' },
        { year: '177',      event: 'Persecución de Marco Aurelio en Lyon: 48 mártires, entre ellos el obispo Potino de 90 años. Ireneo es enviado a Roma con una carta de intercesión.' },
        { year: '177–178',  event: 'Elegido obispo de Lyon en lugar del mártir Potino. Tiene alrededor de 47 años.' },
        { year: 'c. 180–185', event: 'Escribe Adversus Haereses (Contra las Herejías), 5 libros. Primer gran tratado de teología sistemática cristiana.' },
        { year: 'c. 190',   event: 'Escribe la Demostración de la Predicación Apostólica, catequesis para los fieles.' },
        { year: 'c. 190–202', event: 'Media en la controversia pascual entre Roma (que celebra la Pascua el domingo) y las iglesias de Asia (que la celebran el 14 de Nisán).' },
        { year: 'c. 202',   event: 'Muere, posiblemente como mártir, durante la persecución de Septimio Severo.' },
    ],
};

const Ireneo = () => {
    return (
        <BiographyTemplate
            biography={biography}
            seriesName="Padres de la Iglesia"
            seriesPath="/padres-de-la-iglesia"
        />
    );
};

export default Ireneo;
