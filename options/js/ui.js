import { getLocalizedTextMap } from "./i18n.js";

/**
 * 根据语言代码更新页面文本
 *
 * @param {string} langCode - 语言代码，例如 "en"、"ja"、"zh-CN"
 */
export function updateTextByLang(langCode) {
  const localizedTextMap = getLocalizedTextMap(langCode);

  document.getElementById("settingsTitle").textContent =
    localizedTextMap.settingsTitleText;
  document.getElementById("langSelectLabel").textContent =
    localizedTextMap.langSelectLabelText;
  document.getElementById("saveButton").textContent =
    localizedTextMap.saveButtonText;
}
