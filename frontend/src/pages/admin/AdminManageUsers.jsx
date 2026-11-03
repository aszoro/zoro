// // // import React, { useState, useEffect, useCallback } from "react";
// // // import api from "../../api/axios"; 
// // // import { Search, UserCog, LogIn, X, Crown, ShieldAlert } from "lucide-react";
// // // import { toast } from "react-toastify";

// // // const AdminManageUsers = () => {
// // //   const [users, setUsers] = useState([]);
// // //   const [loading, setLoading] = useState(true);
  
// // //   // Pagination & Filters
// // //   const [search, setSearch] = useState("");
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [itemsPerPage, setItemsPerPage] = useState(20);
// // //   const [totalCount, setTotalCount] = useState(0);
// // //   const [totalPages, setTotalPages] = useState(1);

// // //   // Modal State
// // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // //   const [selectedUser, setSelectedUser] = useState(null);
// // //   const [newRole, setNewRole] = useState("");
// // //   const [adminPassword, setAdminPassword] = useState("");
// // //   const [updating, setUpdating] = useState(false);

// // //   // 🔥 SERVER-SIDE FETCH FUNCTION
// // //   const fetchUsers = useCallback(async () => {
// // //     setLoading(true);
// // //     try {
// // //       const adminToken = localStorage.getItem('adminToken');
      
// // //       // Seedha backend ko filter query aur page details bhej rahe hain
// // //       const res = await api.get(`/admin/all-users?search=${search}&page=${currentPage}&limit=${itemsPerPage}`, {
// // //         headers: { Authorization: `Bearer ${adminToken}` }
// // //       });
      
// // //       if (res.data && res.data.success) {
// // //         setUsers(res.data.users || []);
// // //         setTotalCount(res.data.totalCount || 0);
// // //         setTotalPages(res.data.totalPages || 1);
// // //       }
// // //     } catch (err) {
// // //       toast.error("Failed to load users");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, [search, currentPage, itemsPerPage]);

// // //   // Trigger fetch whenever page, search or limit changes
// // //   useEffect(() => {
// // //     fetchUsers();
// // //   }, [fetchUsers]);

// // //   // Reset page to 1 when search query changes
// // //   const handleSearchChange = (e) => {
// // //     setSearch(e.target.value);
// // //     setCurrentPage(1);
// // //   };

// // //   // 🔥 DIRECT LOGIN LOGIC 
// // //   // const handleLoginAsUser = async (targetUserId) => {
// // //   //   try {
// // //   //     const adminToken = localStorage.getItem('adminToken');
// // //   //     if (!adminToken) return toast.error("Admin not authorized");

// // //   //     const res = await api.post('/admin/impersonate', { userId: targetUserId }, {
// // //   //       headers: { Authorization: `Bearer ${adminToken}` }
// // //   //     });

// // //   //     const { token: userToken, user: impersonatedUser } = res.data;
// // //   //     const userDataStr = JSON.stringify(impersonatedUser);
      
// // //   //     const targetBaseUrl = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" 
// // //   //       ? "http://localhost:3000" 
// // //   //       : "https://zorogames.net"; 

// // //   //     const mainWebsiteUrl = `${targetBaseUrl}/login?token=${userToken}&user=${encodeURIComponent(userDataStr)}`;
// // //   //     window.open(mainWebsiteUrl, '_blank', 'noopener,noreferrer');
      
// // //   //   } catch (err) {
// // //   //     toast.error(err.response?.data?.message || "Failed to login as this user.");
// // //   //   }
// // //   // };

// // //   // 🔥 UPDATE ROLE LOGIC
// // //   const handleUpdateRole = async (e) => {
// // //     e.preventDefault();
// // //     if (!adminPassword) return toast.error("Admin password is required!");
    
// // //     setUpdating(true);
// // //     try {
// // //       const adminToken = localStorage.getItem('adminToken');
// // //       const res = await api.put(`/admin/update-role/${selectedUser.userId}`, {
// // //         newRole, adminPassword
// // //       }, {
// // //         headers: { Authorization: `Bearer ${adminToken}` }
// // //       });

// // //       if (res.data.success) {
// // //         toast.success(res.data.message);
// // //         setIsModalOpen(false);
// // //         setAdminPassword("");
// // //         fetchUsers(); // Live reload data
// // //       }
// // //     } catch (err) {
// // //       toast.error(err.response?.data?.message || "Failed to update role");
// // //     } finally {
// // //       setUpdating(false);
// // //     }
// // //   };

// // //   const openRoleModal = (user) => {
// // //     setSelectedUser(user);
// // //     const currentRole = user.role ? user.role.toLowerCase() : 'user';
// // //     setNewRole(currentRole); // 🔥 Set exactly to user's current role
// // //     setAdminPassword("");
// // //     setIsModalOpen(true);
// // //   };

// // //   return (
// // //     <div className="p-4 text-black">
// // //       <div className="flex flex-col pt-12 xl:flex-row xl:items-center xl:justify-between gap-4 mb-6">
// // //         <div>
// // //           <h2 className="text-2xl font-black text-gray-800 uppercase tracking-wide flex items-center gap-2">
// // //              <UserCog className="text-indigo-600" size={26} /> Manage Roles & Leaders
// // //           </h2>
// // //           <p className="text-gray-500 text-sm font-medium mt-1">View all Leaders. Search by Any ID to assign new roles.</p>
// // //         </div>

// // //         <div className="flex flex-col md:flex-row gap-2 w-full xl:w-auto">
// // //           <div className="relative">
// // //             <Search size={16} className="absolute top-3 left-3 text-black" />
// // //             <input type="text" className="border border-gray-300 text-black rounded px-3 py-2 pl-9 w-full md:w-64" placeholder="Search Any ID or Name..." value={search} onChange={handleSearchChange} />
// // //           </div>
// // //           <select className="border border-gray-300 text-black rounded px-3 py-2 bg-white" value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
// // //             <option value={10}>Show 10</option>
// // //             <option value={20}>Show 20</option>
// // //             <option value={50}>Show 50</option>
// // //           </select>
// // //         </div>
// // //       </div>

