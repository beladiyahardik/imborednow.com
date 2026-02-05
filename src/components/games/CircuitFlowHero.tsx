import React, { useState, useEffect, useCallback } from "react";

// --- TYPES & LOGIC HELPERS ---
type TileType = "I" | "L" | "T" | "SOURCE" | "SINK";
type Rotation = 0 | 90 | 180 | 270;

interface Tile {
  type: TileType;
  rotation: Rotation;
  fixed?: boolean;
}

const getConnections = (type: TileType, rotation: Rotation): number[] => {
  const rotShift = rotation / 90;
  let base: number[] = [];
  if (type === "I") base = [0, 2];
  else if (type === "L") base = [0, 1];
  else if (type === "T") base = [1, 2, 3];
  else if (type === "SOURCE") base = [1];
  else if (type === "SINK") base = [0, 1, 2, 3];
  return base.map((side) => (side + rotShift) % 4);
};

const GRID_SIZE = 5;

const INITIAL_GRID: Tile[][] = [
  [
    { type: "SOURCE", rotation: 0, fixed: true },
    { type: "I", rotation: 0 },
    { type: "L", rotation: 90 },
    { type: "I", rotation: 90 },
    { type: "L", rotation: 0 },
  ],
  [
    { type: "L", rotation: 180 },
    { type: "T", rotation: 90 },
    { type: "I", rotation: 0 },
    { type: "L", rotation: 270 },
    { type: "I", rotation: 0 },
  ],
  [
    { type: "I", rotation: 90 },
    { type: "L", rotation: 0 },
    { type: "T", rotation: 0 },
    { type: "L", rotation: 90 },
    { type: "I", rotation: 90 },
  ],
  [
    { type: "L", rotation: 270 },
    { type: "I", rotation: 0 },
    { type: "L", rotation: 180 },
    { type: "I", rotation: 90 },
    { type: "L", rotation: 270 },
  ],
  [
    { type: "I", rotation: 0 },
    { type: "I", rotation: 90 },
    { type: "I", rotation: 0 },
    { type: "I", rotation: 90 },
    { type: "SINK", rotation: 0, fixed: true },
  ],
];

