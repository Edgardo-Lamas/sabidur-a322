import React from 'react';
import { Youtube, PlayCircle } from 'lucide-react';
import content from '../data/content.json';

const Hero = () => {
    return (
        <section className="bg-sabiduria-bg py-16 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left pt-2">
                        <span className="text-sabiduria-gold text-xs font-bold uppercase tracking-[0.3em] mb-3 block">
                            {content.hero.label || 'Estudio Destacado'}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-sabiduria-navy leading-tight mb-6">
                            {content.hero.title}
                        </h1>
                        <div className="text-base md:text-lg text-sabiduria-navy/80 max-w-2xl mb-8 leading-[1.8] whitespace-pre-line text-justify font-sans border-l-2 border-sabiduria-gold/30 pl-6">
                            {content.hero.description}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="btn-gold px-6 py-2.5 text-sm uppercase tracking-widest font-bold">
                                Suscribirse al Canal
                            </button>
                            <button className="flex items-center justify-center gap-2 text-sabiduria-navy text-sm font-bold uppercase tracking-widest hover:text-sabiduria-gold transition-colors">
                                <PlayCircle size={20} />
                                Ver en YouTube
                            </button>
                        </div>
                    </div>

                    {/* YouTube Video Contextual */}
                    <div className="flex-1 w-full lg:max-w-xl xl:max-w-2xl sticky top-8">
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
                        <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-sabiduria-gold/80">
                            Ver estudio completo en YouTube
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
