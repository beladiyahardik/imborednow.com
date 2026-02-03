"use client";

import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";

const GRID_SIZE = 7;

export default function QuantumMazePage() {
  const [playerPos, setPlayerPos] = useState({ r: 0, c: 0 });
  const [exitPos] = useState({ r: GRID_SIZE - 1, c: GRID_SIZE - 1 });
  const [walls, setWalls] = useState<boolean[][]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isSolved, setIsSolved] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  // Generate a random solvable maze with a Safe Zone for the player
  const generateMaze = useCallback(() => {
    const newWalls = Array(GRID_SIZE)
      .fill(0)
      .map(() => Array(GRID_SIZE).fill(false));

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        // SAFE ZONE: Prevent walls at start, exit, and the immediate surrounding tiles
        const isStart = r === 0 && c === 0;
        const isExit = r === exitPos.r && c === exitPos.c;
        const isBuffer =
          (r === 0 && c === 1) || (r === 1 && c === 0) || (r === 1 && c === 1);

        if (isStart || isExit || isBuffer) {
          newWalls[r][c] = false;
        } else {
          newWalls[r][c] = Math.random() < 0.28;
        }
      }
    }
    setWalls(newWalls);
    setPlayerPos({ r: 0, c: 0 });
    setIsVisible(true);
    setIsSolved(false);
    setIsFailed(false);

    // Quantum Collapse: Maze vanishes after 4 seconds (extended for mobile comfort)
    setTimeout(() => setIsVisible(false), 4000);
  }, [exitPos.r, exitPos.c]);

  useEffect(() => {
    generateMaze();
  }, [generateMaze]);

  const movePlayer = useCallback(
    (dr: number, dc: number) => {
      if (isSolved || isFailed) return;

      setPlayerPos((prev) => {
        const newR = prev.r + dr;
        const newC = prev.c + dc;

        // Check bounds
        if (newR >= 0 && newR < GRID_SIZE && newC >= 0 && newC < GRID_SIZE) {
          // Check for wall collision
          if (walls[newR][newC]) {
            setIsFailed(true);
            setIsVisible(true); // Reveal walls on failure
            return prev;
          }

          // Check for exit
          if (newR === exitPos.r && newC === exitPos.c) {
            setIsSolved(true);
            setIsVisible(true);
          }
          return { r: newR, c: newC };
        }
        return prev;
      });
    },
    [walls, isSolved, isFailed, exitPos],
  );

  // Desktop Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") movePlayer(-1, 0);
      if (e.key === "ArrowDown") movePlayer(1, 0);
      if (e.key === "ArrowLeft") movePlayer(0, -1);
      if (e.key === "ArrowRight") movePlayer(0, 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [movePlayer]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-purple-200 overflow-x-hidden select-none">
      <Head>
        <title>Quantum Maze | Logic Lab</title>
      </Head>

      {/* --- HERO / GAME ENGINE --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-slate-950 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent">
        <main className="max-w-6xl w-full mx-auto flex flex-col lg:grid lg:grid-cols-[300px_1fr_300px] items-center gap-12">
          {/* LEFT: DESKTOP PROTOCOLS */}
          <div className="hidden lg:block space-y-6">
            <h2 className="text-white font-black italic uppercase tracking-widest text-sm border-l-4 border-purple-500 pl-4 text-left">
              Observation Rules
            </h2>
            <div className="space-y-4 text-xs font-medium text-slate-400 text-left">
              <p>
                <span className="text-purple-500 font-bold">01.</span> Study the
                layout. The maze vanishes after 4s.
              </p>
              <p>
                <span className="text-purple-500 font-bold">02.</span> Navigate
                the void using your internal map.
              </p>
              <p>
                <span className="text-purple-500 font-bold">03.</span> Collision
                causes immediate decoherence.
              </p>
            </div>
          </div>

          {/* CENTER: THE GRID & MOBILE CONTROLS */}
          <div className="flex flex-col items-center w-full">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                Quantum <span className="text-purple-500">Maze</span>
              </h1>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-2 italic">
                Wavefunction: {isVisible ? "OBSERVED" : "COLLAPSED"}
              </p>
            </div>

            <div className="bg-slate-900/60 p-4 md:p-6 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="grid grid-cols-7 gap-1.5 md:gap-2">
                {walls.map((row, rIdx) =>
                  row.map((isWall, cIdx) => {
                    const isPlayer =
                      playerPos.r === rIdx && playerPos.c === cIdx;
                    const isExit = exitPos.r === rIdx && exitPos.c === cIdx;

                    return (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg transition-all duration-500 flex items-center justify-center ${
                          isPlayer
                            ? "bg-purple-500 shadow-[0_0_15px_#a855f7] z-10 scale-105"
                            : isExit
                              ? "bg-emerald-500/20 border border-emerald-500 text-[8px] font-bold text-emerald-400"
                              : isVisible && isWall
                                ? "bg-slate-700 shadow-inner"
                                : "bg-white/5"
                        } ${isFailed && isWall ? "bg-red-500/40 border border-red-500" : ""}`}
                      >
                        {isExit && "EXIT"}
                      </div>
                    );
                  }),
                )}
              </div>
            </div>

            {/* MOBILE D-PAD */}
            <div className="grid grid-cols-3 gap-2 mt-8 md:hidden">
              <div />
              <ControlButton onClick={() => movePlayer(-1, 0)} label="▲" />
              <div />
              <ControlButton onClick={() => movePlayer(0, -1)} label="◀" />
              <ControlButton onClick={() => movePlayer(1, 0)} label="▼" />
              <ControlButton onClick={() => movePlayer(0, 1)} label="▶" />
            </div>

            <button
              onClick={generateMaze}
              className="mt-8 px-8 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-purple-500 transition-all"
            >
              Reset Wavefunction
            </button>
          </div>

          {/* RIGHT: DESKTOP STABILITY DATA */}
          <div className="hidden lg:block w-full space-y-4 text-left">
            <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem]">
              <p className="text-[10px] font-black uppercase text-slate-500 mb-1">
                System Stability
              </p>
              <h3 className="text-4xl font-black italic text-white">
                {isFailed ? "0" : "100"}%
              </h3>
            </div>
          </div>
        </main>
      </section>

      {/* --- HOW TO PLAY SECTION (PURPLE THEME) --- */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#11131E] rounded-[3.5rem] p-10 md:p-16 border border-white/5 shadow-2xl mb-20">
            <h3 className="text-3xl font-black text-white mb-12 flex items-center gap-4">
              <span className="text-4xl">🎮</span>
              <span>How to Play</span>
            </h3>
            <ul className="space-y-10">
              {[
                {
                  title: "The Observation Phase",
                  desc: "When you reset the system, you have 4 seconds to study the maze. Memorize the path from your starting point to the green exit.",
                },
                {
                  title: "Navigating the Void",
                  desc: "Once the maze vanishes, use your Arrow Keys or the On-Screen D-Pad to move. Every step must be guided by your mental map.",
                },
                {
                  title: "Avoid Decoherence",
                  desc: "If you touch an invisible wall, the system collapses. The walls will reappear in red, and you'll need to reboot to try again.",
                },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-6">
                  {/* Numbered Circle - Updated to Purple Theme */}
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white text-sm font-bold rounded-full flex items-center justify-center mt-1 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                    {idx + 1}
                  </span>
                  <div className="text-left">
                    <h4 className="text-white font-bold text-xl mb-2 tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 font-medium text-lg leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* --- ARTICLE SECTION --- */}
          <article className="prose prose-slate lg:prose-xl max-w-none text-slate-700 leading-relaxed space-y-12">
            <div className="text-center mb-20">
              <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                Cognitive Physics
              </span>
              <h2 className="text-4xl md:text-7xl font-black tracking-tight text-slate-950 mt-8 mb-8 leading-tight">
                The Invisible Map: <br />
                <span className="text-purple-600 italic">
                  Navigating the Unseen
                </span>
              </h2>
              <p className="text-xl text-slate-500 font-medium italic">
                &quot;We don&apos;t see things as they are, we see them as we
                remember them.&quot;
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                1. The Paradox of the Open Eyes
              </h3>
              <p>
                Have you ever walked through your own house in the middle of the
                night, in total darkness, and found the kitchen without stubbing
                your toe? You weren&apos;t using your eyes; you were using a
                &quot;mental map&quot;—a ghost image of your reality stored deep
                in your subconscious.
              </p>

              <p>
                Quantum Maze is a tribute to this incredible human ability. In
                the first few seconds of the game, your brain is working
                overtime. You aren&apos;t just looking at blocks on a screen;
                you are absorbing a layout and identifying &quot;danger
                zones.&quot; When the maze vanishes, the challenge moves from
                your eyes to your memory.
              </p>
            </div>

            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 my-12 text-left">
              <h3 className="text-2xl font-black text-slate-900 mb-4">
                What is Decoherence?
              </h3>
              <p>
                In the game, hitting a wall causes &quot;Decoherence.&quot; In
                the real quantum world, this is what happens when a fragile
                quantum state is disturbed by the outside environment, causing
                it to collapse into a single, boring reality.
              </p>
              [Image of Young's double-slit experiment wave interference
              pattern]
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                2. Schrödinger&apos;s Strategy
              </h3>
              <p>
                There&apos;s a famous thought experiment involving a cat in a
                box that is both alive and dead until you open it. Navigating
                this maze feels remarkably similar. Until you move into a
                square, that square is both &quot;safe&quot; and
                &quot;blocked&quot; in your mind.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 my-16 text-left">
              <div className="p-8 bg-purple-50 rounded-[2rem] border border-purple-100">
                <h4 className="font-black text-purple-900 mb-2 uppercase tracking-tight">
                  The Window
                </h4>
                <p className="text-sm leading-relaxed">
                  Sensory memory lasts for a very short duration. You are racing
                  against the natural decay of information in your synapses.
                </p>
              </div>
              <div className="p-8 bg-slate-900 rounded-[2rem] text-white">
                <h4 className="font-black mb-2 uppercase tracking-tight">
                  Chunking
                </h4>
                <p className="text-sm leading-relaxed opacity-80">
                  Most players don&apos;t remember the whole grid. They remember
                  &quot;shapes&quot;—a zig-zag here, a long straight line there.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* MODALS */}
      {(isSolved || isFailed) && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-[4rem] p-12 text-center max-w-sm w-full shadow-2xl animate-in zoom-in duration-300">
            <h2
              className={`text-5xl font-black uppercase italic mb-2 ${isSolved ? "text-emerald-500" : "text-red-500"}`}
            >
              {isSolved ? "Stable" : "Collapsed"}
            </h2>
            <p className="text-slate-500 font-bold mb-10 tracking-widest uppercase text-xs">
              {isSolved ? "Quantum Path Validated" : "Decoherence Detected"}
            </p>
            <button
              onClick={generateMaze}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-purple-500 transition-all shadow-xl"
            >
              Retry Protocol
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- HELPER COMPONENTS ---
function ControlButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onPointerDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="w-14 h-14 bg-white/10 border border-white/10 rounded-xl flex items-center justify-center text-white text-xl active:bg-purple-500 active:scale-90 transition-all shadow-lg"
    >
      {label}
    </button>
  );
}
