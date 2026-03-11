/**
 * audio-library.js
 * Biblioteca de audios y sección de Himnos para la página /enseñanzas.
 *
 * Para agregar contenido:
 * - AUDIOS: completar url y downloadUrl con la URL del servicio de almacenamiento
 *   externo (Supabase Storage, Cloudflare R2, S3, etc.) o ruta local en public/audios/
 * - HYMNS: igual, más el campo history con la historia del himno.
 */

const BASE = import.meta.env.BASE_URL;

export const CATEGORIES = [
    { id: 'todos',       label: 'Todos',        icon: '🎵' },
    { id: 'predicacion', label: 'Predicación',  icon: '🎙️' },
    { id: 'estudio',     label: 'Estudios',     icon: '📖' },
    { id: 'devocional',  label: 'Devocionales', icon: '🌅' },
];

export const AUDIOS = [
    {
        id: '1',
        title: 'La Providencia de Dios',
        speaker: 'E. Lamas',
        category: 'predicacion',
        duration: '',
        date: '2025-03-01',
        description: 'Una reflexión sobre cómo Dios gobierna todas las cosas para el bien de los suyos. Su providencia no falla, su propósito no se frustra.',
        pasaje: 'Romanos 8:28',
        url: `${BASE}audios/predicacion/La providecia.MP3`,
        downloadUrl: `${BASE}audios/predicacion/La providecia.MP3`,
    },
];

export const HYMNS = [
    {
        id: 'h1',
        title: 'Sublime Gracia',
        originalTitle: 'Amazing Grace',
        author: 'John Newton',
        year: '1779',
        history: `John Newton (1725–1807) no siempre fue hombre de fe. Durante años fue capitán de un barco negrero, comerciando con vidas humanas a través del Atlántico. En 1748, durante una tormenta feroz que casi hundió su embarcación, Newton clamó a Dios en desesperación — y algo se quebró en su interior.

La conversión fue gradual. Siguió en el comercio por un tiempo, pero la voz de la Escritura y la convicción del Espíritu no lo dejaron. Eventualmente abandonó la trata de esclavos, fue ordenado ministro anglicano, y se convirtió en uno de los más elocuentes predicadores de la Inglaterra del siglo XVIII.

"Amazing Grace" nació en 1772 como parte de una colección de himnos que Newton escribió junto a su amigo William Cowper para ser cantados en la iglesia de Olney. El himno es esencialmente la autobiografía de Newton: un hombre perdido que fue hallado, ciego que comenzó a ver, miserable que encontró gracia.

La frase "que salvó a un miserable como yo" no era retórica en Newton — era confesión literal. Años más tarde, ya anciano y con la memoria fallando, diría: "Mi memoria casi se ha ido, pero recuerdo dos cosas: que soy un gran pecador, y que Cristo es un gran Salvador."`,
        url: `${BASE}audios/Himnos/03 Pista 3.mp3`,
        downloadUrl: `${BASE}audios/Himnos/03 Pista 3.mp3`,
        letra: `Sublime gracia del Señor
Que a mí, pecador, salvó;
Fui ciego mas hoy veo yo,
Perdido y Él me halló.

Su gracia me enseñó a temer,
Mis dudas ahuyentó;
¡Oh cuán precioso fue a mi ser
Cuando Él me transformó!

En los peligros o dolor,
Su gracia siempre fue;
Y en su bondad me guardará
Hasta llegar al pie.

Y cuando en Sion por siglos mil
Brillando esté cual sol,
Le cantaré por siempre a Él,
Su amor que me salvó.`,
    },
];
