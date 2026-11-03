// // import React, { useState, useEffect } from "react";
// // import api from "../../api/axios";
// // import { useAuth } from "../../context/AuthContext";
// // import { useNavigate } from "react-router-dom";
// // import Swal from 'sweetalert2';
// // import { X, Eye, EyeOff } from "lucide-react";

// // const WalletTransferModal = ({ onClose }) => {
// //   const { user, token } = useAuth();
// //   const navigate = useNavigate();
  
// //   const [loading, setLoading] = useState(false);
// //   const [walletData, setWalletData] = useState({ balance: 0 });
// //   const [receiverId, setReceiverId] = useState("");
// //   const [amount, setAmount] = useState("");
// //   const [transactionPassword, setTransactionPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);

// //   useEffect(() => {
// //     fetchWalletData();
// //   }, []);

// //   const fetchWalletData = async () => {
// //     try {
// //       const res = await api.get(`/wallet/info`, { headers: { Authorization: `Bearer ${token}` }});
// //       // Ab backend se walletBalance aayega, toh yahan $0 nahi dikhega
// //       setWalletData({ balance: res.data.walletBalance || 0 });
// //     } catch (err) {
// //       console.error("Failed to fetch wallet data");
// //     }
// //   };

// //   const handleQuickAmount = (val) => setAmount(val);

// //   const handleSubmit = async () => {
// //     if (!receiverId) return Swal.fire({ icon: 'warning', title: 'User ID Required', text: 'Please enter receiver User ID.', background: '#0b101e', color: '#e4c568' });
// //     if (!amount || amount < 1) return Swal.fire({ icon: 'warning', title: 'Invalid Amount', text: 'Minimum transfer is $1.', background: '#0b101e', color: '#e4c568' });
// //     if (!transactionPassword) return Swal.fire({ icon: 'warning', title: 'Password Required', text: 'Enter Transaction Password.', background: '#0b101e', color: '#e4c568' });

// //     setLoading(true);
// //     try {
// //       const response = await api.post('/wallet/transfer', {
// //         receiverId,
// //         amount: Number(amount),
// //         transactionPassword
// //       }, { headers: { Authorization: `Bearer ${token}` }});

// //       if (response.data.success) {
// //         Swal.fire({ icon: 'success', title: 'Transferred!', text: response.data.message, background: '#0b101e', color: '#e4c568' });
// //         onClose();
// //       }
// //     } catch (err) {
// //       Swal.fire({ icon: 'error', title: 'Transfer Failed', text: err.response?.data?.message || 'Something went wrong.', background: '#0b101e', color: '#ff4d4d' });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[99999] flex justify-center items-center p-3 sm:p-4">
// //       <div className="bg-[#0b101e] w-full max-w-[420px] max-h-[85vh] sm:max-h-[90vh] rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.15)] border border-[#2d3748] overflow-hidden flex flex-col mt-4 sm:mt-0">
        
// //         <div className="bg-[#e4c568] px-4 py-3 flex justify-between items-center shrink-0">
// //           <h2 className="text-black font-extrabold text-[17px] tracking-wide">Fund  Transfer</h2>
// //           <button onClick={onClose} className="text-black hover:bg-black/10 p-1 rounded-full transition-colors"><X size={20} strokeWidth={2.5} /></button>
// //         </div>

// //         <div className="bg-[#161c2d] px-4 py-2 border-b border-[#2d3748] shrink-0">
// //           <p className="text-[#e4c568] text-xs font-bold tracking-wide">Minimum $1 Amount For Transfer!</p>
// //         </div>

// //         <div className="p-4 bg-[#0b101e] flex-1 overflow-y-auto">
// //           <div className="border border-[#2d3748] rounded-md overflow-hidden flex flex-col font-semibold text-[13px]">
// //             <div className="flex border-b border-[#2d3748]">
// //               <div className="w-2/3 bg-[#131927] text-white p-2.5 border-r border-[#2d3748]">Available Fund Balance</div>
// //               <div className="w-1/3 bg-[#131927] text-[#00ff88] p-2.5">${walletData.balance.toFixed(2)}</div>
// //             </div>
// //           </div>