// // //       <div className="overflow-auto border rounded shadow">
// // //         {loading ? (
// // //           <div className="p-8 text-center text-gray-600 font-bold">⏳ Loading fresh data from database...</div>
// // //         ) : (
// // //           <table className="min-w-full bg-white text-sm text-left">
// // //             <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
// // //               <tr>
// // //                 <th className="px-4 py-3 border">User ID</th>
// // //                 <th className="px-4 py-3 border">Name</th>
// // //                 <th className="px-4 py-3 border text-center">Role</th>
// // //                 <th className="px-4 py-3 border text-right">Balance</th>
// // //                 <th className="px-4 py-3 border text-center">Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {users.length === 0 ? (
// // //                 <tr><td colSpan="5" className="text-center px-4 py-8 text-gray-500 font-medium">No users found. Try searching by ID to find old or new members.</td></tr>
// // //               ) : (
// // //                 users.map((u, idx) => {
// // //                   const safeRole = u.role ? u.role.toLowerCase() : 'user';
                  
// // //                   return (
// // //                     <tr key={idx} className="hover:bg-gray-50">
// // //                       <td className="px-4 py-2 border font-bold text-gray-800">{u.userId}</td>
// // //                       <td className="px-4 py-2 border font-medium text-gray-800">{u.name}</td>
// // //                       <td className="px-4 py-2 border text-center">
                        
// // //                         {/* 🔥 SUPER LEADER & LEADER BADGES 🔥 */}
// // //                         {safeRole === 'superleader' ? (
// // //                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase border bg-purple-100 text-purple-800 border-purple-200">
// // //                              <Crown size={12}/> Super Leader
// // //                            </span>
// // //                         ) : safeRole === 'leader' ? (
// // //                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase border bg-orange-100 text-orange-800 border-orange-200">
// // //                              <Crown size={12}/> Leader
// // //                            </span>
// // //                         ) : (
// // //                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase border bg-gray-100 text-gray-600 border-gray-200">
// // //                              User
// // //                            </span>
// // //                         )}

// // //                       </td>
// // //                       <td className="px-4 py-2 border font-bold text-green-600 text-right">${Number(u.walletBalance || 0).toFixed(2)}</td>
// // //                       <td className="px-4 py-2 border">
// // //                         <div className="flex justify-center gap-2">
// // //                           <button onClick={() => openRoleModal(u)} className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1"><UserCog size={14} /> Edit Role</button>
// // // {/*                         
// // //                         <button onClick={() => handleLoginAsUser(u.userId)} className="bg-green-100 text-green-700 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1"><LogIn size={14} /> Login</button>
// // //                         */}
// // //                         </div>
// // //                       </td>
// // //                     </tr>
// // //                   );
// // //                 })
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         )}
// // //       </div>

// // //       {/* Pagination Footer */}
// // //       {!loading && users.length > 0 && (
// // //         <div className="flex justify-between items-center mt-4 text-sm">
// // //           <span className="text-gray-600">Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} users</span>
// // //           <div className="flex gap-2">
// // //             <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded bg-white disabled:opacity-50">Prev</button>
// // //             <button className="px-3 py-1 border rounded bg-indigo-600 text-white font-bold">{currentPage}</button>
// // //             <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded bg-white disabled:opacity-50">Next</button>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* MODAL */}
// // //       {isModalOpen && selectedUser && (
// // //         <div className="fixed inset-0 bg-slate-900 bg-opacity-40 backdrop-blur-sm z-[1000] flex justify-center items-center p-4">
// // //           <div className="bg-white border p-6 rounded-xl w-full max-w-md shadow-2xl">
// // //              <div className="flex justify-between items-center mb-6">
// // //                 <h3 className="text-gray-800 text-lg font-black uppercase flex items-center gap-2"><ShieldAlert className="text-green-500" /> Change Role</h3>
// // //                 <button onClick={() => setIsModalOpen(false)} className="text-black hover:text-red-500"><X size={24}/></button>
// // //              </div>
// // //              <form onSubmit={handleUpdateRole} className="space-y-4">
// // //                 <div>
// // //                    <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">Select Role</label>
                   
// // //                    {/* 🔥 UPDATED DROPDOWN MENU 🔥 */}
// // //                    <select value={newRole} onChange={e => setNewRole(e.target.value)} className="w-full border rounded-lg px-4 py-3 font-bold uppercase outline-none">
// // //                       <option value="user">Normal User (No bonus)</option>
// // //                       <option value="leader">Leader (+$30 Showcase)</option>
// // //                       <option value="superleader">Super Leader (VIP, No bonus)</option>
// // //                    </select>
                   
// // //                 </div>
// // //                 <div>
// // //                    <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">Admin Password</label>
// // //                    <input type="password" placeholder="Verify Admin Password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} className="w-full border rounded-lg px-4 py-3 outline-none" required />
// // //                 </div>
// // //                 <button type="submit" disabled={updating} className={`w-full py-3.5 rounded-lg font-black text-sm uppercase ${updating ? 'bg-gray-200 text-gray-400' : 'bg-indigo-600 text-white shadow-lg'}`}>
// // //                   {updating ? "WAIT..." : "UPDATE"}
// // //                 </button>
// // //              </form>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default AdminManageUsers;




// // import React, { useState, useEffect, useCallback } from "react";
// // import api from "../../api/axios";
// // import {
// //   Search,
// //   UserCog,
// //   X,
// //   Crown,
// //   ShieldAlert,
// //   ShieldCheck,
// //   User,
// //   BadgeCheck,
// // } from "lucide-react";
// // import { toast } from "react-toastify";

