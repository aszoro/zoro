// // import React, { useState, useEffect, useCallback } from "react";
// // import api from "../../api/axios";
// // import { useAuth } from "../../context/AuthContext";
// // import SuccessModal from "../../components/modals/SuccessModal";
// // import MessageModal from "../../components/modals/MessageModal";
// // import { LifeBuoy, Clock, CheckCircle2, XCircle, AlertCircle, Wallet, Info } from "lucide-react";

// // const Support = () => {
// //   const { user, token } = useAuth();
// //   const [message, setMessage] = useState("");
// //   const [walletAddress, setWalletAddress] = useState("");
// //   const [optional, setOptional] = useState("");
// //   const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });
// //   const [loading, setLoading] = useState(false);
// //   const [userMessages, setUserMessages] = useState([]);
// //   const [fetching, setFetching] = useState(true);

// //   const [showModal, setShowModal] = useState(false);
// //   const [submittedMessage, setSubmittedMessage] = useState(null);

// //   // Fetch logic using the NEW /me route
// //   const fetchMessages = useCallback(async () => {
// //     if (!token) return;
// //     try {
// //       setFetching(true);
// //       const res = await api.get(`/support/me?t=${new Date().getTime()}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setUserMessages(res.data.supports || []);
// //     } catch (err) {
// //       console.error("Fetch messages error:", err);
// //     } finally {
// //       setFetching(false);
// //     }
// //   }, [token]);

// //   useEffect(() => {
// //     fetchMessages();
// //   }, [fetchMessages]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!message.trim()) {
// //       setStatusMsg({ type: "error", text: "Please enter your message." });
// //       return;
// //     }

// //     setLoading(true);
// //     setStatusMsg({ type: "", text: "" });

// //     try {
// //       const res = await api.post(
// //         "/support/create",
// //         { message, email: user?.email || "unknown", walletAddress, optional },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       if (res.data.success) {
// //         setSubmittedMessage({ message, walletAddress, optional });
// //         setShowModal(true);
// //         setMessage("");
// //         setWalletAddress("");
// //         setOptional("");
// //         fetchMessages(); // Refresh list
// //       }
// //     } catch (err) {
// //       const errorText = err.response?.data?.error || "Failed to send message. Please try again.";
// //       setStatusMsg({ type: "error", text: errorText });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleReset = () => {
// //     setMessage("");
// //     setStatusMsg({ type: "", text: "" });
// //   };

// //   return (
// //     <div className="w-full max-w-5xl mx-auto pb-10 relative z-10 animate-in fade-in duration-500">
      
// //       {/* Scrollbar CSS - Updated to Dark/Gold Theme */}
// //       <style>{`
// //         .custom-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
// //         .custom-scroll::-webkit-scrollbar-track { background: #0b101e; border-radius: 4px; }
// //         .custom-scroll::-webkit-scrollbar-thumb { background: #e4c568; border-radius: 10px; }
// //       `}</style>

// //       {/* Header */}
// //       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
// //         <div>
// //           <h2 className="text-2xl md:text-3xl font-black text-[#e4c568] uppercase tracking-wide flex items-center gap-3 drop-shadow-md">
// //              <LifeBuoy className="text-[#e4c568]" size={28} strokeWidth={2.5} /> Support Center
// //           </h2>
// //           <p className="text-[#9ca3af] text-xs md:text-sm font-bold tracking-widest uppercase mt-1">
// //             We are here to help you 24/7
// //           </p>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
// //         {/* LEFT COLUMN: Support Form (Updated to Dark/Gold Theme) */}
// //         <div>
// //           <div className="bg-[#0b101e] border border-[#2d3748] w-full max-w-[500px] relative shadow-[0_0_20px_rgba(212,175,55,0.15)] rounded-xl overflow-hidden flex flex-col">
            
// //             <div className="bg-[#e4c568] px-5 py-4 flex justify-between items-center shrink-0">
// //               <h3 className="text-black font-extrabold text-[18px] tracking-wide flex items-center gap-2">
// //                 Generate Ticket
// //               </h3>
// //             </div>

// //             <div className="p-5 flex-1">
// //               <form onSubmit={handleSubmit}>
                
// //                 {/* Table Style Wrapper mapped to Dark Mode */}
// //                 <div className="border border-[#2d3748] mb-6 rounded-md overflow-hidden flex flex-col font-semibold text-[13px]">
                  
