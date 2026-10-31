// import React, { useState } from 'react';
// import api from '../../api/axios';
// import { Link } from 'react-router-dom';

// const ForgotPassword = () => {
//   const [userId, setUserId] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleForgot = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setMessage('');

//     try {
//       const res = await api.post('/auth/forgot-password', { userId });
//       setMessage(res.data.message);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- SAME LOGIN PAGE STYLES ---
//   const containerStyle = {
//     minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
//     background: 'url("/background.jpg") no-repeat center center fixed', backgroundSize: 'cover',
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", padding: '20px'
//   };

//   const boxStyle = {
//     background: 'rgba(50, 50, 50, 0.75)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
//     borderRadius: '20px', width: '100%', maxWidth: '400px', boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
//     overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,0.1)'
//   };

//   const topHeader = {
//     width: '100%', height: '100px', position: 'absolute', top: 0, left: 0, zIndex: 0,
//     background: 'linear-gradient(135deg, rgba(0, 180, 219, 0.8) 0%, rgba(0, 131, 176, 0.8) 100%)',
//     clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0% 100%)'
//   };

//   const inputStyle = {
//     width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
//     padding: '10px 10px 5px 30px', color: 'white', fontSize: '15px', outline: 'none', boxSizing: 'border-box'
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={boxStyle}>
//         <div style={topHeader}></div>
//         <div style={{ position: 'relative', zIndex: 1, padding: '40px 30px 30px 30px' }}>
          
//           <div style={{ textAlign: 'center', marginBottom: '30px' }}>
//             <img src="/logo.jpg" alt="Logo" style={{ height: '55px', borderRadius: '8px', marginBottom: '10px' }} />
//             <h3 style={{ color: '#fff', fontWeight: '600', fontSize: '20px', margin: 0 }}>Forgot Password</h3>
//             <p style={{ color: '#ccc', fontSize: '13px', marginTop: '5px' }}>Enter your User ID to get a reset link</p>
//           </div>

//           {error && <div style={{ background: 'rgba(255, 60, 60, 0.2)', color: '#ffb3b3', padding: '12px', marginBottom: '20px', fontSize: '13px', borderRadius: '6px', border: '1px solid rgba(255,0,0,0.3)', textAlign: 'center' }}>⚠️ {error}</div>}
//           {message && <div style={{ background: 'rgba(40, 167, 69, 0.2)', color: '#b3ffcc', padding: '12px', marginBottom: '20px', fontSize: '13px', borderRadius: '6px', border: '1px solid rgba(0,255,0,0.3)', textAlign: 'center' }}>✅ {message}</div>}

//           <form onSubmit={handleForgot}>
//             <div style={{ position: 'relative', marginBottom: '25px' }}>
//               <i className="fa fa-user" style={{ position: 'absolute', left: '0', top: '10px', color: '#03a9f4', fontSize: '16px' }}></i>
//               <input type="text" placeholder="ENTER USER ID" value={userId} onChange={(e) => setUserId(e.target.value)} required style={inputStyle} />
//             </div>

//             <button type="submit" disabled={loading} style={{
//               width: '100%', background: 'linear-gradient(to right, #03a9f4, #0083b0)', color: 'white', border: 'none',
//               padding: '14px', fontSize: '16px', cursor: loading ? 'wait' : 'pointer', fontWeight: 'bold', borderRadius: '8px', letterSpacing: '1px', boxShadow: '0 5px 15px rgba(3, 169, 244, 0.4)'
//             }}>
//               {loading ? 'SENDING...' : 'SEND RESET LINK'}
//             </button>
//           </form>

//           <p style={{ textAlign: 'center', marginTop: '25px', color: '#ccc', fontSize: '14px' }}>
//             Remembered your password? <Link to="/login" style={{ color: '#03a9f4', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;





