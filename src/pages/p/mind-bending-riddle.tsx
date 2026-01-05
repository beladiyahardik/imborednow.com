import { useState, useMemo, useEffect, SetStateAction } from "react";
import Head from "next/head";
import Link from "next/link";

// --- CUSTOM ICONS COMPONENT ---
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
  Bookmark: ({ className = "", filled = false }) => (
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
  Share: ({ className = "" }) => (
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

const RIDDLES = [
  {
    id: 1,
    riddle: "What has a head, a tail, is brown, and has no legs?",
    emoji: "🪙🐕💰",
    options: {
      A: "A penny.",
      B: "A snake.",
      C: "A dog.",
      D: "A river.",
    },
    correct_answer: "A",
    correct_text: "A penny.",
  },
  {
    id: 2,
    riddle:
      "The person who makes it sells it. The person who buys it never uses it. The person who uses it doesn't know they're using it. What is it?",
    emoji: "⚰️🪦💀",
    options: {
      A: "A gift.",
      B: "A coffin.",
      C: "A secret.",
      D: "A trap.",
    },
    correct_answer: "B",
    correct_text: "A coffin.",
  },
  {
    id: 3,
    riddle:
      "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
    emoji: "🗣️👂💨",
    options: {
      A: "A ghost.",
      B: "Wind.",
      C: "An echo.",
      D: "A mountain.",
    },
    correct_answer: "C",
    correct_text: "An echo.",
  },
  {
    id: 4,
    riddle:
      "You see a boat filled with people. It has not sunk, but when you look again you don’t see a single person on the boat. Why?",
    emoji: "🚢👰🤵",
    options: {
      A: "They jumped overboard.",
      B: "They hid.",
      C: "All the people were married.",
      D: "It was a ghost boat.",
    },
    correct_answer: "C",
    correct_text: "All the people were married.",
  },
  {
    id: 5,
    riddle: "What can travel around the world while staying in a corner?",
    emoji: "✉️🌍📮",
    options: {
      A: "A spider.",
      B: "A stamp.",
      C: "A clock.",
      D: "A photo.",
    },
    correct_answer: "B",
    correct_text: "A stamp.",
  },
  {
    id: 6,
    riddle:
      "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
    emoji: "🗺️🏙️⛰️🌊",
    options: {
      A: "A map.",
      B: "A dream.",
      C: "The moon.",
      D: "A video game.",
    },
    correct_answer: "A",
    correct_text: "A map.",
  },
  {
    id: 7,
    riddle: "What is always in front of you but can’t be seen?",
    emoji: "🔮⏳🚶",
    options: {
      A: "Your nose.",
      B: "The air.",
      C: "The future.",
      D: "Your shadow.",
    },
    correct_answer: "C",
    correct_text: "The future.",
  },
  {
    id: 8,
    riddle: "The more you take, the more you leave behind. What am I?",
    emoji: "👣🚶‍♂️🛤️",
    options: {
      A: "Memories.",
      B: "Footsteps.",
      C: "Time.",
      D: "Breath.",
    },
    correct_answer: "B",
    correct_text: "Footsteps.",
  },
  {
    id: 9,
    riddle:
      "I have keys but no locks. I have space but no room. You can enter, but you can’t go outside. What am I?",
    emoji: "⌨️🖥️🔲",
    options: {
      A: "A piano.",
      B: "A keyboard.",
      C: "A map.",
      D: "A jail.",
    },
    correct_answer: "B",
    correct_text: "A keyboard.",
  },
  {
    id: 10,
    riddle: "What gets wetter the more it dries?",
    emoji: "🛁😅",
    options: {
      A: "A sponge.",
      B: "A towel.",
      C: "Paper.",
      D: "Hair.",
    },
    correct_answer: "B",
    correct_text: "A towel.",
  },
  {
    id: 11,
    riddle:
      "I am taken from a mine, and shut up in a wooden case, from which I am never released, and yet I am used by almost every person. What am I?",
    emoji: "✏️📏⛏️",
    options: {
      A: "Diamond.",
      B: "Pencil lead (graphite).",
      C: "Coal.",
      D: "Gold.",
    },
    correct_answer: "B",
    correct_text: "Pencil lead (graphite).",
  },
  {
    id: 12,
    riddle: "What has one eye but can't see?",
    emoji: "🪡👁️",
    options: {
      A: "A camera.",
      B: "A storm.",
      C: "A potato.",
      D: "A needle.",
    },
    correct_answer: "D",
    correct_text: "A needle.",
  },
  {
    id: 13,
    riddle:
      "If you have me, you want to share me. If you share me, you haven't got me. What am I?",
    emoji: "🤫🔒",
    options: {
      A: "A secret.",
      B: "Love.",
      C: "Money.",
      D: "Food.",
    },
    correct_answer: "A",
    correct_text: "A secret.",
  },
  {
    id: 14,
    riddle: "What can you break, even if you never pick it up or touch it?",
    emoji: "💔🤝",
    options: {
      A: "A promise.",
      B: "Silence.",
      C: "A record.",
      D: "A heart.",
    },
    correct_answer: "A",
    correct_text: "A promise.",
  },
  {
    id: 15,
    riddle:
      "I am not alive, but I can grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?",
    emoji: "🔥💨🚒",
    options: {
      A: "A plant.",
      B: "Fire.",
      C: "A cloud.",
      D: "Ice.",
    },
    correct_answer: "B",
    correct_text: "Fire.",
  },
  {
    id: 16,
    riddle: "What has hands but can't clap?",
    emoji: "🕐🕰️",
    options: {
      A: "A statue.",
      B: "A clock.",
      C: "A glove.",
      D: "A scarecrow.",
    },
    correct_answer: "B",
    correct_text: "A clock.",
  },
  {
    id: 17,
    riddle:
      "The poor have me, the rich need me, and if you eat me, you'll die. What am I?",
    emoji: "🤑😞",
    options: {
      A: "Money.",
      B: "Nothing.",
      C: "Food.",
      D: "Love.",
    },
    correct_answer: "B",
    correct_text: "Nothing.",
  },
  {
    id: 18,
    riddle: "What runs all around a backyard, yet never moves?",
    emoji: "🏡🧱",
    options: {
      A: "A fence.",
      B: "A dog.",
      C: "The sun.",
      D: "A river.",
    },
    correct_answer: "A",
    correct_text: "A fence.",
  },
  {
    id: 19,
    riddle: "I have branches, but no fruit, trunk or leaves. What am I?",
    emoji: "🏦💰",
    options: {
      A: "A bank.",
      B: "A library.",
      C: "A family tree.",
      D: "A river.",
    },
    correct_answer: "A",
    correct_text: "A bank.",
  },
  {
    id: 20,
    riddle: "What can you catch but not throw?",
    emoji: "🤧😷",
    options: {
      A: "A ball.",
      B: "A cold.",
      C: "A fish.",
      D: "Feelings.",
    },
    correct_answer: "B",
    correct_text: "A cold.",
  },
  {
    id: 21,
    riddle:
      "What has a neck but no head, a body but no legs, and arms but no hands?",
    emoji: "👔🧥",
    options: {
      A: "A bottle.",
      B: "A shirt.",
      C: "A chair.",
      D: "A tree.",
    },
    correct_answer: "B",
    correct_text: "A shirt.",
  },
  {
    id: 22,
    riddle: "I shave every day, but my beard stays the same. What am I?",
    emoji: "💈✂️",
    options: {
      A: "A barber.",
      B: "A goat.",
      C: "An electric razor.",
      D: "A mountain.",
    },
    correct_answer: "A",
    correct_text: "A barber.",
  },
  {
    id: 23,
    riddle: "What word is spelled incorrectly in every dictionary?",
    emoji: "📖❌",
    options: {
      A: "Misspelled.",
      B: "Incorrectly.",
      C: "Wrong.",
      D: "Dictionary.",
    },
    correct_answer: "B",
    correct_text: "Incorrectly.",
  },
  {
    id: 24,
    riddle: "Forward I am heavy, but backward I am not. What am I?",
    emoji: "⚖️🔙",
    options: {
      A: "Not.",
      B: "Weight.",
      C: "Ton.",
      D: "A truck.",
    },
    correct_answer: "C",
    correct_text: "Ton.",
  },
  {
    id: 25,
    riddle: "What has many teeth but can't bite?",
    emoji: "🪮🦷",
    options: {
      A: "A shark.",
      B: "A comb.",
      C: "A saw.",
      D: "A zipper.",
    },
    correct_answer: "B",
    correct_text: "A comb.",
  },
  {
    id: 26,
    riddle:
      "I follow you all day long, but when the night or rain comes, I am gone. What am I?",
    emoji: "🌞☔",
    options: {
      A: "Your shadow.",
      B: "A friend.",
      C: "Your reflection.",
      D: "Time.",
    },
    correct_answer: "A",
    correct_text: "Your shadow.",
  },
  {
    id: 27,
    riddle: "What begins with T, ends with T, and has T in it?",
    emoji: "☕🍵",
    options: {
      A: "Ticket.",
      B: "Teapot.",
      C: "Tent.",
      D: "Tablet.",
    },
    correct_answer: "B",
    correct_text: "A teapot.",
  },
  {
    id: 28,
    riddle:
      "You measure my life in hours and I serve you by expiring. I’m quick when I’m thin and slow when I’m fat. The wind is my enemy. What am I?",
    emoji: "🕯️💨",
    options: {
      A: "A candle.",
      B: "A battery.",
      C: "An hourglass.",
      D: "A match.",
    },
    correct_answer: "A",
    correct_text: "A candle.",
  },
  {
    id: 29,
    riddle: "I have a spine but no bones. What am I?",
    emoji: "📚🔖",
    options: {
      A: "A cactus.",
      B: "A book.",
      C: "A hedgehog.",
      D: "A ladder.",
    },
    correct_answer: "B",
    correct_text: "A book.",
  },
  {
    id: 30,
    riddle: "What can fill a room but takes up no space?",
    emoji: "💡🌟",
    options: {
      A: "Air.",
      B: "Light.",
      C: "Sound.",
      D: "Smell.",
    },
    correct_answer: "B",
    correct_text: "Light.",
  },
  {
    id: 31,
    riddle:
      "The man who invented it doesn't want it. The man who bought it doesn't need it. The man who needs it doesn't know it. What is it?",
    emoji: "⚰️🪦",
    options: {
      A: "A coffin.",
      B: "Insurance.",
      C: "Medicine.",
      D: "A will.",
    },
    correct_answer: "A",
    correct_text: "A coffin.",
  },
  {
    id: 32,
    riddle:
      "What has roots as nobody sees, is taller than trees, up, up it goes, and yet never grows?",
    emoji: "⛰️🌳",
    options: {
      A: "A tree.",
      B: "A mountain.",
      C: "A cloud.",
      D: "A building.",
    },
    correct_answer: "B",
    correct_text: "A mountain.",
  },
  {
    id: 33,
    riddle:
      "I am always hungry and must always be fed. The finger I touch will soon turn red. What am I?",
    emoji: "🔥👆",
    options: {
      A: "A monster.",
      B: "Fire.",
      C: "A lion.",
      D: "Hunger.",
    },
    correct_answer: "B",
    correct_text: "Fire.",
  },
  {
    id: 34,
    riddle: "What has a bottom at the top?",
    emoji: "🦵👖",
    options: {
      A: "A bottle.",
      B: "Your legs.",
      C: "A mountain.",
      D: "A hat.",
    },
    correct_answer: "B",
    correct_text: "Your legs.",
  },
  {
    id: 35,
    riddle:
      "What can you hold in your right hand, but never in your left hand?",
    emoji: "🫲🫱",
    options: {
      A: "A glove.",
      B: "Your left hand.",
      C: "A ring.",
      D: "Air.",
    },
    correct_answer: "B",
    correct_text: "Your left hand.",
  },
  {
    id: 36,
    riddle:
      "I am light as a feather, but the strongest person can't hold me for much longer than a minute. What am I?",
    emoji: "🪶😮‍💨",
    options: {
      A: "Breath.",
      B: "A thought.",
      C: "A bubble.",
      D: "Smoke.",
    },
    correct_answer: "A",
    correct_text: "Breath.",
  },
  {
    id: 37,
    riddle: "What has words but never speaks?",
    emoji: "📖🔇",
    options: {
      A: "A book.",
      B: "A sign.",
      C: "A radio.",
      D: "A parrot.",
    },
    correct_answer: "A",
    correct_text: "A book.",
  },
  {
    id: 38,
    riddle:
      "What can run but never walks, has a mouth but never talks, has a head but never weeps, has a bed but never sleeps?",
    emoji: "🏞️🌊",
    options: {
      A: "A car.",
      B: "A river.",
      C: "A train.",
      D: "Time.",
    },
    correct_answer: "B",
    correct_text: "A river.",
  },
  {
    id: 39,
    riddle: "I go all around the world, but never leave the corner. What am I?",
    emoji: "📮✉️",
    options: {
      A: "A stamp.",
      B: "A clock.",
      C: "A spider.",
      D: "The moon.",
    },
    correct_answer: "A",
    correct_text: "A stamp.",
  },
  {
    id: 40,
    riddle: "What is black when it’s clean and white when it’s dirty?",
    emoji: "🖤🤍",
    options: {
      A: "A blackboard.",
      B: "Coal.",
      C: "A whiteboard.",
      D: "Snow.",
    },
    correct_answer: "A",
    correct_text: "A blackboard.",
  },
  {
    id: 41,
    riddle: "What has a head and a tail but no body?",
    emoji: "🪙💰",
    options: {
      A: "A coin.",
      B: "A snake.",
      C: "A bed.",
      D: "A river.",
    },
    correct_answer: "A",
    correct_text: "A coin.",
  },
  {
    id: 42,
    riddle: "I am full of holes but still hold water. What am I?",
    emoji: "🧽🚰",
    options: {
      A: "A sponge.",
      B: "A net.",
      C: "A colander.",
      D: "Cheese.",
    },
    correct_answer: "A",
    correct_text: "A sponge.",
  },
  {
    id: 43,
    riddle: "What is so fragile that saying its name breaks it?",
    emoji: "🤫🔇",
    options: {
      A: "Glass.",
      B: "Silence.",
      C: "A promise.",
      D: "Trust.",
    },
    correct_answer: "B",
    correct_text: "Silence.",
  },
  {
    id: 44,
    riddle:
      "I have lakes with no water, mountains with no stone, and cities with no buildings. What am I?",
    emoji: "🗺️🌍",
    options: {
      A: "A map.",
      B: "A dream.",
      C: "A video game.",
      D: "The desert.",
    },
    correct_answer: "A",
    correct_text: "A map.",
  },
  {
    id: 45,
    riddle:
      "What comes once in a minute, twice in a moment, but never in a thousand years?",
    emoji: "⌛🔤",
    options: {
      A: "The letter M.",
      B: "Time.",
      C: "A second.",
      D: "The sun.",
    },
    correct_answer: "A",
    correct_text: "The letter M.",
  },
  {
    id: 46,
    riddle:
      "I am an odd number. Take away a letter and I become even. What number am I?",
    emoji: "7️⃣➖",
    options: {
      A: "Three.",
      B: "Nine.",
      C: "Seven.",
      D: "One.",
    },
    correct_answer: "C",
    correct_text: "Seven.",
  },
  {
    id: 47,
    riddle:
      "What has golden hair and stands in a field, watching over the corn?",
    emoji: "🌾👱‍♂️",
    options: {
      A: "A lion.",
      B: "A scarecrow.",
      C: "A farmer.",
      D: "The sun.",
    },
    correct_answer: "B",
    correct_text: "A scarecrow.",
  },
  {
    id: 48,
    riddle:
      "You see me once in June, twice in November, but not at all in May. What am I?",
    emoji: "📅🔠",
    options: {
      A: "The letter N.",
      B: "The letter E.",
      C: "Weekends.",
      D: "Rain.",
    },
    correct_answer: "B",
    correct_text: "The letter E.",
  },
  {
    id: 49,
    riddle: "What can jump higher than a building?",
    emoji: "🏢🐸",
    options: {
      A: "A kangaroo.",
      B: "A frog.",
      C: "Anything—buildings can't jump.",
      D: "An elevator.",
    },
    correct_answer: "C",
    correct_text: "Anything—buildings can't jump.",
  },
  {
    id: 50,
    riddle: "What disappears the moment you say its name?",
    emoji: "🤫💨",
    options: {
      A: "A secret.",
      B: "Silence.",
      C: "Darkness.",
      D: "A shadow.",
    },
    correct_answer: "B",
    correct_text: "Silence.",
  },
];

export default function RiddlePage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoved, setIsLoved] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const currentRiddle = RIDDLES[currentIdx];

  const handleOptionClick = (key: string) => {
    if (isAnswered) return;
    setSelectedOption(key);
    setIsAnswered(true);
  };

  const handleNext = () => {
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIdx((prev) => {
        if (RIDDLES.length <= 1) return prev;

        let randomIdx;
        do {
          randomIdx = Math.floor(Math.random() * RIDDLES.length);
        } while (randomIdx === prev);

        return randomIdx;
      });

      setSelectedOption(null);
      setIsAnswered(false);
      setIsLoved(false);
      setIsSaved(false);
      setIsAnimating(false);
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <Head>
        <title>Mind-Bending Riddles | imborednow</title>
      </Head>

      {/* Header with Mystery Theme */}
      <header className="bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-700 pt-12 pb-24 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none text-8xl">
          🧩 🔮 🕯️ 🎭
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-3 drop-shadow-lg tracking-tight">
          Mind <span className="text-yellow-400">Benders</span>
        </h1>
        <p className="text-indigo-200 font-bold uppercase tracking-widest text-sm">
          Can you solve them all?
        </p>
      </header>

      <main className="container mx-auto px-4 -mt-16 pb-20 max-w-2xl relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-indigo-50/50 overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Riddle Progress */}
            <div className="flex justify-between items-center mb-10">
              <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                Level: {currentRiddle.id}
              </span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-6 rounded-full ${
                      i < currentRiddle.id % 6
                        ? "bg-yellow-400"
                        : "bg-slate-100"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Riddle Question Area */}
            <div
              className={`text-center mb-12 transition-all duration-300 ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <div className="text-5xl mb-6 transform hover:rotate-12 transition-transform cursor-default">
                {currentRiddle.emoji}
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-snug">
                &quot;{currentRiddle.riddle}&quot;
              </h2>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {Object.entries(currentRiddle.options).map(([key, text]) => {
                const isCorrect = key === currentRiddle.correct_answer;
                const isSelected = selectedOption === key;

                let btnStyle =
                  "bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-300";
                if (isAnswered) {
                  if (isCorrect)
                    btnStyle =
                      "bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-100";
                  else if (isSelected && !isCorrect)
                    btnStyle =
                      "bg-rose-50 border-rose-500 text-rose-700 opacity-70";
                  else
                    btnStyle =
                      "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
                }

                return (
                  <button
                    key={key}
                    onClick={() => handleOptionClick(key)}
                    disabled={isAnswered}
                    className={`p-5 rounded-2xl border-2 font-bold text-lg text-left transition-all flex items-center gap-4 ${btnStyle}`}
                  >
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black ${
                        isSelected
                          ? "bg-current text-white"
                          : "bg-white shadow-sm"
                      }`}
                    >
                      {key}
                    </span>
                    {text}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Navigation */}
            <div className="space-y-8 animate-fade-in">
              {isAnswered && (
                <div className="py-4 px-6 bg-slate-50 rounded-2xl border border-slate-100 text-center animate-pop-in">
                  <p className="text-slate-500 font-bold text-sm uppercase mb-1">
                    Answer:
                  </p>
                  <p className="text-indigo-600 font-black text-xl">
                    {currentRiddle.correct_text}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-6">
                {isAnswered && (
                  <button
                    onClick={handleNext}
                    className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-[1.25rem] font-black text-xl hover:shadow-xl hover:shadow-indigo-200 transition-all flex items-center justify-center gap-3 active:scale-95"
                  >
                    Next Riddle <Icons.Refresh className="w-6 h-6" />
                  </button>
                )}

                {/* PASTEL UTILITY BUTTONS (YOUR DESIGN) */}
                <div className="flex flex-wrap justify-center gap-3 pt-6 border-t border-slate-100">
                  <button
                    onClick={() => setIsLoved(!isLoved)}
                    className="flex items-center gap-2 px-6 py-3 bg-[#fce7f3] text-[#db2777] rounded-[1rem] font-bold text-lg hover:brightness-95 transition-all"
                  >
                    <Icons.Heart className="w-5 h-5" filled={isLoved} /> Love
                  </button>
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className="flex items-center gap-2 px-6 py-3 bg-[#dcfce7] text-[#059669] rounded-[1rem] font-bold text-lg hover:brightness-95 transition-all"
                  >
                    <Icons.Bookmark className="w-5 h-5" filled={isSaved} /> Save
                  </button>
                  <button
                    onClick={() =>
                      navigator.share &&
                      navigator.share({ text: currentRiddle.riddle })
                    }
                    className="flex items-center gap-2 px-6 py-3 bg-[#dbeafe] text-[#2563eb] rounded-[1rem] font-bold text-lg hover:brightness-95 transition-all"
                  >
                    <Icons.Share className="w-5 h-5" /> Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes pop-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-pop-in {
          animation: pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
        }
      `}</style>
    </div>
  );
}
