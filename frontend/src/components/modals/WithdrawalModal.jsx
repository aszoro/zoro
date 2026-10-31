// // import React, { useState, useEffect } from "react";
// // import api from "../../api/axios";
// // import { useAuth } from "../../context/AuthContext";
// // import { useNavigate } from "react-router-dom";
// // import Swal from 'sweetalert2';
// // import { X, Eye, EyeOff, Zap, Users, RefreshCcw, ShieldCheck } from "lucide-react";
// // import { Loader2 } from "lucide-react";

// // const WithdrawalModal = ({ onClose }) => {
// //   const { user, token } = useAuth();
// //   const navigate = useNavigate();
  
// //   const [loading, setLoading] = useState(false);
// //   const [walletData, setWalletData] = useState({ 
// //     directIncome: 0, levelIncome: 0, roiIncome: 0, balance: 0, totalWithdrawn: 0, 
// //     walletAddress: user?.walletAddress || null // 🔥 FIX: Direct user context se address le liya pehle
// //   });
  
// //   const [directAmount, setDirectAmount] = useState("");
// //   const [levelAmount, setLevelAmount] = useState("");
// //   const [roiAmount, setRoiAmount] = useState("");
// //   const [transactionPassword, setTransactionPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [inlineMessage, setInlineMessage] = useState("");
// //   const [isError, setIsError] = useState(false);

// //   useEffect(() => {
// //     fetchWalletData();
// //   }, []);

// //   const fetchWalletData = async () => {
// //     try {
// //       const res = await api.get(`/wallet/info`, { headers: { Authorization: `Bearer ${token}` }});
// //       setWalletData({
// //         directIncome: res.data.directIncome || 0,
// //         levelIncome: res.data.levelIncome || 0,
// //         roiIncome: res.data.roiIncome || 0,
// //         balance: res.data.availableBalance || 0,
// //         totalWithdrawn: res.data.totalWithdrawn || 0,
// //         // 🔥 FIX: API se check karega, nahi mila toh existing user data se uthayega
// //         walletAddress: res.data.walletAddress || user?.walletAddress || null 
// //       });
// //     } catch (err) {
// //       console.error("Failed to fetch wallet data", err);
// //     }
// //   };

// //   const totalSelection = (Number(directAmount) || 0) + (Number(levelAmount) || 0) + (Number(roiAmount) || 0);

// //   // 🔥 YEH FUNCTION EXACT 4 DECIMALS DIKHAYEGA BINA ROUND OFF KIYE
// //   // const formatExact = (num) => {
// //   //   if (!num) return "0";
// //   //   const str = Number(num).toString(); 
// //   //   if (str.includes('.')) {
// //   //     const parts = str.split('.');
// //   //     return `${parts[0]}.${parts[1].substring(0, 4)}`; // Point ke baad max 4 digits
// //   //   }
// //   //   return str;
// //   // };

// //   // 🔥 YEH FUNCTION DUST (E-16) VALUES KO BHI PROPERLY HANDLE KAREGA
// //   const formatExact = (num) => {
// //     if (!num) return "0.0000";
// //     return Number(num).toFixed(4); 
// //   };

// //   // const handleSubmit = async () => {
// //   //   if (!walletData.walletAddress) {
// //   //     return Swal.fire({ icon: 'error', title: 'Address Missing', text: 'Please update your USDT BEP-20 Wallet Address in your profile first.', background: '#111827', color: '#ff4d4d' });
// //   //   }
// //   //   if (totalSelection < 2) {
// //   //     return Swal.fire({ icon: 'warning', title: 'Invalid Amount', text: 'Minimum total withdrawal is $2.', background: '#111827', color: '#d4af37' });
// //   //   }
// //   //   if (totalSelection > walletData.balance) {
// //   //     // 🔥 FIX: Error message me bhi formatExact laga diya
// //   //     return Swal.fire({ icon: 'error', title: 'Insufficient Balance', text: `You only have $${formatExact(walletData.balance)} available to withdraw.`, background: '#111827', color: '#ff4d4d' });
// //   //   }
// //   //   if (!transactionPassword) {
// //   //     return Swal.fire({ icon: 'warning', title: 'Password Required', text: 'Enter Transaction Password.', background: '#111827', color: '#d4af37' });
// //   //   }

// //   //   setLoading(true);
// //   //   try {
// //   //     const response = await api.post('/wallet/withdraw', {
// //   //       amount: totalSelection, 
// //   //       transactionPassword,
// //   //       details: { direct: directAmount, level: levelAmount, roi: roiAmount }
// //   //     }, { headers: { Authorization: `Bearer ${token}` }});

// //   //     if (response.data.success) {
// //   //       Swal.fire({ icon: 'success', title: 'Success!', text: response.data.message, background: '#111827', color: '#d4af37' });
// //   //       onClose();
// //   //      }
// //   //   } catch (err) {
// //   //     Swal.fire({ icon: 'error', title: 'Request Failed', text: err.response?.data?.message || 'Something went wrong.', background: '#111827', color: '#ff4d4d' });
// //   //   } finally {
// //   //     setLoading(false);
// //   //   }
// //   // };


// //  const handleSubmit = async (e) => {
// //   if (e && e.preventDefault) e.preventDefault();

// //   // 🔴 1. Purana Validation Logic (Swal Popups)
// //   if (!walletData.walletAddress) {
// //     return Swal.fire({ icon: 'error', title: 'Address Missing', text: 'Please update your USDT BEP-20 Wallet Address in your profile first.', background: '#111827', color: '#ff4d4d' });
// //   }
// //   if (totalSelection < 2) {
// //     return Swal.fire({ icon: 'warning', title: 'Invalid Amount', text: 'Minimum total withdrawal is $2.', background: '#111827', color: '#d4af37' });
// //   }
// //   if (totalSelection > walletData.balance) {
// //     return Swal.fire({ icon: 'error', title: 'Insufficient Balance', text: `You only have $${formatExact(walletData.balance)} available to withdraw.`, background: '#111827', color: '#ff4d4d' });
// //   }
// //   if (!transactionPassword) {
// //     return Swal.fire({ icon: 'warning', title: 'Password Required', text: 'Enter Transaction Password.', background: '#111827', color: '#d4af37' });
// //   }

// //   // 🟡 2. Start Loading (Processing State)
// //   setLoading(true);
// //   setInlineMessage(""); // Reset inline message

// //   try {
// //     const response = await api.post('/wallet/withdraw', {
// //       amount: totalSelection, 
// //       transactionPassword,
// //       details: { direct: directAmount, level: levelAmount, roi: roiAmount }
// //     }, { headers: { Authorization: `Bearer ${token}` }});

