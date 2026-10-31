// // import React from "react";
// // import { 
// //   X, 
// //   Info, 
// //   CheckCircle2, 
// //   AlertCircle, 
// //   TriangleAlert,
// //   Calendar
// // } from "lucide-react";

// // const MessageModal = ({
// //   isOpen,
// //   onClose,
// //   title = "Message",
// //   message = "",
// //   type = "info",
// //   zIndex = 2000,
// // }) => {
// //   if (!isOpen) return null;

// //   // 🔥 PREMIUM FINANCE THEME CONFIG
// //   const theme = {
// //     success: {
// //       color: "text-emerald-400",
// //       bg: "bg-emerald-500/10",
// //       border: "border-emerald-500/20",
// //       icon: CheckCircle2,
// //       btn: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
// //     },
// //     error: {
// //       color: "text-rose-400",
// //       bg: "bg-rose-500/10",
// //       border: "border-rose-500/20",
// //       icon: AlertCircle,
// //       btn: "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20"
// //     },
// //     warning: {
// //       color: "text-amber-400",
// //       bg: "bg-amber-500/10",
// //       border: "border-amber-500/20",
// //       icon: TriangleAlert,
// //       btn: "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20"
// //     },
// //     info: {
// //       color: "text-blue-400",
// //       bg: "bg-blue-500/10",
// //       border: "border-blue-500/20",
// //       icon: Info,
// //       btn: "bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/20"
// //     },
// //   };

// //   const currentTheme = theme[type] || theme.info;
// //   const Icon = currentTheme.icon;

// //   // Get current date only (no time)
// //   const todayDate = new Date().toLocaleDateString('en-GB', {
// //     day: '2-digit',
// //     month: 'short',
// //     year: 'numeric'
// //   });

// //   return (
// //     <div
// //       className="fixed inset-0 bg-[#070b14]/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
// //       style={{ zIndex }}
// //     >
// //       {/* Premium Minimalist Modal Card */}
// //       <div className="bg-[#111827] rounded-2xl border border-gray-800 shadow-2xl w-full max-w-sm flex flex-col relative overflow-hidden">
        
// //         {/* Subtle Top Gradient Line */}
// //         <div className={`absolute top-0 left-0 right-0 h-1 ${currentTheme.btn} opacity-70`}></div>

// //         {/* Top Close Button */}
// //         <div className="absolute top-4 right-4 z-10">
// //            <button 
// //              onClick={onClose} 
// //              className="p-1.5 rounded-full bg-gray-800/50 hover:bg-gray-700 transition-all text-gray-400 hover:text-white"
// //            >
// //               <X size={16} strokeWidth={2.5} />
// //            </button>
// //         </div>

// //         {/* Content Area */}
// //         <div className="flex flex-col items-center pt-10 pb-4 px-6 relative z-10">
          
// //           {/* Elegant Icon Box */}
// //           <div className={`p-4 rounded-2xl ${currentTheme.bg} border ${currentTheme.border} mb-5 shadow-inner`}>
// //             <Icon size={32} className={currentTheme.color} strokeWidth={2.5} />
// //           </div>

// //           {/* Title */}
// //           <h2 className="text-xl font-bold text-white mb-2 text-center tracking-wide">
// //             {title}
// //           </h2>

// //           {/* Message Area */}
// //           <div className="max-h-32 overflow-y-auto w-full text-center px-2 custom-scroll">
// //             <p className="text-sm text-gray-400 leading-relaxed font-medium">
// //               {message}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Footer Area with Button & Date */}
// //         <div className="px-6 pb-6 pt-3 flex flex-col gap-4">
// //           <button
// //             onClick={onClose}
// //             className={`w-full py-3.5 rounded-xl font-bold tracking-wide text-sm transition-all duration-200 active:scale-95 shadow-lg ${currentTheme.btn}`}
// //           >
// //             Got It
// //           </button>
          
// //           {/* Footer Date Section */}
// //           <div className="flex items-center justify-center gap-1.5 text-gray-500">
// //             <Calendar size={13} />
// //             <span className="text-xs font-medium tracking-wider uppercase">{todayDate}</span>
// //           </div>
// //         </div>
// //       </div>

