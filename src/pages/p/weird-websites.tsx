/* eslint-disable react-hooks/purity */
import { useState, useEffect } from "react";
import Head from "next/head";
import confetti from "canvas-confetti";

const websites = [
    { "name": "The Useless Web", "url": "https://theuselessweb.com", "emoji": "🌀", "color": "from-pink-400 to-rose-500" },
    { "name": "Zombo", "url": "https://zombo.com", "emoji": "🎤", "color": "from-purple-400 to-indigo-500" },
    { "name": "Endless Horse", "url": "https://endless.horse", "emoji": "🐴", "color": "from-blue-400 to-cyan-500" },
    { "name": "Pointer Pointer", "url": "https://pointerpointer.com", "emoji": "👆", "color": "from-green-400 to-emerald-500" },
    { "name": "Eel Slap", "url": "https://eelslap.com", "emoji": "🐟", "color": "from-yellow-400 to-amber-500" },
    { "name": "Is It Christmas", "url": "https://isitchristmas.com", "emoji": "🎄", "color": "from-red-400 to-orange-500" },
    { "name": "Paper Toilet", "url": "https://papertoilet.com", "emoji": "🧻", "color": "from-teal-400 to-cyan-500" },
    { "name": "Staggering Beauty", "url": "https://staggeringbeauty.com", "emoji": "🪱", "color": "from-indigo-400 to-purple-500" },
    { "name": "Cat Bounce", "url": "https://cat-bounce.com", "emoji": "🐱", "color": "from-pink-500 to-rose-600" },
    { "name": "The Most Amazing Website", "url": "https://themostamazingwebsiteontheinternet.com", "emoji": "🌟", "color": "from-violet-400 to-purple-500" },
    { "name": "Falling Falling", "url": "https://falling-falling.com", "emoji": "🍂", "color": "from-pink-400 to-rose-500" },
    { "name": "Electric Boogiewoogie", "url": "https://electricboogiewoogie.com", "emoji": "⚡", "color": "from-purple-400 to-indigo-500" },
    { "name": "Zoom Quilt", "url": "https://zoomquilt.org", "emoji": "🖼️", "color": "from-blue-400 to-cyan-500" },
    { "name": "Scream Into The Void", "url": "https://screamintothevoid.com", "emoji": "😱", "color": "from-green-400 to-emerald-500" },
    { "name": "Nooooooooooooooo", "url": "https://nooooooooooooooo.com", "emoji": "😫", "color": "from-yellow-400 to-amber-500" },
    { "name": "Shady URL", "url": "https://shadyurl.com", "emoji": "🔗", "color": "from-red-400 to-orange-500" },
    { "name": "This Cat Does Not Exist", "url": "https://thiscatdoesnotexist.com", "emoji": "🐱", "color": "from-teal-400 to-cyan-500" },
    { "name": "This Person Does Not Exist", "url": "https://thispersondoesnotexist.com", "emoji": "👤", "color": "from-indigo-400 to-purple-500" },
    { "name": "Quick Draw", "url": "https://quickdraw.withgoogle.com", "emoji": "✏️", "color": "from-pink-500 to-rose-600" },
    { "name": "Akinator", "url": "https://akinator.com", "emoji": "🧞", "color": "from-violet-400 to-purple-500" },
    { "name": "GeoGuessr", "url": "https://geoguessr.com", "emoji": "🌍", "color": "from-pink-400 to-rose-500" },
    { "name": "Map Crunch", "url": "https://mapcrunch.com", "emoji": "🗺️", "color": "from-purple-400 to-indigo-500" },
    { "name": "The Nicest Place On The Internet", "url": "https://thenicestplaceontheinter.net", "emoji": "🤗", "color": "from-blue-400 to-cyan-500" },
    { "name": "This Is Sand", "url": "https://thisissand.com", "emoji": "🏜️", "color": "from-green-400 to-emerald-500" },
    { "name": "RGB Int", "url": "https://rgb.int", "emoji": "🌈", "color": "from-yellow-400 to-amber-500" },
    { "name": "Mondrian And Me", "url": "https://mondrianandme.com", "emoji": "🎨", "color": "from-red-400 to-orange-500" },
    { "name": "Into Time", "url": "https://intotime.com", "emoji": "⏳", "color": "from-teal-400 to-cyan-500" },
    { "name": "Cornify", "url": "https://cornify.com", "emoji": "🦄", "color": "from-indigo-400 to-purple-500" },
    { "name": "Nyan Cat", "url": "https://nyan.cat", "emoji": "🐱", "color": "from-pink-500 to-rose-600" },
    { "name": "Procatinator", "url": "https://procatinator.com", "emoji": "🐱", "color": "from-violet-400 to-purple-500" },
    { "name": "Long Doge Challenge", "url": "https://longdogechallenge.com", "emoji": "🐕", "color": "from-pink-400 to-rose-500" },
    { "name": "Bees Bees Bees", "url": "https://beesbeesbees.com", "emoji": "🐝", "color": "from-purple-400 to-indigo-500" },
    { "name": "Ducks Are The Best", "url": "https://ducksarethebest.com", "emoji": "🦆", "color": "from-blue-400 to-cyan-500" },
    { "name": "OMFG Dogs", "url": "https://omfgdogs.com", "emoji": "🐶", "color": "from-green-400 to-emerald-500" },
    { "name": "Everyday I'm", "url": "https://everydayim.com", "emoji": "🕺", "color": "from-yellow-400 to-amber-500" },
    { "name": "Windows 93", "url": "https://windows93.net", "emoji": "🖥️", "color": "from-red-400 to-orange-500" },
    { "name": "Heaven's Gate", "url": "https://heavensgate.com", "emoji": "👼", "color": "from-teal-400 to-cyan-500" },
    { "name": "Million Dollar Homepage", "url": "https://milliondollarhomepage.com", "emoji": "💵", "color": "from-indigo-400 to-purple-500" },
    { "name": "Z0r", "url": "https://z0r.de", "emoji": "🎞️", "color": "from-pink-500 to-rose-600" },
    { "name": "Much Better Than This", "url": "https://muchbetterthanthis.com", "emoji": "👍", "color": "from-violet-400 to-purple-500" },
    { "name": "Chihuahua Spin", "url": "https://chihuahuaspin.com", "emoji": "🐶", "color": "from-pink-400 to-rose-500" },
    { "name": "Nulling The Void", "url": "https://nullingthevoid.com", "emoji": "🕳️", "color": "from-purple-400 to-indigo-500" },
    { "name": "Bury Me With My Money", "url": "https://burymewithmymoney.com", "emoji": "💰", "color": "from-blue-400 to-cyan-500" },
    { "name": "Ffffidget", "url": "https://ffffidget.com", "emoji": "🌀", "color": "from-green-400 to-emerald-500" },
    { "name": "Stellarium Web", "url": "https://stellarium-web.org", "emoji": "⭐", "color": "from-yellow-400 to-amber-500" },
    { "name": "Blue Ball Machine", "url": "https://blueball-machine.com", "emoji": "🔵", "color": "from-red-400 to-orange-500" },
    { "name": "Falling Falling", "url": "https://fallingfalling.com", "emoji": "🍂", "color": "from-teal-400 to-cyan-500" },
    { "name": "Weird Or Confusing", "url": "https://weirdorconfusing.com", "emoji": "😵‍💫", "color": "from-indigo-400 to-purple-500" },
    { "name": "Pointless Sites", "url": "https://pointlesssites.com", "emoji": "🌀", "color": "from-pink-500 to-rose-600" },
    { "name": "Try Pap", "url": "https://trypap.com", "emoji": "🎤", "color": "from-violet-400 to-purple-500" },
    { "name": "Random Colour", "url": "https://randomcolour.com", "emoji": "🎨", "color": "from-pink-400 to-rose-500" },
    { "name": "Great Big Nothing", "url": "https://greatbignothing.com", "emoji": "🕳️", "color": "from-purple-400 to-indigo-500" },
    { "name": "Heyyeyaaeyaaaeyaeyaa", "url": "https://heyyeyaaeyaaaeyaeyaa.com", "emoji": "🕺", "color": "from-blue-400 to-cyan-500" },
    { "name": "Koalas To The Max", "url": "https://koalastothemax.com", "emoji": "🐨", "color": "from-green-400 to-emerald-500" },
    { "name": "Checkbox Race", "url": "https://checkboxrace.com", "emoji": "☑️", "color": "from-yellow-400 to-amber-500" },
    { "name": "Incredibox", "url": "https://incredibox.com", "emoji": "🎹", "color": "from-red-400 to-orange-500" },
    { "name": "Weave Silk", "url": "https://weavesilk.com", "emoji": "🕸️", "color": "from-teal-400 to-cyan-500" },
    { "name": "Pixel Thoughts", "url": "https://pixelthoughts.co", "emoji": "🧘", "color": "from-indigo-400 to-purple-500" },
    { "name": "Make Everything OK", "url": "https://makeeverythingok.com", "emoji": "👍", "color": "from-pink-500 to-rose-600" },
    { "name": "Republique Des Mangues", "url": "https://republiquedesmangues.fr", "emoji": "🥭", "color": "from-violet-400 to-purple-500" },
    { "name": "Salmon Of Capistrano", "url": "https://salmonofcapistrano.com", "emoji": "🐟", "color": "from-pink-400 to-rose-500" },
    { "name": "Hacker Typer", "url": "https://hackertyper.com", "emoji": "💻", "color": "from-purple-400 to-indigo-500" },
    { "name": "Fake Update", "url": "https://fakeupdate.net", "emoji": "🖥️", "color": "from-blue-400 to-cyan-500" },
    { "name": "Random Website", "url": "https://randomwebsite.com", "emoji": "🎲", "color": "from-green-400 to-emerald-500" },
    { "name": "Everyday I'm Hustlin", "url": "https://everydayimhustlin.com", "emoji": "🕺", "color": "from-yellow-400 to-amber-500" },
    { "name": "Tag Galaxy", "url": "https://tag-galaxy.com", "emoji": "🏷️", "color": "from-red-400 to-orange-500" },
    { "name": "Patience Is A Virtue", "url": "https://patience-is-a-virtue.org", "emoji": "⏳", "color": "from-teal-400 to-cyan-500" },
    { "name": "Sanger", "url": "https://sanger.dk", "emoji": "🎤", "color": "from-indigo-400 to-purple-500" },
    { "name": "Leek Spin", "url": "https://leekspin.com", "emoji": "🕺", "color": "from-pink-500 to-rose-600" },
    { "name": "Hamster Dance", "url": "https://hamsterdance.org", "emoji": "🐹", "color": "from-violet-400 to-purple-500" },
    { "name": "Drawing Garden", "url": "https://drawing.garden", "emoji": "✏️", "color": "from-pink-400 to-rose-500" },
    { "name": "Emu Porn", "url": "https://emuporn.net", "emoji": "🐦", "color": "from-purple-400 to-indigo-500" },
    { "name": "The Quiet Place", "url": "https://thequietplace.com", "emoji": "🤫", "color": "from-blue-400 to-cyan-500" },
    { "name": "Stress Calm", "url": "https://stresscalm.me", "emoji": "🧘", "color": "from-green-400 to-emerald-500" },
    { "name": "Windows 95 Tips", "url": "https://windows95tips.com", "emoji": "🖥️", "color": "from-yellow-400 to-amber-500" },
    { "name": "Blank Windows", "url": "https://blankwindows.com", "emoji": "🖥️", "color": "from-red-400 to-orange-500" },
    { "name": "Sticky Moose", "url": "https://stickymoose.com", "emoji": "🫎", "color": "from-teal-400 to-cyan-500" },
    { "name": "Partridge Gets Lucky", "url": "https://partridgegetslucky.com", "emoji": "🎸", "color": "from-indigo-400 to-purple-500" },
    { "name": "Always Be", "url": "https://alwaysbe.net", "emoji": "🔄", "color": "from-pink-500 to-rose-600" },
    { "name": "WWW Dot Com", "url": "https://wwwdotcom.com", "emoji": "🌐", "color": "from-violet-400 to-purple-500" },
    { "name": "Is My Computer On", "url": "https://ismycomputeron.com", "emoji": "💻", "color": "from-pink-400 to-rose-500" },
    { "name": "Corgi Orgy", "url": "https://corgiorgy.com", "emoji": "🐶", "color": "from-purple-400 to-indigo-500" },
    { "name": "Has The LHC Destroyed The World Yet", "url": "https://hasthelargehadroncolliderdestroyedtheworldyet.com", "emoji": "⚛️", "color": "from-blue-400 to-cyan-500" },
    { "name": "Is Today Friday The 13th", "url": "https://istodayfridaythe13th.com", "emoji": "📅", "color": "from-green-400 to-emerald-500" },
    { "name": "Bread Fish", "url": "https://breadfish.de", "emoji": "🐟", "color": "from-yellow-400 to-amber-500" },
    { "name": "The Blue Dot", "url": "https://thebluedot.org", "emoji": "🔵", "color": "from-red-400 to-orange-500" },
    { "name": "Pixel Joint", "url": "https://pixeljoint.com", "emoji": "🧘", "color": "from-teal-400 to-cyan-500" },
    { "name": "ASCII Art", "url": "https://ascii-art.de", "emoji": "💻", "color": "from-indigo-400 to-purple-500" },
    { "name": "ASCII Middle Finger", "url": "https://ascii-middle-finger.com", "emoji": "💻", "color": "from-pink-500 to-rose-600" },
    { "name": "Badger Badger Badger", "url": "https://badgerbadgerbadger.com", "emoji": "🦡", "color": "from-violet-400 to-purple-500" },
    { "name": "Superbad", "url": "https://superbad.com", "emoji": "🦸", "color": "from-pink-400 to-rose-500" },
    { "name": "Is My Port Open", "url": "https://ismyportopen.com", "emoji": "🚪", "color": "from-purple-400 to-indigo-500" },
    { "name": "The World's Worst Website Ever", "url": "https://theworldsworstwebsiteever.com", "emoji": "💩", "color": "from-blue-400 to-cyan-500" },
    { "name": "Find The Invisible Cow", "url": "https://findtheinvisiblecow.com", "emoji": "🐮", "color": "from-green-400 to-emerald-500" }
];

