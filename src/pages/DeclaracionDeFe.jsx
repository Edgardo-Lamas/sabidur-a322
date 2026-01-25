import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, Cross } from 'lucide-react';
import SEO from '../components/SEO';

const doctrinas = [
    {
        id: 1,
        titulo: "El Dios verdadero",
        contenido: "Hay un solo Dios viviente y verdadero, Hacedor del cielo y de la tierra, Glorioso y Santo, y Merecedor de toda la gloria, la honra y el honor. Dios es Espíritu invisible e inteligente, que existe eternamente en tres personas: El Padre, el Hijo, y el Espíritu Santo, iguales en perfección y santidad, y llevan a cabo diferentes funciones en la obra de la creación, la providencia y la redención.",
        citas: "Génesis 1:1; 1:26; Deuteronomio 6:4; Juan 1:1-3; Mateo 28:19; Juan 4:24; Romanos 1:19-20; Efesios 4:5-6"
    },
    {
        id: 2,
        titulo: "Las Sagradas Escrituras",
        contenido: "La Santa Biblia fue escrita por hombres inspirados por el Espíritu Santo, es revelación perfecta de Dios y en sus originales no tiene error. Solo ella revela los principios según los cuales Dios nos juzgará, y es el centro verdadero de la unión cristiana y la única norma suficiente de autoridad en todo lo referente a la vida y a la piedad.",
        citas: "Proverbios 30:5-6; 2 Timoteo 3:16-17; 2 Pedro 1:20-21; Marcos 13:31; Juan 8:31-32; Juan 20:31; Hechos 20:32"
    },
    {
        id: 3,
        titulo: "La Caída del Hombre",
        contenido: "El hombre fue creado a imagen y semejanza de Dios: santo y sujeto a la ley de su Creador. Pero por su transgresión voluntaria, cayó de aquel estado santo y feliz y por ello el género humano es ahora pecador, no por fuerza, sino por voluntad propia. Por este motivo, el hombre se halla enteramente desprovisto de la santidad que requiere la ley de Dios, irresistiblemente inclinado a lo malo, y por tanto sin defensa ni disculpa bajo la justa condenación.",
        citas: "Génesis 2:17; Salmo 14:1; Romanos 3:10-12; 3:23; 6:23; Efesios 2:1"
    },
    {
        id: 4,
        titulo: "El camino de la Salvación",
        contenido: "La salvación de los pecadores es puramente gratuita y en virtud de la Obra del Señor Jesucristo. Cristo cumplió la voluntad del Padre, se hizo hombre pero sin pecado, honró la ley de Dios con su obediencia, dio plena satisfacción por nuestros pecados a través de su muerte, resucitó de entre los muertos, y desde entonces está en los cielos. El Salvador reúne en Él todas las perfecciones divinas, siendo un Salvador perfecto y compasivo. Creemos que el Evangelio ofrece a todos los hombres los bienes de la salvación, que deben aceptarlos con fe verdadera, y que es su propia perversidad y su rechazo voluntario al Evangelio el único obstáculo para su salvación.",
        citas: "Juan 3:14-16; 5:24; Romanos 5:17-19; Hechos 4:12"
    },
    {
        id: 5,
        titulo: "La Gracia de Dios",
        contenido: "La elección es el propósito eterno de Dios según el cual regenera, justifica, santifica y salva por pura Gracia a un pueblo escogido. La Gracia de Dios es tal que excluye toda jactancia y promueve toda humildad en el hombre, siendo posible conocerla al ver sus efectos en la vida de todos los que realmente reciben a Cristo, y siendo Su Gracia el firme fundamento de la seguridad cristiana.",
        citas: "Efesios 1:3-5; Romanos 8:29-30; Juan 15:16; 2 Pedro 1:10"
    },
    {
        id: 6,
        titulo: "El arrepentimiento y la fe",
        contenido: "El arrepentimiento y la fe son deberes sagrados. Éstas son gracias inseparables, labradas en el alma por el Espíritu Santo, mediante las cuales nos volvemos hacia Dios sinceramente humillados y profundamente convencidos de nuestra culpa. Confesándonos a Dios y suplicando Su misericordia reconocemos por la fe al Señor Jesucristo como Profeta, Sacerdote y Rey, en quien exclusivamente confiamos como Salvador y Señor.",
        citas: "Marcos 1:15; 1 Juan 1:9; Romanos 10:9-10"
    },
    {
        id: 7,
        titulo: "La Justificación",
        contenido: "La justificación es el gran bien que Cristo asegura a los que en Él tienen fe. Esta justificación incluye el perdón de los pecados y el don de la vida eterna. Cristo da esta justificación exclusivamente mediante la fe en Él, y no por consideración de ninguna obra de justicia que hagamos. Mediante la fe Dios gratuitamente nos imputa la justicia perfecta de Cristo que nos introduce a un estado de paz y de favor con Dios.",
        citas: "Efesios 2:8-9; Romanos 4:2-3; Romanos 5:1"
    },
    {
        id: 8,
        titulo: "La Santificación",
        contenido: "La santificación es el proceso mediante el cual se nos hace partícipes de la santidad de Dios según Su voluntad. Ésta es una obra progresiva que principia con la regeneración y que el poder del Espíritu Santo desarrolla en el corazón del creyente. Para ella el Espíritu emplea continuamente los medios señalados, sobre todo, la Palabra de Dios, el examen propio, la abnegación, la obediencia y la oración.",
        citas: "1 Pedro 1:15-16; Filipenses 2:12-13; Juan 17:17; Gálatas 5:22-25"
    },
    {
        id: 9,
        titulo: "La perseverancia de los Santos",
        contenido: "Los verdaderos regenerados, los nacidos del Espíritu, no apostatarán para perecer irremediablemente sino que permanecerán hasta el fin. Por el bien de ellos vela la Providencia especial de Dios. Su unión perseverante a Cristo es la señal notable que los distingue de los que hacen profesión de fe superficialmente.",
        citas: "Romanos 8:1; Marcos 13:13; 1 Juan 2:19; Romanos 8:38-39"
    },
    {
        id: 10,
        titulo: "La conducta cristiana",
        contenido: "Todo cristiano debe vivir para la gloria de Dios y el bien de su prójimo; su conducta debiera de ser sin mancha ante el mundo; debiera ser un fiel mayordomo de todo cuanto Dios le ha dado; y debiera de procurar para sí mismo y para otros alcanzar la estatura de la plenitud de Cristo.",
        citas: "1 Corintios 10:31; Romanos 12:1-2; Juan 14:23-24; 1 Juan 2:3-5; Colosenses 1:10; Efesios 2:8-10"
    },
    {
        id: 11,
        titulo: "Una Iglesia",
        contenido: "Una iglesia de Cristo es una agrupación de fieles bautizados y asociados mediante la fe y la comunión del Evangelio. La iglesia practica las ordenanzas de Cristo, es gobernada por las leyes del Señor, y ejerce los dones, derechos y privilegios que a ella otorga la Palabra de Dios y cuyos únicos oficiales bíblicos son los pastores (también llamados ancianos u obispos) y los diáconos.",
        citas: "Hechos 2:41-42; 46-47; Filipenses 1:1-2"
    },
    {
        id: 12,
        titulo: "Las Ordenanzas del Señor",
        contenido: "BAUTISMO: El Bautismo cristiano es la inmersión en agua del que profesa fe en Cristo, hecha en el nombre del Padre, del Hijo y del Espíritu Santo. Mediante este emblema hermoso el creyente proclama su fe en el Salvador crucificado, sepultado y resucitado, y a su vez el Señor le testifica acerca de la regeneración y perdón que tiene en Cristo, la muerte al pecado y la resurrección a nueva vida. El bautismo es un paso de compromiso y obediencia al Señor y requisito previo para los privilegios de la vida de iglesia, como por ejemplo la Cena del Señor.\n\nCENA DEL SEÑOR: La Cena del Señor es cierta provisión de pan y vino, que representan el Cuerpo y la Sangre de Cristo. De ella participan los miembros de la iglesia reunidos con éste fin, sabedores de que debe preceder a su observancia el autoexamen detenido de cada partícipe. Con la Cena del Señor el creyente conmemora la muerte de Cristo y proclama la fe que tiene en Él, mientras Dios confirma al creyente su participación en los merecimientos del sacrificio de Su Señor.",
        citas: "Mateo 28:19; Hechos 18:8; Hechos 8:36-38; Romanos 6:3-4; 1 Corintios 11:23-31"
    },
    {
        id: 13,
        titulo: "La segunda Venida del Señor",
        contenido: "Creemos en el regreso personal y visible del Señor Jesucristo a la tierra en el Día Final para juzgar a los vivos y a los muertos. Creemos en la resurrección del cuerpo, el Juicio Final, la felicidad eterna de los justos y la condenación eterna de los impíos.",
        citas: "Marcos 14:62; Mateo 16:27; Juan 14:3; Hechos 1:11; Filipenses 3:20; Tito 2:13; 1 Corintios 15:51-53"
    },
    {
        id: 14,
        titulo: "El juicio final",
        contenido: "Hay una diferencia radical y esencial entre los justos y los impíos, y a ojos de Dios no hay justos verdaderos aparte de los regenerados. Éstos han sido justificados mediante la fe en Jesucristo, y santificados por el Espíritu Divino. A ojos de Dios, son impíos cuantos sigan impenitentes e incrédulos. Esta diferencia es permanente entre unos y otros después de la muerte, ante el Trono del Juez en el Día Final.",
        citas: "2 Timoteo 4:1; 1 Corintios 4:5; 2 Tesalonicenses 1:6-9; Apocalipsis 20:11-15"
    }
];

