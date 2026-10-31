 


// // import React, { useState } from 'react';
// // import { useAuth } from '../../context/AuthContext'; 
// // import { Copy, Check, User } from 'lucide-react'; 

// // const UserInfoBoxes = () => {
// //   const { user } = useAuth();
// //   const [copied, setCopied] = useState(false); 

// //   // 🔥 NAYA LOGIC: 1 August 2026 se pehle walo ko fix '01-Aug-2026' dikhana hai
// //   let joinDate = 'N/A';
// //   if (user?.createdAt) {
// //     const userDate = new Date(user.createdAt);
    
// //     // Threshold date set ki hai: 1 August 2026
// //     const thresholdDate = new Date('2026-08-01T00:00:00'); 

// //     // Agar joining date 1 Aug 2026 se pehle ki hai (jaise 31 July), toh fix '01-Aug-2026' dikhao
// //     if (userDate < thresholdDate) {
// //       joinDate = '01-Aug-2026';
// //     } else {
// //       // Warna asli date dikhao
// //       joinDate = userDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
// //     }
// //   }

// //   // ID Copy Function
// //   const handleCopyId = () => {
// //     if (user?.userId) {
// //       navigator.clipboard.writeText(user.userId);
// //       setCopied(true);
// //       setTimeout(() => setCopied(false), 2000);
// //     }
// //   };

// //   return (
// //     <div className="w-full mb-2  flex justify-center">
      
// //       {/* 🔥 THODA BADA AUR KHULA HUA BLUE BOARD 🔥 */}
// //       <div className="bg-[#1c2233] border border-gray-700/50 w-full max-w-4xl rounded-xl shadow-lg p-3 sm:p-5 flex justify-between items-center">
        
// //         {/* 1. NAME */}
// //         <div className="flex items-center gap-2 sm:gap-4">
// //           <div className="bg-white/5 p-1.5 sm:p-2.5 rounded-lg text-[#d89814]">
// //             <User className="w-4 h-4 sm:w-6 sm:h-6" />
// //           </div>
// //           <div className="flex flex-col">
// //             <span className="text-gray-500 text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-0.5">Name</span>
// //             <span className="text-white text-xs sm:text-base font-bold capitalize truncate max-w-[80px] sm:max-w-[200px]">
// //               {user?.name || 'Unknown'}
// //             </span>
// //           </div>
// //         </div>

// //         {/* DIVIDER */}
// //         <div className="w-[1px] h-8 sm:h-12 bg-gray-700/50 mx-2 sm:mx-6"></div>

// //         {/* 2. USER ID */}
// //         <div className="flex items-center gap-2 sm:gap-4">
         
// //           <div className="flex flex-col">
// //             <span className="text-gray-500 text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-0.5">User ID</span>
// //             <div className="flex items-center gap-1.5 sm:gap-2">
// //               <span className="text-[#d89814] text-xs sm:text-base font-extrabold">
// //                 {user?.userId || 'N/A'}
// //               </span>
// //               {user?.userId && (
// //                 <button 
// //                   onClick={handleCopyId} 
// //                   className="text-gray-400 hover:text-white transition-colors p-1"
// //                   title="Copy ID"
// //                 >
// //                   {copied ? <Check size={14} className="text-green-500 sm:w-5 sm:h-5" /> : <Copy size={14} className="sm:w-5 sm:h-5" />}
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* DIVIDER */}
// //         <div className="w-[1px] h-8 sm:h-12 bg-gray-700/50 mx-2 sm:mx-6"></div>

// //         {/* 3. JOINING DATE */}
// //         <div className="flex items-center gap-2 sm:gap-4">
          
// //           <div className="flex flex-col">
// //             <span className="text-gray-500 text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-0.5">Joined</span>
// //             <span className="text-gray-200 text-xs sm:text-base font-bold">
// //               {joinDate}
// //             </span>
// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default UserInfoBoxes;

// import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext'; 
// import { Copy, Check, User, X } from 'lucide-react'; 

// const UserInfoBoxes = () => {
//   const { user } = useAuth();
//   const [copied, setCopied] = useState(false); 

//   // 🔥 PROMO ROLE LOGIC & STATES
//   const isPromo = user?.role === 'promo';

//   const [promoName, setPromoName] = useState(() => localStorage.getItem(`promo_name_${user?.userId}`) || null);
//   const [promoUserId, setPromoUserId] = useState(() => localStorage.getItem(`promo_userid_${user?.userId}`) || null);
//   const [promoJoinDate, setPromoJoinDate] = useState(() => localStorage.getItem(`promo_date_${user?.userId}`) || null);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editType, setEditType] = useState(""); 
//   const [editValue, setEditValue] = useState("");

