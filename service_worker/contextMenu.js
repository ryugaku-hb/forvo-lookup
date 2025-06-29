import { DEFAULT_LANG_CODE } from "../common/forvoUtils.js";

const CONTEXT_MENU_ID = "forvo-lookup"; // 默认右键菜单 ID

const CONTEXT_MENU_TITLES = {
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
 * 创建右键菜单项，用于触发 Forvo 搜索。
 *
 * @param {string} langCode 语言代码，用于设置多语言菜单标题。
 * @param {string} [contextMenuId=CONTEXT_MENU_ID] 菜单项的唯一 ID。
 */
const createContextMenu = (langCode, contextMenuId = CONTEXT_MENU_ID) => {
  const menuTitle =
    CONTEXT_MENU_TITLES[langCode] || CONTEXT_MENU_TITLES[DEFAULT_LANG_CODE]; // 根据语言取对应菜单标题模板

  // 移除已有菜单，避免重复创建
  chrome.contextMenus.removeAll().then(() => {
    chrome.contextMenus.create({
      id: contextMenuId,
      title: menuTitle,
      type: "normal",
      contexts: ["selection"], // 仅当用户选中文本时显示菜单
    });
  });
};

/**
 * 处理右键菜单点击事件，跳转到 Forvo 搜索页面。
 *
 * 当用户在网页中选中文本并通过右键菜单触发搜索时，将自动构造对应的 Forvo 搜索链接，
 * 并在新标签页中打开搜索结果页面。
 *
 * @param {chrome.contextMenus.OnClickData} info 包含上下文信息的对象，
 *   例如 选中的文本（`info.selectionText`）、菜单项 ID 等。
 * @param {chrome.tabs.Tab} tab 当前激活的标签页对象，用于确定新标签页的打开位置。
 * @param {string} forvoBaseUrl Forvo 搜索的基础 URL，
 *   例如 "https://zh.forvo.com/search/" "https://forvo.com/search/" 等。
 * @param {string} [contextMenuId=CONTEXT_MENU_ID] 要处理的菜单项 ID，用于确保只响应本插件创建的菜单事件。
 */
const handleContextMenuClick = (
  info,
  tab,
  forvoBaseUrl,
  contextMenuId = CONTEXT_MENU_ID
) => {
  if (info.menuItemId !== contextMenuId) return;

  const selectedText = info.selectionText?.trim(); // 获取用户选中的文本，并去除首尾空白
  if (!selectedText) return; // 若为空，不处理

  const searchUrl = `${forvoBaseUrl}${encodeURIComponent(selectedText)}`; // 构造完整搜索 URL

  chrome.tabs.create({
    index: tab.index + 1, // 新标签页紧跟当前标签页
    url: searchUrl, // 要打开的 Forvo 搜索地址
  });
};

export { createContextMenu, handleContextMenuClick };
