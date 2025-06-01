# Forvo Lookup

🗣️ 在网页中右键选中文本，一键跳转至 Forvo 听发音。

**支持多语言页面设置，简洁、轻量、无跟踪。**

## 📦 安装方法

开发者模式本地安装

- 打开浏览器地址栏输入：`chrome://extensions/` 或者 <kbd>更多工具</kbd> - <kbd>扩展程序</kbd> 进入扩展程序页面
- 打开右上角 <kbd>开发者模式</kbd>
- 点击 <kbd>加载已解压的扩展程序</kbd> ➜ 选择项目文件夹

## ⚙️ 设置选项

在扩展的设置页面中可以自定义 Forvo 页面语言（默认为中文）：

| 选项     | 默认值                       | 说明                             |
| -------- | ---------------------------- | -------------------------------- |
| 页面语言 | https://zh.forvo.com/search/ | 可切换为日语、英语等其他语言页面 |

设置页面打开方法：

- 在扩展图标上点击右键 ➜ <kbd>选项</kbd>
- 或在 `chrome://extensions/` 页面中找到扩展后点击 <kbd>详细信息</kbd> ➜ <kbd>扩展程序选项</kbd>

## 🚀 使用方法

- 在网页中选中一个单词或短语
- 鼠标右键点击 ➜ 选择 <kbd>使用 Forvo 搜索 'xxx'</kbd>
- 系统会自动打开新的标签页，跳转到 Forvo 对应语言的发音页面

## 🧩 文件结构说明

```bash
forvo-lookup/
├── background.js        # 插件主逻辑（右键菜单、跳转功能）
├── manifest.json        # 插件配置文件
├── options/             # 设置页面
│   ├── options.html
│   ├── options.js
│   └── options.css
├── images/              # 图标资源
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # 项目说明（本文件）
```
