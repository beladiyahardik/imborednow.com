import Head from "next/head";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | Support for Games to Play When Bored</title>
        <meta
          name="description"
          content="Have a suggestion for our boredom button? Contact the developers of I'm Bored Now. Share your favorite websites when bored or report a bug."
        />
        <meta name="keywords" content="contact bored button, support, suggest games to play when bored, red button website feedback" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-[#FAFAFA] pb-12 font-sans">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-900 pt-32 pb-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-transparent"></div>
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 tracking-tight">
              Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Connect.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
              Whether you have a new idea for <strong>games to play when bored</strong> or found a broken link on our <strong>red button</strong>, we want to hear it.
            </p>
          </div>
        </section>

        {/* Main Content Card */}
        <section className="relative z-10 -mt-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-purple-100 overflow-hidden border border-slate-100 grid md:grid-cols-2">

              {/* Left Side: Information */}
              <div className="p-8 md:p-16 bg-slate-50 border-r border-slate-100">
                <h2 className="text-3xl font-black text-slate-900 mb-8">Why Reach Out?</h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl">💡</div>
                    <div>
                      <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-1">Feature Requests</h3>
                      <p className="text-slate-500 text-sm italic">Found a <strong>website when bored</strong> that we missed? Send us the link!</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl">🐞</div>
                    <div>
                      <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-1">Report a Bug</h3>
                      <p className="text-slate-500 text-sm italic">If a <strong>bored game</strong> isn&apos;t loading, our developers will fix it ASAP.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl">🤝</div>
                    <div>
                      <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-1">Partnerships</h3>
                      <p className="text-slate-500 text-sm italic">For advertising and collaboration regarding our <strong>fun button</strong>.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-slate-200">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Primary Contact</p>
                  <a href="mailto:aeybhai@gmail.com" className="text-2xl font-black text-purple-600 hover:text-orange-500 transition-colors">
                    aeybhai@gmail.com
                  </a>
                </div>
              </div>

              {/* Right Side: Human-Written "Quick Form" Alternative */}
              <div className="p-8 md:p-16 bg-white flex flex-col justify-center">
                <div className="text-center md:text-left space-y-6">
                  <h2 className="text-3xl font-black text-slate-900">Direct Support</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Our team of developers usually responds within <strong>24-48 hours</strong>. We are real people (no machine-tone bots here!) who love making the internet a less boring place.
                  </p>

                  <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100">
                    <p className="text-purple-900 font-bold mb-2">Quick Tip:</p>
                    <p className="text-purple-800/70 text-sm">
                      If you are suggesting <strong>fun games to play while bored</strong>, please include the URL so we can review it faster!
                    </p>
                  </div>

                  <div className="space-y-4 pt-6">
                    <button
                      onClick={() => window.location.href = 'mailto:aeybhai@gmail.com'}
                      className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                    >
                      SEND US AN EMAIL 📧
                    </button>
                    <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      Spam-free zone. Your privacy matters.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom SEO Content Section */}
            <div className="mt-20 max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase">Help Us Kill Boredom</h3>
              <p className="text-slate-500 leading-loose">
                Since the launch of the <strong>bored button</strong>, our goal has always been to provide the most engaging <strong>online bored</strong> activities for people worldwide. Your feedback helps us keep our library of <strong>browser games free</strong> and our collection of <strong>fun facts</strong> fresh. If you&apos;re <strong>so bored</strong> that you&apos;ve reached the end of the internet, let us know - we&apos;ll build something new for you.
              </p>
            </div>

            <div className="mt-12 text-center">
              <Link href="/">
                <button className="text-slate-500 hover:text-purple-600 font-black uppercase text-sm tracking-[0.2em] transition-colors">
                  ← Back to the boredom-killer
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}