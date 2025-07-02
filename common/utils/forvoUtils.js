// forvoUtils.js
// Forvo 工具函数模块：处理语言代码验证、URL 构造与解析
// 用于 options 页面和 service_worker 共用逻辑

// ==============================
// 语言代码相关常量与函数
// ==============================

import { SUPPORTED_LANG_CODES } from "../constants/index.js";

/**
 * 判断是否为受支持的语言代码。
 *
 * @param {string} langCode 待验证的语言代码，如 `"en"`, `"zh"`, `"ja"`
 * @returns {boolean}
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
 * 用于匹配 Forvo 多种形式的语言页面 URL
 *
 * 正则说明
 * 1. 开头锚点 ^
 * 匹配字符串的起始位置，如 /^abc/ 匹配 "abc123"
 * ^https:\/\/ 匹配字符串开头及 "https://" 前缀
 * 2. 非捕获组 (?: ... )
 * (?:abc)? 表示 abc 是可选的，但不捕获
 * 3. 捕获组 ( ... )
 * match[0] 整个匹配到的 URL 字符串
 * match[1] ([a-z]{2,4}) 语言子域名，如 "zh", "ja"；如无子域名，则为 undefined
 * match[2] (search|word) 匹配到的路径部分 "search" 或 "word"
 * match[3] (\/.*) 后续路径，如 "/你好", "/hello"，如无则为 undefined
 * 4. 量词 ?
 * 匹配前一字符或组出现 0 或 1 次，如 /a?b/ 匹配 "b" 和 "ab"
 * (?:([a-z]{2,4})\.)? 可选
 * (\/.*)? 可选
 */
const FORVO_URL_REGEX =
  /^https:\/\/(?:([a-z]{2,4})\.)?forvo\.com\/(search|word)(\/.*)?/;

/**
 * 从 Forvo 搜索或词条 URL 中提取语言代码。
 *
 * @param {string} forvoUrl
 * @returns {string} 提取的语言代码，若无匹配返回默认值
 *
 * @throws {InvalidTypeError} 如果参数 `forvoUrl` 不是字符串类型
 * @throws {InvalidUrlError} 如果参数 `forvoUrl` 不符合 Forvo 的支持 URL 格式
 *
 * @example
 * extractLangCode("https://forvo.com/search/hello"); // "en"
 * extractLangCode("https://forvo.com/word/hello"); // "en"
 * extractLangCode("https://ja.forvo.com/search/こんにちは"); // "ja"
 * extractLangCode("https://zh.forvo.com/word/大家"); // "zh"
 * extractLangCode("https://de.forvo.com/search/hallo"); // "de"
 */
const extractLangCode = (forvoUrl) => {
  if (typeof forvoUrl !== "string") {
    throw new InvalidTypeError("forvoUrl", "string", typeof forvoUrl);
  }

  // 匹配格式，支持无语言子域名（英文）或有语言子域名（其他语言）
  const match = forvoUrl.match(FORVO_URL_REGEX);

  if (!match) {
    throw new InvalidUrlError("Forvo", forvoUrl);
  }

  const langCode = match[1]; // 子域名，如 zh, ja 或 undefined
  return langCode || "en"; // 没有子域名则默认为英文
};

/**
 * @param {string} subdomainCode
 * @returns {string}
 *
 * @throws {InvalidTypeError} 如果参数 `subdomainCode` 不是字符串
 * @throws {UnsupportedLangCodeError} 如果 `subdomainCode` 不是支持的语言代码之一
 *
 * @example
 * getForvoBaseUrlByRegion("zh") // "https://zh.forvo.com/"
 * getForvoBaseUrlByRegion("en") // "https://forvo.com/"
 */
const getForvoBaseUrlBySubdomain = (subdomainCode) => {
  if (typeof subdomainCode !== "string") {
    throw new InvalidTypeError("subdomainCode", "string", typeof subdomainCode);
  }
  if (!isValidLangCode(subdomainCode)) {
    throw new UnsupportedLangCodeError(subdomainCode);
  }

  return subdomainCode === "en"
    ? "https://forvo.com/" // 英文没有前缀
    : `https://${subdomainCode}.forvo.com/`;
};

/**
 * 获取所有支持语言的 Forvo 基础 URL 列表。
 *
 * @returns {string[]} 包含所有支持语言区域的 Forvo 基础 URL 数组
 *
 * @example
 * getAllForvoBaseUrls();
 * // => ["https://jp.forvo.com/", "https://zh.forvo.com/", ..., "https://forvo.com/"]
 */
const getAllForvoBaseUrls = () => {
  return SUPPORTED_LANG_CODES.map((lang) => getForvoBaseUrlBySubdomain(lang));
};

// ==============================
// 导出模块
// ==============================

export {
  // 校验函数
  isValidLangCode,
  // 错误类型
  InvalidTypeError,
  InvalidUrlError,
  UnsupportedLangCodeError,
  // 核心工具函数
  extractLangCode,
  getForvoBaseUrlBySubdomain,
  getAllForvoBaseUrls,
};