// //     // 🟢 3. Success Popup
// //     if (response.data.success) {
// //       Swal.fire({ icon: 'success', title: 'Success!', text: response.data.message, background: '#111827', color: '#d4af37' });
// //       onClose();
// //     }
// //   } catch (err) {
// //     const errorMsg = err.response?.data?.message || 'Something went wrong.';

// //     // 🔥 4. NAYA LOGIC: Sirf Heavy Traffic Error ke liye Inline Red Box
// // //     if (errorMsg.includes('Processing Please wait a while...') || errorMsg.includes('Processing Please wait a while...')) {
// // //       setInlineMessage("Processing Please wait a while...");
// // //     } else {
// // //       // Baki sabhi API errors ke liye wapas Swal Popup
// // //       Swal.fire({ icon: 'error', title: 'Request Failed', text: errorMsg, background: '#111827', color: '#ff4d4d' });
// // //     }
// // //   } finally {
// // //     setLoading(false);
// // //   }
// // // };

// // if (errorMsg.includes('Processing Please wait a while...')) {
// //       setInlineMessage("Processing Please wait a while...");
// //   } else if (errorMsg.includes('You can apply for withdrawal only once every 10 days')) {
// //       // 🔥 NAYA LOGIC: 10 din wala error ab popup ki jagah inline dikhega
// //       // Hum direct 'errorMsg' pass kar rahe hain taaki "after X days" wala dynamic text sahi dikhe
// //       setInlineMessage(errorMsg);
// //   } else {
// //       // Baki sabhi API errors ke liye wapas Swal Popup
// //       Swal.fire({ icon: 'error', title: 'Request Failed', text: errorMsg, background: '#111827', color: '#ff4d4d' });
// //   }
// // } finally {
// //   setLoading(false);
// // }
// //  };


// //   return (
// //     <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[99999] flex justify-center items-start sm:items-center pt-16 sm:pt-4 p-3 sm:p-4">
      
// //       <div className="bg-[#0b101e] w-full max-w-[420px] max-h-[85vh] sm:max-h-[90vh] rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.15)] border border-[#2d3748] overflow-hidden flex flex-col">
        
// //         {/* Header */}
// //         <div className="bg-[#e4c568] px-4 py-3 flex justify-between items-center shrink-0">
// //           <h2 className="text-black font-extrabold text-[17px] tracking-wide">
// //             Withdraw Funds
// //           </h2>
// //           <button onClick={onClose} className="text-black hover:bg-black/10 p-1 rounded-full transition-colors">
// //             <X size={20} strokeWidth={2.5} />
// //           </button>
// //         </div>

// //         {/* Scrollable Content Area */}
// //         <div className="p-4 bg-[#0b101e] flex-1 overflow-y-auto custom-scroll space-y-4">
          
// //           {/* Top Info Cards */}
// //           <div className="flex gap-2 mb-2">
// //             <div className="flex-1 bg-[#161c2d] border border-[#2d3748] p-3 rounded-lg text-center shadow-inner">
// //               <p className="text-[10px] text-gray-400 font-bold tracking-wider mb-1 uppercase">Withdrawable Balance</p>
// //               {/* 🔥 FIX: toFixed hatakar formatExact lagaya */}
// //               <p className="text-[#00ff88] font-black text-xl">${formatExact(walletData.balance)}</p>
// //             </div>
// //           </div>

// //           {/* 🔥 Mandatory Wallet Address Block */}
// //           <div className={`p-3 rounded-lg border ${walletData.walletAddress ? 'bg-[#131927] border-[#00ff88]/30' : 'bg-[#2a1111] border-[#ff4d4d]/50'}`}>
// //             <p className={`text-xs font-bold mb-1.5 flex items-center gap-1.5 ${walletData.walletAddress ? 'text-[#00ff88]' : 'text-[#ff4d4d]'}`}>
// //               <ShieldCheck size={14} /> YOUR SAVED USDT BEP-20 ADDRESS
// //             </p>
// //             {walletData.walletAddress ? (
// //               <p className="text-white text-sm break-all font-mono opacity-90">{walletData.walletAddress}</p>
// //             ) : (
// //               <p className="text-[#ff4d4d] text-[11px] font-semibold italic">Address not found! Please update in your profile to withdraw.</p>
// //             )}
// //           </div>

// //           {/* 🔥 DIRECT INCOME BOX */}
         

// //           <div className="bg-[#1e2536] p-3.5 rounded-lg border border-[#2d3748] shadow-sm">
// //   <div className="flex justify-between items-center mb-2.5">
// //     <span className="text-[#e4c568] text-xs font-bold flex items-center gap-1.5"><Zap size={14}/> DIRECT INCOME</span>
// //     {/* 🔥 Green color, increased text size, and bright white font */}
// //     <span className="text-green-400 text-sm sm:text-base font-extrabold">Earned: ${formatExact(walletData.directIncome)}</span>
// //   </div>
// //   <div className="flex items-center gap-2 bg-[#0b101e] border border-[#2d3748] rounded px-3 py-2.5 focus-within:border-[#e4c568] transition-colors">
// //     <span className="text-[#e4c568] font-bold">$</span>
// //     <input 
// //       type="number" value={directAmount} onChange={(e) => setDirectAmount(e.target.value)} 
// //       className="bg-transparent outline-none text-white w-full text-sm font-semibold" placeholder="0.00" 
// //     />
// //   </div>
// // </div>

// //           {/* 🔥 LEVEL INCOME BOX */}
// //          {/* 🔥 LEVEL INCOME BOX */}
// //           <div className="bg-[#1e2536] p-3.5 rounded-lg border border-[#2d3748] shadow-sm">
// //             <div className="flex justify-between items-center mb-2.5">
// //               <span className="text-[#60a5fa] text-xs font-bold flex items-center gap-1.5"><Users size={14}/> LEVEL INCOME</span>
// //               <span className="text-green-400 text-sm sm:text-base font-extrabold">Earned: ${formatExact(walletData.levelIncome)}</span>
// //             </div>
// //             <div className="flex items-center gap-2 bg-[#0b101e] border border-[#2d3748] rounded px-3 py-2.5 focus-within:border-[#60a5fa] transition-colors">
// //               <span className="text-[#60a5fa] font-bold">$</span>
// //               <input 
// //                 type="number" value={levelAmount} onChange={(e) => setLevelAmount(e.target.value)} 
// //                 className="bg-transparent outline-none text-white w-full text-sm font-semibold" placeholder="0.00" 
// //               />
// //             </div>
// //           </div>

