/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import WordLinkHero from "@/components/games/WordLinkHero";

// --- LEVEL DATA ---
const LEVEL_DATA = {
  id: "level_platinum_01",
  letters: ["P", "L", "A", "T", "I", "N", "U", "M"],
  words: [
    "PLATINUM",
    "PLIANT",
    "ULTIMA",
    "PLANT",
    "PLAIN",
    "PAINT",
    "INPUT",
    "UNIT",
    "MAIL",
    "PLAN",
    "ALUM",
    "LUMP",
    "TAP",
    "NIL",
  ],
};

export default function WordLinkPage({ seo, jsonLd }: any) {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-200 overflow-x-hidden select-none">
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href={seo.canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* --- HERO / GAME SECTION --- */}
      <WordLinkHero />

      {/* --- HOW TO PLAY SECTION (ALIGNMENT FIXED) --- */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#11131E] rounded-[3.5rem] p-10 md:p-16 border border-white/5 shadow-2xl mb-20">
            <h3 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
              <span className="text-4xl">🎮</span>
              <span>How to Play</span>
            </h3>
            <ul className="space-y-8">
              {[
                "Analyze the floating letters on the circular Lexical Wheel.",
                "Drag your finger or mouse to connect letters and form valid words.",
                "Correct words will automatically populate the encrypted grid above.",
                "Stuck on a pattern? Use the 🔄 Shuffle button to reorder the wheel.",
                "Earn hints 💡 to reveal specific letters within the hidden word slots.",
                "Unlock all hidden lexical strings to complete the protocol mission.",
              ].map((text, idx) => (
                <li key={idx} className="flex items-center gap-6 text-left">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <p className="text-slate-300 font-medium text-lg leading-relaxed m-0">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* --- ARTICLE SECTION --- */}
          <article className="space-y-16">
            <div className="text-center">
              <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                Cognitive Lab
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-950 mt-8 mb-6 leading-tight">
                Lexical Patterns: <br />
                <span className="text-indigo-600 italic font-black">
                  Mastering the Word Link
                </span>
              </h2>
            </div>

            <div className="space-y-12 text-lg text-slate-700 leading-relaxed text-left">
              <div className="bg-slate-50 p-10 md:p-16 rounded-[3rem] border border-slate-100">
                <h3 className="text-3xl font-black text-slate-900 mb-6">
                  The Psychology of Play
                </h3>
                <p>
                  Finding a hidden word triggers a release of dopamine in the
                  brain's reward center. Word Link is designed as a "contained
                  challenge" - a puzzle with a logical solution that provides
                  order in a chaotic world.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900">
                    The Suffix Sweep
                  </h3>
                  <p>
                    Master strategy involves identifying common endings like
                    -ING or -ED first to reveal root words hidden in the
                    scramble.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900">
                    Pattern Recognition
                  </h3>
                  <p>
                    Rotate the wheel to break "functional fixedness," a mental
                    block where you keep seeing the same incorrect patterns.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-12 rounded-[3rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full" />
                <h3 className="text-2xl font-black mb-6">
                  Pro Strategy: Vowel Pivot
                </h3>
                <p className="text-slate-400 italic">
                  "Focus on the vowels first. They are the structural anchors of
                  every word in the grid."
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="bg-white/10 px-4 py-2 rounded-lg font-mono text-xs">
                    Vowel-First
                  </div>
                  <div className="bg-white/10 px-4 py-2 rounded-lg font-mono text-xs">
                    Shuffle Tech
                  </div>
                  <div className="bg-white/10 px-4 py-2 rounded-lg font-mono text-xs">
                    Suffix Hunt
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <style jsx global>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-8px);
          }
          75% {
            transform: translateX(8px);
          }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps() {
  const seo = {
    title: "Word Link: Lexical Scramble Challenge | ImBoredNow",
    description:
      "Connect letters and solve lexical puzzles with Word Link. A minimalist word game to boost your vocabulary and logic skills.",
    keywords:
      "word link, word search, word connect, vocabulary game, logic puzzle, brain training",
    canonical: "https://www.imborednow.com/p/word-link",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Word Link Game",
    url: "https://www.imborednow.com/p/word-link",
    applicationCategory: "GameApplication",
  };

  return {
    props: {
      seo,
      jsonLd,
    },
  };
}
