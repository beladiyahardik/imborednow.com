import Head from "next/head";
import Link from "next/link";
import { Check, Mail } from "lucide-react";

const effectiveDate = "January 31, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | ImBoredNow</title>
        <meta
          name="description"
          content="Read how ImBoredNow handles privacy, cookies, ad personalization, and user rights."
        />
        <link rel="canonical" href="https://www.imborednow.com/info/privacy-policy" />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <section className="page-hero">
          <div className="page-wrap">
            <nav className="mb-4 text-sm text-slate-600">
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slate-900">Privacy Policy</span>
            </nav>

            <h1 className="page-title text-4xl md:text-5xl">Privacy Policy</h1>
            <p className="page-subtitle mt-3 max-w-3xl text-base md:text-lg">
              Effective date: {effectiveDate}. This page explains what data is used and how ad
              personalization works.
            </p>
          </div>
        </section>

        <section className="page-wrap py-8 md:py-10">
          <div className="page-card p-6 md:p-8">
            <div className="mb-8 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">
                <span className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  No account required
                </span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">
                <span className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                  Transparent advertising
                </span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">
                <span className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-violet-600" aria-hidden="true" />
                  Family-safe content focus
                </span>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <h2>1. What We Collect</h2>
              <p>
                ImBoredNow does not require user accounts. We do not ask for personal profile
                information to use the site. Basic server logs and analytics may include technical
                data such as browser, device type, and pages visited.
              </p>

              <h2>2. Cookies</h2>
              <p>
                Cookies may be used for essential functionality and ad delivery. Third-party vendors,
                including Google, may use cookies to serve and measure ads.
              </p>

              <h2>3. Advertising and Personalization</h2>
              <p>
                We use Google AdSense to keep the site free. Google and partners may show personalized
                or non-personalized ads depending on user settings and regional requirements.
              </p>
              <p>You can manage ad preferences here:</p>
              <ul>
                <li>
                  <a href="https://www.google.com/settings/ads">Google Ads Settings</a>
                </li>
                <li>
                  <a href="http://www.aboutads.info/choices/">aboutads.info choices</a>
                </li>
              </ul>

              <h2>4. Regional Rights</h2>
              <p>
                Depending on your location, you may have privacy rights such as access, correction,
                deletion, and consent withdrawal where applicable.
              </p>

              <h2>5. Children&apos;s Privacy</h2>
              <p>
                The site is family-friendly, but not specifically directed to children under 13. We
                do not knowingly collect personal information from children.
              </p>

              <h2>6. External Links</h2>
              <p>
                Some pages may link to third-party websites. Their policies apply once you leave our
                domain.
              </p>

              <h2>7. Policy Updates</h2>
              <p>
                We may update this policy as the site changes. The latest effective date is shown at
                the top of this page.
              </p>
            </div>

            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-700">
                Questions about privacy or legal rights can be sent to our support channel.
              </p>
              <Link href="/info/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
