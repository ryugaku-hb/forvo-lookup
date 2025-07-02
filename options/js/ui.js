import { DEFAULT_LANG_CODE } from "../../common/constants/index.js";
import {
  getAllLanguages,
  getLanguagesByCategory,
  getUILocalization,
} from "../../common/locales/index.js";
import { getForvoBaseUrlBySubdomain } from "../../common/utils/index.js";

/**
 * 渲染语言下拉框。
 *
 * 基于 LANGUAGES 数据生成两个 optgroup：
 * - 常用语言（LANGUAGES.common）
 * - 其他语言（LANGUAGES.others）
 *
 * 渲染结构：
 * ```html
 * <select>
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
 * @param {HTMLSelectElement} langSelectEl 要渲染的 `<select>` 元素
 */
const renderLanguageSelect = (langSelectEl) => {
  langSelectEl.innerHTML = ""; // 清空内容

  /**
   * 创建 `<optgroup>` 容器
   *
   * @param {string} label 分组选项的标题
   * @param {Array<{code: string, name: string}>} options
   * @returns {HTMLOptGroupElement}
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

  langSelectEl.appendChild(
    createOptionsGroup("🌍 常用语言", getLanguagesByCategory("common"))
  );
  langSelectEl.appendChild(
    createOptionsGroup("🌐 其他语言", getLanguagesByCategory("others"))
  );
};

/**
 * 渲染 Forvo 子域名选择器（用于指定使用哪个语言子域名）。
 *
 * 每个选项的显示形式为： <语言代码> - <完整域名>，如：
 * - `en - forvo.com`
 * - `ja - ja.forvo.com`
 *
 * 实际 `<option>` 值为 `subdomainCode`，用于进一步生成请求 URL。
 *
 * @param {HTMLSelectElement} subdomainSelectEl
 */
const renderSubdomainSelect = (subdomainSelectEl) => {
  subdomainSelectEl.innerHTML = ""; // 清空已有选项

  getAllLanguages().forEach(({ code, name }) => {
    console.log(code, name);

    const url = getForvoBaseUrlBySubdomain(code);
    const option = document.createElement("option");
    option.value = code;
    option.textContent = `${code} (${name}) - ${url}`;
    subdomainSelectEl.appendChild(option);
  });
};

/**
 * 根据 `langCode` 更新所有带有 `data-i18n` 的元素文本。
 *
 * @param {string} langCode 如 `"en"`, `"ja"`, `"zh"`
 */
const updateTextByLangCode = (langCode) => {
  const uiTextMap =
    getUILocalization(langCode) || getUILocalization(DEFAULT_LANG_CODE);

  console.log(uiTextMap);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (uiTextMap[key]) {
      el.textContent = uiTextMap[key];
    } else {
      console.warn(`Missing i18n key: ${key}`);
    }
  });
};

export { renderLanguageSelect, renderSubdomainSelect, updateTextByLangCode };
