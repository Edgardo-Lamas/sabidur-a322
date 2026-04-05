import { useState } from 'react';
import { Share2, Copy, Check, MessageCircle } from 'lucide-react';

/**
 * ShareButtons - Botones para compartir contenido en redes sociales
 * Incluye: WhatsApp, Copiar enlace, Facebook, Twitter/X
 */
const ShareButtons = ({ title, url }) => {
    const [copied, setCopied] = useState(false);

    // Construir URL completa si es relativa
    const fullUrl = url?.startsWith('http')
        ? url
        : `${import.meta.env.VITE_SITE_URL || 'https://edgardo-lamas.github.io/sabidur-a322'}${url}`;

    const encodedUrl = encodeURIComponent(fullUrl);
    const encodedTitle = encodeURIComponent(title || 'Sabiduría para el Corazón');
    const shareText = encodeURIComponent(`${title} - Sabiduría para el Corazón`);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Error copying link:', err);
        }
    };

    const shareLinks = {
        whatsapp: `https://wa.me/?text=${shareText}%20${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`,
    };

    return (
        <div className="share-buttons">
            <span className="share-label">
                <Share2 size={16} />
                Compartir
            </span>
            <div className="share-icons">
                {/* WhatsApp */}
                <a
                    href={shareLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-icon share-whatsapp"
                    title="Compartir en WhatsApp"
                >
                    <MessageCircle size={18} />
                </a>

                {/* Copiar enlace */}
                <button
                    onClick={handleCopy}
                    className={`share-icon share-copy ${copied ? 'copied' : ''}`}
                    title={copied ? '¡Copiado!' : 'Copiar enlace'}
                >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>

                {/* Facebook */}
                <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-icon share-facebook"
                    title="Compartir en Facebook"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                </a>

                {/* Twitter/X */}
                <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-icon share-twitter"
                    title="Compartir en X (Twitter)"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default ShareButtons;
