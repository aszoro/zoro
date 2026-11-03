 

// // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // import api from "../../api/axios";

// // // // // // // const TotalEarningBox = ({ user }) => {
// // // // // // //   // Default fallback value agar API load na ho
// // // // // // //   const [myTopupDisplay, setMyTopupDisplay] = useState(Number(user?.topUpAmount || 0).toFixed(2));

// // // // // // //   // 1. My Earning Calculation
// // // // // // //   const calculatedTotal = (
// // // // // // //     (Number(user?.totalDirectIncome) || 0) +
// // // // // // //     (Number(user?.totalLevelIncome) || 0) +
// // // // // // //     (Number(user?.totalRoiIncome) || 0) +
// // // // // // //     (Number(user?.totalRewardIncome) || 0) +
// // // // // // //     (Number(user?.totalFastTrackIncome) || 0) +
// // // // // // //     (Number(user?.poolIncome) || 0)
// // // // // // //   );

// // // // // // //   const finalEarning = user?.totalEarnings ? Number(user.totalEarnings) : calculatedTotal;
// // // // // // //   const totalEarningDisplay = finalEarning.toFixed(2);

// // // // // // //   // 🔥 HELPER: Decimal128 ko number me convert karne ke liye
// // // // // // //   const getSafeAmount = (val) => {
// // // // // // //     if (!val) return 0;
// // // // // // //     if (val.$numberDecimal) return parseFloat(val.$numberDecimal);
// // // // // // //     return parseFloat(val) || 0;
// // // // // // //   };

// // // // // // //   // 2. 🔥 API SE TOPUP FETCH AUR TOTAL KARNE KA LOGIC 🔥
// // // // // // //   useEffect(() => {
// // // // // // //     const fetchTotalTopup = async () => {
// // // // // // //       if (!user?.userId) return;

// // // // // // //       try {
// // // // // // //         const res = await api.get(`/wallet/topup-history/${user.userId}?t=${new Date().getTime()}`);
        
// // // // // // //         if (Array.isArray(res.data)) {
// // // // // // //           const userTopups = res.data.filter((t) => {
// // // // // // //             const typeStr = (t.type || "").toLowerCase();
// // // // // // //             const sourceStr = (t.source || "").toLowerCase();
// // // // // // //             const descStr = (t.description || "").toUpperCase();
            
// // // // // // //             const isTopupRelated = 
// // // // // // //               typeStr.includes("topup") || 
// // // // // // //               sourceStr.includes("topup") || 
// // // // // // //               typeStr.includes("activation") || 
// // // // // // //               typeStr.includes("package");
              
// // // // // // //             const isNotPromo = !descStr.includes("PROMOTION");
            
// // // // // // //             return isTopupRelated && isNotPromo;
// // // // // // //           });

// // // // // // //           const uniqueTopups = Array.from(
// // // // // // //             new Map(userTopups.map((t) => [`${t._id}-${t.createdAt}`, t])).values()
// // // // // // //           );

// // // // // // //           let calculatedTotalAmount = 0;
// // // // // // //           const currentUserId = String(user.userId);

// // // // // // //           uniqueTopups.forEach((t) => {
// // // // // // //             let receiverId = t.toUserId ? String(t.toUserId) : String(t.userId);
// // // // // // //             const isDebitTransaction = (t.type || "").toLowerCase().includes("debit") || Number(getSafeAmount(t.amount)) < 0;

// // // // // // //             if (isDebitTransaction && !t.toUserId) {
// // // // // // //               const descMatch = t.description?.match(/(?:for|user|to|#|-)\s*([0-9]{4,10})/i);
// // // // // // //               if (descMatch && descMatch[1]) {
// // // // // // //                 receiverId = descMatch[1];
// // // // // // //               } else {
// // // // // // //                 receiverId = "Team Member";
// // // // // // //               }
// // // // // // //             }

// // // // // // //             if (receiverId === currentUserId) {
// // // // // // //               // ========================================================
// // // // // // //               // 🔥 NAYA LOGIC: 25 Days Cycle Check (Expired Topup Minus)
// // // // // // //               // ========================================================
// // // // // // //               const txDate = new Date(t.createdAt || t.date);
// // // // // // //               const today = new Date();
              
// // // // // // //               // Milliseconds ko Days me convert karna
// // // // // // //               const diffTime = today.getTime() - txDate.getTime();
// // // // // // //               const diffDays = diffTime / (1000 * 3600 * 24); 

// // // // // // //               // Agar topup 25 din se kam purana hai, tabhi usko Active (My Topup) me add karo
// // // // // // //               if (diffDays <= 25) {
// // // // // // //                 const finalAmount = Math.abs(getSafeAmount(t.amount || t.grossAmount));
// // // // // // //                 calculatedTotalAmount += finalAmount;
// // // // // // //               }
// // // // // // //             }
// // // // // // //           });

// // // // // // //           setMyTopupDisplay(calculatedTotalAmount.toFixed(2));
// // // // // // //         }
// // // // // // //       } catch (err) {
// // // // // // //         console.error("Topup fetch error in TotalEarningBox:", err);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchTotalTopup();
// // // // // // //   }, [user?.userId]);

// // // // // // //   return (
// // // // // // //     <div className="grid grid-cols-2 gap-3 mb-6">
      
// // // // // // //       {/* 🌑 DARK CARD 1: MY EARNING */}
// // // // // // //       <div className="bg-[#1c2233] p-4 rounded-xl border border-slate-700 shadow-lg flex flex-col justify-center min-h-[95px] transition-transform hover:scale-[1.02]">
// // // // // // //         <h3 className="text-emerald-400 font-extrabold text-[11px] sm:text-sm uppercase tracking-wider">
// // // // // // //           My Earning
// // // // // // //         </h3>
// // // // // // //         <p className="text-2xl sm:text-3xl font-black text-white mt-1 drop-shadow-md">
// // // // // // //           ${totalEarningDisplay}
// // // // // // //         </p>
// // // // // // //       </div>

// // // // // // //       {/* 🌑 DARK CARD 2: MY TOPUP */}
// // // // // // //       <div className="bg-[#1c2233] p-4 rounded-xl border border-slate-700 shadow-lg flex flex-col justify-center min-h-[95px] transition-transform hover:scale-[1.02]">
// // // // // // //         <h3 className="text-yellow-500 font-extrabold text-[11px] sm:text-sm uppercase tracking-wider">
// // // // // // //           My Topup
// // // // // // //         </h3>
// // // // // // //         <p className="text-2xl sm:text-3xl font-black text-white mt-1 drop-shadow-md">
// // // // // // //           ${myTopupDisplay}
// // // // // // //         </p>
// // // // // // //       </div>

// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default TotalEarningBox;


















// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import api from "../../api/axios";
// // // // // // import { X } from "lucide-react"; // Modal close icon ke liye

