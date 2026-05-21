# 開発ワークフロー

## 日常開発

### アプリの起動

```bash
pnpm dev:antd    # Ant Design Vue
pnpm dev:ele     # Element Plus
pnpm dev:naive   # Naive UI
pnpm dev:arco    # Arco Design
pnpm dev:tdesign # TDesign
```

### 共有パッケージの変更

`packages/*` のパッケージは TypeScript ソースを直接公開しているため、変更後すぐに HMR が反映されます。

`internal/vite-config` のみ変更後に再ビルドが必要です：

```bash
pnpm -F @fast-vue3/vite-config build
```

## コミット規約

Conventional Commits 形式を採用。`czg` で対話的にコミット：

```bash
pnpm commit
```

| タイプ | 説明 |
|--------|------|
| `feat` | 新機能 |
| `fix` | バグ修正 |
| `refactor` | リファクタリング |
| `docs` | ドキュメント |
| `chore` | ビルド・ツール変更 |

## API の追加

```ts
// src/api/demo/index.ts
import { http } from '../http';

export const demoApi = {
  getList: (params: ListParams) =>
    http.get<ListResult>({ url: '/demo/list', params }),
};
```

## ページの追加

`src/views/` 下に `.vue` ファイルを作成すると、`unplugin-vue-router` が自動でルートを登録します：

```
src/views/settings/index.vue  →  /settings
```

## コード品質

| ツール | 設定パッケージ | タイミング |
|--------|--------------|-----------|
| ESLint | `@fast-vue3/eslint-config` | コミット前 |
| Prettier | `@fast-vue3/prettier-config` | コミット前 |
| Stylelint | `@fast-vue3/stylelint-config` | コミット前 |
| commitlint | `@fast-vue3/commitlint-config` | commit-msg フック |
