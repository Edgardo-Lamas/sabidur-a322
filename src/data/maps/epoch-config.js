/**
 * epoch-config.js
 * Configuración de épocas bíblicas: colores, iconos y rango cronológico.
 * Cada época se usa como capa independiente en el mapa.
 */

const EPOCH_CONFIG = {
    patriarcas: {
        id: 'patriarcas',
        nombre: 'Época Patriarcal',
        color: '#C5A059',       // sabiduria-gold
        colorDark: '#A68640',
        rango: '~2000–1700 a.C.',
        orden: 1,
    },
    exodo: {
        id: 'exodo',
        nombre: 'Éxodo y Peregrinación',
        color: '#E07B54',       // terracota
        colorDark: '#C2623D',
        rango: '~1446–1406 a.C.',
        orden: 2,
    },
    conquista: {
        id: 'conquista',
        nombre: 'Conquista y Jueces',
        color: '#5B8C5A',       // verde oliva
        colorDark: '#47704A',
        rango: '~1406–1050 a.C.',
        orden: 3,
    },
    exilio: {
        id: 'exilio',
        nombre: 'Exilio y Restauración',
        color: '#6A5ACD',       // púrpura
        colorDark: '#5446A8',
        rango: '~586–445 a.C.',
        orden: 4,
    },
    apostolica: {
        id: 'apostolica',
        nombre: 'Era Apostólica',
        color: '#2980B9',       // azul
        colorDark: '#1F6A99',
        rango: '~45–67 d.C.',
        orden: 5,
    },
};

export default EPOCH_CONFIG;
