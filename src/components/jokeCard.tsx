import React, { useState } from "react";

/* =======================
   Types
======================= */
export interface JokeCardProps {
  joke: string;
  onNext?: () => void; // optional for reuse
}

/* =======================
   Component
======================= */
const JokeCard: React.FC<JokeCardProps> = ({ joke, onNext }) => {
  const [isLaughing, setIsLaughing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleLaugh = () => {
    setIsLaughing(true);
    setTimeout(() => setIsLaughing(false), 1000);
  };

  const handleSave = () => {
    setIsSaving(true);
    navigator.clipboard.writeText(joke);
    setTimeout(() => setIsSaving(false), 1200);
  };

  const handleShare = async () => {
    setIsSharing(true);

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Hilarious Joke from I'm Bored Now! 😂",
          text: joke,
        });
      } catch {
        navigator.clipboard.writeText(joke);
        alert("Joke copied to clipboard! 😄");
      }
    } else {
      navigator.clipboard.writeText(joke);
      alert("Joke copied! Spread the laughter! 😂");
    }

    setTimeout(() => setIsSharing(false), 1200);
  };

  return (
    <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-white/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 via-pink-200/20 to-orange-200/20 rounded-3xl" />

      <div className="absolute top-4 left-4 text-6xl opacity-20 pointer-events-none">
        😄
      </div>
      <div className="absolute bottom-4 right-4 text-6xl opacity-20 pointer-events-none">
        🎉
      </div>

      <div className="relative p-8 sm:p-12 lg:p-20 text-center space-y-12">
        {/* Joke Text */}
        <div
          className={`inline-block transition-all duration-700 ease-out ${
            isLaughing ? "scale-115 rotate-3 drop-shadow-2xl" : ""
          }`}
        >
          <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-relaxed text-gray-800">
            {joke}
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {/* Next Joke (Optional) */}
          {onNext && (
            <button
              onClick={onNext}
              className="px-6 py-5 sm:px-8 sm:py-8 text-lg sm:text-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              🎲 Another One!
            </button>
          )}

          {/* Laugh */}
          <button
            onClick={handleLaugh}
            className={`px-6 py-5 sm:px-8 sm:py-8 text-lg sm:text-2xl font-bold rounded-2xl shadow-xl transition-all duration-700 ${
              isLaughing
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 scale-110 rotate-6"
                : "bg-gradient-to-r from-yellow-400 to-amber-500 hover:scale-105"
            }`}
          >
            🤣 HAHAHA!
          </button>

          {/* Save */}
          <button
            onClick={handleSave}
            className={`px-6 py-5 sm:px-8 sm:py-8 text-lg sm:text-2xl font-bold text-white rounded-2xl shadow-xl transition-all duration-500 ${
              isSaving
                ? "bg-gradient-to-r from-emerald-500 to-green-600 scale-105"
                : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:scale-105"
            }`}
          >
            {isSaving ? "Saved! ✓" : "💾 Save"}
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className={`px-6 py-5 sm:px-8 sm:py-8 text-lg sm:text-2xl font-bold text-white rounded-2xl shadow-xl transition-all duration-500 ${
              isSharing
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 scale-105"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105"
            }`}
          >
            {isSharing ? "Sharing! 🚀" : "📤 Share"}
          </button>
        </div>

        <p className="text-lg sm:text-xl text-gray-600 font-medium">
          Keep clicking for more laughs 😄
        </p>
      </div>
    </div>
  );
};

export default JokeCard;
