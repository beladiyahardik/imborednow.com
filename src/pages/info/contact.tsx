import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Bug, Handshake, Lightbulb, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | ImBoredNow</title>
        <meta
          name="description"
          content="Contact ImBoredNow for support, bug reports, and suggestions."
        />
        <link rel="canonical" href="https://www.imborednow.com/info/contact" />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <section className="page-hero">
          <div className="page-wrap">
            <nav className="mb-4 text-sm text-slate-600">
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slate-900">Contact</span>
            </nav>

            <h1 className="page-title text-4xl md:text-5xl">Contact</h1>
            <p className="page-subtitle mt-3 max-w-3xl text-base md:text-lg">
              Share feedback, report a bug, or suggest a new tool. You will get a human response.
            </p>
          </div>
        </section>

        <section className="page-wrap py-8 md:py-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <article className="page-card p-6 md:p-8 lg:col-span-7">
              <h2 className="page-title text-2xl">How To Reach Us</h2>
              <p className="page-subtitle mt-3">
                Email is the fastest channel. Include the page URL and a short description of the
                issue or idea so we can review quickly.
              </p>

              <a
                href="mailto:aeybhai@gmail.com"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                aeybhai@gmail.com
              </a>

              <div className="mt-8 space-y-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-700">
                    Typical reply time: <strong>24 to 48 hours</strong>.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-700">
                    For legal/privacy requests, mention your request clearly in the subject line.
                  </p>
                </div>
              </div>
            </article>

            <aside className="page-card p-6 lg:col-span-5">
              <h2 className="page-title text-xl">What To Include</h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex gap-3">
                  <Lightbulb className="mt-0.5 h-4 w-4 text-amber-600" aria-hidden="true" />
                  <span className="text-slate-700">Feature ideas and improvement suggestions</span>
                </li>
                <li className="flex gap-3">
                  <Bug className="mt-0.5 h-4 w-4 text-rose-600" aria-hidden="true" />
                  <span className="text-slate-700">Bug reports with device/browser details</span>
                </li>
                <li className="flex gap-3">
                  <Handshake className="mt-0.5 h-4 w-4 text-indigo-600" aria-hidden="true" />
                  <span className="text-slate-700">Partnership and collaboration inquiries</span>
                </li>
              </ul>
            </aside>
          </div>

          <div className="mt-8">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
