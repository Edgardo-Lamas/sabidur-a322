import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import content from '../data/content.json';

const TopicsBar = () => {
    return (
        <section className="bg-white border-b border-sabiduria-gray/10 py-8 sticky top-[80px] z-30 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    {/* Search Field */}
                    <div className="relative w-full lg:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sabiduria-gray" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar en la biblioteca..."
                            className="w-full bg-sabiduria-bg border-none py-3 pl-12 pr-4 text-sabiduria-navy focus:ring-2 focus:ring-sabiduria-gold rounded-sm transition-all"
                        />
                    </div>

                    {/* Popular Topics */}
                    <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto no-scrollbar pb-2 lg:pb-0">
                        <span className="text-xs font-bold text-sabiduria-navy uppercase tracking-widest whitespace-nowrap">
                            Temas Populares:
                        </span>
                        <div className="flex gap-2">
                            {content.featuredTopics.map((topic) => (
                                <Link
                                    key={topic.id}
                                    to={`/articulos?cat=${topic.name}`}
                                    className="px-4 py-1.5 bg-sabiduria-bg hover:bg-sabiduria-gold text-sabiduria-gray hover:text-white text-sm font-medium transition-all rounded-full whitespace-nowrap shadow-sm"
                                >
                                    {topic.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopicsBar;
