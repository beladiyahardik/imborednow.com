import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";

const API_KEY = "AIzaSyDw4oUW9oN8DfN5u6CUgFJ5rE7CF512l_0";
const BLOG_ID = "9008125657659692221";

export default function BlogPost({ post, recommendations }: { post: any, recommendations: any[] }) {
  const router = useRouter();
  const [completion, setCompletion] = useState(0);

  // 1. PERFORMANCE: Throttled Scroll Logic to prevent lagging
  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 2. INTERACTIVE: Native Share Functionality
  const handleShare = async () => {
    const shareData = {
      title: post?.title,
      text: "Check out this cool article on ImBoredNow!",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.log("Error sharing:", err);
    }
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post?.title)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  if (router.isFallback) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;
  if (!post) return null;

  return (
    <>
      <Head>
        <title>{post.title} | ImBoredNow</title>
      </Head>

      {/* FIXED PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-slate-100">
        <div 
          className="h-full bg-purple-600 transition-transform duration-75 origin-left"
          style={{ transform: `scaleX(${completion / 100})` }}
        />
      </div>

      <div className="min-h-screen bg-[#F8FAFC]">
        <header className="bg-slate-950 pt-24 pb-48 px-4 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto">
            <Link href="/articles" className="text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10 inline-block">
              ← Back to Feed
            </Link>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter mb-8">
              {post.title}
            </h1>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 -mt-28 relative z-20 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-8">
              <article className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-slate-100">
                <div 
                  className="blog-content" 
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />

                {/* UPDATED SHARE BUTTONS */}
                <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <img src={post.author?.image?.url} className="w-10 h-10 rounded-full" alt="" />
                      <span className="font-black text-xs uppercase tracking-widest">{post.author?.displayName}</span>
                   </div>
                   
                   <div className="flex gap-3">
                      <button 
                        onClick={handleShare}
                        className="h-12 px-6 flex items-center gap-2 rounded-2xl bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest hover:bg-purple-600 transition-all active:scale-95"
                      >
                        Share Story 🔗
                      </button>
                      <button 
                        onClick={handleTwitterShare}
                        className="h-12 w-12 flex items-center justify-center rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                      >
                        𝕏
                      </button>
                   </div>
                </div>
              </article>
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-10 bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
                <h3 className="font-black text-slate-900 uppercase tracking-tighter mb-8 italic">Up Next</h3>
                <div className="space-y-6">
                  {recommendations.map((item: any) => (
                    <Link key={item.id} href={`/articles/${item.id}`} className="block group">
                      <h4 className="font-bold text-sm text-slate-800 group-hover:text-purple-600 transition-colors leading-tight mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[9px] font-black text-slate-400 uppercase">{new Date(item.published).toLocaleDateString()}</p>
                    </Link>
                  ))}
                </div>
                <Link href="/">
                  <button className="w-full mt-10 py-5 bg-red-600 text-white font-black rounded-2xl text-xs hover:bg-red-500 transition-all">
                    I'M STILL BORED 🔴
                  </button>
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
  const paths = data.items?.map((p: any) => ({ params: { url: p.id.toString() } })) || [];
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const urlParam = params?.url;
  try {
    const postRes = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${urlParam}?key=${API_KEY}`);
    const post = await postRes.json();
    if (!post || post.error) return { notFound: true };

    const recRes = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=5`);
    const recData = await recRes.json();
    const recommendations = recData.items?.filter((i: any) => i.id !== urlParam).slice(0, 3) || [];

    return { props: { post, recommendations }, revalidate: 60 };
  } catch (err) {
    return { notFound: true };
  }
};