// //                   {/* User ID Row */}
// //                   <div className="flex border-b border-[#2d3748]">
// //                     <div className="w-1/3 bg-[#131927] p-3 text-white flex items-center border-r border-[#2d3748]">
// //                       User ID
// //                     </div>
// //                     <div className="w-2/3 p-2 bg-[#0b101e]">
// //                       <input 
// //                         type="text" 
// //                         value={user?.userId || ""} 
// //                         readOnly 
// //                         className="w-full bg-[#161c2d] border border-[#2d3748] text-gray-400 px-3 py-2 outline-none rounded text-sm font-mono cursor-not-allowed"
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Message Row */}
// //                   <div className="flex">
// //                     <div className="w-1/3 bg-[#131927] p-3 text-white flex items-start pt-4 border-r border-[#2d3748]">
// //                       Message <span className="text-red-500 ml-1">*</span>
// //                     </div>
// //                     <div className="w-2/3 p-2 bg-[#0b101e]">
// //                       <textarea
// //                         value={message}
// //                         onChange={(e) => setMessage(e.target.value)}
// //                         placeholder="Describe your issue in detail..."
// //                         className="w-full bg-[#131927] border border-[#2d3748] text-white text-sm rounded px-3 py-2 focus:outline-none focus:border-[#e4c568] focus:ring-1 focus:ring-[#e4c568] placeholder-gray-600 custom-scroll"
// //                         rows="4"
// //                         required
// //                         disabled={loading}
// //                       />
// //                     </div>
// //                   </div>

// //                 </div>

// //                 {statusMsg.text && statusMsg.type === "error" && (
// //                   <div className="bg-red-900/30 border border-red-500/50 text-[#ff4d4d] px-4 py-2.5 rounded mb-4 flex items-center gap-2">
// //                     <AlertCircle size={16} className="shrink-0" />
// //                     <span className="font-semibold text-xs tracking-wide">{statusMsg.text}</span>
// //                   </div>
// //                 )}

// //                 {/* Action Buttons */}
// //                 <div className="flex gap-3">
// //                   <button
// //                     type="submit"
// //                     disabled={loading}
// //                     className="flex-1 bg-[#e4c568] hover:bg-[#d4af37] text-black font-extrabold py-2.5 rounded shadow-[0_0_10px_rgba(228,197,104,0.3)] hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100 uppercase tracking-widest text-[14px]"
// //                   >
// //                     {loading ? "Sending..." : "Submit Ticket"}
// //                   </button>
// //                   <button
// //                     type="button"
// //                     onClick={handleReset}
// //                     className="flex-none bg-[#1e2536] hover:bg-[#2d3748] border border-[#2d3748] text-white px-6 py-2.5 rounded font-bold transition-colors uppercase tracking-widest text-[14px]"
// //                   >
// //                     Reset
// //                   </button>
// //                 </div>

// //               </form>
// //             </div>
// //           </div>
// //         </div>

// //         {/* RIGHT COLUMN: Ticket History (Updated to Dark/Gold Theme) */}
// //         <div>
// //           <div className="bg-[#0b101e] border border-[#2d3748] shadow-[0_0_20px_rgba(212,175,55,0.05)] rounded-xl p-5 h-full flex flex-col">
// //             <h3 className="text-lg font-black text-[#e4c568] mb-5 uppercase tracking-widest flex items-center gap-2 border-b border-[#2d3748] pb-3">
// //               <Clock size={18} className="text-[#e4c568]" /> Ticket History
// //             </h3>

// //             <div className="flex-1 overflow-y-auto custom-scroll pr-2 space-y-4 max-h-[500px]">
// //               {fetching ? (
// //                 <div className="text-center py-10">
// //                   <svg className="animate-spin h-8 w-8 text-[#e4c568] mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
// //                   <span className="text-xs font-bold uppercase tracking-widest text-[#9ca3af]">Loading History...</span>
// //                 </div>
// //               ) : userMessages.length === 0 ? (
// //                 <div className="text-center py-10 border border-dashed border-[#2d3748] rounded-xl bg-[#161c2d]">
// //                   <span className="text-[#9ca3af] font-bold text-sm uppercase tracking-widest">No Previous Tickets</span>
// //                 </div>
// //               ) : (
// //                 userMessages.map((m) => {
// //                   let statusColor = "bg-[#1e2536] text-gray-300 border-[#2d3748]";
// //                   let StatusIcon = Clock;
                  
// //                   if (m.status === "Pending") {
// //                     statusColor = "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
// //                     StatusIcon = Clock;
// //                   } else if (m.status === "Resolved" || m.status === "Closed") {
// //                     statusColor = "bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/20";
// //                     StatusIcon = CheckCircle2;
// //                   } else if (m.status === "Rejected") {
// //                     statusColor = "bg-red-500/10 text-[#ff4d4d] border-red-500/20";
// //                     StatusIcon = XCircle;
// //                   }

// //                   return (
// //                     <div key={m._id} className="p-4 border border-[#2d3748] rounded-xl bg-[#161c2d] hover:border-[#e4c568]/40 transition-colors shadow-sm relative group">
// //                       <div className="flex justify-between items-start mb-3">
// //                         <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-black tracking-widest uppercase rounded bg-opacity-20 border ${statusColor}`}>
// //                           <StatusIcon size={12} /> {m.status || "PENDING"}
// //                         </span>
// //                         <span className="text-[11px] font-mono text-[#9ca3af] bg-[#0b101e] px-2.5 py-1 rounded border border-[#2d3748]">
// //                           {new Date(m.createdAt).toLocaleDateString("en-GB")}
// //                         </span>
// //                       </div>
                      
// //                       <p className="text-gray-200 text-sm font-medium leading-relaxed mb-3">
// //                         {m.message}
// //                       </p>

