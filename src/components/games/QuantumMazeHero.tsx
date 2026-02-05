import React, { useState, useEffect, useCallback } from "react";

const GRID_SIZE = 7;

export default function QuantumMazeHero() {
  const [playerPos, setPlayerPos] = useState({ r: 0, c: 0 });
  const [exitPos] = useState({ r: GRID_SIZE - 1, c: GRID_SIZE - 1 });
  const [walls, setWalls] = useState<boolean[][]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isSolved, setIsSolved] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const generateMaze = useCallback(() => {
    const newWalls = Array(GRID_SIZE)
      .fill(0)
      .map(() => Array(GRID_SIZE).fill(false));

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const isStart = r === 0 && c === 0;
        const isExit = r === exitPos.r && c === exitPos.c;
        const isBuffer =
          (r === 0 && c === 1) || (r === 1 && c === 0) || (r === 1 && c === 1);
        if (!isStart && !isExit && !isBuffer) {
          newWalls[r][c] = Math.random() < 0.28;
        }
      }
    }
    setWalls(newWalls);
    setPlayerPos({ r: 0, c: 0 });
    setIsVisible(true);
    setIsSolved(false);
    setIsFailed(false);
    setTimeout(() => setIsVisible(false), 4000);
  }, [exitPos]);

  useEffect(() => {
    generateMaze();
  }, [generateMaze]);

  const movePlayer = useCallback(
    (dr: number, dc: number) => {
      if (isSolved || isFailed) return;
      setPlayerPos((prev) => {
        const newR = prev.r + dr;
        const newC = prev.c + dc;
        if (newR >= 0 && newR < GRID_SIZE && newC >= 0 && newC < GRID_SIZE) {
          if (walls[newR][newC]) {
            setIsFailed(true);
            setIsVisible(true);
            return prev;
          }
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // List of keys that usually cause scrolling
      const keysToBlock = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        " ",
      ];

      if (keysToBlock.includes(e.key)) {
        e.preventDefault(); // Stop the page from scrolling
      }

      if (e.key === "ArrowUp") movePlayer(-1, 0);
      if (e.key === "ArrowDown") movePlayer(1, 0);
      if (e.key === "ArrowLeft") movePlayer(0, -1);
      if (e.key === "ArrowRight") movePlayer(0, 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [movePlayer]);

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center p-4 bg-slate-950">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-transparent" />
      </div>

      <main className="relative z-10 max-w-6xl w-full mx-auto flex flex-col lg:grid lg:grid-cols-[300px_1fr_300px] items-center gap-12">
        <div className="hidden lg:block space-y-6 text-left">
          <h2 className="text-white font-black italic uppercase tracking-widest text-sm border-l-4 border-purple-500 pl-4">
            Observation Rules
          </h2>
          <div className="space-y-4 text-xs font-medium text-slate-400">
            <p>
              <span className="text-purple-500 font-bold">01.</span> Maze
              vanishes after 4s.
            </p>
            <p>
              <span className="text-purple-500 font-bold">02.</span> Use Arrow
              keys to navigate the void.
            </p>
            <p>
              <span className="text-purple-500 font-bold">03.</span> Collision
              causes immediate failure.
            </p>
          </div>
        </div>

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
                  const isPlayer = playerPos.r === rIdx && playerPos.c === cIdx;
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
          <button
            onClick={generateMaze}
            className="mt-8 px-8 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-purple-500 transition-all"
          >
            Reboot System
          </button>
        </div>

        <div className="hidden lg:block w-full text-left">
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

      {(isSolved || isFailed) && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-6 transition-all">
          <div className="bg-white rounded-[4rem] p-12 text-center max-w-sm w-full shadow-2xl">
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
    </section>
  );
}
