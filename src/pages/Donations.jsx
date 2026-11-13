import React, { useState } from 'react';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';
import { Copy, Check } from 'lucide-react';

// Cuentas para aportar al ministerio. El alias se copia tal cual está acá.
const CUENTAS = [
    { entidad: 'Banco Nación', detalle: 'Caja de ahorro', alias: 'ENERO.SEIS.CUENTA' },
    { entidad: 'Mercado Pago', detalle: 'Cuenta', alias: 'gardo.seis.69.mp' },
];
const TITULAR = 'Edgardo Lamas';

const TarjetaAlias = ({ entidad, detalle, alias }) => {
    const [copiado, setCopiado] = useState(false);

    const copiar = async () => {
        try {
            await navigator.clipboard.writeText(alias);
            setCopiado(true);
            toast.success('Alias copiado');
            setTimeout(() => setCopiado(false), 2500);
        } catch {
            // Sin acceso al portapapeles: el alias se puede seleccionar a mano.
            toast('Mantenga apretado el alias para copiarlo');
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 border border-sabiduria-gray/10 shadow-sm rounded-sm text-left flex flex-col">
            <p className="text-sabiduria-gold text-xs font-bold uppercase tracking-[0.25em] mb-1">{entidad}</p>
            <p className="text-sm text-sabiduria-gray mb-5">{detalle}</p>
            <p className="text-xs uppercase tracking-widest text-sabiduria-navy/50 mb-1">Alias</p>
            <p className="font-mono text-xl md:text-2xl text-sabiduria-navy font-semibold break-all select-all mb-6">
                {alias}
            </p>
            <button
                type="button"
                onClick={copiar}
                aria-label={`Copiar el alias de ${entidad}`}
                className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-sabiduria-gold text-sabiduria-navy font-bold text-sm uppercase tracking-widest hover:bg-sabiduria-gold hover:text-white transition-colors rounded-sm"
            >
                {copiado ? <Check size={18} /> : <Copy size={18} />}
                {copiado ? 'Copiado' : 'Copiar alias'}
            </button>
        </div>
    );
};

const Donations = () => {
    return (
        <main className="bg-sabiduria-bg min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <SEO
                title="Donaciones"
                description="Apoya la difusión de la Sana Doctrina y el ministerio de Sabiduría para el Corazón."
                url="/donaciones"
            />

            <div className="max-w-3xl mx-auto text-center">
                {/* Header */}
                <div className="mb-12">
                    <span className="text-sabiduria-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                        Colabora con el Ministerio
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-sabiduria-navy mb-6">
                        Apoya la difusión de la Sana Doctrina
                    </h1>
                    <div className="w-24 h-1 bg-sabiduria-gold mx-auto rounded-full opacity-50"></div>
                </div>

                {/* Introduction */}
                <div className="prose prose-lg max-w-none text-sabiduria-gray mb-12">
                    <p className="font-sans text-lg md:text-xl leading-relaxed">
                        En Sabiduría para el Corazón, nuestra misión es clara: proveer recursos teológicos de alta calidad, exégesis bíblica rigurosa y materiales de estudio para compartir y para la edificación del cuerpo de Cristo. Creemos firmemente que el acceso a la profundidad de las Escrituras debe estar disponible para todo creyente, sin barreras.
                    </p>
                </div>

                {/* Body Content */}
                <div className="bg-white p-8 md:p-12 shadow-sm border border-sabiduria-gray/5 mb-12 rounded-sm">
                    <p className="font-sans text-sabiduria-navy/80 text-lg leading-relaxed mb-8 text-left">
                        Mantener esta plataforma, la investigación para los estudios, la producción de video y la creación de bosquejos descargables requiere de tiempo y recursos técnicos. Tu generosidad nos permite sostener este ministerio y expandir el alcance de estas enseñanzas a más personas de habla hispana en todo el mundo.
                    </p>

                    <blockquote className="border-l-4 border-sabiduria-gold pl-6 py-2 my-8 italic text-sabiduria-navy font-serif text-xl text-left bg-transparent">
                        "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre"
                        <footer className="text-sm font-sans font-bold text-sabiduria-gold mt-2 not-italic uppercase tracking-widest">
                            — 2 Corintios 9:7
                        </footer>
                    </blockquote>

                    <p className="font-sans text-sabiduria-navy/80 text-lg leading-relaxed mb-0 text-left">
                        Al ofrendar, te conviertes en un colaborador directo de este esfuerzo por enseñar la Verdad con fidelidad.
                    </p>
                </div>

                {/* Cuentas para aportar */}
                <div className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-sabiduria-navy mb-3">
                        Cómo aportar
                    </h2>
                    <p className="text-sabiduria-gray mb-8">
                        Por transferencia desde cualquier banco o billetera virtual, con el monto que usted disponga.
                    </p>
                    <div className="grid gap-6 sm:grid-cols-2">
                        {CUENTAS.map((c) => <TarjetaAlias key={c.alias} {...c} />)}
                    </div>
                    <p className="text-sm text-sabiduria-gray mt-6">
                        Titular de ambas cuentas: <strong className="text-sabiduria-navy">{TITULAR}</strong>
                    </p>
                </div>

                {/* Transparency Footer */}
                <div className="border-t border-sabiduria-gray/10 pt-8">
                    <p className="text-sm text-sabiduria-gray italic font-serif">
                        Todas las donaciones se destinan íntegramente a los costos operativos del sitio, software de edición y la adquisición de material bibliográfico necesario para la investigación teológica. Gracias por ser parte de este ministerio.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Donations;
