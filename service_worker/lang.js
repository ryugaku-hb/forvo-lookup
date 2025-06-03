export const DEFAULT_LANG_CODE = "zh";

export const CONTEXT_MENU_TITLES = {
  de: 'Suche "%s" mit Forvo',
  en: 'Search "%s" with Forvo',
  es: 'Buscar "%s" con Forvo',
  fr: 'Rechercher "%s" avec Forvo',
  it: 'Cerca "%s" con Forvo',
  ja: 'Forvo で "%s" を検索',
  nl: 'Zoek "%s" met Forvo',
  pl: 'Szukaj "%s" w Forvo',
  pt: 'Pesquisar "%s" no Forvo',
  ru: 'Искать "%s" на Forvo',
  tr: '"%s" için Forvo\'da Ara',
  zh: '使用 Forvo 搜索 "%s"',
  ar: 'ابحث عن "%s" مع فورفو',
  bg: 'Търсене на "%s" с Forvo',
  bs: 'Pretraži "%s" sa Forvo',
  ca: 'Cerca "%s" amb Forvo',
  cs: 'Vyhledat "%s" pomocí Forvo',
  da: 'Søg efter "%s" med Forvo',
  el: 'Αναζήτηση "%s" με Forvo',
  eu: 'Bilatu "%s" Forvorekin',
  fa: 'جستجوی "%s" با Forvo',
  fi: 'Etsi "%s" Forvolla',
  hak: '用 Forvo 搜索 "%s"',
  he: 'חפש "%s" עם Forvo',
  hi: 'Forvo पर "%s" खोजें',
  hr: 'Pretraži "%s" s Forvo',
  hu: 'Keresés "%s" a Forvo-val',
  hy: 'Որոնել "%s" Forvo-ով',
  ind: 'Cari "%s" dengan Forvo',
  ko: 'Forvo에서 "%s" 검색',
  ku: 'Lêgerîn "%s" bi Forvo',
  lv: 'Meklēt "%s" ar Forvo',
  no: 'Søk etter "%s" med Forvo',
  pa: 'Forvo ਨਾਲ "%s" ਖੋਜੋ',
  ro: 'Caută "%s" cu Forvo',
  sk: 'Vyhľadať "%s" cez Forvo',
  sr: 'Претрага "%s" помоћу Форво-а',
  sv: 'Sök efter "%s" med Forvo',
  th: 'ค้นหา "%s" ด้วย Forvo',
  tt: '"%s" өчен Forvo-да эзләү',
  uk: 'Пошук "%s" на Forvo',
  vi: 'Tìm kiếm "%s" với Forvo',
  yue: '用 Forvo 搜尋 "%s"',
};

/**
 * 从 Forvo 基础 URL 提取语言代码
 *
 * @example
 * extractLangCode("https://forvo.com/search/") // 返回 "en"（英文无子域名）
 * extractLangCode("https://ja.forvo.com/search/") // 返回 "ja"
 *
 * @param {string} forvoBaseUrl - Forvo 搜索的基础地址，例如 "https://ja.forvo.com/search/"
 * @returns {string} 提取的语言代码，默认返回 "zh"
 */
export function extractLangCode(forvoBaseUrl) {
  if (forvoBaseUrl === "https://forvo.com/search/") return "en"; // 英文特殊情况

  const match = forvoBaseUrl.match(/^https:\/\/(.*?)\.forvo\.com/);
  return match ? match[1] : "zh"; // 默认中文
}

/**
 * 根据语言代码生成对应的 Forvo 搜索 URL 前缀
 *
 * @example
 * getForvoBaseUrl("zh") // "https://zh.forvo.com/search/"
 * getForvoBaseUrl("en") // "https://forvo.com/search/"
 *
 * @param {string} langCode - 语言代码，例如 "zh"、"en"、"ja" 等
 * @returns {string} 对应的 Forvo 搜索 URL 前缀
 */
export function getForvoBaseUrl(langCode) {
  return langCode === "en"
    ? "https://forvo.com/search/" // 英文没有前缀
    : `https://${langCode}.forvo.com/search/`;
}
