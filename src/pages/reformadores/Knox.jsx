import BiographyTemplate from '../../components/BiographyTemplate';

/**
 * Biografía de John Knox
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
 *   portrait: `${import.meta.env.BASE_URL}img/reformadores/knox.jpg`,
 */

const biography = {
    slug: 'knox',
    name: 'John Knox',
    epithet: 'El León de la Reforma Escocesa',
    dates: 'c. 1514 – 1572',
    portrait: null,
    heroImage: `${import.meta.env.BASE_URL}img/reformadores/knox-hero.jpg`,
    // portrait: `${import.meta.env.BASE_URL}img/reformadores/knox.jpg`,

    sections: [
        {
            id: 'contexto',
            title: 'El País que Nadie Quería Reformar',
            content: `
                <p>
                    La Escocia del siglo XVI era un reino que sus vecinos miraban con mezcla de respeto y lástima.
                    Pobre, frecuentemente asolada por guerras con Inglaterra, gobernada por una nobleza tan turbulenta
                    como capaz de traicionarse entre sí, unida a Francia por la <em>Auld Alliance</em> —el pacto más
                    antiguo de Europa— que la convertía en pieza del ajedrez diplomático entre las grandes potencias.
                    Cuando Lutero clavó sus tesis en 1517, Escocia era uno de los últimos lugares donde alguien
                    hubiera apostado por una reforma exitosa.
                </p>
                <p>
                    La Iglesia escocesa era un desastre de proporciones documentadas. El clero era en gran medida
                    analfabeto; muchos sacerdotes rurales no podían recitar el Padrenuestro en latín. Los obispados
                    eran patrimonio de las familias nobles. El cardenal David Beaton —el hombre más poderoso de Escocia
                    después del rey— acumulaba prebendas, tenía al menos ocho hijos ilegítimos reconocidos, y ejercía
                    el poder con la brutalidad de un señor feudal. Era el tipo de hombre al que la Reforma amenazaba
                    directamente, y él lo sabía.
                </p>
                <p>
                    En ese escenario, un puñado de escoceses comenzó a leer los escritos de Lutero y Tyndale,
                    que llegaban de contrabando en los fardos de tela de los comerciantes flamencos. El parlamento
                    escocés los prohibió formalmente en 1525. La prohibición tuvo el efecto habitual de ese tipo
                    de medidas: aumentó la curiosidad.
                </p>
                <p>
                    John Knox nació alrededor de 1514 en Haddington, East Lothian, a unos cuarenta kilómetros
                    de Edimburgo. Sus orígenes son oscuros: probablemente estudió en la Universidad de St. Andrews,
                    fue ordenado sacerdote y trabajó como notario eclesiástico. No hay nada en sus primeros años
                    que anuncie al hombre que reformaría una nación. Su historia comienza, como la de tantos reformadores,
                    con otro hombre cuya muerte lo cambió todo.
                </p>
            `,
        },
        {
            id: 'galeote',
            title: 'El Galeote de Dios: Las Cadenas que Forjaron al Reformador',
            content: `
                <p>
                    George Wishart era el predicador protestante más elocuente de Escocia a mediados del siglo XVI.
                    Recorría el país predicando el Evangelio, perseguido por las autoridades eclesiásticas.
                    Knox se convirtió en su guardaespaldas, cargando literalmente una espada de dos manos
                    mientras Wishart predicaba. Cuando Wishart fue arrestado en diciembre de 1545, Knox quiso
                    acompañarlo. El reformador lo rechazó: <em>"Un solo hombre es suficiente para este sacrificio."</em>
                </p>
                <p>
                    En marzo de 1546, el cardenal Beaton hizo quemar a Wishart frente al castillo de St. Andrews
                    mientras él observaba desde una ventana. Dos meses después, un grupo de nobles protestantes
                    asesinó a Beaton y tomó el castillo. Knox se unió a los sitiados en 1547 y fue llamado a predicar
                    por la congregación reunida allí —según su propio relato, rompió a llorar cuando recibió el llamado
                    y no pudo hablar durante varios días—. Cuando finalmente subió al púlpito, había dejado de ser
                    un guardaespaldas con espada para convertirse en un guerrero con palabras.
                </p>
                <p>
                    La victoria no duró. En julio de 1547, una flota francesa tomó el castillo. Los defensores
                    fueron enviados a remar como galeotes en las galeras del rey de Francia. Knox pasó diecinueve
                    meses encadenado a un remo, enfermo, agotado, a punto de morir en más de una ocasión.
                    Cuando la galera pasaba frente a la ciudad de St. Andrews, un compañero le preguntó si reconocía
                    el lugar. <em>"Sí,"</em> respondió Knox, <em>"y estoy tan seguro como de que estoy vivo
                    de que nunca me rendirá hasta que yo predique de nuevo en esa iglesia."</em>
                    Lo dijo mientras remaba encadenado, con el cuerpo destruido por el escorbuto y el frío.
                </p>
                <p>
                    Lo liberaron en 1549 gracias a la presión del gobierno inglés del joven rey Eduardo VI.
                    Knox llegó a una Inglaterra en plena efervescencia protestante, se convirtió en capellán real
                    y contribuyó a dar forma a la Segunda Oración Comunal —el libro litúrgico del anglicanismo—.
                    Allí mostró por primera vez el carácter que lo definiría: cuando le pidieron que se arrodillara
                    para recibir la comunión, se negó. La postura física implicaba adoración; adorar pan y vino
                    era idolatría. El rey Eduardo terminó incluyendo en el libro una cláusula —conocida como
                    la <em>Black Rubric</em>— que aclaraba expresamente que arrodillarse no implicaba adoración
                    de los elementos. Knox había ganado la discusión frente al rey de Inglaterra.
                </p>
            `,
        },
        {
            id: 'exilio',
            title: 'El Exilio y el Encuentro con Calvino',
            content: `
                <p>
                    En 1553 murió Eduardo VI. Su media hermana María Tudor —Bloody Mary— subió al trono de Inglaterra
                    con el propósito declarado de restaurar el catolicismo. En cinco años de reinado quemó vivos
                    a casi trescientos protestantes. Knox huyó al continente.
                </p>
                <p>
                    Recorrió Frankfurt y Ginebra. En Ginebra conoció a Calvino y quedó marcado para siempre.
                    Fue allí donde escribió la frase que usaría toda su vida para describir lo que había visto:
                    <em>"La escuela de Cristo más perfecta que jamás existió en la tierra desde los días
                    de los apóstoles."</em> La disciplina de Ginebra, la centralidad de la predicación, la forma
                    presbiteriana de gobierno eclesiástico: todo eso lo llevaría a Escocia.
                </p>
                <p>
                    Fue en el exilio también donde escribió el texto que le costaría más caro políticamente:
                    <em>El Primer Toque de Trompeta contra el Monstruoso Régimen de las Mujeres</em> (1558).
                    El argumento era directo: el gobierno femenino contradecía el orden natural y bíblico.
                    Knox tenía en mente a María Tudor, a María de Guisa (regente de Escocia) y a María Estuardo.
                    Lo que no previó fue que ese mismo año subiría al trono de Inglaterra Isabel I, protestante
                    y aliada potencial. La reina Isabel nunca le perdonó el panfleto. Knox pasó el resto de su vida
                    intentando, sin éxito, explicar que no la había tenido en mente. No le creyó.
                </p>
            `,
        },
        {
            id: 'reforma',
            title: 'El Rugido del León: La Reforma de Escocia',
            content: `
                <p>
                    En mayo de 1559, Knox regresó a Escocia. Cuatro semanas después, predicó en la Iglesia de San Juan
                    de Perth un sermón sobre la purificación del templo. Cuando bajó del púlpito, la multitud
                    comenzó a arrancar imágenes y destruir altares. El incendio se extendió por toda Escocia.
                </p>
                <p>
                    Lo que siguió fue una combinación de revolución religiosa, guerra civil y diplomacia internacional.
                    Los nobles protestantes —los llamados <em>Lords of the Congregation</em>— se aliaron con Knox.
                    María de Guisa, la regente francesa, respondió con tropas. Knox cruzó en secreto la frontera
                    para obtener el apoyo militar de Isabel I de Inglaterra —quien, a pesar del panfleto, tenía
                    interés estratégico en expulsar la influencia francesa de su frontera norte—. Las tropas inglesas
                    llegaron. Los franceses se fueron.
                </p>
                <p>
                    En agosto de 1560, el Parlamento escocés hizo lo que pocos hubieran creído posible diez años antes:
                    abolió la autoridad del papa en Escocia, prohibió la misa y adoptó la Confesión Escocesa —escrita
                    por Knox y cinco colegas en apenas cuatro días de trabajo febril—. Escocia era oficialmente
                    un país protestante. Knox tenía unos cuarenta y seis años.
                </p>
                <p>
                    Ese mismo año redactó el <em>Primer Libro de Disciplina</em>, un documento que va mucho más allá
                    de la organización eclesiástica: proponía una escuela en cada parroquia para que ningún niño
                    escocés creciera sin saber leer. La educación universal como consecuencia directa del protestantismo.
                    La alfabetización como acto de piedad. El proyecto era demasiado ambicioso para que la nobleza
                    lo financiara completamente, pero plantó una semilla que en generaciones siguientes convirtió
                    a Escocia en uno de los países más letrados de Europa.
                </p>
            `,
        },
        {
            id: 'maria',
            title: 'El Hombre que no Temblaba ante Reinas',
            content: `
                <p>
                    En agosto de 1561, María Estuardo desembarcó en Escocia. Tenía diecinueve años, era viuda del
                    rey Francisco II de Francia, era la reina legítima de Escocia y era católica. Su llegada fue
                    el choque de fuerzas irresistibles que nadie podía haber evitado.
                </p>
                <p>
                    Knox y María se entrevistaron cuatro veces. Las conversaciones son de las más extraordinarias
                    en la historia de la Reforma: una reina joven, encantadora, inteligente y acostumbrada a que
                    los hombres se doblaran ante ella, frente a un predicador de mediana edad que no tenía la menor
                    intención de doblarse.
                </p>
                <p>
                    En la primera entrevista, María lo acusó de haber perturbado a sus súbditos y levantado a los
                    nobles contra su madre. Knox respondió que si los príncipes mandan en contra de Dios, los súbditos
                    tienen derecho a resistir. María lloró. No era manipulación; era genuina consternación ante un hombre
                    que le hablaba como si no fuera reina. Knox le dijo que las lágrimas de una dama hermosa le habían
                    causado más turbación que ningún otro poder en el mundo. Pero no retrocedió.
                </p>
                <p>
                    En otra ocasión, uno de los cortesanos le reprochó que había hecho llorar a la reina.
                    Knox respondió: <em>"Prefiero tolerar su amargura durante un momento que silenciar mi conciencia
                    para causarle placer."</em>
                </p>
                <p>
                    El destino de María terminó siendo más dramático que el de cualquier personaje de tragedia:
                    un segundo matrimonio con el brutal Lord Darnley, el asesinato de su secretario Rizzio ante sus
                    ojos, el asesinato del propio Darnley, un tercer matrimonio escandaloso con el sospechoso principal,
                    una derrota militar, la abdicación forzada y finalmente el exilio en Inglaterra, donde Isabel I
                    la mantuvo presa diecinueve años antes de mandarla ejecutar en 1587.
                </p>
                <p>
                    Knox murió antes de verlo todo: el 24 de noviembre de 1572, en Edimburgo. Su última acción
                    pública, días antes de morir, fue levantarse del lecho para predicar la ordenación de un nuevo
                    ministro. Cuando salió de la iglesia, hubo que sostenerlo. Al día siguiente no pudo levantarse.
                </p>
            `,
        },
        {
            id: 'legado',
            title: 'Legado: El León que Cambió una Nación',
            content: `
                <p>
                    El conde de Morton, regente de Escocia, pronunció ante la tumba de Knox unas palabras que ningún
                    biógrafo ha podido mejorar: <em>"Aquí yace uno que nunca adulo ni temió a ningún ser de carne."</em>
                </p>
                <p>
                    Knox fue el instrumento humano a través del cual Escocia se transformó de país católico-francés
                    a nación protestante-reformada en el espacio de pocos años. Fue el fundador de la Iglesia de Escocia,
                    de tradición presbiteriana: gobernada por presbíteros elegidos, sin obispos, con la Escritura
                    como norma suprema. Esa Iglesia sobrevivió a todos los intentos de los Estuardo por restaurar
                    el episcopado, y sigue siendo la Iglesia nacional de Escocia hoy.
                </p>
                <p>
                    Su visión de una escuela en cada parroquia no fue totalmente realizada en su generación,
                    pero el impulso que plantó transformó la cultura escocesa: en el siglo XVIII, Escocia produjo
                    una concentración extraordinaria de científicos, filósofos, médicos e ingenieros —Adam Smith,
                    David Hume, James Watt— que sería impensable sin la base de alfabetización y pensamiento crítico
                    que la Reforma protestante había sembrado.
                </p>
                <p>
                    La influencia de Knox cruzó el Atlántico: el presbiterianismo norteamericano, que desempeñó
                    un papel central en la formación de la cultura y las instituciones de los Estados Unidos,
                    lleva su herencia directa. El sistema de gobierno representativo de la Iglesia presbiteriana
                    fue uno de los modelos que los fundadores norteamericanos estudiaron cuando diseñaron
                    la república que tenían en mente.
                </p>
                <p>
                    Knox fue un hombre de su tiempo en sus limitaciones —el panfleto sobre el "monstruoso régimen"
                    es difícil de defender—, pero extraordinario en su valentía. Pasó de galeote encadenado
                    a reformador de una nación. No por ambición personal —no acumuló riquezas, rechazó cargos,
                    vivió con sencillez—, sino porque creyó con toda la fibra de su ser que Dios era más grande
                    que cualquier reina, cualquier cardenal y cualquier cadena de galera.
                </p>
                <p>
                    Hay una sola oración de Knox que resume toda su teología y toda su vida:
                    <em>"Dame Escocia o muero."</em>
                    Dios le dio Escocia.
                </p>
            `,
        },
    ],

    quote: {
        text: 'Aquí yace uno que nunca aduló ni temió a ningún ser de carne.',
        attribution: 'Conde de Morton, ante la tumba de John Knox — Edimburgo, 1572',
    },

    timeline: [
        { year: 'c. 1514', event: 'Nace en Haddington, East Lothian, Escocia.' },
        { year: '1546', event: 'George Wishart es quemado por el cardenal Beaton. Knox queda marcado por su muerte.' },
        { year: '1547', event: 'Toma el castillo de St. Andrews. Llamado a predicar. Los franceses lo capturan y lo envían a las galeras.' },
        { year: '1549', event: 'Liberado de las galeras. Llega a la Inglaterra protestante de Eduardo VI.' },
        { year: '1552', event: 'Contribuye a la Segunda Oración Comunal. Se niega a arrodillarse para comulgar.' },
        { year: '1553', event: 'María Tudor sube al trono. Knox huye al continente.' },
        { year: '1554', event: 'Conoce a Calvino en Ginebra. Llama a la ciudad "la escuela de Cristo más perfecta".' },
        { year: '1558', event: 'Publica el panfleto "El Monstruoso Régimen de las Mujeres". Isabel I de Inglaterra no lo olvida.' },
        { year: '1559', event: 'Regresa a Escocia. Su sermón en Perth desencadena una ola de iconoclasia.' },
        { year: '1560', event: 'El Parlamento escocés adopta la Confesión Escocesa. Abolición del papado y la misa.' },
        { year: '1560', event: 'Escribe el Primer Libro de Disciplina: propone una escuela en cada parroquia.' },
        { year: '1561', event: 'María Estuardo regresa a Escocia. Comienzan los cuatro célebres enfrentamientos con Knox.' },
        { year: '1567', event: 'María Estuardo abdica tras el escándalo con Bothwell. Su hijo Jacobo VI sube al trono.' },
        { year: '1572', event: '24 de noviembre: muere en Edimburgo. El conde de Morton pronuncia su epitafio memorable.' },
    ],
};

const Knox = () => (
    <BiographyTemplate
        biography={biography}
        seriesName="Reformadores"
        seriesPath="/reformadores"
    />
);

export default Knox;
