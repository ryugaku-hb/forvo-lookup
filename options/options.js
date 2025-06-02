/**
 * 根据语言代码生成对应的 Forvo 搜索 URL 前缀
 *
 * @example
 * langPrefix("zh") // "https://zh.forvo.com/search/"
 *
 * @param {string} langCode
 * @returns {string}
 */
function langPrefix(langCode) {
  return langCode === "en"
    ? "https://forvo.com/search/" // 英文没有前缀
    : `https://${langCode}.forvo.com/search/`;
}

// 默认搜索地址 "https://zh.forvo.com/search/"
const DEFAULT_SEARCH_URL = langPrefix(window.DEFAULT_LANG_CODE);

/**
 * 提取语言代码
 *
 * 从 forvo.com 或 xx.forvo.com 形式中识别。
 *
 * @param {string} url
 * @returns  }
 */
function extractLangCode(url) {
  if (url === "https://forvo.com/search/") return "en"; // 特殊处理英文

  const match = url.match(/^https:\/\/(.*?)\.forvo\.com/);
  return match ? match[1] : window.DEFAULT_LANG_CODE;
}

// 等待页面 DOM 加载完成后执行初始化逻辑
document.addEventListener("DOMContentLoaded", () => {
  const langSelectEl = document.getElementById("langSelect");
  const saveButtonEl = document.getElementById("save");

  chrome.storage.local.get(["pageLang"]).then((result) => {
    // 如果未设置，则使用默认的中文（zh）搜索地址
    const currentUrl = result.pageLang || DEFAULT_SEARCH_URL;
    const currentLangCode = extractLangCode(currentUrl);

    // 将提取到的语言代码设为下拉框的当前选中项
    langSelectEl.value = currentLangCode;
    window.updateTextByLang(currentLangCode);
  });

  // 点击“保存”按钮后，保存用户选择的新语言设置
  saveButtonEl.onclick = () => {
    // 获取用户当前选择的语言代码
    const langCode = langSelectEl.value;
    // 构造对应语言的 Forvo 搜索 URL
    const searchUrl = langPrefix(langCode);

    chrome.storage.local.set({ pageLang: searchUrl }).then(() => {
      window.updateTextByLang(langCode);
      alert(
        window.i18n[langCode]?.alertSaved ||
          window.i18n[window.DEFAULT_LANG_CODE].alertSaved
      );
    });
  };
});
