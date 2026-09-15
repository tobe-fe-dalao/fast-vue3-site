# Main 开发与脚手架

```sh
pnpm install --frozen-lockfile
pnpm dev:web-antd
pnpm dev:site-antd
pnpm lint
pnpm typecheck
pnpm build:web-antd
```

根 `pnpm dev` 打开交互式应用选择器。应用脚本统一使用
`dev:web-*` / `dev:site-*` 完整名称，避免后台与门户站点混淆。

`pnpm dev` 等同于 `pnpm dev:mock`：选择前端并为其启动 Nitro Mock。`pnpm dev:server` 选择前端并代理到单独运行的 Java 服务；指定应用可用 `VITE_DEV_BACKEND=server pnpm dev:web-antd`。Mock API 单独启动用 `pnpm dev:mock:api`，Java 容器单独启动用 `pnpm dev:server:api`。

## 创建应用

```sh
pnpm create-app
```

选择 admin 或 site，以及 antd/arco/element-plus/idux/naive/primevue/tdesign。生成 `apps/<name>`，并在根 package.json 添加 `dev:<name>` 与 `build:<name>`。

源码是 `scripts/vsh/src/create-app/index.ts`，可执行文件加载已编译 dist。修改脚手架后执行 `pnpm -F @fast-vue3/vsh run stub`。

## Turbo

build 和 dev 都依赖上游 `^build`；dev 为 persistent、cache=false。类型检查是独立任务。不要为了修一个应用而无条件构建整个工作区，优先选择目标脚本验证。

根 `pnpm typecheck` 现在也检查 `internal/vite-config` 和 `scripts/vsh` 的 TypeScript 源码。

[源码：`scripts/vsh/src/create-app/index.ts`](https://github.com/tobe-fe-dalao/fast-vue3/blob/main/scripts/vsh/src/create-app/index.ts) · [源码：`turbo.json`](https://github.com/tobe-fe-dalao/fast-vue3/blob/main/turbo.json)
