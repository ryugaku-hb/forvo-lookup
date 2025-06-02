import { MENU_TITLES } from "./lang.js";

// 默认菜单 ID，可供外部引用
export const CONTEXT_MENU_ID = "forvo-lookup";

/**
 * 创建右键菜单项，用于触发 Forvo 搜索。
 *
 * @param {string} langCode - 语言代码，用于设置多语言菜单标题。
 * @param {string} [menuId = CONTEXT_MENU_ID] - 菜单项的唯一 ID。 用于在点击时识别来源。
 */
export function createContextMenu(langCode, menuId = CONTEXT_MENU_ID) {
  // 根据语言取对应菜单标题模板
  const titleTemplate = MENU_TITLES[langCode] || MENU_TITLES.zh;

  // 移除已有菜单，避免重复创建
  chrome.contextMenus.removeAll().then(() => {
    chrome.contextMenus.create({
      id: menuId,
      title: titleTemplate,
      type: "normal",
      contexts: ["selection"], // 仅当用户选中文本时显示菜单
    });
  });
}

/**
 * 处理右键菜单点击事件，打开 Forvo 搜索页面。
 *
 * @param {chrome.contextMenus.OnClickData} info - 点击菜单时的上下文信息（包含选中的文本等）。
 * @param {chrome.tabs.Tab} tab - 当前激活的标签页对象，用于控制新标签打开的位置。
 * @param {string} baseUrl - Forvo 搜索的基础地址，例如 "https://zh.forvo.com/search/"。
 * @param {string} [menuId = CONTEXT_MENU_ID] - 要处理的菜单项 ID，防止响应非本插件菜单事件。
 * @returns
 */
export function handleContextMenuClick(
  info,
  tab,
  baseUrl,
  menuId = CONTEXT_MENU_ID
) {
  if (info.menuItemId !== menuId) return;

  // 获取用户右键选中的文字，并去除首尾空白
  const word = info.selectionText?.trim();
  if (!word) return; // 若为空，不处理

  // 构造完整搜索地址
  const url = `${baseUrl}${encodeURIComponent(word)}`;

  // 在当前标签页后打开新标签进行搜索
  chrome.tabs.create({
    index: tab.index + 1, // 新标签页紧跟当前标签页
    url: url, // 要打开的 Forvo 搜索地址
  });
}
