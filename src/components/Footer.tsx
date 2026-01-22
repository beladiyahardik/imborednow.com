import Link from "next/link";
import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Play: [
      { name: "Press The Button", href: "/p/press-the-button" },
      { name: "Funny Jokes", href: "/p/jokes" },
      { name: "Crazy Facts", href: "/p/facts" },
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
      { name: "Disclaimers", href: "/info/disclaimers" },
    ],
  };

  return (
    <footer className="relative bg-[#020617] text-white pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300">🎯</span>
              <span className="text-3xl font-black tracking-tighter uppercase">
                IM<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">BORED</span>NOW
              </span>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
              The world&apos;s <strong>best gaming site</strong> for killing time.
              From the viral <strong>red button</strong> game to mind-blowing facts,
              we cure monotony in seconds.
            </p>
            {/* SEO Keyword Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["#1 Online Gaming Site", "Hit The Button", "Viral Fun"].map((tag) => (
                <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-500">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 border-l-2 border-purple-500 pl-3">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Community Stats Section (UX Trust Builder) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-white/5 rounded-[2rem] border border-white/10 mb-16">
          {[
            { label: "Players Online", val: "12.4k+" },
            { label: "Dilemmas Solved", val: "1M+" },
            { label: "Countries", val: "140+" },
            { label: "Uptime", val: "99.9%" },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-2xl font-black text-white">{stat.val}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Final Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-medium">
            &copy; {currentYear} <span className="text-slate-300">I&apos;m Bored Now</span>.
            All rights reserved. Made for humans, by humans. ❤️
          </p>

          <div className="flex gap-6">
            {/* Social Icons Placeholder */}
            {["X", "Instagram", "Discord"].map((platform) => (
              <a
                key={platform}
                href="#"
                className="text-slate-500 hover:text-purple-400 text-xs font-black uppercase tracking-widest transition-colors"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;