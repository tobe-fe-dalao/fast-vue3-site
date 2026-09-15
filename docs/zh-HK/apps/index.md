# 應用清單

Main 包含七個 `web-*` 後台、七個 `site-*` 入口網站、`web-app` 及 `backend-mock`。使用 `pnpm dev:<name>` 或 `pnpm build:<name>` 操作指定應用。

`pnpm dev:mock:api` 只啟動 5320 連接埠的 Nitro Mock；`pnpm dev:server:api` 從同級 `fast-vue3-server` 啟動 Java 容器。七個 `site-*` 的公開內容頁面、七個 `web-*` 的儀表板／分析／用戶／角色頁面均使用共用 API；`web-app` 接入首頁、功能、關於、網誌列表及聯絡接口。`web-antd` 另有企業業務畫面。

[建立新應用](/zh-HK/apps/add-new)
