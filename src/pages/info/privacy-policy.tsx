import Head from "next/head";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | I'm Bored Now - Your Data Safety</title>
        <meta
          name="description"
          content="Learn how I'm Bored Now protects your privacy. We offer games to play when bored without invasive tracking. Read our full Google AdSense, cookie, and GDPR policy."
        />
        <meta name="keywords" content="privacy policy, bored button, games to play when bored, google adsense, cookie policy, gdpr compliance, data safety" />
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
              Transparent, secure, and fully compliant.
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
                  <span className="text-green-500 text-xl">✓</span> No Personal Data Collected
                </div>
                {/* <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                  <span className="text-blue-500 text-xl">✓</span> AdSense & GDPR Compliant
                </div> */}
                <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                  <span className="text-purple-500 text-xl">✓</span> Family Safe
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                  <span className="text-indigo-500 text-xl">✓</span> Transparent Advertising
                </div>
              </div>

              <div className="p-8 md:p-16 space-y-12">
                
                {/* Introduction */}
                <div className="prose prose-slate max-w-none">
                  <h2 className="text-3xl font-black text-slate-900 mb-6">Transparency & Trust</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    <strong>Effective Date: January 31, 2026</strong>
                  </p>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Welcome to <strong>I'm Bored Now</strong> (imborednow.com), a fun entertainment site operated by Hardik (sole proprietor), located in Surat, Gujarat, India. We help you beat boredom with a big red Bored Button, random games, jokes, facts, and more  -  all without requiring accounts, logins, or personal information.
                  </p>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Your privacy matters to us. <strong>We do not collect, store, or share any personal information directly.</strong> The only data involved comes from standard web server logs (anonymized) and third-party advertising partners (primarily Google) who may use cookies for ad serving. By using our site, you agree to this Privacy Policy.
                  </p>
                </div>

                {/* 1. Information We Collect */}
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                  <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">1. Information We Collect</h3>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>We collect no personal information directly.</strong> You can enjoy all features anonymously  -  no sign-ups, no emails required (even our contact form is optional and collects only your message).
                  </p>
                  <p className="text-slate-600 leading-relaxed mt-4">
                    Like most websites, we use server log files for technical purposes. These automatically record:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 mt-4 space-y-2">
                    <li>IP address (anonymized)</li>
                    <li>Browser type and version</li>
                    <li>Device information</li>
                    <li>Date/time of visit</li>
                    <li>Referring/exit pages</li>
                  </ul>
                  <p className="text-slate-600 leading-relaxed mt-4">
                    This data is not linked to any identifiable individual and is used only for site improvement and security.
                  </p>
                </div>

                {/* 2. Cookies and Tracking Technologies */}
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                  <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">2. Cookies & Tracking Technologies</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Cookies are small files stored on your device. We use only essential cookies for basic site functionality. Third-party advertising partners (like Google) may use additional cookies and similar technologies (e.g., web beacons) to serve and personalize ads.
                  </p>
                  <p className="text-slate-600 leading-relaxed mt-4">
                    You can control cookies via your browser settings. For personalized advertising opt-outs, see the section below.
                  </p>
                </div>

                {/* 3. Advertising and Third-Party Vendors - FULL ADSENSE DISCLOSURE */}
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">3. Advertising & Third-Party Vendors</h3>
                  <p className="text-slate-600 leading-relaxed">
                    To keep <strong>I'm Bored Now</strong> free, we display ads via Google AdSense and its partners.
                  </p>
                  <div className="border-l-4 border-blue-500 pl-6 py-6 space-y-6 text-slate-700 bg-blue-50/50 rounded-r-2xl">
                    <p>
                      Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to our website or other websites.
                    </p>
                    <p>
                      Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visits to our site and/or other sites on the Internet.
                    </p>
                    <p>
                      Users may opt out of personalized advertising by visiting:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><a href="https://www.google.com/settings/ads" className="text-blue-600 font-bold underline">Google Ads Settings</a></li>
                      <li><a href="http://www.aboutads.info/choices/" className="text-blue-600 font-bold underline">www.aboutads.info</a> (for third-party vendors)</li>
                    </ul>
                    <p className="mt-4">
                      Learn more about how Google uses data: <a href="https://policies.google.com/privacy/partners" className="text-blue-600 font-bold underline">Google Privacy Partners</a>.
                    </p>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    If you reject personalized ads, you&apos;ll still see ads, but they will be non-personalized (contextual).
                  </p>
                </div>

                {/* 4. Personalized vs Non-Personalized Ads */}
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                  <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">4. Personalized vs. Non-Personalized Ads</h3>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Personalized ads</strong> use browsing data to show relevant content. <strong>Non-personalized ads</strong> are based only on general factors (e.g., page topic, location approximation).
                  </p>
                  <p className="text-slate-600 leading-relaxed mt-4">
                    For users in the EEA, UK, or Switzerland, personalized ads require your consent (handled via Google-compliant tools). Without consent, ads default to non-personalized.
                  </p>
                </div>

                {/* 5. GDPR & EEA/UK Users */}
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">5. GDPR Compliance (EEA, UK & Switzerland)</h3>
                  <p className="text-slate-600 leading-relaxed">
                    We respect GDPR. The site itself processes no personal data. Advertising cookies are managed by Google under consent requirements.
                  </p>
                  <div className="border-l-4 border-green-500 pl-6 py-6 space-y-4 text-slate-700 bg-green-50/50 rounded-r-2xl">
                    <p><strong>Data Controller:</strong> Hardik (sole proprietor), Surat, Gujarat, India.</p>
                    <p><strong>Legal Basis:</strong> Legitimate interest for essential functions; consent (via Google tools) for personalized advertising.</p>
                    <p><strong>Your Rights:</strong> Access, rectification, erasure, restriction, portability, objection, and withdrawal of consent. Contact us to exercise these.</p>
                    <p><strong>Retention:</strong> We retain no personal data. Cookies are session-based or managed by third parties.</p>
                  </div>
                </div>

                {/* 6. California & Other Regional Rights */}
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                  <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">6. California & Other Regional Rights</h3>
                  <p className="text-slate-600 leading-relaxed">
                    We do not sell or share personal information as defined by CCPA/CPRA. California residents have rights to know, delete, and opt-out of sales (not applicable here).
                  </p>
                </div>

                {/* 7. Children's Privacy */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">7. Children&apos;s Privacy</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Our site is family-friendly but not directed at children under 13. We do not knowingly collect data from children under 13 (COPPA compliant). If aware of such data, we will delete it promptly.
                  </p>
                </div>

                {/* 8. Third-Party Links */}
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                  <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">8. Third-Party Links & Content</h3>
                  <p className="text-slate-600 leading-relaxed">
                    The Bored Button and games may redirect to external sites. We are not responsible for their privacy practices  -  their policies apply once you leave our site.
                  </p>
                </div>

                {/* 9. Data Security & Changes */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">9. Data Security</h3>
                    <p className="text-slate-600 leading-relaxed">
                      We use reasonable measures to protect site integrity. However, no online transmission is 100% secure.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">10. Changes to This Policy</h3>
                    <p className="text-slate-600 leading-relaxed">
                      We may update this policy. Changes will be posted here with a new effective date.
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[2.5rem] text-white">
                  <h3 className="text-2xl font-black mb-4">Questions? We&apos;re Here to Help</h3>
                  <p className="text-blue-100 mb-6 font-medium">
                    Have questions about privacy, GDPR rights, or anything else? Reach out anytime.
                  </p>
                  <Link href="/info/contact">
                    <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black hover:bg-blue-50 transition-all active:scale-95">
                      Contact Us 📧
                    </button>
                  </Link>
                </div>

              </div>

              {/* Legal Footer */}
              <div className="bg-slate-50 p-8 text-center border-t border-slate-100">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                  Last Updated: January 31, 2026 • Operated by Hardik • Ahmedabad, India
                </p>
                <Link href="/">
                   <span className="text-slate-400 hover:text-slate-600 text-xs cursor-pointer underline">Back to the Bored Button</span>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Ad Placeholder */}
        {/* <div className="container mx-auto px-4 mt-16">
          <div className="max-w-4xl mx-auto bg-slate-100 border-2 border-dashed border-slate-200 rounded-3xl h-24 flex items-center justify-center text-slate-400 text-xs font-black uppercase tracking-widest">
            AdSense Safe Zone
          </div>
        </div> */}
      </div>
    </>
  );
}