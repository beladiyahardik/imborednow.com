import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

// --- Utilities ---
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

export default function BlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);

  const SITE_URL = "https://imborednow.com";
  const PAGE_TITLE = "The Rabbit Hole | Games & Articles to Kill Boredom";
  const PAGE_DESC = "Looking for online games to play when bored? Explore our curated articles, fun facts, and hidden internet gems. Press the button and escape reality.";

  const API_KEY = "AIzaSyDw4oUW9oN8DfN5u6CUgFJ5rE7CF512l_0";
  const BLOG_ID = "9008125657659692221";
  const BASE_URL = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=9`;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (token: string | null = null) => {
    const isInitial = !token;
    isInitial ? setLoading(true) : setLoadingMore(true);
    try {
      const url = token ? `${BASE_URL}&pageToken=${token}` : BASE_URL;
      const res = await fetch(url);
      const data = await res.json();
      if (data.items) {
        setPosts(prev => isInitial ? data.items : [...prev, ...data.items]);
      }
      setNextPageToken(data.nextPageToken || null);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESC} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-[#0F172A] text-slate-200 selection:bg-purple-500/30">

        {/* --- HERO SECTION --- */}
        <section className="relative pt-24 pb-20 px-4 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-purple-600/20 to-transparent blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Fresh Boredom Cures Daily
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-[0.9]">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">RABBIT</span> HOLE
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
              Deeper than the <strong>bored button</strong>. Explore curated <strong>online games to play when bored</strong>, bizarre internet mysteries, and digital toys.
            </p>
          </div>
        </section>

        {/* --- CONTENT GRID --- */}
        <main className="max-w-7xl mx-auto px-4 relative z-20">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-slate-800/50 rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {posts.map((post) => {
                const imageUrl = extractImage(post.content);
                const postSlug = `${slugify(post.title)}-${post.id}`;

                return (
                  <Link key={post.id} href={`/articles/${postSlug}`} className="block break-inside-avoid">
                    <article className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-purple-500/50 hover:bg-slate-800/80 shadow-2xl">
                      {imageUrl && (
                        <div className="relative h-48 overflow-hidden">
                          <img src={imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-100" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                        </div>
                      )}
                      <div className="p-7">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="h-[1px] w-8 bg-purple-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{new Date(post.published).toLocaleDateString()}</span>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                          {createExcerpt(post.content)}
                        </p>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}

          {nextPageToken && (
            <div className="mt-20 text-center">
              <button
                onClick={() => fetchPosts(nextPageToken)}
                disabled={loadingMore}
                className="px-12 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black text-lg hover:shadow-[0_0_40px_rgba(147,51,234,0.4)] transition-all active:scale-95 disabled:opacity-50"
              >
                {loadingMore ? "SUMMONING MORE..." : "EXPLORE MORE ARCHIVES"}
              </button>
            </div>
          )}
        </main>

        {/* --- SEO & UX CONTENT SECTION --- */}
        <section className="max-w-4xl mx-auto px-4 mt-32 py-20 border-t border-slate-800/50 text-center">
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">Wait... are you still bored?</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                We get it. The internet is a big place, but sometimes it feels empty. That's why we created the <strong>Rabbit Hole</strong>. While our <strong>red button website</strong> gives you instant satisfaction, these articles are for the deep divers. We cover everything from <strong>online games to play when bored</strong> to the most useless websites ever created.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-slate-900/30 p-8 rounded-3xl border border-slate-800">
                <h4 className="text-purple-400 font-bold mb-4 uppercase text-xs tracking-widest">Digital Playground</h4>
                <p className="text-sm text-slate-500">
                  Looking for <strong>games to play when your bored</strong>? Our collection includes physics toys, retro browser games, and procedural art tools that require zero installation.
                </p>
              </div>
              <div className="bg-slate-900/30 p-8 rounded-3xl border border-slate-800">
                <h4 className="text-orange-400 font-bold mb-4 uppercase text-xs tracking-widest">Why do we get bored?</h4>
                <p className="text-sm text-slate-500">
                  Boredom is actually a spark for creativity. When you click our <strong>random buttons</strong>, you aren't just wasting time—you're feeding your brain new patterns and <strong>amazing facts</strong>.
                </p>
              </div>
            </div>

            <div className="pt-10">
              <Link href="/">
                <button className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 mx-auto font-black uppercase text-xs tracking-[0.3em]">
                  ← Back to the Master Button
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}