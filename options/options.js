/**
 * 根据语言代码生成对应的 Forvo 搜索 URL 前缀
 *
 * @example
 * langPrefix("zh") // "https://zh.forvo.com/search/"
 *
 * @param {string} langCode
 * @returns {string}
 */
const langPrefix = (langCode) => `https://${langCode}.forvo.com/search/`;

// 默认搜索地址（https://zh.forvo.com/search/）
const DEFAULT_SEARCH_URL = langPrefix(window.DEFAULT_LANG_CODE);

// 等待页面 DOM 加载完成后执行初始化逻辑
document.addEventListener("DOMContentLoaded", () => {
  const langSelectEl = document.getElementById("langSelect");
  const saveButtonEl = document.getElementById("save");

  chrome.storage.local.get(["pageLang"]).then((result) => {
    // 如果未设置，则使用默认的中文（zh）搜索地址
    const currentUrl = result.pageLang || DEFAULT_SEARCH_URL;

    // 使用正则表达式从 URL 中提取语言代码。 例如 "https://zh.forvo.com" => "zh"
    const currentLang =
      currentUrl.match(/^https:\/\/(.*?)\.forvo\.com/)?.[1] ||
      window.DEFAULT_LANG_CODE;

    // 将提取到的语言代码设为下拉框的当前选中项
    langSelectEl.value = currentLang;

    window.updateTextByLang(currentLang);
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
