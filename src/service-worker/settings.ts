import {
  DEFAULT_LANG_CODE,
  DEFAULT_SUBDOMAIN_CODE,
  STORAGE_KEYS,
  SupportedLangCode,
} from "@/common/constants";

interface UserSettings {
  langCode: SupportedLangCode;
  subdomainCode: SupportedLangCode;
}

/**
 * 获取用户设置 \
 * 此函数从 `chrome.storage.local` 中读取用户设置
 * @example
 * const settings = await loadUserSettings();
 * settings.forvoLangCode // "ja"
 * settings.forvoSubdomainCode // "zh"
 */
export async function loadUserSettings(): Promise<UserSettings> {
  const stored = await chrome.storage.local.get([
    STORAGE_KEYS.FORVO_LANG_CODE,
    STORAGE_KEYS.FORVO_SUBDOMAIN_CODE,
  ]);

  const langCode =
    typeof stored[STORAGE_KEYS.FORVO_LANG_CODE] === "string"
      ? stored[STORAGE_KEYS.FORVO_LANG_CODE]
      : DEFAULT_LANG_CODE;

  const subdomainCode =
    typeof stored[STORAGE_KEYS.FORVO_SUBDOMAIN_CODE] === "string"
      ? stored[STORAGE_KEYS.FORVO_SUBDOMAIN_CODE]
      : DEFAULT_SUBDOMAIN_CODE;

  return { langCode, subdomainCode };
}
