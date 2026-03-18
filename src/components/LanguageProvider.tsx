"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "zh";

type Translations = Record<string, string>;

const MESSAGES: Record<Language, Translations> = {
  en: {
    nav_brand: "Leading Edge",
    nav_about: "About",
    nav_apply: "Apply",
    nav_contact: "Contact",
    lang_en: "EN",
    lang_zh: "中文",

    home_hero_subtitle: "A TOTAL SOLUTION FOR EMPLOYMENT",
    home_cta_hiring: "I'm Hiring",
    home_cta_work: "I'm Looking for Work",

    home_hire_title: "Hire Foreign Workers in Singapore",
    home_hire_desc: "We help Singapore SMEs hire reliable foreign workers for:",
    home_hire_cta: "Contact Us to Hire Workers",

    cat_fb: "F&B",
    cat_construction: "Construction",
    cat_caregivers: "Caregivers",
    cat_domestic: "Domestic Helpers",
    cat_general: "General Workers",
    cat_service: "Service Line",
    cat_production: "Production Workers",

    home_why_title: "Why Choose Us?",
    why_zero_title: "💰 Zero Placement Cost for Foreign Workers",
    why_zero_body:
      "For non-Malaysian hires, employers pay no placement fees at all — all application fees and miscellaneous fees will be borne by us.",
    why_zero_point: "👉 Reduce hiring costs while still securing reliable manpower.",
    why_fast_title: "⚡ Fast Deployment (1–4 Weeks)",
    why_fast_body: "We maintain a ready pool of pre-screened candidates who can be deployed quickly.",
    why_fast_point: "👉 Fill urgent manpower gaps without long waiting times.",
    why_e2e_title: "🛠️ Full End-to-End Handling",
    why_e2e_body: "From sourcing and screening to work pass application and coordination — we handle everything.",
    why_e2e_point: "👉 Save time and avoid administrative hassle.",
    why_quota_title: "📊 Quota & Work Pass Advisory",
    why_quota_body: "We guide you on your DRC and NTS eligibility to maximise your hiring potential.",
    why_quota_point: "👉 Avoid rejected applications and make full use of your quota.",

    home_team_title: "Our Team",
    team_reg: "Reg No:",
    team_type: "EA Type:",
  },
  zh: {
    nav_brand: "Leading Edge",
    nav_about: "关于我们",
    nav_apply: "申请",
    nav_contact: "联系我们",
    lang_en: "EN",
    lang_zh: "中文",

    home_hero_subtitle: "一站式人力与就业解决方案",
    home_cta_hiring: "我要招聘",
    home_cta_work: "我要找工作",

    home_hire_title: "在新加坡招聘外籍员工",
    home_hire_desc: "我们协助新加坡中小企业招聘可靠的外籍员工，涵盖：",
    home_hire_cta: "WhatsApp 联系我们招聘",

    cat_fb: "餐饮",
    cat_construction: "建筑",
    cat_caregivers: "看护",
    cat_domestic: "家政帮佣",
    cat_general: "普通工人",
    cat_service: "服务业",
    cat_production: "生产线工人",

    home_why_title: "为什么选择我们？",
    why_zero_title: "💰 外籍员工零安置费",
    why_zero_body: "非马来西亚籍雇员，雇主无需支付任何安置费用——所有申请费及杂费由我们承担。",
    why_zero_point: "👉 降低招聘成本，同时获得可靠人手。",
    why_fast_title: "⚡ 快速到岗（1–4 周）",
    why_fast_body: "我们维护一批已预筛选的人才库，可快速安排到岗。",
    why_fast_point: "👉 迅速填补紧急人手缺口，无需长时间等待。",
    why_e2e_title: "🛠️ 一站式全流程办理",
    why_e2e_body: "从招募、筛选到工作准证申请与协调，我们全程处理。",
    why_e2e_point: "👉 节省时间，减少行政负担。",
    why_quota_title: "📊 配额与准证咨询",
    why_quota_body: "我们协助您了解 DRC 与 NTS 资格，最大化招聘潜力。",
    why_quota_point: "👉 避免申请被拒，充分利用配额。",

    home_team_title: "我们的团队",
    team_reg: "注册号：",
    team_type: "EA 类型：",
  },
};

type I18nContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "le_site_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved === "en" || saved === "zh") setLangState(saved);
    } catch {
      // ignore
    }
  }, []);

  const setLang = (next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  const value = useMemo<I18nContextValue>(() => {
    const dict = MESSAGES[lang];
    return {
      lang,
      setLang,
      t: (key: string) => dict[key] ?? MESSAGES.en[key] ?? key,
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}

