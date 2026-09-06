# 建立新應用

```bash
pnpm create-app
pnpm -F @fast-vue3/vsh run stub
```

腳手架建立 `apps/<name>` 並只加入該應用必要的 dev/build 指令。因執行檔載入 `scripts/vsh/dist/index.mjs`，修改來源後必須重建 stub。

