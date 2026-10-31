 



// // // import React, { useEffect, useState } from "react";
// // // import api from "../../api/axios";
// // // import { getUserId } from "../../utils/authUtils"; 
// // // import { Search, DollarSign, TrendingUp, Wallet, Network, Calendar, Layers } from "lucide-react";

// // // const RoiIncome = () => {
// // //   const userId = getUserId(); 
// // //   const [transactions, setTransactions] = useState([]);
// // //   const [filtered, setFiltered] = useState([]);
// // //   const [search, setSearch] = useState("");
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [entriesPerPage, setEntriesPerPage] = useState(10);
// // //   const [loading, setLoading] = useState(true);
  
// // //   // 🔥 Date Filter States
// // //   const [startDate, setStartDate] = useState("");
// // //   const [endDate, setEndDate] = useState("");

// // //   // 🔥 5 Stats States
// // //   const [totalCombined, setTotalCombined] = useState(0);
// // //   const [totalSelfRoi, setTotalSelfRoi] = useState(0);
// // //   const [todaySelfRoi, setTodaySelfRoi] = useState(0);
// // //   const [totalLevelRoi, setTotalLevelRoi] = useState(0);
// // //   const [todayLevelRoi, setTodayLevelRoi] = useState(0);

// // //   useEffect(() => {
// // //     if (!userId) {
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     setLoading(true);
    
// // //     Promise.all([
// // //       api.get(`/transaction/transactions/${userId}?type=daily_roi&t=${new Date().getTime()}`),
// // //       api.get(`/transaction/transactions/${userId}?type=daily_level_income&t=${new Date().getTime()}`)
// // //     ])
// // //     .then(([roiRes, levelRes]) => {
// // //       // ==========================================
// // //       // 🚀 THE ULTIMATE FIX: RECEIVER FILTER
// // //       // Sirf wahi data lo jisme user khud RECEIVER hai (txn.userId === userId). 
// // //       // ==========================================
// // //       const selfRoiData = (roiRes.data || []).filter(txn => String(txn.userId) === String(userId));
// // //       const levelRoiData = (levelRes.data || []).filter(txn => String(txn.userId) === String(userId));

// // //       const levelRoiByDate = {};
      
// // //       levelRoiData.forEach(txn => {
// // //         const dateObj = new Date(txn.createdAt || txn.date);
// // //         const dateKey = dateObj.toISOString().split('T')[0]; 

// // //         if (!levelRoiByDate[dateKey]) {
// // //           levelRoiByDate[dateKey] = {
// // //             _id: `level_combined_${dateKey}`, 
// // //             type: "daily_level_income",
// // //             description: `Total Team Level ROI for the Day`,
// // //             amount: 0,
// // //             date: dateKey,
// // //             createdAt: dateObj 
// // //           };
// // //         }
// // //         levelRoiByDate[dateKey].amount += (Number(txn.amount) || 0);
// // //       });

// // //       const combinedLevelRoiArray = Object.values(levelRoiByDate);
// // //       const finalCombinedData = [...selfRoiData, ...combinedLevelRoiArray];
      
// // //       const sorted = finalCombinedData.sort(
// // //         (a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
// // //       );
      
// // //       setTransactions(sorted);
// // //       setFiltered(sorted); 

// // //       // ==========================================
// // //       // 🔥 5 STATS CALCULATION
// // //       // ==========================================
// // //       let selfTotal = 0;
// // //       let levelTotal = 0;
// // //       let todaySelf = 0;
// // //       let todayLevel = 0;
// // //       const todayStr = new Date().toLocaleDateString("en-GB"); 

// // //       sorted.forEach(txn => {
// // //         const amt = Number(txn.amount) || 0;
// // //         const isSelf = txn.type === "daily_roi";
// // //         const isLevel = txn.type === "daily_level_income";
        
// // //         if (isSelf) selfTotal += amt;
// // //         if (isLevel) levelTotal += amt;
        
// // //         const txnDateStr = new Date(txn.createdAt || txn.date).toLocaleDateString("en-GB");
// // //         if (txnDateStr === todayStr) {
// // //           if (isSelf) todaySelf += amt;
// // //           if (isLevel) todayLevel += amt;
// // //         }
// // //       });

// // //       setTotalSelfRoi(selfTotal);
// // //       setTotalLevelRoi(levelTotal);
// // //       setTodaySelfRoi(todaySelf);
// // //       setTodayLevelRoi(todayLevel);
// // //       setTotalCombined(selfTotal + levelTotal);
// // //     })
// // //     .catch((err) => {
// // //       console.error("Failed to fetch Combined ROI income", err);
// // //     })
// // //     .finally(() => {
// // //       setLoading(false);
// // //     });
// // //   }, [userId]);

// // //   // ==========================================
// // //   // 🔥 FILTER BY DATE & SEARCH
// // //   // ==========================================
// // //   useEffect(() => {
// // //     let result = transactions;

// // //     if (startDate || endDate) {
// // //       result = result.filter(txn => {
// // //         const txnDate = new Date(txn.createdAt || txn.date);
// // //         txnDate.setHours(0, 0, 0, 0); 

// // //         const sDate = startDate ? new Date(startDate) : null;
// // //         if (sDate) sDate.setHours(0, 0, 0, 0);

// // //         const eDate = endDate ? new Date(endDate) : null;
// // //         if (eDate) eDate.setHours(23, 59, 59, 999);

// // //         if (sDate && eDate) return txnDate >= sDate && txnDate <= eDate;
// // //         if (sDate) return txnDate >= sDate;
// // //         if (eDate) return txnDate <= eDate;
// // //         return true;
// // //       });
// // //     }

// // //     if (search) {
// // //       const value = search.toLowerCase();
// // //       result = result.filter(
// // //         (txn) =>
// // //           txn.description?.toLowerCase().includes(value) ||
// // //           String(txn.amount).toLowerCase().includes(value) ||
// // //           txn.type?.toLowerCase().includes(value)
// // //       );
// // //     }

// // //     setFiltered(result);
// // //     setCurrentPage(1); 
// // //   }, [startDate, endDate, search, transactions]);

// // //   const handleEntriesChange = (e) => {
// // //     setEntriesPerPage(Number(e.target.value));
// // //     setCurrentPage(1);
// // //   };

// // //   const totalPages = Math.ceil(filtered.length / entriesPerPage) || 1;
// // //   const indexOfLast = currentPage * entriesPerPage;
// // //   const indexOfFirst = indexOfLast - entriesPerPage;
// // //   const paginated = filtered.slice(indexOfFirst, indexOfLast);

