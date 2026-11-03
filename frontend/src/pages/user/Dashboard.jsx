 

// // // // import React, { useEffect, useState, Suspense, lazy, useRef } from "react";
// // // // import api from "../../api/axios"; 
// // // // import { useAuth } from "../../context/AuthContext";
// // // // import { useNavigate } from "react-router-dom"; 

// // // // // ⚡ Top ke zaroori components normal import
// // // // import ReferralLink from "../../components/dashboard/ReferralLink"; 
// // // // import QuickActions from "../../components/dashboard/QuickActions"; 
// // // // import TotalEarningBox from "../../components/dashboard/TotalEarningBox"; 
// // // //  import LivePackageStatsBox from "../../components/dashboard/LivePackageStatsBox";
// // // // import MonthlySalaryCard from "../../components/MonthlySalaryCard"; 
// // // // import UserInfoBoxes from "../../components/dashboard/UserInfoBoxes";

// // // // //import InstantSalaryPopup from '../../components/InstantSalaryPopup'; 

// // // // // Path apne folder structure ke hisaab se adjust kar lena

// // // // //import WithdrawalPopup from "../../components/WithdrawalPopup";
// // // // // 🚀 NAYA: Heavy components 'Lazy Load'
// // // // const Packages = lazy(() => import("../../components/Packages"));
// // // // const UserPackages = lazy(() => import("../../pages/user/UserPackages"));
// // // // const TradingStatusPanel = lazy(() => import("../../pages/user/TradingStatusPanel"));
// // // // const SystemDepositHistory = lazy(() => import("../../pages/user/SystemDepositHistory"));
// // // // const MonthlyLuckyWinner = lazy(() => import("../../pages/user/MonthlyLuckyWinner")); // 🔥 NAYA ADD KIYA YAHAN
// // // // const SalaryAchievers = lazy(() => import("../../pages/user/SalaryAchievers"));

// // // // const SectionLoader = () => (
// // // //   <div className="flex justify-center items-center h-24 w-full text-slate-500 text-sm animate-pulse">
// // // //     Loading section...
// // // //   </div>
// // // // );

// // // // const Dashboard = ({ modalState, setModalState }) => {
// // // //   const { user, token, setUser, logout } = useAuth();
// // // //   const navigate = useNavigate(); 
  
// // // //   // 🔥 FAST LOAD FIX 1: Loading state aur useRef wapas le aaye
// // // //   const [loading, setLoading] = useState(false);
// // // //   const hasFetched = useRef(false);

// // // //   const [stats, setStats] = useState({
// // // //     totalGrandInvestment: 0,
// // // //     todayTotalInvestment: 0,
// // // //     isFetching: true // Background loading state ke liye
// // // //   });

// // // //   const fetchUserData = async () => {
// // // //     if (!token || !user?.userId) return;
// // // //     try {
// // // //       // 🔥 FAST LOAD FIX 2: Timestamp add kiya taaki api turant response de
// // // //       const userRes = await api.get(`/user/${user.userId}?t=${new Date().getTime()}`, { 
// // // //         headers: { Authorization: `Bearer ${token}` } 
// // // //       });
// // // //       const fetchedUser = userRes.data.user;
// // // //       setUser(fetchedUser); 
// // // //       // 🔥 FAST LOAD FIX 3: localStorage ka use kiya
// // // //       localStorage.setItem(`dash_user_${user.userId}`, JSON.stringify(fetchedUser));
// // // //     } catch (err) {
// // // //       if (err?.response?.status === 401) logout();
// // // //     }
// // // //   };