// // // // // // const TotalEarningBox = ({ user }) => {
// // // // // //   // Default fallback value agar API load na ho
// // // // // //   const [myTopupDisplay, setMyTopupDisplay] = useState(Number(user?.topUpAmount || 0).toFixed(2));

// // // // // //   // 🔥 PROMO ROLE LOGIC & STATES
// // // // // //   const isPromo = user?.role === 'promo';
  
// // // // // //   // Local storage se promo values uthayenge agar set hain toh
// // // // // //   const [promoEarning, setPromoEarning] = useState(() => localStorage.getItem(`promo_earning_${user?.userId}`) || null);
// // // // // //   const [promoTopup, setPromoTopup] = useState(() => localStorage.getItem(`promo_topup_${user?.userId}`) || null);

// // // // // //   // Modal states
// // // // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // // // //   const [editType, setEditType] = useState(""); // 'earning' or 'topup'
// // // // // //   const [editValue, setEditValue] = useState("");

// // // // // //   // 1. My Earning Calculation
// // // // // //   const calculatedTotal = (
// // // // // //     (Number(user?.totalDirectIncome) || 0) +
// // // // // //     (Number(user?.totalLevelIncome) || 0) +
// // // // // //     (Number(user?.totalRoiIncome) || 0) +
// // // // // //     (Number(user?.totalRewardIncome) || 0) +
// // // // // //     (Number(user?.totalFastTrackIncome) || 0) +
// // // // // //     (Number(user?.poolIncome) || 0)
// // // // // //   );

// // // // // //   const finalEarning = user?.totalEarnings ? Number(user.totalEarnings) : calculatedTotal;
// // // // // //   const totalEarningDisplay = finalEarning.toFixed(2);

// // // // // //   // 🔥 HELPER: Decimal128 ko number me convert karne ke liye
// // // // // //   const getSafeAmount = (val) => {
// // // // // //     if (!val) return 0;
// // // // // //     if (val.$numberDecimal) return parseFloat(val.$numberDecimal);
// // // // // //     return parseFloat(val) || 0;
// // // // // //   };

// // // // // //   // 2. 🔥 API SE TOPUP FETCH AUR TOTAL KARNE KA LOGIC 🔥
// // // // // //   useEffect(() => {
// // // // // //     const fetchTotalTopup = async () => {
// // // // // //       if (!user?.userId) return;

// // // // // //       try {
// // // // // //         const res = await api.get(`/wallet/topup-history/${user.userId}?t=${new Date().getTime()}`);
        
// // // // // //         if (Array.isArray(res.data)) {
// // // // // //           const userTopups = res.data.filter((t) => {
// // // // // //             const typeStr = (t.type || "").toLowerCase();
// // // // // //             const sourceStr = (t.source || "").toLowerCase();
// // // // // //             const descStr = (t.description || "").toUpperCase();
            
// // // // // //             const isTopupRelated = 
// // // // // //               typeStr.includes("topup") || 
// // // // // //               sourceStr.includes("topup") || 
// // // // // //               typeStr.includes("activation") || 
// // // // // //               typeStr.includes("package");
              
// // // // // //             const isNotPromo = !descStr.includes("PROMOTION");
            
// // // // // //             return isTopupRelated && isNotPromo;
// // // // // //           });

// // // // // //           const uniqueTopups = Array.from(
// // // // // //             new Map(userTopups.map((t) => [`${t._id}-${t.createdAt}`, t])).values()
// // // // // //           );

// // // // // //           let calculatedTotalAmount = 0;
// // // // // //           const currentUserId = String(user.userId);

// // // // // //           uniqueTopups.forEach((t) => {
// // // // // //             let receiverId = t.toUserId ? String(t.toUserId) : String(t.userId);
// // // // // //             const isDebitTransaction = (t.type || "").toLowerCase().includes("debit") || Number(getSafeAmount(t.amount)) < 0;

// // // // // //             if (isDebitTransaction && !t.toUserId) {
// // // // // //               const descMatch = t.description?.match(/(?:for|user|to|#|-)\s*([0-9]{4,10})/i);
// // // // // //               if (descMatch && descMatch[1]) {
// // // // // //                 receiverId = descMatch[1];
// // // // // //               } else {
// // // // // //                 receiverId = "Team Member";
// // // // // //               }
// // // // // //             }

// // // // // //             if (receiverId === currentUserId) {
// // // // // //               const txDate = new Date(t.createdAt || t.date);
// // // // // //               const today = new Date();
// // // // // //               const diffTime = today.getTime() - txDate.getTime();
// // // // // //               const diffDays = diffTime / (1000 * 3600 * 24); 

// // // // // //               if (diffDays <= 25) {
// // // // // //                 const finalAmount = Math.abs(getSafeAmount(t.amount || t.grossAmount));
// // // // // //                 calculatedTotalAmount += finalAmount;
// // // // // //               }
// // // // // //             }
// // // // // //           });

// // // // // //           setMyTopupDisplay(calculatedTotalAmount.toFixed(2));
// // // // // //         }
// // // // // //       } catch (err) {
// // // // // //         console.error("Topup fetch error in TotalEarningBox:", err);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchTotalTopup();
// // // // // //   }, [user?.userId]);


// // // // // //   // 🔥 MODAL HANDLERS FOR PROMO USER
// // // // // //   const handleDoubleClick = (type) => {
// // // // // //     if (!isPromo) return; // Normal user ke liye kuch nahi hoga
// // // // // //     setEditType(type);
// // // // // //     if (type === 'earning') setEditValue(promoEarning || totalEarningDisplay);
// // // // // //     if (type === 'topup') setEditValue(promoTopup || myTopupDisplay);
// // // // // //     setIsModalOpen(true);
// // // // // //   };

// // // // // //   const handleSavePromo = () => {
// // // // // //     if (editType === 'earning') {
// // // // // //       setPromoEarning(editValue);
// // // // // //       localStorage.setItem(`promo_earning_${user?.userId}`, editValue);
// // // // // //     } else if (editType === 'topup') {
// // // // // //       setPromoTopup(editValue);
// // // // // //       localStorage.setItem(`promo_topup_${user?.userId}`, editValue);
// // // // // //     }
// // // // // //     setIsModalOpen(false);
// // // // // //   };

// // // // // //   const handleResetPromo = () => {
// // // // // //     if (editType === 'earning') {
// // // // // //       setPromoEarning(null);
// // // // // //       localStorage.removeItem(`promo_earning_${user?.userId}`);
// // // // // //     } else if (editType === 'topup') {
// // // // // //       setPromoTopup(null);
// // // // // //       localStorage.removeItem(`promo_topup_${user?.userId}`);
// // // // // //     }
// // // // // //     setIsModalOpen(false);
// // // // // //   };

