import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function PrankCollection() {
  const pranks = [
    {
      title: "Fake Windows Update 😱",
      desc: "Trick someone into thinking their PC is stuck updating forever!",
      emoji: "🖥️",
      color: "from-blue-500 to-cyan-500",
      href: "/p/pranks/fake-update",
    },
    {
      title: "Hacker Typer 💻",
      desc: "Type anything and look like a pro hacker from the movies!",
      emoji: "🖤",
      color: "from-green-600 to-black",
      href: "/p/pranks/fake-hacker-typer",
    },
    {
      title: "Scary Maze Game 👻",
      desc: "Classic jump scare maze – don't touch the walls!",
      emoji: "🕸️",
      color: "from-purple-600 to-red-600",
      href: "/p/pranks/scary-maze-game",
    },
    {
      title: "Broken Screen Prank 📱",
      desc: "Make it look like the screen cracked – perfect for phones!",
      emoji: "💥",
      color: "from-gray-800 to-black",
      href: "/p/pranks/broken-screen",
    },
  ];

  return (
    <>
      <Head>
        <title>Epic Pranks Collection - Scare & Troll Your Friends 😂</title>
        <meta
          name="description"
          content="Harmless browser pranks for your I'm Bored Now site: fake updates, hacker typer, scary maze, and more!"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-purple-100">
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center gap-1.5">
                <span className="text-3xl">🎯</span>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  I'm Bored Now
                </h1>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 opacity-90"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 text-center text-white">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-8 drop-shadow-2xl">
              Ultimate Prank Zone 😈
            </h1>
            <p className="text-2xl sm:text-4xl font-medium opacity-95 max-w-4xl mx-auto mb-12">
              Harmless, hilarious browser pranks to troll your friends!<br />
              (Reveal quickly – keep it fun!)
            </p>
          </div>
        </section>

        {/* Prank Grid */}
        <section className="py-16 sm:py-24 bg-white/60 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {pranks.map((prank) => (
                <Link key={prank.title} href={prank.href}>
                  <div
                    className={`group relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br ${prank.color} text-white shadow-2xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-500 cursor-pointer overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>
                    <div className="relative text-center space-y-6">
                      <div className="text-8xl sm:text-9xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                        {prank.emoji}
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-black">
                        {prank.title}
                      </h3>
                      <p className="text-xl sm:text-2xl opacity-90">
                        {prank.desc}
                      </p>
                      <span className="inline-block mt-4 px-6 py-3 bg-white/20 rounded-full font-bold group-hover:bg-white/30 transition-all">
                        Play Prank →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Warning */}
        <div className="container mx-auto px-4 sm:px-6 my-12 text-center">
          <div className="bg-yellow-100 border-4 border-yellow-400 rounded-3xl p-8 max-w-3xl mx-auto">
            <p className="text-2xl font-bold text-yellow-800">
              ⚠️ These pranks are for laughs only!<br />
              Always reveal quickly and prank responsibly 😄
            </p>
          </div>
        </div>

        {/* Ad */}
        <div className="container mx-auto px-4 sm:px-6 my-12">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl w-full h-64 flex items-center justify-center text-gray-500 font-semibold shadow-inner">
            [AdSense Rectangle 336×280]
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-10">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <Link href="/" className="flex justify-center items-center gap-1.5 mb-6">
              <span className="text-3xl">🎯</span>
              <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                I'm Bored Now
              </span>
            </Link>
            <p className="text-gray-400">© 2025 I'm Bored Now. Pranks & Fun Forever 😂</p>
          </div>
        </footer>
      </div>
    </>
  );
}