// // const ROLE_OPTIONS = [
// //   { value: "user", label: "Normal User", color: "bg-gray-100 text-gray-700 border-gray-200" },
// //   { value: "admin", label: "Admin", color: "bg-blue-100 text-blue-800 border-blue-200" },
// //   { value: "promo", label: "Promo Account", color: "bg-orange-100 text-orange-800 border-orange-200" },
// //   { value: "master", label: "Master ID", color: "bg-purple-100 text-purple-800 border-purple-200" },
// // ];

// // const AdminManageUsers = () => {
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Pagination and filters
// //   const [search, setSearch] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [itemsPerPage, setItemsPerPage] = useState(20);
// //   const [totalCount, setTotalCount] = useState(0);
// //   const [totalPages, setTotalPages] = useState(1);

// //   // Role modal
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [newRole, setNewRole] = useState("user");
// //   const [adminPassword, setAdminPassword] = useState("");
// //   const [updating, setUpdating] = useState(false);

// //   // Fetch users
// //   const fetchUsers = useCallback(async () => {
// //     setLoading(true);

// //     try {
// //       const adminToken = localStorage.getItem("adminToken");

// //       const res = await api.get(
// //         `/admin/all-users?search=${encodeURIComponent(search)}&page=${currentPage}&limit=${itemsPerPage}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${adminToken}`,
// //           },
// //         }
// //       );

// //       if (res.data?.success) {
// //         setUsers(res.data.users || []);
// //         setTotalCount(res.data.totalCount || 0);
// //         setTotalPages(res.data.totalPages || 1);
// //       }
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Failed to load users");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [search, currentPage, itemsPerPage]);

// //   useEffect(() => {
// //     fetchUsers();
// //   }, [fetchUsers]);

// //   const handleSearchChange = (e) => {
// //     setSearch(e.target.value);
// //     setCurrentPage(1);
// //   };

// //   // Open role modal
// //   const openRoleModal = (user) => {
// //     setSelectedUser(user);
// //     setNewRole(
// //       ROLE_OPTIONS.some((role) => role.value === user.role?.toLowerCase())
// //         ? user.role.toLowerCase()
// //         : "user"
// //     );
// //     setAdminPassword("");
// //     setIsModalOpen(true);
// //   };

// //   // Update user role
// //   const handleUpdateRole = async (e) => {
// //     e.preventDefault();

// //     if (!selectedUser?.userId) {
// //       return toast.error("User ID not found");
// //     }

// //     if (!adminPassword.trim()) {
// //       return toast.error("Admin password is required!");
// //     }

// //     if (!ROLE_OPTIONS.some((role) => role.value === newRole)) {
// //       return toast.error("Invalid role selected");
// //     }

// //     if (newRole === selectedUser.role?.toLowerCase()) {
// //       return toast.info("User already has this role");
// //     }

// //     setUpdating(true);

// //     try {
// //       const adminToken = localStorage.getItem("adminToken");

// //       if (!adminToken) {
// //         toast.error("Admin not authorized");
// //         return;
// //       }

// //       const res = await api.put(
// //         `/admin/update-role/${encodeURIComponent(selectedUser.userId)}`,
// //         {
// //           newRole,
// //           adminPassword,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${adminToken}`,
// //           },
// //         }
// //       );

// //       if (res.data?.success) {
// //         toast.success(res.data.message || "User role updated successfully");

// //         setIsModalOpen(false);
// //         setSelectedUser(null);
// //         setAdminPassword("");

// //         await fetchUsers();
// //       }
// //     } catch (err) {
// //       toast.error(
// //         err.response?.data?.message || "Failed to update user role"
// //       );
// //     } finally {
// //       setUpdating(false);
// //     }
// //   };

// //   const getRoleDetails = (role) => {
// //     const safeRole = String(role || "user").toLowerCase();

// //     return (
// //       ROLE_OPTIONS.find((item) => item.value === safeRole) ||
// //       ROLE_OPTIONS[0]
// //     );
// //   };

// //   const RoleBadge = ({ role }) => {
// //     const details = getRoleDetails(role);

// //     const RoleIcon =
// //       role === "master"
// //         ? Crown
// //         : role === "admin"
// //         ? ShieldCheck
// //         : role === "promo"
// //         ? BadgeCheck
// //         : User;

// //     return (
// //       <span
// //         className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1 text-[10px] font-bold uppercase ${details.color}`}
// //       >
// //         <RoleIcon size={12} />
// //         {details.label}
// //       </span>
// //     );
// //   };

// //   return (
// //     <div className="p-4 text-black">
// //       {/* Header */}
// //       <div className="mb-6 flex flex-col gap-4 pt-12 xl:flex-row xl:items-center xl:justify-between">
// //         <div>
// //           <h2 className="flex items-center gap-2 text-2xl font-black uppercase tracking-wide text-gray-800">
// //             <UserCog className="text-indigo-600" size={26} />
// //             Manage User Roles
// //           </h2>

// //           <p className="mt-1 text-sm font-medium text-gray-500">
// //             Search users and assign User, Admin, Promo or Master ID roles.
// //           </p>
// //         </div>

// //         {/* Search and limit */}
// //         <div className="flex w-full flex-col gap-2 md:flex-row xl:w-auto">
// //           <div className="relative">
// //             <Search
// //               size={16}
// //               className="absolute left-3 top-3 text-gray-500"
// //             />

// //             <input
// //               type="text"
// //               className="w-full rounded border border-gray-300 py-2 pl-9 pr-3 text-black outline-none focus:border-indigo-500 md:w-64"
// //               placeholder="Search Any ID or Name..."
// //               value={search}
// //               onChange={handleSearchChange}
// //             />
// //           </div>

