import {
  DEFAULT_LANG_CODE,
  getForvoBaseUrl,
} from "../common/utils/forvoUtils.js";

const DEFAULT_FORVO_BASE_URL = getForvoBaseUrl(DEFAULT_LANG_CODE);

/**
 * 获取用户设置的 Forvo 搜索地址。
 *
 * 此函数从 `chrome.storage.local` 中读取用户配置的 `forvoBaseUrl`，
 * 如果未设置该值，则返回一个默认的搜索地址 `DEFAULT_FORVO_BASE_URL`。
 *
 * @async
 * @returns {Promise<{ forvoBaseUrl: string }>} 一个 Promise，解析后返回包含语言搜索 URL 的对象。
 *
 * @example
 * const settings = await loadUserSettings();
 * settings.forvoBaseUrl // "https://ja.forvo.com/search/"
 */
const loadUserSettings = async () => {
  const result = await chrome.storage.local.get(["forvoBaseUrl"]);
  return {
    forvoBaseUrl: result.forvoBaseUrl || DEFAULT_FORVO_BASE_URL,
  };
};

export { loadUserSettings };
