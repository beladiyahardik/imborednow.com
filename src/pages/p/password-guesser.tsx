import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const API_URL = 'https://belbytes.com/APIs/imborednow/guesser.php';

// --- SERVER SIDE (SEO) ---
export async function getStaticProps() {
    let initialStats = { totalPlayers: 0, totalGuesses: 0, topGuesses: [] };

    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data.success) {
            initialStats = {
                totalPlayers: data.totalPlayers || 0,
                totalGuesses: data.totalGuesses || 0,
                topGuesses: data.topGuesses || []
            };
        }
    } catch (e) {
        console.error("Static fetch failed", e);
    }

    return {
        props: { initialStats },
        revalidate: 60, // Refresh static data every minute
    };
}

// --- CLIENT SIDE COMPONENT ---
function ClientGame({ initialStats }: { initialStats: any }) {
    const [userGuess, setUserGuess] = useState('');
    const [messageHtml, setMessageHtml] = useState('');
    const [clueText, setClueText] = useState('');
    const [progress, setProgress] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [sameCount, setSameCount] = useState(0);
    const [userRank, setUserRank] = useState('Not ranked');
    const [liveStats, setLiveStats] = useState(initialStats);
    const [loading, setLoading] = useState(false);

    const SECRET = 3141;

    const getClueAndProgress = (guess: number) => {
        const diff = Math.abs(guess - SECRET);
        if (diff === 0) return { text: '🎉 Exact match!', pct: 100 };
        if (diff <= 20) return { text: 'Extremely close! 🔥', pct: 95 };
        if (diff <= 100) return { text: 'Very close!', pct: 85 };
        if (diff <= 300) return { text: 'Close...', pct: 70 };
        if (diff <= 999) return { text: 'Getting warmer', pct: 50 };
        if (diff <= 3000) return { text: 'Still far', pct: 25 };
        return { text: 'Way off', pct: 5 };
    };

    const fetchLiveUpdates = async () => {
        try {setAttempts
            const res = await fetch(API_URL);
            const data = await res.json();
            if (data.success) setLiveStats(data);
        } catch { }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const guessStr = userGuess.trim();
        if (!/^\d{4}$/.test(guessStr)) return;

        const { text, pct } = getClueAndProgress(parseInt(guessStr, 10));
        setClueText(text);
        setProgress(pct);
        setAttempts(prev => prev + 1);
        setLoading(true);

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ guess: guessStr }),
            });
            const data = await res.json();
            if (data.success) {
                setMessageHtml(data.messageHtml || '');
                setSameCount(data.sameCount || 0);
                setUserRank(data.userRank || 'Not ranked');
            }
            if (attempts + 1 >= 30 && guessStr !== '3141') {
                setTimeout(() => {
                    setAttempts(0); setUserGuess(''); setMessageHtml(''); setClueText(''); setProgress(0);
                }, 3000);
            }
        } catch {
            setMessageHtml('<div class="p-4 bg-red-50 text-red-800 rounded-2xl">Network error</div>');
        } finally {
            setLoading(false);
            fetchLiveUpdates();
        }
    };

    return (
        <section className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-[800] tracking-tight mb-4 text-slate-900">
                Crack the <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">PIN</span>
            </h1>

            <div className="max-w-md mx-auto mb-10">
                <div className="flex justify-between items-end mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</span>
                    <span className="text-sm font-bold text-indigo-600 uppercase">{clueText || 'Start guessing'}</span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden p-[2px]">
                    <div className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-4 flex items-center justify-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">Attempt {attempts}/30</span>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 sm:p-12 shadow-xl max-w-lg mx-auto">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text" inputMode="numeric" maxLength={4} value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value.replace(/\D/g, ''))}
                        className="w-full text-center text-6xl font-bold tracking-[0.4em] py-8 rounded-3xl border-2 border-slate-100 focus:border-indigo-500 outline-none bg-slate-50/50"
                        placeholder="0000"
                    />
                    <button type="submit" disabled={loading || userGuess.length < 4} className="mt-8 w-full py-5 text-xl font-extrabold rounded-2xl bg-indigo-600 text-white shadow-lg active:scale-95 transition-all">
                        {loading ? 'Verifying...' : 'Submit Guess'}
                    </button>
                </form>
                <div className="mt-8 min-h-[60px]" dangerouslySetInnerHTML={{ __html: messageHtml }} />
            </div>

            {/* Live Stats Table */}
            <div className="mt-20 bg-slate-900 rounded-[3rem] p-8 sm:p-12 text-white overflow-hidden shadow-2xl">
                <h2 className="text-2xl font-bold mb-8">Network Statistics</h2>
                <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <div className="text-3xl font-black text-indigo-400">{liveStats.totalGuesses.toLocaleString()}</div>
                        <div className="text-[10px] uppercase tracking-widest opacity-50">Total Guesses</div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <div className="text-3xl font-black text-purple-400">{liveStats.totalPlayers.toLocaleString()}</div>
                        <div className="text-[10px] uppercase tracking-widest opacity-50">Global Players</div>
                    </div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/10">
                    <table className="w-full text-sm">
                        <thead className="bg-white/5 text-slate-400 uppercase text-[10px]">
                            <tr><th className="p-4 text-left">Rank</th><th className="p-4 text-center">PIN</th><th className="p-4 text-right">Count</th></tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {liveStats.topGuesses.map((g: any, i: number) => (
                                <tr key={i} className="hover:bg-white/5">
                                    <td className="p-4 opacity-50">#{i + 1}</td>
                                    <td className="p-4 text-center font-mono font-bold text-lg">{g.guess}</td>
                                    <td className="p-4 text-right text-indigo-300 font-bold">{g.cnt.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

// --- MAIN PAGE ---
export default function PasswordGuesser({ initialStats }: { initialStats: any }) {
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

            <div className="min-h-screen bg-[#f8fafc] font-['Plus_Jakarta_Sans',_sans-serif]">
                <div className="max-w-4xl mx-auto px-6 pt-8">
                    <Link href="/" className="text-slate-500 hover:text-indigo-600 font-semibold transition-all">← Back to home</Link>
                </div>

                <main className="max-w-4xl mx-auto px-6 py-12">
                    {/* Interaction happens here */}
                    <ClientGame initialStats={initialStats} />

                    {/* SEO CONTENT: Static and searchable by Google */}
                    <section className="mt-20 space-y-12">
                        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 sm:p-12 shadow-sm">
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">What is the 4-Digit PIN Challenge?</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                The Password Guesser is a specialized logic game designed to highlight human predictability in digital security. With 10,000 possible combinations, it demonstrates why sequences like "1234" are the first line of attack for hackers.
                            </p>
                            <div className="mt-8 grid md:grid-cols-2 gap-6">
                                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                                    <h3 className="font-bold text-blue-900 mb-2">Psychological Patterns</h3>
                                    <p className="text-sm text-blue-800/70">Users often choose birth years or simple keyboard shapes. This game tracks those trends live.</p>
                                </div>
                                <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                                    <h3 className="font-bold text-green-900 mb-2">Security Education</h3>
                                    <p className="text-sm text-green-800/70">By seeing how many others guess your same code, you learn to pick truly unique PINs.</p>
                                </div>
                            </div>
                        </div>

                        {/* Additional SEO Boxes... (History, Tips, etc.) */}
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="bg-white border border-slate-200 rounded-[2rem] p-8">
                                <h3 className="text-xl font-bold mb-4">History of the PIN</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">Invented in 1967 for the first ATM, the 4-digit code was the maximum length most people could memorize easily.</p>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-[2rem] p-8">
                                <h3 className="text-xl font-bold mb-4">Pro Security Tips</h3>
                                <ul className="text-sm text-slate-500 space-y-2">
                                    <li>• Avoid 1234 or 0000</li>
                                    <li>• Don't use your birth year</li>
                                    <li>• Use unique PINs for every card</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}