
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Gamepad2,
  Headphones,
  Mail,
  MessageCircle,
  Send,
  CircleHelp,
  ShieldCheck,
  Bug,
  CreditCard,
  UserRound,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Clock,
  Zap,
} from "lucide-react";

const issueOptions = [
  { value: "account", label: "Account & Login", icon: UserRound },
  { value: "game", label: "Game Issue", icon: Gamepad2 },
  { value: "technical", label: "Technical Problem", icon: Bug },
  { value: "payment", label: "Payment & Billing", icon: CreditCard },
  { value: "security", label: "Security Concern", icon: ShieldCheck },
  { value: "other", label: "Other Question", icon: CircleHelp },
];

const faqs = [
  {
    question: "How do I create a ZORO GAMES account?",
    answer:
      "Open the Register page, enter your details, and follow the instructions shown on the screen.",
  },
  {
    question: "Why is a game not opening?",
    answer:
      "Check your internet connection and refresh the page. Some game previews may be demonstrations until a playable game is connected.",
  },
  {
    question: "I forgot my password. What should I do?",
    answer:
      "Visit the Login page and select Forgot Password. Password recovery will work once the backend email-reset service is connected.",
  },
  {
    question: "How can I report a problem?",
    answer:
      "Use the support form on this page to describe the issue. The form currently validates your message locally; connect a backend or support email service to deliver submissions.",
  },
];

