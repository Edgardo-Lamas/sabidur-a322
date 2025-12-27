import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import content from '../data/content.json';

const BookstorePreview = () => {
    return (
        <section className="bg-sabiduria-bg py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-sabiduria-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                            Librería Recomendada
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-sabiduria-navy leading-tight">
                            Recursos seleccionados para tu crecimiento espiritual
                        </h2>
                    </div>
                    <a
                        href="https://example.com/shop"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold flex items-center gap-2"
                    >
                        <ShoppingBag size={18} />
                        VER TODA LA TIENDA
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {content.bookstore.map((book) => (
                        <motion.div
                            key={book.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white group overflow-hidden flex flex-col sm:flex-row shadow-2xl rounded-sm"
                        >
                            <div className="sm:w-1/2 relative overflow-hidden h-80 sm:h-auto">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-sabiduria-navy opacity-0 group-hover:opacity-20 transition-opacity" />
                            </div>
                            <div className="sm:w-1/2 p-8 flex flex-col justify-between">
                                <div>
                                    <div className="flex text-sabiduria-gold mb-4">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-sabiduria-navy mb-2 leading-tight">
                                        {book.title}
                                    </h3>
                                    <p className="text-sabiduria-gray font-medium mb-6"> {book.author} </p>
                                    <p className="text-3xl font-serif font-bold text-sabiduria-navy mb-8">
                                        ${book.price}
                                    </p>
                                </div>
                                <a
                                    href={book.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full text-center py-4 bg-sabiduria-navy text-white font-bold tracking-widest text-xs uppercase hover:bg-sabiduria-gold transition-colors duration-300"
                                >
                                    ADQUIRIR EJEMPLAR
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BookstorePreview;
