# 新しい UI ライブラリの追加

## 手順概要

1. `pnpm-workspace.yaml` catalog に UI ライブラリのバージョンを追加
2. `apps/` 下に新しいアプリディレクトリを作成
3. `package.json`・`vite.config.ts` などを設定
4. レイアウト・ログイン・ダッシュボードページを実装
5. Mock データを追加

## 詳細手順

### 1. Catalog に追加

```yaml
catalog:
  my-ui-lib: ^1.0.0
```

### 2. vite.config.ts の設定

```ts
import { defineConfig } from "@fast-vue3/vite-config";
import { MyUiResolver } from "unplugin-vue-components/resolvers";

export default defineConfig(async () => ({
  application: {
    uiResolvers: [MyUiResolver()],
  },
  vite: {
    server: { port: 3006 },
  },
}));
```

### 3. ルートスクリプトの追加

```json
{
  "scripts": {
    "dev:myui": "turbo dev --filter=@fast-vue3/web-myui"
  }
}
```

### 4. インストール・起動

```bash
pnpm install
pnpm dev:myui
```

## 参考実装

既存の 5 つのアプリが参考になります：

- `apps/web-antd/` — 最も完全な参考実装
- `apps/web-naive/` — Provider パターンの実装例

いずれかのアプリをコピーして変更するのが最も手早い方法です。
