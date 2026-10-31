// // // import React, { useEffect, useState } from "react";
// // // import api from "../../api/axios";
// // // import {
// // //   Search,
// // //   Banknote,
// // //   ChevronLeft,
// // //   ChevronRight,
// // //   Wallet,
// // // } from "lucide-react";

// // // function UserWithdrawalHistory() {
// // //   const [withdrawals, setWithdrawals] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [search, setSearch] = useState("");
// // //   const [statusFilter, setStatusFilter] = useState("all");
// // //   const [currentPage, setCurrentPage] = useState(1);

// // //   const itemsPerPage = 10;

// // //   const user = JSON.parse(localStorage.getItem("user"));
// // //   const userId = Number(user?.userId);
  
// // //   // 🔥 Check if user is a Leader
// // //   const isLeader = user?.role?.toLowerCase() === "leader";

// // //   useEffect(() => {
// // //     const fetchWithdrawals = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const res = await api.get(
// // //           `/wallet/withdrawals/${userId}?t=${new Date().getTime()}`
// // //         );
// // //         setWithdrawals(res.data.withdrawals || []);
// // //       } catch (error) {
// // //         console.error("Error fetching withdrawal history:", error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     if (userId) fetchWithdrawals();
// // //     else setLoading(false);
// // //   }, [userId]);

// // //   // 🔥 GROUP & ADJUST ENTRIES (WITH TIME-BASED LOGIC)
// // //   const groupWithdrawals = (list) => {
// // //     const sorted = [...list].sort(
// // //       (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
// // //     );

// // //     const groups = [];
// // //     const THRESHOLD_MS = 5000;
    
// // //     // 🔥 CUTOFF TIME: 13 July 2026, 4:00 PM IST
// // //     const CUTOFF_TIME = new Date("2026-07-13T16:00:00+05:30").getTime();

// // //     for (const item of sorted) {
// // //       const itemTime = new Date(item.createdAt).getTime();
// // //       const lastGroup = groups[groups.length - 1];

// // //       // 👉 TIME CHECK: Purana (before 4 PM) ya Naya (after 4 PM)
// // //       const isNewLogic = itemTime >= CUTOFF_TIME;

// // //       // 👉 AMOUNT CALCULATION LOGIC (Fee Removed completely)
// // //       const iGross = isNewLogic ? Number(item.grossAmount || 0) : Number(item.grossAmount || 0) * 2;
// // //       const iCryptoNet = Number(item.netAmount || 0); // USDT portion
      
// // //       // TopUp calculation: Without fee -> TopUp = Gross - USDT
// // //       const iTopupNet = isNewLogic ? (iGross - iCryptoNet) : Number(item.netAmount || 0);

// // //       if (
// // //         lastGroup &&
// // //         itemTime -
// // //           new Date(
// // //             lastGroup.entries[lastGroup.entries.length - 1].createdAt
// // //           ).getTime() <=
// // //           THRESHOLD_MS
// // //       ) {
// // //         lastGroup.entries.push(item);

// // //         lastGroup.rawGross += iGross;
// // //         lastGroup.rawCryptoNet += iCryptoNet;
// // //         lastGroup.rawTopupNet += iTopupNet;

// // //         if (item.status?.toLowerCase() === "pending")
// // //           lastGroup.status = "pending";
// // //         else if (
// // //           item.status?.toLowerCase() === "rejected" &&
// // //           lastGroup.status !== "pending"
// // //         )
// // //           lastGroup.status = "rejected";
// // //       } else {
// // //         groups.push({
// // //           _id: item._id,
// // //           createdAt: item.createdAt,
// // //           entries: [item],
// // //           rawGross: iGross,
// // //           rawCryptoNet: iCryptoNet,
// // //           rawTopupNet: iTopupNet,
// // //           walletAddress: item.walletAddress,
// // //           status: item.status || "pending",
// // //           isNewLogic: isNewLogic // Tracking for Leader override
// // //         });
// // //       }
// // //     }

// // //     // 🔥 LEADER ADJUSTMENT LOGIC (Fee removed, 50-50 split for old logic)
// // //     groups.forEach(g => {
// // //         if (isLeader && !g.isNewLogic) {
// // //             // Agar Leader hai aur entry PURANI hai (Before 4 PM)
// // //             const roundedGross = Math.floor(g.rawGross / 10) * 10;
// // //             g.totalGross = roundedGross;
// // //             g.totalCryptoNet = roundedGross * 0.50; // Adjusted for 0 fee
// // //             g.totalTopupNet = roundedGross * 0.50;  // Adjusted for 0 fee
// // //         } else {
// // //             // Normal user YA Naya logic (After 4 PM) -> Exact backend values
// // //             g.totalGross = g.rawGross;
// // //             g.totalCryptoNet = g.rawCryptoNet;
// // //             g.totalTopupNet = g.rawTopupNet;
// // //         }
// // //     });

// // //     return groups;
// // //   };

// // //   const grouped = groupWithdrawals(withdrawals);

// // //   const totalAmount = grouped.reduce((sum, g) => {
// // //       // Sirf Success/Approved withdrawals ka total
// // //       if (g.status?.toLowerCase() === "success" || g.status?.toLowerCase() === "approved") {
// // //           return sum + g.totalGross;
// // //       }
// // //       return sum;
// // //   }, 0);

// // //   const filtered = grouped.filter((g) => {
// // //     const searchLower = search.toLowerCase();
// // //     const matchSearch =
// // //       g.status?.toLowerCase().includes(searchLower) ||
// // //       g.totalGross.toString().includes(searchLower) ||
// // //       new Date(g.createdAt)
// // //         .toLocaleDateString("en-GB")
// // //         .includes(searchLower) ||
// // //       (g.walletAddress?.toLowerCase() || "").includes(searchLower);

// // //     const matchStatus =
// // //       statusFilter === "all" ||
// // //       g.status?.toLowerCase() === statusFilter.toLowerCase();

// // //     return matchSearch && matchStatus;
// // //   });

// // //   const sortedFiltered = [...filtered].sort(
// // //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
// // //   );

// // //   const totalPages =
// // //     Math.ceil(sortedFiltered.length / itemsPerPage) || 1;

// // //   const startIdx = (currentPage - 1) * itemsPerPage;

// // //   const paginated = sortedFiltered.slice(
// // //     startIdx,
// // //     startIdx + itemsPerPage
// // //   );

// // //   useEffect(() => {
// // //     setCurrentPage(1);
// // //   }, [search, statusFilter]);

// // //   const getStatusDetails = (group) => {
// // //     const s = group.status?.toLowerCase();

// // //     if (s === "approved" || s === "success") {
// // //       return {
// // //         label: group.status,
// // //         color: "bg-green-500/10 text-green-400 border-green-500/20",
// // //       };
// // //     }

// // //     if (s === "pending") {
// // //       return {
// // //         label: group.status,
// // //         color: "bg-[#eab308]/10 text-[#eab308] border-[#eab308]/20",
// // //       };
// // //     }

// // //     if (s === "rejected" || s === "failed") {
// // //       return {
// // //         label: group.status,
// // //         color: "bg-red-500/10 text-red-400 border-red-500/20",
// // //       };
// // //     }

