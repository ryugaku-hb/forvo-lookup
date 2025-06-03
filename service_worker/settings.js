import { DEFAULT_LANG_CODE, getForvoBaseUrl } from "../common/forvoUtils.js";

const DEFAULT_FORVO_BASE_URL = getForvoBaseUrl(DEFAULT_LANG_CODE);

/**
 * 获取用户的 Forvo 页面语言设置
 *
 * 读取 `chrome.storage.local` 中的 `forvoBaseUrl`，
 * 如果没有设置则返回默认的搜索地址。
 *
 * @returns {Promise<{ forvoBaseUrl: string }>}
 *   一个 Promise，解析后返回包含语言搜索 URL 的对象。
 */
export async function loadUserSettings() {
  const result = await chrome.storage.local.get(["forvoBaseUrl"]);
  return {
    forvoBaseUrl: result.forvoBaseUrl || DEFAULT_FORVO_BASE_URL,
  };
}

/**
 * 监听 `chrome.storage` 中 `forvoBaseUrl` 的变化。
 * 当用户更新语言设置时，调用传入的回调函数。
 *
 * @param {(newForvoBaseUrl: string) => void} onUpdate
 *   当语言设置变更时被调用的回调函数，参数为新的搜索地址。
 */
export function watchStorageChanges(onUpdate) {
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.forvoBaseUrl?.newValue) {
      onUpdate(changes.forvoBaseUrl.newValue);
    }
  });
}
