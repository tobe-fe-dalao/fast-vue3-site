# 実バックエンドとの連携

`fast-vue3-server` は main ワークスペース用の Spring Boot 3 API です。Docker Desktop と OrbStack は、ローカル JDK なしで完全な構成を起動できます。

```bash
cd ../fast-vue3-server
docker compose --profile app up -d --build
docker compose ps
```

ローカル JDK 21 を使う場合は、`docker compose up -d` で PostgreSQL と Redis のみを起動し、`./mvnw spring-boot:run` を実行します。

`GET http://localhost:8080/actuator/health` が `UP` になった後、`fast-vue3` で実行します。

```bash
VITE_FAST_VUE3_SERVER_URL=http://localhost:8080 pnpm dev:server
```

単一アプリなら `VITE_DEV_BACKEND=server pnpm dev:site-antd` のように起動します。公開コンテンツとコメント閲覧は Token 不要です。管理 API、コメント投稿、注文作成には Bearer Token が必要です。

## 企業向け画面

`VITE_DEV_BACKEND=server pnpm dev:web-antd` で管理画面を起動し、Java サービスの開発アカウント `admin / admin123` でログインします。`web-antd` にはプロジェクト・タスク、承認、組織、テナント、監査、ファイル、通知の画面があります。共有クライアントは `packages/effects/api/src/modules/enterprise.ts`、ルートと権限は[企業向けドメイン](/ja/server/api/enterprise)を参照してください。

テナント分離、メンバー制約、タスク遷移、承認手順、ファイル永続化は Java サービスで検証します。ブラウザに `/api/v1` が見えるだけでは上流サービスを識別できないため、Vite Proxy 設定と Java のヘルスエンドポイントも確認します。Nitro のメモリデータは API 形状の確認用です。