// //           {/* 🔥 ROI INCOME BOX */}
// //           <div className="bg-[#1e2536] p-3.5 rounded-lg border border-[#2d3748] shadow-sm">
// //             <div className="flex justify-between items-center mb-2.5">
// //               <span className="text-[#c084fc] text-xs font-bold flex items-center gap-1.5"><RefreshCcw size5={14}/> ROI INCOME</span>
// //               <span className="text-green-400 text-sm sm:text-base font-extrabold">Earned: ${formatExact(walletData.roiIncome)}</span>
// //             </div>
// //             <div className="flex items-center gap-2 bg-[#0b101e] border border-[#2d3748] rounded px-3 py-2.5 focus-within:border-[#c084fc] transition-colors">
// //               <span className="text-[#c084fc] font-bold">$</span>
// //               <input 
// //                 type="number" value={roiAmount} onChange={(e) => setRoiAmount(e.target.value)} 
// //                 className="bg-transparent outline-none text-white w-full text-sm font-semibold" placeholder="0.00" 
// //               />
// //             </div>
// //           </div>

// //           {/* 🔥 TOTAL SELECTION */}
// //           <div className="flex justify-between items-center bg-[#131927] border border-[#d4af37]/30 p-3.5 rounded-lg mt-2">
// //             <span className="text-gray-300 text-xs font-extrabold tracking-widest uppercase">Total Selection</span>
// //             {/* 🔥 FIX: toFixed hatakar formatExact lagaya */}
// //             <span className="text-[#d4af37] text-lg font-black">${formatExact(totalSelection)}</span>
// //           </div>

// //           {/* Transaction Password */}
// //           <div className="mt-4">
// //             <label className="text-gray-400 text-[11px] font-bold mb-1.5 block tracking-wide uppercase">Transaction Password</label>
// //             <div className="relative">
// //               <input 
// //                 type={showPassword ? "text" : "password"}
// //                 value={transactionPassword}
// //                 onChange={(e) => setTransactionPassword(e.target.value)}
// //                 placeholder="Enter Secure PIN"
// //                 className="w-full bg-[#131927] border border-[#2d3748] text-white px-4 py-3 rounded-lg outline-none focus:border-[#e4c568] focus:ring-1 focus:ring-[#e4c568] placeholder-gray-600 text-sm font-semibold"
// //               />
// //               <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
// //                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Submit Button */}
// //           {/* <button 
// //             onClick={handleSubmit}
// //             disabled={loading || !walletData.walletAddress}
// //             className="w-full mt-2 bg-gradient-to-r from-[#d4af37] to-[#e4c568] hover:brightness-110 text-black font-extrabold py-3.5 rounded-lg shadow-[0_0_15px_rgba(228,197,104,0.3)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 uppercase tracking-widest text-[14px]"
// //           >
// //             {loading ? 'Processing...' : 'WITHDRAW NOW'}
// //           </button> */}


// //         {/* <div className="mt-2">
// //   <button 
// //     onClick={handleSubmit}
// //     disabled={loading || !walletData?.walletAddress}
// //     className="w-full bg-gradient-to-r from-[#d4af37] to-[#e4c568] hover:brightness-110 text-black font-extrabold py-3.5 px-4 rounded-xl shadow-[0_0_15px_rgba(228,197,104,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:hover:scale-100 uppercase tracking-widest text-[12px] sm:text-[13px] leading-snug flex items-center justify-center"
// //   >
// //     {loading ? (
// //       <div className="flex items-center gap-2">
// //         <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin shrink-0"></span>
// //         <span>PROCESSING... PLEASE WAIT</span>
// //       </div>
// //     ) : inlineMessage ? (
// //        <span className="animate-pulse text-center w-full">
// //         {inlineMessage}
// //       </span>
// //     ) : (
// //        <span>WITHDRAW NOW</span>
// //     )}
// //   </button>
// // </div> */}


// // <div className="mt-2">
// //   <button 
// //     onClick={handleSubmit}
// //     disabled={loading || !walletData?.walletAddress}
// //     className="w-full bg-gradient-to-r from-[#d4af37] to-[#e4c568] hover:brightness-110 text-black font-extrabold py-3.5 px-4 rounded-xl shadow-[0_0_15px_rgba(228,197,104,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:hover:scale-100 uppercase tracking-widest text-[12px] sm:text-[14px] flex items-center justify-center gap-2 leading-snug"
// //   >
// //     {loading ? (
// //       <>
// //         {/* 🔥 Black Spinner & Processing Text */}
// //         <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin shrink-0"></span>
// //         <span>PROCESSING... PLEASE WAIT</span>
// //       </>
// //     ) : inlineMessage ? (
// //       /* 🔥 Heavy Traffic Message (In Gold Button Only) */
// //       <span className="animate-pulse text-center">{inlineMessage}</span>
// //     ) : (
// //       /* 🔥 Default State */
// //       <span>WITHDRAW NOW</span>
// //     )}
// //   </button>
// // </div>
// //           {/* Terms and Conditions */}
// //           {/* <div className="mt-4 text-[#6b7280] text-[10px] leading-relaxed font-medium text-center px-2">
// //             <p>Minimum withdrawal is $2. Timing: 10:00 AM to 12:00 PM.</p>
// //             <p>Withdrawal Fees 0%. Payments processed via USDT BEP20.</p>
// //           </div> */}

// //           <div className="mt-4 text-[#9ca3af] text-xs sm:text-sm font-bold text-center px-2 space-y-1.5">
// //             <p>Min withdrawal is $2. Timing: 10:00 AM to 12:00 PM.</p>
            
// //             {/* 🔥 NAYE RULES */}
// //             <p className="text-[#d4af37]">Daily Withdrawal Limit: Equal to your highest active package amount.</p>
             
// //             <p>Receive time: 10:00 PM to 12:00 AM. 0% Fees via USDT BEP20.</p>
// //            <p className="text-[8px] text-gray-400 mt-1">
// //      You can apply for a withdrawal only once every 10 days. The requested amount will be credited to your wallet exactly 10 days after the withdrawal date.
// // </p>
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default WithdrawalModal;










// import React, { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { useAuth } from "../../context/AuthContext";
// import Swal from "sweetalert2";
// import {
//   X,
//   Eye,
//   EyeOff,
//   Zap,
//   Users,
//   RefreshCcw,
//   ShieldCheck,
//   Crown,
//   Wallet,
//   ArrowUpRight,
//   LockKeyhole,
//   CheckCircle2,
//   CircleDollarSign,
//   ChevronRight,
// } from "lucide-react";

// const WithdrawalModal = ({ onClose }) => {
//   const { user, token } = useAuth();

