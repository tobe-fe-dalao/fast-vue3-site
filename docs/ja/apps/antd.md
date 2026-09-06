# Ant Design Vue

`Ant Design Vue` 系列は管理画面の `apps/web-antd` と公開ポータルの `apps/site-antd` で構成されます。API、リクエスト、Store、設定、共通スタイルは Workspace パッケージを再利用し、Ant Design Vue 固有の Provider とコンポーネントだけをアプリ内に置きます。

```bash
pnpm dev:web-antd
pnpm dev:site-antd
pnpm build:web-antd
pnpm build:site-antd
```

Spring Boot 利用時は `VITE_DEV_BACKEND=server` を設定します。サイトのコンテンツ取得は公開、コメント投稿と注文作成は認証付き共通クライアントを利用します。変更時は他の 6 UI 版と業務機能を揃えてください。

