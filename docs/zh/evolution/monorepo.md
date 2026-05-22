# Monorepo 新架构

> 本章描述 `main` 分支上的当前架构，这是 Fast Vue3 的长期演进方向。

## 设计原则

1. **低长期维护成本** — 合理的包边界，避免过度抽象
2. **可扩展性** — 新增 UI 生态只需添加一个 app
3. **共享优先** — 基础设施一次编写，多处复用
4. **工具链统一** — 所有应用共享同一套 lint、tsconfig、vite-config

## 完整目录结构

```
fast-vue3/
├── apps/                             # UI 生态应用层
│   ├── web-antd/                     # Ant Design Vue (port 3001)
│   ├── web-ele/                      # Element Plus (port 3002)
│   ├── web-naive/                    # Naive UI (port 3003)
│   ├── web-arco/                     # Arco Design (port 3004)
│   └── web-tdesign/                  # TDesign Vue Next (port 3005)
│
├── packages/                         # 共享业务包
│   ├── @core/
│   │   └── shared/                   # 核心类型 + 常量
│   ├── utils/                        # 工具函数
│   ├── stores/                       # Pinia store
│   ├── locales/                      # i18n 资源
│   └── effects/
│       ├── request/                  # HTTP 请求封装
│       └── access/                   # 路由权限守卫
│
├── internal/                         # 工程内部基础设施
│   ├── vite-config/                  # Vite 配置工厂（需预编译）
│   ├── tsconfig/                     # TSConfig 基础配置
│   └── lint-configs/
│       ├── eslint-config/
│       ├── prettier-config/
│       ├── stylelint-config/
│       └── commitlint-config/
│
├── scripts/                          # 工程脚本
│   └── clean.mjs
│
├── turbo.json                        # Turbo 任务编排
├── pnpm-workspace.yaml               # workspace + catalog 配置
├── package.json                      # 根 package（dev scripts + workspace devDeps）
├── eslint.config.mjs                 # 根 ESLint 配置
├── prettier.config.mjs               # 根 Prettier 配置
├── stylelint.config.mjs              # 根 Stylelint 配置
├── unocss.config.ts                  # 根 UnoCSS 配置（所有 app 共用）
├── lefthook.yml                      # Git Hooks 配置
└── .commitlintrc.js                  # Commitlint 配置
```

## 包分割策略

### `packages/@core/shared`

最底层的核心包，**不依赖任何其他 workspace 包**：

```ts
// 常量
export const TOKEN_KEY = "fast-vue3:token";
export const DEFAULT_LOCALE = "zh-CN";

// 类型
export interface IResponse<T> {
  code: number;
  result: T;
  message: string;
}
```

### `packages/utils`

依赖 `@core/shared`，提供纯函数工具：

- `getToken / setToken / clearToken` — 基于 localStorage 的 Token 管理
- `formatDate / formatDateTime` — dayjs 封装
- `deepMerge / throttle / debounce` — 通用 helpers

### `packages/stores`

依赖 `@core/shared` 和 `utils`，提供 Pinia store：

- `useUserStore` — 用户信息、Token、角色
- `useAppStore` — 主题、语言、侧边栏折叠状态

所有 store 启用 `pinia-plugin-persistedstate`。

### `packages/locales`

依赖 `@core/shared`，提供 i18n 资源：

```ts
import { zhCN, enUS } from "@fast-vue3/locales";
```

### `packages/effects/request`

依赖 `@core/shared` 和 `utils`，提供 HTTP 客户端：

```ts
const client = createHttpClient(baseURL);
const { get, post, put, del } = createRequest(client);
```

包含请求拦截器（自动附加 Authorization header）和响应拦截器（统一解包 `res.data.result`）。

### `packages/effects/access`

依赖 `stores`，提供路由权限守卫：

```ts
setupAccessGuard(router, { whiteList: ["/login"] });
```

### `internal/vite-config`

工程内部包，提供 `defineConfig` 工厂：

```ts
// apps/web-antd/vite.config.ts
import { defineConfig } from "@fast-vue3/vite-config";

export default defineConfig(async () => ({
  application: {
    uiResolvers: [
      AntDesignVueResolver({ resolveIcons: true, importStyle: false }),
    ],
  },
  vite: { server: { port: 3001 } },
}));
```

此包**必须预编译**（tsdown → dist/index.js），因为 Node.js 需要执行 vite.config.ts 时无法直接运行 TypeScript。

## 关键技术决策解析

### 为什么 `packages/*` 直接导出 TypeScript？

`packages/*` 的业务包导出 TypeScript 源码：

```json
{
  "exports": { ".": { "types": "./src/index.ts", "default": "./src/index.ts" } }
}
```

因为它们只被 Vite 处理的应用代码引用，Vite 可以直接编译 TypeScript，无需预先编译成 JavaScript。好处是修改包代码后 HMR 立即生效，无需手动 rebuild。

### 为什么 `internal/vite-config` 需要预编译？

```json
{
  "exports": { ".": { "types": "./src/index.ts", "import": "./dist/index.js" } }
}
```

`vite.config.ts` 在 Node.js 上下文中执行（不通过 Vite 转换），Node.js ESM 运行时无法直接加载 `.ts` 文件，因此必须编译为 `.js`。

### 为什么使用 `unocss.config.ts` 而非各 app 内联配置？

UnoCSS 配置放在根目录，所有 app 共享同一份预设（shortcuts、safelist、presets），避免原子类样式的不一致。

## 演进路径

当前架构为基础版本。可能的演进方向（按需添加，不预先设计）：

- 添加更多共享 UI 组件到 `packages/` 下的 `ui/` 包
- 添加更多业务模块（权限管理、通知中心等）作为独立的 `packages/effects/*`
- 引入 VueI18n 到 `packages/locales` 实现运行时切换语言
- 为各 app 添加更多页面（用户管理、数据分析等）
