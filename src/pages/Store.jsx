import React, { useState, useMemo } from 'react';
import { Store as StoreIcon, BookOpen, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import SEO from '../components/SEO';
import content from '../data/content.json';

const Store = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Filter products based on category and search
    const filteredProducts = useMemo(() => {
        let products = content.products || [];

        // Filter by category
        if (selectedCategory) {
            products = products.filter(p => p.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            products = products.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.author.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }

        return products;
    }, [selectedCategory, searchQuery]);

    // Separate featured and regular products
    const featuredProducts = filteredProducts.filter(p => p.featured);
    const regularProducts = filteredProducts.filter(p => !p.featured);

    return (
        <>
            <SEO
                title="Tienda - Literatura Bíblica"
                description="Descubre nuestra selección de Biblias, libros de teología, comentarios bíblicos y recursos ministeriales. Literatura cristiana de calidad para tu crecimiento espiritual."
                keywords="tienda cristiana, biblias, libros cristianos, teología reformada, comentarios bíblicos"
            />

            <div className="min-h-screen bg-sabiduria-bg">
                {/* Hero Section */}
                <section className="bg-gradient-to-b from-sabiduria-navy to-sabiduria-navy/95 text-white py-20 md:py-28">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto">
                            <span className="text-sabiduria-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                                Literatura Bíblica de Calidad
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight text-white">
                                Tienda de Recursos
                            </h1>
                            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-sans">
                                Biblias, libros de teología, comentarios y recursos ministeriales seleccionados
                                para fortalecer tu fe y profundizar en el conocimiento de las Escrituras.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Search Bar */}
                        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

                        {/* Category Filter */}
                        <CategoryFilter
                            categories={content.productCategories || []}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                        />

                        {/* Featured Products Section */}
                        {featuredProducts.length > 0 && !searchQuery && (
                            <div className="mb-20">
                                <div className="flex items-center gap-3 mb-8">
                                    <Sparkles className="text-sabiduria-gold" size={24} />
                                    <h2 className="text-3xl font-serif font-bold text-sabiduria-navy">
                                        Productos Destacados
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {featuredProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* All Products Section */}
                        {regularProducts.length > 0 && (
                            <div>
                                {featuredProducts.length > 0 && !searchQuery && (
                                    <div className="flex items-center gap-3 mb-8">
                                        <BookOpen className="text-sabiduria-gold" size={24} />
                                        <h2 className="text-3xl font-serif font-bold text-sabiduria-navy">
                                            Todos los Productos
                                        </h2>
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {regularProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Empty State */}
                        {filteredProducts.length === 0 && (
                            <div className="text-center py-20">
                                <StoreIcon className="mx-auto text-sabiduria-gray/30 mb-6" size={64} />
                                <h3 className="text-2xl font-serif text-sabiduria-navy mb-4">
                                    No se encontraron productos
                                </h3>
                                <p className="text-sabiduria-gray italic text-lg">
                                    {searchQuery
                                        ? 'Intenta con otros términos de búsqueda'
                                        : 'No hay productos disponibles en esta categoría'}
                                </p>
                                {(searchQuery || selectedCategory) && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedCategory(null);
                                        }}
                                        className="mt-6 btn-gold"
                                    >
                                        Ver todos los productos
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
};

export default Store;
