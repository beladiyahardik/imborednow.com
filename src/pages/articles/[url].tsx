import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { fetchAllBloggerPosts, fetchBloggerPostById } from "@/lib/blogger";

type BloggerAuthor = {
  displayName?: string;
};

type BloggerPost = {
  id: string;
  title: string;
  content: string;
  published?: string;
  updated?: string;
  labels?: string[];
  author?: BloggerAuthor;
};

type RecommendedPost = {
  id: string;
  title: string;
  excerpt: string;
};

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3 | 4;
};

type FormattedArticle = {
  html: string;
  toc: TocItem[];
};

type PageProps = {
  post: BloggerPost;
  recommendations: RecommendedPost[];
};

const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

const decodeEntities = (value: string) =>
  value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");

const decodeMojibake = (value: string) =>
  value
    .replace(/Ã¢â‚¬â„¢|â€™/g, "'")
    .replace(/Ã¢â‚¬Ëœ|â€˜/g, "'")
    .replace(/Ã¢â‚¬Å“|â€œ/g, '"')
    .replace(/Ã¢â‚¬Â|Ã¢â‚¬"|â€/g, '"')
    .replace(/Ã¢â‚¬â€œ|â€“/g, "-")
    .replace(/Ã¢â‚¬â€|â€”/g, "--")
    .replace(/Ã¢â‚¬Â¦|â€¦/g, "...")
    .replace(/Ã¢â‚¬Â¢|â€¢/g, "•")
    .replace(/ÃƒÂ©|Ã©/g, "e")
    .replace(/Ã‚|Â/g, "");

const stripHtml = (html: string) =>
  decodeEntities(decodeMojibake(html))
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const extractImage = (html: string) => {
  const imgReg = /<img [^>]*src="([^"]+)"/;
  const match = imgReg.exec(html);
  return match ? match[1] : null;
};

const readingTimeMinutes = (html: string) => {
  const words = stripHtml(html).split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 225));
};

const formatDate = (value?: string) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const sanitizeArticleHtml = (rawHtml: string) => {
  let html = decodeMojibake(rawHtml || "");

  // Remove redirect links around images while preserving full image URL for lightbox.
  html = html.replace(
    /<a\b[^>]*href="([^"]+)"[^>]*>\s*(<img\b[^>]*>)\s*<\/a>/gi,
    (_, href: string, imgTag: string) => {
      const safeHref = href.replace(/"/g, "&quot;");
      if (/data-lightbox-src=/i.test(imgTag)) return imgTag;
      return imgTag.replace("<img", `<img data-lightbox-src="${safeHref}"`);
    },
  );

  html = html
    .replace(/<div class="separator"[^>]*>([\s\S]*?)<\/div>/gi, '<figure class="article-figure">$1</figure>')
    .replace(/<p>\s*(?:&nbsp;|\u00a0)?\s*<\/p>/gi, "")
    .replace(/\sdata-[a-z-]+="[^"]*"/gi, "")
    .replace(/\sstyle="font-family:\s*inherit;?"/gi, "")
    .replace(/<\/?span[^>]*>/gi, "")
    .replace(/<h3\b[^>]*>/gi, "<h2>")
    .replace(/<\/h3>/gi, "</h2>")
    .replace(/<h4\b[^>]*>/gi, "<h3>")
    .replace(/<\/h4>/gi, "</h3>");

  // Normalize image attributes for consistent rendering.
  html = html.replace(/<img\b([^>]*)>/gi, (_, attrs: string) => {
    let nextAttrs = attrs.replace(/\s*\/\s*$/, "");
    const srcMatch = nextAttrs.match(/\ssrc="([^"]+)"/i);
    const src = srcMatch?.[1];

    if (!/data-lightbox-src=/i.test(nextAttrs) && src) {
      nextAttrs += ` data-lightbox-src="${src.replace(/"/g, "&quot;")}"`;
    }

    if (/class="([^"]*)"/i.test(nextAttrs)) {
      nextAttrs = nextAttrs.replace(/class="([^"]*)"/i, 'class="$1 article-image"');
    } else {
      nextAttrs += ' class="article-image"';
    }

    if (!/loading=/i.test(nextAttrs)) {
      nextAttrs += ' loading="lazy"';
    }

    return `<img${nextAttrs} />`;
  });

  html = html
    .replace(/\s\/\s+data-lightbox-src=/gi, ' data-lightbox-src=')
    .replace(/<\/?span[^>]*>/gi, "");

  return html.trim();
};

