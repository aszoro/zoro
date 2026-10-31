// // // // import React, { useState } from 'react';
// // // // import { useAuth } from "../context/AuthContext";
// // // // // 🔥 Naya Premium Modal Import Kar Liya
// // // // import TopUpModalWithInput from "./modals/TopUpModalWithInput"; 

// // // // const Packages = () => {
// // // //   const { user } = useAuth();
  
// // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // //   const [selectedPackage, setSelectedPackage] = useState({ amount: 0, name: '' });

// // // //   // USD Packages List (Data same as before)
// // // // const packagesList = [
// // // //     { id: 1, name: 'SAVING 1', price: 2, roi: 0.10, days: 25, profit: 2.50 },
// // // //     { id: 2, name: 'SAVING 2', price: 5, roi: 0.25, days: 25, profit: 6.25 },
// // // //     { id: 3, name: 'SAVING 3', price: 10, roi: 0.50, days: 25, profit: 12.50 },
// // // //     { id: 4, name: 'SAVING 4', price: 20, roi: 1, days: 25, profit: 25 },
// // // //     { id: 5, name: 'SAVING 5', price: 50, roi: 2.50, days: 25, profit: 62.50 },
// // // //     { id: 6, name: 'SAVING 6', price: 100, roi: 5, days: 25, profit: 125 },
// // // //     { id: 7, name: 'SAVING 7', price: 200, roi: 10, days: 25, profit: 250 },
// // // //     { id: 8, name: 'SAVING 8', price: 500, roi: 25, days: 25, profit: 625 },
// // // //     { id: 9, name: 'SAVING 9', price: 1000, roi: 50, days: 25, profit: 1250 },
// // // // ];

// // // //   const handleBuyClick = (pkg) => {
// // // //     setSelectedPackage({ amount: pkg.price, name: pkg.name });
// // // //     setIsModalOpen(true);
// // // //   };

// // // //   if (!user) return null;

// // // //   return (
// // // //     <div className="w-full pb-2 md:pb-8 pt-4">
// // // //       {/* --- USD PACKAGE GRID --- */}
// // // //       {/* 🔥 UPDATE: Mobile ke liye grid-cols-2 set kiya hai aur baaki screens ke liye 3 aur 4 */}
// // // //       <div className="max-w-6xl mx-auto px-2 sm:px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
// // // //         {packagesList.map((pkg) => (
// // // //           // 🔥 UPDATE: Dark Theme, Gold Borders & Responsive Padding
// // // //           <div key={pkg.id} className="bg-[#111827] border border-[#d4af37]/40 p-4 md:p-6 flex flex-col justify-between shadow-lg shadow-black/50 rounded-xl hover:border-[#d4af37] transition-all">
// // // //             <div>
// // // //               <h3 className="text-sm md:text-xl font-black text-[#d4af37] mb-3 md:mb-4 tracking-wide">{pkg.name}</h3>
              
// // // //               {/* Data list with Flexbox for clean alignment */}
// // // //               <div className="space-y-1.5 md:space-y-2">
// // // //                 <p className="text-gray-400 text-xs md:text-sm font-semibold flex justify-between">
// // // //                   <span>Price:</span> <span className="text-[#22c55e]">${pkg.price}</span>
// // // //                 </p>
// // // //                 <p className="text-gray-400 text-xs md:text-sm font-semibold flex justify-between">
// // // //                   <span>Daily ROI:</span> <span className="text-[#22c55e]">${pkg.roi.toFixed(2)}</span>
// // // //                 </p>
// // // //                 <p className="text-gray-400 text-xs md:text-sm font-semibold flex justify-between">
// // // //                   <span>Days:</span> <span className="text-white">{pkg.days}</span>
// // // //                 </p>
// // // //                 <p className="text-gray-400 text-xs md:text-sm font-semibold flex justify-between border-t border-gray-700 pt-1.5 md:pt-2 mt-1.5 md:mt-2">
// // // //                   <span>Total Profit:</span> <span className="text-[#d4af37]">${pkg.profit.toFixed(2)}</span>
// // // //                 </p>
// // // //               </div>
// // // //             </div>

// // // //             {/* Premium Gold Button */}
// // // //             <button 
// // // //               onClick={() => handleBuyClick(pkg)}
// // // //               className="mt-4 md:mt-6 w-full bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-black font-extrabold py-1.5 md:py-2 px-4 rounded-lg shadow-[0_0_10px_rgba(212,175,55,0.4)] hover:shadow-[0_0_15px_rgba(212,175,55,0.6)] hover:scale-[1.02] transition-all text-xs md:text-sm"
// // // //             >
// // // //               BUY NOW
// // // //             </button>
// // // //           </div>
// // // //         ))}
// // // //       </div>

// // // //       {/* --- PREMIUM ACTIVATION MODAL --- */}
// // // //       {isModalOpen && (
// // // //         <TopUpModalWithInput 
// // // //            onClose={() => setIsModalOpen(false)}
// // // //            onSuccess={() => console.log("Package Activated!")}
// // // //            packageAmount={selectedPackage.amount}
// // // //            packageName={selectedPackage.name}
// // // //         />
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Packages;













 

// // //  import React, { useState } from "react";
// // // import {
// // //   Crown,
// // //   Gem,
// // //   Sparkles,
// // //   Clock3,
// // //   ArrowUpRight,
// // //   Zap,
// // //   ShieldCheck,
// // // } from "lucide-react";

// // // import { useAuth } from "../context/AuthContext";
// // // import TopUpModalWithInput from "./modals/TopUpModalWithInput";

// // // const PACKAGES = [
// // //   { price: 5, days: 90, type: "standard" },
// // //   { price: 10, days: 90, type: "standard" },
// // //   { price: 20, days: 90, type: "standard" },
// // //   { price: 50, days: 80, type: "standard" },
// // //   { price: 100, days: 80, type: "standard" },
// // //   { price: 300, days: 80, type: "royalty" },
// // //   { price: 500, days: 70, type: "royalty" },
// // //   { price: 1000, days: 70, type: "royalty" },
// // //   { price: 2000, days: 70, type: "royalty" },
// // // ];

// // // const formatAmount = (amount) =>
// // //   new Intl.NumberFormat("en-US", {
// // //     maximumFractionDigits: 2,
// // //   }).format(amount);

// // // function PackageCard({ pkg, onSelect }) {
// // //   const isRoyalty = pkg.type === "royalty";
// // //   const targetIncome = pkg.price * 2;

// // //   return (
// // //     <article
// // //       className={[
// // //         "relative flex min-w-0 w-full flex-col overflow-hidden",
// // //         "rounded-[24px] border p-4 sm:rounded-[26px] sm:p-5",
// // //         "transition-all duration-300 hover:-translate-y-1",
// // //         isRoyalty
// // //           ? "border-amber-300/25 bg-gradient-to-br from-[#251729] via-[#17111f] to-[#0c101b] hover:border-amber-300/60 hover:shadow-[0_0_24px_rgba(251,191,36,0.10)]"
// // //           : "border-purple-400/20 bg-gradient-to-br from-[#1b1425] via-[#12101c] to-[#0b111b] hover:border-fuchsia-400/50 hover:shadow-[0_0_24px_rgba(217,70,239,0.10)]",
// // //       ].join(" ")}
// // //     >
// // //       {/* Soft neon glow */}
// // //       <div
// // //         className={[
// // //           "pointer-events-none absolute -right-10 -top-10",
// // //           "h-28 w-28 rounded-full opacity-20 blur-3xl",
// // //           isRoyalty ? "bg-amber-400" : "bg-fuchsia-500",
// // //         ].join(" ")}
// // //       />

