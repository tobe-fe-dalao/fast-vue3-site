# 企業向けドメイン

Java サービスは `module/<domain>/{api,service,persistence}` に機能をまとめます。Flyway `V9__enterprise_domains.sql` は企業向けテーブルと権限を追加します。業務データの保存先は PostgreSQL、短期的な調整は Redis です。レスポンスは [API 契約](/ja/server/api/contracts) に従い、フロントエンドクライアントは `packages/effects/api/src/modules/enterprise.ts` にあります。

## テナント・組織・部署

| API | 用途 | 権限 |
| --- | --- | --- |
| `GET`、`POST /api/v1/tenants`、`PUT /api/v1/tenants/{id}` | テナント一覧・作成・更新 | `admin` ロールと `tenant:list` |
| `GET /api/v1/organizations/current` | 現在の組織 | `department:list` |
| `PUT /api/v1/organizations/{id}` | 組織の更新 | `department:manage` |
| `GET /api/v1/departments`、`GET /api/v1/departments/{id}/members` | 部署ツリー・所属者 | `department:list` |
| `POST /api/v1/departments`、`PUT`・`DELETE /api/v1/departments/{id}` | 部署の作成・更新・削除 | `department:manage` |
| `PUT`・`DELETE /api/v1/departments/{id}/members/{userId}` | 所属者の追加・削除 | `department:manage` |

認証済みリクエストの `tenantId` は署名済み Access Token から取得します。MyBatis は保護対象テーブルにテナント条件を付与し、サービス層でも業務アクセスを確認します。明示的なテナント横断経路を使えるのは初期システム管理者だけです。匿名の `/api/v1/public/**` は `X-Tenant-Code` で有効なテナントを選び、省略時は `default` を使用します。存在しない、無効、または期限切れのテナントはエラーになります。

Java のログイン・登録リクエストは省略可能な `tenantCode` を受け付け、既定値は `default` です。現行のフロントエンド `LoginParams` とログイン画面にはこの項目がないため、画面からログインできるのは既定テナントだけです。別テナントの確認には Java 認証 API を直接呼び出してください。画面からの切り替えには型と UI の変更が必要です。

## プロジェクト・タスク

| API | 用途 | 権限 |
| --- | --- | --- |
| `GET /api/v1/projects`、`/{id}`、`/{id}/activities` | アクセス可能なプロジェクト、詳細、履歴 | `project:list` |
| `POST /api/v1/projects` | 作成。`Idempotency-Key` が必須 | `project:create` |
| `PUT /api/v1/projects/{id}`、`/{id}/archive?version=N` | バージョン付き更新・アーカイブ | `project:update` |
| `PUT`・`DELETE /api/v1/projects/{id}/members/{userId}` | メンバー管理 | `project:update` |
| `GET`・`POST /api/v1/projects/{id}/tasks` | タスク一覧・作成 | `project:list` / `task:create` |
| `GET`・`PUT /api/v1/tasks/{id}` | 取得・`version` 付き更新 | `project:list` / `task:update` |
| `GET`・`POST /api/v1/tasks/{id}/comments`、`GET /api/v1/tasks/{id}/activities` | コメント・履歴 | `project:list` |

作成者はプロジェクトの所有者とメンバーになります。担当者はそのプロジェクトのメンバーである必要があります。アーカイブ後はタスク作成やメンバー変更ができず、未完了タスクの担当者は削除できません。変更と履歴は同一トランザクションで記録します。状態は `TODO → IN_PROGRESS → BLOCKED → IN_PROGRESS`、`IN_PROGRESS → DONE`、前の三状態から `CANCELLED` に遷移できます。`DONE` と `CANCELLED` は終端です。優先度は `LOW`、`MEDIUM`、`HIGH`、`URGENT`。古い `version` や不正な遷移は HTTP 409 です。

## 承認・通知・監査・ファイル

| API | 用途 | 権限 |
| --- | --- | --- |
| `GET`・`POST /api/v1/approvals` | 表示可能な申請・下書き作成 | 認証 / `approval:create` |
| `POST /api/v1/approvals/{id}/submit` | 提出。`Idempotency-Key` が必須 | `approval:create` |
| `POST /api/v1/approvals/{id}/approve`、`/reject`、`/cancel` | 承認・却下・取消 | `approval:action` / `approval:create` |
| `GET /api/v1/notifications`、`/unread-count`、`PUT /api/v1/notifications/{id}/read`、`/read-all` | 個人通知 | 認証 |
| `GET /api/v1/audit/operations` | リクエスト操作メタデータ | `audit:view` |
| `POST /api/v1/files`、`GET`・`DELETE /api/v1/files/{tenantId}/{filename}` | アップロード・ダウンロード・削除 | `file:upload` / 認証 / `file:upload` |

承認は `DRAFT → PENDING → APPROVED` または `REJECTED` で、申請者は下書きや審査中の申請を取り消せます。提出には責任者を設定した部署が必要です。部署責任者の後に管理者が処理します。通知は業務トランザクションのコミット後に作成されます。操作監査はリクエスト本文を保存しません。ファイルの現行実装はテナント別のローカルディレクトリを使用します。

プロジェクト作成と承認提出の `Idempotency-Key` は Redis で 24 時間保持されます。同じキーの再利用は HTTP 409 となり、**最初のレスポンスは再送されません**。通信障害後は、再試行前に対象リソースを確認してください。

現在、企業向け画面があるのは `web-antd` です。Nitro とブラウザ内の静的プレビューはメモリ上の `createStaticEnterpriseApi` を使います。ルートとデータ形状の確認には使えますが、PostgreSQL のトランザクション、Redis、永続ファイル、Java の完全な権限規則は検証できません。[実サーバー連携](/ja/monorepo/backend-integration)で業務動作を確認してください。
