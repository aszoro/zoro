// // import React, { useEffect, useState, useMemo } from "react"; 
// // import api from "../../api/axios"; 
// // import { useAuth } from "../../context/AuthContext"; 

// // const DirectTeamPage = () => {
// //   const { user } = useAuth();
// //   const [team, setTeam] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [entriesPerPage, setEntriesPerPage] = useState(10);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchDirectTeam = async () => {
// //       if (!user?.userId) return;

// //       try {
// //         setLoading(true);
// //         const res = await api.get(
// //           `/user/direct-team/${user.userId}?t=${new Date().getTime()}`
// //         );
        
// //         const teamData = Array.isArray(res.data.team) ? res.data.team : [];
// //         setTeam(teamData);

// //       } catch (err) {
// //         console.error("Error fetching direct team:", err);
// //         setTeam([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchDirectTeam();
// //   }, [user?.userId]);


// //   // useEffect(() => {
// //   //   const fetchDirectTeam = async () => {
// //   //     // Dhyan dena: check karna AuthContext mein 'userId' hai ya '_id'
// //   //     if (!user?.userId) return; 

// //   //     try {
// //   //       setLoading(true);
// //   //       const res = await api.get(
// //   //         `/user/direct-team/${user.userId}?t=${new Date().getTime()}`
// //   //       );
        
// //   //       // 🚨 CHROME CONSOLE MEIN YE LINE CHECK KARNA (F12 dabake)
// //   //       console.log("Direct Team API Response:", res.data); 

// //   //       // Backend kis format mein array bhej raha hai usko auto-handle karne ke liye:
// //   //       let teamData = [];
// //   //       if (Array.isArray(res.data)) {
// //   //         teamData = res.data; // Agar direct array aa raha hai
// //   //       } else if (Array.isArray(res.data.team)) {
// //   //         teamData = res.data.team; // Agar res.data.team mein hai
// //   //       } else if (Array.isArray(res.data.data)) {
// //   //         teamData = res.data.data; // Agar res.data.data mein hai
// //   //       } else if (Array.isArray(res.data.directs)) {
// //   //         teamData = res.data.directs; 
// //   //       }

// //   //       setTeam(teamData);

// //   //     } catch (err) {
// //   //       console.error("Error fetching direct team:", err);
// //   //       setTeam([]);
// //   //     } finally {
// //   //       setLoading(false);
// //   //     }
// //   //   };

// //   //   fetchDirectTeam();
// //   // }, [user?.userId]);

// //   // Search Logic
// //   const filtered = useMemo(() => {
// //     const s = search.toLowerCase();
// //     return team.filter((u) =>
// //       u.userId?.toString().includes(s) ||
// //       u.name?.toLowerCase().includes(s)
// //     );
// //   }, [team, search]);

// //   useEffect(() => {
// //     setCurrentPage(1);
// //   }, [search]);

// //   // Pagination Logic
// //   const indexOfLast = currentPage * entriesPerPage;
// //   const indexOfFirst = indexOfLast - entriesPerPage;
// //   const currentItems = filtered.slice(indexOfFirst, indexOfLast);
// //   const totalPages = Math.ceil(filtered.length / entriesPerPage) || 1;

// //   const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
// //   const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
// //   const handleEntriesChange = (e) => {
// //     setEntriesPerPage(Number(e.target.value));
// //     setCurrentPage(1);
// //   };

// //   return (
// //     <div className="w-full min-h-screen bg-[#0b1221] p-4 md:p-8 font-sans">
// //       {/* Main Background - Dark Navy */}
      
// //       {/* Inner Card Container with Gold Top Border */}
// //       <div className="max-w-7xl mx-auto bg-[#131c31] rounded-xl border-t-[3px] border-[#eab308] shadow-2xl p-4 sm:p-6">
        
// //         {/* Header Title */}
// //         <h2 className="text-2xl sm:text-3xl text-[#eab308] font-bold mb-6 tracking-wide">
// //           Direct Team Report
// //         </h2>

// //         {/* Filters (Entries & Search) */}
// //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 text-gray-300 text-sm">
          
// //           <div className="flex items-center gap-2">
// //             <span>Show</span>
// //             <select
// //               value={entriesPerPage}
// //               onChange={handleEntriesChange}
// //               className="bg-[#0b1221] border border-gray-700 text-[#eab308] rounded px-3 py-1.5 focus:outline-none focus:border-[#eab308] transition-colors"
// //             >
// //               <option value={10}>10</option>
// //               <option value={25}>25</option>
// //               <option value={50}>50</option>
// //               <option value={100}>100</option>
// //             </select>
// //             <span>entries</span>
// //           </div>

