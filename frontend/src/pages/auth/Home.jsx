// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { useNavigate, Link } from 'react-router-dom';
// // // // import { 
// // // //   ArrowRight, Zap, Layers, 
// // // //   Network, ShieldCheck, 
// // // //   Globe2, ChevronDown, 
// // // //   Users, DollarSign,
// // // //   TrendingUp, Activity, BarChart3, Lock
// // // // } from 'lucide-react';

// // // // const AnimatedCounter = ({ end, duration = 2000, prefix = "", suffix = "", decimals = 0 }) => {
// // // //   const [count, setCount] = useState(0);
// // // //   const [isVisible, setIsVisible] = useState(false);
// // // //   const counterRef = useRef(null);

// // // //   useEffect(() => {
// // // //     const observer = new IntersectionObserver(
// // // //       ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
// // // //       { threshold: 0.5 }
// // // //     );
// // // //     if (counterRef.current) observer.observe(counterRef.current);
// // // //     return () => observer.disconnect();
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     if (!isVisible) return;
// // // //     let startTimestamp = null;
// // // //     const step = (timestamp) => {
// // // //       if (!startTimestamp) startTimestamp = timestamp;
// // // //       const progress = Math.min((timestamp - startTimestamp) / duration, 1);
// // // //       const easeOutQuart = 1 - Math.pow(1 - progress, 4);
// // // //       setCount(easeOutQuart * end);
// // // //       if (progress < 1) window.requestAnimationFrame(step);
// // // //     };
// // // //     window.requestAnimationFrame(step);
// // // //   }, [isVisible, end, duration]);

// // // //   const formattedNumber = count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// // // //   return <span ref={counterRef}>{prefix}{formattedNumber}{suffix}</span>;
// // // // };

// // // // const packagePlan = [
// // // //   { sr: 1, amount: "$10", cycle: "25 Days", dailyRoi: "5%", totalReturn: "$12.50" },
// // // //   { sr: 2, amount: "$50", cycle: "25 Days", dailyRoi: "5%", totalReturn: "$62.50" },
// // // //   { sr: 3, amount: "$100", cycle: "25 Days", dailyRoi: "5%", totalReturn: "$125.00" },
// // // //   { sr: 4, amount: "$250", cycle: "25 Days", dailyRoi: "5%", totalReturn: "$312.50" },
// // // //   { sr: 5, amount: "$500", cycle: "25 Days", dailyRoi: "5%", totalReturn: "$625.00" },
// // // //   { sr: 6, amount: "$1,000", cycle: "25 Days", dailyRoi: "5%", totalReturn: "$1,250.00" }
// // // // ];

// // // // const faqData = [
// // // //   { q: "What is zoro games?", a: "zoro games is a secure decentralized crypto platform offering transparent investment processes, daily ROI through crypto trading, and network referral bonuses." },
// // // //   { q: "How does the system generate profits?", a: "Our system pools deposited funds into high-frequency crypto trading algorithms, liquidity pools, and arbitrage opportunities across global exchanges to generate stable daily profits for our investors." },
// // // //   { q: "How do I activate my package?", a: "Deposit USDT (BEP-20) into your wallet balance. Minimum upgrade package starts at $30. Once funds are received, activate your investment package securely from the dashboard." },
// // // //   { q: "What is the daily ROI return?", a: "Activated investment packages yield 5% daily returns in USD over a structured 25-day cycle." },
// // // //   { q: "What are the withdrawal rules?", a: "Withdrawals are processed daily between 10:00 AM - 12:00 PM (IST). A minimum withdrawal limit of $1-$2 applies, and an active package is required." }
// // // // ];

// // // // const Home = () => {
// // // //   const navigate = useNavigate();
// // // //   const [scrolled, setScrolled] = useState(false);
// // // //   const [openFaq, setOpenFaq] = useState(null);

// // // //   useEffect(() => {
// // // //     const handleScroll = () => setScrolled(window.scrollY > 50);
// // // //     window.addEventListener('scroll', handleScroll);
// // // //     return () => window.removeEventListener('scroll', handleScroll);
// // // //   }, []);

