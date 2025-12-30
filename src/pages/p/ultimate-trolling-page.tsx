import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function TrollPage() {
  const [clickCount, setClickCount] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ top: 50, left: 50 });
  const [message, setMessage] = useState("");
  const [showRick, setShowRick] = useState(false);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (clickCount >= 10 && clickCount < 20) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMessage("😂 Keep trying! You're never gonna get it!");
    } else if (clickCount >= 20 && clickCount < 30) {
      setMessage("🤡 Wow, you're really committed to this...");
    } else if (clickCount >= 30 && clickCount < 40) {
      setMessage("😭 Are you okay? This button hates you.");
    } else if (clickCount >= 40) {
      setMessage("🎉 FINE! You win... or did you?");
      setTimeout(() => setShowRick(true), 1000);
    }
  }, [clickCount]);

  const handleButtonHover = () => {
    if (clickCount < 40) {
      const newTop = Math.random() * 70 + 15;
      const newLeft = Math.random() * 70 + 15;
      setButtonPosition({ top: newTop, left: newLeft });
      setClickCount(prev => prev + 1);
    }
  };

  const handleRealClick = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  return (
    <>
      <Head>
        <title>You Won&apos;t Believe This Button - Click It NOW!</title>
        <meta
          name="description"
          content="One click could change your life forever... or not. Try your luck!"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-purple-100">
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center gap-1.5">
                <span className="text-3xl">🎯</span>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  I&apos;m Bored Now
                </h1>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Troll Content */}
        <div className="relative container mx-auto px-4 py-20 sm:py-32 text-center">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 animate-pulse">
            🚨 CLICK THE BUTTON BELOW 🚨
          </h1>
          <p className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">
            Win $1,000,000 Instantly! 💰
          </p>
          <p className="text-xl sm:text-3xl text-purple-600 font-semibold mb-12">
            (No scam, totally real, trust me bro)
          </p>

          {/* Moving Button */}
          <div className="relative h-96 flex items-center justify-center">
            <button
              onMouseEnter={handleButtonHover}
              onClick={() => setClickCount(prev => prev + 1)}
              style={{
                position: "absolute",
                top: `${buttonPosition.top}%`,
                left: `${buttonPosition.left}%`,
                transform: "translate(-50%, -50%)",
              }}
              className="px-12 py-8 text-3xl font-black bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-125 hover:rotate-12 cursor-pointer z-10"
            >
              🤑 CLICK ME NOW! 🤑
            </button>
          </div>

          {/* Message */}
          {message && (
            <div className="mt-12">
              <p className="text-3xl sm:text-5xl font-black text-red-600 animate-bounce">
                {message}
              </p>
              <p className="text-xl text-gray-600 mt-4">
                Clicks so far: <span className="font-bold text-purple-600">{clickCount}</span>
              </p>
            </div>
          )}

          {/* Hidden Real Button */}
          {clickCount >= 40 && !showRick && (
            <div className="mt-20">
              <p className="text-2xl text-gray-700 mb-8">Okay okay... here&apos;s the real one:</p>
              <button
                onClick={handleRealClick}
                className="px-16 py-10 text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-2xl hover:shadow-orange-500/60 hover:scale-110 transition-all duration-500 animate-pulse"
              >
                🎉 CLAIM YOUR PRIZE! 🎉
              </button>
              {confetti && (
                <div className="fixed inset-0 pointer-events-none z-50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl animate-spin">🎊</span>
                    <span className="text-8xl animate-spin animation-delay-200">🎉</span>
                    <span className="text-8xl animate-spin animation-delay-400">🥳</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Rick Roll Surprise */}
        {showRick && (
          <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-6xl sm:text-8xl font-black mb-8 animate-pulse">
                🎤 NEVER GONNA GIVE YOU UP! 🎤
              </h1>
              <p className="text-3xl mb-12">You got trolled HARD 😂😂😂</p>
              <div className="text-8xl mb-8">🕺💃</div>
              <p className="text-2xl">Now dance!</p>
              <div className="mt-12">
                <Link
                  href="/"
                  className="px-10 py-6 text-2xl font-bold bg-purple-600 rounded-full hover:bg-pink-600 transition-all hover:scale-110"
                >
                  Escape While You Can →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Fake Timer */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-8 py-4 rounded-full text-2xl font-black shadow-2xl animate-pulse">
          Offer expires in: 00:05
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white py-6">
          <div className="container mx-auto text-center">
            <p className="text-sm opacity-75">
              © 2025 TotallyNotAScam.com | 100% Legit | Terms apply* (in another dimension)
            </p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes animation-delay-200 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes animation-delay-400 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animation-delay-200 {
          animation: animation-delay-200 2s linear infinite;
        }
        .animation-delay-400 {
          animation: animation-delay-400 2s linear infinite;
        }
      `}</style>
    </>
  );
}