// //                       {/* Admin Reply Box */}
// //                       {m.adminReply && (
// //                         <div className="mt-3 p-3 bg-[#131927] border border-[#e4c568]/30 rounded-lg relative overflow-hidden">
// //                           {/* Small accent glow effect */}
// //                           <div className="absolute top-0 left-0 w-1 h-full bg-[#e4c568]"></div>
                          
// //                           <div className="flex items-center gap-2 mb-1.5 pl-2">
// //                             <CheckCircle2 size={14} className="text-[#e4c568]" />
// //                             <span className="text-xs font-black text-[#e4c568] uppercase tracking-widest">Support Reply</span>
// //                           </div>
// //                           <p className="text-gray-300 text-sm font-medium pl-2">
// //                             {m.adminReply}
// //                           </p>
// //                         </div>
// //                       )}
// //                     </div>
// //                   );
// //                 })
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //       </div>

// //       {submittedMessage && (
// //         <SuccessModal
// //           isOpen={showModal}
// //           onClose={() => setShowModal(false)}
// //           customTitle="Ticket Generated"
// //           customMessage="We've received your message. Our support team will review it and get back to you shortly."
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default Support;


// import React, { useState, useEffect, useCallback } from "react";
// import api from "../../api/axios";
// import { useAuth } from "../../context/AuthContext";
// import SuccessModal from "../../components/modals/SuccessModal";
// import {
//   LifeBuoy,
//   Clock3,
//   CheckCircle2,
//   XCircle,
//   AlertCircle,
//   Wallet,
//   Send,
//   RotateCcw,
//   MessageCircle,
//   ShieldCheck,
//   ArrowUpRight,
//   Sparkles,
//   RefreshCw,
//   UserRound,
//   CalendarDays,
//   CircleHelp,
// } from "lucide-react";

// const formatDate = (value) => {
//   if (!value) return "Date unavailable";
//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return "Date unavailable";
//   return date.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// const getStatus = (status) => {
//   const value = String(status || "Pending").toLowerCase();

//   if (value === "resolved" || value === "closed") {
//     return {
//       label: status || "Resolved",
//       className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
//       Icon: CheckCircle2,
//     };
//   }

//   if (value === "rejected") {
//     return {
//       label: status,
//       className: "border-rose-400/20 bg-rose-400/10 text-rose-300",
//       Icon: XCircle,
//     };
//   }

//   if (value === "pending" || value === "open" || value === "in progress") {
//     return {
//       label: status || "Pending",
//       className: "border-amber-300/20 bg-amber-300/10 text-amber-200",
//       Icon: Clock3,
//     };
//   }

//   return {
//     label: status || "Pending",
//     className: "border-violet-300/20 bg-violet-300/10 text-violet-200",
//     Icon: CircleHelp,
//   };
// };

// const Support = () => {
//   const { user, token } = useAuth();
//   const [message, setMessage] = useState("");
//   const [walletAddress, setWalletAddress] = useState("");
//   const [optional, setOptional] = useState("");
//   const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });
//   const [loading, setLoading] = useState(false);
//   const [userMessages, setUserMessages] = useState([]);
//   const [fetching, setFetching] = useState(true);
//   const [fetchError, setFetchError] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [submittedMessage, setSubmittedMessage] = useState(null);

//   const fetchMessages = useCallback(async () => {
//     if (!token) {
//       setUserMessages([]);
//       setFetching(false);
//       return;
//     }

//     try {
//       setFetching(true);
//       setFetchError("");
//       const res = await api.get(`/support/me?t=${Date.now()}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUserMessages(Array.isArray(res.data?.supports) ? res.data.supports : []);
//     } catch (err) {
//       console.error("Fetch messages error:", err);
//       setFetchError("We couldn't load your ticket history. Please try again.");
//     } finally {
//       setFetching(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchMessages();
//   }, [fetchMessages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!message.trim()) {
//       setStatusMsg({ type: "error", text: "Please enter your message." });
//       return;
//     }

//     setLoading(true);
//     setStatusMsg({ type: "", text: "" });

