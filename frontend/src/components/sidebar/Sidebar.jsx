 




// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import api from "../../api/axios";
// // // // // // import { useNavigate, useLocation, Link } from "react-router-dom"; 
// // // // // // import { 
// // // // // //   Home, Wallet, Banknote, Activity, History, Users, UserCircle2, 
// // // // // //   HelpCircle, BadgeDollarSign, BarChart, Zap, Coins, LogOut, Box, Layers, Trophy 
// // // // // // } from "lucide-react";
// // // // // // import { useAuth } from "../../context/AuthContext";

// // // // // // const SidebarItem = ({ label, icon: Icon, active, onClick, badge, path }) => {
// // // // // //   const content = (
// // // // // //     <>
// // // // // //       <Icon size={18} className={`transition-colors duration-300 ${active ? "text-[#eab308]" : "text-gray-400 group-hover:text-[#eab308]"}`} />
// // // // // //       <span className="font-semibold tracking-wide whitespace-nowrap">{label}</span>
      
// // // // // //       {badge > 0 && (
// // // // // //         <span className="absolute top-1/2 -translate-y-1/2 right-3 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-md font-bold">
// // // // // //           {badge}
// // // // // //         </span>
// // // // // //       )}
// // // // // //     </>
// // // // // //   );

// // // // // //   // 🔥 UPDATE: Dark Theme styling with Gold Accents & Rounded UI
// // // // // //   const className = `group relative flex items-center gap-3 px-4 py-3 mx-3 my-1 cursor-pointer font-medium text-sm transition-all duration-300 rounded-xl ${
// // // // // //     active 
// // // // // //       ? "bg-[#eab308]/10 text-[#eab308] shadow-[inset_4px_0_0_0_#eab308]" 
// // // // // //       : "text-gray-400 hover:text-white hover:bg-white/5"
// // // // // //   }`;

// // // // // //   if (path && path !== "#") {
// // // // // //     return <Link to={path} onClick={onClick} className={className}>{content}</Link>;
// // // // // //   }
// // // // // //   return <div onClick={onClick} className={className}>{content}</div>;
// // // // // // };

// // // // // // const Sidebar = ({ user, isOpen, setIsOpen }) => { 
// // // // // //   const location = useLocation();
// // // // // //   const [notifCount, setNotifCount] = useState(0);
// // // // // //   const { logout } = useAuth();
// // // // // //   const navigate = useNavigate();

// // // // // //   useEffect(() => {
// // // // // //     const fetchNotifCount = async () => {
// // // // // //       if (!user?.userId) return;
// // // // // //       try {
// // // // // //         const res = await api.get(`/admin/notifications/count/${user.userId}?t=${new Date().getTime()}`);
// // // // // //         setNotifCount(res.data.count || 0);
// // // // // //       } catch (err) {
// // // // // //         console.log("Notification error", err);
// // // // // //       }
// // // // // //     };
// // // // // //     fetchNotifCount();
// // // // // //     const interval = setInterval(fetchNotifCount, 15000);
// // // // // //     return () => clearInterval(interval);
// // // // // //   }, [user?.userId]);

// // // // // //   useEffect(() => {
// // // // // //     if (window.innerWidth < 1024) {
// // // // // //       document.body.style.overflow = isOpen ? "hidden" : "auto";
// // // // // //     }
// // // // // //   }, [isOpen]);

// // // // // //   const handleLogout = () => {
// // // // // //     logout();
// // // // // //     navigate("/login");
// // // // // //   };

// // // // // //   // 🔥 UPDATE: Grouped Menu Items for a cleaner professional look
// // // // // //   const menuGroups = [
// // // // // //     {
// // // // // //       title: "Main Menu",
// // // // // //       items: [
// // // // // //         { label: "Dashboard", icon: Home, path: "/dashboard" },
// // // // // //         { label: "System Live Feed", icon: Activity, path: "/system-live-feed" },
// // // // // //         { label: "Live Trading", icon: Activity, path: "/user/trading" }, 
// // // // // //         { label: "My Profile", icon: UserCircle2, path: "/profile" },
// // // // // //         { label: "Package Details", icon: Zap, path: "/topup-details" },
// // // // // //         { label: "My Packages", icon: Box, path: "/my-packages" },
// // // // // //       ]
// // // // // //     },
// // // // // //     {
// // // // // //       title: "Network & History",
// // // // // //       items: [
// // // // // //         { label: "Deposit History", icon: History, path: "/deposit-history" },
// // // // // //         { label: "Direct Team", icon: Users, path: "/direct-team" },
// // // // // //         { label: "Level Team", icon: Users, path: "/all-team" },
// // // // // //         { label: "Team Business", icon: Layers, path: "/downline-business" },
// // // // // //         // ✅ Naya Salary Achievers ka link add kiya yahan
// // // // // //         { label: "Salary Achievers", icon: Trophy, path: "/salary-achievers" },
// // // // // //       ]
// // // // // //     },
// // // // // //     {
// // // // // //       title: "Income Reports",
// // // // // //       items: [
// // // // // //         { label: "Daily ROI Income", icon: BarChart, path: "/roi-income" },
// // // // // //         { label: "Direct Income", icon: BadgeDollarSign, path: "/direct-income" },
// // // // // //         { label: "Daily Level Income", icon: Coins, path: "/level-income" },
// // // // // //       ]
// // // // // //     },
// // // // // //     {
// // // // // //       title: "Financials & Support",
// // // // // //       items: [
// // // // // //         { label: "Wallet History", icon: Wallet, path: "/wallet-history" },
// // // // // //         { label: "Withdrawals", icon: Banknote, path: "/withdrawals" },
// // // // // //         { label: "Support and Raise Ticket", icon: HelpCircle, path: "/support" },
// // // // // //       ]
// // // // // //     }
// // // // // //   ];

// // // // // //   return (
// // // // // //     <>
// // // // // //       {/* Background Overlay for Mobile */}
// // // // // //       {isOpen && (
// // // // // //         <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden" />
// // // // // //       )}

// // // // // //       {/* Sidebar Container */}
// // // // // //       <aside className={`fixed top-16 md:top-16 right-0 h-[calc(100vh-4rem)] z-[60] bg-[#131c31] border-l border-gray-800 overflow-hidden transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${
// // // // // //         isOpen ? "translate-x-0 w-64" : "translate-x-full w-0 lg:w-64 lg:translate-x-0"
// // // // // //       }`}>
        
// // // // // //         {/* Scrollable Menu Section */}
// // // // // //         <div className="flex-1 overflow-y-auto custom-scroll py-4">
// // // // // //           <style>{`
// // // // // //             .custom-scroll::-webkit-scrollbar { width: 4px; }
// // // // // //             .custom-scroll::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; }
// // // // // //             .custom-scroll::-webkit-scrollbar-thumb:hover { background: #eab308; }
// // // // // //           `}</style>
          
// // // // // //           <nav className="flex flex-col gap-6">
// // // // // //             {menuGroups.map((group, groupIndex) => (
// // // // // //               <div key={groupIndex}>
// // // // // //                 {/* Group Title */}
// // // // // //                 <h3 className="px-6 mb-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
// // // // // //                   {group.title}
// // // // // //                 </h3>
                
// // // // // //                 {/* Group Items */}
// // // // // //                 <div className="space-y-0.5">
// // // // // //                   {group.items.map((item, index) => (
// // // // // //                     <SidebarItem
// // // // // //                       key={index} 
// // // // // //                       label={item.label} 
// // // // // //                       icon={item.icon} 
// // // // // //                       badge={item.badge} 
// // // // // //                       path={item.path} 
// // // // // //                       active={location.pathname === item.path}
// // // // // //                       onClick={() => {
// // // // // //                         if (item.onClick) item.onClick();
// // // // // //                         if (window.innerWidth < 1024) setIsOpen(false); 
// // // // // //                       }}
// // // // // //                     />
// // // // // //                   ))}
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </nav>
// // // // // //         </div>

// // // // // //         {/* 🔥 Sticky Logout Button at Bottom */}
// // // // // //         <div className="p-4 border-t border-gray-800 bg-[#0b1221]">
// // // // // //           <button 
// // // // // //             onClick={handleLogout}
// // // // // //             className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20"
// // // // // //           >
// // // // // //             <LogOut size={18} />
// // // // // //             <span>Logout Account</span>
// // // // // //           </button>
// // // // // //         </div>
        
// // // // // //       </aside>
// // // // // //     </>
// // // // // //   );
// // // // // // };

// // // // // // export default Sidebar;


// // // // // import React, { useState, useEffect } from "react";
// // // // // import api from "../../api/axios";
// // // // // import { useNavigate, useLocation, Link } from "react-router-dom"; 
// // // // // import { 
// // // // //   Home, Wallet, Banknote, Activity, History, Users, UserCircle2, 
// // // // //   HelpCircle, BadgeDollarSign, BarChart, Zap, Coins, LogOut, Box, Layers, Trophy, Gift 
// // // // // } from "lucide-react";
// // // // // import { useAuth } from "../../context/AuthContext";

// // // // // const SidebarItem = ({ label, icon: Icon, active, onClick, badge, path }) => {
// // // // //   const content = (
// // // // //     <>
// // // // //       <Icon size={18} className={`transition-colors duration-300 ${active ? "text-[#eab308]" : "text-gray-400 group-hover:text-[#eab308]"}`} />
// // // // //       <span className="font-semibold tracking-wide whitespace-nowrap">{label}</span>
      
// // // // //       {badge > 0 && (
// // // // //         <span className="absolute top-1/2 -translate-y-1/2 right-3 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-md font-bold">
// // // // //           {badge}
// // // // //         </span>
// // // // //       )}
// // // // //     </>
// // // // //   );

// // // // //   // 🔥 UPDATE: Dark Theme styling with Gold Accents & Rounded UI
// // // // //   const className = `group relative flex items-center gap-3 px-4 py-3 mx-3 my-1 cursor-pointer font-medium text-sm transition-all duration-300 rounded-xl ${
// // // // //     active 
// // // // //       ? "bg-[#eab308]/10 text-[#eab308] shadow-[inset_4px_0_0_0_#eab308]" 
// // // // //       : "text-gray-400 hover:text-white hover:bg-white/5"
// // // // //   }`;

// // // // //   if (path && path !== "#") {
// // // // //     return <Link to={path} onClick={onClick} className={className}>{content}</Link>;
// // // // //   }
// // // // //   return <div onClick={onClick} className={className}>{content}</div>;
// // // // // };

// // // // // const Sidebar = ({ user, isOpen, setIsOpen }) => { 
// // // // //   const location = useLocation();
// // // // //   const [notifCount, setNotifCount] = useState(0);
// // // // //   const { logout } = useAuth();
// // // // //   const navigate = useNavigate();

