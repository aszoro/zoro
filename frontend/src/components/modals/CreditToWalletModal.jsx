// // // // // import React, { useState, useEffect } from "react";
// // // // // import api from "../../api/axios";
// // // // // import { useAuth } from "../../context/AuthContext";
// // // // // import Swal from 'sweetalert2';
// // // // // import { X, Eye, EyeOff, Zap, Users, RefreshCcw } from "lucide-react";

// // // // // const CreditToWalletModal = ({ onClose }) => {
// // // // //   const { user, token } = useAuth();
  
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [walletData, setWalletData] = useState({ 
// // // // //     directIncome: 0, levelIncome: 0, roiIncome: 0, balance: 0 
// // // // //   });
  
// // // // //   const [directAmount, setDirectAmount] = useState("");
// // // // //   const [levelAmount, setLevelAmount] = useState("");
// // // // //   const [roiAmount, setRoiAmount] = useState("");
// // // // //   const [transactionPassword, setTransactionPassword] = useState("");
// // // // //   const [showPassword, setShowPassword] = useState(false);

// // // // //   useEffect(() => {
// // // // //     fetchWalletData();
// // // // //   }, []);

// // // // //   const fetchWalletData = async () => {
// // // // //     try {
// // // // //       const res = await api.get(`/wallet/info`, { headers: { Authorization: `Bearer ${token}` }});
// // // // //       setWalletData({
// // // // //         directIncome: res.data.directIncome || 0,
// // // // //         levelIncome: res.data.levelIncome || 0,
// // // // //         roiIncome: res.data.roiIncome || 0,
// // // // //         balance: res.data.availableBalance || 0 
// // // // //       });
// // // // //     } catch (err) {
// // // // //       console.error("Failed to fetch wallet data", err);
// // // // //     }
// // // // //   };

// // // // //   const totalSelection = (Number(directAmount) || 0) + (Number(levelAmount) || 0) + (Number(roiAmount) || 0);

// // // // //   const handleSubmit = async () => {
// // // // //     if (totalSelection < 1) {
// // // // //       return Swal.fire({ icon: 'warning', title: 'Invalid Amount', text: 'Minimum credit amount is $1.', background: '#111827', color: '#d4af37' });
// // // // //     }
// // // // //     if (totalSelection > walletData.balance) {
// // // // //       return Swal.fire({ icon: 'error', title: 'Insufficient Balance', text: `You only have $${walletData.balance.toFixed(2)} available.`, background: '#111827', color: '#ff4d4d' });
// // // // //     }
// // // // //     if (!transactionPassword) {
// // // // //       return Swal.fire({ icon: 'warning', title: 'Password Required', text: 'Enter Transaction Password.', background: '#111827', color: '#d4af37' });
// // // // //     }

// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const response = await api.post('/wallet/credit-to-wallet', {
// // // // //         amount: totalSelection, 
// // // // //         transactionPassword,
// // // // //         details: { direct: directAmount, level: levelAmount, roi: roiAmount }
// // // // //       }, { headers: { Authorization: `Bearer ${token}` }});

// // // // //       if (response.data.success) {
// // // // //         Swal.fire({ icon: 'success', title: 'Success!', text: response.data.message, background: '#111827', color: '#d4af37' });
// // // // //         onClose();
// // // // //        }
// // // // //     } catch (err) {
// // // // //       Swal.fire({ icon: 'error', title: 'Request Failed', text: err.response?.data?.message || 'Something went wrong.', background: '#111827', color: '#ff4d4d' });
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[99999] flex justify-center items-start sm:items-center pt-16 sm:pt-4 p-3 sm:p-4">
      
// // // // //       <div className="bg-[#0b101e] w-full max-w-[420px] max-h-[85vh] sm:max-h-[90vh] rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.15)] border border-[#2d3748] overflow-hidden flex flex-col">
        
// // // // //         {/* Header */}
// // // // //         <div className="bg-[#e4c568] px-4 py-3 flex justify-between items-center shrink-0">
// // // // //           <h2 className="text-black font-extrabold text-[17px] tracking-wide">
// // // // //              Wallet to Fund
// // // // //           </h2>
// // // // //           <button onClick={onClose} className="text-black hover:bg-black/10 p-1 rounded-full transition-colors">
// // // // //             <X size={20} strokeWidth={2.5} />
// // // // //           </button>
// // // // //         </div>

// // // // //         {/* Scrollable Content Area */}
// // // // //         <div className="p-4 bg-[#0b101e] flex-1 overflow-y-auto custom-scroll space-y-4">
          
// // // // //           <div className="bg-[#161c2d] border border-[#2d3748] p-3 rounded-lg text-center shadow-inner mb-2">
// // // // //             <p className="text-[10px] text-gray-400 font-bold tracking-wider mb-1 uppercase">Total Income Balance</p>
// // // // //             <p className="text-[#00ff88] font-black text-xl">${walletData.balance.toFixed(2)}</p>
// // // // //           </div>

// // // // //           {/* 🔥 DIRECT INCOME BOX */}
// // // // //           <div className="bg-[#1e2536] p-3.5 rounded-lg border border-[#2d3748] shadow-sm">
// // // // //             <div className="flex justify-between items-center mb-2.5">
// // // // //               <span className="text-[#e4c568] text-xs font-bold flex items-center gap-1.5"><Zap size={14}/> DIRECT INCOME</span>
// // // // //               <span className="text-gray-400 text-[11px] font-semibold">Earned: ${walletData.directIncome.toFixed(2)}</span>
// // // // //             </div>
// // // // //             <div className="flex items-center gap-2 bg-[#0b101e] border border-[#2d3748] rounded px-3 py-2.5 focus-within:border-[#e4c568] transition-colors">
// // // // //               <span className="text-[#e4c568] font-bold">$</span>
// // // // //               <input 
// // // // //                 type="number" value={directAmount} onChange={(e) => setDirectAmount(e.target.value)} 
// // // // //                 className="bg-transparent outline-none text-white w-full text-sm font-semibold" placeholder="0.00" 
// // // // //               />
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* 🔥 LEVEL INCOME BOX */}
// // // // //           <div className="bg-[#1e2536] p-3.5 rounded-lg border border-[#2d3748] shadow-sm">
// // // // //             <div className="flex justify-between items-center mb-2.5">
// // // // //               <span className="text-[#60a5fa] text-xs font-bold flex items-center gap-1.5"><Users size={14}/> LEVEL INCOME</span>
// // // // //               <span className="text-gray-400 text-[11px] font-semibold">Earned: ${walletData.levelIncome.toFixed(2)}</span>
// // // // //             </div>
// // // // //             <div className="flex items-center gap-2 bg-[#0b101e] border border-[#2d3748] rounded px-3 py-2.5 focus-within:border-[#60a5fa] transition-colors">
// // // // //               <span className="text-[#60a5fa] font-bold">$</span>
// // // // //               <input 
// // // // //                 type="number" value={levelAmount} onChange={(e) => setLevelAmount(e.target.value)} 
// // // // //                 className="bg-transparent outline-none text-white w-full text-sm font-semibold" placeholder="0.00" 
// // // // //               />
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* 🔥 ROI INCOME BOX */}
// // // // //           <div className="bg-[#1e2536] p-3.5 rounded-lg border border-[#2d3748] shadow-sm">
// // // // //             <div className="flex justify-between items-center mb-2.5">
// // // // //               <span className="text-[#c084fc] text-xs font-bold flex items-center gap-1.5"><RefreshCcw size={14}/> ROI INCOME</span>
// // // // //               <span className="text-gray-400 text-[11px] font-semibold">Earned: ${walletData.roiIncome.toFixed(2)}</span>
// // // // //             </div>
// // // // //             <div className="flex items-center gap-2 bg-[#0b101e] border border-[#2d3748] rounded px-3 py-2.5 focus-within:border-[#c084fc] transition-colors">
// // // // //               <span className="text-[#c084fc] font-bold">$</span>
// // // // //               <input 
// // // // //                 type="number" value={roiAmount} onChange={(e) => setRoiAmount(e.target.value)} 
// // // // //                 className="bg-transparent outline-none text-white w-full text-sm font-semibold" placeholder="0.00" 
// // // // //               />
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* 🔥 TOTAL SELECTION */}
// // // // //           <div className="flex justify-between items-center bg-[#131927] border border-[#d4af37]/30 p-3.5 rounded-lg mt-2">
// // // // //             <span className="text-gray-300 text-xs font-extrabold tracking-widest uppercase">Total Transfer</span>
// // // // //             <span className="text-[#d4af37] text-lg font-black">${totalSelection.toFixed(2)}</span>
// // // // //           </div>

