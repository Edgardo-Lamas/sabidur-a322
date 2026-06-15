/**
 * PresentacionCover — Carátula visual de una presentación.
 * Usada en: grilla de Esquemas (thumbnail de card) y PresentacionViewer (header).
 */
const PresentacionCover = ({ essay, numero, totalEnSerie }) => (
    <div className="w-full h-full bg-sabiduria-navy flex flex-col items-center justify-center relative overflow-hidden px-[8%]">

        {/* Patrón geométrico de fondo */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23C5A059' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
        }} />

        <div className="absolute top-0 left-0 right-0 h-[3px] bg-linear-to-r from-transparent via-sabiduria-gold to-transparent" />

        {/* Ornamento */}
        <div className="mb-[6%] opacity-50">
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                <polygon points="24,4 28,14 39,14 30,21 34,32 24,25 14,32 18,21 9,14 20,14"
                    fill="none" stroke="#C5A059" strokeWidth="1.4" />
                <circle cx="24" cy="24" r="4" fill="#C5A059" opacity="0.5" />
            </svg>
        </div>

        {/* Serie */}
        {essay.serie && (
            <p className="text-sabiduria-gold font-heading uppercase text-center opacity-80 mb-[3%]"
                style={{ fontSize: 'clamp(7px, 1.2vw, 11px)', letterSpacing: '0.18em' }}>
                {essay.serie}
            </p>
        )}

        {/* Separador */}
        <div className="flex items-center gap-2 mb-[4%] w-full max-w-[70%] justify-center">
            <div className="h-px flex-1 bg-sabiduria-gold/25" />
            <div className="w-1 h-1 rounded-full bg-sabiduria-gold/40" />
            <div className="h-px flex-1 bg-sabiduria-gold/25" />
        </div>

        {/* Título */}
        <h2 className="text-white font-serif text-center leading-snug mb-[3%] max-w-[80%]"
            style={{ fontSize: 'clamp(11px, 2.2vw, 20px)' }}>
            {essay.title}
        </h2>

        {/* Número en la serie */}
        {numero && (
            <div className="absolute bottom-[7%]">
                <span className="text-sabiduria-gold/45 font-heading uppercase"
                    style={{ fontSize: 'clamp(7px, 0.8vw, 10px)', letterSpacing: '0.14em' }}>
                    Artículo {numero}{totalEnSerie ? ` de ${totalEnSerie}` : ''}
                </span>
            </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-linear-to-r from-transparent via-sabiduria-gold to-transparent" />
    </div>
);

export default PresentacionCover;