// // //       {/* Icon and package type */}
// // //       <div className="relative flex min-w-0 items-center justify-between gap-3">
// // //         <div
// // //           className={[
// // //             "flex h-12 w-12 shrink-0 items-center justify-center",
// // //             "rounded-2xl border",
// // //             isRoyalty
// // //               ? "border-amber-300/25 bg-amber-300/10 text-amber-300"
// // //               : "border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-300",
// // //           ].join(" ")}
// // //         >
// // //           {isRoyalty ? <Crown size={23} /> : <Gem size={23} />}
// // //         </div>

// // //         <span
// // //           className={[
// // //             "inline-flex max-w-[calc(100%-60px)] shrink-0 items-center",
// // //             "justify-center rounded-full border px-2.5 py-1.5",
// // //             "text-[9px] font-extrabold uppercase tracking-[0.12em]",
// // //             "whitespace-nowrap",
// // //             isRoyalty
// // //               ? "border-amber-300/25 bg-amber-300/10 text-amber-200"
// // //               : "border-cyan-300/20 bg-cyan-300/5 text-cyan-200",
// // //           ].join(" ")}
// // //         >
// // //           {isRoyalty ? "Royalty" : "Standard"}
// // //         </span>
// // //       </div>

// // //       {/* Price */}
// // //       <div className="relative mt-5">
// // //         <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-400">
// // //           Package Amount
// // //         </p>

// // //         <h3 className="mt-1 whitespace-nowrap text-3xl font-black tracking-tight text-white sm:text-4xl">
// // //           ${formatAmount(pkg.price)}
// // //         </h3>

// // //         <div
// // //           className={[
// // //             "mt-4 h-px w-full",
// // //             isRoyalty
// // //               ? "bg-gradient-to-r from-amber-300/50 to-transparent"
// // //               : "bg-gradient-to-r from-fuchsia-400/50 to-transparent",
// // //           ].join(" ")}
// // //         />
// // //       </div>

// // //       {/* Details */}
// // //       <div className="relative mt-4 space-y-4">
// // //         <div className="flex min-w-0 items-center justify-between gap-3">
// // //           <span className="text-sm text-slate-400">
// // //             Target multiplier
// // //           </span>

// // //           <span
// // //             className={[
// // //               "shrink-0 whitespace-nowrap text-base font-black",
// // //               isRoyalty ? "text-amber-300" : "text-fuchsia-300",
// // //             ].join(" ")}
// // //           >
// // //             2×
// // //           </span>
// // //         </div>

// // //         <div className="flex min-w-0 items-center justify-between gap-3">
// // //           <span className="text-sm text-slate-400">
// // //             Target income
// // //           </span>

// // //           <span className="shrink-0 whitespace-nowrap text-base font-black text-white">
// // //             ${formatAmount(targetIncome)}
// // //           </span>
// // //         </div>

// // //         <div className="flex min-w-0 items-center justify-between gap-3">
// // //           <span className="flex items-center gap-2 text-sm text-slate-400">
// // //             <Clock3 size={16} className="shrink-0" />
// // //             Duration
// // //           </span>

// // //           <span className="shrink-0 whitespace-nowrap text-sm font-bold text-slate-200">
// // //             {pkg.days} days
// // //           </span>
// // //         </div>

// // //         {isRoyalty && (
// // //           <div className="flex items-center gap-2 rounded-xl border border-amber-300/15 bg-amber-300/5 px-3 py-2.5">
// // //             <Crown size={15} className="shrink-0 text-amber-300" />
// // //             <span className="text-xs font-semibold text-amber-100/90">
// // //               Royalty Pool Package
// // //             </span>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Action */}
// // //       <button
// // //         type="button"
// // //         onClick={() => onSelect(pkg)}
// // //         className={[
// // //           "relative mt-5 flex w-full items-center justify-center gap-2",
// // //           "rounded-xl border px-3 py-3.5",
// // //           "text-sm font-extrabold text-white",
// // //           "transition-all duration-200 hover:brightness-110 active:scale-[0.98]",
// // //           isRoyalty
// // //             ? "border-amber-300/30 bg-gradient-to-r from-amber-600 to-orange-500"
// // //             : "border-fuchsia-400/30 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-cyan-600",
// // //         ].join(" ")}
// // //       >
// // //         Select Package
// // //         <ArrowUpRight size={17} />
// // //       </button>
// // //     </article>
// // //   );
// // // }

// // // function PackageSection({
// // //   title,
// // //   subtitle,
// // //   packages,
// // //   royalty = false,
// // //   onSelect,
// // // }) {
// // //   return (
// // //     <section
// // //       className={[
// // //         "min-w-0 rounded-[26px] border p-4",
// // //         "sm:rounded-[30px] sm:p-6 lg:p-7",
// // //         "bg-gradient-to-br from-[#171020]/95 via-[#100e19]/95 to-[#0b101a]/95",
// // //         royalty ? "border-amber-300/15" : "border-purple-400/20",
// // //       ].join(" ")}
// // //     >
// // //       {/* Section heading */}
// // //       <div className="mb-6 flex min-w-0 items-start gap-3 sm:gap-4">
// // //         <div
// // //           className={[
// // //             "flex h-11 w-11 shrink-0 items-center justify-center",
// // //             "rounded-2xl border sm:h-12 sm:w-12",
// // //             royalty
// // //               ? "border-amber-300/25 bg-amber-300/10 text-amber-300"
// // //               : "border-purple-400/25 bg-purple-500/10 text-fuchsia-300",
// // //           ].join(" ")}
// // //         >
// // //           {royalty ? <Crown size={22} /> : <Sparkles size={23} />}
// // //         </div>

// // //         <div className="min-w-0 flex-1">
// // //           <p
// // //             className={[
// // //               "text-[9px] font-extrabold uppercase tracking-[0.20em]",
// // //               "break-words sm:text-[10px] sm:tracking-[0.25em]",
// // //               royalty ? "text-amber-300" : "text-cyan-300",
// // //             ].join(" ")}
// // //           >
// // //             {subtitle}
// // //           </p>

// // //           <h2 className="mt-2 text-xl font-black leading-tight text-white sm:text-2xl">
// // //             {title}
// // //           </h2>

// // //           <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
// // //             {royalty
// // //               ? "Explore packages with Royalty Pool classification."
// // //               : "Choose a package that fits your preferences."}
// // //           </p>
// // //         </div>
// // //       </div>

