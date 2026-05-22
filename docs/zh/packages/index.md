# 共享包概览

`packages/` 目录包含所有 UI 应用共享的基础设施包。

## 包依赖关系

```
@fast-vue3/shared          ← 最底层，无 workspace 依赖
       │
       ├──▶ @fast-vue3/utils
       │           │
       │           └──▶ @fast-vue3/stores
       │                         │
       │                         └──▶ @fast-vue3/access
       │
       ├──▶ @fast-vue3/locales
       │
       └──▶ @fast-vue3/request
```

## 包列表

| 包名                 | 路径                       | 职责               |
| -------------------- | -------------------------- | ------------------ |
| `@fast-vue3/shared`  | `packages/@core/shared`    | 核心类型定义、常量 |
| `@fast-vue3/utils`   | `packages/utils`           | 纯函数工具         |
| `@fast-vue3/stores`  | `packages/stores`          | Pinia store        |
| `@fast-vue3/locales` | `packages/locales`         | i18n 资源          |
| `@fast-vue3/request` | `packages/effects/request` | HTTP 请求封装      |
| `@fast-vue3/access`  | `packages/effects/access`  | 路由权限守卫       |

## 设计原则

### 直接导出 TypeScript 源码

所有 `packages/*` 包的导出配置：

```json
{
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "default": "./src/index.ts"
    }
  }
}
```

TypeScript 源码直接被各 app 的 Vite 实例编译，无需预先构建，修改后 HMR 立即生效。

### 包边界清晰

- 每个包只暴露必要的公共 API
- 包内部实现细节不对外泄露
- 上层包可以依赖下层包，反之不行

### 无副作用导入

所有包的导入都是无副作用的，不会在 `import` 时自动修改全局状态。需要初始化的功能通过明确的 `setup*()` 函数调用。

## 在应用中使用

```ts
// 在任何 app 的 src/ 代码中直接引用
import { TOKEN_KEY } from "@fast-vue3/shared";
import { getToken, formatDate } from "@fast-vue3/utils";
import { useUserStore, useAppStore } from "@fast-vue3/stores";
import { zhCN } from "@fast-vue3/locales";
import { createHttpClient, createRequest } from "@fast-vue3/request";
import { setupAccessGuard } from "@fast-vue3/access";
```

详细的 API 文档参见各包的独立页面。
