/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

interface TActivity {
  type: string;
  emoji: string;
  title: string;
  content: string;
  color: string;
  bgColor: string;
}

export default function RandomActivity() {
  const [activity, setActivity] = useState<TActivity | null>(null);
  const [loading, setLoading] = useState(false);
  const [animation, setAnimation] = useState(false);

  const activities = [
    {
      type: "joke",
      emoji: "😂",
      title: "Dad Joke Time!",
      content:
        "Why don't scientists trust atoms? Because they make up everything!",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      type: "fact",
      emoji: "🧠",
      title: "Amazing Fact",
      content:
        "Octopuses have three hearts and blue blood! Two hearts pump blood to the gills, while the third pumps it to the rest of the body.",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
    },
    {
      type: "challenge",
      emoji: "🎯",
      title: "Quick Challenge",
      content:
        "Try to stand on one leg with your eyes closed for 30 seconds. Can you do it without wobbling?",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
    },
    {
      type: "riddle",
      emoji: "🧩",
      title: "Brain Teaser",
      content:
        "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I? (Answer: An echo)",
      color: "from-pink-500 to-pink-600",
      bgColor: "from-pink-50 to-pink-100",
    },
    {
      type: "diy",
      emoji: "✂️",
      title: "DIY Idea",
      content:
        "Make a paper airplane and see how far you can throw it! Try different folding techniques for maximum distance.",
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
    },
    {
      type: "trivia",
      emoji: "❓",
      title: "Trivia Question",
      content:
        "Which planet in our solar system has the most moons? Saturn, with over 80 confirmed moons!",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "from-indigo-50 to-indigo-100",
    },
    {
      type: "game",
      emoji: "🎮",
      title: "Quick Game Idea",
      content:
        'Play "Word Association" - Think of a random word, then think of another word related to it. See how long you can keep the chain going!',
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
    },
    {
      type: "joke",
      emoji: "🤣",
      title: "Knock Knock Joke",
      content:
        "Knock knock! Who's there? Interrupting cow. Interrupting cow wh— MOOOOO!",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "from-yellow-50 to-yellow-100",
    },
    {
      type: "fact",
      emoji: "🌟",
      title: "Wild Fact",
      content:
        "Honey never spoils! Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still perfectly edible.",
      color: "from-cyan-500 to-cyan-600",
      bgColor: "from-cyan-50 to-cyan-100",
    },
    {
      type: "meditation",
      emoji: "🧘",
      title: "Quick Mindfulness",
      content:
        "Take 5 deep breaths. Breathe in for 4 seconds, hold for 4, breathe out for 4. Feel the calm wash over you.",
      color: "from-teal-500 to-teal-600",
      bgColor: "from-teal-50 to-teal-100",
    },
  ];

  const categories = [
    { label: "😂 Jokes", route: "/p/jokes" },
    { label: "🧠 Facts", route: "/p/facts" },
    // { label: "🎮 Games", route: "/games" },
    { label: "🧩 Riddles", route: "/p/mind-bending-riddle" },
    { label: "✂️ DIY", route: "/p/diy-craft" },
    // { label: "🎯 Challenges", route: "/challenges" },
    // { label: "😌 Relax", route: "/relax" },
    // { label: "❓ Trivia", route: "/trivia" },
    // { label: "🌟 Surprise", route: "/surprise" },
  ];

  const getRandomActivity = () => {
    setLoading(true);
    setAnimation(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * activities.length);
      setActivity(activities[randomIndex]);
      setLoading(false);
      setTimeout(() => setAnimation(false), 500);
    }, 800);
  };

  const handleShare = (platform: "fb" | "x" | "email") => {
    const shareUrl =
      typeof window !== "undefined"
        ? window.location.href
        : "https://imborednow.com";
    const shareText = "Check out this awesome boredom killer! 🚀";
    let url = "";

    switch (platform) {
      case "fb":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "x":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}&text=${encodeURIComponent(shareText)}`;
        break;
      case "email":
        url = `mailto:?subject=${encodeURIComponent(
          "You have to see this!"
        )}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
        break;
    }

    if (platform === "email") {
      window.location.href = url;
    } else {
      window.open(url, "_blank", "width=600,height=400");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getRandomActivity();
  }, []);

  return (
    <>
      <Head>
        <title>Random Activity - I'm Bored Now Instantly!</title>
        <meta
          name="description"
          content="Get a random activity, joke, fact, or challenge to I'm Bored Now right now!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Top Ad */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl w-full h-24 flex items-center justify-center text-gray-500 font-semibold shadow-inner">
              [AdSense Leaderboard 728×90]
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Hero Section */}
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                  Random Activity Generator
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                  Click the button and get instant entertainment! No thinking
                  required.
                </p>
              </div>

              {/* Activity Card */}
              <div className="mb-8">
                {loading ? (
                  <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 min-h-96 flex flex-col items-center justify-center border-4 border-purple-200">
                    <div className="relative w-32 h-32 mb-8">
                      <div className="absolute inset-0 border-8 border-purple-200 rounded-full"></div>
                      <div className="absolute inset-0 border-8 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-2xl font-bold text-gray-600 animate-pulse">
                      Finding something fun...
                    </p>
                  </div>
                ) : activity ? (
                  <div
                    className={`bg-gradient-to-br ${
                      activity.bgColor
                    } rounded-3xl shadow-2xl overflow-hidden border-4 border-white transition-all duration-500 ${
                      animation ? "scale-95 opacity-0" : "scale-100 opacity-100"
                    }`}
                  >
                    <div
                      className={`bg-gradient-to-r ${activity.color} p-6 sm:p-8 text-white text-center`}
                    >
                      <div className="text-7xl sm:text-8xl mb-4 animate-bounce">
                        {activity.emoji}
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-black drop-shadow-lg">
                        {activity.title}
                      </h3>
                    </div>

                    <div className="p-8 sm:p-12">
                      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg mb-8">
                        <p className="text-xl sm:text-2xl text-gray-800 leading-relaxed text-center">
                          {activity.content}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={getRandomActivity}
                          className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg sm:text-xl font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                          <span className="inline-flex items-center">
                            🎲 Give Me Another!
                            <svg
                              className="w-6 h-6 ml-2 group-hover:rotate-180 transition-transform duration-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                          </span>
                        </button>

                        <button className="px-8 py-4 bg-white border-2 border-purple-600 text-purple-600 text-lg sm:text-xl font-bold rounded-full hover:bg-purple-50 transition-all duration-300 shadow-lg">
                          ❤️ Save for Later
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Stats Bar */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-purple-100">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
                  <div className="space-y-2">
                    <div className="text-3xl">🎯</div>
                    <div className="text-2xl sm:text-3xl font-black text-purple-600">
                      1000+
                    </div>
                    <div className="text-sm text-gray-600">Activities</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl">😂</div>
                    <div className="text-2xl sm:text-3xl font-black text-pink-600">
                      500+
                    </div>
                    <div className="text-sm text-gray-600">Jokes</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl">🧠</div>
                    <div className="text-2xl sm:text-3xl font-black text-green-600">
                      300+
                    </div>
                    <div className="text-sm text-gray-600">Facts</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl">🎮</div>
                    <div className="text-2xl sm:text-3xl font-black text-orange-600">
                      200+
                    </div>
                    <div className="text-sm text-gray-600">Games</div>
                  </div>
                </div>
              </div>

              {/* Category Filters */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8 mb-8 border border-purple-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  🎨 Choose by Category
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                  {categories.map((cat, idx) => (
                    <Link
                      key={idx}
                      href={cat.route}
                    >
                      <button className="w-full px-4 py-3 bg-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 text-gray-700 hover:text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-200 hover:border-transparent">
                        {cat.label}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>

              {/* In-content Ad */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl w-full h-64 flex items-center justify-center text-gray-500 font-semibold shadow-inner">
                  [AdSense Rectangle 336×280]
                </div>
              </div>

              {/* How to Use */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-purple-100">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
                  💡 How to Use This Page
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 mb-1">
                        Click the Button
                      </h4>
                      <p className="text-gray-600">
                        Hit &quot;Give Me Another!&quot; to get a random
                        activity, joke, fact, or challenge.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 mb-1">
                        Enjoy Your Activity
                      </h4>
                      <p className="text-gray-600">
                        Read, laugh, learn, or try the challenge. Have fun with
                        it!
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 mb-1">
                        Keep Going!
                      </h4>
                      <p className="text-gray-600">
                        Click as many times as you want. The fun never stops!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Ad Unit */}
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl w-full h-64 flex items-center justify-center text-gray-500 font-semibold shadow-inner">
                  [AdSense 300×250]
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  ⚡ Quick Actions
                </h3>
                <div className="flex flex-col gap-3">
                  <Link href="/p/jokes">
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                      😂 Just Jokes
                    </button>
                  </Link>
                  <Link href="/p/facts">
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                      🧠 Only Facts
                    </button>
                  </Link>
                  <Link href="/p/diy-craft">
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                      ✂️ DIY Crafts
                    </button>
                  </Link>
                  <Link href="/">
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                      🏠 Back Home
                    </button>
                  </Link>
                </div>
              </div>

              {/* Share */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                  📢 Share the Fun!
                </h3>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Tell your friends about this awesome boredom killer!
                </p>
                <div className="flex gap-2 justify-center">
                  {/* Facebook */}
                  <button
                    onClick={() => handleShare("fb")}
                    className="w-10 h-10 bg-[#1877F2] text-white rounded-full hover:scale-110 active:scale-90 transition-transform flex items-center justify-center text-xl font-bold"
                  >
                    f
                  </button>

                  {/* X (Twitter) */}
                  <button
                    onClick={() => handleShare("x")}
                    className="w-10 h-10 bg-black text-white rounded-full hover:scale-110 active:scale-90 transition-transform flex items-center justify-center"
                  >
                    𝕏
                  </button>

                  {/* Email */}
                  <button
                    onClick={() => handleShare("email")}
                    className="w-10 h-10 bg-pink-600 text-white rounded-full hover:scale-110 active:scale-90 transition-transform flex items-center justify-center text-xl"
                  >
                    📧
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
