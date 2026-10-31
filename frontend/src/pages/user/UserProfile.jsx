// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import api from "../../api/axios";
// // // import { ArrowLeft, Save, Lock, ShieldCheck } from 'lucide-react';
// // // import { useAuth } from '../../context/AuthContext';
// // // import MessageModal from '../../components/modals/MessageModal';

// // // function UserProfile() {
// // //   const navigate = useNavigate();
// // //   const { user } = useAuth();

// // //   const [formData, setFormData] = useState({
// // //     walletAddress: user?.walletAddress || '',
// // //     upiId: user?.upiId || '', // Added based on image structure
// // //   });

// // //   const [isUpdatingWallet, setIsUpdatingWallet] = useState(false);

// // //   useEffect(() => {
// // //     if (user) {
// // //       setFormData({
// // //         walletAddress: user.walletAddress || '',
// // //         upiId: user.upiId || '',
// // //       });
// // //     }
// // //   }, [user]);

// // //   const [loginPassword, setLoginPassword] = useState('');
// // //   const [newLoginPassword, setNewLoginPassword] = useState('');
// // //   const [currentTxnPassword, setCurrentTxnPassword] = useState('');
// // //   const [newTxnPassword, setNewTxnPassword] = useState('');

// // //   const [messageModal, setMessageModal] = useState({
// // //     open: false, title: '', message: '', type: 'info',
// // //   });

// // //   const showMessage = (title, message, type = 'info') =>
// // //     setMessageModal({ open: true, title, message, type });

// // //   const handleUpdateWallet = async () => {
// // //     if (!formData.walletAddress) {
// // //       return showMessage('Missing Info', 'Please enter a valid wallet address.', 'warning');
// // //     }
// // //     try {
// // //       setIsUpdatingWallet(true);
// // //       await api.put(`/user/update-wallet/${user.userId}`, { walletAddress: formData.walletAddress });
// // //       showMessage('Success ✅', 'Your Account Details have been updated successfully.', 'success');
// // //     } catch (err) {
// // //       showMessage('Error', err.response?.data?.message || 'Failed to update details.', 'error');
// // //     } finally {
// // //       setIsUpdatingWallet(false);
// // //     }
// // //   };

// // //   const handleChangePassword = async type => {
// // //     let payload;
// // //     if (type === 'login') {
// // //       if (!loginPassword || !newLoginPassword) return showMessage('Missing Fields', 'Please enter current and new login password.', 'warning');
// // //       payload = { oldPassword: loginPassword, newPassword: newLoginPassword };
// // //     } else {
// // //       if (!currentTxnPassword || !newTxnPassword) return showMessage('Missing Fields', 'Please enter current and new transaction password.', 'warning');
// // //       payload = { oldTxnPassword: currentTxnPassword, newTxnPassword };
// // //     }

// // //     try {
// // //       await api.put(`/user/change-password/${user.userId}`, payload);
// // //       showMessage('Password Updated 🔐', 'Your password has been changed successfully.', 'success');

// // //       if(type === 'login') {
// // //           setLoginPassword('');
// // //           setNewLoginPassword('');
// // //       } else {
// // //           setCurrentTxnPassword('');
// // //           setNewTxnPassword('');
// // //       }
// // //     } catch (err) {
// // //       showMessage('Error', err.response?.data?.message || 'Password update failed.', 'error');
// // //     }
// // //   };

// // //   if (!user) {
// // //     return (
// // //         <div className="min-h-screen bg-[#0b1221] text-[#eab308] flex justify-center items-center font-bold text-xl">
// // //             Please login first.
// // //         </div>
// // //     );
// // //   }

// // //   // Format the joining date to match the image style (e.g., "28-Jul-2026")
// // //   const joinDate = user.createdAt 
// // //     ? new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')
// // //     : 'N/A';

// // //   return (
// // //    <div className="min-h-screen bg-[#0b1221] text-gray-300 font-sans pb-20 pt-6 md:pt-10">
// // //       <div className="max-w-4xl mx-auto px-4 md:px-8">
          
