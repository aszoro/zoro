// import React, { useEffect, useState } from "react";
// import { format } from "date-fns";
// import { useAuth } from "../../context/AuthContext";
// import api from "../../api/axios";
// import { Search, ChevronLeft, ChevronRight, ArrowUpRight, ArrowDownLeft, RefreshCcw, CheckCircle2, User, Calendar } from "lucide-react";

// const TopupDetails = () => {
//   const { user } = useAuth();
//   const [topups, setTopups] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // 🔥 HELPER: Decimal128 ko normal number me convert karne ke liye taaki NaN na aaye
//   const getSafeAmount = (val) => {
//     if (!val) return 0;
//     if (val.$numberDecimal) return parseFloat(val.$numberDecimal);
//     return parseFloat(val) || 0;
//   };

//   useEffect(() => {
//     const fetchTopups = async () => {
//       if (!user?.userId) {
//         setLoading(false);
//         setError("User not found. Please log in.");
//         return;
//       }

//       try {
//         setLoading(true);
//         const res = await api.get(`/wallet/topup-history/${user.userId}?t=${new Date().getTime()}`);
        
//         if (Array.isArray(res.data)) {
//           const userTopups = res.data.filter((t) => {
//             const typeStr = (t.type || "").toLowerCase();
//             const sourceStr = (t.source || "").toLowerCase();
//             const descStr = (t.description || "").toUpperCase();
            
//             const isTopupRelated = 
//               typeStr.includes("topup") || 
//               sourceStr.includes("topup") || 
//               typeStr.includes("activation") || 
//               typeStr.includes("package");
              
//             const isNotPromo = !descStr.includes("PROMOTION");
            
//             return isTopupRelated && isNotPromo;
//           });

//           const uniqueTopups = Array.from(
//             new Map(userTopups.map((t) => [`${t._id}-${t.createdAt}`, t])).values()
//           );

//           uniqueTopups.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));

//           setTopups(uniqueTopups);
//         } else {
//           setTopups([]);
//         }
//       } catch (err) {
//         console.error("Topup fetch error:", err);
//         setError(err.response?.data?.message || "Failed to load top-ups.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTopups();
//   }, [user]);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1); 
//   };

//   const filteredTopups = topups.filter((t) => {
//     const searchLower = searchQuery.toLowerCase();
//     const senderIdStr = (t.fromUserId || t.userId || "").toString().toLowerCase();
//     const receiverIdStr = (t.toUserId || t.userId || "").toString().toLowerCase();
//     const descStr = (t.description || "").toLowerCase();
//     const amountStr = getSafeAmount(t.amount || t.grossAmount).toString().toLowerCase();

//     return (
//       senderIdStr.includes(searchLower) ||
//       receiverIdStr.includes(searchLower) ||
//       descStr.includes(searchLower) ||
//       amountStr.includes(searchLower)
//     );
//   });

//   const totalPages = Math.ceil(filteredTopups.length / rowsPerPage) || 1;
//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredTopups.slice(indexOfFirstRow, indexOfLastRow);

//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const handlePrev = () => currentPage > 1 && setCurrentPage(prev => prev - 1);
//   const handleNext = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);

//   return (
//     <div className="w-full min-h-screen bg-[#0b1221] p-4 md:p-8 font-sans">
      
//       {/* Inner Card Container */}
//       <div className="max-w-7xl mx-auto bg-[#131c31] rounded-xl border-t-[3px] border-[#eab308] shadow-2xl p-4 sm:p-6">
        
//         {/* Header Title */}
//         <div className="mb-6">
//           <h2 className="text-2xl sm:text-3xl text-[#eab308] font-bold tracking-wide flex items-center gap-3">
//              <RefreshCcw className="text-[#eab308]" size={28} /> Package Details
//           </h2>
         
//         </div>

//         {/* Filters (Search & Entries) */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 text-gray-300 text-sm">
          
//           <div className="flex items-center gap-2">
//             <span>Show</span>
//             <select
//               value={rowsPerPage}
//               onChange={handleRowsPerPageChange}
//               className="bg-[#0b1221] border border-gray-700 text-[#eab308] rounded px-3 py-1.5 focus:outline-none focus:border-[#eab308] transition-colors"
//             >
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//               <option value={50}>50</option>
//             </select>
//             <span>entries</span>
//           </div>

