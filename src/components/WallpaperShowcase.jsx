import { Player } from '@remotion/player';
import { WallpaperLampara } from '../remotion/wallpapers/WallpaperLampara';
import { WallpaperGracia } from '../remotion/wallpapers/WallpaperGracia';
import { WallpaperFortaleza } from '../remotion/wallpapers/WallpaperFortaleza';
import { Download, Smartphone } from 'lucide-react';

const WALLPAPERS = [
    {
        id: 'lampara',
        component: WallpaperLampara,
        titulo: 'Lámpara',
        referencia: 'Salmos 119:105',
        descripcion: 'Partículas doradas ascendentes',
    },
    {
        id: 'gracia',
        component: WallpaperGracia,
        titulo: 'Gracia',
        referencia: 'Efesios 2:8',
        descripcion: 'Barrido de luz y parallax',
    },
    {
        id: 'fortaleza',
        component: WallpaperFortaleza,
        titulo: 'Fortaleza',
        referencia: 'Filipenses 4:13',
        descripcion: 'Pulso radial y texto respirante',
    },
];

const WallpaperCard = ({ wallpaper }) => {
    return (
        <div className="flex flex-col items-center">
            {/* Phone frame */}
            <div className="relative w-44 rounded-[2.2rem] overflow-hidden border-2 border-white/15 shadow-2xl shadow-black/50"
                style={{ aspectRatio: '9/16' }}>
                <Player
                    component={wallpaper.component}
                    durationInFrames={180}
                    fps={30}
                    compositionWidth={1080}
                    compositionHeight={1920}
                    style={{ width: '100%', height: '100%' }}
                    loop
                    autoPlay
                    controls={false}
                    showVolumeControls={false}
                    clickToPlay={false}
                />
                {/* Phone notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-black/70 rounded-full" />
            </div>

            {/* Info */}
            <div className="mt-5 text-center">
                <p className="text-sabiduria-gold font-heading font-bold text-base tracking-wider">
                    {wallpaper.titulo}
                </p>
                <p className="text-white/50 font-serif text-sm italic mt-0.5">
                    {wallpaper.referencia}
                </p>
                <p className="text-white/30 text-xs font-heading uppercase tracking-widest mt-1.5">
                    {wallpaper.descripcion}
                </p>
            </div>

            {/* Download button */}
            <a
                href={`/wallpapers/${wallpaper.id}.mp4`}
                download
                className="mt-4 flex items-center gap-2 bg-sabiduria-gold/10 border border-sabiduria-gold/25 text-sabiduria-gold px-5 py-2 rounded-lg font-heading text-sm font-semibold hover:bg-sabiduria-gold/20 transition-all active:scale-95"
                title="Descarga el video para usarlo como Live Wallpaper"
            >
                <Download size={14} />
                Descargar MP4
            </a>
        </div>
    );
};

const WallpaperShowcase = () => {
    return (
        <div className="w-full">
            {/* Instruction banner */}
            <div className="flex items-start gap-3 bg-sabiduria-gold/8 border border-sabiduria-gold/20 rounded-xl p-4 mb-10 max-w-2xl mx-auto">
                <Smartphone size={18} className="text-sabiduria-gold shrink-0 mt-0.5" />
                <div>
                    <p className="text-sabiduria-gold font-heading font-semibold text-sm mb-1">
                        ¿Cómo usarlos como Live Wallpaper?
                    </p>
                    <p className="text-white/55 font-serif text-sm leading-relaxed">
                        Descargá el MP4 y abrilo con una app de Live Wallpaper en tu celular
                        (Android: <em>Video Live Wallpaper</em> · iOS: <em>intoLive</em>).
                        El video se reproduce en loop en tu pantalla de inicio.
                    </p>
                </div>
            </div>

            {/* Wallpaper grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 justify-items-center">
                {WALLPAPERS.map(w => (
                    <WallpaperCard key={w.id} wallpaper={w} />
                ))}
            </div>
        </div>
    );
};

export default WallpaperShowcase;
