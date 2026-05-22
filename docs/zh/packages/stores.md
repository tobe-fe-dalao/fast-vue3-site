# @fast-vue3/stores

基于 Pinia 的状态管理，包含用户和应用两个核心 store，所有状态自动持久化。

## 初始化

在 `main.ts` 中调用：

```ts
import { setupStore } from "@fast-vue3/stores";
setupStore(app); // 创建 Pinia 实例 + 注册 persistedstate 插件
```

## useUserStore

```ts
import { useUserStore } from "@fast-vue3/stores";
const userStore = useUserStore();

// State
userStore.token; // string | null
userStore.userName; // string | null
userStore.avatar; // string | null
userStore.role; // RoleType | null

// Getters
userStore.isLoggedIn; // boolean
userStore.isAdmin; // boolean

// Actions
userStore.setToken(token);
userStore.setUserInfo({ userName, avatar, role });
userStore.logout(); // 清除所有用户状态
```

持久化字段：`token`、`userName`、`avatar`、`role`（存入 localStorage）。

## useAppStore

```ts
import { useAppStore } from "@fast-vue3/stores";
const appStore = useAppStore();

// State
appStore.theme; // 'light' | 'dark'
appStore.locale; // 'zh-CN' | 'en-US'
appStore.collapsed; // boolean（侧边栏折叠状态）

// Actions
appStore.setTheme(theme);
appStore.setLocale(locale);
appStore.toggleCollapsed();
```

持久化字段：`theme`、`locale`（存入 localStorage）。

## 其他导出

```ts
import { defineStore, storeToRefs } from "@fast-vue3/stores";
// Pinia 的 defineStore 和 storeToRefs 直接从此包重导出
// 避免在各 app 中直接依赖 pinia
```
