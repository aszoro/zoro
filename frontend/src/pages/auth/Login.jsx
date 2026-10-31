// // // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // // import api from '../../api/axios';
// // // // // // // // // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // // // // // // // // import { useAuth } from '../../context/AuthContext';
// // // // // // // // // import FingerprintJS from '@fingerprintjs/fingerprintjs';

// // // // // // // // // const UserLogin = () => {
// // // // // // // // //   const [userId, setUserId] = useState('');
// // // // // // // // //   const [password, setPassword] = useState('');
// // // // // // // // //   const [rememberMe, setRememberMe] = useState(false);
// // // // // // // // //   const [savedUsers, setSavedUsers] = useState([]);
// // // // // // // // //   const [filteredUsers, setFilteredUsers] = useState([]);
// // // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // // //   const [error, setError] = useState('');
// // // // // // // // //   const [dropdownOpen, setDropdownOpen] = useState(false);

// // // // // // // // //   const navigate = useNavigate();
// // // // // // // // //   const location = useLocation();
// // // // // // // // //   const { login } = useAuth();
// // // // // // // // //   const inputRef = useRef(null);

// // // // // // // // //   // AUTOMATIC HARD REFRESH LOGIC
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const hasRefreshed = sessionStorage.getItem('site_updated_refresh');
// // // // // // // // //     if (!hasRefreshed) {
// // // // // // // // //       sessionStorage.setItem('site_updated_refresh', 'true');
// // // // // // // // //       window.location.reload(); 
// // // // // // // // //     }
// // // // // // // // //   }, []);

// // // // // // // // //   // AUTO-LOGIN FROM ADMIN
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const queryParams = new URLSearchParams(location.search);
// // // // // // // // //     const urlToken = queryParams.get('token');
// // // // // // // // //     const urlUser = queryParams.get('user');
    
// // // // // // // // //     if (urlToken && urlUser) {
// // // // // // // // //       try {
// // // // // // // // //         const userData = JSON.parse(decodeURIComponent(urlUser));
// // // // // // // // //         localStorage.setItem('token', urlToken);
// // // // // // // // //         localStorage.setItem('user', JSON.stringify(userData));
// // // // // // // // //         login(userData, urlToken);
// // // // // // // // //         window.history.replaceState({}, document.title, '/login');
// // // // // // // // //         window.location.href = '/dashboard'; 
// // // // // // // // //       } catch (err) {
// // // // // // // // //         setError('Invalid login link from Admin.');
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   }, [location.search, login]);

// // // // // // // // //   // Saved Users Logic
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const users = JSON.parse(localStorage.getItem('savedUsers') || '[]');
// // // // // // // // //     setSavedUsers(users);
// // // // // // // // //   }, []);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const handleClickOutside = (event) => {
// // // // // // // // //       if (inputRef.current && !inputRef.current.contains(event.target)) {
// // // // // // // // //         setDropdownOpen(false);
// // // // // // // // //       }
// // // // // // // // //     };
// // // // // // // // //     document.addEventListener('mousedown', handleClickOutside);
// // // // // // // // //     return () => document.removeEventListener('mousedown', handleClickOutside);
// // // // // // // // //   }, []);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (userId === '') {
// // // // // // // // //       setFilteredUsers(savedUsers);
// // // // // // // // //     } else {
// // // // // // // // //       setFilteredUsers(
// // // // // // // // //         savedUsers.filter(u => u.id.toLowerCase().includes(userId.toLowerCase()))
// // // // // // // // //       );
// // // // // // // // //     }
// // // // // // // // //   }, [userId, savedUsers]);

// // // // // // // // //   const handleUserSelect = (id) => {
// // // // // // // // //     const user = savedUsers.find(u => u.id === id);
// // // // // // // // //     if (user) {
// // // // // // // // //       setUserId(user.id);
// // // // // // // // //       setPassword(user.password);
// // // // // // // // //       setRememberMe(true);
// // // // // // // // //       setDropdownOpen(false);
// // // // // // // // //       // Yahan se auto-login ka koi trigger nahi hoga. User ko explicitly button dabana padega.
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Handle Login
// // // // // // // // //   const handleLogin = async (e) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     setLoading(true);
// // // // // // // // //     setError('');
// // // // // // // // //     try {
// // // // // // // // //       const fpPromise = FingerprintJS.load();
// // // // // // // // //       const fp = await fpPromise;
// // // // // // // // //       const result = await fp.get();
// // // // // // // // //       const visitorId = result.visitorId;
      
// // // // // // // // //       const res = await api.post('/auth/login', { userId, password, deviceId: visitorId });
// // // // // // // // //       const { token, user } = res.data;
      
// // // // // // // // //       login(user, token);
      
// // // // // // // // //       if (rememberMe) {
// // // // // // // // //         const updatedUsers = savedUsers.filter(u => u.id !== userId);
// // // // // // // // //         updatedUsers.unshift({ id: userId, password });
// // // // // // // // //         localStorage.setItem('savedUsers', JSON.stringify(updatedUsers));
// // // // // // // // //         setSavedUsers(updatedUsers);
// // // // // // // // //       }
      
// // // // // // // // //       setTimeout(() => {
// // // // // // // // //         setLoading(false);
// // // // // // // // //         navigate('/dashboard', { replace: true });
// // // // // // // // //       }, 1500);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setError(err.response?.data?.message || 'Login failed. Please try again.');
// // // // // // // // //       setLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // --- INLINE STYLES FOR EXACT IMAGE MATCH ---
// // // // // // // // //   const containerStyle = {
// // // // // // // // //     minHeight: '100vh',
// // // // // // // // //     display: 'flex',
// // // // // // // // //     justifyContent: 'center',
// // // // // // // // //     alignItems: 'center',
// // // // // // // // //     background: 'url("/background.jpg") no-repeat center center fixed', 
// // // // // // // // //     backgroundSize: 'cover',
// // // // // // // // //     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
// // // // // // // // //     padding: '20px'
// // // // // // // // //   };

// // // // // // // // //   const loginBoxStyle = {
// // // // // // // // //     background: 'rgba(50, 50, 50, 0.75)', 
// // // // // // // // //     backdropFilter: 'blur(10px)',
// // // // // // // // //     WebkitBackdropFilter: 'blur(10px)',
// // // // // // // // //     borderRadius: '20px', 
// // // // // // // // //     width: '100%',
// // // // // // // // //     maxWidth: '400px',
// // // // // // // // //     boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
// // // // // // // // //     overflow: 'hidden', 
// // // // // // // // //     position: 'relative',
// // // // // // // // //     border: '1px solid rgba(255,255,255,0.1)'
// // // // // // // // //   };

// // // // // // // // //   const topHeader = {
// // // // // // // // //     width: '100%',
// // // // // // // // //     height: '100px',
// // // // // // // // //     background: 'linear-gradient(135deg, rgba(0, 180, 219, 0.8) 0%, rgba(0, 131, 176, 0.8) 100%)',
// // // // // // // // //     clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0% 100%)',
// // // // // // // // //     position: 'absolute',
// // // // // // // // //     top: 0,
// // // // // // // // //     left: 0,
// // // // // // // // //     zIndex: 0
// // // // // // // // //   };

// // // // // // // // //   const contentWrapper = {
// // // // // // // // //     position: 'relative',
// // // // // // // // //     zIndex: 1,
// // // // // // // // //     padding: '40px 30px 30px 30px',
// // // // // // // // //   };

// // // // // // // // //   const inputGroupStyle = {
// // // // // // // // //     position: 'relative',
// // // // // // // // //     marginBottom: '25px',
// // // // // // // // //   };

// // // // // // // // //   const inputStyle = {
// // // // // // // // //     width: '100%',
// // // // // // // // //     background: 'transparent',
// // // // // // // // //     border: 'none',
// // // // // // // // //     borderBottom: '1px solid rgba(255, 255, 255, 0.5)', 
// // // // // // // // //     padding: '10px 10px 5px 30px',
// // // // // // // // //     color: 'white',
// // // // // // // // //     fontSize: '15px',
// // // // // // // // //     outline: 'none',
// // // // // // // // //     boxSizing: 'border-box',
// // // // // // // // //     transition: 'border-bottom 0.3s ease'
// // // // // // // // //   };

// // // // // // // // //   const iconStyle = {
// // // // // // // // //     position: 'absolute',
// // // // // // // // //     left: '0',
// // // // // // // // //     top: '10px',
// // // // // // // // //     color: '#03a9f4',
// // // // // // // // //     fontSize: '16px'
// // // // // // // // //   };

// // // // // // // // //   const btnStyle = {
// // // // // // // // //     width: '100%',
// // // // // // // // //     background: 'linear-gradient(to right, #03a9f4, #0083b0)', 
// // // // // // // // //     color: 'white',
// // // // // // // // //     border: 'none',
// // // // // // // // //     padding: '14px',
// // // // // // // // //     fontSize: '16px',
// // // // // // // // //     cursor: loading ? 'wait' : 'pointer',
// // // // // // // // //     marginTop: '10px',
// // // // // // // // //     opacity: loading ? 0.8 : 1,
// // // // // // // // //     fontWeight: 'bold',
// // // // // // // // //     borderRadius: '8px',
// // // // // // // // //     letterSpacing: '1px',
// // // // // // // // //     boxShadow: '0 5px 15px rgba(3, 169, 244, 0.4)'
// // // // // // // // //   };

// // // // // // // // //   const dropdownStyle = {
// // // // // // // // //     position: 'absolute',
// // // // // // // // //     top: '100%',
// // // // // // // // //     left: 0,
// // // // // // // // //     right: 0,
// // // // // // // // //     background: 'rgba(30, 30, 30, 0.95)',
// // // // // // // // //     border: '1px solid rgba(255, 255, 255, 0.2)',
// // // // // // // // //     maxHeight: '150px',
// // // // // // // // //     overflowY: 'auto',
// // // // // // // // //     zIndex: 50,
// // // // // // // // //     borderRadius: '8px',
// // // // // // // // //     marginTop: '5px'
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div style={containerStyle}>
// // // // // // // // //       <div style={loginBoxStyle}>
        
// // // // // // // // //         {/* Top Gradient Shape (Matches Register) */}
// // // // // // // // //         <div style={topHeader}></div>

// // // // // // // // //         <div style={contentWrapper}>
// // // // // // // // //           <div style={{ textAlign: 'center', marginBottom: '30px' }}>
// // // // // // // // //             <img src="/logo.jpg" alt="worldtogether" style={{ height: '55px', borderRadius: '8px', marginBottom: '10px' }} />
// // // // // // // // //             <h3 style={{ color: '#fff', fontWeight: '600', fontSize: '20px', margin: 0 }}>Sign Into Your Account</h3>
// // // // // // // // //           </div>

// // // // // // // // //           {error && (
// // // // // // // // //             <div style={{ background: 'rgba(255, 60, 60, 0.2)', color: '#ffb3b3', padding: '12px', marginBottom: '20px', fontSize: '13px', borderRadius: '6px', border: '1px solid rgba(255,0,0,0.3)', textAlign: 'center' }}>
// // // // // // // // //               ⚠️ {error}
// // // // // // // // //             </div>
// // // // // // // // //           )}

// // // // // // // // //           <form onSubmit={handleLogin}>
            
// // // // // // // // //             {/* User ID Field */}
// // // // // // // // //             <div style={inputGroupStyle} ref={inputRef}>
// // // // // // // // //               <i className="fa fa-envelope-o" style={iconStyle}></i>
// // // // // // // // //              <input
// // // // // // // // //   type="text"
// // // // // // // // //   placeholder="USER ID"
// // // // // // // // //   value={userId}
// // // // // // // // //   // 🔥 YAHAN CHANGE KIYA HAI: e.target.value.toUpperCase()
// // // // // // // // //   onChange={(e) => setUserId(e.target.value.toUpperCase())}
// // // // // // // // //   onFocus={() => setDropdownOpen(true)}
// // // // // // // // //   required
// // // // // // // // //   // 🔥 YAHAN CHANGE KIYA HAI: style mein textTransform add kar diya
// // // // // // // // //   style={{ ...inputStyle, textTransform: 'uppercase' }}
// // // // // // // // // />
// // // // // // // // //               {/* Dropdown for saved users */}
// // // // // // // // //               {dropdownOpen && filteredUsers.length > 0 && (
// // // // // // // // //                 <div style={dropdownStyle}>
// // // // // // // // //                   {filteredUsers.map((u, idx) => (
// // // // // // // // //                     <div 
// // // // // // // // //                       key={idx} 
// // // // // // // // //                       onClick={() => handleUserSelect(u.id)}
// // // // // // // // //                       style={{ padding: '12px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '14px', display: 'flex', alignItems: 'center' }}
// // // // // // // // //                       onMouseOver={(e) => e.currentTarget.style.background = 'rgba(3, 169, 244, 0.3)'}
// // // // // // // // //                       onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
// // // // // // // // //                     >
// // // // // // // // //                       <i className="fa fa-user" style={{marginRight: '10px', color: '#03a9f4'}}></i> {u.id}
// // // // // // // // //                     </div>
// // // // // // // // //                   ))}
// // // // // // // // //                 </div>
// // // // // // // // //               )}
// // // // // // // // //             </div>

// // // // // // // // //             {/* Password Field */}
// // // // // // // // //             <div style={inputGroupStyle}>
// // // // // // // // //               <i className="fa fa-lock" style={iconStyle}></i>
// // // // // // // // //               <input
// // // // // // // // //                 type="password"
// // // // // // // // //                 placeholder="USER PASSWORD"
// // // // // // // // //                 value={password}
// // // // // // // // //                 onChange={(e) => setPassword(e.target.value)}
// // // // // // // // //                 required
// // // // // // // // //                 style={inputStyle}
// // // // // // // // //               />
// // // // // // // // //             </div>

// // // // // // // // //             {/* Remember Me & Forgot Password */}
// // // // // // // // //             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px' }}>
// // // // // // // // //               <div style={{ display: 'flex', alignItems: 'center' }}>
// // // // // // // // //                 <input 
// // // // // // // // //                   type="checkbox" 
// // // // // // // // //                   id="remember" 
// // // // // // // // //                   checked={rememberMe}
// // // // // // // // //                   onChange={() => setRememberMe(!rememberMe)}
// // // // // // // // //                   style={{ cursor: 'pointer', width: '16px', height: '16px', marginRight: '8px' }} 
// // // // // // // // //                 />
// // // // // // // // //                 <label htmlFor="remember" style={{ color: '#e0e0e0', fontSize: '14px', cursor: 'pointer' }}>Remember me</label>
// // // // // // // // //               </div>
// // // // // // // // //               <Link to="/forgot-password" style={{ color: '#03a9f4', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
// // // // // // // // //                 Forgot Password?
// // // // // // // // //               </Link>
// // // // // // // // //             </div>

// // // // // // // // //             {/* Login Button */}
// // // // // // // // //             <button type="submit" disabled={loading} style={btnStyle}>
// // // // // // // // //               {loading ? 'LOGGING IN...' : 'LOGIN NOW'}
// // // // // // // // //             </button>
// // // // // // // // //           </form>

// // // // // // // // //           {/* Footer Link */}
// // // // // // // // //           <p style={{ textAlign: 'center', marginTop: '25px', color: '#ccc', fontSize: '14px' }}>
// // // // // // // // //               Don't have an account? <Link to="/register" style={{ color: '#03a9f4', textDecoration: 'none', fontWeight: 'bold' }}>Register here</Link>
// // // // // // // // //           </p>

// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default UserLogin;




// // // // // // // // import React, { useState } from "react";
// // // // // // // // import { Link } from "react-router-dom";
// // // // // // // // import {
// // // // // // // //   Gamepad2,
// // // // // // // //   Eye,
// // // // // // // //   EyeOff,
// // // // // // // //   Mail,
// // // // // // // //   LockKeyhole,
// // // // // // // //   ArrowRight,
// // // // // // // //   ShieldCheck,
// // // // // // // //   Zap,
// // // // // // // //   ChevronLeft,
// // // // // // // //   LoaderCircle,
// // // // // // // // } from "lucide-react";

// // // // // // // // export default function Login() {
// // // // // // // //   const [showPassword, setShowPassword] = useState(false);
// // // // // // // //   const [remember, setRemember] = useState(true);
// // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // //   const [email, setEmail] = useState("");
// // // // // // // //   const [password, setPassword] = useState("");
// // // // // // // //   const [message, setMessage] = useState("");

// // // // // // // //   async function handleSubmit(e) {
// // // // // // // //     e.preventDefault();
// // // // // // // //     setMessage("");

