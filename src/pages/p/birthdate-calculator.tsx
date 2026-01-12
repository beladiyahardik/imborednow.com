"use client";
/* eslint-disable react/no-unescaped-entities */
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { format, addDays, isAfter } from "date-fns";

export default function MilestoneCalculator() {
  const [birthdate, setBirthdate] = useState("");
  const [milestones, setMilestones] = useState<
    { days: number; date: Date; formattedDate: string }[]
  >([]);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const milestoneDays = [
    1000, 2000, 3000, 5000, 10000, 12000, 15000, 20000, 25000,
  ];

  const calculateMilestones = () => {
    if (!birthdate) return;
    const birthDate = new Date(birthdate);
    if (isNaN(birthDate.getTime())) return;

    const newMilestones = milestoneDays.map((days) => {
      const milestoneDate = addDays(birthDate, days);
      return {
        days,
        date: milestoneDate,
        formattedDate: format(milestoneDate, "MMMM d, yyyy"),
      };
    });

    setMilestones(newMilestones);
    setShowResults(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateMilestones();
  };

  useEffect(() => {
    if (showResults && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showResults]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-purple-200 pb-20">
      <Head>
        <title>Life Milestone Calculator | imborednow</title>
      </Head>

      {/* --- 1. HERO SECTION (Dark Slate Theme) --- */}
      <section className="relative pt-20 pb-24 px-4 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-purple-600/40 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-xl rounded-full text-purple-300 text-[9px] font-black uppercase tracking-[0.3em] mb-8 border border-white/10">
            🗓️ The Discovery Lab
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.85]">
            YOUR LIFE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
              IN DAYS.
            </span>
          </h1>

          {/* Compact Input Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex flex-col sm:flex-row gap-2 bg-slate-900 p-2 rounded-2xl border border-white/10">
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
                className="flex-grow bg-transparent px-4 py-3 text-white focus:outline-none font-bold"
              />
              <button
                type="submit"
                className="bg-white text-slate-950 px-6 py-3 rounded-xl font-black text-sm hover:bg-yellow-400 transition-all active:scale-95 whitespace-nowrap"
              >
                GO! 🚀
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* --- 2. RESULTS GRID (Bento Style) --- */}
      {showResults && (
        <main
          ref={resultsRef}
          className="max-w-6xl mx-auto px-4 mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-2 md:gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-none">
                Your Major Milestones
              </h2>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
                Based on your birthdate
              </p>
            </div>

            <button
              onClick={() => {
                setShowResults(false);
                setBirthdate("");
              }}
              className="text-[9px] md:text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors pt-2 md:pt-0"
            >
              ✕ Reset Calculator
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {milestones.map((milestone, i) => {
              const isFuture = isAfter(milestone.date, new Date());

              // Dynamic logic for Emojis based on age
              const getMilestoneIcon = (days: number) => {
                if (days <= 2000) return "👶";
                if (days <= 5000) return "🎒";
                if (days <= 9000) return "🎓";
                if (days <= 12000) return "⚡";
                if (days <= 15000) return "🔥";
                return "🚀";
              };

              const colorSet =
                i % 3 === 0
                  ? "from-purple-500 to-pink-500"
                  : i % 3 === 1
                  ? "from-blue-500 to-indigo-500"
                  : "from-emerald-500 to-teal-500";

              return (
                <div
                  key={i}
                  className="group relative h-52 rounded-[2rem] bg-white border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden p-6 flex flex-col justify-between"
                >
                  {/* Floating Interactive Emoji */}
                  <div className="absolute top-4 right-6 text-5xl opacity-20 group-hover:opacity-100 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-700 pointer-events-none">
                    {getMilestoneIcon(milestone.days)}
                  </div>

                  {/* Top: Day Counter Badge */}
                  <div className="flex items-start">
                    <div
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter text-white bg-gradient-to-r ${colorSet} shadow-sm`}
                    >
                      {milestone.days.toLocaleString()} Days
                    </div>
                  </div>

                  {/* Bottom: Coupled Info */}
                  <div className="relative flex flex-col gap-1">
                    <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-none tracking-tight">
                      {milestone.formattedDate}
                    </h3>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            isFuture
                              ? "bg-cyan-400 animate-pulse"
                              : "bg-slate-300"
                          }`}
                        />
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                          {isFuture ? "Locked" : "Unlocked"}
                        </span>
                      </div>

                      {/* Share mini-button */}
                      <button className="p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <span className="text-xs">📤</span>
                      </button>
                    </div>
                  </div>

                  {/* Glass highlight effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* --- 3. DID YOU KNOW (Consistent with Home Lab) --- */}
      <section className="max-w-4xl mx-auto px-4 mt-20">
        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
          <h3 className="text-white font-black text-3xl mb-4 tracking-tighter relative z-10">
            Did you know? 💡
          </h3>
          <p className="text-slate-400 text-lg leading-relaxed relative z-10">
            The average human life lasts about{" "}
            <span className="text-white font-black">28,000 days</span>. That
            means every single day represents roughly{" "}
            <span className="text-yellow-400 font-black">0.003%</span> of your
            entire story. Make it count!
          </p>
        </div>
      </section>
    </div>
  );
}
