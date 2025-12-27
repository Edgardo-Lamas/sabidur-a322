import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import content from '../data/content.json';

const HeroGrid = () => {
    const { main, side } = content.heroGrid;

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-6 h-[700px]">
                {/* Main Featured Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 lg:row-span-2 relative overflow-hidden group rounded-sm shadow-xl"
                >
                    <img
                        src={main.image}
                        alt={main.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sabiduria-navy via-sabiduria-navy/40 to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <span className="inline-block px-3 py-1 bg-sabiduria-gold text-sabiduria-navy text-xs font-bold uppercase tracking-widest mb-4">
                            {main.category}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
                            {main.title}
                        </h2>
                        <Link
                            to={main.link}
                            className="inline-flex items-center text-white font-medium hover:text-sabiduria-gold transition-colors"
                        >
                            LEER AHORA <span className="ml-2">→</span>
                        </Link>
                    </div>
                </motion.div>

                {/* Side Blocks */}
                {side.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * (index + 1) }}
                        className="relative overflow-hidden group rounded-sm shadow-lg h-full"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-sabiduria-navy/60 group-hover:bg-sabiduria-navy/40 transition-colors" />
                        <div className="absolute bottom-0 left-0 p-6">
                            <span className="text-sabiduria-gold text-[10px] font-bold uppercase tracking-tighter mb-2 block">
                                {item.category}
                            </span>
                            <h3 className="text-lg font-serif font-bold text-white leading-snug group-hover:text-sabiduria-gold transition-colors">
                                {item.title}
                            </h3>
                            <Link to={item.link} className="absolute inset-0 z-10" aria-label={`Ver ${item.title}`} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HeroGrid;