// // //           {/* Header & Back Button */}
// // //           <div className="flex items-center gap-4 mb-10">
              
// // //               <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide">
// // //                  User Detail
// // //               </h1>
// // //           </div>

// // //           {/* ================= SECTION 1: Edit User Details ================= */}
// // //           <div className="mb-12">
// // //               <h2 className="text-2xl md:text-3xl font-bold text-[#eab308] border-b border-gray-700 pb-3 mb-2">
// // //                   Edit User Details
// // //               </h2>
              
// // //               <div className="flex flex-col">
// // //                   {/* Row: Sponsor ID */}
// // //                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
// // //                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">Sponsor ID</div>
// // //                       <div className="w-full md:w-2/3 text-gray-400 text-base">{user.sponsorId || 'N/A'}</div>
// // //                   </div>

// // //                   {/* Row: My Name */}
// // //                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
// // //                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">My Name</div>
// // //                       <div className="w-full md:w-2/3 text-gray-400 text-base">{user.name || 'N/A'}</div>
// // //                   </div>

// // //                   {/* Row: My User ID */}
// // //                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
// // //                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">My User ID</div>
// // //                       <div className="w-full md:w-2/3 text-gray-400 text-base">{user.userId || 'N/A'}</div>
// // //                   </div>

// // //                   {/* Row: Joining */}
// // //                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
// // //                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">Joining</div>
// // //                       <div className="w-full md:w-2/3 text-gray-400 text-base">{joinDate}</div>
// // //                   </div>

// // //                   {/* Row: Email */}
// // //                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
// // //                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">Email</div>
// // //                       <div className="w-full md:w-2/3 text-gray-400 text-base">{user.email || 'N/A'}</div>
// // //                   </div>

// // //                   {/* Row: Country */}
// // //                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
// // //                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">Country</div>
// // //                       <div className="w-full md:w-2/3 text-gray-400 text-base">{user.country || 'India'}</div>
// // //                   </div>
// // //               </div>
// // //           </div>

// // //           {/* ================= SECTION 2: Edit Account Details ================= */}
// // //           <div className="mb-12">
// // //               <h2 className="text-2xl md:text-3xl font-bold text-[#eab308] border-b border-gray-700 pb-3 mb-2 flex items-center justify-between">
// // //                   <span>Edit Account Details</span>
// // //                   <button 
// // //                       onClick={handleUpdateWallet}
// // //                       disabled={isUpdatingWallet}
// // //                       className="text-sm bg-[#eab308] text-[#0b1221] px-4 py-1.5 rounded font-black uppercase flex items-center gap-2 hover:bg-yellow-400 disabled:opacity-50"
// // //                   >
// // //                       {isUpdatingWallet ? "Saving..." : <><Save size={16} /> Save</>}
// // //                   </button>
// // //               </h2>

// // //               <div className="flex flex-col">
// // //                   {/* Row: Wallet */}
// // //                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800 items-start md:items-center">
// // //                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-2 md:mb-0">Wallet (BEP20)</div>
// // //                       <div className="w-full md:w-2/3">
// // //                           <input 
// // //                               type="text"
// // //                               value={formData.walletAddress}
// // //                               onChange={(e) => setFormData({...formData, walletAddress: e.target.value})}
// // //                               placeholder="Enter USDT BEP20 Wallet Address"
// // //                               className="w-full bg-[#131c31] border border-gray-700 text-[#eab308] px-4 py-2 rounded focus:outline-none focus:border-[#eab308] transition-all font-mono text-sm"
// // //                           />
// // //                       </div>
// // //                   </div>

               
// // //               </div>
// // //           </div>

// // //           {/* ================= SECTION 3: Security Settings (Reformatted to match structure) ================= */}
// // //           <div className="mb-12">
// // //               <h2 className="text-2xl md:text-3xl font-bold text-[#eab308] border-b border-gray-700 pb-3 mb-2">
// // //                   Security Settings
// // //               </h2>