// // // // // // // //     // Connect your existing login API here.
// // // // // // // //     // Do not simulate a successful login without authentication.
// // // // // // // //     setMessage(
// // // // // // // //       "Login interface ready. Connect your existing backend API to sign in."
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <div className="zoro-login min-h-screen overflow-hidden bg-[#08050F] text-white">
// // // // // // // //       <style>{`
// // // // // // // //         .zoro-login {
// // // // // // // //           --purple: #A855F7;
// // // // // // // //           --cyan: #67E8F9;
// // // // // // // //           font-family: Inter, ui-sans-serif, system-ui, sans-serif;
// // // // // // // //         }

// // // // // // // //         .zoro-login * { box-sizing: border-box; }
// // // // // // // //         .zoro-login a { text-decoration: none; }

// // // // // // // //         .login-grid {
// // // // // // // //           background-image:
// // // // // // // //             linear-gradient(#a855f70b 1px,transparent 1px),
// // // // // // // //             linear-gradient(90deg,#a855f70b 1px,transparent 1px);
// // // // // // // //           background-size: 40px 40px;
// // // // // // // //           mask-image: linear-gradient(to bottom,black,transparent);
// // // // // // // //         }

// // // // // // // //         .login-gradient {
// // // // // // // //           background: linear-gradient(100deg,#fff,#e9d5ff 50%,#a855f7);
// // // // // // // //           background-clip: text;
// // // // // // // //           -webkit-background-clip: text;
// // // // // // // //           color: transparent;
// // // // // // // //         }

// // // // // // // //         .login-glass {
// // // // // // // //           background: linear-gradient(145deg,rgba(28,15,42,.96),rgba(11,8,18,.97));
// // // // // // // //           border: 1px solid rgba(192,132,252,.24);
// // // // // // // //           box-shadow: 0 30px 100px rgba(0,0,0,.48), 0 0 50px rgba(168,85,247,.08);
// // // // // // // //         }

// // // // // // // //         .login-input {
// // // // // // // //           width: 100%;
// // // // // // // //           min-width: 0;
// // // // // // // //           background: rgba(255,255,255,.025);
// // // // // // // //           border: 1px solid rgba(255,255,255,.12);
// // // // // // // //           color: white;
// // // // // // // //           outline: none;
// // // // // // // //           transition: border-color .2s, box-shadow .2s, background .2s;
// // // // // // // //         }

// // // // // // // //         .login-input:focus {
// // // // // // // //           border-color: rgba(192,132,252,.8);
// // // // // // // //           background: rgba(168,85,247,.04);
// // // // // // // //           box-shadow: 0 0 0 3px rgba(168,85,247,.10);
// // // // // // // //         }

// // // // // // // //         .login-input::placeholder { color: #777080; }

// // // // // // // //         .login-button {
// // // // // // // //           background: linear-gradient(105deg,#9333EA,#6D28D9);
// // // // // // // //           box-shadow: 0 0 25px rgba(147,51,234,.24);
// // // // // // // //           transition: transform .2s, box-shadow .2s;
// // // // // // // //         }

// // // // // // // //         .login-button:hover:not(:disabled) {
// // // // // // // //           transform: translateY(-2px);
// // // // // // // //           box-shadow: 0 0 35px rgba(147,51,234,.4);
// // // // // // // //         }

// // // // // // // //         .login-art {
// // // // // // // //           animation: login-float 7s ease-in-out infinite;
// // // // // // // //         }

// // // // // // // //         @keyframes login-float {
// // // // // // // //           0%,100% { transform: translateY(0); }
// // // // // // // //           50% { transform: translateY(-10px); }
// // // // // // // //         }

// // // // // // // //         @media (prefers-reduced-motion: reduce) {
// // // // // // // //           .login-art { animation: none; }
// // // // // // // //           .zoro-login * { transition: none !important; }
// // // // // // // //         }
// // // // // // // //       `}</style>

// // // // // // // //       {/* BACKGROUND */}
// // // // // // // //       <div className="pointer-events-none fixed inset-0">
// // // // // // // //         <div className="login-grid absolute inset-0" />
// // // // // // // //         <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-purple-700/15 blur-[130px]" />
// // // // // // // //         <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-violet-800/15 blur-[140px]" />
// // // // // // // //       </div>

// // // // // // // //       {/* HEADER */}
// // // // // // // //       <header className="relative z-10 border-b border-white/[0.07]">
// // // // // // // //         <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
// // // // // // // //           <Link to="/" className="flex items-center gap-3">
// // // // // // // //             <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-violet-800 shadow-[0_0_25px_#a855f740]">
// // // // // // // //               <Gamepad2 size={24} />
// // // // // // // //             </span>
// // // // // // // //             <span className="text-lg font-black tracking-tight">
// // // // // // // //               ZORO<span className="text-purple-400"> GAMES</span>
// // // // // // // //               <span className="mt-0.5 block text-[8px] tracking-[.3em] text-white/40">
// // // // // // // //                 ENTER THE NEXT LEVEL
// // // // // // // //               </span>
// // // // // // // //             </span>
// // // // // // // //           </Link>

// // // // // // // //           <Link
// // // // // // // //             to="/"
// // // // // // // //             className="flex items-center gap-2 text-xs font-bold text-white/55 transition hover:text-purple-300"
// // // // // // // //           >
// // // // // // // //             <ChevronLeft size={16} />
// // // // // // // //             BACK TO HOME
// // // // // // // //           </Link>
// // // // // // // //         </div>
// // // // // // // //       </header>

// // // // // // // //       {/* LOGIN CONTENT */}
// // // // // // // //       <main className="relative z-10 mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-16">
// // // // // // // //         {/* LEFT PANEL */}
// // // // // // // //         <section className="hidden lg:block">
// // // // // // // //           <div className="login-art relative mx-auto max-w-lg">
// // // // // // // //             <div className="absolute inset-10 rounded-full bg-purple-700/20 blur-[90px]" />

// // // // // // // //             <div className="relative overflow-hidden rounded-3xl border border-purple-300/20 bg-[#100819]">
// // // // // // // //               <div className="absolute inset-0">
// // // // // // // //                 <img
// // // // // // // //                   src="/images/zoro-hero.png"
// // // // // // // //                   alt=""
// // // // // // // //                   className="h-full w-full object-cover opacity-75"
// // // // // // // //                 />
// // // // // // // //                 <div className="absolute inset-0 bg-gradient-to-t from-[#08050F] via-[#08050F]/30 to-[#08050F]/10" />
// // // // // // // //                 <div className="absolute inset-0 bg-purple-950/20" />
// // // // // // // //               </div>

// // // // // // // //               <div className="relative flex min-h-[510px] flex-col justify-between p-8 xl:p-10">
// // // // // // // //                 <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-300/25 bg-black/40 px-4 py-2 backdrop-blur">
// // // // // // // //                   <Zap size={14} className="text-cyan-300" />
// // // // // // // //                   <span className="text-[10px] font-black tracking-[.2em]">
// // // // // // // //                     YOUR ARENA AWAITS
// // // // // // // //                   </span>
// // // // // // // //                 </div>

// // // // // // // //                 <div>
// // // // // // // //                   <p className="mb-3 text-xs font-black tracking-[.3em] text-purple-300">
// // // // // // // //                     WELCOME BACK, PLAYER
// // // // // // // //                   </p>
// // // // // // // //                   <h1 className="text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
// // // // // // // //                     YOUR GAME.
// // // // // // // //                     <br />
// // // // // // // //                     YOUR <span className="login-gradient">LEGACY.</span>
// // // // // // // //                   </h1>
// // // // // // // //                   <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
// // // // // // // //                     Enter your account, continue your journey and get ready
// // // // // // // //                     for your next gaming adventure.
// // // // // // // //                   </p>

// // // // // // // //                   <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6">
// // // // // // // //                     <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-300/25 bg-purple-500/10">
// // // // // // // //                       <ShieldCheck size={23} className="text-purple-300" />
// // // // // // // //                     </div>
// // // // // // // //                     <div>
// // // // // // // //                       <p className="text-xs font-bold">YOUR ACCOUNT, YOUR CONTROL</p>
// // // // // // // //                       <p className="mt-1 text-[10px] text-white/45">
// // // // // // // //                         Secure authentication when connected to your backend.
// // // // // // // //                       </p>
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </section>

// // // // // // // //         {/* LOGIN FORM */}
// // // // // // // //         <section className="mx-auto w-full max-w-[470px]">
// // // // // // // //           <div className="login-glass rounded-2xl p-6 sm:rounded-3xl sm:p-9 lg:p-10">
// // // // // // // //             <div className="mb-8 text-center lg:text-left">
// // // // // // // //               <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-300/25 bg-purple-500/10 text-purple-300 lg:mx-0">
// // // // // // // //                 <Gamepad2 size={29} />
// // // // // // // //               </div>

// // // // // // // //               <p className="mb-3 text-[10px] font-black tracking-[.28em] text-purple-300">
// // // // // // // //                 PLAYER AUTHENTICATION
// // // // // // // //               </p>

// // // // // // // //               <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
// // // // // // // //                 WELCOME <span className="login-gradient">BACK.</span>
// // // // // // // //               </h2>

// // // // // // // //               <p className="mt-3 text-sm leading-6 text-white/50">
// // // // // // // //                 Sign in to get back into the game.
// // // // // // // //               </p>
// // // // // // // //             </div>

// // // // // // // //             <form onSubmit={handleSubmit} className="space-y-5">
// // // // // // // //               <div>
// // // // // // // //                 <label htmlFor="login-email" className="mb-2 block text-xs font-bold text-white/80">
// // // // // // // //                   Email address
// // // // // // // //                 </label>

// // // // // // // //                 <div className="relative">
// // // // // // // //                   <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />

// // // // // // // //                   <input
// // // // // // // //                     id="login-email"
// // // // // // // //                     name="email"
// // // // // // // //                     type="email"
// // // // // // // //                     autoComplete="email"
// // // // // // // //                     required
// // // // // // // //                     value={email}
// // // // // // // //                     onChange={(e) => {
// // // // // // // //                       setEmail(e.target.value);
// // // // // // // //                       setMessage("");
// // // // // // // //                     }}
// // // // // // // //                     placeholder="you@example.com"
// // // // // // // //                     className="login-input rounded-xl py-4 pl-12 pr-4 text-sm"
// // // // // // // //                   />
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               <div>
// // // // // // // //                 <div className="mb-2 flex items-center justify-between gap-3">
// // // // // // // //                   <label htmlFor="login-password" className="text-xs font-bold text-white/80">
// // // // // // // //                     Password
// // // // // // // //                   </label>

// // // // // // // //                   <Link
// // // // // // // //                     to="/forgot-password"
// // // // // // // //                     className="text-[11px] font-bold text-purple-300 transition hover:text-cyan-300"
// // // // // // // //                   >
// // // // // // // //                     Forgot password?
// // // // // // // //                   </Link>
// // // // // // // //                 </div>

// // // // // // // //                 <div className="relative">
// // // // // // // //                   <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />

// // // // // // // //                   <input
// // // // // // // //                     id="login-password"
// // // // // // // //                     name="password"
// // // // // // // //                     type={showPassword ? "text" : "password"}
// // // // // // // //                     autoComplete="current-password"
// // // // // // // //                     required
// // // // // // // //                     value={password}
// // // // // // // //                     onChange={(e) => {
// // // // // // // //                       setPassword(e.target.value);
// // // // // // // //                       setMessage("");
// // // // // // // //                     }}
// // // // // // // //                     placeholder="Enter your password"
// // // // // // // //                     className="login-input rounded-xl py-4 pl-12 pr-12 text-sm"
// // // // // // // //                   />

// // // // // // // //                   <button
// // // // // // // //                     type="button"
// // // // // // // //                     onClick={() => setShowPassword(!showPassword)}
// // // // // // // //                     aria-label={showPassword ? "Hide password" : "Show password"}
// // // // // // // //                     className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/5 hover:text-purple-300"
// // // // // // // //                   >
// // // // // // // //                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// // // // // // // //                   </button>
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               <label className="flex cursor-pointer items-center gap-3 py-1">
// // // // // // // //                 <input
// // // // // // // //                   type="checkbox"
// // // // // // // //                   checked={remember}
// // // // // // // //                   onChange={(e) => setRemember(e.target.checked)}
// // // // // // // //                   className="h-4 w-4 accent-purple-500"
// // // // // // // //                 />
// // // // // // // //                 <span className="text-xs text-white/60">Remember me on this device</span>
// // // // // // // //               </label>

// // // // // // // //               {message && (
// // // // // // // //                 <div role="status" className="rounded-xl border border-purple-300/20 bg-purple-500/[0.08] p-4 text-xs leading-6 text-purple-100">
// // // // // // // //                   {message}
// // // // // // // //                 </div>
// // // // // // // //               )}

// // // // // // // //               <button
// // // // // // // //                 type="submit"
// // // // // // // //                 disabled={loading}
// // // // // // // //                 className="login-button flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-xs font-black tracking-[.15em] disabled:cursor-not-allowed disabled:opacity-60"
// // // // // // // //               >
// // // // // // // //                 {loading ? (
// // // // // // // //                   <>
// // // // // // // //                     <LoaderCircle size={17} className="animate-spin" />
// // // // // // // //                     SIGNING IN...
// // // // // // // //                   </>
// // // // // // // //                 ) : (
// // // // // // // //                   <>
// // // // // // // //                     ENTER THE ARENA <ArrowRight size={17} />
// // // // // // // //                   </>
// // // // // // // //                 )}
// // // // // // // //               </button>
// // // // // // // //             </form>

// // // // // // // //             <div className="my-7 flex items-center gap-4">
// // // // // // // //               <div className="h-px flex-1 bg-white/10" />
// // // // // // // //               <span className="text-[9px] font-bold tracking-[.2em] text-white/35">
// // // // // // // //                 NEW TO ZORO?
// // // // // // // //               </span>
// // // // // // // //               <div className="h-px flex-1 bg-white/10" />
// // // // // // // //             </div>

// // // // // // // //             <Link
// // // // // // // //               to="/register"
// // // // // // // //               className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-300/30 bg-purple-500/[0.04] px-5 py-4 text-xs font-black tracking-wider text-purple-200 transition hover:border-purple-300/70 hover:bg-purple-500/10"
// // // // // // // //             >
// // // // // // // //               CREATE YOUR ACCOUNT <ArrowRight size={16} />
// // // // // // // //             </Link>

// // // // // // // //             <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-black/15 p-4">
// // // // // // // //               <ShieldCheck size={19} className="mt-0.5 shrink-0 text-cyan-300" />
// // // // // // // //               <p className="text-[10px] leading-5 text-white/45">
// // // // // // // //                 Use your own account credentials only on your trusted ZORO
// // // // // // // //                 GAMES website. Authentication must be verified by the server.
// // // // // // // //               </p>
// // // // // // // //             </div>
// // // // // // // //           </div>

// // // // // // // //           <p className="mt-6 text-center text-[10px] text-white/35">
// // // // // // // //             © {new Date().getFullYear()} ZORO GAMES · ENTER THE NEXT LEVEL
// // // // // // // //           </p>
// // // // // // // //         </section>
// // // // // // // //       </main>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }




// // // // // // // import React, { useState } from "react";
// // // // // // // import { Link } from "react-router-dom";
// // // // // // // import {
// // // // // // //   Gamepad2,
// // // // // // //   Eye,
// // // // // // //   EyeOff,
// // // // // // //   Mail,
// // // // // // //   LockKeyhole,
// // // // // // //   ArrowRight,
// // // // // // //   ShieldCheck,
// // // // // // //   Zap,
// // // // // // //   ChevronLeft,
// // // // // // //   LoaderCircle,
// // // // // // // } from "lucide-react";

// // // // // // // export default function Login() {
// // // // // // //   const [showPassword, setShowPassword] = useState(false);
// // // // // // //   const [remember, setRemember] = useState(true);
// // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // //   const [email, setEmail] = useState("");
// // // // // // //   const [password, setPassword] = useState("");
// // // // // // //   const [message, setMessage] = useState("");

// // // // // // //   async function handleSubmit(e) {
// // // // // // //     e.preventDefault();
// // // // // // //     setMessage("");

// // // // // // //     // Connect your existing login API here.
// // // // // // //     // Do not simulate a successful login without authentication.
// // // // // // //     setMessage(
// // // // // // //       "Login interface ready. Connect your existing backend API to sign in."
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="zoro-login min-h-screen overflow-hidden bg-[#08050F] text-white">
// // // // // // //       <style>{`
// // // // // // //         .zoro-login {
// // // // // // //           --purple: #A855F7;
// // // // // // //           --cyan: #67E8F9;
// // // // // // //           font-family: Inter, ui-sans-serif, system-ui, sans-serif;
// // // // // // //         }

// // // // // // //         .zoro-login * { box-sizing: border-box; }
// // // // // // //         .zoro-login a { text-decoration: none; }

// // // // // // //         .login-gradient {
// // // // // // //           background: linear-gradient(100deg,#fff,#e9d5ff 50%,#a855f7);
// // // // // // //           background-clip: text;
// // // // // // //           -webkit-background-clip: text;
// // // // // // //           color: transparent;
// // // // // // //         }

