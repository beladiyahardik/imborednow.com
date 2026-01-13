/* eslint-disable react/no-unescaped-entities */
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import {
  format,
  addDays,
  isAfter,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
} from "date-fns";

// Defining the props type for clarity
interface BirthdayPageProps {
  jsonLd: object;
  seo: {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    ogImage: string;
  };
}

export default function MilestoneCalculator({
  jsonLd,
  seo,
}: BirthdayPageProps) {
  const [birthdate, setBirthdate] = useState("");
  const [milestones, setMilestones] = useState<
    { days: number; date: Date; formattedDate: string }[]
  >([]);
  const [showResults, setShowResults] = useState(false);
  const [now, setNow] = useState(new Date());
  const resultsRef = useRef<HTMLDivElement>(null);

  const milestoneDays = [
    1000, 2000, 3000, 5000, 10000, 12000, 15000, 20000, 25000,
  ];

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateMilestones = () => {
    if (!birthdate) return;
    const birthDate = new Date(birthdate);
    if (isNaN(birthDate.getTime())) return;

    const newMilestones = milestoneDays.map((days) => {
      const milestoneDate = addDays(birthDate, days);
      return {
        days,
        date: milestoneDate,
        formattedDate: format(milestoneDate, "MMMM d, yyyy"),
      };
    });

    setMilestones(newMilestones);
    setShowResults(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateMilestones();
  };

  useEffect(() => {
    if (showResults && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showResults]);

  const liveStats = birthdate
    ? {
        seconds: differenceInSeconds(now, new Date(birthdate)),
        minutes: differenceInMinutes(now, new Date(birthdate)),
        hours: differenceInHours(now, new Date(birthdate)),
        days: differenceInDays(now, new Date(birthdate)),
        months: differenceInMonths(now, new Date(birthdate)),
      }
    : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-purple-200 pb-20">
      <Head>
        {/* SEO Data from Static Props */}
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href={seo.canonical} />

        {/* Social Media (OG) Tags */}
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:image" content={seo.ogImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://imborednow.com/p/birthdate-calculator" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* --- 1. HERO SECTION --- */}
      <section className="relative pt-20 pb-24 px-4 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-purple-600/40 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-xl rounded-full text-purple-300 text-[9px] font-black uppercase tracking-[0.3em] mb-8 border border-white/10">
            🗓️ The Discovery Lab
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.85]">
            YOUR LIFE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
              IN DAYS.
            </span>
          </h1>
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex flex-col sm:flex-row gap-2 bg-slate-900 p-2 rounded-2xl border border-white/10">
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
                className="flex-grow bg-transparent px-4 py-3 text-white focus:outline-none font-bold"
              />
              <button
                type="submit"
                className="bg-white text-slate-950 px-6 py-3 rounded-xl font-black text-sm hover:bg-yellow-400 transition-all active:scale-95 whitespace-nowrap"
              >
                GO! 🚀
              </button>
            </div>
          </form>
        </div>
      </section>

      {showResults && (
        <main
          ref={resultsRef}
          className="max-w-6xl mx-auto px-4 mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700"
        >
          {/* LIVE PULSE */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
                Live Life Pulse
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: "Months", value: liveStats?.months },
                { label: "Days", value: liveStats?.days },
                { label: "Hours", value: liveStats?.hours },
                { label: "Minutes", value: liveStats?.minutes },
                {
                  label: "Seconds",
                  value: liveStats?.seconds,
                  highlight: true,
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-[1.5rem] border ${
                    stat.highlight
                      ? "bg-slate-900 border-slate-800 text-white shadow-xl"
                      : "bg-white border-slate-100 text-slate-900"
                  }`}
                >
                  <p
                    className={`text-[9px] font-black uppercase tracking-widest mb-2 ${
                      stat.highlight ? "text-purple-400" : "text-slate-400"
                    }`}
                  >
                    {stat.label}
                  </p>
                  <p className="text-xl md:text-2xl font-black tracking-tighter tabular-nums">
                    {stat.value?.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* IMPROVED MILESTONES */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-none">
                Your Major Milestones
              </h2>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
                Significant days in your journey
              </p>
            </div>
            <button
              onClick={() => {
                setShowResults(false);
                setBirthdate("");
              }}
              className="text-[9px] md:text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
            >
              ✕ Reset Calculator
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {milestones.map((milestone, i) => {
              const isFuture = isAfter(milestone.date, new Date());
              const daysRemaining = isFuture
                ? differenceInDays(milestone.date, new Date())
                : 0;

              const getMilestoneIcon = (days: number) => {
                if (days <= 2000) return "👶";
                if (days <= 5000) return "🎒";
                if (days <= 9000) return "🎓";
                if (days <= 12000) return "⚡";
                if (days <= 15000) return "🔥";
                return "🚀";
              };

              const colorSet =
                i % 3 === 0
                  ? "from-purple-500 to-pink-500"
                  : i % 3 === 1
                  ? "from-blue-500 to-indigo-500"
                  : "from-emerald-500 to-teal-500";

              return (
                <div
                  key={i}
                  className={`group relative h-60 rounded-[2.5rem] bg-white border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 ${
                    isFuture
                      ? "opacity-90 grayscale-[0.3]"
                      : "hover:-translate-y-1"
                  } overflow-hidden p-8 flex flex-col justify-between`}
                >
                  {/* Background Icon */}
                  <div
                    className={`absolute -top-4 -right-4 text-7xl opacity-5 group-hover:opacity-20 transition-all duration-700 pointer-events-none transform group-hover:scale-110 ${
                      isFuture ? "grayscale" : ""
                    }`}
                  >
                    {getMilestoneIcon(milestone.days)}
                  </div>

                  <div className="flex items-center justify-between relative z-10">
                    <div
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter text-white bg-gradient-to-r ${colorSet} shadow-sm`}
                    >
                      {milestone.days.toLocaleString()} Days
                    </div>
                    {isFuture && (
                      <div className="px-3 py-1 bg-slate-900 text-yellow-400 text-[9px] font-black rounded-lg animate-pulse shadow-xl">
                        IN {daysRemaining.toLocaleString()} DAYS
                      </div>
                    )}
                  </div>

                  <div className="relative z-10">
                    <h3
                      className={`text-2xl md:text-3xl font-black tracking-tighter leading-none ${
                        isFuture ? "text-slate-400" : "text-slate-900"
                      }`}
                    >
                      {milestone.formattedDate}
                    </h3>
                    <div className="flex items-center justify-between mt-5 pt-5 border-t border-slate-50">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${
                            isFuture
                              ? "bg-slate-200"
                              : "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                          }`}
                        />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          {isFuture ? "Locked Journey" : "Achieved Milestone"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* --- SEO CONTENT SECTION (GUIDE) --- */}
      <section className="max-w-6xl mx-auto px-4 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">
                The Science of Time: Using a Birthday Calculator to Map Your
                Life
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">
                Have you ever paused and wondered,{" "}
                <strong>"how many days I lived?"</strong> While we usually
                celebrate our lives in years, there is something profoundly
                grounding about seeing your <strong>age in days</strong>. Our{" "}
                <strong>birthday calculator</strong> is more than just a simple
                tool; it’s a portal into your personal history, helping you
                track exactly how many <strong>days lived</strong> have shaped
                the person you are today.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Most of us know our age in years, but if someone asked you,{" "}
                <strong>"how old am I in days?"</strong>, could you answer them
                instantly? Probably not. Using a{" "}
                <strong>birthday calculator online</strong> removes the manual
                math of leap years, month lengths, and time zones. Our{" "}
                <strong>age calculator</strong> performs complex algorithms in
                milliseconds to give you an exact count of your{" "}
                <strong>days alive</strong>.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-widest">
                How Many Days Have I Lived? Breaking Down the Math
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Calculating <strong>days since birth</strong> isn't as simple as
                multiplying your age by 365. To get a truly accurate{" "}
                <strong>birthday calculator</strong> result, you must account
                for several variables:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="font-black text-slate-900 mb-2">
                    Leap Year Adjustments
                  </h4>
                  <p className="text-sm text-slate-500">
                    Every four years, an extra day (February 29th) is added. Our{" "}
                    <strong>age calculator</strong> identifies every leap year
                    since your birth.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="font-black text-slate-900 mb-2">
                    Variable Month Lengths
                  </h4>
                  <p className="text-sm text-slate-500">
                    Since months range from 28 to 31 days, our{" "}
                    <strong>days lived calculator</strong> tracks the specific
                    start and end dates accurately.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-4">
                The Psychology of Being "Days Old"
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                There is a psychological shift that happens when you stop
                viewing yourself as "30 years old" and start seeing yourself as
                "10,950 days old." Years are large, sweeping cycles. Days are
                manageble, precious units. When you use a{" "}
                <strong>birthday calculator</strong>, you are forced to confront
                the granular nature of time. Whether you are reaching your
                10,000th day or your 20,000th day, these milestones offer a
                unique opportunity to reflect.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2">
                  ✅ Instant Days Lived results
                </li>
                <li className="flex items-center gap-2">
                  ✅ Accurate Age in Days tracking
                </li>
                <li className="flex items-center gap-2">
                  ✅ Real-time Birthday Calculator
                </li>
                <li className="flex items-center gap-2">
                  ✅ Comprehensive Days Alive count
                </li>
              </ul>
            </div>
          </div>
          <aside className="space-y-6">
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl sticky top-8">
              <h4 className="text-xs font-black text-yellow-400 uppercase tracking-widest mb-4 italic">
                Time Insight
              </h4>
              <p className="text-xl font-black mb-6">
                Are you counting your days?
              </p>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Using a <strong>birthday calculator</strong> is a step toward
                gratitude. When you see the thousands of{" "}
                <strong>days alive</strong>, you see thousands of moments of
                connection.
              </p>
              <div className="h-px bg-white/10 w-full mb-8" />
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Trending Searches:
              </p>
              <div className="flex flex-wrap gap-2 mt-3 text-[9px] font-black uppercase tracking-tighter">
                <span className="bg-white/5 px-2 py-1 rounded">
                  how many days i lived
                </span>
                <span className="bg-white/5 px-2 py-1 rounded">
                  birthday calculator
                </span>
                <span className="bg-white/5 px-2 py-1 rounded">
                  age in days
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <footer className="max-w-4xl mx-auto px-4 mt-20">
        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 text-center shadow-sm">
          <h4 className="text-slate-900 font-black text-xl mb-4">
            Every Day is a Gift 🎁
          </h4>
          <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto font-medium">
            While we provide the{" "}
            <strong>most accurate birthday calculator</strong>, remember that
            numbers are just one way to measure a life. Don't just ask{" "}
            <strong>how many days i lived</strong>—make sure you've lived the
            days you've been given.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Next.js Static Props for SEO and Performance
export async function getStaticProps() {
  const seo = {
    title: "Birthday Calculator: How Many Days Have I Lived? | Age in Days",
    description:
      "Use our free birthday calculator to find out exactly how many days old you are. Calculate days lived, hours, minutes, and real-time seconds since your birth.",
    keywords:
      "birthday calculator, how many days i lived, birthday, calculator, days lived, age calculator, days old, days since birth, birthday calculator online, age in days, how old am I in days, days alive, days lived calculator",
    canonical: "https://www.imborednow.com/birthday-calculator",
    ogImage: "https://www.imborednow.com/og-birthday.png", // Ensure this exists for better attraction
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Birthday Calculator: How Many Days Have I Lived?",
    url: "https://www.imborednow.com/birthday-calculator",
    description:
      "Calculate exactly how many days you have lived. Find out your age in days, hours, minutes, and even real-time seconds since birth.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    author: {
      "@type": "Organization",
      name: "ImBoredNow",
    },
  };

  return {
    props: {
      seo,
      jsonLd,
    },
  };
}