//     try {
//       const res = await api.post(
//         "/support/create",
//         {
//           message: message.trim(),
//           email: user?.email || "unknown",
//           walletAddress: walletAddress.trim(),
//           optional: optional.trim(),
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data?.success) {
//         setSubmittedMessage({
//           message: message.trim(),
//           walletAddress: walletAddress.trim(),
//           optional: optional.trim(),
//         });
//         setShowModal(true);
//         setMessage("");
//         setWalletAddress("");
//         setOptional("");
//         await fetchMessages();
//       } else {
//         setStatusMsg({
//           type: "error",
//           text: res.data?.error || "Ticket could not be submitted. Please try again.",
//         });
//       }
//     } catch (err) {
//       const errorText =
//         err.response?.data?.error || "Failed to send message. Please try again.";
//       setStatusMsg({ type: "error", text: errorText });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setMessage("");
//     setWalletAddress("");
//     setOptional("");
//     setStatusMsg({ type: "", text: "" });
//   };

//   const pendingCount = userMessages.filter(
//     (item) => String(item.status || "Pending").toLowerCase() === "pending"
//   ).length;
//   const resolvedCount = userMessages.filter((item) =>
//     ["resolved", "closed"].includes(String(item.status || "").toLowerCase())
//   ).length;

//   return (
//     <main className="relative z-10 min-h-screen w-full bg-[#080b13] px-3 pb-12 pt-6 font-sans text-slate-100 sm:px-5 sm:pt-8 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <header className="relative mb-6 overflow-hidden rounded-2xl border border-violet-300/15 bg-[#101321] p-5 sm:p-7">
//           <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />
//           <div className="pointer-events-none absolute -bottom-20 right-1/3 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
//           <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
//             <div className="flex items-start gap-4">
//               <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-300/25 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 text-violet-200 shadow-lg shadow-violet-950/30">
//                 <LifeBuoy size={24} />
//               </div>
//               <div>
//                 <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-300">
//                   <Sparkles size={13} />
//                   Member care / help desk
//                 </div>
//                 <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
//                   Support Center
//                 </h1>
//                 <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
//                   Tell us what you need help with and follow your support tickets in one place.
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2 self-start rounded-xl border border-emerald-300/15 bg-emerald-300/[0.06] px-3 py-2 text-xs font-semibold text-emerald-200 md:self-center">
//               <ShieldCheck size={15} />
//               Your account support
//             </div>
//           </div>
//         </header>

//         <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
//           <article className="flex items-center gap-4 rounded-xl border border-white/[0.08] bg-[#101321] p-4">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-200">
//               <MessageCircle size={19} />
//             </div>
//             <div>
//               <p className="text-xs font-medium text-slate-400">Tickets submitted</p>
//               <p className="mt-1 text-2xl font-extrabold tabular-nums text-white">
//                 {userMessages.length}
//               </p>
//             </div>
//           </article>
//           <article className="flex items-center gap-4 rounded-xl border border-amber-300/15 bg-[#101321] p-4">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-300/10 text-amber-200">
//               <Clock3 size={19} />
//             </div>
//             <div>
//               <p className="text-xs font-medium text-slate-400">Awaiting response</p>
//               <p className="mt-1 text-2xl font-extrabold tabular-nums text-white">
//                 {pendingCount}
//               </p>
//             </div>
//           </article>
//           <article className="flex items-center gap-4 rounded-xl border border-emerald-300/15 bg-[#101321] p-4">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-200">
//               <CheckCircle2 size={19} />
//             </div>
//             <div>
//               <p className="text-xs font-medium text-slate-400">Resolved tickets</p>
//               <p className="mt-1 text-2xl font-extrabold tabular-nums text-white">
//                 {resolvedCount}
//               </p>
//             </div>
//           </article>
//         </section>

//         <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-6">
//           <section className="overflow-hidden rounded-2xl border border-violet-300/15 bg-[#101321] shadow-xl shadow-black/10">
//             <div className="border-b border-white/[0.07] bg-gradient-to-r from-violet-500/[0.13] via-fuchsia-500/[0.07] to-transparent px-5 py-5 sm:px-6">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-200">
//                   <Send size={18} />
//                 </div>
//                 <div>
//                   <h2 className="text-base font-bold text-white">Create a ticket</h2>
//                   <p className="mt-1 text-xs text-slate-400">
//                     Add enough detail so our team can help you faster.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
//               <div>
//                 <label htmlFor="support-user-id" className="mb-2 block text-xs font-semibold text-slate-300">
//                   Member ID
//                 </label>
//                 <div className="relative">
//                   <UserRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-300" />
//                   <input
//                     id="support-user-id"
//                     type="text"
//                     value={user?.userId || ""}
//                     readOnly
//                     className="h-11 w-full cursor-not-allowed rounded-xl border border-white/[0.08] bg-[#090c14] pl-10 pr-3 text-sm font-mono text-slate-400 outline-none"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="support-wallet" className="mb-2 block text-xs font-semibold text-slate-300">
//                   Wallet address <span className="font-normal text-slate-500">(optional)</span>
//                 </label>
//                 <div className="relative">
//                   <Wallet size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-300" />
//                   <input
//                     id="support-wallet"
//                     type="text"
//                     value={walletAddress}
//                     onChange={(e) => setWalletAddress(e.target.value)}
//                     disabled={loading}
//                     placeholder="Enter wallet address if relevant"
//                     className="h-11 w-full rounded-xl border border-white/[0.09] bg-[#090c14] pl-10 pr-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10 disabled:opacity-60"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="support-reference" className="mb-2 block text-xs font-semibold text-slate-300">
//                   Reference / extra details <span className="font-normal text-slate-500">(optional)</span>
//                 </label>
//                 <input
//                   id="support-reference"
//                   type="text"
//                   value={optional}
//                   onChange={(e) => setOptional(e.target.value)}
//                   disabled={loading}
//                   placeholder="Transaction ID or other useful context"
//                   className="h-11 w-full rounded-xl border border-white/[0.09] bg-[#090c14] px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-violet-300/50 focus:ring-2 focus:ring-violet-300/10 disabled:opacity-60"
//                 />
//               </div>

//               <div>
//                 <div className="mb-2 flex items-center justify-between gap-3">
//                   <label htmlFor="support-message" className="block text-xs font-semibold text-slate-300">
//                     How can we help? <span className="text-rose-300">*</span>
//                   </label>
//                   <span className={`text-[11px] tabular-nums ${message.length > 1800 ? "text-amber-200" : "text-slate-500"}`}>
//                     {message.length} characters
//                   </span>
//                 </div>
//                 <textarea
//                   id="support-message"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   placeholder="Describe the issue, what happened, and any steps you've already tried..."
//                   rows={6}
//                   maxLength={3000}
//                   required
//                   disabled={loading}
//                   className="custom-scroll w-full resize-y rounded-xl border border-white/[0.09] bg-[#090c14] px-3.5 py-3 text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-violet-300/50 focus:ring-2 focus:ring-violet-300/10 disabled:opacity-60"
//                 />
//                 <p className="mt-2 flex items-start gap-2 text-[11px] leading-5 text-slate-500">
//                   <InfoIcon />
//                   Never include your password, private key, or recovery phrase in a support ticket.
//                 </p>
//               </div>

//               {statusMsg.text && statusMsg.type === "error" && (
//                 <div role="alert" className="flex items-start gap-2 rounded-xl border border-rose-400/20 bg-rose-400/[0.07] px-3.5 py-3 text-sm text-rose-200">
//                   <AlertCircle size={17} className="mt-0.5 shrink-0" />
//                   <span>{statusMsg.text}</span>
//                 </div>
//               )}

//               <div className="flex flex-col-reverse gap-3 border-t border-white/[0.07] pt-5 sm:flex-row">
//                 <button
//                   type="button"
//                   onClick={handleReset}
//                   disabled={loading}
//                   className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.025] px-4 text-sm font-semibold text-slate-300 transition hover:border-violet-300/30 hover:bg-white/[0.05] disabled:opacity-50 sm:w-auto"
//                 >
//                   <RotateCcw size={15} />
//                   Reset form
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading || !message.trim()}
//                   className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 bg-[length:200%_100%] px-5 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:bg-right disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   {loading ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
//                   {loading ? "Submitting ticket..." : "Submit support ticket"}
//                 </button>
//               </div>
//             </form>
//           </section>