//   // 🔥 1 August 2026 Logic
//   let originalJoinDate = 'N/A';
//   if (user?.createdAt) {
//     const userDate = new Date(user.createdAt);
//     const thresholdDate = new Date('2026-08-01T00:00:00'); 

//     if (userDate < thresholdDate) {
//       originalJoinDate = '01-Aug-2026';
//     } else {
//       originalJoinDate = userDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
//     }
//   }

//   const displayName = promoName !== null ? promoName : (user?.name || 'Unknown');
//   const displayUserId = promoUserId !== null ? promoUserId : (user?.userId || 'N/A');
//   const displayJoinDate = promoJoinDate !== null ? promoJoinDate : originalJoinDate;

//   const handleCopyId = () => {
//     if (displayUserId && displayUserId !== 'N/A') {
//       navigator.clipboard.writeText(displayUserId);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const handleDoubleClick = (type) => {
//     if (!isPromo) return; 
//     setEditType(type);
//     if (type === 'name') setEditValue(displayName);
//     if (type === 'userid') setEditValue(displayUserId);
//     if (type === 'date') setEditValue(displayJoinDate);
//     setIsModalOpen(true);
//   };

//   const handleSavePromo = () => {
//     if (editType === 'userid') {
//       const formattedVal = editValue.trim().toUpperCase();
//       const isValid = /^WF\d{7}$/.test(formattedVal); 
      
//       if (!isValid) {
//         alert("🚨 Invalid Format! User ID must start with 'WF' followed by exactly 7 digits. (Example: WF1234567)");
//         return;
//       }
//       setPromoUserId(formattedVal);
//       localStorage.setItem(`promo_userid_${user?.userId}`, formattedVal);
//     } 
//     else if (editType === 'name') {
//       setPromoName(editValue);
//       localStorage.setItem(`promo_name_${user?.userId}`, editValue);
//     } 
//     else if (editType === 'date') {
//       setPromoJoinDate(editValue);
//       localStorage.setItem(`promo_date_${user?.userId}`, editValue);
//     }
    
//     setIsModalOpen(false);
//   };

//   const handleResetPromo = () => {
//     if (editType === 'name') {
//       setPromoName(null);
//       localStorage.removeItem(`promo_name_${user?.userId}`);
//     } else if (editType === 'userid') {
//       setPromoUserId(null);
//       localStorage.removeItem(`promo_userid_${user?.userId}`);
//     } else if (editType === 'date') {
//       setPromoJoinDate(null);
//       localStorage.removeItem(`promo_date_${user?.userId}`);
//     }
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <div className="w-full mb-2 flex justify-center">
        
//         {/* 🔥 EXACT ORIGINAL DESIGN CLASS SE MATCH KIYA 🔥 */}
//         <div className="bg-[#1c2233] border border-gray-700/50 w-full max-w-4xl rounded-xl shadow-lg p-3 sm:p-5 flex justify-between items-center">
          
//           {/* 1. NAME */}
//           <div 
//             onDoubleClick={() => handleDoubleClick('name')} 
//             className={`flex items-center gap-2 sm:gap-4 ${isPromo ? 'cursor-pointer' : ''}`}
//           >
//             <div className="bg-white/5 p-1.5 sm:p-2.5 rounded-lg text-[#d89814]">
//               <User className="w-4 h-4 sm:w-6 sm:h-6" />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-gray-500 text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-0.5">Name</span>
//               <span className="text-white text-xs sm:text-base font-bold capitalize truncate max-w-[80px] sm:max-w-[200px]">
//                 {displayName}
//               </span>
//             </div>
//           </div>

//           {/* DIVIDER */}
//           <div className="w-[1px] h-8 sm:h-12 bg-gray-700/50 mx-2 sm:mx-6"></div>

//           {/* 2. USER ID */}
//           <div 
//             onDoubleClick={() => handleDoubleClick('userid')}
//             className={`flex items-center gap-2 sm:gap-4 ${isPromo ? 'cursor-pointer' : ''}`}
//           >
//             <div className="flex flex-col">
//               <span className="text-gray-500 text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-0.5">User ID</span>
//               <div className="flex items-center gap-1.5 sm:gap-2">
//                 <span className="text-[#d89814] text-xs sm:text-base font-extrabold">
//                   {displayUserId}
//                 </span>
//                 {displayUserId !== 'N/A' && (
//                   <button 
//                     onClick={(e) => { e.stopPropagation(); handleCopyId(); }} 
//                     className="text-gray-400 hover:text-white transition-colors p-1"
//                     title="Copy ID"
//                   >
//                     {copied ? <Check size={14} className="text-green-500 sm:w-5 sm:h-5" /> : <Copy size={14} className="sm:w-5 sm:h-5" />}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* DIVIDER */}
//           <div className="w-[1px] h-8 sm:h-12 bg-gray-700/50 mx-2 sm:mx-6"></div>

