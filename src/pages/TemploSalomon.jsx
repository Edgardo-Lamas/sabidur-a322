import { Link } from 'react-router-dom';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import SEO from '../components/SEO';

const TemploSalomon = () => {
    return (
        <div className="flex flex-col" style={{ height: 'calc(100vh - 80px)', background: '#050301', overflow: 'hidden' }}>
            <SEO
                title="Templo de Salomón en 3D — Arqueología Bíblica"
                description="Recorrido interactivo en 3D del Templo de Salomón (Monte Moríah, s. X a.C.). Explora el Debir, el Hekal, las columnas Jaquín y Boaz, el Mar de Bronce y más, con referencias bíblicas en cada elemento."
                url="/esquemas/templo-salomon"
            />

            {/* Barra delgada de navegación contextual */}
            <div style={{
                background: '#0A0805',
                borderBottom: '1px solid rgba(212,175,55,0.12)',
                padding: '7px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                flexShrink: 0,
            }}>
                <Link
                    to="/esquemas"
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#6a5a30', fontSize: '10px', letterSpacing: '1px', textDecoration: 'none' }}
                >
                    <ArrowLeft size={11} />
                    Esquemas
                </Link>

                <span style={{ color: '#D4AF37', fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase' }}>
                    Templo de Salomón · S. X a.C.
                </span>

                <a
                    href="/templo/templo.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'flex', alignItems: 'center', gap: '5px',
                        color: '#C8A030', fontSize: '9.5px', letterSpacing: '1.5px',
                        textTransform: 'uppercase', textDecoration: 'none',
                        border: '1px solid rgba(212,175,55,0.22)',
                        padding: '4px 9px', borderRadius: '3px',
                    }}
                >
                    <Maximize2 size={10} />
                    Pantalla completa
                </a>
            </div>

            {/* iframe — ocupa todo el espacio restante */}
            <iframe
                src="/templo/templo.html"
                title="Templo de Salomón en 3D — Sabiduría para el Corazón"
                style={{ flex: 1, border: 'none', display: 'block', width: '100%', minHeight: 0 }}
                allow="fullscreen"
            />
        </div>
    );
};

export default TemploSalomon;
