import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Quote } from 'lucide-react';
import content from '../data/content.json';

const ReadingOfDay = () => {
    const { dailyReading } = content;

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={dailyReading.backgroundImage}
                    alt="Fondo lectura"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-sabiduria-navy opacity-90 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sabiduria-navy/50 to-sabiduria-navy" />
            </div>

            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-block mb-8"
                >
                    <Quote size={48} className="text-sabiduria-gold opacity-50 mx-auto" strokeWidth={1} />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-sabiduria-gold text-xs font-bold uppercase tracking-[0.3em] mb-6"
                >
                    {dailyReading.title}
                </motion.h2>

                <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-5xl font-serif font-bold text-white mb-10 leading-tight italic"
                >
                    "{dailyReading.verse}"
                </motion.blockquote>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-sabiduria-gray brightness-150 font-serif text-xl mb-12"
                >
                    — {dailyReading.reference}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    <Link
                        to={dailyReading.link}
                        className="btn-gold px-12 py-4"
                    >
                        LEER DEVOCIONAL
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ReadingOfDay;
