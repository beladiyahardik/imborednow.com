import FocusFlow from "@/components/games/FocusFlow";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

export default function FocusFlowPage({ seo, jsonLd }: any) {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-200 overflow-x-hidden select-none">
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href={seo.canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* --- HERO / GAME ENGINE SECTION --- */}
      <section className="bg-[#0F172A] pt-12 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Top Navigation */}
          <nav className="flex items-center justify-between mb-12">
            <Link
              href="/p/games-to-play-when-bored"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              All Systems
            </Link>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500/80">
              Neural Training Unit-01
            </div>
          </nav>

          {/* Title & Subtitle */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
              FOCUS <span className="text-indigo-500">FLOW</span>
            </h1>
            <p className="text-slate-400 font-medium text-lg md:text-xl max-w-2xl mx-auto">
              Sustain the singularity. Eliminate distractions before they breach
              the core.
            </p>
          </div>

          {/* Main Game Container - Responsive & Themed */}
          <div className="relative w-full max-w-5xl mx-auto aspect-[4/5] md:aspect-video bg-[#11131E] rounded-[3rem] border-8 border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <FocusFlow />
          </div>
        </div>
      </section>

      {/* --- HOW TO PLAY SECTION (DARK THEME) --- */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#11131E] rounded-[3.5rem] p-10 md:p-16 border border-white/5 shadow-2xl mb-20">
            <h3 className="text-3xl font-black text-white mb-12 flex items-center gap-4">
              <span className="text-4xl">⚡</span>
              <span>Training Protocols</span>
            </h3>
            <ul className="space-y-10">
              {[
                {
                  title: "Defend the Singularity",
                  desc: "The indigo core represents your mental focus. External blocks are 'noise'—click or tap them to keep the channel clean.",
                },
                {
                  title: "Adaptive Interference",
                  desc: "As your score increases, the interference frequency will intensify. The noise will move faster and spawn more frequently.",
                },
                {
                  title: "Cognitive Breach",
                  desc: "If a single distraction reaches the center, the flow is broken. Use rapid precision to maintain the highest possible uptime.",
                },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-6">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white text-sm font-bold rounded-full flex items-center justify-center mt-1 shadow-[0_0_10px_rgba(79,70,229,0.4)]">
                    {idx + 1}
                  </span>
                  <div className="text-left">
                    <h4 className="text-white font-bold text-xl mb-2 tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 font-medium text-lg leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* --- ARTICLE SECTION --- */}
          <article className="prose prose-slate lg:prose-xl max-w-none text-slate-700 leading-relaxed space-y-12">
            <div className="text-center mb-20">
              <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                Attention Theory
              </span>
              <h2 className="text-4xl md:text-7xl font-black tracking-tight text-slate-950 mt-8 mb-8 leading-tight">
                The Science of <br />
                <span className="text-indigo-600 italic">Hyper-Focus</span>
              </h2>
              <p className="text-xl text-slate-500 font-medium italic">
                &quot;Concentration is the ability to think about nothing
                else.&quot;
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                1. The Selective Attention Gate
              </h3>
              <p>
                In a world of constant notification and noise, your brain acts
                as a filter. Focus Flow mimics the
                <strong> Prefrontal Cortex</strong>&apos;s job of inhibiting
                irrelevant stimuli. Every block you click is a digital
                representation of a distraction you successfully ignore in real
                life.
              </p>

              <p>
                As the game speeds up, you enter a &quot;Flow State&quot;—a
                psychological phenomenon where your sense of time and self
                vanishes, replaced by pure execution and focus.
              </p>
            </div>

            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 my-12 text-left">
              <h3 className="text-2xl font-black text-slate-900 mb-4">
                The Cost of Context Switching
              </h3>
              <p>
                In Focus Flow, a single distraction ends the game. In life,
                research suggests it takes an average of
                <strong> 23 minutes</strong> to return to deep work after a
                single interruption.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 my-16 text-left">
              <div className="p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100">
                <h4 className="font-black text-indigo-900 mb-2 uppercase tracking-tight">
                  Reaction Time
                </h4>
                <p className="text-sm leading-relaxed">
                  Average human reaction time is 250ms. High-level focus
                  training can push this closer to 150ms.
                </p>
              </div>
              <div className="p-8 bg-slate-900 rounded-[2rem] text-white">
                <h4 className="font-black mb-2 uppercase tracking-tight">
                  Flicker Fusion
                </h4>
                <p className="text-sm leading-relaxed opacity-80">
                  Your brain starts to perceive motion as fluid at 60Hz. Focus
                  Flow uses high-refresh rendering to keep your tracking
                  precise.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      seo: {
        title: "Focus Flow | Minimalist Concentration Game 2026",
        description:
          "Master your attention in Focus Flow. Protect the indigo core from digital distractions in this high-speed concentration challenge. No downloads required.",
        keywords:
          "concentration game, reaction time test, focus flow game, browser logic games, attention training, imborednow games",
        canonical: "https://www.imborednow.com/p/focus-flow",
      },
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Focus Flow Concentration Lab",
        operatingSystem: "Web",
        applicationCategory: "GameApplication",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    },
  };
};
