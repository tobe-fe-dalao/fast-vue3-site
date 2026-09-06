# @fast-vue3/api

路径：`packages/effects/api`。这是 web 与 site 应用的唯一业务接口入口，也是 Nitro Mock 和 Java 后端共同遵守的前端契约。

```ts
import { createApi } from '@fast-vue3/api';
import { createHttpClient, createRequest } from '@fast-vue3/request';

const http = createRequest(createHttpClient('/api/v1'));
export const api = createApi(http);

const page = await api.user.list({ page: 1, pageSize: 20 });
const posts = await api.portal.blogList({ category: '工程实践' });
```

## 业务域

| 域 | 典型能力 |
| --- | --- |
| `auth` | 登录、刷新、登出、当前用户 |
| `user / role / permission / menu` | RBAC 管理 |
| `content` | 文章与分类 CRUD |
| `analytics` | 仪表盘、趋势和经营数据 |
| `log / monitor / system` | 日志、服务状态、配置、部门、字典和公告 |
| `portal` | 博客、评论、首页、产品、价格、支付下单、FAQ、文档与联系表单 |

`portal.blogComments` 是匿名读取，`portal.createBlogComment` 和 `portal.checkout` 是登录交互。后两者由请求拦截器自动携带本地保存的 Access Token。

类型集中在 `src/types.ts`，模块方法集中在 `src/modules/`。应用只创建一次 `api` 实例，并由 `VITE_APP_API_BASEURL` 决定基础路径。

## 新增接口

1. 在 `types.ts` 定义请求与响应；
2. 在对应模块添加方法；
3. 同步实现 `apps/backend-mock/api/v1` 与 `fast-vue3-server`；
4. 在共享 API 单测断言 URL、参数和 HTTP 方法；
5. 在服务端集成测试断言响应信封与分页结构。

[Request 层](/zh/packages/request) · [Mock 与请求](/zh/monorepo/mock-api)
