import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        // Log error in development only
        if (import.meta.env.DEV) {
            console.error('ErrorBoundary caught:', error, info);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <main className="min-h-[70vh] flex items-center justify-center bg-sabiduria-bg px-4">
                    <div className="max-w-xl w-full text-center">
                        <span className="text-sabiduria-gold text-xs font-bold uppercase tracking-[0.3em] mb-6 block">
                            Algo salió mal
                        </span>
                        <h1 className="text-4xl font-serif font-bold text-sabiduria-navy mb-4">
                            Ocurrió un error inesperado
                        </h1>
                        <div className="w-16 h-px bg-sabiduria-gold mx-auto my-6" />
                        <p className="text-sabiduria-gray text-lg leading-relaxed mb-10">
                            Lo sentimos, ocurrió un problema al cargar esta página.
                            Por favor recarga o vuelve al inicio.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="inline-block bg-sabiduria-navy text-white font-semibold px-8 py-3 rounded hover:bg-opacity-90 transition-colors"
                            >
                                Recargar página
                            </button>
                            <a
                                href="/"
                                className="inline-block border border-sabiduria-navy text-sabiduria-navy font-semibold px-8 py-3 rounded hover:bg-sabiduria-navy hover:text-white transition-colors"
                            >
                                Ir al inicio
                            </a>
                        </div>
                    </div>
                </main>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
