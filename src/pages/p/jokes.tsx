import JokeCard from "@/components/jokeCard";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const jokes = [
  "Why don't skeletons fight each other? They don't have the guts! 💀",
  "What do you call fake spaghetti? An impasta! 🍝",
  "Why did the scarecrow win an award? He was outstanding in his field! 🌾",
  "How does a penguin build its house? Igloos it together! 🐧",
  "Why can't you give Elsa a balloon? She'll let it go! 🎈",
  "What did one wall say to the other? I'll meet you at the corner! 🧱",
  "Why don't eggs tell jokes? They'd crack each other up! 🥚",
  "What do you call a bear with no teeth? A gummy bear! 🐻",
  "How do you organize a space party? You planet! 🚀",
  "Why did the math book look sad? It had too many problems. 📚",
  "What do you call cheese that isn't yours? Nacho cheese! 🧀",
  "Why was the computer cold? It left its Windows open! 💻",
  "What did the ocean say to the beach? Nothing, it just waved! 🌊",
  "Why don't some couples go to the gym? Because some relationships don't work out! 💪",
  "How do you catch a squirrel? Climb a tree and act like a nut! 🐿️",
  "Why couldn't the bicycle stand up? It was two-tired! 🚲",
  "What do you call a factory that makes okay products? A satisfactory! 🏭",
  "Why did the golfer bring two pairs of pants? In case he got a hole in one! ⛳",
  "I'm on a seafood diet. I see food and I eat it! 🍔",
  "Parallel lines have so much in common... It's a shame they'll never meet. 📏",
];

