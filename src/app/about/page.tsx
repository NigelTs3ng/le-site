import Image from "next/image";
import Link from "next/link";

const WHATSAPP_URL = "https://wa.me/6590026161";
const PHONE_URL = "tel:+6590026161";
const EMAIL = "stleading@gmail.com";

const TEAM_MEMBERS = [
  { name: "SIMON TSENG AH HUAT",                    role: "Key Appointment Holder", reg: "R1108879",  photo: "/images/simon.png" },
  { name: "ALAN KWOK YU CHENG",                     role: "Other EA Personnel",     reg: "R1879975",  photo: "/images/alan.png" },
  { name: "MAHENDRAN S/O RAMAN",                    role: "Other EA Personnel",     reg: "R1983012",  photo: "/images/mahendran.png" },
  { name: "NIGEL TSENG ZIMING",                     role: "Other EA Personnel",     reg: "R1983433",  photo: "/images/nigel.png" },
  { name: "ONG CHIN CHIN",                          role: "Other EA Personnel",     reg: "R1981221",  photo: "/images/chinchin.png" },
  { name: "SOH KAY CHUN",                           role: "Other EA Personnel",     reg: "R1879976",  photo: "/images/kaychun.png" },
  { name: "TAN SHIAW BENG GREGORY",                 role: "Other EA Personnel",     reg: "R1981542",  photo: "/images/greg.png" },
  { name: "YEONG QIN WEN JOANNE",                   role: "Other EA Personnel",     reg: "R1220916",  photo: "/images/joanne.png" },
  { name: "BROSNAN NG KAR FAI",                     role: "Other EA Personnel",     reg: "R24120776", photo: "/images/brosnan.png" },
  { name: "POH RUI ZHI",                            role: "Other EA Personnel",     reg: "R24120777", photo: "/images/ruizhi.png" },
];

