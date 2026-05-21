# @fast-vue3/shared

最底层的核心包，提供跨应用共享的类型定义和常量。

**不依赖任何其他 workspace 包。**

## 安装

所有 workspace 包已预配置依赖，无需手动安装。在 `package.json` 中：

```json
{ "dependencies": { "@fast-vue3/shared": "workspace:*" } }
```

## 常量

```ts
import {
  TOKEN_KEY,        // 'fast-vue3:token'
  TOKEN_PREFIX,     // 'Bearer '
  LOCALE_KEY,       // 'fast-vue3:locale'
  THEME_KEY,        // 'fast-vue3:theme'
  DEFAULT_LOCALE,   // 'zh-CN'
  SUPPORT_LOCALES,  // ['zh-CN', 'en-US']
  HTTP_STATUS_MAP,  // HTTP 状态码 → 消息映射
} from '@fast-vue3/shared';
```

## 类型定义

```ts
import type {
  Recordable,      // Record<string, any>
  Nullable<T>,     // T | null
  Optional<T>,     // T | undefined
  DeepPartial<T>,  // 深度可选
  Writable<T>,     // 移除 readonly
  IResponse<T>,    // { code: number; result: T; message: string }
  IPageResult<T>,  // { list: T[]; total: number; page: number; size: number }
  IPageParams,     // { page: number; size: number }
  RoleType,        // 'admin' | 'editor' | 'viewer'
  ViteEnv,         // Vite 环境变量类型
} from '@fast-vue3/shared';
```

## `IResponse<T>` 约定

所有 API 响应遵循此结构：

```ts
interface IResponse<T> {
  code: number;     // 0 = 成功，非 0 = 业务错误
  result: T;        // 实际数据
  message: string;  // 提示信息
}
```

`@fast-vue3/request` 的响应拦截器会自动解包 `result` 字段。
