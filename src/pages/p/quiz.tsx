"use client";

import React, { useState } from "react";
import Head from "next/head";
import confetti from "canvas-confetti";

const quizData = [
  {
    id: "general-knowledge-1",
    title: "General Knowledge Quiz",
    description: "Test your knowledge on various topics!",
    category: "General",
    difficulty: "medium",
    questions: [
      {
        id: 1,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        explanation: "Paris is the capital and most populous city of France.",
      },
      {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        explanation:
          "Mars is called the Red Planet due to its reddish appearance caused by iron oxide on its surface.",
      },
      {
        id: 3,
        question: "Who painted the Mona Lisa?",
        options: [
          "Vincent van Gogh",
          "Pablo Picasso",
          "Leonardo da Vinci",
          "Michelangelo",
        ],
        correctAnswer: 2,
        explanation:
          "Leonardo da Vinci painted the Mona Lisa in the early 16th century.",
      },
      {
        id: 4,
        question: "What is the largest ocean on Earth?",
        options: [
          "Atlantic Ocean",
          "Indian Ocean",
          "Arctic Ocean",
          "Pacific Ocean",
        ],
        correctAnswer: 3,
        explanation:
          "The Pacific Ocean is the largest and deepest ocean on Earth.",
      },
      {
        id: 5,
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 2,
        explanation:
          "There are 7 continents: Africa, Antarctica, Asia, Europe, North America, Australia/Oceania, and South America.",
      },
    ],
  },
  {
    id: "pop-culture-1",
    title: "Pop Culture Quiz",
    description: "How well do you know pop culture?",
    category: "Entertainment",
    difficulty: "easy",
    questions: [
      {
        id: 1,
        question: "Which streaming service is known for 'Stranger Things'?",
        options: ["Hulu", "Netflix", "Disney+", "Amazon Prime"],
        correctAnswer: 1,
        explanation:
          "Stranger Things is a Netflix original series that premiered in 2016.",
      },
      {
        id: 2,
        question: "Who is known as the 'King of Pop'?",
        options: ["Elvis Presley", "Michael Jackson", "Prince", "Madonna"],
        correctAnswer: 1,
        explanation:
          "Michael Jackson earned the title 'King of Pop' due to his massive influence on music and entertainment.",
      },
      {
        id: 3,
        question: "What year did the first iPhone release?",
        options: ["2005", "2007", "2009", "2010"],
        correctAnswer: 1,
        explanation: "Apple released the first iPhone on June 29, 2007.",
      },
      {
        id: 4,
        question: "Which superhero is also known as the Dark Knight?",
        options: ["Superman", "Spider-Man", "Batman", "Iron Man"],
        correctAnswer: 2,
        explanation:
          "Batman is often referred to as the Dark Knight, especially in Christopher Nolan's film trilogy.",
      },
      {
        id: 5,
        question: "What social media platform uses a bird as its logo?",
        options: ["Facebook", "Instagram", "Twitter/X", "TikTok"],
        correctAnswer: 2,
        explanation:
          "Twitter (now X) has historically used a blue bird as its logo.",
      },
    ],
  },
  {
    id: "science-1",
    title: "Science Quiz",
    description: "Challenge your scientific knowledge!",
    category: "Science",
    difficulty: "hard",
    questions: [
      {
        id: 1,
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        explanation: "Au comes from the Latin word 'aurum' meaning gold.",
      },
      {
        id: 2,
        question: "What is the speed of light in a vacuum?",
        options: [
          "299,792 km/s",
          "300,000 km/s",
          "250,000 km/s",
          "350,000 km/s",
        ],
        correctAnswer: 0,
        explanation:
          "The speed of light in a vacuum is approximately 299,792 kilometers per second.",
      },
      {
        id: 3,
        question: "Which organ produces insulin?",
        options: ["Liver", "Kidney", "Pancreas", "Stomach"],
        correctAnswer: 2,
        explanation:
          "The pancreas produces insulin, which regulates blood sugar levels.",
      },
      {
        id: 4,
        question: "What is the most abundant gas in Earth's atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correctAnswer: 1,
        explanation: "Nitrogen makes up about 78% of Earth's atmosphere.",
      },
      {
        id: 5,
        question: "How many bones does an adult human have?",
        options: ["186", "206", "226", "246"],
        correctAnswer: 1,
        explanation: "An adult human skeleton has 206 bones.",
      },
    ],
  },
];