const AccordionItem = ({ doctrina, isOpen, onClick, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border-b border-sabiduria-gold/20 last:border-b-0"
        >
            <button
                onClick={onClick}
                className="w-full py-6 px-4 flex items-center justify-between text-left group hover:bg-sabiduria-navy/5 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sabiduria-gold/10 text-sabiduria-gold text-sm font-bold flex items-center justify-center">
                        {doctrina.id}
                    </span>
                    <h3 className="text-lg md:text-xl font-serif font-bold text-sabiduria-navy group-hover:text-sabiduria-gold transition-colors">
                        {doctrina.titulo}
                    </h3>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                >
                    <ChevronDown className="w-5 h-5 text-sabiduria-gold" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-6 pl-16">
                            <p className="text-sabiduria-navy/80 leading-relaxed whitespace-pre-line mb-4">
                                {doctrina.contenido}
                            </p>
                            <div className="flex items-start gap-2 text-sm">
                                <BookOpen className="w-4 h-4 text-sabiduria-gold flex-shrink-0 mt-0.5" />
                                <p className="text-sabiduria-gold/80 italic">
                                    {doctrina.citas}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const DeclaracionDeFe = () => {
    const [openItems, setOpenItems] = useState(new Set([1])); // First item open by default

    const toggleItem = (id) => {
        setOpenItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const expandAll = () => {
        setOpenItems(new Set(doctrinas.map(d => d.id)));
    };

    const collapseAll = () => {
        setOpenItems(new Set());
    };

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title="Declaración de Fe | Sabiduría para el Corazón"
                description="Declaración de Fe basada en la doctrina histórica reformada. Los 14 puntos fundamentales que definen nuestra identidad doctrinal."
            />

            {/* Hero Institucional */}
            <section className="relative bg-sabiduria-navy overflow-hidden">
                {/* Background con textura */}
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-8"
                        style={{
                            backgroundImage: `url(${import.meta.env.BASE_URL}img/fondo-declaracion-fe.jpg)`,
                            filter: 'blur(4px) grayscale(30%)'
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-sabiduria-navy via-sabiduria-navy/95 to-sabiduria-navy" />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Icono decorativo */}
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sabiduria-gold/10 border border-sabiduria-gold/30 mb-6">
                            <Cross className="w-8 h-8 text-sabiduria-gold" />
                        </div>

                        <span className="block text-sabiduria-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">
                            Nuestros Fundamentos Doctrinales
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
                            Declaración de Fe
                        </h1>

                        <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                            Basada en la doctrina histórica reformada y alineada con la confesión de nuestra iglesia local.
                            Estos 14 puntos fundamentales definen nuestra identidad doctrinal y la fe que profesamos.
                        </p>
                    </motion.div>
                </div>

                {/* Línea decorativa */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sabiduria-gold/50 to-transparent" />
            </section>

            {/* Contenido Principal */}
            <section className="py-16 lg:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Controles */}
                    <div className="flex justify-end gap-4 mb-8">
                        <button
                            onClick={expandAll}
                            className="text-sm text-sabiduria-gold hover:text-sabiduria-navy transition-colors font-medium"
                        >
                            Expandir todo
                        </button>
                        <span className="text-sabiduria-gray">|</span>
                        <button
                            onClick={collapseAll}
                            className="text-sm text-sabiduria-gold hover:text-sabiduria-navy transition-colors font-medium"
                        >
                            Contraer todo
                        </button>
                    </div>

                    {/* Acordeón de Doctrinas */}
                    <div className="bg-white rounded-sm shadow-lg border border-sabiduria-gray/10 overflow-hidden">
                        {doctrinas.map((doctrina, index) => (
                            <AccordionItem
                                key={doctrina.id}
                                doctrina={doctrina}
                                isOpen={openItems.has(doctrina.id)}
                                onClick={() => toggleItem(doctrina.id)}
                                index={index}
                            />
                        ))}
                    </div>

                    {/* Nota al pie */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 p-6 bg-sabiduria-navy/5 rounded-sm border-l-4 border-sabiduria-gold"
                    >
                        <p className="text-sm text-sabiduria-navy/70 leading-relaxed">
                            <strong className="text-sabiduria-navy">Nota:</strong> Esta Declaración de Fe refleja explícitamente
                            la identidad doctrinal de nuestro ministerio y su alineación con la iglesia local.
                            Respetamos el orden y contenido establecido en la confesión original,
                            sin modificar la estructura teológica ni el marco doctrinal histórico.
                        </p>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default DeclaracionDeFe;