// // // // // //   // Final display values tayyar karna
// // // // // //   const displayEarning = promoEarning !== null ? Number(promoEarning).toFixed(2) : totalEarningDisplay;
// // // // // //   const displayTopup = promoTopup !== null ? Number(promoTopup).toFixed(2) : myTopupDisplay;

// // // // // //   return (
// // // // // //     <>
// // // // // //       <div className="grid grid-cols-2 gap-3 mb-6">
        
// // // // // //         {/* 🌑 DARK CARD 1: MY EARNING */}
// // // // // //         <div 
// // // // // //           onDoubleClick={() => handleDoubleClick('earning')}
// // // // // //           className={`bg-[#1c2233] p-4 rounded-xl border border-slate-700 shadow-lg flex flex-col justify-center min-h-[95px] transition-transform hover:scale-[1.02] ${isPromo ? 'cursor-pointer' : ''}`}
// // // // // //         >
// // // // // //           <h3 className="text-emerald-400 font-extrabold text-[11px] sm:text-sm uppercase tracking-wider">
// // // // // //             My Earning
// // // // // //           </h3>
// // // // // //           <p className="text-2xl sm:text-3xl font-black text-white mt-1 drop-shadow-md">
// // // // // //             ${displayEarning}
// // // // // //           </p>
// // // // // //         </div>

// // // // // //         {/* 🌑 DARK CARD 2: MY TOPUP */}
// // // // // //         <div 
// // // // // //           onDoubleClick={() => handleDoubleClick('topup')}
// // // // // //           className={`bg-[#1c2233] p-4 rounded-xl border border-slate-700 shadow-lg flex flex-col justify-center min-h-[95px] transition-transform hover:scale-[1.02] ${isPromo ? 'cursor-pointer' : ''}`}
// // // // // //         >
// // // // // //           <h3 className="text-yellow-500 font-extrabold text-[11px] sm:text-sm uppercase tracking-wider">
// // // // // //             My Topup
// // // // // //           </h3>
// // // // // //           <p className="text-2xl sm:text-3xl font-black text-white mt-1 drop-shadow-md">
// // // // // //             ${displayTopup}
// // // // // //           </p>
// // // // // //         </div>

// // // // // //       </div>

// // // // // //       {/* 🔥 PROMO EDIT MODAL 🔥 */}
// // // // // //       {isModalOpen && isPromo && (
// // // // // //         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99999] flex justify-center items-center p-4">
// // // // // //           <div className="bg-[#0b101e] w-full max-w-sm rounded-xl border border-[#d4af37]/30 p-5 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
// // // // // //             <div className="flex justify-between items-center mb-4">
// // // // // //               <h2 className="text-[#d4af37] font-bold text-lg">
// // // // // //                  {editType === 'earning' ? 'My Earning' : 'My Topup'} 
// // // // // //               </h2>
// // // // // //               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
// // // // // //                 <X size={20} />
// // // // // //               </button>
// // // // // //             </div>
            
// // // // // //             <input 
// // // // // //               type="number"
// // // // // //               value={editValue}
// // // // // //               onChange={(e) => setEditValue(e.target.value)}
// // // // // //               className="w-full bg-[#131927] border border-[#2d3748] text-white px-4 py-3 rounded-lg outline-none focus:border-[#e4c568] mb-4"
// // // // // //               placeholder="Enter custom amount..."
// // // // // //             />
            
// // // // // //             <div className="flex gap-3">
// // // // // //               <button 
// // // // // //                 onClick={handleResetPromo}
// // // // // //                 className="flex-1 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20 font-bold py-2.5 rounded-lg transition-colors"
// // // // // //               >
// // // // // //                 Reset to Original
// // // // // //               </button>
// // // // // //               <button 
// // // // // //                 onClick={handleSavePromo}
// // // // // //                 className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#e4c568] text-black font-extrabold py-2.5 rounded-lg hover:brightness-110 transition-all"
// // // // // //               >
// // // // // //                 Save Changes
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </>
// // // // // //   );
// // // // // // };

// // // // // // export default TotalEarningBox;































// // // // // import React, { useState, useEffect } from "react";
// // // // // import api from "../../api/axios";
// // // // // import { X } from "lucide-react"; 

// // // // // const TotalEarningBox = ({ user }) => {
// // // // //   // Default fallback value agar API load na ho
// // // // //   const [myTopupDisplay, setMyTopupDisplay] = useState(Number(user?.topUpAmount || 0).toFixed(2));

// // // // //   // 🔥 PROMO ROLE LOGIC & STATES
// // // // //   const isPromo = user?.role === 'promo';
  
// // // // //   // Local storage se promo values uthayenge agar set hain toh
// // // // //   const [promoEarning, setPromoEarning] = useState(() => localStorage.getItem(`promo_earning_${user?.userId}`) || null);
// // // // //   const [promoTopup, setPromoTopup] = useState(() => localStorage.getItem(`promo_topup_${user?.userId}`) || null);

// // // // //   // Modal states
// // // // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // // // //   const [editType, setEditType] = useState(""); // 'earning' or 'topup'
// // // // //   const [editValue, setEditValue] = useState("");

// // // // //   // 1. My Earning Calculation
// // // // //   const calculatedTotal = (
// // // // //     (Number(user?.totalDirectIncome) || 0) +
// // // // //     (Number(user?.totalLevelIncome) || 0) +
// // // // //     (Number(user?.totalRoiIncome) || 0) +
// // // // //     (Number(user?.totalRewardIncome) || 0) +
// // // // //     (Number(user?.totalFastTrackIncome) || 0) +
// // // // //     (Number(user?.poolIncome) || 0)
// // // // //   );

// // // // //   const finalEarning = user?.totalEarnings ? Number(user.totalEarnings) : calculatedTotal;
// // // // //   const totalEarningDisplay = finalEarning.toFixed(2);

// // // // //   const getSafeAmount = (val) => {
// // // // //     if (!val) return 0;
// // // // //     if (val.$numberDecimal) return parseFloat(val.$numberDecimal);
// // // // //     return parseFloat(val) || 0;
// // // // //   };

// // // // //   // 2. 🔥 API SE TOPUP FETCH (SIRF NORMAL, AUTO COMPOUND NAHI) 🔥
// // // // //   useEffect(() => {
// // // // //     const fetchTotalTopup = async () => {
// // // // //       if (!user?.userId) return;

// // // // //       try {
// // // // //         const res = await api.get(`/wallet/topup-history/${user.userId}?t=${new Date().getTime()}`);
        
// // // // //         if (Array.isArray(res.data)) {
// // // // //           const userTopups = res.data.filter((t) => {
// // // // //             const typeStr = (t.type || "").toLowerCase();
// // // // //             const sourceStr = (t.source || "").toLowerCase();
// // // // //             const descStr = (t.description || "").toUpperCase();
            
