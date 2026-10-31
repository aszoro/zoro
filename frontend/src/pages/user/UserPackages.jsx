// // import React, { useState, useEffect } from "react";
// // import { CalendarDays, DollarSign, CheckCircle2, Activity, Loader2 } from "lucide-react";
// // import api from "../../api/axios";
// // import { useAuth } from "../../context/AuthContext";

// // // 🔹 Circular Progress Component
// // const CircularProgress = ({ days, totalDays, status }) => {
// //   const percentage = Math.min((days / totalDays) * 100, 100);
// //   const radius = 22;
// //   const circumference = 2 * Math.PI * radius;
// //   const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
// //   const ringColor = status === "completed" ? "text-emerald-500" : "text-[#eab308]";

// //   return (
// //     <div className="relative flex items-center justify-center w-16 h-16 shrink-0">
// //       <svg className="w-full h-full transform -rotate-90">
// //         <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-800" />
// //         <circle
// //           cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent"
// //           strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
// //           className={`${ringColor} transition-all duration-1000 ease-out`}
// //         />
// //       </svg>
// //       <div className="absolute flex flex-col items-center justify-center text-center mt-0.5">
// //         <span className="text-sm font-black text-white leading-none">{days}</span>
// //         <span className="text-[8px] text-gray-400 uppercase font-bold tracking-widest mt-0.5">Day</span>
// //       </div>
// //     </div>
// //   );
// // };

// // const UserPackages = () => {
// //   const { user, token } = useAuth();
// //   const [packages, setPackages] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // 🔥 REAL DATA FETCHING LOGIC
// //   useEffect(() => {
// //     const fetchRealPackages = async () => {
// //       if (!user?.userId || !token) return;
      
// //       try {
// //         setLoading(true);
// //         const res = await api.get(`/package/user/${user.userId}`, {
// //           headers: { Authorization: `Bearer ${token}` }
// //         });
        
// //         const packageData = res.data.data || res.data.packages || res.data || [];
// //         setPackages(Array.isArray(packageData) ? packageData : []);
// //       } catch (error) {
// //         console.error("Failed to fetch packages:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchRealPackages();
// //   }, [user?.userId, token]);

// //   // Calendar date only, stripping timestamp
// //   const formatDate = (dateString) => {
// //     if (!dateString) return "N/A";
// //     return new Date(dateString).toLocaleDateString("en-GB", {
// //       day: "2-digit", month: "short", year: "numeric"
// //     });
// //   };

// //   return (
// //     <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-[#070b14] min-h-screen sm:min-h-0 rounded-none sm:rounded-2xl">
      
// //       {/* Header */}
// //       <div className="mb-6 flex items-center justify-between">
// //         <div>
// //           <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">My Packages</h2>
// //           <p className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-widest mt-1 uppercase">World together</p>
// //         </div>
// //       </div>

// //       {/* Main Content Area */}
// //       {loading ? (
// //         <div className="flex flex-col items-center justify-center py-12">
// //           <Loader2 className="animate-spin text-[#eab308] mb-3" size={32} />
// //           <span className="text-sm text-gray-400 font-bold tracking-widest uppercase">Loading Packages...</span>
// //         </div>
// //       ) : (
// //         <div className="flex flex-col gap-4">
// //           {packages.length > 0 ? (
// //             packages.map((pkg, index) => {
// //               const amount = Number(pkg.packageAmount) || 0;
// //               const daysDone = Number(pkg.daysCompleted) || 0;
// //               const totalDays = Number(pkg.totalDays) || 25;
              
// //               const dailyRoi = (amount * 5) / 100;
// //               const earnedRoi = dailyRoi * daysDone;
// //               const totalExpected = dailyRoi * totalDays;

// //               return (
// //                 <div key={pkg._id || Math.random()} 
// //                   className="bg-[#111827] border border-gray-800 rounded-2xl p-4 flex flex-row items-center gap-4 sm:gap-5 shadow-lg relative overflow-hidden transition-all hover:border-gray-700"
// //                 >
// //                   {pkg.status === "active" && (
// //                     <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#eab308]/5 blur-[40px] pointer-events-none"></div>
// //                   )}

// //                   {/* Circle Chart */}
// //                   <CircularProgress days={daysDone} totalDays={totalDays} status={pkg.status} />

// //                   {/* Details Area */}
// //                   <div className="flex-1 min-w-0 z-10">
// //                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 sm:mb-1 gap-1">
                      
// //                       {/* 🔥 YAHAN CHANGE KIYA HAI: Package Number aur Amount clearly dikhega */}
// //                       <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5 truncate">
// //                         <DollarSign size={16} className="text-[#eab308]" />
// //                         Package {index + 1} <span className="text-gray-400 text-sm font-medium">(${amount})</span>
// //                       </h3>
                      
