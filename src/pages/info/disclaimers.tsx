import Head from "next/head";
import Link from "next/link";

export default function Disclaimers() {
  return (
    <>
      <Head>
        <title>Disclaimers | I&apos;m Bored Now - Safety & Fun Policy</title>
        <meta
          name="description"
          content="Read our friendly disclaimers. We provide games to play when bored and fun websites, but please use our red button and tools responsibly!"
        />
        <meta name="keywords" content="bored button disclaimer, games to play when bored, red button website policy, fun button terms" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-[#FDFCFD] pb-12 font-sans">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-900 py-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tighter">
              The <span className="text-purple-500">Legal</span> Stuff
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">
              Keeping our <strong>boredom-killing</strong> community safe, happy, and informed.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 -mt-10 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
              
              {/* Important Alert Box for AdSense */}
              <div className="bg-amber-50 border-b border-amber-100 p-6 md:p-8 flex items-center gap-4">
                 <div className="text-3xl">⚖️</div>
                 <p className="text-amber-900 text-sm font-semibold leading-relaxed">
                    By using <strong>I&apos;m Bored Now</strong> and clicking our <strong>red button</strong>, you agree to the following terms. We want you to find the best <strong>games to play when bored</strong>, but safety comes first!
                 </p>
              </div>

              <div className="p-8 md:p-16 space-y-16">
                
                {/* 1. Entertainment Purpose */}
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                        <span className="text-purple-600">01.</span> Entertainment
                    </h2>
                  </div>
                  <div className="md:col-span-2 text-slate-600 leading-relaxed">
                    <p>
                      All content provided on this website—including <strong>fun button games</strong>, jokes, and random activities—is for <strong>entertainment purposes only</strong>. We are a team of developers creating digital experiences to help when you are <strong>so bored</strong>. None of the content on this site should be taken as professional, legal, or medical advice.
                    </p>
                  </div>
                </div>

                {/* 2. AdSense & Third Party Disclaimer (Critical for Approval) */}
                <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-slate-50">
                  <div className="md:col-span-1">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                        <span className="text-blue-600">02.</span> Ads & Links
                    </h2>
                  </div>
                  <div className="md:col-span-2 text-slate-600 leading-relaxed space-y-4">
                    <p>
                      To keep our <strong>browser games free</strong>, we display advertisements (Google AdSense). We also link to external <strong>websites when bored</strong> users might find interesting. 
                    </p>
                    <p className="bg-slate-50 p-4 rounded-2xl text-sm italic">
                      <strong>Note:</strong> We do not control the content of external sites. Once you click away from our <strong>random button</strong>, you are subject to that new site&apos;s own privacy policies and terms.
                    </p>
                  </div>
                </div>

                {/* 3. The "Calculators" Disclaimer */}
                <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-slate-50">
                  <div className="md:col-span-1">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                        <span className="text-emerald-600">03.</span> Accuracy
                    </h2>
                  </div>
                  <div className="md:col-span-2 text-slate-600 leading-relaxed">
                    <p>
                      While we try to provide the most <strong>amazing facts</strong> and quirky calculators, we cannot guarantee 100% accuracy. Our life expectancy or &quot;dog year&quot; calculators are <strong>silly tools</strong> meant for laughs, not scientific data. Always double-check facts before using them for school or work!
                    </p>
                  </div>
                </div>

                {/* 4. Use at Your Own Risk */}
                <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-slate-50">
                  <div className="md:col-span-1">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                        <span className="text-red-600">04.</span> Responsibility
                    </h2>
                  </div>
                  <div className="md:col-span-2 text-slate-600 leading-relaxed">
                    <p>
                      Using our <strong>red button website</strong> is at your own risk. We work hard to ensure all <strong>games to play when bored</strong> are safe and family-friendly, but we are not liable for any technical issues, data loss, or &quot;wasted time&quot; resulting from your use of the site.
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom Human-Tone Close */}
              <div className="bg-slate-900 p-10 md:p-16 text-center">
                <p className="text-white text-xl font-medium mb-8">
                  We built this because we believe the world needs more fun. 
                  <br className="hidden md:block" /> Use it, enjoy it, and stay curious!
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                   <Link href="/">
                      <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black hover:bg-purple-100 transition-all active:scale-95">
                        Back to the Button 🔴
                      </button>
                   </Link>
                   <Link href="/p/contact">
                      <button className="px-8 py-4 bg-slate-800 text-slate-400 rounded-2xl font-black hover:text-white transition-all">
                        Questions? Contact Us
                      </button>
                   </Link>
                </div>
                <p className="mt-10 text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                    Last Updated: January 2026 • Made by Developers Who Hate Boredom
                </p>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}