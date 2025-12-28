import React from 'react';
import SEO from '../components/SEO';
import { Heart, CreditCard } from 'lucide-react';

const Donations = () => {
    return (
        <main className="bg-sabiduria-bg min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <SEO
                title="Donaciones"
                description="Apoya la difusión de la Sana Doctrina y el ministerio de Sabiduría para el Corazón."
                url="/donaciones"
            />

            <div className="max-w-3xl mx-auto text-center">
                {/* Header */}
                <div className="mb-12">
                    <span className="text-sabiduria-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                        Colabora con el Ministerio
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-sabiduria-navy mb-6">
                        Apoya la difusión de la Sana Doctrina
                    </h1>
                    <div className="w-24 h-1 bg-sabiduria-gold mx-auto rounded-full opacity-50"></div>
                </div>

                {/* Introduction */}
                <div className="prose prose-lg max-w-none text-sabiduria-gray mb-12">
                    <p className="font-sans text-lg md:text-xl leading-relaxed">
                        En Sabiduría para el Corazón, nuestra misión es clara: proveer recursos teológicos de alta calidad, exégesis bíblica rigurosa y materiales de estudio gratuitos para la edificación del cuerpo de Cristo. Creemos firmemente que el acceso a la profundidad de las Escrituras debe estar disponible para todo creyente, sin barreras.
                    </p>
                </div>

                {/* Body Content */}
                <div className="bg-white p-8 md:p-12 shadow-sm border border-sabiduria-gray/5 mb-12 rounded-sm">
                    <p className="font-sans text-sabiduria-navy/80 text-lg leading-relaxed mb-8 text-left">
                        Mantener esta plataforma, la investigación para los estudios, la producción de video y la creación de bosquejos descargables requiere de tiempo y recursos técnicos. Tu generosidad nos permite sostener este ministerio y expandir el alcance de estas enseñanzas a más personas de habla hispana en todo el mundo.
                    </p>

                    <blockquote className="border-l-4 border-sabiduria-gold pl-6 py-2 my-8 italic text-sabiduria-navy font-serif text-xl text-left bg-transparent">
                        "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre"
                        <footer className="text-sm font-sans font-bold text-sabiduria-gold mt-2 not-italic uppercase tracking-widest">
                            — 2 Corintios 9:7
                        </footer>
                    </blockquote>

                    <p className="font-sans text-sabiduria-navy/80 text-lg leading-relaxed mb-0 text-left">
                        Al ofrendar, te conviertes en un colaborador directo de este esfuerzo por enseñar la Verdad con fidelidad.
                    </p>
                </div>

                {/* Donation Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                    <a
                        href="https://www.paypal.com/donate" // Placeholder URL
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto btn-gold px-8 py-4 text-center items-center justify-center flex gap-2 font-bold tracking-widest uppercase hover:scale-105 transition-transform shadow-lg shadow-sabiduria-gold/20"
                    >
                        <Heart size={20} className="fill-current" />
                        Donar con PayPal
                    </a>

                    <button
                        disabled
                        className="w-full sm:w-auto px-8 py-4 border-2 border-sabiduria-gold text-sabiduria-gold font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-sabiduria-gold hover:text-white transition-colors cursor-not-allowed opacity-70"
                        title="Próximamente"
                    >
                        <CreditCard size={20} />
                        Tarjeta (Próximamente)
                    </button>
                </div>

                {/* Transparency Footer */}
                <div className="border-t border-sabiduria-gray/10 pt-8">
                    <p className="text-sm text-sabiduria-gray italic font-serif">
                        Todas las donaciones se destinan íntegramente a los costos operativos del sitio, software de edición y la adquisición de material bibliográfico necesario para la investigación teológica. Gracias por ser parte de este ministerio.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Donations;
