# 真實後端連接

毋須安裝 Java，可用 Docker Desktop 或 OrbStack：

```bash
cd ../fast-vue3-server
docker compose --profile app up -d --build
docker compose ps
```

回到前端執行 `VITE_DEV_BACKEND=server pnpm dev:site-antd`。內容及評論列表可匿名讀取；後台、評論送出及 Checkout 需要 Bearer Token。

## 企業業務畫面

以 `VITE_DEV_BACKEND=server pnpm dev:web-antd` 啟動管理端，用 Java 服務的開發帳戶 `admin / admin123` 登入。`web-antd` 現有項目任務、審批、組織、租戶、審計、檔案及通知畫面；共用客戶端位於 `packages/effects/api/src/modules/enterprise.ts`，路由及權限見[企業業務領域](/zh-HK/server/api/enterprise)。

租戶隔離、成員限制、任務狀態、審批流程及持久化檔案須連接 Java 服務驗證。瀏覽器顯示 `/api/v1` 不能單獨證明上游身分，請同時檢查 Vite Proxy 及 Java 健康端點。Nitro 記憶體資料只用於 API 形狀聯調。
