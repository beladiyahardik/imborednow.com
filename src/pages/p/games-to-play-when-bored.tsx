"use client";

import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";

export default function GamesArchive() {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const PAGE_TITLE =
    "Free Games to Play When Bored | No Download Browser Games 2026";
  const PAGE_DESC =
    "Play 8+ free instant browser games. No downloads, no sign-ups. Logic puzzles, word games, and strategy challenges. Perfect for quick breaks. Start playing now.";

  const games = [
    {
      title: "Number Merge",
      icon: "🔢",
      desc: "Merge tiles like 2048. Strategy at its best.",
      url: "/p/number-merge",
      tag: "Strategy",
      hot: true,
      difficulty: "Medium",
    },
    {
      title: "Word Link",
      icon: "🔗",
      desc: "Connect letters to uncover hidden words.",
      url: "/p/word-link",
      tag: "Lexical",
      hot: false,
      difficulty: "Easy",
    },
    {
      title: "Daily Crossword",
      icon: "🧩",
      desc: "Today's vocabulary-building crossword.",
      url: "/p/daily-crossword",
      tag: "Brain Training",
      hot: true,
      difficulty: "Medium",
    },
    {
      title: "Hexa-Path",
      icon: "⬢",
      desc: "Solve spatial puzzles on hex grids.",
      url: "/p/hexa-path",
      tag: "Logic",
      hot: false,
      difficulty: "Hard",
    },
    {
      title: "Binary Switch",
      icon: "🔌",
      desc: "Logic puzzles with binary sequences.",
      url: "/p/binary-switch",
      tag: "Computing",
      hot: false,
      difficulty: "Medium",
    },
    {
      title: "Circuit Flow",
      icon: "⚡",
      desc: "Route power through logic gates.",
      url: "/p/circuit-flow",
      tag: "Logic",
      hot: true,
      difficulty: "Hard",
    },
    {
      title: "Resonance",
      icon: "🌊",
      desc: "Sync waves by matching frequency & phase.",
      url: "/p/resonance",
      tag: "Physics",
      hot: false,
      difficulty: "Hard",
    },
    {
      title: "Quantum Maze",
      icon: "🌌",
      desc: "Navigate quantum dimensions.",
      url: "/p/quantum-maze",
      tag: "Logic",
      hot: true,
      difficulty: "Expert",
    },
    {
      title: "Focus Flow",
      icon: "🎯",
      desc: "Protect the core from distractions. A minimalist test of concentration.",
      url: "/p/focus-flow",
      tag: "Computing",
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
  ];

  const filteredGames = useMemo(() => {
    let result = games;
    if (filter !== "All") result = result.filter((g) => g.tag === filter);
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(term) ||
          g.desc.toLowerCase().includes(term) ||
          g.tag.toLowerCase().includes(term),
      );
    }
    return result;
  }, [filter, searchTerm]);

  const hotGames = games.filter((g) => g.hot);

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESC} />
        <meta
          name="keywords"
          content="free games, browser games, games to play when bored, no download games, instant play games, logic puzzles, word games, brain games, online games free, quick games, casual games, puzzle games, thinking games, strategy games"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:url" content="https://www.imborednow.com/games" />
        <meta
          property="og:image"
          content="https://www.imborednow.com/og-games.png"
        />
        <meta property="og:site_name" content="ImBoredNow" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESC} />
        <meta
          name="twitter:image"
          content="https://www.imborednow.com/og-games.png"
        />
        <meta name="twitter:site" content="@imborednow" />
        <meta name="twitter:creator" content="@imborednow" />

        {/* Additional SEO */}
        <link rel="canonical" href="https://www.imborednow.com/games" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="ImBoredNow" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Free Browser Games Collection",
            description: PAGE_DESC,
            url: "https://www.imborednow.com/games",
            publisher: {
              "@type": "Organization",
              name: "ImBoredNow",
              logo: {
                "@type": "ImageObject",
                url: "https://www.imborednow.com/logo.png",
              },
            },
            numberOfItems: games.length,
            itemListElement: games.map((game, index) => ({
              "@type": "Game",
              position: index + 1,
              name: game.title,
              description: game.desc,
              url: `https://www.imborednow.com${game.url}`,
              genre: game.tag,
            })),
          })}
        </script>
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Enhanced Hero Section */}
        <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-20 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 w-36 h-36 bg-white rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="relative max-w-6xl mx-auto px-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-indigo-100 mb-8">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>›</span>
              <span className="text-white font-semibold">Games</span>
            </nav>

            <div className="text-center mb-12">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/30">
                  {games.length} Instant Games
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.05]">
                Bored? Play Now.
              </h1>

              <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed mb-12">
                No downloads. No sign-ups. Just instant fun. Pick a game and
                start playing in seconds.
              </p>

              {/* Search + Random */}
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search games..."
                    className="w-full bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl px-6 py-5 pl-14 text-white placeholder-indigo-200 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
                  />
                  <svg
                    className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-indigo-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-indigo-200 hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    const randomGame =
                      games[Math.floor(Math.random() * games.length)];
                    window.location.href = randomGame.url;
                  }}
                  className="bg-white text-indigo-600 font-bold px-10 py-5 rounded-2xl hover:bg-indigo-50 hover:scale-105 transition-all flex items-center justify-center gap-3 whitespace-nowrap shadow-xl hover:shadow-2xl"
                >
                  <span className="text-2xl">🎲</span>
                  <span>Random Game</span>
                </button>
              </div>

              {searchTerm && (
                <p className="text-sm text-indigo-100 mt-4">
                  Found {filteredGames.length} game
                  {filteredGames.length !== 1 ? "s" : ""} matching "{searchTerm}
                  "
                </p>
              )}
            </div>

            {/* Hot Games Strip */}
            {!searchTerm && hotGames.length > 0 && (
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <span className="text-sm text-indigo-200 font-semibold">
                  🔥 Trending:
                </span>
                {hotGames.map((game, i) => (
                  <Link
                    key={i}
                    href={game.url}
                    className="px-4 py-2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full text-sm font-medium transition-all border border-white/20 hover:border-white/40"
                  >
                    {game.icon} {game.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Category Filters */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-3 text-sm font-bold rounded-full transition-all ${
                    filter === cat
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                  {filter === cat && cat !== "All" && (
                    <span className="ml-2 text-xs">
                      ({filteredGames.length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGames.map((game, i) => (
                <Link key={i} href={game.url} className="group block">
                  <article className="bg-white border-2 border-slate-100 rounded-3xl p-8 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                    {/* Icon with glow */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                      <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl flex items-center justify-center text-5xl transform group-hover:scale-110 transition-transform duration-500">
                        {game.icon}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full">
                        {game.tag}
                      </span>
                      {game.hot && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center gap-1">
                          <span>🔥</span> Trending
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${
                          game.difficulty === "Easy"
                            ? "bg-emerald-100 text-emerald-700"
                            : game.difficulty === "Medium"
                              ? "bg-amber-100 text-amber-700"
                              : game.difficulty === "Hard"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-red-100 text-red-700"
                        }`}
                      >
                        {game.difficulty}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-black text-2xl text-slate-900 group-hover:text-indigo-600 transition-colors mb-3 leading-tight">
                      {game.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-[15px] leading-relaxed mb-6 flex-grow">
                      {game.desc}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm group-hover:gap-3 transition-all">
                      <span>Play Now</span>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-7xl mb-6">🎮</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                No games found
              </h3>
              <p className="text-slate-600 mb-8">
                Try a different search term or category
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilter("All");
                }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all"
              >
                Show All Games
              </button>
            </div>
          )}
        </div>

        {/* Quick Benefits */}
        {!searchTerm && (
          <section className="bg-gradient-to-br from-slate-50 to-indigo-50 py-16 border-y border-slate-200">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-black text-center text-slate-900 mb-12">
                Why Play Browser Games?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg shadow-indigo-500/30">
                    ⚡
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">
                    Instant Play
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Click and play in seconds. No downloads or installations
                    needed.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg shadow-pink-500/30">
                    🔒
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">
                    Privacy First
                  </h3>
                  <p className="text-slate-600 text-sm">
                    No sign-ups or tracking. Your gaming stays private.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                    🧠
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">
                    Brain Training
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Improve logic, strategy, and vocabulary while having fun.
                  </p>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>100% Free Forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Mobile Optimized</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Regular Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>No Ads</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Works Offline</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Save Progress</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SEO Content Section - 900+ Words */}
        <section className="bg-slate-900 text-slate-300 py-32">
          <div className="max-w-4xl mx-auto px-6">
            <div className="prose prose-invert prose-indigo lg:prose-xl max-w-none space-y-12">
              {/* Header */}
              <div className="text-center space-y-6 mb-20">
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                  The Ultimate Guide to <br />
                  <span className="text-indigo-400">
                    Free Browser Games in 2026
                  </span>
                </h2>
                <p className="lead text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto">
                  Discover why instant browser games are the perfect solution
                  for boredom, how they improve cognitive function, and what
                  makes our collection stand out in the crowded world of online
                  gaming.
                </p>
              </div>

              {/* Section 1 */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">
                  What Are Browser Games and Why Do They Matter?
                </h3>
                <p>
                  Browser games, also known as web games or HTML5 games, are
                  video games that run directly in your web browser without
                  requiring downloads, installations, or special software. In
                  2026, as app stores become increasingly cluttered and download
                  sizes balloon into gigabytes, browser games represent a return
                  to the internet's core promise: instant, frictionless access
                  to entertainment.
                </p>
                <p>
                  When you search for "games to play when bored" or "free online
                  games no download," you are expressing a specific need:
                  immediate gratification without commitment. You do not want to
                  spend ten minutes downloading a game you might play for five
                  minutes. You do not want to create yet another account with
                  yet another password. You just want to click and play. That is
                  exactly what browser games deliver.
                </p>
                <p>
                  Our collection specifically focuses on games that load in
                  under three seconds, work on any device, and provide genuine
                  engagement rather than mindless clicking. Every game has been
                  tested on mobile devices, tablets, and desktops to ensure a
                  smooth experience regardless of how you access them.
                </p>
              </div>

              {/* Section 2 */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">
                  The Cognitive Benefits of Logic Puzzles and Brain Games
                </h3>
                <p>
                  Not all gaming is created equal when it comes to mental
                  benefits. While passive entertainment like watching videos
                  requires minimal cognitive engagement, puzzle games and logic
                  challenges actively stimulate multiple brain regions
                  simultaneously.
                </p>
                <p>
                  Research in neuroplasticity shows that engaging with novel
                  problem-solving tasks creates new neural pathways and
                  strengthens existing connections. Games like Number Merge
                  require working memory (holding tile positions in mind),
                  strategic planning (anticipating future moves), and pattern
                  recognition (identifying merge opportunities). This
                  multi-faceted engagement is why puzzle games can improve
                  cognitive flexibility-the brain's ability to switch between
                  different concepts and think about multiple concepts
                  simultaneously.
                </p>
                <p>
                  Word games like Word Link and Daily Crossword offer different
                  cognitive benefits. They expand vocabulary, improve spelling,
                  and enhance verbal fluency. More importantly, they strengthen
                  the connection between visual and linguistic processing
                  centers in the brain. When you look at a jumbled set of
                  letters and identify hidden words, you are exercising the same
                  neural pathways used in reading comprehension and creative
                  writing.
                </p>
                <p>
                  Logic games like Circuit Flow and Binary Switch develop
                  computational thinking-the ability to break down complex
                  problems into manageable steps. This skill transfers directly
                  to real-world problem-solving, whether you are debugging code,
                  planning a project, or making strategic decisions.
                </p>
              </div>

              {/* Section 3 */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">
                  Why No Sign-Up Makes All the Difference
                </h3>
                <p>
                  One of the defining features of our game collection is the
                  complete absence of account requirements. This is not just a
                  convenience-it is a philosophical stance about how the
                  internet should work.
                </p>
                <p>
                  Every sign-up requirement adds friction to the user
                  experience. Studies show that mandatory registration reduces
                  conversion rates by 30-60%. When you are bored and looking for
                  quick entertainment, even two minutes of account creation
                  feels like an eternity. By eliminating this barrier, we
                  respect your time and your impulse to play.
                </p>
                <p>
                  Beyond convenience, the no-sign-up approach addresses privacy
                  concerns. You do not need to trust us with your email address,
                  create a password that might be compromised, or worry about
                  how your gaming data might be used. Your interaction with
                  these games is anonymous by default. We cannot track you
                  across sessions, build a behavioral profile, or sell your data
                  to advertisers because we simply do not collect it.
                </p>
                <p>
                  This privacy-first approach reflects our belief that gaming
                  should be a spontaneous, guilt-free escape. You should be able
                  to play a quick puzzle during a work break without leaving a
                  digital trail or adding another entry to your email's spam
                  folder.
                </p>
              </div>

              {/* Section 4 */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">
                  The Perfect 5-20 Minute Break: Gaming for Modern Attention
                  Spans
                </h3>
                <p>
                  The games in our collection are specifically designed for what
                  productivity experts call "microbreaks"- short periods of
                  mental rest that actually improve focus and performance.
                  Research from the University of Illinois shows that brief
                  diversions from a task can dramatically improve one's ability
                  to focus on that task for prolonged periods.
                </p>
                <p>
                  Unlike open-ended games that can consume hours without clear
                  stopping points, our puzzles have natural completion markers.
                  You finish a level of Number Merge. You solve today's Daily
                  Crossword. You complete a stage of Quantum Maze. These clear
                  endpoints make it easy to play for exactly as long as you
                  want, then return to whatever you were doing without the
                  nagging feeling of leaving something unfinished.
                </p>
                <p>
                  The 5-20 minute time frame is also ideal for what
                  psychologists call "cognitive refreshment." After focusing on
                  a mentally demanding task for an extended period, your brain's
                  prefrontal cortex-responsible for executive functions like
                  planning, decision-making, and impulse control-becomes
                  fatigued. A brief shift to a different type of mental activity
                  allows this region to recover while keeping you engaged and
                  alert.
                </p>
              </div>

              {/* Section 5 */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">
                  Mobile-First Gaming: Play Anywhere, Anytime
                </h3>
                <p>
                  In 2026, more than 70% of gaming happens on mobile devices.
                  This shift reflects how we actually use the internet: in short
                  bursts between other activities, often while standing in line,
                  commuting, or waiting for meetings to start. Every game in our
                  collection has been designed with mobile as the primary
                  platform, not an afterthought.
                </p>
                <p>
                  Mobile-first design means more than just responsive layouts.
                  It means touch controls that feel natural, button sizes
                  optimized for thumbs rather than mouse cursors, and loading
                  times that respect mobile data constraints. Games like
                  Hexa-Path use large, touch-friendly hexagonal grids. Word Link
                  features generous letter spacing for accurate tapping. Binary
                  Switch uses swipe gestures that feel intuitive on
                  touchscreens.
                </p>
                <p>
                  This mobile optimization extends to performance as well. Every
                  game loads in under three seconds on a modern smartphone with
                  a decent connection. They work offline after the initial load,
                  so you can continue playing even if your connection drops. And
                  they are designed to be battery-efficient, using optimized
                  code that does not drain your phone during a commute.
                </p>
              </div>

              {/* Section 6 */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">
                  From Casual to Expert: Progressive Difficulty Done Right
                </h3>
                <p>
                  One of the biggest challenges in game design is balancing
                  accessibility with depth. Make a game too easy, and
                  experienced players get bored. Make it too hard, and newcomers
                  feel frustrated. Our collection solves this through clear
                  difficulty indicators and progressive challenge curves.
                </p>
                <p>
                  Games marked "Easy" like Word Link provide gentle introduction
                  to their mechanics. Anyone can start playing immediately and
                  experience success within the first few attempts. This early
                  success builds confidence and encourages continued play.
                </p>
                <p>
                  "Medium" difficulty games like Number Merge and Binary Switch
                  introduce more complex mechanics and require strategic
                  thinking, but still provide regular victories to maintain
                  motivation. These games exemplify what psychologist Mihaly
                  Csikszentmihalyi calls "flow state"-that optimal experience
                  where challenge perfectly matches skill level.
                </p>
                <p>
                  "Hard" and "Expert" games like Quantum Maze and Circuit Flow
                  are designed for puzzle veterans who want genuine mental
                  challenge. These games reward careful analysis, systematic
                  experimentation, and creative problem-solving. Completing a
                  difficult level provides a genuine sense of accomplishment.
                </p>
              </div>

              {/* Section 7 */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">
                  The Future of Browser Gaming
                </h3>
                <p>
                  As web technologies continue to advance, browser games are
                  becoming increasingly sophisticated while maintaining their
                  core advantage: instant accessibility. WebGL and WebAssembly
                  enable graphics and performance that rival native
                  applications. Progressive Web App technology allows games to
                  work offline and feel like installed apps without actually
                  requiring installation.
                </p>
                <p>
                  Our commitment is to stay at the forefront of these
                  technologies while never sacrificing the simplicity that makes
                  browser games special. Every new game added to our collection
                  must pass the "three-second test"- can someone who has never
                  heard of us click a link and be playing within three seconds?
                  If not, we keep optimizing until the answer is yes.
                </p>
              </div>

              {/* Closing */}
              <div className="pt-12 border-t border-slate-700">
                <p className="text-lg text-slate-400 leading-relaxed">
                  Whether you have five minutes or an hour, whether you want
                  gentle word puzzles or mind-bending logic challenges, our
                  collection of browser games offers instant, guilt-free
                  entertainment that respects your time, protects your privacy,
                  and might even make you a little smarter. No downloads. No
                  sign-ups. Just pure, immediate fun whenever boredom strikes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
