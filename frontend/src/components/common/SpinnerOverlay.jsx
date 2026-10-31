
import React from "react";
import { Sparkles } from "lucide-react";

const SpinnerOverlay = () => {
  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden bg-[#070b14]/90 backdrop-blur-md"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <style>{`
        @keyframes zoro-ring {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes zoro-ring-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes zoro-glow {
          0%, 100% {
            opacity: .55;
            transform: scale(.94);
          }
          50% {
            opacity: 1;
            transform: scale(1.06);
          }
        }

        @keyframes zoro-loading-dots {
          0%, 80%, 100% { opacity: .25; }
          40% { opacity: 1; }
        }

        @keyframes zoro-enter {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .zoro-ring-one {
          animation: zoro-ring 1.8s linear infinite;
        }

        .zoro-ring-two {
          animation: zoro-ring-reverse 2.5s linear infinite;
        }

        .zoro-core {
          animation: zoro-glow 1.5s ease-in-out infinite;
        }

        .zoro-loading-content {
          animation: zoro-enter .45s ease-out both;
        }

        .zoro-dot {
          animation: zoro-loading-dots 1.2s ease-in-out infinite;
        }

        .zoro-dot:nth-child(2) { animation-delay: .2s; }
        .zoro-dot:nth-child(3) { animation-delay: .4s; }

        @media (prefers-reduced-motion: reduce) {
          .zoro-ring-one,
          .zoro-ring-two,
          .zoro-core,
          .zoro-loading-content,
          .zoro-dot {
            animation: none !important;
          }
        }
      `}</style>

      {/* Background ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.10] blur-[90px]" />

      <div className="zoro-loading-content relative flex flex-col items-center">
        {/* Animated spinner */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          {/* Outer ring */}
          <div className="zoro-ring-one absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-300 border-r-violet-500 shadow-[0_0_18px_rgba(34,211,238,0.12)]" />

          {/* Middle ring */}
          <div className="zoro-ring-two absolute inset-[9px] rounded-full border-2 border-transparent border-b-cyan-400 border-l-violet-400 opacity-80" />

          {/* Inner ring */}
          <div className="absolute inset-[19px] rounded-full border border-cyan-300/20 bg-gradient-to-br from-violet-500/15 to-cyan-400/10" />

          {/* Center icon */}
          <div className="zoro-core relative flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/25 bg-[#0c1425] text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.18)]">
            <Sparkles size={22} strokeWidth={1.8} />
          </div>
        </div>

        {/* Branding */}
        <div className="mt-7 text-center">
          <h2 className="text-base font-black tracking-[0.18em] text-white">
            ZORO <span className="text-cyan-300">GAMES AI</span>
          </h2>

          <div className="mt-3 flex items-center justify-center gap-1.5">
            <span className="h-px w-7 bg-gradient-to-r from-transparent to-violet-400/70" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
              Initializing
            </p>
            <span className="h-px w-7 bg-gradient-to-l from-transparent to-cyan-400/70" />
          </div>

          {/* Animated dots */}
          <div className="mt-4 flex items-center justify-center gap-1.5">
            <span className="zoro-dot h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span className="zoro-dot h-1.5 w-1.5 rounded-full bg-cyan-300" />
            <span className="zoro-dot h-1.5 w-1.5 rounded-full bg-violet-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinnerOverlay;