// // // // // // //         .login-glass {
// // // // // // //           background: linear-gradient(145deg,rgba(28,15,42,.96),rgba(11,8,18,.97));
// // // // // // //           border: 1px solid rgba(192,132,252,.24);
// // // // // // //           box-shadow: 0 30px 100px rgba(0,0,0,.48), 0 0 50px rgba(168,85,247,.08);
// // // // // // //         }

// // // // // // //         .login-input {
// // // // // // //           width: 100%;
// // // // // // //           min-width: 0;
// // // // // // //           background: rgba(255,255,255,.025);
// // // // // // //           border: 1px solid rgba(255,255,255,.12);
// // // // // // //           color: white;
// // // // // // //           outline: none;
// // // // // // //           transition: border-color .2s, box-shadow .2s, background .2s;
// // // // // // //         }

// // // // // // //         .login-input:focus {
// // // // // // //           border-color: rgba(192,132,252,.8);
// // // // // // //           background: rgba(168,85,247,.04);
// // // // // // //           box-shadow: 0 0 0 3px rgba(168,85,247,.10);
// // // // // // //         }

// // // // // // //         .login-input::placeholder { color: #777080; }

// // // // // // //         .login-button {
// // // // // // //           background: linear-gradient(105deg,#9333EA,#6D28D9);
// // // // // // //           box-shadow: 0 0 25px rgba(147,51,234,.24);
// // // // // // //           transition: transform .2s, box-shadow .2s;
// // // // // // //         }

// // // // // // //         .login-button:hover:not(:disabled) {
// // // // // // //           transform: translateY(-2px);
// // // // // // //           box-shadow: 0 0 35px rgba(147,51,234,.4);
// // // // // // //         }

// // // // // // //         .login-art {
// // // // // // //           animation: login-float 7s ease-in-out infinite;
// // // // // // //         }

// // // // // // //         @keyframes login-float {
// // // // // // //           0%,100% { transform: translateY(0); }
// // // // // // //           50% { transform: translateY(-10px); }
// // // // // // //         }

// // // // // // //         @media (prefers-reduced-motion: reduce) {
// // // // // // //           .login-art { animation: none; }
// // // // // // //           .zoro-login * { transition: none !important; }
// // // // // // //         }
// // // // // // //       `}</style>

// // // // // // //       {/* BACKGROUND */}
// // // // // // //       <div className="pointer-events-none fixed inset-0">
// // // // // // //         <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-purple-700/15 blur-[130px]" />
// // // // // // //         <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-violet-800/15 blur-[140px]" />
// // // // // // //       </div>

// // // // // // //       {/* HEADER */}
// // // // // // //       <header className="relative z-10 border-b border-white/[0.07]">
// // // // // // //         <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
// // // // // // //           <Link to="/" className="flex items-center gap-3">
// // // // // // //             <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-violet-800 shadow-[0_0_25px_#a855f740]">
// // // // // // //               <Gamepad2 size={24} />
// // // // // // //             </span>
// // // // // // //             <span className="text-lg font-black tracking-tight">
// // // // // // //               ZORO<span className="text-purple-400"> GAMES</span>
// // // // // // //               <span className="mt-0.5 block text-[8px] tracking-[.3em] text-white/40">
// // // // // // //                 ENTER THE NEXT LEVEL
// // // // // // //               </span>
// // // // // // //             </span>
// // // // // // //           </Link>

// // // // // // //           <Link
// // // // // // //             to="/"
// // // // // // //             className="flex items-center gap-2 text-xs font-bold text-white/55 transition hover:text-purple-300"
// // // // // // //           >
// // // // // // //             <ChevronLeft size={16} />
// // // // // // //             BACK TO HOME
// // // // // // //           </Link>
// // // // // // //         </div>
// // // // // // //       </header>

// // // // // // //       {/* LOGIN CONTENT */}
// // // // // // //       <main className="relative z-10 mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-16">
// // // // // // //         {/* LEFT PANEL */}
// // // // // // //         <section className="hidden lg:block">
// // // // // // //           <div className="login-art relative mx-auto max-w-lg">
// // // // // // //             <div className="absolute inset-10 rounded-full bg-purple-700/20 blur-[90px]" />

// // // // // // //             <div className="relative overflow-hidden rounded-3xl border border-purple-300/20 bg-[#100819]">
// // // // // // //               <div className="absolute inset-0">
// // // // // // //                 <img
// // // // // // //                   src="/images/zoro-hero.png"
// // // // // // //                   alt=""
// // // // // // //                   className="h-full w-full object-cover opacity-75"
// // // // // // //                 />
// // // // // // //                 <div className="absolute inset-0 bg-gradient-to-t from-[#08050F] via-[#08050F]/30 to-[#08050F]/10" />
// // // // // // //                 <div className="absolute inset-0 bg-purple-950/20" />
// // // // // // //               </div>

// // // // // // //               <div className="relative flex min-h-[510px] flex-col justify-between p-8 xl:p-10">
// // // // // // //                 <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-300/25 bg-black/40 px-4 py-2 backdrop-blur">
// // // // // // //                   <Zap size={14} className="text-cyan-300" />
// // // // // // //                   <span className="text-[10px] font-black tracking-[.2em]">
// // // // // // //                     YOUR ARENA AWAITS
// // // // // // //                   </span>
// // // // // // //                 </div>

// // // // // // //                 <div>
// // // // // // //                   <p className="mb-3 text-xs font-black tracking-[.3em] text-purple-300">
// // // // // // //                     WELCOME BACK, PLAYER
// // // // // // //                   </p>
// // // // // // //                   <h1 className="text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
// // // // // // //                     YOUR GAME.
// // // // // // //                     <br />
// // // // // // //                     YOUR <span className="login-gradient">LEGACY.</span>
// // // // // // //                   </h1>
// // // // // // //                   <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
// // // // // // //                     Enter your account, continue your journey and get ready
// // // // // // //                     for your next gaming adventure.
// // // // // // //                   </p>

// // // // // // //                   <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6">
// // // // // // //                     <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-300/25 bg-purple-500/10">
// // // // // // //                       <ShieldCheck size={23} className="text-purple-300" />
// // // // // // //                     </div>
// // // // // // //                     <div>
// // // // // // //                       <p className="text-xs font-bold">YOUR ACCOUNT, YOUR CONTROL</p>
// // // // // // //                       <p className="mt-1 text-[10px] text-white/45">
// // // // // // //                         Secure authentication when connected to your backend.
// // // // // // //                       </p>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </section>

// // // // // // //         {/* LOGIN FORM */}
// // // // // // //         <section className="mx-auto w-full max-w-[470px]">
// // // // // // //           <div className="login-glass rounded-2xl p-6 sm:rounded-3xl sm:p-9 lg:p-10">
// // // // // // //             <div className="mb-8 text-center lg:text-left">
// // // // // // //               <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-300/25 bg-purple-500/10 text-purple-300 lg:mx-0">
// // // // // // //                 <Gamepad2 size={29} />
// // // // // // //               </div>

// // // // // // //               <p className="mb-3 text-[10px] font-black tracking-[.28em] text-purple-300">
// // // // // // //                 PLAYER AUTHENTICATION
// // // // // // //               </p>

// // // // // // //               <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
// // // // // // //                 WELCOME <span className="login-gradient">BACK.</span>
// // // // // // //               </h2>

// // // // // // //               <p className="mt-3 text-sm leading-6 text-white/50">
// // // // // // //                 Sign in to get back into the game.
// // // // // // //               </p>
// // // // // // //             </div>

// // // // // // //             <form onSubmit={handleSubmit} className="space-y-5">
// // // // // // //               <div>
// // // // // // //                 <label htmlFor="login-email" className="mb-2 block text-xs font-bold text-white/80">
// // // // // // //                   Email address
// // // // // // //                 </label>

// // // // // // //                 <div className="relative">
// // // // // // //                   <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />

// // // // // // //                   <input
// // // // // // //                     id="login-email"
// // // // // // //                     name="email"
// // // // // // //                     type="email"
// // // // // // //                     autoComplete="email"
// // // // // // //                     required
// // // // // // //                     value={email}
// // // // // // //                     onChange={(e) => {
// // // // // // //                       setEmail(e.target.value);
// // // // // // //                       setMessage("");
// // // // // // //                     }}
// // // // // // //                     placeholder="you@example.com"
// // // // // // //                     className="login-input rounded-xl py-4 pl-12 pr-4 text-sm"
// // // // // // //                   />
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               <div>
// // // // // // //                 <div className="mb-2 flex items-center justify-between gap-3">
// // // // // // //                   <label htmlFor="login-password" className="text-xs font-bold text-white/80">
// // // // // // //                     Password
// // // // // // //                   </label>

// // // // // // //                   <Link
// // // // // // //                     to="/forgot-password"
// // // // // // //                     className="text-[11px] font-bold text-purple-300 transition hover:text-cyan-300"
// // // // // // //                   >
// // // // // // //                     Forgot password?
// // // // // // //                   </Link>
// // // // // // //                 </div>

// // // // // // //                 <div className="relative">
// // // // // // //                   <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />

// // // // // // //                   <input
// // // // // // //                     id="login-password"
// // // // // // //                     name="password"
// // // // // // //                     type={showPassword ? "text" : "password"}
// // // // // // //                     autoComplete="current-password"
// // // // // // //                     required
// // // // // // //                     value={password}
// // // // // // //                     onChange={(e) => {
// // // // // // //                       setPassword(e.target.value);
// // // // // // //                       setMessage("");
// // // // // // //                     }}
// // // // // // //                     placeholder="Enter your password"
// // // // // // //                     className="login-input rounded-xl py-4 pl-12 pr-12 text-sm"
// // // // // // //                   />

// // // // // // //                   <button
// // // // // // //                     type="button"
// // // // // // //                     onClick={() => setShowPassword(!showPassword)}
// // // // // // //                     aria-label={showPassword ? "Hide password" : "Show password"}
// // // // // // //                     className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/5 hover:text-purple-300"
// // // // // // //                   >
// // // // // // //                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// // // // // // //                   </button>
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               <label className="flex cursor-pointer items-center gap-3 py-1">
// // // // // // //                 <input
// // // // // // //                   type="checkbox"
// // // // // // //                   checked={remember}
// // // // // // //                   onChange={(e) => setRemember(e.target.checked)}
// // // // // // //                   className="h-4 w-4 accent-purple-500"
// // // // // // //                 />
// // // // // // //                 <span className="text-xs text-white/60">Remember me on this device</span>
// // // // // // //               </label>

// // // // // // //               {message && (
// // // // // // //                 <div role="status" className="rounded-xl border border-purple-300/20 bg-purple-500/[0.08] p-4 text-xs leading-6 text-purple-100">
// // // // // // //                   {message}
// // // // // // //                 </div>
// // // // // // //               )}

// // // // // // //               <button
// // // // // // //                 type="submit"
// // // // // // //                 disabled={loading}
// // // // // // //                 className="login-button flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-xs font-black tracking-[.15em] disabled:cursor-not-allowed disabled:opacity-60"
// // // // // // //               >
// // // // // // //                 {loading ? (
// // // // // // //                   <>
// // // // // // //                     <LoaderCircle size={17} className="animate-spin" />
// // // // // // //                     SIGNING IN...
// // // // // // //                   </>
// // // // // // //                 ) : (
// // // // // // //                   <>
// // // // // // //                     ENTER THE ARENA <ArrowRight size={17} />
// // // // // // //                   </>
// // // // // // //                 )}
// // // // // // //               </button>
// // // // // // //             </form>

// // // // // // //             <div className="my-7 flex items-center gap-4">
// // // // // // //               <div className="h-px flex-1 bg-white/10" />
// // // // // // //               <span className="text-[9px] font-bold tracking-[.2em] text-white/35">
// // // // // // //                 NEW TO ZORO?
// // // // // // //               </span>
// // // // // // //               <div className="h-px flex-1 bg-white/10" />
// // // // // // //             </div>

// // // // // // //             <Link
// // // // // // //               to="/register"
// // // // // // //               className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-300/30 bg-purple-500/[0.04] px-5 py-4 text-xs font-black tracking-wider text-purple-200 transition hover:border-purple-300/70 hover:bg-purple-500/10"
// // // // // // //             >
// // // // // // //               CREATE YOUR ACCOUNT <ArrowRight size={16} />
// // // // // // //             </Link>

// // // // // // //             <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-black/15 p-4">
// // // // // // //               <ShieldCheck size={19} className="mt-0.5 shrink-0 text-cyan-300" />
// // // // // // //               <p className="text-[10px] leading-5 text-white/45">
// // // // // // //                 Use your own account credentials only on your trusted ZORO
// // // // // // //                 GAMES website. Authentication must be verified by the server.
// // // // // // //               </p>
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           <p className="mt-6 text-center text-[10px] text-white/35">
// // // // // // //             © {new Date().getFullYear()} ZORO GAMES · ENTER THE NEXT LEVEL
// // // // // // //           </p>
// // // // // // //         </section>
// // // // // // //       </main>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }




// // // // // // import React, { useState } from "react";
// // // // // // import { Link } from "react-router-dom";
// // // // // // import {
// // // // // //   Gamepad2,
// // // // // //   Eye,
// // // // // //   EyeOff,
// // // // // //   Mail,
// // // // // //   LockKeyhole,
// // // // // //   ArrowRight,
// // // // // //   ShieldCheck,
// // // // // //   Zap,
// // // // // //   ChevronLeft,
// // // // // //   LoaderCircle,
// // // // // // } from "lucide-react";

// // // // // // export default function Login() {
// // // // // //   const [showPassword, setShowPassword] = useState(false);
// // // // // //   const [remember, setRemember] = useState(true);
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const [email, setEmail] = useState("");
// // // // // //   const [password, setPassword] = useState("");
// // // // // //   const [message, setMessage] = useState("");

// // // // // //   async function handleSubmit(e) {
// // // // // //     e.preventDefault();
// // // // // //     setMessage("");

// // // // // //     // Connect your existing login API here.
// // // // // //     // Do not simulate a successful login without authentication.
// // // // // //     setMessage(
// // // // // //       "Login interface ready. Connect your existing backend API to sign in."
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="zoro-login min-h-screen overflow-hidden bg-[#08050F] text-white">
// // // // // //       <style>{`
// // // // // //         .zoro-login {
// // // // // //           --purple: #A855F7;
// // // // // //           --cyan: #67E8F9;
// // // // // //           font-family: Inter, ui-sans-serif, system-ui, sans-serif;
// // // // // //         }

// // // // // //         .zoro-login * { box-sizing: border-box; }
// // // // // //         .zoro-login a { text-decoration: none; }

// // // // // //         .login-gradient {
// // // // // //           background: linear-gradient(100deg,#fff,#e9d5ff 50%,#a855f7);
// // // // // //           background-clip: text;
// // // // // //           -webkit-background-clip: text;
// // // // // //           color: transparent;
// // // // // //         }

// // // // // //         .login-glass {
// // // // // //           background: linear-gradient(145deg,rgba(28,15,42,.96),rgba(11,8,18,.97));
// // // // // //           border: 1px solid rgba(192,132,252,.24);
// // // // // //           box-shadow: 0 30px 100px rgba(0,0,0,.48), 0 0 50px rgba(168,85,247,.08);
// // // // // //         }

// // // // // //         .login-input {
// // // // // //           width: 100%;
// // // // // //           min-width: 0;
// // // // // //           background: rgba(255,255,255,.025);
// // // // // //           border: 1px solid rgba(255,255,255,.12);
// // // // // //           color: white;
// // // // // //           outline: none;
// // // // // //           transition: border-color .2s, box-shadow .2s, background .2s;
// // // // // //         }

// // // // // //         .login-input:focus {
// // // // // //           border-color: rgba(192,132,252,.8);
// // // // // //           background: rgba(168,85,247,.04);
// // // // // //           box-shadow: 0 0 0 3px rgba(168,85,247,.10);
// // // // // //         }

// // // // // //         .login-input::placeholder { color: #777080; }

// // // // // //         .login-button {
// // // // // //           background: linear-gradient(105deg,#9333EA,#6D28D9);
// // // // // //           box-shadow: 0 0 25px rgba(147,51,234,.24);
// // // // // //           transition: transform .2s, box-shadow .2s;
// // // // // //         }

// // // // // //         .login-button:hover:not(:disabled) {
// // // // // //           transform: translateY(-2px);
// // // // // //           box-shadow: 0 0 35px rgba(147,51,234,.4);
// // // // // //         }

// // // // // //         .login-art {
// // // // // //           animation: login-float 7s ease-in-out infinite;
// // // // // //         }

// // // // // //         @keyframes login-float {
// // // // // //           0%,100% { transform: translateY(0); }
// // // // // //           50% { transform: translateY(-10px); }
// // // // // //         }

