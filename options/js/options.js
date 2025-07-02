import { initSelect, saveSetting } from "./settings.js";

// 等待页面 DOM 加载完成后执行初始化逻辑
document.addEventListener("DOMContentLoaded", () => {
  const langSelectEl = document.getElementById("langSelect");
  const subdomainSelectEl = document.getElementById("subdomainSelect");
  const saveButtonEl = document.getElementById("saveButton");

  initSelect(langSelectEl, subdomainSelectEl);

  saveButtonEl.addEventListener("click", () => {
    const langCode = langSelectEl.value;
    const subdomaiCode = subdomainSelectEl.value;
    saveSetting(langCode, subdomaiCode);
  });
});
