import {
  DEFAULT_LANG_CODE,
  extractLangCode,
} from "../common/utils.js";
import { CONTEXT_MENU_TITLES } from "../common/locales.js";

const CONTEXT_MENU_ID = "forvo-lookup"; // 默认右键菜单 ID

/**
 * 创建右键菜单项，用于触发 Forvo 搜索。
 *
 * @param {string} langCode 语言代码，用于设置多语言菜单标题。
 * @param {string} [contextMenuId=CONTEXT_MENU_ID] 菜单项的唯一 ID。
 */
const createContextMenu = (langCode, contextMenuId = CONTEXT_MENU_ID) => {
  const menuTitle =
    CONTEXT_MENU_TITLES[langCode] || CONTEXT_MENU_TITLES[DEFAULT_LANG_CODE]; // 根据语言取对应菜单标题模板

  // 移除已有菜单，避免重复创建
  chrome.contextMenus.removeAll().then(() => {
    chrome.contextMenus.create({
      id: contextMenuId,
      title: menuTitle,
      type: "normal",
      contexts: ["selection"], // 仅当用户选中文本时显示菜单
    });
  });
};

/**
 * 初始化右键菜单，根据设置中的语言 URL。
 *
 * @exports
 * @param {string} forvoBaseUrl
 */
const setupContextMenu = (forvoBaseUrl) => {
  const langCode = extractLangCode(forvoBaseUrl);
  createContextMenu(langCode);
};

/**
 * 处理右键菜单点击事件，跳转到 Forvo 搜索页面。
 *
 * 当用户在网页中选中文本并通过右键菜单触发搜索时，将自动构造对应的 Forvo 搜索链接，
 * 并在新标签页中打开搜索结果页面。
 *
 * @param {chrome.contextMenus.OnClickData} info 包含上下文信息的对象，
 *   如 选中的文本（`info.selectionText`）、菜单项 ID 等。
 * @param {chrome.tabs.Tab} tab 当前激活的标签页对象，用于确定新标签页的打开位置。
 * @param {string} forvoBaseUrl Forvo 搜索的基础 URL，
 *   如 `"https://zh.forvo.com/search/"`, `"https://forvo.com/search/"` 等。
 * @param {string} [contextMenuId=CONTEXT_MENU_ID] 要处理的菜单项 ID，用于确保只响应本插件创建的菜单事件。
 */
const handleContextMenuClick = (
  info,
  tab,
  forvoBaseUrl,
  contextMenuId = CONTEXT_MENU_ID
) => {
  if (info.menuItemId !== contextMenuId) return;

  const selectedText = info.selectionText?.trim(); // 获取用户选中的文本，并去除首尾空白
  if (!selectedText) return; // 若为空，不处理

  const searchUrl = `${forvoBaseUrl}${encodeURIComponent(selectedText)}`; // 构造完整搜索 URL

  chrome.tabs.create({
    index: tab.index + 1, // 新标签页紧跟当前标签页
    url: searchUrl, // 要打开的 Forvo 搜索地址
  });
};

/**
 * 注册右键菜单点击监听器。
 *
 * @exports
 * @param {() => string} getBaseUrlFn - 获取当前 base URL 的函数（避免闭包值失效）
 */
const registerContextMenuClickListener = (getBaseUrlFn) => {
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    handleContextMenuClick(info, tab, getBaseUrlFn());
  });
};

/**
 * 监听 `chrome.storage` 中的 `forvoBaseUrl` 变化，
 * 并在变化时调用回调函数、更新右键菜单。
 *
 * @exports
 * @param {(newUrl: string) => void} onUrlChange - 当 `forvoBaseUrl` 改变时执行的回调函数
 */
const observeForvoUrlChanges = (onUrlChange) => {
  chrome.storage.onChanged.addListener((changes) => {
    const newUrl = changes.forvoBaseUrl?.newValue;
    if (newUrl) {
      onUrlChange(newUrl);
      setupContextMenu(newUrl);

      console.log(
        "语言切换为：",
        extractLangCode(newUrl),
        "搜索地址为：",
        newUrl
      );
    }
  });
};

export {
  setupContextMenu,
  registerContextMenuClickListener,
  observeForvoUrlChanges,
};
