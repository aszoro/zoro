// // import React, { useEffect, useState } from "react";
// // import api from "../../api/axios";
// // import { getUserId } from "../../utils/authUtils"; 
// // import { DollarSign, TrendingUp, Users, Calendar, Layers, BarChart } from "lucide-react";

// // const DownlineBusiness = () => {
// //   const userId = getUserId(); 
// //   const [transactions, setTransactions] = useState([]);
// //   const [filtered, setFiltered] = useState([]);
// //   const [typeFilter, setTypeFilter] = useState("All");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [entriesPerPage, setEntriesPerPage] = useState(10);
// //   const [loading, setLoading] = useState(true);
  
// //   // Date Filters
// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");

// //   // Stats States
// //   const [stats, setStats] = useState({
// //     totalDirect: 0, todayDirect: 0,
// //     totalLevel: 0, todayLevel: 0
// //   });

// //   useEffect(() => {
// //     if (!userId) {
// //       setLoading(false);
// //       return;
// //     }

// //     setLoading(true);
// //     api.get(`/user/downline-business`)
// //       .then((res) => {
// //         if (res.data.success) {
// //           setTransactions(res.data.data || []);
// //           setFiltered(res.data.data || []);
// //           setStats(res.data.stats || {
// //             totalDirect: 0, todayDirect: 0,
// //             totalLevel: 0, todayLevel: 0
// //           });
// //         }
// //       })
// //       .catch((err) => {
// //         console.error("Failed to fetch Downline Business", err);
// //       })
// //       .finally(() => {
// //         setLoading(false);
// //       });
// //   }, [userId]);

// //   // Filtering Logic
// //   useEffect(() => {
// //     let result = transactions;

// //     // Date Filter
// //     if (startDate || endDate) {
// //       result = result.filter(txn => {
// //         const txnDate = new Date(txn.date);
// //         txnDate.setHours(0, 0, 0, 0); 
// //         const sDate = startDate ? new Date(startDate) : null;
// //         if (sDate) sDate.setHours(0, 0, 0, 0);
// //         const eDate = endDate ? new Date(endDate) : null;
// //         if (eDate) eDate.setHours(23, 59, 59, 999);

// //         if (sDate && eDate) return txnDate >= sDate && txnDate <= eDate;
// //         if (sDate) return txnDate >= sDate;
// //         if (eDate) return txnDate <= eDate;
// //         return true;
// //       });
// //     }

// //     // Type Filter (Direct vs Team)
// //     if (typeFilter !== "All") {
// //       result = result.filter(txn => txn.type === typeFilter);
// //     }

// //     setFiltered(result);
// //     setCurrentPage(1); 
// //   }, [startDate, endDate, typeFilter, transactions]);

// //   const handleEntriesChange = (e) => {
// //     setEntriesPerPage(Number(e.target.value));
// //     setCurrentPage(1);
// //   };

// //   const totalPages = Math.ceil(filtered.length / entriesPerPage) || 1;
// //   const indexOfLast = currentPage * entriesPerPage;
// //   const indexOfFirst = indexOfLast - entriesPerPage;
// //   const paginated = filtered.slice(indexOfFirst, indexOfLast);

// //   const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);
// //   const handleNext = () => currentPage < totalPages && setCurrentPage((p) => p + 1);

// //   return (
// //     <div className="w-full min-h-screen bg-[#0b1221] p-4 md:p-8 font-sans">
      
// //       <div className="max-w-7xl mx-auto bg-[#131c31] rounded-xl border-t-[3px] border-[#eab308] shadow-2xl p-4 sm:p-6">
        
// //         <div className="mb-6">
// //           <h2 className="text-2xl sm:text-3xl text-[#eab308] font-bold tracking-wide flex items-center gap-3">
// //              Team Business Report
// //           </h2>
// //          </div>

// //         {/* 4 STATS CARDS GRID */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// //           <div className="bg-[#0b1221] border border-[#eab308]/30 p-5 rounded-xl flex items-center gap-4 hover:border-[#eab308] transition-colors">
// //             <div className="p-3 bg-[#eab308]/10 rounded-lg text-[#eab308]"><TrendingUp size={24} /></div>
// //             <div>
// //               <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Today's Direct Biz</p>
// //               <h3 className="text-2xl text-white font-black flex items-center mt-1">
// //                 <DollarSign size={20} className="text-[#eab308] mr-0.5" />{stats.todayDirect.toFixed(2)}
// //               </h3>
// //             </div>
// //           </div>

