# Polyrepo 架构

> 本章记录 `polyrepo` 分支上的架构设计与工程实践，代表单仓单应用的极致工程化方向，与 `main` 分支并行演进。

## 原始目录结构

```
fast-vue3/          ← 单仓库，单应用
├── src/
│   ├── api/
│   │   └── user/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── styles/
│   ├── components/
│   │   ├── Header/
│   │   └── SvgIcon/
│   ├── hooks/
│   ├── layout/
│   ├── router/
│   ├── store/
│   │   └── modules/
│   │       ├── app/
│   │       └── user/
│   ├── utils/
│   │   └── http/
│   │       └── axios/
│   └── views/
├── build/
│   └── vite/
│       └── plugins/
├── mock/
├── types/
├── public/
├── vite.config.mts
└── package.json
```

## 架构特征

### 优点

- **简单直接** — 单一仓库，上手成本低
- **无额外工具** — 不需要 Turbo、pnpm workspace
- **快速启动** — `npm install && vite` 即可运行

### 技术债务

| 问题                     | 影响                       |
| ------------------------ | -------------------------- |
| 所有代码混合在 `src/` 下 | 职责边界模糊，难以拆分复用 |
| Vite 配置直接写在根目录  | 无法在多项目间共享         |
| 无 TypeScript 严格模式   | 类型安全性不足             |
| 依赖版本无锁定策略       | 升级风险高                 |
| 缺乏代码规范工具链       | 多人协作质量参差不齐       |

## Phase 1 优化内容

在归档前，对 Polyrepo 进行了以下规范化工作：

### 目录规范化

- 整理 `src/` 下的模块划分
- 统一 `api/` 层结构（按业务模块分目录）
- 规范化 `store/modules/` 命名

### 工程配置优化

- 引入 `eslint.config.mjs`（Flat Config 格式）
- 统一 Prettier 配置
- 添加 Stylelint 支持 Less 和 Vue 文件
- 配置 `commitlint` + `czg` 交互式提交
- 引入 Lefthook 替代 Husky（更轻量）

### TypeScript 规范化

- 补全 `types/` 下的全局类型声明
- 统一环境变量类型（`ImportMetaEnv`）
- 规范化接口返回类型（`IResponse<T>`）

### HTTP 层规范

- 封装 axios 实例，统一请求/响应拦截器
- 统一错误处理（HTTP 状态码映射）
- 规范 API 调用方式（`userApi.login()` 而非直接调用 axios）

## 归档过程

```bash
# 1. 在 main 上完成所有优化
git add -A && git commit -m "refactor: Phase 1 - Polyrepo 精炼与规范化"

# 2. 创建 polyrepo 归档分支
git checkout -b polyrepo

# 3. 在 polyrepo 分支打 tag
git tag v0.3.0-polyrepo-final

# 4. 返回 main 准备重建
git checkout main
```

`polyrepo` 分支永久保留作为历史参考。

## 局限性总结

Polyrepo 架构在以下场景下力不从心：

1. **需要支持多套 UI** — 必须 fork 整个仓库或大量复制代码
2. **团队协作** — 没有清晰的包边界，难以分工
3. **依赖版本管理** — 无 catalog 机制，依赖版本容易漂移
4. **代码复用** — `src/utils`、`src/hooks` 等无法被其他项目直接引用
5. **构建优化** — 缺乏 Turbo 等任务编排工具，无法利用构建缓存

这些局限性是驱动向 Monorepo 迁移的根本原因。