// // // //   const fetchStats = async () => {
// // // //     if (!token) return;
// // // //     try {
// // // //       const res = await api.get(`/transactions/deposits/live-feed?t=${new Date().getTime()}`, {
// // // //         headers: { Authorization: `Bearer ${token}` }
// // // //       });
// // // //       if (res.data.stats) {
// // // //         const newStats = {
// // // //           totalGrandInvestment: res.data.stats.totalGrandInvestment || 0,
// // // //           todayTotalInvestment: res.data.stats.todayTotalInvestment || 0,
// // // //           isFetching: false
// // // //         };
// // // //         setStats(newStats);
// // // //         localStorage.setItem('dash_stats', JSON.stringify(newStats));
// // // //       }
// // // //     } catch (err) {
// // // //       setStats(prev => ({ ...prev, isFetching: false }));
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     if (user?.userId) {
// // // //         hasFetched.current = false;
// // // //     }
// // // //   }, [user?.userId]);

// // // //   useEffect(() => {
// // // //     // 🔥 FAST LOAD FIX 4: Sirf ek baar API call hone do (Network block nahi hoga)
// // // //     if (!hasFetched.current && token && user?.userId) {
// // // //       hasFetched.current = true;

// // // //       // 1. Cache se turant data uthao (Instant Load)
// // // //       const cachedUser = localStorage.getItem(`dash_user_${user.userId}`);
// // // //       const cachedStats = localStorage.getItem('dash_stats');
      
// // // //       if (cachedUser && cachedStats) {
// // // //         try {
// // // //           setUser(JSON.parse(cachedUser));
// // // //           setStats(JSON.parse(cachedStats));
// // // //         } catch(e) { console.error("Cache Error"); }
// // // //       } else {
// // // //          // Agar Cache nahi hai (Pehli baar login kiya), tabhi spinner dikhega
// // // //          setLoading(true);
// // // //       }

// // // //       // 2. Background me API call kardo, par screen ko block mat karo!
// // // //       Promise.all([fetchUserData(), fetchStats()]).finally(() => {
// // // //          setLoading(false);
// // // //       });
// // // //     }
// // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [user?.userId, token]); 

// // // //   // Agar loading state true hai ya user set nahi hua, tab spinner dikhao
// // // //   if (loading || !user) return (
// // // //     <div className="h-screen w-full flex justify-center items-center">
// // // //       <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#eab308]"></div>
// // // //     </div>
// // // //   );

// // // //   const referralLink = `${window.location.origin}/register?ref=${user.userId}`;

// // // //   return (
// // // //     <div className="w-full relative animate-fadeIn pb-28 md:pb-8 pt-4">
// // // //       <div className="space-y-4 max-w-4xl mx-auto px-2 sm:px-0">

// // // //         {/* <WithdrawalPopup /> */}
        
// // // //         {/* FAST LOADING SECTIONS */}
// // // //         <UserInfoBoxes />
// // // //       {/* <InstantSalaryPopup /> */}
// // // //         <div 
// // // //           className="grid grid-cols-2 gap-3 cursor-pointer hover:scale-[1.01] transition-transform duration-200"
// // // //           onClick={() => navigate("/system-live-feed")} 
// // // //         >
// // // //           <div className="bg-[#d89814] p-4 rounded-xl border border-yellow-600 shadow-lg flex flex-col justify-center min-h-[95px]">
// // // //             <h3 className="text-black font-bold text-[10px] sm:text-xs uppercase tracking-wide">
// // // //                 Total Investment
// // // //             </h3>
// // // //             <p className="text-lg sm:text-2xl font-extrabold text-black mt-1 drop-shadow-md">
// // // //                 {stats.isFetching && !stats.totalGrandInvestment 
// // // //                   ? "..." 
// // // //                   : `$${(200000 + (Number(stats.totalGrandInvestment) || 0)).toFixed(2)}`
// // // //                 }
// // // //             </p>
// // // //           </div>

// // // //           <div className="bg-[#1c2233] p-4 rounded-xl border border-slate-700 shadow-lg flex flex-col justify-center min-h-[95px]">
// // // //             <h3 className="text-slate-400 font-bold text-[10px] sm:text-xs uppercase tracking-wide">
// // // //               Today's Total Investment
// // // //             </h3>
// // // //             <p className="text-lg sm:text-2xl font-bold text-white mt-1 drop-shadow-md">
// // // //               {stats.isFetching && !stats.todayTotalInvestment 
// // // //                   ? "..." 
// // // //                   : `$${stats.todayTotalInvestment.toFixed(2)}`
// // // //               }
// // // //             </p>
// // // //           </div>
// // // //         </div>

// // // //         <TotalEarningBox user={user} />
// // // //         <LivePackageStatsBox user={user} />
// // // //         <MonthlySalaryCard userId={user.userId} />
// // // //         <ReferralLink link={referralLink} />

// // // //         <QuickActions 
// // // //           onDepositClick={() => {
// // // //             if (setModalState) {
// // // //               setModalState(prev => ({ ...prev, showDeposit: true }));
// // // //             }
// // // //           }} 
// // // //         />
       
// // // //         {/* 🚀 LAZY LOADED SECTIONS (INDIVIDUAL SUSPENSE - FOR FAST RENDERING) */}
        
// // // //         <div className="mt-8">
// // // //             <h2 className="text-2xl font-bold text-gray-800 mb-4 px-2">Investment Packages</h2>
// // // //             <Suspense fallback={<SectionLoader />}>
// // // //               <Packages />
// // // //             </Suspense>
// // // //         </div>

// // // //         <div className="mt-8 bg-[#070b14] rounded-2xl overflow-hidden shadow-lg">
// // // //             <Suspense fallback={<SectionLoader />}>
// // // //               <UserPackages />
// // // //             </Suspense>
// // // //         </div>

// // // //         <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
// // // //             <Suspense fallback={<SectionLoader />}>
// // // //               <TradingStatusPanel />
// // // //             </Suspense>
// // // //         </div>

// // // //         <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
// // // //             <Suspense fallback={<SectionLoader />}>
// // // //               <SystemDepositHistory />
// // // //             </Suspense>
// // // //         </div>

// // // //         {/* 🔥 NAYA: MonthlyLuckyWinner yahan SalaryAchievers ke upar laga diya */}
// // // //         <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
// // // //             <Suspense fallback={<SectionLoader />}>
// // // //               <MonthlyLuckyWinner />
// // // //             </Suspense>
// // // //         </div>

// // // //         <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
// // // //             <Suspense fallback={<SectionLoader />}>
// // // //               <SalaryAchievers />
// // // //             </Suspense>
// // // //         </div>

// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Dashboard;



// // // import React, {
// // //   useCallback,
// // //   useEffect,
// // //   useRef,
// // //   useState,
// // //   Suspense,
// // //   lazy,
// // // } from "react";

// // // import api from "../../api/axios";
// // // import { useAuth } from "../../context/AuthContext";
// // // import { useNavigate } from "react-router-dom";

// // // import ReferralLink from "../../components/dashboard/ReferralLink";
// // // import QuickActions from "../../components/dashboard/QuickActions";
// // // import TotalEarningBox from "../../components/dashboard/TotalEarningBox";
// // // import LivePackageStatsBox from "../../components/dashboard/LivePackageStatsBox";
// // //  import UserInfoBoxes from "../../components/dashboard/UserInfoBoxes";

// // // const Packages = lazy(() => import("../../components/Packages"));
// // // const UserPackages = lazy(() => import("../../pages/user/UserPackages"));
 
// // // const SystemDepositHistory = lazy(
// // //   () => import("../../pages/user/SystemDepositHistory")
// // // );
 

// // // const formatMoney = (value) =>
// // //   Number(value || 0).toLocaleString("en-US", {
// // //     minimumFractionDigits: 2,
// // //     maximumFractionDigits: 2,
// // //   });

// // // const SectionLoader = () => (
// // //   <div className="flex min-h-32 items-center justify-center gap-3 rounded-2xl border border-white/[0.07] bg-[#10111b]">
// // //     <span className="h-5 w-5 animate-spin rounded-full border-2 border-fuchsia-400/20 border-t-fuchsia-400" />
// // //     <span className="text-xs font-medium tracking-wide text-slate-400">
// // //       Loading section...
// // //     </span>
// // //   </div>
// // // );

// // // const SectionTitle = ({ number, eyebrow, title, subtitle }) => (
// // //   <div className="mb-4 flex items-start gap-3">
// // //     <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/[0.07] font-mono text-xs font-bold text-fuchsia-300">
// // //       {number}
// // //     </div>
// // //     <div className="min-w-0">
// // //       <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-fuchsia-300">
// // //         {eyebrow}
// // //       </p>
// // //       <h2 className="mt-1 text-lg font-extrabold tracking-tight text-white sm:text-xl">
// // //         {title}
// // //       </h2>
// // //       {subtitle && (
// // //         <p className="mt-1 text-xs leading-5 text-slate-500">{subtitle}</p>
// // //       )}
// // //     </div>
// // //   </div>
// // // );

// // // const Dashboard = ({ modalState, setModalState }) => {
// // //   const { user, token, setUser, logout } = useAuth();
// // //   const navigate = useNavigate();

// // //   const hasFetched = useRef(false);
// // //   const requestRef = useRef(0);

// // //   const [loading, setLoading] = useState(false);
// // //   const [refreshing, setRefreshing] = useState(false);

// // //   const [stats, setStats] = useState({
// // //     totalGrandInvestment: 0,
// // //     todayTotalInvestment: 0,
// // //     isFetching: true,
// // //   });

// // //   const userId = user?.userId;

// // //   const fetchUserData = useCallback(async () => {
// // //     if (!token || userId === undefined || userId === null) return;

// // //     try {
// // //       const response = await api.get(
// // //         `/user/${encodeURIComponent(String(userId))}?t=${Date.now()}`,
// // //         {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         }
// // //       );

// // //       const fetchedUser = response.data?.user;

// // //       if (fetchedUser) {
// // //         setUser(fetchedUser);
// // //         localStorage.setItem(
// // //           `dash_user_${userId}`,
// // //           JSON.stringify(fetchedUser)
// // //         );
// // //       }
// // //     } catch (error) {
// // //       if (error?.response?.status === 401) {
// // //         logout();
// // //       } else {
// // //         console.error("User refresh failed:", error.message);
// // //       }
// // //     }
// // //   }, [token, userId, setUser, logout]);

// // //   const fetchStats = useCallback(async () => {
// // //     if (!token) return;

// // //     try {
// // //       const response = await api.get(
// // //         `/transactions/deposits/live-feed?t=${Date.now()}`,
// // //         {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         }
// // //       );

// // //       const source = response.data?.stats || {};

// // //       const nextStats = {
// // //         totalGrandInvestment:
// // //           Number(source.totalGrandInvestment) || 0,
// // //         todayTotalInvestment:
// // //           Number(source.todayTotalInvestment) || 0,
// // //         isFetching: false,
// // //       };

// // //       setStats(nextStats);

// // //       if (userId !== undefined && userId !== null) {
// // //         localStorage.setItem(
// // //           `dash_stats_${userId}`,
// // //           JSON.stringify(nextStats)
// // //         );
// // //       }
// // //     } catch (error) {
// // //       setStats((previous) => ({
// // //         ...previous,
// // //         isFetching: false,
// // //       }));

// // //       console.error("Investment stats refresh failed:", error.message);
// // //     }
// // //   }, [token, userId]);

// // //   useEffect(() => {
// // //     hasFetched.current = false;
// // //     requestRef.current += 1;

// // //     if (!token || userId === undefined || userId === null) {
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     const currentRequest = requestRef.current;
// // //     const cachedUserKey = `dash_user_${userId}`;
// // //     const cachedStatsKey = `dash_stats_${userId}`;

// // //     let hasCachedUser = false;

// // //     try {
// // //       const cachedUser = localStorage.getItem(cachedUserKey);

// // //       if (cachedUser) {
// // //         const parsed = JSON.parse(cachedUser);

// // //         if (String(parsed.userId) === String(userId)) {
// // //           setUser(parsed);
// // //           hasCachedUser = true;
// // //         }
// // //       }
// // //     } catch {
// // //       localStorage.removeItem(cachedUserKey);
// // //     }

// // //     try {
// // //       const cachedStats = localStorage.getItem(cachedStatsKey);

// // //       if (cachedStats) {
// // //         const parsed = JSON.parse(cachedStats);

// // //         setStats({
// // //           totalGrandInvestment:
// // //             Number(parsed.totalGrandInvestment) || 0,
// // //           todayTotalInvestment:
// // //             Number(parsed.todayTotalInvestment) || 0,
// // //           isFetching: false,
// // //         });
// // //       }
// // //     } catch {
// // //       localStorage.removeItem(cachedStatsKey);
// // //     }

// // //     hasFetched.current = true;
// // //     setLoading(!hasCachedUser);

// // //     Promise.all([fetchUserData(), fetchStats()]).finally(() => {
// // //       if (requestRef.current === currentRequest) {
// // //         setLoading(false);
// // //       }
// // //     });

// // //     return () => {
// // //       if (requestRef.current === currentRequest) {
// // //         requestRef.current += 1;
// // //       }
// // //     };
// // //   }, [token, userId, fetchUserData, fetchStats, setUser]);

// // //   const handleRefresh = async () => {
// // //     if (refreshing) return;

// // //     setRefreshing(true);

// // //     try {
// // //       await Promise.all([fetchUserData(), fetchStats()]);
// // //     } finally {
// // //       setRefreshing(false);
// // //     }
// // //   };

// // //   if (loading || !user) {
// // //     return (
// // //       <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#080811] text-white">
// // //         <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-fuchsia-400/30 bg-fuchsia-500/[0.08] shadow-[0_0_55px_rgba(217,70,239,0.12)]">
// // //           <span className="text-2xl font-black tracking-tighter text-white">
// // //             Z<span className="text-cyan-300">.</span>
// // //           </span>
// // //           <span className="absolute -bottom-1 -right-1 h-5 w-5 animate-pulse rounded-full border-4 border-[#080811] bg-cyan-400" />
// // //         </div>
// // //         <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
// // //           Entering your arena
// // //         </p>
// // //       </div>
// // //     );
// // //   }

// // //   const displayName = user.name || "Player";

// // //   const initials = displayName
// // //     .trim()
// // //     .split(/\s+/)
// // //     .slice(0, 2)
// // //     .map((part) => part[0])
// // //     .join("")
// // //     .toUpperCase();

// // //   const referralLink =
// // //     `${window.location.origin}/register?ref=${encodeURIComponent(String(user.userId))}`;

// // //   return (
// // //     <main className="relative min-h-screen overflow-hidden bg-[#080811] pb-28 pt-4 font-sans text-white sm:pb-12 sm:pt-7">
// // //       {/* Original ambient background */}
// // //       <div className="pointer-events-none absolute -left-36 top-12 h-80 w-80 rounded-full bg-fuchsia-600/[0.10] blur-[110px]" />
// // //       <div className="pointer-events-none absolute -right-40 top-80 h-96 w-96 rounded-full bg-cyan-500/[0.08] blur-[120px]" />

// // //       <div className="relative mx-auto max-w-7xl space-y-8 px-3 sm:px-6 lg:px-8">

// // //         {/* Zoro Games AI identity */}
// // //         <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
// // //           <div className="flex items-center gap-3">
// // //             <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-fuchsia-300/30 bg-gradient-to-br from-fuchsia-500/25 via-[#181126] to-cyan-400/10 shadow-[0_0_25px_rgba(217,70,239,0.10)]">
// // //               <span className="text-2xl font-black italic tracking-tighter text-white">
// // //                 Z
// // //               </span>
// // //               <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
// // //             </div>

// // //             <div>
// // //               <h1 className="text-lg font-black uppercase leading-none tracking-[0.12em] sm:text-xl">
// // //                 ZORO <span className="text-fuchsia-400">GAMES AI</span>
// // //               </h1>
// // //               <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-slate-500">
// // //                 Play · Explore · Achieve
// // //               </p>
// // //             </div>
// // //           </div>

// // //           <button
// // //             type="button"
// // //             onClick={handleRefresh}
// // //             disabled={refreshing}
// // //             className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-slate-300 transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.06] hover:text-white disabled:opacity-50"
// // //           >
// // //             <span className={refreshing ? "animate-spin" : ""}>↻</span>
// // //             {refreshing ? "Updating..." : "Sync data"}
// // //           </button>
// // //         </header>

// // //         {/* Hero */}
// // //         <section className="relative overflow-hidden rounded-[28px] border border-fuchsia-300/15 bg-gradient-to-br from-[#21112b] via-[#141321] to-[#0c1822] p-5 shadow-2xl shadow-black/30 sm:p-8 lg:p-10">
// // //           <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-fuchsia-300/[0.09]" />
// // //           <div className="pointer-events-none absolute right-8 top-5 h-48 w-48 rounded-full bg-fuchsia-500/[0.09] blur-3xl" />
// // //           <div className="pointer-events-none absolute bottom-0 right-0 h-1 w-2/3 bg-gradient-to-r from-transparent via-fuchsia-400/60 to-cyan-300/60" />

// // //           <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
// // //             <div>
// // //               <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-1.5">
// // //                 <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
// // //                 <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-200">
// // //                   Your player space
// // //                 </span>
// // //               </div>

// // //               <p className="text-sm font-medium text-slate-400">
// // //                 Welcome back,
// // //               </p>

// // //               <h2 className="mt-2 break-words text-3xl font-black tracking-tight sm:text-5xl">
// // //                 {displayName}
// // //                 <span className="text-fuchsia-400">!</span>
// // //               </h2>

// // //               <p className="mt-4 max-w-lg text-sm leading-6 text-slate-400">
// // //                 Your personal hub for account activity, packages, rewards and
// // //                 community progress.
// // //               </p>

// // //               <button
// // //                 type="button"
// // //                 onClick={() =>
// // //                   document.getElementById("zoro-quick-actions")?.scrollIntoView({
// // //                     behavior: "smooth",
// // //                     block: "center",
// // //                   })
// // //                 }
// // //                 className="mt-6 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-5 py-3 text-xs font-extrabold text-white shadow-lg shadow-fuchsia-950/30 transition hover:brightness-110"
// // //               >
// // //                 Explore dashboard <span>↗</span>
// // //               </button>
// // //             </div>

// // //             <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 md:min-w-60 md:flex-col md:items-start md:p-5">
// // //               <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-700 text-lg font-black shadow-lg shadow-fuchsia-950/40">
// // //                 {initials}
// // //               </div>

// // //               <div className="min-w-0">
// // //                 <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">
// // //                   Player ID
// // //                 </p>
// // //                 <p className="mt-1 break-all font-mono text-xl font-bold tracking-wider text-white">
// // //                   {String(user.userId)}
// // //                 </p>
// // //                 <p className="mt-2 text-[10px] font-semibold text-cyan-300">
// // //                   Account connected
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </section>

// // //         {/* Profile */}
// // //         <section>
// // //           <SectionTitle
// // //             number="01"
// // //             eyebrow="Player profile"
// // //             title="Your account"
// // //             subtitle="Your profile information and account details."
// // //           />
// // //           <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10111b] p-3 sm:p-5">
// // //             <UserInfoBoxes />
// // //           </div>
// // //         </section>

// // //         {/* Investment stats */}
// // //         <section>
// // //           <SectionTitle
// // //             number="02"
// // //             eyebrow="Activity center"
// // //             title="Investment activity"
// // //             subtitle="Totals from the existing live-feed endpoint."
// // //           />

// // //           <div className="grid gap-4 md:grid-cols-2">
// // //             <button
// // //               type="button"
// // //               onClick={() => navigate("/system-live-feed")}
// // //               className="group relative overflow-hidden rounded-2xl border border-fuchsia-400/20 bg-gradient-to-br from-[#291432] to-[#12111e] p-5 text-left transition duration-200 hover:-translate-y-1 hover:border-fuchsia-300/50 sm:p-6"
// // //             >
// // //               <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-fuchsia-500/[0.12] blur-3xl" />

// // //               <div className="relative flex items-start justify-between gap-3">
// // //                 <div>
// // //                   <p className="text-[9px] font-bold uppercase tracking-[0.23em] text-fuchsia-300">
// // //                     All-time volume
// // //                   </p>
// // //                   <p className="mt-5 break-all text-3xl font-black tracking-tight sm:text-4xl">
// // //                     {stats.isFetching && !stats.totalGrandInvestment
// // //                       ? "..."
// // //                       : `$${formatMoney(200000 + (Number(stats.totalGrandInvestment) || 0))}`}
// // //                   </p>
// // //                   <p className="mt-2 text-xs text-slate-400">
// // //                     Total investment overview
// // //                   </p>
// // //                 </div>
// // //                 <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-fuchsia-300/20 bg-fuchsia-300/[0.08] text-xl text-fuchsia-200">
// // //                   ↗
// // //                 </span>
// // //               </div>

// // //               <div className="relative mt-5 flex justify-between border-t border-white/[0.08] pt-3 text-[9px] font-bold uppercase tracking-widest text-slate-500">
// // //                 <span>View live activity</span>
// // //                 <span className="text-fuchsia-300 transition group-hover:translate-x-1">
// // //                   →
// // //                 </span>
// // //               </div>
// // //             </button>

// // //             <button
// // //               type="button"
// // //               onClick={() => navigate("/system-live-feed")}
// // //               className="group relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-[#102b32] to-[#10131e] p-5 text-left transition duration-200 hover:-translate-y-1 hover:border-cyan-300/50 sm:p-6"
// // //             >
// // //               <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-cyan-400/[0.10] blur-3xl" />

// // //               <div className="relative flex items-start justify-between gap-3">
// // //                 <div>
// // //                   <p className="text-[9px] font-bold uppercase tracking-[0.23em] text-cyan-300">
// // //                     Today's volume
// // //                   </p>
// // //                   <p className="mt-5 break-all text-3xl font-black tracking-tight sm:text-4xl">
// // //                     {stats.isFetching && !stats.todayTotalInvestment
// // //                       ? "..."
// // //                       : `$${formatMoney(stats.todayTotalInvestment)}`}
// // //                   </p>
// // //                   <p className="mt-2 text-xs text-slate-400">
// // //                     Today's investment activity
// // //                   </p>
// // //                 </div>
// // //                 <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.08] text-xl text-cyan-200">
// // //                   ◷
// // //                 </span>
// // //               </div>

// // //               <div className="relative mt-5 flex justify-between border-t border-white/[0.08] pt-3 text-[9px] font-bold uppercase tracking-widest text-slate-500">
// // //                 <span>View live activity</span>
// // //                 <span className="text-cyan-300 transition group-hover:translate-x-1">
// // //                   →
// // //                 </span>
// // //               </div>
// // //             </button>
// // //           </div>
// // //         </section>

// // //         {/* Earnings */}
// // //         <section>
// // //           <SectionTitle
// // //             number="03"
// // //             eyebrow="Progress center"
// // //             title="Earnings & rewards"
// // //             subtitle="Existing earnings and package components."
// // //           />

// // //           <div className="space-y-4">
// // //             <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10111b] p-3 sm:p-5">
// // //               <TotalEarningBox user={user} />
// // //             </div>
// // //             <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10111b] p-3 sm:p-5">
// // //               <LivePackageStatsBox user={user} />
// // //             </div>
           
// // //           </div>
// // //         </section>

// // //         {/* Referral */}
// // //         <section>
// // //           <SectionTitle
// // //             number="04"
// // //             eyebrow="Community"
// // //             title="Your referral link"
// // //             subtitle="Share your existing personal referral URL."
// // //           />

// // //           <div className="overflow-hidden rounded-2xl border border-fuchsia-300/15 bg-gradient-to-br from-[#1b1327] to-[#10111b] p-3 sm:p-5">
// // //             <ReferralLink link={referralLink} />
// // //           </div>
// // //         </section>

// // //         {/* Actions */}
// // //         <section id="zoro-quick-actions">
// // //           <SectionTitle
// // //             number="05"
// // //             eyebrow="Quick access"
// // //             title="Your actions"
// // //             subtitle="Use the existing account shortcuts."
// // //           />

// // //           <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10111b] p-3 sm:p-5">
// // //             <QuickActions
// // //               onDepositClick={() => {
// // //                 if (setModalState) {
// // //                   setModalState((previous) => ({
// // //                     ...previous,
// // //                     showDeposit: true,
// // //                   }));
// // //                 }
// // //               }}
// // //             />
// // //           </div>
// // //         </section>

// // //         {/* Investment packages */}
// // //         <section>
// // //           <SectionTitle
// // //             number="06"
// // //             eyebrow="Discover"
// // //             title="Available packages"
// // //             subtitle="Packages supplied by the existing application."
// // //           />

// // //           <div className="overflow-hidden rounded-2xl border border-fuchsia-300/15 bg-[#10111b] p-3 shadow-xl shadow-black/20 sm:p-5">
// // //             <Suspense fallback={<SectionLoader />}>
// // //               <Packages />
// // //             </Suspense>
// // //           </div>
// // //         </section>

// // //         {/* User packages */}
// // //         <section>
// // //           <SectionTitle
// // //             number="07"
// // //             eyebrow="My collection"
// // //             title="My packages"
// // //             subtitle="Your existing package section."
// // //           />

// // //           <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10111b] p-3 sm:p-5">
// // //             <Suspense fallback={<SectionLoader />}>
// // //               <UserPackages />
// // //             </Suspense>
// // //           </div>
// // //         </section>

       

// // //         {/* Deposit history */}
// // //         <section>
// // //           <SectionTitle
// // //             number="09"
// // //             eyebrow="Transactions"
// // //             title="Deposit history"
// // //             subtitle="Review your recorded deposit information."
// // //           />

// // //           <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10111b]">
// // //             <Suspense fallback={<SectionLoader />}>
// // //               <SystemDepositHistory />
// // //             </Suspense>
// // //           </div>
// // //         </section>

// // //         {/* Monthly winner */}
// // //         <section>
// // //           <SectionTitle
// // //             number="10"
// // //             eyebrow="Highlights"
// // //             title="Monthly winners"
// // //             subtitle="Monthly winner information from your existing component."
// // //           />

       
// // //         </section>

     

// // //         {/* Footer */}
// // //         <footer className="border-t border-white/[0.08] pt-6 text-center">
// // //           <div className="mb-3 flex items-center justify-center gap-2">
// // //             <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-fuchsia-300/20 bg-fuchsia-300/[0.06] text-sm font-black italic text-fuchsia-200">
              
// // //             </span>
// // //             <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-300">
// // //               Zoro Games AI
// // //             </span>
// // //           </div>

// // //           <p className="text-[10px] font-medium tracking-wide text-slate-600">
// // //             Your space. Your progress.
// // //           </p>
// // //         </footer>
// // //       </div>
// // //     </main>
// // //   );
// // // };

// // // export default Dashboard;





// // import React, {
// //   useCallback,
// //   useEffect,
// //   useRef,
// //   useState,
// //   Suspense,
// //   lazy,
// // } from "react";

// // import api from "../../api/axios";
// // import { useAuth } from "../../context/AuthContext";
// // import { useNavigate } from "react-router-dom";

// // import ReferralLink from "../../components/dashboard/ReferralLink";
// // import QuickActions from "../../components/dashboard/QuickActions";
// // import TotalEarningBox from "../../components/dashboard/TotalEarningBox";
// // import UserInfoBoxes from "../../components/dashboard/UserInfoBoxes";
// // import RoyaltyDashboard from "../../components/RoyaltyDashboard";

// // const Packages = lazy(() => import("../../components/Packages"));
// // const UserPackages = lazy(() => import("../../pages/user/UserPackages"));
 
// // const SystemDepositHistory = lazy(
// //   () => import("../../pages/user/SystemDepositHistory")
// // );
 

// // const formatMoney = (value) =>
// //   Number(value || 0).toLocaleString("en-US", {
// //     minimumFractionDigits: 2,
// //     maximumFractionDigits: 2,
// //   });

// // const SectionLoader = () => (
// //   <div className="flex min-h-32 items-center justify-center gap-3 rounded-2xl border border-white/[0.07] bg-[#10111b]">
// //     <span className="h-5 w-5 animate-spin rounded-full border-2 border-fuchsia-400/20 border-t-fuchsia-400" />
// //     <span className="text-xs font-medium tracking-wide text-slate-400">
// //       Loading section...
// //     </span>
// //   </div>
// // );

// // const SectionTitle = ({ number, eyebrow, title, subtitle }) => (
// //   <div className="mb-4 flex items-start gap-3">
// //     <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/[0.07] font-mono text-xs font-bold text-fuchsia-300">
// //       {number}
// //     </div>
// //     <div className="min-w-0">
// //       <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-fuchsia-300">
// //         {eyebrow}
// //       </p>
// //       <h2 className="mt-1 text-lg font-extrabold tracking-tight text-white sm:text-xl">
// //         {title}
// //       </h2>
// //       {subtitle && (
// //         <p className="mt-1 text-xs leading-5 text-slate-500">{subtitle}</p>
// //       )}
// //     </div>
// //   </div>
// // );

// // const Dashboard = ({ modalState, setModalState }) => {
// //   const { user, token, setUser, logout } = useAuth();
// //   const navigate = useNavigate();

// //   const hasFetched = useRef(false);
// //   const requestRef = useRef(0);

// //   const [loading, setLoading] = useState(false);
// //   const [refreshing, setRefreshing] = useState(false);

// //   const [stats, setStats] = useState({
// //     totalGrandInvestment: 0,
// //     todayTotalInvestment: 0,
// //     isFetching: true,
// //   });

// //   const userId = user?.userId;

// //   const fetchUserData = useCallback(async () => {
// //     if (!token || userId === undefined || userId === null) return;

// //     try {
// //       const response = await api.get(
// //         `/user/${encodeURIComponent(String(userId))}?t=${Date.now()}`,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );

// //       const fetchedUser = response.data?.user;

// //       if (fetchedUser) {
// //         setUser(fetchedUser);
// //         localStorage.setItem(
// //           `dash_user_${userId}`,
// //           JSON.stringify(fetchedUser)
// //         );
// //       }
// //     } catch (error) {
// //       if (error?.response?.status === 401) {
// //         logout();
// //       } else {
// //         console.error("User refresh failed:", error.message);
// //       }
// //     }
// //   }, [token, userId, setUser, logout]);

// //   const fetchStats = useCallback(async () => {
// //     if (!token) return;

// //     try {
// //       const response = await api.get(
// //         `/transactions/deposits/live-feed?t=${Date.now()}`,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );

// //       const source = response.data?.stats || {};

// //       const nextStats = {
// //         totalGrandInvestment:
// //           Number(source.totalGrandInvestment) || 0,
// //         todayTotalInvestment:
// //           Number(source.todayTotalInvestment) || 0,
// //         isFetching: false,
// //       };

// //       setStats(nextStats);

// //       if (userId !== undefined && userId !== null) {
// //         localStorage.setItem(
// //           `dash_stats_${userId}`,
// //           JSON.stringify(nextStats)
// //         );
// //       }
// //     } catch (error) {
// //       setStats((previous) => ({
// //         ...previous,
// //         isFetching: false,
// //       }));

// //       console.error("Investment stats refresh failed:", error.message);
// //     }
// //   }, [token, userId]);

// //   useEffect(() => {
// //     hasFetched.current = false;
// //     requestRef.current += 1;

// //     if (!token || userId === undefined || userId === null) {
// //       setLoading(false);
// //       return;
// //     }

// //     const currentRequest = requestRef.current;
// //     const cachedUserKey = `dash_user_${userId}`;
// //     const cachedStatsKey = `dash_stats_${userId}`;

// //     let hasCachedUser = false;

// //     try {
// //       const cachedUser = localStorage.getItem(cachedUserKey);

// //       if (cachedUser) {
// //         const parsed = JSON.parse(cachedUser);

// //         if (String(parsed.userId) === String(userId)) {
// //           hasCachedUser = true;

// //           // Avoid a needless AuthContext update if cached data is already current.
// //           if (JSON.stringify(user) !== JSON.stringify(parsed)) {
// //             setUser(parsed);
// //           }
// //         }
// //       }
// //     } catch {
// //       localStorage.removeItem(cachedUserKey);
// //     }

// //     try {
// //       const cachedStats = localStorage.getItem(cachedStatsKey);

// //       if (cachedStats) {
// //         const parsed = JSON.parse(cachedStats);

// //         setStats({
// //           totalGrandInvestment:
// //             Number(parsed.totalGrandInvestment) || 0,
// //           todayTotalInvestment:
// //             Number(parsed.todayTotalInvestment) || 0,
// //           isFetching: false,
// //         });
// //       }
// //     } catch {
// //       localStorage.removeItem(cachedStatsKey);
// //     }

// //     hasFetched.current = true;
// //     setLoading(!hasCachedUser);

// //     Promise.all([fetchUserData(), fetchStats()]).finally(() => {
// //       if (requestRef.current === currentRequest) {
// //         setLoading(false);
// //       }
// //     });

// //     return () => {
// //       if (requestRef.current === currentRequest) {
// //         requestRef.current += 1;
// //       }
// //     };
// //   // Intentionally depend only on the authenticated account identity.
// //   // setUser may update AuthContext and recreate callback references; including
// //   // those callbacks here can restart this effect and cause an update loop.
// //   // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [token, userId]);

// //   const handleRefresh = async () => {
// //     if (refreshing) return;

// //     setRefreshing(true);

// //     try {
// //       await Promise.all([fetchUserData(), fetchStats()]);
// //     } finally {
// //       setRefreshing(false);
// //     }
// //   };

// //   if (loading || !user) {
// //     return (
// //       <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#080811] text-white">
// //         <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-fuchsia-400/30 bg-fuchsia-500/[0.08] shadow-[0_0_55px_rgba(217,70,239,0.12)]">
// //           <span className="text-2xl font-black tracking-tighter text-white">
// //             Z<span className="text-cyan-300">.</span>
// //           </span>
// //           <span className="absolute -bottom-1 -right-1 h-5 w-5 animate-pulse rounded-full border-4 border-[#080811] bg-cyan-400" />
// //         </div>
// //         <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
// //           Entering your arena
// //         </p>
// //       </div>
// //     );
// //   }

// //   const displayName = user.name || "Player";

// //   const initials = displayName
// //     .trim()
// //     .split(/\s+/)
// //     .slice(0, 2)
// //     .map((part) => part[0])
// //     .join("")
// //     .toUpperCase();

// //   const referralLink =
// //     `${window.location.origin}/register?ref=${encodeURIComponent(String(user.userId))}`;

// //   return (
// //     <main className="relative min-h-screen overflow-hidden bg-[#080811] pb-28 pt-4 font-sans text-white sm:pb-12 sm:pt-7">
// //       {/* Original ambient background */}
// //       <div className="pointer-events-none absolute -left-36 top-12 h-80 w-80 rounded-full bg-fuchsia-600/[0.10] blur-[110px]" />
// //       <div className="pointer-events-none absolute -right-40 top-80 h-96 w-96 rounded-full bg-cyan-500/[0.08] blur-[120px]" />

// //       <div className="relative mx-auto max-w-7xl space-y-8  sm:px-6 lg:px-8">

// //         {/* Zoro Games AI identity */}
// //         <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
// //           <div className="flex items-center gap-3">
// //             <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-fuchsia-300/30 bg-gradient-to-br from-fuchsia-500/25 via-[#181126] to-cyan-400/10 shadow-[0_0_25px_rgba(217,70,239,0.10)]">
// //               <span className="text-2xl font-black italic tracking-tighter text-white">
// //                 Z
// //               </span>
// //               <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
// //             </div>

// //             <div>
// //               <h1 className="text-lg font-black uppercase leading-none tracking-[0.12em] sm:text-xl">
// //                 ZORO <span className="text-fuchsia-400">GAMES AI</span>
// //               </h1>
// //               <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-slate-500">
// //                 Play · Explore · Achieve
// //               </p>
// //             </div>
// //           </div>

// //           <button
// //             type="button"
// //             onClick={handleRefresh}
// //             disabled={refreshing}
// //             className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-slate-300 transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.06] hover:text-white disabled:opacity-50"
// //           >
// //             <span className={refreshing ? "animate-spin" : ""}>↻</span>
// //             {refreshing ? "Updating..." : "Sync data"}
// //           </button>
// //         </header>

// //         {/* Hero */}
// //         <section className="relative overflow-hidden rounded-[28px] border border-fuchsia-300/15 bg-gradient-to-br from-[#21112b] via-[#141321] to-[#0c1822] p-5 shadow-2xl shadow-black/30 sm:p-8 lg:p-10">
// //           <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-fuchsia-300/[0.09]" />
// //           <div className="pointer-events-none absolute right-8 top-5 h-48 w-48 rounded-full bg-fuchsia-500/[0.09] blur-3xl" />
// //           <div className="pointer-events-none absolute bottom-0 right-0 h-1 w-2/3 bg-gradient-to-r from-transparent via-fuchsia-400/60 to-cyan-300/60" />

// //           <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
// //             <div>
// //               <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-1.5">
// //                 <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
// //                 <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-200">
// //                   Your player space
// //                 </span>
// //               </div>

// //               <p className="text-sm font-medium text-slate-400">
// //                 Welcome back,
// //               </p>

// //               <h2 className="mt-2 break-words text-3xl font-black tracking-tight sm:text-5xl">
// //                 {displayName}
// //                 <span className="text-fuchsia-400">!</span>
// //               </h2>

// //               <p className="mt-4 max-w-lg text-sm leading-6 text-slate-400">
// //                 Your personal hub for account activity, packages, rewards and
// //                 community progress.
// //               </p>

// //               <button
// //                 type="button"
// //                 onClick={() =>
// //                   document.getElementById("zoro-quick-actions")?.scrollIntoView({
// //                     behavior: "smooth",
// //                     block: "center",
// //                   })
// //                 }
// //                 className="mt-6 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-5 py-3 text-xs font-extrabold text-white shadow-lg shadow-fuchsia-950/30 transition hover:brightness-110"
// //               >
// //                 Explore dashboard <span>↗</span>
// //               </button>
// //             </div>

// //             <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 md:min-w-60 md:flex-col md:items-start md:p-5">
// //               <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-700 text-lg font-black shadow-lg shadow-fuchsia-950/40">
// //                 {initials}
// //               </div>

// //               <div className="min-w-0">
// //                 <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">
// //                   Player ID
// //                 </p>
// //                 <p className="mt-1 break-all font-mono text-xl font-bold tracking-wider text-white">
// //                   {String(user.userId)}
// //                 </p>
// //                 <p className="mt-2 text-[10px] font-semibold text-cyan-300">
// //                   Account connected
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Profile
// //         <section>
// //           <SectionTitle
// //             number="01"
// //             eyebrow="Player profile"
// //             title="Your account"
// //             subtitle="Your profile information and account details."
// //           />
// //           <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10111b] p-3 sm:p-5">
// //             <UserInfoBoxes />
// //           </div>
// //         </section> */}

    
 
// //           {/* Royalty Dashboard */}
// // <section>
// //   {/* <div className="mb-4">
// //     <SectionTitle
// //       number="02"
// //       eyebrow="System royalty"
// //       title="Royalty Overview"
// //       subtitle="Total royalty collected and today's distribution."
// //     />
// //   </div> */}

// //   <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10111b] p-3 sm:p-5">
// //     <Suspense fallback={<SectionLoader />}>
// //       <RoyaltyDashboard />
// //     </Suspense>
// //   </div>
// // </section>
 
// //         {/* Earnings */}
// //         <section>
          

// //           <div className="space-y-4">
// //             <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10111b] p-3 sm:p-5">
// //               <TotalEarningBox user={user} />
// //             </div>
          
// //           </div>
// //         </section>

// //         {/* Referral */}
// //         <section>
         

// //           <div className="overflow-hidden rounded-2xl border border-fuchsia-300/15 bg-gradient-to-br from-[#1b1327] to-[#10111b] p-3 sm:p-5">
// //             <ReferralLink link={referralLink} />
// //           </div>
// //         </section>

// //         {/* Actions */}
// //         <section id="zoro-quick-actions">
          

// //           <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10111b] p-3 sm:p-5">
// //             <QuickActions
// //               onDepositClick={() => {
// //                 if (setModalState) {
// //                   setModalState((previous) => ({
// //                     ...previous,
// //                     showDeposit: true,
// //                   }));
// //                 }
// //               }}
// //             />
// //           </div>
// //         </section>

// //         {/* Investment packages */}
// //         <section>
          

// //           <div className="overflow-hidden rounded-2xl border border-fuchsia-300/15 bg-[#10111b]  shadow-xl shadow-black/20 sm:p-5">
// //             <Suspense fallback={<SectionLoader />}>
// //               <Packages />
// //             </Suspense>
// //           </div>
// //         </section>

       

       

     

      

     

// //         {/* Footer */}
// //         <footer className="border-t border-white/[0.08] pt-6 text-center">
// //           <div className="mb-3 flex items-center justify-center gap-2">
// //             <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-fuchsia-300/20 bg-fuchsia-300/[0.06] text-sm font-black italic text-fuchsia-200">
              
// //             </span>
// //             <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-300">
// //               Zoro Games AI
// //             </span>
// //           </div>

// //           <p className="text-[10px] font-medium tracking-wide text-slate-600">
// //             Your space. Your progress.
// //           </p>
// //         </footer>
// //       </div>
// //     </main>
// //   );
// // };

// // export default Dashboard;





// import React, {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
//   Suspense,
//   lazy,
// } from "react";

// import api from "../../api/axios";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// import ReferralLink from "../../components/dashboard/ReferralLink";
// import QuickActions from "../../components/dashboard/QuickActions";
// import TotalEarningBox from "../../components/dashboard/TotalEarningBox";
// import UserInfoBoxes from "../../components/dashboard/UserInfoBoxes";
// import RoyaltyDashboard from "../../components/RoyaltyDashboard";
// import TotalSystemUsers from "../../components/dashboard/TotalSystemUsers";

// const Packages = lazy(() => import("../../components/Packages"));
// const UserPackages = lazy(() => import("../../pages/user/UserPackages"));
 
// const SystemDepositHistory = lazy(
//   () => import("../../pages/user/SystemDepositHistory")
// );
 

// const formatMoney = (value) =>
//   Number(value || 0).toLocaleString("en-US", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

// const SectionLoader = () => (
//   <div className="flex min-h-32 items-center justify-center gap-3 rounded-2xl border border-white/[0.07] bg-[#10111b]">
//     <span className="h-5 w-5 animate-spin rounded-full border-2 border-fuchsia-400/20 border-t-fuchsia-400" />
//     <span className="text-xs font-medium tracking-wide text-slate-400">
//       Loading section...
//     </span>
//   </div>
// );

// const SectionTitle = ({ number, eyebrow, title, subtitle }) => (
//   <div className="mb-4 flex items-start gap-3">
//     <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/[0.07] font-mono text-xs font-bold text-fuchsia-300">
//       {number}
//     </div>
//     <div className="min-w-0">
//       <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-fuchsia-300">
//         {eyebrow}
//       </p>
//       <h2 className="mt-1 text-lg font-extrabold tracking-tight text-white sm:text-xl">
//         {title}
//       </h2>
//       {subtitle && (
//         <p className="mt-1 text-xs leading-5 text-slate-500">{subtitle}</p>
//       )}
//     </div>
//   </div>
// );

// const Dashboard = ({ modalState, setModalState }) => {
//   const { user, token, setUser, logout } = useAuth();
//   const navigate = useNavigate();

//   const hasFetched = useRef(false);
//   const requestRef = useRef(0);

//   const [loading, setLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   const [totalTopupUsersFromDB, setTotalTopupUsersFromDB] = useState(0);
// const [activeDownlineCount, setActiveDownlineCount] = useState(0);

//   const userId = user?.userId;

//   const fetchUserData = useCallback(async () => {
//     if (!token || userId === undefined || userId === null) return;

//     try {
//       const response = await api.get(
//         `/user/${encodeURIComponent(String(userId))}?t=${Date.now()}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const fetchedUser = response.data?.user;

//       setTotalTopupUsersFromDB(
//   Number(response.data?.totalTopupUsersFromDB) || 0
// );

// setActiveDownlineCount(
//   Number(response.data?.activeDownlineCount) || 0
// );

//       if (fetchedUser) {
//         setUser(fetchedUser);
//         localStorage.setItem(
//           `dash_user_${userId}`,
//           JSON.stringify(fetchedUser)
//         );
//       }
//     } catch (error) {
//       if (error?.response?.status === 401) {
//         logout();
//       } else {
//         console.error("User refresh failed:", error.message);
//       }
//     }
//   }, [token, userId, setUser, logout]);



//   useEffect(() => {
//     hasFetched.current = false;
//     requestRef.current += 1;

//     if (!token || userId === undefined || userId === null) {
//       setLoading(false);
//       return;
//     }

//     const currentRequest = requestRef.current;
//     const cachedUserKey = `dash_user_${userId}`;

//     let hasCachedUser = false;

//     try {
//       const cachedUser = localStorage.getItem(cachedUserKey);

//       if (cachedUser) {
//         const parsed = JSON.parse(cachedUser);

//         if (String(parsed.userId) === String(userId)) {
//           hasCachedUser = true;

//           // Avoid a needless AuthContext update if cached data is already current.
//           if (JSON.stringify(user) !== JSON.stringify(parsed)) {
//             setUser(parsed);
//           }
//         }
//       }
//     } catch {
//       localStorage.removeItem(cachedUserKey);
//     }


//     hasFetched.current = true;
//     setLoading(!hasCachedUser);

//     fetchUserData().finally(() => {
//       if (requestRef.current === currentRequest) {
//         setLoading(false);
//       }
//     });

//     return () => {
//       if (requestRef.current === currentRequest) {
//         requestRef.current += 1;
//       }
//     };
//   // Intentionally depend only on the authenticated account identity.
//   // setUser may update AuthContext and recreate callback references; including
//   // those callbacks here can restart this effect and cause an update loop.
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token, userId]);

