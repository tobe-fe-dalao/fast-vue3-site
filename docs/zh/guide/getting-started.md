# 先选分支，再开始开发

Fast-Vue3 提供两条并行路径。`polyrepo` 是这个项目的分支名称，实际形态是**单仓单应用**；`main` 则在一个 Workspace 中维护多套应用。它们不是可以混用脚本与目录结构的两个版本。

| 对比 | `polyrepo` | `main` |
| --- | --- | --- |
| 入口 | 根目录 `src/main.ts` | `apps/*/src/main.ts` |
| UI 选择 | `.env` 中 `VITE_UI_FRAMEWORK` | 选择 `web-*` / `site-*` 应用 |
| 开发命令 | `pnpm dev`、`pnpm dev:antd` | `pnpm dev:web-antd`、`pnpm dev:site-antd` |
| 主要场景 | 单应用开发、组件比较、轻量模板 | 多后台/门户并行开发、共享基础设施 |
| 组件库差异 | 包含 DevUI；不包含 PrimeVue | 包含 PrimeVue；不包含 DevUI |
| Mock | Vite 开发插件 | Nitro 服务 `apps/backend-mock` |
| 样式基础 | UnoCSS + Less + `--fv-*` | 共享 styles + Tailwind + 各应用主题 |

建议使用 Node 22.18 或更新的受支持版本。`polyrepo` 明确要求 Node ≥22.18；`main/package.json` 的声明为 ≥20.12，但依赖工具可能有更高要求，不能仅按根声明判断。pnpm 版本分别由各分支 `packageManager` 指定（polyrepo 9.15.4、main 9.15.9）。

## 独立检出

```sh
git clone -b polyrepo https://github.com/tobe-fe-dalao/fast-vue3.git fast-vue3-polyrepo
cd fast-vue3-polyrepo
pnpm install --frozen-lockfile
pnpm dev
```

默认打开 `http://127.0.0.1:5173/`。本地 Mock 演示账号为 `test / test`。

```sh
git clone -b main https://github.com/tobe-fe-dalao/fast-vue3.git fast-vue3-main
cd fast-vue3-main
pnpm install --frozen-lockfile
pnpm dev:web-antd
```

main 的后台 Mock 账号为 `admin / 123456` 或 `user / 123456`，与 polyrepo 不同。门户页面主要是模板演示，请逐应用确认接口行为。

## 下一步

- [Polyrepo 开发指南](/zh/polyrepo/getting-started)
- [Monorepo 架构](/zh/monorepo/architecture)
- [实际应用清单](/zh/apps/)