export default function Support() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "account",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.message.trim()
    ) {
      return;
    }

    // Demo only: connect a backend/API to actually deliver support requests.
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#08050F] text-white">
      <style>{`
        .support-grid {
          background-image:
            linear-gradient(rgba(168,85,247,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,.05) 1px, transparent 1px);
          background-size: 42px 42px;
        }
        .support-glass {
          background: linear-gradient(145deg, rgba(255,255,255,.055), rgba(255,255,255,.015));
          border: 1px solid rgba(255,255,255,.09);
          backdrop-filter: blur(14px);
        }
        .support-input {
          width: 100%;
          border: 1px solid rgba(255,255,255,.10);
          border-radius: 12px;
          background: rgba(5,3,12,.65);
          color: white;
          padding: 13px 14px;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .support-input:focus {
          border-color: rgba(168,85,247,.7);
          box-shadow: 0 0 0 3px rgba(168,85,247,.10);
        }
        .support-input::placeholder { color: #777183; }
        .support-input option { background: #100B1B; color: white; }
        .support-card {
          transition: transform .2s ease, border-color .2s ease;
        }
        .support-card:hover {
          transform: translateY(-3px);
          border-color: rgba(168,85,247,.35);
        }
      `}</style>

      {/* Navigation */}
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
              <div className="text-[9px] tracking-[0.26em] text-gray-500">
                PLAYER SUPPORT
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-7 text-sm text-gray-400 md:flex">
            <Link to="/" className="transition hover:text-white">Home</Link>
            <Link to="/games" className="transition hover:text-white">Games</Link>
            <Link to="/leaderboard" className="transition hover:text-white">Leaderboard</Link>
            <Link to="/about" className="transition hover:text-white">About</Link>
          </div>

          <Link
            to="/login"
            className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold transition hover:border-purple-400/40 hover:bg-purple-500/10"
          >
            Login
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="support-grid relative">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-96 -translate-x-1/2 rounded-full bg-purple-600/15 blur-[110px]" />
        <div className="relative mx-auto max-w-4xl px-5 py-16 text-center sm:py-20">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-500/10 text-purple-300 shadow-[0_0_40px_rgba(168,85,247,.12)]">
            <Headphones size={32} />
          </div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-xs font-bold tracking-[0.15em] text-cyan-200">
            <Zap size={14} /> PLAYER HELP CENTER
          </div>
          <h1 className="text-4xl font-black sm:text-5xl lg:text-6xl">
            HOW CAN WE <span className="text-purple-400">HELP?</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            Got a question, found a bug, or need help with your account?
            Tell us what happened and find answers to common questions below.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: MessageCircle,
              title: "General Questions",
              text: "Questions about the platform and its features.",
              color: "#A855F7",
            },
            {
              icon: Bug,
              title: "Report a Problem",
              text: "Tell us about a bug or a technical issue.",
              color: "#67E8F9",
            },
            {
              icon: ShieldCheck,
              title: "Account Safety",
              text: "Raise an account or security-related concern.",
              color: "#34D399",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="support-glass support-card rounded-2xl p-5 sm:p-6">
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    color: item.color,
                    backgroundColor: `${item.color}18`,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  <Icon size={22} />
                </div>
                <h2 className="font-extrabold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-400">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Form and FAQ */}
      <main className="mx-auto grid max-w-7xl gap-8 px-5 pb-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <section className="support-glass rounded-3xl p-5 sm:p-8">
          <div className="mb-7">
            <p className="text-xs font-black tracking-[0.22em] text-purple-300">
              CONTACT THE TEAM
            </p>
            <h2 className="mt-3 text-2xl font-black sm:text-3xl">
              Send Us a Message
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Complete the form with as much detail as possible.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-6">
              <CheckCircle2 size={38} className="text-cyan-300" />
              <h3 className="mt-4 text-xl font-black">Form Completed</h3>
              <p className="mt-3 leading-7 text-gray-300">
                Your message passed the local form checks. It has not been sent
                to a support team yet because the backend service is not connected.
              </p>
              <button
                type="button"
                onClick={() => {
                  setForm({
                    name: "",
                    email: "",
                    category: "account",
                    subject: "",
                    message: "",
                  });
                  setSubmitted(false);
                }}
                className="mt-6 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold transition hover:bg-white/5"
              >
                Write Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="support-name" className="mb-2 block text-sm font-semibold text-gray-300">
                    Your Name
                  </label>
                  <input
                    id="support-name"
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    className="support-input"
                    placeholder="Enter your name"
                    autoComplete="name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="support-email" className="mb-2 block text-sm font-semibold text-gray-300">
                    Email Address
                  </label>
                  <input
                    id="support-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateField}
                    className="support-input"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="support-category" className="mb-2 block text-sm font-semibold text-gray-300">
                  What do you need help with?
                </label>
                <div className="relative">
                  <select
                    id="support-category"
                    name="category"
                    value={form.category}
                    onChange={updateField}
                    className="support-input appearance-none pr-10"
                  >
                    {issueOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              <div>
                <label htmlFor="support-subject" className="mb-2 block text-sm font-semibold text-gray-300">
                  Subject
                </label>
                <input
                  id="support-subject"
                  name="subject"
                  value={form.subject}
                  onChange={updateField}
                  className="support-input"
                  placeholder="Briefly describe your issue"
                  required
                />
              </div>

              <div>
                <label htmlFor="support-message" className="mb-2 block text-sm font-semibold text-gray-300">
                  Message
                </label>
                <textarea
                  id="support-message"
                  name="message"
                  value={form.message}
                  onChange={updateField}
                  className="support-input min-h-36 resize-y"
                  placeholder="Explain what happened and what you need help with..."
                  minLength={10}
                  maxLength={3000}
                  required
                />
                <p className="mt-2 text-right text-xs text-gray-500">
                  {form.message.length}/3000 characters
                </p>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 px-5 py-3.5 font-extrabold shadow-lg shadow-purple-950/30 transition hover:brightness-110"
              >
                Submit Request <Send size={17} />
              </button>
              <p className="text-xs leading-5 text-gray-500">
                Demo form: submission delivery requires a backend endpoint or
                connected support service.
              </p>
            </form>
          )}
        </section>

        <div className="space-y-8">
          {/* Help information */}
          <section className="support-glass rounded-3xl p-6 sm:p-8">
            <p className="text-xs font-black tracking-[0.22em] text-cyan-300">
              SUPPORT INFORMATION
            </p>
            <h2 className="mt-3 text-2xl font-black">Need Assistance?</h2>
            <p className="mt-3 text-sm leading-7 text-gray-400">
              Use the contact form to describe your question. Once you connect
              your support backend, messages can be routed to the right team.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex gap-4 rounded-xl border border-white/[0.07] bg-black/20 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-bold">Email Support</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Connect your official support email before publishing contact details.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border border-white/[0.07] bg-black/20 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-bold">Response Times</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Publish an expected response window after your support process is ready.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="support-glass rounded-3xl p-6 sm:p-8">
            <div className="mb-6">
              <p className="text-xs font-black tracking-[0.22em] text-purple-300">
                QUICK ANSWERS
              </p>
              <h2 className="mt-3 text-2xl font-black">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.question} className="overflow-hidden rounded-xl border border-white/[0.08] bg-black/20">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 p-4 text-left"
                    >
                      <span className="text-sm font-bold leading-6">{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-purple-300 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-white/[0.06] px-4 py-4 text-sm leading-7 text-gray-400">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Link to="/" className="font-black tracking-[0.15em] text-white">
            ZORO <span className="text-purple-400">GAMES</span>
          </Link>
          <p>We're building a better gaming experience.</p>
          <div className="flex flex-wrap gap-5">
            <Link to="/about" className="transition hover:text-white">About</Link>
            <Link to="/terms" className="transition hover:text-white">Terms</Link>
            <Link to="/privacy-policy" className="transition hover:text-white">Privacy</Link>
          </div>
          <Link to="/games" className="inline-flex items-center gap-2 font-bold text-purple-300 transition hover:text-purple-200">
            Explore Games <ArrowRight size={15} />
          </Link>
        </div>
      </footer>
    </div>
  );
}
