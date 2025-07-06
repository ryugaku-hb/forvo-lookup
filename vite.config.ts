import { defineConfig } from "vite";
import path from "path";
import { createHtmlPlugin } from "vite-plugin-html";

// 导出 Vite 的配置对象
export default defineConfig({
  root: "src",
  publicDir: path.resolve(__dirname, "public"),
  build: {
    outDir: "../dist", // 相对于 root
    emptyOutDir: true,
    sourcemap: true, // 方便调试
    rollupOptions: {
      // 定义多个入口
      input: {
        options: path.resolve(__dirname, "src/options/options.html"),
        service_worker: path.resolve(__dirname, "src/service_worker/index.ts"),
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "options") return "options/index.js";
          if (chunk.name === "service_worker") return "service_worker/index.js";
          return "assets/[name]-[hash].js";
        },
      },
    },
    target: "es2020", // 目标浏览器支持
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // @ 代表 src 目录
    },
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
    }),
  ],
});