//           <section className="overflow-hidden rounded-2xl border border-cyan-300/10 bg-[#101321]">
//             <div className="flex flex-col justify-between gap-3 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:px-6">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200">
//                   <Clock3 size={18} />
//                 </div>
//                 <div>
//                   <h2 className="text-base font-bold text-white">Ticket history</h2>
//                   <p className="mt-1 text-xs text-slate-400">Updates and replies from the support team</p>
//                 </div>
//               </div>
//               <button
//                 type="button"
//                 onClick={fetchMessages}
//                 disabled={fetching}
//                 className="inline-flex min-h-9 items-center justify-center gap-2 self-start rounded-lg border border-white/[0.09] px-3 text-xs font-semibold text-slate-300 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.05] disabled:opacity-50 sm:self-auto"
//               >
//                 <RefreshCw size={13} className={fetching ? "animate-spin" : ""} />
//                 Refresh
//               </button>
//             </div>

//             <div className="custom-scroll max-h-[790px] space-y-3 overflow-y-auto p-4 sm:p-5">
//               {fetching ? (
//                 <div className="flex flex-col items-center justify-center py-16 text-center">
//                   <span className="mb-4 h-9 w-9 animate-spin rounded-full border-2 border-violet-300/20 border-t-violet-300" />
//                   <p className="text-sm font-semibold text-slate-300">Loading ticket history</p>
//                   <p className="mt-1 text-xs text-slate-500">Please wait a moment…</p>
//                 </div>
//               ) : fetchError ? (
//                 <div className="rounded-xl border border-rose-400/20 bg-rose-400/[0.05] px-4 py-8 text-center">
//                   <AlertCircle size={22} className="mx-auto mb-3 text-rose-300" />
//                   <p className="text-sm font-semibold text-rose-200">{fetchError}</p>
//                   <button
//                     type="button"
//                     onClick={fetchMessages}
//                     className="mt-4 inline-flex items-center gap-2 rounded-lg border border-rose-300/20 px-3 py-2 text-xs font-bold text-rose-200 hover:bg-rose-300/10"
//                   >
//                     <RefreshCw size={13} />
//                     Try again
//                   </button>
//                 </div>
//               ) : userMessages.length === 0 ? (
//                 <div className="rounded-xl border border-dashed border-white/[0.12] bg-white/[0.015] px-4 py-12 text-center">
//                   <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/15 bg-violet-300/[0.06] text-violet-200">
//                     <MessageCircle size={21} />
//                   </div>
//                   <p className="text-sm font-bold text-slate-200">No tickets yet</p>
//                   <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-slate-500">
//                     Your submitted support requests and replies will appear here.
//                   </p>
//                 </div>
//               ) : (
//                 userMessages.map((item) => {
//                   const status = getStatus(item.status);
//                   const StatusIcon = status.Icon;

