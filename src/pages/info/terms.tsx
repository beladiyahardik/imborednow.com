import Head from "next/head";
import Link from "next/link";

const effectiveDate = "January 31, 2026";

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms and Conditions | ImBoredNow</title>
        <meta
          name="description"
          content="Read the terms for using ImBoredNow, including user conduct, external links, and ad interaction rules."
        />
        <link rel="canonical" href="https://www.imborednow.com/info/terms" />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <section className="page-hero">
          <div className="page-wrap">
            <nav className="mb-4 text-sm text-slate-600">
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slate-900">Terms</span>
            </nav>

            <h1 className="page-title text-4xl md:text-5xl">Terms and Conditions</h1>
            <p className="page-subtitle mt-3 max-w-3xl text-base md:text-lg">
              Effective date: {effectiveDate}. By using this site, you agree to these terms.
            </p>
          </div>
        </section>

        <section className="page-wrap py-8 md:py-10">
          <article className="page-card p-6 md:p-8">
            <div className="prose prose-slate max-w-none">
              <h2>1. Use of the Site</h2>
              <p>
                ImBoredNow is provided for personal, non-commercial use. You may browse tools, games,
                and articles without creating an account.
              </p>

              <h2>2. User Conduct</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Use bots, scripts, or automation to abuse site features.</li>
                <li>Generate invalid ad traffic or incentivize ad clicks.</li>
                <li>Attempt to disrupt or compromise site performance or security.</li>
                <li>Use site content without permission for commercial scraping or republishing.</li>
              </ul>

              <h2>3. External Content</h2>
              <p>
                Some pages may include or link to third-party content. We do not control third-party
                terms, availability, or privacy practices.
              </p>

              <h2>4. Advertising</h2>
              <p>
                Ads may be displayed through third-party networks including Google AdSense. You must
                interact with ads naturally and honestly.
              </p>

              <h2>5. Intellectual Property</h2>
              <p>
                Site design, original code, and curated content are owned by the operator or licensed
                for use. Unauthorized reproduction is not permitted.
              </p>

              <h2>6. Disclaimer</h2>
              <p>
                The site is provided as-is and as-available. We do not guarantee uninterrupted
                operation or suitability for specific purposes.
              </p>

              <h2>7. Limitation of Liability</h2>
              <p>
                To the extent permitted by law, we are not liable for direct or indirect losses
                arising from site use, outages, external links, or third-party content.
              </p>

              <h2>8. Updates and Governing Law</h2>
              <p>
                Terms may be updated over time. Continued use indicates acceptance of the latest
                version. These terms are governed by applicable laws in India.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="clean-btn clean-btn-primary px-5 py-3">
                Return to Home
              </Link>
              <Link href="/info/contact" className="clean-btn clean-btn-secondary px-5 py-3">
                Contact Support
              </Link>
            </div>
          </article>
        </section>
      </div>
    </>
  );
}
