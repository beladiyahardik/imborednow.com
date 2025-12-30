import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function HackerTyperPrank() {
  const [code, setCode] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  // Massive block of realistic-looking code to dump when typing
  const hackerCode = `
// ACCESS GRANTED - ROOT PRIVILEGES ELEVATED
Initializing neural network intrusion module...
Bypassing firewall... [OK]
Cracking encryption layer (AES-256)... [BREACHED]
Injecting payload into kernel... [SUCCESS]

const matrix = require('quantum-matrix');
const shadowBroker = new ExploitKit();

shadowBroker.deploy({
  target: 'global-banking-network',
  method: 'zero-day-ransomware',
  persistence: true,
  exfiltrate: ['credentials', 'crypto-wallets', 'nudes']
});

function hackThePlanet() {
  while (true) {
    stealBitcoin();
    leakGovernmentSecrets();
    rickrollVictim();
    console.log("We're in.");
  }
}

> sudo rm -rf / --no-preserve-root
Password: ************

[============================================================>] 100%

SYSTEM COMPROMISED
All your files are encrypted.
Send 5 BTC to: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh

// Just kidding... or am I? 😈

import os
os.system("echo 'You just got hacked... by boredom!'")

// MATRIX RAIN ACTIVATED
for (let i = 0; i < infinity; i++) {
  dropGreenRain();
  makeCoolSounds();
}

alert("FBI WARNING: Illegal activity detected!");
// Nah, just a prank bro 😂

`.repeat(10); // Make it long enough to scroll forever

  let codeIndex = 0;

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);

    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();

      // Dump chunks of code with every key press
      const chunkSize = Math.floor(Math.random() * 20) + 10;
      const newCode = hackerCode.substring(codeIndex, codeIndex + chunkSize);
      setCode((prev) => prev + newCode);
      codeIndex += chunkSize;

      // Random fun effects
      if (Math.random() > 0.85) {
        setCode((prev) => prev + "\n\n> ACCESS DENIED... PSYCH! JUST KIDDING 😂\n");
      }
      if (Math.random() > 0.9) {
        setCode((prev) => prev + "\n[🔥] Thermite planted on mainframe\n");
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      clearInterval(blinkInterval);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <Head>
        <title>HACKER MODE ACTIVATED</title>
        <meta name="robots" content="noindex" />
        <meta name="description" content="Type anything to look like an elite hacker!" />
      </Head>

      {/* Full-screen black terminal with green text */}
      <div className="fixed inset-0 bg-black text-green-400 font-mono flex flex-col">
        {/* Top secret header */}
        <div className="bg-red-900 text-white px-8 py-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <div className="text-2xl animate-pulse">⚠️</div>
            <div>
              <p className="text-xl font-bold">CLASSIFIED SYSTEM - UNAUTHORIZED ACCESS PROHIBITED</p>
              <p className="text-sm opacity-80">Penalty: Life in prison (or a Rickroll)</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm">User: root@anonymous</p>
            <p className="text-sm animate-pulse">Status: HACKING THE PLANET</p>
          </div>
        </div>

        {/* Code area */}
        <div className="flex-1 overflow-y-auto p-8">
          <pre className="text-lg leading-relaxed whitespace-pre-wrap">
            {code}
            <span className={cursorVisible ? "inline-block w-3 h-6 bg-green-400 align-middle" : ""} />
          </pre>
        </div>

        {/* Bottom status bar */}
        <div className="bg-gray-900 text-green-300 px-8 py-3 flex justify-between text-sm">
          <div>
            <span className="text-yellow-400">INSERT</span> | Lines: {code.split("\n").length} | Keystrokes: {code.length}
          </div>
          <div className="flex items-center gap-8">
            <span>CPU: 99% 🔥</span>
            <span>Risk Level: <span className="text-red-500 animate-pulse">EXTREME</span></span>
            <span className="text-cyan-400 animate-ping">● Online</span>
          </div>
        </div>
      </div>

      {/* Hidden escape */}
      <button
        onClick={() => window.location.href = "/"}
        onKeyDown={(e) => e.key === "Escape" && window.location.assign("/")}
        className="fixed inset-0 cursor-crosshair z-50"
        tabIndex={0}
        aria-label="Exit hacker mode"
      />

      {/* Tiny hint for victims */}
      <div className="fixed bottom-4 right-4 text-gray-600 text-xs opacity-30 pointer-events-none">
        Prank by I'm Bored Now • Press ESC to stop hacking (if you dare)
      </div>
    </>
  );
}