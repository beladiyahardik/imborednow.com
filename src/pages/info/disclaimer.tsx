import Head from "next/head";
import Link from "next/link";

export default function Disclaimers() {
  return (
    <>
      <Head>
        <title>Disclaimers | I'm Bored Now - Safety & Fun Policy</title>
        <meta
          name="description"
          content="Read our detailed disclaimers and terms. We provide safe, family-friendly games to play when bored via our red bored button, but external content and ads are third-party."
        />
        <meta name="keywords" content="bored button disclaimer, games to play when bored, red button website terms, disclaimer policy, adsense compliance, external links policy" />
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
              Keeping our <strong>boredom-killing</strong> community safe, responsible, and fully informed.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 -mt-10 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">

              {/* Important Alert Box for AdSense & General Compliance */}
              <div className="bg-amber-50 border-b border-amber-100 p-6 md:p-8 flex items-center gap-4">
                <div className="text-3xl">⚖️</div>
                <div>
                  <p className="text-amber-900 text-sm font-semibold leading-relaxed">
                    <strong>Effective Date: January 31, 2026</strong>
                  </p>
                  <p className="text-amber-900 text-sm font-semibold leading-relaxed mt-2">
                    By accessing or using <strong>I'm Bored Now</strong> (imborednow.com), including clicking our iconic <strong>red Bored Button</strong>, you agree to these Disclaimers and Terms of Use. We provide fun, free entertainment to cure boredom  -  but responsibility and safety always come first.
                  </p>
                </div>
              </div>

              <div className="p-8 md:p-16 space-y-16">

                {/* 1. General Purpose & Entertainment Only */}
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                      <span className="text-purple-600">01.</span> Entertainment Purpose Only
                    </h2>
                  </div>
                  <div className="md:col-span-2 text-slate-600 leading-relaxed space-y-4">
                    <p>
                      <strong>I'm Bored Now</strong> is designed purely for <strong>entertainment and recreational purposes</strong>. All content  -  including games, jokes, facts, riddles, moral dilemmas, quirky calculators, and random activities accessed via the Bored Button  -  is meant to provide light-hearted fun when you're feeling bored.
                    </p>
                    <p>
                      Nothing on this site constitutes professional advice (medical, legal, financial, psychological, or otherwise). We are developers creating a fun platform, not experts in any advisory field. Always consult qualified professionals for serious matters.
                    </p>
                  </div>
                </div>

                {/* 2. External Links & Third-Party Content (Critical for AdSense) */}
                <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-slate-50">
                  <div className="md:col-span-1">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                      <span className="text-blue-600">02.</span> External Links & Third-Party Content
                    </h2>
                  </div>
                  <div className="md:col-span-2 text-slate-600 leading-relaxed space-y-4">
                    <p>
                      Our <strong>Bored Button</strong> and certain features redirect or link to external websites, games, videos, or content curated for entertainment. These are third-party sites we do not own, control, or operate.
                    </p>
                    <p className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <strong>Important:</strong> We carefully select and review linked content to ensure it is generally family-friendly and appropriate. However, we cannot guarantee the ongoing accuracy, safety, availability, or suitability of external content. Once you leave <strong>I'm Bored Now</strong>, you are subject to the third-party site's own terms, privacy policies, and practices. We are not responsible for any content, products, services, or experiences on external sites.
                    </p>
                    <p>
                      Use external links at your own discretion and risk. Parents/guardians should supervise children when using the Bored Button.
                    </p>
                  </div>
                </div>

                {/* 3. Advertisements & Third-Party Ads (AdSense Compliance) */}
                <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-slate-50">
                  <div className="md:col-span-1">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                      <span className="text-indigo-600">03.</span> Advertisements
                    </h2>
                  </div>
                  <div className="md:col-span-2 text-slate-600 leading-relaxed space-y-4">
                    <p>
                      To keep our site completely free, we display advertisements through Google AdSense and its partners. These ads are provided by third-party vendors and may be personalized based on your browsing activity (see our Privacy Policy for details).
                    </p>
                    <p className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                      <strong>Note:</strong> We do not endorse any advertised products, services, or websites. Advertisements are automatically served by Google and its partners  -  we have limited control over specific ad content. If you see an inappropriate ad, please report it via Google's tools or contact us.
                    </p>
                    <p>
                      Clicking on ads will take you to third-party sites, where their own terms and policies apply.
                    </p>
                  </div>
                </div>

                {/* 4. Accuracy & No Warranties */}
                <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-slate-50">
                  <div className="md:col-span-1">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                      <span className="text-emerald-600">04.</span> Accuracy & No Warranties
                    </h2>
                  </div>
                  <div className="md:col-span-2 text-slate-600 leading-relaxed space-y-4">
                    <p>
                      While we strive to provide enjoyable and accurate content (facts, trivia, calculators, etc.), we make <strong>no warranties</strong> about the completeness, reliability, or accuracy of any information on the site.
                    </p>
                    <p>
                      Tools like life expectancy calculators, "dog years" converters, or similar features are <strong>for entertainment only</strong> and use simplified, non-scientific formulas. Results are approximate and should not be used for real decisions.
                    </p>
                    <p>
                      The site is provided "as is" and "as available" without any guarantees of uninterrupted or error-free operation.
                    </p>
                  </div>
                </div>

                {/* 5. Limitation of Liability & User Responsibility */}
                <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-slate-50">
                  <div className="md:col-span-1">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                      <span className="text-red-600">05.</span> Limitation of Liability
                    </h2>
                  </div>
                  <div className="md:col-span-2 text-slate-600 leading-relaxed space-y-4">
                    <p>
                      To the fullest extent permitted by law, <strong>I'm Bored Now</strong> and its operator (Hardik, sole proprietor) shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the site, external links, advertisements, or content.
                    </p>
                    <p>
                      This includes (but is not limited to) technical issues, data loss, exposure to inappropriate external content, or any "time wasted" having too much fun.
                    </p>
                    <p>
                      You use the site at your own risk and are responsible for your actions while browsing.
                    </p>
                  </div>
                </div>

                {/* 6. Intellectual Property */}
                <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-slate-50">
                  <div className="md:col-span-1">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                      <span className="text-orange-600">06.</span> Intellectual Property
                    </h2>
                  </div>
                  <div className="md:col-span-2 text-slate-600 leading-relaxed">
                    <p>
                      All original content on <strong>I'm Bored Now</strong> (design, text, code, curation) is owned by the site operator. External linked content belongs to its respective owners. Unauthorized reproduction or distribution is prohibited.
                    </p>
                  </div>
                </div>

                {/* 7. Governing Law & Changes */}
                <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-slate-50">
                  <div className="md:col-span-1">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                      <span className="text-teal-600">07.</span> Governing Law & Updates
                    </h2>
                  </div>
                  <div className="md:col-span-2 text-slate-600 leading-relaxed space-y-4">
                    <p>
                      These terms are governed by the laws of India. We reserve the right to update this page at any time  -  changes will be posted here with a new effective date.
                    </p>
                    <p>
                      Continued use of the site after updates constitutes acceptance of the new terms.
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom Human-Tone Close */}
              <div className="bg-slate-900 p-10 md:p-16 text-center">
                <p className="text-white text-xl font-medium mb-8">
                  We built this site because everyone deserves quick, harmless fun.
                  <br className="hidden md:block" /> Click responsibly, laugh often, and beat boredom safely!
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                  <Link href="/">
                    <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black hover:bg-purple-100 transition-all active:scale-95">
                      Back to the Button 🔴
                    </button>
                  </Link>
                  <Link href="/info/contact">
                    <button className="px-8 py-4 bg-slate-800 text-slate-400 rounded-2xl font-black hover:text-white transition-all">
                      Questions? Contact Us
                    </button>
                  </Link>
                </div>
                <p className="mt-10 text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                  Last Updated: January 31, 2026 • Operated by Hardik and Team • Surat, Gujarat, India
                </p>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}