// // // // // //         @media (prefers-reduced-motion: reduce) {
// // // // // //           .login-art { animation: none; }
// // // // // //           .zoro-login * { transition: none !important; }
// // // // // //         }
// // // // // //       `}</style>

// // // // // //       {/* BACKGROUND */}
// // // // // //       <div className="pointer-events-none fixed inset-0">
// // // // // //         <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-purple-700/15 blur-[130px]" />
// // // // // //         <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-violet-800/15 blur-[140px]" />
// // // // // //       </div>

// // // // // //       {/* HEADER */}
// // // // // //       <header className="relative z-10 border-b border-white/[0.07]">
// // // // // //         <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
// // // // // //           <Link to="/" className="flex items-center gap-3">
// // // // // //             <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-violet-800 shadow-[0_0_25px_#a855f740]">
// // // // // //               <Gamepad2 size={24} />
// // // // // //             </span>
// // // // // //             <span className="text-lg font-black tracking-tight">
// // // // // //               ZORO<span className="text-purple-400"> GAMES</span>
// // // // // //               <span className="mt-0.5 block text-[8px] tracking-[.3em] text-white/40">
// // // // // //                 ENTER THE NEXT LEVEL
// // // // // //               </span>
// // // // // //             </span>
// // // // // //           </Link>

// // // // // //           <Link
// // // // // //             to="/"
// // // // // //             className="flex items-center gap-2 text-xs font-bold text-white/55 transition hover:text-purple-300"
// // // // // //           >
// // // // // //             <ChevronLeft size={16} />
// // // // // //             BACK TO HOME
// // // // // //           </Link>
// // // // // //         </div>
// // // // // //       </header>

// // // // // //       {/* LOGIN CONTENT */}
// // // // // //       <main className="relative z-10 mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-16">
// // // // // //         {/* LEFT PANEL */}
// // // // // //         <section className="hidden lg:block">
// // // // // //           <div className="login-art relative mx-auto max-w-lg">
// // // // // //             <div className="absolute inset-10 rounded-full bg-purple-700/20 blur-[90px]" />

// // // // // //             <div className="relative overflow-hidden rounded-3xl border border-purple-300/20 bg-[#100819]">
// // // // // //               <div className="absolute inset-0">
// // // // // //                 <img
// // // // // //                   src="/images/zoro-hero.png"
// // // // // //                   alt=""
// // // // // //                   className="h-full w-full object-cover opacity-75"
// // // // // //                 />
// // // // // //                 <div className="absolute inset-0 bg-gradient-to-t from-[#08050F] via-[#08050F]/30 to-[#08050F]/10" />
// // // // // //                 <div className="absolute inset-0 bg-purple-950/20" />
// // // // // //               </div>

// // // // // //               <div className="relative flex min-h-[510px] flex-col justify-between p-8 xl:p-10">
// // // // // //                 <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-300/25 bg-black/40 px-4 py-2 backdrop-blur">
// // // // // //                   <Zap size={14} className="text-cyan-300" />
// // // // // //                   <span className="text-[10px] font-black tracking-[.2em]">
// // // // // //                     YOUR ARENA AWAITS
// // // // // //                   </span>
// // // // // //                 </div>

// // // // // //                 <div>
// // // // // //                   <p className="mb-3 text-xs font-black tracking-[.3em] text-purple-300">
// // // // // //                     WELCOME BACK, PLAYER
// // // // // //                   </p>
// // // // // //                   <h1 className="text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
// // // // // //                     YOUR GAME.
// // // // // //                     <br />
// // // // // //                     YOUR <span className="login-gradient">LEGACY.</span>
// // // // // //                   </h1>
// // // // // //                   <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
// // // // // //                     Enter your account, continue your journey and get ready
// // // // // //                     for your next gaming adventure.
// // // // // //                   </p>

// // // // // //                   <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6">
// // // // // //                     <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-300/25 bg-purple-500/10">
// // // // // //                       <ShieldCheck size={23} className="text-purple-300" />
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <p className="text-xs font-bold">YOUR ACCOUNT, YOUR CONTROL</p>
// // // // // //                       <p className="mt-1 text-[10px] text-white/45">
// // // // // //                         Secure authentication when connected to your backend.
// // // // // //                       </p>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* LOGIN FORM */}
// // // // // //         <section className="mx-auto w-full max-w-[470px]">
// // // // // //           <div className="login-glass rounded-2xl p-6 sm:rounded-3xl sm:p-9 lg:p-10">
// // // // // //             <div className="mb-8 text-center lg:text-left">
// // // // // //               <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-300/25 bg-purple-500/10 text-purple-300 lg:mx-0">
// // // // // //                 <Gamepad2 size={29} />
// // // // // //               </div>

// // // // // //               <p className="mb-3 text-[10px] font-black tracking-[.28em] text-purple-300">
// // // // // //                 PLAYER AUTHENTICATION
// // // // // //               </p>

// // // // // //               <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
// // // // // //                 WELCOME <span className="login-gradient">BACK.</span>
// // // // // //               </h2>

// // // // // //               <p className="mt-3 text-sm leading-6 text-white/50">
// // // // // //                 Sign in to get back into the game.
// // // // // //               </p>
// // // // // //             </div>

// // // // // //             <form onSubmit={handleSubmit} className="space-y-5">
// // // // // //               <div>
// // // // // //                 <label htmlFor="login-email" className="mb-2 block text-xs font-bold text-white/80">
// // // // // //                   Email address
// // // // // //                 </label>

// // // // // //                 <div className="relative">
// // // // // //                   <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />

// // // // // //                   <input
// // // // // //                     id="login-email"
// // // // // //                     name="email"
// // // // // //                     type="email"
// // // // // //                     autoComplete="email"
// // // // // //                     required
// // // // // //                     value={email}
// // // // // //                     onChange={(e) => {
// // // // // //                       setEmail(e.target.value);
// // // // // //                       setMessage("");
// // // // // //                     }}
// // // // // //                     placeholder="you@example.com"
// // // // // //                     className="login-input rounded-xl py-4 pl-12 pr-4 text-sm"
// // // // // //                   />
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <div>
// // // // // //                 <div className="mb-2 flex items-center justify-between gap-3">
// // // // // //                   <label htmlFor="login-password" className="text-xs font-bold text-white/80">
// // // // // //                     Password
// // // // // //                   </label>

// // // // // //                   <Link
// // // // // //                     to="/forgot-password"
// // // // // //                     className="text-[11px] font-bold text-purple-300 transition hover:text-cyan-300"
// // // // // //                   >
// // // // // //                     Forgot password?
// // // // // //                   </Link>
// // // // // //                 </div>

// // // // // //                 <div className="relative">
// // // // // //                   <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />

// // // // // //                   <input
// // // // // //                     id="login-password"
// // // // // //                     name="password"
// // // // // //                     type={showPassword ? "text" : "password"}
// // // // // //                     autoComplete="current-password"
// // // // // //                     required
// // // // // //                     value={password}
// // // // // //                     onChange={(e) => {
// // // // // //                       setPassword(e.target.value);
// // // // // //                       setMessage("");
// // // // // //                     }}
// // // // // //                     placeholder="Enter your password"
// // // // // //                     className="login-input rounded-xl py-4 pl-12 pr-12 text-sm"
// // // // // //                   />

// // // // // //                   <button
// // // // // //                     type="button"
// // // // // //                     onClick={() => setShowPassword(!showPassword)}
// // // // // //                     aria-label={showPassword ? "Hide password" : "Show password"}
// // // // // //                     className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/5 hover:text-purple-300"
// // // // // //                   >
// // // // // //                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <label className="flex cursor-pointer items-center gap-3 py-1">
// // // // // //                 <input
// // // // // //                   type="checkbox"
// // // // // //                   checked={remember}
// // // // // //                   onChange={(e) => setRemember(e.target.checked)}
// // // // // //                   className="h-4 w-4 accent-purple-500"
// // // // // //                 />
// // // // // //                 <span className="text-xs text-white/60">Remember me on this device</span>
// // // // // //               </label>

// // // // // //               {message && (
// // // // // //                 <div role="status" className="rounded-xl border border-purple-300/20 bg-purple-500/[0.08] p-4 text-xs leading-6 text-purple-100">
// // // // // //                   {message}
// // // // // //                 </div>
// // // // // //               )}

// // // // // //               <button
// // // // // //                 type="submit"
// // // // // //                 disabled={loading}
// // // // // //                 className="login-button flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-xs font-black tracking-[.15em] disabled:cursor-not-allowed disabled:opacity-60"
// // // // // //               >
// // // // // //                 {loading ? (
// // // // // //                   <>
// // // // // //                     <LoaderCircle size={17} className="animate-spin" />
// // // // // //                     SIGNING IN...
// // // // // //                   </>
// // // // // //                 ) : (
// // // // // //                   <>
// // // // // //                     ENTER THE ARENA <ArrowRight size={17} />
// // // // // //                   </>
// // // // // //                 )}
// // // // // //               </button>
// // // // // //             </form>

// // // // // //             <div className="my-7 flex items-center gap-4">
// // // // // //               <div className="h-px flex-1 bg-white/10" />
// // // // // //               <span className="text-[9px] font-bold tracking-[.2em] text-white/35">
// // // // // //                 NEW TO ZORO?
// // // // // //               </span>
// // // // // //               <div className="h-px flex-1 bg-white/10" />
// // // // // //             </div>

// // // // // //             <Link
// // // // // //               to="/register"
// // // // // //               className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-300/30 bg-purple-500/[0.04] px-5 py-4 text-xs font-black tracking-wider text-purple-200 transition hover:border-purple-300/70 hover:bg-purple-500/10"
// // // // // //             >
// // // // // //               CREATE YOUR ACCOUNT <ArrowRight size={16} />
// // // // // //             </Link>

// // // // // //             <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-black/15 p-4">
// // // // // //               <ShieldCheck size={19} className="mt-0.5 shrink-0 text-cyan-300" />
// // // // // //               <p className="text-[10px] leading-5 text-white/45">
// // // // // //                 Use your own account credentials only on your trusted ZORO
// // // // // //                 GAMES website. Authentication must be verified by the server.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           <p className="mt-6 text-center text-[10px] text-white/35">
// // // // // //             © {new Date().getFullYear()} ZORO GAMES · ENTER THE NEXT LEVEL
// // // // // //           </p>
// // // // // //         </section>
// // // // // //       </main>
// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // import React, { useState } from "react";
// // // // // import { Link } from "react-router-dom";
// // // // // import {
// // // // //   Gamepad2,
// // // // //   Eye,
// // // // //   EyeOff,
// // // // //   UserRound,
// // // // //   LockKeyhole,
// // // // //   ArrowRight,
// // // // //   ShieldCheck,
// // // // //   Zap,
// // // // //   ChevronLeft,
// // // // //   LoaderCircle,
// // // // // } from "lucide-react";

// // // // // export default function Login() {
// // // // //   const [showPassword, setShowPassword] = useState(false);
// // // // //   const [remember, setRemember] = useState(true);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [userId, setUserId] = useState("");
// // // // //   const [password, setPassword] = useState("");
// // // // //   const [message, setMessage] = useState("");

// // // // //   async function handleSubmit(e) {
// // // // //     e.preventDefault();
// // // // //     setMessage("");

// // // // //     // Connect your existing login API here.
// // // // //     // Do not simulate a successful login without authentication.
// // // // //     if (!userId.trim() || !password) {
// // // // //       setMessage("Please enter your User ID and password.");
// // // // //       return;
// // // // //     }

// // // // //     // Keep your existing backend authentication integration here.
// // // // //     // This UI does not report a successful login without server verification.
// // // // //     setMessage("Login form is ready, but the existing login API must be connected to verify your User ID and password.");
// // // // //   }

// // // // //   return (
// // // // //     <div className="zoro-login min-h-screen overflow-hidden bg-[#08050F] text-white">
// // // // //       <style>{`
// // // // //         .zoro-login {
// // // // //           --purple: #A855F7;
// // // // //           --cyan: #67E8F9;
// // // // //           font-family: Inter, ui-sans-serif, system-ui, sans-serif;
// // // // //         }

// // // // //         .zoro-login * { box-sizing: border-box; }
// // // // //         .zoro-login a { text-decoration: none; }
// // // // // .login-gradient {
// // // // //           background: linear-gradient(100deg,#fff,#e9d5ff 50%,#a855f7);
// // // // //           background-clip: text;
// // // // //           -webkit-background-clip: text;
// // // // //           color: transparent;
// // // // //         }

// // // // //         .login-glass {
// // // // //           background: linear-gradient(145deg,rgba(28,15,42,.96),rgba(11,8,18,.97));
// // // // //           border: 1px solid rgba(192,132,252,.24);
// // // // //           box-shadow: 0 30px 100px rgba(0,0,0,.48), 0 0 50px rgba(168,85,247,.08);
// // // // //         }

// // // // //         .login-input {
// // // // //           width: 100%;
// // // // //           min-width: 0;
// // // // //           background: rgba(255,255,255,.025);
// // // // //           border: 1px solid rgba(255,255,255,.12);
// // // // //           color: white;
// // // // //           outline: none;
// // // // //           transition: border-color .2s, box-shadow .2s, background .2s;
// // // // //         }

// // // // //         .login-input:focus {
// // // // //           border-color: rgba(192,132,252,.8);
// // // // //           background: rgba(168,85,247,.04);
// // // // //           box-shadow: 0 0 0 3px rgba(168,85,247,.10);
// // // // //         }

// // // // //         .login-input::placeholder { color: #777080; }

// // // // //         .login-button {
// // // // //           background: linear-gradient(105deg,#9333EA,#6D28D9);
// // // // //           box-shadow: 0 0 25px rgba(147,51,234,.24);
// // // // //           transition: transform .2s, box-shadow .2s;
// // // // //         }

// // // // //         .login-button:hover:not(:disabled) {
// // // // //           transform: translateY(-2px);
// // // // //           box-shadow: 0 0 35px rgba(147,51,234,.4);
// // // // //         }

// // // // //         .login-art {
// // // // //           animation: login-float 7s ease-in-out infinite;
// // // // //         }

// // // // //         @keyframes login-float {
// // // // //           0%,100% { transform: translateY(0); }
// // // // //           50% { transform: translateY(-10px); }
// // // // //         }

// // // // //         @media (prefers-reduced-motion: reduce) {
// // // // //           .login-art { animation: none; }
// // // // //           .zoro-login * { transition: none !important; }
// // // // //         }
// // // // //       `}</style>

// // // // //       {/* BACKGROUND */}
// // // // //       <div className="pointer-events-none fixed inset-0">
// // // // //           <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-purple-700/15 blur-[130px]" />
// // // // //         <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-violet-800/15 blur-[140px]" />
// // // // //       </div>

// // // // //       {/* HEADER */}
// // // // //       <header className="relative z-10 border-b border-white/[0.07]">
// // // // //         <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
// // // // //           <Link to="/" className="flex items-center gap-3">
// // // // //             <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-violet-800 shadow-[0_0_25px_#a855f740]">
// // // // //               <Gamepad2 size={24} />
// // // // //             </span>
// // // // //             <span className="text-lg font-black tracking-tight">
// // // // //               ZORO<span className="text-purple-400"> GAMES</span>
// // // // //               <span className="mt-0.5 block text-[8px] tracking-[.3em] text-white/40">
// // // // //                 ENTER THE NEXT LEVEL
// // // // //               </span>
// // // // //             </span>
// // // // //           </Link>

// // // // //           <Link
// // // // //             to="/"
// // // // //             className="flex items-center gap-2 text-xs font-bold text-white/55 transition hover:text-purple-300"
// // // // //           >
// // // // //             <ChevronLeft size={16} />
// // // // //             BACK TO HOME
// // // // //           </Link>
// // // // //         </div>
// // // // //       </header>

// // // // //       {/* LOGIN CONTENT */}
// // // // //       <main className="relative z-10 mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-16">
// // // // //         {/* LEFT PANEL */}
// // // // //         <section className="hidden lg:block">
// // // // //           <div className="login-art relative mx-auto max-w-lg">
// // // // //             <div className="absolute inset-10 rounded-full bg-purple-700/20 blur-[90px]" />

// // // // //             <div className="relative overflow-hidden rounded-3xl border border-purple-300/20 bg-[#100819]">
// // // // //               <div className="absolute inset-0">
// // // // //                 <img
// // // // //                   src="/images/zoro-hero.png"
// // // // //                   alt=""
// // // // //                   className="h-full w-full object-cover opacity-75"
// // // // //                 />
// // // // //                 <div className="absolute inset-0 bg-gradient-to-t from-[#08050F] via-[#08050F]/30 to-[#08050F]/10" />
// // // // //                 <div className="absolute inset-0 bg-purple-950/20" />
// // // // //               </div>