// // //       {/* Responsive grid:
// // //           Mobile = 1 column
// // //           Tablet = 2 or 3 columns
// // //           Desktop = 4 or 5 columns
// // //       */}
// // //       <div
// // //         className={[
// // //           "grid min-w-0 grid-cols-1 items-stretch gap-4",
// // //           "sm:grid-cols-2 sm:gap-5",
// // //           royalty
// // //             ? "lg:grid-cols-3 xl:grid-cols-4"
// // //             : "lg:grid-cols-3 xl:grid-cols-5",
// // //         ].join(" ")}
// // //       >
// // //         {packages.map((pkg) => (
// // //           <PackageCard
// // //             key={pkg.price}
// // //             pkg={pkg}
// // //             onSelect={onSelect}
// // //           />
// // //         ))}
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // // export default function Packages() {
// // //   const { user } = useAuth();
// // //   const [selectedPackage, setSelectedPackage] = useState(null);
// // //   const [showModal, setShowModal] = useState(false);

// // //   if (!user) return null;

// // //   const standardPackages = PACKAGES.filter(
// // //     (pkg) => pkg.type === "standard"
// // //   );

// // //   const royaltyPackages = PACKAGES.filter(
// // //     (pkg) => pkg.type === "royalty"
// // //   );

// // //   const handleSelectPackage = (pkg) => {
// // //     setSelectedPackage(pkg);
// // //     setShowModal(true);
// // //   };

// // //   const handleCloseModal = () => {
// // //     setShowModal(false);
// // //     setSelectedPackage(null);
// // //   };

// // //   const handleSuccess = () => {
// // //     setShowModal(false);
// // //     setSelectedPackage(null);
// // //   };

// // //   return (
// // //     <div className="min-h-screen w-full overflow-x-clip bg-[#08070e] text-white">
// // //       {/* Background effects */}
// // //       <div className="pointer-events-none fixed inset-0 overflow-hidden">
// // //         <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-purple-700/10 blur-[110px]" />
// // //         <div className="absolute -right-32 top-80 h-72 w-72 rounded-full bg-cyan-500/5 blur-[110px]" />
// // //       </div>

// // //       <main className="relative mx-auto w-full max-w-7xl space-y-5 px-3 py-5 sm:space-y-7 sm:px-6 sm:py-8 lg:px-8">
// // //         {/* Page header */}
// // //         <header className="relative overflow-hidden rounded-[26px] border border-purple-400/20 bg-gradient-to-br from-[#1c1228] via-[#100e19] to-[#0b111a] p-5 sm:rounded-[30px] sm:p-8">
// // //           <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-fuchsia-500/10 blur-3xl" />

// // //           <div className="relative flex min-w-0 items-start gap-3 sm:gap-4">
// // //             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-300 sm:h-14 sm:w-14">
// // //               <Zap size={25} />
// // //             </div>

// // //             <div className="min-w-0 flex-1">
// // //               <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-cyan-300 sm:text-[10px] sm:tracking-[0.25em]">
// // //                 ✦ ENTER YOUR ARENA
// // //               </p>

// // //               <h1 className="mt-2 text-2xl font-black leading-tight sm:text-4xl">
// // //                 <span className="bg-gradient-to-r from-white via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
// // //                   Choose Your Package
// // //                 </span>
// // //               </h1>

// // //               <p className="mt-2 text-sm leading-6 text-slate-400 sm:max-w-2xl">
// // //                 Explore package amounts, target multipliers and duration
// // //                 details in the ZORO GAMES AI theme.
// // //               </p>
// // //             </div>
// // //           </div>

// // //           <div className="relative mt-5 flex flex-wrap gap-2">
// // //             <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-black/20 px-3 py-2 text-[10px] font-semibold text-slate-300">
// // //               <Gem size={14} className="text-fuchsia-300" />
// // //               9 Packages
// // //             </span>

// // //             <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-black/20 px-3 py-2 text-[10px] font-semibold text-slate-300">
// // //               <ShieldCheck size={14} className="text-cyan-300" />
// // //               Package Details
// // //             </span>
// // //           </div>
// // //         </header>

// // //         <PackageSection
// // //           title="Standard Packages"
// // //           subtitle="01 — PLAYER PACKAGES"
// // //           packages={standardPackages}
// // //           onSelect={handleSelectPackage}
// // //         />

// // //         <PackageSection
// // //           title="Royalty Packages"
// // //           subtitle="02 — PREMIUM ACCESS"
// // //           packages={royaltyPackages}
// // //           royalty
// // //           onSelect={handleSelectPackage}
// // //         />

// // //         {/* Informational disclaimer */}
// // //         <div className="rounded-2xl border border-slate-700/50 bg-[#0d0c14] px-4 py-4 sm:px-5">
// // //           <p className="text-xs leading-6 text-slate-400">
// // //             <span className="font-bold text-slate-300">
// // //               Please note:
// // //             </span>{" "}
// // //             Target-income figures are displayed package information, not
// // //             guaranteed returns. Actual payouts, eligibility and Royalty Pool
// // //             rules depend on the platform's applicable terms.
// // //           </p>
// // //         </div>
// // //       </main>

// // //       {showModal && selectedPackage && (
// // //         <TopUpModalWithInput
// // //           onClose={handleCloseModal}
// // //           onSuccess={handleSuccess}
// // //           packageAmount={selectedPackage.price}
// // //           packageName={
// // //             selectedPackage.type === "royalty"
// // //               ? `Royalty Package $${formatAmount(selectedPackage.price)}`
// // //               : `Standard Package $${formatAmount(selectedPackage.price)}`
// // //           }
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // }



// // import React, { useState } from "react";
// // import {
// //   Crown,
// //   Gem,
// //   Sparkles,
// //   Clock3,
// //   ArrowUpRight,
// //   Zap,
// //   ShieldCheck,
// //   ChevronDown,
// // } from "lucide-react";

// // import { useAuth } from "../context/AuthContext";
// // import TopUpModalWithInput from "./modals/TopUpModalWithInput";

// // const PACKAGES = [
// //   { price: 5, days: 90, type: "standard" },
// //   { price: 10, days: 90, type: "standard" },
// //   { price: 20, days: 90, type: "standard" },
// //   { price: 50, days: 80, type: "standard" },
// //   { price: 100, days: 80, type: "standard" },
// //   { price: 300, days: 80, type: "royalty" },
// //   { price: 500, days: 70, type: "royalty" },
// //   { price: 1000, days: 70, type: "royalty" },
// //   { price: 2000, days: 70, type: "royalty" },
// // ];

// // const formatAmount = (amount) =>
// //   new Intl.NumberFormat("en-US", {
// //     maximumFractionDigits: 2,
// //   }).format(amount);

// // function PackageCard({ pkg, onSelect }) {
// //   const isRoyalty = pkg.type === "royalty";
// //   const targetIncome = pkg.price * 2;

// //   const theme = isRoyalty
// //     ? {
// //         border: "border-amber-300/25 hover:border-amber-300/60",
// //         glow: "bg-amber-400",
// //         icon: "border-amber-300/25 bg-amber-300/10 text-amber-300",
// //         badge: "border-amber-300/25 bg-amber-300/10 text-amber-200",
// //         amount: "text-amber-300",
// //         line: "from-amber-300/50",
// //         button: "border-amber-300/30 bg-gradient-to-r from-amber-600 to-orange-500",
// //         detail: "border-amber-300/15 bg-amber-300/5",
// //         cardBg: "from-[#251729] via-[#17111f] to-[#0c101b]",
// //       }
// //     : {
// //         border: "border-purple-400/20 hover:border-fuchsia-400/50",
// //         glow: "bg-fuchsia-500",
// //         icon: "border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-300",
// //         badge: "border-cyan-300/20 bg-cyan-300/5 text-cyan-200",
// //         amount: "text-fuchsia-300",
// //         line: "from-fuchsia-400/50",
// //         button: "border-fuchsia-400/30 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-cyan-600",
// //         detail: "border-purple-400/15 bg-purple-500/5",
// //         cardBg: "from-[#1b1425] via-[#12101c] to-[#0b111b]",
// //       };