// //           <div className="mt-4 space-y-3">
// //             {/* <input type="text" value={receiverId} onChange={(e) => setReceiverId(e.target.value)} placeholder="Enter Receiver User ID" className="w-full bg-[#131927] border border-[#2d3748] text-white px-3 py-2.5 rounded outline-none focus:border-[#e4c568] focus:ring-1 focus:ring-[#e4c568] placeholder-gray-500 text-sm" /> */}
            
// //             <input 
// //     type="text" 
// //     value={receiverId} 
// //     // 🔥 YAHAN CHANGE KIYA HAI: .toUpperCase() add kiya hai
// //     onChange={(e) => setReceiverId(e.target.value.toUpperCase())} 
// //     placeholder="Enter Receiver User ID" 
// //     // 🔥 YAHAN CHANGE KIYA HAI: End me 'uppercase' class add ki hai
// //     className="w-full bg-[#131927] border border-[#2d3748] text-white px-3 py-2.5 rounded outline-none focus:border-[#e4c568] focus:ring-1 focus:ring-[#e4c568] placeholder-gray-500 text-sm uppercase" 
// // />

// //             <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter Transfer Amount ($)" className="w-full bg-[#131927] border border-[#2d3748] text-white px-3 py-2.5 rounded outline-none focus:border-[#e4c568] focus:ring-1 focus:ring-[#e4c568] placeholder-gray-500 text-sm" />
            
// //             <div className="flex gap-2">
// //               {[1, 5, 10, 20, 50].map((val) => (
// //                 <button key={val} type="button" onClick={() => handleQuickAmount(val)} className="flex-1 bg-[#1e2536] hover:bg-[#2d3748] border border-[#2d3748] text-white py-1.5 rounded font-bold text-sm transition-colors">${val}</button>
// //               ))}
// //             </div>

// //             <div className="relative mt-2">
// //               <input type={showPassword ? "text" : "password"} value={transactionPassword} onChange={(e) => setTransactionPassword(e.target.value)} placeholder="Enter Transaction Password" className="w-full bg-[#131927] border border-[#2d3748] text-white px-3 py-2.5 rounded outline-none focus:border-[#e4c568] focus:ring-1 focus:ring-[#e4c568] placeholder-gray-500 pr-10 text-sm" />
// //               <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
// //             </div>

// //             <button onClick={handleSubmit} disabled={loading} className="w-full mt-3 bg-[#e4c568] hover:bg-[#d4af37] text-black font-extrabold py-2.5 rounded shadow-[0_0_10px_rgba(228,197,104,0.3)] hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100 uppercase tracking-widest text-[15px]">
// //               {loading ? 'Processing...' : 'TRANSFER FUNDS'}
// //             </button>
// //           </div>

// //           <div className="mt-4 pb-2 text-[#9ca3af] text-[11px] leading-relaxed font-medium">
// //             <h4 className="text-[#e4c568] font-bold text-xs mb-1.5">Terms & Conditions</h4>
// //             <p>1. Minimum transfer amount is $1.</p>
// //             <p>2. Fund transfers cannot be reversed once processed.</p>
// //             <p>3. Active package upgrade is required for transfers.</p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default WalletTransferModal;

// import React, { useState, useEffect } from "react";
// import api from "../../api/axios";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';
// import { X, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";

// const WalletTransferModal = ({ onClose }) => {
//   const { user, token } = useAuth();
//   const navigate = useNavigate();
  
//   const [loading, setLoading] = useState(false);
//   const [walletData, setWalletData] = useState({ balance: 0 });
//   const [receiverId, setReceiverId] = useState("");
//   const [amount, setAmount] = useState("");
//   const [transactionPassword, setTransactionPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   // 🔥 NAYE STATES: Receiver ka naam aur loading check karne ke liye
//   const [receiverName, setReceiverName] = useState("");
//   const [isCheckingName, setIsCheckingName] = useState(false);

//   useEffect(() => {
//     fetchWalletData();
//   }, []);

