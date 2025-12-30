"use client";
/* eslint-disable react/no-unescaped-entities */
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { format, addDays } from "date-fns";

export default function MilestoneCalculator() {
  const [birthdate, setBirthdate] = useState("");
  const [milestones, setMilestones] = useState<
    { days: number; date: string; formattedDate: string }[]
  >([]);
  const [showResults, setShowResults] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const milestoneDays = [
    1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 15000, 20000,
  ];

  const calculateMilestones = () => {
    if (!birthdate) return;

    const birthDate = new Date(birthdate);
    if (isNaN(birthDate.getTime())) return;

    const newMilestones = milestoneDays.map((days) => {
      const milestoneDate = addDays(birthDate, days);
      return {
        days,
        date: milestoneDate.toISOString(),
        formattedDate: format(milestoneDate, "MMMM d, yyyy (EEEE)"),
      };
    });

    setMilestones(newMilestones);
    setShowResults(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateMilestones();
  };

  // Auto-scroll to results when they appear
  useEffect(() => {
    if (showResults && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [showResults]);

  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <>
      <Head>
        <title>
          Life Milestone Calculator - When Will You Hit 10,000 Days?
        </title>
        <meta
          name="description"
          content="Enter your birthdate and discover the exact dates you'll reach 1000, 5000, 10000 days old and more! Fun life milestones calculator."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 opacity-90"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 text-center text-white">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight drop-shadow-2xl mb-6">
              Your Life in Days 🗓️
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium opacity-95 max-w-4xl mx-auto mb-12">
              Ever wondered on which exact date you'll turn{" "}
              <span className="text-yellow-300 font-bold">10,000 days old</span>
              ?
              <br />
              Discover your major life milestones instantly!
            </p>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto bg-white/20 backdrop-blur-lg p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/30"
            >
              <label className="block text-lg sm:text-xl font-bold mb-4">
                Enter Your Birthdate 🎂
              </label>
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                max={today}
                required
                className="w-full px-6 py-4 text-gray-800 text-lg rounded-xl border-2 border-white/50 focus:border-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-300/30 transition-all"
              />
              <button
                type="submit"
                className="group mt-8 w-full px-8 py-5 text-xl sm:text-2xl font-bold bg-yellow-300 text-purple-800 rounded-full shadow-xl hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300 transform flex items-center justify-center gap-3"
              >
                ✨ Calculate My Milestones!
                <span className="inline-block group-hover:translate-x-2 transition-transform">
                  →
                </span>
              </button>
            </form>
          </div>
        </section>

        {/* Results Section - Smooth Scroll Target */}
        {showResults && milestones.length > 0 && (
          <section
            ref={resultsRef}
            className="py-16 sm:py-24 bg-white/60 backdrop-blur-sm"
          >
            <div className="container mx-auto px-4 sm:px-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-fade-in">
                Your Epic Life Milestones 🎉
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {milestones.map((milestone, index) => {
                  const isFuture = new Date(milestone.date) > new Date();
                  const daysLeft = Math.ceil(
                    (new Date(milestone.date).getTime() -
                      new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  );

                  return (
                    <div
                      key={milestone.days}
                      className={`group relative p-8 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-4 hover:scale-105 animate-fade-up ${
                        index < 3
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                          : index < 6
                          ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
                          : "bg-gradient-to-br from-green-500 to-emerald-500 text-white"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>
                      <div className="relative text-center space-y-4">
                        <div className="text-6xl sm:text-7xl font-black">
                          {milestone.days.toLocaleString()}
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold">
                          Days Old
                        </div>
                        <div className="text-lg sm:text-xl opacity-90">
                          {milestone.formattedDate}
                        </div>
                        {isFuture && daysLeft > 0 && (
                          <div className="mt-4 pt-4 border-t border-white/30">
                            <p className="text-sm uppercase tracking-wider font-bold">
                              In {daysLeft.toLocaleString()} days
                            </p>
                          </div>
                        )}
                        {!isFuture && (
                          <div className="mt-4 pt-4 border-t border-white/30">
                            <p className="text-sm uppercase tracking-wider text-yellow-200 font-bold">
                              Already Passed! 🎈
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="absolute top-4 right-4 text-5xl opacity-30">
                        {index < 3 ? "🎂" : index < 6 ? "🚀" : "🏆"}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center mt-16">
                <button
                  onClick={() => {
                    setShowResults(false);
                    setBirthdate("");
                    setMilestones([]);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-10 py-5 text-xl font-bold bg-white text-purple-600 rounded-full shadow-xl hover:shadow-purple-400/50 hover:scale-110 transition-all duration-300"
                >
                  🔄 Try Another Birthdate
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Ad Placement */}
        <div className="container mx-auto px-4 sm:px-6 my-12">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl w-full h-64 flex items-center justify-center text-gray-500 font-semibold shadow-inner">
            [AdSense Rectangle 336×280]
          </div>
        </div>

        {/* Fun Fact Section */}
        <section className="py-16 bg-gradient-to-br from-purple-100 to-pink-100">
          <div className="container mx-auto px-4 sm:px-6 text-center max-w-4xl">
            <h3 className="text-3xl sm:text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Fun Fact 💡
            </h3>
            <p className="text-xl sm:text-2xl leading-relaxed text-gray-800">
              The average person lives about <strong>28,000 days</strong>.
              <br />
              That&apos;s only{" "}
              <span className="text-purple-600 font-bold">77 years</span> — make
              every day count! 🌟
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
