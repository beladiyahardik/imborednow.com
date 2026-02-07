"use client";

import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";

export default function GamesArchive() {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const games = [
    { title: "Number Merge", icon: "🔢", desc: "Merge tiles like 2048. Strategy at its best.", url: "/p/number-merge", tag: "Strategy", hot: true },
    { title: "Word Link", icon: "🔗", desc: "Connect letters to uncover hidden words.", url: "/p/word-link", tag: "Lexical" },
    { title: "Daily Crossword", icon: "🧩", desc: "Today's vocabulary-building crossword.", url: "/p/daily-crossword", tag: "Brain Training", hot: true },
    { title: "Hexa-Path", icon: "⬢", desc: "Solve spatial puzzles on hex grids.", url: "/p/hexa-path", tag: "Logic" },
    { title: "Binary Switch", icon: "🔌", desc: "Logic puzzles with binary sequences.", url: "/p/binary-switch", tag: "Computing" },
    { title: "Circuit Flow", icon: "⚡", desc: "Route power through logic gates.", url: "/p/circuit-flow", tag: "Logic", hot: true },
    { title: "Resonance", icon: "🌊", desc: "Sync waves by matching frequency & phase.", url: "/p/resonance", tag: "Physics" },
    { title: "Quantum Maze", icon: "🌌", desc: "Navigate quantum dimensions.", url: "/p/quantum-maze", tag: "Logic", hot: true },
  ];

  const categories = ["All", "Logic", "Strategy", "Brain Training", "Physics"];

  const filteredGames = useMemo(() => {
    let result = games;
    if (filter !== "All") result = result.filter(g => g.tag === filter);
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(g =>
        g.title.toLowerCase().includes(term) ||
        g.desc.toLowerCase().includes(term)
      );
    }
    return result;
  }, [filter, searchTerm]);

  return (
    <>
      <Head>
        <title>Free Games to Play When Bored • Arcade Protocol</title>
        <meta name="description" content="Instant browser games. No downloads, no sign-up. Play logic, strategy, word, and physics puzzles when you're bored." />
      </Head>

      <div className="min-h-screen bg-white font-sans">
        {/* Hero + Search + Random Button */}
        <div className="bg-zinc-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-black tracking-tighter mb-4">Bored?</h1>
            <p className="text-zinc-400 text-lg mb-10">Pick a game. Play instantly.</p>

            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search games..."
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
              />
              <button
                onClick={() => {
                  const randomGame = games[Math.floor(Math.random() * games.length)];
                  window.location.href = randomGame.url;
                }}
                className="bg-white text-black font-bold px-10 rounded-2xl hover:bg-zinc-100 transition flex items-center justify-center gap-2 whitespace-nowrap"
              >
                🎲 Random Game
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="max-w-6xl mx-auto px-6 py-10 border-b">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-7 py-3 text-sm font-semibold rounded-full transition-all border ${filter === cat
                    ? "bg-black text-white border-black"
                    : "bg-white border-zinc-200 hover:border-zinc-300"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredGames.map((game, i) => (
              <Link key={i} href={game.url} className="group block">
                <div className="flex gap-6 items-start">
                  {/* Icon */}
                  <div className="w-20 h-20 flex-shrink-0 bg-zinc-100 rounded-3xl flex items-center justify-center text-5xl transition-transform group-hover:scale-110">
                    {game.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="uppercase text-[10px] font-bold tracking-[1.5px] text-zinc-400">{game.tag}</span>
                      {game.hot && <span className="text-amber-500 text-xs font-black">★ Trending</span>}
                    </div>

                    <h3 className="font-bold text-2xl text-zinc-900 mb-2 leading-none group-hover:text-black">
                      {game.title}
                    </h3>

                    <p className="text-zinc-600 text-[15px] leading-snug line-clamp-2">
                      {game.desc}
                    </p>

                    <div className="mt-5 text-black text-sm font-medium flex items-center gap-1.5 group-hover:gap-2 transition-all">
                      Play now <span aria-hidden="true">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <p className="text-center text-zinc-500 py-20">No games match your search.</p>
          )}
        </div>

        {/* Helpful Content Section */}
        <div className="bg-zinc-50 py-20 border-t">
          <div className="max-w-3xl mx-auto px-6 text-zinc-600 prose prose-zinc">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8">Why these games work when you're bored</h2>

            <p>Short breaks with focused games give your brain a quick reset. These are designed to be:</p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-sm mt-8">
              <li>✓ Load instantly in your browser</li>
              <li>✓ No accounts or tracking</li>
              <li>✓ Work great on mobile</li>
              <li>✓ Actually improve focus &amp; logic</li>
              <li>✓ Updated regularly</li>
              <li>✓ 100% free forever</li>
            </ul>

            <p className="mt-12 text-xs text-zinc-400 font-mono tracking-widest text-center">
              Built for real people who just want a good 5–20 minute break.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}