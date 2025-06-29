// forvoUtils.js
// Forvo 工具函数模块：处理语言代码验证、URL 构造与解析
// 用于 options 页面和 service_worker 共用逻辑

// ==============================
// 语言代码相关常量与函数
// ==============================

/**
 * 默认语言代码
 */
const DEFAULT_LANG_CODE = "zh";

/**
 * 支持的语言代码列表
 */
// prettier-ignore
const SUPPORTED_LANG_CODES = [
  "ar", "bg", "bs", "ca", "cs", "da", "de", "el", "en", "es",
  "eu", "fa", "fi", "fr", "hak", "he", "hi", "hr", "hu", "hy",
  "ind", "it", "ja", "ko", "ku", "lv", "nl", "no", "pa", "pl", "pt",
  "ro", "ru", "sk", "sr", "sv", "th", "tt", "tr", "uk", "vi", "yue", "zh"
];

/**
 * 判断是否为受支持的语言代码。
 *
 * @param {string} langCode 待验证的语言代码（如 `"en"`, `"zh"`, `"ja"`）
 * @returns {boolean} 是否为有效语言代码
 *
 * @example
 * isValidLangCode("en") // true
 * isValidLangCode("xx") // false
 */
const isValidLangCode = (langCode) => {
  return SUPPORTED_LANG_CODES.includes(langCode);
};

// ==============================
// 自定义错误类型
// ==============================

/**
 * 参数类型错误（类型检查失败时抛出）。
 *
 * @class InvalidTypeError
 * @extends {Error}
 */
class InvalidTypeError extends Error {
  /**
   * @constructor
   * @param {string} paramName 参数名称
   * @param {string} expectedType 期望的类型（例如 `"string"`）
   * @param {string} actualType 实际接收到的类型（例如 `"number"`）
   *
   * @example
   * throw new InvalidTypeError("url", "string", typeof url);
   */
  constructor(paramName, expectedType, actualType) {
    const message = `参数 "${paramName}" 类型错误，期望是 ${expectedType}，但收到 ${actualType}`;
    super(message);
    this.name = "InvalidTypeError";
  }
}

/**
 * URL 格式错误（当 URL 不符合服务预期格式时抛出）。
 *
 * @class InvalidUrlError
 * @extends {Error}
 */
class InvalidUrlError extends Error {
  /**
   * @constructor
   * @param {string} service 服务名称（例如 `"Forvo"`）
   * @param {string} url 被检测的 URL 字符串
   *
   * @example
   * throw new InvalidUrlError("Forvo", url);
   */
  constructor(service, url) {
    const message = `无效的 ${service} 搜索地址格式: ${url}`;
    super(message);
    this.name = `${service}UrlError`;
  }
}

/**
 * 不支持的语言代码错误（语言不在支持列表时抛出）。
 *
 * @class UnsupportedLangCodeError
 * @extends {Error}
 */
class UnsupportedLangCodeError extends Error {
  /**
   * @constructor
   * @param {string} langCode - 不支持的语言代码（例如 `"xx"`）
   *
   * @example
   * throw new UnsupportedLangCodeError("xx");
   */
  constructor(langCode) {
    const message = `不支持的语言代码: ${langCode}`;
    super(message);
    this.name = "UnsupportedLangCodeError";
  }
}

// ==============================
// Forvo URL 处理函数
// ==============================

/**
 * 从 Forvo 搜索 URL 中提取语言代码。
 *
 * @param {string} forvoUrl - Forvo 搜索 URL
 * @returns {string} 提取的语言代码，若无匹配返回默认值
 *
 * @throws {InvalidTypeError} 如果参数 `forvoUrl` 不是字符串类型
 * @throws {InvalidUrlError} 如果 URL 不符合 Forvo 的搜索页面格式
 *
 * @example
 * extractLangCode("https://forvo.com/search/") // "en"
 * extractLangCode("https://ja.forvo.com/search/") // "ja"
 * extractLangCode("https://zh.forvo.com/search/大家") // "zh"
 */
const extractLangCode = (forvoUrl) => {
  if (typeof forvoUrl !== "string") {
    throw new InvalidTypeError("forvoBaseUrl", "string", typeof forvoUrl);
  }

  // 英文：无子域名 https://forvo.com/search 或 /search/word
  if (/^https:\/\/forvo\.com\/search(\/.*)?/.test(forvoUrl)) {
    return "en";
  }
  // 其他语言子域名，如 https://ja.forvo.com/search 或 /search/word
  const match = forvoUrl.match(
    /^https:\/\/([a-z]{2,4})\.forvo\.com\/search(\/.*)?/
  );

  if (!match) {
    throw new InvalidUrlError("Forvo", forvoUrl);
  }

  return match[1] || DEFAULT_LANG_CODE;
};

/**
 * 根据语言代码生成对应的 Forvo 搜索 URL 前缀。
 * 
 * @param {string} langCode - 语言代码（如 `"zh"`, `"en"`, `"ja"`）
 * @returns {string} 对应的 Forvo 搜索 URL 前缀
 *
 * @throws {InvalidTypeError} 如果参数 `langCode` 不是字符串
 * @throws {UnsupportedLangCodeError} 如果 `langCode` 不是支持的语言代码之一（由 `isValidLangCode()` 判定）
 * 
 * @example
 * getForvoBaseUrl("zh") // "https://zh.forvo.com/search/"
 * getForvoBaseUrl("en") // "https://forvo.com/search/"
 */
const getForvoBaseUrl = (langCode) => {
  if (typeof langCode !== "string") {
    throw new InvalidTypeError("langCode", "string", typeof langCode);
  }
  if (!isValidLangCode(langCode)) {
    throw new UnsupportedLangCodeError(langCode);
  }

  return langCode === "en"
    ? "https://forvo.com/search/" // 英文没有前缀
    : `https://${langCode}.forvo.com/search/`;
};

// ==============================
// 导出模块
// ==============================

export {
  DEFAULT_LANG_CODE,
  isValidLangCode,
  InvalidTypeError,
  InvalidUrlError,
  UnsupportedLangCodeError,
  extractLangCode,
  getForvoBaseUrl,
};