export default function WeirdWebsites() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredWebsites = websites.filter((site) =>
        site.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRandom = () => {
        const randomIndex = Math.floor(Math.random() * websites.length);
        window.open(websites[randomIndex].url, "_blank");

        confetti({
            particleCount: 200,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#a78bfa", "#f472b6", "#fbbf24", "#34d399", "#60a5fa", "#fb923c"],
        });
    };

    return (
        <>
            <Head>
                <title>Weird & Wonderful Web 🌐 | 100+ Strangest Internet Gems</title>
                <meta
                    name="description"
                    content="The ultimate collection of the weirdest, funniest, and most wonderfully useless websites. Now with ALL the classics!"
                />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-violet-100 via-pink-100 to-amber-100 relative overflow-hidden">
                {/* Floating emojis background */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                    {[...Array(40)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute text-5xl animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.3}s`,
                                animationDuration: `${20 + Math.random() * 30}s`,
                            }}
                        >
                            {websites[i % websites.length].emoji}
                        </div>
                    ))}
                </div>

                {/* Hero */}
                <section className="relative py-24 sm:py-40 text-center z-10">
                    <div className="container mx-auto px-6">
                        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 drop-shadow-3xl">
                            Weird & Wonderful Web 🌐
                        </h1>
                        <p className="mt-8 text-2xl sm:text-4xl font-light text-gray-800 max-w-5xl mx-auto">
                            The complete hand-curated collection of {websites.length} bizarre, hilarious, and utterly pointless internet treasures.
                        </p>

                        <div className="mt-16">
                            <button
                                onClick={handleRandom}
                                className="group px-20 py-10 text-4xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-3xl hover:shadow-purple-600/60 hover:scale-110 transform transition-all duration-500 flex items-center justify-center gap-6 mx-auto"
                            >
                                🎲 Surprise Me!
                                <span className="text-5xl group-hover:rotate-360 transition-transform duration-1000">✨</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Search */}
                <section className="py-12 relative z-10">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="🔍 Search the madness... (cat, dog, music, art, weird...)"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-12 py-7 text-2xl rounded-full bg-white/95 backdrop-blur-lg shadow-3xl border-4 border-purple-300 focus:border-pink-500 focus:outline-none transition-all"
                            />
                            <span className="absolute right-10 top-1/2 -translate-y-1/2 text-5xl animate-pulse">🌀</span>
                        </div>
                    </div>
                </section>

                {/* Grid */}
                <section className="py-20 relative z-10">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                            {filteredWebsites.map((site) => (
                                <a
                                    key={site.name}
                                    href={site.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group relative block p-10 rounded-3xl bg-gradient-to-br ${site.color} text-white shadow-2xl hover:shadow-4xl transform hover:-translate-y-8 hover:rotate-6 transition-all duration-500 overflow-hidden`}
                                >
                                    <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative z-10 text-center">
                                        <div className="text-8xl mb-6 drop-shadow-2xl group-hover:scale-150 group-hover:rotate-12 transition-all duration-500">
                                            {site.emoji}
                                        </div>
                                        <h3 className="text-2xl font-extrabold drop-shadow-lg group-hover:text-yellow-200 transition-colors">
                                            {site.name}
                                        </h3>
                                        <p className="mt-6 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 font-medium">
                                            Dive in →
                                        </p>
                                    </div>
                                    <div className="absolute top-6 right-6 text-5xl opacity-0 group-hover:opacity-100 animate-bounce">
                                        ✨
                                    </div>
                                </a>
                            ))}
                        </div>

                        {filteredWebsites.length === 0 && (
                            <div className="text-center py-40">
                                <p className="text-6xl font-bold text-gray-700">😵‍💫 Whoops! Nothing found...</p>
                                <p className="text-4xl text-gray-600 mt-8">Even the void is confused. Try another search!</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <style jsx>{`
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
        </>
    );
}