// //   return (
// //     <article
// //       className={[
// //         "relative flex w-full min-w-0 items-center gap-3 overflow-hidden",
// //         "rounded-2xl border bg-gradient-to-r p-3 transition-all duration-300",
// //         "hover:shadow-[0_0_22px_rgba(217,70,239,0.08)] sm:gap-4 sm:rounded-3xl sm:p-4",
// //         theme.border,
// //         theme.cardBg,
// //       ].join(" ")}
// //     >
// //       <div
// //         className={[
// //           "pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-15 blur-3xl",
// //           theme.glow,
// //         ].join(" ")}
// //       />

// //       {/* Horizontal package summary */}
// //       <div className="relative flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
// //         <div
// //           className={[
// //             "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
// //             "sm:h-14 sm:w-14 sm:rounded-2xl",
// //             theme.icon,
// //           ].join(" ")}
// //         >
// //           {isRoyalty ? <Crown size={22} /> : <Gem size={22} />}
// //         </div>

// //         <div className="min-w-0 flex-1">
// //           <div className="mb-1 flex flex-wrap items-center gap-1.5">
// //             <span
// //               className={[
// //                 "inline-flex items-center rounded-full border px-2 py-1",
// //                 "text-[8px] font-extrabold uppercase tracking-wider sm:text-[9px]",
// //                 theme.badge,
// //               ].join(" ")}
// //             >
// //               {isRoyalty ? "Royalty" : "Standard"}
// //             </span>
// //             {isRoyalty && (
// //               <span className="text-[8px] font-bold uppercase tracking-wider text-amber-300/80 sm:text-[9px]">
// //                 Premium
// //               </span>
// //             )}
// //           </div>

// //           <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-slate-400 sm:text-[10px]">
// //             Package Amount
// //           </p>
// //           <h3 className="mt-0.5 break-words text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl">
// //             ${formatAmount(pkg.price)}
// //           </h3>
// //           <div
// //             className={[
// //               "mt-2 h-px max-w-40 bg-gradient-to-r to-transparent",
// //               theme.line,
// //             ].join(" ")}
// //           />
// //         </div>
// //       </div>

// //       {/* Dropdown details and Buy button */}
// //       <div className="relative flex w-[112px] shrink-0 flex-col items-stretch gap-2 sm:w-40">
// //         <details className="group">
// //           <summary
// //             className={[
// //               "flex min-h-9 cursor-pointer list-none items-center justify-center gap-1.5",
// //               "rounded-lg border px-2 py-2 text-[10px] font-bold text-slate-200",
// //               "transition hover:bg-white/5 sm:rounded-xl sm:text-xs",
// //               theme.detail,
// //               "[&::-webkit-details-marker]:hidden",
// //             ].join(" ")}
// //           >
// //             <span>Package Info</span>
// //             <ChevronDown
// //               size={14}
// //               className="shrink-0 transition-transform duration-200 group-open:rotate-180"
// //             />
// //           </summary>

// //           <div
// //             className={[
// //               "mt-2 space-y-2 rounded-xl border bg-[#0b0a12] p-3 shadow-xl",
// //               theme.detail,
// //             ].join(" ")}
// //           >
// //             <div className="flex items-center justify-between gap-2">
// //               <span className="text-[10px] text-slate-400">Multiplier</span>
// //               <span className={`text-xs font-black ${theme.amount}`}>2×</span>
// //             </div>
// //             <div className="flex items-center justify-between gap-2">
// //               <span className="text-[10px] text-slate-400">Target income</span>
// //               <span className="text-xs font-black text-white">
// //                 ${formatAmount(targetIncome)}
// //               </span>
// //             </div>
// //             <div className="flex items-center justify-between gap-2">
// //               <span className="flex items-center gap-1 text-[10px] text-slate-400">
// //                 <Clock3 size={12} />
// //                 Duration
// //               </span>
// //               <span className="text-[10px] font-bold text-slate-200">
// //                 {pkg.days} days
// //               </span>
// //             </div>
// //             {isRoyalty && (
// //               <div className="flex items-center gap-1.5 border-t border-amber-300/10 pt-2 text-[10px] font-semibold text-amber-200">
// //                 <Crown size={13} className="shrink-0 text-amber-300" />
// //                 Royalty Pool Package
// //               </div>
// //             )}
// //           </div>
// //         </details>

// //         <button
// //           type="button"
// //           onClick={() => onSelect(pkg)}
// //           className={[
// //             "flex min-h-10 w-full items-center justify-center gap-1.5",
// //             "rounded-lg border px-2 py-2.5 text-[10px] font-extrabold text-white",
// //             "transition-all duration-200 hover:brightness-110 active:scale-[0.98]",
// //             "sm:rounded-xl sm:text-xs",
// //             theme.button,
// //           ].join(" ")}
// //         >
// //           Buy Package
// //           <ArrowUpRight size={14} className="shrink-0" />
// //         </button>
// //       </div>
// //     </article>
// //   );
// // }

// // function PackageSection({ title, subtitle, packages, royalty = false, onSelect }) {
// //   return (
// //     <section
// //       className={[
// //         "min-w-0 rounded-[24px] border p-3 sm:rounded-[30px] sm:p-6 lg:p-7",
// //         "bg-gradient-to-br from-[#171020]/95 via-[#100e19]/95 to-[#0b101a]/95",
// //         royalty ? "border-amber-300/15" : "border-purple-400/20",
// //       ].join(" ")}
// //     >
// //       <div className="mb-4 flex min-w-0 items-start gap-3 sm:mb-6 sm:gap-4">
// //         <div
// //           className={[
// //             "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border sm:h-12 sm:w-12 sm:rounded-2xl",
// //             royalty
// //               ? "border-amber-300/25 bg-amber-300/10 text-amber-300"
// //               : "border-purple-400/25 bg-purple-500/10 text-fuchsia-300",
// //           ].join(" ")}
// //         >
// //           {royalty ? <Crown size={21} /> : <Sparkles size={22} />}
// //         </div>

// //         <div className="min-w-0 flex-1">
// //           <p
// //             className={[
// //               "break-words text-[9px] font-extrabold uppercase tracking-[0.18em] sm:text-[10px] sm:tracking-[0.25em]",
// //               royalty ? "text-amber-300" : "text-cyan-300",
// //             ].join(" ")}
// //           >
// //             {subtitle}
// //           </p>
// //           <h2 className="mt-1.5 text-lg font-black leading-tight text-white sm:text-2xl">
// //             {title}
// //           </h2>
// //           <p className="mt-1.5 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
// //             {royalty
// //               ? "Explore packages with Royalty Pool classification."
// //               : "Choose a package that fits your preferences."}
// //           </p>
// //         </div>
// //       </div>

// //       {/* Vertical list: one horizontal package card per row */}
// //       <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
// //         {packages.map((pkg) => (
// //           <PackageCard key={pkg.price} pkg={pkg} onSelect={onSelect} />
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }

