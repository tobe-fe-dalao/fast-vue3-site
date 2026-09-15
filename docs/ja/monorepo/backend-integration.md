# 実バックエンドとの連携

`fast-vue3-server` は main ワークスペースとは独立して起動する Spring Boot 3 API です。`fast-vue3` リポジトリから Docker Desktop または OrbStack で Java の構成を起動できます。

```bash
pnpm dev:server:api
```

ローカル JDK 21 を使う場合は、隣接する `fast-vue3-server` ディレクトリで `docker compose up -d` により PostgreSQL と Redis を起動し、`./mvnw spring-boot:run` を実行します。

`GET http://localhost:8080/actuator/health` が `UP` になった後、`fast-vue3` で実行します。

```bash
pnpm dev:server
```

単一アプリなら `VITE_DEV_BACKEND=server pnpm dev:site-antd` のように起動します。`dev:server` はフロントエンドだけを起動し、Java や Nitro Mock は起動しません。別の Java URL には `VITE_FAST_VUE3_SERVER_URL` を設定します。公開コンテンツとコメント閲覧は Token 不要です。管理 API、コメント投稿、注文作成には Bearer Token が必要です。

## 企業向け画面

`VITE_DEV_BACKEND=server pnpm dev:web-antd` で管理画面を起動し、Java サービスの開発アカウント `admin / admin123` でログインします。`web-antd` にはプロジェクト・タスク、承認、組織、テナント、監査、ファイル、通知の画面があります。共有クライアントは `packages/effects/api/src/modules/enterprise.ts`、ルートと権限は[企業向けドメイン](/ja/server/api/enterprise)を参照してください。

テナント分離、メンバー制約、タスク遷移、承認手順、ファイル永続化は Java サービスで検証します。ブラウザに `/api/v1` が見えるだけでは上流サービスを識別できないため、Vite Proxy 設定と Java のヘルスエンドポイントも確認します。Nitro のメモリデータは API 形状の確認用です。

7 つの `site-*` のホーム・機能・製品・概要・ドキュメント・FAQ・ブログ・料金・お問い合わせは共有 API を使用します。`web-app` はホーム・機能・概要・ブログ一覧・お問い合わせを利用し、他の 6 つの `web-*` はダッシュボード・分析・ユーザー・ロール API を利用します。上記の企業向け画面は引き続き `web-antd` 固有です。
