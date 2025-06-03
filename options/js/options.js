const DEFAULT_FORVO_BASE_URL = window.lang.getForvoBaseUrl(
  window.lang.DEFAULT_LANG_CODE
); // 默认搜索地址 "https://zh.forvo.com/search/"

// 等待页面 DOM 加载完成后执行初始化逻辑
document.addEventListener("DOMContentLoaded", () => {
  const langSelectEl = document.getElementById("langSelect");
  const saveButtonEl = document.getElementById("saveButton");

  chrome.storage.local.get(["forvoBaseUrl"]).then((result) => {
    // 如果未设置，则使用默认的中文（zh）搜索地址
    const currentForvoBaseUrl = result.forvoBaseUrl || DEFAULT_FORVO_BASE_URL;
    const currentLangCode = window.lang.extractLangCode(currentForvoBaseUrl);

    // 将提取到的语言代码设为下拉框的当前选中项
    langSelectEl.value = currentLangCode;
    window.ui.updateTextByLangCode(currentLangCode);
  });

  // 点击“保存”按钮后，保存用户选择的新语言设置
  saveButtonEl.onclick = () => {
    // 获取用户当前选择的语言代码
    const langCode = langSelectEl.value;
    // 构造对应语言的 Forvo 搜索 URL
    const forvoBaseUrl = window.lang.getForvoBaseUrl(langCode);

    chrome.storage.local.set({ forvoBaseUrl: forvoBaseUrl }).then(() => {
      window.ui.updateTextByLangCode(langCode);

      alert(
        window.lang.i18n[langCode]?.saveSuccessMessage ||
          window.lang.i18n[window.lang.DEFAULT_LANG_CODE].saveSuccessMessage
      );
    });
  };
});
