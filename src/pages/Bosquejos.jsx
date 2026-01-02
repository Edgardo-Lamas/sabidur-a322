import React from 'react';
import { FileText, Download } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const bosquejos = [
    {
        id: 1,
        title: 'La diferencia entre leer la Biblia y entenderla',
        description: 'Un recorrido por la importancia de la comprensión profunda de las Escrituras.',
        file: 'Bosquejos & Guias/la_diferencia_entre_leeer_la_Biblia_y_entenderla.pdf',
    },
    {
        id: 2,
        title: 'La palabra de Dios y la vida cotidiana',
        description: 'Cómo integrar la Palabra en cada aspecto de nuestra vida diaria.',
        file: 'Bosquejos & Guias/La_palabra_de_Dios_y_la_vida_cotidiana.pdf',
    },
    {
        id: 3,
        title: 'Cuando la fe se vuelve costumbre',
        description: 'Reflexión sobre el peligro de la rutina espiritual y cómo renovar nuestra fe.',
        file: 'Bosquejos & Guias/Cuando_la_Fe_se_vuelve_costumbre.pdf',
    },
    {
        id: 4,
        title: 'Discernir en tiempos de muchas voces',
        description: 'Herramientas bíblicas para distinguir la verdad en medio del ruido.',
        file: 'Bosquejos & Guias/Discernir_en_tiempos_de_muchas_voces.pdf',
    },
    {
        id: 5,
        title: 'Por qué es importante pensar bien lo que creo',
        description: 'La relación entre fe y pensamiento crítico fundamentado en la Escritura.',
        file: 'Bosquejos & Guias/porque_es_importante_pensar_bien_lo_que_creo.pdf',
    },
];

const Bosquejos = () => {
    return (
        <main className="bg-sabiduria-bg min-h-screen py-8 md:py-16">
            <SEO
                title="Bosquejos & Guías"
                description="Textos estructurados para acompañar el estudio personal y la reflexión comunitaria."
                url="/bosquejos"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs />

                {/* Header */}
                <div className="mb-16 border-b border-sabiduria-gray/10 pb-12 mt-8">
                    <h1 className="text-4xl md:text-5xl font-serif text-sabiduria-navy mb-8">
                        Bosquejos & Guías
                    </h1>
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Text - Left Side */}
                        <div className="text-lg text-sabiduria-gray leading-relaxed space-y-4 md:w-1/2 text-justify">
                            <p>
                                Bosquejos & Guías reúne textos pensados para acompañar el estudio personal y la reflexión comunitaria.
                            </p>
                            <p>
                                No buscan agotar los temas, sino ofrecer una estructura clara que ayude a leer, pensar y profundizar con calma.
                            </p>
                            <p>
                                Cada bosquejo propone un recorrido sencillo por la Escritura, invitando a detenerse, discernir y aplicar lo aprendido a la vida diaria.
                            </p>
                        </div>
                        {/* Image - Right Side */}
                        <div className="md:w-1/2">
                            <img
                                src={`${import.meta.env.BASE_URL}Bosquejos & Guias/bosquejos-hero..png`}
                                alt="Estudiante de la Biblia"
                                className="w-full h-auto object-cover shadow-md"
                            />
                        </div>
                    </div>
                </div>

                {/* Bosquejos List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {bosquejos.map((bosquejo) => (
                        <article
                            key={bosquejo.id}
                            className="group bg-white p-8 border border-sabiduria-gray/5 hover:border-sabiduria-gold/20 transition-all shadow-sm"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-sabiduria-gold/10 flex items-center justify-center">
                                    <FileText className="text-sabiduria-gold" size={24} />
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-xl font-serif text-sabiduria-navy group-hover:text-sabiduria-gold transition-colors leading-tight mb-2">
                                        {bosquejo.title}
                                    </h2>
                                    <p className="text-sabiduria-gray text-sm leading-relaxed mb-4">
                                        {bosquejo.description}
                                    </p>
                                    <a
                                        href={`${import.meta.env.BASE_URL}${bosquejo.file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sabiduria-navy font-bold text-sm uppercase tracking-widest hover:text-sabiduria-gold transition-colors"
                                    >
                                        <Download size={16} />
                                        Descargar PDF
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Bosquejos;