// // // // //             const isTopupRelated = 
// // // // //               typeStr.includes("topup") || 
// // // // //               sourceStr.includes("topup") || 
// // // // //               typeStr.includes("activation") || 
// // // // //               typeStr.includes("package");
              
// // // // //             const isNotPromo = !descStr.includes("PROMOTION");
            
// // // // //             // 🔥 NAYA FILTER: Auto Compound ko hatane ke liye
// // // // //             const isNotCompound = !typeStr.includes("compound") && !descStr.includes("COMPOUND");
            
// // // // //             return isTopupRelated && isNotPromo && isNotCompound;
// // // // //           });

// // // // //           const uniqueTopups = Array.from(
// // // // //             new Map(userTopups.map((t) => [`${t._id}-${t.createdAt}`, t])).values()
// // // // //           );

// // // // //           let calculatedTotalAmount = 0;
// // // // //           const currentUserId = String(user.userId);

// // // // //           uniqueTopups.forEach((t) => {
// // // // //             let receiverId = t.toUserId ? String(t.toUserId) : String(t.userId);
// // // // //             const isDebitTransaction = (t.type || "").toLowerCase().includes("debit") || Number(getSafeAmount(t.amount)) < 0;

// // // // //             if (isDebitTransaction && !t.toUserId) {
// // // // //               const descMatch = t.description?.match(/(?:for|user|to|#|-)\s*([0-9]{4,10})/i);
// // // // //               if (descMatch && descMatch[1]) {
// // // // //                 receiverId = descMatch[1];
// // // // //               } else {
// // // // //                 receiverId = "Team Member";
// // // // //               }
// // // // //             }

// // // // //             if (receiverId === currentUserId) {
// // // // //               const txDate = new Date(t.createdAt || t.date);
// // // // //               const today = new Date();
// // // // //               const diffTime = today.getTime() - txDate.getTime();
// // // // //               const diffDays = diffTime / (1000 * 3600 * 24); 

// // // // //               if (diffDays <= 25) {
// // // // //                 const finalAmount = Math.abs(getSafeAmount(t.amount || t.grossAmount));
// // // // //                 calculatedTotalAmount += finalAmount;
// // // // //               }
// // // // //             }
// // // // //           });

// // // // //           setMyTopupDisplay(calculatedTotalAmount.toFixed(2));
// // // // //         }
// // // // //       } catch (err) {
// // // // //         console.error("Topup fetch error in TotalEarningBox:", err);
// // // // //       }
// // // // //     };

// // // // //     fetchTotalTopup();
// // // // //   }, [user?.userId]);


// // // // //   // 🔥 MODAL HANDLERS FOR PROMO USER
// // // // //   const handleDoubleClick = (type) => {
// // // // //     if (!isPromo) return; 
// // // // //     setEditType(type);
// // // // //     if (type === 'earning') setEditValue(promoEarning || totalEarningDisplay);
// // // // //     if (type === 'topup') setEditValue(promoTopup || myTopupDisplay);
// // // // //     setIsModalOpen(true);
// // // // //   };

// // // // //   const handleSavePromo = () => {
// // // // //     if (editType === 'earning') {
// // // // //       setPromoEarning(editValue);
// // // // //       localStorage.setItem(`promo_earning_${user?.userId}`, editValue);
// // // // //     } else if (editType === 'topup') {
// // // // //       setPromoTopup(editValue);
// // // // //       localStorage.setItem(`promo_topup_${user?.userId}`, editValue);
// // // // //     }
// // // // //     setIsModalOpen(false);
// // // // //   };

// // // // //   const handleResetPromo = () => {
// // // // //     if (editType === 'earning') {
// // // // //       setPromoEarning(null);
// // // // //       localStorage.removeItem(`promo_earning_${user?.userId}`);
// // // // //     } else if (editType === 'topup') {
// // // // //       setPromoTopup(null);
// // // // //       localStorage.removeItem(`promo_topup_${user?.userId}`);
// // // // //     }
// // // // //     setIsModalOpen(false);
// // // // //   };

// // // // //   const displayEarning = promoEarning !== null ? Number(promoEarning).toFixed(2) : totalEarningDisplay;
// // // // //   const displayTopup = promoTopup !== null ? Number(promoTopup).toFixed(2) : myTopupDisplay;

// // // // //   return (
// // // // //     <>
// // // // //       <div className="grid grid-cols-2 gap-3 mb-6">
        
// // // // //         {/* 🌑 DARK CARD 1: MY EARNING */}
// // // // //         <div 
// // // // //           onDoubleClick={() => handleDoubleClick('earning')}
// // // // //           className={`bg-[#1c2233] p-4 rounded-xl border border-slate-700 shadow-lg flex flex-col justify-center min-h-[95px] transition-transform hover:scale-[1.02] ${isPromo ? 'cursor-pointer' : ''}`}
// // // // //         >
// // // // //           <h3 className="text-emerald-400 font-extrabold text-[11px] sm:text-sm uppercase tracking-wider">
// // // // //             My Earning
// // // // //           </h3>
// // // // //           <p className="text-2xl sm:text-3xl font-black text-white mt-1 drop-shadow-md">
// // // // //             ${displayEarning}
// // // // //           </p>
// // // // //         </div>

// // // // //         {/* 🌑 DARK CARD 2: MY TOPUP */}
// // // // //         <div 
// // // // //           onDoubleClick={() => handleDoubleClick('topup')}
// // // // //           className={`bg-[#1c2233] p-4 rounded-xl border border-slate-700 shadow-lg flex flex-col justify-center min-h-[95px] transition-transform hover:scale-[1.02] ${isPromo ? 'cursor-pointer' : ''}`}
// // // // //         >
// // // // //           <h3 className="text-yellow-500 font-extrabold text-[11px] sm:text-sm uppercase tracking-wider">
// // // // //             My Topup
// // // // //           </h3>
// // // // //           <p className="text-2xl sm:text-3xl font-black text-white mt-1 drop-shadow-md">
// // // // //             ${displayTopup}
// // // // //           </p>
// // // // //         </div>

// // // // //       </div>

// // // // //       {/* 🔥 PROMO EDIT MODAL 🔥 */}
// // // // //       {isModalOpen && isPromo && (
// // // // //         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99999] flex justify-center items-center p-4">
// // // // //           <div className="bg-[#0b101e] w-full max-w-sm rounded-xl border border-[#d4af37]/30 p-5 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
// // // // //             <div className="flex justify-between items-center mb-4">
// // // // //               <h2 className="text-[#d4af37] font-bold text-lg">
// // // // //                  {editType === 'earning' ? 'My Earning' : 'My Topup'} 
// // // // //               </h2>
// // // // //               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
// // // // //                 <X size={20} />
// // // // //               </button>
// // // // //             </div>
            
