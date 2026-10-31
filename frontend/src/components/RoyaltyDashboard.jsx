import React, { useEffect, useState } from "react";
import {
  Crown,
  CalendarCheck,
  RefreshCw,
  Wallet,
  TrendingUp,
  AlertCircle,
  Loader2,
} from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

// Connect this URL to the backend royalty summary endpoint when adding the page.
const ROYALTY_SUMMARY_ENDPOINT = "/royalty-pool/summary";

const formatAmount = (value) => {
  const amount = Number(value);
  return (Number.isFinite(amount) ? amount : 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const AmountCard = ({ title, amount, subtitle, icon: Icon, tone }) => {
  const tones = {
    violet: {
      card: "border-violet-400/20 from-[#211536] via-[#171126] to-[#100d1b]",
      icon: "border-violet-300/20 bg-violet-300/10 text-violet-200",
      label: "text-violet-200",
      glow: "bg-violet-500/10",
    },
    emerald: {
      card: "border-emerald-400/20 from-[#102820] via-[#10201d] to-[#0c1518]",
      icon: "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
      label: "text-emerald-200",
      glow: "bg-emerald-500/10",
    },
  };
  const style = tones[tone];

  return (
    <article
      className={`relative min-w-0 overflow-hidden rounded-[24px] border bg-gradient-to-br p-5 shadow-[0_18px_55px_rgba(0,0,0,0.22)] sm:p-7 ${style.card}`}
    >
      <div className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl ${style.glow}`} />
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className={`text-[10px] font-extrabold uppercase tracking-[0.2em] ${style.label}`}>
            {title}
          </p>
          <p className="mt-4 break-all text-3xl font-black tracking-tight text-white sm:text-4xl">
            ${formatAmount(amount)}
          </p>
          <p className="mt-2 text-xs leading-5 text-slate-400">{subtitle}</p>
        </div>
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${style.icon}`}>
          <Icon size={23} />
        </div>
      </div>
    </article>
  );
};

const RoyaltyDashboard = () => {
  const { token } = useAuth();
  const [summary, setSummary] = useState({
    totalCollected: 0,
    todayDistributed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchRoyaltySummary = async (isRefresh = false) => {
    if (!token) {
      setLoading(false);
      setError("Please sign in to view royalty information.");
      return;
    }

    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    setError("");
    try {
      const response = await api.get(ROYALTY_SUMMARY_ENDPOINT, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Expected response:
      // { success: true, data: { totalCollected: 123, todayDistributed: 45 } }
      const data = response.data?.data || response.data || {};
      setSummary({
        totalCollected: Number(data.totalCollected) || 0,
        todayDistributed:
          Number(data.todayDistributed ?? data.todayDistributedAmount) || 0,
      });
    } catch (err) {
      console.error("Failed to fetch royalty summary:", err);
      setError(
        err.response?.data?.message ||
          "Royalty summary could not be loaded. Check the backend API endpoint."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRoyaltySummary();
    // Fetch again when the authenticated user/token changes.
  }, [token]);

  return (
    <main className="relative mx-auto min-h-[320px] w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#090811] p-4 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-7">
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-violet-600/[0.09] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-emerald-500/[0.07] blur-3xl" />

      <header className="relative flex flex-col gap-4 border-b border-white/[0.07] pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/[0.08] text-amber-200">
            <Crown size={24} />
          </div>
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[0.24em] text-amber-200">
              WORLD TOGETHER
            </p>
            <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
              Royalty Overview
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              System royalty collection and daily distribution.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fetchRoyaltySummary(true)}
          disabled={loading || refreshing}
          className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </header>

      <section className="relative mt-6">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp size={15} className="text-slate-400" />
          <h2 className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-300">
            Royalty statistics
          </h2>
        </div>

        {loading ? (
          <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.02]">
            <Loader2 size={26} className="animate-spin text-violet-300" />
            <p className="mt-3 text-xs font-semibold text-slate-400">
              Loading royalty data...
            </p>
          </div>
        ) : error ? (
          <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-400/[0.04] px-4 text-center">
            <AlertCircle size={24} className="text-rose-300" />
            <p className="mt-3 text-sm font-bold text-rose-200">
              Unable to load royalty data
            </p>
            <p className="mt-1 max-w-lg text-xs leading-5 text-slate-400">
              {error}
            </p>
            <button
              type="button"
              onClick={() => fetchRoyaltySummary(true)}
              className="mt-4 rounded-lg border border-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/[0.06]"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AmountCard
              title="Total Royalty Amount"
              amount={summary.totalCollected}
              subtitle="Total royalty contribution collected by the system."
              icon={Wallet}
              tone="violet"
            />
            <AmountCard
              title="Today's Distributed Amount"
              amount={summary.todayDistributed}
              subtitle="Total successful royalty payouts distributed today."
              icon={CalendarCheck}
              tone="emerald"
            />
          </div>
        )}
      </section>

      <footer className="relative mt-5 flex items-start gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
        <CalendarCheck size={14} className="mt-0.5 shrink-0 text-slate-500" />
        <p className="text-[10px] leading-5 text-slate-500">
          Today's distributed amount must be calculated from successful royalty
          distribution records for the current day by the backend. It cannot be
          derived accurately from the pool model's last distribution date alone.
        </p>
      </footer>
    </main>
  );
};

export default RoyaltyDashboard;
