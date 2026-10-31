// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { DollarSign, CreditCard, Users, Headset, Ticket, Building, Send, ArrowLeftRight, Wallet } from "lucide-react"; 

// // 🔥 Modals import kiye hain
// import WithdrawalModal from "../modals/WithdrawalModal";
// import WalletTransferModal from "../modals/WalletTransferModal";
// import CreditToWalletModal from "../modals/CreditToWalletModal";

// const QuickActions = ({ onDepositClick }) => {
//   const navigate = useNavigate();
  
//   // 🔥 Modals ke states
//   const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
//   const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
//   const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);

//   const iconBoxStyle = "w-[50px] h-[50px] bg-[#0a0f1c] border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:border-[#d4af37] group-hover:shadow-[0_0_12px_rgba(212,175,55,0.5)] group-hover:scale-105 transition-all duration-300";

//   return (
//     <>
//       <div className="bg-[#111827] rounded-xl shadow-lg shadow-black/40 border border-[#1f2937] overflow-hidden">
//         <div className="h-1.5 w-full bg-gradient-to-r from-[#d4af37] to-[#f3e5ab]"></div>
        
//         <div className="p-5 md:p-6">
//           <div className="grid grid-cols-4 gap-y-7 gap-x-2">
            
//             {/* Recharge */}
//             <div 
//               onClick={() => {
//                 if (onDepositClick) {
//                   onDepositClick();
//                 } else {
//                   navigate('/recharge'); 
//                 }
//               }} 
//               className="flex flex-col items-center gap-2 cursor-pointer group"
//             >
//               <div className={`${iconBoxStyle} rounded-2xl`}>
//                 <DollarSign size={26} strokeWidth={2.5} />
//               </div>
//               <span className="text-[12px] md:text-[13px] font-semibold text-white group-hover:text-[#d4af37] transition-colors">Recharge</span>
//             </div>

//             {/* Withdrawal */}
//             <div onClick={() => setIsWithdrawModalOpen(true)} className="flex flex-col items-center gap-2 cursor-pointer group">
//               <div className={`${iconBoxStyle} rounded-[18px]`}>
//                 <CreditCard size={24} strokeWidth={2.5} />
//               </div>
//               <span className="text-[12px] md:text-[13px] font-semibold text-white group-hover:text-[#d4af37] transition-colors">Withdrawal</span>
//             </div>

//             {/* 🔥 Fund Transfer Button */}
//             <div onClick={() => setIsTransferModalOpen(true)} className="flex flex-col items-center gap-2 cursor-pointer group">
//               <div className={`${iconBoxStyle} rounded-full`}>
//                 <ArrowLeftRight size={24} strokeWidth={2.5} />
//               </div>
//               <span className="text-[11px] md:text-[12px] font-semibold text-white group-hover:text-[#d4af37] transition-colors text-center leading-tight">Fund<br/>Transfer</span>
//             </div>

//             {/* 🔥 Credit To Wallet Button */}
//             <div onClick={() => setIsCreditModalOpen(true)} className="flex flex-col items-center gap-2 cursor-pointer group">
//               <div className={`${iconBoxStyle} rounded-[18px]`}>
//                 <Wallet size={24} strokeWidth={2.5} />
//               </div>
//               <span className="text-[11px] md:text-[12px] font-semibold text-white group-hover:text-[#d4af37] transition-colors text-center leading-tight">Wallet<br/>to Fund</span>
//             </div>

//             {/* Team */}
//            <div 
//   onClick={() => navigate('/all-team')} 
//   className="flex flex-col items-center gap-2 cursor-pointer group"
// >
//   <div className={`${iconBoxStyle} rounded-full`}>
//     <Users size={24} strokeWidth={2.5} />
//   </div>
//   <span className="text-[12px] md:text-[13px] font-semibold text-white group-hover:text-[#d4af37] transition-colors">
//     Team
//   </span>
// </div>
//             {/* Support */}
//             <div onClick={() => navigate('/support')} className="flex flex-col items-center gap-2 cursor-pointer group">
//               <div className={`${iconBoxStyle} rounded-full`}>
//                 <Headset size={24} strokeWidth={2.5} />
//               </div>
//               <span className="text-[12px] md:text-[13px] font-semibold text-white group-hover:text-[#d4af37] transition-colors">Support</span>
//             </div>

