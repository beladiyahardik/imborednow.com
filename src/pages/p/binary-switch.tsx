"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";

export default function BinarySwitchGame() {
  const [target, setTarget] = useState(0);
  const [bits, setBits] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "OVER">("IDLE");

  const bitValues = [128, 64, 32, 16, 8, 4, 2, 1];
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

  const currentTotal = bits.reduce((acc, bit, idx) => acc + bit * bitValues[idx], 0);

  useEffect(() => {
    if (gameState === "PLAYING" && currentTotal === target) {
      setScore((s) => s + 1);
      setTarget(generateTarget());
      setBits(Array(8).fill(0));
      setTimeLeft((t) => Math.min(t + 5, 60));
    }
  }, [currentTotal, target, gameState]);

  useEffect(() => {
    let timer: any;
    if (gameState === "PLAYING" && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setGameState("OVER");
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-red-200 overflow-x-hidden">
      <Head>
        <title>Binary Switch | Logic Lab</title>
      </Head>

      {/* --- HERO / GAME SECTION (Original Compact Size) --- */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-slate-950 to-transparent" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto w-full">
          {/* Header */}
          <div className="flex justify-between items-end mb-8 px-2">
            <div>
              <h1 className="text-3xl font-black italic uppercase text-white tracking-tighter leading-none">
                Binary<span className="text-rose-500">Switch</span>
              </h1>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-2">Protocol: Base-2</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-slate-500 uppercase">Score</p>
              <p className="text-2xl font-black text-white leading-none">{score}</p>
            </div>
          </div>

          {/* MAIN COMPACT CARD */}
          <div className="bg-white rounded-[3rem] p-2 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 overflow-hidden relative">
              {gameState === "IDLE" ? (
                <div className="text-center py-12">
                  <p className="text-slate-400 mb-8 font-medium">Ready to convert decimal to binary?</p>
                  <button onClick={startGame} className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-xl">
                    Initialize
                  </button>
                </div>
              ) : gameState === "OVER" ? (
                <div className="text-center py-10">
                  <h2 className="text-5xl font-black text-rose-500 uppercase italic mb-2">Shutdown</h2>
                  <p className="text-slate-500 font-bold mb-8 tracking-widest uppercase text-sm">Final Score: {score}</p>
                  <button onClick={startGame} className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
                    Reboot
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-10">
                    <div className="bg-white/5 px-6 py-4 rounded-2xl border border-white/10">
                      <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Target</p>
                      <p className="text-5xl font-black text-white">{target}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Time</p>
                      <p className={`text-4xl font-black ${timeLeft < 10 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>
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
                        <span className={`text-2xl font-black mb-0.5 transition-colors ${bit === 1 ? "text-rose-500" : "text-slate-800"}`}>
                          {bit}
                        </span>
                        <span className="text-[8px] font-black text-slate-500 opacity-50 uppercase tracking-tighter">
                          {bitValues[idx]}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current Sum</p>
                    <p className="text-2xl font-black text-white">{currentTotal}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW TO PLAY (Red Button Style) --- */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#11131E] rounded-[3.5rem] p-10 md:p-16 border border-white/5 shadow-2xl mb-20">
            <h3 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
              <span className="text-4xl">🎮</span>
              <span>How to Play</span>
            </h3>
            <ul className="space-y-8">
              {[
                "Observe the Target Decimal inside the play area.",
                "Each switch represents a 'Bit' with values from 128 down to 1.",
                "Toggle switches ON (1) to add their value to your Current Sum.",
                "Match the Current Sum to the Target exactly to score a point.",
                "Each success adds +5 seconds to your mission clock.",
                "The game ends when time runs out. Speed and logic are key!"
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-6">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#E11D48] text-white text-sm font-bold rounded-full flex items-center justify-center mt-1">
                    {idx + 1}
                  </span>
                  <p className="text-slate-300 font-medium text-lg leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* --- ARTICLE SECTION (White Theme) --- */}
          <article className="space-y-16">
            <div className="text-center">
              <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                Educational Tech
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-950 mt-8 mb-6 leading-tight">
                Understanding Binary Code: <br />
                <span className="text-red-600 italic font-black">How Computers Speak</span>
              </h2>
            </div>

            <div className="space-y-12 text-lg text-slate-700 leading-relaxed">
              <div className="bg-slate-50 p-10 md:p-16 rounded-[3rem] border border-slate-100">
                <h3 className="text-3xl font-black text-slate-900 mb-6">The Language of 1s and 0s</h3>
                <p>
                  In today’s digital world, almost everything we use - videos, messages, mobile apps, and websites - relies on data. At its core, this data is stored and processed using a simple system with only two values: <strong>1 and 0</strong>. This system is known as binary code, and it forms the foundation of modern computing.
                </p>
                
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900">The 8-Bit Standard</h3>
                  <p>In computing, a group of 8 bits is called a <strong>byte</strong>. A single byte can represent numbers from 0 to 255. This became a global standard because it balances efficiency and flexibility in data storage.</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900">Logical Reasoning</h3>
                  <p>Practicing binary logic improves pattern recognition. It forces the brain to understand how numbers are structured rather than relying on memorization.</p>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-12 rounded-[3rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-3xl rounded-full" />
                <h3 className="text-2xl font-black mb-6">Pro Strategy: Subtractive Logic</h3>
                <p className="text-slate-400 italic">"Instead of adding values one by one, start with the largest possible number and work downward."</p>
                <div className="mt-8 flex gap-4">
                  <div className="bg-white/10 px-4 py-2 rounded-lg font-mono text-sm">Target: 160</div>
                  <div className="bg-white/10 px-4 py-2 rounded-lg font-mono text-sm">128 (ON)</div>
                  <div className="bg-white/10 px-4 py-2 rounded-lg font-mono text-sm">32 (ON)</div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}