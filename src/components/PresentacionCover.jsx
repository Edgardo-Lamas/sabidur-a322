/**
 * PresentacionCover — Carátula de presentación.
 *
 * compact=false (default) → visor pantalla completa: título, serie, número
 * compact=true            → thumbnail de card en Esquemas: número grande + serie
 */
const PresentacionCover = ({ essay, numero, compact = false }) => (
    <div className="w-full h-full bg-sabiduria-navy flex flex-col items-center justify-center relative overflow-hidden">

        {/* Patrón geométrico de fondo */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23C5A059' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
        }} />

        <div className="absolute top-0 left-0 right-0 h-[3px] bg-linear-to-r from-transparent via-sabiduria-gold to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-linear-to-r from-transparent via-sabiduria-gold to-transparent" />

        {compact ? (
            /* ── Versión card: número watermark + serie + título ── */
            <div className="relative w-full h-full flex flex-col justify-between px-5 py-5">

                {/* Número grande como watermark en esquina superior derecha */}
                {numero && (
                    <span
                        className="absolute top-3 right-4 font-heading font-bold text-sabiduria-gold select-none pointer-events-none"
                        style={{ fontSize: 'clamp(52px, 9vw, 72px)', opacity: 0.18, lineHeight: 1 }}
                    >
                        {String(numero).padStart(2, '0')}
                    </span>
                )}

                {/* Parte superior: serie + número visible */}
                <div>
                    {essay.serie && (
                        <p className="text-sabiduria-gold font-heading uppercase leading-tight mb-2"
                            style={{ fontSize: 'clamp(8px, 0.9vw, 10px)', letterSpacing: '0.14em' }}>
                            {essay.serie}
                        </p>
                    )}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-px w-8 bg-sabiduria-gold/40" />
                        {numero && (
                            <span className="text-sabiduria-gold font-heading font-bold"
                                style={{ fontSize: 'clamp(10px, 1.1vw, 13px)', letterSpacing: '0.1em' }}>
                                Artículo {String(numero).padStart(2, '0')}
                            </span>
                        )}
                    </div>
                </div>

                {/* Título del artículo */}
                <div>
                    <h3 className="text-white font-serif leading-snug"
                        style={{
                            fontSize: 'clamp(13px, 1.5vw, 17px)',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                        {essay.title}
                    </h3>
                </div>
            </div>
        ) : (
            /* ── Versión visor: título completo + serie + número ── */
            <div className="flex flex-col items-center justify-center px-[8%] text-center w-full">
                {/* Ornamento */}
                <div className="mb-[4%] opacity-50">
                    <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                        <polygon points="24,4 28,14 39,14 30,21 34,32 24,25 14,32 18,21 9,14 20,14"
                            fill="none" stroke="#C5A059" strokeWidth="1.4" />
                        <circle cx="24" cy="24" r="4" fill="#C5A059" opacity="0.5" />
                    </svg>
                </div>

                {/* Serie */}
                {essay.serie && (
                    <p className="text-sabiduria-gold font-heading uppercase text-center opacity-90 mb-[2%]"
                        style={{ fontSize: 'clamp(9px, 1.4vw, 18px)', letterSpacing: '0.22em' }}>
                        {essay.serie}
                    </p>
                )}

                {/* Separador */}
                <div className="flex items-center gap-3 mb-[3%] w-full max-w-[55%] justify-center">
                    <div className="h-px flex-1 bg-sabiduria-gold/30" />
                    <div className="w-1.5 h-1.5 rounded-full bg-sabiduria-gold/50" />
                    <div className="h-px flex-1 bg-sabiduria-gold/30" />
                </div>

                {/* Título */}
                <h1 className="text-white font-serif text-center leading-snug mb-[3%] max-w-[65%]"
                    style={{ fontSize: 'clamp(16px, 3.2vw, 52px)' }}>
                    {essay.title}
                </h1>

                {/* Excerpt */}
                {essay.excerpt && (
                    <p className="text-white/50 text-center max-w-[50%] leading-relaxed"
                        style={{ fontSize: 'clamp(9px, 1.1vw, 16px)' }}>
                        {essay.excerpt}
                    </p>
                )}

                {/* Número */}
                {numero && (
                    <div className="absolute bottom-[6%]">
                        <span className="text-sabiduria-gold/50 font-heading uppercase"
                            style={{ fontSize: 'clamp(8px, 0.9vw, 13px)', letterSpacing: '0.15em' }}>
                            Artículo {numero}
                        </span>
                    </div>
                )}
            </div>
        )}
    </div>
);

export default PresentacionCover;
