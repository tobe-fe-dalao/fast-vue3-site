# @fast-vue3/request

基于 Axios 的 HTTP 请求封装，提供类型安全的请求客户端。

## 使用方式

每个 app 在 `src/api/http.ts` 中初始化：

```ts
import { createHttpClient, createRequest } from '@fast-vue3/request';

const client = createHttpClient(import.meta.env.VITE_APP_API_BASEURL);
export const http = createRequest(client);
```

## API

### `createHttpClient(baseURL, timeout?)`

创建 Axios 实例，包含：
- **请求拦截器** — 自动从 `localStorage` 读取 Token，附加 `Authorization: Bearer {token}` 请求头
- **响应拦截器** — 自动解包 `res.data.result`，HTTP 错误时记录日志

### `createRequest(client)`

返回类型安全的请求方法集合：

```ts
const { get, post, put, del, request } = createRequest(client);

// GET 请求
const data = await get<User[]>({ url: '/users', params: { page: 1 } });

// POST 请求
const user = await post<User>({ url: '/users', data: { name: 'Alice' } });

// PUT 请求
const updated = await put<User>({ url: '/users/1', data: { name: 'Bob' } });

// DELETE 请求
await del<void>({ url: '/users/1' });
```

泛型参数 `T` 对应 `IResponse<T>` 中 `result` 字段的类型，拦截器自动解包。

## 与 API 层配合

推荐将每类 API 封装为对象：

```ts
// src/api/user/index.ts
import { http } from '../http';

export const userApi = {
  login: (params: LoginParams) =>
    http.post<LoginResult>({ url: '/user/login', data: params }),

  getProfile: () =>
    http.get<UserProfile>({ url: '/user/profile' }),

  logout: () =>
    http.post<void>({ url: '/user/logout' }),
};
```
