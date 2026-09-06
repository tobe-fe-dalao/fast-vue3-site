# TDesign

`TDesign` 系列は管理画面の `apps/web-tdesign` と公開ポータルの `apps/site-tdesign` で構成されます。API、リクエスト、Store、設定、共通スタイルは Workspace パッケージを再利用し、TDesign 固有の Provider とコンポーネントだけをアプリ内に置きます。

```bash
pnpm dev:web-tdesign
pnpm dev:site-tdesign
pnpm build:web-tdesign
pnpm build:site-tdesign
```

Spring Boot 利用時は `VITE_DEV_BACKEND=server` を設定します。サイトのコンテンツ取得は公開、コメント投稿と注文作成は認証付き共通クライアントを利用します。変更時は他の 6 UI 版と業務機能を揃えてください。

