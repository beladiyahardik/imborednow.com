/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function ToolsHub() {
  const [search, setSearch] = useState("");

  const allTools = [
    // Games
    { title: "Number Merge", icon: "🔢", desc: "Classic 2048-style number merging puzzle.", href: "/p/number-merge", tag: "Trending" },
    { title: "Word Link", icon: "🔗", desc: "Connect letters to find hidden words.", href: "/p/word-link", tag: "Popular" },
    { title: "Daily Crossword", icon: "🧩", desc: "Today's vocabulary challenge.", href: "/p/daily-crossword", tag: "Daily" },
    { title: "Hexa-Path", icon: "⬢", desc: "Navigate hexagonal logic grids.", href: "/p/hexa-path", tag: "Logic" },
    { title: "Binary Switch", icon: "🔌", desc: "Toggle bits to match binary targets.", href: "/p/binary-switch", tag: "Computing" },
    { title: "Circuit Flow", icon: "⚡", desc: "Route power through logic gates.", href: "/p/circuit-flow", tag: "Expert" },
    { title: "Resonance", icon: "🌊", desc: "Align waves and frequencies.", href: "/p/resonance", tag: "Physics" },
    { title: "Quantum Maze", icon: "🌌", desc: "Navigate shifting quantum dimensions.", href: "/p/quantum-maze", tag: "Advanced" },
    // Tools
    { title: "Birthdate Secrets", icon: "🎂", desc: "Fascinating facts about your birthday.", href: "/p/birthdate-calculator", tag: "Popular" },
    { title: "Pixel Art Studio", icon: "🎨", desc: "Create 8-bit pixel art instantly.", href: "/p/pixel-art", tag: "Creative" },
    { title: "History Timeline", icon: "⏳", desc: "See your place in human history.", href: "/p/history-timeline", tag: "Insight" },
    { title: "Life Expectancy", icon: "❤️", desc: "Realistic estimate of your remaining years.", href: "/p/life-expectancy-calculator", tag: "Deep" },
    { title: "Lifestyle Factor", icon: "⚖️", desc: "How your habits affect your future.", href: "/p/life-style-factor", tag: "Health" },
  ];

  const filtered = allTools.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <Head>
        <title>Discovery Lab • Free Tools & Games</title>
        <meta name="description" content="Free brain-training games and useful personal discovery tools. No sign-up, instant play." />
      </Head>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {search ? (
          <>
            <p className="text-sm text-zinc-500 mb-8">Results for “{search}”</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((tool, i) => <ToolCard key={i} tool={tool} />)}
            </div>
          </>
        ) : (
          <>
            {/* Games */}
            <div id="games" className="mb-20 scroll-mt-20">
              <div className="uppercase text-xs font-bold tracking-[2px] text-zinc-500 mb-8">Interactive Games</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allTools.slice(0, 8).map((tool, i) => <ToolCard key={i} tool={tool} />)}
              </div>
            </div>

            {/* Tools */}
            <div id="tools" className="scroll-mt-20">
              <div className="uppercase text-xs font-bold tracking-[2px] text-zinc-500 mb-8">Discovery Tools</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allTools.slice(8).map((tool, i) => <ToolCard key={i} tool={tool} />)}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Short About */}
      <div className="bg-white border-t py-16">
        <div className="max-w-3xl mx-auto px-6 text-center text-sm text-zinc-600 leading-relaxed">
          The Discovery Lab offers free, fast-loading games that improve focus and logic, plus simple tools that give you meaningful insights about your life and time.
          Built by ImBoredNow .
        </div>
      </div>
    </div>
  );
}

function ToolCard({ tool }: { tool: any }) {
  return (
    <Link
      href={tool.href}
      className="group bg-white border border-zinc-100 rounded-3xl p-8 hover:border-violet-200 transition-all hover:-translate-y-0.5"
    >
      <div className="text-5xl mb-6">{tool.icon}</div>

      <div className="flex items-start justify-between mb-4">
        <h3 className="font-bold text-xl text-zinc-900">{tool.title}</h3>
        <span className="text-[10px] font-black uppercase bg-zinc-100 px-3 py-1 rounded-full text-zinc-500 tracking-wider">
          {tool.tag}
        </span>
      </div>

      <p className="text-zinc-600 text-[15px] leading-snug line-clamp-3">{tool.desc}</p>

      <div className="mt-8 text-violet-600 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
        Open now <span className="text-lg">→</span>
      </div>
    </Link>
  );
}