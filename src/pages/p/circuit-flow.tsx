/* eslint-disable @typescript-eslint/no-explicit-any */
import CircuitFlowHero from "@/components/games/CircuitFlowHero";
import { GetStaticProps } from "next";
import Head from "next/head";

export default function CircuitFlowPage({ seo, jsonLd }: { seo: any; jsonLd: any }) {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-amber-200 overflow-x-hidden select-none">
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

      <CircuitFlowHero />

      {/* --- HOW TO PLAY SECTION --- */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/90 rounded-[3rem] p-10 md:p-14 border border-slate-200/10 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-10 text-center">
              How to <span className="text-amber-500">Play</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-slate-300">
              <div className="flex gap-4">
                <span className="text-amber-500 font-black text-xl">01.</span>
                <p className="text-sm leading-relaxed">
                  <strong>Click to Rotate:</strong> Tap any tile on the grid to
                  rotate it 90 degrees. Your goal is to align the paths.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-amber-500 font-black text-xl">02.</span>
                <p className="text-sm leading-relaxed">
                  <strong>Follow the Glow:</strong> Paths will turn amber when
                  they are successfully connected to the power source.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-amber-500 font-black text-xl">03.</span>
                <p className="text-sm leading-relaxed">
                  <strong>Bridge the Gap:</strong> Connect the battery at the
                  top-left to the core at the bottom-right to win.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-amber-500 font-black text-xl">04.</span>
                <p className="text-sm leading-relaxed">
                  <strong>Fixed Tiles:</strong> Some tiles are locked in place
                  and cannot be rotated. You must build your circuit around
                  them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ARTICLE SECTION --- */}
      <section className="bg-white py-24 px-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          {/* Header Area */}
          <div className="text-center mb-20">
            <span className="bg-amber-100 text-amber-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
              Human-Centric Engineering
            </span>
            <h2 className="text-4xl md:text-7xl font-black tracking-tight text-slate-950 mt-8 mb-8 leading-tight">
              The Art of the Connection: <br />
              <span className="text-amber-600 italic">
                Finding Flow in Chaos
              </span>
            </h2>
            <p className="text-xl text-slate-500 font-medium italic">
              "A circuit is more than just wire and silicon; it’s a path for
              intent."
            </p>
          </div>

          <article className="prose prose-slate lg:prose-xl max-w-none text-slate-700 leading-relaxed space-y-12">
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                1. The Spark of Curiosity
              </h3>
              <p>
                There is a specific kind of quiet that settles over a room when
                someone is deep in a puzzle. You’ve probably felt it while
                playing **Circuit Flow**. It’s that moment where the rest of the
                world fades away, and all that exists is a 5x5 grid of
                disconnected lines and the singular goal of making them whole.
                We’ve been obsessed with "connecting the dots" since we were
                children, but as we grow up, those dots become complex systems.
              </p>
              <p>
                In the early days of electrical engineering, there were no fancy
                simulators. There were just breadboards, jumper wires, and the
                very real smell of ozone if you got it wrong. This game is a
                tribute to that tactile struggle. When you click a tile to
                rotate it, you aren't just moving pixels; you're making a choice
                about how energy should move. That’s a very human instinct: the
                desire to direct power, to organize the disorganized, and to
                find the "flow."
              </p>
            </div>

            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 my-12">
              <h3 className="text-2xl font-black text-slate-900 mb-4">
                The Psychology of the 'Aha!' Moment
              </h3>
              <p>
                Why does it feel so good when the amber light finally hits the
                core? Psychologists call this "Cognitive Closure." Our brains
                are naturally wired to dislike incompleteness. A broken circuit
                creates a small, subtle tension in our minds. By rotating that
                final 'L' or 'T' joint into place, we release that tension. It’s
                a hit of dopamine that tells us, "You fixed it. The world is
                orderly again."
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                2. Thinking in Blueprints
              </h3>
              <p>
                To get good at Circuit Flow, you have to stop looking at the
                tiles as individual squares and start seeing them as a single,
                living organism. This is what we call "Systemic Thinking." In
                the real world, this is how city planners look at traffic, how
                doctors look at the circulatory system, and how programmers look
                at data structures.
              </p>
              <p>
                Notice how the **parietal lobe** kicks in when you're playing?
                That's the part of your brain responsible for spatial
                navigation. You’re essentially performing mental
                rotations - simulating the outcome of a move before you actually
                make it. It’s a mental rehearsal. When you look at an 'I' tile
                and realize it needs to bridge the gap between two 'L' shapes,
                you are practicing the same geometry that NASA engineers use to
                dock spacecraft. It’s all about vectors, alignment, and
                anticipating the path of least resistance.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                3. The Philosophy of the Path
              </h3>
              <p>
                Electricity is lazy. Or, more accurately, it’s efficient. It
                always seeks the easiest way to the ground. In Circuit Flow, we
                force the electricity to follow *our* path. There’s a lesson
                there about life, too. Sometimes the most direct route isn't
                available. You might find your path blocked by a "fixed"
                tile - one of those stubborn pieces that won't rotate no matter
                how hard you click.
              </p>
              <p>
                Life is full of fixed tiles. Obstacles we didn't choose and
                can't change. The game teaches us that the solution isn't to
                fight the fixed tile, but to route around it. It encourages a
                flexible mindset. If you can't go through the center of the
                grid, go around the perimeter. If the 'T' junction isn't
                helping, try a series of 'L' turns.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 my-16">
              <div className="p-8 bg-amber-50 rounded-[2rem] border border-amber-100">
                <h4 className="font-black text-amber-900 mb-2 uppercase tracking-tight">
                  The Logic of 'T'
                </h4>
                <p className="text-sm leading-relaxed">
                  The 'T' tile is the most versatile piece in your arsenal. It’s
                  a splitter. In digital logic, this represents a "fan-out,"
                  where one signal is sent to multiple destinations. It’s the
                  backbone of communication.
                </p>
              </div>
              <div className="p-8 bg-slate-900 rounded-[2rem] text-white">
                <h4 className="font-black mb-2 uppercase tracking-tight">
                  The 'L' Pivot
                </h4>
                <p className="text-sm leading-relaxed opacity-80">
                  Corner pieces are the masters of redirection. They teach us
                  that progress isn't always a straight line. Sometimes, you
                  have to turn 90 degrees to find the right direction.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                4. Beyond the Battery: Real World Flow
              </h3>
              <p>
                While this is a game, the logic is identical to how the power
                grid in your neighborhood works. Imagine the "Source" is a
                substation and the "Sink" is your house. Every time you flip a
                switch in this game, you're mimicking the work of a grid
                operator balancing the load.
              </p>
              <p>
                In the coming decades, our real-world circuits are going to get
                much more complex. With renewable energy, power doesn't just
                flow one way anymore. It’s becoming a "Smart Grid" - a giant,
                global game of Circuit Flow where the pieces are moving every
                second. By training your brain here, you’re developing the
                intuition needed to understand the energy-fluid world we are
                building.
              </p>
            </div>

            <div className="space-y-6 pb-20">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                Conclusion: The Final Connection
              </h3>
              <p>
                Next time you play a round, take a second to look at the grid
                before you make your first move. Don't just click randomly. Look
                at the SINK. Look at the SOURCE. Visualize the invisible line
                that connects them. Whether you solve it in 5 moves or 50, the
                result is the same: you’ve brought light to the dark.
              </p>
              <p>
                In a world that often feels disconnected and fragmented, there's
                something deeply healing about a game where everything finally
                clicks into place. Keep finding the flow, keep testing the
                connections, and most importantly, keep your curiosity powered
                up.
              </p>
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
        title: "Circuit Flow | Logical Signal Routing & Puzzle Game 2026",
        description:
          "Solve complex circuit puzzles by rotating tiles to connect the power source. A free online brain game for systemic thinking and spatial logic.",
        keywords:
          "circuit puzzle, signal routing game, brain training, spatial logic, free online logic games, flow puzzle",
        canonical: "https://www.imborednow.com/p/circuit-flow",
      },
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Circuit Flow Logic Lab",
        operatingSystem: "Web",
        applicationCategory: "PuzzleGame",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    },
  };
};
