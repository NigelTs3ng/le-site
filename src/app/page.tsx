"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/LanguageProvider";

const PRIMARY_BLUE = "#2563a6";
const LIGHT_BLUE = "#eaf2fb";
const WHATSAPP_HIRE_URL =
  "https://wa.me/6596357734?text=" +
  encodeURIComponent(
    "Hi, I’m interested in hiring workers.\n\nCompany Name:\nType of Workers Needed:\nNumber of Workers:\n\nPlease advise, thank you."
  );

const TEAM_MEMBERS = [
  {
    name: "SIMON TSENG AH HUAT",
    role: "Key Appointment Holder",
    registrationNumber: "R1108879",
    photoSrc: "/images/simon.png",
  },
  {
    name: "ALAN KWOK YU CHENG",
    role: "Other EA Personnel",
    registrationNumber: "R1879975",
    photoSrc: "/images/alan.png",
  },
  {
    name: "MAHENDRAN S/O RAMAN",
    role: "Other EA Personnel",
    registrationNumber: "R1983012",
    photoSrc: "/images/mahendran.png",
  },
  {
    name: "NIGEL TSENG ZIMING",
    role: "Other EA Personnel",
    registrationNumber: "R1983433",
    photoSrc: "/images/nigel.png",
  },
  {
    name: "ONG CHIN CHIN",
    role: "Other EA Personnel",
    registrationNumber: "R1981221",
    photoSrc: "/images/chinchin.png",
  },
  {
    name: "SOH KAY CHUN",
    role: "Other EA Personnel",
    registrationNumber: "R1879976",
    photoSrc: "/images/kaychun.png",
  },
  {
    name: "TAN SHIAW BENG GREGORY (CHEN SHAOMING)",
    role: "Other EA Personnel",
    registrationNumber: "R1981542",
    photoSrc: "/images/greg.png",
  },
  {
    name: "YEONG QIN WEN JOANNE (YANG QINWEN)",
    role: "Other EA Personnel",
    registrationNumber: "R1220916",
    photoSrc: "/images/joanne.png",
  },
  {
    name: "BROSNAN NG KAR FAI",
    role: "Other EA Personnel",
    registrationNumber: "R24120776",
    photoSrc: "/images/brosnan.png",
  },
  {
    name: "POH RUI ZHI",
    role: "Other EA Personnel",
    registrationNumber: "R24120777",
    photoSrc: "/images/ruizhi.png",
  },
] as const;

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      {/* Hero Section */}
      <section
        className="w-full flex flex-col items-center justify-center text-center py-16 px-4"
        style={{
          background: PRIMARY_BLUE,
        }}
      >
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-3">
            <Image src="/le-logo.png" alt="Logo" width={90} height={90} />
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white" style={{ letterSpacing: "0.01em" }}>LEADING-EDGE</h1>
          <div className="text-lg sm:text-xl font-medium mt-2 mb-4 text-white" style={{ letterSpacing: "0.04em" }}>
            {t("home_hero_subtitle")}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link
            href="/contact"
            className="px-7 py-3 rounded-full font-semibold shadow-md text-white bg-[#2563a6] hover:bg-[#17406b] transition border-2 border-[#2563a6] text-lg"
          >
            {t("home_cta_hiring")}
          </Link>
          <Link
            href="/apply"
            className="px-7 py-3 rounded-full font-semibold shadow-md text-[#2563a6] bg-white hover:bg-[#eaf2fb] transition border-2 border-[#2563a6] text-lg"
          >
            {t("home_cta_work")}
          </Link>
        </div>
      </section>

      {/* Employers Section */}
      <section className="py-12 px-4 w-full flex justify-center" style={{ background: LIGHT_BLUE }}>
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-8 border border-blue-100">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: PRIMARY_BLUE }}>{t("home_hire_title")}</h2>
          <p className="mb-4 text-gray-700">{t("home_hire_desc")}</p>
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <span className="bg-[#eaf2fb] text-[#2563a6] px-4 py-2 rounded-full font-medium border border-[#c6d6ea]">{t("cat_fb")}</span>
            <span className="bg-[#eaf2fb] text-[#2563a6] px-4 py-2 rounded-full font-medium border border-[#c6d6ea]">{t("cat_construction")}</span>
            <span className="bg-[#eaf2fb] text-[#2563a6] px-4 py-2 rounded-full font-medium border border-[#c6d6ea]">{t("cat_caregivers")}</span>
            <span className="bg-[#eaf2fb] text-[#2563a6] px-4 py-2 rounded-full font-medium border border-[#c6d6ea]">{t("cat_domestic")}</span>
            <span className="bg-[#eaf2fb] text-[#2563a6] px-4 py-2 rounded-full font-medium border border-[#c6d6ea]">{t("cat_general")}</span>
            <span className="bg-[#eaf2fb] text-[#2563a6] px-4 py-2 rounded-full font-medium border border-[#c6d6ea]">{t("cat_service")}</span>
            <span className="bg-[#eaf2fb] text-[#2563a6] px-4 py-2 rounded-full font-medium border border-[#c6d6ea]">{t("cat_production")}</span>
          </div>
          <Link
            href={WHATSAPP_HIRE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-7 py-3 bg-[#2563a6] text-white rounded-full font-semibold shadow hover:bg-[#17406b] transition border-2 border-[#2563a6] text-lg w-full sm:w-auto text-center"
          >
            {t("home_hire_cta")}
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 px-4 w-full flex justify-center" style={{ background: LIGHT_BLUE }}>
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ color: PRIMARY_BLUE }}>{t("home_why_title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
              <h3 className="text-lg font-bold mb-2" style={{ color: PRIMARY_BLUE }}>{t("why_zero_title")}</h3>
              <p className="text-gray-700 text-sm">
                {t("why_zero_body")}
              </p>
              <p className="text-gray-700 text-sm mt-2">{t("why_zero_point")}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
              <h3 className="text-lg font-bold mb-2" style={{ color: PRIMARY_BLUE }}>{t("why_fast_title")}</h3>
              <p className="text-gray-700 text-sm">
                {t("why_fast_body")}
              </p>
              <p className="text-gray-700 text-sm mt-2">{t("why_fast_point")}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
              <h3 className="text-lg font-bold mb-2" style={{ color: PRIMARY_BLUE }}>{t("why_e2e_title")}</h3>
              <p className="text-gray-700 text-sm">
                {t("why_e2e_body")}
              </p>
              <p className="text-gray-700 text-sm mt-2">{t("why_e2e_point")}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
              <h3 className="text-lg font-bold mb-2" style={{ color: PRIMARY_BLUE }}>{t("why_quota_title")}</h3>
              <p className="text-gray-700 text-sm">
                {t("why_quota_body")}
              </p>
              <p className="text-gray-700 text-sm mt-2">{t("why_quota_point")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-12 px-4 w-full flex justify-center">
        <div className="max-w-6xl w-full">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ color: PRIMARY_BLUE }}>{t("home_team_title")}</h2>
          <div className="grid grid-cols-1 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.registrationNumber}
                className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start"
              >
                <div className="w-32 h-32 bg-white border border-[#c6d6ea] rounded-lg overflow-hidden relative shrink-0">
                  <Image
                    src={member.photoSrc}
                    alt={member.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                    priority={member.role === "Key Appointment Holder"}
                  />
                </div>
                <div className="w-full text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: PRIMARY_BLUE }}>
                    {member.name}
                  </div>
                  <div className="mt-4 text-xl sm:text-2xl text-gray-800">
                    <span className="text-gray-700">{t("team_reg")}</span>{" "}
                    <span className="font-semibold">{member.registrationNumber}</span>
                  </div>
                  <div className="mt-2 text-xl sm:text-2xl text-gray-800">
                    <span className="text-gray-700">{t("team_type")}</span>{" "}
                    <span className="font-semibold">{member.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2563a6] text-white py-10 px-4 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <div className="font-bold text-lg">Leading-Edge Consultancy Services Pte Ltd</div>
            <div className="text-sm mt-1">Simon Tseng, Senior Recruitment Consultant</div>
            <div className="text-sm mt-1">
              60 Paya Lebar Road<br />
              #06-28 Paya Lebar Square<br />
              Singapore 409051
            </div>
            <div className="text-sm mt-1">Phone: <a href="tel:+6590026161" className="underline">+65 90026161</a></div>
            <div className="text-sm">WhatsApp: <a href="https://wa.me/6590026161" className="underline">+65 90026161</a></div>
            <div className="text-sm">Email: <a href="mailto:stleading@gmail.com" className="underline">stleading@gmail.com</a></div>
            <div className="text-xs text-blue-100 mt-2">EA Licence No.: 12C6068 | Personal EA No.: R1108879</div>
          </div>
          <div className="w-full sm:w-1/3 h-32 bg-blue-100 rounded-lg flex items-center justify-center mt-4 sm:mt-0">
            {/* Google Maps Placeholder */}
            <span className="text-blue-500">[Google Maps Location]</span>
          </div>
        </div>
        <div className="text-center text-xs text-blue-100 mt-4">&copy; {new Date().getFullYear()} Leading-Edge Consultancy Services Pte Ltd. All rights reserved.</div>
      </footer>
    </div>
  );
}