// // // // //           {/* Transaction Password */}
// // // // //           <div className="mt-4">
// // // // //             <label className="text-gray-400 text-[11px] font-bold mb-1.5 block tracking-wide uppercase">Transaction Password</label>
// // // // //             <div className="relative">
// // // // //               <input 
// // // // //                 type={showPassword ? "text" : "password"}
// // // // //                 value={transactionPassword}
// // // // //                 onChange={(e) => setTransactionPassword(e.target.value)}
// // // // //                 placeholder="Enter Secure PIN"
// // // // //                 className="w-full bg-[#131927] border border-[#2d3748] text-white px-4 py-3 rounded-lg outline-none focus:border-[#e4c568] focus:ring-1 focus:ring-[#e4c568] placeholder-gray-600 text-sm font-semibold"
// // // // //               />
// // // // //               <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
// // // // //                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Submit Button */}
// // // // //           <button 
// // // // //             onClick={handleSubmit}
// // // // //             disabled={loading}
// // // // //             className="w-full mt-2 bg-gradient-to-r from-[#d4af37] to-[#e4c568] hover:brightness-110 text-black font-extrabold py-3.5 rounded-lg shadow-[0_0_15px_rgba(228,197,104,0.3)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 uppercase tracking-widest text-[14px]"
// // // // //           >
// // // // //             {loading ? 'Processing...' : 'CREDIT FUNDS'}
// // // // //           </button>

// // // // //           {/* Terms and Conditions */}
// // // // //           <div className="mt-4 text-[#6b7280] text-[10px] leading-relaxed font-medium text-center px-2">
// // // // //             <p>1. Convert income balance to fund balance for upgrades.</p>
// // // // //             <p>2. Minimum transfer amount is $1.</p>
// // // // //             <p>3. Active package upgrade is required.</p>
// // // // //           </div>

// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default CreditToWalletModal;






// // // // import React, { useState, useEffect } from "react";
// // // // import api from "../../api/axios";
// // // // import { useAuth } from "../../context/AuthContext";
// // // // import Swal from 'sweetalert2';
// // // // import { X, Eye, EyeOff, Zap, Users, RefreshCcw } from "lucide-react";

