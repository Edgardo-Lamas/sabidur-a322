import React, { useState } from 'react';
import {
    Sparkles, ChevronRight, Heart, Trophy, Mountain,
    Zap, Download, Lock
} from 'lucide-react';

const QUESTIONS_DATA = [
    {
        id: 1,
        question: "¿Quién derribó las murallas de Jericó?",
        options: ["Gedeón", "Josué", "David", "Sansón"],
        correctIndex: 1,
        category: "Héroes",
        explanation: "Fue Josué siguiendo las instrucciones de Dios (Josué 6)."
    },
    {
        id: 2,
        question: "¿Qué instrumento tocaba David?",
        options: ["Flauta", "Trompeta", "Arpa", "Tambor"],
        correctIndex: 2,
        category: "Música",
        explanation: "David era un hábil arpista (1 Samuel 16)."
    },
    {
        id: 3,
        question: "Completa: 'Lámpara es a mis pies tu...'",
        options: ["Amor", "Palabra", "Espíritu", "Verdad"],
        correctIndex: 1,
        category: "Sabiduría",
        explanation: "Salmos 119:105."
    },
    {
        id: 4,
        question: "¿Quién escribió más Salmos?",
        options: ["Salomón", "Moisés", "David", "Asaf"],
        correctIndex: 2,
        category: "Música",
        explanation: "Al rey David se le atribuye la mayoría."
    },
    {
        id: 5,
        question: "¿Dónde fue el milagro del vino?",
        options: ["Nazaret", "Capernaum", "Caná", "Jerusalén"],
        correctIndex: 2,
        category: "Milagros",
        explanation: "En las bodas de Caná (Juan 2)."
    },
    {
        id: 6,
        question: "¿Libro más largo de la Biblia?",
        options: ["Génesis", "Isaías", "Salmos", "Apocalipsis"],
        correctIndex: 2,
        category: "Curiosidades",
        explanation: "Salmos tiene 150 capítulos."
    }
];

const UNLOCKABLES = [
    { id: 'bg_sunset', type: 'bg', cost: 100, color: 'from-orange-400 to-rose-500' },
    { id: 'bg_ocean', type: 'bg', cost: 100, color: 'from-cyan-400 to-blue-500' },
    { id: 'bg_forest', type: 'bg', cost: 100, color: 'from-green-400 to-emerald-600' },
    {
        id: 'img_mountain',
        type: 'img',
        cost: 400,
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'img_stars',
        type: 'img',
        cost: 600,
        url: 'https://images.unsplash.com/photo-1464802686167-b939a67e06a1?auto=format&fit=crop&w=800&q=80'
    }
];