// //           <div className="bg-gradient-to-br from-[#eab308]/10 to-[#0b1221] border border-[#eab308]/50 p-5 rounded-xl flex items-center gap-4 shadow-sm">
// //             <div className="p-3 bg-[#eab308]/20 rounded-lg text-[#eab308]"><Users size={24} /></div>
// //             <div>
// //               <p className="text-[#eab308] text-xs font-bold uppercase tracking-wider">Total Direct Biz</p>
// //               <h3 className="text-2xl text-white font-black flex items-center mt-1">
// //                 <DollarSign size={20} className="text-[#eab308] mr-0.5" />{stats.totalDirect.toFixed(2)}
// //               </h3>
// //             </div>
// //           </div>

// //           <div className="bg-[#0b1221] border border-purple-500/30 p-5 rounded-xl flex items-center gap-4 hover:border-purple-500 transition-colors">
// //             <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400"><TrendingUp size={24} /></div>
// //             <div>
// //               <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Today's Team Biz</p>
// //               <h3 className="text-2xl text-white font-black flex items-center mt-1">
// //                 <DollarSign size={20} className="text-[#eab308] mr-0.5" />{stats.todayLevel.toFixed(2)}
// //               </h3>
// //             </div>
// //           </div>

// //           <div className="bg-gradient-to-br from-purple-500/10 to-[#0b1221] border border-purple-500/50 p-5 rounded-xl flex items-center gap-4 shadow-sm">
// //             <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400"><Layers size={24} /></div>
// //             <div>
// //               <p className="text-purple-400 text-xs font-bold uppercase tracking-wider">Total Team Biz</p>
// //               <h3 className="text-2xl text-white font-black flex items-center mt-1">
// //                 <DollarSign size={20} className="text-[#eab308] mr-0.5" />{stats.totalLevel.toFixed(2)}
// //               </h3>
// //             </div>
// //           </div>
// //         </div>

// //         {/* FILTER SECTION */}
// //         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 text-gray-300 text-sm border-t border-gray-800 pt-6">
// //           <div className="flex items-center gap-2">
// //             <span>Show</span>
// //             <select value={entriesPerPage} onChange={handleEntriesChange} className="bg-[#0b1221] border border-gray-700 text-[#eab308] rounded px-3 py-1.5 focus:outline-none">
// //               <option value={10}>10</option><option value={25}>25</option><option value={50}>50</option>
// //             </select>
// //             <span>entries</span>
// //           </div>

// //           <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
// //             {/* Type Filter */}
// //             <div className="flex items-center gap-2 bg-[#0b1221] border border-gray-700 rounded-lg px-3 py-1.5 w-full sm:w-auto">
// //               <BarChart size={16} className="text-[#eab308]" />
// //               <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="bg-transparent text-gray-200 outline-none text-xs sm:text-sm w-full cursor-pointer">
// //                 <option value="All">All Business</option>
// //                 <option value="Direct Business">Direct Business Only</option>
// //                 <option value="Team Business">Team Business Only</option>
// //               </select>
// //             </div>

// //             {/* Date Filters */}
// //             <div className="flex items-center gap-2 bg-[#0b1221] border border-gray-700 rounded-lg px-3 py-1.5 w-full sm:w-auto">
// //               <Calendar size={16} className="text-[#eab308]" />
// //               <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-transparent text-gray-200 outline-none text-xs sm:text-sm w-full"/>
// //               <span className="text-gray-500 px-1">to</span>
// //               <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-transparent text-gray-200 outline-none text-xs sm:text-sm w-full"/>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Table Container */}
// //         <div className="overflow-x-auto border border-gray-700 rounded-lg">
// //           <table className="w-full text-left whitespace-nowrap border-collapse">
// //             <thead className="text-[#eab308] bg-[#1a253e] text-sm border-b border-gray-700">
// //               <tr>
// //                 <th className="p-4 border-r border-gray-700/50 font-bold text-center w-16">Sr.</th>
// //                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Date</th>
// //                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Business Type</th>
// //                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Total Business Amount</th>
// //               </tr>
// //             </thead>
            
