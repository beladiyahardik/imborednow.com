import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>About | I'm Bored Now - Kill Boredom with Fun & Games</title>
        <meta
          name="description"
          content="Learn more about I'm Bored Now – your go-to place for instant fun, jokes, browser games, pranks, useful calculators, facts, DIY ideas and more!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 pb-12">
        {/* Hero Section - About Style */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-95"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center text-white">
            <div className="max-w-4xl mx-auto space-y-8">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight drop-shadow-2xl">
                About I'm Bored Now
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium opacity-95 max-w-3xl mx-auto">
                Your ultimate boredom-killing companion – packed with instant
                fun, laughter, and surprises!
              </p>
            </div>
          </div>
        </section>

        {/* Main About Content */}
        <section className="py-16 sm:py-24 bg-white/60 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="prose prose-lg lg:prose-xl mx-auto text-gray-700 space-y-8">
              <h2 className="text-3xl sm:text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                What Is I'm Bored Now?
              </h2>
              <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto">
                I'm Bored Now is a completely free website designed to rescue
                you from those dull moments. Whether you're waiting in line, on
                a break, or just scrolling endlessly, we deliver instant
                entertainment right in your browser – no downloads, no sign-ups,
                no hassle.
              </p>

              <div className="my-12 text-center">
                <span className="text-6xl sm:text-8xl">😴 ➡️ 😄</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                What You'll Find Here
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
                {[
                  {
                    emoji: "😂",
                    title: "Jokes & Puns",
                    desc: "Thousands of dad jokes, clever one-liners, and random laugh-out-loud moments.",
                  },
                  {
                    emoji: "🎮",
                    title: "Browser Games",
                    desc: "Quick, addictive games you can play instantly – no installation needed.",
                  },
                  {
                    emoji: "🃏",
                    title: "Web Pranks",
                    desc: "Harmless, funny pranks like fake update screens to troll your friends.",
                  },
                  {
                    emoji: "🧮",
                    title: "Useful (But Fun) Calculators",
                    desc: "Age in dog years, love compatibility, birthdate facts, life expectancy, and more quirky tools.",
                  },
                  {
                    emoji: "🧠",
                    title: "Amazing Facts",
                    desc: "Mind-blowing trivia about animals, history, science, and the universe.",
                  },
                  {
                    emoji: "✂️",
                    title: "DIY Ideas & Activities",
                    desc: "Creative projects, challenges, and things to do when you're stuck at home.",
                  },
                  {
                    emoji: "🌐",
                    title: "Weird & Wonderful Web",
                    desc: "Links to strange sites, relaxing sounds, optical illusions, and hidden internet gems.",
                  },
                  {
                    emoji: "🎲",
                    title: "Random Surprises",
                    desc: "One-click randomness – you never know what fun you'll get next!",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100"
                  >
                    <div className="text-5xl mb-4 text-center transform group-hover:scale-110 transition-transform">
                      {item.emoji}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-center">{item.desc}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Our Mission
              </h2>
              <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto">
                We believe boredom shouldn't exist in a world full of amazing
                things to laugh at, play with, and discover. Our goal is simple:
                make it as easy as possible for anyone to find something fun in
                seconds. Everything is family-friendly, fast-loading, and 100%
                free – forever.
              </p>

              <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 sm:p-12 rounded-3xl shadow-xl border border-purple-200 my-16">
                <h2 className="text-2xl sm:text-3xl font-black text-center mb-8 text-gray-800">
                  Why We Built This
                </h2>
                <ul className="space-y-4 text-lg max-w-3xl mx-auto">
                  <li className="flex items-start gap-4">
                    <span className="text-2xl">🎯</span>
                    <span>
                      To give people a quick escape when life feels monotonous
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-2xl">⚡</span>
                    <span>Instant fun without apps, accounts, or waiting</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-2xl">👨‍👩‍👧‍👦</span>
                    <span>Safe and clean entertainment for all ages</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-2xl">❤️</span>
                    <span>Because laughter and play make the world better</span>
                  </li>
                </ul>
              </div>

              <div className="text-center py-8">
                <Link href="/">
                  <button className="group px-10 py-5 text-2xl font-bold bg-white text-purple-600 rounded-full shadow-2xl hover:shadow-purple-400/50 hover:scale-105 transition-all duration-300">
                    Back to Killing Boredom 🎉
                    <span className="inline-block group-hover:translate-x-2 transition-transform ml-3">
                      →
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Ad Placeholder */}
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl w-full h-32 flex items-center justify-center text-gray-500 font-semibold shadow-inner">
            [AdSense Leaderboard 728×90]
          </div>
        </div>
      </div>
    </>
  );
}
