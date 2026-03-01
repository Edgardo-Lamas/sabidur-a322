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
        narrativa: true,
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
        center: [32.5, 29.8],
        zoom: 6,
        puntos: 17,
        imagen: '🔥',
        narrativa: true,
        sintesisTeologica: `El Éxodo es el acontecimiento fundacional del Antiguo Testamento. Así como la resurrección define al Nuevo, la salida de Egipto define a Israel: su identidad, su ley, su calendario y su esperanza están construidos sobre lo que Dios hizo en aquella noche de Pascua y en los cuarenta años que siguieron.

Dios no libera a un pueblo para dejarlo sin destino. Cada etapa del desierto es una aula: el maná enseña dependencia diaria, las aguas amargas enseñan confianza cuando la providencia decepciona, el Sinaí enseña que la redención antecede a la ley —«Yo soy Jehová tu Dios, que te saqué de Egipto» viene antes de los mandamientos—. El Tabernáculo enseña que Dios quiere morar en medio de su pueblo, no solo sobre él.

La trayectoria de Moisés anticipa la del Mesías: intercede por el pueblo cuando merece juicio, carga el peso de sus fracasos, ve desde lejos lo que no le es dado poseer. La serpiente levantada en el desierto, que Cristo mismo interpretó como imagen de su cruz (Juan 3:14), convierte el Éxodo en profecía: toda liberación visible apunta a una liberación más profunda, de una esclavitud que ningún Faraón impone pero que el corazón humano no puede romper por sí mismo.`,
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
        puntos: 15,
        imagen: '⚔️',
        narrativa: true,
        sintesisTeologica: `La conquista de Canaán no es solo la historia de una ocupación militar. Es la consumación de una promesa que comenzó en Ur de los Caldeos con Abraham y atravesó cuatro siglos de esclavitud, desierto y formación. La tierra que Dios había prometido no se recibió como un regalo estático: se tomó paso a paso, ciudad a ciudad, con obediencia como arma principal y la presencia del arca como garantía.

El libro de Josué muestra que Dios pelea por su pueblo, pero exige de él fe activa. Los muros de Jericó no cayeron por fuerza humana, pero alguien tuvo que caminar alrededor de ellos siete días. El Jordán se abrió, pero los sacerdotes tuvieron que meter los pies en el agua primero. La conquista es un modelo de cooperación entre la soberanía divina y la responsabilidad humana.

Pero el libro también revela las consecuencias de la desobediencia. Hai fue una derrota causada no por la fortaleza del enemigo sino por el pecado oculto en el campamento. Gabaón fue un pacto nacido de la falta de consulta. La conquista incompleta —las tribus que no expulsaron a los cananeos de sus territorios— sembraría los conflictos que dominarían toda la época de los Jueces.

El período de los Jueces expone el patrón más recurrente de la historia de Israel: apostasía, opresión, clamor y liberación. Cada juez es una gracia temporal, no una solución definitiva. Débora, Gedeón, Sansón: instrumentos imperfectos de un Dios que no abandona a su pueblo ni siquiera cuando su pueblo lo abandona a Él.

Josué lo resumió en Siquem con la frase que define toda la época: «Escogeos hoy a quién sirváis». La conquista dio la tierra, pero no garantizó la fidelidad. Cada generación tendría que elegir de nuevo. Y esa elección —entre los dioses visibles de la cultura circundante y el Dios invisible que los había sacado de Egipto— sigue siendo la pregunta central de toda la Escritura.`,
    },
    {
        slug: 'exilio-y-retorno',
        titulo: 'Exilio y Retorno',
        subtitulo: 'De Babilonia a la restauración de Jerusalén',
        descripcion:
            'Recorre la ruta del exilio a Babilonia, los años de cautiverio, y el milagroso retorno bajo los decretos de Ciro y Artajerjes.',
        epoca: 'exilio',
        geojsonPath: '/geojson/04-exilio-retorno.geojson',
        center: [33.0, 44.0],
        zoom: 5,
        puntos: 13,
        imagen: '🏛️',
        narrativa: true,
        sintesisTeologica: `El exilio babilónico es la gran crisis de la fe en el Antiguo Testamento. No solo porque perdieron la tierra, el templo y la monarquía —las tres columnas sobre las que descansaba la identidad de Israel— sino porque la pregunta que se planteó fue más profunda: ¿dónde está Dios cuando su propia casa está en llamas? La respuesta que emerge del exilio es una de las más radicales de toda la Escritura: Dios no estaba atado al Templo. Su gloria se desplazó junto con su pueblo hacia Babilonia. Ezequiel la vio sobre un trono de zafiro, junto a un canal de irrigación, lejos de toda geografía sagrada.

El exilio transformó la teología de Israel. Antes del destierro, la presencia divina se asociaba con un lugar: el monte Sion, el Templo, la ciudad de David. Después del destierro, Israel aprendió que Dios es portable. Que su fidelidad no depende de circunstancias favorables. Que el Salmo 137 —con sus arpas colgadas en los sauces y su negativa a cantar en tierra extraña— es también Escritura sagrada, es decir, que el dolor honesto tiene lugar en la conversación con Dios.

El retorno bajo Zorobabel, Esdras y Nehemías no fue simplemente la restauración de lo que existía antes. Fue una reconfiguración completa: sin rey davídico entronizado, sin arca del pacto, con un templo más modesto que hacía llorar a los ancianos que recordaban el primero. Y sin embargo, fue allí donde se sentaron las bases del judaísmo tal como existe hasta hoy: centrado en la Ley, en la enseñanza, en la comunidad que escucha y obedece el texto. La lectura de la Ley en la plaza frente a la puerta de las Aguas es el origen de la sinagoga.

El Nuevo Testamento interpreta el exilio y el retorno como tipo de una liberación más profunda. El mismo lenguaje que los profetas usaron para describir el regreso —«consolad a mi pueblo», «el que venía a liberar a los cautivos»— fue aplicado por Juan el Bautista y por Jesús a sí mismo. El pueblo de Dios sigue en peregrinación, sigue esperando una restauración más completa. «El gozo del Señor es vuestra fuerza» sigue siendo la promesa que sostiene a quienes esperan en tierra extraña.`,
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
