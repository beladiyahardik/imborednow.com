import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

// --- Utilities ---
const createExcerpt = (html: string) => {
  if (!html) return "";
  const text = html.replace(/<[^>]*>?/gm, "");
  return text.substring(0, 140) + "...";
};

const extractImage = (html: string) => {
  const imgReg = /<img [^>]*src="([^"]+)"/;
  const match = imgReg.exec(html);
  return match ? match[1] : null;
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
  { q: "What is the Bored Button?", a: "The Bored Button is a simple, one-click portal that instantly connects you to a hand-picked, high-quality browser tool, game, or digital experience. Instead of endless scrolling or low-quality random sites, every destination is manually reviewed for safety, engagement, and performance." },
  { q: "Who runs I'm Bored Now?", a: "The site is independently created and operated by a small team of developers and curators based in Gujarat, India, led by founder Hardik Beladiya. The team includes Piyush (Software Architect), Dhruvin (Co-Founder & UI/UX Designer), and Darshan (Content Curator)." },
  { q: "How do you curate the tools?", a: "Every single tool and activity is personally reviewed by the team. We test for speed, safety, family-friendliness, and genuine entertainment value. Anything slow, inappropriate, ad-heavy, or low-quality is rejected. Only the best make it into the rotation." },
  { q: "Is the content safe and family-friendly?", a: "Yes. We prioritize wholesome, safe experiences suitable for all ages — students, professionals, and families. No malicious code, no adult content, and no endless ads." },
  { q: "Are all tools completely free?", a: "Absolutely. Every experience is 100% free with no sign-ups, downloads, paywalls, or hidden costs." },
  { q: "How does the random selection work?", a: "Our smart algorithm pulls from a carefully maintained collection of vetted tools. It’s random but never truly chaotic — you’ll always land on something high-quality and engaging." },
  { q: "Can I suggest a new tool?", a: "We’d love to hear your ideas! Reach out via the contact page, and if it meets our quality standards, we’ll consider adding it." },
  { q: "Why choose this site over other 'bored' buttons?", a: "Most random sites send you anywhere, including low-quality or unsafe pages. We focus exclusively on quality, safety, and meaningful discovery — all manually curated by a passionate team." },
  { q: "When was the site launched?", a: "The project began in 2024 as a personal mission to provide better alternatives to mindless scrolling." },
  { q: "Is this the original Bored Button?", a: "There are several similar concepts online, but we’re proud to offer one of the most carefully curated and consistently updated versions." },
  { q: "Do you use cookies or track users?", a: "We keep things minimal. Basic analytics help us improve the experience, but we don’t sell data or bombard you with targeted ads." },
  { q: "How often do you add new tools?", a: "We regularly refresh the collection based on user feedback, new discoveries, and seasonal trends to keep things fresh." },
];

