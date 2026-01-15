import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const API_KEY = "AIzaSyDw4oUW9oN8DfN5u6CUgFJ5rE7CF512l_0";
const BLOG_ID = "9008125657659692221";

const slugify = (text: string) => {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');
};

export default function BlogPost({ post, recommendations }: { post: any, recommendations: any[] }) {
  const router = useRouter();
  const [completion, setCompletion] = useState(0);

  // --- SEO HELPER LOGIC ---
  // Clean HTML to get a pure text description
  const cleanDescription = post?.content
    ? post.content.replace(/<[^>]*>/g, '').substring(0, 160).trim() + "..."
    : "Read this interesting article on ImBoredNow.";

  // Extract the first image from content for Open Graph
  const extractOgImage = (html: string) => {
    const imgReg = /<img [^>]*src="([^"]+)"/;
    const match = imgReg.exec(html);
    return match ? match[1] : "https://imborednow.com/default-og.png";
  };

  const ogImage = extractOgImage(post?.content || "");
  const canonicalURL = `https://imborednow.com/articles/${slugify(post?.title || "")}-${post?.id}`;

  // --- JSON-LD SCHEMA (The Secret Sauce for E-E-A-T) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post?.title,
    "image": [ogImage],
    "datePublished": post?.published,
    "dateModified": post?.updated,
    "author": [{
      "@type": "Person",
      "name": post?.author?.displayName,
      "url": post?.author?.url
    }],
    "description": cleanDescription,
    "publisher": {
      "@type": "Organization",
      "name": "ImBoredNow",
      "logo": {
        "@type": "ImageObject",
        "url": "https://imborednow.com/logo.png"
      }
    }
  };

  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) setCompletion(Number((window.scrollY / scrollHeight).toFixed(2)) * 100);
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { window.requestAnimationFrame(updateScroll); ticking = true; } };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (router.isFallback) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;
  if (!post) return null;

  return (
    <>
      <Head>
        {/* --- PRIMARY META TAGS --- */}
        <title>{post.title} | ImBoredNow</title>
        <meta name="description" content={cleanDescription} />
        <link rel="canonical" href={canonicalURL} />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* --- OPEN GRAPH (Facebook / Discord / LinkedIn) --- */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={cleanDescription} />
        <meta property="og:url" content={canonicalURL} />
        <meta property="og:site_name" content="ImBoredNow" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="article:published_time" content={post.published} />
        <meta property="article:author" content={post.author?.displayName} />

        {/* --- TWITTER CARD --- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={cleanDescription} />
        <meta name="twitter:image" content={ogImage} />

        {/* --- SCHEMA MARKUP --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* UI Elements remain the same... */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-slate-100">
        <div className="h-full bg-purple-600 transition-transform duration-75 origin-left" style={{ transform: `scaleX(${completion / 100})` }} />
      </div>

      <div className="min-h-screen bg-[#F8FAFC]">
        <header className="bg-slate-950 pt-24 pb-48 px-4 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto">
            <Link href="/articles" className="text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10 inline-block">← Back to Feed</Link>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter mb-8">{post.title}</h1>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 -mt-28 relative z-20 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <article className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-slate-100">
                {/* Use 'prose' classes to help Google understand content hierarchy */}
                <div className="blog-content prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

                <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={post.author?.image?.url} className="w-10 h-10 rounded-full" alt={post.author?.displayName} />
                    <div className="flex flex-col">
                      <span className="font-black text-xs uppercase tracking-widest">{post.author?.displayName}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Published {new Date(post.published).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-10 bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
                <h3 className="font-black text-slate-900 uppercase tracking-tighter mb-8 italic">Up Next</h3>
                <div className="space-y-6">
                  {recommendations.map((item: any) => (
                    <Link key={item.id} href={`/articles/${slugify(item.title)}-${item.id}`} className="block group">
                      <h4 className="font-bold text-sm text-slate-800 group-hover:text-purple-600 transition-colors leading-tight mb-1">{item.title}</h4>
                      <p className="text-[9px] font-black text-slate-400 uppercase">{new Date(item.published).toLocaleDateString()}</p>
                    </Link>
                  ))}
                </div>
                <Link href="/">
                  <button className="w-full mt-10 py-5 bg-red-600 text-white font-black rounded-2xl text-xs hover:bg-red-500 transition-all shadow-lg active:scale-95">I&apos;M STILL BORED 🔴</button>
                </Link>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}

// --- DATA LOGIC ---
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=10`);
  const data = await res.json();
  // Generate paths using the Slug-ID format
  const paths = data.items?.map((p: any) => ({
    params: { url: `${slugify(p.title)}-${p.id}` }
  })) || [];
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.url as string;
  // Extract ID from the end of the slug
  const parts = slug.split("-");
  const id = parts[parts.length - 1];

  try {
    const postRes = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${id}?key=${API_KEY}`);
    const post = await postRes.json();
    if (!post || post.error) return { notFound: true };

    const recRes = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=10`);
    const recData = await recRes.json();
    // Filter out current post and limit to 3 recommendations
    const recommendations = recData.items?.filter((i: any) => i.id !== id).slice(0, 3) || [];

    return { props: { post, recommendations }, revalidate: 60 };
  } catch (err) {
    return { notFound: true };
  }
};