import { DEFAULT_LANG_CODE, SupportedLangCode } from "@/common/constants";

/** Options 页的本地化 UI 文案结构 */
export interface OptionsPageUIStrings {
  /** 设置页面的标题 */
  settingsTitleText: string;
  /** 语言选择标签的文本 */
  langSelectLabelText: string;
  /** 子域名选择标签的文本 */
  subdomainSelectLabelText: string;
  /** 保存按钮的文本 */
  saveButtonText: string;
  /** 保存成功时的提示消息 */
  saveSuccessMessage: string;
}

/** Options 页的本地化文案映射表 */
const OPTIONS_PAGE_UI_MAP: Record<SupportedLangCode, OptionsPageUIStrings> = {
  de: {
    settingsTitleText: "Forvo Lookup Einstellungen",
    langSelectLabelText: "Forvo Seiten-Sprache:",
    subdomainSelectLabelText: "Forvo Sprachseite:",
    saveButtonText: "Speichern",
    saveSuccessMessage: "Einstellungen gespeichert!",
  },
  en: {
    settingsTitleText: "Forvo Lookup Settings",
    langSelectLabelText: "Forvo Page Language:",
    subdomainSelectLabelText: "Forvo Language Site:",
    saveButtonText: "Save",
    saveSuccessMessage: "Settings saved!",
  },
  es: {
    settingsTitleText: "Configuración de Forvo Lookup",
    langSelectLabelText: "Idioma de la página Forvo:",
    subdomainSelectLabelText: "Sitio de idiomas Forvo:",
    saveButtonText: "Guardar",
    saveSuccessMessage: "¡Configuración guardada!",
  },
  fr: {
    settingsTitleText: "Paramètres Forvo Lookup",
    langSelectLabelText: "Langue de la page Forvo :",
    subdomainSelectLabelText: "Site linguistique Forvo :",
    saveButtonText: "Enregistrer",
    saveSuccessMessage: "Paramètres enregistrés !",
  },
  it: {
    settingsTitleText: "Impostazioni Forvo Lookup",
    langSelectLabelText: "Lingua della pagina Forvo:",
    subdomainSelectLabelText: "Sito linguistico Forvo:",
    saveButtonText: "Salva",
    saveSuccessMessage: "Impostazioni salvate!",
  },
  ja: {
    settingsTitleText: "Forvo Lookup 設定",
    langSelectLabelText: "Forvo ページの言語：",
    subdomainSelectLabelText: "Forvo言語サイト：",
    saveButtonText: "保存",
    saveSuccessMessage: "設定が保存されました！",
  },
  nl: {
    settingsTitleText: "Forvo Lookup‑instellingen",
    langSelectLabelText: "Forvo‑pagina taal:",
    subdomainSelectLabelText: "Forvo taalsite:",
    saveButtonText: "Opslaan",
    saveSuccessMessage: "Instellingen opgeslagen!",
  },
  pl: {
    settingsTitleText: "Ustawienia Forvo Lookup",
    langSelectLabelText: "Język strony Forvo:",
    subdomainSelectLabelText: "Witryna językowa Forvo:",
    saveButtonText: "Zapisz",
    saveSuccessMessage: "Ustawienia zapisane!",
  },
  pt: {
    settingsTitleText: "Configurações do Forvo Lookup",
    langSelectLabelText: "Idioma da página Forvo:",
    subdomainSelectLabelText: "Site de idiomas Forvo:",
    saveButtonText: "Salvar",
    saveSuccessMessage: "Configurações salvas!",
  },
  ru: {
    settingsTitleText: "Настройки Forvo Lookup",
    langSelectLabelText: "Язык страницы Forvo:",
    subdomainSelectLabelText: "Языковой сайт Forvo:",
    saveButtonText: "Сохранить",
    saveSuccessMessage: "Настройки сохранены!",
  },
  tr: {
    settingsTitleText: "Forvo Lookup Ayarları",
    langSelectLabelText: "Forvo Sayfa Dili:",
    subdomainSelectLabelText: "Forvo Dil Sitesi:",
    saveButtonText: "Kaydet",
    saveSuccessMessage: "Ayarlar kaydedildi!",
  },
  zh: {
    settingsTitleText: "Forvo Lookup 设置",
    langSelectLabelText: "Forvo 页面语言：",
    subdomainSelectLabelText: "Forvo 语言站点：",
    saveButtonText: "保存",
    saveSuccessMessage: "设置已保存！",
  },
  ar: {
    settingsTitleText: "إعدادات Forvo Lookup",
    langSelectLabelText: "لغة صفحة Forvo:",
    subdomainSelectLabelText: "موقع Forvo للغات:",
    saveButtonText: "حفظ",
    saveSuccessMessage: "تم حفظ الإعدادات!",
  },
  bg: {
    settingsTitleText: "Настройки на Forvo Lookup",
    langSelectLabelText: "Език на страницата Forvo:",
    subdomainSelectLabelText: "Езиков сайт Forvo:",
    saveButtonText: "Запазване",
    saveSuccessMessage: "Настройките са запазени!",
  },
  bs: {
    settingsTitleText: "Postavke za Forvo Lookup",
    langSelectLabelText: "Jezik Forvo stranice:",
    subdomainSelectLabelText: "Forvo jezički sajt:",
    saveButtonText: "Sačuvaj",
    saveSuccessMessage: "Postavke su sačuvane!",
  },
  ca: {
    settingsTitleText: "Configuració de Forvo Lookup",
    langSelectLabelText: "Idioma de la pàgina Forvo:",
    subdomainSelectLabelText: "Lloc d'idiomes Forvo:",
    saveButtonText: "Desa",
    saveSuccessMessage: "Configuració desada!",
  },
  cs: {
    settingsTitleText: "Nastavení Forvo Lookup",
    langSelectLabelText: "Jazyk stránky Forvo:",
    subdomainSelectLabelText: "Jazyková stránka Forvo:",
    saveButtonText: "Uložit",
    saveSuccessMessage: "Nastavení uložena!",
  },
  da: {
    settingsTitleText: "Forvo Lookup Indstillinger",
    langSelectLabelText: "Forvo‑sidesprog:",
    subdomainSelectLabelText: "Forvo sprogside:",
    saveButtonText: "Gem",
    saveSuccessMessage: "Indstillinger gemt!",
  },
  el: {
    settingsTitleText: "Ρυθμίσεις Forvo Lookup",
    langSelectLabelText: "Γλώσσα σελίδας Forvo:",
    subdomainSelectLabelText: "Ιστότοπος Γλωσσών Forvo:",
    saveButtonText: "Αποθήκευση",
    saveSuccessMessage: "Οι ρυθμίσεις αποθηκεύτηκαν!",
  },
  eu: {
    settingsTitleText: "Forvo Lookup ezarpenak",
    langSelectLabelText: "Forvo orriaren hizkuntza:",
    subdomainSelectLabelText: "Forvo hizkuntza gunea:",
    saveButtonText: "Gorde",
    saveSuccessMessage: "Ezarpenak gorde dira!",
  },
  fa: {
    settingsTitleText: "تنظیمات Forvo Lookup",
    langSelectLabelText: "زبان صفحه Forvo:",
    subdomainSelectLabelText: "سایت زبان فوروو:",
    saveButtonText: "ذخیره",
    saveSuccessMessage: "تنظیمات ذخیره شد!",
  },
  fi: {
    settingsTitleText: "Forvo Lookup Asetukset",
    langSelectLabelText: "Forvo‑sivun kieli:",
    subdomainSelectLabelText: "Forvon kielisivusto:",
    saveButtonText: "Tallenna",
    saveSuccessMessage: "Asetukset tallennettu!",
  },
  hak: {
    settingsTitleText: "Forvo Lookup 設定",
    langSelectLabelText: "Forvo 頁面語言：",
    subdomainSelectLabelText: "Forvo 語言站點：",
    saveButtonText: "保存",
    saveSuccessMessage: "設定已保存！",
  },
  he: {
    settingsTitleText: "הגדרות Forvo Lookup",
    langSelectLabelText: "שפת דף Forvo:",
    subdomainSelectLabelText: "אתر שפות פורבו:",
    saveButtonText: "שמור",
    saveSuccessMessage: "ההגדרות נשמרו!",
  },
  hi: {
    settingsTitleText: "Forvo Lookup सेटिंग्स",
    langSelectLabelText: "Forvo पृष्ठ भाषा:",
    subdomainSelectLabelText: "फॉरवो भाषा साइट:",
    saveButtonText: "सहेजें",
    saveSuccessMessage: "सेटिंग्स सहेजी गईं!",
  },
  hr: {
    settingsTitleText: "Postavke za Forvo Lookup",
    langSelectLabelText: "Jezik Forvo stranice:",
    subdomainSelectLabelText: "Forvo jezična stranica:",
    saveButtonText: "Spremi",
    saveSuccessMessage: "Postavke su spremljene!",
  },
  hu: {
    settingsTitleText: "Forvo Lookup beállítások",
    langSelectLabelText: "Forvo oldal nyelve:",
    subdomainSelectLabelText: "Forvo nyelvi oldal:",
    saveButtonText: "Mentés",
    saveSuccessMessage: "Beállítások mentve!",
  },
  hy: {
    settingsTitleText: "Forvo Lookup Կարգավորումներ",
    langSelectLabelText: "Forvo էջի լեզուն՝",
    subdomainSelectLabelText: "Forvo Լեզվի կայք:",
    saveButtonText: "Պահպանել",
    saveSuccessMessage: "Կարգավորումները պահպանվել են!",
  },
  ind: {
    settingsTitleText: "Pengaturan Forvo Lookup",
    langSelectLabelText: "Bahasa halaman Forvo:",
    subdomainSelectLabelText: "Situs Bahasa Forvo:",
    saveButtonText: "Simpan",
    saveSuccessMessage: "Pengaturan disimpan!",
  },
  ko: {
    settingsTitleText: "Forvo Lookup 설정",
    langSelectLabelText: "Forvo 페이지 언어:",
    subdomainSelectLabelText: "Forvo 언어 사이트:",
    saveButtonText: "저장",
    saveSuccessMessage: "설정이 저장되었습니다！",
  },
  ku: {
    settingsTitleText: "Mîhengan Forvo Lookup",
    langSelectLabelText: "Zimanê rûpelê Forvo:",
    subdomainSelectLabelText: "Malpera Zimanê Forvo:",
    saveButtonText: "Hildan",
    saveSuccessMessage: "Mîhengên hate hilanîn!",
  },
  lv: {
    settingsTitleText: "Forvo Lookup iestatījumi",
    langSelectLabelText: "Forvo lapas valoda:",
    subdomainSelectLabelText: "Forvo valodu vietne:",
    saveButtonText: "Saglabāt",
    saveSuccessMessage: "Iestatījumi saglabāti!",
  },
  no: {
    settingsTitleText: "Forvo Lookup Innstillinger",
    langSelectLabelText: "Forvo‑sidespråk:",
    subdomainSelectLabelText: "Forvo språkside:",
    saveButtonText: "Lagre",
    saveSuccessMessage: "Innstillinger lagret!",
  },
  pa: {
    settingsTitleText: "Forvo Lookup ਸੈਟਿੰਗਜ਼",
    langSelectLabelText: "Forvo ਪੇਜ਼ ਦੀ ਭਾਸ਼ਾ:",
    subdomainSelectLabelText: "ਫੋਰਵੋ ਭਾਸ਼ਾ ਸਾਈਟ:",
    saveButtonText: "ਸੰਭਾਲੋ",
    saveSuccessMessage: "ਸੈਟਿੰਗਜ਼ ਸੰਭਾਲੇ ਗਏ!",
  },
  ro: {
    settingsTitleText: "Setări Forvo Lookup",
    langSelectLabelText: "Limba paginii Forvo:",
    subdomainSelectLabelText: "Site Forvo de limbi:",
    saveButtonText: "Salvează",
    saveSuccessMessage: "Setările au fost salvate!",
  },
  sk: {
    settingsTitleText: "Nastavenia Forvo Lookup",
    langSelectLabelText: "Jazyk stránky Forvo:",
    subdomainSelectLabelText: "Jazyková stránka Forvo:",
    saveButtonText: "Uložiť",
    saveSuccessMessage: "Nastavení uložená!",
  },
  sr: {
    settingsTitleText: "Подешавања Forvo Lookup",
    langSelectLabelText: "Језик Forvo странице:",
    subdomainSelectLabelText: "Форво језички сајт:",
    saveButtonText: "Сачувај",
    saveSuccessMessage: "Подешавања су сачувана!",
  },
  sv: {
    settingsTitleText: "Forvo Lookup Inställningar",
    langSelectLabelText: "Forvo‑sidans språk:",
    subdomainSelectLabelText: "Forvo språkplats:",
    saveButtonText: "Spara",
    saveSuccessMessage: "Inställningar sparade!",
  },
  th: {
    settingsTitleText: "การตั้งค่า Forvo Lookup",
    langSelectLabelText: "ภาษาหน้า Forvo:",
    subdomainSelectLabelText: "เว็บไซต์ภาษา Forvo:",
    saveButtonText: "บันทึก",
    saveSuccessMessage: "บันทึกการตั้งค่าแล้ว!",
  },
  tt: {
    settingsTitleText: "Forvo Lookup Көйләүләр",
    langSelectLabelText: "Forvo битенең теле:",
    subdomainSelectLabelText: "Forvo тел сайты:",
    saveButtonText: "Саклау",
    saveSuccessMessage: "Көйләүләр сакланды!",
  },
  uk: {
    settingsTitleText: "Налаштування Forvo Lookup",
    langSelectLabelText: "Мова сторінки Forvo:",
    subdomainSelectLabelText: "Мовний сайт Forvo:",
    saveButtonText: "Зберегти",
    saveSuccessMessage: "Налаштування збережено!",
  },
  vi: {
    settingsTitleText: "Cài đặt Forvo Lookup",
    langSelectLabelText: "Ngôn ngữ trang Forvo:",
    subdomainSelectLabelText: "Trang ngôn ngữ Forvo:",
    saveButtonText: "Lưu",
    saveSuccessMessage: "Đã lưu cài đặt!",
  },
  yue: {
    settingsTitleText: "Forvo Lookup 設定",
    langSelectLabelText: "Forvo 頁面語言：",
    subdomainSelectLabelText: "Forvo 語言站點：",
    saveButtonText: "保存",
    saveSuccessMessage: "設定已保存！",
  },
};

/**
 * 根据语言代码解析 Options 页本地化文案
 * @param localeCode 语言代码
 * @example
 * const uiStrings = resolveOptionsPageUIStrings("ja");
 * console.log(uiStrings.pageTitle);          // Forvo Lookup 設定
 * console.log(uiStrings.langSelectLabel);    // Forvo ページの言語：
 * console.log(uiStrings.subdomainSelectLabel);// Forvo 言語サイト：
 * console.log(uiStrings.saveButtonLabel);    // 保存
 * console.log(uiStrings.saveSuccessMessage); // 設定が保存されました！
 */
export function resolveOptionsPageUIStrings(
  localeCode: SupportedLangCode
): OptionsPageUIStrings {
  return (
    OPTIONS_PAGE_UI_MAP[localeCode] || OPTIONS_PAGE_UI_MAP[DEFAULT_LANG_CODE]
  );
}
