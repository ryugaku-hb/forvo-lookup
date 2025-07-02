import {
  DEFAULT_LANG_CODE,
  DEFAULT_SUBDOMAIN_CODE,
} from "../common/constants/index.js";
import { STORAGE_KEYS } from "../common/constants/index.js";

/**
 * 获取用户设置。
 *
 * 此函数从 `chrome.storage.local` 中读取用户设置的 `forvoLangCode` 和 `forvoSubdomainCode`
 *
 * @async
 * @returns {Promise<{ langCode: string, subdomainCode: string }>}
 *
 * @example
 * const settings = await loadUserSettings();
 * settings.langCode // "ja"
 */
const loadUserSettings = async () => {
  const result = await chrome.storage.local.get([
    STORAGE_KEYS.FORVO_LANG_CODE,
    STORAGE_KEYS.FORVO_SUBDOMAIN_CODE,
  ]);
  return {
    langCode: result.forvoLangCode || DEFAULT_LANG_CODE,
    subdomainCode: result.forvoSubdomainCode || DEFAULT_SUBDOMAIN_CODE,
  };
};

export { loadUserSettings };
