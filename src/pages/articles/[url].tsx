import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const API_KEY = "AIzaSyDw4oUW9oN8DfN5u6CUgFJ5rE7CF512l_0";
const BLOG_ID = "9008125657659692221";

// --- HELPERS ---
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

const extractImage = (html: string) => {
  const imgReg = /<img [^>]*src="([^"]+)"/;
  const match = imgReg.exec(html);
  return match ? match[1] : null;
};

const getHighResAuthorImage = (url?: string) => {
  if (!url) return "https://via.placeholder.com/400x400/eeeeee/999999?text=👤";
  return url.replace(/\/s\d+(-c)?\//, "/s400$1/");
};

const fetchAuthorDetails = async (profileUrl: string) => {
  if (!profileUrl) return { occupation: null, industry: null, gender: null, bio: null };

  try {
    const res = await fetch(profileUrl);
    const html = await res.text();

    const extractField = (label: string) => {
      const regex = new RegExp(`<th[^>]*>${label}</th>\\s*<td[^>]*>([\\s\\S]*?)</td>`, "i");
      const match = html.match(regex);
      return match ? match[1].replace(/<[^>]*>?/gm, "").trim() : null;
    };

    const extractBio = (htmlText: string) => {
      const patterns = [
        /<div[^>]*class=["'][^"']*aboutme[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
        /<div[^>]*id=["']aboutme["'][^>]*>([\s\S]*?)<\/div>/i,
        /<div[^>]*class=["'][^"']*profile-about[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
      ];
      for (const pattern of patterns) {
        const match = htmlText.match(pattern);
        if (match && match[1]) {
          const bio = match[1].replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
          if (bio.length > 30) return bio;
        }
      }
      return null;
    };

    return {
      occupation: extractField("Occupation"),
      industry: extractField("Industry"),
      gender: extractField("Gender"),
      bio: extractBio(html),
    };
  } catch (e) {
    return { occupation: null, industry: null, gender: null, bio: null };
  }
};

export default function BlogPost({ post, recommendations }: { post: any; recommendations: any[] }) {
  const router = useRouter();
  const [completion, setCompletion] = useState(0);

  const calculateReadingTime = (html: string) => {
    const text = html?.replace(/<[^>]*>/g, "") || "";
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / 225) || 1;
  };

  const readingTime = calculateReadingTime(post?.content);

  const cleanDescription = post?.content
    ? post.content.replace(/<[^>]*>/g, "").substring(0, 160).trim() + "..."
    : "Read this interesting article on ImBoredNow.";

  const ogImage = extractImage(post?.content || "") || "https://imborednow.com/default-og.png";
  const canonicalURL = `https://imborednow.com/articles/${slugify(post?.title || "")}-${post?.id}`;

  const publishedDate = new Date(post?.published).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const updatedDate = post?.updated !== post?.published
    ? new Date(post?.updated).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const jsonLdPost = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post?.title,
    image: [ogImage],
    datePublished: post?.published,
    dateModified: post?.updated,
    author: [
      {
        "@type": "Person",
        name: post?.author?.displayName,
        url: post?.author?.url,
      },
    ],
    description: cleanDescription,
    keywords: post?.labels || [],
    publisher: {
      "@type": "Organization",
      name: "ImBoredNow",
      logo: { "@type": "ImageObject", url: "https://imborednow.com/logo.png" },
    },
  };

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ImBoredNow",
    url: "https://imborednow.com",
    logo: "https://imborednow.com/logo.png",
    sameAs: ["https://twitter.com/imborednow"],
  };

  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) setCompletion(Number((window.scrollY / scrollHeight).toFixed(2)) * 100);
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

  if (router.isFallback) return <div className="min-h-screen bg-white flex items-center justify-center text-slate-400 font-medium tracking-widest animate-pulse uppercase">Syncing...</div>;
  if (!post) return null;

  return (
    <>
      <Head>
        <title>{post.title} | ImBoredNow</title>
        <meta name="description" content={cleanDescription} />
        <link rel="canonical" href={canonicalURL} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content={post.author?.displayName} />
        <meta name="keywords" content={post.labels?.join(", ") || ""} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={cleanDescription} />
        <meta property="og:url" content={canonicalURL} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="ImBoredNow" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:published_time" content={post.published} />
        <meta property="article:modified_time" content={post.updated} />
        <meta property="article:author" content={post.author?.displayName} />
        {post.labels?.map((label: string) => (
          <meta property="article:tag" content={label} key={label} />
        ))}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={cleanDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:creator" content="@imborednow" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPost) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }} />
      </Head>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[110] bg-slate-100">
        <div className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-150" style={{ width: `${completion}%` }} />
      </div>

      {/* BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <nav aria-label="Breadcrumb" className="flex text-xs text-slate-400 font-medium">
          <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/articles" className="hover:text-slate-600 transition-colors">Articles</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-600 font-semibold truncate max-w-[300px]">{post.title}</span>
        </nav>
      </div>

      <div className="min-h-screen bg-white selection:bg-indigo-100">
        <main className="max-w-7xl mx-auto px-6 pb-32">
          <div className="flex flex-col lg:flex-row gap-16 items-start lg:justify-center">

            {/* CENTERED CONTENT COLUMN */}
            <div className="w-full max-w-prose">

              <header className="pt-12 pb-16">
                <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-[-0.02em] mb-8">
                  {post.title}
                </h1>

                {/* Labels / Tags */}
                {post.labels && post.labels.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-10">
                    {post.labels.map((label: string) => (
                      <span
                        key={label}
                        className="text-xs font-semibold uppercase tracking-widest px-4 py-2 bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-700 rounded-2xl border border-indigo-100 hover:border-indigo-200 transition-all hover:scale-105"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                )}

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-slate-500 font-medium mb-12">
                  <div className="flex items-center gap-3">
                    <span className="text-indigo-600">📅</span>
                    <span>Published {publishedDate}</span>
                  </div>
                  {updatedDate && (
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-600">✏️</span>
                      <span>Updated {updatedDate}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <span className="text-indigo-600">⏱️</span>
                    <span>{readingTime} min read</span>
                  </div>
                </div>

                {/* Enhanced Author Card */}
                <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    <img
                      src={getHighResAuthorImage(post.author?.image?.url)}
                      className="w-24 h-24 rounded-2xl object-cover shadow ring-1 ring-slate-100 flex-shrink-0"
                      alt={post.author?.displayName}
                      loading="lazy"
                    />

                    <div className="flex-1 text-center sm:text-left">
                      <p className="uppercase text-[10px] font-black tracking-[0.3em] text-slate-400 mb-1">Written by</p>
                      <p className="text-2xl font-bold text-slate-900">{post.author?.displayName}</p>

                      {post.author?.details?.occupation && (
                        <p className="text-indigo-600 text-sm font-medium mt-1">{post.author.details.occupation}</p>
                      )}
                      {post.author?.details?.industry && (
                        <p className="text-slate-500 text-sm mt-0.5">{post.author.details.industry}</p>
                      )}

                      {post.author?.details?.bio && (
                        <p className="mt-4 text-slate-600 text-[15px] leading-relaxed line-clamp-4">{post.author.details.bio}</p>
                      )}

                      {post.author?.url && (
                        <a
                          href={post.author.url}
                          target="_blank"
                          rel="noopener noreferrer author"
                          className="mt-5 inline-flex items-center text-xs font-medium text-indigo-600 hover:underline"
                        >
                          View full profile →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </header>

              <article className="prose prose-slate prose-lg mx-auto">
                <div
                  className="blog-content prose-p:text-[20px] prose-p:leading-[1.85] prose-p:text-slate-700 prose-p:mb-10 prose-headings:font-extrabold prose-headings:tracking-[-0.015em] prose-headings:text-slate-900 prose-h1:text-5xl prose-h2:text-[2.25rem] prose-h3:text-2xl prose-h4:text-xl prose-a:text-indigo-600 prose-a:font-medium prose-a:underline-offset-4 hover:prose-a:text-indigo-700 prose-strong:font-semibold prose-strong:text-slate-900 prose-blockquote:border-l-4 prose-blockquote:border-indigo-300 prose-blockquote:pl-8 prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:text-slate-600 prose-blockquote:my-12 prose-li:text-[19px] prose-li:leading-[1.8] prose-li:my-3 prose-ul:my-10 prose-ol:my-10 prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-12 prose-img:-mx-4 lg:prose-img:-mx-8 [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-3xl [&_iframe]:my-12 [&_iframe]:shadow-xl break-words"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>

              {/* SOCIAL SHARE - Fixed + Icons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 border-t border-slate-100 pt-10">
                {/* X */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalURL)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 bg-[#000000] hover:bg-[#1DA1F2] text-white py-4 rounded-2xl font-semibold text-sm transition-all active:scale-95 shadow-sm"
                  aria-label="Share on X"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25L12 10.59 5.756 2.25H2.25L10.5 13.5 2.25 21.75H5.756L12 15.41 18.244 21.75H21.75L13.5 10.59 21.75 2.25Z" />
                  </svg>
                  <span className="group-hover:scale-110 transition-transform">X</span>
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalURL)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 bg-[#1877F2] text-white py-4 rounded-2xl font-semibold text-sm hover:brightness-110 transition-all active:scale-95 shadow-sm"
                  aria-label="Share on Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </a>

                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalURL)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 bg-[#0A66C2] text-white py-4 rounded-2xl font-semibold text-sm hover:brightness-110 transition-all active:scale-95 shadow-sm"
                  aria-label="Share on LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${canonicalURL}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-2xl font-semibold text-sm hover:brightness-110 transition-all active:scale-95 shadow-sm"
                  aria-label="Share on WhatsApp"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.485-.888-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.355L1.5 22.5l1.3-4.757a9.875 9.875 0 01-1.348-5.035 9.875 9.875 0 0110.02-9.875 9.875 9.875 0 019.875 9.875 9.875 9.875 0 01-9.875 9.875z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Recommendations */}
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
                        <div className="bg-white rounded-[2rem] border border-slate-100 p-5 shadow-sm hover:shadow-xl transition-all h-full overflow-hidden">
                          {thumb && (
                            <div className="h-44 w-full mb-6 overflow-hidden rounded-2xl bg-slate-50">
                              <img src={thumb} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                            </div>
                          )}
                          <h4 className="font-bold text-lg text-slate-900 leading-tight mb-4 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 group-hover:text-indigo-600 transition-colors">View Deep Dive →</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* SIDEBAR */}
            <aside className="w-full lg:w-80 lg:sticky lg:top-24 self-start">
              <div className="space-y-12">
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

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=500`);
  const data = await res.json();
  const paths = data.items?.map((p: any) => ({ params: { url: `${slugify(p.title)}-${p.id}` } })) || [];
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.url as string;
  const parts = slug.split("-");
  const id = parts[parts.length - 1];

  try {
    const postRes = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${id}?key=${API_KEY}`);
    const post = await postRes.json();
    if (!post || post.error) return { notFound: true };

    const authorDetails = await fetchAuthorDetails(post.author?.url);
    post.author.details = authorDetails;

    const recRes = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=20`);
    const recData = await recRes.json();
    const recommendations = recData.items?.filter((i: any) => i.id !== id).slice(0, 10) || [];

    return { props: { post, recommendations }, revalidate: 60 };
  } catch (err) {
    return { notFound: true };
  }
};