// // // //   const toggleFaq = (index) => {
// // // //     setOpenFaq(openFaq === index ? null : index);
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-[#0b101e] text-gray-300 font-sans overflow-x-hidden relative selection:bg-[#e4c568]/30 selection:text-[#e4c568]">
      
// // // //       <style>{`
// // // //         .glass-header {
// // // //           background: rgba(11, 16, 30, 0.85);
// // // //           backdrop-filter: blur(12px);
// // // //           border-bottom: 1px solid rgba(228, 197, 104, 0.1);
// // // //         }
// // // //         .text-gold-gradient {
// // // //           background: linear-gradient(135deg, #e4c568, #d4af37, #f3e5ab);
// // // //           -webkit-background-clip: text;
// // // //           -webkit-text-fill-color: transparent;
// // // //         }
// // // //         .bg-gold-gradient {
// // // //           background: linear-gradient(135deg, #e4c568, #d4af37);
// // // //         }
// // // //       `}</style>

// // // //       {/* --- TOP HEADER NAVBAR --- */}
// // // //       <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-header py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-5'}`}>
// // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
// // // //           <Link to="/" className="flex items-center gap-2 no-underline group">
// // // //             <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#131927] border border-[#e4c568]/50 flex items-center justify-center group-hover:border-[#e4c568] transition-colors shadow-[0_0_10px_rgba(228,197,104,0.2)]">
// // // //                <Globe2 className="text-[#e4c568]" size={20} />
// // // //             </div>
// // // //             <span className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center">
// // // //               WORLD<span className="text-[#e4c568]">FINANCE24</span>
// // // //             </span>
// // // //           </Link>
          
// // // //           <div className="hidden lg:flex items-center gap-8 font-semibold text-sm text-gray-300">
// // // //             <a href="#" className="hover:text-[#e4c568] transition-colors">Home</a>
// // // //             <a href="#about" className="hover:text-[#e4c568] transition-colors">Ecosystem</a>
// // // //             <a href="#packages" className="hover:text-[#e4c568] transition-colors">Packages</a>
// // // //             <a href="#faq" className="hover:text-[#e4c568] transition-colors">FAQ</a>
// // // //             <Link to="/login" className="hover:text-[#e4c568] transition-colors">Login</Link>
// // // //           </div>
          
// // // //           <div className="flex gap-3">
// // // //             <Link to="/login" className="hidden sm:flex bg-[#131927] border border-[#e4c568]/30 hover:border-[#e4c568] text-white font-bold px-5 py-2.5 rounded transition text-sm items-center justify-center">
// // // //               Login
// // // //             </Link>
// // // //             <Link to="/register" className="bg-gold-gradient hover:scale-105 text-black font-extrabold px-5 sm:px-6 py-2.5 rounded transition-transform text-sm shadow-[0_0_15px_rgba(228,197,104,0.3)]">
// // // //               Register
// // // //             </Link>
// // // //           </div>
// // // //         </div>
// // // //       </nav>

// // // //       {/* --- HERO SECTION --- */}
// // // //       <section className="relative pt-32 pb-20 sm:pb-24 px-4 sm:px-6 bg-[#0b101e] min-h-[85vh] flex items-center overflow-hidden">
// // // //         {/* Background Gradients */}
// // // //         <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#e4c568]/5 blur-[120px] rounded-full pointer-events-none"></div>
// // // //         <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

// // // //         <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
// // // //           <div className="text-center lg:text-left">
// // // //             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#131927] border border-[#e4c568]/30 text-[#e4c568] text-xs font-bold tracking-wide mb-6">
// // // //               <Activity size={14} /> LIVE USDT (BEP-20) DEPOSITS & WITHDRAWALS
// // // //             </div>
// // // //             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight text-white">
// // // //               MASTER YOUR <br />
// // // //               <span className="text-gold-gradient">CRYPTO WEALTH</span>
// // // //             </h1>
// // // //             <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
// // // //               Join worldfinance24 to unlock daily ROI through automated crypto trading and powerful multi-level referral networks.
// // // //             </p>
// // // //             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
// // // //               <Link to="/register" className="bg-gold-gradient text-black font-black px-8 py-3.5 rounded transition shadow-[0_0_20px_rgba(228,197,104,0.4)] hover:shadow-[0_0_30px_rgba(228,197,104,0.6)] hover:-translate-y-1 text-center uppercase tracking-wider text-sm">
// // // //                 Start Earning
// // // //               </Link>
// // // //               <Link to="/login" className="bg-[#161c2d] hover:bg-[#1e2536] border border-[#2d3748] text-white font-bold px-8 py-3.5 rounded transition text-center uppercase tracking-wider text-sm">
// // // //                 Member Dashboard
// // // //               </Link>
// // // //             </div>
// // // //           </div>

// // // //           {/* Right Side Visual */}
// // // //           <div className="hidden lg:block relative">
// // // //             <div className="absolute inset-0 bg-gradient-to-tr from-[#e4c568]/10 to-transparent rounded-full blur-[80px]"></div>
// // // //             <div className="bg-[#131927] border border-[#2d3748] p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] relative z-10">
// // // //               <div className="flex justify-between items-center mb-6 border-b border-[#2d3748] pb-4">
// // // //                 <span className="text-white font-bold flex items-center gap-2"><TrendingUp className="text-[#00ff88]" /> Platform Stats</span>
// // // //                 <span className="text-[#e4c568] text-xs font-bold bg-[#e4c568]/10 px-3 py-1 rounded">UPDATED LIVE</span>
// // // //               </div>
// // // //               <div className="space-y-6">
// // // //                 <div>
// // // //                   <p className="text-gray-500 text-sm font-semibold mb-1">Total Active Traders</p>
// // // //                   <p className="text-3xl font-black text-white"><AnimatedCounter end={12540} prefix="" suffix="+" /></p>
// // // //                 </div>
// // // //                 <div>
// // // //                   <p className="text-gray-500 text-sm font-semibold mb-1">Total Volume Traded</p>
// // // //                   <p className="text-3xl font-black text-[#00ff88]"><AnimatedCounter end={458} prefix="$" suffix="K+" decimals={1} /></p>
// // // //                 </div>
// // // //                 <div>
// // // //                   <p className="text-gray-500 text-sm font-semibold mb-1">Daily Payouts</p>
// // // //                   <p className="text-3xl font-black text-[#e4c568]"><AnimatedCounter end={5} prefix="" suffix="%" decimals={0} /></p>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </section>

// // // //       {/* --- FEATURE BOXES BAR --- */}
// // // //       <div className="bg-[#0f1423] border-y border-[#2d3748] py-6 sm:py-8 relative z-20">
// // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
// // // //           <div className="flex items-center gap-4 bg-[#131927] p-5 rounded-xl border border-[#2d3748] hover:border-[#e4c568]/50 transition-colors">
// // // //             <ShieldCheck className="text-[#e4c568] shrink-0" size={32} />
// // // //             <div>
// // // //               <h4 className="font-bold text-white text-[15px]">Secure USDT Ecosystem</h4>
// // // //               <p className="text-gray-400 text-xs mt-1">100% transparent BEP-20 transactions.</p>
// // // //             </div>
// // // //           </div>
// // // //           <div className="flex items-center gap-4 bg-[#131927] p-5 rounded-xl border border-[#2d3748] hover:border-[#e4c568]/50 transition-colors">
// // // //             <TrendingUp className="text-[#e4c568] shrink-0" size={32} />
// // // //             <div>
// // // //               <h4 className="font-bold text-white text-[15px]">5% Daily Trading ROI</h4>
// // // //               <p className="text-gray-400 text-xs mt-1">Consistent profits over a 25-day cycle.</p>
// // // //             </div>
// // // //           </div>
// // // //           <div className="flex items-center gap-4 bg-[#131927] p-5 rounded-xl border border-[#2d3748] hover:border-[#e4c568]/50 transition-colors">
// // // //             <Network className="text-[#e4c568] shrink-0" size={32} />
// // // //             <div>
// // // //               <h4 className="font-bold text-white text-[15px]">MLM Network Bonus</h4>
// // // //               <p className="text-gray-400 text-xs mt-1">Earn massive rewards by building your team.</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <main className="relative z-10">
        
// // // //         {/* --- EARNING ECOSYSTEM (Replaced Calculator) --- */}
// // // //         <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto" id="about">
// // // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
// // // //             {/* Left Content */}
// // // //             <div>
// // // //               <p className="text-[#e4c568] font-black text-sm tracking-widest uppercase mb-2">How We Generate Value</p>
// // // //               <h2 className="text-3xl sm:text-4xl font-black mb-6 text-white leading-tight">
// // // //                 The Engine Behind Your <br className="hidden sm:block" />
// // // //                 <span className="text-gold-gradient">Daily 5% Returns</span>
// // // //               </h2>
// // // //               <p className="text-gray-400 text-justify mb-6 leading-relaxed text-sm sm:text-base">
// // // //                  worldfinance24 utilizes your deposits as liquidity for our high-frequency crypto trading algorithms and market arbitrage bots. By trading in high-volume markets, our system generates consistent profit margins.
// // // //               </p>
// // // //               <p className="text-gray-400 text-justify mb-8 leading-relaxed text-sm sm:text-base">
// // // //                 A portion of these profits is distributed back to our investors as a guaranteed <strong>5% Daily ROI</strong>, while the rest sustains the platform and funds our lucrative multi-level referral network.
// // // //               </p>

// // // //               <div className="space-y-4">
// // // //                 <div className="bg-[#131927] p-4 rounded-xl border border-[#2d3748] flex gap-4 items-center">
// // // //                   <div className="bg-[#1e2536] p-3 rounded-lg text-[#00ff88] border border-[#2d3748]"><BarChart3 size={24} /></div>
// // // //                   <div>
// // // //                     <h3 className="font-bold text-white text-base">Algorithmic Crypto Trading</h3>
// // // //                     <p className="text-gray-500 text-xs mt-1">24/7 automated trades across Binance & KuCoin.</p>
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="bg-[#131927] p-4 rounded-xl border border-[#2d3748] flex gap-4 items-center">
// // // //                   <div className="bg-[#1e2536] p-3 rounded-lg text-[#e4c568] border border-[#2d3748]"><Layers size={24} /></div>
// // // //                   <div>
// // // //                     <h3 className="font-bold text-white text-base">Liquidity Pooling</h3>
// // // //                     <p className="text-gray-500 text-xs mt-1">Earning fees through decentralized exchange liquidity.</p>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             {/* Right Side: Earning Steps */}
// // // //             <div>
// // // //               <div className="bg-[#131927] border border-[#2d3748] rounded-2xl shadow-xl p-6 sm:p-8 relative overflow-hidden">
// // // //                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#e4c568]/10 blur-[50px] rounded-full"></div>
// // // //                 <h3 className="text-xl sm:text-2xl font-bold mb-8 text-white border-b border-[#2d3748] pb-4">
// // // //                   Start Earning in 3 Simple Steps
// // // //                 </h3>
                
// // // //                 <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.1rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#2d3748] before:to-transparent">
                  
// // // //                   {/* Step 1 */}
// // // //                   <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
// // // //                     <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-[#e4c568] bg-[#161c2d] text-[#e4c568] font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(228,197,104,0.3)] z-10">
// // // //                       1
// // // //                     </div>
// // // //                     <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-[#1e2536] p-4 rounded-xl border border-[#2d3748] shadow-sm">
// // // //                       <div className="flex items-center gap-2 mb-1">
// // // //                         <DollarSign size={16} className="text-[#e4c568]"/>
// // // //                         <h4 className="font-bold text-white text-sm">Deposit USDT</h4>
// // // //                       </div>
// // // //                       <p className="text-xs text-gray-400">Add funds to your wallet using the secure BEP-20 network.</p>
// // // //                     </div>
// // // //                   </div>

// // // //                   {/* Step 2 */}
// // // //                   <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
// // // //                     <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-[#e4c568] bg-[#161c2d] text-[#e4c568] font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(228,197,104,0.3)] z-10">
// // // //                       2
// // // //                     </div>
// // // //                     <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-[#1e2536] p-4 rounded-xl border border-[#2d3748] shadow-sm">
// // // //                       <div className="flex items-center gap-2 mb-1">
// // // //                         <Lock size={16} className="text-[#e4c568]"/>
// // // //                         <h4 className="font-bold text-white text-sm">Activate Package</h4>
// // // //                       </div>
// // // //                       <p className="text-xs text-gray-400">Upgrade your account (Min $30) to unlock earning potentials.</p>
// // // //                     </div>
// // // //                   </div>

// // // //                   {/* Step 3 */}
// // // //                   <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
// // // //                     <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-[#e4c568] bg-[#161c2d] text-[#e4c568] font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(228,197,104,0.3)] z-10">
// // // //                       3
// // // //                     </div>
// // // //                     <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-[#1e2536] p-4 rounded-xl border border-[#2d3748] shadow-sm">
// // // //                       <div className="flex items-center gap-2 mb-1">
// // // //                         <TrendingUp size={16} className="text-[#00ff88]"/>
// // // //                         <h4 className="font-bold text-white text-sm">Earn & Withdraw</h4>
// // // //                       </div>
// // // //                       <p className="text-xs text-gray-400">Get 5% ROI daily. Withdraw directly to your crypto wallet.</p>
// // // //                     </div>
// // // //                   </div>

// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //           </div>
// // // //         </section>

// // // //         {/* --- INVESTMENT PACKAGE TABLE --- */}
// // // //         <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto" id="packages">
// // // //           <div className="text-center mb-12">
// // // //             <h2 className="text-3xl sm:text-4xl font-black mb-3 text-white"> <span className="text-gold-gradient">Packages</span></h2>
// // // //             <p className="text-[#e4c568] font-bold bg-[#131927] border border-[#2d3748] inline-block px-5 py-2 rounded-full shadow-sm text-sm sm:text-base">
// // // //               Guaranteed Daily ROI: <span className="text-white font-black">5% for 25 Days</span>
// // // //             </p>
// // // //           </div>

// // // //           <div className="bg-[#131927] rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-[#2d3748] overflow-hidden">
// // // //             <div className="overflow-x-auto custom-scrollbar">
// // // //               <table className="w-full text-left border-collapse whitespace-nowrap">
// // // //                 <thead>
// // // //                   <tr className="bg-[#1e2536] border-b border-[#2d3748]">
// // // //                     <th className="p-4 sm:p-5 font-black text-center text-[#e4c568] text-xs sm:text-sm uppercase tracking-wider">Sr.</th>
// // // //                     <th className="p-4 sm:p-5 font-black text-center text-[#e4c568] text-xs sm:text-sm uppercase tracking-wider">Package Amount</th>
// // // //                     <th className="p-4 sm:p-5 font-black text-center text-[#e4c568] text-xs sm:text-sm uppercase tracking-wider">Cycle Duration</th>
// // // //                     <th className="p-4 sm:p-5 font-black text-center text-[#e4c568] text-xs sm:text-sm uppercase tracking-wider">Daily ROI</th>
// // // //                     <th className="p-4 sm:p-5 font-black text-right text-[#e4c568] text-xs sm:text-sm uppercase tracking-wider">Total Return</th>
// // // //                   </tr>
// // // //                 </thead>
// // // //                 <tbody>
// // // //                   {packagePlan.map((row, idx) => (
// // // //                     <tr key={idx} className="border-b border-[#2d3748] hover:bg-[#161c2d] transition-colors">
// // // //                       <td className="p-4 sm:p-5 text-center text-gray-400 font-bold">{row.sr}</td>
// // // //                       <td className="p-4 sm:p-5 text-center text-white font-black text-sm sm:text-base">{row.amount}</td>
// // // //                       <td className="p-4 sm:p-5 text-center text-gray-400 font-bold">{row.cycle}</td>
// // // //                       <td className="p-4 sm:p-5 text-center text-[#00ff88] font-bold">{row.dailyRoi}</td>
// // // //                       <td className="p-4 sm:p-5 text-right text-[#e4c568] font-black text-base sm:text-lg">{row.totalReturn}</td>
// // // //                     </tr>
// // // //                   ))}
// // // //                 </tbody>
// // // //               </table>
// // // //             </div>
// // // //           </div>
// // // //           <div className="text-center mt-6">
// // // //              <p className="text-xs text-gray-500">* Minimum upgrade required to access Fund Transfer & Withdrawals is $30.</p>
// // // //           </div>
// // // //         </section>

// // // //         {/* --- FAQ SECTION --- */}
// // // //         <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto" id="faq">
// // // //           <div className="text-center mb-14">
// // // //             <h2 className="text-3xl sm:text-4xl font-black mb-4 text-white">Frequently Asked <span className="text-gold-gradient">Questions</span></h2>
// // // //             <p className="text-gray-400 text-sm sm:text-base">Everything you need to know about worldfinance24.</p>
// // // //           </div>
// // // //           <div className="space-y-4">
// // // //             {faqData.map((faq, index) => (
// // // //               <div key={index} className="bg-[#131927] border border-[#2d3748] rounded-xl overflow-hidden shadow-sm">
// // // //                 <button
// // // //                   onClick={() => toggleFaq(index)}
// // // //                   className="w-full px-5 sm:px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-[#1e2536] transition-colors"
// // // //                 >
// // // //                   <span className="font-bold text-gray-200 text-sm sm:text-base">{faq.q}</span>
// // // //                   <div className={`shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-[#161c2d] border border-[#2d3748] transition-transform duration-300 ${openFaq === index ? 'rotate-180 border-[#e4c568]' : ''}`}>
// // // //                     <ChevronDown className={openFaq === index ? "text-[#e4c568]" : "text-gray-400"} size={16} strokeWidth={3} />
// // // //                   </div>
// // // //                 </button>
// // // //                 <div className={`transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
// // // //                   <div className="px-5 sm:px-6 pb-4 pt-2 border-t border-[#2d3748] bg-[#0b101e]">
// // // //                     <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </section>

// // // //         {/* --- CALL TO ACTION --- */}
// // // //         <section className="py-20 px-4 sm:px-6 bg-gold-gradient text-black text-center relative overflow-hidden">
// // // //           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
// // // //           <div className="max-w-4xl mx-auto relative z-10">
// // // //             <h2 className="text-3xl sm:text-4xl font-black mb-4 uppercase tracking-wide">Start Your Trading Journey Today</h2>
// // // //             <p className="text-black/80 font-bold text-sm sm:text-lg mb-8 max-w-xl mx-auto">
// // // //               Join worldfinance24 now to unlock daily crypto ROI and build a powerful global network.
// // // //             </p>
// // // //             <Link to="/register" className="bg-[#0b101e] text-[#e4c568] font-black px-8 py-4 rounded-lg shadow-2xl hover:bg-[#131927] hover:scale-105 inline-block transition-all text-sm sm:text-base uppercase tracking-widest border border-[#e4c568]/30">
// // // //               Create Free Account
// // // //             </Link>
// // // //           </div>
// // // //         </section>

// // // //       </main>

// // // //       {/* --- FOOTER --- */}
// // // //       <footer className="bg-[#0b101e] border-t border-[#2d3748] text-gray-400 py-12 px-4 sm:px-6 relative z-10">
// // // //         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
// // // //           <div className="col-span-1 md:col-span-2">
// // // //             <div className="flex items-center gap-2 mb-4">
// // // //               <Globe2 className="text-[#e4c568]" size={24} />
// // // //               <span className="text-xl font-black tracking-tight text-white">WORLD<span className="text-[#e4c568]">FINANCE24</span></span>
// // // //             </div>
// // // //             <p className="text-sm leading-relaxed mb-4 max-w-sm">
// // // //               Premium decentralized crypto trading. Empowering users with automated ROI and transparent BEP-20 technology.
// // // //             </p>
// // // //           </div>
          
// // // //           <div>
// // // //             <h3 className="text-white font-bold text-lg mb-4 border-b border-[#2d3748] pb-2 inline-block">Quick Links</h3>
// // // //             <ul className="space-y-2 text-sm font-medium">
// // // //               <li><a href="#" className="hover:text-[#e4c568] transition-colors">Home</a></li>
// // // //               <li><a href="#about" className="hover:text-[#e4c568] transition-colors">Ecosystem</a></li>
// // // //               <li><a href="#packages" className="hover:text-[#e4c568] transition-colors">Packages</a></li>
// // // //               <li><Link to="/login" className="hover:text-[#e4c568] transition-colors">Member Login</Link></li>
// // // //             </ul>
// // // //           </div>
          
// // // //           <div>
// // // //             <h3 className="text-white font-bold text-lg mb-4 border-b border-[#2d3748] pb-2 inline-block">Support Info</h3>
// // // //             <p className="text-sm mb-2 font-medium">Email: <span className="text-[#e4c568]">support@zorogames.net</span></p>
// // // //             <p className="text-sm font-medium">Mon - Sat: 10:00 AM - 6:00 PM</p>
// // // //             <p className="text-xs text-gray-500 mt-4">* Withdrawals processed daily between 10 AM to 12 PM.</p>
// // // //           </div>
// // // //         </div>
// // // //         <div className="max-w-7xl mx-auto border-t border-[#2d3748] pt-6 flex flex-col md:flex-row justify-between items-center text-xs">
// // // //           <p>&copy; {new Date().getFullYear()} worldfinance24. All Rights Reserved.</p>
// // // //           <p className="mt-2 md:mt-0 text-gray-500">Secured via 256-Bit SSL Encryption.</p>
// // // //         </div>
// // // //       </footer>

// // // //     </div>
// // // //   );
// // // // };

// // // // export default Home;






















// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { useNavigate, Link } from 'react-router-dom';
// // // import { 
// // //   ArrowRight, Zap, Layers, 
// // //   Network, ShieldCheck, 
// // //   Globe2, ChevronDown, 
// // //   Users, DollarSign,
// // //   TrendingUp, Activity, BarChart3, Lock, Star
// // // } from 'lucide-react';

// // // const AnimatedCounter = ({ end, duration = 2000, prefix = "", suffix = "", decimals = 0 }) => {
// // //   const [count, setCount] = useState(0);
// // //   const [isVisible, setIsVisible] = useState(false);
// // //   const counterRef = useRef(null);

// // //   useEffect(() => {
// // //     const observer = new IntersectionObserver(
// // //       ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
// // //       { threshold: 0.5 }
// // //     );
// // //     if (counterRef.current) observer.observe(counterRef.current);
// // //     return () => observer.disconnect();
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!isVisible) return;
// // //     let startTimestamp = null;
// // //     const step = (timestamp) => {
// // //       if (!startTimestamp) startTimestamp = timestamp;
// // //       const progress = Math.min((timestamp - startTimestamp) / duration, 1);
// // //       const easeOutQuart = 1 - Math.pow(1 - progress, 4);
// // //       setCount(easeOutQuart * end);
// // //       if (progress < 1) window.requestAnimationFrame(step);
// // //     };
// // //     window.requestAnimationFrame(step);
// // //   }, [isVisible, end, duration]);

// // //   const formattedNumber = count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// // //   return <span ref={counterRef}>{prefix}{formattedNumber}{suffix}</span>;
// // // };

// // // // 🔥 Naya FAQ data bina specific numbers ke
// // // const faqData = [
// // //   { q: "What is zoro games?", a: "zoro games is a secure decentralized crypto platform offering transparent investment processes, daily ROI through crypto trading, and network referral bonuses." },
// // //   { q: "How does the system generate profits?", a: "Our system pools deposited funds into high-frequency crypto trading algorithms, liquidity pools, and arbitrage opportunities across global exchanges to generate stable daily profits for our investors." },
// // //   { q: "How do I activate my package?", a: "Deposit USDT (BEP-20) into your wallet balance. Once funds are received, you can explore and activate your preferred investment package securely from the dashboard." },
// // //   { q: "What is the daily ROI return?", a: "Activated investment packages yield consistent daily returns in USD based on the specific plan you choose from your dashboard." },
// // //   { q: "What are the withdrawal rules?", a: "Withdrawals are processed daily between 10:00 AM - 12:00 PM (IST). An active package is required to place a withdrawal request." }
// // // ];

// // // const Home = () => {
// // //   const navigate = useNavigate();
// // //   const [scrolled, setScrolled] = useState(false);
// // //   const [openFaq, setOpenFaq] = useState(null);

// // //   useEffect(() => {
// // //     const handleScroll = () => setScrolled(window.scrollY > 50);
// // //     window.addEventListener('scroll', handleScroll);
// // //     return () => window.removeEventListener('scroll', handleScroll);
// // //   }, []);

