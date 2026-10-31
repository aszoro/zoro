// import React, { useEffect, useState, useMemo } from "react";
// import api from "../../api/axios"; 
// import useAuth from "../../hooks/useAuth"; 

// const AllTeamPage = () => {
//   const { user } = useAuth();
//   const [team, setTeam] = useState([]);
//   const [stats, setStats] = useState({
//     totalTeam: 0,
//     activeTeam: 0
//   });
  
//   const [search, setSearch] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!user?.userId) return;

//     const fetchAllTeam = async () => {
//       setIsLoading(true); 
//       try {
//         const res = await api.get(`/user/all-team/${user.userId}?t=${new Date().getTime()}`);
        
//         let teamData = (res.data.team || []).filter(u => u.level > 0);
//         setTeam(teamData);
        
//         setStats({
//           totalTeam: teamData.length,
//           activeTeam: teamData.filter(u => u.topUpAmount > 0).length
//         });
//       } catch (err) {
//         console.error("Error fetching all team:", err);
//       } finally {
//         setIsLoading(false); 
//       }
//     };
//     fetchAllTeam();
//   }, [user?.userId]);

//   const sortedAndFilteredTeam = useMemo(() => {
//     let filtered = team.filter(
//       (u) =>
//         u.userId?.toString().toLowerCase().includes(search.toLowerCase()) ||
//         u.name?.toLowerCase().includes(search.toLowerCase())
//     );

//     return filtered.sort((a, b) => {
//       if (!sortConfig.key) return 0;
//       let aValue = a[sortConfig.key] || "";
//       let bValue = b[sortConfig.key] || "";
      
//       if (typeof aValue === "string") aValue = aValue.toLowerCase();
//       if (typeof bValue === "string") bValue = bValue.toLowerCase();
      
//       if (sortConfig.key === "createdAt") {
//         aValue = new Date(a.createdAt).getTime();
//         bValue = new Date(b.createdAt).getTime();
//       }
      
//       if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
//       if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
//       return 0;
//     });
//   }, [team, search, sortConfig]);

//   const indexOfLast = currentPage * entriesPerPage;
//   const indexOfFirst = indexOfLast - entriesPerPage;
//   const currentItems = sortedAndFilteredTeam.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(sortedAndFilteredTeam.length / entriesPerPage) || 1;

//   const handleNext = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);
//   const handlePrev = () => currentPage > 1 && setCurrentPage(prev => prev - 1);
//   const handleEntriesChange = (e) => {
//     setEntriesPerPage(parseInt(e.target.value));
//     setCurrentPage(1);
//   };

