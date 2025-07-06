// forvoUtils.js
// Forvo 工具函数模块：处理语言代码验证、URL 构造与解析
// 用于 options 页面和 service_worker 共用逻辑

import { SUPPORTED_LANG_CODES, SupportedLangCode } from "@/common/constants";

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
export const isValidLangCode = (
  langCode: string
): langCode is SupportedLangCode => {
  return SUPPORTED_LANG_CODES.includes(langCode as SupportedLangCode);
};

/**
 * URL 格式错误（当 URL 不符合服务预期格式时抛出）。
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
  constructor(service: string, url: string) {
    const message = `无效的 ${service} 搜索地址格式: ${url}`;
    super(message);
    this.name = `${service}UrlError`;
  }
}

/**
 * 用于匹配 Forvo 多种形式的语言页面 URL
 */
const FORVO_URL_REGEX: RegExp =
  /^https:\/\/(?:([a-z]{2,4})\.)?forvo\.com\/(search|word)(\/.*)?/;
// 正则说明
// 1. 开头锚点 ^
// 匹配字符串的起始位置，如 /^abc/ 匹配 "abc123"
// ^https:\/\/ 匹配字符串开头及 "https://" 前缀
// 2. 非捕获组 (?: ... )
// (?:abc)? 表示 abc 是可选的，但不捕获
// 3. 捕获组 ( ... )
// match[0] 整个匹配到的 URL 字符串
// match[1] ([a-z]{2,4}) 语言子域名，如 "zh", "ja"；如无子域名，则为 undefined
// match[2] (search|word) 匹配到的路径部分 "search" 或 "word"
// match[3] (\/.*) 后续路径，如 "/你好", "/hello"，如无则为 undefined
// 4. 量词 ?
// 匹配前一字符或组出现 0 或 1 次，如 /a?b/ 匹配 "b" 和 "ab"
// (?:([a-z]{2,4})\.)? 可选
// (\/.*)? 可选

/**
 * 从 Forvo 搜索或词条 URL 中提取语言代码。
 *
 * @param {string} forvoUrl
 * @returns {SupportedLangCode}
 *
 * @throws {InvalidUrlError} 如果参数 `forvoUrl` 不符合 Forvo 的支持 URL 格式
 *
 * @example
 * extractLangCode("https://forvo.com/search/hello"); // "en"
 * extractLangCode("https://forvo.com/word/hello"); // "en"
 * extractLangCode("https://ja.forvo.com/search/こんにちは"); // "ja"
 * extractLangCode("https://zh.forvo.com/word/大家"); // "zh"
 * extractLangCode("https://de.forvo.com/search/hallo"); // "de"
 */
export const extractLangCode = (forvoUrl: string): SupportedLangCode => {
  // 匹配格式，支持无语言子域名（英文）或有语言子域名（其他语言）
  const match = forvoUrl.match(FORVO_URL_REGEX);

  if (!match) {
    throw new InvalidUrlError("Forvo", forvoUrl);
  }

  const langCode = match[1] ?? "en";
  return isValidLangCode(langCode) ? langCode : "en";
};

/**
 * @param {SupportedLangCode} subdomainCode
 * @returns {string}
 *
 * @example
 * getForvoBaseUrlByRegion("zh") // "https://zh.forvo.com/"
 * getForvoBaseUrlByRegion("en") // "https://forvo.com/"
 */
export const getForvoBaseUrlBySubdomain = (
  subdomainCode: SupportedLangCode
): string => {
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
export const getAllForvoBaseUrls = (): string[] => {
  return SUPPORTED_LANG_CODES.map((lang) => getForvoBaseUrlBySubdomain(lang));
};