// // //   const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);
// // //   const handleNext = () => currentPage < totalPages && setCurrentPage((p) => p + 1);

// // //   return (
// // //     <div className="w-full min-h-screen bg-[#0b1221] p-4 md:p-8 font-sans">
      
// // //       <div className="max-w-7xl mx-auto bg-[#131c31] rounded-xl border-t-[3px] border-[#eab308] shadow-2xl p-4 sm:p-6">
        
// // //         {/* Header Title */}
// // //         <div className="mb-6">
// // //           <h2 className="text-2xl sm:text-3xl text-[#eab308] font-bold tracking-wide flex items-center gap-3">
// // //              Total ROI Dashboard
// // //           </h2>
// // //           <p className="text-gray-500 text-sm mt-1">Track your Complete Daily Returns and Team Bonuses here</p>
// // //         </div>

// // //         {/* ========================================== */}
// // //         {/* 🔥 NEW STATS CARDS LAYOUT (Mobile Optimized) 🔥 */}
// // //         {/* ========================================== */}
// // //         <div className="flex flex-col gap-4 mb-8">
          
// // //           {/* 1. TOP BOX: Total Combined Income (Full Width) */}
// // //           <div className="bg-gradient-to-r from-[#eab308]/20 via-[#131c31] to-[#0b1221] border border-[#eab308]/40 p-6 rounded-xl flex items-center gap-5 shadow-lg w-full">
// // //             <div className="p-4 bg-[#eab308]/20 rounded-xl text-[#eab308]">
// // //               <Layers size={32} />
// // //             </div>
// // //             <div>
// // //               <p className="text-[#eab308] text-sm font-bold uppercase tracking-widest">Total Combined Income</p>
// // //               <h3 className="text-3xl sm:text-4xl text-white font-black flex items-center mt-1">
// // //                 <DollarSign size={28} className="text-[#eab308] mr-0.5" />
// // //                 {totalCombined.toFixed(2)}
// // //               </h3>
// // //             </div>
// // //           </div>

// // //           {/* 4 BOXES GRID (2x2 on Tablet, 4x1 on Desktop, Stacked on Mobile) */}
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
// // //             {/* 2. Total Self ROI */}
// // //             <div className="bg-[#0b1221] border border-gray-700/50 p-5 rounded-xl flex items-center gap-4 hover:border-blue-500/50 transition-colors">
// // //               <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><Wallet size={24} /></div>
// // //               <div>
// // //                 <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Self ROI</p>
// // //                 <h3 className="text-2xl text-white font-black flex items-center mt-1">
// // //                   <DollarSign size={20} className="text-[#eab308] mr-0.5" />{totalSelfRoi.toFixed(2)}
// // //                 </h3>
// // //               </div>
// // //             </div>

// // //             {/* 3. Today's Self ROI */}
// // //             <div className="bg-[#0b1221] border border-gray-700/50 p-5 rounded-xl flex items-center gap-4 hover:border-blue-500/50 transition-colors">
// // //               <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><TrendingUp size={24} /></div>
// // //               <div>
// // //                 <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Today's Self ROI</p>
// // //                 <h3 className="text-2xl text-white font-black flex items-center mt-1">
// // //                   <DollarSign size={20} className="text-[#eab308] mr-0.5" />{todaySelfRoi.toFixed(2)}
// // //                 </h3>
// // //               </div>
// // //             </div>

// // //             {/* 4. Total Level ROI */}
// // //             <div className="bg-[#0b1221] border border-gray-700/50 p-5 rounded-xl flex items-center gap-4 hover:border-purple-500/50 transition-colors">
// // //               <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400"><Network size={24} /></div>
// // //               <div>
// // //                 <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Level ROI</p>
// // //                 <h3 className="text-2xl text-white font-black flex items-center mt-1">
// // //                   <DollarSign size={20} className="text-[#eab308] mr-0.5" />{totalLevelRoi.toFixed(2)}
// // //                 </h3>
// // //               </div>
// // //             </div>

// // //             {/* 5. Today's Level ROI */}
// // //             <div className="bg-[#0b1221] border border-gray-700/50 p-5 rounded-xl flex items-center gap-4 hover:border-purple-500/50 transition-colors">
// // //               <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400"><TrendingUp size={24} /></div>
// // //               <div>
// // //                 <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Today's Level ROI</p>
// // //                 <h3 className="text-2xl text-white font-black flex items-center mt-1">
// // //                   <DollarSign size={20} className="text-[#eab308] mr-0.5" />{todayLevelRoi.toFixed(2)}
// // //                 </h3>
// // //               </div>
// // //             </div>

// // //           </div>
// // //         </div>

// // //         {/* 🔥 FILTER SECTION (Date & Search) 🔥 */}
// // //         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 text-gray-300 text-sm border-t border-gray-800 pt-6">
          
// // //           <div className="flex items-center gap-2">
// // //             <span>Show</span>
// // //             <select value={entriesPerPage} onChange={handleEntriesChange} className="bg-[#0b1221] border border-gray-700 text-[#eab308] rounded px-3 py-1.5 focus:outline-none">
// // //               <option value={10}>10</option><option value={25}>25</option><option value={50}>50</option>
// // //             </select>
// // //             <span>entries</span>
// // //           </div>

// // //           <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
// // //             {/* Date Filters */}
// // //             <div className="flex items-center gap-2 bg-[#0b1221] border border-gray-700 rounded-lg px-3 py-1.5 w-full sm:w-auto">
// // //               <Calendar size={16} className="text-[#eab308]" />
// // //               <input 
// // //                 type="date" 
// // //                 value={startDate} 
// // //                 onChange={(e) => setStartDate(e.target.value)}
// // //                 className="bg-transparent text-gray-200 outline-none text-xs sm:text-sm w-full"
// // //               />
// // //               <span className="text-gray-500 px-1">to</span>
// // //               <input 
// // //                 type="date" 
// // //                 value={endDate} 
// // //                 onChange={(e) => setEndDate(e.target.value)}
// // //                 className="bg-transparent text-gray-200 outline-none text-xs sm:text-sm w-full"
// // //               />
// // //             </div>

