import { DEFAULT_LANG_CODE, SupportedLangCode } from "@/common/constants";
import {
  getAllLanguages,
  getLanguagesByCategory,
  getUILocalization,
  LocalizedUIText,
  LanguageItem,
} from "@/common/locales";
import { getForvoBaseUrlBySubdomain } from "@/common/utils";

export const renderLanguageSelect = (langSelectEl: HTMLSelectElement): void => {
  langSelectEl.innerHTML = ""; // 清空内容

  /**
   * 创建 `<optgroup>` 容器
   *
   * @param {string} label 分组选项的标题
   * @param {LanguageItem[]} options
   * @returns {HTMLOptGroupElement}
   */
  const createOptionsGroup = (
    label: string,
    options: LanguageItem[]
  ): HTMLOptGroupElement => {
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

export const renderSubdomainSelect = (
  subdomainSelectEl: HTMLSelectElement
): void => {
  subdomainSelectEl.innerHTML = ""; // 清空已有选项

  getAllLanguages().forEach(({ code, name }) => {
    const url = getForvoBaseUrlBySubdomain(code);
    const option = document.createElement("option");
    option.value = code;
    option.textContent = `${code} (${name}) - ${url}`;
    subdomainSelectEl.appendChild(option);
  });
};

/**
 * 根据 `langCode` 更新所有带有 `data-i18n` 的元素文本。
 */
export const updateTextByLangCode = (langCode: SupportedLangCode): void => {
  const uiTextMap =
    getUILocalization(langCode) || getUILocalization(DEFAULT_LANG_CODE);

  console.log(uiTextMap);

  type I18nKey = keyof LocalizedUIText;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n") as I18nKey | null;
    if (key && uiTextMap[key]) {
      el.textContent = uiTextMap[key];
    } else {
      console.warn(`Missing i18n key: ${key}`);
    }
  });
};
