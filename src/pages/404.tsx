import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

// --- CUSTOM ICONS ---
const Icons = {
  Heart: ({ className = "", filled = false }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  ),
  Refresh: ({ className = "" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
    </svg>
  ),
};

export default function Custom404() {
  const [isLoved, setIsLoved] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 font-sans overflow-hidden relative">
      <Head>
        <title>Lost in Space | imborednow</title>
      </Head>

      {/* --- ANIMATED BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[15%] text-4xl md:text-5xl animate-float-slow opacity-60">
          🛸
        </div>
        <div className="absolute top-[20%] right-[20%] text-3xl md:text-4xl animate-float-medium opacity-40">
          🌠
        </div>
        <div className="absolute bottom-[15%] left-[10%] text-5xl md:text-6xl animate-float-fast opacity-50">
          ❓
        </div>
        <div className="absolute bottom-[20%] right-[15%] text-4xl md:text-5xl animate-float-slow opacity-60">
          🪐
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-200/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      <main className="relative z-10 max-w-xl w-full text-center">
        {/* --- THE BIG ANIMATED 404 --- */}
        <div className="relative inline-block mb-10 md:mb-12 animate-entrance">
          <h1 className="text-[100px] md:text-[200px] font-black leading-none bg-clip-text text-transparent bg-gradient-to-b from-purple-600 via-pink-500 to-rose-400 drop-shadow-2xl select-none">
            404
          </h1>
          <div className="absolute -top-2 -right-4 md:-right-6 bg-yellow-400 text-slate-900 px-3 md:px-6 py-1 md:py-2 rounded-xl md:rounded-2xl font-black text-xs md:text-lg rotate-12 shadow-xl animate-wiggle">
            MISSING!
          </div>
        </div>

        {/* --- CONTENT CARD --- */}
        <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-white p-8 md:p-14 mb-10 animate-slide-up">
          <div className="mb-4 md:mb-6 inline-block p-3 md:p-4 bg-purple-50 rounded-2xl md:rounded-3xl animate-bounce-slight">
            <span className="text-3xl md:text-4xl">👨‍🚀</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight">
            Lost in the <span className="text-purple-600">Fact-ter-verse?</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed mb-8 md:mb-10">
            Even our smartest riddles couldn't find this page. It's either
            hiding or it went on a vacation!
          </p>

          <div className="space-y-4">
            {/* Main Action Button */}
            <Link href="/">
              <button className="w-full py-4 md:py-5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-[1.25rem] md:rounded-[1.5rem] font-black text-lg md:text-xl shadow-2xl shadow-purple-200 hover:scale-[1.03] active:scale-95 transition-all group">
                <span className="inline-block group-hover:-translate-x-1 transition-transform mr-2">
                  🚀
                </span>
                Take Me Home
              </button>
            </Link>

            {/* PASTEL UTILITY BUTTONS (Mobile Optimized Font) */}
            <div className="flex gap-3 md:gap-4 justify-center pt-4 md:pt-6">
              <button
                onClick={() => setIsLoved(!isLoved)}
                className="flex-1 flex items-center justify-center gap-2 px-3 md:px-4 py-3 md:py-4 bg-[#fce7f3] text-[#db2777] rounded-xl md:rounded-2xl font-bold text-xs md:text-base hover:brightness-95 transition-all active:scale-90"
              >
                <Icons.Heart
                  className={`w-4 h-4 md:w-6 md:h-6 transition-transform ${
                    isLoved ? "scale-125" : ""
                  }`}
                  filled={isLoved}
                />
                Love
              </button>

              <Link href="/random-jokes" className="flex-1">
                <button className="w-full flex items-center justify-center gap-2 px-3 md:px-4 py-3 md:py-4 bg-[#dbeafe] text-[#2563eb] rounded-xl md:rounded-2xl font-bold text-xs md:text-base hover:brightness-95 transition-all active:scale-90">
                  <Icons.Refresh className="w-4 h-4 md:w-6 md:h-6 group-hover:rotate-180 transition-transform duration-500" />
                  Free Joke
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="animate-fade-in delay-700">
          <Link
            href="/"
            className="text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] hover:text-purple-600 transition-all flex items-center justify-center gap-2 group"
          >
            <span className="group-hover:-translate-x-2 transition-transform">
              ←
            </span>
            Back to Safety
          </Link>
        </div>
      </main>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(12deg) scale(1);
          }
          50% {
            transform: rotate(15deg) scale(1.1);
          }
        }
        @keyframes entrance {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-slight {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float-slow {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float 3s ease-in-out infinite;
        }
        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }
        .animate-entrance {
          animation: entrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-slide-up {
          animation: slide-up 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s backwards;
        }
        .animate-bounce-slight {
          animation: bounce-slight 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
