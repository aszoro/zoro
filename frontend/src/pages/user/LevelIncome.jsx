// import React, { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { getUserId } from "../../utils/authUtils";
// import { Search, Users, ChevronLeft, ChevronRight, UserCircle } from "lucide-react";

// const LevelIncome = () => {
//   const userId = getUserId();
//   const [transactions, setTransactions] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!userId) {
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     api.get(`/transaction/transactions/${userId}?type=level_income&t=${new Date().getTime()}`)
//       .then((res) => {
//         const sorted = (res.data || [])
//           .filter(txn => txn.fromUserId && txn.fromUserId !== userId)
//           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setTransactions(sorted);
//         setFiltered(sorted);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch level income", err);
//         setTransactions([]);
//         setFiltered([]);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [userId]);

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearch(value);
//     setCurrentPage(1);
//     if (!value) return setFiltered(transactions);

//     const result = transactions.filter(
//       (txn) =>
//         txn.description?.toLowerCase().includes(value) ||
//         String(txn.fromUserId).toLowerCase().includes(value)
//     );
//     setFiltered(result);
//   };

//   const handleEntriesChange = (e) => {
//     setEntriesPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const totalPages = Math.ceil(filtered.length / entriesPerPage) || 1;
//   const indexOfLast = currentPage * entriesPerPage;
//   const indexOfFirst = indexOfLast - entriesPerPage;
//   const paginated = filtered.slice(indexOfFirst, indexOfLast);

//   const handlePrev = () => currentPage > 1 && setCurrentPage(p => p - 1);
//   const handleNext = () => currentPage < totalPages && setCurrentPage(p => p + 1);

//   return (
//     <div className="w-full min-h-screen bg-[#0b1221] p-4 md:p-8 font-sans">
      
//       {/* Inner Card Container */}
//       <div className="max-w-7xl mx-auto bg-[#131c31] rounded-xl border-t-[3px] border-[#eab308] shadow-2xl p-4 sm:p-6">
        
//         {/* Header Title */}
//         <div className="mb-6">
//           <h2 className="text-2xl sm:text-3xl text-[#eab308] font-bold tracking-wide flex items-center gap-3">
//              <Users className="text-[#eab308]" size={28} /> Level Income
//           </h2>
//         </div>

//         {/* Filters (Entries & Search) */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 text-gray-300 text-sm">
          
//           <div className="flex items-center gap-2">
//             <span>Show</span>
//             <select
//               value={entriesPerPage}
//               onChange={handleEntriesChange}
//               className="bg-[#0b1221] border border-gray-700 text-[#eab308] rounded px-3 py-1.5 focus:outline-none focus:border-[#eab308] transition-colors"
//             >
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//               <option value={50}>50</option>
//               <option value={100}>100</option>
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
//                  placeholder="Search User ID or details..."
//                  value={search}
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
//                 <th className="p-4 border-r border-gray-700/50 font-bold text-center w-16">Sr. <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Date <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold">From User <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Package <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Income <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                 <th className="p-4 font-bold">Description</th>
//               </tr>
//             </thead>
            
