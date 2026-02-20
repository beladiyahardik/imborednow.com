"use client";
import React, { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";

export default function CipherGrid() {
  const gameRef = useRef<HTMLDivElement>(null);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const secretCode = useRef<number[]>([]);
  const currentGuess = useRef<number[]>([]);
  const appRef = useRef<PIXI.Application | null>(null);
  const nodesRef = useRef<PIXI.Graphics[]>([]);

  const startNewGame = () => {
    setAttempts([]);
    setGameOver(false);
    setWon(false);
    currentGuess.current = [];

    const nums = Array.from({ length: 9 }, (_, i) => i);
    secretCode.current = nums.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Safeguard nodes loop against empty/null refs
    if (nodesRef.current.length > 0 && appRef.current) {
      const radius =
        Math.min(appRef.current.screen.width, appRef.current.screen.height) *
        0.08;
      nodesRef.current.forEach((node) => {
        if (node && !node.destroyed) {
          node
            .clear()
            .circle(0, 0, radius)
            .fill({ color: 0x1e293b })
            .stroke({ width: 2, color: 0x334155 });
        }
      });
    }
  };

  useEffect(() => {
    const container = gameRef.current;
    if (!container || appRef.current) return;

    const init = async () => {
      const app = new PIXI.Application();
      appRef.current = app;

      await app.init({
        background: "#0F172A",
        resizeTo: container,
        antialias: true,
        resolution: typeof window !== "undefined" ? window.devicePixelRatio : 1,
        autoDensity: true,
      });

      container.appendChild(app.canvas);

      const setupGrid = () => {
        if (!app.stage) return;
        app.stage.removeChildren();
        nodesRef.current = [];

        const gridSize = 3;
        const availableSize =
          Math.min(app.screen.width, app.screen.height) * 0.6;
        const spacing = availableSize / (gridSize - 1);
        const radius = availableSize * 0.1;

        const startX = (app.screen.width - availableSize) / 2;
        const startY = (app.screen.height - availableSize) / 2;

        for (let i = 0; i < 9; i++) {
          const col = i % gridSize;
          const row = Math.floor(i / gridSize);

          const node = new PIXI.Graphics()
            .circle(0, 0, radius)
            .fill({ color: 0x1e293b })
            .stroke({ width: 2, color: 0x334155 });

          node.x = startX + col * spacing;
          node.y = startY + row * spacing;
          node.eventMode = "static";
          node.cursor = "pointer";
          node.hitArea = new PIXI.Circle(0, 0, radius * 1.2);

          node.on("pointerdown", () => {
            if (
              gameOver ||
              currentGuess.current.length >= 3 ||
              currentGuess.current.includes(i)
            )
              return;

            currentGuess.current.push(i);
            // Visual feedback for tap
            if (node && !node.destroyed) {
              node
                .clear()
                .circle(0, 0, radius)
                .fill({ color: 0x6366f1 })
                .stroke({ width: 2, color: 0xffffff });
            }

            if (currentGuess.current.length === 3) {
              setTimeout(() => checkGuess(radius), 400);
            }
          });

          app.stage.addChild(node);
          nodesRef.current.push(node);
        }
      };

      const checkGuess = (radius: number) => {
        // Essential check: If user navigated away or grid reset during the 400ms timeout
        if (nodesRef.current.length === 0) return;

        const guess = [...currentGuess.current];
        let indigo = 0;
        let white = 0;

        guess.forEach((id, index) => {
          if (id === secretCode.current[index]) indigo++;
          else if (secretCode.current.includes(id)) white++;
        });

        const isWin = indigo === 3;
        const isLoss = !isWin && attempts.length + 1 >= 6;

        setAttempts((prev) => [{ guess, indigo, white }, ...prev]);

        if (isWin || isLoss) {
          setWon(isWin);
          setGameOver(true);
          revealMasterPattern(radius);
        } else {
          // Reset nodes visually
          nodesRef.current.forEach((node) => {
            if (node && !node.destroyed) {
              node
                .clear()
                .circle(0, 0, radius)
                .fill({ color: 0x1e293b })
                .stroke({ width: 2, color: 0x334155 });
            }
          });
        }
        currentGuess.current = [];
      };

      const revealMasterPattern = (radius: number) => {
        nodesRef.current.forEach((node) => {
          if (node && !node.destroyed) {
            node
              .clear()
              .circle(0, 0, radius)
              .fill({ color: 0x0f172a, alpha: 0.5 })
              .stroke({ width: 2, color: 0x1e293b });
          }
        });
        secretCode.current.forEach((id) => {
          const targetNode = nodesRef.current[id];
          if (targetNode && !targetNode.destroyed) {
            targetNode
              .clear()
              .circle(0, 0, radius + 2)
              .fill({ color: 0x10b981 })
              .stroke({ width: 3, color: 0xffffff });
          }
        });
      };

      setupGrid();
      startNewGame();
      app.renderer.on("resize", setupGrid);
    };

    init();

    return () => {
      // if (appRef.current) {
      //   appRef.current.destroy(true, { children: true, texture: true });
      //   appRef.current = null;
      // }
    };
  }, []);

  return (
    <div className="relative flex flex-col lg:flex-row w-full h-[85vh] lg:h-full bg-[#0F172A] overflow-hidden rounded-[2rem]">
      <div
        ref={gameRef}
        className="relative flex-grow h-[50%] lg:h-full touch-none"
      />

      <div className="w-full lg:w-[350px] h-[50%] lg:h-full bg-[#11131E]/50 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-white/10 p-6 flex flex-col shadow-2xl relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-indigo-400 font-black text-[10px] tracking-widest uppercase">
            Deduction Logs
          </h3>
          <span className="text-slate-500 text-[10px] font-bold">
            {attempts.length}/6
          </span>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto mb-6 lg:mb-0 pr-2 custom-scrollbar pb-20 lg:pb-0">
          {attempts.map((at, i) => (
            <div
              key={i}
              className="bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-between items-center animate-in slide-in-from-bottom lg:slide-in-from-right duration-300"
            >
              <div className="flex gap-1.5">
                {at.guess.map((g: number) => (
                  <div key={g} className="w-2 h-2 rounded-full bg-slate-600" />
                ))}
              </div>
              <div className="flex gap-2">
                {Array(at.indigo)
                  .fill(0)
                  .map((_, j) => (
                    <div
                      key={j}
                      className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    />
                  ))}
                {Array(at.white)
                  .fill(0)
                  .map((_, j) => (
                    <div
                      key={j}
                      className="w-3 h-3 rounded-full border-2 border-slate-500"
                    />
                  ))}
              </div>
            </div>
          ))}

          {attempts.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
              <div className="text-2xl mb-2">📡</div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                Scanning for sequence...
              </p>
            </div>
          )}
        </div>
      </div>

      {gameOver && (
        <div className="absolute inset-0 z-[200] flex items-center justify-center p-6 bg-[#0F172A]/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#1E293B] border border-white/10 w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl text-center transform animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
            <div className="mb-6">
              <span className={`text-5xl mb-4 block`}>{won ? "🎯" : "🔋"}</span>
              <h2
                className={`text-4xl font-black uppercase tracking-tighter ${won ? "text-emerald-400" : "text-slate-200"}`}
              >
                {won ? "Passed" : "Failed"}
              </h2>
              <p className="text-slate-400 text-sm mt-2 font-medium">
                {won
                  ? "Sequence successfully decrypted."
                  : "Security override triggered. Retrying..."}
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 mb-8 flex justify-center gap-4 border border-white/5">
              <div className="text-left">
                <p className="text-[10px] text-slate-500 uppercase font-black">
                  Attempts
                </p>
                <p className="text-xl font-bold text-white">
                  {attempts.length}/6
                </p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-left">
                <p className="text-[10px] text-slate-500 uppercase font-black">
                  Accuracy
                </p>
                <p className="text-xl font-bold text-white">
                  {won ? "100%" : "0%"}
                </p>
              </div>
            </div>

            <button
              onClick={startNewGame}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
            >
              NEW ATTEMPT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
