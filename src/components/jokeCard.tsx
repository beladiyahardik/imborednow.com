import React, { useState, useEffect } from "react";

/* Custom SVGs remain lightweight */
const IconLaugh = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);
const IconBookmark = ({ filled }: { filled?: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);
const IconShare = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export interface JokeCardProps {
  joke: string;
  onNext?: () => void;
}

const JokeCard: React.FC<JokeCardProps> = ({ joke, onNext }) => {
  const [isLaughing, setIsLaughing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Reset saved state when a new joke appears
  useEffect(() => {
    setIsSaved(false);
  }, [joke]);

  const handleLaugh = () => {
    setIsLaughing(true);
    setTimeout(() => setIsLaughing(false), 800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-2">
      <div className="relative group">
        {/* Dynamic Glow: Purple/Pink/Orange mix */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-[2rem] blur-md opacity-20 group-hover:opacity-40 transition duration-700"></div>

        <div className="relative bg-white border border-gray-100 rounded-[2rem] shadow-xl overflow-hidden">
          <div className="p-6 sm:p-10">
            {/* JOKE CONTENT AREA WITH ENTRY ANIMATION */}
            <div
              key={joke} // Crucial: Triggers animation when joke text changes
              className="min-h-[120px] sm:min-h-[150px] flex items-center justify-center animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500 ease-out"
            >
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-black text-center leading-tight text-gray-800 transition-transform ${
                  isLaughing ? "scale-110" : ""
                }`}
              >
                {joke}
              </h2>
            </div>

            {/* INTERACTION AREA */}
            <div className="w-full pt-6 mt-4 border-t border-gray-50 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
              {/* Secondary Actions */}
              <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-full border border-slate-200/50">
                <button
                  onClick={handleLaugh}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isLaughing
                      ? "bg-yellow-400 text-white shadow-lg scale-110"
                      : "hover:bg-white text-gray-400 hover:text-purple-600"
                  }`}
                >
                  <div className={isLaughing ? "animate-bounce" : ""}>
                    <IconLaugh />
                  </div>
                </button>

                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isSaved
                      ? "bg-pink-500 text-white shadow-lg scale-110"
                      : "hover:bg-white text-gray-400 hover:text-pink-500"
                  }`}
                >
                  <IconBookmark filled={isSaved} />
                </button>

                <button
                  onClick={() =>
                    navigator.share && navigator.share({ text: joke })
                  }
                  className="p-3 rounded-full hover:bg-white text-gray-400 hover:text-blue-500 transition-all"
                >
                  <IconShare />
                </button>
              </div>

              {/* ENHANCED NEXT JOKE BUTTON */}
              {onNext && (
                <button
                  onClick={onNext}
                  className="relative overflow-hidden group/btn w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-gray-900 text-white rounded-full font-bold text-lg transition-all duration-300 hover:pr-12 active:scale-95 shadow-lg hover:shadow-purple-500/20"
                >
                  {/* Background Hover Slide */}
                  <span className="absolute inset-0 w-0 bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300 ease-out group-hover/btn:w-full"></span>

                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-2">
                    Next Joke
                    <span className="text-xl group-hover/btn:rotate-12 transition-transform">
                      🎲
                    </span>
                  </span>

                  {/* Arrow that appears on hover */}
                  <span className="absolute right-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all duration-300">
                    →
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes zoom-in {
          from {
            transform: scale(0.95);
          }
          to {
            transform: scale(1);
          }
        }
        @keyframes slide-in-bottom {
          from {
            transform: translateY(10px);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: fade-in 0.5s ease-out, zoom-in 0.5s ease-out,
            slide-in-bottom 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default JokeCard;
