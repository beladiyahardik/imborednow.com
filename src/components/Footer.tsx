import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-10 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center space-y-6">
          <div className="flex justify-center items-center space-x-2 text-2xl sm:text-3xl font-black">
            <div className="flex flex-row gap-1.5 items-center">
              <span className="text-3xl">🎯</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                I&apos;m Bored Now
              </span>
            </div>
          </div>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Made with ❤️ to cure boredom worldwide. Join thousands who&apos;ve
            already escaped the monotony!
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
            {["About", "Privacy Policy", "Terms", "Contact", "Disclaimers"].map(
              (link) => (
                <Link
                  key={link}
                  href={`/info/${link.toLowerCase().replace(" ", "-")}`}
                >
                  <span className="hover:text-purple-400 transition-colors cursor-pointer">
                    {link}
                  </span>
                </Link>
              )
            )}
          </div>
          <div className="pt-6 border-t border-gray-700">
            <p className="text-gray-500 text-xs sm:text-sm">
              &copy; 2025 I&apos;m Bored Now. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
