import { SupportedLangCode } from "@/common/constants";
import { initSelect, saveSetting } from "./settings";

// 等待页面 DOM 加载完成后执行初始化逻辑
window.addEventListener("DOMContentLoaded", () => {
  const langSelectEl = document.getElementById(
    "langSelect"
  ) as HTMLSelectElement;
  const subdomainSelectEl = document.getElementById(
    "subdomainSelect"
  ) as HTMLSelectElement;
  const saveButtonEl = document.getElementById(
    "saveButton"
  ) as HTMLButtonElement;

  initSelect(langSelectEl, subdomainSelectEl);

  saveButtonEl.addEventListener("click", () => {
    const langCode = langSelectEl.value as SupportedLangCode;
    const subdomaiCode = subdomainSelectEl.value as SupportedLangCode;
    saveSetting(langCode, subdomaiCode);
  });
});