//                   return (
//                     <article
//                       key={item._id || `${item.createdAt}-${item.message}`}
//                       className="group rounded-xl border border-white/[0.08] bg-[#0b0e18] p-4 transition hover:border-violet-300/20 hover:bg-[#0d1020] sm:p-5"
//                     >
//                       <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
//                         <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider ${status.className}`}>
//                           <StatusIcon size={13} />
//                           {status.label}
//                         </span>
//                         <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
//                           <CalendarDays size={13} />
//                           {formatDate(item.createdAt)}
//                         </span>
//                       </div>

//                       <div className="flex gap-3">
//                         <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-300/[0.08] text-violet-200">
//                           <MessageCircle size={15} />
//                         </div>
//                         <div className="min-w-0 flex-1">
//                           <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-200">
//                             {item.message || "No message provided."}
//                           </p>
//                         </div>
//                       </div>

//                       {item.adminReply && (
//                         <div className="mt-4 rounded-xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[0.06] to-violet-300/[0.04] p-3.5 sm:p-4">
//                           <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-200">
//                             <ShieldCheck size={14} />
//                             Support team reply
//                             <ArrowUpRight size={12} className="ml-auto" />
//                           </div>
//                           <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-300">
//                             {item.adminReply}
//                           </p>
//                         </div>
//                       )}
//                     </article>
//                   );
//                 })
//               )}
//             </div>
//           </section>
//         </div>
//       </div>

//       {submittedMessage && (
//         <SuccessModal
//           isOpen={showModal}
//           onClose={() => {
//             setShowModal(false);
//             setSubmittedMessage(null);
//           }}
//           customTitle="Ticket Generated"
//           customMessage="We've received your message. Our support team will review it and get back to you shortly."
//         />
//       )}

//       <style>{`
//         .custom-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
//         .custom-scroll::-webkit-scrollbar-track { background: #080b13; border-radius: 8px; }
//         .custom-scroll::-webkit-scrollbar-thumb { background: #6250a7; border-radius: 10px; }
//         .custom-scroll { scrollbar-color: #6250a7 #080b13; scrollbar-width: thin; }
//       `}</style>
//     </main>
//   );
// };

// const InfoIcon = () => (
//   <AlertCircle size={14} className="mt-0.5 shrink-0 text-cyan-300" />
// );

// export default Support;



import React, { useState, useEffect, useCallback } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import SuccessModal from "../../components/modals/SuccessModal";
import {
  LifeBuoy,
  Clock3,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Wallet,
  Send,
  RotateCcw,
  MessageCircle,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  RefreshCw,
  UserRound,
  CalendarDays,
  CircleHelp,
} from "lucide-react";