export default function Home({ initialPosts = [], initialSubscriberCount = 0 }: any) {
  const hasAdsenseApproval = false;

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [subscriberCount, setSubscriberCount] = useState<number>(initialSubscriberCount || 0);

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
        setStatusMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatusMessage("Network error. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Bored Button | Hand-Curated Browser Tools & Games to Cure Boredom Instantly</title>
        <meta name="description" content="Discover high-quality, safe, family-friendly browser games, calculators, and digital experiences. One click launches a manually curated tool — no ads, no sign-up. Created by a small team in Gujarat, India." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Bored Button — Cure Boredom with Quality Curated Web Experiences" />
        <meta property="og:description" content="Skip mindless scrolling. Get instantly connected to engaging, safe, hand-picked browser tools and experiments." />
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
      </Head>

      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white overflow-x-hidden">
        
        {/* --- HERO SECTION --- */}
        <header className="max-w-7xl mx-auto px-6 pt-12 md:pt-24 pb-16 md:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className={`${hasAdsenseApproval ? "lg:col-span-7" : "lg:col-span-12 text-center lg:text-left"}`}>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.1] md:leading-[0.9] mb-8">
                Cure boredom <br />
                <span className="text-slate-400">with intent.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0">
                One click connects you to a hand-curated collection of safe, engaging browser tools and digital experiences — no endless ads, no low-quality links.
              </p>
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-6 justify-center lg:justify-start">
                <Link href="/p/random-activity" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-10 py-5 bg-black text-white font-bold text-lg rounded-full hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200">
                    Launch Random Tool
                  </button>
                </Link>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 py-2 sm:py-5">
                  Join {subscriberCount.toLocaleString()}+ subscribers
                </div>
              </div>
            </div>

            {hasAdsenseApproval && (
              <div className="lg:col-span-5 bg-slate-50 border border-slate-100 rounded-3xl h-64 md:h-80 flex items-center justify-center">
                <span className="text-slate-300 font-bold uppercase tracking-widest text-xs">Advertisement</span>
              </div>
            )}
          </div>
        </header>

        {/* --- DETAILED INTRODUCTION --- */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 border-t border-slate-100">
          <h2 className="text-3xl md:text-4xl font-black mb-12 text-center md:text-left">Welcome to a Better Way to Cure Boredom</h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-base md:text-lg leading-relaxed text-slate-600">
            <div className="space-y-6">
              <p>
                In a world full of endless feeds and algorithm-driven content, genuine moments of discovery can feel rare. That’s why we created the Bored Button — a minimalist portal that skips the noise and delivers something truly worth your time with just one click.
              </p>
              <p>
                Founded in 2024 by Hardik Beladiya in Gujarat, India, this project started as a personal frustration with low-quality random web destinations. Most “bored” buttons send you anywhere, including broken pages, heavy ads, or unsafe content.
              </p>
            </div>
            <div className="space-y-6">
              <p>
                Whether you’re a student looking for a quick mental break, a professional needing a moment of reset, or a parent searching for wholesome fun, we’ve got you covered. Everything is free, family-friendly, and requires zero sign-up or downloads.
              </p>
              <p>
                Instead of trapping you in endless scrolling, we aim to spark curiosity, creativity, and even a smile. That’s the philosophy behind every tool we add and every update we make.
              </p>
            </div>
          </div>
        </section>

        {/* --- TEAM / CURATORS SECTION --- */}
        <section className="bg-slate-50 py-16 md:py-24 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-black mb-12 text-center md:text-left">Meet Our Curators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { name: "Hardik Beladiya", role: "Founder & Lead Developer", desc: "Passionate about building clean, meaningful web experiences.", img: "/hardik.png" },
                { name: "Piyush K.", role: "Software Architect", desc: "Ensures everything runs smoothly and loads instantly. Performance obsessed.", img: "/piyush.jpg" },
                { name: "Dhruvin S.", role: "UI/UX Designer", desc: "Crafts the minimalist aesthetic and intuitive flow that makes discovery effortless.", img: "/dhruvin.jpg" },
                { name: "Darshan L.", role: "Content Curator", desc: "Scours the web daily for hidden gems and dreams up original ideas.", img: "/darshan.png" },
              ].map((member) => (
                <div key={member.name} className="bg-white p-8 border border-slate-200 hover:border-black transition-all group flex flex-col items-center md:items-start text-center md:text-left rounded-2xl md:rounded-none">
                  <div className="w-24 h-24 bg-slate-100 rounded-full mb-6 overflow-hidden ring-0 group-hover:ring-4 ring-slate-900 transition-all duration-300">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                      onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${member.name}&background=f1f5f9&color=64748b`; }}
                    />
                  </div>
                  <h3 className="font-black text-xl mb-1">{member.name}</h3>
                  <p className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">{member.role}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- DISCOVERY LAB --- */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-black tracking-tight uppercase">The Discovery Lab</h2>
              <div className="h-1 w-8 bg-black mt-2" />
              <p className="text-slate-500 mt-4 max-w-2xl">Hand-picked tools you didn’t know you needed — from calculators and generators to relaxing simulations.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { title: "Birthdate Secrets", icon: "01", href: "/p/birthdate-calculator" },
                { title: "History Timeline", icon: "02", href: "/p/history-timeline" },
                { title: "Life Expectancy", icon: "03", href: "/p/life-expectancy-calculator" },
                { title: "Lifestyle Factor", icon: "04", href: "/p/life-style-factor" },
                { title: "This Day in History", icon: "05", href: "/p/this-day-history" },
                { title: "Personality Insights", icon: "06", href: "/p/personality-quiz" },
                { title: "BMI Calculator", icon: "07", href: "/p/bmi-calculator" },
                { title: "Password Generator", icon: "08", href: "/p/password-generator" },
                { title: "Meditation Timer", icon: "09", href: "/p/meditation-timer" },
                { title: "Virtual Dice", icon: "10", href: "/p/dice-roller" },
                { title: "Color Psychology", icon: "11", href: "/p/color-psychology" },
                { title: "Dream Interpreter", icon: "12", href: "/p/dream-interpreter" },
              ].map((tool) => (
                <Link key={tool.title} href={tool.href} className="group bg-white p-6 md:p-8 border border-slate-200 hover:border-black transition-all flex flex-col justify-between min-h-[160px]">
                   <div className="text-xs font-black text-slate-300 group-hover:text-black transition-colors">{tool.icon}</div>
                   <div>
                    <h4 className="font-bold text-xl mb-2">{tool.title}</h4>
                    <div className="text-slate-400 text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">Explore →</div>
                   </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-6 py-12 md:py-24">
          <div className="grid lg:grid-cols-12 gap-12 md:gap-16">
            
            {/* --- CONTENT FEED --- */}
            <div className="lg:col-span-8 space-y-20">
              <section>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-10 text-center md:text-left">Latest Editorial</h3>
                <div className="space-y-16">
                  {initialPosts.map((post: any) => {
                    const imageUrl = extractImage(post.content);
                    const postSlug = `${Hakslugify(post.title)}-${post.id}`;
                    return (
                      <Link key={post.id} href={`/articles/${postSlug}`} className="group block">
                        <article className="grid md:grid-cols-2 gap-8 items-center">
                          <div className="aspect-[16/9] md:aspect-[4/3] bg-slate-100 overflow-hidden rounded-2xl">
                            {imageUrl ? (
                              <img src={imageUrl} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            ) : (
                              <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 font-bold uppercase tracking-tighter">No image</div>
                            )}
                          </div>
                          <div className="text-center md:text-left">
                            <time className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                              {new Date(post.published).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                            </time>
                            <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4 group-hover:underline leading-tight">{post.title}</h2>
                            <p className="text-slate-500 leading-relaxed mb-6 text-sm md:text-base line-clamp-3 md:line-clamp-none">{createExcerpt(post.content)}</p>
                            <span className="text-sm font-bold uppercase border-b-2 border-black pb-1">Read Post</span>
                          </div>
                        </article>
                      </Link>
                    );
                  })}
                </div>
              </section>

              {hasAdsenseApproval && (
                <div className="w-full bg-slate-50 border border-slate-100 py-12 flex items-center justify-center rounded-2xl">
                  <span className="text-slate-300 font-bold uppercase tracking-widest text-xs">Advertisement</span>
                </div>
              )}

              {/* --- FAQ --- */}
              <section className="pt-16 md:pt-20 border-t border-slate-100">
                <h3 className="text-3xl md:text-4xl font-black mb-8 md:mb-12">Frequently Asked Questions</h3>
                <div className="divide-y divide-slate-100">
                  {faqData.map((faq, i) => (
                    <details key={i} className="group py-6 cursor-pointer">
                      <summary className="list-none flex justify-between items-center font-bold text-lg hover:text-slate-600 transition-colors">
                        <span className="pr-4">{faq.q}</span>
                        <span className="text-xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                      </summary>
                      <p className="mt-4 text-slate-500 leading-relaxed max-w-2xl text-sm md:text-base">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            {/* --- SIDEBAR --- */}
            <aside className="lg:col-span-4 space-y-12">
              <div className="lg:sticky lg:top-12 space-y-12">
                
                <div className="bg-black p-8 text-white rounded-3xl shadow-2xl shadow-slate-300">
                  <h3 className="text-2xl font-bold mb-4">Stay Cured</h3>
                  <p className="text-slate-400 text-sm mb-6">Weekly hand-picked discoveries delivered straight to your inbox. No spam, ever.</p>
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="w-full bg-white/10 border border-white/20 p-4 text-sm placeholder:text-slate-500 focus:outline-none focus:border-white transition-colors rounded-xl"
                    />
                    <button 
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-white text-black font-bold p-4 text-sm uppercase tracking-widest hover:bg-slate-200 transition-colors disabled:opacity-70 rounded-xl"
                    >
                      {submitting ? "Subscribing..." : "Subscribe"}
                    </button>
                    {statusMessage && <p className="text-xs text-center pt-2 font-medium">{statusMessage}</p>}
                  </form>
                </div>

                {hasAdsenseApproval && (
                  <div className="bg-slate-50 border border-slate-100 h-[600px] flex items-center justify-center rounded-3xl">
                    <span className="text-slate-300 font-bold uppercase tracking-widest text-xs">Advertisement</span>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}