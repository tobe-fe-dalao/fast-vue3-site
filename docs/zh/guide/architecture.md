# 架构概览

Fast Vue3 是一个 **Vue3 Monorepo 工程平台**，而非单一的 Admin 模板。其核心定位是：

> 一套可复用的前端工程基础，同时集成多套主流 Admin UI 生态，作为可长期演进的前端基础设施平台。

## 工程分层

```
┌─────────────────────────────────────────────────────┐
│                     apps/                           │
│  web-antd  web-ele  web-naive  web-arco  web-tdesign│
│  （各 UI 生态独立运行，各有自己的路由、布局、主题）     │
└─────────────────┬───────────────────────────────────┘
                  │ 依赖
┌─────────────────▼───────────────────────────────────┐
│                   packages/                         │
│  @core/shared  utils  stores  locales               │
│  effects/request  effects/access                    │
│  （业务基础层，所有 app 共享）                         │
└─────────────────┬───────────────────────────────────┘
                  │ 工程设施
┌─────────────────▼───────────────────────────────────┐
│                  internal/                          │
│  vite-config  tsconfig  lint-configs                │
│  （工程基础设施，不含业务逻辑）                        │
└─────────────────────────────────────────────────────┘
```

## 核心技术决策

### pnpm Workspace + Catalog

`pnpm-workspace.yaml` 通过 `catalog:` 字段统一管理所有依赖版本：

```yaml
catalog:
  vue: ^3.5.17
  vite: ^7.3.3
  typescript: ^5.9.3
  # ...所有 UI 库版本
```

所有 workspace 包在 `package.json` 中使用 `catalog:` 引用，确保版本一致性。

### Turbo 任务编排

`turbo.json` 定义任务依赖关系：

```json
{
  "tasks": {
    "build": { "dependsOn": ["^build"] },
    "dev": { "dependsOn": ["^build"], "persistent": true, "cache": false }
  }
}
```

`dev` 任务的 `dependsOn: ["^build"]` 确保启动任何应用前，其所有依赖包（特别是 `@fast-vue3/vite-config`）都已预先构建。

### vite-config 预编译策略

`@fast-vue3/vite-config` 是特殊的工程包：

- 它被 `apps/` 中的 `vite.config.ts` 引用
- Node.js 执行 `vite.config.ts` 时需要加载此包
- 因此它**必须编译为 JS**，不能直接导出 TypeScript 源码

解决方案：使用 `tsdown`（基于 Rolldown）将其编译为 `dist/index.js`。

其他 `packages/*` 则直接导出 TypeScript 源码（`"default": "./src/index.ts"`），由 Vite 在应用构建时处理。

### 端口分配

| 应用        | UI 框架          | 端口 |
| ----------- | ---------------- | ---- |
| web-antd    | Ant Design Vue   | 3001 |
| web-ele     | Element Plus     | 3002 |
| web-naive   | Naive UI         | 3003 |
| web-arco    | Arco Design      | 3004 |
| web-tdesign | TDesign Vue Next | 3005 |

## 应用内部结构

每个 `apps/*` 应用采用统一的内部结构：

```
apps/web-{name}/
├── src/
│   ├── api/
│   │   ├── http.ts          # createHttpClient + createRequest 实例
│   │   └── user/
│   │       └── index.ts     # 用户相关 API
│   ├── plugins/
│   │   └── {name}.ts        # UI 框架 setup 函数
│   ├── router/
│   │   └── index.ts         # 路由配置 + setupAccessGuard
│   ├── views/
│   │   ├── index.vue         # 主布局（含侧边栏、Header）
│   │   ├── login/
│   │   │   └── index.vue    # 登录页
│   │   └── dashboard/
│   │       └── index.vue    # 仪表盘页
│   ├── App.vue
│   └── main.ts
├── mock/
│   ├── helpers.ts            # Mock 响应工具
│   └── user.ts              # 用户接口 Mock
├── types/
│   └── env.d.ts             # 环境变量类型声明
├── .env                     # 基础环境变量
├── .env.development         # 开发环境变量
├── .env.production          # 生产环境变量
├── tsconfig.json            # 继承 @fast-vue3/tsconfig/web-app
└── vite.config.ts           # 使用 @fast-vue3/vite-config defineConfig
```

## 共享基础设施

所有应用通过 `packages/*` 共享：

- **@fast-vue3/shared** — 核心类型、常量（Token key、locale key 等）
- **@fast-vue3/utils** — 鉴权工具（getToken/setToken）、日期格式化、通用 helpers
- **@fast-vue3/stores** — Pinia store（useUserStore/useAppStore）+ persistedstate 插件
- **@fast-vue3/locales** — zh-CN / en-US 国际化资源
- **@fast-vue3/request** — axios 封装（createHttpClient/createRequest）
- **@fast-vue3/access** — 路由权限守卫（setupAccessGuard）+ v-access 指令
