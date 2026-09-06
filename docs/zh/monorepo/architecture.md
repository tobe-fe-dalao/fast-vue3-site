# Main Monorepo 架构

```text
apps/       # 16 个可运行应用
packages/   # 11 个共享运行时包
internal/   # Vite、TS、lint 和 Node 工具
scripts/    # vsh 脚手架与 turbo-run
pnpm-workspace.yaml  # workspace 与 catalog
turbo.json           # 任务图和缓存
```

## 包与依赖

`workspace:*` 表示本地包链接，`catalog:` 从根 pnpm-workspace.yaml 取统一版本。运行时代码通常由应用 Vite 编译；工程工具必须能被 Node 加载。

`@fast-vue3/vite-config` 的运行时导出为 `dist/index.mjs`，类型入口为 `src/index.ts`。安装后的 stub 和 Turbo `^build` 依赖确保工具先构建。不要把它误写成“所有包都直接执行 TypeScript”。

## 启动链路（web-antd 实例）

`src/main.ts` → setupStore → setupAntd → setupRouter → router.isReady → mount。文件路由拆分登录与后台 Layout，守卫读取用户会话；其他 UI 应用有自己的适配实现。

共享 `@fast-vue3/access` 提供可选 guard/directive，但当前 web-antd 的路由文件直接定义守卫，并不是每个应用都调用了 setupAccessGuard。

## 样式和偏好

共享 styles 提供 global/reset/themes/site 入口；应用自身 UI 插件/Provider 负责框架主题。preferences Store 管理主题、主色、侧栏、标签页、语言等偏好。不能只修改 polyrepo 的 --fv-* 就期待 main 同步变化。

[源码：`internal/vite-config/src/config/application.ts`](https://github.com/tobe-fe-dalao/fast-vue3/blob/main/internal/vite-config/src/config/application.ts) · [源码：`apps/web-antd/src/main.ts`](https://github.com/tobe-fe-dalao/fast-vue3/blob/main/apps/web-antd/src/main.ts)
