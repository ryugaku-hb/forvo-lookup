import {
  DEFAULT_LANG_CODE,
  getForvoBaseUrl,
  extractLangCode,
} from "../../common/utils/forvoUtils.js";
import { getUILocalization } from "../../common/locales/index.js";
import { updateTextByLang, renderLanguageSelect } from "./ui.js";

/**
 * 初始化语言下拉框选项，并根据存储的设置更新当前语言。
 *
 * 会从 `chrome.storage` 中读取 `forvoBaseUrl`，根据其提取语言代码并：
 * - 渲染语言选择框
 * - 设置当前选中值
 * - 更新页面多语言文本
 *
 * @async
 * @param {HTMLSelectElement} langSelectEl 要填充语言选项的 `<select>` 元素
 * @returns {Promise<void>} 表示初始化完成
 */
const initLanguageSelect = async (langSelectEl) => {
  const result = await chrome.storage.local.get(["forvoBaseUrl"]);
  const forvoBaseUrl =
    result.forvoBaseUrl || getForvoBaseUrl(DEFAULT_LANG_CODE);
  const langCode = extractLangCode(forvoBaseUrl);

  renderLanguageSelect(langSelectEl);
  langSelectEl.value = langCode;
  updateTextByLang(langCode);
};

/**
 * 保存用户选择的语言设置到本地存储，并更新页面文本。
 * 成功后会弹出本地化的保存成功提示。
 *
 * @param {string} langCode 语言代码，如 `"en"`, `"ja"`, `"zh"`
 */
const saveLanguageSetting = (langCode) => {
  const forvoBaseUrl = getForvoBaseUrl(langCode);
  chrome.storage.local.set({ forvoBaseUrl: forvoBaseUrl }).then(() => {
    updateTextByLang(langCode);
    alert(getUILocalization(langCode).saveSuccessMessage);
  });
};

export { initLanguageSelect, saveLanguageSetting };
