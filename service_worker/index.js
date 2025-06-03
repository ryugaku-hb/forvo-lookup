import { loadUserSettings, watchStorageChanges } from "./settings.js";
import { createContextMenu, handleContextMenuClick } from "./contextMenu.js";
import { extractLangCode } from "./lang.js";

let currentForvoBaseUrl; // 默认的 Forvo 搜索地址（中文）

/**
 * 执行初始化流程
 */
async function initializeExtension() {
  // 从本地存储中读取用户设置的 Forvo 搜索地址（如 https://ja.forvo.com/search/）
  const settings = await loadUserSettings();
  currentForvoBaseUrl = settings.forvoBaseUrl;

  // 提取语言代码（如 zh、ja 等），并创建对应语言的右键菜单项
  createContextMenu(extractLangCode(currentForvoBaseUrl));

  // 当用户点击右键菜单项时触发的事件处理逻辑
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    // 使用当前语言对应的搜索地址跳转 Forvo 页面
    handleContextMenuClick(info, tab, currentForvoBaseUrl);
  });

  // 监听 chrome.storage 中 forvoBaseUrl 的变化，动态更新搜索地址与菜单语言
  watchStorageChanges((newForvoBaseUrl) => {
    currentForvoBaseUrl = newForvoBaseUrl;

    const newLangCode = extractLangCode(currentForvoBaseUrl);
    createContextMenu(newLangCode);
    console.log("语言切换为：", newLangCode, "搜索地址为：", currentForvoBaseUrl);
  });
}

// 启动插件初始化
initializeExtension();