// // // // //   useEffect(() => {
// // // // //     const fetchNotifCount = async () => {
// // // // //       if (!user?.userId) return;
// // // // //       try {
// // // // //         const res = await api.get(`/admin/notifications/count/${user.userId}?t=${new Date().getTime()}`);
// // // // //         setNotifCount(res.data.count || 0);
// // // // //       } catch (err) {
// // // // //         console.log("Notification error", err);
// // // // //       }
// // // // //     };
// // // // //     fetchNotifCount();
// // // // //     const interval = setInterval(fetchNotifCount, 15000);
// // // // //     return () => clearInterval(interval);
// // // // //   }, [user?.userId]);

// // // // //   useEffect(() => {
// // // // //     if (window.innerWidth < 1024) {
// // // // //       document.body.style.overflow = isOpen ? "hidden" : "auto";
// // // // //     }
// // // // //   }, [isOpen]);

// // // // //   const handleLogout = () => {
// // // // //     logout();
// // // // //     navigate("/login");
// // // // //   };

// // // // //   // 🔥 UPDATE: Grouped Menu Items for a cleaner professional look
// // // // //   const menuGroups = [
// // // // //     {
// // // // //       title: "Main Menu",
// // // // //       items: [
// // // // //         { label: "Dashboard", icon: Home, path: "/dashboard" },
// // // // //         { label: "System Live Feed", icon: Activity, path: "/system-live-feed" },
// // // // //         { label: "Live Trading", icon: Activity, path: "/user/trading" }, 
// // // // //         { label: "My Profile", icon: UserCircle2, path: "/profile" },
// // // // //         { label: "Package Details", icon: Zap, path: "/topup-details" },
// // // // //         { label: "My Packages", icon: Box, path: "/my-packages" },
// // // // //         { label: "Compound Packages", icon: Layers, path: "/my-compound-packages" },
// // // // //       ]
// // // // //     },
// // // // //     {
// // // // //       title: "Network & History",
// // // // //       items: [
// // // // //         { label: "Deposit History", icon: History, path: "/deposit-history" },
// // // // //         { label: "Direct Team", icon: Users, path: "/direct-team" },
// // // // //         { label: "Level Team", icon: Users, path: "/all-team" },
// // // // //         { label: "Team Business", icon: Layers, path: "/downline-business" },
// // // // //         { label: "Salary Achievers", icon: Trophy, path: "/salary-achievers" },
// // // // //         // 👇 NAYA ADD KIYA: Lucky Winners 👇
// // // // //         { label: "Lucky Winners", icon: Gift, path: "/lucky-winners" },
// // // // //       ]
// // // // //     },
// // // // //     {
// // // // //       title: "Income Reports",
// // // // //       items: [
// // // // //         { label: "Daily ROI Income", icon: BarChart, path: "/roi-income" },
// // // // //         { label: "Direct Income", icon: BadgeDollarSign, path: "/direct-income" },
// // // // //         { label: "Daily Level Income", icon: Coins, path: "/level-income" },
// // // // //       ]
// // // // //     },
// // // // //     {
// // // // //       title: "Financials & Support",
// // // // //       items: [
// // // // //         { label: "Wallet History", icon: Wallet, path: "/wallet-history" },
// // // // //         { label: "Withdrawals", icon: Banknote, path: "/withdrawals" },
// // // // //         { label: "Support and Raise Ticket", icon: HelpCircle, path: "/support" },
// // // // //       ]
// // // // //     }
// // // // //   ];

// // // // //   return (
// // // // //     <>
// // // // //       {/* Background Overlay for Mobile */}
// // // // //       {isOpen && (
// // // // //         <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden" />
// // // // //       )}

// // // // //       {/* Sidebar Container */}
// // // // //       <aside className={`fixed top-16 md:top-16 right-0 h-[calc(100vh-4rem)] z-[60] bg-[#131c31] border-l border-gray-800 overflow-hidden transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${
// // // // //         isOpen ? "translate-x-0 w-64" : "translate-x-full w-0 lg:w-64 lg:translate-x-0"
// // // // //       }`}>
        
// // // // //         {/* Scrollable Menu Section */}
// // // // //         <div className="flex-1 overflow-y-auto custom-scroll py-4">
// // // // //           <style>{`
// // // // //             .custom-scroll::-webkit-scrollbar { width: 4px; }
// // // // //             .custom-scroll::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; }
// // // // //             .custom-scroll::-webkit-scrollbar-thumb:hover { background: #eab308; }
// // // // //           `}</style>
          
// // // // //           <nav className="flex flex-col gap-6">
// // // // //             {menuGroups.map((group, groupIndex) => (
// // // // //               <div key={groupIndex}>
// // // // //                 {/* Group Title */}
// // // // //                 <h3 className="px-6 mb-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
// // // // //                   {group.title}
// // // // //                 </h3>
                
// // // // //                 {/* Group Items */}
// // // // //                 <div className="space-y-0.5">
// // // // //                   {group.items.map((item, index) => (
// // // // //                     <SidebarItem
// // // // //                       key={index} 
// // // // //                       label={item.label} 
// // // // //                       icon={item.icon} 
// // // // //                       badge={item.badge} 
// // // // //                       path={item.path} 
// // // // //                       active={location.pathname === item.path}
// // // // //                       onClick={() => {
// // // // //                         if (item.onClick) item.onClick();
// // // // //                         if (window.innerWidth < 1024) setIsOpen(false); 
// // // // //                       }}
// // // // //                     />
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))}
// // // // //           </nav>
// // // // //         </div>

// // // // //         {/* 🔥 Sticky Logout Button at Bottom */}
// // // // //         <div className="p-4 border-t border-gray-800 bg-[#0b1221]">
// // // // //           <button 
// // // // //             onClick={handleLogout}
// // // // //             className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20"
// // // // //           >
// // // // //             <LogOut size={18} />
// // // // //             <span>Logout Account</span>
// // // // //           </button>
// // // // //         </div>
        
// // // // //       </aside>
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // export default Sidebar;



// // // // import React, { useState, useEffect, useCallback } from "react";
// // // // import api from "../../api/axios";
// // // // import { useNavigate, useLocation, Link } from "react-router-dom";
// // // // import {
// // // //   Home,
// // // //   Wallet,
// // // //   Banknote,
// // // //   Activity,
// // // //   History,
// // // //   Users,
// // // //   UserCircle2,
// // // //   HelpCircle,
// // // //   BadgeDollarSign,
// // // //   BarChart3,
// // // //   Zap,
// // // //   Coins,
// // // //   LogOut,
// // // //   Box,
// // // //   Layers,
// // // //   Trophy,
// // // //   Gift,
// // // //   ChevronRight,
// // // //   Sparkles,
// // // //   Radio,
// // // //   ShieldCheck,
// // // // } from "lucide-react";
// // // // import { useAuth } from "../../context/AuthContext";

// // // // const MENU_GROUPS = [
// // // //   {
// // // //     title: "Overview",
// // // //     items: [
// // // //       { label: "Dashboard", icon: Home, path: "/dashboard" },
// // // //       { label: "System Live Feed", icon: Radio, path: "/system-live-feed" },
// // // //       { label: "Live Trading", icon: Activity, path: "/user/trading" },
// // // //     ],
// // // //   },
// // // //   {
// // // //     title: "My Account",
// // // //     items: [
// // // //       { label: "My Profile", icon: UserCircle2, path: "/profile" },
// // // //       { label: "Package Details", icon: Zap, path: "/topup-details" },
// // // //       { label: "My Packages", icon: Box, path: "/my-packages" },
// // // //       {
// // // //         label: "Compound Packages",
// // // //         icon: Layers,
// // // //         path: "/my-compound-packages",
// // // //       },
// // // //     ],
// // // //   },
// // // //   {
// // // //     title: "Network & Community",
// // // //     items: [
// // // //       { label: "Deposit History", icon: History, path: "/deposit-history" },
// // // //       { label: "Direct Team", icon: Users, path: "/direct-team" },
// // // //       { label: "Level Team", icon: Users, path: "/all-team" },
// // // //       { label: "Team Business", icon: Layers, path: "/downline-business" },
// // // //      ],
// // // //   },
// // // //   {
// // // //     title: "Income & Reports",
// // // //     items: [
// // // //       { label: "Daily ROI Income", icon: BarChart3, path: "/roi-income" },
// // // //       {
// // // //         label: "Direct Income",
// // // //         icon: BadgeDollarSign,
// // // //         path: "/direct-income",
// // // //       },
// // // //       {
// // // //         label: "Daily Level Income",
// // // //         icon: Coins,
// // // //         path: "/level-income",
// // // //       },
// // // //     ],
// // // //   },
// // // //   {
// // // //     title: "Wallet & Support",
// // // //     items: [
// // // //       { label: "Wallet History", icon: Wallet, path: "/wallet-history" },
// // // //       { label: "Withdrawals", icon: Banknote, path: "/withdrawals" },
// // // //       {
// // // //         label: "Support & Raise Ticket",
// // // //         icon: HelpCircle,
// // // //         path: "/support",
// // // //         notification: true,
// // // //       },
// // // //     ],
// // // //   },
// // // // ];

// // // // const SidebarItem = ({
// // // //   item,
// // // //   active,
// // // //   badge,
// // // //   onNavigate,
// // // // }) => {
// // // //   const Icon = item.icon;

// // // //   return (
// // // //     <Link
// // // //       to={item.path}
// // // //       onClick={onNavigate}
// // // //       aria-current={active ? "page" : undefined}
// // // //       className={`zoro-menu-item group ${
// // // //         active ? "zoro-menu-active" : ""
// // // //       }`}
// // // //     >
// // // //       <span className="zoro-menu-icon">
// // // //         <Icon size={18} strokeWidth={active ? 2.3 : 1.8} />
// // // //       </span>

// // // //       <span className="min-w-0 flex-1 truncate">
// // // //         {item.label}
// // // //       </span>

// // // //       {badge > 0 && (
// // // //         <span
// // // //           className="zoro-notification"
// // // //           aria-label={`${badge} notifications`}
// // // //         >
// // // //           {badge > 99 ? "99+" : badge}
// // // //         </span>
// // // //       )}

// // // //       <ChevronRight
// // // //         size={15}
// // // //         className={`zoro-menu-arrow ${
// // // //           active ? "opacity-100" : ""
// // // //         }`}
// // // //       />
// // // //     </Link>
// // // //   );
// // // // };

// // // // const Sidebar = ({ user, isOpen, setIsOpen }) => {
// // // //   const location = useLocation();
// // // //   const navigate = useNavigate();
// // // //   const { logout } = useAuth();

// // // //   // Parent setter missing ho to bhi component crash nahi karega.
// // // //   const [internalOpen, setInternalOpen] = useState(false);
// // // //   const hasExternalSetter = typeof setIsOpen === "function";