// // // // //               <div className="relative flex min-h-[510px] flex-col justify-between p-8 xl:p-10">
// // // // //                 <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-300/25 bg-black/40 px-4 py-2 backdrop-blur">
// // // // //                   <Zap size={14} className="text-cyan-300" />
// // // // //                   <span className="text-[10px] font-black tracking-[.2em]">
// // // // //                     YOUR ARENA AWAITS
// // // // //                   </span>
// // // // //                 </div>

// // // // //                 <div>
// // // // //                   <p className="mb-3 text-xs font-black tracking-[.3em] text-purple-300">
// // // // //                     WELCOME BACK, PLAYER
// // // // //                   </p>
// // // // //                   <h1 className="text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
// // // // //                     YOUR GAME.
// // // // //                     <br />
// // // // //                     YOUR <span className="login-gradient">LEGACY.</span>
// // // // //                   </h1>
// // // // //                   <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
// // // // //                     Enter your account, continue your journey and get ready
// // // // //                     for your next gaming adventure.
// // // // //                   </p>

// // // // //                   <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6">
// // // // //                     <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-300/25 bg-purple-500/10">
// // // // //                       <ShieldCheck size={23} className="text-purple-300" />
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="text-xs font-bold">YOUR ACCOUNT, YOUR CONTROL</p>
// // // // //                       <p className="mt-1 text-[10px] text-white/45">
// // // // //                         Secure authentication when connected to your backend.
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </section>

// // // // //         {/* LOGIN FORM */}
// // // // //         <section className="mx-auto w-full max-w-[470px]">
// // // // //           <div className="login-glass rounded-2xl p-6 sm:rounded-3xl sm:p-9 lg:p-10">
// // // // //             <div className="mb-8 text-center lg:text-left">
// // // // //               <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-300/25 bg-purple-500/10 text-purple-300 lg:mx-0">
// // // // //                 <Gamepad2 size={29} />
// // // // //               </div>

// // // // //               <p className="mb-3 text-[10px] font-black tracking-[.28em] text-purple-300">
// // // // //                 PLAYER AUTHENTICATION
// // // // //               </p>

// // // // //               <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
// // // // //                 WELCOME <span className="login-gradient">BACK.</span>
// // // // //               </h2>

// // // // //               <p className="mt-3 text-sm leading-6 text-white/50">
// // // // //                 Sign in to get back into the game.
// // // // //               </p>
// // // // //             </div>

// // // // //             <form onSubmit={handleSubmit} className="space-y-5">
// // // // //               <div>
// // // // //                 <label htmlFor="login-user-id" className="mb-2 block text-xs font-bold text-white/80">
// // // // //                   User ID
// // // // //                 </label>

// // // // //                 <div className="relative">
// // // // //                   <UserRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />

// // // // //                   <input
// // // // //                     id="login-user-id"
// // // // //                     name="userId"
// // // // //                     type="text"
// // // // //                     autoComplete="username"
// // // // //                     required
// // // // //                     value={userId}
// // // // //                     onChange={(e) => {
// // // // //                       setUserId(e.target.value);
// // // // //                       setMessage("");
// // // // //                     }}
// // // // //                     placeholder="Enter your user ID"
// // // // //                     className="login-input rounded-xl py-4 pl-12 pr-4 text-sm"
// // // // //                   />
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div>
// // // // //                 <div className="mb-2 flex items-center justify-between gap-3">
// // // // //                   <label htmlFor="login-password" className="text-xs font-bold text-white/80">
// // // // //                     Password
// // // // //                   </label>

// // // // //                   <Link
// // // // //                     to="/forgot-password"
// // // // //                     className="text-[11px] font-bold text-purple-300 transition hover:text-cyan-300"
// // // // //                   >
// // // // //                     Forgot password?
// // // // //                   </Link>
// // // // //                 </div>

// // // // //                 <div className="relative">
// // // // //                   <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />

// // // // //                   <input
// // // // //                     id="login-password"
// // // // //                     name="password"
// // // // //                     type={showPassword ? "text" : "password"}
// // // // //                     autoComplete="current-password"
// // // // //                     required
// // // // //                     value={password}
// // // // //                     onChange={(e) => {
// // // // //                       setPassword(e.target.value);
// // // // //                       setMessage("");
// // // // //                     }}
// // // // //                     placeholder="Enter your password"
// // // // //                     className="login-input rounded-xl py-4 pl-12 pr-12 text-sm"
// // // // //                   />

// // // // //                   <button
// // // // //                     type="button"
// // // // //                     onClick={() => setShowPassword(!showPassword)}
// // // // //                     aria-label={showPassword ? "Hide password" : "Show password"}
// // // // //                     className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/5 hover:text-purple-300"
// // // // //                   >
// // // // //                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <label className="flex cursor-pointer items-center gap-3 py-1">
// // // // //                 <input
// // // // //                   type="checkbox"
// // // // //                   checked={remember}
// // // // //                   onChange={(e) => setRemember(e.target.checked)}
// // // // //                   className="h-4 w-4 accent-purple-500"
// // // // //                 />
// // // // //                 <span className="text-xs text-white/60">Remember me on this device</span>
// // // // //               </label>

// // // // //               {message && (
// // // // //                 <div role="status" className="rounded-xl border border-purple-300/20 bg-purple-500/[0.08] p-4 text-xs leading-6 text-purple-100">
// // // // //                   {message}
// // // // //                 </div>
// // // // //               )}

// // // // //               <button
// // // // //                 type="submit"
// // // // //                 disabled={loading}
// // // // //                 className="login-button flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-xs font-black tracking-[.15em] disabled:cursor-not-allowed disabled:opacity-60"
// // // // //               >
// // // // //                 {loading ? (
// // // // //                   <>
// // // // //                     <LoaderCircle size={17} className="animate-spin" />
// // // // //                     SIGNING IN...
// // // // //                   </>
// // // // //                 ) : (
// // // // //                   <>
// // // // //                     ENTER THE ARENA <ArrowRight size={17} />
// // // // //                   </>
// // // // //                 )}
// // // // //               </button>
// // // // //             </form>

// // // // //             <div className="my-7 flex items-center gap-4">
// // // // //               <div className="h-px flex-1 bg-white/10" />
// // // // //               <span className="text-[9px] font-bold tracking-[.2em] text-white/35">
// // // // //                 NEW TO ZORO?
// // // // //               </span>
// // // // //               <div className="h-px flex-1 bg-white/10" />
// // // // //             </div>

// // // // //             <Link
// // // // //               to="/register"
// // // // //               className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-300/30 bg-purple-500/[0.04] px-5 py-4 text-xs font-black tracking-wider text-purple-200 transition hover:border-purple-300/70 hover:bg-purple-500/10"
// // // // //             >
// // // // //               CREATE YOUR ACCOUNT <ArrowRight size={16} />
// // // // //             </Link>

// // // // //             <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-black/15 p-4">
// // // // //               <ShieldCheck size={19} className="mt-0.5 shrink-0 text-cyan-300" />
// // // // //               <p className="text-[10px] leading-5 text-white/45">
// // // // //                 Use your own account credentials only on your trusted ZORO
// // // // //                 GAMES website. Authentication must be verified by the server.
// // // // //               </p>
// // // // //             </div>
// // // // //           </div>

// // // // //           <p className="mt-6 text-center text-[10px] text-white/35">
// // // // //             © {new Date().getFullYear()} ZORO GAMES · ENTER THE NEXT LEVEL
// // // // //           </p>
// // // // //         </section>
// // // // //       </main>
// // // // //     </div>
// // // // //   );
// // // // // }



// // // // import React, { useState } from "react";
// // // // import { Link, useNavigate } from "react-router-dom";
// // // // import api from "../../api/axios";
// // // // import {
// // // //   Gamepad2,
// // // //   Eye,
// // // //   EyeOff,
// // // //   UserRound,
// // // //   LockKeyhole,
// // // //   ArrowRight,
// // // //   ShieldCheck,
// // // //   Zap,
// // // //   ChevronLeft,
// // // //   LoaderCircle,
// // // // } from "lucide-react";

// // // // export default function Login() {
// // // //   const navigate = useNavigate();
// // // //   const [showPassword, setShowPassword] = useState(false);
// // // //   const [remember, setRemember] = useState(true);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [userId, setUserId] = useState("");
// // // //   const [password, setPassword] = useState("");
// // // //   const [message, setMessage] = useState("");

// // // //   async function handleSubmit(e) {
// // // //     e.preventDefault();
// // // //     setMessage("");

// // // //     const cleanUserId = userId.trim();
// // // //     if (!cleanUserId || !password) {
// // // //       setMessage("Please enter your User ID and password.");
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     try {
// // // //       // Reuse a stable device ID so the backend's device-block check can work.
// // // //       let deviceId = localStorage.getItem("deviceId");
// // // //       if (!deviceId) {
// // // //         deviceId =
// // // //           typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
// // // //             ? crypto.randomUUID()
// // // //             : `device-${Date.now()}-${Math.random().toString(36).slice(2)}`;
// // // //         localStorage.setItem("deviceId", deviceId);
// // // //       }

// // // //       const response = await api.post("/login", {
// // // //         userId: cleanUserId,
// // // //         password,
// // // //         deviceId,
// // // //       });

// // // //       const data = response?.data || {};
// // // //       if (!data.token || !data.user) {
// // // //         setMessage(data.message || "Login response was incomplete. Please try again.");
// // // //         return;
// // // //       }

// // // //       localStorage.setItem("token", data.token);
// // // //       localStorage.setItem("user", JSON.stringify(data.user));
// // // //       navigate(data.user.userId ? `/dashboard/${encodeURIComponent(data.user.userId)}` : "/dashboard");
// // // //     } catch (error) {
// // // //       const status = error?.response?.status;
// // // //       const serverMessage = error?.response?.data?.message;
// // // //       if (status === 403 && !serverMessage) {
// // // //         setMessage("Your account is blocked. Please contact support.");
// // // //       } else {
// // // //         setMessage(serverMessage || error?.message || "Unable to log in. Please try again.");
// // // //       }
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }

// // // //   return (
// // // //     <div className="zoro-login min-h-screen overflow-hidden bg-[#08050F] text-white">
// // // //       <style>{`
// // // //         .zoro-login {
// // // //           --purple: #A855F7;
// // // //           --cyan: #67E8F9;
// // // //           font-family: Inter, ui-sans-serif, system-ui, sans-serif;
// // // //         }

// // // //         .zoro-login * { box-sizing: border-box; }
// // // //         .zoro-login a { text-decoration: none; }
// // // // .login-gradient {
// // // //           background: linear-gradient(100deg,#fff,#e9d5ff 50%,#a855f7);
// // // //           background-clip: text;
// // // //           -webkit-background-clip: text;
// // // //           color: transparent;
// // // //         }

// // // //         .login-glass {
// // // //           background: linear-gradient(145deg,rgba(28,15,42,.96),rgba(11,8,18,.97));
// // // //           border: 1px solid rgba(192,132,252,.24);
// // // //           box-shadow: 0 30px 100px rgba(0,0,0,.48), 0 0 50px rgba(168,85,247,.08);
// // // //         }

// // // //         .login-input {
// // // //           width: 100%;
// // // //           min-width: 0;
// // // //           background: rgba(255,255,255,.025);
// // // //           border: 1px solid rgba(255,255,255,.12);
// // // //           color: white;
// // // //           outline: none;
// // // //           transition: border-color .2s, box-shadow .2s, background .2s;
// // // //         }

// // // //         .login-input:focus {
// // // //           border-color: rgba(192,132,252,.8);
// // // //           background: rgba(168,85,247,.04);
// // // //           box-shadow: 0 0 0 3px rgba(168,85,247,.10);
// // // //         }

// // // //         .login-input::placeholder { color: #777080; }

// // // //         .login-button {
// // // //           background: linear-gradient(105deg,#9333EA,#6D28D9);
// // // //           box-shadow: 0 0 25px rgba(147,51,234,.24);
// // // //           transition: transform .2s, box-shadow .2s;
// // // //         }

// // // //         .login-button:hover:not(:disabled) {
// // // //           transform: translateY(-2px);
// // // //           box-shadow: 0 0 35px rgba(147,51,234,.4);
// // // //         }

// // // //         .login-art {
// // // //           animation: login-float 7s ease-in-out infinite;
// // // //         }

// // // //         @keyframes login-float {
// // // //           0%,100% { transform: translateY(0); }
// // // //           50% { transform: translateY(-10px); }
// // // //         }

// // // //         @media (prefers-reduced-motion: reduce) {
// // // //           .login-art { animation: none; }
// // // //           .zoro-login * { transition: none !important; }
// // // //         }
// // // //       `}</style>

// // // //       {/* BACKGROUND */}
// // // //       <div className="pointer-events-none fixed inset-0">
// // // //           <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-purple-700/15 blur-[130px]" />
// // // //         <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-violet-800/15 blur-[140px]" />
// // // //       </div>

// // // //       {/* HEADER */}
// // // //       <header className="relative z-10 border-b border-white/[0.07]">
// // // //         <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
// // // //           <Link to="/" className="flex items-center gap-3">
// // // //             <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-violet-800 shadow-[0_0_25px_#a855f740]">
// // // //               <Gamepad2 size={24} />
// // // //             </span>
// // // //             <span className="text-lg font-black tracking-tight">
// // // //               ZORO<span className="text-purple-400"> GAMES</span>
// // // //               <span className="mt-0.5 block text-[8px] tracking-[.3em] text-white/40">
// // // //                 ENTER THE NEXT LEVEL
// // // //               </span>
// // // //             </span>
// // // //           </Link>

// // // //           <Link
// // // //             to="/"
// // // //             className="flex items-center gap-2 text-xs font-bold text-white/55 transition hover:text-purple-300"
// // // //           >
// // // //             <ChevronLeft size={16} />
// // // //             BACK TO HOME
// // // //           </Link>
// // // //         </div>
// // // //       </header>

// // // //       {/* LOGIN CONTENT */}
// // // //       <main className="relative z-10 mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-16">
// // // //         {/* LEFT PANEL */}
// // // //         <section className="hidden lg:block">
// // // //           <div className="login-art relative mx-auto max-w-lg">
// // // //             <div className="absolute inset-10 rounded-full bg-purple-700/20 blur-[90px]" />

// // // //             <div className="relative overflow-hidden rounded-3xl border border-purple-300/20 bg-[#100819]">
// // // //               <div className="absolute inset-0">
// // // //                 <img
// // // //                   src="/images/zoro-hero.png"
// // // //                   alt=""
// // // //                   className="h-full w-full object-cover opacity-75"
// // // //                 />
// // // //                 <div className="absolute inset-0 bg-gradient-to-t from-[#08050F] via-[#08050F]/30 to-[#08050F]/10" />
// // // //                 <div className="absolute inset-0 bg-purple-950/20" />
// // // //               </div>

// // // //               <div className="relative flex min-h-[510px] flex-col justify-between p-8 xl:p-10">
// // // //                 <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-300/25 bg-black/40 px-4 py-2 backdrop-blur">
// // // //                   <Zap size={14} className="text-cyan-300" />
// // // //                   <span className="text-[10px] font-black tracking-[.2em]">
// // // //                     YOUR ARENA AWAITS
// // // //                   </span>
// // // //                 </div>

// // // //                 <div>
// // // //                   <p className="mb-3 text-xs font-black tracking-[.3em] text-purple-300">
// // // //                     WELCOME BACK, PLAYER
// // // //                   </p>
// // // //                   <h1 className="text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
// // // //                     YOUR GAME.
// // // //                     <br />
// // // //                     YOUR <span className="login-gradient">LEGACY.</span>
// // // //                   </h1>
// // // //                   <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
// // // //                     Enter your account, continue your journey and get ready
// // // //                     for your next gaming adventure.
// // // //                   </p>

// // // //                   <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6">
// // // //                     <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-300/25 bg-purple-500/10">
// // // //                       <ShieldCheck size={23} className="text-purple-300" />
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="text-xs font-bold">YOUR ACCOUNT, YOUR CONTROL</p>
// // // //                       <p className="mt-1 text-[10px] text-white/45">
// // // //                         Secure authentication when connected to your backend.
// // // //                       </p>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </section>

// // // //         {/* LOGIN FORM */}
// // // //         <section className="mx-auto w-full max-w-[470px]">
// // // //           <div className="login-glass rounded-2xl p-6 sm:rounded-3xl sm:p-9 lg:p-10">
// // // //             <div className="mb-8 text-center lg:text-left">
// // // //               <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-300/25 bg-purple-500/10 text-purple-300 lg:mx-0">
// // // //                 <Gamepad2 size={29} />
// // // //               </div>

// // // //               <p className="mb-3 text-[10px] font-black tracking-[.28em] text-purple-300">
// // // //                 PLAYER AUTHENTICATION
// // // //               </p>

// // // //               <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
// // // //                 WELCOME <span className="login-gradient">BACK.</span>
// // // //               </h2>

