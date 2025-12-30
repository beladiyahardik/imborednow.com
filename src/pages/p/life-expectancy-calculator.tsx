import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { format, addYears, addDays } from "date-fns";

export default function LifeExpectancyCalculator() {
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("male"); // male, female
  const [country, setCountry] = useState("world"); // world average or specific
  const [showResults, setShowResults] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  // Average life expectancy data (2025 estimates, sourced from WHO/UN)
  const lifeExpectancyData: Record<string, { male: number; female: number; both: number }> = {
    world: { male: 71, female: 76, both: 73.5 },
    usa: { male: 76, female: 81, both: 78.5 },
    japan: { male: 81, female: 87, both: 84.5 },
    uk: { male: 79, female: 83, both: 81 },
    australia: { male: 81, female: 85, both: 83 },
    india: { male: 69, female: 72, both: 70.5 },
    brazil: { male: 72, female: 79, both: 75.5 },
  };

  const selectedLE = lifeExpectancyData[country];
  const expectedYears = gender === "male" ? selectedLE.male : gender === "female" ? selectedLE.female : selectedLE.both;

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
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showResults]);

  const today = format(new Date(), "yyyy-MM-dd");
  const currentAgeInYears = birthdate
    ? (new Date().getTime() - new Date(birthdate).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    : 0;

  const expectedBirthToDeathYears = expectedYears;
  const expectedDeathDate = birthdate ? addYears(new Date(birthdate), expectedBirthToDeathYears) : null;
  const remainingYears = expectedDeathDate ? (expectedDeathDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365.25) : 0;

  // Bonus: Days lived and expected total days
  const daysLived = birthdate ? Math.floor((new Date().getTime() - new Date(birthdate).getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const expectedTotalDays = Math.round(expectedYears * 365.25);

  return (
    <>
      <Head>
        <title>Life Expectancy Calculator - How Many Days Will You Live?</title>
        <meta
          name="description"
          content="Discover your estimated life expectancy based on gender and country. See your expected birthday milestones and how many days you might live!"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-purple-100">
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center gap-1.5">
                <span className="text-3xl">🎯</span>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  I'm Bored Now
                </h1>
              </Link>
              <nav className="hidden md:flex space-x-6 lg:space-x-8">
                {["Home", "Jokes", "Games", "Facts", "Random"].map((item) => (
                  <Link
                    key={item}
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-purple-600 font-semibold transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-90"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 text-center text-white">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight drop-shadow-2xl mb-6">
              Life Expectancy Calculator 🌍
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium opacity-95 max-w-4xl mx-auto mb-12">
              How long might you live? Discover your estimated lifespan and key milestones based on global health data.
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto bg-white/20 backdrop-blur-lg p-8 sm:p-12 rounded-3xl shadow-2xl border border-white/30 space-y-8"
            >
              <div>
                <label className="block text-lg sm:text-xl font-bold mb-4">Your Birthdate 🎂</label>
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
                <label className="block text-lg sm:text-xl font-bold mb-4">Gender</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                      gender === "male"
                        ? "bg-yellow-300 text-purple-800 shadow-lg scale-105"
                        : "bg-white/30 text-white hover:bg-white/50"
                    }`}
                  >
                    👨 Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                      gender === "female"
                        ? "bg-yellow-300 text-purple-800 shadow-lg scale-105"
                        : "bg-white/30 text-white hover:bg-white/50"
                    }`}
                  >
                    👩 Female
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("both")}
                    className={`py-4 px-6 rounded-xl font-bold text-lg transition-all col-span-2 sm:col-span-1 ${
                      gender === "both"
                        ? "bg-yellow-300 text-purple-800 shadow-lg scale-105"
                        : "bg-white/30 text-white hover:bg-white/50"
                    }`}
                  >
                    👥 Average
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-lg sm:text-xl font-bold mb-4">Country / Region</label>
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

              <button
                type="submit"
                className="group w-full px-8 py-6 text-2xl font-bold bg-yellow-300 text-purple-800 rounded-full shadow-2xl hover:shadow-yellow-400/60 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                ✨ Reveal My Lifespan!
                <span className="inline-block group-hover:translate-x-3 transition-transform">→</span>
              </button>
            </form>
          </div>
        </section>

        {/* Results Section */}
        {showResults && birthdate && expectedDeathDate && (
          <section ref={resultsRef} className="py-16 sm:py-24 bg-white/70 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Your Life Journey Ahead 🌟
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {/* Days Lived */}
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-8 rounded-3xl shadow-2xl text-center hover:scale-105 transition-transform">
                  <div className="text-6xl mb-4">🗓️</div>
                  <div className="text-4xl font-black">{daysLived.toLocaleString()}</div>
                  <div className="text-xl mt-2">Days You've Lived</div>
                </div>

                {/* Expected Total Days */}
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-8 rounded-3xl shadow-2xl text-center hover:scale-105 transition-transform">
                  <div className="text-6xl mb-4">🎯</div>
                  <div className="text-4xl font-black">{expectedTotalDays.toLocaleString()}</div>
                  <div className="text-xl mt-2">Expected Total Days</div>
                </div>

                {/* Estimated Death Date */}
                <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-8 rounded-3xl shadow-2xl text-center hover:scale-105 transition-transform">
                  <div className="text-6xl mb-4">📅</div>
                  <div className="text-2xl font-bold">
                    {format(expectedDeathDate, "MMMM d, yyyy")}
                  </div>
                  <div className="text-lg mt-2">Estimated End Date</div>
                  <div className="text-sm opacity-80 mt-4">
                    ({expectedYears} years old)
                  </div>
                </div>

                {/* Remaining Years */}
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-8 rounded-3xl shadow-2xl text-center hover:scale-105 transition-transform">
                  <div className="text-6xl mb-4">⏳</div>
                  <div className="text-4xl font-black">
                    {remainingYears > 0 ? Math.max(0, Math.round(remainingYears)) : "0"}
                  </div>
                  <div className="text-xl mt-2">
                    {remainingYears > 1 ? "Years Left" : "Year Left"}
                  </div>
                  <div className="text-sm opacity-80 mt-4">
                    Make them count!
                  </div>
                </div>
              </div>

              <div className="mt-16 text-center bg-gradient-to-r from-purple-100 to-pink-100 p-8 rounded-3xl max-w-4xl mx-auto border border-purple-200">
                <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                  You&apos;ve already lived about{" "}
                  <span className="text-purple-600">
                    {((daysLived / expectedTotalDays) * 100).toFixed(1)}%
                  </span>{" "}
                  of your expected life.
                </p>
                <p className="text-lg text-gray-700">
                  This is just an estimate based on averages. Lifestyle, health, and luck play a huge role! 💪
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
                  🔄 Calculate Again
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
              Live Fully Today 🌈
            </h3>
            <p className="text-xl sm:text-2xl leading-relaxed text-gray-800">
              No matter the number, every day is a gift. Laugh more, love deeply, and chase what makes you happy.
              <br />
              <span className="font-bold text-purple-600">You&apos;ve got this!</span>
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-10 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <Link href="/" className="flex justify-center items-center gap-1.5 mb-6">
              <span className="text-3xl">🎯</span>
              <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                I'm Bored Now
              </span>
            </Link>
            <p className="text-gray-400">© 2025 I'm Bored Now. Made with ❤️ to inspire and entertain.</p>
          </div>
        </footer>
      </div>
    </>
  );
}