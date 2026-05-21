# アーキテクチャ概要

Fast Vue3 は **Vue3 Monorepo エンジニアリングプラットフォーム**であり、単なる Admin テンプレートではありません。

> 複数の主流 Admin UI エコシステムを統合した、再利用可能な Vue3 フロントエンドエンジニアリング基盤。長期進化を前提とするフロントエンドインフラプラットフォーム。

## エンジニアリングレイヤー

```
┌─────────────────────────────────────────────────────┐
│                     apps/                           │
│  web-antd  web-ele  web-naive  web-arco  web-tdesign│
│  （独立アプリ — 専用ルーティング・レイアウト・テーマ） │
└─────────────────┬───────────────────────────────────┘
                  │ 依存
┌─────────────────▼───────────────────────────────────┐
│                   packages/                         │
│  @core/shared  utils  stores  locales               │
│  effects/request  effects/access                    │
│  （ビジネス基盤 — 全アプリで共有）                    │
└─────────────────┬───────────────────────────────────┘
                  │ 工具
┌─────────────────▼───────────────────────────────────┐
│                  internal/                          │
│  vite-config  tsconfig  lint-configs                │
│  （エンジニアリング基盤 — ビジネスロジックなし）       │
└─────────────────────────────────────────────────────┘
```

## コア技術決定

### pnpm Workspace + Catalog

`pnpm-workspace.yaml` の `catalog:` フィールドで全依存バージョンを一元管理：

```yaml
catalog:
  vue: ^3.5.17
  vite: ^7.3.3
  ant-design-vue: ^4.2.6
  element-plus: ^2.10.2
```

### Turbo タスクオーケストレーション

`turbo.json` でタスク依存関係を定義：

```json
{
  "tasks": {
    "dev": { "dependsOn": ["^build"], "persistent": true, "cache": false }
  }
}
```

`dev` タスクの `dependsOn: ["^build"]` により、アプリ起動前に `@fast-vue3/vite-config` が必ずビルドされます。

### vite-config 事前コンパイル戦略

`@fast-vue3/vite-config` は Node.js コンテキストで実行される特殊パッケージです。Node.js は TypeScript ファイルを直接実行できないため、`tsdown` で `dist/index.js` にコンパイルする必要があります。

他の `packages/*` は TypeScript ソースを直接エクスポートし（`"default": "./src/index.ts"`）、Vite がビルド時に処理します。

### ポート割り当て

| アプリ | UI フレームワーク | ポート |
|--------|-----------------|-------|
| web-antd | Ant Design Vue | 3001 |
| web-ele | Element Plus | 3002 |
| web-naive | Naive UI | 3003 |
| web-arco | Arco Design | 3004 |
| web-tdesign | TDesign Vue Next | 3005 |

## 共有インフラストラクチャ

全アプリが `packages/*` を通じて共有：

- **@fast-vue3/shared** — コア型定義・定数
- **@fast-vue3/utils** — 認証ユーティリティ・日付フォーマット・ヘルパー
- **@fast-vue3/stores** — Pinia ストア（useUserStore/useAppStore）+ 永続化
- **@fast-vue3/locales** — zh-CN / en-US i18n リソース
- **@fast-vue3/request** — Axios ラッパー（createHttpClient/createRequest）
- **@fast-vue3/access** — ルートアクセスガード（setupAccessGuard）+ v-access ディレクティブ
