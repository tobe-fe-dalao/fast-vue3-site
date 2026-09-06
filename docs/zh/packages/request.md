# @fast-vue3/request

适用分支：`main`。路径：`packages/effects/request`。

`createHttpClient` 创建 Axios 实例并自动附加 Bearer Token，`createRequest` 提供类型化方法并解包统一响应信封。

```ts
import { createHttpClient, createRequest } from '@fast-vue3/request';
const http = createRequest(createHttpClient('/api/v1'));
const data = await http.get<unknown>({ url: '/auth/me' });
```

HTTP 工厂与数据解包是两个步骤。2xx 响应会正常进入解包逻辑；`code !== 0`、非 2xx 与网络失败都会转换为可捕获的 `Error`。页面通常无需直接使用本包，而是使用上层 [`@fast-vue3/api`](/zh/packages/api)。

[源码：`packages/effects/request/src/index.ts`](https://github.com/tobe-fe-dalao/fast-vue3/blob/main/packages/effects/request/src/index.ts)

[返回包清单](/zh/packages/)
