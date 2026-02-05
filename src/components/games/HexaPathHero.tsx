import React, { useState, useMemo, useEffect } from "react";

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

export default function HexaPathHero() {
  const [currentLevel, setCurrentLevel] = useState(ALL_LEVELS[0]);
  const [paths, setPaths] = useState<Record<string, HexCoord[]>>({});
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [gameClear, setGameClear] = useState(false);

  const hexSize = 35;

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

    const qAttr = element?.getAttribute("data-q");
    const rAttr = element?.getAttribute("data-r");

    if (qAttr === null || rAttr === null) return;
    const q = parseInt(qAttr!),
      r = parseInt(rAttr!);
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
    <section className="relative flex flex-col items-center justify-center px-6 py-10 bg-slate-950 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-rose-500/5 via-transparent to-transparent min-h-[85vh]">
      <main className="max-w-6xl w-full mx-auto flex flex-col lg:grid lg:grid-cols-[300px_1fr_300px] items-center gap-12">
        {/* LEFT: RULES BRIEF */}
        <div className="hidden lg:block space-y-6 text-left">
          <h2 className="text-white font-black italic uppercase tracking-widest text-sm border-l-4 border-rose-500 pl-4 text-left">
            Rules of Engagement
          </h2>
          <div className="space-y-4 text-xs font-medium text-slate-400 text-left">
            <p>
              <span className="text-rose-500 font-bold">01.</span> Link matching
              color nodes by dragging.
            </p>
            <p>
              <span className="text-rose-500 font-bold">02.</span> No
              overlapping lines. Crossing breaks the path.
            </p>
            <p>
              <span className="text-rose-500 font-bold">03.</span> Victory
              requires 100% grid coverage.
            </p>
          </div>
        </div>

        {/* CENTER: GAME ENGINE */}
        <div className="flex flex-col items-center">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
              Hexa <span className="text-rose-500">Path</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-2 text-center">
              Protocol: {currentLevel.id}
            </p>
          </div>

          <div
            className="relative w-[320px] h-[320px] flex items-center justify-center select-none"
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
            className="mt-12 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-all"
          >
            Reset Logic
          </button>
        </div>

        {/* RIGHT: PROGRESS */}
        <div className="w-full lg:w-auto space-y-4">
          <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] text-left">
            <p className="text-[10px] font-black uppercase text-slate-500 mb-1 text-left">
              Grid Occupancy
            </p>
            <h3 className="text-4xl font-black italic text-white text-left">
              {Math.round((stats.totalFilled / grid.length) * 100)}%
            </h3>
            <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-500 transition-all duration-500"
                style={{ width: `${(stats.totalFilled / grid.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] flex justify-between items-center lg:block text-left">
            <div>
              <p className="text-[10px] font-black uppercase text-slate-500 mb-1 text-left">
                Active Links
              </p>
              <h3 className="text-2xl font-black italic text-white text-left">
                {stats.connectedCount} / 3
              </h3>
            </div>
            {stats.connectedCount === 3 && !stats.isFull && (
              <div className="mt-2 text-[10px] font-black text-amber-500 animate-pulse uppercase">
                Fix: Empty Cells Remain
              </div>
            )}
          </div>
        </div>
      </main>

      {gameClear && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-[4rem] p-12 text-center max-w-sm w-full shadow-2xl">
            <h2 className="text-5xl font-black text-rose-500 uppercase italic mb-2 text-center">
              Success
            </h2>
            <p className="text-slate-500 font-bold mb-10 tracking-widest uppercase text-xs text-center">
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
    </section>
  );
}