// // // //               <p className="mt-3 text-sm leading-6 text-white/50">
// // // //                 Sign in to get back into the game.
// // // //               </p>
// // // //             </div>

// // // //             <form onSubmit={handleSubmit} className="space-y-5">
// // // //               <div>
// // // //                 <label htmlFor="login-user-id" className="mb-2 block text-xs font-bold text-white/80">
// // // //                   User ID
// // // //                 </label>

// // // //                 <div className="relative">
// // // //                   <UserRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />

// // // //                   <input
// // // //                     id="login-user-id"
// // // //                     name="userId"
// // // //                     type="text"
// // // //                     autoComplete="username"
// // // //                     required
// // // //                     value={userId}
// // // //                     onChange={(e) => {
// // // //                       setUserId(e.target.value);
// // // //                       setMessage("");
// // // //                     }}
// // // //                     placeholder="Enter your user ID"
// // // //                     className="login-input rounded-xl py-4 pl-12 pr-4 text-sm"
// // // //                   />
// // // //                 </div>
// // // //               </div>

// // // //               <div>
// // // //                 <div className="mb-2 flex items-center justify-between gap-3">
// // // //                   <label htmlFor="login-password" className="text-xs font-bold text-white/80">
// // // //                     Password
// // // //                   </label>

// // // //                   <Link
// // // //                     to="/forgot-password"
// // // //                     className="text-[11px] font-bold text-purple-300 transition hover:text-cyan-300"
// // // //                   >
// // // //                     Forgot password?
// // // //                   </Link>
// // // //                 </div>

// // // //                 <div className="relative">
// // // //                   <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />

// // // //                   <input
// // // //                     id="login-password"
// // // //                     name="password"
// // // //                     type={showPassword ? "text" : "password"}
// // // //                     autoComplete="current-password"
// // // //                     required
// // // //                     value={password}
// // // //                     onChange={(e) => {
// // // //                       setPassword(e.target.value);
// // // //                       setMessage("");
// // // //                     }}
// // // //                     placeholder="Enter your password"
// // // //                     className="login-input rounded-xl py-4 pl-12 pr-12 text-sm"
// // // //                   />

// // // //                   <button
// // // //                     type="button"
// // // //                     onClick={() => setShowPassword(!showPassword)}
// // // //                     aria-label={showPassword ? "Hide password" : "Show password"}
// // // //                     className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/5 hover:text-purple-300"
// // // //                   >
// // // //                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// // // //                   </button>
// // // //                 </div>
// // // //               </div>

// // // //               <label className="flex cursor-pointer items-center gap-3 py-1">
// // // //                 <input
// // // //                   type="checkbox"
// // // //                   checked={remember}
// // // //                   onChange={(e) => setRemember(e.target.checked)}
// // // //                   className="h-4 w-4 accent-purple-500"
// // // //                 />
// // // //                 <span className="text-xs text-white/60">Remember me on this device</span>
// // // //               </label>

// // // //               {message && (
// // // //                 <div role="status" className="rounded-xl border border-purple-300/20 bg-purple-500/[0.08] p-4 text-xs leading-6 text-purple-100">
// // // //                   {message}
// // // //                 </div>
// // // //               )}

// // // //               <button
// // // //                 type="submit"
// // // //                 disabled={loading}
// // // //                 className="login-button flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-xs font-black tracking-[.15em] disabled:cursor-not-allowed disabled:opacity-60"
// // // //               >
// // // //                 {loading ? (
// // // //                   <>
// // // //                     <LoaderCircle size={17} className="animate-spin" />
// // // //                     SIGNING IN...
// // // //                   </>
// // // //                 ) : (
// // // //                   <>
// // // //                     ENTER THE ARENA <ArrowRight size={17} />
// // // //                   </>
// // // //                 )}
// // // //               </button>
// // // //             </form>

// // // //             <div className="my-7 flex items-center gap-4">
// // // //               <div className="h-px flex-1 bg-white/10" />
// // // //               <span className="text-[9px] font-bold tracking-[.2em] text-white/35">
// // // //                 NEW TO ZORO?
// // // //               </span>
// // // //               <div className="h-px flex-1 bg-white/10" />
// // // //             </div>

// // // //             <Link
// // // //               to="/register"
// // // //               className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-300/30 bg-purple-500/[0.04] px-5 py-4 text-xs font-black tracking-wider text-purple-200 transition hover:border-purple-300/70 hover:bg-purple-500/10"
// // // //             >
// // // //               CREATE YOUR ACCOUNT <ArrowRight size={16} />
// // // //             </Link>

// // // //             <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-black/15 p-4">
// // // //               <ShieldCheck size={19} className="mt-0.5 shrink-0 text-cyan-300" />
// // // //               <p className="text-[10px] leading-5 text-white/45">
// // // //                 Use your own account credentials only on your trusted ZORO
// // // //                 GAMES website. Authentication must be verified by the server.
// // // //               </p>
// // // //             </div>
// // // //           </div>

// // // //           <p className="mt-6 text-center text-[10px] text-white/35">
// // // //             © {new Date().getFullYear()} ZORO GAMES · ENTER THE NEXT LEVEL
// // // //           </p>
// // // //         </section>
// // // //       </main>
// // // //     </div>
// // // //   );
// // // // }



// // // import React, { useState } from "react";
// // // import { Link, useNavigate, useLocation } from "react-router-dom";
// // // import { useAuth } from "../../context/AuthContext";
// // // import FingerprintJS from "@fingerprintjs/fingerprintjs";
// // // import api from "../../api/axios";
// // // import {
// // //   Gamepad2,
// // //   Eye,
// // //   EyeOff,
// // //   UserRound,
// // //   LockKeyhole,
// // //   ArrowRight,
// // //   ShieldCheck,
// // //   Zap,
// // //   ChevronLeft,
// // //   LoaderCircle,
// // // } from "lucide-react";

// // // export default function Login() {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const { login } = useAuth();
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [remember, setRemember] = useState(true);
// // //   const [loading, setLoading] = useState(false);
// // //   const [userId, setUserId] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [message, setMessage] = useState("");

// // //   async function handleSubmit(e) {
// // //     e.preventDefault();
// // //     setMessage("");

// // //     const cleanUserId = userId.trim();
// // //     if (!cleanUserId || !password) {
// // //       setMessage("Please enter your User ID and password.");
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     try {
// // //       const fp = await FingerprintJS.load();
// // //       const fingerprint = await fp.get();
// // //       const deviceId = fingerprint.visitorId;

// // //       const response = await api.post("/auth/login", {
// // //         userId: cleanUserId,
// // //         password,
// // //         deviceId,
// // //       });

// // //       const data = response?.data || {};
// // //       if (!data.token || !data.user) {
// // //         setMessage(data.message || "Login response was incomplete. Please try again.");
// // //         return;
// // //       }

// // //       localStorage.setItem("token", data.token);
// // //       localStorage.setItem("user", JSON.stringify(data.user));
// // //       login(data.user, data.token);
// // //       navigate("/dashboard", { replace: true });
// // //     } catch (error) {
// // //       const status = error?.response?.status;
// // //       const serverMessage = error?.response?.data?.message;
// // //       if (status === 403 && !serverMessage) {
// // //         setMessage("Your account is blocked. Please contact support.");
// // //       } else {
// // //         setMessage(serverMessage || error?.message || "Unable to log in. Please try again.");
// // //       }
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }

// // //   return (
// // //     <div className="zoro-login min-h-screen overflow-hidden bg-[#08050F] text-white">
// // //       <style>{`
// // //         .zoro-login {
// // //           --purple: #A855F7;
// // //           --cyan: #67E8F9;
// // //           font-family: Inter, ui-sans-serif, system-ui, sans-serif;
// // //         }

// // //         .zoro-login * { box-sizing: border-box; }
// // //         .zoro-login a { text-decoration: none; }
// // // .login-gradient {
// // //           background: linear-gradient(100deg,#fff,#e9d5ff 50%,#a855f7);
// // //           background-clip: text;
// // //           -webkit-background-clip: text;
// // //           color: transparent;
// // //         }

// // //         .login-glass {
// // //           background: linear-gradient(145deg,rgba(28,15,42,.96),rgba(11,8,18,.97));
// // //           border: 1px solid rgba(192,132,252,.24);
// // //           box-shadow: 0 30px 100px rgba(0,0,0,.48), 0 0 50px rgba(168,85,247,.08);
// // //         }

// // //         .login-input {
// // //           width: 100%;
// // //           min-width: 0;
// // //           background: rgba(255,255,255,.025);
// // //           border: 1px solid rgba(255,255,255,.12);
// // //           color: white;
// // //           outline: none;
// // //           transition: border-color .2s, box-shadow .2s, background .2s;
// // //         }

// // //         .login-input:focus {
// // //           border-color: rgba(192,132,252,.8);
// // //           background: rgba(168,85,247,.04);
// // //           box-shadow: 0 0 0 3px rgba(168,85,247,.10);
// // //         }

// // //         .login-input::placeholder { color: #777080; }

// // //         .login-button {
// // //           background: linear-gradient(105deg,#9333EA,#6D28D9);
// // //           box-shadow: 0 0 25px rgba(147,51,234,.24);
// // //           transition: transform .2s, box-shadow .2s;
// // //         }

// // //         .login-button:hover:not(:disabled) {
// // //           transform: translateY(-2px);
// // //           box-shadow: 0 0 35px rgba(147,51,234,.4);
// // //         }

// // //         .login-art {
// // //           animation: login-float 7s ease-in-out infinite;
// // //         }

// // //         @keyframes login-float {
// // //           0%,100% { transform: translateY(0); }
// // //           50% { transform: translateY(-10px); }
// // //         }

// // //         @media (prefers-reduced-motion: reduce) {
// // //           .login-art { animation: none; }
// // //           .zoro-login * { transition: none !important; }
// // //         }
// // //       `}</style>

// // //       {/* BACKGROUND */}
// // //       <div className="pointer-events-none fixed inset-0">
// // //           <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-purple-700/15 blur-[130px]" />
// // //         <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-violet-800/15 blur-[140px]" />
// // //       </div>

// // //       {/* HEADER */}
// // //       <header className="relative z-10 border-b border-white/[0.07]">
// // //         <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
// // //           <Link to="/" className="flex items-center gap-3">
// // //             <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-violet-800 shadow-[0_0_25px_#a855f740]">
// // //               <Gamepad2 size={24} />
// // //             </span>
// // //             <span className="text-lg font-black tracking-tight">
// // //               ZORO<span className="text-purple-400"> GAMES</span>
// // //               <span className="mt-0.5 block text-[8px] tracking-[.3em] text-white/40">
// // //                 ENTER THE NEXT LEVEL
// // //               </span>
// // //             </span>
// // //           </Link>

// // //           <Link
// // //             to="/"
// // //             className="flex items-center gap-2 text-xs font-bold text-white/55 transition hover:text-purple-300"
// // //           >
// // //             <ChevronLeft size={16} />
// // //             BACK TO HOME
// // //           </Link>
// // //         </div>
// // //       </header>

// // //       {/* LOGIN CONTENT */}
// // //       <main className="relative z-10 mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-16">
// // //         {/* LEFT PANEL */}
// // //         <section className="hidden lg:block">
// // //           <div className="login-art relative mx-auto max-w-lg">
// // //             <div className="absolute inset-10 rounded-full bg-purple-700/20 blur-[90px]" />

// // //             <div className="relative overflow-hidden rounded-3xl border border-purple-300/20 bg-[#100819]">
// // //               <div className="absolute inset-0">
// // //                 <img
// // //                   src="/images/zoro-hero.png"
// // //                   alt=""
// // //                   className="h-full w-full object-cover opacity-75"
// // //                 />
// // //                 <div className="absolute inset-0 bg-gradient-to-t from-[#08050F] via-[#08050F]/30 to-[#08050F]/10" />
// // //                 <div className="absolute inset-0 bg-purple-950/20" />
// // //               </div>

// // //               <div className="relative flex min-h-[510px] flex-col justify-between p-8 xl:p-10">
// // //                 <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-300/25 bg-black/40 px-4 py-2 backdrop-blur">
// // //                   <Zap size={14} className="text-cyan-300" />
// // //                   <span className="text-[10px] font-black tracking-[.2em]">
// // //                     YOUR ARENA AWAITS
// // //                   </span>
// // //                 </div>

// // //                 <div>
// // //                   <p className="mb-3 text-xs font-black tracking-[.3em] text-purple-300">
// // //                     WELCOME BACK, PLAYER
// // //                   </p>
// // //                   <h1 className="text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
// // //                     YOUR GAME.
// // //                     <br />
// // //                     YOUR <span className="login-gradient">LEGACY.</span>
// // //                   </h1>
// // //                   <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
// // //                     Enter your account, continue your journey and get ready
// // //                     for your next gaming adventure.
// // //                   </p>

// // //                   <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6">
// // //                     <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-300/25 bg-purple-500/10">
// // //                       <ShieldCheck size={23} className="text-purple-300" />
// // //                     </div>
// // //                     <div>
// // //                       <p className="text-xs font-bold">YOUR ACCOUNT, YOUR CONTROL</p>
// // //                       <p className="mt-1 text-[10px] text-white/45">
// // //                         Secure authentication when connected to your backend.
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </section>

// // //         {/* LOGIN FORM */}
// // //         <section className="mx-auto w-full max-w-[470px]">
// // //           <div className="login-glass rounded-2xl p-6 sm:rounded-3xl sm:p-9 lg:p-10">
// // //             <div className="mb-8 text-center lg:text-left">
// // //               <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-300/25 bg-purple-500/10 text-purple-300 lg:mx-0">
// // //                 <Gamepad2 size={29} />
// // //               </div>

// // //               <p className="mb-3 text-[10px] font-black tracking-[.28em] text-purple-300">
// // //                 PLAYER AUTHENTICATION
// // //               </p>

// // //               <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
// // //                 WELCOME <span className="login-gradient">BACK.</span>
// // //               </h2>

// // //               <p className="mt-3 text-sm leading-6 text-white/50">
// // //                 Sign in to get back into the game.
// // //               </p>
// // //             </div>

// // //             <form onSubmit={handleSubmit} className="space-y-5">
// // //               <div>
// // //                 <label htmlFor="login-user-id" className="mb-2 block text-xs font-bold text-white/80">
// // //                   User ID
// // //                 </label>

// // //                 <div className="relative">
// // //                   <UserRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />

// // //                   <input
// // //                     id="login-user-id"
// // //                     name="userId"
// // //                     type="text"
// // //                     autoComplete="username"
// // //                     required
// // //                     value={userId}
// // //                     onChange={(e) => {
// // //                       setUserId(e.target.value);
// // //                       setMessage("");
// // //                     }}
// // //                     placeholder="Enter your user ID"
// // //                     className="login-input rounded-xl py-4 pl-12 pr-4 text-sm"
// // //                   />
// // //                 </div>
// // //               </div>

// // //               <div>
// // //                 <div className="mb-2 flex items-center justify-between gap-3">
// // //                   <label htmlFor="login-password" className="text-xs font-bold text-white/80">
// // //                     Password
// // //                   </label>

// // //                   <Link
// // //                     to="/forgot-password"
// // //                     className="text-[11px] font-bold text-purple-300 transition hover:text-cyan-300"
// // //                   >
// // //                     Forgot password?
// // //                   </Link>
// // //                 </div>

// // //                 <div className="relative">
// // //                   <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />

// // //                   <input
// // //                     id="login-password"
// // //                     name="password"
// // //                     type={showPassword ? "text" : "password"}
// // //                     autoComplete="current-password"
// // //                     required
// // //                     value={password}
// // //                     onChange={(e) => {
// // //                       setPassword(e.target.value);
// // //                       setMessage("");
// // //                     }}
// // //                     placeholder="Enter your password"
// // //                     className="login-input rounded-xl py-4 pl-12 pr-12 text-sm"
// // //                   />

// // //                   <button
// // //                     type="button"
// // //                     onClick={() => setShowPassword(!showPassword)}
// // //                     aria-label={showPassword ? "Hide password" : "Show password"}
// // //                     className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/5 hover:text-purple-300"
// // //                   >
// // //                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// // //                   </button>
// // //                 </div>
// // //               </div>

// // //               <label className="flex cursor-pointer items-center gap-3 py-1">
// // //                 <input
// // //                   type="checkbox"
// // //                   checked={remember}
// // //                   onChange={(e) => setRemember(e.target.checked)}
// // //                   className="h-4 w-4 accent-purple-500"
// // //                 />
// // //                 <span className="text-xs text-white/60">Remember me on this device</span>
// // //               </label>

// // //               {message && (
// // //                 <div role="status" className="rounded-xl border border-purple-300/20 bg-purple-500/[0.08] p-4 text-xs leading-6 text-purple-100">
// // //                   {message}
// // //                 </div>
// // //               )}

