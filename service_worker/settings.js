import { DEFAULT_LANG_CODE, getForvoBaseUrl } from "../common/forvoUtils.js";

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

/**
 * 监听 `chrome.storage` 中 `forvoBaseUrl` 值的变化。
 *
 * 当用户在插件设置中更新 Forvo 搜索语言地址时，
 * 此函数会触发回调函数 `onUpdate`，并传入更新后的 `forvoBaseUrl`。
 *
 * @param {(newForvoBaseUrl: string) => void} onUpdate 当 `chrome.storage` 中 `forvoBaseUrl` 发生变化时触发的回调函数。
 */
const watchStorageChanges = (onUpdate) => {
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.forvoBaseUrl?.newValue) {
      onUpdate(changes.forvoBaseUrl.newValue);
    }
  });
};

export { loadUserSettings, watchStorageChanges };
