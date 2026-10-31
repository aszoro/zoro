import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Gamepad2,
  Trophy,
  Search,
  Medal,
  Crown,
  Swords,
  Zap,
  ChevronUp,
  ChevronDown,
  UserRound,
  ArrowRight,
  Star,
} from "lucide-react";

const initialPlayers = [
  { id: 1, name: "ShadowHunter", level: 42, points: 12850, wins: 184, tag: "ACE", color: "#FBBF24" },
  { id: 2, name: "NeonPhantom", level: 39, points: 11640, wins: 162, tag: "ELITE", color: "#CBD5E1" },
  { id: 3, name: "CyberWolf", level: 36, points: 10420, wins: 149, tag: "PRO", color: "#D97706" },
  { id: 4, name: "PixelStorm", level: 33, points: 9380, wins: 131, tag: "PRO", color: "#A855F7" },
  { id: 5, name: "BlazeRunner", level: 31, points: 8740, wins: 119, tag: "RISING", color: "#67E8F9" },
  { id: 6, name: "NovaStrike", level: 29, points: 7960, wins: 108, tag: "RISING", color: "#F472B6" },
  { id: 7, name: "GhostByte", level: 27, points: 7210, wins: 96, tag: "PLAYER", color: "#34D399" },
  { id: 8, name: "RapidRogue", level: 25, points: 6540, wins: 87, tag: "PLAYER", color: "#818CF8" },
  { id: 9, name: "FrostViper", level: 23, points: 5820, wins: 73, tag: "PLAYER", color: "#67E8F9" },
  { id: 10, name: "LuckyPixel", level: 21, points: 4910, wins: 61, tag: "PLAYER", color: "#F472B6" },
];

const filters = [
  { label: "All Players", value: "all" },
  { label: "Top 3", value: "top" },
  { label: "Rising", value: "rising" },
];