//   const handleRefresh = async () => {
//     if (refreshing) return;

//     setRefreshing(true);

//     try {
//       await fetchUserData();
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   if (loading || !user) {
//     return (
//       <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#080811] text-white">
//         <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-fuchsia-400/30 bg-fuchsia-500/[0.08] shadow-[0_0_55px_rgba(217,70,239,0.12)]">
//           <span className="text-2xl font-black tracking-tighter text-white">
//             Z<span className="text-cyan-300">.</span>
//           </span>
//           <span className="absolute -bottom-1 -right-1 h-5 w-5 animate-pulse rounded-full border-4 border-[#080811] bg-cyan-400" />
//         </div>
//         <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
//           Entering your arena
//         </p>
//       </div>
//     );
//   }

//   const displayName = user.name || "Player";

//   const initials = displayName
//     .trim()
//     .split(/\s+/)
//     .slice(0, 2)
//     .map((part) => part[0])
//     .join("")
//     .toUpperCase();

//   const referralLink =
//     `${window.location.origin}/register?ref=${encodeURIComponent(String(user.userId))}`;

//   return (
//     <main className="relative min-h-screen overflow-hidden bg-[#080811] pb-28 pt-4 font-sans text-white sm:pb-12 sm:pt-7">
//       {/* Original ambient background */}
//       <div className="pointer-events-none absolute -left-36 top-12 h-80 w-80 rounded-full bg-fuchsia-600/[0.10] blur-[110px]" />
//       <div className="pointer-events-none absolute -right-40 top-80 h-96 w-96 rounded-full bg-cyan-500/[0.08] blur-[120px]" />

//       <div className="relative mx-auto max-w-7xl space-y-8  sm:px-6 lg:px-8">

//         {/* Zoro Games AI identity */}
//         <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
//           <div className="flex items-center gap-3">
//             <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-fuchsia-300/30 bg-gradient-to-br from-fuchsia-500/25 via-[#181126] to-cyan-400/10 shadow-[0_0_25px_rgba(217,70,239,0.10)]">
//               <span className="text-2xl font-black italic tracking-tighter text-white">
//                 Z
//               </span>
//               <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
//             </div>

//             <div>
//               <h1 className="text-lg font-black uppercase leading-none tracking-[0.12em] sm:text-xl">
//                 ZORO <span className="text-fuchsia-400">GAMES AI</span>
//               </h1>
//               <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-slate-500">
//                 Play · Explore · Achieve
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={handleRefresh}
//             disabled={refreshing}
//             className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-slate-300 transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.06] hover:text-white disabled:opacity-50"
//           >
//             <span className={refreshing ? "animate-spin" : ""}>↻</span>
//             {refreshing ? "Updating..." : "Sync data"}
//           </button>
//         </header>

//         {/* Hero */}
//         <section className="relative overflow-hidden rounded-[28px] border border-fuchsia-300/15 bg-gradient-to-br from-[#21112b] via-[#141321] to-[#0c1822] p-5 shadow-2xl shadow-black/30 sm:p-8 lg:p-10">
//           <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-fuchsia-300/[0.09]" />
//           <div className="pointer-events-none absolute right-8 top-5 h-48 w-48 rounded-full bg-fuchsia-500/[0.09] blur-3xl" />
//           <div className="pointer-events-none absolute bottom-0 right-0 h-1 w-2/3 bg-gradient-to-r from-transparent via-fuchsia-400/60 to-cyan-300/60" />

//           <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
//             <div>
//               <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-1.5">
//                 <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
//                 <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-200">
//                   Your player space
//                 </span>
//               </div>

//               <p className="text-sm font-medium text-slate-400">
//                 Welcome back,
//               </p>

//               <h2 className="mt-2 break-words text-3xl font-black tracking-tight sm:text-5xl">
//                 {displayName}
//                 <span className="text-fuchsia-400">!</span>
//               </h2>

//               <p className="mt-4 max-w-lg text-sm leading-6 text-slate-400">
//                 Your personal hub for account activity, packages, rewards and
//                 community progress.
//               </p>

//               <button
//                 type="button"
//                 onClick={() =>
//                   document.getElementById("zoro-quick-actions")?.scrollIntoView({
//                     behavior: "smooth",
//                     block: "center",
//                   })
//                 }
//                 className="mt-6 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-5 py-3 text-xs font-extrabold text-white shadow-lg shadow-fuchsia-950/30 transition hover:brightness-110"
//               >
//                 Explore dashboard <span>↗</span>
//               </button>
//             </div>

//             <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 md:min-w-60 md:flex-col md:items-start md:p-5">
//               <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-700 text-lg font-black shadow-lg shadow-fuchsia-950/40">
//                 {initials}
//               </div>

//               <div className="min-w-0">
//                 <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">
//                   Player ID
//                 </p>
//                 <p className="mt-1 break-all font-mono text-xl font-bold tracking-wider text-white">
//                   {String(user.userId)}
//                 </p>
//                 <p className="mt-2 text-[10px] font-semibold text-cyan-300">
//                   Account connected
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Profile
//         <section>
//           <SectionTitle
//             number="01"
//             eyebrow="Player profile"
//             title="Your account"
//             subtitle="Your profile information and account details."
//           />
//           <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10111b] p-3 sm:p-5">
//             <UserInfoBoxes />
//           </div>
//         </section> */}

    
 
//           {/* Royalty Dashboard */}
// <section>
//   {/* <div className="mb-4">
//     <SectionTitle
//       number="02"
//       eyebrow="System royalty"
//       title="Royalty Overview"
//       subtitle="Total royalty collected and today's distribution."
//     />
//   </div> */}

//   <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10111b] p-3 sm:p-5">
//     <Suspense fallback={<SectionLoader />}>
//       <RoyaltyDashboard />
//     </Suspense>
//   </div>

// </section>


// {/* TOTAL SYSTEM USERS */}
// <section>
//   <TotalSystemUsers
//     user={user}
//     totalTopupUsersFromDB={totalTopupUsersFromDB}
//     activeDownlineCount={activeDownlineCount}
//   />
// </section>
 
//         {/* Earnings */}
//         <section>
          

//           <div className="space-y-4">
//             <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10111b] p-3 sm:p-5">
//               <TotalEarningBox user={user} />
//             </div>
          
//           </div>
//         </section>

//         {/* Referral */}
//         <section>



         

//           <div className="overflow-hidden rounded-2xl border border-fuchsia-300/15 bg-gradient-to-br from-[#1b1327] to-[#10111b] p-3 sm:p-5">
//             <ReferralLink link={referralLink} />
//           </div>
//         </section>

//         {/* Actions */}
//         <section id="zoro-quick-actions">
          

//           <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10111b] p-3 sm:p-5">
//             <QuickActions
//               onDepositClick={() => {
//                 if (setModalState) {
//                   setModalState((previous) => ({
//                     ...previous,
//                     showDeposit: true,
//                   }));
//                 }
//               }}
//             />
//           </div>
//         </section>

//         {/* Investment packages */}
//         <section>
          

//           <div className="overflow-hidden rounded-2xl border border-fuchsia-300/15 bg-[#10111b]  shadow-xl shadow-black/20 sm:p-5">
//             <Suspense fallback={<SectionLoader />}>
//               <Packages />
//             </Suspense>
//           </div>
//         </section>

       

       

     

      

     

//         {/* Footer */}
//         <footer className="border-t border-white/[0.08] pt-6 text-center">
//           <div className="mb-3 flex items-center justify-center gap-2">
//             <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-fuchsia-300/20 bg-fuchsia-300/[0.06] text-sm font-black italic text-fuchsia-200">
              
//             </span>
//             <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-300">
//               Zoro Games AI
//             </span>
//           </div>

//           <p className="text-[10px] font-medium tracking-wide text-slate-600">
//             Your space. Your progress.
//           </p>
//         </footer>
//       </div>
//     </main>
//   );
// };

// export default Dashboard;




import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  Suspense,
  lazy,
} from "react";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
 

