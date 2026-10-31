
// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   Gamepad2,
//   ShieldCheck,
//   LockKeyhole,
//   Database,
//   Cookie,
//   Eye,
//   UserRound,
//   Share2,
//   Bell,
//   FileText,
//   ChevronRight,
//   ArrowUpRight,
//   Mail,
// } from "lucide-react";

// const sections = [
//   {
//     id: "introduction",
//     icon: FileText,
//     title: "1. Introduction",
//     paragraphs: [
//       "Welcome to ZORO GAMES. This Privacy Policy explains how the platform may collect, use, store, and protect information when you visit or use our services.",
//       "This page is a starter template. The published policy must accurately describe the data practices of your actual website, backend, analytics tools, and third-party services.",
//     ],
//   },
//   {
//     id: "information",
//     icon: Database,
//     title: "2. Information We May Collect",
//     paragraphs: [
//       "Account information: depending on the features you use, this may include your username, email address, and authentication details.",
//       "Usage information: this may include pages visited, game interactions, leaderboard activity, device type, browser information, and diagnostic logs.",
//       "Support information: if you contact support, we may process the details you provide so your request can be handled.",
//       "Only collect information that is necessary for defined purposes and permitted by applicable law.",
//     ],
//   },
//   {
//     id: "usage",
//     icon: Eye,
//     title: "3. How Information May Be Used",
//     paragraphs: [
//       "Information may be used to operate accounts, provide requested features, maintain game progress, display rankings, and respond to support requests.",
//       "It may also be used to diagnose errors, prevent abuse, protect platform security, and improve the user experience.",
//       "Where consent or another legal basis is required, processing should only occur in accordance with applicable requirements.",
//     ],
//   },
//   {
//     id: "cookies",
//     icon: Cookie,
//     title: "4. Cookies & Similar Technologies",
//     paragraphs: [
//       "The website may use cookies or similar technologies to maintain sessions, remember preferences, and understand how the platform is used.",
//       "Any analytics, advertising, or optional tracking technologies should be disclosed accurately. Where required, users should be able to provide or withdraw consent.",
//       "You can manage cookies through your browser settings, although disabling certain cookies may affect website functionality.",
//     ],
//   },
//   {
//     id: "sharing",
//     icon: Share2,
//     title: "5. Sharing & Third-Party Services",
//     paragraphs: [
//       "Information may be processed by service providers that help operate the website, such as hosting, database, security, email, and analytics providers.",
//       "Information should only be shared for legitimate, disclosed purposes, under appropriate safeguards, or when required or permitted by law.",
//       "Third-party websites or games may have their own privacy policies. Review those policies before providing information to external services.",
//     ],
//   },
//   {
//     id: "security",
//     icon: LockKeyhole,
//     title: "6. Data Security",
//     paragraphs: [
//       "We aim to use appropriate technical and organizational measures to protect information against unauthorized access, loss, misuse, and alteration.",
//       "No internet-based system can be guaranteed completely secure. Security practices should include access controls, secure connections, protected credentials, and appropriate backups.",
//       "Passwords should be stored using a suitable one-way password-hashing method, never as plain text.",
//     ],
//   },
//   {
//     id: "retention",
//     icon: Database,
//     title: "7. Data Retention",
//     paragraphs: [
//       "Information should be retained only for as long as necessary for the purposes described in this policy, subject to legal, security, and operational requirements.",
//       "Define and implement retention periods for accounts, support requests, security logs, backups, and other records relevant to your actual services.",
//     ],
//   },
//   {
//     id: "rights",
//     icon: UserRound,
//     title: "8. Your Privacy Choices",
//     paragraphs: [
//       "Depending on your location and applicable law, you may have rights to access, correct, delete, or obtain a copy of certain personal information, or to object to or restrict particular processing.",
//       "You may also have choices regarding marketing communications and optional cookies. Requests should be handled using a documented process that complies with applicable law.",
//       "Some information may need to be retained where a lawful exception applies. Any limitations should be explained appropriately.",
//     ],
//   },
//   {
//     id: "children",
//     icon: ShieldCheck,
//     title: "9. Children's Privacy",
//     paragraphs: [
//       "ZORO GAMES should not knowingly collect children's personal information in a way that violates applicable law.",
//       "The platform owner must determine suitable age requirements and implement appropriate safeguards, consent procedures, and parental controls where legally required.",
//     ],
//   },
//   {
//     id: "changes",
//     icon: Bell,
//     title: "10. Updates to This Policy",
//     paragraphs: [
//       "This policy may need to change when the website introduces new features, service providers, or data practices.",
//       "Publish the current version with an accurate effective date and provide notices or obtain consent where required by law.",
//     ],
//   },
//   {
//     id: "contact",
//     icon: Mail,
//     title: "11. Contact About Privacy",
//     paragraphs: [
//       "For privacy questions or requests, use the Support page to contact the platform team.",
//       "Before launch, publish a monitored privacy contact address and identify the responsible legal entity or operator where required.",
//     ],
//   },
// ];