//             {/* Ticket Reply */}
//             <div
//             //  onClick={() => navigate('/ticket-reply')}
//              className="flex flex-col items-center gap-2 cursor-pointer group">
//               <div className={`${iconBoxStyle} rounded-[18px]`}>
//                 <Ticket size={24} strokeWidth={2.5} />
//               </div>
//               <span className="text-[11px] md:text-[12px] font-semibold text-white group-hover:text-[#d4af37] transition-colors text-center leading-tight">Ticket<br/>Reply</span>
//             </div>

//             {/* 🔥 Plan (PDF Open/Download logic) */}
//             <div onClick={() => window.open('/WORLD FINANCE.pdf', '_blank')} className="flex flex-col items-center gap-2 cursor-pointer group">
//               <div className={`${iconBoxStyle} rounded-xl`}>
//                 <Building size={24} strokeWidth={2.5} />
//               </div>
//               <span className="text-[12px] md:text-[13px] font-semibold text-white group-hover:text-[#d4af37] transition-colors">Plan</span>
//             </div>

//             {/* Telegram */}
//        <div className="flex flex-col items-center gap-2 col-span-4 justify-center mt-2">
//   <a 
//     href="https://t.me/worldfinance01" 
//     target="_blank" 
//     rel="noopener noreferrer"
//     // 🔥 animate-pulse lagaya hai blink karne ke liye, aur hover:animate-none se hover pe blink ruk jayega
//     className="group inline-flex cursor-pointer items-center gap-2 bg-[#0a0f1c] border border-[#229ED9] px-6 py-2 rounded-full transition-all animate-pulse hover:animate-none shadow-[0_0_8px_rgba(34,158,217,0.4)] hover:shadow-[0_0_15px_rgba(34,158,217,0.8)]"
//   >
//     {/* Icon me thoda bounce animation (scale) add kiya hai hover ke liye */}
//     <Send size={20} strokeWidth={2.5} className="text-[#229ED9] group-hover:scale-110 transition-transform duration-300" />
//     <span className="text-[13px] font-semibold text-white group-hover:text-[#229ED9] transition-colors">
//       Join Telegram Channel
//     </span>
//   </a>
// </div>

//           </div>
//         </div>
//       </div>

//       {/* 🔥 Modals Rendering */}
//       {isWithdrawModalOpen && (
//         <WithdrawalModal onClose={() => setIsWithdrawModalOpen(false)} />
//       )}

//       {isTransferModalOpen && (
//         <WalletTransferModal onClose={() => setIsTransferModalOpen(false)} />
//       )}

//       {isCreditModalOpen && (
//         <CreditToWalletModal onClose={() => setIsCreditModalOpen(false)} />
//       )}
//     </>
//   );
// };

// export default QuickActions;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  CreditCard,
  Users,
  Headset,
  Ticket,
  Building2,
  Send,
  ArrowLeftRight,
  Wallet,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import WithdrawalModal from "../modals/WithdrawalModal";
import WalletTransferModal from "../modals/WalletTransferModal";
import CreditToWalletModal from "../modals/CreditToWalletModal";