//   const fetchWalletData = async () => {
//     try {
//       const res = await api.get(`/wallet/info`, { headers: { Authorization: `Bearer ${token}` }});
//       setWalletData({ balance: res.data.walletBalance || 0 });
//     } catch (err) {
//       console.error("Failed to fetch wallet data");
//     }
//   };

//   // ==========================================
//   // 🔥 RECEIVER NAME FETCH LOGIC (Debounced)
//   // ==========================================
//   useEffect(() => {
//     const checkReceiverName = async () => {
//       // Agar ID 5 character se choti hai, toh check mat karo
//       if (receiverId.length < 5) {
//         setReceiverName("");
//         return;
//       }
      
//       setIsCheckingName(true);
//       try {
//         // Aapke existing check-sponsor route ko call kar raha hai
//         const res = await api.get(`/user/check-sponsor/${receiverId}`);
//         setReceiverName(res.data.name);
//       } catch (err) {
//         setReceiverName("Invalid User ID");
//       } finally {
//         setIsCheckingName(false);
//       }
//     };

//     // User ke type karne ke baad 500ms (aadha second) wait karke API call karega (Load bachane ke liye)
//     const timeoutId = setTimeout(checkReceiverName, 500);
//     return () => clearTimeout(timeoutId);
//   }, [receiverId]);

//   const handleQuickAmount = (val) => setAmount(val);

//   const handleSubmit = async () => {
//     if (!receiverId) return Swal.fire({ icon: 'warning', title: 'User ID Required', text: 'Please enter receiver User ID.', background: '#0b101e', color: '#e4c568' });
//     if (receiverName === "Invalid User ID") return Swal.fire({ icon: 'error', title: 'Invalid Receiver', text: 'Please enter a valid User ID.', background: '#0b101e', color: '#ff4d4d' });
//     if (!amount || amount < 1) return Swal.fire({ icon: 'warning', title: 'Invalid Amount', text: 'Minimum transfer is $1.', background: '#0b101e', color: '#e4c568' });
//     if (!transactionPassword) return Swal.fire({ icon: 'warning', title: 'Password Required', text: 'Enter Transaction Password.', background: '#0b101e', color: '#e4c568' });

//     setLoading(true);
//     try {
//       const response = await api.post('/wallet/transfer', {
//         receiverId,
//         amount: Number(amount),
//         transactionPassword
//       }, { headers: { Authorization: `Bearer ${token}` }});

//       if (response.data.success) {
//         Swal.fire({ icon: 'success', title: 'Transferred!', text: response.data.message, background: '#0b101e', color: '#e4c568' });
//         onClose();
//       }
//     } catch (err) {
//       Swal.fire({ icon: 'error', title: 'Transfer Failed', text: err.response?.data?.message || 'Something went wrong.', background: '#0b101e', color: '#ff4d4d' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[99999] flex justify-center items-center p-3 sm:p-4">
//       <div className="bg-[#0b101e] w-full max-w-[420px] max-h-[85vh] sm:max-h-[90vh] rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.15)] border border-[#2d3748] overflow-hidden flex flex-col mt-4 sm:mt-0">
        
//         <div className="bg-[#e4c568] px-4 py-3 flex justify-between items-center shrink-0">
//           <h2 className="text-black font-extrabold text-[17px] tracking-wide">Fund  Transfer</h2>
//           <button onClick={onClose} className="text-black hover:bg-black/10 p-1 rounded-full transition-colors"><X size={20} strokeWidth={2.5} /></button>
//         </div>

//         <div className="bg-[#161c2d] px-4 py-2 border-b border-[#2d3748] shrink-0">
//           <p className="text-[#e4c568] text-xs font-bold tracking-wide">Minimum $1 Amount For Transfer!</p>
//         </div>

//         <div className="p-4 bg-[#0b101e] flex-1 overflow-y-auto">
//           <div className="border border-[#2d3748] rounded-md overflow-hidden flex flex-col font-semibold text-[13px]">
//             <div className="flex border-b border-[#2d3748]">
//               <div className="w-2/3 bg-[#131927] text-white p-2.5 border-r border-[#2d3748]">Available Fund Balance</div>
//               <div className="w-1/3 bg-[#131927] text-[#00ff88] p-2.5">${walletData.balance.toFixed(2)}</div>
//             </div>
//           </div>