// // export default function Packages() {
// //   const { user } = useAuth();
// //   const [selectedPackage, setSelectedPackage] = useState(null);
// //   const [showModal, setShowModal] = useState(false);

// //   if (!user) return null;

// //   const standardPackages = PACKAGES.filter((pkg) => pkg.type === "standard");
// //   const royaltyPackages = PACKAGES.filter((pkg) => pkg.type === "royalty");

// //   const handleSelectPackage = (pkg) => {
// //     setSelectedPackage(pkg);
// //     setShowModal(true);
// //   };

// //   const handleCloseModal = () => {
// //     setShowModal(false);
// //     setSelectedPackage(null);
// //   };

// //   const handleSuccess = () => {
// //     setShowModal(false);
// //     setSelectedPackage(null);
// //   };

// //   return (
// //     <div className="min-h-screen w-full overflow-x-clip bg-[#08070e] text-white">
// //       <div className="pointer-events-none fixed inset-0 overflow-hidden">
// //         <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-purple-700/10 blur-[110px]" />
// //         <div className="absolute -right-32 top-80 h-72 w-72 rounded-full bg-cyan-500/5 blur-[110px]" />
// //       </div>

// //       <main className="relative mx-auto w-full max-w-7xl space-y-5 px-3 py-5 sm:space-y-7 sm:px-6 sm:py-8 lg:px-8">
// //         <header className="relative overflow-hidden rounded-[26px] border border-purple-400/20 bg-gradient-to-br from-[#1c1228] via-[#100e19] to-[#0b111a] p-5 sm:rounded-[30px] sm:p-8">
// //           <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-fuchsia-500/10 blur-3xl" />

// //           <div className="relative flex min-w-0 items-start gap-3 sm:gap-4">
// //             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-300 sm:h-14 sm:w-14">
// //               <Zap size={25} />
// //             </div>

// //             <div className="min-w-0 flex-1">
// //               <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-cyan-300 sm:text-[10px] sm:tracking-[0.25em]">
// //                 ✦ ENTER YOUR ARENA
// //               </p>
// //               <h1 className="mt-2 text-2xl font-black leading-tight sm:text-4xl">
// //                 <span className="bg-gradient-to-r from-white via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
// //                   Choose Your Package
// //                 </span>
// //               </h1>
// //               <p className="mt-2 text-sm leading-6 text-slate-400 sm:max-w-2xl">
// //                 Explore package amounts, target multipliers and duration
// //                 details in the ZORO GAMES AI theme.
// //               </p>
// //             </div>
// //           </div>

// //           <div className="relative mt-5 flex flex-wrap gap-2">
// //             <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-black/20 px-3 py-2 text-[10px] font-semibold text-slate-300">
// //               <Gem size={14} className="text-fuchsia-300" />
// //               9 Packages
// //             </span>
// //             <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-black/20 px-3 py-2 text-[10px] font-semibold text-slate-300">
// //               <ShieldCheck size={14} className="text-cyan-300" />
// //               Package Details
// //             </span>
// //           </div>
// //         </header>

// //         <PackageSection
// //           title="Standard Packages"
// //           subtitle="01 — PLAYER PACKAGES"
// //           packages={standardPackages}
// //           onSelect={handleSelectPackage}
// //         />

// //         <PackageSection
// //           title="Royalty Packages"
// //           subtitle="02 — PREMIUM ACCESS"
// //           packages={royaltyPackages}
// //           royalty
// //           onSelect={handleSelectPackage}
// //         />

// //         <div className="rounded-2xl border border-slate-700/50 bg-[#0d0c14] px-4 py-4 sm:px-5">
// //           <p className="text-xs leading-6 text-slate-400">
// //             <span className="font-bold text-slate-300">Please note:</span>{" "}
// //             Target-income figures are displayed package information, not
// //             guaranteed returns. Actual payouts, eligibility and Royalty Pool
// //             rules depend on the platform&apos;s applicable terms.
// //           </p>
// //         </div>
// //       </main>

// //       {showModal && selectedPackage && (
// //         <TopUpModalWithInput
// //           onClose={handleCloseModal}
// //           onSuccess={handleSuccess}
// //           packageAmount={selectedPackage.price}
// //           packageName={
// //             selectedPackage.type === "royalty"
// //               ? `Royalty Package $${formatAmount(selectedPackage.price)}`
// //               : `Standard Package $${formatAmount(selectedPackage.price)}`
// //           }
// //         />
// //       )}
// //     </div>
// //   );
// // }



// import React, { useState } from "react";
// import {
//   Crown,
//   Gem,
//   Sparkles,
//   Clock3,
//   ArrowUpRight,
//   Zap,
//   ShieldCheck,
//   ChevronDown,
// } from "lucide-react";

// import { useAuth } from "../context/AuthContext";
// import TopUpModalWithInput from "./modals/TopUpModalWithInput";

// const PACKAGES = [
//   { price: 5, days: 90, type: "standard" },
//   { price: 10, days: 90, type: "standard" },
//   { price: 20, days: 90, type: "standard" },
//   { price: 50, days: 80, type: "standard" },
//   { price: 100, days: 80, type: "standard" },
//   { price: 300, days: 80, type: "royalty" },
//   { price: 500, days: 70, type: "royalty" },
//   { price: 1000, days: 70, type: "royalty" },
//   { price: 2000, days: 70, type: "royalty" },
// ];

// const formatAmount = (amount) =>
//   new Intl.NumberFormat("en-US", {
//     maximumFractionDigits: 2,
//   }).format(amount);

// function PackageCard({ pkg, onSelect }) {
//   const isRoyalty = pkg.type === "royalty";
//   const targetIncome = pkg.price * 2;

//   const theme = isRoyalty
//     ? {
//         border: "border-amber-300/25 hover:border-amber-300/60",
//         icon: "border-amber-300/25 bg-amber-300/10 text-amber-300",
//         badge: "border-amber-300/25 bg-amber-300/10 text-amber-200",
//         amount: "text-amber-300",
//         line: "from-amber-300/50",
//         button:
//           "border-amber-300/30 bg-gradient-to-r from-amber-600 to-orange-500",
//         detail: "border-amber-300/20 bg-amber-300/5",
//         background: "from-[#251729] via-[#17111f] to-[#0c101b]",
//         glow: "bg-amber-400",
//       }
//     : {
//         border: "border-purple-400/20 hover:border-fuchsia-400/50",
//         icon: "border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-300",
//         badge: "border-cyan-300/20 bg-cyan-300/5 text-cyan-200",
//         amount: "text-fuchsia-300",
//         line: "from-fuchsia-400/50",
//         button:
//           "border-fuchsia-400/30 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-cyan-600",
//         detail: "border-purple-400/20 bg-purple-500/5",
//         background: "from-[#1b1425] via-[#12101c] to-[#0b111b]",
//         glow: "bg-fuchsia-500",
//       };

