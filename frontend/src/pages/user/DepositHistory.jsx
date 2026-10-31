// import React, { useEffect, useState } from 'react';
// import api from '../../api/axios'; 
// import { format } from 'date-fns';
// import { Search, History, ArrowDownCircle, Calendar, ExternalLink } from 'lucide-react'; 

// const DepositHistory = () => {
//   const [deposits, setDeposits] = useState([]);
//   const [filteredDeposits, setFilteredDeposits] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');

//   // 🛠️ HELPER: Decimal128 aur Simple Numbers dono ko handle karne ke liye
//   const getSafeAmount = (val) => {
//     if (!val) return 0;
//     if (val.$numberDecimal) return parseFloat(val.$numberDecimal);
//     return parseFloat(val) || 0;
//   };

//   // 🛠️ HELPER: Hash ko chota karne ke liye (0x1234...abcd)
//   const formatHash = (hash) => {
//     if (!hash) return null;
//     if (hash.length < 15) return hash; 
//     return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
//   };

//   // 🕵️‍♂️ SECRET HELPER: 100% Unique & Consistent Dummy Hash Generator
//   const generateDummyHash = (item, idx) => {
//     const idStr = String(item._id || item.id || idx);
    
//     // MongoDB IDs ke aakhiri characters sabse zyada unique hote hain
//     const uniqueEnd = idStr.slice(-6); 
    
//     // ID ko reverse kar denge taaki shuruwat bhi unique lage
//     const reversedId = idStr.split('').reverse().join('');
    
//     const padding = "f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1";
    
//     // Exact 66 characters ka hex banayenge: "0x" (2) + body (58) + uniqueEnd (6)
//     const body = reversedId + padding;
//     return ("0x" + body.substring(0, 58) + uniqueEnd).toLowerCase();
//   };

//   useEffect(() => {
//     const fetchDeposits = async () => {
//       try {
//         const userData = localStorage.getItem('user');
//         const user = userData ? JSON.parse(userData) : null;
//         const userId = user?.userId;

//         if (!userId) {
//           setLoading(false);
//           return;
//         }

//         setLoading(true);
//         const res = await api.get(`/wallet/history/${userId}?t=${new Date().getTime()}`);
        
//         const historyData = res.data.history || (Array.isArray(res.data) ? res.data : []);

//         // Sirf Deposit filter karenge aur Fake Hash attach karenge
//         const processedDeposits = historyData
//           .filter(item => item.type && (item.type.toLowerCase() === 'deposit' || item.type.toLowerCase() === 'manual_credit'))
//           .map((item, idx) => {
//             let originalHash = item.txHash || item.txnHash;
//             let displayHash = originalHash;
            
//             // 🔥 AGAR MANUAL HAI YA HASH GAYAB HAI, TOH UNIQUE FAKE HASH BANA DO
//             if (!originalHash || originalHash === 'N/A' || originalHash.startsWith('MANUAL-')) {
//               displayHash = generateDummyHash(item, idx);
//             }

//             return { ...item, displayHash }; 
//           });

//         setDeposits(processedDeposits);
//         setFilteredDeposits(processedDeposits);
//       } catch (err) {
//         console.error('Failed to fetch deposit history:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDeposits();
//   }, []);

//   // 🔍 SEARCH LOGIC
//   useEffect(() => {
//     const query = search.toLowerCase();
//     const filtered = deposits.filter((d) => {
//       const amt = getSafeAmount(d.amount || d.grossAmount).toString();
//       const recordDate = d.createdAt || d.date; 
//       // Time removed from search filtering as well
//       const dateStr = recordDate ? format(new Date(recordDate), 'dd-MM-yyyy').toLowerCase() : '';
//       const hashString = (d.displayHash || '').toLowerCase(); 
        
//       return amt.includes(query) || dateStr.includes(query) || hashString.includes(query);
//     });

//     setFilteredDeposits(filtered);
//   }, [search, deposits]);

//   return (
//     <div className="w-full min-h-screen bg-[#0b1221] p-4 md:p-8 font-sans">
      
