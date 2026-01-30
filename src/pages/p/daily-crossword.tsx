/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useRef } from "react";
import Head from "next/head";

const DAILY_PUZZLE = {
  date: "2026-01-29",
  title: "The Decathlon Challenge",
  dimensions: { rows: 10, cols: 10 },
  grid: [
    "JOURNALIST",
    "O...O...A.",
    "UNDERSTAND",
    "R...N...I.",
    "NEST..BOLD",
    "E.T.S..I.E",
    "YACHT..R.R",
    "S.M...A..S",
    "PRECISIONS",
    "S.E...E..A",
  ],
  clues: {
    across: [
      { number: 1, text: "News reporter" },
      { number: 6, text: "Comprehend fully" },
      { number: 8, text: "A bird's home" },
      { number: 9, text: "Courageous or thick font" },
      { number: 10, text: "Luxury sea vessel" },
      { number: 12, text: "Exactness and accuracy" },
    ],
    down: [
      { number: 1, text: "A long trip" },
      { number: 2, text: "Tidy and organized" },
      { number: 3, text: "Opposite of 'In'" },
      { number: 4, text: "The first letter of the alphabet" },
      { number: 5, text: "Large groups of soldiers" },
      { number: 7, text: "To decrease or go down" },
      { number: 11, text: "A common scavenger bird" },
    ],
  },
  hints: { "0-0": "Reporter", "2-0": "Grasp", "8-0": "Accuracy" },
};

