import { DEFAULT_LANG_CODE } from "../../common/forvoUtils.js";

/**
 * i18n 多语言文本字典
 * 每种语言包括界面标题、标签、按钮文本和保存提示。
 */
const i18n = {
  de: {
    settingsTitleText: "Forvo Lookup Einstellungen",
    languageSelectLabelText: "Forvo Seiten-Sprache:",
    saveButtonText: "Speichern",
    saveSuccessMessage: "Einstellungen gespeichert!",
  },
  en: {
    settingsTitleText: "Forvo Lookup Settings",
    languageSelectLabelText: "Forvo Page Language:",
    saveButtonText: "Save",
    saveSuccessMessage: "Settings saved!",
  },
  es: {
    settingsTitleText: "Configuración de Forvo Lookup",
    languageSelectLabelText: "Idioma de la página Forvo:",
    saveButtonText: "Guardar",
    saveSuccessMessage: "¡Configuración guardada!",
  },
  fr: {
    settingsTitleText: "Paramètres Forvo Lookup",
    languageSelectLabelText: "Langue de la page Forvo :",
    saveButtonText: "Enregistrer",
    saveSuccessMessage: "Paramètres enregistrés !",
  },
  it: {
    settingsTitleText: "Impostazioni Forvo Lookup",
    languageSelectLabelText: "Lingua della pagina Forvo:",
    saveButtonText: "Salva",
    saveSuccessMessage: "Impostazioni salvate!",
  },
  ja: {
    settingsTitleText: "Forvo Lookup 設定",
    languageSelectLabelText: "Forvo ページの言語：",
    saveButtonText: "保存",
    saveSuccessMessage: "設定が保存されました！",
  },
  nl: {
    settingsTitleText: "Forvo Lookup-instellingen",
    languageSelectLabelText: "Forvo-pagina taal:",
    saveButtonText: "Opslaan",
    saveSuccessMessage: "Instellingen opgeslagen!",
  },
  pl: {
    settingsTitleText: "Ustawienia Forvo Lookup",
    languageSelectLabelText: "Język strony Forvo:",
    saveButtonText: "Zapisz",
    saveSuccessMessage: "Ustawienia zapisane!",
  },
  pt: {
    settingsTitleText: "Configurações do Forvo Lookup",
    languageSelectLabelText: "Idioma da página Forvo:",
    saveButtonText: "Salvar",
    saveSuccessMessage: "Configurações salvas!",
  },
  ru: {
    settingsTitleText: "Настройки Forvo Lookup",
    languageSelectLabelText: "Язык страницы Forvo:",
    saveButtonText: "Сохранить",
    saveSuccessMessage: "Настройки сохранены!",
  },
  tr: {
    settingsTitleText: "Forvo Lookup Ayarları",
    languageSelectLabelText: "Forvo Sayfa Dili:",
    saveButtonText: "Kaydet",
    saveSuccessMessage: "Ayarlar kaydedildi!",
  },
  zh: {
    settingsTitleText: "Forvo Lookup 设置",
    languageSelectLabelText: "Forvo 页面语言：",
    saveButtonText: "保存",
    saveSuccessMessage: "设置已保存！",
  },
  // 可以继续添加其他语言
  ar: {
    settingsTitleText: "إعدادات Forvo Lookup",
    languageSelectLabelText: "لغة صفحة Forvo:",
    saveButtonText: "حفظ",
    saveSuccessMessage: "تم حفظ الإعدادات!",
  },
  bg: {
    settingsTitleText: "Настройки на Forvo Lookup",
    languageSelectLabelText: "Език на страницата Forvo:",
    saveButtonText: "Запазване",
    saveSuccessMessage: "Настройките са запазени!",
  },
  bs: {
    settingsTitleText: "Postavke za Forvo Lookup",
    languageSelectLabelText: "Jezik Forvo stranice:",
    saveButtonText: "Sačuvaj",
    saveSuccessMessage: "Postavke su sačuvane!",
  },
  ca: {
    settingsTitleText: "Configuració de Forvo Lookup",
    languageSelectLabelText: "Idioma de la pàgina Forvo:",
    saveButtonText: "Desa",
    saveSuccessMessage: "Configuració desada!",
  },
  cs: {
    settingsTitleText: "Nastavení Forvo Lookup",
    languageSelectLabelText: "Jazyk stránky Forvo:",
    saveButtonText: "Uložit",
    saveSuccessMessage: "Nastavení uložena!",
  },
  da: {
    settingsTitleText: "Forvo Lookup Indstillinger",
    languageSelectLabelText: "Forvo-sidesprog:",
    saveButtonText: "Gem",
    saveSuccessMessage: "Indstillinger gemt!",
  },
  el: {
    settingsTitleText: "Ρυθμίσεις Forvo Lookup",
    languageSelectLabelText: "Γλώσσα σελίδας Forvo:",
    saveButtonText: "Αποθήκευση",
    saveSuccessMessage: "Οι ρυθμίσεις αποθηκεύτηκαν!",
  },
  eu: {
    settingsTitleText: "Forvo Lookup ezarpenak",
    languageSelectLabelText: "Forvo orriaren hizkuntza:",
    saveButtonText: "Gorde",
    saveSuccessMessage: "Ezarpenak gorde dira!",
  },
  fa: {
    settingsTitleText: "تنظیمات Forvo Lookup",
    languageSelectLabelText: "زبان صفحه Forvo:",
    saveButtonText: "ذخیره",
    saveSuccessMessage: "تنظیمات ذخیره شد!",
  },
  fi: {
    settingsTitleText: "Forvo Lookup Asetukset",
    languageSelectLabelText: "Forvo-sivun kieli:",
    saveButtonText: "Tallenna",
    saveSuccessMessage: "Asetukset tallennettu!",
  },
  hak: {
    settingsTitleText: "Forvo Lookup 設定",
    languageSelectLabelText: "Forvo 頁面語言：",
    saveButtonText: "保存",
    saveSuccessMessage: "設定已保存！",
  },
  he: {
    settingsTitleText: "הגדרות Forvo Lookup",
    languageSelectLabelText: "שפת דף Forvo:",
    saveButtonText: "שמור",
    saveSuccessMessage: "ההגדרות נשמרו!",
  },
  hi: {
    settingsTitleText: "Forvo Lookup सेटिंग्स",
    languageSelectLabelText: "Forvo पृष्ठ भाषा:",
    saveButtonText: "सहेजें",
    saveSuccessMessage: "सेटिंग्स सहेजी गईं!",
  },
  hr: {
    settingsTitleText: "Postavke za Forvo Lookup",
    languageSelectLabelText: "Jezik Forvo stranice:",
    saveButtonText: "Spremi",
    saveSuccessMessage: "Postavke su spremljene!",
  },
  hu: {
    settingsTitleText: "Forvo Lookup beállítások",
    languageSelectLabelText: "Forvo oldal nyelve:",
    saveButtonText: "Mentés",
    saveSuccessMessage: "Beállítások mentve!",
  },
  hy: {
    settingsTitleText: "Forvo Lookup Կարգավորումներ",
    languageSelectLabelText: "Forvo էջի լեզուն՝",
    saveButtonText: "Պահպանել",
    saveSuccessMessage: "Կարգավորումները պահպանվել են!",
  },
  ind: {
    settingsTitleText: "Pengaturan Forvo Lookup",
    languageSelectLabelText: "Bahasa halaman Forvo:",
    saveButtonText: "Simpan",
    saveSuccessMessage: "Pengaturan disimpan!",
  },
  ko: {
    settingsTitleText: "Forvo Lookup 설정",
    languageSelectLabelText: "Forvo 페이지 언어:",
    saveButtonText: "저장",
    saveSuccessMessage: "설정이 저장되었습니다!",
  },
  ku: {
    settingsTitleText: "Mîhengan Forvo Lookup",
    languageSelectLabelText: "Zimanê rûpelê Forvo:",
    saveButtonText: "Hildan",
    saveSuccessMessage: "Mîhengên hate hilanîn!",
  },
  lv: {
    settingsTitleText: "Forvo Lookup iestatījumi",
    languageSelectLabelText: "Forvo lapas valoda:",
    saveButtonText: "Saglabāt",
    saveSuccessMessage: "Iestatījumi saglabāti!",
  },
  no: {
    settingsTitleText: "Forvo Lookup Innstillinger",
    languageSelectLabelText: "Forvo-sidespråk:",
    saveButtonText: "Lagre",
    saveSuccessMessage: "Innstillinger lagret!",
  },
  pa: {
    settingsTitleText: "Forvo Lookup ਸੈਟਿੰਗਜ਼",
    languageSelectLabelText: "Forvo ਪੇਜ਼ ਦੀ ਭਾਸ਼ਾ:",
    saveButtonText: "ਸੰਭਾਲੋ",
    saveSuccessMessage: "ਸੈਟਿੰਗਜ਼ ਸੰਭਾਲੇ ਗਏ!",
  },
  ro: {
    settingsTitleText: "Setări Forvo Lookup",
    languageSelectLabelText: "Limba paginii Forvo:",
    saveButtonText: "Salvează",
    saveSuccessMessage: "Setările au fost salvate!",
  },
  sk: {
    settingsTitleText: "Nastavenia Forvo Lookup",
    languageSelectLabelText: "Jazyk stránky Forvo:",
    saveButtonText: "Uložiť",
    saveSuccessMessage: "Nastavenia uložené!",
  },
  sr: {
    settingsTitleText: "Подешавања Forvo Lookup",
    languageSelectLabelText: "Језик Forvo странице:",
    saveButtonText: "Сачувај",
    saveSuccessMessage: "Подешавања су сачувана!",
  },
  sv: {
    settingsTitleText: "Forvo Lookup Inställningar",
    languageSelectLabelText: "Forvo-sidans språk:",
    saveButtonText: "Spara",
    saveSuccessMessage: "Inställningar sparade!",
  },
  th: {
    settingsTitleText: "การตั้งค่า Forvo Lookup",
    languageSelectLabelText: "ภาษาหน้า Forvo:",
    saveButtonText: "บันทึก",
    saveSuccessMessage: "บันทึกการตั้งค่าแล้ว!",
  },
  tt: {
    settingsTitleText: "Forvo Lookup Көйләүләр",
    languageSelectLabelText: "Forvo битенең теле:",
    saveButtonText: "Саклау",
    saveSuccessMessage: "Көйләүләр сакланды!",
  },
  uk: {
    settingsTitleText: "Налаштування Forvo Lookup",
    languageSelectLabelText: "Мова сторінки Forvo:",
    saveButtonText: "Зберегти",
    saveSuccessMessage: "Налаштування збережено!",
  },
  vi: {
    settingsTitleText: "Cài đặt Forvo Lookup",
    languageSelectLabelText: "Ngôn ngữ trang Forvo:",
    saveButtonText: "Lưu",
    saveSuccessMessage: "Đã lưu cài đặt!",
  },
  yue: {
    settingsTitleText: "Forvo Lookup 設定",
    languageSelectLabelText: "Forvo 頁面語言：",
    saveButtonText: "保存",
    saveSuccessMessage: "設定已保存！",
  },
};

/**
 * @typedef {object} LocalizedTextMap
 * @property {string} buttonLabel
 * @property {string} title
 * @property {string} description
 * @property {string} tooltip
 */

/**
 *
 * @param {string} langCode 语言代码，例如 "en"、"ja"、"zh"
 * @returns {LocalizedTextMap} 包含按钮、标题等 UI 文本的对象
 */
export function getLocalizedTextMap(langCode) {
  return i18n[langCode] || i18n[DEFAULT_LANG_CODE];
}
