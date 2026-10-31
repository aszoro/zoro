
import React, { useState, useEffect } from "react";
import { Copy, Check, Link2, Sparkles } from "lucide-react";

const ReferralLinkBox = ({ link }) => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  useEffect(() => {
    if (!copied && !copyError) return;

    const timer = window.setTimeout(() => {
      setCopied(false);
      setCopyError(false);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [copied, copyError]);

  const handleCopy = async () => {
    if (!link) {
      setCopyError(true);
      setCopied(false);
      return;
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(String(link));
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = String(link);
        textArea.setAttribute("readonly", "");
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();

        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (!successful) throw new Error("Copy failed");
      }

      setCopied(true);
      setCopyError(false);
    } catch (error) {
      console.error("Unable to copy referral link:", error);
      setCopyError(true);
      setCopied(false);
    }
  };

  return (
    <section className="relative mb-6 w-full overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b1020] shadow-[0_15px_45px_rgba(0,0,0,0.22)]">
      <style>{`
        @keyframes referralGlow {
          0%, 100% { opacity: .35; }
          50% { opacity: .75; }
        }

        @keyframes referralToast {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .referral-glow {
          animation: referralGlow 3s ease-in-out infinite;
        }

        .referral-toast {
          animation: referralToast .2s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .referral-glow,
          .referral-toast {
            animation: none !important;
          }
        }
      `}</style>

      {/* Decorative ambient glow */}
      <div className="referral-glow pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-violet-600/15 blur-[65px]" />
      <div className="pointer-events-none absolute -bottom-16 left-1/3 h-32 w-40 rounded-full bg-cyan-500/[0.08] blur-[55px]" />

      {/* Header */}
      <div className="relative flex items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-gradient-to-br from-violet-500/20 to-cyan-400/10 text-cyan-300">
            <Link2 size={20} />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-black uppercase tracking-[0.12em] text-white sm:text-base">
              Referral <span className="text-cyan-300">Link</span>
            </h3>
            <p className="mt-1 text-[10px] font-medium tracking-wide text-slate-500 sm:text-xs">
              Share your personal invitation
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-1.5 rounded-full border border-violet-400/15 bg-violet-500/[0.07] px-3 py-1.5 sm:flex">
          <Sparkles size={12} className="text-violet-300" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-violet-200">
            Invite & Connect
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="relative p-4 sm:p-5">
        <label
          htmlFor="zoro-referral-link"
          className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400"
        >
          Your referral URL
        </label>

        <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:gap-0">
          <input
            id="zoro-referral-link"
            type="text"
            readOnly
            value={link || ""}
            placeholder="Referral link unavailable"
            onFocus={(event) => event.target.select()}
            className="min-w-0 flex-1 rounded-xl border border-white/[0.09] bg-[#070b14]/80 px-3.5 py-3 font-mono text-xs text-cyan-200 outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10 sm:rounded-r-none sm:text-sm"
          />

          <button
            type="button"
            onClick={handleCopy}
            disabled={!link}
            className={`inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-xl px-5 text-xs font-extrabold tracking-wide transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 sm:rounded-l-none ${
              copied
                ? "border border-emerald-300/20 bg-emerald-400/15 text-emerald-300"
                : "border border-cyan-300/20 bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.12)] hover:brightness-110 active:scale-[0.98]"
            }`}
          >
            {copied ? (
              <>
                <Check size={17} strokeWidth={2.5} />
                Copied
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy Link
              </>
            )}
          </button>
        </div>

        {/* Copy feedback */}
        {copied && (
          <p
            role="status"
            className="referral-toast mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-300"
          >
            <Check size={14} />
            Referral link copied successfully.
          </p>
        )}

        {copyError && (
          <p
            role="status"
            className="referral-toast mt-3 text-xs font-medium text-rose-300"
          >
            Unable to copy automatically. Select the link and copy it manually.
          </p>
        )}

        <p className="mt-3 text-[10px] leading-relaxed text-slate-500 sm:text-xs">
          Share this link with people you want to invite to your platform.
        </p>
      </div>
    </section>
  );
};

export default ReferralLinkBox;
