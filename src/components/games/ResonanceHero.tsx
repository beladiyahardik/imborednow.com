import React, { useState, useEffect } from "react";

interface WaveParams {
  frequency: number;
  amplitude: number;
  phase: number;
}

const Slider = ({ label, value, min, max, step, onChange }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center px-1 text-left">
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
        {label}
      </span>
      <span className="text-xs font-bold text-white">{value}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1 appearance-none rounded-full bg-slate-800 accent-cyan-500 cursor-pointer"
    />
  </div>
);

export default function ResonanceHero() {
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

  useEffect(() => {
    const freqMatch = user.frequency === target.frequency;
    const ampMatch = Math.abs(user.amplitude - target.amplitude) < 5;
    const phaseMatch = Math.abs(user.phase - target.phase) < 10;
    if (freqMatch && ampMatch && phaseMatch) setIsSolved(true);
  }, [user, target]);

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
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center p-6 bg-slate-950">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-transparent" />
      </div>

      <main className="relative z-10 max-w-6xl w-full mx-auto flex flex-col lg:grid lg:grid-cols-[300px_1fr_300px] items-center gap-12">
        <div className="hidden lg:block space-y-6 text-left">
          <h2 className="text-white font-black italic uppercase tracking-widest text-sm border-l-4 border-cyan-500 pl-4">
            Signal Analysis
          </h2>
          <div className="space-y-4 text-xs font-medium text-slate-400">
            <p>
              <span className="text-cyan-500 font-bold">FREQ:</span> Cycles per
              second.
            </p>
            <p>
              <span className="text-cyan-500 font-bold">AMP:</span> Signal
              strength.
            </p>
            <p>
              <span className="text-cyan-500 font-bold">PHASE:</span> Horizontal
              alignment.
            </p>
          </div>
        </div>

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
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <svg
              viewBox="0 -100 400 200"
              className="w-full h-full px-4 overflow-visible"
            >
              <path
                d={generatePath(target)}
                fill="none"
                className="stroke-slate-700"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d={generatePath(user)}
                fill="none"
                className={`${isSolved ? "stroke-cyan-400" : "stroke-cyan-500"} transition-all duration-300`}
                strokeWidth={isSolved ? "5" : "3"}
                style={{
                  filter: isSolved ? "drop-shadow(0 0 12px #22d3ee)" : "none",
                }}
              />
            </svg>
          </div>

          <div className="mt-12 w-full max-w-md space-y-8">
            <Slider
              label="Frequency"
              value={user.frequency}
              min={1}
              max={5}
              step={1}
              onChange={(v: number) => setUser({ ...user, frequency: v })}
            />
            <Slider
              label="Amplitude"
              value={user.amplitude}
              min={10}
              max={80}
              step={1}
              onChange={(v: number) => setUser({ ...user, amplitude: v })}
            />
            <Slider
              label="Phase"
              value={user.phase}
              min={0}
              max={360}
              step={5}
              onChange={(v: number) => setUser({ ...user, phase: v })}
            />
          </div>
        </div>

        <div className="w-full lg:w-auto space-y-4">
          <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] text-left">
            <p className="text-[10px] font-black uppercase text-slate-500 mb-1">
              Coherence
            </p>
            <h3 className="text-4xl font-black italic text-white">
              {isSolved ? "100" : Math.floor(Math.random() * 20)}%
            </h3>
          </div>
        </div>
      </main>

      {isSolved && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-[4rem] p-12 text-center max-w-sm w-full shadow-2xl">
            <h2 className="text-5xl font-black text-cyan-500 uppercase italic mb-2">
              In Sync
            </h2>
            <p className="text-slate-500 font-bold mb-10 tracking-widest uppercase text-xs">
              Harmonic Resonance Achieved
            </p>
            <button
              onClick={generateLevel}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-cyan-500 transition-all shadow-xl"
            >
              Next Frequency
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