// // // //   const sidebarOpen = hasExternalSetter
// // // //     ? Boolean(isOpen)
// // // //     : internalOpen;

// // // //   const updateSidebar = useCallback(
// // // //     (nextValue) => {
// // // //       if (hasExternalSetter) {
// // // //         setIsOpen(nextValue);
// // // //       } else {
// // // //         setInternalOpen(nextValue);
// // // //       }
// // // //     },
// // // //     [hasExternalSetter, setIsOpen]
// // // //   );

// // // //   const [notifCount, setNotifCount] = useState(0);

// // // //   // Support notification count.
// // // //   useEffect(() => {
// // // //     let cancelled = false;

// // // //     const fetchNotifCount = async () => {
// // // //       if (!user?.userId) {
// // // //         setNotifCount(0);
// // // //         return;
// // // //       }

// // // //       try {
// // // //         const response = await api.get(
// // // //           `/admin/notifications/count/${encodeURIComponent(
// // // //             user.userId
// // // //           )}`
// // // //         );

// // // //         if (!cancelled) {
// // // //           setNotifCount(Number(response.data?.count) || 0);
// // // //         }
// // // //       } catch (error) {
// // // //         if (!cancelled) {
// // // //           console.error("Notification count error:", error);
// // // //         }
// // // //       }
// // // //     };

// // // //     fetchNotifCount();

// // // //     const intervalId = window.setInterval(fetchNotifCount, 15000);

// // // //     return () => {
// // // //       cancelled = true;
// // // //       window.clearInterval(intervalId);
// // // //     };
// // // //   }, [user?.userId]);

// // // //   // Mobile par sidebar open hone par background scroll rokna.
// // // //   useEffect(() => {
// // // //     if (typeof window === "undefined") return;

// // // //     const isMobile = window.innerWidth < 1024;

// // // //     if (!isMobile) {
// // // //       document.body.style.overflow = "";
// // // //       return;
// // // //     }

// // // //     const previousOverflow = document.body.style.overflow;

// // // //     document.body.style.overflow = sidebarOpen ? "hidden" : "";

// // // //     return () => {
// // // //       document.body.style.overflow = previousOverflow;
// // // //     };
// // // //   }, [sidebarOpen]);

// // // //   // Route change par mobile sidebar close karo.
// // // //   useEffect(() => {
// // // //     if (window.innerWidth < 1024) {
// // // //       updateSidebar(false);
// // // //     }
// // // //   }, [location.pathname, updateSidebar]);

// // // //   const handleLogout = async () => {
// // // //     try {
// // // //       await logout();
// // // //     } catch (error) {
// // // //       console.error("Logout error:", error);
// // // //     } finally {
// // // //       updateSidebar(false);
// // // //       navigate("/login", { replace: true });
// // // //     }
// // // //   };

// // // //   const isItemActive = (path) => {
// // // //     if (location.pathname === path) return true;

// // // //     if (path === "/dashboard") return false;

// // // //     return location.pathname.startsWith(`${path}/`);
// // // //   };

// // // //   const closeOnMobile = () => {
// // // //     if (window.innerWidth < 1024) {
// // // //       updateSidebar(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <>
// // // //       <style>{`
// // // //         .zoro-sidebar {
// // // //           background:
// // // //             radial-gradient(ellipse at 15% 0%, rgba(124, 58, 237, .13), transparent 36%),
// // // //             radial-gradient(ellipse at 100% 60%, rgba(6, 182, 212, .07), transparent 35%),
// // // //             #090d18;
// // // //           border-left: 1px solid rgba(148, 163, 184, .13);
// // // //           box-shadow: -16px 0 55px rgba(0, 0, 0, .28);
// // // //         }

// // // //         .zoro-sidebar-scroll {
// // // //           scrollbar-width: thin;
// // // //           scrollbar-color: #30394e transparent;
// // // //         }

// // // //         .zoro-sidebar-scroll::-webkit-scrollbar {
// // // //           width: 4px;
// // // //         }

// // // //         .zoro-sidebar-scroll::-webkit-scrollbar-thumb {
// // // //           background: #30394e;
// // // //           border-radius: 20px;
// // // //         }

// // // //         .zoro-menu-item {
// // // //           position: relative;
// // // //           display: flex;
// // // //           align-items: center;
// // // //           gap: 12px;
// // // //           min-height: 45px;
// // // //           margin: 3px 12px;
// // // //           padding: 10px 12px;
// // // //           border: 1px solid transparent;
// // // //           border-radius: 12px;
// // // //           color: #8d99ae;
// // // //           font-size: 12px;
// // // //           font-weight: 600;
// // // //           letter-spacing: .015em;
// // // //           transition:
// // // //             color .22s ease,
// // // //             background .22s ease,
// // // //             border-color .22s ease,
// // // //             transform .22s ease;
// // // //         }

// // // //         .zoro-menu-item:hover {
// // // //           color: #f1f5f9;
// // // //           background: rgba(148, 163, 184, .07);
// // // //           border-color: rgba(148, 163, 184, .09);
// // // //           transform: translateX(-2px);
// // // //         }

// // // //         .zoro-menu-icon {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           justify-content: center;
// // // //           width: 32px;
// // // //           height: 32px;
// // // //           flex-shrink: 0;
// // // //           border-radius: 10px;
// // // //           background: rgba(148, 163, 184, .055);
// // // //           color: #8795ad;
// // // //           transition: all .22s ease;
// // // //         }

// // // //         .zoro-menu-item:hover .zoro-menu-icon {
// // // //           color: #67e8f9;
// // // //           background: rgba(6, 182, 212, .10);
// // // //         }

// // // //         .zoro-menu-active {
// // // //           color: #f8fafc;
// // // //           border-color: rgba(34, 211, 238, .20);
// // // //           background: linear-gradient(
// // // //             100deg,
// // // //             rgba(124, 58, 237, .19),
// // // //             rgba(6, 182, 212, .10)
// // // //           );
// // // //           box-shadow: inset 3px 0 0 #22d3ee;
// // // //         }

// // // //         .zoro-menu-active .zoro-menu-icon {
// // // //           color: #67e8f9;
// // // //           background: rgba(6, 182, 212, .13);
// // // //           box-shadow: 0 0 18px rgba(6, 182, 212, .08);
// // // //         }

// // // //         .zoro-menu-arrow {
// // // //           flex-shrink: 0;
// // // //           color: #64748b;
// // // //           opacity: 0;
// // // //           transition: opacity .2s ease, transform .2s ease;
// // // //         }

// // // //         .zoro-menu-item:hover .zoro-menu-arrow {
// // // //           opacity: .75;
// // // //         }

// // // //         .zoro-menu-active .zoro-menu-arrow {
// // // //           color: #67e8f9;
// // // //         }

// // // //         .zoro-notification {
// // // //           display: inline-flex;
// // // //           align-items: center;
// // // //           justify-content: center;
// // // //           min-width: 20px;
// // // //           height: 20px;
// // // //           padding: 0 5px;
// // // //           border-radius: 999px;
// // // //           background: #ef4444;
// // // //           color: white;
// // // //           font-size: 10px;
// // // //           font-weight: 800;
// // // //           box-shadow: 0 0 12px rgba(239, 68, 68, .2);
// // // //         }

// // // //         .zoro-sidebar-enter {
// // // //           animation: zoroSidebarEnter .28s ease both;
// // // //         }

// // // //         @keyframes zoroSidebarEnter {
// // // //           from { opacity: 0; transform: translateY(7px); }
// // // //           to { opacity: 1; transform: translateY(0); }
// // // //         }

// // // //         .zoro-brand-glow {
// // // //           box-shadow:
// // // //             0 0 20px rgba(124, 58, 237, .18),
// // // //             inset 0 0 12px rgba(6, 182, 212, .08);
// // // //         }

// // // //         @media (prefers-reduced-motion: reduce) {
// // // //           .zoro-sidebar *,
// // // //           .zoro-sidebar-enter {
// // // //             animation: none !important;
// // // //             transition: none !important;
// // // //           }
// // // //         }
// // // //       `}</style>

// // // //       {/* Mobile overlay */}
// // // //       <div
// // // //         onClick={() => updateSidebar(false)}
// // // //         className={`fixed inset-0 z-[55] bg-black/65 backdrop-blur-[3px] transition-opacity duration-300 lg:hidden ${
// // // //           sidebarOpen
// // // //             ? "visible opacity-100"
// // // //             : "invisible pointer-events-none opacity-0"
// // // //         }`}
// // // //         aria-hidden="true"
// // // //       />

// // // //       {/* Main sidebar */}
// // // //       <aside
// // // //         aria-label="Main navigation"
// // // //         className={`zoro-sidebar fixed right-0 top-16 z-[60] flex h-[calc(100dvh-4rem)] w-[280px] max-w-[88vw] flex-col overflow-hidden transition-transform duration-300 ease-out lg:top-[76px] lg:h-[calc(100dvh-76px)] lg:w-[270px] ${
// // // //           sidebarOpen
// // // //             ? "translate-x-0"
// // // //             : "translate-x-full lg:translate-x-0"
// // // //         }`}
// // // //       >
// // // //         {/* Brand panel */}
// // // //         <div className="border-b border-white/[0.07] px-5 py-5">
// // // //           <div className="flex items-center gap-3">
// // // //             <div className="zoro-brand-glow flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-violet-600/25 to-cyan-500/15 text-cyan-300">
// // // //               <Sparkles size={22} strokeWidth={1.8} />
// // // //             </div>

// // // //             <div className="min-w-0">
// // // //               <div className="truncate text-[14px] font-black tracking-[.13em] text-white">
// // // //                 ZORO <span className="text-cyan-300">GAMES</span>
// // // //               </div>
// // // //               <div className="mt-1 text-[9px] font-bold uppercase tracking-[.24em] text-slate-500">
// // // //                 AI Gaming Ecosystem
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5">
// // // //             <div className="flex items-center gap-2">
// // // //               <span className="relative flex h-2 w-2">
// // // //                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
// // // //                 <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
// // // //               </span>
// // // //               <span className="text-[10px] font-semibold tracking-wide text-slate-400">
// // // //                 Platform Navigation
// // // //               </span>
// // // //             </div>
// // // //             <ShieldCheck size={15} className="text-cyan-400" />
// // // //           </div>
// // // //         </div>

// // // //         {/* Menu */}
// // // //         <div className="zoro-sidebar-scroll flex-1 overflow-y-auto py-4">
// // // //           <nav className="zoro-sidebar-enter flex flex-col gap-5">
// // // //             {MENU_GROUPS.map((group) => (
// // // //               <section key={group.title}>
// // // //                 <div className="mb-2 flex items-center gap-2 px-5">
// // // //                   <span className="h-1 w-1 rounded-full bg-cyan-400" />
// // // //                   <h3 className="text-[9px] font-extrabold uppercase tracking-[.22em] text-slate-500">
// // // //                     {group.title}
// // // //                   </h3>
// // // //                   <span className="h-px flex-1 bg-white/[0.055]" />
// // // //                 </div>