// // //     return {
// // //       label: group.status || "UNKNOWN",
// // //       color: "bg-gray-500/10 text-gray-400 border-gray-500/20",
// // //     };
// // //   };

// // //   return (
// // //     <div className="w-full min-h-screen bg-[#0b1221] p-4 md:p-8 font-sans">

// // //       {/* Inner Card Container */}
// // //       <div className="max-w-7xl mx-auto bg-[#131c31] rounded-xl border-t-[3px] border-[#eab308] shadow-2xl p-4 sm:p-6">

// // //         {/* HEADER */}
// // //         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
// // //           <div>
// // //             <h2 className="text-2xl sm:text-3xl text-[#eab308] font-bold tracking-wide flex items-center gap-3">
// // //               <Banknote className="text-[#eab308]" size={28} />
// // //               Withdrawal History
// // //             </h2>
            
// // //           </div>
// // //         </div>

// // //         {/* STATS */}
// // //         <div className="mb-8">
// // //           <div className="bg-[#0b1221] border border-gray-700 rounded-xl p-5 md:p-6 relative overflow-hidden flex flex-col justify-center max-w-sm">
// // //             <h3 className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
// // //               <Wallet size={14} className="text-[#eab308]" />
// // //               Total Withdrawn
// // //             </h3>
// // //             <p className="text-3xl md:text-4xl font-black text-green-400">
// // //               ${totalAmount.toFixed(2)}
// // //             </p>
// // //           </div>
// // //         </div>

// // //         {/* FILTERS */}
// // //         <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-start sm:items-center text-gray-300 text-sm">

// // //           <div className="flex items-center gap-2 w-full sm:w-auto">
// // //             <div className="relative w-full sm:w-80 group">
// // //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // //                 <Search size={16} className="text-gray-500" />
// // //               </div>
// // //               <input
// // //                 type="text"
// // //                 placeholder="Search amount, wallet..."
// // //                 value={search}
// // //                 onChange={(e) => setSearch(e.target.value)}
// // //                 className="w-full bg-[#0b1221] border border-gray-700 text-gray-200 rounded px-3 py-2 pl-10 focus:outline-none focus:border-[#eab308] transition-colors placeholder-gray-500"
// // //               />
// // //             </div>
// // //           </div>

// // //           <div className="flex items-center gap-3 w-full sm:w-auto">
// // //             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
// // //               Filter:
// // //             </span>
// // //             <select
// // //               value={statusFilter}
// // //               onChange={(e) => setStatusFilter(e.target.value)}
// // //               className="w-full sm:w-auto bg-[#0b1221] border border-gray-700 text-[#eab308] text-sm font-bold rounded px-4 py-2 focus:outline-none focus:border-[#eab308] transition-colors cursor-pointer capitalize"
// // //             >
// // //               <option value="all">All Statuses</option>
// // //               <option value="pending">Pending</option>
// // //               <option value="approved">Approved</option>
// // //               <option value="rejected">Rejected</option>
// // //             </select>
// // //           </div>
// // //         </div>

// // //         {/* TABLE */}
// // //         <div className="overflow-x-auto border border-gray-700 rounded-lg">
// // //           <table className="w-full text-left whitespace-nowrap border-collapse">
// // //             <thead className="text-[#eab308] bg-[#1a253e] text-sm border-b border-gray-700">
// // //               <tr>
// // //                 <th className="p-4 border-r border-gray-700/50 font-bold text-center w-16">Sr. <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// // //                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Date <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// // //                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Total <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// // //                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">USDT <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// // //                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">TopUp Wallet <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// // //                 <th className="p-4 border-r border-gray-700/50 font-bold">Wallet Address</th>
// // //                 <th className="p-4 font-bold text-center">Status</th>
// // //               </tr>
// // //             </thead>

// // //             <tbody className="text-gray-300 text-sm">
// // //               {loading ? (
// // //                 <tr>
// // //                   <td colSpan="7" className="text-center py-12 text-[#eab308]">
// // //                      <div className="animate-spin h-8 w-8 mx-auto mb-3 border-4 border-t-transparent border-[#eab308] rounded-full"></div>
// // //                      Loading History...
// // //                   </td>
// // //                 </tr>
// // //               ) : paginated.length === 0 ? (
// // //                 <tr>
// // //                   <td colSpan="7" className="text-center py-12 text-gray-500">
// // //                     No Withdrawal Records Found
// // //                   </td>
// // //                 </tr>
// // //               ) : (
// // //                 paginated.map((group, idx) => {
// // //                   const statusInfo = getStatusDetails(group);

// // //                   return (
// // //                     <tr
// // //                       key={group._id}
// // //                       className="border-b border-gray-700 hover:bg-[#1a253e] transition-colors"
// // //                     >
// // //                       <td className="p-4 border-r border-gray-700/50 font-medium text-center">
// // //                         {startIdx + idx + 1}
// // //                       </td>

// // //                       <td className="p-4 border-r border-gray-700/50 font-medium text-center">
// // //                         {new Date(group.createdAt).toLocaleDateString(
// // //                           "en-GB", { day: '2-digit', month: 'short', year: 'numeric' }
// // //                         )}
// // //                       </td>

// // //                       <td className="p-4 border-r border-gray-700/50 font-bold text-center text-white">
// // //                         ${group.totalGross.toFixed(2)}
// // //                       </td>

// // //                       <td className="p-4 border-r border-gray-700/50 font-bold text-center text-[#eab308]">
// // //                         ${group.totalCryptoNet.toFixed(2)}
// // //                       </td>

// // //                       <td className="p-4 border-r border-gray-700/50 font-bold text-center text-purple-400">
// // //                         ${group.totalTopupNet.toFixed(2)}
// // //                       </td>

// // //                       <td className="p-4 border-r border-gray-700/50 text-gray-400 font-mono text-[11px] sm:text-xs">
// // //                         {group.walletAddress ? (
// // //                           <span className="px-2 py-1 rounded border border-gray-700 bg-[#0b1221]">
// // //                             {group.walletAddress}
// // //                           </span>
// // //                         ) : (
// // //                           "N/A"
// // //                         )}
// // //                       </td>

// // //                       <td className="p-4 text-center">
// // //                         <span
// // //                           className={`inline-flex items-center justify-center border px-2.5 py-1 text-[10px] font-bold tracking-widest rounded uppercase ${statusInfo.color}`}
// // //                         >
// // //                           {statusInfo.label}
// // //                         </span>
// // //                       </td>

// // //                     </tr>
// // //                   );
// // //                 })
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         {/* PAGINATION */}
// // //         {!loading && sortedFiltered.length > 0 && (
// // //           <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-gray-400 text-sm gap-4">
// // //             <div>
// // //               Showing <span className="text-white font-medium">{startIdx + 1}</span> to{" "}
// // //               <span className="text-white font-medium">
// // //                 {Math.min(startIdx + itemsPerPage, sortedFiltered.length)}
// // //               </span>{" "}
// // //               of <span className="text-white font-medium">{sortedFiltered.length}</span> entries
// // //             </div>

