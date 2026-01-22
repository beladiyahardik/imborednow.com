import { useState, useEffect } from "react";
import Head from "next/head";

// --- Types ---
interface Scenario {
    id: number;
    benefit: string;
    drawback: string;
}

interface VoteStats {
    yes_count: number;
    no_count: number;
}

export default function PressTheButton() {
    const [scenario, setScenario] = useState<Scenario | null>(null);
    const [stats, setStats] = useState<VoteStats | null>(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [loading, setLoading] = useState(true);

    const API_BASE = "https://belbytes.com/APIs/imborednow";

    useEffect(() => {
        fetchNewScenario();
    }, []);

    const fetchNewScenario = async () => {
        setLoading(true);
        setHasVoted(false);
        setStats(null);
        try {
            const res = await fetch(`${API_BASE}/get_scenario.php`);
            if (!res.ok) throw new Error("Server error");
            const data = await res.json();
            setScenario(data);
        } catch (err) {
            console.error("Failed to fetch scenario:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleVote = async (choice: 'yes' | 'no') => {
        if (!scenario || hasVoted) return;
        try {
            const res = await fetch(`${API_BASE}/vote.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: scenario.id, choice }),
            });
            const data = await res.json();
            if (data.success) {
                setStats({ yes_count: data.yes_count, no_count: data.no_count });
                setHasVoted(true);
            }
        } catch (err) {
            console.error("Vote failed:", err);
        }
    };

    const total = (stats?.yes_count || 0) + (stats?.no_count || 0);
    const yesPercent = total > 0 ? Math.round((stats!.yes_count / total) * 100) : 0;
    const noPercent = total > 0 ? 100 - yesPercent : 0;

    return (
        <div className="min-h-screen bg-[#020617] font-sans selection:bg-red-500 selection:text-white">
            <Head>
                <title>Red Button Game: Will You Press This Button? | Hit It Now!</title>
                <meta name="description" content="Face hilarious dilemmas in the ultimate red button hit the button game! Will you press this button for a catch? Join the best online gaming site for fun challenges." />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
                <meta property="og:title" content="The Red Button Challenge: Will You Press It? 🔴" />
                <meta property="og:description" content="One button. One catch. Would you press it? Best online gaming site for absurd dilemmas." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.imborednow.com/p/press-the-button" />
                <meta property="og:image" content="https://www.imborednow.com/assets/red-button-share-image.jpg" />
                <link rel="canonical" href="https://www.imborednow.com/p/press-the-button" />
            </Head>

            {/* --- FIXED VIEWPORT CONTAINER (No Scroll Zone) --- */}
            <div className="h-screen flex flex-col overflow-hidden relative">
                {/* Background Glows */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/20 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
                </div>

                {/* Main Game Area (Flex-1 to take available space without scroll) */}
                <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 gap-4 md:gap-8 overflow-hidden">
                    <div className="text-center max-w-2xl">
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
                            WILL YOU <span className="text-red-500 underline decoration-red-500/30">PRESS IT?</span>
                        </h1>
                    </div>

                    {/* Dilemma Cards - Split Screen Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-5xl h-auto md:h-64">
                        <div className="bg-emerald-500 p-6 md:p-10 rounded-[2rem] flex flex-col justify-center shadow-2xl relative overflow-hidden group">
                            <span className="absolute top-4 left-6 text-[10px] font-black text-emerald-900/50 uppercase">The Benefit</span>
                            <p className="text-xl md:text-3xl font-black text-emerald-950 leading-tight">
                                {loading ? "Finding perks..." : scenario?.benefit}
                            </p>
                        </div>
                        <div className="bg-slate-900 p-6 md:p-10 rounded-[2rem] flex flex-col justify-center shadow-2xl border border-white/10 relative overflow-hidden group">
                            <span className="absolute top-4 left-6 text-[10px] font-black text-red-500 uppercase">The Drawback</span>
                            <p className="text-xl md:text-3xl font-black text-slate-100 leading-tight">
                                {loading ? "Calculating risks..." : scenario?.drawback}
                            </p>
                        </div>
                    </div>

                    {/* Action Zone */}
                    <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] flex flex-col items-center gap-6">
                        {!hasVoted ? (
                            <>
                                <button
                                    onClick={() => handleVote('yes')}
                                    className="w-full py-6 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-2xl shadow-[0_10px_0_rgb(153,27,27)] active:shadow-none active:translate-y-[10px] transition-all"
                                >
                                    PRESS BUTTON 🔴
                                </button>
                                <button
                                    onClick={() => handleVote('no')}
                                    className="text-slate-400 font-bold hover:text-white transition-colors uppercase text-sm tracking-widest"
                                >
                                    No, I'll pass ✗
                                </button>
                            </>
                        ) : (
                            <div className="w-full animate-in zoom-in-95 duration-300">
                                <div className="flex justify-between mb-4 px-2">
                                    <span className="text-emerald-400 font-black">{yesPercent}% Pressed</span>
                                    <span className="text-slate-400 font-black">{noPercent}% Refused</span>
                                </div>
                                <div className="w-full h-12 bg-black/40 rounded-xl overflow-hidden flex border border-white/10 mb-6">
                                    <div style={{ width: `${yesPercent}%` }} className="bg-emerald-500 h-full transition-all duration-1000" />
                                    <div style={{ width: `${noPercent}%` }} className="bg-slate-700 h-full transition-all duration-1000" />
                                </div>
                                <button
                                    onClick={fetchNewScenario}
                                    className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-black text-lg transition-all"
                                >
                                    NEXT CHALLENGE →
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Bottom Prompt */}
                    <div className="animate-bounce mt-2 text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                        Scroll down to discover the secret psychology
                    </div>
                </main>
            </div>

            {/* --- SEO CONTENT LAYER (Scrollable) --- */}
            {/* --- SEO CONTENT LAYER (Scrollable) --- */}
            <section className="bg-white text-slate-900 py-24 px-6 relative z-30">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <header className="mb-12 border-b-4 border-red-500 pb-6">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-950 mb-4">
                            The Science Behind the <span className="text-red-600">Red Button</span> Game
                        </h2>
                        <p className="text-xl text-slate-600 font-medium leading-relaxed">
                            Welcome to <strong className="text-slate-900">ImBoredNow</strong>, recognized as the
                            <strong> best gaming site</strong> for interactive moral dilemmas and the viral
                            <strong> hit the button game</strong> phenomenon. In 2026, online entertainment is about
                            connection, psychology, and the eternal question: <em className="text-red-600">Will you press this button?</em>
                        </p>
                    </header>

                    {/* Article Body with Manual Spacing */}
                    <article className="space-y-10 text-lg leading-loose text-slate-700">

                        <div className="space-y-4">
                            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                                Why is the "Press This Button" Game So Addictive?
                            </h3>
                            <p>
                                Our <strong>online gaming site</strong> focuses on the "Curiosity Gap." Humans are hardwired
                                to explore "What If" scenarios. Whether it is a <strong>red button</strong> that grants
                                you eternal wealth but makes your favorite coffee shop close forever, or a <strong>will you
                                    press this button</strong> challenge involving absurd superpowers, the dopamine hit comes
                                from seeing how your mind compares to the global collective.
                            </p>
                        </div>

                        {/* Featured Box */}
                        <div className="bg-slate-100 p-8 md:p-12 rounded-[2.5rem] my-12 border-l-[12px] border-purple-600 shadow-inner">
                            <h4 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-wider">
                                Top 5 Reasons We Are the Best Gaming Site for Dilemmas:
                            </h4>
                            <ul className="space-y-4">
                                <li className="flex gap-3 items-start font-bold text-slate-800">
                                    <span className="text-purple-600">✓</span>
                                    <span>Dynamic Scenarios: <span className="font-medium text-slate-600">Thousands of user-generated and AI-curated dilemmas.</span></span>
                                </li>
                                <li className="flex gap-3 items-start font-bold text-slate-800">
                                    <span className="text-purple-600">✓</span>
                                    <span>Real-Time Stats: <span className="font-medium text-slate-600">Instantly see if you are a "Yes Button" or "No Button" person.</span></span>
                                </li>
                                <li className="flex gap-3 items-start font-bold text-slate-800">
                                    <span className="text-purple-600">✓</span>
                                    <span>Mobile Optimization: <span className="font-medium text-slate-600">The smoothest hit the button game experience on any device.</span></span>
                                </li>
                                <li className="flex gap-3 items-start font-bold text-slate-800">
                                    <span className="text-purple-600">✓</span>
                                    <span>Safe for All: <span className="font-medium text-slate-600">Funny, absurd, and tempting without the toxicity of other gaming websites.</span></span>
                                </li>
                                <li className="flex gap-3 items-start font-bold text-slate-800">
                                    <span className="text-purple-600">✓</span>
                                    <span>Zero Latency: <span className="font-medium text-slate-600">Fast-loading infrastructure for instant online gaming site gratification.</span></span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                                Understanding the "Will Press Yes Button or No Button" Logic
                            </h3>
                            <p>
                                When users interact with our <strong>gaming website</strong>, they aren&apos;t just clicking a pixel.
                                They are performing a cost-benefit analysis in milliseconds. This type of <strong>good gaming site</strong>
                                interaction is used by psychologists to study &quot;Utilitarian vs. Deontological&quot; decision making.
                                When you face a <strong>red button</strong> challenge, your brain weighs the &quot;Perk&quot; against the &quot;Catch.&quot;
                            </p>
                            <p>
                                In most <strong>online gaming sites</strong>, the catch is minor, but on <strong>ImBoredNow</strong>,
                                we craft scenarios that truly make you pause. This deep engagement is why we remain one of
                                the <strong>good gaming sites</strong> to visit when you have 5 minutes to kill.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                                The Psychology of the Red Button
                            </h3>
                            <p>
                                The &quot;Red Button&quot; has long been a symbol of power and absolute choice in pop culture.
                                Our <strong>hit the button game</strong> captures that intensity and bottles it into a fun,
                                safe online format. We ensure our <strong>gaming website</strong> stays updated with fresh
                                content daily to keep the community engaged.
                            </p>
                            <p>
                                What makes a <strong>gaming website</strong> go viral? It’s the shareability. After you
                                decide to <strong>press yes button or no button</strong>, you can share your results.
                                This drives community engagement and cements our reputation as the <strong>best gaming site</strong>
                                for social interaction in 2026.
                            </p>
                        </div>

                        <div className="pt-12 border-t border-slate-200">
                            <h3 className="text-2xl font-black text-slate-900 mb-4">How to Play</h3>
                            <ol className="list-decimal pl-6 space-y-3 font-medium text-slate-600">
                                <li>Read the Green Card (The Perk) – This is what you gain.</li>
                                <li>Read the Black Card (The Catch) – This is the consequence.</li>
                                <li>Make your choice: <strong>Will you press this button?</strong></li>
                                <li>Compare your results with the global community.</li>
                            </ol>
                        </div>

                        <footer className="mt-20 pt-10 border-t border-slate-200 text-slate-400 text-sm italic">
                            &copy; 2026 ImBoredNow Gaming Website. All rights reserved. Your #1 source for
                            <strong> hit the button games</strong> and <strong>online gaming site</strong> fun.
                            Optimized for fast, mobile-friendly entertainment.
                        </footer>
                    </article>
                </div>
            </section>
        </div>
    );
}