//   const [loading, setLoading] = useState(false);
//   const [walletData, setWalletData] = useState({
//     directIncome: 0,
//     levelIncome: 0,
//     roiIncome: 0,
//     royaltyPoolIncome: 0,
//     balance: 0,
//     totalWithdrawn: 0,
//     walletAddress: user?.walletAddress || "",
//   });

//   const [directAmount, setDirectAmount] = useState("");
//   const [levelAmount, setLevelAmount] = useState("");
//   const [roiAmount, setRoiAmount] = useState("");
//   const [royaltyAmount, setRoyaltyAmount] = useState("");
//   const [transactionPassword, setTransactionPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [inlineMessage, setInlineMessage] = useState("");

//   useEffect(() => {
//     let active = true;

//     const fetchWalletData = async () => {
//       try {
//         const res = await api.get("/wallet/info", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!active) return;

//         setWalletData({
//           directIncome: Number(res.data.directIncome) || 0,
//           levelIncome: Number(res.data.levelIncome) || 0,
//           roiIncome: Number(res.data.roiIncome) || 0,
//           royaltyPoolIncome:
//             Number(
//               res.data.royaltyPoolIncome ?? res.data.royaltyIncome ?? 0
//             ) || 0,
//           balance: Number(res.data.availableBalance) || 0,
//           totalWithdrawn: Number(res.data.totalWithdrawn) || 0,
//           walletAddress:
//             res.data.walletAddress || user?.walletAddress || "",
//         });
//       } catch (error) {
//         console.error("Failed to fetch wallet data:", error);
//       }
//     };

//     fetchWalletData();

//     return () => {
//       active = false;
//     };
//   }, [token, user?.walletAddress]);

//   const formatAmount = (value) =>
//     (Number(value) || 0).toFixed(4);

//   const incomeSources = [
//     {
//       id: "direct",
//       name: "Direct Income",
//       subtitle: "Referral rewards",
//       icon: Zap,
//       earned: walletData.directIncome,
//       amount: directAmount,
//       setAmount: setDirectAmount,
//       accent: "#48e8f4",
//       code: "DIR",
//     },
//     {
//       id: "level",
//       name: "Level Income",
//       subtitle: "Network commissions",
//       icon: Users,
//       earned: walletData.levelIncome,
//       amount: levelAmount,
//       setAmount: setLevelAmount,
//       accent: "#8ebaff",
//       code: "LVL",
//     },
//     {
//       id: "roi",
//       name: "ROI Income",
//       subtitle: "Investment returns",
//       icon: RefreshCcw,
//       earned: walletData.roiIncome,
//       amount: roiAmount,
//       setAmount: setRoiAmount,
//       accent: "#c0a2ff",
//       code: "ROI",
//     },
//     {
//       id: "royalty",
//       name: "Royalty Pool",
//       subtitle: "Royalty rewards",
//       icon: Crown,
//       earned: walletData.royaltyPoolIncome,
//       amount: royaltyAmount,
//       setAmount: setRoyaltyAmount,
//       accent: "#f0a2ff",
//       code: "RLT",
//     },
//   ];

//   const totalSelection = incomeSources.reduce(
//     (sum, source) => sum + (Number(source.amount) || 0),
//     0
//   );

//   const selectedCount = incomeSources.filter(
//     (source) => Number(source.amount) > 0
//   ).length;

//   const updateAmount = (source, value) => {
//     if (value === "") {
//       source.setAmount("");
//       return;
//     }

//     const parsed = Number(value);

//     if (!Number.isFinite(parsed) || parsed < 0) return;

//     source.setAmount(value);
//   };

//   const clearAmounts = () => {
//     setDirectAmount("");
//     setLevelAmount("");
//     setRoiAmount("");
//     setRoyaltyAmount("");
//     setTransactionPassword("");
//     setInlineMessage("");
//   };

//   const handleSubmit = async (event) => {
//     event?.preventDefault();
//     setInlineMessage("");

//     if (!walletData.walletAddress) {
//       await Swal.fire({
//         icon: "error",
//         title: "Wallet Not Found",
//         text: "Please save your USDT BEP-20 wallet address first.",
//         background: "#100d1c",
//         color: "#ffffff",
//         confirmButtonColor: "#8b5cf6",
//       });
//       return;
//     }

//     if (totalSelection < 2) {
//       await Swal.fire({
//         icon: "warning",
//         title: "Minimum Withdrawal",
//         text: "Minimum withdrawal amount is $2.",
//         background: "#100d1c",
//         color: "#ffffff",
//         confirmButtonColor: "#8b5cf6",
//       });
//       return;
//     }

//     if (totalSelection > walletData.balance) {
//       await Swal.fire({
//         icon: "error",
//         title: "Insufficient Balance",
//         text: "Your withdrawal amount exceeds your available balance.",
//         background: "#100d1c",
//         color: "#ffffff",
//         confirmButtonColor: "#8b5cf6",
//       });
//       return;
//     }

//     for (const source of incomeSources) {
//       if (Number(source.amount) > Number(source.earned)) {
//         await Swal.fire({
//           icon: "error",
//           title: "Invalid Amount",
//           text: `Your ${source.name} withdrawal cannot exceed its earned amount.`,
//           background: "#100d1c",
//           color: "#ffffff",
//           confirmButtonColor: "#8b5cf6",
//         });
//         return;
//       }
//     }

