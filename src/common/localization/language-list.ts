import { SupportedLangCode } from "@/common/constants";

/** 语言分组类型 */
export type LanguageGroup = "common" | "others";

/** 语言元信息结构 */
export interface LanguageItem {
  code: SupportedLangCode;
  name: string;
}

/** 常用语言（优先显示） */
const COMMON_LANGUAGES: LanguageItem[] = [
  { code: "de", name: "Deutsch" },
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" },
  { code: "ja", name: "日本語" },
  { code: "nl", name: "Nederlands" },
  { code: "pl", name: "Polski" },
  { code: "pt", name: "Português" },
  { code: "ru", name: "Русский" },
  { code: "tr", name: "Türkçe" },
  { code: "zh", name: "汉语" },
];

/** 其他语言 */
const OTHER_LANGUAGES: LanguageItem[] = [
  { code: "ar", name: "العربية" },
  { code: "bg", name: "Български" },
  { code: "bs", name: "Bosanski" },
  { code: "ca", name: "Català" },
  { code: "cs", name: "Čeština" },
  { code: "da", name: "Dansk" },
  { code: "el", name: "Ελληνικά" },
  { code: "eu", name: "Euskara" },
  { code: "fa", name: "پارسی" },
  { code: "fi", name: "Suomi" },
  { code: "hak", name: "客家语" },
  { code: "he", name: "עברית" },
  { code: "hi", name: "हिन्दी" },
  { code: "hr", name: "Hrvatski" },
  { code: "hu", name: "Magyar" },
  { code: "hy", name: "Հայերեն" },
  { code: "ind", name: "Bahasa Indonesia" },
  { code: "ko", name: "한국어" },
  { code: "ku", name: "Kurdî / كوردی" },
  { code: "lv", name: "Latviešu" },
  { code: "no", name: "Norsk bokmål" },
  { code: "pa", name: "ਪੰਜਾਬੀ" },
  { code: "ro", name: "Română" },
  { code: "sk", name: "Slovenčina" },
  { code: "sr", name: "Српски / Srpski" },
  { code: "sv", name: "Svenska" },
  { code: "th", name: "ไทย" },
  { code: "tt", name: "Татар теле" },
  { code: "uk", name: "Українська" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "yue", name: "粵文" },
];

/** 语言分组映射表 */
const LANGUAGE_GROUPS: Record<LanguageGroup, LanguageItem[]> = {
  common: COMMON_LANGUAGES,
  others: OTHER_LANGUAGES,
};

/** 合并后的所有语言列表 */
const ALL_LANGUAGES: LanguageItem[] = [...COMMON_LANGUAGES, ...OTHER_LANGUAGES];

/**
 * 获取所有支持的语言
 */
export function getSupportedLanguages(): LanguageItem[] {
  return ALL_LANGUAGES;
}

/**
 * 获取指定分组的语言列表
 * @param group "common" | "others"
 */
export function getLanguagesInGroup(group: LanguageGroup): LanguageItem[] {
  return LANGUAGE_GROUPS[group];
}

/**
 * 根据语言代码解析语言名称
 * @param code 语言代码
 */
export function resolveLanguageName(code: SupportedLangCode): string | null {
  const found = ALL_LANGUAGES.find((item) => item.code === code);
  return found?.name ?? null;
}
