import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");

  const categories = [
    { title: "Boredom Trivia", emoji: "🧠", color: "from-indigo-600 to-blue-700", url: "/p/trivia", tag: "Hot" },
    { title: "Quick DIY Craft", emoji: "✨", color: "from-orange-500 to-rose-500", url: "/p/diy-craft", tag: "New" },
    { title: "Mind Riddles", emoji: "🧩", color: "from-purple-600 to-pink-600", url: "/p/mind-bending-riddle", tag: "Brainy" },
    { title: "Random Jokes", emoji: "😂", color: "from-blue-500 to-cyan-500", url: "/p/random-jokes", tag: "Funny" },
    { title: "Weird Web", emoji: "🌐", color: "from-rose-500 to-orange-500", url: "/p/weird-websites", tag: "Strange" },
    { title: "Animal Facts", emoji: "🦁", color: "from-emerald-500 to-teal-600", url: "/p/crazy-animal-fact", tag: "Cool" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-purple-200 pb-20">
      <Head>
        <title>I&apos;m Bored Now | Kill Boredom Instantly</title>
      </Head>

      {/* --- 1. HERO SECTION --- */}
      <section className="relative pt-16 pb-28 px-4 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-30">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-purple-600/40 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full text-purple-300 text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-white/10">
            🚀 The #1 Boredom Killer
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.85]">
            BEAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">BOREDOM</span><br/>
            IN SECONDS.
          </h1>
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/p/random-activity">
              <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl active:scale-95">
                Surprise Me! 🎁
              </button>
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 -mt-12 relative z-20 space-y-20">
        
        {/* --- 2. BENTO GRID (The Main Content) --- */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {categories.map((cat, i) => (
              <Link key={i} href={cat.url}>
                <div className={`group relative h-44 md:h-55 lg:h-64 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br ${cat.color} p-5 md:p-8 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 shadow-xl active:scale-95`}>
                  <div className="absolute top-[-5%] right-[-5%] text-8xl md:text-9xl opacity-15 group-hover:rotate-12 transition-transform duration-500">
                    {cat.emoji}
                  </div>
                  <div className="relative h-full flex flex-col justify-between">
                    <span className="self-start bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-white uppercase tracking-widest">
                      {cat.tag}
                    </span>
                    <div>
                      <h3 className="text-lg md:text-2xl font-black text-white mb-1">
                        {cat.title}
                      </h3>
                      <p className="text-white/70 text-[10px] uppercase font-bold tracking-widest">Tap to Play →</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* --- 3. DAD JOKE & FUN FACT (Featured Block) --- */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* Dad Joke Card */}
          <Link href="/p/dad-jokes">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 group cursor-pointer hover:border-purple-200 transition-all">
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl">🎭</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-[10px] font-black uppercase">Joke of the Day</span>
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-purple-600 transition-colors">
                Why don't scientists trust atoms?
              </h3>
              <p className="text-slate-500 font-medium">Click to reveal the punchline... 😂</p>
            </div>
          </Link>

          {/* Fun Fact Card */}
          <Link href="/p/facts">
            <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl group cursor-pointer overflow-hidden relative">
              <div className="absolute right-[-10%] bottom-[-10%] text-9xl opacity-10 rotate-12 group-hover:rotate-0 transition-transform">🧠</div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl">💡</span>
                  <span className="px-3 py-1 bg-white/10 text-white rounded-lg text-[10px] font-black uppercase">Did you know?</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-4">
                  Honey never spoils. Archaeologists found edible honey in ancient tombs!
                </h3>
                <p className="text-indigo-300 font-bold uppercase text-[10px] tracking-[0.2em]">More Facts →</p>
              </div>
            </div>
          </Link>
        </section>

        {/* --- 4. THE DISCOVERY LAB (Expanded Tools) --- */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-8 px-2">
            <div>
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                The Discovery Lab <span className="animate-pulse">🧪</span>
              </h2>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Deep Dive Into Your Life</p>
            </div>
            <div className="h-[2px] hidden md:block flex-grow mx-6 bg-slate-100" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               { 
                 title: "Birthdate Secrets", 
                 icon: "🎂", 
                 desc: "What happened the day you were born?", 
                 color: "bg-blue-50 border-blue-100 text-blue-700", 
                 href: "/p/birthdate-calculator" 
               },
               { 
                 title: "History Timeline", 
                 icon: "⏳", 
                 desc: "Sync your life events with world history.", 
                 color: "bg-purple-50 border-purple-100 text-purple-700", 
                 href: "/p/history-timeline" 
               },
               { 
                 title: "Life Expectancy", 
                 icon: "❤️", 
                 desc: "How many days do you have left? Find out.", 
                 color: "bg-rose-50 border-rose-100 text-rose-700", 
                 href: "/p/life-expectancy-calculator" 
               },
               { 
                 title: "Lifestyle Factor", 
                 icon: "⚖️", 
                 desc: "Analyze how your habits affect your future.", 
                 color: "bg-emerald-50 border-emerald-100 text-emerald-700", 
                 href: "/p/life-style-factor" 
               }
             ].map((tool, i) => (
               <Link key={i} href={tool.href}>
                 <div className={`${tool.color} border p-6 rounded-3xl flex items-center gap-5 hover:scale-[1.03] transition-all cursor-pointer group active:scale-95 shadow-sm hover:shadow-md`}>
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-sm group-hover:rotate-6 transition-transform">
                      {tool.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-lg leading-tight mb-1">{tool.title}</h4>
                      <p className="text-slate-600 text-xs font-bold opacity-80 leading-snug">{tool.desc}</p>
                    </div>
                 </div>
               </Link>
             ))}
          </div>
        </section>

        {/* --- 5. WHY I'M BORED NOW? (Value Proposition) --- */}
        <section className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-slate-50 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Why <span className="text-purple-600">imborednow?</span> 🤔
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mt-12 text-left">
              {[
                { icon: "🎯", title: "Always Fresh", desc: "New jokes and trivia added every 24 hours." },
                { icon: "🚀", title: "Zero Friction", desc: "No signups, no ads that stop the fun." },
                { icon: "👨‍👩‍👧‍👦", title: "Family Safe", desc: "Clean content curated for all age groups." },
                { icon: "📱", title: "Pocket Fun", desc: "Works perfectly on any phone or tablet." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h4 className="font-black text-slate-800">{item.title}</h4>
                    <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 6. NEWSLETTER (Itractive Style) --- */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
           <h2 className="text-3xl md:text-5xl font-black mb-4">Never be bored again.</h2>
           <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto opacity-80">Join 50,000+ humans getting a weekly dose of fun.</p>
           <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-8 py-4 bg-white text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-colors">Join Free</button>
           </div>
        </section>

      </main>
    </div>
  );
}