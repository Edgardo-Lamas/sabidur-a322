import BiographyTemplate from '../../components/BiographyTemplate';

/**
 * Biografía de John Wycliffe
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
 *   portrait: `${import.meta.env.BASE_URL}img/prerreformadores/wycliffe.jpg`,
 */

const biography = {
    slug: 'wycliffe',
    name: 'John Wycliffe',
    epithet: 'La Estrella Matutina de la Reforma',
    dates: 'c. 1328 – 1384',
    portrait: null,
    // portrait: `${import.meta.env.BASE_URL}img/prerreformadores/wycliffe.jpg`,

    sections: [
        {
            id: 'contexto',
            title: 'Contexto Histórico',
            content: `
                <p>
                    La Inglaterra del siglo XIV era un mundo sacudido hasta los cimientos.
                    La Gran Peste Negra de 1348 había barrido en menos de dos años casi un tercio
                    de la población europea. Los campos quedaron sin labrar, los pueblos despoblados,
                    y una pregunta feroz comenzó a circular por los callejones y las universidades:
                    <em>¿dónde estaba Dios?</em>
                </p>
                <p>
                    En medio de esa crisis, la Iglesia —que debería haber sido refugio y luz—
                    ofrecía un espectáculo escandaloso. Sus obispos poseían palacios y ejércitos.
                    Los papas, instalados en Aviñón desde 1309 en lo que los críticos llamaban
                    la <strong>"cautividad babilónica de la Iglesia"</strong>, se habían convertido
                    en monarcas más que en pastores. La corrupción era sistémica: los cargos
                    eclesiásticos se vendían al mejor postor, los sacerdotes ignoraban a sus
                    feligreses, y el dinero inglés fluía hacia las arcas pontificias en Francia
                    mientras el reino sostenía la costosa Guerra de los Cien Años contra ese
                    mismo país.
                </p>
                <p>
                    En ese escenario indigno surgió John Wycliffe. Hijo de una familia de Yorkshire,
                    llegó a Oxford en torno a 1345 y pronto demostró ser uno de los intelectos
                    más agudos de su generación. Oxford era entonces el centro neurálgico del
                    pensamiento inglés: allí se debatía filosofía, teología, derecho y política.
                    Wycliffe absorbió todo eso y fue más allá. Dominó la filosofía de Aristóteles
                    y la teología de Agustín, y con esas herramientas comenzó a construir algo
                    que sacudiría a Europa.
                </p>
                <p>
                    Lo que Wycliffe vio no fue solo una institución corrupta.
                    Vio un sistema <em>doctrinalmente</em> pervertido. Y decidió decirlo en voz alta.
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
                    La disputa de Wycliffe con Roma no fue un arrebato emocional sino una
                    disección quirúrgica. Comenzó con la filosofía política.
                </p>
                <p>
                    En su obra <em>De Dominio Divino</em> ("Sobre el señorío divino", 1375–1376),
                    sostuvo que toda autoridad legítima —ya sea civil o eclesiástica— le pertenece
                    a Dios y se delega a los hombres bajo la condición de que vivan en gracia.
                    Su argumento era demoledor: si un sacerdote, un obispo o incluso el papa
                    está en estado de pecado mortal, pierde su derecho al señorío espiritual y
                    material. Y si la Iglesia de Roma estaba, como era visible, hundida en codicia
                    y corrupción, entonces su reclamo de autoridad era ilegítimo.
                </p>
                <p>
                    La implicación política era explosiva: el Estado inglés tenía no solo el
                    derecho sino el <em>deber</em> de limitar el poder de una Iglesia indigna.
                    Wycliffe contó con el respaldo de Juan de Gaunt, duque de Lancaster —el hombre
                    más poderoso de Inglaterra después del rey—, quien vio en esas ideas una
                    justificación para lo que ya quería hacer.
                </p>
                <p>
                    Pero fue su postura sobre la Escritura lo que resultó verdaderamente
                    revolucionario. Para Wycliffe, la Biblia —y <strong>solo la Biblia</strong>—
                    era la autoridad suprema en materia de fe y práctica. No los decretos del
                    papa, no los concilios, no la tradición acumulada. La <em>lex Christi</em>,
                    la ley de Cristo contenida en las Sagradas Escrituras, era el único fundamento
                    sobre el que debía edificarse la Iglesia. En su <em>De Veritate Sacrae
                    Scripturae</em> lo declaró sin rodeos: la Escritura es la norma que regula
                    toda afirmación de la Iglesia; lo que no se puede fundar en ella debe ser
                    rechazado. Un siglo antes de que Lutero pronunciara su <em>Sola Scriptura</em>,
                    Wycliffe ya había trazado el mapa.
                </p>
                <p>
                    Entonces llegó el paso que lo convirtió en hereje a ojos de Roma: en 1381
                    negó la doctrina de la transubstanciación. Según la teología oficial, el pan
                    y el vino de la Eucaristía se convertían literalmente en el cuerpo y la sangre
                    de Cristo durante la consagración. Wycliffe rechazó esta explicación —que
                    dependía del aristotelismo escolástico— y argumentó que Cristo estaba presente
                    de modo sacramental en los elementos, sin que su sustancia física desplazara
                    al pan y al vino. Era exactamente la misma posición que costaría vidas
                    un siglo después. Sus compañeros de Oxford, alarmados, comenzaron a distanciarse.
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
                    Roma no tardó en responder. En mayo de 1377, el papa Gregorio XI emitió
                    cinco bulas papales dirigidas al rey Eduardo III, al arzobispo de Canterbury
                    y al obispo de Londres, condenando diecinueve proposiciones extraídas de los
                    escritos de Wycliffe. Lo acusaba de ser un nuevo Marsilio de Padua, agitador
                    peligroso que sembraba la discordia entre el pueblo y el clero.
                </p>
                <p>
                    En febrero de ese mismo año, Wycliffe fue citado a comparecer ante el obispo
                    de Londres, William Courtenay, en la catedral de San Pablo. Llegó acompañado
                    de Juan de Gaunt y cuatro frailes mendicantes. Lo que debía ser un juicio
                    solemne se convirtió en escándalo público: Juan de Gaunt y Courtenay
                    intercambiaron insultos encendidos, los londinenses que llenaban la catedral
                    apoyaron al obispo, y el proceso se disolvió en el caos sin pronunciar
                    ninguna sentencia.
                </p>
                <p>
                    Al año siguiente fue citado nuevamente, esta vez en Lambeth. Intervino
                    la madre del rey —Juana de Kent, Princesa de Gales— enviando un mensaje en
                    su favor. El Gran Cisma de Occidente recién había comenzado: había ahora
                    dos papas en disputa, y la Iglesia tenía problemas mayores que Wycliffe.
                    El proceso terminó igualmente inconcluido.
                </p>
                <p>
                    Pero en 1382, el arzobispo Courtenay convocó un sínodo en el convento de
                    los Predicadores en Blackfriars, Londres. Mientras los prelados deliberaban,
                    la tierra tembló: un terremoto sacudió la ciudad. Courtenay, sin perder la
                    compostura, declaró que aquello era una señal divina que expulsaba las herejías
                    del reino, como los gases malsanos que escapan de la tierra. El sínodo
                    —conocido desde entonces como el <strong>"Concilio del Terremoto"</strong>—
                    condenó veinticuatro proposiciones de Wycliffe como heréticas o erróneas,
                    y sus seguidores fueron expulsados de Oxford.
                </p>
                <p>
                    Wycliffe sufrió un ataque de parálisis ese mismo año. Retirado a su parroquia
                    de Lutterworth, en Leicestershire, no se rindió: continuó escribiendo,
                    predicando, enviando a sus "pobres predicadores" por los caminos de Inglaterra.
                    El 28 de diciembre de 1384, mientras celebraba la misa en su iglesia, sufrió
                    un segundo ataque. Lo llevaron a su cama. El 31 de diciembre, al comenzar
                    el año nuevo, John Wycliffe murió en Lutterworth.
                </p>
                <p>
                    Murió sin ser ejecutado. Sin ser quemado. Con su parroquia intacta.
                    Eso, para Roma, era una derrota que no podía dejarse así.
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
                    La obra más duradera de Wycliffe no fue filosófica sino pastoral:
                    la <strong>traducción de la Biblia al inglés</strong>.
                </p>
                <p>
                    Antes de él, ningún inglés común podía leer la Palabra de Dios en su propio
                    idioma. Las Escrituras existían en latín —la lengua del clero—, y el acceso
                    a ellas estaba controlado por la institución eclesiástica. Wycliffe cambió
                    eso. Junto con su colaborador Nicolás de Hereford y, posteriormente, su
                    discípulo John Purvey, produjo la primera traducción completa de la Biblia
                    al inglés (c. 1382–1395). Era una traducción de la Vulgata latina, no del
                    hebreo y el griego originales, pero eso no disminuyó su impacto. Por primera
                    vez, un campesino o un artesano inglés podía escuchar o leer la Palabra de
                    Dios en su lengua materna.
                </p>
                <p>
                    No había imprenta. Cada ejemplar debía copiarse a mano. Aun así, más de
                    doscientos cincuenta manuscritos de esa Biblia sobreviven hasta hoy, una
                    cantidad extraordinaria para la época, testimonio silencioso del hambre
                    espiritual que existía. La Corona y la jerarquía eclesiástica respondieron
                    prohibiendo su lectura y su posesión —con pena de muerte—, pero no lograron
                    detener su circulación.
                </p>
                <p>
                    Para llevar esa Palabra al pueblo, Wycliffe organizó los
                    <em>"pobres predicadores"</em>: hombres sencillos, frecuentemente laicos,
                    que recorrían los caminos de Inglaterra predicando de la Escritura. Sus
                    seguidores fueron llamados <strong>Lolardos</strong>, un nombre despectivo
                    (posiblemente del neerlandés <em>lollaerd</em>, "el que murmura oraciones").
                    Fueron perseguidos, encarcelados y quemados en los siglos siguientes,
                    pero el movimiento no pudo extinguirse del todo.
                </p>
                <p>
                    Sus escritos teológicos —el <em>De Dominio Divino</em>, el
                    <em>De Veritate Sacrae Scripturae</em>, el <em>Trialogus</em>—
                    llegaron a Bohemia a través de estudiantes y de la conexión dinástica entre
                    Ricardo II de Inglaterra y Ana de Bohemia. Jan Hus los leyó con avidez,
                    los adoptó, los defendió desde la cátedra de Praga y murió por ellos en
                    la hoguera en 1415. Cien años antes que Lutero, Wycliffe ya había trazado
                    el mapa teológico de la Reforma.
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
                    La Iglesia de Roma creyó que podía silenciar a Wycliffe incluso después
                    de muerto.
                </p>
                <p>
                    En 1415, el Concilio de Constanza —el mismo que envió a Jan Hus a la hoguera—
                    lo condenó póstumamente como hereje y ordenó que sus restos fueran desenterrados
                    y arrojados fuera del suelo sagrado. Pasaron trece años antes de que la orden
                    se ejecutara. En 1428, por mandato del papa Martín V, los huesos de Wycliffe
                    fueron exhumados de la iglesia de Lutterworth, quemados, y sus cenizas
                    arrojadas al río Swift, una pequeña corriente que serpentea junto al pueblo.
                </p>
                <p>
                    Fue un acto de victoria simbólica. Pero el símbolo les salió en contra.
                    El historiador inglés Thomas Fuller, escribiendo dos siglos después,
                    lo inmortalizó con una imagen que no ha podido olvidarse:
                </p>
                <blockquote>
                    "Así este arroyo ha llevado sus cenizas al Avon; el Avon al Severn;
                    el Severn a los mares estrechos; y estos al océano principal.
                    Y así las cenizas de Wycliffe son el emblema de su doctrina,
                    que ahora está esparcida por todo el mundo."
                    <br/><em>— Thomas Fuller, The Church History of Britain (1655)</em>
                </blockquote>
                <p>
                    No pudieron detenerla. La Biblia en inglés que Wycliffe puso en manos
                    del pueblo engendró la traducción de William Tyndale, que engendró la Biblia
                    del Rey Jacobo, que viajó en los barcos de los peregrinos hasta América.
                    Los Lolardos que Roma persiguió sobrevivieron en graneros y sótanos y
                    prepararon el terreno para la Reforma inglesa. Martín Lutero leyó a Hus
                    antes de clavar sus tesis, y Hus había leído a Wycliffe.
                </p>
                <p>
                    El hombre de Yorkshire que en el siglo XIV se sentó con su Biblia latina
                    y decidió que el pueblo de Dios merecía entender la Palabra de Dios,
                    no sabía lo que estaba encendiendo. Pero el fuego que prendió
                    no ha terminado de arder.
                </p>
            `,
            image: null,
            imagePosition: null,
        },
    ],

    quote: {
        text: 'Confío en que, a la postre, la verdad prevalecerá.',
        source: 'John Wycliffe',
    },

    timeline: [
        { year: 'c. 1328', event: 'Nace en Yorkshire, Inglaterra, en la aldea de Hipswell, cerca de Richmond.' },
        { year: 'c. 1345', event: 'Inicia sus estudios en Oxford. Pasa por Merton College, Balliol College y Queen\'s College.' },
        { year: '1348',    event: 'La Gran Peste Negra devasta Inglaterra. Muere aproximadamente un tercio de la población.' },
        { year: '1361',    event: 'Recibe la parroquia de Fillingham, Lincolnshire, su primer cargo pastoral.' },
        { year: '1374',    event: 'Recibe la parroquia de Lutterworth, Leicestershire, donde vivirá y morirá. Participa en la delegación inglesa ante la Santa Sede en Brujas.' },
        { year: '1375',    event: 'Escribe De Dominio Divino: toda autoridad legítima procede de Dios y la pierde quien vive en pecado.' },
        { year: 'Feb 1377', event: 'Primer juicio en la catedral de San Pablo, Londres. El proceso colapsa cuando Juan de Gaunt y el obispo Courtenay intercambian insultos públicos.' },
        { year: 'May 1377', event: 'El papa Gregorio XI emite cinco bulas papales condenando diecinueve proposiciones de Wycliffe.' },
        { year: '1378',    event: 'Segundo juicio en Lambeth: termina sin sentencia. Comienza el Gran Cisma de Occidente: dos papas simultáneos.' },
        { year: '1380',    event: 'Inicia la traducción de la Biblia al inglés con la colaboración de Nicolás de Hereford.' },
        { year: '1381',    event: 'Rechaza públicamente la transubstanciación. Sus compañeros de Oxford comienzan a distanciarse.' },
        { year: '1382',    event: 'El "Concilio del Terremoto" (Sínodo de Blackfriars) condena veinticuatro de sus proposiciones. Sus seguidores son expulsados de Oxford. Sufre su primer ataque de parálisis.' },
        { year: '1382–84', event: 'Retirado en Lutterworth, continúa escribiendo el Trialogus y otras obras. Sus "pobres predicadores" siguen recorriendo Inglaterra.' },
        { year: '28 Dic 1384', event: 'Sufre un segundo ataque mientras celebra la misa en su iglesia de Lutterworth.' },
        { year: '31 Dic 1384', event: 'Muere en Lutterworth. Fallece sin ser ejecutado ni exiliado.' },
        { year: '1415',    event: 'El Concilio de Constanza lo condena póstumamente como hereje. Jan Hus, su discípulo intelectual, muere quemado en ese mismo concilio.' },
        { year: '1428',    event: 'Por orden del papa Martín V, sus huesos son desenterrados, quemados y sus cenizas arrojadas al río Swift. La doctrina, ya esparcida, no puede quemarse.' },
    ],
};

const Wycliffe = () => {
    return (
        <BiographyTemplate
            biography={biography}
            seriesName="Prerreformadores"
            seriesPath="/prerreformadores"
        />
    );
};

export default Wycliffe;