// //       <style>{`
// //         /* Minimalist Scrollbar for Dark Mode */
// //         .custom-scroll { scrollbar-width: thin; scrollbar-color: #374151 transparent; }
// //         .custom-scroll::-webkit-scrollbar { width: 3px; }
// //         .custom-scroll::-webkit-scrollbar-track { background: transparent; }
// //         .custom-scroll::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; }
// //         .custom-scroll::-webkit-scrollbar-thumb:hover { background: #4b5563; }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default MessageModal;


// import React from "react";
// import {
//   X,
//   Info,
//   CheckCircle2,
//   AlertCircle,
//   TriangleAlert,
//   CalendarDays,
//   Sparkles,
// } from "lucide-react";

// const THEMES = {
//   success: {
//     label: "Success",
//     color: "text-emerald-300",
//     iconBg: "bg-emerald-400/10",
//     border: "border-emerald-400/25",
//     glow: "bg-emerald-500/20",
//     button: "from-emerald-500 to-teal-400 text-[#04120e]",
//     Icon: CheckCircle2,
//   },
//   error: {
//     label: "Error",
//     color: "text-rose-300",
//     iconBg: "bg-rose-400/10",
//     border: "border-rose-400/25",
//     glow: "bg-rose-500/20",
//     button: "from-rose-500 to-pink-500 text-white",
//     Icon: AlertCircle,
//   },
//   warning: {
//     label: "Warning",
//     color: "text-amber-300",
//     iconBg: "bg-amber-400/10",
//     border: "border-amber-400/25",
//     glow: "bg-amber-500/20",
//     button: "from-amber-400 to-orange-500 text-[#1b1002]",
//     Icon: TriangleAlert,
//   },
//   info: {
//     label: "Information",
//     color: "text-cyan-300",
//     iconBg: "bg-cyan-400/10",
//     border: "border-cyan-400/25",
//     glow: "bg-cyan-500/20",
//     button: "from-violet-600 to-cyan-500 text-white",
//     Icon: Info,
//   },
// };

// const MessageModal = ({
//   isOpen,
//   onClose,
//   title = "Message",
//   message = "",
//   type = "info",
//   zIndex = 2000,
// }) => {
//   if (!isOpen) return null;

//   const current = THEMES[type] || THEMES.info;
//   const Icon = current.Icon;
//   const today = new Date().toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-[#03030b]/85 p-4 backdrop-blur-md animate-in fade-in duration-200"
//       style={{ zIndex }}
//       onMouseDown={(event) => {
//         if (event.target === event.currentTarget) onClose?.();
//       }}
//     >
//       <section
//         role="alertdialog"
//         aria-modal="true"
//         aria-labelledby="message-modal-title"
//         className={`relative w-full max-w-sm overflow-hidden rounded-[26px] border bg-[#0c0b18] shadow-[0_25px_90px_rgba(0,0,0,0.65)] ${current.border}`}
//       >
//         <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${current.button}`} />
//         <div className={`pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full blur-3xl ${current.glow}`} />

//         <button
//           type="button"
//           onClick={onClose}
//           aria-label="Close message"
//           className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition hover:bg-white/10 hover:text-white"
//         >
//           <X size={17} />
//         </button>

//         <div className="relative flex flex-col items-center px-6 pb-5 pt-9 text-center">
//           <div className={`mb-4 flex h-[68px] w-[68px] items-center justify-center rounded-2xl border ${current.border} ${current.iconBg} shadow-inner`}>
//             <Icon size={32} strokeWidth={2.2} className={current.color} />
//           </div>

//           <span className={`mb-2 inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.24em] ${current.color}`}>
//             <Sparkles size={12} />
//             {current.label}
//           </span>

//           <h2 id="message-modal-title" className="max-w-full break-words text-xl font-black tracking-tight text-white">
//             {title}
//           </h2>

