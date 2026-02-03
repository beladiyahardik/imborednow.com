"use client";

import React, { useState, useMemo, useEffect } from "react";
import Head from "next/head";

// --- TYPES & CONSTANTS ---
type HexCoord = { q: number; r: number };
type Node = {
  id: string;
  q: number;
  r: number;
  color?: string;
  type: "endpoint" | "empty";
};

const GRID_SIZE = 3;
const COLORS = {
  red: "#f43f5e",
  blue: "#06b6d4",
  green: "#10b981",
};

const ALL_LEVELS = [
  {
    id: "01",
    endpoints: [
      { id: "r1", q: 0, r: -2, color: "red", type: "endpoint" },
      { id: "r2", q: 1, r: 0, color: "red", type: "endpoint" },
      { id: "b1", q: -1, r: -1, color: "blue", type: "endpoint" },
      { id: "b2", q: 2, r: -2, color: "blue", type: "endpoint" },
      { id: "g1", q: -2, r: 2, color: "green", type: "endpoint" },
      { id: "g2", q: 0, r: 1, color: "green", type: "endpoint" },
    ],
  },
  {
    id: "02",
    endpoints: [
      { id: "r1", q: -2, r: 0, color: "red", type: "endpoint" },
      { id: "r2", q: 2, r: 0, color: "red", type: "endpoint" },
      { id: "b1", q: 0, r: -2, color: "blue", type: "endpoint" },
      { id: "b2", q: 0, r: 2, color: "blue", type: "endpoint" },
      { id: "g1", q: -1, r: -1, color: "green", type: "endpoint" },
      { id: "g2", q: 1, r: 1, color: "green", type: "endpoint" },
    ],
  },
];