// // //             {/* Search Box */}
// // //             <div className="relative w-full sm:w-64">
// // //                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // //                  <Search size={16} className="text-gray-500" />
// // //                </div>
// // //                <input 
// // //                  type="text" 
// // //                  placeholder="Search details..." 
// // //                  value={search} 
// // //                  onChange={(e) => setSearch(e.target.value)} 
// // //                  className="bg-[#0b1221] border border-gray-700 text-gray-200 rounded px-3 py-1.5 pl-9 w-full focus:outline-none focus:border-[#eab308]" 
// // //                />
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Table Container */}
// // //         <div className="overflow-x-auto border border-gray-700 rounded-lg">
// // //           <table className="w-full text-left whitespace-nowrap border-collapse">
// // //             <thead className="text-[#eab308] bg-[#1a253e] text-sm border-b border-gray-700">
// // //               <tr>
// // //                 <th className="p-4 border-r border-gray-700/50 font-bold text-center w-16">Sr. <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// // //                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Date <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// // //                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Income Type <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// // //                 <th className="p-4 border-r border-gray-700/50 font-bold">Description <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// // //                 <th className="p-4 font-bold text-center">Amount</th>
// // //               </tr>
// // //             </thead>
            
// // //             <tbody className="text-gray-300 text-sm">
// // //               {loading ? (
// // //                 <tr>
// // //                   <td colSpan="5" className="text-center py-12 text-[#eab308]">
// // //                     <div className="animate-spin h-8 w-8 mx-auto mb-3 border-4 border-t-transparent border-[#eab308] rounded-full"></div>
// // //                     Loading Records...
// // //                   </td>
// // //                 </tr>
// // //               ) : paginated.length === 0 ? (
// // //                 <tr>
// // //                   <td colSpan="5" className="text-center py-12 text-gray-500">
// // //                     No records found for selected filters.
// // //                   </td>
// // //                 </tr>
// // //               ) : (
// // //                 paginated.map((txn, idx) => {
// // //                   const date = new Date(txn.createdAt || txn.date);
// // //                   const isLevel = txn.type === "daily_level_income";
                  
// // //                   return (
// // //                     <tr key={txn._id || idx} className="border-b border-gray-700 hover:bg-[#1a253e] transition-colors">
// // //                       <td className="p-4 border-r border-gray-700/50 text-center font-medium">
// // //                         {indexOfFirst + idx + 1}
// // //                       </td>
// // //                       <td className="p-4 border-r border-gray-700/50 text-center font-medium">
// // //                         {date.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}
// // //                       </td>
// // //                       <td className="p-4 border-r border-gray-700/50 text-center">
// // //                         {isLevel ? (
// // //                            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-1 rounded text-xs font-bold tracking-wider">Level ROI</span>
// // //                         ) : (
// // //                            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded text-xs font-bold tracking-wider">Self ROI</span>
// // //                         )}
// // //                       </td>
// // //                       <td className="p-4 border-r border-gray-700/50 font-medium text-white max-w-[300px] truncate" title={txn.description}>
// // //                         {txn.description}
// // //                       </td>
// // //                       <td className="p-4 font-bold text-center text-green-400">
// // //                         + ${Number(txn.amount).toFixed(2)}
// // //                       </td>
// // //                     </tr>
// // //                   );
// // //                 })
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         {/* Pagination */}
// // //         {!loading && filtered.length > 0 && (
// // //           <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-gray-400 text-sm gap-4">
// // //             <div>
// // //               Showing <span className="text-white font-medium">{indexOfFirst + 1}</span> to <span className="text-white font-medium">{Math.min(indexOfLast, filtered.length)}</span> of <span className="text-white font-medium">{filtered.length}</span> entries
// // //             </div>
            
// // //             <div className="flex items-center bg-[#0b1221] rounded border border-gray-700 overflow-hidden">
// // //               <button onClick={handlePrev} disabled={currentPage === 1} className={`px-4 py-2 transition-colors ${currentPage === 1 ? 'text-gray-600 bg-transparent cursor-not-allowed' : 'text-[#eab308] hover:bg-[#1a253e]'}`}>Previous</button>
// // //               <div className="px-4 py-2 border-l border-r border-gray-700 bg-[#1a253e] text-[#eab308] font-bold">{currentPage}</div>
// // //               <button onClick={handleNext} disabled={currentPage === totalPages || totalPages === 0} className={`px-4 py-2 transition-colors ${currentPage === totalPages || totalPages === 0 ? 'text-gray-600 bg-transparent cursor-not-allowed' : 'text-[#eab308] hover:bg-[#1a253e]'}`}>Next</button>
// // //             </div>
// // //           </div>
// // //         )}

// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default RoiIncome;



 
// // import React, { useEffect, useState } from "react";
// // import api from "../../api/axios";
// // import { getUserId } from "../../utils/authUtils"; 
// // import { Search, DollarSign, TrendingUp, Wallet, Network, Calendar, Layers } from "lucide-react";
// // import SpinnerOverlay from "../../components/common/SpinnerOverlay";

// // const RoiIncome = () => {
// //   const userId = getUserId(); 
// //   const [transactions, setTransactions] = useState([]);
// //   const [filtered, setFiltered] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [entriesPerPage, setEntriesPerPage] = useState(10);
// //   const [loading, setLoading] = useState(true);
  
// //   // Date Filter States
// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");

// //   // Stats States (Ab backend se direct aayenge)
// //   const [stats, setStats] = useState({
// //     totalCombined: 0,
// //     totalSelfRoi: 0,
// //     todaySelfRoi: 0,
// //     totalLevelRoi: 0,
// //     todayLevelRoi: 0
// //   });

// //   useEffect(() => {
// //     if (!userId) {
// //       setLoading(false);
// //       return;
// //     }

// //     setLoading(true);
    
// //     // 🚀 SINGLE FAST API CALL (Backend saara calculation karke dega)
// //     api.get(`/user/roi-income?t=${new Date().getTime()}`)
// //       .then((res) => {
// //         if(res.data.success) {
// //            const newData = res.data.data || [];
// //            setTransactions(newData);
// //            setFiltered(newData);
           
// //            setStats({
// //              totalCombined: res.data.totalCombined || 0,
// //              totalSelfRoi: res.data.totalSelfRoi || 0,
// //              todaySelfRoi: res.data.todaySelfRoi || 0,
// //              totalLevelRoi: res.data.totalLevelRoi || 0,
// //              todayLevelRoi: res.data.todayLevelRoi || 0
// //            });
// //         }
// //       })
// //       .catch((err) => {
// //         console.error("Failed to fetch ROI income", err);
// //       })
// //       .finally(() => {
// //         setLoading(false);
// //       });
// //   }, [userId]);

