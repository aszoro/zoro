// // // import React, { useEffect, useState } from "react";
// // // import api from "../../api/axios"; 
// // // import { QRCodeCanvas } from "qrcode.react";
// // // import { Copy, CheckCircle2, AlertTriangle, X, Wallet, QrCode } from "lucide-react";

// // // // 🔥 FIX: 'isOpen' yahan se hata diya kyunki UserLayout already condition check kar raha hai
// // // export default function DepositModal({ onClose, user, userId }) {
// // //   const [address, setAddress] = useState("");
// // //   const [loading, setLoading] = useState(true);
// // //   const [copied, setCopied] = useState(false);

// // //   // Fetch the permanent address when the modal opens
// // //   useEffect(() => {
// // //     // 🔥 FIX: Jaise hi ye load hoga, turant API hit karega
// // //     if (userId) {
// // //       fetchDepositAddress();
// // //     }
// // //   }, [userId]);

// // //   const fetchDepositAddress = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const token = localStorage.getItem('token');
      
// // //       const res = await api.get("/deposit/get-address", {
// // //         headers: { Authorization: `Bearer ${token}` }
// // //       }); 
      
// // //       setAddress(res.data.address);
// // //     } catch (err) {
// // //       console.error("Failed to fetch address", err);
// // //       alert("Could not load deposit address. Please try again.");
// // //       onClose(); 
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const copyText = async () => {
// // //     if (!address) return;
// // //     try {
// // //       if (navigator.clipboard?.writeText) {
// // //         await navigator.clipboard.writeText(address);
// // //       } else {
// // //         const ta = document.createElement("textarea");
// // //         ta.value = address;
// // //         document.body.appendChild(ta);
// // //         ta.select();
// // //         document.execCommand("copy");
// // //         document.body.removeChild(ta);
// // //       }
// // //       setCopied(true);
// // //       setTimeout(() => setCopied(false), 2000);
// // //     } catch {
// // //       alert("Copy failed. Please copy manually.");
// // //     }
// // //   };

// // //   // 🔥 FIX: Wo 'return null' wali line yahan se completely hata di hai!

// // //   return (
// // //     <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex justify-center items-center p-4">
      
// // //       {/* Modal Container - Height Compact & Scrollable */}
// // //       <div className="bg-white mt-8 w-full max-w-md rounded-3xl border border-slate-200 shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in duration-300 max-h-[90vh]">
        
// // //         {/* Ambient Glow Effects */}
// // //         <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 blur-[60px] pointer-events-none rounded-full"></div>
// // //         <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-50 blur-[60px] pointer-events-none rounded-full"></div>

// // //         {/* Header - Padding Reduced */}
// // //         <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center relative z-10 shrink-0">
// // //            <div className="flex items-center gap-3">
// // //               <div className="p-2 bg-green-100 rounded-xl border border-green-200 text-green-600">
// // //                   <Wallet size={18} />
// // //               </div>
// // //               <div>
// // //                 <h2 className="text-slate-800 font-black text-base md:text-lg uppercase tracking-wide flex items-center gap-2">
// // //                   Deposit USDT
// // //                   <span className="bg-green-100 text-green-700 border border-green-200 text-[9px] px-2 py-0.5 rounded-md font-bold tracking-widest">
// // //                     BEP-20
// // //                   </span>
// // //                 </h2>
// // //                 <p className="text-black text-[9px] font-bold uppercase tracking-widest mt-0.5">Add funds to your wallet</p>
// // //               </div>
// // //            </div>
// // //            <button onClick={onClose} className="group bg-white hover:bg-red-50 p-1.5 md:p-2 rounded-full transition-all border border-slate-200 hover:border-red-200 shadow-sm cursor-pointer">
// // //               <X size={18} className="text-slate-400 group-hover:text-red-500" />
// // //            </button>
// // //         </div>

// // //         {/* Body - Padding Reduced & Scrollbar Added */}
// // //         <div className="p-4 md:p-5 relative z-10 flex flex-col items-center bg-white overflow-y-auto custom-scroll">
// // //           {loading ? (
// // //             <div className="py-10 flex flex-col items-center justify-center gap-4">
// // //                <svg className="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// // //                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // //                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // //                </svg>
// // //                <p className="text-black text-[10px] font-bold uppercase tracking-widest animate-pulse">Generating Secure Address...</p>
// // //             </div>
// // //           ) : (
// // //             <div className="w-full">
// // //               <p className="text-center text-black text-[10px] md:text-[11px] font-medium mb-4 px-1">
// // //                 Send any amount of USDT to this address. Your wallet will be credited automatically.
// // //               </p>

// // //               {/* QR Code Container */}
// // //               <div className="flex justify-center mb-4 relative">
// // //                  <div className="absolute inset-0 bg-green-100 rounded-3xl blur-[15px] opacity-60"></div>
// // //                  <div className="relative p-2.5 bg-white rounded-2xl border-2 border-slate-100 shadow-md flex flex-col items-center">
// // //                    <QRCodeCanvas value={address} size={120} level="H" />
// // //                    <div className="mt-1.5 text-slate-400 font-black text-[8px] tracking-widest uppercase flex items-center gap-1">
// // //                       <QrCode size={10} /> Scan to Pay
// // //                    </div>
// // //                  </div>
// // //               </div>

// // //               {/* Address Display & Copy */}
// // //               <div className="w-full">
// // //                 <label className="block text-[9px] font-bold text-black mb-1 ml-1 uppercase tracking-wider">
// // //                   Your Permanent Deposit Address
// // //                 </label>
// // //                 <div className="flex flex-col sm:flex-row gap-2">
// // //                   <input
// // //                     readOnly
// // //                     value={address}
// // //                     onFocus={(e) => e.target.select()}
// // //                     className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-[11px] md:text-xs font-mono tracking-wider focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all text-center sm:text-left shadow-inner"
// // //                   />
// // //                   <button 
// // //                     onClick={copyText} 
// // //                     className={`flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl font-black text-[11px] tracking-wide transition-all shadow-sm shrink-0 ${
// // //                         copied 
// // //                             ? 'bg-green-50 text-green-600 border border-green-200' 
// // //                             : 'bg-green-600 hover:bg-green-700 text-white border border-transparent hover:-translate-y-0.5 active:scale-95'
// // //                     }`}
// // //                   >
// // //                     {copied ? <><CheckCircle2 size={14} /> COPIED</> : <><Copy size={14} /> COPY</>}
// // //                   </button>
// // //                 </div>
// // //               </div>

// // //               {/* Warning Note */}
// // //               <div className="mt-4 bg-red-50 border border-red-200 p-3 rounded-xl flex items-start gap-2 shadow-sm">
// // //                 <AlertTriangle className="text-red-500 shrink-0 w-4 h-4 mt-0.5" />
// // //                 <p className="text-red-600 text-[9px] md:text-[10px] font-bold leading-relaxed">
// // //                   <span className="text-red-800 font-black">WARNING:</span> Send only USDT via the <span className="text-red-800 font-black">BNB Smart Chain (BEP-20)</span> network.
// // //                 </p>
// // //               </div>

// // //               {/* Cancel Button */}
// // //               <div className="mt-4 pt-3 border-t border-slate-100 w-full">
// // //                  <button 
// // //                    onClick={onClose} 
// // //                    className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors shadow-sm"
// // //                  >
// // //                     Cancel
// // //                  </button>
// // //               </div>

// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import React, { useEffect, useState } from "react";
// // import api from "../../api/axios"; 
// // import { QRCodeCanvas } from "qrcode.react";
// // import { ChevronLeft } from "lucide-react"; 
// // import Swal from 'sweetalert2';
// // import SuccessModal from "./SuccessModal"; 

// // export default function DepositModal({ onClose, user, userId }) {
// //   const [address, setAddress] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const [copied, setCopied] = useState(false);
// //   const [submitting, setSubmitting] = useState(false); 

// //   // 🔥 FORM STATES
// //   const [amount, setAmount] = useState("");
// //   const [txnHash, setTxnHash] = useState("");

// //   // Nayi states custom modal ke liye
// //   const [isSuccessMode, setIsSuccessMode] = useState(false);
// //   const [successMessage, setSuccessMessage] = useState("");

// //   // Exchange rate assumption (1 USDT = 90 INR)
// //   const exchangeRate = 90; 

// //   useEffect(() => {
// //     if (userId) {
// //       fetchDepositAddress();
// //     }
// //   }, [userId]);

// //   const fetchDepositAddress = async () => {
// //     try {
// //       setLoading(true);
// //       const token = localStorage.getItem('token');
      
// //       const res = await api.get("/deposit/get-address", {
// //         headers: { Authorization: `Bearer ${token}` }
// //       }); 
      
// //       setAddress(res.data.address);
// //     } catch (err) {
// //       console.error("Failed to fetch address", err);
// //       alert("Could not load deposit address. Please try again.");
// //       onClose(); 
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const copyText = async () => {
// //     if (!address) return;
// //     try {
// //       if (navigator.clipboard?.writeText) {
// //         await navigator.clipboard.writeText(address);
// //       } else {
// //         const ta = document.createElement("textarea");
// //         ta.value = address;
// //         document.body.appendChild(ta);
// //         ta.select();
// //         document.execCommand("copy");
// //         document.body.removeChild(ta);
// //       }
// //       setCopied(true);
// //       setTimeout(() => setCopied(false), 2000);
// //     } catch {
// //       alert("Copy failed. Please copy manually.");
// //     }
// //   };

// //   // 🔥 Form Reset Function
// //   const handleReset = () => {
// //     setAmount("");
// //     setTxnHash("");
// //   };

// //   // 🔥 Submit Form Function
// //   const handleSubmit = async () => {
// //     if (!amount || !txnHash) {
// //       Swal.fire({
// //         icon: 'warning',
// //         title: 'Incomplete',
// //         text: 'Please enter both Amount and Transaction Hash!',
// //         background: '#111827',
// //         color: '#d4af37'
// //       });
// //       return;
// //     }

// //     try {
// //       setSubmitting(true);
// //       const token = localStorage.getItem('token');

// //       const response = await api.post('/deposit/verify-deposit', {
// //         amount: Number(amount),
// //         transactionHash: txnHash
// //       }, {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
      
// //       if (response.data.success) {
// //         setSuccessMessage(response.data.message || "Deposit submitted successfully!");
// //         setIsSuccessMode(true);
// //       }
// //     } catch (error) {
// //       Swal.fire({
// //         icon: 'info',
// //         title: 'Pending...',
// //         text: error.response?.data?.message || "Deposit not found or pending. Please wait.",
// //         confirmButtonColor: '#d4af37',
// //         background: '#111827',
// //         color: '#fff'
// //       });
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   if (isSuccessMode) {
// //     return (
// //       <SuccessModal 
// //         isOpen={true}
// //         onClose={() => {
// //           onClose(); 
// //           window.location.reload(); 
// //         }}
// //         customTitle="Payment Submitted! 🎉"
// //         customMessage={successMessage}
// //         zIndex={2050} 
// //       />
// //     );
// //   }

// //   return (
// //     <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] flex justify-center items-center p-0 sm:p-4">
      
// //       {/* 🔶 MAIN MODAL CONTAINER (Premium Dark & Gold Background) */}
// //       <div className="bg-[#0a0f1c] border border-[#d4af37]/30 w-full h-full sm:h-auto sm:max-h-[95vh] sm:max-w-xl sm:rounded-2xl flex flex-col relative overflow-y-auto custom-scroll shadow-[0_0_20px_rgba(212,175,55,0.15)]">
        
// //         {/* Header with Back Button */}
// //         <div className="p-4 md:p-5 flex items-center gap-3 border-b border-[#1f2937]">
// //           <button onClick={onClose} className="text-gray-400 hover:text-[#d4af37] transition-colors cursor-pointer p-1">
// //             <ChevronLeft size={28} strokeWidth={2.5} />
// //           </button>
// //           <h2 className="text-[20px] md:text-[22px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] uppercase tracking-wide">
// //             Instant Deposit Fund
// //           </h2>
// //         </div>

// //         {/* Body Content */}
// //         <div className="p-5 md:p-6 flex-1 flex flex-col">
          
// //           {/* Form Fields */}
// //           <div className="space-y-5 mb-6">
            
// //             {/* USDT Amount */}
// //             <div>
// //               <label className="block text-gray-300 text-[14px] font-medium mb-2">Fund Amount (USDT)</label>
// //               <input 
// //                 type="number" 
// //                 value={amount}
// //                 onChange={(e) => setAmount(e.target.value)}
// //                 placeholder="Enter USDT Amount" 
// //                 className="w-full p-3 bg-[#111827] text-white rounded-lg border border-gray-700 outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all placeholder-gray-600"
// //               />
// //             </div>

// //             {/* Transaction Hash */}
// //             <div>
// //               <label className="block text-gray-300 text-[14px] font-medium mb-2">Transaction Hash</label>
// //               <input 
// //                 type="text" 
// //                 value={txnHash}
// //                 onChange={(e) => setTxnHash(e.target.value)}
// //                 placeholder="Paste Transaction Hash" 
// //                 className="w-full p-3 bg-[#111827] text-white rounded-lg border border-gray-700 outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all placeholder-gray-600"
// //               />
// //               <p className="text-[#d4af37]/70 text-xs mt-2">Example : 0x123456789abcdef....</p>
// //             </div>

// //           </div>

// //           {/* Action Buttons */}
// //           <div className="flex gap-4 mb-8">
// //             <button 
// //               onClick={handleSubmit} 
// //               disabled={submitting || loading}
// //               className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-black font-extrabold px-6 py-3 rounded-lg transition-all shadow-[0_0_10px_rgba(212,175,55,0.3)] hover:shadow-[0_0_15px_rgba(212,175,55,0.6)] hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
// //             >
// //               {submitting ? "Wait..." : "SUBMIT"}
// //             </button>
// //             <button 
// //               onClick={handleReset}
// //               className="px-6 py-3 bg-transparent border-2 border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 font-bold rounded-lg transition-colors"
// //             >
// //               RESET
// //             </button>
// //           </div>

// //           {/* QR Code Section */}
// //           <div className="flex flex-col items-center bg-[#111827] p-5 rounded-xl border border-[#1f2937]">
// //             <h3 className="text-lg font-bold text-[#d4af37] mb-4 text-center">
// //               USDT (BEP-20) Wallet Address
// //             </h3>

// //             {loading ? (
// //               <div className="w-[180px] h-[180px] bg-gray-800 animate-pulse rounded-xl flex items-center justify-center mb-5 border border-gray-700">
// //                 <span className="text-[#d4af37] text-sm font-bold">Loading QR...</span>
// //               </div>
// //             ) : (
// //               <div className="bg-white p-2.5 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.2)] mb-6 border-4 border-[#d4af37] inline-block">
// //                 <QRCodeCanvas value={address} size={180} level="H" />
// //               </div>
// //             )}

// //             {/* Readonly Address Field */}
// //             <div className="w-full mb-4">
// //               <input 
// //                 type="text" 
// //                 value={address || "Loading address..."}
// //                 readOnly
// //                 className="w-full p-3 bg-black/40 text-[#d4af37] text-sm md:text-sm rounded-lg border border-[#d4af37]/30 outline-none text-center font-mono tracking-wide"
// //               />
// //             </div>

// //             {/* Copy Button */}
// //             <div className="w-full flex justify-center">
// //               <button 
// //                 onClick={copyText}
// //                 className="w-full sm:w-auto bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-black font-extrabold px-10 py-2.5 rounded-lg transition-all shadow-[0_0_10px_rgba(212,175,55,0.3)] hover:shadow-[0_0_15px_rgba(212,175,55,0.6)] hover:scale-[1.02]"
// //               >
// //                 {copied ? "COPIED!" : "COPY ADDRESS"}
// //               </button>
// //             </div>

// //           </div>

// //         </div>
// //       </div>
      
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import api from "../../api/axios"; 
// import { QRCodeCanvas } from "qrcode.react";
// import { ChevronLeft } from "lucide-react"; 
// import Swal from 'sweetalert2';
// import SuccessModal from "./SuccessModal"; 

// export default function DepositModal({ onClose, user, userId }) {
//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [copied, setCopied] = useState(false);
//   const [submitting, setSubmitting] = useState(false); 

//   // 🔥 FORM STATES
//   const [amount, setAmount] = useState("");
//   const [txnHash, setTxnHash] = useState("");

//   const [isSuccessMode, setIsSuccessMode] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     if (userId) {
//       fetchDepositAddress();
//     }
//   }, [userId]);

//   const fetchDepositAddress = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
      
//       const res = await api.get("/deposit/get-address", {
//         headers: { Authorization: `Bearer ${token}` }
//       }); 
      
//       setAddress(res.data.address);
//     } catch (err) {
//       console.error("Failed to fetch address", err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Could not load deposit address. Please try again.',
//         background: '#111827',
//         color: '#fff'
//       });
//       onClose(); 
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyText = async () => {
//     if (!address) return;
//     try {
//       if (navigator.clipboard?.writeText) {
//         await navigator.clipboard.writeText(address);
//       } else {
//         const ta = document.createElement("textarea");
//         ta.value = address;
//         document.body.appendChild(ta);
//         ta.select();
//         document.execCommand("copy");
//         document.body.removeChild(ta);
//       }
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch {
//       alert("Copy failed. Please copy manually.");
//     }
//   };

//   const handleReset = () => {
//     setAmount("");
//     setTxnHash("");
//   };

//   const handleSubmit = async () => {
//     if (!amount || !txnHash) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Incomplete',
//         text: 'Please enter both Amount and Transaction Hash!',
//         background: '#111827',
//         color: '#d4af37'
//       });
//       return;
//     }

//     // 🔥 Safety Check: Agar address abhi tak load nahi hua toh rok do
//     if (!address) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Please Wait',
//         text: 'Deposit address is still loading. Please wait a moment.',
//         background: '#111827',
//         color: '#d4af37'
//       });
//       return;
//     }

//     try {
//       setSubmitting(true);
//       const token = localStorage.getItem('token');

//       const response = await api.post('/deposit/verify-deposit', {
//         amount: Number(amount),
//         transactionHash: txnHash
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (response.data.success) {
//         setSuccessMessage(response.data.message || "Deposit submitted successfully!");
//         setIsSuccessMode(true);
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: 'info',
//         title: 'Submitted / Pending',
//         text: error.response?.data?.message || "Deposit request registered. Please wait for confirmation.",
//         confirmButtonColor: '#d4af37',
//         background: '#111827',
//         color: '#fff'
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (isSuccessMode) {
//     return (
//       <SuccessModal 
//         isOpen={true}
//         onClose={() => {
//           onClose(); 
//           window.location.reload(); 
//         }}
//         customTitle="Payment Submitted! 🎉"
//         customMessage={successMessage}
//         zIndex={2050} 
//       />
//     );
//   }

//   return (
//     <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] flex justify-center items-center p-0 sm:p-4">
      
//       <div className="bg-[#0a0f1c] border border-[#d4af37]/30 w-full h-full sm:h-auto sm:max-h-[95vh] sm:max-w-xl sm:rounded-2xl flex flex-col relative overflow-y-auto custom-scroll shadow-[0_0_20px_rgba(212,175,55,0.15)]">
        
//         {/* Header */}
//         <div className="p-4 md:p-5 flex items-center gap-3 border-b border-[#1f2937]">
//           <button onClick={onClose} className="text-gray-400 hover:text-[#d4af37] transition-colors cursor-pointer p-1">
//             <ChevronLeft size={28} strokeWidth={2.5} />
//           </button>
//           <h2 className="text-[20px] md:text-[22px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] uppercase tracking-wide">
//             Instant Deposit Fund
//           </h2>
//         </div>

//         {/* Body Content */}
//         <div className="p-5 md:p-6 flex-1 flex flex-col">
          
//           {/* Form Fields */}
//           <div className="space-y-5 mb-6">
//             <div>
//               <label className="block text-gray-300 text-[14px] font-medium mb-2">Fund Amount (USDT)</label>
//               <input 
//                 type="number" 
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 placeholder="Enter USDT Amount" 
//                 className="w-full p-3 bg-[#111827] text-white rounded-lg border border-gray-700 outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all placeholder-gray-600"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-300 text-[14px] font-medium mb-2">Transaction Hash</label>
//               <input 
//                 type="text" 
//                 value={txnHash}
//                 onChange={(e) => setTxnHash(e.target.value)}
//                 placeholder="Paste Transaction Hash" 
//                 className="w-full p-3 bg-[#111827] text-white rounded-lg border border-gray-700 outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all placeholder-gray-600"
//               />
//               <p className="text-[#d4af37]/70 text-xs mt-2">Example : 0x123456789abcdef....</p>
//             </div>
//           </div>

//           {/* Action Buttons (Disabled if address is loading) */}
//           <div className="flex gap-4 mb-8">
//             <button 
//               onClick={handleSubmit} 
//               disabled={submitting || loading || !address}
//               className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-black font-extrabold px-6 py-3 rounded-lg transition-all shadow-[0_0_10px_rgba(212,175,55,0.3)] hover:shadow-[0_0_15px_rgba(212,175,55,0.6)] hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
//             >
//               {loading ? "Loading Address..." : submitting ? "Submitting..." : "SUBMIT"}
//             </button>
//             <button 
//               onClick={handleReset}
//               className="px-6 py-3 bg-transparent border-2 border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 font-bold rounded-lg transition-colors"
//             >
//               RESET
//             </button>
//           </div>

//           {/* QR Code Section */}
//           <div className="flex flex-col items-center bg-[#111827] p-5 rounded-xl border border-[#1f2937]">
//             <h3 className="text-lg font-bold text-[#d4af37] mb-4 text-center">
//               USDT (BEP-20) Wallet Address
//             </h3>

//             {loading ? (
//               <div className="w-[180px] h-[180px] bg-gray-800 animate-pulse rounded-xl flex items-center justify-center mb-5 border border-gray-700">
//                 <span className="text-[#d4af37] text-sm font-bold">Loading QR...</span>
//               </div>
//             ) : (
//               <div className="bg-white p-2.5 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.2)] mb-6 border-4 border-[#d4af37] inline-block">
//                 <QRCodeCanvas value={address} size={180} level="H" />
//               </div>
//             )}

//             <div className="w-full mb-4">
//               <input 
//                 type="text" 
//                 value={address || "Loading address..."}
//                 readOnly
//                 className="w-full p-3 bg-black/40 text-[#d4af37] text-sm md:text-sm rounded-lg border border-[#d4af37]/30 outline-none text-center font-mono tracking-wide"
//               />
//             </div>

//             <div className="w-full flex justify-center">
//               <button 
//                 onClick={copyText}
//                 disabled={!address}
//                 className="w-full sm:w-auto bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-black font-extrabold px-10 py-2.5 rounded-lg transition-all shadow-[0_0_10px_rgba(212,175,55,0.3)] hover:shadow-[0_0_15px_rgba(212,175,55,0.6)] hover:scale-[1.02] disabled:opacity-50"
//               >
//                 {copied ? "COPIED!" : "COPY ADDRESS"}
//               </button>
//             </div>

//           </div>

//         </div>
//       </div>
      
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { QRCodeCanvas } from "qrcode.react";
import {
  ArrowLeft,
  Gamepad2,
  Wallet,
  Copy,
  Check,
  ShieldCheck,
  RefreshCw,
  Hash,
  Coins,
  Sparkles,
  LoaderCircle,
  X,
  Zap,
} from "lucide-react";
import Swal from "sweetalert2";
import SuccessModal from "./SuccessModal";

export default function DepositModal({ onClose, user, userId }) {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [amount, setAmount] = useState("");
  const [txnHash, setTxnHash] = useState("");

  const [isSuccessMode, setIsSuccessMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (userId) {
      fetchDepositAddress();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchDepositAddress = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login again to continue.");
      }

      const res = await api.get("/deposit/get-address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const walletAddress = res.data?.address;

      if (!walletAddress) {
        throw new Error("Deposit wallet address is unavailable.");
      }

      setAddress(walletAddress);
    } catch (err) {
      console.error("Failed to fetch deposit address:", err);

      Swal.fire({
        icon: "error",
        title: "Wallet Unavailable",
        text:
          err.response?.data?.message ||
          err.message ||
          "Could not load deposit address. Please try again.",
        background: "#190E22",
        color: "#FFFFFF",
        confirmButtonColor: "#963FEA",
      });

      onClose();
    } finally {
      setLoading(false);
    }
  };

  const copyText = async () => {
    if (!address) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(address);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = address;
        document.body.appendChild(textarea);
        textarea.select();

        const success = document.execCommand("copy");
        document.body.removeChild(textarea);

        if (!success) throw new Error("Copy failed");
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);

      Swal.fire({
        icon: "error",
        title: "Copy Failed",
        text: "Please copy your wallet address manually.",
        background: "#190E22",
        color: "#FFFFFF",
        confirmButtonColor: "#963FEA",
      });
    }
  };

  const handleReset = () => {
    if (submitting) return;
    setAmount("");
    setTxnHash("");
  };

  const handleSubmit = async () => {
    const numericAmount = Number(amount);
    const cleanHash = txnHash.trim();

    if (!amount || !cleanHash) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Details",
        text: "Please enter both amount and transaction hash.",
        background: "#190E22",
        color: "#FFFFFF",
        confirmButtonColor: "#963FEA",
      });
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Amount",
        text: "Please enter a valid amount greater than zero.",
        background: "#190E22",
        color: "#FFFFFF",
        confirmButtonColor: "#963FEA",
      });
      return;
    }

    if (!address) {
      Swal.fire({
        icon: "warning",
        title: "Wallet Not Ready",
        text: "Please wait until your deposit address loads.",
        background: "#190E22",
        color: "#FFFFFF",
        confirmButtonColor: "#963FEA",
      });
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login again to submit your deposit.",
        background: "#190E22",
        color: "#FFFFFF",
        confirmButtonColor: "#963FEA",
      });
      return;
    }

    try {
      setSubmitting(true);

      const response = await api.post(
        "/deposit/verify-deposit",
        {
          amount: numericAmount,
          transactionHash: cleanHash,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.success) {
        setSuccessMessage(
          response.data.message ||
            "Your deposit request was submitted successfully!"
        );
        setIsSuccessMode(true);
      } else {
        Swal.fire({
          icon: "info",
          title: "Deposit Pending",
          text:
            response.data?.message ||
            "Your deposit could not be confirmed yet.",
          background: "#190E22",
          color: "#FFFFFF",
          confirmButtonColor: "#963FEA",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          error.response?.data?.message ||
          "Unable to submit your deposit. Please try again.",
        background: "#190E22",
        color: "#FFFFFF",
        confirmButtonColor: "#963FEA",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (isSuccessMode) {
    return (
      <SuccessModal
        isOpen={true}
        onClose={() => {
          onClose();
          window.location.reload();
        }}
        customTitle="Payment Submitted! 🎉"
        customMessage={successMessage}
        zIndex={2050}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#09040F]/95 p-0 backdrop-blur-xl sm:p-4">

      {/* Main Modal */}
      <div className="relative flex h-full w-full max-w-2xl flex-col overflow-hidden border border-[#4A2B5E] bg-[#110817] shadow-[0_0_80px_rgba(112,37,201,0.18)] sm:h-auto sm:max-h-[95vh] sm:rounded-[28px]">

        {/* Decorative Background */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#963FEA]/10 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#7025C9]/10 blur-[110px]" />

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-[#392546] bg-[#13091C]/90 px-5 py-5 sm:px-7">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C084FC] to-[#7025C9] shadow-[0_0_25px_rgba(147,63,234,0.25)]">
              <Gamepad2 size={27} className="text-white" />
            </div>

            <div>
              <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                ZORO <span className="text-[#C084FC]">GAMES</span>
              </h2>
              <p className="mt-0.5 text-[9px] font-black uppercase tracking-[3px] text-[#85738F]">
                ENTER THE NEXT LEVEL
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-xl border border-[#4A2B5E] bg-[#24142E] px-3 py-2.5 text-xs font-bold text-[#C4B5CF] transition hover:border-[#C084FC] hover:text-white"
          >
            <ArrowLeft size={17} />
            <span className="hidden sm:inline">BACK</span>
            <X size={17} className="sm:hidden" />
          </button>

        </div>

        {/* Main Content */}
        <div className="relative flex-1 space-y-5 overflow-y-auto p-5 sm:p-7">

          {/* Page Heading */}
          <div className="py-3 text-center">

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#654080] bg-[#291638] shadow-[0_0_30px_rgba(147,63,234,0.12)]">
              <Wallet size={29} className="text-[#D8AEFF]" />
            </div>

            <p className="mb-2 text-[10px] font-black uppercase tracking-[4px] text-[#D8AEFF]">
              PLAYER WALLET
            </p>

            <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
              ADD <span className="text-[#C084FC]">FUNDS.</span>
            </h1>

            <p className="mt-2 text-sm text-[#9D91A5]">
              Power up your gaming wallet and keep playing.
            </p>

          </div>

          {/* Network Card */}
          <div className="flex items-center justify-between rounded-2xl border border-[#4A2B5E] bg-gradient-to-r from-[#24142E] to-[#160D20] p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#654080] bg-[#321B46]">
                <Coins size={22} className="text-[#D8AEFF]" />
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-white">
                  USDT DEPOSIT
                </h3>
                <p className="mt-1 text-xs text-[#9D91A5]">
                  BEP-20 Network
                </p>
              </div>

            </div>

            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[9px] font-black uppercase tracking-wider text-emerald-400">
                Ready
              </span>
            </div>

          </div>

          {/* Amount Card */}
          <div className="rounded-2xl border border-[#4A2B5E] bg-[#190E22] p-5 sm:p-6">

            <div className="mb-4 flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#321B46]">
                <Zap size={18} className="text-[#D8AEFF]" />
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-white">
                  DEPOSIT AMOUNT
                </h3>
                <p className="text-[11px] text-[#8F7C9A]">
                  Enter your desired amount
                </p>
              </div>

            </div>

            <div className="relative">

              <input
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                disabled={submitting}
                className="w-full rounded-xl border border-[#4A2B5E] bg-[#0D0713] px-4 py-4 pr-24 text-2xl font-black text-white outline-none transition placeholder:text-[#51415B] focus:border-[#A855F7] focus:ring-2 focus:ring-[#963FEA]/20 disabled:opacity-50"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg border border-[#654080] bg-[#321B46] px-3 py-2 text-xs font-black text-[#D8AEFF]">
                USDT
              </span>

            </div>

          </div>

          {/* Transaction Hash */}
          <div className="rounded-2xl border border-[#4A2B5E] bg-[#190E22] p-5 sm:p-6">

            <div className="mb-4 flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#321B46]">
                <Hash size={18} className="text-[#D8AEFF]" />
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-white">
                  TRANSACTION HASH
                </h3>
                <p className="text-[11px] text-[#8F7C9A]">
                  Enter your blockchain transaction ID
                </p>
              </div>

            </div>

            <input
              type="text"
              value={txnHash}
              onChange={(e) => setTxnHash(e.target.value)}
              placeholder="0x..."
              disabled={submitting}
              className="w-full rounded-xl border border-[#4A2B5E] bg-[#0D0713] px-4 py-4 font-mono text-sm text-[#D8AEFF] outline-none transition placeholder:text-[#51415B] focus:border-[#A855F7] focus:ring-2 focus:ring-[#963FEA]/20 disabled:opacity-50"
            />

            <p className="mt-2 text-[10px] text-[#85738F]">
              Make sure your transaction hash is correct.
            </p>

          </div>

          {/* Wallet QR Section */}
          <div className="overflow-hidden rounded-2xl border border-[#654080] bg-gradient-to-b from-[#24142E] to-[#160D20] p-5 sm:p-6">

            <div className="mb-5 text-center">

              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-[#654080] bg-[#321B46]">
                <Gamepad2 size={23} className="text-[#D8AEFF]" />
              </div>

              <h3 className="text-base font-black tracking-wide text-white">
                YOUR GAMING WALLET
              </h3>

              <p className="mt-1 text-xs text-[#9D91A5]">
                Scan the QR code to make your deposit
              </p>

            </div>

            {/* QR Code */}
            <div className="mx-auto flex min-h-[210px] w-full max-w-[230px] items-center justify-center rounded-2xl border border-[#654080] bg-white p-3 shadow-[0_0_35px_rgba(147,63,234,0.15)]">

              {loading ? (

                <div className="flex flex-col items-center gap-3 text-[#963FEA]">
                  <LoaderCircle size={32} className="animate-spin" />
                  <span className="text-xs font-bold">
                    Loading Wallet...
                  </span>
                </div>

              ) : address ? (

                <QRCodeCanvas
                  value={address}
                  size={190}
                  level="H"
                  includeMargin={false}
                />

              ) : (

                <p className="text-center text-sm text-red-600">
                  Wallet address unavailable
                </p>

              )}

            </div>

            {/* Address */}
            <div className="mt-5">

              <label className="mb-2 block text-[10px] font-black uppercase tracking-[2px] text-[#A58BB8]">
                DEPOSIT WALLET ADDRESS
              </label>

              <div className="flex items-center gap-2 rounded-xl border border-[#4A2B5E] bg-[#0D0713] p-2">

                <input
                  type="text"
                  value={address}
                  readOnly
                  placeholder={loading ? "Loading address..." : "Address unavailable"}
                  className="min-w-0 flex-1 bg-transparent px-2 py-2 font-mono text-xs text-[#D8AEFF] outline-none"
                />

                <button
                  onClick={copyText}
                  disabled={!address}
                  className="flex shrink-0 items-center gap-2 rounded-lg bg-gradient-to-r from-[#A855F7] to-[#7025C9] px-3 py-3 text-xs font-black text-white shadow-[0_0_15px_rgba(147,63,234,0.18)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? "COPIED" : "COPY"}
                </button>

              </div>

            </div>

            {/* Network Warning */}
            <div className="mt-4 flex gap-3 rounded-xl border border-[#654080]/60 bg-[#321B46]/40 p-3">

              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-[#D8AEFF]"
              />

              <p className="text-[10px] leading-relaxed text-[#B7A5C2]">
                Send only{" "}
                <span className="font-black text-[#D8AEFF]">
                  USDT on BEP-20 network
                </span>
                . Sending through another network may result in permanent loss.
              </p>

            </div>

          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pb-2">

            <button
              onClick={handleReset}
              disabled={submitting}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#654080] bg-[#24142E] px-4 py-4 text-sm font-black tracking-wide text-[#D8AEFF] transition hover:border-[#C084FC] hover:bg-[#321B46] disabled:opacity-50"
            >
              <RefreshCw size={16} />
              RESET
            </button>

            <button
              onClick={handleSubmit}
              disabled={submitting || loading || !address}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#A855F7] to-[#7025C9] px-4 py-4 text-sm font-black tracking-wide text-white shadow-[0_5px_25px_rgba(147,63,234,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(147,63,234,0.35)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >

              {submitting ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  SENDING...
                </>
              ) : (
                <>
                  SUBMIT DEPOSIT
                  <Sparkles size={16} />
                </>
              )}

            </button>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-2 pb-2">

            <ShieldCheck size={13} className="text-[#A855F7]" />

            <p className="text-[9px] font-black uppercase tracking-[2px] text-[#756580]">
              ZORO GAMES • SECURE PLAYER PORTAL
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}
