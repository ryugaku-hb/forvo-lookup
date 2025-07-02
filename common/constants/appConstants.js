/**
 * 语言代码
 */
export const DEFAULT_LANG_CODE = "en";
/**
 * Forvo 子域名前缀
 */
export const DEFAULT_SUBDOMAIN_CODE = "zh";

/**
 * 菜单项 ID。 用于 `chrome.contextMenus.create` 的 `id` 字段。
 */
export const CONTEXT_MENU_IDS = {
  SEARCH: "forvo-search",
  WORD_PAGE: "forvo-word-page",
};

export const CONTEXT_MENU_TYPE = {
  SEARCH: "SEARCH",
  WORD_PAGE: "WORD_PAGE",
};

/**
 * 支持的语言代码列表
 */
// prettier-ignore
export const SUPPORTED_LANG_CODES = [
  "ar", "bg", "bs", "ca", "cs", "da", "de", "el", "en", "es",
  "eu", "fa", "fi", "fr", "hak", "he", "hi", "hr", "hu", "hy",
  "ind", "it", "ja", "ko", "ku", "lv", "nl", "no", "pa", "pl", "pt",
  "ro", "ru", "sk", "sr", "sv", "th", "tt", "tr", "uk", "vi", "yue", "zh"
];
