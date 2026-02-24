/**
 * journeys-registry.js
 * Registro central de los 5 recorridos bíblicos.
 * Ordenados cronológicamente del más antiguo al más reciente.
 * Cada entrada define metadata + ruta al GeoJSON + configuración del mapa.
 */

const JOURNEYS = [
    {
        slug: 'viaje-de-abraham',
        titulo: 'El Viaje de Abraham',
        subtitulo: 'De Ur de los Caldeos a la Tierra Prometida',
        descripcion:
            'Recorre el camino del padre de la fe desde Mesopotamia hasta Canaán, siguiendo el llamado divino que cambió la historia de la redención.',
        epoca: 'patriarcas',
        geojsonPath: '/geojson/01-abraham.geojson',
        center: [33.0, 42.0],
        zoom: 5,
        puntos: 18,
        imagen: '🏕️',
        sintesisTeologica: `El viaje de Abraham no es solo un desplazamiento geográfico: es la primera gran escuela de fe en las Escrituras. A través de más de 2.000 kilómetros de obediencia, Dios moldea a un hombre común en el «padre de todos los creyentes» (Romanos 4:11). Cada etapa revela una dimensión nueva del carácter divino: el Dios que llama, el Dios que provee, el Dios que cumple sus promesas contra toda expectativa humana.

La promesa de la tierra, la descendencia y la bendición universal (Génesis 12:1-3) no se cumple de inmediato. Abraham camina entre la promesa y su cumplimiento, aprendiendo que la fe no es la ausencia de espera, sino la certeza de que quien prometió es fiel. El altar que levanta en cada parada es un testimonio silencioso: aquí pasé, aquí creí, aquí el Señor fue suficiente.

El Nuevo Testamento interpreta este recorrido como tipo de la peregrinación cristiana: «Porque esperaba la ciudad de fundamentos sólidos, cuyo arquitecto y constructor es Dios» (Hebreos 11:10). El viaje de Abraham anticipa el de todo creyente que, sin ver todavía el cumplimiento final, avanza en la confianza de que la historia tiene un destino y un Padre que la conduce.`,
    },
    {
        slug: 'el-exodo',
        titulo: 'El Éxodo',
        subtitulo: 'De la esclavitud en Egipto a las puertas de Canaán',
        descripcion:
            'Sigue los pasos del pueblo de Israel en su liberación de Egipto, su travesía por el Mar Rojo, y su peregrinación por el desierto del Sinaí.',
        epoca: 'exodo',
        geojsonPath: '/geojson/02-exodo.geojson',
        center: [29.5, 34.0],
        zoom: 6,
        puntos: 25,
        imagen: '🔥',
    },
    {
        slug: 'conquista-de-canaan',
        titulo: 'La Conquista de Canaán',
        subtitulo: 'La tierra prometida bajo Josué y los Jueces',
        descripcion:
            'Explora las batallas y asentamientos del pueblo de Israel al tomar posesión de la tierra que Dios les había prometido.',
        epoca: 'conquista',
        geojsonPath: '/geojson/03-conquista.geojson',
        center: [31.8, 35.2],
        zoom: 8,
        puntos: 20,
        imagen: '⚔️',
    },
    {
        slug: 'exilio-y-retorno',
        titulo: 'Exilio y Retorno',
        subtitulo: 'De Babilonia a la restauración de Jerusalén',
        descripcion:
            'Recorre la ruta del exilio a Babilonia, los años de cautiverio, y el milagroso retorno bajo los decretos de Ciro y Artajerjes.',
        epoca: 'exilio',
        geojsonPath: '/geojson/04-exilio-retorno.geojson',
        center: [33.5, 43.0],
        zoom: 5,
        puntos: 15,
        imagen: '🏛️',
    },
    {
        slug: 'viajes-de-pablo',
        titulo: 'Los Viajes Misioneros de Pablo',
        subtitulo: 'La expansión del Evangelio por el Mediterráneo',
        descripcion:
            'Acompaña al apóstol Pablo en sus tres viajes misioneros y su travesía final a Roma, trazando la expansión del cristianismo en el mundo antiguo.',
        epoca: 'apostolica',
        geojsonPath: '/geojson/05-viajes-pablo.geojson',
        center: [38.0, 30.0],
        zoom: 5,
        puntos: 45,
        imagen: '⛵',
    },
];

export default JOURNEYS;
