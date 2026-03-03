import { Link } from 'react-router-dom';
import { ArrowLeft, Download, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const sections = [
    { id: 'c1-s1', title: '1. Dios no solo ama. Dios es Amor.' },
    { id: 'c1-s2', title: '2. Antes de la creación: el amor eterno en la Trinidad' },
    { id: 'c1-s3', title: '3. ¿Qué es, exactamente, «el bien»?' },
    { id: 'c1-s4', title: '4. La cruz: donde el amor y la justicia se abrazan' },
    { id: 'c1-s5', title: '5. ¿Cuándo la corrección es amor? ¿Cuál es mi límite?' },
    { id: 'c1-s6', title: '6. El amor que disciplina' },
    { id: 'c1-s7', title: '7. El amor que transforma' },
    { id: 'c1-s8', title: '8. ¿Qué amor necesito?' },
    { id: 'c1-conclusion', title: '9. Conclusión' },
];

const PerfeccionesCapitulo1 = () => {
    const handleDownloadPDF = () => {
        window.print();
    };

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title="El Amor — Las Perfecciones de Dios · Capítulo 1"
                description="¿Qué significa que Dios sea amor? El primer capítulo explora el amor como perfección eterna, su raíz trinitaria, su manifestación en la cruz y su obra transformadora en el creyente."
                url="/estudio/perfecciones-de-dios/capitulo-1"
            />
            <div className="max-w-4xl mx-auto px-4 pt-8">
                <Breadcrumbs title="El Amor — Capítulo 1" />
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">

                {/* Header del capítulo */}
                <header className="mb-12 pb-8 border-b border-sabiduria-gray/20">
                    <Link
                        to="/estudio/perfecciones-de-dios"
                        className="inline-flex items-center gap-2 text-sabiduria-gold text-sm font-bold uppercase tracking-widest mb-6 hover:opacity-75 transition-opacity"
                    >
                        Las Perfecciones de Dios · Capítulo 1 de 14
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-serif text-sabiduria-navy mb-3 leading-tight">
                        El Amor
                    </h1>
                    <p className="text-2xl font-serif text-sabiduria-gold">
                        La Primera Perfección de Dios
                    </p>
                </header>

                {/* Botón PDF */}
                <div className="flex justify-end mb-8 print:hidden">
                    <button onClick={handleDownloadPDF} className="btn-pdf-discrete flex items-center gap-2">
                        <Download size={16} /> Descargar PDF
                    </button>
                </div>

                {/* Índice */}
                <nav className="bg-white p-6 mb-14 border border-sabiduria-gray/10 shadow-sm print:hidden">
                    <h2 className="text-base font-serif text-sabiduria-navy mb-4 flex items-center gap-2 font-semibold">
                        <BookOpen size={18} className="text-sabiduria-gold" /> Contenido de este capítulo
                    </h2>
                    <ul className="space-y-1.5 text-sm">
                        {sections.map(s => (
                            <li key={s.id}>
                                <a href={`#${s.id}`} className="text-sabiduria-gray hover:text-sabiduria-gold transition-colors">
                                    {s.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Contenido */}
                <article className="mb-16">

                    <div id="c1-s1" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            1. Dios no solo ama. Dios es Amor.
                        </h2>
                        <div className="teologia-content">
                            <p>Hay afirmaciones que parecen sencillas pero que, en cuanto uno se detiene a mirarlas de frente, revelan una profundidad que no tiene fondo. "Dios es amor" es una de ellas. El apóstol Juan no escribe que Dios tiene amor, ni que Dios ama de vez en cuando, ni que el amor es uno de Sus atributos decorativos. Juan escribe que Dios <em>es</em> amor. Eso no describe una actividad de Dios. Describe Su naturaleza misma.</p>
                            <p>Sin embargo, hay que leer esa declaración con mucho cuidado, porque el idioma original importa. El versículo no dice "el amor es Dios". La ausencia del artículo antes de "amor" en el griego original no es accidental: hace imposible invertir la frase. Dios es amor; pero el amor no es Dios. Si lo invertimos, destruimos al Dios personal de la Escritura y lo reemplazamos con un concepto abstracto que cada quien puede definir a su gusto. Y eso, justamente, es lo que hace la cultura moderna. Convierte al amor en un ídolo sin forma, sin carácter, sin exigencia, y luego dice que ese ídolo es Dios.</p>
                            <p>El amor no es una emoción suelta que le ocurre a Dios cuando está de buen humor. Es la perfección eterna de Su ser, la manera misma en que Dios existe. Y aquí hay algo que los estudiantes de teología necesitan captar desde el principio: Dios es absolutamente simple. Eso no significa que sea sencillo de comprender. Significa que en Dios no hay partes que compitan entre sí. Sus atributos no se pelean. El amor no le gana a la justicia en un día y la justicia le gana al amor en otro. No. Dios ama santamente, y ama justamente. Cuando Él ama, simplemente está siendo Él mismo.</p>
                            <p>Esto nos lleva directamente a la frase que va a ser la brújula de todo este capítulo y de toda esta serie:</p>
                            <blockquote>Amar no es hacer sentir bien a una persona. Es conducirla —y conducirnos— hacia el bien que Dios define.</blockquote>
                        </div>
                    </div>

                    <div id="c1-s2" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            2. Antes de la creación: el amor eterno en la Trinidad
                        </h2>
                        <div className="teologia-content">
                            <p>Aquí hay algo que pocos se detienen a contemplar, pero que cambia todo. Si Dios es amor desde la eternidad, ¿a quién amaba antes de que existiera el universo? Antes de que hubiera estrellas, antes de que hubiera tiempo, antes de que hubiera una sola criatura a quien amar, ¿qué estaba haciendo Dios con ese amor infinito que es parte de Su naturaleza?</p>
                            <p>La respuesta está en la naturaleza trinitaria de Dios. En Juan 17:24, Jesús está orando al Padre en la víspera de Su crucifixión, y dice algo que debería detenernos en seco: <em>"Padre, porque me has amado desde antes de la fundación del mundo."</em> No dice "desde que empezaste a amarme". Dice desde antes de la fundación del mundo. El amor entre el Padre y el Hijo no comenzó cuando comenzó la creación. Es eterno. Es anterior a todo lo que existe.</p>
                            <p>El Padre ama al Hijo. El Hijo ama al Padre. El Espíritu Santo es, en sí mismo, el vínculo vivo de esa comunión perfecta. Antes de que existiera una sola criatura, ya había amor perfecto, pleno, eterno y desbordante en la vida íntima de Dios. La Trinidad no es un dato teológico difícil de memorizar para un examen. Es la razón por la que podemos decir que Dios es amor de manera absoluta y eterna, sin contradicción.</p>
                            <p>Esto tiene una consecuencia pastoral enorme, y quiero que la sientan bien. Dios no nos necesitó para aprender a amar. No creó el mundo porque estaba solo y necesitaba compañía. No nos hizo porque tenía un déficit afectivo que llenar. Dios creó desde la plenitud desbordante de Su amor, no desde el vacío. Y cuando ese amor se derrama hacia nosotros, no es algo nuevo que Dios inventó para la ocasión. Es la misma corriente eterna que ha fluido entre el Padre y el Hijo desde siempre, y que ahora, por pura gracia soberana, nos envuelve a nosotros también.</p>
                            <p>No somos el objeto primario del amor divino. Somos invitados —con una gracia que no merecemos ni podemos explicar del todo— a participar en un amor que existía mucho antes de que nosotros existiéramos.</p>
                        </div>
                    </div>

                    <div id="c1-s3" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            3. ¿Qué es, exactamente, «el bien»?
                        </h2>
                        <div className="teologia-content">
                            <p>La definición clásica de amor en teología sistemática dice algo preciso: el amor busca el bien del objeto amado. Es una definición sólida, teológicamente correcta. Pero en cuanto uno la acepta, aparece la pregunta que lo define todo: ¿cómo se define el bien?</p>
                            <p>No es una pregunta retórica ni filosófica en abstracto. Es la pregunta más práctica de la vida cristiana, porque de cómo respondamos esto depende absolutamente todo lo que hagamos en nombre del amor.</p>
                            <p>Si el bien lo define la cultura, entonces amar significa aprobar lo que la persona quiere, validar sus decisiones, apoyar sus deseos sin cuestionarlos. Si el bien lo define la emoción, entonces amar significa hacer sentir a alguien lo mejor posible en este momento, aunque ese bienestar inmediato sea destructivo a largo plazo. Si el bien lo define el instinto personal de cada uno, entonces corregir a alguien nunca puede ser un acto de amor, porque la corrección molesta, incomoda, duele.</p>
                            <p>La Biblia subvierte todos esos supuestos de raíz. El bien no lo define la criatura. Lo define el Creador. Y el Creador no lo dejó en el misterio; lo reveló con claridad meridiana en Su Palabra.</p>
                            <p>Romanos 8:28 es uno de los versículos más citados de toda la Biblia. "Sabemos que a los que aman a Dios, todas las cosas les ayudan a bien." Casi todos lo conocen. Pero ese versículo tiene un versículo 29 que casi nunca se menciona junto a él, y que es absolutamente indispensable para entender qué significa ese "bien". El versículo 29 dice: <em>"Porque a los que antes conoció, también los predestinó para que fuesen hechos conformes a la imagen de su Hijo."</em></p>
                            <p>¿Ven la conexión? El "bien" que Dios obra no es necesariamente éxito profesional, ni salud permanente, ni ausencia de sufrimiento, ni que todo salga según nuestros planes. El bien supremo que Dios persigue con amor absoluto e inquebrantable es nuestra conformidad a la imagen de Cristo. Ser transformados a Su semejanza. Parecernos más a Jesús. Eso es el bien. Todo lo demás —incluyendo las pruebas, las aflicciones, las pérdidas, los fracasos— es instrumental respecto a ese fin eterno.</p>
                            <p>Esto cambia radicalmente la manera en que entendemos el amor. Amar a alguien no es querer que nunca sufra. Amar a alguien es querer que crezca, que madure, que sea más libre del pecado, que se parezca más a Cristo. A veces eso implica una conversación incómoda. A veces implica no dar lo que la persona pide, sino lo que la persona necesita. A veces implica mantenerse firme cuando sería más fácil ceder. El amor que siempre dice sí no es amor divino. Es condescendencia que, en último término, daña profundamente.</p>
                        </div>
                    </div>

                    <div id="c1-s4" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            4. La cruz: donde el amor y la justicia se abrazan
                        </h2>
                        <div className="teologia-content">
                            <p>Si queremos entender el amor de Dios en su máxima expresión, no podemos quedarnos en la teoría. Tenemos que ir al lugar donde ese amor se hizo visible, tangible, histórico, irreversible. Tenemos que ir a la cruz de Jesucristo.</p>
                            <blockquote>"Mas Dios muestra su amor para con nosotros, en que siendo aún pecadores, Cristo murió por nosotros." — <em>Romanos 5:8</em></blockquote>
                            <p>Este versículo destruye, de un solo golpe, toda versión sentimental del amor divino. Dios no mostró Su amor diciéndonos que nos apreciaba. No mostró Su amor enviando un mensaje de aliento. No mostró Su amor en un gesto simbólico. Mostró Su amor entregando a Su propio Hijo —la Segunda Persona de la Trinidad, coigual y coeterno con el Padre— para que muriera en el lugar de pecadores que no lo merecían en ninguna manera, bajo ningún estándar, en ninguna dimensión posible.</p>
                            <p>La cruz no fue una demostración pedagógica diseñada para inspirar emociones morales en los seres humanos. Eso es lo que enseñan ciertas corrientes teológicas liberales, y es profundamente insuficiente. La cruz fue una satisfacción objetiva, real, histórica, de las demandas de la justicia divina.</p>
                            <h4>El amor que no anuló la justicia</h4>
                            <p>Aquí hay que ser teológicamente muy precisos, porque esto es el corazón del evangelio. El amor de Dios no anuló Su justicia. No flexibilizó Su santidad para poder perdonar. No hizo la vista gorda ante el pecado porque tenía demasiado afecto por la humanidad. La santidad de Dios exige, sin ninguna excepción, que el pecado sea juzgado. Que sea castigado. Que sea retribuido. No porque Dios sea cruel, sino porque Dios es absolutamente puro, y lo impuro no puede simplemente ser ignorado en Su presencia.</p>
                            <p>Entonces ¿cómo puede Dios amar a pecadores? Aquí está la respuesta, y es la más hermosa del universo: el amor de Dios proveyó al Sustituto perfecto. Cristo tomó nuestro lugar. La culpa nuestra le fue imputada a Él. Él sufrió la ira que nosotros merecíamos. Él fue abandonado para que nosotros nunca lo fuéramos. Y así, en la cruz, el amor y la justicia no compiten, no negocian, no se hacen concesiones mutuamente. Se abrazan. Dios puede ser, al mismo tiempo, absolutamente justo y misericordiosamente justificador del pecador que pone su fe en Cristo.</p>
                            <p>Este punto tiene una implicación directa para entender qué es el amor: un amor que ignora el pecado, que lo minimiza, que lo llama de otra manera para no incomodar, no es amor divino. Es abandono disfrazado de tolerancia. El amor real confronta el mal porque sabe exactamente lo que el mal cuesta. Lo vio en la cruz.</p>
                        </div>
                    </div>

                    <div id="c1-s5" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            5. ¿Cuándo la corrección es amor? ¿Cuál es mi límite?
                        </h2>
                        <div className="teologia-content">
                            <p>Llegamos aquí a las preguntas más difíciles de todo el capítulo, porque son las más personales, las que más rozan la vida real de cada creyente. Uno puede aceptar en abstracto que "el amor corrige". Pero ¿cómo sé yo, en la práctica concreta de mi vida, que lo que estoy queriendo hacer es corrección justa y necesaria, y no simplemente mi voluntad, mi irritación, mi criterio personal imponiéndose sobre otro bajo el pretexto del amor?</p>
                            <p>Y hay una asimetría que necesitamos reconocer honestamente: Dios puede disciplinar con perfección absoluta porque es omnisciente, conoce completamente todos los factores, todas las motivaciones, todas las consecuencias. Es perfectamente justo. Es absolutamente santo. Yo no soy nada de eso. Yo soy un creyente en proceso de santificación, con puntos ciegos, con sesgos, con pecados propios que no siempre veo claramente. ¿Cuál es entonces mi límite? ¿De dónde sale la autoridad para actuar "en amor"?</p>
                            <p>La respuesta más honesta, más liberadora y más humillante a la vez es esta: la autoridad del creyente para corregir no proviene de su personalidad fuerte, ni de su posición en la iglesia o en la familia, ni de su convicción interior de tener razón. Proviene exclusivamente de la Palabra revelada de Dios.</p>
                            <blockquote>"Hermanos, si alguno fuere sorprendido en alguna falta, vosotros que sois espirituales, restauradle con espíritu de mansedumbre, considerándote a ti mismo, no sea que tú también seas tentado." — <em>Gálatas 6:1</em></blockquote>
                            <p>Detengámonos a examinar la arquitectura de este versículo, porque cada palabra importa. El sujeto no es "vosotros que tenéis razón". Es "vosotros que sois espirituales", lo cual apunta directamente a los que caminan en el Espíritu. La acción no es "juzgad", ni "exponed". Es "restaurad", que implica un proceso cuidadoso, delicado, como el que hace un cirujano cuando reubica un hueso fracturado. El instrumento es "espíritu de mansedumbre". Y la advertencia final no apunta hacia el otro sino hacia uno mismo.</p>
                            <h4>Las cuatro características de la corrección bíblica</h4>
                            <ul>
                                <li><strong>Humildad:</strong> no actúas desde una posición de superioridad moral sino desde la conciencia clara de tu propia fragilidad y necesidad de gracia.</li>
                                <li><strong>Restauración:</strong> tu objetivo real es sanar al hermano, no tener razón, no vindicarte, no demostrar nada.</li>
                                <li><strong>Verdad:</strong> tu corrección está anclada en lo que la Escritura dice claramente, no en tu opinión personal ni en tus preferencias.</li>
                                <li><strong>Mansedumbre:</strong> el tono, el momento y la actitud importan tanto como las palabras mismas.</li>
                            </ul>
                            <p>Y hay algo más que necesitamos decir con honestidad pastoral: a veces la acción más amorosa que puedes tomar es reconocer que no eres tú la persona indicada para hacer esa corrección en ese momento. El amor que se aparta de la verdad deja de ser amor bíblico. Pero el amor que usa la verdad como arma para herir deja de ser amor bíblico también.</p>
                        </div>
                    </div>

                    <div id="c1-s6" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            6. El amor que disciplina: la prueba más contraintuitiva del amor divino
                        </h2>
                        <div className="teologia-content">
                            <p>Uno de los puntos más pastoralmente necesarios de este estudio es también uno de los más difíciles de recibir, especialmente en una cultura que equipara el amor con el confort permanente. La verdad es esta: el sufrimiento, en la vida del creyente, es con frecuencia una expresión directa del amor paternal de Dios, no una ausencia de él.</p>
                            <blockquote>"Porque el Señor al que ama, disciplina, y azota a todo el que recibe por hijo." — <em>Hebreos 12:6</em></blockquote>
                            <h4>Castigo judicial versus disciplina paternal</h4>
                            <p>Para entender esto bien, necesitamos hacer una distinción teológica fundamental. El <strong>castigo judicial</strong> es la consecuencia de la ira retributiva de Dios sobre el pecado no perdonado. Cristo absorbió ese castigo judicial de manera completa, total, irreversible por el creyente en la cruz. Por eso Pablo puede decir en Romanos 8:1: "Ahora pues, ninguna condenación hay para los que están en Cristo Jesús."</p>
                            <p>La <strong>disciplina paternal</strong> es algo completamente diferente. Es la corrección que un padre que ama profundamente a su hijo aplica no para destruirlo sino para formarlo. No procede de la ira condenatoria; procede del amor formativo. No tiene como propósito aplastarlo sino purificarlo. Es el proceso mediante el cual Dios trabaja en nosotros las pruebas, las aflicciones, las pérdidas, las resistencias, para ir conformándonos más y más a la imagen de Su Hijo.</p>
                            <p>Por eso el escritor de Hebreos puede decir algo que, en la superficie, suena paradójico: si Dios no te disciplina, si tu vida cristiana transcurre sin ninguna prueba, eso no sería señal de que eres el favorito de Dios. Sería señal de que no eres Su hijo.</p>
                            <p>Un amor que nunca corrige, que nunca incomoda, que siempre aprueba y valida sin importar la condición espiritual real de la persona, no es amor divino. Es abandono con apariencia amable. Dios nos ama demasiado como para dejarnos estancados en la inmadurez espiritual. El amor de Dios no es amor de consumidor que te da lo que pides. Es amor de padre que te da lo que necesitas.</p>
                        </div>
                    </div>

                    <div id="c1-s7" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            7. El amor que transforma: la semilla que fue plantada en ti
                        </h2>
                        <div className="teologia-content">
                            <p>Hasta aquí hemos hablado del amor de Dios como atributo divino, como realidad trinitaria, como manifestación en la cruz, como disciplina paternal. Pero ahora llegamos a la pregunta que tiene nombre y apellido, la que más toca la vida del creyente cotidianamente: ¿qué hace ese amor dentro de mí?</p>
                            <blockquote>"Y la esperanza no avergüenza; porque el amor de Dios ha sido derramado en nuestros corazones por el Espíritu Santo que nos fue dado." — <em>Romanos 5:5</em></blockquote>
                            <p>La regeneración —el nuevo nacimiento— no es una reforma de conducta. No es que Dios mira a una persona, ve que está haciendo un esfuerzo razonable por mejorar, y decide darle una mano para que lo logre. La regeneración es una implantación. Es una obra soberana, inmediata, sobrenatural del Espíritu Santo que toma un corazón muerto y lo resucita. Ezequiel 36:26 lo profetizó siglos antes: <em>"Os daré corazón nuevo, y pondré espíritu nuevo dentro de vosotros; y quitaré de vuestra carne el corazón de piedra, y os daré corazón de carne."</em></p>
                            <p>El Espíritu Santo derrama el amor de Dios en el corazón del creyente. Hay algo nuevo que fue plantado adentro. Una semilla de amor que antes no estaba, que no podría haber estado porque el corazón natural del ser humano es, por defecto, inclinado hacia sí mismo. Y ahora esa semilla existe, vive, late, porque Dios mismo la puso.</p>
                            <h4>La obediencia que nace del amor transformado</h4>
                            <p>Esto transforma profundamente la naturaleza de la obediencia cristiana. El creyente regenerado no obedece por miedo al castigo, como un esclavo que todo el tiempo está calculando qué consecuencias tendrá si se equivoca. Obedece porque sus afectos más profundos han sido cambiados. Comienza a amar lo que antes rechazaba: la verdad, la santidad, la honestidad delante de Dios, el bien definido por Dios.</p>
                            <p>Sin embargo —y esto es crucial para no caer en un espiritualismo ingenuo— esa semilla necesita crecer. El amor es fruto del Espíritu, dice Gálatas 5:22. El fruto no aparece instantáneamente. No madura de la noche a la mañana. Requiere tiempo, requiere el proceso de la mortificación del ego, requiere la renovación constante de la mente a través de la Escritura, requiere sumisión continua al Espíritu. El creyente que pretende amar con amor sobrenatural mientras descuida la comunión real con Dios en oración y en la Palabra, está intentando cosechar en un campo donde no ha sembrado nada.</p>
                        </div>
                    </div>

                    <div id="c1-s8" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            8. ¿Qué amor necesito? No basta el amor humano.
                        </h2>
                        <div className="teologia-content">
                            <p>Esta es la pregunta que cierra el círculo y amarra todo lo que hemos visto. Después de recorrer todo este camino —la naturaleza del amor divino, su eternidad trinitaria, su manifestación en la cruz, su expresión en la disciplina, su obra transformadora en el creyente— queda claro que el amor que el creyente necesita para vivir la vida cristiana real no puede ser fabricado con disciplina humana, ni con buena voluntad, ni con determinación personal.</p>
                            <p>El amor humano, en su mejor versión, es incompleto. Es reactivo: responde a lo que recibe. Es mutable: cambia según el estado emocional, según las circunstancias, según si fue correspondido o no. Está mezclado casi inevitablemente con algún grado de interés propio. Se agota. Se cansa. Falla precisamente en los momentos en que más se necesita.</p>
                            <p>El creyente necesita el amor de Dios fluyendo <em>a través</em> de él. No el amor que él produce para Dios como resultado de su esfuerzo espiritual, sino el amor que Dios mismo produce en él por medio del Espíritu Santo. La diferencia entre esas dos cosas no es pequeña ni sutil. Es la diferencia fundamental entre la religión y la vida cristiana genuina. La religión es el esfuerzo humano por alcanzar a Dios. La vida cristiana es la vida de Dios fluyendo a través de una persona que se ha rendido a Él.</p>
                            <p>No necesitamos un amor moldeado por la cultura, que define amar como no incomodar a nadie, como validar todo, como mantener la paz a cualquier costo aunque ese costo sea la verdad. No necesitamos un amor que valide el pecado ajeno con el nombre de "compasión" y que llame dureza a la fidelidad bíblica.</p>
                            <p>Necesitamos el amor que fluye de la verdad revelada. El amor que el Espíritu Santo produce en nosotros cuando nos sometemos a Su obra. El amor que no busca ganar discusiones sino ganar al hermano. El que no busca imponerse sino edificar. El que no busca ser reconocido sino servir con fidelidad aunque nadie lo vea.</p>
                            <p>Y cuando el creyente empieza a operar desde ese amor —ese amor producido por el Espíritu, anclado en la verdad, orientado hacia el bien que Dios define— algo en él cambia de manera profunda y duradera. Aprende a callar cuando hablar sería orgullo. Aprende a hablar cuando callar sería cobardía. Aprende a soportar el sufrimiento no como una injusticia cósmica sino como un instrumento en las manos de un Padre que lo ama.</p>
                        </div>
                    </div>

                    <div id="c1-conclusion" className="mb-14 scroll-mt-24">
                        <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 pb-3 border-b border-sabiduria-gray/20">
                            9. Conclusión
                        </h2>
                        <div className="teologia-content">
                            <p>El amor, entonces, deja de ser una emoción inestable que sube y baja según las circunstancias, y se convierte en una expresión consciente, deliberada, costosa de obediencia a Dios.</p>
                            <blockquote>
                                Amar no es hacer sentir bien a una persona.<br />
                                Es conducirla —y conducirnos— hacia el bien que Dios define.<br />
                                Y ese bien, siempre, en todo momento, en toda circunstancia, es la semejanza a Cristo.
                            </blockquote>
                            <p>Esta frase es la brújula de toda esta serie. Cada perfección de Dios que estudiaremos juntos en los próximos capítulos nos llevará al mismo destino: conocer al Dios verdadero, al Dios que se ha revelado en Su Palabra y en Su Hijo, y ser transformados —lentamente, fielmente, por la gracia que no merece ni la pausa— a Su imagen.</p>
                            <p className="text-sm text-sabiduria-gray text-center mt-10">Serie: Las Perfecciones de Dios · Capítulo 1 de 14 · Sabiduría para el Corazón</p>
                        </div>
                    </div>

                </article>

                {/* Navegación entre capítulos */}
                <div className="pt-8 border-t border-sabiduria-gray/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <Link
                        to="/estudio/perfecciones-de-dios"
                        className="inline-flex items-center gap-2 text-sabiduria-navy hover:text-sabiduria-gold font-medium transition-colors"
                    >
                        <ArrowLeft size={18} /> Volver a la serie
                    </Link>
                    <div className="text-sm text-sabiduria-gray italic">
                        Capítulo 2 — Próximamente
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PerfeccionesCapitulo1;
