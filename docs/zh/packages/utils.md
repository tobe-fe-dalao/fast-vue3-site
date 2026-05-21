# @fast-vue3/utils

纯函数工具库，提供认证、日期格式化和通用 helpers。

## 认证工具

```ts
import { getToken, setToken, clearToken, isLoggedIn, getAuthHeader } from '@fast-vue3/utils';

getToken()          // string | null，从 localStorage 读取 Token
setToken(token)     // 将 Token 写入 localStorage
clearToken()        // 清除 Token
isLoggedIn()        // boolean，Token 是否存在
getAuthHeader()     // { Authorization: 'Bearer {token}' } | {}
```

## 日期工具

```ts
import { formatDate, formatDateTime, fromNow } from '@fast-vue3/utils';

formatDate(date)          // '2025-05-21'
formatDateTime(date)      // '2025-05-21 14:30:00'
fromNow(date)             // '3 小时前'
```

基于 `dayjs` 实现。

## 通用 Helpers

```ts
import { deepMerge, throttle, debounce, getHttpStatusMessage } from '@fast-vue3/utils';

deepMerge(target, source)           // 深度合并两个对象
throttle(fn, wait)                   // 节流函数
debounce(fn, wait)                   // 防抖函数
getHttpStatusMessage(statusCode)     // HTTP 状态码 → 错误消息
```
