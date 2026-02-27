import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "PackyAPI 使用文档",
  description: "Packy API 官方文档，提供最稳定、最便捷的 AI 模型中转服务。",

  theme,

  bundler: viteBundler({
    viteOptions: {
      server: {
        proxy: {
          "/packyapi": {
            target: "https://www.packyapi.com",
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/packyapi/, ""),
          },
        },
      },
    },
  }),


  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