export default function MultiQuizPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [streak, setStreak] = useState(0);

  const startQuiz = (quiz: any) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setStreak(0);
  };

  const handleAnswer = (index: number) => {
    if (isLocked) return;
    setSelectedOption(index);
    setIsLocked(true);

    if (index === selectedQuiz.questions[currentQuestion].correctAnswer) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < selectedQuiz.questions.length) {
      setCurrentQuestion((c) => c + 1);
      setSelectedOption(null);
      setIsLocked(false);
    } else {
      setShowResult(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#a855f7"],
      });
    }
  };

  const pct = selectedQuiz
    ? ((currentQuestion + 1) / selectedQuiz.questions.length) * 100
    : 0;

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] font-sans flex flex-col items-center justify-center p-6 selection:bg-indigo-100">
      <Head>
        <title>ImBoredNow | Interactive Quizzes</title>
      </Head>

      <div className="w-full max-w-lg">
        {/* STEP 1: SELECTOR SCREEN */}
        {!selectedQuiz ? (
          <div className="animate-in space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">
                Pick a Topic
              </h1>
              <p className="text-gray-400 font-medium">
                Challenge your boredom with a quick test
              </p>
            </div>
            <div className="grid gap-4">
              {quizData.map((quiz) => (
                <button
                  key={quiz.id}
                  onClick={() => startQuiz(quiz)}
                  className="group bg-white border border-gray-200 p-6 rounded-3xl text-left hover:border-gray-900 hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md mb-2 inline-block">
                        {quiz.difficulty}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800">
                        {quiz.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {quiz.description}
                      </p>
                    </div>
                    <span className="text-2xl group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : !showResult ? (
          /* STEP 2: ACTIVE QUIZ SCREEN */
          <div className="animate-in space-y-8">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedQuiz(null)}
                className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-black transition-colors"
              >
                ← Exit Quiz
              </button>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-tighter">
                  🔥 Streak: {streak}
                </span>
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">
                  Score: {score}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="transparent"
                    className="text-gray-100"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="transparent"
                    className="text-indigo-600 transition-all duration-700 ease-out"
                    strokeDasharray={113}
                    strokeDashoffset={113 - (113 * pct) / 100}
                  />
                </svg>
                <span className="absolute text-[10px] font-bold">
                  {currentQuestion + 1}
                </span>
              </div>
              <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">
                {selectedQuiz.category}
              </h2>
            </div>

            <div className="py-2">
              <h1 className="text-2xl md:text-3xl font-medium leading-tight tracking-tight text-gray-800">
                {selectedQuiz.questions[currentQuestion].question}
              </h1>
            </div>

            <div className="grid gap-3">
              {selectedQuiz.questions[currentQuestion].options.map(
                (option: string, index: number) => {
                  const isCorrect =
                    index ===
                    selectedQuiz.questions[currentQuestion].correctAnswer;
                  const isSelected = selectedOption === index;

                  let btnStyle =
                    "bg-white border-gray-200 text-gray-600 hover:border-gray-900";
                  if (isLocked) {
                    if (isCorrect)
                      btnStyle =
                        "bg-indigo-600 border-indigo-600 text-white z-10 scale-[1.02] shadow-lg";
                    else if (isSelected)
                      btnStyle =
                        "bg-white border-red-500 text-red-500 opacity-80 animate-shake";
                    else btnStyle = "opacity-30 border-gray-100 scale-[0.98]";
                  }

                  return (
                    <button
                      key={index}
                      disabled={isLocked}
                      onClick={() => handleAnswer(index)}
                      className={`relative w-full p-5 text-left rounded-2xl border transition-all duration-300 font-medium overflow-hidden ${btnStyle}`}
                    >
                      <div className="flex justify-between items-center relative z-10">
                        <span>{option}</span>
                        {isLocked && isCorrect && (
                          <span className="text-[10px] font-black tracking-widest bg-white/20 px-2 py-1 rounded">
                            CORRECT
                          </span>
                        )}
                      </div>
                    </button>
                  );
                },
              )}
            </div>

            {isLocked && (
              <div className="animate-in-up">
                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 mb-6">
                  <p className="text-sm text-gray-500 leading-relaxed italic">
                    <span className="not-italic font-bold text-gray-900 mr-2">
                      Context:
                    </span>
                    {selectedQuiz.questions[currentQuestion].explanation}
                  </p>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full py-5 bg-gray-900 text-white rounded-3xl font-bold text-lg hover:bg-black transition-all shadow-xl active:scale-[0.98]"
                >
                  {currentQuestion + 1 === selectedQuiz.questions.length
                    ? "View Final Score"
                    : "Next Question"}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* STEP 3: RESULT SCREEN */
          <div className="text-center animate-in">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-4 block">
              Assessment Complete
            </span>
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 rounded-full border-4 border-indigo-600 flex items-center justify-center relative">
                <span className="text-4xl font-light italic">
                  {Math.round((score / selectedQuiz.questions.length) * 100)}%
                </span>
                <div className="absolute inset-0 rounded-full border border-indigo-100 animate-ping opacity-20"></div>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2 tracking-tight">
              Well Played!
            </h2>
            <p className="text-gray-500 mb-10 font-light italic text-sm">
              You correctly answered{" "}
              <span className="text-gray-900 font-bold">{score}</span> out of{" "}
              {selectedQuiz.questions.length} questions in the{" "}
              <span className="font-bold underline text-gray-700">
                {selectedQuiz.title}
              </span>
              .
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => startQuiz(selectedQuiz)}
                className="px-12 py-5 bg-gray-900 text-white rounded-3xl font-bold hover:shadow-2xl transition-all active:scale-95"
              >
                Retry This Quiz
              </button>
              <button
                onClick={() => setSelectedQuiz(null)}
                className="px-12 py-5 bg-white border border-gray-200 text-gray-600 rounded-3xl font-bold hover:border-black transition-all active:scale-95"
              >
                Pick Another Topic
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-3px);
          }
          60% {
            transform: translateX(3px);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out infinite;
          animation-iteration-count: 2;
        }
        .animate-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
