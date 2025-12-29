import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Package, FileText, Building2 } from 'lucide-react';
import CheckoutButton from '../components/CheckoutButton';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import content from '../data/content.json';

const ProductPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    // Find the product
    const product = content.products?.find(p => p.slug === slug);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // Redirect if product not found
    useEffect(() => {
        if (!product) {
            navigate('/tienda');
        }
    }, [product, navigate]);

    if (!product) {
        return null;
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: content.storeConfig.currency || 'ARS',
            minimumFractionDigits: 0
        }).format(price);
    };

    const category = content.productCategories?.find(cat => cat.id === product.category);

    // Get related products (same category, excluding current product)
    const relatedProducts = content.products
        ?.filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4) || [];

    const breadcrumbItems = [
        { label: 'Inicio', path: '/' },
        { label: 'Tienda', path: '/tienda' },
        { label: product.title, path: `/tienda/${product.slug}` }
    ];

    return (
        <>
            <SEO
                title={`${product.title} - ${product.author}`}
                description={product.description}
                keywords={`${product.title}, ${product.author}, ${category?.name}, literatura cristiana`}
            />

            <div className="min-h-screen bg-sabiduria-bg">
                {/* Breadcrumbs */}
                <div className="bg-white border-b border-sabiduria-navy/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <Breadcrumbs items={breadcrumbItems} />
                    </div>
                </div>

                {/* Product Details */}
                <section className="py-12 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Back Button */}
                        <Link
                            to="/tienda"
                            className="inline-flex items-center gap-2 text-sabiduria-navy hover:text-sabiduria-gold transition-colors mb-8 font-serif italic"
                        >
                            <ArrowLeft size={20} />
                            Volver a la tienda
                        </Link>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                            {/* Product Image */}
                            <div className="relative">
                                <div className="aspect-[3/4] bg-white border border-sabiduria-navy/10 overflow-hidden sticky top-8">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        {product.featured && (
                                            <span className="bg-sabiduria-gold text-white text-xs font-bold uppercase tracking-wider px-4 py-2">
                                                Destacado
                                            </span>
                                        )}
                                        {product.bestseller && (
                                            <span className="bg-sabiduria-navy text-white text-xs font-bold uppercase tracking-wider px-4 py-2">
                                                Más Vendido
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="flex flex-col">
                                {/* Category */}
                                <Link
                                    to="/tienda"
                                    className="text-xs font-bold uppercase tracking-[0.2em] text-sabiduria-gold mb-4 hover:underline inline-block"
                                >
                                    {category?.name || product.category}
                                </Link>

                                {/* Title */}
                                <h1 className="text-4xl md:text-5xl font-serif font-bold text-sabiduria-navy leading-tight mb-4">
                                    {product.title}
                                </h1>

                                {/* Author */}
                                <p className="text-xl text-sabiduria-gray font-sans italic mb-6">
                                    Por {product.author}
                                </p>

                                {/* Price */}
                                <div className="text-4xl font-serif font-bold text-sabiduria-navy mb-8 pb-8 border-b border-sabiduria-navy/10">
                                    {formatPrice(product.price)}
                                </div>

                                {/* Description */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-serif font-bold text-sabiduria-navy mb-4">
                                        Descripción
                                    </h2>
                                    <p className="text-lg text-sabiduria-gray leading-relaxed font-sans">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Product Details */}
                                <div className="bg-white border border-sabiduria-navy/10 p-6 mb-8">
                                    <h3 className="text-lg font-serif font-bold text-sabiduria-navy mb-4">
                                        Detalles del Producto
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <BookOpen className="text-sabiduria-gold mt-1 flex-shrink-0" size={20} />
                                            <div>
                                                <span className="text-sm font-bold text-sabiduria-navy">Páginas:</span>
                                                <span className="text-sm text-sabiduria-gray ml-2">{product.pages}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Package className="text-sabiduria-gold mt-1 flex-shrink-0" size={20} />
                                            <div>
                                                <span className="text-sm font-bold text-sabiduria-navy">Formato:</span>
                                                <span className="text-sm text-sabiduria-gray ml-2">{product.format}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Building2 className="text-sabiduria-gold mt-1 flex-shrink-0" size={20} />
                                            <div>
                                                <span className="text-sm font-bold text-sabiduria-navy">Editorial:</span>
                                                <span className="text-sm text-sabiduria-gray ml-2">{product.publisher}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <FileText className="text-sabiduria-gold mt-1 flex-shrink-0" size={20} />
                                            <div>
                                                <span className="text-sm font-bold text-sabiduria-navy">Categoría:</span>
                                                <span className="text-sm text-sabiduria-gray ml-2">{category?.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <CheckoutButton product={product} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="py-16 bg-white border-t border-sabiduria-navy/10">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-serif font-bold text-sabiduria-navy mb-8">
                                Productos Relacionados
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {relatedProducts.map(relatedProduct => (
                                    <ProductCard key={relatedProduct.id} product={relatedProduct} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
};

export default ProductPage;
