"use client";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "./LanguageProvider";

export default function Navigation() {
  const { lang, setLang, t } = useI18n();

  return (
    <nav className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Image src="/le-logo.png" alt="LE" width={32} height={32} />
              <span className="text-lg font-semibold text-blue-900">{t("nav_brand")}</span>
            </div>
          </Link>

          {/* Right side - Navigation links */}
          <div className="flex items-center space-x-6">
            <Link href="/about" className="text-blue-900 hover:text-blue-600 transition-colors">
              {t("nav_about")}
            </Link>
            <Link href="/apply" className="text-blue-900 hover:text-blue-600 transition-colors">
              {t("nav_apply")}
            </Link>
            <Link href="/contact" className="text-blue-900 hover:text-blue-600 transition-colors">
              {t("nav_contact")}
            </Link>
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              className="ml-2 px-3 py-1 rounded-full border border-blue-200 text-blue-900 hover:bg-blue-50 transition-colors text-sm font-semibold"
              aria-label="Switch language"
            >
              {lang === "en" ? t("lang_zh") : t("lang_en")}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}