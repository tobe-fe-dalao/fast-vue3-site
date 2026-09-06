# Fast Vue3 文件

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文（台灣）](README.zh-TW.md) | [繁體中文（香港）](README.zh-HK.md) | [日本語](README.ja.md)

這個 VitePress 網站統一記錄 Fast Vue3 生態：`main` 是多應用 pnpm/Turbo Monorepo，`polyrepo` 是建置時選擇 UI 的單一 Vue 應用，`fast-vue3-server` 是共用 `/api/v1` 契約的 Spring Boot 參考後端。

線上文件：<https://tobe-fe-dalao.github.io/fast-vue3-site/>

英文是主要文件，簡體中文、台灣繁中、香港繁中及日文提供相同路徑的翻譯。

## 開發及建置

需要 Node.js 22.18+ 及 pnpm 9.15.4。

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

本機網址是 `http://127.0.0.1:5174/fast-vue3-site/`。預設部署 base 是 `/fast-vue3-site/`；部署至網域根目錄時使用 `DOCS_BASE=/ pnpm build`。

文件涵蓋架構、應用、共用套件、Nitro Mock、Spring Boot 啟動及部署、測試、RBAC 及公開/登入 API 界線。後端文件位於 `docs/zh-HK/server/`。所有長篇文件都在本倉庫維護；其他程式碼倉庫只保留 README 及連結。請勿提交 `.vitepress/cache`、`.vitepress/dist` 或 `node_modules`。
