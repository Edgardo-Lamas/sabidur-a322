import DOMPurify from 'dompurify';

/**
 * Sanitiza HTML antes de renderizarlo con dangerouslySetInnerHTML.
 * Permite etiquetas y atributos comunes de contenido editorial.
 */
export const sanitizeHTML = (html) => {
    if (!html) return '';
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            'p', 'br', 'strong', 'em', 'b', 'i', 'u', 's',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'ul', 'ol', 'li',
            'blockquote', 'pre', 'code',
            'a', 'img',
            'table', 'thead', 'tbody', 'tr', 'th', 'td',
            'div', 'span', 'section',
            'hr', 'sup', 'sub',
        ],
        ALLOWED_ATTR: [
            'href', 'src', 'alt', 'title', 'class', 'id',
            'target', 'rel', 'width', 'height',
        ],
        ALLOW_DATA_ATTR: false,
    });
};
