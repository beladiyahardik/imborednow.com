import Link from "next/link";
import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Play: [
      { name: "Press The Button", href: "/p/press-the-button" },
      { name: "Funny Jokes", href: "/p/jokes" },
      { name: "Interesting Facts", href: "/p/facts" },
      { name: "Bored Button", href: "/" },
    ],
    Company: [
      { name: "About Us", href: "/info/about" },
      { name: "Contact", href: "/info/contact" },
      { name: "Articles", href: "/articles" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/info/privacy-policy" },
      { name: "Terms of Service", href: "/info/terms" },
      { name: "Disclaimer", href: "/info/disclaimer" },
    ],
  };

  return (
    <footer className="relative bg-[#020617] text-white pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <span className="text-4xl">🎯</span>
              <span className="text-3xl font-black tracking-tighter uppercase">
                IM
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  BORED
                </span>
                NOW
              </span>
            </Link>

            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
              I’m Bored Now is a curated collection of simple games, tools, and
              activities designed to help people find something interesting to
              do during short breaks or free time.
            </p>

            {/* Honest keyword hints (no hype) */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["Boredom Games", "Random Button", "Fun Activities"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-500"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-medium">
            © {currentYear} <span className="text-slate-300">I’m Bored Now</span>.
            All rights reserved.
          </p>

          <div className="flex gap-6">
            {[
              { label: "X", link: "https://x.com/Imbored_now_" },
              { label: "Instagram", link: "https://www.instagram.com/imbored_.now/" },
            ].map((platform) => (
              <a
                key={platform.label}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-purple-400 text-xs font-black uppercase tracking-widest transition-colors"
              >
                {platform.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
