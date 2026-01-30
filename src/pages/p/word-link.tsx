"use client";

import React, { useState, useMemo, useEffect } from "react";
import Head from "next/head";

// --- LEVEL DATA ---
const LEVEL_DATA = {
  id: "level_platinum_01",
  letters: ["P", "L", "A", "T", "I", "N", "U", "M"],
  words: [
    "PLATINUM",
    "PLIANT",
    "ULTIMA",
    "PLANT",
    "PLAIN",
    "PAINT",
    "INPUT",
    "UNIT",
    "MAIL",
    "PLAN",
    "ALUM",
    "LUMP",
    "TAP",
    "NIL",
  ],
};

export default function WordLinkPage() {
  const [currentPath, setCurrentPath] = useState<number[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [hints, setHints] = useState<Record<string, number[]>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [shake, setShake] = useState(false);
  const [displayLetters, setDisplayLetters] = useState(LEVEL_DATA.letters);
  const [isLoaded, setIsLoaded] = useState(false);

  const currentWord = useMemo(
    () => currentPath.map((idx) => displayLetters[idx]).join(""),
    [currentPath, displayLetters],
  );

  useEffect(() => {
    const savedFound = localStorage.getItem(`${LEVEL_DATA.id}_found`);
    const savedHints = localStorage.getItem(`${LEVEL_DATA.id}_hints`);
    if (savedFound) setFoundWords(JSON.parse(savedFound));
    if (savedHints) setHints(JSON.parse(savedHints));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        `${LEVEL_DATA.id}_found`,
        JSON.stringify(foundWords),
      );
      localStorage.setItem(`${LEVEL_DATA.id}_hints`, JSON.stringify(hints));
    }
  }, [foundWords, hints, isLoaded]);

  const resetProgress = () => {
    localStorage.removeItem(`${LEVEL_DATA.id}_found`);
    localStorage.removeItem(`${LEVEL_DATA.id}_hints`);
    window.location.reload();
  };

  const shuffleLetters = () => {
    const shuffled = [...displayLetters].sort(() => Math.random() - 0.5);
    setDisplayLetters(shuffled);
    setCurrentPath([]);
  };

  const handleTouchMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const point =
      "touches" in e
        ? (e as React.TouchEvent).touches[0]
        : (e as React.MouseEvent);
    const element = document.elementFromPoint(point.clientX, point.clientY);
    const index = element?.getAttribute("data-index");

    if (index !== null && index !== undefined) {
      const idx = parseInt(index);
      if (!currentPath.includes(idx)) {
        setCurrentPath((prev) => [...prev, idx]);
        if (typeof window !== "undefined" && window.navigator.vibrate) {
          window.navigator.vibrate(10);
        }
      }
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    const upperWord = currentWord.toUpperCase();
    if (
      LEVEL_DATA.words.includes(upperWord) &&
      !foundWords.includes(upperWord)
    ) {
      setFoundWords((prev) => [...prev, upperWord]);
    } else if (currentWord.length > 0) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    setCurrentPath([]);
  };

  const revealHint = () => {
    const remainingWords = LEVEL_DATA.words.filter(
      (w) => !foundWords.includes(w),
    );
    if (remainingWords.length === 0) return;
    const randomWord =
      remainingWords[Math.floor(Math.random() * remainingWords.length)];
    const revealedIndices = hints[randomWord] || [];
    const availableIndices = randomWord
      .split("")
      .map((_, i) => i)
      .filter((i) => !revealedIndices.includes(i));
    if (availableIndices.length > 0) {
      const randomIdx =
        availableIndices[Math.floor(Math.random() * availableIndices.length)];
      setHints((prev) => ({
        ...prev,
        [randomWord]: [...(prev[randomWord] || []), randomIdx],
      }));
    }
  };

  if (!isLoaded) return <div className="min-h-screen bg-slate-950" />;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-200 overflow-x-hidden">
      <Head>
        <title>WordLink | Logic Lab</title>
      </Head>

      {/* --- HERO / GAME SECTION (Logic Lab Dark) --- */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          {/* TOP HEADER */}
          <div className="flex justify-between items-end mb-8 px-2 max-w-6xl mx-auto">
            <div>
              <h1 className="text-3xl font-black italic uppercase text-white tracking-tighter leading-none">
                Word<span className="text-indigo-500">Link</span>
              </h1>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-2">
                Protocol: Lexical
              </p>
            </div>
          </div>

          {/* --- THE BOARD SECTION (EXACT ORIGINAL STRUCTURE) --- */}
          <div className="max-w-6xl w-full mx-auto relative z-10 grid lg:grid-cols-[1fr_380px] gap-6 items-center">
            {/* GAME ENGINE */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-4 md:p-8 shadow-2xl flex flex-col h-full max-h-[90vh]">
              <div className="flex flex-wrap justify-center gap-2 mb-6 overflow-y-auto pr-2 max-h-[25%] scrollbar-hide">
                {LEVEL_DATA.words.map((word) => {
                  const isFound = foundWords.includes(word);
                  const revealed = hints[word] || [];
                  return (
                    <div
                      key={word}
                      className={`px-3 py-1.5 rounded-lg border-2 font-black uppercase tracking-widest text-[10px] md:text-xs transition-all duration-500 ${isFound ? "bg-indigo-600 border-indigo-400 text-white" : "bg-white/5 border-white/10 text-white/10"}`}
                    >
                      {word
                        .split("")
                        .map((char, i) =>
                          isFound || revealed.includes(i) ? char : "•",
                        )}
                    </div>
                  );
                })}
              </div>

              {/* SELECTION BOX */}
              <div className="h-12 flex items-center justify-center mb-4">
                <div
                  className={`px-6 py-2 rounded-xl bg-white text-slate-950 font-black text-2xl md:text-3xl uppercase tracking-widest transition-all ${currentWord ? "scale-100 opacity-100 shadow-xl" : "scale-90 opacity-0"} ${shake ? "animate-shake bg-red-500 text-white" : ""}`}
                >
                  {currentWord || " "}
                </div>
              </div>

              {/* WHEEL */}
              <div className="flex-grow flex items-center justify-center min-h-[280px]">
                <div
                  className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px]"
                  style={{ touchAction: "none" }}
                >
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    {currentPath.length > 1 &&
                      currentPath.map((idx, i) => {
                        if (i === 0) return null;
                        const prev = currentPath[i - 1];
                        const angle1 =
                          (prev * (360 / displayLetters.length) - 90) *
                          (Math.PI / 180);
                        const angle2 =
                          (idx * (360 / displayLetters.length) - 90) *
                          (Math.PI / 180);
                        const center =
                          typeof window !== "undefined" &&
                          window.innerWidth < 768
                            ? 130
                            : 160;
                        const radius = center * 0.72;
                        return (
                          <line
                            key={i}
                            x1={center + radius * Math.cos(angle1)}
                            y1={center + radius * Math.sin(angle1)}
                            x2={center + radius * Math.cos(angle2)}
                            y2={center + radius * Math.sin(angle2)}
                            stroke="#6366f1"
                            strokeWidth="8"
                            strokeLinecap="round"
                          />
                        );
                      })}
                  </svg>

                  <div
                    className="absolute inset-0 rounded-full border-8 border-white/5 bg-slate-800/20"
                    onMouseUp={handleEnd}
                    onTouchEnd={handleEnd}
                  >
                    {displayLetters.map((letter, i) => {
                      const angle =
                        (i * (360 / displayLetters.length) - 90) *
                        (Math.PI / 180);
                      const x = 50 + 38 * Math.cos(angle);
                      const y = 50 + 38 * Math.sin(angle);
                      return (
                        <button
                          key={i}
                          data-index={i}
                          onMouseDown={() => {
                            setIsDragging(true);
                            setCurrentPath([i]);
                          }}
                          onTouchStart={() => {
                            setIsDragging(true);
                            setCurrentPath([i]);
                          }}
                          onMouseMove={handleTouchMove}
                          onTouchMove={handleTouchMove}
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            touchAction: "none",
                          }}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full font-black text-lg md:text-2xl transition-all select-none flex items-center justify-center z-20 ${currentPath.includes(i) ? "bg-indigo-500 text-white scale-110 shadow-lg" : "bg-slate-800 text-slate-400 hover:bg-slate-700 active:scale-95"}`}
                        >
                          {letter}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SLIM ACTIONS */}
              <div className="flex justify-center items-center gap-3 mt-6">
                <button
                  onClick={shuffleLetters}
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm"
                >
                  🔄
                </button>
                <button
                  onClick={revealHint}
                  className="flex-1 max-w-[140px] h-12 bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 font-bold uppercase tracking-widest rounded-xl text-[10px] md:text-xs hover:bg-indigo-600 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span className="text-sm">💡</span> HINT
                </button>
              </div>
            </div>

            {/* DASHBOARD & HOW TO PLAY */}
            <div className="flex flex-col gap-4 h-full justify-start">
              <div className="bg-indigo-600 p-8 rounded-[2rem] shadow-xl text-white">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">
                  Completion
                </p>
                <h3 className="text-4xl font-black italic">
                  {Math.round(
                    (foundWords.length / LEVEL_DATA.words.length) * 100,
                  )}
                  %
                </h3>
                <div className="mt-4 h-1.5 bg-black/20 rounded-full">
                  <div
                    className="h-full bg-white transition-all duration-700"
                    style={{
                      width: `${(foundWords.length / LEVEL_DATA.words.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <button
                onClick={resetProgress}
                className="w-full py-2 text-[10px] font-bold uppercase text-slate-600 hover:text-red-500 transition-colors"
              >
                Clear Progress
              </button>

              {/* HOW TO PLAY SECTION */}
              <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 p-6 rounded-[2rem] shadow-xl">
                <h3 className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
                  How to Play
                </h3>
                <ul className="space-y-3 text-[11px] md:text-xs text-slate-400 font-medium leading-relaxed">
                  <li className="flex gap-3">
                    <span className="text-indigo-500 font-black">01.</span>
                    <span>
                      <strong className="text-slate-200">
                        Connect letters:
                      </strong>{" "}
                      Drag your finger or mouse across the wheel to link
                      letters.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-indigo-500 font-black">02.</span>
                    <span>
                      <strong className="text-slate-200">Fill the grid:</strong>{" "}
                      Each correct word pops into the slots above.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-indigo-500 font-black">03.</span>
                    <span>
                      <strong className="text-slate-200">Stuck?</strong> Hit 🔄
                      to see the letters from a fresh perspective.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ARTICLE SECTION (Logic Lab White) --- */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <article className="space-y-16">
            <div className="text-center">
              <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                Cognitive Lab
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-950 mt-8 mb-6 leading-tight">
                Lexical Patterns: <br />
                <span className="text-indigo-600 italic font-black">
                  Mastering the Word Link
                </span>
              </h2>
            </div>

            <div className="space-y-12 text-lg text-slate-700 leading-relaxed">
              <div className="bg-slate-50 p-10 md:p-16 rounded-[3rem] border border-slate-100">
                <h3 className="text-3xl font-black text-slate-900 mb-6">
                  The Psychology of Play
                </h3>
                <p>
                  Finding a hidden word triggers a release of dopamine in the
                  brain's reward center. Word Link is designed as a "contained
                  challenge" - a puzzle with a logical solution that provides
                  order in a chaotic world.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900">
                    The Suffix Sweep
                  </h3>
                  <p>
                    Master strategy involves identifying common endings like
                    -ING or -ED first to reveal root words hidden in the
                    scramble.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900">
                    Pattern Recognition
                  </h3>
                  <p>
                    Rotate the wheel to break "functional fixedness," a mental
                    block where you keep seeing the same incorrect patterns.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-12 rounded-[3rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full" />
                <h3 className="text-2xl font-black mb-6">
                  Pro Strategy: Vowel Pivot
                </h3>
                <p className="text-slate-400 italic">
                  "Focus on the vowels first. They are the structural anchors of
                  every word in the grid."
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="bg-white/10 px-4 py-2 rounded-lg font-mono text-xs">
                    Vowel-First
                  </div>
                  <div className="bg-white/10 px-4 py-2 rounded-lg font-mono text-xs">
                    Shuffle Tech
                  </div>
                  <div className="bg-white/10 px-4 py-2 rounded-lg font-mono text-xs">
                    Suffix Hunt
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* SUCCESS MODAL (Updated Theme) */}
      {foundWords.length === LEVEL_DATA.words.length && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-6">
          <div className="text-center bg-white rounded-[3rem] p-10 max-w-sm w-full shadow-2xl">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
              🏆
            </div>
            <h2 className="text-2xl font-black text-slate-950 uppercase italic mb-2">
              Success
            </h2>
            <p className="text-slate-500 font-bold mb-8 tracking-widest uppercase text-xs">
              Protocol Complete
            </p>
            <button
              onClick={resetProgress}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black uppercase shadow-xl hover:scale-105 transition-all"
            >
              Next Level
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-8px);
          }
          75% {
            transform: translateX(8px);
          }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