// // // // const CreditToWalletModal = ({ onClose }) => {
// // // //   const { user, token } = useAuth();
  
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [walletData, setWalletData] = useState({ 
// // // //     directIncome: 0, levelIncome: 0, roiIncome: 0, balance: 0 
// // // //   });
  
// // // //   const [directAmount, setDirectAmount] = useState("");
// // // //   const [levelAmount, setLevelAmount] = useState("");
// // // //   const [roiAmount, setRoiAmount] = useState("");
// // // //   const [transactionPassword, setTransactionPassword] = useState("");
// // // //   const [showPassword, setShowPassword] = useState(false);

// // // //   useEffect(() => {
// // // //     fetchWalletData();
// // // //   }, []);

// // // //   const fetchWalletData = async () => {
// // // //     try {
// // // //       const res = await api.get(`/wallet/info`, { headers: { Authorization: `Bearer ${token}` }});
// // // //       setWalletData({
// // // //         directIncome: res.data.directIncome || 0,
// // // //         levelIncome: res.data.levelIncome || 0,
// // // //         roiIncome: res.data.roiIncome || 0,
// // // //         balance: res.data.availableBalance || 0 
// // // //       });
// // // //     } catch (err) {
// // // //       console.error("Failed to fetch wallet data", err);
// // // //     }
// // // //   };

// // // //   const totalSelection = (Number(directAmount) || 0) + (Number(levelAmount) || 0) + (Number(roiAmount) || 0);

// // // //   // 🔥 YEH FUNCTION EXACT 4 DECIMALS DIKHAYEGA BINA ROUND OFF KIYE
// // // //   // const formatExact = (num) => {
// // // //   //   if (!num) return "0";
// // // //   //   const str = Number(num).toString(); // Pehle usko normal string banayega
// // // //   //   if (str.includes('.')) {
// // // //   //     const parts = str.split('.');
// // // //   //     return `${parts[0]}.${parts[1].substring(0, 4)}`; // Point ke baad sirf 4 number lega, kuch round nahi karega
// // // //   //   }
// // // //   //   return str;
// // // //   // };

// // // //   // 🔥 YEH FUNCTION DUST (E-16) VALUES KO BHI PROPERLY HANDLE KAREGA
// // // //   const formatExact = (num) => {
// // // //     if (!num) return "0.0000";
// // // //     return Number(num).toFixed(4); 
// // // //   };

// // // //   const handleSubmit = async () => {
// // // //     if (totalSelection < 1) {
// // // //       return Swal.fire({ icon: 'warning', title: 'Invalid Amount', text: 'Minimum credit amount is $1.', background: '#111827', color: '#d4af37' });
// // // //     }
// // // //     if (totalSelection > walletData.balance) {
// // // //       return Swal.fire({ icon: 'error', title: 'Insufficient Balance', text: `You only have $${formatExact(walletData.balance)} available.`, background: '#111827', color: '#ff4d4d' });
// // // //     }
// // // //     if (!transactionPassword) {
// // // //       return Swal.fire({ icon: 'warning', title: 'Password Required', text: 'Enter Transaction Password.', background: '#111827', color: '#d4af37' });
// // // //     }

// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await api.post('/wallet/credit-to-wallet', {
// // // //         amount: totalSelection, 
// // // //         transactionPassword,
// // // //         details: { direct: directAmount, level: levelAmount, roi: roiAmount }
// // // //       }, { headers: { Authorization: `Bearer ${token}` }});

// // // //       if (response.data.success) {
// // // //         Swal.fire({ icon: 'success', title: 'Success!', text: response.data.message, background: '#111827', color: '#d4af37' });
// // // //         onClose();
// // // //        }
// // // //     } catch (err) {
// // // //       Swal.fire({ icon: 'error', title: 'Request Failed', text: err.response?.data?.message || 'Something went wrong.', background: '#111827', color: '#ff4d4d' });
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[99999] flex justify-center items-start sm:items-center pt-16 sm:pt-4 p-3 sm:p-4">
      
// // // //       <div className="bg-[#0b101e] w-full max-w-[420px] max-h-[85vh] sm:max-h-[90vh] rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.15)] border border-[#2d3748] overflow-hidden flex flex-col">
        
// // // //         {/* Header */}
// // // //         <div className="bg-[#e4c568] px-4 py-3 flex justify-between items-center shrink-0">
// // // //           <h2 className="text-black font-extrabold text-[17px] tracking-wide">
// // // //              Wallet to Fund
// // // //           </h2>
// // // //           <button onClick={onClose} className="text-black hover:bg-black/10 p-1 rounded-full transition-colors">
// // // //             <X size={20} strokeWidth={2.5} />
// // // //           </button>
// // // //         </div>

// // // //         {/* Scrollable Content Area */}
// // // //         <div className="p-4 bg-[#0b101e] flex-1 overflow-y-auto custom-scroll space-y-4">
          
// // // //           <div className="bg-[#161c2d] border border-[#2d3748] p-3 rounded-lg text-center shadow-inner mb-2">
// // // //             <p className="text-[10px] text-gray-400 font-bold tracking-wider mb-1 uppercase">Total Income Balance</p>
// // // //             <p className="text-[#00ff88] font-black text-xl">${formatExact(walletData.balance)}</p>
// // // //           </div>

// // // //           {/* 🔥 DIRECT INCOME BOX */}
// // // //           <div className="bg-[#1e2536] p-3.5 rounded-lg border border-[#2d3748] shadow-sm">
// // // //             <div className="flex justify-between items-center mb-2.5">
// // // //               <span className="text-[#e4c568] text-xs font-bold flex items-center gap-1.5"><Zap size={14}/> DIRECT INCOME</span>
// // // //               <span className="text-gray-400 text-[11px] font-semibold">Earned: ${formatExact(walletData.directIncome)}</span>
// // // //             </div>
// // // //             <div className="flex items-center gap-2 bg-[#0b101e] border border-[#2d3748] rounded px-3 py-2.5 focus-within:border-[#e4c568] transition-colors">
// // // //               <span className="text-[#e4c568] font-bold">$</span>
// // // //               <input 
// // // //                 type="number" value={directAmount} onChange={(e) => setDirectAmount(e.target.value)} 
// // // //                 className="bg-transparent outline-none text-white w-full text-sm font-semibold" placeholder="0.00" 
// // // //               />
// // // //             </div>
// // // //           </div>

// // // //           {/* 🔥 LEVEL INCOME BOX */}
// // // //           <div className="bg-[#1e2536] p-3.5 rounded-lg border border-[#2d3748] shadow-sm">
// // // //             <div className="flex justify-between items-center mb-2.5">
// // // //               <span className="text-[#60a5fa] text-xs font-bold flex items-center gap-1.5"><Users size={14}/> LEVEL INCOME</span>
// // // //               <span className="text-gray-400 text-[11px] font-semibold">Earned: ${formatExact(walletData.levelIncome)}</span>
// // // //             </div>
// // // //             <div className="flex items-center gap-2 bg-[#0b101e] border border-[#2d3748] rounded px-3 py-2.5 focus-within:border-[#60a5fa] transition-colors">
// // // //               <span className="text-[#60a5fa] font-bold">$</span>
// // // //               <input 
// // // //                 type="number" value={levelAmount} onChange={(e) => setLevelAmount(e.target.value)} 
// // // //                 className="bg-transparent outline-none text-white w-full text-sm font-semibold" placeholder="0.00" 
// // // //               />
// // // //             </div>
// // // //           </div>

// // // //           {/* 🔥 ROI INCOME BOX */}
// // // //           <div className="bg-[#1e2536] p-3.5 rounded-lg border border-[#2d3748] shadow-sm">
// // // //             <div className="flex justify-between items-center mb-2.5">
// // // //               <span className="text-[#c084fc] text-xs font-bold flex items-center gap-1.5"><RefreshCcw size={14}/> ROI INCOME</span>
// // // //               <span className="text-gray-400 text-[11px] font-semibold">Earned: ${formatExact(walletData.roiIncome)}</span>
// // // //             </div>
// // // //             <div className="flex items-center gap-2 bg-[#0b101e] border border-[#2d3748] rounded px-3 py-2.5 focus-within:border-[#c084fc] transition-colors">
// // // //               <span className="text-[#c084fc] font-bold">$</span>
// // // //               <input 
// // // //                 type="number" value={roiAmount} onChange={(e) => setRoiAmount(e.target.value)} 
// // // //                 className="bg-transparent outline-none text-white w-full text-sm font-semibold" placeholder="0.00" 
// // // //               />
// // // //             </div>
// // // //           </div>

// // // //           {/* 🔥 TOTAL SELECTION */}
// // // //           <div className="flex justify-between items-center bg-[#131927] border border-[#d4af37]/30 p-3.5 rounded-lg mt-2">
// // // //             <span className="text-gray-300 text-xs font-extrabold tracking-widest uppercase">Total Transfer</span>
// // // //             <span className="text-[#d4af37] text-lg font-black">${formatExact(totalSelection)}</span>
// // // //           </div>

// // // //           {/* Transaction Password */}
// // // //           <div className="mt-4">
// // // //             <label className="text-gray-400 text-[11px] font-bold mb-1.5 block tracking-wide uppercase">Transaction Password</label>
// // // //             <div className="relative">
// // // //               <input 
// // // //                 type={showPassword ? "text" : "password"}
// // // //                 value={transactionPassword}
// // // //                 onChange={(e) => setTransactionPassword(e.target.value)}
// // // //                 placeholder="Enter Secure PIN"
// // // //                 className="w-full bg-[#131927] border border-[#2d3748] text-white px-4 py-3 rounded-lg outline-none focus:border-[#e4c568] focus:ring-1 focus:ring-[#e4c568] placeholder-gray-600 text-sm font-semibold"
// // // //               />
// // // //               <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
// // // //                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           {/* Submit Button */}
// // // //           <button 
// // // //             onClick={handleSubmit}
// // // //             disabled={loading}
// // // //             className="w-full mt-2 bg-gradient-to-r from-[#d4af37] to-[#e4c568] hover:brightness-110 text-black font-extrabold py-3.5 rounded-lg shadow-[0_0_15px_rgba(228,197,104,0.3)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 uppercase tracking-widest text-[14px]"
// // // //           >
// // // //             {loading ? 'Processing...' : 'CREDIT FUNDS'}
// // // //           </button>

// // // //           {/* Terms and Conditions */}
// // // //           <div className="mt-4 text-[#6b7280] text-[10px] leading-relaxed font-medium text-center px-2">
// // // //             <p>1. Convert income balance to fund balance for upgrades.</p>
// // // //             <p>2. Minimum transfer amount is $1.</p>
// // // //             <p>3. Active package upgrade is required.</p>
// // // //           </div>

// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default CreditToWalletModal;









// // //  import React, { useState, useEffect } from "react";
// // // import api from "../../api/axios";
// // // import { useAuth } from "../../context/AuthContext";
// // // import Swal from 'sweetalert2';
// // // import { X, Eye, EyeOff, Zap, Users, RefreshCcw, Gift } from "lucide-react";

// // // const CreditToWalletModal = ({ onClose }) => {
// // //   const { user, token } = useAuth();
  
// // //   const [loading, setLoading] = useState(false);
// // //   const [walletData, setWalletData] = useState({ 
// // //     directIncome: 0, levelIncome: 0, roiIncome: 0, balance: 0 
// // //   });
  
// // //   const [directAmount, setDirectAmount] = useState("");
// // //   const [levelAmount, setLevelAmount] = useState("");
// // //   const [roiAmount, setRoiAmount] = useState("");
// // //   const [transactionPassword, setTransactionPassword] = useState("");
// // //   const [showPassword, setShowPassword] = useState(false);

// // //   // 🔥 SALARY STATES
// // //   const [salaryInfo, setSalaryInfo] = useState(null);
// // //   const [claimingSalary, setClaimingSalary] = useState(false);

// // //   useEffect(() => {
// // //     fetchWalletData();
// // //     fetchSalaryData(); // Modal khulte hi salary status bhi layega
// // //   }, []);

// // //   const fetchWalletData = async () => {
// // //     try {
// // //       const res = await api.get(`/wallet/info`, { headers: { Authorization: `Bearer ${token}` }});
// // //       setWalletData({
// // //         directIncome: res.data.directIncome || 0,
// // //         levelIncome: res.data.levelIncome || 0,
// // //         roiIncome: res.data.roiIncome || 0,
// // //         balance: res.data.availableBalance || 0 
// // //       });
// // //     } catch (err) {
// // //       console.error("Failed to fetch wallet data", err);
// // //     }
// // //   };

// // //   // 🔥 FETCH SALARY PROGRESS API
// // //   const fetchSalaryData = async () => {
// // //     try {
// // //       const res = await api.get(`/user/salary-progress/${user.userId}`, { 
// // //         headers: { Authorization: `Bearer ${token}` }
// // //       });
// // //       setSalaryInfo(res.data.data);
// // //     } catch (err) {
// // //       console.error("Failed to fetch salary info", err);
// // //     }
// // //   };

// // //   const totalSelection = (Number(directAmount) || 0) + (Number(levelAmount) || 0) + (Number(roiAmount) || 0);

// // //   const formatExact = (num) => {
// // //     if (!num) return "0.0000";
// // //     return Number(num).toFixed(4); 
// // //   };

// // //   // 🔥 CLAIM SALARY BUTTON FUNCTION
// // //   const handleClaimSalary = async () => {
// // //     setClaimingSalary(true);
// // //     try {
// // //       const res = await api.post('/wallet/claim-salary', {}, { 
// // //         headers: { Authorization: `Bearer ${token}` }
// // //       });
// // //       Swal.fire({ icon: 'success', title: '🎉 Success!', text: res.data.message, background: '#111827', color: '#d4af37' });
// // //       fetchSalaryData(); // Status update karo
// // //       fetchWalletData(); // Main wallet balance update karo
// // //     } catch (err) {
// // //       // BACKEND KA MESSAGE YAHAN POPUP HOGA JAB CRITERIA FAIL HOGA (eg. 3 L1 & 6 L2 active)
// // //       Swal.fire({ icon: 'error', title: 'Claim Failed', text: err.response?.data?.message || 'Something went wrong.', background: '#111827', color: '#ff4d4d' });
// // //     } finally {
// // //       setClaimingSalary(false);
// // //     }
// // //   };

// // //   const handleSubmit = async () => {
// // //     if (totalSelection < 1) {
// // //       return Swal.fire({ icon: 'warning', title: 'Invalid Amount', text: 'Minimum credit amount is $1.', background: '#111827', color: '#d4af37' });
// // //     }
// // //     if (totalSelection > walletData.balance) {
// // //       return Swal.fire({ icon: 'error', title: 'Insufficient Balance', text: `You only have $${formatExact(walletData.balance)} available.`, background: '#111827', color: '#ff4d4d' });
// // //     }
// // //     if (!transactionPassword) {
// // //       return Swal.fire({ icon: 'warning', title: 'Password Required', text: 'Enter Transaction Password.', background: '#111827', color: '#d4af37' });
// // //     }

// // //     setLoading(true);
// // //     try {
// // //       const response = await api.post('/wallet/credit-to-wallet', {
// // //         amount: totalSelection, 
// // //         transactionPassword,
// // //         details: { direct: directAmount, level: levelAmount, roi: roiAmount }
// // //       }, { headers: { Authorization: `Bearer ${token}` }});

// // //       if (response.data.success) {
// // //         Swal.fire({ icon: 'success', title: 'Success!', text: response.data.message, background: '#111827', color: '#d4af37' });
// // //         onClose();
// // //        }
// // //     } catch (err) {
// // //       Swal.fire({ icon: 'error', title: 'Request Failed', text: err.response?.data?.message || 'Something went wrong.', background: '#111827', color: '#ff4d4d' });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[99999] flex justify-center items-start sm:items-center pt-16 sm:pt-4 p-3 sm:p-4">
      
// // //       <div className="bg-[#0b101e] w-full max-w-[420px] max-h-[85vh] sm:max-h-[90vh] rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.15)] border border-[#2d3748] overflow-hidden flex flex-col">
        
// // //         {/* Header */}
// // //         <div className="bg-[#e4c568] px-4 py-3 flex justify-between items-center shrink-0">
// // //           <h2 className="text-black font-extrabold text-[17px] tracking-wide">
// // //              Wallet to Fund
// // //           </h2>
// // //           <button onClick={onClose} className="text-black hover:bg-black/10 p-1 rounded-full transition-colors">
// // //             <X size={20} strokeWidth={2.5} />
// // //           </button>
// // //         </div>

// // //         {/* Scrollable Content Area */}
// // //         <div className="p-4 bg-[#0b101e] flex-1 overflow-y-auto custom-scroll space-y-4">
          
// // //           <div className="bg-[#161c2d] border border-[#2d3748] p-3 rounded-lg text-center shadow-inner mb-2">
// // //             <p className="text-[10px] text-gray-400 font-bold tracking-wider mb-1 uppercase">Total Income Balance</p>
// // //             <p className="text-[#00ff88] font-black text-xl">${formatExact(walletData.balance)}</p>
// // //           </div>

// // //           {/* DIRECT INCOME BOX */}
// // //           <div className="bg-[#1e2536] p-3.5 rounded-lg border border-[#2d3748] shadow-sm">
// // //             <div className="flex justify-between items-center mb-2.5">
// // //               <span className="text-[#e4c568] text-xs font-bold flex items-center gap-1.5"><Zap size={14}/> DIRECT INCOME</span>
// // //               <span className="text-gray-400 text-[11px] font-semibold">Earned: ${formatExact(walletData.directIncome)}</span>
// // //             </div>
// // //             <div className="flex items-center gap-2 bg-[#0b101e] border border-[#2d3748] rounded px-3 py-2.5 focus-within:border-[#e4c568] transition-colors">
// // //               <span className="text-[#e4c568] font-bold">$</span>
// // //               <input 
// // //                 type="number" value={directAmount} onChange={(e) => setDirectAmount(e.target.value)} 
// // //                 className="bg-transparent outline-none text-white w-full text-sm font-semibold" placeholder="0.00" 
// // //               />
// // //             </div>
// // //           </div>

// // //           {/* LEVEL INCOME BOX */}
// // //           <div className="bg-[#1e2536] p-3.5 rounded-lg border border-[#2d3748] shadow-sm">
// // //             <div className="flex justify-between items-center mb-2.5">
// // //               <span className="text-[#60a5fa] text-xs font-bold flex items-center gap-1.5"><Users size={14}/> LEVEL INCOME</span>
// // //               <span className="text-gray-400 text-[11px] font-semibold">Earned: ${formatExact(walletData.levelIncome)}</span>
// // //             </div>
// // //             <div className="flex items-center gap-2 bg-[#0b101e] border border-[#2d3748] rounded px-3 py-2.5 focus-within:border-[#60a5fa] transition-colors">
// // //               <span className="text-[#60a5fa] font-bold">$</span>
// // //               <input 
// // //                 type="number" value={levelAmount} onChange={(e) => setLevelAmount(e.target.value)} 
// // //                 className="bg-transparent outline-none text-white w-full text-sm font-semibold" placeholder="0.00" 
// // //               />
// // //             </div>
// // //           </div>

// // //           {/* ROI INCOME BOX */}
// // //           <div className="bg-[#1e2536] p-3.5 rounded-lg border border-[#2d3748] shadow-sm">
// // //             <div className="flex justify-between items-center mb-2.5">
// // //               <span className="text-[#c084fc] text-xs font-bold flex items-center gap-1.5"><RefreshCcw size={14}/> ROI INCOME</span>
// // //               <span className="text-gray-400 text-[11px] font-semibold">Earned: ${formatExact(walletData.roiIncome)}</span>
// // //             </div>
// // //             <div className="flex items-center gap-2 bg-[#0b101e] border border-[#2d3748] rounded px-3 py-2.5 focus-within:border-[#c084fc] transition-colors">
// // //               <span className="text-[#c084fc] font-bold">$</span>
// // //               <input 
// // //                 type="number" value={roiAmount} onChange={(e) => setRoiAmount(e.target.value)} 
// // //                 className="bg-transparent outline-none text-white w-full text-sm font-semibold" placeholder="0.00" 
// // //               />
// // //             </div>
// // //           </div>

// // //           {/* 🎁 MONTHLY SALARY CLAIM BOX (EXACTLY AS PER IMAGE) */}
// // //           {/* 🎁 MONTHLY SALARY CLAIM BOX (SIRF UNKE LIYE JISKA DB ME isSalaryQualified TRUE HAI) */}
// // //           {salaryInfo && salaryInfo.status === 'qualified' && salaryInfo.salaryMonthsPaid < 6 && (
// // //             <div className="bg-[#1e2536] p-4 rounded-lg border border-[#2d3748] shadow-sm mt-2 flex justify-between items-center">
              
// // //               {/* Left Side: Title & Month Info */}
// // //               <div>
// // //                  <span className="text-[#e4c568] text-[14px] font-black flex items-center gap-2 mb-2 uppercase tracking-wide">
// // //                    <Gift size={16}/> MONTHLY SALARY
// // //                  </span>
// // //                  <span className="text-gray-300 text-[11px] font-bold flex items-center gap-1.5 bg-[#0b101e] px-2.5 py-1 rounded w-fit">
// // //                     MONTH: <span className="text-[#e4c568] font-black">{(salaryInfo.salaryMonthsPaid || 0) + 1} / 6</span>
// // //                  </span>
// // //               </div>

// // //               {/* Right Side: Claim Button */}
// // //               <button 
// // //                 onClick={handleClaimSalary}
// // //                 disabled={claimingSalary}
// // //                 className="px-5 py-2.5 rounded text-[13px] font-black uppercase transition-all bg-[#00c853] hover:bg-[#00e676] text-white shadow-[0_4px_14px_0_rgba(0,200,83,0.39)] hover:shadow-[0_6px_20px_rgba(0,200,83,0.23)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:translate-y-0"
// // //               >
// // //                 {claimingSalary ? 'WAIT...' : 'CLAIM $100'}
// // //               </button>
              
// // //             </div>
// // //           )}

// // //           {/* TOTAL SELECTION */}
// // //           <div className="flex justify-between items-center bg-[#131927] border border-[#d4af37]/30 p-3.5 rounded-lg mt-2">
// // //             <span className="text-gray-300 text-xs font-extrabold tracking-widest uppercase">Total Transfer</span>
// // //             <span className="text-[#d4af37] text-lg font-black">${formatExact(totalSelection)}</span>
// // //           </div>

// // //           {/* Transaction Password */}
// // //           <div className="mt-4">
// // //             <label className="text-gray-400 text-[11px] font-bold mb-1.5 block tracking-wide uppercase">Transaction Password</label>
// // //             <div className="relative">
// // //               <input 
// // //                 type={showPassword ? "text" : "password"}
// // //                 value={transactionPassword}
// // //                 onChange={(e) => setTransactionPassword(e.target.value)}
// // //                 placeholder="Enter Secure PIN"
// // //                 className="w-full bg-[#131927] border border-[#2d3748] text-white px-4 py-3 rounded-lg outline-none focus:border-[#e4c568] focus:ring-1 focus:ring-[#e4c568] placeholder-gray-600 text-sm font-semibold"
// // //               />
// // //               <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
// // //                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* Submit Button */}
// // //           <button 
// // //             onClick={handleSubmit}
// // //             disabled={loading}
// // //             className="w-full mt-2 bg-gradient-to-r from-[#d4af37] to-[#e4c568] hover:brightness-110 text-black font-extrabold py-3.5 rounded-lg shadow-[0_0_15px_rgba(228,197,104,0.3)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 uppercase tracking-widest text-[14px]"
// // //           >
// // //             {loading ? 'Processing...' : 'CREDIT FUNDS'}
// // //           </button>

// // //           {/* Terms and Conditions */}
// // //           <div className="mt-4 text-[#6b7280] text-[10px] leading-relaxed font-medium text-center px-2">
// // //             <p>1. Convert income balance to fund balance for upgrades.</p>
// // //             <p>2. Minimum transfer amount is $1.</p>
// // //             <p>3. Active package upgrade is required.</p>
// // //           </div>

// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CreditToWalletModal;


// // import React, { useState, useEffect } from "react";
// // import api from "../../api/axios";
// // import { useAuth } from "../../context/AuthContext";
// // import Swal from 'sweetalert2';
// // import { X, Eye, EyeOff, Zap, Users, RefreshCcw, Gift, Activity } from "lucide-react";

// // const CreditToWalletModal = ({ onClose }) => {
// //   const { user, token } = useAuth();
  
// //   const [loading, setLoading] = useState(false);
// //   const [walletData, setWalletData] = useState({ 
// //     directIncome: 0, levelIncome: 0, roiIncome: 0, levelRoiIncome: 0, balance: 0 
// //   });
  
// //   const [directAmount, setDirectAmount] = useState("");
// //   const [levelAmount, setLevelAmount] = useState("");
// //   const [roiAmount, setRoiAmount] = useState("");
// //   const [levelRoiAmount, setLevelRoiAmount] = useState(""); // 🔥 NAYA STATE FOR LEVEL ROI
// //   const [transactionPassword, setTransactionPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);

// //   // 🔥 SALARY STATES
// //   const [salaryInfo, setSalaryInfo] = useState(null);
// //   const [claimingSalary, setClaimingSalary] = useState(false);

// //   useEffect(() => {
// //     fetchWalletData();
// //     fetchSalaryData(); 
// //   }, []);

// //   const fetchWalletData = async () => {
// //     try {
// //       const res = await api.get(`/wallet/info`, { headers: { Authorization: `Bearer ${token}` }});
// //        setWalletData({
// //         directIncome: res.data.directIncome || 0,
// //         levelIncome: res.data.levelIncome || 0,
// //         roiIncome: res.data.roiIncome || 0,
// //         levelRoiIncome: res.data.levelRoiIncome || 0, // 🔥 API SE NAYA DATA LENA
// //         balance: res.data.availableBalance || 0 
// //       });
// //     } catch (err) {
// //       console.error("Failed to fetch wallet data", err);
// //     }
// //   };

// //   const fetchSalaryData = async () => {
// //     try {
// //       const res = await api.get(`/user/salary-progress/${user.userId}`, { 
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       setSalaryInfo(res.data.data);
// //     } catch (err) {
// //       console.error("Failed to fetch salary info", err);
// //     }
// //   };

// //   const totalSelection = (Number(directAmount) || 0) + (Number(levelAmount) || 0) + (Number(roiAmount) || 0) + (Number(levelRoiAmount) || 0);

// //   const formatExact = (num) => {
// //     if (!num) return "0.0000";
// //     return Number(num).toFixed(4); 
// //   };

// //   const handleClaimSalary = async () => {
// //     setClaimingSalary(true);
// //     try {
// //       const res = await api.post('/wallet/claim-salary', {}, { 
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       Swal.fire({ icon: 'success', title: '🎉 Success!', text: res.data.message, background: '#111827', color: '#d4af37' });
// //       fetchSalaryData(); 
// //       fetchWalletData(); 
// //     } catch (err) {
// //       Swal.fire({ icon: 'error', title: 'Claim Failed', text: err.response?.data?.message || 'Something went wrong.', background: '#111827', color: '#ff4d4d' });
// //     } finally {
// //       setClaimingSalary(false);
// //     }
// //   };

// //   const handleSubmit = async () => {
// //     if (totalSelection < 1) {
// //       return Swal.fire({ icon: 'warning', title: 'Invalid Amount', text: 'Minimum credit amount is $1.', background: '#111827', color: '#d4af37' });
// //     }
// //     if (totalSelection > walletData.balance) {
// //       return Swal.fire({ icon: 'error', title: 'Insufficient Balance', text: `You only have $${formatExact(walletData.balance)} available.`, background: '#111827', color: '#ff4d4d' });
// //     }
// //     if (!transactionPassword) {
// //       return Swal.fire({ icon: 'warning', title: 'Password Required', text: 'Enter Transaction Password.', background: '#111827', color: '#d4af37' });
// //     }

// //     setLoading(true);
// //     try {
// //       // 🔥 NAYA 'levelRoi' parameter add kiya backend ke hisaab se
// //       const response = await api.post('/wallet/credit-to-wallet', {
// //         amount: totalSelection, 
// //         transactionPassword,
// //         details: { direct: directAmount, level: levelAmount, roi: roiAmount, levelRoi: levelRoiAmount }
// //       }, { headers: { Authorization: `Bearer ${token}` }});

// //       if (response.data.success) {
// //         Swal.fire({ icon: 'success', title: 'Success!', text: response.data.message, background: '#111827', color: '#d4af37' });
// //         onClose();
// //        }
// //     } catch (err) {
// //       Swal.fire({ icon: 'error', title: 'Request Failed', text: err.response?.data?.message || 'Something went wrong.', background: '#111827', color: '#ff4d4d' });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[99999] flex justify-center items-start sm:items-center pt-16 sm:pt-4 p-3 sm:p-4">
      
// //       <div className="bg-[#0b101e] w-full max-w-[420px] max-h-[85vh] sm:max-h-[90vh] rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.15)] border border-[#2d3748] overflow-hidden flex flex-col">
        
// //         {/* Header */}
// //         <div className="bg-[#e4c568] px-4 py-3 flex justify-between items-center shrink-0">
// //           <h2 className="text-black font-extrabold text-[17px] tracking-wide">
// //              Wallet to Fund
// //           </h2>
// //           <button onClick={onClose} className="text-black hover:bg-black/10 p-1 rounded-full transition-colors">
// //             <X size={20} strokeWidth={2.5} />
// //           </button>
// //         </div>

// //         {/* Scrollable Content Area */}
// //         <div className="p-4 bg-[#0b101e] flex-1 overflow-y-auto custom-scroll space-y-4">
          
// //           <div className="bg-[#161c2d] border border-[#2d3748] p-3 rounded-lg text-center shadow-inner mb-2">
// //             <p className="text-[10px] text-gray-400 font-bold tracking-wider mb-1 uppercase">Total Income Balance</p>
// //             <p className="text-[#00ff88] font-black text-xl">${formatExact(walletData.balance)}</p>
// //           </div>

// //           {/* DIRECT INCOME BOX */}
// //           <div className="bg-[#1e2536] p-3.5 rounded-lg border border-[#2d3748] shadow-sm">
// //             <div className="flex justify-between items-center mb-2.5">
// //               <span className="text-[#e4c568] text-xs font-bold flex items-center gap-1.5"><Zap size={14}/> DIRECT INCOME</span>
// //               <span className="text-gray-400 text-[11px] font-semibold">Earned: ${formatExact(walletData.directIncome)}</span>
// //             </div>
// //             <div className="flex items-center gap-2 bg-[#0b101e] border border-[#2d3748] rounded px-3 py-2.5 focus-within:border-[#e4c568] transition-colors">
// //               <span className="text-[#e4c568] font-bold">$</span>
// //               <input 
// //                 type="number" value={directAmount} onChange={(e) => setDirectAmount(e.target.value)} 
// //                 className="bg-transparent outline-none text-white w-full text-sm font-semibold" placeholder="0.00" 
// //               />
// //             </div>
// //           </div>

// //           {/* LEVEL INCOME BOX */}
// //           <div className="bg-[#1e2536] p-3.5 rounded-lg border border-[#2d3748] shadow-sm">
// //             <div className="flex justify-between items-center mb-2.5">
// //               <span className="text-[#60a5fa] text-xs font-bold flex items-center gap-1.5"><Users size={14}/> LEVEL INCOME</span>
// //               <span className="text-gray-400 text-[11px] font-semibold">Earned: ${formatExact(walletData.levelIncome)}</span>
// //             </div>
// //             <div className="flex items-center gap-2 bg-[#0b101e] border border-[#2d3748] rounded px-3 py-2.5 focus-within:border-[#60a5fa] transition-colors">
// //               <span className="text-[#60a5fa] font-bold">$</span>
// //               <input 
// //                 type="number" value={levelAmount} onChange={(e) => setLevelAmount(e.target.value)} 
// //                 className="bg-transparent outline-none text-white w-full text-sm font-semibold" placeholder="0.00" 
// //               />
// //             </div>
// //           </div>

// //           {/* ROI INCOME BOX */}
// //           <div className="bg-[#1e2536] p-3.5 rounded-lg border border-[#2d3748] shadow-sm">
// //             <div className="flex justify-between items-center mb-2.5">
// //               <span className="text-[#c084fc] text-xs font-bold flex items-center gap-1.5"><RefreshCcw size={14}/> ROI INCOME</span>
// //               <span className="text-gray-400 text-[11px] font-semibold">Earned: ${formatExact(walletData.roiIncome)}</span>
// //             </div>
// //             <div className="flex items-center gap-2 bg-[#0b101e] border border-[#2d3748] rounded px-3 py-2.5 focus-within:border-[#c084fc] transition-colors">
// //               <span className="text-[#c084fc] font-bold">$</span>
// //               <input 
// //                 type="number" value={roiAmount} onChange={(e) => setRoiAmount(e.target.value)} 
// //                 className="bg-transparent outline-none text-white w-full text-sm font-semibold" placeholder="0.00" 
// //               />
// //             </div>
// //           </div>

// //           {/* 🔥 LEVEL ROI INCOME BOX (NAYA) */}
// //           <div className="bg-[#1e2536] p-3.5 rounded-lg border border-[#2d3748] shadow-sm">
// //             <div className="flex justify-between items-center mb-2.5">
// //               <span className="text-[#f97316] text-xs font-bold flex items-center gap-1.5"><Activity size={14}/> LEVEL ROI INCOME</span>
// //               <span className="text-gray-400 text-[11px] font-semibold">Earned: ${formatExact(walletData.levelRoiIncome)}</span>
// //             </div>
// //             <div className="flex items-center gap-2 bg-[#0b101e] border border-[#2d3748] rounded px-3 py-2.5 focus-within:border-[#f97316] transition-colors">
// //               <span className="text-[#f97316] font-bold">$</span>
// //               <input 
// //                 type="number" value={levelRoiAmount} onChange={(e) => setLevelRoiAmount(e.target.value)} 
// //                 className="bg-transparent outline-none text-white w-full text-sm font-semibold" placeholder="0.00" 
// //               />
// //             </div>
// //           </div>

// //           {/* 🎁 MONTHLY SALARY CLAIM BOX */}
// //           {salaryInfo && salaryInfo.status === 'qualified' && salaryInfo.salaryMonthsPaid < 6 && (
// //             <div className="bg-[#1e2536] p-4 rounded-lg border border-[#2d3748] shadow-sm mt-2 flex justify-between items-center">
// //               <div>
// //                  <span className="text-[#e4c568] text-[14px] font-black flex items-center gap-2 mb-2 uppercase tracking-wide">
// //                    <Gift size={16}/> MONTHLY SALARY
// //                  </span>
// //                  <span className="text-gray-300 text-[11px] font-bold flex items-center gap-1.5 bg-[#0b101e] px-2.5 py-1 rounded w-fit">
// //                     MONTH: <span className="text-[#e4c568] font-black">{(salaryInfo.salaryMonthsPaid || 0) + 1} / 6</span>
// //                  </span>
// //               </div>
// //               <button 
// //                 onClick={handleClaimSalary}
// //                 disabled={claimingSalary}
// //                 className="px-5 py-2.5 rounded text-[13px] font-black uppercase transition-all bg-[#00c853] hover:bg-[#00e676] text-white shadow-[0_4px_14px_0_rgba(0,200,83,0.39)] hover:shadow-[0_6px_20px_rgba(0,200,83,0.23)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:translate-y-0"
// //               >
// //                 {claimingSalary ? 'WAIT...' : 'CLAIM $100'}
// //               </button>
// //             </div>
// //           )}

// //           {/* TOTAL SELECTION */}
// //           <div className="flex justify-between items-center bg-[#131927] border border-[#d4af37]/30 p-3.5 rounded-lg mt-2">
// //             <span className="text-gray-300 text-xs font-extrabold tracking-widest uppercase">Total Transfer</span>
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
// //           <button 
// //             onClick={handleSubmit}
// //             disabled={loading}
// //             className="w-full mt-2 bg-gradient-to-r from-[#d4af37] to-[#e4c568] hover:brightness-110 text-black font-extrabold py-3.5 rounded-lg shadow-[0_0_15px_rgba(228,197,104,0.3)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 uppercase tracking-widest text-[14px]"
// //           >
// //             {loading ? 'Processing...' : 'CREDIT FUNDS'}
// //           </button>

// //           {/* Terms and Conditions */}
// //           <div className="mt-4 text-[#6b7280] text-[10px] leading-relaxed font-medium text-center px-2">
// //             <p>1. Convert income balance to fund balance for upgrades.</p>
// //             <p>2. Minimum transfer amount is $1.</p>
// //             <p>3. Active package upgrade is required.</p>
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreditToWalletModal;








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
//   Gift,
//   Crown,
//   Wallet,
//   ArrowRightLeft,
//   LockKeyhole,
//   ChevronRight,
//   CheckCircle2,
//   CircleDollarSign,
//   Sparkles,
// } from "lucide-react";

// const CreditToWalletModal = ({ onClose }) => {
//   const { user, token } = useAuth();

//   const [loading, setLoading] = useState(false);
//   const [claimingSalary, setClaimingSalary] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const [walletData, setWalletData] = useState({
//     directIncome: 0,
//     levelIncome: 0,
//     roiIncome: 0,
//     royaltyPoolIncome: 0,
//     balance: 0,
//   });

//   const [directAmount, setDirectAmount] = useState("");
//   const [levelAmount, setLevelAmount] = useState("");
//   const [roiAmount, setRoiAmount] = useState("");
//   const [royaltyAmount, setRoyaltyAmount] = useState("");
//   const [transactionPassword, setTransactionPassword] = useState("");
//   const [salaryInfo, setSalaryInfo] = useState(null);

//   const formatExact = (value) => {
//     const number = Number(value);
//     return (Number.isFinite(number) ? number : 0).toFixed(4);
//   };

//   const alertStyle = {
//     background: "#100d1c",
//     color: "#ffffff",
//     confirmButtonColor: "#8b5cf6",
//   };

//   const fetchWalletData = async () => {
//     try {
//       const res = await api.get("/wallet/info", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = res.data || {};

//       setWalletData({
//         directIncome: Number(data.directIncome) || 0,
//         levelIncome: Number(data.levelIncome) || 0,
//         roiIncome: Number(data.roiIncome) || 0,
//         royaltyPoolIncome:
//           Number(data.royaltyPoolIncome ?? data.royaltyIncome ?? 0) || 0,
//         balance: Number(data.availableBalance) || 0,
//       });
//     } catch (error) {
//       console.error("Failed to fetch wallet data:", error);
//     }
//   };

//   const fetchSalaryData = async () => {
//     if (!user?.userId) return;

//     try {
//       const res = await api.get(
//         `/user/salary-progress/${encodeURIComponent(user.userId)}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setSalaryInfo(res.data?.data || null);
//     } catch (error) {
//       console.error("Failed to fetch salary info:", error);
//     }
//   };

//   useEffect(() => {
//     fetchWalletData();
//     fetchSalaryData();
//   }, [token, user?.userId]);

//   // Same income sources as the Withdrawal Modal.
//   const incomeSources = [
//     {
//       id: "direct",
//       name: "Direct Income",
//       description: "Referral rewards",
//       icon: Zap,
//       earned: walletData.directIncome,
//       amount: directAmount,
//       setAmount: setDirectAmount,
//       accent: "#48e8f4",
//     },
//     {
//       id: "level",
//       name: "Level Income",
//       description: "Network commissions",
//       icon: Users,
//       earned: walletData.levelIncome,
//       amount: levelAmount,
//       setAmount: setLevelAmount,
//       accent: "#8ebaff",
//     },
//     {
//       id: "roi",
//       name: "ROI Income",
//       description: "Investment returns",
//       icon: RefreshCcw,
//       earned: walletData.roiIncome,
//       amount: roiAmount,
//       setAmount: setRoiAmount,
//       accent: "#c0a2ff",
//     },
//     {
//       id: "royalty",
//       name: "Royalty Pool",
//       description: "Royalty rewards",
//       icon: Crown,
//       earned: walletData.royaltyPoolIncome,
//       amount: royaltyAmount,
//       setAmount: setRoyaltyAmount,
//       accent: "#f0a2ff",
//     },
//   ];

//   const totalSelection = incomeSources.reduce(
//     (total, source) => total + (Number(source.amount) || 0),
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

//     const number = Number(value);

//     if (!Number.isFinite(number) || number < 0) return;

//     source.setAmount(value);
//   };

//   const handleClaimSalary = async () => {
//     if (claimingSalary) return;

//     setClaimingSalary(true);

//     try {
//       const res = await api.post(
//         "/wallet/claim-salary",
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       await Swal.fire({
//         ...alertStyle,
//         icon: "success",
//         title: "Salary Claimed",
//         text: res.data?.message || "Your salary claim was successful.",
//       });

//       await Promise.all([fetchSalaryData(), fetchWalletData()]);
//     } catch (error) {
//       await Swal.fire({
//         ...alertStyle,
//         icon: "error",
//         title: "Claim Failed",
//         text:
//           error.response?.data?.message ||
//           "Unable to claim salary right now.",
//       });
//     } finally {
//       setClaimingSalary(false);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event?.preventDefault();

//     if (loading) return;

//     if (totalSelection < 1) {
//       await Swal.fire({
//         ...alertStyle,
//         icon: "warning",
//         title: "Invalid Amount",
//         text: "Minimum credit amount is $1.",
//       });
//       return;
//     }

//     if (totalSelection > walletData.balance) {
//       await Swal.fire({
//         ...alertStyle,
//         icon: "error",
//         title: "Insufficient Balance",
//         text: `You only have $${formatExact(walletData.balance)} available.`,
//       });
//       return;
//     }

//     for (const source of incomeSources) {
//       if (Number(source.amount) > Number(source.earned)) {
//         await Swal.fire({
//           ...alertStyle,
//           icon: "error",
//           title: "Invalid Income Amount",
//           text: `${source.name} amount cannot exceed your earned amount of $${formatExact(source.earned)}.`,
//         });
//         return;
//       }
//     }

//     if (!transactionPassword.trim()) {
//       await Swal.fire({
//         ...alertStyle,
//         icon: "warning",
//         title: "Password Required",
//         text: "Enter your transaction password.",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await api.post(
//         "/wallet/credit-to-wallet",
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
//           ...alertStyle,
//           icon: "success",
//           title: "Credit Successful",
//           text: response.data.message || "Funds credited successfully.",
//         });

//         onClose?.();
//       } else {
//         await Swal.fire({
//           ...alertStyle,
//           icon: "error",
//           title: "Credit Failed",
//           text: response.data?.message || "Unable to credit funds.",
//         });
//       }
//     } catch (error) {
//       await Swal.fire({
//         ...alertStyle,
//         icon: "error",
//         title: "Request Failed",
//         text:
//           error.response?.data?.message ||
//           "Something went wrong. Try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const salaryQualified =
//     salaryInfo?.status === "qualified" &&
//     Number(salaryInfo?.salaryMonthsPaid || 0) < 6;

//   return (
//     <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-[#05040b]/90 p-2 backdrop-blur-md sm:p-5">
//       <section
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="credit-wallet-title"
//         className="relative my-auto flex max-h-[96dvh] w-full max-w-[520px] flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[#0b0914] text-white shadow-[0_25px_100px_rgba(0,0,0,0.65)]"
//       >
//         <div className="h-[3px] shrink-0 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500" />

//         {/* ZORO GAMES Header */}
//         <header className="relative shrink-0 overflow-hidden border-b border-white/[0.07] px-5 pb-5 pt-5 sm:px-7">
//           <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-violet-600/15 blur-[65px]" />

//           <div className="relative flex items-center justify-between gap-3">
//             <div className="flex items-center gap-3">
//               <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300">
//                 <ArrowRightLeft size={22} />
//               </div>

//               <div>
//                 <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300">
//                   ZORO GAMES
//                 </p>
//                 <h2
//                   id="credit-wallet-title"
//                   className="mt-1 text-xl font-black tracking-tight sm:text-2xl"
//                 >
//                   Wallet to Fund
//                 </h2>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={onClose}
//               aria-label="Close modal"
//               className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-400 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
//             >
//               <X size={19} />
//             </button>
//           </div>

//           <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5">
//             <span className="text-xs font-medium text-gray-400">
//               Income conversion portal
//             </span>
//             <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
//               <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
//               Secure session
//             </span>
//           </div>
//         </header>

//         <form
//           onSubmit={handleSubmit}
//           className="custom-scroll flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-6"
//         >
//           {/* Available Balance */}
//           <section className="relative overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-br from-[#21153a] via-[#151027] to-[#0e1020] p-5">
//             <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-fuchsia-500/10 blur-3xl" />

//             <div className="relative flex items-start justify-between gap-3">
//               <div>
//                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-200/70">
//                   Total income balance
//                 </p>

//                 <div className="mt-2 flex items-baseline gap-2">
//                   <span className="text-2xl font-black text-white">$</span>
//                   <span className="text-3xl font-black tracking-tight text-white sm:text-4xl">
//                     {formatExact(walletData.balance)}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-violet-200">
//                 <Wallet size={21} />
//               </div>
//             </div>

//             <div className="relative mt-5 flex items-center justify-between border-t border-white/10 pt-4">
//               <div>
//                 <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
//                   Selected sources
//                 </p>
//                 <p className="mt-1 text-sm font-bold text-violet-200">
//                   {selectedCount} of 4
//                 </p>
//               </div>

//               <div className="text-right">
//                 <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
//                   Minimum transfer
//                 </p>
//                 <p className="mt-1 text-sm font-bold text-gray-200">$1.00</p>
//               </div>
//             </div>
//           </section>

//           {/* Income Allocation */}
//           <section>
//             <div className="mb-3 flex items-end justify-between gap-3">
//               <div>
//                 <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-300">
//                   Fund allocation
//                 </p>
//                 <h3 className="mt-1 text-lg font-extrabold text-white">
//                   Select your income
//                 </h3>
//               </div>

//               <span className="pb-1 text-[10px] font-medium text-gray-500">
//                 USD amounts
//               </span>
//             </div>

//             <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0e0c18]">
//               <div className="grid grid-cols-[1fr_125px] items-center gap-2 border-b border-white/[0.08] bg-white/[0.025] px-3 py-2.5 sm:grid-cols-[1fr_145px] sm:px-4">
//                 <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-500">
//                   Income source
//                 </span>
//                 <span className="text-right text-[9px] font-bold uppercase tracking-[0.16em] text-gray-500">
//                   Transfer amount
//                 </span>
//               </div>

//               {incomeSources.map((source, index) => {
//                 const Icon = source.icon;
//                 const selected = Number(source.amount) > 0;

//                 return (
//                   <div
//                     key={source.id}
//                     className={`grid grid-cols-[1fr_125px] items-center gap-2 px-3 py-4 transition-colors sm:grid-cols-[1fr_145px] sm:px-4 ${
//                       index !== incomeSources.length - 1
//                         ? "border-b border-white/[0.07]"
//                         : ""
//                     } ${selected ? "bg-violet-400/[0.035]" : ""}`}
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
//                           {source.description}
//                         </p>
//                         <p
//                           className="mt-1 text-[10px] font-semibold"
//                           style={{ color: source.accent }}
//                         >
//                           Earned ${formatExact(source.earned)}
//                         </p>
//                       </div>
//                     </div>

//                     <div
//                       className={`flex min-w-0 items-center rounded-xl border bg-[#080710] px-2.5 transition ${
//                         selected
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
//                         aria-label={`${source.name} transfer amount`}
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
//                     Total transfer
//                   </p>
//                   <p className="mt-1 text-[10px] text-gray-500">
//                     To your fund balance
//                   </p>
//                 </div>

//                 <p className="text-xl font-black tracking-tight text-white sm:text-2xl">
//                   <span className="mr-1 text-violet-300">$</span>
//                   {formatExact(totalSelection)}
//                 </p>
//               </div>
//             </div>

//             <div className="mt-3 flex items-start gap-2 text-[10px] leading-4 text-gray-500">
//               <CircleDollarSign
//                 size={14}
//                 className="mt-0.5 shrink-0 text-violet-300"
//               />
//               <p>
//                 Choose the amount for each income source. The total must be at
//                 least $1 and must not exceed your available balance or the
//                 earned amount of each source.
//               </p>
//             </div>
//           </section>

//           {/* Monthly Salary */}
//           {salaryQualified && (
//             <section className="relative overflow-hidden rounded-2xl border border-fuchsia-400/20 bg-gradient-to-r from-[#21142b] to-[#171023] p-4">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-300">
//                   <Gift size={20} />
//                 </div>

//                 <div className="min-w-0 flex-1">
//                   <p className="text-sm font-extrabold text-white">
//                     Monthly Salary
//                   </p>
//                   <p className="mt-1 text-[10px] text-gray-400">
//                     Month{" "}
//                     <span className="font-bold text-fuchsia-300">
//                       {Number(salaryInfo.salaryMonthsPaid || 0) + 1} / 6
//                     </span>
//                   </p>
//                 </div>

//                 <Sparkles size={17} className="shrink-0 text-fuchsia-300" />
//               </div>

//               <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-3">
//                 <div>
//                   <p className="text-[10px] uppercase tracking-wider text-gray-500">
//                     Available claim
//                   </p>
//                   <p className="mt-1 text-lg font-black text-fuchsia-200">
//                     $100
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={handleClaimSalary}
//                   disabled={claimingSalary}
//                   className="rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 px-4 py-3 text-xs font-extrabold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   {claimingSalary ? "CLAIMING..." : "CLAIM $100"}
//                 </button>
//               </div>
//             </section>
//           )}

//           {/* Transaction Password */}
//           <section>
//             <div className="mb-2 flex items-center justify-between">
//               <label
//                 htmlFor="credit-transaction-password"
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
//                 id="credit-transaction-password"
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
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//                 className="flex h-12 w-11 shrink-0 items-center justify-center text-gray-500 transition hover:text-violet-300"
//               >
//                 {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
//               </button>
//             </div>
//           </section>

//           {/* Submit */}
//           <section className="space-y-3 pt-1">
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative flex min-h-[54px] w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-violet-600 to-fuchsia-600 px-4 py-3 text-sm font-extrabold text-white shadow-[0_8px_28px_rgba(139,92,246,0.22)] transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {loading ? (
//                 <>
//                   <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
//                   Processing...
//                 </>
//               ) : (
//                 <>
//                   <ArrowRightLeft size={18} />
//                   Credit Funds
//                   <ChevronRight
//                     size={17}
//                     className="transition-transform group-hover:translate-x-1"
//                   />
//                 </>
//               )}
//             </button>

//             <button
//               type="button"
//               onClick={() => {
//                 setDirectAmount("");
//                 setLevelAmount("");
//                 setRoiAmount("");
//                 setRoyaltyAmount("");
//                 setTransactionPassword("");
//               }}
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
//                 Transfer eligible income to your fund balance for package
//                 upgrades. Minimum transfer is $1. Active package upgrade
//                 requirements still apply.
//               </p>
//             </div>
//           </section>
//         </form>
//       </section>
//     </div>
//   );
// };

// export default CreditToWalletModal;





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
  Crown,
  Wallet,
  ArrowRightLeft,
  LockKeyhole,
  ChevronRight,
  CheckCircle2,
  CircleDollarSign,
} from "lucide-react";

const CreditToWalletModal = ({ onClose }) => {
  const { user, token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [messageModal, setMessageModal] = useState({
    open: false,
    title: "",
    message: "",
    type: "info",
  });
  const [successModal, setSuccessModal] = useState({
    open: false,
    amount: 0,
    title: "",
    message: "",
    userId: user?.userId || "",
    closeParent: false,
  });

  const showMessage = (title, message, type = "info") => {
    setMessageModal({ open: true, title, message, type });
  };

  const closeMessage = () => {
    setMessageModal((previous) => ({ ...previous, open: false }));
  };

  const closeSuccessModal = () => {
    const shouldCloseParent = successModal.closeParent;
    setSuccessModal((previous) => ({ ...previous, open: false }));
    if (shouldCloseParent) onClose?.();
  };

  const [walletData, setWalletData] = useState({
    directIncome: 0,
    levelIncome: 0,
    roiIncome: 0,
    royaltyPoolIncome: 0,
    balance: 0,
  });

  const [directAmount, setDirectAmount] = useState("");
  const [levelAmount, setLevelAmount] = useState("");
  const [roiAmount, setRoiAmount] = useState("");
  const [royaltyAmount, setRoyaltyAmount] = useState("");
  const [transactionPassword, setTransactionPassword] = useState("");

  const formatExact = (value) => {
    const number = Number(value);
    return (Number.isFinite(number) ? number : 0).toFixed(4);
  };

  const fetchWalletData = async () => {
    try {
      const res = await api.get("/wallet/info", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data || {};

      setWalletData({
        directIncome: Number(data.directIncome) || 0,
        levelIncome: Number(data.levelIncome) || 0,
        roiIncome: Number(data.roiIncome) || 0,
        royaltyPoolIncome:
          Number(data.royaltyPoolIncome ?? data.royaltyIncome ?? 0) || 0,
        balance: Number(data.availableBalance) || 0,
      });
    } catch (error) {
      console.error("Failed to fetch wallet data:", error);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, [token, user?.userId]);

  // Same income sources as the Withdrawal Modal.
  const incomeSources = [
    {
      id: "direct",
      name: "Direct Income",
      description: "Referral rewards",
      icon: Zap,
      earned: walletData.directIncome,
      amount: directAmount,
      setAmount: setDirectAmount,
      accent: "#48e8f4",
    },
    {
      id: "level",
      name: "Level Income",
      description: "Network commissions",
      icon: Users,
      earned: walletData.levelIncome,
      amount: levelAmount,
      setAmount: setLevelAmount,
      accent: "#8ebaff",
    },
    {
      id: "roi",
      name: "ROI Income",
      description: "Investment returns",
      icon: RefreshCcw,
      earned: walletData.roiIncome,
      amount: roiAmount,
      setAmount: setRoiAmount,
      accent: "#c0a2ff",
    },
    {
      id: "royalty",
      name: "Royalty Pool",
      description: "Royalty rewards",
      icon: Crown,
      earned: walletData.royaltyPoolIncome,
      amount: royaltyAmount,
      setAmount: setRoyaltyAmount,
      accent: "#f0a2ff",
    },
  ];

  const totalSelection = incomeSources.reduce(
    (total, source) => total + (Number(source.amount) || 0),
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

    const number = Number(value);

    if (!Number.isFinite(number) || number < 0) return;

    source.setAmount(value);
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();

    if (loading) return;

    if (totalSelection < 1) {
      showMessage(
        "Invalid Amount",
        "Minimum credit amount is $1.",
        "warning"
      );
      return;
    }

    if (totalSelection > walletData.balance) {
      showMessage(
        "Insufficient Balance",
        `You only have $${formatExact(walletData.balance)} available.`,
        "error"
      );
      return;
    }

    for (const source of incomeSources) {
      if (Number(source.amount) > Number(source.earned)) {
        showMessage(
          "Invalid Income Amount",
          `${source.name} amount cannot exceed your earned amount of $${formatExact(source.earned)}.`,
          "error"
        );
        return;
      }
    }

    if (!transactionPassword.trim()) {
      showMessage(
        "Password Required",
        "Enter your transaction password.",
        "warning"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        "/wallet/credit-to-wallet",
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
          title: "Credit Successful",
          message: response.data.message || "Funds credited successfully.",
          userId: user?.userId || "",
          closeParent: true,
        });
      } else {
        showMessage(
          "Credit Failed",
          response.data?.message || "Unable to credit funds.",
          "error"
        );
      }
    } catch (error) {
      showMessage(
        "Request Failed",
        error.response?.data?.message ||
          "Something went wrong. Try again.",
        "error"
      );
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
        aria-labelledby="credit-wallet-title"
        className="relative my-auto flex max-h-[96dvh] w-full max-w-[520px] flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[#0b0914] text-white shadow-[0_25px_100px_rgba(0,0,0,0.65)]"
      >
        <div className="h-[3px] shrink-0 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500" />

        {/* ZORO GAMES Header */}
        <header className="relative shrink-0 overflow-hidden border-b border-white/[0.07] px-5 pb-5 pt-5 sm:px-7">
          <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-violet-600/15 blur-[65px]" />

          <div className="relative flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300">
                <ArrowRightLeft size={22} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300">
                  ZORO GAMES
                </p>
                <h2
                  id="credit-wallet-title"
                  className="mt-1 text-xl font-black tracking-tight sm:text-2xl"
                >
                  Wallet to Fund
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-400 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
            >
              <X size={19} />
            </button>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5">
            <span className="text-xs font-medium text-gray-400">
              Income conversion portal
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Secure session
            </span>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="custom-scroll flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-6"
        >
          {/* Available Balance */}
          <section className="relative overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-br from-[#21153a] via-[#151027] to-[#0e1020] p-5">
            <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-fuchsia-500/10 blur-3xl" />

            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-200/70">
                  Total income balance
                </p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">$</span>
                  <span className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                    {formatExact(walletData.balance)}
                  </span>
                </div>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-violet-200">
                <Wallet size={21} />
              </div>
            </div>

            <div className="relative mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                  Selected sources
                </p>
                <p className="mt-1 text-sm font-bold text-violet-200">
                  {selectedCount} of 4
                </p>
              </div>

              <div className="text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                  Minimum transfer
                </p>
                <p className="mt-1 text-sm font-bold text-gray-200">$1.00</p>
              </div>
            </div>
          </section>

          {/* Income Allocation */}
          <section>
            <div className="mb-3 flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-300">
                  Fund allocation
                </p>
                <h3 className="mt-1 text-lg font-extrabold text-white">
                  Select your income
                </h3>
              </div>

              <span className="pb-1 text-[10px] font-medium text-gray-500">
                USD amounts
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0e0c18]">
              <div className="grid grid-cols-[1fr_125px] items-center gap-2 border-b border-white/[0.08] bg-white/[0.025] px-3 py-2.5 sm:grid-cols-[1fr_145px] sm:px-4">
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-500">
                  Income source
                </span>
                <span className="text-right text-[9px] font-bold uppercase tracking-[0.16em] text-gray-500">
                  Transfer amount
                </span>
              </div>

              {incomeSources.map((source, index) => {
                const Icon = source.icon;
                const selected = Number(source.amount) > 0;

                return (
                  <div
                    key={source.id}
                    className={`grid grid-cols-[1fr_125px] items-center gap-2 px-3 py-4 transition-colors sm:grid-cols-[1fr_145px] sm:px-4 ${
                      index !== incomeSources.length - 1
                        ? "border-b border-white/[0.07]"
                        : ""
                    } ${selected ? "bg-violet-400/[0.035]" : ""}`}
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
                          {source.description}
                        </p>
                        <p
                          className="mt-1 text-[10px] font-semibold"
                          style={{ color: source.accent }}
                        >
                          Earned ${formatExact(source.earned)}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex min-w-0 items-center rounded-xl border bg-[#080710] px-2.5 transition ${
                        selected
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
                        aria-label={`${source.name} transfer amount`}
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
                    Total transfer
                  </p>
                  <p className="mt-1 text-[10px] text-gray-500">
                    To your fund balance
                  </p>
                </div>

                <p className="text-xl font-black tracking-tight text-white sm:text-2xl">
                  <span className="mr-1 text-violet-300">$</span>
                  {formatExact(totalSelection)}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-start gap-2 text-[10px] leading-4 text-gray-500">
              <CircleDollarSign
                size={14}
                className="mt-0.5 shrink-0 text-violet-300"
              />
              <p>
                Choose the amount for each income source. The total must be at
                least $1 and must not exceed your available balance or the
                earned amount of each source.
              </p>
            </div>
          </section>

          {/* Transaction Password */}
          <section>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="credit-transaction-password"
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
                id="credit-transaction-password"
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
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="flex h-12 w-11 shrink-0 items-center justify-center text-gray-500 transition hover:text-violet-300"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </section>

          {/* Submit */}
          <section className="space-y-3 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="group relative flex min-h-[54px] w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-violet-600 to-fuchsia-600 px-4 py-3 text-sm font-extrabold text-white shadow-[0_8px_28px_rgba(139,92,246,0.22)] transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowRightLeft size={18} />
                  Credit Funds
                  <ChevronRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setDirectAmount("");
                setLevelAmount("");
                setRoiAmount("");
                setRoyaltyAmount("");
                setTransactionPassword("");
              }}
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
                Transfer eligible income to your fund balance for package
                upgrades. Minimum transfer is $1. Active package upgrade
                requirements still apply.
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
      type="credit"
      amount={successModal.amount}
      userId={successModal.userId}
      customTitle={successModal.title}
      customMessage={successModal.message}
    />
    </>
  );
};

export default CreditToWalletModal;