//           <div className="custom-message-scroll mt-3 max-h-40 w-full overflow-y-auto px-1">
//             <p className="whitespace-pre-line break-words text-sm font-medium leading-6 text-slate-300">
//               {message}
//             </p>
//           </div>
//         </div>

//         <div className="px-6 pb-6">
//           <button
//             type="button"
//             onClick={onClose}
//             className={`w-full rounded-xl bg-gradient-to-r px-4 py-3.5 text-sm font-black tracking-wide shadow-lg transition hover:brightness-110 active:scale-[0.98] ${current.button}`}
//           >
//             Got It
//           </button>

//           <div className="mt-4 flex items-center justify-center gap-1.5 text-slate-500">
//             <CalendarDays size={13} />
//             <span className="text-[10px] font-bold uppercase tracking-[0.16em]">{today}</span>
//           </div>
//         </div>
//       </section>

//       <style>{`
//         .custom-message-scroll { scrollbar-width: thin; scrollbar-color: #374151 transparent; }
//         .custom-message-scroll::-webkit-scrollbar { width: 3px; }
//         .custom-message-scroll::-webkit-scrollbar-track { background: transparent; }
//         .custom-message-scroll::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; }
//       `}</style>
//     </div>
//   );
// };

// export default MessageModal;



import React from "react";
import {
  X,
  Info,
  CheckCircle2,
  AlertCircle,
  TriangleAlert,
  Calendar,
  Sparkles,
} from "lucide-react";

