import { SupportedLangCode } from "@/common/constants";
import { initOptionsPageSelects, saveOptionsPageSettings } from "./settings";

function initOptionsPage(): void {
  const langSelectEl = document.querySelector<HTMLSelectElement>("#langSelect");
  const subdomainSelectEl =
    document.querySelector<HTMLSelectElement>("#subdomainSelect");
  const saveButtonEl = document.querySelector<HTMLButtonElement>("#saveButton");

  if (!langSelectEl || !subdomainSelectEl || !saveButtonEl) {
    console.error("[Options] Required elements not found in DOM.");
    return;
  }

  // 初始化下拉框
  initOptionsPageSelects(langSelectEl, subdomainSelectEl);

  saveButtonEl.addEventListener("click", () => {
    const langCode = langSelectEl.value as SupportedLangCode;
    const subdomaiCode = subdomainSelectEl.value as SupportedLangCode;
    saveOptionsPageSettings(langCode, subdomaiCode);
  });
}

// 等待页面 DOM 加载完成后执行初始化逻辑
window.addEventListener("DOMContentLoaded", initOptionsPage);