// export default function PrivacyPolicy() {
//   const effectiveDate = "October 28, 2026";

//   return (
//     <div className="min-h-screen overflow-hidden bg-[#08050F] text-white">
//       <style>{`
//         .privacy-grid {
//           background-image:
//             linear-gradient(rgba(168,85,247,.045) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(168,85,247,.045) 1px, transparent 1px);
//           background-size: 40px 40px;
//         }
//         .privacy-glass {
//           background: linear-gradient(145deg, rgba(255,255,255,.055), rgba(255,255,255,.015));
//           border: 1px solid rgba(255,255,255,.08);
//           backdrop-filter: blur(12px);
//         }
//         .privacy-link {
//           transition: color .2s, background .2s;
//         }
//         .privacy-link:hover {
//           color: #C4B5FD;
//           background: rgba(168,85,247,.08);
//         }
//       `}</style>

//       {/* Navbar */}
//       <header className="relative z-10 border-b border-white/[0.08] bg-[#08050F]/90">
//         <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
//           <Link to="/" className="flex shrink-0 items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-400/40 bg-purple-500/15 text-purple-300">
//               <Gamepad2 size={23} />
//             </div>
//             <div>
//               <div className="text-lg font-black tracking-[0.14em]">
//                 ZORO <span className="text-purple-400">GAMES</span>
//               </div>
//               <div className="text-[9px] tracking-[0.25em] text-gray-500">
//                 PRIVACY CENTER
//               </div>
//             </div>
//           </Link>

//           <div className="hidden items-center gap-6 text-sm text-gray-400 md:flex">
//             <Link to="/" className="privacy-link rounded-lg px-2 py-1">Home</Link>
//             <Link to="/games" className="privacy-link rounded-lg px-2 py-1">Games</Link>
//             <Link to="/about" className="privacy-link rounded-lg px-2 py-1">About</Link>
//             <Link to="/support" className="privacy-link rounded-lg px-2 py-1">Support</Link>
//           </div>

//           <Link
//             to="/login"
//             className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold transition hover:border-purple-400/40 hover:bg-purple-500/10"
//           >
//             Login
//           </Link>
//         </nav>
//       </header>

//       {/* Hero */}
//       <section className="privacy-grid relative">
//         <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-96 -translate-x-1/2 rounded-full bg-purple-600/15 blur-[110px]" />
//         <div className="relative mx-auto max-w-5xl px-5 py-16 text-center sm:py-20">
//           <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.07] text-cyan-300 shadow-[0_0_35px_rgba(103,232,249,.08)]">
//             <ShieldCheck size={32} />
//           </div>

//           <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-xs font-bold tracking-[0.17em] text-cyan-200">
//             <LockKeyhole size={14} /> YOUR PRIVACY MATTERS
//           </div>

//           <h1 className="text-4xl font-black sm:text-5xl lg:text-6xl">
//             PRIVACY <span className="text-purple-400">POLICY</span>
//           </h1>

//           <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
//             Understand how information may be handled while using ZORO GAMES,
//             and learn about privacy choices and data protection.
//           </p>

//           <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500">
//             <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
//               Effective date: {effectiveDate}
//             </span>
//             <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
//               Privacy & data transparency
//             </span>
//           </div>
//         </div>
//       </section>

//       {/* Content */}
//       <main className="mx-auto grid max-w-7xl gap-8 px-5 pb-20 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
//         <aside className="h-fit lg:sticky lg:top-6">
//           <div className="privacy-glass rounded-2xl p-5">
//             <h2 className="mb-4 text-xs font-black tracking-[0.2em] text-cyan-300">
//               ON THIS PAGE
//             </h2>

//             <nav className="space-y-1">
//               {sections.map((section) => (
//                 <a
//                   key={section.id}
//                   href={`#${section.id}`}
//                   className="privacy-link flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400"
//                 >
//                   <span>{section.title}</span>
//                   <ChevronRight size={15} className="shrink-0" />
//                 </a>
//               ))}
//             </nav>

//             <div className="mt-5 border-t border-white/[0.08] pt-5">
//               <p className="text-xs leading-6 text-gray-500">
//                 Need help with a privacy question?
//               </p>
//               <Link
//                 to="/support"
//                 className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-purple-300 hover:text-purple-200"
//               >
//                 Contact Support <ArrowUpRight size={15} />
//               </Link>
//             </div>
//           </div>
//         </aside>

//         <div className="min-w-0 space-y-5">
//           <div className="privacy-glass rounded-2xl border-l-2 border-l-cyan-300 p-5 sm:p-6">
//             <div className="flex items-start gap-3">
//               <ShieldCheck size={23} className="mt-1 shrink-0 text-cyan-300" />
//               <div>
//                 <h2 className="font-extrabold">Important privacy notice</h2>
//                 <p className="mt-2 text-sm leading-7 text-gray-400">
//                   This is a general website template, not a verified description
//                   of your current data practices or legal advice. Before
//                   publishing, update it to reflect exactly what your website
//                   collects, why it collects it, who receives it, and how users
//                   can exercise their rights.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {sections.map((section) => {
//             const Icon = section.icon;