//       {/* Inner Card Container */}
//       <div className="max-w-5xl mx-auto bg-[#131c31] rounded-xl border-t-[3px] border-[#eab308] shadow-2xl p-4 sm:p-6">
        
//         {/* Header Title */}
//         <div className="mb-6">
//           <h2 className="text-2xl sm:text-3xl text-[#eab308] font-bold tracking-wide flex items-center gap-3">
//              <History className="text-[#eab308]" size={28} /> Deposit History
//           </h2>
         
//         </div>

//         {/* Filter (Search) */}
//         <div className="mb-6">
//           <div className="relative w-full sm:w-[400px]">
//              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                <Search size={16} className="text-gray-500" />
//              </div>
//              <input
//                type="text"
//                placeholder="Search by amount, date, or tx hash..."
//                value={search}
//                onChange={(e) => setSearch(e.target.value)}
//                className="w-full bg-[#0b1221] border border-gray-700 text-gray-200 rounded px-3 py-2 pl-10 focus:outline-none focus:border-[#eab308] transition-colors placeholder-gray-500"
//              />
//           </div>
//         </div>

//         {/* Table Container */}
//         <div className="overflow-x-auto border border-gray-700 rounded-lg">
//           <table className="w-full text-left whitespace-nowrap border-collapse">
//             <thead className="text-[#eab308] bg-[#1a253e] text-sm border-b border-gray-700">
//               <tr>
//                 <th className="p-4 border-r border-gray-700/50 font-bold w-16 text-center">Sr. <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">Date <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold">Type <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold text-center">TxHash (BscScan) <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                 <th className="p-4 font-bold text-center">Amount</th>
//               </tr>
//             </thead>
            
//             <tbody className="text-gray-300 text-sm">
//               {loading ? (
//                 <tr>
//                   <td colSpan="5" className="text-center py-12 text-[#eab308]">
//                     <div className="animate-spin h-8 w-8 mx-auto mb-3 border-4 border-t-transparent border-[#eab308] rounded-full"></div>
//                     Loading Records...
//                   </td>
//                 </tr>
//               ) : filteredDeposits.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="text-center py-12 text-gray-500">
//                     No Deposit Records Found
//                   </td>
//                 </tr>
//               ) : (
//                 filteredDeposits.map((record, index) => {
//                   const recordDate = record.createdAt || record.date;
//                   const finalAmount = getSafeAmount(record.amount || record.grossAmount);
                  
//                   // 🔥 Hamesha Safe & Unique Hash Use Hoga
//                   const hash = record.displayHash; 
//                   const shortHash = formatHash(hash);
                  
//                   return (
//                     <tr key={record._id || index} className="border-b border-gray-700 hover:bg-[#1a253e] transition-colors">
//                       <td className="p-4 border-r border-gray-700/50 text-center font-medium">{index + 1}</td>

//                       {/* Date (Time removed) */}
//                       <td className="p-4 border-r border-gray-700/50 text-center">
//                         <div className="flex items-center justify-center gap-2">
//                           <Calendar size={14} className="text-gray-400" />
//                           <span>{recordDate ? format(new Date(recordDate), 'dd MMM yyyy') : 'N/A'}</span>
//                         </div>
//                       </td>

//                       <td className="p-4 border-r border-gray-700/50">
//                         <span className="inline-flex items-center gap-1.5 bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/20 py-1 px-2.5 rounded-md text-[10px] font-bold tracking-widest uppercase">
//                           <ArrowDownCircle size={12} /> Deposit
//                         </span>
//                       </td>

//                       {/* 🔥 FAKE/REAL HASH BUTTON */}
//                       <td className="p-4 border-r border-gray-700/50 text-center">
//                         <a 
//                           href={`https://bscscan.com/tx/${hash}`} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center justify-center gap-1.5 font-mono text-[11px] font-bold text-[#eab308] bg-[#0b1221] hover:bg-[#eab308] hover:text-[#0b1221] border border-gray-700 hover:border-[#eab308] px-3 py-1.5 rounded transition-all duration-200"
//                           title="Click to view on BscScan"
//                         >
//                           {shortHash} <ExternalLink size={12} />
//                         </a>
//                       </td>

