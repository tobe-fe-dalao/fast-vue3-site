# 選擇工程路徑

`polyrepo` 適合單一部署單元及建置時 UI 選擇；`main` 適合多個後台、入口網站及共用套件協作。

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Main 可用 `pnpm dev:web-antd` 或 `pnpm dev:site-antd` 啟動指定應用。`pnpm dev` 預設使用 Nitro Mock；`pnpm dev:server` 連接獨立啟動的 Java 服務。七個 `site-*` 的公開內容頁面已接入共用 API。正式環境需要真實後端。