const TRUST_STATS = [
  { num: "0",    unit: "violations", body: "Ten years operating with zero MOM compliance violations on record." },
  { num: "<48h", unit: "response",   body: "Average time from employer brief to first vetted shortlist." },
  { num: "10y+", unit: "tenure",     body: "Continuously licensed in Singapore since 2015 under Simon Tseng." },
];

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen font-sans text-navy">

      {/* Hero */}
      <section className="bg-paper px-6 lg:px-11 relative overflow-hidden">
        <div className="pointer-events-none select-none absolute right-[-40px] top-[20px]">
          <span
            className="font-display font-bold text-ice leading-none block"
            style={{ fontSize: "clamp(160px, 30vw, 360px)", letterSpacing: "-0.06em" }}
          >
            About.
          </span>
        </div>
        <div className="max-w-screen-xl mx-auto py-16 lg:py-20 relative">
          <div
            className="inline-flex items-center gap-2 bg-white border border-rule rounded-pill px-3 py-2 text-[13px] font-medium mb-8"
            style={{ paddingLeft: "8px", paddingRight: "14px" }}
          >
            <span className="bg-[#dcfce7] text-[#166534] px-2 py-0.5 rounded-pill text-[11px] font-semibold uppercase tracking-wider">
              ● Licensed
            </span>
            EA Licence 12C6068 · MOM registered since 2015
          </div>
          <h1
            className="font-display font-bold text-navy leading-none"
            style={{ fontSize: "clamp(56px, 10vw, 112px)", letterSpacing: "-0.04em", marginBottom: "32px" }}
          >
            Singapore&apos;s hiring desk,<br />
            <span className="text-cobalt" style={{ fontStyle: "italic", fontWeight: 500 }}>built on trust</span>.
          </h1>
          <p className="text-mute text-lg leading-relaxed max-w-xl">
            Leading-Edge Consultancy Services is a licensed Singapore employment agency placing vetted workers across F&amp;B, construction, caregiving, domestic, production and service since 2015.
          </p>
        </div>
      </section>

      {/* Company info */}
      <section className="px-6 lg:px-11 py-16 lg:py-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <div className="font-mono text-[11px] font-semibold tracking-[0.22em] text-cobalt uppercase mb-5">
                Who we are
              </div>
              <h2
                className="font-display font-bold text-navy leading-none mb-6"
                style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.03em" }}
              >
                A agency with urgency, run with institutional discipline.
              </h2>
              <div className="flex flex-col gap-4 text-mute text-[15px] leading-relaxed">
                <p>
                  Founded by Simon Tseng Ah Huat, Leading-Edge has built a reputation for clean compliance, fast deployment, and honest dealing — with employers and workers alike.
                </p>
                <p>
                  We maintain a ready pool of pre-screened candidates across seven sectors and handle everything from sourcing and screening to work pass applications and coordination.
                </p>
                <p>
                  For non-Malaysian foreign workers, employers pay zero placement fees. All application and miscellaneous fees are borne by us.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: "Company name", value: "Leading-Edge Consultancy Services Pte Ltd" },
                { label: "EA Licence", value: "12C6068" },
                { label: "Key Appointment Holder", value: "Simon Tseng Ah Huat · R1108879" },
                { label: "Registered since", value: "2015" },
                { label: "Address", value: "60 Paya Lebar Road, #06-28 Paya Lebar Square, Singapore 409051" },
                { label: "Phone / WhatsApp", value: "+65 9002 6161" },
                { label: "Email", value: EMAIL },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4 border-b border-rule pb-4">
                  <div className="font-mono text-[11px] tracking-wider text-mute uppercase w-44 flex-shrink-0 pt-0.5">{label}</div>
                  <div className="text-sm font-medium text-navy">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust stats */}
      <section className="bg-navy text-white px-6 lg:px-11 py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.25), transparent 50%)" }} />
        <div className="max-w-screen-xl mx-auto relative">
          <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-cobalt-soft mb-5">
            Why employers stay
          </div>
          <h2
            className="font-display font-bold leading-none mb-14"
            style={{ fontSize: "clamp(40px, 7vw, 80px)", letterSpacing: "-0.03em", maxWidth: "900px" }}
          >
            A agency with urgency, run with{" "}
            <span className="text-cobalt-soft" style={{ fontStyle: "italic" }}>institutional</span>{" "}
            discipline.
          </h2>
          <div className="grid sm:grid-cols-3 gap-0">
            {TRUST_STATS.map(({ num, unit, body }) => (
              <div key={unit} className="border-t border-white/20 pt-7 pr-8">
                <div className="flex items-baseline gap-3 mb-4">
                  <span
                    className="font-display font-bold text-white"
                    style={{ fontSize: "clamp(56px, 8vw, 88px)", letterSpacing: "-0.04em", lineHeight: 1 }}
                  >
                    {num}
                  </span>
                  <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-white/55">{unit}</span>
                </div>
                <p className="text-[15px] leading-relaxed text-white/78">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-white px-6 lg:px-11 py-16 lg:py-24">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-12 lg:mb-16">
            <div>
              <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-cobalt mb-4">
                Our consultants
              </div>
              <h2
                className="font-display font-bold text-navy leading-none"
                style={{ fontSize: "clamp(40px, 7vw, 80px)", letterSpacing: "-0.03em" }}
              >
                All ten,<br />all registered.
              </h2>
            </div>
            <p className="text-mute text-sm leading-relaxed max-w-xs lg:text-right">
              Every consultant is individually registered with the Singapore Ministry of Manpower.
            </p>
          </div>

          {/* Desktop mosaic (lg+) */}
          <div
            className="hidden lg:grid"
            style={{ gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}
          >
            {TEAM_MEMBERS.map((m, i) => (
              <div
                key={m.reg}
                className="rounded-card overflow-hidden flex flex-col"
                style={{
                  gridColumn: i === 0 ? "span 2" : "span 1",
                  gridRow: i === 0 ? "span 2" : "span 1",
                  background: i === 0 ? "#1d4ed8" : "#f4f6fb",
                  color: i === 0 ? "#fff" : "#0b1f3a",
                }}
              >
                <div className="relative" style={{ aspectRatio: i === 0 ? "4/3" : "1/1" }}>
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    className="object-cover"
                    sizes={i === 0 ? "(max-width: 1200px) 40vw, 480px" : "(max-width: 1200px) 20vw, 240px"}
                  />
                </div>
                <div style={{ padding: i === 0 ? "24px 26px 26px" : "16px 18px 18px" }}>
                  <div
                    className="font-display font-bold"
                    style={{ fontSize: i === 0 ? 22 : 13, letterSpacing: "-0.02em", lineHeight: 1.15 }}
                  >
                    {m.name}
                  </div>
                  <div style={{ fontSize: i === 0 ? 13 : 11.5, opacity: 0.7, marginTop: 4 }}>{m.role}</div>
                  <div
                    className="font-mono"
                    style={{ fontSize: 11, marginTop: 6, color: i === 0 ? "#9ec1ff" : "#1d4ed8", letterSpacing: "0.04em" }}
                  >
                    MOM · {m.reg}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile list */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:hidden">
            {TEAM_MEMBERS.map((m, i) => (
              <div
                key={m.reg}
                className="rounded-card overflow-hidden flex flex-col"
                style={{ background: i === 0 ? "#1d4ed8" : "#f4f6fb", color: i === 0 ? "#fff" : "#0b1f3a" }}
              >
                <div className="relative" style={{ aspectRatio: "1/1" }}>
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
                <div className="p-3">
                  <div className="font-display font-bold text-[12px]" style={{ letterSpacing: "-0.01em", lineHeight: 1.2 }}>{m.name}</div>
                  <div className="font-mono text-[10px] mt-1.5" style={{ color: i === 0 ? "#9ec1ff" : "#1d4ed8" }}>
                    MOM · {m.reg}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-cobalt text-white px-6 lg:px-11 py-20 relative overflow-hidden">
        <div className="pointer-events-none select-none absolute left-[-60px] bottom-[-180px]">
          <span
            className="font-display font-bold block"
            style={{ fontSize: "clamp(160px, 35vw, 480px)", letterSpacing: "-0.06em", color: "rgba(255,255,255,0.07)", lineHeight: 0.8 }}
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