//     if (!transactionPassword.trim()) {
//       await Swal.fire({
//         icon: "warning",
//         title: "Password Required",
//         text: "Enter your transaction password to continue.",
//         background: "#100d1c",
//         color: "#ffffff",
//         confirmButtonColor: "#8b5cf6",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await api.post(
//         "/wallet/withdraw",
//         {
//           amount: Number(totalSelection.toFixed(4)),
//           transactionPassword,
//           details: {
//             direct: Number(directAmount) || 0,
//             level: Number(levelAmount) || 0,
//             roi: Number(roiAmount) || 0,
//             royaltyPool: Number(royaltyAmount) || 0,
//           },
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.data?.success) {
//         await Swal.fire({
//           icon: "success",
//           title: "Request Submitted",
//           text:
//             response.data.message ||
//             "Your withdrawal request has been submitted successfully.",
//           background: "#100d1c",
//           color: "#ffffff",
//           confirmButtonColor: "#8b5cf6",
//         });

//         onClose?.();
//       } else {
//         await Swal.fire({
//           icon: "error",
//           title: "Withdrawal Failed",
//           text: response.data?.message || "Unable to submit withdrawal.",
//           background: "#100d1c",
//           color: "#ffffff",
//           confirmButtonColor: "#8b5cf6",
//         });
//       }
//     } catch (error) {
//       const errorMsg =
//         error.response?.data?.message || "Something went wrong.";

//       if (
//         errorMsg.includes("Processing Please wait a while...") ||
//         errorMsg.includes("only once every 10 days")
//       ) {
//         setInlineMessage(errorMsg);
//       } else {
//         await Swal.fire({
//           icon: "error",
//           title: "Withdrawal Failed",
//           text: errorMsg,
//           background: "#100d1c",
//           color: "#ffffff",
//           confirmButtonColor: "#8b5cf6",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-[#05040b]/90 p-2 backdrop-blur-md sm:p-5">
//       <section
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="withdrawal-title"
//         className="relative my-auto flex max-h-[96dvh] w-full max-w-[520px] flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[#0b0914] text-white shadow-[0_25px_100px_rgba(0,0,0,0.65)]"
//       >
//         {/* Header */}
//         <header className="relative shrink-0 overflow-hidden border-b border-white/[0.07] px-5 pb-5 pt-5 sm:px-7">
//           <div className="pointer-events-none absolute -right-12 -top-20 h-44 w-44 rounded-full bg-violet-600/15 blur-[65px]" />

//           <div className="relative flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/25 bg-violet-500/10">
//                 <ArrowUpRight className="text-violet-300" size={23} />
//               </div>

//               <div>
//                 <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-300">
//                   ZORO FINANCE
//                 </p>
//                 <h2
//                   id="withdrawal-title"
//                   className="mt-1 text-xl font-black tracking-tight sm:text-2xl"
//                 >
//                   Withdraw Funds
//                 </h2>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={onClose}
//               aria-label="Close withdrawal modal"
//               className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-400 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
//             >
//               <X size={19} />
//             </button>
//           </div>

//           <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5">
//             <div className="flex items-center gap-2">
//               <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_9px_rgba(52,211,153,0.7)]" />
//               <span className="text-xs font-medium text-gray-400">
//                 Withdrawal portal
//               </span>
//             </div>
//             <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-300">
//               Secure session
//             </span>
//           </div>
//         </header>

//         <form
//           onSubmit={handleSubmit}
//           className="custom-scroll flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-6"
//         >
//           {/* Balance dashboard — no oversized balance card */}
//           <section className="relative overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-br from-[#21153a] via-[#151027] to-[#0e1020] p-5">
//             <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-fuchsia-500/10 blur-3xl" />

//             <div className="relative flex items-start justify-between gap-3">
//               <div>
//                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-200/70">
//                   Available to withdraw
//                 </p>

//                 <div className="mt-2 flex items-baseline gap-2">
//                   <span className="text-2xl font-black text-white">$</span>
//                   <span className="text-3xl font-black tracking-tight text-white sm:text-4xl">
//                     {formatAmount(walletData.balance)}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-violet-200">
//                 <Wallet size={21} />
//               </div>
//             </div>

//             <div className="relative mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
//               <div>
//                 <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
//                   Total withdrawn
//                 </p>
//                 <p className="mt-1 text-sm font-bold text-gray-200">
//                   ${formatAmount(walletData.totalWithdrawn)}
//                 </p>
//               </div>

//               <div className="border-l border-white/10 pl-4">
//                 <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
//                   Selected sources
//                 </p>
//                 <p className="mt-1 text-sm font-bold text-violet-200">
//                   {selectedCount} of 4
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* Wallet address — slim horizontal strip */}
//           <section className="flex items-start gap-3 border-b border-white/[0.08] pb-5">
//             <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
//               <ShieldCheck size={19} />
//             </div>

//             <div className="min-w-0 flex-1">
//               <div className="flex flex-wrap items-center gap-2">
//                 <p className="text-xs font-bold text-gray-200">
//                   Payout wallet
//                 </p>
//                 <span className="rounded-md bg-emerald-400/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
//                   BEP-20
//                 </span>
//               </div>

//               <p className="mt-1.5 break-all font-mono text-[11px] leading-5 text-gray-500 sm:text-xs">
//                 {walletData.walletAddress || "No wallet address saved"}
//               </p>
//             </div>
//           </section>

//           {/* Completely new layout: one ledger, not four separate cards */}
//           <section>
//             <div className="mb-3 flex items-end justify-between gap-3">
//               <div>
//                 <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-300">
//                   Allocation
//                 </p>
//                 <h3 className="mt-1 text-lg font-extrabold text-white">
//                   Choose income
//                 </h3>
//               </div>

//               <span className="pb-1 text-[10px] font-medium text-gray-500">
//                 Amount in USD
//               </span>
//             </div>

//             <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0e0c18]">
//               <div className="grid grid-cols-[1fr_125px] items-center gap-2 border-b border-white/[0.08] bg-white/[0.025] px-3 py-2.5 sm:grid-cols-[1fr_145px] sm:px-4">
//                 <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-500">
//                   Income source
//                 </span>
//                 <span className="text-right text-[9px] font-bold uppercase tracking-[0.16em] text-gray-500">
//                   Withdraw amount
//                 </span>
//               </div>

//               {incomeSources.map((source, index) => {
//                 const Icon = source.icon;
//                 const amount = Number(source.amount) || 0;
//                 const hasAmount = amount > 0;

//                 return (
//                   <div
//                     key={source.id}
//                     className={`grid grid-cols-[1fr_125px] items-center gap-2 px-3 py-4 transition-colors sm:grid-cols-[1fr_145px] sm:px-4 ${
//                       index !== incomeSources.length - 1
//                         ? "border-b border-white/[0.07]"
//                         : ""
//                     } ${
//                       hasAmount ? "bg-violet-400/[0.035]" : "bg-transparent"
//                     }`}
//                   >
//                     <div className="flex min-w-0 items-center gap-2.5">
//                       <div
//                         className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
//                         style={{
//                           backgroundColor: `${source.accent}12`,
//                           color: source.accent,
//                         }}
//                       >
//                         <Icon size={18} strokeWidth={2} />
//                       </div>

//                       <div className="min-w-0">
//                         <p className="truncate text-xs font-extrabold text-gray-100 sm:text-sm">
//                           {source.name}
//                         </p>
//                         <p className="mt-1 truncate text-[10px] text-gray-500">
//                           {source.subtitle}
//                         </p>
//                         <p
//                           className="mt-1 text-[10px] font-semibold"
//                           style={{ color: source.accent }}
//                         >
//                           Earned ${formatAmount(source.earned)}
//                         </p>
//                       </div>
//                     </div>

//                     <div
//                       className={`flex min-w-0 items-center rounded-xl border bg-[#080710] px-2.5 transition ${
//                         hasAmount
//                           ? "border-violet-400/40"
//                           : "border-white/[0.09] focus-within:border-violet-400/50"
//                       }`}
//                     >
//                       <span
//                         className="mr-1.5 text-sm font-black"
//                         style={{ color: source.accent }}
//                       >
//                         $
//                       </span>