export default function DailyCrossword() {
  const [gridState, setGridState] = useState<string[][]>([]);
  const [hintedCells, setHintedCells] = useState<string[]>([]);
  const [focus, setFocus] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const [direction, setDirection] = useState<"across" | "down">("across");
  const [isWon, setIsWon] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const inputRefs = useRef<any>({});

  useEffect(() => {
    const emptyGrid = DAILY_PUZZLE.grid.map((row) =>
      row.split("").map((char) => (char === "." ? "." : "")),
    );
    setGridState(emptyGrid);
    const timer = setInterval(() => {
      if (!isWon) setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isWon]);

  const getCurrentClue = () => {
    let { r, c } = focus;
    if (direction === "across") {
      while (c > 0 && DAILY_PUZZLE.grid[r][c - 1] !== ".") c--;
    } else {
      while (r > 0 && DAILY_PUZZLE.grid[r - 1][c] !== ".") r--;
    }
    const cellNum = getCellNumber(r, c);
    const clueList =
      direction === "across"
        ? DAILY_PUZZLE.clues.across
        : DAILY_PUZZLE.clues.down;
    return (
      clueList.find((item) => item.number === cellNum)?.text ||
      "Select a square"
    );
  };

  const revealHint = () => {
    const { r, c } = focus;
    const correctLetter = DAILY_PUZZLE.grid[r][c];
    if (correctLetter === ".") return;
    const newGrid = [...gridState];
    newGrid[r][c] = correctLetter;
    setGridState(newGrid);
    setHintedCells((prev) => [...prev, `${r}-${c}`]);
    checkWin(newGrid);
  };

  const checkWin = (grid: string[][]) => {
    const win = grid.every((row, ri) =>
      row.every(
        (cell, ci) =>
          DAILY_PUZZLE.grid[ri][ci] === "." ||
          cell === DAILY_PUZZLE.grid[ri][ci],
      ),
    );
    if (win) setIsWon(true);
  };

  const handleInputChange = (r: number, c: number, value: string) => {
    const val = value.slice(-1).toUpperCase();
    const newGrid = gridState.map((row, ri) =>
      row.map((col, ci) => (ri === r && ci === c ? val : col)),
    );
    setGridState(newGrid);
    checkWin(newGrid);
    if (val) moveFocus(r, c, 1);
  };

  const moveFocus = (r: number, c: number, step: number) => {
    let nR = r,
      nC = c;
    direction === "across" ? (nC += step) : (nR += step);
    if (
      nR >= 0 &&
      nR < DAILY_PUZZLE.dimensions.rows &&
      nC >= 0 &&
      nC < DAILY_PUZZLE.dimensions.cols
    ) {
      if (DAILY_PUZZLE.grid[nR][nC] === ".") moveFocus(nR, nC, step);
      else {
        setFocus({ r: nR, c: nC });
        inputRefs.current[`${nR}-${nC}`]?.focus();
      }
    }
  };

  const getCellNumber = (r: number, c: number) => {
    if (DAILY_PUZZLE.grid[r][c] === ".") return null;
    let n = 0;
    for (let i = 0; i < DAILY_PUZZLE.dimensions.rows; i++) {
      for (let j = 0; j < DAILY_PUZZLE.dimensions.cols; j++) {
        if (DAILY_PUZZLE.grid[i][j] === ".") continue;
        if (
          i === 0 ||
          DAILY_PUZZLE.grid[i - 1][j] === "." ||
          j === 0 ||
          DAILY_PUZZLE.grid[i][j - 1] === "."
        ) {
          n++;
          if (i === r && j === c) return n;
        }
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      <Head>
        <title>Daily Crossword Puzzle | Best Free Word Games Online 2026</title>
        <meta
          name="description"
          content="Play free crossword puzzles online. Challenge your brain with our daily wordle game and fun word puzzles for kids and adults. No download required."
        />
      </Head>

      {/* NAVIGATION */}
      <nav className="bg-white/70 backdrop-blur-xl border-b border-white py-4 px-6 md:px-8 sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter italic uppercase text-indigo-900 leading-none">
            The Master
          </h1>
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
            {DAILY_PUZZLE.date}
          </span>
        </div>
        <div className="bg-indigo-600 text-white px-4 md:px-5 py-2 rounded-2xl font-mono font-black text-xs md:text-sm shadow-lg shadow-indigo-200">
          {Math.floor(seconds / 60)}:
          {(seconds % 60).toString().padStart(2, "0")}
        </div>
      </nav>

      {/* GAME AREA */}
      <main className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
          {/* GRID BENTO BOX */}
          <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-8 shadow-2xl border border-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />

            <div className="flex justify-center w-full overflow-hidden md:overflow-visible">
              {/* RESPONSIVE SCALE LOGIC: Using w-full and responsive scale to prevent cutting */}
              <div className="origin-top transform-gpu scale-[0.85] xs:scale-95 sm:scale-100 md:scale-100 transition-transform mb-[-40px] xs:mb-[-20px] sm:mb-0 w-full flex justify-center">
                <div
                  className="grid bg-slate-900 p-[2px] w-full max-w-[550px] aspect-square rounded-xl overflow-hidden shadow-2xl"
                  style={{
                    gridTemplateColumns: `repeat(${DAILY_PUZZLE.dimensions.cols}, minmax(0, 1fr))`,
                    gap: "2px",
                  }}
                >
                  {gridState.map((row, r) =>
                    row.map((cellVal, c) => {
                      const isBlock = DAILY_PUZZLE.grid[r][c] === ".";
                      const isFocused = focus.r === r && focus.c === c;
                      const isInPath =
                        direction === "across" ? focus.r === r : focus.c === c;
                      if (isBlock)
                        return (
                          <div key={`${r}-${c}`} className="bg-slate-900" />
                        );
                      return (
                        <div
                          key={`${r}-${c}`}
                          className="relative bg-white group"
                        >
                          {getCellNumber(r, c) && (
                            <span className="absolute top-0.5 left-0.5 text-[7px] md:text-[10px] font-black text-slate-400">
                              {getCellNumber(r, c)}
                            </span>
                          )}
                          <input
                            ref={(el) => {
                              inputRefs.current[`${r}-${c}`] = el;
                            }}
                            type="text"
                            maxLength={1}
                            value={cellVal}
                            onFocus={(e) => {
                              setFocus({ r, c });
                              e.target.select();
                            }}
                            onChange={(e) =>
                              handleInputChange(r, c, e.target.value)
                            }
                            className={`w-full h-full text-center font-black uppercase outline-none transition-all caret-transparent text-sm sm:text-lg md:text-xl ${isFocused ? "bg-indigo-600 text-white z-20 scale-105 shadow-xl rounded-sm" : isInPath ? "bg-indigo-50" : "bg-white"} ${hintedCells.includes(`${r}-${c}`) ? "text-purple-600" : ""}`}
                          />
                        </div>
                      );
                    }),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CONTROLS BENTO */}
          <div className="space-y-6 md:pt-0">
            <div className="bg-indigo-900 text-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300 block mb-2">
                  {direction} Clue
                </span>
                <p className="text-lg md:text-2xl font-bold leading-tight italic">
                  "{getCurrentClue()}"
                </p>
              </div>
              <div className="absolute -bottom-4 -right-4 text-6xl md:text-8xl opacity-10 font-black italic group-hover:scale-110 transition-transform">
                {direction === "across" ? "→" : "↓"}
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() =>
                  setDirection((d) => (d === "across" ? "down" : "across"))
                }
                className="flex-1 bg-white border border-slate-200 py-4 rounded-2xl md:rounded-3xl text-xs font-black uppercase hover:shadow-lg transition-all active:scale-95"
              >
                ↻ Switch
              </button>
              <button
                onClick={revealHint}
                className="flex-1 bg-white border border-slate-200 py-4 rounded-2xl md:rounded-3xl text-xs font-black uppercase hover:shadow-lg transition-all active:scale-95 text-purple-600"
              >
                💡 Hint
              </button>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-lg border border-slate-100 max-h-[300px] md:max-h-[350px] overflow-y-auto custom-scrollbar">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex justify-between">
                Clue List <span className="text-indigo-600">●</span>
              </h3>
              <div className="space-y-8 text-sm">
                {["across", "down"].map((dir) => (
                  <div key={dir}>
                    <h4 className="text-[10px] font-black uppercase text-indigo-600 mb-4">
                      {dir}
                    </h4>
                    <div className="space-y-3">
                      {(DAILY_PUZZLE.clues as any)[dir].map((c: any) => (
                        <div
                          key={c.number}
                          className={`flex gap-3 leading-snug ${direction === dir && getCurrentClue() === c.text ? "text-indigo-600 font-bold" : "text-slate-500"}`}
                        >
                          <span className="opacity-40 font-bold">
                            {c.number}
                          </span>
                          <p className="text-xs md:text-sm">{c.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- 2000 WORD SEO ARTICLE SECTION --- */}
        <section className="mt-16 md:mt-24 pb-24 space-y-12 md:space-y-16">
          <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 shadow-sm border border-slate-100">
            <h2 className="text-3xl md:text-7xl font-black text-slate-900 mb-8 md:mb-10 leading-[1.1] md:leading-[0.85] italic uppercase tracking-tighter">
              The Digital Word Renaissance: <br />
              <span className="text-indigo-600">
                Why Daily Crossword Puzzles Rule 2026
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-base md:text-lg text-slate-600 font-medium leading-relaxed">
              <div className="space-y-6">
                <p>
                  In a world dominated by rapid-fire social media feeds and
                  15-second videos, a quiet revolution is happening on our
                  screens. The <strong>daily crossword puzzle</strong> has moved
                  from the back of the newspaper into the center of the digital
                  lifestyle. It’s no longer just a hobby for the Sunday morning
                  coffee crowd; it’s a high-stakes, high-reward mental sport.
                </p>
                <p>
                  Whether you’re looking for{" "}
                  <strong>free crossword puzzles</strong> to kill time during a
                  commute or seeking the{" "}
                  <strong>best word games for brain training</strong>, the grid
                  offers something that no other digital medium can: a perfect
                  balance of logic, linguistics, and lateral thinking.
                </p>
              </div>
              <div className="space-y-6">
                <p>
                  Our platform, <strong>The Master Mini</strong>, represents the
                  pinnacle of this evolution. By offering{" "}
                  <strong>free online crossword puzzles no download</strong>{" "}
                  required, we remove the friction between you and your daily
                  mental workout. We’ve combined the classic satisfaction of a{" "}
                  <strong>crossword maker online</strong> with the sleek,
                  addictive UI of modern gaming.
                </p>
                <p>
                  In 2026, the demand for{" "}
                  <strong>online crossword games</strong> has skyrocketed. Why?
                  Because we crave the "Aha!" moment-that split second where a
                  cryptic clue finally clicks into place.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[120px]" />
            <h3 className="text-2xl md:text-5xl font-black italic uppercase tracking-tighter mb-12 md:mb-16">
              Pro Protocol:{" "}
              <span className="text-indigo-500">
                How to Play Word Lab Games
              </span>
            </h3>
            <div className="grid md:grid-cols-3 gap-10 relative z-10">
              {[
                {
                  n: "01",
                  t: "Initialize the Low Hanging Fruit",
                  d: "When you start a daily crossword puzzle, don't go in order. Expert solvers look for 'fill-in-the-blank' clues first. These provide the anchor letters needed for difficult online crossword games.",
                },
                {
                  n: "02",
                  t: "Master Cross-Referencing",
                  d: "If you are stuck on a 10-letter word for 'News Reporter,' look at the down crossword for kids clues that intersect it. This logic is why we are the best crossword maker online.",
                },
                {
                  n: "03",
                  t: "Embrace the Wordle Logic",
                  d: "Fans of the daily wordle game online free already have a head start. Use letter frequency and position. If you want to solve wordle puzzles faster, apply the elimination method.",
                },
              ].map((step, i) => (
                <div key={i} className="space-y-4 md:space-y-6">
                  <span className="text-4xl md:text-5xl font-black text-indigo-500/30 italic">
                    {step.n}
                  </span>
                  <h4 className="text-lg md:text-xl font-black uppercase italic tracking-tight">
                    {step.t}
                  </h4>
                  <p className="text-slate-400 leading-relaxed text-xs md:text-sm">
                    {step.d}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] text-white">
              <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-6">
                Cognitive Longevity
              </h3>
              <p className="text-indigo-100 text-base md:text-lg leading-relaxed mb-8">
                Research shows that the{" "}
                <strong>best word games for brain training</strong> can improve
                memory and cognitive longevity. Our{" "}
                <strong>relaxing word games for stress relief</strong> provide a
                healthy digital escape for seniors and children alike. Engaging
                in a <strong>wordle unlimited online free play</strong> session
                shifts your brain into a state of "Flow."
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest">
                  Brain Teaser Puzzles
                </span>
                <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest">
                  Crossword Jam Game
                </span>
              </div>
            </div>
            <div className="bg-white p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-slate-200 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-6">
                  Educational Impact
                </h3>
                <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-6">
                  Teachers know that{" "}
                  <strong>crossword puzzle maker for classroom use</strong>{" "}
                  tools are the secret sauce of literacy. When a child plays{" "}
                  <strong>educational word puzzle games for children</strong>,
                  they learn how words fit together structurally.
                </p>
              </div>
              <div className="flex items-center gap-4 text-indigo-600 font-black uppercase tracking-widest text-[10px] md:text-xs">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-50 rounded-full flex items-center justify-center">
                  ✓
                </div>
                Online crossword maker for teachers
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 border border-slate-100 space-y-12">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-tighter">
              Beyond the Traditional Grid
            </h3>
            <div className="prose prose-slate max-w-none grid md:grid-cols-2 gap-8 md:gap-12 text-slate-600">
              <div className="space-y-4 md:space-y-6">
                <p className="text-sm md:text-base">
                  The landscape of <strong>word games online</strong> changed
                  forever with the release of Wordle. But for many enthusiasts,
                  once a day wasn't enough. This led to the explosion of{" "}
                  <strong>wordle unlimited online free play</strong> and{" "}
                  <strong>wordle unlimited play</strong> clones. People wanted
                  to sharpen their skills without the 24-hour wait.
                </p>
                <p className="text-sm md:text-base">
                  But word games aren't a monolith. While{" "}
                  <strong>free wordle game</strong> variants focus on
                  five-letter logic, games like{" "}
                  <strong>crossword jam game</strong> focus on the beauty of
                  anagrams. At Word Lab, we aren’t just a{" "}
                  <strong>crossword maker online</strong>; we are a hub for{" "}
                  <strong>word search games</strong> and{" "}
                  <strong>fun brain teaser word games for seniors</strong>.
                </p>
              </div>
              <div className="space-y-4 md:space-y-6">
                <p className="text-sm md:text-base">
                  If you want to move from "Easy" to "Expert," you need to
                  change your mindset. Stop looking at clues as literal
                  questions. If a clue ends in a question mark, the answer is a
                  pun. Always check the part of speech; if the clue is
                  "Quickly," the answer must be an adverb like "RAPIDLY."
                </p>
                <p className="text-sm md:text-base">
                  Need a break from the monitor? We offer{" "}
                  <strong>printable crossword puzzles</strong> and{" "}
                  <strong>printable word search packs</strong>. These are
                  designed in <strong>large print</strong> to be accessible for
                  everyone, ensuring that{" "}
                  <strong>family friendly word games online free</strong> aren't
                  limited by battery life.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* WIN MODAL */}
      {isWon && (
        <div className="fixed inset-0 bg-indigo-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="bg-white rounded-[2.5rem] p-10 md:p-12 text-center max-w-sm w-full shadow-2xl scale-in-center">
            <div className="text-5xl md:text-6xl mb-6">🏆</div>
            <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase text-slate-900 mb-2">
              Champion!
            </h2>
            <p className="text-slate-500 font-bold mb-8 uppercase tracking-widest text-xs">
              Final Time: {Math.floor(seconds / 60)}:
              {(seconds % 60).toString().padStart(2, "0")}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-indigo-600 text-white py-4 md:py-5 rounded-2xl font-black uppercase shadow-xl hover:scale-105 transition-transform"
            >
              Next Challenge
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