//           <div className="mt-4 space-y-3">
            
//             {/* 🔥 RECEIVER ID INPUT WITH NAME PREVIEW */}
//             <div>
//                 <input 
//                     type="text" 
//                     value={receiverId} 
//                     onChange={(e) => setReceiverId(e.target.value.toUpperCase())} 
//                     placeholder="Enter Receiver User ID" 
//                     className={`w-full bg-[#131927] border text-white px-3 py-2.5 rounded outline-none placeholder-gray-500 text-sm uppercase transition-colors ${receiverName === "Invalid User ID" ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-[#2d3748] focus:border-[#e4c568] focus:ring-1 focus:ring-[#e4c568]"}`} 
//                 />
                
//                 {/* Name validation visual feedback */}
//                 <div className="h-5 mt-1 px-1">
//                   {isCheckingName ? (
//                     <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1.5 animate-pulse">
//                        <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span> Checking ID...
//                     </span>
//                   ) : receiverName && receiverName !== "Invalid User ID" ? (
//                     <span className="text-[12px] text-[#00ff88] font-bold flex items-center gap-1.5 capitalize tracking-wide">
//                        <CheckCircle2 size={14} /> {receiverName}
//                     </span>
//                   ) : receiverName === "Invalid User ID" ? (
//                     <span className="text-[12px] text-red-400 font-bold flex items-center gap-1.5 tracking-wide">
//                        <AlertCircle size={14} /> Invalid User ID
//                     </span>
//                   ) : null}
//                 </div>
//             </div>

//             <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter Transfer Amount ($)" className="w-full bg-[#131927] border border-[#2d3748] text-white px-3 py-2.5 rounded outline-none focus:border-[#e4c568] focus:ring-1 focus:ring-[#e4c568] placeholder-gray-500 text-sm" />
            
//             <div className="flex gap-2">
//               {[1, 5, 10, 20, 50].map((val) => (
//                 <button key={val} type="button" onClick={() => handleQuickAmount(val)} className="flex-1 bg-[#1e2536] hover:bg-[#2d3748] border border-[#2d3748] text-white py-1.5 rounded font-bold text-sm transition-colors">${val}</button>
//               ))}
//             </div>

//             <div className="relative mt-2">
//               <input type={showPassword ? "text" : "password"} value={transactionPassword} onChange={(e) => setTransactionPassword(e.target.value)} placeholder="Enter Transaction Password" className="w-full bg-[#131927] border border-[#2d3748] text-white px-3 py-2.5 rounded outline-none focus:border-[#e4c568] focus:ring-1 focus:ring-[#e4c568] placeholder-gray-500 pr-10 text-sm" />
//               <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
//             </div>

//             <button onClick={handleSubmit} disabled={loading || receiverName === "Invalid User ID"} className="w-full mt-3 bg-[#e4c568] hover:bg-[#d4af37] text-black font-extrabold py-2.5 rounded shadow-[0_0_10px_rgba(228,197,104,0.3)] hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed uppercase tracking-widest text-[15px]">
//               {loading ? 'Processing...' : 'TRANSFER FUNDS'}
//             </button>
//           </div>

//           <div className="mt-4 pb-2 text-[#9ca3af] text-[11px] leading-relaxed font-medium">
//             <h4 className="text-[#e4c568] font-bold text-xs mb-1.5">Terms & Conditions</h4>
//             <p>1. Minimum transfer amount is $1.</p>
//             <p>2. Fund transfers cannot be reversed once processed.</p>
//             <p>3. Active package upgrade is required for transfers.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WalletTransferModal;



 import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import {
  X,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Wallet,
  ArrowLeftRight,
  ShieldCheck,
  RefreshCw,
  LockKeyhole,
  ArrowUpRight,
  UserRound,
  CircleDollarSign,
  ScanLine,
} from "lucide-react";

