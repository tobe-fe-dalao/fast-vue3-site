# Proxy 跨域配置

代理配置独立在 `build/vite/proxy.ts` 中，开发环境下通过 Vite 代理转发 API 请求：

```typescript
// build/vite/proxy.ts
import {
  API_BASE_URL,
  API_TARGET_URL,
  MOCK_API_BASE_URL,
  MOCK_API_TARGET_URL,
} from "../constant";

export default {
  [API_BASE_URL]: {
    target: API_TARGET_URL,
    changeOrigin: true,
    rewrite: (path: string) => path.replace(new RegExp(`^${API_BASE_URL}`), ""),
  },
  [MOCK_API_BASE_URL]: {
    target: MOCK_API_TARGET_URL,
    changeOrigin: true,
    rewrite: (path: string) =>
      path.replace(new RegExp(`^${MOCK_API_BASE_URL}`), "/api"),
  },
};
```

常量定义在 `build/constant.ts` 中：

```typescript
export const API_PREFIX = "/api";
export const API_BASE_URL = "/api";
export const API_TARGET_URL = "http://localhost:3000";
export const MOCK_API_BASE_URL = "/mock/api";
export const MOCK_API_TARGET_URL = "http://localhost:3000";
```

修改 `API_TARGET_URL` 为你的后端服务地址即可。