export default function HexaPathPage() {
  const [currentLevel, setCurrentLevel] = useState(ALL_LEVELS[0]);
  const [paths, setPaths] = useState<Record<string, HexCoord[]>>({});
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [gameClear, setGameClear] = useState(false);

  const hexSize = 35;

  useEffect(() => {
    handleRandomLevel();
  }, []);

  const handleRandomLevel = () => {
    const randomIndex = Math.floor(Math.random() * ALL_LEVELS.length);
    setCurrentLevel(ALL_LEVELS[randomIndex]);
    setPaths({});
    setGameClear(false);
  };

  const grid = useMemo(() => {
    const cells: Node[] = [];
    for (let q = -GRID_SIZE + 1; q < GRID_SIZE; q++) {
      const r1 = Math.max(-GRID_SIZE + 1, -q - GRID_SIZE + 1);
      const r2 = Math.min(GRID_SIZE - 1, -q + GRID_SIZE - 1);
      for (let r = r1; r <= r2; r++) {
        const endpoint = currentLevel.endpoints.find(
          (ep) => ep.q === q && ep.r === r,
        );
        cells.push(
          (endpoint as Node) || { id: `${q},${r}`, q, r, type: "empty" },
        );
      }
    }
    return cells;
  }, [currentLevel]);

  const hexToPixel = (q: number, r: number, size: number) => ({
    x: size * ((3 / 2) * q),
    y: size * ((Math.sqrt(3) / 2) * q + Math.sqrt(3) * r),
  });

  const isNeighbor = (a: HexCoord, b: HexCoord) => {
    const dq = Math.abs(a?.q - b?.q),
      dr = Math.abs(a?.r - b?.r);
    const ds = Math.abs(-a?.q - a?.r - (-b?.q - b?.r));
    return Math.max(dq, dr, ds) === 1;
  };

  const startPath = (node: Node) => {
    if (node.type !== "endpoint") return;
    setIsDragging(true);
    setActiveColor(node.color!);
    setPaths((prev) => ({
      ...prev,
      [node.color!]: [{ q: node.q, r: node.r }],
    }));
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !activeColor) return;
    const point = "touches" in e ? e.touches[0] : (e as React.MouseEvent);
    const element = document.elementFromPoint(point.clientX, point.clientY);
    const qAttr = element?.getAttribute("data-q"),
      rAttr = element?.getAttribute("data-r-attr"); // Fixed potentially broken attr name from original or use data-r
    const rRealAttr = element?.getAttribute("data-r");

    if (qAttr === null || rRealAttr === null) return;
    const q = parseInt(qAttr!),
      r = parseInt(rRealAttr!);
    const currentPath = paths[activeColor] || [];
    const lastPos = currentPath[currentPath.length - 1];

    if (isNeighbor(lastPos, { q, r })) {
      if (!currentPath.some((p) => p.q === q && p.r === r)) {
        const newPaths = { ...paths };
        Object.keys(newPaths).forEach((c) => {
          if (c !== activeColor)
            newPaths[c] = newPaths[c].filter((p) => !(p.q === q && p.r === r));
        });
        newPaths[activeColor] = [...currentPath, { q, r }];
        setPaths(newPaths);
      }
    }
  };

  const stats = useMemo(() => {
    const totalFilled = Object.values(paths).flat().length;
    const connectedCount = Object.keys(paths).filter((color) => {
      const p = paths[color],
        eps = currentLevel.endpoints.filter((e) => e.color === color);
      return (
        p.some((x) => x.q === eps[0].q && x.r === eps[0].r) &&
        p.some((x) => x.q === eps[1].q && x.r === eps[1].r)
      );
    }).length;
    return { totalFilled, connectedCount, isFull: totalFilled === grid.length };
  }, [paths, grid, currentLevel]);

  useEffect(() => {
    if (stats.isFull && stats.connectedCount === 3)
      setTimeout(() => setGameClear(true), 300);
  }, [stats]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-rose-200 overflow-x-hidden select-none">
      <Head>
        <title>HexaPath | Logic Lab</title>
      </Head>

      {/* --- HERO / GAME SECTION --- */}
      <section className="relative flex flex-col items-center justify-center px-6 py-10 bg-slate-950 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-rose-500/5 via-transparent to-transparent">
        <main className="max-w-6xl w-full mx-auto flex flex-col lg:grid lg:grid-cols-[300px_1fr_300px] items-center gap-12">
          {/* LEFT: RULES BRIEF */}
          <div className="hidden lg:block space-y-6">
            <h2 className="text-white font-black italic uppercase tracking-widest text-sm border-l-4 border-rose-500 pl-4">
              Rules of Engagement
            </h2>
            <div className="space-y-4 text-xs font-medium text-slate-400">
              <p>
                <span className="text-rose-500 font-bold">01.</span> Link
                matching color nodes by dragging your finger or mouse.
              </p>
              <p>
                <span className="text-rose-500 font-bold">02.</span> You cannot
                overlap lines. Crossing a line breaks the existing path.
              </p>
              <p>
                <span className="text-rose-500 font-bold">03.</span> Victory
                requires 100% grid coverage. Every cell must be colored.
              </p>
            </div>
          </div>

          {/* CENTER: GAME ENGINE */}
          <div className="flex flex-col items-center">
            <div className="text-center mb-10">
              <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
                Hexa <span className="text-rose-500">Path</span>
              </h1>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-2">
                Level Sequence: {currentLevel.id}
              </p>
            </div>

            <div
              className="relative w-[320px] h-[320px] flex items-center justify-center"
              style={{ touchAction: "none" }}
            >
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="-160 -160 320 320"
              >
                {Object.entries(paths).map(([color, points]) => (
                  <polyline
                    key={color}
                    points={points
                      .map((p) => {
                        const { x, y } = hexToPixel(p.q, p.r, hexSize);
                        return `${x},${y}`;
                      })
                      .join(" ")}
                    fill="none"
                    stroke={COLORS[color as keyof typeof COLORS]}
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-90 transition-all duration-300"
                  />
                ))}
              </svg>

              <div
                className="relative w-full h-full"
                onMouseMove={handleMove}
                onTouchMove={handleMove}
                onMouseUp={() => setIsDragging(false)}
                onTouchEnd={() => setIsDragging(false)}
              >
                {grid.map((cell) => {
                  const { x, y } = hexToPixel(cell.q, cell.r, hexSize);
                  return (
                    <div
                      key={`${cell.q}-${cell.r}`}
                      data-q={cell.q}
                      data-r={cell.r}
                      onMouseDown={() => startPath(cell)}
                      onTouchStart={() => startPath(cell)}
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        clipPath:
                          "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                        width: hexSize * 1.82,
                        height: hexSize * 1.82,
                        backgroundColor:
                          cell.type === "endpoint"
                            ? COLORS[cell.color as keyof typeof COLORS]
                            : "rgba(255,255,255,0.03)",
                      }}
                      className="flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors border border-white/5"
                    >
                      {cell.type === "endpoint" && (
                        <div className="w-2.5 h-2.5 bg-white/30 rounded-full" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setPaths({})}
              className="mt-12 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:text-rose-500 transition-all"
            >
              Reset Logic
            </button>
          </div>

          {/* RIGHT: PROGRESS */}
          <div className="w-full lg:w-auto space-y-4">
            <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem]">
              <p className="text-[10px] font-black uppercase text-slate-500 mb-1">
                Grid Occupancy
              </p>
              <h3 className="text-4xl font-black italic text-white">
                {Math.round((stats.totalFilled / grid.length) * 100)}%
              </h3>
              <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 transition-all duration-500"
                  style={{
                    width: `${(stats.totalFilled / grid.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] flex justify-between items-center lg:block">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-500 mb-1">
                  Active Links
                </p>
                <h3 className="text-2xl font-black italic text-white">
                  {stats.connectedCount} / 3
                </h3>
              </div>
              {stats.connectedCount === 3 && !stats.isFull && (
                <div className="mt-2 text-[10px] font-black text-amber-500 animate-pulse">
                  FIX: EMPTY CELLS REMAIN
                </div>
              )}
            </div>
          </div>
        </main>
      </section>

      {/* --- HOW TO PLAY SECTION (NEWLY ADDED) --- */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#11131E] rounded-[3.5rem] p-10 md:p-16 border border-white/5 shadow-2xl mb-20">
            <h3 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
              <span className="text-4xl">🎮</span>
              <span>How to Play</span>
            </h3>
            <ul className="space-y-8">
              {[
                "Identify the colored endpoints positioned on the hexagonal grid.",
                "Drag from an endpoint to create a path to its matching color pair.",
                "Paths cannot intersect or overlap; crossing one will erase the other.",
                "Ensure that every single hexagonal cell is filled with a color path.",
                "To win, all colors must be connected and the grid must be 100% occupied.",
                "Use the 'Reset Logic' button if you reach an unsolvable configuration.",
              ].map((text, idx) => (
                <li key={idx} className="flex items-center gap-6 text-left">
                  <span className="flex-shrink-0 w-8 h-8 bg-rose-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <p className="text-slate-300 font-medium text-lg leading-relaxed m-0">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* --- ARTICLE SECTION --- */}
          <article className="space-y-16">
            <div className="text-center">
              <span className="bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                Cognitive Lab
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-950 mt-8 mb-6 leading-tight">
                Axial Logic: <br />
                <span className="text-rose-600 italic font-black">
                  Six Sides of Focus
                </span>
              </h2>
            </div>

            <div className="space-y-12 text-lg text-slate-700 leading-relaxed">
              <div className="bg-slate-50 p-10 md:p-16 rounded-[3rem] border border-slate-100">
                <h3 className="text-3xl font-black text-slate-900 mb-6 text-left">
                  Efficiency in Geometry
                </h3>
                <p className="text-left">
                  Hexagons are nature's most efficient shape. In a hexagonal
                  grid, every neighbor is equidistant. This symmetry creates a
                  pure logic puzzle that activates the parietal lobe,
                  responsible for spatial navigation.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900">
                    Mental Rotation
                  </h3>
                  <p>
                    Regularly solving axial puzzles enhances mental rotation
                    skills - the ability to manipulate 2D and 3D objects in your
                    mind's eye.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900">
                    Flow State
                  </h3>
                  <p>
                    The lack of timers fosters a state of Deep Work, moving the
                    brain from high-frequency Beta waves to relaxed Alpha waves.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-12 rounded-[3rem] relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-3xl rounded-full" />
                <h3 className="text-2xl font-black mb-6">
                  Pro Strategy: Perimeter First
                </h3>
                <p className="text-slate-400 italic">
                  "Snake your paths along the outside edges first to leave the
                  center open for complex cross-grid connections."
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* SUCCESS MODAL */}
      {gameClear && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-6 transition-all duration-700">
          <div className="bg-white rounded-[4rem] p-12 text-center max-w-sm w-full shadow-2xl">
            <h2 className="text-5xl font-black text-rose-500 uppercase italic mb-2">
              Success
            </h2>
            <p className="text-slate-500 font-bold mb-10 tracking-widest uppercase text-xs">
              Logic Sequence Complete
            </p>
            <button
              onClick={handleRandomLevel}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-rose-500 transition-all shadow-xl"
            >
              Next Protocol
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
