import { Composition, registerRoot } from 'remotion';
import { WallpaperLampara } from './wallpapers/WallpaperLampara';
import { WallpaperGracia } from './wallpapers/WallpaperGracia';
import { WallpaperFortaleza } from './wallpapers/WallpaperFortaleza';

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
    </>
);

registerRoot(RemotionRoot);
