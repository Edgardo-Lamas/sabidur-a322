import React from 'react';
import { motion } from 'framer-motion';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="flex flex-wrap gap-x-8 gap-y-3 mb-12 pb-6 border-b border-sabiduria-navy/10">
            {/* "Todos" option */}
            <button
                onClick={() => onSelectCategory(null)}
                className={`text-sm md:text-base font-serif italic transition-colors relative ${selectedCategory === null
                        ? 'text-sabiduria-gold font-medium'
                        : 'text-sabiduria-navy/60 hover:text-sabiduria-navy'
                    }`}
            >
                Todos
                {selectedCategory === null && (
                    <motion.span
                        layoutId="categoryUnderline"
                        className="absolute -bottom-3 left-0 w-full h-0.5 bg-sabiduria-gold"
                    />
                )}
            </button>

            {/* Category options */}
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onSelectCategory(category.id)}
                    className={`text-sm md:text-base font-serif italic transition-colors relative ${selectedCategory === category.id
                            ? 'text-sabiduria-gold font-medium'
                            : 'text-sabiduria-navy/60 hover:text-sabiduria-navy'
                        }`}
                >
                    {category.name}
                    {selectedCategory === category.id && (
                        <motion.span
                            layoutId="categoryUnderline"
                            className="absolute -bottom-3 left-0 w-full h-0.5 bg-sabiduria-gold"
                        />
                    )}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