// // //   const toggleFaq = (index) => {
// // //     setOpenFaq(openFaq === index ? null : index);
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-[#0b101e] text-gray-300 font-sans overflow-x-hidden relative selection:bg-[#e4c568]/30 selection:text-[#e4c568]">
      
// // //       <style>{`
// // //         .glass-header {
// // //           background: rgba(11, 16, 30, 0.85);
// // //           backdrop-filter: blur(12px);
// // //           border-bottom: 1px solid rgba(228, 197, 104, 0.1);
// // //         }
// // //         .text-gold-gradient {
// // //           background: linear-gradient(135deg, #e4c568, #d4af37, #f3e5ab);
// // //           -webkit-background-clip: text;
// // //           -webkit-text-fill-color: transparent;
// // //         }
// // //         .bg-gold-gradient {
// // //           background: linear-gradient(135deg, #e4c568, #d4af37);
// // //         }
// // //       `}</style>

// // //       {/* --- TOP HEADER NAVBAR --- */}
// // //       <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-header py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-5'}`}>
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
// // //           <Link to="/" className="flex items-center gap-2 no-underline group">
// // //             <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#131927] border border-[#e4c568]/50 flex items-center justify-center group-hover:border-[#e4c568] transition-colors shadow-[0_0_10px_rgba(228,197,104,0.2)]">
// // //                <Globe2 className="text-[#e4c568]" size={20} />
// // //             </div>
// // //             <span className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center">
// // //               WORLD<span className="text-[#e4c568]">FINANCE24</span>
// // //             </span>
// // //           </Link>
          
// // //           <div className="hidden lg:flex items-center gap-8 font-semibold text-sm text-gray-300">
// // //             <a href="#" className="hover:text-[#e4c568] transition-colors">Home</a>
// // //             <a href="#about" className="hover:text-[#e4c568] transition-colors">Ecosystem</a>
// // //             <a href="#packages" className="hover:text-[#e4c568] transition-colors">Packages</a>
// // //             <a href="#faq" className="hover:text-[#e4c568] transition-colors">FAQ</a>
// // //             <Link to="/login" className="hover:text-[#e4c568] transition-colors">Login</Link>
// // //           </div>
          
// // //           <div className="flex gap-3">
// // //             <Link to="/login" className="hidden sm:flex bg-[#131927] border border-[#e4c568]/30 hover:border-[#e4c568] text-white font-bold px-5 py-2.5 rounded transition text-sm items-center justify-center">
// // //               Login
// // //             </Link>
// // //             <Link to="/register" className="bg-gold-gradient hover:scale-105 text-black font-extrabold px-5 sm:px-6 py-2.5 rounded transition-transform text-sm shadow-[0_0_15px_rgba(228,197,104,0.3)]">
// // //               Register
// // //             </Link>
// // //           </div>
// // //         </div>
// // //       </nav>

// // //       {/* --- HERO SECTION --- */}
// // //       <section className="relative pt-32 pb-20 sm:pb-24 px-4 sm:px-6 bg-[#0b101e] min-h-[85vh] flex items-center overflow-hidden">
// // //         <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#e4c568]/5 blur-[120px] rounded-full pointer-events-none"></div>
// // //         <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

// // //         <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
// // //           <div className="text-center lg:text-left">
// // //             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#131927] border border-[#e4c568]/30 text-[#e4c568] text-xs font-bold tracking-wide mb-6">
// // //               <Activity size={14} /> LIVE USDT (BEP-20) DEPOSITS & WITHDRAWALS
// // //             </div>
// // //             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight text-white">
// // //               MASTER YOUR <br />
// // //               <span className="text-gold-gradient">CRYPTO WEALTH</span>
// // //             </h1>
// // //             <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
// // //               Join worldfinance24 to unlock stable daily ROI through automated crypto trading and powerful multi-level referral networks.
// // //             </p>
// // //             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
// // //               <Link to="/register" className="bg-gold-gradient text-black font-black px-8 py-3.5 rounded transition shadow-[0_0_20px_rgba(228,197,104,0.4)] hover:shadow-[0_0_30px_rgba(228,197,104,0.6)] hover:-translate-y-1 text-center uppercase tracking-wider text-sm">
// // //                 Start Earning
// // //               </Link>
// // //               <Link to="/login" className="bg-[#161c2d] hover:bg-[#1e2536] border border-[#2d3748] text-white font-bold px-8 py-3.5 rounded transition text-center uppercase tracking-wider text-sm">
// // //                 Member Dashboard
// // //               </Link>
// // //             </div>
// // //           </div>

// // //           <div className="hidden lg:block relative">
// // //             <div className="absolute inset-0 bg-gradient-to-tr from-[#e4c568]/10 to-transparent rounded-full blur-[80px]"></div>
// // //             <div className="bg-[#131927] border border-[#2d3748] p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] relative z-10">
// // //               <div className="flex justify-between items-center mb-6 border-b border-[#2d3748] pb-4">
// // //                 <span className="text-white font-bold flex items-center gap-2"><TrendingUp className="text-[#00ff88]" /> Platform Stats</span>
// // //                 <span className="text-[#e4c568] text-xs font-bold bg-[#e4c568]/10 px-3 py-1 rounded">UPDATED LIVE</span>
// // //               </div>
// // //               <div className="space-y-6">
// // //                 <div>
// // //                   <p className="text-gray-500 text-sm font-semibold mb-1">Total Active Traders</p>
// // //                   <p className="text-3xl font-black text-white"><AnimatedCounter end={12540} prefix="" suffix="+" /></p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-gray-500 text-sm font-semibold mb-1">Total Volume Traded</p>
// // //                   <p className="text-3xl font-black text-[#00ff88]"><AnimatedCounter end={458} prefix="$" suffix="K+" decimals={1} /></p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-gray-500 text-sm font-semibold mb-1">Active Global Markets</p>
// // //                   <p className="text-3xl font-black text-[#e4c568]"><AnimatedCounter end={40} prefix="" suffix="+" decimals={0} /></p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

     

// // //       <main className="relative z-10">
        
// // //         {/* --- ABOUT SECTION --- */}
// // //         <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto" id="about">
// // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
// // //             {/* Left Content */}
// // //             <div>
// // //               <p className="text-[#e4c568] font-black text-sm tracking-widest uppercase mb-2">How We Generate Value</p>
// // //               <h2 className="text-3xl sm:text-4xl font-black mb-6 text-white leading-tight">
// // //                 The Engine Behind Your <br className="hidden sm:block" />
// // //                 <span className="text-gold-gradient">Consistent Returns</span>
// // //               </h2>
// // //               <p className="text-gray-400 text-justify mb-6 leading-relaxed text-sm sm:text-base">
// // //                  worldfinance24 utilizes deposited liquidity to power our high-frequency crypto trading algorithms and market arbitrage bots. By trading in high-volume markets, our system generates consistent profit margins regardless of market direction.
// // //               </p>
// // //               <p className="text-gray-400 text-justify mb-8 leading-relaxed text-sm sm:text-base">
// // //                 A portion of these profits is distributed back to our investors as a stable Daily ROI, while the rest sustains the platform and funds our lucrative multi-level referral network.
// // //               </p>

// // //               <div className="space-y-4">
// // //                 <div className="bg-[#131927] p-4 rounded-xl border border-[#2d3748] flex gap-4 items-center">
// // //                   <div className="bg-[#1e2536] p-3 rounded-lg text-[#00ff88] border border-[#2d3748]"><BarChart3 size={24} /></div>
// // //                   <div>
// // //                     <h3 className="font-bold text-white text-base">Algorithmic Crypto Trading</h3>
// // //                     <p className="text-gray-500 text-xs mt-1">24/7 automated trades across global exchanges.</p>
// // //                   </div>
// // //                 </div>
// // //                 <div className="bg-[#131927] p-4 rounded-xl border border-[#2d3748] flex gap-4 items-center">
// // //                   <div className="bg-[#1e2536] p-3 rounded-lg text-[#e4c568] border border-[#2d3748]"><Layers size={24} /></div>
// // //                   <div>
// // //                     <h3 className="font-bold text-white text-base">Liquidity Pooling</h3>
// // //                     <p className="text-gray-500 text-xs mt-1">Earning fees through decentralized exchange liquidity.</p>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Right Side: Earning Steps */}
// // //             <div>
// // //               <div className="bg-[#131927] border border-[#2d3748] rounded-2xl shadow-xl p-6 sm:p-8 relative overflow-hidden">
// // //                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#e4c568]/10 blur-[50px] rounded-full"></div>
// // //                 <h3 className="text-xl sm:text-2xl font-bold mb-8 text-white border-b border-[#2d3748] pb-4">
// // //                   Start Earning in 3 Simple Steps
// // //                 </h3>
                
// // //                 <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.1rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#2d3748] before:to-transparent">
                  
// // //                   {/* Step 1 */}
// // //                   <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
// // //                     <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-[#e4c568] bg-[#161c2d] text-[#e4c568] font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(228,197,104,0.3)] z-10">
// // //                       1
// // //                     </div>
// // //                     <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-[#1e2536] p-4 rounded-xl border border-[#2d3748] shadow-sm">
// // //                       <div className="flex items-center gap-2 mb-1">
// // //                         <DollarSign size={16} className="text-[#e4c568]"/>
// // //                         <h4 className="font-bold text-white text-sm">Deposit USDT</h4>
// // //                       </div>
// // //                       <p className="text-xs text-gray-400">Add funds to your wallet using the secure BEP-20 network.</p>
// // //                     </div>
// // //                   </div>

// // //                   {/* Step 2 */}
// // //                   <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
// // //                     <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-[#e4c568] bg-[#161c2d] text-[#e4c568] font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(228,197,104,0.3)] z-10">
// // //                       2
// // //                     </div>
// // //                     <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-[#1e2536] p-4 rounded-xl border border-[#2d3748] shadow-sm">
// // //                       <div className="flex items-center gap-2 mb-1">
// // //                         <Lock size={16} className="text-[#e4c568]"/>
// // //                         <h4 className="font-bold text-white text-sm">Activate Package</h4>
// // //                       </div>
// // //                       <p className="text-xs text-gray-400">Select and activate a package to unlock your earning potential.</p>
// // //                     </div>
// // //                   </div>

// // //                   {/* Step 3 */}
// // //                   <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
// // //                     <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-[#e4c568] bg-[#161c2d] text-[#e4c568] font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(228,197,104,0.3)] z-10">
// // //                       3
// // //                     </div>
// // //                     <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-[#1e2536] p-4 rounded-xl border border-[#2d3748] shadow-sm">
// // //                       <div className="flex items-center gap-2 mb-1">
// // //                         <TrendingUp size={16} className="text-[#00ff88]"/>
// // //                         <h4 className="font-bold text-white text-sm">Earn & Withdraw</h4>
// // //                       </div>
// // //                       <p className="text-xs text-gray-400">Enjoy consistent ROI daily. Withdraw directly to your crypto wallet.</p>
// // //                     </div>
// // //                   </div>

// // //                 </div>
// // //               </div>
// // //             </div>

// // //           </div>
// // //         </section>

// // //         {/* --- FLEXIBLE PACKAGES SECTION (Table Removed) --- */}
// // //         <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto" id="packages">
// // //           <div className="text-center mb-12">
// // //             <h2 className="text-3xl sm:text-4xl font-black mb-3 text-white"> Flexible <span className="text-gold-gradient">Packages</span></h2>
// // //             <p className="text-[#e4c568] font-bold bg-[#131927] border border-[#2d3748] inline-block px-5 py-2 rounded-full shadow-sm text-sm sm:text-base">
// // //               Tailored plans to suit every financial goal
// // //             </p>
// // //           </div>

// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
// // //             <div className="bg-[#131927] border border-[#2d3748] hover:border-[#e4c568] p-8 rounded-2xl transition-all hover:-translate-y-2 group">
// // //               <div className="w-14 h-14 bg-[#1e2536] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-[#2d3748]">
// // //                 <Star className="text-gray-400" size={24} />
// // //               </div>
// // //               <h3 className="text-2xl font-black text-white mb-2">Starter Plans</h3>
// // //               <p className="text-gray-400 text-sm mb-6 leading-relaxed">
// // //                 Perfect for beginners looking to step into the world of crypto earning with minimal risk.
// // //               </p>
// // //               <ul className="space-y-3 mb-8">
// // //                 <li className="flex items-center gap-2 text-sm text-gray-300"><CheckIcon /> Entry-level access</li>
// // //                 <li className="flex items-center gap-2 text-sm text-gray-300"><CheckIcon /> Standard ROI rates</li>
// // //                 <li className="flex items-center gap-2 text-sm text-gray-300"><CheckIcon /> Basic network bonuses</li>
// // //               </ul>
// // //               <Link to="/login" className="block text-center border border-[#e4c568] text-[#e4c568] hover:bg-[#e4c568] hover:text-black font-bold py-3 rounded-lg transition-colors text-sm">View in Dashboard</Link>
// // //             </div>

// // //             <div className="bg-[#131927] border border-[#e4c568] relative p-8 rounded-2xl transition-all hover:-translate-y-2 shadow-[0_0_25px_rgba(228,197,104,0.15)] group">
// // //               <div className="absolute top-0 right-0 bg-[#e4c568] text-black text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-lg rounded-tr-lg">Most Popular</div>
// // //               <div className="w-14 h-14 bg-gold-gradient rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(228,197,104,0.4)]">
// // //                 <TrendingUp className="text-black" size={24} />
// // //               </div>
// // //               <h3 className="text-2xl font-black text-white mb-2">Professional Plans</h3>
// // //               <p className="text-gray-400 text-sm mb-6 leading-relaxed">
// // //                 Designed for serious investors seeking optimized returns and team-building potential.
// // //               </p>
// // //               <ul className="space-y-3 mb-8">
// // //                 <li className="flex items-center gap-2 text-sm text-gray-300"><CheckIcon /> Mid-tier investments</li>
// // //                 <li className="flex items-center gap-2 text-sm text-gray-300"><CheckIcon /> Enhanced ROI access</li>
// // //                 <li className="flex items-center gap-2 text-sm text-gray-300"><CheckIcon /> Advanced network rewards</li>
// // //               </ul>
// // //               <Link to="/login" className="block text-center bg-gold-gradient text-black font-bold py-3 rounded-lg transition-colors text-sm">View in Dashboard</Link>
// // //             </div>

// // //             <div className="bg-[#131927] border border-[#2d3748] hover:border-[#e4c568] p-8 rounded-2xl transition-all hover:-translate-y-2 group">
// // //               <div className="w-14 h-14 bg-[#1e2536] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-[#2d3748]">
// // //                 <ShieldCheck className="text-gray-400" size={24} />
// // //               </div>
// // //               <h3 className="text-2xl font-black text-white mb-2">Executive Plans</h3>
// // //               <p className="text-gray-400 text-sm mb-6 leading-relaxed">
// // //                 For crypto whales wanting maximum leverage, highest yields, and priority support.
// // //               </p>
// // //               <ul className="space-y-3 mb-8">
// // //                 <li className="flex items-center gap-2 text-sm text-gray-300"><CheckIcon /> High-volume limits</li>
// // //                 <li className="flex items-center gap-2 text-sm text-gray-300"><CheckIcon /> Premium ROI multipliers</li>
// // //                 <li className="flex items-center gap-2 text-sm text-gray-300"><CheckIcon /> Maximum network depth</li>
// // //               </ul>
// // //               <Link to="/login" className="block text-center border border-[#e4c568] text-[#e4c568] hover:bg-[#e4c568] hover:text-black font-bold py-3 rounded-lg transition-colors text-sm">View in Dashboard</Link>
// // //             </div>

// // //           </div>
// // //         </section>

// // //         {/* --- FAQ SECTION --- */}
// // //         <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto" id="faq">
// // //           <div className="text-center mb-14">
// // //             <h2 className="text-3xl sm:text-4xl font-black mb-4 text-white">Frequently Asked <span className="text-gold-gradient">Questions</span></h2>
// // //             <p className="text-gray-400 text-sm sm:text-base">Everything you need to know about worldfinance24.</p>
// // //           </div>
// // //           <div className="space-y-4">
// // //             {faqData.map((faq, index) => (
// // //               <div key={index} className="bg-[#131927] border border-[#2d3748] rounded-xl overflow-hidden shadow-sm">
// // //                 <button
// // //                   onClick={() => toggleFaq(index)}
// // //                   className="w-full px-5 sm:px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-[#1e2536] transition-colors"
// // //                 >
// // //                   <span className="font-bold text-gray-200 text-sm sm:text-base">{faq.q}</span>
// // //                   <div className={`shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-[#161c2d] border border-[#2d3748] transition-transform duration-300 ${openFaq === index ? 'rotate-180 border-[#e4c568]' : ''}`}>
// // //                     <ChevronDown className={openFaq === index ? "text-[#e4c568]" : "text-gray-400"} size={16} strokeWidth={3} />
// // //                   </div>
// // //                 </button>
// // //                 <div className={`transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
// // //                   <div className="px-5 sm:px-6 pb-4 pt-2 border-t border-[#2d3748] bg-[#0b101e]">
// // //                     <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </section>

// // //         {/* --- CALL TO ACTION --- */}
// // //         <section className="py-20 px-4 sm:px-6 bg-gold-gradient text-black text-center relative overflow-hidden">
// // //           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
// // //           <div className="max-w-4xl mx-auto relative z-10">
// // //             <h2 className="text-3xl sm:text-4xl font-black mb-4 uppercase tracking-wide">Start Your Trading Journey Today</h2>
// // //             <p className="text-black/80 font-bold text-sm sm:text-lg mb-8 max-w-xl mx-auto">
// // //               Join worldfinance24 now to unlock daily crypto ROI and build a powerful global network.
// // //             </p>
// // //             <Link to="/register" className="bg-[#0b101e] text-[#e4c568] font-black px-8 py-4 rounded-lg shadow-2xl hover:bg-[#131927] hover:scale-105 inline-block transition-all text-sm sm:text-base uppercase tracking-widest border border-[#e4c568]/30">
// // //               Create Free Account
// // //             </Link>
// // //           </div>
// // //         </section>

// // //       </main>

// // //       {/* --- FOOTER --- */}
// // //       <footer className="bg-[#0b101e] border-t border-[#2d3748] text-gray-400 py-12 px-4 sm:px-6 relative z-10">
// // //         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
// // //           <div className="col-span-1 md:col-span-2">
// // //             <div className="flex items-center gap-2 mb-4">
// // //               <Globe2 className="text-[#e4c568]" size={24} />
// // //               <span className="text-xl font-black tracking-tight text-white">WORLD<span className="text-[#e4c568]">FINANCE24</span></span>
// // //             </div>
// // //             <p className="text-sm leading-relaxed mb-4 max-w-sm">
// // //               Premium decentralized crypto trading. Empowering users with automated ROI and transparent BEP-20 technology.
// // //             </p>
// // //           </div>
          
// // //           <div>
// // //             <h3 className="text-white font-bold text-lg mb-4 border-b border-[#2d3748] pb-2 inline-block">Quick Links</h3>
// // //             <ul className="space-y-2 text-sm font-medium">
// // //               <li><a href="#" className="hover:text-[#e4c568] transition-colors">Home</a></li>
// // //               <li><a href="#about" className="hover:text-[#e4c568] transition-colors">Ecosystem</a></li>
// // //               <li><a href="#packages" className="hover:text-[#e4c568] transition-colors">Packages</a></li>
// // //               <li><Link to="/login" className="hover:text-[#e4c568] transition-colors">Member Login</Link></li>
// // //             </ul>
// // //           </div>
          
// // //           <div>
// // //             <h3 className="text-white font-bold text-lg mb-4 border-b border-[#2d3748] pb-2 inline-block">Support Info</h3>
// // //             <p className="text-sm mb-2 font-medium">Email: <span className="text-[#e4c568]">support@zorogames.net</span></p>
// // //             <p className="text-sm font-medium">Mon - Sat: 10:00 AM - 6:00 PM</p>
// // //           </div>
// // //         </div>
// // //         <div className="max-w-7xl mx-auto border-t border-[#2d3748] pt-6 flex flex-col md:flex-row justify-between items-center text-xs">
// // //           <p>&copy; {new Date().getFullYear()} worldtogether24. All Rights Reserved.</p>
// // //           <p className="mt-2 md:mt-0 text-gray-500">Secured via 256-Bit SSL Encryption.</p>
// // //         </div>
// // //       </footer>

// // //     </div>
// // //   );
// // // };

// // // // Check Icon Component Helper
// // // const CheckIcon = () => (
// // //   <svg className="w-4 h-4 text-[#00ff88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
// // //   </svg>
// // // );

// // // export default Home;





// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import {
// //   Gamepad2,
// //   Menu,
// //   X,
// //   ChevronRight,
// //   ChevronDown,
// //   Zap,
// //   Trophy,
// //   Users,
// //   Target,
// //   Play,
// //   Swords,
// //   Shield,
// //   Sparkles,
// //   ArrowUpRight,
// //   Headphones,
// //   Monitor,
// //   Joystick,
// // } from "lucide-react";

// // const games = [
// //   {
// //     title: "Cyber Strike",
// //     category: "ACTION",
// //     players: "FPS / SHOOTER",
// //     image:
// //       "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=85",
// //     color: "#A78BFA",
// //     tag: "FEATURED",
// //   },
// //   {
// //     title: "Neon Racing",
// //     category: "RACING",
// //     players: "SPEED / ARCADE",
// //     image:
// //       "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=85",
// //     color: "#22D3EE",
// //     tag: "HOT",
// //   },
// //   {
// //     title: "Shadow Arena",
// //     category: "ADVENTURE",
// //     players: "FANTASY / RPG",
// //     image:
// //       "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=85",
// //     color: "#F472B6",
// //     tag: "EXPLORE",
// //   },
// // ];

// // const features = [
// //   {
// //     icon: Swords,
// //     title: "Epic Game Library",
// //     text: "Discover action-packed adventures, racing challenges and competitive games.",
// //   },
// //   {
// //     icon: Trophy,
// //     title: "Compete & Climb",
// //     text: "Challenge yourself, improve your skills and aim for the top of the leaderboard.",
// //   },
// //   {
// //     icon: Zap,
// //     title: "Built for Gamers",
// //     text: "Enjoy a bold gaming experience with smooth animations and responsive controls.",
// //   },
// // ];

// // const faqs = [
// //   {
// //     q: "What is ZORO GAMES?",
// //     a: "ZORO GAMES is a gaming platform concept designed to bring games, player profiles and competitive gaming features together in one place.",
// //   },
// //   {
// //     q: "How do I get started?",
// //     a: "Create an account using the Register page, or sign in to your existing account. Available features depend on the games and services connected to the platform.",
// //   },
// //   {
// //     q: "Can I play on mobile?",
// //     a: "The website layout is designed to adapt to mobile, tablet and desktop screens. Actual gameplay compatibility depends on the individual game.",
// //   },
// //   {
// //     q: "Where can I see my ranking?",
// //     a: "Visit the Leaderboard section to see player rankings when leaderboard data is connected.",
// //   },
// // ];

// // const GameCard = ({ game, index }) => (
// //   <article
// //     className="zoro-game-card group"
// //     style={{ "--game-color": game.color, animationDelay: `${index * 100}ms` }}
// //   >
// //     <div className="relative h-56 overflow-hidden">
// //       <img
// //         src={game.image}
// //         alt={`${game.title} gaming artwork`}
// //         loading="lazy"
// //         className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
// //       />

// //       <div className="absolute inset-0 bg-gradient-to-t from-[#080910] via-black/10 to-black/20" />

// //       <span
// //         className="absolute left-4 top-4 rounded-md border px-3 py-1 text-[10px] font-black tracking-[0.18em]"
// //         style={{
// //           borderColor: `${game.color}70`,
// //           background: "#090A13D9",
// //           color: game.color,
// //         }}
// //       >
// //         {game.tag}
// //       </span>

// //       <button
// //         type="button"
// //         onClick={() =>
// //           window.dispatchEvent(
// //             new CustomEvent("zoro:game-select", {
// //               detail: { title: game.title },
// //             })
// //           )
// //         }
// //         aria-label={`Select ${game.title}`}
// //         className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:scale-110 hover:border-cyan-300 hover:text-cyan-300"
// //       >
// //         <Play size={17} fill="currentColor" />
// //       </button>
// //     </div>

// //     <div className="p-5">
// //       <p
// //         className="mb-2 text-[10px] font-black tracking-[0.22em]"
// //         style={{ color: game.color }}
// //       >
// //         {game.category}
// //       </p>

// //       <h3 className="text-xl font-black text-white">{game.title}</h3>

// //       <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-4">
// //         <span className="text-[10px] font-bold tracking-widest text-slate-500">
// //           {game.players}
// //         </span>
// //         <span className="flex items-center gap-1 text-xs font-bold text-slate-300">
// //           DETAILS <ArrowUpRight size={14} />
// //         </span>
// //       </div>
// //     </div>
// //   </article>
// // );

// // export default function Home() {
// //   const [scrolled, setScrolled] = useState(false);
// //   const [mobileMenu, setMobileMenu] = useState(false);
// //   const [openFaq, setOpenFaq] = useState(0);

// //   useEffect(() => {
// //     const handleScroll = () => setScrolled(window.scrollY > 24);
// //     window.addEventListener("scroll", handleScroll, { passive: true });
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   const closeMenu = () => setMobileMenu(false);

// //   const navLinks = [
// //     ["Home", "#home"],
// //     ["Games", "#games"],
// //     ["Features", "#features"],
// //     ["Leaderboard", "#leaderboard"],
// //     ["FAQ", "#faq"],
// //   ];

// //   return (
// //     <div className="zoro-site min-h-screen overflow-x-hidden bg-[#080910] text-white">
// //       <style>{`
// //         .zoro-site {
// //           --purple: #A78BFA;
// //           --cyan: #22D3EE;
// //           --panel: #10111D;
// //           --line: rgba(255,255,255,.09);
// //           font-family: Inter, ui-sans-serif, system-ui, sans-serif;
// //         }

// //         .zoro-site * { box-sizing: border-box; }
// //         .zoro-site a { text-decoration: none; }

// //         .zoro-grid {
// //           background-image:
// //             linear-gradient(rgba(167,139,250,.045) 1px, transparent 1px),
// //             linear-gradient(90deg, rgba(167,139,250,.045) 1px, transparent 1px);
// //           background-size: 42px 42px;
// //           mask-image: linear-gradient(to bottom, black, transparent 90%);
// //         }

// //         .zoro-logo {
// //           background: linear-gradient(135deg,#C4B5FD,#22D3EE);
// //           box-shadow: 0 0 25px rgba(167,139,250,.22);
// //         }

// //         .zoro-gradient-text {
// //           background: linear-gradient(100deg,#FFFFFF 5%,#C4B5FD 45%,#22D3EE 100%);
// //           -webkit-background-clip: text;
// //           background-clip: text;
// //           color: transparent;
// //         }

// //         .zoro-primary {
// //           background: linear-gradient(105deg,#A78BFA,#6D5AE8);
// //           box-shadow: 0 0 28px rgba(139,92,246,.23);
// //           transition: transform .2s, box-shadow .2s;
// //         }

// //         .zoro-primary:hover {
// //           transform: translateY(-2px);
// //           box-shadow: 0 0 36px rgba(139,92,246,.4);
// //         }

// //         .zoro-outline {
// //           border: 1px solid rgba(34,211,238,.35);
// //           transition: background .2s, border-color .2s, transform .2s;
// //         }

// //         .zoro-outline:hover {
// //           background: rgba(34,211,238,.08);
// //           border-color: #22D3EE;
// //           transform: translateY(-2px);
// //         }

// //         .zoro-panel {
// //           border: 1px solid var(--line);
// //           background: linear-gradient(145deg,#131421,#0D0E18);
// //         }

// //         .zoro-game-card {
// //           overflow: hidden;
// //           border: 1px solid rgba(255,255,255,.09);
// //           border-radius: 15px;
// //           background: #10111D;
// //           transition: transform .3s, border-color .3s, box-shadow .3s;
// //         }

// //         .zoro-game-card:hover {
// //           transform: translateY(-7px);
// //           border-color: var(--game-color);
// //           box-shadow: 0 14px 45px rgba(0,0,0,.3);
// //         }

// //         .zoro-orb {
// //           animation: zoro-float 7s ease-in-out infinite;
// //         }

// //         .zoro-pulse {
// //           animation: zoro-pulse 2.5s ease-in-out infinite;
// //         }

// //         .zoro-reveal {
// //           animation: zoro-enter .7s ease-out both;
// //         }

// //         @keyframes zoro-float {
// //           0%,100% { transform: translateY(0) rotate(0deg); }
// //           50% { transform: translateY(-14px) rotate(2deg); }
// //         }

// //         @keyframes zoro-pulse {
// //           0%,100% { opacity:.55; }
// //           50% { opacity:1; }
// //         }

// //         @keyframes zoro-enter {
// //           from { opacity:0; transform:translateY(18px); }
// //           to { opacity:1; transform:translateY(0); }
// //         }

// //         .zoro-scan {
// //           background: linear-gradient(transparent,rgba(34,211,238,.035),transparent);
// //           background-size: 100% 200%;
// //           animation: zoro-scan 5s linear infinite;
// //         }

// //         @keyframes zoro-scan {
// //           from { background-position: 0 -100%; }
// //           to { background-position: 0 200%; }
// //         }

// //         .zoro-faq-answer {
// //           display: grid;
// //           grid-template-rows: 0fr;
// //           transition: grid-template-rows .3s ease;
// //         }

// //         .zoro-faq-answer[data-open="true"] {
// //           grid-template-rows: 1fr;
// //         }

// //         .zoro-faq-answer > div { overflow: hidden; }

// //         @media (prefers-reduced-motion: reduce) {
// //           .zoro-site *, .zoro-site *::before, .zoro-site *::after {
// //             animation-duration: .01ms !important;
// //             animation-iteration-count: 1 !important;
// //             scroll-behavior: auto !important;
// //             transition-duration: .01ms !important;
// //           }
// //         }
// //       `}</style>

// //       {/* NAVBAR */}
// //       <header
// //         className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
// //           scrolled
// //             ? "border-white/[0.08] bg-[#080910]/95 py-3 shadow-xl backdrop-blur-xl"
// //             : "border-transparent bg-[#080910]/50 py-5 backdrop-blur-sm"
// //         }`}
// //       >
// //         <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
// //           <Link
// //             to="/"
// //             onClick={closeMenu}
// //             className="flex items-center gap-3"
// //             aria-label="ZORO GAMES home"
// //           >
// //             <span className="zoro-logo flex h-10 w-10 items-center justify-center rounded-xl text-[#090910]">
// //               <Gamepad2 size={24} strokeWidth={2.5} />
// //             </span>

// //             <span className="text-lg font-black tracking-tight sm:text-xl">
// //               ZORO<span className="text-cyan-300"> GAMES</span>
// //               <span className="mt-0.5 block text-[8px] font-bold tracking-[.35em] text-slate-500">
// //                 ENTER THE NEXT LEVEL
// //               </span>
// //             </span>
// //           </Link>

// //           <div className="hidden items-center gap-7 lg:flex">
// //             {navLinks.map(([label, href]) => (
// //               <a
// //                 key={label}
// //                 href={href}
// //                 className="text-xs font-bold text-slate-400 transition hover:text-cyan-300"
// //               >
// //                 {label}
// //               </a>
// //             ))}
// //           </div>

// //           <div className="hidden items-center gap-3 sm:flex">
// //             <Link
// //               to="/login"
// //               className="rounded-lg px-4 py-2.5 text-xs font-extrabold text-white transition hover:text-cyan-300"
// //             >
// //               LOG IN
// //             </Link>
// //             <Link
// //               to="/register"
// //               className="zoro-primary rounded-lg px-5 py-3 text-xs font-black tracking-wide text-white"
// //             >
// //               JOIN THE GAME <ChevronRight className="ml-1 inline" size={15} />
// //             </Link>
// //           </div>

// //           <button
// //             type="button"
// //             className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 lg:hidden"
// //             onClick={() => setMobileMenu(!mobileMenu)}
// //             aria-label={mobileMenu ? "Close menu" : "Open menu"}
// //             aria-expanded={mobileMenu}
// //           >
// //             {mobileMenu ? <X size={21} /> : <Menu size={21} />}
// //           </button>
// //         </nav>

// //         {mobileMenu && (
// //           <div className="border-t border-white/10 bg-[#0B0C16] px-5 pb-5 pt-4 lg:hidden">
// //             <div className="flex flex-col">
// //               {navLinks.map(([label, href]) => (
// //                 <a
// //                   key={label}
// //                   href={href}
// //                   onClick={closeMenu}
// //                   className="border-b border-white/[0.06] py-3 text-sm font-bold text-slate-300"
// //                 >
// //                   {label}
// //                 </a>
// //               ))}
// //               <div className="mt-4 grid grid-cols-2 gap-3">
// //                 <Link
// //                   to="/login"
// //                   onClick={closeMenu}
// //                   className="zoro-outline rounded-lg py-3 text-center text-xs font-black"
// //                 >
// //                   LOG IN
// //                 </Link>
// //                 <Link
// //                   to="/register"
// //                   onClick={closeMenu}
// //                   className="zoro-primary rounded-lg py-3 text-center text-xs font-black"
// //                 >
// //                   REGISTER
// //                 </Link>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </header>

// //       <main>
// //         {/* HERO */}
// //         <section
// //           id="home"
// //           className="relative flex min-h-[740px] items-center overflow-hidden pb-16 pt-32 sm:min-h-[790px] sm:pb-24 sm:pt-36"
// //         >
// //           <div className="zoro-grid pointer-events-none absolute inset-0" />

// //           <div className="zoro-orb pointer-events-none absolute -left-32 top-36 h-80 w-80 rounded-full bg-violet-600/15 blur-[110px]" />
// //           <div className="zoro-orb pointer-events-none absolute -right-24 top-44 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

// //           <div className="zoro-scan pointer-events-none absolute inset-0" />

// //           <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.08fr_.92fr]">
// //             <div className="zoro-reveal text-center lg:text-left">
// //               <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-400/[0.07] px-4 py-2">
// //                 <span className="zoro-pulse h-2 w-2 rounded-full bg-cyan-300" />
// //                 <span className="text-[10px] font-black tracking-[.2em] text-violet-200 sm:text-xs">
// //                   YOUR WORLD. YOUR GAME.
// //                 </span>
// //                 <Sparkles size={14} className="text-cyan-300" />
// //               </div>

// //               <h1 className="mb-6 text-5xl font-black leading-[1.04] tracking-[-.055em] sm:text-6xl md:text-7xl xl:text-[82px]">
// //                 LEVEL UP
// //                 <br />
// //                 YOUR
// //                 <br />
// //                 <span className="zoro-gradient-text">GAME.</span>
// //               </h1>

// //               <p className="mx-auto mb-9 max-w-xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8 lg:mx-0">
// //                 Enter the next generation of gaming. Discover epic adventures,
// //                 sharpen your skills and find your place in the ZORO GAMES
// //                 universe.
// //               </p>

// //               <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
// //                 <a
// //                   href="#games"
// //                   className="zoro-primary inline-flex items-center justify-center gap-3 rounded-xl px-7 py-4 text-xs font-black tracking-[.12em] text-white"
// //                 >
// //                   <Play size={16} fill="currentColor" />
// //                   EXPLORE GAMES
// //                   <ChevronRight size={16} />
// //                 </a>

// //                 <Link
// //                   to="/register"
// //                   className="zoro-outline inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-xs font-black tracking-[.12em] text-cyan-200"
// //                 >
// //                   <Gamepad2 size={17} />
// //                   CREATE ACCOUNT
// //                 </Link>
// //               </div>

// //               <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] font-bold tracking-wider text-slate-500 lg:justify-start">
// //                 <span className="flex items-center gap-2">
// //                   <Shield size={14} className="text-cyan-300" />
// //                   GAMER-FIRST DESIGN
// //                 </span>
// //                 <span className="flex items-center gap-2">
// //                   <Monitor size={14} className="text-violet-300" />
// //                   RESPONSIVE EXPERIENCE
// //                 </span>
// //               </div>
// //             </div>

// //             {/* HERO ART */}
// //             <div className="relative mx-auto w-full max-w-[510px]">
// //               <div className="pointer-events-none absolute inset-8 rounded-full bg-violet-600/20 blur-[85px]" />

// //               <div className="zoro-orb relative">
// //                 <div className="absolute -inset-3 rounded-[28px] border border-violet-400/10 rotate-3" />
// //                 <div className="absolute -inset-3 rounded-[28px] border border-cyan-300/10 -rotate-3" />

// //                 <div className="zoro-panel relative overflow-hidden rounded-2xl p-3 shadow-2xl sm:p-4">
// //                   <div className="relative h-[300px] overflow-hidden rounded-xl sm:h-[390px]">
// //                     <img
// //                       src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=90"
// //                       alt="Gaming arena with players and esports equipment"
// //                       fetchPriority="high"
// //                       className="h-full w-full object-cover"
// //                     />
// //                     <div className="absolute inset-0 bg-gradient-to-t from-[#080910] via-[#080910]/15 to-violet-950/10" />

// //                     <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-md">
// //                       <span className="h-2 w-2 rounded-full bg-cyan-300" />
// //                       <span className="text-[9px] font-black tracking-[.18em]">
// //                         ZORO UNIVERSE
// //                       </span>
// //                     </div>

// //                     <div className="absolute inset-x-5 bottom-5">
// //                       <p className="mb-2 text-[10px] font-black tracking-[.3em] text-cyan-300">
// //                         READY. PLAYER. ONE.
// //                       </p>
// //                       <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
// //                         GAME
// //                         <span className="text-violet-300"> ON.</span>
// //                       </h2>
// //                       <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
// //                         <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-violet-400 to-cyan-300" />
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="grid grid-cols-3 gap-2 pt-3">
// //                     {[
// //                       { icon: Swords, label: "ACTION" },
// //                       { icon: Target, label: "SKILL" },
// //                       { icon: Trophy, label: "COMPETE" },
// //                     ].map(({ icon: Icon, label }) => (
// //                       <div
// //                         key={label}
// //                         className="flex items-center justify-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.025] py-3"
// //                       >
// //                         <Icon size={15} className="text-violet-300" />
// //                         <span className="text-[9px] font-black tracking-wider text-slate-300">
// //                           {label}
// //                         </span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="absolute -left-5 top-16 hidden rounded-xl border border-violet-300/20 bg-[#11121F]/95 p-3 shadow-xl sm:block">
// //                 <Joystick size={22} className="text-violet-300" />
// //                 <p className="mt-2 text-[9px] font-black tracking-widest text-slate-300">
// //                   PLAY YOUR WAY
// //                 </p>
// //               </div>

// //               <div className="absolute -right-3 bottom-16 hidden rounded-xl border border-cyan-300/20 bg-[#11121F]/95 p-3 shadow-xl sm:block">
// //                 <Zap size={22} className="text-cyan-300" />
// //                 <p className="mt-2 text-[9px] font-black tracking-widest text-slate-300">
// //                   NEXT LEVEL
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* GAME CATEGORIES */}
// //         <section className="border-y border-white/[0.07] bg-[#0C0D16]">
// //           <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 py-5 sm:grid-cols-4 sm:px-8">
// //             {[
// //               { icon: Swords, title: "ACTION", sub: "Fast-paced gameplay" },
// //               { icon: Target, title: "CHALLENGE", sub: "Test your skills" },
// //               { icon: Trophy, title: "COMPETITIVE", sub: "Chase the top spot" },
// //               { icon: Users, title: "COMMUNITY", sub: "Play together" },
// //             ].map(({ icon: Icon, title, sub }) => (
// //               <a
// //                 href="#games"
// //                 key={title}
// //                 className="group flex items-center gap-3 rounded-xl p-4 transition hover:bg-white/[0.035]"
// //               >
// //                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-300/[0.07] text-violet-300 transition group-hover:border-cyan-300/30 group-hover:text-cyan-300">
// //                   <Icon size={20} />
// //                 </div>
// //                 <div>
// //                   <p className="text-[10px] font-black tracking-wider text-white sm:text-xs">
// //                     {title}
// //                   </p>
// //                   <p className="mt-1 text-[10px] text-slate-500">{sub}</p>
// //                 </div>
// //               </a>
// //             ))}
// //           </div>
// //         </section>

