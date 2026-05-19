"use client";

import { useI18n } from "./LanguageProvider";

export default function LanguageToggle() {
  const { lang, setLang, t } = useI18n();

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "zh" : "en")}
      className="hidden"
      aria-label="Switch language"
    >
      {lang === "en" ? t("lang_zh") : t("lang_en")}
    </button>
  );
}

