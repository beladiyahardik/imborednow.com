import Head from "next/head";
import Link from "next/link";

const effectiveDate = "January 31, 2026";

export default function DisclaimerPage() {
  return (
    <>
      <Head>
        <title>Disclaimer | ImBoredNow</title>
        <meta
          name="description"
          content="Read ImBoredNow disclaimers for entertainment content, external links, and advertising."
        />
        <link rel="canonical" href="https://www.imborednow.com/info/disclaimer" />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <section className="page-hero">
          <div className="page-wrap">
            <nav className="mb-4 text-sm text-slate-600">
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slate-900">Disclaimer</span>
            </nav>

            <h1 className="page-title text-4xl md:text-5xl">Disclaimer</h1>
            <p className="page-subtitle mt-3 max-w-3xl text-base md:text-lg">
              Effective date: {effectiveDate}. Please review these notes before using the site.
            </p>
          </div>
        </section>

        <section className="page-wrap py-8 md:py-10">
          <article className="page-card p-6 md:p-8">
            <div className="prose prose-slate max-w-none">
              <h2>Entertainment Use</h2>
              <p>
                ImBoredNow is built for entertainment and general informational use. Tools and games
                are not a substitute for professional medical, legal, or financial advice.
              </p>

              <h2>External Websites</h2>
              <p>
                Some pages link to third-party resources. We review links, but we cannot guarantee
                ongoing quality, availability, or policy behavior outside our domain.
              </p>

              <h2>Advertising</h2>
              <p>
                We may display ads via Google AdSense and partners. Ad destinations are controlled by
                third parties. We do not guarantee products or services shown in ads.
              </p>

              <h2>No Warranties</h2>
              <p>
                The site is provided as-is without guarantees of uninterrupted operation, perfect
                accuracy, or fitness for a specific purpose.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                By using the site, you accept responsibility for your own browsing choices. We are
                not liable for losses tied to third-party services, outages, or user decisions.
              </p>

              <h2>Updates</h2>
              <p>
                This disclaimer may change as the site evolves. The latest effective date is shown at
                the top of this page.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="clean-btn clean-btn-primary px-5 py-3">
                Back to Home
              </Link>
              <Link href="/info/contact" className="clean-btn clean-btn-secondary px-5 py-3">
                Ask a Question
              </Link>
            </div>
          </article>
        </section>
      </div>
    </>
  );
}
