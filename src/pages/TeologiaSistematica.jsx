import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import knowledgeIndex from '../data/knowledge/index.json';

const nivelLabel = { basico: 'Básico', intermedio: 'Intermedio', avanzado: 'Avanzado' };
const nivelColor = {
    basico: 'text-sabiduria-gold border-sabiduria-gold/30',
    intermedio: 'text-accent-blue border-accent-blue/30',
    avanzado: 'text-sabiduria-navy border-sabiduria-navy/30',
};

const TeologiaSistematica = () => {
    const disciplinas = knowledgeIndex.documentos_teologia_sistematica;

    // Agrupar por categoría
    const porCategoria = disciplinas.reduce((acc, doc) => {
        if (!acc[doc.categoria]) acc[doc.categoria] = [];
        acc[doc.categoria].push(doc);
        return acc;
    }, {});

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title="Teología Sistemática"
                description="Fundamentos doctrinales de la fe reformada: bibliología, cristología, soteriología, escatología y más disciplinas teológicas."
                url="/teologia-sistematica"
            />

            <div className="max-w-6xl mx-auto px-4 pt-8">
                <Breadcrumbs />
            </div>

            {/* Hero */}
            <header className="bg-sabiduria-navy py-16 md:py-24 mt-4">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-sabiduria-gold/30 mb-6">
                        <BookOpen className="text-sabiduria-gold" size={28} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
                        Teología Sistemática
                    </h1>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
                        Fundamentos doctrinales de la fe reformada organizados por disciplina teológica.
                        {' '}{disciplinas.length} temas — {knowledgeIndex.estadisticas.total_pasajes_biblicos} pasajes bíblicos.
                    </p>
                </div>
            </header>

            {/* Contenido */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                {Object.entries(porCategoria).map(([categoria, docs], catIndex) => (
                    <section key={categoria} className="mb-12">
                        {docs.length > 1 && (
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-sabiduria-gold mb-6 border-b border-sabiduria-gold/20 pb-2">
                                {categoria}
                            </h2>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {docs.map((doc, i) => (
                                <motion.div
                                    key={doc.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: (catIndex * 3 + i) * 0.04 }}
                                    className="bg-white border border-sabiduria-gray/10 rounded-sm p-6 flex flex-col gap-3 hover:border-sabiduria-gold/40 hover:shadow-sm transition-all"
                                >
                                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-sabiduria-gold">
                                        {doc.categoria}
                                    </span>
                                    <h3 className="font-heading font-semibold text-sabiduria-navy text-lg leading-snug">
                                        {doc.tema}
                                    </h3>
                                    <span className={`self-start text-xs border px-2 py-0.5 rounded-sm font-medium mt-auto ${nivelColor[doc.nivel] || nivelColor.basico}`}>
                                        {nivelLabel[doc.nivel] || doc.nivel}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
};

export default TeologiaSistematica;
