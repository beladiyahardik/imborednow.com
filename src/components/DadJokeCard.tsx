import React, { useState, useEffect } from "react";

const DadJokeCard = ({
  currentJoke,
  onNext,
}: {
  currentJoke: { q: string; a: string };
  onNext: () => void;
}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(false);
  }, [currentJoke]);

  const getButtonText = (question: string) => {
    const firstWord = question.split(" ")[0].replace(/[^a-zA-Z]/g, "");
    const triggers = ["How", "Why", "What", "Who", "Where", "When"];
    return triggers.includes(firstWord) ? `${firstWord}?` : "What?";
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-2">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-[1.5rem] md:rounded-[2rem] blur opacity-10"></div>

        <div className="relative bg-white border-[3px] md:border-[5px] border-amber-400 rounded-[1.5rem] md:rounded-[2.5rem] shadow-lg overflow-hidden">
          {/* Top Label - Slimmer */}
          <div className="bg-amber-400 py-1 text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-900 opacity-60">
              Dad Joke Mode
            </span>
          </div>

          <div className="p-4 md:p-10 text-center">
            {/* SETUP - No fixed min-height for tighter fit */}
            <div className="mb-4">
              <h2 className="text-lg sm:text-2xl md:text-4xl font-black text-gray-800 leading-tight">
                {currentJoke.q}
              </h2>
            </div>

            {/* ACTION AREA - Padding heavily reduced */}
            <div className="flex flex-col items-center justify-center">
              {!showAnswer ? (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="px-6 py-2 md:px-10 md:py-3.5 bg-gradient-to-br from-blue-600 to-purple-700 text-white text-base md:text-xl font-black rounded-full shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>{getButtonText(currentJoke.q)}</span>
                  <span className="text-lg md:text-2xl">🧐</span>
                </button>
              ) : (
                <div className="w-full animate-pop-in">
                  <p className="text-xl sm:text-3xl md:text-5xl font-black text-emerald-600 leading-tight mb-4 md:mb-6">
                    {currentJoke.a}
                  </p>

                  <button
                    onClick={onNext}
                    className="mx-auto flex items-center gap-2 px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm md:text-lg font-black rounded-full shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    Next Joke 🎉
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pop-in {
          0% {
            opacity: 0;
            transform: scale(0.98) translateY(4px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-pop-in {
          animation: pop-in 0.25s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DadJokeCard;
