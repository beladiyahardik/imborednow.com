import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [boredomLevel, setBoredomLevel] = useState<any>(50);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch for interactive elements
  useEffect(() => setMounted(true), []);

  const categories = [
    { title: "Boredom Trivia", emoji: "🧠", color: "from-indigo-600 to-blue-700", url: "/p/trivia", tag: "Hot", desc: "Test your brain" },
    { title: "Quick DIY Craft", emoji: "✨", color: "from-orange-500 to-rose-500", url: "/p/diy-craft", tag: "New", desc: "Create something" },
    { title: "Mind Riddles", emoji: "🧩", color: "from-purple-600 to-pink-600", url: "/p/mind-bending-riddle", tag: "Brainy", desc: "Logic puzzles" },
    { title: "Random Jokes", emoji: "😂", color: "from-blue-500 to-cyan-500", url: "/p/random-jokes", tag: "Funny", desc: "Laugh out loud" },
    { title: "Weird Web", emoji: "🌐", color: "from-rose-500 to-orange-500", url: "/p/weird-websites", tag: "Strange", desc: "Internet rabbit holes" },
    { title: "Animal Facts", emoji: "🦁", color: "from-emerald-500 to-teal-600", url: "/p/crazy-animal-fact", tag: "Cool", desc: "Wild discoveries" },
  ];

  // SEO Schema Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Bored Button / ImBoredNow",
    "operatingSystem": "Any",
    "applicationCategory": "EntertainmentApplication",
    "offers": { "@type": "Offer", "price": "0" },
    "description": "The ultimate collection of fun games and websites to play when bored at school or work."
  };

  return (
    <>
      <Head>
        <title>Bored Button: Best Games & Sites to Cure Boredom Now</title>
        <meta name="description" content="Feeling bored? Click the red Bored Button for 100+ random interactive games, cool websites, and fun activities to cure boredom instantly at school or work." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Head>

          <title>Bored Button: Best Games & Sites to Cure Boredom Now</title>

          <meta name="title" content="Bored Button: Best Games & Sites to Cure Boredom Now" />

          <meta name="description" content={`Feeling bored at school, work, or home? Say " I'm bored" no more! Click the red Bored Button for hundreds of random interactive games, cool websites, and fun activities to cure boredom instantly. From quick games to pointless fun – beat boredom now!"`} />


          <meta property="og:type" content="website" />

          <meta property="og:url" content="https://www.imborednow.com/" />

          <meta property="og:title" content="Bored Button: Best Games & Sites to Cure Boredom Now" />

          <meta property="og:description" content={`Feeling bored at school, work, or home? Say " I'm bored" no more! Click the red Bored Button for hundreds of random interactive games, cool websites, and fun activities to cure boredom instantly. From quick games to pointless fun – beat boredom now!"`} />

          <meta property="og:image" content="/banner.png" />


          <meta property="twitter:card" content="summary_large_image" />

          <meta property="twitter:url" content="https://www.imborednow.com/" />

          <meta property="twitter:title" content="Bored Button: Best Games & Sites to Cure Boredom Now" />

          <meta property="twitter:description" content={`Feeling bored at school, work, or home? Say " I'm bored" no more! Click the red Bored Button for hundreds of random interactive games, cool websites, and fun activities to cure boredom instantly. From quick games to pointless fun – beat boredom now!"`} />

          <meta property="twitter:image" content="/banner.png" />

          <link rel="canonical" href="https://www.imborednow.com/"></link>

        </Head>

        <link rel="canonical" href="https://www.imborednow.com/" />
      </Head>

      <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-purple-200 pb-20">

        {/* --- 1. HERO SECTION --- */}
        <section className="relative pt-20 pb-32 px-4 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-purple-600/40 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <nav className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full text-purple-300 text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-white/10">
              🚀 The #1 Boredom Killer Website
            </nav>

            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.85]">
              BEAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">BOREDOM</span><br />
              IN SECONDS.
            </h1>

            <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg font-medium">
              The internet's favorite "I'm Bored" button. Discover 100+ random fun games,
              crazy facts, and interactive tools to kill time.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8">
              <Link href="/p/random-activity">
                <button className="group relative px-10 py-5 bg-red-600 text-white rounded-2xl font-black text-xl hover:bg-red-500 transition-all shadow-[0_0_40px_rgba(220,38,38,0.3)] hover:shadow-[0_0_60px_rgba(220,38,38,0.5)] active:scale-95">
                  THE BORED BUTTON 🔴
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] px-2 py-1 rounded-md animate-bounce">START HERE</span>
                </button>
              </Link>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 -mt-16 relative z-20 space-y-20">

          {/* --- 2. INTERACTIVE BOREDOM METER (New) --- */}
          {mounted && (
            <section className="bg-white p-8 rounded-[3rem] shadow-2xl border border-purple-100 max-w-3xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">How bored are you right now?</h2>
                <p className="text-slate-500 text-sm">Slide to get a custom recommendation</p>
              </div>
              <input
                type="range"
                min="1" max="100"
                value={boredomLevel}
                onChange={(e) => setBoredomLevel(e.target.value)}
                className="w-full h-4 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between mt-4 font-black text-[10px] uppercase tracking-widest text-slate-400">
                <span>Just Chilling</span>
                <span className="text-purple-600 text-sm">Level: {boredomLevel}%</span>
                <span>Dying of Boredom</span>
              </div>
              <div className="mt-8 text-center animate-fade-in">
                <p className="text-slate-400 text-xs font-bold uppercase mb-2">Recommended for you:</p>
                <Link href={categories[boredomLevel % 6].url}>
                  <span className="inline-block px-6 py-3 bg-purple-50 text-purple-700 rounded-xl font-black hover:bg-purple-100 transition-colors cursor-pointer border border-purple-200">
                    {categories[boredomLevel % 6].emoji} {categories[boredomLevel % 6].title} →
                  </span>
                </Link>
              </div>
            </section>
          )}

          {/* --- 3. BENTO GRID --- */}
          <section>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
              {categories.map((cat, i) => (
                <Link key={i} href={cat.url} title={`Play ${cat.title}`}>
                  <div className={`group relative h-48 md:h-64 rounded-[2.5rem] bg-gradient-to-br ${cat.color} p-6 md:p-8 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:rotate-1 shadow-xl active:scale-95`}>
                    <div className="absolute top-[-5%] right-[-5%] text-8xl md:text-9xl opacity-15 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
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
                        <p className="text-white/80 text-[10px] uppercase font-bold tracking-widest group-hover:translate-x-2 transition-transform">
                          {cat.desc} →
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* --- 4. FEATURED CONTENT --- */}
          <section className="grid md:grid-cols-2 gap-6">
            <Link href="/p/dad-jokes" className="block transform transition hover:scale-[1.02]">
              <article className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl">🎭</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-[10px] font-black uppercase">Joke of the Day</span>
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-4">Why don't scientists trust atoms?</h3>
                <p className="text-purple-600 font-bold">Because they make up everything! 😂</p>
              </article>
            </Link>

            <Link href="/p/facts" className="block transform transition hover:scale-[1.02]">
              <article className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl h-full relative overflow-hidden">
                <div className="absolute right-[-5%] bottom-[-5%] text-9xl opacity-10">🧠</div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl">💡</span>
                    <span className="px-3 py-1 bg-white/10 text-white rounded-lg text-[10px] font-black uppercase">Random Fact</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">
                    Honey never spoils. Archaeologists found edible honey in 3,000-year-old tombs!
                  </h3>
                  <p className="text-indigo-300 font-bold uppercase text-[10px] tracking-[0.2em]">Learn More Facts →</p>
                </div>
              </article>
            </Link>
          </section>

          {/* --- 5. THE DISCOVERY LAB --- */}
          <section>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-8 px-2">
              <header>
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                  The Discovery Lab <span className="animate-pulse">🧪</span>
                </h2>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Free Online Tools for Bored People</p>
              </header>
              <div className="h-[2px] hidden md:block flex-grow mx-6 bg-slate-100" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Birthdate Secrets", icon: "🎂", desc: "What happened the day you were born?", color: "bg-blue-50 border-blue-100 text-blue-700", href: "/p/birthdate-calculator" },
                { title: "History Timeline", icon: "⏳", desc: "Sync your life events with world history.", color: "bg-purple-50 border-purple-100 text-purple-700", href: "/p/history-timeline" },
                { title: "Life Expectancy", icon: "❤️", desc: "How many days do you have left? Find out.", color: "bg-rose-50 border-rose-100 text-rose-700", href: "/p/life-expectancy-calculator" },
                { title: "Lifestyle Factor", icon: "⚖️", desc: "Analyze how your habits affect your future.", color: "bg-emerald-50 border-emerald-100 text-emerald-700", href: "/p/life-style-factor" }
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

          {/* --- 6. SEO LONG-FORM CONTENT --- */}
          <section className="bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-100">
            <div className="max-w-4xl mx-auto prose prose-slate">
              <h2 className="text-3xl font-black text-slate-900 mb-6 text-center">Your Ultimate Cure for "I'm Bored"</h2>

              <div className="grid md:grid-cols-2 gap-10 text-slate-600 leading-relaxed">
                <div>
                  <h3 className="text-lg font-black text-purple-600 uppercase mb-3">What is the Bored Button?</h3>
                  <p>
                    The <strong>Bored Button</strong> is an interactive portal designed for those moments when you are <strong>bored at school</strong>, home, or work. Instead of scrolling through social media, we provide <strong>online games to play when bored</strong> that are quick, engaging, and completely free.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-black text-purple-600 uppercase mb-3">Fun Games to Play Online</h3>
                  <p>
                    We’ve curated a list of the most <strong>fun games to play when bored</strong>, including trivia, riddles, and "weird" websites that showcase the strangest corners of the internet. Our platform is safe, family-friendly, and requires no registration.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* --- 7. NEWSLETTER --- */}
          <section className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Never be bored again.</h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto opacity-80 font-medium">Join 50,000+ humans getting a weekly dose of internet magic.</p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="Your email address"
                className="flex-grow px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button type="submit" className="px-8 py-4 bg-white text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95">
                Join Free
              </button>
            </form>
          </section>

        </main>
      </div>
    </>
  );
}