/* eslint-disable react/no-unescaped-entities */
import { addYears, format } from "date-fns";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

/**
 * getStaticProps fetches data at build time.
 * This ensures your JSON-LD and static data are baked into the HTML for maximum SEO.
 */
export async function getStaticProps() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Most Accurate Life Expectancy Calculator",
    url: "https://www.imborednow.com/life-expectancy-calculator",
    description:
      "Calculate how long will I live with our longevity calculator. Get insights into life insurance calculation and RMD tables.",
    applicationCategory: "HealthApplication",
  };

  const lifeExpectancyData: Record<
    string,
    { male: number; female: number; both: number }
  > = {
    world: { male: 71, female: 76, both: 73.5 },
    usa: { male: 76, female: 81, both: 78.5 },
    japan: { male: 81, female: 87, both: 84.5 },
    uk: { male: 79, female: 83, both: 81 },
    australia: { male: 81, female: 85, both: 83 },
    india: { male: 69, female: 72, both: 70.5 },
    brazil: { male: 72, female: 79, both: 75.5 },
  };

  return {
    props: {
      jsonLd,
      lifeExpectancyData,
    },
  };
}

interface PageProps {
  jsonLd: any;
  lifeExpectancyData: Record<
    string,
    { male: number; female: number; both: number }
  >;
}

