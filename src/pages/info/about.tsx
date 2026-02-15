import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | I'm Bored Now - The Original Bored Button & Games When Bored</title>
        <meta
          name="description"
          content="Discover the story behind I'm Bored Now – the ultimate red bored button and curated collection of safe, family-friendly games, trivia, and activities to beat boredom. Meet our dedicated development team in India."
        />
        <meta
          name="keywords"
          content="about bored button, games to play when bored, red button website, websites when bored, fun button game, bored button team, indian developers"
        />
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
              A passionate team of developers from India dedicated to curing boredom with safe, fun, and instantly accessible entertainment.
            </p>
          </div>
        </section>

        <section className="py-16 -mt-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Main Content */}
              <div className="lg:col-span-8 space-y-12">
                {/* Our Story & Mission - Expanded */}
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <h2 className="text-3xl font-black text-slate-900 mb-6">
                    Our Story & Mission
                  </h2>
                  <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed space-y-6">
                    <p>
                      <strong>I'm Bored Now</strong> began as a simple idea in 2025: create the ultimate digital escape for anyone uttering the phrase “I’m bored.” Founded by Hardik in Surat, Gujarat, India, our platform has grown into one of the web’s most beloved boredom-busting destinations.
                    </p>
                    <p>
                      We hand-curate thousands of high-quality, family-friendly activities  -  from classic browser games and mind-bending riddles to quirky calculators, fascinating facts, and interactive tools. Our signature <strong>red Bored Button</strong> uses a smart algorithm to deliver fresh, randomized experiences every click, ensuring endless variety without repetition.
                    </p>
                    <p>
                      Our mission is straightforward: provide instant, safe, and free entertainment for everyone  -  whether you're a student sneaking a quick break, a professional needing a mental reset, or a family looking for wholesome fun. We prioritize quality, safety, and accessibility above all.
                    </p>
                  </div>
                </div>

                {/* What Makes Us Different - Depth & Authority */}
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <h2 className="text-3xl font-black text-slate-900 mb-8">
                    Why Users Trust I'm Bored Now
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="w-14 h-14 bg-purple-100 rounded-3xl flex items-center justify-center text-3xl">
                        🔍
                      </div>
                      <h3 className="font-black text-slate-800 uppercase text-sm tracking-widest">
                        Rigorous Expert Curation
                      </h3>
                      <p className="text-slate-600">
                        Every game, link, and activity is manually reviewed by our team for safety, performance, and entertainment value. We reject anything inappropriate, slow-loading, or low-quality.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-14 h-14 bg-green-100 rounded-3xl flex items-center justify-center text-3xl">
                        🛡️
                      </div>
                      <h3 className="font-black text-slate-800 uppercase text-sm tracking-widest">
                        Family-Friendly & Safe
                      </h3>
                      <p className="text-slate-600">
                        Designed for all ages. No adult content, no scams, no excessive ads. Parents can feel confident letting kids explore.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-14 h-14 bg-blue-100 rounded-3xl flex items-center justify-center text-3xl">
                        ⚡
                      </div>
                      <h3 className="font-black text-slate-800 uppercase text-sm tracking-widest">
                        Instant & No Barriers
                      </h3>
                      <p className="text-slate-600">
                        Zero sign-ups, no downloads, no paywalls. Just pure, instant fun available on any device.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-14 h-14 bg-indigo-100 rounded-3xl flex items-center justify-center text-3xl">
                        🌍
                      </div>
                      <h3 className="font-black text-slate-800 uppercase text-sm tracking-widest">
                        Global Community Focus
                      </h3>
                      <p className="text-slate-600">
                        Built by a diverse Indian development team serving millions worldwide with transparent, user-first practices.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Updated Advertising Transparency - Modern AdSense Compliance */}
                <div className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-200">
                  <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <span className="text-blue-600 text-3xl">ℹ️</span> Transparency in Advertising
                  </h2>
                  <div className="text-slate-700 space-y-5 leading-relaxed">
                    <p>
                      To keep <strong>I'm Bored Now</strong> completely free and accessible to everyone, we partner with Google AdSense and trusted third-party vendors to display advertisements.
                    </p>
                    <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-200 space-y-4">
                      <p className="font-medium">
                        Third-party vendors, including Google, use cookies to serve ads based on your prior visits to our site and other websites.
                      </p>
                      <p className="font-medium">
                        Google's use of advertising cookies enables it and its partners to serve relevant ads based on your browsing activity.
                      </p>
                      <p className="font-medium">
                        You can opt out of personalized advertising at any time via:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 font-medium">
                        <li>
                          <a href="https://www.google.com/settings/ads" className="text-blue-600 underline font-bold">
                            Google Ads Settings
                          </a>
                        </li>
                        <li>
                          <a href="http://www.aboutads.info/choices/" className="text-blue-600 underline font-bold">
                            www.aboutads.info
                          </a> (for other third-party vendors)
                        </li>
                      </ul>
                      <p className="mt-4 text-sm">
                        Full details in our <Link href="/info/privacy-policy" className="text-blue-600 underline font-bold">Privacy Policy</Link>.
                      </p>
                    </div>
                    <p>
                      We never sell personal data and are fully committed to transparency, compliance, and delivering a high-quality experience.
                    </p>
                  </div>
                </div>

                {/* Commitment to Quality */}
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <h2 className="text-3xl font-black text-slate-900 mb-6">
                    Our Commitment to You
                  </h2>
                  <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed space-y-4">
                    <p>
                      As a small, independent team, we pour passion into every update. We regularly refresh content, improve performance, and listen to user feedback to ensure <strong>I'm Bored Now</strong> remains the go-to destination for instant fun.
                    </p>
                    <p>
                      All original content is created and curated by us in India. We adhere strictly to platform policies (including Google AdSense) and prioritize user safety and satisfaction above revenue.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Team & Quick Links */}
              <div className="lg:col-span-4 space-y-8">
                {/* Team Section - Enhanced */}
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 rounded-[2.5rem] text-white shadow-xl">
                  <h3 className="text-xl font-black mb-6 uppercase tracking-tighter">
                    Meet the Team Behind the Fun
                  </h3>
                  <p className="text-purple-100 text-sm leading-relaxed mb-8">
                    A talented group of full-stack developers, designers, and creatives based in Gujarat, India  -  united by a shared hatred of boredom.
                  </p>

                  <div className="space-y-6">
                    {/* Hardik B. */}
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full border-4 border-white/30 overflow-hidden shrink-0 shadow-xl">
                          <img className="w-full h-full object-cover" src="/hardik.png" alt="Hardik B." />
                        </div>
                        <div>
                          <p className="font-bold">Hardik B.</p>
                          <p className="text-xs text-purple-200 uppercase tracking-wider mt-1">Founder & Lead Developer</p>
                        </div>
                      </div>
                      <a href="https://www.linkedin.com/in/beladiya-hardik/" target="_blank" rel="noopener" className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
                        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                    </div>

                    {/* Piyush K. */}
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full border-4 border-white/30 overflow-hidden shrink-0 shadow-xl">
                          <img className="w-full h-full object-cover" src="/piyush.jpg" alt="Piyush K." />
                        </div>
                        <div>
                          <p className="font-bold">Piyush K.</p>
                          <p className="text-xs text-purple-200 uppercase tracking-wider mt-1">Software Architect</p>
                        </div>
                      </div>
                      <a href="https://www.linkedin.com/in/piyush-koladiya-079496248/" target="_blank" rel="noopener" className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
                        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                    </div>

                    {/* Dhruvin S. */}
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full border-4 border-white/30 overflow-hidden shrink-0 shadow-xl">
                          <img className="w-full h-full object-cover" src="/dhruvin.jpg" alt="Dhruvin S." />
                        </div>
                        <div>
                          <p className="font-bold">Dhruvin S.</p>
                          <p className="text-xs text-purple-200 uppercase tracking-wider mt-1">Co-Founder & UI/UX Designer</p>
                        </div>
                      </div>
                      <a href="https://www.linkedin.com/in/dhruvin-sudani-411756258/" target="_blank" rel="noopener" className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
                        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                    </div>

                    {/* Darshan L. */}
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full border-4 border-white/30 overflow-hidden shrink-0 shadow-xl">
                          <img className="w-full h-full object-cover" src="/darshan.png" alt="Darshan L." />
                        </div>
                        <div>
                          <p className="font-bold">Darshan L.</p>
                          <p className="text-xs text-purple-200 uppercase tracking-wider mt-1">Content Curator & Concepts</p>
                        </div>
                      </div>
                      <a href="https://www.linkedin.com/in/darshan-lukhi-0675962a3/" target="_blank" rel="noopener" className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
                        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-black text-slate-900 mb-6">
                    Explore More
                  </h3>
                  <ul className="space-y-4 text-purple-600 font-bold">
                    <li className="hover:translate-x-2 transition-transform">
                      <Link href="/">🔴 The Famous Red Button</Link>
                    </li>
                    <li className="hover:translate-x-2 transition-transform">
                      <Link href="/info/privacy-policy">🔒 Privacy Policy</Link>
                    </li>
                    <li className="hover:translate-x-2 transition-transform">
                      <Link href="/info/terms">📜 Terms & Conditions</Link>
                    </li>
                    <li className="hover:translate-x-2 transition-transform">
                      <Link href="/info/disclaimer">⚖️ Disclaimer</Link>
                    </li>
                    <li className="hover:translate-x-2 transition-transform">
                      <Link href="/info/contact">✉️ Contact Us</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="mt-20 text-center">
              <h2 className="text-4xl font-black text-slate-900 mb-8">
                Ready to Beat Boredom?
              </h2>
              <Link href="/">
                <button className="px-12 py-6 bg-red-600 text-white rounded-full font-black text-2xl hover:bg-red-500 transition-all shadow-2xl hover:shadow-red-300 active:scale-95">
                  PRESS THE RED BUTTON NOW 🚀
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}