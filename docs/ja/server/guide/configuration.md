# 設定とデプロイ

| 環境変数 | 用途 | 開発時の既定値 |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL JDBC URL | `jdbc:postgresql://localhost:5432/fastvue3` |
| `DATABASE_USERNAME` / `DATABASE_PASSWORD` | DB 認証情報 | `fastvue3` / `fastvue3` |
| `REDIS_HOST` / `REDIS_PORT` | Refresh Token 保存先 | `localhost` / `6379` |
| `JWT_SECRET` | JWT HMAC 秘密鍵 | ローカル専用値 |
| `ADMIN_PASSWORD` | 初期管理者パスワード | `admin123` |
| `CORS_ALLOWED_ORIGIN_PATTERNS` | 許可するフロントエンド | `http://localhost:*` |

DB スキーマは `src/main/resources/db/migration` の Flyway が管理します。適用済みマイグレーションは変更せず、新しいファイルを追加してください。

決済機能はデモ実装です。実運用では決済事業者アダプター、署名付きコールバック検証、冪等な状態遷移を追加してください。

サーバードキュメントは `fast-vue3-site` リポジトリで一元管理します。その `main` ブランチへの変更は `.github/workflows/deploy.yml` が Node 22、pnpm、GitHub Pages Actions で自動ビルド・公開します。
