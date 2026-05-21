# クイックスタート

## 必要環境

| ツール | 必要バージョン |
|--------|--------------|
| Node.js | >= 20.0.0 |
| pnpm | >= 9.5.0 |
| Git | >= 2.30 |

> 推奨：[Corepack](https://nodejs.org/api/corepack.html) で pnpm を管理：  
> `corepack enable && corepack prepare pnpm@9.15.9 --activate`

## リポジトリのクローン

```bash
git clone https://github.com/tobe-fe-dalao/fast-vue3.git
cd fast-vue3
```

## 依存関係のインストール

```bash
pnpm install
```

初回インストール時に `prepare` スクリプトが自動実行され：
1. Lefthook Git Hooks をインストール
2. `@fast-vue3/vite-config` をビルド（TypeScript ソースを ESM にコンパイル）

## 開発サーバーの起動

各 UI エコシステムに専用の dev コマンドがあります：

```bash
# Ant Design Vue (ポート 3001)
pnpm dev:antd

# Element Plus (ポート 3002)
pnpm dev:ele

# Naive UI (ポート 3003)
pnpm dev:naive

# Arco Design (ポート 3004)
pnpm dev:arco

# TDesign Vue Next (ポート 3005)
pnpm dev:tdesign
```

Turbo はアプリ起動前に依存パッケージ（`@fast-vue3/vite-config`）のビルドを自動で確認します。

## 本番ビルド

```bash
# 全アプリのビルド
pnpm build

# 単一アプリのビルド
pnpm build:antd
pnpm build:ele
pnpm build:naive
pnpm build:arco
pnpm build:tdesign
```

## 型チェック

```bash
pnpm typecheck
```

## Lint

```bash
# チェック
pnpm lint

# 自動修正
pnpm lint:fix

# フォーマット
pnpm format
```

## コミット

`czg` を使ったインタラクティブなコミットウィザード：

```bash
pnpm commit
```

コミット前に自動で実行：
- `lint-staged`：ステージされたファイルへの ESLint・Prettier・Stylelint
- `commitlint`：コミットメッセージ形式の検証

## ビルド成果物のクリーン

```bash
pnpm clean
```

全ワークスペースパッケージの `dist/`・`.turbo/`・`node_modules/`・`.cache/` を再帰削除します。

## ディレクトリ構成

```
fast-vue3/
├── apps/                    # UI エコシステムアプリ
│   ├── web-antd/            # Ant Design Vue (ポート 3001)
│   ├── web-ele/             # Element Plus (ポート 3002)
│   ├── web-naive/           # Naive UI (ポート 3003)
│   ├── web-arco/            # Arco Design (ポート 3004)
│   └── web-tdesign/         # TDesign Vue Next (ポート 3005)
├── packages/                # 共有ビジネスパッケージ
│   ├── @core/shared/        # コア型定義・定数
│   ├── utils/               # ユーティリティ関数
│   ├── stores/              # Pinia ステート管理
│   ├── locales/             # i18n リソース
│   └── effects/
│       ├── request/         # HTTP クライアント
│       └── access/          # ルートアクセスガード
├── internal/                # エンジニアリング基盤
│   ├── vite-config/         # 共有 Vite 設定ファクトリ
│   ├── tsconfig/            # ベース TypeScript 設定
│   └── lint-configs/        # Lint ルールパッケージ
├── scripts/                 # エンジニアリングスクリプト
├── turbo.json               # Turbo タスクオーケストレーション
└── pnpm-workspace.yaml      # pnpm workspace + catalog 設定
```
