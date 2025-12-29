import React from 'react';
import HeroGrid from '../components/HeroGrid';
import TopicsBar from '../components/TopicsBar';
import ReadingOfDay from '../components/ReadingOfDay';
import ArticleFeed from '../components/ArticleFeed';
import EbooksSection from '../components/EbooksSection';
import BookstorePreview from '../components/BookstorePreview';
import Hero from '../components/Hero'; // Repurposed for Video section
import SEO from '../components/SEO';
import AnimatedButton from '../components/ui/AnimatedButton';
import MinistryAbout from '../components/MinistryAbout';

const Home = () => {
    return (
        <main className="bg-white">
            <SEO />
            <HeroGrid />
            <TopicsBar />

            <MinistryAbout />

            <section className="py-12">
                <ArticleFeed />
            </section>

            <ReadingOfDay />

            <section className="bg-sabiduria-bg">
                <EbooksSection />
            </section>

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <span className="text-sabiduria-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                            Estudio Destacado
                        </span>
                        <h2 className="text-4xl font-serif font-bold text-sabiduria-navy">
                            Última Enseñanza en Video
                        </h2>
                    </div>
                </div>
                <Hero />
            </section>

            <BookstorePreview />

            {/* Donation Secondary CTA */}
            <section className="bg-sabiduria-navy py-24 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-serif font-bold mb-8">Apoye la Difusión de las Verdades Eternas</h2>
                    <p className="text-sabiduria-gray brightness-150 text-xl mb-12 leading-relaxed">
                        Sabiduría para el Corazon es un ministerio que se sostiene gracias a las donaciones voluntarias de sus lectores. Su apoyo nos permite seguir creando recursos teológicos de alta calidad y acceso gratuito.
                    </p>
                    <AnimatedButton variant="gold" className="px-12 py-5 text-lg">
                        Realizar una Donación (PayPal)
                    </AnimatedButton>
                </div>
            </section>
        </main>
    );
};

export default Home;
