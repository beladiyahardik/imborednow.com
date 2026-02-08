import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Handle scroll effect for a cleaner "glass" look
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    // { name: "Bored AI", href: "/bored-ai", icon: "🤖" },
    { name: "Tools", href: "/p/tools", icon: "🛠️" },
    { name: "Games to play when bored", href: "/p/games-to-play-when-bored", icon: "💡" },
    { name: "Articles", href: "/articles", icon: "📰" },
    { name: "Press It", href: "/p/press-the-button", icon: "🔴" },
    { name: "About", href: "/info/about", icon: "✨" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? "py-2 bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border-b border-white/20" 
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-white/40 backdrop-blur-md rounded-2xl md:rounded-full px-4 md:px-8 py-2 md:py-3 border border-white/40 flex justify-between items-center shadow-sm">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group relative">
            <div className="relative">
                <span className="text-2xl sm:text-3xl block group-hover:rotate-[20deg] transition-transform duration-300">
                🎯
                </span>
                <div className="absolute inset-0 bg-purple-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col -space-y-1">
                <span className="text-xl sm:text-2xl font-black tracking-tighter text-slate-900">
                    IM<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">BORED</span>NOW
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">Entertainment Hub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center bg-white/40 p-1 rounded-full border border-white/20 shadow-inner">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                    isActive 
                      ? "bg-white text-purple-600 shadow-sm scale-105" 
                      : "text-slate-600 hover:text-purple-600 hover:bg-white/50"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons (Desktop) */}
          {/* <div className="hidden md:flex items-center gap-3">
             <button className="p-2.5 bg-slate-900 text-white rounded-full hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
             </button>
          </div> */}

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 active:scale-90 transition-transform"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`h-1 w-full bg-white rounded-full transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`h-1 w-full bg-white rounded-full transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`h-1 w-full bg-white rounded-full transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`lg:hidden fixed inset-x-4 top-24 z-[110] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-10 invisible"
          }`}
        >
          <div className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] border border-white p-6 shadow-2xl">
            <nav className="grid grid-cols-2 gap-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-purple-50 hover:border-purple-200 transition-all group"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="text-sm font-black text-slate-800 uppercase tracking-tighter">{item.name}</span>
                </Link>
              ))}
            </nav>
            
            {/* <div className="mt-6 pt-6 border-t border-slate-100">
                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform">
                    🔍 SEARCH SITE
                </button>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;