//           <div className="flex items-center gap-2 w-full sm:w-auto">
//             <span>Search:</span>
//             <div className="relative w-full sm:w-64">
//                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                  <Search size={16} className="text-gray-500" />
//                </div>
//                <input
//                  type="text"
//                  placeholder="Search ID, details..."
//                  value={searchQuery}
//                  onChange={handleSearch}
//                  className="bg-[#0b1221] border border-gray-700 text-gray-200 rounded px-3 py-1.5 pl-9 w-full focus:outline-none focus:border-[#eab308] transition-colors placeholder-gray-500"
//                />
//             </div>
//           </div>
//         </div>

//         {/* Table Container */}
//         <div className="overflow-x-auto border border-gray-700 rounded-lg">
//           <table className="w-full text-left whitespace-nowrap border-collapse">
//             <thead className="text-[#eab308] bg-[#1a253e] text-sm border-b border-gray-700">
//               <tr>
//                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Sr.</th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Date & Time</th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold">Action Type</th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold">Sender</th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold">Receiver</th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Amount</th>
//                 <th className="p-4 font-bold">Details</th>
//               </tr>
//             </thead>

//             <tbody className="text-gray-300 text-sm">
//               {loading ? (
//                 <tr>
//                   <td colSpan="7" className="text-center py-8 text-[#eab308]">
//                      <div className="flex flex-col items-center justify-center">
//                        <RefreshCcw className="animate-spin mb-2" size={24} />
//                        Loading History...
//                      </div>
//                   </td>
//                 </tr>
//               ) : error ? (
//                 <tr>
//                   <td colSpan="7" className="text-center py-8 text-red-400 bg-red-900/10">
//                      {error}
//                   </td>
//                 </tr>
//               ) : currentRows.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="text-center py-8 text-gray-500">
//                     No package Records Found
//                   </td>
//                 </tr>
//               ) : (
//                 currentRows.map((t, idx) => {
                  
//                   const currentUserId = String(user?.userId || "");
//                   let senderId = t.fromUserId ? String(t.fromUserId) : String(t.userId);
//                   let receiverId = t.toUserId ? String(t.toUserId) : String(t.userId);
//                   const isDebitTransaction = t.type?.toLowerCase().includes("debit") || Number(getSafeAmount(t.amount)) < 0;

//                   if (isDebitTransaction && !t.toUserId) {
//                       senderId = currentUserId; 
//                       const descMatch = t.description?.match(/(?:for|user|to|#|-)\s*([0-9]{4,10})/i);
//                       if (descMatch && descMatch[1]) {
//                           receiverId = descMatch[1];
//                       } else {
//                           receiverId = "Team Member";
//                       }
//                   }

//                   let tagDetails = { icon: null, text: "", style: "" };

//                   if (senderId === currentUserId && receiverId === currentUserId) {
//                     tagDetails = { icon: <CheckCircle2 size={12}/>, text: "SELF ACTIVATION", style: "bg-green-500/10 text-green-400 border-green-500/20" };
//                   } else if (senderId === currentUserId && receiverId !== currentUserId) {
//                     tagDetails = { icon: <ArrowUpRight size={12}/>, text: "ACTIVATED FOR TEAM", style: "bg-[#eab308]/10 text-[#eab308] border-[#eab308]/20" };
//                   } else if (receiverId === currentUserId && senderId !== currentUserId) {
//                     tagDetails = { icon: <ArrowDownLeft size={12}/>, text: "ACTIVATED BY UPLINE", style: "bg-blue-500/10 text-blue-400 border-blue-500/20" };
//                   } else {
//                     tagDetails = { icon: <CheckCircle2 size={12}/>, text: "ACTIVATED", style: "bg-gray-500/10 text-gray-400 border-gray-500/20" };
//                   }

//                   const recordDate = t.createdAt || t.date;
//                   const finalAmount = getSafeAmount(t.amount || t.grossAmount);

//                   return (
//                     <tr
//                       key={`${t._id}-${t.createdAt}-${idx}`}
//                       className="border-b border-gray-700 hover:bg-[#1a253e] transition-colors"
//                     >
//                       <td className="p-4 border-r border-gray-700/50 text-center font-medium">
//                         {indexOfFirstRow + idx + 1}
//                       </td>
                      
