/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import Link from "next/link";

export default function ToolsHub() {
  const tools = [
    {
      title: "Birthdate Secrets",
      icon: "🎂",
      desc: "Unlock the hidden cosmic data of your birthday and age in days.",
      color: "from-blue-500 to-cyan-400",
      href: "/p/birthdate-calculator",
      tag: "Popular",
    },
    {
      title: "Pixel Art Studio",
      icon: "🎨",
      desc: "Create 8-bit masterpieces with our ultra-clean pixel canvas tool.",
      color: "from-orange-500 to-red-500",
      href: "/p/pixel-art",
      tag: "Creative",
    },
    {
      title: "History Timeline",
      icon: "⏳",
      desc: "Pinpoint exactly where you stand in the history of the universe.",
      color: "from-purple-600 to-pink-500",
      href: "/p/history-timeline",
      tag: "Insightful",
    },
    {
      title: "Life Expectancy",
      icon: "❤️",
      desc: "A brutally honest look at your remaining days and potential.",
      color: "from-rose-600 to-orange-500",
      href: "/p/life-expectancy-calculator",
      tag: "Deep",
    },
    {
      title: "Lifestyle Factor",
      icon: "⚖️",
      desc: "Is your daily routine helping or hurting your future self?",
      color: "from-emerald-600 to-teal-500",
      href: "/p/life-style-factor",
      tag: "Health",
    },
    {
      title: "Word Link",
      icon: "🔗",
      desc: "Connect letters and hunt for hidden words in this minimalist lexical challenge.",
      color: "from-indigo-600 via-indigo-500 to-violet-600",
      href: "/p/word-link",
      tag: "Master",
      difficulty: "Dynamic",
      estimatedTime: "3-8 min",
      stats: {
        solvers: "2.4k+",
        avgScore: "92%",
      },
    },
    {
      title: "Daily Crossword",
      icon: "🧩",
      desc: "Sharpen your focus and expand your vocabulary with today's master-level grid.",
      color: "from-indigo-600 via-purple-600 to-violet-500",
      href: "/p/daily-crossword",
      tag: "Brain Training",
      difficulty: "Dynamic",
      estimatedTime: "5-10 min",
      stats: {
        solvers: "1.2k+",
        avgScore: "85%",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-purple-200 pb-20">
      <Head>
        <title>The Discovery Lab | Interactive Tools by ImBoredNow</title>
        <meta
          name="description"
          content="Explore our collection of interactive tools, from birthdate calculators to life expectancy trackers."
        />
      </Head>

      {/* --- HERO SECTION: THE LAB CORE --- */}
      <section className="relative pt-24 pb-40 px-4 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-xl rounded-full text-purple-300 text-[9px] font-black uppercase tracking-[0.3em] mb-8 border border-white/10">
            🧪 Research & Discovery
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.85] uppercase">
            THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
              DISCOVERY LAB.
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed">
            Data-driven tools you didn't know you needed. Map your life, track
            your time, and face your future.
          </p>
        </div>
      </section>

      {/* --- TOOLS DIRECTORY: THE BENTO GRID --- */}
      <section className="max-w-6xl mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool, i) => (
            <Link key={i} href={tool.href}>
              <div className="bg-white p-2 rounded-[3.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group cursor-pointer active:scale-[0.98]">
                <div className="flex flex-col md:flex-row items-center gap-8 p-8">
                  {/* ICON BLOCK */}
                  <div
                    className={`shrink-0 w-24 h-24 rounded-[2rem] bg-gradient-to-br ${tool.color} flex items-center justify-center text-5xl shadow-lg transform group-hover:rotate-6 transition-transform`}
                  >
                    <span className="drop-shadow-md">{tool.icon}</span>
                  </div>

                  {/* TEXT CONTENT */}
                  <div className="flex-grow text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                      <h4 className="font-black text-2xl text-slate-900 tracking-tight uppercase italic">
                        {tool.title}
                      </h4>
                      <span className="w-fit mx-auto md:mx-0 px-2 py-0.5 bg-slate-100 rounded text-[8px] font-black text-slate-500 uppercase tracking-widest">
                        {tool.tag}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm font-semibold leading-relaxed mb-4">
                      {tool.desc}
                    </p>
                    <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-purple-600 group-hover:translate-x-2 transition-transform">
                      Launch Tool <span className="text-lg">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- SEARCH / CATEGORY SECTION --- */}
      <section className="max-w-4xl mx-auto px-4 mt-24 text-center">
        <div className="bg-slate-900 p-12 md:p-20 rounded-[4rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px]" />
          <h2 className="text-white font-black text-3xl md:text-4xl mb-6 tracking-tight">
            Need something specific?
          </h2>
          <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em] mb-10">
            We are building new experiments every week.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Calculators", "Visualizers", "Life-Hacks", "Time-Trackers"].map(
              (cat, idx) => (
                <span
                  key={idx}
                  className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 cursor-default transition-all"
                >
                  {cat}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* --- FOOTER ARTICLE --- */}
      <section className="max-w-4xl mx-auto px-4 mt-24">
        <div className="border-t border-slate-200 pt-16">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-6">
            About the Discovery Lab
          </h3>
          <p className="text-slate-600 leading-relaxed font-medium mb-4">
            The Discovery Lab by <strong>ImBoredNow</strong> is a collection of
            high-precision interactive tools designed to bridge the gap between
            abstract data and your daily life. Whether you're curious about your{" "}
            <strong>age in days</strong> or looking for a{" "}
            <strong>life expectancy calculator</strong> that doesn't hold back,
            our tools are built with accuracy and user experience at the
            forefront.
          </p>
          <p className="text-slate-600 leading-relaxed font-medium">
            We believe that understanding your timeline is the first step toward
            making every day count. Our <strong>lifestyle factor</strong> and{" "}
            <strong>history timeline</strong> tools help you visualize your
            place in the world, providing context that a simple calendar never
            could.
          </p>
        </div>
      </section>
    </div>
  );
}
