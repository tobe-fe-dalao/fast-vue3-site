# テスト

```bash
./mvnw test
./mvnw clean verify
```

Service テストは業務規則、`@WebMvcTest` は JSON 契約・入力検証・公開パス・401/403、Testcontainers は Docker 利用時に PostgreSQL と Redis の永続化を検証します。

`PortalControllerWebTest` は匿名コンテンツ取得を、`SiteInteractionControllerWebTest` はコメントの公開閲覧と、コメント投稿・注文作成にログインが必要なことを検証します。実 HTTP スモークテストでは公開 GET、匿名 POST の 401、ログイン後の Bearer Token 付き POST を順に確認します。

企業向けドメインを変更した場合は、最後の修正後に `./mvnw clean verify` を実行します。`TenantIsolationIntegrationTest` は PostgreSQL 上のテナント間アクセス、`ProjectServiceTest`、`TaskStateTransitionTest`、`TaskOptimisticLockTest`、`ApprovalWorkflowTest`、`IdempotencyTest`、`SecurityAccessTest` はそれぞれ業務・セキュリティ規則を確認します。ドキュメントのビルドは表示とリンクの確認であり、Java やフロントエンドのテストではありません。
