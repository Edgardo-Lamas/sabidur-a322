import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import content from '../data/content.json';

const ProductCard = ({ product }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: content.storeConfig.currency || 'ARS',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="group flex flex-col bg-white border border-sabiduria-navy/10 hover:border-sabiduria-gold/50 transition-all duration-300 shadow-sm hover:shadow-xl"
        >
            {/* Product Image */}
            <Link to={`/tienda/${product.slug}`} className="relative overflow-hidden aspect-[3/4] bg-sabiduria-bg">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.featured && (
                        <span className="bg-sabiduria-gold text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5">
                            Destacado
                        </span>
                    )}
                    {product.bestseller && (
                        <span className="bg-sabiduria-navy text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5">
                            Más Vendido
                        </span>
                    )}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-sabiduria-navy/0 group-hover:bg-sabiduria-navy/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Eye className="text-sabiduria-gold" size={32} />
                </div>
            </Link>

            {/* Product Info */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Category */}
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sabiduria-gold mb-2">
                    {content.productCategories.find(cat => cat.id === product.category)?.name || product.category}
                </span>

                {/* Title */}
                <h3 className="text-xl font-serif text-sabiduria-navy leading-tight mb-2 group-hover:text-sabiduria-gold transition-colors line-clamp-2 min-h-[3.5rem]">
                    <Link to={`/tienda/${product.slug}`}>
                        {product.title}
                    </Link>
                </h3>

                {/* Author */}
                <p className="text-sm text-sabiduria-gray/80 font-sans italic mb-4">
                    {product.author}
                </p>

                {/* Price & CTA */}
                <div className="mt-auto pt-4 border-t border-sabiduria-navy/10">
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-serif font-bold text-sabiduria-navy">
                            {formatPrice(product.price)}
                        </span>
                        <Link
                            to={`/tienda/${product.slug}`}
                            className="bg-sabiduria-gold text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-sabiduria-navy transition-colors flex items-center gap-2"
                        >
                            Ver Detalles
                        </Link>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

export default ProductCard;
