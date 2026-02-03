"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";

// --- TYPES ---
interface WaveParams {
  frequency: number;
  amplitude: number;
  phase: number;
}

export default function ResonancePage() {
  const [target, setTarget] = useState<WaveParams>({
    frequency: 2,
    amplitude: 50,
    phase: 0,
  });
  const [user, setUser] = useState<WaveParams>({
    frequency: 1,
    amplitude: 20,
    phase: 45,
  });
  const [isSolved, setIsSolved] = useState(false);

  // Initialize a random target wave
  const generateLevel = () => {
    setTarget({
      frequency: Math.floor(Math.random() * 4) + 1,
      amplitude: Math.floor(Math.random() * 40) + 30,
      phase: Math.floor(Math.random() * 180),
    });
    setIsSolved(false);
  };

  useEffect(() => {
    generateLevel();
  }, []);

  // Check for "Resonance" (Match)
  useEffect(() => {
    const freqMatch = user.frequency === target.frequency;
    const ampMatch = Math.abs(user.amplitude - target.amplitude) < 5;
    const phaseMatch = Math.abs(user.phase - target.phase) < 10;

    if (freqMatch && ampMatch && phaseMatch) {
      setIsSolved(true);
    }
  }, [user, target]);

  // Generate SVG Path for waves
  const generatePath = (params: WaveParams) => {
    const points = [];
    for (let x = 0; x <= 400; x += 2) {
      const angle =
        (x / 400) * Math.PI * 2 * params.frequency +
        (params.phase * Math.PI) / 180;
      const y = params.amplitude * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-cyan-200 overflow-x-hidden select-none">
      <Head>
        <title>Resonance | Logic Lab</title>
      </Head>

      {/* --- HERO / GAME SECTION --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent">
        <main className="max-w-6xl w-full mx-auto flex flex-col lg:grid lg:grid-cols-[300px_1fr_300px] items-center gap-12">
          
          {/* LEFT: SPECTRUM DATA */}
          <div className="hidden lg:block space-y-6 text-left">
            <h2 className="text-white font-black italic uppercase tracking-widest text-sm border-l-4 border-cyan-500 pl-4">
              Signal Analysis
            </h2>
            <div className="space-y-4 text-xs font-medium text-slate-400">
              <p><span className="text-cyan-500 font-bold">FREQ:</span> Oscillation Speed.</p>
              <p><span className="text-cyan-500 font-bold">AMP:</span> Peak Energy.</p>
              <p><span className="text-cyan-500 font-bold">PHASE:</span> Temporal Shift.</p>
            </div>
          </div>

          {/* CENTER: OSCILLOSCOPE */}
          <div className="flex flex-col items-center">
            <div className="text-center mb-10">
              <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
                Reson<span className="text-cyan-500">ance</span>
              </h1>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-2 italic">
                Status: {isSolved ? "SIGNAL LOCKED" : "SYNCHRONIZING..."}
              </p>
            </div>

            <div className="relative w-full max-w-[500px] aspect-[16/9] bg-slate-900/50 rounded-[2.5rem] border border-white/10 backdrop-blur-xl flex items-center justify-center overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              <svg viewBox="0 -100 400 200" className="w-full h-full px-4 overflow-visible">
                <path d={generatePath(target)} fill="none" className="stroke-slate-700" strokeWidth="2" strokeDasharray="4 4" />
                <path d={generatePath(user)} fill="none" className={`${isSolved ? "stroke-cyan-400" : "stroke-cyan-500"} transition-all duration-300`} strokeWidth={isSolved ? "5" : "3"} style={{ filter: isSolved ? "drop-shadow(0 0 12px #22d3ee)" : "none" }} />
              </svg>
            </div>

            <div className="mt-12 w-full max-w-md space-y-8">
              <Slider label="Frequency" value={user.frequency} min={1} max={5} step={1} onChange={(v: number) => setUser({ ...user, frequency: v })} />
              <Slider label="Amplitude" value={user.amplitude} min={10} max={80} step={1} onChange={(v: number) => setUser({ ...user, amplitude: v })} />
              <Slider label="Phase" value={user.phase} min={0} max={360} step={5} onChange={(v: number) => setUser({ ...user, phase: v })} />
            </div>
          </div>

          {/* RIGHT: HARMONICS */}
          <div className="w-full lg:w-auto space-y-4">
            <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem]">
              <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Coherence</p>
              <h3 className="text-4xl font-black italic text-white text-left">{isSolved ? "100" : Math.floor(Math.random() * 20)}%</h3>
            </div>
          </div>
        </main>
      </section>

      {/* --- HOW TO PLAY SECTION (UPDATED THEME) --- */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#11131E] rounded-[3.5rem] p-10 md:p-16 border border-white/5 shadow-2xl mb-20">
            <h3 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
              <span className="text-4xl">🎮</span>
              <span>How to Play</span>
            </h3>
            <ul className="space-y-8">
              {[
                "Analyze the ghost wave (dashed line) on the oscilloscope grid.",
                "Identify the frequency, height, and position of the target signal.",
                "Adjust the Frequency slider to match the speed of the oscillation.",
                "Modify the Amplitude to match the peak-to-peak height of the wave.",
                "Fine-tune the Phase slider to shift your wave into perfect alignment.",
                "Achieve 100% Coherence to lock the signal and advance to the next level!"
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-6 text-left">
                  <span className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white text-sm font-bold rounded-full flex items-center justify-center mt-1">
                    {idx + 1}
                  </span>
                  <p className="text-slate-300 font-medium text-lg leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* --- ARTICLE SECTION --- */}
          <article className="space-y-16">
            <div className="text-center">
              <span className="bg-cyan-100 text-cyan-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                Harmonic Analysis
              </span>
              <h2 className="text-4xl md:text-7xl font-black tracking-tight text-slate-950 mt-8 mb-8 leading-tight">
                Finding Your Frequency: <br />
                <span className="text-cyan-600 italic">The Science of Synchronicity</span>
              </h2>
              <p className="text-xl text-slate-500 font-medium italic">
                "Everything in life is a vibration. When you match the rhythm, the world opens up."
              </p>
            </div>

            <div className="prose prose-slate lg:prose-xl max-w-none text-slate-700 leading-relaxed space-y-12">
              <div className="space-y-6">
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">1. The Invisible Symphony</h3>
                <p>
                  Modern life is a sea of waves. Radio, Wi-Fi, and cellular data are all vibrating through you right now. 
                  In **Resonance**, you’re doing exactly what a classic radio dial does—picking one specific &quot;song&quot; 
                  out of that deafening static.
                </p>
              </div>

              <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 my-12 text-left">
                <h3 className="text-2xl font-black text-slate-900 mb-4">The Swing Effect</h3>
                <p>
                  Resonance is like pushing a child on a swing. Timed perfectly, almost no effort sends them soaring. 
                  This is the art of adding energy at the precise moment to create a massive result.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 my-16 text-left">
                <div className="p-8 bg-cyan-50 rounded-[2rem] border border-cyan-100">
                  <h4 className="font-black text-cyan-900 mb-2 uppercase tracking-tight">Frequency</h4>
                  <p className="text-sm leading-relaxed">The heartbeat of the signal. If you&apos;re too slow or too fast, you&apos;ll never catch the rhythm.</p>
                </div>
                <div className="p-8 bg-slate-900 rounded-[2rem] text-white">
                  <h4 className="font-black mb-2 uppercase tracking-tight">Amplitude</h4>
                  <p className="text-sm leading-relaxed opacity-80">The volume and energy. It dictates how much space your signal occupies.</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* SUCCESS MODAL */}
      {isSolved && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-[4rem] p-12 text-center max-w-sm w-full shadow-2xl animate-in zoom-in duration-500">
            <h2 className="text-5xl font-black text-cyan-500 uppercase italic mb-2">In Sync</h2>
            <p className="text-slate-500 font-bold mb-10 tracking-widest uppercase text-xs">Harmonic Resonance Achieved</p>
            <button onClick={generateLevel} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-cyan-500 transition-all shadow-xl">
              Next Frequency
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- SLIDER COMPONENT ---
function Slider({ label, value, min, max, step, onChange }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-1 text-left">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
        <span className="text-xs font-bold text-white">{value}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 appearance-none rounded-full bg-slate-800 accent-cyan-500 cursor-pointer"
      />
    </div>
  );
}