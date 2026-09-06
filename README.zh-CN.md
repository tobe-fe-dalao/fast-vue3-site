# Fast-Vue3 文档站

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文（台灣）](README.zh-TW.md) | [繁體中文（香港）](README.zh-HK.md) | [日本語](README.ja.md)

基于 VitePress 1.6，统一维护 `main`（多应用 Monorepo）、`polyrepo`（单应用、多 UI 模式）与 `fast-vue3-server`（Spring Boot 参考后端）的文档。

线上地址：<https://tobe-fe-dalao.github.io/fast-vue3-site/>

需要 Node ≥22.18 和 pnpm 9.15.4。请先在终端选择受支持的 Node 版本。

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

本地文档地址为 `http://127.0.0.1:5174/fast-vue3-site/`，与应用默认端口 5173 分开。

- `docs/zh/guide/`：分支选择与协作流程。
- `docs/zh/polyrepo/`：单应用、UI 模式、主题、请求和部署。
- `docs/zh/monorepo/`：Workspace、共享包、Mock/真实后端联调、测试与工程工具。
- `docs/zh/server/`：后端启动、配置部署、测试、认证、RBAC、内容与接口契约。
- `docs/zh/apps/`、`docs/zh/packages/`：对应 main 分支的代码索引。
- `docs/en/`：英文主文档。
- `docs/zh/`、`docs/ja/`：中文与日文翻译。
- `docs/guide/`：保留旧链接的迁移提示。

部署默认 base 为 `/fast-vue3-site/`。部署到域名根路径时使用 `DOCS_BASE=/ pnpm build`；部署到其他子目录时，构建与预览均设置同一 `DOCS_BASE`。

`pnpm build` 启用默认死链检查。修改导航必须确保目标页面存在。请勿提交 `.vitepress/cache`、`.vitepress/dist` 或 `node_modules`。

所有长篇项目文档统一维护在本仓库；前端与后端代码仓库只保留简明 README 和对应文档链接。文档以当前 main、polyrepo 与 `fast-vue3-server` 的实际契约为准；接口变更应同步更新 API 包、Mock、Java 后端与测试说明。

站点的内容读取与评论列表允许匿名访问；管理操作、博客评论提交和价格页创建支付订单需要登录。
