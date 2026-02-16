import Link from "next/link";
import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Play: [
      { name: "Press The Button", href: "/p/press-the-button" },
      { name: "Bored Button", href: "/" },
      { name: "Games Collection", href: "/p/games-to-play-when-bored" },
    ],
    Company: [
      { name: "Our Story", href: "/info/about" },
      { name: "Get in Touch", href: "/info/contact" },
      { name: "Latest Articles", href: "/articles" },
    ],
    Legal: [
      { name: "Privacy", href: "/info/privacy-policy" },
      { name: "Terms", href: "/info/terms" },
      { name: "Disclaimer", href: "/info/disclaimer" },
    ],
  };

  return (
    <footer className="relative bg-[#020617] text-white pt-24 pb-12 overflow-hidden">
      {/* Visual Decor - Subtle Purple Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 mb-20">

          {/* Brand & Mission Column */}
          <div className="lg:col-span-3 space-y-8">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <span className="text-4xl group-hover:rotate-12 transition-transform duration-300">🎯</span>
              <span className="text-3xl font-black tracking-tighter uppercase leading-none">
                IM
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  BORED
                </span>
                NOW
              </span>
            </Link>

            <p className="text-slate-400 text-lg leading-relaxed max-w-md font-medium">
              We curate the internet's most delightful distractions.
              No fluff, no filler - just simple tools and games to reclaim your free time.
            </p>

            {/* Social Pill Grid */}
            <div className="flex gap-3">
              {[
                { label: "X / Twitter", link: "https://x.com/Imbored_now_", icon: "🐦" },
                { label: "Instagram", link: "https://www.instagram.com/imbored_.now/", icon: "📸" },
              ].map((platform) => (
                <a
                  key={platform.label}
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-widest"
                >
                  <span>{platform.icon}</span>
                  {platform.label.split(' ')[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-1 space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">
                {title}
              </h4>
              <ul className="space-y-5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-purple-400 transition-all font-bold text-sm relative group flex items-center"
                    >
                      <span className="w-0 group-hover:w-2 h-[2px] bg-purple-400 mr-0 group-hover:mr-3 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Metadata & Credits */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <p className="text-slate-500 text-sm font-bold tracking-tight">
              © {currentYear} I'M BORED NOW.
            </p>
            <span className="hidden md:block w-1 h-1 bg-slate-700 rounded-full" />
            <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">
              Crafted in Surat, Gujarat 🇮🇳
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {["Boredom Games", "Random Button", "Fun Activities"].map((tag) => (
              <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-slate-400 cursor-default transition-colors">
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;