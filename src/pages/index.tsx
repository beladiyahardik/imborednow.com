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
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export default function Home() {
  const [boredomLevel, setBoredomLevel] = useState<any>(50);
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "AIzaSyDw4oUW9oN8DfN5u6CUgFJ5rE7CF512l_0";
  const BLOG_ID = "9008125657659692221";
  const BASE_URL = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=3`;

  useEffect(() => {
    setMounted(true);
    fetchLatestPosts();
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
    { title: "Boredom Trivia", emoji: "🧠", color: "from-indigo-600 to-blue-700", url: "/p/trivia", tag: "Hot", desc: "Test your brain" },
    { title: "Quick DIY Craft", emoji: "✨", color: "from-orange-500 to-rose-500", url: "/p/diy-craft", tag: "New", desc: "Create something" },
    { title: "Mind Riddles", emoji: "🧩", color: "from-purple-600 to-pink-600", url: "/p/mind-bending-riddle", tag: "Brainy", desc: "Logic puzzles" },
    { title: "Random Jokes", emoji: "😂", color: "from-blue-500 to-cyan-500", url: "/p/random-jokes", tag: "Funny", desc: "Laugh out loud" },
    { title: "Weird Web", emoji: "🌐", color: "from-rose-500 to-orange-500", url: "/p/weird-websites", tag: "Strange", desc: "Internet rabbit holes" },
    { title: "Animal Facts", emoji: "🦁", color: "from-emerald-500 to-teal-600", url: "/p/crazy-animal-fact", tag: "Cool", desc: "Wild discoveries" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Bored Button / ImBoredNow",
    "operatingSystem": "Any",
    "applicationCategory": "EntertainmentApplication",
    "offers": { "@type": "Offer", "price": "0" },
    "description": "The ultimate collection of fun games and websites to play when bored at school or work. Discover the best boredom killers and random activities instantly."
  };

  return (
    <>
      <Head>
        <title>Bored Button: Best Games & Sites to Cure Boredom Now</title>
        <meta name="description" content="Feeling bored at school, work, or home? Click the red Bored Button for 100+ random interactive games, cool websites, and fun activities to cure boredom instantly." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
              BEAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">BOREDOM</span><br />IN SECONDS.
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg font-medium">
              The internet&apos;s favorite &quot;I&quot;m Bored&quot; button. Discover 100+ random fun games, crazy facts, and interactive tools to kill time.
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
          {/* --- 2. INTERACTIVE BOREDOM METER --- */}
          {mounted && (
            <section className="bg-white p-8 rounded-[3rem] shadow-2xl border border-purple-100 max-w-3xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">How bored are you right now?</h2>
                <p className="text-slate-500 text-sm">Slide to get a custom recommendation</p>
              </div>
              <input type="range" min="1" max="100" value={boredomLevel} onChange={(e) => setBoredomLevel(e.target.value)} className="w-full h-4 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-purple-600" />
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
                    <div className="absolute top-[-5%] right-[-5%] text-8xl md:text-9xl opacity-15 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">{cat.emoji}</div>
                    <div className="relative h-full flex flex-col justify-between">
                      <span className="self-start bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-white uppercase tracking-widest">{cat.tag}</span>
                      <div>
                        <h3 className="text-lg md:text-2xl font-black text-white mb-1">{cat.title}</h3>
                        <p className="text-white/80 text-[10px] uppercase font-bold tracking-widest group-hover:translate-x-2 transition-transform">{cat.desc} →</p>
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
                <h3 className="text-2xl font-black text-slate-800 mb-4">Why don&apos;t scientists trust atoms?</h3>
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
                  <h3 className="text-2xl font-black text-white mb-4">Honey never spoils. Archaeologists found edible honey in 3,000-year-old tombs!</h3>
                  <p className="text-indigo-300 font-bold uppercase text-[10px] tracking-[0.2em]">Learn More Facts →</p>
                </div>
              </article>
            </Link>
          </section>

          {/* --- 5. THE DISCOVERY LAB --- */}
          <section>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-8 px-2">
              <header>
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">The Discovery Lab <span className="animate-pulse">🧪</span></h2>
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
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-sm group-hover:rotate-6 transition-transform">{tool.icon}</div>
                    <div>
                      <h4 className="font-black text-lg leading-tight mb-1">{tool.title}</h4>
                      <p className="text-slate-600 text-xs font-bold opacity-80 leading-snug">{tool.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* --- 6. LATEST FROM THE RABBIT HOLE (SLUG-ID IMPLEMENTED) --- */}
          <section>
            <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="text-2xl font-black text-slate-900">The Rabbit Hole 📂</h2>
              <Link href="/articles" className="text-[10px] font-black uppercase tracking-widest text-purple-600 hover:underline">View All Posts →</Link>
            </div>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                {[...Array(3)].map((_, i) => <div key={i} className="h-64 bg-slate-100 rounded-[2.5rem]" />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map((post) => {
                  const imageUrl = extractImage(post.content);
                  const postSlug = `${slugify(post.title)}-${post.id}`;
                  return (
                    <Link key={post.id} href={`/articles/${postSlug}`}>
                      <article className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer h-full flex flex-col">
                        <div className="h-40 bg-slate-100 overflow-hidden relative">
                          {imageUrl ? (
                            <img src={imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          ) : (
                            <div className="flex items-center justify-center h-full text-4xl">✨</div>
                          )}
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="font-black text-slate-800 group-hover:text-purple-600 transition-colors mb-2 line-clamp-2">{post.title}</h3>
                          <p className="text-slate-500 text-xs font-medium line-clamp-2 flex-grow">{createExcerpt(post.content)}</p>
                          <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{new Date(post.published).toLocaleDateString()}</span>
                            <span className="text-purple-600 font-black text-[10px]">READ →</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          {/* --- 7. SEO LONG-FORM CONTENT --- */}
          <section className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-sm">
            <div className="max-w-4xl mx-auto prose prose-slate prose-lg">
              <h2 className="text-4xl font-black text-slate-900 mb-8 text-center">The Science of Boredom: Why We Get Bored and How to Fix It</h2>
              <div className="space-y-12 text-slate-600 leading-relaxed">
                <div>
                  <h3 className="text-2xl font-black text-purple-600 uppercase mb-4">What is the Bored Button?</h3>
                  <p>The <strong>Bored Button</strong> is more than just a red circle on a screen; it is an interactive gateway to the most entertaining, educational, and downright "weird" parts of the internet. Our mission is simple: to provide an instant solution for anyone saying <strong>"I'm bored"</strong> at school, work, or home.</p>
                  <p>In an age of endless scrolling and passive consumption, the Bored Button encourages active engagement. Whether it's a <strong>random game</strong>, a mind-bending riddle, or a deep dive into an obscure Wikipedia rabbit hole, we curate content that sparks curiosity and keeps the brain active.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <div>
                    <h3 className="text-xl font-black text-slate-800 mb-3">Why Do We Feel Bored?</h3>
                    <p className="text-sm">Boredom is actually an evolutionary signal. It’s your brain’s way of telling you that you aren’t reaching your full cognitive potential in the current moment. When you are <strong>bored at work</strong>, your mind is craving a challenge or a novel stimulus. The Bored Button provides that "dopamine hit" safely and productively.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 mb-3">Health Benefits of Fun</h3>
                    <p className="text-sm">Taking short "micro-breaks" to play <strong>fun online games</strong> has been shown to improve overall productivity. By stepping away from a stressful task for 5 minutes to solve a riddle or read a funny joke, you reset your focus and reduce cortisol levels.</p>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-purple-600 uppercase text-center mt-12">Top 10 Things to Do When Bored (Beyond the Button)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Learn a new magic trick using household items.", "Explore 'The Useless Web' for hidden internet gems.", "Practice mindfulness with a 2-minute breathing exercise.", "Try a DIY craft using only recycled paper.", "Take a virtual tour of a world-famous museum.", "Learn five words in a completely new language.", "Solve a logic puzzle or Sudoku to sharpen your mind.", "Listen to a '10-minute' mystery podcast episode.", "Write a letter to your future self 10 years from now.", "Challenge a friend to a quick online trivia battle."].map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start p-4 bg-white border border-slate-100 rounded-2xl">
                      <span className="text-purple-600 font-black">{idx + 1}.</span>
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <h2 className="text-3xl font-black text-slate-900 pt-8 border-t border-slate-100">The Ultimate Guide to Curing Boredom at School or Work</h2>
                <p>Finding <strong>unblocked games for school</strong> can be a challenge. We focus on lightweight, browser-based experiences that don't require heavy downloads or high-end hardware. Our platform is optimized for speed, ensuring that even on slower connections, you can find <strong>websites to go to when bored</strong> without the frustration of long load times.</p>
                <h3 className="text-xl font-black text-slate-800">1. Interactive Riddles and Logic Puzzles</h3>
                <p>Nothing kills boredom faster than a challenge. Our <strong>mind riddles</strong> section is designed to test your lateral thinking. These aren't just for kids; we have complex puzzles that will keep adults scratching their heads for hours.</p>
                <h3 className="text-xl font-black text-slate-800">2. Weird and Wonderful Websites</h3>
                <p>Have you ever seen a website that just lets you pet a virtual cat? Or a site that maps every lightning strike happening on Earth in real-time? The "Weird Web" category is a curated list of these digital oddities that remind us why the internet was invented in the first place—for fun!</p>
                <h3 className="text-xl font-black text-slate-800">3. Educational But Entertaining Facts</h3>
                <p>Did you know that a group of flamingos is called a "flamboyance"? Or that there are more trees on Earth than stars in the Milky Way? Our <strong>animal facts</strong> and <strong>trivia</strong> sections make sure that even while you're procrastinating, you're still learning something new.</p>
                <h2 className="text-3xl font-black text-slate-900">Frequently Asked Questions (FAQ)</h2>
                <div className="space-y-6">
                  {[{ q: "Is the Bored Button free to use?", a: "Yes! Every game, fact, and tool on our site is 100% free with no registration required." }, { q: "Are these games unblocked at school?", a: "Most of our content is designed to be accessible on restricted networks, making them great for breaks between classes." }, { q: "How many activities are behind the red button?", a: "We currently have over 100+ unique activities, and we add new 'boredom killers' every single week." }, { q: "Can I submit my own 'weird website'?", a: "Absolutely! We love discovering new corners of the web. Contact our team to submit your favorite time-wasters." }].map((faq, i) => (
                    <div key={i} className="border-b border-slate-100 pb-6">
                      <h4 className="font-black text-slate-800 mb-2">Q: {faq.q}</h4>
                      <p className="text-slate-600 text-sm">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* --- 8. NEWSLETTER --- */}
          <section className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Never be bored again.</h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto opacity-80 font-medium">Join 50,000+ humans getting a weekly dose of internet magic.</p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input type="email" required placeholder="Your email address" className="flex-grow px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50" />
              <button type="submit" className="px-8 py-4 bg-white text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95">Join Free</button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
}