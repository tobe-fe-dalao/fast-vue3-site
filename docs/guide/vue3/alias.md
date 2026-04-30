# 路径别名（alias）

项目在 `vite.config.mts` 中配置了路径别名，使用标准的 `fileURLToPath` + `import.meta.url` 方式：

```typescript
import { fileURLToPath, URL } from 'node:url';

resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
    '#': fileURLToPath(new URL('./types', import.meta.url)),
  },
  extensions: ['.ts', '.js', '.mjs', '.mts'],
},
```

同时在 `tsconfig.app.json` 中配置对应的 TypeScript 路径映射，确保 IDE 智能提示正常：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "#/*": ["./types/*"]
    }
  }
}
```

## 使用示例

```typescript
// 使用 @ 别名引用 src 下的文件
import { useAppStore } from "@/store";
import { get, post } from "@/utils/http/axios";

// 使用 # 别名引用 types 下的类型
import type { ViteEnv } from "#/global";
```
