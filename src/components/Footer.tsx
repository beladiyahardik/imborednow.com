import Link from "next/link";
import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="site-container py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-lg font-black tracking-tight text-slate-900">IMBOREDNOW</p>
            <p className="mt-2 max-w-md text-sm text-slate-600">
              Hand-picked games, tools, and articles designed for quick, useful breaks.
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">Explore</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="/p/tools">
                  Tools
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="/p/games-to-play-when-bored">
                  Games
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="/articles">
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">Legal</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="/info/privacy-policy">
                  Privacy
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="/info/terms">
                  Terms
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="/info/disclaimer">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-slate-100 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-500">&copy; {year} ImBoredNow</p>
          <p className="text-xs text-slate-500">
            Contact:{" "}
            <Link className="underline" href="/info/contact">
              Support
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
