/* eslint-disable react/no-unescaped-entities */
import MoodPixelArtBoard from "@/components/MoodPixelArtBoard";
import Head from "next/head";
import React from "react";

export default function PixelArtPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Mood Pixel Art Board",
    description: "An interactive web-based pixel art maker...",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans overflow-x-hidden">
      <Head>
        <title>Mood Pixel Art Board: Create 8-Bit Art Based on Your Vibe</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      {/* --- SECTION 1: THE GAME AREA (FIXED RESPONSIVENESS) --- */}
      <section className="w-full bg-slate-100 py-8 md:py-16 px-2 flex flex-col items-center justify-center overflow-hidden">
        <div className="max-w-full overflow-hidden flex flex-col items-center">
          
          {/* This wrapper is the key. 
              On small screens (below 640px), we use a CSS scale 
              to ensure the game fits the screen width. 
          */}
          <div className="transform-gpu scale-[0.75] sm:scale-90 md:scale-100 origin-top flex justify-center w-full">
            <div className="bg-white p-2 rounded-3xl shadow-2xl border border-slate-200">
              <MoodPixelArtBoard />
            </div>
          </div>

          {/* <p className="mt-[-2rem] md:mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">
            ↑ Scroll & Tap to Draw ↑
          </p> */}
        </div>
      </section>

      {/* --- SECTION 2: THE DISCOVERY BENTO (REDESIGNED UI) --- */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-24">
        
        {/* HEADER BENTO */}
        <header className="mb-8 md:mb-12 text-center bg-slate-950 p-8 md:p-20 rounded-[3rem] md:rounded-[4rem] text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-[100px]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-7xl font-black mb-6 tracking-tighter leading-tight uppercase italic">
              Unleash Your Inner Artist with the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Mood Pixel Board
              </span>
            </h2>
            <p className="text-sm md:text-2xl text-slate-400 font-bold uppercase tracking-widest italic leading-tight">
              "Where every pixel tells a story."
            </p>
          </div>
        </header>

        {/* BENTO GRID SYSTEM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Why Pixel Art (Span 2) */}
          <section className="md:col-span-2 bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] mb-6 italic">The Concept</h3>
            <h4 className="text-2xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight italic">Why Pixel Art?</h4>
            <div className="space-y-4 text-slate-600 font-medium leading-relaxed">
              <p>
                In an era of high-definition graphics, there is something deeply satisfying about the simplicity of <strong>pixel art</strong>. It takes us back to the golden age of retro gaming while offering a therapeutic way to pass the time.
              </p>
              <p>
                Whether you are feeling high-energy and "Vibrant" or calm and "Pastel," our <strong>Mood Pixel Art Board</strong> adapts to your mental state.
              </p>
            </div>
          </section>

          {/* Card 2: Pro Tip (Dark Mode) */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-10 rounded-[3rem] text-white flex flex-col justify-center shadow-xl">
            <h4 className="text-[10px] font-black text-purple-200 uppercase tracking-[0.3em] mb-6 italic">Pro Tip:</h4>
            <p className="text-xl font-black italic leading-tight mb-4">
              "Try the 'Random' tool if you're facing artist's block. It sparks mood-consistent ideas instantly!"
            </p>
            <div className="w-12 h-1 bg-white/20 rounded-full" />
          </div>

          {/* Card 3: Features (Iconic) */}
          <section className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-between">
            <h4 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tighter italic">Features:</h4>
            <ul className="space-y-5">
              {[
                { t: "Mood Palettes", d: "Fire, Ocean, & Midnight vibes." },
                { t: "Precision Grid", d: "Optimized 32×32 canvas." },
                { t: "Instant Save", d: "Download as PNG in one click." }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-1.5 bg-purple-500 rounded-full" />
                  <div className="text-sm">
                    <strong className="text-slate-900 block font-black uppercase tracking-tight">{item.t}</strong>
                    <span className="text-slate-400 font-bold">{item.d}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Card 4: Getting Started (Yellow Accent) */}
          <section className="md:col-span-2 bg-yellow-400 p-8 md:p-12 rounded-[3rem] text-slate-900 shadow-lg">
            <h4 className="text-2xl font-black mb-8 uppercase italic tracking-tighter">How to Get Started</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "1. Choose Your Mood",
                "2. Pick Your Tool",
                "3. Draw Your Vision",
                "4. Export Your Art"
              ].map((step, i) => (
                <div key={i} className="bg-white/30 backdrop-blur-md p-4 rounded-2xl font-black text-sm uppercase italic border border-white/20">
                  {step}
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* FOOTER */}
        <footer className="mt-20 text-center pt-12 border-t border-slate-200">
          <p className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">
            Ready to start creating?
          </p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mt-2">
            Scroll up and let your mood guide your mouse!
          </p>
        </footer>
      </article>
    </div>
  );
}