// //         {/* GAMES */}
// //         <section id="games" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
// //           <div className="mx-auto max-w-7xl">
// //             <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
// //               <div>
// //                 <p className="mb-3 text-[10px] font-black tracking-[.3em] text-cyan-300">
// //                   FIND YOUR NEXT OBSESSION
// //                 </p>
// //                 <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
// //                   EXPLORE THE <span className="zoro-gradient-text">GAMES</span>
// //                 </h2>
// //                 <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
// //                   Discover your next adventure. Every genre brings a new way
// //                   to play.
// //                 </p>
// //               </div>

// //               <a
// //                 href="#features"
// //                 className="inline-flex items-center gap-2 self-start text-xs font-black tracking-wider text-violet-300 transition hover:text-cyan-300 sm:self-auto"
// //               >
// //                 DISCOVER MORE <ArrowUpRight size={16} />
// //               </a>
// //             </div>

// //             <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
// //               {games.map((game, index) => (
// //                 <GameCard game={game} index={index} key={game.title} />
// //               ))}
// //             </div>

// //             <p className="mt-5 text-xs leading-6 text-slate-500">
// //               Game artwork is illustrative. Replace these sample cards with
// //               your actual games, game routes and playable experiences.
// //             </p>
// //           </div>
// //         </section>

// //         {/* FEATURES */}
// //         <section
// //           id="features"
// //           className="scroll-mt-24 border-y border-white/[0.06] bg-[#0C0D16] px-5 py-20 sm:px-8 sm:py-24"
// //         >
// //           <div className="mx-auto max-w-7xl">
// //             <div className="mx-auto mb-14 max-w-2xl text-center">
// //               <p className="mb-3 text-[10px] font-black tracking-[.3em] text-violet-300">
// //                 MORE THAN JUST A GAME
// //               </p>
// //               <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
// //                 BUILT FOR THE <span className="zoro-gradient-text">PLAYERS</span>
// //               </h2>
// //               <p className="mt-4 text-sm leading-7 text-slate-400">
// //                 A gaming-first experience with room to explore, improve and
// //                 compete.
// //               </p>
// //             </div>

