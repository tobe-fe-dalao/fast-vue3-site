# Main 的 Mock 与请求

Main 使用 `apps/backend-mock` 的 Nitro 服务。默认执行 `pnpm dev:mock`，共享 Vite 插件会启动 Mock 并把应用的 `/api/v1` 请求代理到 `http://localhost:5320`；也可以用 `pnpm dev:backend-mock` 单独启动。

服务包含用户登录/资料、角色、菜单、部门、字典、日志、监控和统计等模拟接口。内置账号为 `admin / 123456` 与 `user / 123456`。

## 请求实例

```ts
import { createHttpClient, createRequest } from '@fast-vue3/request';
const client = createHttpClient(import.meta.env.VITE_APP_API_BASEURL ?? '/api/v1');
export const http = createRequest(client);
```

`createHttpClient` 返回配置好 Token 与 HTTP 错误处理的 Axios 实例，`createRequest` 提供 `get / post / put / del` 并解包 `{ code, message, data }`。`code !== 0` 会抛出包含后端消息的异常。

页面不应直接调用请求实例，而应通过 `@fast-vue3/api` 的业务域客户端访问接口。这样在 Nitro 与 `fast-vue3-server` 间切换时不需要改页面代码。

Mock 是开发与集成测试服务，不是生产身份系统。真实后端的启动与切换见[真实后端联调](/zh/monorepo/backend-integration)。

Mock 与真实服务使用同一鉴权边界：`GET /api/v1/public/**` 可匿名访问，`POST /api/v1/blog/{id}/comments` 与 `POST /api/v1/payments/checkout` 必须登录。集成测试会实际启动 Nitro 监听端口，验证匿名读取、匿名写入 401、登录、评论与创建订单。

[源码：`apps/backend-mock/api/v1`](https://github.com/tobe-fe-dalao/fast-vue3/tree/main/apps/backend-mock/api/v1) · [源码：`packages/effects/request/src/client.ts`](https://github.com/tobe-fe-dalao/fast-vue3/blob/main/packages/effects/request/src/client.ts)
