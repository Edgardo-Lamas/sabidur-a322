import { useState, useEffect } from 'react';
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
    BookOpen, FileText, Users, Map, Library, ShoppingBag,
    Layers, BookMarked, TrendingUp, Star, Zap, Heart, Youtube, Play,
    Search, Eye, ExternalLink, Globe,
} from 'lucide-react';
import SEO from '../components/SEO';
import content from '../data/content.json';
import textos from '../data/textos.json';

// ─── DATOS DEL SITIO (reales, desde JSON) ────────────────────────────────────
const SITE_STATS = {
    articulos:      content.articles?.length          ?? 0,
    ensayos:        textos.ensayos?.length             ?? 0,
    lecturas:       content.dailyReadings?.length      ?? 0,
    productos:      content.products?.length           ?? 0,
    estudios:       content.estudios?.length           ?? 0,
    historias:      4,
    perfecciones:   4,
    biografias:     12,   // 5 padres + 5 prereform + reformadores
    mapas:          2,
    bases:          32,   // archivos knowledge/
};

// ─── DATOS DEMO para Vercel Analytics (se reemplazarán con API real) ─────────
const TRAFFIC_DATA = [
    { mes: 'Ene', visitas: 210, usuarios: 175 },
    { mes: 'Feb', visitas: 280, usuarios: 230 },
    { mes: 'Mar', visitas: 340, usuarios: 290 },
    { mes: 'Abr', visitas: 410, usuarios: 355 },
    { mes: 'May', visitas: 520, usuarios: 440 },
    { mes: 'Jun', visitas: 490, usuarios: 420 },
];

const PAGES_DATA = [
    { page: 'Inicio',           visitas: 520 },
    { page: 'Historias',        visitas: 390 },
    { page: 'Artículos',        visitas: 310 },
    { page: 'Perfecciones',     visitas: 275 },
    { page: 'Biógrafías',       visitas: 220 },
    { page: 'Ensayos',          visitas: 185 },
    { page: 'Mapas',            visitas: 160 },
    { page: 'Biblioteca',       visitas: 140 },
];

const HISTORIAS_DATA = [
    { name: 'El Ancla',          value: 185, fill: '#5B7FA6' },
    { name: 'El Dios que Me Ve', value: 142, fill: '#6A5B9E' },
    { name: '¿Quién Soy?',       value: 128, fill: '#C5A059' },
    { name: 'El Fracaso',        value: 97,  fill: '#B05A20' },
];

const CONTENT_PIE = [
    { name: 'Lecturas diarias', value: SITE_STATS.lecturas,   fill: '#C5A059' },
    { name: 'Bases teológicas', value: SITE_STATS.bases,      fill: '#3B5375' },
    { name: 'Biografías',       value: SITE_STATS.biografias, fill: '#6A5B9E' },
    { name: 'Ensayos',          value: SITE_STATS.ensayos,    fill: '#4A7A5A' },
    { name: 'Artículos',        value: SITE_STATS.articulos,  fill: '#A0522D' },
    { name: 'Historias',        value: SITE_STATS.historias,  fill: '#B05A20' },
];

const GOLD = '#C5A059';
const NAVY = '#1E3A5F';

const YT_GEO = [
    { country: 'México',    flag: '🇲🇽', pct: 45, color: '#C5A059' },
    { country: 'EE.UU.',   flag: '🇺🇸', pct: 28, color: '#3B5375' },
    { country: 'Argentina', flag: '🇦🇷', pct: 15, color: '#6A5B9E' },
    { country: 'Otros',     flag: '🌎',  pct: 12, color: '#9ca3af' },
];

// ─── TOOLTIP CUSTOM ──────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-sabiduria-gray/15 shadow-lg rounded-lg px-4 py-3 text-sm">
            {label && <p className="font-heading font-semibold text-sabiduria-navy mb-1">{label}</p>}
            {payload.map((p, i) => (
                <p key={i} style={{ color: p.color ?? GOLD }} className="font-serif">
                    {p.name}: <span className="font-semibold">{p.value.toLocaleString()}</span>
                </p>
            ))}
        </div>
    );
};

