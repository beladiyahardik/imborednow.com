'use client';

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const API_URL = "https://belbytes.com/APIs/imborednow/guesser.php";
const hasAdsenseApproval = false; // Change to true once approved

export default function PasswordGuesser() {
    const [userGuess, setUserGuess] = useState("");
    const [messageHtml, setMessageHtml] = useState("");
    const [sameCount, setSameCount] = useState(0);
    const [userRank, setUserRank] = useState("Not in top 10");
    const [totalPlayers, setTotalPlayers] = useState(0);
    const [totalGuesses, setTotalGuesses] = useState(0);
    const [topGuesses, setTopGuesses] = useState<{ guess: string; cnt: number }[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchStats = async () => {
        try {
            const res = await fetch(API_URL);
            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    setTotalPlayers(data.totalPlayers || 0);
                    setTotalGuesses(data.totalGuesses || 0);
                    setTopGuesses(data.topGuesses || []);
                }
            }
        } catch (err) {
            console.error("Failed to fetch stats:", err);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const guess = userGuess.trim();

        if (!/^\d{4}$/.test(guess)) {
            setMessageHtml('<div class="p-4 bg-yellow-100 text-yellow-700 rounded-xl border border-yellow-200 font-bold">Please enter exactly 4 digits.</div>');
            return;
        }

        setLoading(true);
        setMessageHtml("");

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ guess }),
            });

            const data = await res.json();

            if (!data.success) {
                setMessageHtml(data.messageHtml || '<div class="p-4 bg-red-100 text-red-700 rounded-xl border border-red-200 font-bold">Something went wrong. Try again.</div>');
            } else {
                setMessageHtml(data.messageHtml || "");
                setSameCount(data.sameCount || 0);
                setUserRank(data.userRank || "Not in top 10");
                setTotalPlayers(data.totalPlayers || 0);
                setTotalGuesses(data.totalGuesses || 0);
                setTopGuesses(data.topGuesses || []);
            }
        } catch (err) {
            setMessageHtml('<div class="p-4 bg-red-100 text-red-700 rounded-xl border border-red-200 font-bold">Network error. Please try again.</div>');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Password Guesser - Crack the 4-Digit PIN Challenge | Bored Button</title>
                <meta name="description" content="Test your intuition: guess the secret 4-digit PIN code. See real-time global statistics, most common guesses, and how your choice ranks among thousands of players. A fun, educational browser tool from I'm Bored Now." />
                <meta name="keywords" content="password guesser, 4 digit pin guesser, crack the code, pin challenge, common passwords, pin statistics, security game, boredom cure, browser tool, 4 digit code game, pin psychology" />
                <meta name="author" content="Hardik Beladiya & Team" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://www.imborednow.com/p/password-guesser" />

                {/* Open Graph */}
                <meta property="og:title" content="Password Guesser - 4-Digit PIN Challenge | Bored Button" />
                <meta property="og:description" content="Can you guess the secret 4-digit code? Track global guessing patterns and see real-time leaderboard of most common PINs." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.imborednow.com/p/password-guesser" />
                <meta property="og:site_name" content="Bored Button" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Password Guesser - Crack the 4-Digit PIN" />
                <meta name="twitter:description" content="Guess the secret code and see how your choice compares globally." />

                {/* Font */}
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap" rel="stylesheet" />
            </Head>

            <div className="bg-slate-50 text-slate-900 leading-relaxed min-h-screen">
                <style jsx global>{`
          body { font-family: 'Plus Jakarta Sans', sans-serif; }
          .glass { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); }
          .ad-placeholder {
            background: #f3f4f6;
            border: 2px dashed #d1d5db;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #9ca3af;
            margin: 20px 0;
            border-radius: 12px;
          }
        `}</style>

                {/* Back link (since you use common header/footer) */}
                <div className="max-w-4xl mx-auto px-4 pt-8">
                    <Link href="/" className="text-indigo-600 hover:underline text-sm font-bold">&larr; Back to Bored Button</Link>
                </div>

                {/* Top Ad - hidden until approval */}
                {hasAdsenseApproval && (
                    <div className="ad-placeholder h-24 w-full max-w-4xl mx-auto mt-8">
                        <span className="text-xs font-bold uppercase tracking-widest">Advertisement</span>
                    </div>
                )}

                <main className="max-w-4xl mx-auto px-4 py-12">
                    <section id="game" className="text-center py-10">
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-slate-900">
                            The Great <span className="text-indigo-600">PIN Challenge</span>
                        </h1>
                        <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto">
                            There are 10,000 possible combinations. Based on global data, most people choose the same patterns. Can you find the secret one?
                        </p>

                        <div className="glass border border-slate-200 rounded-3xl p-8 md:p-12 shadow-2xl shadow-indigo-100">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex flex-col items-center">
                                    <label htmlFor="guess" className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">
                                        Enter 4-Digit Code
                                    </label>
                                    <input
                                        type="text"
                                        id="guess"
                                        value={userGuess}
                                        onChange={(e) => setUserGuess(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                        placeholder="0000"
                                        inputMode="numeric"
                                        autoFocus
                                        required
                                        className="w-full max-w-xs text-center text-6xl font-mono tracking-[0.5em] py-6 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full max-w-xs bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-bold py-5 rounded-2xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1 active:scale-95 text-xl"
                                >
                                    {loading ? "Checking..." : "Unlock Now"}
                                </button>
                            </form>
                            {messageHtml && <div className="mt-8" dangerouslySetInnerHTML={{ __html: messageHtml }} />}
                        </div>
                    </section>

                    {userGuess && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 mt-12">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
                                <span className="block text-slate-400 text-xs font-bold uppercase">Your Guess</span>
                                <span className="text-3xl font-extrabold text-indigo-600">{userGuess}</span>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
                                <span className="block text-slate-400 text-xs font-bold uppercase">Global Match</span>
                                <span className="text-3xl font-extrabold text-indigo-600">{sameCount} users</span>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
                                <span className="block text-slate-400 text-xs font-bold uppercase">Popularity Rank</span>
                                <span className="text-3xl font-extrabold text-indigo-600">{userRank}</span>
                            </div>
                        </div>
                    )}

                    {/* In-article Ad - hidden until approval */}
                    {hasAdsenseApproval && (
                        <div className="ad-placeholder h-64 w-full">
                            <span className="text-xs font-bold uppercase tracking-widest">Advertisement</span>
                        </div>
                    )}

                    <section id="about" className="prose prose-slate max-w-none mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why Do We Use 4-Digit PINs?</h2>
                        <p>
                            The 4-digit PIN system was invented in 1967 by James Goodfellow for the first ATM. While 6 digits are more secure, 4 digits were chosen because they were easier for people to remember. Today, there are exactly <strong>10,000 possible combinations</strong> (from 0000 to 9999).
                        </p>
                        <h3 className="text-2xl font-bold mt-8 mb-4">The Psychology of Guessing</h3>
                        <p>
                            Did you know that "1234" accounts for nearly 10% of all 4-digit passwords? People tend to choose dates, years, or visual patterns. Our game tracks these trends globally to show you how "human" your guessing patterns are.
                        </p>
                    </section>

                    <section id="stats" className="mb-16">
                        <h2 className="text-3xl font-bold text-center mb-8">Global Leaderboard (Top 10 Most Common)</h2>
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="p-6 text-sm font-bold uppercase text-slate-500">Rank</th>
                                        <th className="p-6 text-sm font-bold uppercase text-slate-500 text-center">Password</th>
                                        <th className="p-6 text-sm font-bold uppercase text-slate-500 text-right">Frequency</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {topGuesses.map((tg, index) => (
                                        <tr key={tg.guess} className="hover:bg-indigo-50/50 transition-colors">
                                            <td className="p-6 font-bold text-slate-400">#{index + 1}</td>
                                            <td className="p-6 text-center font-mono text-2xl font-bold tracking-widest text-slate-700">{tg.guess}</td>
                                            <td className="p-6 text-right">
                                                <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full font-bold">
                                                    {tg.cnt} {tg.cnt === 1 ? "Guess" : "Guesses"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 text-center text-slate-500">
                            Analyzed <strong>{totalGuesses.toLocaleString()}</strong> total attempts from <strong>{totalPlayers.toLocaleString()}</strong> unique users.
                        </div>
                    </section>

                    {/* Bottom Ad - hidden until approval */}
                    {hasAdsenseApproval && (
                        <div className="ad-placeholder h-32 w-full">
                            <span className="text-xs font-bold uppercase tracking-widest">Advertisement</span>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}