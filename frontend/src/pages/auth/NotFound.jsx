import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#070711] text-white flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-2xl text-center">
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-[0_0_45px_rgba(34,211,238,0.12)]">
          <Gamepad2 size={38} />
        </div>
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">ZORO GAMES</p>
        <h1 className="text-8xl font-black leading-none sm:text-9xl">
          <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">404</span>
        </h1>
        <h2 className="mt-6 text-2xl font-bold sm:text-3xl">Oops! Game not found.</h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
          This page may have moved, or the link may be incorrect. Let’s get you back into the game.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-200"
          >
            <Home size={18} /> Go Home
          </Link>
          <Link
            to="/games"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 font-semibold text-white transition hover:border-violet-400/50 hover:bg-white/[0.08]"
          >
            <Search size={18} /> Explore Games
          </Link>
        </div>
      </div>
    </main>
  );
}
