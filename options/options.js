// 根据语言代码生成对应的 Forvo 搜索 URL 前缀
// 例如 "zh" => "https://zh.forvo.com/search/"
const langPrefix = (langCode) => `https://${langCode}.forvo.com/search/`;

// 默认语言代码（中文）
const DEFAULT_LANG_CODE = "zh";
// 默认搜索地址（https://zh.forvo.com/search/）
const DEFAULT_SEARCH_URL = langPrefix(DEFAULT_LANG_CODE);

// 等待页面 DOM 加载完成后执行初始化逻辑
document.addEventListener("DOMContentLoaded", () => {
  // 获取语言选择下拉框和保存按钮的 DOM 元素引用
  const langSelectEl = document.getElementById("langSelect");
  const saveButtonEl = document.getElementById("save");

  // 从 `chrome.storage.local` 中读取已保存的 `pageLang` 设置
  chrome.storage.local.get(["pageLang"]).then((result) => {
    // 如果未设置，则使用默认的中文（zh）搜索地址
    const currentUrl = result.pageLang || DEFAULT_SEARCH_URL;

    // 使用正则表达式从 URL 中提取语言代码
    // 例如 "https://zh.forvo.com" => "zh"
    const currentLang =
      currentUrl.match(/^https:\/\/(.*?)\.forvo\.com/)?.[1] ||
      DEFAULT_LANG_CODE;

    // 将提取到的语言代码设为下拉框的当前选中项
    langSelectEl.value = currentLang;
  });

  // 点击“保存”按钮后，保存用户选择的新语言设置
  saveButtonEl.onclick = () => {
    // 获取用户当前选择的语言代码
    const langCode = langSelectEl.value;
    // 构造对应语言的 Forvo 搜索 URL
    const searchUrl = langPrefix(langCode);

    // 将新搜索地址保存到 `chrome.storage.local` 中
    chrome.storage.local.set({ pageLang: searchUrl }).then(() => {
      // 保存完成后提示用户
      alert("设置已保存！");
    });
  };
});
