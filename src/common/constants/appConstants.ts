/**
 * 语言代码
 */
export const DEFAULT_LANG_CODE = "en" as const;

/**
 * Forvo 子域名前缀
 */
export const DEFAULT_SUBDOMAIN_CODE = "zh" as const;

/**
 * 菜单项 ID。用于 `chrome.contextMenus.create` 的 `id` 字段。
 */
export const CONTEXT_MENU_IDS = {
  SEARCH: "forvo-search",
  WORD_PAGE: "forvo-word-page",
} as const;
export type ContextMenuId =
  (typeof CONTEXT_MENU_IDS)[keyof typeof CONTEXT_MENU_IDS];

export const CONTEXT_MENU_TYPE = {
  SEARCH: "SEARCH",
  WORD_PAGE: "WORD_PAGE",
} as const;
export type ContextMenuType =
  (typeof CONTEXT_MENU_TYPE)[keyof typeof CONTEXT_MENU_TYPE];

/**
 * 支持的语言代码列表
 */
// prettier-ignore
export const SUPPORTED_LANG_CODES = [
  "ar", "bg", "bs", "ca", "cs", "da", "de", "el", "en", "es",
  "eu", "fa", "fi", "fr", "hak", "he", "hi", "hr", "hu", "hy",
  "ind", "it", "ja", "ko", "ku", "lv", "nl", "no", "pa", "pl", "pt",
  "ro", "ru", "sk", "sr", "sv", "th", "tt", "tr", "uk", "vi", "yue", "zh"
] as const;
export type SupportedLangCode = (typeof SUPPORTED_LANG_CODES)[number];

// typeof SUPPORTED_LANG_CODES: 获取 SUPPORTED_LANG_CODES 变量的类型（即 readonly ["ar", ..., "zh"] 数组类型）。
// [number]: 这是 TypeScript 的索引访问类型，意思是“取这个数组类型里的所有成员类型”。
// 赋值给类型别名 SupportedLangCode。