export default function Jokes() {
  const [currentJoke, setCurrentJoke] = useState(jokes[0]);
  const [isLaughing, setIsLaughing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const getRandomJoke = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * jokes.length);
    } while (jokes[randomIndex] === currentJoke && jokes.length > 1);
    setCurrentJoke(jokes[randomIndex]);
  };

  const handleLaugh = () => {
    setIsLaughing(true);
    setTimeout(() => setIsLaughing(false), 1000);
  };

  const handleSave = () => {
    setIsSaving(true);
    navigator.clipboard.writeText(currentJoke);
    setTimeout(() => setIsSaving(false), 1200);
  };

  const handleShare = async () => {
    setIsSharing(true);
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Hilarious Joke from I'm Bored Now! 😂",
          text: currentJoke,
        });
      } catch (err) {
        navigator.clipboard.writeText(currentJoke);
        alert("Joke copied to clipboard! 😄");
      }
    } else {
      navigator.clipboard.writeText(currentJoke);
      alert("Joke copied! Spread the laughter! 😂");
    }
    setTimeout(() => setIsSharing(false), 1200);
  };

  return (
    <>
      <Head>
        <title>Jokes | I'm Bored Now - Instant Laughter!</title>
        <meta
          name="description"
          content="Endless random jokes, dad jokes, puns – one click for pure joy!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 pb-12">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-95"></div>

          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
            <div className="absolute top-20 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative container mx-auto px-6 py-24 sm:py-32 text-center text-white">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-center gap-6 mb-8">
                <span className="text-6xl sm:text-8xl animate-bounce">😂</span>
                <span className="text-6xl sm:text-8xl animate-bounce animation-delay-200">
                  🤣
                </span>
                <span className="text-6xl sm:text-8xl animate-bounce animation-delay-400">
                  😆
                </span>
              </div>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight drop-shadow-2xl">
                Random Jokes
              </h1>
              <p className="mt-6 text-2xl sm:text-4xl font-medium opacity-90">
                Get ready to laugh out loud! 🎉
              </p>
            </div>
          </div>
        </section>

        {/* Main Joke Card */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-5xl">
            {/* <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-white/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 via-pink-200/20 to-orange-200/20 rounded-3xl"></div>

              <div className="absolute top-4 left-4 text-6xl opacity-20 pointer-events-none">
                😄
              </div>
              <div className="absolute bottom-4 right-4 text-6xl opacity-20 pointer-events-none">
                🎉
              </div>

              <div className="relative p-8 sm:p-12 lg:p-20 text-center space-y-12">
                <div
                  className={`inline-block transition-all duration-800 ease-out ${
                    isLaughing ? "scale-115 rotate-3 drop-shadow-2xl" : ""
                  }`}
                >
                  <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-relaxed text-gray-800">
                    {currentJoke}
                  </p>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  <button
                    onClick={getRandomJoke}
                    className="group relative px-6 py-5 sm:px-8 sm:py-8 text-lg sm:text-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-600/50 active:scale-95 transition-all duration-300 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-700 origin-center rounded-full"></span>
                    <span className="relative flex items-center justify-center gap-3">
                      🎲 Another One!
                      <span className="group-hover:translate-x-3 transition-transform duration-300">
                        →
                      </span>
                    </span>
                  </button>

                  <button
                    onClick={handleLaugh}
                    className={`relative px-6 py-5 sm:px-8 sm:py-8 text-lg sm:text-2xl font-bold rounded-2xl shadow-xl overflow-hidden transition-all duration-700 ${
                      isLaughing
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 scale-110 rotate-6 shadow-2xl shadow-yellow-500/60"
                        : "bg-gradient-to-r from-yellow-400 to-amber-500 text-purple-800 hover:scale-105 active:scale-95"
                    }`}
                  >
                    <span className="relative flex items-center justify-center gap-3">
                      🤣 HAHAHA!
                      {isLaughing && (
                        <span className="absolute text-3xl animate-spin">
                          🎊
                        </span>
                      )}
                    </span>
                  </button>

                  <button
                    onClick={handleSave}
                    className={`relative px-6 py-5 sm:px-8 sm:py-8 text-lg sm:text-2xl font-bold text-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ${
                      isSaving
                        ? "bg-gradient-to-r from-emerald-500 to-green-600 scale-105 shadow-green-500/60"
                        : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:scale-105 active:scale-95"
                    }`}
                  >
                    <span className="relative flex items-center justify-center gap-3">
                      {isSaving ? "Saved! ✓" : "💾 Save Joke"}
                    </span>
                  </button>

                  <button
                    onClick={handleShare}
                    className={`relative px-6 py-5 sm:px-8 sm:py-8 text-lg sm:text-2xl font-bold text-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ${
                      isSharing
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 scale-105 shadow-blue-500/60"
                        : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 active:scale-95"
                    }`}
                  >
                    <span className="relative flex items-center justify-center gap-3">
                      {isSharing ? "Sharing! 🚀" : "📤 Share"}
                    </span>
                  </button>
                </div>

                <p className="text-lg sm:text-xl text-gray-600 font-medium">
                  Keep clicking for more laughs – we have tons! 😄
                </p>
              </div>
            </div> */}
            <JokeCard joke={currentJoke} onNext={getRandomJoke} />;
            {/* Fun Badge */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-md px-8 py-5 rounded-full shadow-2xl border-4 border-purple-300">
                <span className="text-3xl">🔥</span>
                <p className="text-xl sm:text-2xl font-bold text-purple-700">
                  {jokes.length}+ Jokes & Growing!
                </p>
                <span className="text-3xl">🎉</span>
              </div>
            </div>
          </div>
        </section>

        {/* Back Button */}
        <div className="text-center pb-16">
          <Link href="/">
            <button className="px-10 py-5 text-xl sm:text-2xl font-bold text-purple-600 bg-white rounded-full shadow-2xl hover:shadow-purple-400/50 hover:scale-105 active:scale-95 transition-all duration-300">
              ← More Fun Awaits!
            </button>
          </Link>
        </div>

        {/* Ad */}
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl w-full h-32 flex items-center justify-center text-gray-500 font-semibold shadow-inner">
            [AdSense Leaderboard 728×90]
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 12s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}
