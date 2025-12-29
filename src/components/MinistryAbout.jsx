import React from 'react';
import content from '../data/content.json';

const MinistryAbout = () => {
    return (
        <section className="bg-white py-20 md:py-28">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-sabiduria-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                        Contexto del Estudio
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-sabiduria-navy mb-6">
                        Sobre este Mensaje
                    </h2>
                    <div className="w-24 h-1 bg-sabiduria-gold mx-auto rounded-full opacity-50"></div>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                    <div className="text-base md:text-lg text-sabiduria-navy/80 leading-[1.9] whitespace-pre-line font-sans border-l-4 border-sabiduria-gold/30 pl-8 py-6">
                        {content.hero.description}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MinistryAbout;