// ─── STAT CARD ───────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, sub, color = GOLD }) => (
    <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="p-2.5 rounded-lg" style={{ background: `${color}18` }}>
            <Icon size={22} style={{ color }} />
        </div>
        <div>
            <p className="font-heading text-2xl font-bold text-sabiduria-navy leading-none mb-0.5">
                {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            <p className="font-heading text-xs font-semibold text-sabiduria-gray uppercase tracking-wider">{label}</p>
            {sub && <p className="font-serif text-xs text-sabiduria-gray/60 mt-0.5">{sub}</p>}
        </div>
    </div>
);

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
const SectionHeader = ({ title, sub }) => (
    <div className="mb-6">
        <h2 className="font-heading font-bold text-sabiduria-navy text-xl">{title}</h2>
        {sub && <p className="font-serif text-sabiduria-gray text-sm mt-0.5">{sub}</p>}
    </div>
);

// ─── COMPONENT ───────────────────────────────────────────────────────────────
const Panel = () => {
    const [tab, setTab] = useState('overview');
    const [analytics, setAnalytics] = useState(null); // null = loading, obj = loaded
    const [ytStats, setYtStats] = useState(null);
    const [gscData, setGscData] = useState(null);

    useEffect(() => {
        fetch('/api/analytics')
            .then(r => r.json())
            .then(setAnalytics)
            .catch(() => setAnalytics({ live: false, error: 'No se pudo conectar' }));
        fetch('/api/youtube-stats')
            .then(r => r.json())
            .then(setYtStats)
            .catch(() => setYtStats({ live: false }));
        fetch('/api/search-console')
            .then(r => r.json())
            .then(setGscData)
            .catch(() => setGscData({ live: false }));
    }, []);

    const totalContent =
        SITE_STATS.articulos + SITE_STATS.ensayos + SITE_STATS.lecturas +
        SITE_STATS.historias + SITE_STATS.perfecciones + SITE_STATS.biografias;

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO title="Panel de métricas — Sabiduría para el Corazón" />

            {/* Header */}
            <div style={{ background: NAVY }} className="px-6 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-1">
                        <TrendingUp size={22} className="text-sabiduria-gold" />
                        <h1 className="font-heading font-bold text-white text-2xl">Panel del sitio</h1>
                    </div>
                    <p className="font-serif text-white/55 text-sm">
                        Sabiduría para el Corazón · Estadísticas y contenido publicado
                    </p>

                    {/* Tabs */}
                    <div className="flex gap-2 mt-6">
                        {[
                            { id: 'overview', label: 'Resumen' },
                            { id: 'traffic',  label: 'Audiencia' },
                            { id: 'content',  label: 'Contenido' },
                        { id: 'youtube',  label: 'YouTube' },
                        { id: 'seo',      label: 'SEO' },
                        ].map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id)}
                                className="font-heading text-sm font-semibold px-4 py-2 rounded-lg transition-all"
                                style={{
                                    background: tab === t.id ? GOLD : 'rgba(255,255,255,0.08)',
                                    color: tab === t.id ? NAVY : 'rgba(255,255,255,0.65)',
                                }}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

                {/* ── TAB: RESUMEN ── */}
                {tab === 'overview' && (
                    <div className="space-y-10">

                        {/* KPIs principales */}
                        <div>
                            <SectionHeader title="Estado del sitio" sub="Contenido publicado a la fecha" />
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <StatCard icon={FileText}    label="Artículos"          value={SITE_STATS.articulos}     sub="Teología aplicada" />
                                <StatCard icon={BookOpen}    label="Ensayos"            value={SITE_STATS.ensayos}       sub="Reflexión profunda" color="#6A5B9E" />
                                <StatCard icon={Heart}       label="Historias"          value={SITE_STATS.historias}     sub="Para jóvenes" color="#B05A20" />
                                <StatCard icon={Star}        label="Perfecciones"       value={`${SITE_STATS.perfecciones}/14`} sub="Capítulos publicados" color="#4A7A5A" />
                                <StatCard icon={Users}       label="Biografías"         value={SITE_STATS.biografias}    sub="Padres, reform." color="#3B5375" />
                                <StatCard icon={BookMarked}  label="Lecturas diarias"   value={SITE_STATS.lecturas}      sub="Plan de lectura" />
                                <StatCard icon={Layers}      label="Bases teológicas"   value={SITE_STATS.bases}         sub="Teología sistemática" color="#6A5B9E" />
                                <StatCard icon={Map}         label="Mapas bíblicos"     value={SITE_STATS.mapas}         sub="Recorridos interactivos" color="#4A7A5A" />
                            </div>
                        </div>

                        {/* Total y barra de progreso de la serie */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                                <p className="font-heading text-xs uppercase tracking-widest text-sabiduria-gray mb-3">
                                    Total de piezas publicadas
                                </p>
                                <p className="font-heading text-5xl font-bold text-sabiduria-navy mb-1">
                                    {totalContent}
                                </p>
                                <p className="font-serif text-sabiduria-gray text-sm">
                                    Entre artículos, ensayos, historias, capítulos, lecturas y biografías.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                                <p className="font-heading text-xs uppercase tracking-widest text-sabiduria-gray mb-4">
                                    Serie Las Perfecciones de Dios
                                </p>
                                <div className="flex items-end gap-3 mb-3">
                                    <p className="font-heading text-4xl font-bold text-sabiduria-navy">
                                        {SITE_STATS.perfecciones}
                                    </p>
                                    <p className="font-serif text-sabiduria-gray mb-1">de 14 capítulos</p>
                                </div>
                                <div className="w-full bg-sabiduria-gray/10 rounded-full h-2.5 mb-2">
                                    <div
                                        className="h-2.5 rounded-full transition-all"
                                        style={{
                                            width: `${(SITE_STATS.perfecciones / 14) * 100}%`,
                                            background: `linear-gradient(90deg, ${GOLD}, #D4B070)`,
                                        }}
                                    />
                                </div>
                                <p className="font-serif text-xs text-sabiduria-gray/60">
                                    {Math.round((SITE_STATS.perfecciones / 14) * 100)}% completado
                                </p>
                            </div>
                        </div>

                        {/* Distribución de contenido — Pie */}
                        <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                            <SectionHeader
                                title="Distribución del contenido"
                                sub="Proporción por tipo de recurso"
                            />
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <ResponsiveContainer width={220} height={220}>
                                    <PieChart>
                                        <Pie
                                            data={CONTENT_PIE}
                                            cx="50%" cy="50%"
                                            innerRadius={55} outerRadius={95}
                                            paddingAngle={3}
                                            dataKey="value"
                                        >
                                            {CONTENT_PIE.map((entry, i) => (
                                                <Cell key={i} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-3 flex-1">
                                    {CONTENT_PIE.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2.5">
                                            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.fill }} />
                                            <div>
                                                <p className="font-heading text-sm font-semibold text-sabiduria-navy">{item.value}</p>
                                                <p className="font-serif text-xs text-sabiduria-gray">{item.name}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Canal de YouTube — resumen */}
                        <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="font-heading font-bold text-sabiduria-navy text-xl flex items-center gap-2">
                                    <Youtube size={18} className="text-red-500" />
                                    Canal de YouTube
                                </h2>
                                <button
                                    onClick={() => setTab('youtube')}
                                    className="font-heading text-xs font-semibold text-sabiduria-gold hover:underline"
                                >
                                    Ver detalle →
                                </button>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-4 rounded-lg bg-red-50 border border-red-100">
                                    <p className="font-heading text-3xl font-bold text-sabiduria-navy">
                                        {(ytStats?.live ? ytStats.subscribers : 3000).toLocaleString()}
                                    </p>
                                    <p className="font-heading text-xs font-semibold text-sabiduria-gray uppercase tracking-wider mt-1">Suscriptores</p>
                                </div>
                                <div className="text-center p-4 rounded-lg" style={{ background: `${GOLD}10`, border: `1px solid ${GOLD}30` }}>
                                    <p className="font-heading text-3xl font-bold text-sabiduria-navy">
                                        {(ytStats?.live ? ytStats.totalViews : 710000).toLocaleString()}
                                    </p>
                                    <p className="font-heading text-xs font-semibold text-sabiduria-gray uppercase tracking-wider mt-1">Visualizaciones</p>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-sabiduria-gray/5 border border-sabiduria-gray/10">
                                    <p className="font-heading text-xl font-bold text-sabiduria-navy leading-tight pt-1">
                                        🇲🇽 · 🇺🇸 · 🇦🇷
                                    </p>
                                    <p className="font-heading text-xs font-semibold text-sabiduria-gray uppercase tracking-wider mt-1">Top países</p>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                {/* ── TAB: AUDIENCIA ── */}
                {tab === 'traffic' && (
                    <div className="space-y-10">

                        {analytics?.live ? (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4 flex gap-3">
                                <Zap size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-heading text-sm font-semibold text-emerald-800">
                                        Conectado a Vercel — {analytics.projectName ?? 'proyecto'}
                                    </p>
                                    <p className="font-serif text-xs text-emerald-700 mt-0.5">
                                        {analytics.totals?.visitas > 0
                                            ? <>{analytics.totals.visitas.toLocaleString()} páginas vistas en los últimos 30 días. El gráfico de secciones usa datos reales.</>
                                            : analytics.analyticsNote
                                                ? <>Web Analytics aún sin datos suficientes — el gráfico usa proyecciones de referencia.</>
                                                : <>Datos de proyecto cargados. Web Analytics activo.</>
                                        }
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex gap-3">
                                <Zap size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-heading text-sm font-semibold text-amber-800">
                                        {analytics === null ? 'Cargando métricas…' : 'Vercel Analytics — pendiente de configuración'}
                                    </p>
                                    <p className="font-serif text-xs text-amber-700 mt-0.5">
                                        {analytics?.error
                                            ? <><strong>{analytics.error}</strong>. Crear token en <strong>vercel.com → Settings → Tokens</strong> y guardarlo como <code>VERCEL_TOKEN</code> en las variables de entorno del proyecto.</>
                                            : <>Los gráficos muestran proyecciones de referencia. Para datos reales, configurar <code>VERCEL_TOKEN</code> en Vercel → Project Settings → Environment Variables.</>
                                        }
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Deployments recientes */}
                        {analytics?.live && analytics.recentDeploys?.length > 0 && (
                            <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                                <SectionHeader title="Deployments recientes" sub="Últimas publicaciones en producción" />
                                <div className="space-y-2">
                                    {analytics.recentDeploys.map((d, i) => (
                                        <div key={i} className="flex items-start justify-between gap-4 py-2.5 border-b border-sabiduria-gray/8 last:border-0">
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <span className="w-2 h-2 rounded-full flex-shrink-0"
                                                    style={{ background: d.state === 'READY' ? '#10b981' : d.state === 'ERROR' ? '#ef4444' : GOLD }} />
                                                <p className="font-serif text-sm text-sabiduria-navy truncate">{d.commit || d.url}</p>
                                            </div>
                                            <span className="font-heading text-xs text-sabiduria-gray flex-shrink-0">{d.fecha}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tráfico mensual */}
                        <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                            <SectionHeader title="Tráfico mensual" sub="Visitas y usuarios únicos (proyección)" />
                            <ResponsiveContainer width="100%" height={260}>
                                <AreaChart data={TRAFFIC_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="gradVisitas" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%"  stopColor={GOLD}  stopOpacity={0.25} />
                                            <stop offset="95%" stopColor={GOLD}  stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="gradUsuarios" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%"  stopColor={NAVY}  stopOpacity={0.2} />
                                            <stop offset="95%" stopColor={NAVY}  stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="mes" tick={{ fontSize: 12, fontFamily: 'var(--font-sans)' }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Area type="monotone" dataKey="visitas"  name="Visitas"  stroke={GOLD} fill="url(#gradVisitas)"  strokeWidth={2} />
                                    <Area type="monotone" dataKey="usuarios" name="Usuarios" stroke={NAVY} fill="url(#gradUsuarios)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Páginas más visitadas */}
                        <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                            <SectionHeader
                                title="Secciones más visitadas"
                                sub={analytics?.live ? 'Pageviews reales — últimos 30 días' : 'Pageviews por sección (proyección)'}
                            />
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={analytics?.live ? analytics.pages : PAGES_DATA} layout="vertical" margin={{ left: 20, right: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                                    <XAxis type="number" tick={{ fontSize: 11 }} />
                                    <YAxis type="category" dataKey="page" tick={{ fontSize: 12, fontFamily: 'var(--font-sans)' }} width={80} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="visitas" name="Visitas" fill={GOLD} radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Historias para jóvenes */}
                        <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                            <SectionHeader title="Historias para Jóvenes" sub="Lecturas por historia (proyección)" />
                            <div className="space-y-3">
                                {HISTORIAS_DATA.map((h, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <p className="font-serif text-sm text-sabiduria-gray w-40 flex-shrink-0">{h.name}</p>
                                        <div className="flex-1 bg-sabiduria-gray/8 rounded-full h-5 overflow-hidden">
                                            <div
                                                className="h-full rounded-full flex items-center justify-end pr-2 transition-all"
                                                style={{
                                                    width: `${(h.value / HISTORIAS_DATA[0].value) * 100}%`,
                                                    background: h.fill,
                                                }}
                                            >
                                                <span className="font-heading text-xs font-bold text-white">{h.value}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )}

                {/* ── TAB: CONTENIDO ── */}
                {tab === 'content' && (
                    <div className="space-y-10">

                        {/* Artículos */}
                        <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                            <SectionHeader title="Artículos publicados" sub={`${SITE_STATS.articulos} artículos en total`} />
                            <div className="space-y-2">
                                {content.articles?.slice(0, 8).map((a, i) => (
                                    <div key={i} className="flex items-center justify-between py-2.5 border-b border-sabiduria-gray/8 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <span className="font-heading text-xs text-sabiduria-gray/40 w-5">{i + 1}</span>
                                            <div>
                                                <p className="font-heading text-sm font-semibold text-sabiduria-navy">{a.title}</p>
                                                {a.category && (
                                                    <p className="font-serif text-xs text-sabiduria-gray/60">{a.category}</p>
                                                )}
                                            </div>
                                        </div>
                                        <span
                                            className="font-heading text-xs font-semibold px-2.5 py-1 rounded-full"
                                            style={{ background: `${GOLD}18`, color: GOLD }}
                                        >
                                            {a.readTime ?? '5 min'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Ensayos */}
                        <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                            <SectionHeader title="Ensayos publicados" sub={`${SITE_STATS.ensayos} ensayos en total`} />
                            <div className="space-y-2">
                                {textos.ensayos?.slice(0, 8).map((e, i) => (
                                    <div key={i} className="flex items-center gap-3 py-2.5 border-b border-sabiduria-gray/8 last:border-0">
                                        <span className="font-heading text-xs text-sabiduria-gray/40 w-5">{i + 1}</span>
                                        <p className="font-heading text-sm font-semibold text-sabiduria-navy">{e.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Historias para jóvenes */}
                        <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                            <SectionHeader title="Historias para Jóvenes" sub="4 historias publicadas" />
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { titulo: 'El Ancla y la Tormenta',           tema: 'Ansiedad',       ref: 'Sal 46',    color: '#5B7FA6' },
                                    { titulo: 'El Dios que Me Ve',                tema: 'Soledad',        ref: 'Gén 16:13', color: '#6A5B9E' },
                                    { titulo: '¿Quién Soy Yo?',                   tema: 'Identidad',      ref: 'Gén 1:27',  color: '#C5A059' },
                                    { titulo: 'El Fracaso y la 2ª Oportunidad',   tema: 'Restauración',   ref: 'Jn 21',     color: '#B05A20' },
                                ].map((h, i) => (
                                    <div key={i} className="rounded-lg p-4 border" style={{ borderColor: `${h.color}30`, background: `${h.color}08` }}>
                                        <div className="w-2 h-2 rounded-full mb-3" style={{ background: h.color }} />
                                        <p className="font-heading text-sm font-bold text-sabiduria-navy leading-snug mb-1">{h.titulo}</p>
                                        <p className="font-serif text-xs text-sabiduria-gray">{h.tema} · {h.ref}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Perfecciones de Dios */}
                        <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                            <SectionHeader title="Las Perfecciones de Dios" sub="Serie de 14 capítulos" />
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {[
                                    { n: 1, titulo: 'El Amor',           disponible: true },
                                    { n: 2, titulo: 'La Eternidad',      disponible: true },
                                    { n: 3, titulo: 'La Santidad',       disponible: true },
                                    { n: 4, titulo: 'La Inmutabilidad',  disponible: true },
                                    ...Array.from({ length: 10 }, (_, i) => ({ n: i + 5, titulo: `Capítulo ${i + 5}`, disponible: false })),
                                ].map((c, i) => (
                                    <div
                                        key={i}
                                        className="rounded-lg px-3 py-2.5 border text-sm flex items-center gap-2"
                                        style={{
                                            borderColor: c.disponible ? `${GOLD}40` : '#e5e7eb',
                                            background:  c.disponible ? `${GOLD}10` : '#fafafa',
                                        }}
                                    >
                                        <span
                                            className="font-heading text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                            style={{ background: c.disponible ? GOLD : '#d1d5db', color: 'white' }}
                                        >
                                            {c.n}
                                        </span>
                                        <span
                                            className="font-serif text-xs"
                                            style={{ color: c.disponible ? NAVY : '#9ca3af' }}
                                        >
                                            {c.titulo}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )}

                {/* ── TAB: YOUTUBE ── */}
                {tab === 'youtube' && (
                    <div className="space-y-10">

                        {/* KPI Cards */}
                        <div>
                            <SectionHeader title="Canal de YouTube" sub="@SabiduriaparaelCorazon-322 · estadísticas en tiempo real" />
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <StatCard
                                    icon={Youtube}
                                    label="Suscriptores"
                                    value={ytStats?.live ? ytStats.subscribers : 3000}
                                    sub={ytStats?.live ? 'en tiempo real' : 'aprox.'}
                                    color="#ef4444"
                                />
                                <StatCard
                                    icon={TrendingUp}
                                    label="Visualizaciones"
                                    value={ytStats?.live ? ytStats.totalViews : 710000}
                                    sub={ytStats?.live ? 'en tiempo real' : 'aprox.'}
                                />
                                <StatCard
                                    icon={FileText}
                                    label="Videos"
                                    value={ytStats?.videoCount ?? '—'}
                                    sub="publicados"
                                    color="#3B5375"
                                />
                                <StatCard
                                    icon={Map}
                                    label="Ranking #1"
                                    value="México"
                                    sub="país con más vistas"
                                    color="#4A7A5A"
                                />
                            </div>
                        </div>

                        {/* Audiencia geográfica */}
                        <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                            <SectionHeader title="Audiencia por país" sub="Distribución de visualizaciones — datos del canal" />
                            <div className="space-y-4">
                                {YT_GEO.map((g, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <span className="text-2xl w-8 flex-shrink-0">{g.flag}</span>
                                        <p className="font-serif text-sm text-sabiduria-gray w-24 flex-shrink-0">{g.country}</p>
                                        <div className="flex-1 bg-sabiduria-gray/8 rounded-full h-5 overflow-hidden">
                                            <div
                                                className="h-full rounded-full flex items-center justify-end pr-3 transition-all"
                                                style={{ width: `${g.pct}%`, background: g.color }}
                                            >
                                                <span className="font-heading text-xs font-bold text-white">{g.pct}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <p className="font-serif text-xs text-sabiduria-gray/50 mt-2">
                                    * Distribución aproximada según analytics del canal.
                                </p>
                            </div>
                        </div>

                        {/* Top videos más vistos */}
                        {ytStats?.live && ytStats.topVideos?.length > 0 ? (
                            <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                                <SectionHeader title="Videos más vistos" sub="Por total de visualizaciones" />
                                <div className="space-y-1">
                                    {ytStats.topVideos.map((v, i) => (
                                        <a
                                            key={v.id}
                                            href={`https://www.youtube.com/watch?v=${v.id}`}
                                            target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-4 py-2.5 border-b border-sabiduria-gray/8 last:border-0 hover:bg-sabiduria-gray/3 rounded-lg px-2 transition-colors group"
                                        >
                                            <span className="font-heading text-sm font-bold text-sabiduria-gray/40 w-6 flex-shrink-0">#{i + 1}</span>
                                            {v.thumbnail && (
                                                <img src={v.thumbnail} alt="" className="w-20 h-12 object-cover rounded flex-shrink-0" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-heading text-sm font-semibold text-sabiduria-navy truncate group-hover:text-sabiduria-gold transition-colors">
                                                    {v.title}
                                                </p>
                                                <p className="font-serif text-xs text-sabiduria-gray">
                                                    {v.views.toLocaleString()} vistas
                                                    {v.likes > 0 && <> · {v.likes.toLocaleString()} likes</>}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-8 shadow-sm text-center">
                                <Youtube size={32} className="text-red-300 mx-auto mb-3" />
                                <p className="font-heading text-sm font-semibold text-sabiduria-gray">
                                    {ytStats === null ? 'Cargando videos…' : 'Configurar YOUTUBE_API_KEY en Vercel para ver el ranking de videos'}
                                </p>
                                <a
                                    href="https://www.youtube.com/@SabiduriaparaelCorazon-322"
                                    target="_blank" rel="noopener noreferrer"
                                    className="inline-block mt-3 font-heading text-xs font-semibold text-red-600 hover:underline"
                                >
                                    Ver canal en YouTube ↗
                                </a>
                            </div>
                        )}

                        {/* Últimos videos */}
                        {ytStats?.live && ytStats.recentVideos?.length > 0 && (
                            <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                                <SectionHeader title="Últimos videos publicados" sub="Publicaciones recientes del canal" />
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {ytStats.recentVideos.map(v => (
                                        <a
                                            key={v.id}
                                            href={`https://www.youtube.com/watch?v=${v.id}`}
                                            target="_blank" rel="noopener noreferrer"
                                            className="group rounded-lg overflow-hidden border border-sabiduria-gray/10 hover:border-sabiduria-gold/30 transition-all"
                                        >
                                            <div className="relative">
                                                {v.thumbnail && (
                                                    <img src={v.thumbnail} alt="" className="w-full h-32 object-cover" />
                                                )}
                                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Play size={28} className="text-white" fill="white" />
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <p className="font-heading text-xs font-semibold text-sabiduria-navy line-clamp-2 group-hover:text-sabiduria-gold transition-colors">
                                                    {v.title}
                                                </p>
                                                <p className="font-serif text-xs text-sabiduria-gray mt-1">
                                                    {v.views.toLocaleString()} vistas · {new Date(v.publishedAt).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                )}

                {/* ── TAB: SEO ── */}
                {tab === 'seo' && (
                    <div className="space-y-10">

                        {gscData?.live ? (
                            <>
                                {/* KPI Cards */}
                                <div>
                                    <SectionHeader
                                        title="Rendimiento en Google"
                                        sub={`Últimos 28 días · ${gscData.period}`}
                                    />
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <StatCard icon={Search}     label="Clics"           value={gscData.totals.clicks}                    sub="desde Google" />
                                        <StatCard icon={Eye}        label="Impresiones"      value={gscData.totals.impressions}               sub="veces mostrado" color="#3B5375" />
                                        <StatCard icon={TrendingUp} label="CTR"              value={`${gscData.totals.ctr.toFixed(1)}%`}      sub="tasa de clic"   color="#4A7A5A" />
                                        <StatCard icon={Star}       label="Posición media"   value={gscData.totals.position.toFixed(1)}       sub="en resultados"  color="#6A5B9E" />
                                    </div>
                                </div>

                                {/* Gráfico de tendencia diaria */}
                                {gscData.daily?.length > 0 && (
                                    <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                                        <SectionHeader title="Tendencia diaria" sub="Clics e impresiones en Google (últimos 28 días)" />
                                        <ResponsiveContainer width="100%" height={240}>
                                            <AreaChart data={gscData.daily} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="gradClics" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%"  stopColor={GOLD} stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor={GOLD} stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="gradImpr" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%"  stopColor={NAVY} stopOpacity={0.2} />
                                                        <stop offset="95%" stopColor={NAVY} stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={d => d.slice(5)} />
                                                <YAxis tick={{ fontSize: 11 }} />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Legend />
                                                <Area type="monotone" dataKey="clicks"      name="Clics"        stroke={GOLD} fill="url(#gradClics)" strokeWidth={2} />
                                                <Area type="monotone" dataKey="impressions" name="Impresiones"  stroke={NAVY} fill="url(#gradImpr)"  strokeWidth={2} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                )}

                                {/* Top queries + Top páginas */}
                                <div className="grid md:grid-cols-2 gap-6">

                                    {/* Top consultas */}
                                    <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                                        <SectionHeader title="Top consultas" sub="Palabras clave que te encuentran" />
                                        <div className="space-y-1">
                                            {gscData.queries.map((q, i) => {
                                                const posColor = q.position <= 3 ? '#4A7A5A' : q.position <= 10 ? GOLD : '#9ca3af';
                                                return (
                                                    <div key={i} className="flex items-center justify-between py-2 border-b border-sabiduria-gray/8 last:border-0 gap-3">
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <span className="font-heading text-xs text-sabiduria-gray/40 w-5 flex-shrink-0">#{i+1}</span>
                                                            <p className="font-serif text-sm text-sabiduria-navy truncate">{q.query}</p>
                                                        </div>
                                                        <div className="flex items-center gap-3 flex-shrink-0">
                                                            <span className="font-heading text-xs text-sabiduria-gray">{q.clicks} clics</span>
                                                            <span
                                                                className="font-heading text-xs font-bold px-1.5 py-0.5 rounded"
                                                                style={{ color: posColor, background: `${posColor}18` }}
                                                            >
                                                                #{q.position}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Top páginas */}
                                    <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                                        <SectionHeader title="Top páginas" sub="Las más vistas desde Google" />
                                        <div className="space-y-1">
                                            {gscData.pages.map((p, i) => (
                                                <div key={i} className="flex items-center justify-between py-2 border-b border-sabiduria-gray/8 last:border-0 gap-3">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <span className="font-heading text-xs text-sabiduria-gray/40 w-5 flex-shrink-0">#{i+1}</span>
                                                        <p className="font-serif text-sm text-sabiduria-navy truncate">{p.page || '/'}</p>
                                                    </div>
                                                    <div className="flex items-center gap-3 flex-shrink-0 text-right">
                                                        <span className="font-heading text-xs text-sabiduria-gray">{p.clicks} clics</span>
                                                        <span className="font-heading text-xs text-sabiduria-gray/50">{p.impressions} imp.</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Países */}
                                {gscData.countries?.length > 0 && (
                                    <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                                        <SectionHeader title="Países" sub="Top países por clics desde Google Search" />
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                            {gscData.countries.map((c, i) => (
                                                <div key={i} className="text-center p-4 rounded-lg bg-sabiduria-gray/3 border border-sabiduria-gray/8">
                                                    <Globe size={16} className="mx-auto mb-2 text-sabiduria-gray/40" />
                                                    <p className="font-heading text-lg font-bold text-sabiduria-navy">{c.clicks}</p>
                                                    <p className="font-heading text-xs text-sabiduria-gray uppercase tracking-wider mt-0.5">{c.country}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            /* ── Sin configurar: instrucciones paso a paso ── */
                            <div className="space-y-6">
                                <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-5 flex gap-4">
                                    <Search size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-heading text-sm font-semibold text-amber-800 mb-1">
                                            {gscData === null ? 'Conectando con Google Search Console…' : 'Search Console no conectado al dashboard'}
                                        </p>
                                        <p className="font-serif text-xs text-amber-700">
                                            {gscData?.error
                                                ? `Error: ${gscData.error}`
                                                : 'Seguí los pasos de abajo para ver clics reales, palabras clave y posición en Google.'}
                                        </p>
                                    </div>
                                </div>

                                {gscData !== null && (
                                    <div className="bg-white rounded-xl border border-sabiduria-gray/10 p-6 shadow-sm">
                                        <h3 className="font-heading font-bold text-sabiduria-navy text-lg mb-6">
                                            Configurar en 4 pasos
                                        </h3>
                                        <div className="space-y-6">
                                            {[
                                                {
                                                    n: '1',
                                                    title: 'Activar la API en Google Cloud',
                                                    desc: 'Ir a console.cloud.google.com → APIs y servicios → Habilitar APIs → buscar "Google Search Console API" → Habilitar.',
                                                    link: 'https://console.cloud.google.com/apis/library/searchconsole.googleapis.com',
                                                    linkLabel: 'Abrir Google Cloud Console →',
                                                },
                                                {
                                                    n: '2',
                                                    title: 'Crear una cuenta de servicio',
                                                    desc: 'En Google Cloud → IAM y administración → Cuentas de servicio → Crear cuenta de servicio. Dale un nombre (ej: "dashboard-spc"). Crear clave JSON → descargar el archivo .json.',
                                                    link: 'https://console.cloud.google.com/iam-admin/serviceaccounts',
                                                    linkLabel: 'Abrir cuentas de servicio →',
                                                },
                                                {
                                                    n: '3',
                                                    title: 'Agregar la cuenta en Search Console',
                                                    desc: 'En Google Search Console → Configuración → Usuarios y permisos → Agregar usuario. Pegar el email de la cuenta de servicio (termina en @...gserviceaccount.com). Rol: Propietario restringido.',
                                                    link: 'https://search.google.com/search-console/users',
                                                    linkLabel: 'Abrir permisos en GSC →',
                                                },
                                                {
                                                    n: '4',
                                                    title: 'Agregar la variable en Vercel',
                                                    desc: 'En Vercel → Project Settings → Environment Variables → agregar GSC_SERVICE_ACCOUNT_JSON y pegar el contenido completo del archivo .json descargado. Hacer redeploy.',
                                                    link: 'https://vercel.com/dashboard',
                                                    linkLabel: 'Abrir Vercel →',
                                                },
                                            ].map((step, i) => (
                                                <div key={i} className="flex gap-4">
                                                    <div
                                                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-heading font-bold text-sm text-white"
                                                        style={{ background: GOLD }}
                                                    >
                                                        {step.n}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-heading font-semibold text-sabiduria-navy text-sm mb-1">{step.title}</p>
                                                        <p className="font-serif text-xs text-sabiduria-gray leading-relaxed mb-2">{step.desc}</p>
                                                        <a
                                                            href={step.link}
                                                            target="_blank" rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 font-heading text-xs font-semibold text-sabiduria-gold hover:underline"
                                                        >
                                                            {step.linkLabel} <ExternalLink size={11} />
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                )}

            </div>
        </main>
    );
};

export default Panel;