// // // // //             <input 
// // // // //               type="number"
// // // // //               value={editValue}
// // // // //               onChange={(e) => setEditValue(e.target.value)}
// // // // //               className="w-full bg-[#131927] border border-[#2d3748] text-white px-4 py-3 rounded-lg outline-none focus:border-[#e4c568] mb-4"
// // // // //               placeholder="Enter custom amount..."
// // // // //             />
            
// // // // //             <div className="flex gap-3">
// // // // //               <button 
// // // // //                 onClick={handleResetPromo}
// // // // //                 className="flex-1 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20 font-bold py-2.5 rounded-lg transition-colors"
// // // // //               >
// // // // //                 Reset to Original
// // // // //               </button>
// // // // //               <button 
// // // // //                 onClick={handleSavePromo}
// // // // //                 className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#e4c568] text-black font-extrabold py-2.5 rounded-lg hover:brightness-110 transition-all"
// // // // //               >
// // // // //                 Save Changes
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // export default TotalEarningBox;



// // import React, { useEffect, useState } from "react";
// // import { useAuth } from "../../context/AuthContext";
// // import { Wallet, TrendingUp, Pencil, X, RotateCcw, Check } from "lucide-react";

// // const formatMoney = (value) => {
// //   const amount = Number(value);
// //   return (Number.isFinite(amount) ? amount : 0).toLocaleString("en-US", {
// //     minimumFractionDigits: 2,
// //     maximumFractionDigits: 2,
// //   });
// // };

// // const TotalEarningBox = ({ user: userProp }) => {
// //   const { user: authUser } = useAuth();
// //   const user = userProp || authUser;

// //   const userId = String(user?.userId ?? "");
// //   const isPromo = user?.role === "promo";

// //   const [promoEarning, setPromoEarning] = useState(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [editValue, setEditValue] = useState("");
// //   const [error, setError] = useState("");

// //   // Load promo display value for the currently signed-in user.
// //   useEffect(() => {
// //     if (!userId) {
// //       setPromoEarning(null);
// //       setIsModalOpen(false);
// //       return;
// //     }

// //     const savedValue = localStorage.getItem(`promo_earning_${userId}`);

// //     setPromoEarning(
// //       savedValue !== null && savedValue.trim() !== "" &&
// //         Number.isFinite(Number(savedValue))
// //         ? Number(savedValue)
// //         : null
// //     );

// //     setIsModalOpen(false);
// //     setError("");
// //   }, [userId]);

// //   const calculatedTotal =
// //     (Number(user?.totalDirectIncome) || 0) +
// //     (Number(user?.totalLevelIncome) || 0) +
// //     (Number(user?.totalRoiIncome) || 0) +
// //     (Number(user?.totalRewardIncome) || 0) +
// //     (Number(user?.totalFastTrackIncome) || 0) +
// //     (Number(user?.poolIncome) || 0);

// //   const storedTotal = Number(user?.totalEarnings);

// //   const originalEarning =
// //     user?.totalEarnings !== undefined &&
// //     user?.totalEarnings !== null &&
// //     user?.totalEarnings !== "" &&
// //     Number.isFinite(storedTotal)
// //       ? storedTotal
// //       : calculatedTotal;

// //   const displayedEarning =
// //     isPromo && promoEarning !== null ? promoEarning : originalEarning;

// //   const openEditModal = () => {
// //     if (!isPromo) return;

// //     setEditValue(String(displayedEarning));
// //     setError("");
// //     setIsModalOpen(true);
// //   };

// //   const savePromoEarning = () => {
// //     const trimmedValue = editValue.trim();
// //     const amount = Number(trimmedValue);

// //     if (
// //       trimmedValue === "" ||
// //       !Number.isFinite(amount) ||
// //       amount < 0
// //     ) {
// //       setError("Please enter a valid amount of 0 or more.");
// //       return;
// //     }

// //     if (!userId) {
// //       setError("User ID is not available.");
// //       return;
// //     }

// //     localStorage.setItem(`promo_earning_${userId}`, String(amount));
// //     setPromoEarning(amount);
// //     setIsModalOpen(false);
// //     setError("");
// //   };

// //   const resetPromoEarning = () => {
// //     if (!userId) return;

// //     localStorage.removeItem(`promo_earning_${userId}`);
// //     setPromoEarning(null);
// //     setIsModalOpen(false);
// //     setError("");
// //   };

// //   return (
// //     <>
// //       <section className="relative w-full overflow-hidden rounded-2xl border border-fuchsia-300/20 bg-gradient-to-br from-[#21112b] via-[#151323] to-[#0c1822] p-5 shadow-xl shadow-black/20 sm:p-6">
// //         {/* Ambient background */}
// //         <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-fuchsia-500/[0.12] blur-3xl" />
// //         <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-cyan-400/[0.08] blur-3xl" />

// //         <div className="relative">
// //           <div className="flex items-start justify-between gap-4">
// //             <div className="flex min-w-0 items-center gap-3">
// //               <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-fuchsia-300/25 bg-fuchsia-400/[0.09] text-fuchsia-300">
// //                 <Wallet size={23} />
// //               </div>

// //               <div className="min-w-0">
// //                 <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
// //                   Earnings overview
// //                 </p>
// //                 <h3 className="mt-1 text-base font-extrabold text-white sm:text-lg">
// //                   My Earning
// //                 </h3>
// //               </div>
// //             </div>

// //             {isPromo && (
// //               <button
// //                 type="button"
// //                 onClick={openEditModal}
// //                 title="Edit earning display"
// //                 aria-label="Edit earning display"
// //                 className="flex shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.07] hover:text-cyan-200"
// //               >
// //                 <Pencil size={14} />
// //                 <span>Edit</span>
// //               </button>
// //             )}
// //           </div>

// //           <div
// //             onDoubleClick={openEditModal}
// //             title={isPromo ? "Double-click to edit displayed earning" : undefined}
// //             className={`mt-6 rounded-xl border border-white/[0.07] bg-black/20 p-4 sm:p-5 ${
// //               isPromo ? "cursor-pointer" : ""
// //             }`}
// //           >
// //             <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
// //               Total earnings
// //             </p>

// //             <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
// //               <span className="text-3xl font-black tracking-tight text-white sm:text-4xl">
// //                 ${formatMoney(displayedEarning)}
// //               </span>

// //               <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300">
// //                 <TrendingUp size={14} />
// //                 Earnings
// //               </span>
// //             </div>

// //             <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-3">
// //               <span className="text-[10px] text-slate-500">
// //                 {isPromo && promoEarning !== null
// //                   ? "Custom display amount"
// //                   : "Calculated from your account"}
// //               </span>

