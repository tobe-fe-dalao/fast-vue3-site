# 开发工作流

## 改动前

先运行 `git branch --show-current` 确认分支。切换分支前保存工作区改动，切换后按目标分支 lockfile 重新安装依赖。不要共享或复制另一分支的 `node_modules`。

## Polyrepo

```sh
pnpm dev:antd
pnpm check
pnpm build:antd
pnpm build
```

`pnpm check` 执行 ESLint、浏览器/Node 两侧类型检查和 Node 原生回归测试。单 UI 构建不等于已经验证浏览器行为；涉及样式还需在桌面、窄屏和两种主题下检查。

## Main

```sh
pnpm dev:web-antd
pnpm lint
pnpm typecheck
pnpm build:web-antd
```

修改 vsh CLI 源码后执行 `pnpm -F @fast-vue3/vsh run stub`，修改共享 Vite 工具后执行 `pnpm -F @fast-vue3/vite-config run stub`。根目录安装后也会递归运行可用的 stub 脚本。

## 文档协作

文档站是独立仓库 `fast-vue3-site`，使用 `pnpm dev` 与 `pnpm build`。提交前检查实际导航、搜索和死链。main 的 API 行为不能直接套用到 polyrepo，反之亦然。
