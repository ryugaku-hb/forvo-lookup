import { LANGUAGES, getUILocalization } from "../../common/locales.js";

/**
 * 渲染语言下拉框。
 *
 * 根据语言列表 `LANGUAGES` 动态创建 `<select>` 元素的 `<optgroup>` 和 `<option>` 结构，
 * 并将结果渲染到指定的 `<select>` 元素中。
 *
 * Note: 会清空传入的 `langSelectEl` 内容并重新插入 DOM 元素。
 *
 * 默认渲染结构示例：
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
  langSelectEl.innerHTML = ""; // 清空内容

  /**
   * 创建一个语言分组选项 `<optgroup>` 元素。
   *
   * @param {string} label `<optgroup>` 标签的文本，例如 `"🌍 常用语言"`, `"🌐 其他语言"`
   * @param {Array<{code: string, name: string}>} options 语言选项数组，每项包含 `code` 和 `name`
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

  langSelectEl.appendChild(createOptionsGroup("🌍 常用语言", LANGUAGES.common));
  langSelectEl.appendChild(createOptionsGroup("🌐 其他语言", LANGUAGES.others));
};

/**
 * 根据语言代码更新所有带有 `data-i18n` 的元素文本。
 *
 * @param {string} langCode 语言代码，例如 `"en"`, `"ja"`, `"zh-CN"`
 */
const updateTextByLang = (langCode) => {
  const fallbackLang = "zh";
  const uiTextMap =
    getUILocalization(langCode) || getUILocalization(fallbackLang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (uiTextMap[key]) {
      el.textContent = uiTextMap[key];
    } else {
      console.warn(`Missing i18n key: ${key}`);
    }
  });
};

export { renderLanguageSelect, updateTextByLang };
