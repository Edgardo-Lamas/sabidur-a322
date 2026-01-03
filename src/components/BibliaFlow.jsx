import React, { useState, useEffect, useRef } from 'react';
import {
    Sparkles, ChevronRight, Heart, Trophy, Mountain,
    Zap, Download, Lock, Star, Award, Clock, BookOpen
} from 'lucide-react';
import questionsData from '../data/questions.json';
import challengesData from '../data/challenges.json';

// Level configuration
const LEVELS = {
    1: { name: 'Inicial', difficulty: 'easy', questionsPerLevel: 15, minToPass: 12, bonusCredits: 50, color: 'from-green-400 to-emerald-500', timePerQuestion: 30, pointsPerCorrect: 1 },
    2: { name: 'Medio', difficulty: 'medium', questionsPerLevel: 15, minToPass: 12, bonusCredits: 75, color: 'from-yellow-400 to-orange-500', timePerQuestion: 30, pointsPerCorrect: 2 },
    3: { name: 'Difícil', difficulty: 'hard', questionsPerLevel: 15, minToPass: 12, bonusCredits: 100, color: 'from-orange-500 to-red-500', timePerQuestion: 25, pointsPerCorrect: 3 },
    4: { name: 'Experto', difficulty: 'expert', questionsPerLevel: 15, minToPass: 12, bonusCredits: 150, color: 'from-purple-500 to-pink-500', timePerQuestion: 20, pointsPerCorrect: 5 }
};

