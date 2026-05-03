import { Composition, registerRoot } from 'remotion';
import { WallpaperLampara } from './wallpapers/WallpaperLampara';
import { WallpaperGracia } from './wallpapers/WallpaperGracia';
import { WallpaperFortaleza } from './wallpapers/WallpaperFortaleza';
import { NocturnoMar } from './scenes/NocturnoMar';
import { FuegoPedro } from './scenes/FuegoPedro';

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
    </>
);

registerRoot(RemotionRoot);
