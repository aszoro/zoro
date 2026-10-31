// // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // import api from '../../api/axios';
// // // // // // // import { Search, RefreshCcw, Wallet, CheckCircle, AlertCircle, Zap, ChevronLeft, ChevronRight, User as UserIcon } from 'lucide-react';

// // // // // // // const DepositAddressMonitor = () => {
// // // // // // //     const [users, setUsers] = useState([]);
// // // // // // //     const [loading, setLoading] = useState(true);
// // // // // // //     const [searchQuery, setSearchQuery] = useState("");
// // // // // // //     const [balanceLoading, setBalanceLoading] = useState(null); 
// // // // // // //     const [isAutoFetching, setIsAutoFetching] = useState(false);
// // // // // // //     const [sweepingId, setSweepingId] = useState(null); 

// // // // // // //     const [currentPage, setCurrentPage] = useState(1);
// // // // // // //     const [itemsPerPage, setItemsPerPage] = useState(10);

// // // // // // //     const fetchUsersWithAddresses = async () => {
// // // // // // //         try {
// // // // // // //             setLoading(true);
// // // // // // //             const token = localStorage.getItem('adminToken');
// // // // // // //             const res = await api.get('/admin/users-deposit-addresses', {
// // // // // // //                 headers: { Authorization: `Bearer ${token}` }
// // // // // // //             });
            
// // // // // // //             const formattedUsers = res.data.data.map(u => ({
// // // // // // //                 ...u,
// // // // // // //                 liveBalance: null 
// // // // // // //             }));
            
// // // // // // //             setUsers(formattedUsers);
// // // // // // //             setIsAutoFetching(true); 
// // // // // // //         } catch (error) {
// // // // // // //             console.error("Failed to fetch addresses:", error);
// // // // // // //         } finally {
// // // // // // //             setLoading(false);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     useEffect(() => {
// // // // // // //         fetchUsersWithAddresses();
// // // // // // //     }, []);

// // // // // // //     // 🔥 1. BACKGROUND SCANNER (Aaram se chalta rahega)
// // // // // // //     useEffect(() => {
// // // // // // //         if (!isAutoFetching || users.length === 0) return;
// // // // // // //         let isMounted = true;

// // // // // // //         const fetchAllBalancesInBatches = async () => {
// // // // // // //             const BATCH_SIZE = 10; 
            
// // // // // // //             for (let i = 0; i < users.length; i += BATCH_SIZE) {
// // // // // // //                 if (!isMounted) break;
                
// // // // // // //                 const batch = users.slice(i, i + BATCH_SIZE);
// // // // // // //                 const usersToCheck = batch.filter(u => u.liveBalance === null);
                
// // // // // // //                 if (usersToCheck.length > 0) {
// // // // // // //                     try {
// // // // // // //                         usersToCheck.forEach(u => setBalanceLoading(u.userId));
// // // // // // //                         const token = localStorage.getItem('adminToken');
// // // // // // //                         const promises = usersToCheck.map(user => 
// // // // // // //                             api.get(`/admin/check-live-balance/${user.userId}`, {
// // // // // // //                                 headers: { Authorization: `Bearer ${token}` }
// // // // // // //                             }).then(res => ({ userId: user.userId, balance: res.data.liveBalance }))
// // // // // // //                               .catch(() => ({ userId: user.userId, balance: 'Error' }))
// // // // // // //                         );

// // // // // // //                         const results = await Promise.all(promises);

// // // // // // //                         setUsers(prev => {
// // // // // // //                             let newUsers = [...prev];
// // // // // // //                             results.forEach(res => {
// // // // // // //                                 const index = newUsers.findIndex(u => u.userId === res.userId);
// // // // // // //                                 if (index !== -1) newUsers[index].liveBalance = res.balance;
// // // // // // //                             });
// // // // // // //                             return newUsers;
// // // // // // //                         });

// // // // // // //                         await new Promise(resolve => setTimeout(resolve, 1000));
                        
// // // // // // //                     } catch (error) {
// // // // // // //                         console.error("Batch fetch error", error);
// // // // // // //                     }
// // // // // // //                 }
// // // // // // //             }
// // // // // // //             if (isMounted) {
// // // // // // //                 setBalanceLoading(null);
// // // // // // //                 setIsAutoFetching(false);
// // // // // // //             }
// // // // // // //         };

// // // // // // //         fetchAllBalancesInBatches();
// // // // // // //         return () => { isMounted = false; };
// // // // // // //     }, [isAutoFetching, users.length]);

// // // // // // //     // 🔥 1. ADVANCED FILTERING
// // // // // // //     const filteredUsers = users.filter(u => 
// // // // // // //         (u.userId?.toString().includes(searchQuery)) || 
// // // // // // //         (u.name?.toLowerCase().includes(searchQuery.toLowerCase())) || 
// // // // // // //         (u.depositAddress?.toLowerCase().includes(searchQuery.toLowerCase()))
// // // // // // //     );

// // // // // // //     // 🚀 NEW: INSTANT FETCH FOR SEARCHED USER!
// // // // // // //     // Agar admin ne kuch search kiya hai, toh turant usko fetch karo, queue ka wait mat karo.
// // // // // // //     useEffect(() => {
// // // // // // //         if (searchQuery.trim().length > 0 && filteredUsers.length > 0 && filteredUsers.length <= 10) {
// // // // // // //             const usersToFetchInstantly = filteredUsers.filter(u => u.liveBalance === null);
            
// // // // // // //             if (usersToFetchInstantly.length > 0) {
// // // // // // //                 usersToFetchInstantly.forEach(async (user) => {
// // // // // // //                     try {
// // // // // // //                         setBalanceLoading(user.userId);
// // // // // // //                         const token = localStorage.getItem('adminToken');
// // // // // // //                         const res = await api.get(`/admin/check-live-balance/${user.userId}`, {
// // // // // // //                             headers: { Authorization: `Bearer ${token}` }
// // // // // // //                         });
                        
// // // // // // //                         setUsers(prev => prev.map(u => u.userId === user.userId ? { ...u, liveBalance: res.data.liveBalance } : u));
// // // // // // //                     } catch (error) {
// // // // // // //                         setUsers(prev => prev.map(u => u.userId === user.userId ? { ...u, liveBalance: 'Error' } : u));
// // // // // // //                     } finally {
// // // // // // //                         setBalanceLoading(null);
// // // // // // //                     }
// // // // // // //                 });
// // // // // // //             }
// // // // // // //         }
// // // // // // //     }, [searchQuery, filteredUsers]);

// // // // // // //     const handleForceSweep = async (userId) => {
// // // // // // //         if (!window.confirm(`Are you sure you want to FORCE SWEEP funds for User #${userId}? This will transfer the crypto to the Master Wallet and credit the user.`)) return;

// // // // // // //         try {
// // // // // // //             setSweepingId(userId);
// // // // // // //             const token = localStorage.getItem('adminToken');
            
// // // // // // //             const res = await api.post(`/admin/force-sweep-deposit/${userId}`, {}, {
// // // // // // //                 headers: { Authorization: `Bearer ${token}` }
// // // // // // //             });

// // // // // // //             alert(res.data.message || `Successfully swept and credited User #${userId}!`);
            
// // // // // // //             setUsers(prev => prev.map(u => 
// // // // // // //                 u.userId === userId ? { ...u, liveBalance: "0.00" } : u
// // // // // // //             ));

// // // // // // //         } catch (error) {
// // // // // // //             alert(error.response?.data?.message || "Sweep failed. Check backend logs.");
// // // // // // //             console.error("Force Sweep Error:", error);
// // // // // // //         } finally {
// // // // // // //             setSweepingId(null);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     // 🔥 2. DYNAMIC SORTING
// // // // // // //     const sortedUsers = [...filteredUsers].sort((a, b) => {
// // // // // // //         const getVal = (val) => {
// // // // // // //             if (val === null) return -1; 
// // // // // // //             if (val === 'Error') return -2; 
// // // // // // //             return Number(val) || 0; 
// // // // // // //         };
// // // // // // //         return getVal(b.liveBalance) - getVal(a.liveBalance); 
// // // // // // //     });

// // // // // // //     // 🔥 3. PAGINATION LOGIC
// // // // // // //     const indexOfLastItem = currentPage * itemsPerPage;
// // // // // // //     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // // // // // //     const currentItems = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);
// // // // // // //     const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

// // // // // // //     const handlePageChange = (newPage) => {
// // // // // // //         if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
// // // // // // //     };

// // // // // // //     return (
// // // // // // //         <div className="p-4 pt-12 md:pt-16 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
            
// // // // // // //             <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
// // // // // // //                 <div>
// // // // // // //                     <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2 uppercase tracking-wide">
// // // // // // //                         <Wallet className="text-orange-500" size={28} /> Address Monitor
// // // // // // //                     </h2>
// // // // // // //                     <p className="text-slate-500 text-xs md:text-sm font-bold mt-1 uppercase tracking-widest">
// // // // // // //                         Track Live Funds, Sort by Balance & Force Sweep
// // // // // // //                     </p>
// // // // // // //                 </div>

// // // // // // //                 <div className="relative w-full md:w-96 group">
// // // // // // //                     <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
// // // // // // //                         <Search size={16} className="text-gray-400 group-focus-within:text-orange-500" />
// // // // // // //                     </div>
// // // // // // //                     <input
// // // // // // //                         type="text"
// // // // // // //                         placeholder="Search by ID, Name or Address..."
// // // // // // //                         value={searchQuery}
// // // // // // //                         onChange={(e) => {
// // // // // // //                             setSearchQuery(e.target.value);
// // // // // // //                             setCurrentPage(1); 
// // // // // // //                         }}
// // // // // // //                         className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-3 pl-10 focus:border-orange-500 focus:outline-none font-bold tracking-wide shadow-sm"
// // // // // // //                     />
// // // // // // //                 </div>
// // // // // // //             </div>

// // // // // // //             <div className="border border-slate-200 rounded-2xl shadow-sm bg-white overflow-hidden flex flex-col">
// // // // // // //                 <div className="overflow-x-auto w-full custom-scroll flex-grow">
// // // // // // //                     <table className="w-full text-sm text-left whitespace-nowrap">
// // // // // // //                         <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] md:text-[11px] font-black tracking-widest border-b border-slate-200">
// // // // // // //                             <tr>
// // // // // // //                                 <th className="px-4 py-4">User Info</th>
// // // // // // //                                 <th className="px-4 py-4">Deposit Address</th>
// // // // // // //                                 <th className="px-4 py-4 text-center bg-orange-50/50 text-orange-600 border-x border-slate-100">Live Block Balance</th>
// // // // // // //                                 <th className="px-4 py-4 text-center">Action</th>
// // // // // // //                             </tr>
// // // // // // //                         </thead>
// // // // // // //                         <tbody className="divide-y divide-slate-100 text-slate-600">
// // // // // // //                             {loading ? (
// // // // // // //                                 <tr><td colSpan="4" className="text-center py-10 font-bold animate-pulse text-orange-500">⏳ Loading Addresses...</td></tr>
// // // // // // //                             ) : currentItems.length === 0 ? (
// // // // // // //                                 <tr><td colSpan="4" className="text-center py-10 font-bold">No Records Found</td></tr>
// // // // // // //                             ) : (
// // // // // // //                                 currentItems.map((user) => (
// // // // // // //                                     <tr key={user.userId} className="hover:bg-slate-50 transition-colors bg-white">
                                        
// // // // // // //                                         <td className="px-4 py-3">
// // // // // // //                                             <div className="flex flex-col">
// // // // // // //                                                 <span className="font-mono font-black text-slate-800 flex items-center gap-1.5">
// // // // // // //                                                     #{user.userId}
// // // // // // //                                                 </span>
// // // // // // //                                                 <span className="text-xs text-slate-500 font-bold flex items-center gap-1 mt-0.5">
// // // // // // //                                                     <UserIcon size={12} /> {user.name || "Unknown User"}
// // // // // // //                                                 </span>
// // // // // // //                                             </div>
// // // // // // //                                         </td>
                                        
// // // // // // //                                         <td className="px-4 py-3">
// // // // // // //                                             <span className="font-mono text-xs text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg select-all">
// // // // // // //                                                 {user.depositAddress || "Not Generated"}
// // // // // // //                                             </span>
// // // // // // //                                         </td>
                                        
// // // // // // //                                         <td className="px-4 py-3 text-center border-x border-slate-100 bg-orange-50/10 min-w-[150px]">
// // // // // // //                                             {user.liveBalance === 'Error' ? (
// // // // // // //                                                  <span className="text-red-500 font-bold text-xs flex items-center justify-center gap-1">
// // // // // // //                                                      <AlertCircle size={14} /> Failed
// // // // // // //                                                  </span>
// // // // // // //                                             ) : user.liveBalance !== null ? (
// // // // // // //                                                 <span className="text-orange-600 font-black text-base flex items-center justify-center gap-1">
// // // // // // //                                                     <CheckCircle size={14} /> ${user.liveBalance}
// // // // // // //                                                 </span>
// // // // // // //                                             ) : (
// // // // // // //                                                 <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 animate-pulse">
// // // // // // //                                                     {balanceLoading === user.userId ? (
// // // // // // //                                                         <><RefreshCcw size={12} className="animate-spin text-orange-500" /> Fetching...</>
// // // // // // //                                                     ) : (
// // // // // // //                                                         "Waiting..."
// // // // // // //                                                     )}
// // // // // // //                                                 </span>
// // // // // // //                                             )}
// // // // // // //                                         </td>

// // // // // // //                                         <td className="px-4 py-3 text-center">
// // // // // // //                                             <button 
// // // // // // //                                                 onClick={() => handleForceSweep(user.userId)}
// // // // // // //                                                 disabled={sweepingId === user.userId || user.liveBalance === null || Number(user.liveBalance) <= 0}
// // // // // // //                                                 className={`px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 mx-auto shadow-sm ${
// // // // // // //                                                     Number(user.liveBalance) > 0 
// // // // // // //                                                     ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
// // // // // // //                                                     : "bg-slate-100 text-slate-400 cursor-not-allowed"
// // // // // // //                                                 }`}
// // // // // // //                                             >
// // // // // // //                                                 {sweepingId === user.userId ? (
// // // // // // //                                                     <><RefreshCcw size={14} className="animate-spin" /> Sweeping...</>
// // // // // // //                                                 ) : (
// // // // // // //                                                     <><Zap size={14} className={Number(user.liveBalance) > 0 ? "fill-white" : ""} /> Force Sweep</>
// // // // // // //                                                 )}
// // // // // // //                                             </button>
// // // // // // //                                         </td>
// // // // // // //                                     </tr>
// // // // // // //                                 ))
// // // // // // //                             )}
// // // // // // //                         </tbody>
// // // // // // //                     </table>
// // // // // // //                 </div>

// // // // // // //                 {/* 🔥 PAGINATION FOOTER */}
// // // // // // //                 {!loading && sortedUsers.length > 0 && (
// // // // // // //                     <div className="bg-slate-50 border-t border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-b-2xl">
// // // // // // //                         <div className="flex items-center gap-3">
// // // // // // //                             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Rows per page:</span>
// // // // // // //                             <select 
// // // // // // //                                 value={itemsPerPage} 
// // // // // // //                                 onChange={(e) => {
// // // // // // //                                     setItemsPerPage(Number(e.target.value));
// // // // // // //                                     setCurrentPage(1);
// // // // // // //                                 }}
// // // // // // //                                 className="bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-2 py-1.5 focus:outline-none focus:border-orange-500 cursor-pointer shadow-sm"
// // // // // // //                             >
// // // // // // //                                 <option value={10}>10</option>
// // // // // // //                                 <option value={20}>20</option>
// // // // // // //                                 <option value={50}>50</option>
// // // // // // //                                 <option value={100}>100</option>
// // // // // // //                             </select>
// // // // // // //                         </div>
                        
// // // // // // //                         <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
// // // // // // //                             <span>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedUsers.length)} of {sortedUsers.length} entries</span>
                            
// // // // // // //                             <div className="flex items-center gap-2">
// // // // // // //                                 <button 
// // // // // // //                                     onClick={() => handlePageChange(currentPage - 1)}
// // // // // // //                                     disabled={currentPage === 1}
// // // // // // //                                     className="p-1.5 rounded-md bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
// // // // // // //                                 >
// // // // // // //                                     <ChevronLeft size={16} />
// // // // // // //                                 </button>
// // // // // // //                                 <span className="px-2 font-black text-slate-700">
// // // // // // //                                     Page {currentPage} of {totalPages}
// // // // // // //                                 </span>
// // // // // // //                                 <button 
// // // // // // //                                     onClick={() => handlePageChange(currentPage + 1)}
// // // // // // //                                     disabled={currentPage === totalPages}
// // // // // // //                                     className="p-1.5 rounded-md bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
// // // // // // //                                 >
// // // // // // //                                     <ChevronRight size={16} />
// // // // // // //                                 </button>
// // // // // // //                             </div>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 )}
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // };

// // // // // // // export default DepositAddressMonitor;



// // // // // // import React, { useCallback, useEffect, useMemo, useState } from 'react';
// // // // // // import api from '../../api/axios';
// // // // // // import {
// // // // // //   Search,
// // // // // //   RefreshCcw,
// // // // // //   Wallet,
// // // // // //   CheckCircle,
// // // // // //   AlertCircle,
// // // // // //   ChevronLeft,
// // // // // //   ChevronRight,
// // // // // //   User as UserIcon,
// // // // // //   Copy
// // // // // // } from 'lucide-react';

// // // // // // const NETWORKS = [
// // // // // //   { key: 'ethereum', label: 'Ethereum', native: 'ETH' },
// // // // // //   { key: 'bsc', label: 'BNB Smart Chain', native: 'BNB' },
// // // // // //   { key: 'polygon', label: 'Polygon', native: 'POL' }
// // // // // // ];

// // // // // // const formatBalance = (value) => {
// // // // // //   if (value === undefined || value === null || value === '') return '—';

// // // // // //   const number = Number(value);
// // // // // //   if (!Number.isFinite(number)) return String(value);

// // // // // //   return number.toLocaleString('en-US', {
// // // // // //     maximumFractionDigits: 8
// // // // // //   });
// // // // // // };

// // // // // // const DepositAddressMonitor = () => {
// // // // // //   const [users, setUsers] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState('');
// // // // // //   const [searchQuery, setSearchQuery] = useState('');
// // // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // // //   const [itemsPerPage, setItemsPerPage] = useState(10);

// // // // // //   const fetchUsersWithAddresses = useCallback(async () => {
// // // // // //     setLoading(true);
// // // // // //     setError('');

// // // // // //     try {
// // // // // //       const token = localStorage.getItem('adminToken');

// // // // // //       const response = await api.get('/admin/users-deposit-addresses', {
// // // // // //         headers: { Authorization: `Bearer ${token}` }
// // // // // //       });

// // // // // //       if (!response.data?.success || !Array.isArray(response.data.data)) {
// // // // // //         throw new Error('Invalid response from the deposit-address API.');
// // // // // //       }

// // // // // //       setUsers(response.data.data);
// // // // // //     } catch (err) {
// // // // // //       console.error('Failed to fetch deposit addresses:', err);
// // // // // //       setError(
// // // // // //         err.response?.data?.message ||
// // // // // //         err.message ||
// // // // // //         'Failed to load deposit addresses.'
// // // // // //       );
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     fetchUsersWithAddresses();
// // // // // //   }, [fetchUsersWithAddresses]);

// // // // // //   const filteredUsers = useMemo(() => {
// // // // // //     const query = searchQuery.trim().toLowerCase();

// // // // // //     return users.filter((user) =>
// // // // // //       String(user.userId ?? '').toLowerCase().includes(query) ||
// // // // // //       String(user.name ?? '').toLowerCase().includes(query) ||
// // // // // //       String(user.depositAddress ?? '').toLowerCase().includes(query)
// // // // // //     );
// // // // // //   }, [users, searchQuery]);

// // // // // //   const sortedUsers = useMemo(() => {
// // // // // //     return [...filteredUsers].sort((a, b) =>
// // // // // //       String(b.userId ?? '').localeCompare(String(a.userId ?? ''), undefined, {
// // // // // //         numeric: true
// // // // // //       })
// // // // // //     );
// // // // // //   }, [filteredUsers]);

// // // // // //   const totalPages = Math.max(1, Math.ceil(sortedUsers.length / itemsPerPage));
// // // // // //   const safePage = Math.min(currentPage, totalPages);
// // // // // //   const startIndex = (safePage - 1) * itemsPerPage;
// // // // // //   const currentItems = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

// // // // // //   const copyAddress = async (address) => {
// // // // // //     try {
// // // // // //       await navigator.clipboard.writeText(address);
// // // // // //     } catch (err) {
// // // // // //       console.error('Could not copy address:', err);
// // // // // //       window.prompt('Copy this address:', address);
// // // // // //     }
// // // // // //   };

// // // // // //   const getNetworkBalance = (user, networkKey) => {
// // // // // //     return (user.balances || []).find(
// // // // // //       (item) => item.network === networkKey
// // // // // //     );
// // // // // //   };

// // // // // //   const getBalanceStatus = (user) => {
// // // // // //     if (user.balanceStatus === 'invalid_address') return 'Invalid address';

// // // // // //     const balances = user.balances || [];
// // // // // //     if (!balances.length) return 'Not checked';

// // // // // //     const failed = balances.filter((item) => item.status !== 'success').length;

// // // // // //     if (failed === balances.length) return 'Check failed';
// // // // // //     if (failed > 0) return 'Partially checked';

// // // // // //     return 'All networks checked';
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="p-4 pt-12 md:pt-16 max-w-[1600px] mx-auto w-full">
// // // // // //       <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
// // // // // //         <div>
// // // // // //           <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2 uppercase tracking-wide">
// // // // // //             <Wallet className="text-orange-500" size={28} />
// // // // // //             Deposit Address Monitor r
// // // // // //           </h2>
// // // // // //           <p className="text-slate-500 text-xs md:text-sm font-bold mt-1">
// // // // // //             ETHEREUM · BNB SMART CHAIN · POLYGON · USDT
// // // // // //           </p>
// // // // // //         </div>

// // // // // //         <button
// // // // // //           type="button"
// // // // // //           onClick={fetchUsersWithAddresses}
// // // // // //           disabled={loading}
// // // // // //           className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white hover:bg-orange-600 disabled:opacity-60"
// // // // // //         >
// // // // // //           <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
// // // // // //           Refresh balances
// // // // // //         </button>
// // // // // //       </div>

// // // // // //       <div className="mb-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
// // // // // //         <div className="rounded-xl border border-slate-200 bg-white p-4">
// // // // // //           <p className="text-xs font-bold uppercase text-slate-500">Users found</p>
// // // // // //           <p className="mt-1 text-2xl font-black text-slate-800">
// // // // // //             {filteredUsers.length}
// // // // // //           </p>
// // // // // //         </div>

// // // // // //         <div className="rounded-xl border border-slate-200 bg-white p-4">
// // // // // //           <p className="text-xs font-bold uppercase text-slate-500">With deposit address</p>
// // // // // //           <p className="mt-1 text-2xl font-black text-slate-800">
// // // // // //             {users.filter((user) => Boolean(user.depositAddress)).length}
// // // // // //           </p>
// // // // // //         </div>

