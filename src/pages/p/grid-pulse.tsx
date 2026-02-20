"use client";
import GridPulse from "@/components/games/GridPulse";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

export default function GridPulsePage({ seo, jsonLd }: any) {
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
              Neural Training Unit-03
            </div>
          </nav>

          {/* Title & Subtitle */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter uppercase">
              Grid <span className="text-indigo-500">Pulse</span>
            </h1>
            <p className="text-slate-400 font-medium text-lg md:text-xl max-w-2xl mx-auto">
              Synchronize your reflexes. Neutralize the glowing nodes before the
              cycle expires.
            </p>
          </div>

          {/* Main Game Container */}
          <div className="relative w-full max-w-5xl mx-auto aspect-[4/5] md:aspect-video bg-[#11131E] rounded-[3rem] border-8 border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <GridPulse />
          </div>
        </div>
      </section>

      {/* --- HOW TO PLAY SECTION --- */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#11131E] rounded-[3.5rem] p-10 md:p-16 border border-white/5 shadow-2xl mb-20">
            <h3 className="text-3xl font-black text-white mb-12 flex items-center gap-4">
              <span className="text-4xl">⚡</span>
              <span>Reflex Protocols</span>
            </h3>
            <ul className="space-y-10">
              {[
                {
                  title: "Identify the Stimulus",
                  desc: "Watch the grid for the indigo pulse. A single node will activate—this is your target.",
                },
                {
                  title: "Rapid Neutralization",
                  desc: "Tap or click the active node immediately. Precision is vital; missing the node or hitting a dead cell ends the session.",
                },
                {
                  title: "Tempo Acceleration",
                  desc: "As your sync count increases, the pulse duration shortens. Your brain must transition from conscious thought to pure instinct.",
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
                Neuromotor Speed
              </span>
              <h2 className="text-4xl md:text-7xl font-black tracking-tight text-slate-950 mt-8 mb-8 leading-tight">
                The Science of <br />
                <span className="text-indigo-600 italic">Rapid Response</span>
              </h2>
              <p className="text-xl text-slate-500 font-medium italic">
                &quot;Speed is the byproduct of neural efficiency.&quot;
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                1. The Reflex Arc
              </h3>
              <p>
                In Grid Pulse, we bypass complex decision-making and target the{" "}
                <strong>Reflex Arc</strong>. This is the neural pathway that
                mediates a reflex action. By reducing the time between stimulus
                (the light) and response (the tap), you are effectively
                &quot;tuning&quot; your nervous system.
              </p>

              <p>
                As you play, the brain shifts the task from the{" "}
                <em>Cerebral Cortex</em> (high-level processing) to the{" "}
                <em>Basal Ganglia</em> (automaticity), allowing for speeds that
                feel almost superhuman.
              </p>
            </div>

            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 my-12 text-left">
              <h3 className="text-2xl font-black text-slate-900 mb-4">
                What is Peripheral Vision Tracking?
              </h3>
              <p>
                Elite Grid Pulse players don&apos;t look at individual squares.
                They soften their gaze to take in the entire grid at once. This
                utilizes <strong>rods</strong> in the retina, which are more
                sensitive to motion and light changes than the color-focused
                cones in our central vision.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 my-16 text-left">
              <div className="p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100">
                <h4 className="font-black text-indigo-900 mb-2 uppercase tracking-tight">
                  Signal Latency
                </h4>
                <p className="text-sm leading-relaxed">
                  The signal from your eye to your finger travels at roughly 250
                  miles per hour. Every millisecond saved is a win for neural
                  efficiency.
                </p>
              </div>
              <div className="p-8 bg-slate-900 rounded-[2rem] text-white">
                <h4 className="font-black mb-2 uppercase tracking-tight">
                  Synaptic Gating
                </h4>
                <p className="text-sm leading-relaxed opacity-80">
                  Focusing on a single task allows the brain to &quot;gate&quot;
                  or filter out background noise, a critical skill in
                  high-stress environments.
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
        title: "Grid Pulse | High-Speed Reflex & Reaction Game 2026",
        description:
          "Test your reaction time with Grid Pulse. Tap the glowing nodes in the 3x3 grid as fast as possible. Minimalist brain training for high-speed focus.",
        keywords:
          "reflex game, reaction time test, grid pulse, speed training, cognitive lab, imborednow",
        canonical: "https://www.imborednow.com/p/grid-pulse",
      },
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Grid Pulse Reflex Lab",
        operatingSystem: "Web",
        applicationCategory: "GameApplication",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    },
  };
};
