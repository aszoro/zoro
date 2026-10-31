import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Gamepad2,
  Search,
  Trophy,
  ArrowRight,
  Play,
  X,
  Flame,
  Star,
  Zap,
  Clock3,
  Sparkles,
} from "lucide-react";

const games = [
  {
    id: 1,
    title: "Cyber Strike",
    category: "Action",
    description: "Enter a neon battlefield and test your reflexes in this futuristic action experience.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=85",
    rating: "4.8",
    status: "Featured",
    accent: "#A855F7",
  },
  {
    id: 2,
    title: "Velocity Rush",
    category: "Racing",
    description: "Push your speed to the limit across glowing tracks and high-energy circuits.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=85",
    rating: "4.7",
    status: "Popular",
    accent: "#67E8F9",
  },
  {
    id: 3,
    title: "Shadow Quest",
    category: "Adventure",
    description: "Explore mysterious worlds, discover hidden paths, and take on new challenges.",
    image: "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=1000&q=85",
    rating: "4.6",
    status: "New",
    accent: "#F472B6",
  },
  {
    id: 4,
    title: "Battle Arena",
    category: "Action",
    description: "Build your strategy, sharpen your timing, and prepare for an arena challenge.",
    image: "https://images.unsplash.com/photo-1493711662062-fa541f5a3f2c?auto=format&fit=crop&w=1000&q=85",
    rating: "4.5",
    status: "Popular",
    accent: "#FBBF24",
  },
  {
    id: 5,
    title: "Drift Legends",
    category: "Racing",
    description: "Slide through tight corners and master the art of precision driving.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85",
    rating: "4.7",
    status: "Featured",
    accent: "#34D399",
  },
  {
    id: 6,
    title: "Lost Galaxy",
    category: "Adventure",
    description: "Travel beyond the stars in a sci-fi world filled with exploration and mystery.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1000&q=85",
    rating: "4.6",
    status: "New",
    accent: "#818CF8",
  },
];

const categories = ["All Games", "Action", "Racing", "Adventure"];

