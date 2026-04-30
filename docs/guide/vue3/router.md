# Vue Router

项目使用 **Vue Router 4** + **unplugin-vue-router** 实现文件路由（File-Based Routing），无需手动注册路由。

## 文件路由

路由根据 `src/views/` 目录结构自动生成：

```bash
src/views/
├── index.vue           → /
├── login/
│   └── index.vue       → /login
├── component/
│   └── index.vue       → /component
├── contain/
│   └── index.vue       → /contain
└── demo/
    └── index.vue       → /demo
```

自动生成的类型化路由定义在 `types/typed-router.d.ts` 中。

## 路由配置

```typescript
// src/router/index.ts
import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const baseURL = import.meta.env.VITE_BASE_URL;

const router = createRouter({
  history: createWebHashHistory(baseURL),
  routes,
});

// 路由守卫 - 进度条
router.beforeEach(async (_to, _from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
```

## 创建新页面

使用 Plop 模板生成器快速创建页面：

```bash
pnpm plop
# 选择 "page" → 选择目录 → 输入文件名
```

或手动在 `src/views/` 下创建 `.vue` 文件，路由将自动注册。