// // //               <div className="flex flex-col mt-4">
// // //                   {/* Login Password Section */}
// // //                   <div className="bg-[#131c31] p-4 rounded-lg border border-gray-800 mb-6">
// // //                       <h3 className="text-white font-bold mb-4 flex items-center gap-2"><ShieldCheck size={18} className="text-[#eab308]"/> Change Login Password</h3>
// // //                       <div className="flex flex-col md:flex-row gap-4">
// // //                           <input type="password" placeholder="Current Login Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="flex-1 bg-[#0b1221] border border-gray-700 rounded px-4 py-2 text-white focus:border-[#eab308] outline-none text-sm placeholder-gray-600" />
// // //                           <input type="password" placeholder="New Login Password" value={newLoginPassword} onChange={e => setNewLoginPassword(e.target.value)} className="flex-1 bg-[#0b1221] border border-gray-700 rounded px-4 py-2 text-white focus:border-[#eab308] outline-none text-sm placeholder-gray-600" />
// // //                           <button onClick={() => handleChangePassword('login')} className="bg-[#eab308]/10 text-[#eab308] hover:bg-[#eab308] hover:text-[#0b1221] border border-[#eab308]/30 font-bold px-6 py-2 rounded transition-all text-sm">
// // //                               Update
// // //                           </button>
// // //                       </div>
// // //                   </div>

// // //                   {/* Transaction Password Section */}
// // //                   <div className="bg-[#131c31] p-4 rounded-lg border border-gray-800">
// // //                       <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Lock size={18} className="text-[#eab308]"/> Change Transaction Password</h3>
// // //                       <div className="flex flex-col md:flex-row gap-4">
// // //                           <input type="password" placeholder="Current Txn Password" value={currentTxnPassword} onChange={e => setCurrentTxnPassword(e.target.value)} className="flex-1 bg-[#0b1221] border border-gray-700 rounded px-4 py-2 text-white focus:border-[#eab308] outline-none text-sm placeholder-gray-600" />
// // //                           <input type="password" placeholder="New Txn Password" value={newTxnPassword} onChange={e => setNewTxnPassword(e.target.value)} className="flex-1 bg-[#0b1221] border border-gray-700 rounded px-4 py-2 text-white focus:border-[#eab308] outline-none text-sm placeholder-gray-600" />
// // //                           <button onClick={() => handleChangePassword('txn')} className="bg-[#eab308]/10 text-[#eab308] hover:bg-[#eab308] hover:text-[#0b1221] border border-[#eab308]/30 font-bold px-6 py-2 rounded transition-all text-sm">
// // //                               Update
// // //                           </button>
// // //                       </div>
// // //                   </div>
// // //               </div>
// // //           </div>

// // //       </div>

// // //       <MessageModal
// // //         isOpen={messageModal.open}
// // //         onClose={() => setMessageModal({ ...messageModal, open: false })}
// // //         title={messageModal.title}
// // //         message={messageModal.message}
// // //         type={messageModal.type}
// // //         zIndex={11000}
// // //       />

// // //    </div>
// // //   );
// // // }

// // // export default UserProfile;


// // import React from 'react';
// // import { useAuth } from '../../context/AuthContext';

// // function UserProfile() {
// //   const { user } = useAuth();

 
// //   if (!user) {
// //     return (
// //         <div className="min-h-screen bg-[#0b1221] text-[#eab308] flex justify-center items-center font-bold text-xl">
// //             Please login first.
// //         </div>
// //     );
// //   }

// //   // Format the joining date to match the image style (e.g., "28-Jul-2026")
// //   const joinDate = user.createdAt 
// //     ? new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')
// //     : 'N/A';

// //   return (
// //    <div className="min-h-screen bg-[#0b1221] text-gray-300 font-sans pb-20 pt-6 md:pt-10">
// //       <div className="max-w-4xl mx-auto px-4 md:px-8">
          
// //           {/* Header */}
// //           <div className="flex items-center gap-4 mb-10">
// //               <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide">
// //                  User Detail
// //               </h1>
// //           </div>

