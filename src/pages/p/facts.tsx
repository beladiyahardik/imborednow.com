import { useState, useEffect } from "react";

// Custom SVG Icons
const Icons = {
  Heart: ({
    className = "",
    filled = false,
  }: {
    className?: string;
    filled?: boolean;
  }) => (
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
  Bookmark: ({
    className = "",
    filled = false,
  }: {
    className?: string;
    filled?: boolean;
  }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  Share: ({ className = "" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3"></circle>
      <circle cx="6" cy="12" r="3"></circle>
      <circle cx="18" cy="19" r="3"></circle>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
  ),
  Refresh: ({ className = "" }: { className?: string }) => (
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
  TrendingUp: ({ className = "" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  ),
  Sparkles: ({ className = "" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
      <path d="M5 3v4"></path>
      <path d="M19 17v4"></path>
      <path d="M3 5h4"></path>
      <path d="M17 19h4"></path>
    </svg>
  ),
};

interface Fact {
  id: number;
  text: string;
  category: string;
  likes?: number;
}

const factsData: Record<string, Fact[]> = {
  all: [
    {
      id: 1,
      text: "Octopuses have three hearts and blue blood! 🐙",
      category: "animals",
      likes: 142,
    },
    {
      id: 2,
      text: "A day on Venus is longer than its year. 🌌",
      category: "space",
      likes: 98,
    },
    {
      id: 3,
      text: "Honey never spoils – archaeologists found edible honey in ancient Egyptian tombs! 🍯",
      category: "food",
      likes: 256,
    },
    {
      id: 4,
      text: "The unicorn is the national animal of Scotland. 🦄",
      category: "history",
      likes: 189,
    },
    {
      id: 5,
      text: "Bananas are berries, but strawberries aren't! 🍌",
      category: "food",
      likes: 321,
    },
    {
      id: 6,
      text: "Wombats poop cubes. Yes, really! 🐻",
      category: "animals",
      likes: 402,
    },
    {
      id: 7,
      text: "There are more stars in the universe than grains of sand on all Earth's beaches. ✨",
      category: "space",
      likes: 178,
    },
    {
      id: 8,
      text: "A flock of crows is called a murder. 🐦",
      category: "animals",
      likes: 134,
    },
    {
      id: 9,
      text: "The Eiffel Tower grows up to 15 cm taller in summer due to heat expansion! 🗼",
      category: "science",
      likes: 267,
    },
    {
      id: 10,
      text: "Sharks existed before trees. 🦈🌳",
      category: "history",
      likes: 445,
    },
    {
      id: 11,
      text: "A group of flamingos is called a 'flamboyance'. 🦩",
      category: "animals",
      likes: 198,
    },
    {
      id: 12,
      text: "The shortest war in history lasted 38 minutes. ⚔️",
      category: "history",
      likes: 156,
    },
  ],
  animals: [
    {
      id: 1,
      text: "Octopuses have three hearts and blue blood! 🐙",
      category: "animals",
      likes: 142,
    },
    {
      id: 6,
      text: "Wombats poop cubes. Yes, really! 🐻",
      category: "animals",
      likes: 402,
    },
    {
      id: 8,
      text: "A flock of crows is called a murder. 🐦",
      category: "animals",
      likes: 134,
    },
    {
      id: 11,
      text: "A group of flamingos is called a 'flamboyance'. 🦩",
      category: "animals",
      likes: 198,
    },
  ],
  space: [
    {
      id: 2,
      text: "A day on Venus is longer than its year. 🌌",
      category: "space",
      likes: 98,
    },
    {
      id: 7,
      text: "There are more stars in the universe than grains of sand on all Earth's beaches. ✨",
      category: "space",
      likes: 178,
    },
  ],
  food: [
    {
      id: 3,
      text: "Honey never spoils – archaeologists found edible honey in ancient Egyptian tombs! 🍯",
      category: "food",
      likes: 256,
    },
    {
      id: 5,
      text: "Bananas are berries, but strawberries aren't! 🍌",
      category: "food",
      likes: 321,
    },
  ],
  history: [
    {
      id: 4,
      text: "The unicorn is the national animal of Scotland. 🦄",
      category: "history",
      likes: 189,
    },
    {
      id: 10,
      text: "Sharks existed before trees. 🦈🌳",
      category: "history",
      likes: 445,
    },
    {
      id: 12,
      text: "The shortest war in history lasted 38 minutes. ⚔️",
      category: "history",
      likes: 156,
    },
  ],
  science: [
    {
      id: 9,
      text: "The Eiffel Tower grows up to 15 cm taller in summer due to heat expansion! 🗼",
      category: "science",
      likes: 267,
    },
  ],
};

const categories = [
  {
    name: "All",
    value: "all",
    emoji: "🌟",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Animals",
    value: "animals",
    emoji: "🦁",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    name: "Space",
    value: "space",
    emoji: "🚀",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    name: "Food",
    value: "food",
    emoji: "🍔",
    gradient: "from-orange-500 to-red-500",
  },
  {
    name: "History",
    value: "history",
    emoji: "📜",
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    name: "Science",
    value: "science",
    emoji: "🔬",
    gradient: "from-cyan-500 to-teal-500",
  },
];

export default function EnhancedFacts() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentFacts, setCurrentFacts] = useState(factsData.all);
  const [likedFacts, setLikedFacts] = useState<Set<number>>(new Set());
  const [savedFacts, setSavedFacts] = useState<Set<number>>(new Set());
  const [animatingFactId, setAnimatingFactId] = useState<number | null>(null);
  const [animationType, setAnimationType] = useState<
    "like" | "save" | "share" | null
  >(null);
  const [floatingHearts, setFloatingHearts] = useState<
    { id: string; cardId: number; x: number; y: number }[]
  >([]);
  const [factsViewed, setFactsViewed] = useState(0);
  const [randomFact, setRandomFact] = useState<Fact | null>(null);

  useEffect(() => {
    setFactsViewed((prev) => prev + currentFacts.length);
  }, [currentFacts]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentFacts(factsData[category]);
  };

  const createFloatingHeart = (e: React.MouseEvent, cardId: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // eslint-disable-next-line react-hooks/purity
    const id = `heart-${Date.now()}-${Math.random()}`;

    setFloatingHearts((prev) => [...prev, { id, cardId, x, y }]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1000);
  };

  const handleLike = (factId: number, e: React.MouseEvent) => {
    createFloatingHeart(e, factId);
    setLikedFacts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(factId)) {
        newSet.delete(factId);
      } else {
        newSet.add(factId);
      }
      return newSet;
    });
    setAnimatingFactId(factId);
    setAnimationType("like");
    setTimeout(() => {
    //   if (animatingFactId === factId && animationType === "like") {
        setAnimatingFactId(null);
        setAnimationType(null);
    //   }
    }, 600);
  };

  const handleSave = (factId: number, factText: string) => {
    setSavedFacts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(factId)) {
        newSet.delete(factId);
      } else {
        newSet.add(factId);
      }
      return newSet;
    });
    navigator.clipboard.writeText(factText);
    setAnimatingFactId(factId);
    setAnimationType("save");
    setTimeout(() => {
    //   if (animatingFactId === factId && animationType === "save") {
        setAnimatingFactId(null);
        setAnimationType(null);
    //   }
    }, 1000);
  };

  const handleShare = async (factId: number, factText: string) => {
    setAnimatingFactId(factId);
    setAnimationType("share");
    if (navigator.share) {
      try {
        await navigator.share({ title: "Amazing Fact!", text: factText });
      } catch (err) {
        navigator.clipboard.writeText(factText);
      }
    } else {
      navigator.clipboard.writeText(factText);
    }
    setTimeout(() => {
      if (animatingFactId === factId && animationType === "share") {
        setAnimatingFactId(null);
        setAnimationType(null);
      }
    }, 1000);
  };

  const handleRandomFact = () => {
    const allFacts = factsData.all;
    const random = allFacts[Math.floor(Math.random() * allFacts.length)];
    setRandomFact(random);
    setTimeout(() => setRandomFact(null), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Fixed Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Hero Section - Fixed Gradient */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-95"></div>

        <div className="relative container mx-auto px-6 text-center text-white">
          <div className="flex justify-center gap-4 mb-6">
            {["🧠", "💡", "🤯", "✨"].map((emoji, i) => (
              <span
                key={i}
                className="text-5xl sm:text-7xl animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold mb-4 drop-shadow-2xl">
            Amazing Facts
          </h1>

          <p className="text-xl sm:text-2xl mb-8 opacity-90">
            Mind-blowing truths that will surprise you!
          </p>

          {/* Stats Bar */}
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3">
              <div className="flex items-center gap-2">
                <Icons.TrendingUp className="w-5 h-5" />
                <span className="font-bold">{factsViewed} Facts Viewed</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3">
              <div className="flex items-center gap-2">
                <Icons.Heart className="w-5 h-5" filled />
                <span className="font-bold">{likedFacts.size} Liked</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3">
              <div className="flex items-center gap-2">
                <Icons.Bookmark className="w-5 h-5" filled />
                <span className="font-bold">{savedFacts.size} Saved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Random Fact Banner */}
      {randomFact && (
        <div className="container mx-auto px-6 mb-8">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-2xl p-6 shadow-2xl animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-white font-bold text-lg sm:text-xl">
                  {randomFact.text}
                </p>
              </div>
              <Icons.Sparkles className="w-8 h-8 text-white ml-4" />
            </div>
          </div>
        </div>
      )}

      {/* Category Pills */}
      <section className="py-6 sm:py-8 px-3 sm:px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`group relative px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-bold rounded-full transition-all duration-300 overflow-hidden ${
                  selectedCategory === cat.value
                    ? "scale-105 sm:scale-110 shadow-xl sm:shadow-2xl"
                    : "bg-white shadow-md sm:shadow-lg hover:shadow-xl hover:scale-105"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${
                    cat.gradient
                  } ${
                    selectedCategory === cat.value
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  } transition-opacity`}
                ></div>
                <div
                  className={`relative flex items-center gap-1 sm:gap-2 ${
                    selectedCategory === cat.value
                      ? "text-white"
                      : "text-gray-700 group-hover:text-white"
                  }`}
                >
                  <span className="text-xl sm:text-2xl">{cat.emoji}</span>
                  <span className="whitespace-nowrap">{cat.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Random Fact Button */}
          <div className="flex justify-center mt-4 sm:mt-6">
            <button
              onClick={handleRandomFact}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 sm:gap-3"
            >
              <Icons.Refresh className="w-4 h-4 sm:w-5 sm:h-5" />
              Random Fact!
            </button>
          </div>
        </div>
      </section>

      {/* Facts Grid */}
      <div className="container mx-auto px-6 pb-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentFacts.map((fact, index) => {
            const isLiked = likedFacts.has(fact.id);
            const isSaved = savedFacts.has(fact.id);
            const categoryData = categories.find(
              (c) => c.value === fact.category
            );
            const isAnimating = animatingFactId === fact.id;

            return (
              <div
                key={fact.id}
                className="group relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Border Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${categoryData?.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none`}
                ></div>
                <div className="absolute inset-[3px] bg-white rounded-3xl"></div>

                {/* Floating Hearts - Only for this card */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {floatingHearts
                    .filter((h) => h.cardId === fact.id)
                    .map((heart) => (
                      <div
                        key={heart.id}
                        className="absolute text-2xl animate-ping"
                        style={{
                          left: heart.x,
                          top: heart.y,
                          animation: "float-up 1s ease-out forwards",
                        }}
                      >
                        ❤️
                      </div>
                    ))}
                </div>

                {/* Content */}
                <div className="relative p-6">
                  {/* Category Badge */}
                  <div
                    className={`inline-flex items-center gap-2 bg-gradient-to-r ${categoryData?.gradient} text-white px-4 py-2 rounded-full text-sm font-bold mb-4`}
                  >
                    <span>{categoryData?.emoji}</span>
                    {fact.category.toUpperCase()}
                  </div>

                  {/* Fact Text */}
                  <p className="text-lg font-semibold text-gray-800 leading-relaxed mb-6 min-h-[80px]">
                    {fact.text}
                  </p>

                  {/* Like Count */}
                  <div className="flex items-center gap-2 mb-4 text-gray-600">
                    <Icons.Heart
                      className="w-4 h-4 fill-pink-400 text-pink-400"
                      filled
                    />
                    <span className="text-sm font-medium">
                      {fact.likes! + (isLiked ? 1 : 0)} people amazed
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleLike(fact.id, e)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all duration-300 ${
                        isLiked
                          ? "bg-gradient-to-r from-pink-500 to-red-500 text-white"
                          : "bg-pink-100 text-pink-600 hover:bg-pink-200"
                      } ${
                        isAnimating && animationType === "like"
                          ? "animate-bounce"
                          : ""
                      }`}
                    >
                      <Icons.Heart
                        className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`}
                        filled={isLiked}
                      />
                      {isLiked ? "Loved!" : "Love"}
                    </button>

                    <button
                      onClick={() => handleSave(fact.id, fact.text)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all duration-300 ${
                        isSaved
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                          : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                      } ${
                        isAnimating && animationType === "save"
                          ? "animate-bounce"
                          : ""
                      }`}
                    >
                      <Icons.Bookmark
                        className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`}
                        filled={isSaved}
                      />
                      {isSaved ? "Saved!" : "Save"}
                    </button>

                    <button
                      onClick={() => handleShare(fact.id, fact.text)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300 ${
                        isAnimating && animationType === "share"
                          ? "animate-bounce"
                          : ""
                      }`}
                    >
                      <Icons.Share className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-50px) scale(1.5);
          }
        }
      `}</style>
    </div>
  );
}