export default function CircuitFlowHero() {
  const [grid, setGrid] = useState<Tile[][]>(INITIAL_GRID);
  const [poweredTiles, setPoweredTiles] = useState<boolean[][]>(
    Array(GRID_SIZE)
      .fill(0)
      .map(() => Array(GRID_SIZE).fill(false)),
  );
  const [isSolved, setIsSolved] = useState(false);
  const [moves, setMoves] = useState(0);

  const updateCircuitry = useCallback((currentGrid: Tile[][]) => {
    const powered = Array(GRID_SIZE)
      .fill(0)
      .map(() => Array(GRID_SIZE).fill(false));
    const queue: [number, number][] = [[0, 0]];
    powered[0][0] = true;

    let head = 0;
    while (head < queue.length) {
      const [r, c] = queue[head++];
      const currentCons = getConnections(
        currentGrid[r][c].type,
        currentGrid[r][c].rotation,
      );
      const neighbors: [number, number, number, number][] = [
        [r - 1, c, 0, 2],
        [r, c + 1, 1, 3],
        [r + 1, c, 2, 0],
        [r, c - 1, 3, 1],
      ];

      for (const [nr, nc, mySide, theirSide] of neighbors) {
        if (
          nr >= 0 &&
          nr < GRID_SIZE &&
          nc >= 0 &&
          nc < GRID_SIZE &&
          !powered[nr][nc]
        ) {
          if (currentCons.includes(mySide)) {
            const neighborCons = getConnections(
              currentGrid[nr][nc].type,
              currentGrid[nr][nc].rotation,
            );
            if (neighborCons.includes(theirSide)) {
              powered[nr][nc] = true;
              queue.push([nr, nc]);
            }
          }
        }
      }
    }
    setPoweredTiles(powered);
    if (powered[GRID_SIZE - 1][GRID_SIZE - 1]) setIsSolved(true);
  }, []);

  useEffect(() => {
    updateCircuitry(grid);
  }, [grid, updateCircuitry]);

  const rotateTile = (r: number, c: number) => {
    if (grid[r][c].fixed || isSolved) return;
    const newGrid = grid.map((row, ri) =>
      row.map((tile, ci) =>
        ri === r && ci === c
          ? { ...tile, rotation: ((tile.rotation + 90) % 360) as Rotation }
          : tile,
      ),
    );
    setGrid(newGrid);
    setMoves((m) => m + 1);
  };

  const handleNextLevel = () => {
    const newGrid = grid.map((row) =>
      row.map((tile) => ({
        ...tile,
        rotation: tile.fixed
          ? tile.rotation
          : ([0, 90, 180, 270][Math.floor(Math.random() * 4)] as Rotation),
      })),
    );
    setGrid(newGrid);
    setIsSolved(false);
    setMoves(0);
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center p-6 bg-slate-950 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent">
      <main className="max-w-6xl w-full mx-auto flex flex-col lg:grid lg:grid-cols-[300px_1fr_300px] items-center gap-12">
        <div className="hidden lg:block space-y-6 text-left">
          <h2 className="text-white font-black italic uppercase tracking-widest text-sm border-l-4 border-amber-500 pl-4">
            System Protocols
          </h2>
          <div className="space-y-4 text-xs font-medium text-slate-400">
            <p>
              <span className="text-amber-500 font-bold">01.</span> Connect
              battery to power core.
            </p>
            <p>
              <span className="text-amber-500 font-bold">02.</span> Wires glow{" "}
              <span className="text-amber-400 font-bold">Amber</span> when live.
            </p>
            <p>
              <span className="text-amber-500 font-bold">03.</span> Bridge the
              gap to synchronize the grid.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
              Circuit <span className="text-amber-500">Flow</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-2">
              Grid Status: {isSolved ? "SYNCHRONIZED" : "DIVERGENT"}
            </p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl">
            <div className="grid grid-cols-5 gap-3 bg-black/20 p-5 rounded-3xl">
              {grid.map((row, rIdx) =>
                row.map((tile, cIdx) => (
                  <button
                    key={`${rIdx}-${cIdx}`}
                    onClick={() => rotateTile(rIdx, cIdx)}
                    className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center transition-all duration-300 rounded-2xl border ${tile.fixed ? "bg-slate-800/50 border-white/10" : "bg-white/5 border-white/5 hover:bg-white/10 active:scale-95"}`}
                  >
                    <div
                      style={{ transform: `rotate(${tile.rotation}deg)` }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <TileIcon
                        type={tile.type}
                        isPowered={poweredTiles[rIdx][cIdx]}
                      />
                    </div>
                  </button>
                )),
              )}
            </div>
          </div>
          <button
            onClick={() => {
              setGrid(INITIAL_GRID);
              setIsSolved(false);
              setMoves(0);
            }}
            className="mt-12 px-8 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-amber-500 transition-all"
          >
            Reboot Grid
          </button>
        </div>

        <div className="w-full lg:w-auto space-y-4">
          <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] text-left">
            <p className="text-[10px] font-black uppercase text-slate-500 mb-1">
              Efficiency
            </p>
            <h3 className="text-4xl font-black italic text-white">
              {isSolved
                ? "100"
                : Math.floor(
                    (poweredTiles.flat().filter((x) => x).length / 25) * 100,
                  )}
              %
            </h3>
          </div>
          <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] text-left">
            <p className="text-[10px] font-black uppercase text-slate-500 mb-1">
              Iterations
            </p>
            <h3 className="text-2xl font-black italic text-white">{moves}</h3>
          </div>
        </div>
      </main>

      {isSolved && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-[4rem] p-12 text-center max-w-sm w-full shadow-2xl">
            <h2 className="text-5xl font-black text-amber-500 uppercase italic mb-2">
              Powered
            </h2>
            <p className="text-slate-500 font-bold mb-10 tracking-widest uppercase text-xs">
              Circuit Successfully Validated
            </p>
            <button
              onClick={handleNextLevel}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-amber-500 transition-all shadow-xl"
            >
              Next Sequence
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function TileIcon({ type, isPowered }: { type: TileType; isPowered: boolean }) {
  const color = isPowered ? "stroke-amber-400" : "stroke-slate-700";
  const glow = isPowered ? "drop-shadow-[0_0_10px_rgba(245,158,11,1)]" : "";
  if (type === "I")
    return (
      <svg
        className={`w-full h-full p-4 ${color} ${glow} transition-all duration-500`}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
      >
        <path d="M12 0V24" />
      </svg>
    );
  if (type === "L")
    return (
      <svg
        className={`w-full h-full p-4 ${color} ${glow} transition-all duration-500`}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 0V12H24" />
      </svg>
    );
  if (type === "T")
    return (
      <svg
        className={`w-full h-full p-4 ${color} ${glow} transition-all duration-500`}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
      >
        <path d="M0 12H24M12 12V24" />
      </svg>
    );
  if (type === "SOURCE")
    return (
      <div
        className={`text-2xl ${isPowered ? "opacity-100 scale-110 drop-shadow-[0_0_8px_white]" : "opacity-40"}`}
      >
        🔋
      </div>
    );
  if (type === "SINK")
    return (
      <div
        className={`text-2xl ${isPowered ? "opacity-100 scale-110 drop-shadow-[0_0_12px_#fbbf24]" : "opacity-40"}`}
      >
        ⚡
      </div>
    );
  return null;
}
