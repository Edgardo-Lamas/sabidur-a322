import { useState } from 'react';
import { Player } from '@remotion/player';
import { motion, AnimatePresence } from 'framer-motion';
import { WallpaperLampara } from '../remotion/wallpapers/WallpaperLampara';
import { WallpaperGracia } from '../remotion/wallpapers/WallpaperGracia';
import { WallpaperFortaleza } from '../remotion/wallpapers/WallpaperFortaleza';
import { VersiculoCard } from '../remotion/scenes/VersiculoCard';
import { Download, Smartphone, X, Expand } from 'lucide-react';

// Existing animated wallpapers — Remotion Player (live)
const WALLPAPERS = [
    {
        id: 'lampara',
        component: WallpaperLampara,
        titulo: 'Lámpara',
        referencia: 'Salmos 119:105',
        descripcion: 'Cielo estrellado · Partículas doradas',
        durationInFrames: 180,
        compositionWidth: 1080,
        compositionHeight: 1920,
        downloadPath: '/wallpapers/lampara.mp4',
    },
    {
        id: 'gracia',
        component: WallpaperGracia,
        titulo: 'Gracia',
        referencia: 'Efesios 2:8',
        descripcion: 'Cumbre dorada · Barrido de luz',
        durationInFrames: 180,
        compositionWidth: 1080,
        compositionHeight: 1920,
        downloadPath: '/wallpapers/gracia.mp4',
    },
    {
        id: 'fortaleza',
        component: WallpaperFortaleza,
        titulo: 'Fortaleza',
        referencia: 'Filipenses 4:13',
        descripcion: 'Valle épico · Ondas radiales',
        durationInFrames: 180,
        compositionWidth: 1080,
        compositionHeight: 1920,
        downloadPath: '/wallpapers/fortaleza.mp4',
    },
];

// Verse cards — pregenerados como MP4 para compartir
const VERSE_CARDS = [
    {
        id: 'lamentaciones',
        component: VersiculoCard,
        inputProps: {
            imagePath: 'img/versiculos/lamentaciones.jpg',
            keyword: 'FIDELIDAD',
            lines: ['Por la misericordia de Jehová', 'no hemos sido consumidos.', 'Nuevas son cada mañana;', 'grande es tu fidelidad.'],
            reference: 'Lamentaciones 3:22-23',
        },
        titulo: 'Fidelidad',
        referencia: 'Lamentaciones 3:22-23',
        descripcion: 'Para compartir · 9:16',
        durationInFrames: 450,
        compositionWidth: 576,
        compositionHeight: 1024,
        downloadPath: '/versiculos/lamentaciones.mp4',
    },
    {
        id: 'isaias',
        component: VersiculoCard,
        inputProps: {
            imagePath: 'img/versiculos/isaias.jpg',
            keyword: 'FUERZAS',
            lines: ['Los que esperan a Jehová', 'tendrán nuevas fuerzas;', 'levantarán alas como las águilas;', 'correrán, y no se cansarán.'],
            reference: 'Isaías 40:31',
        },
        titulo: 'Fuerzas',
        referencia: 'Isaías 40:31',
        descripcion: 'Para compartir · 9:16',
        durationInFrames: 450,
        compositionWidth: 576,
        compositionHeight: 1024,
        downloadPath: '/versiculos/isaias.mp4',
    },
    {
        id: 'proverbios-16',
        component: VersiculoCard,
        inputProps: {
            imagePath: 'img/versiculos/proverbios-16.jpg',
            keyword: 'TEMOR',
            lines: ['Con misericordia y verdad', 'se corrige el pecado,', 'y con el temor de Jehová', 'los hombres se apartan del mal.'],
            reference: 'Proverbios 16:6',
        },
        titulo: 'Temor',
        referencia: 'Proverbios 16:6',
        descripcion: 'Para compartir · 9:16',
        durationInFrames: 450,
        compositionWidth: 576,
        compositionHeight: 1024,
        downloadPath: '/versiculos/proverbios-16.mp4',
    },
    {
        id: 'proverbios-22',
        component: VersiculoCard,
        inputProps: {
            imagePath: 'img/versiculos/proverbios-22.jpg',
            keyword: 'NOMBRE',
            lines: ['De más estima es el buen nombre', 'que las muchas riquezas,', 'y la buena fama más que', 'la plata y el oro.'],
            reference: 'Proverbios 22:1',
        },
        titulo: 'Buen Nombre',
        referencia: 'Proverbios 22:1',
        descripcion: 'Para compartir · 9:16',
        durationInFrames: 450,
        compositionWidth: 576,
        compositionHeight: 1024,
        downloadPath: '/versiculos/proverbios-22.mp4',
    },
    {
        id: 'proverbios-21',
        component: VersiculoCard,
        inputProps: {
            imagePath: 'img/versiculos/proverbios-21.jpg',
            keyword: 'VICTORIA',
            lines: ['El caballo se alista', 'para el día de la batalla;', 'mas Jehová es', 'el que da la victoria.'],
            reference: 'Proverbios 21:31',
        },
        titulo: 'Victoria',
        referencia: 'Proverbios 21:31',
        descripcion: 'Para compartir · 9:16',
        durationInFrames: 450,
        compositionWidth: 576,
        compositionHeight: 1024,
        downloadPath: '/versiculos/proverbios-21.mp4',
    },
];

