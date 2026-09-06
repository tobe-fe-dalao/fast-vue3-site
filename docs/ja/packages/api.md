# @fast-vue3/api

`packages/effects/api` は web と site が共有する唯一の業務 API です。

```ts
const comments = await api.portal.blogComments(articleId);
const comment = await api.portal.createBlogComment(articleId, { content });
const order = await api.portal.checkout({ planId: 2, channel: 'alipay' });
```

公開読み取りは `/public/**` を使います。認証が必要な操作はそのプレフィックスを使わず、リクエスト interceptor が Access Token を付与します。API 追加時は TypeScript 型、Nitro、Spring、テストを同時に更新してください。
