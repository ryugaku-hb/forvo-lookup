/** 语言代码 */
export const DEFAULT_LANG_CODE = "en" as const;
/** Forvo 子域名前缀 */
export const DEFAULT_SUBDOMAIN_CODE = "zh" as const;

/** 支持的语言代码列表 */
// prettier-ignore
export const SUPPORTED_LANG_CODES = [
  "ar", "bg", "bs", "ca", "cs", "da", "de", "el", "en", "es",
  "eu", "fa", "fi", "fr", "hak", "he", "hi", "hr", "hu", "hy",
  "ind", "it", "ja", "ko", "ku", "lv", "nl", "no", "pa", "pl", "pt",
  "ro", "ru", "sk", "sr", "sv", "th", "tt", "tr", "uk", "vi", "yue", "zh"
] as const;
export type SupportedLangCode = (typeof SUPPORTED_LANG_CODES)[number];
