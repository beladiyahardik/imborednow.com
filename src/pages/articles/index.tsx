import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

// --- Utilities (Keep these outside the component) ---
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const createExcerpt = (html: string) => {
  const text = html.replace(/<[^>]*>?/gm, '');
  return text.substring(0, 120) + "...";
};

const extractImage = (html: string) => {
  const imgReg = /<img [^>]*src="([^"]+)"/;
  const match = imgReg.exec(html);
  return match ? match[1] : null;
};

// --- API Constants ---
const API_KEY = "AIzaSyDw4oUW9oN8DfN5u6CUgFJ5rE7CF512l_0";
const BLOG_ID = "9008125657659692221";
const BASE_URL = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=9`;

export async function getStaticProps() {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    return {
      props: {
        initialPosts: data.items || [],
        initialNextPageToken: data.nextPageToken || null,
      },
      // Revalidate every hour to catch new blog posts without a full rebuild
      revalidate: 3600,
    };
  } catch (error) {
    console.error("SSG Fetch Error:", error);
    return { props: { initialPosts: [], initialNextPageToken: null } };
  }
}

export default function BlogList({ initialPosts, initialNextPageToken }: any) {
  const [posts, setPosts] = useState(initialPosts);
  const [nextPageToken, setNextPageToken] = useState(initialNextPageToken);
  const [loadingMore, setLoadingMore] = useState(false);

  const PAGE_TITLE = "The Rabbit Hole | Games & Articles to Kill Boredom";
  const PAGE_DESC = "Looking for online games to play when bored? Explore our curated articles, fun facts, and hidden internet gems. Press the button and escape reality.";

  const handleLoadMore = async () => {
    if (!nextPageToken || loadingMore) return;
    setLoadingMore(true);

    try {
      const res = await fetch(`${BASE_URL}&pageToken=${nextPageToken}`);
      const data = await res.json();
      if (data.items) {
        setPosts((prev: any) => [...prev, ...data.items]);
      }
      setNextPageToken(data.nextPageToken || null);
    } catch (err) {
      console.error("Load More Error:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESC} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-[#0F172A] text-slate-200 selection:bg-purple-500/30 selection:text-white">

        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-24 px-4 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-purple-600/25 via-indigo-500/10 to-transparent blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-purple-400 text-[11px] font-black uppercase tracking-[0.25em] mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Fresh Boredom Cures Daily
            </div>
            <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.85] drop-shadow-2xl">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400">RABBIT</span> HOLE
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed italic">
              "Deeper than the <strong>bored button</strong>. Explore curated <strong>online games</strong>, bizarre mysteries, and digital toys."
            </p>
          </div>
        </section>

        {/* --- CONTENT GRID --- */}
        <main className="max-w-7xl mx-auto px-4 relative z-20">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {posts.map((post: any) => {
              const imageUrl = extractImage(post.content);
              const postSlug = `${slugify(post.title)}-${post.id}`;

              return (
                <Link key={post.id} href={`/articles/${postSlug}`} className="block break-inside-avoid transform transition-transform duration-300 hover:-translate-y-2">
                  <article className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-purple-500/40 hover:bg-slate-800/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
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
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="h-[2px] w-10 bg-gradient-to-r from-purple-500 to-pink-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                          {new Date(post.published).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
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

          {nextPageToken && (
            <div className="mt-24 pb-20 text-center">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="group relative px-14 py-6 bg-white text-black rounded-2xl font-black text-xl overflow-hidden transition-all active:scale-95 disabled:opacity-50"
              >
                <span className="relative z-10">{loadingMore ? "SUMMONING..." : "DESCEND DEEPER"}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          )}
        </main>

        {/* --- SEO & UX CONTENT SECTION --- */}
        <section className="max-w-5xl mx-auto px-4 mt-20 py-24 border-t border-slate-800/50">
          <div className="grid lg:grid-cols-3 gap-16 items-start">
            <div className="lg:col-span-1">
              <h3 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
                Wait... <br /><span className="text-purple-500 text-5xl">STILL BORED?</span>
              </h3>
              <Link href="/">
                <button className="group text-slate-500 hover:text-white transition-colors flex items-center gap-3 font-black uppercase text-[10px] tracking-[0.4em]">
                  <span className="group-hover:-translate-x-2 transition-transform">←</span> Return to Master Button
                </button>
              </Link>
            </div>

            <div className="lg:col-span-2 space-y-12">
              <p className="text-slate-400 leading-relaxed text-xl font-medium">
                We get it. The internet is a big place, but sometimes it feels empty. That's why we created the <strong className="text-slate-200">Rabbit Hole</strong>. While our <strong>red button website</strong> gives you instant satisfaction, these articles are for the deep divers.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2rem] border border-slate-700/50 shadow-xl">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 border border-purple-500/20">
                    <span className="text-purple-400">🎮</span>
                  </div>
                  <h4 className="text-white font-black mb-3 uppercase text-sm tracking-widest">Digital Playground</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Looking for <strong>games to play when your bored</strong>? Our collection includes physics toys, retro browser games, and procedural art tools.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2rem] border border-slate-700/50 shadow-xl">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 border border-orange-500/20">
                    <span className="text-orange-400">🧠</span>
                  </div>
                  <h4 className="text-white font-black mb-3 uppercase text-sm tracking-widest">The Boredom Spark</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Boredom is a spark for creativity. When you click our <strong>random buttons</strong>, you're feeding your brain new patterns and <strong>amazing facts</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}