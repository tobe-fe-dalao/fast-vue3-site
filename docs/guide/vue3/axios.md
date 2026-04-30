# Axios 封装及接口管理

`src/utils/http/axios/index.ts` 封装了 Axios 实例，提供了类型安全的 HTTP 请求方法。

## 核心封装

```typescript
import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { showMessage } from "./status";
import type { IResponse } from "./type";
import { getToken, TokenPrefix } from "@/utils/auth";

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASEURL,
  timeout: 10000,
});

// 请求拦截器 - 自动注入 Bearer Token
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();
  if (token) {
    config.headers.authorization = `${TokenPrefix}${token}`;
  }
  return config;
});

// 响应拦截器 - 统一错误处理
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) return response;
    showMessage(response.status);
    return response;
  },
  (error: any) => {
    const { response } = error;
    if (response) {
      showMessage(response.status);
      return Promise.reject(response.data);
    }
    showMessage("网络连接异常,请稍后再试!");
  },
);
```

## 使用方式

提供了 `get`、`post`、`put`、`del` 四个快捷方法，支持泛型类型推断：

```typescript
import { get, post } from "@/utils/http/axios";

// GET 请求
const data = await get<UserState>({ url: "/user/profile" });

// POST 请求
const result = await post<LoginRes>({
  url: "/user/login",
  data: { username, password },
});
```

## API 管理

接口按模块组织在 `src/api/` 目录下：

```
src/api/
  └── user/
      ├── index.ts   // 接口方法
      └── types.ts   // 请求/响应类型
```

```typescript
// src/api/user/index.ts
import { get, post } from "@/utils/http/axios";
import type { UserState } from "@/store/modules/user/types";

enum URL {
  login = "/user/login",
  logout = "/user/logout",
  profile = "/user/profile",
}

const getUserProfile = async () => get<UserState>({ url: URL.profile });
const login = async (data: LoginData) =>
  post<LoginRes>({ url: URL.login, data });
const logout = async () => post<LoginRes>({ url: URL.logout });
```

## Token 管理

Token 相关操作封装在 `src/utils/auth.ts`：

```typescript
const TokenKey = "fast-token";
const TokenPrefix = "Bearer ";

const isLogin = () => !!localStorage.getItem(TokenKey);
const getToken = () => localStorage.getItem(TokenKey);
const setToken = (token: string) => localStorage.setItem(TokenKey, token);
const clearToken = () => localStorage.removeItem(TokenKey);
```
