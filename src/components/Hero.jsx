import React from 'react';
import { PlayCircle } from 'lucide-react';
import AnimatedButton from './ui/AnimatedButton';
import content from '../data/content.json';

const Hero = () => {
    return (
        <section className="bg-sabiduria-bg py-32 md:py-40">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-sabiduria-gold text-xs font-bold uppercase tracking-[0.3em] mb-6 block">
                        {content.hero.label || 'Estudio Destacado'}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-sabiduria-navy leading-tight mb-6 max-w-4xl mx-auto">
                        {content.hero.title}
                    </h1>
                    <p className="text-lg md:text-xl text-sabiduria-gray max-w-2xl mx-auto leading-relaxed">
                        Descubre las verdades profundas de las Escrituras en este estudio expositivo
                    </p>
                </div>

                {/* Video */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="relative aspect-video bg-sabiduria-navy shadow-2xl group border border-sabiduria-gray/10">
                        {/* Elegant Frame Border */}
                        <div className="absolute top-2 right-2 bottom-2 left-2 border border-white/10 pointer-events-none z-10"></div>

                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src={content.hero.youtubeUrl}
                            title={content.hero.youtubeTitle}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <AnimatedButton
                        variant="gold"
                        className="px-10 py-4 text-base"
                        as="a"
                        href={content.hero.youtubeUrl.replace('/embed/', '/watch?v=')}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <PlayCircle size={20} />
                        Ver Estudio Completo
                    </AnimatedButton>
                </div>
            </div>
        </section>
    );
};

export default Hero;
