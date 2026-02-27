/**
 * audio-library.js
 * Biblioteca de audios y sección de Himnos para la página /enseñanzas.
 *
 * Para agregar contenido:
 * - AUDIOS: completar url y downloadUrl con la URL del servicio de almacenamiento
 *   externo (Supabase Storage, Cloudflare R2, S3, etc.)
 * - HYMNS: igual, más el campo history con la historia del himno.
 */

export const CATEGORIES = [
    { id: 'todos',       label: 'Todos',        icon: '🎵' },
    { id: 'predicacion', label: 'Predicación',  icon: '🎙️' },
    { id: 'estudio',     label: 'Estudios',     icon: '📖' },
    { id: 'devocional',  label: 'Devocionales', icon: '🌅' },
];

export const AUDIOS = [
    {
        id: '1',
        title: 'La fe de Abraham',
        speaker: 'E. Lamas',
        category: 'predicacion',
        duration: '45:23',
        date: '2024-01-15',
        description: 'Una reflexión profunda sobre Hebreos 11 y el camino de obediencia de Abraham, el padre de la fe.',
        pasaje: 'Hebreos 11:8-12',
        url: '',
        downloadUrl: '',
    },
    {
        id: '2',
        title: 'El llamado de Moisés',
        speaker: 'E. Lamas',
        category: 'predicacion',
        duration: '38:10',
        date: '2024-02-20',
        description: 'Dios llama a hombres comunes para tareas extraordinarias. Un estudio del llamado en la zarza ardiente.',
        pasaje: 'Éxodo 3:1-14',
        url: '',
        downloadUrl: '',
    },
    {
        id: '3',
        title: 'El Sermón del Monte — Parte I',
        speaker: 'E. Lamas',
        category: 'estudio',
        duration: '52:47',
        date: '2024-03-05',
        description: 'Primer estudio del Sermón del Monte: las bienaventuranzas y el carácter del ciudadano del reino.',
        pasaje: 'Mateo 5:1-12',
        url: '',
        downloadUrl: '',
    },
    {
        id: '4',
        title: 'Salmo 23 — El Señor es mi Pastor',
        speaker: 'E. Lamas',
        category: 'devocional',
        duration: '28:15',
        date: '2024-03-18',
        description: 'Una meditación pausada sobre el Salmo más amado de las Escrituras. Palabra para el alma en tiempos de prueba.',
        pasaje: 'Salmo 23',
        url: '',
        downloadUrl: '',
    },
    {
        id: '5',
        title: 'La gracia suficiente',
        speaker: 'E. Lamas',
        category: 'devocional',
        duration: '31:40',
        date: '2024-04-02',
        description: 'El aguijón de Pablo y la respuesta de Dios: "Bástate mi gracia". Un mensaje para quien enfrenta limitaciones.',
        pasaje: '2 Corintios 12:7-10',
        url: '',
        downloadUrl: '',
    },
    {
        id: '6',
        title: 'Cristología — ¿Quién es Jesús?',
        speaker: 'E. Lamas',
        category: 'estudio',
        duration: '61:05',
        date: '2024-04-15',
        description: 'Estudio doctrinal sobre la persona de Jesucristo: su naturaleza divina y humana, sus nombres y oficios.',
        pasaje: 'Juan 1:1-18',
        url: '',
        downloadUrl: '',
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

La frase "que salvó a un miserable como yo" no era retórica en Newton — era confesión literal. Años más tarde, ya anciano y con la memoria fallando, diría: "Mi memoria casi se ha ido, pero recuerdo dos cosas: que soy un gran pecador, y que Cristo es un gran Salvador."

El himno adquirió su melodía popular en Estados Unidos en el siglo XIX, asociada a la canción folclórica "New Britain". Hoy es uno de los himnos más reconocibles del mundo, cantado en funerales de presidentes y en capillas de aldea por igual.`,
        url: '',
        downloadUrl: '',
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
    {
        id: 'h2',
        title: 'Castillo Fuerte',
        originalTitle: 'Ein feste Burg ist unser Gott',
        author: 'Martín Lutero',
        year: '1527',
        history: `Martín Lutero (1483–1546) escribió este himno en uno de los momentos más oscuros de la Reforma Protestante. El año 1527 fue devastador: la peste bubónica azotaba Alemania, amigos cercanos morían, la oposición a la Reforma se intensificaba, y Lutero mismo enfrentaba depresión severa.

En ese contexto de amenaza y desolación, Lutero tomó el Salmo 46 — "Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones" — y lo convirtió en el himno de batalla de la Reforma. "Ein feste Burg ist unser Gott" (Un castillo fuerte es nuestro Dios) se difundió con asombrosa rapidez a través de los territorios reformados.

La música fue compuesta por el propio Lutero, quien era músico consumado. Heinrich Heine lo llamaría siglos más tarde "La Marsellesa de la Reforma". Para los reformadores, el himno era más que música: era teología cantada, afirmación de que la batalla espiritual no dependía del poder humano sino de la victoria ya obtenida por Cristo.

El texto enfrenta directamente al enemigo — "el antiguo y crudo príncipe" — pero concluye con certeza absoluta: "aunque todo lo perdamos, parientes, bienes, fama, hijos, mujer, todo pase... el reino nuestro permanece."

Lutero creía que la música era "el regalo de Dios más hermoso y glorioso", y que los demonios huían cuando sonaban los himnos. En ese sentido, "Castillo Fuerte" no era solo canto — era arma.`,
        url: '',
        downloadUrl: '',
        letra: `Castillo fuerte es nuestro Dios,
Defensa y buen escudo;
Con su poder nos librará
En todo trance agudo.

Con furia y con afán
Acósanos Satán;
Por armas deja ver
Astucia y gran poder;
Cual él no hay en la tierra.

Luchar aquél por sí podrá,
A quien su poder no alcanza;
Mas por nosotros pugnará
De Dios el Elegido.

¿Sabéis quién es? Jesús,
El que venció en la Cruz,
Señor de Sabaot,
Y pues Él solo es Dios,
Él triunfa en la batalla.`,
    },
];
