import { defineConfig } from "vite"; // Vite 提供的函数，用于获得类型提示和更好的 IDE 支持
import path from "path"; // Node.js 内置模块，用于处理路径
import { createHtmlPlugin } from "vite-plugin-html"; // 插件

// 导出 Vite 的配置对象
export default defineConfig({
  root: "src", // 项目根目录
  publicDir: path.resolve(__dirname, "public"), // 作为静态资源服务的文件夹
  // 构建选项
  build: {
    outDir: "../dist", // 指定输出路径（相对于项目根目录 src)
    emptyOutDir: true,
    sourcemap: true, // 构建后生成 source map 文件
    // 自定义底层的 Rollup 打包配置
    rollupOptions: {
      input: {
        options: path.resolve(__dirname, "src/options/options.html"),
        service_worker: path.resolve(__dirname, "src/service-worker/index.ts"),
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "options") return "options/index.js";
          if (chunk.name === "service_worker") return "service-worker/index.js";
          return "assets/[name]-[hash].js";
        },
      },
    },
    target: "es2020", // 最终软件包的浏览器兼容性目标
  },
  resolve: {
    // 路径别名
    alias: {
      "@": path.resolve(__dirname, "src"), // @ 代表 src 目录
    },
  },
  // 插件
  plugins: [
    createHtmlPlugin({
      minify: true,
    }),
  ],
});
