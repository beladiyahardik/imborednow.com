import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";

// --- Utilities ---
const createExcerpt = (html: string) => {
  if (!html) return "";
  const text = html.replace(/<[^>]*>?/gm, "");
  return text.substring(0, 160) + "...";
};

const extractImage = (html: string) => {
  const imgReg = /<img [^>]*src="([^"]+)"/;
  const match = imgReg.exec(html);
  return match ? match[1] : "/api/placeholder/400/250"; // Fallback image
};

const Hakslugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

const NEWSLETTER_API_URL = "https://belbytes.com/APIs/imborednow/subscribe.php";

const faqData = [
  {
    q: "What is the Bored Button?",
    a: "The Bored Button is a simple, one-click portal that instantly loads one of our hand-picked, high-quality browser tools or games directly on our site. Every experience runs seamlessly within imborednow.com — no redirects, no external sites, just pure engagement.",
  },
  {
    q: "Who runs I'm Bored Now?",
    a: "The site is independently created and operated by a small team based in Surat, Gujarat, India, led by founder Hardik Beladiya. The team includes Piyush (Software Architect), Dhruvin (Co-Founder & UI/UX Designer), and Darshan (Content Curator).",
  },
  {
    q: "How do you curate the tools?",
    a: "Every single tool and activity is personally reviewed by the team. We test for speed, safety, family-friendliness, and genuine entertainment value. Anything slow, inappropriate, ad-heavy, or low-quality is rejected. Only the best make it into the rotation.",
  },
  {
    q: "Is the content safe and family-friendly?",
    a: "Yes. We prioritize wholesome, safe experiences suitable for all ages — students, professionals, and families. No malicious code, no adult content, and no endless ads.",
  },
  {
    q: "Are all tools completely free?",
    a: "Absolutely. Every experience is 100% free with no sign-ups, downloads, paywalls, or hidden costs.",
  },
  {
    q: "How does the random selection work?",
    a: "Our smart algorithm pulls from a carefully maintained collection of vetted tools. It’s random but never truly chaotic — you’ll always land on something high-quality and engaging, loaded directly on our site.",
  },
  {
    q: "Can I suggest a new tool?",
    a: "We’d love to hear your ideas! Reach out via the contact page, and if it meets our quality standards, we’ll consider adding it.",
  },
  {
    q: "Why choose this site over other 'bored' buttons?",
    a: "Most random sites send you to external pages full of ads or low-quality content. We keep everything in-house: every tool loads seamlessly on imborednow.com, ensuring speed, safety, and a consistent high-quality experience.",
  },
  {
    q: "When was the site launched?",
    a: "I'm Bored Now was launched in December 2025 by Hardik Beladiya in Surat, Gujarat, India, with a mission to provide better alternatives to mindless scrolling.",
  },
  {
    q: "Do you use cookies or track users?",
    a: "We keep things minimal. Basic analytics help us improve the experience, but we don’t sell data or bombard you with targeted ads.",
  },
  {
    q: "How often do you add new tools?",
    a: "We regularly refresh the collection based on user feedback, new discoveries, and seasonal trends to keep things fresh.",
  },
];