// //             <tbody className="text-gray-300 text-sm">
// //               {loading ? (
// //                 <tr>
// //                   <td colSpan="4" className="text-center py-12 text-[#eab308]">
// //                     <div className="animate-spin h-8 w-8 mx-auto mb-3 border-4 border-t-transparent border-[#eab308] rounded-full"></div>
// //                     Loading Business Data...
// //                   </td>
// //                 </tr>
// //               ) : paginated.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="4" className="text-center py-12 text-gray-500">
// //                     No Business found for selected filters.
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 paginated.map((txn, idx) => {
// //                   const date = new Date(txn.date);
// //                   const isDirect = txn.type === "Direct Business";
                  
// //                   return (
// //                     <tr key={txn._id || idx} className="border-b border-gray-700 hover:bg-[#1a253e] transition-colors">
// //                       <td className="p-4 border-r border-gray-700/50 text-center font-medium">
// //                         {indexOfFirst + idx + 1}
// //                       </td>
// //                       <td className="p-4 border-r border-gray-700/50 text-center font-medium">
// //                         {date.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}
// //                       </td>
// //                       <td className="p-4 border-r border-gray-700/50 text-center">
// //                         {isDirect ? (
// //                            <span className="bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/20 px-4 py-1.5 rounded text-xs font-bold tracking-wider uppercase">Direct Business</span>
// //                         ) : (
// //                            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-4 py-1.5 rounded text-xs font-bold tracking-wider uppercase">Team Business</span>
// //                         )}
// //                       </td>
// //                       <td className="p-4 font-black text-center text-green-400 text-base">
// //                         ${Number(txn.amount).toFixed(2)}
// //                       </td>
// //                     </tr>
// //                   );
// //                 })
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Pagination */}
// //         {!loading && filtered.length > 0 && (
// //           <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-gray-400 text-sm gap-4">
// //             <div>
// //               Showing <span className="text-white font-medium">{indexOfFirst + 1}</span> to <span className="text-white font-medium">{Math.min(indexOfLast, filtered.length)}</span> of <span className="text-white font-medium">{filtered.length}</span> entries
// //             </div>
            
// //             <div className="flex items-center bg-[#0b1221] rounded border border-gray-700 overflow-hidden">
// //               <button onClick={handlePrev} disabled={currentPage === 1} className={`px-4 py-2 transition-colors ${currentPage === 1 ? 'text-gray-600 bg-transparent cursor-not-allowed' : 'text-[#eab308] hover:bg-[#1a253e]'}`}>Previous</button>
// //               <div className="px-4 py-2 border-l border-r border-gray-700 bg-[#1a253e] text-[#eab308] font-bold">{currentPage}</div>
// //               <button onClick={handleNext} disabled={currentPage === totalPages || totalPages === 0} className={`px-4 py-2 transition-colors ${currentPage === totalPages || totalPages === 0 ? 'text-gray-600 bg-transparent cursor-not-allowed' : 'text-[#eab308] hover:bg-[#1a253e]'}`}>Next</button>
// //             </div>
// //           </div>
// //         )}

// //       </div>
// //     </div>
// //   );
// // };

// // export default DownlineBusiness;


// import React, { useEffect, useMemo, useState } from "react";
// import api from "../../api/axios";
// import { getUserId } from "../../utils/authUtils";
// import {
//   DollarSign,
//   TrendingUp,
//   Users,
//   CalendarDays,
//   Layers,
//   BarChart3,
//   RefreshCw,
//   ChevronLeft,
//   ChevronRight,
//   Filter,
//   X,
//   Activity,
// } from "lucide-react";

// const EMPTY_STATS = {
//   totalDirect: 0,
//   todayDirect: 0,
//   totalLevel: 0,
//   todayLevel: 0,
// };

// const safeNumber = (value) => {
//   const number = Number(value);
//   return Number.isFinite(number) ? number : 0;
// };

// const formatAmount = (value) =>
//   safeNumber(value).toLocaleString("en-US", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

// const formatDate = (value) => {
//   if (!value) return "—";
//   const date = new Date(value);
//   return Number.isNaN(date.getTime())
//     ? "—"
//     : date.toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       });
// };

// const DownlineBusiness = () => {
//   const userId = getUserId();
//   const [transactions, setTransactions] = useState([]);
//   const [typeFilter, setTypeFilter] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [stats, setStats] = useState(EMPTY_STATS);

//   const fetchBusiness = async () => {
//     if (!userId) {
//       setTransactions([]);
//       setStats(EMPTY_STATS);
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setError("");
//     try {
//       const response = await api.get("/user/downline-business");
//       if (response?.data?.success) {
//         setTransactions(Array.isArray(response.data.data) ? response.data.data : []);
//         setStats({ ...EMPTY_STATS, ...(response.data.stats || {}) });
//       } else {
//         setTransactions([]);
//         setStats(EMPTY_STATS);
//         setError(response?.data?.message || "Could not load business records.");
//       }
//     } catch (fetchError) {
//       console.error("Failed to fetch Downline Business", fetchError);
//       setError("Unable to load business records. Please try again.");
//       setTransactions([]);
//       setStats(EMPTY_STATS);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBusiness();
//     // Fetch when this page mounts or the authenticated ID changes.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userId]);

//   const filtered = useMemo(() => {
//     let result = [...transactions];

//     if (startDate || endDate) {
//       result = result.filter((transaction) => {
//         const date = new Date(transaction.date);
//         if (Number.isNaN(date.getTime())) return false;

//         const dateOnly = new Date(date);
//         dateOnly.setHours(0, 0, 0, 0);

//         if (startDate) {
//           const start = new Date(`${startDate}T00:00:00`);
//           if (dateOnly < start) return false;
//         }

//         if (endDate) {
//           const end = new Date(`${endDate}T23:59:59.999`);
//           if (dateOnly > end) return false;
//         }

//         return true;
//       });
//     }

//     if (typeFilter !== "All") {
//       result = result.filter((transaction) => transaction.type === typeFilter);
//     }

//     return result;
//   }, [transactions, startDate, endDate, typeFilter]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [startDate, endDate, typeFilter, entriesPerPage]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / entriesPerPage));
//   const safePage = Math.min(currentPage, totalPages);
//   const indexOfFirst = (safePage - 1) * entriesPerPage;
//   const indexOfLast = Math.min(indexOfFirst + entriesPerPage, filtered.length);
//   const paginated = filtered.slice(indexOfFirst, indexOfLast);

//   const clearFilters = () => {
//     setStartDate("");
//     setEndDate("");
//     setTypeFilter("All");
//   };

//   return (
//     <main className="min-h-screen w-full bg-[#080811] px-3 py-5 font-sans text-slate-100 sm:px-5 sm:py-8 lg:px-8">
//       <section className="mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border border-violet-500/20 bg-[#10101d] shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
//         <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400" />

//         <div className="p-4 sm:p-6 lg:p-8">
//           <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//             <div>
//               <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-violet-200">
//                 <Activity size={14} />
//                 BUSINESS ANALYTICS
//               </span>
//               <h1 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
//                 <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
//                   <BarChart3 size={23} />
//                 </span>
//                 Team Business Report
//               </h1>
//               <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
//                 Track direct and team business performance and review records by date or business type.
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={fetchBusiness}
//               disabled={loading}
//               className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-xl border border-violet-400/25 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-200 transition hover:border-violet-300/50 hover:bg-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50 md:self-center"
//             >
//               <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
//               Refresh
//             </button>
//           </div>

//           <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
//             <div className="rounded-xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-[#151525] p-4 sm:p-5">
//               <div className="flex items-center justify-between gap-3">
//                 <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Today's Direct Biz</p>
//                 <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
//                   <TrendingUp size={19} />
//                 </span>
//               </div>
//               <p className="mt-4 flex items-center text-2xl font-extrabold tabular-nums text-white sm:text-3xl">
//                 <DollarSign size={21} className="mr-0.5 text-violet-300" />
//                 {formatAmount(stats.todayDirect)}
//               </p>
//             </div>

//             <div className="rounded-xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/10 to-[#151525] p-4 sm:p-5">
//               <div className="flex items-center justify-between gap-3">
//                 <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Direct Biz</p>
//                 <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-400/10 text-fuchsia-300">
//                   <Users size={19} />
//                 </span>
//               </div>
//               <p className="mt-4 flex items-center text-2xl font-extrabold tabular-nums text-white sm:text-3xl">
//                 <DollarSign size={21} className="mr-0.5 text-fuchsia-300" />
//                 {formatAmount(stats.totalDirect)}
//               </p>
//             </div>

//             <div className="rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-[#151525] p-4 sm:p-5">
//               <div className="flex items-center justify-between gap-3">
//                 <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Today's Team Biz</p>
//                 <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
//                   <TrendingUp size={19} />
//                 </span>
//               </div>
//               <p className="mt-4 flex items-center text-2xl font-extrabold tabular-nums text-white sm:text-3xl">
//                 <DollarSign size={21} className="mr-0.5 text-cyan-300" />
//                 {formatAmount(stats.todayLevel)}
//               </p>
//             </div>

//             <div className="rounded-xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-[#151525] p-4 sm:p-5">
//               <div className="flex items-center justify-between gap-3">
//                 <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Team Biz</p>
//                 <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
//                   <Layers size={19} />
//                 </span>
//               </div>
//               <p className="mt-4 flex items-center text-2xl font-extrabold tabular-nums text-white sm:text-3xl">
//                 <DollarSign size={21} className="mr-0.5 text-emerald-300" />
//                 {formatAmount(stats.totalLevel)}
//               </p>
//             </div>
//           </div>

//           <div className="mt-7 rounded-xl border border-white/10 bg-[#151525] p-4 sm:p-5">
//             <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
//               <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
//                 <Filter size={16} className="text-violet-300" />
//                 Filter business records
//               </div>
//               {(startDate || endDate || typeFilter !== "All") && (
//                 <button
//                   type="button"
//                   onClick={clearFilters}
//                   className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-violet-200 transition hover:bg-violet-500/10"
//                 >
//                   <X size={14} />
//                   Clear filters
//                 </button>
//               )}
//             </div>

//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
//               <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-400">
//                 Rows per page
//                 <select
//                   value={entriesPerPage}
//                   onChange={(event) => setEntriesPerPage(Number(event.target.value))}
//                   className="h-11 w-full rounded-lg border border-white/10 bg-[#0b0b16] px-3 text-sm text-slate-100 outline-none focus:border-violet-400/60"
//                 >
//                   <option value={10}>10 entries</option>
//                   <option value={25}>25 entries</option>
//                   <option value={50}>50 entries</option>
//                 </select>
//               </label>

//               <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-400">
//                 Business type
//                 <select
//                   value={typeFilter}
//                   onChange={(event) => setTypeFilter(event.target.value)}
//                   className="h-11 w-full rounded-lg border border-white/10 bg-[#0b0b16] px-3 text-sm text-slate-100 outline-none focus:border-violet-400/60"
//                 >
//                   <option value="All">All business</option>
//                   <option value="Direct Business">Direct business only</option>
//                   <option value="Team Business">Team business only</option>
//                 </select>
//               </label>

//               <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-400">
//                 From date
//                 <span className="relative">
//                   <CalendarDays size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-violet-300" />
//                   <input
//                     type="date"
//                     value={startDate}
//                     max={endDate || undefined}
//                     onChange={(event) => setStartDate(event.target.value)}
//                     className="h-11 w-full rounded-lg border border-white/10 bg-[#0b0b16] pl-9 pr-3 text-sm text-slate-100 outline-none focus:border-violet-400/60"
//                   />
//                 </span>
//               </label>

//               <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-400">
//                 To date
//                 <span className="relative">
//                   <CalendarDays size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cyan-300" />
//                   <input
//                     type="date"
//                     value={endDate}
//                     min={startDate || undefined}
//                     onChange={(event) => setEndDate(event.target.value)}
//                     className="h-11 w-full rounded-lg border border-white/10 bg-[#0b0b16] pl-9 pr-3 text-sm text-slate-100 outline-none focus:border-cyan-400/60"
//                   />
//                 </span>
//               </label>
//             </div>
//           </div>

//           <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
//             <p>
//               Showing <span className="font-semibold text-white">{filtered.length === 0 ? 0 : indexOfFirst + 1}</span>
//               {" "}to <span className="font-semibold text-white">{indexOfLast}</span>
//               {" "}of <span className="font-semibold text-white">{filtered.length}</span> records
//             </p>
//             <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400">
//               <Activity size={13} className="text-cyan-300" />
//               {filtered.length} matching record{filtered.length === 1 ? "" : "s"}
//             </span>
//           </div>

//           <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[680px] border-collapse text-left">
//                 <thead>
//                   <tr className="border-b border-white/10 bg-[#19182a] text-xs uppercase tracking-wider text-violet-200">
//                     <th className="px-5 py-4 text-center font-bold">Sr.</th>
//                     <th className="px-5 py-4 font-bold">Date</th>
//                     <th className="px-5 py-4 font-bold">Business type</th>
//                     <th className="px-5 py-4 text-right font-bold">Business amount</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-white/[0.06] text-sm text-slate-300">
//                   {loading ? (
//                     <tr>
//                       <td colSpan={4} className="px-5 py-14 text-center">
//                         <span className="mx-auto mb-3 block h-8 w-8 animate-spin rounded-full border-2 border-violet-400/30 border-t-violet-300" />
//                         <span className="text-sm font-medium text-violet-200">Loading business records...</span>
//                       </td>
//                     </tr>
//                   ) : error ? (
//                     <tr>
//                       <td colSpan={4} className="px-5 py-12 text-center">
//                         <p className="font-semibold text-rose-300">{error}</p>
//                         <button
//                           type="button"
//                           onClick={fetchBusiness}
//                           className="mt-4 rounded-lg border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200 hover:bg-rose-500/20"
//                         >
//                           Try again
//                         </button>
//                       </td>
//                     </tr>
//                   ) : paginated.length === 0 ? (
//                     <tr>
//                       <td colSpan={4} className="px-5 py-14 text-center">
//                         <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-500">
//                           <BarChart3 size={22} />
//                         </div>
//                         <p className="font-semibold text-slate-200">No business records found</p>
//                         <p className="mt-1 text-xs text-slate-500">Adjust the date or business type filters and try again.</p>
//                       </td>
//                     </tr>
//                   ) : (
//                     paginated.map((transaction, index) => {
//                       const isDirect = transaction.type === "Direct Business";
//                       return (
//                         <tr
//                           key={transaction._id || `${transaction.date || "business"}-${index}`}
//                           className="transition-colors hover:bg-violet-500/[0.06]"
//                         >
//                           <td className="px-5 py-4 text-center font-semibold text-slate-500">
//                             {indexOfFirst + index + 1}
//                           </td>
//                           <td className="px-5 py-4 whitespace-nowrap text-slate-300">
//                             {formatDate(transaction.date)}
//                           </td>
//                           <td className="px-5 py-4">
//                             <span
//                               className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide ${
//                                 isDirect
//                                   ? "border-violet-400/20 bg-violet-400/10 text-violet-200"
//                                   : "border-cyan-400/20 bg-cyan-400/10 text-cyan-200"
//                               }`}
//                             >
//                               {isDirect ? <Users size={13} /> : <Layers size={13} />}
//                               {transaction.type || "Team Business"}
//                             </span>
//                           </td>
//                           <td className="px-5 py-4 text-right">
//                             <span className="font-bold tabular-nums text-emerald-300">
//                               ${formatAmount(transaction.amount)}
//                             </span>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {!loading && !error && filtered.length > 0 && (
//             <div className="mt-5 flex flex-col gap-4 border-t border-white/[0.06] pt-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
//               <p>
//                 Page <span className="font-semibold text-white">{safePage}</span> of{" "}
//                 <span className="font-semibold text-white">{totalPages}</span>
//               </p>
//               <div className="flex items-center gap-2 self-start sm:self-auto">
//                 <button
//                   type="button"
//                   onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
//                   disabled={safePage <= 1}
//                   className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-white/10 bg-[#151525] px-3 text-sm font-semibold text-slate-300 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-200 disabled:cursor-not-allowed disabled:opacity-40"
//                 >
//                   <ChevronLeft size={16} />
//                   Previous
//                 </button>
//                 <span className="flex h-10 min-w-20 items-center justify-center rounded-lg border border-violet-400/20 bg-violet-500/10 px-3 font-bold text-violet-200">
//                   {safePage} / {totalPages}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
//                   disabled={safePage >= totalPages}
//                   className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-white/10 bg-[#151525] px-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
//                 >
//                   Next
//                   <ChevronRight size={16} />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default DownlineBusiness;



import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import { getUserId } from "../../utils/authUtils";
import {
  DollarSign,
  TrendingUp,
  Users,
  CalendarDays,
  Layers,
  BarChart3,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Activity,
  ArrowUpRight,
  BriefcaseBusiness,
  Clock3,
  RotateCcw,
} from "lucide-react";

const EMPTY_STATS = {
  totalDirect: 0,
  todayDirect: 0,
  totalLevel: 0,
  todayLevel: 0,
};

const safeNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const formatAmount = (value) =>
  safeNumber(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};

const DownlineBusiness = () => {
  const userId = getUserId();
  const [transactions, setTransactions] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stats, setStats] = useState(EMPTY_STATS);

  const fetchBusiness = async () => {
    if (!userId) {
      setTransactions([]);
      setStats(EMPTY_STATS);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await api.get("/user/downline-business");
      if (response?.data?.success) {
        setTransactions(
          Array.isArray(response.data.data) ? response.data.data : []
        );
        setStats({ ...EMPTY_STATS, ...(response.data.stats || {}) });
      } else {
        setTransactions([]);
        setStats(EMPTY_STATS);
        setError(response?.data?.message || "Could not load business records.");
      }
    } catch (fetchError) {
      console.error("Failed to fetch Downline Business", fetchError);
      setError("Unable to load business records. Please try again.");
      setTransactions([]);
      setStats(EMPTY_STATS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusiness();
    // Fetch when this page mounts or the authenticated ID changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const filtered = useMemo(() => {
    let result = [...transactions];

    if (startDate || endDate) {
      result = result.filter((transaction) => {
        const date = new Date(transaction.date);
        if (Number.isNaN(date.getTime())) return false;

        const dateOnly = new Date(date);
        dateOnly.setHours(0, 0, 0, 0);

        if (startDate) {
          const start = new Date(`${startDate}T00:00:00`);
          if (dateOnly < start) return false;
        }

        if (endDate) {
          const end = new Date(`${endDate}T23:59:59.999`);
          if (dateOnly > end) return false;
        }

        return true;
      });
    }

    if (typeFilter !== "All") {
      result = result.filter((transaction) => transaction.type === typeFilter);
    }

    return result;
  }, [transactions, startDate, endDate, typeFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [startDate, endDate, typeFilter, entriesPerPage]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / entriesPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const indexOfFirst = (safePage - 1) * entriesPerPage;
  const indexOfLast = Math.min(indexOfFirst + entriesPerPage, filtered.length);
  const paginated = filtered.slice(indexOfFirst, indexOfLast);

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setTypeFilter("All");
  };

  const businessCards = [
    {
      title: "Direct · Today",
      value: stats.todayDirect,
      icon: TrendingUp,
      color: "text-sky-300",
      iconBg: "bg-sky-400/10",
      border: "border-sky-400/20",
      caption: "Today's direct business",
    },
    {
      title: "Direct · Total",
      value: stats.totalDirect,
      icon: Users,
      color: "text-violet-300",
      iconBg: "bg-violet-400/10",
      border: "border-violet-400/20",
      caption: "All-time direct business",
    },
    {
      title: "Team · Today",
      value: stats.todayLevel,
      icon: Activity,
      color: "text-teal-300",
      iconBg: "bg-teal-400/10",
      border: "border-teal-400/20",
      caption: "Today's team business",
    },
    {
      title: "Team · Total",
      value: stats.totalLevel,
      icon: Layers,
      color: "text-amber-300",
      iconBg: "bg-amber-400/10",
      border: "border-amber-400/20",
      caption: "All-time team business",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-[#090b12] px-3 py-5 pb-24 font-sans text-slate-100 sm:px-5 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-12 w-1.5 rounded-full bg-gradient-to-b from-violet-300 to-cyan-300" />
            <div>
              <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-violet-300">
                <BriefcaseBusiness size={14} />
                Network / Business ledger
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                Business Overview
              </h1>
              <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-400">
                Monitor direct and team business activity and review each recorded entry.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={fetchBusiness}
            disabled={loading}
            className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-violet-300/40 hover:bg-violet-300/[0.08] disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Reload data
          </button>
        </header>

        <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {businessCards.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className={`rounded-xl border ${item.border} bg-[#10141e] p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-[#131925] sm:p-5`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-400">{item.title}</p>
                    <p className="mt-3 flex items-baseline gap-1 text-2xl font-extrabold tracking-tight text-white">
                      <span className="text-base font-semibold text-slate-500">$</span>
                      <span className="tabular-nums">{formatAmount(item.value)}</span>
                    </p>
                  </div>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.iconBg} ${item.color}`}>
                    <Icon size={19} />
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-1.5 border-t border-white/[0.07] pt-3 text-[11px] text-slate-500">
                  <Clock3 size={12} />
                  {item.caption}
                </div>
              </article>
            );
          })}
        </section>

        <section className="overflow-hidden rounded-xl border border-white/10 bg-[#0e121b]">
          <div className="flex flex-col gap-3 border-b border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-400/10 text-violet-300">
                  <BarChart3 size={16} />
                </div>
                <h2 className="text-base font-bold text-white">Business activity</h2>
              </div>
              <p className="mt-1 pl-10 text-xs text-slate-500">
                Narrow the list by business category or a date range.
              </p>
            </div>
            {(startDate || endDate || typeFilter !== "All") && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center justify-center gap-1.5 self-start rounded-md border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-rose-400/30 hover:bg-rose-400/[0.06] hover:text-rose-200 sm:self-auto"
              >
                <RotateCcw size={13} />
                Reset filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 border-b border-white/10 bg-white/[0.015] p-4 sm:grid-cols-2 xl:grid-cols-[150px_1.1fr_1fr_1fr] sm:p-5">
            <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Per page
              <select
                value={entriesPerPage}
                onChange={(event) => setEntriesPerPage(Number(event.target.value))}
                className="h-10 w-full rounded-lg border border-white/10 bg-[#090d15] px-3 text-sm font-medium normal-case tracking-normal text-slate-200 outline-none focus:border-violet-300/50"
              >
                <option value={10}>10 entries</option>
                <option value={25}>25 entries</option>
                <option value={50}>50 entries</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Business category
              <select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
                className="h-10 w-full rounded-lg border border-white/10 bg-[#090d15] px-3 text-sm font-medium normal-case tracking-normal text-slate-200 outline-none focus:border-violet-300/50"
              >
                <option value="All">All business</option>
                <option value="Direct Business">Direct business only</option>
                <option value="Team Business">Team business only</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              From date
              <span className="relative">
                <CalendarDays size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-violet-300" />
                <input
                  type="date"
                  value={startDate}
                  max={endDate || undefined}
                  onChange={(event) => setStartDate(event.target.value)}
                  className="h-10 w-full rounded-lg border border-white/10 bg-[#090d15] pl-9 pr-3 text-sm font-medium normal-case tracking-normal text-slate-200 outline-none focus:border-violet-300/50"
                />
              </span>
            </label>

            <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              To date
              <span className="relative">
                <CalendarDays size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cyan-300" />
                <input
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(event) => setEndDate(event.target.value)}
                  className="h-10 w-full rounded-lg border border-white/10 bg-[#090d15] pl-9 pr-3 text-sm font-medium normal-case tracking-normal text-slate-200 outline-none focus:border-cyan-300/50"
                />
              </span>
            </label>
          </div>

          <div className="flex flex-col gap-2 px-4 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p>
              Showing{" "}
              <span className="font-bold text-slate-200">
                {filtered.length === 0 ? 0 : indexOfFirst + 1}–{indexOfLast}
              </span>{" "}
              of <span className="font-bold text-slate-200">{filtered.length}</span> entries
            </p>
            <span className="inline-flex items-center gap-1.5 self-start rounded-md bg-white/[0.04] px-2.5 py-1.5 text-slate-400 sm:self-auto">
              <Filter size={12} className="text-violet-300" />
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[660px] border-collapse text-left">
              <thead>
                <tr className="border-y border-white/10 bg-[#151b28] text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  <th className="w-16 px-4 py-4 text-center font-bold">No.</th>
                  <th className="px-4 py-4 font-bold">Recorded on</th>
                  <th className="px-4 py-4 font-bold">Business source</th>
                  <th className="px-5 py-4 text-right font-bold">Business volume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-14 text-center">
                      <span className="mx-auto mb-3 block h-8 w-8 animate-spin rounded-full border-2 border-violet-300/20 border-t-violet-300" />
                      <span className="text-sm font-medium text-slate-300">Loading business activity…</span>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center">
                      <p className="font-semibold text-rose-300">{error}</p>
                      <button
                        type="button"
                        onClick={fetchBusiness}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-rose-400/25 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-400/15"
                      >
                        <RefreshCw size={14} />
                        Retry request
                      </button>
                    </td>
                  </tr>
                ) : paginated.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-14 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-500">
                        <BarChart3 size={20} />
                      </div>
                      <p className="font-semibold text-slate-200">No business entries found</p>
                      <p className="mt-1 text-xs text-slate-500">Try another category or date range.</p>
                    </td>
                  </tr>
                ) : (
                  paginated.map((transaction, index) => {
                    const isDirect = transaction.type === "Direct Business";
                    return (
                      <tr
                        key={transaction._id || `${transaction.date || "business"}-${index}`}
                        className="group transition-colors hover:bg-violet-300/[0.025]"
                      >
                        <td className="px-4 py-4 text-center">
                          <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-white/[0.04] px-1.5 text-xs font-semibold tabular-nums text-slate-500 group-hover:text-slate-300">
                            {indexOfFirst + index + 1}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-xs font-medium text-slate-400">
                          {formatDate(transaction.date)}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-bold ${
                              isDirect
                                ? "bg-violet-400/10 text-violet-200"
                                : "bg-cyan-400/10 text-cyan-200"
                            }`}
                          >
                            {isDirect ? <Users size={13} /> : <Layers size={13} />}
                            {transaction.type || "Team Business"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-right">
                          <span className="font-bold tabular-nums text-emerald-300">
                            ${formatAmount(transaction.amount)}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {!loading && !error && filtered.length > 0 && (
            <footer className="flex flex-col gap-3 border-t border-white/10 bg-white/[0.015] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <p className="text-xs text-slate-500">
                Page <span className="font-bold text-slate-200">{safePage}</span> of{" "}
                <span className="font-bold text-slate-200">{totalPages}</span>
              </p>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
                  disabled={safePage <= 1}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs font-semibold text-slate-300 transition hover:border-violet-300/30 hover:bg-violet-300/[0.06] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ChevronLeft size={15} />
                  Back
                </button>
                <span className="flex h-9 min-w-16 items-center justify-center rounded-lg bg-violet-300/10 px-3 text-xs font-bold tabular-nums text-violet-200">
                  {safePage} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
                  disabled={safePage >= totalPages}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs font-semibold text-slate-300 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.06] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Next
                  <ChevronRight size={15} />
                </button>
              </div>
            </footer>
          )}
        </section>
      </div>
    </main>
  );
};

export default DownlineBusiness;
