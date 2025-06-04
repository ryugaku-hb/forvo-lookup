// forvoUtils.js
// Forvo 工具函数模块：处理语言代码验证、URL 构造与解析
// 用于 options 页面和 service_worker 共用逻辑

/**
 * 默认语言代码
 * @constant {string}
 */
const DEFAULT_LANG_CODE = "zh";

/**
 * 支持的语言代码列表
 * @constant {string[]}
 */
// prettier-ignore
const SUPPORTED_LANG_CODES = [
  "ar", "bg", "bs", "ca", "cs", "da", "de", "el", "en", "es",
  "eu", "fa", "fi", "fr", "hak", "he", "hi", "hr", "hu", "hy",
  "ind", "it", "ja", "ko", "ku", "lv", "nl", "no", "pa", "pl", "pt",
  "ro", "ru", "sk", "sr", "sv", "th", "tt", "tr", "uk", "vi", "yue", "zh"
];

/**
 * 判断是否为受支持的语言代码
 *
 * @example
 * isValidLangCode("en") // true
 * isValidLangCode("xx") // false
 *
 * @param {string} langCode -待验证的语言代码（如 "en"、"zh"、"ja"）
 * @returns {boolean} 是否为有效语言代码
 */
function isValidLangCode(langCode) {
  return SUPPORTED_LANG_CODES.includes(langCode);
}

/**
 * 参数类型错误（类型检查失败时抛出）
 */
class InvalidTypeError extends Error {
  /**
   * @example
   * new InvalidTypeError("url", "string", typeof url);
   *
   * @param {string} paramName - 参数名称
   * @param {string} expectedType - 期望的类型（如 "string"）
   * @param {string} actualType - 实际接收到的类型（如 "number"）
   */
  constructor(paramName, expectedType, actualType) {
    super(
      `参数 "${paramName}" 类型错误，期望类型是 ${expectedType}，但收到的是 ${actualType}`
    );
    this.name = "InvalidTypeError";
  }
}
/**
 * URL 格式错误（ service 地址格式不符合要求时抛出）
 */
class InvalidUrlError extends Error {
  /**
   * @example
   * new InvalidUrlError("Forvo", url);
   *
   * @param {string} service - 服务名称（如 "Forvo"）
   * @param {string} url - 触发错误的 URL
   */
  constructor(service, url) {
    super(`无效的 ${service} 地址格式: ${url}`);
    this.name = `${service}UrlError`;
  }
}
/**
 * 不支持的语言代码错误（代码未列入支持列表时抛出）
 */
class UnsupportedLangCodeError extends Error {
  /**
   * @example
   * throw new UnsupportedLangCodeError("xx");
   *
   * @param {string} langCode - 不受支持的语言代码
   */
  constructor(langCode) {
    super(`不支持的语言代码: ${langCode}`);
    this.name = "UnsupportedLangCodeError";
  }
}

/**
 * 从 Forvo 搜索 URL 中提取语言代码
 *
 * @example
 * extractLangCode("https://forvo.com/search/") // "en"
 * extractLangCode("https://ja.forvo.com/search/") // "ja"
 * extractLangCode("https://zh.forvo.com/search/大家")  // "zh"
 *
 * @param {string} forvoUrl - Forvo 搜索 URL
 * @returns {string} 提取的语言代码，若无匹配返回默认值
 *
 * @throws {InvalidTypeError} 如果参数不是字符串
 * @throws {InvalidUrlError} 如果 URL 格式不符合 Forvo 要求
 */
function extractLangCode(forvoUrl) {
  if (typeof forvoUrl !== "string") {
    throw new InvalidTypeError("forvoBaseUrl", "string", typeof forvoUrl);
  }

  // 英文：无子域名 https://forvo.com/search 或 /search/word
  // ^ => 匹配字符串开头
  // https:\/\/ => 匹配固定的前缀 https://，反斜杠用于转义 /
  // (\/.*)? => 可选：匹配以 / 开头的任何后续路径（如 /abc），也可以没有
  if (/^https:\/\/forvo\.com\/search(\/.*)?/.test(forvoUrl)) {
    return "en";
  }

  // 其他语言子域名，如 https://ja.forvo.com/search 或 /search/word
  // ([a-z]{2,4}) => 捕获子域名语言代码，2 到 4 个小写英文字母（如 zh, ja, en, cmn）
  const match = forvoUrl.match(
    /^https:\/\/([a-z]{2,4})\.forvo\.com\/search(\/.*)?/
  );

  if (!match) {
    throw new InvalidUrlError("Forvo", url);
  }

  return match[1] || DEFAULT_LANG_CODE;
}

/**
 * 根据语言代码生成对应的 Forvo 搜索 URL 前缀
 *
 * @example
 * getForvoBaseUrl("zh") // "https://zh.forvo.com/search/"
 * getForvoBaseUrl("en") // "https://forvo.com/search/"
 *
 * @param {string} langCode - 语言代码（如 "zh"、"en"、"ja"）
 * @returns {string} 对应的 Forvo 搜索 URL 前缀
 *
 * @throws {InvalidTypeError} 如果参数不是字符串
 * @throws {UnsupportedLangCodeError} 如果 langCode 不支持
 */
function getForvoBaseUrl(langCode) {
  if (typeof langCode !== "string") {
    throw new InvalidTypeError("langCode", "string", typeof langCode);
  }
  if (!isValidLangCode(langCode)) {
    throw new UnsupportedLangCodeError(langCode);
  }

  return langCode === "en"
    ? "https://forvo.com/search/" // 英文没有前缀
    : `https://${langCode}.forvo.com/search/`;
}

export {
  DEFAULT_LANG_CODE,
  isValidLangCode,
  InvalidTypeError,
  InvalidUrlError,
  UnsupportedLangCodeError,
  extractLangCode,
  getForvoBaseUrl,
};
