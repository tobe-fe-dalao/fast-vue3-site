# 設定及部署

主要環境變數包括 `DATABASE_URL`、`DATABASE_USERNAME`、`DATABASE_PASSWORD`、`REDIS_HOST`、`REDIS_PORT`、`JWT_SECRET`、`ADMIN_PASSWORD` 及 `CORS_ALLOWED_ORIGIN_PATTERNS`。

Flyway 腳本位於 `src/main/resources/db/migration`，已套用的遷移不可修改。正式環境必須更換密鑰、限制 CORS、使用受管資料庫並執行 `./mvnw clean verify`。

後端文件統一維護在 `fast-vue3-site` 倉庫。推送至該倉庫 `main` 分支的文件變更會由 `.github/workflows/deploy.yml` 建置 VitePress 並發布到 GitHub Pages。內建付款是示範適配器，正式收款需加入支付服務商、簽章回調及冪等狀態轉換。
