import { Composition, registerRoot } from 'remotion';
import { WallpaperLampara } from './wallpapers/WallpaperLampara';
import { WallpaperGracia } from './wallpapers/WallpaperGracia';
import { WallpaperFortaleza } from './wallpapers/WallpaperFortaleza';
import { NocturnoMar } from './scenes/NocturnoMar';
import { FuegoPedro } from './scenes/FuegoPedro';
import { VersiculoCard } from './scenes/VersiculoCard';
import { SalmoPoster } from './scenes/SalmoPoster';
import { SALMO_145, SALMO_139 } from '../data/salmos-posters';

// 15 seconds at 30fps
const VERSICULO_DURATION = 450;

const VERSICULOS = [
    {
        id: 'Lamentaciones',
        imagePath: 'img/versiculos/lamentaciones.jpg',
        keyword: 'FIDELIDAD',
        lines: [
            'Por la misericordia de Jehová',
            'no hemos sido consumidos.',
            'Nuevas son cada mañana;',
            'grande es tu fidelidad.',
        ],
        reference: 'Lamentaciones 3:22-23',
    },
    {
        id: 'Isaias',
        imagePath: 'img/versiculos/isaias.jpg',
        keyword: 'FUERZAS',
        lines: [
            'Los que esperan a Jehová',
            'tendrán nuevas fuerzas;',
            'levantarán alas como las águilas;',
            'correrán, y no se cansarán.',
        ],
        reference: 'Isaías 40:31',
    },
    {
        id: 'Proverbios16',
        imagePath: 'img/versiculos/proverbios-16.jpg',
        keyword: 'TEMOR',
        lines: [
            'Con misericordia y verdad',
            'se corrige el pecado,',
            'y con el temor de Jehová',
            'los hombres se apartan del mal.',
        ],
        reference: 'Proverbios 16:6',
    },
    {
        id: 'Proverbios22',
        imagePath: 'img/versiculos/proverbios-22.jpg',
        keyword: 'NOMBRE',
        lines: [
            'De más estima es el buen nombre',
            'que las muchas riquezas,',
            'y la buena fama más que',
            'la plata y el oro.',
        ],
        reference: 'Proverbios 22:1',
    },
    {
        id: 'Proverbios21',
        imagePath: 'img/versiculos/proverbios-21.jpg',
        keyword: 'VICTORIA',
        lines: [
            'El caballo se alista',
            'para el día de la batalla;',
            'mas Jehová es',
            'el que da la victoria.',
        ],
        reference: 'Proverbios 21:31',
    },
];

export const RemotionRoot = () => (
    <>
        <Composition
            id="WallpaperLampara"
            component={WallpaperLampara}
            durationInFrames={180}
            fps={30}
            width={1080}
            height={1920}
        />
        <Composition
            id="WallpaperGracia"
            component={WallpaperGracia}
            durationInFrames={180}
            fps={30}
            width={1080}
            height={1920}
        />
        <Composition
            id="WallpaperFortaleza"
            component={WallpaperFortaleza}
            durationInFrames={180}
            fps={30}
            width={1080}
            height={1920}
        />
        <Composition
            id="NocturnoMar"
            component={NocturnoMar}
            durationInFrames={300}
            fps={30}
            width={1920}
            height={1080}
        />
        <Composition
            id="FuegoPedro"
            component={FuegoPedro}
            durationInFrames={300}
            fps={30}
            width={1920}
            height={1080}
        />
        {VERSICULOS.map((v) => (
            <Composition
                key={v.id}
                id={`Versiculo-${v.id}`}
                component={VersiculoCard}
                durationInFrames={VERSICULO_DURATION}
                fps={30}
                width={576}
                height={1024}
                defaultProps={{
                    imagePath: v.imagePath,
                    keyword: v.keyword,
                    lines: v.lines,
                    reference: v.reference,
                }}
            />
        ))}
        <Composition
            id="SalmoPoster-145"
            component={SalmoPoster}
            durationInFrames={1}
            fps={30}
            width={2480}
            height={3508}
            defaultProps={SALMO_145}
        />
        <Composition
            id="SalmoPoster-139"
            component={SalmoPoster}
            durationInFrames={1}
            fps={30}
            width={2480}
            height={3508}
            defaultProps={SALMO_139}
        />
    </>
);

registerRoot(RemotionRoot);