export default function Home({
  initialPosts = [],
  initialSubscriberCount = 0,
}: any) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [subscriberCount, setSubscriberCount] = useState<number>(
    initialSubscriberCount || 0
  );

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({
    time: "",
    mood: "",
    goal: "",
  });
  const [quizResult, setQuizResult] = useState<string | null>(null);

  // Activity guide tab state
  const [activeTab, setActiveTab] = useState<"time" | "mood" | "device">("time");

  useEffect(() => {
    fetchSubscriberCount();
  }, []);

  const fetchSubscriberCount = async () => {
    try {
      const res = await fetch(NEWSLETTER_API_URL);
      const data = await res.json();
      if (data.success && data.count) setSubscriberCount(data.count);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setStatusMessage("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setStatusMessage("");

    try {
      const res = await fetch(NEWSLETTER_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStatusMessage("Thank you for subscribing! Welcome to the club.");
        setEmail("");
        fetchSubscriberCount();
      } else {
        setStatusMessage(
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      setStatusMessage("Network error. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let recommendation = "";
    if (quizAnswers.time === "2-5" && quizAnswers.mood === "restless") {
      recommendation = "Try the Virtual Dice Roller or Meditation Timer for a quick reset.";
    } else if (quizAnswers.time === "15-30" && quizAnswers.mood === "curious") {
      recommendation = "Dive into Birthdate Secrets or the History Timeline Explorer.";
    } else {
      recommendation = "Explore our full collection  -  something perfect is waiting!";
    }
    setQuizResult(recommendation);
  };

  return (
    <>
      <Head>
        <title>
          I'm Bored Now | Hand-Curated Browser Tools to Transform Boredom into Meaningful Discovery
        </title>
        <meta
          name="description"
          content="Discover the science of boredom and hand-curated, safe browser tools that spark creativity and focus. Quality experiences for students, professionals, and families  -  no mindless scrolling."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="I'm Bored Now  -  Transform Boredom into Meaningful Discovery"
        />
        <meta
          property="og:description"
          content="Hand-curated browser tools and insights to help you use boredom productively. Safe, fast, family-friendly experiences curated by a small team in Gujarat, India."
        />
        <meta property="og:type" content="website" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqData.map(({ q, a }) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: a,
                },
              })),
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "I'm Bored Now",
              url: "https://www.imborednow.com",
              logo: "https://www.imborednow.com/logo.png",
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">

        {/* --- HERO SECTION --- */}
        <header className="max-w-7xl mx-auto px-6 pt-16 md:pt-32 pb-20 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
            Est. December 2025 • Surat, India
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.05] mb-8 text-slate-900">
            The end of mindless <br />
            <span className="text-indigo-600">scrolling starts here.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-10 leading-relaxed font-light">
            Welcome to <span className="font-semibold">I'm Bored Now</span> - a hand-crafted sanctuary built to turn
            your empty moments into opportunities for creativity, reflection, and focused play.
            No redirects, no aggressive ads, just pure, vetted quality.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/p/random-activity">
              <button className="px-12 py-6 bg-slate-900 text-white font-bold text-xl rounded-2xl hover:bg-indigo-600 transition-all active:scale-95 shadow-2xl shadow-slate-200 flex items-center gap-3">
                <span className="text-2xl">🔘</span> Launch Random Tool
              </button>
            </Link>
          </div>
        </header>

        {/* --- PHILOSOPHY DEEP DIVE (SEO/ADSENSE RICH CONTENT) --- */}
        <section id="science" className="bg-white py-24 border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-slate-900">
              Why Boredom is Your Secret Superpower
            </h2>

            <div className="prose prose-slate prose-lg max-w-none text-slate-600 space-y-8">
              <p>
                In our modern, hyper-connected world, boredom has become something we fear. We treat it as a void that must be filled instantly with short-form videos, social media notifications, or endless news cycles. But at <strong>I'm Bored Now</strong>, we believe this "junk-food" stimulation is actually making us more restless.
              </p>

              <div className="grid md:grid-cols-2 gap-12 my-12">
                <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
                  <h3 className="text-xl font-bold text-indigo-900 mb-4">The Dopamine Trap</h3>
                  <p className="text-sm leading-relaxed">
                    Constant scrolling triggers small hits of dopamine. However, these hits are fleeting. When they fade, they leave us feeling drained and less focused. This is known as "digital fatigue," a state that actually decreases our ability to be creative or solve complex problems.
                  </p>
                </div>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">The Creative Bridge</h3>
                  <p className="text-sm leading-relaxed">
                    True boredom is a signal from the brain that it's ready for a higher level of engagement. When we resist the urge to scroll mindlessly and instead choose a mindful activity - like a logic puzzle, a meditation tool, or a deep-dive article - we bridge the gap between "nothingness" and "flow."
                  </p>
                </div>
              </div>

              <h3 className="text-3xl font-black text-slate-900 mt-16">A Human-Centered Approach to the Web</h3>
              <p>
                When Hardik Beladiya founded this platform in Surat, the goal was simple: <strong>Better Tools, Better Experiences.</strong> We don't use algorithms to keep you "hooked." Instead, we use human curation. Every tool on our site is designed to be explored and then set aside.
              </p>
              <p>
                Whether you are a student taking a break between study sessions, a professional resetting your mind during a lunch break, or a parent looking for a safe digital playground for your child, we've done the hard work of vetting the noise. We believe that by respecting your time, we build a more valuable relationship with you, our user.
              </p>
            </div>
          </div>
        </section>

        {/* --- TOP 9 ARTICLES GRID --- */}
        <section id="articles" className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Explore Our Latest Insights</h2>
              <p className="text-lg text-slate-600">From the science of focus to the best digital tools for productivity - our editorial team covers it all.</p>
            </div>
            <Link href="/articles">
              <button className="px-8 py-4 border-2 border-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition group flex items-center gap-2">
                Browse All Articles <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {initialPosts.length > 0 ? (
              initialPosts.slice(0, 9).map((post: any) => (
                <article key={post.id} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={extractImage(post.content)}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-indigo-600 transition">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                      {createExcerpt(post.content)}
                    </p>
                    <div className="mt-auto">
                      <Link
                        href={`/blog/${Hakslugify(post.title)}`}
                        className="text-sm font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-1 hover:text-indigo-600 hover:border-indigo-600 transition"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p className="col-span-full text-center py-20 text-slate-400 font-medium bg-white rounded-3xl border-2 border-dashed border-slate-200">
                Our latest articles are currently loading...
              </p>
            )}
          </div>
        </section>

        {/* --- OUR VETTING PROCESS (TRUST SIGNALS) --- */}
        <section className="bg-slate-900 text-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black mb-8">Our 7-Point <br /><span className="text-indigo-400">Quality Vetting</span></h2>
                <p className="text-slate-400 text-lg mb-12">We don't just find tools; we audition them. Only 5% of the experiences we test make it to the I'm Bored Now rotation.</p>

                <div className="space-y-6">
                  {[
                    { t: "Security Check", d: "Zero trackers, malware, or suspicious scripts." },
                    { t: "Speed Audit", d: "Loads in < 1.5s on standard 4G connections." },
                    { t: "UX/UI Flow", d: "Must be intuitive and mobile-responsive." },
                    { t: "Content Value", d: "Must provide education, relaxation, or joy." },
                    { t: "Ad-Free Policy", d: "No intrusive pop-ups or auto-play videos." },
                    { t: "Accessibility", d: "Usable by various age groups and abilities." },
                    { t: "Local Curation", d: "Hand-tested by our team in Surat, India." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <span className="text-indigo-400 font-bold">0{idx + 1}.</span>
                      <div>
                        <h4 className="font-bold">{item.t}</h4>
                        <p className="text-sm text-slate-500">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full"></div>
                <div className="relative bg-slate-800 border border-slate-700 p-10 rounded-3xl shadow-2xl">
                  <blockquote className="text-2xl font-light italic leading-relaxed mb-8">
                    "The internet is becoming too loud. We wanted to build a place that whispers quality instead of screaming for attention."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center font-bold text-xl">H</div>
                    <div>
                      <p className="font-bold">Hardik Beladiya</p>
                      <p className="text-sm text-slate-400">Founder, I'm Bored Now</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- QUIZ & ACTIVITY GUIDE --- */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Quiz */}
            <div className="bg-white p-10 rounded-3xl border border-slate-200">
              <h3 className="text-2xl font-black mb-6">Activity Matchmaker</h3>
              <form onSubmit={handleQuizSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">How much time do you have?</label>
                  <select
                    className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50"
                    onChange={(e) => setQuizAnswers({ ...quizAnswers, time: e.target.value })}
                  >
                    <option value="">Select time...</option>
                    <option value="2-5">Quick Break (2-5 mins)</option>
                    <option value="15-30">Deep Dive (15-30 mins)</option>
                    <option value="unlimited">I've got all day</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">Current Mood?</label>
                  <select
                    className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50"
                    onChange={(e) => setQuizAnswers({ ...quizAnswers, mood: e.target.value })}
                  >
                    <option value="">Select mood...</option>
                    <option value="restless">A bit restless</option>
                    <option value="curious">Very curious</option>
                    <option value="tired">Brain-dead</option>
                  </select>
                </div>
                <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg">
                  Get Recommendation
                </button>
              </form>
              {quizResult && (
                <div className="mt-8 p-6 bg-indigo-50 text-indigo-900 font-medium rounded-xl border border-indigo-100 animate-pulse">
                  ✨ {quizResult}
                </div>
              )}
            </div>

            {/* Activity Guide */}
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl font-black mb-6">Personalized Experiences</h3>
              <p className="text-slate-600 mb-8">We don't believe in one-size-fits-all. Every visitor has a different reason for feeling bored. Use our guide to find your perfect state of mind.</p>
              <div className="flex gap-4 mb-8">
                {["time", "mood", "device"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t as any)}
                    className={`px-6 py-2 rounded-full font-bold text-sm transition ${activeTab === t ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
                  >
                    By {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                {activeTab === 'time' && <p className="text-slate-600">From 30-second logic puzzles to hour-long historical explorations, we respect your schedule.</p>}
                {activeTab === 'mood' && <p className="text-slate-600">Feeling creative? Try our drawing tools. Feeling stressed? Our ambient sound generator is for you.</p>}
                {activeTab === 'device' && <p className="text-slate-600">Every tool is optimized. Whether you're on an iPhone or a dual-monitor setup, it looks great.</p>}
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section id="faq" className="max-w-4xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-black mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, i) => (
              <details key={i} className="group bg-white border border-slate-200 rounded-2xl p-6 open:shadow-lg transition-all">
                <summary className="list-none flex justify-between items-center font-bold text-lg cursor-pointer hover:text-indigo-600">
                  <span>{faq.q}</span>
                  <span className="text-2xl group-open:rotate-45 transition-transform text-slate-400">+</span>
                </summary>
                <div className="mt-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-6">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* --- NEWSLETTER --- */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blur-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Join {subscriberCount.toLocaleString()}+ curious minds.</h2>
            <p className="text-indigo-100 text-xl max-w-2xl mx-auto mb-12 relative z-10">
              Get one weekly email with a single hand-curated tool to help you stay creative and focused. No spam, ever.
            </p>
            <form onSubmit={handleSubscribe} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4 relative z-10">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-6 py-4 rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition active:scale-95 disabled:opacity-70"
              >
                {submitting ? "Joining..." : "Subscribe"}
              </button>
            </form>
            {statusMessage && <p className="mt-6 font-medium text-indigo-100">{statusMessage}</p>}
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const API_KEY = "AIzaSyDw4oUW9oN8DfN5u6CUgFJ5rE7CF512l_0";
  const BLOG_ID = "9008125657659692221";
  const BLOGGER_URL = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=9`;

  let initialPosts = [];
  let initialSubscriberCount = 0;

  try {
    const res = await fetch(BLOGGER_URL);
    const data = await res.json();
    if (data.items) initialPosts = data.items;
  } catch (err) {
    console.error("SSG Error (Posts):", err);
  }

  try {
    const res = await fetch(NEWSLETTER_API_URL);
    const data = await res.json();
    if (data.success && data.count !== undefined) initialSubscriberCount = data.count;
  } catch (err) {
    console.error("SSG Error (Newsletter):", err);
  }

  return {
    props: { initialPosts, initialSubscriberCount },
    revalidate: 3600,
  };
};