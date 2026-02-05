import React, { useState, useEffect } from "react";

const BIT_VALUES = [128, 64, 32, 16, 8, 4, 2, 1];

export default function BinarySwitchHero() {
  const [target, setTarget] = useState(0);
  const [bits, setBits] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "OVER">(
    "IDLE",
  );

  const generateTarget = () => Math.floor(Math.random() * 255) + 1;

  const startGame = () => {
    setTarget(generateTarget());
    setBits(Array(8).fill(0));
    setScore(0);
    setTimeLeft(30);
    setGameState("PLAYING");
  };

  const toggleBit = (index: number) => {
    if (gameState !== "PLAYING") return;
    const newBits = [...bits];
    newBits[index] = newBits[index] === 0 ? 1 : 0;
    setBits(newBits);
  };

  const currentTotal = bits.reduce(
    (acc, bit, idx) => acc + bit * BIT_VALUES[idx],
    0,
  );

  useEffect(() => {
    if (gameState === "PLAYING" && currentTotal === target) {
      setScore((s) => s + 1);
      setTarget(generateTarget());
      setBits(Array(8).fill(0));
      setTimeLeft((t) => Math.min(t + 5, 60));
    }
  }, [currentTotal, target, gameState]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "PLAYING" && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setGameState("OVER");
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 bg-slate-950">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-slate-950 to-transparent" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto w-full">
        <div className="flex justify-between items-end mb-8 px-2">
          <div className="text-left">
            <h1 className="text-3xl font-black italic uppercase text-white tracking-tighter leading-none">
              Binary<span className="text-rose-500">Switch</span>
            </h1>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-2 text-left">
              Protocol: Base-2
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black text-slate-500 uppercase">
              Score
            </p>
            <p className="text-2xl font-black text-white leading-none">
              {score}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-2 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 overflow-hidden relative">
            {gameState === "IDLE" ? (
              <div className="text-center py-12">
                <p className="text-slate-400 mb-8 font-medium">
                  Ready to convert decimal to binary?
                </p>
                <button
                  onClick={startGame}
                  className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-xl"
                >
                  Initialize
                </button>
              </div>
            ) : gameState === "OVER" ? (
              <div className="text-center py-10">
                <h2 className="text-5xl font-black text-rose-500 uppercase italic mb-2">
                  Shutdown
                </h2>
                <p className="text-slate-500 font-bold mb-8 tracking-widest uppercase text-sm">
                  Final Score: {score}
                </p>
                <button
                  onClick={startGame}
                  className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all"
                >
                  Reboot
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-10">
                  <div className="bg-white/5 px-6 py-4 rounded-2xl border border-white/10 text-left">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">
                      Target
                    </p>
                    <p className="text-5xl font-black text-white">{target}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">
                      Time
                    </p>
                    <p
                      className={`text-4xl font-black ${timeLeft < 10 ? "text-rose-500 animate-pulse" : "text-emerald-400"}`}
                    >
                      {timeLeft}s
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-10">
                  {bits.map((bit, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleBit(idx)}
                      className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                        bit === 1
                          ? "bg-rose-500/10 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                          : "bg-white/5 border-white/10 text-slate-700 hover:border-white/20"
                      }`}
                    >
                      <span
                        className={`text-2xl font-black mb-0.5 transition-colors ${bit === 1 ? "text-rose-500" : "text-slate-400"}`}
                      >
                        {bit}
                      </span>
                      <span className="text-[8px] font-black text-slate-500 opacity-50 uppercase tracking-tighter">
                        {BIT_VALUES[idx]}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Current Sum
                  </p>
                  <p className="text-2xl font-black text-white">
                    {currentTotal}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
