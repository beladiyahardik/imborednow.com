import Head from "next/head";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | I&apos;m Bored Now - Fun Usage Rules</title>
        <meta
          name="description"
          content="Read the terms of service for I'm Bored Now. Professional guidelines for using our bored button, games, and entertainment tools safely."
        />
        <meta name="keywords" content="terms of service, bored button rules, games to play when bored, user agreement, fun button terms" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-[#F8F9FA] pb-12 font-sans">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-900 pt-24 pb-32">
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 tracking-tighter">
              The <span className="text-orange-500">Playbook.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">
              Guidelines for using our <strong>bored button</strong> and enjoying our 
              collection of <strong>games to play when bored</strong>.
            </p>
          </div>
        </section>

        {/* Main Content Card */}
        <section className="relative z-10 -mt-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              
              {/* Acceptance Header */}
              <div className="p-8 md:p-12 border-b border-slate-50 bg-slate-50/30">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl">🤝</div>
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl font-black text-slate-900">Agreement to Terms</h2>
                    <p className="text-slate-500 text-sm">
                      By accessing <strong>I&apos;m Bored Now</strong>, you agree to follow these rules. 
                      If you don&apos;t agree, please stop using the <strong>fun button</strong> immediately.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-16">
                <div className="grid gap-16">
                  
                  {/* 1. Use of Service */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">01</span>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Access & Eligibility</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed pl-11">
                      Our <strong>red button website</strong> is designed for users of all ages looking for <strong>online bored</strong> activities. However, if you are under 13, please enjoy our <strong>fun facts</strong> and games with the supervision of a parent or guardian.
                    </p>
                  </div>

                  {/* 2. Intellectual Property */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">02</span>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Intellectual Property</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed pl-11">
                      The code, design, and unique <strong>games to play when bored</strong> hosted on this platform are owned by our development team. You may not copy, scrape, or republish our <strong>browser games free</strong> of charge on other platforms without our written permission.
                    </p>
                  </div>

                  {/* 3. Prohibited Conduct (AdSense Safety) */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">03</span>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Prohibited Conduct</h3>
                    </div>
                    <div className="pl-11 space-y-4 text-slate-600 leading-relaxed">
                      <p>To keep the community safe, you agree not to:</p>
                      <ul className="list-disc pl-5 space-y-2 text-sm italic">
                        <li>Attempt to hack or disrupt our <strong>bored button</strong> servers.</li>
                        <li>Use automated bots to click our <strong>random button</strong>.</li>
                        <li>Share harmful or offensive content in any interactive areas.</li>
                        <li>Use our <strong>web pranks</strong> to harass or cause distress to others.</li>
                      </ul>
                    </div>
                  </div>

                  {/* 4. Limitation of Liability */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">04</span>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Liability Disclaimer</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed pl-11">
                      <strong>I&apos;m Bored Now</strong> provides entertainment &quot;as is.&quot; While we strive to offer the best <strong>websites when bored</strong> users need them, we are not responsible for any technical errors or loss of data while using our site.
                    </p>
                  </div>

                  {/* 5. Changes to Terms */}
                  <div className="pt-8 border-t border-slate-50">
                    <p className="text-slate-400 text-sm">
                      We reserve the right to modify these terms. Continued use of our <strong>boredom-killer</strong> tools after changes are posted constitutes your acceptance of the new rules.
                    </p>
                  </div>

                </div>
              </div>

              {/* Action Footer */}
              <div className="bg-slate-50 p-10 md:p-16 text-center">
                <h4 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Ready to Play?</h4>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/">
                    <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-slate-200">
                      I AGREE, TAKE ME TO THE FUN 🎉
                    </button>
                  </Link>
                  <Link href="/p/contact">
                    <button className="px-10 py-5 bg-white text-slate-500 border border-slate-200 rounded-2xl font-black hover:text-slate-900 transition-all">
                      HAVE QUESTIONS?
                    </button>
                  </Link>
                </div>
                <p className="mt-12 text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em]">
                  Last Updated: January 2026 • Verified by the Boredom-Buster Dev Team
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* AdSense Placement Box */}
        <div className="container mx-auto px-4 mt-20">
          <div className="max-w-4xl mx-auto bg-white border-2 border-dashed border-slate-200 rounded-3xl h-28 flex items-center justify-center text-slate-300 text-[10px] font-black tracking-widest uppercase">
            [ Legal Documentation Ad Placement ]
          </div>
        </div>
      </div>
    </>
  );
}