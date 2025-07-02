import {
  CONTEXT_MENU_IDS,
  CONTEXT_MENU_TYPE,
  STORAGE_KEYS,
} from "../common/constants/index.js";
import { getMenuTitle } from "../common/locales/index.js";
import { getForvoBaseUrlBySubdomain } from "../common/utils/index.js";

/**
 * 创建一个右键菜单项。
 *
 * @param {string} id 菜单 ID
 * @param {string} title 菜单显示的标题文本
 */
const createMenuItem = (id, title) => {
  chrome.contextMenus.create({
    id,
    title,
    type: "normal",
    contexts: ["selection"], // 仅当选中文本时显示
  });
};

/**
 * 初始化右键菜单。
 *
 * @param {string} langCode
 */
const setupContextMenu = (langCode) => {
  // 移除已有菜单，避免重复创建
  chrome.contextMenus.removeAll().then(() => {
    createMenuItem(
      CONTEXT_MENU_IDS.SEARCH,
      getMenuTitle(langCode, CONTEXT_MENU_TYPE.SEARCH)
    );
    createMenuItem(
      CONTEXT_MENU_IDS.WORD_PAGE,
      getMenuTitle(langCode, CONTEXT_MENU_TYPE.WORD_PAGE)
    );
  });
};

/**
 * 根据菜单项类型、关键词和子域名生成对应的 Forvo 页面 URL。
 *
 * @param {string} menuItemId 菜单项 ID
 * @param {string} word 用户选中的词
 * @param {string} subdomainCode Forvo 子域名代码，如 `"zh"`, `"en"`, `"ja"`
 * @returns {string|null} 返回生成的 Forvo 链接，若 `menuItemId` 无效则返回 null
 *
 * @example
 * getContextMenuUrl(CONTEXT_MENU_IDS.SEARCH, "hello", "en");
 * // "https://en.forvo.com/search/hello/"
 * getContextMenuUrl(CONTEXT_MENU_IDS.WORD_PAGE, "ありがとう", "ja");
 * // "https://ja.forvo.com/word/ありがとう/"
 */
const getContextMenuUrl = (menuItemId, word, subdomainCode) => {
  const base = getForvoBaseUrlBySubdomain(subdomainCode);
  switch (menuItemId) {
    case CONTEXT_MENU_IDS.SEARCH:
      return `${base}/search/${word}/`;
    case CONTEXT_MENU_IDS.WORD_PAGE:
      return `${base}/word/${word}/`;
    default:
      return null;
  }
};

/**
 * 处理右键菜单点击事件。
 *
 * @param {chrome.contextMenus.OnClickData} info 包含上下文信息的对象
 * @param {chrome.tabs.Tab} tab 当前激活的标签页对象
 * @param {string} subdomainCode
 */
const handleContextMenuClick = (info, tab, subdomainCode) => {
  const { menuItemId, selectionText } = info;
  if (typeof selectionText !== "string" || !selectionText.trim()) return;

  const encoded = encodeURIComponent(selectionText.trim());
  const url = getContextMenuUrl(menuItemId, encoded, subdomainCode);
  if (!url) return;

  chrome.tabs.create({
    index: tab.index + 1,
    url,
  });
};

/**
 * 注册右键菜单点击监听器。
 *
 * @exports
 * @param {() => string} getSubdomainCodeFn - 获取当前 subdomainCode 的函数
 */
const registerContextMenuClickListener = (getSubdomainCodeFn) => {
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    handleContextMenuClick(info, tab, getSubdomainCodeFn());
  });
};

/**
 * 监听 `chrome.storage.local` 中 Forvo 设置项的变化。
 *
 * 监听的键：
 * - {@link STORAGE_KEYS.FORVO_LANG_CODE}（语言代码）
 * - {@link STORAGE_KEYS.FORVO_SUBDOMAIN_CODE}（子域代码）
 *
 * @param {{
 *   onLangCodeChange?: (newLangCode: string) => void,
 *   onSubdomainCodeChange?: (newSubdomainCode: string) => void
 * }} [callbacks={}] 可选的回调函数对象，用于在设置变化时响应。
 */
const observeForvoSettingsChanges = (callbacks = {}) => {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "local") return;

    const langChange = changes[STORAGE_KEYS.FORVO_LANG_CODE];
    const subdomainChange = changes[STORAGE_KEYS.FORVO_SUBDOMAIN_CODE];

    if (langChange?.newValue) {
      const newLangCode = langChange.newValue;
      setupContextMenu(newLangCode); // 更新右键菜单
      callbacks.onLangCodeChange?.(newLangCode); // 可选触发回调
    }

    if (subdomainChange?.newValue) {
      const newSubdomainCode = subdomainChange.newValue;
      callbacks.onSubdomainCodeChange?.(newSubdomainCode); // 仅触发可选回调
    }
  });
};

export {
  setupContextMenu,
  registerContextMenuClickListener,
  observeForvoSettingsChanges,
};
