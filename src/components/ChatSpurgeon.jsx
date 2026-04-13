import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, Info, BookOpen, ExternalLink, Youtube, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://n8n-production-0e6a.up.railway.app/webhook/chat';
const SPURGEON_AVATAR = `${import.meta.env.BASE_URL}images/spurgeon-avatar.png`;

const INITIAL_SUGGESTIONS = [
    '¿Qué es la justificación por fe?',
    '¿Qué dice Romanos sobre la gracia?',
    '¿Cuál es la Declaración de Fe?'
];

const ChatSpurgeon = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Bienvenido, soy el Agente Spurgeon, estoy aquí para acompañar su estudio teológico. ¿Qué tema o pasaje desea profundizar?',
            timestamp: new Date(),
            suggestedQuestions: INITIAL_SUGGESTIONS
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        if (e) e.preventDefault();
        if (!input.trim()) return;

        const question = input.trim();
        const userMessage = { role: 'user', content: question, timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question })
            });

            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status}`);
            }

            const data = await response.json();

            const assistantMessage = {
                role: 'assistant',
                content: data.reply || 'No pude encontrar una respuesta relevante. Intente reformular su pregunta.',
                sources: data.sources || [],
                suggestedLinks: data.suggestedLinks || [],
                suggestedQuestions: data.suggestedQuestions || [],
                verse: data.verse || null,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMessage]);
        } catch {
            // error silenciado en producción
            const errorMessage = {
                role: 'assistant',
                content: 'Disculpe, hubo un inconveniente al procesar su consulta. Por favor, intente nuevamente en unos momentos.',
                timestamp: new Date(),
                suggestedQuestions: INITIAL_SUGGESTIONS
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSuggestionClick = (question) => {
        setInput(question);
        setTimeout(() => {
            setInput('');
            const userMessage = { role: 'user', content: question, timestamp: new Date() };
            setMessages(prev => [...prev, userMessage]);
            setIsTyping(true);

            fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question })
            })
                .then(res => {
                    if (!res.ok) throw new Error(`Error ${res.status}`);
                    return res.json();
                })
                .then(data => {
                    const assistantMessage = {
                        role: 'assistant',
                        content: data.reply || 'No pude encontrar una respuesta relevante.',
                        sources: data.sources || [],
                        suggestedLinks: data.suggestedLinks || [],
                        suggestedQuestions: data.suggestedQuestions || [],
                        verse: data.verse || null,
                        timestamp: new Date()
                    };
                    setMessages(prev => [...prev, assistantMessage]);
                })
                .catch(() => {
                    setMessages(prev => [...prev, {
                        role: 'assistant',
                        content: 'Disculpe, hubo un inconveniente. Intente nuevamente.',
                        timestamp: new Date(),
                        suggestedQuestions: INITIAL_SUGGESTIONS
                    }]);
                })
                .finally(() => setIsTyping(false));
        }, 50);
    };

    const getLinkIcon = (type) => {
        switch (type) {
            case 'youtube': return <Youtube size={14} className="text-red-500" />;
            case 'ensayo': return <FileText size={14} className="text-sabiduria-gold" />;
            case 'estudio': return <BookOpen size={14} className="text-sabiduria-gold" />;
            default: return <ChevronRight size={14} className="text-sabiduria-gold" />;
        }
    };

    const getLinkLabel = (type) => {
        switch (type) {
            case 'youtube': return 'Video';
            case 'ensayo': return 'Ensayo';
            case 'estudio': return 'Estudio';
            case 'estudioLibro': return 'Estudio';
            case 'pagina': return 'Página';
            default: return 'Ver';
        }
    };

    return (
        <div className="fixed bottom-6 right-4 z-50 font-sans">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="w-16 h-16 rounded-full shadow-2xl overflow-hidden hover:ring-2 hover:ring-sabiduria-gold transition-all duration-300 group"
                    >
                        <img src={SPURGEON_AVATAR} alt="Agente Spurgeon" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        className="bg-white w-[380px] sm:w-[420px] h-[600px] rounded-sm shadow-2xl border border-sabiduria-navy/10 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-sabiduria-navy p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                    <img src={SPURGEON_AVATAR} alt="Spurgeon" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-white font-serif font-bold text-lg leading-tight">Agente Spurgeon</h3>
                                    <span className="text-sabiduria-gold/70 text-[10px] uppercase tracking-widest font-bold">Reflexión Bíblica</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/50 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Aviso de Identidad */}
                        <div className="bg-sabiduria-bg/50 px-4 py-2 border-b border-sabiduria-navy/5 flex items-center gap-2">
                            <Info size={12} className="text-sabiduria-navy/40" />
                            <p className="text-[10px] text-sabiduria-navy/60 leading-tight">
                                Acompañante de discernimiento. No reemplaza guianza pastoral humana.
                            </p>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-6 bg-sabiduria-bg/20"
                        >
                            {messages.map((msg, idx) => (
                                <div key={idx}>
                                    <div
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`flex gap-2 max-w-[95%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                            {msg.role === 'user' ? (
                                                <div className="w-8 h-8 rounded-sm flex-shrink-0 flex items-center justify-center bg-sabiduria-navy text-white">
                                                    <User size={16} />
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                                    <img src={SPURGEON_AVATAR} alt="Spurgeon" className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            <div className={`p-3 rounded-sm text-sm leading-relaxed shadow-sm overflow-hidden ${msg.role === 'user'
                                                ? 'bg-sabiduria-navy text-white'
                                                : 'bg-white text-sabiduria-navy border border-sabiduria-navy/5'
                                                }`} style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                                                {msg.content}

                                                {/* Versículo contextual */}
                                                {msg.verse && (
                                                    <div className="mt-3 p-3 bg-gradient-to-r from-sabiduria-gold/5 to-sabiduria-gold/10 border-l-2 border-sabiduria-gold rounded-r-sm">
                                                        <p className="text-xs italic text-sabiduria-navy/80 leading-relaxed">
                                                            «{msg.verse.text}»
                                                        </p>
                                                        <p className="text-[10px] text-sabiduria-gold font-bold mt-1 uppercase tracking-wider">
                                                            — {msg.verse.reference}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Links sugeridos */}
                                                {msg.suggestedLinks && msg.suggestedLinks.length > 0 && (
                                                    <div className="mt-3 pt-2 border-t border-sabiduria-navy/10 space-y-1.5">
                                                        <div className="flex items-center gap-1 mb-1.5">
                                                            <Sparkles size={10} className="text-sabiduria-gold" />
                                                            <span className="text-[10px] uppercase tracking-wider text-sabiduria-navy/40 font-bold">Lecturas sugeridas</span>
                                                        </div>
                                                        {msg.suggestedLinks.map((link, i) => (
                                                            link.external ? (
                                                                <a
                                                                    key={i}
                                                                    href={link.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-2 p-2 rounded-sm bg-sabiduria-bg/50 hover:bg-sabiduria-gold/10 transition-colors group cursor-pointer text-left w-full"
                                                                >
                                                                    {getLinkIcon(link.type)}
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-[11px] font-medium text-sabiduria-navy group-hover:text-sabiduria-gold transition-colors truncate">
                                                                            {link.title}
                                                                        </p>
                                                                        <span className="text-[9px] uppercase tracking-wider text-sabiduria-navy/40">{getLinkLabel(link.type)}</span>
                                                                    </div>
                                                                    <ExternalLink size={10} className="text-sabiduria-navy/30 group-hover:text-sabiduria-gold transition-colors flex-shrink-0" />
                                                                </a>
                                                            ) : (
                                                                <Link
                                                                    key={i}
                                                                    to={link.url}
                                                                    className="flex items-center gap-2 p-2 rounded-sm bg-sabiduria-bg/50 hover:bg-sabiduria-gold/10 transition-colors group cursor-pointer text-left w-full"
                                                                    onClick={() => setIsOpen(false)}
                                                                >
                                                                    {getLinkIcon(link.type)}
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-[11px] font-medium text-sabiduria-navy group-hover:text-sabiduria-gold transition-colors truncate">
                                                                            {link.title}
                                                                        </p>
                                                                        <span className="text-[9px] uppercase tracking-wider text-sabiduria-navy/40">{getLinkLabel(link.type)}</span>
                                                                    </div>
                                                                    <ChevronRight size={10} className="text-sabiduria-navy/30 group-hover:text-sabiduria-gold transition-colors flex-shrink-0" />
                                                                </Link>
                                                            )
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Fuentes (legacy) */}
                                                {msg.sources && msg.sources.length > 0 && !msg.suggestedLinks?.length && (
                                                    <div className="mt-3 pt-2 border-t border-sabiduria-navy/10">
                                                        <div className="flex items-center gap-1 mb-1">
                                                            <BookOpen size={10} className="text-sabiduria-gold" />
                                                            <span className="text-[10px] uppercase tracking-wider text-sabiduria-navy/40 font-bold">Fuentes</span>
                                                        </div>
                                                        {msg.sources.map((src, i) => (
                                                            <p key={i} className="text-[11px] text-sabiduria-navy/50 italic">
                                                                {src.title} ({src.source})
                                                            </p>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Preguntas sugeridas */}
                                    {msg.role === 'assistant' && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                                        <div className="mt-3 ml-11 flex flex-wrap gap-1.5">
                                            {msg.suggestedQuestions.map((q, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleSuggestionClick(q)}
                                                    disabled={isTyping}
                                                    className="text-[11px] px-3 py-1.5 rounded-full border border-sabiduria-gold/30 text-sabiduria-navy/70 hover:bg-sabiduria-gold/10 hover:border-sabiduria-gold/60 hover:text-sabiduria-navy transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-left"
                                                >
                                                    {q}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="flex gap-3 max-w-[85%]">
                                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                            <img src={SPURGEON_AVATAR} alt="Spurgeon" className="w-full h-full object-cover animate-pulse" />
                                        </div>
                                        <div className="p-4 rounded-sm bg-white border border-sabiduria-navy/5 shadow-sm">
                                            <div className="flex gap-1">
                                                <span className="w-1.5 h-1.5 bg-sabiduria-gold/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                                <span className="w-1.5 h-1.5 bg-sabiduria-gold/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                                <span className="w-1.5 h-1.5 bg-sabiduria-gold/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-4 bg-white border-t border-sabiduria-navy/5">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Escriba su consulta aquí..."
                                    className="w-full bg-sabiduria-bg/50 border border-sabiduria-navy/10 rounded-sm py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-sabiduria-gold transition-colors text-sabiduria-navy font-serif italic"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-sm transition-all ${input.trim() && !isTyping ? 'text-sabiduria-navy hover:text-sabiduria-gold' : 'text-sabiduria-navy/20'
                                        }`}
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatSpurgeon;