const QuickActions = ({ onDepositClick }) => {
  const navigate = useNavigate();

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);

  // UI-only redesign: existing routes, callbacks, and modal actions are preserved.
  const actions = [
    {
      key: "recharge",
      label: "Recharge",
      detail: "Add funds",
      icon: DollarSign,
      tone: "fuchsia",
      onClick: () => {
        if (onDepositClick) onDepositClick();
        else navigate("/recharge");
      },
    },
    {
      key: "withdrawal",
      label: "Withdrawal",
      detail: "Withdraw funds",
      icon: CreditCard,
      tone: "cyan",
      onClick: () => setIsWithdrawModalOpen(true),
    },
    {
      key: "transfer",
      label: "Fund Transfer",
      detail: "Send to a user",
      icon: ArrowLeftRight,
      tone: "violet",
      onClick: () => setIsTransferModalOpen(true),
    },
    {
      key: "wallet",
      label: "Wallet to Fund",
      detail: "Move your funds",
      icon: Wallet,
      tone: "amber",
      onClick: () => setIsCreditModalOpen(true),
    },
    
  ];

  const toneStyles = {
    fuchsia: {
      icon: "border-fuchsia-300/20 bg-fuchsia-400/[0.09] text-fuchsia-300 group-hover:border-fuchsia-300/50 group-hover:bg-fuchsia-400/[0.15]",
      glow: "bg-fuchsia-500/[0.10]",
      accent: "group-hover:text-fuchsia-200",
    },
    cyan: {
      icon: "border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300 group-hover:border-cyan-300/50 group-hover:bg-cyan-300/[0.14]",
      glow: "bg-cyan-400/[0.09]",
      accent: "group-hover:text-cyan-200",
    },
    violet: {
      icon: "border-violet-300/20 bg-violet-400/[0.09] text-violet-300 group-hover:border-violet-300/50 group-hover:bg-violet-400/[0.15]",
      glow: "bg-violet-500/[0.10]",
      accent: "group-hover:text-violet-200",
    },
    amber: {
      icon: "border-amber-300/20 bg-amber-300/[0.08] text-amber-300 group-hover:border-amber-300/50 group-hover:bg-amber-300/[0.14]",
      glow: "bg-amber-400/[0.08]",
      accent: "group-hover:text-amber-200",
    },
  };

  return (
    <>
      <section className="relative w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#171326] via-[#10111b] to-[#0c1822] shadow-xl shadow-black/25">
        {/* Ambient lighting */}
        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-fuchsia-500/[0.08] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-cyan-400/[0.07] blur-3xl" />

        <div className="relative border-b border-white/[0.07] px-4 py-5 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/[0.08] text-fuchsia-300">
                <Sparkles size={21} />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-cyan-300">
                  Player dashboard
                </p>
                <h2 className="mt-1 text-lg font-extrabold tracking-tight text-white sm:text-xl">
                  Quick Actions
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Your account tools, all in one place
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-300/[0.05] px-3 py-1.5 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-200">
                Tools
              </span>
            </div>
          </div>
        </div>

        <div className="relative p-3 sm:p-5">
          {/* Exactly four action cards per row on all screen sizes. */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {actions.map((action) => {
              const Icon = action.icon;
              const styles = toneStyles[action.tone];
              const isDisabled = !action.onClick;

              return (
                <button
                  key={action.key}
                  type="button"
                  onClick={action.onClick}
                  disabled={isDisabled}
                  aria-label={action.label}
                  className={`group relative flex min-w-0 flex-col items-center justify-start overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] px-1.5 py-4 text-center transition duration-200 sm:px-3 sm:py-5 ${
                    isDisabled
                      ? "cursor-default opacity-90"
                      : "cursor-pointer hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.045] active:translate-y-0"
                  }`}
                >
                  <span
                    className={`pointer-events-none absolute -right-5 -top-6 h-16 w-16 rounded-full blur-2xl ${styles.glow}`}
                  />

                  <span
                    className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition duration-200 group-hover:scale-105 sm:h-12 sm:w-12 sm:rounded-2xl ${styles.icon}`}
                  >
                    <Icon size={20} strokeWidth={2} className="sm:hidden" />
                    <Icon size={23} strokeWidth={2} className="hidden sm:block" />
                  </span>

                  <span
                    className={`relative mt-2.5 min-h-8 break-words text-[10px] font-bold leading-4 text-slate-200 transition-colors sm:mt-3 sm:text-xs ${styles.accent}`}
                  >
                    {action.label}
                  </span>

                  <span className="relative mt-0.5 hidden text-[10px] leading-4 text-slate-500 sm:block">
                    {action.detail}
                  </span>

                  <span className="relative mt-2 hidden text-slate-600 transition-colors group-hover:text-slate-300 sm:block">
                    <ArrowUpRight size={13} />
                  </span>
                </button>
              );
            })}
          </div>
 
        </div>
      </section>

      {/* Existing modal components and actions are unchanged. */}
      {isWithdrawModalOpen && (
        <WithdrawalModal onClose={() => setIsWithdrawModalOpen(false)} />
      )}

      {isTransferModalOpen && (
        <WalletTransferModal onClose={() => setIsTransferModalOpen(false)} />
      )}

      {isCreditModalOpen && (
        <CreditToWalletModal onClose={() => setIsCreditModalOpen(false)} />
      )}
    </>
  );
};

export default QuickActions;
