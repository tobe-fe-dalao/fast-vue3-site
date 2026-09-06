# 真實後端聯調

毋須安裝 Java，可用 Docker Desktop 或 OrbStack：

```bash
cd ../fast-vue3-server
docker compose --profile app up -d --build
docker compose ps
```

回到前端執行 `VITE_DEV_BACKEND=server pnpm dev:site-antd`。內容與評論列表可匿名讀取；後台、評論送出與 Checkout 需要 Bearer Token。

