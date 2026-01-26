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

const extractImage = (html: string) => {
  const imgReg = /<img [^>]*src="([^"]+)"/;
  const match = imgReg.exec(html);
  return match ? match[1] : null;
};

export default function BlogPost({ post, recommendations }: { post: any, recommendations: any[] }) {
  const router = useRouter();
  const [completion, setCompletion] = useState(0);

  const calculateReadingTime = (html: string) => {
    const text = html?.replace(/<[^>]*>/g, '') || "";
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / 225) || 1;
  };

  const readingTime = calculateReadingTime(post?.content);
  const cleanDescription = post?.content
    ? post.content.replace(/<[^>]*>/g, '').substring(0, 160).trim() + "..."
    : "Read this interesting article on ImBoredNow.";

  const ogImage = extractImage(post?.content || "") || "https://imborednow.com/default-og.png";
  const canonicalURL = `https://imborednow.com/articles/${slugify(post?.title || "")}-${post?.id}`;

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
    "publisher": { "@type": "Organization", "name": "ImBoredNow", "logo": { "@type": "ImageObject", "url": "https://imborednow.com/logo.png" } }
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

  if (router.isFallback) return <div className="min-h-screen bg-white flex items-center justify-center text-slate-400 font-medium tracking-widest animate-pulse uppercase">Syncing...</div>;
  if (!post) return null;

  return (
    <>
      <Head>
        <title>{post.title} | ImBoredNow</title>
        <meta name="description" content={cleanDescription} />
        <link rel="canonical" href={canonicalURL} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={cleanDescription} />
        <meta property="og:url" content={canonicalURL} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      {/* --- PROGRESS BAR --- */}
      <div className="fixed top-0 left-0 w-full h-1 z-[110] bg-slate-100">
        <div className="h-full bg-indigo-600 transition-all duration-150" style={{ width: `${completion}%` }} />
      </div>

      <div className="min-h-screen bg-white selection:bg-indigo-100">

        {/* Ad Space (Adjusted for Header visibility) */}
        {/* <div className="w-full bg-slate-50 py-3 flex justify-center border-b border-slate-100">
          <span className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.2em]">Partner Content</span>
        </div> */}

        <header className="max-w-4xl mx-auto pt-16 pb-12 px-6">
          <Link href="/articles" className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-8 inline-block bg-indigo-50 px-4 py-1.5 rounded-full hover:bg-indigo-600 hover:text-white transition-all">
            ← Back to archives
          </Link>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-10">
            {post.title}
          </h1>

          {/* AUTHOR CARD */}
          <div className="flex items-center justify-between py-8 border-y border-slate-100">
            <div className="flex items-center gap-4">
              <img src={post.author?.image?.url} className="w-14 h-14 rounded-2xl object-cover shadow-sm grayscale hover:grayscale-0 transition-all duration-500" alt={post.author?.displayName} />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Written By</p>
                <p className="font-bold text-slate-900 text-base">{post.author?.displayName}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-0.5">{readingTime} MIN READ</p>
              <p className="text-xs font-bold text-slate-400">{new Date(post.published).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 pb-32">
          <div className="flex flex-col lg:flex-row gap-16 items-start">

            {/* --- CONTENT AREA (Left) --- */}
            <div className="flex-1 max-w-3xl w-full overflow-hidden">
              <article className="w-full">
                <div
                  className="blog-content prose prose-slate prose-xl max-w-none
                    break-words [word-wrap:break-word] overflow-hidden
                    prose-p:text-slate-600 prose-p:leading-[1.8] prose-p:mb-8
                    prose-a:text-indigo-600 prose-a:font-bold prose-a:no-underline prose-a:border-b-2 prose-a:border-indigo-100 hover:prose-a:border-indigo-600 hover:prose-a:bg-indigo-50 transition-all
                    prose-img:rounded-3xl prose-img:shadow-xl
                    prose-headings:text-slate-900 prose-headings:font-black
                    [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-3xl
                  "
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>

              {/* END OF ARTICLE NAVIGATION */}
              <section className="mt-20 pt-20 border-t border-slate-100">
                <div className="flex items-center gap-4 mb-10">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 whitespace-nowrap">Explore More Artifacts</h3>
                  <div className="h-px w-full bg-slate-100" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {recommendations.slice(0, 2).map((item: any) => {
                    const thumb = extractImage(item.content);
                    return (
                      <Link key={item.id} href={`/articles/${slugify(item.title)}-${item.id}`} className="group block">
                        <div className="bg-white rounded-[2rem] border border-slate-100 p-5 shadow-sm hover:shadow-xl transition-all h-full">
                          {thumb && (
                            <div className="h-44 w-full mb-6 overflow-hidden rounded-2xl bg-slate-50">
                              <img src={thumb} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                            </div>
                          )}
                          <h4 className="font-bold text-lg text-slate-900 leading-tight mb-4 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 group-hover:text-indigo-600 transition-colors">View Deep Dive →</span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </section>
            </div>

            {/* --- STICKY SIDEBAR (Right) --- */}
            {/* Note: top-24 assumes your common header is about 80-90px tall. Adjust as needed. */}
            <aside className="w-full lg:w-80 lg:sticky lg:top-24 self-start">
              <div className="space-y-12">

                {/* Ad Space */}
                {/* <div className="w-full h-[300px] bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center text-center p-6 border-dashed">
                  <span className="text-[10px] text-slate-300 font-black uppercase tracking-widest">Ad Slot</span>
                </div> */}

                <section>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 pb-2 border-b border-slate-50">Recent Artifacts</h3>
                  <div className="space-y-8">
                    {recommendations.map((item: any) => (
                      <Link key={item.id} href={`/articles/${slugify(item.title)}-${item.id}`} className="block group">
                        <h4 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                      </Link>
                    ))}
                  </div>
                </section>

                <section className="p-8 bg-slate-900 rounded-[2.5rem] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl group-hover:bg-indigo-500/20 transition-all" />
                  <p className="relative z-10 text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-4">The Escape Route</p>
                  <Link href="/">
                    <button className="relative z-10 w-full py-5 bg-red-600 text-white font-black rounded-xl text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all active:scale-95 shadow-lg">
                      I&apos;m Still Bored 🔴
                    </button>
                  </Link>
                </section>
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
  const paths = data.items?.map((p: any) => ({
    params: { url: `${slugify(p.title)}-${p.id}` }
  })) || [];
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.url as string;
  const parts = slug.split("-");
  const id = parts[parts.length - 1];

  try {
    const postRes = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${id}?key=${API_KEY}`);
    const post = await postRes.json();
    if (!post || post.error) return { notFound: true };

    const recRes = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=10`);
    const recData = await recRes.json();
    const recommendations = recData.items?.filter((i: any) => i.id !== id).slice(0, 4) || [];

    return { props: { post, recommendations }, revalidate: 60 };
  } catch (err) {
    return { notFound: true };
  }
};