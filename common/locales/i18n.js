import { DEFAULT_LANG_CODE } from "../utils/forvoUtils.js";
/**
 * 本地化字符串 `i18n`
 *
 * 用于设置页面的本地化文案。
 * 针对每种语言，定义一组本地化字符串（如按钮文本、标签、提示信息）。
 */
const i18n = {
  de: {
    settingsTitleText: "Forvo Lookup Einstellungen",
    langSelectLabelText: "Forvo Seiten-Sprache:",
    saveButtonText: "Speichern",
    saveSuccessMessage: "Einstellungen gespeichert!",
  },
  en: {
    settingsTitleText: "Forvo Lookup Settings",
    langSelectLabelText: "Forvo Page Language:",
    saveButtonText: "Save",
    saveSuccessMessage: "Settings saved!",
  },
  es: {
    settingsTitleText: "Configuración de Forvo Lookup",
    langSelectLabelText: "Idioma de la página Forvo:",
    saveButtonText: "Guardar",
    saveSuccessMessage: "¡Configuración guardada!",
  },
  fr: {
    settingsTitleText: "Paramètres Forvo Lookup",
    langSelectLabelText: "Langue de la page Forvo :",
    saveButtonText: "Enregistrer",
    saveSuccessMessage: "Paramètres enregistrés !",
  },
  it: {
    settingsTitleText: "Impostazioni Forvo Lookup",
    langSelectLabelText: "Lingua della pagina Forvo:",
    saveButtonText: "Salva",
    saveSuccessMessage: "Impostazioni salvate!",
  },
  ja: {
    settingsTitleText: "Forvo Lookup 設定",
    langSelectLabelText: "Forvo ページの言語：",
    saveButtonText: "保存",
    saveSuccessMessage: "設定が保存されました！",
  },
  nl: {
    settingsTitleText: "Forvo Lookup-instellingen",
    langSelectLabelText: "Forvo-pagina taal:",
    saveButtonText: "Opslaan",
    saveSuccessMessage: "Instellingen opgeslagen!",
  },
  pl: {
    settingsTitleText: "Ustawienia Forvo Lookup",
    langSelectLabelText: "Język strony Forvo:",
    saveButtonText: "Zapisz",
    saveSuccessMessage: "Ustawienia zapisane!",
  },
  pt: {
    settingsTitleText: "Configurações do Forvo Lookup",
    langSelectLabelText: "Idioma da página Forvo:",
    saveButtonText: "Salvar",
    saveSuccessMessage: "Configurações salvas!",
  },
  ru: {
    settingsTitleText: "Настройки Forvo Lookup",
    langSelectLabelText: "Язык страницы Forvo:",
    saveButtonText: "Сохранить",
    saveSuccessMessage: "Настройки сохранены!",
  },
  tr: {
    settingsTitleText: "Forvo Lookup Ayarları",
    langSelectLabelText: "Forvo Sayfa Dili:",
    saveButtonText: "Kaydet",
    saveSuccessMessage: "Ayarlar kaydedildi!",
  },
  zh: {
    settingsTitleText: "Forvo Lookup 设置",
    langSelectLabelText: "Forvo 页面语言：",
    saveButtonText: "保存",
    saveSuccessMessage: "设置已保存！",
  },
  // 可以继续添加其他语言
  ar: {
    settingsTitleText: "إعدادات Forvo Lookup",
    langSelectLabelText: "لغة صفحة Forvo:",
    saveButtonText: "حفظ",
    saveSuccessMessage: "تم حفظ الإعدادات!",
  },
  bg: {
    settingsTitleText: "Настройки на Forvo Lookup",
    langSelectLabelText: "Език на страницата Forvo:",
    saveButtonText: "Запазване",
    saveSuccessMessage: "Настройките са запазени!",
  },
  bs: {
    settingsTitleText: "Postavke za Forvo Lookup",
    langSelectLabelText: "Jezik Forvo stranice:",
    saveButtonText: "Sačuvaj",
    saveSuccessMessage: "Postavke su sačuvane!",
  },
  ca: {
    settingsTitleText: "Configuració de Forvo Lookup",
    langSelectLabelText: "Idioma de la pàgina Forvo:",
    saveButtonText: "Desa",
    saveSuccessMessage: "Configuració desada!",
  },
  cs: {
    settingsTitleText: "Nastavení Forvo Lookup",
    langSelectLabelText: "Jazyk stránky Forvo:",
    saveButtonText: "Uložit",
    saveSuccessMessage: "Nastavení uložena!",
  },
  da: {
    settingsTitleText: "Forvo Lookup Indstillinger",
    langSelectLabelText: "Forvo-sidesprog:",
    saveButtonText: "Gem",
    saveSuccessMessage: "Indstillinger gemt!",
  },
  el: {
    settingsTitleText: "Ρυθμίσεις Forvo Lookup",
    langSelectLabelText: "Γλώσσα σελίδας Forvo:",
    saveButtonText: "Αποθήκευση",
    saveSuccessMessage: "Οι ρυθμίσεις αποθηκεύτηκαν!",
  },
  eu: {
    settingsTitleText: "Forvo Lookup ezarpenak",
    langSelectLabelText: "Forvo orriaren hizkuntza:",
    saveButtonText: "Gorde",
    saveSuccessMessage: "Ezarpenak gorde dira!",
  },
  fa: {
    settingsTitleText: "تنظیمات Forvo Lookup",
    langSelectLabelText: "زبان صفحه Forvo:",
    saveButtonText: "ذخیره",
    saveSuccessMessage: "تنظیمات ذخیره شد!",
  },
  fi: {
    settingsTitleText: "Forvo Lookup Asetukset",
    langSelectLabelText: "Forvo-sivun kieli:",
    saveButtonText: "Tallenna",
    saveSuccessMessage: "Asetukset tallennettu!",
  },
  hak: {
    settingsTitleText: "Forvo Lookup 設定",
    langSelectLabelText: "Forvo 頁面語言：",
    saveButtonText: "保存",
    saveSuccessMessage: "設定已保存！",
  },
  he: {
    settingsTitleText: "הגדרות Forvo Lookup",
    langSelectLabelText: "שפת דף Forvo:",
    saveButtonText: "שמור",
    saveSuccessMessage: "ההגדרות נשמרו!",
  },
  hi: {
    settingsTitleText: "Forvo Lookup सेटिंग्स",
    langSelectLabelText: "Forvo पृष्ठ भाषा:",
    saveButtonText: "सहेजें",
    saveSuccessMessage: "सेटिंग्स सहेजी गईं!",
  },
  hr: {
    settingsTitleText: "Postavke za Forvo Lookup",
    langSelectLabelText: "Jezik Forvo stranice:",
    saveButtonText: "Spremi",
    saveSuccessMessage: "Postavke su spremljene!",
  },
  hu: {
    settingsTitleText: "Forvo Lookup beállítások",
    langSelectLabelText: "Forvo oldal nyelve:",
    saveButtonText: "Mentés",
    saveSuccessMessage: "Beállítások mentve!",
  },
  hy: {
    settingsTitleText: "Forvo Lookup Կարգավորումներ",
    langSelectLabelText: "Forvo էջի լեզուն՝",
    saveButtonText: "Պահպանել",
    saveSuccessMessage: "Կարգավորումները պահպանվել են!",
  },
  ind: {
    settingsTitleText: "Pengaturan Forvo Lookup",
    langSelectLabelText: "Bahasa halaman Forvo:",
    saveButtonText: "Simpan",
    saveSuccessMessage: "Pengaturan disimpan!",
  },
  ko: {
    settingsTitleText: "Forvo Lookup 설정",
    langSelectLabelText: "Forvo 페이지 언어:",
    saveButtonText: "저장",
    saveSuccessMessage: "설정이 저장되었습니다!",
  },
  ku: {
    settingsTitleText: "Mîhengan Forvo Lookup",
    langSelectLabelText: "Zimanê rûpelê Forvo:",
    saveButtonText: "Hildan",
    saveSuccessMessage: "Mîhengên hate hilanîn!",
  },
  lv: {
    settingsTitleText: "Forvo Lookup iestatījumi",
    langSelectLabelText: "Forvo lapas valoda:",
    saveButtonText: "Saglabāt",
    saveSuccessMessage: "Iestatījumi saglabāti!",
  },
  no: {
    settingsTitleText: "Forvo Lookup Innstillinger",
    langSelectLabelText: "Forvo-sidespråk:",
    saveButtonText: "Lagre",
    saveSuccessMessage: "Innstillinger lagret!",
  },
  pa: {
    settingsTitleText: "Forvo Lookup ਸੈਟਿੰਗਜ਼",
    langSelectLabelText: "Forvo ਪੇਜ਼ ਦੀ ਭਾਸ਼ਾ:",
    saveButtonText: "ਸੰਭਾਲੋ",
    saveSuccessMessage: "ਸੈਟਿੰਗਜ਼ ਸੰਭਾਲੇ ਗਏ!",
  },
  ro: {
    settingsTitleText: "Setări Forvo Lookup",
    langSelectLabelText: "Limba paginii Forvo:",
    saveButtonText: "Salvează",
    saveSuccessMessage: "Setările au fost salvate!",
  },
  sk: {
    settingsTitleText: "Nastavenia Forvo Lookup",
    langSelectLabelText: "Jazyk stránky Forvo:",
    saveButtonText: "Uložiť",
    saveSuccessMessage: "Nastavenia uložené!",
  },
  sr: {
    settingsTitleText: "Подешавања Forvo Lookup",
    langSelectLabelText: "Језик Forvo странице:",
    saveButtonText: "Сачувај",
    saveSuccessMessage: "Подешавања су сачувана!",
  },
  sv: {
    settingsTitleText: "Forvo Lookup Inställningar",
    langSelectLabelText: "Forvo-sidans språk:",
    saveButtonText: "Spara",
    saveSuccessMessage: "Inställningar sparade!",
  },
  th: {
    settingsTitleText: "การตั้งค่า Forvo Lookup",
    langSelectLabelText: "ภาษาหน้า Forvo:",
    saveButtonText: "บันทึก",
    saveSuccessMessage: "บันทึกการตั้งค่าแล้ว!",
  },
  tt: {
    settingsTitleText: "Forvo Lookup Көйләүләр",
    langSelectLabelText: "Forvo битенең теле:",
    saveButtonText: "Саклау",
    saveSuccessMessage: "Көйләүләр сакланды!",
  },
  uk: {
    settingsTitleText: "Налаштування Forvo Lookup",
    langSelectLabelText: "Мова сторінки Forvo:",
    saveButtonText: "Зберегти",
    saveSuccessMessage: "Налаштування збережено!",
  },
  vi: {
    settingsTitleText: "Cài đặt Forvo Lookup",
    langSelectLabelText: "Ngôn ngữ trang Forvo:",
    saveButtonText: "Lưu",
    saveSuccessMessage: "Đã lưu cài đặt!",
  },
  yue: {
    settingsTitleText: "Forvo Lookup 設定",
    langSelectLabelText: "Forvo 頁面語言：",
    saveButtonText: "保存",
    saveSuccessMessage: "設定已保存！",
  },
};

/**
 * @typedef {object} LocalizedUIText
 * 本地化的设置页面 UI 文本映射。
 *
 * @property {string} settingsTitleText 设置页面的标题
 * @property {string} langSelectLabelText 语言选择标签的文本
 * @property {string} saveButtonText 保存按钮的文本
 * @property {string} saveSuccessMessage 保存成功时的提示消息
 */

/**
 * 根据语言代码返回对应的本地化 UI 文本。
 *
 * @param {string} langCode 语言代码，例如 `"en"`, `"ja"`, `"zh"`
 * @returns {LocalizedUIText} 包含设置页面各项文本的对象
 *
 * @example
 * const uiTextMap = getUILocalization("ja");
 * console.log(uiTextMap.settingsTitleText); // Forvo Lookup 設定
 * console.log(uiTextMap.langSelectLabelText); // Forvo ページの言語：
 * console.log(uiTextMap.saveButtonText); // 保存
 * console.log(uiTextMap.saveSuccessMessage); // 設定が保存されました！
 */
const getUILocalization = (langCode) => {
  return i18n[langCode] || i18n[DEFAULT_LANG_CODE];
};

export { getUILocalization };
