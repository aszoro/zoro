
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { Menu, LogOut, Sparkles, ChevronRight } from "lucide-react";

// const TopNav = ({ onHamburgerClick }) => {
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   const handleLogoClick = () => {
//     navigate("/dashboard");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#090912]/90 shadow-[0_8px_35px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
//       {/* Neon accent line */}
//       <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-fuchsia-500 to-cyan-300 opacity-80" />

//       <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
//         <div className="flex h-[68px] items-center justify-between gap-3 sm:h-[76px]">

//           {/* Brand */}
//           <button
//             type="button"
//             onClick={handleLogoClick}
//             aria-label="Go to Zoro Games AI dashboard"
//             className="group flex min-w-0 items-center gap-3 text-left outline-none"
//           >
//             <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-fuchsia-300/25 bg-gradient-to-br from-fuchsia-500/25 via-[#21132f] to-cyan-400/10 shadow-[0_0_22px_rgba(217,70,239,0.10)] transition duration-300 group-hover:border-fuchsia-300/60 group-hover:shadow-[0_0_28px_rgba(217,70,239,0.22)]">
//               <span className="relative z-10 text-2xl font-black italic tracking-tighter text-white">
//                 Z<span className="text-cyan-300">.</span>
//               </span>
//               <span className="absolute -bottom-4 -right-3 h-8 w-8 rounded-full bg-fuchsia-500/30 blur-md" />
//             </span>

//             <span className="min-w-0">
//               <span className="block whitespace-nowrap text-sm font-black uppercase leading-tight tracking-[0.09em] text-white sm:text-base sm:tracking-[0.13em]">
//                 ZORO <span className="text-fuchsia-400">GAMES AI</span>
//               </span>

//               <span className="mt-1 flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.22em] text-slate-500 sm:text-[9px]">
//                 <Sparkles size={10} className="text-cyan-300" />
//                 ENTER YOUR ARENA
//               </span>
//             </span>
//           </button>

//           {/* Actions */}
//           <div className="flex shrink-0 items-center gap-2 sm:gap-3">

//             {/* Logout */}
//             <button
//               type="button"
//               onClick={logout}
//               aria-label="Logout"
//               title="Logout"
//               className="group flex h-10 items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.035] px-3 text-slate-400 transition duration-200 hover:border-rose-400/30 hover:bg-rose-500/[0.08] hover:text-rose-300 active:scale-95 sm:h-11 sm:px-3.5"
//             >
//               <LogOut
//                 size={18}
//                 strokeWidth={2.2}
//                 className="transition-transform duration-200 group-hover:translate-x-0.5"
//               />
//               <span className="hidden text-[10px] font-bold uppercase tracking-[0.14em] sm:inline">
//                 Exit
//               </span>
//             </button>

//             {/* Menu */}
//             <button
//               type="button"
//               onClick={onHamburgerClick}
//               aria-label="Open navigation menu"
//               title="Open menu"
//               className="group relative flex h-10 items-center justify-center gap-2 overflow-hidden rounded-xl border border-fuchsia-400/25 bg-gradient-to-r from-fuchsia-500/15 to-violet-500/10 px-3 text-fuchsia-200 transition duration-200 hover:border-fuchsia-300/50 hover:from-fuchsia-500/25 hover:to-violet-500/20 active:scale-95 sm:h-11 sm:px-4"
//             >
//               <Menu
//                 size={22}
//                 strokeWidth={2.3}
//                 className="transition-transform duration-200 group-hover:rotate-3"
//               />

//               <span className="hidden text-[10px] font-extrabold uppercase tracking-[0.16em] sm:inline">
//                 Menu
//               </span>

//               <ChevronRight
//                 size={13}
//                 className="hidden text-cyan-300/80 transition-transform group-hover:translate-x-0.5 sm:block"
//               />
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default TopNav;




import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, LogOut, Sparkles, ChevronRight } from "lucide-react";

const TopNav = ({ onHamburgerClick }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogoClick = () => {
    navigate("/dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[80] border-b border-white/[0.08] bg-[#090912]/95 shadow-[0_8px_35px_rgba(0,0,0,0.28)] backdrop-blur-2xl">

      {/* Neon accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-fuchsia-500 to-cyan-300 opacity-80" />

      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex h-[68px] items-center justify-between gap-3 sm:h-[76px]">

          {/* Brand */}
          <button
            type="button"
            onClick={handleLogoClick}
            aria-label="Go to Zoro Games AI dashboard"
            className="group flex min-w-0 items-center gap-3 text-left outline-none"
          >
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-fuchsia-300/25 bg-gradient-to-br from-fuchsia-500/25 via-[#21132f] to-cyan-400/10 shadow-[0_0_22px_rgba(217,70,239,0.10)] transition duration-300 group-hover:border-fuchsia-300/60 group-hover:shadow-[0_0_28px_rgba(217,70,239,0.22)]">
              <span className="relative z-10 text-2xl font-black italic tracking-tighter text-white">
                Z<span className="text-cyan-300">.</span>
              </span>

              <span className="absolute -bottom-4 -right-3 h-8 w-8 rounded-full bg-fuchsia-500/30 blur-md" />
            </span>

            <span className="min-w-0">
              <span className="block whitespace-nowrap text-sm font-black uppercase leading-tight tracking-[0.09em] text-white sm:text-base sm:tracking-[0.13em]">
                ZORO <span className="text-fuchsia-400">GAMES AI</span>
              </span>

              <span className="mt-1 flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.22em] text-slate-500 sm:text-[9px]">
                <Sparkles size={10} className="text-cyan-300" />
                ENTER YOUR ARENA
              </span>
            </span>
          </button>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">

            {/* Logout */}
            <button
              type="button"
              onClick={logout}
              aria-label="Logout"
              title="Logout"
              className="group flex h-10 items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.035] px-3 text-slate-400 transition duration-200 hover:border-rose-400/30 hover:bg-rose-500/[0.08] hover:text-rose-300 active:scale-95 sm:h-11 sm:px-3.5"
            >
              <LogOut
                size={18}
                strokeWidth={2.2}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />

              <span className="hidden text-[10px] font-bold uppercase tracking-[0.14em] sm:inline">
                Exit
              </span>
            </button>

            {/* Menu */}
            <button
              type="button"
              onClick={onHamburgerClick}
              aria-label="Open navigation menu"
              title="Open menu"
              className="group relative flex h-10 items-center justify-center gap-2 overflow-hidden rounded-xl border border-fuchsia-400/25 bg-gradient-to-r from-fuchsia-500/15 to-violet-500/10 px-3 text-fuchsia-200 transition duration-200 hover:border-fuchsia-300/50 hover:from-fuchsia-500/25 hover:to-violet-500/20 active:scale-95 sm:h-11 sm:px-4"
            >
              <Menu
                size={22}
                strokeWidth={2.3}
                className="transition-transform duration-200 group-hover:rotate-3"
              />

              <span className="hidden text-[10px] font-extrabold uppercase tracking-[0.16em] sm:inline">
                Menu
              </span>

              <ChevronRight
                size={13}
                className="hidden text-cyan-300/80 transition-transform group-hover:translate-x-0.5 sm:block"
              />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
