"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { format, addYears } from "date-fns";

export default function LifeExpectancyCalculator() {
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("male");
  const [country, setCountry] = useState("world");

  // Lifestyle factors
  const [smoking, setSmoking] = useState("never"); // never, former, current
  const [exercise, setExercise] = useState("active"); // sedentary, moderate, active
  const [alcohol, setAlcohol] = useState("moderate"); // none, moderate, heavy
  const [diet, setDiet] = useState("healthy"); // poor, average, healthy
  const [bmiCategory, setBmiCategory] = useState("normal"); // underweight, normal, overweight, obese

  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Base life expectancy data (2025 estimates)
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

  // Lifestyle adjustments in years (approximate averages from studies)
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
    const birthDate = new Date(birthdate);
    if (isNaN(birthDate.getTime())) return;
    setShowResults(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculate();
  };

  useEffect(() => {
    if (showResults && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [showResults]);

  const today = format(new Date(), "yyyy-MM-dd");

  const currentAgeInYears = birthdate
    ? (new Date().getTime() - new Date(birthdate).getTime()) /
      (1000 * 60 * 60 * 24 * 365.25)
    : 0;

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
  const expectedTotalDays = Math.round(adjustedLE * 365.25);

  return (
    <>
      <Head>
        <title>Advanced Life Expectancy Calculator - Lifestyle Edition</title>
        <meta
          name="description"
          content="Personalized life expectancy calculator including smoking, exercise, diet, alcohol, and BMI. See how your habits affect your lifespan!"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-90"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 text-center text-white">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight drop-shadow-2xl mb-6">
              Advanced Life Expectancy Calculator 🧬
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium opacity-95 max-w-4xl mx-auto mb-12">
              See how your lifestyle choices — smoking, exercise, diet, alcohol
              & weight — can add or subtract years from your life!
            </p>

            {/* Expanded Form */}
            <form
              onSubmit={handleSubmit}
              className="max-w-4xl mx-auto bg-white/20 backdrop-blur-lg p-8 sm:p-12 rounded-3xl shadow-2xl border border-white/30 space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg sm:text-xl font-bold mb-4">
                    Birthdate 🎂
                  </label>
                  <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    max={today}
                    required
                    className="w-full px-6 py-4 text-gray-800 text-lg rounded-xl border-2 border-white/50 focus:border-yellow-300 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-lg sm:text-xl font-bold mb-4">
                    Gender
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {["male", "female", "both"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                          gender === g
                            ? "bg-yellow-300 text-purple-800 shadow-lg scale-105"
                            : "bg-white/30 text-white hover:bg-white/50"
                        }`}
                      >
                        {g === "male"
                          ? "👨 Male"
                          : g === "female"
                          ? "👩 Female"
                          : "👥 Average"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-lg sm:text-xl font-bold mb-4">
                    Country / Region
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-6 py-4 text-gray-800 text-lg rounded-xl border-2 border-white/50 focus:border-yellow-300 focus:outline-none transition-all"
                  >
                    <option value="world">🌍 World Average</option>
                    <option value="japan">🇯🇵 Japan (Highest)</option>
                    <option value="australia">🇦🇺 Australia</option>
                    <option value="uk">🇬🇧 United Kingdom</option>
                    <option value="usa">🇺🇸 United States</option>
                    <option value="brazil">🇧🇷 Brazil</option>
                    <option value="india">🇮🇳 India</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg sm:text-xl font-bold mb-4">
                    Smoking 🚭
                  </label>
                  <select
                    value={smoking}
                    onChange={(e) =>
                      setSmoking(
                        e.target.value as "never" | "former" | "current"
                      )
                    }
                    className="w-full px-6 py-4 text-gray-800 text-lg rounded-xl border-2 border-white/50 focus:border-yellow-300 focus:outline-none transition-all"
                  >
                    <option value="never">Never smoked</option>
                    <option value="former">Former smoker</option>
                    <option value="current">Current smoker</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg sm:text-xl font-bold mb-4">
                    Exercise 🏃
                  </label>
                  <select
                    value={exercise}
                    onChange={(e) =>
                      setExercise(
                        e.target.value as "sedentary" | "moderate" | "active"
                      )
                    }
                    className="w-full px-6 py-4 text-gray-800 text-lg rounded-xl border-2 border-white/50 focus:border-yellow-300 focus:outline-none transition-all"
                  >
                    <option value="sedentary">
                      Sedentary (little/no exercise)
                    </option>
                    <option value="moderate">Moderate (some activity)</option>
                    <option value="active">Active (150+ min/week)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg sm:text-xl font-bold mb-4">
                    Alcohol 🍷
                  </label>
                  <select
                    value={alcohol}
                    onChange={(e) =>
                      setAlcohol(
                        e.target.value as "none" | "moderate" | "heavy"
                      )
                    }
                    className="w-full px-6 py-4 text-gray-800 text-lg rounded-xl border-2 border-white/50 focus:border-yellow-300 focus:outline-none transition-all"
                  >
                    <option value="none">None</option>
                    <option value="moderate">Moderate (≤1-2 drinks/day)</option>
                    <option value="heavy">Heavy ({">"}2 drinks/day)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg sm:text-xl font-bold mb-4">
                    Diet 🥗
                  </label>
                  <select
                    value={diet}
                    onChange={(e) =>
                      setDiet(e.target.value as "poor" | "average" | "healthy")
                    }
                    className="w-full px-6 py-4 text-gray-800 text-lg rounded-xl border-2 border-white/50 focus:border-yellow-300 focus:outline-none transition-all"
                  >
                    <option value="poor">Poor (lots of processed food)</option>
                    <option value="average">Average</option>
                    <option value="healthy">
                      Healthy (lots of fruits/veggies/whole grains)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg sm:text-xl font-bold mb-4">
                    Weight (BMI) ⚖️
                  </label>
                  <select
                    value={bmiCategory}
                    onChange={(e) =>
                      setBmiCategory(
                        e.target.value as
                          | "underweight"
                          | "normal"
                          | "overweight"
                          | "obese"
                      )
                    }
                    className="w-full px-6 py-4 text-gray-800 text-lg rounded-xl border-2 border-white/50 focus:border-yellow-300 focus:outline-none transition-all"
                  >
                    <option value="underweight">Underweight (&lt;18.5)</option>
                    <option value="normal">Normal (18.5-24.9)</option>
                    <option value="overweight">Overweight (25-29.9)</option>
                    <option value="obese">Obese (30+)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="group w-full px-8 py-6 text-2xl font-bold bg-yellow-300 text-purple-800 rounded-full shadow-2xl hover:shadow-yellow-400/60 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                ✨ Reveal My Personalized Lifespan!
                <span className="inline-block group-hover:translate-x-3 transition-transform">
                  →
                </span>
              </button>
            </form>
          </div>
        </section>

        {/* Results Section */}
        {showResults && birthdate && expectedDeathDate && (
          <section
            ref={resultsRef}
            className="py-16 sm:py-24 bg-white/70 backdrop-blur-sm"
          >
            <div className="container mx-auto px-4 sm:px-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Your Personalized Life Journey 🌟
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-8 rounded-3xl shadow-2xl text-center hover:scale-105 transition-transform">
                  <div className="text-6xl mb-4">🗓️</div>
                  <div className="text-4xl font-black">
                    {daysLived.toLocaleString()}
                  </div>
                  <div className="text-xl mt-2">Days Lived So Far</div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-8 rounded-3xl shadow-2xl text-center hover:scale-105 transition-transform">
                  <div className="text-6xl mb-4">🎯</div>
                  <div className="text-4xl font-black">
                    {Math.round(adjustedLE)}
                  </div>
                  <div className="text-xl mt-2">Estimated Total Years</div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-8 rounded-3xl shadow-2xl text-center hover:scale-105 transition-transform">
                  <div className="text-6xl mb-4">📅</div>
                  <div className="text-2xl font-bold">
                    {format(expectedDeathDate, "MMMM d, yyyy")}
                  </div>
                  <div className="text-lg mt-2">Estimated End Date</div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-8 rounded-3xl shadow-2xl text-center hover:scale-105 transition-transform">
                  <div className="text-6xl mb-4">⏳</div>
                  <div className="text-4xl font-black">
                    {Math.round(remainingYears)}
                  </div>
                  <div className="text-xl mt-2">Years Remaining</div>
                  <div className="text-sm opacity-80 mt-4">Make them epic!</div>
                </div>
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-8 rounded-3xl border border-purple-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Base Expectancy: {Math.round(baseLE)} years
                  </h3>
                  <p className="text-lg text-gray-700">
                    From global averages for your gender & country.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-8 rounded-3xl border border-green-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Your Adjusted: {Math.round(adjustedLE)} years
                  </h3>
                  <p className="text-lg text-gray-700">
                    {adjustedLE > baseLE
                      ? `+${Math.round(
                          adjustedLE - baseLE
                        )} years thanks to your habits! 🎉`
                      : adjustedLE < baseLE
                      ? `${Math.round(
                          baseLE - adjustedLE
                        )} years shorter — small changes can help! 💪`
                      : "Right on average!"}
                  </p>
                </div>
              </div>

              <div className="mt-12 text-center bg-white/80 p-8 rounded-3xl max-w-4xl mx-auto">
                <p className="text-lg text-gray-700 italic">
                  *This is an estimate based on large population studies. Actual
                  lifespan depends on many factors including genetics,
                  healthcare, and luck. Use it for motivation, not worry!
                </p>
              </div>

              <div className="text-center mt-12">
                <button
                  onClick={() => {
                    setShowResults(false);
                    setBirthdate("");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-10 py-5 text-xl font-bold bg-white text-purple-600 rounded-full shadow-xl hover:shadow-purple-400/50 hover:scale-110 transition-all duration-300"
                >
                  🔄 Start Over
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Ad Space */}
        <div className="container mx-auto px-4 sm:px-6 my-12">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl w-full h-64 flex items-center justify-center text-gray-500 font-semibold shadow-inner">
            [AdSense Rectangle 336×280]
          </div>
        </div>

        {/* Motivational Section */}
        <section className="py-16 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100">
          <div className="container mx-auto px-4 sm:px-6 text-center max-w-4xl">
            <h3 className="text-3xl sm:text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Small Changes = Big Gains 🌱
            </h3>
            <p className="text-xl sm:text-2xl leading-relaxed text-gray-800">
              Quitting smoking, moving more, eating veggies, and maintaining a
              healthy weight can add <strong>years</strong> to your life.
              <br />
              <span className="font-bold text-purple-600">
                Today is the perfect day to start!
              </span>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
