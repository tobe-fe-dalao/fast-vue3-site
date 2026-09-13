# API 契約

業務 API は `/api/v1` プレフィックスと共通レスポンスを使用します。

```json
{"code":0,"message":"success","data":{}}
```

`code === 0` が成功です。ページングは `items`、`page`、`pageSize`、`total` に統一します。フロントエンド型の正本は `packages/effects/api/src/types.ts` です。Java VO を変更するときは、その型、Nitro Mock、両側のテストも同時に更新してください。

ヘルスチェック、OpenAPI、ログイン、登録、更新、および `/api/v1/public/**` は匿名アクセス可能です。それ以外は原則として Access Token が必要です。

プロジェクトや承認などの一覧はページングオブジェクトではなく配列を返します。日付のみの項目は通常 `yyyy-MM-dd`、タイムスタンプは ISO-8601 または各 API が指定する形式です。状態値の大文字・小文字はリソースごとに異なります。テナント、組織、部署は `active / disabled`、プロジェクト、タスク、承認は `ACTIVE`、`IN_PROGRESS`、`PENDING` などの大文字を使用します。

Java サービスはエラー時に適切な HTTP ステータスとゼロ以外の `code` を返します。`@fast-vue3/request` は成功時の `data` を取り出し、エラーを Promise rejection に変換します。ファイルダウンロードは JSON ではなくバイナリです。追加ルートは[企業向けドメイン](/ja/server/api/enterprise)を参照してください。