// //           {/* ================= SECTION: User & Account Details ================= */}
// //           <div className="mb-12">
// //               <h2 className="text-2xl md:text-3xl font-bold text-[#eab308] border-b border-gray-700 pb-3 mb-2">
// //                   My Profile Info
// //               </h2>
              
// //               <div className="flex flex-col">
// //                   {/* Row: Sponsor ID */}
// //                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
// //                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">Sponsor ID</div>
// //                       <div className="w-full md:w-2/3 text-gray-400 text-base">{user.sponsorId || 'N/A'}</div>
// //                   </div>

// //                   {/* Row: My Name */}
// //                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
// //                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">My Name</div>
// //                       <div className="w-full md:w-2/3 text-gray-400 text-base">{user.name || 'N/A'}</div>
// //                   </div>

// //                   {/* Row: My User ID */}
// //                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
// //                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">My User ID</div>
// //                       <div className="w-full md:w-2/3 text-gray-400 text-base">{user.userId || 'N/A'}</div>
// //                   </div>

// //                   {/* Row: Joining Date */}
// //                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
// //                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">Joining</div>
// //                       <div className="w-full md:w-2/3 text-gray-400 text-base">{joinDate}</div>
// //                   </div>

// //                   {/* Row: Email */}
// //                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
// //                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">Email</div>
// //                       <div className="w-full md:w-2/3 text-gray-400 text-base">{user.email || 'N/A'}</div>
// //                   </div>

// //                   {/* Row: Country */}
// //                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
// //                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">Country</div>
// //                       <div className="w-full md:w-2/3 text-gray-400 text-base">{user.country || 'India'}</div>
// //                   </div>

// //                   {/* Row: Wallet Address (Read-Only) */}
// //                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
// //                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">Wallet (BEP20)</div>
// //                       <div className="w-full md:w-2/3 text-[#eab308] text-base font-mono break-all">
// //                           {user.walletAddress || 'Not Provided'}
// //                       </div>
// //                   </div>
// //               </div>
// //           </div>

// //       </div>
// //    </div>
// //   );
// // }

// // export default UserProfile;


// import React from 'react';
// import { useAuth } from '../../context/AuthContext';

// function UserProfile() {
//   const { user } = useAuth();

//   if (!user) {
//     return (
//         <div className="min-h-screen bg-[#0b1221] text-[#eab308] flex justify-center items-center font-bold text-xl">
//             Please login first.
//         </div>
//     );
//   }

//   // 🔥 NAYA LOGIC: 1 August 2026 se pehle walo ko fix '01-Aug-2026' dikhana hai
//   let joinDate = 'N/A';
//   if (user?.createdAt) {
//     const userDate = new Date(user.createdAt);
    
//     // Threshold date set ki hai: 1 August 2026
//     const thresholdDate = new Date('2026-08-01T00:00:00'); 

//     // Agar joining date 1 Aug 2026 se pehle ki hai, toh fix '01-Aug-2026' dikhao
//     if (userDate < thresholdDate) {
//       joinDate = '01-Aug-2026';
//     } else {
//       // Warna asli date dikhao
//       joinDate = userDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
//     }
//   }

//   return (
//    <div className="min-h-screen bg-[#0b1221] text-gray-300 font-sans pb-20 pt-6 md:pt-10">
//       <div className="max-w-4xl mx-auto px-4 md:px-8">
          
//           {/* Header */}
//           <div className="flex items-center gap-4 mb-10">
//               <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide">
//                  User Detail
//               </h1>
//           </div>

//           {/* ================= SECTION: User & Account Details ================= */}
//           <div className="mb-12">
//               <h2 className="text-2xl md:text-3xl font-bold text-[#eab308] border-b border-gray-700 pb-3 mb-2">
//                   My Profile Info
//               </h2>
              
//               <div className="flex flex-col">
//                   {/* Row: Sponsor ID */}
//                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
//                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">Sponsor ID</div>
//                       <div className="w-full md:w-2/3 text-gray-400 text-base">{user.sponsorId || 'N/A'}</div>
//                   </div>