//   return (
//     <article
//       className={[
//         "relative flex w-full min-w-0 items-center gap-2.5",
//         "overflow-visible rounded-2xl border bg-gradient-to-r",
//         "p-3 transition-all duration-200 sm:gap-4 sm:rounded-3xl sm:p-4",
//         theme.border,
//         theme.background,
//       ].join(" ")}
//     >
//       <div
//         className={[
//           "pointer-events-none absolute -right-5 -top-5",
//           "h-20 w-20 rounded-full opacity-15 blur-3xl",
//           theme.glow,
//         ].join(" ")}
//       />

//       {/* Left: package icon, type and amount */}
//       <div className="relative flex min-w-0 flex-1 items-center gap-2.5 sm:gap-4">
//         <div
//           className={[
//             "flex h-10 w-10 shrink-0 items-center justify-center",
//             "rounded-xl border sm:h-14 sm:w-14 sm:rounded-2xl",
//             theme.icon,
//           ].join(" ")}
//         >
//           {isRoyalty ? <Crown size={22} /> : <Gem size={22} />}
//         </div>

//         <div className="min-w-0 flex-1">
//           <div className="mb-1.5 flex flex-wrap items-center gap-1">
//             <span
//               className={[
//                 "inline-flex rounded-full border px-2 py-1",
//                 "text-[8px] font-extrabold uppercase tracking-wider sm:text-[9px]",
//                 theme.badge,
//               ].join(" ")}
//             >
//               {isRoyalty ? "Royalty" : "Standard"}
//             </span>
//           </div>

//           <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 sm:text-[10px]">
//             Package Amount
//           </p>

//           <h3 className="mt-0.5 text-2xl font-black leading-tight text-white sm:text-3xl">
//             ${formatAmount(pkg.price)}
//           </h3>

//           <div
//             className={[
//               "mt-2 h-px max-w-24 bg-gradient-to-r to-transparent sm:max-w-40",
//               theme.line,
//             ].join(" ")}
//           />
//         </div>
//       </div>

//       {/* Right: details dropdown and buy button */}
//       <div className="relative flex w-[112px] shrink-0 flex-col gap-2 sm:w-40">
//         <details className="group">
//           <summary
//             className={[
//               "flex min-h-10 cursor-pointer list-none items-center",
//               "justify-center gap-1 rounded-xl border px-1.5 py-2",
//               "text-[10px] font-bold text-slate-200",
//               "transition hover:bg-white/5 sm:gap-2 sm:px-2 sm:text-xs",
//               theme.detail,
//               "[&::-webkit-details-marker]:hidden",
//             ].join(" ")}
//           >
//             <span>Package Info</span>
//             <ChevronDown
//               size={14}
//               className="shrink-0 transition-transform group-open:rotate-180"
//             />
//           </summary>

//           <div
//             className={[
//               "absolute right-0 top-full z-30 mt-2 w-52",
//               "space-y-3 rounded-xl border bg-[#100d18] p-3 shadow-2xl",
//               "sm:w-60 sm:p-4",
//               theme.detail,
//             ].join(" ")}
//           >
//             <div className="flex items-center justify-between gap-2">
//               <span className="text-xs text-slate-400">
//                 Target multiplier
//               </span>
//               <span className={`text-sm font-black ${theme.amount}`}>
//                 2×
//               </span>
//             </div>

//             <div className="flex items-center justify-between gap-2">
//               <span className="text-xs text-slate-400">Target income</span>
//               <span className="text-sm font-black text-white">
//                 ${formatAmount(targetIncome)}
//               </span>
//             </div>

//             <div className="flex items-center justify-between gap-2">
//               <span className="flex items-center gap-1.5 text-xs text-slate-400">
//                 <Clock3 size={14} />
//                 Duration
//               </span>
//               <span className="text-xs font-bold text-slate-200">
//                 {pkg.days} days
//               </span>
//             </div>

//             {isRoyalty && (
//               <div className="flex items-center gap-2 border-t border-amber-300/15 pt-3 text-xs font-semibold text-amber-200">
//                 <Crown size={14} className="shrink-0 text-amber-300" />
//                 Royalty Pool Package
//               </div>
//             )}
//           </div>
//         </details>

//         <button
//           type="button"
//           onClick={() => onSelect(pkg)}
//           className={[
//             "flex min-h-10 w-full items-center justify-center gap-1",
//             "rounded-xl border px-1.5 py-2.5",
//             "text-[10px] font-extrabold text-white sm:gap-1.5 sm:px-2 sm:text-xs",
//             "transition-all hover:brightness-110 active:scale-[0.98]",
//             theme.button,
//           ].join(" ")}
//         >
//           <span>Buy Package</span>
//           <ArrowUpRight size={14} className="shrink-0" />
//         </button>
//       </div>
//     </article>
//   );
// }

// function PackageSection({
//   title,
//   subtitle,
//   packages,
//   royalty = false,
//   onSelect,
// }) {
//   return (
//     <section
//       className={[
//         "w-full min-w-0 rounded-2xl border p-2.5",
//         "sm:rounded-3xl sm:p-4",
//         "bg-gradient-to-br from-[#171020]/95 via-[#100e19]/95 to-[#0b101a]/95",
//         royalty ? "border-amber-300/15" : "border-purple-400/20",
//       ].join(" ")}
//     >
//       <div className="mb-4 flex min-w-0 items-center gap-1 sm:mb-5">
//         <div
//           className={[
//             "flex h-10 w-10 shrink-0 items-center justify-center",
//             "rounded-xl border sm:h-12 sm:w-12 sm:rounded-2xl",
//             royalty
//               ? "border-amber-300/25 bg-amber-300/10 text-amber-300"
//               : "border-purple-400/25 bg-purple-500/10 text-fuchsia-300",
//           ].join(" ")}
//         >
//           {royalty ? <Crown size={21} /> : <Sparkles size={22} />}
//         </div>

//         <div className="min-w-0 flex-1">
//           <p
//             className={[
//               "text-[9px] font-extrabold uppercase tracking-wider sm:text-[10px]",
//               royalty ? "text-amber-300" : "text-cyan-300",
//             ].join(" ")}
//           >
//             {subtitle}
//           </p>

//           <h2 className="mt-1 text-lg font-black leading-tight text-white sm:text-2xl">
//             {title}
//           </h2>

//           <p className="mt-1 text-xs leading-5 text-slate-400">
//             {royalty
//               ? "Explore packages with Royalty Pool classification."
//               : "Choose a package that fits your preferences."}
//           </p>
//         </div>
//       </div>

//       {/* Full-width vertical list */}
//       <div className="flex w-full min-w-0 flex-col gap-2 sm:gap-4">
//         {packages.map((pkg) => (
//           <PackageCard key={pkg.price} pkg={pkg} onSelect={onSelect} />
//         ))}
//       </div>
//     </section>
//   );
// }

// export default function Packages() {
//   const { user } = useAuth();
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   if (!user) return null;

//   const standardPackages = PACKAGES.filter(
//     (pkg) => pkg.type === "standard"
//   );

//   const royaltyPackages = PACKAGES.filter(
//     (pkg) => pkg.type === "royalty"
//   );

//   const handleSelectPackage = (pkg) => {
//     setSelectedPackage(pkg);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedPackage(null);
//   };

//   const handleSuccess = () => {
//     setShowModal(false);
//     setSelectedPackage(null);
//   };

