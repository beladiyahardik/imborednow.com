import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

export default function BoredAI() {
  const [boredomLevel, setBoredomLevel] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const categories = {
    "Learning": ["Space", "History", "Science", "Tech"],
    "Mindset": ["Psychology", "Philosophy", "Facts"],
    "Creativity": ["Art", "Writing", "Music"],
    "Fun": ["Games", "Cool Sites", "Rabbit Holes"],
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ boredomLevel, selectedTags }),
      });
      const data = await res.json();
      setRecommendations(Array.isArray(data) ? data : data.recommendations || []);
    } catch (err) {
      console.error("Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to results when they appear (smooth)
  useEffect(() => {
    if (recommendations.length > 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [recommendations]);

  const allTags = Object.values(categories).flat();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-900 font-sans">
      <Head>
        {/* Core SEO Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <title>Bored AI | Find Fun Things to Do Online When Bored</title>
        <meta
          name="description"
          content="Feeling bored? Bored AI instantly recommends personalized fun activities, cool websites, games, rabbit holes, articles, and more based on your boredom level and interests. Stop scrolling endlessly — get curated escapes now!"
        />
        <meta
          name="keywords"
          content="bored, boredom cure, fun things to do online, cool websites, games when bored, rabbit holes, interesting articles, AI recommendations, anti-boredom, productivity breaks, creative ideas"
        />
        <meta name="author" content="Hardik" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        {/* Canonical URL (important for avoiding duplicate content issues) */}
        <link rel="canonical" href="https://www.imborednow.com/" /> {/* ← replace with your real domain */}

        {/* Open Graph (Facebook, LinkedIn, WhatsApp, Discord, etc.) */}
        <meta property="og:title" content="Bored AI – Instant Fun When You're Bored" />
        <meta
          property="og:description"
          content="Tell us your boredom level and interests — get perfect online escapes: games, deep dives, mind-bending sites, learning rabbit holes, and more. Powered by AI."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.imborednow.com/" /> {/* ← replace */}
        <meta property="og:site_name" content="Bored AI" />
        <meta
          property="og:image"
          content="https://www.imborednow.com/logo.jpg" /* ← create & host a 1200×630 image */
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Bored AI – Cure Your Boredom with Fun Recommendations" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter / X Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bored AI – Stop Being Bored Right Now" />
        <meta
          name="twitter:description"
          content="AI-powered boredom killer: personalized games, cool sites, facts, philosophy, art ideas & more based on how bored you are."
        />
        <meta
          name="twitter:image"
          content="https://www.imborednow.com/og-image.jpg" /* same as OG image for consistency */
        />
        <meta name="twitter:image:alt" content="Bored AI recommendation interface" />
        {/* Optional: if you have a Twitter handle */}
        {/* <meta name="twitter:site" content="@YourHandle" /> */}
        {/* <meta name="twitter:creator" content="@YourHandle" /> */}

        {/* Favicon & App Icons (basic – expand as needed) */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Theme Color & PWA basics */}
        <meta name="theme-color" content="#4f46e5" /> {/* indigo/purple-ish */}
        <meta name="msapplication-TileColor" content="#4f46e5" />

        {/* Optional performance/SEO hints */}
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      </Head>

      <main className="max-w-4xl mx-auto px-5 sm:px-6 py-10 md:py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Bored? Let AI fix it.
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Slide how bored you are + pick vibes → get instant escapes from boredom.
          </p>
        </motion.div>

        {/* Main Controls – Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="backdrop-blur-xl bg-white/40 border border-white/30 shadow-2xl shadow-purple-200/30 rounded-3xl p-8 md:p-12 mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {/* Left: Controls */}
            <div className="space-y-10">
              {/* Boredom Slider */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-5 uppercase tracking-wider">
                  Boredom level (1–10)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={boredomLevel}
                  onChange={(e) => setBoredomLevel(parseInt(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between mt-3 text-sm font-semibold text-purple-700">
                  <span>A bit restless</span>
                  <span>Send help 🚨</span>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-5 uppercase tracking-wider">
                  Pick your escape vibe
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {allTags.map((tag) => (
                    <motion.button
                      key={tag}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => toggleTag(tag)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 ${selectedTags.includes(tag)
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                          : 'bg-white/60 text-gray-700 hover:bg-white/80 border border-white/40'
                        }`}
                    >
                      {tag}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Go Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSearch}
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="text-xl"
                    >
                      🌌
                    </motion.span>
                    Thinking of epic escapes...
                  </span>
                ) : (
                  'Find My Cure'
                )}
              </motion.button>
            </div>

            {/* Right: Mood / Visual hint */}
            <div className="hidden md:flex flex-col justify-center items-center text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="text-7xl mb-6"
              >
                ✨
              </motion.div>
              <h3 className="text-2xl font-bold text-purple-900 mb-3">Ready for lift-off?</h3>
              <p className="text-purple-800/90 leading-relaxed">
                We scan the coolest corners of the internet — just for your current mood.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <section ref={resultsRef} className="mt-8">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-6"
                >
                  🌀
                </motion.div>
                <p className="text-xl text-gray-600">Digging up something awesome...</p>
              </motion.div>
            ) : recommendations.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center md:text-left">
                  Your anti-boredom menu:
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {recommendations.map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.url}
                      target="_blank"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12, type: "spring", stiffness: 100 }}
                      whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.3 } }}
                      className="block p-7 bg-white/50 backdrop-blur-lg border border-white/30 rounded-2xl hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-200/30 transition-all group"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <span className="text-xs font-bold uppercase tracking-widest text-purple-600">
                            {item.type || 'Escape'}
                          </span>
                          <h4 className="text-xl md:text-2xl font-bold mt-1.5 text-gray-900 group-hover:text-purple-700">
                            {item.title}
                          </h4>
                          <p className="text-gray-700 mt-3 leading-relaxed">
                            {item.description || item.why_it_cures_boredom}
                          </p>
                        </div>
                        <motion.span
                          className="text-3xl text-gray-300 group-hover:text-purple-500"
                          whileHover={{ x: 8 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          →
                        </motion.span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}