//                       {/* 🔥 TIME AND DATE ADDED */}
//                       <td className="p-4 border-r border-gray-700/50 text-center">
//                          <div className="flex flex-col items-center justify-center">
//                            <span className="font-medium text-gray-200">
//                              {recordDate ? format(new Date(recordDate), "dd MMM yyyy") : "N/A"}
//                            </span>
//                            <span className="text-[11px] text-gray-500">
//                              {recordDate ? format(new Date(recordDate), "hh:mm a") : ""}
//                            </span>
//                          </div>
//                       </td>

//                       <td className="p-4 border-r border-gray-700/50">
//                         <span className={`flex items-center gap-1.5 w-fit border py-1 px-2.5 rounded text-[10px] font-bold tracking-wider ${tagDetails.style}`}>
//                           {tagDetails.icon} {tagDetails.text}
//                         </span>
//                       </td>

//                       <td className="p-4 border-r border-gray-700/50 font-medium text-white">
//                         <div className="flex items-center gap-2">
//                            <div className="p-1 bg-[#0b1221] rounded-full text-gray-500 border border-gray-700"><User size={12}/></div>
//                            {senderId === currentUserId ? (
//                              <span className="text-[#eab308]">#{senderId} <span className="text-[9px] bg-[#eab308]/20 text-[#eab308] px-1.5 py-0.5 rounded ml-1">YOU</span></span>
//                            ) : (
//                              <span>{senderId.includes("Team") ? senderId : `#${senderId}`}</span>
//                            )}
//                         </div>
//                       </td>

//                       <td className="p-4 border-r border-gray-700/50 font-medium text-white">
//                         <div className="flex items-center gap-2">
//                            <div className="p-1 bg-[#0b1221] rounded-full text-gray-500 border border-gray-700"><User size={12}/></div>
//                            {receiverId === currentUserId ? (
//                              <span className="text-[#eab308]">#{receiverId} <span className="text-[9px] bg-[#eab308]/20 text-[#eab308] px-1.5 py-0.5 rounded ml-1">YOU</span></span>
//                            ) : (
//                              <span>{receiverId.includes("Team") ? receiverId : `#${receiverId}`}</span>
//                            )}
//                         </div>
//                       </td>

//                       {/* 🔥 AMOUNT FIX APPLIED */}
//                       <td className="p-4 border-r border-gray-700/50 font-bold text-center text-[#eab308]">
//                          ${Math.abs(finalAmount).toFixed(2)}
//                       </td>

//                       <td className="p-4 text-gray-400 text-xs truncate max-w-[200px]" title={t.description || "Top-up package"}>
//                         {t.description || "Top-up package"}
//                       </td>

//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination Footer */}
//         {!loading && filteredTopups.length > 0 && (
//           <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-gray-400 text-sm gap-4">
//             <div>
//               Showing <span className="text-white font-medium">{indexOfFirstRow + 1}</span> to <span className="text-white font-medium">{Math.min(indexOfLastRow, filteredTopups.length)}</span> of <span className="text-white font-medium">{filteredTopups.length}</span> entries
//             </div>
            
//             <div className="flex items-center bg-[#0b1221] rounded border border-gray-700 overflow-hidden">
//               <button
//                 onClick={handlePrev}
//                 disabled={currentPage === 1}
//                 className={`px-4 py-2 transition-colors ${currentPage === 1 ? 'text-gray-600 bg-transparent cursor-not-allowed' : 'text-[#eab308] hover:bg-[#1a253e]'}`}
//               >
//                 Previous
//               </button>
//               <div className="px-4 py-2 border-l border-r border-gray-700 bg-[#1a253e] text-[#eab308] font-bold">
//                 {currentPage}
//               </div>
//               <button
//                 onClick={handleNext}
//                 disabled={currentPage === totalPages || totalPages === 0}
//                 className={`px-4 py-2 transition-colors ${currentPage === totalPages || totalPages === 0 ? 'text-gray-600 bg-transparent cursor-not-allowed' : 'text-[#eab308] hover:bg-[#1a253e]'}`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TopupDetails;


import React, { useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCcw,
  CheckCircle2,
  UserRound,
  CalendarDays,
  PackageCheck,
  SearchX,
  AlertCircle,
  Clock3,
} from "lucide-react";

