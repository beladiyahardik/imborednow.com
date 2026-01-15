import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

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
  return text.substring(0, 150) + "...";
};

const extractImage = (html: string) => {
  const imgReg = /<img [^>]*src="([^"]+)"/;
  const match = imgReg.exec(html);
  return match ? match[1] : null;
};

export default function BlogList() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);

  // SEO Constants
  const SITE_URL = "https://imborednow.com";
  const PAGE_PATH = "/articles";
  const FULL_URL = `${SITE_URL}${PAGE_PATH}`;
  const PAGE_TITLE = "The Rabbit Hole Blog | ImBoredNow - Escape the Boredom";
  const PAGE_DESC = "Explore the deep end of the internet. From tech tips to random facts, find something to cure your boredom in the Rabbit Hole.";
  const OG_IMAGE = `${SITE_URL}/og-image.png`;

  const API_KEY = "AIzaSyDw4oUW9oN8DfN5u6CUgFJ5rE7CF512l_0";
  const BLOG_ID = "9008125657659692221";
  const BASE_URL = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=6`;

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
      console.error("Blogger Fetch Error:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const colors = [
    "from-purple-600 to-blue-700",
    "from-orange-500 to-rose-500",
    "from-emerald-500 to-teal-600",
    "from-blue-500 to-cyan-500"
  ];

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESC} />
        <link rel="canonical" href={FULL_URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={FULL_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={PAGE_TITLE} />
        <meta property="twitter:description" content={PAGE_DESC} />
        <meta property="twitter:image" content={OG_IMAGE} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </Head>

      <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
        <section className="bg-slate-950 pt-20 pb-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(124,58,237,0.1),transparent)] pointer-events-none" />
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <nav className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full text-purple-300 text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-white/10">
              ⚡ Infinite Content Feed
            </nav>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
              BEYOND THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">BUTTON.</span>
            </h1>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-white rounded-[2.5rem] border border-slate-100" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, idx) => {
                  const imageUrl = extractImage(post.content);
                  const colorTheme = colors[idx % colors.length];
                  // GENERATE THE SLUG URL
                  const postSlug = `${slugify(post.title)}-${post.id}`;

                  return (
                    <Link key={post.id} href={`/articles/${postSlug}`}>
                      <article className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 h-full flex flex-col transition-all duration-500 hover:-translate-y-2">
                        <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${colorTheme}`}>
                          {imageUrl ? (
                            <img 
                              src={imageUrl} 
                              alt={post.title} 
                              className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-700 opacity-80" 
                              loading="lazy" 
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-6xl opacity-20">✨</div>
                          )}
                        </div>

                        <div className="p-8 flex flex-col flex-grow">
                          <h2 className="text-xl font-black mb-3 text-slate-800 leading-tight group-hover:text-purple-600 transition-colors">
                            {post.title}
                          </h2>
                          <p className="text-slate-500 text-sm mb-6 flex-grow">{createExcerpt(post.content)}</p>
                          <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              {new Date(post.published).toLocaleDateString()}
                            </span>
                            <span className="text-purple-600 font-black text-xs">GO →</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>

              {nextPageToken && (
                <div className="mt-16 text-center">
                  <button
                    onClick={() => fetchPosts(nextPageToken)}
                    disabled={loadingMore}
                    className="group relative px-12 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-black text-lg hover:border-purple-600 hover:text-purple-600 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {loadingMore ? "DIGGING DEEPER..." : "LOAD MORE ARTICLES 📂"}
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}