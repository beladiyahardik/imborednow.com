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
  if (!url) return "https://via.placeholder.com/400x400/6366f1/ffffff?text=Author";
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

  const ogImage = extractImage(post?.content || "") || "https://www.imborednow.com/logo.png";
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

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-indigo-600 font-semibold text-lg animate-pulse">Loading your escape from boredom...</p>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <>
      <Head>
        <title>{post.title} | I'm Bored Now</title>
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

      {/* Vibrant Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[110] bg-slate-100/50 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg shadow-indigo-500/50 transition-all duration-300"
          style={{ width: `${completion}%` }}
        />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

        {/* Sticky Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/articles" className="group flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold">
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>All Articles</span>
              </Link>

              <div className="flex items-center gap-6">
                <Link href="/" className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold text-sm hover:shadow-lg hover:shadow-indigo-500/50 transition-all hover:scale-105">
                  I'm Still Bored
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 py-12">

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500 mb-12">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/articles" className="hover:text-indigo-600 transition-colors">Articles</Link>
            <span>›</span>
            <span className="text-slate-900 font-medium truncate max-w-[300px]">{post.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* MAIN CONTENT */}
            <div className="lg:col-span-8">

              {/* Article Header */}
              <header className="mb-16">

                {/* Labels */}
                {post.labels && post.labels.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-8">
                    {post.labels.slice(0, 4).map((label: string) => (
                      <span
                        key={label}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-10 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900">
                  {post.title}
                </h1>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 mb-12 pb-8 border-b-2 border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                      📅
                    </div>
                    <span className="font-medium">{publishedDate}</span>
                  </div>
                  {updatedDate && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                        ✏️
                      </div>
                      <span className="font-medium">Updated {updatedDate}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white">
                      ⏱️
                    </div>
                    <span className="font-medium">{readingTime} min read</span>
                  </div>
                </div>

                {/* Author Card */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border-2 border-indigo-100 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="relative group flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                      <img
                        src={getHighResAuthorImage(post.author?.image?.url)}
                        className="relative w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-xl"
                        alt={post.author?.displayName}
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">Written by</p>
                      <h2 className="text-2xl font-black text-slate-900 mb-1">{post.author?.displayName}</h2>

                      {post.author?.details?.occupation && (
                        <p className="text-indigo-600 font-semibold mb-1">{post.author.details.occupation}</p>
                      )}
                      {post.author?.details?.industry && (
                        <p className="text-slate-600 text-sm mb-4">{post.author.details.industry}</p>
                      )}

                      {post.author?.details?.bio && (
                        <p className="text-slate-700 leading-relaxed mb-4">{post.author.details.bio}</p>
                      )}

                      {post.author?.url && (
                        <a
                          href={post.author.url}
                          target="_blank"
                          rel="noopener noreferrer author"
                          className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-purple-600 transition-colors group/link"
                        >
                          <span>View Profile</span>
                          <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </header>

              {/* Article Content with Fixed Lists */}
              <article className="prose prose-lg max-w-none">
                <style jsx global>{`
                  .blog-content {
                    font-size: 1.125rem;
                    line-height: 1.8;
                    color: #1e293b;
                  }
                  
                  .blog-content p {
                    margin-bottom: 1.5rem;
                  }
                  
                  .blog-content h2 {
                    font-size: 2rem;
                    font-weight: 800;
                    margin-top: 3rem;
                    margin-bottom: 1.5rem;
                    color: #0f172a;
                    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                  }
                  
                  .blog-content h3 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-top: 2.5rem;
                    margin-bottom: 1.25rem;
                    color: #334155;
                  }
                  
                  .blog-content h4 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: #475569;
                  }
                  
                  .blog-content a {
                    color: #6366f1;
                    text-decoration: underline;
                    text-decoration-color: #6366f1;
                    text-underline-offset: 3px;
                    font-weight: 600;
                    transition: all 0.2s;
                  }
                  
                  .blog-content a:hover {
                    color: #7c3aed;
                    text-decoration-color: #7c3aed;
                  }
                  
                  .blog-content img {
                    border-radius: 1rem;
                    margin: 0.5rem 0;
                    box-shadow: 0 25px 50px -12px rgba(99, 102, 241, 0.25);
                  }
                  
                  .blog-content blockquote {
                    border-left: 4px solid #6366f1;
                    background: linear-gradient(to right, rgba(99, 102, 241, 0.05), transparent);
                    padding: 1.5rem 2rem;
                    font-style: italic;
                    color: #475569;
                    margin: 2.5rem 0;
                    border-radius: 0 0.75rem 0.75rem 0;
                  }
                  
                  /* FIXED: Bullet Points and Numbered Lists */
                  .blog-content ul {
                    list-style-type: disc !important;
                    list-style-position: outside !important;
                    padding-left: 2rem !important;
                    margin: 1.5rem 0 !important;
                  }
                  
                  .blog-content ol {
                    list-style-type: decimal !important;
                    list-style-position: outside !important;
                    padding-left: 2rem !important;
                    margin: 1.5rem 0 !important;
                  }
                  
                  .blog-content ul li,
                  .blog-content ol li {
                    margin-bottom: 0.75rem !important;
                    padding-left: 0.5rem !important;
                    display: list-item !important;
                  }
                  
                  .blog-content ul li::marker {
                    color: #6366f1 !important;
                    font-size: 1.2em !important;
                  }
                  
                  .blog-content ol li::marker {
                    color: #6366f1 !important;
                    font-weight: 700 !important;
                  }
                  
                  .blog-content ul ul,
                  .blog-content ol ul,
                  .blog-content ul ol,
                  .blog-content ol ol {
                    margin-top: 0.5rem !important;
                    margin-bottom: 0.5rem !important;
                  }
                  
                  .blog-content strong,
                  .blog-content b {
                    color: #0f172a;
                    font-weight: 700;
                  }
                  
                  .blog-content em,
                  .blog-content i {
                    color: #475569;
                  }
                  
                  .blog-content code {
                    background: #f1f5f9;
                    color: #6366f1;
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.375rem;
                    font-family: 'Courier New', monospace;
                    font-size: 0.9em;
                    font-weight: 600;
                  }
                  
                  .blog-content pre {
                    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                    color: #e2e8f0;
                    padding: 1.5rem;
                    border-radius: 1rem;
                    overflow-x: auto;
                    margin: 2rem 0;
                    box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5);
                  }
                  
                  .blog-content pre code {
                    background: transparent;
                    color: #e2e8f0;
                    padding: 0;
                  }
                  
                  .blog-content table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 2rem 0;
                  }
                  
                  .blog-content table th,
                  .blog-content table td {
                    padding: 0.75rem 1rem;
                    border: 1px solid #e2e8f0;
                  }
                  
                  .blog-content table th {
                    background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);
                    color: white;
                    font-weight: 700;
                  }
                  
                  .blog-content table tr:nth-child(even) {
                    background: #f8fafc;
                  }
                `}</style>

                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>

              {/* Decorative Divider */}
              <div className="my-20 flex items-center justify-center gap-4">
                <div className="h-1 w-32 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full"></div>
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></div>
                <div className="h-1 w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
              </div>

              {/* Share Section */}
              <section className="my-16 p-10 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-3xl border-2 border-indigo-100">
                <h3 className="text-2xl font-black text-slate-900 mb-8 text-center">Share This Story</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalURL)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#000000] hover:bg-[#1DA1F2] text-white px-6 py-4 rounded-2xl font-bold text-sm transition-all hover:scale-105 hover:shadow-xl"
                    aria-label="Share on X"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25L12 10.59 5.756 2.25H2.25L10.5 13.5 2.25 21.75H5.756L12 15.41 18.244 21.75H21.75L13.5 10.59 21.75 2.25Z" />
                    </svg>
                    <span>X</span>
                  </a>

                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalURL)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#1877F2] text-white px-6 py-4 rounded-2xl font-bold text-sm hover:brightness-110 transition-all hover:scale-105 hover:shadow-xl"
                    aria-label="Share on Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </a>

                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalURL)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#0A66C2] text-white px-6 py-4 rounded-2xl font-bold text-sm hover:brightness-110 transition-all hover:scale-105 hover:shadow-xl"
                    aria-label="Share on LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${canonicalURL}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-2xl font-bold text-sm hover:brightness-110 transition-all hover:scale-105 hover:shadow-xl"
                    aria-label="Share on WhatsApp"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.485-.888-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.355L1.5 22.5l1.3-4.757a9.875 9.875 0 01-1.348-5.035 9.875 9.875 0 0110.02-9.875 9.875 9.875 0 019.875 9.875 9.875 9.875 0 01-9.875 9.875z" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </section>

              {/* Continue Reading */}
              <section className="mt-24">
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-3xl font-black text-slate-900">Continue Reading</h2>
                  <div className="h-1 flex-1 bg-gradient-to-r from-indigo-500/30 to-transparent rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {recommendations.slice(0, 2).map((item: any) => {
                    const thumb = extractImage(item.content);
                    return (
                      <Link key={item.id} href={`/articles/${slugify(item.title)}-${item.id}`} className="group block">
                        <article className="bg-white rounded-3xl border-2 border-slate-100 overflow-hidden hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 hover:-translate-y-2">
                          {thumb && (
                            <div className="h-56 w-full overflow-hidden bg-slate-100">
                              <img
                                src={thumb}
                                alt=""
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            </div>
                          )}
                          <div className="p-8">
                            <h3 className="font-bold text-xl text-slate-900 leading-tight mb-4 group-hover:text-indigo-600 transition-colors">
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm font-bold text-indigo-600 group-hover:gap-3 transition-all">
                              <span>Read More</span>
                              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>
                        </article>
                      </Link>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* SIDEBAR */}
            <aside className="lg:col-span-4 space-y-8">

              {/* Table of Contents Placeholder */}
              <div className="sticky top-24 space-y-8">

                {/* More Articles */}
                <section className="bg-white rounded-3xl p-8 border-2 border-slate-100 shadow-sm">
                  <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-6 pb-3 border-b-2 border-indigo-100">
                    More from The Rabbit Hole
                  </h3>
                  <div className="space-y-5">
                    {recommendations.slice(0, 5).map((item: any) => (
                      <Link key={item.id} href={`/articles/${slugify(item.title)}-${item.id}`} className="block group">
                        <h4 className="font-semibold text-sm text-slate-700 leading-snug group-hover:text-indigo-600 transition-colors">
                          {item.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </section>

                {/* Still Bored CTA */}
                <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-10 shadow-xl">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-3xl rounded-full"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/20 blur-2xl rounded-full"></div>

                  <div className="relative z-10">
                    <p className="text-xs font-black uppercase tracking-widest text-indigo-200 mb-4">Still Bored?</p>
                    <h3 className="text-2xl font-black text-white mb-6 leading-tight">
                      Discover More Amazing Content
                    </h3>
                    <Link href="/">
                      <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-sm uppercase tracking-wide hover:bg-indigo-50 hover:scale-105 transition-all shadow-lg hover:shadow-xl">
                        Take Me Somewhere New 🚀
                      </button>
                    </Link>
                  </div>
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