import BiographyTemplate from '../../components/BiographyTemplate';

/**
 * Biografía de Heinrich Bullinger
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
 *   portrait: `${import.meta.env.BASE_URL}img/reformadores/bullinger.jpg`,
 */

const biography = {
    slug: 'bullinger',
    name: 'Heinrich Bullinger',
    epithet: 'El Sucesor Fiel de Zuinglio',
    dates: '1504 – 1575',
    portrait: null,
    // portrait: `${import.meta.env.BASE_URL}img/reformadores/bullinger.jpg`,

    sections: [
        {
            id: 'contexto',
            title: 'El Hombre que Nadie Recuerda (Pero Todos Deberían Conocer)',
            content: `
                <p>
                    Hay una prueba sencilla para medir la fama de un reformador: mencionar su nombre
                    en una conversación sobre el siglo XVI y observar cuántos lo reconocen. Con Lutero,
                    todos asienten. Con Calvino, la mayoría. Con Zuinglio, algunos. Con Knox, los que
                    conocen la historia escocesa. Con Heinrich Bullinger, casi nadie.
                </p>
                <p>
                    Y sin embargo, Bullinger fue durante cuarenta y cuatro años el pastor principal de Zúrich,
                    la ciudad donde la Reforma suiza había nacido. Escribió más cartas que ningún otro reformador
                    —conservamos doce mil, una cantidad que supera las de Lutero, Calvino y Zuinglio combinados—.
                    La <em>Segunda Confesión Helvética</em>, que él solo redactó en su lecho de enfermo a los
                    cincuenta y siete años, fue adoptada como confesión de fe por las Iglesias reformadas de Suiza,
                    Francia, Escocia, Hungría y Polonia. Fue el hombre que tendió el puente entre Zuinglio y Calvino
                    sobre la controversia que había partido el protestantismo. Fue el refugio de cientos de protestantes
                    ingleses que huían de las hogueras de María Tudor.
                </p>
                <p>
                    La paradoja de Bullinger es que su virtud principal —la fidelidad discreta, el servicio sostenido,
                    la generosidad sin pretensiones— es exactamente lo que lo hace invisible para la memoria histórica,
                    que prefiere los momentos dramáticos a los ministerios longevos. Lutero tiene el rayo.
                    Knox tiene las galeras. Bullinger tiene cuarenta y cuatro años de pastoreo fiel en la misma ciudad.
                    La historia suele preferir el relámpago a la luz del día. Pero es la luz del día la que permite vivir.
                </p>
                <p>
                    Heinrich Bullinger nació el 18 de julio de 1504 en Bremgarten, Aargau, Suiza. Su padre era,
                    con cierta ironía histórica, un sacerdote católico —el celibato clerical era frecuentemente
                    ignorado en la Suiza de entonces—. Su familia acomodó sin dificultad el paso a la Reforma:
                    el padre de Bullinger se casó con la madre de sus hijos cuando la Reforma lo permitió y fue
                    uno de los primeros sacerdotes de la región en convertirse al protestantismo.
                </p>
            `,
        },
        {
            id: 'formacion',
            title: 'El Estudiante que Volvió a las Fuentes',
            content: `
                <p>
                    En 1519, a los quince años, Bullinger fue a estudiar a la Universidad de Colonia.
                    Era la ciudad donde el pensamiento escolástico medieval tenía uno de sus bastiones más sólidos,
                    y donde Bullinger esperaba recibir una formación teológica convencional. Lo que encontró fue
                    el inicio de una revolución intelectual silenciosa.
                </p>
                <p>
                    En Colonia descubrió los escritos de los humanistas: Erasmo, Melanchthon, los primeros textos
                    de Lutero que circulaban de mano en mano. Pero más que los reformadores contemporáneos,
                    fueron los Padres de la Iglesia los que más lo marcaron: Orígenes, Crisóstomo, Agustín,
                    Cipriano. Bullinger leyó las fuentes con la misma convicción que los humanistas: el método
                    correcto de la teología era volver al texto original. Y el texto original decía cosas
                    bastante distintas de lo que Roma enseñaba en el siglo XVI.
                </p>
                <p>
                    Regresó a Suiza en 1522 y encontró empleo como maestro en la escuela del monasterio
                    cisterciense de Kappel am Albis. El nombre de ese lugar reaparecerá con dolor en su historia:
                    era el mismo prado donde nueve años después moriría Zuinglio.
                </p>
                <p>
                    En Kappel conoció a Zuinglio, quien visitaba la escuela regularmente. La amistad fue
                    inmediata y profunda. Bullinger tenía veintiún años; Zuinglio, cuarenta. El mayor era
                    el profeta incendiario; el joven, el estudioso sistemático. Se complementaban perfectamente.
                    Cuando el monasterio fue disuelto en 1525 como parte de la Reforma, Bullinger continuó
                    enseñando ahora en una escuela reformada. Estaba aprendiendo, sin saberlo, a dirigir
                    una institución en medio de un mundo que cambiaba.
                </p>
                <p>
                    En 1529 introdujo la Reforma en Bremgarten, su ciudad natal, donde su padre era párroco.
                    Fue un acto cargado de simbolismo familiar y teológico: el hijo ayudando al padre a hacer
                    el mismo camino que ambos habían recorrido interiormente, pero ahora en público y ante
                    una congregación.
                </p>
            `,
        },
        {
            id: 'sucesor',
            title: 'El Sucesor que Nadie Esperaba: Zúrich a los Veintisiete Años',
            content: `
                <p>
                    El 11 de octubre de 1531, la batalla de Kappel dejó a Zúrich sin su reformador y sin
                    una cuarta parte de sus líderes civiles. El golpe fue devastador. La ciudad estaba en estado
                    de shock, amenazada militarmente por los cantones católicos victoriosos y sin liderazgo
                    espiritual.
                </p>
                <p>
                    El Consejo de Zúrich llamó a Bullinger. Tenía veintisiete años. Llevaba apenas dos
                    en el pastorado de Bremgarten —ciudad que tuvo que abandonar cuando la derrota de Kappel
                    la obligó a retornar al catolicismo—. Era, en todos los sentidos, un hombre joven
                    al que las circunstancias habían colocado delante de un desafío enorme.
                </p>
                <p>
                    Aceptó. Pero negoció las condiciones: el pastor principal del Grossmünster de Zúrich
                    sería elegido por la congregación, no nombrado por el gobierno de la ciudad. La autonomía
                    de la Iglesia frente al poder civil era para él un principio irrenunciable. El Consejo
                    aceptó. El 9 de diciembre de 1531, Bullinger subió al mismo púlpito donde Zuinglio había
                    predicado durante doce años.
                </p>
                <p>
                    Se quedó cuarenta y cuatro años.
                </p>
                <p>
                    La longevidad de su ministerio no fue inercia. Fue decisión constante. Recibió llamados
                    de otras ciudades, otras iglesias, otros países. Los rechazó todos. <em>"Dios me puso aquí,"</em>
                    era su respuesta habitual. Esa convicción —no la falta de oportunidades sino la fidelidad
                    deliberada al lugar asignado— es uno de los rasgos más instructivos de su carácter.
                    En una época que glorificaba los gestos heroicos, Bullinger entendió que el ministerio
                    ordinario, sostenido con excelencia durante décadas, era también una forma de heroísmo.
                </p>
            `,
        },
        {
            id: 'constructor',
            title: 'El Constructor de Puentes: Del Consensus al Credo',
            content: `
                <p>
                    La herida más profunda del protestantismo del siglo XVI no era la persecución católica;
                    era la división interna. Lutero y Zuinglio se habían separado en Marburgo por la Cena del Señor.
                    Las Iglesias luteranas y las reformadas suizas no podían celebrar la comunión juntas.
                    Era una fractura visible que sus enemigos señalaban con satisfacción.
                </p>
                <p>
                    En 1549, Bullinger y Calvino negociaron el <em>Consensus Tigurinus</em> —el Acuerdo de Zúrich—,
                    un documento que encontró lenguaje común sobre la Cena del Señor entre las tradiciones zuingliana
                    y calvinista. No era la unidad total que ambos hubieran deseado, pero era un avance real:
                    Zúrich y Ginebra podían ahora reconocerse mutuamente como Iglesias hermanas. El acuerdo fue
                    el fundamento sobre el que se construyó la tradición "reformada" como categoría distinta,
                    diferenciada tanto del luteranismo como del catolicismo.
                </p>
                <p>
                    Dieciséis años después, en 1566, Bullinger escribió solo —enfermo, creyendo que podía
                    morir en cualquier momento— la <em>Segunda Confesión Helvética</em>. No la escribió para
                    publicarla: la escribió como expresión personal de su fe, para que quedara registro
                    de lo que creía cuando ya no pudiera predicarlo. Cuando el Elector del Palatinado,
                    Federico III, le pidió permiso para publicarla como confesión de fe de su territorio,
                    Bullinger accedió sin imaginar lo que vendría.
                </p>
                <p>
                    La Segunda Confesión Helvética se convirtió en el documento confesional más ampliamente
                    adoptado de la Reforma reformada: Suiza, Escocia, Francia, Hungría, Polonia, los Países Bajos.
                    Fue la declaración más comprehensiva y madura de la teología reformada del siglo XVI,
                    escrita no en una disputa académica sino desde la convicción tranquila de un hombre
                    que había enseñado esa teología durante treinta y cinco años.
                </p>
            `,
        },
        {
            id: 'refugio',
            title: 'La Casa Abierta: El Pastor de los Perseguidos',
            content: `
                <p>
                    Cuando María Tudor subió al trono de Inglaterra en 1553 y comenzó a quemar protestantes,
                    cientos de pastores, teólogos y laicos ingleses huyeron al continente. Muchos llegaron
                    a Zúrich. Bullinger los recibió a todos.
                </p>
                <p>
                    Su casa en el Grossmünster fue, durante los cinco años del reinado de María, algo parecido
                    a una universidad en el exilio para la Reforma inglesa. Los <em>Marian Exiles</em> —los
                    exiliados marianos— estudiaron, debatieron, maduraron teológicamente en Zúrich bajo
                    la guía de Bullinger. Cuando Isabel I subió al trono en 1558 y restauró el protestantismo,
                    esos hombres regresaron a Inglaterra cargados de teología reformada suiza. Los que se habían
                    instalado en Ginebra llevaron el calvinismo más estricto; los que habían pasado por Zúrich
                    llevaron el zuinglianismo de Bullinger, más moderado en liturgia y disciplina.
                    La diferencia entre esas dos corrientes atravesaría la historia del anglicanismo y el puritanismo
                    inglés durante el siglo siguiente.
                </p>
                <p>
                    Thomas Cranmer, el arzobispo de Canterbury bajo Eduardo VI, mantuvo correspondencia constante
                    con Bullinger durante años, consultándole sobre doctrina y liturgia. La Segunda Oración Comunal
                    inglesa —el documento fundacional del anglicanismo— lleva huellas visibles de esa conversación.
                </p>
                <p>
                    La correspondencia de Bullinger es en sí misma un monumento. Doce mil cartas conservadas:
                    reyes, regentes, pastores de aldea, estudiantes, refugiados, nobles, artesanos.
                    Respondía a todos. Nadie que le escribiera con una pregunta genuina se quedaba sin respuesta.
                    Era, en la práctica, el consultor teológico de media Europa reformada.
                </p>
                <p>
                    La peste golpeó Zúrich en repetidas ocasiones durante su ministerio. Bullinger nunca huyó.
                    En 1564, la epidemia mató a su esposa Anna —con quien había tenido once hijos— y a tres
                    de sus hijas. Él sobrevivió. Nunca volvió a casarse. Siguió predicando.
                </p>
            `,
        },
        {
            id: 'legado',
            title: 'Legado: La Reforma Invisible que Sostuvo a la Visible',
            content: `
                <p>
                    Bullinger murió el 17 de septiembre de 1575, a los setenta y un años, después de haber
                    predicado en el Grossmünster hasta semanas antes de su muerte. Había servido en esa iglesia
                    durante cuarenta y cuatro años. Había visto pasar a cuatro emperadores, tres papas esenciales
                    del Concilio de Trento, el reinado de Bloody Mary, la coronación de Isabel, las guerras
                    de religión de Francia y el asesinato de miles de hugonotes en la Noche de San Bartolomé (1572).
                    Nunca había abandonado su puesto.
                </p>
                <p>
                    Su legado teológico más duradero es quizás la teología del pacto —la <em>teología federal</em>—
                    que desarrolló con más claridad que ningún reformador anterior: la historia de la redención
                    como una serie de pactos entre Dios y Su pueblo, con Cristo como el centro y cumplimiento
                    de todos ellos. Esa teología atravesaría el puritanismo inglés y llegaría hasta los Padres
                    Fundadores norteamericanos, que pensaban el gobierno civil en términos de "pacto" y "constitución"
                    aprendidos en parte de la tradición reformada suiza.
                </p>
                <p>
                    Bullinger representa un modelo de ministerio que la Iglesia necesita en cada generación
                    y que raramente recibe el reconocimiento que merece: el pastor que se queda, que predica
                    fielmente durante décadas, que escribe cartas en lugar de tratados, que abre su casa
                    a los que no tienen adónde ir, que construye puentes en lugar de levantar muros,
                    que sirve sin que nadie lo vea mucho.
                </p>
                <p>
                    Lutero encendió el fuego. Calvino le dio forma sistemática. Knox lo llevó al norte con ferocidad.
                    Bullinger lo mantuvo encendido durante cuarenta y cuatro años, en viento y en tormenta,
                    con la perseverancia tranquila del hombre que sabe que la fidelidad diaria es también,
                    a su manera, un acto heroico.
                </p>
                <p>
                    La historia lo olvidó. Dios no.
                </p>
            `,
        },
    ],

    quote: {
        text: 'La Iglesia de Dios es la congregación de los fieles llamados y reunidos del mundo; la compañía de todos los santos, es decir, de los que verdaderamente conocen y debidamente adoran y sirven al verdadero Dios en Cristo el Salvador.',
        attribution: 'Heinrich Bullinger — Segunda Confesión Helvética, 1566',
    },

    timeline: [
        { year: '1504', event: 'Nace el 18 de julio en Bremgarten, Aargau, Suiza.' },
        { year: '1519', event: 'Estudia en la Universidad de Colonia. Descubre los escritos de Lutero y los Padres de la Iglesia.' },
        { year: '1522', event: 'Regresa a Suiza. Maestro en la escuela del monasterio de Kappel. Conoce a Zuinglio.' },
        { year: '1525', event: 'El monasterio de Kappel se disuelve con la Reforma. Bullinger continúa como maestro reformado.' },
        { year: '1529', event: 'Introduce la Reforma en Bremgarten junto a su padre.' },
        { year: '1531', event: '11 de octubre: batalla de Kappel. Zuinglio muere. Bullinger es llamado a Zúrich.' },
        { year: '1531', event: '9 de diciembre: asume como pastor principal del Grossmünster. Tiene 27 años.' },
        { year: '1536', event: 'Primera Confesión Helvética, redactada en colaboración con otros reformadores suizos.' },
        { year: '1549', event: 'Consensus Tigurinus con Calvino: acuerdo sobre la Cena del Señor entre Zúrich y Ginebra.' },
        { year: '1553', event: 'María Tudor sube al trono inglés. Su casa en Zúrich se convierte en refugio de los exiliados marianos.' },
        { year: '1558', event: 'Isabel I restaura el protestantismo en Inglaterra. Los exiliados de Zúrich regresan moldeados por Bullinger.' },
        { year: '1564', event: 'La peste mata a su esposa Anna y a tres hijas. Bullinger no huye; continúa predicando.' },
        { year: '1566', event: 'Escribe solo la Segunda Confesión Helvética, adoptada por Iglesias de toda Europa reformada.' },
        { year: '1572', event: 'La Noche de San Bartolomé: masacre de hugonotes en Francia. Bullinger escribe cartas de consuelo a los sobrevivientes.' },
        { year: '1575', event: '17 de septiembre: muere en Zúrich tras 44 años de ministerio en la misma iglesia.' },
    ],
};

const Bullinger = () => (
    <BiographyTemplate
        biography={biography}
        seriesName="Reformadores"
        seriesPath="/reformadores"
    />
);

export default Bullinger;