//                   {/* Row: My Name */}
//                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
//                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">My Name</div>
//                       <div className="w-full md:w-2/3 text-gray-400 text-base">{user.name || 'N/A'}</div>
//                   </div>

//                   {/* Row: My User ID */}
//                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
//                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">My User ID</div>
//                       <div className="w-full md:w-2/3 text-gray-400 text-base">{user.userId || 'N/A'}</div>
//                   </div>

//                   {/* Row: Joining Date */}
//                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
//                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">Joining</div>
//                       <div className="w-full md:w-2/3 text-gray-400 text-base">{joinDate}</div>
//                   </div>

//                   {/* Row: Email */}
//                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
//                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">Email</div>
//                       <div className="w-full md:w-2/3 text-gray-400 text-base">{user.email || 'N/A'}</div>
//                   </div>

//                   {/* Row: Country */}
//                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
//                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">Country</div>
//                       <div className="w-full md:w-2/3 text-gray-400 text-base">{user.country || 'India'}</div>
//                   </div>

//                   {/* Row: Wallet Address (Read-Only) */}
//                   <div className="flex flex-col md:flex-row py-4 border-b border-gray-800">
//                       <div className="w-full md:w-1/3 font-bold text-white text-base md:text-lg mb-1 md:mb-0">Wallet (BEP20)</div>
//                       <div className="w-full md:w-2/3 text-[#eab308] text-base font-mono break-all">
//                           {user.walletAddress || 'Not Provided'}
//                       </div>
//                   </div>
//               </div>
//           </div>

//       </div>
//    </div>
//   );
// }

// export default UserProfile;


