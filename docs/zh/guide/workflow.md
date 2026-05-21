# 开发工作流

## 日常开发

### 启动单个应用

```bash
pnpm dev:antd   # Ant Design Vue
pnpm dev:ele    # Element Plus
pnpm dev:naive  # Naive UI
pnpm dev:arco   # Arco Design
pnpm dev:tdesign # TDesign
```

Turbo 的 `dev` 任务会先确保 `@fast-vue3/vite-config` 构建完成，再启动 Vite 开发服务器。

### 修改共享包

`packages/*` 中的包直接暴露 TypeScript 源码，由各 app 的 Vite 实例在运行时编译。修改后无需重建，HMR 直接生效。

唯一的例外是 `internal/vite-config`：修改后需要重新构建：

```bash
pnpm -F @fast-vue3/vite-config build
# 或重启 pnpm dev:xxx（turbo 会自动先 build 依赖）
```

## 提交规范

使用 Conventional Commits 规范，通过 `czg` 交互式向导提交：

```bash
pnpm commit
```

Commit 类型：

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `refactor` | 代码重构 |
| `perf` | 性能优化 |
| `style` | 代码格式（不影响逻辑） |
| `test` | 测试相关 |
| `docs` | 文档更新 |
| `chore` | 构建/工具链变更 |
| `ci` | CI 配置变更 |

## 新增 API 接口

1. 在 `apps/{app}/src/api/` 下创建或修改接口文件
2. 调用 `http.get/post/put/del` 方法（来自 `@fast-vue3/request`）
3. 使用 TypeScript 泛型声明返回类型

示例：

```ts
import { http } from '../http';

export const demoApi = {
  getList: (params: { page: number; size: number }) =>
    http.get<{ list: Demo[]; total: number }>({ url: '/demo/list', params }),

  create: (data: CreateDemoDto) =>
    http.post<Demo>({ url: '/demo', data }),
};
```

## 新增页面

在 `apps/{app}/src/views/` 下创建 `.vue` 文件即可自动注册路由（`unplugin-vue-router` 文件路由）：

```
src/views/
├── index.vue           → /
├── login/
│   └── index.vue       → /login
├── dashboard/
│   └── index.vue       → /dashboard
└── settings/
    └── index.vue       → /settings  ← 新页面
```

然后在布局的菜单中添加对应的菜单项即可。

## Mock 开发

每个应用的 `mock/` 目录下定义 Mock 数据（通过 `vite-plugin-mock`）：

```ts
// mock/demo.ts
export default [
  {
    url: '/api/demo/list',
    method: 'get',
    response: () => ({
      code: 0,
      result: { list: [...], total: 10 },
      message: 'success',
    }),
  },
];
```

Mock 在 `.env.development` 中通过 `VITE_USE_MOCK=true` 开启。

## 代码规范

| 工具 | 配置包 | 触发时机 |
|------|--------|---------|
| ESLint | `@fast-vue3/eslint-config` | commit 前（lint-staged）|
| Prettier | `@fast-vue3/prettier-config` | commit 前（lint-staged）|
| Stylelint | `@fast-vue3/stylelint-config` | commit 前（lint-staged）|
| commitlint | `@fast-vue3/commitlint-config` | commit-msg hook |

所有规则包统一在 `internal/lint-configs/` 维护。
