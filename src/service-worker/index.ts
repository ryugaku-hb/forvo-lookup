import { SupportedLangCode } from "@/common/constants";
import { loadUserSettings } from "./settings";
import {
  setupContextMenu,
  registerContextMenuClickListener,
  observeForvoSettingsChanges,
} from "./context-menu";

let currentSubdomainCode: SupportedLangCode;

/**
 * 执行初始化流程
 */
async function initializeExtension(): Promise<void> {
  const { langCode, subdomainCode } = await loadUserSettings();
  currentSubdomainCode = subdomainCode;

  setupContextMenu(langCode);
  registerContextMenuClickListener(() => currentSubdomainCode);
  observeForvoSettingsChanges({
    onSubdomainCodeChange: (newSubdomainCode) => {
      currentSubdomainCode = newSubdomainCode;
    },
  });
}

// 启动插件初始化
initializeExtension();
