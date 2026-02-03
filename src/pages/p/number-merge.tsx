"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";

// --- CONSTANTS ---
const WINNING_SCORE = 2048;

export default function NumberMergePage() {
  const [grid, setGrid] = useState<(number | null)[]>(Array(16).fill(null));
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);

  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const spawnTile = useCallback((currentGrid: (number | null)[]) => {
    const emptyCells = currentGrid
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null) as number[];
    if (emptyCells.length === 0) return currentGrid;
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newGrid = [...currentGrid];
    newGrid[randomCell] = Math.random() > 0.1 ? 2 : 4;
    return newGrid;
  }, []);

  const initGame = useCallback(() => {
    let newGrid = Array(16).fill(null);
    newGrid = spawnTile(newGrid);
    newGrid = spawnTile(newGrid);
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
    setGameWin(false);
  }, [spawnTile]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const slide = (line: (number | null)[]) => {
    let filtered = line.filter((x) => x !== null) as number[];
    let newLine: (number | null)[] = [];
    let addedScore = 0;
    for (let i = 0; i < filtered.length; i++) {
      if (filtered[i] === filtered[i + 1]) {
        const newValue = filtered[i] * 2;
        newLine.push(newValue);
        addedScore += newValue;
        i++;
      } else {
        newLine.push(filtered[i]);
      }
    }
    while (newLine.length < 4) newLine.push(null);
    return { newLine, addedScore };
  };

  const move = useCallback(
    (direction: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
      if (gameOver || gameWin) return;
      let newGrid = [...grid];
      let totalAddedScore = 0;
      let changed = false;
      for (let i = 0; i < 4; i++) {
        let line: (number | null)[] = [];
        for (let j = 0; j < 4; j++) {
          if (direction === "LEFT" || direction === "RIGHT")
            line.push(grid[i * 4 + j]);
          else line.push(grid[j * 4 + i]);
        }
        if (direction === "RIGHT" || direction === "DOWN") line.reverse();
        const { newLine, addedScore } = slide(line);
        if (direction === "RIGHT" || direction === "DOWN") newLine.reverse();
        totalAddedScore += addedScore;
        for (let j = 0; j < 4; j++) {
          const index =
            direction === "LEFT" || direction === "RIGHT"
              ? i * 4 + j
              : j * 4 + i;
          if (newGrid[index] !== newLine[j]) changed = true;
          newGrid[index] = newLine[j];
        }
      }
      if (changed) {
        const gridWithSpawn = spawnTile(newGrid);
        setGrid(gridWithSpawn);
        setScore((s) => s + totalAddedScore);
        if (totalAddedScore + score > bestScore)
          setBestScore(totalAddedScore + score);
        if (gridWithSpawn.includes(WINNING_SCORE)) setGameWin(true);
        if (!gridWithSpawn.includes(null)) setGameOver(true);
      }
    },
    [grid, gameOver, gameWin, spawnTile, score, bestScore],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") move("UP");
      if (e.key === "ArrowDown") move("DOWN");
      if (e.key === "ArrowLeft") move("LEFT");
      if (e.key === "ArrowRight") move("RIGHT");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) > 30) {
      if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? "RIGHT" : "LEFT");
      else move(dy > 0 ? "DOWN" : "UP");
    }
    touchStart.current = null;
  };

  const getTileColor = (val: number | null) => {
    if (!val) return "bg-white/5";
    const colors: Record<number, string> = {
      2: "bg-slate-200 text-slate-900",
      4: "bg-slate-400 text-slate-900",
      8: "bg-orange-300 text-slate-900",
      16: "bg-orange-500 text-white",
      32: "bg-rose-400 text-white",
      64: "bg-rose-600 text-white",
      128: "bg-yellow-500 text-white",
      256: "bg-yellow-400 text-white",
      512: "bg-emerald-400 text-white",
      1024: "bg-blue-500 text-white",
      2048: "bg-purple-600 text-white animate-pulse",
    };
    return colors[val] || "bg-black text-white";
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-rose-200 overflow-x-hidden select-none">
      <Head>
        <title>NumMerge | Logic Lab</title>
      </Head>

      {/* --- HERO / GAME SECTION --- */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-slate-950 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-center">
          <div className="max-w-md mx-auto w-full">
            <div className="flex justify-between items-end mb-8 px-2">
              <div className="text-left">
                <h1 className="text-3xl font-black italic uppercase text-white tracking-tighter leading-none">
                  Num<span className="text-rose-500">Merge</span>
                </h1>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-2 text-left">
                  Protocol: Exponential
                </p>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-500 uppercase">
                    Score
                  </p>
                  <p className="text-2xl font-black text-white leading-none">
                    {score}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-500 uppercase">
                    Best
                  </p>
                  <p className="text-2xl font-black text-rose-500 leading-none">
                    {bestScore}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-2 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]">
              <div
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                className="bg-slate-900/50 p-3 rounded-[2.5rem] border border-white/5 aspect-square grid grid-cols-4 gap-2 relative touch-none shadow-2xl shadow-rose-500/10"
              >
                {grid.map((val, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center text-xl md:text-2xl font-black rounded-xl transition-all duration-150 ${getTileColor(val)}`}
                  >
                    {val}
                  </div>
                ))}
                {(gameOver || gameWin) && (
                  <div className="absolute inset-0 z-20 bg-slate-950/90 backdrop-blur-md rounded-[2.5rem] flex flex-col items-center justify-center p-6 text-center">
                    <h2 className="text-3xl font-black text-white uppercase italic">
                      {gameWin ? "Success!" : "Locked"}
                    </h2>
                    <button
                      onClick={initGame}
                      className="mt-4 bg-rose-500 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest hover:bg-rose-600 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="hidden lg:block bg-[#11131E] rounded-[3.5rem] p-8 border border-white/5 shadow-2xl h-fit">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-rose-500 mb-8 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-rose-500"></span>
              Operation Manual
            </h3>
            <ul className="space-y-6 text-left">
              {[
                { t: "Desktop", d: "Use Arrow Keys for rapid shifts." },
                { t: "Mobile", d: "Swipe in any direction to move." },
                { t: "Fuse", d: "Match numbers to double power." },
                { t: "Logic", d: "Keep the highest value in a corner." },
              ].map((item, idx) => (
                <li key={idx} className="group">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 group-hover:text-rose-400 transition-colors">
                    Mode 0{idx + 1}
                  </p>
                  <p className="text-slate-200 font-bold text-sm leading-snug">
                    <span className="text-white">{item.t}:</span> {item.d}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- HOW TO PLAY SECTION (FIXED ALIGNMENT) --- */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#11131E] rounded-[3.5rem] p-10 md:p-16 border border-white/5 shadow-2xl mb-20">
            <h3 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
              <span className="text-4xl">🎮</span>
              <span>How to Play</span>
            </h3>
            <ul className="space-y-8">
              {[
                "Desktop: Use Arrow Keys (↑, ↓, ←, →) to move all tiles simultaneously.",
                "Mobile: Swipe your finger in the direction you want the tiles to slide.",
                "Colliding tiles with identical values will fuse into a single doubled tile.",
                "Goal: Chain your merges strategically until you produce the 2048 tile.",
                "Strategic Tip: Don't move UP if your highest tile is at the bottom. Keep it anchored!",
                "The protocol ends if the grid fills completely and no more merges are possible.",
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-6 text-left">
                  {/* The number circle stays at the top */}
                  <span className="flex-shrink-0 w-8 h-8 bg-rose-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                    {idx + 1}
                  </span>
                  {/* pt-0.5 aligns the text perfectly with the circle center */}
                  <p className="text-slate-300 font-medium text-lg leading-relaxed pt-0.5">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <article className="space-y-16">
            <div className="text-center">
              <span className="bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                Cognitive Lab
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-950 mt-8 mb-6 leading-tight">
                The Zen of the Double: <br />
                <span className="text-rose-600 italic font-black">
                  Exponential Growth
                </span>
              </h2>
            </div>

            <div className="space-y-12 text-lg text-slate-700 leading-relaxed text-left">
              <div className="bg-slate-50 p-10 md:p-16 rounded-[3rem] border border-slate-100">
                <h3 className="text-3xl font-black text-slate-900 mb-6">
                  The Architecture of Simplicity
                </h3>
                <p>
                  NumMerge is a study in exponential scaling. By merging small
                  units, we build complex structures. This mirrors how computers
                  handle memory and how biological systems grow through cell
                  division.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900">
                    The Snake Strategy
                  </h3>
                  <p>
                    Experienced researchers use a &quot;Snake&quot; pattern,
                    arranging tiles in a descending order of value. This ensures
                    that a single move can trigger a cascade of merges.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900">
                    Entropy Management
                  </h3>
                  <p>
                    In the lab, chaos is the enemy. In NumMerge, every move that
                    doesn&apos;t result in a merge increases entropy (filling a
                    slot). The key is to maximize merges per movement.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-12 rounded-[3rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-3xl rounded-full" />
                <h3 className="text-2xl font-black mb-6">
                  Lab Protocol: Anchor Point
                </h3>
                <p className="text-slate-400 italic">
                  &quot;A cornered king is a safe king. Pick one corner and
                  never let your largest tile leave it.&quot;
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