// //             <div className="grid gap-5 md:grid-cols-3">
// //               {features.map(({ icon: Icon, title, text: description }, i) => (
// //                 <div
// //                   key={title}
// //                   className="zoro-panel group rounded-2xl p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-300/30 sm:p-8"
// //                 >
// //                   <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-300/[0.07] text-violet-300 transition group-hover:border-cyan-300/30 group-hover:text-cyan-300">
// //                     <Icon size={25} />
// //                   </div>
// //                   <p className="mb-3 text-[10px] font-black tracking-[.2em] text-slate-600">
// //                     0{i + 1} / ZORO
// //                   </p>
// //                   <h3 className="mb-3 text-xl font-black">{title}</h3>
// //                   <p className="text-sm leading-7 text-slate-400">
// //                     {description}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         {/* LEADERBOARD */}
// //         <section
// //           id="leaderboard"
// //           className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24"
// //         >
// //           <div className="mx-auto max-w-5xl">
// //             <div className="zoro-panel relative overflow-hidden rounded-2xl p-6 sm:p-10">
// //               <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/10 blur-[80px]" />

// //               <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
// //                 <div>
// //                   <div className="mb-3 flex items-center gap-2 text-cyan-300">
// //                     <Trophy size={20} />
// //                     <span className="text-[10px] font-black tracking-[.25em]">
// //                       THE COMPETITION
// //                     </span>
// //                   </div>
// //                   <h2 className="text-3xl font-black sm:text-4xl">
// //                     THE <span className="zoro-gradient-text">LEADERBOARD</span>
// //                   </h2>
// //                   <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
// //                     Every champion starts somewhere. Sign in to access your
// //                     player profile and compete when rankings are available.
// //                   </p>
// //                 </div>