//   return (
//     <div className="min-h-screen w-full overflow-x-clip bg-[#08070e] text-white">
//       {/* Background effects */}
//       <div className="pointer-events-none fixed inset-0 overflow-hidden">
//         <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-purple-700/10 blur-[110px]" />
//         <div className="absolute -right-32 top-80 h-72 w-72 rounded-full bg-cyan-500/5 blur-[110px]" />
//       </div>

//       {/* Reduced outer side spacing */}
//       <main className="relative mx-auto w-full max-w-none space-y-4  py-4 sm:space-y-6 sm:px-3 sm:py-6 lg:px-4">
//         <header className="relative overflow-hidden rounded-2xl border border-purple-400/20 bg-gradient-to-br from-[#1c1228] via-[#100e19] to-[#0b111a] p-1 sm:rounded-3xl sm:p-6">
//           <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-fuchsia-500/10 blur-3xl" />

//           <div className="relative flex min-w-0 items-start gap-1">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-300 sm:h-14 sm:w-14 sm:rounded-2xl">
//               <Zap size={24} />
//             </div>

//             <div className="min-w-0 flex-1">
//               <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-cyan-300 sm:text-[10px] sm:tracking-[0.25em]">
//                 ✦ ENTER YOUR ARENA
//               </p>

//               <h1 className="mt-2 text-2xl font-black leading-tight sm:text-4xl">
//                 <span className="bg-gradient-to-r from-white via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
//                   Choose Your Package
//                 </span>
//               </h1>

//               <p className="mt-2 text-sm leading-6 text-slate-400">
//                 Explore package amounts, target multipliers and duration
//                 details in the ZORO GAMES AI theme.
//               </p>
//             </div>
//           </div>

//           <div className="relative mt-4 flex flex-wrap gap-2">
//             <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-black/20 px-3 py-2 text-[10px] font-semibold text-slate-300">
//               <Gem size={14} className="text-fuchsia-300" />
//               9 Packages
//             </span>

//             <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-black/20 px-3 py-2 text-[10px] font-semibold text-slate-300">
//               <ShieldCheck size={14} className="text-cyan-300" />
//               Package Details
//             </span>
//           </div>
//         </header>

//         <PackageSection
//           title="Standard Packages"
//           subtitle="01 — PLAYER PACKAGES"
//           packages={standardPackages}
//           onSelect={handleSelectPackage}
//         />

//         <PackageSection
//           title="Royalty Packages"
//           subtitle="02 — PREMIUM ACCESS"
//           packages={royaltyPackages}
//           royalty
//           onSelect={handleSelectPackage}
//         />

//         <div className="rounded-xl border border-slate-700/50 bg-[#0d0c14] px-3 py-3 sm:rounded-2xl sm:px-5 sm:py-4">
//           <p className="text-xs leading-6 text-slate-400">
//             <span className="font-bold text-slate-300">Please note:</span>{" "}
//             Target-income figures are displayed package information, not
//             guaranteed returns. Actual payouts, eligibility and Royalty Pool
//             rules depend on the platform&apos;s applicable terms.
//           </p>
//         </div>
//       </main>

//       {showModal && selectedPackage && (
//         <TopUpModalWithInput
//           onClose={handleCloseModal}
//           onSuccess={handleSuccess}
//           packageAmount={selectedPackage.price}
//           packageName={
//             selectedPackage.type === "royalty"
//               ? `Royalty Package $${formatAmount(selectedPackage.price)}`
//               : `Standard Package $${formatAmount(selectedPackage.price)}`
//           }
//         />
//       )}
//     </div>
//   );
// }



