/**
 * Ensenanzas.jsx
 * Página /enseñanzas — Reproductor de audio vintage + Biblioteca + Himnos.
 */
import { useState, useMemo } from 'react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import VintagePlayer from '../components/audio/VintagePlayer';
import AudioList from '../components/audio/AudioList';
import HymnsSection from '../components/audio/HymnsSection';
import { AUDIOS } from '../data/audio-library';
import { Headphones } from 'lucide-react';

const Ensenanzas = () => {
    const [selectedTrack, setSelectedTrack] = useState(AUDIOS[0] || null);
    const [activeCategory, setActiveCategory] = useState('todos');

    const filteredAudios = useMemo(() => {
        return activeCategory === 'todos'
            ? AUDIOS
            : AUDIOS.filter(a => a.category === activeCategory);
    }, [activeCategory]);

    const currentIndex = filteredAudios.findIndex(a => a.id === selectedTrack?.id);
    const canPrev = currentIndex > 0;
    const canNext = currentIndex < filteredAudios.length - 1;

    const handlePrev = () => {
        if (canPrev) setSelectedTrack(filteredAudios[currentIndex - 1]);
    };
    const handleNext = () => {
        if (canNext) setSelectedTrack(filteredAudios[currentIndex + 1]);
    };
    const handleSelect = (audio) => {
        setSelectedTrack(audio);
    };
    const handleCategoryChange = (cat) => {
        setActiveCategory(cat);
    };

    return (
        <main className="bg-sabiduria-bg min-h-screen py-8 md:py-14">
            <SEO
                title="Enseñanzas — Sabiduría para el Corazón"
                description="Biblioteca de audios con predicaciones, estudios bíblicos y devocionales. Escucha o descarga enseñanzas bíblicas profundas."
                url="/enseñanzas"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs title="Enseñanzas" />

                {/* ─── Header ─── */}
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 20,
                    marginBottom: 40,
                    marginTop: 16,
                    paddingBottom: 32,
                    borderBottom: '1px solid rgba(197,160,89,0.15)',
                }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #C5A059, #8B6914)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, boxShadow: '0 4px 16px rgba(197,160,89,0.3)',
                    }}>
                        <Headphones size={26} color="white" />
                    </div>
                    <div>
                        <h1 style={{
                            fontFamily: "'Lora', serif",
                            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                            fontWeight: 700,
                            color: '#1A1D23',
                            margin: '0 0 8px',
                            lineHeight: 1.2,
                        }}>
                            Enseñanzas
                        </h1>
                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '1rem',
                            color: '#4A4A4A',
                            margin: 0,
                            lineHeight: 1.65,
                            maxWidth: '70ch',
                        }}>
                            Predicaciones, estudios bíblicos y devocionales para escuchar en cualquier momento.
                            Una biblioteca en crecimiento permanente.
                        </p>
                    </div>
                </div>

                {/* ─── Layout principal: Player + Lista ─── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 420px) 1fr',
                    gap: 32,
                    alignItems: 'start',
                }}>
                    {/* Columna izquierda: reproductor sticky */}
                    <div style={{ position: 'sticky', top: 96 }}>
                        <VintagePlayer
                            track={selectedTrack}
                            onNext={handleNext}
                            onPrev={handlePrev}
                            canNext={canNext}
                            canPrev={canPrev}
                        />
                    </div>

                    {/* Columna derecha: lista filtrable */}
                    <div>
                        <AudioList
                            audios={AUDIOS}
                            activeId={selectedTrack?.id}
                            onSelect={handleSelect}
                            activeCategory={activeCategory}
                            onCategoryChange={handleCategoryChange}
                        />
                    </div>
                </div>

                {/* ─── Sección Himnos ─── */}
                <HymnsSection />
            </div>

            {/* Responsive: columnas → stack en mobile */}
            <style>{`
                @media (max-width: 768px) {
                    .ensenanzas-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </main>
    );
};

export default Ensenanzas;