// //                       <span className={`w-fit text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full border flex items-center gap-1 ${
// //                         pkg.status === "completed" 
// //                           ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
// //                           : "text-[#eab308] bg-[#eab308]/10 border-[#eab308]/20"
// //                       }`}>
// //                         {pkg.status === "completed" ? <CheckCircle2 size={12} /> : <Activity size={12} />}
// //                         {pkg.status}
// //                       </span>
// //                     </div>

// //                     <div className="grid grid-cols-2 gap-2 mt-2 sm:mt-3 bg-[#0b1221] p-2.5 sm:p-3 rounded-xl border border-gray-800/60">
// //                       <div className="flex flex-col">
// //                         <span className="text-[8px] sm:text-[9px] text-gray-500 uppercase tracking-widest font-bold">ROI Received</span>
// //                         <span className="text-xs sm:text-sm font-black text-emerald-400">${earnedRoi.toFixed(2)}</span>
// //                       </div>
// //                       <div className="flex flex-col">
// //                         <span className="text-[8px] sm:text-[9px] text-gray-500 uppercase tracking-widest font-bold">Total Expected</span>
// //                         <span className="text-xs sm:text-sm font-black text-white">${totalExpected.toFixed(2)}</span>
// //                       </div>
// //                       <div className="flex flex-col col-span-2 pt-1.5 border-t border-gray-800/50 mt-1 sm:mt-1.5">
// //                         <span className="text-[8px] sm:text-[9px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1">
// //                           <CalendarDays size={10} /> Activated On
// //                         </span>
// //                         <span className="text-[10px] sm:text-xs font-bold text-gray-300 mt-0.5">{formatDate(pkg.startDate)}</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })
// //           ) : (
// //             <div className="text-center py-10 border border-dashed border-gray-800 rounded-2xl bg-[#0b1221]/50">
// //               <span className="text-gray-500 text-xs sm:text-sm font-bold tracking-widest uppercase">No Active Packages Found</span>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default UserPackages;









// import React, { useState, useEffect } from "react";
// import { CalendarDays, DollarSign, CheckCircle2, Activity, Loader2 } from "lucide-react";
// import api from "../../api/axios";
// import { useAuth } from "../../context/AuthContext";

// // 🔹 Circular Progress Component (Thoda chhota aur compact kar diya)
// const CircularProgress = ({ days, totalDays, status }) => {
//   const percentage = Math.min((days / totalDays) * 100, 100);
//   const radius = 22;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
//   const ringColor = status === "completed" ? "text-emerald-500" : "text-[#eab308]";

//   return (
//     <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 shrink-0">
//       <svg viewBox="0 0 64 64" className="w-full h-full transform -rotate-90">
//         <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4.5" fill="transparent" className="text-gray-800" />
//         <circle
//           cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4.5" fill="transparent"
//           strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
//           className={`${ringColor} transition-all duration-1000 ease-out`}
//         />
//       </svg>
//       <div className="absolute flex flex-col items-center justify-center text-center mt-0.5">
//         <span className="text-xs sm:text-sm font-black text-white leading-none">{days}</span>
//         <span className="text-[7px] sm:text-[8px] text-gray-400 uppercase font-bold tracking-widest mt-0.5">Day</span>
//       </div>
//     </div>
//   );
// };

// const UserPackages = () => {
//   const { user, token } = useAuth();
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🔥 REAL DATA FETCHING LOGIC
//   useEffect(() => {
//     const fetchRealPackages = async () => {
//       if (!user?.userId || !token) return;
      
//       try {
//         setLoading(true);
//         const res = await api.get(`/package/user/${user.userId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
        
//         const packageData = res.data.data || res.data.packages || res.data || [];
//         setPackages(Array.isArray(packageData) ? packageData : []);
//       } catch (error) {
//         console.error("Failed to fetch packages:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRealPackages();
//   }, [user?.userId, token]);