// // // // // //         <div className="rounded-xl border border-slate-200 bg-white p-4">
// // // // // //           <p className="text-xs font-bold uppercase text-slate-500">Networks checked</p>
// // // // // //           <p className="mt-1 text-2xl font-black text-slate-800">3</p>
// // // // // //           <p className="text-xs text-slate-500">ETH · BSC · Polygon</p>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div className="relative mb-5 w-full md:max-w-lg">
// // // // // //         <Search
// // // // // //           size={17}
// // // // // //           className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
// // // // // //         />
// // // // // //         <input
// // // // // //           type="text"
// // // // // //           value={searchQuery}
// // // // // //           onChange={(event) => {
// // // // // //             setSearchQuery(event.target.value);
// // // // // //             setCurrentPage(1);
// // // // // //           }}
// // // // // //           placeholder="Search by user ID, name or address..."
// // // // // //           className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-slate-800 outline-none focus:border-orange-500"
// // // // // //         />
// // // // // //       </div>

// // // // // //       {error && (
// // // // // //         <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
// // // // // //           <AlertCircle size={18} className="mt-0.5 shrink-0" />
// // // // // //           <div>
// // // // // //             {error}
// // // // // //             <button
// // // // // //               type="button"
// // // // // //               onClick={fetchUsersWithAddresses}
// // // // // //               className="ml-2 underline"
// // // // // //             >
// // // // // //               Try again
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
// // // // // //         <div className="overflow-x-auto">
// // // // // //           <table className="w-full min-w-[1050px] text-left text-sm">
// // // // // //             <thead className="border-b border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500">
// // // // // //               <tr>
// // // // // //                 <th className="px-4 py-4">User</th>
// // // // // //                 <th className="px-4 py-4">Deposit address</th>
// // // // // //                 {NETWORKS.map((network) => (
// // // // // //                   <th key={network.key} className="px-4 py-4">
// // // // // //                     <div>{network.label}</div>
// // // // // //                     <div className="mt-1 normal-case tracking-normal">
// // // // // //                       {network.native} + USDT
// // // // // //                     </div>
// // // // // //                   </th>
// // // // // //                 ))}
// // // // // //                 <th className="px-4 py-4">Status</th>
// // // // // //               </tr>
// // // // // //             </thead>

// // // // // //             <tbody className="divide-y divide-slate-100 text-slate-600">
// // // // // //               {loading ? (
// // // // // //                 <tr>
// // // // // //                   <td colSpan={6} className="py-12 text-center font-bold text-orange-500">
// // // // // //                     <RefreshCcw size={18} className="mx-auto mb-2 animate-spin" />
// // // // // //                     Loading users and network balances...
// // // // // //                   </td>
// // // // // //                 </tr>
// // // // // //               ) : currentItems.length === 0 ? (
// // // // // //                 <tr>
// // // // // //                   <td colSpan={6} className="py-12 text-center font-bold text-slate-500">
// // // // // //                     No users found.
// // // // // //                   </td>
// // // // // //                 </tr>
// // // // // //               ) : (
// // // // // //                 currentItems.map((user, index) => (
// // // // // //                   <tr
// // // // // //                     key={user._id || user.userId || index}
// // // // // //                     className="align-top hover:bg-slate-50"
// // // // // //                   >
// // // // // //                     <td className="px-4 py-4">
// // // // // //                       <div className="font-mono font-black text-slate-800">
// // // // // //                         #{user.userId ?? '—'}
// // // // // //                       </div>
// // // // // //                       <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
// // // // // //                         <UserIcon size={12} />
// // // // // //                         {user.name || 'Unknown user'}
// // // // // //                       </div>
// // // // // //                     </td>

// // // // // //                     <td className="max-w-[230px] px-4 py-4">
// // // // // //                       {user.depositAddress ? (
// // // // // //                         <div className="flex items-start gap-2">
// // // // // //                           <span className="break-all font-mono text-xs">
// // // // // //                             {user.depositAddress}
// // // // // //                           </span>
// // // // // //                           <button
// // // // // //                             type="button"
// // // // // //                             title="Copy deposit address"
// // // // // //                             onClick={() => copyAddress(user.depositAddress)}
// // // // // //                             className="shrink-0 rounded p-1 text-slate-500 hover:bg-slate-200"
// // // // // //                           >
// // // // // //                             <Copy size={14} />
// // // // // //                           </button>
// // // // // //                         </div>
// // // // // //                       ) : (
// // // // // //                         <span className="text-xs text-slate-400">
// // // // // //                           No address
// // // // // //                         </span>
// // // // // //                       )}
// // // // // //                     </td>

// // // // // //                     {NETWORKS.map((network) => {
// // // // // //                       const result = getNetworkBalance(user, network.key);

// // // // // //                       return (
// // // // // //                         <td key={network.key} className="px-4 py-4">
// // // // // //                           {!result ? (
// // // // // //                             <span className="text-xs text-slate-400">
// // // // // //                               Not checked
// // // // // //                             </span>
// // // // // //                           ) : result.status !== 'success' ? (
// // // // // //                             <div className="max-w-[150px] text-xs text-red-600">
// // // // // //                               <div className="flex items-center gap-1 font-bold">
// // // // // //                                 <AlertCircle size={13} />
// // // // // //                                 Check failed
// // // // // //                               </div>
// // // // // //                               <div className="mt-1 whitespace-normal break-words text-slate-500">
// // // // // //                                 {result.message || 'Network unavailable'}
// // // // // //                               </div>
// // // // // //                             </div>
// // // // // //                           ) : (
// // // // // //                             <div className="space-y-2">
// // // // // //                               <div>
// // // // // //                                 <div className="text-[10px] font-bold uppercase text-slate-400">
// // // // // //                                   {result.native?.symbol || network.native}
// // // // // //                                 </div>
// // // // // //                                 <div className="font-mono font-bold text-slate-800">
// // // // // //                                   {formatBalance(result.native?.balance)}
// // // // // //                                 </div>
// // // // // //                               </div>

// // // // // //                               <div>
// // // // // //                                 <div className="text-[10px] font-bold uppercase text-slate-400">
// // // // // //                                   USDT
// // // // // //                                 </div>
// // // // // //                                 <div className="font-mono font-bold text-emerald-700">
// // // // // //                                   {formatBalance(result.usdt?.balance)}
// // // // // //                                 </div>
// // // // // //                               </div>
// // // // // //                             </div>
// // // // // //                           )}
// // // // // //                         </td>
// // // // // //                       );
// // // // // //                     })}

// // // // // //                     <td className="px-4 py-4">
// // // // // //                       {user.balanceStatus === 'success' ? (
// // // // // //                         <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
// // // // // //                           <CheckCircle size={14} />
// // // // // //                           Complete
// // // // // //                         </span>
// // // // // //                       ) : user.balanceStatus === 'invalid_address' ? (
// // // // // //                         <span className="text-xs font-bold text-red-600">
// // // // // //                           Invalid address
// // // // // //                         </span>
// // // // // //                       ) : (
// // // // // //                         <span className="text-xs font-semibold text-amber-700">
// // // // // //                           {getBalanceStatus(user)}
// // // // // //                         </span>
// // // // // //                       )}
// // // // // //                     </td>
// // // // // //                   </tr>
// // // // // //                 ))
// // // // // //               )}
// // // // // //             </tbody>
// // // // // //           </table>
// // // // // //         </div>

// // // // // //         {!loading && sortedUsers.length > 0 && (
// // // // // //           <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
// // // // // //             <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
// // // // // //               <span>Rows per page:</span>
// // // // // //               <select
// // // // // //                 value={itemsPerPage}
// // // // // //                 onChange={(event) => {
// // // // // //                   setItemsPerPage(Number(event.target.value));
// // // // // //                   setCurrentPage(1);
// // // // // //                 }}
// // // // // //                 className="rounded-lg border border-slate-200 bg-white px-2 py-1.5"
// // // // // //               >
// // // // // //                 {[10, 20, 50, 100].map((size) => (
// // // // // //                   <option key={size} value={size}>{size}</option>
// // // // // //                 ))}
// // // // // //               </select>
// // // // // //             </div>

// // // // // //             <div className="flex items-center justify-between gap-3 text-xs font-bold text-slate-600 sm:justify-end">
// // // // // //               <span>
// // // // // //                 Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, sortedUsers.length)} of {sortedUsers.length}
// // // // // //               </span>

// // // // // //               <button
// // // // // //                 type="button"
// // // // // //                 onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
// // // // // //                 disabled={safePage === 1}
// // // // // //                 className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"
// // // // // //               >
// // // // // //                 <ChevronLeft size={16} />
// // // // // //               </button>

// // // // // //               <span>Page {safePage} of {totalPages}</span>

// // // // // //               <button
// // // // // //                 type="button"
// // // // // //                 onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
// // // // // //                 disabled={safePage === totalPages}
// // // // // //                 className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"
// // // // // //               >
// // // // // //                 <ChevronRight size={16} />
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>

// // // // // //       <p className="mt-4 text-xs leading-5 text-slate-500">
// // // // // //         Balances are queried separately for each blockchain. A failed network
// // // // // //         query is shown as an error, not as a zero balance. This page displays
// // // // // //         balances only; it does not initiate transfers.
// // // // // //       </p>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default DepositAddressMonitor;




// // // // // import React, {
// // // // //   useCallback,
// // // // //   useEffect,
// // // // //   useMemo,
// // // // //   useRef,
// // // // //   useState,
// // // // // } from 'react';

// // // // // import api from '../../api/axios';

// // // // // import {
// // // // //   Search,
// // // // //   RefreshCcw,
// // // // //   Wallet,
// // // // //   CheckCircle,
// // // // //   AlertCircle,
// // // // //   ChevronLeft,
// // // // //   ChevronRight,
// // // // //   User as UserIcon,
// // // // //   Copy,
// // // // //   Play,
// // // // //   Square,
// // // // //   RotateCcw,
// // // // // } from 'lucide-react';

// // // // // const NETWORKS = [
// // // // //   { key: 'ethereum', label: 'Ethereum', native: 'ETH' },
// // // // //   { key: 'bsc', label: 'BNB Smart Chain', native: 'BNB' },
// // // // //   { key: 'polygon', label: 'Polygon', native: 'POL' },
// // // // // ];

// // // // // const formatBalance = (value) => {
// // // // //   if (value === undefined || value === null || value === '') {
// // // // //     return '—';
// // // // //   }

// // // // //   const number = Number(value);

// // // // //   if (!Number.isFinite(number)) return String(value);

// // // // //   return number.toLocaleString('en-US', {
// // // // //     maximumFractionDigits: 8,
// // // // //   });
// // // // // };

// // // // // const getUserKey = (user) => String(user.userId ?? user._id ?? '');

// // // // // const DepositAddressMonitor = () => {
// // // // //   const [users, setUsers] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState('');
// // // // //   const [searchQuery, setSearchQuery] = useState('');
// // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // //   const [itemsPerPage, setItemsPerPage] = useState(10);

// // // // //   const [checkingUserId, setCheckingUserId] = useState('');
// // // // //   const [autoChecking, setAutoChecking] = useState(false);
// // // // //   const [checkedCount, setCheckedCount] = useState(0);
// // // // //   const [checkMessage, setCheckMessage] = useState('');

// // // // //   const autoCheckingRef = useRef(false);
// // // // //   const busyRef = useRef(false);

// // // // //   const getAuthConfig = useCallback(() => {
// // // // //     const token = localStorage.getItem('adminToken');

// // // // //     if (!token) {
// // // // //       throw new Error('Admin token nahi mila. Dobara login karein.');
// // // // //     }

// // // // //     return {
// // // // //       headers: {
// // // // //         Authorization: `Bearer ${token}`,
// // // // //       },
// // // // //       timeout: 120000,
// // // // //     };
// // // // //   }, []);

// // // // //   // Step 1: Address list load; blockchain balances abhi check nahi honge.
// // // // //   const fetchUsersWithAddresses = useCallback(async () => {
// // // // //     setLoading(true);
// // // // //     setError('');
// // // // //     setCheckMessage('');

// // // // //     try {
// // // // //       const response = await api.get(
// // // // //         '/admin/users-deposit-addresses',
// // // // //         getAuthConfig()
// // // // //       );

// // // // //       if (
// // // // //         !response.data?.success ||
// // // // //         !Array.isArray(response.data.data)
// // // // //       ) {
// // // // //         throw new Error(
// // // // //           'Deposit-address API ka response sahi nahi hai.'
// // // // //         );
// // // // //       }

// // // // //       const incomingUsers = response.data.data.map((user) => ({
// // // // //         ...user,
// // // // //         balances: Array.isArray(user.balances)
// // // // //           ? user.balances
// // // // //           : [],
// // // // //         balanceStatus: user.balanceStatus || 'not_checked',
// // // // //       }));

// // // // //       setUsers(incomingUsers);
// // // // //       setCheckedCount(
// // // // //         incomingUsers.filter(
// // // // //           (user) =>
// // // // //             Array.isArray(user.balances) &&
// // // // //             user.balances.length === NETWORKS.length
// // // // //         ).length
// // // // //       );
// // // // //     } catch (err) {
// // // // //       console.error('Failed to fetch deposit addresses:', err);

// // // // //       setError(
// // // // //         err.response?.data?.message ||
// // // // //           err.message ||
// // // // //           'Deposit addresses load nahi ho paaye.'
// // // // //       );
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   }, [getAuthConfig]);

// // // // //   useEffect(() => {
// // // // //     fetchUsersWithAddresses();

// // // // //     return () => {
// // // // //       autoCheckingRef.current = false;
// // // // //     };
// // // // //   }, [fetchUsersWithAddresses]);

// // // // //   const filteredUsers = useMemo(() => {
// // // // //     const query = searchQuery.trim().toLowerCase();

// // // // //     return users.filter((user) =>
// // // // //       String(user.userId ?? '').toLowerCase().includes(query) ||
// // // // //       String(user.name ?? '').toLowerCase().includes(query) ||
// // // // //       String(user.depositAddress ?? '').toLowerCase().includes(query)
// // // // //     );
// // // // //   }, [users, searchQuery]);

// // // // //   const sortedUsers = useMemo(
// // // // //     () =>
// // // // //       [...filteredUsers].sort((a, b) =>
// // // // //         String(b.userId ?? '').localeCompare(
// // // // //           String(a.userId ?? ''),
// // // // //           undefined,
// // // // //           { numeric: true }
// // // // //         )
// // // // //       ),
// // // // //     [filteredUsers]
// // // // //   );

// // // // //   const totalPages = Math.max(
// // // // //     1,
// // // // //     Math.ceil(sortedUsers.length / itemsPerPage)
// // // // //   );

// // // // //   const safePage = Math.min(currentPage, totalPages);
// // // // //   const startIndex = (safePage - 1) * itemsPerPage;

// // // // //   const currentItems = sortedUsers.slice(
// // // // //     startIndex,
// // // // //     startIndex + itemsPerPage
// // // // //   );

// // // // //   // Ek hi request ek waqt par chalegi.
// // // // //   const checkOneUser = useCallback(
// // // // //     async (user) => {
// // // // //       if (busyRef.current) return false;

// // // // //       const userKey = getUserKey(user);

// // // // //       if (!userKey) {
// // // // //         setError('User ID nahi mili.');
// // // // //         return false;
// // // // //       }

// // // // //       if (!user.depositAddress) {
// // // // //         setUsers((previous) =>
// // // // //           previous.map((item) =>
// // // // //             getUserKey(item) === userKey
// // // // //               ? {
// // // // //                   ...item,
// // // // //                   balances: [],
// // // // //                   balanceStatus: 'no_address',
// // // // //                 }
// // // // //               : item
// // // // //           )
// // // // //         );

// // // // //         return true;
// // // // //       }

// // // // //       busyRef.current = true;
// // // // //       setCheckingUserId(userKey);
// // // // //       setError('');
// // // // //       setCheckMessage(`Checking user ${userKey}...`);

// // // // //       // Mark this row as currently being checked.
// // // // //       setUsers((previous) =>
// // // // //         previous.map((item) =>
// // // // //           getUserKey(item) === userKey
// // // // //             ? {
// // // // //                 ...item,
// // // // //                 balanceStatus: 'checking',
// // // // //               }
// // // // //             : item
// // // // //         )
// // // // //       );

// // // // //       try {
// // // // //         const response = await api.get(
// // // // //           `/admin/check-deposit-address/${encodeURIComponent(
// // // // //             user.userId
// // // // //           )}`,
// // // // //           getAuthConfig()
// // // // //         );

// // // // //         if (!response.data?.success || !response.data?.data) {
// // // // //           throw new Error(
// // // // //             response.data?.message ||
// // // // //               'Balance-check response mein data nahi hai.'
// // // // //           );
// // // // //         }

// // // // //         const checkedUser = response.data.data;

// // // // //         setUsers((previous) =>
// // // // //           previous.map((item) =>
// // // // //             getUserKey(item) === userKey
// // // // //               ? {
// // // // //                   ...item,
// // // // //                   ...checkedUser,
// // // // //                   balances: Array.isArray(checkedUser.balances)
// // // // //                     ? checkedUser.balances
// // // // //                     : [],
// // // // //                 }
// // // // //               : item
// // // // //           )
// // // // //         );

// // // // //         setCheckedCount((previous) => previous + 1);

// // // // //         setCheckMessage(
// // // // //           `User ${userKey} check complete.`
// // // // //         );

// // // // //         return true;
// // // // //       } catch (err) {
// // // // //         console.error(
// // // // //           `Balance check failed for ${userKey}:`,
// // // // //           err
// // // // //         );

// // // // //         const message =
// // // // //           err.response?.status === 404
// // // // //             ? 'Backend route 404 hai ya user nahi mila. Route aur user ID verify karein.'
// // // // //             : err.response?.data?.message ||
// // // // //               err.message ||
// // // // //               'Balance check failed.';

// // // // //         setUsers((previous) =>
// // // // //           previous.map((item) =>
// // // // //             getUserKey(item) === userKey
// // // // //               ? {
// // // // //                   ...item,
// // // // //                   balanceStatus: 'error',
// // // // //                   checkError: message,
// // // // //                 }
// // // // //               : item
// // // // //           )
// // // // //         );

// // // // //         setCheckMessage(`User ${userKey}: check failed.`);
// // // // //         setError(message);

// // // // //         return false;
// // // // //       } finally {
// // // // //         busyRef.current = false;
// // // // //         setCheckingUserId('');
// // // // //       }
// // // // //     },
// // // // //     [getAuthConfig]
// // // // //   );

// // // // //   // Check button: only the selected user.
// // // // //   const handleCheckOne = useCallback(
// // // // //     async (user) => {
// // // // //       if (busyRef.current) return;

// // // // //       await checkOneUser(user);
// // // // //     },
// // // // //     [checkOneUser]
// // // // //   );

// // // // //   // Auto Check: one user at a time, in displayed order.
// // // // //   const startAutoCheck = useCallback(async () => {
// // // // //     if (busyRef.current || autoCheckingRef.current) return;

// // // // //     autoCheckingRef.current = true;
// // // // //     setAutoChecking(true);
// // // // //     setError('');

// // // // //     try {
// // // // //       // Snapshot the current search result order.
// // // // //       const queue = [...sortedUsers];

// // // // //       for (const user of queue) {
// // // // //         if (!autoCheckingRef.current) break;

// // // // //         const userKey = getUserKey(user);

// // // // //         // Skip addresses already successfully checked.
// // // // //         const latestUser = users.find(
// // // // //           (item) => getUserKey(item) === userKey
// // // // //         );

// // // // //         const alreadyChecked =
// // // // //           latestUser?.balanceStatus === 'success' &&
// // // // //           NETWORKS.every((network) =>
// // // // //             latestUser.balances?.some(
// // // // //               (balance) =>
// // // // //                 balance.network === network.key &&
// // // // //                 balance.status === 'success'
// // // // //             )
// // // // //           );

// // // // //         if (alreadyChecked) continue;

// // // // //         const succeeded = await checkOneUser(user);

// // // // //         // Stop after a failed user so you can inspect the error.
// // // // //         if (!succeeded) break;
// // // // //       }

// // // // //       if (autoCheckingRef.current) {
// // // // //         setCheckMessage('Auto Check queue complete.');
// // // // //       }
// // // // //     } finally {
// // // // //       autoCheckingRef.current = false;
// // // // //       setAutoChecking(false);
// // // // //     }
// // // // //   }, [sortedUsers, users, checkOneUser]);

// // // // //   const stopAutoCheck = () => {
// // // // //     autoCheckingRef.current = false;
// // // // //     setAutoChecking(false);
// // // // //     setCheckMessage(
// // // // //       'Stop requested. Current user check will finish first.'
// // // // //     );
// // // // //   };

// // // // //   const resetChecks = () => {
// // // // //     if (busyRef.current || autoCheckingRef.current) return;

// // // // //     setUsers((previous) =>
// // // // //       previous.map((user) => ({
// // // // //         ...user,
// // // // //         balances: [],
// // // // //         balanceStatus: 'not_checked',
// // // // //         checkError: '',
// // // // //       }))
// // // // //     );

// // // // //     setCheckedCount(0);
// // // // //     setError('');
// // // // //     setCheckMessage('Balances reset. Check users one at a time.');
// // // // //   };

// // // // //   const copyAddress = async (address) => {
// // // // //     try {
// // // // //       await navigator.clipboard.writeText(address);
// // // // //       setCheckMessage('Deposit address copied.');
// // // // //     } catch (err) {
// // // // //       console.error('Could not copy address:', err);
// // // // //       window.prompt('Copy this address:', address);
// // // // //     }
// // // // //   };

// // // // //   const getNetworkBalance = (user, networkKey) =>
// // // // //     (user.balances || []).find(
// // // // //       (item) => item.network === networkKey
// // // // //     );

// // // // //   const getBalanceStatus = (user) => {
// // // // //     if (user.balanceStatus === 'invalid_address') {
// // // // //       return 'Invalid address';
// // // // //     }

// // // // //     if (user.balanceStatus === 'no_address') {
// // // // //       return 'No deposit address';
// // // // //     }

// // // // //     if (user.balanceStatus === 'checking') {
// // // // //       return 'Checking...';
// // // // //     }

// // // // //     if (user.balanceStatus === 'error') {
// // // // //       return user.checkError || 'Check failed';
// // // // //     }

// // // // //     const balances = user.balances || [];

// // // // //     if (!balances.length) return 'Not checked';

// // // // //     const failed = balances.filter(
// // // // //       (item) => item.status !== 'success'
// // // // //     ).length;

// // // // //     if (failed === balances.length) return 'Check failed';
// // // // //     if (failed > 0) return 'Partially checked';

// // // // //     return 'All networks checked';
// // // // //   };

// // // // //   const usersWithAddress = users.filter(
// // // // //     (user) => Boolean(user.depositAddress)
// // // // //   ).length;

// // // // //   const fullyCheckedCount = users.filter(
// // // // //     (user) =>
// // // // //       user.balanceStatus === 'success' &&
// // // // //       NETWORKS.every((network) =>
// // // // //         user.balances?.some(
// // // // //           (balance) =>
// // // // //             balance.network === network.key &&
// // // // //             balance.status === 'success'
// // // // //         )
// // // // //       )
// // // // //   ).length;