// //           <div className="flex items-center gap-2 w-full sm:w-auto">
// //             <span>Search:</span>
// //             <input
// //               type="text"
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               className="bg-[#0b1221] border border-gray-700 text-gray-200 rounded px-3 py-1.5 w-full sm:w-64 focus:outline-none focus:border-[#eab308] transition-colors placeholder-gray-500"
// //               placeholder="Search by ID or Name..."
// //             />
// //           </div>
// //         </div>

// //         {/* Table Container */}
// //         <div className="overflow-x-auto border border-gray-700 rounded-lg">
// //           <table className="w-full text-left whitespace-nowrap border-collapse">
// //             <thead className="text-[#eab308] bg-[#1a253e] text-sm border-b border-gray-700">
// //               <tr>
// //                 <th className="p-4 border-r border-gray-700/50 font-bold cursor-pointer"># <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// //                 <th className="p-4 border-r border-gray-700/50 font-bold cursor-pointer">Member ID <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// //                  <th className="p-4 border-r border-gray-700/50 font-bold cursor-pointer">Name <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// //                 <th className="p-4 border-r border-gray-700/50 font-bold cursor-pointer">Amount <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// //                  <th className="p-4 border-r border-gray-700/50 font-bold cursor-pointer">Status <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
// //                 <th className="p-4 font-bold cursor-pointer">Activation Date</th>
// //               </tr>
// //             </thead>

