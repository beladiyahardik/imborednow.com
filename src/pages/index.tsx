import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";

// --- Utilities ---
const createExcerpt = (html: string) => {
  if (!html) return "";
  const text = html.replace(/<[^>]*>?/gm, "");
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
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

// --- API Constants ---
const NEWSLETTER_API_URL = "https://belbytes.com/APIs/imborednow/subscribe.php";

interface HomeProps {
  initialPosts: any[];
  initialSubscriberCount: number;
}

export default function Home({
  initialPosts,
  initialSubscriberCount,
}: HomeProps) {
  const [mounted, setMounted] = useState(false);

  // Newsletter states
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [subscriberCount, setSubscriberCount] = useState<number>(
    initialSubscriberCount,
  );

  useEffect(() => {
    setMounted(true);
    fetchSubscriberCount();
  }, []);

  const fetchSubscriberCount = async () => {
    try {
      const res = await fetch(NEWSLETTER_API_URL, {
        method: "GET",
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success && data.count !== undefined) {
        setSubscriberCount(data.count);
      }
    } catch (err) {
      console.error("Failed to update subscriber count:", err);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("");
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatusMessage("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(NEWSLETTER_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage("Successfully subscribed! 🎉");
        setEmail("");
        fetchSubscriberCount();
      } else {
        setStatusMessage(
          data.message || "Subscription failed. Please try again.",
        );
      }
    } catch (err) {
      setStatusMessage("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Bored Button: Games to Play When Bored & Fun Sites</title>
        <meta
          name="description"
          content="Stuck with nothing to do? Click the red button to find the best games to play when bored."
        />
      </Head>

      <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-purple-200">
        {/* --- 1. HERO SECTION --- */}
        <section className="relative pt-32 pb-44 px-4 overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <h1 className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter leading-[0.8] uppercase">
              Im{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-orange-500">
                Bored
              </span>
              <br />
              <span className="text-white/90 text-4xl md:text-6xl tracking-normal">
                Click The Button.
              </span>
            </h1>

            <p className="text-slate-400 max-w-xl mx-auto mb-12 text-lg md:text-xl font-medium leading-relaxed">
              If you&apos;re looking for{" "}
              <span className="text-white font-bold">
                games to play when bored
              </span>
              , you just found the jackpot. One click on the red button sends
              you to a random, amazing corner of the web.
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
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                The Ultimate Random Button Game
              </p>
            </div>
          </div>
        </section>

        {/* --- 2. MAIN CONTENT --- */}
        <main className="max-w-6xl mx-auto px-4 -mt-12 relative z-20 pb-20 md:space-y-24 space-y-12">
          {/* 2.1 THE DISCOVERY LAB */}
          <section className="bg-white/80 backdrop-blur-2xl md:p-10 p-6 md:rounded-[3.5rem] rounded-xl shadow-[0_30px_100px_rgba(0,0,0,0.1)] border border-white mx-auto">
            <header className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                The Discovery Lab 🧪
              </h2>
              <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-sm">
                Tools you didn&apos;t know you needed
              </p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Birthdate Secrets",
                  icon: "🎂",
                  desc: "Unlock the hidden cosmic data of your birthday.",
                  color: "bg-white text-blue-600 border-blue-50",
                  href: "/p/birthdate-calculator",
                },
                {
                  title: "History Timeline",
                  icon: "⏳",
                  desc: "Where do you stand in the history of the universe?",
                  color: "bg-white text-purple-600 border-purple-50",
                  href: "/p/history-timeline",
                },
                {
                  title: "Life Expectancy",
                  icon: "❤️",
                  desc: "A brutally honest look at your remaining days.",
                  color: "bg-white text-rose-600 border-rose-50",
                  href: "/p/life-expectancy-calculator",
                },
                {
                  title: "Lifestyle Factor",
                  icon: "⚖️",
                  desc: "Is your daily routine helping or hurting your future?",
                  color: "bg-white text-emerald-600 border-emerald-50",
                  href: "/p/life-style-factor",
                },
              ].map((tool, i) => (
                <Link key={i} href={tool.href}>
                  <div
                    className={`${tool.color} border-2 p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] flex items-center gap-4 md:gap-6 hover:shadow-xl transition-all cursor-pointer active:scale-[0.98]`}
                  >
                    <div className="w-14 h-10 md:w-20 md:h-20 bg-slate-50 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-4xl shadow-inner">
                      {tool.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-lg md:text-xl text-slate-900 mb-1">
                        {tool.title}
                      </h4>
                      <p className="text-slate-500 text-xs md:text-sm font-medium leading-tight">
                        {tool.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* 2.2 LATEST ARTICLES */}
          {/* <section className="bg-slate-950 p-6 md:p-16 md:rounded-[3.5rem] rounded-xl shadow-2xl border border-slate-900">
            <header className="mb-12">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                Latest from the Lab
              </h2>
              <div className="h-1 w-12 bg-purple-600 mt-2 rounded-full" />
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {initialPosts.slice(0, 3).map((post) => {
                const imageUrl = extractImage(post.content);
                const postSlug = `${slugify(post.title)}-${post.id}`;
                return (
                  <Link
                    key={post.id}
                    href={`/articles/${postSlug}`}
                    className="block break-inside-avoid transform transition-transform duration-300 hover:-translate-y-2"
                  >
                    <article className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-800/50 md:rounded-[2.5rem] rounded-xl overflow-hidden transition-all duration-500 hover:border-purple-500/40 hover:bg-slate-800/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-full flex flex-col">
                      {imageUrl && (
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={post.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                        </div>
                      )}
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 mb-5">
                          <span className="h-[2px] w-10 bg-gradient-to-r from-purple-500 to-pink-500" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                            {new Date(post.published).toLocaleDateString(
                              undefined,
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        <h2 className="text-2xl font-black text-white mb-4 group-hover:text-purple-300 transition-colors leading-tight">
                          {post.title}
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 font-medium">
                          {createExcerpt(post.content)}
                        </p>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section> */}
          <section className="bg-slate-950 p-6 md:p-16 md:rounded-[3.5rem] rounded-xl shadow-2xl border border-slate-900">
            <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                  Latest from the Lab
                </h2>
                <div className="h-1 w-12 bg-purple-600 mt-2 rounded-full" />
              </div>

              {/* Desktop "View All" Link - Hidden on mobile, visible on MD+ */}
              <Link
                href="/articles"
                className="hidden md:flex items-center gap-2 text-slate-400 hover:text-purple-400 font-bold uppercase text-sm tracking-widest transition-colors group"
              >
                Browse All Articles
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {initialPosts.slice(0, 3).map((post) => {
                const imageUrl = extractImage(post.content);
                const postSlug = `${slugify(post.title)}-${post.id}`;
                return (
                  <Link
                    key={post.id}
                    href={`/articles/${postSlug}`}
                    className="block break-inside-avoid transform transition-transform duration-300 hover:-translate-y-2"
                  >
                    <article className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-800/50 md:rounded-[2.5rem] rounded-xl overflow-hidden transition-all duration-500 hover:border-purple-500/40 hover:bg-slate-800/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-full flex flex-col">
                      {imageUrl && (
                        <div className="relative h-48 md:h-64 overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={post.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                        </div>
                      )}
                      <div className="p-6 md:p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 mb-4 md:mb-5">
                          <span className="h-[2px] w-8 md:w-10 bg-gradient-to-r from-purple-500 to-pink-500" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                            {new Date(post.published).toLocaleDateString(
                              undefined,
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-black text-white mb-4 group-hover:text-purple-300 transition-colors leading-tight">
                          {post.title}
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 font-medium">
                          {createExcerpt(post.content)}
                        </p>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>

            {/* Mobile "View All" Button - Centered and prominent for thumb-tapping */}
            <div className="mt-10 md:hidden flex justify-center">
              <Link href="/articles" className="w-full">
                <button className="w-full py-4 px-6 bg-slate-900 border border-slate-800 text-slate-300 font-black uppercase tracking-widest text-xs rounded-xl active:scale-95 transition-all">
                  Browse All Articles 🔎
                </button>
              </Link>
            </div>
          </section>

          {/* 2.3 SEO LONG-FORM CONTENT */}
          <section className="bg-white rounded-[4rem] p-8 md:p-20 md:rounded-[3.5rem] rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
              <header className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
                  What is the{" "}
                  <span className="text-red-600 italic">Bored Button</span>?
                </h2>
                <p className="text-slate-500 text-xl font-medium leading-relaxed">
                  We&apos;ve all been there. You&apos;re sitting at your desk,
                  thinking,{" "}
                  <span className="text-slate-900 font-bold">
                    &quot;Man, i am bored.&quot;
                  </span>
                </p>
              </header>

              <div className="space-y-16 text-slate-600 text-lg leading-loose">
                <article className="space-y-6">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                    The Best Websites When Bored
                  </h3>
                  <p>
                    The internet is huge, but somehow, when you actually have
                    time to kill, it feels empty. That&apos;s why we created
                    this <strong>red button website</strong>. It isn&apos;t just
                    a random link generator; it&apos;s a curated collection of
                    the <strong>best games to play when bored</strong>.
                  </p>
                  <p>
                    From <strong>browser games free</strong> to play to weird
                    digital experiments, we have indexed the most entertaining
                    corners of the web. Perfect for when you are{" "}
                    <strong>bored at school</strong> or work.
                  </p>
                </article>

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="bg-blue-50 md:p-10 p-6 md:rounded-[3rem] rounded-xl border border-blue-100">
                    <h3 className="text-xl font-black text-blue-900 mb-4 uppercase">
                      Bored So Bored?
                    </h3>
                    <p className="text-sm text-blue-800/80 leading-relaxed font-medium">
                      If you&apos;re feeling <strong>very bored</strong>, your
                      brain is actually craving novelty. Our{" "}
                      <strong>red button games</strong> give you that quick hit
                      of discovery.
                    </p>
                  </div>
                  <div className="bg-pink-50 md:p-10 p-6 md:rounded-[3rem] rounded-xl border border-pink-100">
                    <h3 className="text-xl font-black text-pink-900 mb-4 uppercase">
                      Unblocked Fun
                    </h3>
                    <p className="text-sm text-pink-800/80 leading-relaxed font-medium">
                      Searching for <strong>im bored unblocked</strong>? Most of
                      our <strong>online bored</strong> activities are
                      lightweight and browser-based.
                    </p>
                  </div>
                </div>

                <div className="md:pt-20 pt-10 border-t border-slate-100">
                  <h3 className="text-3xl font-black text-slate-900 mb-10 text-center">
                    Frequently Asked Questions
                  </h3>
                  <div className="grid gap-4">
                    {[
                      {
                        q: "What should I do if I am bored?",
                        a: "Engage your brain with something novel! Click our red button for random games, riddles, or interactive websites.",
                      },
                      {
                        q: "Are these games free?",
                        a: "Yes, every single link and bored button game we provide is a free browser game.",
                      },
                      {
                        q: "Is this the original Bored Button?",
                        a: "We are a modern take on the classic 'im bored' concept, focusing on high-quality fun.",
                      },
                    ].map((faq, i) => (
                      <details
                        key={i}
                        className="group bg-slate-50 md:rounded-3xl rounded-xl md:p-6 p-4 cursor-pointer border border-transparent hover:border-purple-200 transition-all"
                      >
                        <summary className="list-none flex justify-between items-center font-black text-slate-800">
                          {faq.q}
                          <span className="text-purple-600 group-open:rotate-180 transition-transform">
                            ▼
                          </span>
                        </summary>
                        <p className="mt-4 text-slate-600 font-medium text-sm">
                          {faq.a}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2.4 NEWSLETTER */}
          <section className="bg-gradient-to-r from-purple-600 to-indigo-700 md:rounded-[3rem] rounded-xl p-8 md:p-20 text-center text-white relative overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
              Stay Cured.
            </h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto opacity-80 font-medium italic">
              Join {subscriberCount.toLocaleString()} people who never say
              &quot;im so bored&quot; anymore.
            </p>

            <form
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
              onSubmit={handleSubscribe}
            >
              <input
                type="email"
                required
                placeholder="Email for weekly fun..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-6 py-4 md:rounded-2xl rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-4 bg-white text-indigo-600 font-black md:rounded-2xl rounded-xl hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 disabled:opacity-70 shadow-lg"
              >
                {submitting ? "Joining..." : "Join Free"}
              </button>
            </form>

            {statusMessage && (
              <p
                className={`mt-6 text-lg font-bold ${statusMessage.includes("Successfully") ? "text-green-200" : "text-red-200"}`}
              >
                {statusMessage}
              </p>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const API_KEY = "AIzaSyDw4oUW9oN8DfN5u6CUgFJ5rE7CF512l_0";
  const BLOG_ID = "9008125657659692221";
  const BLOGGER_URL = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=3`;

  let initialPosts = [];
  let initialSubscriberCount = 50000;

  try {
    const res = await fetch(BLOGGER_URL);
    const data = await res.json();
    if (data.items) initialPosts = data.items;
  } catch (err) {
    console.error("SSG Error:", err);
  }

  try {
    const res = await fetch(NEWSLETTER_API_URL);
    const data = await res.json();
    if (data.success && data.count !== undefined)
      initialSubscriberCount = data.count;
  } catch (err) {
    console.error("SSG Error:", err);
  }

  return {
    props: { initialPosts, initialSubscriberCount },
    revalidate: 3600,
  };
};
