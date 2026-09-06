# 请求、Mock 与登录

## 接口约定

```js
{ code: 200, result: { token: '…' }, message: 'ok', status: 'ok' }
```

`src/utils/http/axios/client.ts` 中 `createHttpClient` 支持注入 token 获取方法，方法的泛型对应 `result`。HTTP 2xx 进入业务解析，204 返回 undefined；业务失败抛出 ApiError。Axios 错误与取消对象保留，调用方可以识别超时和 HTTP 状态。

```ts
import { get } from '@/utils/http/axios';
import type { UserProfile } from '@/api/user/types';
const profile = await get<UserProfile>({ url: '/user/profile' });
```

## 开发 Mock

默认开发模式启用 `/api/user/login`、`/api/user/profile`、`/api/user/logout`，演示账号为 `test / test`。Mock profile 不返回密码或 token。演示 token 固定，不模拟真正服务端撤销。

登录流程：校验输入 → 请求 token → 存储 token → 读取资料 → 跳转。资料失败清理会话并显示错误；提交期间禁止重复请求。退出的 finally 会清理本地状态。

## 接入真实后端

```dotenv
VITE_USE_MOCK=false
VITE_OPEN_PROXY=true
VITE_APP_API_BASEURL=/api
VITE_API_TARGET=http://localhost:8080
```

Mock 和代理互斥。代理移除 `/api` 前缀再发送后端，例如 `/api/user/profile` → `/user/profile`。如后端需要保留前缀，调整 `build/vite/proxy.ts`。更改 API base 时要同步 Mock 路径；当前 Mock 固定 `/api`。

生产构建永不启动本地 Mock。前端登录示例不替代后端身份验证、授权与 token 失效策略。
