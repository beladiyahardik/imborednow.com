"use client";
import React, { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";

export default function NeuralLink() {
  const gameRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);

  const appRef = useRef<PIXI.Application | null>(null);
  const nodesRef = useRef<PIXI.Graphics[]>([]);
  const sequence = useRef<number[]>([]);
  const userSequence = useRef<number[]>([]);
  const isDisplaying = useRef(false);

  // Helper to re-draw the grid (Fixes the dot size bug)
  const setupGrid = () => {
    if (!appRef.current) return;
    const app = appRef.current;

    app.stage.removeChildren();
    nodesRef.current = [];
    const size = 4;

    // Responsive grid sizing
    const padding = 40;
    const available =
      Math.min(app.screen.width - padding, app.screen.height - padding) * 0.9;
    const spacing = available / size;
    const radius = spacing * 0.38;

    const offset = (app.screen.width - available) / 2 + spacing / 2;
    const topOffset = (app.screen.height - available) / 2 + spacing / 2;

    for (let i = 0; i < 16; i++) {
      const x = (i % size) * spacing + offset;
      const y = Math.floor(i / size) * spacing + topOffset;

      const node = new PIXI.Graphics()
        .circle(0, 0, radius)
        .fill({ color: 0x1e293b })
        .stroke({ width: 2, color: 0x334155 });

      node.x = x;
      node.y = y;
      node.eventMode = "static";
      node.cursor = "pointer";
      node.hitArea = new PIXI.Circle(0, 0, radius * 1.3);
      node.on("pointerdown", () => handleNodeClick(i, radius));

      app.stage.addChild(node);
      nodesRef.current.push(node);
    }
  };

  const startNextLevel = async () => {
    userSequence.current = [];
    isDisplaying.current = true;
    sequence.current.push(Math.floor(Math.random() * 16));

    for (const nodeId of sequence.current) {
      if (!appRef.current) break;
      await flashNode(nodeId);
      await new Promise((r) => setTimeout(r, Math.max(100, 250 - level * 10)));
    }
    isDisplaying.current = false;
  };

  const flashNode = (id: number) => {
    return new Promise<void>((resolve) => {
      const node = nodesRef.current[id];
      if (!node) return resolve();

      const radius = node.width / 2;
      node
        .clear()
        .circle(0, 0, radius)
        .fill({ color: 0x22d3ee })
        .stroke({ width: 4, color: 0xffffff });

      setTimeout(
        () => {
          if (node) {
            node
              .clear()
              .circle(0, 0, radius)
              .fill({ color: 0x1e293b })
              .stroke({ width: 2, color: 0x334155 });
          }
          resolve();
        },
        Math.max(150, 450 - level * 15),
      );
    });
  };

  const handleNodeClick = (id: number, radius: number) => {
    if (gameOver || isDisplaying.current) return;

    userSequence.current.push(id);
    const currentIndex = userSequence.current.length - 1;
    const node = nodesRef.current[id];

    if (id === sequence.current[currentIndex]) {
      node
        .clear()
        .circle(0, 0, radius)
        .fill({ color: 0x6366f1 })
        .stroke({ width: 2, color: 0xffffff });
      setTimeout(() => {
        if (node)
          node
            .clear()
            .circle(0, 0, radius)
            .fill({ color: 0x1e293b })
            .stroke({ width: 2, color: 0x334155 });
      }, 200);

      if (userSequence.current.length === sequence.current.length) {
        setScore((s) => s + level * 100);
        setLevel((l) => l + 1);
        setTimeout(startNextLevel, 800);
      }
    } else {
      setGameOver(true);
      if (score > highScore) setHighScore(score);
    }
  };

  const resetGame = () => {
    sequence.current = [];
    userSequence.current = [];
    setScore(0);
    setLevel(1);
    setGameOver(false);

    // Explicitly reset the grid graphics to initial state
    setupGrid();
    setTimeout(startNextLevel, 600);
  };

  useEffect(() => {
    const container = gameRef.current;
    if (!container || appRef.current) return;

    const init = async () => {
      const app = new PIXI.Application();
      appRef.current = app;
      await app.init({
        backgroundAlpha: 0,
        resizeTo: container,
        antialias: true,
        resolution: typeof window !== "undefined" ? window.devicePixelRatio : 1,
        autoDensity: true,
      });
      container.appendChild(app.canvas);

      setupGrid();
      resetGame();
      app.renderer.on("resize", setupGrid);
    };

    init();
    // return () => {
    //   if (appRef.current) {
    //     appRef.current.destroy(true, { children: true, texture: true });
    //     appRef.current = null;
    //   }
    // };
  }, []);

  return (
    <div className="relative w-full h-auto lg:h-full bg-[#020617] overflow-hidden rounded-[2rem] border border-white/5 flex flex-col">
      <div className="absolute top-6 left-6 lg:top-8 lg:left-8 z-20 pointer-events-none">
        <p className="text-cyan-400 font-black text-[10px] tracking-widest uppercase mb-1">
          Neural Synapse
        </p>
        <h2 className="text-white text-3xl lg:text-4xl font-black italic tracking-tighter">
          {score}
        </h2>
      </div>

      <div ref={gameRef} className="flex-grow w-full h-full touch-none" />

      {gameOver && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-6 animate-in fade-in duration-300">
          <div className="text-center transform animate-in zoom-in-95 duration-300">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 border border-red-500/20">
              <span className="text-4xl">⚠️</span>
            </div>
            <h3 className="text-white text-4xl lg:text-5xl font-black mb-2 italic tracking-tighter uppercase leading-none">
              Link Severed
            </h3>
            <p className="text-slate-400 mb-8 font-medium text-sm lg:text-base">
              Neural capacity reached{" "}
              <span className="text-cyan-400">Level {level}</span>
            </p>
            <button
              onClick={resetGame}
              className="w-full lg:w-auto px-12 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl transition-all shadow-xl shadow-cyan-500/20 active:scale-95 uppercase tracking-widest text-xs"
            >
              Reconnect Synapse
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
