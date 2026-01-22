import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

// --- Utilities ---
const createExcerpt = (html: string) => {
  if (!html) return "";
  const text = html.replace(/<[^>]*>?/gm, '');
  return text.substring(0, 100) + "...";
};

const extractImage = (html: string) => {
  const imgReg = /<img [^>]*src="([^"]+)"/;
  const match = imgReg.exec(html);
  return match ? match[1] : null;
};

const slugify = (text: string) => {
  return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');
};

export default function Home() {
  const [boredomLevel, setBoredomLevel] = useState<any>(50);
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeUsers, setActiveUsers] = useState(12450);

  const API_KEY = "AIzaSyDw4oUW9oN8DfN5u6CUgFJ5rE7CF512l_0";
  const BLOG_ID = "9008125657659692221";
  const BASE_URL = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=3`;

  useEffect(() => {
    setMounted(true);
    fetchLatestPosts();
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchLatestPosts = async () => {
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      if (data.items) setPosts(data.items);
    } catch (err) {
      console.error("Home Blogger Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { title: "Boredom Trivia", emoji: "🧠", color: "from-indigo-600 to-blue-700", url: "/p/trivia", tag: "Hot", desc: "Mind-blowing trivia" },
    { title: "Quick DIY Craft", emoji: "✨", color: "from-orange-500 to-rose-500", url: "/p/diy-craft", tag: "New", desc: "Creative escapes" },
    { title: "Mind Riddles", emoji: "🧩", color: "from-purple-600 to-pink-600", url: "/p/mind-bending-riddle", tag: "Brainy", desc: "Logic puzzles" },
    { title: "Random Jokes", emoji: "😂", color: "from-blue-500 to-cyan-500", url: "/p/random-jokes", tag: "Funny", desc: "Instant laughs" },
    { title: "Weird Web", emoji: "🌐", color: "from-rose-500 to-orange-500", url: "/p/weird-websites", tag: "Strange", desc: "Internet rabbit holes" },
    { title: "Animal Facts", emoji: "🦁", color: "from-emerald-500 to-teal-600", url: "/p/crazy-animal-fact", tag: "Cool", desc: "Wild nature facts" },
  ];

  return (
    <>
      <Head>
        <title>Bored Button: Games to Play When Bored & Fun Sites</title>
        <meta name="description" content="Stuck with nothing to do? Click the red button to find the best games to play when bored. Explore 100+ fun websites when bored at school or work." />
        <meta name="keywords" content="im bored, games to play when bored, red button, bored button, websites when bored, click the button, i am bored" />
      </Head>

      <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-purple-200">
        
        {/* --- 1. HERO SECTION --- */}
        <section className="relative pt-32 pb-44 px-4 overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 backdrop-blur-md rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-8 border border-emerald-500/20">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              {activeUsers.toLocaleString()} People Solving &quot;I Am Bored&quot; Right Now
            </div>

            <h1 className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter leading-[0.8] uppercase">
              Im <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-orange-500">Bored</span><br />
              <span className="text-white/90 text-4xl md:text-6xl tracking-normal">Click The Button.</span>
            </h1>
            
            <p className="text-slate-400 max-w-xl mx-auto mb-12 text-lg md:text-xl font-medium leading-relaxed">
              If you&apos;re looking for <span className="text-white font-bold">games to play when bored</span>, you just found the jackpot. One click on the red button sends you to a random, amazing corner of the web.
            </p>

            <div className="flex flex-col items-center gap-4">
              <Link href="/p/random-activity">
                <button className="group relative px-12 py-6 bg-red-600 text-white rounded-[2rem] font-black text-2xl hover:bg-red-500 transition-all shadow-[0_20px_50px_rgba(220,38,38,0.4)] hover:shadow-[0_20px_70px_rgba(220,38,38,0.6)] active:scale-95 border-b-8 border-red-800 hover:border-red-700">
                  PRESS THIS BUTTON 🔴
                  <div className="absolute -top-4 -right-4 bg-yellow-400 text-black text-[12px] px-3 py-1 rounded-full font-black rotate-12 animate-bounce shadow-lg">
                    BORED?
                  </div>
                </button>
              </Link>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">The Ultimate Random Button Game</p>
            </div>
          </div>
        </section>

        {/* --- 2. THE CONTENT HUB --- */}
        <main className="max-w-6xl mx-auto px-4 -mt-24 relative z-20 pb-20 space-y-24">
          
          {/* BOREDOM SLIDER */}
          {mounted && (
            <div className="bg-white/80 backdrop-blur-2xl p-10 rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] border border-white max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-grow w-full space-y-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight italic">&quot;Im so bored, help me!&quot;</h2>
                  <input 
                    type="range" min="1" max="100" 
                    value={boredomLevel} 
                    onChange={(e) => setBoredomLevel(e.target.value)} 
                    className="w-full h-6 bg-slate-100 rounded-full appearance-none cursor-pointer accent-purple-600 border-8 border-slate-50" 
                  />
                  <div className="flex justify-between font-black text-[11px] uppercase tracking-widest text-slate-400">
                    <span>Just Browsing</span>
                    <span className="text-purple-600 text-lg">BOREDOM LEVEL: {boredomLevel}%</span>
                    <span>Brain is Melting</span>
                  </div>
                </div>
                <div className="shrink-0">
                  <Link href={categories[boredomLevel % 6].url}>
                    <div className="w-32 h-32 rounded-3xl bg-purple-600 flex flex-col items-center justify-center text-white cursor-pointer hover:rotate-6 transition-all shadow-xl shadow-purple-200 group">
                        <span className="text-4xl mb-1 group-hover:scale-125 transition-transform">{categories[boredomLevel % 6].emoji}</span>
                        <span className="text-[10px] font-black uppercase tracking-tighter">Fix It</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* BENTO GRID (SEO Optimized Titles) */}
          <section>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-black text-slate-900">Sites To Visit When Bored</h2>
                <p className="text-slate-500 font-bold">Hand-picked browser games and time killers</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                {categories.map((cat, i) => (
                <Link key={i} href={cat.url}>
                    <div className={`group relative h-56 md:h-72 rounded-[3rem] bg-gradient-to-br ${cat.color} p-8 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl active:scale-95`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="relative h-full flex flex-col justify-between z-10">
                        <div className="flex justify-between items-start">
                            <span className="bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest">{cat.tag}</span>
                            <span className="text-4xl md:text-5xl group-hover:scale-125 transition-transform">{cat.emoji}</span>
                        </div>
                        <div>
                        <h3 className="text-xl md:text-3xl font-black text-white mb-2 leading-tight">{cat.title}</h3>
                        <p className="text-white/70 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            {cat.desc} <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </p>
                        </div>
                    </div>
                    </div>
                </Link>
                ))}
            </div>
          </section>

          {/* SEO LONG-FORM CONTENT (Human Tone + Excel Keywords) */}
          <section className="bg-white rounded-[4rem] p-8 md:p-20 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
              <header className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
                    What is the <span className="text-red-600 italic">Bored Button</span>?
                </h2>
                <p className="text-slate-500 text-xl font-medium leading-relaxed">
                    We&apos;ve all been there. You&apos;re sitting at your desk, you&apos;ve refreshed your feed ten times, and you&apos;re thinking, <span className="text-slate-900 font-bold">&quot;Man, i am bored.&quot;</span>
                </p>
              </header>

              <div className="space-y-16 text-slate-600 text-lg leading-loose">
                <article className="space-y-6">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">The Best Websites When Bored</h3>
                  <p>
                    The internet is huge, but somehow, when you actually have time to kill, it feels empty. That&apos;s why we created this <strong>red button website</strong>. It isn&apos;t just a random link generator; it&apos;s a curated collection of the <strong>best games to play when bored</strong>. 
                  </p>
                  <p>
                    From <strong>browser games free</strong> to play to weird digital experiments, we have indexed the most entertaining corners of the web. Whether you are <strong>bored at school</strong> or just need a 5-minute break from work, our <strong>fun button</strong> is your escape hatch.
                  </p>
                </article>

                <div className="grid md:grid-cols-2 gap-10">
                    <div className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
                        <h3 className="text-xl font-black text-blue-900 mb-4 uppercase">Bored So Bored?</h3>
                        <p className="text-sm text-blue-800/80 leading-relaxed font-medium">
                            If you&apos;re feeling <strong>very bored</strong>, your brain is actually craving novelty. Our <strong>red button games</strong> are designed to give you that quick hit of &quot;Wait, what is this?&quot; that makes time fly by.
                        </p>
                    </div>
                    <div className="bg-pink-50 p-10 rounded-[3rem] border border-pink-100">
                        <h3 className="text-xl font-black text-pink-900 mb-4 uppercase">Unblocked Fun</h3>
                        <p className="text-sm text-pink-800/80 leading-relaxed font-medium">
                            Searching for <strong>im bored unblocked</strong>? Most of our <strong>online bored</strong> activities are lightweight and browser-based, making them perfect for those moments when you need a <strong>bored game</strong> that works anywhere.
                        </p>
                    </div>
                </div>

                <article className="space-y-6">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">How the Button Game Works</h3>
                  <p>
                    It&apos;s simple: you <strong>click red button</strong>, and we do the rest. You might find yourself playing a hidden <strong>old internet game</strong>, discovering a website that tracks lightning in real-time, or reading <strong>fun facts</strong> that sound fake but aren&apos;t. It&apos;s the ultimate <strong>random button</strong> experience.
                  </p>
                </article>

                {/* FAQ Section (SEO Rich) */}
                <div className="pt-20 border-t border-slate-100">
                   <h3 className="text-3xl font-black text-slate-900 mb-10 text-center">Frequently Asked Questions</h3>
                   <div className="grid gap-4">
                     {[
                       { q: "What should I do if I am bored?", a: "The best thing to do is engage your brain with something novel! Click our red button to find random games to play when bored, riddles, or interactive websites." },
                       { q: "Are these fun games to play while bored free?", a: "Yes, every single link and bored button game we provide is a free browser game." },
                       { q: "Is this the original Bored Button?", a: "We are a modern take on the classic 'im bored' concept, focusing on high-quality, 2026-ready fun games to do when your bored." }
                     ].map((faq, i) => (
                        <details key={i} className="group bg-slate-50 rounded-3xl p-6 cursor-pointer border border-transparent hover:border-purple-200 transition-all">
                            <summary className="list-none flex justify-between items-center font-black text-slate-800">
                                {faq.q}
                                <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 text-slate-600 font-medium text-sm">{faq.a}</p>
                        </details>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* NEWSLETTER */}
          <section className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Stay Cured.</h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto opacity-80 font-medium italic">Join 50k+ people who never say &quot;im so bored&quot; anymore.</p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input type="email" required placeholder="Email for weekly fun..." className="flex-grow px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50" />
              <button type="submit" className="px-8 py-4 bg-white text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95">Join Free</button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
}