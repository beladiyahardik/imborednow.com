import Head from "next/head";
import Link from "next/link";

export default function Disclaimers() {
  return (
    <>
      <Head>
        <title>Disclaimers | I'm Bored Now</title>
        <meta
          name="description"
          content="Our friendly disclaimers – keeping things fun, safe, and clear for everyone!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 pb-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-95"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center text-white">
            <div className="max-w-4xl mx-auto space-y-8">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight drop-shadow-2xl">
                Disclaimers
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium opacity-95 max-w-3xl mx-auto">
                Just a few friendly notes to keep the fun safe and happy! 😊
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 sm:py-24 bg-white/60 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-purple-100 space-y-10">
              <div className="text-center mb-10">
                <span className="text-8xl">ℹ️</span>
                <p className="text-2xl font-bold text-gray-800 mt-4">
                  Important info – explained in a fun and easy way!
                </p>
              </div>

              <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                <div className="flex items-start gap-5">
                  <span className="text-4xl">🎉</span>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">
                      1. Just for Fun & Entertainment
                    </h2>
                    <p>
                      Everything on I'm Bored Now – jokes, games, pranks, facts,
                      calculators, and activities – is meant purely for
                      entertainment. It's not professional advice, medical
                      guidance, financial tips, or anything serious like that.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="text-4xl">🧮</span>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">
                      2. Calculators Are for Laughs
                    </h2>
                    <p>
                      Our fun calculators (like love compatibility, dog years,
                      or life expectancy estimates) are silly tools made to make
                      you smile. They're not accurate or scientific – just
                      playful guesses!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="text-4xl">🃏</span>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">
                      3. Pranks Are Harmless & Playful
                    </h2>
                    <p>
                      Web pranks (like fake update screens) are designed to be
                      light-hearted and funny. Please use them responsibly and
                      only on friends who will laugh with you. We’re not
                      responsible for any misunderstandings or over-the-top
                      reactions!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="text-4xl">🧠</span>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">
                      4. Facts Are Cool, But Check Them
                    </h2>
                    <p>
                      We share amazing and fun facts, but sometimes details can
                      change or sources vary. If you're using a fact for school
                      or something important, double-check it!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="text-4xl">🌐</span>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">
                      5. External Links & Sites
                    </h2>
                    <p>
                      We sometimes link to other websites for extra fun. We try
                      to choose safe ones, but we don’t control them. Explore
                      carefully and remember to come back for more
                      boredom-busting here!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="text-4xl">📱</span>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">
                      6. Use at Your Own Risk
                    </h2>
                    <p>
                      The site is provided "as is" – we work hard to keep it fun
                      and working, but we can’t guarantee it will always be
                      perfect or available 24/7. Have fun, but don’t rely on it
                      for anything super important.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="text-4xl">❤️</span>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">
                      7. Made with Love
                    </h2>
                    <p>
                      This site is created to spread joy and kill boredom
                      worldwide. We’re not liable for excessive smiling,
                      uncontrollable laughter, or sudden bursts of happiness!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 mt-12 text-center">
                <p className="text-xl font-bold text-gray-800">
                  Thanks for understanding! Now go have some fun – responsibly,
                  of course! 🌈✨
                </p>
                <p className="mt-4 text-gray-600">
                  Last updated: December 30, 2025
                </p>
              </div>

              <div className="text-center pt-8">
                <Link href="/">
                  <button className="group px-10 py-5 text-2xl font-bold bg-white text-purple-600 rounded-full shadow-2xl hover:shadow-purple-400/50 hover:scale-105 transition-all duration-300">
                    Back to the Fun 🎉
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
