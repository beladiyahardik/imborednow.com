/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/purity */
"use client";
import React, { useState, useRef, useEffect } from "react";

const PaletteIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);
const EraserIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
    <path d="M22 21H7" />
    <path d="m5 11 9 9" />
  </svg>
);
const TrashIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
);
const DownloadIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);
const SparklesIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);
const ZapIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

type MoodKey = "vibrant" | "neon" | "pastel" | "midnight" | "fire" | "ocean";

const MoodPixelArtBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#FF6B6B");
  const [gridSize] = useState(32);
  const [pixels, setPixels] = useState<Record<string, string>>({});
  const [tool, setTool] = useState<"brush" | "eraser">("brush");
  const [mood, setMood] = useState<MoodKey>("vibrant");

  const moods: Record<MoodKey, { name: string; colors: string[]; bg: string }> =
    {
      vibrant: {
        name: "🌈 Vibrant",
        colors: [
          "#FF6B6B",
          "#4ECDC4",
          "#45B7D1",
          "#FFA07A",
          "#98D8C8",
          "#F7DC6F",
          "#BB8FCE",
          "#85C1E2",
        ],
        bg: "from-pink-500 to-purple-500",
      },
      neon: {
        name: "⚡ Neon",
        colors: [
          "#FF00FF",
          "#00FFFF",
          "#FFFF00",
          "#FF1493",
          "#00FF00",
          "#FF4500",
          "#9D00FF",
          "#00CED1",
        ],
        bg: "from-purple-900 to-black",
      },
      pastel: {
        name: "🌸 Pastel",
        colors: [
          "#FFB6C1",
          "#B4E7CE",
          "#C5A3FF",
          "#FFD4B2",
          "#A8D8EA",
          "#FFEAA7",
          "#DFE6E9",
          "#FAB1A0",
        ],
        bg: "from-pink-200 to-blue-200",
      },
      midnight: {
        name: "🌙 Midnight",
        colors: [
          "#2C3E50",
          "#34495E",
          "#5D6D7E",
          "#85929E",
          "#ABB2B9",
          "#D5D8DC",
          "#E8DAEF",
          "#D6EAF8",
        ],
        bg: "from-gray-900 to-blue-900",
      },
      fire: {
        name: "🔥 Fire",
        colors: [
          "#FF0000",
          "#FF4500",
          "#FF6347",
          "#FF7F50",
          "#FFA500",
          "#FFD700",
          "#FFFF00",
          "#FFF8DC",
        ],
        bg: "from-red-600 to-yellow-500",
      },
      ocean: {
        name: "🌊 Ocean",
        colors: [
          "#001F3F",
          "#0074D9",
          "#39CCCC",
          "#3D9970",
          "#2ECC40",
          "#01FF70",
          "#7FDBFF",
          "#B0E0E6",
        ],
        bg: "from-blue-900 to-teal-400",
      },
    };

  const cellSize = 400 / gridSize;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, 400, 400);
    ctx.strokeStyle = "#2a2a2a";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, 400);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(400, i * cellSize);
      ctx.stroke();
    }
    Object.entries(pixels).forEach(([key, color]) => {
      const [x, y] = key.split(",").map(Number);
      ctx.fillStyle = color;
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    });
  }, [pixels, cellSize, gridSize]);

  const getPixelPosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor((e.clientX - rect.left) / cellSize),
      y: Math.floor((e.clientY - rect.top) / cellSize),
    };
  };

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getPixelPosition(e);
    if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) return;
    const key = `${x},${y}`;
    const newPixels = { ...pixels };
    if (tool === "brush") newPixels[key] = currentColor;
    else if (tool === "eraser") delete newPixels[key];
    setPixels(newPixels);
  };

  const clearCanvas = () => setPixels({});
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "pixel-art.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const randomFill = () => {
    const colors = moods[mood].colors;
    const newPixels: Record<string, string> = {};
    for (let i = 0; i < 100; i++) {
      const x = Math.floor(Math.random() * gridSize),
        y = Math.floor(Math.random() * gridSize);
      newPixels[`${x},${y}`] =
        colors[Math.floor(Math.random() * colors.length)];
    }
    setPixels({ ...pixels, ...newPixels });
  };

  return (
    <div className={`bg-gradient-to-br ${moods[mood].bg} p-8`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Mood Pixel Art Board
          </h1>
          <p className="text-white/80 text-lg">
            Draw pixel art that matches your vibe ✨
          </p>
        </div>
        <div className="grid md:grid-cols-[400px,1fr] gap-8">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              onMouseDown={(e) => {
                setIsDrawing(true);
                handleDraw(e);
              }}
              onMouseMove={(e) => isDrawing && handleDraw(e)}
              onMouseUp={() => setIsDrawing(false)}
              onMouseLeave={() => setIsDrawing(false)}
              className="border-4 border-white/20 rounded-lg cursor-crosshair shadow-xl"
            />
          </div>
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                <SparklesIcon /> Choose Your Mood
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(moods).map(([key, moodData]: any) => (
                  <button
                    key={key}
                    onClick={() => setMood(key)}
                    className={`px-4 py-3 rounded-xl font-semibold transition-all ${mood === key ? "bg-white text-gray-900 scale-105 shadow-lg" : "bg-white/20 text-white hover:bg-white/30"}`}
                  >
                    {moodData.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                <PaletteIcon /> Colors
              </h3>
              <div className="grid grid-cols-8 gap-2">
                {moods[mood]?.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => {
                      setCurrentColor(color);
                      setTool("brush");
                    }}
                    className={`w-12 h-12 rounded-lg transition-transform hover:scale-110 ${currentColor === color && tool === "brush" ? "ring-4 ring-white scale-110" : ""}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
              <h3 className="text-white font-bold text-xl mb-4">Tools</h3>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setTool("brush")}
                  className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${tool === "brush" ? "bg-white text-gray-900 shadow-lg" : "bg-white/20 text-white hover:bg-white/30"}`}
                >
                  <PaletteIcon /> Brush
                </button>
                <button
                  onClick={() => setTool("eraser")}
                  className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${tool === "eraser" ? "bg-white text-gray-900 shadow-lg" : "bg-white/20 text-white hover:bg-white/30"}`}
                >
                  <EraserIcon /> Eraser
                </button>
                <button
                  onClick={randomFill}
                  className="px-6 py-3 rounded-xl font-semibold bg-white/20 text-white hover:bg-white/30 flex items-center gap-2 transition-all"
                >
                  <ZapIcon /> Random
                </button>
                <button
                  onClick={clearCanvas}
                  className="px-6 py-3 rounded-xl font-semibold bg-red-500/80 text-white hover:bg-red-600 flex items-center gap-2 transition-all"
                >
                  <TrashIcon /> Clear
                </button>
                <button
                  onClick={downloadImage}
                  className="px-6 py-3 rounded-xl font-semibold bg-green-500/80 text-white hover:bg-green-600 flex items-center gap-2 transition-all"
                >
                  <DownloadIcon /> Download
                </button>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-white">
                    {Object.keys(pixels).length}
                  </div>
                  <div className="text-white/70 text-sm">Pixels Drawn</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {gridSize}×{gridSize}
                  </div>
                  <div className="text-white/70 text-sm">Grid Size</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MoodPixelArtBoard;
