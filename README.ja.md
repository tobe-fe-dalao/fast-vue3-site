# Fast Vue3 ドキュメント

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文（台灣）](README.zh-TW.md) | [繁體中文（香港）](README.zh-HK.md) | [日本語](README.ja.md)

この VitePress サイトは Fast Vue3 エコシステムのドキュメントを一元管理します。

- `main`: 管理画面、ポータル、Nitro Mock を含む pnpm/Turbo モノレポ
- `polyrepo`: ビルド時に UI ライブラリを選択する単一 Vue アプリ
- `fast-vue3-server`: 共通 `/api/v1` 契約を提供する Spring Boot リファレンスバックエンド

公開サイト: <https://tobe-fe-dalao.github.io/fast-vue3-site/>

英語版を正本とし、簡体字中国語、繁体字中国語（台湾・香港）、日本語の翻訳を言語メニューから利用できます。

## 必要環境とコマンド

- Node.js 22.18 以上
- pnpm 9.15.4

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

ローカル URL は `http://127.0.0.1:5174/fast-vue3-site/` です。`.vitepress/cache`、`.vitepress/dist`、`node_modules` はコミットしません。

`docs/en` は英語の正本、`docs/zh` と `docs/ja` は翻訳です。サーバードキュメントは各言語の `server/` 以下にあります。長文ドキュメントは本リポジトリだけで管理し、コードリポジトリには簡潔な README とリンクを残します。既定のデプロイ base は `/fast-vue3-site/` です。ルートドメインでは `DOCS_BASE=/ pnpm build` を使用します。

API 説明は `fast-vue3`、Nitro Mock、`fast-vue3-server` の共通契約に基づきます。サイトの公開読み取りは匿名で利用でき、管理操作、ブログコメント投稿、料金プランの注文作成にはログインが必要です。