// //                 <Link
// //                   to="/login"
// //                   className="zoro-primary inline-flex shrink-0 items-center gap-2 rounded-lg px-6 py-4 text-xs font-black tracking-wider"
// //                 >
// //                   VIEW YOUR PROFILE <ChevronRight size={16} />
// //                 </Link>
// //               </div>

// //               <div className="relative mt-9 grid gap-3 border-t border-white/[0.08] pt-6 sm:grid-cols-3">
// //                 {[
// //                   { label: "PLAYER RANK", value: "Your ranking" },
// //                   { label: "BEST SCORE", value: "Your best" },
// //                   { label: "ACHIEVEMENTS", value: "Your progress" },
// //                 ].map((item) => (
// //                   <div
// //                     key={item.label}
// //                     className="rounded-xl border border-white/[0.06] bg-black/20 p-4"
// //                   >
// //                     <p className="text-[9px] font-black tracking-[.2em] text-slate-500">
// //                       {item.label}
// //                     </p>
// //                     <p className="mt-2 text-base font-extrabold text-slate-300">
// //                       {item.value}
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>

// //               <p className="mt-4 text-[11px] leading-5 text-slate-500">
// //                 Player rankings and scores are placeholders until connected
// //                 to your real backend.
// //               </p>
// //             </div>
// //           </div>
// //         </section>

// //         {/* CTA */}
// //         <section className="relative overflow-hidden border-y border-violet-300/10 bg-[#0E0C1C] px-5 py-20 sm:px-8 sm:py-24">
// //           <div className="zoro-grid pointer-events-none absolute inset-0 opacity-70" />
// //           <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-violet-600/15 blur-[100px]" />

// //           <div className="relative mx-auto max-w-3xl text-center">
// //             <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300">
// //               <Gamepad2 size={27} />
// //             </div>
// //             <p className="mb-4 text-[10px] font-black tracking-[.3em] text-cyan-300">
// //               YOUR NEXT ADVENTURE STARTS HERE
// //             </p>
// //             <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
// //               READY TO
// //               <br />
// //               <span className="zoro-gradient-text">PLAY DIFFERENT?</span>
// //             </h2>
// //             <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-slate-400">
// //               Join the ZORO GAMES experience and get ready to explore a new
// //               gaming universe.
// //             </p>

// //             <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
// //               <Link
// //                 to="/register"
// //                 className="zoro-primary inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-xs font-black tracking-widest"
// //               >
// //                 CREATE YOUR ACCOUNT <ChevronRight size={16} />
// //               </Link>
// //               <Link
// //                 to="/login"
// //                 className="zoro-outline inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-xs font-black tracking-widest text-cyan-200"
// //               >
// //                 <Users size={16} /> SIGN IN
// //               </Link>
// //             </div>
// //           </div>
// //         </section>

// //         {/* FAQ */}
// //         <section
// //           id="faq"
// //           className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24"
// //         >
// //           <div className="mx-auto max-w-3xl">
// //             <div className="mb-10 text-center">
// //               <p className="mb-3 text-[10px] font-black tracking-[.3em] text-violet-300">
// //                 NEED TO KNOW
// //               </p>
// //               <h2 className="text-3xl font-black sm:text-4xl">
// //                 PLAYER <span className="zoro-gradient-text">FAQ</span>
// //               </h2>
// //             </div>

// //             <div className="space-y-3">
// //               {faqs.map((faq, index) => {
// //                 const isOpen = openFaq === index;

// //                 return (
// //                   <div
// //                     key={faq.q}
// //                     className={`overflow-hidden rounded-xl border transition ${
// //                       isOpen
// //                         ? "border-violet-300/30 bg-violet-300/[0.035]"
// //                         : "border-white/[0.08] bg-[#0D0E18]"
// //                     }`}
// //                   >
// //                     <button
// //                       type="button"
// //                       onClick={() => setOpenFaq(isOpen ? -1 : index)}
// //                       className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
// //                       aria-expanded={isOpen}
// //                     >
// //                       <span className="text-sm font-bold text-slate-200 sm:text-base">
// //                         {faq.q}
// //                       </span>
// //                       <ChevronDown
// //                         size={19}
// //                         className={`shrink-0 text-violet-300 transition-transform ${
// //                           isOpen ? "rotate-180" : ""
// //                         }`}
// //                       />
// //                     </button>

// //                     <div
// //                       className="zoro-faq-answer"
// //                       data-open={isOpen}
// //                     >
// //                       <div>
// //                         <p className="px-5 pb-5 text-sm leading-7 text-slate-400 sm:px-6">
// //                           {faq.a}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         </section>
// //       </main>

// //       {/* FOOTER */}
// //       <footer className="border-t border-white/[0.08] bg-[#06070D] px-5 pb-8 pt-12 sm:px-8">
// //         <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
// //           <div>
// //             <Link to="/" className="inline-flex items-center gap-3">
// //               <span className="zoro-logo flex h-10 w-10 items-center justify-center rounded-xl text-[#090910]">
// //                 <Gamepad2 size={23} />
// //               </span>
// //               <span className="text-lg font-black">
// //                 ZORO<span className="text-cyan-300"> GAMES</span>
// //               </span>
// //             </Link>
// //             <p className="mt-5 max-w-xs text-sm leading-7 text-slate-500">
// //               Enter the next level. Discover games, challenge yourself and
// //               create your own gaming journey.
// //             </p>
// //             <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
// //               <Headphones size={15} className="text-violet-300" />
// //               GAME ON. STAY CONNECTED.
// //             </div>
// //           </div>

// //           <div>
// //             <h3 className="mb-5 text-xs font-black tracking-widest text-white">
// //               EXPLORE
// //             </h3>
// //             <div className="flex flex-col gap-3 text-sm text-slate-500">
// //               <a href="#home" className="hover:text-cyan-300">Home</a>
// //               <a href="#games" className="hover:text-cyan-300">Games</a>
// //               <a href="#features" className="hover:text-cyan-300">Features</a>
// //               <a href="#leaderboard" className="hover:text-cyan-300">Leaderboard</a>
// //             </div>
// //           </div>

// //           <div>
// //             <h3 className="mb-5 text-xs font-black tracking-widest text-white">
// //               YOUR ACCOUNT
// //             </h3>
// //             <div className="flex flex-col gap-3 text-sm text-slate-500">
// //               <Link to="/login" className="hover:text-cyan-300">Login</Link>
// //               <Link to="/register" className="hover:text-cyan-300">Register</Link>
// //               <a href="#faq" className="hover:text-cyan-300">Help & FAQ</a>
// //             </div>
// //           </div>

// //           <div>
// //             <h3 className="mb-5 text-xs font-black tracking-widest text-white">
// //               INFORMATION
// //             </h3>
// //             <div className="flex flex-col gap-3 text-sm text-slate-500">
// //               <Link to="/privacy-policy" className="hover:text-cyan-300">Privacy Policy</Link>
// //               <Link to="/terms" className="hover:text-cyan-300">Terms of Service</Link>
// //               <a href="#faq" className="hover:text-cyan-300">Support</a>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/[0.07] pt-6 text-[11px] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
// //           <p>© {new Date().getFullYear()} ZORO GAMES. All rights reserved.</p>
// //           <p>BUILT FOR THE NEXT GENERATION OF GAMERS.</p>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // }



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Gamepad2, Menu, X, ArrowRight, Play, Trophy,
//   Zap, ChevronDown, Shield, Users, Swords,
//   Crosshair, Headphones, ArrowUpRight
// } from "lucide-react";

// const games = [
//   { name: "CYBER STRIKE", type: "ACTION / FPS", color: "#A855F7", icon: Crosshair },
//   { name: "NEON RACER", type: "RACING / ARCADE", color: "#22D3EE", icon: Zap },
//   { name: "SHADOW ARENA", type: "FIGHTING / RPG", color: "#F472B6", icon: Swords },
// ];

// const faqs = [
//   {
//     q: "What is ZORO GAMES?",
//     a: "ZORO GAMES is a gaming platform where players can discover games, create accounts and explore competitive gaming features."
//   },
//   {
//     q: "How can I join ZORO GAMES?",
//     a: "Open the Register page to create an account. Once registration and login are connected to your backend, you can access the features available to your account."
//   },
//   {
//     q: "Can I play on mobile?",
//     a: "The website is designed to adapt to mobile, tablet and desktop screens. Actual gameplay depends on each game's compatibility."
//   },
//   {
//     q: "Will player rankings be available?",
//     a: "The homepage includes a leaderboard section. Real rankings and scores can be displayed after connecting the game data and backend."
//   }
// ];

// export default function Home() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [openFaq, setOpenFaq] = useState(0);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 30);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const nav = [
//     ["Home", "#home"],
//     ["Games", "#games"],
//     ["About", "#about"],
//     ["Leaderboard", "#leaderboard"],
//     ["Support", "#faq"]
//   ];

//   return (
//     <div className="zoro min-h-screen overflow-hidden bg-[#08050F] text-white">
//       <style>{`
//         .zoro {
//           --purple: #A855F7;
//           --cyan: #67E8F9;
//           font-family: Inter, ui-sans-serif, system-ui, sans-serif;
//         }
//         .zoro * { box-sizing: border-box; }
//         .zoro a { text-decoration: none; }
//         .zoro-grid {
//           background-image:
//             linear-gradient(#a855f70b 1px,transparent 1px),
//             linear-gradient(90deg,#a855f70b 1px,transparent 1px);
//           background-size: 44px 44px;
//           mask-image: linear-gradient(to bottom,black,transparent 95%);
//         }
//         .zoro-title {
//           background: linear-gradient(100deg,#fff 10%,#E9D5FF 55%,#A855F7 100%);
//           -webkit-background-clip: text;
//           background-clip: text;
//           color: transparent;
//         }
//         .zoro-btn {
//           background: linear-gradient(110deg,#9333EA,#6D28D9);
//           box-shadow: 0 0 28px #9333ea35;
//           transition: .25s ease;
//         }
//         .zoro-btn:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 0 38px #9333ea70;
//         }
//         .zoro-glass {
//           background: linear-gradient(135deg,#21122cdd,#100b1add);
//           border: 1px solid #c084fc55;
//           backdrop-filter: blur(18px);
//         }
//         .zoro-card {
//           border: 1px solid #ffffff12;
//           background: linear-gradient(145deg,#17101f,#0c0912);
//           transition: transform .3s,border-color .3s,box-shadow .3s;
//         }
//         .zoro-card:hover {
//           transform: translateY(-6px);
//           border-color: #a855f780;
//           box-shadow: 0 15px 50px #a855f713;
//         }
//         .zoro-orbit {
//           border: 1px solid #a855f755;
//           box-shadow: 0 0 24px #a855f71a,inset 0 0 24px #a855f711;
//           animation: orbitFloat 7s ease-in-out infinite;
//         }
//         .zoro-dot { animation: dotPulse 2s infinite; }
//         .zoro-faq {
//           display: grid;
//           grid-template-rows: 0fr;
//           transition: grid-template-rows .3s;
//         }
//         .zoro-faq[data-open="true"] { grid-template-rows: 1fr; }
//         .zoro-faq > div { overflow: hidden; }
//         @keyframes orbitFloat {
//           0%,100% { transform: translateY(0) rotate(-1deg); }
//           50% { transform: translateY(-9px) rotate(1deg); }
//         }
//         @keyframes dotPulse {
//           0%,100% { opacity: .5; }
//           50% { opacity: 1; }
//         }
//         @media (prefers-reduced-motion: reduce) {
//           .zoro *, .zoro *::before, .zoro *::after {
//             animation: none !important;
//             transition: none !important;
//           }
//         }
//       `}</style>

//       {/* NAVBAR */}
//       <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
//         scrolled ? "border-b border-white/10 bg-[#08050F]/95 py-3 backdrop-blur-xl" : "bg-transparent py-5"
//       }`}>
//         <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
//           <Link to="/" className="flex items-center gap-3">
//             <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-violet-800 shadow-[0_0_24px_#a855f740]">
//               <Gamepad2 size={24} />
//             </span>
//             <span className="text-lg font-black tracking-tight sm:text-xl">
//               ZORO<span className="text-purple-400"> GAMES</span>
//               <span className="mt-0.5 block text-[8px] tracking-[.34em] text-white/45">
//                 ENTER THE NEXT LEVEL
//               </span>
//             </span>
//           </Link>

//           <div className="hidden items-center gap-8 lg:flex">
//             {nav.map(([label, href]) => (
//               <a key={label} href={href}
//                 className="text-xs font-semibold text-white/65 transition hover:text-purple-300">
//                 {label}
//               </a>
//             ))}
//           </div>

//           <div className="hidden items-center gap-3 sm:flex">
//             <Link to="/login" className="px-4 py-3 text-xs font-bold text-white/80 hover:text-white">
//               LOG IN
//             </Link>
//             <Link to="/register" className="zoro-btn rounded-lg border border-purple-300/40 px-5 py-3 text-xs font-black">
//               JOIN THE BATTLE <ArrowRight className="ml-2 inline" size={15} />
//             </Link>
//           </div>

//           <button
//             type="button"
//             onClick={() => setMenuOpen(!menuOpen)}
//             aria-label={menuOpen ? "Close menu" : "Open menu"}
//             aria-expanded={menuOpen}
//             className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 lg:hidden"
//           >
//             {menuOpen ? <X size={21} /> : <Menu size={21} />}
//           </button>
//         </nav>

//         {menuOpen && (
//           <div className="border-t border-white/10 bg-[#100917] px-5 pb-5 pt-3 lg:hidden">
//             {nav.map(([label, href]) => (
//               <a key={label} href={href} onClick={() => setMenuOpen(false)}
//                 className="block border-b border-white/[0.07] py-3 text-sm text-white/80">
//                 {label}
//               </a>
//             ))}
//             <div className="mt-4 flex gap-3">
//               <Link to="/login" onClick={() => setMenuOpen(false)}
//                 className="flex-1 rounded-lg border border-white/15 py-3 text-center text-xs font-bold">
//                 LOG IN
//               </Link>
//               <Link to="/register" onClick={() => setMenuOpen(false)}
//                 className="zoro-btn flex-1 rounded-lg py-3 text-center text-xs font-bold">
//                 REGISTER
//               </Link>
//             </div>
//           </div>
//         )}
//       </header>

