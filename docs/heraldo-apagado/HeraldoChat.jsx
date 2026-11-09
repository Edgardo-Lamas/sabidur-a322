import { useState, useEffect, useRef } from 'react';
import { Zap, Send } from 'lucide-react';

const GOLD = '#C5A059';
const NAVY = '#1E3A5F';

const SUGGESTIONS = [
  '¿Cómo está el ecosistema esta semana?',
  'Generá el calendario editorial de julio',
  '¿Qué keywords debo trabajar primero?',
  'Analizá el canal de YouTube',
  'Plan de contenido para México',
  '¿Qué páginas rankean mejor?',
];

function renderContent(text) {
  const paragraphs = text.split(/\n\n+/);
  return paragraphs.map((para, pi) => {
    const lines = para.split('\n');

    // Lista de bullets
    if (lines.some(l => /^[-•*]\s/.test(l.trim()))) {
      return (
        <ul key={pi} className="space-y-1 my-2 pl-1">
          {lines.map((line, li) => {
            const clean = line.replace(/^[-•*]\s*/, '').trim();
            if (!clean) return null;
            return (
              <li key={li} className="flex gap-2 items-start">
                <span style={{ color: GOLD }} className="mt-0.5 flex-shrink-0 text-xs">◆</span>
                <span>{renderInline(clean)}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    // Numbered list
    if (lines.some(l => /^\d+\.\s/.test(l.trim()))) {
      return (
        <ol key={pi} className="space-y-1 my-2 pl-1 list-none">
          {lines.map((line, li) => {
            const m = line.match(/^(\d+)\.\s(.+)/);
            if (!m) return null;
            return (
              <li key={li} className="flex gap-2 items-start">
                <span className="font-heading font-bold flex-shrink-0 text-xs mt-0.5" style={{ color: GOLD }}>
                  {m[1]}.
                </span>
                <span>{renderInline(m[2])}</span>
              </li>
            );
          })}
        </ol>
      );
    }

    // Heading (empieza con ###)
    if (para.startsWith('### ')) {
      return (
        <p key={pi} className="font-heading font-bold text-sabiduria-navy text-sm mt-3 mb-1">
          {para.replace(/^###\s/, '')}
        </p>
      );
    }
    if (para.startsWith('## ')) {
      return (
        <p key={pi} className="font-heading font-bold text-sabiduria-navy mt-3 mb-1">
          {para.replace(/^##\s/, '')}
        </p>
      );
    }

    // Paragraph normal
    return (
      <p key={pi} className="mb-2 last:mb-0 leading-relaxed">
        {renderInline(para)}
      </p>
    );
  });
}

function renderInline(text) {
  // **bold** y *italic*
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-sabiduria-navy">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

export default function HeraldoChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function send(text) {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;

    const newMsgs = [...messages, { role: 'user', content: userText }];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/heraldo', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ messages: newMsgs }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply ?? data.error ?? 'Sin respuesta.' }]);
    } catch {
      setMessages(prev => [...prev, {
        role:    'assistant',
        content: 'Error al conectar con Heraldo. Verificá la conexión e intentá de nuevo.',
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="flex flex-col rounded-xl border border-sabiduria-gray/10 shadow-sm overflow-hidden" style={{ height: 620 }}>

      {/* Header */}
      <div className="px-5 py-4 flex items-center gap-3 border-b border-white/10 flex-shrink-0"
           style={{ background: NAVY }}>
        <div className="p-2 rounded-lg" style={{ background: `${GOLD}25` }}>
          <Zap size={17} style={{ color: GOLD }} />
        </div>
        <div>
          <p className="font-heading font-bold text-white text-sm">Heraldo</p>
          <p className="font-serif text-white/45 text-xs">Agente estratégico · LATAM · EE.UU. · España</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-heading text-xs text-white/45">En línea</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 bg-slate-50/50">

        {messages.length === 0 && (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="p-4 rounded-2xl mb-4" style={{ background: `${GOLD}12` }}>
              <Zap size={28} style={{ color: GOLD }} />
            </div>
            <p className="font-heading font-bold text-sabiduria-navy text-base mb-1">Heraldo listo</p>
            <p className="font-serif text-sabiduria-gray text-sm max-w-sm mb-6 leading-relaxed">
              Analizá el ecosistema, planificá contenido y creá estrategias de crecimiento para LATAM, EE.UU. y España.
            </p>
            <div className="grid grid-cols-2 gap-2 w-full max-w-md">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => send(s)}
                  className="font-serif text-xs text-left px-3 py-2.5 rounded-lg border transition-all hover:border-sabiduria-gold/50 hover:text-sabiduria-navy"
                  style={{
                    borderColor: 'rgba(197,160,89,0.2)',
                    background:  'white',
                    color:       '#6b7280',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-2"
                   style={{ background: `${GOLD}20` }}>
                <Zap size={12} style={{ color: GOLD }} />
              </div>
            )}
            <div
              className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'text-white font-serif rounded-tr-sm'
                  : 'text-sabiduria-navy font-serif bg-white border border-sabiduria-gray/10 shadow-sm rounded-tl-sm'
              }`}
              style={msg.role === 'user' ? { background: NAVY } : {}}
            >
              {msg.role === 'assistant' ? renderContent(msg.content) : msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-2"
                 style={{ background: `${GOLD}20` }}>
              <Zap size={12} style={{ color: GOLD }} />
            </div>
            <div className="bg-white border border-sabiduria-gray/10 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1 items-center h-4">
                {[0, 1, 2].map(n => (
                  <div
                    key={n}
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ background: GOLD, animationDelay: `${n * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-sabiduria-gray/10 flex gap-2 bg-white flex-shrink-0">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          disabled={loading}
          placeholder="Preguntá a Heraldo sobre estrategia, contenido o datos…"
          className="flex-1 bg-slate-50 border border-sabiduria-gray/15 rounded-xl px-4 py-2.5 text-sm font-serif text-sabiduria-navy placeholder:text-sabiduria-gray/50 focus:outline-none focus:border-sabiduria-gold/50 disabled:opacity-50 transition-colors"
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || loading}
          className="p-2.5 rounded-xl text-white transition-all disabled:opacity-40 flex items-center justify-center"
          style={{ background: GOLD }}
          title="Enviar"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