const formatMoney = (value) =>
  Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const WalletTransferModal = ({ onClose }) => {
  const { user, token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [walletData, setWalletData] = useState({ balance: 0 });

  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionPassword, setTransactionPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [receiverName, setReceiverName] = useState("");
  const [isCheckingName, setIsCheckingName] = useState(false);

  const normalizedReceiverId = receiverId.trim().toUpperCase();
  const numericAmount = Number(amount);

  const validAmount =
    amount.trim() !== "" &&
    Number.isFinite(numericAmount) &&
    numericAmount >= 1;

  const invalidReceiver = receiverName === "Invalid User ID";

  const insufficientBalance =
    validAmount &&
    numericAmount > Number(walletData.balance || 0);

  const canSubmit =
    !loading &&
    !isCheckingName &&
    normalizedReceiverId.length >= 5 &&
    Boolean(receiverName) &&
    !invalidReceiver &&
    validAmount &&
    !insufficientBalance &&
    Boolean(transactionPassword.trim());

  const showAlert = (options) =>
    Swal.fire({
      background: "#0b0a14",
      color: "#f1f5f9",
      confirmButtonColor: "#8b5cf6",
      ...options,
    });

  // Fetch wallet balance
  const fetchWalletData = async (showError = false) => {
    if (!token) return;

    try {
      const response = await api.get("/wallet/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWalletData({
        balance: Number(response.data?.walletBalance || 0),
      });
    } catch (error) {
      console.error("Wallet fetch failed:", error);

      if (showError) {
        showAlert({
          icon: "error",
          title: "Wallet unavailable",
          text:
            error.response?.data?.message ||
            "Could not refresh your wallet balance.",
        });
      }
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadWallet = async () => {
      if (!token) return;

      try {
        const response = await api.get("/wallet/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!cancelled) {
          setWalletData({
            balance: Number(response.data?.walletBalance || 0),
          });
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Wallet fetch failed:", error);
        }
      }
    };

    loadWallet();

    return () => {
      cancelled = true;
    };
  }, [token]);

  // Receiver ID validation with debounce
  useEffect(() => {
    if (normalizedReceiverId.length < 5) {
      setReceiverName("");
      setIsCheckingName(false);
      return;
    }

    let cancelled = false;

    setReceiverName("");
    setIsCheckingName(true);

    const timeoutId = setTimeout(async () => {
      try {
        const response = await api.get(
          `/user/check-sponsor/${encodeURIComponent(
            normalizedReceiverId
          )}`
        );

        if (cancelled) return;

        setReceiverName(
          response.data?.name || "Invalid User ID"
        );
      } catch (error) {
        if (!cancelled) {
          setReceiverName("Invalid User ID");
        }
      } finally {
        if (!cancelled) {
          setIsCheckingName(false);
        }
      }
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [normalizedReceiverId]);

  const handleRefreshWallet = async () => {
    setRefreshing(true);

    try {
      await fetchWalletData(true);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (normalizedReceiverId.length < 5) {
      return showAlert({
        icon: "warning",
        title: "Receiver required",
        text: "Please enter a valid receiver User ID.",
      });
    }

    if (isCheckingName) {
      return showAlert({
        icon: "info",
        title: "Checking receiver",
        text: "Wait until receiver verification is complete.",
      });
    }

    if (!receiverName || invalidReceiver) {
      return showAlert({
        icon: "error",
        title: "Invalid receiver",
        text: "Please enter a valid User ID.",
      });
    }

    if (
      user?.userId &&
      normalizedReceiverId === String(user.userId).toUpperCase()
    ) {
      return showAlert({
        icon: "warning",
        title: "Cannot transfer",
        text: "You cannot transfer funds to your own account.",
      });
    }

    if (!validAmount) {
      return showAlert({
        icon: "warning",
        title: "Invalid amount",
        text: "The minimum transfer amount is $1.",
      });
    }

    if (insufficientBalance) {
      return showAlert({
        icon: "warning",
        title: "Insufficient balance",
        text: "Your available wallet balance is not enough.",
      });
    }

    if (!transactionPassword.trim()) {
      return showAlert({
        icon: "warning",
        title: "Password required",
        text: "Enter your transaction password.",
      });
    }

    const confirmation = await showAlert({
      icon: "question",
      title: "Confirm transfer",
      html: `
        <div style="font-size:14px;line-height:1.8;color:#cbd5e1">
          Send <strong style="color:#67e8f9">$${formatMoney(
            numericAmount
          )}</strong> to
          <strong style="color:#d8b4fe">${normalizedReceiverId}</strong>?
          <br/>
          <span style="font-size:12px;color:#94a3b8">
            Please check the receiver and amount carefully.
          </span>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Confirm transfer",
      cancelButtonText: "Go back",
      reverseButtons: true,
    });

    if (!confirmation.isConfirmed) return;

    setLoading(true);

    try {
      const response = await api.post(
        "/wallet/transfer",
        {
          receiverId: normalizedReceiverId,
          amount: numericAmount,
          transactionPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.success) {
        setTransactionPassword("");

        await showAlert({
          icon: "success",
          title: "Transfer successful",
          text:
            response.data.message ||
            "Your transfer has been processed successfully.",
          confirmButtonText: "Done",
        });

        await fetchWalletData();
        onClose();
      } else {
        showAlert({
          icon: "error",
          title: "Transfer not completed",
          text:
            response.data?.message ||
            "The transfer could not be completed.",
        });
      }
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Transfer failed",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const remainingBalance = Math.max(
    0,
    Number(walletData.balance || 0) -
      (validAmount ? numericAmount : 0)
  );

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-[#05040b]/85 p-3 backdrop-blur-lg sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="transfer-modal-title"
        className="relative my-auto flex max-h-[92dvh] w-full max-w-[390px] flex-col overflow-hidden rounded-[24px] border border-violet-400/20 bg-[#0c0b16] shadow-[0_25px_80px_rgba(0,0,0,0.6)]"
      >
        {/* Thin neon accent */}
        <div className="h-[3px] shrink-0 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500" />

        {/* Compact header */}
        <header className=" pt-[60px] relative flex shrink-0 items-center justify-between border-b border-white/[0.07] px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
              <ArrowLeftRight size={20} />
            </div>

            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-cyan-300">
                ZORO / WALLET
              </p>
              <h2
                id="transfer-modal-title"
                className="mt-0.5 text-base font-extrabold text-white"
              >
                Transfer Funds
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close transfer modal"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.07] hover:text-white disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </header>

        <div className="relative flex-1 overflow-y-auto overscroll-contain">
          <form onSubmit={handleSubmit} className="space-y-4 p-4">
            {/* Slim balance strip — unique layout */}
            <section className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                  <Wallet size={17} />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-medium text-slate-500">
                    Available balance
                  </p>
                  <p className="mt-0.5 truncate text-lg font-black text-white">
                    ${formatMoney(walletData.balance)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRefreshWallet}
                disabled={refreshing || loading}
                aria-label="Refresh balance"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-slate-400 transition hover:border-cyan-300/30 hover:text-cyan-300 disabled:opacity-50"
              >
                <RefreshCw
                  size={14}
                  className={refreshing ? "animate-spin" : ""}
                />
              </button>
            </section>

            {/* Receiver card */}
            <section>
              <label
                htmlFor="receiver-id"
                className="mb-2 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400"
              >
                <UserRound size={13} className="text-violet-300" />
                Recipient
              </label>

              <div className="relative">
                <input
                  id="receiver-id"
                  type="text"
                  value={receiverId}
                  onChange={(event) =>
                    setReceiverId(event.target.value.toUpperCase())
                  }
                  placeholder="Enter member ID"
                  autoComplete="off"
                  required
                  className={`w-full rounded-xl border bg-[#11101d] px-3.5 py-3 pr-10 text-sm font-semibold uppercase text-white outline-none transition placeholder:normal-case placeholder:font-normal placeholder:text-slate-600 ${
                    invalidReceiver
                      ? "border-red-400/50 focus:border-red-400"
                      : "border-white/[0.08] focus:border-violet-400/60"
                  }`}
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isCheckingName ? (
                    <span className="block h-4 w-4 animate-spin rounded-full border-2 border-violet-300 border-t-transparent" />
                  ) : receiverName && !invalidReceiver ? (
                    <CheckCircle2 size={17} className="text-emerald-400" />
                  ) : invalidReceiver ? (
                    <AlertCircle size={17} className="text-red-400" />
                  ) : (
                    <ScanLine size={17} className="text-slate-600" />
                  )}
                </div>
              </div>

              <div className="mt-1.5 min-h-[18px]">
                {isCheckingName ? (
                  <p className="text-[11px] text-violet-300">
                    Checking member...
                  </p>
                ) : receiverName && !invalidReceiver ? (
                  <p className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                    <CheckCircle2 size={12} />
                    {receiverName}
                  </p>
                ) : invalidReceiver ? (
                  <p className="flex items-center gap-1.5 text-[11px] text-red-400">
                    <AlertCircle size={12} />
                    Member ID not found.
                  </p>
                ) : (
                  <p className="text-[10px] text-slate-600">
                    Receiver ID must contain at least 5 characters.
                  </p>
                )}
              </div>
            </section>

            {/* Manual amount entry — no quick amount buttons */}
            <section className="rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.07] to-transparent p-3.5">
              <div className="mb-2.5 flex items-center justify-between">
                <label
                  htmlFor="transfer-amount"
                  className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-300"
                >
                  Amount to send
                </label>

                <span className="rounded-md bg-violet-400/10 px-2 py-1 text-[9px] font-black text-violet-300">
                  USD
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#090812] px-3.5 py-3 focus-within:border-violet-400/60">
                <span className="text-2xl font-black text-violet-300">
                  $
                </span>

                <input
                  id="transfer-amount"
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full min-w-0 bg-transparent text-2xl font-black text-white outline-none placeholder:text-slate-700"
                />
              </div>

              <div className="mt-2 flex items-center justify-between gap-2">
                <p className="text-[10px] text-slate-500">
                  Minimum transfer: $1
                </p>

                {insufficientBalance && (
                  <p className="text-[10px] font-semibold text-red-400">
                    Insufficient funds
                  </p>
                )}
              </div>
            </section>

            {/* Transaction password */}
            <section>
              <label
                htmlFor="transfer-password"
                className="mb-2 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400"
              >
                <LockKeyhole size={13} className="text-fuchsia-300" />
                Transaction password
              </label>

              <div className="relative">
                <input
                  id="transfer-password"
                  type={showPassword ? "text" : "password"}
                  value={transactionPassword}
                  onChange={(event) =>
                    setTransactionPassword(event.target.value)
                  }
                  placeholder="Enter transaction password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-white/[0.08] bg-[#11101d] px-3.5 py-3 pr-11 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-fuchsia-400/60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </section>

            {/* Small receipt summary */}
            <section className="rounded-xl border border-white/[0.07] bg-black/20 px-3.5 py-3">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="text-slate-500">Recipient ID</span>
                <span className="max-w-[65%] truncate font-bold text-slate-300">
                  {normalizedReceiverId || "—"}
                </span>
              </div>

              <div className="my-2.5 border-t border-dashed border-white/[0.08]" />

              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="text-slate-500">Estimated remaining balance</span>
                <span
                  className={`font-extrabold ${
                    insufficientBalance ? "text-red-400" : "text-cyan-300"
                  }`}
                >
                  ${formatMoney(remainingBalance)}
                </span>
              </div>
            </section>

            {/* Submit action */}
            <button
              type="submit"
              disabled={!canSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3.5 text-xs font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-violet-950/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowLeftRight size={16} />
                  Review & Transfer
                  <ArrowUpRight size={15} />
                </>
              )}
            </button>

            {/* Compact note */}
            <p className="flex items-start justify-center gap-1.5 pb-1 text-center text-[10px] leading-relaxed text-slate-600">
              <ShieldCheck size={12} className="mt-0.5 shrink-0 text-cyan-400" />
              Verify the recipient before confirming. Completed transfers may not be reversible.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WalletTransferModal;
 