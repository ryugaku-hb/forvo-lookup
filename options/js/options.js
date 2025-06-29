import { initLanguageSelect, saveLanguageSetting } from "./languageSettings.js";

// 等待页面 DOM 加载完成后执行初始化逻辑
document.addEventListener("DOMContentLoaded", () => {
  const langSelectEl = document.getElementById("langSelect");
  const saveButtonEl = document.getElementById("saveButton");

  initLanguageSelect(langSelectEl);

  saveButtonEl.onclick = () => {
    saveLanguageSetting(langSelectEl.value);
  };
});