// //             <tbody className="text-gray-300 text-sm">
// //               {loading ? (
// //                 <tr>
// //                   <td colSpan="8" className="text-center py-8 text-[#eab308]">
// //                     Loading Data...
// //                   </td>
// //                 </tr>
// //               ) : currentItems.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="8" className="text-center py-8 text-gray-500">
// //                     No matching records found
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 currentItems.map((member, index) => {
// //                   const isActive = Number(member.topUpAmount) > 0;
// //                   const displayAmount = isActive ? `$${member.topUpAmount}` : `$0`;
// //                   const status = isActive ? 'active' : 'pending';
// //                   const statusColor = isActive ? 'text-green-400' : 'text-red-400';

// //                   return (
// //                     <tr key={member._id || index} className="border-b border-gray-700 hover:bg-[#1a253e] transition-colors">
// //                       <td className="p-4 border-r border-gray-700/50">{indexOfFirst + index + 1}</td>
// //                       <td className="p-4 border-r border-gray-700/50 font-medium text-white">{member.userId}</td>
// //                        <td className="p-4 border-r border-gray-700/50">{member.name || "-"}</td>
// //                       <td className="p-4 border-r border-gray-700/50 font-semibold text-[#eab308]">{displayAmount}</td>
// //                        <td className="p-4 border-r border-gray-700/50 capitalize font-medium">
// //                         <span className={statusColor}>{status}</span>
// //                       </td>
// //                       <td className="p-4">
// //                         {member.createdAt && isActive
// //                           ? new Date(member.createdAt).toLocaleDateString("en-GB")
// //                           : ""}
// //                       </td>
// //                     </tr>
// //                   );
// //                 })
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Pagination Footer */}
// //         <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-gray-400 text-sm gap-4">
// //           <div>
// //             Showing <span className="text-white font-medium">{filtered.length === 0 ? 0 : indexOfFirst + 1}</span> to <span className="text-white font-medium">{Math.min(indexOfLast, filtered.length)}</span> of <span className="text-white font-medium">{filtered.length}</span> entries
// //           </div>
          
// //           <div className="flex items-center bg-[#0b1221] rounded border border-gray-700 overflow-hidden">
// //             <button
// //               onClick={handlePrev}
// //               disabled={currentPage === 1}
// //               className={`px-4 py-2 transition-colors ${currentPage === 1 ? 'text-gray-600 bg-transparent cursor-not-allowed' : 'text-[#eab308] hover:bg-[#1a253e]'}`}
// //             >
// //               Previous
// //             </button>
// //             <div className="px-4 py-2 border-l border-r border-gray-700 bg-[#1a253e] text-[#eab308] font-bold">
// //               {currentPage}
// //             </div>
// //             <button
// //               onClick={handleNext}
// //               disabled={currentPage === totalPages || totalPages === 0}
// //               className={`px-4 py-2 transition-colors ${currentPage === totalPages || totalPages === 0 ? 'text-gray-600 bg-transparent cursor-not-allowed' : 'text-[#eab308] hover:bg-[#1a253e]'}`}
// //             >
// //               Next
// //             </button>
// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default DirectTeamPage;
















// import React, { useEffect, useState, useMemo } from "react"; 
// import api from "../../api/axios"; 
// import { useAuth } from "../../context/AuthContext"; 

// const DirectTeamPage = () => {
//   const { user } = useAuth();
//   const [team, setTeam] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDirectTeam = async () => {
//       if (!user?.userId) return;

//       try {
//         setLoading(true);
//         const res = await api.get(
//           `/user/direct-team/${user.userId}?t=${new Date().getTime()}`
//         );
        
//         const teamData = Array.isArray(res.data.team) ? res.data.team : [];
//         setTeam(teamData);

//       } catch (err) {
//         console.error("Error fetching direct team:", err);
//         setTeam([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDirectTeam();
//   }, [user?.userId]);

//   // Search Logic - Updated to include mobile number search
//   const filtered = useMemo(() => {
//     const s = search.toLowerCase();
//     return team.filter((u) =>
//       u.userId?.toString().toLowerCase().includes(s) ||
//       u.name?.toLowerCase().includes(s) ||
//       u.mobile?.includes(s)
//     );
//   }, [team, search]);

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

//   return (
//     <div className="w-full min-h-screen bg-[#0b1221] p-4 md:p-8 font-sans">
//       {/* Main Background - Dark Navy */}
      
//       {/* Inner Card Container with Gold Top Border */}
//       <div className="max-w-7xl mx-auto bg-[#131c31] rounded-xl border-t-[3px] border-[#eab308] shadow-2xl p-4 sm:p-6">
        
//         {/* Header Title */}
//         <h2 className="text-2xl sm:text-3xl text-[#eab308] font-bold mb-6 tracking-wide">
//           Direct Team Report
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
//               placeholder="Search by ID, Name or Mobile..."
//             />
//           </div>
//         </div>

//         {/* Table Container */}
//         <div className="overflow-x-auto border border-gray-700 rounded-lg">
//           <table className="w-full text-left whitespace-nowrap border-collapse">
//             <thead className="text-[#eab308] bg-[#1a253e] text-sm border-b border-gray-700">
//               <tr>
//                 <th className="p-4 border-r border-gray-700/50 font-bold cursor-pointer"># <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold cursor-pointer">Member ID <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                  <th className="p-4 border-r border-gray-700/50 font-bold cursor-pointer">Name <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                  {/* 🔥 Mobile Number Header */}
//                  <th className="p-4 border-r border-gray-700/50 font-bold cursor-pointer">Mobile <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                 <th className="p-4 border-r border-gray-700/50 font-bold cursor-pointer">Amount <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                  <th className="p-4 border-r border-gray-700/50 font-bold cursor-pointer">Status <span className="text-[10px] text-gray-500 ml-1">♦</span></th>
//                 <th className="p-4 font-bold cursor-pointer">Activation Date</th>
//               </tr>
//             </thead>

//             <tbody className="text-gray-300 text-sm">
//               {loading ? (
//                 <tr>
//                   <td colSpan="7" className="text-center py-8 text-[#eab308]">
//                     Loading Data...
//                   </td>
//                 </tr>
//               ) : currentItems.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="text-center py-8 text-gray-500">
//                     No matching records found
//                   </td>
//                 </tr>
//               ) : (
//                 currentItems.map((member, index) => {
//                   const isActive = Number(member.topUpAmount) > 0;
//                   const displayAmount = isActive ? `$${member.topUpAmount}` : `$0`;
//                   const status = isActive ? 'active' : 'pending';
//                   const statusColor = isActive ? 'text-green-400' : 'text-red-400';

//                   return (
//                     <tr key={member._id || index} className="border-b border-gray-700 hover:bg-[#1a253e] transition-colors">
//                       <td className="p-4 border-r border-gray-700/50">{indexOfFirst + index + 1}</td>
//                       <td className="p-4 border-r border-gray-700/50 font-medium text-white">{member.userId}</td>
//                        <td className="p-4 border-r border-gray-700/50">{member.name || "-"}</td>
                       
//                        {/* 🔥 Mobile Number with Call Button */}
//                        <td className="p-4 border-r border-gray-700/50">
//                          {member.mobile ? (
//                            <div className="flex items-center gap-3">
//                              <span className="tracking-wide text-gray-300">{member.mobile}</span>
//                              {/* Call Link using tel: scheme */}
//                              <a 
//                                href={`tel:${member.mobile}`}
//                                className="flex items-center gap-1 bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/40 hover:border-green-400 px-2 py-1 rounded text-xs font-semibold transition-all duration-200"
//                                title={`Call ${member.mobile}`}
//                              >
//                                📞 
//                              </a>
//                            </div>
//                          ) : (
//                            <span className="text-gray-500">-</span>
//                          )}
//                        </td>

//                       <td className="p-4 border-r border-gray-700/50 font-semibold text-[#eab308]">{displayAmount}</td>
//                        <td className="p-4 border-r border-gray-700/50 capitalize font-medium">
//                         <span className={statusColor}>{status}</span>
//                       </td>
//                       <td className="p-4">
//                         {member.createdAt && isActive
//                           ? new Date(member.createdAt).toLocaleDateString("en-GB")
//                           : ""}
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

// export default DirectTeamPage;


import React, { useEffect, useMemo, useState } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  Search,
  RefreshCw,
  Phone,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  UserRound,
  UsersRound,
  BadgeCheck,
  Clock3,
  X,
} from 'lucide-react';