// //               {isPromo && promoEarning !== null && (
// //                 <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-300/[0.08] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-fuchsia-200">
// //                   Custom
// //                 </span>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Promo display editor */}
// //       {isModalOpen && isPromo && (
// //         <div
// //           className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
// //           onClick={() => setIsModalOpen(false)}
// //         >
// //           <div
// //             role="dialog"
// //             aria-modal="true"
// //             aria-labelledby="earning-modal-title"
// //             className="w-full max-w-sm rounded-2xl border border-fuchsia-300/20 bg-[#10111b] p-5 shadow-2xl shadow-black/50"
// //             onClick={(event) => event.stopPropagation()}
// //           >
// //             <div className="mb-5 flex items-center justify-between gap-3">
// //               <div>
// //                 <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-cyan-300">
// //                   Promo settings
// //                 </p>
// //                 <h2
// //                   id="earning-modal-title"
// //                   className="mt-1 text-lg font-extrabold text-white"
// //                 >
// //                   Edit My Earning
// //                 </h2>
// //               </div>

// //               <button
// //                 type="button"
// //                 onClick={() => setIsModalOpen(false)}
// //                 aria-label="Close editor"
// //                 className="rounded-lg p-2 text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
// //               >
// //                 <X size={20} />
// //               </button>
// //             </div>

// //             <label
// //               htmlFor="promo-earning-amount"
// //               className="mb-2 block text-xs font-semibold text-slate-400"
// //             >
// //               Custom display amount ($)
// //             </label>

// //             <input
// //               id="promo-earning-amount"
// //               type="number"
// //               min="0"
// //               step="0.01"
// //               inputMode="decimal"
// //               autoFocus
// //               value={editValue}
// //               onChange={(event) => {
// //                 setEditValue(event.target.value);
// //                 setError("");
// //               }}
// //               onKeyDown={(event) => {
// //                 if (event.key === "Enter") savePromoEarning();
// //                 if (event.key === "Escape") setIsModalOpen(false);
// //               }}
// //               className="w-full rounded-xl border border-white/10 bg-[#080811] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10"
// //               placeholder="Enter amount"
// //             />

// //             {error && (
// //               <p className="mt-2 text-xs font-medium text-rose-400">
// //                 {error}
// //               </p>
// //             )}

// //             <p className="mt-3 text-[11px] leading-5 text-slate-500">
// //               This changes the displayed amount for this promo account only.
// //               It does not change the actual account balance or database earnings.
// //             </p>

// //             <div className="mt-5 flex gap-3">
// //               <button
// //                 type="button"
// //                 onClick={resetPromoEarning}
// //                 className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-400/20 bg-rose-400/[0.06] py-3 text-xs font-bold text-rose-300 transition hover:bg-rose-400/[0.12]"
// //               >
// //                 <RotateCcw size={14} />
// //                 Reset
// //               </button>

// //               <button
// //                 type="button"
// //                 onClick={savePromoEarning}
// //                 className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-500 py-3 text-xs font-extrabold text-white shadow-lg shadow-fuchsia-950/20 transition hover:brightness-110"
// //               >
// //                 <Check size={15} />
// //                 Save
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default TotalEarningBox;




// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import {
//   Wallet,
//   TrendingUp,
//   Users,
//   Layers,
//   Package,
//   Crown,
//   Pencil,
//   X,
//   RotateCcw,
//   Check,
// } from "lucide-react";

// const formatMoney = (value) => {
//   const amount = Number(value);
//   return (Number.isFinite(amount) ? amount : 0).toLocaleString("en-US", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });
// };

// const getAmount = (...values) => {
//   for (const value of values) {
//     if (value !== undefined && value !== null && value !== "") {
//       const amount = Number(value);
//       if (Number.isFinite(amount)) return amount;
//     }
//   }
//   return 0;
// };

// const TotalEarningBox = ({ user: userProp }) => {
//   const { user: authUser } = useAuth();
//   const user = userProp || authUser;

//   const userId = String(user?.userId ?? "");
//   const isPromo = user?.role === "promo";

//   const [promoEarning, setPromoEarning] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editValue, setEditValue] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!userId) {
//       setPromoEarning(null);
//       setIsModalOpen(false);
//       return;
//     }

//     const savedValue = localStorage.getItem(`promo_earning_${userId}`);

//     setPromoEarning(
//       savedValue !== null &&
//         savedValue.trim() !== "" &&
//         Number.isFinite(Number(savedValue))
//         ? Number(savedValue)
//         : null
//     );

//     setIsModalOpen(false);
//     setError("");
//   }, [userId]);

//   const directEarning = getAmount(
//     user?.directIncome,
//     user?.directEarning
//   );

//   const levelEarning = getAmount(
//     user?.levelIncome,
//     user?.levelEarning
//   );

//   const totalDirectEarning = getAmount(user?.totalDirectIncome);
//   const totalLevelEarning = getAmount(user?.totalLevelIncome);

//   const packageRoiIncome = getAmount(
//     user?.totalRoiIncome,
//     user?.packageRoiIncome,
//     user?.roiIncome
//   );

//   const royaltyPoolIncome = getAmount(
//     user?.royaltyPoolIncome,
//     user?.poolIncome
//   );

//   const calculatedTotal =
//     totalDirectEarning +
//     totalLevelEarning +
//     packageRoiIncome +
//     getAmount(user?.totalRewardIncome) +
//     getAmount(user?.totalFastTrackIncome) +
//     royaltyPoolIncome;

//   const storedTotal = Number(user?.totalEarnings);

//   const originalEarning =
//     user?.totalEarnings !== undefined &&
//     user?.totalEarnings !== null &&
//     user?.totalEarnings !== "" &&
//     Number.isFinite(storedTotal)
//       ? storedTotal
//       : calculatedTotal;

//   const displayedEarning =
//     isPromo && promoEarning !== null ? promoEarning : originalEarning;

//   const openEditModal = () => {
//     if (!isPromo) return;
//     setEditValue(String(displayedEarning));
//     setError("");
//     setIsModalOpen(true);
//   };

//   const savePromoEarning = () => {
//     const trimmedValue = editValue.trim();
//     const amount = Number(trimmedValue);

//     if (trimmedValue === "" || !Number.isFinite(amount) || amount < 0) {
//       setError("Please enter a valid amount of 0 or more.");
//       return;
//     }

//     if (!userId) {
//       setError("User ID is not available.");
//       return;
//     }

//     localStorage.setItem(`promo_earning_${userId}`, String(amount));
//     setPromoEarning(amount);
//     setIsModalOpen(false);
//     setError("");
//   };

//   const resetPromoEarning = () => {
//     if (!userId) return;

//     localStorage.removeItem(`promo_earning_${userId}`);
//     setPromoEarning(null);
//     setIsModalOpen(false);
//     setError("");
//   };

