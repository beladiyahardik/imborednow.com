import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.asPath.split("?")[0].split("#")[0];

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/p/tools" },
    { name: "Games", href: "/p/games-to-play-when-bored" },
    { name: "Articles", href: "/articles" },
    { name: "About", href: "/info/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/articles") return currentPath === href || currentPath.startsWith("/articles/");
    if (href === "/info/about") return currentPath.startsWith("/info/");
    return currentPath === href;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="site-container">
          <div className="h-16 flex items-center justify-between">
            <Link href="/" className="text-lg font-black tracking-tight text-slate-900">
              IMBOREDNOW
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(item.href)
                      ? "bg-slate-200 text-slate-900 ring-1 ring-slate-300"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="md:hidden fixed inset-0 z-[90] bg-slate-900/20 backdrop-blur-sm">
          <div className="absolute top-16 inset-x-4 clean-card p-4 shadow-lg">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(item.href)
                      ? "bg-slate-200 text-slate-900 ring-1 ring-slate-300"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
