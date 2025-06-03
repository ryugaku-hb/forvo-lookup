import {
  DEFAULT_LANG_CODE,
  getForvoBaseUrl,
  extractLangCode,
} from "../../common/forvoUtils.js";
import { updateTextByLang } from "./ui.js";
import { getLocalizedTextMap } from "./i18n.js";

const DEFAULT_FORVO_BASE_URL = getForvoBaseUrl(DEFAULT_LANG_CODE); // 如 "https://zh.forvo.com/search/"

// 等待页面 DOM 加载完成后执行初始化逻辑
document.addEventListener("DOMContentLoaded", () => {
  const langSelectEl = document.getElementById("langSelect");
  const saveButtonEl = document.getElementById("saveButton");

  chrome.storage.local.get(["forvoBaseUrl"]).then((result) => {
    // 如果未设置，则使用默认的中文（zh）搜索地址
    const currentForvoBaseUrl = result.forvoBaseUrl || DEFAULT_FORVO_BASE_URL;
    const currentLangCode = extractLangCode(currentForvoBaseUrl);

    // 将提取到的语言代码设为下拉框的当前选中项
    langSelectEl.value = currentLangCode;
    updateTextByLang(currentLangCode);
  });

  // 点击“保存”按钮后，保存用户选择的新语言设置
  saveButtonEl.onclick = () => {
    // 获取用户当前选择的语言代码
    const langCode = langSelectEl.value;
    // 构造对应语言的 Forvo 搜索 URL
    const forvoBaseUrl = getForvoBaseUrl(langCode);

    chrome.storage.local.set({ forvoBaseUrl: forvoBaseUrl }).then(() => {
      updateTextByLang(langCode);
      alert(getLocalizedTextMap(langCode).saveSuccessMessage);
    });
  };
});
