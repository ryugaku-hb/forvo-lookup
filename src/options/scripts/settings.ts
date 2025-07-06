import {
  DEFAULT_LANG_CODE,
  DEFAULT_SUBDOMAIN_CODE,
  STORAGE_KEYS,
  SupportedLangCode,
} from "@/common/constants";
import { getUILocalization } from "@/common/locales";
import {
  renderLanguageSelect,
  renderSubdomainSelect,
  updateTextByLangCode,
} from "./ui";

/**
 * 会从 `chrome.storage.local` 中读取数据，然后：
 * 渲染相应选择框，设置选择框当前选中值，更新页面的多语言文本内容
 *
 * @param {HTMLSelectElement} langSelectEl
 * @param {HTMLSelectElement} subdomainSelectEl
 * @returns {Promise<void>} 表示初始化完成
 */
export const initSelect = async (
  langSelectEl: HTMLSelectElement,
  subdomainSelectEl: HTMLSelectElement
): Promise<void> => {
  const result = await chrome.storage.local.get([
    STORAGE_KEYS.FORVO_LANG_CODE,
    STORAGE_KEYS.FORVO_SUBDOMAIN_CODE,
  ]);

  const langCode = result[STORAGE_KEYS.FORVO_LANG_CODE] || DEFAULT_LANG_CODE;
  const subdomainCode =
    result[STORAGE_KEYS.FORVO_SUBDOMAIN_CODE] || DEFAULT_SUBDOMAIN_CODE;

  renderLanguageSelect(langSelectEl);
  langSelectEl.value = langCode;

  renderSubdomainSelect(subdomainSelectEl);
  subdomainSelectEl.value = subdomainCode;

  updateTextByLangCode(langCode);
};

/**
 * 保存用户选择的语言设置到本地存储，并更新页面文本内容。
 * 成功后会显示本地化提示信息。
 *
 * @param {SupportedLangCode} langCode 用户选择的语言代码，如 "zh"
 * @param {SupportedLangCode} subdomainCode 用户选择的地区代码，如 "zh"
 */
export const saveSetting = (langCode: SupportedLangCode, subdomainCode: SupportedLangCode): void => {
  chrome.storage.local
    .set({
      [STORAGE_KEYS.FORVO_LANG_CODE]: langCode,
      [STORAGE_KEYS.FORVO_SUBDOMAIN_CODE]: subdomainCode,
    })
    .then(() => {
      updateTextByLangCode(langCode);

      const { saveSuccessMessage } = getUILocalization(langCode);
      alert(saveSuccessMessage || "Settings saved successfully.");
    });
};