const getSafeAmount = (value) => {
  if (value === null || value === undefined || value === "") return 0;
  if (typeof value === "object" && value.$numberDecimal !== undefined) {
    return Number.parseFloat(value.$numberDecimal) || 0;
  }
  return Number.parseFloat(value) || 0;
};

const formatRecordDate = (value, pattern) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";

  try {
    return format(date, pattern);
  } catch {
    return "N/A";
  }
};

const TopupDetails = () => {
  const { user } = useAuth();
  const userId = user?.userId ? String(user.userId) : "";

  const [topups, setTopups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchTopups = useCallback(async (isRefresh = false) => {
    if (!userId) {
      setTopups([]);
      setLoading(false);
      setError("User not found. Please log in.");
      return;
    }

    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    setError("");

    try {
      const response = await api.get(
        `/wallet/topup-history/${encodeURIComponent(userId)}?t=${Date.now()}`
      );

      if (Array.isArray(response.data)) {
        const userTopups = response.data.filter((transaction) => {
          const typeStr = String(transaction.type || "").toLowerCase();
          const sourceStr = String(transaction.source || "").toLowerCase();
          const descStr = String(transaction.description || "").toUpperCase();

          const isTopupRelated =
            typeStr.includes("topup") ||
            sourceStr.includes("topup") ||
            typeStr.includes("activation") ||
            typeStr.includes("package");

          const isNotPromo = !descStr.includes("PROMOTION");
          return isTopupRelated && isNotPromo;
        });

        const uniqueTopups = Array.from(
          new Map(
            userTopups.map((transaction) => [
              `${transaction._id}-${transaction.createdAt}`,
              transaction,
            ])
          ).values()
        );

        uniqueTopups.sort(
          (a, b) =>
            new Date(b.createdAt || b.date).getTime() -
            new Date(a.createdAt || a.date).getTime()
        );

        setTopups(uniqueTopups);
      } else {
        setTopups([]);
      }
    } catch (requestError) {
      console.error("Topup fetch error:", requestError);
      setError(
        requestError.response?.data?.message || "Failed to load top-ups."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchTopups();
  }, [fetchTopups]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredTopups = useMemo(() => {
    const searchLower = searchQuery.trim().toLowerCase();

    return topups.filter((transaction) => {
      const senderId = String(
        transaction.fromUserId || transaction.userId || ""
      ).toLowerCase();
      const receiverId = String(
        transaction.toUserId || transaction.userId || ""
      ).toLowerCase();
      const description = String(transaction.description || "").toLowerCase();
      const amount = getSafeAmount(
        transaction.amount ?? transaction.grossAmount
      ).toString();

      return (
        senderId.includes(searchLower) ||
        receiverId.includes(searchLower) ||
        description.includes(searchLower) ||
        amount.includes(searchLower)
      );
    });
  }, [topups, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredTopups.length / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const indexOfLastRow = safeCurrentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredTopups.slice(indexOfFirstRow, indexOfLastRow);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePrev = () => {
    setCurrentPage((previous) => Math.max(1, previous - 1));
  };

  const handleNext = () => {
    setCurrentPage((previous) => Math.min(totalPages, previous + 1));
  };

  const getTransactionDisplay = (transaction) => {
    const currentUserId = String(user?.userId || "");
    let senderId = transaction.fromUserId
      ? String(transaction.fromUserId)
      : String(transaction.userId ?? "");
    let receiverId = transaction.toUserId
      ? String(transaction.toUserId)
      : String(transaction.userId ?? "");

    const type = String(transaction.type || "").toLowerCase();
    const isDebit =
      type.includes("debit") || getSafeAmount(transaction.amount) < 0;

    if (isDebit && !transaction.toUserId) {
      senderId = currentUserId;
      const description = String(transaction.description || "");
      const match = description.match(
        /(?:for|user|to|#|-)\s*([A-Z]{0,3}\d{4,10})/i
      );
      receiverId = match?.[1] || "Team Member";
    }

    let tag = {
      icon: <CheckCircle2 size={13} />,
      label: "ACTIVATED",
      style: "border-white/10 bg-white/[0.04] text-slate-300",
    };

    if (senderId === currentUserId && receiverId === currentUserId) {
      tag = {
        icon: <CheckCircle2 size={13} />,
        label: "SELF ACTIVATION",
        style: "border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-300",
      };
    } else if (senderId === currentUserId && receiverId !== currentUserId) {
      tag = {
        icon: <ArrowUpRight size={13} />,
        label: "ACTIVATED FOR TEAM",
        style: "border-fuchsia-300/20 bg-fuchsia-300/[0.07] text-fuchsia-200",
      };
    } else if (receiverId === currentUserId && senderId !== currentUserId) {
      tag = {
        icon: <ArrowDownLeft size={13} />,
        label: "ACTIVATED BY UPLINE",
        style: "border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-200",
      };
    }

    return { senderId, receiverId, tag, currentUserId };
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080811] px-3 pb-24 pt-5 font-sans text-white sm:px-6 sm:pb-12 sm:pt-8">
      <div className="pointer-events-none absolute -left-36 top-20 h-80 w-80 rounded-full bg-fuchsia-600/[0.08] blur-[110px]" />
      <div className="pointer-events-none absolute -right-36 top-72 h-96 w-96 rounded-full bg-cyan-500/[0.07] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/[0.08] text-fuchsia-300">
              <PackageCheck size={24} />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-cyan-300">
                Account activity
              </p>
              <h1 className="mt-1 text-xl font-black tracking-tight text-white sm:text-2xl">
                Package Details
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                Review your package activation history
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => fetchTopups(true)}
            disabled={loading || refreshing}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-slate-300 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
          >
            <RefreshCcw
              size={15}
              className={refreshing ? "animate-spin" : ""}
            />
            {refreshing ? "Refreshing..." : "Refresh history"}
          </button>
        </header>

        {/* Search and page size */}
        <section className="mb-5 rounded-2xl border border-white/[0.08] bg-[#10111b] p-4 sm:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">
                History records
              </p>
              <p className="mt-1 text-sm font-bold text-white">
                {filteredTopups.length.toLocaleString()}{" "}
                <span className="font-medium text-slate-400">
                  {filteredTopups.length === 1 ? "record" : "records"} found
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex items-center gap-2 text-xs text-slate-400">
                Show
                <select
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                  className="rounded-lg border border-white/10 bg-[#080811] px-3 py-2 text-xs font-semibold text-cyan-200 outline-none transition focus:border-cyan-300/40"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                entries
              </label>

              <div className="relative w-full sm:w-72">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search ID, amount, details..."
                  className="w-full rounded-xl border border-white/10 bg-[#080811] py-2.5 pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Records table */}
        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10111b] shadow-xl shadow-black/20">
          <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-4 sm:px-5">
            <Clock3 size={16} className="text-cyan-300" />
            <h2 className="text-sm font-extrabold text-white">
              Top-up & Package History
            </h2>
          </div>

          {loading ? (
            <div className="flex min-h-56 flex-col items-center justify-center gap-3 px-4 text-center">
              <RefreshCcw size={25} className="animate-spin text-cyan-300" />
              <p className="text-sm font-semibold text-slate-300">
                Loading history...
              </p>
              <p className="text-xs text-slate-500">
                Fetching your latest package records
              </p>
            </div>
          ) : error ? (
            <div className="flex min-h-56 flex-col items-center justify-center px-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-300/20 bg-rose-300/[0.07] text-rose-300">
                <AlertCircle size={23} />
              </div>
              <p className="mt-3 text-sm font-bold text-white">
                Could not load history
              </p>
              <p className="mt-1 max-w-md text-xs leading-5 text-slate-400">
                {error}
              </p>
              <button
                type="button"
                onClick={() => fetchTopups()}
                className="mt-4 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-4 py-2.5 text-xs font-bold text-white transition hover:brightness-110"
              >
                Try again
              </button>
            </div>
          ) : currentRows.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center px-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-500">
                <SearchX size={23} />
              </div>
              <p className="mt-3 text-sm font-bold text-white">
                No package records found
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Try another search term or check back later.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] border-collapse text-left">
                  <thead className="bg-white/[0.025]">
                    <tr className="border-b border-white/[0.08] text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                      <th className="px-4 py-4 text-center">Sr.</th>
                      <th className="px-4 py-4">Date &amp; Time</th>
                      <th className="px-4 py-4">Action Type</th>
                      <th className="px-4 py-4">Sender</th>
                      <th className="px-4 py-4">Receiver</th>
                      <th className="px-4 py-4 text-right">Amount</th>
                      <th className="px-4 py-4">Details</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/[0.055]">
                    {currentRows.map((transaction, index) => {
                      const {
                        senderId,
                        receiverId,
                        tag,
                        currentUserId,
                      } = getTransactionDisplay(transaction);
                      const recordDate =
                        transaction.createdAt || transaction.date;
                      const amount = Math.abs(
                        getSafeAmount(
                          transaction.amount ?? transaction.grossAmount
                        )
                      );

                      return (
                        <tr
                          key={`${transaction._id || "record"}-${transaction.createdAt || transaction.date || index}-${index}`}
                          className="transition-colors hover:bg-white/[0.025]"
                        >
                          <td className="px-4 py-4 text-center font-mono text-xs text-slate-500">
                            {indexOfFirstRow + index + 1}
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex items-start gap-2.5">
                              <CalendarDays
                                size={15}
                                className="mt-0.5 shrink-0 text-cyan-300"
                              />
                              <div>
                                <p className="whitespace-nowrap text-xs font-semibold text-slate-200">
                                  {formatRecordDate(recordDate, "dd MMM yyyy")}
                                </p>
                                <p className="mt-1 text-[10px] text-slate-500">
                                  {formatRecordDate(recordDate, "hh:mm a")}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border px-2.5 py-1.5 text-[9px] font-extrabold tracking-wide ${tag.style}`}
                            >
                              {tag.icon}
                              {tag.label}
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-slate-400">
                                <UserRound size={13} />
                              </span>
                              <span className="whitespace-nowrap">
                                {senderId.includes("Team") ? senderId : `#${senderId || "N/A"}`}
                              </span>
                              {senderId === currentUserId && (
                                <span className="rounded-md border border-fuchsia-300/20 bg-fuchsia-300/[0.08] px-1.5 py-0.5 text-[8px] font-extrabold text-fuchsia-200">
                                  YOU
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-slate-400">
                                <UserRound size={13} />
                              </span>
                              <span className="whitespace-nowrap">
                                {receiverId.includes("Team") ? receiverId : `#${receiverId || "N/A"}`}
                              </span>
                              {receiverId === currentUserId && (
                                <span className="rounded-md border border-cyan-300/20 bg-cyan-300/[0.08] px-1.5 py-0.5 text-[8px] font-extrabold text-cyan-200">
                                  YOU
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="px-4 py-4 text-right">
                            <span className="whitespace-nowrap font-mono text-sm font-extrabold text-cyan-200">
                              ${formatMoney(amount)}
                            </span>
                          </td>

                          <td
                            className="max-w-[240px] px-4 py-4 text-xs leading-5 text-slate-400"
                            title={transaction.description || "Top-up package"}
                          >
                            <span className="line-clamp-2">
                              {transaction.description || "Top-up package"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <footer className="flex flex-col gap-4 border-t border-white/[0.07] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <p className="text-[11px] text-slate-500">
                  Showing{" "}
                  <span className="font-bold text-slate-200">
                    {filteredTopups.length ? indexOfFirstRow + 1 : 0}
                  </span>{" "}
                  to{" "}
                  <span className="font-bold text-slate-200">
                    {Math.min(indexOfLastRow, filteredTopups.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-slate-200">
                    {filteredTopups.length}
                  </span>{" "}
                  entries
                </p>

                <div className="flex items-center justify-between gap-2 sm:justify-end">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={safeCurrentPage <= 1}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-cyan-300/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ChevronLeft size={15} />
                    Previous
                  </button>

                  <span className="min-w-20 rounded-xl border border-fuchsia-300/20 bg-fuchsia-300/[0.07] px-3 py-2 text-center text-xs font-extrabold text-fuchsia-200">
                    {safeCurrentPage} / {totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={safeCurrentPage >= totalPages}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-cyan-300/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    Next
                    <ChevronRight size={15} />
                  </button>
                </div>
              </footer>
            </>
          )}
        </section>

        <p className="mt-5 text-center text-[10px] font-medium tracking-wide text-slate-600">
          Zoro Games AI · Package activity history
        </p>
      </div>
    </main>
  );
};

const formatMoney = (value) =>
  (Number.isFinite(Number(value)) ? Number(value) : 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default TopupDetails;