//   const cards = [
//     {
//       title: "Direct Earning",
//       amount: directEarning,
//       icon: Users,
//       color: "text-cyan-300",
//       border: "border-cyan-400/20",
//       glow: "bg-cyan-400/10",
//     },
//     {
//       title: "Level Earning",
//       amount: levelEarning,
//       icon: Layers,
//       color: "text-violet-300",
//       border: "border-violet-400/20",
//       glow: "bg-violet-400/10",
//     },
//     {
//       title: "Total Direct Earning",
//       amount: totalDirectEarning,
//       icon: Users,
//       color: "text-blue-300",
//       border: "border-blue-400/20",
//       glow: "bg-blue-400/10",
//     },
//     {
//       title: "Total Level Earning",
//       amount: totalLevelEarning,
//       icon: Layers,
//       color: "text-purple-300",
//       border: "border-purple-400/20",
//       glow: "bg-purple-400/10",
//     },
//     {
//       title: "Package ROI Income",
//       amount: packageRoiIncome,
//       icon: Package,
//       color: "text-emerald-300",
//       border: "border-emerald-400/20",
//       glow: "bg-emerald-400/10",
//     },
//     {
//       title: "Total Earning",
//       amount: displayedEarning,
//       icon: Wallet,
//       color: "text-fuchsia-300",
//       border: "border-fuchsia-400/30",
//       glow: "bg-fuchsia-400/10",
//       isTotal: true,
//     },
//     {
//       title: "Royalty Pool Income",
//       amount: royaltyPoolIncome,
//       icon: Crown,
//       color: "text-amber-300",
//       border: "border-amber-400/20",
//       glow: "bg-amber-400/10",
//     },
//   ];

//   return (
//     <>
//       <section className="w-full">
//         <div className="mb-4">
//           <h2 className="text-lg font-extrabold text-white sm:text-xl">
//             Earnings Overview
//           </h2>
//           <p className="mt-1 text-xs text-slate-400">
//             Your income summary
//           </p>
//         </div>

//         <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
//           {cards.map((card) => {
//             const Icon = card.icon;

//             return (
//               <div
//                 key={card.title}
//                 className={`relative flex min-h-[142px] min-w-0 flex-col justify-between overflow-hidden rounded-2xl border bg-gradient-to-br from-[#21152c] via-[#151323] to-[#0c1822] p-3 shadow-lg shadow-black/20 sm:min-h-[160px] sm:p-5 ${card.border}`}
//               >
//                 <div
//                   className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl ${card.glow}`}
//                 />

