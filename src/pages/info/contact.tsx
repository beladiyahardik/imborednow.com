import Head from "next/head";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | I'm Bored Now</title>
        <meta
          name="description"
          content="Get in touch with us! We'd love to hear your feedback, suggestions, or just a hello 😊"
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
                Contact Us
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium opacity-95 max-w-3xl mx-auto">
                We love hearing from you! Drop us a message anytime 😊
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 sm:py-24 bg-white/60 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-purple-100 space-y-10">
              <div className="text-center mb-10">
                <span className="text-8xl">✉️</span>
                <p className="text-2xl font-bold text-gray-800 mt-4">
                  Say hello, share ideas, or tell us your favorite joke!
                </p>
              </div>

              <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                <div className="text-center">
                  <p className="mb-6">
                    Whether you have feedback, a fun suggestion, a cool joke to
                    share, or just want to say hi – we’re all ears!
                  </p>

                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 max-w-2xl mx-auto">
                    <p className="text-xl font-bold text-gray-800 mb-4">
                      Email us at:
                    </p>
                    <a
                      href="mailto:aeybhai@gmail.com"
                      className="text-3xl sm:text-4xl font-black text-purple-600 hover:text-pink-600 transition-colors break-all"
                    >
                      aeybhai@gmail.com
                    </a>
                    <p className="mt-6 text-gray-700">
                      Click the email above or copy it and send us a message. We
                      read every email and try to reply as soon as we can! 🚀
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="text-center p-6 bg-purple-50 rounded-2xl border border-purple-200">
                    <span className="text-5xl mb-4 block">💡</span>
                    <p className="font-bold text-gray-800">Got a suggestion?</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Tell us what new fun stuff you'd love to see!
                    </p>
                  </div>
                  <div className="text-center p-6 bg-pink-50 rounded-2xl border border-pink-200">
                    <span className="text-5xl mb-4 block">😂</span>
                    <p className="font-bold text-gray-800">Share a joke</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Send us your best jokes – we might feature them!
                    </p>
                  </div>
                  <div className="text-center p-6 bg-orange-50 rounded-2xl border border-orange-200">
                    <span className="text-5xl mb-4 block">👋</span>
                    <p className="font-bold text-gray-800">Just say hi</p>
                    <p className="text-sm text-gray-600 mt-2">
                      We love friendly hellos from boredom-killers like you!
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 text-center mt-12">
                  <p className="text-xl font-bold text-gray-800">
                    Thanks for making I'm Bored Now more fun every day! 🌟
                  </p>
                  <p className="mt-4 text-gray-600">
                    We appreciate every message. Keep smiling and keep having
                    fun!
                  </p>
                </div>
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
