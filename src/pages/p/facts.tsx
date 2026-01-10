import Head from "next/head";
import { useState } from "react";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [surpriseFact, setSurpriseFact] = useState<any | null>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentFacts(factsData[category]);
  };

  const handleLike = (factId: number) => {
    setLikedFacts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(factId)) newSet.delete(factId);
      else newSet.add(factId);
      return newSet;
    });
  };

  const triggerSurprise = () => {
    const allFacts = factsData.all;
    const random = allFacts[Math.floor(Math.random() * allFacts.length)];
    setSurpriseFact(random);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-purple-200 pb-20 relative">
      <Head>
        <title>Amazing Facts | imborednow</title>
      </Head>

      {/* --- 1. SURPRISE MODAL OVERLAY --- */}
      {surpriseFact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 right-0 p-6">
              <button
                onClick={() => setSurpriseFact(null)}
                className="text-slate-400 hover:text-slate-900 font-black text-xl"
              >
                ✕
              </button>
            </div>
            <div className="text-5xl mb-6">🎁</div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-600 mb-4">
              Random Surprise
            </h3>
            <p className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-8">
              {surpriseFact.text}
            </p>
            <button
              onClick={triggerSurprise}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-purple-600 transition-all active:scale-95"
            >
              Give Me Another! 🎲
            </button>
          </div>
        </div>
      )}

      {/* --- 2. HERO SECTION --- */}
      <section className="relative pt-16 pb-24 px-4 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-purple-600/40 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-xl rounded-full text-purple-300 text-[9px] font-black uppercase tracking-[0.3em] mb-6 border border-white/10">
            🧠 Mind-Blowing Knowledge
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-4 tracking-tighter leading-[0.9]">
            FACTS THAT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 uppercase">
              Feel Unreal.
            </span>
          </h1>
        </div>
      </section>

      {/* --- 2. COMPACT CATEGORY HUB (Scrollable on Mobile & Tablet) --- */}
      <section className="max-w-6xl mx-auto px-4 -mt-6 relative z-30">
        <div className="bg-white rounded-2xl lg:rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          {/* 'flex-nowrap' and 'overflow-x-auto' stay active until 'lg' (1024px).
              This ensures it stays a scrollable row on 768px (md) tablets.
          */}
          <div className="flex flex-nowrap lg:flex-wrap lg:justify-center items-center gap-2 p-2 md:p-3 overflow-x-auto no-scrollbar scroll-smooth">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`
                  flex-shrink-0 px-5 py-3 lg:px-6 lg:py-3 rounded-xl font-black text-[12px] md:text-sm 
                  transition-all flex items-center gap-2 active:scale-95 whitespace-nowrap
                  ${
                    selectedCategory === cat.value
                      ? `bg-slate-900 text-white shadow-md scale-105`
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  }
                `}
              >
                <span className="text-lg">{cat.emoji}</span>
                <span className="tracking-tight">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. FACTS GRID --- */}
      <main className="max-w-6xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {currentFacts.map((fact) => {
            const isLiked = likedFacts.has(fact.id);
            const cat =
              categories.find((c) => c.value === fact.category) ||
              categories[0];
            return (
              <div
                key={fact.id}
                className="group relative h-56 md:h-64 rounded-[2rem] bg-white border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col p-6 md:p-8"
              >
                <div className="absolute top-[-5%] right-[-5%] text-7xl md:text-8xl opacity-[0.04] group-hover:rotate-12 transition-all duration-700 pointer-events-none">
                  {cat.emoji}
                </div>
                <div className="relative h-full flex flex-col justify-end items-start gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-white bg-gradient-to-r ${cat.gradient}`}
                  >
                    {fact.category}
                  </span>
                  <div>
                    <p className="text-lg md:text-xl font-black text-slate-800 leading-tight mb-4 line-clamp-3">
                      {fact.text}
                    </p>
                    <div className="flex items-center gap-5 border-t border-slate-50 pt-4 w-full text-[9px] font-black uppercase tracking-widest text-slate-400">
                      <button
                        onClick={() => handleLike(fact.id)}
                        className={`flex items-center gap-1.5 ${
                          isLiked ? "text-pink-500" : ""
                        }`}
                      >
                        <span className="text-sm">{isLiked ? "❤️" : "🤍"}</span>{" "}
                        {isLiked ? "Loved" : "Like"}
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-indigo-600">
                        <span className="text-sm">🔗</span> Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* --- 5. DISCOVERY LAB FOOTER (TRIGGER BUTTON) --- */}
      <footer className="max-w-6xl mx-auto px-4 mt-16 pb-10">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden">
          <h2 className="text-2xl font-black text-white mb-2 relative z-10">
            Curiosity calling? 🎲
          </h2>
          <p className="text-slate-400 text-sm mb-6 relative z-10">
            Get a random fact from our secret vault.
          </p>
          {/* ADDED triggerSurprise here */}
          <button
            onClick={triggerSurprise}
            className="px-8 py-3 bg-white text-slate-900 rounded-xl font-black hover:scale-105 transition-all active:scale-95 relative z-10"
          >
            Surprise Me!
          </button>
        </div>
      </footer>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