// //   // ==========================================
// //   // 🔥 FILTER BY DATE & SEARCH
// //   // ==========================================
// //   useEffect(() => {
// //     let result = transactions;

// //     if (startDate || endDate) {
// //       result = result.filter(txn => {
// //         const txnDate = new Date(txn.createdAt || txn.date);
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

// //     if (search) {
// //       const value = search.toLowerCase();
// //       result = result.filter(
// //         (txn) =>
// //           txn.description?.toLowerCase().includes(value) ||
// //           String(txn.amount).toLowerCase().includes(value) ||
// //           txn.type?.toLowerCase().includes(value)
// //       );
// //     }

// //     setFiltered(result);
// //     setCurrentPage(1); 
// //   }, [startDate, endDate, search, transactions]);

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

// //   if (loading) return <SpinnerOverlay />;

// //   return (
// //     <div className="w-full min-h-screen bg-[#0b1221] p-4 md:p-8 font-sans pb-24">
      
// //       <div className="max-w-7xl mx-auto bg-[#131c31] rounded-xl border-t-[3px] border-[#eab308] shadow-2xl p-4 sm:p-6">
        
// //         {/* Header Title */}
// //         <div className="mb-6">
// //           <h2 className="text-2xl sm:text-3xl text-[#eab308] font-bold tracking-wide flex items-center gap-3">
// //              Total ROI Dashboard
// //           </h2>
// //           <p className="text-gray-500 text-sm mt-1">Track your Complete Daily Returns and Team Bonuses here</p>
// //         </div>

// //         {/* STATS CARDS LAYOUT */}
// //         <div className="flex flex-col gap-4 mb-8">
          
// //           <div className="bg-gradient-to-r from-[#eab308]/20 via-[#131c31] to-[#0b1221] border border-[#eab308]/40 p-6 rounded-xl flex items-center gap-5 shadow-lg w-full">
// //             <div className="p-4 bg-[#eab308]/20 rounded-xl text-[#eab308]">
// //               <Layers size={32} />
// //             </div>
// //             <div>
// //               <p className="text-[#eab308] text-sm font-bold uppercase tracking-widest">Total Combined Income</p>
// //               <h3 className="text-3xl sm:text-4xl text-white font-black flex items-center mt-1">
// //                 <DollarSign size={28} className="text-[#eab308] mr-0.5" />
// //                 {stats.totalCombined.toFixed(2)}
// //               </h3>
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //             <div className="bg-[#0b1221] border border-gray-700/50 p-5 rounded-xl flex items-center gap-4 hover:border-blue-500/50 transition-colors">
// //               <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><Wallet size={24} /></div>
// //               <div>
// //                 <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Self ROI</p>
// //                 <h3 className="text-2xl text-white font-black flex items-center mt-1">
// //                   <DollarSign size={20} className="text-[#eab308] mr-0.5" />{stats.totalSelfRoi.toFixed(2)}
// //                 </h3>
// //               </div>
// //             </div>

// //             <div className="bg-[#0b1221] border border-gray-700/50 p-5 rounded-xl flex items-center gap-4 hover:border-blue-500/50 transition-colors">
// //               <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><TrendingUp size={24} /></div>
// //               <div>
// //                 <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Today's Self ROI</p>
// //                 <h3 className="text-2xl text-white font-black flex items-center mt-1">
// //                   <DollarSign size={20} className="text-[#eab308] mr-0.5" />{stats.todaySelfRoi.toFixed(2)}
// //                 </h3>
// //               </div>
// //             </div>

// //             <div className="bg-[#0b1221] border border-gray-700/50 p-5 rounded-xl flex items-center gap-4 hover:border-purple-500/50 transition-colors">
// //               <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400"><Network size={24} /></div>
// //               <div>
// //                 <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Level ROI</p>
// //                 <h3 className="text-2xl text-white font-black flex items-center mt-1">
// //                   <DollarSign size={20} className="text-[#eab308] mr-0.5" />{stats.totalLevelRoi.toFixed(2)}
// //                 </h3>
// //               </div>
// //             </div>

// //             <div className="bg-[#0b1221] border border-gray-700/50 p-5 rounded-xl flex items-center gap-4 hover:border-purple-500/50 transition-colors">
// //               <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400"><TrendingUp size={24} /></div>
// //               <div>
// //                 <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Today's Level ROI</p>
// //                 <h3 className="text-2xl text-white font-black flex items-center mt-1">
// //                   <DollarSign size={20} className="text-[#eab308] mr-0.5" />{stats.todayLevelRoi.toFixed(2)}
// //                 </h3>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Filter Section */}
// //         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 text-gray-300 text-sm border-t border-gray-800 pt-6">
// //           <div className="flex items-center gap-2">
// //             <span>Show</span>
// //             <select value={entriesPerPage} onChange={handleEntriesChange} className="bg-[#0b1221] border border-gray-700 text-[#eab308] rounded px-3 py-1.5 focus:outline-none">
// //               <option value={10}>10</option><option value={25}>25</option><option value={50}>50</option>
// //             </select>
// //             <span>entries</span>
// //           </div>

// //           <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
// //             <div className="flex items-center gap-2 bg-[#0b1221] border border-gray-700 rounded-lg px-3 py-1.5 w-full sm:w-auto">
// //               <Calendar size={16} className="text-[#eab308]" />
// //               <input 
// //                 type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
// //                 className="bg-transparent text-gray-200 outline-none text-xs sm:text-sm w-full"
// //               />
// //               <span className="text-gray-500 px-1">to</span>
// //               <input 
// //                 type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
// //                 className="bg-transparent text-gray-200 outline-none text-xs sm:text-sm w-full"
// //               />
// //             </div>

// //             <div className="relative w-full sm:w-64">
// //                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                  <Search size={16} className="text-gray-500" />
// //                </div>
// //                <input 
// //                  type="text" placeholder="Search details..." value={search} onChange={(e) => setSearch(e.target.value)} 
// //                  className="bg-[#0b1221] border border-gray-700 text-gray-200 rounded px-3 py-1.5 pl-9 w-full focus:outline-none focus:border-[#eab308]" 
// //                />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Table Container */}
// //         <div className="overflow-x-auto border border-gray-700 rounded-lg">
// //           <table className="w-full text-left whitespace-nowrap border-collapse">
// //             <thead className="text-[#eab308] bg-[#1a253e] text-sm border-b border-gray-700">
// //               <tr>
// //                 <th className="p-4 border-r border-gray-700/50 font-bold text-center w-16">Sr. <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// //                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Date <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// //                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Income Type <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// //                 <th className="p-4 border-r border-gray-700/50 font-bold">Description <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// //                 <th className="p-4 font-bold text-center">Amount</th>
// //               </tr>
// //             </thead>
            