// // // //                 <div>
// // // //                   {group.items.map((item) => (
// // // //                     <SidebarItem
// // // //                       key={item.path}
// // // //                       item={item}
// // // //                       active={isItemActive(item.path)}
// // // //                       badge={item.notification ? notifCount : 0}
// // // //                       onNavigate={closeOnMobile}
// // // //                     />
// // // //                   ))}
// // // //                 </div>
// // // //               </section>
// // // //             ))}
// // // //           </nav>
// // // //         </div>

// // // //         {/* Footer */}
// // // //         <div className="border-t border-white/[0.08] bg-[#080b14]/90 p-4">
// // // //           <div className="mb-3 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-3">
// // // //             <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
// // // //               <UserCircle2 size={19} />
// // // //             </div>

// // // //             <div className="min-w-0 flex-1">
// // // //               <p className="truncate text-xs font-bold text-slate-200">
// // // //                 {user?.name || user?.username || "Welcome"}
// // // //               </p>
// // // //               <p className="mt-1 truncate text-[10px] text-slate-500">
// // // //                 {user?.userId ? `ID: ${user.userId}` : "Member Account"}
// // // //               </p>
// // // //             </div>
// // // //           </div>

// // // //           <button
// // // //             type="button"
// // // //             onClick={handleLogout}
// // // //             className="group flex w-full items-center justify-center gap-2.5 rounded-xl border border-rose-500/15 bg-rose-500/[0.07] px-4 py-3 text-xs font-bold tracking-wide text-rose-300 transition-all duration-200 hover:border-rose-400/40 hover:bg-rose-500/15 hover:text-rose-200"
// // // //           >
// // // //             <LogOut
// // // //               size={17}
// // // //               className="transition-transform duration-200 group-hover:-translate-x-0.5"
// // // //             />
// // // //             Logout Account
// // // //           </button>

// // // //           <p className="mt-3 text-center text-[9px] tracking-[.13em] text-slate-600">
// // // //             ZORO GAMES AI
// // // //           </p>
// // // //         </div>
// // // //       </aside>
// // // //     </>
// // // //   );
// // // // };

// // // // export default Sidebar;



// // // /__codex_browser_temporary_files__/9e6aec80-d523-4b7a-921e-5751215fe637/Sidebar.NexusGaming.jsx


// // import React, { useState, useEffect, useCallback } from "react";
// // import api from "../../api/axios";
// // import { useNavigate, useLocation, Link } from "react-router-dom";
// // import {
// //   Home,
// //   Wallet,
// //   Banknote,
// //   Activity,
// //   History,
// //   Users,
// //   UserCircle2,
// //   HelpCircle,
// //   BadgeDollarSign,
// //   BarChart3,
// //   Zap,
// //   Coins,
// //   LogOut,
// //   Box,
// //   Layers,
// //   ChevronRight,
// //   Sparkles,
// //   Radio,
// //   ShieldCheck,
// //   X,
// //   Menu,
// //   Gauge,
// //   CircleDot,
// // } from "lucide-react";
// // import { useAuth } from "../../context/AuthContext";

// // const MENU_GROUPS = [
// //   {
// //     title: "Command Center",
// //     code: "01",
// //     items: [
// //       { label: "Dashboard", icon: Home, path: "/dashboard" },
// //       { label: "System Live Feed", icon: Radio, path: "/system-live-feed" },
// //       { label: "Live Trading", icon: Activity, path: "/user/trading" },
// //     ],
// //   },
// //   {
// //     title: "Player Account",
// //     code: "02",
// //     items: [
// //       { label: "My Profile", icon: UserCircle2, path: "/profile" },
// //       { label: "Package Details", icon: Zap, path: "/topup-details" },
// //       { label: "My Packages", icon: Box, path: "/my-packages" },
// //       { label: "Compound Packages", icon: Layers, path: "/my-compound-packages" },
// //     ],
// //   },
// //   {
// //     title: "Network Matrix",
// //     code: "03",
// //     items: [
// //       { label: "Deposit History", icon: History, path: "/deposit-history" },
// //       { label: "Direct Team", icon: Users, path: "/direct-team" },
// //       { label: "Level Team", icon: Users, path: "/all-team" },
// //       { label: "Team Business", icon: Layers, path: "/downline-business" },
// //     ],
// //   },
// //   {
// //     title: "Income Intelligence",
// //     code: "04",
// //     items: [
// //       { label: "Daily ROI Income", icon: BarChart3, path: "/roi-income" },
// //       { label: "Direct Income", icon: BadgeDollarSign, path: "/direct-income" },
// //       { label: "Daily Level Income", icon: Coins, path: "/level-income" },
// //     ],
// //   },
// //   {
// //     title: "Wallet & Assistance",
// //     code: "05",
// //     items: [
// //       { label: "Wallet History", icon: Wallet, path: "/wallet-history" },
// //       { label: "Withdrawals", icon: Banknote, path: "/withdrawals" },
// //       { label: "Support & Raise Ticket", icon: HelpCircle, path: "/support", notification: true },
// //     ],
// //   },
// // ];

// // const SidebarItem = ({ item, active, badge, onNavigate }) => {
// //   const Icon = item.icon;

// //   return (
// //     <Link
// //       to={item.path}
// //       onClick={onNavigate}
// //       aria-current={active ? "page" : undefined}
// //       className={`nexus-nav-item group ${active ? "nexus-nav-active" : ""}`}
// //     >
// //       <span className="nexus-nav-icon">
// //         <Icon size={17} strokeWidth={active ? 2.3 : 1.8} />
// //       </span>
// //       <span className="min-w-0 flex-1 truncate">{item.label}</span>
// //       {badge > 0 && (
// //         <span className="nexus-badge" aria-label={`${badge} notifications`}>
// //           {badge > 99 ? "99+" : badge}
// //         </span>
// //       )}
// //       <ChevronRight
// //         size={14}
// //         className={`nexus-nav-chevron ${active ? "nexus-chevron-active" : ""}`}
// //       />
// //     </Link>
// //   );
// // };

// // const Sidebar = ({ user, isOpen, setIsOpen }) => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { logout } = useAuth();
// //   const [internalOpen, setInternalOpen] = useState(false);
// //   const hasExternalSetter = typeof setIsOpen === "function";
// //   const sidebarOpen = hasExternalSetter ? Boolean(isOpen) : internalOpen;

// //   const updateSidebar = useCallback(
// //     (nextValue) => {
// //       if (hasExternalSetter) setIsOpen(nextValue);
// //       else setInternalOpen(nextValue);
// //     },
// //     [hasExternalSetter, setIsOpen]
// //   );

// //   const [notifCount, setNotifCount] = useState(0);

// //   useEffect(() => {
// //     let cancelled = false;

// //     const fetchNotifCount = async () => {
// //       if (!user?.userId) {
// //         setNotifCount(0);
// //         return;
// //       }

// //       try {
// //         const response = await api.get(
// //           `/admin/notifications/count/${encodeURIComponent(user.userId)}`
// //         );
// //         if (!cancelled) setNotifCount(Number(response.data?.count) || 0);
// //       } catch (error) {
// //         if (!cancelled) console.error("Notification count error:", error);
// //       }
// //     };

// //     fetchNotifCount();
// //     const intervalId = window.setInterval(fetchNotifCount, 15000);

// //     return () => {
// //       cancelled = true;
// //       window.clearInterval(intervalId);
// //     };
// //   }, [user?.userId]);

// //   useEffect(() => {
// //     if (typeof window === "undefined") return undefined;
// //     if (window.innerWidth >= 1024) {
// //       document.body.style.overflow = "";
// //       return undefined;
// //     }

// //     const previousOverflow = document.body.style.overflow;
// //     document.body.style.overflow = sidebarOpen ? "hidden" : "";
// //     return () => {
// //       document.body.style.overflow = previousOverflow;
// //     };
// //   }, [sidebarOpen]);

// //   useEffect(() => {
// //     if (typeof window !== "undefined" && window.innerWidth < 1024) {
// //       updateSidebar(false);
// //     }
// //   }, [location.pathname, updateSidebar]);

// //   const handleLogout = async () => {
// //     try {
// //       await logout();
// //     } catch (error) {
// //       console.error("Logout error:", error);
// //     } finally {
// //       updateSidebar(false);
// //       navigate("/login", { replace: true });
// //     }
// //   };

// //   const isItemActive = (path) => {
// //     if (location.pathname === path) return true;
// //     if (path === "/dashboard") return false;
// //     return location.pathname.startsWith(`${path}/`);
// //   };