import React from "react";
import { useAuth } from "../../context/AuthContext";
import {
  UserRound,
  Fingerprint,
  CalendarDays,
  Mail,
  Globe2,
  Wallet,
  UsersRound,
  ShieldCheck,
  Copy,
  Check,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatJoinDate = (createdAt) => {
  if (!createdAt) return "N/A";

  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "N/A";

  // Keep the existing rule: accounts created before 1 Aug 2026 show this date.
  const thresholdDate = new Date("2026-08-01T00:00:00");

  const displayDate =
    date < thresholdDate ? new Date("2026-08-01T00:00:00") : date;

  return displayDate
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-");
};

const DetailRow = ({ icon: Icon, label, value, accent = false, mono = false }) => (
  <div className="grid grid-cols-1 gap-2 border-b border-white/[0.07] py-4 last:border-b-0 sm:grid-cols-[minmax(150px,0.8fr)_minmax(0,1.5fr)] sm:items-start sm:gap-5">
    <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-400 sm:text-sm">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-cyan-300">
        <Icon size={16} />
      </span>
      <span>{label}</span>
    </div>

    <div
      className={`min-w-0 break-words pl-10 text-sm font-semibold sm:pl-0 sm:text-[15px] ${
        accent ? "text-cyan-200" : "text-slate-100"
      } ${mono ? "font-mono tracking-wide" : ""}`}
    >
      {value || "N/A"}
    </div>
  </div>
);

function UserProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  const handleCopyWallet = async () => {
    const address = user?.walletAddress;
    if (!address) return;

    try {
      await navigator.clipboard.writeText(String(address));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Unable to copy wallet address:", error);
      alert("Copy failed. Please copy the wallet address manually.");
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080811] px-4 text-white">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#10111b] p-7 text-center shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/[0.08] text-fuchsia-300">
            <ShieldCheck size={26} />
          </div>
          <h1 className="mt-4 text-lg font-extrabold">Login required</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Please log in to view your profile details.
          </p>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-5 w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-4 py-3 text-sm font-bold text-white transition hover:brightness-110"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const joinDate = formatJoinDate(user.createdAt);

  const details = [
    {
      label: "Sponsor ID",
      value: user.sponsorId || "N/A",
      icon: UsersRound,
      accent: true,
      mono: true,
    },
    {
      label: "My Name",
      value: user.name || "N/A",
      icon: UserRound,
    },
    {
      label: "My User ID",
      value: user.userId || "N/A",
      icon: Fingerprint,
      accent: true,
      mono: true,
    },
    {
      label: "Joining Date",
      value: joinDate,
      icon: CalendarDays,
    },
    {
      label: "Email Address",
      value: user.email || "N/A",
      icon: Mail,
    },
    {
      label: "Country",
      value: user.country || "India",
      icon: Globe2,
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080811] px-3 pb-24 pt-5 font-sans text-white sm:px-6 sm:pb-12 sm:pt-8">
      {/* Decorative background, consistent with the updated dashboard theme */}
      <div className="pointer-events-none absolute -left-36 top-16 h-80 w-80 rounded-full bg-fuchsia-600/[0.08] blur-[110px]" />
      <div className="pointer-events-none absolute -right-36 top-72 h-96 w-96 rounded-full bg-cyan-500/[0.07] blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        <header className="mb-6 flex items-center gap-3 sm:mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-cyan-300/30 hover:text-white"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-cyan-300">
              Player account
            </p>
            <h1 className="mt-1 text-xl font-black uppercase tracking-wide text-white sm:text-2xl">
              User Details
            </h1>
          </div>
        </header>

        {/* Profile identity card */}
        <section className="relative mb-5 overflow-hidden rounded-3xl border border-fuchsia-300/15 bg-gradient-to-br from-[#21112b] via-[#151323] to-[#0c1822] p-5 shadow-xl shadow-black/20 sm:mb-6 sm:p-7">
          <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-fuchsia-500/[0.10] blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-1 w-2/3 bg-gradient-to-r from-transparent via-fuchsia-400/50 to-cyan-300/50" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-300/25 bg-gradient-to-br from-fuchsia-500/20 to-violet-500/10 text-fuchsia-200 shadow-lg shadow-fuchsia-950/20 sm:h-20 sm:w-20">
              <UserRound size={34} strokeWidth={1.7} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.23em] text-slate-400">
                Welcome to your profile
              </p>
              <h2 className="mt-1 break-words text-2xl font-black tracking-tight text-white sm:text-3xl">
                {user.name || "Player"}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1.5 text-[10px] font-bold text-cyan-200">
                  <Fingerprint size={13} />
                  ID: {user.userId || "N/A"}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold text-slate-300">
                  <CalendarDays size={13} />
                  Joined {joinDate}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Account details */}
        <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#10111b] shadow-xl shadow-black/20">
          <div className="border-b border-white/[0.07] px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-white sm:text-base">
                  My Profile Info
                </h2>
                <p className="mt-1 text-[11px] text-slate-500">
                  Your registered account details
                </p>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6">
            {details.map((detail) => (
              <DetailRow key={detail.label} {...detail} />
            ))}
          </div>
        </section>

        {/* Wallet address */}
        <section className="mt-5 overflow-hidden rounded-3xl border border-cyan-300/15 bg-gradient-to-br from-[#10252e] via-[#101520] to-[#10111b] p-4 shadow-xl shadow-black/20 sm:mt-6 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300">
              <Wallet size={20} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-cyan-300">
                Wallet information
              </p>
              <h2 className="mt-1 text-sm font-extrabold text-white sm:text-base">
                Wallet Address (BEP20)
              </h2>

              <p className="mt-3 break-all rounded-xl border border-white/[0.07] bg-black/20 p-3 font-mono text-xs leading-6 text-slate-300 sm:text-sm">
                {user.walletAddress || "Not Provided"}
              </p>

              {user.walletAddress && (
                <button
                  type="button"
                  onClick={handleCopyWallet}
                  className="mt-3 inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-2 text-xs font-bold text-cyan-200 transition hover:bg-cyan-300/[0.12]"
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? "Copied" : "Copy wallet address"}
                </button>
              )}
            </div>
          </div>
        </section>

        <p className="mt-5 text-center text-[10px] font-medium tracking-wide text-slate-600">
          Zoro Games AI · Your account, at a glance
        </p>
      </div>
    </main>
  );
}

export default UserProfile;
