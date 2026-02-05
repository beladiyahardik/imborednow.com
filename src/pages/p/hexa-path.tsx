import HexaPathHero from "@/components/games/HexaPathHero";
import { GetStaticProps } from "next";
import Head from "next/head";

export default function HexaPathPage({ seo, jsonLd }: any) {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-rose-200 overflow-x-hidden select-none">
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href={seo.canonical} />

        {/* Schema for Google to recognize it as a Game */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* --- HERO / GAME SECTION --- */}
      <HexaPathHero />

      {/* --- HOW TO PLAY SECTION (NEWLY ADDED) --- */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#11131E] rounded-[3.5rem] p-10 md:p-16 border border-white/5 shadow-2xl mb-20">
            <h3 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
              <span className="text-4xl">🎮</span>
              <span>How to Play</span>
            </h3>
            <ul className="space-y-8">
              {[
                "Identify the colored endpoints positioned on the hexagonal grid.",
                "Drag from an endpoint to create a path to its matching color pair.",
                "Paths cannot intersect or overlap; crossing one will erase the other.",
                "Ensure that every single hexagonal cell is filled with a color path.",
                "To win, all colors must be connected and the grid must be 100% occupied.",
                "Use the 'Reset Logic' button if you reach an unsolvable configuration.",
              ].map((text, idx) => (
                <li key={idx} className="flex items-center gap-6 text-left">
                  <span className="flex-shrink-0 w-8 h-8 bg-rose-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <p className="text-slate-300 font-medium text-lg leading-relaxed m-0">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* --- ARTICLE SECTION --- */}
          <article className="space-y-16">
            <div className="text-center">
              <span className="bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                Cognitive Lab
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-950 mt-8 mb-6 leading-tight">
                Axial Logic: <br />
                <span className="text-rose-600 italic font-black">
                  Six Sides of Focus
                </span>
              </h2>
            </div>

            <div className="space-y-12 text-lg text-slate-700 leading-relaxed">
              <div className="bg-slate-50 p-10 md:p-16 rounded-[3rem] border border-slate-100">
                <h3 className="text-3xl font-black text-slate-900 mb-6 text-left">
                  Efficiency in Geometry
                </h3>
                <p className="text-left">
                  Hexagons are nature's most efficient shape. In a hexagonal
                  grid, every neighbor is equidistant. This symmetry creates a
                  pure logic puzzle that activates the parietal lobe,
                  responsible for spatial navigation.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900">
                    Mental Rotation
                  </h3>
                  <p>
                    Regularly solving axial puzzles enhances mental rotation
                    skills - the ability to manipulate 2D and 3D objects in your
                    mind's eye.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900">
                    Flow State
                  </h3>
                  <p>
                    The lack of timers fosters a state of Deep Work, moving the
                    brain from high-frequency Beta waves to relaxed Alpha waves.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-12 rounded-[3rem] relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-3xl rounded-full" />
                <h3 className="text-2xl font-black mb-6">
                  Pro Strategy: Perimeter First
                </h3>
                <p className="text-slate-400 italic">
                  "Snake your paths along the outside edges first to leave the
                  center open for complex cross-grid connections."
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
        title: "HexaPath | Axial Logic & Hex Grid Puzzle Online 2026",
        description:
          "Challenge your brain with HexaPath. Connect color nodes on a hexagonal grid and fill every cell to win. Free online logic game, no download required.",
        keywords:
          "hex puzzle, logic game, free online games 2026, brain training, hexagonal grid, axial logic",
        canonical: "https://www.imborednow.com/p/hexa-path",
      },
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "HexaPath Logic Lab",
        operatingSystem: "Web",
        applicationCategory: "GameApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
    },
  };
};
