window.ui = (() => {
  /**
   * 根据语言代码更新页面文本
   *
   * @param {string} langCode - 语言代码，例如 "en"、"ja"、"zh-CN"
   */
  function updateTextByLangCode(langCode) {
    const localizedTextMap =
      window.lang.i18n[langCode] || window.lang.i18n[DEFAULT_LANG_CODE];

    document.getElementById("settingsTitle").textContent =
      localizedTextMap.settingsTitleText;
    document.getElementById("langSelectLabel").textContent =
      localizedTextMap.langSelectLabelText;
    document.getElementById("saveButton").textContent =
      localizedTextMap.saveButtonText;
  }

  return { updateTextByLangCode };
})();