// // // // //   return (
// // // // //     <div className="mx-auto w-full max-w-[1800px] p-4 pt-12 md:pt-16">
// // // // //       <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
// // // // //         <div>
// // // // //           <h2 className="flex items-center gap-2 text-2xl font-black uppercase tracking-wide text-slate-800">
// // // // //             <Wallet className="text-orange-500" size={28} />
// // // // //             Deposit Address Monitor
// // // // //           </h2>

// // // // //           <p className="mt-1 text-xs font-bold text-slate-500 md:text-sm">
// // // // //             ETHEREUM · BNB SMART CHAIN · POLYGON · USDT
// // // // //           </p>
// // // // //         </div>

// // // // //         <div className="flex flex-wrap gap-2">
// // // // //           <button
// // // // //             type="button"
// // // // //             onClick={fetchUsersWithAddresses}
// // // // //             disabled={loading || autoChecking || Boolean(checkingUserId)}
// // // // //             className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 disabled:opacity-50"
// // // // //           >
// // // // //             <RefreshCcw
// // // // //               size={16}
// // // // //               className={loading ? 'animate-spin' : ''}
// // // // //             />
// // // // //             Reload list
// // // // //           </button>

// // // // //           {!autoChecking ? (
// // // // //             <button
// // // // //               type="button"
// // // // //               onClick={startAutoCheck}
// // // // //               disabled={
// // // // //                 loading ||
// // // // //                 Boolean(checkingUserId) ||
// // // // //                 sortedUsers.length === 0
// // // // //               }
// // // // //               className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white hover:bg-orange-600 disabled:opacity-50"
// // // // //             >
// // // // //               <Play size={16} />
// // // // //               Auto Check
// // // // //             </button>
// // // // //           ) : (
// // // // //             <button
// // // // //               type="button"
// // // // //               onClick={stopAutoCheck}
// // // // //               className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white"
// // // // //             >
// // // // //               <Square size={16} />
// // // // //               Stop after current
// // // // //             </button>
// // // // //           )}

// // // // //           <button
// // // // //             type="button"
// // // // //             onClick={resetChecks}
// // // // //             disabled={autoChecking || Boolean(checkingUserId)}
// // // // //             className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 disabled:opacity-50"
// // // // //           >
// // // // //             <RotateCcw size={16} />
// // // // //             Reset checks
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
// // // // //         <div className="rounded-xl border border-slate-200 bg-white p-4">
// // // // //           <p className="text-xs font-bold uppercase text-slate-500">
// // // // //             Users found
// // // // //           </p>
// // // // //           <p className="mt-1 text-2xl font-black text-slate-800">
// // // // //             {filteredUsers.length}
// // // // //           </p>
// // // // //         </div>

// // // // //         <div className="rounded-xl border border-slate-200 bg-white p-4">
// // // // //           <p className="text-xs font-bold uppercase text-slate-500">
// // // // //             With deposit address
// // // // //           </p>
// // // // //           <p className="mt-1 text-2xl font-black text-slate-800">
// // // // //             {usersWithAddress}
// // // // //           </p>
// // // // //         </div>

// // // // //         <div className="rounded-xl border border-slate-200 bg-white p-4">
// // // // //           <p className="text-xs font-bold uppercase text-slate-500">
// // // // //             Fully checked
// // // // //           </p>
// // // // //           <p className="mt-1 text-2xl font-black text-emerald-700">
// // // // //             {fullyCheckedCount}
// // // // //           </p>
// // // // //           <p className="mt-1 text-xs text-slate-500">
// // // // //             All three networks successful
// // // // //           </p>
// // // // //         </div>

// // // // //         <div className="rounded-xl border border-slate-200 bg-white p-4">
// // // // //           <p className="text-xs font-bold uppercase text-slate-500">
// // // // //             Networks per address
// // // // //           </p>
// // // // //           <p className="mt-1 text-2xl font-black text-slate-800">
// // // // //             3
// // // // //           </p>
// // // // //           <p className="mt-1 text-xs text-slate-500">
// // // // //             ETH · BNB · POL
// // // // //           </p>
// // // // //         </div>
// // // // //       </div>

// // // // //       {(autoChecking || checkingUserId) && (
// // // // //         <div className="mb-5 rounded-xl border border-orange-200 bg-orange-50 p-4">
// // // // //           <div className="flex items-center gap-2 font-bold text-orange-700">
// // // // //             <RefreshCcw size={17} className="animate-spin" />
// // // // //             {checkingUserId
// // // // //               ? `Checking user ${checkingUserId}...`
// // // // //               : 'Auto Check running...'}
// // // // //           </div>
// // // // //           <p className="mt-1 text-sm text-orange-700">
// // // // //             Ek waqt par ek hi user ki request chalegi.
// // // // //           </p>
// // // // //         </div>
// // // // //       )}

// // // // //       {checkMessage && (
// // // // //         <div className="mb-4 rounded-lg bg-slate-100 p-3 text-sm font-semibold text-slate-700">
// // // // //           {checkMessage}
// // // // //         </div>
// // // // //       )}

// // // // //       <div className="relative mb-5 w-full md:max-w-xl">
// // // // //         <Search
// // // // //           size={17}
// // // // //           className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
// // // // //         />

// // // // //         <input
// // // // //           type="text"
// // // // //           value={searchQuery}
// // // // //           onChange={(event) => {
// // // // //             setSearchQuery(event.target.value);
// // // // //             setCurrentPage(1);
// // // // //           }}
// // // // //           placeholder="Search user ID, name or deposit address..."
// // // // //           className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-slate-800 outline-none focus:border-orange-500"
// // // // //         />
// // // // //       </div>

// // // // //       {error && (
// // // // //         <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
// // // // //           <AlertCircle size={18} className="mt-0.5 shrink-0" />
// // // // //           <div>
// // // // //             <p>{error}</p>
// // // // //             <button
// // // // //               type="button"
// // // // //               onClick={() => setError('')}
// // // // //               className="mt-1 underline"
// // // // //             >
// // // // //               Dismiss
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
// // // // //         <div className="overflow-x-auto">
// // // // //           <table className="w-full min-w-[1350px] text-left text-sm">
// // // // //             <thead className="border-b border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500">
// // // // //               <tr>
// // // // //                 <th className="px-4 py-4">User</th>
// // // // //                 <th className="px-4 py-4">Deposit address</th>

// // // // //                 {NETWORKS.map((network) => (
// // // // //                   <th key={network.key} className="px-4 py-4">
// // // // //                     <div>{network.label}</div>
// // // // //                     <div className="mt-1 normal-case tracking-normal">
// // // // //                       {network.native} + USDT
// // // // //                     </div>
// // // // //                   </th>
// // // // //                 ))}

// // // // //                 <th className="px-4 py-4">Status</th>
// // // // //                 <th className="px-4 py-4">Action</th>
// // // // //               </tr>
// // // // //             </thead>

// // // // //             <tbody className="divide-y divide-slate-100 text-slate-600">
// // // // //               {loading ? (
// // // // //                 <tr>
// // // // //                   <td
// // // // //                     colSpan={7}
// // // // //                     className="py-12 text-center font-bold text-orange-500"
// // // // //                   >
// // // // //                     <RefreshCcw
// // // // //                       size={18}
// // // // //                       className="mx-auto mb-2 animate-spin"
// // // // //                     />
// // // // //                     Loading user addresses...
// // // // //                   </td>
// // // // //                 </tr>
// // // // //               ) : currentItems.length === 0 ? (
// // // // //                 <tr>
// // // // //                   <td
// // // // //                     colSpan={7}
// // // // //                     className="py-12 text-center font-bold text-slate-500"
// // // // //                   >
// // // // //                     No users found.
// // // // //                   </td>
// // // // //                 </tr>
// // // // //               ) : (
// // // // //                 currentItems.map((user) => {
// // // // //                   const userKey = getUserKey(user);
// // // // //                   const isChecking = checkingUserId === userKey;

// // // // //                   return (
// // // // //                     <tr
// // // // //                       key={user._id || userKey}
// // // // //                       className="align-top hover:bg-slate-50"
// // // // //                     >
// // // // //                       <td className="px-4 py-4">
// // // // //                         <div className="font-mono font-black text-slate-800">
// // // // //                           #{user.userId ?? '—'}
// // // // //                         </div>
// // // // //                         <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
// // // // //                           <UserIcon size={12} />
// // // // //                           {user.name || 'Unknown user'}
// // // // //                         </div>
// // // // //                       </td>

// // // // //                       <td className="max-w-[250px] px-4 py-4">
// // // // //                         {user.depositAddress ? (
// // // // //                           <div className="flex items-start gap-2">
// // // // //                             <span className="break-all font-mono text-xs">
// // // // //                               {user.depositAddress}
// // // // //                             </span>
// // // // //                             <button
// // // // //                               type="button"
// // // // //                               title="Copy deposit address"
// // // // //                               onClick={() =>
// // // // //                                 copyAddress(user.depositAddress)
// // // // //                               }
// // // // //                               className="shrink-0 rounded p-1 text-slate-500 hover:bg-slate-200"
// // // // //                             >
// // // // //                               <Copy size={14} />
// // // // //                             </button>
// // // // //                           </div>
// // // // //                         ) : (
// // // // //                           <span className="text-xs text-slate-400">
// // // // //                             No address
// // // // //                           </span>
// // // // //                         )}
// // // // //                       </td>

// // // // //                       {NETWORKS.map((network) => {
// // // // //                         const result = getNetworkBalance(
// // // // //                           user,
// // // // //                           network.key
// // // // //                         );

// // // // //                         return (
// // // // //                           <td
// // // // //                             key={network.key}
// // // // //                             className="px-4 py-4"
// // // // //                           >
// // // // //                             {!result ? (
// // // // //                               <span className="text-xs text-slate-400">
// // // // //                                 {isChecking
// // // // //                                   ? 'Checking...'
// // // // //                                   : 'Not checked'}
// // // // //                               </span>
// // // // //                             ) : result.status !== 'success' ? (
// // // // //                               <div className="max-w-[190px] text-xs text-red-600">
// // // // //                                 <div className="flex items-center gap-1 font-bold">
// // // // //                                   <AlertCircle size={13} />
// // // // //                                   Check failed
// // // // //                                 </div>
// // // // //                                 <div className="mt-1 break-words text-slate-500">
// // // // //                                   {result.message ||
// // // // //                                     'Network unavailable'}
// // // // //                                 </div>
// // // // //                               </div>
// // // // //                             ) : (
// // // // //                               <div className="space-y-2">
// // // // //                                 <div>
// // // // //                                   <div className="text-[10px] font-bold uppercase text-slate-400">
// // // // //                                     {result.native?.symbol ||
// // // // //                                       network.native}
// // // // //                                   </div>
// // // // //                                   <div className="font-mono font-bold text-slate-800">
// // // // //                                     {formatBalance(
// // // // //                                       result.native?.balance
// // // // //                                     )}
// // // // //                                   </div>
// // // // //                                 </div>

// // // // //                                 <div>
// // // // //                                   <div className="text-[10px] font-bold uppercase text-slate-400">
// // // // //                                     USDT
// // // // //                                   </div>
// // // // //                                   <div className="font-mono font-bold text-emerald-700">
// // // // //                                     {formatBalance(
// // // // //                                       result.usdt?.balance
// // // // //                                     )}
// // // // //                                   </div>
// // // // //                                 </div>
// // // // //                               </div>
// // // // //                             )}
// // // // //                           </td>
// // // // //                         );
// // // // //                       })}

// // // // //                       <td className="max-w-[190px] px-4 py-4">
// // // // //                         {user.balanceStatus === 'success' ? (
// // // // //                           <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
// // // // //                             <CheckCircle size={14} />
// // // // //                             Complete
// // // // //                           </span>
// // // // //                         ) : user.balanceStatus === 'invalid_address' ? (
// // // // //                           <span className="text-xs font-bold text-red-600">
// // // // //                             Invalid address
// // // // //                           </span>
// // // // //                         ) : user.balanceStatus === 'checking' ? (
// // // // //                           <span className="text-xs font-bold text-orange-600">
// // // // //                             Checking...
// // // // //                           </span>
// // // // //                         ) : (
// // // // //                           <span className="break-words text-xs font-semibold text-amber-700">
// // // // //                             {getBalanceStatus(user)}
// // // // //                           </span>
// // // // //                         )}
// // // // //                       </td>

// // // // //                       <td className="px-4 py-4">
// // // // //                         <button
// // // // //                           type="button"
// // // // //                           onClick={() => handleCheckOne(user)}
// // // // //                           disabled={
// // // // //                             Boolean(checkingUserId) ||
// // // // //                             autoChecking ||
// // // // //                             !user.depositAddress
// // // // //                           }
// // // // //                           className="inline-flex min-w-[110px] items-center justify-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
// // // // //                         >
// // // // //                           {isChecking ? (
// // // // //                             <>
// // // // //                               <RefreshCcw
// // // // //                                 size={13}
// // // // //                                 className="animate-spin"
// // // // //                               />
// // // // //                               Checking
// // // // //                             </>
// // // // //                           ) : (
// // // // //                             <>
// // // // //                               <Search size={13} />
// // // // //                               Check
// // // // //                             </>
// // // // //                           )}
// // // // //                         </button>
// // // // //                       </td>
// // // // //                     </tr>
// // // // //                   );
// // // // //                 })
// // // // //               )}
// // // // //             </tbody>
// // // // //           </table>
// // // // //         </div>

// // // // //         {!loading && sortedUsers.length > 0 && (
// // // // //           <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
// // // // //             <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
// // // // //               <span>Rows per page:</span>

// // // // //               <select
// // // // //                 value={itemsPerPage}
// // // // //                 onChange={(event) => {
// // // // //                   setItemsPerPage(Number(event.target.value));
// // // // //                   setCurrentPage(1);
// // // // //                 }}
// // // // //                 className="rounded-lg border border-slate-200 bg-white px-2 py-1.5"
// // // // //               >
// // // // //                 {[10, 20, 50, 100].map((size) => (
// // // // //                   <option key={size} value={size}>
// // // // //                     {size}
// // // // //                   </option>
// // // // //                 ))}
// // // // //               </select>
// // // // //             </div>

// // // // //             <div className="flex items-center justify-between gap-3 text-xs font-bold text-slate-600 sm:justify-end">
// // // // //               <span>
// // // // //                 Showing {startIndex + 1}–
// // // // //                 {Math.min(
// // // // //                   startIndex + itemsPerPage,
// // // // //                   sortedUsers.length
// // // // //                 )}{' '}
// // // // //                 of {sortedUsers.length}
// // // // //               </span>

// // // // //               <button
// // // // //                 type="button"
// // // // //                 onClick={() =>
// // // // //                   setCurrentPage((page) => Math.max(1, page - 1))
// // // // //                 }
// // // // //                 disabled={safePage === 1}
// // // // //                 className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"
// // // // //               >
// // // // //                 <ChevronLeft size={16} />
// // // // //               </button>

// // // // //               <span>
// // // // //                 Page {safePage} of {totalPages}
// // // // //               </span>

// // // // //               <button
// // // // //                 type="button"
// // // // //                 onClick={() =>
// // // // //                   setCurrentPage((page) =>
// // // // //                     Math.min(totalPages, page + 1)
// // // // //                   )
// // // // //                 }
// // // // //                 disabled={safePage === totalPages}
// // // // //                 className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"
// // // // //               >
// // // // //                 <ChevronRight size={16} />
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>

// // // // //       <p className="mt-4 text-xs leading-5 text-slate-500">
// // // // //         Each user is checked separately. Ethereum, BNB Smart Chain
// // // // //         and Polygon balances are read-only. Failed network requests
// // // // //         are displayed as errors, not zero balances. No transfers
// // // // //         are initiated by this page.
// // // // //       </p>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default DepositAddressMonitor;


// // // // import React, {
// // // //   useCallback,
// // // //   useEffect,
// // // //   useMemo,
// // // //   useRef,
// // // //   useState,
// // // // } from 'react';

// // // // import api from '../../api/axios';

// // // // import {
// // // //   Search,
// // // //   RefreshCcw,
// // // //   Wallet,
// // // //   CheckCircle,
// // // //   AlertCircle,
// // // //   ChevronLeft,
// // // //   ChevronRight,
// // // //   User as UserIcon,
// // // //   Copy,
// // // //   Play,
// // // //   Square,
// // // //   RotateCcw,
// // // // } from 'lucide-react';

// // // // const NETWORKS = [
// // // //   { key: 'ethereum', label: 'Ethereum', native: 'ETH' },
// // // //   { key: 'bsc', label: 'BNB Smart Chain', native: 'BNB' },
// // // //   { key: 'polygon', label: 'Polygon', native: 'POL' },
// // // // ];

// // // // const formatBalance = (value) => {
// // // //   if (value === undefined || value === null || value === '') return '—';

// // // //   const number = Number(value);
// // // //   if (!Number.isFinite(number)) return String(value);

// // // //   return number.toLocaleString('en-US', {
// // // //     maximumFractionDigits: 8,
// // // //   });
// // // // };

// // // // const getUserKey = (user) => String(user?.userId ?? user?._id ?? '');

// // // // const isFullyChecked = (user) =>
// // // //   user?.balanceStatus === 'success' &&
// // // //   NETWORKS.every((network) =>
// // // //     user?.balances?.some(
// // // //       (balance) =>
// // // //         balance.network === network.key &&
// // // //         balance.status === 'success'
// // // //     )
// // // //   );

// // // // const DepositAddressMonitor = () => {
// // // //   const [users, setUsers] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState('');
// // // //   const [searchQuery, setSearchQuery] = useState('');
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const [itemsPerPage, setItemsPerPage] = useState(10);
// // // //   const [checkingUserId, setCheckingUserId] = useState('');
// // // //   const [autoChecking, setAutoChecking] = useState(false);
// // // //   const [checkMessage, setCheckMessage] = useState('');

// // // //   const autoCheckingRef = useRef(false);
// // // //   const busyRef = useRef(false);
// // // //   const mountedRef = useRef(true);
// // // //   const usersRef = useRef([]);

// // // //   useEffect(() => {
// // // //     usersRef.current = users;
// // // //   }, [users]);

// // // //   useEffect(() => {
// // // //     mountedRef.current = true;
// // // //     return () => {
// // // //       mountedRef.current = false;
// // // //       autoCheckingRef.current = false;
// // // //     };
// // // //   }, []);

// // // //   const getAuthConfig = useCallback(() => {
// // // //     const token = localStorage.getItem('adminToken');

// // // //     if (!token) {
// // // //       throw new Error('Admin token nahi mila. Dobara login karein.');
// // // //     }

// // // //     return {
// // // //       headers: { Authorization: `Bearer ${token}` },
// // // //       timeout: 120000,
// // // //     };
// // // //   }, []);

// // // //   const fetchUsersWithAddresses = useCallback(async () => {
// // // //     if (busyRef.current || autoCheckingRef.current) {
// // // //       setCheckMessage('Balance check chal raha hai; list reload baad mein karein.');
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     setError('');
// // // //     setCheckMessage('');

// // // //     try {
// // // //       const response = await api.get(
// // // //         '/admin/users-deposit-addresses',
// // // //         getAuthConfig()
// // // //       );

// // // //       if (
// // // //         !response.data?.success ||
// // // //         !Array.isArray(response.data.data)
// // // //       ) {
// // // //         throw new Error(
// // // //           response.data?.message ||
// // // //             'Deposit-address API ka response sahi nahi hai.'
// // // //         );
// // // //       }

// // // //       const incomingUsers = response.data.data.map((user) => ({
// // // //         ...user,
// // // //         balances: Array.isArray(user.balances) ? user.balances : [],
// // // //         balanceStatus: user.balanceStatus || 'not_checked',
// // // //         checkError: user.checkError || '',
// // // //       }));

// // // //       setUsers(incomingUsers);
// // // //     } catch (err) {
// // // //       console.error('Failed to fetch deposit addresses:', err);
// // // //       setError(
// // // //         err.response?.data?.message ||
// // // //           err.message ||
// // // //           'Deposit addresses load nahi ho paaye.'
// // // //       );
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, [getAuthConfig]);

// // // //   useEffect(() => {
// // // //     fetchUsersWithAddresses();
// // // //   }, [fetchUsersWithAddresses]);

// // // //   const filteredUsers = useMemo(() => {
// // // //     const query = searchQuery.trim().toLowerCase();

// // // //     return users.filter((user) =>
// // // //       String(user.userId ?? '').toLowerCase().includes(query) ||
// // // //       String(user.name ?? '').toLowerCase().includes(query) ||
// // // //       String(user.depositAddress ?? '').toLowerCase().includes(query)
// // // //     );
// // // //   }, [users, searchQuery]);

// // // //   const sortedUsers = useMemo(
// // // //     () =>
// // // //       [...filteredUsers].sort((a, b) =>
// // // //         String(b.userId ?? '').localeCompare(
// // // //           String(a.userId ?? ''),
// // // //           undefined,
// // // //           { numeric: true }
// // // //         )
// // // //       ),
// // // //     [filteredUsers]
// // // //   );

// // // //   const totalPages = Math.max(
// // // //     1,
// // // //     Math.ceil(sortedUsers.length / itemsPerPage)
// // // //   );
// // // //   const safePage = Math.min(currentPage, totalPages);
// // // //   const startIndex = (safePage - 1) * itemsPerPage;
// // // //   const currentItems = sortedUsers.slice(
// // // //     startIndex,
// // // //     startIndex + itemsPerPage
// // // //   );

// // // //   // Checks one user at a time. Backend response is expected as:
// // // //   // { success, user, balanceStatus, balances }
// // // //   const checkOneUser = useCallback(
// // // //     async (user) => {
// // // //       if (busyRef.current) return false;

// // // //       const userKey = getUserKey(user);
// // // //       if (!userKey) {
// // // //         setError('User ID nahi mili.');
// // // //         return false;
// // // //       }

// // // //       if (!user.depositAddress) {
// // // //         setUsers((previous) =>
// // // //           previous.map((item) =>
// // // //             getUserKey(item) === userKey
// // // //               ? {
// // // //                   ...item,
// // // //                   balances: [],
// // // //                   balanceStatus: 'no_address',
// // // //                   checkError: '',
// // // //                 }
// // // //               : item
// // // //           )
// // // //         );
// // // //         setCheckMessage(`User ${userKey}: deposit address nahi hai.`);
// // // //         return false;
// // // //       }

// // // //       busyRef.current = true;
// // // //       setCheckingUserId(userKey);
// // // //       setError('');
// // // //       setCheckMessage(`Checking user ${userKey}...`);

// // // //       setUsers((previous) =>
// // // //         previous.map((item) =>
// // // //           getUserKey(item) === userKey
// // // //             ? { ...item, balanceStatus: 'checking', checkError: '' }
// // // //             : item
// // // //         )
// // // //       );

// // // //       try {
// // // //         const response = await api.get(
// // // //           `/admin/check-deposit-address/${encodeURIComponent(
// // // //             String(user.userId)
// // // //           )}`,
// // // //           getAuthConfig()
// // // //         );

// // // //         const payload = response.data;
// // // //         // Supports both root response and a { data: ... } wrapper.
// // // //         const result = payload?.data ?? payload;
// // // //         const checkedUser = result?.user;
// // // //         const balances = result?.balances;

// // // //         if (
// // // //           !payload?.success ||
// // // //           !checkedUser ||
// // // //           !Array.isArray(balances)
// // // //         ) {
// // // //           throw new Error(
// // // //             payload?.message ||
// // // //               'API response mein user ya balances nahi mile.'
// // // //           );
// // // //         }