export default function Leaderboard() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("points");
  const [direction, setDirection] = useState("desc");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const players = useMemo(() => {
    let result = [...initialPlayers];
    const term = search.trim().toLowerCase();

    if (term) {
      result = result.filter((player) => player.name.toLowerCase().includes(term));
    }

    if (filter === "top") result = result.filter((player) => player.id <= 3);
    if (filter === "rising") result = result.filter((player) => player.tag === "RISING");

    result.sort((a, b) => {
      const comparison = b[sortBy] - a[sortBy];
      return direction === "desc" ? comparison : -comparison;
    });

    return result;
  }, [search, filter, sortBy, direction]);

  const toggleSort = (field) => {
    if (sortBy === field) {
      setDirection((current) => current === "desc" ? "asc" : "desc");
    } else {
      setSortBy(field);
      setDirection("desc");
    }
  };

  const podium = [...initialPlayers].sort((a, b) => b.points - a.points).slice(0, 3);
  const podiumOrder = [podium[1], podium[0], podium[2]];

  return (
    <div className="min-h-screen overflow-hidden bg-[#08050F] text-white">
      <style>{`
        .zoro-leader-grid {
          background-image:
            linear-gradient(rgba(168,85,247,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,.035) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .zoro-leader-glass {
          background: linear-gradient(145deg, rgba(255,255,255,.06), rgba(255,255,255,.015));
          border: 1px solid rgba(255,255,255,.09);
          backdrop-filter: blur(14px);
        }
        .zoro-leader-card {
          transition: transform .22s ease, border-color .22s ease;
        }
        .zoro-leader-card:hover {
          transform: translateY(-3px);
          border-color: rgba(168,85,247,.4);
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
              <div className="text-[9px] tracking-[0.25em] text-gray-500">PLAYER RANKINGS</div>
            </div>
          </Link>

          <div className="hidden items-center gap-7 text-sm text-gray-400 md:flex">
            <Link to="/" className="transition hover:text-white">Home</Link>
            <Link to="/games" className="transition hover:text-white">Games</Link>
            <Link to="/leaderboard" className="font-semibold text-purple-300">Leaderboard</Link>
            <Link to="/about" className="transition hover:text-white">About</Link>
          </div>

          <Link to="/register" className="rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 px-4 py-2.5 text-sm font-bold transition hover:brightness-110">
            Join Now ↗
          </Link>
        </nav>
      </header>

      <section className="zoro-leader-grid relative">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-16 sm:pt-20 lg:px-8">
          <div className="text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-300/[0.05] px-4 py-2 text-xs font-bold tracking-[0.16em] text-yellow-200">
              <Trophy size={14} /> THE HALL OF FAME
            </div>
            <h1 className="text-4xl font-black sm:text-5xl lg:text-6xl">
              TOP <span className="text-purple-400">PLAYERS.</span>
              <br />
              <span className="text-cyan-300">LEGENDARY MOVES.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
              Explore player rankings, compare points, and celebrate the players
              making their mark in the ZORO GAMES arena.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl items-end gap-4 sm:grid-cols-3">
            {podiumOrder.map((player) => {
              const rank = player.id;
              const first = rank === 1;
              return (
                <button
                  key={player.id}
                  type="button"
                  onClick={() => setSelectedPlayer(player)}
                  className={`zoro-leader-glass zoro-leader-card relative rounded-2xl p-5 text-center ${
                    first ? "order-1 border-yellow-300/25 sm:order-2 sm:pb-8" :
                    rank === 2 ? "order-2 sm:order-1 sm:pb-5" : "order-3 sm:pb-3"
                  }`}
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border text-2xl font-black"
                    style={{ color: player.color, borderColor: `${player.color}50`, backgroundColor: `${player.color}15` }}>
                    {first ? <Crown size={27} /> : <UserRound size={25} />}
                  </div>
                  <div className="mt-4 text-xs font-black tracking-[0.18em]" style={{ color: player.color }}>
                    {first ? "1ST PLACE" : rank === 2 ? "2ND PLACE" : "3RD PLACE"}
                  </div>
                  <h2 className="mt-2 truncate text-lg font-black">{player.name}</h2>
                  <p className="mt-2 text-2xl font-black">{player.points.toLocaleString()}</p>
                  <p className="mt-1 text-xs text-gray-500">POINTS</p>
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                    <Zap size={13} className="text-cyan-300" /> Level {player.level}
                  </div>
                </button>
              );
            })}
          </div>
          <p className="mt-5 text-center text-xs text-gray-600">
            Illustrative sample rankings. Connect your game backend for live player results.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black tracking-[0.22em] text-purple-300">RANKINGS</p>
            <h2 className="mt-2 text-3xl font-black">Leaderboard</h2>
            <p className="mt-2 text-sm text-gray-400">Search players and sort their sample statistics.</p>
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-bold text-white">{players.length}</span> players shown
          </div>
        </div>

        <div className="zoro-leader-glass mb-6 rounded-2xl p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative min-w-0 flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search player..."
                aria-label="Search players"
                className="w-full rounded-xl border border-white/10 bg-black/25 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-400/60"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                    filter === item.value ? "bg-purple-600 text-white" : "border border-white/10 bg-white/[0.025] text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="zoro-leader-glass overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse text-left">
              <thead className="border-b border-white/[0.08] bg-white/[0.025]">
                <tr className="text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-4 font-bold">Rank</th>
                  <th className="px-5 py-4 font-bold">Player</th>
                  <th className="px-5 py-4 font-bold">
                    <button type="button" onClick={() => toggleSort("level")} className="inline-flex items-center gap-1 hover:text-white">
                      Level {sortBy === "level" && (direction === "desc" ? <ChevronDown size={13} /> : <ChevronUp size={13} />)}
                    </button>
                  </th>
                  <th className="px-5 py-4 font-bold">
                    <button type="button" onClick={() => toggleSort("points")} className="inline-flex items-center gap-1 hover:text-white">
                      Points {sortBy === "points" && (direction === "desc" ? <ChevronDown size={13} /> : <ChevronUp size={13} />)}
                    </button>
                  </th>
                  <th className="px-5 py-4 font-bold">
                    <button type="button" onClick={() => toggleSort("wins")} className="inline-flex items-center gap-1 hover:text-white">
                      Wins {sortBy === "wins" && (direction === "desc" ? <ChevronDown size={13} /> : <ChevronUp size={13} />)}
                    </button>
                  </th>
                  <th className="px-5 py-4 text-right font-bold">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {players.map((player, index) => (
                  <tr key={player.id} className="transition hover:bg-white/[0.025]">
                    <td className="px-5 py-4">
                      <span className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black ${
                        index === 0 ? "bg-yellow-300/10 text-yellow-200" : index === 1 ? "bg-gray-300/10 text-gray-200" : index === 2 ? "bg-orange-400/10 text-orange-300" : "bg-white/[0.04] text-gray-400"
                      }`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-black"
                          style={{ color: player.color, borderColor: `${player.color}40`, backgroundColor: `${player.color}12` }}>
                          {player.name.slice(0, 1)}
                        </div>
                        <div>
                          <p className="font-bold text-white">{player.name}</p>
                          <p className="mt-1 text-[10px] font-bold tracking-wider text-gray-600">{player.tag}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-300">{player.level}</td>
                    <td className="px-5 py-4 text-sm font-black text-cyan-200">{player.points.toLocaleString()}</td>
                    <td className="px-5 py-4 text-sm text-gray-300">{player.wins}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedPlayer(player)}
                        className="rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-gray-300 transition hover:border-purple-400/30 hover:text-white"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {players.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-500">
                      No players match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-5 rounded-2xl border border-purple-400/20 bg-gradient-to-r from-purple-950/40 to-[#0B131D] p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-xs font-black tracking-[0.18em] text-cyan-300">YOUR TURN</p>
            <h2 className="mt-2 text-2xl font-black">Ready to join the rankings?</h2>
            <p className="mt-2 text-sm text-gray-400">Create an account and explore the games catalogue.</p>
          </div>
          <Link to="/register" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3.5 text-sm font-bold transition hover:bg-purple-500">
            Join ZORO GAMES <ArrowRight size={17} />
          </Link>
        </div>
      </main>

      <footer className="border-t border-white/[0.08] bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Link to="/" className="font-black tracking-[0.15em] text-white">
            ZORO <span className="text-purple-400">GAMES</span>
          </Link>
          <div className="flex flex-wrap gap-5">
            <Link to="/about" className="transition hover:text-white">About</Link>
            <Link to="/terms" className="transition hover:text-white">Terms</Link>
            <Link to="/privacy-policy" className="transition hover:text-white">Privacy</Link>
            <Link to="/support" className="transition hover:text-white">Support</Link>
          </div>
          <p>© {new Date().getFullYear()} ZORO GAMES</p>
        </div>
      </footer>

      {selectedPlayer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="player-profile-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedPlayer(null);
          }}
        >
          <div className="zoro-leader-glass w-full max-w-md rounded-3xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold tracking-[0.18em] text-purple-300">PLAYER CARD</p>
                <h2 id="player-profile-title" className="mt-2 text-2xl font-black">{selectedPlayer.name}</h2>
              </div>
              <button type="button" onClick={() => setSelectedPlayer(null)} aria-label="Close player profile" className="rounded-xl border border-white/10 p-2 text-gray-400 hover:text-white">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/[0.07] bg-black/20 p-3 text-center">
                <Medal size={19} className="mx-auto text-yellow-200" />
                <p className="mt-2 text-lg font-black">{selectedPlayer.id}</p>
                <p className="text-[10px] text-gray-500">Sample Rank</p>
              </div>
              <div className="rounded-xl border border-white/[0.07] bg-black/20 p-3 text-center">
                <Zap size={19} className="mx-auto text-cyan-300" />
                <p className="mt-2 text-lg font-black">{selectedPlayer.level}</p>
                <p className="text-[10px] text-gray-500">Level</p>
              </div>
              <div className="rounded-xl border border-white/[0.07] bg-black/20 p-3 text-center">
                <Swords size={19} className="mx-auto text-purple-300" />
                <p className="mt-2 text-lg font-black">{selectedPlayer.wins}</p>
                <p className="text-[10px] text-gray-500">Wins</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-gray-400">
              These are example leaderboard entries. Connect the backend to display real player profiles and rankings.
            </p>
            <button type="button" onClick={() => setSelectedPlayer(null)} className="mt-5 w-full rounded-xl bg-purple-600 px-4 py-3 font-bold transition hover:bg-purple-500">
              Close Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
