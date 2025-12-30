import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function FakeError() {
  const [showRick, setShowRick] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowRick(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-red-900 to-black text-white flex items-center justify-center relative overflow-hidden">
        {!showRick ? (
          <div className="text-center animate-pulse">
            <h1 className="text-8xl font-black mb-8 glitch">ERROR 404</h1>
            <p className="text-4xl mb-4">Page Not Found</p>
            <p className="text-2xl mb-12">Loading backup entertainment...</p>
            <div className="text-6xl">⏳</div>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-9xl font-black mb-8 animate-rainbow">NEVER GONNA GIVE YOU UP!</h1>
            <p className="text-5xl mb-12 animate-bounce">You just got Rickrolled Classic™ 😂</p>
            <div className="text-9xl mb-8">🕺💃</div>
            <Link href="/" className="px-12 py-6 text-3xl font-bold bg-purple-600 rounded-full hover:scale-110 transition-all">
              Go Home (if you can)
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        .glitch {
          animation: glitch 1s infinite;
        }
        @keyframes glitch {
          0% { text-shadow: 0.05em 0 0 #ff00ff, -0.05em 0 0 #00ffff; }
          50% { text-shadow: -0.05em 0 0 #ff00ff, 0.05em 0 0 #00ffff; }
          100% { text-shadow: 0.05em 0 0 #ff00ff, -0.05em 0 0 #00ffff; }
        }
      `}</style>
    </>
  );
}