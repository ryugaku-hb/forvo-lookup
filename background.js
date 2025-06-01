// 默认的 Forvo 搜索地址（中文）
const DEFAULT_FORVO_URL = "https://zh.forvo.com/search/";

/**
 * 获取用户的 Forvo 页面语言设置
 *
 * 该函数从 `chrome.storage.local` 中读取用户设置的 `pageLang` 值，
 * 如果用户尚未设置（例如第一次使用扩展），则默认返回中文 Forvo 搜索地址。
 *
 * @returns {Promise<{ pageLang: string }>}
 * 返回一个 Promise，解析后的对象包含一个 `pageLang` 字段（搜索 URL 前缀）。
 */
function getUserSettings() {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(["pageLang"], (result) => {
        if (chrome.runtime.lastError) {
          // 捕获 API 错误，例如扩展没有权限、存储失败等
          reject(
            new Error(`读取配置失败：${chrome.runtime.lastError.message}`)
          );
        } else {
          resolve({
            pageLang: result.pageLang || DEFAULT_FORVO_URL,
          });
        }
      });
    } catch (err) {
      reject(err); // 捕获代码级别异常（理论上不会有，但保险起见）
    }
  });
}

/**
 * 设置右键菜单功能，用于在 Forvo 中搜索所选单词
 * 使用闭包保存 contextMenu 的 ID，避免重复创建
 */
const initializeContextMenu = (function () {
  // 用于记录当前右键菜单项的 ID（防止重复创建）
  // contextMenuId 是被闭包捕获的私有变量
  let contextMenuId = null;

  /**
   * 创建一个右键菜单点击事件的处理函数。
   *
   * 该函数返回一个闭包函数，闭包会“记住”传入的 Forvo 搜索地址前缀 `baseUrl`。
   * 当用户在页面上右键选中单词并点击菜单项时，此函数会根据选中文字构造 URL，
   * 并在当前标签页后打开新的标签页，跳转到 Forvo 对应的发音搜索页面。
   *
   * @param {string} baseUrl - Forvo 搜索地址前缀（如：https://zh.forvo.com/search/）
   * @returns {(info, tab) => void}
   * 返回一个事件回调函数，作为点击菜单后的响应处理器
   *
   * @callback OnClickHandler
   * @param {chrome.contextMenus.OnClickData} info - 当前点击事件的上下文信息。
   * @param {string} [info.selectionText] - 用户选中的文本（仅在 contexts 包含 "selection" 时）。
   * @param {string} [info.menuItemId] - 被点击的菜单项 ID。
   * @param {string} [info.pageUrl] - 当前页面的 URL。
   *
   * @param {chrome.tabs.Tab} tab - 当前活动标签页的信息。
   * @param {number} tab.id - 标签页的唯一标识符。
   * @param {string} tab.url - 标签页的 URL。
   * @param {number} tab.index - 标签页在当前窗口中的索引位置。
   * @param {string} tab.title - 标签页的标题。
   */
  function createSearchHandler(baseUrl) {
    // 返回一个函数，作为右键菜单点击事件的处理器
    return function (info, tab) {
      // 获取用户右键选中的文字，并去除首尾空白
      const word = info.selectionText.trim();
      if (!word) return; // 如果选词为空，不执行操作

      // 构造最终搜索 URL，并对其进行编码
      const url = encodeURI(`${baseUrl}${word}`);

      // 在当前标签页后打开新的标签页，访问 Forvo 搜索结果
      chrome.tabs.create({
        index: tab.index + 1, // 新标签页紧跟当前标签页
        url: url, // 要打开的 Forvo 搜索地址
      });
    };
  }

  /**
   * 初始化或更新右键菜单
   *
   * @param {string} baseUrl - 当前选定的 Forvo 页面语言搜索地址
   */
  return function (baseUrl) {
    const handler = createSearchHandler(baseUrl);

    if (!contextMenuId) {
      // 如果菜单还未创建，初始化菜单项
      contextMenuId = chrome.contextMenus.create({
        type: "normal", // 菜单类型为普通菜单项
        title: '使用 Forvo 搜索 "%s"', // 菜单标题，"%s" 会被替换为用户选中的文本
        contexts: ["selection"], // 仅在选中文本时显示该菜单
        onclick: handler, // 点击时执行创建的搜索处理函数
      });
    } else {
      // 如果已存在菜单，更新点击事件处理函数
      chrome.contextMenus.update(contextMenuId, {
        onclick: handler,
      });
    }
  };
})();

/**
 * 初始化插件逻辑：
 * 读取用户设置，并使用对应语言配置右键菜单功能
 */
getUserSettings()
  .then((settings) => {
    const baseUrl = settings.pageLang; // 获取当前用户选择的 Forvo 搜索语言地址
    initializeContextMenu(baseUrl); // 根据用户设置初始化右键菜单
  })
  .catch((err) => {
    console.warn("读取用户设置失败，使用默认语言配置。", err);
    initializeContextMenu(DEFAULT_FORVO_URL); // 使用默认语言前缀
  });

/**
 * 监听用户设置变更，实时更新右键菜单语言配置
 */
chrome.storage.onChanged.addListener((changes) => {
  if (changes.pageLang) {
    // 如果 pageLang（Forvo语言地址）发生变化
    initializeContextMenu(changes.pageLang.newValue); // 使用新的地址更新右键菜单
  }
});
