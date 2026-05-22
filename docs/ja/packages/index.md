# パッケージ概要

`packages/` ディレクトリには全 UI アプリが共有するインフラパッケージが含まれています。

## 依存関係グラフ

```
@fast-vue3/shared          ← 最下位層、workspace 依存なし
       │
       ├──▶ @fast-vue3/utils
       │           │
       │           └──▶ @fast-vue3/stores
       │                         │
       │                         └──▶ @fast-vue3/access
       │
       ├──▶ @fast-vue3/locales
       │
       └──▶ @fast-vue3/request
```

## パッケージ一覧

| パッケージ           | パス                       | 責任                     |
| -------------------- | -------------------------- | ------------------------ |
| `@fast-vue3/shared`  | `packages/@core/shared`    | コア型定義・定数         |
| `@fast-vue3/utils`   | `packages/utils`           | 純粋なユーティリティ関数 |
| `@fast-vue3/stores`  | `packages/stores`          | Pinia ストア             |
| `@fast-vue3/locales` | `packages/locales`         | i18n リソース            |
| `@fast-vue3/request` | `packages/effects/request` | HTTP クライアント        |
| `@fast-vue3/access`  | `packages/effects/access`  | ルートアクセスガード     |

## 設計原則

### TypeScript ソースの直接エクスポート

```json
{ "exports": { ".": { "default": "./src/index.ts" } } }
```

パッケージ変更時に即座に HMR が反映されます。

### 明確な境界

- 各パッケージは必要な公開 API のみ公開
- 実装の詳細は内部に隠蔽
- 循環依存なし

## アプリでの使用

```ts
import { TOKEN_KEY } from "@fast-vue3/shared";
import { getToken, formatDate } from "@fast-vue3/utils";
import { useUserStore } from "@fast-vue3/stores";
import { createHttpClient, createRequest } from "@fast-vue3/request";
import { setupAccessGuard } from "@fast-vue3/access";
```

各パッケージの詳細な API ドキュメントは個別ページを参照してください。
