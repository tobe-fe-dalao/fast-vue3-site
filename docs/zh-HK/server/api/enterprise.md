# 企業業務領域

Java 服務按 `module/<領域>/{api,service,persistence}` 組織功能。Flyway `V9__enterprise_domains.sql` 加入企業資料表及權限；PostgreSQL 儲存業務狀態，Redis 處理短期協調。回應遵循 [API 契約](/zh-HK/server/api/contracts)，前端客戶端位於 `packages/effects/api/src/modules/enterprise.ts`。

## 租戶、組織及部門

| API | 用途 | 權限 |
| --- | --- | --- |
| `GET`、`POST /api/v1/tenants`；`PUT /api/v1/tenants/{id}` | 查詢、建立、修改租戶 | `admin` 角色及 `tenant:list` |
| `GET /api/v1/organizations/current` | 目前組織 | `department:list` |
| `PUT /api/v1/organizations/{id}` | 修改組織 | `department:manage` |
| `GET /api/v1/departments`；`GET /api/v1/departments/{id}/members` | 部門樹及成員 | `department:list` |
| `POST /api/v1/departments`；`PUT`、`DELETE /api/v1/departments/{id}` | 建立、修改、刪除部門 | `department:manage` |
| `PUT`、`DELETE /api/v1/departments/{id}/members/{userId}` | 加入、移除成員 | `department:manage` |

已登入請求由簽名 Access Token 取得 `tenantId`；MyBatis 會對受保護資料表加入租戶條件，服務層再檢查業務存取。只有初始化的系統超級管理員可使用明確的跨租戶路徑。匿名 `/api/v1/public/**` 以 `X-Tenant-Code` 選擇有效租戶，預設為 `default`；不存在、停用或過期的租戶會回傳錯誤。

Java 登入及註冊請求可帶 `tenantCode`，預設為 `default`。目前前端 `LoginParams` 及登入表單尚未提供此欄位，現有畫面只能登入預設租戶。測試其他租戶須直接呼叫 Java 認證 API；前端切換租戶仍需修改型別及畫面。

## 項目及任務

| API | 用途 | 權限 |
| --- | --- | --- |
| `GET /api/v1/projects`、`/{id}`、`/{id}/activities` | 可存取項目、詳情及動態 | `project:list` |
| `POST /api/v1/projects` | 建立項目，須帶 `Idempotency-Key` | `project:create` |
| `PUT /api/v1/projects/{id}`、`/{id}/archive?version=N` | 帶版本更新或封存 | `project:update` |
| `PUT`、`DELETE /api/v1/projects/{id}/members/{userId}` | 管理成員 | `project:update` |
| `GET`、`POST /api/v1/projects/{id}/tasks` | 任務列表或建立任務 | `project:list` / `task:create` |
| `GET`、`PUT /api/v1/tasks/{id}` | 讀取或帶 `version` 更新任務 | `project:list` / `task:update` |
| `GET`、`POST /api/v1/tasks/{id}/comments`；`GET /api/v1/tasks/{id}/activities` | 評論及任務動態 | `project:list` |

建立者自動成為項目負責人及成員；任務指派對象必須是項目成員。封存後不可新增任務或變更成員；仍有未完成任務的成員不可移除。寫入與動態記錄在同一交易內。狀態為 `TODO → IN_PROGRESS → BLOCKED → IN_PROGRESS`，`IN_PROGRESS` 可完成，前三種狀態可取消；`DONE`、`CANCELLED` 為終態。優先級為 `LOW`、`MEDIUM`、`HIGH`、`URGENT`。過期版本或非法轉換回傳 HTTP 409。

## 審批、通知、審計及檔案

| API | 用途 | 權限 |
| --- | --- | --- |
| `GET`、`POST /api/v1/approvals` | 可見審批、建立草稿 | 已登入 / `approval:create` |
| `POST /api/v1/approvals/{id}/submit` | 提交，須帶 `Idempotency-Key` | `approval:create` |
| `POST /api/v1/approvals/{id}/approve`、`/reject`、`/cancel` | 批准、拒絕、取消 | `approval:action` / `approval:create` |
| `GET /api/v1/notifications`、`/unread-count`；`PUT /api/v1/notifications/{id}/read`、`/read-all` | 個人通知 | 已登入 |
| `GET /api/v1/audit/operations` | 請求操作資料 | `audit:view` |
| `POST /api/v1/files`；`GET`、`DELETE /api/v1/files/{tenantId}/{filename}` | 上載、下載、刪除檔案 | `file:upload` / 已登入 / `file:upload` |

審批由 `DRAFT` 提交為 `PENDING`，再成為 `APPROVED` 或 `REJECTED`；申請人可取消草稿或待審單。提交前須指定有負責人的部門，依次由部門負責人及管理員處理。通知在交易提交後建立。操作審計只儲存請求中繼資料，不存請求本文；檔案目前儲存在按租戶區分的本機目錄。

項目建立及審批提交的 `Idempotency-Key` 在 Redis 保留 24 小時；重複鍵回傳 HTTP 409，**不會**重播首次回應。網絡失敗後先查詢資源，再決定是否重試。

目前只有 `web-antd` 提供企業領域頁面。Nitro 及瀏覽器靜態預覽使用記憶體 `createStaticEnterpriseApi`；它們可檢查路由及資料形狀，無法驗證 PostgreSQL 交易、Redis、持久化檔案或完整 Java 權限規則。請依[後端連接](/zh-HK/monorepo/backend-integration)驗證實際業務行為。