const DirectTeamPage = () => {
  const { user } = useAuth();
  const [team, setTeam] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDirectTeam = async () => {
    if (!user?.userId) {
      setTeam([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await api.get(
        `/user/direct-team/${encodeURIComponent(user.userId)}?t=${Date.now()}`
      );
      setTeam(Array.isArray(response?.data?.team) ? response.data.team : []);
    } catch (fetchError) {
      console.error('Error fetching direct team:', fetchError);
      setError('Could not load your direct team. Please try again.');
      setTeam([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectTeam();
    // Fetch when the signed-in user ID changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.userId]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return team;

    return team.filter((member) =>
      String(member.userId ?? '').toLowerCase().includes(query) ||
      String(member.name ?? '').toLowerCase().includes(query) ||
      String(member.mobile ?? '').toLowerCase().includes(query)
    );
  }, [team, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, entriesPerPage]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / entriesPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const indexOfFirst = (safePage - 1) * entriesPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfFirst + entriesPerPage);
  const indexOfLast = Math.min(indexOfFirst + entriesPerPage, filtered.length);

  const activeCount = useMemo(
    () => team.filter((member) => Number(member.topUpAmount) > 0).length,
    [team]
  );

  const totalTopup = useMemo(
    () => team.reduce((sum, member) => sum + (Number(member.topUpAmount) || 0), 0),
    [team]
  );

  return (
    <main className="min-h-screen w-full bg-[#080811] px-3 py-5 font-sans text-slate-100 sm:px-5 sm:py-8 lg:px-8">
      <section className="mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border border-violet-500/20 bg-[#10101d] shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
        <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400" />

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-violet-200">
                <UsersRound size={14} />
                TEAM OVERVIEW
              </span>
              <h1 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                  <Users size={23} />
                </span>
                Direct Team Report
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                View your directly referred members, activation status, and top-up details.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchDirectTeam}
              disabled={loading}
              className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-xl border border-violet-400/25 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-200 transition hover:border-violet-300/50 hover:bg-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50 md:self-center"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/8 bg-[#151525] p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Direct members</p>
                <UserRound size={17} className="text-violet-300" />
              </div>
              <p className="mt-2 text-2xl font-bold tabular-nums text-white">{team.length}</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-[#151525] p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Active members</p>
                <BadgeCheck size={17} className="text-emerald-300" />
              </div>
              <p className="mt-2 text-2xl font-bold tabular-nums text-emerald-300">{activeCount}</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-[#151525] p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Team top-up total</p>
                <Users size={17} className="text-cyan-300" />
              </div>
              <p className="mt-2 text-2xl font-bold tabular-nums text-cyan-300">
                ${totalTopup.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-400">
              Show
              <select
                value={entriesPerPage}
                onChange={(event) => setEntriesPerPage(Number(event.target.value))}
                className="h-10 rounded-lg border border-white/10 bg-[#0b0b16] px-3 text-sm font-semibold text-violet-200 outline-none focus:border-violet-400/60"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              entries
            </label>

            <div className="relative w-full sm:max-w-md">
              <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by member ID, name, or mobile..."
                aria-label="Search direct team"
                className="h-11 w-full rounded-xl border border-white/10 bg-[#0b0b16] py-2 pl-10 pr-10 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/15"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-[#19182a] text-xs uppercase tracking-wider text-violet-200">
                    <th className="px-4 py-4 text-center font-bold">#</th>
                    <th className="px-4 py-4 font-bold">Member ID</th>
                    <th className="px-4 py-4 font-bold">Name</th>
                    <th className="px-4 py-4 font-bold">Mobile</th>
                    <th className="px-4 py-4 text-right font-bold">Amount</th>
                    <th className="px-4 py-4 text-center font-bold">Status</th>
                    <th className="px-4 py-4 font-bold">Activation Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-sm text-slate-300">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="px-5 py-14 text-center">
                        <span className="mx-auto mb-3 block h-8 w-8 animate-spin rounded-full border-2 border-violet-400/30 border-t-violet-300" />
                        <span className="text-sm font-medium text-violet-200">Loading team members...</span>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={7} className="px-5 py-12 text-center">
                        <p className="font-semibold text-rose-300">{error}</p>
                        <button
                          type="button"
                          onClick={fetchDirectTeam}
                          className="mt-4 rounded-lg border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200 hover:bg-rose-500/20"
                        >
                          Try again
                        </button>
                      </td>
                    </tr>
                  ) : currentItems.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-5 py-14 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-500">
                          <UsersRound size={22} />
                        </div>
                        <p className="font-semibold text-slate-200">No matching team members</p>
                        <p className="mt-1 text-xs text-slate-500">Try a different search term or refresh the report.</p>
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((member, index) => {
                      const isActive = Number(member.topUpAmount) > 0;
                      const amount = Number(member.topUpAmount) || 0;

                      return (
                        <tr
                          key={member._id || member.userId || index}
                          className="transition-colors hover:bg-violet-500/[0.06]"
                        >
                          <td className="px-4 py-4 text-center font-semibold text-slate-500">
                            {indexOfFirst + index + 1}
                          </td>
                          <td className="px-4 py-4">
                            <span className="inline-flex rounded-lg border border-violet-400/20 bg-violet-500/10 px-2.5 py-1.5 font-mono text-xs font-bold text-violet-200">
                              {member.userId || '-'}
                            </span>
                          </td>
                          <td className="px-4 py-4 font-medium text-slate-100">{member.name || '-'}</td>
                          <td className="px-4 py-4">
                            {member.mobile ? (
                              <div className="flex items-center gap-2">
                                <span className="tracking-wide text-slate-300">{member.mobile}</span>
                                <a
                                  href={`tel:${encodeURIComponent(String(member.mobile))}`}
                                  aria-label={`Call ${member.mobile}`}
                                  title={`Call ${member.mobile}`}
                                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 transition hover:border-emerald-300/50 hover:bg-emerald-400/20"
                                >
                                  <Phone size={14} />
                                </a>
                              </div>
                            ) : (
                              <span className="text-slate-500">-</span>
                            )}
                          </td>
                          <td className="px-4 py-4 text-right font-bold tabular-nums text-cyan-300">
                            ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide ${isActive ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300' : 'border-amber-400/20 bg-amber-400/10 text-amber-200'}`}>
                              {isActive ? <BadgeCheck size={13} /> : <Clock3 size={13} />}
                              {isActive ? 'Active' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            {member.createdAt && isActive ? (
                              <span className="inline-flex items-center gap-2 whitespace-nowrap text-slate-400">
                                <CalendarDays size={14} className="text-violet-300" />
                                {new Date(member.createdAt).toLocaleDateString('en-GB')}
                              </span>
                            ) : (
                              <span className="text-slate-600">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 border-t border-white/[0.06] pt-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing <span className="font-semibold text-white">{filtered.length === 0 ? 0 : indexOfFirst + 1}</span>
              {' '}to <span className="font-semibold text-white">{indexOfLast}</span>
              {' '}of <span className="font-semibold text-white">{filtered.length}</span> entries
            </p>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
                disabled={safePage <= 1 || loading}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-white/10 bg-[#151525] px-3 text-sm font-semibold text-slate-300 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              <span className="flex h-10 min-w-20 items-center justify-center rounded-lg border border-violet-400/20 bg-violet-500/10 px-3 font-bold text-violet-200">
                {safePage} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
                disabled={safePage >= totalPages || loading}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-white/10 bg-[#151525] px-3 text-sm font-semibold text-slate-300 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DirectTeamPage;