// // //               <button
// // //                 type="submit"
// // //                 disabled={loading}
// // //                 className="login-button flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-xs font-black tracking-[.15em] disabled:cursor-not-allowed disabled:opacity-60"
// // //               >
// // //                 {loading ? (
// // //                   <>
// // //                     <LoaderCircle size={17} className="animate-spin" />
// // //                     SIGNING IN...
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     ENTER THE ARENA <ArrowRight size={17} />
// // //                   </>
// // //                 )}
// // //               </button>
// // //             </form>

// // //             <div className="my-7 flex items-center gap-4">
// // //               <div className="h-px flex-1 bg-white/10" />
// // //               <span className="text-[9px] font-bold tracking-[.2em] text-white/35">
// // //                 NEW TO ZORO?
// // //               </span>
// // //               <div className="h-px flex-1 bg-white/10" />
// // //             </div>

// // //             <Link
// // //               to="/register"
// // //               className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-300/30 bg-purple-500/[0.04] px-5 py-4 text-xs font-black tracking-wider text-purple-200 transition hover:border-purple-300/70 hover:bg-purple-500/10"
// // //             >
// // //               CREATE YOUR ACCOUNT <ArrowRight size={16} />
// // //             </Link>

// // //             <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-black/15 p-4">
// // //               <ShieldCheck size={19} className="mt-0.5 shrink-0 text-cyan-300" />
// // //               <p className="text-[10px] leading-5 text-white/45">
// // //                 Use your own account credentials only on your trusted ZORO
// // //                 GAMES website. Authentication must be verified by the server.
// // //               </p>
// // //             </div>
// // //           </div>

// // //           <p className="mt-6 text-center text-[10px] text-white/35">
// // //             © {new Date().getFullYear()} ZORO GAMES · ENTER THE NEXT LEVEL
// // //           </p>
// // //         </section>
// // //       </main>
// // //     </div>
// // //   );



// // // }



// // import React, { useState } from "react";
// // import { Link, useNavigate, useLocation } from "react-router-dom";
// // import { useAuth } from "../../context/AuthContext";
// // import FingerprintJS from "@fingerprintjs/fingerprintjs";
// // import api from "../../api/axios";
// // import {
// //   Gamepad2,
// //   Eye,
// //   EyeOff,
// //   UserRound,
// //   LockKeyhole,
// //   ArrowRight,
// //   ShieldCheck,
// //   Zap,
// //   ChevronLeft,
// //   LoaderCircle,
// // } from "lucide-react";

// // export default function Login() {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { login } = useAuth();
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [remember, setRemember] = useState(true);
// //   const [loading, setLoading] = useState(false);
// //   const [userId, setUserId] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [message, setMessage] = useState("");

// //   async function handleSubmit(e) {
// //     e.preventDefault();
// //     setMessage("");

// //     const cleanUserId = userId.trim();
// //     if (!cleanUserId || !/^\\d+$/.test(cleanUserId) || !password) {
// //       setMessage("Please enter your numeric User ID and password.");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const fp = await FingerprintJS.load();
// //       const fingerprint = await fp.get();
// //       const deviceId = fingerprint.visitorId;

// //       const response = await api.post("/auth/login", {
// //         userId: cleanUserId,
// //         password,
// //         deviceId,
// //       });

// //       const data = response?.data || {};
// //       if (!data.token || !data.user) {
// //         setMessage(data.message || "Login response was incomplete. Please try again.");
// //         return;
// //       }

// //       localStorage.setItem("token", data.token);
// //       localStorage.setItem("user", JSON.stringify(data.user));
// //       login(data.user, data.token);
// //       navigate("/dashboard", { replace: true });
// //     } catch (error) {
// //       const status = error?.response?.status;
// //       const serverMessage = error?.response?.data?.message;
// //       if (status === 403 && !serverMessage) {
// //         setMessage("Your account is blocked. Please contact support.");
// //       } else {
// //         setMessage(serverMessage || error?.message || "Unable to log in. Please try again.");
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   return (
// //     <div className="zoro-login min-h-screen overflow-hidden bg-[#08050F] text-white">
// //       <style>{`
// //         .zoro-login {
// //           --purple: #A855F7;
// //           --cyan: #67E8F9;
// //           font-family: Inter, ui-sans-serif, system-ui, sans-serif;
// //         }

// //         .zoro-login * { box-sizing: border-box; }
// //         .zoro-login a { text-decoration: none; }
// // .login-gradient {
// //           background: linear-gradient(100deg,#fff,#e9d5ff 50%,#a855f7);
// //           background-clip: text;
// //           -webkit-background-clip: text;
// //           color: transparent;
// //         }

// //         .login-glass {
// //           background: linear-gradient(145deg,rgba(28,15,42,.96),rgba(11,8,18,.97));
// //           border: 1px solid rgba(192,132,252,.24);
// //           box-shadow: 0 30px 100px rgba(0,0,0,.48), 0 0 50px rgba(168,85,247,.08);
// //         }

// //         .login-input {
// //           width: 100%;
// //           min-width: 0;
// //           background: rgba(255,255,255,.025);
// //           border: 1px solid rgba(255,255,255,.12);
// //           color: white;
// //           outline: none;
// //           transition: border-color .2s, box-shadow .2s, background .2s;
// //         }

// //         .login-input:focus {
// //           border-color: rgba(192,132,252,.8);
// //           background: rgba(168,85,247,.04);
// //           box-shadow: 0 0 0 3px rgba(168,85,247,.10);
// //         }

// //         .login-input::placeholder { color: #777080; }

// //         .login-button {
// //           background: linear-gradient(105deg,#9333EA,#6D28D9);
// //           box-shadow: 0 0 25px rgba(147,51,234,.24);
// //           transition: transform .2s, box-shadow .2s;
// //         }

// //         .login-button:hover:not(:disabled) {
// //           transform: translateY(-2px);
// //           box-shadow: 0 0 35px rgba(147,51,234,.4);
// //         }

// //         .login-art {
// //           animation: login-float 7s ease-in-out infinite;
// //         }

// //         @keyframes login-float {
// //           0%,100% { transform: translateY(0); }
// //           50% { transform: translateY(-10px); }
// //         }

// //         @media (prefers-reduced-motion: reduce) {
// //           .login-art { animation: none; }
// //           .zoro-login * { transition: none !important; }
// //         }
// //       `}</style>

// //       {/* BACKGROUND */}
// //       <div className="pointer-events-none fixed inset-0">
// //           <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-purple-700/15 blur-[130px]" />
// //         <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-violet-800/15 blur-[140px]" />
// //       </div>

// //       {/* HEADER */}
// //       <header className="relative z-10 border-b border-white/[0.07]">
// //         <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
// //           <Link to="/" className="flex items-center gap-3">
// //             <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-violet-800 shadow-[0_0_25px_#a855f740]">
// //               <Gamepad2 size={24} />
// //             </span>
// //             <span className="text-lg font-black tracking-tight">
// //               ZORO<span className="text-purple-400"> GAMES</span>
// //               <span className="mt-0.5 block text-[8px] tracking-[.3em] text-white/40">
// //                 ENTER THE NEXT LEVEL
// //               </span>
// //             </span>
// //           </Link>

// //           <Link
// //             to="/"
// //             className="flex items-center gap-2 text-xs font-bold text-white/55 transition hover:text-purple-300"
// //           >
// //             <ChevronLeft size={16} />
// //             BACK TO HOME
// //           </Link>
// //         </div>
// //       </header>

// //       {/* LOGIN CONTENT */}
// //       <main className="relative z-10 mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-16">
// //         {/* LEFT PANEL */}
// //         <section className="hidden lg:block">
// //           <div className="login-art relative mx-auto max-w-lg">
// //             <div className="absolute inset-10 rounded-full bg-purple-700/20 blur-[90px]" />

// //             <div className="relative overflow-hidden rounded-3xl border border-purple-300/20 bg-[#100819]">
// //               <div className="absolute inset-0">
// //                 <img
// //                   src="/images/zoro-hero.png"
// //                   alt=""
// //                   className="h-full w-full object-cover opacity-75"
// //                 />
// //                 <div className="absolute inset-0 bg-gradient-to-t from-[#08050F] via-[#08050F]/30 to-[#08050F]/10" />
// //                 <div className="absolute inset-0 bg-purple-950/20" />
// //               </div>

// //               <div className="relative flex min-h-[510px] flex-col justify-between p-8 xl:p-10">
// //                 <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-300/25 bg-black/40 px-4 py-2 backdrop-blur">
// //                   <Zap size={14} className="text-cyan-300" />
// //                   <span className="text-[10px] font-black tracking-[.2em]">
// //                     YOUR ARENA AWAITS
// //                   </span>
// //                 </div>

// //                 <div>
// //                   <p className="mb-3 text-xs font-black tracking-[.3em] text-purple-300">
// //                     WELCOME BACK, PLAYER
// //                   </p>
// //                   <h1 className="text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
// //                     YOUR GAME.
// //                     <br />
// //                     YOUR <span className="login-gradient">LEGACY.</span>
// //                   </h1>
// //                   <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
// //                     Enter your account, continue your journey and get ready
// //                     for your next gaming adventure.
// //                   </p>

// //                   <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6">
// //                     <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-300/25 bg-purple-500/10">
// //                       <ShieldCheck size={23} className="text-purple-300" />
// //                     </div>
// //                     <div>
// //                       <p className="text-xs font-bold">YOUR ACCOUNT, YOUR CONTROL</p>
// //                       <p className="mt-1 text-[10px] text-white/45">
// //                         Secure authentication when connected to your backend.
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* LOGIN FORM */}
// //         <section className="mx-auto w-full max-w-[470px]">
// //           <div className="login-glass rounded-2xl p-6 sm:rounded-3xl sm:p-9 lg:p-10">
// //             <div className="mb-8 text-center lg:text-left">
// //               <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-300/25 bg-purple-500/10 text-purple-300 lg:mx-0">
// //                 <Gamepad2 size={29} />
// //               </div>

// //               <p className="mb-3 text-[10px] font-black tracking-[.28em] text-purple-300">
// //                 PLAYER AUTHENTICATION
// //               </p>

// //               <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
// //                 WELCOME <span className="login-gradient">BACK.</span>
// //               </h2>

// //               <p className="mt-3 text-sm leading-6 text-white/50">
// //                 Sign in to get back into the game.
// //               </p>
// //             </div>

// //             <form onSubmit={handleSubmit} className="space-y-5">
// //               <div>
// //                 <label htmlFor="login-user-id" className="mb-2 block text-xs font-bold text-white/80">
// //                   User ID
// //                 </label>

// //                 <div className="relative">
// //                   <UserRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />

// //                   <input
// //                     id="login-user-id"
// //                     name="userId"
// //                     type="text"
// //                     autoComplete="username"
// //                     required
// //                     value={userId}
// //                     inputMode="numeric"
// //                     pattern="[0-9]*"
// //                     onChange={(e) => {
// //                       setUserId(e.target.value.replace(/\\D/g, ""));
// //                       setMessage("");
// //                     }}
// //                     placeholder="Enter numeric User ID"
// //                     className="login-input rounded-xl py-4 pl-12 pr-4 text-sm"
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <div className="mb-2 flex items-center justify-between gap-3">
// //                   <label htmlFor="login-password" className="text-xs font-bold text-white/80">
// //                     Password
// //                   </label>

// //                   <Link
// //                     to="/forgot-password"
// //                     className="text-[11px] font-bold text-purple-300 transition hover:text-cyan-300"
// //                   >
// //                     Forgot password?
// //                   </Link>
// //                 </div>

// //                 <div className="relative">
// //                   <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />

// //                   <input
// //                     id="login-password"
// //                     name="password"
// //                     type={showPassword ? "text" : "password"}
// //                     autoComplete="current-password"
// //                     required
// //                     value={password}
// //                     onChange={(e) => {
// //                       setPassword(e.target.value);
// //                       setMessage("");
// //                     }}
// //                     placeholder="Enter your password"
// //                     className="login-input rounded-xl py-4 pl-12 pr-12 text-sm"
// //                   />

// //                   <button
// //                     type="button"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                     aria-label={showPassword ? "Hide password" : "Show password"}
// //                     className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/5 hover:text-purple-300"
// //                   >
// //                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// //                   </button>
// //                 </div>
// //               </div>

// //               <label className="flex cursor-pointer items-center gap-3 py-1">
// //                 <input
// //                   type="checkbox"
// //                   checked={remember}
// //                   onChange={(e) => setRemember(e.target.checked)}
// //                   className="h-4 w-4 accent-purple-500"
// //                 />
// //                 <span className="text-xs text-white/60">Remember me on this device</span>
// //               </label>

// //               {message && (
// //                 <div role="status" className="rounded-xl border border-purple-300/20 bg-purple-500/[0.08] p-4 text-xs leading-6 text-purple-100">
// //                   {message}
// //                 </div>
// //               )}

// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className="login-button flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-xs font-black tracking-[.15em] disabled:cursor-not-allowed disabled:opacity-60"
// //               >
// //                 {loading ? (
// //                   <>
// //                     <LoaderCircle size={17} className="animate-spin" />
// //                     SIGNING IN...
// //                   </>
// //                 ) : (
// //                   <>
// //                     ENTER THE ARENA <ArrowRight size={17} />
// //                   </>
// //                 )}
// //               </button>
// //             </form>

// //             <div className="my-7 flex items-center gap-4">
// //               <div className="h-px flex-1 bg-white/10" />
// //               <span className="text-[9px] font-bold tracking-[.2em] text-white/35">
// //                 NEW TO ZORO?
// //               </span>
// //               <div className="h-px flex-1 bg-white/10" />
// //             </div>

// //             <Link
// //               to="/register"
// //               className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-300/30 bg-purple-500/[0.04] px-5 py-4 text-xs font-black tracking-wider text-purple-200 transition hover:border-purple-300/70 hover:bg-purple-500/10"
// //             >
// //               CREATE YOUR ACCOUNT <ArrowRight size={16} />
// //             </Link>

// //             <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-black/15 p-4">
// //               <ShieldCheck size={19} className="mt-0.5 shrink-0 text-cyan-300" />
// //               <p className="text-[10px] leading-5 text-white/45">
// //                 Use your own account credentials only on your trusted ZORO
// //                 GAMES website. Authentication must be verified by the server.
// //               </p>
// //             </div>
// //           </div>

// //           <p className="mt-6 text-center text-[10px] text-white/35">
// //             © {new Date().getFullYear()} ZORO GAMES · ENTER THE NEXT LEVEL
// //           </p>
// //         </section>
// //       </main>
// //     </div>
// //   );
// // }


// import React, { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import FingerprintJS from "@fingerprintjs/fingerprintjs";
// import api from "../../api/axios";
// import {
//   Gamepad2,
//   Eye,
//   EyeOff,
//   UserRound,
//   LockKeyhole,
//   ArrowRight,
//   ShieldCheck,
//   Zap,
//   ChevronLeft,
//   LoaderCircle,
// } from "lucide-react";

// export default function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);
//   const [remember, setRemember] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [userId, setUserId] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setMessage("");

//     const cleanUserId = userId.trim();
//     if (!cleanUserId || !/^\d+$/.test(cleanUserId) || !password) {
//       setMessage("Please enter your numeric User ID and password.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const fp = await FingerprintJS.load();
//       const fingerprint = await fp.get();
//       const deviceId = fingerprint.visitorId;

//       const response = await api.post("/auth/login", {
//         userId: cleanUserId,
//         password,
//         deviceId,
//       });

//       const data = response?.data || {};
//       if (!data.token || !data.user) {
//         setMessage(data.message || "Login response was incomplete. Please try again.");
//         return;
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       login(data.user, data.token);
//       navigate("/dashboard", { replace: true });
//     } catch (error) {
//       const status = error?.response?.status;
//       const serverMessage = error?.response?.data?.message;
//       if (status === 403 && !serverMessage) {
//         setMessage("Your account is blocked. Please contact support.");
//       } else {
//         setMessage(serverMessage || error?.message || "Unable to log in. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="zoro-login min-h-screen overflow-hidden bg-[#08050F] text-white">
//       <style>{`
//         .zoro-login {
//           --purple: #A855F7;
//           --cyan: #67E8F9;
//           font-family: Inter, ui-sans-serif, system-ui, sans-serif;
//         }

//         .zoro-login * { box-sizing: border-box; }
//         .zoro-login a { text-decoration: none; }
// .login-gradient {
//           background: linear-gradient(100deg,#fff,#e9d5ff 50%,#a855f7);
//           background-clip: text;
//           -webkit-background-clip: text;
//           color: transparent;
//         }

//         .login-glass {
//           background: linear-gradient(145deg,rgba(28,15,42,.96),rgba(11,8,18,.97));
//           border: 1px solid rgba(192,132,252,.24);
//           box-shadow: 0 30px 100px rgba(0,0,0,.48), 0 0 50px rgba(168,85,247,.08);
//         }

