import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: Event) => {
    e.preventDefault();
    alert("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <>
      <Head>
        <title>I'm Bored Now - Fun Activities, Jokes, Games & More!</title>
        <meta
          name="description"
          content="Beat boredom instantly with jokes, facts, games, DIY ideas, and random surprises. Fun for everyone!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-purple-100">
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center gap-1.5">
                <span className="text-3xl">🎯</span>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 cursor-pointer hover:scale-105 transition-transform">
                  I'm Bored Now
                </h1>
              </Link>
              <nav className="hidden md:flex space-x-6 lg:space-x-8">
                {["Home", "Jokes", "Games", "Facts", "Random"].map((item) => (
                  <Link
                    key={item}
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  >
                    <span className="text-gray-700 hover:text-purple-600 font-semibold transition-colors cursor-pointer relative group">
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                ))}
              </nav>
              <button className="md:hidden p-2 text-purple-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section - Enhanced */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-95"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 py-20 sm:py-32 text-center text-white">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight drop-shadow-2xl animate-fade-in">
                Feeling Bored? 😴
                <br />
                <span className="text-yellow-300">Not Anymore!</span>
              </h2>
              <p className="text-lg sm:text-2xl lg:text-3xl font-medium opacity-95 drop-shadow-lg max-w-3xl mx-auto">
                Discover instant fun with jokes, games, amazing facts, and
                endless surprises!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Link href="/p/random-activity">
                  <button className="group px-8 sm:px-12 py-4 sm:py-6 text-xl sm:text-2xl font-bold bg-white text-purple-600 rounded-full shadow-2xl hover:shadow-purple-400/50 hover:scale-110 transition-all duration-300 transform hover:-rotate-2">
                    🎉 Kill My Boredom Now!
                    <span className="inline-block group-hover:translate-x-2 transition-transform ml-2">
                      →
                    </span>
                  </button>
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8 pt-8 text-sm sm:text-base">
                <div className="bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/30">
                  ⚡ 100% Free
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/30">
                  🎮 No Downloads
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/30">
                  😄 Instant Fun
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AdSense Leaderboard */}
        <div className="container mx-auto px-4 sm:px-6 my-8 sm:my-12">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl w-full h-24 flex items-center justify-center text-gray-500 font-semibold shadow-inner">
            [AdSense Leaderboard 728×90]
          </div>
        </div>

        {/* How It Works - Improved */}
        <section className="py-12 sm:py-16 bg-white/60 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-8 sm:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 max-w-5xl mx-auto">
              {[
                {
                  emoji: "😴",
                  title: "Feel Bored",
                  desc: "Staring at the wall? Scrolling endlessly? We get it.",
                },
                {
                  emoji: "👆",
                  title: "Click Anything",
                  desc: "Pick a category or hit the big button. It's that simple!",
                },
                {
                  emoji: "😄",
                  title: "Have Fun Instantly",
                  desc: "Laugh, play, learn — boredom vanishes in seconds!",
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                  <div className="relative text-center space-y-4">
                    <div className="text-6xl sm:text-7xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      {step.emoji}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12 sm:space-y-16">
              {/* Categories - Enhanced */}
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-8 sm:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Choose Your Adventure
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {[
                    {
                      title: "Random Jokes",
                      desc: "Instant laughs guaranteed",
                      emoji: "😂",
                      color: "from-blue-500 to-blue-600",
                      href: "/p/birthdate-calculator",
                    },
                    {
                      title: "Fun Facts",
                      desc: "Mind-blowing trivia daily",
                      emoji: "🧠",
                      color: "from-green-500 to-green-600",
                      href: "/p/life-expectancy-calculator",
                    },
                    {
                      title: "Quick Games",
                      desc: "Play in your browser",
                      emoji: "🎮",
                      color: "from-orange-500 to-orange-600",
                      href: "/p/life-style-factor",
                    },
                    {
                      title: "DIY Ideas",
                      desc: "Creative projects at home",
                      emoji: "✂️",
                      color: "from-purple-500 to-purple-600",
                      href: "/p/ultimate-trolling-page",
                    },
                    {
                      title: "Weird Web",
                      desc: "Hilarious & strange sites",
                      emoji: "🌐",
                      color: "from-pink-500 to-pink-600",
                      href: "/p/pranks/fake-update",
                    },
                    {
                      title: "Relax & Chill",
                      desc: "Calming vibes",
                      emoji: "😌",
                      color: "from-yellow-500 to-yellow-600",
                      href: "/p/funny-pranks",
                    },
                    {
                      title: "Relax & Chill",
                      desc: "Calming vibes",
                      emoji: "😌",
                      color: "from-yellow-500 to-yellow-600",
                      href: "/p/history-timeline",
                    },
                    {
                      title: "Relax & Chill",
                      desc: "Calming vibes",
                      emoji: "😌",
                      color: "from-yellow-500 to-yellow-600",
                      href: "/p/hold-the-button",
                    },
                  ].map((cat) => (
                    <Link key={cat.title} href={cat.href}>
                      <div
                        className={`group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${cat.color} text-white shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 cursor-pointer overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                        <div className="relative text-center space-y-3">
                          <div className="text-5xl sm:text-6xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                            {cat.emoji}
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold">
                            {cat.title}
                          </h3>
                          <p className="text-base sm:text-lg opacity-90">
                            {cat.desc}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Featured Content - Improved */}
              <div>
                <div className="flex items-center gap-1.5 justify-center">
                  <span className="text-3xl sm:text-4xl mb-8 sm:mb-12">🔥</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-center mb-8 sm:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    Popular Right Now
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Dad Joke of the Day",
                      emoji: "🎭",
                      color: "from-purple-400 to-purple-500",
                    },
                    {
                      title: "Mind-Bending Riddle",
                      emoji: "🧩",
                      color: "from-pink-400 to-pink-500",
                    },
                    {
                      title: "5-Minute Browser Game",
                      emoji: "🎮",
                      color: "from-blue-400 to-blue-500",
                    },
                    {
                      title: "Crazy Animal Fact",
                      emoji: "🦁",
                      color: "from-green-400 to-green-500",
                    },
                    {
                      title: "Quick DIY Craft",
                      emoji: "✨",
                      color: "from-orange-400 to-orange-500",
                    },
                    {
                      title: "Relaxing Soundscape",
                      emoji: "🎵",
                      color: "from-indigo-400 to-indigo-500",
                    },
                  ].map((item, i) => (
                    <Link key={i} href="/random">
                      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-purple-100">
                        <div
                          className={`bg-gradient-to-br ${item.color} h-40 sm:h-48 flex items-center justify-center text-6xl sm:text-7xl transform group-hover:scale-110 transition-transform duration-300`}
                        >
                          {item.emoji}
                        </div>
                        <div className="p-5 sm:p-6">
                          <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 mb-4 text-sm sm:text-base">
                            Trending today! Click to try it.
                          </p>
                          <span className="text-purple-600 font-bold hover:underline inline-flex items-center group">
                            Try It Now
                            <svg
                              className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* In-content Ad */}
              <div className="my-12">
                <div className="bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl w-full h-64 flex items-center justify-center text-gray-500 font-semibold shadow-inner">
                  [AdSense Rectangle 336×280]
                </div>
              </div>

              {/* Value Proposition Section */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 sm:p-12 rounded-3xl shadow-xl border border-purple-100">
                <h2 className="text-2xl sm:text-3xl font-black text-center mb-8 text-gray-800">
                  Why I'm Bored Now? 🤔
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      icon: "🎯",
                      title: "Always Fresh",
                      desc: "New content added daily to keep things exciting",
                    },
                    {
                      icon: "🚀",
                      title: "Super Fast",
                      desc: "No waiting, no loading. Instant entertainment",
                    },
                    {
                      icon: "👨‍👩‍👧‍👦",
                      title: "Family Friendly",
                      desc: "Safe, clean fun for all ages",
                    },
                    {
                      icon: "📱",
                      title: "Works Everywhere",
                      desc: "Phone, tablet, computer—we got you covered",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-4 items-start bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="text-4xl">{item.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Ad Unit */}
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl w-full h-64 flex items-center justify-center text-gray-500 font-semibold shadow-inner">
                  [AdSense 300×250]
                </div>
              </div>

              {/* Stats Widget */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-purple-100">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center">
                  🎊 Fun Stats
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      num: "50K+",
                      label: "Jokes Told",
                      color: "text-purple-600",
                    },
                    {
                      num: "120K+",
                      label: "Happy Visitors",
                      color: "text-pink-600",
                    },
                    {
                      num: "1M+",
                      label: "Boredom Killed",
                      color: "text-green-600",
                    },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl"
                    >
                      <div
                        className={`text-3xl sm:text-4xl font-black ${stat.color} mb-1`}
                      >
                        {stat.num}
                      </div>
                      <p className="text-gray-600 font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl border border-purple-200">
                <h3 className="text-lg font-bold mb-4 text-gray-800">
                  ⚡ Quick Jump
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    "Surprise Me!",
                    "Daily Challenge",
                    "Top Rated",
                    "Random Pick",
                  ].map((link) => (
                    <Link key={link} href="/random">
                      <div className="bg-white p-3 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer text-sm font-medium text-gray-700 hover:text-purple-600">
                        → {link}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Testimonials - Enhanced */}
        <section className="py-12 sm:py-16 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-8 sm:mb-12 flex items-center gap-2 justify-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl">💬</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                What People Say
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
              {[
                {
                  quote:
                    "This site saved my lunch break every single day! So much fun and variety!",
                  name: "Sarah K.",
                  rating: 5,
                },
                {
                  quote:
                    "Best random jokes on the internet! I laugh out loud every time.",
                  name: "Mike T.",
                  rating: 5,
                },
                {
                  quote:
                    "My kids absolutely love the games section. Clean, safe, and entertaining!",
                  name: "Emma L.",
                  rating: 5,
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-purple-100"
                >
                  <div className="flex justify-center mb-4 text-yellow-400 text-xl">
                    {"⭐".repeat(t.rating)}
                  </div>
                  <p className="text-base sm:text-lg italic mb-6 text-gray-700 leading-relaxed">
                    &quot;{t.quote}&quot;
                  </p>
                  <p className="font-bold text-purple-600 text-center">
                    — {t.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter - Improved */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
          </div>
          <div className="relative container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 drop-shadow-lg">
              📧 Never Be Bored Again
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-95 max-w-2xl mx-auto">
              Get daily fun, jokes, and surprises delivered straight to your
              inbox!
            </p>
            <div className="w-full flex flex-col gap-1 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-5 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <button className="px-6 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="mt-3 text-center text-sm opacity-75">
                ✅ Free forever • 📬 No spam • 🔒 Unsubscribe anytime
              </p>
            </div>
          </div>
        </section>

        {/* Final Ad */}
        <div className="container mx-auto px-4 sm:px-6 my-8 sm:my-12">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl w-full h-24 sm:h-32 flex items-center justify-center text-gray-500 font-semibold shadow-inner">
            [AdSense Horizontal Unit]
          </div>
        </div>

        {/* Footer - Enhanced */}
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-10 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center space-y-6">
              <div className="flex justify-center items-center space-x-2 text-2xl sm:text-3xl font-black">
                <div className="flex flex-row gap-1.5 items-center">
                  <span className="text-3xl">🎯</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    I'm Bored Now
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                Made with ❤️ to cure boredom worldwide. Join thousands
                who&apos;ve already escaped the monotony!
              </p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
                {["About", "Privacy Policy", "Terms", "Contact", "Sitemap"].map(
                  (link) => (
                    <Link
                      key={link}
                      href={`/${link.toLowerCase().replace(" ", "-")}`}
                    >
                      <span className="hover:text-purple-400 transition-colors cursor-pointer">
                        {link}
                      </span>
                    </Link>
                  )
                )}
              </div>
              <div className="pt-6 border-t border-gray-700">
                <p className="text-gray-500 text-xs sm:text-sm">
                  &copy; 2025 I'm Bored Now. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
