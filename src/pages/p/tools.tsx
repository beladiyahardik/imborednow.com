/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function ToolsHub() {
  const [search, setSearch] = useState("");

  const PAGE_TITLE = "Free Online Games & Discovery Tools | ImBoredNow Discovery Lab";
  const PAGE_DESC = "Explore 13+ free brain-training games, logic puzzles, and personal discovery tools. No sign-up required. Instant play. From pixel art to life calculators, cure your boredom now.";

  const allTools = [
    // Games
    // { title: "Number Merge", icon: "🔢", desc: "Classic 2048-style number merging puzzle.", href: "/p/number-merge", tag: "Trending", category: "games" },
    // { title: "Word Link", icon: "🔗", desc: "Connect letters to find hidden words.", href: "/p/word-link", tag: "Popular", category: "games" },
    // { title: "Daily Crossword", icon: "🧩", desc: "Today's vocabulary challenge.", href: "/p/daily-crossword", tag: "Daily", category: "games" },
    // { title: "Hexa-Path", icon: "⬢", desc: "Navigate hexagonal logic grids.", href: "/p/hexa-path", tag: "Logic", category: "games" },
    // { title: "Binary Switch", icon: "🔌", desc: "Toggle bits to match binary targets.", href: "/p/binary-switch", tag: "Computing", category: "games" },
    // { title: "Circuit Flow", icon: "⚡", desc: "Route power through logic gates.", href: "/p/circuit-flow", tag: "Expert", category: "games" },
    // { title: "Resonance", icon: "🌊", desc: "Align waves and frequencies.", href: "/p/resonance", tag: "Physics", category: "games" },
    // { title: "Quantum Maze", icon: "🌌", desc: "Navigate shifting quantum dimensions.", href: "/p/quantum-maze", tag: "Advanced", category: "games" },
    // Tools
    { title: "Birthdate Secrets", icon: "🎂", desc: "Fascinating facts about your birthday.", href: "/p/birthdate-calculator", tag: "Popular", category: "tools" },
    { title: "Pixel Art Studio", icon: "🎨", desc: "Create 8-bit pixel art instantly.", href: "/p/pixel-art", tag: "Creative", category: "tools" },
    { title: "History Timeline", icon: "⏳", desc: "See your place in human history.", href: "/p/history-timeline", tag: "Insight", category: "tools" },
    { title: "Life Expectancy", icon: "❤️", desc: "Realistic estimate of your remaining years.", href: "/p/life-expectancy-calculator", tag: "Deep", category: "tools" },
    { title: "Lifestyle Factor", icon: "⚖️", desc: "How your habits affect your future.", href: "/p/life-style-factor", tag: "Health", category: "tools" },
  ];

  const filtered = allTools.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.desc.toLowerCase().includes(search.toLowerCase()) ||
    t.tag.toLowerCase().includes(search.toLowerCase())
  );

  const gamesCount = allTools.filter(t => t.category === "games").length;
  const toolsCount = allTools.filter(t => t.category === "tools").length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESC} />
        <meta name="keywords" content="free online games, brain games, logic puzzles, discovery tools, boredom games, no sign up games, instant play games, life calculator, pixel art maker, birthday calculator, word games, number puzzles, educational games" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:url" content="https://www.imborednow.com/tools" />
        <meta property="og:image" content="https://www.imborednow.com/og-tools.png" />
        <meta property="og:site_name" content="ImBoredNow" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESC} />
        <meta name="twitter:image" content="https://www.imborednow.com/og-tools.png" />
        <meta name="twitter:site" content="@imborednow" />
        <meta name="twitter:creator" content="@imborednow" />

        {/* Additional SEO */}
        <link rel="canonical" href="https://www.imborednow.com/tools" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="ImBoredNow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Discovery Lab - Free Games & Tools",
            "description": PAGE_DESC,
            "url": "https://www.imborednow.com/tools",
            "publisher": {
              "@type": "Organization",
              "name": "ImBoredNow",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.imborednow.com/logo.png"
              }
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.imborednow.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Discovery Lab",
                  "item": "https://www.imborednow.com/tools"
                }
              ]
            }
          })}
        </script>
      </Head>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-20%] left-[-5%] w-[40%] h-[60%] bg-indigo-100 blur-[120px] rounded-full opacity-40" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[50%] bg-purple-100 blur-[100px] rounded-full opacity-40" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span>›</span>
            <span className="text-slate-900 font-semibold">Discovery Lab</span>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                {allTools.length}+ Free Experiences
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Discovery Lab</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Free brain-training games, logic puzzles, and personal discovery tools. No sign-up. Instant play. Cure boredom in seconds.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search games and tools..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-6 py-5 pl-14 bg-white border-2 border-slate-200 rounded-2xl text-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                />
                <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              {search && (
                <p className="text-sm text-slate-500 mt-3">
                  Found {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"
                </p>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          {!search && (
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {/* <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl">
                  🎮
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">{gamesCount}</div>
                  <div className="text-xs text-slate-600 font-medium">Brain Games</div>
                </div>
              </div> */}

              <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white text-xl">
                  🔧
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">{toolsCount}</div>
                  <div className="text-xs text-slate-600 font-medium">Discovery Tools</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xl">
                  ⚡
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">0s</div>
                  <div className="text-xs text-slate-600 font-medium">Load Time</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {search ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.length > 0 ? (
              filtered.map((tool, i) => <ToolCard key={i} tool={tool} />)
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">No results found</h3>
                <p className="text-slate-600 mb-8">Try searching for something else</p>
                <button
                  onClick={() => setSearch("")}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Games Section */}
            {/* <div id="games" className="mb-24 scroll-mt-20">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl shadow-lg shadow-indigo-500/30">
                  🎮
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900">Interactive Games</h2>
                  <p className="text-slate-600">Challenge your brain with logic puzzles and word games</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allTools.filter(t => t.category === "games").map((tool, i) => <ToolCard key={i} tool={tool} />)}
              </div>
            </div> */}

            {/* Tools Section */}
            <div id="tools" className="scroll-mt-20 mb-24">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white text-2xl shadow-lg shadow-pink-500/30">
                  🔧
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900">Discovery Tools</h2>
                  <p className="text-slate-600">Personal insights and creative utilities</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allTools.filter(t => t.category === "tools").map((tool, i) => <ToolCard key={i} tool={tool} />)}
              </div>
            </div>
          </>
        )}
      </div>

      {/* SEO Content Section - 800+ Words */}
      <section className="bg-slate-900 text-slate-300 py-32 mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-invert prose-indigo lg:prose-xl max-w-none space-y-12">

            {/* Header */}
            <div className="text-center space-y-6 mb-20">
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                The Ultimate Collection of <br />
                <span className="text-indigo-400">Free Games & Discovery Tools</span>
              </h2>
              <p className="lead text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto">
                Welcome to the Discovery Lab, where boredom meets its match. Our curated collection of brain games,
                logic puzzles, and personal discovery tools is designed to entertain, challenge, and enlighten you-all
                without requiring a single sign-up or download.
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">Why Free Online Games Still Matter in 2026</h3>
              <p>
                In an era dominated by massive game downloads, subscription services, and pay-to-win mechanics, the
                humble browser-based game represents something revolutionary: instant accessibility. When you search
                for "free games to play when bored" or "online games no download," you are not just looking for
                entertainment-you are seeking immediate gratification without barriers.
              </p>
              <p>
                The Discovery Lab embraces this philosophy completely. Every game and tool on this page loads in seconds,
                works on any device, and requires zero commitment. Whether you have five minutes between meetings or an
                entire evening to kill, these experiences adapt to your schedule, not the other way around. This is
                the antidote to the modern gaming industry's tendency toward bloat and complexity.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">Brain Games That Actually Train Your Brain</h3>
              <p>
                Not all games are created equal when it comes to cognitive benefits. The games in our Interactive Games
                section are specifically chosen for their ability to engage different aspects of mental processing.
                Number Merge and Binary Switch challenge your pattern recognition and mathematical thinking. Word Link
                and Daily Crossword expand your vocabulary and linguistic flexibility. Hexa-Path and Quantum Maze push
                your spatial reasoning to new limits.
              </p>
              <p>
                Research in cognitive psychology consistently shows that engaging with logic puzzles and word games
                can improve working memory, processing speed, and problem-solving skills. While no game will magically
                increase your IQ, regular engagement with challenging puzzles creates new neural pathways and strengthens
                existing ones. The key is variety and progressive difficulty-exactly what our collection provides.
              </p>
              <p>
                Unlike passive entertainment like scrolling social media or watching videos, these games demand active
                participation. Your brain must analyze, strategize, and execute. This active engagement is what
                separates meaningful mental stimulation from mere distraction. When you finish a level of Circuit Flow
                or solve a particularly tricky Resonance puzzle, you have genuinely accomplished something measurable.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">Discovery Tools: Know Thyself Through Data</h3>
              <p>
                The Discovery Tools section represents a different approach to fighting boredom: self-knowledge through
                calculation and visualization. These tools transform abstract concepts like time, mortality, and personal
                history into tangible, often surprising insights.
              </p>
              <p>
                The Birthdate Secrets tool, for example, does not just tell you what day of the week you were born. It
                places your birth in historical context, shows you fascinating events from that date, and reveals
                numerical patterns in your birthday that most people never consider. This kind of personalized information
                creates a sense of connection to the broader human story.
              </p>
              <p>
                Similarly, the Life Expectancy Calculator and Lifestyle Factor tools engage with one of humanity's most
                fundamental questions: How much time do I have left, and how should I spend it? While these calculators
                cannot predict your exact lifespan, they can provide sobering perspective based on actuarial data and
                lifestyle factors. Many users report that seeing their remaining years visualized motivates positive
                life changes.
              </p>
              <p>
                The History Timeline tool offers something equally valuable: temporal perspective. By showing major
                historical events that occurred during your lifetime, it contextualizes your personal experience within
                the sweep of human history. This kind of reflection combats the narrow presentism that often characterizes
                modern life.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">The Philosophy of Instant Play: No Sign-Up Required</h3>
              <p>
                One of the most important features of the Discovery Lab is not what it includes, but what it excludes:
                mandatory account creation. In an internet increasingly dominated by walled gardens and data collection,
                the ability to simply click and play feels revolutionary.
              </p>
              <p>
                This design choice reflects a core belief: your time is valuable, and friction kills engagement. Every
                additional step between impulse and action-creating an account, verifying email, choosing a username-
                represents an opportunity for you to reconsider and leave. By eliminating these barriers, we respect
                your spontaneity and reduce the psychological cost of trying something new.
              </p>
              <p>
                Moreover, the no-sign-up approach addresses privacy concerns. You do not need to trust us with your
                email address or personal information to enjoy these experiences. Your engagement is anonymous by default,
                and we have no ability to track you across sessions or build a profile of your behavior. In an era of
                surveillance capitalism, this represents a return to the early internet's ethos of free exploration.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">From Casual to Expert: Progressive Difficulty Done Right</h3>
              <p>
                The games in the Discovery Lab span a wide range of difficulty levels, intentionally designed to
                accommodate everyone from casual players to puzzle veterans. Daily Crossword provides accessible
                word challenges that anyone can attempt, while Quantum Maze demands spatial reasoning that will
                challenge even experienced gamers.
              </p>
              <p>
                This progression matters because sustainable engagement requires a balance between challenge and ability.
                Psychologist Mihaly Csikszentmihalyi's concept of "flow state"-that optimal experience where challenge
                perfectly matches skill-applies directly to game design. Too easy, and you are bored. Too hard, and you
                are frustrated. Our collection lets you find your personal sweet spot and gradually increase difficulty
                as your skills develop.
              </p>
              <p>
                The tag system (Trending, Popular, Logic, Expert, etc.) helps guide you toward appropriate experiences.
                If you are new to logic puzzles, start with something tagged "Popular" before attempting "Expert" level
                challenges. This self-directed progression respects your autonomy while providing helpful guardrails.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">Mobile-First Design for On-the-Go Boredom Relief</h3>
              <p>
                Every game and tool in the Discovery Lab is built with mobile devices as a primary consideration.
                Whether you are waiting for a bus, sitting in a coffee shop, or procrastinating at your desk, these
                experiences work seamlessly on phones, tablets, and computers alike.
              </p>
              <p>
                This mobile-first approach reflects the reality of modern internet usage. More than 60% of web traffic
                now comes from mobile devices, and that percentage is even higher for casual gaming. Responsive design
                ensures that Pixel Art Studio's canvas works just as well with touch controls as with a mouse, and that
                Word Link's letter grids are appropriately sized for thumbs rather than cursors.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">The Future of the Discovery Lab</h3>
              <p>
                The current collection of games and tools represents just the beginning. We are constantly developing
                new experiences based on user feedback and emerging trends in game design and personal analytics.
                Future additions will maintain the same core principles: instant accessibility, genuine engagement,
                and respect for your time and privacy.
              </p>
              <p>
                Some upcoming categories include: advanced statistical calculators, creative writing tools, meditation
                and focus timers, and more experimental game mechanics. Each addition will be thoroughly tested to
                ensure it meets our standards for quality and loading speed.
              </p>
            </div>

            {/* Closing */}
            <div className="pt-12 border-t border-slate-700">
              <p className="text-lg text-slate-400 leading-relaxed">
                The Discovery Lab exists to prove that the internet can still be a place of spontaneous exploration
                and genuine discovery. No ads, no sign-ups, no hidden costs-just pure, instant engagement with ideas
                and challenges that make you think. Whether you spend five minutes or five hours here, our goal is
                simple: help you transform boredom into curiosity, idle time into growth, and distraction into focus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              ImBoredNow Discovery Lab
            </h3>
            <p className="text-slate-600 font-medium">
              Free brain-training games and personal discovery tools. Built by{" "}
              <Link href="/" className="text-indigo-600 hover:text-purple-600 font-bold transition-colors">
                ImBoredNow
              </Link>
            </p>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} ImBoredNow. Curing boredom, one click at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}

function ToolCard({ tool }: { tool: any }) {
  const tagColors: Record<string, string> = {
    Trending: "bg-gradient-to-r from-orange-500 to-red-500 text-white",
    Popular: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white",
    Daily: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
    Logic: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
    Computing: "bg-gradient-to-r from-slate-700 to-slate-900 text-white",
    Expert: "bg-gradient-to-r from-rose-500 to-pink-500 text-white",
    Physics: "bg-gradient-to-r from-violet-500 to-purple-500 text-white",
    Advanced: "bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white",
    Creative: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
    Insight: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white",
    Deep: "bg-gradient-to-r from-indigo-600 to-blue-600 text-white",
    Health: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
  };

  const tagClass = tagColors[tool.tag] || "bg-slate-100 text-slate-600";

  return (
    <Link
      href={tool.href}
      className="group relative bg-white border-2 border-slate-100 rounded-3xl p-8 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 hover:-translate-y-2"
    >
      {/* Icon with glow effect */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
        <div className="relative text-6xl transform group-hover:scale-110 transition-transform duration-500">
          {tool.icon}
        </div>
      </div>

      <div className="flex items-start justify-between mb-4">
        <h3 className="font-black text-xl text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight pr-2">
          {tool.title}
        </h3>
        <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-full tracking-wider flex-shrink-0 shadow-sm ${tagClass}`}>
          {tool.tag}
        </span>
      </div>

      <p className="text-slate-600 text-[15px] leading-relaxed mb-6 line-clamp-2">
        {tool.desc}
      </p>

      <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm group-hover:gap-3 transition-all">
        <span>Launch Now</span>
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </Link>
  );
}