// // // //         const normalizedBalances = NETWORKS.map((network) => {
// // // //           const found = balances.find(
// // // //             (balance) => balance.network === network.key
// // // //           );

// // // //           if (found) return found;

// // // //           return {
// // // //             network: network.key,
// // // //             name: network.label,
// // // //             status: 'error',
// // // //             message: 'Is network ka balance response mein nahi mila.',
// // // //             native: null,
// // // //             usdt: null,
// // // //           };
// // // //         });

// // // //         const allSuccess = normalizedBalances.every(
// // // //           (balance) => balance.status === 'success'
// // // //         );
// // // //         const anySuccess = normalizedBalances.some(
// // // //           (balance) => balance.status === 'success'
// // // //         );

// // // //         const updatedUser = {
// // // //           userId: checkedUser.userId ?? user.userId,
// // // //           name: checkedUser.name ?? user.name,
// // // //           depositAddress:
// // // //             checkedUser.depositAddress ?? user.depositAddress,
// // // //           balances: normalizedBalances,
// // // //           balanceStatus:
// // // //             result.balanceStatus ||
// // // //             (allSuccess ? 'success' : anySuccess ? 'partial' : 'error'),
// // // //           checkError: '',
// // // //         };

// // // //         setUsers((previous) =>
// // // //           previous.map((item) =>
// // // //             getUserKey(item) === userKey
// // // //               ? { ...item, ...updatedUser }
// // // //               : item
// // // //           )
// // // //         );

// // // //         if (allSuccess) {
// // // //           setCheckMessage(`User ${userKey}: all networks checked successfully.`);
// // // //           return true;
// // // //         }

// // // //         const failed = normalizedBalances
// // // //           .filter((balance) => balance.status !== 'success')
// // // //           .map((balance) => balance.name || balance.network);

// // // //         setCheckMessage(
// // // //           `User ${userKey}: check incomplete. Failed: ${failed.join(', ')}.`
// // // //         );
// // // //         return false;
// // // //       } catch (err) {
// // // //         console.error(
// // // //           `Balance check failed for ${userKey}:`,
// // // //           err.response?.data || err
// // // //         );

// // // //         const message =
// // // //           err.response?.data?.message ||
// // // //           err.message ||
// // // //           'Balance check failed.';

// // // //         setUsers((previous) =>
// // // //           previous.map((item) =>
// // // //             getUserKey(item) === userKey
// // // //               ? {
// // // //                   ...item,
// // // //                   balanceStatus: 'error',
// // // //                   checkError: message,
// // // //                 }
// // // //               : item
// // // //           )
// // // //         );

// // // //         setCheckMessage(`User ${userKey}: check failed.`);
// // // //         setError(message);
// // // //         return false;
// // // //       } finally {
// // // //         busyRef.current = false;
// // // //         setCheckingUserId('');
// // // //       }
// // // //     },
// // // //     [getAuthConfig]
// // // //   );

// // // //   const handleCheckOne = useCallback(
// // // //     async (user) => {
// // // //       if (busyRef.current || autoCheckingRef.current) return;
// // // //       await checkOneUser(user);
// // // //     },
// // // //     [checkOneUser]
// // // //   );

// // // //   const startAutoCheck = useCallback(async () => {
// // // //     if (busyRef.current || autoCheckingRef.current) return;

// // // //     autoCheckingRef.current = true;
// // // //     setAutoChecking(true);
// // // //     setError('');

// // // //     try {
// // // //       // Snapshot the current displayed/search-filtered order.
// // // //       const queue = [...sortedUsers];

// // // //       for (const queuedUser of queue) {
// // // //         if (!autoCheckingRef.current) break;

// // // //         // Read the latest state so successfully checked rows can be skipped.
// // // //         const latestUser = usersRef.current.find(
// // // //           (item) => getUserKey(item) === getUserKey(queuedUser)
// // // //         );

// // // //         if (!latestUser?.depositAddress) continue;
// // // //         if (isFullyChecked(latestUser)) continue;

// // // //         const succeeded = await checkOneUser(latestUser);

// // // //         // Stop on any incomplete/failed network so the result can be inspected.
// // // //         if (!succeeded) break;
// // // //       }

// // // //       if (autoCheckingRef.current) {
// // // //         setCheckMessage('Auto Check queue complete.');
// // // //       } else {
// // // //         setCheckMessage('Auto Check stopped after the current request.');
// // // //       }
// // // //     } finally {
// // // //       autoCheckingRef.current = false;
// // // //       setAutoChecking(false);
// // // //     }
// // // //   }, [sortedUsers, checkOneUser]);

// // // //   const stopAutoCheck = () => {
// // // //     autoCheckingRef.current = false;
// // // //     setAutoChecking(false);
// // // //     setCheckMessage(
// // // //       'Stop requested. Current user check will finish first.'
// // // //     );
// // // //   };

// // // //   const resetChecks = () => {
// // // //     if (busyRef.current || autoCheckingRef.current) return;

// // // //     setUsers((previous) =>
// // // //       previous.map((user) => ({
// // // //         ...user,
// // // //         balances: [],
// // // //         balanceStatus: user.depositAddress ? 'not_checked' : 'no_address',
// // // //         checkError: '',
// // // //       }))
// // // //     );
// // // //     setError('');
// // // //     setCheckMessage('Balances reset. Check users one at a time.');
// // // //   };

// // // //   const copyAddress = async (address) => {
// // // //     try {
// // // //       await navigator.clipboard.writeText(address);
// // // //       setCheckMessage('Deposit address copied.');
// // // //     } catch (err) {
// // // //       console.error('Could not copy address:', err);
// // // //       window.prompt('Copy this address:', address);
// // // //     }
// // // //   };

// // // //   const getNetworkBalance = (user, networkKey) =>
// // // //     (user.balances || []).find((item) => item.network === networkKey);

// // // //   const getBalanceStatus = (user) => {
// // // //     if (user.balanceStatus === 'invalid_address') return 'Invalid address';
// // // //     if (user.balanceStatus === 'no_address') return 'No deposit address';
// // // //     if (user.balanceStatus === 'checking') return 'Checking...';
// // // //     if (user.balanceStatus === 'error') {
// // // //       return user.checkError || 'Check failed';
// // // //     }

// // // //     const balances = user.balances || [];
// // // //     if (!balances.length) return 'Not checked';

// // // //     const failed = balances.filter((item) => item.status !== 'success').length;
// // // //     if (failed === balances.length) return 'Check failed';
// // // //     if (failed > 0) return 'Partially checked';

// // // //     return 'All networks checked';
// // // //   };

// // // //   const usersWithAddress = users.filter(
// // // //     (user) => Boolean(user.depositAddress)
// // // //   ).length;

// // // //   const fullyCheckedCount = users.filter(isFullyChecked).length;

// // // //   return (
// // // //     <div className="mx-auto w-full max-w-[1800px] p-4 pt-12 md:pt-16">
// // // //       <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
// // // //         <div>
// // // //           <h2 className="flex items-center gap-2 text-2xl font-black uppercase tracking-wide text-slate-800">
// // // //             <Wallet className="text-orange-500" size={28} />
// // // //             Deposit Address Monitor
// // // //           </h2>
// // // //           <p className="mt-1 text-xs font-bold text-slate-500 md:text-sm">
// // // //             ETHEREUM · BNB SMART CHAIN · POLYGON · USDT
// // // //           </p>
// // // //         </div>

// // // //         <div className="flex flex-wrap gap-2">
// // // //           <button
// // // //             type="button"
// // // //             onClick={fetchUsersWithAddresses}
// // // //             disabled={loading || autoChecking || Boolean(checkingUserId)}
// // // //             className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 disabled:opacity-50"
// // // //           >
// // // //             <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
// // // //             Reload list
// // // //           </button>

// // // //           {!autoChecking ? (
// // // //             <button
// // // //               type="button"
// // // //               onClick={startAutoCheck}
// // // //               disabled={
// // // //                 loading ||
// // // //                 Boolean(checkingUserId) ||
// // // //                 sortedUsers.length === 0
// // // //               }
// // // //               className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white hover:bg-orange-600 disabled:opacity-50"
// // // //             >
// // // //               <Play size={16} />
// // // //               Auto Check
// // // //             </button>
// // // //           ) : (
// // // //             <button
// // // //               type="button"
// // // //               onClick={stopAutoCheck}
// // // //               className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white"
// // // //             >
// // // //               <Square size={16} />
// // // //               Stop after current
// // // //             </button>
// // // //           )}

// // // //           <button
// // // //             type="button"
// // // //             onClick={resetChecks}
// // // //             disabled={autoChecking || Boolean(checkingUserId)}
// // // //             className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 disabled:opacity-50"
// // // //           >
// // // //             <RotateCcw size={16} />
// // // //             Reset checks
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
// // // //         <div className="rounded-xl border border-slate-200 bg-white p-4">
// // // //           <p className="text-xs font-bold uppercase text-slate-500">Users found</p>
// // // //           <p className="mt-1 text-2xl font-black text-slate-800">
// // // //             {filteredUsers.length}
// // // //           </p>
// // // //         </div>

// // // //         <div className="rounded-xl border border-slate-200 bg-white p-4">
// // // //           <p className="text-xs font-bold uppercase text-slate-500">
// // // //             With deposit address
// // // //           </p>
// // // //           <p className="mt-1 text-2xl font-black text-slate-800">
// // // //             {usersWithAddress}
// // // //           </p>
// // // //         </div>

// // // //         <div className="rounded-xl border border-slate-200 bg-white p-4">
// // // //           <p className="text-xs font-bold uppercase text-slate-500">Fully checked</p>
// // // //           <p className="mt-1 text-2xl font-black text-emerald-700">
// // // //             {fullyCheckedCount}
// // // //           </p>
// // // //           <p className="mt-1 text-xs text-slate-500">
// // // //             All three networks successful
// // // //           </p>
// // // //         </div>

// // // //         <div className="rounded-xl border border-slate-200 bg-white p-4">
// // // //           <p className="text-xs font-bold uppercase text-slate-500">
// // // //             Networks per address
// // // //           </p>
// // // //           <p className="mt-1 text-2xl font-black text-slate-800">3</p>
// // // //           <p className="mt-1 text-xs text-slate-500">ETH · BNB · POL</p>
// // // //         </div>
// // // //       </div>

// // // //       {(autoChecking || checkingUserId) && (
// // // //         <div className="mb-5 rounded-xl border border-orange-200 bg-orange-50 p-4">
// // // //           <div className="flex items-center gap-2 font-bold text-orange-700">
// // // //             <RefreshCcw size={17} className="animate-spin" />
// // // //             {checkingUserId
// // // //               ? `Checking user ${checkingUserId}...`
// // // //               : 'Auto Check running...'}
// // // //           </div>
// // // //           <p className="mt-1 text-sm text-orange-700">
// // // //             Ek waqt par ek hi user ki request chalegi.
// // // //           </p>
// // // //         </div>
// // // //       )}

// // // //       {checkMessage && (
// // // //         <div className="mb-4 rounded-lg bg-slate-100 p-3 text-sm font-semibold text-slate-700">
// // // //           {checkMessage}
// // // //         </div>
// // // //       )}

// // // //       <div className="relative mb-5 w-full md:max-w-xl">
// // // //         <Search
// // // //           size={17}
// // // //           className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
// // // //         />
// // // //         <input
// // // //           type="text"
// // // //           value={searchQuery}
// // // //           onChange={(event) => {
// // // //             setSearchQuery(event.target.value);
// // // //             setCurrentPage(1);
// // // //           }}
// // // //           placeholder="Search user ID, name or deposit address..."
// // // //           className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-slate-800 outline-none focus:border-orange-500"
// // // //         />
// // // //       </div>

// // // //       {error && (
// // // //         <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
// // // //           <AlertCircle size={18} className="mt-0.5 shrink-0" />
// // // //           <div>
// // // //             <p>{error}</p>
// // // //             <button
// // // //               type="button"
// // // //               onClick={() => setError('')}
// // // //               className="mt-1 underline"
// // // //             >
// // // //               Dismiss
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
// // // //         <div className="overflow-x-auto">
// // // //           <table className="w-full min-w-[1350px] text-left text-sm">
// // // //             <thead className="border-b border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500">
// // // //               <tr>
// // // //                 <th className="px-4 py-4">User</th>
// // // //                 <th className="px-4 py-4">Deposit address</th>
// // // //                 {NETWORKS.map((network) => (
// // // //                   <th key={network.key} className="px-4 py-4">
// // // //                     <div>{network.label}</div>
// // // //                     <div className="mt-1 normal-case tracking-normal">
// // // //                       {network.native} + USDT
// // // //                     </div>
// // // //                   </th>
// // // //                 ))}
// // // //                 <th className="px-4 py-4">Status</th>
// // // //                 <th className="px-4 py-4">Action</th>
// // // //               </tr>
// // // //             </thead>

// // // //             <tbody className="divide-y divide-slate-100 text-slate-600">
// // // //               {loading ? (
// // // //                 <tr>
// // // //                   <td colSpan={7} className="py-12 text-center font-bold text-orange-500">
// // // //                     <RefreshCcw size={18} className="mx-auto mb-2 animate-spin" />
// // // //                     Loading user addresses...
// // // //                   </td>
// // // //                 </tr>
// // // //               ) : currentItems.length === 0 ? (
// // // //                 <tr>
// // // //                   <td colSpan={7} className="py-12 text-center font-bold text-slate-500">
// // // //                     No users found.
// // // //                   </td>
// // // //                 </tr>
// // // //               ) : (
// // // //                 currentItems.map((user) => {
// // // //                   const userKey = getUserKey(user);
// // // //                   const isChecking = checkingUserId === userKey;

// // // //                   return (
// // // //                     <tr
// // // //                       key={user._id || userKey}
// // // //                       className="align-top hover:bg-slate-50"
// // // //                     >
// // // //                       <td className="px-4 py-4">
// // // //                         <div className="font-mono font-black text-slate-800">
// // // //                           #{user.userId ?? '—'}
// // // //                         </div>
// // // //                         <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
// // // //                           <UserIcon size={12} />
// // // //                           {user.name || 'Unknown user'}
// // // //                         </div>
// // // //                       </td>

// // // //                       <td className="max-w-[250px] px-4 py-4">
// // // //                         {user.depositAddress ? (
// // // //                           <div className="flex items-start gap-2">
// // // //                             <span className="break-all font-mono text-xs">
// // // //                               {user.depositAddress}
// // // //                             </span>
// // // //                             <button
// // // //                               type="button"
// // // //                               title="Copy deposit address"
// // // //                               onClick={() => copyAddress(user.depositAddress)}
// // // //                               className="shrink-0 rounded p-1 text-slate-500 hover:bg-slate-200"
// // // //                             >
// // // //                               <Copy size={14} />
// // // //                             </button>
// // // //                           </div>
// // // //                         ) : (
// // // //                           <span className="text-xs text-slate-400">No address</span>
// // // //                         )}
// // // //                       </td>

// // // //                       {NETWORKS.map((network) => {
// // // //                         const result = getNetworkBalance(user, network.key);

// // // //                         return (
// // // //                           <td key={network.key} className="px-4 py-4">
// // // //                             {!result ? (
// // // //                               <span className="text-xs text-slate-400">
// // // //                                 {isChecking ? 'Checking...' : 'Not checked'}
// // // //                               </span>
// // // //                             ) : result.status !== 'success' ? (
// // // //                               <div className="max-w-[190px] text-xs text-red-600">
// // // //                                 <div className="flex items-center gap-1 font-bold">
// // // //                                   <AlertCircle size={13} />
// // // //                                   Check failed
// // // //                                 </div>
// // // //                                 <div className="mt-1 break-words text-slate-500">
// // // //                                   {result.message || 'Network unavailable'}
// // // //                                 </div>
// // // //                               </div>
// // // //                             ) : (
// // // //                               <div className="space-y-2">
// // // //                                 <div>
// // // //                                   <div className="text-[10px] font-bold uppercase text-slate-400">
// // // //                                     {result.native?.symbol || network.native}
// // // //                                   </div>
// // // //                                   <div className="font-mono font-bold text-slate-800">
// // // //                                     {formatBalance(result.native?.balance)}
// // // //                                   </div>
// // // //                                 </div>
// // // //                                 <div>
// // // //                                   <div className="text-[10px] font-bold uppercase text-slate-400">
// // // //                                     USDT
// // // //                                   </div>
// // // //                                   <div className="font-mono font-bold text-emerald-700">
// // // //                                     {formatBalance(result.usdt?.balance)}
// // // //                                   </div>
// // // //                                 </div>
// // // //                               </div>
// // // //                             )}
// // // //                           </td>
// // // //                         );
// // // //                       })}

// // // //                       <td className="max-w-[190px] px-4 py-4">
// // // //                         {user.balanceStatus === 'success' && isFullyChecked(user) ? (
// // // //                           <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
// // // //                             <CheckCircle size={14} />
// // // //                             Complete
// // // //                           </span>
// // // //                         ) : user.balanceStatus === 'invalid_address' ? (
// // // //                           <span className="text-xs font-bold text-red-600">
// // // //                             Invalid address
// // // //                           </span>
// // // //                         ) : user.balanceStatus === 'checking' ? (
// // // //                           <span className="text-xs font-bold text-orange-600">
// // // //                             Checking...
// // // //                           </span>
// // // //                         ) : (
// // // //                           <span className="break-words text-xs font-semibold text-amber-700">
// // // //                             {getBalanceStatus(user)}
// // // //                           </span>
// // // //                         )}
// // // //                       </td>

// // // //                       <td className="px-4 py-4">
// // // //                         <button
// // // //                           type="button"
// // // //                           onClick={() => handleCheckOne(user)}
// // // //                           disabled={
// // // //                             Boolean(checkingUserId) ||
// // // //                             autoChecking ||
// // // //                             !user.depositAddress
// // // //                           }
// // // //                           className="inline-flex min-w-[110px] items-center justify-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
// // // //                         >
// // // //                           {isChecking ? (
// // // //                             <>
// // // //                               <RefreshCcw size={13} className="animate-spin" />
// // // //                               Checking
// // // //                             </>
// // // //                           ) : (
// // // //                             <>
// // // //                               <Search size={13} />
// // // //                               Check
// // // //                             </>
// // // //                           )}
// // // //                         </button>
// // // //                       </td>
// // // //                     </tr>
// // // //                   );
// // // //                 })
// // // //               )}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>

// // // //         {!loading && sortedUsers.length > 0 && (
// // // //           <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
// // // //             <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
// // // //               <span>Rows per page:</span>
// // // //               <select
// // // //                 value={itemsPerPage}
// // // //                 onChange={(event) => {
// // // //                   setItemsPerPage(Number(event.target.value));
// // // //                   setCurrentPage(1);
// // // //                 }}
// // // //                 className="rounded-lg border border-slate-200 bg-white px-2 py-1.5"
// // // //               >
// // // //                 {[10, 20, 50, 100].map((size) => (
// // // //                   <option key={size} value={size}>{size}</option>
// // // //                 ))}
// // // //               </select>
// // // //             </div>

// // // //             <div className="flex items-center justify-between gap-3 text-xs font-bold text-slate-600 sm:justify-end">
// // // //               <span>
// // // //                 Showing {startIndex + 1}–
// // // //                 {Math.min(startIndex + itemsPerPage, sortedUsers.length)} of {sortedUsers.length}
// // // //               </span>
// // // //               <button
// // // //                 type="button"
// // // //                 onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
// // // //                 disabled={safePage === 1}
// // // //                 className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"
// // // //               >
// // // //                 <ChevronLeft size={16} />
// // // //               </button>
// // // //               <span>Page {safePage} of {totalPages}</span>
// // // //               <button
// // // //                 type="button"
// // // //                 onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
// // // //                 disabled={safePage === totalPages}
// // // //                 className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"
// // // //               >
// // // //                 <ChevronRight size={16} />
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       <p className="mt-4 text-xs leading-5 text-slate-500">
// // // //         Each user is checked separately. Ethereum, BNB Smart Chain and Polygon
// // // //         balances are read-only. Failed network requests are displayed as errors,
// // // //         not zero balances. No transfers are initiated by this page.
// // // //       </p>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DepositAddressMonitor;



// // // import React, {
// // //   useCallback,
// // //   useEffect,
// // //   useMemo,
// // //   useRef,
// // //   useState,
// // // } from 'react';

// // // import api from '../../api/axios';

// // // import {
// // //   Search,
// // //   RefreshCcw,
// // //   Wallet,
// // //   CheckCircle,
// // //   AlertCircle,
// // //   ChevronLeft,
// // //   ChevronRight,
// // //   User as UserIcon,
// // //   Copy,
// // //   Play,
// // //   Square,
// // //   RotateCcw,
// // // } from 'lucide-react';

// // // const NETWORKS = [
// // //   { key: 'ethereum', label: 'Ethereum', native: 'ETH' },
// // //   { key: 'bsc', label: 'BNB Smart Chain', native: 'BNB' },
// // //   { key: 'polygon', label: 'Polygon', native: 'POL' },
// // // ];

// // // const formatBalance = (value) => {
// // //   if (value === undefined || value === null || value === '') return '—';

// // //   const number = Number(value);
// // //   if (!Number.isFinite(number)) return String(value);

// // //   return number.toLocaleString('en-US', {
// // //     maximumFractionDigits: 8,
// // //   });
// // // };

// // // const getUserKey = (user) => String(user?.userId ?? user?._id ?? '');

// // // const isSameUser = (item, userKey, userId, mongoId) =>
// // //   getUserKey(item) === userKey ||
// // //   (userId != null && String(item?.userId) === String(userId)) ||
// // //   (mongoId != null && String(item?._id) === String(mongoId));

// // // const isFullyChecked = (user) =>
// // //   user?.balanceStatus === 'success' &&
// // //   NETWORKS.every((network) =>
// // //     user?.balances?.some(
// // //       (balance) =>
// // //         balance.network === network.key &&
// // //         balance.status === 'success'
// // //     )
// // //   );

// // // const DepositAddressMonitor = () => {
// // //   const [users, setUsers] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState('');
// // //   const [searchQuery, setSearchQuery] = useState('');
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [itemsPerPage, setItemsPerPage] = useState(10);
// // //   const [checkingUserId, setCheckingUserId] = useState('');
// // //   const [autoChecking, setAutoChecking] = useState(false);
// // //   const [checkMessage, setCheckMessage] = useState('');

// // //   const autoCheckingRef = useRef(false);
// // //   const busyRef = useRef(false);
// // //   const mountedRef = useRef(true);
// // //   const usersRef = useRef([]);

// // //   useEffect(() => {
// // //     usersRef.current = users;
// // //   }, [users]);

// // //   useEffect(() => {
// // //     mountedRef.current = true;
// // //     return () => {
// // //       mountedRef.current = false;
// // //       autoCheckingRef.current = false;
// // //     };
// // //   }, []);

// // //   const getAuthConfig = useCallback(() => {
// // //     const token = localStorage.getItem('adminToken');

// // //     if (!token) {
// // //       throw new Error('Admin token nahi mila. Dobara login karein.');
// // //     }

// // //     return {
// // //       headers: { Authorization: `Bearer ${token}` },
// // //       timeout: 120000,
// // //     };
// // //   }, []);

