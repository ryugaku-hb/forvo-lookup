import { DEFAULT_LANG_CODE, SupportedLangCode } from "@/common/constants";
import {
  getSupportedLanguages,
  getLanguagesInGroup,
  resolveOptionsPageUIStrings,
  OptionsPageUIStrings,
  LanguageItem,
} from "@/common/localization";
import { getForvoBaseUrlBySubdomain } from "@/common/utils";

/**
 * 创建 `<optgroup>` 选项分组
 * @param label 分组选项的标题
 * @param options 语言选项列表
 */
function createOptionsGroup(
  label: string,
  options: LanguageItem[]
): HTMLOptGroupElement {
  const group = document.createElement("optgroup");
  group.label = label;

  options.forEach(({ code, name }) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = name;
    group.appendChild(option);
  });

  return group;
}

/**
 * 渲染语言选择下拉框 `<select>` 选项
 * @param langSelectEl
 */
export function renderLanguageSelectOptions(
  langSelectEl: HTMLSelectElement
): void {
  // 先清空现有内容，避免重复渲染
  langSelectEl.innerHTML = "";

  // 渲染常用语言 & 其他语言分组
  langSelectEl.appendChild(
    createOptionsGroup("🌍 常用语言", getLanguagesInGroup("common"))
  );
  langSelectEl.appendChild(
    createOptionsGroup("🌐 其他语言", getLanguagesInGroup("others"))
  );
}

/**
 *  渲染子域名选择下拉框 `<select>` 选项
 * @param subdomainSelectEl
 */
export function renderSubdomainSelectOptions(
  subdomainSelectEl: HTMLSelectElement
): void {
  // 清空已有选项
  subdomainSelectEl.innerHTML = "";

  getSupportedLanguages().forEach(({ code, name }) => {
    const url = getForvoBaseUrlBySubdomain(code);
    const option = document.createElement("option");
    option.value = code;
    option.textContent = `${code} (${name}) - ${url}`;
    subdomainSelectEl.appendChild(option);
  });
}

/**
 * 根据 `langCode` 更新 Options 页面所有带有 `data-i18n` 的元素文本
 */
export function updateOptionsPageTexts(langCode: SupportedLangCode): void {
  // 获取对应语言的本地化文本
  const uiStrings =
    resolveOptionsPageUIStrings(langCode) ||
    resolveOptionsPageUIStrings(DEFAULT_LANG_CODE);

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n") as
      | keyof OptionsPageUIStrings
      | null;

    if (key && uiStrings[key]) {
      el.textContent = uiStrings[key];
    } else {
      console.warn(
        `[i18n] Missing translation for key "${key}" in lang "${langCode}"`
      );
    }
  });
}
