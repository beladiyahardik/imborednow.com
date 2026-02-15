import Head from "next/head";
import { GetStaticProps } from "next";
import ResonanceHero from "@/components/games/ResonanceHero";

export default function ResonancePage({ seo, jsonLd }: any) {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-cyan-200 overflow-x-hidden select-none">
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

      <ResonanceHero />

      {/* --- HOW TO PLAY SECTION (UPDATED THEME) --- */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#11131E] rounded-[3.5rem] p-10 md:p-16 border border-white/5 shadow-2xl mb-20">
            <h3 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
              <span className="text-4xl">🎮</span>
              <span>How to Play</span>
            </h3>
            <ul className="space-y-8">
              {[
                "Analyze the ghost wave (dashed line) on the oscilloscope grid.",
                "Identify the frequency, height, and position of the target signal.",
                "Adjust the Frequency slider to match the speed of the oscillation.",
                "Modify the Amplitude to match the peak-to-peak height of the wave.",
                "Fine-tune the Phase slider to shift your wave into perfect alignment.",
                "Achieve 100% Coherence to lock the signal and advance to the next level!",
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-6 text-left">
                  <span className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white text-sm font-bold rounded-full flex items-center justify-center mt-1">
                    {idx + 1}
                  </span>
                  <p className="text-slate-300 font-medium text-lg leading-relaxed">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* --- ARTICLE SECTION --- */}
          <article className="space-y-16">
            <div className="text-center">
              <span className="bg-cyan-100 text-cyan-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                Harmonic Analysis
              </span>
              <h2 className="text-4xl md:text-7xl font-black tracking-tight text-slate-950 mt-8 mb-8 leading-tight">
                Finding Your Frequency: <br />
                <span className="text-cyan-600 italic">
                  The Science of Synchronicity
                </span>
              </h2>
              <p className="text-xl text-slate-500 font-medium italic">
                "Everything in life is a vibration. When you match the rhythm,
                the world opens up."
              </p>
            </div>

            <div className="prose prose-slate lg:prose-xl max-w-none text-slate-700 leading-relaxed space-y-12">
              <div className="space-y-6">
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                  1. The Invisible Symphony
                </h3>
                <p>
                  Modern life is a sea of waves. Radio, Wi-Fi, and cellular data
                  are all vibrating through you right now. In **Resonance**,
                  you’re doing exactly what a classic radio dial does - picking
                  one specific &quot;song&quot; out of that deafening static.
                </p>
              </div>

              <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 my-12 text-left">
                <h3 className="text-2xl font-black text-slate-900 mb-4">
                  The Swing Effect
                </h3>
                <p>
                  Resonance is like pushing a child on a swing. Timed perfectly,
                  almost no effort sends them soaring. This is the art of adding
                  energy at the precise moment to create a massive result.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 my-16 text-left">
                <div className="p-8 bg-cyan-50 rounded-[2rem] border border-cyan-100">
                  <h4 className="font-black text-cyan-900 mb-2 uppercase tracking-tight">
                    Frequency
                  </h4>
                  <p className="text-sm leading-relaxed">
                    The heartbeat of the signal. If you&apos;re too slow or too
                    fast, you&apos;ll never catch the rhythm.
                  </p>
                </div>
                <div className="p-8 bg-slate-900 rounded-[2rem] text-white">
                  <h4 className="font-black mb-2 uppercase tracking-tight">
                    Amplitude
                  </h4>
                  <p className="text-sm leading-relaxed opacity-80">
                    The volume and energy. It dictates how much space your
                    signal occupies.
                  </p>
                </div>
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
        title: "Resonance | Sine Wave Logic & Harmonic Puzzle Online",
        description:
          "Master the art of frequency, amplitude, and phase. Align your signal to the target in this physics-based logic game. Free browser brain training 2026.",
        keywords:
          "resonance game, sine wave puzzle, frequency game, physics puzzle online, oscilloscope game, brain training music",
        canonical: "https://www.imborednow.com/p/resonance",
      },
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Resonance Logic Lab",
        operatingSystem: "Web",
        applicationCategory: "EducationalGame",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    },
  };
};
