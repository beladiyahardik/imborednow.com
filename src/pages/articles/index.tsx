import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import { fetchAllBloggerPosts } from "@/lib/blogger";

type BloggerPost = {
  id: string;
  title: string;
  content: string;
  published?: string;
  updated?: string;
  labels?: string[];
};

type ArticleCard = {
  id: string;
  title: string;
  published?: string;
  labels?: string[];
  excerpt: string;
  image: string;
  readingTime: number;
};

type ArticlesPageProps = {
  initialPosts: ArticleCard[];
};

const PAGE_SIZE = 12;

const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

const createExcerpt = (html: string) => {
  const text = stripHtml(html);
  if (!text) return "Read the full article for more details.";
  return text.length > 170 ? `${text.slice(0, 170)}...` : text;
};

const extractImage = (html: string) => {
  const imgReg = /<img [^>]*src="([^"]+)"/;
  const match = imgReg.exec(html);
  return match ? match[1] : "https://www.imborednow.com/logo.png";
};

const readingTimeMinutes = (html: string) => {
  const words = stripHtml(html).split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 225));
};

const formatDate = (value?: string) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export async function getStaticProps() {
  try {
    const posts = (await fetchAllBloggerPosts({
      pageSize: 100,
      maxPages: 30,
    })) as BloggerPost[];

    const cardPosts: ArticleCard[] = (posts || []).map((post) => ({
      id: post.id,
      title: post.title,
      published: post.published,
      labels: post.labels || [],
      excerpt: createExcerpt(post.content),
      image: extractImage(post.content),
      readingTime: readingTimeMinutes(post.content),
    }));

    return {
      props: {
        initialPosts: cardPosts,
      },
      revalidate: 1800,
    };
  } catch {
    return {
      props: {
        initialPosts: [],
      },
      revalidate: 1800,
    };
  }
}

export default function ArticlesPage({ initialPosts }: ArticlesPageProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const posts = useMemo(() => initialPosts || [], [initialPosts]);

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts;
    const term = query.toLowerCase().trim();
    return posts.filter((post) => {
      const title = post.title.toLowerCase();
      const excerpt = post.excerpt.toLowerCase();
      const labels = (post.labels || []).join(" ").toLowerCase();
      return title.includes(term) || excerpt.includes(term) || labels.includes(term);
    });
  }, [posts, query]);

  const pageCount = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * PAGE_SIZE;
  const visiblePosts = filteredPosts.slice(start, start + PAGE_SIZE);
  const startLabel = filteredPosts.length === 0 ? 0 : start + 1;
  const endLabel = Math.min(start + PAGE_SIZE, filteredPosts.length);

  return (
    <>
      <Head>
        <title>Articles | ImBoredNow</title>
        <meta
          name="description"
          content="Read original, useful articles on curiosity, focus, and digital habits. Clean layout, fast loading, and easy navigation."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Articles | ImBoredNow" />
        <meta
          property="og:description"
          content="A browsable archive of practical and interesting reads."
        />
        <meta property="og:url" content="https://www.imborednow.com/articles" />
        <meta property="og:image" content="https://www.imborednow.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Articles | ImBoredNow" />
        <meta
          name="twitter:description"
          content="A browsable archive of practical and interesting reads."
        />
        <link rel="canonical" href="https://www.imborednow.com/articles" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "ImBoredNow Articles",
              url: "https://www.imborednow.com/articles",
              isPartOf: {
                "@type": "WebSite",
                name: "ImBoredNow",
                url: "https://www.imborednow.com",
              },
              about: "Curated educational and entertaining long-form articles.",
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <section className="page-hero">
          <div className="page-wrap">
            <nav className="mb-4 text-sm text-slate-600">
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slate-900">Articles</span>
            </nav>

            <h1 className="page-title text-4xl md:text-5xl">Articles</h1>
            <p className="page-subtitle mt-3 max-w-3xl text-base md:text-lg">
              Read practical, human-written articles designed to be useful and easy to scan.
              Browse by topic or search by keyword.
            </p>

            <div className="mt-6 max-w-2xl">
              <label htmlFor="article-search" className="mb-2 block text-sm font-semibold text-slate-700">
                Search articles
              </label>
              <input
                id="article-search"
                type="text"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Try: productivity, history, habits"
                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-900 outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </section>

        <section className="page-wrap py-8 md:py-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
            <p>
              Showing {startLabel} - {endLabel} of {filteredPosts.length} articles
            </p>
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setPage(1);
                }}
                className="clean-btn clean-btn-secondary px-4 py-2 text-sm"
              >
                Clear search
              </button>
            )}
          </div>

          {visiblePosts.length === 0 ? (
            <div className="page-card p-8 text-center">
              <h2 className="page-title text-2xl">No matching articles</h2>
              <p className="page-subtitle mt-2">Try a broader keyword or clear your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {visiblePosts.map((post) => {
                const postSlug = `${slugify(post.title)}-${post.id}`;
                const publishedLabel = formatDate(post.published);

                return (
                  <Link
                    key={post.id}
                    href={`/articles/${postSlug}`}
                    className="page-card block overflow-hidden transition hover:border-slate-300 hover:shadow-sm"
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden border-b border-slate-100 bg-slate-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <div className="mb-3 flex flex-wrap gap-3 text-xs text-slate-500">
                        {publishedLabel && <span>{publishedLabel}</span>}
                        <span>{post.readingTime} min read</span>
                      </div>
                      <h2 className="page-title mb-3 text-xl leading-tight">{post.title}</h2>
                      <p className="page-subtitle text-sm leading-6">{post.excerpt}</p>
                      <span className="mt-4 inline-flex text-sm font-semibold text-blue-700">
                        Read article
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {pageCount > 1 && (
            <nav className="mt-10 flex flex-wrap items-center justify-center gap-3" aria-label="Pagination">
              <button
                type="button"
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                disabled={safePage === 1}
                className="clean-btn clean-btn-secondary px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-sm font-semibold text-slate-700">
                Page {safePage} of {pageCount}
              </span>

              <button
                type="button"
                onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
                disabled={safePage === pageCount}
                className="clean-btn clean-btn-secondary px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          )}
        </section>
      </div>
    </>
  );
}
