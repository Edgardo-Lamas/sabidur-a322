import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

import revelacion    from '../data/knowledge/revelacion.json';
import justificacion from '../data/knowledge/soteriologia-justificacion.json';
import santificacion from '../data/knowledge/soteriologia-santificacion.json';
import glorificacion from '../data/knowledge/soteriologia-glorificacion.json';

const TEMAS = [
    {
        ...revelacion,
        color:      '#3B6EA5',
        colorLight: '#3B6EA512',
        badge:      'Revelación',
        icono:      '✦',
    },
    {
        ...justificacion,
        color:      '#C5A059',
        colorLight: '#C5A05912',
        badge:      'Soteriología',
        icono:      '◆',
    },
    {
        ...santificacion,
        color:      '#4A7A5A',
        colorLight: '#4A7A5A12',
        badge:      'Soteriología',
        icono:      '▲',
    },
    {
        ...glorificacion,
        color:      '#7C5CBF',
        colorLight: '#7C5CBF12',
        badge:      'Soteriología',
        icono:      '★',
    },
];

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
const FaqItem = ({ pregunta, respuesta, color }) => {
    const [open, setOpen] = useState(false);
    return (
        <div
            className="border rounded-lg overflow-hidden"
            style={{ borderColor: `${color}30` }}
        >
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                style={{ background: open ? `${color}08` : 'white' }}
            >
                <span className="font-heading text-sm font-semibold text-sabiduria-navy leading-snug">
                    {pregunta}
                </span>
                {open
                    ? <ChevronUp size={16} style={{ color, flexShrink: 0 }} />
                    : <ChevronDown size={16} className="text-sabiduria-gray/50 flex-shrink-0" />
                }
            </button>
            {open && (
                <div className="px-5 pb-5 pt-1">
                    <p className="font-serif text-sm text-sabiduria-gray leading-relaxed">{respuesta}</p>
                </div>
            )}
        </div>
    );
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────
const GrandesTemas = () => {
    const [activo, setActivo] = useState(0);
    const tema = TEMAS[activo];
    const c = tema.contenido;

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title="Grandes Temas Bíblicos"
                description="Revelación, Justificación, Santificación y Glorificación: cuatro pilares de la fe reformada desarrollados con fundamento bíblico, aspectos clave y aplicación práctica."
                url="/grandes-temas"
            />
            <div className="max-w-5xl mx-auto px-4 pt-8">
                <Breadcrumbs title="Grandes Temas Bíblicos" />
            </div>

            {/* ─── HERO ─── */}
            <header className="bg-sabiduria-navy mt-4 py-16 md:py-20">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-sabiduria-gold/30 mb-5">
                        <BookOpen className="text-sabiduria-gold" size={24} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
                        Grandes Temas Bíblicos
                    </h1>
                    <p className="text-white/55 max-w-xl mx-auto font-serif leading-relaxed">
                        Cuatro doctrinas fundamentales desarrolladas con rigor bíblico y aplicación pastoral:
                        Revelación, Justificación, Santificación y Glorificación.
                    </p>
                </div>
            </header>

            {/* ─── TAB SELECTOR ─── */}
            <div className="sticky top-20 z-30 bg-white border-b border-sabiduria-gray/10 shadow-sm">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex overflow-x-auto scrollbar-none">
                        {TEMAS.map((t, i) => (
                            <button
                                key={t.id}
                                onClick={() => setActivo(i)}
                                className="flex-shrink-0 flex items-center gap-2.5 px-5 py-4 font-heading text-sm font-semibold transition-all border-b-2"
                                style={{
                                    borderColor:  activo === i ? t.color : 'transparent',
                                    color:        activo === i ? t.color : '#6B7280',
                                    background:   activo === i ? `${t.color}06` : 'transparent',
                                }}
                            >
                                <span style={{ fontSize: 11 }}>{t.icono}</span>
                                {t.tema}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── CONTENIDO DEL TEMA ─── */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activo}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="max-w-5xl mx-auto px-4 py-12 space-y-14"
                >

                    {/* Encabezado del tema */}
                    <div className="flex flex-col md:flex-row md:items-end gap-4 pb-8 border-b border-sabiduria-gray/15">
                        <div className="flex-1">
                            <span
                                className="inline-block font-heading text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full mb-3"
                                style={{ background: tema.colorLight, color: tema.color }}
                            >
                                {tema.badge}
                            </span>
                            <h2 className="font-serif text-3xl md:text-4xl text-sabiduria-navy leading-tight">
                                {tema.tema}
                            </h2>
                            <p className="font-serif text-sabiduria-gray text-sm mt-2">
                                {tema.referencias_clave}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tema.subtemas.map(s => (
                                <span
                                    key={s}
                                    className="font-heading text-xs px-2.5 py-1 rounded border"
                                    style={{ borderColor: `${tema.color}35`, color: tema.color }}
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Definición */}
                    <section>
                        <h3
                            className="font-heading text-xs uppercase tracking-[0.2em] font-bold mb-5"
                            style={{ color: tema.color }}
                        >
                            Definición
                        </h3>
                        <p className="font-serif text-sabiduria-navy/85 leading-[1.9] text-lg max-w-3xl">
                            {c.definicion}
                        </p>
                    </section>

                    {/* Fundamento Bíblico */}
                    <section>
                        <h3
                            className="font-heading text-xs uppercase tracking-[0.2em] font-bold mb-6"
                            style={{ color: tema.color }}
                        >
                            Fundamento Bíblico
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {c.fundamento_biblico.map((fb, i) => (
                                <div
                                    key={i}
                                    className="rounded-xl p-5 border"
                                    style={{ borderColor: `${tema.color}25`, background: tema.colorLight }}
                                >
                                    <p
                                        className="font-heading text-sm font-bold mb-2"
                                        style={{ color: tema.color }}
                                    >
                                        {fb.pasaje}
                                    </p>
                                    <p className="font-serif text-sm text-sabiduria-gray leading-relaxed">
                                        {fb.explicacion}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Aspectos Clave */}
                    <section>
                        <h3
                            className="font-heading text-xs uppercase tracking-[0.2em] font-bold mb-6"
                            style={{ color: tema.color }}
                        >
                            Aspectos Clave
                        </h3>
                        <div className="grid md:grid-cols-3 gap-5">
                            {c.aspectos_clave.map((a, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-xl border p-5 shadow-sm"
                                    style={{ borderColor: `${tema.color}20` }}
                                >
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center mb-3 font-heading text-sm font-bold"
                                        style={{ background: tema.color, color: 'white' }}
                                    >
                                        {i + 1}
                                    </div>
                                    <h4 className="font-heading text-sm font-bold text-sabiduria-navy mb-2 leading-snug">
                                        {a.titulo}
                                    </h4>
                                    <p className="font-serif text-xs text-sabiduria-gray leading-relaxed">
                                        {a.descripcion}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Aplicación Práctica */}
                    <section>
                        <h3
                            className="font-heading text-xs uppercase tracking-[0.2em] font-bold mb-6"
                            style={{ color: tema.color }}
                        >
                            Aplicación Práctica
                        </h3>
                        <div className="space-y-4">
                            {c.aplicacion_practica.map((ap, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div
                                        className="w-1 flex-shrink-0 rounded-full mt-1"
                                        style={{ background: tema.color, alignSelf: 'stretch', minHeight: 40 }}
                                    />
                                    <div>
                                        <h4 className="font-heading text-sm font-bold text-sabiduria-navy mb-1">
                                            {ap.titulo}
                                        </h4>
                                        <p className="font-serif text-sm text-sabiduria-gray leading-relaxed">
                                            {ap.descripcion}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Preguntas Frecuentes */}
                    <section>
                        <h3
                            className="font-heading text-xs uppercase tracking-[0.2em] font-bold mb-6"
                            style={{ color: tema.color }}
                        >
                            Preguntas Frecuentes
                        </h3>
                        <div className="space-y-3 max-w-3xl">
                            {c.preguntas_frecuentes.map((pf, i) => (
                                <FaqItem
                                    key={i}
                                    pregunta={pf.pregunta}
                                    respuesta={pf.respuesta}
                                    color={tema.color}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Referencias bíblicas */}
                    <section className="pb-4">
                        <h3
                            className="font-heading text-xs uppercase tracking-[0.2em] font-bold mb-4"
                            style={{ color: tema.color }}
                        >
                            Referencias Bíblicas
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {c.referencias_biblicas.map((r, i) => (
                                <span
                                    key={i}
                                    className="font-serif text-xs px-3 py-1 rounded-full border"
                                    style={{ borderColor: `${tema.color}30`, color: tema.color, background: tema.colorLight }}
                                >
                                    {r}
                                </span>
                            ))}
                        </div>
                    </section>

                </motion.div>
            </AnimatePresence>
        </main>
    );
};

export default GrandesTemas;