//   const handleSort = (key) => {
//     if (!key) return; 
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const tableColumns = [
//     { label: "#", key: null },
//     { label: "Date", key: "createdAt" },
//     { label: "Level", key: "level" },
//     { label: "User ID", key: "userId" },
//     { label: "Name", key: "name" },
//     { label: "Country", key: "country" },
//   ];

//   return (
//     <div className="w-full min-h-screen bg-[#0b1221] p-4 md:p-8 font-sans">
      
//       {/* Inner Card Container */}
//       <div className="max-w-7xl mx-auto bg-[#131c31] rounded-xl border-t-[3px] border-[#eab308] shadow-2xl p-4 sm:p-6">
        
//         {/* Header Title */}
//         <h2 className="text-2xl sm:text-3xl text-[#eab308] font-bold mb-6 tracking-wide">
//           All Team Report
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
//               onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
//               className="bg-[#0b1221] border border-gray-700 text-gray-200 rounded px-3 py-1.5 w-full sm:w-64 focus:outline-none focus:border-[#eab308] transition-colors placeholder-gray-500"
//               placeholder="Search by ID or Name..."
//             />
//           </div>
//         </div>

//         {/* Table Container */}
//         <div className="overflow-x-auto border border-gray-700 rounded-lg">
//           <table className="w-full text-left whitespace-nowrap border-collapse">
//             <thead className="text-[#eab308] bg-[#1a253e] text-sm border-b border-gray-700">
//               <tr>
//                 {tableColumns.map((col) => (
//                   <th
//                     key={col.label}
//                     onClick={() => handleSort(col.key)}
//                     className={`p-4 border-r border-gray-700/50 font-bold ${col.key ? 'cursor-pointer select-none hover:text-yellow-400' : ''}`}
//                   >
//                     {col.label}
//                     {col.key && (
//                       <span className="text-[10px] text-gray-500 ml-1">
//                         {sortConfig.key === col.key 
//                           ? (sortConfig.direction === "asc" ? "▲" : "▼") 
//                           : "♦"}
//                       </span>
//                     )}
//                     {!col.key && <span className="text-[10px] text-gray-500 ml-1">♦</span>}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody className="text-gray-300 text-sm">
//               {isLoading ? (
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
//                 currentItems.map((u, index) => (
//                   <tr key={u._id || index} className="border-b border-gray-700 hover:bg-[#1a253e] transition-colors">
//                     <td className="p-4 border-r border-gray-700/50">{indexOfFirst + index + 1}</td>
//                     <td className="p-4 border-r border-gray-700/50">
//                       {u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-GB") : "-"}
//                     </td>
//                     <td className="p-4 border-r border-gray-700/50 font-semibold text-[#eab308]">
//                       L-{u.level}
//                     </td>
//                     <td className="p-4 border-r border-gray-700/50 font-medium text-white">
//                       {u.userId}
//                     </td>
//                     <td className="p-4 border-r border-gray-700/50">
//                       {u.name || "-"}
//                     </td>
//                     <td className="p-4">
//                       {u.country || "-"}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination Footer */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-gray-400 text-sm gap-4">
//           <div>
//             Showing <span className="text-white font-medium">{sortedAndFilteredTeam.length === 0 ? 0 : indexOfFirst + 1}</span> to <span className="text-white font-medium">{Math.min(indexOfLast, sortedAndFilteredTeam.length)}</span> of <span className="text-white font-medium">{sortedAndFilteredTeam.length}</span> entries
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

// export default AllTeamPage;


import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import {
  UsersRound,
  Users,
  Search,
  RefreshCw,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  BadgeCheck,
  Clock3,
  X,
  Globe2,
  Layers3,
} from "lucide-react";

const AllTeamPage = () => {
  const { user } = useAuth();
  const [team, setTeam] = useState([]);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllTeam = async () => {
    if (!user?.userId) {
      setTeam([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await api.get(
        `/user/all-team/${encodeURIComponent(user.userId)}?t=${Date.now()}`
      );
      const teamData = Array.isArray(response?.data?.team)
        ? response.data.team.filter((member) => Number(member.level) > 0)
        : [];
      setTeam(teamData);
    } catch (fetchError) {
      console.error("Error fetching all team:", fetchError);
      setError("Unable to load your team report. Please try again.");
      setTeam([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTeam();
    // Fetch again when the signed-in user's ID changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.userId]);

  const sortedAndFilteredTeam = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = team.filter((member) => {
      return (
        String(member.userId ?? "").toLowerCase().includes(query) ||
        String(member.name ?? "").toLowerCase().includes(query) ||
        String(member.country ?? "").toLowerCase().includes(query) ||
        String(member.level ?? "").toLowerCase().includes(query)
      );
    });

    return [...filtered].sort((a, b) => {
      if (!sortConfig.key) return 0;

      let aValue = a[sortConfig.key] ?? "";
      let bValue = b[sortConfig.key] ?? "";

      if (sortConfig.key === "createdAt") {
        aValue = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        bValue = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      } else if (sortConfig.key === "level") {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      } else {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [team, search, sortConfig]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, entriesPerPage]);

  const totalPages = Math.max(1, Math.ceil(sortedAndFilteredTeam.length / entriesPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const indexOfFirst = (safePage - 1) * entriesPerPage;
  const indexOfLast = Math.min(indexOfFirst + entriesPerPage, sortedAndFilteredTeam.length);
  const currentItems = sortedAndFilteredTeam.slice(indexOfFirst, indexOfLast);

  const activeTeam = useMemo(
    () => team.filter((member) => Number(member.topUpAmount) > 0).length,
    [team]
  );

  const handleSort = (key) => {
    if (!key) return;
    setSortConfig((previous) => ({
      key,
      direction:
        previous.key === key && previous.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <main className="min-h-screen w-full bg-[#080811] px-3 py-5 font-sans text-slate-100 sm:px-5 sm:py-8 lg:px-8">
      <section className="mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border border-violet-500/20 bg-[#10101d] shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
        <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400" />

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-violet-200">
                <UsersRound size={14} />
                NETWORK OVERVIEW
              </span>
              <h1 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                  <Users size={23} />
                </span>
                All Team Report
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Review your team network, member levels, countries, and joining dates.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchAllTeam}
              disabled={isLoading}
              className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-xl border border-violet-400/25 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-200 transition hover:border-violet-300/50 hover:bg-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50 md:self-center"
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/8 bg-[#151525] p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Total team</p>
                <UsersRound size={17} className="text-violet-300" />
              </div>
              <p className="mt-2 text-2xl font-bold tabular-nums text-white">{team.length}</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-[#151525] p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Active team</p>
                <BadgeCheck size={17} className="text-emerald-300" />
              </div>
              <p className="mt-2 text-2xl font-bold tabular-nums text-emerald-300">{activeTeam}</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-[#151525] p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Team levels</p>
                <Layers3 size={17} className="text-cyan-300" />
              </div>
              <p className="mt-2 text-2xl font-bold tabular-nums text-cyan-300">
                {new Set(team.map((member) => member.level).filter((level) => level != null)).size}
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
                placeholder="Search by ID, name, country, or level..."
                aria-label="Search all team members"
                className="h-11 w-full rounded-xl border border-white/10 bg-[#0b0b16] py-2 pl-10 pr-10 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/15"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-[#19182a] text-xs uppercase tracking-wider text-violet-200">
                    {[
                      { label: "#", key: null },
                      { label: "Date", key: "createdAt" },
                      { label: "Level", key: "level" },
                      { label: "User ID", key: "userId" },
                      { label: "Name", key: "name" },
                      { label: "Country", key: "country" },
                    ].map((column) => (
                      <th
                        key={column.label}
                        scope="col"
                        aria-sort={
                          sortConfig.key === column.key
                            ? sortConfig.direction === "asc"
                              ? "ascending"
                              : "descending"
                            : "none"
                        }
                        onClick={() => handleSort(column.key)}
                        className={`px-4 py-4 font-bold ${
                          column.key
                            ? "cursor-pointer select-none transition hover:text-cyan-200"
                            : ""
                        }`}
                      >
                        <span className="inline-flex items-center gap-2">
                          {column.label}
                          {column.key && (
                            <ArrowUpDown
                              size={13}
                              className={
                                sortConfig.key === column.key
                                  ? "text-cyan-300"
                                  : "text-slate-600"
                              }
                            />
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-sm text-slate-300">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-14 text-center">
                        <span className="mx-auto mb-3 block h-8 w-8 animate-spin rounded-full border-2 border-violet-400/30 border-t-violet-300" />
                        <span className="text-sm font-medium text-violet-200">Loading team records...</span>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-12 text-center">
                        <p className="font-semibold text-rose-300">{error}</p>
                        <button
                          type="button"
                          onClick={fetchAllTeam}
                          className="mt-4 rounded-lg border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200 hover:bg-rose-500/20"
                        >
                          Try again
                        </button>
                      </td>
                    </tr>
                  ) : currentItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-14 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-500">
                          <UsersRound size={22} />
                        </div>
                        <p className="font-semibold text-slate-200">No matching team members</p>
                        <p className="mt-1 text-xs text-slate-500">Try a different search term or refresh the report.</p>
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((member, index) => (
                      <tr
                        key={member._id || member.userId || index}
                        className="transition-colors hover:bg-violet-500/[0.06]"
                      >
                        <td className="px-4 py-4 text-center font-semibold text-slate-500">
                          {indexOfFirst + index + 1}
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-2 whitespace-nowrap text-slate-300">
                            <CalendarDays size={14} className="shrink-0 text-violet-300" />
                            {member.createdAt
                              ? new Date(member.createdAt).toLocaleDateString("en-GB")
                              : "-"}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1.5 font-mono text-xs font-bold text-cyan-200">
                            L-{member.level}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex rounded-lg border border-violet-400/20 bg-violet-500/10 px-2.5 py-1.5 font-mono text-xs font-bold text-violet-200">
                            {member.userId || "-"}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-medium text-slate-100">{member.name || "-"}</td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-2 text-slate-300">
                            <Globe2 size={14} className="text-slate-500" />
                            {member.country || "-"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 border-t border-white/[0.06] pt-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing <span className="font-semibold text-white">{sortedAndFilteredTeam.length === 0 ? 0 : indexOfFirst + 1}</span>
              {" "}to <span className="font-semibold text-white">{indexOfLast}</span>
              {" "}of <span className="font-semibold text-white">{sortedAndFilteredTeam.length}</span> entries
            </p>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
                disabled={safePage <= 1 || isLoading}
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
                disabled={safePage >= totalPages || isLoading}
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

export default AllTeamPage;
