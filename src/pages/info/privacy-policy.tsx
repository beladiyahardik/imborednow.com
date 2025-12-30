import Head from "next/head";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | I'm Bored Now</title>
        <meta
          name="description"
          content="Our privacy policy – simple, clear, and family-friendly. We don't collect your data!"
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
                Privacy Policy
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium opacity-95 max-w-3xl mx-auto">
                We keep it super simple and super safe! 😊
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 sm:py-24 bg-white/60 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-purple-100 space-y-10">
              <div className="text-center mb-10">
                <span className="text-8xl">🔒</span>
                <p className="text-2xl font-bold text-gray-800 mt-4">
                  Your privacy is important to us – and we make it easy!
                </p>
              </div>

              <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                <div className="flex items-start gap-5">
                  <span className="text-4xl">✅</span>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">
                      We don't collect any personal data
                    </h2>
                    <p>
                      I'm Bored Now is just for fun! We don't ask for your name,
                      age, address, or anything like that. You can play games,
                      read jokes, and enjoy everything without giving us any
                      information.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="text-4xl">🍪</span>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">
                      No cookies from us
                    </h2>
                    <p>
                      We don't store any cookies on your device. That means no
                      tracking, no profiles, no sneaky stuff.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="text-4xl">📊</span>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">
                      What about ads?
                    </h2>
                    <p>
                      We show ads to keep the site free for everyone 🎉. Those
                      ads are provided by Google. Google might use its own
                      cookies to show you more relevant ads (that's called
                      personalized advertising). We don't control that part –
                      it's all handled by Google. If you want to learn more or
                      turn it off, you can visit Google's privacy settings here:
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 underline font-bold"
                      >
                        {" "}
                        Google's Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="text-4xl">📧</span>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">
                      Newsletter (totally optional!)
                    </h2>
                    <p>
                      If you choose to subscribe to our newsletter for daily
                      jokes and fun updates, we only store the email address you
                      give us – and only because you asked us to! You can
                      unsubscribe anytime with one click. We never share or sell
                      your email.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="text-4xl">👨‍👩‍👧‍👦</span>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-2">
                      Kid-friendly & family-safe
                    </h2>
                    <p>
                      Everything on I'm Bored Now is made to be safe and fun for
                      all ages. No scary stuff, no personal questions, just pure
                      boredom-busting joy!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 mt-12 text-center">
                <p className="text-xl font-bold text-gray-800">
                  In short: We respect your privacy and keep things simple,
                  safe, and fun! 🌈
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