//       <main>
//         {/* CINEMATIC HERO */}
//         <section id="home" className="relative min-h-[760px] overflow-hidden pt-28 sm:pt-32 lg:min-h-[900px]">
//           <div className="zoro-grid absolute inset-0" />
//           <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-purple-700/20 blur-[130px]" />
//           <div className="pointer-events-none absolute right-[-150px] top-44 h-[500px] w-[500px] rounded-full bg-violet-900/20 blur-[140px]" />

//           <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
//             <div className="relative overflow-hidden rounded-[24px] border border-white/[0.13] bg-[#0d0715] shadow-[0_0_80px_#7e22ce12] lg:min-h-[770px]">
//               {/* Main background artwork */}
//               <div className="absolute inset-0">
//                 <img
//                   src="/images/zoro-hero.png"
//                   alt=""
//                   fetchPriority="high"
//                   className="h-full w-full object-cover object-[58%_center]"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-r from-[#09050f] via-[#09050f]/80 to-[#09050f]/10" />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#09050f] via-transparent to-[#09050f]/20" />
//                 <div className="absolute inset-0 bg-purple-950/20 mix-blend-color" />
//               </div>

//               {/* HUD decorations */}
//               <div className="pointer-events-none absolute inset-4 rounded-[17px] border border-white/[0.07] sm:inset-6" />
//               <div className="pointer-events-none absolute left-0 top-1/3 h-44 w-1 bg-gradient-to-b from-transparent via-purple-400 to-transparent" />

//               <div className="relative z-10 flex min-h-[690px] flex-col px-6 pb-8 pt-12 sm:px-10 sm:pt-16 lg:min-h-[770px] lg:px-14 lg:pb-12 lg:pt-20">
//                 <div className="max-w-[590px]">
//                   <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-300/30 bg-black/35 px-4 py-2 backdrop-blur-md">
//                     <span className="zoro-dot h-2 w-2 rounded-full bg-cyan-300" />
//                     <span className="text-[9px] font-black tracking-[.22em] text-purple-100 sm:text-[10px]">
//                       THE FUTURE OF GAMING STARTS HERE
//                     </span>
//                   </div>

//                   <h1 className="text-5xl font-black leading-[.98] tracking-[-.06em] sm:text-7xl lg:text-[92px]">
//                     ENTER
//                     <br />
//                     THE <span className="zoro-title">GAME.</span>
//                   </h1>

//                   <p className="mt-6 max-w-md text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
//                     Dominate the digital battlefield. Discover your next
//                     adventure, sharpen your skills and make your mark in the
//                     ZORO universe.
//                   </p>

//                   <div className="mt-8 flex flex-col gap-3 sm:flex-row">
//                     <a href="#games" className="zoro-btn inline-flex items-center justify-center gap-3 rounded-lg px-7 py-4 text-xs font-black tracking-wider">
//                       <Play size={16} fill="currentColor" /> PLAY NOW <ArrowRight size={16} />
//                     </a>
//                     <Link to="/register" className="inline-flex items-center justify-center gap-3 rounded-lg border border-white/25 bg-black/30 px-7 py-4 text-xs font-black tracking-wider backdrop-blur-md transition hover:border-purple-300 hover:bg-purple-500/10">
//                       JOIN THE BATTLE
//                     </Link>
//                   </div>

//                   <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-bold tracking-wider text-white/55">
//                     <span className="flex items-center gap-2"><Shield size={14} className="text-purple-300" /> GAMER FIRST</span>
//                     <span className="flex items-center gap-2"><Zap size={14} className="text-cyan-300" /> NEXT LEVEL DESIGN</span>
//                   </div>
//                 </div>

//                 {/* Floating feature card */}
//                 <div className="mt-auto flex flex-col items-start justify-between gap-4 pt-16 sm:flex-row sm:items-end">
//                   <div className="zoro-glass flex w-full max-w-[440px] items-center gap-4 rounded-2xl p-4 sm:p-5">
//                     <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-purple-300/20 bg-gradient-to-br from-purple-600/40 to-black/80">
//                       <Gamepad2 size={37} className="text-purple-200" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-black text-cyan-300 sm:text-base">CROSS-PLATFORM ENERGY</p>
//                       <p className="mt-1 text-xs font-bold text-white">One Universe. Endless Adventures.</p>
//                       <p className="mt-2 text-[10px] leading-5 text-white/55">
//                         Discover new games and build your own gaming journey.
//                       </p>
//                     </div>
//                   </div>

//                   <div className="zoro-glass flex min-w-[190px] items-center gap-4 rounded-2xl p-5">
//                     <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-400/15 text-purple-300">
//                       <Trophy size={24} />
//                     </div>
//                     <div>
//                       <p className="text-sm font-black">YOUR NEXT WIN</p>
//                       <p className="mt-1 text-[10px] text-white/55">Starts with you.</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* GAME CATEGORIES */}
//         <section className="px-5 pb-10 sm:px-8 lg:px-12">
//           <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-3 lg:grid-cols-4">
//             {[
//               { icon: Swords, name: "ACTION", sub: "Enter the battlefield" },
//               { icon: Crosshair, name: "COMPETITIVE", sub: "Test your skills" },
//               { icon: Zap, name: "ARCADE", sub: "Feel the adrenaline" },
//               { icon: Users, name: "COMMUNITY", sub: "Find your squad" }
//             ].map(({ icon: Icon, name, sub }) => (
//               <a href="#games" key={name} className="zoro-card flex items-center gap-3 rounded-xl p-4 sm:p-5">
//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-300/20 bg-purple-500/10 text-purple-300">
//                   <Icon size={21} />
//                 </div>
//                 <div>
//                   <p className="text-[10px] font-black tracking-wider sm:text-xs">{name}</p>
//                   <p className="mt-1 text-[10px] text-white/40">{sub}</p>
//                 </div>
//               </a>
//             ))}
//           </div>
//         </section>

//         {/* GAMES */}
//         <section id="games" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12">
//           <div className="mx-auto max-w-[1440px]">
//             <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
//               <div>
//                 <p className="mb-3 text-[10px] font-black tracking-[.3em] text-purple-300">CHOOSE YOUR WORLD</p>
//                 <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
//                   DISCOVER <span className="zoro-title">GAMES</span>
//                 </h2>
//                 <p className="mt-3 text-sm text-white/45">Your next obsession is waiting.</p>
//               </div>
//               <span className="text-xs font-bold text-white/40">THE ZORO COLLECTION <ArrowUpRight className="ml-1 inline" size={15} /></span>
//             </div>

//             <div className="grid gap-5 md:grid-cols-3">
//               {games.map(({ name, type, color, icon: Icon }, i) => (
//                 <article key={name} className="zoro-card group overflow-hidden rounded-2xl">
//                   <div className="relative flex h-48 items-center justify-center overflow-hidden" style={{ background: `radial-gradient(ellipse at center, ${color}30, #0c0912 72%)` }}>
//                     <div className="absolute h-40 w-40 rounded-full border" style={{ borderColor: `${color}55`, boxShadow: `0 0 35px ${color}15` }} />
//                     <div className="absolute h-28 w-28 rotate-45 border" style={{ borderColor: `${color}50` }} />
//                     <Icon size={58} style={{ color }} className="relative transition duration-500 group-hover:scale-125" />
//                     <span className="absolute left-4 top-4 rounded-md border border-white/10 bg-black/30 px-3 py-1 text-[9px] font-black tracking-widest" style={{ color }}>
//                       0{i + 1} / GAME
//                     </span>
//                   </div>
//                   <div className="p-5">
//                     <p className="text-[10px] font-black tracking-[.2em]" style={{ color }}>{type}</p>
//                     <h3 className="mt-2 text-xl font-black">{name}</h3>
//                     <a href="#about" className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-bold text-white/60 transition hover:text-purple-300">
//                       EXPLORE GAME <ArrowRight size={16} />
//                     </a>
//                   </div>
//                 </article>
//               ))}
//             </div>
//             <p className="mt-5 text-[11px] text-white/35">These are sample game categories. Actual games and launch links can be connected later.</p>
//           </div>
//         </section>

//         {/* ABOUT */}
//         <section id="about" className="scroll-mt-24 border-y border-white/[0.07] bg-[#0c0712] px-5 py-20 sm:px-8 lg:px-12">
//           <div className="mx-auto grid max-w-[1200px] items-center gap-12 md:grid-cols-2">
//             <div>
//               <p className="mb-3 text-[10px] font-black tracking-[.3em] text-cyan-300">WELCOME TO THE ARENA</p>
//               <h2 className="text-4xl font-black leading-tight sm:text-5xl">
//                 NOT JUST A GAME.
//                 <br /><span className="zoro-title">A WHOLE WORLD.</span>
//               </h2>
//               <p className="mt-5 text-sm leading-7 text-white/55">
//                 ZORO GAMES brings together a bold gaming aesthetic, a place
//                 to discover games and a foundation for player profiles,
//                 competitive features and future community experiences.
//               </p>
//               <Link to="/register" className="zoro-btn mt-7 inline-flex items-center gap-3 rounded-lg px-6 py-4 text-xs font-black">
//                 ENTER ZORO <ArrowRight size={16} />
//               </Link>
//             </div>

//             <div className="zoro-orbit relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950/50 to-black">
//               <div className="absolute h-56 w-56 rounded-full border border-purple-400/30" />
//               <div className="absolute h-40 w-40 rotate-45 border border-cyan-300/30" />
//               <div className="absolute h-28 w-28 rounded-full bg-purple-600/20 blur-2xl" />
//               <Gamepad2 size={76} className="relative text-purple-200 drop-shadow-[0_0_25px_#a855f780]" />
//               <span className="absolute bottom-5 text-[10px] font-black tracking-[.3em] text-white/45">LEVEL UP YOUR WORLD</span>
//             </div>
//           </div>
//         </section>

//         {/* LEADERBOARD CTA */}
//         <section id="leaderboard" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12">
//           <div className="zoro-glass mx-auto flex max-w-[1200px] flex-col justify-between gap-7 rounded-2xl p-6 sm:p-10 md:flex-row md:items-center">
//             <div>
//               <div className="mb-3 flex items-center gap-2 text-purple-300">
//                 <Trophy size={20} />
//                 <span className="text-[10px] font-black tracking-[.25em]">YOUR JOURNEY. YOUR RANK.</span>
//               </div>
//               <h2 className="text-3xl font-black sm:text-4xl">CHASE THE <span className="zoro-title">TOP SPOT.</span></h2>
//               <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
//                 Sign in to access your account. Player scores and rankings will appear here once connected to real game data.
//               </p>
//             </div>
//             <Link to="/login" className="zoro-btn inline-flex shrink-0 items-center justify-center gap-3 rounded-lg px-7 py-4 text-xs font-black">
//               PLAYER LOGIN <ArrowRight size={16} />
//             </Link>
//           </div>
//         </section>

//         {/* FAQ */}
//         <section id="faq" className="scroll-mt-24 px-5 pb-24 pt-8 sm:px-8 lg:px-12">
//           <div className="mx-auto max-w-3xl">
//             <div className="mb-10 text-center">
//               <p className="mb-3 text-[10px] font-black tracking-[.3em] text-purple-300">PLAYER SUPPORT</p>
//               <h2 className="text-3xl font-black sm:text-4xl">QUESTIONS <span className="zoro-title">ANSWERED.</span></h2>
//             </div>
//             <div className="space-y-3">
//               {faqs.map((faq, i) => (
//                 <div key={faq.q} className={`rounded-xl border ${openFaq === i ? "border-purple-400/40 bg-purple-500/[0.04]" : "border-white/10 bg-white/[0.02]"}`}>
//                   <button type="button" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}
//                     className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left">
//                     <span className="text-sm font-bold sm:text-base">{faq.q}</span>
//                     <ChevronDown size={18} className={`shrink-0 text-purple-300 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
//                   </button>
//                   <div className="zoro-faq" data-open={openFaq === i}>
//                     <div><p className="px-5 pb-5 text-sm leading-7 text-white/55">{faq.a}</p></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* FOOTER */}
//       <footer className="border-t border-white/10 bg-[#050309] px-5 py-10 sm:px-8 lg:px-12">
//         <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-7 sm:flex-row sm:items-center">
//           <Link to="/" className="flex items-center gap-3">
//             <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20 text-purple-300">
//               <Gamepad2 size={23} />
//             </span>
//             <span className="font-black tracking-wide">ZORO <span className="text-purple-400">GAMES</span></span>
//           </Link>
//           <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/45">
//             <a href="#home" className="hover:text-purple-300">Home</a>
//             <a href="#games" className="hover:text-purple-300">Games</a>
//             <a href="#faq" className="hover:text-purple-300">Support</a>
//             <Link to="/privacy-policy" className="hover:text-purple-300">Privacy</Link>
//             <Link to="/terms" className="hover:text-purple-300">Terms</Link>
//           </div>
//           <div className="flex items-center gap-2 text-xs text-white/40">
//             <Headphones size={15} /> MADE FOR GAMERS
//           </div>
//         </div>
//         <div className="mx-auto mt-8 max-w-[1440px] border-t border-white/[0.07] pt-5 text-[10px] text-white/30">
//           © {new Date().getFullYear()} ZORO GAMES. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Gamepad2, Menu, X, ArrowRight, Play, Trophy,
  Zap, ChevronDown, Shield, Users, Swords,
  Crosshair, Headphones, ArrowUpRight
} from "lucide-react";

const games = [
  { name: "CYBER STRIKE", type: "ACTION / FPS", color: "#A855F7", icon: Crosshair },
  { name: "NEON RACER", type: "RACING / ARCADE", color: "#22D3EE", icon: Zap },
  { name: "SHADOW ARENA", type: "FIGHTING / RPG", color: "#F472B6", icon: Swords },
];

