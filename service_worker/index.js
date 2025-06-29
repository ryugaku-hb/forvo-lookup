import { loadUserSettings } from "./settings.js";
import {
  setupContextMenu,
  registerContextMenuClickListener,
  observeForvoUrlChanges,
} from "./contextMenu.js";

/**
 * 默认的 Forvo 搜索地址（中文）
 */
let currentForvoBaseUrl;

/**
 * 执行初始化流程
 *
 * @async
 */
const initializeExtension = async () => {
  // 从本地存储中读取用户设置的 Forvo 搜索地址（如 https://ja.forvo.com/search/）
  const settings = await loadUserSettings();
  currentForvoBaseUrl = settings.forvoBaseUrl;

  setupContextMenu(currentForvoBaseUrl);
  registerContextMenuClickListener(() => currentForvoBaseUrl);
  observeForvoUrlChanges((newUrl) => {
    currentForvoBaseUrl = newUrl;
  });
};

// 启动插件初始化
initializeExtension();
