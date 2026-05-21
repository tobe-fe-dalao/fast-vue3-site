# 应用概览

Fast Vue3 包含 5 个独立的 UI 生态应用，每个应用：

- 有独立的路由系统
- 有独立的布局和主题
- 共享所有 `packages/*` 基础设施
- 运行在独立端口上

## 应用列表

| 应用 | UI 框架 | 端口 | 命令 |
|------|---------|------|------|
| web-antd | Ant Design Vue 4.x | 3001 | `pnpm dev:antd` |
| web-ele | Element Plus 2.x | 3002 | `pnpm dev:ele` |
| web-naive | Naive UI 2.x | 3003 | `pnpm dev:naive` |
| web-arco | Arco Design Vue 2.x | 3004 | `pnpm dev:arco` |
| web-tdesign | TDesign Vue Next 1.x | 3005 | `pnpm dev:tdesign` |

## 共同特征

所有应用都实现了以下功能：

### 认证流程
1. 未登录用户访问受保护路由 → 自动重定向到 `/login`
2. 登录成功 → 获取用户信息 → 进入主布局
3. 退出登录 → 清除 Token → 重定向到 `/login`

认证逻辑由 `@fast-vue3/access` 的 `setupAccessGuard` 统一提供。

### 主布局
所有应用的主布局 `src/views/index.vue` 包含：
- 侧边栏导航（可折叠）
- 顶部 Header（用户信息 + 退出）
- 内容区域（`<RouterView />`）

### 文件路由
使用 `unplugin-vue-router`，`src/views/` 下的 `.vue` 文件自动映射为路由：

```
src/views/index.vue       → /
src/views/login/index.vue → /login
src/views/dashboard/index.vue → /dashboard
```

### Mock 数据
每个应用的 `mock/` 目录提供以下 API Mock：

```
POST /api/user/login    → { token: 'mock-token-xxx' }
GET  /api/user/profile  → { userName, avatar, role }
POST /api/user/logout   → {}
```

## UI 隔离策略

各应用的 UI 组件**不会互相干扰**：

- Element Plus 组件只在 `web-ele` 中使用
- Ant Design Vue 组件只在 `web-antd` 中使用
- 自动按需引入，不会打包未使用的 UI 组件

组件自动引入通过各 app 的 `vite.config.ts` 中传入的 resolver 实现：

```ts
// web-antd/vite.config.ts
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig(async () => ({
  application: {
    uiResolvers: [AntDesignVueResolver({ resolveIcons: true, importStyle: false })],
  },
}));
```

## 接入新的 UI 生态

参见 [接入新 UI 库](./add-new)。