// //   const closeOnMobile = () => {
// //     if (typeof window !== "undefined" && window.innerWidth < 1024) {
// //       updateSidebar(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <style>{`
// //         .nexus-sidebar {
// //           background:
// //             radial-gradient(ellipse at 0% 0%, rgba(124, 58, 237, .19), transparent 35%),
// //             radial-gradient(ellipse at 100% 35%, rgba(6, 182, 212, .10), transparent 32%),
// //             linear-gradient(180deg, #0b0e1b 0%, #080b13 54%, #090c16 100%);
// //           border-left: 1px solid rgba(148, 163, 184, .13);
// //           box-shadow: -22px 0 70px rgba(0, 0, 0, .42);
// //           isolation: isolate;
// //         }
// //         .nexus-sidebar::before {
// //           content: "";
// //           position: absolute;
// //           inset: 0 0 auto;
// //           height: 1px;
// //           background: linear-gradient(90deg, transparent, rgba(34,211,238,.55), rgba(168,85,247,.7), transparent);
// //           pointer-events: none;
// //         }
// //         .nexus-scroll { scrollbar-width: thin; scrollbar-color: #3a315f transparent; }
// //         .nexus-scroll::-webkit-scrollbar { width: 4px; }
// //         .nexus-scroll::-webkit-scrollbar-thumb { background: linear-gradient(#8b5cf6,#22d3ee); border-radius: 99px; }
// //         .nexus-nav-item {
// //           position: relative; isolation: isolate; display: flex; align-items: center; gap: 11px;
// //           min-height: 45px; margin: 3px 12px; padding: 7px 10px; border: 1px solid transparent;
// //           border-radius: 13px; color: #929bb0; font-size: 11.5px; font-weight: 650; letter-spacing: .015em;
// //           transition: color .22s ease, background .22s ease, border-color .22s ease, transform .22s ease;
// //         }
// //         .nexus-nav-item::before {
// //           content: ""; position: absolute; z-index: -1; inset: 0; border-radius: inherit;
// //           background: linear-gradient(105deg, rgba(124,58,237,.19), rgba(6,182,212,.08));
// //           opacity: 0; transition: opacity .22s ease;
// //         }
// //         .nexus-nav-item:hover { color: #f8fafc; border-color: rgba(148,163,184,.11); transform: translateX(-2px); }
// //         .nexus-nav-item:hover::before { opacity: 1; }
// //         .nexus-nav-icon {
// //           display: grid; place-items: center; width: 32px; height: 32px; flex-shrink: 0;
// //           border: 1px solid rgba(148,163,184,.07); border-radius: 10px;
// //           background: rgba(148,163,184,.045); color: #8490a8; transition: all .22s ease;
// //         }
// //         .nexus-nav-item:hover .nexus-nav-icon { color: #67e8f9; border-color: rgba(34,211,238,.17); background: rgba(6,182,212,.10); }
// //         .nexus-nav-active { color: #fff; border-color: rgba(139,92,246,.28); background: rgba(124,58,237,.09); box-shadow: inset 3px 0 0 #a78bfa, 0 5px 18px rgba(76,29,149,.08); }
// //         .nexus-nav-active::before { opacity: 1; }
// //         .nexus-nav-active .nexus-nav-icon { color: #a5f3fc; border-color: rgba(34,211,238,.24); background: linear-gradient(145deg, rgba(124,58,237,.22), rgba(6,182,212,.13)); box-shadow: 0 0 17px rgba(34,211,238,.07); }
// //         .nexus-nav-chevron { flex-shrink: 0; color: #5b667c; opacity: 0; transition: opacity .2s ease, transform .2s ease; }
// //         .nexus-nav-item:hover .nexus-nav-chevron { opacity: .8; transform: translateX(-2px); }
// //         .nexus-chevron-active { color: #67e8f9; opacity: 1; }
// //         .nexus-badge { display: inline-flex; align-items: center; justify-content: center; min-width: 20px; height: 20px; padding: 0 5px; border-radius: 7px; background: linear-gradient(135deg,#fb7185,#e11d48); color: #fff; font-size: 9px; font-weight: 900; box-shadow: 0 0 14px rgba(244,63,94,.25); animation: nexusBadgePulse 2.4s ease-in-out infinite; }
// //         .nexus-menu-reveal { animation: nexusReveal .36s cubic-bezier(.2,.75,.2,1) both; }
// //         .nexus-brand-mark { position: relative; overflow: hidden; box-shadow: 0 0 24px rgba(124,58,237,.23), inset 0 0 16px rgba(34,211,238,.09); }
// //         .nexus-brand-mark::after { content: ""; position: absolute; top: -80%; left: -60%; width: 40%; height: 260%; transform: rotate(28deg); background: linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent); animation: nexusShine 5s ease-in-out infinite; }
// //         .nexus-live-dot { box-shadow: 0 0 0 4px rgba(52,211,153,.08), 0 0 12px rgba(52,211,153,.55); }
// //         .nexus-footer-button { position: relative; overflow: hidden; }
// //         .nexus-footer-button::after { content: ""; position: absolute; inset: 0; background: linear-gradient(110deg,transparent,rgba(255,255,255,.06),transparent); transform: translateX(-120%); transition: transform .45s ease; }
// //         .nexus-footer-button:hover::after { transform: translateX(120%); }
// //         @keyframes nexusReveal { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
// //         @keyframes nexusShine { 0%, 65%, 100% { left: -60%; } 35% { left: 130%; } }
// //         @keyframes nexusBadgePulse { 0%,100% { box-shadow: 0 0 0 rgba(244,63,94,0); } 50% { box-shadow: 0 0 13px rgba(244,63,94,.28); } }
// //         @media (prefers-reduced-motion: reduce) {
// //           .nexus-sidebar *, .nexus-menu-reveal, .nexus-brand-mark::after, .nexus-badge { animation: none !important; transition: none !important; }
// //         }
// //       `}</style>

// //       <button
// //         type="button"
// //         onClick={() => updateSidebar(!sidebarOpen)}
// //         aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
// //         aria-expanded={sidebarOpen}
// //         className="fixed right-4 top-[76px] z-[70] flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/20 bg-[#111426]/95 text-cyan-200 shadow-lg shadow-black/20 backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-violet-500/10 lg:hidden"
// //       >
// //         {sidebarOpen ? <X size={19} /> : <Menu size={19} />}
// //       </button>

// //       <div
// //         onClick={() => updateSidebar(false)}
// //         className={`fixed inset-0 z-[55] bg-[#03050b]/75 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
// //           sidebarOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
// //         }`}
// //         aria-hidden="true"
// //       />

// //       <aside
// //         aria-label="Main navigation"
// //         className={`nexus-sidebar fixed right-0 top-16 z-[60] flex h-[calc(100dvh-4rem)] w-[286px] max-w-[88vw] flex-col overflow-hidden transition-transform duration-300 ease-out lg:top-[76px] lg:h-[calc(100dvh-76px)] lg:w-[276px] ${
// //           sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
// //         }`}
// //       >
// //         <div className="relative border-b border-white/[0.07] px-5 pb-4 pt-5">
// //           <div className="flex items-center gap-3">
// //             <div className="nexus-brand-mark flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-300/25 bg-gradient-to-br from-violet-500/25 via-indigo-500/15 to-cyan-400/15 text-cyan-200">
// //               <Sparkles size={23} strokeWidth={1.7} />
// //             </div>
// //             <div className="min-w-0 flex-1">
// //               <div className="truncate text-[14px] font-black tracking-[.13em] text-white">
// //                 ZORO <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">GAMES</span>
// //               </div>
// //               <div className="mt-1 text-[9px] font-bold uppercase tracking-[.23em] text-slate-500">
// //                 Next-gen member portal
// //               </div>
// //             </div>
// //             <div className="hidden h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-slate-500 lg:flex">
// //               <Gauge size={15} />
// //             </div>
// //           </div>

// //           <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-300/10 bg-emerald-300/[0.035] px-3 py-2.5">
// //             <div className="flex items-center gap-2.5">
// //               <span className="nexus-live-dot h-1.5 w-1.5 rounded-full bg-emerald-300" />
// //               <span className="text-[10px] font-semibold tracking-wide text-slate-400">Navigation systems online</span>
// //             </div>
// //             <span className="font-mono text-[9px] font-bold tracking-wider text-emerald-300">LIVE</span>
// //           </div>
// //         </div>

// //         <div className="nexus-scroll flex-1 overflow-y-auto py-4">
// //           <nav className="nexus-menu-reveal flex flex-col gap-5">
// //             {MENU_GROUPS.map((group, groupIndex) => (
// //               <section key={group.title}>
// //                 <div className="mb-2 flex items-center gap-2 px-5">
// //                   <span className="font-mono text-[9px] font-bold tracking-widest text-violet-300/70">{group.code}</span>
// //                   <h3 className="text-[9px] font-extrabold uppercase tracking-[.18em] text-slate-500">{group.title}</h3>
// //                   <span className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent" />
// //                 </div>
// //                 <div>
// //                   {group.items.map((item) => (
// //                     <SidebarItem
// //                       key={item.path}
// //                       item={item}
// //                       active={isItemActive(item.path)}
// //                       badge={item.notification ? notifCount : 0}
// //                       onNavigate={closeOnMobile}
// //                     />
// //                   ))}
// //                 </div>
// //               </section>
// //             ))}
// //           </nav>
// //         </div>

// //         <div className="border-t border-white/[0.08] bg-[#080a13]/95 p-4">
// //           <div className="mb-3 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-gradient-to-r from-violet-500/[0.08] to-cyan-500/[0.035] px-3 py-3">
// //             <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-400/10 text-violet-200">
// //               <UserCircle2 size={19} />
// //             </div>
// //             <div className="min-w-0 flex-1">
// //               <p className="truncate text-xs font-bold text-slate-200">{user?.name || user?.username || "Welcome"}</p>
// //               <p className="mt-1 truncate font-mono text-[10px] text-slate-500">
// //                 {user?.userId ? `MEMBER / ${user.userId}` : "MEMBER ACCOUNT"}
// //               </p>
// //             </div>
// //             <CircleDot size={13} className="shrink-0 text-emerald-300" />
// //           </div>

// //           <button
// //             type="button"
// //             onClick={handleLogout}
// //             className="nexus-footer-button group flex w-full items-center justify-center gap-2.5 rounded-xl border border-rose-400/15 bg-rose-400/[0.055] px-4 py-3 text-xs font-bold tracking-wide text-rose-300 transition-all duration-200 hover:border-rose-400/35 hover:bg-rose-500/10 hover:text-rose-200"
// //           >
// //             <LogOut size={16} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
// //             Sign out of account
// //           </button>
// //           <div className="mt-3 flex items-center justify-center gap-1.5 text-[8px] font-semibold uppercase tracking-[.22em] text-slate-600">
// //             <ShieldCheck size={10} />
// //             Zoro Games · Secure portal
// //           </div>
// //         </div>
// //       </aside>
// //     </>
// //   );
// // };

// // export default Sidebar;



// import React, { useState, useEffect, useCallback } from "react";
// import api from "../../api/axios";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import {
//   Home,
//   Wallet,
//   Banknote,
//   Activity,
//   History,
//   Users,
//   UserCircle2,
//   HelpCircle,
//   BadgeDollarSign,
//   BarChart3,
//   Zap,
//   Coins,
//   LogOut,
//   Box,
//   Layers,
//   ChevronRight,
//   Sparkles,
//   Radio,
//   ShieldCheck,
//   X,
//   Menu,
//   Gauge,
//   CircleDot,
// } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// const MENU_GROUPS = [
//   {
//     title: "Command Center",
//     code: "01",
//     items: [
//       { label: "Dashboard", icon: Home, path: "/dashboard" },
//       { label: "System Live Feed", icon: Radio, path: "/system-live-feed" },
//       { label: "Live Trading", icon: Activity, path: "/user/trading" },
//     ],
//   },
//   {
//     title: "Player Account",
//     code: "02",
//     items: [
//       { label: "My Profile", icon: UserCircle2, path: "/profile" },
//       { label: "Package Details", icon: Zap, path: "/topup-details" },
//       { label: "My Packages", icon: Box, path: "/my-packages" },
//       { label: "Compound Packages", icon: Layers, path: "/my-compound-packages" },
//     ],
//   },
//   {
//     title: "Network Matrix",
//     code: "03",
//     items: [
//       { label: "Deposit History", icon: History, path: "/deposit-history" },
//       { label: "Direct Team", icon: Users, path: "/direct-team" },
//       { label: "Level Team", icon: Users, path: "/all-team" },
//       { label: "Team Business", icon: Layers, path: "/downline-business" },
//     ],
//   },
//   {
//     title: "Income Intelligence",
//     code: "04",
//     items: [
//       { label: "Daily ROI Income", icon: BarChart3, path: "/roi-income" },
//       { label: "Direct Income", icon: BadgeDollarSign, path: "/direct-income" },
//       { label: "Daily Level Income", icon: Coins, path: "/level-income" },
//     ],
//   },
//   {
//     title: "Wallet & Assistance",
//     code: "05",
//     items: [
//       { label: "Wallet History", icon: Wallet, path: "/wallet-history" },
//       { label: "Withdrawals", icon: Banknote, path: "/withdrawals" },
//       { label: "Support & Raise Ticket", icon: HelpCircle, path: "/support", notification: true },
//     ],
//   },
// ];