// // //             <div className="flex items-center bg-[#0b1221] rounded border border-gray-700 overflow-hidden">
// // //               <button
// // //                 onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
// // //                 disabled={currentPage === 1}
// // //                 className={`px-4 py-2 transition-colors ${
// // //                   currentPage === 1
// // //                     ? "text-gray-600 bg-transparent cursor-not-allowed"
// // //                     : "text-[#eab308] hover:bg-[#1a253e]"
// // //                 }`}
// // //               >
// // //                 Previous
// // //               </button>
// // //               <div className="px-4 py-2 border-l border-r border-gray-700 bg-[#1a253e] text-[#eab308] font-bold">
// // //                 {currentPage}
// // //               </div>
// // //               <button
// // //                 onClick={() =>
// // //                   setCurrentPage((p) => Math.min(p + 1, totalPages))
// // //                 }
// // //                 disabled={currentPage === totalPages}
// // //                 className={`px-4 py-2 transition-colors ${
// // //                   currentPage === totalPages
// // //                     ? "text-gray-600 bg-transparent cursor-not-allowed"
// // //                     : "text-[#eab308] hover:bg-[#1a253e]"
// // //                 }`}
// // //               >
// // //                 Next
// // //               </button>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default UserWithdrawalHistory;

// // import React, { useEffect, useState } from "react";
// // import api from "../../api/axios";
// // import { useAuth } from "../../context/AuthContext"; // 🔥 FIX 1: useAuth import kiya
// // import {
// //   Search,
// //   Banknote,
// //   ChevronLeft,
// //   ChevronRight,
// //   Wallet,
// // } from "lucide-react";

// // function UserWithdrawalHistory() {
// //   const { user, token } = useAuth(); // 🔥 FIX 2: localStorage ki jagah useAuth use kiya

// //   const [withdrawals, setWithdrawals] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState("");
// //   const [statusFilter, setStatusFilter] = useState("all");
// //   const [currentPage, setCurrentPage] = useState(1);

// //   const itemsPerPage = 10;

// //   // 🔥 FIX 3: Number() hata diya taaki 'WF...' string ID exactly waisi hi jaye
// //   const userId = user?.userId; 
  
// //   // Check if user is a Leader
// //   const isLeader = user?.role?.toLowerCase() === "leader";

// //   useEffect(() => {
// //     const fetchWithdrawals = async () => {
// //       if (!userId || !token) return; // Token aur userId ke bina API call nahi hogi
// //       try {
// //         setLoading(true);
// //         // 🔥 FIX 4: Token pass kiya aur aapke naye route /wallet/withdrawals par request bheji
// //         const res = await api.get(
// //           `/wallet/withdrawals/${userId}?t=${new Date().getTime()}`,
// //           { headers: { Authorization: `Bearer ${token}` } } 
// //         );
        
// //         // Backend seedha 'withdrawals' array bhej raha hai
// //         setWithdrawals(res.data.withdrawals || []);
// //       } catch (error) {
// //         console.error("Error fetching withdrawal history:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchWithdrawals();
// //   }, [userId, token]);

// //   // 🔥 GROUP & ADJUST ENTRIES (WITH TIME-BASED LOGIC)
// //   const groupWithdrawals = (list) => {
// //     const sorted = [...list].sort(
// //       (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
// //     );

// //     const groups = [];
// //     const THRESHOLD_MS = 5000;
    
// //     // 🔥 CUTOFF TIME: 13 July 2026, 4:00 PM IST
// //     const CUTOFF_TIME = new Date("2026-07-13T16:00:00+05:30").getTime();

// //     for (const item of sorted) {
// //       const itemTime = new Date(item.createdAt).getTime();
// //       const lastGroup = groups[groups.length - 1];

// //       // 👉 TIME CHECK: Purana (before 4 PM) ya Naya (after 4 PM)
// //       const isNewLogic = itemTime >= CUTOFF_TIME;

// //       // 👉 AMOUNT CALCULATION LOGIC (Fee Removed completely)
// //       const iGross = isNewLogic ? Number(item.grossAmount || 0) : Number(item.grossAmount || 0) * 2;
// //       const iCryptoNet = Number(item.netAmount || 0); // USDT portion
      
// //       // TopUp calculation: Without fee -> TopUp = Gross - USDT
// //       const iTopupNet = isNewLogic ? (iGross - iCryptoNet) : Number(item.netAmount || 0);

// //       if (
// //         lastGroup &&
// //         itemTime -
// //           new Date(
// //             lastGroup.entries[lastGroup.entries.length - 1].createdAt
// //           ).getTime() <=
// //           THRESHOLD_MS
// //       ) {
// //         lastGroup.entries.push(item);

// //         lastGroup.rawGross += iGross;
// //         lastGroup.rawCryptoNet += iCryptoNet;
// //         lastGroup.rawTopupNet += iTopupNet;

// //         if (item.status?.toLowerCase() === "pending")
// //           lastGroup.status = "pending";
// //         else if (
// //           item.status?.toLowerCase() === "rejected" &&
// //           lastGroup.status !== "pending"
// //         )
// //           lastGroup.status = "rejected";
// //       } else {
// //         groups.push({
// //           _id: item._id,
// //           createdAt: item.createdAt,
// //           entries: [item],
// //           rawGross: iGross,
// //           rawCryptoNet: iCryptoNet,
// //           rawTopupNet: iTopupNet,
// //           walletAddress: item.walletAddress,
// //           status: item.status || "pending",
// //           isNewLogic: isNewLogic // Tracking for Leader override
// //         });
// //       }
// //     }

// //     // 🔥 LEADER ADJUSTMENT LOGIC (Fee removed, 50-50 split for old logic)
// //     groups.forEach(g => {
// //         if (isLeader && !g.isNewLogic) {
// //             // Agar Leader hai aur entry PURANI hai (Before 4 PM)
// //             const roundedGross = Math.floor(g.rawGross / 10) * 10;
// //             g.totalGross = roundedGross;
// //             g.totalCryptoNet = roundedGross * 0.50; // Adjusted for 0 fee
// //             g.totalTopupNet = roundedGross * 0.50;  // Adjusted for 0 fee
// //         } else {
// //             // Normal user YA Naya logic (After 4 PM) -> Exact backend values
// //             g.totalGross = g.rawGross;
// //             g.totalCryptoNet = g.rawCryptoNet;
// //             g.totalTopupNet = g.rawTopupNet;
// //         }
// //     });

// //     return groups;
// //   };

// //   const grouped = groupWithdrawals(withdrawals);

// //   const totalAmount = grouped.reduce((sum, g) => {
// //       // Sirf Success/Approved withdrawals ka total
// //       if (g.status?.toLowerCase() === "success" || g.status?.toLowerCase() === "approved") {
// //           return sum + g.totalGross;
// //       }
// //       return sum;
// //   }, 0);

// //   const filtered = grouped.filter((g) => {
// //     const searchLower = search.toLowerCase();
// //     const matchSearch =
// //       g.status?.toLowerCase().includes(searchLower) ||
// //       g.totalGross.toString().includes(searchLower) ||
// //       new Date(g.createdAt)
// //         .toLocaleDateString("en-GB")
// //         .includes(searchLower) ||
// //       (g.walletAddress?.toLowerCase() || "").includes(searchLower);

// //     const matchStatus =
// //       statusFilter === "all" ||
// //       g.status?.toLowerCase() === statusFilter.toLowerCase();