//                       <td className="p-4 font-bold text-center text-green-400">
//                          + ${finalAmount.toFixed(2)}
//                       </td>
                  
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DepositHistory;



import React, { useEffect, useMemo, useState } from 'react';
import api from '../../api/axios';
import { format, isValid } from 'date-fns';
import {
  Search,
  History,
  ArrowDownCircle,
  Calendar,
  ExternalLink,
  RefreshCw,
  X,
} from 'lucide-react';

const getSafeAmount = (value) => {
  if (value == null || value === '') return 0;
  if (typeof value === 'object' && value.$numberDecimal != null) {
    return Number.parseFloat(value.$numberDecimal) || 0;
  }
  return Number.parseFloat(value) || 0;
};

const formatHash = (hash) => {
  if (!hash) return 'No transaction hash';
  const value = String(hash);
  if (value.length < 15) return value;
  return `${value.slice(0, 8)}...${value.slice(-6)}`;
};

// This creates a display-only placeholder. It is NOT a real blockchain transaction hash.
const generateDisplayPlaceholder = (item, index) => {
  const id = String(item?._id || item?.id || index);
  const seed = `${id}-${item?.createdAt || item?.date || ''}`;
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const hex = (hash >>> 0).toString(16).padStart(8, '0');
  return `MANUAL-${hex}-${id.slice(-6)}`;
};

const safeFormatDate = (value, pattern) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  return isValid(date) ? format(date, pattern) : 'N/A';
};

