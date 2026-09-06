# 選擇工程路徑

`polyrepo` 適合單一部署單元與建置時 UI 選擇；`main` 適合多個後台、入口網站與共用套件協作。

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Main 可用 `pnpm dev:web-antd` 或 `pnpm dev:site-antd` 啟動指定應用。正式環境需要真實後端。