// //     return matchSearch && matchStatus;
// //   });

// //   const sortedFiltered = [...filtered].sort(
// //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
// //   );

// //   const totalPages =
// //     Math.ceil(sortedFiltered.length / itemsPerPage) || 1;

// //   const startIdx = (currentPage - 1) * itemsPerPage;

// //   const paginated = sortedFiltered.slice(
// //     startIdx,
// //     startIdx + itemsPerPage
// //   );

// //   useEffect(() => {
// //     setCurrentPage(1);
// //   }, [search, statusFilter]);

// //   const getStatusDetails = (group) => {
// //     const s = group.status?.toLowerCase();

// //     if (s === "approved" || s === "success") {
// //       return {
// //         label: group.status,
// //         color: "bg-green-500/10 text-green-400 border-green-500/20",
// //       };
// //     }

// //     if (s === "pending") {
// //       return {
// //         label: group.status,
// //         color: "bg-[#eab308]/10 text-[#eab308] border-[#eab308]/20",
// //       };
// //     }

// //     if (s === "rejected" || s === "failed") {
// //       return {
// //         label: group.status,
// //         color: "bg-red-500/10 text-red-400 border-red-500/20",
// //       };
// //     }

// //     return {
// //       label: group.status || "UNKNOWN",
// //       color: "bg-gray-500/10 text-gray-400 border-gray-500/20",
// //     };
// //   };

// //   return (
// //     <div className="w-full min-h-screen bg-[#0b1221] p-4 md:p-8 font-sans">

// //       {/* Inner Card Container */}
// //       <div className="max-w-7xl mx-auto bg-[#131c31] rounded-xl border-t-[3px] border-[#eab308] shadow-2xl p-4 sm:p-6">

// //         {/* HEADER */}
// //         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
// //           <div>
// //             <h2 className="text-2xl sm:text-3xl text-[#eab308] font-bold tracking-wide flex items-center gap-3">
// //               <Banknote className="text-[#eab308]" size={28} />
// //               Withdrawal History
// //             </h2>
            
// //           </div>
// //         </div>

// //         {/* STATS */}
// //         <div className="mb-8">
// //           <div className="bg-[#0b1221] border border-gray-700 rounded-xl p-5 md:p-6 relative overflow-hidden flex flex-col justify-center max-w-sm">
// //             <h3 className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
// //               <Wallet size={14} className="text-[#eab308]" />
// //               Total Withdrawn
// //             </h3>
// //             <p className="text-3xl md:text-4xl font-black text-green-400">
// //               ${totalAmount.toFixed(2)}
// //             </p>
// //           </div>
// //         </div>

// //         {/* FILTERS */}
// //         <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-start sm:items-center text-gray-300 text-sm">

// //           <div className="flex items-center gap-2 w-full sm:w-auto">
// //             <div className="relative w-full sm:w-80 group">
// //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                 <Search size={16} className="text-gray-500" />
// //               </div>
// //               <input
// //                 type="text"
// //                 placeholder="Search amount, wallet..."
// //                 value={search}
// //                 onChange={(e) => setSearch(e.target.value)}
// //                 className="w-full bg-[#0b1221] border border-gray-700 text-gray-200 rounded px-3 py-2 pl-10 focus:outline-none focus:border-[#eab308] transition-colors placeholder-gray-500"
// //               />
// //             </div>
// //           </div>

// //           <div className="flex items-center gap-3 w-full sm:w-auto">
// //             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
// //               Filter:
// //             </span>
// //             <select
// //               value={statusFilter}
// //               onChange={(e) => setStatusFilter(e.target.value)}
// //               className="w-full sm:w-auto bg-[#0b1221] border border-gray-700 text-[#eab308] text-sm font-bold rounded px-4 py-2 focus:outline-none focus:border-[#eab308] transition-colors cursor-pointer capitalize"
// //             >
// //               <option value="all">All Statuses</option>
// //               <option value="pending">Pending</option>
// //               <option value="approved">Approved</option>
// //               <option value="rejected">Rejected</option>
// //             </select>
// //           </div>
// //         </div>

// //         {/* TABLE */}
// //         <div className="overflow-x-auto border border-gray-700 rounded-lg">
// //           <table className="w-full text-left whitespace-nowrap border-collapse">
// //             <thead className="text-[#eab308] bg-[#1a253e] text-sm border-b border-gray-700">
// //               <tr>
// //                 <th className="p-4 border-r border-gray-700/50 font-bold text-center w-16">Sr. <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// //                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Date <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// //                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Total <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// //                  <th className="p-4 border-r border-gray-700/50 font-bold">Wallet Address</th>
// //                 <th className="p-4 font-bold text-center">Status</th>
// //               </tr>
// //             </thead>

