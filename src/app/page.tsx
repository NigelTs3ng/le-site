"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/LanguageProvider";

const WHATSAPP_HIRE_URL =
  "https://wa.me/6596357734?text=" +
  encodeURIComponent(
    "Hi, I'm interested in hiring workers.\n\nCompany Name:\nType of Workers Needed:\nNumber of Workers:\n\nPlease advise, thank you."
  );

const TEAM_MEMBERS = [
  { name: "SIMON TSENG AH HUAT",                    role: "Key Appointment Holder", registrationNumber: "R1108879",  photoSrc: "/images/simon.png" },
  { name: "ALAN KWOK YU CHENG",                     role: "Other EA Personnel",     registrationNumber: "R1879975",  photoSrc: "/images/alan.png" },
  { name: "MAHENDRAN S/O RAMAN",                    role: "Other EA Personnel",     registrationNumber: "R1983012",  photoSrc: "/images/mahendran.png" },
  { name: "NIGEL TSENG ZIMING",                     role: "Other EA Personnel",     registrationNumber: "R1983433",  photoSrc: "/images/nigel.png" },
  { name: "ONG CHIN CHIN",                          role: "Other EA Personnel",     registrationNumber: "R1981221",  photoSrc: "/images/chinchin.png" },
  { name: "SOH KAY CHUN",                           role: "Other EA Personnel",     registrationNumber: "R1879976",  photoSrc: "/images/kaychun.png" },
  { name: "TAN SHIAW BENG GREGORY (CHEN SHAOMING)", role: "Other EA Personnel",     registrationNumber: "R1981542",  photoSrc: "/images/greg.png" },
  { name: "YEONG QIN WEN JOANNE (YANG QINWEN)",     role: "Other EA Personnel",     registrationNumber: "R1220916",  photoSrc: "/images/joanne.png" },
  { name: "BROSNAN NG KAR FAI",                     role: "Other EA Personnel",     registrationNumber: "R24120776", photoSrc: "/images/brosnan.png" },
  { name: "POH RUI ZHI",                            role: "Other EA Personnel",     registrationNumber: "R24120777", photoSrc: "/images/ruizhi.png" },
] as const;