const WallpaperCard = ({ w, onPreview }) => (
    <div className="flex flex-col items-center">
        <div
            className="relative w-44 rounded-[2.2rem] overflow-hidden border-2 border-white/15 shadow-2xl shadow-black/60 cursor-pointer group"
            style={{ aspectRatio: '9/16' }}
            onClick={() => onPreview(w)}
        >
            <Player
                component={w.component}
                inputProps={w.inputProps}
                durationInFrames={w.durationInFrames}
                compositionWidth={w.compositionWidth}
                compositionHeight={w.compositionHeight}
                fps={30}
                loop
                autoPlay
                controls={false}
                showVolumeControls={false}
                clickToPlay={false}
                style={{ width: '100%', height: '100%' }}
            />
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-black/70 rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-full p-3">
                    <Expand size={22} className="text-white" />
                </div>
            </div>
        </div>

        <div className="mt-5 text-center">
            <p className="text-sabiduria-gold font-heading font-bold text-base tracking-wider">{w.titulo}</p>
            <p className="text-white/50 font-serif text-sm italic mt-0.5">{w.referencia}</p>
            <p className="text-white/25 text-xs font-heading uppercase tracking-widest mt-1.5">{w.descripcion}</p>
        </div>

        <div className="mt-4 flex gap-2">
            <button
                onClick={() => onPreview(w)}
                className="flex items-center gap-1.5 bg-white/5 border border-white/15 text-white/70 px-4 py-2 rounded-lg font-heading text-xs font-semibold hover:bg-white/10 transition-all"
            >
                <Expand size={13} /> Preview
            </button>
            <a
                href={w.downloadPath}
                download
                className="flex items-center gap-1.5 bg-sabiduria-gold/10 border border-sabiduria-gold/25 text-sabiduria-gold px-4 py-2 rounded-lg font-heading text-xs font-semibold hover:bg-sabiduria-gold/20 transition-all active:scale-95"
            >
                <Download size={13} /> Descargar
            </a>
        </div>
    </div>
);

const WallpaperShowcase = () => {
    const [preview, setPreview] = useState(null);

    return (
        <div className="w-full">
            {/* Instruction banner */}
            <div className="flex items-start gap-3 bg-sabiduria-gold/8 border border-sabiduria-gold/20 rounded-xl p-4 mb-10 max-w-2xl mx-auto">
                <Smartphone size={18} className="text-sabiduria-gold shrink-0 mt-0.5" />
                <div>
                    <p className="text-sabiduria-gold font-heading font-semibold text-sm mb-1">
                        ¿Cómo usar como Live Wallpaper?
                    </p>
                    <p className="text-white/50 font-serif text-sm leading-relaxed">
                        Descargá el MP4. En Android usá <em>Video Live Wallpaper</em>,
                        en iOS usá <em>intoLive</em>. El video corre en loop en tu pantalla de inicio.
                    </p>
                </div>
            </div>

            {/* Fondos animados — 3 originales */}
            <p className="text-white/35 font-heading text-xs uppercase tracking-[0.22em] text-center mb-8">
                Fondos para pantalla de inicio
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 justify-items-center mb-14">
                {WALLPAPERS.map((w) => (
                    <WallpaperCard key={w.id} w={w} onPreview={setPreview} />
                ))}
            </div>

            {/* Divisor */}
            <div className="flex items-center gap-4 mb-10 max-w-2xl mx-auto">
                <div className="flex-1 h-px bg-white/8" />
                <p className="text-white/35 font-heading text-xs uppercase tracking-[0.22em] whitespace-nowrap">
                    Para compartir en WhatsApp e Instagram
                </p>
                <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Versículos para compartir — 5 nuevos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
                {VERSE_CARDS.map((w) => (
                    <WallpaperCard key={w.id} w={w} onPreview={setPreview} />
                ))}
            </div>

            {/* Preview Modal */}
            <AnimatePresence>
                {preview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ backdropFilter: 'blur(12px)', background: 'rgba(0,0,0,0.85)' }}
                        onClick={() => setPreview(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.88, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="flex flex-col items-center gap-5"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                className="relative rounded-[2.8rem] overflow-hidden border-2 border-white/20 shadow-2xl"
                                style={{ width: 'min(320px, 75vw)', aspectRatio: '9/16' }}
                            >
                                <Player
                                    component={preview.component}
                                    inputProps={preview.inputProps}
                                    durationInFrames={preview.durationInFrames}
                                    compositionWidth={preview.compositionWidth}
                                    compositionHeight={preview.compositionHeight}
                                    fps={30}
                                    loop
                                    autoPlay
                                    controls={false}
                                    showVolumeControls={false}
                                    clickToPlay={false}
                                    style={{ width: '100%', height: '100%' }}
                                />
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-5 bg-black/70 rounded-full pointer-events-none" />
                            </div>

                            <div className="text-center">
                                <p className="text-sabiduria-gold font-heading font-bold text-lg tracking-wider">{preview.titulo}</p>
                                <p className="text-white/60 font-serif text-sm italic">{preview.referencia}</p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setPreview(null)}
                                    className="flex items-center gap-2 bg-white/8 border border-white/15 text-white/70 px-5 py-2.5 rounded-lg font-heading text-sm font-semibold hover:bg-white/15 transition-all"
                                >
                                    <X size={15} /> Cerrar
                                </button>
                                <a
                                    href={preview.downloadPath}
                                    download
                                    className="flex items-center gap-2 bg-sabiduria-gold text-sabiduria-navy px-5 py-2.5 rounded-lg font-heading text-sm font-bold hover:bg-sabiduria-gold/90 transition-all active:scale-95"
                                >
                                    <Download size={15} /> Descargar MP4
                                </a>
                            </div>
                        </motion.div>

                        <button
                            onClick={() => setPreview(null)}
                            className="absolute top-5 right-5 p-2 text-white/40 hover:text-white transition-colors"
                        >
                            <X size={22} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WallpaperShowcase;