// //             <tbody className="text-gray-300 text-sm">
// //               {loading ? (
// //                 <tr>
// //                   <td colSpan="7" className="text-center py-12 text-[#eab308]">
// //                      <div className="animate-spin h-8 w-8 mx-auto mb-3 border-4 border-t-transparent border-[#eab308] rounded-full"></div>
// //                      Loading History...
// //                   </td>
// //                 </tr>
// //               ) : paginated.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="7" className="text-center py-12 text-gray-500">
// //                     No Withdrawal Records Found
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 paginated.map((group, idx) => {
// //                   const statusInfo = getStatusDetails(group);

// //                   return (
// //                     <tr
// //                       key={group._id || idx}
// //                       className="border-b border-gray-700 hover:bg-[#1a253e] transition-colors"
// //                     >
// //                       <td className="p-4 border-r border-gray-700/50 font-medium text-center">
// //                         {startIdx + idx + 1}
// //                       </td>

// //                       <td className="p-4 border-r border-gray-700/50 font-medium text-center">
// //                         {new Date(group.createdAt).toLocaleDateString(
// //                           "en-GB", { day: '2-digit', month: 'short', year: 'numeric' }
// //                         )}
// //                       </td>

// //                       <td className="p-4 border-r border-gray-700/50 font-bold text-center text-white">
// //                         ${group.totalGross.toFixed(2)}
// //                       </td>
 

                       

// //                       <td className="p-4 border-r border-gray-700/50 text-gray-400 font-mono text-[11px] sm:text-xs">
// //                         {group.walletAddress ? (
// //                           <span className="px-2 py-1 rounded border border-gray-700 bg-[#0b1221]">
// //                             {group.walletAddress}
// //                           </span>
// //                         ) : (
// //                           "N/A"
// //                         )}
// //                       </td>

// //                       <td className="p-4 text-center">
// //                         <span
// //                           className={`inline-flex items-center justify-center border px-2.5 py-1 text-[10px] font-bold tracking-widest rounded uppercase ${statusInfo.color}`}
// //                         >
// //                           {statusInfo.label}
// //                         </span>
// //                       </td>

// //                     </tr>
// //                   );
// //                 })
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* PAGINATION */}
// //         {!loading && sortedFiltered.length > 0 && (
// //           <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-gray-400 text-sm gap-4">
// //             <div>
// //               Showing <span className="text-white font-medium">{startIdx + 1}</span> to{" "}
// //               <span className="text-white font-medium">
// //                 {Math.min(startIdx + itemsPerPage, sortedFiltered.length)}
// //               </span>{" "}
// //               of <span className="text-white font-medium">{sortedFiltered.length}</span> entries
// //             </div>

// //             <div className="flex items-center bg-[#0b1221] rounded border border-gray-700 overflow-hidden">
// //               <button
// //                 onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
// //                 disabled={currentPage === 1}
// //                 className={`px-4 py-2 transition-colors ${
// //                   currentPage === 1
// //                     ? "text-gray-600 bg-transparent cursor-not-allowed"
// //                     : "text-[#eab308] hover:bg-[#1a253e]"
// //                 }`}
// //               >
// //                 Previous
// //               </button>
// //               <div className="px-4 py-2 border-l border-r border-gray-700 bg-[#1a253e] text-[#eab308] font-bold">
// //                 {currentPage}
// //               </div>
// //               <button
// //                 onClick={() =>
// //                   setCurrentPage((p) => Math.min(p + 1, totalPages))
// //                 }
// //                 disabled={currentPage === totalPages}
// //                 className={`px-4 py-2 transition-colors ${
// //                   currentPage === totalPages
// //                     ? "text-gray-600 bg-transparent cursor-not-allowed"
// //                     : "text-[#eab308] hover:bg-[#1a253e]"
// //                 }`}
// //               >
// //                 Next
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default UserWithdrawalHistory;


// import React, { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { useAuth } from "../../context/AuthContext"; 
// import {
//   Search,
//   Banknote,
//   ChevronLeft,
//   ChevronRight,
//   Wallet,
//   CalendarClock
// } from "lucide-react";

// function UserWithdrawalHistory() {
//   const { user, token } = useAuth(); 

//   const [withdrawals, setWithdrawals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 10;
//   const userId = user?.userId; 
//   const isLeader = user?.role?.toLowerCase() === "leader";

//   useEffect(() => {
//     const fetchWithdrawals = async () => {
//       if (!userId || !token) return; 
//       try {
//         setLoading(true);
//         const res = await api.get(
//           `/wallet/withdrawals/${userId}?t=${new Date().getTime()}`,
//           { headers: { Authorization: `Bearer ${token}` } } 
//         );
        
//         setWithdrawals(res.data.withdrawals || []);
//       } catch (error) {
//         console.error("Error fetching withdrawal history:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWithdrawals();
//   }, [userId, token]);

//   const groupWithdrawals = (list) => {
//     const sorted = [...list].sort(
//       (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//     );

//     const groups = [];
//     const THRESHOLD_MS = 5000;
//     const CUTOFF_TIME = new Date("2026-07-13T16:00:00+05:30").getTime();

//     for (const item of sorted) {
//       const itemTime = new Date(item.createdAt).getTime();
//       const lastGroup = groups[groups.length - 1];
//       const isNewLogic = itemTime >= CUTOFF_TIME;

//       const iGross = isNewLogic ? Number(item.grossAmount || 0) : Number(item.grossAmount || 0) * 2;
//       const iCryptoNet = Number(item.netAmount || 0); 
//       const iTopupNet = isNewLogic ? (iGross - iCryptoNet) : Number(item.netAmount || 0);

//       if (
//         lastGroup &&
//         itemTime -
//           new Date(
//             lastGroup.entries[lastGroup.entries.length - 1].createdAt
//           ).getTime() <=
//           THRESHOLD_MS
//       ) {
//         lastGroup.entries.push(item);

//         lastGroup.rawGross += iGross;
//         lastGroup.rawCryptoNet += iCryptoNet;
//         lastGroup.rawTopupNet += iTopupNet;

//         if (item.status?.toLowerCase() === "pending")
//           lastGroup.status = "pending";
//         else if (
//           item.status?.toLowerCase() === "rejected" &&
//           lastGroup.status !== "pending"
//         )
//           lastGroup.status = "rejected";
//       } else {
//         groups.push({
//           _id: item._id,
//           createdAt: item.createdAt,
//           entries: [item],
//           rawGross: iGross,
//           rawCryptoNet: iCryptoNet,
//           rawTopupNet: iTopupNet,
//           walletAddress: item.walletAddress,
//           status: item.status || "pending",
//           isNewLogic: isNewLogic 
//         });
//       }
//     }

//     groups.forEach(g => {
//         if (isLeader && !g.isNewLogic) {
//             const roundedGross = Math.floor(g.rawGross / 10) * 10;
//             g.totalGross = roundedGross;
//             g.totalCryptoNet = roundedGross * 0.50; 
//             g.totalTopupNet = roundedGross * 0.50;  
//         } else {
//             g.totalGross = g.rawGross;
//             g.totalCryptoNet = g.rawCryptoNet;
//             g.totalTopupNet = g.rawTopupNet;
//         }
//     });

//     return groups;
//   };

//   const grouped = groupWithdrawals(withdrawals);

//   const totalAmount = grouped.reduce((sum, g) => {
//       if (g.status?.toLowerCase() === "success" || g.status?.toLowerCase() === "approved") {
//           return sum + g.totalGross;
//       }
//       return sum;
//   }, 0);

//   const filtered = grouped.filter((g) => {
//     const searchLower = search.toLowerCase();
//     const matchSearch =
//       g.status?.toLowerCase().includes(searchLower) ||
//       g.totalGross.toString().includes(searchLower) ||
//       new Date(g.createdAt)
//         .toLocaleDateString("en-GB")
//         .includes(searchLower) ||
//       (g.walletAddress?.toLowerCase() || "").includes(searchLower);

//     const matchStatus =
//       statusFilter === "all" ||
//       g.status?.toLowerCase() === statusFilter.toLowerCase();

//     return matchSearch && matchStatus;
//   });

//   const sortedFiltered = [...filtered].sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );

//   const totalPages = Math.ceil(sortedFiltered.length / itemsPerPage) || 1;
//   const startIdx = (currentPage - 1) * itemsPerPage;
//   const paginated = sortedFiltered.slice(startIdx, startIdx + itemsPerPage);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search, statusFilter]);

//   const getStatusDetails = (group) => {
//     const s = group.status?.toLowerCase();

//     if (s === "approved" || s === "success") {
//       return {
//         label: group.status,
//         color: "bg-green-500/10 text-green-400 border-green-500/20",
//       };
//     }
//     if (s === "pending") {
//       return {
//         label: group.status,
//         color: "bg-[#eab308]/10 text-[#eab308] border-[#eab308]/20",
//       };
//     }
//     if (s === "rejected" || s === "failed") {
//       return {
//         label: group.status,
//         color: "bg-red-500/10 text-red-400 border-red-500/20",
//       };
//     }
//     return {
//       label: group.status || "UNKNOWN",
//       color: "bg-gray-500/10 text-gray-400 border-gray-500/20",
//     };
//   };

//   // 🔥 NAYA LOGIC: EXPECTED CREDIT DATE CALCULATION
//   const getExpectedCreditDate = (createdAtStr) => {
//     const createdDate = new Date(createdAtStr);
//     const ruleStartDate = new Date("2026-10-11T00:00:00+05:30"); // Naya rule kal se lagu hua hai

//     if (createdDate >= ruleStartDate) {
//         // Naye withdrawals ke liye +10 Din jod do
//         const expectedDate = new Date(createdDate);
//         expectedDate.setDate(expectedDate.getDate() + 10);
//         return expectedDate.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' });
//     } else {
//         // Purane withdrawals (Jo pehle hi aa chuke hain) unki same date dikhao
//         return createdDate.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' });
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-[#0b1221] p-4 md:p-8 font-sans">

//       <div className="max-w-7xl mx-auto bg-[#131c31] rounded-xl border-t-[3px] border-[#eab308] shadow-2xl p-4 sm:p-6">

//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
//           <div>
//             <h2 className="text-2xl sm:text-3xl text-[#eab308] font-bold tracking-wide flex items-center gap-3">
//               <Banknote className="text-[#eab308]" size={28} />
//               Withdrawal History
//             </h2>
//           </div>
//         </div>

//         {/* STATS */}
//         <div className="mb-8">
//           <div className="bg-[#0b1221] border border-gray-700 rounded-xl p-5 md:p-6 relative overflow-hidden flex flex-col justify-center max-w-sm">
//             <h3 className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
//               <Wallet size={14} className="text-[#eab308]" />
//               Total Withdrawn
//             </h3>
//             <p className="text-3xl md:text-4xl font-black text-green-400">
//               ${totalAmount.toFixed(2)}
//             </p>
//           </div>
//         </div>

//         {/* FILTERS */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-start sm:items-center text-gray-300 text-sm">
//           <div className="flex items-center gap-2 w-full sm:w-auto">
//             <div className="relative w-full sm:w-80 group">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search size={16} className="text-gray-500" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search amount, wallet..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full bg-[#0b1221] border border-gray-700 text-gray-200 rounded px-3 py-2 pl-10 focus:outline-none focus:border-[#eab308] transition-colors placeholder-gray-500"
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-3 w-full sm:w-auto">
//             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
//               Filter:
//             </span>
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="w-full sm:w-auto bg-[#0b1221] border border-gray-700 text-[#eab308] text-sm font-bold rounded px-4 py-2 focus:outline-none focus:border-[#eab308] transition-colors cursor-pointer capitalize"
//             >
//               <option value="all">All Statuses</option>
//               <option value="pending">Pending</option>
//               <option value="approved">Approved</option>
//               <option value="rejected">Rejected</option>
//             </select>
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto border border-gray-700 rounded-lg">
//           <table className="w-full text-left whitespace-nowrap border-collapse">
//             <thead className="text-[#eab308] bg-[#1a253e] text-sm border-b border-gray-700">
//               <tr>
//                 <th className="p-4 border-r border-gray-700/50 font-bold text-center w-16">Sr.</th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Request Date</th>
//                 {/* 🔥 NAYA COLUMN: Credit Date */}
//                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Total</th>
//                  <th className="p-4 border-r border-gray-700/50 font-bold">Wallet Address</th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Credit Date</th>
//                 <th className="p-4 font-bold text-center">Status</th>
//               </tr>
//             </thead>

//             <tbody className="text-gray-300 text-sm">
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-12 text-[#eab308]">
//                      <div className="animate-spin h-8 w-8 mx-auto mb-3 border-4 border-t-transparent border-[#eab308] rounded-full"></div>
//                      Loading History...
//                   </td>
//                 </tr>
//               ) : paginated.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-12 text-gray-500">
//                     No Withdrawal Records Found
//                   </td>
//                 </tr>
//               ) : (
//                 paginated.map((group, idx) => {
//                   const statusInfo = getStatusDetails(group);
//                   const expectedDate = getExpectedCreditDate(group.createdAt); // 🔥 Naya function call kiya

//                   return (
//                     <tr
//                       key={group._id || idx}
//                       className="border-b border-gray-700 hover:bg-[#1a253e] transition-colors"
//                     >
//                       <td className="p-4 border-r border-gray-700/50 font-medium text-center">
//                         {startIdx + idx + 1}
//                       </td>

//                       <td className="p-4 border-r border-gray-700/50 font-medium text-center text-gray-400">
//                         {new Date(group.createdAt).toLocaleDateString(
//                           "en-GB", { day: '2-digit', month: 'short', year: 'numeric' }
//                         )}
//                       </td>

                     

//                       <td className="p-4 border-r border-gray-700/50 font-black text-center text-white">
//                         ${group.totalGross.toFixed(2)}
//                       </td>
 
//                       <td className="p-4 border-r border-gray-700/50 text-gray-400 font-mono text-[11px] sm:text-xs">
//                         {group.walletAddress ? (
//                           <span className="px-2 py-1 rounded border border-gray-700 bg-[#0b1221]">
//                             {group.walletAddress}
//                           </span>
//                         ) : (
//                           "N/A"
//                         )}
//                       </td>

//                        {/* 🔥 EXPECTED DATE DISPLAY */}
//                       <td className="p-4 border-r border-gray-700/50 font-bold text-center text-[#eab308]">
//                         <div className="flex items-center justify-center gap-1.5">
//                             <CalendarClock size={14} className="text-[#eab308]/70" />
//                             {expectedDate}
//                         </div>
//                       </td>

//                       <td className="p-4 text-center">
//                         <span
//                           className={`inline-flex items-center justify-center border px-2.5 py-1 text-[10px] font-bold tracking-widest rounded uppercase ${statusInfo.color}`}
//                         >
//                           {statusInfo.label}
//                         </span>
//                       </td>

//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         {!loading && sortedFiltered.length > 0 && (
//           <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-gray-400 text-sm gap-4">
//             <div>
//               Showing <span className="text-white font-medium">{startIdx + 1}</span> to{" "}
//               <span className="text-white font-medium">
//                 {Math.min(startIdx + itemsPerPage, sortedFiltered.length)}
//               </span>{" "}
//               of <span className="text-white font-medium">{sortedFiltered.length}</span> entries
//             </div>

//             <div className="flex items-center bg-[#0b1221] rounded border border-gray-700 overflow-hidden">
//               <button
//                 onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                 disabled={currentPage === 1}
//                 className={`px-4 py-2 transition-colors ${
//                   currentPage === 1
//                     ? "text-gray-600 bg-transparent cursor-not-allowed"
//                     : "text-[#eab308] hover:bg-[#1a253e]"
//                 }`}
//               >
//                 Previous
//               </button>
//               <div className="px-4 py-2 border-l border-r border-gray-700 bg-[#1a253e] text-[#eab308] font-bold">
//                 {currentPage}
//               </div>
//               <button
//                 onClick={() =>
//                   setCurrentPage((p) => Math.min(p + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//                 className={`px-4 py-2 transition-colors ${
//                   currentPage === totalPages
//                     ? "text-gray-600 bg-transparent cursor-not-allowed"
//                     : "text-[#eab308] hover:bg-[#1a253e]"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserWithdrawalHistory;


import React, { useCallback, useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import {
  Search,
  Banknote,
  ChevronLeft,
  ChevronRight,
  Wallet,
  RefreshCw,
  Clock3,
  CheckCircle2,
  XCircle,
  ArrowDownToLine,
  Copy,
  Filter,
  CalendarDays,
  CircleDollarSign,
  Layers3,
} from "lucide-react";

const PAGE_SIZE = 10;
const CUTOFF_TIME = new Date("2026-07-13T16:00:00+05:30").getTime();
const THRESHOLD_MS = 5000;

const money = (value) => {
  const number = Number(value);
  return (Number.isFinite(number) ? number : 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const shortDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusMeta = (status) => {
  const value = String(status || "unknown").toLowerCase();
  if (value === "approved" || value === "success") {
    return {
      label: status || "Success",
      className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
      Icon: CheckCircle2,
    };
  }
  if (value === "pending") {
    return {
      label: status,
      className: "border-amber-300/20 bg-amber-300/10 text-amber-200",
      Icon: Clock3,
    };
  }
  if (value === "rejected" || value === "failed") {
    return {
      label: status,
      className: "border-rose-400/20 bg-rose-400/10 text-rose-300",
      Icon: XCircle,
    };
  }
  return {
    label: status || "Unknown",
    className: "border-slate-500/20 bg-slate-500/10 text-slate-300",
    Icon: Clock3,
  };
};

function UserWithdrawalHistory() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [copiedAddress, setCopiedAddress] = useState("");

  const storedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);
  const userId = storedUser?.userId;
  const isLeader = String(storedUser?.role || "").toLowerCase() === "leader";

  const fetchWithdrawals = useCallback(async (signal) => {
    if (!userId) {
      setWithdrawals([]);
      setLoading(false);
      setError("");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await api.get(
        `/wallet/withdrawals/${userId}?t=${Date.now()}`,
        signal ? { signal } : undefined
      );
      setWithdrawals(Array.isArray(response.data?.withdrawals) ? response.data.withdrawals : []);
    } catch (fetchError) {
      if (fetchError?.name === "CanceledError" || fetchError?.code === "ERR_CANCELED") return;
      console.error("Error fetching withdrawal history:", fetchError);
      setWithdrawals([]);
      setError("We couldn't load your withdrawal history. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    const controller = new AbortController();
    fetchWithdrawals(controller.signal);
    return () => controller.abort();
  }, [fetchWithdrawals, refreshKey]);

  const grouped = useMemo(() => {
    const sorted = [...withdrawals].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    const groups = [];

    for (const item of sorted) {
      const itemTime = new Date(item.createdAt).getTime();
      const isNewLogic = itemTime >= CUTOFF_TIME;
      const gross = isNewLogic
        ? Number(item.grossAmount || 0)
        : Number(item.grossAmount || 0) * 2;
      const cryptoNet = Number(item.netAmount || 0);
      const topupNet = isNewLogic ? gross - cryptoNet : Number(item.netAmount || 0);
      const lastGroup = groups[groups.length - 1];
      const lastItem = lastGroup?.entries?.[lastGroup.entries.length - 1];
      const lastTime = lastItem ? new Date(lastItem.createdAt).getTime() : 0;

      if (lastGroup && Number.isFinite(itemTime) && itemTime - lastTime <= THRESHOLD_MS) {
        lastGroup.entries.push(item);
        lastGroup.rawGross += gross;
        lastGroup.rawCryptoNet += cryptoNet;
        lastGroup.rawTopupNet += topupNet;
        if (String(item.status || "").toLowerCase() === "pending") {
          lastGroup.status = "pending";
        } else if (
          String(item.status || "").toLowerCase() === "rejected" &&
          String(lastGroup.status || "").toLowerCase() !== "pending"
        ) {
          lastGroup.status = "rejected";
        }
        if (!lastGroup.walletAddress && item.walletAddress) {
          lastGroup.walletAddress = item.walletAddress;
        }
      } else {
        groups.push({
          _id: item._id || `${item.createdAt}-${groups.length}`,
          createdAt: item.createdAt,
          entries: [item],
          rawGross: gross,
          rawCryptoNet: cryptoNet,
          rawTopupNet: topupNet,
          walletAddress: item.walletAddress,
          status: item.status || "pending",
          isNewLogic,
        });
      }
    }

    groups.forEach((group) => {
      if (isLeader && !group.isNewLogic) {
        const roundedGross = Math.floor(group.rawGross / 10) * 10;
        group.totalGross = roundedGross;
        group.totalCryptoNet = roundedGross * 0.5;
        group.totalTopupNet = roundedGross * 0.5;
      } else {
        group.totalGross = group.rawGross;
        group.totalCryptoNet = group.rawCryptoNet;
        group.totalTopupNet = group.rawTopupNet;
      }
    });

    return groups;
  }, [withdrawals, isLeader]);

  const totalWithdrawn = useMemo(
    () =>
      grouped.reduce((sum, group) => {
        const status = String(group.status || "").toLowerCase();
        return status === "success" || status === "approved"
          ? sum + Number(group.totalGross || 0)
          : sum;
      }, 0),
    [grouped]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return grouped
      .filter((group) => {
        const searchableDate = group.createdAt
          ? new Date(group.createdAt).toLocaleDateString("en-GB")
          : "";
        const matchesSearch =
          !query ||
          String(group.status || "").toLowerCase().includes(query) ||
          String(group.totalGross ?? "").includes(query) ||
          searchableDate.toLowerCase().includes(query) ||
          String(group.walletAddress || "").toLowerCase().includes(query) ||
          String(group.entries?.[0]?.description || "").toLowerCase().includes(query);
        const status = String(group.status || "").toLowerCase();
        const matchesStatus = statusFilter === "all" || status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [grouped, search, statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(startIdx, startIdx + PAGE_SIZE);

  const copyAddress = async (address) => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      window.setTimeout(() => setCopiedAddress(""), 1600);
    } catch (copyError) {
      console.error("Unable to copy wallet address:", copyError);
    }
  };

  const pendingCount = grouped.filter((g) => String(g.status).toLowerCase() === "pending").length;
  const completedCount = grouped.filter((g) =>
    ["success", "approved"].includes(String(g.status).toLowerCase())
  ).length;

  return (
    <main className="min-h-screen w-full bg-[#080b14] px-3 pb-24 pt-6 font-sans text-slate-100 sm:px-5 sm:pt-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="relative mb-6 overflow-hidden rounded-2xl border border-violet-400/15 bg-gradient-to-br from-[#15132a] via-[#101525] to-[#0b101c] p-5 sm:p-7">
          <div className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/3 h-24 w-48 rounded-full bg-cyan-400/[0.07] blur-3xl" />
          <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-200">
                <Banknote size={13} />
                Wallet activity
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
                Withdrawal <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-200 bg-clip-text text-transparent">History</span>
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Track withdrawal requests, payout splits, destination wallets and transaction status in one place.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setRefreshKey((value) => value + 1)}
              disabled={loading}
              className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-violet-300/30 hover:bg-violet-300/[0.08] disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
              Refresh history
            </button>
          </div>
        </header>

        <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <article className="relative overflow-hidden rounded-2xl border border-emerald-400/15 bg-[#101721] p-4 sm:p-5">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-400/[0.06] blur-2xl" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400">Total withdrawn</p>
                <p className="mt-3 text-2xl font-black tabular-nums text-white">${money(totalWithdrawn)}</p>
                <p className="mt-1 text-[11px] text-slate-500">Approved and successful only</p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/10 text-emerald-300">
                <Wallet size={20} />
              </span>
            </div>
          </article>
          <article className="rounded-2xl border border-amber-300/15 bg-[#101721] p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400">Pending requests</p>
                <p className="mt-3 text-2xl font-black tabular-nums text-white">{pendingCount.toLocaleString("en-US")}</p>
                <p className="mt-1 text-[11px] text-slate-500">Awaiting processing</p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-300/15 bg-amber-300/10 text-amber-200">
                <Clock3 size={20} />
              </span>
            </div>
          </article>
          <article className="rounded-2xl border border-cyan-300/15 bg-[#101721] p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400">Completed requests</p>
                <p className="mt-3 text-2xl font-black tabular-nums text-white">{completedCount.toLocaleString("en-US")}</p>
                <p className="mt-1 text-[11px] text-slate-500">Approved or successful</p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/10 text-cyan-200">
                <CheckCircle2 size={20} />
              </span>
            </div>
          </article>
        </section>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d121d] shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
          <div className="flex flex-col gap-3 border-b border-white/[0.07] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-300/10 text-violet-200">
                <Layers3 size={17} />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Payout ledger</h2>
                <p className="mt-0.5 text-xs text-slate-500">Grouped withdrawal entries and payout breakdown</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 self-start rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-slate-400 sm:self-auto">
              <CalendarDays size={14} className="text-cyan-200" />
              {filtered.length} matching {filtered.length === 1 ? "record" : "records"}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 border-b border-white/[0.07] bg-white/[0.015] p-4 sm:grid-cols-[minmax(0,1fr)_190px] sm:p-5">
            <label className="block">
              <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Search history</span>
              <span className="relative block">
                <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-violet-200" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search amount, date, wallet address or status..."
                  className="h-11 w-full rounded-xl border border-white/10 bg-[#080c15] pl-10 pr-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-violet-300/40 focus:ring-2 focus:ring-violet-300/[0.07]"
                />
              </span>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Status filter</span>
              <span className="relative block">
                <Filter size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cyan-200" />
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-[#080c15] pl-9 pr-3 text-sm font-medium capitalize text-slate-200 outline-none transition focus:border-violet-300/40"
                >
                  <option value="all">All statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="success">Success</option>
                  <option value="rejected">Rejected</option>
                  <option value="failed">Failed</option>
                </select>
              </span>
            </label>
          </div>

          <div className="flex flex-col gap-1.5 px-4 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p>
              Showing <span className="font-bold text-slate-200">{filtered.length ? startIdx + 1 : 0}–{Math.min(startIdx + PAGE_SIZE, filtered.length)}</span> of{" "}
              <span className="font-bold text-slate-200">{filtered.length}</span> records
            </p>
            <p className="inline-flex items-center gap-1.5">
              <CircleDollarSign size={13} className="text-violet-200" />
              Amounts shown in USD
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1040px] border-collapse text-left">
              <thead>
                <tr className="border-y border-white/[0.07] bg-[#151a29] text-[10px] uppercase tracking-[0.15em] text-slate-400">
                  <th className="w-16 px-4 py-4 text-center font-bold">No.</th>
                  <th className="px-4 py-4 font-bold">Request date</th>
                  <th className="px-4 py-4 text-right font-bold">Total</th>
                  <th className="px-4 py-4 text-right font-bold">USDT portion</th>
                  <th className="px-4 py-4 text-right font-bold">Top-up wallet</th>
                  <th className="px-4 py-4 font-bold">Destination wallet</th>
                  <th className="px-4 py-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.055] text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <span className="mx-auto mb-3 block h-8 w-8 animate-spin rounded-full border-2 border-violet-300/20 border-t-violet-300" />
                      <span className="text-sm font-medium text-slate-300">Loading withdrawal history…</span>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-rose-400/15 bg-rose-400/10 text-rose-300">
                        <XCircle size={20} />
                      </div>
                      <p className="font-semibold text-rose-200">{error}</p>
                      <button
                        type="button"
                        onClick={() => setRefreshKey((value) => value + 1)}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-violet-300/20 bg-violet-300/10 px-4 py-2 text-sm font-semibold text-violet-100 transition hover:bg-violet-300/15"
                      >
                        <RefreshCw size={14} /> Try again
                      </button>
                    </td>
                  </tr>
                ) : paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-500">
                        <Search size={20} />
                      </div>
                      <p className="font-semibold text-slate-200">No withdrawal records found</p>
                      <p className="mt-1 text-xs text-slate-500">Try another search or change the status filter.</p>
                    </td>
                  </tr>
                ) : (
                  paginated.map((group, index) => {
                    const meta = getStatusMeta(group.status);
                    const StatusIcon = meta.Icon;
                    return (
                      <tr key={group._id || `${group.createdAt}-${index}`} className="group transition-colors hover:bg-violet-300/[0.025]">
                        <td className="px-4 py-4 text-center">
                          <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg bg-white/[0.04] px-1.5 text-xs font-semibold tabular-nums text-slate-500 group-hover:text-slate-300">
                            {startIdx + index + 1}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-300">
                            <CalendarDays size={14} className="text-violet-200" />
                            {shortDate(group.createdAt)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right">
                          <span className="font-bold tabular-nums text-white">${money(group.totalGross)}</span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right">
                          <span className="font-semibold tabular-nums text-cyan-200">${money(group.totalCryptoNet)}</span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right">
                          <span className="font-semibold tabular-nums text-violet-200">${money(group.totalTopupNet)}</span>
                        </td>
                        <td className="max-w-[260px] px-4 py-4">
                          {group.walletAddress ? (
                            <div className="flex items-center gap-2">
                              <span className="block max-w-[205px] truncate rounded-lg border border-white/[0.07] bg-[#080c15] px-2.5 py-1.5 font-mono text-[11px] text-slate-400" title={group.walletAddress}>
                                {group.walletAddress}
                              </span>
                              <button
                                type="button"
                                onClick={() => copyAddress(group.walletAddress)}
                                title="Copy wallet address"
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 text-slate-500 transition hover:border-cyan-300/25 hover:text-cyan-200"
                              >
                                <Copy size={12} />
                              </button>
                              {copiedAddress === group.walletAddress && <span className="text-[10px] text-emerald-300">Copied</span>}
                            </div>
                          ) : (
                            <span className="text-xs text-slate-600">Not provided</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider ${meta.className}`}>
                            <StatusIcon size={12} />
                            {meta.label}
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
            <footer className="flex flex-col gap-3 border-t border-white/[0.07] bg-white/[0.015] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <p className="text-xs text-slate-500">
                Page <span className="font-bold text-slate-200">{safePage}</span> of{" "}
                <span className="font-bold text-slate-200">{totalPages}</span>
              </p>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={safePage <= 1}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs font-semibold text-slate-300 transition hover:border-violet-300/30 hover:bg-violet-300/[0.06] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ChevronLeft size={15} /> Previous
                </button>
                <span className="flex h-9 min-w-16 items-center justify-center rounded-lg border border-violet-300/15 bg-violet-300/10 px-3 text-xs font-bold tabular-nums text-violet-100">
                  {safePage} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={safePage >= totalPages}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs font-semibold text-slate-300 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.06] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Next <ChevronRight size={15} />
                </button>
              </div>
            </footer>
          )}
        </section>
      </div>
    </main>
  );
}

export default UserWithdrawalHistory;
