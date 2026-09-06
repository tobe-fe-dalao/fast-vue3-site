# Mock API とリクエスト

`pnpm dev:mock` は `apps/backend-mock` の Nitro とフロントエンドを起動します。API だけなら `pnpm dev:backend-mock` を使います。開発アカウントは `admin / 123456` と `user / 123456` です。

`@fast-vue3/api` が業務 API を集約し、`@fast-vue3/request` が Token の付与と `{ code, message, data }` の展開を行います。

実サーバーと同様、`GET /api/v1/public/**` と問い合わせ送信は匿名アクセス可能です。管理 API、コメント投稿、決済注文は認証が必要です。統合テストは実際の Nitro リスナーへ HTTP リクエストを送ります。
