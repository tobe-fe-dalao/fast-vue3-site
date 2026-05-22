# アプリ概要

Fast Vue3 には 5 つの独立した UI エコシステムアプリが含まれています。

## アプリ一覧

| アプリ      | UI フレームワーク    | ポート | コマンド           |
| ----------- | -------------------- | ------ | ------------------ |
| web-antd    | Ant Design Vue 4.x   | 3001   | `pnpm dev:antd`    |
| web-ele     | Element Plus 2.x     | 3002   | `pnpm dev:ele`     |
| web-naive   | Naive UI 2.x         | 3003   | `pnpm dev:naive`   |
| web-arco    | Arco Design Vue 2.x  | 3004   | `pnpm dev:arco`    |
| web-tdesign | TDesign Vue Next 1.x | 3005   | `pnpm dev:tdesign` |

## 共通機能

### 認証フロー

1. 未認証ユーザー → `/login` に自動リダイレクト
2. ログイン成功 → ユーザー情報取得 → メインレイアウトへ
3. ログアウト → トークンクリア → `/login` にリダイレクト

### メインレイアウト

- 折りたたみ可能なサイドバーナビゲーション
- トップヘッダー（ユーザー情報・ログアウト）
- コンテンツエリア（`<RouterView />`）

### ファイルベースルーティング

`unplugin-vue-router` により `src/views/` 以下の `.vue` ファイルが自動でルートに登録されます。

### Mock データ

各アプリの `mock/` ディレクトリ：

```
POST /api/user/login    → { token: 'mock-token-xxx' }
GET  /api/user/profile  → { userName, avatar, role }
POST /api/user/logout   → {}
```

## UI の分離

異なるフレームワークのコンポーネントは互いに干渉しません。各アプリの `vite.config.ts` に渡された resolver が自動インポートのスコープを制御します。

## 新しい UI エコシステムの追加

[新しい UI ライブラリの追加](./add-new) を参照してください。
