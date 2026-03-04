import BiographyTemplate from '../../components/BiographyTemplate';

/**
 * Biografía de Jan Hus
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
 *   portrait: `${import.meta.env.BASE_URL}img/prerreformadores/jan-hus.jpg`,
 */

const biography = {
    slug: 'jan-hus',
    name: 'Jan Hus',
    epithet: 'El Mártir de Constanza',
    dates: 'c. 1369 – 1415',
    portrait: null,
    // portrait: `${import.meta.env.BASE_URL}img/prerreformadores/jan-hus.jpg`,

    sections: [
        {
            id: 'contexto',
            title: 'Contexto Histórico',
            content: `
                <p>
                    Bohemia a finales del siglo XIV era un reino en ebullición intelectual y espiritual.
                    El rey Carlos IV había fundado la Universidad de Praga en 1348, la primera
                    universidad del Imperio Romano Germánico al este del Rin, y en ella convivían —no
                    siempre en paz— maestros checos, alemanes, bávaros y polacos. La identidad
                    nacional checa estaba buscando una voz. La tensión cultural era permanente.
                </p>
                <p>
                    La Iglesia en Bohemia presentaba las mismas llagas que en el resto de Europa:
                    clero ignorante, prelados más interesados en el poder político que en el cuidado
                    de almas, y una corrupción que ni se disimulaba. El Gran Cisma de Occidente
                    (1378–1417) lo había hecho todo peor: cuando dos —y luego tres— papas simultáneos
                    se excomulgaban mutuamente, ¿quién tenía autoridad real? La legitimidad de Roma
                    se había vuelto una pregunta abierta. En Praga, esa pregunta encontró a Jan Hus.
                </p>
                <p>
                    Hus nació hacia 1369 en una aldea llamada Husinec, en el sur de Bohemia.
                    Su apellido en checo significa <em>"ganso"</em>. Los que lo quemaron pensaron
                    que con eso bastaba. Se equivocaron. En 1390 llegó a la Universidad de Praga
                    a estudiar teología. Era brillante, disciplinado y profundamente piadoso.
                    Se ordenó sacerdote en 1400, y en 1402 fue designado predicador de la
                    Capilla de Belén.
                </p>
                <p>
                    La Capilla de Belén había sido construida en 1391 con un propósito explícito:
                    predicar en checo, no en latín. Podía albergar hasta tres mil personas, y
                    se llenaba. Allí, desde ese púlpito, Jan Hus encontró su misión.
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
                    Lo que transformó a Hus de predicador popular en enemigo declarado de Roma fue
                    el descubrimiento de los escritos de John Wycliffe. Cuando la noble Ana de Bohemia
                    se casó con el rey Ricardo II de Inglaterra, los flujos culturales entre ambos
                    reinos se intensificaron. Los estudiantes checos regresaban de Oxford con las obras
                    del "hereje de Lutterworth". Hus las leyó. No aceptó todo —rechazó algunas de las
                    posiciones más radicales de Wycliffe sobre la Eucaristía—, pero lo que encontró
                    sobre la autoridad de la Escritura y la corrupción de la Iglesia resonó con lo
                    que ya veía en Praga. El encuentro fue decisivo.
                </p>
                <p>
                    El conflicto con la jerarquía eclesiastica estalló en varios frentes.
                    Primero, la autoridad: para Hus, <strong>Cristo era la única cabeza de la
                    Iglesia</strong>. No el papa. El papa podía errar —había demostrado sobradamente
                    que podía errar—, y un papa que vive en pecado no tiene autoridad espiritual
                    legítima. Esta posición, tomada de Wycliffe, era anatema para Roma.
                </p>
                <p>
                    Segundo, la predicación en lengua vernácula. Al llevar la Palabra de Dios al
                    pueblo en checo, Hus no solo rompía una costumbre litúrgica: estaba subvirtiendo
                    el control clerical sobre el conocimiento espiritual. La gente comenzó a pensar
                    por sí misma. Y eso aterra a quienes viven del monopolio de la verdad.
                </p>
                <p>
                    Tercero, la denuncia de las indulgencias. En 1411–1412, el papa Juan XXIII
                    lanzó una cruzada contra el rey Ladislao de Nápoles y la financió vendiendo
                    indulgencias: quienes pagaran podían obtener el perdón de sus pecados. Hus
                    denunció la práctica desde el púlpito con una claridad que encendió Praga.
                    Tres jóvenes que protestaron públicamente fueron decapitados. Hus los proclamó
                    mártires. La ciudad hervía.
                </p>
                <p>
                    Cuarto, la <strong>comunión en las dos especies</strong>. Hus recuperó la
                    práctica de que los laicos comulgaran también con el vino, no solo con el pan.
                    La Iglesia había reservado el cáliz para los sacerdotes. Para Hus, eso
                    contradecía las palabras de Cristo: <em>"Bebed de él todos."</em>
                    El movimiento husita sería conocido para siempre por ese cáliz.
                    Lo llevarían en sus estandartes de guerra.
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
                    En 1409, el rey Wenceslás IV modificó los estatutos de la universidad, dando a
                    los maestros checos tres votos y a los alemanes uno. Los maestros alemanes,
                    humillados, abandonaron Praga y fundaron la Universidad de Leipzig. Hus se
                    convirtió en rector de Praga. Fue el momento más alto de su influencia
                    —y el comienzo de su caída.
                </p>
                <p>
                    El arzobispo Zbynek ordenó la quema de los libros de Wycliffe. Hus protestó.
                    Zbynek lo excomulgó en 1410. Hus apeló a Roma. Roma profundizó la condena.
                    Para proteger a la ciudad de Praga, que sería puesta bajo interdicto mientras
                    Hus permaneciera en ella —sin misas, sin bodas, sin entierros eclesiásticos—,
                    Hus se marchó voluntariamente a la campiña bohemia. Fue un exilio forzoso.
                    Lo usó para escribir su obra más importante.
                </p>
                <p>
                    En los castillos de la nobleza bohemia produjo el
                    <em>De Ecclesia</em> ("Sobre la Iglesia", 1413). El argumento central era
                    tan simple como letal: la Iglesia verdadera es el cuerpo de los predestinados,
                    cuyo único Señor es Cristo. El papa no es el vicario de Cristo, sino un cargo
                    que puede cuestionarse cuando quien lo ocupa contradice la ley de Cristo.
                </p>
                <p>
                    En 1414, llegó la invitación que parecía resolver todo: el Concilio de
                    Constanza. El emperador Segismundo le garantizó un salvoconducto imperial.
                    Sería escuchado. Podría defender sus ideas ante toda la Iglesia reunida.
                    Hus fue. <strong>Nunca debió haber ido.</strong>
                </p>
                <p>
                    Al llegar a Constanza en noviembre de 1414, fue arrestado pocas semanas después.
                    Encarcelado primero en una mazmorra húmeda junto al Rin, su salud se deterioró
                    gravemente. Los meses siguientes fueron juicios donde se le exigía una sola
                    cosa: retractarse.
                </p>
                <p>
                    Hus los sorprendió. Respondió que retractaría con alegría cualquier error que
                    le mostraran en la Escritura. Pero no podía retractarse de lo que no había
                    sostenido, ni abandonar la verdad solo para satisfacer a hombres que no
                    refutaban sus argumentos sino que simplemente los condenaban. La sala del
                    concilio rugía. El emperador Segismundo, que le había prometido protección,
                    miraba hacia otro lado. La lógica que justificaba la traición era cruel y
                    concisa: <em>"A los herejes no hay que guardarles la fe."</em>
                </p>
                <p>
                    El 6 de julio de 1415, Jan Hus fue conducido a una pradera junto al Rin.
                    Le pusieron una corona de papel con demonios pintados. Le quitaron sus
                    vestiduras sacerdotales una por una. El obispo que lo degradaba pronunció:
                    <em>"Encomendamos tu alma al diablo."</em>
                    Hus respondió sin vacilar:
                    <em>"Y yo la encomiendo al misericordioso Señor Jesucristo."</em>
                    Lo ataron al poste. El fuego se encendió. Murió orando.
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
                    El legado doctrinal de Hus es más sistemático de lo que a veces se reconoce.
                </p>
                <p>
                    Su contribución más duradera fue <strong>redefinir la Iglesia</strong>.
                    En una época en que "la Iglesia" significaba Roma, sus decretos y su jerarquía,
                    Hus insistió en que la Iglesia verdadera es la comunión de los elegidos de Dios,
                    cuyo único Señor es Cristo. Esta eclesiología, que encontraría eco pleno en
                    Calvino y en los reformadores del siglo XVI, cortaba el nudo gordiano de la
                    autoridad papal con una navaja teológica: si el papa contradice a Cristo,
                    el papa está equivocado.
                </p>
                <p>
                    Reformó la práctica litúrgica con la <strong>comunión en ambas especies</strong>.
                    Los husitas fueron los primeros en Europa en restaurar el cáliz para los laicos,
                    y lo defendieron con la Escritura y, cuando fue necesario, con las armas.
                </p>
                <p>
                    Predicó en checo y escribió en checo, contribuyendo enormemente al desarrollo
                    de la lengua literaria checa. Su influencia en el idioma es comparable a la de
                    Lutero en el alemán o la de Tyndale en el inglés. Hus estandarizó la ortografía
                    checa, y su forma de escribir perduró siglos.
                </p>
                <p>
                    Su eclesiología influyó directamente en los <strong>Hermanos Moravos</strong>
                    (<em>Unitas Fratrum</em>), fundados en 1457 por sus seguidores espirituales.
                    Los Hermanos Moravos mantendrían encendida una llama que siglos después tocaría
                    a John Wesley durante una tempestad en el Atlántico —y Wesley llevaría esa
                    llama al mundo anglosajón.
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
                    La muerte de Hus no apagó nada. Lo encendió todo.
                </p>
                <p>
                    Las noticias de Constanza llegaron a Bohemia como una chispa a un pajar.
                    En julio de 1419, el predicador Jan Zelivský encabezó la primera defenestración
                    de Praga: funcionarios reales arrojados por las ventanas del ayuntamiento.
                    Comenzaron las <strong>Guerras Husitas</strong>, que durarían quince años y
                    resistirían cinco cruzadas papales. Los ejércitos husitas, combatiendo bajo
                    el estandarte del cáliz y liderados por el genio militar del general
                    Jan Žižka —que peleó ciego de un ojo y luego de los dos—, derrotaron
                    repetidamente a los ejércitos imperiales. Una facción radical, los taboritas,
                    llegó a eliminar la misa por completo. Otra más moderada —los utraquistas—
                    negoció con el concilio y obtuvo el reconocimiento de la comunión en ambas
                    especies para Bohemia.
                </p>
                <p>
                    Pero el legado más profundo llegó un siglo después. Martín Lutero, que durante
                    años había creído que Hus era un hereje según le habían enseñado, leyó el
                    <em>De Ecclesia</em> en 1519. Quedó conmocionado. Escribió a su amigo Spalatin:
                    <em>"Sin darme cuenta, enseñé y sostuve todas las ideas de Juan Hus."</em>
                </p>
                <p>
                    Y está la profecía del ganso. Hay una tradición —de origen incierto pero
                    tenaz— de que Hus dijo antes de morir: <em>"Hoy asan a un ganso, pero de
                    aquí a cien años vendrá un cisne que no podrán asar."</em>
                    El ganso era él. El cisne era Lutero. La historia cumplió el plazo
                    casi al día.
                </p>
                <p>
                    La verdad de Hus resistió las llamas. Su lema —adoptado después como divisa
                    nacional de Checoslovaquia— dice en checo lo que él vivió y lo que murió
                    sosteniendo: <strong>Pravda vítězí. La verdad prevalece.</strong>
                </p>
            `,
            image: null,
            imagePosition: null,
        },
    ],

    quote: {
        text: 'Estoy dispuesto a revocar el error que me muestren desde la Escritura. Pero no puedo abandonar la verdad que no han refutado.',
        source: 'Jan Hus, ante el Concilio de Constanza (1415)',
    },

    timeline: [
        { year: 'c. 1369', event: 'Nace en Husinec, Bohemia. En checo, "Hus" significa "ganso".' },
        { year: '1390',    event: 'Ingresa a la Universidad de Praga para estudiar teología y filosofía.' },
        { year: '1396',    event: 'Obtiene el título de Maestro en Artes.' },
        { year: '1400',    event: 'Se ordena sacerdote.' },
        { year: '1401',    event: 'Decano de la Facultad de Artes de la Universidad de Praga.' },
        { year: '1402',    event: 'Designado predicador de la Capilla de Belén. Comienza a predicar en checo ante miles de personas.' },
        { year: '1403',    event: 'Estalla la controversia en Praga por los 45 artículos de Wycliffe. Hus los defiende parcialmente.' },
        { year: '1409',    event: 'Decreto de Kutná Hora: los maestros checos obtienen mayor representación. Los maestros alemanes abandonan Praga y fundan la Universidad de Leipzig. Hus se convierte en rector.' },
        { year: '1410',    event: 'El arzobispo Zbynek ordena quemar los libros de Wycliffe. Hus protesta y es excomulgado.' },
        { year: '1411–12', event: 'El papa Juan XXIII vende indulgencias para financiar su guerra. Hus predica contra la práctica. Tres jóvenes son decapitados por protestar; Hus los llama mártires.' },
        { year: '1412',    event: 'Para evitar el interdicto sobre Praga, Hus se retira voluntariamente a la campiña bohemia. Comienza a escribir sus obras más importantes.' },
        { year: '1413',    event: 'Escribe De Ecclesia ("Sobre la Iglesia"), su obra teológica más influyente.' },
        { year: 'Oct 1414', event: 'Parte hacia el Concilio de Constanza con un salvoconducto imperial firmado por el emperador Segismundo.' },
        { year: 'Nov 1414', event: 'Llega a Constanza. Semanas después es arrestado y encarcelado a pesar del salvoconducto.' },
        { year: 'Jun–Jul 1415', event: 'Juicios ante el concilio. Se le exige una retractación incondicional. Hus se niega repetidamente a renunciar a la verdad sin refutación bíblica.' },
        { year: '6 Jul 1415', event: 'Quemado vivo en Constanza. Muere orando. Su amigo Jerónimo de Praga sería quemado en el mismo lugar al año siguiente.' },
        { year: '1419',    event: 'Guerras Husitas: Bohemia entera estalla en protesta. Cinco cruzadas papales son derrotadas en campo de batalla.' },
        { year: '1457',    event: 'Sus seguidores espirituales fundan los Hermanos Moravos (Unitas Fratrum), que sobrevivirán siglos y llegarán al mundo entero.' },
        { year: '1519',    event: 'Martín Lutero lee el De Ecclesia y escribe: "Sin darme cuenta, enseñé y sostuve todas las ideas de Juan Hus."' },
    ],
};

const JanHus = () => {
    return (
        <BiographyTemplate
            biography={biography}
            seriesName="Prerreformadores"
            seriesPath="/prerreformadores"
        />
    );
};

export default JanHus;
