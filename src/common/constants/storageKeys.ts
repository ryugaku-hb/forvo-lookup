export const STORAGE_KEYS = {
  FORVO_LANG_CODE: "forvoLangCode",
  FORVO_SUBDOMAIN_CODE: "forvoSubdomainCode",
} as const;

// as const: 把对象每个字段都锁定为字面量类型 + 只读

// const obj = { key: "value" };
// 类型：{ key: string } ← value 被推断为 string
// const obj = { key: "value" } as const;
// 类型：{ readonly key: "value" } ← value 是精确值 "value"，而不是 string

export type StorageKey = keyof typeof STORAGE_KEYS;

// keyof typeof X: 提取 X 对象所有的键名，作为联合类型

// typeof STORAGE_KEYS: 获取变量 STORAGE_KEYS 的类型
// keyof: 获取这个类型的所有键名
