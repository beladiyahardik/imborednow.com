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
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href={seo.canonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:image" content={seo.ogImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
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

          {/* MILESTONES GRID */}
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
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* --- UPDATED ARTICLE CONTENT SECTION --- */}
      <article className="max-w-6xl mx-auto px-4 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            
            <header>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
                Beyond the Birthday: Why Your Age in Days is the Metric That Matters
              </h2>
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg font-medium">
                <p>
                  We are conditioned to think of our lives in blocks of 365 days. We celebrate the big "zero" birthdays-20, 30, 40-and use years to mark our progress through school, careers, and retirement. But measuring your life only in years is like reading only the chapter titles of a book.
                </p>
                <p>
                  Your <strong className="text-slate-900">age in days</strong> represents the actual "meat" of your timeline. It is the precise count of every sunrise you have witnessed, every 24-hour cycle you have navigated, and every moment of growth you have experienced. By breaking down your life into days, you transform an abstract concept into a concrete, tangible reality.
                </p>
              </div>
            </header>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tighter">What Exactly is "Age in Days"?</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                At its core, your age in days is the total count of calendar days from the moment of your birth up to the present moment. Unlike a simple multiplication of your age by 365, a true calculation of your age in days is a bit more complex because it must account for the irregularities of our calendar system:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { t: "Leap Years", d: "Every four years, our calendar adds an extra day to stay aligned with Earth's orbit." },
                  { t: "Month Variations", d: "Months range from 28 to 31 days, making accurate month-by-month counting necessary." },
                  { t: "Specific Dates", d: "The exact date of your birth and today's date provide the 'bookends' for precision." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h4 className="font-black text-slate-900 mb-2 text-sm uppercase">{item.t}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Why Should You Care About This Number?</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                    <span className="shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center font-black">1</span>
                    <div>
                        <h3 className="font-black text-slate-900 text-xl mb-2">A Shift in Perspective</h3>
                        <p className="text-slate-600">Seeing your life measured in thousands of days can be eye-opening. It makes you realize how much time you have truly lived and emphasizes the value of each individual day as a meaningful unit of life.</p>
                    </div>
                </div>
                <div className="flex gap-6">
                    <span className="shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-black">2</span>
                    <div>
                        <h3 className="font-black text-slate-900 text-xl mb-2">Celebrating "Hidden" Milestones</h3>
                        <p className="text-slate-600 mb-4">Traditional birthdays happen once a year, but "day milestones" offer unique opportunities for celebration.</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <li className="bg-slate-50 p-3 rounded-xl text-xs font-bold text-slate-700">🎉 1,000 Days: Before your 3rd birthday.</li>
                            <li className="bg-slate-50 p-3 rounded-xl text-xs font-bold text-slate-700">🦁 10,000 Days: Around age 27 and 4 months.</li>
                            <li className="bg-slate-50 p-3 rounded-xl text-xs font-bold text-slate-700">🏔️ 20,000 Days: A major mid-life milestone.</li>
                        </ul>
                    </div>
                </div>
              </div>
            </section>

            <section className="bg-slate-900 p-8 md:p-12 rounded-[3rem] text-white">
              <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter text-yellow-400">The Manual Calculation: How to Do It Yourself</h2>
              <div className="space-y-6 text-slate-300">
                <div>
                    <h4 className="text-white font-bold mb-1 italic">Step 1: Calculate Full Years</h4>
                    <p className="text-sm">Take the number of full years you have lived and multiply that number by 365.</p>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                    <h4 className="text-white font-bold mb-1 italic">Step 2: Account for Leap Years</h4>
                    <p className="text-sm">Add one day for every leap year you have lived through. A year is a leap year if it is divisible by 4 (unless it's a century year not divisible by 400).</p>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                    <h4 className="text-white font-bold mb-1 italic">Step 3: Add the "Residual" Days</h4>
                    <p className="text-sm">Count the days since your last birthday, including completed months and the current month's progress.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Life Milestones by the Numbers</h2>
              <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50">
                            <th className="p-4 font-black text-slate-900 text-sm">Milestone</th>
                            <th className="p-4 font-black text-slate-900 text-sm">Approx. Age in Days</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-600 text-sm">
                        <tr className="border-t border-slate-50">
                            <td className="p-4 font-bold">Starting School</td>
                            <td className="p-4">~1,825 days</td>
                        </tr>
                        <tr className="border-t border-slate-50">
                            <td className="p-4 font-bold">Turning 18 / Graduation</td>
                            <td className="p-4">~6,570 days</td>
                        </tr>
                        <tr className="border-t border-slate-50">
                            <td className="p-4 font-bold">College Graduation</td>
                            <td className="p-4">~8,030 days</td>
                        </tr>
                        <tr className="border-t border-slate-50">
                            <td className="p-4 font-bold">Turning 30</td>
                            <td className="p-4">~10,950 days</td>
                        </tr>
                        <tr className="border-t border-slate-50">
                            <td className="p-4 font-bold">Turning 50</td>
                            <td className="p-4">~18,250 days</td>
                        </tr>
                    </tbody>
                </table>
              </div>
            </section>

            <footer className="pt-10 border-t border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 mb-4">Final Thoughts: Making Every Day Count</h3>
                <p className="text-slate-600 leading-relaxed font-medium italic">
                    Understanding your age in days is a reminder that life isn't just a series of years passing by-it is a collection of individual days. Whether you use an online calculator for a quick insight or do the math manually for a moment of reflection, this perspective encourages you to appreciate the time you have lived and the days yet to come.
                </p>
                <div className="mt-8 p-6 bg-yellow-50 rounded-2xl border border-yellow-100 text-yellow-800 text-sm font-bold">
                    💡 Would you like me to walk you through the leap year calculation for your specific birth year to help get you started?
                </div>
            </footer>

          </div>

          {/* ASIDE / SIDEBAR */}
          <aside className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-10 rounded-[3rem] text-white shadow-2xl sticky top-8">
              <h4 className="text-xs font-black text-indigo-200 uppercase tracking-widest mb-4">Time Insight</h4>
              <p className="text-xl font-black mb-6">Precision in Health & Wellness</p>
              <p className="text-indigo-100/80 text-sm mb-8 leading-relaxed font-medium">
                In certain scientific and healthcare contexts, measuring age in days provides a level of accuracy that "years" simply cannot. This precision can help track personal wellness goals with more granularity.
              </p>
              <div className="h-px bg-white/10 w-full mb-8" />
              <div className="flex flex-wrap gap-2 mt-3 text-[9px] font-black uppercase tracking-tighter">
                <span className="bg-white/10 px-2 py-1 rounded">leap years</span>
                <span className="bg-white/10 px-2 py-1 rounded">life precision</span>
                <span className="bg-white/10 px-2 py-1 rounded">day milestones</span>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <footer className="max-w-4xl mx-auto px-4 mt-20">
        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 text-center shadow-sm">
          <h4 className="text-slate-900 font-black text-xl mb-4">Every Day is a Gift 🎁</h4>
          <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto font-medium">
            While we provide the <strong>most accurate birthday calculator</strong>, remember that numbers are just one way to measure a life. Don't just ask <strong>how many days i lived</strong>-make sure you've lived the days you've been given.
          </p>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const seo = {
    title: "Birthday Calculator: How Many Days Have I Lived? | Age in Days",
    description: "Use our free birthday calculator to find out exactly how many days old you are. Calculate days lived, hours, minutes, and real-time seconds since your birth.",
    keywords: "birthday calculator, how many days i lived, birthday, calculator, days lived, age calculator, days old, days since birth, birthday calculator online, age in days, how old am I in days, days alive, days lived calculator",
    canonical: "https://www.imborednow.com/birthday-calculator",
    ogImage: "https://www.imborednow.com/og-birthday.png",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Birthday Calculator: How Many Days Have I Lived?",
    url: "https://www.imborednow.com/birthday-calculator",
    description: "Calculate exactly how many days you have lived. Find out your age in days, hours, minutes, and even real-time seconds since birth.",
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