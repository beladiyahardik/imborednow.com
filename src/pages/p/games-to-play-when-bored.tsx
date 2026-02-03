"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function GamesArchive() {
  const [filter, setFilter] = useState("All");
  const [activeUsers, setActiveUsers] = useState(8420);


  const games = [
    {
      title: "Number Merge",
      icon: "🔢",
      desc: "The ultimate 2048 strategy challenge. Merge tiles.",
      color: "from-purple-600 to-indigo-600",
      url: "/p/number-merge",
      tag: "Strategy",
      hot: true,
    },
    {
      title: "Word Link",
      icon: "🔗",
      desc: "Connect letters and hunt for hidden words.",
      color: "from-indigo-600 to-violet-600",
      url: "/p/word-link",
      tag: "Lexical",
      hot: false,
    },
    {
      title: "Daily Crossword",
      icon: "🧩",
      desc: "Sharpen your focus with today's master grid.",
      color: "from-blue-600 to-indigo-500",
      url: "/p/daily-crossword",
      tag: "Brain Training",
      hot: true,
    },
    {
      title: "Hexa-Path",
      icon: "⬢",
      desc: "Navigate hexagonal grids in this spatial puzzle.",
      color: "from-rose-500 to-purple-600",
      url: "/p/hexa-path",
      tag: "Logic",
      hot: false,
    },
    {
      title: "Binary Switch",
      icon: "🔌",
      desc: "Master bits. Toggle switches to match sequences.",
      color: "from-emerald-500 to-cyan-600",
      url: "/p/binary-switch",
      tag: "Computing",
      hot: false,
    },
    {
      title: "Circuit Flow",
      icon: "⚡",
      desc: "Route power through gates to activate the core.",
      color: "from-yellow-500 to-red-600",
      url: "/p/circuit-flow",
      tag: "Logic",
      hot: true,
    },
    {
      title: "Resonance",
      icon: "🌊",
      desc: "Align frequency and phase to sync signals.",
      color: "from-cyan-500 to-indigo-600",
      url: "/p/resonance",
      tag: "Physics",
      hot: false,
    },
    {
      title: "Quantum Maze",
      icon: "🌌",
      desc: "Explore strange logic in the quantum realm.",
      color: "from-indigo-700 to-blue-800",
      url: "/p/quantum-maze",
      tag: "Logic",
      hot: true,
    },
  ];

  const categories = ["All", "Logic", "Strategy", "Brain Training", "Physics"];
  const filteredGames =
    filter === "All" ? games : games.filter((g) => g.tag === filter);

  return (
    <>
      <Head>
        <title>Games to Play When Bored | Bored Button Fun Arcade</title>
        <meta
          name="description"
          content="Discover the best browser games to play when bored. Free, unblocked, and high-quality logic and strategy puzzles."
        />
      </Head>

      <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-red-200 overflow-x-hidden">
        {/* --- HERO SECTION --- */}
        <section className="relative pt-24 pb-40 px-4 overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="flex justify-center mb-8">
              <Link href="/">
                <div className="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/50 text-[10px] font-black tracking-[0.3em] uppercase hover:text-white transition-colors cursor-pointer">
                  ← Back to Control Center
                </div>
              </Link>
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-white text-center tracking-tighter uppercase mb-6 italic">
              Arcade <span className="text-red-600">Protocol</span>
            </h1>

            {/* CATEGORY TABS */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                    filter === cat
                      ? "bg-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                      : "bg-white/5 text-slate-500 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* --- GAMES GRID --- */}
        <main className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGames.map((game, i) => (
              <Link key={i} href={game.url}>
                <div className="group relative h-[420px] rounded-[3rem] bg-white border border-slate-100 p-2 overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2">
                  <div
                    className={`relative h-1/2 rounded-[2.5rem] bg-gradient-to-br ${game.color} flex items-center justify-center overflow-hidden`}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                    <span className="text-7xl group-hover:scale-125 transition-transform duration-500 z-10">
                      {game.icon}
                    </span>
                    {game.hot && (
                      <div className="absolute top-6 right-6 bg-black text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter animate-bounce">
                        Trending
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {game.tag}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-3 leading-none">
                      {game.title}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 line-clamp-2">
                      {game.desc}
                    </p>
                    <div className="text-red-600 font-black text-[11px] uppercase tracking-[0.2em]">
                      Initialize Game →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* --- INTEGRATED ARTICLE SECTION --- */}
          <section className="mt-32 max-w-5xl mx-auto bg-white rounded-[4rem] p-10 md:p-24 shadow-sm border border-slate-100">
            <article className="prose prose-slate prose-lg max-w-none">
              <header className="mb-16 text-center">
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter leading-none mb-6">
                  The Ultimate Protocol: <br />
                  <span className="text-red-600">
                    Why We Seek Games to Play When Bored
                  </span>
                </h2>
                <p className="text-xl text-slate-500 font-medium leading-relaxed italic">
                  In the digital age, boredom is a paradox. We carry the sum of
                  human knowledge in our pockets, yet the sensation of being
                  &quot;stuck&quot; is more prevalent than ever.
                </p>
              </header>

              <div className="space-y-12 text-slate-600">
                <section>
                  <h3 className="text-2xl font-black uppercase italic text-slate-900 border-l-4 border-red-600 pl-4">
                    1. The Science of the &quot;I Am Bored&quot; Syndrome
                  </h3>
                  <p>
                    Boredom isn&apos;t just the absence of activity; it’s the
                    desire for <strong>meaningful engagement</strong>. When you
                    say, &quot;I am so bored,&quot; your brain is essentially
                    signaling a drop in dopamine. It is looking for a challenge,
                    a mystery, or a pattern to solve.
                  </p>
                  <p>
                    This is where <strong>red button games</strong> come into
                    play. Unlike mindless scrolling, engaging with a structured
                    game provides a &quot;flow state.&quot; When you click that
                    random button, you aren&apos;t just wasting time; you are
                    resetting your cognitive clock.
                  </p>
                </section>

                <section className="bg-slate-50 p-8 md:p-12 rounded-[3rem]">
                  <h3 className="text-2xl font-black uppercase italic text-slate-900">
                    2. Why the Bored Button is the Internet’s Escape Hatch
                  </h3>
                  <p>
                    For over a decade, the concept of a &quot;Bored Button&quot;
                    has served as the internet’s emergency exit. The premise is
                    simple: you are one click away from a random, amazing corner
                    of the web.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm text-xs font-bold uppercase tracking-wider text-slate-500">
                      Free Browser Games
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm text-xs font-bold uppercase tracking-wider text-slate-500">
                      Unblocked for School
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm text-xs font-bold uppercase tracking-wider text-slate-500">
                      Logic Experiments
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-black uppercase italic text-slate-900">
                    3. High-Fidelity Games to Play When Bored
                  </h3>
                  <div className="space-y-6">
                    <p>
                      <strong>A. Number Merge:</strong> The ultimate strategy
                      challenge. Not just about sliding tiles; it’s about
                      spatial management and exponential planning.
                    </p>
                    <p>
                      <strong>B. Hexa-Path:</strong> Navigating hexagonal grids
                      forces you to think in six directions, improving spatial
                      reasoning.
                    </p>
                    <p>
                      <strong>C. Binary Switch & Circuit Flow:</strong> Perfect
                      for the tech-savvy, turning computer science logic into a
                      digital playground.
                    </p>
                  </div>
                </section>

                <section className="grid md:grid-cols-2 gap-8 py-10">
                  <div className="border border-slate-100 p-8 rounded-[2.5rem]">
                    <h4 className="font-black uppercase italic mb-4">
                      4. School & Work Survival
                    </h4>
                    <ul className="text-sm space-y-2 list-none p-0">
                      <li>
                        ⚡ <strong>Instant Load:</strong> Millisecond response
                        times.
                      </li>
                      <li>
                        🔌 <strong>No Install:</strong> Pure browser-based fun.
                      </li>
                      <li>
                        💾 <strong>Auto-Save:</strong> Progress is locked in.
                      </li>
                    </ul>
                  </div>
                  <div className="border border-slate-100 p-8 rounded-[2.5rem]">
                    <h4 className="font-black uppercase italic mb-4">
                      5. Beyond Gaming
                    </h4>
                    <ul className="text-sm space-y-2 list-none p-0">
                      <li>
                        ❤️ <strong>Life Expectancy:</strong> Honest data
                        tracking.
                      </li>
                      <li>
                        ⏳ <strong>History Timelines:</strong> Your place in
                        time.
                      </li>
                      <li>
                        🌌 <strong>Cosmic Data:</strong> Live lightning & stars.
                      </li>
                    </ul>
                  </div>
                </section>

                <section className="text-center bg-slate-950 text-white p-12 rounded-[3rem] relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-white text-2xl font-black uppercase italic mb-4">
                      6. The Psychology of the Red Button
                    </h3>
                    <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                      Red is the color of urgency. When you click the red
                      button, you take control of your environment. You are
                      choosing to end the stagnation of boredom.
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 blur-3xl rounded-full" />
                </section>

                <section id="faq" className="pt-10 border-t border-slate-100">
                  <h3 className="text-3xl font-black uppercase italic text-slate-900 mb-8">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        q: "What is the best game to play when bored?",
                        a: "Strategy games like Number Merge or Quantum Maze are superior for long sessions, while Trivia is great for quick fixes.",
                      },
                      {
                        q: "Are these games unblocked at school?",
                        a: "Most use standard web protocols, making them highly accessible even on restricted networks.",
                      },
                      {
                        q: "Is the Bored Button free?",
                        a: "Yes. Our mission is to provide a universal cure for boredom at zero cost.",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-slate-50 p-6 rounded-2xl">
                        <p className="font-black text-slate-900 uppercase italic mb-2 text-sm">
                          {item.q}
                        </p>
                        <p className="text-sm text-slate-500 font-medium">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </article>
          </section>
        </main>
      </div>
    </>
  );
}