// const SidebarItem = ({ item, active, badge, onNavigate }) => {
//   const Icon = item.icon;

//   return (
//     <Link
//       to={item.path}
//       onClick={onNavigate}
//       aria-current={active ? "page" : undefined}
//       className={`nexus-nav-item group ${active ? "nexus-nav-active" : ""}`}
//     >
//       <span className="nexus-nav-icon">
//         <Icon size={17} strokeWidth={active ? 2.3 : 1.8} />
//       </span>
//       <span className="min-w-0 flex-1 truncate">{item.label}</span>
//       {badge > 0 && (
//         <span className="nexus-badge" aria-label={`${badge} notifications`}>
//           {badge > 99 ? "99+" : badge}
//         </span>
//       )}
//       <ChevronRight
//         size={14}
//         className={`nexus-nav-chevron ${active ? "nexus-chevron-active" : ""}`}
//       />
//     </Link>
//   );
// };

// const Sidebar = ({ user, isOpen, setIsOpen }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { logout } = useAuth();
//   const [internalOpen, setInternalOpen] = useState(false);
//   const hasExternalSetter = typeof setIsOpen === "function";
//   const sidebarOpen = hasExternalSetter ? Boolean(isOpen) : internalOpen;

//   const updateSidebar = useCallback(
//     (nextValue) => {
//       if (hasExternalSetter) setIsOpen(nextValue);
//       else setInternalOpen(nextValue);
//     },
//     [hasExternalSetter, setIsOpen]
//   );

//   const [notifCount, setNotifCount] = useState(0);

//   useEffect(() => {
//     let cancelled = false;

//     const fetchNotifCount = async () => {
//       if (!user?.userId) {
//         setNotifCount(0);
//         return;
//       }

//       try {
//         const response = await api.get(
//           `/admin/notifications/count/${encodeURIComponent(user.userId)}`
//         );
//         if (!cancelled) setNotifCount(Number(response.data?.count) || 0);
//       } catch (error) {
//         if (!cancelled) console.error("Notification count error:", error);
//       }
//     };

//     fetchNotifCount();
//     const intervalId = window.setInterval(fetchNotifCount, 15000);

//     return () => {
//       cancelled = true;
//       window.clearInterval(intervalId);
//     };
//   }, [user?.userId]);

//   useEffect(() => {
//     if (typeof window === "undefined") return undefined;
//     if (window.innerWidth >= 1024) {
//       document.body.style.overflow = "";
//       return undefined;
//     }

//     const previousOverflow = document.body.style.overflow;
//     document.body.style.overflow = sidebarOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = previousOverflow;
//     };
//   }, [sidebarOpen]);

//   useEffect(() => {
//     if (typeof window !== "undefined" && window.innerWidth < 1024) {
//       updateSidebar(false);
//     }
//   }, [location.pathname, updateSidebar]);

//   const handleLogout = async () => {
//     try {
//       await logout();
//     } catch (error) {
//       console.error("Logout error:", error);
//     } finally {
//       updateSidebar(false);
//       navigate("/login", { replace: true });
//     }
//   };

//   const isItemActive = (path) => {
//     if (location.pathname === path) return true;
//     if (path === "/dashboard") return false;
//     return location.pathname.startsWith(`${path}/`);
//   };

//   const closeOnMobile = () => {
//     if (typeof window !== "undefined" && window.innerWidth < 1024) {
//       updateSidebar(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         .nexus-sidebar {
//           background:
//             radial-gradient(ellipse at 0% 0%, rgba(124, 58, 237, .19), transparent 35%),
//             radial-gradient(ellipse at 100% 35%, rgba(6, 182, 212, .10), transparent 32%),
//             linear-gradient(180deg, #0b0e1b 0%, #080b13 54%, #090c16 100%);
//           border-left: 1px solid rgba(148, 163, 184, .13);
//           box-shadow: -22px 0 70px rgba(0, 0, 0, .42);
//           isolation: isolate;
//         }
//         .nexus-sidebar::before {
//           content: "";
//           position: absolute;
//           inset: 0 0 auto;
//           height: 1px;
//           background: linear-gradient(90deg, transparent, rgba(34,211,238,.55), rgba(168,85,247,.7), transparent);
//           pointer-events: none;
//         }
//         .nexus-scroll { scrollbar-width: thin; scrollbar-color: #3a315f transparent; }
//         .nexus-scroll::-webkit-scrollbar { width: 4px; }
//         .nexus-scroll::-webkit-scrollbar-thumb { background: linear-gradient(#8b5cf6,#22d3ee); border-radius: 99px; }
//         .nexus-nav-item {
//           position: relative; isolation: isolate; display: flex; align-items: center; gap: 11px;
//           min-height: 45px; margin: 3px 12px; padding: 7px 10px; border: 1px solid transparent;
//           border-radius: 13px; color: #929bb0; font-size: 11.5px; font-weight: 650; letter-spacing: .015em;
//           transition: color .22s ease, background .22s ease, border-color .22s ease, transform .22s ease;
//         }
//         .nexus-nav-item::before {
//           content: ""; position: absolute; z-index: -1; inset: 0; border-radius: inherit;
//           background: linear-gradient(105deg, rgba(124,58,237,.19), rgba(6,182,212,.08));
//           opacity: 0; transition: opacity .22s ease;
//         }
//         .nexus-nav-item:hover { color: #f8fafc; border-color: rgba(148,163,184,.11); transform: translateX(-2px); }
//         .nexus-nav-item:hover::before { opacity: 1; }
//         .nexus-nav-icon {
//           display: grid; place-items: center; width: 32px; height: 32px; flex-shrink: 0;
//           border: 1px solid rgba(148,163,184,.07); border-radius: 10px;
//           background: rgba(148,163,184,.045); color: #8490a8; transition: all .22s ease;
//         }
//         .nexus-nav-item:hover .nexus-nav-icon { color: #67e8f9; border-color: rgba(34,211,238,.17); background: rgba(6,182,212,.10); }
//         .nexus-nav-active { color: #fff; border-color: rgba(139,92,246,.28); background: rgba(124,58,237,.09); box-shadow: inset 3px 0 0 #a78bfa, 0 5px 18px rgba(76,29,149,.08); }
//         .nexus-nav-active::before { opacity: 1; }
//         .nexus-nav-active .nexus-nav-icon { color: #a5f3fc; border-color: rgba(34,211,238,.24); background: linear-gradient(145deg, rgba(124,58,237,.22), rgba(6,182,212,.13)); box-shadow: 0 0 17px rgba(34,211,238,.07); }
//         .nexus-nav-chevron { flex-shrink: 0; color: #5b667c; opacity: 0; transition: opacity .2s ease, transform .2s ease; }
//         .nexus-nav-item:hover .nexus-nav-chevron { opacity: .8; transform: translateX(-2px); }
//         .nexus-chevron-active { color: #67e8f9; opacity: 1; }
//         .nexus-badge { display: inline-flex; align-items: center; justify-content: center; min-width: 20px; height: 20px; padding: 0 5px; border-radius: 7px; background: linear-gradient(135deg,#fb7185,#e11d48); color: #fff; font-size: 9px; font-weight: 900; box-shadow: 0 0 14px rgba(244,63,94,.25); animation: nexusBadgePulse 2.4s ease-in-out infinite; }
//         .nexus-menu-reveal { animation: nexusReveal .36s cubic-bezier(.2,.75,.2,1) both; }
//         .nexus-brand-mark { position: relative; overflow: hidden; box-shadow: 0 0 24px rgba(124,58,237,.23), inset 0 0 16px rgba(34,211,238,.09); }
//         .nexus-brand-mark::after { content: ""; position: absolute; top: -80%; left: -60%; width: 40%; height: 260%; transform: rotate(28deg); background: linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent); animation: nexusShine 5s ease-in-out infinite; }
//         .nexus-live-dot { box-shadow: 0 0 0 4px rgba(52,211,153,.08), 0 0 12px rgba(52,211,153,.55); }
//         .nexus-footer-button { position: relative; overflow: hidden; }
//         .nexus-footer-button::after { content: ""; position: absolute; inset: 0; background: linear-gradient(110deg,transparent,rgba(255,255,255,.06),transparent); transform: translateX(-120%); transition: transform .45s ease; }
//         .nexus-footer-button:hover::after { transform: translateX(120%); }
//         @keyframes nexusReveal { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes nexusShine { 0%, 65%, 100% { left: -60%; } 35% { left: 130%; } }
//         @keyframes nexusBadgePulse { 0%,100% { box-shadow: 0 0 0 rgba(244,63,94,0); } 50% { box-shadow: 0 0 13px rgba(244,63,94,.28); } }
//         @media (prefers-reduced-motion: reduce) {
//           .nexus-sidebar *, .nexus-menu-reveal, .nexus-brand-mark::after, .nexus-badge { animation: none !important; transition: none !important; }
//         }
//       `}</style>

//       <button
//         type="button"
//         onClick={() => updateSidebar(!sidebarOpen)}
//         aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
//         aria-expanded={sidebarOpen}
//         className="fixed right-4 top-[76px] z-[70] flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/20 bg-[#111426]/95 text-cyan-200 shadow-lg shadow-black/20 backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-violet-500/10 lg:hidden"
//       >
//         {sidebarOpen ? <X size={19} /> : <Menu size={19} />}
//       </button>

//       <div
//         onClick={() => updateSidebar(false)}
//         className={`fixed inset-0 z-[55] bg-[#03050b]/75 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
//           sidebarOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
//         }`}
//         aria-hidden="true"
//       />

//       <aside
//         aria-label="Main navigation"
//         style={{ width: "min(286px, 88vw)", minWidth: "min(286px, 88vw)", flexShrink: 0 }}
//         className={`nexus-sidebar fixed right-0 top-16 z-[60] flex h-[calc(100dvh-4rem)] w-[286px] min-w-[260px] max-w-[88vw] flex-col overflow-hidden transition-transform duration-300 ease-out lg:top-[76px] lg:h-[calc(100dvh-76px)] lg:w-[276px] lg:min-w-[276px] ${
//           sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
//         }`}
//       >
//         <div className="relative border-b border-white/[0.07] px-5 pb-4 pt-5">
//           <div className="flex items-center gap-3">
//             <div className="nexus-brand-mark flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-300/25 bg-gradient-to-br from-violet-500/25 via-indigo-500/15 to-cyan-400/15 text-cyan-200">
//               <Sparkles size={23} strokeWidth={1.7} />
//             </div>
//             <div className="min-w-0 flex-1">
//               <div className="truncate text-[14px] font-black tracking-[.13em] text-white">
//                 ZORO <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">GAMES</span>
//               </div>
//               <div className="mt-1 text-[9px] font-bold uppercase tracking-[.23em] text-slate-500">
//                 Next-gen member portal
//               </div>
//             </div>
//             <div className="hidden h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-slate-500 lg:flex">
//               <Gauge size={15} />
//             </div>
//           </div>