import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Gamepad2,
  Mail,
  ArrowRight,
  ChevronLeft,
  ShieldCheck,
  CheckCircle2,
  LoaderCircle,
  KeyRound,
} from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    // Connect the real password-reset API here.
    // Do not show success until the server accepts the request.
    setError(
      "Password reset API is not connected yet. Connect your backend endpoint to send a reset email."
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#08050F] text-white">
      <style>{`
        .fp-grid {
          background-image:
            linear-gradient(#a855f70b 1px,transparent 1px),
            linear-gradient(90deg,#a855f70b 1px,transparent 1px);
          background-size: 40px 40px;
          mask-image: linear-gradient(to bottom,black,transparent);
        }
        .fp-card {
          background: linear-gradient(145deg,#1c0f2a,#0b0812);
          border: 1px solid #c084fc40;
          box-shadow: 0 30px 100px #0008,0 0 50px #a855f710;
        }
        .fp-input {
          background: #ffffff05;
          border: 1px solid #ffffff20;
          outline: none;
          color: white;
          transition: .2s;
        }
        .fp-input:focus {
          border-color: #c084fc;
          box-shadow: 0 0 0 3px #a855f71a;
        }
        .fp-input::placeholder { color: #777080; }
        .fp-button {
          background: linear-gradient(105deg,#9333ea,#6d28d9);
          transition: .2s;
        }
        .fp-button:hover { filter: brightness(1.15); transform: translateY(-2px); }
      `}</style>

      <div className="pointer-events-none fixed inset-0">
        <div className="fp-grid absolute inset-0" />
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-700/15 blur-[120px]" />
        <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-violet-800/15 blur-[120px]" />
      </div>

      <header className="relative z-10 border-b border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-violet-800">
              <Gamepad2 size={24} />
            </span>
            <span className="font-black">
              ZORO<span className="text-purple-400"> GAMES</span>
              <span className="mt-1 block text-[8px] tracking-[.3em] text-white/40">
                ENTER THE NEXT LEVEL
              </span>
            </span>
          </Link>

          <Link to="/login" className="flex items-center gap-2 text-xs font-bold text-white/60 hover:text-purple-300">
            <ChevronLeft size={16} /> BACK TO LOGIN
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex min-h-[calc(100vh-81px)] items-center justify-center px-5 py-12">
        <section className="fp-card w-full max-w-[460px] rounded-3xl p-6 sm:p-10">
          <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-300/25 bg-purple-500/10 text-purple-300">
            <KeyRound size={30} />
          </div>

          <p className="mb-3 text-[10px] font-black tracking-[.28em] text-purple-300">
            ACCOUNT RECOVERY
          </p>

          <h1 className="text-3xl font-black leading-tight sm:text-4xl">
            FORGOT YOUR
            <br />
            <span className="bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">
              PASSWORD?
            </span>
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/55">
            Enter the email address linked to your account. Once password
            recovery is connected, you can receive instructions to reset it.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="reset-email" className="mb-2 block text-xs font-bold text-white/80">
                Registered email address
              </label>

              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/70" />
                <input
                  id="reset-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                    setMessage("");
                  }}
                  placeholder="you@example.com"
                  className="fp-input w-full rounded-xl py-4 pl-12 pr-4 text-sm"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-xl border border-pink-400/20 bg-pink-500/[0.07] p-4 text-xs leading-6 text-pink-200">
                {error}
              </p>
            )}

            {message && (
              <div role="status" className="flex gap-3 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4 text-xs leading-6 text-cyan-200">
                <CheckCircle2 size={18} className="shrink-0" />
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="fp-button flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-xs font-black tracking-[.12em] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  SENDING REQUEST...
                </>
              ) : (
                <>
                  REQUEST PASSWORD RESET <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-black/15 p-4">
            <ShieldCheck size={19} className="mt-0.5 shrink-0 text-cyan-300" />
            <p className="text-[10px] leading-5 text-white/45">
              Password recovery must use a secure, time-limited reset link
              verified by the server. Never share your password or reset token.
            </p>
          </div>

          <p className="mt-7 text-center text-xs text-white/50">
            Remember your password?{" "}
            <Link to="/login" className="font-bold text-purple-300 hover:text-cyan-300">
              Back to Login
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
