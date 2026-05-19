"use client";

import Link from "next/link";

const WHATSAPP_URL = "https://wa.me/6590026161";
const PHONE_URL = "tel:+6590026161";
const EMAIL = "stleading@gmail.com";

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen font-sans text-navy">

      {/* Hero */}
      <section className="bg-paper px-6 lg:px-11 relative overflow-hidden">
        <div style={{ position: "absolute", right: -40, top: 20 }} className="pointer-events-none select-none">
          <span
            className="font-display font-bold text-ice leading-none"
            style={{ fontSize: "clamp(160px, 30vw, 360px)", letterSpacing: "-0.06em", display: "block" }}
          >
            Hi.
          </span>
        </div>
        <div className="max-w-screen-xl mx-auto py-16 lg:py-20 relative">
          <div
            className="inline-flex items-center gap-2 bg-white border border-rule rounded-pill px-3 py-2 text-[13px] font-medium mb-8"
            style={{ paddingLeft: "8px", paddingRight: "14px" }}
          >
            <span className="bg-[#dcfce7] text-[#166534] px-2 py-0.5 rounded-pill text-[11px] font-semibold uppercase tracking-wider">
              ● Open
            </span>
            Mon–Sat · 9am–6pm · Reply within 1 business day
          </div>
          <h1
            className="font-display font-bold text-navy leading-none"
            style={{ fontSize: "clamp(56px, 10vw, 112px)", letterSpacing: "-0.04em", marginBottom: "32px" }}
          >
            Get in touch.
          </h1>
          <p className="text-mute text-lg leading-relaxed max-w-lg">
            Whether you need to hire fast or want to explore opportunities in Singapore — we&apos;re one message away.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="px-6 lg:px-11 py-16 lg:py-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_420px] gap-14 lg:gap-20 items-start">

            {/* Form */}
            <div>
              <div
                className="inline-block font-mono text-[11px] font-semibold tracking-[0.14em] text-mute uppercase mb-8"
                style={{ borderBottom: "1px solid rgba(11,31,58,0.12)", paddingBottom: "8px", width: "100%" }}
              >
                Send us a message
              </div>

              <form
                action="https://formspree.io/f/your-form-id"
                method="POST"
                className="flex flex-col gap-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-navy tracking-wide">
                      Full name <span className="text-cobalt">*</span>
                    </label>
                    <input
                      name="name"
                      required
                      placeholder="Your full name"
                      className="w-full border border-rule rounded-card px-4 py-3 text-navy text-sm bg-white focus:outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/10 transition-all placeholder:text-mute/50"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-navy tracking-wide">
                      Email address <span className="text-cobalt">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="w-full border border-rule rounded-card px-4 py-3 text-navy text-sm bg-white focus:outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/10 transition-all placeholder:text-mute/50"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-navy tracking-wide">
                    I am a…
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["Employer", "Job seeker", "Partner", "Other"].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center justify-center gap-2 border border-rule rounded-card px-3 py-2.5 text-sm font-medium text-navy cursor-pointer hover:border-cobalt hover:bg-ice transition-all has-[:checked]:border-cobalt has-[:checked]:bg-ice has-[:checked]:text-cobalt"
                      >
                        <input type="radio" name="enquiry_type" value={opt} className="sr-only" />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-navy tracking-wide">
                    Message <span className="text-cobalt">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us what you need — headcount, industry, timeline, or anything else on your mind."
                    className="w-full border border-rule rounded-card px-4 py-3 text-navy text-sm bg-white focus:outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/10 transition-all resize-none placeholder:text-mute/50"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-cobalt hover:bg-cobalt-light text-white font-semibold px-8 py-4 rounded-pill transition-all text-sm shadow-lg hover:shadow-xl"
                  >
                    Send message →
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-4 lg:sticky lg:top-24">

              {/* Direct contacts */}
              <div className="bg-navy rounded-card p-7 text-white">
                <div className="font-mono text-[11px] font-semibold tracking-[0.14em] text-cobalt-soft uppercase mb-5">
                  Direct contact
                </div>
                <div className="flex flex-col gap-4">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-card bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors text-lg">
                      💬
                    </div>
                    <div>
                      <div className="text-[11px] font-mono tracking-widest text-white/50 uppercase mb-0.5">WhatsApp</div>
                      <div className="font-semibold text-sm group-hover:text-cobalt-soft transition-colors">+65 9002 6161 →</div>
                    </div>
                  </a>

                  <div className="border-t border-white/10" />

                  <a href={PHONE_URL} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-card bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors text-lg">
                      📞
                    </div>
                    <div>
                      <div className="text-[11px] font-mono tracking-widest text-white/50 uppercase mb-0.5">Phone</div>
                      <div className="font-semibold text-sm group-hover:text-cobalt-soft transition-colors">+65 9002 6161 →</div>
                    </div>
                  </a>

                  <div className="border-t border-white/10" />

                  <a href={`mailto:${EMAIL}`} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-card bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors text-lg">
                      ✉️
                    </div>
                    <div>
                      <div className="text-[11px] font-mono tracking-widest text-white/50 uppercase mb-0.5">Email</div>
                      <div className="font-semibold text-sm group-hover:text-cobalt-soft transition-colors">{EMAIL} →</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Office address */}
              <div className="bg-paper border border-rule rounded-card p-6">
                <div className="font-mono text-[11px] font-semibold tracking-[0.14em] text-mute uppercase mb-4">
                  Office
                </div>
                <div className="text-sm leading-relaxed text-navy">
                  <div className="font-semibold mb-1">Leading-Edge Consultancy Services Pte Ltd</div>
                  60 Paya Lebar Road<br />
                  #06-28 Paya Lebar Square<br />
                  Singapore 409051
                </div>
                <div className="mt-4 font-mono text-[11px] text-mute tracking-wider">
                  EA LICENCE 12C6068
                </div>
              </div>

              {/* Hours */}
              <div className="bg-ice border border-rule rounded-card p-6">
                <div className="font-mono text-[11px] font-semibold tracking-[0.14em] text-mute uppercase mb-4">
                  Office hours
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  {[
                    { day: "Monday – Friday", hours: "9:00am – 6:00pm" },
                    { day: "Saturday", hours: "9:00am – 1:00pm" },
                    { day: "Sunday & PH", hours: "Closed" },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between">
                      <span className="text-mute">{day}</span>
                      <span className="font-medium text-navy">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-cobalt text-white px-6 lg:px-11 py-20 relative overflow-hidden">
        <div className="pointer-events-none select-none absolute left-[-60px] bottom-[-180px]">
          <span
            className="font-display font-bold"
            style={{ fontSize: "clamp(160px, 35vw, 480px)", letterSpacing: "-0.06em", color: "rgba(255,255,255,0.07)", display: "block", lineHeight: 0.8 }}
          >
            Hire.
          </span>
        </div>
        <div className="max-w-screen-xl mx-auto relative">
          <h2
            className="font-display font-bold leading-none"
            style={{ fontSize: "clamp(40px, 8vw, 96px)", letterSpacing: "-0.03em", marginBottom: "56px", maxWidth: "980px" }}
          >
            One message away from a fully-staffed week.
          </h2>
          <div className="grid sm:grid-cols-3 gap-3 max-w-3xl">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-cobalt rounded-card p-5 flex flex-col gap-1 font-semibold hover:bg-ice transition-colors"
            >
              <span className="font-mono text-[11px] tracking-[0.16em] opacity-70 uppercase">Employers</span>
              <span className="text-[15px]">Speak to a consultant →</span>
            </a>
            <Link
              href="/apply"
              className="bg-navy text-white rounded-card p-5 flex flex-col gap-1 font-semibold hover:bg-navy-deep transition-colors"
            >
              <span className="font-mono text-[11px] tracking-[0.16em] opacity-70 uppercase">Workers</span>
              <span className="text-[15px]">Apply for a job →</span>
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-card p-5 flex flex-col gap-1 font-semibold hover:bg-white/20 transition-colors"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              <span className="font-mono text-[11px] tracking-[0.16em] opacity-70 uppercase">WhatsApp</span>
              <span className="text-[15px]">+65 9002 6161 →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white/70 px-6 lg:px-11 pt-16 pb-9 text-[13.5px]">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 mb-12">
            <div>
              <div className="font-display text-xl font-bold text-white tracking-tight mb-4">
                Leading-Edge<span className="text-cobalt-soft">.</span>
              </div>
              <div className="leading-relaxed">
                60 Paya Lebar Road, #06-28 Paya Lebar Square, Singapore 409051.
              </div>
              <div className="mt-4 font-mono text-[11.5px] tracking-widest text-white/50">
                EA LICENCE 12C6068 · PERSONAL EA R1108879
              </div>
            </div>
            <div>
              <div className="text-white font-semibold mb-4">Employers</div>
              <div className="flex flex-col gap-2">
                <Link href="/#how" className="hover:text-white transition-colors">How it works</Link>
                <Link href="/#industries" className="hover:text-white transition-colors">Industries</Link>
                <span>Quota &amp; levy</span>
                <Link href="/contact" className="hover:text-white transition-colors">Speak to consultant</Link>
              </div>
            </div>
            <div>
              <div className="text-white font-semibold mb-4">Workers</div>
              <div className="flex flex-col gap-2">
                <Link href="/apply" className="hover:text-white transition-colors">Apply now</Link>
                <Link href="/#industries" className="hover:text-white transition-colors">Job categories</Link>
                <span>Documents</span>
                <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
              </div>
            </div>
            <div>
              <div className="text-white font-semibold mb-4">Reach us</div>
              <div className="flex flex-col gap-2">
                <a href={PHONE_URL} className="hover:text-white transition-colors">+65 9002 6161</a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp same number</a>
                <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">{EMAIL}</a>
                <span>Mon–Sat · 9–6</span>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-[12px] text-white/40">
            <span>© 2026 Leading-Edge Consultancy Services Pte Ltd. All rights reserved.</span>
            <span>Made in Singapore</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