//           <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-300/10 bg-emerald-300/[0.035] px-3 py-2.5">
//             <div className="flex items-center gap-2.5">
//               <span className="nexus-live-dot h-1.5 w-1.5 rounded-full bg-emerald-300" />
//               <span className="text-[10px] font-semibold tracking-wide text-slate-400">Navigation systems online</span>
//             </div>
//             <span className="font-mono text-[9px] font-bold tracking-wider text-emerald-300">LIVE</span>
//           </div>
//         </div>

//         <div className="nexus-scroll min-w-0 flex-1 overflow-x-hidden overflow-y-auto py-4">
//           <nav className="nexus-menu-reveal flex min-w-0 flex-col gap-5">
//             {MENU_GROUPS.map((group, groupIndex) => (
//               <section key={group.title}>
//                 <div className="mb-2 flex items-center gap-2 px-5">
//                   <span className="font-mono text-[9px] font-bold tracking-widest text-violet-300/70">{group.code}</span>
//                   <h3 className="text-[9px] font-extrabold uppercase tracking-[.18em] text-slate-500">{group.title}</h3>
//                   <span className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent" />
//                 </div>
//                 <div>
//                   {group.items.map((item) => (
//                     <SidebarItem
//                       key={item.path}
//                       item={item}
//                       active={isItemActive(item.path)}
//                       badge={item.notification ? notifCount : 0}
//                       onNavigate={closeOnMobile}
//                     />
//                   ))}
//                 </div>
//               </section>
//             ))}
//           </nav>
//         </div>

//         <div className="border-t border-white/[0.08] bg-[#080a13]/95 p-4">
//           <div className="mb-3 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-gradient-to-r from-violet-500/[0.08] to-cyan-500/[0.035] px-3 py-3">
//             <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-400/10 text-violet-200">
//               <UserCircle2 size={19} />
//             </div>
//             <div className="min-w-0 flex-1">
//               <p className="truncate text-xs font-bold text-slate-200">{user?.name || user?.username || "Welcome"}</p>
//               <p className="mt-1 truncate font-mono text-[10px] text-slate-500">
//                 {user?.userId ? `MEMBER / ${user.userId}` : "MEMBER ACCOUNT"}
//               </p>
//             </div>
//             <CircleDot size={13} className="shrink-0 text-emerald-300" />
//           </div>

//           <button
//             type="button"
//             onClick={handleLogout}
//             className="nexus-footer-button group flex w-full items-center justify-center gap-2.5 rounded-xl border border-rose-400/15 bg-rose-400/[0.055] px-4 py-3 text-xs font-bold tracking-wide text-rose-300 transition-all duration-200 hover:border-rose-400/35 hover:bg-rose-500/10 hover:text-rose-200"
//           >
//             <LogOut size={16} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
//             Sign out of account
//           </button>
//           <div className="mt-3 flex items-center justify-center gap-1.5 text-[8px] font-semibold uppercase tracking-[.22em] text-slate-600">
//             <ShieldCheck size={10} />
//             Zoro Games · Secure portal
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;



import React, { useState, useEffect, useCallback } from "react";
import api from "../../api/axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Home,
  Wallet,
  Banknote,
  Activity,
  History,
  Users,
  UserCircle2,
  HelpCircle,
  BadgeDollarSign,
  BarChart3,
  Zap,
  Coins,
  LogOut,
  Box,
  Layers,
  ChevronRight,
  Sparkles,
  Radio,
  ShieldCheck,
  X,
  Menu,
  Gauge,
  CircleDot,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const MENU_GROUPS = [
  {
    title: "Command Center",
    code: "01",
    items: [
      { label: "Dashboard", icon: "dashboard", path: "/dashboard" },
     ],
  },
  {
    title: "Player Account",
    code: "02",
    items: [
      { label: "My Profile", icon: "profile", path: "/profile" },
      { label: "Package Details", icon: "package-detail", path: "/topup-details" },
      { label: "My Packages", icon: "package", path: "/my-packages" },
     ],
  },
  {
    title: "Network Matrix",
    code: "03",
    items: [
      { label: "Deposit History", icon: "deposit-history", path: "/deposit-history" },
      { label: "Direct Team", icon: "team", path: "/direct-team" },
      { label: "Level Team", icon: "team", path: "/all-team" },
      { label: "Team Business", icon: "layers", path: "/downline-business" },
    ],
  },
  {
    title: "Income Intelligence",
    code: "04",
    items: [
      { label: "Daily ROI Income", icon: "roi", path: "/roi-income" },
      { label: "Direct Income", icon: "direct-income", path: "/direct-income" },
      { label: "Daily Level Income", icon: "level-income", path: "/level-income" },
    ],
  },
  {
    title: "Wallet & Assistance",
    code: "05",
    items: [
      { label: "Wallet History", icon: "wallet-history", path: "/wallet-history" },
      { label: "Withdrawals", icon: "withdraw", path: "/withdrawals" },
      { label: "Support & Raise Ticket", icon: "support", path: "/support", notification: true },
    ],
  },
];

const NexusSymbol = ({ name, active = false }) => {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: active ? 1.9 : 1.65, strokeLinecap: "round", strokeLinejoin: "round" };
  const glyphs = {
    dashboard: <><path d="M3.5 10.5 12 3.8l8.5 6.7"/><path d="M5.5 9.5v10h13v-10"/><path d="M9 19.5v-6h6v6"/><path d="m15.5 5.8 2.2-1.7v4"/></>,
    signal: <><circle cx="12" cy="12" r="8.5"/><path d="M7 14.5a5.5 5.5 0 0 1 10 0"/><path d="M9.5 12a2.8 2.8 0 0 1 5 0"/><path d="M12 16.5v.1"/><path d="M17.5 5.5 20 3"/></>,
    trade: <><path d="M4 7h12.5l-2.8-2.8"/><path d="M16.5 7 13.7 9.8"/><path d="M20 17H7.5l2.8 2.8"/><path d="M7.5 17l2.8-2.8"/><path d="M4 12h16"/></>,
    profile: <><circle cx="12" cy="8" r="3.2"/><path d="M5.5 19.5c.5-3.1 2.8-4.8 6.5-4.8s6 1.7 6.5 4.8"/><path d="m17.5 5.5 1.2 1.2 2-2"/></>,
    'package-detail': <><path d="m12 3 8 4.3v9.4L12 21l-8-4.3V7.3L12 3Z"/><path d="m4.5 7.5 7.5 4 7.5-4"/><path d="M12 11.5V21"/><path d="m8.5 5 8 4.2"/></>,
    package: <><path d="m12 3 8 4.4v9.2L12 21l-8-4.4V7.4L12 3Z"/><path d="m4 7.5 8 4.4 8-4.4"/><path d="M12 11.9V21"/></>,
    layers: <><path d="m12 3 8.5 4.6L12 12.2 3.5 7.6 12 3Z"/><path d="m4 12 8 4.4 8-4.4"/><path d="m4 16.3 8 4.4 8-4.4"/></>,
    'deposit-history': <><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.2 2"/><path d="M4 5.5 6 4"/><path d="m18 4 2 1.5"/><path d="M8.5 17.5h7"/></>,
    team: <><circle cx="9" cy="8" r="2.5"/><circle cx="16.5" cy="9" r="2"/><path d="M3.8 18c.4-2.6 2.1-4 5.2-4s4.8 1.4 5.2 4"/><path d="M14.2 14.5c2.8-.4 5.1.9 5.7 3.1"/></>,
    roi: <><path d="M4 19.5h16"/><path d="M6 16V11"/><path d="M11 16V6"/><path d="M16 16V9"/><path d="m5 7 4-3 4 2 5-3"/><path d="M15.5 3H18v2.5"/></>,
    'direct-income': <><circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5c-.7-.8-1.8-1.2-3.2-1.2-1.7 0-2.8.8-2.8 2s1 1.8 2.8 2.2 2.8 1 2.8 2.2-1.2 2-3 2c-1.4 0-2.6-.5-3.4-1.4"/><path d="M12 5.5v13"/></>,
    'level-income': <><path d="m12 3 2.2 5.1 5.5.5-4.2 3.6 1.3 5.4-4.8-2.9-4.8 2.9 1.3-5.4-4.2-3.6 5.5-.5L12 3Z"/><path d="M8 20h8"/></>,
    'wallet-history': <><rect x="3.5" y="5.5" width="14.5" height="14" rx="2.4"/><path d="M6 5.5V4.8A1.8 1.8 0 0 1 7.8 3h10.4a2 2 0 0 1 2 2v11"/><path d="M14.5 11h6v4.2h-6a2.1 2.1 0 0 1 0-4.2Z"/><circle cx="15.8" cy="13.1" r=".55"/></>,
    withdraw: <><rect x="3.5" y="5" width="17" height="14" rx="2.4"/><path d="M4 9h16"/><path d="M8 13h.1M12 13h.1"/><path d="m14.5 15.5 2 2 3.5-4"/></>,
    support: <><path d="M4 12a8 8 0 1 1 16 0c0 3-1.4 4.3-3.4 5.2-.9.4-1.6 1-1.6 2H9c0-1.3-.7-1.8-1.6-2.2C5.4 16.1 4 14.8 4 12Z"/><path d="M9.5 9a2.6 2.6 0 1 1 4.4 1.9c-1.2.9-1.9 1.2-1.9 2.6"/><path d="M12 16.5v.1"/></>
  };
  return <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" {...common}>{glyphs[name] || glyphs.dashboard}</svg>;
};

const SidebarItem = ({ item, active, badge, onNavigate }) => {
  return (
    <Link
      to={item.path}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`nexus-nav-item group ${active ? "nexus-nav-active" : ""}`}
    >
      <span className="nexus-nav-icon">
        <NexusSymbol name={item.icon} active={active} />
      </span>
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      {badge > 0 && (
        <span className="nexus-badge" aria-label={`${badge} notifications`}>
          {badge > 99 ? "99+" : badge}
        </span>
      )}
      <ChevronRight
        size={14}
        className={`nexus-nav-chevron ${active ? "nexus-chevron-active" : ""}`}
      />
    </Link>
  );
};

