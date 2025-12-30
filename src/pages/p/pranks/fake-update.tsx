import { useState, useEffect } from "react";

export default function FakeUpdatePrank() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("configuring");
  const [restartCount, setRestartCount] = useState(0);
  const [showExit, setShowExit] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (stage === "configuring") {
            setStage("working");
            return 0;
          } else if (stage === "working") {
            setStage("restarting");
            setRestartCount((c) => c + 1);
            return 30;
          }
        }
        return prev + Math.random() * 2.5;
      });
    }, 800 + Math.random() * 1200);

    return () => clearInterval(interval);
  }, [stage]);

  useEffect(() => {
    const timer = setTimeout(() => setShowExit(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "F11") {
        setStage("configuring");
        setProgress(0);
        setRestartCount(0);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0078d4] flex items-center justify-center text-white overflow-hidden">
      <div className="text-center max-w-2xl px-8">
        {/* Windows 10/11 Logo */}
        <div className="mb-16">
          <svg
            viewBox="0 0 88 88"
            className="w-24 h-24 mx-auto mb-8"
            fill="white"
          >
            <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349l-.011 41.34-47.318-6.678-.066-34.739z" />
          </svg>
        </div>

        {/* Main Message */}
        {stage === "configuring" && (
          <>
            <h1 className="text-5xl font-light mb-8">Configuring update</h1>
            <p className="text-7xl font-light mb-12">{Math.floor(progress)}%</p>
            <p className="text-2xl font-light">Please wait while we configure Windows updates</p>
          </>
        )}

        {stage === "working" && (
          <>
            <h1 className="text-5xl font-light mb-8">Working on updates</h1>
            <p className="text-7xl font-light mb-12">{Math.floor(progress)}%</p>
            <p className="text-2xl font-light mb-4">Don't turn off your computer</p>
            <p className="text-lg opacity-70 font-light">
              This will take a while. Your PC will restart several times.
            </p>
          </>
        )}

        {stage === "restarting" && (
          <>
            <h1 className="text-5xl font-light mb-8">Restarting</h1>
            <div className="flex justify-center items-center gap-3 my-12">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
            </div>
            <p className="text-2xl font-light mb-4">Your PC will restart in a moment</p>
            <p className="text-lg opacity-70 font-light">Restart #{restartCount}</p>
          </>
        )}

        {/* Exit hint */}
        {showExit && (
          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs opacity-20 font-light">
            Press ESC or F11 to exit prank
          </p>
        )}
      </div>
    </div>
  );
}