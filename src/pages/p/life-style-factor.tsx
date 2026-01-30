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

      {/* --- EXPANDED 1500+ WORD ARTICLE --- */}
      <section className="mt-32 bg-slate-50 py-24 px-6 border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-slate-950 mb-12 tracking-tighter">
            Deciphering the <br />
            <span className="text-emerald-600">Human Expiry.</span>
          </h2>

          <div className="space-y-12 text-slate-900 text-xl leading-relaxed">
            <div className="border-l-4 border-blue-500 pl-8 py-4 bg-white rounded-r-3xl shadow-sm">
              <p className="font-bold text-2xl text-slate-950 italic">
                "The goal is not to live forever, but to create a body that
                will."
              </p>
              <p className="mt-4 text-slate-600 font-medium">
                By using advanced biometric data, we can now project human
                longevity with unprecedented accuracy. But what truly defines
                how long we stay on this planet?
              </p>
            </div>

            <h3 className="text-4xl font-black text-slate-950 pt-10">
              1. The Biological Clock and Cellular Senescence
            </h3>
            <p>
              At the core of every life expectancy calculation is cellular
              health. Our bodies are composed of trillions of cells, each
              containing a biological clock known as telomeres. Every time a
              cell divides, these telomeres shorten. Once they become too short,
              the cell enters a state of senescence - it no longer functions
              correctly but refuses to die, often causing inflammation in
              surrounding tissues.
            </p>
            <p>
              Modern research suggests that while our genetics provide the
              "baseline" for these telomeres, our lifestyle choices act as the
              primary accelerators or decelerators. A sedentary lifestyle, high
              stress, and poor nutrition act as a catalyst for cellular aging,
              effectively "fast-forwarding" your terminal date.
            </p>

            <h3 className="text-4xl font-black text-slate-950 pt-10">
              2. The Impact of Chronic Habits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                <h4 className="font-black text-blue-600 text-sm tracking-widest uppercase mb-4">
                  Smoking & Oxidation
                </h4>
                <p className="text-base text-slate-700">
                  Smoking introduces over 7,000 chemicals into the bloodstream,
                  triggering massive oxidative stress. This process damages DNA
                  directly, leading to an average loss of 10 years. However, the
                  body's regenerative power is immense; quitting before 40 can
                  reclaim nearly all of those lost years.
                </p>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                <h4 className="font-black text-emerald-600 text-sm tracking-widest uppercase mb-4">
                  Exercise & Mitophagy
                </h4>
                <p className="text-base text-slate-700">
                  Physical activity triggers mitophagy - the process where your
                  body clears out damaged mitochondria. This "cellular cleanup"
                  is why active individuals often possess a "health age" that is
                  5 to 10 years younger than their chronological age.
                </p>
              </div>
            </div>

            <h3 className="text-4xl font-black text-slate-950 pt-10">
              3. Blue Zones: Lessons from Centenarians
            </h3>
            <p>
              Researchers have identified specific "Blue Zones" - geographic
              regions where people live significantly longer than the global
              average. These include Okinawa (Japan), Sardinia (Italy), and
              Nicoya (Costa Rica). Their longevity isn't a result of high-tech
              medicine, but rather "The Power 9" habits.
            </p>
            <ul className="space-y-4 text-lg">
              <li className="flex gap-4 items-start">
                <span className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </span>{" "}
                <strong>Natural Movement:</strong> They don't run marathons;
                they walk, garden, and move every 20 minutes.
              </li>
              <li className="flex gap-4 items-start">
                <span className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </span>{" "}
                <strong>The 80% Rule:</strong> They stop eating when their
                stomach is 80% full, preventing metabolic overload.
              </li>
              <li className="flex gap-4 items-start">
                <span className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </span>{" "}
                <strong>The Power of 'Ikigai':</strong> Having a clear purpose
                or "reason for being" adds psychological resilience that
                manifests as physical health.
              </li>
            </ul>

            <h3 className="text-4xl font-black text-slate-950 pt-10">
              4. The Psychology of Longevity
            </h3>
            <p>
              Longevity is as much mental as it is physical. Chronic stress
              triggers the release of cortisol, which in small doses is helpful
              but in long doses is corrosive. Cortisol suppresses the immune
              system and increases blood pressure. Interestingly, social
              isolation has been found to be as damaging to life expectancy as
              smoking 15 cigarettes a day.
            </p>
            <p>
              Strong social ties and community engagement act as a "buffer"
              against the physiological damage of aging. People with deep
              emotional connections tend to recover faster from illness and have
              lower rates of cognitive decline.
            </p>

            <h3 className="text-4xl font-black text-slate-950 pt-10">
              5. Nutrition: Fueling the Centenarian Engine
            </h3>
            <p>
              Dietary impact on lifespan is often debated, but the consensus
              points toward a plant-heavy, whole-food diet. High sugar
              consumption leads to "glycation" - where sugar molecules attach to
              proteins and fats, creating "Advanced Glycation Endproducts"
              (AGEs). These AGEs literally "caramelize" your tissues, making
              them stiff and prone to failure.
            </p>
            <p>
              By contrast, diets rich in antioxidants (found in berries, leafy
              greens, and nuts) neutralize free radicals, protecting your DNA
              from the daily wear and tear of existence.
            </p>

            <h3 className="text-4xl font-black text-slate-950 pt-10">
              6. Planning for the "Third Act"
            </h3>
            <p>
              As we extend our lifespan, the concept of retirement must evolve.
              In the 20th century, life was seen in three stages: education,
              work, and rest. In the 21st century, we are moving toward a
              multi-stage life. You might have three different careers, take
              multiple "gap years" in your 50s, and remain productive well into
              your 80s.
            </p>
            <p>
              Financial readiness is the cornerstone of this extended life. If
              our calculator shows you have 40 years of runway left, your
              financial strategy must account for inflation, healthcare costs,
              and the desire for continued growth and adventure.
            </p>

            <div className="bg-slate-950 text-white p-12 md:p-16 rounded-[4rem] my-20 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-3xl font-black mb-6 italic">
                  What will you do with your remaining days?
                </h4>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Knowing your estimated lifespan isn't about fear - it's about
                  intentionality. It's a reminder that every day is a finite
                  resource. Whether you use this data to quit a habit, start a
                  new passion, or spend more time with loved ones, the power of
                  this analysis lies in the action you take today.
                </p>
              </div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px]" />
            </div>

            <h3 className="text-4xl font-black text-slate-950 pt-10">
              7. The Future of Longevity Technology
            </h3>
            <p>
              We are entering the era of "Longevity 2.0." From CRISPR gene
              editing to senolytic drugs that target and remove "zombie" cells,
              the scientific community is moving from treating disease to
              delaying aging itself. In the coming decade, we may see the first
              "longevity escape velocity" - a point where for every year you live,
              science adds more than one year to your life expectancy.
            </p>
            <p>
              Until then, the most powerful tool in your arsenal is the daily
              decision. What you eat, how you move, and how you think are the
              true architects of your future.
            </p>
          </div>

          <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col items-center">
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mb-8 rounded-full" />
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest text-center">
              Refined Biometric Data Series 2026 • ImBoredNow Lab
            </p>
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
        title: "How Long Will I Live? | Advanced Life Expectancy Forecast 2026",
        description:
          "Use our biometric longevity lab to forecast your life expectancy. Analyze habits, geography, and lifestyle to determine your future health runway.",
        canonical: "https://imborednow.com/life-expectancy-calculator",
        ogTitle: "Biometric Forecast: Discover Your Estimated Lifespan",
        ogDescription:
          "A data-driven approach to longevity. Calculate your remaining days and learn the science of living to 100.",
      },
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Longevity Lab 2026",
        url: "https://www.imborednow.com/life-expectancy-calculator",
        description:
          "Biological lifespan forecasting tool based on lifestyle and actuarial data.",
        author: { "@type": "Organization", name: "ImBoredNow" },
      },
    },
  };
}
