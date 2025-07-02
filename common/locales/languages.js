/**
 * 语言列表 `LANGUAGES`
 *
 * 用于界面上显示语言选项。
 * 这里定义了支持的语言集合，每个语言有 `code` 和 `name`，
 * 方便在界面上渲染语言选择菜单。
 */
const LANGUAGES = {
  common: [
    { code: "de", name: "Deutsch" },
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "it", name: "Italiano" },
    { code: "ja", name: "日本語" },
    { code: "nl", name: "Nederlands" },
    { code: "pl", name: "Polski" },
    { code: "pt", name: "Português" },
    { code: "ru", name: "Русский" },
    { code: "tr", name: "Türkçe" },
    { code: "zh", name: "汉语" },
  ],
  others: [
    { code: "ar", name: "العربية" },
    { code: "bg", name: "Български" },
    { code: "bs", name: "Bosanski" },
    { code: "ca", name: "Català" },
    { code: "cs", name: "Čeština" },
    { code: "da", name: "Dansk" },
    { code: "el", name: "Ελληνικά" },
    { code: "eu", name: "Euskara" },
    { code: "fa", name: "پارسی" },
    { code: "fi", name: "Suomi" },
    { code: "hak", name: "客家语" },
    { code: "he", name: "עברית" },
    { code: "hi", name: "हिन्दी" },
    { code: "hr", name: "Hrvatski" },
    { code: "hu", name: "Magyar" },
    { code: "hy", name: "Հայերեն" },
    { code: "ind", name: "Bahasa Indonesia" },
    { code: "ko", name: "한국어" },
    { code: "ku", name: "Kurdî / كوردی" },
    { code: "lv", name: "Latviešu" },
    { code: "no", name: "Norsk bokmål" },
    { code: "pa", name: "ਪੰਜਾਬੀ" },
    { code: "ro", name: "Română" },
    { code: "sk", name: "Slovenčina" },
    { code: "sr", name: "Српски / Srpski" },
    { code: "sv", name: "Svenska" },
    { code: "th", name: "ไทย" },
    { code: "tt", name: "Татар теле" },
    { code: "uk", name: "Українська" },
    { code: "vi", name: "Tiếng Việt" },
    { code: "yue", name: "粵文" },
  ],
};

/**
 * 获取全部语言
 *
 * @returns {Array<{code: string, name: string}>} 包含所有语言对象的数组
 */
const getAllLanguages = () => {
  return [...LANGUAGES.common, ...LANGUAGES.others];
};

/**
 * 根据分类获取语言列表
 *
 * @param {'common' | 'others'} category 语言分类键
 * @returns {Array<{code: string, name: string}>} 对应分类的语言列表
 */
function getLanguagesByCategory(category) {
  return LANGUAGES[category] || [];
}

/**
 * 根据语言代码获取语言名称
 *
 * @param {string} code 语言代码（如 `'en'`, `'ja'`）
 * @returns {string | null} 返回对应语言名称，若未找到则返回 null
 */
function getLanguageNameByCode(code) {
  const all = getAllLanguages();
  const lang = all.find((item) => item.code === code);
  return lang ? lang.name : null;
}

export { getAllLanguages, getLanguagesByCategory, getLanguageNameByCode };