// //             <tbody className="text-gray-300 text-sm">
// //               {paginated.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="5" className="text-center py-12 text-gray-500">
// //                     No records found for selected filters.
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 paginated.map((txn, idx) => {
// //                   const date = new Date(txn.createdAt || txn.date);
// //                   const isLevel = txn.type === "daily_level_income";
                  
// //                   // 🔥 NaN Fix: Direct amount conversion
// //                   const rawAmount = txn.amount?.$numberDecimal || txn.amount || 0;
// //                   const displayAmount = Number(rawAmount) || 0;
                  
// //                   return (
// //                     <tr key={txn._id || idx} className="border-b border-gray-700 hover:bg-[#1a253e] transition-colors">
// //                       <td className="p-4 border-r border-gray-700/50 text-center font-medium">
// //                         {indexOfFirst + idx + 1}
// //                       </td>
// //                       <td className="p-4 border-r border-gray-700/50 text-center font-medium">
// //                         {date.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}
// //                       </td>
// //                       <td className="p-4 border-r border-gray-700/50 text-center">
// //                         {isLevel ? (
// //                            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-1 rounded text-xs font-bold tracking-wider">Level ROI</span>
// //                         ) : (
// //                            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded text-xs font-bold tracking-wider">Self ROI</span>
// //                         )}
// //                       </td>
// //                       <td className="p-4 border-r border-gray-700/50 font-medium text-white max-w-[300px] truncate" title={txn.description}>
// //                         {txn.description}
// //                       </td>
// //                       <td className="p-4 font-bold text-center text-green-400">
// //                         + ${displayAmount.toFixed(2)}
// //                       </td>
// //                     </tr>
// //                   );
// //                 })
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Pagination */}
// //         {filtered.length > 0 && (
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

// // export default RoiIncome;



// import React, { useEffect, useMemo, useState } from "react";
// import api from "../../api/axios";
// import { getUserId } from "../../utils/authUtils";
// import {
//   Search,
//   DollarSign,
//   TrendingUp,
//   Wallet,
//   Network,
//   CalendarDays,
//   Layers,
//   RefreshCw,
//   ChevronLeft,
//   ChevronRight,
//   X,
//   Activity,
//   Filter,
// } from "lucide-react";

// const EMPTY_STATS = {
//   totalCombined: 0,
//   totalSelfRoi: 0,
//   todaySelfRoi: 0,
//   totalLevelRoi: 0,
//   todayLevelRoi: 0,
// };

// const safeNumber = (value) => {
//   const raw = value && typeof value === "object" && value.$numberDecimal != null
//     ? value.$numberDecimal
//     : value;
//   const number = Number(raw);
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

// const RoiIncome = () => {
//   const userId = getUserId();
//   const [transactions, setTransactions] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [stats, setStats] = useState(EMPTY_STATS);

//   const fetchRoiIncome = async () => {
//     if (!userId) {
//       setTransactions([]);
//       setStats(EMPTY_STATS);
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setError("");
//     try {
//       const response = await api.get(`/user/roi-income?t=${Date.now()}`);
//       if (response?.data?.success) {
//         setTransactions(Array.isArray(response.data.data) ? response.data.data : []);
//         setStats({
//           totalCombined: safeNumber(response.data.totalCombined),
//           totalSelfRoi: safeNumber(response.data.totalSelfRoi),
//           todaySelfRoi: safeNumber(response.data.todaySelfRoi),
//           totalLevelRoi: safeNumber(response.data.totalLevelRoi),
//           todayLevelRoi: safeNumber(response.data.todayLevelRoi),
//         });
//       } else {
//         setTransactions([]);
//         setStats(EMPTY_STATS);
//         setError(response?.data?.message || "Unable to load ROI income records.");
//       }
//     } catch (fetchError) {
//       console.error("Failed to fetch ROI income", fetchError);
//       setError("Unable to load ROI income records. Please try again.");
//       setTransactions([]);
//       setStats(EMPTY_STATS);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRoiIncome();
//     // Refresh data when the authenticated user ID changes.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userId]);

//   const filtered = useMemo(() => {
//     let result = [...transactions];

//     if (startDate || endDate) {
//       result = result.filter((transaction) => {
//         const date = new Date(transaction.createdAt || transaction.date);
//         if (Number.isNaN(date.getTime())) return false;

//         const dateOnly = new Date(date);
//         dateOnly.setHours(0, 0, 0, 0);

//         if (startDate && dateOnly < new Date(`${startDate}T00:00:00`)) return false;
//         if (endDate && dateOnly > new Date(`${endDate}T23:59:59.999`)) return false;
//         return true;
//       });
//     }

//     const query = search.trim().toLowerCase();
//     if (query) {
//       result = result.filter((transaction) =>
//         String(transaction.description ?? "").toLowerCase().includes(query) ||
//         String(safeNumber(transaction.amount)).toLowerCase().includes(query) ||
//         String(transaction.type ?? "").toLowerCase().includes(query)
//       );
//     }

//     return result;
//   }, [transactions, startDate, endDate, search]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [startDate, endDate, search, entriesPerPage]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / entriesPerPage));
//   const safePage = Math.min(currentPage, totalPages);
//   const indexOfFirst = (safePage - 1) * entriesPerPage;
//   const indexOfLast = Math.min(indexOfFirst + entriesPerPage, filtered.length);
//   const paginated = filtered.slice(indexOfFirst, indexOfLast);

//   const clearFilters = () => {
//     setSearch("");
//     setStartDate("");
//     setEndDate("");
//   };

//   return (
//     <main className="min-h-screen w-full bg-[#080811] px-3 py-5 pb-24 font-sans text-slate-100 sm:px-5 sm:py-8 lg:px-8">
//       <section className="mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border border-violet-500/20 bg-[#10101d] shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
//         <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400" />

//         <div className="p-4 sm:p-6 lg:p-8">
//           <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//             <div>
//               <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-violet-200">
//                 <Activity size={14} />
//                 INCOME ANALYTICS
//               </span>
//               <h1 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
//                 <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
//                   <TrendingUp size={23} />
//                 </span>
//                 Total ROI Dashboard
//               </h1>
//               <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
//                 Track your self ROI, level ROI, and total income in one place.
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={fetchRoiIncome}
//               disabled={loading}
//               className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-xl border border-violet-400/25 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-200 transition hover:border-violet-300/50 hover:bg-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50 md:self-center"
//             >
//               <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
//               Refresh
//             </button>
//           </div>

//           <div className="mt-6 rounded-2xl border border-violet-400/25 bg-gradient-to-r from-violet-500/15 via-[#151525] to-cyan-500/10 p-5 sm:p-7">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//               <div>
//                 <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-200">Total Combined Income</p>
//                 <p className="mt-2 flex items-center text-3xl font-black tabular-nums text-white sm:text-4xl">
//                   <DollarSign size={28} className="mr-1 text-cyan-300" />
//                   {formatAmount(stats.totalCombined)}
//                 </p>
//                 <p className="mt-2 text-xs text-slate-400">Combined self and team ROI income</p>
//               </div>
//               <div className="flex h-14 w-14 items-center justify-center self-start rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-200 sm:h-16 sm:w-16">
//                 <Layers size={30} />
//               </div>
//             </div>
//           </div>

//           <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
//             <div className="rounded-xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-[#151525] p-4 sm:p-5">
//               <div className="flex items-center justify-between gap-3">
//                 <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Self ROI</p>
//                 <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300"><Wallet size={19} /></span>
//               </div>
//               <p className="mt-4 text-2xl font-extrabold tabular-nums text-white">{`$${formatAmount(stats.totalSelfRoi)}`}</p>
//             </div>
//             <div className="rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-[#151525] p-4 sm:p-5">
//               <div className="flex items-center justify-between gap-3">
//                 <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Today's Self ROI</p>
//                 <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300"><TrendingUp size={19} /></span>
//               </div>
//               <p className="mt-4 text-2xl font-extrabold tabular-nums text-white">{`$${formatAmount(stats.todaySelfRoi)}`}</p>
//             </div>
//             <div className="rounded-xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/10 to-[#151525] p-4 sm:p-5">
//               <div className="flex items-center justify-between gap-3">
//                 <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Level ROI</p>
//                 <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-400/10 text-fuchsia-300"><Network size={19} /></span>
//               </div>
//               <p className="mt-4 text-2xl font-extrabold tabular-nums text-white">{`$${formatAmount(stats.totalLevelRoi)}`}</p>
//             </div>
//             <div className="rounded-xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-[#151525] p-4 sm:p-5">
//               <div className="flex items-center justify-between gap-3">
//                 <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Today's Level ROI</p>
//                 <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300"><TrendingUp size={19} /></span>
//               </div>
//               <p className="mt-4 text-2xl font-extrabold tabular-nums text-white">{`$${formatAmount(stats.todayLevelRoi)}`}</p>
//             </div>
//           </div>

//           <div className="mt-7 rounded-xl border border-white/10 bg-[#151525] p-4 sm:p-5">
//             <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
//               <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
//                 <Filter size={16} className="text-violet-300" />
//                 Filter ROI records
//               </div>
//               {(search || startDate || endDate) && (
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

//               <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-400">
//                 Search details
//                 <span className="relative">
//                   <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
//                   <input
//                     type="search"
//                     placeholder="Type, description, amount..."
//                     value={search}
//                     onChange={(event) => setSearch(event.target.value)}
//                     className="h-11 w-full rounded-lg border border-white/10 bg-[#0b0b16] pl-9 pr-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-violet-400/60"
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
//               <table className="w-full min-w-[760px] border-collapse text-left">
//                 <thead>
//                   <tr className="border-b border-white/10 bg-[#19182a] text-xs uppercase tracking-wider text-violet-200">
//                     <th className="px-4 py-4 text-center font-bold">Sr.</th>
//                     <th className="px-4 py-4 font-bold">Date</th>
//                     <th className="px-4 py-4 font-bold">Income type</th>
//                     <th className="px-4 py-4 font-bold">Description</th>
//                     <th className="px-4 py-4 text-right font-bold">Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-white/[0.06] text-sm text-slate-300">
//                   {loading ? (
//                     <tr>
//                       <td colSpan={5} className="px-5 py-14 text-center">
//                         <span className="mx-auto mb-3 block h-8 w-8 animate-spin rounded-full border-2 border-violet-400/30 border-t-violet-300" />
//                         <span className="text-sm font-medium text-violet-200">Loading ROI records...</span>
//                       </td>
//                     </tr>
//                   ) : error ? (
//                     <tr>
//                       <td colSpan={5} className="px-5 py-12 text-center">
//                         <p className="font-semibold text-rose-300">{error}</p>
//                         <button
//                           type="button"
//                           onClick={fetchRoiIncome}
//                           className="mt-4 rounded-lg border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200 hover:bg-rose-500/20"
//                         >
//                           Try again
//                         </button>
//                       </td>
//                     </tr>
//                   ) : paginated.length === 0 ? (
//                     <tr>
//                       <td colSpan={5} className="px-5 py-14 text-center">
//                         <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-500">
//                           <Activity size={22} />
//                         </div>
//                         <p className="font-semibold text-slate-200">No ROI records found</p>
//                         <p className="mt-1 text-xs text-slate-500">Adjust your date range or search and try again.</p>
//                       </td>
//                     </tr>
//                   ) : (
//                     paginated.map((transaction, index) => {
//                       const isLevel = transaction.type === "daily_level_income";
//                       return (
//                         <tr
//                           key={transaction._id || `${transaction.createdAt || transaction.date || "roi"}-${index}`}
//                           className="transition-colors hover:bg-violet-500/[0.06]"
//                         >
//                           <td className="px-4 py-4 text-center font-semibold text-slate-500">
//                             {indexOfFirst + index + 1}
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap text-slate-300">
//                             {formatDate(transaction.createdAt || transaction.date)}
//                           </td>
//                           <td className="px-4 py-4">
//                             <span
//                               className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold tracking-wide ${
//                                 isLevel
//                                   ? "border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-200"
//                                   : "border-blue-400/20 bg-blue-400/10 text-blue-200"
//                               }`}
//                             >
//                               {isLevel ? <Network size={13} /> : <Wallet size={13} />}
//                               {isLevel ? "Level ROI" : "Self ROI"}
//                             </span>
//                           </td>
//                           <td className="max-w-[360px] px-4 py-4 font-medium text-slate-200">
//                             <span className="block truncate" title={transaction.description || ""}>
//                               {transaction.description || "—"}
//                             </span>
//                           </td>
//                           <td className="px-4 py-4 text-right">
//                             <span className="font-bold tabular-nums text-emerald-300">
//                               + ${formatAmount(transaction.amount)}
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

// export default RoiIncome;



import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import { getUserId } from "../../utils/authUtils";
import {
  Search,
  DollarSign,
  TrendingUp,
  Wallet,
  Network,
  CalendarDays,
  Layers,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
  Activity,
  Filter,
  ArrowUpRight,
  Clock3,
  CircleDollarSign,
} from "lucide-react";

const EMPTY_STATS = {
  totalCombined: 0,
  totalSelfRoi: 0,
  todaySelfRoi: 0,
  totalLevelRoi: 0,
  todayLevelRoi: 0,
};

const safeNumber = (value) => {
  const raw =
    value && typeof value === "object" && value.$numberDecimal != null
      ? value.$numberDecimal
      : value;
  const number = Number(raw);
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

const RoiIncome = () => {
  const userId = getUserId();
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stats, setStats] = useState(EMPTY_STATS);

  const fetchRoiIncome = async () => {
    if (!userId) {
      setTransactions([]);
      setStats(EMPTY_STATS);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await api.get(`/user/roi-income?t=${Date.now()}`);
      if (response?.data?.success) {
        setTransactions(
          Array.isArray(response.data.data) ? response.data.data : []
        );
        setStats({
          totalCombined: safeNumber(response.data.totalCombined),
          totalSelfRoi: safeNumber(response.data.totalSelfRoi),
          todaySelfRoi: safeNumber(response.data.todaySelfRoi),
          totalLevelRoi: safeNumber(response.data.totalLevelRoi),
          todayLevelRoi: safeNumber(response.data.todayLevelRoi),
        });
      } else {
        setTransactions([]);
        setStats(EMPTY_STATS);
        setError(
          response?.data?.message || "Unable to load ROI income records."
        );
      }
    } catch (fetchError) {
      console.error("Failed to fetch ROI income", fetchError);
      setError("Unable to load ROI income records. Please try again.");
      setTransactions([]);
      setStats(EMPTY_STATS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoiIncome();
    // Refresh data when the authenticated user ID changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const filtered = useMemo(() => {
    let result = [...transactions];

    if (startDate || endDate) {
      result = result.filter((transaction) => {
        const date = new Date(transaction.createdAt || transaction.date);
        if (Number.isNaN(date.getTime())) return false;

        const dateOnly = new Date(date);
        dateOnly.setHours(0, 0, 0, 0);

        if (startDate && dateOnly < new Date(`${startDate}T00:00:00`))
          return false;
        if (endDate && dateOnly > new Date(`${endDate}T23:59:59.999`))
          return false;
        return true;
      });
    }

    const query = search.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (transaction) =>
          String(transaction.description ?? "").toLowerCase().includes(query) ||
          String(safeNumber(transaction.amount)).toLowerCase().includes(query) ||
          String(transaction.type ?? "").toLowerCase().includes(query)
      );
    }

    return result;
  }, [transactions, startDate, endDate, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [startDate, endDate, search, entriesPerPage]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / entriesPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const indexOfFirst = (safePage - 1) * entriesPerPage;
  const indexOfLast = Math.min(indexOfFirst + entriesPerPage, filtered.length);
  const paginated = filtered.slice(indexOfFirst, indexOfLast);

  const clearFilters = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
  };

  const statCards = [
    {
      label: "Self ROI · Lifetime",
      value: stats.totalSelfRoi,
      icon: Wallet,
      tint: "text-sky-300",
      accent: "border-sky-400/25",
      iconBg: "bg-sky-400/10",
      note: "Personal return",
    },
    {
      label: "Self ROI · Today",
      value: stats.todaySelfRoi,
      icon: TrendingUp,
      tint: "text-teal-300",
      accent: "border-teal-400/25",
      iconBg: "bg-teal-400/10",
      note: "Today's personal return",
    },
    {
      label: "Team ROI · Lifetime",
      value: stats.totalLevelRoi,
      icon: Network,
      tint: "text-fuchsia-300",
      accent: "border-fuchsia-400/25",
      iconBg: "bg-fuchsia-400/10",
      note: "Network return",
    },
    {
      label: "Team ROI · Today",
      value: stats.todayLevelRoi,
      icon: Activity,
      tint: "text-amber-300",
      accent: "border-amber-400/25",
      iconBg: "bg-amber-400/10",
      note: "Today's network return",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-[#090b12] px-3 py-5 pb-24 font-sans text-slate-100 sm:px-5 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading: intentionally uses a compact editorial layout, not a large hero box. */}
        <header className="mb-6 flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-12 w-1.5 rounded-full bg-gradient-to-b from-cyan-300 to-violet-500" />
            <div>
              <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300">
                <Activity size={14} />
                Earnings / ROI ledger
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                Return Overview
              </h1>
              <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-400">
                Review your personal and network returns, with a searchable history of each income entry.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={fetchRoiIncome}
            disabled={loading}
            className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.08] disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Reload data
          </button>
        </header>

        {/* Main balance strip uses a split layout rather than the previous gradient card. */}
        <section className="mb-5 grid overflow-hidden rounded-xl border border-white/10 bg-[#111520] md:grid-cols-[1.35fr_1fr]">
          <div className="relative p-5 sm:p-6">
            <div className="absolute inset-y-0 left-0 w-1 bg-cyan-300" />
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
              <CircleDollarSign size={16} className="text-cyan-300" />
              Combined ROI credited
            </div>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                ${formatAmount(stats.totalCombined)}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-400/10 px-2 py-1 text-[11px] font-bold text-emerald-300">
                <ArrowUpRight size={13} />
                Total earned
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Combined total reported by your account
            </p>
          </div>
          <div className="grid grid-cols-2 border-t border-white/10 bg-white/[0.015] md:border-l md:border-t-0">
            <div className="p-4 sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Self ROI
              </p>
              <p className="mt-2 text-lg font-bold tabular-nums text-sky-200">
                ${formatAmount(stats.totalSelfRoi)}
              </p>
              <p className="mt-1 text-[11px] text-slate-500">Lifetime</p>
            </div>
            <div className="border-l border-white/10 p-4 sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Team ROI
              </p>
              <p className="mt-2 text-lg font-bold tabular-nums text-fuchsia-200">
                ${formatAmount(stats.totalLevelRoi)}
              </p>
              <p className="mt-1 text-[11px] text-slate-500">Lifetime</p>
            </div>
          </div>
        </section>

        {/* Compact metric tiles with distinct accents and labels. */}
        <section className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.label}
                className={`rounded-xl border ${item.accent} bg-[#10141e] p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-[#131925]`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-400">{item.label}</p>
                    <p className="mt-3 text-2xl font-extrabold tabular-nums tracking-tight text-white">
                      ${formatAmount(item.value)}
                    </p>
                  </div>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.iconBg} ${item.tint}`}>
                    <Icon size={19} />
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-1.5 border-t border-white/[0.07] pt-3 text-[11px] text-slate-500">
                  <Clock3 size={12} />
                  {item.note}
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
                  <Layers size={16} />
                </div>
                <h2 className="text-base font-bold text-white">Income activity</h2>
              </div>
              <p className="mt-1 pl-10 text-xs text-slate-500">
                Filter entries by date or search the income details.
              </p>
            </div>
            {(search || startDate || endDate) && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center justify-center gap-1.5 self-start rounded-md border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-rose-400/30 hover:bg-rose-400/[0.06] hover:text-rose-200 sm:self-auto"
              >
                <X size={13} />
                Reset filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 border-b border-white/10 bg-white/[0.015] p-4 sm:grid-cols-2 xl:grid-cols-[150px_1fr_1fr_1.4fr] sm:p-5">
            <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Per page
              <select
                value={entriesPerPage}
                onChange={(event) => setEntriesPerPage(Number(event.target.value))}
                className="h-10 w-full rounded-lg border border-white/10 bg-[#090d15] px-3 text-sm font-medium normal-case tracking-normal text-slate-200 outline-none focus:border-cyan-300/50"
              >
                <option value={10}>10 entries</option>
                <option value={25}>25 entries</option>
                <option value={50}>50 entries</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Start date
              <span className="relative">
                <CalendarDays size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cyan-300" />
                <input
                  type="date"
                  value={startDate}
                  max={endDate || undefined}
                  onChange={(event) => setStartDate(event.target.value)}
                  className="h-10 w-full rounded-lg border border-white/10 bg-[#090d15] pl-9 pr-3 text-sm font-medium normal-case tracking-normal text-slate-200 outline-none focus:border-cyan-300/50"
                />
              </span>
            </label>

            <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              End date
              <span className="relative">
                <CalendarDays size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-violet-300" />
                <input
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(event) => setEndDate(event.target.value)}
                  className="h-10 w-full rounded-lg border border-white/10 bg-[#090d15] pl-9 pr-3 text-sm font-medium normal-case tracking-normal text-slate-200 outline-none focus:border-violet-300/50"
                />
              </span>
            </label>

            <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Search ledger
              <span className="relative">
                <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="search"
                  placeholder="Search type, description, amount..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="h-10 w-full rounded-lg border border-white/10 bg-[#090d15] pl-9 pr-3 text-sm font-medium normal-case tracking-normal text-slate-200 outline-none placeholder:text-slate-600 focus:border-violet-300/50"
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
              <Filter size={12} className="text-cyan-300" />
              {filtered.length} match{filtered.length === 1 ? "" : "es"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-y border-white/10 bg-[#151b28] text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  <th className="w-16 px-4 py-4 text-center font-bold">No.</th>
                  <th className="px-4 py-4 font-bold">Recorded on</th>
                  <th className="px-4 py-4 font-bold">Category</th>
                  <th className="px-4 py-4 font-bold">Income details</th>
                  <th className="px-5 py-4 text-right font-bold">Credit amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-14 text-center">
                      <span className="mx-auto mb-3 block h-8 w-8 animate-spin rounded-full border-2 border-cyan-300/20 border-t-cyan-300" />
                      <span className="text-sm font-medium text-slate-300">Syncing income activity…</span>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center">
                      <p className="font-semibold text-rose-300">{error}</p>
                      <button
                        type="button"
                        onClick={fetchRoiIncome}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-rose-400/25 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-400/15"
                      >
                        <RefreshCw size={14} />
                        Retry request
                      </button>
                    </td>
                  </tr>
                ) : paginated.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-14 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-500">
                        <Search size={20} />
                      </div>
                      <p className="font-semibold text-slate-200">Nothing matches these filters</p>
                      <p className="mt-1 text-xs text-slate-500">Try a different date range or search phrase.</p>
                    </td>
                  </tr>
                ) : (
                  paginated.map((transaction, index) => {
                    const isLevel = transaction.type === "daily_level_income";
                    return (
                      <tr
                        key={transaction._id || `${transaction.createdAt || transaction.date || "roi"}-${index}`}
                        className="group transition-colors hover:bg-cyan-300/[0.025]"
                      >
                        <td className="px-4 py-4 text-center">
                          <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-white/[0.04] px-1.5 text-xs font-semibold tabular-nums text-slate-500 group-hover:text-slate-300">
                            {indexOfFirst + index + 1}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-xs font-medium text-slate-400">
                          {formatDate(transaction.createdAt || transaction.date)}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-bold ${
                              isLevel
                                ? "bg-fuchsia-400/10 text-fuchsia-200"
                                : "bg-sky-400/10 text-sky-200"
                            }`}
                          >
                            {isLevel ? <Network size={13} /> : <Wallet size={13} />}
                            {isLevel ? "Team ROI" : "Self ROI"}
                          </span>
                        </td>
                        <td className="max-w-[360px] px-4 py-4 font-medium text-slate-200">
                          <span className="block truncate" title={transaction.description || ""}>
                            {transaction.description || "—"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-right">
                          <span className="font-bold tabular-nums text-emerald-300">
                            +${formatAmount(transaction.amount)}
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
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs font-semibold text-slate-300 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.06] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ChevronLeft size={15} />
                  Back
                </button>
                <span className="flex h-9 min-w-16 items-center justify-center rounded-lg bg-cyan-300/10 px-3 text-xs font-bold tabular-nums text-cyan-200">
                  {safePage} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
                  disabled={safePage >= totalPages}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs font-semibold text-slate-300 transition hover:border-violet-300/30 hover:bg-violet-300/[0.06] disabled:cursor-not-allowed disabled:opacity-35"
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

export default RoiIncome;