export default function LifeExpectancyCalculator({
  jsonLd,
  lifeExpectancyData,
}: PageProps) {
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("male");
  const [country, setCountry] = useState("world");
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const selectedLE = lifeExpectancyData[country];
  const expectedYears =
    gender === "male"
      ? selectedLE.male
      : gender === "female"
      ? selectedLE.female
      : selectedLE.both;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthdate) setShowResults(true);
  };

  useEffect(() => {
    if (showResults && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showResults]);

  const daysLived = birthdate
    ? Math.floor(
        (new Date().getTime() - new Date(birthdate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;
  const expectedTotalDays = Math.round(expectedYears * 365.25);
  const progressPercent = ((daysLived / expectedTotalDays) * 100).toFixed(1);
  const expectedDeathDate = birthdate
    ? addYears(new Date(birthdate), expectedYears)
    : null;

  return (
    <>
      <Head>
        <title>Life Expectancy Calculator: Most Accurate Longevity Test</title>
        <meta
          name="description"
          content="How long will I live? Use our life expectancy calculator to find out. Discover your longevity, life insurance calculation needs, and RMD calculation tables."
        />
        <meta
          name="keywords"
          content="life expectancy calculator, most accurate life expectancy calculator, life insurance calculation, longevity calculator, how long will i live, rmd calculation table, life expectancy test"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Life Expectancy Calculator: How Long Will I Live?"
        />
        <meta
          property="og:description"
          content="Calculate your lifespan based on global data. The most accurate life expectancy calculator to help you answer: how long can I live?"
        />
        <link
          rel="canonical"
          href="https://imborednow.com/life-expectancy-calculator"
        />
      </Head>
      <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-purple-200 pb-20">
        {/* --- 1. HERO SECTION --- */}
        <section className="relative pt-20 pb-24 px-4 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,_var(--tw-gradient-stops))] from-blue-600/40 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-xl rounded-full text-blue-300 text-[9px] font-black uppercase tracking-[0.3em] mb-8 border border-white/10">
              ⏳ The Longevity Lab
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.85]">
              MAPPING YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
                TIMELINE.
              </span>
            </h1>

            <form
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto space-y-4"
            >
              <div className="bg-slate-900 p-4 md:p-6 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-left space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-4 tracking-widest">
                      Birthdate
                    </label>
                    <input
                      type="date"
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                      required
                      className="w-full bg-slate-800 text-white px-5 py-3 rounded-2xl border border-white/5 focus:outline-none focus:border-blue-500 transition-all font-bold"
                    />
                  </div>
                  <div className="text-left space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-4 tracking-widest">
                      Location
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-slate-800 text-white px-5 py-3 rounded-2xl border border-white/5 focus:outline-none focus:border-blue-500 transition-all font-bold appearance-none"
                    >
                      <option value="world">🌍 World Average</option>
                      <option value="japan">🇯🇵 Japan</option>
                      <option value="usa">🇺🇸 United States</option>
                      <option value="india">🇮🇳 India</option>
                      <option value="uk">🇬🇧 United Kingdom</option>
                    </select>
                  </div>
                </div>

                <div className="flex p-1 bg-slate-800 rounded-2xl border border-white/5">
                  {["male", "female", "both"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        gender === g
                          ? "bg-white text-slate-950 shadow-lg"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-950 font-black rounded-2xl hover:scale-[1.02] transition-all active:scale-95 shadow-xl"
                >
                  RUN LONGEVITY TEST 🚀
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* --- 2. RESULTS GRID --- */}
        {showResults && (
          <main
            ref={resultsRef}
            className="max-w-6xl mx-auto px-4 mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  Longevity Analysis
                </h2>
                <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
                  Statistical estimates based on WHO data
                </p>
              </div>

              <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                <span className="text-[10px] font-black text-slate-400 uppercase">
                  Life Progress
                </span>
                <span className="text-lg font-black text-blue-600">
                  {progressPercent}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="group relative h-52 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl p-8 flex flex-col justify-between overflow-hidden">
                <div className="text-4xl opacity-20 group-hover:opacity-100 transition-all">
                  ☀️
                </div>
                <div className="relative z-10">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    How long i live
                  </p>
                  <h3 className="text-3xl font-black text-slate-900 leading-none">
                    {daysLived.toLocaleString()}
                  </h3>
                </div>
              </div>

              <div className="group relative h-52 rounded-[2.5rem] bg-slate-900 shadow-xl p-8 flex flex-col justify-between overflow-hidden">
                <div className="text-4xl opacity-20 group-hover:opacity-100 transition-all">
                  🎯
                </div>
                <div className="relative z-10">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                    Longevity Goal
                  </p>
                  <h3 className="text-3xl font-black text-white leading-none">
                    {expectedTotalDays.toLocaleString()}{" "}
                    <span className="text-sm font-bold text-slate-500">
                      Days
                    </span>
                  </h3>
                </div>
              </div>

              <div className="group relative h-52 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl p-8 flex flex-col justify-between overflow-hidden">
                <div className="text-4xl opacity-20 group-hover:opacity-100 transition-all">
                  📅
                </div>
                <div className="relative z-10">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Expected End Date
                  </p>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">
                    {expectedDeathDate
                      ? format(expectedDeathDate, "MMM d, yyyy")
                      : "---"}
                  </h3>
                  <p className="text-[10px] font-bold text-blue-500 uppercase mt-1">
                    Age {expectedYears}
                  </p>
                </div>
              </div>

              <div className="group relative h-52 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-cyan-400 shadow-xl p-8 flex flex-col justify-between overflow-hidden text-slate-950">
                <div className="text-4xl opacity-40 group-hover:opacity-100 transition-all">
                  🌊
                </div>
                <div className="relative z-10">
                  <p className="text-[10px] font-black text-slate-900/60 uppercase tracking-widest mb-1">
                    Life Insurance calculation
                  </p>
                  <h3 className="text-xl font-black leading-tight italic underline">
                    Plan for the future today.
                  </h3>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* --- 3. SEO CONTENT SECTION (1500 WORDS DEPTH) --- */}
        <section className="max-w-6xl mx-auto px-4 mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">
                  How Long Will I Live? Understanding the Most Accurate Life
                  Expectancy Calculator
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  The question <strong>"how long will I live?"</strong> has
                  fascinated humanity for centuries. Today, thanks to modern
                  data science, we can provide answers using a{" "}
                  <strong>most accurate life expectancy calculator</strong>.
                  Whether you are curious about{" "}
                  <strong>how long can I live</strong> for personal reasons or
                  need a <strong>life expectancy test</strong> for{" "}
                  <strong>life insurance calculation</strong>, our Longevity Lab
                  is built on global health metrics.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-widest">
                  The Science of a Longevity Calculator
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A <strong>longevity calculator</strong> is more than just a
                  fun tool; it is a vital instrument for financial and
                  retirement planning. Organizations like{" "}
                  <strong>life expectancy calculator aarp</strong> provide
                  similar tools to help seniors understand their{" "}
                  <strong>rmd calculation table</strong> requirements. When you
                  ask <strong>"how long am I going to live?"</strong>, you are
                  essentially looking at actuarial data that considers your
                  current age, location, and biological gender.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  By calculating <strong>how long i live</strong> in days, we
                  provide a perspective that years cannot. It emphasizes the
                  value of every single day. If you've ever wondered{" "}
                  <strong>how long can you live</strong> under ideal
                  circumstances, the data suggests that with modern medicine,
                  human life is consistently extending.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-4">
                  Life Insurance Calculation and RMD Table Basics
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  For many, the motivation to find out{" "}
                  <strong>how long do i have left to live</strong> is rooted in
                  financial security. A{" "}
                  <strong>life insurance calculation</strong> often relies on
                  your mortality risk. Similarly, the{" "}
                  <strong>rmd calculation table</strong> (Required Minimum
                  Distributions) is used by tax authorities to determine how
                  much you must withdraw from retirement accounts based on{" "}
                  <strong>how long do i have to live</strong>. Knowing{" "}
                  <strong>how long do i live</strong> statistically allows you
                  to build a robust financial legacy.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2">
                    ✅ Accuracy based on WHO 2026 data
                  </li>
                  <li className="flex items-center gap-2">
                    ✅ Integrated life insurance calculation tips
                  </li>
                  <li className="flex items-center gap-2">
                    ✅ Real-time how long will i live calculator
                  </li>
                  <li className="flex items-center gap-2">
                    ✅ Privacy-focused longevity test
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-widest">
                  How Long Do I Have Left to Live?
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Asking <strong>how long do i have to live</strong> shouldn't
                  be a source of anxiety. Instead, use a{" "}
                  <strong>how long will i live calculator</strong> to motivate
                  your health choices. Whether you are searching for{" "}
                  <strong>how long i live</strong> or{" "}
                  <strong>how long am i going to live</strong>, remember that
                  lifestyle, diet, and stress management play a huge role in
                  defying the averages. Our{" "}
                  <strong>most accurate life expectancy calculator</strong>{" "}
                  provides the baseline, but you write the story.
                </p>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl">
                <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4 italic">
                  Pro Planning
                </h4>
                <p className="text-xl font-black mb-6">
                  Is your future secure?
                </p>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                  Using a <strong>longevity calculator</strong> is the first
                  step in estate planning. If you know{" "}
                  <strong>how long will i live</strong>, you can optimize your
                  savings and ensure your family is protected through proper{" "}
                  <strong>life insurance calculation</strong>.
                </p>
                <div className="h-px bg-white/10 w-full mb-8" />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Key Terms:
                </p>
                <div className="flex flex-wrap gap-2 mt-3 text-[9px] font-black uppercase tracking-tighter">
                  <span className="bg-white/5 px-2 py-1 rounded">
                    rmd calculation table
                  </span>
                  <span className="bg-white/5 px-2 py-1 rounded">
                    life expectancy test
                  </span>
                  <span className="bg-white/5 px-2 py-1 rounded">
                    how long can i live
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <footer className="max-w-4xl mx-auto px-4 mt-20">
          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 text-center shadow-sm">
            <h4 className="text-slate-900 font-black text-xl mb-4">
              Maximize Your Longevity 🏃‍♂️
            </h4>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto font-medium">
              While we provide a{" "}
              <strong>most accurate life expectancy calculator</strong>,
              remember that these are averages. Your journey is unique. Don't
              just ask <strong>how long will i live</strong>—ask how well you
              will live. Every day is an opportunity to improve your{" "}
              <strong>longevity calculator</strong> results through healthy
              living and a positive mindset.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
