/**
 * 提取语言代码
 *
 * @example
 * extractLangCode("https://forvo.com/search/") // "en"
 * extractLangCode("https://ja.forvo.com/search/") // "ja"
 *
 * @param {string} url
 * @returns {string}
 */
export function extractLangCode(url) {
  if (url === "https://forvo.com/search/") return "en"; // 特殊处理英文

  const match = url.match(/^https:\/\/(.*?)\.forvo\.com/);
  return match ? match[1] : "zh"; // 默认中文
}

export const MENU_TITLES = {
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