// Filter questions by difficulty (all current questions are 'easy')
const getQuestionsByDifficulty = (difficulty) => {
    const questions = questionsData.questions.filter(q => (q.difficulty || 'easy') === difficulty);
    // If no questions for this difficulty, fall back to all questions
    return questions.length > 0 ? questions : questionsData.questions;
};

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
    const [currentLevel, setCurrentLevel] = useState(1);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [gameQuestions, setGameQuestions] = useState([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [unlockedItems, setUnlockedItems] = useState(['bg_sunset', 'bg_ocean', 'bg_forest']);
    const [canvasBg, setCanvasBg] = useState({ type: 'bg', value: 'from-indigo-500 to-purple-600' });
    const [canvasText, setCanvasText] = useState("Lámpara es a mis pies tu palabra");
    const [levelResult, setLevelResult] = useState(null); // 'passed', 'perfect', 'failed'
    const [timeLeft, setTimeLeft] = useState(30);
    const timerRef = useRef(null);

    // Challenge state
    const [currentChallenge, setCurrentChallenge] = useState(null);
    const [challengeQIndex, setChallengeQIndex] = useState(0);
    const [challengeAnswered, setChallengeAnswered] = useState(false);
    const [challengeSelectedId, setChallengeSelectedId] = useState(null);
    const [challengeScore, setChallengeScore] = useState(0);

    // Timer effect
    useEffect(() => {
        if (screen === 'game' && !isAnswered && timeLeft > 0) {
            timerRef.current = setTimeout(() => {
                setTimeLeft(t => t - 1);
            }, 1000);
        } else if (screen === 'game' && !isAnswered && timeLeft === 0) {
            // Time's up - count as wrong answer
            handleTimeOut();
        }
        return () => clearTimeout(timerRef.current);
    }, [screen, timeLeft, isAnswered]);

    const handleTimeOut = () => {
        setIsAnswered(true);
        setSelectedOptionId(-1); // No option selected
        setLives(l => l - 1);
    };

    const startGame = (level = 1) => {
        const levelConfig = LEVELS[level];
        const questions = getQuestionsByDifficulty(levelConfig.difficulty);

        const prepared = questions.map(q => ({
            ...q,
            shuffledOptions: shuffleArray(
                q.options.map((opt, i) => ({
                    id: i,
                    text: opt,
                    isCorrect: i === q.correctIndex
                }))
            )
        }));

        // Take only the required number of questions for this level
        const shuffled = shuffleArray(prepared).slice(0, levelConfig.questionsPerLevel);

        setGameQuestions(shuffled);
        setCurrentLevel(level);
        setScore(0);
        setCorrectAnswers(0);
        setCurrentQIndex(0);
        setIsAnswered(false);
        setSelectedOptionId(null);
        setLevelResult(null);
        setTimeLeft(levelConfig.timePerQuestion);
        setScreen('game');
    };

    const handleAnswer = (opt) => {
        if (isAnswered) return;
        setSelectedOptionId(opt.id);
        setIsAnswered(true);
        if (opt.isCorrect) {
            const levelConfig = LEVELS[currentLevel];
            setScore(s => s + levelConfig.pointsPerCorrect);
            setCurrency(c => c + 20);
            setCorrectAnswers(c => c + 1);
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
        const levelConfig = LEVELS[currentLevel];
        const isLastQuestion = currentQIndex === gameQuestions.length - 1;
        const isGameOver = lives === 0;

        if (isGameOver) {
            setLevelResult('failed');
            setScreen('levelResult');
            return;
        }

        if (isLastQuestion) {
            // Check if passed the level
            if (correctAnswers + (isAnswered && selectedOptionId !== null ? 1 : 0) >= levelConfig.minToPass) {
                const finalCorrect = correctAnswers;
                const isPerfect = finalCorrect === levelConfig.questionsPerLevel;

                if (isPerfect) {
                    setLives(l => l + 1); // Bonus life for perfect score
                    setCurrency(c => c + levelConfig.bonusCredits * 2); // Double bonus
                    setLevelResult('perfect');
                } else {
                    setCurrency(c => c + levelConfig.bonusCredits);
                    setLevelResult('passed');
                }
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

    const continueToNextLevel = () => {
        if (currentLevel < 4) {
            startGame(currentLevel + 1);
        } else {
            setScreen('victory');
        }
    };

    const retryLevel = () => {
        setLives(3);
        startGame(currentLevel);
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
                    <p className="text-slate-400 text-lg font-medium mb-6">
                        Desafía tu conocimiento y crea arte épico.
                    </p>

                    {/* Stats */}
                    <div className="flex justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <Heart className="text-rose-500" fill="currentColor" size={20} />
                            <span className="font-bold">{lives}</span>
                        </div>
                        <div className="text-yellow-400 font-bold">
                            $ {currency}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => startGame(1)}
                    className="group relative bg-indigo-600 px-16 py-6 rounded-2xl font-black text-2xl hover:bg-indigo-500 transition-all mb-6 shadow-[0_0_40px_rgba(79,70,229,0.4)] active:scale-95 flex items-center gap-3"
                >
                    EMPEZAR NIVEL 1
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
        const levelConfig = LEVELS[currentLevel];
        const progress = ((currentQIndex + 1) / levelConfig.questionsPerLevel) * 100;

        return (
            <div className="bg-slate-900 text-white p-4 flex flex-col items-center min-h-[600px] rounded-3xl border border-white/10 shadow-2xl">
                {/* Level Header */}
                <div className={`w-full max-w-2xl bg-gradient-to-r ${levelConfig.color} p-3 rounded-xl mb-4 mt-2`}>
                    <div className="flex justify-between items-center text-white">
                        <span className="font-black text-sm uppercase tracking-wider">
                            NIVEL {currentLevel}: {levelConfig.name}
                        </span>
                        <span className="font-bold text-sm">
                            {currentQIndex + 1} / {levelConfig.questionsPerLevel}
                        </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-black/30 rounded-full h-2 mt-2">
                        <div
                            className="bg-white h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="w-full max-w-2xl flex justify-between items-center mb-6 bg-black/30 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2">
                        <Heart className="text-rose-500" fill="currentColor" />
                        <span className="font-black text-xl">{lives}</span>
                    </div>

                    {/* Timer */}
                    {!isAnswered && (
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xl transition-all ${timeLeft <= 5 ? 'bg-red-500/20 text-red-400 animate-pulse' :
                            timeLeft <= 10 ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-cyan-500/10 text-cyan-400'
                            }`}>
                            <Clock size={20} />
                            <span>{timeLeft}s</span>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <Star className="text-green-400" fill="currentColor" />
                        <span className="font-black text-xl">{correctAnswers}</span>
                        <span className="text-slate-400 text-sm">/ {levelConfig.minToPass}</span>
                    </div>
                    <div className="bg-yellow-400/10 text-yellow-400 px-4 py-1 rounded-full border border-yellow-400/20 font-bold">
                        $ {currency}
                    </div>
                </div>

                {/* Question Card */}
                <div className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white/10 shadow-2xl">
                    <span className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-2 block">
                        {q?.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight text-white">
                        {q?.question}
                    </h2>

                    {/* Options */}
                    <div className="grid gap-3">
                        {q?.shuffledOptions.map(o => (
                            <button
                                key={o.id}
                                onClick={() => handleAnswer(o)}
                                className={`p-4 rounded-xl text-left border-2 font-bold text-base transition-all ${selectedOptionId === null
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
                        <div className="mt-6 text-center border-t border-white/10 pt-6">
                            <p className="text-slate-300 text-base mb-6 italic">
                                "{q.explanation}"
                            </p>
                            <button
                                onClick={handleNext}
                                className="w-full py-4 bg-white text-slate-900 font-black rounded-xl hover:bg-indigo-50 shadow-lg active:scale-95 transition-all"
                            >
                                {currentQIndex === gameQuestions.length - 1 ? 'VER RESULTADO' : 'CONTINUAR'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // LEVEL RESULT SCREEN
    if (screen === 'levelResult') {
        const levelConfig = LEVELS[currentLevel];
        const isPerfect = levelResult === 'perfect';
        const isPassed = levelResult === 'passed' || isPerfect;

        return (
            <div className="bg-slate-900 text-white flex flex-col items-center justify-center p-6 min-h-[600px] rounded-3xl border border-white/10 shadow-2xl">
                <div className="bg-white/5 p-10 rounded-[3rem] text-center border border-white/10 shadow-2xl max-w-md w-full">
                    {isPassed ? (
                        <>
                            {isPerfect ? (
                                <Award size={80} className="text-yellow-400 mx-auto mb-6" />
                            ) : (
                                <Trophy size={80} className="text-green-400 mx-auto mb-6" />
                            )}
                            <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter text-white">
                                {isPerfect ? '¡PERFECTO!' : '¡NIVEL COMPLETADO!'}
                            </h2>
                            <p className={`text-lg font-bold mb-4 ${isPerfect ? 'text-yellow-400' : 'text-green-400'}`}>
                                Nivel {currentLevel}: {levelConfig.name}
                            </p>

                            <div className="bg-black/30 p-4 rounded-2xl mb-6">
                                <div className="text-3xl font-black text-white mb-2">
                                    {correctAnswers} / {levelConfig.questionsPerLevel}
                                </div>
                                <p className="text-slate-400 text-sm">Respuestas correctas</p>
                            </div>

                            {/* Rewards Summary */}
                            <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl mb-6 space-y-3">
                                <div className="flex items-center justify-center gap-2 text-green-400 font-bold">
                                    <span>💰 +{isPerfect ? levelConfig.bonusCredits * 2 : levelConfig.bonusCredits} créditos</span>
                                </div>
                                {isPerfect && (
                                    <div className="flex items-center justify-center gap-2 text-yellow-400 font-bold">
                                        <Heart fill="currentColor" size={18} />
                                        <span>+1 VIDA EXTRA</span>
                                    </div>
                                )}
                                <div className="border-t border-white/10 pt-3 mt-3">
                                    <div className="text-yellow-400 font-black text-xl">
                                        Total: $ {currency}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={continueToNextLevel}
                                className={`w-full py-5 bg-gradient-to-r ${currentLevel < 4 ? LEVELS[currentLevel + 1].color : 'from-indigo-600 to-purple-600'} rounded-2xl font-black text-xl mb-4 hover:opacity-90 shadow-lg active:scale-95 transition-all`}
                            >
                                {currentLevel < 4 ? `SIGUIENTE: NIVEL ${currentLevel + 1}` : 'VER VICTORIA'}
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="text-6xl mb-6">😔</div>
                            <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter text-red-400">
                                ¡NIVEL NO SUPERADO!
                            </h2>
                            <p className="text-slate-400 mb-4">
                                Necesitabas {levelConfig.minToPass} correctas, obtuviste {correctAnswers}
                            </p>

                            <div className="bg-black/30 p-4 rounded-2xl mb-6">
                                <div className="text-3xl font-black text-red-400 mb-2">
                                    {correctAnswers} / {levelConfig.questionsPerLevel}
                                </div>
                                <p className="text-slate-400 text-sm">Respuestas correctas</p>
                            </div>

                            <button
                                onClick={retryLevel}
                                className="w-full py-5 bg-indigo-600 rounded-2xl font-black text-xl mb-4 hover:bg-indigo-500 shadow-lg active:scale-95 transition-all"
                            >
                                REINTENTAR NIVEL {currentLevel}
                            </button>
                        </>
                    )}

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

    // VICTORY SCREEN
    if (screen === 'victory') {
        const hasChallenge = challengesData.challenges && challengesData.challenges.length > 0;

        return (
            <div className="bg-slate-900 text-white flex flex-col items-center justify-center p-6 min-h-[600px] rounded-3xl border border-white/10 shadow-2xl">
                <div className="bg-gradient-to-br from-yellow-400/20 to-purple-600/20 p-12 rounded-[3rem] text-center border border-yellow-400/30 shadow-2xl max-w-md w-full">
                    <div className="text-7xl mb-6">🏆</div>
                    <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter bg-gradient-to-r from-yellow-400 to-purple-400 text-transparent bg-clip-text">
                        ¡LEYENDA!
                    </h2>
                    <p className="text-xl text-slate-300 mb-8">
                        Has completado todos los niveles de Biblia Flow
                    </p>

                    <div className="bg-black/30 p-4 rounded-2xl mb-8">
                        <div className="text-4xl font-black text-yellow-400 mb-2">
                            $ {currency}
                        </div>
                        <p className="text-slate-400 text-sm">Créditos totales</p>
                    </div>

                    {hasChallenge && (
                        <button
                            onClick={() => setScreen('challengeIntro')}
                            className="w-full py-5 bg-gradient-to-r from-amber-700 to-amber-900 text-amber-100 rounded-2xl font-bold text-lg mb-4 hover:opacity-90 shadow-lg active:scale-95 transition-all border border-amber-600/30 flex items-center justify-center gap-3"
                        >
                            <BookOpen size={24} />
                            EL DESAFÍO SUPREMO
                        </button>
                    )}

                    <button
                        onClick={() => setScreen('studio')}
                        className="w-full py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 rounded-2xl font-black text-xl mb-4 hover:opacity-90 shadow-lg active:scale-95 transition-all"
                    >
                        IR AL ESTUDIO 🎨
                    </button>
                    <button
                        onClick={() => {
                            setLives(3);
                            setScreen('home');
                        }}
                        className="text-slate-400 font-bold hover:text-white transition-colors"
                    >
                        JUGAR DE NUEVO
                    </button>
                </div>
            </div>
        );
    }

    // CHALLENGE INTRO SCREEN (Transition)
    if (screen === 'challengeIntro') {
        const challenge = challengesData.challenges[0]; // First challenge

        const startChallenge = () => {
            setCurrentChallenge(challenge);
            setChallengeQIndex(0);
            setChallengeAnswered(false);
            setChallengeSelectedId(null);
            setChallengeScore(0);
            setScreen('challengeReading');
        };

        return (
            <div className="bg-gradient-to-b from-amber-950 to-slate-950 text-amber-100 flex flex-col items-center justify-center p-8 min-h-[600px] rounded-3xl border border-amber-900/30 shadow-2xl">
                <div className="max-w-lg text-center">
                    <div className="inline-block p-6 bg-amber-900/20 rounded-full mb-8 border border-amber-800/30">
                        <BookOpen size={64} className="text-amber-400" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-amber-200">
                        El Desafío Supremo
                    </h1>

                    <p className="text-lg text-amber-300/80 mb-8 leading-relaxed font-light">
                        Este no es un quiz de velocidad. Es un ejercicio de lectura profunda y discernimiento bíblico.
                    </p>

                    <div className="bg-amber-900/20 border border-amber-800/30 p-6 rounded-2xl mb-8">
                        <p className="text-amber-200/90 italic font-serif text-lg leading-relaxed">
                            "Bienaventurado el que lee, y los que oyen las palabras de esta profecía, y guardan las cosas en ella escritas."
                        </p>
                        <p className="text-amber-400/60 text-sm mt-3">— Apocalipsis 1:3</p>
                    </div>

                    <button
                        onClick={startChallenge}
                        className="px-12 py-5 bg-amber-800/40 text-amber-100 rounded-2xl font-bold text-lg hover:bg-amber-800/60 transition-all border border-amber-700/40 active:scale-95"
                    >
                        COMENZAR LECTURA
                    </button>

                    <button
                        onClick={() => setScreen('victory')}
                        className="block mx-auto mt-6 text-amber-500/60 hover:text-amber-400 transition-colors text-sm"
                    >
                        Volver
                    </button>
                </div>
            </div>
        );
    }

    // CHALLENGE READING SCREEN
    if (screen === 'challengeReading' && currentChallenge) {
        return (
            <div className="bg-gradient-to-b from-amber-950 to-slate-950 text-amber-100 flex flex-col items-center p-8 min-h-[600px] rounded-3xl border border-amber-900/30 shadow-2xl overflow-y-auto">
                <div className="max-w-2xl w-full">
                    <div className="text-center mb-8">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500/60">
                            {currentChallenge.reference}
                        </span>
                        <h2 className="text-2xl font-serif font-bold mt-2 text-amber-200">
                            {currentChallenge.title}
                        </h2>
                    </div>

                    {currentChallenge.intro && (
                        <div className="bg-amber-900/20 border border-amber-800/30 p-4 rounded-xl mb-8 text-center">
                            <p className="text-amber-300/80 italic">
                                {currentChallenge.intro}
                            </p>
                        </div>
                    )}

                    <div className="bg-slate-900/50 border border-amber-900/20 p-8 rounded-2xl mb-8">
                        <p className="text-lg text-amber-100/90 leading-relaxed font-serif whitespace-pre-wrap">
                            {currentChallenge.passage}
                        </p>
                    </div>

                    <button
                        onClick={() => setScreen('challengeQuestion')}
                        className="w-full py-5 bg-amber-800/40 text-amber-100 rounded-2xl font-bold text-lg hover:bg-amber-800/60 transition-all border border-amber-700/40 active:scale-95"
                    >
                        HE TERMINADO DE LEER
                    </button>
                </div>
            </div>
        );
    }

    // CHALLENGE QUESTION SCREEN
    if (screen === 'challengeQuestion' && currentChallenge) {
        const q = currentChallenge.questions[challengeQIndex];
        const isLastQuestion = challengeQIndex === currentChallenge.questions.length - 1;

        const handleChallengeAnswer = (optIndex) => {
            if (challengeAnswered) return;
            setChallengeSelectedId(optIndex);
            setChallengeAnswered(true);
            if (optIndex === q.correctIndex) {
                setChallengeScore(s => s + 10);
                setScore(s => s + 10);
                setCurrency(c => c + 30);
            }
        };

        const handleChallengeNext = () => {
            if (isLastQuestion) {
                setScreen('challengeComplete');
            } else {
                setChallengeQIndex(i => i + 1);
                setChallengeAnswered(false);
                setChallengeSelectedId(null);
            }
        };

        const isCorrect = challengeSelectedId === q.correctIndex;

        return (
            <div className="bg-gradient-to-b from-amber-950 to-slate-950 text-amber-100 flex flex-col items-center p-6 min-h-[600px] rounded-3xl border border-amber-900/30 shadow-2xl">
                <div className="max-w-2xl w-full">
                    {/* Progress */}
                    <div className="text-center mb-6">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500/60">
                            Pregunta {challengeQIndex + 1} de {currentChallenge.questions.length}
                        </span>
                    </div>

                    {/* Question */}
                    <div className="bg-slate-900/50 border border-amber-900/20 p-8 rounded-2xl mb-6">
                        <h3 className="text-xl font-serif text-amber-100 leading-relaxed">
                            {q.question}
                        </h3>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 mb-6">
                        {q.options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleChallengeAnswer(idx)}
                                disabled={challengeAnswered}
                                className={`w-full p-4 rounded-xl text-left font-medium transition-all border ${challengeSelectedId === null
                                        ? 'bg-amber-900/20 border-amber-800/30 hover:bg-amber-800/30 hover:border-amber-700/50'
                                        : idx === q.correctIndex
                                            ? 'bg-green-900/30 border-green-600/50 text-green-300'
                                            : idx === challengeSelectedId
                                                ? 'bg-red-900/30 border-red-600/50 text-red-300'
                                                : 'opacity-40 border-transparent'
                                    }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>

                    {/* Feedback */}
                    {challengeAnswered && (
                        <div className={`p-6 rounded-xl mb-6 border ${isCorrect ? 'bg-green-900/20 border-green-800/30' : 'bg-amber-900/20 border-amber-800/30'}`}>
                            <p className={`text-base leading-relaxed ${isCorrect ? 'text-green-300' : 'text-amber-200'}`}>
                                {isCorrect ? (q.feedbackCorrecto || 'Correcto.') : (q.feedbackIncorrecto || 'Revisa el pasaje nuevamente.')}
                            </p>
                        </div>
                    )}

                    {/* Continue */}
                    {challengeAnswered && (
                        <button
                            onClick={handleChallengeNext}
                            className="w-full py-4 bg-amber-800/40 text-amber-100 rounded-xl font-bold hover:bg-amber-800/60 transition-all border border-amber-700/40 active:scale-95"
                        >
                            {isLastQuestion ? 'VER RESULTADO' : 'SIGUIENTE'}
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // CHALLENGE COMPLETE SCREEN
    if (screen === 'challengeComplete') {
        return (
            <div className="bg-gradient-to-b from-amber-950 to-slate-950 text-amber-100 flex flex-col items-center justify-center p-8 min-h-[600px] rounded-3xl border border-amber-900/30 shadow-2xl">
                <div className="max-w-md text-center">
                    <div className="text-6xl mb-6">📖</div>
                    <h2 className="text-3xl font-serif font-bold mb-4 text-amber-200">
                        Desafío Completado
                    </h2>
                    <p className="text-amber-300/80 mb-8">
                        Has terminado este ejercicio de lectura y discernimiento.
                    </p>

                    <div className="bg-amber-900/20 border border-amber-800/30 p-6 rounded-2xl mb-8">
                        <div className="text-4xl font-black text-amber-300 mb-2">
                            +{challengeScore} puntos
                        </div>
                        <p className="text-amber-500/60 text-sm">En este desafío</p>
                    </div>

                    <button
                        onClick={() => setScreen('victory')}
                        className="w-full py-5 bg-amber-800/40 text-amber-100 rounded-2xl font-bold hover:bg-amber-800/60 transition-all border border-amber-700/40"
                    >
                        CONTINUAR
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