// // //   const fetchUsersWithAddresses = useCallback(async () => {
// // //     if (busyRef.current || autoCheckingRef.current) {
// // //       setCheckMessage('Balance check chal raha hai; list reload baad mein karein.');
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setError('');
// // //     setCheckMessage('');

// // //     try {
// // //       const response = await api.get(
// // //         '/admin/users-deposit-addresses',
// // //         getAuthConfig()
// // //       );

// // //       if (
// // //         !response.data?.success ||
// // //         !Array.isArray(response.data.data)
// // //       ) {
// // //         throw new Error(
// // //           response.data?.message ||
// // //             'Deposit-address API ka response sahi nahi hai.'
// // //         );
// // //       }

// // //       const incomingUsers = response.data.data.map((user) => ({
// // //         ...user,
// // //         balances: Array.isArray(user.balances) ? user.balances : [],
// // //         balanceStatus: user.balanceStatus || 'not_checked',
// // //         checkError: user.checkError || '',
// // //       }));

// // //       setUsers(incomingUsers);
// // //     } catch (err) {
// // //       console.error('Failed to fetch deposit addresses:', err);
// // //       setError(
// // //         err.response?.data?.message ||
// // //           err.message ||
// // //           'Deposit addresses load nahi ho paaye.'
// // //       );
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, [getAuthConfig]);

// // //   useEffect(() => {
// // //     fetchUsersWithAddresses();
// // //   }, [fetchUsersWithAddresses]);

// // //   const filteredUsers = useMemo(() => {
// // //     const query = searchQuery.trim().toLowerCase();

// // //     return users.filter((user) =>
// // //       String(user.userId ?? '').toLowerCase().includes(query) ||
// // //       String(user.name ?? '').toLowerCase().includes(query) ||
// // //       String(user.depositAddress ?? '').toLowerCase().includes(query)
// // //     );
// // //   }, [users, searchQuery]);

// // //   const sortedUsers = useMemo(
// // //     () =>
// // //       [...filteredUsers].sort((a, b) =>
// // //         String(b.userId ?? '').localeCompare(
// // //           String(a.userId ?? ''),
// // //           undefined,
// // //           { numeric: true }
// // //         )
// // //       ),
// // //     [filteredUsers]
// // //   );

// // //   const totalPages = Math.max(
// // //     1,
// // //     Math.ceil(sortedUsers.length / itemsPerPage)
// // //   );
// // //   const safePage = Math.min(currentPage, totalPages);
// // //   const startIndex = (safePage - 1) * itemsPerPage;
// // //   const currentItems = sortedUsers.slice(
// // //     startIndex,
// // //     startIndex + itemsPerPage
// // //   );

// // //   // Checks one user at a time. Backend response is expected as:
// // //   // { success, user, balanceStatus, balances }
// // //   const checkOneUser = useCallback(
// // //     async (user) => {
// // //       if (busyRef.current) return false;

// // //       const userKey = getUserKey(user);
// // //       if (user.userId === undefined || user.userId === null || String(user.userId).trim() === '') {
// // //         setError('Is user ka userId nahi mila; balance endpoint ko userId chahiye.');
// // //         return false;
// // //       }

// // //       if (!userKey) {
// // //         setError('User ID nahi mili.');
// // //         return false;
// // //       }

// // //       if (!user.depositAddress) {
// // //         setUsers((previous) =>
// // //           previous.map((item) =>
// // //             getUserKey(item) === userKey
// // //               ? {
// // //                   ...item,
// // //                   balances: [],
// // //                   balanceStatus: 'no_address',
// // //                   checkError: '',
// // //                 }
// // //               : item
// // //           )
// // //         );
// // //         setCheckMessage(`User ${userKey}: deposit address nahi hai.`);
// // //         return false;
// // //       }

// // //       busyRef.current = true;
// // //       setCheckingUserId(userKey);
// // //       setError('');
// // //       setCheckMessage(`Checking user ${userKey}...`);

// // //       setUsers((previous) =>
// // //         previous.map((item) =>
// // //           getUserKey(item) === userKey
// // //             ? { ...item, balanceStatus: 'checking', checkError: '' }
// // //             : item
// // //         )
// // //       );

// // //       try {
// // //         const response = await api.get(
// // //           `/admin/check-deposit-address/${encodeURIComponent(
// // //             String(user.userId)
// // //           )}`,
// // //           getAuthConfig()
// // //         );

// // //         const payload = response.data;
// // //         // Supports both root response and a { data: ... } wrapper.
// // //         const result = payload?.data ?? payload;
// // //         const checkedUser = result?.user;
// // //         const balances = result?.balances;

// // //         if (
// // //           !payload?.success ||
// // //           !checkedUser ||
// // //           !Array.isArray(balances)
// // //         ) {
// // //           throw new Error(
// // //             payload?.message ||
// // //               'API response mein user ya balances nahi mile.'
// // //           );
// // //         }

// // //         const normalizedBalances = NETWORKS.map((network) => {
// // //           const found = balances.find(
// // //             (balance) => balance.network === network.key
// // //           );

// // //           if (found) return found;

// // //           return {
// // //             network: network.key,
// // //             name: network.label,
// // //             status: 'error',
// // //             message: 'Is network ka balance response mein nahi mila.',
// // //             native: null,
// // //             usdt: null,
// // //           };
// // //         });

// // //         const allSuccess = normalizedBalances.every(
// // //           (balance) => balance.status === 'success'
// // //         );
// // //         const anySuccess = normalizedBalances.some(
// // //           (balance) => balance.status === 'success'
// // //         );

// // //         const updatedUser = {
// // //           userId: checkedUser.userId ?? user.userId,
// // //           name: checkedUser.name ?? user.name,
// // //           depositAddress:
// // //             checkedUser.depositAddress ?? user.depositAddress,
// // //           balances: normalizedBalances,
// // //           balanceStatus:
// // //             result.balanceStatus ||
// // //             (allSuccess ? 'success' : anySuccess ? 'partial' : 'error'),
// // //           checkError: '',
// // //         };

// // //         setUsers((previous) =>
// // //           previous.map((item) =>
// // //             isSameUser(
// // //               item,
// // //               userKey,
// // //               updatedUser.userId,
// // //               user._id
// // //             )
// // //               ? { ...item, ...updatedUser }
// // //               : item
// // //           )
// // //         );

// // //         if (allSuccess) {
// // //           setCheckMessage(`User ${userKey}: all networks checked successfully.`);
// // //           return true;
// // //         }

// // //         const failed = normalizedBalances
// // //           .filter((balance) => balance.status !== 'success')
// // //           .map((balance) => balance.name || balance.network);

// // //         setCheckMessage(
// // //           `User ${userKey}: check incomplete. Failed: ${failed.join(', ')}.`
// // //         );
// // //         return false;
// // //       } catch (err) {
// // //         console.error(
// // //           `Balance check failed for ${userKey}:`,
// // //           err.response?.data || err
// // //         );

// // //         const message =
// // //           err.response?.data?.message ||
// // //           err.message ||
// // //           'Balance check failed.';

// // //         setUsers((previous) =>
// // //           previous.map((item) =>
// // //             getUserKey(item) === userKey
// // //               ? {
// // //                   ...item,
// // //                   balanceStatus: 'error',
// // //                   checkError: message,
// // //                 }
// // //               : item
// // //           )
// // //         );

// // //         setCheckMessage(`User ${userKey}: check failed.`);
// // //         setError(message);
// // //         return false;
// // //       } finally {
// // //         busyRef.current = false;
// // //         setCheckingUserId('');
// // //       }
// // //     },
// // //     [getAuthConfig]
// // //   );

// // //   const handleCheckOne = useCallback(
// // //     async (user) => {
// // //       if (busyRef.current || autoCheckingRef.current) return;
// // //       await checkOneUser(user);
// // //     },
// // //     [checkOneUser]
// // //   );

// // //   const startAutoCheck = useCallback(async () => {
// // //     if (busyRef.current || autoCheckingRef.current) return;

// // //     autoCheckingRef.current = true;
// // //     setAutoChecking(true);
// // //     setError('');

// // //     try {
// // //       // Snapshot the current displayed/search-filtered order.
// // //       const queue = [...sortedUsers];

// // //       for (const queuedUser of queue) {
// // //         if (!autoCheckingRef.current) break;

// // //         // Read the latest state so successfully checked rows can be skipped.
// // //         const latestUser = usersRef.current.find(
// // //           (item) => getUserKey(item) === getUserKey(queuedUser)
// // //         );

// // //         if (!latestUser?.depositAddress) continue;
// // //         if (isFullyChecked(latestUser)) continue;

// // //         const succeeded = await checkOneUser(latestUser);

// // //         // Stop on any incomplete/failed network so the result can be inspected.
// // //         if (!succeeded) break;
// // //       }

// // //       if (autoCheckingRef.current) {
// // //         setCheckMessage('Auto Check queue complete.');
// // //       } else {
// // //         setCheckMessage('Auto Check stopped after the current request.');
// // //       }
// // //     } finally {
// // //       autoCheckingRef.current = false;
// // //       setAutoChecking(false);
// // //     }
// // //   }, [sortedUsers, checkOneUser]);

// // //   const stopAutoCheck = () => {
// // //     autoCheckingRef.current = false;
// // //     setAutoChecking(false);
// // //     setCheckMessage(
// // //       'Stop requested. Current user check will finish first.'
// // //     );
// // //   };

// // //   const resetChecks = () => {
// // //     if (busyRef.current || autoCheckingRef.current) return;

// // //     setUsers((previous) =>
// // //       previous.map((user) => ({
// // //         ...user,
// // //         balances: [],
// // //         balanceStatus: user.depositAddress ? 'not_checked' : 'no_address',
// // //         checkError: '',
// // //       }))
// // //     );
// // //     setError('');
// // //     setCheckMessage('Balances reset. Check users one at a time.');
// // //   };

// // //   const copyAddress = async (address) => {
// // //     try {
// // //       await navigator.clipboard.writeText(address);
// // //       setCheckMessage('Deposit address copied.');
// // //     } catch (err) {
// // //       console.error('Could not copy address:', err);
// // //       window.prompt('Copy this address:', address);
// // //     }
// // //   };

// // //   const getNetworkBalance = (user, networkKey) =>
// // //     (user.balances || []).find((item) => item.network === networkKey);

// // //   const getBalanceStatus = (user) => {
// // //     if (user.balanceStatus === 'invalid_address') return 'Invalid address';
// // //     if (user.balanceStatus === 'no_address') return 'No deposit address';
// // //     if (user.balanceStatus === 'checking') return 'Checking...';
// // //     if (user.balanceStatus === 'error') {
// // //       return user.checkError || 'Check failed';
// // //     }

// // //     const balances = user.balances || [];
// // //     if (!balances.length) return 'Not checked';

// // //     const failed = balances.filter((item) => item.status !== 'success').length;
// // //     if (failed === balances.length) return 'Check failed';
// // //     if (failed > 0) return 'Partially checked';

// // //     return 'All networks checked';
// // //   };

// // //   const usersWithAddress = users.filter(
// // //     (user) => Boolean(user.depositAddress)
// // //   ).length;

// // //   const fullyCheckedCount = users.filter(isFullyChecked).length;

// // //   return (
// // //     <div className="mx-auto w-full max-w-[1800px] p-4 pt-12 md:pt-16">
// // //       <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
// // //         <div>
// // //           <h2 className="flex items-center gap-2 text-2xl font-black uppercase tracking-wide text-slate-800">
// // //             <Wallet className="text-orange-500" size={28} />
// // //             Deposit Address Monitor
// // //           </h2>
// // //           <p className="mt-1 text-xs font-bold text-slate-500 md:text-sm">
// // //             ETHEREUM · BNB SMART CHAIN · POLYGON · USDT
// // //           </p>
// // //         </div>

// // //         <div className="flex flex-wrap gap-2">
// // //           <button
// // //             type="button"
// // //             onClick={fetchUsersWithAddresses}
// // //             disabled={loading || autoChecking || Boolean(checkingUserId)}
// // //             className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 disabled:opacity-50"
// // //           >
// // //             <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
// // //             Reload list
// // //           </button>

// // //           {!autoChecking ? (
// // //             <button
// // //               type="button"
// // //               onClick={startAutoCheck}
// // //               disabled={
// // //                 loading ||
// // //                 Boolean(checkingUserId) ||
// // //                 sortedUsers.length === 0
// // //               }
// // //               className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white hover:bg-orange-600 disabled:opacity-50"
// // //             >
// // //               <Play size={16} />
// // //               Auto Check
// // //             </button>
// // //           ) : (
// // //             <button
// // //               type="button"
// // //               onClick={stopAutoCheck}
// // //               className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white"
// // //             >
// // //               <Square size={16} />
// // //               Stop after current
// // //             </button>
// // //           )}

// // //           <button
// // //             type="button"
// // //             onClick={resetChecks}
// // //             disabled={autoChecking || Boolean(checkingUserId)}
// // //             className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 disabled:opacity-50"
// // //           >
// // //             <RotateCcw size={16} />
// // //             Reset checks
// // //           </button>
// // //         </div>
// // //       </div>

// // //       <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
// // //         <div className="rounded-xl border border-slate-200 bg-white p-4">
// // //           <p className="text-xs font-bold uppercase text-slate-500">Users found</p>
// // //           <p className="mt-1 text-2xl font-black text-slate-800">
// // //             {filteredUsers.length}
// // //           </p>
// // //         </div>

// // //         <div className="rounded-xl border border-slate-200 bg-white p-4">
// // //           <p className="text-xs font-bold uppercase text-slate-500">
// // //             With deposit address
// // //           </p>
// // //           <p className="mt-1 text-2xl font-black text-slate-800">
// // //             {usersWithAddress}
// // //           </p>
// // //         </div>

// // //         <div className="rounded-xl border border-slate-200 bg-white p-4">
// // //           <p className="text-xs font-bold uppercase text-slate-500">Fully checked</p>
// // //           <p className="mt-1 text-2xl font-black text-emerald-700">
// // //             {fullyCheckedCount}
// // //           </p>
// // //           <p className="mt-1 text-xs text-slate-500">
// // //             All three networks successful
// // //           </p>
// // //         </div>

// // //         <div className="rounded-xl border border-slate-200 bg-white p-4">
// // //           <p className="text-xs font-bold uppercase text-slate-500">
// // //             Networks per address
// // //           </p>
// // //           <p className="mt-1 text-2xl font-black text-slate-800">3</p>
// // //           <p className="mt-1 text-xs text-slate-500">ETH · BNB · POL</p>
// // //         </div>
// // //       </div>

// // //       {(autoChecking || checkingUserId) && (
// // //         <div className="mb-5 rounded-xl border border-orange-200 bg-orange-50 p-4">
// // //           <div className="flex items-center gap-2 font-bold text-orange-700">
// // //             <RefreshCcw size={17} className="animate-spin" />
// // //             {checkingUserId
// // //               ? `Checking user ${checkingUserId}...`
// // //               : 'Auto Check running...'}
// // //           </div>
// // //           <p className="mt-1 text-sm text-orange-700">
// // //             Ek waqt par ek hi user ki request chalegi.
// // //           </p>
// // //         </div>
// // //       )}

// // //       {checkMessage && (
// // //         <div className="mb-4 rounded-lg bg-slate-100 p-3 text-sm font-semibold text-slate-700">
// // //           {checkMessage}
// // //         </div>
// // //       )}

// // //       <div className="relative mb-5 w-full md:max-w-xl">
// // //         <Search
// // //           size={17}
// // //           className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
// // //         />
// // //         <input
// // //           type="text"
// // //           value={searchQuery}
// // //           onChange={(event) => {
// // //             setSearchQuery(event.target.value);
// // //             setCurrentPage(1);
// // //           }}
// // //           placeholder="Search user ID, name or deposit address..."
// // //           className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-slate-800 outline-none focus:border-orange-500"
// // //         />
// // //       </div>

// // //       {error && (
// // //         <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
// // //           <AlertCircle size={18} className="mt-0.5 shrink-0" />
// // //           <div>
// // //             <p>{error}</p>
// // //             <button
// // //               type="button"
// // //               onClick={() => setError('')}
// // //               className="mt-1 underline"
// // //             >
// // //               Dismiss
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full min-w-[1350px] text-left text-sm">
// // //             <thead className="border-b border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500">
// // //               <tr>
// // //                 <th className="px-4 py-4">User</th>
// // //                 <th className="px-4 py-4">Deposit address</th>
// // //                 {NETWORKS.map((network) => (
// // //                   <th key={network.key} className="px-4 py-4">
// // //                     <div>{network.label}</div>
// // //                     <div className="mt-1 normal-case tracking-normal">
// // //                       {network.native} + USDT
// // //                     </div>
// // //                   </th>
// // //                 ))}
// // //                 <th className="px-4 py-4">Status</th>
// // //                 <th className="px-4 py-4">Action</th>
// // //               </tr>
// // //             </thead>

// // //             <tbody className="divide-y divide-slate-100 text-slate-600">
// // //               {loading ? (
// // //                 <tr>
// // //                   <td colSpan={7} className="py-12 text-center font-bold text-orange-500">
// // //                     <RefreshCcw size={18} className="mx-auto mb-2 animate-spin" />
// // //                     Loading user addresses...
// // //                   </td>
// // //                 </tr>
// // //               ) : currentItems.length === 0 ? (
// // //                 <tr>
// // //                   <td colSpan={7} className="py-12 text-center font-bold text-slate-500">
// // //                     No users found.
// // //                   </td>
// // //                 </tr>
// // //               ) : (
// // //                 currentItems.map((user) => {
// // //                   const userKey = getUserKey(user);
// // //                   const isChecking = checkingUserId === userKey;

// // //                   return (
// // //                     <tr
// // //                       key={user._id || userKey}
// // //                       className="align-top hover:bg-slate-50"
// // //                     >
// // //                       <td className="px-4 py-4">
// // //                         <div className="font-mono font-black text-slate-800">
// // //                           #{user.userId ?? '—'}
// // //                         </div>
// // //                         <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
// // //                           <UserIcon size={12} />
// // //                           {user.name || 'Unknown user'}
// // //                         </div>
// // //                       </td>

// // //                       <td className="max-w-[250px] px-4 py-4">
// // //                         {user.depositAddress ? (
// // //                           <div className="flex items-start gap-2">
// // //                             <span className="break-all font-mono text-xs">
// // //                               {user.depositAddress}
// // //                             </span>
// // //                             <button
// // //                               type="button"
// // //                               title="Copy deposit address"
// // //                               onClick={() => copyAddress(user.depositAddress)}
// // //                               className="shrink-0 rounded p-1 text-slate-500 hover:bg-slate-200"
// // //                             >
// // //                               <Copy size={14} />
// // //                             </button>
// // //                           </div>
// // //                         ) : (
// // //                           <span className="text-xs text-slate-400">No address</span>
// // //                         )}
// // //                       </td>

// // //                       {NETWORKS.map((network) => {
// // //                         const result = getNetworkBalance(user, network.key);

// // //                         return (
// // //                           <td key={network.key} className="px-4 py-4">
// // //                             {!result ? (
// // //                               <span className="text-xs text-slate-400">
// // //                                 {isChecking ? 'Checking...' : 'Not checked'}
// // //                               </span>
// // //                             ) : result.status !== 'success' ? (
// // //                               <div className="max-w-[190px] text-xs text-red-600">
// // //                                 <div className="flex items-center gap-1 font-bold">
// // //                                   <AlertCircle size={13} />
// // //                                   Check failed
// // //                                 </div>
// // //                                 <div className="mt-1 break-words text-slate-500">
// // //                                   {result.message || 'Network unavailable'}
// // //                                 </div>
// // //                               </div>
// // //                             ) : (
// // //                               <div className="space-y-2">
// // //                                 <div>
// // //                                   <div className="text-[10px] font-bold uppercase text-slate-400">
// // //                                     {result.native?.symbol || network.native}
// // //                                   </div>
// // //                                   <div className="font-mono font-bold text-slate-800">
// // //                                     {formatBalance(result.native?.balance)}
// // //                                   </div>
// // //                                 </div>
// // //                                 <div>
// // //                                   <div className="text-[10px] font-bold uppercase text-slate-400">
// // //                                     USDT
// // //                                   </div>
// // //                                   <div className="font-mono font-bold text-emerald-700">
// // //                                     {formatBalance(result.usdt?.balance)}
// // //                                   </div>
// // //                                 </div>
// // //                               </div>
// // //                             )}
// // //                           </td>
// // //                         );
// // //                       })}

// // //                       <td className="max-w-[190px] px-4 py-4">
// // //                         {user.balanceStatus === 'success' && isFullyChecked(user) ? (
// // //                           <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
// // //                             <CheckCircle size={14} />
// // //                             Complete
// // //                           </span>
// // //                         ) : user.balanceStatus === 'invalid_address' ? (
// // //                           <span className="text-xs font-bold text-red-600">
// // //                             Invalid address
// // //                           </span>
// // //                         ) : user.balanceStatus === 'checking' ? (
// // //                           <span className="text-xs font-bold text-orange-600">
// // //                             Checking...
// // //                           </span>
// // //                         ) : (
// // //                           <span className="break-words text-xs font-semibold text-amber-700">
// // //                             {getBalanceStatus(user)}
// // //                           </span>
// // //                         )}
// // //                       </td>

