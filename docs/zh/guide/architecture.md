# 两条架构路径

## Polyrepo：在一个应用内切换 UI

`config/ui.ts` → Vite 别名与 resolver → UI 初始化、主题容器、登录适配、展示适配。页面与状态逻辑保持独立，组件库代码通过构建期选择。

业务依赖方向是 `页面 → Store → API → HTTP`。Node 工具在 `build/`，浏览器运行时代码在 `src/`，Mock 在 `mock/`。

## Main：应用隔离，共享工程能力

`apps/` 放后台与门户；`packages/` 提供请求、状态、布局、偏好、类型和样式；`internal/` 提供 Vite/TS/lint 工具；`scripts/` 提供交互启动和应用脚手架。`workspace:*` 链接本地包，`catalog:` 统一依赖版本。

两条路径都支持多个 UI 生态。差别是隔离单位：polyrepo 通过构建模式隔离，main 通过独立应用隔离。不要把多 UI 共存等同于多个应用，也不要把单应用描述为“没有锁文件、没有规范工具”。

详见 [Polyrepo 架构](/zh/polyrepo/architecture) 与 [Monorepo 架构](/zh/monorepo/architecture)。
