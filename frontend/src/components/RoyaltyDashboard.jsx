
import React, { useEffect, useState } from "react";
import {
  Wallet,
  CalendarCheck,
  Crown,
  Loader2,
} from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const ROYALTY_SUMMARY_ENDPOINT = "/royalty-pool/summary";

const formatAmount = (value) => {
  const amount = Number(value);
  return (Number.isFinite(amount) ? amount : 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const AmountCard = ({ title, amount, icon: Icon, tone }) => {
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
      className={`relative min-w-0 overflow-hidden rounded-[24px] border bg-gradient-to-br p-5 shadow-lg sm:p-7 ${style.card}`}
    >
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl ${style.glow}`}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p
            className={`text-[10px] font-extrabold uppercase tracking-[0.2em] ${style.label}`}
          >
            {title}
          </p>

          <p className="mt-4 break-all text-3xl font-black tracking-tight text-white sm:text-4xl">
            ${formatAmount(amount)}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${style.icon}`}
        >
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

  useEffect(() => {
    let cancelled = false;

    const fetchRoyaltySummary = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(ROYALTY_SUMMARY_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (cancelled) return;

        const data = response.data?.data || response.data || {};

        setSummary({
          totalCollected: Number(data.totalCollected) || 0,
          todayDistributed:
            Number(
              data.todayDistributed ?? data.todayDistributedAmount
            ) || 0,
        });
      } catch (error) {
        console.error("Failed to fetch royalty summary:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    setLoading(true);
    fetchRoyaltySummary();

    return () => {
      cancelled = true;
    };
  }, [token]);

  if (loading) {
    return (
      <div className="flex min-h-32 items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-violet-300" />
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AmountCard
          title="Total Royalty Amount"
          amount={summary.totalCollected}
          icon={Wallet}
          tone="violet"
        />

        <AmountCard
          title="Today's Distributed Amount"
          amount={summary.todayDistributed}
          icon={CalendarCheck}
          tone="emerald"
        />
      </div>
    </section>
  );
};

export default RoyaltyDashboard;