//           {/* 3. JOINING DATE */}
//           <div 
//             onDoubleClick={() => handleDoubleClick('date')}
//             className={`flex items-center gap-2 sm:gap-4 ${isPromo ? 'cursor-pointer' : ''}`}
//           >
//             <div className="flex flex-col">
//               <span className="text-gray-500 text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-0.5">Joined</span>
//               <span className="text-gray-200 text-xs sm:text-base font-bold">
//                 {displayJoinDate}
//               </span>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* 🔥 PROMO EDIT MODAL 🔥 */}
//       {isModalOpen && isPromo && (
//         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99999] flex justify-center items-center p-4">
//           <div className="bg-[#0b101e] w-full max-w-sm rounded-xl border border-[#d4af37]/30 p-5 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-[#d4af37] font-bold text-lg capitalize">
//                 {editType} 
//               </h2>
//               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
//                 <X size={20} />
//               </button>
//             </div>
            
//             <input 
//               type="text"
//               value={editValue}
//               onChange={(e) => setEditValue(e.target.value)}
//               className="w-full bg-[#131927] border border-[#2d3748] text-white px-4 py-3 rounded-lg outline-none focus:border-[#e4c568] mb-4"
//               placeholder={`Enter custom ${editType}...`}
//             />
            
//             {editType === 'userid' && (
//               <p className="text-xs text-gray-400 mb-4 -mt-2">Format: WF followed by 7 digits (e.g., WF8489157)</p>
//             )}
            
//             <div className="flex gap-3">
//               <button 
//                 onClick={handleResetPromo}
//                 className="flex-1 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20 font-bold py-2.5 rounded-lg transition-colors"
//               >
//                 Reset
//               </button>
//               <button 
//                 onClick={handleSavePromo}
//                 className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#e4c568] text-black font-extrabold py-2.5 rounded-lg hover:brightness-110 transition-all"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default UserInfoBoxes;



import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Copy, Check, UserRound, X, CalendarDays, ShieldCheck } from "lucide-react";

const formatDate = (value) => {
  if (!value) return "N/A";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-");
};

const getOriginalJoinDate = (createdAt) => {
  if (!createdAt) return "N/A";

  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "N/A";

  const thresholdDate = new Date("2026-08-01T00:00:00");

  return formatDate(
    date < thresholdDate ? "2026-08-01T00:00:00" : date
  );
};