const MessageModal = ({
  isOpen,
  onClose,
  title = "Message",
  message = "",
  type = "info",
  zIndex = 2000,
}) => {
  if (!isOpen) return null;

  const themes = {
    success: {
      icon: CheckCircle2,
      accent: "text-emerald-300",
      iconBox: "border-emerald-300/25 bg-emerald-400/10",
      glow: "bg-emerald-500/20",
      label: "SUCCESS",
      ring: "border-emerald-300/30",
      button:
        "border-emerald-300/25 from-emerald-600 to-teal-500 shadow-emerald-500/20",
      line: "from-emerald-400 via-teal-300 to-cyan-300",
      panel: "border-emerald-300/15 from-emerald-500/[0.08] to-teal-500/[0.03]",
    },
    error: {
      icon: AlertCircle,
      accent: "text-rose-300",
      iconBox: "border-rose-300/25 bg-rose-400/10",
      glow: "bg-rose-500/20",
      label: "ACTION NEEDED",
      ring: "border-rose-300/30",
      button:
        "border-rose-300/25 from-rose-600 to-pink-500 shadow-rose-500/20",
      line: "from-rose-400 via-pink-400 to-fuchsia-400",
      panel: "border-rose-300/15 from-rose-500/[0.08] to-pink-500/[0.03]",
    },
    warning: {
      icon: TriangleAlert,
      accent: "text-amber-300",
      iconBox: "border-amber-300/25 bg-amber-400/10",
      glow: "bg-amber-500/15",
      label: "PLEASE NOTE",
      ring: "border-amber-300/30",
      button:
        "border-amber-300/25 from-amber-500 to-orange-500 shadow-amber-500/20",
      line: "from-amber-300 via-orange-400 to-pink-400",
      panel: "border-amber-300/15 from-amber-500/[0.08] to-orange-500/[0.03]",
    },
    info: {
      icon: Info,
      accent: "text-cyan-300",
      iconBox: "border-cyan-300/25 bg-cyan-400/10",
      glow: "bg-cyan-500/15",
      label: "INFORMATION",
      ring: "border-cyan-300/30",
      button:
        "border-fuchsia-300/25 from-violet-600 via-fuchsia-600 to-cyan-500 shadow-fuchsia-500/20",
      line: "from-violet-500 via-fuchsia-500 to-cyan-400",
      panel: "border-fuchsia-300/15 from-fuchsia-500/[0.07] to-cyan-500/[0.04]",
    },
  };

  const currentTheme = themes[type] || themes.info;
  const Icon = currentTheme.icon;

  const todayDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-[#05040b]/85 p-4 backdrop-blur-xl animate-in fade-in duration-200"
      style={{ zIndex }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="message-modal-title"
        className="relative my-auto w-full max-w-sm overflow-hidden rounded-[28px] border border-fuchsia-400/20 bg-[#0b0a14] shadow-[0_25px_90px_rgba(0,0,0,0.65),0_0_45px_rgba(168,85,247,0.12)] animate-in zoom-in-95 slide-in-from-bottom-3 duration-300"
      >
        {/* Animated ZORO gradient bar */}
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${currentTheme.line} animate-gradient-flow`} />

        {/* Ambient glow */}
        <div
          className={`pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full blur-[75px] ${currentTheme.glow}`}
        />
        <div className="pointer-events-none absolute -right-20 top-24 h-48 w-48 rounded-full bg-fuchsia-600/10 blur-[75px]" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close message"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-fuchsia-400/30 hover:bg-fuchsia-500/10 hover:text-white"
        >
          <X size={17} />
        </button>

        {/* Icon and title */}
        <div className="relative flex flex-col items-center px-6 pb-5 pt-9 text-center">
          <div className="relative flex h-[82px] w-[82px] items-center justify-center">
            <div className={`absolute inset-0 rounded-full border ${currentTheme.ring} animate-message-pulse`} />
            <div className={`absolute inset-2 rounded-full border ${currentTheme.ring} opacity-70`} />
            <div
              className={`relative flex h-[58px] w-[58px] items-center justify-center rounded-2xl border shadow-[0_0_28px_rgba(168,85,247,0.12)] ${currentTheme.iconBox}`}
            >
              <Icon size={29} strokeWidth={2.4} className={currentTheme.accent} />
            </div>
            <Sparkles size={14} className={`absolute -right-1 top-2 ${currentTheme.accent} animate-twinkle`} />
            <Sparkles size={12} className="absolute -left-1 bottom-3 text-fuchsia-300 animate-twinkle-delayed" />
          </div>

          <p className="mt-4 text-[9px] font-black uppercase tracking-[0.3em] text-cyan-300">
            ZORO FINANCE
          </p>

          <h2
            id="message-modal-title"
            className="mt-2 text-xl font-black tracking-wide text-white"
          >
            {title}
          </h2>

          <span className={`mt-2 text-[9px] font-black uppercase tracking-[0.22em] ${currentTheme.accent}`}>
            {currentTheme.label}
          </span>
        </div>

        {/* Message panel */}
        <div className="relative px-5 pb-5 sm:px-6">
          <div className={`rounded-2xl border bg-gradient-to-br p-4 ${currentTheme.panel}`}>
            <div className="max-h-36 overflow-y-auto text-center custom-message-scroll">
              <p className="whitespace-pre-line break-words text-sm font-medium leading-relaxed text-slate-200">
                {message}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl border bg-gradient-to-r px-5 py-3.5 text-sm font-black tracking-wide text-white shadow-lg transition-all duration-200 hover:brightness-110 active:scale-[0.98] ${currentTheme.button}`}
          >
            Got It
            <CheckCircle2 size={17} />
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-slate-500">
            <Calendar size={13} className={currentTheme.accent} />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
              {todayDate}
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
              ZORO SYSTEM
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes message-pulse {
          0%, 100% { transform: scale(1); opacity: .85; }
          50% { transform: scale(1.08); opacity: .4; }
        }
        @keyframes twinkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: .6; }
          50% { transform: scale(1.25) rotate(12deg); opacity: 1; }
        }
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-message-pulse { animation: message-pulse 2.2s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 1.8s ease-in-out infinite; }
        .animate-twinkle-delayed { animation: twinkle 2.1s ease-in-out .4s infinite; }
        .animate-gradient-flow { background-size: 200% 200%; animation: gradient-flow 3s linear infinite; }
        .custom-message-scroll { scrollbar-width: thin; scrollbar-color: #4b3a60 transparent; }
        .custom-message-scroll::-webkit-scrollbar { width: 3px; }
        .custom-message-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-message-scroll::-webkit-scrollbar-thumb { background: #4b3a60; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default MessageModal;