//                 <div className="relative flex items-start justify-between gap-2">
//                   <div className="flex min-w-0 items-center gap-2">
//                     <div
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] ${card.color}`}
//                     >
//                       <Icon size={18} />
//                     </div>

//                     <p className="text-[10px] font-bold uppercase leading-4 tracking-wide text-slate-300 sm:text-xs">
//                       {card.title}
//                     </p>
//                   </div>

//                   {card.isTotal && isPromo && (
//                     <button
//                       type="button"
//                       onClick={openEditModal}
//                       title="Edit total earning"
//                       aria-label="Edit total earning"
//                       className="shrink-0 rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/10"
//                     >
//                       <Pencil size={14} />
//                     </button>
//                   )}
//                 </div>

//                 <div className="relative mt-5">
//                   <p className="break-words text-xl font-black tracking-tight text-white sm:text-2xl">
//                     ${formatMoney(card.amount)}
//                   </p>

//                   <div
//                     className={`mt-2 flex items-center gap-1 text-[10px] font-semibold sm:text-xs ${card.color}`}
//                   >
//                     <TrendingUp size={13} />
//                     <span>Income</span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       {isModalOpen && isPromo && (
//         <div
//           className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
//           onClick={() => setIsModalOpen(false)}
//         >
//           <div
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="earning-modal-title"
//             className="w-full max-w-sm rounded-2xl border border-fuchsia-300/20 bg-[#10111b] p-5 shadow-2xl"
//             onClick={(event) => event.stopPropagation()}
//           >
//             <div className="mb-5 flex items-center justify-between gap-3">
//               <div>
//                 <p className="text-[9px] font-bold uppercase tracking-widest text-cyan-300">
//                   Promo settings
//                 </p>
//                 <h2
//                   id="earning-modal-title"
//                   className="mt-1 text-lg font-extrabold text-white"
//                 >
//                   Edit Total Earning
//                 </h2>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setIsModalOpen(false)}
//                 aria-label="Close editor"
//                 className="rounded-lg p-2 text-slate-400 hover:bg-white/[0.06] hover:text-white"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <label
//               htmlFor="promo-earning-amount"
//               className="mb-2 block text-xs font-semibold text-slate-400"
//             >
//               Display amount ($)
//             </label>

//             <input
//               id="promo-earning-amount"
//               type="number"
//               min="0"
//               step="0.01"
//               value={editValue}
//               onChange={(event) => {
//                 setEditValue(event.target.value);
//                 setError("");
//               }}
//               onKeyDown={(event) => {
//                 if (event.key === "Enter") savePromoEarning();
//                 if (event.key === "Escape") setIsModalOpen(false);
//               }}
//               className="w-full rounded-xl border border-white/10 bg-[#080811] px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/50"
//               placeholder="Enter amount"
//             />

//             {error && (
//               <p className="mt-2 text-xs font-medium text-rose-400">
//                 {error}
//               </p>
//             )}

//             <p className="mt-3 text-[11px] leading-5 text-slate-500">
//               This changes the displayed total for this promo account only.
//               It does not update the database.
//             </p>

//             <div className="mt-5 flex gap-3">
//               <button
//                 type="button"
//                 onClick={resetPromoEarning}
//                 className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-400/20 py-3 text-xs font-bold text-rose-300 hover:bg-rose-400/10"
//               >
//                 <RotateCcw size={14} />
//                 Reset
//               </button>

//               <button
//                 type="button"
//                 onClick={savePromoEarning}
//                 className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-500 py-3 text-xs font-extrabold text-white hover:brightness-110"
//               >
//                 <Check size={15} />
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TotalEarningBox;


 


import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Wallet,
  TrendingUp,
  Users,
  Layers,
  Crown,
  Pencil,
  X,
  RotateCcw,
  Check,
} from "lucide-react";

const formatMoney = (value) => {
  const amount = Number(value);
  return (Number.isFinite(amount) ? amount : 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const getAmount = (...values) => {
  for (const value of values) {
    if (value !== undefined && value !== null && value !== "") {
      const amount = Number(value);
      if (Number.isFinite(amount)) return amount;
    }
  }
  return 0;
};

const TotalEarningBox = ({ user: userProp }) => {
  const { user: authUser } = useAuth();

  const user = {
    ...(authUser || {}),
    ...(userProp || {}),
  };

  const userId = String(user?.userId ?? "");
  const isPromo = user?.role === "promo";

  const [promoEarning, setPromoEarning] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setPromoEarning(null);
      setIsModalOpen(false);
      return;
    }

    const savedValue = localStorage.getItem(`promo_earning_${userId}`);

    setPromoEarning(
      savedValue !== null &&
        savedValue.trim() !== "" &&
        Number.isFinite(Number(savedValue))
        ? Number(savedValue)
        : null
    );

    setIsModalOpen(false);
    setError("");
  }, [userId]);

  const packageList = Array.isArray(user?.packageActivations)
    ? user.packageActivations
    : [];

  // 1. Total Direct Earning
  const totalDirectEarning = getAmount(user?.totalDirectIncome);

  // 2. Total Level ROI Earning
  const packageLevelRoi = packageList.reduce(
    (sum, pkg) => sum + getAmount(pkg.levelRoiEarned),
    0
  );

  const totalLevelRoiEarning = getAmount(
    user?.totalLevelRoiIncome,
    user?.levelRoiIncome,
    packageLevelRoi
  );

  // 3. Total Royalty Earning
  const packageRoyalty = packageList.reduce(
    (sum, pkg) => sum + getAmount(pkg.royaltyPoolEarned),
    0
  );

  const totalRoyaltyEarning = getAmount(
    user?.royaltyPoolIncome,
    user?.poolIncome,
    packageRoyalty
  );

  // 4. Total ROI Earning
  const packageRoi = packageList.reduce(
    (sum, pkg) => sum + getAmount(pkg.roiEarned),
    0
  );

  const totalRoiEarning = getAmount(
    user?.totalRoiIncome,
    user?.packageRoiIncome,
    user?.roiIncome,
    packageRoi
  );

  // 5. Total Earning = all four incomes
  const calculatedTotal =
    totalDirectEarning +
    totalLevelRoiEarning +
    totalRoyaltyEarning +
    totalRoiEarning;

  const displayedEarning =
    isPromo && promoEarning !== null
      ? promoEarning
      : calculatedTotal;

  const openEditModal = () => {
    if (!isPromo) return;

    setEditValue(String(displayedEarning));
    setError("");
    setIsModalOpen(true);
  };

  const savePromoEarning = () => {
    const trimmedValue = editValue.trim();
    const amount = Number(trimmedValue);

    if (trimmedValue === "" || !Number.isFinite(amount) || amount < 0) {
      setError("Please enter a valid amount of 0 or more.");
      return;
    }

    if (!userId) {
      setError("User ID is not available.");
      return;
    }

    localStorage.setItem(`promo_earning_${userId}`, String(amount));
    setPromoEarning(amount);
    setIsModalOpen(false);
    setError("");
  };

  const resetPromoEarning = () => {
    if (!userId) return;

    localStorage.removeItem(`promo_earning_${userId}`);
    setPromoEarning(null);
    setIsModalOpen(false);
    setError("");
  };

  const cards = [
    {
      title: "Total Direct Earning",
      amount: totalDirectEarning,
      icon: Users,
      color: "text-cyan-300",
      border: "border-cyan-400/20",
      glow: "bg-cyan-400/10",
    },
    {
      title: "Total Level ROI Earning",
      amount: totalLevelRoiEarning,
      icon: Layers,
      color: "text-violet-300",
      border: "border-violet-400/20",
      glow: "bg-violet-400/10",
    },
    {
      title: "Total Royalty Earning",
      amount: totalRoyaltyEarning,
      icon: Crown,
      color: "text-amber-300",
      border: "border-amber-400/20",
      glow: "bg-amber-400/10",
    },
    {
      title: "Total ROI Earning",
      amount: totalRoiEarning,
      icon: TrendingUp,
      color: "text-emerald-300",
      border: "border-emerald-400/20",
      glow: "bg-emerald-400/10",
    },
    {
      title: "Total Earning",
      amount: displayedEarning,
      icon: Wallet,
      color: "text-fuchsia-300",
      border: "border-fuchsia-400/30",
      glow: "bg-fuchsia-400/10",
      isTotal: true,
    },
  ];

  return (
    <>
      <section className="w-full">
        <div className="mb-4">
          <h2 className="text-lg font-extrabold text-white sm:text-xl">
            Earnings Overview
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Your complete income summary
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className={`relative flex min-h-[142px] min-w-0 flex-col justify-between overflow-hidden rounded-2xl border bg-gradient-to-br from-[#21152c] via-[#151323] to-[#0c1822] p-3 shadow-lg shadow-black/20 sm:min-h-[160px] sm:p-5 ${card.border}`}
              >
                <div
                  className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl ${card.glow}`}
                />

                <div className="relative flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] ${card.color}`}
                    >
                      <Icon size={18} />
                    </div>

                    <p className="text-[10px] font-bold uppercase leading-4 tracking-wide text-slate-300 sm:text-xs">
                      {card.title}
                    </p>
                  </div>

                  {card.isTotal && isPromo && (
                    <button
                      type="button"
                      onClick={openEditModal}
                      title="Edit total earning"
                      aria-label="Edit total earning"
                      className="shrink-0 rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/10"
                    >
                      <Pencil size={14} />
                    </button>
                  )}
                </div>

                <div className="relative mt-5">
                  <p className="break-words text-xl font-black tracking-tight text-white sm:text-2xl">
                    ${formatMoney(card.amount)}
                  </p>

                  <div
                    className={`mt-2 flex items-center gap-1 text-[10px] font-semibold sm:text-xs ${card.color}`}
                  >
                    <TrendingUp size={13} />
                    <span>Income</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {isModalOpen && isPromo && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="earning-modal-title"
            className="w-full max-w-sm rounded-2xl border border-fuchsia-300/20 bg-[#10111b] p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-cyan-300">
                  Promo settings
                </p>
                <h2
                  id="earning-modal-title"
                  className="mt-1 text-lg font-extrabold text-white"
                >
                  Edit Total Earning
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close editor"
                className="rounded-lg p-2 text-slate-400 hover:bg-white/[0.06] hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <label
              htmlFor="promo-earning-amount"
              className="mb-2 block text-xs font-semibold text-slate-400"
            >
              Display amount ($)
            </label>

            <input
              id="promo-earning-amount"
              type="number"
              min="0"
              step="0.01"
              value={editValue}
              onChange={(event) => {
                setEditValue(event.target.value);
                setError("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") savePromoEarning();
                if (event.key === "Escape") setIsModalOpen(false);
              }}
              className="w-full rounded-xl border border-white/10 bg-[#080811] px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/50"
              placeholder="Enter amount"
            />

            {error && (
              <p className="mt-2 text-xs font-medium text-rose-400">
                {error}
              </p>
            )}

            <p className="mt-3 text-[11px] leading-5 text-slate-500">
              This changes the displayed total for this promo account only.
              It does not update the database.
            </p>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={resetPromoEarning}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-400/20 py-3 text-xs font-bold text-rose-300 hover:bg-rose-400/10"
              >
                <RotateCcw size={14} />
                Reset
              </button>

              <button
                type="button"
                onClick={savePromoEarning}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-500 py-3 text-xs font-extrabold text-white hover:brightness-110"
              >
                <Check size={15} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TotalEarningBox;