//                       <input
//                         type="number"
//                         min="0"
//                         max={source.earned}
//                         step="0.0001"
//                         inputMode="decimal"
//                         aria-label={`${source.name} withdrawal amount`}
//                         placeholder="0.0000"
//                         value={source.amount}
//                         onChange={(event) =>
//                           updateAmount(source, event.target.value)
//                         }
//                         className="w-full min-w-0 bg-transparent py-3 text-xs font-bold text-white outline-none placeholder:text-gray-700 sm:text-sm"
//                       />
//                     </div>
//                   </div>
//                 );
//               })}

//               <div className="flex items-center justify-between gap-3 border-t border-violet-400/15 bg-violet-400/[0.055] px-4 py-3">
//                 <div>
//                   <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-violet-200/70">
//                     Allocation total
//                   </p>
//                   <p className="mt-1 text-[10px] text-gray-500">
//                     Minimum $2.00
//                   </p>
//                 </div>

//                 <p className="text-xl font-black tracking-tight text-white sm:text-2xl">
//                   <span className="mr-1 text-violet-300">$</span>
//                   {formatAmount(totalSelection)}
//                 </p>
//               </div>
//             </div>

//             <div className="mt-3 flex items-start gap-2 text-[10px] leading-4 text-gray-500">
//               <CircleDollarSign
//                 size={14}
//                 className="mt-0.5 shrink-0 text-violet-300"
//               />
//               <p>
//                 Enter the amount for each income source. Your combined amount
//                 must not exceed your available balance or the earned amount
//                 for each source.
//               </p>
//             </div>
//           </section>

//           {/* Transaction password */}
//           <section>
//             <div className="mb-2 flex items-center justify-between">
//               <label
//                 htmlFor="withdraw-transaction-password"
//                 className="text-xs font-bold text-gray-200"
//               >
//                 Transaction password
//               </label>
//               <LockKeyhole size={15} className="text-violet-300" />
//             </div>

//             <div className="flex items-center rounded-xl border border-white/10 bg-[#080710] transition focus-within:border-violet-400/50">
//               <div className="flex h-12 w-11 shrink-0 items-center justify-center text-gray-500">
//                 <LockKeyhole size={17} />
//               </div>

//               <input
//                 id="withdraw-transaction-password"
//                 type={showPassword ? "text" : "password"}
//                 autoComplete="current-password"
//                 value={transactionPassword}
//                 onChange={(event) =>
//                   setTransactionPassword(event.target.value)
//                 }
//                 placeholder="Enter transaction password"
//                 className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword((previous) => !previous)}
//                 aria-label={
//                   showPassword ? "Hide password" : "Show password"
//                 }
//                 className="flex h-12 w-11 shrink-0 items-center justify-center text-gray-500 transition hover:text-violet-300"
//               >
//                 {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
//               </button>
//             </div>
//           </section>

//           {/* Inline backend messages */}
//           {inlineMessage && (
//             <div
//               role="alert"
//               className="flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-3 text-xs leading-5 text-amber-200"
//             >
//               <ShieldCheck size={16} className="mt-0.5 shrink-0" />
//               <p>{inlineMessage}</p>
//             </div>
//           )}

