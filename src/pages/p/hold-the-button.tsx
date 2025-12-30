'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import Confetti from "react-confetti"; // npm install react-confetti

export default function HoldTheButtonGame() {
  const [isPressed, setIsPressed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("game");
  const [showConfetti, setShowConfetti] = useState(false);
  const [milestone, setMilestone] = useState("");
  const [shake, setShake] = useState(false);
  const intervalRef = useRef<any>(null);
  const canvasRef = useRef(null);

  const milestones = [
    { time: 10, label: "Bronze 🥉", color: "from-orange-500" },
    { time: 30, label: "Silver 🥈", color: "from-blue-500" },
    { time: 60, label: "Gold 🥇", color: "from-yellow-400" },
    { time: 120, label: "Legendary 👑", color: "from-purple-500" },
  ];

  const initialLeaderboard = [
    { name: "Alex 🔥", time: 312, emoji: "🔥" },
    { name: "Sarah 🏆", time: 245, emoji: "🏆" },
    { name: "Mike 🤖", time: 189, emoji: "🤖" },
    { name: "Emma 💪", time: 156, emoji: "💪" },
    { name: "John 👑", time: 98, emoji: "👑" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("holdButtonLeaderboard");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLeaderboard(saved ? JSON.parse(saved) : initialLeaderboard);
  }, []);

  const startTimer = useCallback(() => {
    setIsPressed(true);
    setCurrentTime(0);
    setMilestone("");
    setShake(false);

    intervalRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        const newTime = prev + 1;
        // Check milestones
        const currentMilestone = milestones.find(m => newTime === m.time);
        if (currentMilestone) {
          setMilestone(currentMilestone.label);
          // Trigger confetti for milestone
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
        // Shake after 60s
        if (newTime >= 60) setShake(true);
        return newTime;
      });
    }, 1000);
  }, []);

  const formatTime = (seconds: any) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const stopTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPressed(false);
    setShake(false);

    if (currentTime > 30) {
      const name = prompt(`Incredible! 💥 You held for ${formatTime(currentTime)}!\nEnter your name:`);
      if (name?.trim()) {
        const newEntry = { name: name.trim(), time: currentTime, emoji: "⭐" };
        const updated = [...leaderboard, newEntry]
          .sort((a, b) => b.time - a.time)
          .slice(0, 10);
        setLeaderboard(updated);
        localStorage.setItem("holdButtonLeaderboard", JSON.stringify(updated));
        if (currentTime > leaderboard[0]?.time) setShowConfetti(true);
      }
    }
    setCurrentTime(0);
  }, [currentTime, leaderboard]);

  // Handle mouse/touch events properly for mobile/desktop
  const handlePress = useCallback((e: any) => {
    e.preventDefault();
    startTimer();
  }, [startTimer]);

  const handleRelease = useCallback((e: any) => {
    e.preventDefault();
    stopTimer();
  }, [stopTimer]);

  return (
    <>
      <Head>
        <title>Hold The Button Challenge - Beat the Record! 💪</title>
      </Head>

      <div className={`min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 relative overflow-hidden ${shake ? 'animate-shake' : ''}`}>
        {/* Animated Background Particles */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 animate-pulse" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-bounce" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-bounce animation-delay-1000" />
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-yellow-400/30 rounded-full blur-xl animate-ping" />
        </div>

        {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />}

        {/* Header */}
        <header className="bg-white/90 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b border-purple-200">
          <div className="container mx-auto px-4 sm:px-6 py-6">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-4xl">🎯</span>
                <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Hold The Button
                </h1>
              </Link>
            </div>
          </div>
        </header>

        {/* Fancy Tabs */}
        <div className="bg-white/80 backdrop-blur-xl shadow-xl mx-4 sm:mx-8 mb-8 rounded-3xl border border-purple-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("game")}
              className={`flex-1 py-6 px-8 text-xl font-black transition-all duration-300 relative ${activeTab === "game"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-purple-600"
                }`}
            >
              🎮 Challenge
              {activeTab === "game" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`flex-1 py-6 px-8 text-xl font-black transition-all duration-300 relative ${activeTab === "leaderboard"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-purple-600"
                }`}
            >
              🏆 Legends
              {activeTab === "leaderboard" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse rounded-t-full" />
              )}
            </button>
          </div>
        </div>

        {/* Game Tab */}
        {activeTab === "game" && (
          <section className="py-12 sm:py-24 relative z-10">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-6xl sm:text-8xl font-black mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent animate-pulse">
                HOLD IT DOWN!
              </h1>
              <p className="text-2xl sm:text-4xl font-bold text-gray-800 mb-16 max-w-4xl mx-auto leading-relaxed">
                Press & hold the button. Beat your limits. Claim glory! <br />
                <span className="text-purple-600 animate-pulse">30s+ = Leaderboard Fame</span>
              </p>

              {/* Animated Timer */}
              <div className="mb-20">
                <div className="text-9xl sm:text-10xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-8 animate-bounce-slow">
                  {formatTime(currentTime)}
                </div>
                {milestone && (
                  <div className="text-4xl font-bold bg-white/80 px-8 py-4 rounded-full shadow-2xl mx-auto max-w-md animate-pop">
                    {milestone} 🎉
                  </div>
                )}
                <p className="text-3xl text-gray-600 mt-8">
                  {isPressed ? "💥 You're crushing it!" : "Click to start..."}
                </p>
              </div>

              {/* Ultra-Realistic 3D Button */}
              <div className="relative inline-block perspective-1000" style={{ perspective: '1000px' }}>
                {/* Outer Ring / Bezel */}
                <div className="absolute -inset-4 bg-gradient-to-br from-gray-300 to-gray-500 rounded-3xl shadow-2xl shadow-gray-400/50 rotate-x-10" />

                {/* Side Shadows */}
                <div className={`absolute inset-0 rounded-3xl shadow-[4px_4px_12px_rgba(0,0,0,0.3), inset_-4px_-4px_8px_rgba(255,255,255,0.4)] transition-all duration-200 ${isPressed ? 'shadow-[2px_2px_6px_rgba(0,0,0,0.5), inset_-2px_-2px_12px_rgba(255,255,255,0.2)]' : ''
                  }`} />

                {/* Button Face */}
                <button
                  onMouseDown={handlePress}
                  onMouseUp={handleRelease}
                  onMouseLeave={handleRelease}
                  onTouchStart={handlePress}
                  onTouchEnd={handleRelease}
                  onTouchCancel={handleRelease}
                  className={`relative block w-72 h-72 sm:w-96 sm:h-96 rounded-3xl font-black text-5xl sm:text-7xl transition-all duration-150 ease-out overflow-hidden group ${isPressed
                      ? 'translate-y-4 scale-95 shadow-[0_8px_32px_rgba(239,68,68,0.6)] rotate-x-20'
                      : 'shadow-[0_20px_40px_rgba(0,0,0,0.3), 0_10px_20px_rgba(239,68,68,0.4)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.4), 0_15px_30px_rgba(239,68,68,0.6)] hover:-translate-y-2 hover:rotate-x-5'
                    }`}
                  style={{
                    background: isPressed
                      ? 'radial-gradient(circle at 30% 30%, #ef4444 0%, #dc2626 50%, #b91c1c 100%)'
                      : 'radial-gradient(circle at 30% 30%, #f87171 0%, #ef4444 30%, #dc2626 70%, #b91c1c 100%)',
                  }}
                >
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl group-hover:animate-shine" />

                  {/* Pressed Inner Glow */}
                  {isPressed && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/50 via-orange-400/30 to-red-500/20 rounded-3xl animate-pulse-fast" />
                  )}

                  {/* Text */}
                  <span className={`relative z-10 transition-all duration-200 ${isPressed ? 'text-white drop-shadow-lg' : 'text-white/90 drop-shadow-2xl'}`}>
                    {isPressed ? "KEEP HOLDING!" : "PRESS & HOLD"}
                  </span>
                </button>

                {/* Bottom Shadow */}
                <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-gradient-to-t from-black/40 to-transparent rounded-full blur-xl transition-all ${isPressed ? 'scale-x-110 opacity-70' : 'opacity-50'
                  }`} />
              </div>

              {/* Progress Bar */}
              <div className="mt-20 max-w-2xl mx-auto">
                <div className="w-full bg-gray-200 rounded-full h-6 shadow-inner overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg transition-all duration-1000 ease-out rounded-full relative overflow-hidden`}
                    style={{ width: `${Math.min((currentTime / 300) * 100, 100)}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                  </div>
                </div>
                <p className="text-xl text-gray-500 mt-2">Progress to Legend (5 min)</p>
              </div>
            </div>
          </section>
        )}

        {/* Leaderboard Tab - Enhanced */}
        {activeTab === "leaderboard" && (
          <section className="py-20 bg-white/40 backdrop-blur-2xl">
            <div className="container mx-auto px-6">
              <h2 className="text-6xl font-black text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Eternal Champions 🏆
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-4xl mx-auto">
                {leaderboard.map((entry: any, index) => (
                  <div
                    key={index}
                    className={`group relative p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer hover:-translate-y-4 border-4 ${index === 0
                        ? 'border-yellow-400 bg-gradient-to-br from-yellow-400 to-orange-500 text-gray-900'
                        : index === 1
                          ? 'border-gray-400 bg-gradient-to-br from-gray-300 to-gray-500'
                          : index === 2
                            ? 'border-orange-400 bg-gradient-to-br from-orange-500 to-red-500'
                            : 'border-purple-200 bg-white/80 hover:border-purple-300'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-8">
                        <div className="text-8xl font-black drop-shadow-2xl">
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                        </div>
                        <div>
                          <h3 className="text-4xl font-black drop-shadow-lg mb-2">{entry.name}</h3>
                          <div className="text-3xl font-mono bg-black/20 px-6 py-3 rounded-full inline-block">
                            {formatTime(entry.time)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl opacity-80">{formatDistanceToNow(new Date(entry.date), { addSuffix: true })}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="bg-gradient-to-t from-gray-900/50 to-transparent text-white py-12 relative z-10">
          <div className="container mx-auto px-6 text-center">
            <Link href="/" className="flex justify-center items-center gap-3 mb-6 group">
              <span className="text-4xl group-hover:scale-110 transition-transform">🎯</span>
              <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                I&apos;m Bored Now
              </span>
            </Link>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Grip tight. Hold longer. Become legend. 💥
            </p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.5s infinite; }
        @keyframes bounce-slow { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }
        .animate-bounce-slow { animation: bounce-slow 2s infinite; }
        @keyframes pop { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
        .animate-pop { animation: pop 0.6s ease-out; }
        @keyframes shine { 0% { transform: translateX(-100%) skewX(-15deg); } 100% { transform: translateX(300%) skewX(-15deg); } }
        .animate-shine { animation: shine 2s infinite; }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-shimmer { animation: shimmer 2s infinite linear; }
        @keyframes pulse-fast { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        .animate-pulse-fast { animation: pulse-fast 0.5s infinite; }
        .perspective-1000 * { perspective: 1000px; }
        .rotate-x-5 { transform: rotateX(5deg); }
        .rotate-x-10 { transform: rotateX(10deg); }
        .rotate-x-20 { transform: rotateX(20deg); }
      `}</style>
    </>
  );
}