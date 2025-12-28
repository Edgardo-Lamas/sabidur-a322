import React from 'react';
import { Youtube, PlayCircle } from 'lucide-react';
import content from '../data/content.json';

const Hero = () => {
    return (
        <section className="bg-sabiduria-bg py-16 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-sabiduria-navy leading-tight mb-6">
                            Escudriñando las <span className="italic">Escrituras</span> con Sabiduría
                        </h1>
                        <p className="text-lg md:text-xl text-sabiduria-gray max-w-2xl mb-10 leading-relaxed">
                            Recursos de teología sistematica, exégesis bíblica y bosquejos homiléticos para la edificación de la Iglesia de Cristo.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="btn-gold px-8 py-3 text-lg">
                                Suscribirse al Canal
                            </button>
                            <button className="flex items-center justify-center gap-2 text-sabiduria-navy font-semibold hover:text-sabiduria-gold transition-colors">
                                <PlayCircle size={24} />
                                Ver Último Video
                            </button>
                        </div>
                    </div>

                    {/* YouTube Video Placeholder */}
                    <div className="flex-1 w-full max-w-2xl">
                        <div className="relative aspect-video bg-sabiduria-navy rounded-lg shadow-2xl overflow-hidden group">
                            <iframe
                                className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                                src={content.hero.youtubeUrl}
                                title={content.hero.youtubeTitle}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <div className="absolute top-4 left-4 bg-sabiduria-navy/80 text-white px-3 py-1 text-xs uppercase tracking-widest flex items-center gap-2">
                                <Youtube size={14} className="text-red-500" />
                                Destaque Semanal
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
