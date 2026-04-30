# vite.config.mts 基础配置

项目使用 `vite.config.mts`（ESM TypeScript 配置文件），基于 Vite 7 构建。

## 完整配置

```typescript
import type { UserConfig, ConfigEnv } from "vite";
import { loadEnv } from "vite";
import { createVitePlugins } from "./build/vite/plugins";
import { fileURLToPath, URL } from "node:url";
import proxy from "./build/vite/proxy";
import { wrapperEnv } from "./build/utils";

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === "build";
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  return {
    base: process.env.VITE_BASE_URL,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "#": fileURLToPath(new URL("./types", import.meta.url)),
      },
      extensions: [".ts", ".js", ".mjs", ".mts"],
    },

    // 插件（详见 build/vite/plugins/index.ts）
    plugins: createVitePlugins(viteEnv, isBuild),

    css: {},

    server: {
      hmr: { overlay: true },
      port: 3000,
      open: false,
      cors: true,
      host: "0.0.0.0",
      proxy,
    },
  };
};
```

## 关键配置说明

| 配置项         | 说明                                       |
| -------------- | ------------------------------------------ |
| `base`         | 通过环境变量 `VITE_BASE_URL` 控制部署路径  |
| `alias`        | `@` 映射 `src/`，`#` 映射 `types/`         |
| `plugins`      | 插件按环境条件加载，详见 Vite 插件集成章节 |
| `server.cors`  | 开发服务器启用 CORS                        |
| `server.proxy` | 代理配置独立在 `build/vite/proxy.ts`       |
