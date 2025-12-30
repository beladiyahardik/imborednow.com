// import Link from "next/link";
// import React from "react";

// function Header() {
//   return (
//     <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-purple-100">
//       <div className="container mx-auto px-4 sm:px-6 py-4">
//         <div className="flex justify-between items-center">
//           <Link href="/" className="flex items-center gap-1.5">
//             <span className="text-3xl">🎯</span>
//             <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 cursor-pointer hover:scale-105 transition-transform">
//               I&apos;m Bored Now
//             </h1>
//           </Link>
//           <nav className="hidden md:flex space-x-6 lg:space-x-8">
//             {["Home", "Jokes", "Facts"].map((item) => (
//               <Link
//                 key={item}
//                 href={item === "Home" ? "/" : `/p/${item.toLowerCase()}`}
//               >
//                 <span className="text-gray-700 hover:text-purple-600 font-semibold transition-colors cursor-pointer relative group">
//                   {item}
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
//                 </span>
//               </Link>
//             ))}
//           </nav>
//           <button className="md:hidden p-2 text-purple-600">
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;

import Link from "next/link";
import React, { useState } from "react";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Jokes", href: "/p/jokes" },
    { name: "Facts", href: "/p/facts" },
    { name: "About", href: "/info/about" },
    { name: "Contact", href: "/info/contact" },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-purple-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl sm:text-4xl group-hover:rotate-12 transition-transform duration-300">
              🎯
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 group-hover:scale-105 transition-transform duration-300">
              I&apos;m Bored Now
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-lg font-semibold text-gray-700 hover:text-purple-600 transition-colors duration-200 group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Slides Down from Top (Overlays Content) */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-2xl border-b border-purple-100 overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          }`}
        >
          <nav className="py-6 px-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-4 px-6 text-xl font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 transform hover:translate-x-4 ${
                    isMobileMenuOpen
                      ? `animate-in slide-in-from-top-${
                          (index + 1) * 2
                        } duration-500`
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
