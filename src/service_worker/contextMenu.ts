import {
  CONTEXT_MENU_IDS,
  CONTEXT_MENU_TYPE,
  STORAGE_KEYS,
  SupportedLangCode,
  ContextMenuId,
} from "@/common/constants";
import { getMenuTitle } from "@/common/locales";
import { getForvoBaseUrlBySubdomain } from "@/common/utils";

/**
 * 创建一个右键菜单项。
 *
 * @param {ContextMenuId} id 菜单项 ID
 * @param {string} title 菜单显示的标题文本
 */
const createMenuItem = (id: ContextMenuId, title: string): void => {
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
 * @param {SupportedLangCode} langCode 当前语言代码，用于获取菜单标题文本
 */
export const setupContextMenu = (langCode: SupportedLangCode): void => {
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
 * @param {ContextMenuId} menuItemId 菜单项 ID
 * @param {string} word 用户选中的词
 * @param {SupportedLangCode} subdomainCode
 * @returns {(string | null)} 返回生成的 Forvo URL，若 `menuItemId` 无效返回 null。
 *
 * @example
 * getContextMenuUrl(CONTEXT_MENU_IDS.SEARCH, "hello", "en");
 * // "https://en.forvo.com/search/hello/"
 * getContextMenuUrl(CONTEXT_MENU_IDS.WORD_PAGE, "ありがとう", "ja");
 * // "https://ja.forvo.com/word/ありがとう/"
 */
const getContextMenuUrl = (
  menuItemId: ContextMenuId,
  word: string,
  subdomainCode: SupportedLangCode
): string | null => {
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
 * 处理右键菜单点击事件，打开新标签页访问对应的 Forvo 页面。
 *
 * @param {SupportedLangCode} subdomainCode 当前 Forvo 语言子域名代码
 * @param {chrome.contextMenus.OnClickData} info 包含上下文信息的对象
 * @param {?chrome.tabs.Tab} [tab] 当前激活的标签页对象
 */
const handleContextMenuClick = (
  subdomainCode: SupportedLangCode,
  info: chrome.contextMenus.OnClickData,
  tab?: chrome.tabs.Tab
): void => {
  const { menuItemId, selectionText } = info;
  const typedMenuId = menuItemId as ContextMenuId;

  if (typeof selectionText !== "string" || !selectionText.trim()) return;

  const encoded = encodeURIComponent(selectionText.trim());
  const url = getContextMenuUrl(typedMenuId, encoded, subdomainCode);
  if (!url) return;

  chrome.tabs.create({
    index: tab ? tab.index + 1 : undefined,
    url,
  });
};

/**
 * 注册右键菜单点击监听器。
 *
 * @param {() => SupportedLangCode} getSubdomainCodeFn 获取当前 Forvo 子域名代码的函数
 */
export const registerContextMenuClickListener = (
  getSubdomainCodeFn: () => SupportedLangCode
): void => {
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    handleContextMenuClick(getSubdomainCodeFn(), info, tab);
  });
};

interface ForvoSettingsCallbacks {
  onLangCodeChange?: (newLangCode: SupportedLangCode) => void;
  onSubdomainCodeChange?: (newSubdomainCode: SupportedLangCode) => void;
}

/**
 * 监听 `chrome.storage.local` 中 Forvo 设置的变化，变化时调用对应回调。
 *
 * @param {ForvoSettingsCallbacks} [callbacks={}] 可选回调函数对象
 */
export const observeForvoSettingsChanges = (
  callbacks: ForvoSettingsCallbacks = {}
): void => {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "local") return;

    const langChange = changes[STORAGE_KEYS.FORVO_LANG_CODE];
    const subdomainChange = changes[STORAGE_KEYS.FORVO_SUBDOMAIN_CODE];

    if (langChange?.newValue) {
      const newLangCode = langChange.newValue as SupportedLangCode;
      setupContextMenu(newLangCode); // 更新右键菜单
      callbacks.onLangCodeChange?.(newLangCode); // 可选触发回调
    }

    if (subdomainChange?.newValue) {
      const newSubdomainCode = subdomainChange.newValue as SupportedLangCode;
      callbacks.onSubdomainCodeChange?.(newSubdomainCode); // 仅触发可选回调
    }
  });
};