const formatDate = (value) => {
  if (!value) return "Date unavailable";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatus = (status) => {
  const value = String(status || "Pending").toLowerCase();

  if (value === "resolved" || value === "closed") {
    return {
      label: status || "Resolved",
      className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
      Icon: CheckCircle2,
    };
  }

  if (value === "rejected") {
    return {
      label: status,
      className: "border-rose-400/20 bg-rose-400/10 text-rose-300",
      Icon: XCircle,
    };
  }

  if (value === "pending" || value === "open" || value === "in progress") {
    return {
      label: status || "Pending",
      className: "border-amber-300/20 bg-amber-300/10 text-amber-200",
      Icon: Clock3,
    };
  }

  return {
    label: status || "Pending",
    className: "border-violet-300/20 bg-violet-300/10 text-violet-200",
    Icon: CircleHelp,
  };
};

const Support = () => {
  const { user, token } = useAuth();
  const [message, setMessage] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [optional, setOptional] = useState("");
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(null);

  const fetchMessages = useCallback(async () => {
    if (!token) {
      setUserMessages([]);
      setFetching(false);
      return;
    }

    try {
      setFetching(true);
      setFetchError("");
      const res = await api.get(`/support/me?t=${Date.now()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserMessages(Array.isArray(res.data?.supports) ? res.data.supports : []);
    } catch (err) {
      console.error("Fetch messages error:", err);
      setFetchError("We couldn't load your ticket history. Please try again.");
    } finally {
      setFetching(false);
    }
  }, [token]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setStatusMsg({ type: "error", text: "Please enter your message." });
      return;
    }

    setLoading(true);
    setStatusMsg({ type: "", text: "" });

    try {
      const res = await api.post(
        "/support/create",
        {
          message: message.trim(),
          email: user?.email || "unknown",
          walletAddress: walletAddress.trim(),
          optional: optional.trim(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.success) {
        setSubmittedMessage({
          message: message.trim(),
          walletAddress: walletAddress.trim(),
          optional: optional.trim(),
        });
        setShowModal(true);
        setMessage("");
        setWalletAddress("");
        setOptional("");
        await fetchMessages();
      } else {
        setStatusMsg({
          type: "error",
          text: res.data?.error || "Ticket could not be submitted. Please try again.",
        });
      }
    } catch (err) {
      const errorText =
        err.response?.data?.error || "Failed to send message. Please try again.";
      setStatusMsg({ type: "error", text: errorText });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessage("");
    setWalletAddress("");
    setOptional("");
    setStatusMsg({ type: "", text: "" });
  };

  const pendingCount = userMessages.filter(
    (item) => String(item.status || "Pending").toLowerCase() === "pending"
  ).length;
  const resolvedCount = userMessages.filter((item) =>
    ["resolved", "closed"].includes(String(item.status || "").toLowerCase())
  ).length;

  return (
    <main className="relative z-10 min-h-screen w-full bg-[#080b13] px-3 pb-12 pt-6 font-sans text-slate-100 sm:px-5 sm:pt-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="relative mb-6 overflow-hidden rounded-2xl border border-violet-300/15 bg-[#101321] p-5 sm:p-7">
          <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 right-1/3 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-300/25 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 text-violet-200 shadow-lg shadow-violet-950/30">
                <LifeBuoy size={24} />
              </div>
              <div>
                <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-300">
                  <Sparkles size={13} />
                  Member care / help desk
                </div>
                <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Support Center
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                  Tell us what you need help with and follow your support tickets in one place.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-start rounded-xl border border-emerald-300/15 bg-emerald-300/[0.06] px-3 py-2 text-xs font-semibold text-emerald-200 md:self-center">
              <ShieldCheck size={15} />
              Your account support
            </div>
          </div>
        </header>

        <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <article className="flex items-center gap-4 rounded-xl border border-white/[0.08] bg-[#101321] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-200">
              <MessageCircle size={19} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Tickets submitted</p>
              <p className="mt-1 text-2xl font-extrabold tabular-nums text-white">
                {userMessages.length}
              </p>
            </div>
          </article>
          <article className="flex items-center gap-4 rounded-xl border border-amber-300/15 bg-[#101321] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-300/10 text-amber-200">
              <Clock3 size={19} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Awaiting response</p>
              <p className="mt-1 text-2xl font-extrabold tabular-nums text-white">
                {pendingCount}
              </p>
            </div>
          </article>
          <article className="flex items-center gap-4 rounded-xl border border-emerald-300/15 bg-[#101321] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-200">
              <CheckCircle2 size={19} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Resolved tickets</p>
              <p className="mt-1 text-2xl font-extrabold tabular-nums text-white">
                {resolvedCount}
              </p>
            </div>
          </article>
        </section>

        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-6">
          <section className="overflow-hidden rounded-2xl border border-violet-300/15 bg-[#101321] shadow-xl shadow-black/10">
            <div className="border-b border-white/[0.07] bg-gradient-to-r from-violet-500/[0.13] via-fuchsia-500/[0.07] to-transparent px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-200">
                  <Send size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Create a ticket</h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Add enough detail so our team can help you faster.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
              <div>
                <label htmlFor="support-user-id" className="mb-2 block text-xs font-semibold text-slate-300">
                  Member ID
                </label>
                <div className="relative">
                  <UserRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-300" />
                  <input
                    id="support-user-id"
                    type="text"
                    value={user?.userId || ""}
                    readOnly
                    className="h-11 w-full cursor-not-allowed rounded-xl border border-white/[0.08] bg-[#090c14] pl-10 pr-3 text-sm font-mono text-slate-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="support-wallet" className="mb-2 block text-xs font-semibold text-slate-300">
                  Wallet address <span className="font-normal text-slate-500">(optional)</span>
                </label>
                <div className="relative">
                  <Wallet size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-300" />
                  <input
                    id="support-wallet"
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    disabled={loading}
                    placeholder="Enter wallet address if relevant"
                    className="h-11 w-full rounded-xl border border-white/[0.09] bg-[#090c14] pl-10 pr-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10 disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="support-reference" className="mb-2 block text-xs font-semibold text-slate-300">
                  Reference / extra details <span className="font-normal text-slate-500">(optional)</span>
                </label>
                <input
                  id="support-reference"
                  type="text"
                  value={optional}
                  onChange={(e) => setOptional(e.target.value)}
                  disabled={loading}
                  placeholder="Transaction ID or other useful context"
                  className="h-11 w-full rounded-xl border border-white/[0.09] bg-[#090c14] px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-violet-300/50 focus:ring-2 focus:ring-violet-300/10 disabled:opacity-60"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor="support-message" className="block text-xs font-semibold text-slate-300">
                    How can we help? <span className="text-rose-300">*</span>
                  </label>
                  <span className={`text-[11px] tabular-nums ${message.length > 1800 ? "text-amber-200" : "text-slate-500"}`}>
                    {message.length} characters
                  </span>
                </div>
                <textarea
                  id="support-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe the issue, what happened, and any steps you've already tried..."
                  rows={6}
                  maxLength={3000}
                  required
                  disabled={loading}
                  className="custom-scroll w-full resize-y rounded-xl border border-white/[0.09] bg-[#090c14] px-3.5 py-3 text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-violet-300/50 focus:ring-2 focus:ring-violet-300/10 disabled:opacity-60"
                />
                <p className="mt-2 flex items-start gap-2 text-[11px] leading-5 text-slate-500">
                  <InfoIcon />
                  Never include your password, private key, or recovery phrase in a support ticket.
                </p>
              </div>

              {statusMsg.text && statusMsg.type === "error" && (
                <div role="alert" className="flex items-start gap-2 rounded-xl border border-rose-400/20 bg-rose-400/[0.07] px-3.5 py-3 text-sm text-rose-200">
                  <AlertCircle size={17} className="mt-0.5 shrink-0" />
                  <span>{statusMsg.text}</span>
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-white/[0.07] pt-5 sm:flex-row">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={loading}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.025] px-4 text-sm font-semibold text-slate-300 transition hover:border-violet-300/30 hover:bg-white/[0.05] disabled:opacity-50 sm:w-auto"
                >
                  <RotateCcw size={15} />
                  Reset form
                </button>
                <button
                  type="submit"
                  disabled={loading || !message.trim()}
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 bg-[length:200%_100%] px-5 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:bg-right disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
                  {loading ? "Submitting ticket..." : "Submit support ticket"}
                </button>
              </div>
            </form>
          </section>

          <section className="overflow-hidden rounded-2xl border border-cyan-300/10 bg-[#101321]">
            <div className="flex flex-col justify-between gap-3 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200">
                  <Clock3 size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Ticket history</h2>
                  <p className="mt-1 text-xs text-slate-400">Updates and replies from the support team</p>
                </div>
              </div>
              <button
                type="button"
                onClick={fetchMessages}
                disabled={fetching}
                className="inline-flex min-h-9 items-center justify-center gap-2 self-start rounded-lg border border-white/[0.09] px-3 text-xs font-semibold text-slate-300 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.05] disabled:opacity-50 sm:self-auto"
              >
                <RefreshCw size={13} className={fetching ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>

            <div className="custom-scroll max-h-[790px] space-y-3 overflow-y-auto p-4 sm:p-5">
              {fetching ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <span className="mb-4 h-9 w-9 animate-spin rounded-full border-2 border-violet-300/20 border-t-violet-300" />
                  <p className="text-sm font-semibold text-slate-300">Loading ticket history</p>
                  <p className="mt-1 text-xs text-slate-500">Please wait a moment…</p>
                </div>
              ) : fetchError ? (
                <div className="rounded-xl border border-rose-400/20 bg-rose-400/[0.05] px-4 py-8 text-center">
                  <AlertCircle size={22} className="mx-auto mb-3 text-rose-300" />
                  <p className="text-sm font-semibold text-rose-200">{fetchError}</p>
                  <button
                    type="button"
                    onClick={fetchMessages}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg border border-rose-300/20 px-3 py-2 text-xs font-bold text-rose-200 hover:bg-rose-300/10"
                  >
                    <RefreshCw size={13} />
                    Try again
                  </button>
                </div>
              ) : userMessages.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/[0.12] bg-white/[0.015] px-4 py-12 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/15 bg-violet-300/[0.06] text-violet-200">
                    <MessageCircle size={21} />
                  </div>
                  <p className="text-sm font-bold text-slate-200">No tickets yet</p>
                  <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-slate-500">
                    Your submitted support requests and replies will appear here.
                  </p>
                </div>
              ) : (
                userMessages.map((item) => {
                  const status = getStatus(item.status);
                  const StatusIcon = status.Icon;

                  return (
                    <article
                      key={item._id || `${item.createdAt}-${item.message}`}
                      className="group rounded-xl border border-white/[0.08] bg-[#0b0e18] p-4 transition hover:border-violet-300/20 hover:bg-[#0d1020] sm:p-5"
                    >
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider ${status.className}`}>
                          <StatusIcon size={13} />
                          {status.label}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                          <CalendarDays size={13} />
                          {formatDate(item.createdAt)}
                        </span>
                      </div>

                      <div className="flex gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-300/[0.08] text-violet-200">
                          <MessageCircle size={15} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-200">
                            {item.message || "No message provided."}
                          </p>
                        </div>
                      </div>

                      {item.adminReply && (
                        <div className="mt-4 rounded-xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[0.06] to-violet-300/[0.04] p-3.5 sm:p-4">
                          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-200">
                            <ShieldCheck size={14} />
                            Support team reply
                            <ArrowUpRight size={12} className="ml-auto" />
                          </div>
                          <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-300">
                            {item.adminReply}
                          </p>
                        </div>
                      )}
                    </article>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </div>

      {submittedMessage && (
        <SuccessModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSubmittedMessage(null);
          }}
          customTitle="Ticket Generated"
          customMessage="We've received your message. Our support team will review it and get back to you shortly."
        />
      )}

      <style>{`
        .custom-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scroll::-webkit-scrollbar-track { background: #080b13; border-radius: 8px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #6250a7; border-radius: 10px; }
        .custom-scroll { scrollbar-color: #6250a7 #080b13; scrollbar-width: thin; }
      `}</style>
    </main>
  );
};

const InfoIcon = () => (
  <AlertCircle size={14} className="mt-0.5 shrink-0 text-cyan-300" />
);

export default Support;
