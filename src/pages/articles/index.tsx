import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

// --- Utilities (Enhanced) ---
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const createExcerpt = (html: string) => {
  const text = html.replace(/<[^>]*>?/gm, '');
  return text.substring(0, 160) + "..."; // Slightly longer for better SEO context
};

const extractImage = (html: string) => {
  const imgReg = /<img [^>]*src="([^"]+)"/;
  const match = imgReg.exec(html);
  return match ? match[1] : "/placeholder-rabbit-hole.jpg";
};

// --- API Constants ---
const API_KEY = "AIzaSyDw4oUW9oN8DfN5u6CUgFJ5rE7CF512l_0";
const BLOG_ID = "9008125657659692221";
const BASE_URL = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=9`;

export async function getStaticProps() {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    return {
      props: {
        initialPosts: data.items || [],
        initialNextPageToken: data.nextPageToken || null,
      },
      revalidate: 3600,
    };
  } catch (error) {
    return { props: { initialPosts: [], initialNextPageToken: null } };
  }
}

export default function BlogList({ initialPosts, initialNextPageToken }: any) {
  const [posts, setPosts] = useState(initialPosts);
  const [nextPageToken, setNextPageToken] = useState(initialNextPageToken);
  const [loadingMore, setLoadingMore] = useState(false);

  const PAGE_TITLE = "Interesting Articles to Read | Educational & Entertaining Long Reads";
  const PAGE_DESC = "Transform boredom into curiosity with thought-provoking articles covering history, science, culture, and more. Hand-picked deep dives and fascinating reads that actually teach you something worth knowing.";

  const handleLoadMore = async () => {
    if (!nextPageToken || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await fetch(`${BASE_URL}&pageToken=${nextPageToken}`);
      const data = await res.json();
      if (data.items) setPosts((prev: any) => [...prev, ...data.items]);
      setNextPageToken(data.nextPageToken || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESC} />
        <meta name="keywords" content="articles to read when bored, interesting articles, deep dive articles, fascinating reads, educational articles, long reads, thought-provoking articles, curiosity articles, internet rabbit holes, informative content, reading material, engaging articles" />

        {/* Advanced SEO */}
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content="https://www.imborednow.com/articles" />
        <meta property="og:image" content="https://www.imborednow.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESC} />
        <link rel="canonical" href="https://www.imborednow.com/articles" />

        {/* Structured Data (JSON-LD) for Google */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "The Rabbit Hole",
            "description": PAGE_DESC,
            "url": "https://www.imborednow.com/articles",
            "publisher": {
              "@type": "Organization",
              "name": "ImBoredNow",
              "logo": { "@type": "ImageObject", "url": "https://www.imborednow.com/logo.png" }
            },
            "blogPost": {
              "@type": "BlogPosting",
              "headline": "Curated Articles for Curious Minds",
              "description": "A collection of deep-dive articles covering history, science, culture, and fascinating stories."
            }
          })}
        </script>
      </Head>

      <div className="min-h-screen bg-slate-50 font-sans">
        {/* --- DYNAMIC HERO --- */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-white">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-50 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-indigo-50 blur-[100px] rounded-full" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block py-1 px-4 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">
              Weekly Curations
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8">
              The Rabbit <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Hole</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Where boredom transforms into curiosity. A library of deep-dive articles, hidden history,
              and thought-provoking reads designed to keep you thinking.
            </p>
          </div>
        </section>

        {/* --- ARTICLES GRID --- */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => {
              const imageUrl = extractImage(post.content);
              const postSlug = `${slugify(post.title)}-${post.id}`;
              return (
                <Link key={post.id} href={`/articles/${postSlug}`} className="group flex">
                  <article className="flex flex-col bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 w-full">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-800">
                          Featured
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span>{new Date(post.published).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span>5 min read</span>
                      </div>

                      <h2 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-4 leading-[1.2]">
                        {post.title}
                      </h2>

                      <p className="text-slate-500 text-[15px] leading-relaxed line-clamp-3 mb-8 flex-grow">
                        {createExcerpt(post.content)}
                      </p>

                      <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-sm font-black uppercase tracking-wider text-slate-900 group-hover:translate-x-1 transition-transform">
                          Dive In →
                        </span>
                        <div className="flex -space-x-2">
                          {/* Avatar Placeholders for a "Social Proof" look */}
                          {/* {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white" />)} */}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>

          {nextPageToken && (
            <div className="mt-24 text-center">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="group relative px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg overflow-hidden transition-all active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">{loadingMore ? "Unlocking More..." : "Explore More Articles"}</span>
              </button>
            </div>
          )}
        </main>

        {/* --- EXPANDED SEO KNOWLEDGE HUB FOR ARTICLES --- */}
        <section className="bg-slate-900 text-slate-300 py-32 mt-20 relative overflow-hidden">
          {/* Subtle background texture/glow to prevent "dead" dark space */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full" />

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="prose prose-invert prose-indigo lg:prose-xl max-w-none space-y-12">

              {/* Header Section */}
              <div className="text-center space-y-6 mb-20">
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                  The Power of Deep Reading: <br />
                  <span className="text-indigo-400">Why Articles Transform Boredom into Discovery</span>
                </h2>
                <p className="lead text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto">
                  In a world of endless scrolling and 15-second videos, long-form articles offer something radical:
                  the chance to think deeply, learn thoroughly, and emerge genuinely transformed.
                </p>
              </div>

              {/* Section 1 */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">The Lost Art of Reading Articles When Bored</h3>
                <p>
                  When you search for <em>"articles to read when bored"</em> or <em>"interesting things to read,"</em>
                  you are seeking something fundamentally different from passive entertainment. You are looking for
                  intellectual engagement - content that challenges your assumptions, introduces novel concepts, and
                  leaves you with something valuable long after you close the tab.
                </p>
                <p>
                  Research in cognitive psychology shows that deep reading - the kind required for long-form articles - activates
                  different neural pathways than skimming social media feeds. When you immerse yourself in a well-crafted
                  article about Byzantine history, quantum mechanics, or the psychology of decision-making, your brain
                  creates richer semantic connections. These connections form the foundation of critical thinking,
                  creativity, and lasting knowledge retention.
                </p>
                <p>
                  The Rabbit Hole was created to restore this lost art. Every article in our collection has been curated
                  not for virality, but for substance. We seek out the deep dives that mainstream media overlooks - the
                  5,000-word explorations of obscure historical events, the thoughtful analyses of cultural phenomena,
                  and the scientific explanations that make complex topics accessible without dumbing them down.
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16 not-prose">
                <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/[0.07] transition-colors">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-2xl mb-6">📚</div>
                  <h4 className="text-white font-black mb-3 uppercase tracking-widest text-sm">Curated Excellence</h4>
                  <p className="text-slate-400 text-base leading-relaxed">
                    Every article is hand-selected for depth, originality, and the ability to spark genuine curiosity.
                    We reject clickbait in favor of substance - pieces that respect your intelligence and reward your time investment.
                  </p>
                </div>
                <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/[0.07] transition-colors">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-2xl mb-6">🧠</div>
                  <h4 className="text-white font-black mb-3 uppercase tracking-widest text-sm">Cognitive Enrichment</h4>
                  <p className="text-slate-400 text-base leading-relaxed">
                    Reading long-form content strengthens attention span, improves comprehension, and builds knowledge
                    networks in your brain. It is the mental equivalent of strength training - challenging but deeply rewarding.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">What Makes a Great Article Worth Reading?</h3>
                <p>
                  Not all content is created equal. The difference between a mediocre article and a truly great one
                  lies in several key qualities that we prioritize in our curation process.
                </p>
                <p>
                  <strong>Original Research and Primary Sources:</strong> The best articles do not simply rehash
                  information from other websites. They draw from primary sources, conduct original interviews, or
                  synthesize academic research in accessible ways. When we feature an article about the Voynich Manuscript
                  or the Great Emu War, it is because the author has done the legwork to uncover details you would not
                  find in a Wikipedia summary.
                </p>
                <p>
                  <strong>Narrative Craft:</strong> Great articles tell stories. Whether exploring the history of
                  cryptography or explaining the physics of black holes, the best writers understand that humans are
                  narrative creatures. They structure their pieces with dramatic arcs, compelling characters, and
                  satisfying resolutions that make complex information memorable.
                </p>
                <p>
                  <strong>Intellectual Honesty:</strong> We seek articles that acknowledge nuance and uncertainty.
                  The writers we showcase do not oversimplify for the sake of a clean conclusion. They explore
                  competing theories, present evidence fairly, and invite readers to think critically rather than
                  accept passive conclusions.
                </p>
              </div>

              {/* Section 3: Detailed Content Types */}
              <div className="space-y-6 pt-8 border-t border-white/5">
                <h3 className="text-3xl font-bold text-white">The Types of Articles That Cure Boredom</h3>
                <p>
                  Our collection spans a wide range of formats and topics, each designed to engage different aspects
                  of curiosity and intellectual interest.
                </p>

                <h4 className="text-2xl font-bold text-indigo-300 mt-8">Historical Deep Dives</h4>
                <p>
                  History is not a collection of dates and names - it is an endless supply of stranger-than-fiction
                  stories. Our historical articles explore forgotten events, overlooked figures, and the bizarre
                  coincidences that shaped our world. From the Dancing Plague of 1518 to the time Australia lost
                  a war against emus, these pieces remind us that reality is often more fascinating than fiction.
                </p>

                <h4 className="text-2xl font-bold text-indigo-300 mt-8">Scientific Explanations</h4>
                <p>
                  Science articles should not require a PhD to understand. We feature explanations of complex topics - from
                  quantum entanglement to CRISPR gene editing - written by experts who remember what it was like to be
                  a beginner. These articles satisfy the "How does that work?" questions that pop into your head at
                  3 AM, providing thorough answers that respect both the complexity of the subject and the intelligence
                  of the reader.
                </p>

                <h4 className="text-2xl font-bold text-indigo-300 mt-8">Cultural Analysis and Commentary</h4>
                <p>
                  Why do certain trends emerge? What does our entertainment reveal about society? Our cultural analysis
                  pieces examine the zeitgeist with a critical eye, exploring everything from internet memes to
                  architectural movements. These articles help you understand not just what is happening, but why it matters.
                </p>

                <h4 className="text-2xl font-bold text-indigo-300 mt-8">Profiles and Human Interest Stories</h4>
                <p>
                  Some of the most compelling articles are simply well-told stories about fascinating people. Whether
                  it is a profile of an eccentric inventor, a first-person account of an unusual experience, or an
                  oral history project, these pieces remind us of the incredible diversity of human experience and
                  the universal threads that connect us all.
                </p>

                <h4 className="text-2xl font-bold text-indigo-300 mt-8">Investigative Journalism and Exposés</h4>
                <p>
                  Nothing satisfies curiosity quite like uncovering hidden truths. Our collection includes investigative
                  pieces that reveal how systems really work, expose overlooked problems, and hold power accountable.
                  These articles transform readers from passive observers into informed citizens.
                </p>
              </div>

              {/* Section 4 */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">The Neuroscience of Why Reading Beats Scrolling</h3>
                <p>
                  When you scroll through social media, your brain operates in what neuroscientists call "scanning mode."
                  You are skimming for novelty, processing information superficially, and moving on quickly. This creates
                  the illusion of productivity while leaving you mentally exhausted and informationally empty.
                </p>
                <p>
                  Reading a long-form article engages a completely different cognitive process. It requires sustained
                  attention, active comprehension, and the construction of mental models. Your working memory holds
                  earlier information while integrating new details. Your brain creates predictive models about where
                  the narrative is heading. This deep processing is what transforms mere information consumption into
                  actual learning.
                </p>
                <p>
                  Studies using fMRI scanners show that reading literary fiction activates brain regions associated
                  with social cognition and empathy. When you read about someone else's experience - whether a historical
                  figure or a contemporary subject - your brain simulates that experience, building emotional intelligence
                  and broadening your perspective. This is why reading diverse articles makes you not just more knowledgeable,
                  but more understanding of different viewpoints and experiences.
                </p>
              </div>

              {/* Quote Section */}
              <div className="py-12 not-prose">
                <blockquote className="border-l-4 border-indigo-500 pl-8 py-2">
                  <p className="text-2xl md:text-3xl font-medium text-white italic leading-relaxed">
                    "Reading is not just about consuming information - it is about transforming it into knowledge,
                    understanding, and wisdom. Every great article is an invitation to see the world differently."
                  </p>
                  <footer className="mt-4 text-slate-500 font-bold uppercase tracking-widest text-sm">- The ImBoredNow Philosophy</footer>
                </blockquote>
              </div>

              {/* Section 5 */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">How We Curate: The Editorial Philosophy Behind The Rabbit Hole</h3>
                <p>
                  In an age where algorithmic feeds dominate content discovery, human curation has become a radical act.
                  Every article in The Rabbit Hole has been read, evaluated, and selected by real people who care about
                  quality over quantity.
                </p>
                <p>
                  Our curation process begins with a simple question: "Would this article make someone genuinely glad
                  they spent ten minutes reading it?" We reject articles that exist solely to sell products, promote
                  agendas without acknowledging complexity, or provide generic advice you could find anywhere. Instead,
                  we seek pieces that offer unique insights, challenge conventional wisdom, or simply tell stories so
                  well that you forget you are reading.
                </p>
                <p>
                  We intentionally include articles from diverse sources - major publications and independent blogs,
                  established voices and emerging writers, academic journals and personal essays. The common thread
                  is not the source's prestige but the content's quality. Some of the most fascinating articles we have
                  found come from personal blogs written by passionate experts sharing knowledge in their niche fields.
                </p>
              </div>

              {/* Section 6 */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">Reading as an Antidote to Digital Overwhelm</h3>
                <p>
                  The modern internet is designed to fragment your attention. Notifications pull you away from tasks.
                  Infinite scroll keeps you engaged without satisfying. News cycles create artificial urgency about
                  events that will not matter tomorrow. This constant stimulation paradoxically creates a unique form
                  of boredom - the restless feeling of being busy yet unstimulated, occupied yet unfulfilled.
                </p>
                <p>
                  Reading long-form articles offers an escape from this trap. When you commit to reading a 3,000-word
                  piece about the history of timekeeping or the philosophy of consciousness, you are making a deliberate
                  choice to engage deeply with one topic. This singular focus is increasingly rare and increasingly
                  valuable. It allows your mind to settle, your attention to sharpen, and your thinking to deepen.
                </p>
                <p>
                  Moreover, finishing a substantial article provides a sense of completion that scrolling can never offer.
                  You reach a conclusion. You have learned something specific. You can articulate what you now know
                  that you did not know before. This feeling of progress and accomplishment is the true antidote to
                  the hollow sensation of having "wasted time online."
                </p>
              </div>

              {/* Section 7 */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">Building Your Personal Knowledge Library</h3>
                <p>
                  Every article you read becomes part of your mental model of the world. Over time, these individual
                  pieces connect, forming a rich web of understanding that makes you more capable, more interesting,
                  and more intellectually flexible.
                </p>
                <p>
                  The articles in The Rabbit Hole are selected not just for immediate interest but for long-term value.
                  A piece about how ancient Romans made concrete might seem like idle curiosity today, but six months
                  from now, when you are discussing infrastructure or sustainability, that knowledge resurfaces and
                  enriches the conversation. An article about cognitive biases becomes a lens through which you view
                  news coverage. A deep dive into a historical period provides context for current events.
                </p>
                <p>
                  We encourage readers to approach our collection not as a feed to consume but as a library to explore.
                  Bookmark articles that resonate. Return to complex pieces that deserve re-reading. Follow threads of
                  curiosity from one topic to related areas. This deliberate, self-directed learning is how you transform
                  from someone who "reads articles when bored" to someone who pursues knowledge as a rewarding practice.
                </p>
              </div>

              {/* Section 8: Why Now */}
              <div className="space-y-6 pt-8 border-t border-white/5">
                <h3 className="text-3xl font-bold text-white">Why Long-Form Reading Matters More Than Ever</h3>
                <p>
                  We live in an era of unprecedented information access, yet widespread information illiteracy. People
                  mistake having opinions for having knowledge. They confuse exposure to headlines with understanding
                  of issues. They believe that a 280-character summary can capture the nuance of complex topics.
                </p>
                <p>
                  Long-form articles are the antidote to this superficiality. They provide the space for nuance,
                  the room for evidence, and the structure for logical argument. They train readers to think in
                  paragraphs rather than sound bites, to appreciate complexity rather than demand simplification,
                  and to seek understanding rather than settle for opinions.
                </p>
                <p>
                  In this context, choosing to read a thoughtful, well-researched article is not just a way to pass
                  time when bored - it is an act of intellectual self-care. It is choosing depth over distraction,
                  understanding over outrage, and growth over stagnation.
                </p>
              </div>

              {/* Final CTA Box */}
              <div className="mt-20 p-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[3rem] text-center shadow-2xl shadow-indigo-500/20 not-prose">
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to start reading?</h3>
                <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto opacity-90">
                  The Rabbit Hole contains hundreds of carefully curated articles waiting to transform
                  your curiosity into knowledge. Choose a story above and begin your journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/" className="px-10 py-4 bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-tighter hover:bg-indigo-50 transition-all active:scale-95">
                    Return to Home
                  </Link>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-10 py-4 bg-indigo-500/20 border border-white/20 text-white rounded-2xl font-black uppercase tracking-tighter hover:bg-white/10 transition-all">
                    Back to Top ↑
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}