import { DEFAULT_LANG_CODE } from "../constants/index.js";

const CONTEXT_MENU_TITLES = {
  de: {
    SEARCH: 'Suche "%s" mit Forvo',
    WORD_PAGE: '"%s" auf Forvo öffnen',
  },
  en: {
    SEARCH: 'Search "%s" with Forvo',
    WORD_PAGE: 'Open "%s" on Forvo',
  },
  es: {
    SEARCH: 'Buscar "%s" con Forvo',
    WORD_PAGE: 'Abrir "%s" en Forvo',
  },
  fr: {
    SEARCH: 'Rechercher "%s" avec Forvo',
    WORD_PAGE: 'Ouvrir "%s" sur Forvo',
  },
  it: {
    SEARCH: 'Cerca "%s" con Forvo',
    WORD_PAGE: 'Apri "%s" su Forvo',
  },
  ja: {
    SEARCH: 'Forvo で "%s" を検索',
    WORD_PAGE: "Forvo で「%s」のページを開く",
  },
  nl: {
    SEARCH: 'Zoek "%s" met Forvo',
    WORD_PAGE: 'Open "%s" op Forvo',
  },
  pl: {
    SEARCH: 'Szukaj "%s" w Forvo',
    WORD_PAGE: 'Otwórz "%s" na Forvo',
  },
  pt: {
    SEARCH: 'Pesquisar "%s" no Forvo',
    WORD_PAGE: 'Abrir "%s" no Forvo',
  },
  ru: {
    SEARCH: 'Искать "%s" на Forvo',
    WORD_PAGE: 'Открыть "%s" на Forvo',
  },
  tr: {
    SEARCH: '"%s" için Forvo\'da Ara',
    WORD_PAGE: '"%s" Forvo sayfasını aç',
  },
  zh: {
    SEARCH: '使用 Forvo 搜索 "%s"',
    WORD_PAGE: '在 Forvo 打开 "%s" 词条',
  },

  ar: {
    SEARCH: 'ابحث عن "%s" مع فورفو',
    WORD_PAGE: 'افتح "%s" على فورفو',
  },
  bg: {
    SEARCH: 'Търсене на "%s" с Forvo',
    WORD_PAGE: 'Отвори "%s" на Forvo',
  },
  bs: {
    SEARCH: 'Pretraži "%s" sa Forvo',
    WORD_PAGE: 'Otvori "%s" na Forvo',
  },
  ca: {
    SEARCH: 'Cerca "%s" amb Forvo',
    WORD_PAGE: 'Obre "%s" a Forvo',
  },
  cs: {
    SEARCH: 'Vyhledat "%s" pomocí Forvo',
    WORD_PAGE: 'Otevřít "%s" na Forvo',
  },
  da: {
    SEARCH: 'Søg efter "%s" med Forvo',
    WORD_PAGE: 'Åbn "%s" på Forvo',
  },
  el: {
    SEARCH: 'Αναζήτηση "%s" με Forvo',
    WORD_PAGE: 'Άνοιγμα "%s" στο Forvo',
  },
  eu: {
    SEARCH: 'Bilatu "%s" Forvorekin',
    WORD_PAGE: 'Ireki "%s" Forvon',
  },
  fa: {
    SEARCH: 'جستجوی "%s" با Forvo',
    WORD_PAGE: 'باز کردن "%s" در Forvo',
  },
  fi: {
    SEARCH: 'Etsi "%s" Forvolla',
    WORD_PAGE: 'Avaa "%s" Forvossa',
  },
  hak: {
    SEARCH: '用 Forvo 搜索 "%s"',
    WORD_PAGE: "在 Forvo 開啟「%s」詞條",
  },
  he: {
    SEARCH: 'חפש "%s" עם Forvo',
    WORD_PAGE: 'פתח "%s" ב־Forvo',
  },
  hi: {
    SEARCH: 'Forvo पर "%s" खोजें',
    WORD_PAGE: 'Forvo पर "%s" पृष्ठ खोलें',
  },
  hr: {
    SEARCH: 'Pretraži "%s" s Forvo',
    WORD_PAGE: 'Otvori "%s" na Forvo',
  },
  hu: {
    SEARCH: 'Keresés "%s" a Forvo-val',
    WORD_PAGE: 'Nyisd meg "%s" a Forvón',
  },
  hy: {
    SEARCH: 'Որոնել "%s" Forvo-ով',
    WORD_PAGE: 'Բացել "%s" Forvo-ում',
  },
  ind: {
    SEARCH: 'Cari "%s" dengan Forvo',
    WORD_PAGE: 'Buka "%s" di Forvo',
  },
  ko: {
    SEARCH: 'Forvo에서 "%s" 검색',
    WORD_PAGE: 'Forvo에서 "%s" 페이지 열기',
  },
  ku: {
    SEARCH: 'Lêgerîn "%s" bi Forvo',
    WORD_PAGE: 'Rûpela "%s" li Forvo veke',
  },
  lv: {
    SEARCH: 'Meklēt "%s" ar Forvo',
    WORD_PAGE: 'Atvērt "%s" vietnē Forvo',
  },
  no: {
    SEARCH: 'Søk etter "%s" med Forvo',
    WORD_PAGE: 'Åpne "%s" på Forvo',
  },
  pa: {
    SEARCH: 'Forvo ਨਾਲ "%s" ਖੋਜੋ',
    WORD_PAGE: 'Forvo ਤੇ "%s" ਪੰਨਾ ਖੋਲ੍ਹੋ',
  },
  ro: {
    SEARCH: 'Caută "%s" cu Forvo',
    WORD_PAGE: 'Deschide "%s" pe Forvo',
  },
  sk: {
    SEARCH: 'Vyhľadať "%s" cez Forvo',
    WORD_PAGE: 'Otvoriť "%s" na Forvo',
  },
  sr: {
    SEARCH: 'Претрага "%s" помоћу Форво-а',
    WORD_PAGE: 'Отвори "%s" на Форво-у',
  },
  sv: {
    SEARCH: 'Sök efter "%s" med Forvo',
    WORD_PAGE: 'Öppna "%s" på Forvo',
  },
  th: {
    SEARCH: 'ค้นหา "%s" ด้วย Forvo',
    WORD_PAGE: 'เปิดหน้า "%s" บน Forvo',
  },
  tt: {
    SEARCH: '"%s" өчен Forvo-да эзләү',
    WORD_PAGE: 'Forvo-да "%s" битен ачарга',
  },
  uk: {
    SEARCH: 'Пошук "%s" на Forvo',
    WORD_PAGE: 'Відкрити "%s" на Forvo',
  },
  vi: {
    SEARCH: 'Tìm kiếm "%s" với Forvo',
    WORD_PAGE: 'Mở "%s" trên Forvo',
  },
  yue: {
    SEARCH: '用 Forvo 搜尋 "%s"',
    WORD_PAGE: "打開 Forvo 上「%s」嘅頁面",
  },
};

/**
 * 获取指定语言和类型的右键菜单标题文本。
 *
 * @param {string} langCode 语言代码（如 `'en'`, `'zh'`）
 * @param {string} type 菜单类型，为 `'SEARCH'` 或 `'WORD_PAGE'`
 * @returns {string} 返回对应语言和类型的菜单标题文本，如果没有对应的类型则返回空字符串。
 */
const getMenuTitle = (langCode, type) => {
  const titles =
    CONTEXT_MENU_TITLES[langCode] || CONTEXT_MENU_TITLES[DEFAULT_LANG_CODE];
  return titles[type] || "";
};

export { getMenuTitle };
