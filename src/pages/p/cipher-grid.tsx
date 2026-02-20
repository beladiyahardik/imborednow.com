"use client";
import CipherGrid from "@/components/games/CipherGrid";
import Head from "next/head";
import Link from "next/link";

export default function CipherGridPage({ seo, jsonLd }: any) {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-200 overflow-x-hidden select-none">
      <Head>
        <title>{seo?.title}</title>
        <meta name="description" content={seo?.description} />
        <meta name="keywords" content={seo?.keywords} />
        <link rel="canonical" href={seo?.canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* --- HERO / GAME ENGINE SECTION --- */}
      <section className="bg-[#0F172A] pt-8 md:pt-12 pb-12 md:pb-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Top Navigation */}
          <nav className="flex items-center justify-between mb-8 md:mb-12">
            <Link
              href="/p/games-to-play-when-bored"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-[10px] md:text-sm uppercase tracking-widest"
            >
              <svg
                className="w-3 h-3 md:w-4 md:h-4"
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
              Logic Lab
            </Link>
            <div className="hidden xs:block text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500/80 text-right">
              Neural Training Unit-05
            </div>
          </nav>

          {/* Title & Subtitle */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-7xl font-black text-white mb-3 md:mb-4 tracking-tighter uppercase">
              Cipher <span className="text-indigo-500">Grid</span>
            </h1>
            <p className="text-slate-400 font-medium text-sm md:text-xl max-w-2xl mx-auto px-2">
              The sequence is hidden within the grid. Use logical deduction to
              bypass the security lock.
            </p>
          </div>

          {/* Main Game Container - Fixed for Mobile Viewports */}
          <div className="relative w-full max-w-5xl mx-auto h-[75vh] md:h-[600px] bg-[#11131E] rounded-[2rem] md:rounded-[3rem] border-4 md:border-8 border-white/5 shadow-2xl overflow-hidden">
            <CipherGrid />
          </div>
        </div>
      </section>

      {/* --- HOW TO PLAY SECTION --- */}
      <section className="bg-white py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#11131E] rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-16 border border-white/5 shadow-2xl mb-12 md:mb-20">
            <h3 className="text-xl md:text-3xl font-black text-white mb-8 md:mb-12 flex items-center gap-3 md:gap-4">
              <span className="text-2xl md:text-4xl">🔐</span>
              <span>Decryption Protocols</span>
            </h3>
            <ul className="space-y-8 md:space-y-10">
              {[
                {
                  title: "Input Guess",
                  desc: "Select three unique nodes on the grid to form a sequence. Match the hidden Master Code.",
                },
                {
                  title: "Analyze Feedback",
                  desc: "Check logs. Indigo = Correct spot. White = Correct node, wrong spot.",
                },
                {
                  title: "Iterative Deduction",
                  desc: "Eliminate possibilities based on previous logs before lockout.",
                },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 md:gap-6">
                  <span className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-indigo-600 text-white text-[10px] md:text-sm font-bold rounded-full flex items-center justify-center mt-1">
                    {idx + 1}
                  </span>
                  <div className="text-left">
                    <h4 className="text-white font-bold text-lg md:text-xl mb-1 md:mb-2 tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 font-medium text-sm md:text-lg leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* --- ARTICLE SECTION --- */}
          <article className="prose prose-slate prose-sm md:prose-xl max-w-none text-slate-700 leading-relaxed">
            <div className="text-center mb-12 md:mb-20">
              <span className="bg-indigo-100 text-indigo-600 px-3 py-1 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest">
                Cognitive Logic
              </span>
              <h2 className="text-3xl md:text-7xl font-black tracking-tight text-slate-950 mt-6 md:mt-8 mb-4 md:mb-8 leading-tight">
                The Power of <br />
                <span className="text-indigo-600 italic">
                  Deductive Thinking
                </span>
              </h2>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter">
                1. Eliminative Logic
              </h3>
              <p>
                Cipher Grid is based on classical Mastermind logic, which tests
                the brain&apos;s ability to perform{" "}
                <strong>Eliminative Deduction</strong>. Instead of guessing
                randomly, you are building a logical proof.
              </p>
            </div>

            <div className="bg-slate-50 p-6 md:p-10 rounded-[1.5rem] md:rounded-[3rem] border border-slate-100 my-8 md:my-12 text-left">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4">
                Working Memory Load
              </h3>
              <p className="text-sm md:text-lg">
                This game engages the <strong>Central Executive</strong>. You
                have to hold the results of your last three logs in your head
                while simultaneously planning your next move.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 my-12 md:my-16 text-left">
              <div className="p-6 md:p-8 bg-indigo-50 rounded-[1.5rem] md:rounded-[2rem] border border-indigo-100">
                <h4 className="font-black text-indigo-900 mb-2 uppercase tracking-tight text-sm md:text-base">
                  Pattern Matching
                </h4>
                <p className="text-xs md:text-sm leading-relaxed text-indigo-900/70">
                  The human brain is a pattern-matching machine. Cipher Grid
                  forces you to find the underlying structure.
                </p>
              </div>
              <div className="p-6 md:p-8 bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] text-white">
                <h4 className="font-black mb-2 uppercase tracking-tight text-sm md:text-base">
                  Decision Fatigue
                </h4>
                <p className="text-xs md:text-sm leading-relaxed opacity-70">
                  By limiting attempts, the game simulates high-pressure
                  environments where every decision counts.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