// // //                       <td className="px-4 py-4">
// // //                         <button
// // //                           type="button"
// // //                           onClick={() => handleCheckOne(user)}
// // //                           disabled={
// // //                             Boolean(checkingUserId) ||
// // //                             autoChecking ||
// // //                             !user.depositAddress
// // //                           }
// // //                           className="inline-flex min-w-[110px] items-center justify-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
// // //                         >
// // //                           {isChecking ? (
// // //                             <>
// // //                               <RefreshCcw size={13} className="animate-spin" />
// // //                               Checking
// // //                             </>
// // //                           ) : (
// // //                             <>
// // //                               <Search size={13} />
// // //                               Check
// // //                             </>
// // //                           )}
// // //                         </button>
// // //                       </td>
// // //                     </tr>
// // //                   );
// // //                 })
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         {!loading && sortedUsers.length > 0 && (
// // //           <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
// // //             <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
// // //               <span>Rows per page:</span>
// // //               <select
// // //                 value={itemsPerPage}
// // //                 onChange={(event) => {
// // //                   setItemsPerPage(Number(event.target.value));
// // //                   setCurrentPage(1);
// // //                 }}
// // //                 className="rounded-lg border border-slate-200 bg-white px-2 py-1.5"
// // //               >
// // //                 {[10, 20, 50, 100].map((size) => (
// // //                   <option key={size} value={size}>{size}</option>
// // //                 ))}
// // //               </select>
// // //             </div>

// // //             <div className="flex items-center justify-between gap-3 text-xs font-bold text-slate-600 sm:justify-end">
// // //               <span>
// // //                 Showing {startIndex + 1}–
// // //                 {Math.min(startIndex + itemsPerPage, sortedUsers.length)} of {sortedUsers.length}
// // //               </span>
// // //               <button
// // //                 type="button"
// // //                 onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
// // //                 disabled={safePage === 1}
// // //                 className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"
// // //               >
// // //                 <ChevronLeft size={16} />
// // //               </button>
// // //               <span>Page {safePage} of {totalPages}</span>
// // //               <button
// // //                 type="button"
// // //                 onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
// // //                 disabled={safePage === totalPages}
// // //                 className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"
// // //               >
// // //                 <ChevronRight size={16} />
// // //               </button>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>

// // //       <p className="mt-4 text-xs leading-5 text-slate-500">
// // //         Each user is checked separately. Ethereum, BNB Smart Chain and Polygon
// // //         balances are read-only. Failed network requests are displayed as errors,
// // //         not zero balances. No transfers are initiated by this page.
// // //       </p>
// // //     </div>
// // //   );
// // // };

// // // export default DepositAddressMonitor;


// // import React, {
// //   useCallback,
// //   useEffect,
// //   useMemo,
// //   useRef,
// //   useState,
// // } from 'react';

// // import api from '../../api/axios';

// // import {
// //   Search,
// //   RefreshCcw,
// //   Wallet,
// //   CheckCircle,
// //   AlertCircle,
// //   ChevronLeft,
// //   ChevronRight,
// //   User as UserIcon,
// //   Copy,
// //   Play,
// //   Square,
// //   RotateCcw,
// // } from 'lucide-react';

// // const NETWORKS = [
// //   { key: 'ethereum', label: 'Ethereum', native: 'ETH' },
// //   { key: 'bsc', label: 'BNB Smart Chain', native: 'BNB' },
// //   { key: 'polygon', label: 'Polygon', native: 'POL' },
// // ];

// // const formatBalance = (value) => {
// //   if (value === undefined || value === null || value === '') return '—';

// //   const number = Number(value);
// //   if (!Number.isFinite(number)) return String(value);

// //   return number.toLocaleString('en-US', {
// //     maximumFractionDigits: 8,
// //   });
// // };

// // const getUserKey = (user) => String(user?.userId ?? user?._id ?? '');

// // const isSameUser = (item, userKey, userId, mongoId) =>
// //   getUserKey(item) === userKey ||
// //   (userId != null && String(item?.userId) === String(userId)) ||
// //   (mongoId != null && String(item?._id) === String(mongoId));

// // const isFullyChecked = (user) =>
// //   user?.balanceStatus === 'success' &&
// //   NETWORKS.every((network) =>
// //     user?.balances?.some(
// //       (balance) =>
// //         balance.network === network.key &&
// //         balance.status === 'success'
// //     )
// //   );

// // // Sort by the sum of returned numeric coin quantities.
// // // Note: ETH/BNB/POL/USDT are different assets, so this is not a USD valuation.
// // const getTotalBalance = (user) =>
// //   (Array.isArray(user?.balances) ? user.balances : []).reduce(
// //     (total, network) => {
// //       if (network?.status !== 'success') return total;

// //       const native = Number(network?.native?.balance ?? 0);
// //       const usdt = Number(network?.usdt?.balance ?? 0);

// //       return total + (Number.isFinite(native) ? native : 0) +
// //         (Number.isFinite(usdt) ? usdt : 0);
// //     },
// //     0
// //   );

// // const hasAnyCheckedBalance = (user) =>
// //   Array.isArray(user?.balances) &&
// //   user.balances.some((balance) => balance?.status === 'success');

// // const DepositAddressMonitor = () => {
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [itemsPerPage, setItemsPerPage] = useState(10);
// //   const [checkingUserId, setCheckingUserId] = useState('');
// //   const [autoChecking, setAutoChecking] = useState(false);
// //   const [checkMessage, setCheckMessage] = useState('');

// //   const autoCheckingRef = useRef(false);
// //   const busyRef = useRef(false);
// //   const mountedRef = useRef(true);
// //   const usersRef = useRef([]);

// //   useEffect(() => {
// //     usersRef.current = users;
// //   }, [users]);

// //   useEffect(() => {
// //     mountedRef.current = true;
// //     return () => {
// //       mountedRef.current = false;
// //       autoCheckingRef.current = false;
// //     };
// //   }, []);

// //   const getAuthConfig = useCallback(() => {
// //     const token = localStorage.getItem('adminToken');

// //     if (!token) {
// //       throw new Error('Admin token nahi mila. Dobara login karein.');
// //     }

// //     return {
// //       headers: { Authorization: `Bearer ${token}` },
// //       timeout: 120000,
// //     };
// //   }, []);

// //   const fetchUsersWithAddresses = useCallback(async () => {
// //     if (busyRef.current || autoCheckingRef.current) {
// //       setCheckMessage('Balance check chal raha hai; list reload baad mein karein.');
// //       return;
// //     }

// //     setLoading(true);
// //     setError('');
// //     setCheckMessage('');

// //     try {
// //       const response = await api.get(
// //         '/admin/users-deposit-addresses',
// //         getAuthConfig()
// //       );

// //       if (
// //         !response.data?.success ||
// //         !Array.isArray(response.data.data)
// //       ) {
// //         throw new Error(
// //           response.data?.message ||
// //             'Deposit-address API ka response sahi nahi hai.'
// //         );
// //       }

// //       const incomingUsers = response.data.data.map((user) => ({
// //         ...user,
// //         balances: Array.isArray(user.balances) ? user.balances : [],
// //         balanceStatus: user.balanceStatus || 'not_checked',
// //         checkError: user.checkError || '',
// //       }));

// //       setUsers(incomingUsers);
// //     } catch (err) {
// //       console.error('Failed to fetch deposit addresses:', err);
// //       setError(
// //         err.response?.data?.message ||
// //           err.message ||
// //           'Deposit addresses load nahi ho paaye.'
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [getAuthConfig]);

// //   useEffect(() => {
// //     fetchUsersWithAddresses();
// //   }, [fetchUsersWithAddresses]);

// //   const filteredUsers = useMemo(() => {
// //     const query = searchQuery.trim().toLowerCase();

// //     return users.filter((user) =>
// //       String(user.userId ?? '').toLowerCase().includes(query) ||
// //       String(user.name ?? '').toLowerCase().includes(query) ||
// //       String(user.depositAddress ?? '').toLowerCase().includes(query)
// //     );
// //   }, [users, searchQuery]);

// //   const sortedUsers = useMemo(
// //     () =>
// //       [...filteredUsers].sort((a, b) => {
// //         const aChecked = hasAnyCheckedBalance(a);
// //         const bChecked = hasAnyCheckedBalance(b);

// //         // Checked users first; then highest returned balance quantity first.
// //         if (aChecked !== bChecked) return aChecked ? -1 : 1;

// //         const balanceDifference = getTotalBalance(b) - getTotalBalance(a);
// //         if (balanceDifference !== 0) return balanceDifference;

// //         // Stable-looking fallback for ties.
// //         return String(b.userId ?? '').localeCompare(
// //           String(a.userId ?? ''),
// //           undefined,
// //           { numeric: true }
// //         );
// //       }),
// //     [filteredUsers]
// //   );

// //   const totalPages = Math.max(
// //     1,
// //     Math.ceil(sortedUsers.length / itemsPerPage)
// //   );
// //   const safePage = Math.min(currentPage, totalPages);
// //   const startIndex = (safePage - 1) * itemsPerPage;
// //   const currentItems = sortedUsers.slice(
// //     startIndex,
// //     startIndex + itemsPerPage
// //   );

// //   // Checks one user at a time. Backend response is expected as:
// //   // { success, user, balanceStatus, balances }
// //   const checkOneUser = useCallback(
// //     async (user) => {
// //       if (busyRef.current) return false;

// //       const userKey = getUserKey(user);
// //       if (user.userId === undefined || user.userId === null || String(user.userId).trim() === '') {
// //         setError('Is user ka userId nahi mila; balance endpoint ko userId chahiye.');
// //         return false;
// //       }

// //       if (!userKey) {
// //         setError('User ID nahi mili.');
// //         return false;
// //       }

// //       if (!user.depositAddress) {
// //         setUsers((previous) =>
// //           previous.map((item) =>
// //             getUserKey(item) === userKey
// //               ? {
// //                   ...item,
// //                   balances: [],
// //                   balanceStatus: 'no_address',
// //                   checkError: '',
// //                 }
// //               : item
// //           )
// //         );
// //         setCheckMessage(`User ${userKey}: deposit address nahi hai.`);
// //         return false;
// //       }

// //       busyRef.current = true;
// //       setCheckingUserId(userKey);
// //       setError('');
// //       setCheckMessage(`Checking user ${userKey}...`);

// //       setUsers((previous) =>
// //         previous.map((item) =>
// //           getUserKey(item) === userKey
// //             ? { ...item, balanceStatus: 'checking', checkError: '' }
// //             : item
// //         )
// //       );

// //       try {
// //         const response = await api.get(
// //           `/admin/check-deposit-address/${encodeURIComponent(
// //             String(user.userId)
// //           )}`,
// //           getAuthConfig()
// //         );

// //         const payload = response.data;
// //         // Supports both root response and a { data: ... } wrapper.
// //         const result = payload?.data ?? payload;
// //         const checkedUser = result?.user;
// //         const balances = result?.balances;

// //         if (
// //           !payload?.success ||
// //           !checkedUser ||
// //           !Array.isArray(balances)
// //         ) {
// //           throw new Error(
// //             payload?.message ||
// //               'API response mein user ya balances nahi mile.'
// //           );
// //         }

// //         const normalizedBalances = NETWORKS.map((network) => {
// //           const found = balances.find(
// //             (balance) => balance.network === network.key
// //           );

// //           if (found) return found;

// //           return {
// //             network: network.key,
// //             name: network.label,
// //             status: 'error',
// //             message: 'Is network ka balance response mein nahi mila.',
// //             native: null,
// //             usdt: null,
// //           };
// //         });

// //         const allSuccess = normalizedBalances.every(
// //           (balance) => balance.status === 'success'
// //         );
// //         const anySuccess = normalizedBalances.some(
// //           (balance) => balance.status === 'success'
// //         );

// //         const updatedUser = {
// //           userId: checkedUser.userId ?? user.userId,
// //           name: checkedUser.name ?? user.name,
// //           depositAddress:
// //             checkedUser.depositAddress ?? user.depositAddress,
// //           balances: normalizedBalances,
// //           balanceStatus:
// //             result.balanceStatus ||
// //             (allSuccess ? 'success' : anySuccess ? 'partial' : 'error'),
// //           checkError: '',
// //         };

// //         setUsers((previous) =>
// //           previous.map((item) =>
// //             isSameUser(
// //               item,
// //               userKey,
// //               updatedUser.userId,
// //               user._id
// //             )
// //               ? { ...item, ...updatedUser }
// //               : item
// //           )
// //         );

// //         if (allSuccess) {
// //           setCheckMessage(`User ${userKey}: all networks checked successfully.`);
// //           return true;
// //         }

// //         const failed = normalizedBalances
// //           .filter((balance) => balance.status !== 'success')
// //           .map((balance) => balance.name || balance.network);

// //         setCheckMessage(
// //           `User ${userKey}: check incomplete. Failed: ${failed.join(', ')}.`
// //         );
// //         return false;
// //       } catch (err) {
// //         console.error(
// //           `Balance check failed for ${userKey}:`,
// //           err.response?.data || err
// //         );

// //         const message =
// //           err.response?.data?.message ||
// //           err.message ||
// //           'Balance check failed.';

// //         setUsers((previous) =>
// //           previous.map((item) =>
// //             getUserKey(item) === userKey
// //               ? {
// //                   ...item,
// //                   balanceStatus: 'error',
// //                   checkError: message,
// //                 }
// //               : item
// //           )
// //         );

// //         setCheckMessage(`User ${userKey}: check failed.`);
// //         setError(message);
// //         return false;
// //       } finally {
// //         busyRef.current = false;
// //         setCheckingUserId('');
// //       }
// //     },
// //     [getAuthConfig]
// //   );

// //   const handleCheckOne = useCallback(
// //     async (user) => {
// //       if (busyRef.current || autoCheckingRef.current) return;
// //       await checkOneUser(user);
// //     },
// //     [checkOneUser]
// //   );

// //   const startAutoCheck = useCallback(async () => {
// //     if (busyRef.current || autoCheckingRef.current) return;

// //     autoCheckingRef.current = true;
// //     setAutoChecking(true);
// //     setError('');

// //     try {
// //       // Snapshot the current displayed/search-filtered order.
// //       const queue = [...sortedUsers];

// //       for (const queuedUser of queue) {
// //         if (!autoCheckingRef.current) break;

// //         // Read the latest state so successfully checked rows can be skipped.
// //         const latestUser = usersRef.current.find(
// //           (item) => getUserKey(item) === getUserKey(queuedUser)
// //         );

// //         if (!latestUser?.depositAddress) continue;
// //         if (isFullyChecked(latestUser)) continue;

// //         const succeeded = await checkOneUser(latestUser);

// //         // Stop on any incomplete/failed network so the result can be inspected.
// //         if (!succeeded) break;
// //       }

// //       if (autoCheckingRef.current) {
// //         setCheckMessage('Auto Check queue complete.');
// //       } else {
// //         setCheckMessage('Auto Check stopped after the current request.');
// //       }
// //     } finally {
// //       autoCheckingRef.current = false;
// //       setAutoChecking(false);
// //     }
// //   }, [sortedUsers, checkOneUser]);

// //   const stopAutoCheck = () => {
// //     autoCheckingRef.current = false;
// //     setAutoChecking(false);
// //     setCheckMessage(
// //       'Stop requested. Current user check will finish first.'
// //     );
// //   };

// //   const resetChecks = () => {
// //     if (busyRef.current || autoCheckingRef.current) return;

// //     setUsers((previous) =>
// //       previous.map((user) => ({
// //         ...user,
// //         balances: [],
// //         balanceStatus: user.depositAddress ? 'not_checked' : 'no_address',
// //         checkError: '',
// //       }))
// //     );
// //     setError('');
// //     setCheckMessage('Balances reset. Check users one at a time.');
// //   };

// //   const copyAddress = async (address) => {
// //     try {
// //       await navigator.clipboard.writeText(address);
// //       setCheckMessage('Deposit address copied.');
// //     } catch (err) {
// //       console.error('Could not copy address:', err);
// //       window.prompt('Copy this address:', address);
// //     }
// //   };

// //   const getNetworkBalance = (user, networkKey) =>
// //     (user.balances || []).find((item) => item.network === networkKey);

// //   const getBalanceStatus = (user) => {
// //     if (user.balanceStatus === 'invalid_address') return 'Invalid address';
// //     if (user.balanceStatus === 'no_address') return 'No deposit address';
// //     if (user.balanceStatus === 'checking') return 'Checking...';
// //     if (user.balanceStatus === 'error') {
// //       return user.checkError || 'Check failed';
// //     }

// //     const balances = user.balances || [];
// //     if (!balances.length) return 'Not checked';

// //     const failed = balances.filter((item) => item.status !== 'success').length;
// //     if (failed === balances.length) return 'Check failed';
// //     if (failed > 0) return 'Partially checked';

// //     return 'All networks checked';
// //   };

// //   const usersWithAddress = users.filter(
// //     (user) => Boolean(user.depositAddress)
// //   ).length;

// //   const fullyCheckedCount = users.filter(isFullyChecked).length;

// //   return (
// //     <div className="mx-auto w-full max-w-[1800px] p-4 pt-12 md:pt-16">
// //       <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
// //         <div>
// //           <h2 className="flex items-center gap-2 text-2xl font-black uppercase tracking-wide text-slate-800">
// //             <Wallet className="text-orange-500" size={28} />
// //             Deposit Address Monitor
// //           </h2>
// //           <p className="mt-1 text-xs font-bold text-slate-500 md:text-sm">
// //             ETHEREUM · BNB SMART CHAIN · POLYGON · USDT
// //           </p>
// //         </div>

// //         <div className="flex flex-wrap gap-2">
// //           <button
// //             type="button"
// //             onClick={fetchUsersWithAddresses}
// //             disabled={loading || autoChecking || Boolean(checkingUserId)}
// //             className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 disabled:opacity-50"
// //           >
// //             <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
// //             Reload list
// //           </button>

// //           {!autoChecking ? (
// //             <button
// //               type="button"
// //               onClick={startAutoCheck}
// //               disabled={
// //                 loading ||
// //                 Boolean(checkingUserId) ||
// //                 sortedUsers.length === 0
// //               }
// //               className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white hover:bg-orange-600 disabled:opacity-50"
// //             >
// //               <Play size={16} />
// //               Auto Check
// //             </button>
// //           ) : (
// //             <button
// //               type="button"
// //               onClick={stopAutoCheck}
// //               className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white"
// //             >
// //               <Square size={16} />
// //               Stop after current
// //             </button>
// //           )}

// //           <button
// //             type="button"
// //             onClick={resetChecks}
// //             disabled={autoChecking || Boolean(checkingUserId)}
// //             className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 disabled:opacity-50"
// //           >
// //             <RotateCcw size={16} />
// //             Reset checks
// //           </button>
// //         </div>
// //       </div>

// //       <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
// //         <div className="rounded-xl border border-slate-200 bg-white p-4">
// //           <p className="text-xs font-bold uppercase text-slate-500">Users found</p>
// //           <p className="mt-1 text-2xl font-black text-slate-800">
// //             {filteredUsers.length}
// //           </p>
// //         </div>

// //         <div className="rounded-xl border border-slate-200 bg-white p-4">
// //           <p className="text-xs font-bold uppercase text-slate-500">
// //             With deposit address
// //           </p>
// //           <p className="mt-1 text-2xl font-black text-slate-800">
// //             {usersWithAddress}
// //           </p>
// //         </div>

// //         <div className="rounded-xl border border-slate-200 bg-white p-4">
// //           <p className="text-xs font-bold uppercase text-slate-500">Fully checked</p>
// //           <p className="mt-1 text-2xl font-black text-emerald-700">
// //             {fullyCheckedCount}
// //           </p>
// //           <p className="mt-1 text-xs text-slate-500">
// //             All three networks successful
// //           </p>
// //         </div>

// //         <div className="rounded-xl border border-slate-200 bg-white p-4">
// //           <p className="text-xs font-bold uppercase text-slate-500">
// //             Networks per address
// //           </p>
// //           <p className="mt-1 text-2xl font-black text-slate-800">3</p>
// //           <p className="mt-1 text-xs text-slate-500">ETH · BNB · POL</p>
// //         </div>
// //       </div>

// //       {(autoChecking || checkingUserId) && (
// //         <div className="mb-5 rounded-xl border border-orange-200 bg-orange-50 p-4">
// //           <div className="flex items-center gap-2 font-bold text-orange-700">
// //             <RefreshCcw size={17} className="animate-spin" />
// //             {checkingUserId
// //               ? `Checking user ${checkingUserId}...`
// //               : 'Auto Check running...'}
// //           </div>
// //           <p className="mt-1 text-sm text-orange-700">
// //             Ek waqt par ek hi user ki request chalegi.
// //           </p>
// //         </div>
// //       )}

// //       {checkMessage && (
// //         <div className="mb-4 rounded-lg bg-slate-100 p-3 text-sm font-semibold text-slate-700">
// //           {checkMessage}
// //         </div>
// //       )}

// //       <div className="relative mb-5 w-full md:max-w-xl">
// //         <Search
// //           size={17}
// //           className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
// //         />
// //         <input
// //           type="text"
// //           value={searchQuery}
// //           onChange={(event) => {
// //             setSearchQuery(event.target.value);
// //             setCurrentPage(1);
// //           }}
// //           placeholder="Search user ID, name or deposit address..."
// //           className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-slate-800 outline-none focus:border-orange-500"
// //         />
// //       </div>

// //       {error && (
// //         <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
// //           <AlertCircle size={18} className="mt-0.5 shrink-0" />
// //           <div>
// //             <p>{error}</p>
// //             <button
// //               type="button"
// //               onClick={() => setError('')}
// //               className="mt-1 underline"
// //             >
// //               Dismiss
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
// //         <div className="overflow-x-auto">
// //           <table className="w-full min-w-[1350px] text-left text-sm">
// //             <thead className="border-b border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500">
// //               <tr>
// //                 <th className="px-4 py-4">User</th>
// //                 <th className="px-4 py-4">Deposit address</th>
// //                 {NETWORKS.map((network) => (
// //                   <th key={network.key} className="px-4 py-4">
// //                     <div>{network.label}</div>
// //                     <div className="mt-1 normal-case tracking-normal">
// //                       {network.native} + USDT
// //                     </div>
// //                   </th>
// //                 ))}
// //                 <th className="px-4 py-4">Status</th>
// //                 <th className="px-4 py-4">Action</th>
// //               </tr>
// //             </thead>

// //             <tbody className="divide-y divide-slate-100 text-slate-600">
// //               {loading ? (
// //                 <tr>
// //                   <td colSpan={7} className="py-12 text-center font-bold text-orange-500">
// //                     <RefreshCcw size={18} className="mx-auto mb-2 animate-spin" />
// //                     Loading user addresses...
// //                   </td>
// //                 </tr>
// //               ) : currentItems.length === 0 ? (
// //                 <tr>
// //                   <td colSpan={7} className="py-12 text-center font-bold text-slate-500">
// //                     No users found.
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 currentItems.map((user) => {
// //                   const userKey = getUserKey(user);
// //                   const isChecking = checkingUserId === userKey;

// //                   return (
// //                     <tr
// //                       key={user._id || userKey}
// //                       className="align-top hover:bg-slate-50"
// //                     >
// //                       <td className="px-4 py-4">
// //                         <div className="font-mono font-black text-slate-800">
// //                           #{user.userId ?? '—'}
// //                         </div>
// //                         <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
// //                           <UserIcon size={12} />
// //                           {user.name || 'Unknown user'}
// //                         </div>
// //                       </td>

// //                       <td className="max-w-[250px] px-4 py-4">
// //                         {user.depositAddress ? (
// //                           <div className="flex items-start gap-2">
// //                             <span className="break-all font-mono text-xs">
// //                               {user.depositAddress}
// //                             </span>
// //                             <button
// //                               type="button"
// //                               title="Copy deposit address"
// //                               onClick={() => copyAddress(user.depositAddress)}
// //                               className="shrink-0 rounded p-1 text-slate-500 hover:bg-slate-200"
// //                             >
// //                               <Copy size={14} />
// //                             </button>
// //                           </div>
// //                         ) : (
// //                           <span className="text-xs text-slate-400">No address</span>
// //                         )}
// //                       </td>

// //                       {NETWORKS.map((network) => {
// //                         const result = getNetworkBalance(user, network.key);

// //                         return (
// //                           <td key={network.key} className="px-4 py-4">
// //                             {!result ? (
// //                               <span className="text-xs text-slate-400">
// //                                 {isChecking ? 'Checking...' : 'Not checked'}
// //                               </span>
// //                             ) : result.status !== 'success' ? (
// //                               <div className="max-w-[190px] text-xs text-red-600">
// //                                 <div className="flex items-center gap-1 font-bold">
// //                                   <AlertCircle size={13} />
// //                                   Check failed
// //                                 </div>
// //                                 <div className="mt-1 break-words text-slate-500">
// //                                   {result.message || 'Network unavailable'}
// //                                 </div>
// //                               </div>
// //                             ) : (
// //                               <div className="space-y-2">
// //                                 <div>
// //                                   <div className="text-[10px] font-bold uppercase text-slate-400">
// //                                     {result.native?.symbol || network.native}
// //                                   </div>
// //                                   <div className="font-mono font-bold text-slate-800">
// //                                     {formatBalance(result.native?.balance)}
// //                                   </div>
// //                                 </div>
// //                                 <div>
// //                                   <div className="text-[10px] font-bold uppercase text-slate-400">
// //                                     USDT
// //                                   </div>
// //                                   <div className="font-mono font-bold text-emerald-700">
// //                                     {formatBalance(result.usdt?.balance)}
// //                                   </div>
// //                                 </div>
// //                               </div>
// //                             )}
// //                           </td>
// //                         );
// //                       })}

// //                       <td className="max-w-[190px] px-4 py-4">
// //                         {user.balanceStatus === 'success' && isFullyChecked(user) ? (
// //                           <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
// //                             <CheckCircle size={14} />
// //                             Complete
// //                           </span>
// //                         ) : user.balanceStatus === 'invalid_address' ? (
// //                           <span className="text-xs font-bold text-red-600">
// //                             Invalid address
// //                           </span>
// //                         ) : user.balanceStatus === 'checking' ? (
// //                           <span className="text-xs font-bold text-orange-600">
// //                             Checking...
// //                           </span>
// //                         ) : (
// //                           <span className="break-words text-xs font-semibold text-amber-700">
// //                             {getBalanceStatus(user)}
// //                           </span>
// //                         )}
// //                       </td>

// //                       <td className="px-4 py-4">
// //                         <button
// //                           type="button"
// //                           onClick={() => handleCheckOne(user)}
// //                           disabled={
// //                             Boolean(checkingUserId) ||
// //                             autoChecking ||
// //                             !user.depositAddress
// //                           }
// //                           className="inline-flex min-w-[110px] items-center justify-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
// //                         >
// //                           {isChecking ? (
// //                             <>
// //                               <RefreshCcw size={13} className="animate-spin" />
// //                               Checking
// //                             </>
// //                           ) : (
// //                             <>
// //                               <Search size={13} />
// //                               Check
// //                             </>
// //                           )}
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   );
// //                 })
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         {!loading && sortedUsers.length > 0 && (
// //           <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
// //             <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
// //               <span>Rows per page:</span>
// //               <select
// //                 value={itemsPerPage}
// //                 onChange={(event) => {
// //                   setItemsPerPage(Number(event.target.value));
// //                   setCurrentPage(1);
// //                 }}
// //                 className="rounded-lg border border-slate-200 bg-white px-2 py-1.5"
// //               >
// //                 {[10, 20, 50, 100].map((size) => (
// //                   <option key={size} value={size}>{size}</option>
// //                 ))}
// //               </select>
// //             </div>

// //             <div className="flex items-center justify-between gap-3 text-xs font-bold text-slate-600 sm:justify-end">
// //               <span>
// //                 Showing {startIndex + 1}–
// //                 {Math.min(startIndex + itemsPerPage, sortedUsers.length)} of {sortedUsers.length}
// //               </span>
// //               <button
// //                 type="button"
// //                 onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
// //                 disabled={safePage === 1}
// //                 className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"
// //               >
// //                 <ChevronLeft size={16} />
// //               </button>
// //               <span>Page {safePage} of {totalPages}</span>
// //               <button
// //                 type="button"
// //                 onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
// //                 disabled={safePage === totalPages}
// //                 className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"
// //               >
// //                 <ChevronRight size={16} />
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       <p className="mt-4 text-xs leading-5 text-slate-500">
// //         Each user is checked separately. Ethereum, BNB Smart Chain and Polygon
// //         balances are read-only. Failed network requests are displayed as errors,
// //         not zero balances. No transfers are initiated by this page.
// //       </p>
// //     </div>
// //   );
// // };

// // export default DepositAddressMonitor;




// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from 'react';

// import api from '../../api/axios';

// import {
//   Search,
//   RefreshCcw,
//   Wallet,
//   CheckCircle,
//   AlertCircle,
//   ChevronLeft,
//   ChevronRight,
//   User as UserIcon,
//   Copy,
//   Play,
//   Square,
//   RotateCcw,
// } from 'lucide-react';

// const NETWORKS = [
//   { key: 'ethereum', label: 'Ethereum', native: 'ETH' },
//   { key: 'bsc', label: 'BNB Smart Chain', native: 'BNB' },
//   { key: 'polygon', label: 'Polygon', native: 'POL' },
// ];

// const formatBalance = (value) => {
//   if (value === undefined || value === null || value === '') return '—';

//   const number = Number(value);
//   if (!Number.isFinite(number)) return String(value);

//   return number.toLocaleString('en-US', {
//     maximumFractionDigits: 8,
//   });
// };

// const getUserKey = (user) => String(user?.userId ?? user?._id ?? '');

// const isSameUser = (item, userKey, userId, mongoId) =>
//   getUserKey(item) === userKey ||
//   (userId != null && String(item?.userId) === String(userId)) ||
//   (mongoId != null && String(item?._id) === String(mongoId));

// const isFullyChecked = (user) =>
//   user?.balanceStatus === 'success' &&
//   NETWORKS.every((network) =>
//     user?.balances?.some(
//       (balance) =>
//         balance.network === network.key &&
//         balance.status === 'success'
//     )
//   );

// // Sort by the sum of returned numeric coin quantities.
// // Note: ETH/BNB/POL/USDT are different assets, so this is not a USD valuation.
// const DepositAddressMonitor = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [checkingUserId, setCheckingUserId] = useState('');
//   const [autoChecking, setAutoChecking] = useState(false);
//   const [checkMessage, setCheckMessage] = useState('');

//   const autoCheckingRef = useRef(false);
//   const busyRef = useRef(false);
//   const mountedRef = useRef(true);
//   const usersRef = useRef([]);

//   useEffect(() => {
//     usersRef.current = users;
//   }, [users]);

//   useEffect(() => {
//     mountedRef.current = true;
//     return () => {
//       mountedRef.current = false;
//       autoCheckingRef.current = false;
//     };
//   }, []);

//   const getAuthConfig = useCallback(() => {
//     const token = localStorage.getItem('adminToken');

//     if (!token) {
//       throw new Error('Admin token nahi mila. Dobara login karein.');
//     }

//     return {
//       headers: { Authorization: `Bearer ${token}` },
//       timeout: 60000,
//     };
//   }, []);

//   const fetchUsersWithAddresses = useCallback(async () => {
//     if (busyRef.current || autoCheckingRef.current) {
//       setCheckMessage('Balance check chal raha hai; list reload baad mein karein.');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setCheckMessage('');

//     try {
//       const response = await api.get(
//         '/admin/users-deposit-addresses',
//         getAuthConfig()
//       );

//       if (
//         !response.data?.success ||
//         !Array.isArray(response.data.data)
//       ) {
//         throw new Error(
//           response.data?.message ||
//             'Deposit-address API ka response sahi nahi hai.'
//         );
//       }

//       const incomingUsers = response.data.data.map((user) => ({
//         ...user,
//         balances: Array.isArray(user.balances) ? user.balances : [],
//         balanceStatus: user.balanceStatus || 'not_checked',
//         checkError: user.checkError || '',
//       }));

//       setUsers(incomingUsers);
//     } catch (err) {
//       console.error('Failed to fetch deposit addresses:', err);
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           'Deposit addresses load nahi ho paaye.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, [getAuthConfig]);

//   useEffect(() => {
//     fetchUsersWithAddresses();
//   }, [fetchUsersWithAddresses]);

//   const filteredUsers = useMemo(() => {
//     const query = searchQuery.trim().toLowerCase();

//     return users.filter((user) =>
//       String(user.userId ?? '').toLowerCase().includes(query) ||
//       String(user.name ?? '').toLowerCase().includes(query) ||
//       String(user.depositAddress ?? '').toLowerCase().includes(query)
//     );
//   }, [users, searchQuery]);

//   // User IDs ascending order (numeric-aware: ID 2 comes before ID 10).
//   const sortedUsers = useMemo(
//     () =>
//       [...filteredUsers].sort((a, b) =>
//         String(a.userId ?? '').localeCompare(
//           String(b.userId ?? ''),
//           undefined,
//           { numeric: true, sensitivity: 'base' }
//         )
//       ),
//     [filteredUsers]
//   );

//   const totalPages = Math.max(
//     1,
//     Math.ceil(sortedUsers.length / itemsPerPage)
//   );
//   const safePage = Math.min(currentPage, totalPages);
//   const startIndex = (safePage - 1) * itemsPerPage;
//   const currentItems = sortedUsers.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   // Checks one user at a time. Backend response is expected as:
//   // { success, user, balanceStatus, balances }
//   const checkOneUser = useCallback(
//     async (user) => {
//       if (busyRef.current) return false;

//       const userKey = getUserKey(user);
//       if (user.userId === undefined || user.userId === null || String(user.userId).trim() === '') {
//         setError('Is user ka userId nahi mila; balance endpoint ko userId chahiye.');
//         return false;
//       }

//       if (!userKey) {
//         setError('User ID nahi mili.');
//         return false;
//       }

//       if (!user.depositAddress) {
//         setUsers((previous) =>
//           previous.map((item) =>
//             getUserKey(item) === userKey
//               ? {
//                   ...item,
//                   balances: [],
//                   balanceStatus: 'no_address',
//                   checkError: '',
//                 }
//               : item
//           )
//         );
//         setCheckMessage(`User ${userKey}: deposit address nahi hai.`);
//         return false;
//       }

//       busyRef.current = true;
//       setCheckingUserId(userKey);
//       setError('');
//       setCheckMessage(`Checking user ${userKey}...`);

//       setUsers((previous) =>
//         previous.map((item) =>
//           getUserKey(item) === userKey
//             ? { ...item, balanceStatus: 'checking', checkError: '' }
//             : item
//         )
//       );

//       try {
//         const response = await api.get(
//           `/admin/check-deposit-address/${encodeURIComponent(
//             String(user.userId)
//           )}`,
//           getAuthConfig()
//         );

//         const payload = response.data;
//         // Supports both root response and a { data: ... } wrapper.
//         const result = payload?.data ?? payload;
//         const checkedUser = result?.user;
//         const balances = result?.balances;

//         if (
//           !payload?.success ||
//           !checkedUser ||
//           !Array.isArray(balances)
//         ) {
//           throw new Error(
//             payload?.message ||
//               'API response mein user ya balances nahi mile.'
//           );
//         }

//         const normalizedBalances = NETWORKS.map((network) => {
//           const found = balances.find(
//             (balance) => balance.network === network.key
//           );

//           if (found) return found;

//           return {
//             network: network.key,
//             name: network.label,
//             status: 'error',
//             message: 'Is network ka balance response mein nahi mila.',
//             native: null,
//             usdt: null,
//           };
//         });

//         const allSuccess = normalizedBalances.every(
//           (balance) => balance.status === 'success'
//         );
//         const anySuccess = normalizedBalances.some(
//           (balance) => balance.status === 'success'
//         );

//         const updatedUser = {
//           userId: checkedUser.userId ?? user.userId,
//           name: checkedUser.name ?? user.name,
//           depositAddress:
//             checkedUser.depositAddress ?? user.depositAddress,
//           balances: normalizedBalances,
//           balanceStatus:
//             result.balanceStatus ||
//             (allSuccess ? 'success' : anySuccess ? 'partial' : 'error'),
//           checkError: '',
//         };

//         setUsers((previous) =>
//           previous.map((item) =>
//             isSameUser(
//               item,
//               userKey,
//               updatedUser.userId,
//               user._id
//             )
//               ? { ...item, ...updatedUser }
//               : item
//           )
//         );

//         if (allSuccess) {
//           setCheckMessage(`User ${userKey}: all networks checked successfully.`);
//           return true;
//         }

//         const failed = normalizedBalances
//           .filter((balance) => balance.status !== 'success')
//           .map((balance) => balance.name || balance.network);

//         setCheckMessage(
//           `User ${userKey}: check incomplete. Failed: ${failed.join(', ')}.`
//         );
//         return false;
//       } catch (err) {
//         console.error(
//           `Balance check failed for ${userKey}:`,
//           err.response?.data || err
//         );

//         const message =
//           err.response?.data?.message ||
//           err.message ||
//           'Balance check failed.';

//         setUsers((previous) =>
//           previous.map((item) =>
//             getUserKey(item) === userKey
//               ? {
//                   ...item,
//                   balanceStatus: 'error',
//                   checkError: message,
//                 }
//               : item
//           )
//         );

//         setCheckMessage(`User ${userKey}: check failed.`);
//         setError(message);
//         return false;
//       } finally {
//         busyRef.current = false;
//         setCheckingUserId('');
//       }
//     },
//     [getAuthConfig]
//   );

//   const handleCheckOne = useCallback(
//     async (user) => {
//       if (busyRef.current || autoCheckingRef.current) return;
//       await checkOneUser(user);
//     },
//     [checkOneUser]
//   );

//   const startAutoCheck = useCallback(async () => {
//     if (busyRef.current || autoCheckingRef.current) return;

//     autoCheckingRef.current = true;
//     setAutoChecking(true);
//     setError('');

//     try {
//       // Snapshot the current displayed/search-filtered order.
//       const queue = [...sortedUsers];

//       for (const queuedUser of queue) {
//         if (!autoCheckingRef.current) break;

//         // Read the latest state so successfully checked rows can be skipped.
//         const latestUser = usersRef.current.find(
//           (item) => getUserKey(item) === getUserKey(queuedUser)
//         );

//         if (!latestUser?.depositAddress) continue;
//         if (isFullyChecked(latestUser)) continue;

//         const succeeded = await checkOneUser(latestUser);

//         // Keep scanning later IDs if one user's check fails.
//         // Failed users remain marked and can be retried individually.
//         if (!succeeded) {
//           console.warn(
//             `Auto Check: continuing after an incomplete check for ${getUserKey(latestUser)}.`
//           );
//         }
//       }

//       if (autoCheckingRef.current) {
//         setCheckMessage('Auto Check queue complete. Failed users can be retried individually.');
//       } else {
//         setCheckMessage('Auto Check stopped after the current request.');
//       }
//     } finally {
//       autoCheckingRef.current = false;
//       setAutoChecking(false);
//     }
//   }, [sortedUsers, checkOneUser]);

//   const stopAutoCheck = () => {
//     autoCheckingRef.current = false;
//     setAutoChecking(false);
//     setCheckMessage(
//       'Stop requested. Current user check will finish first.'
//     );
//   };

//   const resetChecks = () => {
//     if (busyRef.current || autoCheckingRef.current) return;

//     setUsers((previous) =>
//       previous.map((user) => ({
//         ...user,
//         balances: [],
//         balanceStatus: user.depositAddress ? 'not_checked' : 'no_address',
//         checkError: '',
//       }))
//     );
//     setError('');
//     setCheckMessage('Balances reset. Check users one at a time.');
//   };

//   const copyAddress = async (address) => {
//     try {
//       await navigator.clipboard.writeText(address);
//       setCheckMessage('Deposit address copied.');
//     } catch (err) {
//       console.error('Could not copy address:', err);
//       window.prompt('Copy this address:', address);
//     }
//   };

//   const getNetworkBalance = (user, networkKey) =>
//     (user.balances || []).find((item) => item.network === networkKey);

//   const getBalanceStatus = (user) => {
//     if (user.balanceStatus === 'invalid_address') return 'Invalid address';
//     if (user.balanceStatus === 'no_address') return 'No deposit address';
//     if (user.balanceStatus === 'checking') return 'Checking...';
//     if (user.balanceStatus === 'error') {
//       return user.checkError || 'Check failed';
//     }

//     const balances = user.balances || [];
//     if (!balances.length) return 'Not checked';

//     const failed = balances.filter((item) => item.status !== 'success').length;
//     if (failed === balances.length) return 'Check failed';
//     if (failed > 0) return 'Partially checked';

//     return 'All networks checked';
//   };

//   const usersWithAddress = users.filter(
//     (user) => Boolean(user.depositAddress)
//   ).length;

//   const fullyCheckedCount = users.filter(isFullyChecked).length;

//   return (
//     <div className="mx-auto w-full max-w-[1800px] p-4 pt-12 md:pt-16">
//       <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
//         <div>
//           <h2 className="flex items-center gap-2 text-2xl font-black uppercase tracking-wide text-slate-800">
//             <Wallet className="text-orange-500" size={28} />
//             Deposit Address Monitor
//           </h2>
//           <p className="mt-1 text-xs font-bold text-slate-500 md:text-sm">
//             ETHEREUM · BNB SMART CHAIN · POLYGON · USDT
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-2">
//           <button
//             type="button"
//             onClick={fetchUsersWithAddresses}
//             disabled={loading || autoChecking || Boolean(checkingUserId)}
//             className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 disabled:opacity-50"
//           >
//             <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
//             Reload list
//           </button>

//           {!autoChecking ? (
//             <button
//               type="button"
//               onClick={startAutoCheck}
//               disabled={
//                 loading ||
//                 Boolean(checkingUserId) ||
//                 sortedUsers.length === 0
//               }
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white hover:bg-orange-600 disabled:opacity-50"
//             >
//               <Play size={16} />
//               Auto Check
//             </button>
//           ) : (
//             <button
//               type="button"
//               onClick={stopAutoCheck}
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white"
//             >
//               <Square size={16} />
//               Stop after current
//             </button>
//           )}

//           <button
//             type="button"
//             onClick={resetChecks}
//             disabled={autoChecking || Boolean(checkingUserId)}
//             className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 disabled:opacity-50"
//           >
//             <RotateCcw size={16} />
//             Reset checks
//           </button>
//         </div>
//       </div>

//       <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
//         <div className="rounded-xl border border-slate-200 bg-white p-4">
//           <p className="text-xs font-bold uppercase text-slate-500">Users found</p>
//           <p className="mt-1 text-2xl font-black text-slate-800">
//             {filteredUsers.length}
//           </p>
//         </div>

//         <div className="rounded-xl border border-slate-200 bg-white p-4">
//           <p className="text-xs font-bold uppercase text-slate-500">
//             With deposit address
//           </p>
//           <p className="mt-1 text-2xl font-black text-slate-800">
//             {usersWithAddress}
//           </p>
//         </div>

//         <div className="rounded-xl border border-slate-200 bg-white p-4">
//           <p className="text-xs font-bold uppercase text-slate-500">Fully checked</p>
//           <p className="mt-1 text-2xl font-black text-emerald-700">
//             {fullyCheckedCount}
//           </p>
//           <p className="mt-1 text-xs text-slate-500">
//             All three networks successful
//           </p>
//         </div>

//         <div className="rounded-xl border border-slate-200 bg-white p-4">
//           <p className="text-xs font-bold uppercase text-slate-500">
//             Networks per address
//           </p>
//           <p className="mt-1 text-2xl font-black text-slate-800">3</p>
//           <p className="mt-1 text-xs text-slate-500">ETH · BNB · POL</p>
//         </div>
//       </div>

//       {(autoChecking || checkingUserId) && (
//         <div className="mb-5 rounded-xl border border-orange-200 bg-orange-50 p-4">
//           <div className="flex items-center gap-2 font-bold text-orange-700">
//             <RefreshCcw size={17} className="animate-spin" />
//             {checkingUserId
//               ? `Checking user ${checkingUserId}...`
//               : 'Auto Check running...'}
//           </div>
//           <p className="mt-1 text-sm text-orange-700">
//             Ek waqt par ek hi user ki request chalegi.
//           </p>
//         </div>
//       )}

//       {checkMessage && (
//         <div className="mb-4 rounded-lg bg-slate-100 p-3 text-sm font-semibold text-slate-700">
//           {checkMessage}
//         </div>
//       )}

//       <div className="relative mb-5 w-full md:max-w-xl">
//         <Search
//           size={17}
//           className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
//         />
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(event) => {
//             setSearchQuery(event.target.value);
//             setCurrentPage(1);
//           }}
//           placeholder="Search user ID, name or deposit address..."
//           className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-slate-800 outline-none focus:border-orange-500"
//         />
//       </div>

//       {error && (
//         <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
//           <AlertCircle size={18} className="mt-0.5 shrink-0" />
//           <div>
//             <p>{error}</p>
//             <button
//               type="button"
//               onClick={() => setError('')}
//               className="mt-1 underline"
//             >
//               Dismiss
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[1350px] text-left text-sm">
//             <thead className="border-b border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500">
//               <tr>
//                 <th className="px-4 py-4">User</th>
//                 <th className="px-4 py-4">Deposit address</th>
//                 {NETWORKS.map((network) => (
//                   <th key={network.key} className="px-4 py-4">
//                     <div>{network.label}</div>
//                     <div className="mt-1 normal-case tracking-normal">
//                       {network.native} + USDT
//                     </div>
//                   </th>
//                 ))}
//                 <th className="px-4 py-4">Status</th>
//                 <th className="px-4 py-4">Action</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-slate-100 text-slate-600">
//               {loading ? (
//                 <tr>
//                   <td colSpan={7} className="py-12 text-center font-bold text-orange-500">
//                     <RefreshCcw size={18} className="mx-auto mb-2 animate-spin" />
//                     Loading user addresses...
//                   </td>
//                 </tr>
//               ) : currentItems.length === 0 ? (
//                 <tr>
//                   <td colSpan={7} className="py-12 text-center font-bold text-slate-500">
//                     No users found.
//                   </td>
//                 </tr>
//               ) : (
//                 currentItems.map((user) => {
//                   const userKey = getUserKey(user);
//                   const isChecking = checkingUserId === userKey;

//                   return (
//                     <tr
//                       key={user._id || userKey}
//                       className="align-top hover:bg-slate-50"
//                     >
//                       <td className="px-4 py-4">
//                         <div className="font-mono font-black text-slate-800">
//                           #{user.userId ?? '—'}
//                         </div>
//                         <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
//                           <UserIcon size={12} />
//                           {user.name || 'Unknown user'}
//                         </div>
//                       </td>

//                       <td className="max-w-[250px] px-4 py-4">
//                         {user.depositAddress ? (
//                           <div className="flex items-start gap-2">
//                             <span className="break-all font-mono text-xs">
//                               {user.depositAddress}
//                             </span>
//                             <button
//                               type="button"
//                               title="Copy deposit address"
//                               onClick={() => copyAddress(user.depositAddress)}
//                               className="shrink-0 rounded p-1 text-slate-500 hover:bg-slate-200"
//                             >
//                               <Copy size={14} />
//                             </button>
//                           </div>
//                         ) : (
//                           <span className="text-xs text-slate-400">No address</span>
//                         )}
//                       </td>

//                       {NETWORKS.map((network) => {
//                         const result = getNetworkBalance(user, network.key);

//                         return (
//                           <td key={network.key} className="px-4 py-4">
//                             {!result ? (
//                               <span className="text-xs text-slate-400">
//                                 {isChecking ? 'Checking...' : 'Not checked'}
//                               </span>
//                             ) : result.status !== 'success' ? (
//                               <div className="max-w-[190px] text-xs text-red-600">
//                                 <div className="flex items-center gap-1 font-bold">
//                                   <AlertCircle size={13} />
//                                   Check failed
//                                 </div>
//                                 <div className="mt-1 break-words text-slate-500">
//                                   {result.message || 'Network unavailable'}
//                                 </div>
//                               </div>
//                             ) : (
//                               <div className="space-y-2">
//                                 <div>
//                                   <div className="text-[10px] font-bold uppercase text-slate-400">
//                                     {result.native?.symbol || network.native}
//                                   </div>
//                                   <div className="font-mono font-bold text-slate-800">
//                                     {formatBalance(result.native?.balance)}
//                                   </div>
//                                 </div>
//                                 <div>
//                                   <div className="text-[10px] font-bold uppercase text-slate-400">
//                                     USDT
//                                   </div>
//                                   <div className="font-mono font-bold text-emerald-700">
//                                     {formatBalance(result.usdt?.balance)}
//                                   </div>
//                                 </div>
//                               </div>
//                             )}
//                           </td>
//                         );
//                       })}

//                       <td className="max-w-[190px] px-4 py-4">
//                         {user.balanceStatus === 'success' && isFullyChecked(user) ? (
//                           <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
//                             <CheckCircle size={14} />
//                             Complete
//                           </span>
//                         ) : user.balanceStatus === 'invalid_address' ? (
//                           <span className="text-xs font-bold text-red-600">
//                             Invalid address
//                           </span>
//                         ) : user.balanceStatus === 'checking' ? (
//                           <span className="text-xs font-bold text-orange-600">
//                             Checking...
//                           </span>
//                         ) : (
//                           <span className="break-words text-xs font-semibold text-amber-700">
//                             {getBalanceStatus(user)}
//                           </span>
//                         )}
//                       </td>

//                       <td className="px-4 py-4">
//                         <button
//                           type="button"
//                           onClick={() => handleCheckOne(user)}
//                           disabled={
//                             Boolean(checkingUserId) ||
//                             autoChecking ||
//                             !user.depositAddress
//                           }
//                           className="inline-flex min-w-[110px] items-center justify-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
//                         >
//                           {isChecking ? (
//                             <>
//                               <RefreshCcw size={13} className="animate-spin" />
//                               Checking
//                             </>
//                           ) : (
//                             <>
//                               <Search size={13} />
//                               Check
//                             </>
//                           )}
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {!loading && sortedUsers.length > 0 && (
//           <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
//               <span>Rows per page:</span>
//               <select
//                 value={itemsPerPage}
//                 onChange={(event) => {
//                   setItemsPerPage(Number(event.target.value));
//                   setCurrentPage(1);
//                 }}
//                 className="rounded-lg border border-slate-200 bg-white px-2 py-1.5"
//               >
//                 {[10, 20, 50, 100].map((size) => (
//                   <option key={size} value={size}>{size}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex items-center justify-between gap-3 text-xs font-bold text-slate-600 sm:justify-end">
//               <span>
//                 Showing {startIndex + 1}–
//                 {Math.min(startIndex + itemsPerPage, sortedUsers.length)} of {sortedUsers.length}
//               </span>
//               <button
//                 type="button"
//                 onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
//                 disabled={safePage === 1}
//                 className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"
//               >
//                 <ChevronLeft size={16} />
//               </button>
//               <span>Page {safePage} of {totalPages}</span>
//               <button
//                 type="button"
//                 onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
//                 disabled={safePage === totalPages}
//                 className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"
//               >
//                 <ChevronRight size={16} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       <p className="mt-4 text-xs leading-5 text-slate-500">
//         Each user is checked separately. Ethereum, BNB Smart Chain and Polygon
//         balances are read-only. Failed network requests are displayed as errors,
//         not zero balances. No transfers are initiated by this page.
//       </p>
//     </div>
//   );
// };

// export default DepositAddressMonitor;




import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import api from '../../api/axios';

import {
  Search,
  RefreshCcw,
  Wallet,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  User as UserIcon,
  Copy,
  Play,
  Square,
  RotateCcw,
} from 'lucide-react';

const NETWORKS = [
  { key: 'ethereum', label: 'Ethereum', native: 'ETH' },
  { key: 'bsc', label: 'BNB Smart Chain', native: 'BNB' },
  { key: 'polygon', label: 'Polygon', native: 'POL' },
];

const formatBalance = (value) => {
  if (value === undefined || value === null || value === '') return '—';

  const number = Number(value);
  if (!Number.isFinite(number)) return String(value);

  return number.toLocaleString('en-US', {
    maximumFractionDigits: 8,
  });
};

const getUserKey = (user) => String(user?.userId ?? user?._id ?? '');

const isSameUser = (item, userKey, userId, mongoId) =>
  getUserKey(item) === userKey ||
  (userId != null && String(item?.userId) === String(userId)) ||
  (mongoId != null && String(item?._id) === String(mongoId));

const isFullyChecked = (user) =>
  user?.balanceStatus === 'success' &&
  NETWORKS.every((network) =>
    user?.balances?.some(
      (balance) =>
        balance.network === network.key &&
        balance.status === 'success'
    )
  );

// Sort by the sum of returned numeric coin quantities.
// Note: ETH/BNB/POL/USDT are different assets, so this is not a USD valuation.
const DepositAddressMonitor = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [checkingUserId, setCheckingUserId] = useState('');
  const [autoChecking, setAutoChecking] = useState(false);
  const [checkMessage, setCheckMessage] = useState('');

  const autoCheckingRef = useRef(false);
  const busyRef = useRef(false);
  const mountedRef = useRef(true);
  const usersRef = useRef([]);

  useEffect(() => {
    usersRef.current = users;
  }, [users]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      autoCheckingRef.current = false;
    };
  }, []);

  const getAuthConfig = useCallback(() => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      throw new Error('Admin token nahi mila. Dobara login karein.');
    }

    return {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 60000,
    };
  }, []);

  const fetchUsersWithAddresses = useCallback(async () => {
    if (busyRef.current || autoCheckingRef.current) {
      setCheckMessage('Balance check chal raha hai; list reload baad mein karein.');
      return;
    }

    setLoading(true);
    setError('');
    setCheckMessage('');

    try {
      const response = await api.get(
        '/admin/users-deposit-addresses',
        getAuthConfig()
      );

      if (
        !response.data?.success ||
        !Array.isArray(response.data.data)
      ) {
        throw new Error(
          response.data?.message ||
            'Deposit-address API ka response sahi nahi hai.'
        );
      }

      const incomingUsers = response.data.data.map((user) => ({
        ...user,
        balances: Array.isArray(user.balances) ? user.balances : [],
        balanceStatus: user.balanceStatus || 'not_checked',
        checkError: user.checkError || '',
      }));

      setUsers(incomingUsers);
    } catch (err) {
      console.error('Failed to fetch deposit addresses:', err);
      setError(
        err.response?.data?.message ||
          err.message ||
          'Deposit addresses load nahi ho paaye.'
      );
    } finally {
      setLoading(false);
    }
  }, [getAuthConfig]);

  useEffect(() => {
    fetchUsersWithAddresses();
  }, [fetchUsersWithAddresses]);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return users.filter((user) =>
      String(user.userId ?? '').toLowerCase().includes(query) ||
      String(user.name ?? '').toLowerCase().includes(query) ||
      String(user.depositAddress ?? '').toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  // Put users with funds at the top.
  // USDT is compared first because it is comparable across networks;
  // native coin quantities are only used as secondary ranking/tie-breaker
  // because ETH, BNB and POL have different units.
  const getUserFundMetrics = (user) => {
    const balances = Array.isArray(user?.balances) ? user.balances : [];
    let totalUsdt = 0;
    let totalNative = 0;
    let hasCheckedBalance = false;

    for (const item of balances) {
      if (item?.status !== 'success') continue;
      hasCheckedBalance = true;

      const usdtAmount = Number(item?.usdt?.balance);
      if (Number.isFinite(usdtAmount) && usdtAmount > 0) {
        totalUsdt += usdtAmount;
      }

      const nativeAmount = Number(item?.native?.balance);
      if (Number.isFinite(nativeAmount) && nativeAmount > 0) {
        totalNative += nativeAmount;
      }
    }

    return {
      totalUsdt,
      totalNative,
      hasCheckedBalance,
      hasFunds: totalUsdt > 0 || totalNative > 0,
    };
  };

  const sortedUsers = useMemo(
    () =>
      [...filteredUsers].sort((a, b) => {
        const aFunds = getUserFundMetrics(a);
        const bFunds = getUserFundMetrics(b);

        // 1. Users with any positive balance first.
        if (aFunds.hasFunds !== bFunds.hasFunds) {
          return aFunds.hasFunds ? -1 : 1;
        }

        // 2. Highest total USDT across all supported networks first.
        if (aFunds.totalUsdt !== bFunds.totalUsdt) {
          return bFunds.totalUsdt - aFunds.totalUsdt;
        }

        // 3. If USDT totals match, show native-coin holders first.
        if (aFunds.totalNative !== bFunds.totalNative) {
          return bFunds.totalNative - aFunds.totalNative;
        }

        // 4. For equal balances, checked users come before unchecked users.
        if (aFunds.hasCheckedBalance !== bFunds.hasCheckedBalance) {
          return aFunds.hasCheckedBalance ? -1 : 1;
        }

        // 5. Keep a stable, numeric-aware User ID order for ties.
        return String(a.userId ?? '').localeCompare(
          String(b.userId ?? ''),
          undefined,
          { numeric: true, sensitivity: 'base' }
        );
      }),
    [filteredUsers]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(sortedUsers.length / itemsPerPage)
  );
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const currentItems = sortedUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Checks one user at a time. Backend response is expected as:
  // { success, user, balanceStatus, balances }
  const checkOneUser = useCallback(
    async (user) => {
      if (busyRef.current) return false;

      const userKey = getUserKey(user);
      if (user.userId === undefined || user.userId === null || String(user.userId).trim() === '') {
        setError('Is user ka userId nahi mila; balance endpoint ko userId chahiye.');
        return false;
      }

      if (!userKey) {
        setError('User ID nahi mili.');
        return false;
      }

      if (!user.depositAddress) {
        setUsers((previous) =>
          previous.map((item) =>
            getUserKey(item) === userKey
              ? {
                  ...item,
                  balances: [],
                  balanceStatus: 'no_address',
                  checkError: '',
                }
              : item
          )
        );
        setCheckMessage(`User ${userKey}: deposit address nahi hai.`);
        return false;
      }

      busyRef.current = true;
      setCheckingUserId(userKey);
      setError('');
      setCheckMessage(`Checking user ${userKey}...`);

      setUsers((previous) =>
        previous.map((item) =>
          getUserKey(item) === userKey
            ? { ...item, balanceStatus: 'checking', checkError: '' }
            : item
        )
      );

      try {
        const response = await api.get(
          `/admin/check-deposit-address/${encodeURIComponent(
            String(user.userId)
          )}`,
          getAuthConfig()
        );

        const payload = response.data;
        // Supports both root response and a { data: ... } wrapper.
        const result = payload?.data ?? payload;
        const checkedUser = result?.user;
        const balances = result?.balances;

        if (
          !payload?.success ||
          !checkedUser ||
          !Array.isArray(balances)
        ) {
          throw new Error(
            payload?.message ||
              'API response mein user ya balances nahi mile.'
          );
        }

        const normalizedBalances = NETWORKS.map((network) => {
          const found = balances.find(
            (balance) => balance.network === network.key
          );

          if (found) return found;

          return {
            network: network.key,
            name: network.label,
            status: 'error',
            message: 'Is network ka balance response mein nahi mila.',
            native: null,
            usdt: null,
          };
        });

        const allSuccess = normalizedBalances.every(
          (balance) => balance.status === 'success'
        );
        const anySuccess = normalizedBalances.some(
          (balance) => balance.status === 'success'
        );

        const updatedUser = {
          userId: checkedUser.userId ?? user.userId,
          name: checkedUser.name ?? user.name,
          depositAddress:
            checkedUser.depositAddress ?? user.depositAddress,
          balances: normalizedBalances,
          balanceStatus:
            result.balanceStatus ||
            (allSuccess ? 'success' : anySuccess ? 'partial' : 'error'),
          checkError: '',
        };

        setUsers((previous) =>
          previous.map((item) =>
            isSameUser(
              item,
              userKey,
              updatedUser.userId,
              user._id
            )
              ? { ...item, ...updatedUser }
              : item
          )
        );

        if (allSuccess) {
          setCheckMessage(`User ${userKey}: all networks checked successfully.`);
          return true;
        }

        const failed = normalizedBalances
          .filter((balance) => balance.status !== 'success')
          .map((balance) => balance.name || balance.network);

        setCheckMessage(
          `User ${userKey}: check incomplete. Failed: ${failed.join(', ')}.`
        );
        return false;
      } catch (err) {
        console.error(
          `Balance check failed for ${userKey}:`,
          err.response?.data || err
        );

        const message =
          err.response?.data?.message ||
          err.message ||
          'Balance check failed.';

        setUsers((previous) =>
          previous.map((item) =>
            getUserKey(item) === userKey
              ? {
                  ...item,
                  balanceStatus: 'error',
                  checkError: message,
                }
              : item
          )
        );

        setCheckMessage(`User ${userKey}: check failed.`);
        setError(message);
        return false;
      } finally {
        busyRef.current = false;
        setCheckingUserId('');
      }
    },
    [getAuthConfig]
  );

  const handleCheckOne = useCallback(
    async (user) => {
      if (busyRef.current || autoCheckingRef.current) return;
      await checkOneUser(user);
    },
    [checkOneUser]
  );

  const startAutoCheck = useCallback(async () => {
    if (busyRef.current || autoCheckingRef.current) return;

    autoCheckingRef.current = true;
    setAutoChecking(true);
    setError('');

    try {
      // Snapshot the current displayed/search-filtered order.
      const queue = [...sortedUsers];

      for (const queuedUser of queue) {
        if (!autoCheckingRef.current) break;

        // Read the latest state so successfully checked rows can be skipped.
        const latestUser = usersRef.current.find(
          (item) => getUserKey(item) === getUserKey(queuedUser)
        );

        if (!latestUser?.depositAddress) continue;
        if (isFullyChecked(latestUser)) continue;

        const succeeded = await checkOneUser(latestUser);

        // Keep scanning later IDs if one user's check fails.
        // Failed users remain marked and can be retried individually.
        if (!succeeded) {
          console.warn(
            `Auto Check: continuing after an incomplete check for ${getUserKey(latestUser)}.`
          );
        }
      }

      if (autoCheckingRef.current) {
        setCheckMessage('Auto Check queue complete. Failed users can be retried individually.');
      } else {
        setCheckMessage('Auto Check stopped after the current request.');
      }
    } finally {
      autoCheckingRef.current = false;
      setAutoChecking(false);
    }
  }, [sortedUsers, checkOneUser]);

  const stopAutoCheck = () => {
    autoCheckingRef.current = false;
    setAutoChecking(false);
    setCheckMessage(
      'Stop requested. Current user check will finish first.'
    );
  };

  const resetChecks = () => {
    if (busyRef.current || autoCheckingRef.current) return;

    setUsers((previous) =>
      previous.map((user) => ({
        ...user,
        balances: [],
        balanceStatus: user.depositAddress ? 'not_checked' : 'no_address',
        checkError: '',
      }))
    );
    setError('');
    setCheckMessage('Balances reset. Check users one at a time.');
  };

  const copyAddress = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
      setCheckMessage('Deposit address copied.');
    } catch (err) {
      console.error('Could not copy address:', err);
      window.prompt('Copy this address:', address);
    }
  };

  const getNetworkBalance = (user, networkKey) =>
    (user.balances || []).find((item) => item.network === networkKey);

  const getBalanceStatus = (user) => {
    if (user.balanceStatus === 'invalid_address') return 'Invalid address';
    if (user.balanceStatus === 'no_address') return 'No deposit address';
    if (user.balanceStatus === 'checking') return 'Checking...';
    if (user.balanceStatus === 'error') {
      return user.checkError || 'Check failed';
    }

    const balances = user.balances || [];
    if (!balances.length) return 'Not checked';

    const failed = balances.filter((item) => item.status !== 'success').length;
    if (failed === balances.length) return 'Check failed';
    if (failed > 0) return 'Partially checked';

    return 'All networks checked';
  };

  const usersWithAddress = users.filter(
    (user) => Boolean(user.depositAddress)
  ).length;

  const fullyCheckedCount = users.filter(isFullyChecked).length;

  return (
    <div className="mx-auto w-full max-w-[1800px] p-4 pt-12 md:pt-16">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-black uppercase tracking-wide text-slate-800">
            <Wallet className="text-orange-500" size={28} />
            Deposit Address Monitor
          </h2>
          <p className="mt-1 text-xs font-bold text-slate-500 md:text-sm">
            ETHEREUM · BNB SMART CHAIN · POLYGON · USDT
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={fetchUsersWithAddresses}
            disabled={loading || autoChecking || Boolean(checkingUserId)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 disabled:opacity-50"
          >
            <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
            Reload list
          </button>

          {!autoChecking ? (
            <button
              type="button"
              onClick={startAutoCheck}
              disabled={
                loading ||
                Boolean(checkingUserId) ||
                sortedUsers.length === 0
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white hover:bg-orange-600 disabled:opacity-50"
            >
              <Play size={16} />
              Auto Check
            </button>
          ) : (
            <button
              type="button"
              onClick={stopAutoCheck}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white"
            >
              <Square size={16} />
              Stop after current
            </button>
          )}

          <button
            type="button"
            onClick={resetChecks}
            disabled={autoChecking || Boolean(checkingUserId)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 disabled:opacity-50"
          >
            <RotateCcw size={16} />
            Reset checks
          </button>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase text-slate-500">Users found</p>
          <p className="mt-1 text-2xl font-black text-slate-800">
            {filteredUsers.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase text-slate-500">
            With deposit address
          </p>
          <p className="mt-1 text-2xl font-black text-slate-800">
            {usersWithAddress}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase text-slate-500">Fully checked</p>
          <p className="mt-1 text-2xl font-black text-emerald-700">
            {fullyCheckedCount}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            All three networks successful
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase text-slate-500">
            Networks per address
          </p>
          <p className="mt-1 text-2xl font-black text-slate-800">3</p>
          <p className="mt-1 text-xs text-slate-500">ETH · BNB · POL</p>
        </div>
      </div>

      {(autoChecking || checkingUserId) && (
        <div className="mb-5 rounded-xl border border-orange-200 bg-orange-50 p-4">
          <div className="flex items-center gap-2 font-bold text-orange-700">
            <RefreshCcw size={17} className="animate-spin" />
            {checkingUserId
              ? `Checking user ${checkingUserId}...`
              : 'Auto Check running...'}
          </div>
          <p className="mt-1 text-sm text-orange-700">
            Ek waqt par ek hi user ki request chalegi.
          </p>
        </div>
      )}

      {checkMessage && (
        <div className="mb-4 rounded-lg bg-slate-100 p-3 text-sm font-semibold text-slate-700">
          {checkMessage}
        </div>
      )}

      <div className="relative mb-5 w-full md:max-w-xl">
        <Search
          size={17}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search user ID, name or deposit address..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-slate-800 outline-none focus:border-orange-500"
        />
      </div>

      {error && (
        <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <div>
            <p>{error}</p>
            <button
              type="button"
              onClick={() => setError('')}
              className="mt-1 underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1350px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-4">User</th>
                <th className="px-4 py-4">Deposit address</th>
                {NETWORKS.map((network) => (
                  <th key={network.key} className="px-4 py-4">
                    <div>{network.label}</div>
                    <div className="mt-1 normal-case tracking-normal">
                      {network.native} + USDT
                    </div>
                  </th>
                ))}
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-slate-600">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center font-bold text-orange-500">
                    <RefreshCcw size={18} className="mx-auto mb-2 animate-spin" />
                    Loading user addresses...
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center font-bold text-slate-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                currentItems.map((user) => {
                  const userKey = getUserKey(user);
                  const isChecking = checkingUserId === userKey;

                  return (
                    <tr
                      key={user._id || userKey}
                      className="align-top hover:bg-slate-50"
                    >
                      <td className="px-4 py-4">
                        <div className="font-mono font-black text-slate-800">
                          #{user.userId ?? '—'}
                        </div>
                        <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                          <UserIcon size={12} />
                          {user.name || 'Unknown user'}
                        </div>
                      </td>

                      <td className="max-w-[250px] px-4 py-4">
                        {user.depositAddress ? (
                          <div className="flex items-start gap-2">
                            <span className="break-all font-mono text-xs">
                              {user.depositAddress}
                            </span>
                            <button
                              type="button"
                              title="Copy deposit address"
                              onClick={() => copyAddress(user.depositAddress)}
                              className="shrink-0 rounded p-1 text-slate-500 hover:bg-slate-200"
                            >
                              <Copy size={14} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">No address</span>
                        )}
                      </td>

                      {NETWORKS.map((network) => {
                        const result = getNetworkBalance(user, network.key);

                        return (
                          <td key={network.key} className="px-4 py-4">
                            {!result ? (
                              <span className="text-xs text-slate-400">
                                {isChecking ? 'Checking...' : 'Not checked'}
                              </span>
                            ) : result.status !== 'success' ? (
                              <div className="max-w-[190px] text-xs text-red-600">
                                <div className="flex items-center gap-1 font-bold">
                                  <AlertCircle size={13} />
                                  Check failed
                                </div>
                                <div className="mt-1 break-words text-slate-500">
                                  {result.message || 'Network unavailable'}
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <div>
                                  <div className="text-[10px] font-bold uppercase text-slate-400">
                                    {result.native?.symbol || network.native}
                                  </div>
                                  <div className="font-mono font-bold text-slate-800">
                                    {formatBalance(result.native?.balance)}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-[10px] font-bold uppercase text-slate-400">
                                    USDT
                                  </div>
                                  <div className="font-mono font-bold text-emerald-700">
                                    {formatBalance(result.usdt?.balance)}
                                  </div>
                                </div>
                              </div>
                            )}
                          </td>
                        );
                      })}

                      <td className="max-w-[190px] px-4 py-4">
                        {user.balanceStatus === 'success' && isFullyChecked(user) ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                            <CheckCircle size={14} />
                            Complete
                          </span>
                        ) : user.balanceStatus === 'invalid_address' ? (
                          <span className="text-xs font-bold text-red-600">
                            Invalid address
                          </span>
                        ) : user.balanceStatus === 'checking' ? (
                          <span className="text-xs font-bold text-orange-600">
                            Checking...
                          </span>
                        ) : (
                          <span className="break-words text-xs font-semibold text-amber-700">
                            {getBalanceStatus(user)}
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() => handleCheckOne(user)}
                          disabled={
                            Boolean(checkingUserId) ||
                            autoChecking ||
                            !user.depositAddress
                          }
                          className="inline-flex min-w-[110px] items-center justify-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isChecking ? (
                            <>
                              <RefreshCcw size={13} className="animate-spin" />
                              Checking
                            </>
                          ) : (
                            <>
                              <Search size={13} />
                              Check
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {!loading && sortedUsers.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <span>Rows per page:</span>
              <select
                value={itemsPerPage}
                onChange={(event) => {
                  setItemsPerPage(Number(event.target.value));
                  setCurrentPage(1);
                }}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1.5"
              >
                {[10, 20, 50, 100].map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between gap-3 text-xs font-bold text-slate-600 sm:justify-end">
              <span>
                Showing {startIndex + 1}–
                {Math.min(startIndex + itemsPerPage, sortedUsers.length)} of {sortedUsers.length}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={safePage === 1}
                className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <span>Page {safePage} of {totalPages}</span>
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={safePage === totalPages}
                className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        Each user is checked separately. Ethereum, BNB Smart Chain and Polygon
        balances are read-only. Failed network requests are displayed as errors,
        not zero balances. No transfers are initiated by this page.
      </p>
    </div>
  );
};

export default DepositAddressMonitor;
