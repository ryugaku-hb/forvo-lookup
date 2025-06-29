import { languages, getLocalizedTextMap } from "./i18n.js";

/**
 * 渲染语言下拉框。
 *
 * 根据语言列表 `languages` 动态创建 `<select>` 元素的 `<optgroup>` 和 `<option>`。
 * 会渲染成如下格式：
 *
 * ```html
 * <select id="langSelect">
 *  <optgroup label="🌍 常用语言">
 *    <option value="de">Deutsch</option>
 *    <option value="en">English</option>
 *    ...
 *  </optgroup>
 *  <optgroup label="🌐 其他语言">
 *    <option value="ar">العربية</option>
 *    <option value="bg">Български</option>
 *    ...
 *  </optgroup>
 * </select>
 * ```
 *
 * @param {HTMLSelectElement} langSelectEl 要渲染语言选项的 `<select>` 元素
 */
const renderLanguageSelect = (langSelectEl) => {
  // 先清空已有内容，防止重复渲染
  langSelectEl.innerHTML = "";

  /**
   * 创建一个语言分组选项 `<optgroup>` 元素。
   *
   * @param {string} label `<optgroup>` 标签的文本，例如 `"🌍 常用语言"`
   * @param {Array<{code: string, name: string}>} options 语言选项数组，每项包含代码和名称
   * @returns {HTMLOptGroupElement} 创建好的 `<optgroup>` 元素
   */
  const createOptionsGroup = (label, options) => {
    const group = document.createElement("optgroup");
    group.label = label;
    options.forEach(({ code, name }) => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = name;
      group.appendChild(option);
    });
    return group;
  };

  langSelectEl.appendChild(createOptionsGroup("🌍 常用语言", languages.common));
  langSelectEl.appendChild(createOptionsGroup("🌐 其他语言", languages.others));
};

/**
 * 根据语言代码更新页面文本。
 *
 * @param {string} langCode 语言代码，例如 `"en"`, `"ja"`, `"zh-CN"`
 */
const updateTextByLang = (langCode) => {
  const localizedTextMap = getLocalizedTextMap(langCode);

  document.getElementById("settingsTitle").textContent =
    localizedTextMap.settingsTitleText;
  document.getElementById("langSelectLabel").textContent =
    localizedTextMap.langSelectLabelText;
  document.getElementById("saveButton").textContent =
    localizedTextMap.saveButtonText;
};

export { renderLanguageSelect, updateTextByLang };
