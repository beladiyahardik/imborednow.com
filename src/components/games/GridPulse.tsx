"use client";
import React, { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";

export default function GridPulse() {
  const gameRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const scoreRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = gameRef.current;
    if (!container) return;

    const app = new PIXI.Application();
    let squares: PIXI.Graphics[] = [];
    let activeTarget: number | null = null;
    let isInitialized = false;

    const init = async () => {
      await app.init({
        background: "#0F172A",
        resizeTo: container, // Listens to the div size
        antialias: true,
        resolution: typeof window !== "undefined" ? window.devicePixelRatio : 1,
        autoDensity: true,
      });

      if (!container) return;
      container.appendChild(app.canvas);
      isInitialized = true;

      // --- RESPONSIVE GRID LOGIC ---
      const setupGrid = () => {
        app.stage.removeChildren();
        squares = [];

        const gridSize = 3;
        // Logic: Use 90% of the narrowest dimension (width or height)
        const availableSize =
          Math.min(app.screen.width, app.screen.height) * 0.85;
        const margin = availableSize * 0.05; // 5% margin between squares
        const cellSize = (availableSize - margin * (gridSize - 1)) / gridSize;

        const startX = (app.screen.width - availableSize) / 2;
        const startY = (app.screen.height - availableSize) / 2;

        for (let i = 0; i < gridSize * gridSize; i++) {
          const col = i % gridSize;
          const row = Math.floor(i / gridSize);

          const square = new PIXI.Graphics();
          drawSquare(square, cellSize, 0x1e293b, 0.5, 2, 0x334155);

          square.x = startX + col * (cellSize + margin);
          square.y = startY + row * (cellSize + margin);

          square.eventMode = "static";
          square.cursor = "pointer";
          // Larger hit area for easier mobile tapping
          square.hitArea = new PIXI.Rectangle(0, 0, cellSize, cellSize);

          square.on("pointerdown", (e) => {
            e.stopPropagation();
            handleTap(i, cellSize);
          });

          app.stage.addChild(square);
          squares.push(square);
        }

        // If we were mid-game during a resize, keep the target
        if (activeTarget !== null) {
          drawSquare(
            squares[activeTarget],
            cellSize,
            0x6366f1,
            0.9,
            4,
            0xffffff,
          );
        } else {
          spawnPulse(cellSize);
        }
      };

      const drawSquare = (
        g: PIXI.Graphics,
        size: number,
        color: number,
        alpha: number,
        strokeW: number,
        strokeC: number,
      ) => {
        g.clear()
          .roundRect(0, 0, size, size, size * 0.15) // Border radius scales with size
          .fill({ color, alpha })
          .stroke({ width: strokeW, color: strokeC });
      };

      const spawnPulse = (size: number) => {
        if (gameOver || !isInitialized) return;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        squares.forEach((s) => drawSquare(s, size, 0x1e293b, 0.5, 2, 0x334155));

        const rand = Math.floor(Math.random() * squares.length);
        activeTarget = rand;

        drawSquare(squares[rand], size, 0x6366f1, 0.9, 4, 0xffffff);

        const timeLimit = Math.max(450, 1500 - scoreRef.current * 25);
        timeoutRef.current = setTimeout(() => {
          if (activeTarget !== null) setGameOver(true);
        }, timeLimit);
      };

      const handleTap = (index: number, size: number) => {
        if (gameOver) return;
        if (index === activeTarget) {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          activeTarget = null;
          setScore((s) => {
            scoreRef.current = s + 1;
            return s + 1;
          });
          spawnPulse(size);
        } else {
          setGameOver(true);
        }
      };

      // Initial Build
      setupGrid();

      // Listen for window/container resize
      app.renderer.on("resize", () => {
        if (isInitialized) setupGrid();
      });
    };

    init();

    return () => {
      isInitialized = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (app.renderer) (app.renderer as any).resizeTo = null;
      setTimeout(() => {
        if (app?.renderer) {
          try {
            // Force the internal plugin to stop if it exists
            (app.renderer as any).resizeTo = null;
            app.destroy(true, { children: true, texture: true });
          } catch (err) {
            console.warn("Pixi cleanup handled safely:", err);
          }
        }
      }, 0);
    };
  }, [gameOver]);

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[600px] flex items-center justify-center bg-[#0F172A] overflow-hidden">
      {/* Container for Pixi */}
      <div
        ref={gameRef}
        className="w-full h-full absolute inset-0 touch-none"
      />

      {/* HUD - Scaled for Mobile */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10 pointer-events-none">
        <p className="text-indigo-400 text-[9px] md:text-[11px] font-black tracking-[0.2em] uppercase mb-1">
          Neural Sync
        </p>
        <p className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl">
          {score}
        </p>
      </div>

      {/* Responsive Game Over Overlay */}
      {gameOver && (
        <div className="absolute inset-0 bg-[#0F172A]/95 backdrop-blur-xl flex items-center justify-center z-20 p-4">
          <div className="bg-[#11131E] p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 text-center shadow-2xl max-w-sm w-full animate-in zoom-in duration-200">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-600/20 text-indigo-500 rounded-full flex items-center justify-center text-2xl md:text-3xl mx-auto mb-6 border border-indigo-500/30">
              ⚡
            </div>
            <h2 className="text-white text-3xl md:text-4xl font-black mb-2 tracking-tighter uppercase">
              Sync Lost
            </h2>
            <p className="text-slate-400 text-sm md:text-base font-medium mb-8">
              Neural connection dropped at {score} pulses.
            </p>
            <button
              onClick={() => {
                setScore(0);
                scoreRef.current = 0;
                setGameOver(false);
              }}
              className="w-full py-4 md:py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-500 active:scale-95 transition-all shadow-[0_15px_30px_rgba(79,70,229,0.3)]"
            >
              REBOOT MODULE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
