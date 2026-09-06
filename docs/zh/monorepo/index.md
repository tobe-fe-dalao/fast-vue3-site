# 多应用工作区

`apps/` 包含可独立启动的后台、门户和 Nitro Mock；`packages/` 包含请求、状态、偏好、样式、布局、权限、本地化与共享契约；`internal/` 和 `scripts/` 提供工程工具。

页面统一通过 `@fast-vue3/api` 使用业务接口，并可通过 `VITE_DEV_BACKEND` 在 Mock 与 Spring Boot 服务之间切换。

[Main 架构](/zh/monorepo/architecture) · [真实后端联调](/zh/monorepo/backend-integration)
