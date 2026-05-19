"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "./LanguageProvider";

const NAV_LINKS = [
  { key: "nav_employers", href: "/contact" },
  { key: "nav_workers",   href: "/apply" },
  { key: "nav_industries", href: "/#industries" },
  { key: "nav_team",      href: "/about#team" },
  { key: "nav_about",     href: "/about" },
  { key: "nav_contact",   href: "/contact" },
] as const;

export default function Navigation() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── DESKTOP NAV ─────────────────────────────── */}
      <nav className="hidden lg:flex items-center justify-between bg-white border-b border-rule px-11 py-[22px] relative z-20">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/le-logo.png" alt="Leading Edge" width={36} height={36} />
          <span className="font-display text-[19px] font-bold text-navy tracking-tight">
            Leading-Edge<span className="text-cobalt">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {NAV_LINKS.map(({ key, href }, i) => (
            <Link
              key={key}
              href={href}
              className={`px-[14px] py-2 rounded-pill text-[13.5px] font-medium transition-colors ${
                i === 0
                  ? "bg-navy text-white hover:bg-navy-deep"
                  : "text-navy hover:bg-paper"
              }`}
            >
              {t(key)}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
            aria-label="Switch language"
            className="ml-2 px-3 py-2 rounded-pill text-[12.5px] font-semibold text-mute border border-rule hover:bg-paper transition-colors"
          >
            {lang === "en" ? "EN · 中文" : "中文 · EN"}
          </button>

          <Link
            href="/contact"
            className="ml-2 bg-cobalt text-white px-[18px] py-[10px] rounded-pill font-semibold text-[13.5px] hover:bg-cobalt-light transition-colors"
          >
            {t("nav_hire_cta")}
          </Link>
        </div>
      </nav>

      {/* ── MOBILE NAV ──────────────────────────────── */}
      <nav
        className="lg:hidden flex items-center justify-between bg-white/90 border-b border-rule px-5 py-[10px] sticky top-0 z-20"
        style={{ backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" } as React.CSSProperties}
      >
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image src="/le-logo.png" alt="Leading Edge" width={28} height={28} />
          <span className="font-display text-[16px] font-bold text-navy">
            Leading-Edge<span className="text-cobalt">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
            aria-label="Switch language"
            className="font-mono text-[11px] font-semibold text-mute border border-rule rounded-pill px-3 py-1.5"
          >
            {lang === "en" ? "EN" : "中文"}
          </button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="w-9 h-9 rounded-[10px] bg-navy flex items-center justify-center"
          >
            {open ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M1 1h14M1 6h14M1 11h14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ───────────────────────────── */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-10 bg-navy text-white pt-20 px-6 flex flex-col" style={{ top: 0 }}>
          <div className="flex flex-col gap-1 mt-8">
            {NAV_LINKS.map(({ key, href }, i) => (
              <Link
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                className={`font-display text-[28px] font-bold tracking-tight py-3 border-b border-white/10 ${
                  i === 0 ? "text-cobalt-soft" : "text-white"
                }`}
              >
                {t(key)}
              </Link>
            ))}
          </div>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-8 bg-cobalt text-white font-semibold text-[15px] rounded-pill px-6 py-4 text-center hover:bg-cobalt-light transition-colors"
          >
            {t("nav_hire_cta")}
          </Link>
        </div>
      )}
    </>
  );
}
