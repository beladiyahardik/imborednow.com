"use client";
import NeuralLink from "@/components/games/NeuralLink";
import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function NeuralLinkPage({ seo, jsonLd }: any) {
  // Use provided SEO or fallback to defaults
  const currentSeo = seo || {
    title: "Neural Link | Synaptic Recall Trainer 2026",
    description:
      "Test your memory limit in Neural Link. Replicate complex synaptic sequences to overclock your recall capacity.",
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-cyan-200 overflow-x-hidden select-none">
      <Head>
        <title>{currentSeo.title}</title>
        <meta name="description" content={currentSeo.description} />
        {currentSeo.keywords && (
          <meta name="keywords" content={currentSeo.keywords} />
        )}
        {currentSeo.canonical && (
          <link rel="canonical" href={currentSeo.canonical} />
        )}
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </Head>

      {/* --- HERO / GAME ENGINE SECTION (DARK THEME) --- */}
      <section className="bg-[#0F172A] pt-12 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Top Navigation */}
          <nav className="flex items-center justify-between mb-12">
            <Link
              href="/p/games-to-play-when-bored"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              All Systems
            </Link>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500/80">
              Memory Unit-02
            </div>
          </nav>

          {/* Title & Subtitle */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter italic">
              NEURAL <span className="text-cyan-500">LINK</span>
            </h1>
            <p className="text-slate-400 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Overclock your recall capacity. Synchronize with the grid and
              replicate the synaptic sequence.
            </p>
          </div>

          {/* Main Game Container - Responsive & Themed */}
          <div className="relative w-full max-w-5xl mx-auto aspect-[4/5] md:aspect-video bg-[#020617] rounded-[3rem] border-8 border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <NeuralLink />
          </div>
        </div>
      </section>

      {/* --- PROTOCOLS SECTION (DARK BOX ON WHITE) --- */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#11131E] rounded-[3.5rem] p-10 md:p-16 border border-white/5 shadow-2xl mb-20">
            <h3 className="text-3xl font-black text-white mb-12 flex items-center gap-4">
              <span className="text-4xl text-cyan-400">🧬</span>
              <span>Sync Protocols</span>
            </h3>
            <ul className="space-y-10">
              {[
                {
                  title: "Memorize the Sequence",
                  desc: "The grid will flash a specific pattern of nodes. Observe the order carefully; speed increases with every successful link.",
                },
                {
                  title: "Perfect Replication",
                  desc: "Re-engage the nodes in the exact order they appeared. A single mistap severs the neural link and resets the system.",
                },
                {
                  title: "Cognitive Endurance",
                  desc: "As the score climbs, the patterns become longer and more complex. Maintain rhythmic precision to achieve deep-link status.",
                },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-6">
                  <span className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-white text-sm font-bold rounded-full flex items-center justify-center mt-1 shadow-[0_0_10px_rgba(8,145,178,0.4)]">
                    {idx + 1}
                  </span>
                  <div className="text-left">
                    <h4 className="text-white font-bold text-xl mb-2 tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 font-medium text-lg leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* --- ARTICLE SECTION --- */}
          <article className="prose prose-slate lg:prose-xl max-w-none text-slate-700 leading-relaxed space-y-12">
            <div className="text-center mb-20">
              <span className="bg-cyan-100 text-cyan-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                Cognitive Theory
              </span>
              <h2 className="text-4xl md:text-7xl font-black tracking-tight text-slate-950 mt-8 mb-8 leading-tight">
                The Mechanics of <br />
                <span className="text-cyan-600 italic">Working Memory</span>
              </h2>
              <p className="text-xl text-slate-500 font-medium italic">
                &quot;Memory is the treasury and guardian of all things.&quot;
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                1. Visuospatial Sketchpad
              </h3>
              <p>
                Neural Link leverages your{" "}
                <strong>visuospatial sketchpad</strong>—the component of working
                memory responsible for handling visual and spatial information.
                By forcing you to track locations across a 4x4 grid, the game
                builds mental pathways for pattern recognition.
              </p>
              <p>
                Unlike long-term memory, working memory has a limited capacity.
                This game pushes that &quot;buffer&quot; to its absolute limit
                through increasing sequence length and decreasing time
                intervals.
              </p>
            </div>

            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 my-12 text-left">
              <h3 className="text-2xl font-black text-slate-900 mb-4">
                Neuroplasticity & Recall
              </h3>
              <p>
                Regular engagement with pattern-recall tasks is shown to enhance{" "}
                <strong>neuroplasticity</strong>. Your ability to chunk
                information—grouping individual nodes into smaller, memorable
                segments—is the key to reaching high levels in Neural Link.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 my-16 text-left">
              <div className="p-8 bg-cyan-50 rounded-[2rem] border border-cyan-100">
                <h4 className="font-black text-cyan-900 mb-2 uppercase tracking-tight">
                  Visual Processing
                </h4>
                <p className="text-sm leading-relaxed text-slate-700">
                  By level 10, your brain is processing sequences at sub-200ms
                  speeds, requiring pure subconscious intuition.
                </p>
              </div>
              <div className="p-8 bg-slate-900 rounded-[2rem] text-white">
                <h4 className="font-black mb-2 uppercase tracking-tight">
                  The Miller Limit
                </h4>
                <p className="text-sm leading-relaxed opacity-80">
                  Most humans can hold 7 (± 2) items in their working memory.
                  Neural Link is designed to help you break through this
                  threshold.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
