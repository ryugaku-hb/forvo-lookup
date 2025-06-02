const DEFAULT_FORVO_URL = "https://zh.forvo.com/search/";

/**
 * 获取用户的 Forvo 页面语言设置
 *
 * 读取 `chrome.storage.local` 中的 `pageLang`，
 * 如果没有设置则返回默认的搜索地址。
 *
 * @returns {Promise<{ pageLang: string }>}
 *   一个 Promise，解析后返回包含语言搜索 URL 的对象。
 */
export async function loadUserSettings() {
  const result = await chrome.storage.local.get(["pageLang"]);
  return {
    pageLang: result.pageLang || DEFAULT_FORVO_URL,
  };
}

/**
 * 监听 `chrome.storage` 中 `pageLang` 的变化。
 * 当用户更新语言设置时，调用传入的回调函数。
 *
 * @param {(newUrl: string) => void} onUpdate
 *   当语言设置变更时被调用的回调函数，参数为新的搜索地址。
 */
export function watchStorageChanges(onUpdate) {
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.pageLang?.newValue) {
      onUpdate(changes.pageLang.newValue);
    }
  });
}