const STATS = [
  { num: "10+",    label: "Years in Singapore" },
  { num: "0",      label: "MOM violations" },
  { num: "<48h",   label: "Avg. response time" },
  { num: "3,400+", label: "Placements made" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Tell us who you need",    body: "Send your headcount, role, work-pass type and start date over WhatsApp, phone or the contact form.",                       time: "TYPICALLY 30 MIN" },
  { step: "02", title: "We shortlist & screen",   body: "Within 48 hours you receive vetted profiles — work history verified, documents in order, ready to interview.",           time: "WITHIN 48 HOURS" },
  { step: "03", title: "We handle the paperwork", body: "Work-pass application, medicals, onboarding and arrival logistics. You sign, we run it.",                                 time: "1–3 WEEKS" },
];

const HOME_INDUSTRIES = [
  { key: "fnb",        title: "F&B Service",      blurb: "Servers, cooks, kitchen crew, baristas.",       img: "/images/sectors/f&b.png" },
  { key: "construct",  title: "Construction",      blurb: "Site labour, supervisors, technicians.",         img: "/images/sectors/construction.png" },
  { key: "care",       title: "Caregivers",        blurb: "Elderly care, nursing aides, healthcare.",       img: "/images/sectors/caregiver.png" },
  { key: "general",    title: "General Workers",   blurb: "Warehouse, logistics, flexible labour.",          img: "/images/sectors/general.png" },
  { key: "service",    title: "Service & Retail",  blurb: "Retail floor, hospitality, front-of-house.",     img: "/images/sectors/service.png" },
  { key: "production", title: "Production",        blurb: "Factory floor, assembly, manufacturing.",         img: "/images/sectors/production.png" },
  { key: "healthcare", title: "Healthcare",        blurb: "Medical staff, clinic support, nursing.",         img: "/images/sectors/healthcare.png" },
];

const INDUSTRY_LAYOUT = [
  { i: 0, col: "span 3", row: "span 2", bg: "#0b1f3a", dark: true },
  { i: 1, col: "span 3", row: "span 1", bg: "#1d4ed8", dark: true },
  { i: 2, col: "span 2", row: "span 1", bg: "#cdd9ec", dark: false },
  { i: 3, col: "span 1", row: "span 1", bg: "#e6ecf6", dark: false },
  { i: 4, col: "span 2", row: "span 2", bg: "#0b1f3a", dark: true },
  { i: 5, col: "span 2", row: "span 1", bg: "#cdd9ec", dark: false },
  { i: 6, col: "span 2", row: "span 1", bg: "#e6ecf6", dark: false },
] as const;

const MOBILE_INDUSTRY_LAYOUT = [
  { i: 0, col: "span 2", bg: "#0b1f3a", dark: true },
  { i: 1, col: "span 2", bg: "#1d4ed8", dark: true },
  { i: 2, col: "span 1", bg: "#cdd9ec", dark: false },
  { i: 3, col: "span 1", bg: "#e6ecf6", dark: false },
  { i: 4, col: "span 2", bg: "#0b1f3a", dark: true },
  { i: 5, col: "span 1", bg: "#cdd9ec", dark: false },
  { i: 6, col: "span 1", bg: "#e6ecf6", dark: false },
] as const;

const FAQ_ITEMS = [
  { q: "Are you licensed by the Ministry of Manpower?",    a: "Yes. Leading-Edge Consultancy Services holds MOM EA Licence No. 12C6068. Every personnel on our team is individually registered with MOM — registration numbers are listed on this page." },
  { q: "How quickly can you fill a role?",                  a: "Most employer enquiries receive a shortlist within 48 hours. For high-volume placements (F&B, construction, production) we routinely ship full crews within 7–14 days, paperwork included." },
  { q: "What is your compliance track record?",             a: "Ten years operating without a single MOM compliance violation. We screen every applicant, verify documentation in-house, and handle work-pass processing end to end." },
  { q: "Do you handle work-pass and permit applications?",  a: "Yes — Work Permit, S Pass, Employment Pass and renewals. We manage the entire submission, follow-up and documentation cycle so your HR team doesn't have to." },
  { q: "Which nationalities do you place?",                 a: "Bangladesh, India, China, Malaysia, Myanmar, Vietnam, the Philippines and Indonesia — subject to MOM source-country policy for each pass type." },
];

const TRUST_ITEMS = [
  { num: "0",    unit: "violations", body: "Ten years operating with zero MOM compliance violations on record." },
  { num: "<48h", unit: "response",   body: "Average time from employer brief to first vetted shortlist." },
  { num: "10y+", unit: "tenure",     body: "Continuously licensed in Singapore since 2015 under Simon Tseng." },
];

export default function Home() {
  const { t } = useI18n();
  const [faqOpen, setFaqOpen] = useState<number>(0);

  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="bg-paper px-5 sm:px-8 lg:px-11 relative overflow-hidden">
        <div
          className="absolute font-display font-bold text-ice leading-[0.8] select-none pointer-events-none"
          style={{ right: -40, top: 40, fontSize: "clamp(140px,30vw,520px)", letterSpacing: "-0.06em" }}
          aria-hidden="true"
        >
          LE.
        </div>

        <div className="max-w-[1200px] mx-auto py-10 lg:py-[72px] relative">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-[10px] bg-white border border-rule rounded-pill pl-2 pr-[14px] py-2 text-[13px] font-medium text-navy">
            <span className="bg-[#dcfce7] text-[#166534] px-2 py-0.5 rounded-pill text-[11px] font-semibold tracking-[0.04em] uppercase">
              ● Live
            </span>
            Now hiring across 7 sectors · Avg. shortlist in 41h
          </div>

          {/* H1 */}
          <h1
            className="font-display font-bold text-navy mt-8"
            style={{ fontSize: "clamp(44px,10vw,132px)", letterSpacing: "-0.04em", lineHeight: 0.92 }}
          >
            The hiring desk<br />
            Singapore{" "}
            <em className="text-cobalt not-italic font-medium">actually trusts</em>.
          </h1>

          {/* Body + Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 mt-10 lg:mt-12 items-start">
            <p className="text-[17px] lg:text-[19px] leading-[1.55] text-mute m-0 font-normal">
              A licensed Singapore manpower agency since 2015. We place vetted workers across
              F&amp;B, construction, caregiving, domestic, production and service —
              with a clean MOM record and a 48-hour response promise.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`p-4 lg:p-5 rounded-[14px] ${
                    i === 0 ? "bg-cobalt text-white" :
                    i === 1 ? "bg-navy text-white" :
                    "bg-white text-navy border border-rule"
                  }`}
                >
                  <div
                    className="font-display font-bold leading-none"
                    style={{ fontSize: "clamp(28px,4vw,44px)", letterSpacing: "-0.03em" }}
                  >
                    {s.num}
                  </div>
                  <div className={`text-[11px] lg:text-[12.5px] mt-2 tracking-[0.02em] ${i < 2 ? "opacity-80" : "opacity-65"}`}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dual CTA cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 lg:mt-14">
            <div className="bg-navy text-white p-6 lg:p-8 pb-7 rounded-[20px] relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 90% 20%, rgba(59,130,246,0.4), transparent 50%)" }} />
              <div className="relative">
                <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-cobalt-soft">
                  {t("home_employer_eyebrow")}
                </div>
                <div
                  className="font-display font-bold mt-[14px] leading-[1.05]"
                  style={{ fontSize: "clamp(24px,3vw,36px)", letterSpacing: "-0.02em" }}
                >
                  {t("home_employer_h")}
                </div>
                <div className="text-[14px] leading-[1.55] text-white/80 mt-[14px]">
                  Send your role, headcount and start date. We come back with vetted profiles, work-pass status and quota check.
                </div>
                <Link
                  href={WHATSAPP_HIRE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-[10px] bg-white text-navy rounded-pill font-semibold text-[13px] hover:bg-ice transition-colors px-5 py-3"
                >
                  {t("home_employer_cta")}
                </Link>
              </div>
            </div>

            <div className="bg-white text-navy p-6 lg:p-8 pb-7 rounded-[20px] border border-rule">
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-cobalt">
                {t("home_worker_eyebrow")}
              </div>
              <div
                className="font-display font-bold mt-[14px] leading-[1.05]"
                style={{ fontSize: "clamp(24px,3vw,36px)", letterSpacing: "-0.02em" }}
              >
                {t("home_worker_h")}
              </div>
              <div className="text-[14px] leading-[1.55] text-mute mt-[14px]">
                Free to apply. We charge employers, never workers. Genuine placements only.
              </div>
              <Link
                href="/apply"
                className="mt-6 inline-flex items-center gap-[10px] bg-cobalt text-white rounded-pill font-semibold text-[13px] hover:bg-cobalt-light transition-colors px-5 py-3"
              >
                {t("home_worker_cta")}
              </Link>
            </div>
          </div>

          {/* Ticker */}
          <div className="mt-12 lg:mt-[72px] py-[18px] border-t border-b border-rule flex items-center gap-6 lg:gap-8 text-[12px] lg:text-[13px] text-mute font-mono tracking-[0.04em] overflow-x-auto">
            <span className="text-cobalt font-semibold shrink-0">● LATEST</span>
            <span className="shrink-0">F&amp;B · 12 servers placed · Marina Bay group</span>
            <span className="opacity-40 shrink-0">/</span>
            <span className="shrink-0">Construction · 8 crew · Tuas worksite</span>
            <span className="opacity-40 shrink-0">/</span>
            <span className="shrink-0">Caregivers · 4 nursing aides · Bukit Timah</span>
            <span className="opacity-40 shrink-0">/</span>
            <span className="shrink-0">Production · 22 line workers · Jurong</span>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-[120px] px-5 sm:px-8 lg:px-11">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-10 lg:mb-16">
            <div>
              <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-cobalt">
                For employers / 03 steps
              </div>
              <h2
                className="font-display font-bold text-navy mt-4 lg:mt-5"
                style={{ fontSize: "clamp(40px,7vw,80px)", letterSpacing: "-0.03em", lineHeight: 0.96 }}
              >
                {t("home_how_h")}
              </h2>
            </div>
            <div className="text-[14px] text-mute max-w-[320px] leading-[1.6] sm:text-right">
              One brief in. A vetted shortlist back. Paperwork off your plate.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {HOW_IT_WORKS.map((s, i) => (
              <div
                key={s.step}
                className={`p-7 lg:p-9 rounded-[20px] min-h-[260px] lg:min-h-[360px] flex flex-col relative overflow-hidden ${
                  i === 0 ? "bg-cobalt text-white" :
                  i === 1 ? "bg-navy text-white" :
                  "bg-paper text-navy"
                }`}
              >
                <div
                  className="absolute font-display font-bold leading-none"
                  style={{ right: -10, bottom: -50, fontSize: 200, letterSpacing: "-0.05em", opacity: i < 2 ? 0.12 : 0.06 }}
                  aria-hidden="true"
                >
                  {s.step}
                </div>
                <div className="relative">
                  <div className={`font-mono text-[12px] tracking-[0.2em] ${i < 2 ? "opacity-70" : "opacity-60"}`}>
                    STEP {s.step}
                  </div>
                  <div
                    className="font-display font-bold mt-6 lg:mt-8 leading-[1.1]"
                    style={{ fontSize: "clamp(22px,2.5vw,32px)", letterSpacing: "-0.02em" }}
                  >
                    {s.title}
                  </div>
                  <div className={`text-[13.5px] leading-[1.6] mt-3 lg:mt-4 max-w-[280px] ${i < 2 ? "opacity-85" : "opacity-70"}`}>
                    {s.body}
                  </div>
                  <div className={`mt-5 lg:mt-7 text-[12.5px] font-mono tracking-[0.12em] ${i < 2 ? "opacity-75" : "opacity-60"}`}>
                    → {s.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────────── */}
      <section id="industries" className="bg-paper py-16 lg:py-[120px] px-5 sm:px-8 lg:px-11">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8 lg:mb-14">
            <h2
              className="font-display font-bold text-navy m-0"
              style={{ fontSize: "clamp(36px,7vw,80px)", letterSpacing: "-0.03em", lineHeight: 0.96 }}
            >
              {t("home_ind_h")}
            </h2>
            <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-mute">
              What we place / 07 industries
            </div>
          </div>

          {/* Desktop mosaic */}
          <div
            className="hidden lg:grid"
            style={{ gridTemplateColumns: "repeat(6, 1fr)", gridAutoRows: "180px", gap: 12 }}
          >
            {INDUSTRY_LAYOUT.map(({ i, col, row }) => {
              const ind = HOME_INDUSTRIES[i];
              return (
                <div
                  key={ind.key}
                  style={{
                    gridColumn: col,
                    gridRow: row,
                    borderRadius: 16,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* Photo */}
                  <Image
                    src={ind.img}
                    alt={ind.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1200px) 50vw, 400px"
                  />
                  {/* Gradient overlay — darker at bottom where text sits */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(7,20,40,0.92) 0%, rgba(7,20,40,0.45) 55%, rgba(0,0,0,0.1) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Text */}
                  <div
                    style={{
                      position: "relative",
                      padding: 22,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      color: "#fff",
                    }}
                  >
                    <div className="font-mono text-[11px] tracking-[0.2em] uppercase opacity-60">
                      0{i + 1} / {HOME_INDUSTRIES.length}
                    </div>
                    <div>
                      <div className="font-display font-bold leading-none" style={{ fontSize: 28, letterSpacing: "-0.02em" }}>
                        {ind.title}
                      </div>
                      <div className="text-[13px] leading-[1.5] mt-1.5 opacity-80 max-w-[260px]">
                        {ind.blurb}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile/tablet grid */}
          <div
            className="lg:hidden grid gap-3"
            style={{ gridTemplateColumns: "repeat(2, 1fr)", gridAutoRows: "140px" }}
          >
            {MOBILE_INDUSTRY_LAYOUT.map(({ i, col }) => {
              const ind = HOME_INDUSTRIES[i];
              return (
                <div
                  key={ind.key}
                  style={{
                    gridColumn: col,
                    borderRadius: 14,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* Photo */}
                  <Image
                    src={ind.img}
                    alt={ind.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                  {/* Gradient overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(7,20,40,0.92) 0%, rgba(7,20,40,0.4) 55%, rgba(0,0,0,0.08) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Text */}
                  <div
                    style={{
                      position: "relative",
                      padding: 14,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      color: "#fff",
                    }}
                  >
                    <div className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-60">
                      0{i + 1}
                    </div>
                    <div
                      className="font-display font-bold leading-none"
                      style={{ fontSize: col === "span 2" ? 22 : 17, letterSpacing: "-0.02em" }}
                    >
                      {ind.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TRUST ────────────────────────────────────────────────── */}
      <section className="bg-navy text-white py-16 lg:py-[120px] px-5 sm:px-8 lg:px-11 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.25), transparent 50%)" }} />
        <div className="max-w-[1200px] mx-auto relative">
          <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-cobalt-soft">
            {t("home_trust_eyebrow")}
          </div>
          <h2
            className="font-display font-bold mt-5 mb-10 lg:mb-14 max-w-[900px]"
            style={{ fontSize: "clamp(36px,7vw,80px)", letterSpacing: "-0.03em", lineHeight: 0.96 }}
          >
            A agency with urgency, run with{" "}
            <span className="text-cobalt-soft">institutional</span> discipline.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
            {TRUST_ITEMS.map((it) => (
              <div key={it.unit} className="border-t border-white/20 pt-7 pb-7 sm:pb-0 pr-0 sm:pr-8">
                <div className="flex items-baseline gap-3">
                  <div
                    className="font-display font-bold leading-none"
                    style={{ fontSize: "clamp(56px,7vw,88px)", letterSpacing: "-0.04em" }}
                  >
                    {it.num}
                  </div>
                  <div className="font-mono text-[12px] tracking-[0.16em] uppercase text-white/55">
                    {it.unit}
                  </div>
                </div>
                <div className="mt-[18px] text-[15px] leading-[1.6] text-white/80 max-w-[320px]">
                  {it.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-[120px] px-5 sm:px-8 lg:px-11">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10 lg:mb-14">
            <div>
              <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-cobalt">
                {t("home_team_eyebrow")}
              </div>
              <h2
                className="font-display font-bold text-navy mt-4 lg:mt-5"
                style={{ fontSize: "clamp(36px,7vw,80px)", letterSpacing: "-0.03em", lineHeight: 0.96 }}
              >
                {t("home_team_h")}
              </h2>
            </div>
            <div className="text-[13px] lg:text-[14px] text-mute max-w-[300px] sm:text-right leading-[1.5]">
              Every consultant on this site is individually registered with the Singapore Ministry of Manpower.
            </div>
          </div>

          {/* Desktop mosaic */}
          <div className="hidden lg:grid grid-cols-5 gap-3">
            {TEAM_MEMBERS.map((m, i) => (
              <div
                key={m.registrationNumber}
                style={{ gridColumn: i === 0 ? "span 2" : undefined, gridRow: i === 0 ? "span 2" : undefined }}
                className={`rounded-card overflow-hidden flex flex-col ${i === 0 ? "bg-cobalt text-white" : "bg-paper text-navy"}`}
              >
                <div className={`relative ${i === 0 ? "aspect-[4/3]" : "aspect-square"}`}>
                  <Image
                    src={m.photoSrc}
                    alt={m.name}
                    fill
                    sizes={i === 0 ? "400px" : "200px"}
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
                <div className={i === 0 ? "p-6 pb-7" : "p-4 pb-[18px]"}>
                  <div
                    className="font-display font-bold leading-[1.1]"
                    style={{ fontSize: i === 0 ? 26 : 15, letterSpacing: "-0.02em" }}
                  >
                    {m.name}
                  </div>
                  <div className={`mt-1.5 opacity-70 ${i === 0 ? "text-[13.5px]" : "text-[12px]"}`}>
                    {m.role}
                  </div>
                  <div className={`font-mono text-[11.5px] mt-1.5 tracking-[0.04em] ${i === 0 ? "text-cobalt-soft" : "text-cobalt"}`}>
                    MOM · {m.registrationNumber}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:hidden">
            {TEAM_MEMBERS.map((m, i) => (
              <div
                key={m.registrationNumber}
                className={`rounded-card overflow-hidden flex flex-col ${i === 0 ? "bg-cobalt text-white" : "bg-paper text-navy"}`}
              >
                <div className="relative aspect-square">
                  <Image
                    src={m.photoSrc}
                    alt={m.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
                <div className="p-3">
                  <div className="font-display font-bold text-[12px] leading-[1.2]" style={{ letterSpacing: "-0.01em" }}>
                    {m.name}
                  </div>
                  <div className={`font-mono text-[10px] mt-1.5 tracking-[0.04em] ${i === 0 ? "text-cobalt-soft" : "text-cobalt"}`}>
                    MOM · {m.registrationNumber}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="bg-paper py-16 lg:py-[120px] px-5 sm:px-8 lg:px-11">
        <div
          className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-14 items-start"
        >
          {/* Sticky left column */}
          <div className="lg:sticky lg:top-10">
            <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-cobalt">FAQ</div>
            <h2
              className="font-display font-bold text-navy mt-4 lg:mt-5"
              style={{ fontSize: "clamp(36px,6vw,64px)", letterSpacing: "-0.03em", lineHeight: 0.96 }}
            >
              {t("home_faq_h")}
            </h2>
            <div className="mt-5 text-[14px] text-mute leading-[1.6]">
              Don&apos;t see your question? WhatsApp us — replies usually within the hour, Mon–Sat.
            </div>
            <Link
              href={WHATSAPP_HIRE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-[10px] bg-cobalt text-white rounded-pill font-semibold text-[13.5px] hover:bg-cobalt-light transition-colors px-5 py-3"
            >
              Ask on WhatsApp
            </Link>
          </div>

          {/* Accordion */}
          <div>
            {FAQ_ITEMS.map((f, i) => (
              <div
                key={i}
                className={`rounded-card mb-[10px] overflow-hidden border transition-colors ${
                  faqOpen === i ? "bg-navy border-transparent" : "bg-white border-rule"
                }`}
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}
                  className={`w-full text-left px-5 lg:px-7 py-5 lg:py-[22px] bg-transparent border-none cursor-pointer flex items-center justify-between gap-4 font-display text-[17px] lg:text-[20px] font-semibold tracking-[-0.01em] ${
                    faqOpen === i ? "text-white" : "text-navy"
                  }`}
                >
                  <span>{f.q}</span>
                  <span
                    className="font-mono text-[22px] opacity-80 transition-transform duration-200 shrink-0"
                    style={{ transform: faqOpen === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>
                {faqOpen === i && (
                  <div className="px-5 lg:px-7 pb-6 lg:pb-7 text-[14px] lg:text-[15px] leading-[1.65] text-white/80 max-w-[760px]">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING ──────────────────────────────────────────────── */}
      <section className="bg-cobalt text-white py-16 lg:py-[120px] px-5 sm:px-8 lg:px-11 relative overflow-hidden">
        <div
          className="absolute font-display font-bold select-none pointer-events-none"
          style={{ left: -60, bottom: -180, fontSize: "clamp(120px,35vw,480px)", color: "rgba(255,255,255,0.07)", letterSpacing: "-0.06em", lineHeight: 0.8 }}
          aria-hidden="true"
        >
          Hire.
        </div>
        <div className="max-w-[1200px] mx-auto relative">
          <h2
            className="font-display font-bold m-0 max-w-[980px]"
            style={{ fontSize: "clamp(36px,8vw,96px)", letterSpacing: "-0.03em", lineHeight: 0.96 }}
          >
            {t("home_closing_h")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10 lg:mt-14 max-w-[880px]">
            <Link
              href={WHATSAPP_HIRE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-cobalt px-6 py-5 font-bold text-[15px] rounded-[14px] text-left flex sm:flex-col flex-row items-center sm:items-start gap-2 sm:gap-1 hover:bg-ice transition-colors"
            >
              <span className="font-mono text-[11px] tracking-[0.16em] opacity-70">EMPLOYERS</span>
              <span>Speak to a consultant →</span>
            </Link>
            <Link
              href="/apply"
              className="bg-navy text-white px-6 py-5 font-bold text-[15px] rounded-[14px] text-left flex sm:flex-col flex-row items-center sm:items-start gap-2 sm:gap-1 hover:opacity-90 transition-opacity"
            >
              <span className="font-mono text-[11px] tracking-[0.16em] opacity-70">WORKERS</span>
              <span>Apply for a job →</span>
            </Link>
            <Link
              href="https://wa.me/6590026161"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white border px-6 py-5 font-bold text-[15px] rounded-[14px] text-left flex sm:flex-col flex-row items-center sm:items-start gap-2 sm:gap-1 hover:opacity-90 transition-opacity"
              style={{ background: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.25)" }}
            >
              <span className="font-mono text-[11px] tracking-[0.16em] opacity-70">WHATSAPP</span>
              <span>+65 9002 6161 →</span>
            </Link>
          </div>
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
              <div className="mt-4 leading-[1.7]">
                60 Paya Lebar Road, #06-28 Paya Lebar Square, Singapore 409051.
              </div>
              <div className="mt-[14px] font-mono text-[11.5px] tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                EA LICENCE 12C6068 · PERSONAL EA R1108879
              </div>
            </div>
            <div>
              <div className="text-white font-semibold">Employers</div>
              <div className="mt-[14px] flex flex-col gap-2">
                <Link href="/contact"      className="hover:text-white transition-colors">How it works</Link>
                <Link href="/#industries"  className="hover:text-white transition-colors">Industries</Link>
                <Link href="/contact"      className="hover:text-white transition-colors">Speak to consultant</Link>
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
                <a href="tel:+6590026161"                          className="hover:text-white transition-colors">+65 9002 6161</a>
                <a href="https://wa.me/6590026161" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp same number</a>
                <a href="mailto:stleading@gmail.com"               className="hover:text-white transition-colors">stleading@gmail.com</a>
                <span>Mon–Sat · 9–6</span>
              </div>
            </div>
          </div>
          <div className="border-t mt-10 lg:mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-2 text-[12px]" style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)" }}>
            <span>© {new Date().getFullYear()} Leading-Edge Consultancy Services Pte Ltd. All rights reserved.</span>
            <span>Made in Singapore</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