//             return (
//               <section
//                 id={section.id}
//                 key={section.id}
//                 className="privacy-glass scroll-mt-6 rounded-2xl p-5 sm:p-7"
//               >
//                 <div className="flex items-start gap-4">
//                   <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-500/10 text-purple-300">
//                     <Icon size={21} />
//                   </div>

//                   <div className="min-w-0 flex-1">
//                     <h2 className="text-lg font-black sm:text-xl">
//                       {section.title}
//                     </h2>

//                     <div className="mt-4 space-y-3">
//                       {section.paragraphs.map((paragraph, index) => (
//                         <p
//                           key={index}
//                           className="text-sm leading-7 text-gray-400 sm:text-base"
//                         >
//                           {paragraph}
//                         </p>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </section>
//             );
//           })}

//           <div className="rounded-2xl border border-purple-400/20 bg-gradient-to-r from-purple-950/50 to-[#0B111B] p-6 sm:p-8">
//             <div className="flex items-center gap-3">
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300">
//                 <Mail size={22} />
//               </div>
//               <h2 className="text-xl font-black">Privacy Questions?</h2>
//             </div>

//             <p className="mt-3 text-sm leading-7 text-gray-400">
//               Contact the ZORO GAMES team if you have a question about this
//               policy or want to make a privacy-related request.
//             </p>

//             <Link
//               to="/support"
//               className="mt-5 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold transition hover:bg-purple-500"
//             >
//               Visit Support <ArrowUpRight size={16} />
//             </Link>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="border-t border-white/[0.08] bg-black/20">
//         <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
//           <Link to="/" className="font-black tracking-[0.15em] text-white">
//             ZORO <span className="text-purple-400">GAMES</span>
//           </Link>

//           <div className="flex flex-wrap gap-5">
//             <Link to="/about" className="transition hover:text-white">About</Link>
//             <Link to="/terms" className="transition hover:text-white">Terms & Conditions</Link>
//             <Link to="/support" className="transition hover:text-white">Support</Link>
//           </div>

//           <p>© {new Date().getFullYear()} ZORO GAMES</p>
//         </div>
//       </footer>
//     </div>
//   );
// }


import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Gamepad2 } from 'lucide-react';

const sections = [
  {
    title: '1. Information We Collect',
    body: 'ZORO GAMES may collect information you choose to provide, such as your username and email address, plus basic technical information needed to operate and secure the site.'
  },
  {
    title: '2. How We Use Information',
    body: 'Information may be used to operate your account, provide site features, respond to support requests, improve the experience, and help detect abuse or security issues.'
  },
  {
    title: '3. Cookies and Technical Data',
    body: 'The site or its hosting services may use cookies or similar technologies for essential functionality, preferences, analytics, and security. Browser settings may allow you to manage cookies.'
  },
  {
    title: '4. Sharing and Service Providers',
    body: 'Information may be processed by service providers that help host, maintain, secure, or operate the site, or disclosed when required by applicable law. We do not promise that internet transmission or storage is completely risk-free.'
  },
  {
    title: '5. Data Security and Retention',
    body: 'Reasonable measures may be used to protect information. Data is retained for as long as needed for site operations, legitimate purposes, and applicable legal requirements.'
  },
  {
    title: '6. Your Choices',
    body: 'You can choose what information you submit and may contact the site operator to ask about access, correction, or deletion where applicable law provides those rights.'
  },
  {
    title: '7. Children’s Privacy',
    body: 'The site is not intended for children who are not permitted to use it under applicable law. If you believe a child has submitted personal information, contact the site operator so the matter can be reviewed.'
  },
  {
    title: '8. Policy Updates and Contact',
    body: 'This policy may be updated as the site changes. The revised version will be posted on this page with an updated effective date. For privacy questions, contact the site operator through the official support channel provided on the site.'
  }
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#070710] text-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-300">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950/70 via-[#101020] to-cyan-950/40 p-7 sm:p-10">
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative flex items-start gap-4">
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-300">
              <ShieldCheck size={28} />
            </div>
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
                <Gamepad2 size={15} /> ZORO GAMES
              </p>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Privacy Policy</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                This page explains in general terms how information may be handled when you use ZORO GAMES.
              </p>
              <p className="mt-4 text-xs text-slate-500">Effective date: October 28, 2026</p>
            </div>
          </div>
        </header>

        <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-6 text-amber-100/80">
          This is a starter policy template. Review it and adapt it to your actual data practices, services, and applicable laws before publishing.
        </div>

        <div className="mt-6 space-y-4">
          {sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <h2 className="text-lg font-bold text-white">{section.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-400">{section.body}</p>
            </section>
          ))}
        </div>

        <footer className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} ZORO GAMES</span>
          <Link to="/" className="text-cyan-300 transition hover:text-cyan-200">Return to home</Link>
        </footer>
      </div>
    </main>
  );
}
