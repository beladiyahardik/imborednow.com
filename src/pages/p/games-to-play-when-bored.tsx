import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";

type Difficulty = "Easy" | "Medium" | "Hard" | "Expert";

type Game = {
  title: string;
  shortLabel: string;
  desc: string;
  url: string;
  tag: string;
  difficulty: Difficulty;
  hot: boolean;
};

const games: Game[] = [
  {
    title: "Number Merge",
    shortLabel: "NM",
    desc: "Merge matching tiles and plan ahead to keep the board alive.",
    url: "/p/number-merge",
    tag: "Strategy",
    hot: true,
    difficulty: "Medium",
  },
  {
    title: "Word Link",
    shortLabel: "WL",
    desc: "Connect letters to reveal hidden words in each puzzle set.",
    url: "/p/word-link",
    tag: "Lexical",
    hot: false,
    difficulty: "Easy",
  },
  {
    title: "Daily Crossword",
    shortLabel: "CW",
    desc: "A daily crossword challenge focused on vocabulary and recall.",
    url: "/p/daily-crossword",
    tag: "Brain Training",
    hot: true,
    difficulty: "Medium",
  },
  {
    title: "Hexa-Path",
    shortLabel: "HP",
    desc: "Solve pathfinding puzzles on hexagonal grids.",
    url: "/p/hexa-path",
    tag: "Logic",
    hot: false,
    difficulty: "Hard",
  },
  {
    title: "Binary Switch",
    shortLabel: "BS",
    desc: "Toggle sequences to match the binary target state.",
    url: "/p/binary-switch",
    tag: "Computing",
    hot: false,
    difficulty: "Medium",
  },
  {
    title: "Circuit Flow",
    shortLabel: "CF",
    desc: "Route power through logic gates in the correct order.",
    url: "/p/circuit-flow",
    tag: "Logic",
    hot: true,
    difficulty: "Hard",
  },
  {
    title: "Resonance",
    shortLabel: "RS",
    desc: "Align wave timing and frequency to stabilize each stage.",
    url: "/p/resonance",
    tag: "Physics",
    hot: false,
    difficulty: "Hard",
  },
  {
    title: "Quantum Maze",
    shortLabel: "QM",
    desc: "Navigate shifting layouts and find the cleanest route.",
    url: "/p/quantum-maze",
    tag: "Logic",
    hot: true,
    difficulty: "Expert",
  },
  {
    title: "Focus Flow",
    shortLabel: "FF",
    desc: "Stay centered while distractions increase over time.",
    url: "/p/focus-flow",
    tag: "Reflex",
    hot: true,
    difficulty: "Medium",
  },
  {
    title: "Grid Pulse",
    shortLabel: "GP",
    desc: "React to rhythm changes before each pulse fades.",
    url: "/p/grid-pulse",
    tag: "Reflex",
    hot: true,
    difficulty: "Medium",
  },
  {
    title: "Cipher Grid",
    shortLabel: "CG",
    desc: "Decode hidden patterns with limited clues.",
    url: "/p/cipher-grid",
    tag: "Logic",
    hot: true,
    difficulty: "Hard",
  },
  {
    title: "Neural Link",
    shortLabel: "NL",
    desc: "Memorize and replay evolving pattern sequences.",
    url: "/p/neural-link",
    tag: "Memory",
    hot: true,
    difficulty: "Medium",
  },
];

const categories = [
  "All",
  "Logic",
  "Strategy",
  "Brain Training",
  "Physics",
  "Lexical",
  "Computing",
  "Reflex",
  "Memory",
];

const difficultyClass: Record<Difficulty, string> = {
  Easy: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border border-amber-200",
  Hard: "bg-orange-50 text-orange-700 border border-orange-200",
  Expert: "bg-rose-50 text-rose-700 border border-rose-200",
};

