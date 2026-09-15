# アプリ一覧

Fast-Vue3 は main と polyrepo の並行ブランチを提供します。polyrepo はビルド時に UI を選択する単一 Vue アプリ、main は独立した管理画面とポータルを持つ pnpm/Turbo Workspace です。

| 应用 | 开发命令 | 开发端口声明 |
| --- | --- | --- |
| `backend-mock` | `pnpm dev:mock:api` (`dev:backend-mock` の別名) | 5320 |
| `site-antd` | `pnpm dev:site-antd` | — |
| `site-arco` | `pnpm dev:site-arco` | — |
| `site-ele` | `pnpm dev:site-ele` | — |
| `site-idux` | `pnpm dev:site-idux` | — |
| `site-naive` | `pnpm dev:site-naive` | — |
| `site-primevue` | `pnpm dev:site-primevue` | — |
| `site-tdesign` | `pnpm dev:site-tdesign` | — |
| `web-antd` | `pnpm dev:web-antd` | 3001 |
| `web-app` | `pnpm dev:web-app` | 3008 |
| `web-arco` | `pnpm dev:web-arco` | 3002 |
| `web-ele` | `pnpm dev:web-ele` | 3003 |
| `web-idux` | `pnpm dev:web-idux` | 3007 |
| `web-naive` | `pnpm dev:web-naive` | 3004 |
| `web-primevue` | `pnpm dev:web-primevue` | 3006 |
| `web-tdesign` | `pnpm dev:web-tdesign` | 3005 |

7 つの `site-*` は公開コンテンツを共有 API から取得し、7 つの `web-*` はダッシュボード・分析・ユーザー・ロール画面に API データを使用します。`web-app` はホーム・機能・概要・ブログ一覧・お問い合わせに接続します。`web-antd` には企業向け画面もあります。Java API は別途起動し、単一フロントエンドには `VITE_DEV_BACKEND=server pnpm dev:<app-name>` を使用します。

[開発フロー](/ja/monorepo/development)
