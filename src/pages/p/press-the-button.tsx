import { useState, useEffect } from "react";
import Head from "next/head";

// --- Types ---
interface Scenario {
  id: number;
  benefit: string;
  drawback: string;
}

interface VoteStats {
  yes_count: number;
  no_count: number;
}

export default function PressTheButton() {
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [stats, setStats] = useState<VoteStats | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_BASE = "https://belbytes.com/APIs/imborednow";

  useEffect(() => {
    fetchNewScenario();
  }, []);

  const fetchNewScenario = async () => {
    setLoading(true);
    setHasVoted(false);
    setStats(null);
    try {
      const res = await fetch(`${API_BASE}/get_scenario.php`);
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setScenario(data);
    } catch (err) {
      console.error("Failed to fetch scenario:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (choice: "yes" | "no") => {
    if (!scenario || hasVoted) return;
    try {
      const res = await fetch(`${API_BASE}/vote.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: scenario.id, choice }),
      });
      const data = await res.json();
      if (data.success) {
        setStats({ yes_count: data.yes_count, no_count: data.no_count });
        setHasVoted(true);
      }
    } catch (err) {
      console.error("Vote failed:", err);
    }
  };

  const total = (stats?.yes_count || 0) + (stats?.no_count || 0);
  const yesPercent =
    total > 0 ? Math.round((stats!.yes_count / total) * 100) : 0;
  const noPercent = total > 0 ? 100 - yesPercent : 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-red-200">
      <Head>
        <title>
          Red Button Game: Will You Press This Button? | Hit It Now!
        </title>
        <meta
          name="description"
          content="Face hilarious dilemmas in the ultimate red button hit the button game! Will you press this button for a catch? Join the best online gaming site for fun challenges."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <meta
          property="og:title"
          content="The Red Button Challenge: Will You Press It? 🔴"
        />
        <meta
          property="og:description"
          content="One button. One catch. Would you press it? Best online gaming site for absurd dilemmas."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.imborednow.com/p/press-the-button"
        />
        <meta
          property="og:image"
          content="https://www.imborednow.com/assets/red-button-share-image.jpg"
        />
        <link
          rel="canonical"
          href="https://www.imborednow.com/p/press-the-button"
        />
      </Head>

      {/* --- MAIN GAME SECTION --- */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-6 overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/30 via-purple-900/20 to-transparent" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter leading-tight uppercase">
              Will You{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-rose-600">
                Press It?
              </span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg font-medium">
              One button. One choice. One consequence that will make you think
              twice.
            </p>
          </div>

          {/* Dilemma Cards - New Split Design */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="relative bg-white rounded-[3rem] p-2 shadow-2xl">
              {/* Benefit Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 p-8 md:p-10 rounded-[2.5rem] overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-emerald-200 group-hover:rotate-12 transition-transform">
                        ✨
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">
                          If You Press
                        </span>
                        <span className="text-lg font-black text-emerald-900">
                          The Benefit
                        </span>
                      </div>
                    </div>
                    <p className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
                      {loading ? (
                        <span className="text-emerald-600 animate-pulse">
                          Finding your perk...
                        </span>
                      ) : (
                        scenario?.benefit
                      )}
                    </p>
                  </div>
                </div>

                {/* Drawback Side */}
                <div className="group relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-10 rounded-[2.5rem] overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/20 rounded-full blur-2xl" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-red-900/50 group-hover:rotate-12 transition-transform">
                        ⚠️
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-red-400 uppercase tracking-widest block">
                          But Here's
                        </span>
                        <span className="text-lg font-black text-red-400">
                          The Catch
                        </span>
                      </div>
                    </div>
                    <p className="text-xl md:text-2xl font-bold text-white leading-snug">
                      {loading ? (
                        <span className="text-red-400 animate-pulse">
                          Revealing the cost...
                        </span>
                      ) : (
                        scenario?.drawback
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-xl border-4 border-slate-100 z-10">
                <span className="text-2xl font-black text-slate-400">VS</span>
              </div>
            </div>
          </div>

          {/* Action Zone - Redesigned */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-2xl border-2 border-white/10 p-8 md:p-10 rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.3)]">
              {!hasVoted ? (
                <div className="space-y-5">
                  {/* Main Button - More Compact & Interactive */}
                  <div className="relative group">
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-red-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Button */}
                    <button
                      onClick={() => handleVote("yes")}
                      disabled={loading}
                      className="relative w-full py-6 px-8 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-3xl font-black text-lg md:text-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.97] border-2 border-red-400/40"
                    >
                      {/* Subtle shine */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                      {/* Content */}
                      <div className="relative z-10 flex items-center justify-center gap-3">
                        <span className="text-3xl group-hover:scale-110 transition-transform">
                          🔴
                        </span>
                        <div className="flex flex-col items-start">
                          <span className="text-2xl md:text-3xl tracking-tight leading-none">
                            Press the Button
                          </span>
                          <span className="text-[10px] text-red-100 uppercase tracking-wider font-medium opacity-80">
                            I accept the consequences
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Secondary Option - More Prominent */}
                  <button
                    onClick={() => handleVote("no")}
                    disabled={loading}
                    className="group w-full py-4 px-6 text-slate-400 hover:text-white font-bold transition-all uppercase text-sm tracking-wider rounded-2xl hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-slate-700 hover:border-slate-600 flex items-center justify-center gap-2"
                  >
                    <span className="text-base group-hover:rotate-90 transition-transform duration-300">
                      ✗
                    </span>
                    <span>No, I'll Skip This One</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-6 animate-in zoom-in-95 duration-500">
                  {/* Stats Header */}
                  <div className="flex justify-between items-center px-2">
                    <div className="text-center">
                      <div className="text-3xl font-black text-emerald-400">
                        {yesPercent}%
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Pressed It
                      </div>
                    </div>
                    <div className="text-slate-500 font-black text-sm">VS</div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-slate-400">
                        {noPercent}%
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Walked Away
                      </div>
                    </div>
                  </div>

                  {/* Animated Bar */}
                  <div className="relative">
                    <div className="w-full h-16 bg-slate-900/50 rounded-2xl overflow-hidden flex border-2 border-white/10 shadow-inner">
                      <div
                        style={{ width: `${yesPercent}%` }}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full transition-all duration-1000 ease-out flex items-center justify-end pr-4"
                      >
                        {yesPercent > 15 && (
                          <span className="text-white font-black text-sm">
                            ✓
                          </span>
                        )}
                      </div>
                      <div
                        style={{ width: `${noPercent}%` }}
                        className="bg-gradient-to-l from-slate-700 to-slate-800 h-full transition-all duration-1000 ease-out flex items-center justify-start pl-4"
                      >
                        {noPercent > 15 && (
                          <span className="text-slate-400 font-black text-sm">
                            ✗
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Total Votes */}
                  <div className="text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
                    {total.toLocaleString()} People Decided
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={fetchNewScenario}
                    className="group w-full py-5 bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white rounded-2xl font-black text-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    <span>NEXT CHALLENGE</span>
                    <span className="text-2xl group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- SEO CONTENT SECTION --- */}
      <section className="bg-white py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <header className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                Psychology
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-950 mb-6 leading-tight">
              The Science Behind the{" "}
              <span className="text-red-600 italic">Red Button</span>
            </h2>
            <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
              Welcome to <strong className="text-slate-900">ImBoredNow</strong>,
              the <strong>best gaming site</strong> for interactive moral
              dilemmas. In 2026, online entertainment is about connection,
              psychology, and one eternal question:
              <em className="text-red-600 font-bold">
                {" "}
                Will you press this button?
              </em>
            </p>
          </header>

          {/* Article Content */}
          <article className="space-y-16 text-lg leading-relaxed text-slate-700">
            {/* Why Addictive */}
            <div className="bg-gradient-to-br from-slate-50 to-white p-10 md:p-16 rounded-[3rem] border border-slate-100 shadow-sm">
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 flex items-center gap-4">
                <span className="text-4xl">🧠</span>
                <span>Why It's So Addictive</span>
              </h3>
              <p className="mb-6">
                Our <strong>online gaming site</strong> focuses on the
                "Curiosity Gap." Humans are hardwired to explore "What If"
                scenarios. Whether it's a <strong>red button</strong> that
                grants you eternal wealth but makes your favorite coffee shop
                close forever, or a <strong>will you press this button</strong>{" "}
                challenge involving absurd superpowers, the dopamine hit comes
                from seeing how your mind compares to the global collective.
              </p>
              <p className="text-slate-600 italic">
                Every decision reveals something about your values, risk
                tolerance, and what you truly care about.
              </p>
            </div>

            {/* Featured Box */}
            <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-10 md:p-16 rounded-[3rem] border-4 border-purple-200 shadow-xl">
              <h4 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight flex items-center gap-3">
                <span className="text-3xl">✨</span>
                <span>Why We're the Best Gaming Site</span>
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Dynamic Scenarios",
                    desc: "Thousands of user-generated and AI-curated dilemmas",
                    icon: "🎲",
                  },
                  {
                    title: "Real-Time Stats",
                    desc: "Instantly see if you're a 'Yes' or 'No' person",
                    icon: "📊",
                  },
                  {
                    title: "Mobile Optimized",
                    desc: "Smoothest experience on any device",
                    icon: "📱",
                  },
                  {
                    title: "Safe for All",
                    desc: "Funny and absurd without toxicity",
                    icon: "🛡️",
                  },
                  {
                    title: "Zero Latency",
                    desc: "Fast-loading for instant gratification",
                    icon: "⚡",
                  },
                  {
                    title: "Community Driven",
                    desc: "Share results and compare with friends",
                    icon: "🌍",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-start bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all"
                  >
                    <span className="text-3xl shrink-0">{item.icon}</span>
                    <div>
                      <h5 className="font-black text-slate-900 mb-1">
                        {item.title}
                      </h5>
                      <p className="text-sm text-slate-600 font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Logic */}
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-4">
                <span className="text-4xl">⚖️</span>
                <span>The Psychology of Choice</span>
              </h3>
              <p>
                When users interact with our <strong>gaming website</strong>,
                they aren't just clicking a pixel. They're performing a
                cost-benefit analysis in milliseconds. This type of{" "}
                <strong>good gaming site</strong>
                interaction is used by psychologists to study "Utilitarian vs.
                Deontological" decision making.
              </p>
              <p>
                When you face a <strong>red button</strong> challenge, your
                brain weighs the "Perk" against the "Catch." In most{" "}
                <strong>online gaming sites</strong>, the catch is minor, but on{" "}
                <strong>ImBoredNow</strong>, we craft scenarios that truly make
                you pause.
              </p>
            </div>

            {/* How to Play */}
            <div className="bg-slate-900 text-white p-10 md:p-16 rounded-[3rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-3xl rounded-full" />
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-8 flex items-center gap-3">
                  <span className="text-4xl">🎮</span>
                  <span>How to Play</span>
                </h3>
                <ol className="space-y-4 text-lg">
                  {[
                    "Read the Green Card – This is what you gain (The Perk)",
                    "Read the Black Card – This is the consequence (The Catch)",
                    "Make your choice: Will you press this button?",
                    "See how your decision compares with the global community",
                    "Share your most interesting dilemmas with friends",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center font-black text-sm">
                        {i + 1}
                      </span>
                      <span className="text-slate-300 font-medium pt-0.5">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Social Sharing */}
            <div className="text-center bg-gradient-to-r from-red-50 to-rose-50 p-12 rounded-[3rem] border border-red-100">
              <h3 className="text-2xl font-black text-slate-900 mb-4">
                What makes a{" "}
                <span className="text-red-600">gaming website</span> go viral?
              </h3>
              <p className="text-slate-700 max-w-2xl mx-auto">
                It's the shareability. After you decide to{" "}
                <strong>press yes button or no button</strong>, you can share
                your results. This drives community engagement and cements our
                reputation as the <strong>best gaming site</strong> for social
                interaction in 2026.
              </p>
            </div>
          </article>

          {/* Footer */}
          <footer className="mt-24 pt-12 border-t-2 border-slate-100 text-center">
            <p className="text-slate-500 text-sm font-medium">
              © 2026 ImBoredNow Gaming Website. All rights reserved.
              <br />
              Your #1 source for{" "}
              <strong className="text-slate-700">
                hit the button games
              </strong>{" "}
              and
              <strong className="text-slate-700">
                {" "}
                online gaming site
              </strong>{" "}
              fun.
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
}
