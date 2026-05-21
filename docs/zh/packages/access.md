# @fast-vue3/access

路由权限守卫和权限指令，基于 `useUserStore.isLoggedIn` 实现认证保护。

## setupAccessGuard

在 `src/router/index.ts` 中使用：

```ts
import { setupAccessGuard } from '@fast-vue3/access';

export function setupRouter(app: App) {
  const router = createRouter({ ... });
  setupAccessGuard(router, {
    whiteList: ['/login'],  // 不需要登录即可访问的路由
  });
  app.use(router);
  return router;
}
```

守卫逻辑：
1. 路由在白名单中 → 直接放行
2. 用户已登录（`userStore.isLoggedIn === true`）→ 放行
3. 用户未登录 → 重定向到 `/login`（携带 `redirect` 参数）

## v-access 指令

用于在模板中控制元素的显示：

```vue
<template>
  <!-- 只有 admin 角色才能看到此按钮 -->
  <button v-access="'admin'">删除用户</button>

  <!-- 多角色均可访问 -->
  <div v-access="['admin', 'editor']">编辑区域</div>
</template>
```

注册指令：

```ts
import { accessDirective } from '@fast-vue3/access';
app.directive('access', accessDirective);
```
