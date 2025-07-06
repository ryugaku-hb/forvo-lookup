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
 * 获取用户设置。
 *
 * 此函数从 `chrome.storage.local` 中读取用户设置。
 *
 * @example
 * const settings = await loadUserSettings();
 * settings.langCode // "ja"
 */
export const loadUserSettings = async (): Promise<UserSettings> => {
  const result = await chrome.storage.local.get([
    STORAGE_KEYS.FORVO_LANG_CODE,
    STORAGE_KEYS.FORVO_SUBDOMAIN_CODE,
  ]);

  return {
    langCode: result[STORAGE_KEYS.FORVO_LANG_CODE] || DEFAULT_LANG_CODE,
    subdomainCode:
      result[STORAGE_KEYS.FORVO_SUBDOMAIN_CODE] || DEFAULT_SUBDOMAIN_CODE,
  };
};
