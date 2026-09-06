# はじめに

## 必要環境

- JDK 21
- Docker / Docker Compose

ローカル JDK がない場合、Docker Desktop と OrbStack で同じ Compose コマンドを使用できます。

```bash
cp .env.example .env
docker compose --profile app up -d --build
docker compose ps
docker compose logs -f app
```

Java コードをローカル実行する場合だけ JDK 21 と次の手順を使用します。

```bash
cp .env.example .env
docker compose up -d
./mvnw spring-boot:run
```

API は `http://localhost:8080` で起動します。ヘルスチェックは `GET /actuator/health`、Swagger UI は `/swagger-ui.html` です。開発用管理者は `admin / admin123` です。本番では `ADMIN_PASSWORD` と `JWT_SECRET` を必ず変更してください。

フロントエンドとの接続:

```bash
VITE_FAST_VUE3_SERVER_URL=http://localhost:8080 pnpm dev:server
pnpm dev:site-antd
```

サーバードキュメントは [fast-vue3-site](https://tobe-fe-dalao.github.io/fast-vue3-site/ja/server/) で一元管理します。`fast-vue3-server` リポジトリ自体には Node.js や VitePress のツールチェーンを置きません。
