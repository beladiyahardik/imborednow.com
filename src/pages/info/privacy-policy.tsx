import Head from "next/head";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | I&apos;m Bored Now - Your Data Safety</title>
        <meta
          name="description"
          content="Learn how I'm Bored Now protects your privacy. We offer games to play when bored without invasive tracking. Read our Google AdSense & Cookie policy."
        />
        <meta name="keywords" content="privacy policy, bored button, games to play when bored, google dart cookie, data safety" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-[#FAFAFA] pb-12 font-sans">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-900 pt-24 pb-32">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 tracking-tight">
              Privacy <span className="text-blue-500">First.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">
              We provide <strong>games to play when bored</strong>, not tools to track you. 
              Transparent, secure, and developer-verified.
            </p>
          </div>
        </section>

        {/* Main Content Card */}
        <section className="relative z-10 -mt-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
              
              {/* Trust Badge Section */}
              <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex flex-wrap justify-center gap-8 md:gap-16">
                <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                  <span className="text-green-500 text-xl">✓</span> No Personal Data
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                  <span className="text-blue-500 text-xl">✓</span> AdSense Compliant
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                  <span className="text-purple-500 text-xl">✓</span> Family Safe
                </div>
              </div>

              <div className="p-8 md:p-16 space-y-12">
                
                {/* Introduction */}
                <div className="prose prose-slate max-w-none">
                  <h2 className="text-3xl font-black text-slate-900 mb-6">Transparency & Trust</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    At <strong>I&apos;m Bored Now</strong>, operated by our dedicated team of developers, your privacy is our priority. We understand that when you are looking for a <strong>bored button</strong> or <strong>websites when bored</strong>, you want instant fun, not invasive tracking. This policy explains what data we (don&apos;t) collect and how our partners help keep this site free.
                  </p>
                </div>

                {/* 1. Log Files & Data */}
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                  <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">1. Log Files & Standard Data</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Like most <strong>fun button websites</strong>, we follow a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, and referring/exit pages. These are not linked to any information that is personally identifiable.
                  </p>
                </div>

                {/* 2. Google DoubleClick DART Cookie - CRITICAL FOR ADSENSE */}
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">2. Advertising Partners & Cookies</h3>
                  <p className="text-slate-600 leading-relaxed">
                    To maintain our library of <strong>free browser games</strong>, we partner with third-party vendors, including Google.
                  </p>
                  <div className="border-l-4 border-blue-500 pl-6 py-2 space-y-4 text-slate-600 italic">
                    <p>
                      <strong>Google DART Cookie:</strong> Google, as a third-party vendor, uses cookies to serve ads on our site. Google&apos;s use of the DART cookie enables it to serve ads to our users based on their visit to <strong>I&apos;m Bored Now</strong> and other sites on the Internet.
                    </p>
                    <p>
                      You may opt out of the use of the DART cookie by visiting the Google ad and content network Privacy Policy at the following URL: 
                      <a href="https://policies.google.com/technologies/ads" className="text-blue-600 font-bold underline ml-1">Google Ad Policy</a>.
                    </p>
                  </div>
                </div>

                {/* 3. Children's Privacy */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">3. Children&apos;s Information</h3>
                  <p className="text-slate-600 leading-relaxed">
                    We believe our <strong>games to play when bored</strong> should be safe for everyone. <strong>I&apos;m Bored Now</strong> does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think your child provided this kind of information on our website, we strongly encourage you to contact us immediately, and we will do our best to promptly remove such information.
                  </p>
                </div>

                {/* 4. Contact Policy */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[2.5rem] text-white">
                  <h3 className="text-2xl font-black mb-4">Questions from Boredom Killers?</h3>
                  <p className="text-blue-100 mb-6 font-medium">
                    If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact our development team.
                  </p>
                  <Link href="/p/contact">
                    <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black hover:bg-blue-50 transition-all active:scale-95">
                      Contact Team 📧
                    </button>
                  </Link>
                </div>

              </div>

              {/* Legal Footer */}
              <div className="bg-slate-50 p-8 text-center border-t border-slate-100">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                  Last Modified: January 2026 • I&apos;m Bored Now Development Group
                </p>
                <Link href="/">
                   <span className="text-slate-400 hover:text-slate-600 text-xs cursor-pointer underline">Back to the Boredom Button</span>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Ad Placeholder */}
        <div className="container mx-auto px-4 mt-16">
          <div className="max-w-4xl mx-auto bg-slate-100 border-2 border-dashed border-slate-200 rounded-3xl h-24 flex items-center justify-center text-slate-400 text-xs font-black uppercase tracking-widest">
            AdSense Safe Zone
          </div>
        </div>
      </div>
    </>
  );
}