import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

// --- Utilities (unchanged) ---
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
  return text.substring(0, 140) + "...";
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
  const PAGE_DESC = "Free online games to play when bored, curated articles, fun facts, and hidden internet gems. Escape boredom instantly.";

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
        <meta name="keywords" content="games to play when bored, online games, free browser games, bored button, rabbit hole, fun facts, boredom cure, unblocked games" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="ImBoredNow" />

        {/* Open Graph */}
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.imborednow.com/rabbit-hole" />
        <meta property="og:image" content="https://www.imborednow.com/logo.png" /> {/* Replace with real image */}
        <meta property="og:site_name" content="ImBoredNow" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESC} />
        <meta name="twitter:image" content="https://www.imborednow.com/logo.png" />

        {/* Other SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.imborednow.com/rabbit-hole" />
      </Head>

      <div className="min-h-screen bg-zinc-50 font-sans text-zinc-800">

        {/* Simple Hero */}
        <section className="bg-white py-20 border-b">
          <div className="max-w-4xl mx-auto px-6 text-center">

            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 mb-6">
              The Rabbit Hole
            </h1>

            <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
              Games to play when bored, deep-dive articles, fun facts, and hidden gems from the internet.
              One click deeper than the usual boredom button.
            </p>
          </div>
        </section>

        {/* Posts Grid – Clean & Professional */}
        <main className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post: any) => {
              const imageUrl = extractImage(post.content);
              const postSlug = `${slugify(post.title)}-${post.id}`;

              return (
                <Link key={post.id} href={`/articles/${postSlug}`} className="group block">
                  <div className="bg-white border border-zinc-100 rounded-3xl overflow-hidden hover:border-zinc-200 transition-all">
                    {imageUrl && (
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={post.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                    )}

                    <div className="p-8">
                      <div className="text-xs text-zinc-500 font-medium mb-3">
                        {new Date(post.published).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>

                      <h2 className="font-bold text-2xl leading-tight text-zinc-900 group-hover:text-zinc-700 transition-colors line-clamp-3 mb-4">
                        {post.title}
                      </h2>

                      <p className="text-zinc-600 text-[15px] leading-snug line-clamp-3">
                        {createExcerpt(post.content)}
                      </p>

                      <div className="mt-6 text-sm font-medium text-violet-600 flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read more <span className="text-lg">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {nextPageToken && (
            <div className="mt-20 text-center">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-16 py-5 bg-zinc-900 text-white font-semibold text-lg rounded-2xl hover:bg-black transition disabled:opacity-70"
              >
                {loadingMore ? "Loading more..." : "Load more articles"}
              </button>
            </div>
          )}
        </main>

        {/* Valuable SEO Content Section (kept & cleaned) */}
        <section className="bg-white border-t py-20">
          <div className="max-w-4xl mx-auto px-6 prose prose-zinc">
            <h2 className="text-4xl font-bold text-center text-zinc-900 mb-12">Still bored?</h2>

            <p className="text-lg text-zinc-600 leading-relaxed mb-12">
              We know how it feels. The internet is huge, but sometimes it feels empty.
              The Rabbit Hole is here for when the usual boredom button just isn’t enough.
              You’ll find free games, thoughtful articles, weird facts, and digital toys that actually make you think or laugh.
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="font-bold text-xl mb-4">Games to Play When Bored</h3>
                <p className="text-zinc-600">Instant browser games that load in seconds. No sign-up, no ads inside the game itself.</p>
              </div>
              <div>
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="font-bold text-xl mb-4">Deep Dives &amp; Fun Facts</h3>
                <p className="text-zinc-600">Articles that turn boredom into curiosity. Read once and feel smarter.</p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link href="/">
                <span className="inline-flex items-center gap-4 text-zinc-500 hover:text-zinc-900 font-medium text-sm uppercase tracking-widest transition-colors">
                  ← Back to the Master Button
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}