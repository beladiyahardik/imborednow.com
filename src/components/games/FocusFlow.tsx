"use client";
import React, { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";

interface Distraction extends PIXI.Graphics {
  velocity?: { x: number; y: number };
}

export default function FocusFlow() {
  const gameRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Ref to track score in real-time inside the Pixi ticker/timeouts
  const scoreRef = useRef(0);

  useEffect(() => {
    const container = gameRef.current;
    if (!container) return;

    const app = new PIXI.Application();
    let sceneActive = true;
    const distractions: Distraction[] = [];
    let core: PIXI.Graphics;

    // 1. Function to disable the Inspect/Context menu
    const disableContextMenu = (e: Event) => e.preventDefault();

    const init = async () => {
      await app.init({
        background: "#f8fafc",
        resizeTo: container,
        antialias: true,
        resolution: typeof window !== "undefined" ? window.devicePixelRatio : 1,
        autoDensity: true,
      });

      if (container) {
        container.appendChild(app.canvas);

        // --- UI FIXES ---
        app.canvas.style.touchAction = "none"; // Fixes mobile scrolling
        container.addEventListener("contextmenu", disableContextMenu); // Fixes Inspect Menu
      }

      // --- GAME OBJECTS ---
      core = new PIXI.Graphics()
        .circle(0, 0, 35)
        .fill({ color: 0x4f46e5, alpha: 0.2 })
        .stroke({ width: 2, color: 0x4f46e5 });

      core.x = app.screen.width / 2;
      core.y = app.screen.height / 2;
      app.stage.addChild(core);

      app.renderer.on("resize", () => {
        if (core) {
          core.x = app.screen.width / 2;
          core.y = app.screen.height / 2;
        }
      });

      // --- PARTICLE SYSTEM ---
      const createParticles = (x: number, y: number) => {
        for (let i = 0; i < 6; i++) {
          const p = new PIXI.Graphics().circle(0, 0, 2.5).fill(0x4f46e5);
          p.x = x;
          p.y = y;
          const v = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8,
          };
          app.stage.addChild(p);

          const pTicker = (ticker: PIXI.Ticker) => {
            p.x += v.x * ticker.deltaTime;
            p.y += v.y * ticker.deltaTime;
            p.alpha -= 0.04 * ticker.deltaTime;
            if (p.alpha <= 0) {
              app.stage.removeChild(p);
              app.ticker.remove(pTicker);
              p.destroy();
            }
          };
          app.ticker.add(pTicker);
        }
      };

      // --- SPAWNING LOGIC (Logarithmic Difficulty) ---
      const spawnDistraction = () => {
        if (!sceneActive || gameOver) return;

        const distraction: Distraction = new PIXI.Graphics()
          .rect(-12, -12, 24, 24)
          .fill(0x0f172a);

        const angle = Math.random() * Math.PI * 2;
        const spawnRadius = Math.max(app.screen.width, app.screen.height) * 0.8;

        distraction.x = core.x + Math.cos(angle) * spawnRadius;
        distraction.y = core.y + Math.sin(angle) * spawnRadius;
        distraction.eventMode = "static";
        distraction.cursor = "pointer";

        distraction.on("pointerdown", (e: PIXI.FederatedPointerEvent) => {
          e.stopPropagation();
          setScore((prev) => {
            const newScore = prev + 1;
            scoreRef.current = newScore;
            return newScore;
          });
          createParticles(distraction.x, distraction.y);
          app.stage.removeChild(distraction);
          const idx = distractions.indexOf(distraction);
          if (idx > -1) distractions.splice(idx, 1);
          distraction.destroy();
        });

        app.stage.addChild(distraction);
        distractions.push(distraction);

        // Difficulty curve: Starts at 1000ms, floor at 350ms
        const nextDelay = Math.max(350, 1000 - scoreRef.current * 6);
        setTimeout(spawnDistraction, nextDelay);
      };

      // --- MAIN TICKER ---
      app.ticker.add((ticker: PIXI.Ticker) => {
        if (gameOver) return;

        for (let i = distractions.length - 1; i >= 0; i--) {
          const d = distractions[i];
          const dx = core.x - d.x;
          const dy = core.y - d.y;
          const angle = Math.atan2(dy, dx);

          // Speed curve: Starts at 1.2, floor at 4.5
          const currentSpeed = 1.2 + scoreRef.current / 35;
          const cappedSpeed = Math.min(currentSpeed, 4.5);

          d.x += Math.cos(angle) * cappedSpeed * ticker.deltaTime;
          d.y += Math.sin(angle) * cappedSpeed * ticker.deltaTime;
          d.rotation += 0.03 * ticker.deltaTime;

          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 45) {
            setGameOver(true);
            sceneActive = false;
          }
        }
      });

      spawnDistraction();
    };

    init();

    return () => {
      sceneActive = false;
      if (container) {
        container.removeEventListener("contextmenu", disableContextMenu);
      }

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
    <div
      className="relative w-full h-full min-h-[400px] md:min-h-[500px] select-none"
      style={{ userSelect: "none", WebkitUserSelect: "none" }}
    >
      {/* HUD */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none select-none">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
          Score
        </p>
        <p className="text-3xl font-black text-slate-900 leading-none">
          {score}
        </p>
      </div>

      {/* Game Canvas */}
      <div
        ref={gameRef}
        className="w-full h-full absolute inset-0 touch-none overflow-hidden"
      />

      {/* Game Over Screen */}
      {gameOver && (
        <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-20">
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl max-w-xs w-full animate-in zoom-in duration-300">
            <h2 className="text-slate-900 text-3xl font-black mb-2">
              Focus Broken
            </h2>
            <p className="text-indigo-600 text-lg font-bold mb-6">
              Score: {score}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
