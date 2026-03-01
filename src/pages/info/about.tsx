import Head from "next/head";
import Link from "next/link";
import { Globe2, Search, ShieldCheck, Users, Zap } from "lucide-react";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  linkedin: string;
};

const team: TeamMember[] = [
  {
    name: "Hardik B.",
    role: "Founder & Lead Developer",
    image: "/hardik.png",
    linkedin: "https://www.linkedin.com/in/beladiya-hardik/",
  },
  {
    name: "Piyush K.",
    role: "Software Architect",
    image: "/piyush.jpg",
    linkedin: "https://www.linkedin.com/in/piyush-koladiya-079496248/",
  },
  {
    name: "Dhruvin S.",
    role: "Co-Founder & UI/UX Designer",
    image: "/dhruvin.jpg",
    linkedin: "https://www.linkedin.com/in/dhruvin-sudani-411756258/",
  },
  {
    name: "Darshan L.",
    role: "Content Curator",
    image: "/darshan.png",
    linkedin: "https://www.linkedin.com/in/darshan-lukhi-0675962a3/",
  },
];

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | ImBoredNow</title>
        <meta
          name="description"
          content="Learn who runs ImBoredNow, how content is curated, and how we keep the site safe, useful, and family-friendly."
        />
        <link rel="canonical" href="https://www.imborednow.com/info/about" />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <section className="page-hero">
          <div className="page-wrap">
            <nav className="mb-4 text-sm text-slate-600">
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slate-900">About</span>
            </nav>

            <h1 className="page-title text-4xl md:text-5xl">About ImBoredNow</h1>
            <p className="page-subtitle mt-3 max-w-3xl text-base md:text-lg">
              We build and curate browser experiences that are fast, safe, and easy to use.
              The goal is simple: better breaks without low-quality clutter.
            </p>
          </div>
        </section>

        <section className="page-wrap py-8 md:py-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <article className="page-card p-6 md:p-8 lg:col-span-8">
              <h2 className="page-title text-2xl">Our Story</h2>
              <div className="prose prose-slate mt-4 max-w-none">
                <p>
                  ImBoredNow started in 2025 as a small independent project in Surat, Gujarat,
                  India. We wanted one place where people could open a useful game or tool without
                  pop-up overload, misleading links, or confusing layouts.
                </p>
                <p>
                  Every featured page is reviewed for speed, mobile usability, readability, and
                  safety. If an experience feels low quality or repetitive, it does not stay.
                </p>
                <p>
                  We prioritize clear content, transparent policies, and practical navigation so
                  visitors can find value quickly.
                </p>
              </div>
            </article>

            <aside className="page-card p-6 lg:col-span-4">
              <h2 className="page-title text-xl">What We Prioritize</h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex gap-3">
                  <Search className="mt-0.5 h-4 w-4 text-blue-600" aria-hidden="true" />
                  <span className="text-slate-700">Manual curation over automated content spam</span>
                </li>
                <li className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-600" aria-hidden="true" />
                  <span className="text-slate-700">Family-safe and policy-aware page design</span>
                </li>
                <li className="flex gap-3">
                  <Zap className="mt-0.5 h-4 w-4 text-amber-600" aria-hidden="true" />
                  <span className="text-slate-700">Fast loading pages with low friction</span>
                </li>
                <li className="flex gap-3">
                  <Globe2 className="mt-0.5 h-4 w-4 text-violet-600" aria-hidden="true" />
                  <span className="text-slate-700">Clear public policy and contact pages</span>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white py-12">
          <div className="page-wrap">
            <h2 className="page-title text-3xl">Team</h2>
            <p className="page-subtitle mt-2">Small team, direct ownership, human editorial review.</p>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <article key={member.name} className="page-card p-5">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="mb-4 h-20 w-20 rounded-full border border-slate-200 object-cover"
                  />
                  <h3 className="page-title text-lg">{member.name}</h3>
                  <p className="page-subtitle mt-1 text-sm">{member.role}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:underline"
                  >
                    View profile
                  </a>
                </article>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/info/contact" className="clean-btn clean-btn-primary px-5 py-3">
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4" aria-hidden="true" />
                  Contact the team
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