export default function Games() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Games");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const filteredGames = useMemo(() => {
    const term = search.trim().toLowerCase();
    return games.filter((game) => {
      const matchesSearch =
        !term ||
        game.title.toLowerCase().includes(term) ||
        game.category.toLowerCase().includes(term) ||
        game.description.toLowerCase().includes(term);
      const matchesCategory = category === "All Games" || game.category === category;
      const matchesFeatured = !featuredOnly || game.status === "Featured";
      return matchesSearch && matchesCategory && matchesFeatured;
    });
  }, [search, category, featuredOnly]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#08050F] text-white">
      <style>{`
        .zoro-games-grid {
          background-image:
            linear-gradient(rgba(168,85,247,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,.035) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .zoro-games-glass {
          background: linear-gradient(145deg, rgba(255,255,255,.06), rgba(255,255,255,.015));
          border: 1px solid rgba(255,255,255,.09);
          backdrop-filter: blur(14px);
        }
        .zoro-game-card {
          transition: transform .24s ease, border-color .24s ease, box-shadow .24s ease;
        }
        .zoro-game-card:hover {
          transform: translateY(-5px);
          border-color: rgba(168,85,247,.42);
          box-shadow: 0 18px 42px rgba(0,0,0,.3);
        }
      `}</style>

      <header className="relative z-20 border-b border-white/[0.08] bg-[#08050F]/90">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-400/40 bg-purple-500/15 text-purple-300">
              <Gamepad2 size={23} />
            </div>
            <div>
              <div className="text-lg font-black tracking-[0.14em]">
                ZORO <span className="text-purple-400">GAMES</span>
              </div>
              <div className="text-[9px] tracking-[0.26em] text-gray-500">PLAY YOUR WAY</div>
            </div>
          </Link>

          <div className="hidden items-center gap-7 text-sm text-gray-400 md:flex">
            <Link to="/" className="transition hover:text-white">Home</Link>
            <Link to="/games" className="font-semibold text-purple-300">Games</Link>
            <Link to="/leaderboard" className="transition hover:text-white">Leaderboard</Link>
            <Link to="/about" className="transition hover:text-white">About</Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-300 transition hover:bg-white/5 sm:block">
              Login
            </Link>
            <Link to="/register" className="rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 px-4 py-2.5 text-sm font-bold transition hover:brightness-110">
              Join Now ↗
            </Link>
          </div>
        </nav>
      </header>

      <section className="zoro-games-grid relative">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-16 sm:pb-16 sm:pt-20 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-xs font-bold tracking-[0.16em] text-cyan-200">
                <Sparkles size={14} /> YOUR NEXT CHALLENGE AWAITS
              </div>
              <h1 className="text-4xl font-black leading-[1.12] sm:text-5xl lg:text-6xl">
                CHOOSE YOUR
                <br />
                <span className="text-purple-400">NEXT GAME.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-gray-400 sm:text-lg">
                Explore action, racing, and adventure experiences. Find your
                style, discover new worlds, and get ready for your next challenge.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#game-library" className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 font-bold transition hover:bg-purple-500">
                  Browse Library <ArrowRight size={18} />
                </a>
                <Link to="/leaderboard" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 font-bold transition hover:border-cyan-300/30">
                  <Trophy size={18} className="text-cyan-300" /> Leaderboard
                </Link>
              </div>
            </div>

            <div className="zoro-games-glass relative overflow-hidden rounded-3xl p-5 sm:p-7">
              <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-purple-500/15 blur-[70px]" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] text-gray-500">GAME LIBRARY</p>
                  <h2 className="mt-2 text-2xl font-black">Find Your Arena</h2>
                </div>
                <div className="rounded-2xl border border-purple-400/25 bg-purple-500/10 p-3 text-purple-300">
                  <Gamepad2 size={26} />
                </div>
              </div>
              <div className="relative mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-purple-400/20 bg-purple-500/[0.07] p-4">
                  <Flame className="text-purple-300" size={22} />
                  <p className="mt-4 text-2xl font-black">Action</p>
                  <p className="mt-1 text-xs text-gray-500">Fast-paced play</p>
                </div>
                <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.05] p-4">
                  <Zap className="text-cyan-300" size={22} />
                  <p className="mt-4 text-2xl font-black">Racing</p>
                  <p className="mt-1 text-xs text-gray-500">Speed and control</p>
                </div>
                <div className="col-span-2 flex items-center justify-between rounded-2xl border border-pink-400/20 bg-pink-500/[0.04] p-4">
                  <div>
                    <p className="text-xs font-bold tracking-[0.15em] text-pink-300">EXPLORE MORE</p>
                    <p className="mt-1 font-bold">Adventure starts here</p>
                  </div>
                  <Star size={23} className="text-pink-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main id="game-library" className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black tracking-[0.22em] text-purple-300">THE COLLECTION</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Explore Games</h2>
            <p className="mt-3 text-sm text-gray-400">
              Browse the collection and filter by your favourite genre.
            </p>
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-bold text-white">{filteredGames.length}</span> games shown
          </div>
        </div>

        <div className="zoro-games-glass mb-8 rounded-2xl p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative min-w-0 flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search games, genres..."
                aria-label="Search games"
                className="w-full rounded-xl border border-white/10 bg-black/25 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-400/60"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                    category === item
                      ? "bg-purple-600 text-white"
                      : "border border-white/10 bg-white/[0.025] text-gray-400 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-400">
              <input
                type="checkbox"
                checked={featuredOnly}
                onChange={(event) => setFeaturedOnly(event.target.checked)}
                className="h-4 w-4 accent-purple-500"
              />
              Featured only
            </label>
          </div>
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredGames.map((game) => (
              <article key={game.id} className="zoro-games-glass zoro-game-card overflow-hidden rounded-2xl">
                <div className="relative h-52 overflow-hidden bg-[#130D20]">
                  <img
                    src={game.image}
                    alt={game.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08050F] via-black/10 to-transparent" />
                  <span
                    className="absolute left-4 top-4 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] backdrop-blur"
                    style={{
                      color: game.accent,
                      borderColor: `${game.accent}50`,
                      backgroundColor: `${game.accent}18`,
                    }}
                  >
                    {game.status}
                  </span>
                  <span className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                    {game.category}
                  </span>
                  <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-lg border border-white/10 bg-black/50 px-2.5 py-1.5 text-xs font-bold">
                    <Star size={13} className="fill-yellow-300 text-yellow-300" /> {game.rating}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-black">{game.title}</h3>
                  <p className="mt-2 min-h-[72px] text-sm leading-6 text-gray-400">
                    {game.description}
                  </p>
                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedGame(game)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-bold transition hover:bg-purple-500"
                    >
                      <Play size={16} /> Preview
                    </button>
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-gray-300 transition hover:border-cyan-300/30 hover:text-cyan-200"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="zoro-games-glass rounded-2xl px-5 py-16 text-center">
            <Search size={34} className="mx-auto text-gray-600" />
            <h3 className="mt-4 text-xl font-black">No games found</h3>
            <p className="mt-2 text-sm text-gray-500">Try another search or change the selected category.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All Games");
                setFeaturedOnly(false);
              }}
              className="mt-5 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold transition hover:bg-purple-500"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      <section className="px-5 pb-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 rounded-3xl border border-purple-400/20 bg-gradient-to-r from-purple-950/50 to-[#0B131D] p-6 sm:flex-row sm:items-center sm:p-9">
          <div>
            <p className="text-xs font-black tracking-[0.2em] text-cyan-300">READY TO COMPETE?</p>
            <h2 className="mt-3 text-2xl font-black sm:text-3xl">Your next level starts here.</h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Create an account to get started. Game launching and player progress need backend integration.
            </p>
          </div>
          <Link to="/register" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 font-bold transition hover:bg-purple-500">
            Create Account <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/[0.08] bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Link to="/" className="font-black tracking-[0.15em] text-white">
            ZORO <span className="text-purple-400">GAMES</span>
          </Link>
          <p>Explore. Compete. Level Up.</p>
          <div className="flex flex-wrap gap-5">
            <Link to="/about" className="transition hover:text-white">About</Link>
            <Link to="/terms" className="transition hover:text-white">Terms</Link>
            <Link to="/privacy-policy" className="transition hover:text-white">Privacy</Link>
            <Link to="/support" className="transition hover:text-white">Support</Link>
          </div>
          <p>© {new Date().getFullYear()} ZORO GAMES</p>
        </div>
      </footer>

      {selectedGame && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="game-preview-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedGame(null);
          }}
        >
          <div className="zoro-games-glass w-full max-w-lg overflow-hidden rounded-3xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] p-5">
              <div>
                <p className="text-xs font-bold tracking-[0.15em] text-purple-300">GAME PREVIEW</p>
                <h2 id="game-preview-title" className="mt-1 text-xl font-black">{selectedGame.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedGame(null)}
                aria-label="Close preview"
                className="rounded-xl border border-white/10 p-2 text-gray-400 transition hover:text-white"
              >
                <X size={19} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm leading-7 text-gray-300">{selectedGame.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-purple-400/25 bg-purple-500/10 px-3 py-1.5 text-purple-200">{selectedGame.category}</span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-gray-300">Rating {selectedGame.rating}</span>
              </div>
              <div className="mt-5 rounded-xl border border-cyan-300/15 bg-cyan-300/[0.04] p-4 text-sm leading-6 text-gray-400">
                This is a catalogue preview. A playable game or launch URL has not been connected yet.
              </div>
              <div className="mt-5 flex gap-3">
                <Link to="/login" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-bold transition hover:bg-purple-500">
                  Continue <ArrowRight size={16} />
                </Link>
                <button type="button" onClick={() => setSelectedGame(null)} className="rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-gray-300 transition hover:bg-white/5">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
