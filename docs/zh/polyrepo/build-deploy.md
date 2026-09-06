# 构建、检查与部署

```sh
pnpm check
pnpm build
pnpm build:antd
pnpm build:analyze
```

- `check`：只读 ESLint、应用与构建配置类型检查、Node 原生测试。
- `build`：类型检查后构建生产模式。
- `build:<ui>`：构建所选 UI；完整验证仍应运行 check。
- `build:analyze`：显式生成体积报告，普通构建不启动分析器。

`.env.production` 默认 base 为 `/fast-vue3/`。框架 mode 文件默认 base 为 `/`；部署子目录时通过本地 mode 文件或构建环境设置 `VITE_BASE_URL`。该路径与文档站的 `/fast-vue3-site/` 是两个独立配置。

开发 HTTPS 仅在 `VITE_DEV_HTTPS=true` 时启用。图片压缩不再隐式调用 native 安装工具。不要提交 dist、缓存或 node_modules。

CI 覆盖 all 和七种单框架模式；普通 push/PR 只验证，workflow_dispatch 可以在所有验证成功后部署已验证产物。本轮文档更新不会发布线上站点。
