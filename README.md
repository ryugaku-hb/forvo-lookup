# Forvo Lookup

🗣️ 在网页中选中文本，右键一键跳转至 [Forvo](https://forvo.com) 听原声音频发音。

**支持多语言页面设置，简洁、轻量、零跟踪。**

## 1. 安装方法

开发者模式下本地加载扩展：

- 打开浏览器地址栏输入 `chrome://extensions/`，或点击 <kbd>⋮ 更多工具</kbd> → <kbd>扩展程序</kbd>
- 打开右上角 <kbd>开发者模式</kbd>
- 点击 <kbd>加载已解压的扩展程序</kbd>
- 选择项目文件夹 `forvo-lookup/`

## 2. 设置选项

扩展支持自定义跳转的 Forvo 页面语言（即跳转链接的语言前缀），如：中文、日语、英语等。

| 选项         | 默认值                         | 说明                                       |
| ------------ | ------------------------------ | ------------------------------------------ |
| 页面语言前缀 | `https://zh.forvo.com/search/` | 可设置为 `https://ja.forvo.com/search/` 等 |

### 2.1. 设置入口

- 在扩展图标上点击右键 → <kbd>选项</kbd>
- 或在 `chrome://extensions/` 页面中找到该扩展 → 点击 <kbd>详细信息</kbd> → <kbd>扩展程序选项</kbd>

## 3. 使用方法

1. 在网页中 **选中一个单词或短语**
2. 右键点击选中内容 → 选择菜单项 <kbd>使用 Forvo 搜索 "xxx"</kbd>
3. 浏览器会打开新标签页跳转到 Forvo 相关发音页面

## 4. 文件结构说明

```bash
forvo-lookup/
├── service_worker/      # Service Worker 相关脚本
│   ├── index.js         # Service Worker 主入口逻辑
│   ├── contextMenu.js   # 右键菜单创建与点击事件处理
│   └── settings.js      # 用户设置读取及监听
├── manifest.json        # 扩展程序配置文件
├── options/             # 设置页面相关文件
│   ├── options.html
│   ├── options.js
│   └── options.css
├── images/              # 扩展图标资源，提供多种尺寸以适配不同需求
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── LICENSE              # 许可证文件
└── README.md            # 项目说明文档
```
