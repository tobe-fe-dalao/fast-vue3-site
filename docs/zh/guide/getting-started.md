# 快速上手

## 环境要求

| 工具 | 版本要求 |
|------|---------|
| Node.js | >= 20.0.0 |
| pnpm | >= 9.5.0 |
| Git | >= 2.30 |

> 推荐使用 [Corepack](https://nodejs.org/api/corepack.html) 管理 pnpm 版本：  
> `corepack enable && corepack prepare pnpm@9.15.9 --activate`

## 克隆仓库

```bash
git clone https://github.com/tobe-fe-dalao/fast-vue3.git
cd fast-vue3
```

## 安装依赖

```bash
pnpm install
```

首次安装会自动执行 `prepare` 脚本，该脚本会：
1. 安装 Lefthook Git Hooks
2. 构建 `@fast-vue3/vite-config`（将 TypeScript 源码编译为 ESM）

## 启动开发服务器

每个 UI 生态系统对应一个独立的 dev 命令：

```bash
# Ant Design Vue (port 3001)
pnpm dev:antd

# Element Plus (port 3002)
pnpm dev:ele

# Naive UI (port 3003)
pnpm dev:naive

# Arco Design (port 3004)
pnpm dev:arco

# TDesign Vue Next (port 3005)
pnpm dev:tdesign
```

Turbo 会自动在启动应用前先构建其依赖项（`@fast-vue3/vite-config`）。

## 构建生产版本

```bash
# 构建所有应用
pnpm build

# 构建单个应用
pnpm build:antd
pnpm build:ele
pnpm build:naive
pnpm build:arco
pnpm build:tdesign
```

## 类型检查

```bash
pnpm typecheck
```

## 代码规范检查

```bash
# 检查
pnpm lint

# 自动修复
pnpm lint:fix

# 格式化
pnpm format
```

## 提交代码

使用 `czg` 提供交互式 Commit 向导：

```bash
pnpm commit
```

提交前会自动触发：
- `lint-staged`：对暂存文件运行 ESLint、Prettier、Stylelint
- `commitlint`：验证 Commit 消息格式

## 清理构建产物

```bash
pnpm clean
```

该命令会递归删除所有工作区包中的 `dist/`、`.turbo/`、`node_modules/`、`.cache/` 目录。

## 目录结构

```
fast-vue3/
├── apps/                    # 各 UI 生态应用
│   ├── web-antd/            # Ant Design Vue 应用（port 3001）
│   ├── web-ele/             # Element Plus 应用（port 3002）
│   ├── web-naive/           # Naive UI 应用（port 3003）
│   ├── web-arco/            # Arco Design 应用（port 3004）
│   └── web-tdesign/         # TDesign Vue Next 应用（port 3005）
├── packages/                # 共享业务包
│   ├── @core/shared/        # 核心类型定义与常量
│   ├── utils/               # 工具函数
│   ├── stores/              # Pinia 状态管理
│   ├── locales/             # 国际化资源
│   └── effects/
│       ├── request/         # HTTP 请求封装
│       └── access/          # 权限路由守卫
├── internal/                # 工程内部包
│   ├── vite-config/         # 统一 Vite 配置工厂
│   ├── tsconfig/            # TypeScript 基础配置
│   └── lint-configs/        # Lint 规则包
├── scripts/                 # 工程脚本
├── turbo.json               # Turbo 任务编排配置
└── pnpm-workspace.yaml      # pnpm workspace + catalog 配置
```