// //           <select
// //             className="rounded border border-gray-300 bg-white px-3 py-2 text-black"
// //             value={itemsPerPage}
// //             onChange={(e) => {
// //               setItemsPerPage(Number(e.target.value));
// //               setCurrentPage(1);
// //             }}
// //           >
// //             <option value={10}>Show 10</option>
// //             <option value={20}>Show 20</option>
// //             <option value={50}>Show 50</option>
// //           </select>
// //         </div>
// //       </div>

// //       {/* Users table */}
// //       <div className="overflow-auto rounded border shadow">
// //         {loading ? (
// //           <div className="p-8 text-center font-bold text-gray-600">
// //             Loading fresh data from database...
// //           </div>
// //         ) : (
// //           <table className="min-w-full bg-white text-left text-sm">
// //             <thead className="bg-gray-100 text-xs uppercase text-gray-600">
// //               <tr>
// //                 <th className="border px-4 py-3">User ID</th>
// //                 <th className="border px-4 py-3">Name</th>
// //                 <th className="border px-4 py-3 text-center">Role</th>
// //                 <th className="border px-4 py-3 text-right">Balance</th>
// //                 <th className="border px-4 py-3 text-center">Actions</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {users.length === 0 ? (
// //                 <tr>
// //                   <td
// //                     colSpan="5"
// //                     className="px-4 py-8 text-center font-medium text-gray-500"
// //                   >
// //                     No users found. Try searching by ID or Name.
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 users.map((u) => (
// //                   <tr
// //                     key={u._id || u.userId}
// //                     className="transition hover:bg-gray-50"
// //                   >
// //                     <td className="border px-4 py-2 font-bold text-gray-800">
// //                       {u.userId}
// //                     </td>

// //                     <td className="border px-4 py-2 font-medium text-gray-800">
// //                       {u.name}
// //                     </td>

// //                     <td className="border px-4 py-2 text-center">
// //                       <RoleBadge role={u.role} />
// //                     </td>

// //                     <td className="border px-4 py-2 text-right font-bold text-green-600">
// //                       ${Number(u.walletBalance || 0).toFixed(2)}
// //                     </td>

// //                     <td className="border px-4 py-2">
// //                       <div className="flex justify-center">
// //                         <button
// //                           type="button"
// //                           onClick={() => openRoleModal(u)}
// //                           className="flex items-center gap-1 rounded bg-indigo-100 px-3 py-1.5 text-xs font-bold text-indigo-700 transition hover:bg-indigo-200"
// //                         >
// //                           <UserCog size={14} />
// //                           Edit Role
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>
// //         )}
// //       </div>

// //       {/* Pagination */}
// //       {!loading && users.length > 0 && (
// //         <div className="mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
// //           <span className="text-gray-600">
// //             Showing {((currentPage - 1) * itemsPerPage) + 1} to{" "}
// //             {Math.min(currentPage * itemsPerPage, totalCount)} of{" "}
// //             {totalCount} users
// //           </span>

// //           <div className="flex gap-2">
// //             <button
// //               type="button"
// //               onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
// //               disabled={currentPage === 1}
// //               className="rounded border bg-white px-3 py-1 disabled:opacity-50"
// //             >
// //               Prev
// //             </button>

// //             <button
// //               type="button"
// //               className="rounded bg-indigo-600 px-3 py-1 font-bold text-white"
// //             >
// //               {currentPage}
// //             </button>

// //             <button
// //               type="button"
// //               onClick={() =>
// //                 setCurrentPage((p) => Math.min(p + 1, totalPages))
// //               }
// //               disabled={currentPage === totalPages}
// //               className="rounded border bg-white px-3 py-1 disabled:opacity-50"
// //             >
// //               Next
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {/* Role update modal */}
// //       {isModalOpen && selectedUser && (
// //         <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
// //           <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-2xl">
// //             <div className="mb-6 flex items-center justify-between">
// //               <h3 className="flex items-center gap-2 text-lg font-black uppercase text-gray-800">
// //                 <ShieldAlert className="text-indigo-600" />
// //                 Change User Role
// //               </h3>

// //               <button
// //                 type="button"
// //                 onClick={() => {
// //                   setIsModalOpen(false);
// //                   setAdminPassword("");
// //                 }}
// //                 className="text-gray-500 transition hover:text-red-500"
// //               >
// //                 <X size={24} />
// //               </button>
// //             </div>

// //             <div className="mb-4 rounded-lg bg-gray-50 p-3">
// //               <p className="text-xs font-bold uppercase text-gray-500">
// //                 Selected User
// //               </p>

// //               <p className="mt-1 font-bold text-gray-800">
// //                 {selectedUser.name}
// //               </p>

// //               <p className="mt-1 font-mono text-sm text-indigo-600">
// //                 {selectedUser.userId}
// //               </p>

// //               <div className="mt-2">
// //                 <RoleBadge role={selectedUser.role} />
// //               </div>
// //             </div>

// //             <form onSubmit={handleUpdateRole} className="space-y-4">
// //               <div>
// //                 <label className="mb-2 block text-xs font-bold uppercase text-gray-600">
// //                   Select New Role
// //                 </label>

// //                 <select
// //                   value={newRole}
// //                   onChange={(e) => setNewRole(e.target.value)}
// //                   className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-bold outline-none focus:border-indigo-500"
// //                 >
// //                   <option value="user">Normal User</option>
// //                   <option value="admin">Admin</option>
// //                   <option value="promo">Promo Account</option>
// //                   <option value="master">Master ID</option>
// //                 </select>

// //                 {newRole === "master" && (
// //                   <p className="mt-2 text-xs font-semibold text-purple-700">
// //                     This user will receive the Master ID role.
// //                   </p>
// //                 )}
// //               </div>

// //               <div>
// //                 <label className="mb-2 block text-xs font-bold uppercase text-gray-600">
// //                   Admin Password
// //                 </label>

// //                 <input
// //                   type="password"
// //                   placeholder="Verify Admin Password"
// //                   value={adminPassword}
// //                   onChange={(e) => setAdminPassword(e.target.value)}
// //                   className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
// //                   required
// //                   autoComplete="current-password"
// //                 />
// //               </div>

// //               <button
// //                 type="submit"
// //                 disabled={updating}
// //                 className={`w-full rounded-lg py-3.5 text-sm font-black uppercase transition ${
// //                   updating
// //                     ? "cursor-not-allowed bg-gray-200 text-gray-400"
// //                     : "bg-indigo-600 text-white shadow-lg hover:bg-indigo-700"
// //                 }`}
// //               >
// //                 {updating ? "Updating..." : "Update Role"}
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminManageUsers;



// import React, { useState, useEffect, useCallback } from "react";
// import api from "../../api/axios";
// import Sidebar from "./Sidebar";
// import {
//   Search,
//   UserCog,
//   X,
//   Crown,
//   ShieldAlert,
//   ShieldCheck,
//   User,
//   BadgeCheck,
// } from "lucide-react";
// import { toast } from "react-toastify";

// const ROLE_OPTIONS = [
//   { value: "user", label: "Normal User", color: "bg-gray-100 text-gray-700 border-gray-200" },
//   { value: "admin", label: "Admin", color: "bg-blue-100 text-blue-800 border-blue-200" },
//   { value: "promo", label: "Promo Account", color: "bg-orange-100 text-orange-800 border-orange-200" },
//   { value: "master", label: "Master ID", color: "bg-purple-100 text-purple-800 border-purple-200" },
// ];

// const AdminManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Pagination and filters
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(20);
//   const [totalCount, setTotalCount] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   // Role modal
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [newRole, setNewRole] = useState("user");
//   const [adminPassword, setAdminPassword] = useState("");
//   const [updating, setUpdating] = useState(false);

//   // Fetch users
//   const fetchUsers = useCallback(async () => {
//     setLoading(true);

//     try {
//       const adminToken = localStorage.getItem("adminToken");

//       const res = await api.get(
//         `/admin/all-users?search=${encodeURIComponent(search)}&page=${currentPage}&limit=${itemsPerPage}`,
//         {
//           headers: {
//             Authorization: `Bearer ${adminToken}`,
//           },
//         }
//       );

//       if (res.data?.success) {
//         setUsers(res.data.users || []);
//         setTotalCount(res.data.totalCount || 0);
//         setTotalPages(res.data.totalPages || 1);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   }, [search, currentPage, itemsPerPage]);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     setCurrentPage(1);
//   };

//   // Open role modal
//   const openRoleModal = (user) => {
//     setSelectedUser(user);
//     setNewRole(
//       ROLE_OPTIONS.some((role) => role.value === user.role?.toLowerCase())
//         ? user.role.toLowerCase()
//         : "user"
//     );
//     setAdminPassword("");
//     setIsModalOpen(true);
//   };

//   // Update user role
//   const handleUpdateRole = async (e) => {
//     e.preventDefault();

//     if (!selectedUser?.userId) {
//       return toast.error("User ID not found");
//     }

//     if (!adminPassword.trim()) {
//       return toast.error("Admin password is required!");
//     }

//     if (!ROLE_OPTIONS.some((role) => role.value === newRole)) {
//       return toast.error("Invalid role selected");
//     }

//     if (newRole === selectedUser.role?.toLowerCase()) {
//       return toast.info("User already has this role");
//     }

//     setUpdating(true);

//     try {
//       const adminToken = localStorage.getItem("adminToken");

//       if (!adminToken) {
//         toast.error("Admin not authorized");
//         return;
//       }

//       const res = await api.put(
//         `/admin/update-role/${encodeURIComponent(selectedUser.userId)}`,
//         {
//           newRole,
//           adminPassword,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${adminToken}`,
//           },
//         }
//       );

//       if (res.data?.success) {
//         toast.success(res.data.message || "User role updated successfully");

//         setIsModalOpen(false);
//         setSelectedUser(null);
//         setAdminPassword("");

//         await fetchUsers();
//       }
//     } catch (err) {
//       toast.error(
//         err.response?.data?.message || "Failed to update user role"
//       );
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const getRoleDetails = (role) => {
//     const safeRole = String(role || "user").toLowerCase();

//     return (
//       ROLE_OPTIONS.find((item) => item.value === safeRole) ||
//       ROLE_OPTIONS[0]
//     );
//   };

//   const RoleBadge = ({ role }) => {
//     const details = getRoleDetails(role);

//     const RoleIcon =
//       role === "master"
//         ? Crown
//         : role === "admin"
//         ? ShieldCheck
//         : role === "promo"
//         ? BadgeCheck
//         : User;

//     return (
//       <span
//         className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1 text-[10px] font-bold uppercase ${details.color}`}
//       >
//         <RoleIcon size={12} />
//         {details.label}
//       </span>
//     );
//   };

//   return (
//     <>
//       {/* Admin Sidebar */}
//       <Sidebar />

//       {/* Main Page */}
//       <div className="p-4 text-black">
//         {/* Header */}
//         <div className="mb-6 flex flex-col gap-4 pt-12 xl:flex-row xl:items-center xl:justify-between">
//           <div>
//             <h2 className="flex items-center gap-2 text-2xl font-black uppercase tracking-wide text-gray-800">
//               <UserCog className="text-indigo-600" size={26} />
//               Manage User Roles
//             </h2>

//             <p className="mt-1 text-sm font-medium text-gray-500">
//               Search users and assign User, Admin, Promo or Master ID roles.
//             </p>
//           </div>

//           {/* Search and limit */}
//           <div className="flex w-full flex-col gap-2 md:flex-row xl:w-auto">
//             <div className="relative">
//               <Search
//                 size={16}
//                 className="absolute left-3 top-3 text-gray-500"
//               />

//               <input
//                 type="text"
//                 className="w-full rounded border border-gray-300 py-2 pl-9 pr-3 text-black outline-none focus:border-indigo-500 md:w-64"
//                 placeholder="Search Any ID or Name..."
//                 value={search}
//                 onChange={handleSearchChange}
//               />
//             </div>

//             <select
//               className="rounded border border-gray-300 bg-white px-3 py-2 text-black"
//               value={itemsPerPage}
//               onChange={(e) => {
//                 setItemsPerPage(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//             >
//               <option value={10}>Show 10</option>
//               <option value={20}>Show 20</option>
//               <option value={50}>Show 50</option>
//             </select>
//           </div>
//         </div>

//         {/* Users table */}
//         <div className="overflow-auto rounded border shadow">
//           {loading ? (
//             <div className="p-8 text-center font-bold text-gray-600">
//               Loading fresh data from database...
//             </div>
//           ) : (
//             <table className="min-w-full bg-white text-left text-sm">
//               <thead className="bg-gray-100 text-xs uppercase text-gray-600">
//                 <tr>
//                   <th className="border px-4 py-3">User ID</th>
//                   <th className="border px-4 py-3">Name</th>
//                   <th className="border px-4 py-3 text-center">Role</th>
//                   <th className="border px-4 py-3 text-right">Balance</th>
//                   <th className="border px-4 py-3 text-center">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {users.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan="5"
//                       className="px-4 py-8 text-center font-medium text-gray-500"
//                     >
//                       No users found. Try searching by ID or Name.
//                     </td>
//                   </tr>
//                 ) : (
//                   users.map((u) => (
//                     <tr
//                       key={u._id || u.userId}
//                       className="transition hover:bg-gray-50"
//                     >
//                       <td className="border px-4 py-2 font-bold text-gray-800">
//                         {u.userId}
//                       </td>

//                       <td className="border px-4 py-2 font-medium text-gray-800">
//                         {u.name}
//                       </td>

//                       <td className="border px-4 py-2 text-center">
//                         <RoleBadge role={u.role} />
//                       </td>

//                       <td className="border px-4 py-2 text-right font-bold text-green-600">
//                         ${Number(u.walletBalance || 0).toFixed(2)}
//                       </td>

//                       <td className="border px-4 py-2">
//                         <div className="flex justify-center">
//                           <button
//                             type="button"
//                             onClick={() => openRoleModal(u)}
//                             className="flex items-center gap-1 rounded bg-indigo-100 px-3 py-1.5 text-xs font-bold text-indigo-700 transition hover:bg-indigo-200"
//                           >
//                             <UserCog size={14} />
//                             Edit Role
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* Pagination */}
//         {!loading && users.length > 0 && (
//           <div className="mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
//             <span className="text-gray-600">
//               Showing {((currentPage - 1) * itemsPerPage) + 1} to{" "}
//               {Math.min(currentPage * itemsPerPage, totalCount)} of{" "}
//               {totalCount} users
//             </span>

//             <div className="flex gap-2">
//               <button
//                 type="button"
//                 onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="rounded border bg-white px-3 py-1 disabled:opacity-50"
//               >
//                 Prev
//               </button>

//               <button
//                 type="button"
//                 className="rounded bg-indigo-600 px-3 py-1 font-bold text-white"
//               >
//                 {currentPage}
//               </button>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setCurrentPage((p) => Math.min(p + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//                 className="rounded border bg-white px-3 py-1 disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Role update modal */}
//         {isModalOpen && selectedUser && (
//           <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
//             <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-2xl">
//               <div className="mb-6 flex items-center justify-between">
//                 <h3 className="flex items-center gap-2 text-lg font-black uppercase text-gray-800">
//                   <ShieldAlert className="text-indigo-600" />
//                   Change User Role
//                 </h3>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsModalOpen(false);
//                     setAdminPassword("");
//                   }}
//                   className="text-gray-500 transition hover:text-red-500"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               <div className="mb-4 rounded-lg bg-gray-50 p-3">
//                 <p className="text-xs font-bold uppercase text-gray-500">
//                   Selected User
//                 </p>

//                 <p className="mt-1 font-bold text-gray-800">
//                   {selectedUser.name}
//                 </p>

//                 <p className="mt-1 font-mono text-sm text-indigo-600">
//                   {selectedUser.userId}
//                 </p>

//                 <div className="mt-2">
//                   <RoleBadge role={selectedUser.role} />
//                 </div>
//               </div>

//               <form onSubmit={handleUpdateRole} className="space-y-4">
//                 <div>
//                   <label className="mb-2 block text-xs font-bold uppercase text-gray-600">
//                     Select New Role
//                   </label>

//                   <select
//                     value={newRole}
//                     onChange={(e) => setNewRole(e.target.value)}
//                     className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-bold outline-none focus:border-indigo-500"
//                   >
//                     <option value="user">Normal User</option>
//                     <option value="admin">Admin</option>
//                     <option value="promo">Promo Account</option>
//                     <option value="master">Master ID</option>
//                   </select>

//                   {newRole === "master" && (
//                     <p className="mt-2 text-xs font-semibold text-purple-700">
//                       This user will receive the Master ID role.
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-xs font-bold uppercase text-gray-600">
//                     Admin Password
//                   </label>

//                   <input
//                     type="password"
//                     placeholder="Verify Admin Password"
//                     value={adminPassword}
//                     onChange={(e) => setAdminPassword(e.target.value)}
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
//                     required
//                     autoComplete="current-password"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={updating}
//                   className={`w-full rounded-lg py-3.5 text-sm font-black uppercase transition ${
//                     updating
//                       ? "cursor-not-allowed bg-gray-200 text-gray-400"
//                       : "bg-indigo-600 text-white shadow-lg hover:bg-indigo-700"
//                   }`}
//                 >
//                   {updating ? "Updating..." : "Update Role"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default AdminManageUsers;



import React, { useState, useEffect, useCallback } from "react";
import api from "../../api/axios";
import Sidebar from "./Sidebar";
import {
  Search,
  UserCog,
  X,
  Crown,
  ShieldAlert,
  ShieldCheck,
  User,
  BadgeCheck,
} from "lucide-react";
import { toast } from "react-toastify";

// ==========================================
// AVAILABLE USER ROLES
// ==========================================
const ROLE_OPTIONS = [
  {
    value: "user",
    label: "Normal User",
    color: "bg-gray-100 text-gray-700 border-gray-200",
  },
  {
    value: "admin",
    label: "Admin",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    value: "promo",
    label: "Promo Account",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    value: "master",
    label: "Master ID",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    value: "setup",
    label: "Setup ID",
    color: "bg-green-100 text-green-800 border-green-200",
  },
];

const AdminManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination and filters
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Role modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("user");
  const [adminPassword, setAdminPassword] = useState("");
  const [updating, setUpdating] = useState(false);

  // ==========================================
  // FETCH USERS
  // ==========================================
  const fetchUsers = useCallback(async () => {
    setLoading(true);

    try {
      const adminToken = localStorage.getItem("adminToken");

      if (!adminToken) {
        toast.error("Admin not authorized. Please login again.");
        setUsers([]);
        setTotalCount(0);
        setTotalPages(1);
        return;
      }

      const res = await api.get(
        `/admin/all-users?search=${encodeURIComponent(
          search
        )}&page=${currentPage}&limit=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (res.data?.success) {
        setUsers(res.data.users || []);
        setTotalCount(res.data.totalCount ?? res.data.total ?? 0);
        setTotalPages(Math.max(1, res.data.totalPages || 1));
      } else {
        setUsers([]);
        setTotalCount(0);
        setTotalPages(1);
        toast.error(res.data?.message || "Failed to load users");
      }
    } catch (err) {
      console.error("Fetch Users Error:", err);

      toast.error(
        err.response?.data?.message || "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  }, [search, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ==========================================
  // SEARCH
  // ==========================================
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // ==========================================
  // OPEN ROLE MODAL
  // ==========================================
  const openRoleModal = (user) => {
    setSelectedUser(user);

    const currentRole = String(user.role || "user").toLowerCase();

    setNewRole(
      ROLE_OPTIONS.some((role) => role.value === currentRole)
        ? currentRole
        : "user"
    );

    setAdminPassword("");
    setIsModalOpen(true);
  };

  // ==========================================
  // CLOSE ROLE MODAL
  // ==========================================
  const closeRoleModal = () => {
    if (updating) return;

    setIsModalOpen(false);
    setSelectedUser(null);
    setAdminPassword("");
    setNewRole("user");
  };

  // ==========================================
  // UPDATE USER ROLE
  // ==========================================
  const handleUpdateRole = async (e) => {
    e.preventDefault();

    if (!selectedUser?.userId) {
      return toast.error("User ID not found");
    }

    if (!adminPassword.trim()) {
      return toast.error("Admin password is required!");
    }

    if (!ROLE_OPTIONS.some((role) => role.value === newRole)) {
      return toast.error("Invalid role selected");
    }

    if (
      newRole === String(selectedUser.role || "user").toLowerCase()
    ) {
      return toast.info("User already has this role");
    }

    const adminToken = localStorage.getItem("adminToken");

    if (!adminToken) {
      return toast.error("Admin not authorized. Please login again.");
    }

    setUpdating(true);

    try {
      const res = await api.put(
        `/admin/update-role/${encodeURIComponent(
          selectedUser.userId
        )}`,
        {
          newRole,
          adminPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (res.data?.success) {
        toast.success(
          res.data.message || "User role updated successfully"
        );

        setIsModalOpen(false);
        setSelectedUser(null);
        setAdminPassword("");
        setNewRole("user");

        await fetchUsers();
      } else {
        toast.error(res.data?.message || "Failed to update role");
      }
    } catch (err) {
      console.error("Update Role Error:", err);

      toast.error(
        err.response?.data?.message || "Failed to update user role"
      );
    } finally {
      setUpdating(false);
    }
  };

  // ==========================================
  // GET ROLE DETAILS
  // ==========================================
  const getRoleDetails = (role) => {
    const safeRole = String(role || "user").toLowerCase();

    return (
      ROLE_OPTIONS.find((item) => item.value === safeRole) ||
      ROLE_OPTIONS[0]
    );
  };

  // ==========================================
  // ROLE BADGE
  // ==========================================
  const RoleBadge = ({ role }) => {
    const safeRole = String(role || "user").toLowerCase();
    const details = getRoleDetails(safeRole);

    const RoleIcon =
      safeRole === "master"
        ? Crown
        : safeRole === "admin"
        ? ShieldCheck
        : safeRole === "promo" || safeRole === "setup"
        ? BadgeCheck
        : User;

    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1 text-[10px] font-bold uppercase ${details.color}`}
      >
        <RoleIcon size={12} />
        {details.label}
      </span>
    );
  };

  // ==========================================
  // MAIN UI
  // ==========================================
  return (
    <>
      {/* Admin Sidebar */}
      <Sidebar />

      {/* Main Page */}
      <div className="p-4 text-black">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 pt-12 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-black uppercase tracking-wide text-gray-800">
              <UserCog className="text-indigo-600" size={26} />
              Manage User Roles
            </h2>

            <p className="mt-1 text-sm font-medium text-gray-500">
              Search users and assign User, Admin, Promo, Master ID or
              Setup ID roles.
            </p>
          </div>

          {/* Search and limit */}
          <div className="flex w-full flex-col gap-2 md:flex-row xl:w-auto">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-3 text-gray-500"
              />

              <input
                type="text"
                className="w-full rounded border border-gray-300 py-2 pl-9 pr-3 text-black outline-none focus:border-indigo-500 md:w-64"
                placeholder="Search Any ID, Name or Email..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>

            <select
              className="rounded border border-gray-300 bg-white px-3 py-2 text-black"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>Show 10</option>
              <option value={20}>Show 20</option>
              <option value={50}>Show 50</option>
            </select>
          </div>
        </div>

        {/* Users Count */}
        <div className="mb-4 rounded-lg border bg-white p-4 shadow-sm">
          <p className="text-xs font-bold uppercase text-gray-500">
            Total Matching Users
          </p>
          <p className="mt-1 text-2xl font-black text-indigo-700">
            {totalCount}
          </p>
        </div>

        {/* Users Table */}
        <div className="overflow-auto rounded border bg-white shadow">
          {loading ? (
            <div className="p-8 text-center font-bold text-gray-600">
              Loading fresh data from database...
            </div>
          ) : (
            <table className="min-w-full bg-white text-left text-sm">
              <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                <tr>
                  <th className="border px-4 py-3">User ID</th>
                  <th className="border px-4 py-3">Name</th>
                  <th className="border px-4 py-3 text-center">
                    Role
                  </th>
                  <th className="border px-4 py-3 text-right">
                    Balance
                  </th>
                  <th className="border px-4 py-3 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-8 text-center font-medium text-gray-500"
                    >
                      No users found. Try searching by ID, Name or Email.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr
                      key={u._id || u.userId}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="border px-4 py-2 font-bold text-gray-800">
                        {u.userId}
                      </td>

                      <td className="border px-4 py-2 font-medium text-gray-800">
                        {u.name || "-"}
                        {u.email && (
                          <div className="mt-1 text-xs text-gray-500">
                            {u.email}
                          </div>
                        )}
                      </td>

                      <td className="border px-4 py-2 text-center">
                        <RoleBadge role={u.role} />
                      </td>

                      <td className="border px-4 py-2 text-right font-bold text-green-600">
                        ${Number(u.walletBalance || 0).toFixed(2)}
                      </td>

                      <td className="border px-4 py-2">
                        <div className="flex justify-center">
                          <button
                            type="button"
                            onClick={() => openRoleModal(u)}
                            className="flex items-center gap-1 rounded bg-indigo-100 px-3 py-1.5 text-xs font-bold text-indigo-700 transition hover:bg-indigo-200"
                          >
                            <UserCog size={14} />
                            Edit Role
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {!loading && users.length > 0 && (
          <div className="mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
            <span className="text-gray-600">
              Showing{" "}
              {Math.min((currentPage - 1) * itemsPerPage + 1, totalCount)}{" "}
              to {Math.min(currentPage * itemsPerPage, totalCount)} of{" "}
              {totalCount} users
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((p) => Math.max(p - 1, 1))
                }
                disabled={currentPage === 1}
                className="rounded border bg-white px-3 py-1 disabled:opacity-50"
              >
                Prev
              </button>

              <span className="rounded bg-indigo-600 px-3 py-1 font-bold text-white">
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(p + 1, totalPages)
                  )
                }
                disabled={currentPage >= totalPages}
                className="rounded border bg-white px-3 py-1 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Role Update Modal */}
        {isModalOpen && selectedUser && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-lg font-black uppercase text-gray-800">
                  <ShieldAlert className="text-indigo-600" />
                  Change User Role
                </h3>

                <button
                  type="button"
                  onClick={closeRoleModal}
                  disabled={updating}
                  className="text-gray-500 transition hover:text-red-500 disabled:opacity-50"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Selected User */}
              <div className="mb-4 rounded-lg bg-gray-50 p-3">
                <p className="text-xs font-bold uppercase text-gray-500">
                  Selected User
                </p>

                <p className="mt-1 font-bold text-gray-800">
                  {selectedUser.name || "User"}
                </p>

                <p className="mt-1 font-mono text-sm text-indigo-600">
                  {selectedUser.userId}
                </p>

                <div className="mt-2">
                  <RoleBadge role={selectedUser.role} />
                </div>

                {selectedUser.masterRoleChanged === true && (
                  <p className="mt-3 rounded border border-amber-200 bg-amber-50 p-2 text-xs font-semibold text-amber-800">
                    Master one-time role change has already been used.
                    Admin role changes will not reset this lock.
                  </p>
                )}
              </div>

              <form
                onSubmit={handleUpdateRole}
                className="space-y-4"
              >
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase text-gray-600">
                    Select New Role
                  </label>

                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-bold outline-none focus:border-indigo-500"
                    disabled={updating}
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>

                  {newRole === "master" && (
                    <p className="mt-2 text-xs font-semibold text-purple-700">
                      This user will receive the Master ID role.
                    </p>
                  )}

                  {newRole === "setup" && (
                    <p className="mt-2 text-xs font-semibold text-green-700">
                      This user will receive the Setup ID role.
                    </p>
                  )}

                  {newRole === "user" && (
                    <p className="mt-2 text-xs text-gray-500">
                      This user will receive the Normal User role.
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase text-gray-600">
                    Admin Password
                  </label>

                  <input
                    type="password"
                    placeholder="Verify Admin Password"
                    value={adminPassword}
                    onChange={(e) =>
                      setAdminPassword(e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                    required
                    autoComplete="current-password"
                    disabled={updating}
                  />
                </div>

                <button
                  type="submit"
                  disabled={updating}
                  className={`w-full rounded-lg py-3.5 text-sm font-black uppercase transition ${
                    updating
                      ? "cursor-not-allowed bg-gray-200 text-gray-400"
                      : "bg-indigo-600 text-white shadow-lg hover:bg-indigo-700"
                  }`}
                >
                  {updating ? "Updating..." : "Update Role"}
                </button>

                <button
                  type="button"
                  onClick={closeRoleModal}
                  disabled={updating}
                  className="w-full rounded-lg border border-gray-300 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminManageUsers;