const formatArticleHtml = (rawHtml: string): FormattedArticle => {
  const toc: TocItem[] = [];
  const usedIds = new Map<string, number>();
  let html = sanitizeArticleHtml(rawHtml);

  html = html.replace(/<h([2-4])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, levelText: string, inner: string) => {
    const level = Number(levelText) as 2 | 3 | 4;
    const headingText = stripHtml(inner);

    if (!headingText) {
      return `<h${level}>${inner}</h${level}>`;
    }

    const base = slugify(headingText) || `section-${toc.length + 1}`;
    const count = usedIds.get(base) || 0;
    usedIds.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;

    toc.push({ id, text: headingText, level });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

  return { html, toc };
};

export default function BlogPostPage({ post, recommendations }: PageProps) {
  const router = useRouter();
  const [completion, setCompletion] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) {
        setCompletion(0);
        ticking = false;
        return;
      }

      const next = Math.max(0, Math.min(100, (window.scrollY / max) * 100));
      setCompletion(next);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    updateScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxSrc(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxSrc]);

  useEffect(() => {
    if (!lightboxSrc) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxSrc]);

  if (router.isFallback) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-slate-300 border-t-slate-800" />
          <p className="text-sm font-medium text-slate-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const formattedArticle = formatArticleHtml(post.content);
  const formattedContent = formattedArticle.html;
  const toc = formattedArticle.toc;

  const cleanDescription = `${stripHtml(formattedContent).slice(0, 160)}...`;
  const canonicalURL = `https://www.imborednow.com/articles/${slugify(post.title)}-${post.id}`;
  const coverImage = extractImage(formattedContent) || "https://www.imborednow.com/logo.png";
  const publishedDate = formatDate(post.published);
  const updatedDate = formatDate(post.updated);
  const readingTime = readingTimeMinutes(formattedContent);
  const labelList = post.labels || [];

  return (
    <>
      <Head>
        <title>{post.title} | ImBoredNow</title>
        <meta name="description" content={cleanDescription} />
        <link rel="canonical" href={canonicalURL} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={cleanDescription} />
        <meta property="og:url" content={canonicalURL} />
        <meta property="og:image" content={coverImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={cleanDescription} />
        <meta name="twitter:image" content={coverImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              image: [coverImage],
              datePublished: post.published,
              dateModified: post.updated,
              author: {
                "@type": "Person",
                name: post.author?.displayName || "ImBoredNow",
              },
              publisher: {
                "@type": "Organization",
                name: "ImBoredNow",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.imborednow.com/logo.png",
                },
              },
              description: cleanDescription,
            }),
          }}
        />
      </Head>

      <div className="fixed left-0 right-0 top-0 z-[105] h-1 bg-slate-200/60">
        <div className="h-full bg-slate-900 transition-all duration-200" style={{ width: `${completion}%` }} />
      </div>

      <div className="min-h-screen bg-slate-50">
        <section className="page-wrap py-8 md:py-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-600">
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
              <span>/</span>
              <Link href="/articles" className="hover:text-slate-900">
                Articles
              </Link>
              <span>/</span>
              <span className="max-w-[22rem] truncate text-slate-900">{post.title}</span>
            </nav>

            <Link
              href="/articles"
              className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Back To Articles
            </Link>
          </div>

          <header className="page-card p-6 md:p-8">
            {labelList.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {labelList.slice(0, 8).map((label) => (
                  <span key={label} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {decodeMojibake(label)}
                  </span>
                ))}
              </div>
            )}

            <h1 className="page-title mb-4 text-3xl leading-tight md:text-5xl">{decodeMojibake(post.title)}</h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
              {publishedDate && <span>Published {publishedDate}</span>}
              {updatedDate && updatedDate !== publishedDate && <span>Updated {updatedDate}</span>}
              <span>{readingTime} min read</span>
              {post.author?.displayName && <span>By {decodeMojibake(post.author.displayName)}</span>}
            </div>
          </header>

          <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0">
              <article className="page-card p-6 md:p-10 lg:p-12">
                <div
                  className="chatgpt-article"
                  onClick={(event) => {
                    const target = event.target as HTMLElement;
                    const image = target.closest("img");
                    if (!image || !image.closest(".chatgpt-article")) return;

                    event.preventDefault();
                    const src = image.getAttribute("data-lightbox-src") || image.getAttribute("src");
                    if (!src) return;

                    setLightboxAlt(image.getAttribute("alt") || decodeMojibake(post.title));
                    setLightboxSrc(src);
                  }}
                  dangerouslySetInnerHTML={{ __html: formattedContent }}
                />
              </article>

              {recommendations.length > 0 && (
                <section className="mt-10">
                  <h2 className="mb-4 text-2xl font-bold text-slate-900">Continue Reading</h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {recommendations.slice(0, 4).map((item) => (
                      <Link
                        key={item.id}
                        href={`/articles/${slugify(item.title)}-${item.id}`}
                        className="page-card block p-5 hover:border-slate-300"
                      >
                        <h3 className="mb-2 text-lg font-semibold text-slate-900">{decodeMojibake(item.title)}</h3>
                        <p className="text-sm text-slate-600">{decodeMojibake(item.excerpt)}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="xl:sticky xl:top-24 xl:h-fit">
              {toc.length > 0 && (
                <div className="page-card mb-4 p-5">
                  <h3 className="mb-3 text-base font-bold text-slate-900">On This Page</h3>
                  <nav className="space-y-2" aria-label="Table of contents">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block rounded px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 ${
                          item.level === 3 ? "ml-3" : ""
                        } ${item.level === 4 ? "ml-6" : ""}`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              <div className="page-card p-5">
                <h3 className="mb-2 text-base font-bold text-slate-900">Reading Quality</h3>
                <p className="text-sm leading-7 text-slate-600">
                  This article uses a structured layout with clear headings, visible lists, and
                  readable spacing on mobile and desktop.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </div>

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[210] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            type="button"
            onClick={() => setLightboxSrc(null)}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close image preview"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <img
            src={lightboxSrc}
            alt={lightboxAlt}
            className="max-h-[90vh] max-w-[90vw] rounded-xl border border-white/20 object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}

      <style jsx global>{`
        .chatgpt-article {
          font-size: 1.05rem;
          line-height: 1.85;
          color: #0f172a;
          max-width: 78ch;
          margin: 0 auto;
        }

        .chatgpt-article h2 {
          color: #0f172a;
          margin-top: 2.25rem;
          margin-bottom: 0.85rem;
          padding-top: 1.4rem;
          border-top: 1px solid #e2e8f0;
          font-size: 1.55rem;
          line-height: 1.35;
          font-weight: 800;
          letter-spacing: -0.01em;
          scroll-margin-top: 6rem;
        }

        .chatgpt-article h2:first-child {
          margin-top: 0;
          padding-top: 0;
          border-top: 0;
        }

        .chatgpt-article h3 {
          color: #0f172a;
          margin-top: 1.9rem;
          margin-bottom: 0.65rem;
          font-size: 1.28rem;
          line-height: 1.4;
          font-weight: 700;
          scroll-margin-top: 6rem;
        }

        .chatgpt-article p {
          margin: 0.95rem 0;
          color: #1e293b;
        }

        .chatgpt-article ul,
        .chatgpt-article ol {
          margin: 1rem 0 1.4rem !important;
          padding-left: 1.45rem !important;
        }

        .chatgpt-article ul {
          list-style-type: disc !important;
        }

        .chatgpt-article ol {
          list-style-type: decimal !important;
        }

        .chatgpt-article li {
          margin: 0.38rem 0 !important;
          color: #1e293b;
          padding-left: 0.18rem;
        }

        .chatgpt-article li::marker {
          color: #475569;
          font-weight: 700;
        }

        .chatgpt-article blockquote {
          margin: 1.35rem 0;
          border-left: 3px solid #cbd5e1;
          padding-left: 0.95rem;
          color: #334155;
          font-style: italic;
        }

        .chatgpt-article strong {
          color: #0f172a;
          font-weight: 700;
        }

        .chatgpt-article code {
          background: #f1f5f9;
          color: #0f172a;
          padding: 0.15em 0.4em;
          border-radius: 0.35rem;
          font-size: 0.92em;
        }

        .chatgpt-article pre {
          background: #0f172a;
          color: #e2e8f0;
          border-radius: 0.75rem;
          padding: 1rem;
          overflow: auto;
          margin: 1.2rem 0;
        }

        .chatgpt-article pre code {
          background: transparent;
          color: inherit;
          padding: 0;
        }

        .chatgpt-article figure.article-figure {
          margin: 1.3rem 0;
        }

        .chatgpt-article img {
          display: block;
          width: 100%;
          border-radius: 0.75rem;
          margin: 1.2rem 0;
          border: 1px solid #e2e8f0;
          cursor: zoom-in;
        }

        .chatgpt-article a {
          color: #1d4ed8;
          text-decoration: underline;
          text-underline-offset: 2px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const allPosts = await fetchAllBloggerPosts({ pageSize: 100, maxPages: 30 });
    const paths = allPosts.map((post: BloggerPost) => ({
      params: { url: `${slugify(post.title)}-${post.id}` },
    }));

    return { paths, fallback: "blocking" };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const slug = (params?.url as string) || "";
  const id = slug.split("-").pop();

  if (!id) {
    return { notFound: true };
  }

  try {
    const postData = (await fetchBloggerPostById(id)) as BloggerPost | { error?: unknown };

    if (!postData || ("error" in postData && postData.error) || !("id" in postData)) {
      return { notFound: true };
    }

    const post = postData as BloggerPost;
    const allPosts = (await fetchAllBloggerPosts({
      pageSize: 100,
      maxPages: 30,
    })) as BloggerPost[];

    const recommendations = allPosts
      .filter((item) => item.id !== post.id)
      .slice(0, 10)
      .map((item) => ({
        id: item.id,
        title: decodeMojibake(item.title),
        excerpt: `${stripHtml(item.content).slice(0, 110)}...`,
      }));

    return {
      props: {
        post: {
          ...post,
          title: decodeMojibake(post.title),
        },
        recommendations,
      },
      revalidate: 300,
    };
  } catch {
    return { notFound: true };
  }
};
