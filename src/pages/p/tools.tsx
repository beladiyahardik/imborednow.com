import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Cake, ChevronRight, HeartPulse, Palette, Scale, Search, Timer, type LucideIcon } from "lucide-react";

type ToolIconKey = "cake" | "palette" | "timer" | "heart" | "scale";

type ToolItem = {
  title: string;
  icon: ToolIconKey;
  desc: string;
  href: string;
  tag: string;
};

const tools: ToolItem[] = [
  {
    title: "Birthdate Secrets",
    icon: "cake",
    desc: "Understand age milestones with a simple date-based breakdown.",
    href: "/p/birthdate-calculator",
    tag: "Popular",
  },
  {
    title: "Pixel Art Studio",
    icon: "palette",
    desc: "Create lightweight pixel art directly in your browser.",
    href: "/p/pixel-art",
    tag: "Creative",
  },
  {
    title: "History Timeline",
    icon: "timer",
    desc: "Explore global events and compare your birthday with key moments.",
    href: "/p/history-timeline",
    tag: "Insight",
  },
  {
    title: "Life Expectancy",
    icon: "heart",
    desc: "Estimate long-term trends based on basic lifestyle inputs.",
    href: "/p/life-expectancy-calculator",
    tag: "Health",
  },
  {
    title: "Lifestyle Factor",
    icon: "scale",
    desc: "See how common habits can move your long-term baseline.",
    href: "/p/life-style-factor",
    tag: "Deep Dive",
  },
];

const iconMap: Record<ToolIconKey, LucideIcon> = {
  cake: Cake,
  palette: Palette,
  timer: Timer,
  heart: HeartPulse,
  scale: Scale,
};

const tagClasses: Record<string, string> = {
  Popular: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  Creative: "bg-amber-50 text-amber-700 border border-amber-200",
  Insight: "bg-cyan-50 text-cyan-700 border border-cyan-200",
  Health: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "Deep Dive": "bg-violet-50 text-violet-700 border border-violet-200",
};

export default function ToolsHub() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return tools;
    const term = search.toLowerCase().trim();
    return tools.filter(
      (tool) =>
        tool.title.toLowerCase().includes(term) ||
        tool.desc.toLowerCase().includes(term) ||
        tool.tag.toLowerCase().includes(term),
    );
  }, [search]);

  const PAGE_TITLE = "Discovery Tools | ImBoredNow";
  const PAGE_DESC =
    "Open practical tools for short breaks and lightweight exploration. Fast loading, clear layout, and no sign-up friction.";

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:url" content="https://www.imborednow.com/p/tools" />
        <meta property="og:image" content="https://www.imborednow.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESC} />
        <link rel="canonical" href="https://www.imborednow.com/p/tools" />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "ImBoredNow Discovery Tools",
              url: "https://www.imborednow.com/p/tools",
              description: PAGE_DESC,
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <section className="page-hero">
          <div className="page-wrap">
            <nav className="mb-4 flex items-center gap-2 text-sm text-slate-600">
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <span className="text-slate-900">Tools</span>
            </nav>

            <h1 className="page-title text-4xl md:text-5xl">Discovery Tools</h1>
            <p className="page-subtitle mt-3 max-w-3xl text-base md:text-lg">
              Practical tools built for short sessions. Open one, use it immediately, and move on
              without clutter.
            </p>

            <div className="mt-6 max-w-2xl">
              <label htmlFor="tool-search" className="mb-2 block text-sm font-semibold text-slate-700">
                Search tools
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  id="tool-search"
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Try: history, life, pixel"
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="page-wrap py-8 md:py-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
            <p>
              Showing {filtered.length} of {tools.length} tools
            </p>
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="clean-btn clean-btn-secondary px-4 py-2 text-sm"
              >
                Clear search
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="page-card p-8 text-center">
              <h2 className="page-title text-2xl">No matching tools</h2>
              <p className="page-subtitle mt-2">Try a broader keyword and search again.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((tool) => {
                const Icon = iconMap[tool.icon];
                const tagClass = tagClasses[tool.tag] || "bg-slate-100 text-slate-700 border border-slate-200";

                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="page-card group block p-6 transition hover:border-slate-300 hover:shadow-sm"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${tagClass}`}>
                        {tool.tag}
                      </span>
                    </div>

                    <h2 className="page-title text-xl leading-tight">{tool.title}</h2>
                    <p className="page-subtitle mt-2 text-sm leading-6">{tool.desc}</p>
                    <span className="mt-4 inline-flex text-sm font-semibold text-blue-700">Open tool</span>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <section className="border-t border-slate-200 bg-white py-12">
          <div className="page-wrap">
            <div className="page-card p-6 md:p-8">
              <h2 className="page-title text-2xl">Need games instead?</h2>
              <p className="page-subtitle mt-2 max-w-2xl">
                If you want fast interactive games, open the games archive and launch directly from
                one place.
              </p>
              <Link href="/p/games-to-play-when-bored" className="clean-btn clean-btn-primary mt-5 px-5 py-3">
                Browse Games
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
