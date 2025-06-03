// 公用的 Forvo 工具函数，供 options 页面与 service_worker 使用

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
 * 判断传入的语言代码是否在支持的语言列表中
 *
 * @example
 * isValidLangCode("en") // true
 * isValidLangCode("xx") // false
 *
 * @param {string} langCode 待验证的语言代码，例如 "en"、"zh"、"ja" 等
 * @returns {boolean} 如果是支持的语言代码，返回 true；否则返回 false
 */
function isValidLangCode(langCode) {
  return SUPPORTED_LANG_CODES.includes(langCode);
}

/**
 * 参数类型错误（类型检查失败时抛出）
 *
 * @example
 * throw new InvalidTypeError("url", "string", typeof url);
 *
 * @param {string} paramName - 参数名称
 * @param {string} expectedType - 期望的类型（如 "string"）
 * @param {string} actualType - 实际接收到的类型（如 "number"）
 */
class InvalidTypeError extends Error {
  constructor(paramName, expectedType, actualType) {
    super(
      `参数 "${paramName}" 类型错误，期望类型是 ${expectedType}，但收到的是 ${actualType}`
    );
    this.name = "InvalidTypeError";
  }
}
/**
 * URL 格式错误（服务地址格式不符合要求时抛出）
 *
 * @example
 * throw new InvalidUrlError("Forvo", url);
 *
 * @param {string} service - 服务名称（如 "Forvo"）
 * @param {string} url - 无效的 URL 字符串
 */
class InvalidUrlError extends Error {
  constructor(service, url) {
    super(`无效的 ${service} 地址格式: ${url}`);
    this.name = `${service}UrlError`;
  }
}
/**
 * 不支持的语言代码错误（传入语言代码未包含在支持列表中时抛出）
 *
 * @example
 * throw new UnsupportedLangCodeError("xx");
 *
 * @param {string} langCode - 不受支持的语言代码
 */
class UnsupportedLangCodeError extends Error {
  constructor(langCode) {
    super(`不支持的语言代码: ${langCode}`);
    this.name = "UnsupportedLangCodeError";
  }
}

/**
 * 从 Forvo 基础 URL 提取语言代码
 *
 * @example
 * extractLangCode("https://forvo.com/search/") // 返回 "en"（英文无子域名）
 * extractLangCode("https://ja.forvo.com/search/") // 返回 "ja"
 *
 * @param {string} forvoBaseUrl - Forvo 搜索的基础地址，例如 "https://ja.forvo.com/search/"
 * @returns {string} 提取的语言代码，默认返回 "zh"
 * @throws {InvalidTypeError} 如果参数不是字符串
 * @throws {InvalidUrlError} 如果 URL 格式不符合 Forvo 要求
 */
function extractLangCode(forvoBaseUrl) {
  if (typeof forvoBaseUrl !== "string") {
    throw new InvalidTypeError("forvoBaseUrl", "string", typeof forvoBaseUrl);
  }

  if (forvoBaseUrl === "https://forvo.com/search/") return "en"; // 英文特殊情况
  const match = forvoBaseUrl.match(/^https:\/\/(.*?)\.forvo\.com/);

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
 * @param {string} langCode - 语言代码，例如 "zh"、"en"、"ja" 等
 * @returns {string} 对应的 Forvo 搜索 URL 前缀
 * @throws {InvalidTypeError} 如果参数 langCode 不是字符串
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

export { DEFAULT_LANG_CODE, extractLangCode, getForvoBaseUrl };