const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const BibliaFlow = () => {
    const [screen, setScreen] = useState('home');
    const [score, setScore] = useState(0);
    const [currency, setCurrency] = useState(150);
    const [lives, setLives] = useState(3);
    const [gameQuestions, setGameQuestions] = useState([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [unlockedItems, setUnlockedItems] = useState(['bg_sunset', 'bg_ocean', 'bg_forest']);
    const [canvasBg, setCanvasBg] = useState({ type: 'bg', value: 'from-indigo-500 to-purple-600' });
    const [canvasText, setCanvasText] = useState("Lámpara es a mis pies tu palabra");

    const startGame = () => {
        const prepared = QUESTIONS_DATA.map(q => ({
            ...q,
            shuffledOptions: shuffleArray(
                q.options.map((opt, i) => ({
                    id: i,
                    text: opt,
                    isCorrect: i === q.correctIndex
                }))
            )
        }));
        setGameQuestions(shuffleArray(prepared));
        setScore(0);
        setLives(3);
        setCurrentQIndex(0);
        setIsAnswered(false);
        setSelectedOptionId(null);
        setScreen('game');
    };

    const handleAnswer = (opt) => {
        if (isAnswered) return;
        setSelectedOptionId(opt.id);
        setIsAnswered(true);
        if (opt.isCorrect) {
            setScore(s => s + 50);
            setCurrency(c => c + 20);
        } else {
            setLives(l => l - 1);
        }
    };

    const unlockItem = (item) => {
        if (currency >= item.cost && !unlockedItems.includes(item.id)) {
            setCurrency(c => c - item.cost);
            setUnlockedItems([...unlockedItems, item.id]);
        }
    };

    const handleNext = () => {
        if (lives === 0 || currentQIndex === gameQuestions.length - 1) {
            setScreen('results');
        } else {
            setCurrentQIndex(c => c + 1);
            setIsAnswered(false);
            setSelectedOptionId(null);
        }
    };

    // HOME SCREEN
    if (screen === 'home') {
        return (
            <div className="bg-slate-900 text-white flex flex-col items-center justify-center p-8 text-center rounded-3xl overflow-hidden min-h-[600px] border border-white/10 shadow-2xl">
                <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-xl mb-10 shadow-inner">
                    <div className="inline-block p-4 bg-indigo-600/20 rounded-2xl mb-4">
                        <Sparkles size={48} className="text-indigo-400" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter bg-gradient-to-r from-white via-indigo-200 to-purple-400 text-transparent bg-clip-text">
                        BIBLIA FLOW
                    </h1>
                    <p className="text-slate-400 text-lg font-medium">
                        Desafía tu conocimiento y crea arte épico.
                    </p>
                </div>
                <button
                    onClick={startGame}
                    className="group relative bg-indigo-600 px-16 py-6 rounded-2xl font-black text-2xl hover:bg-indigo-500 transition-all mb-6 shadow-[0_0_40px_rgba(79,70,229,0.4)] active:scale-95 flex items-center gap-3"
                >
                    EMPEZAR
                    <ChevronRight className="transition-transform group-hover:translate-x-1" />
                </button>
                <button
                    onClick={() => setScreen('studio')}
                    className="bg-white/5 border border-white/10 px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors"
                >
                    ESTUDIO CREATIVO
                </button>
            </div>
        );
    }

    // GAME SCREEN
    if (screen === 'game') {
        const q = gameQuestions[currentQIndex];

        return (
            <div className="bg-slate-900 text-white p-4 flex flex-col items-center min-h-[600px] rounded-3xl border border-white/10 shadow-2xl">
                {/* Stats Bar */}
                <div className="w-full max-w-2xl flex justify-between mb-8 bg-black/30 p-5 rounded-2xl border border-white/5 mt-4">
                    <div className="flex items-center gap-2">
                        <Heart className="text-rose-500" fill="currentColor" />
                        <span className="font-black text-xl">{lives}</span>
                    </div>
                    <div className="bg-yellow-400/10 text-yellow-400 px-4 py-1 rounded-full border border-yellow-400/20 font-bold">
                        $ {currency}
                    </div>
                    <div className="flex items-center gap-2">
                        <Trophy className="text-yellow-400" />
                        <span className="font-black text-xl">{score}</span>
                    </div>
                </div>

                {/* Question Card */}
                <div className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
                    <span className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-2 block">
                        {q?.category}
                    </span>
                    <h2 className="text-3xl font-bold mb-10 leading-tight">
                        {q?.question}
                    </h2>

                    {/* Options */}
                    <div className="grid gap-4">
                        {q?.shuffledOptions.map(o => (
                            <button
                                key={o.id}
                                onClick={() => handleAnswer(o)}
                                className={`p-5 rounded-2xl text-left border-2 font-bold text-lg transition-all ${selectedOptionId === null
                                        ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-indigo-500'
                                        : o.isCorrect
                                            ? 'bg-green-500/20 border-green-500'
                                            : o.id === selectedOptionId
                                                ? 'bg-red-500/20 border-red-500'
                                                : 'opacity-40 border-transparent'
                                    }`}
                            >
                                {o.text}
                            </button>
                        ))}
                    </div>

                    {/* Explanation & Continue */}
                    {isAnswered && (
                        <div className="mt-8 text-center border-t border-white/10 pt-8">
                            <p className="text-slate-300 text-lg mb-8 italic">
                                "{q.explanation}"
                            </p>
                            <button
                                onClick={handleNext}
                                className="w-full py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-indigo-50 shadow-lg active:scale-95 transition-all"
                            >
                                CONTINUAR
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // RESULTS SCREEN
    if (screen === 'results') {
        return (
            <div className="bg-slate-900 text-white flex flex-col items-center justify-center p-6 min-h-[600px] rounded-3xl border border-white/10 shadow-2xl">
                <div className="bg-white/5 p-12 rounded-[3rem] text-center border border-white/10 shadow-2xl max-w-md w-full">
                    <Trophy size={80} className="text-yellow-400 mx-auto mb-6" />
                    <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter">
                        ¡ÉPICO!
                    </h2>
                    <div className="text-7xl font-black text-indigo-400 mb-10">
                        {score} <span className="text-2xl text-slate-500">pts</span>
                    </div>
                    <button
                        onClick={() => setScreen('studio')}
                        className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-black text-xl mb-4 hover:opacity-90 shadow-lg active:scale-95 transition-all"
                    >
                        IR AL ESTUDIO 🎨
                    </button>
                    <button
                        onClick={() => setScreen('home')}
                        className="text-slate-400 font-bold hover:text-white transition-colors"
                    >
                        VOLVER AL INICIO
                    </button>
                </div>
            </div>
        );
    }

    // STUDIO SCREEN
    if (screen === 'studio') {
        return (
            <div className="bg-slate-950 text-white flex flex-col lg:flex-row rounded-3xl overflow-hidden min-h-[700px] border border-white/10 shadow-2xl">
                {/* Sidebar */}
                <div className="w-full lg:w-96 bg-slate-900 p-8 flex flex-col gap-8 overflow-y-auto border-r border-white/5">
                    <div className="flex justify-between items-center mb-2">
                        <button
                            onClick={() => setScreen('home')}
                            className="font-black text-slate-500 hover:text-white transition-colors tracking-widest text-xs uppercase"
                        >
                            ← SALIR
                        </button>
                        <div className="bg-yellow-400/10 text-yellow-400 px-4 py-1 rounded-full border border-yellow-400/20 font-bold text-sm">
                            $ {currency}
                        </div>
                    </div>

                    {/* Backgrounds */}
                    <section>
                        <h3 className="text-[11px] font-black text-slate-500 mb-4 uppercase tracking-[0.3em] flex items-center gap-2">
                            <Mountain size={14} /> Fondos
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {UNLOCKABLES.map(item => {
                                const unlocked = unlockedItems.includes(item.id);
                                const isActive = canvasBg.value === (item.url || item.color);

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => unlocked ? setCanvasBg({ type: item.type, value: item.url || item.color }) : unlockItem(item)}
                                        className={`h-24 rounded-2xl overflow-hidden relative border-2 transition-all ${unlocked
                                                ? (isActive ? 'border-indigo-500 scale-95 shadow-lg shadow-indigo-500/20' : 'border-transparent hover:border-white/20')
                                                : 'opacity-40 border-slate-700'
                                            }`}
                                    >
                                        {item.type === 'img' ? (
                                            <img src={item.url} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className={`w-full h-full bg-gradient-to-br ${item.color}`}></div>
                                        )}
                                        {!unlocked && (
                                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-xs font-black text-yellow-400">
                                                <Lock size={14} className="mb-1" />
                                                $ {item.cost}
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/* Message */}
                    <section>
                        <h3 className="text-[11px] font-black text-slate-500 mb-4 uppercase tracking-[0.3em] flex items-center gap-2">
                            <Zap size={14} /> Mensaje
                        </h3>
                        <textarea
                            value={canvasText}
                            onChange={(e) => setCanvasText(e.target.value)}
                            className="w-full bg-slate-800 p-4 rounded-2xl text-base font-bold border-2 border-slate-700 h-32 focus:border-indigo-500 outline-none transition-all placeholder-slate-600"
                            placeholder="Escribe tu versículo..."
                        />
                    </section>
                </div>

                {/* Canvas Preview */}
                <div className="flex-1 flex flex-col items-center justify-center p-10 bg-black/20">
                    <div className="relative w-full max-w-sm aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl bg-slate-900 group">
                        {canvasBg.type === 'img' ? (
                            <>
                                <img
                                    src={canvasBg.value}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
                            </>
                        ) : (
                            <div className={`absolute inset-0 bg-gradient-to-br ${canvasBg.value}`}></div>
                        )}
                        <div className="relative z-10 h-full flex items-center justify-center p-12 text-center">
                            <p className="text-3xl font-black text-white italic drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-tight">
                                "{canvasText}"
                            </p>
                        </div>
                        <div className="absolute bottom-8 w-full text-center text-white/30 text-[9px] font-black tracking-[0.5em] uppercase">
                            BIBLIA FLOW
                        </div>
                    </div>
                    <button className="mt-10 bg-white text-slate-900 px-12 py-5 rounded-[2rem] font-black text-xl flex items-center gap-3 hover:bg-slate-100 transition-all active:scale-95 shadow-2xl">
                        <Download size={24} />
                        DESCARGAR
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

export default BibliaFlow;
