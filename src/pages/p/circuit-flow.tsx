"use client";

import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";

// --- TYPES & LOGIC HELPERS ---
type TileType = "I" | "L" | "T" | "SOURCE" | "SINK";
type Rotation = 0 | 90 | 180 | 270;

interface Tile {
  type: TileType;
  rotation: Rotation;
  fixed?: boolean;
}

// Defines which sides of a tile have a connection
// 0: Top, 1: Right, 2: Bottom, 3: Left
const getConnections = (type: TileType, rotation: Rotation): number[] => {
  const rotShift = rotation / 90;
  let base: number[] = [];

  if (type === "I") base = [0, 2];
  else if (type === "L") base = [0, 1];
  else if (type === "T") base = [1, 2, 3];
  else if (type === "SOURCE")
    base = [1]; // Source points Right
  // FIX: SINK now accepts power from any direction [Top, Right, Bottom, Left]
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

export default function CircuitFlowPage() {
  const [grid, setGrid] = useState<Tile[][]>(INITIAL_GRID);
  const [poweredTiles, setPoweredTiles] = useState<boolean[][]>(
    Array(GRID_SIZE)
      .fill(0)
      .map(() => Array(GRID_SIZE).fill(false)),
  );
  const [isSolved, setIsSolved] = useState(false);
  const [moves, setMoves] = useState(0);

  // --- PATHFINDING ALGORITHM ---
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
        [r - 1, c, 0, 2], // Top
        [r, c + 1, 1, 3], // Right
        [r + 1, c, 2, 0], // Bottom
        [r, c - 1, 3, 1], // Left
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
    // Check if the SINK (bottom-right) is reached by the power flow
    if (powered[GRID_SIZE - 1][GRID_SIZE - 1]) {
      setIsSolved(true);
    }
  }, []);

  useEffect(() => {
    updateCircuitry(grid);
  }, [grid, updateCircuitry]);

  const rotateTile = (r: number, c: number) => {
    if (grid[r][c].fixed || isSolved) return;
    const newGrid = grid.map((row, ri) =>
      row.map((tile, ci) => {
        if (ri === r && ci === c) {
          return {
            ...tile,
            rotation: ((tile.rotation + 90) % 360) as Rotation,
          };
        }
        return tile;
      }),
    );
    setGrid(newGrid);
    setMoves((m) => m + 1);
  };

  const handleNextLevel = () => {
    // Scramble the rotations for a "new" challenge
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
    <div className="min-h-screen bg-white font-sans selection:bg-amber-200 overflow-x-hidden select-none">
      <Head>
        <title>Circuit Flow | Logic Lab</title>
      </Head>

      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent">
        <main className="max-w-6xl w-full mx-auto flex flex-col lg:grid lg:grid-cols-[300px_1fr_300px] items-center gap-12">
          {/* LEFT: INSTRUCTIONS */}
          <div className="hidden lg:block space-y-6">
            <h2 className="text-white font-black italic uppercase tracking-widest text-sm border-l-4 border-amber-500 pl-4">
              System Protocols
            </h2>
            <div className="space-y-4 text-xs font-medium text-slate-400">
              <p>
                <span className="text-amber-500 font-bold">01.</span> Connect
                the battery to the power core.
              </p>
              <p>
                <span className="text-amber-500 font-bold">02.</span> Wires will
                glow <span className="text-amber-400">Amber</span> only when
                connected to the live source.
              </p>
              <p>
                <span className="text-amber-500 font-bold">03.</span> The core
                (⚡) can now accept energy from any side.
              </p>
            </div>
          </div>

          {/* CENTER: GAME ENGINE */}
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
                      className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center transition-all duration-300 rounded-2xl border ${
                        tile.fixed
                          ? "bg-slate-800/50 border-white/10"
                          : "bg-white/5 border-white/5 hover:bg-white/10 active:scale-95"
                      }`}
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

          {/* RIGHT: PROGRESS */}
          <div className="w-full lg:w-auto space-y-4">
            <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem]">
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
            <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem]">
              <p className="text-[10px] font-black uppercase text-slate-500 mb-1">
                Iterations
              </p>
              <h3 className="text-2xl font-black italic text-white">{moves}</h3>
            </div>
          </div>
        </main>
      </section>

      {/* --- HOW TO PLAY SECTION --- */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/90 rounded-[3rem] p-10 md:p-14 border border-slate-200/10 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-10 text-center">
              How to <span className="text-amber-500">Play</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-slate-300">
              <div className="flex gap-4">
                <span className="text-amber-500 font-black text-xl">01.</span>
                <p className="text-sm leading-relaxed">
                  <strong>Click to Rotate:</strong> Tap any tile on the grid to
                  rotate it 90 degrees. Your goal is to align the paths.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-amber-500 font-black text-xl">02.</span>
                <p className="text-sm leading-relaxed">
                  <strong>Follow the Glow:</strong> Paths will turn amber when
                  they are successfully connected to the power source.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-amber-500 font-black text-xl">03.</span>
                <p className="text-sm leading-relaxed">
                  <strong>Bridge the Gap:</strong> Connect the battery at the
                  top-left to the core at the bottom-right to win.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-amber-500 font-black text-xl">04.</span>
                <p className="text-sm leading-relaxed">
                  <strong>Fixed Tiles:</strong> Some tiles are locked in place
                  and cannot be rotated. You must build your circuit around
                  them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ARTICLE SECTION --- */}
      <section className="bg-white py-24 px-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          {/* Header Area */}
          <div className="text-center mb-20">
            <span className="bg-amber-100 text-amber-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
              Human-Centric Engineering
            </span>
            <h2 className="text-4xl md:text-7xl font-black tracking-tight text-slate-950 mt-8 mb-8 leading-tight">
              The Art of the Connection: <br />
              <span className="text-amber-600 italic">
                Finding Flow in Chaos
              </span>
            </h2>
            <p className="text-xl text-slate-500 font-medium italic">
              "A circuit is more than just wire and silicon; it’s a path for
              intent."
            </p>
          </div>

          <article className="prose prose-slate lg:prose-xl max-w-none text-slate-700 leading-relaxed space-y-12">
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                1. The Spark of Curiosity
              </h3>
              <p>
                There is a specific kind of quiet that settles over a room when
                someone is deep in a puzzle. You’ve probably felt it while
                playing **Circuit Flow**. It’s that moment where the rest of the
                world fades away, and all that exists is a 5x5 grid of
                disconnected lines and the singular goal of making them whole.
                We’ve been obsessed with "connecting the dots" since we were
                children, but as we grow up, those dots become complex systems.
              </p>
              <p>
                In the early days of electrical engineering, there were no fancy
                simulators. There were just breadboards, jumper wires, and the
                very real smell of ozone if you got it wrong. This game is a
                tribute to that tactile struggle. When you click a tile to
                rotate it, you aren't just moving pixels; you're making a choice
                about how energy should move. That’s a very human instinct: the
                desire to direct power, to organize the disorganized, and to
                find the "flow."
              </p>
            </div>

            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 my-12">
              <h3 className="text-2xl font-black text-slate-900 mb-4">
                The Psychology of the 'Aha!' Moment
              </h3>
              <p>
                Why does it feel so good when the amber light finally hits the
                core? Psychologists call this "Cognitive Closure." Our brains
                are naturally wired to dislike incompleteness. A broken circuit
                creates a small, subtle tension in our minds. By rotating that
                final 'L' or 'T' joint into place, we release that tension. It’s
                a hit of dopamine that tells us, "You fixed it. The world is
                orderly again."
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                2. Thinking in Blueprints
              </h3>
              <p>
                To get good at Circuit Flow, you have to stop looking at the
                tiles as individual squares and start seeing them as a single,
                living organism. This is what we call "Systemic Thinking." In
                the real world, this is how city planners look at traffic, how
                doctors look at the circulatory system, and how programmers look
                at data structures.
              </p>
              <p>
                Notice how the **parietal lobe** kicks in when you're playing?
                That's the part of your brain responsible for spatial
                navigation. You’re essentially performing mental
                rotations—simulating the outcome of a move before you actually
                make it. It’s a mental rehearsal. When you look at an 'I' tile
                and realize it needs to bridge the gap between two 'L' shapes,
                you are practicing the same geometry that NASA engineers use to
                dock spacecraft. It’s all about vectors, alignment, and
                anticipating the path of least resistance.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                3. The Philosophy of the Path
              </h3>
              <p>
                Electricity is lazy. Or, more accurately, it’s efficient. It
                always seeks the easiest way to the ground. In Circuit Flow, we
                force the electricity to follow *our* path. There’s a lesson
                there about life, too. Sometimes the most direct route isn't
                available. You might find your path blocked by a "fixed"
                tile—one of those stubborn pieces that won't rotate no matter
                how hard you click.
              </p>
              <p>
                Life is full of fixed tiles. Obstacles we didn't choose and
                can't change. The game teaches us that the solution isn't to
                fight the fixed tile, but to route around it. It encourages a
                flexible mindset. If you can't go through the center of the
                grid, go around the perimeter. If the 'T' junction isn't
                helping, try a series of 'L' turns.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 my-16">
              <div className="p-8 bg-amber-50 rounded-[2rem] border border-amber-100">
                <h4 className="font-black text-amber-900 mb-2 uppercase tracking-tight">
                  The Logic of 'T'
                </h4>
                <p className="text-sm leading-relaxed">
                  The 'T' tile is the most versatile piece in your arsenal. It’s
                  a splitter. In digital logic, this represents a "fan-out,"
                  where one signal is sent to multiple destinations. It’s the
                  backbone of communication.
                </p>
              </div>
              <div className="p-8 bg-slate-900 rounded-[2rem] text-white">
                <h4 className="font-black mb-2 uppercase tracking-tight">
                  The 'L' Pivot
                </h4>
                <p className="text-sm leading-relaxed opacity-80">
                  Corner pieces are the masters of redirection. They teach us
                  that progress isn't always a straight line. Sometimes, you
                  have to turn 90 degrees to find the right direction.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                4. Beyond the Battery: Real World Flow
              </h3>
              <p>
                While this is a game, the logic is identical to how the power
                grid in your neighborhood works. Imagine the "Source" is a
                substation and the "Sink" is your house. Every time you flip a
                switch in this game, you're mimicking the work of a grid
                operator balancing the load.
              </p>
              <p>
                In the coming decades, our real-world circuits are going to get
                much more complex. With renewable energy, power doesn't just
                flow one way anymore. It’s becoming a "Smart Grid"—a giant,
                global game of Circuit Flow where the pieces are moving every
                second. By training your brain here, you’re developing the
                intuition needed to understand the energy-fluid world we are
                building.
              </p>
            </div>

            <div className="space-y-6 pb-20">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                Conclusion: The Final Connection
              </h3>
              <p>
                Next time you play a round, take a second to look at the grid
                before you make your first move. Don't just click randomly. Look
                at the SINK. Look at the SOURCE. Visualize the invisible line
                that connects them. Whether you solve it in 5 moves or 50, the
                result is the same: you’ve brought light to the dark.
              </p>
              <p>
                In a world that often feels disconnected and fragmented, there's
                something deeply healing about a game where everything finally
                clicks into place. Keep finding the flow, keep testing the
                connections, and most importantly, keep your curiosity powered
                up.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* SUCCESS MODAL */}
      {isSolved && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-6 transition-all duration-700">
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
    </div>
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
