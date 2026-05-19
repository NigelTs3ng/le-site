"use client";

import { useState, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import Image from "next/image";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);


const INDUSTRIES = [
  "F&B Service", "Construction", "Caregivers", "General Workers",
  "Service & Retail", "Production", "Healthcare", "Engineering",
  "IT", "Hospitality", "Other",
];

const NEXT_STEPS = [
  { n: "01", t: "Profile review",    b: "We screen your CV and verify your documents within two working days." },
  { n: "02", t: "WhatsApp callback", b: "A consultant reaches out to confirm details and discuss roles." },
  { n: "03", t: "Employer match",    b: "We share your shortlist of vetted Singapore employers." },
  { n: "04", t: "Onboarding",        b: "We handle work-pass, medical, and arrival paperwork end to end." },
];

const TRUST_CHIPS = [
  { tag: "MOM Licensed",   body: "EA 12C6068 · Since 2015" },
  { tag: "Secure Payment", body: "$3.99 SGD admin fee · Stripe" },
  { tag: "48h Reply",      body: "We review within two working days" },
  { tag: "Private",        body: "Your details stay confidential" },
];

const inputCls     = "bg-white border border-rule rounded-[12px] px-4 py-[13px] text-[15px] text-navy outline-none focus:border-cobalt transition-colors w-full";
const inputFlexCls  = "bg-white border border-rule rounded-[12px] px-4 py-[13px] text-[15px] text-navy outline-none focus:border-cobalt transition-colors flex-1 min-w-0";
const selectCodeCls = "bg-white border border-rule rounded-[12px] px-3 py-[13px] text-[15px] text-navy outline-none focus:border-cobalt transition-colors w-[105px] shrink-0";

