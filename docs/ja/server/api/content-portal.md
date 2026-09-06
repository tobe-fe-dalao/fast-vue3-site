# コンテンツ、ポータル、コメント、決済

管理画面の文章・カテゴリ CRUD は `/api/v1/content/articles` と `/api/v1/content/categories` を使用し、認証が必要です。

## 匿名で利用できるサイト API

| メソッドとパス | 用途 |
| --- | --- |
| GET `/api/v1/public/home` | ホーム |
| GET `/api/v1/public/features`、`/product` | 製品情報 |
| GET `/api/v1/public/pricing` | 料金プラン |
| GET `/api/v1/public/blog`、`/blog/{id}` | ブログ一覧・詳細 |
| GET `/api/v1/public/blog/{id}/comments` | 公開コメント |
| GET `/api/v1/public/faq`、`/docs`、`/about` | ヘルプ・会社情報 |
| POST `/api/v1/public/contact` | お問い合わせ |

## ログインが必要な操作

| メソッドとパス | 用途 |
| --- | --- |
| POST `/api/v1/blog/{id}/comments` | ログインユーザーとしてコメント投稿 |
| POST `/api/v1/payments/checkout` | 有料プランの注文作成 |

匿名 POST は HTTP 401 を返します。注文 API は `planId` と `channel`（`alipay`、`wechat`、`card`）を受け取り、注文番号、金額、有効期限、デモ URL を返します。コメントと注文は `V7__site_interactions.sql` のテーブルに保存されます。

料金・ブログページ自体は公開です。購入または投稿時だけログイン画面へ移動し、ログイン後は `redirect` で元のページに戻ります。
