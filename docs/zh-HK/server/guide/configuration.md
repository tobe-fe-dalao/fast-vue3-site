# 設定及部署

主要環境變數包括 `DATABASE_URL`、`DATABASE_USERNAME`、`DATABASE_PASSWORD`、`REDIS_HOST`、`REDIS_PORT`、`JWT_SECRET`、`ADMIN_PASSWORD` 及 `CORS_ALLOWED_ORIGIN_PATTERNS`。

檔案設定另有 `FILE_STORAGE_ROOT`（預設為系統暫存目錄下的 `fast-vue3-server/uploads`）、`FILE_PUBLIC_BASE_URL`（預設 `/api/v1/files`）及 `FILE_MAX_SIZE_BYTES`（預設 10 MiB）。目前本機儲存適配器檢查副檔名及 MIME，並檢查支援之二進位格式的檔案簽章，支援 PNG、JPEG、WebP、PDF、純文字。容器部署時應把儲存目錄掛載至持久化磁碟區。Redis 亦供權限快取、限流及冪等聲明使用。

`GET /actuator/health` 可匿名存取；`/actuator/metrics` 及 `/actuator/prometheus` 需要認證。API 回應帶有 `X-Request-Id` 以對照記錄。

Flyway 腳本位於 `src/main/resources/db/migration`，已套用的遷移不可修改。正式環境必須更換密鑰、限制 CORS、使用受管資料庫並執行 `./mvnw clean verify`。

後端文件統一維護在 `fast-vue3-site` 倉庫。推送至該倉庫 `main` 分支的文件變更會由 `.github/workflows/deploy.yml` 建置 VitePress 並發布到 GitHub Pages。內建付款是示範適配器，正式收款需加入支付服務商、簽章回調及冪等狀態轉換。