//             <tbody className="text-gray-300 text-sm">
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-12 text-[#eab308]">
//                     <div className="animate-spin h-8 w-8 mx-auto mb-3 border-4 border-t-transparent border-[#eab308] rounded-full"></div>
//                     Loading Records...
//                   </td>
//                 </tr>
//               ) : paginated.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-12 text-gray-500">
//                     No Level Income Records Found
//                   </td>
//                 </tr>
//               ) : (
//                 paginated.map((txn, idx) => {
//                   const date = new Date(txn.createdAt);
                  
//                   const cleanDescription = txn.description 
//                     ? txn.description.replace(/\s*\(Leader\)/gi, "") 
//                     : "Level income";

//                   let packageAmount = Number(txn.package);
                  
//                   if (!packageAmount || packageAmount <= 0) {
//                       packageAmount = Number(txn.amount) * 400;
//                       if (packageAmount === 0) packageAmount = 30;
//                   }

//                   return (
//                     <tr key={txn._id || idx} className="border-b border-gray-700 hover:bg-[#1a253e] transition-colors">
                      
//                       {/* Sr No */}
//                       <td className="p-4 border-r border-gray-700/50 text-center font-medium">
//                         {indexOfFirst + idx + 1}
//                       </td>
                      
//                       {/* Date */}
//                       <td className="p-4 border-r border-gray-700/50 text-center font-medium">
//                          {date.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}
//                       </td>

//                       {/* From User */}
//                       <td className="p-4 border-r border-gray-700/50 font-medium text-white">
//                         <div className="flex items-center gap-2">
//                           <UserCircle className="text-[#eab308]" size={16} /> 
//                           {txn.fromUserId || "N/A"}
//                         </div>
//                       </td>

//                       {/* Package */}
//                       <td className="p-4 border-r border-gray-700/50 text-center">
//                         <span className="inline-flex items-center justify-center bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/20 px-2 py-1 rounded text-xs font-bold tracking-wider">
//                           ${packageAmount.toFixed(2)}
//                         </span>
//                       </td>

//                       {/* 🔥 INCOME AMOUNT FIX: Hata diya .toFixed(2) ab exact decimal aayega */}
//                       <td className="p-4 border-r border-gray-700/50 font-bold text-center text-green-400">
//                         + ${Number(txn.amount)}
//                       </td>

//                       {/* Description */}
//                       <td className="p-4 text-gray-400 text-xs capitalize truncate max-w-[200px]" title={cleanDescription}>
//                         {cleanDescription}
//                       </td>

//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination Footer */}
//         {!loading && filtered.length > 0 && (
//           <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-gray-400 text-sm gap-4">
//             <div>
//               Showing <span className="text-white font-medium">{indexOfFirst + 1}</span> to <span className="text-white font-medium">{Math.min(indexOfLast, filtered.length)}</span> of <span className="text-white font-medium">{filtered.length}</span> entries
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

// export default LevelIncome;


import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import { getUserId } from "../../utils/authUtils";
import {
  Search,
  Users,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  RefreshCw,
  DollarSign,
  Package,
  ArrowUpRight,
  Activity,
  X,
  CalendarClock,
  Network,
  RotateCcw,
} from "lucide-react";

const formatAmount = (value) => {
  const amount = Number(value);
  return (Number.isFinite(amount) ? amount : 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const LevelIncome = () => {
  const userId = getUserId();
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    setError("");

    api
      .get(
        `/transaction/transactions/${userId}?type=level_income&t=${Date.now()}`
      )
      .then((res) => {
        if (!active) return;
        const sorted = (Array.isArray(res.data) ? res.data : [])
          .filter((txn) => txn.fromUserId && String(txn.fromUserId) !== String(userId))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTransactions(sorted);
      })
      .catch((fetchError) => {
        if (!active) return;
        console.error("Failed to fetch level income", fetchError);
        setTransactions([]);
        setError("Unable to load level income records. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [userId]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return transactions;

    return transactions.filter(
      (txn) =>
        String(txn.description ?? "").toLowerCase().includes(query) ||
        String(txn.fromUserId ?? "").toLowerCase().includes(query) ||
        String(txn.package ?? "").toLowerCase().includes(query) ||
        String(txn.amount ?? "").toLowerCase().includes(query)
    );
  }, [transactions, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, entriesPerPage]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / entriesPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const indexOfFirst = (safePage - 1) * entriesPerPage;
  const indexOfLast = Math.min(indexOfFirst + entriesPerPage, filtered.length);
  const paginated = filtered.slice(indexOfFirst, indexOfLast);

  const totalIncome = useMemo(
    () =>
      filtered.reduce((sum, txn) => {
        const amount = Number(txn.amount);
        return sum + (Number.isFinite(amount) ? amount : 0);
      }, 0),
    [filtered]
  );

  const clearSearch = () => setSearch("");

  const refreshRecords = () => {
    // Reload is used here to preserve the original component's API lifecycle.
    window.location.reload();
  };

  return (
    <main className="min-h-screen w-full bg-[#090b12] px-3 py-5 pb-24 font-sans text-slate-100 sm:px-5 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-12 w-1.5 rounded-full bg-gradient-to-b from-violet-300 to-indigo-500" />
            <div>
              <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-violet-300">
                <Network size={14} />
                Team / Commission ledger
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                Level Income
              </h1>
              <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-400">
                Explore network commission entries, contributing user IDs, package values and credited income.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={refreshRecords}
            disabled={loading}
            className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-violet-300/40 hover:bg-violet-300/[0.08] disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Refresh page
          </button>
        </header>

        <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <article className="rounded-xl border border-violet-400/20 bg-[#11151e] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold text-slate-400">Filtered level income</p>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-400/10 text-violet-300">
                <DollarSign size={18} />
              </span>
            </div>
            <p className="mt-3 text-2xl font-extrabold tabular-nums text-white">
              ${formatAmount(totalIncome)}
            </p>
            <p className="mt-2 text-[11px] text-slate-500">Sum of matching records</p>
          </article>

          <article className="rounded-xl border border-indigo-400/20 bg-[#11151e] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold text-slate-400">Matching entries</p>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-400/10 text-indigo-300">
                <Activity size={18} />
              </span>
            </div>
            <p className="mt-3 text-2xl font-extrabold tabular-nums text-white">
              {filtered.length.toLocaleString("en-US")}
            </p>
            <p className="mt-2 text-[11px] text-slate-500">Records matching your search</p>
          </article>

          <article className="rounded-xl border border-sky-400/20 bg-[#11151e] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold text-slate-400">Income category</p>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-400/10 text-sky-300">
                <Users size={18} />
              </span>
            </div>
            <p className="mt-3 text-2xl font-extrabold text-white">Team levels</p>
            <p className="mt-2 text-[11px] text-slate-500">Self-income records excluded</p>
          </article>
        </section>

        <section className="overflow-hidden rounded-xl border border-white/10 bg-[#0e121b]">
          <div className="flex flex-col gap-3 border-b border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-400/10 text-violet-300">
                  <CalendarClock size={16} />
                </div>
                <h2 className="text-base font-bold text-white">Level commission history</h2>
              </div>
              <p className="mt-1 pl-10 text-xs text-slate-500">
                Search by user ID, package, credited amount or description.
              </p>
            </div>
            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="inline-flex items-center justify-center gap-1.5 self-start rounded-md border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-rose-400/30 hover:bg-rose-400/[0.06] hover:text-rose-200 sm:self-auto"
              >
                <X size={13} />
                Clear search
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 border-b border-white/10 bg-white/[0.015] p-4 sm:grid-cols-[160px_1fr] sm:p-5">
            <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Rows per page
              <select
                value={entriesPerPage}
                onChange={(event) => setEntriesPerPage(Number(event.target.value))}
                className="h-10 w-full rounded-lg border border-white/10 bg-[#090d15] px-3 text-sm font-medium normal-case tracking-normal text-slate-200 outline-none focus:border-violet-300/50"
              >
                <option value={10}>10 entries</option>
                <option value={25}>25 entries</option>
                <option value={50}>50 entries</option>
                <option value={100}>100 entries</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Search level records
              <span className="relative">
                <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-violet-300" />
                <input
                  type="search"
                  placeholder="User ID, description, package or amount…"
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
              <Users size={12} className="text-violet-300" />
              Level income records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-left">
              <thead>
                <tr className="border-y border-white/10 bg-[#171925] text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  <th className="w-16 px-4 py-4 text-center font-bold">No.</th>
                  <th className="px-4 py-4 font-bold">Credited on</th>
                  <th className="px-4 py-4 font-bold">From user</th>
                  <th className="px-4 py-4 text-right font-bold">Package value</th>
                  <th className="px-4 py-4 text-right font-bold">Income credited</th>
                  <th className="px-4 py-4 font-bold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-14 text-center">
                      <span className="mx-auto mb-3 block h-8 w-8 animate-spin rounded-full border-2 border-violet-300/20 border-t-violet-300" />
                      <span className="text-sm font-medium text-slate-300">Loading level income…</span>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center">
                      <p className="font-semibold text-rose-300">{error}</p>
                      <button
                        type="button"
                        onClick={refreshRecords}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-rose-400/25 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-400/15"
                      >
                        <RefreshCw size={14} />
                        Retry request
                      </button>
                    </td>
                  </tr>
                ) : paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-14 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-500">
                        <Search size={20} />
                      </div>
                      <p className="font-semibold text-slate-200">No level income entries found</p>
                      <p className="mt-1 text-xs text-slate-500">Try another search phrase or clear the search field.</p>
                    </td>
                  </tr>
                ) : (
                  paginated.map((txn, idx) => {
                    const rawPackage = Number(txn.package);
                    let packageAmount = rawPackage;
                    if (!Number.isFinite(packageAmount) || packageAmount <= 0) {
                      const txnAmount = Number(txn.amount);
                      packageAmount =
                        Number.isFinite(txnAmount) && txnAmount !== 0
                          ? txnAmount * 400
                          : 30;
                    }

                    const cleanDescription = txn.description
                      ? txn.description.replace(/\s*\(Leader\)/gi, "")
                      : "Level income";

                    return (
                      <tr
                        key={txn._id || `${txn.createdAt || "level"}-${idx}`}
                        className="group transition-colors hover:bg-violet-300/[0.025]"
                      >
                        <td className="px-4 py-4 text-center">
                          <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-white/[0.04] px-1.5 text-xs font-semibold tabular-nums text-slate-500 group-hover:text-slate-300">
                            {indexOfFirst + idx + 1}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-xs font-medium text-slate-400">
                          {formatDate(txn.createdAt)}
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-2 font-semibold text-slate-200">
                            <UserCircle size={16} className="shrink-0 text-violet-300" />
                            {txn.fromUserId || "N/A"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right">
                          <span className="inline-flex items-center gap-1 rounded-md bg-violet-300/10 px-2.5 py-1.5 text-xs font-bold tabular-nums text-violet-200">
                            <Package size={12} />
                            ${formatAmount(packageAmount)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right">
                          <span className="inline-flex items-center gap-1 font-bold tabular-nums text-emerald-300">
                            <ArrowUpRight size={14} />
                            ${formatAmount(txn.amount)}
                          </span>
                        </td>
                        <td className="max-w-[240px] px-4 py-4 text-xs text-slate-400">
                          <span className="block truncate" title={cleanDescription}>
                            {cleanDescription}
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
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
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
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={safePage >= totalPages}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs font-semibold text-slate-300 transition hover:border-indigo-300/30 hover:bg-indigo-300/[0.06] disabled:cursor-not-allowed disabled:opacity-35"
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

export default LevelIncome;
