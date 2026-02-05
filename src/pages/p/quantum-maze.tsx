import QuantumMazeHero from "@/components/games/QuantumMazeHero";
import { GetStaticProps } from "next";
import Head from "next/head";

export default function QuantumMazePage({ seo, jsonLd }: any) {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-purple-200 overflow-x-hidden select-none">
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

      {/* --- HERO / GAME ENGINE --- */}
      <QuantumMazeHero />

      {/* --- HOW TO PLAY SECTION (PURPLE THEME) --- */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#11131E] rounded-[3.5rem] p-10 md:p-16 border border-white/5 shadow-2xl mb-20">
            <h3 className="text-3xl font-black text-white mb-12 flex items-center gap-4">
              <span className="text-4xl">🎮</span>
              <span>How to Play</span>
            </h3>
            <ul className="space-y-10">
              {[
                {
                  title: "The Observation Phase",
                  desc: "When you reset the system, you have 4 seconds to study the maze. Memorize the path from your starting point to the green exit.",
                },
                {
                  title: "Navigating the Void",
                  desc: "Once the maze vanishes, use your Arrow Keys or the On-Screen D-Pad to move. Every step must be guided by your mental map.",
                },
                {
                  title: "Avoid Decoherence",
                  desc: "If you touch an invisible wall, the system collapses. The walls will reappear in red, and you'll need to reboot to try again.",
                },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-6">
                  {/* Numbered Circle - Updated to Purple Theme */}
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white text-sm font-bold rounded-full flex items-center justify-center mt-1 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
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
              <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                Cognitive Physics
              </span>
              <h2 className="text-4xl md:text-7xl font-black tracking-tight text-slate-950 mt-8 mb-8 leading-tight">
                The Invisible Map: <br />
                <span className="text-purple-600 italic">
                  Navigating the Unseen
                </span>
              </h2>
              <p className="text-xl text-slate-500 font-medium italic">
                &quot;We don&apos;t see things as they are, we see them as we
                remember them.&quot;
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                1. The Paradox of the Open Eyes
              </h3>
              <p>
                Have you ever walked through your own house in the middle of the
                night, in total darkness, and found the kitchen without stubbing
                your toe? You weren&apos;t using your eyes; you were using a
                &quot;mental map&quot;—a ghost image of your reality stored deep
                in your subconscious.
              </p>

              <p>
                Quantum Maze is a tribute to this incredible human ability. In
                the first few seconds of the game, your brain is working
                overtime. You aren&apos;t just looking at blocks on a screen;
                you are absorbing a layout and identifying &quot;danger
                zones.&quot; When the maze vanishes, the challenge moves from
                your eyes to your memory.
              </p>
            </div>

            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 my-12 text-left">
              <h3 className="text-2xl font-black text-slate-900 mb-4">
                What is Decoherence?
              </h3>
              <p>
                In the game, hitting a wall causes &quot;Decoherence.&quot; In
                the real quantum world, this is what happens when a fragile
                quantum state is disturbed by the outside environment, causing
                it to collapse into a single, boring reality.
              </p>
              [Image of Young's double-slit experiment wave interference
              pattern]
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                2. Schrödinger&apos;s Strategy
              </h3>
              <p>
                There&apos;s a famous thought experiment involving a cat in a
                box that is both alive and dead until you open it. Navigating
                this maze feels remarkably similar. Until you move into a
                square, that square is both &quot;safe&quot; and
                &quot;blocked&quot; in your mind.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 my-16 text-left">
              <div className="p-8 bg-purple-50 rounded-[2rem] border border-purple-100">
                <h4 className="font-black text-purple-900 mb-2 uppercase tracking-tight">
                  The Window
                </h4>
                <p className="text-sm leading-relaxed">
                  Sensory memory lasts for a very short duration. You are racing
                  against the natural decay of information in your synapses.
                </p>
              </div>
              <div className="p-8 bg-slate-900 rounded-[2rem] text-white">
                <h4 className="font-black mb-2 uppercase tracking-tight">
                  Chunking
                </h4>
                <p className="text-sm leading-relaxed opacity-80">
                  Most players don&apos;t remember the whole grid. They remember
                  &quot;shapes&quot;—a zig-zag here, a long straight line there.
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
        title: "Quantum Maze | Invisible Logic & Memory Puzzle 2026",
        description:
          "Challenge your sensory memory with Quantum Maze. Memorize the layout before it vanishes and navigate the invisible grid to safety. Free online logic game.",
        keywords:
          "memory game, invisible maze, spatial memory puzzle, quantum game online, brain training, logic lab",
        canonical: "https://www.imborednow.com/p/quantum-maze",
      },
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Quantum Maze Logic Lab",
        operatingSystem: "Web",
        applicationCategory: "PuzzleGame",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    },
  };
};
