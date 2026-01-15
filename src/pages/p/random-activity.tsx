/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";

interface TWebsite {
  name: string;
  url: string;
  description: string;
  color: string;
}

export default function RandomWebsiteMachine() {
  const [currentSite, setCurrentSite] = useState<TWebsite | null>(null);
  const [loading, setLoading] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  
  const websites: TWebsite[] = [
    { name: "The Useless Web", url: "https://theuselessweb.com/", description: "The classic gateway to the weird web.", color: "from-purple-600 to-blue-600" },
    { name: "Pointer Pointer", url: "https://pointerpointer.com/", description: "A photo that points exactly where your mouse is.", color: "from-slate-800 to-black" },
    { name: "Hacker Typer", url: "https://hackertyper.com/", description: "Pretend to be a master hacker just by typing.", color: "from-emerald-600 to-green-900" },
    { name: "Zoom Quilt", url: "https://zoomquilt.org/", description: "An infinite zooming piece of surreal art.", color: "from-orange-500 to-rose-500" },
    { name: "Window Swap", url: "https://www.window-swap.com/", description: "Look out someone else's window somewhere in the world.", color: "from-blue-400 to-indigo-600" },
    { name: "Silk", url: "http://weavesilk.com/", description: "Create interactive generative art with your mouse.", color: "from-cyan-500 to-blue-500" },
    { name: "Paper Plane", url: "https://paperplanes.world/", description: "Throw paper planes around the world.", color: "from-sky-400 to-blue-300" },
    { name: "Quick Draw", url: "https://quickdraw.withgoogle.com/", description: "Can a neural network recognize your doodles?", color: "from-yellow-400 to-orange-500" },
  ];

  const getRandomWebsite = () => {
    setLoading(true);
    setIframeLoading(true);
    
    setTimeout(() => {
      const filtered = websites.filter(site => site.url !== currentSite?.url);
      const selected = filtered[Math.floor(Math.random() * filtered.length)];
      setCurrentSite(selected);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  useEffect(() => {
    getRandomWebsite();
  }, []);

  return (
    <div className="h-screen bg-slate-950 font-sans overflow-hidden flex flex-col">
      <Head>
        <title>Random Site Machine | ImBoredNow</title>
      </Head>

      {/* --- TOP BAR --- */}
      <header className="flex-none bg-slate-900 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
          </div>
          <Link href="/articles">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors cursor-pointer">
              ← Exit Wormhole
            </span>
          </Link>
        </div>

        <div className="hidden md:flex bg-black/40 px-6 py-1.5 rounded-full border border-white/5 text-[10px] font-mono text-blue-400/80 tracking-tight w-1/3 justify-center">
          {loading ? "ESTABLISHING_LINK..." : currentSite?.url}
        </div>

        <div className="text-[10px] font-black text-slate-500 uppercase">
          {currentSite?.name || "Loading..."}
        </div>
      </header>

      {/* --- MAIN IFRAME AREA --- */}
      <main className="flex-grow relative bg-slate-950">
        {(loading || iframeLoading) && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border-2 border-red-600/20 rounded-full" />
              <div className="absolute inset-0 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="mt-4 text-[9px] font-black text-red-500 uppercase tracking-[0.4em] animate-pulse">
              Teleporting...
            </p>
          </div>
        )}
        
        {currentSite && (
          <iframe
            src={currentSite.url}
            className="w-full h-full border-none"
            onLoad={() => setIframeLoading(false)}
            sandbox="allow-forms allow-scripts allow-same-origin"
          />
        )}
      </main>

      {/* --- STICKY ACTION BAR --- */}
      <footer className="flex-none p-4 md:p-6 bg-gradient-to-t from-black via-black/80 to-transparent fixed bottom-0 left-0 w-full z-[100]">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          
          <div className="flex-grow bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 p-3 flex items-center gap-4 shadow-2xl">
             <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentSite?.color} flex-none flex items-center justify-center text-lg`}>
                ✨
             </div>
             <div className="overflow-hidden">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Current Quest</p>
                <p className="text-white font-bold text-sm truncate uppercase tracking-tighter">{currentSite?.name}</p>
             </div>
          </div>

          <button
            onClick={getRandomWebsite}
            disabled={loading}
            className="flex-none h-16 px-8 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-90 shadow-[0_0_40px_rgba(220,38,38,0.4)] disabled:opacity-50"
          >
            {loading ? "..." : "Next Site 🔴"}
          </button>

        </div>
      </footer>
    </div>
  );
}