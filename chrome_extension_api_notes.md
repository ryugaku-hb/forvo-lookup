# Chrome Extension API 说明文档

- [1. manifest.json](#1-manifestjson)
  - [1.1. 基本结构](#11-基本结构)
- [2. chrome.contextMenus](#2-chromecontextmenus)
  - [2.1. 权限](#21-权限)
  - [2.2. `chrome.contextMenus.create` 方法](#22-chromecontextmenuscreate-方法)
  - [2.3. `chrome.contextMenus.update` 方法](#23-chromecontextmenusupdate-方法)
- [3. chrome.storage](#3-chromestorage)
  - [3.1. 权限](#31-权限)
  - [3.2. `chrome.storage.local.set` 方法](#32-chromestoragelocalset-方法)
  - [3.3. `chrome.storage.local.get` 方法](#33-chromestoragelocalget-方法)
  - [3.4. `chrome.storage.onChanged` 事件](#34-chromestorageonchanged-事件)
- [4. chrome.tabs](#4-chrometabs)
  - [4.1. 权限](#41-权限)
  - [4.2. `chrome.tabs.create` 方法](#42-chrometabscreate-方法)

## 1. manifest.json

`manifest.json` 是 Chrome 扩展的配置文件，定义扩展的元信息、权限、入口文件、图标、背景脚本、内容脚本等，告诉浏览器如何加载和运行扩展。

### 1.1. 基本结构

最小清单

```js
{
  "manifest_version": 3, // 指定 manifest 版本，当前必须为 3
  "name": "Minimal Manifest", // 扩展名称
  "version": "1.0.0", // 扩展版本号，格式通常为 x.y.z
  "description": "A basic example extension with only required keys", // 扩展描述
  "icons": { // 扩展图标，指定不同尺寸图标路径
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  }
}
```

```js
{
  "manifest_version": 3,
  "name": "My Chrome Extension",
  "version": "1.0.0",
  "description": "这是一个示例扩展",
  "icons": {
    "16": "images/icon-16.png",
    "32": "images/icon-32.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  },
  "permissions": [ // 扩展所需权限，如 "storage"、"contextMenus"等
    "storage",
    "contextMenus"
  ],
  "background": { // 背景脚本配置，MV3 使用 service_worker
    "service_worker": "service-worker.js"
  },
  "action": { // 浏览器工具栏按钮配置（图标、提示文本）
    "default_icon": "icon48.png",
    "default_title": "点击这里"
  },
  "content_scripts": [ // 内容脚本配置，定义在哪些页面注入哪些脚本
    {
      "matches": ["https://*.example.com/*"],
      "js": ["contentScript.js"]
    }
  ],
  "homepage_url": "" // 用于指定扩展程序首页的网址。
}
```

## 2. chrome.contextMenus

### 2.1. 权限

使用 chrome.contextMenus API 需要在扩展的 `manifest.json` 中声明 `"contextMenus"` 权限。 示例如下：

```js
{
  "name": "My extension",
  ...
  "permissions": [
    "contextMenus"
  ],
  "icons": {
    "16": "icon-bitty.png",
    "48": "icon-small.png",
    "128": "icon-large.png"
  },
  ...
}
```

此权限允许扩展创建和管理浏览器右键菜单项。

### 2.2. `chrome.contextMenus.create` 方法

```js
/**
 * 创建浏览器右键菜单项。
 *
 * @param {CreateProperties} createProperties 菜单项的属性配置对象。
 * @param {function} [callback] 可选的回调函数，菜单项创建完成后调用，参数为创建的菜单项 ID。
 * @returns {string|number} 返回新建菜单项的 ID，可用于后续更新或移除操作。
 *
 * @see https://developer.chrome.com/docs/extensions/reference/contextMenus/#method-create
 */
chrome.contextMenus.create(
  createProperties: CreateProperties,
  callback?: function,
)

/* 示例代码 */
const menuId = chrome.contextMenus.create({
  title: '搜索 "%s"',          // 菜单标题，%s 占位选中内容
  contexts: ["selection"],    // 仅在选中文本时显示
  onclick: (info, tab) => {   // 点击回调
    console.log("选中内容:", info.selectionText);
  },
});
```

```js
/**
 * @typedef {Object} CreateProperties
 * @description 创建新上下文菜单项时所需的属性配置。
 *
 * @property {string} [id] 菜单项唯一标识符。建议设置，便于后续通过 ID 更新或删除菜单项。
 * @property {string} title 菜单项显示的标题。支持 "%s" 占位符，用于插入用户选中的文本。
 * @property {Array<string>} contexts 菜单显示的上下文类型。可选值包括：
 *  - "all"       所有上下文（不常用，建议指定具体类型）
 *  - "page"      页面任意位置（页面空白处）
 *  - "frame"     iframe 框架内
 *  - "selection" 选中文本时显示菜单
 *  - "link"      右键点击链接时显示
 *  - "editable"  可编辑区域（输入框、textarea）时显示
 *  - "image"     右键点击图片时显示
 *  - "video"     右键点击视频时显示
 *  - "audio"     右键点击音频时显示
 * @property {string} [type="normal"] 菜单项类型。可选值：
 *  - "normal"   普通菜单项（默认），点击时触发 onclick 回调
 *  - "checkbox" 复选框菜单项，点击时切换选中状态
 *  - "radio"    单选菜单项，一组中只能选中一个
 * @property {function} [onclick] 菜单项点击事件的回调函数，参数为 (info, tab)。
 * @property {string} [parentId] 父菜单的 ID，用于创建层级子菜单。
 * @property {boolean} [visible=true] 菜单项是否可见，默认显示。
 * @property {Array<string>} [documentUrlPatterns] 限制菜单项显示的页面 URL 模式，数组格式，支持通配符。
 * @property {boolean} [checked] 仅在 type 为 "checkbox" 或 "radio" 时有效，表示菜单项是否被选中。
 *
 * @see https://developer.chrome.com/docs/extensions/reference/contextMenus/#type-CreateProperties
 */
```

### 2.3. `chrome.contextMenus.update` 方法

```js
/**
 * 更新已存在的右键菜单项的属性。
 *
 * @param {string|number} id 要更新的菜单项 ID。
 * @param {UpdateProperties} updateProperties 需要更新的属性配置对象。
 * @param {function} [callback] 可选回调函数，更新完成后调用。
 *
 * @see https://developer.chrome.com/docs/extensions/reference/contextMenus/#method-update
 */
chrome.contextMenus.update(
  id: string | number,
  updateProperties: UpdateProperties,
  callback?: function,
)

/* 示例代码 */
chrome.contextMenus.update(menuId, {
  title: '使用 Forvo 搜索 "%s"',
  onclick: newClickHandler,
});
```

```js
/**
 * @typedef {Object} UpdateProperties
 * @description 更新菜单项时可修改的属性。
 *
 * @property {string} [title] 新的菜单标题。
 * @property {function} [onclick] 新的点击事件回调函数，参数为 (info, tab)。
 * @property {boolean} [visible] 是否显示菜单项。
 */
```

## 3. chrome.storage

### 3.1. 权限

使用 chrome.storage API 需要在扩展的 `manifest.json` 中声明 `"storage"` 权限。 例如：

```js
{
  "name": "My extension",
  ...
  "permissions": [
    "storage"
  ],
  ...
}
```

声明该权限后，扩展才能使用 `chrome.storage.local`、`chrome.storage.sync` 等接口存储和读取数据。

### 3.2. `chrome.storage.local.set` 方法

```js
/**
 * 将数据保存到 Chrome 同步存储区（chrome.storage.local）。
 * 该存储区会同步到用户登录的所有 Chrome 浏览器。
 *
 * @param {Object} items 要保存的键值对对象，
 *     键是字符串，值可以是任何可序列化的数据类型。
 * @param {function} [callback] 可选回调函数，在保存操作完成后调用。
 *     若保存失败，chrome.runtime.lastError 会包含错误信息。
 */
chrome.storage.local.set(
  items: Object,
  callback?: function,
);

// 示例：将数据保存到 chrome.storage.local 并处理可能的错误
chrome.storage.local.set({ pageLang: "https://en.forvo.com/search/" }, () => {
  if (chrome.runtime.lastError) {
    console.error("保存失败:", chrome.runtime.lastError);
  } else {
    console.log("设置已保存");
  }
});
```

### 3.3. `chrome.storage.local.get` 方法

```js
/**
 * 从同步存储区读取数据。
 *
 * @param {string|string[]|Object} keys 需要读取的键，可以是单个字符串、字符串数组，或带默认值的对象。
 * @param {function(Object)} callback 读取完成后的回调函数，参数为包含所请求键值的对象。
 *
 * @see https://developer.chrome.com/docs/extensions/reference/storage/#method-get
 */
chrome.storage.local.get(
  keys?: string | string[] | object,
  callback?: function,
);

// 示例：从 chrome.storage.local 读取键 "pageLang"
chrome.storage.local.get(["pageLang"], (result) => {
  const lang = result.pageLang || "https://zh.forvo.com/search/";
  console.log("读取到设置:", lang);
});
```

### 3.4. `chrome.storage.onChanged` 事件

```js
/**
 * 监听存储区域中数据变化的事件。
 *
 * @param {(changes: object, areaName: string) => void} callback 事件回调函数。
 *   - 第一个参数 changes 是一个对象，包含发生变化的键及其旧值和新值，格式如下：
 *     {
 *       key1: { oldValue: ..., newValue: ... },
 *       key2: { oldValue: ..., newValue: ... },
 *       ...
 *     }
 *   - 第二个参数 areaName 是字符串，表示存储区域，可能是 "sync"、"local" 或 "managed"。
 *
 * @see https://developer.chrome.com/docs/extensions/reference/storage/#event-onChanged
 */
chrome.storage.onChanged.addListener(
  callback: function,
)

// 示例：监听 chrome.storage 中数据变化
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.pageLang) {
    initializeContextMenu(changes.pageLang.newValue);
  }
});
```

## 4. chrome.tabs

### 4.1. 权限

大多数功能无需任何权限即可使用。例如：创建新标签页、重新加载标签页、导航到其他网址等。

### 4.2. `chrome.tabs.create` 方法

```js
/**
 * 创建新标签页并跳转到给定 URL。
 *
 * @param {CreateTabProperties} createProperties - 标签页配置项
 * @param {function(chrome.tabs.Tab):void} [callback] - 可选的回调函数，在标签页创建完成后调用
 */
chrome.tabs.create(
  createProperties: object,
  callback?: function,
)

// 在当前窗口中创建一个新的标签页，并加载指定的 URL
chrome.tabs.create({ url: "https://example.com" }, function(tab) {
  console.log("新标签页已创建，ID：" + tab.id);
});
```

```js
/**
 * @typedef {Object} CreateTabProperties
 *
 * 用于配置通过 chrome.tabs.create() 创建的新标签页的属性。
 *
 * @property {string} [url] - 要在新标签页中加载的 URL。
 * 须符合扩展的权限限制（如 `permissions` 中的 `<all_urls>` 或特定域名）。
 * @property {boolean} [active=true] - 是否激活新创建的标签页。默认为 `true`。 设置为 `false` 时，标签页会在后台打开。
 * @property {boolean} [pinned=false] - 是否将标签页设置为“固定”状态。 固定标签页在浏览器左侧，不能轻易关闭。
 * @property {number} [index] - 标签页在窗口中的插入位置（从 0 开始计数）。 若未指定，则在最后插入。
 * @property {number} [windowId] - 要在哪个窗口中创建标签页。 若未提供，则在当前窗口中创建。
 * @property {number} [openerTabId] - 指定新标签页的“父”标签页 ID。 用于建立标签页之间的父子关系。
 * @property {boolean} [discarded=false] - 是否创建为“休眠”状态（不激活、不加载内容，直到用户查看标签页）。  有助于节省资源。
 *
 * @property {boolean} [selected] - **已废弃**。请改用 `active` 属性。
 * @property {string} [title] - **已废弃**。此字段在创建时不会对标签页标题产生任何影响。
 */
```
