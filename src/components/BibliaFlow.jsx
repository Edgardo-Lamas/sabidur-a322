import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronRight, Heart, Trophy, Mountain,
    Zap, Download, Lock, Award, BookOpen,
    Info, X, Check
} from 'lucide-react';
import questionsData from '../data/questions.json';
import challengesData from '../data/challenges.json';

const LEVELS = {
    1: { name: 'Inicial', difficulty: 'easy', questionsPerLevel: 15, minToPass: 12, bonusCredits: 50, color: 'from-emerald-500 to-teal-600', timePerQuestion: 30, pointsPerCorrect: 1 },
    2: { name: 'Medio', difficulty: 'medium', questionsPerLevel: 15, minToPass: 12, bonusCredits: 75, color: 'from-amber-500 to-yellow-600', timePerQuestion: 30, pointsPerCorrect: 2 },
    3: { name: 'Difícil', difficulty: 'hard', questionsPerLevel: 15, minToPass: 12, bonusCredits: 100, color: 'from-orange-500 to-red-600', timePerQuestion: 25, pointsPerCorrect: 3 },
    4: { name: 'Experto', difficulty: 'expert', questionsPerLevel: 15, minToPass: 12, bonusCredits: 150, color: 'from-violet-600 to-purple-700', timePerQuestion: 20, pointsPerCorrect: 5 }
};

const getQuestionsByDifficulty = (difficulty) => {
    const qs = questionsData.questions.filter(q => (q.difficulty || 'easy') === difficulty);
    return qs.length > 0 ? qs : questionsData.questions;
};

const UNLOCKABLES = [
    { id: 'bg_sunset', type: 'bg', cost: 100, color: 'from-orange-400 to-rose-500', label: 'Atardecer' },
    { id: 'bg_ocean', type: 'bg', cost: 100, color: 'from-cyan-400 to-blue-500', label: 'Océano' },
    { id: 'bg_forest', type: 'bg', cost: 100, color: 'from-green-400 to-emerald-600', label: 'Bosque' },
    { id: 'img_mountain', type: 'img', cost: 400, url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', label: 'Montaña' },
    { id: 'img_stars', type: 'img', cost: 600, url: 'https://images.unsplash.com/photo-1464802686167-b939a67e06a1?auto=format&fit=crop&w=800&q=80', label: 'Estrellas' }
];

const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

const screenIn = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } }
};

// Circular countdown timer
const CircularTimer = ({ timeLeft, maxTime }) => {
    const r = 22;
    const circ = 2 * Math.PI * r;
    const fill = (timeLeft / maxTime) * circ;
    const color = timeLeft <= 5 ? '#ef4444' : timeLeft <= 10 ? '#f59e0b' : '#67e8f9';
    return (
        <svg width="58" height="58" viewBox="0 0 58 58" className="shrink-0">
            <circle cx="29" cy="29" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3.5" />
            <circle
                cx="29" cy="29" r={r}
                fill="none"
                stroke={color}
                strokeWidth="3.5"
                strokeDasharray={circ}
                strokeDashoffset={circ - fill}
                strokeLinecap="round"
                transform="rotate(-90 29 29)"
                style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease' }}
            />
            <text x="29" y="34" textAnchor="middle" fill={color} fontSize="14" fontWeight="bold" fontFamily="monospace">
                {timeLeft}
            </text>
        </svg>
    );
};