const UserInfoBoxes = () => {
  const { user } = useAuth();
  const userId = String(user?.userId ?? "");
  const isPromo = user?.role === "promo";

  const [copied, setCopied] = useState(false);
  const [promoName, setPromoName] = useState(null);
  const [promoUserId, setPromoUserId] = useState(null);
  const [promoJoinDate, setPromoJoinDate] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editType, setEditType] = useState("");
  const [editValue, setEditValue] = useState("");

  // Load custom promo details when the signed-in user changes.
  useEffect(() => {
    if (!userId) {
      setPromoName(null);
      setPromoUserId(null);
      setPromoJoinDate(null);
      return;
    }

    setPromoName(localStorage.getItem(`promo_name_${userId}`));
    setPromoUserId(localStorage.getItem(`promo_userid_${userId}`));
    setPromoJoinDate(localStorage.getItem(`promo_date_${userId}`));
    setIsModalOpen(false);
  }, [userId]);

  const originalJoinDate = getOriginalJoinDate(user?.createdAt);

  const displayName = promoName ?? user?.name ?? "Unknown";
  const displayUserId = promoUserId ?? user?.userId ?? "N/A";
  const displayJoinDate = promoJoinDate ?? originalJoinDate;

  const handleCopyId = async () => {
    if (!displayUserId || displayUserId === "N/A") return;

    try {
      await navigator.clipboard.writeText(String(displayUserId));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Unable to copy user ID:", error);
      alert("Copy failed. Please copy the ID manually.");
    }
  };

  const handleDoubleClick = (type) => {
    if (!isPromo) return;

    setEditType(type);

    if (type === "name") setEditValue(String(displayName));
    if (type === "userid") setEditValue(String(displayUserId));
    if (type === "date") setEditValue(String(displayJoinDate));

    setIsModalOpen(true);
  };

  const handleSavePromo = () => {
    if (!userId) return;

    const value = editValue.trim();

    if (editType === "userid") {
      const formattedValue = value.toUpperCase();

      if (!/^ZG\d{7}$/.test(formattedValue)) {
        alert(
          "Invalid User ID. Use ZG followed by exactly 7 digits (e.g. ZG1234567)."
        );
        return;
      }

      setPromoUserId(formattedValue);
      localStorage.setItem(`promo_userid_${userId}`, formattedValue);
    } else if (editType === "name") {
      if (!value) {
        alert("Please enter a name.");
        return;
      }

      setPromoName(value);
      localStorage.setItem(`promo_name_${userId}`, value);
    } else if (editType === "date") {
      if (!value) {
        alert("Please enter a joining date.");
        return;
      }

      setPromoJoinDate(value);
      localStorage.setItem(`promo_date_${userId}`, value);
    }

    setIsModalOpen(false);
  };

  const handleResetPromo = () => {
    if (!userId) return;

    if (editType === "name") {
      localStorage.removeItem(`promo_name_${userId}`);
      setPromoName(null);
    } else if (editType === "userid") {
      localStorage.removeItem(`promo_userid_${userId}`);
      setPromoUserId(null);
    } else if (editType === "date") {
      localStorage.removeItem(`promo_date_${userId}`);
      setPromoJoinDate(null);
    }

    setIsModalOpen(false);
  };

  const editableClass = isPromo
    ? "cursor-pointer rounded-lg outline-none transition hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-cyan-400/60"
    : "";

  return (
    <>
      <div className="mb-2 w-full">
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-0">
          {/* Name */}
          <div
            onDoubleClick={() => handleDoubleClick("name")}
            title={isPromo ? "Double-click to edit name" : undefined}
            className={`flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#171326] to-[#10111b] p-4 sm:rounded-r-none ${editableClass}`}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-fuchsia-300/20 bg-fuchsia-400/[0.08] text-fuchsia-300">
              <UserRound size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">
                Player name
              </p>
              <p className="mt-1 truncate text-sm font-bold capitalize text-white sm:text-base">
                {displayName}
              </p>
            </div>
          </div>

          {/* User ID */}
          <div
            onDoubleClick={() => handleDoubleClick("userid")}
            title={isPromo ? "Double-click to edit user ID" : undefined}
            className={`flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#15172a] to-[#10111b] p-4 sm:rounded-none sm:border-x-0 ${editableClass}`}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300">
              <ShieldCheck size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">
                Player ID
              </p>

              <div className="mt-1 flex min-w-0 items-center gap-2">
                <p className="truncate font-mono text-sm font-extrabold tracking-wide text-cyan-300 sm:text-base">
                  {displayUserId}
                </p>

                {displayUserId !== "N/A" && (
                  <button
                    type="button"
                    onClick={handleCopyId}
                    className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
                    title="Copy user ID"
                    aria-label="Copy user ID"
                  >
                    {copied ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Joining date */}
          <div
            onDoubleClick={() => handleDoubleClick("date")}
            title={isPromo ? "Double-click to edit joining date" : undefined}
            className={`flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#171326] to-[#10111b] p-4 sm:rounded-l-none ${editableClass}`}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-fuchsia-300/20 bg-fuchsia-400/[0.08] text-fuchsia-300">
              <CalendarDays size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">
                Member since
              </p>
              <p className="mt-1 text-sm font-bold text-white sm:text-base">
                {displayJoinDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Promo edit modal */}
      {isModalOpen && isPromo && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-edit-title"
            className="w-full max-w-sm rounded-2xl border border-fuchsia-300/20 bg-[#10111b] p-5 shadow-2xl shadow-black/50"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-cyan-300">
                  Promo settings
                </p>
                <h2
                  id="promo-edit-title"
                  className="mt-1 text-lg font-extrabold capitalize text-white"
                >
                  Edit {editType}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
                aria-label="Close edit modal"
              >
                <X size={20} />
              </button>
            </div>

            <label
              htmlFor="promo-edit-value"
              className="mb-2 block text-xs font-semibold text-slate-400"
            >
              {editType === "userid"
                ? "Custom user ID"
                : editType === "date"
                  ? "Joining date"
                  : "Display name"}
            </label>

            <input
              id="promo-edit-value"
              type="text"
              value={editValue}
              onChange={(event) => setEditValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSavePromo();
                if (event.key === "Escape") setIsModalOpen(false);
              }}
              autoFocus
              className="mb-3 w-full rounded-xl border border-white/10 bg-[#080811] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10"
              placeholder={`Enter custom ${editType}...`}
            />

            {editType === "userid" && (
              <p className="mb-4 text-xs leading-5 text-slate-500">
                Format: ZG followed by 7 digits, for example ZG1234567.
              </p>
            )}

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={handleResetPromo}
                className="flex-1 rounded-xl border border-rose-400/20 bg-rose-400/[0.06] py-3 text-xs font-bold text-rose-300 transition hover:bg-rose-400/[0.12]"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={handleSavePromo}
                className="flex-1 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-500 py-3 text-xs font-extrabold text-white shadow-lg shadow-fuchsia-950/20 transition hover:brightness-110"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfoBoxes;
