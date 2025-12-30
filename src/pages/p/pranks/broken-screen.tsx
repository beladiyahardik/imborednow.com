import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function BrokenScreenPrank() {
  const [cracks, setCracks] = useState<number[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  // Generate random crack positions on click/tap
  const handleScreenTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    let clientX, clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const id = Date.now() + Math.random();
    setCracks(prev => [...prev, id]);

    // After 3+ cracks, reveal the prank message
    if (cracks.length >= 2) {
      setTimeout(() => setShowMessage(true), 800);
    }
  };

  return (
    <>
      <Head>
        <title>Oh no... your screen broke!</title>
        <meta name="robots" content="noindex" />
        <meta name="description" content="Realistic broken screen prank – perfect for phones and desktops!" />
      </Head>

      {/* Full-screen cracked glass effect */}
      <div className="fixed inset-0 bg-black overflow-hidden">
        {/* Multiple crack layers */}
        {cracks.map((id, index) => (
          <div
            key={id}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url('https://img.freepik.com/free-photo/shattered-glass-texture_23-2149428086.jpg?t=st=1767092914~exp=1767096514~hmac=a9e8fee1a3acd06a50bf7f90e488541b868929f793718affa674b8498b87c365&w=1980')`, // Realistic crack overlays
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.8 + index * 0.1,
              mixBlendMode: 'screen',
              animation: `crackAppear 0.8s ease-out forwards`,
              animationDelay: `${index * 0.2}s`,
            }}
          />
        ))}

        {/* Click/tap anywhere to "break" more */}
        <div
          onClick={handleScreenTap}
          onTouchStart={handleScreenTap}
          className="fixed inset-0 cursor-pointer z-10"
        />

        {/* Initial message */}
        {!showMessage && cracks.length === 0 && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-white">
              <h1 className="text-6xl sm:text-8xl font-black mb-8 animate-pulse">
                😱 OH NO!
              </h1>
              <p className="text-3xl sm:text-5xl font-bold">
                Your screen just broke...
              </p>
              <p className="text-xl sm:text-3xl mt-8 opacity-80">
                Tap or click to see the damage
              </p>
            </div>
          </div>
        )}

        {/* Reveal prank after several cracks */}
        {showMessage && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-20 animate-fade-in">
            <div className="text-center text-white bg-black/70 px-12 py-16 rounded-3xl backdrop-blur-md">
              <h1 className="text-7xl sm:text-9xl font-black mb-8 animate-bounce">
                GOTCHA! 😂
              </h1>
              <p className="text-4xl sm:text-6xl mb-12">
                It's just a prank bro!
              </p>
              <div className="text-8xl mb-8">🤡💥</div>
              <Link
                href="/"
                className="inline-block px-12 py-6 text-3xl font-bold bg-purple-600 rounded-full hover:bg-pink-600 hover:scale-110 transition-all"
              >
                🏠 Go Back Home
              </Link>
            </div>
          </div>
        )}

        {/* Subtle hint for smart victims */}
        <p className="fixed bottom-4 left-4 text-gray-500 text-xs opacity-50 pointer-events-none">
          Prank by I'm Bored Now • Refresh or go back to fix your "screen"
        </p>

        {/* Shatter sound on first crack */}
        {cracks.length === 1 && (
          <audio autoPlay>
            <source src="https://www.soundjay.com/buttons/glass-break-1.mp3" type="audio/mpeg" />
          </audio>
        )}
      </div>

      <style jsx>{`
        @keyframes crackAppear {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 0.9;
          }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </>
  );
}