// Level progress nodes
const LevelPath = ({ highestLevel }) => {
    const labels = ['Inicial', 'Medio', 'Difícil', 'Experto'];
    return (
        <div className="flex items-start justify-center my-7">
            {[1, 2, 3, 4].map((lvl, i) => {
                const done = highestLevel > lvl;
                const current = highestLevel === lvl;
                return (
                    <div key={lvl} className="flex items-center">
                        <div className="flex flex-col items-center">
                            <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                                done ? 'bg-sabiduria-gold border-sabiduria-gold text-sabiduria-navy'
                                : current ? 'bg-sabiduria-gold/10 border-sabiduria-gold text-sabiduria-gold ring-4 ring-sabiduria-gold/10'
                                : 'bg-white/5 border-white/15 text-white/25'
                            }`}>
                                {done ? <Check size={15} /> : lvl}
                            </div>
                            <span className={`text-[10px] mt-1.5 font-heading uppercase tracking-wider ${
                                done ? 'text-sabiduria-gold/60' : current ? 'text-sabiduria-gold/80' : 'text-white/20'
                            }`}>{labels[i]}</span>
                        </div>
                        {i < 3 && (
                            <div className={`w-8 md:w-12 h-px mx-1 mb-5 transition-all ${done ? 'bg-sabiduria-gold/50' : 'bg-white/10'}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const BibliaFlow = () => {
    const [screen, setScreen] = useState('home');
    const [, setScore] = useState(0);
    const [currency, setCurrency] = useState(150);
    const [lives, setLives] = useState(3);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [highestLevel, setHighestLevel] = useState(1);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [gameQuestions, setGameQuestions] = useState([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [unlockedItems, setUnlockedItems] = useState(['bg_sunset', 'bg_ocean', 'bg_forest']);
    const [canvasBg, setCanvasBg] = useState({ type: 'bg', value: 'from-indigo-500 to-purple-600' });
    const [canvasText, setCanvasText] = useState('Lámpara es a mis pies tu palabra');
    const [levelResult, setLevelResult] = useState(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const timerRef = useRef(null);
    const [showHelp, setShowHelp] = useState(false);
    const [currentChallenge, setCurrentChallenge] = useState(null);
    const [challengeQIndex, setChallengeQIndex] = useState(0);
    const [challengeAnswered, setChallengeAnswered] = useState(false);
    const [challengeSelectedId, setChallengeSelectedId] = useState(null);
    const [challengeScore, setChallengeScore] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const handleTimeOut = () => {
        setIsAnswered(true);
        setSelectedOptionId(-1);
        setLives(l => l - 1);
    };

    useEffect(() => {
        if (screen === 'game' && !isAnswered && timeLeft > 0) {
            timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        } else if (screen === 'game' && !isAnswered && timeLeft === 0) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            handleTimeOut();
        }
        return () => clearTimeout(timerRef.current);
    }, [screen, timeLeft, isAnswered]);

    const startGame = (level = 1) => {
        const cfg = LEVELS[level];
        const prepared = getQuestionsByDifficulty(cfg.difficulty).map(q => ({
            ...q,
            shuffledOptions: shuffleArray(q.options.map((opt, i) => ({ id: i, text: opt, isCorrect: i === q.correctIndex })))
        }));
        setGameQuestions(shuffleArray(prepared).slice(0, cfg.questionsPerLevel));
        setCurrentLevel(level);
        setScore(0);
        setCorrectAnswers(0);
        setCurrentQIndex(0);
        setIsAnswered(false);
        setSelectedOptionId(null);
        setLevelResult(null);
        setTimeLeft(cfg.timePerQuestion);
        setScreen('game');
    };

    const handleAnswer = (opt) => {
        if (isAnswered) return;
        setSelectedOptionId(opt.id);
        setIsAnswered(true);
        if (opt.isCorrect) {
            setScore(s => s + LEVELS[currentLevel].pointsPerCorrect);
            setCurrency(c => c + 20);
            setCorrectAnswers(c => c + 1);
        } else {
            setLives(l => l - 1);
        }
    };

    const unlockItem = (item) => {
        if (currency >= item.cost && !unlockedItems.includes(item.id)) {
            setCurrency(c => c - item.cost);
            setUnlockedItems(prev => [...prev, item.id]);
        }
    };

    const handleNext = () => {
        const cfg = LEVELS[currentLevel];
        const isLast = currentQIndex === gameQuestions.length - 1;
        if (lives === 0) { setLevelResult('failed'); setScreen('levelResult'); return; }
        if (isLast) {
            if (correctAnswers >= cfg.minToPass) {
                const isPerfect = correctAnswers === cfg.questionsPerLevel;
                if (isPerfect) { setLives(l => l + 1); setCurrency(c => c + cfg.bonusCredits * 2); setLevelResult('perfect'); }
                else { setCurrency(c => c + cfg.bonusCredits); setLevelResult('passed'); }
                if (currentLevel >= highestLevel) setHighestLevel(currentLevel + 1);
            } else {
                setLevelResult('failed');
            }
            setScreen('levelResult');
        } else {
            setCurrentQIndex(c => c + 1);
            setIsAnswered(false);
            setSelectedOptionId(null);
            setTimeLeft(LEVELS[currentLevel].timePerQuestion);
        }
    };

    const continueToNextLevel = () => currentLevel < 4 ? startGame(currentLevel + 1) : setScreen('victory');
    const retryLevel = () => { setLives(3); startGame(currentLevel); };

    // ── HOME ────────────────────────────────────────────────────────────
    if (screen === 'home') return (
        <motion.div key="home" variants={screenIn} initial="initial" animate="animate"
            className="relative bg-sabiduria-navy text-white flex flex-col items-center justify-center px-8 py-10 text-center rounded-xl overflow-hidden min-h-[560px] border border-white/8 shadow-md">

            <button onClick={() => setShowHelp(true)}
                className="absolute top-4 right-4 p-2 text-white/30 hover:text-sabiduria-gold transition-colors" title="¿Cómo se juega?">
                <Info size={17} />
            </button>

            {showHelp && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6" onClick={() => setShowHelp(false)}>
                    <div className="bg-white rounded-xl max-w-lg w-full shadow-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white">
                            <h2 className="text-lg font-heading font-semibold text-sabiduria-navy">¿Cómo funciona este desafío?</h2>
                            <button onClick={() => setShowHelp(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
                        </div>
                        <div className="px-6 py-6 space-y-5 text-sabiduria-navy/80 font-serif text-[15px] leading-relaxed text-justify">
                            <p>Desafíos bíblicos progresivos para crecer en el conocimiento de las Escrituras.</p>
                            <div>
                                <h3 className="font-heading font-semibold text-sabiduria-navy mb-2">Los niveles</h3>
                                <ul className="space-y-1 text-[14px]">
                                    <li>• <strong>Nivel 1 – Inicial:</strong> preguntas introductorias, 30 segundos.</li>
                                    <li>• <strong>Nivel 2 – Medio:</strong> mayor reflexión, 30 segundos.</li>
                                    <li>• <strong>Nivel 3 – Difícil:</strong> atención al texto, 25 segundos.</li>
                                    <li>• <strong>Nivel 4 – Experto:</strong> preguntas profundas, 20 segundos.</li>
                                </ul>
                                <p className="mt-2 text-[14px]">Para avanzar necesitas alcanzar el mínimo de respuestas correctas por nivel.</p>
                            </div>
                            <div>
                                <h3 className="font-heading font-semibold text-sabiduria-navy mb-2">El Desafío Supremo</h3>
                                <p className="text-[14px]">Al completar los 4 niveles se desbloquean lecturas bíblicas extensas con preguntas de discernimiento.</p>
                            </div>
                            <div>
                                <h3 className="font-heading font-semibold text-sabiduria-navy mb-2">Vidas y créditos</h3>
                                <ul className="space-y-1 text-[14px]">
                                    <li>• Comienzas con <strong>3 vidas</strong>. Cada error o tiempo agotado quita una.</li>
                                    <li>• Puntaje perfecto: <strong>+1 vida extra</strong>.</li>
                                    <li>• Respuesta correcta: <strong>+20 créditos</strong>. Los bonos de nivel se suman al terminar.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-heading font-semibold text-sabiduria-navy mb-2">Estudio Creativo</h3>
                                <p className="text-[14px]">Con créditos desbloqueas fondos para crear imágenes con versículos. Fondos de color: 100 cr. Fotografías: 400–600 cr.</p>
                            </div>
                            <p className="text-sabiduria-navy font-medium italic pt-2 border-t border-gray-100">
                                Este no es un juego para ganar, sino un ejercicio para aprender y afirmar la fe.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <p className="text-[11px] font-heading uppercase tracking-[0.35em] text-sabiduria-gold/50 mb-3">Desafío Bíblico</p>
            <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight">
                BIBLIA<span className="text-sabiduria-gold"> FLOW</span>
            </h1>
            <p className="text-white/40 text-sm font-serif mt-2">Crece en el conocimiento de las Escrituras</p>

            <LevelPath highestLevel={highestLevel} />

            <div className="flex items-center gap-5 mb-8">
                <div className="flex items-center gap-1.5 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    {[0, 1, 2].map(i => (
                        <Heart key={i} size={15} className={i < lives ? 'text-rose-500' : 'text-white/20'}
                            fill={i < lives ? 'currentColor' : 'none'} />
                    ))}
                </div>
                <div className="flex items-center gap-2 bg-sabiduria-gold/8 px-4 py-2 rounded-full border border-sabiduria-gold/20">
                    <span className="text-sabiduria-gold font-bold text-sm">{currency}</span>
                    <span className="text-sabiduria-gold/50 text-xs font-heading uppercase tracking-wider">créditos</span>
                </div>
            </div>

            <button
                onClick={() => {
                    if (highestLevel > 4) { setHighestLevel(1); setLives(3); startGame(1); }
                    else startGame(Math.min(highestLevel, 4));
                }}
                className="group bg-sabiduria-gold text-sabiduria-navy px-10 py-4 rounded-lg font-heading font-bold text-lg hover:bg-sabiduria-gold/90 transition-all mb-4 shadow-md active:scale-95 flex items-center gap-3"
            >
                {highestLevel === 1 ? 'COMENZAR NIVEL 1'
                    : highestLevel > 4 ? 'JUGAR DE NUEVO'
                    : `CONTINUAR — NIVEL ${highestLevel}`}
                <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>

            <button onClick={() => setScreen('studio')}
                className="text-white/35 font-heading text-sm font-semibold hover:text-white/70 transition-colors tracking-wider uppercase">
                Estudio Creativo →
            </button>
        </motion.div>
    );

    // ── GAME ────────────────────────────────────────────────────────────
    if (screen === 'game') {
        const q = gameQuestions[currentQIndex];
        const cfg = LEVELS[currentLevel];
        const progress = ((currentQIndex + 1) / cfg.questionsPerLevel) * 100;

        return (
            <motion.div key="game" variants={screenIn} initial="initial" animate="animate"
                className="bg-sabiduria-navy text-white p-5 flex flex-col items-center min-h-[580px] rounded-xl border border-white/8 shadow-md">

                {/* Level progress bar */}
                <div className={`w-full max-w-2xl bg-gradient-to-r ${cfg.color} px-4 py-3 rounded-lg mb-4`}>
                    <div className="flex justify-between items-center text-white text-xs font-heading font-bold uppercase tracking-wider mb-2">
                        <span>Nivel {currentLevel} · {cfg.name}</span>
                        <span>{currentQIndex + 1} / {cfg.questionsPerLevel}</span>
                    </div>
                    <div className="w-full bg-black/25 rounded-full h-1.5">
                        <div className="bg-white h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                </div>

                {/* Stats bar */}
                <div className="w-full max-w-2xl flex justify-between items-center mb-4 bg-black/20 px-5 py-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-1">
                        {[0, 1, 2].map(i => (
                            <Heart key={i} size={17} className={i < lives ? 'text-rose-500' : 'text-white/15'}
                                fill={i < lives ? 'currentColor' : 'none'} />
                        ))}
                    </div>

                    {!isAnswered
                        ? <CircularTimer timeLeft={timeLeft} maxTime={cfg.timePerQuestion} />
                        : <div className="w-[58px]" />
                    }

                    <div className="flex items-center gap-4 text-right">
                        <div>
                            <div className="text-[10px] text-white/35 font-heading uppercase tracking-wider">Correctas</div>
                            <div className="font-bold text-white text-sm">{correctAnswers}<span className="text-white/30">/{cfg.minToPass}</span></div>
                        </div>
                        <div>
                            <div className="text-[10px] text-sabiduria-gold/50 font-heading uppercase tracking-wider">Créditos</div>
                            <div className="font-bold text-sabiduria-gold text-sm">{currency}</div>
                        </div>
                    </div>
                </div>

                {/* Question card — key re-triggers animation on change */}
                <motion.div
                    key={currentQIndex}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0, transition: { duration: 0.22 } }}
                    className="w-full max-w-2xl bg-white/5 p-7 rounded-xl border border-white/8"
                >
                    <span className="text-[11px] font-heading font-bold uppercase tracking-[0.25em] text-sabiduria-gold/60 mb-2 block">
                        {q?.category}
                    </span>
                    <h2 className="text-xl md:text-2xl font-heading font-semibold mb-7 leading-snug text-white">
                        {q?.question}
                    </h2>

                    <div className="grid gap-2.5">
                        {q?.shuffledOptions.map(o => {
                            let cls = 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-sabiduria-gold/40 cursor-pointer';
                            if (selectedOptionId !== null) {
                                if (o.isCorrect) cls = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300';
                                else if (o.id === selectedOptionId) cls = 'bg-red-500/15 border-red-500/50 text-red-300';
                                else cls = 'opacity-25 border-transparent cursor-default';
                            }
                            return (
                                <button key={o.id} onClick={() => handleAnswer(o)}
                                    className={`p-4 rounded-lg text-left border-2 font-serif text-[15px] leading-snug transition-all ${cls}`}>
                                    {o.text}
                                </button>
                            );
                        })}
                    </div>

                    {isAnswered && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            className="mt-6 border-t border-white/10 pt-5">
                            <p className="text-white/55 text-sm font-serif italic text-center mb-5 leading-relaxed">
                                "{q.explanation}"
                            </p>
                            <button onClick={handleNext}
                                className="w-full py-3.5 bg-sabiduria-gold text-sabiduria-navy font-heading font-bold rounded-lg hover:bg-sabiduria-gold/90 active:scale-95 transition-all">
                                {currentQIndex === gameQuestions.length - 1 ? 'VER RESULTADO' : 'CONTINUAR'}
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        );
    }

    // ── LEVEL RESULT ────────────────────────────────────────────────────
    if (screen === 'levelResult') {
        const cfg = LEVELS[currentLevel];
        const isPerfect = levelResult === 'perfect';
        const isPassed = levelResult === 'passed' || isPerfect;

        return (
            <motion.div key="levelResult" variants={screenIn} initial="initial" animate="animate"
                className="bg-sabiduria-navy text-white flex flex-col items-center justify-center p-6 min-h-[560px] rounded-xl border border-white/8 shadow-md">
                <div className="max-w-sm w-full text-center">
                    {isPassed ? (
                        <>
                            <motion.div initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 200, delay: 0.08 }} className="mb-5">
                                {isPerfect
                                    ? <Award size={68} className="text-sabiduria-gold mx-auto" />
                                    : <Trophy size={68} className="text-emerald-400 mx-auto" />}
                            </motion.div>
                            <h2 className="text-3xl font-heading font-bold mb-1 tracking-tight">
                                {isPerfect ? '¡Perfecto!' : '¡Nivel Completado!'}
                            </h2>
                            <p className={`text-xs font-heading uppercase tracking-widest mb-6 ${isPerfect ? 'text-sabiduria-gold' : 'text-emerald-400'}`}>
                                Nivel {currentLevel} — {cfg.name}
                            </p>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-4">
                                <div className="text-4xl font-heading font-bold mb-1">
                                    {correctAnswers}<span className="text-white/25 text-2xl">/{cfg.questionsPerLevel}</span>
                                </div>
                                <p className="text-white/40 text-xs font-heading uppercase tracking-wider">Respuestas correctas</p>
                            </div>
                            <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-4 mb-6 space-y-1.5 text-sm">
                                <div className="text-emerald-400 font-bold">+{isPerfect ? cfg.bonusCredits * 2 : cfg.bonusCredits} créditos de bono</div>
                                {isPerfect && (
                                    <div className="text-sabiduria-gold font-bold flex items-center justify-center gap-1">
                                        <Heart size={13} fill="currentColor" className="text-rose-400" /> +1 vida extra
                                    </div>
                                )}
                                <div className="text-white/40 border-t border-white/10 pt-2 text-xs">
                                    Total: <span className="text-sabiduria-gold font-bold">{currency} créditos</span>
                                </div>
                            </div>
                            <button onClick={continueToNextLevel}
                                className="w-full py-4 bg-sabiduria-gold text-sabiduria-navy rounded-lg font-heading font-bold mb-4 hover:bg-sabiduria-gold/90 active:scale-95 transition-all">
                                {currentLevel < 4 ? `Siguiente → Nivel ${currentLevel + 1}` : 'Ver Victoria'}
                            </button>
                        </>
                    ) : (
                        <>
                            <motion.div initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 200, delay: 0.08 }}
                                className="text-6xl mb-5">😔</motion.div>
                            <h2 className="text-2xl font-heading font-bold mb-2 text-red-400 tracking-tight">Nivel no superado</h2>
                            <p className="text-white/45 font-serif text-sm mb-6">
                                Necesitabas {cfg.minToPass} correctas. Obtuviste {correctAnswers}.
                            </p>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
                                <div className="text-3xl font-heading font-bold text-red-400 mb-1">
                                    {correctAnswers}<span className="text-white/25 text-xl">/{cfg.questionsPerLevel}</span>
                                </div>
                                <p className="text-white/40 text-xs font-heading uppercase tracking-wider">Respuestas correctas</p>
                            </div>
                            <button onClick={retryLevel}
                                className="w-full py-4 bg-sabiduria-gold text-sabiduria-navy rounded-lg font-heading font-bold mb-4 hover:bg-sabiduria-gold/90 active:scale-95 transition-all">
                                Reintentar Nivel {currentLevel}
                            </button>
                        </>
                    )}
                    <button onClick={() => setScreen('home')}
                        className="text-white/35 font-heading text-sm font-semibold hover:text-white/70 transition-colors">
                        Volver al inicio
                    </button>
                </div>
            </motion.div>
        );
    }

    // ── VICTORY ─────────────────────────────────────────────────────────
    if (screen === 'victory') {
        const hasChallenge = challengesData.challenges?.length > 0;
        return (
            <motion.div key="victory" variants={screenIn} initial="initial" animate="animate"
                className="bg-sabiduria-navy text-white flex flex-col items-center justify-center p-6 min-h-[560px] rounded-xl border border-white/8 shadow-md">
                <div className="max-w-sm w-full text-center">
                    <motion.div initial={{ scale: 0, rotate: -12 }} animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 170, delay: 0.1 }} className="mb-5">
                        <Trophy size={76} className="text-sabiduria-gold mx-auto" />
                    </motion.div>
                    <h2 className="text-4xl font-heading font-bold mb-2 tracking-tight text-sabiduria-gold">¡Completado!</h2>
                    <p className="text-white/55 font-serif mb-1">Has superado todos los niveles de Biblia Flow.</p>
                    <p className="text-white/25 text-[11px] font-heading uppercase tracking-widest mb-7">Sabiduría para el Corazón</p>
                    <div className="bg-sabiduria-gold/8 border border-sabiduria-gold/20 rounded-xl p-5 mb-5">
                        <div className="text-3xl font-heading font-bold text-sabiduria-gold mb-1">{currency}</div>
                        <p className="text-sabiduria-gold/50 text-xs font-heading uppercase tracking-wider">Créditos acumulados</p>
                    </div>
                    {hasChallenge && (
                        <button onClick={() => setScreen('challengeIntro')}
                            className="w-full py-4 bg-white/5 border border-sabiduria-gold/25 text-sabiduria-gold rounded-lg font-heading font-semibold text-sm mb-3 hover:bg-sabiduria-gold/10 transition-all flex items-center justify-center gap-2">
                            <BookOpen size={17} /> El Desafío Supremo
                        </button>
                    )}
                    <button onClick={() => setScreen('studio')}
                        className="w-full py-4 bg-sabiduria-gold text-sabiduria-navy rounded-lg font-heading font-bold mb-3 hover:bg-sabiduria-gold/90 active:scale-95 transition-all">
                        Estudio Creativo →
                    </button>
                    <button onClick={() => { setLives(3); setHighestLevel(1); setScreen('home'); }}
                        className="text-white/35 font-heading text-sm hover:text-white/70 transition-colors">
                        Jugar de nuevo
                    </button>
                </div>
            </motion.div>
        );
    }

    // ── CHALLENGE INTRO ─────────────────────────────────────────────────
    if (screen === 'challengeIntro') {
        const available = challengesData.challenges;
        const nextIdx = challengesCompleted;
        const next = available[nextIdx];
        const allDone = challengesCompleted >= available.length;

        const startChallenge = (ch) => {
            setCurrentChallenge(ch);
            setChallengeQIndex(0);
            setChallengeAnswered(false);
            setChallengeSelectedId(null);
            setChallengeScore(0);
            setScreen('challengeReading');
        };

        return (
            <motion.div key="challengeIntro" variants={screenIn} initial="initial" animate="animate"
                className="bg-gradient-to-b from-amber-950 to-slate-950 text-amber-100 flex flex-col items-center justify-center p-8 min-h-[600px] rounded-xl border border-amber-900/30 shadow-2xl">
                <div className="max-w-lg w-full text-center">
                    <div className="inline-block p-5 bg-amber-900/25 rounded-full mb-6 border border-amber-800/25">
                        <BookOpen size={52} className="text-amber-400" />
                    </div>
                    <h1 className="text-3xl font-serif font-bold mb-1 text-amber-200">El Desafío Supremo</h1>
                    <p className="text-amber-500/50 text-[11px] font-heading uppercase tracking-widest mb-7">Lectura y discernimiento bíblico</p>

                    {allDone ? (
                        <>
                            <div className="bg-emerald-900/20 border border-emerald-700/25 p-5 rounded-xl mb-5">
                                <Trophy size={32} className="text-emerald-400 mx-auto mb-2" />
                                <p className="text-emerald-300 font-bold mb-1">¡Todos los desafíos completados!</p>
                                <p className="text-emerald-400/55 text-sm">Has demostrado discernimiento bíblico.</p>
                            </div>
                            <button onClick={() => setScreen('victory')}
                                className="w-full py-4 bg-amber-800/25 text-amber-100 rounded-xl font-bold hover:bg-amber-800/45 transition-all border border-amber-700/25">
                                Volver
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="text-amber-400/60 text-sm mb-5">Desafío {nextIdx + 1} de {available.length}</p>
                            <div className="space-y-2.5 mb-6">
                                {available.map((ch, idx) => {
                                    const done = idx < challengesCompleted;
                                    const cur = idx === nextIdx;
                                    return (
                                        <div key={ch.id} className={`p-4 rounded-xl border text-left flex items-center gap-3 ${
                                            done ? 'bg-emerald-900/20 border-emerald-700/20'
                                            : cur ? 'bg-amber-800/20 border-amber-600/30'
                                            : 'bg-slate-900/40 border-slate-700/20 opacity-35'
                                        }`}>
                                            <span className="text-lg shrink-0">
                                                {done ? '✅' : cur ? '📖' : <Lock size={14} className="text-slate-500" />}
                                            </span>
                                            <div>
                                                <p className={`font-bold text-sm ${done ? 'text-emerald-300' : cur ? 'text-amber-200' : 'text-slate-500'}`}>{ch.title}</p>
                                                <p className={`text-xs ${done ? 'text-emerald-500/55' : cur ? 'text-amber-500/55' : 'text-slate-600'}`}>{ch.reference}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <button onClick={() => startChallenge(next)}
                                className="w-full py-4 bg-amber-700/35 text-amber-100 rounded-xl font-bold hover:bg-amber-700/55 transition-all border border-amber-600/25 active:scale-95 mb-3">
                                Comenzar: {next.title}
                            </button>
                            <button onClick={() => setScreen('victory')} className="text-amber-500/45 hover:text-amber-400 transition-colors text-sm">
                                Volver
                            </button>
                        </>
                    )}
                </div>
            </motion.div>
        );
    }

    // ── CHALLENGE READING ────────────────────────────────────────────────
    if (screen === 'challengeReading' && currentChallenge) return (
        <motion.div key="challengeReading" variants={screenIn} initial="initial" animate="animate"
            className="bg-gradient-to-b from-amber-950 to-slate-950 text-amber-100 flex flex-col items-center p-8 min-h-[600px] rounded-xl border border-amber-900/30 shadow-2xl overflow-y-auto">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-500/55">{currentChallenge.reference}</span>
                    <h2 className="text-2xl font-serif font-bold mt-2 text-amber-200">{currentChallenge.title}</h2>
                </div>
                {currentChallenge.intro && (
                    <div className="bg-amber-900/20 border border-amber-800/20 p-4 rounded-xl mb-5 text-center">
                        <p className="text-amber-300/75 italic text-sm font-serif">{currentChallenge.intro}</p>
                    </div>
                )}
                <div className="bg-slate-900/55 border border-amber-900/12 p-8 rounded-xl mb-6">
                    <p className="text-base text-amber-100/85 leading-loose font-serif whitespace-pre-wrap">{currentChallenge.passage}</p>
                </div>
                <button onClick={() => setScreen('challengeQuestion')}
                    className="w-full py-4 bg-amber-700/35 text-amber-100 rounded-xl font-bold hover:bg-amber-700/55 transition-all border border-amber-600/25 active:scale-95">
                    He terminado de leer →
                </button>
            </div>
        </motion.div>
    );

    // ── CHALLENGE QUESTION ───────────────────────────────────────────────
    if (screen === 'challengeQuestion' && currentChallenge) {
        const q = currentChallenge.questions[challengeQIndex];
        const isLast = challengeQIndex === currentChallenge.questions.length - 1;
        const isCorrect = challengeSelectedId === q.correctIndex;

        const handleChallengeAnswer = (idx) => {
            if (challengeAnswered) return;
            setChallengeSelectedId(idx);
            setChallengeAnswered(true);
            if (idx === q.correctIndex) {
                setChallengeScore(s => s + 10);
                setScore(s => s + 10);
                setCurrency(c => c + 30);
            }
        };

        const handleChallengeNext = () => {
            if (isLast) setScreen('challengeComplete');
            else { setChallengeQIndex(i => i + 1); setChallengeAnswered(false); setChallengeSelectedId(null); }
        };

        return (
            <motion.div key={`cq-${challengeQIndex}`} variants={screenIn} initial="initial" animate="animate"
                className="bg-gradient-to-b from-amber-950 to-slate-950 text-amber-100 flex flex-col items-center p-6 min-h-[600px] rounded-xl border border-amber-900/30 shadow-2xl">
                <div className="max-w-2xl w-full">
                    <div className="text-center mb-5">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-500/55">
                            Pregunta {challengeQIndex + 1} de {currentChallenge.questions.length}
                        </span>
                    </div>
                    <div className="bg-slate-900/55 border border-amber-900/12 p-7 rounded-xl mb-5">
                        <h3 className="text-lg font-serif text-amber-100 leading-relaxed">{q.question}</h3>
                    </div>
                    <div className="space-y-2.5 mb-5">
                        {q.options.map((opt, idx) => {
                            let cls = 'bg-amber-900/12 border-amber-800/20 hover:bg-amber-800/22 hover:border-amber-700/35';
                            if (challengeSelectedId !== null) {
                                if (idx === q.correctIndex) cls = 'bg-emerald-900/22 border-emerald-600/35 text-emerald-300';
                                else if (idx === challengeSelectedId) cls = 'bg-red-900/22 border-red-600/35 text-red-300';
                                else cls = 'opacity-25 border-transparent';
                            }
                            return (
                                <button key={idx} onClick={() => handleChallengeAnswer(idx)} disabled={challengeAnswered}
                                    className={`w-full p-4 rounded-xl text-left font-serif text-sm transition-all border ${cls}`}>
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                    {challengeAnswered && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            className={`p-5 rounded-xl mb-5 border ${isCorrect ? 'bg-emerald-900/18 border-emerald-800/25' : 'bg-amber-900/18 border-amber-800/25'}`}>
                            <p className={`text-sm font-serif leading-relaxed ${isCorrect ? 'text-emerald-300' : 'text-amber-200'}`}>
                                {isCorrect ? (q.feedbackCorrecto || 'Correcto.') : (q.feedbackIncorrecto || 'Revisa el pasaje nuevamente.')}
                            </p>
                        </motion.div>
                    )}
                    {challengeAnswered && (
                        <button onClick={handleChallengeNext}
                            className="w-full py-4 bg-amber-700/35 text-amber-100 rounded-xl font-bold hover:bg-amber-700/55 transition-all border border-amber-600/25 active:scale-95">
                            {isLast ? 'Ver Resultado' : 'Siguiente →'}
                        </button>
                    )}
                </div>
            </motion.div>
        );
    }

    // ── CHALLENGE COMPLETE ───────────────────────────────────────────────
    if (screen === 'challengeComplete') {
        const handleContinue = () => {
            const idx = challengesData.challenges.findIndex(c => c.id === currentChallenge.id);
            if (idx >= challengesCompleted) setChallengesCompleted(idx + 1);
            setScreen('challengeIntro');
        };
        return (
            <motion.div key="challengeComplete" variants={screenIn} initial="initial" animate="animate"
                className="bg-gradient-to-b from-amber-950 to-slate-950 text-amber-100 flex flex-col items-center justify-center p-8 min-h-[600px] rounded-xl border border-amber-900/30 shadow-2xl">
                <div className="max-w-sm text-center">
                    <motion.div initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 180 }} className="mb-5">
                        <BookOpen size={68} className="text-amber-400 mx-auto" />
                    </motion.div>
                    <h2 className="text-2xl font-serif font-bold mb-2 text-amber-200">Desafío Completado</h2>
                    <p className="text-amber-400 font-bold text-sm mb-1">{currentChallenge?.title}</p>
                    <p className="text-amber-300/55 text-sm mb-7 font-serif">Has terminado este ejercicio de lectura y discernimiento.</p>
                    <div className="bg-amber-900/18 border border-amber-800/25 p-5 rounded-xl mb-6">
                        <div className="text-3xl font-heading font-bold text-amber-300 mb-1">+{challengeScore}</div>
                        <p className="text-amber-500/55 text-xs font-heading uppercase tracking-wider">Puntos en este desafío</p>
                    </div>
                    <button onClick={handleContinue}
                        className="w-full py-4 bg-amber-700/35 text-amber-100 rounded-xl font-bold hover:bg-amber-700/55 transition-all border border-amber-600/25">
                        Continuar →
                    </button>
                </div>
            </motion.div>
        );
    }

    // ── STUDIO ───────────────────────────────────────────────────────────
    if (screen === 'studio') return (
        <motion.div key="studio" variants={screenIn} initial="initial" animate="animate"
            className="bg-slate-950 text-white flex flex-col lg:flex-row rounded-xl overflow-hidden min-h-[700px] border border-white/8 shadow-2xl">

            {/* Sidebar */}
            <div className="w-full lg:w-96 bg-slate-900 p-7 flex flex-col gap-6 overflow-y-auto border-r border-white/5">
                <div className="flex justify-between items-center">
                    <button onClick={() => setScreen('home')}
                        className="text-slate-500 hover:text-white transition-colors text-xs font-heading uppercase tracking-widest font-bold">
                        ← Salir
                    </button>
                    <div className="bg-sabiduria-gold/8 text-sabiduria-gold px-3 py-1 rounded-full border border-sabiduria-gold/20 font-bold text-sm">
                        {currency} cr.
                    </div>
                </div>

                <div>
                    <h2 className="font-heading font-bold text-white text-lg mb-0.5">Estudio Creativo</h2>
                    <p className="text-slate-500 text-xs font-serif">Crea imágenes con versículos para compartir</p>
                </div>

                <section>
                    <h3 className="text-[11px] font-bold text-slate-500 mb-3 uppercase tracking-[0.3em] flex items-center gap-2">
                        <Mountain size={13} /> Fondos
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                        {UNLOCKABLES.map(item => {
                            const unlocked = unlockedItems.includes(item.id);
                            const isActive = canvasBg.value === (item.url || item.color);
                            return (
                                <button key={item.id}
                                    onClick={() => unlocked ? setCanvasBg({ type: item.type, value: item.url || item.color }) : unlockItem(item)}
                                    title={unlocked ? item.label : `Desbloquear: ${item.cost} créditos`}
                                    className={`h-20 rounded-xl overflow-hidden relative border-2 transition-all ${
                                        unlocked
                                            ? isActive ? 'border-sabiduria-gold scale-95 shadow-md shadow-sabiduria-gold/15' : 'border-transparent hover:border-white/20'
                                            : 'opacity-30 border-slate-700'
                                    }`}>
                                    {item.type === 'img'
                                        ? <img src={item.url} alt={item.label} className="w-full h-full object-cover" loading="lazy" />
                                        : <div className={`w-full h-full bg-gradient-to-br ${item.color}`} />
                                    }
                                    {!unlocked && (
                                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-1 text-xs font-bold text-sabiduria-gold">
                                            <Lock size={12} />{item.cost}
                                        </div>
                                    )}
                                    {unlocked && isActive && (
                                        <div className="absolute bottom-1.5 right-1.5 w-5 h-5 bg-sabiduria-gold rounded-full flex items-center justify-center">
                                            <Check size={10} className="text-sabiduria-navy" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </section>

                <section>
                    <h3 className="text-[11px] font-bold text-slate-500 mb-3 uppercase tracking-[0.3em] flex items-center gap-2">
                        <Zap size={13} /> Versículo
                    </h3>
                    <textarea
                        value={canvasText}
                        onChange={e => setCanvasText(e.target.value)}
                        className="w-full bg-slate-800 p-4 rounded-xl text-sm font-serif border border-slate-700 h-28 focus:border-sabiduria-gold/40 outline-none transition-all placeholder-slate-600 resize-none text-white leading-relaxed"
                        placeholder="Escribe tu versículo o texto..."
                    />
                </section>
            </div>

            {/* Canvas preview */}
            <div className="flex-1 flex flex-col items-center justify-center p-10 bg-black/20">
                <p className="text-slate-600 text-[10px] font-heading uppercase tracking-widest mb-5">Vista previa</p>
                <div className="relative w-full max-w-xs aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 group">
                    {canvasBg.type === 'img' ? (
                        <>
                            <img src={canvasBg.value} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/45" />
                        </>
                    ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${canvasBg.value}`} />
                    )}
                    <div className="relative z-10 h-full flex items-center justify-center p-10 text-center">
                        <p className="text-2xl font-serif font-bold text-white italic drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)] leading-tight">
                            "{canvasText}"
                        </p>
                    </div>
                    <div className="absolute bottom-6 w-full text-center text-white/20 text-[8px] font-heading font-bold tracking-[0.5em] uppercase">
                        SABIDURÍA PARA EL CORAZÓN
                    </div>
                </div>
                <button
                    className="mt-8 bg-white text-slate-900 px-10 py-4 rounded-2xl font-heading font-bold flex items-center gap-2 hover:bg-slate-100 transition-all active:scale-95 shadow-xl text-sm uppercase tracking-wider"
                    title="Función de descarga próximamente"
                >
                    <Download size={18} /> Descargar
                </button>
            </div>
        </motion.div>
    );

    return null;
};

export default BibliaFlow;
