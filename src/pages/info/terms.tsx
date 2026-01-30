import Head from "next/head";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | I'm Bored Now - Fun Usage Rules</title>
        <meta
          name="description"
          content="Official Terms of Service for I'm Bored Now. Guidelines for safely using our bored button, random games, entertainment tools, and third-party content."
        />
        <meta name="keywords" content="terms of service, terms and conditions, bored button rules, games to play when bored, user agreement, adsense compliance, external links policy" />
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
              Clear, fair rules for enjoying our <strong>bored button</strong>, random activities, 
              and collection of <strong>games to play when bored</strong>.
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
                    <p className="text-slate-500 text-sm mt-2">
                      <strong>Effective Date: January 31, 2026</strong>
                    </p>
                    <p className="text-slate-500 text-sm">
                      By accessing or using <strong>I'm Bored Now</strong> (imborednow.com), including clicking the Bored Button or any features, you confirm that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree, please do not use the site.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-16">
                <div className="grid gap-16">
                  
                  {/* 1. Eligibility & Access */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">01</span>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Eligibility & Access</h3>
                    </div>
                    <div className="pl-11 space-y-4 text-slate-600 leading-relaxed">
                      <p>
                        Our site is intended for users of all ages seeking fun entertainment. However, if you are under 13 years of age, you must use the site under the supervision of a parent or legal guardian who agrees to these Terms on your behalf.
                      </p>
                      <p>
                        We reserve the right to restrict or terminate access to the site at any time without notice.
                      </p>
                    </div>
                  </div>

                  {/* 2. Intellectual Property */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">02</span>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Intellectual Property</h3>
                    </div>
                    <div className="pl-11 space-y-4 text-slate-600 leading-relaxed">
                      <p>
                        The site, its original design, code, curation, text, graphics, and hosted content are owned by Hardik (sole proprietor) or licensed to us. You are granted a limited, non-exclusive, non-transferable license to access and use the site for personal, non-commercial entertainment purposes only.
                      </p>
                      <p>
                        You may not copy, modify, distribute, scrape, reproduce, or create derivative works from any part of the site without prior written permission.
                      </p>
                    </div>
                  </div>

                  {/* 3. User Conduct & Prohibited Activities (AdSense Critical) */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">03</span>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Prohibited Conduct</h3>
                    </div>
                    <div className="pl-11 space-y-6 text-slate-600 leading-relaxed">
                      <p>To maintain a safe and fair environment, you agree not to:</p>
                      <ul className="list-disc pl-6 space-y-3 text-sm">
                        <li>Use automated scripts, bots, or any tools to interact with the site (including excessive clicking of the Bored Button).</li>
                        <li>Engage in any activity that generates invalid traffic or clicks on advertisements (e.g., clicking your own ads, incentivizing clicks, or using click farms).</li>
                        <li>Attempt to hack, disrupt, overload, or interfere with the site's servers or functionality.</li>
                        <li>Upload, share, or promote harmful, illegal, offensive, or inappropriate content.</li>
                        <li>Use the site for commercial purposes or to promote other products/services without permission.</li>
                        <li>Violate any applicable laws or regulations.</li>
                      </ul>
                      <p className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-sm">
                        <strong>Note:</strong> Violations may result in immediate termination of access and reporting to relevant authorities or ad partners (e.g., Google AdSense).
                      </p>
                    </div>
                  </div>

                  {/* 4. Third-Party Content & External Links */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">04</span>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Third-Party Content & Links</h3>
                    </div>
                    <div className="pl-11 space-y-4 text-slate-600 leading-relaxed">
                      <p>
                        The Bored Button and certain features link to or embed external third-party websites, games, videos, or content. We curate these for entertainment value but do not control, endorse, or guarantee their accuracy, safety, or availability.
                      </p>
                      <p>
                        You access external content at your own risk. We are not responsible for any issues arising from third-party sites, including privacy practices, content quality, or technical problems.
                      </p>
                    </div>
                  </div>

                  {/* 5. Advertisements */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">05</span>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Advertisements</h3>
                    </div>
                    <div className="pl-11 space-y-4 text-slate-600 leading-relaxed">
                      <p>
                        We display ads via Google AdSense and partners to keep the site free. These are third-party advertisements, and we do not endorse any advertised products or services.
                      </p>
                      <p>
                        You agree to interact with ads naturally. Any fraudulent activity (e.g., invalid clicks) violates these Terms and AdSense policies.
                      </p>
                    </div>
                  </div>

                  {/* 6. Disclaimer of Warranties & Limitation of Liability */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">06</span>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Disclaimer & Limitation of Liability</h3>
                    </div>
                    <div className="pl-11 space-y-4 text-slate-600 leading-relaxed">
                      <p>
                        The site is provided "as is" and "as available" without warranties of any kind. We do not guarantee uninterrupted access, error-free operation, or that content will meet your expectations.
                      </p>
                      <p>
                        To the fullest extent permitted by law, Hardik (sole proprietor) and the site shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the site, external links, ads, or content.
                      </p>
                    </div>
                  </div>

                  {/* 7. Termination & Changes */}
                  <div className="space-y-8 pt-8 border-t border-slate-50">
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Termination</h3>
                      <p className="text-slate-600 leading-relaxed">
                        We may suspend or terminate your access at any time for violations of these Terms or for any other reason.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Changes to Terms</h3>
                      <p className="text-slate-600 leading-relaxed">
                        We may update these Terms at any time. Changes will be posted here with a new effective date. Continued use constitutes acceptance.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Governing Law</h3>
                      <p className="text-slate-600 leading-relaxed">
                        These Terms are governed by the laws of India. Any disputes shall be resolved in the courts of Surat, Gujarat, India.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Footer */}
              <div className="bg-slate-50 p-10 md:p-16 text-center">
                <h4 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Ready to Beat Boredom?</h4>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/">
                    <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-slate-200">
                      I AGREE, TAKE ME TO THE FUN 🎉
                    </button>
                  </Link>
                  <Link href="/info/contact">
                    <button className="px-10 py-5 bg-white text-slate-500 border border-slate-200 rounded-2xl font-black hover:text-slate-900 transition-all">
                      HAVE QUESTIONS?
                    </button>
                  </Link>
                </div>
                <p className="mt-12 text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em]">
                  Last Updated: January 31, 2026 • Operated by Hardik and Team • Surat, Gujarat, India
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* AdSense Placement Box */}
        {/* <div className="container mx-auto px-4 mt-20">
          <div className="max-w-4xl mx-auto bg-white border-2 border-dashed border-slate-200 rounded-3xl h-28 flex items-center justify-center text-slate-300 text-[10px] font-black tracking-widest uppercase">
            [ Legal Documentation Ad Placement ]
          </div>
        </div> */}
      </div>
    </>
  );
}