import React, { useState } from "react";
import {
  Crown,
  Gem,
  Sparkles,
  Clock3,
  ArrowUpRight,
  Zap,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import TopUpModalWithInput from "./modals/TopUpModalWithInput";

const PACKAGES = [
  { price: 5, days: 90, type: "standard" },
  { price: 10, days: 90, type: "standard" },
  { price: 20, days: 90, type: "standard" },
  { price: 50, days: 80, type: "standard" },
  { price: 100, days: 80, type: "standard" },
  { price: 300, days: 80, type: "royalty" },
  { price: 500, days: 70, type: "royalty" },
  { price: 1000, days: 70, type: "royalty" },
  { price: 2000, days: 70, type: "royalty" },
];

const formatAmount = (amount) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(amount);

function PackageCard({ pkg, onSelect }) {
  const [infoOpen, setInfoOpen] = useState(false);
  const isRoyalty = pkg.type === "royalty";
  const targetIncome = pkg.price * 2;

  const theme = isRoyalty
    ? {
        border: "border-amber-300/25 hover:border-amber-300/60",
        icon: "border-amber-300/25 bg-amber-300/10 text-amber-300",
        badge: "border-amber-300/25 bg-amber-300/10 text-amber-200",
        amount: "text-amber-300",
        line: "from-amber-300/50",
        button:
          "border-amber-300/30 bg-gradient-to-r from-amber-600 to-orange-500",
        detail: "border-amber-300/20 bg-amber-300/5",
        background: "from-[#251729] via-[#17111f] to-[#0c101b]",
        glow: "bg-amber-400",
      }
    : {
        border: "border-purple-400/20 hover:border-fuchsia-400/50",
        icon: "border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-300",
        badge: "border-cyan-300/20 bg-cyan-300/5 text-cyan-200",
        amount: "text-fuchsia-300",
        line: "from-fuchsia-400/50",
        button:
          "border-fuchsia-400/30 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-cyan-600",
        detail: "border-purple-400/20 bg-purple-500/5",
        background: "from-[#1b1425] via-[#12101c] to-[#0b111b]",
        glow: "bg-fuchsia-500",
      };

  return (
    <article
      className={[
        "relative flex w-full min-w-0 flex-col gap-3",
        "overflow-hidden rounded-2xl border bg-gradient-to-r",
        "p-3 transition-all duration-200 sm:gap-4 sm:rounded-3xl sm:p-4",
        theme.border,
        theme.background,
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-none absolute -right-5 -top-5",
          "h-20 w-20 rounded-full opacity-15 blur-3xl",
          theme.glow,
        ].join(" ")}
      />

      <div className="relative flex w-full min-w-0 items-center gap-2.5 sm:gap-4">
      {/* Left: package icon, type and amount */}
      <div className="relative flex min-w-0 flex-1 items-center gap-2.5 sm:gap-4">
        <div
          className={[
            "flex h-10 w-10 shrink-0 items-center justify-center",
            "rounded-xl border sm:h-14 sm:w-14 sm:rounded-2xl",
            theme.icon,
          ].join(" ")}
        >
          {isRoyalty ? <Crown size={22} /> : <Gem size={22} />}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-1">
            <span
              className={[
                "inline-flex rounded-full border px-2 py-1",
                "text-[8px] font-extrabold uppercase tracking-wider sm:text-[9px]",
                theme.badge,
              ].join(" ")}
            >
              {isRoyalty ? "Royalty" : "Standard"}
            </span>
          </div>

          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 sm:text-[10px]">
            Package Amount
          </p>

          <h3 className="mt-0.5 text-2xl font-black leading-tight text-white sm:text-3xl">
            ${formatAmount(pkg.price)}
          </h3>

          <div
            className={[
              "mt-2 h-px max-w-24 bg-gradient-to-r to-transparent sm:max-w-40",
              theme.line,
            ].join(" ")}
          />
        </div>
      </div>

      {/* Right: details dropdown and buy button */}
      <div className="relative flex w-[112px] shrink-0 flex-col gap-2 sm:w-40">
        <button
          type="button"
          aria-expanded={infoOpen}
          onClick={() => setInfoOpen((open) => !open)}
          className={[
            "flex min-h-10 w-full items-center justify-center gap-1",
            "rounded-xl border px-1.5 py-2",
            "text-[10px] font-bold text-slate-100",
            "transition hover:brightness-110 sm:gap-2 sm:px-2 sm:text-xs",
            theme.detail,
          ].join(" ")}
        >
          <span>Package Info</span>
          <ChevronDown
            size={14}
            className={`shrink-0 transition-transform duration-200 ${infoOpen ? "rotate-180" : ""}`}
          />
        </button>

        <button
          type="button"
          onClick={() => onSelect(pkg)}
          className={[
            "flex min-h-10 w-full items-center justify-center gap-1",
            "rounded-xl border px-1.5 py-2.5",
            "text-[10px] font-extrabold text-white sm:gap-1.5 sm:px-2 sm:text-xs",
            "transition-all hover:brightness-110 active:scale-[0.98]",
            theme.button,
          ].join(" ")}
        >
          <span>Buy Package</span>
          <ArrowUpRight size={14} className="shrink-0" />
        </button>
      </div>
      </div>

      {infoOpen && (
        <div
          className={[
            "relative z-10 w-full rounded-xl border p-3 sm:p-4",
            "space-y-3 shadow-inner",
            "bg-[#090711] text-white",
            theme.detail,
          ].join(" ")}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-400">Target multiplier</span>
            <span className={`text-sm font-black ${theme.amount}`}>2×</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-400">Target income</span>
            <span className="text-sm font-black text-white">
              ${formatAmount(targetIncome)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock3 size={14} />
              Duration
            </span>
            <span className="text-xs font-bold text-slate-200">
              {pkg.days} days
            </span>
          </div>

          {isRoyalty && (
            <div className="flex items-center gap-2 border-t border-amber-300/15 pt-3 text-xs font-semibold text-amber-200">
              <Crown size={14} className="shrink-0 text-amber-300" />
              Royalty Pool Package
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function PackageSection({
  title,
  subtitle,
  packages,
  royalty = false,
  onSelect,
}) {
  return (
    <section
      className={[
        "w-full min-w-0 rounded-2xl border p-2.5",
        "sm:rounded-3xl sm:p-4",
        "bg-gradient-to-br from-[#171020]/95 via-[#100e19]/95 to-[#0b101a]/95",
        royalty ? "border-amber-300/15" : "border-purple-400/20",
      ].join(" ")}
    >
      <div className="mb-4 flex min-w-0 items-center gap-1 sm:mb-5">
        <div
          className={[
            "flex h-10 w-10 shrink-0 items-center justify-center",
            "rounded-xl border sm:h-12 sm:w-12 sm:rounded-2xl",
            royalty
              ? "border-amber-300/25 bg-amber-300/10 text-amber-300"
              : "border-purple-400/25 bg-purple-500/10 text-fuchsia-300",
          ].join(" ")}
        >
          {royalty ? <Crown size={21} /> : <Sparkles size={22} />}
        </div>

        <div className="min-w-0 flex-1">
          <p
            className={[
              "text-[9px] font-extrabold uppercase tracking-wider sm:text-[10px]",
              royalty ? "text-amber-300" : "text-cyan-300",
            ].join(" ")}
          >
            {subtitle}
          </p>

          <h2 className="mt-1 text-lg font-black leading-tight text-white sm:text-2xl">
            {title}
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            {royalty
              ? "Explore packages with Royalty Pool classification."
              : "Choose a package that fits your preferences."}
          </p>
        </div>
      </div>

      {/* Full-width vertical list */}
      <div className="flex w-full min-w-0 flex-col gap-2 sm:gap-4">
        {packages.map((pkg) => (
          <PackageCard key={pkg.price} pkg={pkg} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

export default function Packages() {
  const { user } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  if (!user) return null;

  const standardPackages = PACKAGES.filter(
    (pkg) => pkg.type === "standard"
  );

  const royaltyPackages = PACKAGES.filter(
    (pkg) => pkg.type === "royalty"
  );

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPackage(null);
  };

  const handleSuccess = () => {
    setShowModal(false);
    setSelectedPackage(null);
  };

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-[#08070e] text-white">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-purple-700/10 blur-[110px]" />
        <div className="absolute -right-32 top-80 h-72 w-72 rounded-full bg-cyan-500/5 blur-[110px]" />
      </div>

      {/* Reduced outer side spacing */}
      <main className="relative mx-auto w-full max-w-none space-y-4  py-4 sm:space-y-6 sm:px-3 sm:py-6 lg:px-4">
        <header className="relative overflow-hidden rounded-2xl border border-purple-400/20 bg-gradient-to-br from-[#1c1228] via-[#100e19] to-[#0b111a] p-1 sm:rounded-3xl sm:p-6">
          <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-fuchsia-500/10 blur-3xl" />

          <div className="relative flex min-w-0 items-start gap-1">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-300 sm:h-14 sm:w-14 sm:rounded-2xl">
              <Zap size={24} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-cyan-300 sm:text-[10px] sm:tracking-[0.25em]">
                ✦ ENTER YOUR ARENA
              </p>

              <h1 className="mt-2 text-2xl font-black leading-tight sm:text-4xl">
                <span className="bg-gradient-to-r from-white via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  Choose Your Package
                </span>
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Explore package amounts, target multipliers and duration
                details in the ZORO GAMES AI theme.
              </p>
            </div>
          </div>

          <div className="relative mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-black/20 px-3 py-2 text-[10px] font-semibold text-slate-300">
              <Gem size={14} className="text-fuchsia-300" />
              9 Packages
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-black/20 px-3 py-2 text-[10px] font-semibold text-slate-300">
              <ShieldCheck size={14} className="text-cyan-300" />
              Package Details
            </span>
          </div>
        </header>

        <PackageSection
          title="Standard Packages"
          subtitle="01 — PLAYER PACKAGES"
          packages={standardPackages}
          onSelect={handleSelectPackage}
        />

        <PackageSection
          title="Royalty Packages"
          subtitle="02 — PREMIUM ACCESS"
          packages={royaltyPackages}
          royalty
          onSelect={handleSelectPackage}
        />

        <div className="rounded-xl border border-slate-700/50 bg-[#0d0c14] px-3 py-3 sm:rounded-2xl sm:px-5 sm:py-4">
          <p className="text-xs leading-6 text-slate-400">
            <span className="font-bold text-slate-300">Please note:</span>{" "}
            Target-income figures are displayed package information, not
            guaranteed returns. Actual payouts, eligibility and Royalty Pool
            rules depend on the platform&apos;s applicable terms.
          </p>
        </div>
      </main>

      {showModal && selectedPackage && (
        <TopUpModalWithInput
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
          packageAmount={selectedPackage.price}
          packageName={
            selectedPackage.type === "royalty"
              ? `Royalty Package $${formatAmount(selectedPackage.price)}`
              : `Standard Package $${formatAmount(selectedPackage.price)}`
          }
        />
      )}
    </div>
  );
}