const DepositHistory = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const fetchDeposits = async () => {
    try {
      setError('');
      setLoading(true);

      const userData = localStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      const userId = user?.userId;

      if (!userId) {
        setDeposits([]);
        setLoading(false);
        return;
      }

      const response = await api.get(
        `/wallet/history/${encodeURIComponent(userId)}?t=${Date.now()}`
      );
      const data = response?.data?.history || (Array.isArray(response?.data) ? response.data : []);

      const processed = data
        .filter((item) => {
          const type = String(item?.type || '').toLowerCase();
          return type === 'deposit' || type === 'manual_credit';
        })
        .map((item, index) => {
          const originalHash = item?.txHash || item?.txnHash || '';
          const missingHash =
            !originalHash ||
            String(originalHash).toUpperCase() === 'N/A' ||
            String(originalHash).startsWith('MANUAL-');

          return {
            ...item,
            displayHash: missingHash ? generateDisplayPlaceholder(item, index) : String(originalHash),
            isPlaceholderHash: missingHash,
          };
        });

      setDeposits(processed);
    } catch (fetchError) {
      console.error('Failed to fetch deposit history:', fetchError);
      setError('Unable to load deposit history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
    // Initial fetch on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredDeposits = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return deposits;

    return deposits.filter((deposit) => {
      const amount = getSafeAmount(deposit.amount ?? deposit.grossAmount).toString();
      const date = safeFormatDate(deposit.createdAt || deposit.date, 'dd-MM-yyyy').toLowerCase();
      const hash = String(deposit.displayHash || '').toLowerCase();
      const type = String(deposit.type || 'deposit').toLowerCase();
      return amount.includes(query) || date.includes(query) || hash.includes(query) || type.includes(query);
    });
  }, [deposits, search]);

  const clearSearch = () => setSearch('');

  return (
    <main className="min-h-screen w-full bg-[#080811] px-3 py-5 font-sans text-slate-100 sm:px-5 sm:py-8 lg:px-8">
      <section className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-violet-500/20 bg-[#10101d] shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
        <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400" />

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-violet-200">
                <History size={14} />
                ACCOUNT ACTIVITY
              </div>
              <h1 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                  <ArrowDownCircle size={23} />
                </span>
                Deposit History
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Review your deposit records, dates, transaction references, and credited amounts.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchDeposits}
              disabled={loading}
              className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-xl border border-violet-400/25 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-200 transition hover:border-violet-300/50 hover:bg-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50 sm:self-center"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/8 bg-[#151525] p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Records shown</p>
              <p className="mt-2 text-2xl font-bold text-white">{filteredDeposits.length}</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-[#151525] p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Total deposits</p>
              <p className="mt-2 text-2xl font-bold text-cyan-300">{deposits.length}</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-[#151525] p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Matched amount</p>
              <p className="mt-2 text-2xl font-bold text-emerald-300">
                ${filteredDeposits.reduce((sum, item) => sum + getSafeAmount(item.amount ?? item.grossAmount), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search amount, date, or transaction hash..."
                aria-label="Search deposit history"
                className="h-12 w-full rounded-xl border border-white/10 bg-[#0b0b16] py-2 pl-10 pr-10 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/15"
              />
              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
                >
                  <X size={15} />
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500">
              {search ? `Showing ${filteredDeposits.length} matching record(s)` : 'Latest records from your account history'}
            </p>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-[#19182a] text-xs uppercase tracking-wider text-violet-200">
                    <th className="px-5 py-4 text-center font-bold">Sr.</th>
                    <th className="px-5 py-4 font-bold">Date</th>
                    <th className="px-5 py-4 font-bold">Type</th>
                    <th className="px-5 py-4 font-bold">TxHash (BscScan)</th>
                    <th className="px-5 py-4 text-right font-bold">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-sm text-slate-300">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-14 text-center">
                        <span className="mx-auto mb-3 block h-8 w-8 animate-spin rounded-full border-2 border-violet-400/30 border-t-violet-300" />
                        <span className="text-sm font-medium text-violet-200">Loading deposit records...</span>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-12 text-center">
                        <p className="font-semibold text-rose-300">{error}</p>
                        <button
                          type="button"
                          onClick={fetchDeposits}
                          className="mt-4 rounded-lg border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200 hover:bg-rose-500/20"
                        >
                          Try again
                        </button>
                      </td>
                    </tr>
                  ) : filteredDeposits.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-14 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-500">
                          <History size={22} />
                        </div>
                        <p className="font-semibold text-slate-200">No deposit records found</p>
                        <p className="mt-1 text-xs text-slate-500">Try another search term or refresh your history.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredDeposits.map((record, index) => {
                      const recordDate = record.createdAt || record.date;
                      const amount = getSafeAmount(record.amount ?? record.grossAmount);
                      const hash = record.displayHash;
                      const isRealHash = !record.isPlaceholderHash;
                      const explorerUrl = isRealHash
                        ? `https://bscscan.com/tx/${encodeURIComponent(hash)}`
                        : null;

                      return (
                        <tr
                          key={record._id || record.id || `${recordDate || 'deposit'}-${index}`}
                          className="transition-colors hover:bg-violet-500/[0.06]"
                        >
                          <td className="px-5 py-4 text-center font-semibold text-slate-500">{index + 1}</td>
                          <td className="px-5 py-4">
                            <div className="flex min-w-[130px] items-center gap-2 text-slate-300">
                              <Calendar size={15} className="shrink-0 text-violet-300" />
                              <span>{safeFormatDate(recordDate, 'dd MMM yyyy')}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-cyan-200">
                              <ArrowDownCircle size={13} />
                              {String(record.type || '').toLowerCase() === 'manual_credit' ? 'Manual Credit' : 'Deposit'}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            {explorerUrl ? (
                              <a
                                href={explorerUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex max-w-[250px] items-center gap-2 rounded-lg border border-violet-400/20 bg-[#0b0b16] px-3 py-2 font-mono text-xs font-semibold text-violet-200 transition hover:border-cyan-300/40 hover:bg-violet-500/10 hover:text-cyan-200"
                                title="Open transaction on BscScan"
                              >
                                <span>{formatHash(hash)}</span>
                                <ExternalLink size={13} className="shrink-0" />
                              </a>
                            ) : (
                              <span
                                className="inline-flex max-w-[250px] items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-400/[0.06] px-3 py-2 font-mono text-xs font-semibold text-amber-200"
                                title="This is a display placeholder, not a verified blockchain transaction"
                              >
                                <span>{formatHash(hash)}</span>
                                <span className="rounded bg-amber-400/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wide">Manual</span>
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <span className="font-bold tabular-nums text-emerald-300">
                              + ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Transaction references marked “Manual” are display placeholders and cannot be verified on BscScan.
          </p>
        </div>
      </section>
    </main>
  );
};

export default DepositHistory;
