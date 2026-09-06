# API 契約

業務 API は `/api/v1` プレフィックスと共通レスポンスを使用します。

```json
{"code":0,"message":"success","data":{}}
```

`code === 0` が成功です。ページングは `items`、`page`、`pageSize`、`total` に統一します。フロントエンド型の正本は `packages/effects/api/src/types.ts` です。Java VO を変更するときは、その型、Nitro Mock、両側のテストも同時に更新してください。

ヘルスチェック、OpenAPI、ログイン、登録、更新、および `/api/v1/public/**` は匿名アクセス可能です。それ以外は原則として Access Token が必要です。
