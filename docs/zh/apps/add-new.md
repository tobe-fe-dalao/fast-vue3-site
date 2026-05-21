# 接入新 UI 库

本指南说明如何在 Fast Vue3 Monorepo 中快速接入一套新的 Vue3 UI 框架。

## 步骤概览

1. 在 `pnpm-workspace.yaml` catalog 中添加 UI 库版本
2. 在 `apps/` 下创建新应用目录
3. 配置 `package.json`、`vite.config.ts` 等文件
4. 实现布局、登录、仪表盘页面
5. 添加 Mock 数据

## 详细步骤

### 1. 在 catalog 中添加依赖版本

```yaml
# pnpm-workspace.yaml
catalog:
  # 新增 UI 库
  my-ui-lib: ^1.0.0
  # 如需 resolver 插件
  '@my-ui/auto-import-resolver': ^1.0.0
```

### 2. 创建应用目录

```bash
mkdir -p apps/web-myui/src/{api/user,plugins,router,views/{login,dashboard}}
mkdir -p apps/web-myui/{mock,types}
```

### 3. 配置 package.json

```json
{
  "name": "@fast-vue3/web-myui",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite --mode development",
    "build": "vue-tsc --noEmit && vite build",
    "typecheck": "vue-tsc --noEmit",
    "preview": "vite preview"
  },
  "dependencies": {
    "@fast-vue3/access": "workspace:*",
    "@fast-vue3/locales": "workspace:*",
    "@fast-vue3/request": "workspace:*",
    "@fast-vue3/shared": "workspace:*",
    "@fast-vue3/stores": "workspace:*",
    "@fast-vue3/utils": "workspace:*",
    "my-ui-lib": "catalog:",
    "nprogress": "catalog:",
    "pinia": "catalog:",
    "vue": "catalog:",
    "vue-router": "catalog:"
  },
  "devDependencies": {
    "@fast-vue3/tsconfig": "workspace:*",
    "@fast-vue3/vite-config": "workspace:*",
    "@types/nprogress": "catalog:",
    "@types/node": "catalog:",
    "typescript": "catalog:",
    "unplugin-vue-components": "catalog:",
    "vite": "catalog:",
    "vue-tsc": "catalog:"
  }
}
```

### 4. 配置 vite.config.ts

```ts
import { defineConfig } from '@fast-vue3/vite-config';
import { MyUiResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig(async () => ({
  application: {
    uiResolvers: [MyUiResolver()],
  },
  vite: {
    server: { port: 3006 },  // 选择未占用的端口
  },
}));
```

### 5. 实现主入口

```ts
// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from '@fast-vue3/stores';
import { setupMyUI } from './plugins/myui';

async function bootstrap() {
  const app = createApp(App);
  setupStore(app);
  setupMyUI(app);
  const router = setupRouter(app);
  await router.isReady();
  app.mount('#app');
}

bootstrap();
```

### 6. 在根 package.json 添加脚本

```json
{
  "scripts": {
    "dev:myui": "turbo dev --filter=@fast-vue3/web-myui",
    "build:myui": "pnpm run build --filter=@fast-vue3/web-myui"
  }
}
```

### 7. 安装依赖

```bash
pnpm install
```

pnpm 会自动识别新的 workspace 包并安装依赖。

## 参考实现

已有的 5 个应用都是很好的参考：

- `apps/web-antd/` — 最完整的参考实现（含 UI setup 插件、完整 dashboard）
- `apps/web-ele/` — Element Plus 实现
- `apps/web-naive/` — Naive UI 实现（使用 Provider 模式）
- `apps/web-arco/` — Arco Design 实现
- `apps/web-tdesign/` — TDesign 实现

参照任意一个应用的结构复制并修改即可快速接入新 UI 框架。
