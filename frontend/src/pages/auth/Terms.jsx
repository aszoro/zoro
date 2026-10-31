
import React from "react";
import { Link } from "react-router-dom";
import {
  Gamepad2,
  ShieldCheck,
  Scale,
  UserCheck,
  Trophy,
  AlertTriangle,
  LockKeyhole,
  FileText,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

const sections = [
  {
    id: "acceptance",
    icon: FileText,
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using ZORO GAMES, you agree to follow these Terms & Conditions and any applicable laws.",
      "If you do not agree with these terms, please do not use the platform. Additional terms may apply to specific features or services.",
    ],
  },
  {
    id: "eligibility",
    icon: UserCheck,
    title: "2. Eligibility & Accounts",
    content: [
      "You must meet the minimum age requirements applicable in your location and have the legal capacity to use the services.",
      "Provide accurate information when creating an account. You are responsible for keeping your login credentials secure and for activity performed through your account.",
      "Do not impersonate another person or create accounts for unlawful purposes.",
    ],
  },
  {
    id: "fair-play",
    icon: Trophy,
    title: "3. Fair Play & Conduct",
    content: [
      "Players are expected to act respectfully and follow the rules of each game and competition.",
      "Cheating, exploiting bugs, manipulating scores, using unauthorized automation, or interfering with other players' experiences is prohibited.",
      "We may investigate suspected abuse and take proportionate action where permitted by applicable law.",
    ],
  },
  {
    id: "prohibited",
    icon: AlertTriangle,
    title: "4. Prohibited Activities",
    content: [
      "Do not use the platform to distribute malware, conduct fraud, harass others, violate another person's rights, or attempt unauthorized access.",
      "Do not disrupt the website, overload its systems, reverse-engineer restricted components, or bypass security measures.",
      "Do not submit content that is unlawful, deceptive, threatening, or otherwise prohibited by applicable law.",
    ],
  },
  {
    id: "content",
    icon: ShieldCheck,
    title: "5. Games & Platform Content",
    content: [
      "The platform may include game listings, previews, features, and third-party content. Availability and functionality may change over time.",
      "Unless explicitly stated otherwise, platform names, logos, designs, and original materials belong to their respective owners and may not be reused without permission.",
      "Third-party games and services may be governed by their own terms and privacy policies.",
    ],
  },
  {
    id: "availability",
    icon: Scale,
    title: "6. Availability & Changes",
    content: [
      "We aim to keep the platform accessible, but uninterrupted or error-free operation cannot be guaranteed.",
      "Features may be updated, suspended, or discontinued for maintenance, security, operational, or legal reasons.",
      "Where required by law, we will provide applicable notices about material changes.",
    ],
  },
  {
    id: "suspension",
    icon: LockKeyhole,
    title: "7. Account Suspension",
    content: [
      "Where permitted by law, access may be restricted if an account is associated with abuse, fraud, security risks, or serious violations of these terms.",
      "You may contact support to ask questions about an account restriction. Any review process will be subject to applicable law and the platform's procedures.",
    ],
  },
  {
    id: "liability",
    icon: Scale,
    title: "8. Disclaimers & Liability",
    content: [
      "To the extent permitted by applicable law, the platform is provided on an 'as available' basis, without guarantees that every feature will always be available or error-free.",
      "Nothing in these terms excludes or limits liability where such exclusion or limitation is prohibited by law, including applicable consumer rights.",
    ],
  },
  {
    id: "changes",
    icon: FileText,
    title: "9. Changes to These Terms",
    content: [
      "We may revise these terms as the platform evolves. The latest version should be published on this page with its effective date.",
      "Your continued use after updated terms become effective may indicate acceptance where permitted by applicable law. If you disagree with a change, you should stop using affected services.",
    ],
  },
  {
    id: "contact",
    icon: UserCheck,
    title: "10. Contact & Questions",
    content: [
      "If you have questions about these terms, contact the platform team through the Support page.",
      "These terms should be reviewed and adapted to your actual business, services, location, and legal obligations before the website is launched.",
    ],
  },
];