export default function GamesArchive() {
  const router = useRouter();
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const PAGE_TITLE = "Free Browser Games to Play When Bored | ImBoredNow";
  const PAGE_DESC =
    "Play free browser games with no downloads or sign-ups. Explore logic, word, reflex, and strategy games built for short breaks.";

  const filteredGames = useMemo(() => {
    let result = games;

    if (filter !== "All") {
      result = result.filter((game) => game.tag === filter);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (game) =>
          game.title.toLowerCase().includes(term) ||
          game.desc.toLowerCase().includes(term) ||
          game.tag.toLowerCase().includes(term),
      );
    }

    return result;
  }, [filter, searchTerm]);

  const hotGames = games.filter((game) => game.hot).slice(0, 5);

  const playRandomGame = () => {
    const randomGame = games[Math.floor(Math.random() * games.length)];
    router.push(randomGame.url);
  };

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESC} />
        <meta
          property="og:url"
          content="https://www.imborednow.com/p/games-to-play-when-bored"
        />
        <meta
          property="og:image"
          content="https://www.imborednow.com/og-games.png"
        />
        <meta property="og:site_name" content="ImBoredNow" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESC} />
        <meta
          name="twitter:image"
          content="https://www.imborednow.com/og-games.png"
        />
        <link
          rel="canonical"
          href="https://www.imborednow.com/p/games-to-play-when-bored"
        />
        <meta name="robots" content="index,follow,max-image-preview:large" />
      </Head>

      <div className="bg-slate-50">
        <section className="clean-section border-b border-slate-200 bg-white">
          <div className="site-container">
            <nav className="mb-5 text-sm text-slate-500">
              <Link href="/" className="hover:text-slate-800">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slate-800">Games</span>
            </nav>

            <div className="max-w-3xl">
              <p className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {games.length} games available
              </p>
              <h1 className="clean-heading mb-4 text-3xl md:text-4xl">
                Free games for quick breaks
              </h1>
              <p className="clean-copy text-base md:text-lg">
                Every game on this page runs in the browser and starts instantly.
                No sign-up wall, no installation, and no long setup.
              </p>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-[1fr_auto]">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by title, category, or keyword"
                className="h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={playRandomGame}
                className="clean-btn clean-btn-primary h-11 px-5"
              >
                Play random game
              </button>
            </div>

            {!searchTerm && hotGames.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
                <span className="font-semibold text-slate-600">Popular:</span>
                {hotGames.map((game) => (
                  <Link
                    key={game.title}
                    href={game.url}
                    className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-200"
                  >
                    {game.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="site-container py-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    filter === category
                      ? "bg-slate-900 text-white"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <section className="clean-section">
          <div className="site-container">
            {searchTerm && (
              <p className="mb-5 text-sm text-slate-600">
                {filteredGames.length} result{filteredGames.length === 1 ? "" : "s"} for &quot;{searchTerm}&quot;
              </p>
            )}

            {filteredGames.length === 0 ? (
              <div className="clean-card p-8 text-center">
                <h2 className="clean-heading text-xl">No matching games</h2>
                <p className="clean-copy mt-2">
                  Try a different keyword or reset to show all categories.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setFilter("All");
                  }}
                  className="clean-btn clean-btn-secondary mt-5"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGames.map((game) => (
                  <Link key={game.url} href={game.url} className="clean-card p-5 transition hover:shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700">
                        {game.shortLabel}
                      </span>
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${difficultyClass[game.difficulty]}`}>
                        {game.difficulty}
                      </span>
                    </div>

                    <h3 className="clean-heading text-lg">{game.title}</h3>
                    <p className="clean-copy mt-2 text-sm">{game.desc}</p>

                    <div className="mt-4 flex items-center justify-between text-xs">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
                        {game.tag}
                      </span>
                      <span className="font-semibold text-blue-700">Play now</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white py-12">
          <div className="site-container">
            <div className="clean-card p-6 md:p-8">
              <h2 className="clean-heading text-2xl">Why this page helps</h2>
              <p className="clean-copy mt-3">
                This list is curated for short sessions. You can open a game in one click,
                play for a few minutes, and leave without extra friction.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div>
                  <h3 className="font-semibold text-slate-900">Fast to start</h3>
                  <p className="clean-copy mt-1 text-sm">
                    No account requirement and no installation process.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Works on mobile</h3>
                  <p className="clean-copy mt-1 text-sm">
                    Each game is designed to run on both desktop and phone screens.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Mix of categories</h3>
                  <p className="clean-copy mt-1 text-sm">
                    Logic, word, memory, and strategy options for different moods.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
