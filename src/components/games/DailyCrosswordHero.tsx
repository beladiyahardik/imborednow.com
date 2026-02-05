import React, { useState, useEffect, useRef } from "react";

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
};

export default function DailyCrosswordHero() {
  const [gridState, setGridState] = useState<string[][]>([]);
  const [hintedCells, setHintedCells] = useState<string[]>([]);
  const [focus, setFocus] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const [direction, setDirection] = useState<"across" | "down">("across");
  const [isWon, setIsWon] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const inputRefs = useRef<any>({});

  useEffect(() => {
    const emptyGrid = DAILY_PUZZLE.grid.map((row) =>
      row.split("").map((char) => (char === "." ? "." : ""))
    );
    setGridState(emptyGrid);
    const timer = setInterval(() => {
      if (!isWon) setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isWon]);

  const getCellNumber = (r: number, c: number) => {
    if (DAILY_PUZZLE.grid[r][c] === ".") return null;
    let n = 0;
    for (let i = 0; i < DAILY_PUZZLE.dimensions.rows; i++) {
      for (let j = 0; j < DAILY_PUZZLE.dimensions.cols; j++) {
        if (DAILY_PUZZLE.grid[i][j] === ".") continue;
        if (i === 0 || DAILY_PUZZLE.grid[i - 1][j] === "." || j === 0 || DAILY_PUZZLE.grid[i][j - 1] === ".") {
          n++;
          if (i === r && j === c) return n;
        }
      }
    }
    return null;
  };

  const getCurrentClue = () => {
    let { r, c } = focus;
    if (direction === "across") {
      while (c > 0 && DAILY_PUZZLE.grid[r][c - 1] !== ".") c--;
    } else {
      while (r > 0 && DAILY_PUZZLE.grid[r - 1][c] !== ".") r--;
    }
    const cellNum = getCellNumber(r, c);
    const clueList = direction === "across" ? DAILY_PUZZLE.clues.across : DAILY_PUZZLE.clues.down;
    return clueList.find((item) => item.number === cellNum)?.text || "Select a square";
  };

  const checkWin = (grid: string[][]) => {
    const win = grid.every((row, ri) =>
      row.every((cell, ci) => DAILY_PUZZLE.grid[ri][ci] === "." || cell === DAILY_PUZZLE.grid[ri][ci])
    );
    if (win) setIsWon(true);
  };

  const moveFocus = (r: number, c: number, step: number) => {
    let nR = r, nC = c;
    direction === "across" ? (nC += step) : (nR += step);
    if (nR >= 0 && nR < DAILY_PUZZLE.dimensions.rows && nC >= 0 && nC < DAILY_PUZZLE.dimensions.cols) {
      if (DAILY_PUZZLE.grid[nR][nC] === ".") moveFocus(nR, nC, step);
      else {
        setFocus({ r: nR, c: nC });
        inputRefs.current[`${nR}-${nC}`]?.focus();
      }
    }
  };

  const handleInputChange = (r: number, c: number, value: string) => {
    const val = value.slice(-1).toUpperCase();
    const newGrid = gridState.map((row, ri) => row.map((col, ci) => (ri === r && ci === c ? val : col)));
    setGridState(newGrid);
    checkWin(newGrid);
    if (val) moveFocus(r, c, 1);
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

  if (gridState.length === 0) return null;

  return (
    <>
      {/* NAVIGATION WRAPPED IN COMPONENT */}
      <nav className="bg-white/70 backdrop-blur-xl border-b border-white py-4 px-6 md:px-8 sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter italic uppercase text-indigo-900 leading-none">
            The Master
          </h1>
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest text-left">
            {DAILY_PUZZLE.date}
          </span>
        </div>
        <div className="bg-indigo-600 text-white px-4 md:px-5 py-2 rounded-2xl font-mono font-black text-xs md:text-sm shadow-lg shadow-indigo-200">
          {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, "0")}
        </div>
      </nav>

      {/* GAME AREA WRAPPED IN COMPONENT */}
      <main className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
          <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-8 shadow-2xl border border-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
            <div className="flex justify-center w-full overflow-hidden md:overflow-visible">
              <div className="origin-top transform-gpu scale-[0.85] xs:scale-95 sm:scale-100 md:scale-100 transition-transform mb-[-40px] xs:mb-[-20px] sm:mb-0 w-full flex justify-center">
                <div className="grid bg-slate-900 p-[2px] w-full max-w-[550px] aspect-square rounded-xl overflow-hidden shadow-2xl"
                     style={{ gridTemplateColumns: `repeat(${DAILY_PUZZLE.dimensions.cols}, minmax(0, 1fr))`, gap: "2px" }}>
                  {gridState.map((row, r) =>
                    row.map((cellVal, c) => {
                      const isBlock = DAILY_PUZZLE.grid[r][c] === ".";
                      const isFocused = focus.r === r && focus.c === c;
                      const isInPath = direction === "across" ? focus.r === r : focus.c === c;
                      if (isBlock) return <div key={`${r}-${c}`} className="bg-slate-900" />;
                      return (
                        <div key={`${r}-${c}`} className="relative bg-white group">
                          {getCellNumber(r, c) && (
                            <span className="absolute top-0.5 left-0.5 text-[7px] md:text-[10px] font-black text-slate-400">
                              {getCellNumber(r, c)}
                            </span>
                          )}
                          <input
                            ref={(el) => { inputRefs.current[`${r}-${c}`] = el; }}
                            type="text"
                            maxLength={1}
                            value={cellVal}
                            onFocus={(e) => { setFocus({ r, c }); e.target.select(); }}
                            onChange={(e) => handleInputChange(r, c, e.target.value)}
                            className={`w-full h-full text-center font-black uppercase outline-none transition-all caret-transparent text-sm sm:text-lg md:text-xl ${isFocused ? "bg-indigo-600 text-white z-20 scale-105 shadow-xl rounded-sm" : isInPath ? "bg-indigo-50" : "bg-white"} ${hintedCells.includes(`${r}-${c}`) ? "text-purple-600" : ""}`}
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:pt-0">
            <div className="bg-indigo-900 text-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl relative overflow-hidden group">
              <div className="relative z-10 text-left">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300 block mb-2 text-left">
                  {direction} Clue
                </span>
                <p className="text-lg md:text-2xl font-bold leading-tight italic text-left">"{getCurrentClue()}"</p>
              </div>
              <div className="absolute -bottom-4 -right-4 text-6xl md:text-8xl opacity-10 font-black italic group-hover:scale-110 transition-transform">
                {direction === "across" ? "→" : "↓"}
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setDirection((d) => (d === "across" ? "down" : "across"))} className="flex-1 bg-white border border-slate-200 py-4 rounded-2xl md:rounded-3xl text-xs font-black uppercase hover:shadow-lg transition-all active:scale-95">↻ Switch</button>
              <button onClick={revealHint} className="flex-1 bg-white border border-slate-200 py-4 rounded-2xl md:rounded-3xl text-xs font-black uppercase hover:shadow-lg transition-all active:scale-95 text-purple-600">💡 Hint</button>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-lg border border-slate-100 max-h-[300px] md:max-h-[350px] overflow-y-auto custom-scrollbar">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex justify-between">Clue List <span className="text-indigo-600">●</span></h3>
              <div className="space-y-8 text-sm text-left">
                {["across", "down"].map((dir) => (
                  <div key={dir}>
                    <h4 className="text-[10px] font-black uppercase text-indigo-600 mb-4 text-left">{dir}</h4>
                    <div className="space-y-3">
                      {(DAILY_PUZZLE.clues as any)[dir].map((c: any) => (
                        <div key={c.number} className={`flex gap-3 leading-snug text-left ${direction === dir && getCurrentClue() === c.text ? "text-indigo-600 font-bold" : "text-slate-500"}`}>
                          <span className="opacity-40 font-bold">{c.number}</span>
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
      </main>

      {isWon && (
        <div className="fixed inset-0 bg-indigo-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] p-10 md:p-12 text-center max-w-sm w-full shadow-2xl">
            <div className="text-5xl md:text-6xl mb-6">🏆</div>
            <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase text-slate-900 mb-2">Champion!</h2>
            <p className="text-slate-500 font-bold mb-8 uppercase tracking-widest text-xs">
              Final Time: {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, "0")}
            </p>
            <button onClick={() => window.location.reload()} className="w-full bg-indigo-600 text-white py-4 md:py-5 rounded-2xl font-black uppercase shadow-xl hover:scale-105 transition-transform">Next Challenge</button>
          </div>
        </div>
      )}
    </>
  );
}