//         .login-input {
//           width: 100%;
//           min-width: 0;
//           background: rgba(255,255,255,.025);
//           border: 1px solid rgba(255,255,255,.12);
//           color: white;
//           outline: none;
//           transition: border-color .2s, box-shadow .2s, background .2s;
//         }

//         .login-input:focus {
//           border-color: rgba(192,132,252,.8);
//           background: rgba(168,85,247,.04);
//           box-shadow: 0 0 0 3px rgba(168,85,247,.10);
//         }

//         .login-input::placeholder { color: #777080; }

//         .login-button {
//           background: linear-gradient(105deg,#9333EA,#6D28D9);
//           box-shadow: 0 0 25px rgba(147,51,234,.24);
//           transition: transform .2s, box-shadow .2s;
//         }

//         .login-button:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 0 35px rgba(147,51,234,.4);
//         }

//         .login-art {
//           animation: login-float 7s ease-in-out infinite;
//         }

//         @keyframes login-float {
//           0%,100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .login-art { animation: none; }
//           .zoro-login * { transition: none !important; }
//         }
//       `}</style>

//       {/* BACKGROUND */}
//       <div className="pointer-events-none fixed inset-0">
//           <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-purple-700/15 blur-[130px]" />
//         <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-violet-800/15 blur-[140px]" />
//       </div>

//       {/* HEADER */}
//       <header className="relative z-10 border-b border-white/[0.07]">
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
//           <Link to="/" className="flex items-center gap-3">
//             <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-violet-800 shadow-[0_0_25px_#a855f740]">
//               <Gamepad2 size={24} />
//             </span>
//             <span className="text-lg font-black tracking-tight">
//               ZORO<span className="text-purple-400"> GAMES</span>
//               <span className="mt-0.5 block text-[8px] tracking-[.3em] text-white/40">
//                 ENTER THE NEXT LEVEL
//               </span>
//             </span>
//           </Link>

//           <Link
//             to="/"
//             className="flex items-center gap-2 text-xs font-bold text-white/55 transition hover:text-purple-300"
//           >
//             <ChevronLeft size={16} />
//             BACK TO HOME
//           </Link>
//         </div>
//       </header>

//       {/* LOGIN CONTENT */}
//       <main className="relative z-10 mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-16">
//         {/* LEFT PANEL */}
//         <section className="hidden lg:block">
//           <div className="login-art relative mx-auto max-w-lg">
//             <div className="absolute inset-10 rounded-full bg-purple-700/20 blur-[90px]" />

//             <div className="relative overflow-hidden rounded-3xl border border-purple-300/20 bg-[#100819]">
//               <div className="absolute inset-0">
//                 <img
//                   src="/images/zoro-hero.png"
//                   alt=""
//                   className="h-full w-full object-cover opacity-75"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#08050F] via-[#08050F]/30 to-[#08050F]/10" />
//                 <div className="absolute inset-0 bg-purple-950/20" />
//               </div>

//               <div className="relative flex min-h-[510px] flex-col justify-between p-8 xl:p-10">
//                 <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-300/25 bg-black/40 px-4 py-2 backdrop-blur">
//                   <Zap size={14} className="text-cyan-300" />
//                   <span className="text-[10px] font-black tracking-[.2em]">
//                     YOUR ARENA AWAITS
//                   </span>
//                 </div>

//                 <div>
//                   <p className="mb-3 text-xs font-black tracking-[.3em] text-purple-300">
//                     WELCOME BACK, PLAYER
//                   </p>
//                   <h1 className="text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
//                     YOUR GAME.
//                     <br />
//                     YOUR <span className="login-gradient">LEGACY.</span>
//                   </h1>
//                   <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
//                     Enter your account, continue your journey and get ready
//                     for your next gaming adventure.
//                   </p>

//                   <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6">
//                     <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-300/25 bg-purple-500/10">
//                       <ShieldCheck size={23} className="text-purple-300" />
//                     </div>
//                     <div>
//                       <p className="text-xs font-bold">YOUR ACCOUNT, YOUR CONTROL</p>
//                       <p className="mt-1 text-[10px] text-white/45">
//                         Secure authentication when connected to your backend.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* LOGIN FORM */}
//         <section className="mx-auto w-full max-w-[470px]">
//           <div className="login-glass rounded-2xl p-6 sm:rounded-3xl sm:p-9 lg:p-10">
//             <div className="mb-8 text-center lg:text-left">
//               <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-300/25 bg-purple-500/10 text-purple-300 lg:mx-0">
//                 <Gamepad2 size={29} />
//               </div>

//               <p className="mb-3 text-[10px] font-black tracking-[.28em] text-purple-300">
//                 PLAYER AUTHENTICATION
//               </p>

//               <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
//                 WELCOME <span className="login-gradient">BACK.</span>
//               </h2>

//               <p className="mt-3 text-sm leading-6 text-white/50">
//                 Sign in to get back into the game.
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div>
//                 <label htmlFor="login-user-id" className="mb-2 block text-xs font-bold text-white/80">
//                   User ID
//                 </label>

//                 <div className="relative">
//                   <UserRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />

//                   <input
//                     id="login-user-id"
//                     name="userId"
//                     type="text"
//                     autoComplete="username"
//                     required
//                     value={userId}
//                     inputMode="numeric"
//                     pattern="[0-9]*"
//                     onChange={(e) => {
//                       setUserId(e.target.value.replace(/\D/g, ""));
//                       setMessage("");
//                     }}
//                     placeholder="Enter numeric User ID"
//                     className="login-input rounded-xl py-4 pl-12 pr-4 text-sm"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <div className="mb-2 flex items-center justify-between gap-3">
//                   <label htmlFor="login-password" className="text-xs font-bold text-white/80">
//                     Password
//                   </label>

//                   <Link
//                     to="/forgot-password"
//                     className="text-[11px] font-bold text-purple-300 transition hover:text-cyan-300"
//                   >
//                     Forgot password?
//                   </Link>
//                 </div>

//                 <div className="relative">
//                   <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />

//                   <input
//                     id="login-password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     autoComplete="current-password"
//                     required
//                     value={password}
//                     onChange={(e) => {
//                       setPassword(e.target.value);
//                       setMessage("");
//                     }}
//                     placeholder="Enter your password"
//                     className="login-input rounded-xl py-4 pl-12 pr-12 text-sm"
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     aria-label={showPassword ? "Hide password" : "Show password"}
//                     className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/5 hover:text-purple-300"
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </div>

//               <label className="flex cursor-pointer items-center gap-3 py-1">
//                 <input
//                   type="checkbox"
//                   checked={remember}
//                   onChange={(e) => setRemember(e.target.checked)}
//                   className="h-4 w-4 accent-purple-500"
//                 />
//                 <span className="text-xs text-white/60">Remember me on this device</span>
//               </label>

//               {message && (
//                 <div role="status" className="rounded-xl border border-purple-300/20 bg-purple-500/[0.08] p-4 text-xs leading-6 text-purple-100">
//                   {message}
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="login-button flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-xs font-black tracking-[.15em] disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {loading ? (
//                   <>
//                     <LoaderCircle size={17} className="animate-spin" />
//                     SIGNING IN...
//                   </>
//                 ) : (
//                   <>
//                     ENTER THE ARENA <ArrowRight size={17} />
//                   </>
//                 )}
//               </button>
//             </form>

//             <div className="my-7 flex items-center gap-4">
//               <div className="h-px flex-1 bg-white/10" />
//               <span className="text-[9px] font-bold tracking-[.2em] text-white/35">
//                 NEW TO ZORO?
//               </span>
//               <div className="h-px flex-1 bg-white/10" />
//             </div>

//             <Link
//               to="/register"
//               className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-300/30 bg-purple-500/[0.04] px-5 py-4 text-xs font-black tracking-wider text-purple-200 transition hover:border-purple-300/70 hover:bg-purple-500/10"
//             >
//               CREATE YOUR ACCOUNT <ArrowRight size={16} />
//             </Link>

//             <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-black/15 p-4">
//               <ShieldCheck size={19} className="mt-0.5 shrink-0 text-cyan-300" />
//               <p className="text-[10px] leading-5 text-white/45">
//                 Use your own account credentials only on your trusted ZORO
//                 GAMES website. Authentication must be verified by the server.
//               </p>
//             </div>
//           </div>

//           <p className="mt-6 text-center text-[10px] text-white/35">
//             © {new Date().getFullYear()} ZORO GAMES · ENTER THE NEXT LEVEL
//           </p>
//         </section>
//       </main>
//     </div>
//   );
// }



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import api from "../../api/axios";
import {
  Gamepad2,
  Eye,
  EyeOff,
  UserRound,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
  Zap,
  ChevronLeft,
  LoaderCircle,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    const cleanUserId = userId.trim().toUpperCase();

    if (!/^ZG\d{7}$/.test(cleanUserId)) {
      setMessage("Enter a valid User ID, for example ZG1234567.");
      return;
    }

    if (!password) {
      setMessage("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      let deviceId;

      try {
        const fp = await FingerprintJS.load();
        const fingerprint = await fp.get();
        deviceId = fingerprint.visitorId;
      } catch (fingerprintError) {
        console.warn("Device fingerprint unavailable.");
      }

      const response = await api.post("/auth/login", {
        userId: cleanUserId,
        password,
        deviceId,
      });

      const data = response?.data || {};

      if (!data.token || !data.user) {
        setMessage(
          data.message || "Login response was incomplete. Please try again."
        );
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Keep the existing authentication context in sync.
      login(data.user, data.token);

      // Remember-me checkbox is retained in the UI.
      // The app's current auth context determines session persistence.
      navigate("/dashboard", { replace: true });
    } catch (error) {
      const status = error?.response?.status;
      const serverMessage = error?.response?.data?.message;

      if (status === 403 && !serverMessage) {
        setMessage("Your account is blocked. Please contact support.");
      } else {
        setMessage(
          serverMessage || "Unable to log in. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="zoro-login min-h-screen overflow-hidden bg-[#08050F] text-white">
      <style>{`
        .zoro-login {
          --purple: #A855F7;
          --cyan: #67E8F9;
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        }

        .zoro-login * { box-sizing: border-box; }
        .zoro-login a { text-decoration: none; }

        .login-gradient {
          background: linear-gradient(100deg,#fff,#e9d5ff 50%,#a855f7);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .login-glass {
          background: linear-gradient(145deg,rgba(28,15,42,.96),rgba(11,8,18,.97));
          border: 1px solid rgba(192,132,252,.24);
          box-shadow: 0 30px 100px rgba(0,0,0,.48),0 0 50px rgba(168,85,247,.08);
        }

        .login-input {
          width: 100%;
          min-width: 0;
          background: rgba(255,255,255,.025);
          border: 1px solid rgba(255,255,255,.12);
          color: white;
          outline: none;
          transition: border-color .2s,box-shadow .2s,background .2s;
        }

        .login-input:focus {
          border-color: rgba(192,132,252,.8);
          background: rgba(168,85,247,.04);
          box-shadow: 0 0 0 3px rgba(168,85,247,.10);
        }

        .login-input::placeholder { color: #777080; }

        .login-button {
          background: linear-gradient(105deg,#9333EA,#6D28D9);
          box-shadow: 0 0 25px rgba(147,51,234,.24);
          transition: transform .2s,box-shadow .2s;
        }

        .login-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 0 35px rgba(147,51,234,.4);
        }

        .login-art { animation: login-float 7s ease-in-out infinite; }

        @keyframes login-float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .login-art { animation: none; }
          .zoro-login * { transition: none !important; }
        }
      `}</style>

      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-purple-700/15 blur-[130px]" />
        <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-violet-800/15 blur-[140px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-violet-800 shadow-[0_0_25px_#a855f740]">
              <Gamepad2 size={24} />
            </span>

            <span className="text-lg font-black tracking-tight">
              ZORO<span className="text-purple-400"> GAMES</span>
              <span className="mt-0.5 block text-[8px] tracking-[.3em] text-white/40">
                ENTER THE NEXT LEVEL
              </span>
            </span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-bold text-white/55 transition hover:text-purple-300"
          >
            <ChevronLeft size={16} />
            BACK TO HOME
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-16">
        {/* Left hero panel */}
        <section className="hidden lg:block">
          <div className="login-art relative mx-auto max-w-lg">
            <div className="absolute inset-10 rounded-full bg-purple-700/20 blur-[90px]" />

            <div className="relative overflow-hidden rounded-3xl border border-purple-300/20 bg-[#100819]">
              <div className="absolute inset-0">
                <img
                  src="/images/zoro-hero.png"
                  alt=""
                  className="h-full w-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08050F] via-[#08050F]/30 to-[#08050F]/10" />
                <div className="absolute inset-0 bg-purple-950/20" />
              </div>

              <div className="relative flex min-h-[510px] flex-col justify-between p-8 xl:p-10">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-300/25 bg-black/40 px-4 py-2 backdrop-blur">
                  <Zap size={14} className="text-cyan-300" />
                  <span className="text-[10px] font-black tracking-[.2em]">
                    YOUR ARENA AWAITS
                  </span>
                </div>

                <div>
                  <p className="mb-3 text-xs font-black tracking-[.3em] text-purple-300">
                    WELCOME BACK, PLAYER
                  </p>

                  <h1 className="text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
                    YOUR GAME.
                    <br />
                    YOUR <span className="login-gradient">LEGACY.</span>
                  </h1>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
                    Enter your account, continue your journey and get ready
                    for your next gaming adventure.
                  </p>

                  <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-300/25 bg-purple-500/10">
                      <ShieldCheck size={23} className="text-purple-300" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">
                        YOUR ACCOUNT, YOUR CONTROL
                      </p>
                      <p className="mt-1 text-[10px] text-white/45">
                        Secure authentication through your backend.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Login form */}
        <section className="mx-auto w-full max-w-[470px]">
          <div className="login-glass rounded-2xl p-6 sm:rounded-3xl sm:p-9 lg:p-10">
            <div className="mb-8 text-center lg:text-left">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-300/25 bg-purple-500/10 text-purple-300 lg:mx-0">
                <Gamepad2 size={29} />
              </div>

              <p className="mb-3 text-[10px] font-black tracking-[.28em] text-purple-300">
                PLAYER AUTHENTICATION
              </p>

              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                WELCOME <span className="login-gradient">BACK.</span>
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/50">
                Sign in to get back into the game.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* User ID */}
              <div>
                <label
                  htmlFor="login-user-id"
                  className="mb-2 block text-xs font-bold text-white/80"
                >
                  User ID
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70"
                  />

                  <input
                    id="login-user-id"
                    name="userId"
                    type="text"
                    autoComplete="username"
                    required
                    maxLength={9}
                    value={userId}
                    onChange={(e) => {
                      setUserId(
                        e.target.value
                          .toUpperCase()
                          .replace(/[^A-Z0-9]/g, "")
                          .slice(0, 9)
                      );
                      setMessage("");
                    }}
                    placeholder="Enter User ID (e.g. ZG1234567)"
                    className="login-input rounded-xl py-4 pl-12 pr-4 text-sm"
                  />
                </div>

                <p className="mt-2 text-[10px] text-white/35">
                  Format: ZG followed by 7 digits
                </p>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="login-password"
                    className="text-xs font-bold text-white/80"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-[11px] font-bold text-purple-300 transition hover:text-cyan-300"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70"
                  />

                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setMessage("");
                    }}
                    placeholder="Enter your password"
                    className="login-input rounded-xl py-4 pl-12 pr-12 text-sm"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/5 hover:text-purple-300"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex cursor-pointer items-center gap-3 py-1">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 accent-purple-500"
                />
                <span className="text-xs text-white/60">
                  Remember me on this device
                </span>
              </label>

              {/* Message */}
              {message && (
                <div
                  role="alert"
                  className="rounded-xl border border-purple-300/20 bg-purple-500/[0.08] p-4 text-xs leading-6 text-purple-100"
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="login-button flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-xs font-black tracking-[.15em] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={17} className="animate-spin" />
                    SIGNING IN...
                  </>
                ) : (
                  <>
                    ENTER THE ARENA <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[9px] font-bold tracking-[.2em] text-white/35">
                NEW TO ZORO?
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <Link
              to="/register"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-300/30 bg-purple-500/[0.04] px-5 py-4 text-xs font-black tracking-wider text-purple-200 transition hover:border-purple-300/70 hover:bg-purple-500/10"
            >
              CREATE YOUR ACCOUNT <ArrowRight size={16} />
            </Link>

            <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-black/15 p-4">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-cyan-300"
              />
              <p className="text-[10px] leading-5 text-white/45">
                Use your own account credentials only on your trusted ZORO
                GAMES website. Authentication must be verified by the server.
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-[10px] text-white/35">
            © {new Date().getFullYear()} ZORO GAMES · ENTER THE NEXT LEVEL
          </p>
        </section>
      </main>
    </div>
  );
}