import React from "react";
import { Link } from "react-router-dom";
import {
  Gamepad2,
  Zap,
  Trophy,
  Users,
  ShieldCheck,
  Target,
  ArrowRight,
  Sparkles,
  Swords,
  Rocket,
  Heart,
} from "lucide-react";

const features = [
  {
    icon: Gamepad2,
    title: "Gaming First",
    description:
      "Discover exciting games, explore new challenges, and enjoy a gaming experience designed around players.",
    color: "#A855F7",
  },
  {
    icon: Trophy,
    title: "Compete & Win",
    description:
      "Challenge yourself, improve your skills, and climb the leaderboard as you progress.",
    color: "#67E8F9",
  },
  {
    icon: Users,
    title: "Built for Players",
    description:
      "A platform designed to bring gaming fans together through competition and shared experiences.",
    color: "#F472B6",
  },
  {
    icon: ShieldCheck,
    title: "Play with Confidence",
    description:
      "We aim to build a reliable, transparent experience with clear rules and player-focused features.",
    color: "#34D399",
  },
];

const values = [
  {
    icon: Zap,
    title: "Innovation",
    text: "We keep exploring better ways to make gaming exciting.",
  },
  {
    icon: Target,
    title: "Fair Competition",
    text: "Every player deserves clear rules and a fair playing field.",
  },
  {
    icon: Heart,
    title: "Player Focus",
    text: "The experience should be enjoyable, accessible, and easy to navigate.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#08050F] text-white">
      <style>{`
        .zoro-about-grid {
          background-image:
            linear-gradient(rgba(168,85,247,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,.035) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .zoro-about-glass {
          background: linear-gradient(145deg, rgba(255,255,255,.065), rgba(255,255,255,.018));
          border: 1px solid rgba(255,255,255,.09);
          backdrop-filter: blur(14px);
        }
        .zoro-about-card {
          transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
        }
        .zoro-about-card:hover {
          transform: translateY(-5px);
          border-color: rgba(168,85,247,.45);
          box-shadow: 0 15px 40px rgba(0,0,0,.24);
        }
      `}</style>

      <header className="relative z-20 border-b border-white/[0.08] bg-[#08050F]/90">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-400/40 bg-purple-500/15 text-purple-300">
              <Gamepad2 size={23} />
            </div>
            <div>
              <div className="text-lg font-black tracking-[0.16em]">
                ZORO <span className="text-purple-400">GAMES</span>
              </div>
              <div className="text-[9px] tracking-[0.28em] text-gray-500">
                ENTER THE GAME
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-7 text-sm text-gray-400 md:flex">
            <Link to="/" className="transition hover:text-white">Home</Link>
            <Link to="/games" className="transition hover:text-white">Games</Link>
            <Link to="/leaderboard" className="transition hover:text-white">Leaderboard</Link>
            <Link to="/about" className="font-semibold text-purple-300">About</Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-300 transition hover:bg-white/5 hover:text-white sm:block"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 px-4 py-2.5 text-sm font-bold shadow-lg shadow-purple-950/40 transition hover:brightness-110"
            >
              Join Now ↗
            </Link>
          </div>
        </nav>
      </header>

      <section className="zoro-about-grid relative">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:py-28 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-400/25 bg-purple-500/10 px-4 py-2 text-xs font-bold tracking-[0.18em] text-purple-300">
              <Sparkles size={14} /> THE WORLD OF ZORO
            </div>

            <h1 className="max-w-2xl text-4xl font-black leading-[1.12] sm:text-5xl lg:text-6xl">
              MORE THAN
              <br />
              JUST A <span className="text-purple-400">GAME.</span>
              <br />
              <span className="text-cyan-300">IT'S YOUR ARENA.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-gray-400 sm:text-lg">
              Welcome to ZORO GAMES — a gaming platform built around discovery,
              competition, and the thrill of the next challenge. Find your game,
              sharpen your skills, and make every session count.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/games"
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 font-bold transition hover:bg-purple-500"
              >
                Explore Games <ArrowRight size={18} />
              </Link>
              <Link
                to="/leaderboard"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 font-bold transition hover:border-cyan-300/40 hover:bg-white/[0.07]"
              >
                <Trophy size={18} className="text-cyan-300" /> Leaderboard
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-purple-400" /> Discover
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-300" /> Compete
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-pink-400" /> Level Up
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-purple-600/20 via-transparent to-cyan-400/10 blur-2xl" />
            <div className="zoro-about-glass relative overflow-hidden rounded-3xl p-5 sm:p-7">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.22em] text-gray-500">
                    PLAYER ZONE
                  </p>
                  <h2 className="mt-2 text-2xl font-black">YOUR NEXT LEVEL</h2>
                </div>
                <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-300">
                  <Rocket size={26} />
                </div>
              </div>

              <div className="relative my-7 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-purple-400/20 bg-gradient-to-br from-[#21113C] via-[#100B20] to-[#07141D]">
                <div className="absolute h-52 w-52 rounded-full border border-purple-400/20" />
                <div className="absolute h-40 w-40 rounded-full border border-cyan-300/20" />
                <div className="absolute h-28 w-28 rounded-full bg-purple-500/20 blur-2xl" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-purple-300/40 bg-purple-500/15 text-purple-200 shadow-[0_0_55px_rgba(168,85,247,0.2)]">
                  <Swords size={48} strokeWidth={1.5} />
                </div>
                <div className="absolute bottom-4 left-4 rounded-xl border border-white/10 bg-black/40 px-3 py-2 backdrop-blur">
                  <p className="text-[10px] tracking-widest text-gray-500">MISSION</p>
                  <p className="mt-1 text-sm font-bold">Ready to Play</p>
                </div>
                <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs text-cyan-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  GAME ON
                </div>
              </div>

              <div className="relative grid grid-cols-3 gap-3">
                {[
                  ["01", "DISCOVER"],
                  ["02", "COMPETE"],
                  ["03", "LEVEL UP"],
                ].map(([number, label]) => (
                  <div key={number} className="rounded-xl border border-white/[0.07] bg-black/20 p-3 text-center">
                    <p className="text-xl font-black text-purple-300">{number}</p>
                    <p className="mt-1 text-[9px] font-bold tracking-wider text-gray-500 sm:text-[10px]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black tracking-[0.25em] text-cyan-300">
            OUR MISSION
          </p>
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            A PLATFORM FOR THE <span className="text-purple-400">LOVE OF PLAY</span>
          </h2>
          <p className="mt-5 leading-8 text-gray-400">
            We want ZORO GAMES to be a place where players can explore games,
            follow their progress, and enjoy friendly competition. Our focus is
            a clean interface, exciting presentation, and features that can grow
            with the gaming community.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="zoro-about-glass zoro-about-card rounded-2xl p-6">
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    color: feature.color,
                    backgroundColor: `${feature.color}18`,
                    border: `1px solid ${feature.color}35`,
                  }}
                >
                  <Icon size={23} />
                </div>
                <h3 className="text-lg font-extrabold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-white/[0.018]">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-black tracking-[0.25em] text-purple-300">
              WHAT DRIVES US
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              OUR CORE <span className="text-cyan-300">VALUES</span>
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="zoro-about-glass zoro-about-card rounded-2xl p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-500/10 text-purple-300">
                      <Icon size={23} />
                    </div>
                    <span className="text-3xl font-black text-white/10">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-extrabold">{value.title}</h3>
                  <p className="mt-3 leading-7 text-gray-400">{value.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-purple-400/20 bg-gradient-to-br from-purple-950/70 via-[#130B22] to-[#08131B] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-72 -translate-x-1/2 rounded-full bg-purple-500/20 blur-[80px]" />
          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
              <Gamepad2 size={28} />
            </div>
            <h2 className="mt-6 text-3xl font-black sm:text-4xl">
              YOUR NEXT ADVENTURE <span className="text-purple-300">STARTS HERE</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-400">
              Explore the games section and discover what ZORO GAMES has to offer.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/games" className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 font-bold transition hover:bg-purple-500">
                Explore Games <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 font-bold transition hover:bg-white/[0.08]">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.08] bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Link to="/" className="font-black tracking-[0.15em] text-white">
            ZORO <span className="text-purple-400">GAMES</span>
          </Link>
          <p>Explore. Compete. Level Up.</p>
          <div className="flex flex-wrap gap-5">
            <Link to="/terms" className="transition hover:text-white">Terms</Link>
            <Link to="/privacy-policy" className="transition hover:text-white">Privacy</Link>
            <Link to="/support" className="transition hover:text-white">Support</Link>
          </div>
          <p>© {new Date().getFullYear()} ZORO GAMES</p>
        </div>
      </footer>
    </div>
  );
}
