// import React, { useEffect, useState, useMemo } from "react"; 
// import api from "../../api/axios"; 
// import { useAuth } from "../../context/AuthContext"; 

// const WalletHistoryPage = () => {
//   const { user } = useAuth();
//   const [transactions, setTransactions] = useState([]);
//   const [balances, setBalances] = useState({ walletBalance: 0, usdtBep20Balance: 0 });
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchWalletHistory = async () => {
//       if (!user?.userId) return;

//       try {
//         setLoading(true);
//         // Tumhare backend route ke hisaab se API call
//         const res = await api.get(
//           `/wallet/history/${user.userId}?t=${new Date().getTime()}`
//         );
        
//         setTransactions(res.data.history || []);
//         setBalances(res.data.balances || { walletBalance: 0, usdtBep20Balance: 0 });

//       } catch (err) {
//         console.error("Error fetching wallet history:", err);
//         setTransactions([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWalletHistory();
//   }, [user?.userId]);

//   // Search Logic (Type ya Description ke basis par)
//   const filtered = useMemo(() => {
//     const s = search.toLowerCase();
//     return transactions.filter((tx) =>
//       tx.type?.toLowerCase().includes(s) ||
//       tx.description?.toLowerCase().includes(s) ||
//       String(tx.amount).includes(s)
//     );
//   }, [transactions, search]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search]);

//   // Pagination Logic
//   const indexOfLast = currentPage * entriesPerPage;
//   const indexOfFirst = indexOfLast - entriesPerPage;
//   const currentItems = filtered.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filtered.length / entriesPerPage) || 1;

//   const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
//   const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
//   const handleEntriesChange = (e) => {
//     setEntriesPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   // IST Date Formatter
//   const getISTDateTimeString = (dateString) => {
//     if (!dateString) return '';
//     // Sirf date dikhane ka logic (User correction ledger ke hisaab se time strip karna)
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       timeZone: 'Asia/Kolkata',
//       day: '2-digit', month: 'short', year: 'numeric'
//     });
//   };

//   return (
//     <div className="w-full min-h-screen bg-[#0b1221] p-4 md:p-8 font-sans pt-24">
//       {/* Balances Top Cards (Optional for Wallet, but looks premium) */}
//       <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 mb-6">
//         <div className="bg-[#131c31] border border-gray-700 rounded-xl p-5 flex-1 shadow-lg border-l-4 border-l-[#eab308]">
//           <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Fund Wallet Balance</h3>
//           <p className="text-3xl font-black text-white">${Number(balances.walletBalance).toFixed(4)}</p>
//         </div>
//       </div>

//       {/* Inner Card Container with Gold Top Border */}
//       <div className="max-w-7xl mx-auto bg-[#131c31] rounded-xl border-t-[3px] border-[#eab308] shadow-2xl p-4 sm:p-6">
        
//         {/* Header Title */}
//         <h2 className="text-2xl sm:text-3xl text-[#eab308] font-bold mb-6 tracking-wide">
//           Wallet History
//         </h2>

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
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="bg-[#0b1221] border border-gray-700 text-gray-200 rounded px-3 py-1.5 w-full sm:w-64 focus:outline-none focus:border-[#eab308] transition-colors placeholder-gray-500"
//               placeholder="Search by type or description..."
//             />
//           </div>
//         </div>

//         {/* Table Container */}
//         <div className="overflow-x-auto border border-gray-700 rounded-lg">
//           <table className="w-full text-left whitespace-nowrap border-collapse">
//             <thead className="text-[#eab308] bg-[#1a253e] text-sm border-b border-gray-700">
//               <tr>
//                 <th className="p-4 border-r border-gray-700/50 font-bold"># <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold">Transaction Type <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold">Description <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold">Status <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold text-right">Amount <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                 <th className="p-4 font-bold">Date (IST)</th>
//               </tr>
//             </thead>

//             <tbody className="text-gray-300 text-sm">
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-8 text-[#eab308]">
//                     Loading Data...
//                   </td>
//                 </tr>
//               ) : currentItems.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-8 text-gray-500">
//                     No matching records found
//                   </td>
//                 </tr>
//               ) : (
//                 currentItems.map((tx, index) => {
//                   // 🔥 FIX: Credit/Debit UI Logic mein package_activation aur naye types add kiye hain
//                   const isCredit = ['deposit', 'credit_to_wallet', 'credit', 'topup', 'manual_credit', 'fast_track', 'fund_transfer_received'].includes(tx.type);
//                   const isDebit = ['withdrawal', 'debit_topup', 'manual_debit', 'package_activation', 'fund_transfer_sent'].includes(tx.type);
                  
//                   let amountColor = 'text-white';
//                   let prefix = '';

//                   if (isCredit) { amountColor = 'text-green-400'; prefix = '+'; }
//                   else if (isDebit) { amountColor = 'text-red-400'; prefix = '-'; }

//                   return (
//                     <tr key={tx._id || index} className="border-b border-gray-700 hover:bg-[#1a253e] transition-colors">
//                       <td className="p-4 border-r border-gray-700/50">{indexOfFirst + index + 1}</td>
//                       <td className="p-4 border-r border-gray-700/50 capitalize font-medium text-white">
//                         {/* 🔥 FIX: Agar type manual_credit hai toh direct 'Deposit' dikhao, warna underline hata kar normally dikhao */}
//                         {tx.type 
//                           ? (tx.type === 'manual_credit' ? 'Deposit' : tx.type.replace(/_/g, ' ')) 
//                           : 'Transaction'}
//                       </td>
//                       <td className="p-4 border-r border-gray-700/50 truncate max-w-xs" title={tx.description}>
//                         {tx.description || "-"}
//                       </td>
//                       <td className="p-4 border-r border-gray-700/50 capitalize font-medium">
//                         <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
//                           tx.status === 'success' || tx.status === 'completed' 
//                             ? 'bg-green-500/10 text-green-400' 
//                             : tx.status === 'pending' 
//                             ? 'bg-yellow-500/10 text-yellow-400'
//                             : 'bg-red-500/10 text-red-400'
//                         }`}>
//                           {tx.status || 'Success'}
//                         </span>
//                       </td>
//                       <td className={`p-4 border-r border-gray-700/50 font-bold text-right ${amountColor}`}>
//                         {prefix}${Number(tx.amount || 0).toFixed(4)}
//                       </td>
//                       <td className="p-4 text-gray-400 text-xs">
//                         {getISTDateTimeString(tx.createdAt || tx.date)}
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination Footer */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-gray-400 text-sm gap-4">
//           <div>
//             Showing <span className="text-white font-medium">{filtered.length === 0 ? 0 : indexOfFirst + 1}</span> to <span className="text-white font-medium">{Math.min(indexOfLast, filtered.length)}</span> of <span className="text-white font-medium">{filtered.length}</span> entries
//           </div>
          
//           <div className="flex items-center bg-[#0b1221] rounded border border-gray-700 overflow-hidden">
//             <button
//               onClick={handlePrev}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 transition-colors ${currentPage === 1 ? 'text-gray-600 bg-transparent cursor-not-allowed' : 'text-[#eab308] hover:bg-[#1a253e]'}`}
//             >
//               Previous
//             </button>
//             <div className="px-4 py-2 border-l border-r border-gray-700 bg-[#1a253e] text-[#eab308] font-bold">
//               {currentPage}
//             </div>
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages || totalPages === 0}
//               className={`px-4 py-2 transition-colors ${currentPage === totalPages || totalPages === 0 ? 'text-gray-600 bg-transparent cursor-not-allowed' : 'text-[#eab308] hover:bg-[#1a253e]'}`}
//             >
//               Next
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default WalletHistoryPage;


import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import {
  Search,
  Wallet,
  Coins,
  ArrowDownLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  RefreshCw,
  X,
  History,
  Activity,
  CircleDollarSign,
  ArrowLeftRight,
  AlertCircle,
} from "lucide-react";

const formatAmount = (value, digits = 4) => {
  const amount = Number(value);
  return (Number.isFinite(amount) ? amount : 0).toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
};

const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const CREDIT_TYPES = [
  "deposit",
  "credit_to_wallet",
  "credit",
  "topup",
  "manual_credit",
  "fast_track",
  "fund_transfer_received",
];
const DEBIT_TYPES = [
  "withdrawal",
  "debit_topup",
  "manual_debit",
  "package_activation",
  "fund_transfer_sent",
];

const WalletHistoryPage = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [balances, setBalances] = useState({
    walletBalance: 0,
    usdtBep20Balance: 0,
  });
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchWalletHistory = async () => {
      if (!user?.userId) {
        setTransactions([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const res = await api.get(
          `/wallet/history/${user.userId}?t=${Date.now()}`
        );

        if (!active) return;
        setTransactions(Array.isArray(res.data?.history) ? res.data.history : []);
        setBalances(
          res.data?.balances || { walletBalance: 0, usdtBep20Balance: 0 }
        );
      } catch (err) {
        if (!active) return;
        console.error("Error fetching wallet history:", err);
        setTransactions([]);
        setError("Wallet history could not be loaded. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchWalletHistory();
    return () => {
      active = false;
    };
  }, [user?.userId]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return transactions;

    return transactions.filter((tx) => {
      const type = String(tx.type || "").toLowerCase();
      const description = String(tx.description || "").toLowerCase();
      const amount = String(tx.amount ?? "").toLowerCase();
      const status = String(tx.status || "").toLowerCase();
      return (
        type.includes(query) ||
        description.includes(query) ||
        amount.includes(query) ||
        status.includes(query)
      );
    });
  }, [transactions, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, entriesPerPage]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / entriesPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const indexOfFirst = (safePage - 1) * entriesPerPage;
  const indexOfLast = Math.min(indexOfFirst + entriesPerPage, filtered.length);
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);

  const totals = useMemo(() => {
    return filtered.reduce(
      (acc, tx) => {
        const amount = Number(tx.amount);
        const safeAmount = Number.isFinite(amount) ? amount : 0;
        const type = String(tx.type || "").toLowerCase();
        if (CREDIT_TYPES.includes(type)) acc.credits += safeAmount;
        else if (DEBIT_TYPES.includes(type)) acc.debits += safeAmount;
        acc.count += 1;
        return acc;
      },
      { credits: 0, debits: 0, count: 0 }
    );
  }, [filtered]);

  const handleRefresh = async () => {
    if (!user?.userId) return;
    try {
      setLoading(true);
      setError("");
      const res = await api.get(
        `/wallet/history/${user.userId}?t=${Date.now()}`
      );
      setTransactions(Array.isArray(res.data?.history) ? res.data.history : []);
      setBalances(
        res.data?.balances || { walletBalance: 0, usdtBep20Balance: 0 }
      );
    } catch (err) {
      console.error("Error refreshing wallet history:", err);
      setError("Wallet history could not be loaded. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#090b12] px-3 pb-24 pt-24 font-sans text-slate-100 sm:px-5 sm:pt-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="relative mb-6 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#101421] p-5 sm:p-7">
          <div className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 right-1/4 h-48 w-48 rounded-full bg-cyan-500/[0.07] blur-3xl" />
          <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-200">
                <History size={13} />
                Account activity
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                Wallet <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">History</span>
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Track wallet movements, transaction statuses and credited or debited amounts in one place.
              </p>
            </div>
            <button
              type="button"
              onClick={handleRefresh}
              disabled={loading || !user?.userId}
              className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-xl border border-violet-300/20 bg-white/[0.035] px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-violet-300/45 hover:bg-violet-400/[0.08] disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
              Refresh history
            </button>
          </div>
        </header>

        <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <article className="relative overflow-hidden rounded-2xl border border-violet-400/20 bg-[#101421] p-4 sm:p-5">
            <div className="absolute -right-7 -top-7 h-24 w-24 rounded-full bg-violet-500/[0.08] blur-2xl" />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-400">Fund wallet balance</p>
                <p className="mt-3 break-all text-2xl font-black tabular-nums text-white sm:text-[26px]">
                  ${formatAmount(balances.walletBalance)}
                </p>
                <p className="mt-2 text-[11px] text-slate-500">Current wallet funds</p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-400/10 text-violet-200">
                <Wallet size={19} />
              </span>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#101421] p-4 sm:p-5">
            <div className="absolute -right-7 -top-7 h-24 w-24 rounded-full bg-cyan-500/[0.08] blur-2xl" />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-400">USDT BEP20 balance</p>
                <p className="mt-3 break-all text-2xl font-black tabular-nums text-white sm:text-[26px]">
                  ${formatAmount(balances.usdtBep20Balance)}
                </p>
                <p className="mt-2 text-[11px] text-slate-500">Linked token balance</p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-400/10 text-cyan-200">
                <Coins size={19} />
              </span>
            </div>
          </article>

          <article className="rounded-2xl border border-emerald-400/20 bg-[#101421] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-400">Credits found</p>
                <p className="mt-3 text-2xl font-black tabular-nums text-emerald-300 sm:text-[26px]">
                  ${formatAmount(totals.credits)}
                </p>
                <p className="mt-2 text-[11px] text-slate-500">Known credit transaction types</p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-300/15 bg-emerald-400/10 text-emerald-300">
                <ArrowDownLeft size={19} />
              </span>
            </div>
          </article>

          <article className="rounded-2xl border border-rose-400/20 bg-[#101421] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-400">Debits found</p>
                <p className="mt-3 text-2xl font-black tabular-nums text-rose-300 sm:text-[26px]">
                  ${formatAmount(totals.debits)}
                </p>
                <p className="mt-2 text-[11px] text-slate-500">Known debit transaction types</p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-300/15 bg-rose-400/10 text-rose-300">
                <ArrowUpRight size={19} />
              </span>
            </div>
          </article>
        </section>

        <section className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0e121d]">
          <div className="flex flex-col gap-3 border-b border-white/[0.08] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-fuchsia-300/15 bg-fuchsia-400/[0.08] text-fuchsia-200">
                <Activity size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Transaction ledger</h2>
                <p className="mt-1 text-xs text-slate-500">Search and review your wallet activity</p>
              </div>
            </div>
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="inline-flex items-center justify-center gap-1.5 self-start rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-rose-300/30 hover:bg-rose-400/[0.06] hover:text-rose-200 sm:self-auto"
              >
                <X size={13} />
                Clear search
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 border-b border-white/[0.07] bg-white/[0.015] p-4 sm:grid-cols-[160px_1fr] sm:p-5">
            <label className="flex flex-col gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
              Rows per page
              <select
                value={entriesPerPage}
                onChange={(event) => setEntriesPerPage(Number(event.target.value))}
                className="h-11 w-full rounded-xl border border-white/10 bg-[#090d16] px-3 text-sm font-medium normal-case tracking-normal text-slate-200 outline-none transition focus:border-violet-300/50"
              >
                <option value={10}>10 entries</option>
                <option value={25}>25 entries</option>
                <option value={50}>50 entries</option>
                <option value={100}>100 entries</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
              Search transactions
              <span className="relative">
                <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-violet-300" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search type, description, status or amount..."
                  className="h-11 w-full rounded-xl border border-white/10 bg-[#090d16] pl-10 pr-3 text-sm font-medium normal-case tracking-normal text-slate-200 outline-none placeholder:text-slate-600 transition focus:border-violet-300/50"
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
              of <span className="font-bold text-slate-200">{filtered.length}</span> records
            </p>
            <span className="inline-flex items-center gap-1.5 self-start rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 text-slate-400 sm:self-auto">
              <ArrowLeftRight size={13} className="text-cyan-300" />
              {totals.count.toLocaleString("en-US")} matching transactions
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead>
                <tr className="border-y border-white/[0.08] bg-[#171b2a] text-[10px] uppercase tracking-[0.15em] text-slate-400">
                  <th className="w-16 px-4 py-4 text-center font-bold">#</th>
                  <th className="px-4 py-4 font-bold">Transaction type</th>
                  <th className="px-4 py-4 font-bold">Description</th>
                  <th className="px-4 py-4 font-bold">Status</th>
                  <th className="px-4 py-4 text-right font-bold">Amount</th>
                  <th className="px-4 py-4 font-bold">Date (IST)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.055] text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <span className="mx-auto mb-3 block h-8 w-8 animate-spin rounded-full border-2 border-violet-300/20 border-t-violet-300" />
                      <span className="text-sm font-medium text-slate-300">Loading wallet history…</span>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-14 text-center">
                      <AlertCircle size={25} className="mx-auto mb-3 text-rose-300" />
                      <p className="font-semibold text-rose-200">{error}</p>
                      <button
                        type="button"
                        onClick={handleRefresh}
                        className="mt-4 inline-flex items-center gap-2 rounded-xl border border-violet-300/20 bg-violet-400/[0.08] px-4 py-2.5 text-sm font-semibold text-violet-100 transition hover:bg-violet-400/[0.14]"
                      >
                        <RefreshCw size={14} />
                        Try again
                      </button>
                    </td>
                  </tr>
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-500">
                        <Search size={20} />
                      </div>
                      <p className="font-semibold text-slate-200">No matching transactions</p>
                      <p className="mt-1 text-xs text-slate-500">Try another search or clear the search field.</p>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((tx, index) => {
                    const type = String(tx.type || "").toLowerCase();
                    const isCredit = CREDIT_TYPES.includes(type);
                    const isDebit = DEBIT_TYPES.includes(type);
                    const amountClass = isCredit
                      ? "text-emerald-300"
                      : isDebit
                      ? "text-rose-300"
                      : "text-slate-100";
                    const prefix = isCredit ? "+" : isDebit ? "−" : "";
                    const status = String(tx.status || "success").toLowerCase();
                    const statusClass =
                      status === "success" || status === "completed"
                        ? "border-emerald-300/15 bg-emerald-400/[0.08] text-emerald-300"
                        : status === "pending"
                        ? "border-amber-300/15 bg-amber-400/[0.08] text-amber-200"
                        : "border-rose-300/15 bg-rose-400/[0.08] text-rose-300";
                    const displayType = type
                      ? type === "manual_credit"
                        ? "Deposit"
                        : type.replace(/_/g, " ")
                      : "Transaction";

                    return (
                      <tr
                        key={tx._id || `${tx.createdAt || "wallet"}-${index}`}
                        className="group transition-colors hover:bg-violet-300/[0.025]"
                      >
                        <td className="px-4 py-4 text-center">
                          <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg bg-white/[0.035] px-1.5 text-xs font-semibold tabular-nums text-slate-500 group-hover:text-slate-300">
                            {indexOfFirst + index + 1}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2.5">
                            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                              isCredit
                                ? "bg-emerald-400/[0.08] text-emerald-300"
                                : isDebit
                                ? "bg-rose-400/[0.08] text-rose-300"
                                : "bg-violet-400/[0.08] text-violet-200"
                            }`}>
                              {isCredit ? <ArrowDownLeft size={15} /> : isDebit ? <ArrowUpRight size={15} /> : <CircleDollarSign size={15} />}
                            </span>
                            <span className="capitalize font-semibold text-slate-200">{displayType}</span>
                          </div>
                        </td>
                        <td className="max-w-[280px] px-4 py-4 text-xs text-slate-400">
                          <span className="block truncate" title={tx.description || ""}>
                            {tx.description || "—"}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusClass}`}>
                            {status}
                          </span>
                        </td>
                        <td className={`whitespace-nowrap px-4 py-4 text-right font-bold tabular-nums ${amountClass}`}>
                          {prefix}${formatAmount(tx.amount)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-xs font-medium text-slate-400">
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays size={13} className="text-slate-500" />
                            {formatDate(tx.createdAt || tx.date)}
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
            <footer className="flex flex-col gap-3 border-t border-white/[0.08] bg-white/[0.015] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <p className="text-xs text-slate-500">
                Page <span className="font-bold text-slate-200">{safePage}</span> of{" "}
                <span className="font-bold text-slate-200">{totalPages}</span>
              </p>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={safePage <= 1}
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-white/10 px-3 text-xs font-semibold text-slate-300 transition hover:border-violet-300/30 hover:bg-violet-300/[0.06] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ChevronLeft size={15} />
                  Previous
                </button>
                <span className="flex h-9 min-w-16 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-400/[0.09] px-3 text-xs font-bold tabular-nums text-violet-200">
                  {safePage} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={safePage >= totalPages}
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-white/10 px-3 text-xs font-semibold text-slate-300 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.06] disabled:cursor-not-allowed disabled:opacity-35"
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

export default WalletHistoryPage;
