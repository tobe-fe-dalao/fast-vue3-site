# Monorepo 新アーキテクチャ

> このページは `main` ブランチの現在のアーキテクチャを説明します。Fast Vue3 の長期的な方向性です。

## 設計原則

1. **低い長期メンテナンスコスト** — 適切なパッケージ境界、過度な抽象化を避ける
2. **スケーラビリティ** — 新 UI エコシステム追加 = 1 つのアプリ追加
3. **共有優先** — インフラは一度書いて全アプリで再利用
4. **統一ツールチェーン** — 全アプリが同じ lint・tsconfig・vite-config を共有

## 完全なディレクトリ構造

```
fast-vue3/
├── apps/                         # UI エコシステムアプリ層
│   ├── web-antd/                 # Ant Design Vue (ポート 3001)
│   ├── web-ele/                  # Element Plus (ポート 3002)
│   ├── web-naive/                # Naive UI (ポート 3003)
│   ├── web-arco/                 # Arco Design (ポート 3004)
│   └── web-tdesign/              # TDesign Vue Next (ポート 3005)
│
├── packages/                     # 共有ビジネスパッケージ
│   ├── @core/shared/             # コア型・定数
│   ├── utils/                    # ユーティリティ関数
│   ├── stores/                   # Pinia ストア
│   ├── locales/                  # i18n リソース
│   └── effects/
│       ├── request/              # HTTP クライアント
│       └── access/               # ルートアクセスガード
│
├── internal/                     # エンジニアリング基盤
│   ├── vite-config/              # Vite 設定ファクトリ（事前コンパイル必須）
│   ├── tsconfig/
│   └── lint-configs/
│       ├── eslint-config/
│       ├── prettier-config/
│       ├── stylelint-config/
│       └── commitlint-config/
│
├── turbo.json
└── pnpm-workspace.yaml
```

## 重要な技術決定の解説

### `packages/*` が TypeScript を直接エクスポートする理由

```json
{ "default": "./src/index.ts" }
```

アプリコードは Vite によって処理されるため、Vite が TypeScript を直接コンパイルできます。パッケージを変更した際に即座に HMR が反映されます。

### `internal/vite-config` が事前コンパイルを必要とする理由

```json
{ "import": "./dist/index.js" }
```

`vite.config.ts` は Node.js コンテキストで実行されます（Vite のバンドラーを経由しない）。Node.js ESM は `.ts` ファイルを実行できないため、`.js` へのコンパイルが必須です。

### `unocss.config.ts` をルートで共有する理由

全アプリが同じ Atomic CSS プリセット・ショートカット・セーフリストを使用します。一元化することで UI エコシステム間のスタイル不整合を防ぎます。
