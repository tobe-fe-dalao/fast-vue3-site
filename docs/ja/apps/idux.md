# iDux

`iDux` 系列は管理画面の `apps/web-idux` と公開ポータルの `apps/site-idux` で構成されます。API、リクエスト、Store、設定、共通スタイルは Workspace パッケージを再利用し、iDux 固有の Provider とコンポーネントだけをアプリ内に置きます。

```bash
pnpm dev:web-idux
pnpm dev:site-idux
pnpm build:web-idux
pnpm build:site-idux
```

Spring Boot 利用時は `VITE_DEV_BACKEND=server` を設定します。サイトのコンテンツ取得は公開、コメント投稿と注文作成は認証付き共通クライアントを利用します。変更時は他の 6 UI 版と業務機能を揃えてください。

