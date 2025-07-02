import { loadUserSettings } from "./settings.js";
import {
  setupContextMenu,
  registerContextMenuClickListener,
  observeForvoSettingsChanges,
} from "./contextMenu.js";

let currentSubdomainCode;

/**
 * 执行初始化流程
 *
 * @async
 */
const initializeExtension = async () => {
  const { langCode, subdomainCode } = await loadUserSettings();
  currentSubdomainCode = subdomainCode;

  setupContextMenu(langCode);
  registerContextMenuClickListener(() => currentSubdomainCode);
  observeForvoSettingsChanges({
    onSubdomainCodeChange: (newSubdomainCode) => {
      currentSubdomainCode = newSubdomainCode;
    },
  });
};

// 启动插件初始化
initializeExtension();
