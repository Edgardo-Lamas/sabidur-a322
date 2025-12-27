import React from 'react';
import Hero from '../components/Hero';
import ArticleFeed from '../components/ArticleFeed';

const Home = () => {
    return (
        <main>
            <Hero />
            <ArticleFeed />

            {/* Secondary CTA Section */}
            <section className="bg-sabiduria-bg py-20 border-t border-sabiduria-gray/10">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-serif text-sabiduria-navy mb-6">Apoye la Difusión de la Verdad Reformada</h2>
                    <p className="text-sabiduria-gray text-lg mb-10">
                        Sabiduría 322 es un ministerio que se sostiene gracias a las donaciones voluntarias de sus lectores. Su apoyo nos permite seguir creando recursos teológicos de alta calidad y acceso gratuito.
                    </p>
                    <button className="btn-gold px-10 py-4 text-lg uppercase tracking-widest font-bold">
                        Realizar una Donación (PayPal)
                    </button>
                </div>
            </section>
        </main>
    );
};

export default Home;
