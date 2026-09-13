# 設定とデプロイ

| 環境変数 | 用途 | 開発時の既定値 |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL JDBC URL | `jdbc:postgresql://localhost:5432/fastvue3` |
| `DATABASE_USERNAME` / `DATABASE_PASSWORD` | DB 認証情報 | `fastvue3` / `fastvue3` |
| `REDIS_HOST` / `REDIS_PORT` | Refresh Token、権限キャッシュ、レート制限、冪等キー | `localhost` / `6379` |
| `JWT_SECRET` | JWT HMAC 秘密鍵 | ローカル専用値 |
| `ADMIN_PASSWORD` | 初期管理者パスワード | `admin123` |
| `CORS_ALLOWED_ORIGIN_PATTERNS` | 許可するフロントエンド | `http://localhost:*` |
| `FILE_STORAGE_ROOT` | ローカルアップロード先 | システム一時ディレクトリ内の `fast-vue3-server/uploads` |
| `FILE_PUBLIC_BASE_URL` | ファイル URL プレフィックス | `/api/v1/files` |
| `FILE_MAX_SIZE_BYTES` | 最大ファイルサイズ | `10485760` (10 MiB) |

DB スキーマは `src/main/resources/db/migration` の Flyway が管理します。適用済みマイグレーションは変更せず、新しいファイルを追加してください。

現在のローカルストレージは拡張子と MIME を検査し、対応するバイナリ形式のファイル署名も確認し、PNG、JPEG、WebP、PDF、プレーンテキストに対応します。コンテナで利用する際は `FILE_STORAGE_ROOT` を永続ボリュームへ設定してください。システム一時ディレクトリは開発用です。Spring の multipart 上限も 10 MB です。`GET /actuator/health` は公開、`/actuator/metrics` と `/actuator/prometheus` は認証が必要です。API レスポンスにはログ照合用の `X-Request-Id` が含まれます。

決済機能はデモ実装です。実運用では決済事業者アダプター、署名付きコールバック検証、冪等な状態遷移を追加してください。

サーバードキュメントは `fast-vue3-site` リポジトリで一元管理します。その `main` ブランチへの変更は `.github/workflows/deploy.yml` が Node 22、pnpm、GitHub Pages Actions で自動ビルド・公開します。
