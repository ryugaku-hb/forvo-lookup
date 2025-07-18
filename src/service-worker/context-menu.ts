import { STORAGE_KEYS, SupportedLangCode } from "@/common/constants";
import { resolveContextMenuTitle } from "@/common/localization";
import { getForvoBaseUrlBySubdomain } from "@/common/utils";

/** 右键菜单项 ID 常量 */
const CONTEXT_MENU_IDS = {
  SEARCH: "forvo-search",
  WORD_PAGE: "forvo-word-page",
} as const;

type ContextMenuId = (typeof CONTEXT_MENU_IDS)[keyof typeof CONTEXT_MENU_IDS];

/**
 * 创建一个右键菜单项
 * @param id 菜单项的 ID
 * @param title 菜单显示的标题文本

 */
function createContextMenuItem(id: ContextMenuId, title: string): void {
  chrome.contextMenus.create({
    id,
    title,
    type: "normal",
    contexts: ["selection"], // 仅当选中文本时显示
  });
}

/**
 * 初始化右键菜单
 * @param langCode 当前语言代码，用于获取菜单标题文本
 */
export async function setupContextMenu(
  langCode: SupportedLangCode
): Promise<void> {
  // 移除已有菜单，避免重复创建
  await chrome.contextMenus.removeAll();
  createContextMenuItem(
    CONTEXT_MENU_IDS.SEARCH,
    resolveContextMenuTitle(langCode, "SEARCH")
  );
  createContextMenuItem(
    CONTEXT_MENU_IDS.WORD_PAGE,
    resolveContextMenuTitle(langCode, "WORD_PAGE")
  );
}

/**
 * 根据菜单项 ID、关键词和子域名生成对应的 Forvo 页面 URL
 * @param menuItemId 菜单项 ID
 * @param word 用户选中的词
 * @param subdomainCode
 * @returns 返回生成的 Forvo URL，若 `menuItemId` 无效返回 `null`。
 * @example
 * getContextMenuUrl(CONTEXT_MENU_IDS.SEARCH, "hello", "en");
 * // "https://en.forvo.com/search/hello/"
 * getContextMenuUrl(CONTEXT_MENU_IDS.WORD_PAGE, "ありがとう", "ja");
 * // "https://ja.forvo.com/word/ありがとう/"
 */
function getContextMenuUrl(
  menuItemId: ContextMenuId,
  word: string,
  subdomainCode: SupportedLangCode
): string | null {
  const baseUrl = getForvoBaseUrlBySubdomain(subdomainCode);

  // 菜单 ID 与 URL 模板映射表
  const urlMap: Record<ContextMenuId, string> = {
    [CONTEXT_MENU_IDS.SEARCH]: `${baseUrl}/search/${word}/`,
    [CONTEXT_MENU_IDS.WORD_PAGE]: `${baseUrl}/word/${word}/`,
  };

  return urlMap[menuItemId] ?? null;
}

/**
 * 处理右键菜单点击事件，打开新标签页访问对应的 Forvo 页面
 * @param subdomainCode 当前 Forvo 语言子域名代码
 * @param info 包含上下文信息的对象
 * @param tab 当前激活的标签页对象
 */
function handleContextMenuClick(
  subdomainCode: SupportedLangCode,
  info: chrome.contextMenus.OnClickData,
  tab?: chrome.tabs.Tab
): void {
  const { menuItemId, selectionText } = info;
  if (!menuItemId || typeof selectionText !== "string") return;

  const trimmedWord = selectionText.trim();
  if (!trimmedWord) return;

  const encodedWord = encodeURIComponent(trimmedWord);
  const url = getContextMenuUrl(
    menuItemId as ContextMenuId,
    encodedWord,
    subdomainCode
  );

  if (!url) {
    console.warn(`[contextMenu] Invalid menuItemId: ${menuItemId}`);
    return;
  }

  chrome.tabs.create({
    index: tab ? tab.index + 1 : undefined, // 新标签紧邻当前页
    url,
  });
}

/**
 * 注册右键菜单点击监听器
 * @param getSubdomainCodeFn 获取当前 Forvo 子域名代码的函数
 */
export function registerContextMenuClickListener(
  getSubdomainCodeFn: () => SupportedLangCode
): void {
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    handleContextMenuClick(getSubdomainCodeFn(), info, tab);
  });
}

/**
 * 监听 `chrome.storage.local` 中 Forvo 设置变化，变化时调用回调
 * @param callbacks 可选的回调对象，用于在设置变化时执行额外逻辑
 */
export function observeForvoSettingsChanges(
  callbacks: {
    onLangCodeChange?: (newLangCode: SupportedLangCode) => void;
    onSubdomainCodeChange?: (newSubdomainCode: SupportedLangCode) => void;
  } = {}
): void {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    // 只关心本地存储变化
    if (areaName !== "local") return;

    const langChange = changes[STORAGE_KEYS.FORVO_LANG_CODE];
    const subdomainChange = changes[STORAGE_KEYS.FORVO_SUBDOMAIN_CODE];

    // 语言代码变化
    if (langChange?.newValue && typeof langChange.newValue === "string") {
      const newLangCode = langChange.newValue as SupportedLangCode;
      setupContextMenu(newLangCode); // 更新右键菜单
      callbacks.onLangCodeChange?.(newLangCode); // 可选触发回调
    }

    // 子域名变化
    if (
      subdomainChange?.newValue &&
      typeof subdomainChange.newValue === "string"
    ) {
      const newSubdomainCode = subdomainChange.newValue as SupportedLangCode;
      callbacks.onSubdomainCodeChange?.(newSubdomainCode); // 仅触发可选回调
    }
  });
}
