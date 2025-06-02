import { loadUserSettings, watchStorageChanges } from "./settings.js";
import { createContextMenu, handleContextMenuClick } from "./contextMenu.js";

// 默认的 Forvo 搜索地址（中文）
let currentBaseUrl;

/**
 * 执行初始化流程
 */
async function init() {
  const settings = await loadUserSettings();
  currentBaseUrl = settings.pageLang;

  createContextMenu();
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    handleContextMenuClick(info, tab, currentBaseUrl);
  });

  watchStorageChanges((newUrl) => {
    currentBaseUrl = newUrl;
  });
}

// 启动插件初始化
init();
