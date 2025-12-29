import React from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ searchQuery, onSearchChange }) => {
    const handleClear = () => {
        onSearchChange('');
    };

    return (
        <div className="relative max-w-md mx-auto mb-12">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sabiduria-gray/50" size={20} />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Buscar por título, autor o tema..."
                    className="w-full pl-12 pr-12 py-3 border border-sabiduria-navy/20 focus:border-sabiduria-gold focus:outline-none focus:ring-2 focus:ring-sabiduria-gold/20 transition-all font-sans text-sabiduria-navy placeholder:text-sabiduria-gray/50"
                />
                <AnimatePresence>
                    {searchQuery && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={handleClear}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-sabiduria-gray/50 hover:text-sabiduria-gold transition-colors"
                        >
                            <X size={20} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SearchBar;
