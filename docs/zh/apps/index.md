# Main 应用清单

本页只描述 `main` 分支。包含七个 `web-*` 后台、七个 `site-*` 门户、通用 `web-app` 和一个 Nitro Mock 服务，共 16 个应用。

| 应用 | 开发命令 | 开发端口声明 |
| --- | --- | --- |
| `backend-mock` | `pnpm dev:mock:api`（`dev:backend-mock` 别名） | 5320 |
| `site-antd` | `pnpm dev:site-antd` | — |
| `site-arco` | `pnpm dev:site-arco` | — |
| `site-ele` | `pnpm dev:site-ele` | — |
| `site-idux` | `pnpm dev:site-idux` | — |
| `site-naive` | `pnpm dev:site-naive` | — |
| `site-primevue` | `pnpm dev:site-primevue` | — |
| `site-tdesign` | `pnpm dev:site-tdesign` | — |
| `web-antd` | `pnpm dev:web-antd` | 3001 |
| `web-app` | `pnpm dev:web-app` | 3008 |
| `web-arco` | `pnpm dev:web-arco` | 3002 |
| `web-ele` | `pnpm dev:web-ele` | 3003 |
| `web-idux` | `pnpm dev:web-idux` | 3007 |
| `web-naive` | `pnpm dev:web-naive` | 3004 |
| `web-primevue` | `pnpm dev:web-primevue` | 3006 |
| `web-tdesign` | `pnpm dev:web-tdesign` | 3005 |

前端端口来自应用 `.env.development`；Mock API 的 5320 端口由 `apps/backend-mock/package.json` 的启动脚本指定。其他“—”表示未在该应用的环境文件声明端口，以启动输出为准。

后台涵盖 Ant Design Vue、Arco、Element Plus、iDux、Naive UI、PrimeVue 和 TDesign。Polyrepo 的 DevUI 不属于本清单。

七个 `site-*` 的公开内容页面通过 `@fast-vue3/api` 获取数据，联系表单、评论和结算也使用共享客户端。`web-app` 接入首页、特性、关于、博客列表和联系接口。七个 `web-*` 的仪表盘、分析、用户和角色页面使用 API 数据；`web-antd` 另有企业业务流程。Java 服务需单独启动，再用 `VITE_DEV_BACKEND=server pnpm dev:<应用名>` 运行指定前端。

[新增应用](/zh/apps/add-new) · [架构](/zh/monorepo/architecture)
