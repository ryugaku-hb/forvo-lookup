// 根据语言代码更新页面文本
function updateTextByLang(lang) {
  const texts = i18n[lang] || i18n[DEFAULT_LANG_CODE];
  document.getElementById("title").textContent = texts.title;
  document.getElementById("label").textContent = texts.label;
  document.getElementById("save").textContent = texts.saveButton;
}

window.updateTextByLang = updateTextByLang;
