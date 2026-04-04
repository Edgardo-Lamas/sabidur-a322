import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound = () => {
    return (
        <main className="min-h-[70vh] flex items-center justify-center bg-sabiduria-bg px-4">
            <SEO title="Página no encontrada" />
            <div className="max-w-xl w-full text-center">
                <span className="text-sabiduria-gold text-xs font-bold uppercase tracking-[0.3em] mb-6 block">
                    Error 404
                </span>
                <h1 className="text-6xl font-serif font-bold text-sabiduria-navy mb-4">
                    Página no encontrada
                </h1>
                <div className="w-16 h-px bg-sabiduria-gold mx-auto my-6" />
                <p className="text-sabiduria-gray text-lg leading-relaxed mb-10">
                    La página que buscas no existe o fue movida a otra dirección.
                    Puedes regresar al inicio o explorar nuestros recursos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-block bg-sabiduria-navy text-white font-semibold px-8 py-3 rounded hover:bg-opacity-90 transition-colors"
                    >
                        Volver al inicio
                    </Link>
                    <Link
                        to="/articulos"
                        className="inline-block border border-sabiduria-navy text-sabiduria-navy font-semibold px-8 py-3 rounded hover:bg-sabiduria-navy hover:text-white transition-colors"
                    >
                        Ver artículos
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default NotFound;
