/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";

// --- DYNAMIC IMPORTS FOR ALL 8 GAMES ---
const NumberMerge = dynamic(
  () => import("../../components/games/NumberMerge"),
  { ssr: false },
);
const WordLink = dynamic(() => import("../../components/games/WordLinkHero"), {
  ssr: false,
});
const DailyCrossword = dynamic(
  () => import("../../components/games/DailyCrosswordHero"),
  {
    ssr: false,
  },
);
const HexaPath = dynamic(() => import("../../components/games/HexaPathHero"), {
  ssr: false,
});
const BinarySwitch = dynamic(
  () => import("../../components/games/BinarySwitchHero"),
  { ssr: false },
);
const CircuitFlow = dynamic(
  () => import("../../components/games/CircuitFlowHero"),
  { ssr: false },
);
const Resonance = dynamic(
  () => import("../../components/games/ResonanceHero"),
  { ssr: false },
);
const QuantumMaze = dynamic(
  () => import("../../components/games/QuantumMazeHero"),
  { ssr: false },
);

interface TGame {
  id: string;
  name: string;
  component: React.ComponentType;
  description: string;
  color: string;
  tagline: string;
  icon: string;
}

export default function RandomWebsiteMachine() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const games: TGame[] = useMemo(
    () => [
      {
        id: "number-merge",
        name: "Number Merge",
        component: NumberMerge,
        description: "Master exponential growth.",
        color: "from-purple-600 to-indigo-600",
        tagline: "GROWTH_ALGORITHM_ACTIVE",
        icon: "🔢",
      },
      {
        id: "word-link",
        name: "Word Link",
        component: WordLink,
        description: "Connect the lexicon.",
        color: "from-indigo-600 to-violet-600",
        tagline: "LEXICAL_STREAM_SYNCED",
        icon: "🔗",
      },
      {
        id: "crossword",
        name: "Daily Crossword",
        component: DailyCrossword,
        description: "Focus your vocabulary.",
        color: "from-blue-600 to-violet-500",
        tagline: "GRID_DECRYPTED",
        icon: "🧩",
      },
      {
        id: "hexa-path",
        name: "Hexa-Path",
        component: HexaPath,
        description: "Spatial reasoning challenge.",
        color: "from-rose-500 to-purple-600",
        tagline: "GEOMETRY_LOCKED",
        icon: "⬢",
      },
      {
        id: "binary-switch",
        name: "Binary Switch",
        component: BinarySwitch,
        description: "Master the bits.",
        color: "from-emerald-500 to-cyan-600",
        tagline: "BITSTREAM_STABLE",
        icon: "🔌",
      },
      {
        id: "circuit",
        name: "Circuit Flow",
        component: CircuitFlow,
        description: "Route the power.",
        color: "from-yellow-500 to-red-600",
        tagline: "LOGIC_CORE_ACTIVE",
        icon: "⚡",
      },
      {
        id: "resonance",
        name: "Resonance",
        component: Resonance,
        description: "Sync the signals.",
        color: "from-cyan-500 to-indigo-600",
        tagline: "SIGNAL_LOCKED",
        icon: "🌊",
      },
      {
        id: "quantum",
        name: "Quantum Maze",
        component: QuantumMaze,
        description: "Navigate the unseen.",
        color: "from-violet-600 to-indigo-700",
        tagline: "WAVEFUNCTION_COLLAPSE",
        icon: "🌌",
      },
    ],
    [],
  );

  const getNextGame = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * games.length);
        } while (next === prev && games.length > 1);
        return next;
      });
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  };

  useEffect(() => {
    getNextGame();
  }, [games]);

  const currentGame = currentIndex !== null ? games[currentIndex] : null;
  const GameComponent = currentGame?.component;

  return (
    <div className="h-screen bg-slate-950 font-sans overflow-hidden flex flex-col">
      <Head>
        <title>Logic Machine | 8 Master Challenges</title>
      </Head>

      {/* --- TOP BAR --- */}
      {/* --- TOP BAR --- */}
      <header className="flex-none bg-slate-900 border-b border-white/10 px-4 py-3 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
          </div>
          <Link href="/p">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors cursor-pointer">
              ← Exit Machine
            </span>
          </Link>
        </div>

        {/* --- CENTER: GAME TAGLINE (Hidden on small screens) --- */}
        <div className="hidden lg:flex bg-black/40 px-6 py-1.5 rounded-full border border-white/5 text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">
          {loading ? "SEARCHING_FOR_SIGNAL..." : currentGame?.tagline}
        </div>

        {/* --- RIGHT: ADSENSE SAFETY HIGHLIGHT --- */}
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-emerald-500/10 border border-emerald-500/40 px-3 py-1.5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <div className="flex flex-col items-end mr-3 border-r border-emerald-500/30 pr-3">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter leading-none">
                100% Native Content
              </span>
              <span className="text-[7px] font-bold text-emerald-600/80 uppercase leading-none mt-1">
                Original Property of ImBoredNow
              </span>
            </div>
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
          </div>
          
          <div className="hidden sm:block text-[10px] font-black text-slate-500 uppercase">
            {currentGame?.name || "Loading..."}
          </div>
        </div>
      </header>

      {/* --- NATIVE GAME VIEWPORT --- */}
      <main className="flex-grow relative bg-slate-950 overflow-y-auto custom-scrollbar">
        {loading && (
          <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-slate-950">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-2 border-white/5 rounded-full" />
              <div className="absolute inset-0 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="mt-6 text-[10px] font-black text-white uppercase tracking-[0.6em] animate-pulse">
              Loading_Native_Module...
            </p>
          </div>
        )}

        <div
          className={`${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
        >
          {GameComponent && <GameComponent />}
        </div>
      </main>

      {/* --- ACTION BAR --- */}
      <footer className="flex-none p-4 md:p-8 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent fixed bottom-0 left-0 w-full z-50">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <div className="flex-grow bg-slate-900/80 backdrop-blur-3xl rounded-[2rem] border border-white/10 p-4 flex items-center gap-5 shadow-2xl">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${currentGame?.color} flex-none flex items-center justify-center text-xl shadow-lg`}
            >
              {currentGame?.icon}
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                Active Experiment
              </p>
              <p className="text-white font-bold text-lg leading-tight truncate tracking-tighter uppercase">
                {currentGame?.name}
              </p>
            </div>
          </div>

          <button
            onClick={getNextGame}
            disabled={loading}
            className="flex-none h-16 px-8 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-90 shadow-[0_0_40px_rgba(220,38,38,0.4)] disabled:opacity-50"
          >
            {loading ? "..." : "Next Game 🔴"}
          </button>
        </div>
      </footer>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
