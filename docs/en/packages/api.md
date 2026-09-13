# @fast-vue3/api

`packages/effects/api` is the single business API surface used by web and site applications.

```ts
const posts = await api.portal.blogList({ page: 1 });
const comments = await api.portal.blogComments(articleId);
const comment = await api.portal.createBlogComment(articleId, { content });
const order = await api.portal.checkout({ planId: 2, channel: 'alipay' });
```

Public read methods use `/public/**`. Authenticated interaction methods deliberately omit that prefix and receive the access token from the request interceptor. When adding an endpoint, update the TypeScript types, domain module, Nitro implementation, Spring implementation, and tests together.

`createApi(http)` also exposes `tenant`, `organization`, `department`, `project`, `task`, `approval`, `notification`, `audit`, and `file` clients from `src/modules/enterprise.ts`. Project creation and approval submission accept an `Idempotency-Key`; project and task updates carry `version`. `file.download()` returns a `Blob` through the request layer's binary helper. See the [enterprise contract](/en/server/api/enterprise) for routes and permissions.
