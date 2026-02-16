import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

/**
 * Header Component
 * Features: 
 * - Adaptive "Pill to Bar" transition on scroll
 * - Mobile menu with background lock
 * - Active state tracking for nested routes
 * - Glassmorphism UI
 */
function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const currentPath = router.asPath.split("?")[0].split("#")[0];

  // 1. Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Lock Body Scroll when Mobile Menu is Open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  // 3. Active Link Logic
  const isNavItemActive = (href: string) => {
    if (href === "/articles") {
      return currentPath === "/articles" || currentPath.startsWith("/articles/");
    }
    if (href === "/info/about") {
      return currentPath.startsWith("/info/");
    }
    return currentPath === href;
  };

  const navItems = [
    { name: "Home", href: "/", icon: "🏠" },
    { name: "Tools", href: "/p/tools", icon: "🛠️" },
    { name: "Games", href: "/p/games-to-play-when-bored", icon: "💡" },
    { name: "Articles", href: "/articles", icon: "📰" },
    { name: "About", href: "/info/about", icon: "✨" },
  ];

  return (
    <>
      {/* --- MAIN HEADER --- */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${scrolled
            ? "py-3 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm"
            : "py-6 bg-transparent border-b border-transparent"
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-500 ${scrolled
              ? "bg-transparent border-transparent shadow-none"
              : "bg-white/60 backdrop-blur-md rounded-full px-6 py-3 border border-white/40 shadow-sm"
            }`}>

            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group relative shrink-0">
              <div className="relative">
                <span className="text-2xl sm:text-3xl block group-hover:rotate-[15deg] transition-transform duration-300">
                  🎯
                </span>
                <div className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-xl sm:text-2xl font-black tracking-tighter text-slate-900 leading-none">
                  IM<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">BORED</span>NOW
                </span>
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest hidden sm:block">
                  Entertainment Hub
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-full border border-slate-200/50 backdrop-blur-sm">
              {navItems.map((item) => {
                const isActive = isNavItemActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${isActive
                        ? "bg-white text-purple-600 shadow-sm ring-1 ring-slate-200"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                      }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-3 rounded-2xl transition-all duration-300 active:scale-90 z-[120] ${isMobileMenuOpen
                  ? "bg-rose-500 text-white rotate-90"
                  : "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                }`}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-center gap-1.5">
                <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 scale-0" : ""}`} />
                <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div
        className={`lg:hidden fixed inset-0 z-[110] transition-all duration-500 ${isMobileMenuOpen ? "visible" : "invisible pointer-events-none"
          }`}
      >
        {/* Darkened Backdrop */}
        <div
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Floating Menu Card */}
        <div
          className={`absolute inset-x-4 top-24 max-h-[calc(100vh-120px)] overflow-y-auto bg-white rounded-[2.5rem] border border-slate-200 p-6 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
        >
          <div className="flex flex-col gap-6">
            <div className="px-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Navigation</p>
              <nav className="grid grid-cols-2 gap-3">
                {navItems.map((item, index) => {
                  const isActive = isNavItemActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex flex-col items-center justify-center p-6 rounded-3xl border transition-all active:scale-95 ${isActive
                          ? "bg-purple-50 border-purple-200 ring-2 ring-purple-100 shadow-inner"
                          : "bg-slate-50 border-slate-100 hover:border-slate-200"
                        }`}
                      style={{ transitionDelay: `${index * 40}ms` }}
                    >
                      <span className="text-3xl mb-2">{item.icon}</span>
                      <span className={`text-xs font-black uppercase tracking-tight ${isActive ? "text-purple-600" : "text-slate-800"}`}>
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Quick Footer inside Mobile Menu */}
            <div className="bg-slate-900 rounded-[2rem] p-6 text-center">
              <p className="text-slate-400 text-xs font-bold mb-1 italic">Feeling very bored?</p>
              <Link
                href="/p/games-to-play-when-bored"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white font-black text-lg hover:text-purple-400 transition-colors"
              >
                SHAKE TO SURPRISE 🎲
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;