const Sidebar = ({ user, isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [internalOpen, setInternalOpen] = useState(false);
  const hasExternalSetter = typeof setIsOpen === "function";
  const sidebarOpen = hasExternalSetter ? Boolean(isOpen) : internalOpen;

  const updateSidebar = useCallback(
    (nextValue) => {
      if (hasExternalSetter) setIsOpen(nextValue);
      else setInternalOpen(nextValue);
    },
    [hasExternalSetter, setIsOpen]
  );

  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchNotifCount = async () => {
      if (!user?.userId) {
        setNotifCount(0);
        return;
      }

      try {
        const response = await api.get(
          `/admin/notifications/count/${encodeURIComponent(user.userId)}`
        );
        if (!cancelled) setNotifCount(Number(response.data?.count) || 0);
      } catch (error) {
        if (!cancelled) console.error("Notification count error:", error);
      }
    };

    fetchNotifCount();
    const intervalId = window.setInterval(fetchNotifCount, 15000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [user?.userId]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.innerWidth >= 1024) {
      document.body.style.overflow = "";
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [sidebarOpen]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      updateSidebar(false);
    }
  }, [location.pathname, updateSidebar]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      updateSidebar(false);
      navigate("/login", { replace: true });
    }
  };

  const isItemActive = (path) => {
    if (location.pathname === path) return true;
    if (path === "/dashboard") return false;
    return location.pathname.startsWith(`${path}/`);
  };

  const closeOnMobile = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      updateSidebar(false);
    }
  };

  return (
    <>
      <style>{`
        .nexus-sidebar {
          background:
            radial-gradient(ellipse at 0% 0%, rgba(124, 58, 237, .19), transparent 35%),
            radial-gradient(ellipse at 100% 35%, rgba(6, 182, 212, .10), transparent 32%),
            linear-gradient(180deg, #0b0e1b 0%, #080b13 54%, #090c16 100%);
          border-left: 1px solid rgba(148, 163, 184, .13);
          box-shadow: -22px 0 70px rgba(0, 0, 0, .42);
          isolation: isolate;
        }
        .nexus-sidebar::before {
          content: "";
          position: absolute;
          inset: 0 0 auto;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(34,211,238,.55), rgba(168,85,247,.7), transparent);
          pointer-events: none;
        }
        .nexus-scroll { scrollbar-width: thin; scrollbar-color: #3a315f transparent; }
        .nexus-scroll::-webkit-scrollbar { width: 4px; }
        .nexus-scroll::-webkit-scrollbar-thumb { background: linear-gradient(#8b5cf6,#22d3ee); border-radius: 99px; }
        .nexus-nav-item {
          position: relative; isolation: isolate; display: flex; align-items: center; gap: 11px;
          min-height: 45px; margin: 3px 12px; padding: 7px 10px; border: 1px solid transparent;
          border-radius: 13px; color: #929bb0; font-size: 11.5px; font-weight: 650; letter-spacing: .015em;
          transition: color .22s ease, background .22s ease, border-color .22s ease, transform .22s ease;
        }
        .nexus-nav-item::before {
          content: ""; position: absolute; z-index: -1; inset: 0; border-radius: inherit;
          background: linear-gradient(105deg, rgba(124,58,237,.19), rgba(6,182,212,.08));
          opacity: 0; transition: opacity .22s ease;
        }
        .nexus-nav-item:hover { color: #f8fafc; border-color: rgba(148,163,184,.11); transform: translateX(-2px); }
        .nexus-nav-item:hover::before { opacity: 1; }
        .nexus-nav-icon {
          display: grid; place-items: center; width: 32px; height: 32px; flex-shrink: 0;
          border: 1px solid rgba(148,163,184,.07); border-radius: 10px;
          background: rgba(148,163,184,.045); color: #8490a8; transition: all .22s ease;
        }
        .nexus-nav-item:hover .nexus-nav-icon { color: #67e8f9; border-color: rgba(34,211,238,.17); background: rgba(6,182,212,.10); }
        .nexus-nav-active { color: #fff; border-color: rgba(139,92,246,.28); background: rgba(124,58,237,.09); box-shadow: inset 3px 0 0 #a78bfa, 0 5px 18px rgba(76,29,149,.08); }
        .nexus-nav-active::before { opacity: 1; }
        .nexus-nav-active .nexus-nav-icon { color: #a5f3fc; border-color: rgba(34,211,238,.24); background: linear-gradient(145deg, rgba(124,58,237,.22), rgba(6,182,212,.13)); box-shadow: 0 0 17px rgba(34,211,238,.07); }
        .nexus-nav-chevron { flex-shrink: 0; color: #5b667c; opacity: 0; transition: opacity .2s ease, transform .2s ease; }
        .nexus-nav-item:hover .nexus-nav-chevron { opacity: .8; transform: translateX(-2px); }
        .nexus-chevron-active { color: #67e8f9; opacity: 1; }
        .nexus-badge { display: inline-flex; align-items: center; justify-content: center; min-width: 20px; height: 20px; padding: 0 5px; border-radius: 7px; background: linear-gradient(135deg,#fb7185,#e11d48); color: #fff; font-size: 9px; font-weight: 900; box-shadow: 0 0 14px rgba(244,63,94,.25); animation: nexusBadgePulse 2.4s ease-in-out infinite; }
        .nexus-menu-reveal { animation: nexusReveal .36s cubic-bezier(.2,.75,.2,1) both; }
        .nexus-brand-mark { position: relative; overflow: hidden; box-shadow: 0 0 24px rgba(124,58,237,.23), inset 0 0 16px rgba(34,211,238,.09); }
        .nexus-brand-mark::after { content: ""; position: absolute; top: -80%; left: -60%; width: 40%; height: 260%; transform: rotate(28deg); background: linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent); animation: nexusShine 5s ease-in-out infinite; }
        .nexus-live-dot { box-shadow: 0 0 0 4px rgba(52,211,153,.08), 0 0 12px rgba(52,211,153,.55); }
        .nexus-footer-button { position: relative; overflow: hidden; }
        .nexus-footer-button::after { content: ""; position: absolute; inset: 0; background: linear-gradient(110deg,transparent,rgba(255,255,255,.06),transparent); transform: translateX(-120%); transition: transform .45s ease; }
        .nexus-footer-button:hover::after { transform: translateX(120%); }
        @keyframes nexusReveal { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes nexusShine { 0%, 65%, 100% { left: -60%; } 35% { left: 130%; } }
        @keyframes nexusBadgePulse { 0%,100% { box-shadow: 0 0 0 rgba(244,63,94,0); } 50% { box-shadow: 0 0 13px rgba(244,63,94,.28); } }
        @media (prefers-reduced-motion: reduce) {
          .nexus-sidebar *, .nexus-menu-reveal, .nexus-brand-mark::after, .nexus-badge { animation: none !important; transition: none !important; }
        }
      `}</style>

      <button
        type="button"
        onClick={() => updateSidebar(!sidebarOpen)}
        aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={sidebarOpen}
        className="fixed right-4 top-[76px] z-[70] flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/20 bg-[#111426]/95 text-cyan-200 shadow-lg shadow-black/20 backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-violet-500/10 lg:hidden"
      >
        {sidebarOpen ? <X size={19} /> : <Menu size={19} />}
      </button>

      <div
        onClick={() => updateSidebar(false)}
        className={`fixed inset-0 z-[55] bg-[#03050b]/75 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      <aside
        aria-label="Main navigation"
        style={{ width: "min(286px, 88vw)", minWidth: "min(286px, 88vw)", flexShrink: 0 }}
        className={`nexus-sidebar fixed right-0 top-16 z-[60] flex h-[calc(100dvh-4rem)] w-[286px] min-w-[260px] max-w-[88vw] flex-col overflow-hidden transition-transform duration-300 ease-out lg:top-[76px] lg:h-[calc(100dvh-76px)] lg:w-[276px] lg:min-w-[276px] ${
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="relative border-b border-white/[0.07] px-5 pb-4 pt-5">
          <div className="flex items-center gap-3">
            <div className="nexus-brand-mark flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-300/25 bg-gradient-to-br from-violet-500/25 via-indigo-500/15 to-cyan-400/15 text-cyan-200">
              <Sparkles size={23} strokeWidth={1.7} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[14px] font-black tracking-[.13em] text-white">
                ZORO <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">GAMES</span>
              </div>
              <div className="mt-1 text-[9px] font-bold uppercase tracking-[.23em] text-slate-500">
                Next-gen member portal
              </div>
            </div>
            <div className="hidden h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-slate-500 lg:flex">
              <Gauge size={15} />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-300/10 bg-emerald-300/[0.035] px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <span className="nexus-live-dot h-1.5 w-1.5 rounded-full bg-emerald-300" />
              <span className="text-[10px] font-semibold tracking-wide text-slate-400">Navigation systems online</span>
            </div>
            <span className="font-mono text-[9px] font-bold tracking-wider text-emerald-300">LIVE</span>
          </div>
        </div>

        <div className="nexus-scroll min-w-0 flex-1 overflow-x-hidden overflow-y-auto py-4">
          <nav className="nexus-menu-reveal flex min-w-0 flex-col gap-5">
            {MENU_GROUPS.map((group, groupIndex) => (
              <section key={group.title}>
                <div className="mb-2 flex items-center gap-2 px-5">
                  <span className="font-mono text-[9px] font-bold tracking-widest text-violet-300/70">{group.code}</span>
                  <h3 className="text-[9px] font-extrabold uppercase tracking-[.18em] text-slate-500">{group.title}</h3>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent" />
                </div>
                <div>
                  {group.items.map((item) => (
                    <SidebarItem
                      key={item.path}
                      item={item}
                      active={isItemActive(item.path)}
                      badge={item.notification ? notifCount : 0}
                      onNavigate={closeOnMobile}
                    />
                  ))}
                </div>
              </section>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/[0.08] bg-[#080a13]/95 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-gradient-to-r from-violet-500/[0.08] to-cyan-500/[0.035] px-3 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-400/10 text-violet-200">
              <UserCircle2 size={19} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-200">{user?.name || user?.username || "Welcome"}</p>
              <p className="mt-1 truncate font-mono text-[10px] text-slate-500">
                {user?.userId ? `MEMBER / ${user.userId}` : "MEMBER ACCOUNT"}
              </p>
            </div>
            <CircleDot size={13} className="shrink-0 text-emerald-300" />
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="nexus-footer-button group flex w-full items-center justify-center gap-2.5 rounded-xl border border-rose-400/15 bg-rose-400/[0.055] px-4 py-3 text-xs font-bold tracking-wide text-rose-300 transition-all duration-200 hover:border-rose-400/35 hover:bg-rose-500/10 hover:text-rose-200"
          >
            <LogOut size={16} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            Sign out of account
          </button>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[8px] font-semibold uppercase tracking-[.22em] text-slate-600">
            <ShieldCheck size={10} />
            Zoro Games · Secure portal
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
