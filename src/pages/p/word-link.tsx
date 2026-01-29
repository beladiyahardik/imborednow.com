"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
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

  if (!isLoaded) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <div className="bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Head>
        <title>Word Link Game: Play Word Connect Unblocked</title>
      </Head>

      <section className="relative  flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-600/10 via-transparent to-transparent pointer-events-none" />

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
              <div className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px]">
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
                        typeof window !== "undefined" && window.innerWidth < 768
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
                        style={{ left: `${x}%`, top: `${y}%` }}
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

          {/* DASHBOARD */}
          <div className="hidden lg:flex flex-col gap-4">
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
          </div>
        </div>

        <div className="absolute bottom-4 flex flex-col items-center animate-bounce opacity-20">
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Game Info
          </span>
          <span className="text-lg">↓</span>
        </div>
      </section>

      {/* ARTICLE */}
      <section className="bg-[#020617] relative z-20 border-t border-white/5 pt-12 pb-24 px-6">
        <article className="max-w-3xl mx-auto prose prose-invert prose-indigo">
          <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-10">
            Mastering the Word Link Experience: The Ultimate Guide to Mental
            Agility
          </h2>

          <div className="space-y-8 text-slate-400 leading-relaxed font-medium">
            <p className="text-xl text-slate-300 italic">
              "A different language is a different vision of life." – Federico
              Fellini.
            </p>

            <p>
              Word Link is the ultimate bridge between relaxation and mental
              stimulation. By design, our interface removes distractions,
              letting you focus entirely on the letters. Whether you're bored at
              home or looking for an unblocked game for school, this puzzle
              auto-saves every move, ensuring your cognitive journey is never
              interrupted.
            </p>

            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
              The Psychology of the Word-Search Thrill
            </h3>
            <p>
              Have you ever wondered why finding a simple five-letter word in a
              circle of scrambled characters feels so satisfying? It’s not just
              in your head—it’s neurobiology. When your brain identifies a
              pattern (like a hidden word), it releases a burst of dopamine.
              This neurotransmitter is the heart of the "reward system,"
              encouraging us to repeat behaviors that provide a sense of
              accomplishment.
            </p>
            <p>
              In a world full of high-stress tasks, Word Link provides a
              "contained challenge." It’s a puzzle with a definite solution,
              offering a sense of order in a chaotic digital landscape. This
              makes it one of the best games to play when bored, as it resets
              your stress levels while keeping your neurons firing.
            </p>

            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
              The Evolution of Lexical Puzzles
            </h3>
            <p>
              From the ancient Sator Square to the first "Word-Cross" published
              in the New York World in 1913, humans have always been obsessed
              with manipulating letters. Word Link is the 2026 evolution of this
              obsession. We have stripped away the cryptic, often frustrating
              clues of traditional crosswords and replaced them with a tactile,
              intuitive "Link" mechanic.
            </p>
            <p>
              This modern approach aligns with how we interact with technology
              today—fast, fluid, and responsive. However, the core challenge
              remains the same: how well do you know your own language?
            </p>

            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
              Strategies for the Word Link Master
            </h3>
            <p>
              Becoming a master isn't just about having a large vocabulary; it's
              about spatial recognition. Here are three pro-tips to clear the
              grid faster:
            </p>
            <ul className="list-disc pl-5 space-y-4">
              <li>
                <strong className="text-indigo-400">The "Suffix Sweep":</strong>{" "}
                Look for common endings like -ING, -ED, or -S. Connecting these
                first can often reveal the root words you’ve been missing.
              </li>
              <li>
                <strong className="text-indigo-400">The Vowel Pivot:</strong>{" "}
                Place a vowel (like A or E) at the center of your mental map and
                try rotating the surrounding consonants around it.
              </li>
              <li>
                <strong className="text-indigo-400">
                  The Shuffle Advantage:
                </strong>{" "}
                Don't be afraid to hit the shuffle button. Changing the physical
                orientation of the letters on the wheel can break "functional
                fixedness," a mental block where you keep seeing the same
                incorrect patterns.
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
              Why Unblocked Games Matter in 2026
            </h3>
            <p>
              We understand that sometimes you just need a five-minute break
              during a long study session or a tedious shift. That’s why we’ve
              optimized Word Link to be lightweight and accessible. It’s an
              "unblocked game" in the truest sense—designed to run smoothly on
              any browser without the need for heavy downloads or invasive
              permissions.
            </p>
            <p>
              It provides a safe, intellectual sanctuary. Instead of
              doom-scrolling through social media, you’re actively improving
              your "lexical retrieval speed." This is the speed at which your
              brain can fetch a word from your long-term memory—a skill that
              pays dividends in real-world conversations and professional
              writing.
            </p>

            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
              Building a Daily Habit
            </h3>
            <p>
              Neuroplasticity—the brain's ability to reorganize itself—is most
              effective with consistent, short bursts of activity. Playing just
              one level of Word Link a day can help maintain cognitive
              flexibility as you age. It’s like a gym for your prefrontal
              cortex, but with a lot more Indigo-themed neon and a lot less
              sweat.
            </p>

            <p>
              So, the next time the boredom starts to creep in, remember that
              you’re not just killing time. You’re sharpening your mind, one
              link at a time. Welcome to the Lab.
            </p>
          </div>
        </article>
      </section>

      {/* SUCCESS MODAL */}
      {foundWords.length === LEVEL_DATA.words.length && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-6">
          <div className="text-center bg-white rounded-[3rem] p-10 max-w-sm w-full shadow-2xl">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
              🏆
            </div>
            <h2 className="text-2xl font-black text-slate-950 uppercase italic mb-6">
              Level Clear!
            </h2>
            <button
              onClick={resetProgress}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black uppercase shadow-xl hover:scale-105 transition-all"
            >
              Next Puzzle
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
