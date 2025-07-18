export const STORAGE_KEYS = {
  FORVO_LANG_CODE: "forvoLangCode",
  FORVO_SUBDOMAIN_CODE: "forvoSubdomainCode",
} as const;

export type StorageKey = keyof typeof STORAGE_KEYS;
