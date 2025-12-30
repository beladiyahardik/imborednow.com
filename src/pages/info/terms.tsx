import Head from "next/head";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | I'm Bored Now</title>
        <meta
          name="description"
          content="Our simple and friendly Terms & Conditions. Fun rules for a fun site!"
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
                Terms & Conditions
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium opacity-95 max-w-3xl mx-auto">
                Simple rules for having lots of fun! 🎉
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 sm:py-24 bg-white/60 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-purple-100 space-y-10">
              <div className="text-center mb-10">
                <span className="text-8xl">📜</span>
                <p className="text-2xl font-bold text-gray-800 mt-4">
                  Welcome to the fun zone! Here are our super easy rules.
                </p>
              </div>

              <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                <div className="flex items-start gap-5">
                  <span className="text-4xl">🎈</span>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">
                      1. Have Fun!
                    </h2>
                    <p>
                      This site is all about killing boredom with jokes, games,
                      pranks, facts, calculators, DIY ideas, and more. Feel free
                      to laugh, play, and enjoy everything we offer!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="text-4xl">👨‍👩‍👧‍👦</span>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">
                      2. Be Kind & Family-Friendly
                    </h2>
                    <p>
                      Our site is made for everyone – kids, teens, adults, and
                      families. Please use it in a nice and respectful way. No
                      mean stuff allowed!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="text-4xl">🃏</span>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">
                      3. Pranks Are Just for Laughs
                    </h2>
                    <p>
                      We have fun web pranks (like fake update screens) meant to
                      playfully tease friends. Use them responsibly and only on
                      people who will laugh along. Never use them to scare or
                      upset anyone.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="text-4xl">🌐</span>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">
                      4. External Links
                    </h2>
                    <p>
                      Sometimes we link to other cool websites. We try to pick
                      safe ones, but we’re not responsible for what’s on those
                      sites. Explore at your own adventure!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="text-4xl">📧</span>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">
                      5. Newsletter
                    </h2>
                    <p>
                      If you sign up for our newsletter, you agree to receive
                      fun emails from us. You can unsubscribe anytime with one
                      click – no hard feelings!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="text-4xl">🛡️</span>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">
                      6. No Guarantees (But Lots of Fun)
                    </h2>
                    <p>
                      We do our best to keep the site working and full of fresh
                      fun, but we can’t promise it will always be perfect. Use
                      it as-is, and let us know if something’s not working!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="text-4xl">⚖️</span>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">
                      7. Rules Can Change
                    </h2>
                    <p>
                      We might update these terms sometimes. We’ll let you know
                      if we make big changes. By continuing to use the site, you
                      agree to the latest version.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 mt-12 text-center">
                <p className="text-xl font-bold text-gray-800">
                  That’s it! Short, sweet, and full of fun. Thanks for visiting
                  I'm Bored Now! 🌟
                </p>
                <p className="mt-4 text-gray-600">
                  Last updated: December 30, 2025
                </p>
              </div>

              <div className="text-center pt-8">
                <Link href="/">
                  <button className="group px-10 py-5 text-2xl font-bold bg-white text-purple-600 rounded-full shadow-2xl hover:shadow-purple-400/50 hover:scale-105 transition-all duration-300">
                    Back to the Fun Zone 🎉
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