const faqs = [
  {
    q: "What is ZORO GAMES?",
    a: "ZORO GAMES is a gaming platform where players can discover games, create accounts and explore competitive gaming features."
  },
  {
    q: "How can I join ZORO GAMES?",
    a: "Open the Register page to create an account. Once registration and login are connected to your backend, you can access the features available to your account."
  },
  {
    q: "Can I play on mobile?",
    a: "The website is designed to adapt to mobile, tablet and desktop screens. Actual gameplay depends on each game's compatibility."
  },
  {
    q: "Will player rankings be available?",
    a: "The homepage includes a leaderboard section. Real rankings and scores can be displayed after connecting the game data and backend."
  }
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    ["Home", "#home"],
    ["Games", "#games"],
    ["About", "#about"],
    ["Leaderboard", "#leaderboard"],
    ["Support", "#faq"]
  ];

  return (
    <div className="zoro min-h-screen overflow-hidden bg-[#08050F] text-white">
      <style>{`
        .zoro {
          --purple: #A855F7;
          --cyan: #67E8F9;
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        }
        .zoro * { box-sizing: border-box; }
        .zoro a { text-decoration: none; }
        .zoro-title {
          background: linear-gradient(100deg,#fff 10%,#E9D5FF 55%,#A855F7 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .zoro-btn {
          background: linear-gradient(110deg,#9333EA,#6D28D9);
          box-shadow: 0 0 28px #9333ea35;
          transition: .25s ease;
        }
        .zoro-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 38px #9333ea70;
        }
        .zoro-glass {
          background: linear-gradient(135deg,#21122cdd,#100b1add);
          border: 1px solid #c084fc55;
          backdrop-filter: blur(18px);
        }
        .zoro-card {
          border: 1px solid #ffffff12;
          background: linear-gradient(145deg,#17101f,#0c0912);
          transition: transform .3s,border-color .3s,box-shadow .3s;
        }
        .zoro-card:hover {
          transform: translateY(-6px);
          border-color: #a855f780;
          box-shadow: 0 15px 50px #a855f713;
        }
        .zoro-orbit {
          border: 1px solid #a855f755;
          box-shadow: 0 0 24px #a855f71a,inset 0 0 24px #a855f711;
          animation: orbitFloat 7s ease-in-out infinite;
        }
        .zoro-dot { animation: dotPulse 2s infinite; }
        .zoro-faq {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows .3s;
        }
        .zoro-faq[data-open="true"] { grid-template-rows: 1fr; }
        .zoro-faq > div { overflow: hidden; }
        @keyframes orbitFloat {
          0%,100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-9px) rotate(1deg); }
        }
        @keyframes dotPulse {
          0%,100% { opacity: .5; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .zoro *, .zoro *::before, .zoro *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/10 bg-[#08050F]/95 py-3 backdrop-blur-xl" : "bg-transparent py-5"
      }`}>
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-violet-800 shadow-[0_0_24px_#a855f740]">
              <Gamepad2 size={24} />
            </span>
            <span className="text-lg font-black tracking-tight sm:text-xl">
              ZORO<span className="text-purple-400"> GAMES</span>
              <span className="mt-0.5 block text-[8px] tracking-[.34em] text-white/45">
                ENTER THE NEXT LEVEL
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {nav.map(([label, href]) => (
              <a key={label} href={href}
                className="text-xs font-semibold text-white/65 transition hover:text-purple-300">
                {label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <Link to="/login" className="px-4 py-3 text-xs font-bold text-white/80 hover:text-white">
              LOG IN
            </Link>
            <Link to="/register" className="zoro-btn rounded-lg border border-purple-300/40 px-5 py-3 text-xs font-black">
              JOIN THE BATTLE <ArrowRight className="ml-2 inline" size={15} />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 lg:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#100917] px-5 pb-5 pt-3 lg:hidden">
            {nav.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                className="block border-b border-white/[0.07] py-3 text-sm text-white/80">
                {label}
              </a>
            ))}
            <div className="mt-4 flex gap-3">
              <Link to="/login" onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-lg border border-white/15 py-3 text-center text-xs font-bold">
                LOG IN
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}
                className="zoro-btn flex-1 rounded-lg py-3 text-center text-xs font-bold">
                REGISTER
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* CINEMATIC HERO */}
        <section id="home" className="relative min-h-[760px] overflow-hidden pt-28 sm:pt-32 lg:min-h-[900px]">
          <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-purple-700/20 blur-[130px]" />
          <div className="pointer-events-none absolute right-[-150px] top-44 h-[500px] w-[500px] rounded-full bg-violet-900/20 blur-[140px]" />

          <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="relative overflow-hidden rounded-[24px] border border-white/[0.13] bg-[#0d0715] shadow-[0_0_80px_#7e22ce12] lg:min-h-[770px]">
              {/* Main background artwork */}
              <div className="absolute inset-0">
                <img
                  src="/images/zoro-hero.png"
                  alt=""
                  fetchPriority="high"
                  className="h-full w-full object-cover object-[58%_center]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#09050f] via-[#09050f]/80 to-[#09050f]/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09050f] via-transparent to-[#09050f]/20" />
                <div className="absolute inset-0 bg-purple-950/20 mix-blend-color" />
              </div>

              {/* HUD decorations */}
              <div className="pointer-events-none absolute inset-4 rounded-[17px] border border-white/[0.07] sm:inset-6" />
              <div className="pointer-events-none absolute left-0 top-1/3 h-44 w-1 bg-gradient-to-b from-transparent via-purple-400 to-transparent" />

              <div className="relative z-10 flex min-h-[690px] flex-col px-6 pb-8 pt-12 sm:px-10 sm:pt-16 lg:min-h-[770px] lg:px-14 lg:pb-12 lg:pt-20">
                <div className="max-w-[590px]">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-300/30 bg-black/35 px-4 py-2 backdrop-blur-md">
                    <span className="zoro-dot h-2 w-2 rounded-full bg-cyan-300" />
                    <span className="text-[9px] font-black tracking-[.22em] text-purple-100 sm:text-[10px]">
                      THE FUTURE OF GAMING STARTS HERE
                    </span>
                  </div>

                  <h1 className="text-5xl font-black leading-[.98] tracking-[-.06em] sm:text-7xl lg:text-[92px]">
                    ENTER
                    <br />
                    THE <span className="zoro-title">GAME.</span>
                  </h1>

                  <p className="mt-6 max-w-md text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                    Dominate the digital battlefield. Discover your next
                    adventure, sharpen your skills and make your mark in the
                    ZORO universe.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a href="#games" className="zoro-btn inline-flex items-center justify-center gap-3 rounded-lg px-7 py-4 text-xs font-black tracking-wider">
                      <Play size={16} fill="currentColor" /> PLAY NOW <ArrowRight size={16} />
                    </a>
                    <Link to="/register" className="inline-flex items-center justify-center gap-3 rounded-lg border border-white/25 bg-black/30 px-7 py-4 text-xs font-black tracking-wider backdrop-blur-md transition hover:border-purple-300 hover:bg-purple-500/10">
                      JOIN THE BATTLE
                    </Link>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-bold tracking-wider text-white/55">
                    <span className="flex items-center gap-2"><Shield size={14} className="text-purple-300" /> GAMER FIRST</span>
                    <span className="flex items-center gap-2"><Zap size={14} className="text-cyan-300" /> NEXT LEVEL DESIGN</span>
                  </div>
                </div>

                {/* Floating feature card */}
                <div className="mt-auto flex flex-col items-start justify-between gap-4 pt-16 sm:flex-row sm:items-end">
                  <div className="zoro-glass flex w-full max-w-[440px] items-center gap-4 rounded-2xl p-4 sm:p-5">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-purple-300/20 bg-gradient-to-br from-purple-600/40 to-black/80">
                      <Gamepad2 size={37} className="text-purple-200" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-cyan-300 sm:text-base">CROSS-PLATFORM ENERGY</p>
                      <p className="mt-1 text-xs font-bold text-white">One Universe. Endless Adventures.</p>
                      <p className="mt-2 text-[10px] leading-5 text-white/55">
                        Discover new games and build your own gaming journey.
                      </p>
                    </div>
                  </div>

                  <div className="zoro-glass flex min-w-[190px] items-center gap-4 rounded-2xl p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-400/15 text-purple-300">
                      <Trophy size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black">YOUR NEXT WIN</p>
                      <p className="mt-1 text-[10px] text-white/55">Starts with you.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GAME CATEGORIES */}
        <section className="px-5 pb-10 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { icon: Swords, name: "ACTION", sub: "Enter the battlefield" },
              { icon: Crosshair, name: "COMPETITIVE", sub: "Test your skills" },
              { icon: Zap, name: "ARCADE", sub: "Feel the adrenaline" },
              { icon: Users, name: "COMMUNITY", sub: "Find your squad" }
            ].map(({ icon: Icon, name, sub }) => (
              <a href="#games" key={name} className="zoro-card flex items-center gap-3 rounded-xl p-4 sm:p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-300/20 bg-purple-500/10 text-purple-300">
                  <Icon size={21} />
                </div>
                <div>
                  <p className="text-[10px] font-black tracking-wider sm:text-xs">{name}</p>
                  <p className="mt-1 text-[10px] text-white/40">{sub}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* GAMES */}
        <section id="games" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="mb-3 text-[10px] font-black tracking-[.3em] text-purple-300">CHOOSE YOUR WORLD</p>
                <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
                  DISCOVER <span className="zoro-title">GAMES</span>
                </h2>
                <p className="mt-3 text-sm text-white/45">Your next obsession is waiting.</p>
              </div>
              <span className="text-xs font-bold text-white/40">THE ZORO COLLECTION <ArrowUpRight className="ml-1 inline" size={15} /></span>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {games.map(({ name, type, color, icon: Icon }, i) => (
                <article key={name} className="zoro-card group overflow-hidden rounded-2xl">
                  <div className="relative flex h-48 items-center justify-center overflow-hidden" style={{ background: `radial-gradient(ellipse at center, ${color}30, #0c0912 72%)` }}>
                    <div className="absolute h-40 w-40 rounded-full border" style={{ borderColor: `${color}55`, boxShadow: `0 0 35px ${color}15` }} />
                    <div className="absolute h-28 w-28 rotate-45 border" style={{ borderColor: `${color}50` }} />
                    <Icon size={58} style={{ color }} className="relative transition duration-500 group-hover:scale-125" />
                    <span className="absolute left-4 top-4 rounded-md border border-white/10 bg-black/30 px-3 py-1 text-[9px] font-black tracking-widest" style={{ color }}>
                      0{i + 1} / GAME
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-black tracking-[.2em]" style={{ color }}>{type}</p>
                    <h3 className="mt-2 text-xl font-black">{name}</h3>
                    <a href="#about" className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-bold text-white/60 transition hover:text-purple-300">
                      EXPLORE GAME <ArrowRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-5 text-[11px] text-white/35">These are sample game categories. Actual games and launch links can be connected later.</p>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="scroll-mt-24 border-y border-white/[0.07] bg-[#0c0712] px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 md:grid-cols-2">
            <div>
              <p className="mb-3 text-[10px] font-black tracking-[.3em] text-cyan-300">WELCOME TO THE ARENA</p>
              <h2 className="text-4xl font-black leading-tight sm:text-5xl">
                NOT JUST A GAME.
                <br /><span className="zoro-title">A WHOLE WORLD.</span>
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/55">
                ZORO GAMES brings together a bold gaming aesthetic, a place
                to discover games and a foundation for player profiles,
                competitive features and future community experiences.
              </p>
              <Link to="/register" className="zoro-btn mt-7 inline-flex items-center gap-3 rounded-lg px-6 py-4 text-xs font-black">
                ENTER ZORO <ArrowRight size={16} />
              </Link>
            </div>

            <div className="zoro-orbit relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950/50 to-black">
              <div className="absolute h-56 w-56 rounded-full border border-purple-400/30" />
              <div className="absolute h-40 w-40 rotate-45 border border-cyan-300/30" />
              <div className="absolute h-28 w-28 rounded-full bg-purple-600/20 blur-2xl" />
              <Gamepad2 size={76} className="relative text-purple-200 drop-shadow-[0_0_25px_#a855f780]" />
              <span className="absolute bottom-5 text-[10px] font-black tracking-[.3em] text-white/45">LEVEL UP YOUR WORLD</span>
            </div>
          </div>
        </section>

        {/* LEADERBOARD CTA */}
        <section id="leaderboard" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12">
          <div className="zoro-glass mx-auto flex max-w-[1200px] flex-col justify-between gap-7 rounded-2xl p-6 sm:p-10 md:flex-row md:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-purple-300">
                <Trophy size={20} />
                <span className="text-[10px] font-black tracking-[.25em]">YOUR JOURNEY. YOUR RANK.</span>
              </div>
              <h2 className="text-3xl font-black sm:text-4xl">CHASE THE <span className="zoro-title">TOP SPOT.</span></h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
                Sign in to access your account. Player scores and rankings will appear here once connected to real game data.
              </p>
            </div>
            <Link to="/login" className="zoro-btn inline-flex shrink-0 items-center justify-center gap-3 rounded-lg px-7 py-4 text-xs font-black">
              PLAYER LOGIN <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 px-5 pb-24 pt-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <p className="mb-3 text-[10px] font-black tracking-[.3em] text-purple-300">PLAYER SUPPORT</p>
              <h2 className="text-3xl font-black sm:text-4xl">QUESTIONS <span className="zoro-title">ANSWERED.</span></h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={faq.q} className={`rounded-xl border ${openFaq === i ? "border-purple-400/40 bg-purple-500/[0.04]" : "border-white/10 bg-white/[0.02]"}`}>
                  <button type="button" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left">
                    <span className="text-sm font-bold sm:text-base">{faq.q}</span>
                    <ChevronDown size={18} className={`shrink-0 text-purple-300 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className="zoro-faq" data-open={openFaq === i}>
                    <div><p className="px-5 pb-5 text-sm leading-7 text-white/55">{faq.a}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#050309] px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-7 sm:flex-row sm:items-center">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20 text-purple-300">
              <Gamepad2 size={23} />
            </span>
            <span className="font-black tracking-wide">ZORO <span className="text-purple-400">GAMES</span></span>
          </Link>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/45">
            <a href="#home" className="hover:text-purple-300">Home</a>
            <a href="#games" className="hover:text-purple-300">Games</a>
            <a href="#faq" className="hover:text-purple-300">Support</a>
            <Link to="/privacy-policy" className="hover:text-purple-300">Privacy</Link>
            <Link to="/terms" className="hover:text-purple-300">Terms</Link>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Headphones size={15} /> MADE FOR GAMERS
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-[1440px] border-t border-white/[0.07] pt-5 text-[10px] text-white/30">
          © {new Date().getFullYear()} ZORO GAMES. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
