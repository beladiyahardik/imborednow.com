import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | The Original Bored Button & Games to Play When Bored</title>
        <meta
          name="description"
          content="Meet the developers behind I'm Bored Now. Discover the web's best collection of games to play when bored, the famous red button, and fun websites to kill time."
        />
        <meta name="keywords" content="about bored button, games to play when bored, red button website, websites when bored, fun button game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-[#FDFCFD] pb-12 font-sans">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 tracking-tight">
              Behind the <span className="text-red-500">Button.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto font-medium">
              We are a global team of developers dedicated to solving the world&apos;s 
              most common problem: <span className="text-white italic">&quot;I am bored.&quot;</span>
            </p>
          </div>
        </section>

        <section className="py-16 -mt-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Content */}
              <div className="lg:col-span-8 space-y-12">
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <h2 className="text-3xl font-black text-slate-900 mb-6">Our Story & Mission</h2>
                  <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed">
                    <p>
                      Started by a small group of creative developers, <strong>I&apos;m Bored Now</strong> was built with a single goal: to curate the internet&apos;s most entertaining &quot;rabbit holes.&quot; We realized that while the internet is vast, finding <strong>fun games to play while bored</strong> often feels like a chore.
                    </p>
                    <p>
                      We developed our version of the <strong>red button website</strong> to act as a digital teleportation device. Every time you click, our algorithm selects a hand-picked experience—ranging from <strong>old internet games</strong> to mind-bending trivia—ensuring you never see the same thing twice in a row.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <h2 className="text-3xl font-black text-slate-900 mb-8">What Makes Us Authoritative?</h2>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl">💻</div>
                      <h3 className="font-black text-slate-800 uppercase text-sm tracking-widest">Expert Curation</h3>
                      <p className="text-slate-500 text-sm">Our developers manually vet every <strong>boredom-killing website</strong> for safety, speed, and fun-factor before it enters our database.</p>
                    </div>
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-2xl">🛡️</div>
                      <h3 className="font-black text-slate-800 uppercase text-sm tracking-widest">Safe & Family Friendly</h3>
                      <p className="text-slate-500 text-sm">Whether you are <strong>bored at school</strong> or work, our content is designed to be accessible and appropriate for all ages.</p>
                    </div>
                  </div>
                </div>

                {/* Google DART & Advertising Policy - CRITICAL FOR ADSENSE */}
                <div className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-200">
                  <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                    <span className="text-blue-600">i</span> Advertising & DART Policy
                  </h2>
                  <div className="text-sm text-slate-600 space-y-4 font-medium">
                    <p>
                      To help keep our <strong>random button game</strong> free for everyone, we use third-party advertising companies to serve ads when you visit our website.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Google DART Cookie:</strong> Google, as a third-party vendor, uses cookies to serve ads on our site. Google&apos;s use of the DART cookie enables it to serve ads to our users based on their visit to our sites and other sites on the Internet.</li>
                      <li><strong>Opting Out:</strong> Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy.</li>
                      <li><strong>Transparency:</strong> We do not sell your personal data. Our ads are served to provide <strong>websites when bored</strong> enthusiasts with a high-quality, free experience.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column: Sidebar / Stats */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 rounded-[2.5rem] text-white shadow-xl">
                  <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">The Developer Team</h3>
                  <p className="text-purple-100 text-sm leading-relaxed mb-6">
                    We are a collective of UX designers and Full-stack developers who believe the <strong>bored button</strong> is a fundamental human right.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">JD</div>
                      <span className="text-sm font-bold">Lead Curator</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">AS</div>
                      <span className="text-sm font-bold">UX Engineer</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-black text-slate-900 mb-4">Quick Links</h3>
                  <ul className="space-y-3 text-sm font-bold text-purple-600">
                    <li className="hover:translate-x-1 transition-transform cursor-pointer">
                        <Link href="/p/random-activity">🔴 Press the Red Button</Link>
                    </li>
                    <li className="hover:translate-x-1 transition-transform cursor-pointer">
                        <Link href="/p/weird-websites">🌐 Weird Websites</Link>
                    </li>
                    <li className="hover:translate-x-1 transition-transform cursor-pointer">
                        <Link href="/p/mind-bending-riddle">🧩 Solve a Riddle</Link>
                    </li>
                  </ul>
                </div>

                <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center h-64 text-slate-400 text-xs font-bold uppercase tracking-widest text-center">
                  Sidebar Ad<br/>(300 x 600)
                </div>
              </div>

            </div>

            {/* Final CTA */}
            <div className="mt-20 text-center">
                <h2 className="text-3xl font-black text-slate-900 mb-8">Ready to stop being bored?</h2>
                <Link href="/">
                    <button className="px-12 py-5 bg-red-600 text-white rounded-full font-black text-xl hover:bg-red-500 transition-all shadow-xl hover:shadow-red-200 active:scale-95">
                        GO BACK TO THE BUTTON 🚀
                    </button>
                </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}