//           {/* Submit area */}
//           <section className="space-y-3 pt-1">
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative flex min-h-[54px] w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-4 py-3 text-sm font-extrabold text-white shadow-[0_8px_28px_rgba(139,92,246,0.22)] transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {loading ? (
//                 <>
//                   <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
//                   Processing request...
//                 </>
//               ) : (
//                 <>
//                   <ArrowUpRight size={19} />
//                   Request Withdrawal
//                   <ChevronRight
//                     size={17}
//                     className="transition-transform group-hover:translate-x-1"
//                   />
//                 </>
//               )}
//             </button>

//             <button
//               type="button"
//               onClick={clearAmounts}
//               disabled={loading}
//               className="w-full py-1 text-[11px] font-semibold text-gray-500 transition hover:text-gray-300 disabled:opacity-50"
//             >
//               Clear selected amounts
//             </button>

//             <div className="flex items-start gap-2 border-t border-white/[0.07] pt-3">
//               <CheckCircle2
//                 size={14}
//                 className="mt-0.5 shrink-0 text-emerald-400"
//               />
//               <p className="text-[10px] leading-4 text-gray-500">
//                 Withdrawals are subject to account verification, wallet
//                 validation and the applicable withdrawal cooldown.
//               </p>
//             </div>
//           </section>
//         </form>
//       </section>
//     </div>
//   );
// };

// export default WithdrawalModal;









import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import MessageModal from "./MessageModal";
import SuccessModal from "./SuccessModal";
import {
  X,
  Eye,
  EyeOff,
  Zap,
  Users,
  RefreshCcw,
  ShieldCheck,
  Crown,
  Wallet,
  ArrowUpRight,
  LockKeyhole,
  CheckCircle2,
  CircleDollarSign,
  ChevronRight,
} from "lucide-react";

const WithdrawalModal = ({ onClose }) => {
  const { user, token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [walletData, setWalletData] = useState({
    directIncome: 0,
    levelIncome: 0,
    roiIncome: 0,
    royaltyPoolIncome: 0,
    balance: 0,
    totalWithdrawn: 0,
    walletAddress: user?.walletAddress || "",
  });

  const [directAmount, setDirectAmount] = useState("");
  const [levelAmount, setLevelAmount] = useState("");
  const [roiAmount, setRoiAmount] = useState("");
  const [royaltyAmount, setRoyaltyAmount] = useState("");
  const [transactionPassword, setTransactionPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inlineMessage, setInlineMessage] = useState("");
  const [messageModal, setMessageModal] = useState({
    open: false,
    title: "",
    message: "",
    type: "info",
  });
  const [successModal, setSuccessModal] = useState({
    open: false,
    amount: 0,
    title: "Withdrawal Request Submitted",
    message: "",
    userId: user?.userId || "",
  });

  const showMessage = (title, message, type = "info") => {
    setMessageModal({ open: true, title, message, type });
  };

  const closeMessage = () => {
    setMessageModal((previous) => ({ ...previous, open: false }));
  };

  const closeSuccessModal = () => {
    setSuccessModal((previous) => ({ ...previous, open: false }));
    onClose?.();
  };

  useEffect(() => {
    let active = true;

    const fetchWalletData = async () => {
      try {
        const res = await api.get("/wallet/info", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!active) return;

        setWalletData({
          directIncome: Number(res.data.directIncome) || 0,
          levelIncome: Number(res.data.levelIncome) || 0,
          roiIncome: Number(res.data.roiIncome) || 0,
          royaltyPoolIncome:
            Number(
              res.data.royaltyPoolIncome ?? res.data.royaltyIncome ?? 0
            ) || 0,
          balance: Number(res.data.availableBalance) || 0,
          totalWithdrawn: Number(res.data.totalWithdrawn) || 0,
          walletAddress:
            res.data.walletAddress || user?.walletAddress || "",
        });
      } catch (error) {
        console.error("Failed to fetch wallet data:", error);
      }
    };

    fetchWalletData();

    return () => {
      active = false;
    };
  }, [token, user?.walletAddress]);

  const formatAmount = (value) =>
    (Number(value) || 0).toFixed(4);

  const incomeSources = [
    {
      id: "direct",
      name: "Direct Income",
      subtitle: "Referral rewards",
      icon: Zap,
      earned: walletData.directIncome,
      amount: directAmount,
      setAmount: setDirectAmount,
      accent: "#48e8f4",
      code: "DIR",
    },
    {
      id: "level",
      name: "Level Income",
      subtitle: "Network commissions",
      icon: Users,
      earned: walletData.levelIncome,
      amount: levelAmount,
      setAmount: setLevelAmount,
      accent: "#8ebaff",
      code: "LVL",
    },
    {
      id: "roi",
      name: "ROI Income",
      subtitle: "Investment returns",
      icon: RefreshCcw,
      earned: walletData.roiIncome,
      amount: roiAmount,
      setAmount: setRoiAmount,
      accent: "#c0a2ff",
      code: "ROI",
    },
    {
      id: "royalty",
      name: "Royalty Pool",
      subtitle: "Royalty rewards",
      icon: Crown,
      earned: walletData.royaltyPoolIncome,
      amount: royaltyAmount,
      setAmount: setRoyaltyAmount,
      accent: "#f0a2ff",
      code: "RLT",
    },
  ];

  const totalSelection = incomeSources.reduce(
    (sum, source) => sum + (Number(source.amount) || 0),
    0
  );

  const selectedCount = incomeSources.filter(
    (source) => Number(source.amount) > 0
  ).length;

  const updateAmount = (source, value) => {
    if (value === "") {
      source.setAmount("");
      return;
    }

    const parsed = Number(value);

    if (!Number.isFinite(parsed) || parsed < 0) return;

    source.setAmount(value);
  };

  const clearAmounts = () => {
    setDirectAmount("");
    setLevelAmount("");
    setRoiAmount("");
    setRoyaltyAmount("");
    setTransactionPassword("");
    setInlineMessage("");
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();
    setInlineMessage("");

    if (!walletData.walletAddress) {
      showMessage(
        "Wallet Not Found",
        "Please save your USDT BEP-20 wallet address first.",
        "error"
      );
      return;
    }

    if (totalSelection < 2) {
      showMessage(
        "Minimum Withdrawal",
        "Minimum withdrawal amount is $2.",
        "warning"
      );
      return;
    }

    if (totalSelection > walletData.balance) {
      showMessage(
        "Insufficient Balance",
        "Your withdrawal amount exceeds your available balance.",
        "error"
      );
      return;
    }

    for (const source of incomeSources) {
      if (Number(source.amount) > Number(source.earned)) {
        showMessage(
          "Invalid Amount",
          `Your ${source.name} withdrawal cannot exceed its earned amount.`,
          "error"
        );
        return;
      }
    }

    if (!transactionPassword.trim()) {
      showMessage(
        "Password Required",
        "Enter your transaction password to continue.",
        "warning"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        "/wallet/withdraw",
        {
          amount: Number(totalSelection.toFixed(4)),
          transactionPassword,
          details: {
            direct: Number(directAmount) || 0,
            level: Number(levelAmount) || 0,
            roi: Number(roiAmount) || 0,
            royaltyPool: Number(royaltyAmount) || 0,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data?.success) {
        setSuccessModal({
          open: true,
          amount: Number(totalSelection.toFixed(4)),
          title: "Withdrawal Request Submitted",
          message:
            response.data.message ||
            "Your withdrawal request has been submitted successfully.",
          userId: user?.userId || "",
        });
      } else {
        showMessage(
          "Withdrawal Failed",
          response.data?.message || "Unable to submit withdrawal.",
          "error"
        );
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Something went wrong.";

      if (
        errorMsg.includes("Processing Please wait a while...") ||
        errorMsg.includes("only once every 10 days")
      ) {
        setInlineMessage(errorMsg);
      } else {
        showMessage("Withdrawal Failed", errorMsg, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-[#05040b]/90 p-2 backdrop-blur-md sm:p-5">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="withdrawal-title"
        className="relative my-auto flex max-h-[96dvh] w-full max-w-[520px] flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[#0b0914] text-white shadow-[0_25px_100px_rgba(0,0,0,0.65)]"
      >
        {/* Header */}
        <header className="relative shrink-0 overflow-hidden border-b border-white/[0.07] px-5 pb-5 pt-5 sm:px-7">
          <div className="pointer-events-none absolute -right-12 -top-20 h-44 w-44 rounded-full bg-violet-600/15 blur-[65px]" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/25 bg-violet-500/10">
                <ArrowUpRight className="text-violet-300" size={23} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-300">
                  ZORO FINANCE
                </p>
                <h2
                  id="withdrawal-title"
                  className="mt-1 text-xl font-black tracking-tight sm:text-2xl"
                >
                  Withdraw Funds
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close withdrawal modal"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-400 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
            >
              <X size={19} />
            </button>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_9px_rgba(52,211,153,0.7)]" />
              <span className="text-xs font-medium text-gray-400">
                Withdrawal portal
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-300">
              Secure session
            </span>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="custom-scroll flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-6"
        >
          {/* Balance dashboard — no oversized balance card */}
          <section className="relative overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-br from-[#21153a] via-[#151027] to-[#0e1020] p-5">
            <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-fuchsia-500/10 blur-3xl" />

            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-200/70">
                  Available to withdraw
                </p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">$</span>
                  <span className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                    {formatAmount(walletData.balance)}
                  </span>
                </div>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-violet-200">
                <Wallet size={21} />
              </div>
            </div>

            <div className="relative mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                  Total withdrawn
                </p>
                <p className="mt-1 text-sm font-bold text-gray-200">
                  ${formatAmount(walletData.totalWithdrawn)}
                </p>
              </div>

              <div className="border-l border-white/10 pl-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                  Selected sources
                </p>
                <p className="mt-1 text-sm font-bold text-violet-200">
                  {selectedCount} of 4
                </p>
              </div>
            </div>
          </section>

          {/* Wallet address — slim horizontal strip */}
          <section className="flex items-start gap-3 border-b border-white/[0.08] pb-5">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
              <ShieldCheck size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-bold text-gray-200">
                  Payout wallet
                </p>
                <span className="rounded-md bg-emerald-400/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                  BEP-20
                </span>
              </div>

              <p className="mt-1.5 break-all font-mono text-[11px] leading-5 text-gray-500 sm:text-xs">
                {walletData.walletAddress || "No wallet address saved"}
              </p>
            </div>
          </section>

          {/* Completely new layout: one ledger, not four separate cards */}
          <section>
            <div className="mb-3 flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-300">
                  Allocation
                </p>
                <h3 className="mt-1 text-lg font-extrabold text-white">
                  Choose income
                </h3>
              </div>

              <span className="pb-1 text-[10px] font-medium text-gray-500">
                Amount in USD
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0e0c18]">
              <div className="grid grid-cols-[1fr_125px] items-center gap-2 border-b border-white/[0.08] bg-white/[0.025] px-3 py-2.5 sm:grid-cols-[1fr_145px] sm:px-4">
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-500">
                  Income source
                </span>
                <span className="text-right text-[9px] font-bold uppercase tracking-[0.16em] text-gray-500">
                  Withdraw amount
                </span>
              </div>

              {incomeSources.map((source, index) => {
                const Icon = source.icon;
                const amount = Number(source.amount) || 0;
                const hasAmount = amount > 0;

                return (
                  <div
                    key={source.id}
                    className={`grid grid-cols-[1fr_125px] items-center gap-2 px-3 py-4 transition-colors sm:grid-cols-[1fr_145px] sm:px-4 ${
                      index !== incomeSources.length - 1
                        ? "border-b border-white/[0.07]"
                        : ""
                    } ${
                      hasAmount ? "bg-violet-400/[0.035]" : "bg-transparent"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: `${source.accent}12`,
                          color: source.accent,
                        }}
                      >
                        <Icon size={18} strokeWidth={2} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-extrabold text-gray-100 sm:text-sm">
                          {source.name}
                        </p>
                        <p className="mt-1 truncate text-[10px] text-gray-500">
                          {source.subtitle}
                        </p>
                        <p
                          className="mt-1 text-[10px] font-semibold"
                          style={{ color: source.accent }}
                        >
                          Earned ${formatAmount(source.earned)}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex min-w-0 items-center rounded-xl border bg-[#080710] px-2.5 transition ${
                        hasAmount
                          ? "border-violet-400/40"
                          : "border-white/[0.09] focus-within:border-violet-400/50"
                      }`}
                    >
                      <span
                        className="mr-1.5 text-sm font-black"
                        style={{ color: source.accent }}
                      >
                        $
                      </span>

                      <input
                        type="number"
                        min="0"
                        max={source.earned}
                        step="0.0001"
                        inputMode="decimal"
                        aria-label={`${source.name} withdrawal amount`}
                        placeholder="0.0000"
                        value={source.amount}
                        onChange={(event) =>
                          updateAmount(source, event.target.value)
                        }
                        className="w-full min-w-0 bg-transparent py-3 text-xs font-bold text-white outline-none placeholder:text-gray-700 sm:text-sm"
                      />
                    </div>
                  </div>
                );
              })}

              <div className="flex items-center justify-between gap-3 border-t border-violet-400/15 bg-violet-400/[0.055] px-4 py-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-violet-200/70">
                    Allocation total
                  </p>
                  <p className="mt-1 text-[10px] text-gray-500">
                    Minimum $2.00
                  </p>
                </div>

                <p className="text-xl font-black tracking-tight text-white sm:text-2xl">
                  <span className="mr-1 text-violet-300">$</span>
                  {formatAmount(totalSelection)}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-start gap-2 text-[10px] leading-4 text-gray-500">
              <CircleDollarSign
                size={14}
                className="mt-0.5 shrink-0 text-violet-300"
              />
              <p>
                Enter the amount for each income source. Your combined amount
                must not exceed your available balance or the earned amount
                for each source.
              </p>
            </div>
          </section>

          {/* Transaction password */}
          <section>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="withdraw-transaction-password"
                className="text-xs font-bold text-gray-200"
              >
                Transaction password
              </label>
              <LockKeyhole size={15} className="text-violet-300" />
            </div>

            <div className="flex items-center rounded-xl border border-white/10 bg-[#080710] transition focus-within:border-violet-400/50">
              <div className="flex h-12 w-11 shrink-0 items-center justify-center text-gray-500">
                <LockKeyhole size={17} />
              </div>

              <input
                id="withdraw-transaction-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={transactionPassword}
                onChange={(event) =>
                  setTransactionPassword(event.target.value)
                }
                placeholder="Enter transaction password"
                className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                className="flex h-12 w-11 shrink-0 items-center justify-center text-gray-500 transition hover:text-violet-300"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </section>

          {/* Inline backend messages */}
          {inlineMessage && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-3 text-xs leading-5 text-amber-200"
            >
              <ShieldCheck size={16} className="mt-0.5 shrink-0" />
              <p>{inlineMessage}</p>
            </div>
          )}

          {/* Submit area */}
          <section className="space-y-3 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="group relative flex min-h-[54px] w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-4 py-3 text-sm font-extrabold text-white shadow-[0_8px_28px_rgba(139,92,246,0.22)] transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Processing request...
                </>
              ) : (
                <>
                  <ArrowUpRight size={19} />
                  Request Withdrawal
                  <ChevronRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={clearAmounts}
              disabled={loading}
              className="w-full py-1 text-[11px] font-semibold text-gray-500 transition hover:text-gray-300 disabled:opacity-50"
            >
              Clear selected amounts
            </button>

            <div className="flex items-start gap-2 border-t border-white/[0.07] pt-3">
              <CheckCircle2
                size={14}
                className="mt-0.5 shrink-0 text-emerald-400"
              />
              <p className="text-[10px] leading-4 text-gray-500">
                Withdrawals are subject to account verification, wallet
                validation and the applicable withdrawal cooldown.
              </p>
            </div>
          </section>
        </form>
      </section>
    </div>

    <div className="relative z-[999999]">
      <MessageModal
        isOpen={messageModal.open}
        onClose={closeMessage}
        title={messageModal.title}
        message={messageModal.message}
        type={messageModal.type}
        zIndex={100001}
      />
    </div>

    <SuccessModal
      isOpen={successModal.open}
      onClose={closeSuccessModal}
      type="withdrawal"
      amount={successModal.amount}
      userId={successModal.userId}
      customTitle={successModal.title}
      customMessage={successModal.message}
    />
    </>
  );
};

export default WithdrawalModal;






  
  