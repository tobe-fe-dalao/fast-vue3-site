# Main 共享包

| 包 | 目录 | 职责 |
| --- | --- | --- |
| `@fast-vue3/shared` | `packages/@core/shared` | 共享契约、常量与语言配置；位于 packages/@core/shared。 |
| `@fast-vue3/constants` | `packages/constants` | 跨应用常量。 |
| `@fast-vue3/access` | `packages/effects/access` | 可选的 setupAccessGuard 与 accessDirective；需在应用中明确注册。 |
| `@fast-vue3/layout` | `packages/effects/layout` | useLayout 与 ROUTE_TITLES，提供共享布局逻辑。 |
| [`@fast-vue3/api`](/zh/packages/api) | `packages/effects/api` | 14 个框架应用共用的业务接口、请求参数与响应契约。 |
| `@fast-vue3/request` | `packages/effects/request` | createHttpClient 创建 Axios 实例，createRequest 解包 `{ code, message, data }`。 |
| `@fast-vue3/locales` | `packages/locales` | 语言消息数据与 locale 类型，不能直接等同于完整 i18n 运行时。 |
| `@fast-vue3/preferences` | `packages/preferences` | usePreferences 管理主题、主色、侧栏和布局偏好。 |
| `@fast-vue3/stores` | `packages/stores` | setupStore、useAppStore、useUserStore，组合 Pinia 与持久化。 |
| `@fast-vue3/styles` | `packages/styles` | global、reset、themes、site 等样式入口。 |
| `@fast-vue3/types` | `packages/types` | 跨应用类型。 |
| `@fast-vue3/utils` | `packages/utils` | 鉴权、日期和通用工具。 |

包存在不代表所有应用都使用其全部能力。以各应用的 import 和初始化流程为准；尤其是守卫、国际化和主题服务需要显式接入。

共享工具 `internal/vite-config`、`internal/tsconfig`、`internal/lint-configs` 属于工程层，不属于这里的运行时包。
