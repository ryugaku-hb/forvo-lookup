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
} from "./forvoUtils.js";