export default function Terms() {
  const effectiveDate = "October 28, 2026";

  return (
    <div className="min-h-screen overflow-hidden bg-[#08050F] text-white">
      <style>{`
        .terms-grid {
          background-image:
            linear-gradient(rgba(168,85,247,.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,.045) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .terms-glass {
          background: linear-gradient(145deg, rgba(255,255,255,.055), rgba(255,255,255,.015));
          border: 1px solid rgba(255,255,255,.08);
          backdrop-filter: blur(12px);
        }
        .terms-link {
          transition: color .2s, background .2s, border-color .2s;
        }
        .terms-link:hover {
          color: #C4B5FD;
          background: rgba(168,85,247,.08);
        }
      `}</style>

      {/* Navbar */}
      <header className="relative z-10 border-b border-white/[0.08] bg-[#08050F]/90">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-400/40 bg-purple-500/15 text-purple-300">
              <Gamepad2 size={23} />
            </div>
            <div>
              <div className="text-lg font-black tracking-[0.14em]">
                ZORO <span className="text-purple-400">GAMES</span>
              </div>
              <div className="text-[9px] tracking-[0.25em] text-gray-500">
                TERMS & CONDITIONS
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-6 text-sm text-gray-400 md:flex">
            <Link to="/" className="terms-link rounded-lg px-2 py-1">Home</Link>
            <Link to="/games" className="terms-link rounded-lg px-2 py-1">Games</Link>
            <Link to="/about" className="terms-link rounded-lg px-2 py-1">About</Link>
            <Link to="/support" className="terms-link rounded-lg px-2 py-1">Support</Link>
          </div>

          <Link
            to="/register"
            className="rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-bold transition hover:bg-purple-500"
          >
            Join Now ↗
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="terms-grid relative">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-96 -translate-x-1/2 rounded-full bg-purple-600/15 blur-[110px]" />
        <div className="relative mx-auto max-w-5xl px-5 py-16 text-center sm:py-20">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-500/10 text-purple-300">
            <Scale size={31} />
          </div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/[0.07] px-4 py-2 text-xs font-bold tracking-[0.17em] text-purple-300">
            <ShieldCheck size={14} /> PLATFORM GUIDELINES
          </div>
          <h1 className="text-4xl font-black sm:text-5xl lg:text-6xl">
            TERMS & <span className="text-purple-400">CONDITIONS</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            Please review the rules and guidelines for using ZORO GAMES.
            These terms explain account responsibilities, acceptable conduct,
            and how the platform may operate.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
              Effective date: {effectiveDate}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
              Please read before using the platform
            </span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto grid max-w-7xl gap-8 px-5 pb-20 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        {/* Table of contents */}
        <aside className="h-fit lg:sticky lg:top-6">
          <div className="terms-glass rounded-2xl p-5">
            <h2 className="mb-4 text-xs font-black tracking-[0.2em] text-cyan-300">
              ON THIS PAGE
            </h2>
            <nav className="space-y-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="terms-link flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400"
                >
                  <span>{section.title}</span>
                  <ChevronRight size={15} className="shrink-0" />
                </a>
              ))}
            </nav>
            <div className="mt-5 border-t border-white/[0.08] pt-5">
              <p className="text-xs leading-6 text-gray-500">
                Need help understanding a section?
              </p>
              <Link
                to="/support"
                className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-purple-300 hover:text-purple-200"
              >
                Contact Support <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </aside>

        {/* Terms sections */}
        <div className="min-w-0 space-y-5">
          <div className="terms-glass rounded-2xl border-l-2 border-l-cyan-300 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck size={22} className="mt-1 shrink-0 text-cyan-300" />
              <div>
                <h2 className="font-extrabold">A quick note</h2>
                <p className="mt-2 text-sm leading-7 text-gray-400">
                  This is a starter template for your gaming website, not
                  legal advice. Customize it to match your actual features and
                  business, and get a qualified legal review before publishing.
                </p>
              </div>
            </div>
          </div>

          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <section
                id={section.id}
                key={section.id}
                className="terms-glass scroll-mt-6 rounded-2xl p-5 sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-500/10 text-purple-300">
                    <Icon size={21} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-black sm:text-xl">
                      {section.title}
                    </h2>
                    <div className="mt-4 space-y-3">
                      {section.content.map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-sm leading-7 text-gray-400 sm:text-base"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}

          <div className="rounded-2xl border border-purple-400/20 bg-gradient-to-r from-purple-950/50 to-[#0B111B] p-6 sm:p-8">
            <h2 className="text-xl font-black">Have a question?</h2>
            <p className="mt-2 text-sm leading-7 text-gray-400">
              If anything in these terms is unclear, reach out through our
              support page.
            </p>
            <Link
              to="/support"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold transition hover:bg-purple-500"
            >
              Contact Support <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Link to="/" className="font-black tracking-[0.15em] text-white">
            ZORO <span className="text-purple-400">GAMES</span>
          </Link>
          <div className="flex flex-wrap gap-5">
            <Link to="/about" className="transition hover:text-white">About</Link>
            <Link to="/privacy-policy" className="transition hover:text-white">Privacy Policy</Link>
            <Link to="/support" className="transition hover:text-white">Support</Link>
          </div>
          <p>© {new Date().getFullYear()} ZORO GAMES</p>
        </div>
      </footer>
    </div>
  );
}
