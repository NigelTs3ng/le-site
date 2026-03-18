"use client";

import { useI18n } from "./LanguageProvider";

export default function LanguageToggle() {
  const { lang, setLang, t } = useI18n();

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "zh" : "en")}
      className="fixed bottom-4 right-4 z-50 px-4 py-2 rounded-full shadow-lg border border-blue-200 bg-white text-blue-900 hover:bg-blue-50 transition-colors text-sm font-semibold"
      aria-label="Switch language"
    >
      {lang === "en" ? t("lang_zh") : t("lang_en")}
    </button>
  );
}

