/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";

interface TActivity {
  type: string;
  emoji: string;
  title: string;
  content: string;
  color: string;
  bgColor: string;
  tag: string;
}

export default function RandomActivity() {
  const [activity, setActivity] = useState<TActivity | null>(null);
  const [loading, setLoading] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [intensity, setIntensity] = useState(50);
  const [history, setHistory] = useState<TActivity[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);

  const activities: TActivity[] = [
    {
      type: "challenge",
      emoji: "🧪",
      title: "Chemistry Lab",
      content:
        "Go to the kitchen and mix oil and water in a glass. Add a drop of soap and watch the molecular war!",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      tag: "Experiment",
    },
    {
      type: "challenge",
      emoji: "✍️",
      title: "Non-Dominant Sketch",
      content:
        "Try to draw a simple house using only your non-dominant hand. It's harder than it looks!",
      color: "from-purple-600 to-indigo-600",
      bgColor: "bg-purple-50",
      tag: "Creative",
    },
    {
      type: "challenge",
      emoji: "🤫",
      title: "Silent Minute",
      content:
        "Set a timer for 60 seconds and sit in total silence. No phone, no talking, just your thoughts.",
      color: "from-slate-700 to-slate-900",
      bgColor: "bg-slate-100",
      tag: "Mindfulness",
    },
    {
      type: "challenge",
      emoji: "🤸",
      title: "Wall Sit Hero",
      content:
        "How long can you hold a wall sit? 30 seconds is rookie, 2 minutes is legend status.",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      tag: "Physical",
    },
    {
      type: "joke",
      emoji: "😂",
      title: "Dad Joke Time!",
      content:
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      tag: "Funny",
    },
    {
      type: "fact",
      emoji: "🧠",
      title: "Amazing Fact",
      content:
        "A single bolt of lightning contains enough energy to toast 100,000 slices of bread!",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      tag: "Knowledge",
    },
    {
      type: "challenge",
      emoji: "🔍",
      title: "Object Hunt",
      content:
        "Find 3 blue objects in the room you are in within 10 seconds. GO!",
      color: "from-pink-500 to-rose-600",
      bgColor: "bg-rose-50",
      tag: "Active",
    },
    {
      type: "riddle",
      emoji: "🧩",
      title: "Brain Teaser",
      content: "What has keys but can't open locks? (Answer: A Piano)",
      color: "from-purple-600 to-pink-600",
      bgColor: "bg-purple-50",
      tag: "Brainy",
    },
  ];

  const categories = [
    {
      label: "Jokes",
      emoji: "😂",
      route: "/p/jokes",
      color: "bg-blue-50 border-blue-100 text-blue-700",
    },
    {
      label: "Facts",
      emoji: "🧠",
      route: "/p/facts",
      color: "bg-emerald-50 border-emerald-100 text-emerald-700",
    },
    {
      label: "Riddles",
      emoji: "🧩",
      route: "/p/mind-bending-riddle",
      color: "bg-purple-50 border-purple-100 text-purple-700",
    },
    {
      label: "DIY",
      emoji: "✂️",
      route: "/p/diy-craft",
      color: "bg-orange-50 border-orange-100 text-orange-700",
    },
  ];

  const getRandomActivity = () => {
    setLoading(true);
    setAnimation(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * activities.length);
      const selected = activities[randomIndex];
      setActivity(selected);
      setHistory((prev) => [selected, ...prev].slice(0, 5));
      setLoading(false);
      setTimeout(() => setAnimation(false), 300);
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 600);
  };

  const handleShare = (platform: string) => {
    const text = `I'm curing my boredom with this ${activity?.tag} challenge: "${activity?.content}" - Check it out on ImBoredNow!`;
    const url = window.location.href;

    const links: Record<string, string> = {
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      fb: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } else {
      window.open(links[platform], "_blank");
    }
  };

  useEffect(() => {
    getRandomActivity();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-purple-200 pb-20">
      <Head>
        <title>Boredom Lab | Random Activity & Challenges</title>
      </Head>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-blue-600/40 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <nav className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full text-blue-300 text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-white/10">
            ⚡ Session Active: {history.length} Activities Completed
          </nav>

          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.85]">
            RANDOM{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
              QUEST
            </span>
            <br />
            GENERATOR.
          </h1>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- LEFT: ACTIVITY ENGINE --- */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-blue-50">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                  Boredom Intensity
                </h2>
                <span className="bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-black">
                  {intensity}%
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div ref={resultsRef} className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[3.5rem] blur opacity-10" />

              <div className="relative bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-slate-100">
                {loading ? (
                  <div className="h-[450px] flex flex-col items-center justify-center">
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 border-4 border-blue-100 rounded-full" />
                      <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="font-black text-slate-400 uppercase tracking-widest mt-6 animate-pulse">
                      Calculating New Quest...
                    </p>
                  </div>
                ) : (
                  activity && (
                    <div
                      className={`transition-all duration-500 ${
                        animation
                          ? "scale-95 opacity-0"
                          : "scale-100 opacity-100"
                      }`}
                    >
                      <div
                        className={`bg-gradient-to-br ${activity.color} p-12 text-center text-white relative`}
                      >
                        <span className="relative z-10 bg-black/20 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                          {activity.tag} Protocol
                        </span>
                        <h3 className="relative z-10 text-4xl md:text-6xl font-black mt-6 tracking-tight">
                          {activity.title}
                        </h3>
                      </div>

                      <div className="p-10 md:p-16">
                        <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 md:p-14 text-center mb-10 shadow-inner">
                          <p className="text-2xl md:text-4xl font-bold text-slate-800 leading-tight">
                            {activity.content}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <button
                            onClick={getRandomActivity}
                            className="flex-grow py-6 bg-red-600 text-white rounded-2xl font-black text-2xl hover:bg-red-500 transition-all shadow-[0_0_30px_rgba(220,38,38,0.3)] active:scale-95 flex items-center justify-center gap-3"
                          >
                            THE BORED BUTTON 🔴
                          </button>
                          <button className="px-10 py-6 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all">
                            Done! ✅
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Session History (Replaces Sponsored Space) */}
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
                Recent Discoveries
              </h3>
              <div className="space-y-3">
                {history.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <span className="text-2xl">{h.emoji}</span>
                    <span className="font-bold text-slate-700 text-sm">
                      {h.title}
                    </span>
                    <span className="ml-auto text-[10px] font-black text-slate-300 uppercase">
                      {h.type}
                    </span>
                  </div>
                ))}
                {history.length === 0 && (
                  <p className="text-center text-slate-300 py-4 font-bold uppercase text-[10px]">
                    Your activity log will appear here
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* --- RIGHT: SIDEBAR --- */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Invite a Friend (Now Working) */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <h4 className="font-black text-xl mb-2 relative z-10">
                Cure a Friend 📢
              </h4>
              <p className="text-blue-100 text-sm mb-8 font-medium relative z-10">
                Boredom is a disease. Share the antidote.
              </p>
              <div className="grid grid-cols-2 gap-3 relative z-10">
                <button
                  onClick={() => handleShare("x")}
                  className="py-3 bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
                >
                  Twitter
                </button>
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="py-3 bg-emerald-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => handleShare("fb")}
                  className="py-3 bg-blue-800 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
                >
                  Facebook
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="py-3 bg-white text-blue-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
                >
                  Copy Link
                </button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
                Discovery Categories
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {categories.map((cat, i) => (
                  <Link key={i} href={cat.route}>
                    <div
                      className={`${cat.color} p-4 rounded-2xl border flex items-center gap-4 hover:translate-x-2 transition-all cursor-pointer group`}
                    >
                      <span className="text-2xl group-hover:scale-125 transition-transform">
                        {cat.emoji}
                      </span>
                      <span className="font-black text-sm uppercase tracking-widest">
                        {cat.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mini Game / Trivia Teaser */}
            <div className="bg-yellow-50 border border-yellow-100 p-8 rounded-[3rem]">
              <span className="text-yellow-600 text-[10px] font-black uppercase tracking-widest">
                Did you know?
              </span>
              <p className="text-yellow-900 font-bold mt-2 text-sm">
                You've clicked the button enough times to burn 2 calories. Keep
                going for a workout!
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
