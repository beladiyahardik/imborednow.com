import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";

export default function ScaryMazePrank() {
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [showScare, setShowScare] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const levels = [
    { walls: 15, scareLevel: 1 },
    { walls: 20, scareLevel: 2 },
    { walls: 25, scareLevel: 3 }, // Final level triggers the scare
  ];

  useEffect(() => {
    if (showScare) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawMaze = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Start
      ctx.fillStyle = "#0f0";
      ctx.fillRect(20, canvas.height / 2 - 30, 60, 60);

      // End
      ctx.fillStyle = "#f00";
      ctx.fillRect(canvas.width - 80, canvas.height / 2 - 30, 60, 60);

      // Walls
      const currentLevel = levels[level - 1];
      for (let i = 0; i < currentLevel.walls; i++) {
        const x = 100 + (i * (canvas.width - 200)) / currentLevel.walls;
        const h = Math.random() * 200 + 100;
        const gap = Math.random() * 100 + 50;
        const top = Math.random() > 0.5;

        ctx.fillStyle = "#444";
        if (top) {
          ctx.fillRect(x - 20, 0, 40, canvas.height / 2 - gap / 2);
          ctx.fillRect(x - 20, canvas.height / 2 + gap / 2, 40, canvas.height);
        } else {
          ctx.fillRect(x - 20, 0, 40, canvas.height / 2 - gap / 2 - 50);
          ctx.fillRect(x - 20, canvas.height / 2 + gap / 2 + 50, 40, canvas.height);
        }
      }

      // Instructions
      ctx.fillStyle = "#fff";
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`Level ${level} - Move to the red box`, canvas.width / 2, 60);
      ctx.font = "20px Arial";
      ctx.fillText("Don't touch the walls!", canvas.width / 2, 100);
    };

    const checkCollision = () => {
      // Simple wall collision zones
      const walls = levels[level - 1].walls;
      for (let i = 0; i < walls; i++) {
        const x = 100 + (i * (canvas.width - 200)) / walls;
        if (Math.abs(mousePos.x - x) < 40 && mousePos.y > 100 && mousePos.y < canvas.height - 100) {
          return true;
        }
      }
      return false;
    };

    const checkWin = () => {
      return mousePos.x > canvas.width - 100 && Math.abs(mousePos.y - canvas.height / 2) < 60;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });

      // Start zone
      if (level === 1 && x < 100 && Math.abs(y - canvas.height / 2) < 50) {
        return;
      }

      if (checkCollision()) {
        setGameOver(true);
        setTimeout(() => {
          setLevel(1);
          setGameOver(false);
        }, 2000);
      }

      if (checkWin()) {
        if (level === 3) {
          // TRIGGER THE SCARE!
          setShowScare(true);
          // Play scream sound (base64 embedded short scream)
          const audio = new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=");
          audio.volume = 1.0;
          audio.play();
        } else {
          setLevel(prev => prev + 1);
        }
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    drawMaze();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [level, mousePos, showScare]);

  return (
    <>
      <Head>
        <title>Scary Maze Game - Can You Beat Level 3?</title>
        <meta name="robots" content="noindex" />
        <meta name="description" content="Classic scary maze prank – don't touch the walls!" />
      </Head>

      <div className="fixed inset-0 bg-black flex items-center justify-center">
        {!showScare ? (
          <>
            <canvas
              ref={canvasRef}
              width={window.innerWidth * 0.9}
              height={window.innerHeight * 0.8}
              className="border-4 border-gray-800 rounded-2xl shadow-2xl"
            />

            {gameOver && (
              <div className="absolute inset-0 bg-red-900/90 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-8xl font-black mb-8 animate-pulse">YOU LOST!</h1>
                  <p className="text-4xl">Try again...</p>
                </div>
              </div>
            )}

            <div className="absolute top-8 left-8 text-white">
              <p className="text-2xl font-bold">Scary Maze Game</p>
              <p className="text-lg opacity-80">Level {level} of 3</p>
            </div>
          </>
        ) : (
          // THE JUMPSCARE
          <div className="fixed inset-0 bg-black flex items-center justify-center">
            <img
              src="https://i.imgur.com/7yL2W0q.jpeg" // Classic Regan/Exorcist face (public domain scare image)
              alt="SCREAM"
              className="w-full h-full object-cover animate-pulse"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-9xl font-black text-red-600 animate-glitch">
                AAAAAHHHH!!!
              </h1>
            </div>
          </div>
        )}

        {/* Escape after scare */}
        {showScare && (
          <button
            onClick={() => window.location.href = "/"}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 px-12 py-6 text-3xl font-bold bg-purple-600 text-white rounded-full hover:bg-pink-600 hover:scale-110 transition-all z-50"
          >
            😱 ESCAPE THE MAZE 😱
          </button>
        )}

        {/* Tiny hint */}
        <p className="fixed bottom-4 right-4 text-gray-600 text-xs opacity-50">
          Prank by I'm Bored Now • Turn volume UP for full effect
        </p>
      </div>

      <style jsx>{`
        @keyframes glitch {
          0% { text-shadow: 0.05em 0 0 #f00, -0.05em 0 0 #0ff; }
          14% { text-shadow: 0 0 0 #f00, 0 0 0 #0ff; }
          15% { text-shadow: -0.05em -0.05em #f00, 0.05em 0.05em #0ff; }
          49% { text-shadow: -0.05em -0.05em #f00, 0.05em 0.05em #0ff; }
          50% { text-shadow: 0.025em 0.05em #f00, -0.025em -0.05em #0ff; }
          99% { text-shadow: 0.025em 0.05em #f00, -0.025em -0.05em #0ff; }
          100% { text-shadow: none; }
        }
        .animate-glitch {
          animation: glitch 0.3s infinite;
        }
      `}</style>
    </>
  );
}