//   // Calendar date only, stripping timestamp
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString("en-GB", {
//       day: "2-digit", month: "short", year: "numeric"
//     });
//   };

//   return (
//     // 🔥 Removed 'min-h-screen', reduced paddings to make it compact
//     <div className="w-full max-w-3xl mx-auto p-3 sm:p-5 bg-[#070b14] rounded-2xl">
      
//       {/* Header */}
//       <div className="mb-1 flex items-center justify-between">
//         <div>
//           <h2 className="text-lg sm:text-xl font-black text-white tracking-wide uppercase">My dafsPackages</h2>
//           <p className="text-[9px] sm:text-[10px] text-gray-400 font-medium tracking-widest mt-0.5 uppercase">World together</p>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       {loading ? (
//         <div className="flex flex-col items-center justify-center py-8">
//           <Loader2 className="animate-spin text-[#eab308] mb-3" size={28} />
//           <span className="text-xs text-gray-400 font-bold tracking-widest uppercase">Loading...</span>
//         </div>
//       ) : (
//         <div className="flex flex-col gap-3">
//           {packages.length > 0 ? (
//             packages.map((pkg, index) => {
//               const amount = Number(pkg.packageAmount) || 0;
//               const daysDone = Number(pkg.daysCompleted) || 0;
//               const totalDays = Number(pkg.totalDays) || 25;
              
//               const dailyRoi = (amount * 5) / 100;
//               const earnedRoi = dailyRoi * daysDone;
//               const totalExpected = dailyRoi * totalDays;

//               return (
//                 <div key={pkg._id || Math.random()} 
//                   // 🔥 Reduced padding and gap for a more compact card
//                   className="bg-[#111827] border border-gray-800 rounded-xl p-3 flex flex-row items-center gap-3 shadow-md relative overflow-hidden transition-all hover:border-gray-700"
//                 >
//                   {pkg.status === "active" && (
//                     <div className="absolute top-0 left-0 w-20 h-20 bg-[#eab308]/5 blur-[30px] pointer-events-none"></div>
//                   )}

//                   {/* Circle Chart */}
//                   <CircularProgress days={daysDone} totalDays={totalDays} status={pkg.status} />

//                   {/* Details Area */}
//                   <div className="flex-1 min-w-0 z-10">
//                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5 mb-1.5">
                      
//                       <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5 truncate">
//                         <DollarSign size={14} className="text-[#eab308]" />
//                         Package {index + 1} <span className="text-gray-400 text-xs font-medium">(${amount})</span>
//                       </h3>
                      
//                       <span className={`w-fit text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border flex items-center gap-1 ${
//                         pkg.status === "completed" 
//                           ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
//                           : "text-[#eab308] bg-[#eab308]/10 border-[#eab308]/20"
//                       }`}>
//                         {pkg.status === "completed" ? <CheckCircle2 size={10} /> : <Activity size={10} />}
//                         {pkg.status}
//                       </span>
//                     </div>

//                     {/* 🔥 Inner grid optimized for less space */}
//                     <div className="grid grid-cols-2 gap-1.5 mt-1.5 bg-[#0b1221] p-2 sm:p-2.5 rounded-lg border border-gray-800/60">
//                       <div className="flex flex-col">
//                         <span className="text-[7.5px] sm:text-[8px] text-gray-500 uppercase tracking-widest font-bold">ROI Received</span>
//                         <span className="text-xs font-black text-emerald-400">${earnedRoi.toFixed(2)}</span>
//                       </div>
//                       <div className="flex flex-col">
//                         <span className="text-[7.5px] sm:text-[8px] text-gray-500 uppercase tracking-widest font-bold">Total Expected</span>
//                         <span className="text-xs font-black text-white">${totalExpected.toFixed(2)}</span>
//                       </div>
//                       <div className="flex flex-col col-span-2 pt-1 border-t border-gray-800/50 mt-1">
//                         <span className="text-[7.5px] sm:text-[8px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1">
//                           <CalendarDays size={9} /> Activated On
//                         </span>
//                         <span className="text-[9px] sm:text-[10px] font-bold text-gray-300 mt-0.5">{formatDate(pkg.startDate)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             // 🔥 Fixed empty state height
//             <div className="text-center py-6 sm:py-8 border border-dashed border-gray-800 rounded-xl bg-[#0b1221]/50">
//               <span className="text-gray-500 text-xs font-bold tracking-widest uppercase">No Active Packages Found</span>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserPackages;


import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Layers3,
  Loader2,
  PackageOpen,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const formatMoney = (value) => {
  const number = Number(value);
  return (Number.isFinite(number) ? number : 0).toFixed(2);
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatus = (status) => String(status || "active").toLowerCase();

const ProgressRing = ({ days, totalDays, status }) => {
  const safeTotal = Math.max(Number(totalDays) || 0, 1);
  const safeDays = Math.max(Number(days) || 0, 0);
  const percentage = Math.max(0, Math.min((safeDays / safeTotal) * 100, 100));
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const completed = getStatus(status) === "completed";

  return (
    <div className="relative h-[76px] w-[76px] shrink-0 sm:h-[88px] sm:w-[88px]">
      <svg viewBox="0 0 64 64" className="-rotate-90 h-full w-full">
        <circle cx="32" cy="32" r={radius} fill="none" stroke="currentColor" strokeWidth="4" className="text-white/[0.07]" />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${completed ? "text-emerald-400" : "text-cyan-300"} transition-all duration-700`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-black leading-none text-white sm:text-2xl">{Math.min(safeDays, safeTotal)}</span>
        <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500">of {safeTotal} days</span>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, detail, accent }) => (
  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3.5 sm:p-4">
    <div className="flex items-center justify-between gap-2">
      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500 sm:text-[10px]">{label}</span>
      <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${accent}`}>
        <Icon size={16} />
      </span>
    </div>
    <p className="mt-3 text-xl font-black tracking-tight text-white sm:text-2xl">{value}</p>
    <p className="mt-1 text-[10px] text-slate-500">{detail}</p>
  </div>
);

const UserPackages = () => {
  const { user, token } = useAuth();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchRealPackages = async () => {
      if (!user?.userId || !token) {
        if (isMounted) {
          setPackages([]);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        setErrorMessage("");
        const res = await api.get(`/package/user/${encodeURIComponent(user.userId)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const packageData = res.data?.data || res.data?.packages || res.data || [];
        if (isMounted) setPackages(Array.isArray(packageData) ? packageData : []);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
        if (isMounted) setErrorMessage("We couldn't load your package details. Please try again.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRealPackages();
    return () => {
      isMounted = false;
    };
  }, [user?.userId, token]);

  const summary = useMemo(() => {
    return packages.reduce(
      (result, pkg) => {
        const amount = Number(pkg.packageAmount) || 0;
        const daysDone = Math.max(Number(pkg.daysCompleted) || 0, 0);
        const totalDays = Math.max(Number(pkg.totalDays) || 25, 1);
        const dailyRoi = Number(pkg.dailyRoi) > 0 ? Number(pkg.dailyRoi) : (amount * 2) / totalDays;
        result.invested += amount;
        result.received += dailyRoi * daysDone;
        result.expected += dailyRoi * totalDays;
        if (getStatus(pkg.status) === "completed") result.completed += 1;
        else result.active += 1;
        return result;
      },
      { invested: 0, received: 0, expected: 0, active: 0, completed: 0 }
    );
  }, [packages]);

  return (
    <main className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#080d19] text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/[0.08] blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-64 h-64 w-64 rounded-full bg-violet-600/[0.08] blur-3xl" />

      <header className="relative border-b border-white/[0.07] px-4 pb-5 pt-5 sm:px-7 sm:pb-6 sm:pt-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-300/15 to-violet-400/10 text-cyan-200 shadow-lg shadow-cyan-950/20">
              <Layers3 size={23} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-extrabold uppercase tracking-[0.24em] text-cyan-300">WORLD TOGETHER</span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-slate-400">Portfolio</span>
              </div>
              <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">My Packages<span className="text-cyan-300">.</span></h1>
              <p className="mt-1 text-xs text-slate-400">Track your package progress and returns in one place.</p>
            </div>
          </div>
          <div className="flex w-fit items-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-300">Account overview</span>
          </div>
        </div>
      </header>

      <section className="relative grid grid-cols-2 gap-2.5 px-4 py-4 sm:grid-cols-4 sm:gap-3 sm:px-7 sm:py-5">
        <StatCard icon={PackageOpen} label="Packages" value={String(packages.length)} detail={`${summary.active} active · ${summary.completed} completed`} accent="bg-cyan-300/10 text-cyan-200" />
        <StatCard icon={CircleDollarSign} label="Package value" value={`$${formatMoney(summary.invested)}`} detail="Total package amount" accent="bg-violet-300/10 text-violet-200" />
        <StatCard icon={TrendingUp} label="Profit earned" value={`$${formatMoney(summary.received)}`} detail="Estimated profit by days completed" accent="bg-emerald-300/10 text-emerald-200" />
        <StatCard icon={Activity} label="2× Target Income" value={`$${formatMoney(summary.expected)}`} detail="Backend target across package terms" accent="bg-amber-300/10 text-amber-200" />
      </section>

      <section className="relative px-4 pb-5 sm:px-7 sm:pb-7">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-cyan-300">Your portfolio</p>
            <h2 className="mt-1 text-lg font-extrabold">Package activity</h2>
          </div>
          {!loading && (
            <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[10px] font-bold text-slate-400">
              {packages.length} {packages.length === 1 ? "package" : "packages"}
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.02]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.06]">
              <Loader2 className="animate-spin text-cyan-300" size={23} />
            </div>
            <p className="mt-4 text-xs font-bold text-white">Loading package data</p>
            <p className="mt-1 text-[10px] text-slate-500">Please wait while we sync your account.</p>
          </div>
        ) : errorMessage ? (
          <div className="rounded-2xl border border-rose-400/20 bg-rose-400/[0.05] px-4 py-8 text-center">
            <p className="text-sm font-bold text-rose-200">Unable to load packages</p>
            <p className="mt-2 text-xs text-slate-400">{errorMessage}</p>
            <button type="button" onClick={() => window.location.reload()} className="mt-4 rounded-xl border border-white/10 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/[0.06]">
              Refresh page
            </button>
          </div>
        ) : packages.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {packages.map((pkg, index) => {
              const amount = Number(pkg.packageAmount) || 0;
              const daysDone = Math.max(Number(pkg.daysCompleted) || 0, 0);
              const totalDays = Math.max(Number(pkg.totalDays) || 25, 1);
              const dailyRoi = Number(pkg.dailyRoi) > 0 ? Number(pkg.dailyRoi) : (amount * 2) / totalDays;
              const earnedRoi = dailyRoi * daysDone;
              const totalExpected = dailyRoi * totalDays;
              const status = getStatus(pkg.status);
              const completed = status === "completed";
              const progress = Math.max(0, Math.min((daysDone / totalDays) * 100, 100));

              return (
                <article key={pkg._id || `${pkg.userId || "package"}-${index}`} className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#111b2c] via-[#0e1727] to-[#0b1220] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/20 hover:shadow-xl hover:shadow-cyan-950/10 sm:p-5">
                  <div className={`absolute right-0 top-0 h-28 w-28 rounded-full blur-3xl ${completed ? "bg-emerald-400/[0.07]" : "bg-cyan-400/[0.07]"}`} />
                  <div className="relative flex items-start gap-3.5">
                    <ProgressRing days={daysDone} totalDays={totalDays} status={status} />
                    <div className="min-w-0 flex-1 pt-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md border border-cyan-300/15 bg-cyan-300/[0.07] px-2 py-1 text-[8px] font-extrabold uppercase tracking-[0.16em] text-cyan-200">Package {String(index + 1).padStart(2, "0")}</span>
                        <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[8px] font-extrabold uppercase tracking-[0.12em] ${completed ? "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300" : "border-amber-300/20 bg-amber-300/[0.06] text-amber-200"}`}>
                          {completed ? <CheckCircle2 size={10} /> : <Clock3 size={10} />}
                          {status}
                        </span>
                      </div>
                      <h3 className="mt-2 truncate text-xl font-black tracking-tight text-white">${formatMoney(amount)} <span className="text-xs font-semibold text-slate-500">package value</span></h3>
                      <p className="mt-1 text-[10px] text-slate-500">Activated {formatDate(pkg.startDate)}</p>
                    </div>
                    <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-slate-500 sm:flex">
                      <ArrowUpRight size={17} />
                    </div>
                  </div>

                  <div className="relative mt-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500">Term progress</span>
                      <span className="text-[10px] font-extrabold text-white">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                      <div className={`h-full rounded-full transition-all duration-700 ${completed ? "bg-emerald-400" : "bg-gradient-to-r from-cyan-300 to-violet-400"}`} style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <div className="relative mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-emerald-400/10 bg-emerald-400/[0.045] p-3">
                      <div className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.13em] text-slate-500">
                        <TrendingUp size={11} className="text-emerald-300" /> ROI received
                      </div>
                      <p className="mt-1.5 text-lg font-black text-emerald-300">${formatMoney(earnedRoi)}</p>
                      <p className="mt-0.5 text-[9px] text-slate-500">${formatMoney(dailyRoi)} daily estimate</p>
                    </div>
                    <div className="rounded-xl border border-violet-400/10 bg-violet-400/[0.045] p-3">
                      <div className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.13em] text-slate-500">
                        <Sparkles size={11} className="text-violet-300" /> Full-term ROI
                      </div>
                      <p className="mt-1.5 text-lg font-black text-white">${formatMoney(totalExpected)}</p>
                      <p className="mt-0.5 text-[9px] text-slate-500">Backend target for full term</p>
                    </div>
                  </div>

                  <div className="relative mt-3 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-3">
                    <div className="flex items-center gap-2 text-slate-500">
                      <CalendarDays size={13} />
                      <span className="text-[10px] font-semibold">Start date</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-300">{formatDate(pkg.startDate)}</span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.015] px-5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.035] text-slate-500">
              <PackageOpen size={26} />
            </div>
            <h3 className="mt-4 text-sm font-extrabold text-white">No packages yet</h3>
            <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">When a package is available on your account, its progress and ROI details will appear here.</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default UserPackages;
