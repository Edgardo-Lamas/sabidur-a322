import BiographyTemplate from '../../components/BiographyTemplate';

/**
 * Biografía de Ulrico Zuinglio
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
 *   portrait: `${import.meta.env.BASE_URL}img/reformadores/zuinglio.jpg`,
 */

const biography = {
    slug: 'zuinglio',
    name: 'Ulrico Zuinglio',
    epithet: 'El Reformador de Zúrich',
    dates: '1484 – 1531',
    portrait: null,
    // portrait: `${import.meta.env.BASE_URL}img/reformadores/zuinglio.jpg`,

    sections: [
        {
            id: 'contexto',
            title: 'Los Alpes y la Lanza: El Mundo que Formó a Zuinglio',
            content: `
                <p>
                    El 1 de enero de 1484, en Wildhaus, una aldea perdida entre las cumbres de los Alpes de San Galo,
                    nació Huldrych Zuinglio —en español, Ulrico—. Siete semanas antes, en una pequeña ciudad minera de Sajonia,
                    había nacido Martín Lutero. Los dos hombres llegarían a la misma conclusión teológica fundamental
                    por caminos completamente distintos, y terminarían separados por una disputa sobre una frase de seis palabras
                    que ninguno de los dos estuvo dispuesto a ceder.
                </p>
                <p>
                    Zuinglio nació en la Confederación Helvética —la Suiza de hoy—, un territorio que no era técnicamente
                    parte del Sacro Imperio Romano Germánico aunque lo rozaba por todos sus bordes. Los cantones suizos eran
                    orgullosamente independientes, gobernados por consejos de ciudadanos, con una identidad forjada en siglos
                    de resistencia armada contra Habsburgos y Borgoñones. Y tenían un producto de exportación que el mundo
                    entero codiciaba: sus soldados.
                </p>
                <p>
                    El sistema de mercenarios suizos —el <em>Reisläuferei</em>— era la realidad económica y social dominante
                    de los cantones. Los papas, los reyes de Francia, el emperador: todos contrataban soldados suizos,
                    considerados los mejores del mundo. Y los jóvenes de las montañas —hijos de familias pobres sin tierra
                    suficiente para todos— marchaban a guerras ajenas por un salario que sus aldeas jamás podrían ofrecerles.
                    Zuinglio vio este sistema desde adentro: fue capellán de las tropas suizas en Italia, presente en la
                    batalla de Novara (1513) y luego en la desastrosa batalla de Marignano (1515), donde los suizos sufrieron
                    la peor derrota de su historia. Vio morir a miles de compatriotas en guerras que no eran las suyas.
                    Nunca lo olvidó.
                </p>
                <p>
                    Pero antes de ser capellán de guerreros, Zuinglio fue estudiante. Su padre, magistrado de Wildhaus,
                    invirtió en la educación del hijo: Basilea, Berna, Viena, Basilea de nuevo. En Basilea entró en contacto
                    con el humanismo erasmiano, la corriente intelectual que soñaba con reformar la Iglesia desde adentro
                    a través del regreso a las fuentes: la Biblia en sus lenguas originales, los Padres de la Iglesia,
                    la razón aplicada a la teología. Zuinglio nunca abandonó ese impulso humanista; lo llevó consigo
                    a la Reforma.
                </p>
            `,
        },
        {
            id: 'conversion',
            title: 'El Humanista que Encontró la Biblia',
            content: `
                <p>
                    Ordenado sacerdote en 1506, Zuinglio ejerció en Glarus durante diez años. En ese período comenzó
                    a estudiar el Nuevo Testamento griego con una intensidad que iba más allá del humanismo académico.
                    Cuando Erasmo publicó su edición crítica del Nuevo Testamento griego en 1516 —el mismo texto que Lutero
                    usaría para su traducción alemana— Zuinglio lo devoró. Copió de su puño y letra las cartas de Pablo
                    completas para memorizarlas. El griego no era para él un ejercicio filológico; era el camino a Cristo.
                </p>
                <p>
                    A diferencia de Lutero, Zuinglio no describe una experiencia de conversión dramática y fechada. Su camino
                    fue más gradual: el estudio sistemático de la Escritura fue erosionando, año tras año, su confianza en las
                    tradiciones eclesiásticas que no encontraba respaldo en los textos. El resultado fue el mismo:
                    la convicción de que la Palabra de Dios era la autoridad única y suficiente sobre todo lo demás.
                </p>
                <p>
                    En 1519 fue llamado como predicador popular —<em>Leutpriester</em>— al Grossmünster de Zúrich,
                    la iglesia principal de la ciudad. El primer domingo de su ministerio, el 1 de enero de 1519,
                    anunció algo que nadie esperaba: en lugar de seguir el ciclo litúrgico de lecturas seleccionadas,
                    comenzaría a predicar el Evangelio de Mateo capítulo por capítulo, versículo por versículo, desde el
                    principio hasta el fin. <em>Lectio continua</em>: la Escritura expuesta en su totalidad y en su orden.
                </p>
                <p>
                    Era un gesto aparentemente técnico que era en realidad una declaración de principios: la Biblia entera
                    era la norma de la predicación cristiana, no los fragmentos que la tradición había seleccionado
                    y que con frecuencia servían para sostener prácticas que el texto completo no respaldaba.
                    Zúrich no lo sabía todavía, pero acababa de comenzar su Reforma.
                </p>
                <p>
                    Ese mismo año, la peste negra azotó Zúrich. Murió casi un cuarto de la población. Zuinglio contrajo
                    la enfermedad y estuvo al borde de la muerte durante semanas. De esa experiencia nació el <em>Lied
                    de la Peste</em>, uno de los textos más personales que dejó: <em>"Haz lo que quieras, pues nada me falta.
                    Soy tu vasija para ser moldeada o destruida."</em> El hombre que salió del umbral de la muerte
                    no volvió a tener miedo a los poderes humanos.
                </p>
            `,
        },
        {
            id: 'zurich',
            title: 'La Reforma desde el Púlpito: Salchichas, Tesis e Imágenes',
            content: `
                <p>
                    La Reforma en Zúrich tuvo un comienzo inesperadamente mundano. En la Cuaresma de 1522, el impresor
                    Christoph Froschauer convocó a varios hombres en su taller y, públicamente, comieron salchichas —un
                    alimento prohibido durante el ayuno cuaresmal—. El escándalo fue inmediato. Zuinglio no había estado
                    presente, pero subió al púlpito y predicó un sermón que defendía la libertad cristiana respecto al
                    ayuno: ninguna tradición humana podía obligar la conciencia donde la Escritura no mandaba.
                </p>
                <p>
                    El <em>Affaire des Saucisses</em> —el Asunto de las Salchichas— parece trivial pero no lo era: tocaba
                    el principio central de la Reforma. ¿Quién tiene autoridad para definir lo que es obligatorio en la
                    vida cristiana? La respuesta de Zuinglio era la misma que la de Lutero: solo la Escritura.
                </p>
                <p>
                    En enero de 1523, el Consejo de Zúrich convocó una disputa pública. Zuinglio presentó sus Sesenta
                    y Siete Artículos, un resumen de sus posiciones reformadoras. Los representantes del obispo de Constanza
                    no pudieron refutarlo con argumentos de la Escritura. El Consejo declaró que Zuinglio debía continuar
                    predicando como lo hacía. Zúrich había oficialmente adoptado la Reforma —no por decreto papal ni imperial,
                    sino por decisión de su consejo ciudadano.
                </p>
                <p>
                    Las consecuencias fueron radicales. Entre 1524 y 1525, las imágenes y estatuas fueron retiradas
                    de las iglesias zuriquesas —en algunos casos con violencia popular—. Los órganos fueron desmantelados.
                    Los monasterios fueron disueltos y convertidos en hospitales y escuelas. La misa fue abolida y reemplazada
                    por un servicio sencillo centrado en la predicación y la lectura de la Escritura. Los sacerdotes
                    pudieron casarse —Zuinglio se había casado en secreto con Anna Reinhart en 1522 y lo formalizó
                    públicamente en 1524—.
                </p>
                <p>
                    Zuinglio fue, en esto, más radical que Lutero: donde el reformador alemán conservaba lo que la Escritura
                    no prohibía expresamente, Zuinglio eliminaba lo que la Escritura no ordenaba expresamente.
                    Eran dos filosofías de la reforma que producían iglesias visiblemente distintas.
                </p>
            `,
        },
        {
            id: 'marburgo',
            title: 'Marburgo 1529: La Fractura que no Pudo Cerrarse',
            content: `
                <p>
                    En octubre de 1529, Felipe de Hesse convocó a los principales líderes de la Reforma a su castillo
                    de Marburgo con un objetivo político urgente: si los protestantes alemanes y suizos no se unían
                    teológicamente, el Sacro Imperio Germánico los aplastaría por separado. El Coloquio de Marburgo
                    fue el intento más serio de unificar el frente reformador.
                </p>
                <p>
                    En catorce de los quince puntos debatidos, Lutero y Zuinglio estuvieron de acuerdo. En el quinceavo
                    —la naturaleza de la presencia de Cristo en la Cena del Señor— chocaron frontalmente y ninguno
                    dio un paso atrás.
                </p>
                <p>
                    La frase en disputa era la misma que había dividido a la Iglesia occidental desde hacía siglos:
                    <em>"Esto es mi cuerpo"</em> (Mateo 26:26). Lutero sostenía que Cristo estaba real y físicamente
                    presente en el pan y el vino de la comunión —no mediante la transubstanciación católica,
                    pero sí de manera genuina y corporal—. Según cuenta la tradición, escribió en la mesa con tiza:
                    <em>Hoc est corpus meum</em>, y no estuvo dispuesto a moverse de allí.
                </p>
                <p>
                    Zuinglio argumentaba que "es" significaba "representa": la Cena era un memorial, una conmemoración
                    de la muerte de Cristo, no una repetición ni una presencia física. Cristo, resucitado y glorificado,
                    estaba a la diestra del Padre; su cuerpo físico no podía estar simultáneamente en miles de altares.
                    El versículo debía interpretarse espiritualmente, no literalmente.
                </p>
                <p>
                    Lutero calificó la posición de Zuinglio de racionalista y espiritualista. Zuinglio calificó la de
                    Lutero de criptopapal. Cuando Zuinglio extendió la mano al final del debate para saludar a Lutero
                    como hermano, este se negó a estrecharla: <em>"Vuestro espíritu y el nuestro no son el mismo."</em>
                </p>
                <p>
                    La Reforma quedó dividida en dos ramas que nunca volverían a unirse. La ruptura de Marburgo es
                    una de las tragedias permanentes de la historia protestante: dos hombres que creían lo mismo
                    sobre casi todo, separados para siempre por algo que ambos consideraban irrenunciable.
                </p>
            `,
        },
        {
            id: 'kappel',
            title: 'Kappel 1531: La Muerte en el Campo de Batalla',
            content: `
                <p>
                    Zuinglio nunca separó la Reforma religiosa de la renovación política de los cantones suizos.
                    Para él, el Evangelio tenía consecuencias sobre la vida pública: la corrupción del sistema mercenario,
                    la dependencia de los cantones del oro papal, la desigualdad entre los ciudadanos eran problemas
                    que una ciudad verdaderamente reformada debía abordar.
                </p>
                <p>
                    Los cantones del interior —los llamados Cantones Forestales o de la Selva: Uri, Schwyz, Unterwalden,
                    Zug, Lucerna— eran profundamente católicos y veían en la Reforma de Zúrich una amenaza directa
                    a su identidad y a sus acuerdos con Roma. La tensión fue escalando durante años.
                </p>
                <p>
                    En 1531, Zúrich impuso un bloqueo de alimentos a los cantones católicos para presionarlos a aceptar
                    la libertad religiosa para sus ciudadanos protestantes. La maniobra fue un error político catastrófico.
                    Los cantones católicos respondieron con las armas y atacaron antes de que Zúrich pudiera movilizarse
                    adecuadamente. El 11 de octubre de 1531, en el campo de Kappel am Albis, el ejército zuriqu és
                    fue aplastado en menos de una hora. Quinientos hombres murieron.
                </p>
                <p>
                    Zuinglio había ido al campo de batalla como capellán, según la costumbre suiza. Fue herido,
                    cayó del caballo y fue rodeado por soldados enemigos que lo interrogaron. Cuando se negó a pedir
                    un sacerdote católico para confesarse, lo mataron. Tenía cuarenta y siete años.
                </p>
                <p>
                    Los vencedores lo identificaron. Cuartearon su cuerpo, lo quemaron y mezclaron las cenizas con estiércol
                    para que no quedara nada que venerar. Fue el único reformador del siglo XVI que murió en el campo
                    de batalla. Calvino, al enterarse, escribió que había sido un golpe de dolor como si le hubieran
                    arrancado la mitad del corazón.
                </p>
            `,
        },
        {
            id: 'legado',
            title: 'Legado: El Reformador que el Mundo Olvidó (y No Debería)',
            content: `
                <p>
                    En el panteón de la Reforma, Zuinglio ocupa un lugar extrañamente secundario. Lutero es el profeta,
                    Calvino es el sistematizador; Zuinglio es, con demasiada frecuencia, "el otro". Esa injusticia
                    histórica merece corrección.
                </p>
                <p>
                    Zuinglio fue el primer reformador en aplicar sistemáticamente el principio de la Escritura como
                    única norma a la vida litúrgica de una ciudad entera. Lo que hizo en Zúrich entre 1519 y 1531
                    fue más radical que lo que Lutero hizo en Wittenberg en el mismo período: abolió completamente
                    la misa, retiró las imágenes, reformó la educación, atacó el sistema mercenario y sometió toda
                    la vida pública al escrutinio de la Palabra.
                </p>
                <p>
                    Su sucesor en el Grossmünster fue Heinrich Bullinger, quien durante cuarenta y cuatro años
                    consolidó la Reforma suiza y construyó puentes con los calvinistas. La <em>Segunda Confesión
                    Helvética</em> (1566), escrita por Bullinger, fue adoptada por Iglesias reformadas en Suiza,
                    Hungría, Polonia, Francia y Escocia. La tradición teológica que hoy llamamos "reformada" o
                    "presbiteriana" tiene en Zuinglio uno de sus padres fundadores, aunque ese nombre rara vez
                    aparezca en los libros de catecismo.
                </p>
                <p>
                    La pregunta que dejó sin resolver —¿qué significa exactamente la presencia de Cristo en la
                    Cena del Señor?— sigue siendo la línea que separa a las tradiciones luterana y reformada
                    casi cinco siglos después. Es quizás el debate teológico más largo de la historia protestante,
                    y comenzó en aquella mesa de Marburgo donde dos hombres se miraron y no pudieron encontrarse.
                </p>
                <p>
                    Zuinglio murió con la espada en la mano, en el campo de batalla donde había enviado a sus
                    compatriotas. Fue fiel a su convicción hasta el final, con todas sus contradicciones:
                    el hombre que predicó contra el sistema mercenario murió como capellán de ejército.
                    El reformador que enseñó la soberanía de Dios confió demasiado en la espada de los hombres.
                    Su grandeza y su tragedia van de la mano, inseparables, como suele ocurrir con quienes
                    vivieron en plena tormenta de la historia.
                </p>
            `,
        },
    ],

    quote: {
        text: 'Haz lo que quieras, pues nada me falta. Soy tu vasija para ser moldeada o destruida.',
        attribution: 'Ulrico Zuinglio — Lied de la Peste, 1519',
    },

    timeline: [
        { year: '1484', event: 'Nace el 1 de enero en Wildhaus, Cantón de San Galo, Suiza.' },
        { year: '1498', event: 'Estudia en Basilea. Entra en contacto con el humanismo erasmiano.' },
        { year: '1506', event: 'Ordenado sacerdote. Asignado como párroco en Glarus.' },
        { year: '1513', event: 'Capellán de tropas suizas en la batalla de Novara, Italia.' },
        { year: '1515', event: 'Presente en la batalla de Marignano. La devastación lo convierte en crítico del sistema mercenario.' },
        { year: '1516', event: 'Erasmo publica su NT griego. Zuinglio lo estudia y copia de memoria las cartas de Pablo.' },
        { year: '1519', event: 'Llamado al Grossmünster de Zúrich. Inicia la lectio continua del Evangelio de Mateo.' },
        { year: '1519', event: 'La peste azota Zúrich. Zuinglio enferma gravemente y escribe el Lied de la Peste.' },
        { year: '1522', event: 'El Asunto de las Salchichas. Defiende la libertad cristiana frente al ayuno cuaresmal.' },
        { year: '1522', event: 'Se casa en secreto con Anna Reinhart, viuda.' },
        { year: '1523', event: 'Primera Disputa de Zúrich. Sus 67 Artículos son aceptados por el Consejo.' },
        { year: '1524', event: 'Retiro de imágenes de las iglesias zuriquesas. Matrimonio público con Anna.' },
        { year: '1525', event: 'Abolición de la misa. Institución de un servicio centrado en la predicación.' },
        { year: '1529', event: 'Coloquio de Marburgo. Ruptura con Lutero sobre la Cena del Señor.' },
        { year: '1531', event: 'Bloqueo de alimentos a los cantones católicos. Error político que precipita la guerra.' },
        { year: '1531', event: '11 de octubre: batalla de Kappel. Zuinglio muere en el campo. Tenía 47 años.' },
    ],
};

const Zuinglio = () => (
    <BiographyTemplate
        biography={biography}
        seriesName="Reformadores"
        seriesPath="/reformadores"
    />
);

export default Zuinglio;
