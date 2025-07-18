import {
  DEFAULT_LANG_CODE,
  DEFAULT_SUBDOMAIN_CODE,
  STORAGE_KEYS,
  SupportedLangCode,
} from "@/common/constants";
import { resolveOptionsPageUIStrings } from "@/common/localization";
import {
  renderLanguageSelectOptions,
  renderSubdomainSelectOptions,
  updateOptionsPageTexts,
} from "./ui";

/**
 * 初始化 Options 页面下拉框
 * @param langSelectEl
 * @param subdomainSelectEl
 */
export async function initOptionsPageSelects(
  langSelectEl: HTMLSelectElement,
  subdomainSelectEl: HTMLSelectElement
): Promise<void> {
  const result = await chrome.storage.local.get([
    STORAGE_KEYS.FORVO_LANG_CODE,
    STORAGE_KEYS.FORVO_SUBDOMAIN_CODE,
  ]);

  const langCode =
    typeof result[STORAGE_KEYS.FORVO_LANG_CODE] === "string"
      ? result[STORAGE_KEYS.FORVO_LANG_CODE]
      : DEFAULT_LANG_CODE;
  const subdomainCode =
    typeof result[STORAGE_KEYS.FORVO_SUBDOMAIN_CODE] === "string"
      ? result[STORAGE_KEYS.FORVO_SUBDOMAIN_CODE]
      : DEFAULT_SUBDOMAIN_CODE;

  // 渲染语言下拉框
  renderLanguageSelectOptions(langSelectEl);
  langSelectEl.value = langCode;

  // 渲染子域名下拉框
  renderSubdomainSelectOptions(subdomainSelectEl);
  subdomainSelectEl.value = subdomainCode;

  // 更新页面文案
  updateOptionsPageTexts(langCode);
}

/**
 * 保存 Options 页面用户设置
 * @param langCode 用户选择的语言代码
 * @param subdomainCode 用户选择的地区代码
 */
export async function saveOptionsPageSettings(
  langCode: SupportedLangCode,
  subdomainCode: SupportedLangCode
): Promise<void> {
  await chrome.storage.local.set({
    [STORAGE_KEYS.FORVO_LANG_CODE]: langCode,
    [STORAGE_KEYS.FORVO_SUBDOMAIN_CODE]: subdomainCode,
  });
  
  // 保存后立即更新页面文本
  updateOptionsPageTexts(langCode);
  // 获取本地化提示信息
  const { saveSuccessMessage } =
    resolveOptionsPageUIStrings(langCode) ??
    resolveOptionsPageUIStrings(DEFAULT_LANG_CODE);
  alert(saveSuccessMessage ?? "Settings saved successfully.");
}
