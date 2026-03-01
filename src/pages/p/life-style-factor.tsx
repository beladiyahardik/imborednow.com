/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { format, addYears } from "date-fns";

interface PageProps {
  seo: {
    title: string;
    description: string;
    canonical: string;
    ogTitle: string;
    ogDescription: string;
  };
  jsonLd: object;
}

export default function LifeExpectancyCalculator({ seo, jsonLd }: PageProps) {
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("male");
  const [country, setCountry] = useState("world");

  const [smoking, setSmoking] = useState("never");
  const [exercise, setExercise] = useState("active");
  const [alcohol, setAlcohol] = useState("moderate");
  const [diet, setDiet] = useState("healthy");
  const [bmiCategory, setBmiCategory] = useState("normal");

  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

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

  const adjustments: any = {
    smoking: { never: 0, former: -3, current: -10 },
    exercise: { sedentary: -3, moderate: 0, active: +4 },
    alcohol: { none: 0, moderate: +1, heavy: -4 },
    diet: { poor: -4, average: 0, healthy: +5 },
    bmi: { underweight: -4, normal: 0, overweight: +1, obese: -4 },
  };

  const baseLE =
    gender === "male"
      ? lifeExpectancyData[country].male
      : gender === "female"
      ? lifeExpectancyData[country].female
      : lifeExpectancyData[country].both;
  const adjustedLE =
    baseLE +
    adjustments.smoking[smoking] +
    adjustments.exercise[exercise] +
    adjustments.alcohol[alcohol] +
    adjustments.diet[diet] +
    adjustments.bmi[bmiCategory];

  const calculate = () => {
    if (!birthdate) return;
    setShowResults(true);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculate();
  };

  useEffect(() => {
    if (showResults && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showResults]);

  const expectedDeathDate = birthdate
    ? addYears(new Date(birthdate), adjustedLE)
    : null;
  const remainingYears = expectedDeathDate
    ? Math.max(
        0,
        (expectedDeathDate.getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24 * 365.25)
      )
    : 0;
  const daysLived = birthdate
    ? Math.floor(
        (new Date().getTime() - new Date(birthdate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-100 pb-20">
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta
          property="og:image"
          content="https://www.imborednow.com/banner.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={seo.canonical} />
      </Head>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-32 px-4 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-white/20">
            📊 Precise Longevity Modeling
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white mb-10 tracking-tighter leading-[0.8]">
            BIOMETRIC <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              FORECAST
            </span>
          </h1>

          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl border border-slate-200 text-left"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-12">
              <div className="space-y-8">
                <div>
                  <label className="block text-[12px] font-black uppercase tracking-widest text-slate-900 mb-4">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                    className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-5 rounded-[1.5rem] font-bold text-slate-900 text-lg focus:bg-white focus:border-blue-500 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-black uppercase tracking-widest text-slate-900 mb-4">
                    Biological Sex
                  </label>
                  <div className="flex p-1.5 bg-slate-100 rounded-[1.5rem] gap-1">
                    {["male", "female", "both"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`flex-1 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${
                          gender === g
                            ? "bg-white text-slate-900 shadow-md scale-105"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-black uppercase tracking-widest text-slate-900 mb-4">
                    Current Region
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-5 rounded-[1.5rem] font-bold text-slate-900 text-lg focus:bg-white focus:border-blue-500 outline-none cursor-pointer appearance-none"
                  >
                    <option value="world">🌍 Global Average</option>
                    <option value="japan">🇯🇵 Japan</option>
                    <option value="usa">🇺🇸 USA</option>
                    <option value="uk">🇬🇧 UK</option>
                    <option value="australia">🇦🇺 Australia</option>
                    <option value="india">🇮🇳 India</option>
                    <option value="brazil">🇧🇷 Brazil</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    label: "Lifestyle (Smoking) 🚭",
                    val: smoking,
                    set: setSmoking,
                    opts: [
                      { l: "Non-Smoker", v: "never" },
                      { l: "Former", v: "former" },
                      { l: "Active", v: "current" },
                    ],
                  },
                  {
                    label: "Activity Level 🏃",
                    val: exercise,
                    set: setExercise,
                    opts: [
                      { l: "Sedentary", v: "sedentary" },
                      { l: "Moderate", v: "moderate" },
                      { l: "Active", v: "active" },
                    ],
                  },
                  {
                    label: "Alcohol Intake 🍷",
                    val: alcohol,
                    set: setAlcohol,
                    opts: [
                      { l: "None", v: "none" },
                      { l: "Social", v: "moderate" },
                      { l: "Regular", v: "heavy" },
                    ],
                  },
                  {
                    label: "Nutritional Quality 🥗",
                    val: diet,
                    set: setDiet,
                    opts: [
                      { l: "Poor", v: "poor" },
                      { l: "Average", v: "average" },
                      { l: "Healthy", v: "healthy" },
                    ],
                  },
                  {
                    label: "Weight Baseline ⚖️",
                    val: bmiCategory,
                    set: setBmiCategory,
                    opts: [
                      { l: "Healthy Range", v: "normal" },
                      { l: "Underweight", v: "underweight" },
                      { l: "Overweight", v: "overweight" },
                      { l: "Obese", v: "obese" },
                    ],
                  },
                ].map((item, idx) => (
                  <div key={idx}>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-slate-900 mb-2">
                      {item.label}
                    </label>
                    <select
                      value={item.val}
                      onChange={(e) => item.set(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-100 px-5 py-4 rounded-2xl font-bold text-slate-900 text-sm outline-none focus:bg-white focus:border-blue-500 transition-all cursor-pointer appearance-none"
                    >
                      {item.opts.map((o) => (
                        <option key={o.v} value={o.v}>
                          {o.l}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-slate-950 text-white py-8 rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] hover:bg-emerald-500 transition-all active:scale-[0.98] shadow-xl"
            >
              Calculate Remaining Time ⚡
            </button>
          </form>
        </div>
      </section>

      {/* --- RESULTS DASHBOARD --- */}
      {showResults && (
        <main
          ref={resultsRef}
          className="max-w-6xl mx-auto px-4 mt-20 animate-in fade-in slide-in-from-bottom-8 duration-700"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                label: "Life Progress",
                val: daysLived.toLocaleString(),
                unit: "DAYS",
                icon: "☀️",
                color: "from-blue-600 to-cyan-500",
              },
              {
                label: "Statistical Limit",
                val: Math.round(adjustedLE),
                unit: "YEARS",
                icon: "🎯",
                color: "from-emerald-500 to-teal-500",
              },
              {
                label: "Future Runway",
                val: Math.round(remainingYears),
                unit: "YEARS",
                icon: "⏳",
                color: "from-orange-500 to-amber-500",
              },
              {
                label: "Terminal Date",
                val: expectedDeathDate
                  ? format(expectedDeathDate, "MMM d, yyyy")
                  : "",
                unit: "",
                icon: "📅",
                color: "from-slate-700 to-slate-900",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center group hover:scale-105 transition-all"
              >
                <div
                  className={`w-16 h-16 rounded-[1.25rem] bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl mb-8 mx-auto text-white shadow-lg`}
                >
                  {card.icon}
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                  {card.label}
                </p>
                <h3 className="text-3xl font-black text-slate-950 tracking-tight">
                  {card.val}{" "}
                  <span className="text-[10px] text-slate-300 ml-1">
                    {card.unit}
                  </span>
                </h3>
              </div>
            ))}
          </div>
        </main>
      )}

      <section className="mt-32 bg-slate-50 py-24 px-6 border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-slate-950 mb-12 tracking-tighter">
            A Practical View of <br />
            <span className="text-emerald-600">Longevity</span>
          </h2>

          <div className="space-y-10 text-slate-900 text-xl leading-relaxed">
            <p>
              This page is not here to scare anyone. It is here to give you a clearer baseline so you can make smarter
              decisions about health, money, and time.
            </p>

            <h3 className="text-3xl font-black text-slate-950 pt-6">
              What lifestyle inputs really do
            </h3>
            <p>
              Smoking, exercise, diet, and weight do not just change a score on screen. They affect long-term risk.
              The model here uses simplified adjustments to show direction, not certainty.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                <h4 className="font-black text-blue-600 text-sm tracking-widest uppercase mb-4">
                  Use it as a baseline
                </h4>
                <p className="text-base text-slate-700">
                  Run the calculator with your current habits. Then test one improvement at a time and compare.
                </p>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                <h4 className="font-black text-emerald-600 text-sm tracking-widest uppercase mb-4">
                  Focus on consistency
                </h4>
                <p className="text-base text-slate-700">
                  Long-term routines usually beat short bursts of motivation. Small changes repeated daily add up.
                </p>
              </div>
            </div>

            <h3 className="text-3xl font-black text-slate-950 pt-6">
              Better questions to ask after you see your result
            </h3>
            <p>
              Instead of asking, "Is this exact?", ask: "What can I improve this month?" and "How do I reduce future risk?"
              That mindset turns this from a curiosity tool into a useful planning tool.
            </p>

            <div className="bg-slate-950 text-white p-12 md:p-16 rounded-[4rem] my-12 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-3xl font-black mb-4 italic">
                  Your next decade is still editable.
                </h4>
                <p className="text-slate-400 text-lg leading-relaxed">
                  The strongest value in this calculator is reflection. Use it to set healthier defaults and track progress over time.
                </p>
              </div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      seo: {
        title: "Lifestyle Factor Calculator | ImBoredNow",
        description:
          "Estimate how daily habits can influence long-term life expectancy using a simple lifestyle-based model.",
        canonical: "https://www.imborednow.com/p/life-style-factor",
        ogTitle: "Lifestyle Factor Calculator",
        ogDescription:
          "See how smoking, activity, diet, and weight choices can affect your long-term estimate.",
      },
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Lifestyle Factor Calculator",
        url: "https://www.imborednow.com/p/life-style-factor",
        description:
          "Lifestyle-based life expectancy estimation tool.",
        author: { "@type": "Organization", name: "ImBoredNow" },
      },
    },
  };
}