import ReferralLink from "../../components/dashboard/ReferralLink";
import QuickActions from "../../components/dashboard/QuickActions";
import TotalEarningBox from "../../components/dashboard/TotalEarningBox";
import RoyaltyDashboard from "../../components/RoyaltyDashboard";
import MyPackageEarnings from "../../components/MyPackageEarnings";

const Packages = lazy(() => import("../../components/Packages"));

const SectionLoader = () => (
  <div className="flex min-h-32 items-center justify-center gap-3 rounded-2xl border border-white/[0.07] bg-[#10111b]">
    <span className="h-5 w-5 animate-spin rounded-full border-2 border-fuchsia-400/20 border-t-fuchsia-400" />
    <span className="text-xs font-medium tracking-wide text-slate-400">
      Loading section...
    </span>
  </div>
);

const Dashboard = ({ modalState, setModalState }) => {
  const { user, token, setUser, logout } = useAuth();

  const requestRef = useRef(0);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const userId = user?.userId;

  // ==========================================
  // FETCH COMPLETE USER DATA
  // ==========================================

  const fetchUserData = useCallback(async () => {
    if (!token || userId === undefined || userId === null) {
      return;
    }

    try {
      const response = await api.get(
        `/user/${encodeURIComponent(String(userId))}?t=${Date.now()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedUser = response.data?.user;

      if (fetchedUser) {
        // Update AuthContext
        setUser(fetchedUser);

        // Save dashboard cache
        localStorage.setItem(
          `dash_user_${userId}`,
          JSON.stringify(fetchedUser)
        );
 
      } else {
        console.warn("User data missing from API response:", response.data);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        logout();
      } else {
        console.error(
          "User refresh failed:",
          error?.response?.data || error.message
        );
      }
    }
  }, [token, userId, setUser, logout]);

  // ==========================================
  // INITIAL USER LOAD
  // ==========================================

  useEffect(() => {
    requestRef.current += 1;

    if (!token || userId === undefined || userId === null) {
      setLoading(false);
      return;
    }

    const currentRequest = requestRef.current;
    const cachedUserKey = `dash_user_${userId}`;

    let hasCachedUser = false;

    try {
      const cachedUser = localStorage.getItem(cachedUserKey);

      if (cachedUser) {
        const parsed = JSON.parse(cachedUser);

        if (String(parsed.userId) === String(userId)) {
          hasCachedUser = true;

          if (JSON.stringify(user) !== JSON.stringify(parsed)) {
            setUser(parsed);
          }
        }
      }
    } catch (error) {
      console.error("Dashboard cache error:", error);
      localStorage.removeItem(cachedUserKey);
    }

    setLoading(!hasCachedUser);

    fetchUserData().finally(() => {
      if (requestRef.current === currentRequest) {
        setLoading(false);
      }
    });

    return () => {
      if (requestRef.current === currentRequest) {
        requestRef.current += 1;
      }
    };

    // Fetch only when authenticated account identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userId]);

  // ==========================================
  // MANUAL REFRESH
  // ==========================================

  const handleRefresh = async () => {
    if (refreshing) return;

    setRefreshing(true);

    try {
      await fetchUserData();
    } finally {
      setRefreshing(false);
    }
  };

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#080811] text-white">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-fuchsia-400/30 bg-fuchsia-500/[0.08] shadow-[0_0_55px_rgba(217,70,239,0.12)]">
          <span className="text-2xl font-black tracking-tighter text-white">
            Z<span className="text-cyan-300">.</span>
          </span>

          <span className="absolute -bottom-1 -right-1 h-5 w-5 animate-pulse rounded-full border-4 border-[#080811] bg-cyan-400" />
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
          Entering your arena
        </p>
      </div>
    );
  }

  // ==========================================
  // USER PROFILE DATA
  // ==========================================

  const displayName = user.name || "Player";

  const initials = displayName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const referralLink =
    `${window.location.origin}/register?ref=${encodeURIComponent(
      String(user.userId)
    )}`;

  // ==========================================
  // DASHBOARD UI
  // ==========================================

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080811] pb-28 pt-4 font-sans text-white sm:pb-12 sm:pt-7">

      {/* BACKGROUND EFFECTS */}

      <div className="pointer-events-none absolute -left-36 top-12 h-80 w-80 rounded-full bg-fuchsia-600/[0.10] blur-[110px]" />

      <div className="pointer-events-none absolute -right-40 top-80 h-96 w-96 rounded-full bg-cyan-500/[0.08] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl space-y-8 sm:px-6 lg:px-8">

        {/* HEADER */}

        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">

          
 

        </header>

        {/* HERO / PLAYER PROFILE */}

        <section className="relative overflow-hidden rounded-[28px] border border-fuchsia-300/15 bg-gradient-to-br from-[#21112b] via-[#141321] to-[#0c1822] p-5 shadow-2xl shadow-black/30 sm:p-8 lg:p-10">

          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-fuchsia-300/[0.09]" />

          <div className="pointer-events-none absolute right-8 top-5 h-48 w-48 rounded-full bg-fuchsia-500/[0.09] blur-3xl" />

          <div className="pointer-events-none absolute bottom-0 right-0 h-1 w-2/3 bg-gradient-to-r from-transparent via-fuchsia-400/60 to-cyan-300/60" />
<div className="relative grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-[1fr_auto] md:gap-8">

  {/* WELCOME BOX */}
  <div className="flex h-full min-h-[115px] min-w-0 items-center rounded-2xl border border-white/10 bg-black/20 p-3 sm:min-h-[130px] sm:p-4 md:min-h-[150px] md:rounded-2xl md:p-5">

    <div className="min-w-0">
      <p className="text-[10px] font-medium text-slate-400 sm:text-sm">
        Welcome back,
      </p>

      <h2 className="mt-1 break-words text-xl font-black tracking-tight sm:text-3xl md:text-4xl">
        {displayName}
        <span className="text-fuchsia-400">!</span>
      </h2>
    </div>

  </div>

  {/* PLAYER ID BOX */}
  <div className="flex h-full min-h-[115px] min-w-0 items-center gap-2 rounded-2xl border border-white/10 bg-black/20 p-3 sm:min-h-[130px] sm:gap-3 sm:p-4 md:min-h-[150px] md:min-w-60 md:p-5">

    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-700 text-sm font-black shadow-lg shadow-fuchsia-950/40 sm:h-11 sm:w-11 sm:rounded-2xl md:h-14 md:w-14 md:text-lg">
      {initials}
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-[8px] font-bold uppercase tracking-[0.13em] text-slate-500 sm:text-[9px] sm:tracking-[0.2em]">
        Player ID
      </p>

      <p className="mt-1 break-all font-mono text-[12px] font-bold tracking-wide text-white sm:text-base md:text-xl">
        {String(user.userId)}
      </p>

      <p className="mt-1 text-[8px] font-semibold text-cyan-300 sm:text-[10px] md:mt-2">
        Account connected
      </p>
    </div>

  </div>

</div>
        </section>

        {/* ROYALTY DASHBOARD */}

        <section>

          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10111b] p-3 sm:p-5">

            <Suspense fallback={<SectionLoader />}>
              <RoyaltyDashboard />
            </Suspense>

          </div>

        </section>

        {/* NEW: MY PACKAGE & EARNINGS */}

        <section id="my-package-earnings">

          <MyPackageEarnings user={user} />

        </section>

        {/* EARNINGS OVERVIEW */}

        <section>

          <div className="space-y-4">

            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10111b] p-3 sm:p-5">

              <TotalEarningBox user={user} />

            </div>

          </div>

        </section>

        {/* REFERRAL LINK */}

        <section>

          <div className="overflow-hidden rounded-2xl border border-fuchsia-300/15 bg-gradient-to-br from-[#1b1327] to-[#10111b] p-3 sm:p-5">

            <ReferralLink link={referralLink} />

          </div>

        </section>

        {/* QUICK ACTIONS */}

        <section id="zoro-quick-actions">

          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10111b] p-3 sm:p-5">

            <QuickActions
              onDepositClick={() => {
                if (setModalState) {
                  setModalState((previous) => ({
                    ...previous,
                    showDeposit: true,
                  }));
                }
              }}
            />

          </div>

        </section>

        {/* INVESTMENT PACKAGES */}

        <section>

          <div className="overflow-hidden rounded-2xl border border-fuchsia-300/15 bg-[#10111b] shadow-xl shadow-black/20 sm:p-5">

            <Suspense fallback={<SectionLoader />}>
              <Packages />
            </Suspense>

          </div>

        </section>

        {/* FOOTER */}

        <footer className="border-t border-white/[0.08] pt-6 text-center">

          <div className="mb-3 flex items-center justify-center gap-2">

            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-fuchsia-300/20 bg-fuchsia-300/[0.06] text-sm font-black italic text-fuchsia-200">
              Z
            </span>

            <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-300">
              Zoro Games AI
            </span>

          </div>

          <p className="text-[10px] font-medium tracking-wide text-slate-600">
            Your space. Your progress.
          </p>

        </footer>

      </div>
    </main>
  );
};

export default Dashboard;