export default function ApplyPage() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const validateForm = () => {
    const requiredFields = ["name", "email", "phone", "country", "industry"];
    const missingFields = requiredFields.filter((field) => !form[field]);
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return false;
    }
    if (!file) {
      setError("Please upload your resume");
      return false;
    }
    return true;
  };

  const handleStripePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;
    setLoading(true);

    localStorage.setItem("pendingFormData", JSON.stringify(form));
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem("pendingFile", reader.result as string);
        startStripe();
      };
      reader.readAsDataURL(file);
    } else {
      startStripe();
    }

    async function startStripe() {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();
      if (!res.ok || !data.id) {
        setError(data.error || "Failed to create checkout session. Please try again.");
        setLoading(false);
        return;
      }
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: data.id });
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="bg-paper px-5 sm:px-8 lg:px-11 relative overflow-hidden">
        <div
          className="absolute font-display font-bold text-ice leading-[0.8] select-none pointer-events-none"
          style={{ right: -40, top: 0, fontSize: "clamp(120px,25vw,360px)", letterSpacing: "-0.06em" }}
          aria-hidden="true"
        >
          Apply.
        </div>
        <div className="max-w-[1200px] mx-auto py-10 lg:py-[72px] pb-10 lg:pb-16 relative">
          <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-cobalt">
            For job seekers · Apply online
          </div>
          <h1
            className="font-display font-bold text-navy mt-5 max-w-[900px]"
            style={{ fontSize: "clamp(36px,9vw,100px)", letterSpacing: "-0.04em", lineHeight: 0.94 }}
          >
            Apply for a job in Singapore{" "}
            <em className="text-cobalt not-italic font-medium">—</em> in five minutes.
          </h1>
          <p className="text-[18px] leading-[1.55] text-mute mt-6 max-w-[640px]">
            Submit your application below. A consultant reviews your profile within two working days
            and follows up by WhatsApp - and your details stay private.
          </p>
          <div className="flex gap-3 mt-8 flex-wrap">
            {TRUST_CHIPS.map((b) => (
              <div key={b.tag} className="bg-white border border-rule rounded-[14px] px-4 py-3 flex flex-col gap-0.5">
                <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-cobalt font-semibold">{b.tag}</div>
                <div className="text-[13px] text-navy font-medium">{b.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BODY: sidebar + form ─────────────────────────────────── */}
      <section className="bg-white py-10 lg:py-[72px] px-5 sm:px-8 lg:px-11 pb-14 lg:pb-[100px]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-9 items-start">

          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-8 flex flex-col gap-4">

            {/* What happens next */}
            <div className="bg-navy text-white rounded-[20px] p-7 pb-[26px] relative overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(circle at 100% 0%, rgba(59,130,246,0.3), transparent 50%)" }}
              />
              <div className="relative">
                <div className="font-mono text-[11px] tracking-[0.2em] text-cobalt-soft uppercase">
                  What happens next
                </div>
                <h3
                  className="font-display font-bold mt-[10px] mb-[22px] leading-[1.05]"
                  style={{ fontSize: 28, letterSpacing: "-0.02em" }}
                >
                  Four steps after you submit.
                </h3>
                {NEXT_STEPS.map((s, i) => (
                  <div
                    key={s.n}
                    className={`flex gap-4 pb-4 mb-4 ${i < NEXT_STEPS.length - 1 ? "border-b border-white/[0.14]" : ""}`}
                  >
                    <div className="font-display text-[24px] font-bold text-cobalt-soft leading-none min-w-[30px]">{s.n}</div>
                    <div>
                      <div className="font-display text-[16px] font-bold tracking-[-0.01em]">{s.t}</div>
                      <div className="text-[13px] text-white/75 mt-1 leading-[1.5]">{s.b}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>

          {/* FORM */}
          <form
            className="bg-white rounded-[24px] p-5 sm:p-8 lg:p-10 border border-rule"
            onSubmit={handleStripePayment}
          >

            {/* ── Section 01: Personal info ── */}
            <div className="mb-8">
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-cobalt">Section 01</div>
              <h3
                className="font-display font-bold text-navy mt-1.5"
                style={{ fontSize: 28, letterSpacing: "-0.02em" }}
              >
                Personal information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-[18px]">
                <label className="flex flex-col gap-2">
                  <span className="text-[13px] font-semibold text-navy">Full name <span className="text-cobalt">*</span></span>
                  <input name="name" onChange={handleChange} placeholder="Enter your full name" className={inputCls} />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[13px] font-semibold text-navy">Email address <span className="text-cobalt">*</span></span>
                  <input name="email" type="email" onChange={handleChange} placeholder="you@example.com" className={inputCls} />
                </label>
                <label className="flex flex-col gap-2 sm:col-span-2">
                  <span className="text-[13px] font-semibold text-navy">Phone number <span className="text-cobalt">*</span></span>
                  <div className="flex gap-2">
                    <select name="countryCode" onChange={handleChange} className={selectCodeCls}>
                      <option value="+65">+65 SG</option>
                      <option value="+60">+60 MY</option>
                      <option value="+62">+62 ID</option>
                      <option value="+66">+66 TH</option>
                      <option value="+84">+84 VN</option>
                      <option value="+63">+63 PH</option>
                      <option value="+95">+95 MM</option>
                      <option value="+91">+91 IN</option>
                      <option value="+880">+880 BD</option>
                      <option value="+86">+86 CN</option>
                      <option value="+852">+852 HK</option>
                      <option value="+886">+886 TW</option>
                      <option value="+81">+81 JP</option>
                      <option value="+82">+82 KR</option>
                      <option value="+1">+1 US/CA</option>
                      <option value="+44">+44 UK</option>
                      <option value="+61">+61 AU</option>
                      <option value="+64">+64 NZ</option>
                    </select>
                    <input name="phone" onChange={handleChange} placeholder="9123 4567" className={inputFlexCls} />
                  </div>
                </label>
                <label className="flex flex-col gap-2 sm:col-span-2">
                  <span className="text-[13px] font-semibold text-navy">Country of origin <span className="text-cobalt">*</span></span>
                  <select name="country" onChange={handleChange} className={inputCls}>
                    <option value="">Select your country</option>
                    <option>Singapore</option>
                    <option>Malaysia</option>
                    <option>Indonesia</option>
                    <option>Thailand</option>
                    <option>Vietnam</option>
                    <option>Philippines</option>
                    <option>Myanmar</option>
                    <option>India</option>
                    <option>Bangladesh</option>
                    <option>China</option>
                    <option>Hong Kong</option>
                    <option>Taiwan</option>
                    <option>Japan</option>
                    <option>South Korea</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                    <option>New Zealand</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="border-t border-rule mb-8" />

            {/* ── Section 02: About your work ── */}
            <div className="mb-8">
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-cobalt">Section 02</div>
              <h3
                className="font-display font-bold text-navy mt-1.5 mb-[18px]"
                style={{ fontSize: 28, letterSpacing: "-0.02em" }}
              >
                About your work
              </h3>

              {/* Industry chips */}
              <div className="flex flex-col gap-2 mb-5">
                <span className="text-[13px] font-semibold text-navy">
                  Industry / field <span className="text-cobalt">*</span>
                </span>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-[10px]">
                  {INDUSTRIES.map((ind) => {
                    const selected = form.industry === ind;
                    return (
                      <label
                        key={ind}
                        className={`flex items-center gap-2 rounded-[12px] px-[14px] py-3 text-[13.5px] font-semibold cursor-pointer border transition-colors ${
                          selected
                            ? "bg-navy text-white border-navy"
                            : "bg-white text-navy border-rule hover:border-cobalt"
                        }`}
                      >
                        <span
                          className={`w-[14px] h-[14px] rounded-full border-2 flex items-center justify-center shrink-0 ${
                            selected ? "border-white" : "border-rule"
                          }`}
                        >
                          {selected && <span className="w-[6px] h-[6px] bg-white rounded-full" />}
                        </span>
                        <input
                          type="radio"
                          name="industry"
                          value={ind}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        {ind}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <label className="flex flex-col gap-2 mb-5">
                <span className="text-[13px] font-semibold text-navy">
                  Tell us about yourself{" "}
                  <span className="text-mute font-normal text-[12px]">(optional)</span>
                </span>
                <textarea
                  name="description"
                  onChange={handleChange}
                  rows={5}
                  placeholder="e.g. 5 years F&B server experience in Penang, English + Bahasa Malaysia, looking for full-time work in Singapore from January."
                  className="bg-white border border-rule rounded-[12px] px-4 py-[13px] text-[15px] text-navy outline-none focus:border-cobalt transition-colors resize-vertical leading-[1.55]"
                  style={{ minHeight: 120 }}
                />
                <span className="text-[12px] text-mute">A sentence helps us match you faster.</span>
              </label>

              {/* File upload */}
              <div className="flex flex-col gap-2">
                <span className="text-[13px] font-semibold text-navy">
                  Your resume / CV <span className="text-cobalt">*</span>
                </span>
                <div
                  className="border-2 border-dashed border-rule rounded-[12px] bg-paper p-7 flex items-center gap-[18px] cursor-pointer hover:border-cobalt transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-[52px] h-[52px] rounded-[12px] bg-white border border-rule flex items-center justify-center shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#1d4ed8" strokeWidth="1.6" />
                      <path d="M14 2v6h6" stroke="#1d4ed8" strokeWidth="1.6" />
                      <path d="M12 18v-6m0 0l-3 3m3-3l3 3" stroke="#1d4ed8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-[16px] font-bold text-navy tracking-[-0.01em] truncate">
                      {file ? file.name : "Drop your resume here, or click to upload"}
                    </div>
                    <div className="text-[13px] text-mute mt-1">
                      {file
                        ? `${(file.size / 1024 / 1024).toFixed(1)} MB`
                        : "PDF / DOC / DOCX · Up to 10 MB · Stored securely"}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                    className="bg-navy text-white rounded-pill px-[18px] py-[11px] font-semibold text-[13.5px] hover:bg-navy-deep transition-colors shrink-0"
                  >
                    {file ? "Change" : "Choose file"}
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </div>
            </div>

            <div className="border-t border-rule mb-8" />

            {/* ── Section 03: Payment ── */}
            <div>
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-cobalt">Section 03</div>
              <h3
                className="font-display font-bold text-navy mt-1.5 mb-[18px]"
                style={{ fontSize: 28, letterSpacing: "-0.02em" }}
              >
                Submit & pay registration
              </h3>

              {error && (
                <div
                  className="mb-5 px-4 py-3 rounded-[12px] text-[14px] font-medium"
                  style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626" }}
                >
                  {error}
                </div>
              )}

              <div
                className="bg-navy text-white rounded-[18px] px-6 lg:px-8 py-7 grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-6 lg:gap-8 relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 110% 0%, rgba(59,130,246,0.35), transparent 50%)" }}
                />
                <div className="relative">
                  <div className="font-mono text-[11px] tracking-[0.2em] text-cobalt-soft uppercase">
                    One-time registration fee
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-display font-bold" style={{ fontSize: 48, letterSpacing: "-0.03em" }}>$3.99</span>
                    <span className="text-[14px] opacity-70">SGD</span>
                  </div>
                  <div className="text-[13.5px] leading-[1.55] text-white/80 mt-[10px] max-w-[420px]">
                  Covers profile setup, identity verification and administration. 
                  Your profile stays active and we will update you in 48 hours on your application.
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="relative bg-white text-navy rounded-pill font-bold text-[15px] hover:bg-ice transition-colors inline-flex items-center justify-center gap-[10px] disabled:opacity-60 w-full lg:w-auto"
                  style={{ padding: "18px 28px", boxShadow: "0 12px 24px -8px rgba(0,0,0,0.4)" }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>Pay with card &amp; submit application <span>→</span></>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3 mt-[18px] text-[12.5px] text-mute flex-wrap">
                <span className="inline-flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" stroke="#1d4ed8" strokeWidth="1.6" />
                  </svg>
                  Stripe-secured payment
                </span>
                <span>·</span>
                <span>SSL encrypted</span>
                <span>·</span>
                <span>No card details stored on our servers</span>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="bg-navy py-12 lg:py-16 px-5 sm:px-8 lg:px-11 text-[13.5px]" style={{ color: "rgba(255,255,255,0.7)" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 lg:gap-10">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-[10px]">
                <Image src="/le-logo.png" alt="Leading Edge" width={32} height={32} />
                <span className="font-display text-[20px] font-bold text-white tracking-[-0.02em]">
                  Leading-Edge<span className="text-cobalt-soft">.</span>
                </span>
              </div>
              <div className="mt-4 leading-[1.7]">60 Paya Lebar Road, #06-28 Paya Lebar Square, Singapore 409051.</div>
              <div className="mt-[14px] font-mono text-[11.5px] tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                EA LICENCE 12C6068 · PERSONAL EA R1108879
              </div>
            </div>
            <div>
              <div className="text-white font-semibold">Employers</div>
              <div className="mt-[14px] flex flex-col gap-2">
                <Link href="/contact"     className="hover:text-white transition-colors">How it works</Link>
                <Link href="/#industries" className="hover:text-white transition-colors">Industries</Link>
                <Link href="/contact"     className="hover:text-white transition-colors">Speak to consultant</Link>
              </div>
            </div>
            <div>
              <div className="text-white font-semibold">Workers</div>
              <div className="mt-[14px] flex flex-col gap-2">
                <Link href="/apply"       className="hover:text-white transition-colors">Apply now</Link>
                <Link href="/#industries" className="hover:text-white transition-colors">Job categories</Link>
                <Link href="/apply"       className="hover:text-white transition-colors">FAQ</Link>
              </div>
            </div>
            <div>
              <div className="text-white font-semibold">Reach us</div>
              <div className="mt-[14px] flex flex-col gap-2">
                <a href="tel:+6590026161" className="hover:text-white transition-colors">+65 9002 6161</a>
                <a href="https://wa.me/6590026161" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp same number</a>
                <a href="mailto:stleading@gmail.com" className="hover:text-white transition-colors">stleading@gmail.com</a>
                <span>Mon–Sat · 9–6</span>
              </div>
            </div>
          </div>
          <div
            className="border-t mt-8 lg:mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-2 text-[12px]"
            style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)" }}
          >
            <span>© {new Date().getFullYear()} Leading-Edge Consultancy Services Pte Ltd. All rights reserved.</span>
            <span>Made in Singapore</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
