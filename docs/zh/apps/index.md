# Main 应用清单

本页只描述 `main` 分支。包含七个 `web-*` 后台、七个 `site-*` 门户、通用 `web-app` 和一个 Nitro Mock 服务，共 16 个应用。

| 应用 | 开发命令 | 开发端口声明 |
| --- | --- | --- |
| `backend-mock` | `pnpm dev:backend-mock` | — |
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

端口来自应用 `.env.development`；“—”表示未在该文件声明，不应把共享配置默认值当成独立保留端口。以启动输出为准。

后台涵盖 Ant Design Vue、Arco、Element Plus、iDux、Naive UI、PrimeVue 和 TDesign。Polyrepo 的 DevUI 不属于本清单。

`site-*` 是带首页、产品、定价、文章、FAQ 等页面的门户模板，和后台 web-* 独立运行。`web-app` 是通用站点式应用。

[新增应用](/zh/apps/add-new) · [架构](/zh/monorepo/architecture)
