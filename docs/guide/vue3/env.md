# 多环境变量

`package.json` 里的 `scripts` 通过 `--mode xxx` 来执行不同环境：

```json
{
  "scripts": {
    "dev": "vite --mode development",
    "build": "vue-tsc --noEmit && vite build",
    "build:dev": "vite build --mode development",
    "build:pro": "vite build --mode production",
    "preview": "vite preview"
  }
}
```

- `pnpm dev` — 启动开发环境，执行 `development` 模式
- `pnpm build` — 先进行 TypeScript 类型检查，再构建生产版本
- `pnpm build:dev` — 开发模式构建（保留调试信息）
- `pnpm build:pro` — 生产模式构建（完整优化）

## 环境变量

在项目根目录下创建 `.env.[mode]` 文件：

```bash
# .env.development
VITE_APP_API_BASEURL = /api
VITE_USE_MOCK = true

# .env.production
VITE_APP_API_BASEURL = https://your-api.com
VITE_USE_MOCK = false
```

在代码中通过 `import.meta.env.VITE_XXX` 访问环境变量。类型定义在 `types/global.d.ts` 的 `ViteEnv` 接口中。
