# Pinia 状态管理

项目使用 **Pinia 3** 作为状态管理方案，搭配 `pinia-plugin-persistedstate` 实现状态持久化。

## 目录结构

```bash
src/store/
├── index.ts              # Store 初始化 + 插件注册
└── modules/
    ├── app/
    │   ├── index.ts      # 应用全局状态（主题等）
    │   └── types.ts      # 类型定义
    └── user/
        ├── index.ts      # 用户状态（登录、信息等）
        └── types.ts      # 类型定义
```

## Store 初始化

```typescript
// src/store/index.ts
import { createPinia } from "pinia";
import { useAppStore } from "./modules/app";
import { useUserStore } from "./modules/user";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export { useAppStore, useUserStore };
export default pinia;
```

## 示例：App Store（Options API + 持久化）

```typescript
import { defineStore } from "pinia";
import type { AppState } from "./types";

export const useAppStore = defineStore("app", {
  state: () => ({
    title: "FastVue3",
    theme: "",
  }),
  actions: {
    toggleTheme(dark: boolean) {
      this.theme = dark ? "dark" : "light";
      document.documentElement.classList.toggle("dark", dark);
    },
  },
  persist: {
    storage: localStorage,
    pick: ["theme"],
  },
});
```

## 示例：User Store（异步登录流程）

```typescript
import { defineStore } from "pinia";
import { login as userLogin, getUserProfile } from "@/api/user/index";
import { setToken, clearToken } from "@/utils/auth";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user_name: undefined,
    avatar: undefined,
    role: "",
  }),
  actions: {
    async login(loginForm: LoginData) {
      const result = await userLogin(loginForm);
      if (result?.token) setToken(result.token);
      return result;
    },
    async logout() {
      this.$reset();
      clearToken();
    },
  },
});
```

## 在组件中使用

```vue
<script lang="ts" setup>
import { useUserStore } from "@/store";
const userStore = useUserStore();
await userStore.login({ username: "admin", password: "123456" });
</script>
```

## 代码模板生成

```bash
pnpm plop
# 选择 "store" → 输入模块名 → 自动生成 Store 文件
```
