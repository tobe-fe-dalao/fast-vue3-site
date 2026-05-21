# 架构对比分析

本章从多个维度对比 Polyrepo 和 Monorepo 两种架构，帮助理解迁移决策。

## 总体对比

| 维度 | Polyrepo | Monorepo |
|------|---------|---------|
| 仓库结构 | 单仓库单应用 | 单仓库多包多应用 |
| 版本管理 | 单个 package.json | pnpm workspace catalog 统一管理 |
| 构建工具 | 直接 vite | turbo + vite |
| 代码复用 | 手动复制 | workspace 包引用 |
| UI 扩展 | Fork 或复制 | 新增 app/ |
| 包边界 | 无（src/ 混合） | 明确（packages 层次结构）|
| 上手成本 | 低 | 中（需了解 turbo/pnpm workspace）|
| 长期维护成本 | 高（随规模增长） | 低（共享基础设施） |

## 详细分析

### 依赖版本管理

**Polyrepo：**
```json
{
  "dependencies": {
    "vue": "^3.4.0",
    "ant-design-vue": "^4.1.0",
    "element-plus": "^2.6.0"
  }
}
```
所有依赖混在一个文件中，UI 库版本分散，容易出现不同项目使用不同版本的情况。

**Monorepo：**
```yaml
# pnpm-workspace.yaml
catalog:
  vue: ^3.5.17
  ant-design-vue: ^4.2.6
  element-plus: ^2.10.2
```
所有包通过 `catalog:` 引用，版本在一处集中管理，升级只需修改 catalog。

### 代码复用

**Polyrepo：** 需要复用时，选择只有两个：
1. 将代码复制到目标项目（导致维护多份代码）
2. 发布 npm 包（需要版本管理和发布流程）

**Monorepo：**
```ts
// 直接通过 workspace 引用，TypeScript 类型完整
import { useUserStore } from '@fast-vue3/stores';
import { createHttpClient, createRequest } from '@fast-vue3/request';
```

### 多 UI 生态支持

**Polyrepo：** 每套 UI 需要单独的仓库或项目，工程配置（Vite、ESLint、TypeScript）需要分别维护。

**Monorepo：**
- 新增 `apps/web-{name}/` 目录
- 继承共享的 `@fast-vue3/vite-config`（只需传入 UI resolver）
- 复用所有 `packages/*` 的共享基础设施
- 5 分钟接入一套新 UI 框架

### 构建性能

**Polyrepo：** 每次构建都是全量构建，无增量缓存。

**Monorepo（Turbo）：**
- 构建结果缓存（本地 `.turbo/cache`，可开启远端缓存）
- 并行构建多个包
- 只重新构建受影响的包（`turbo --filter`）

### 工程一致性

**Polyrepo：** ESLint、Prettier、TypeScript 配置各自维护，容易出现不同项目标准不一致的情况。

**Monorepo：**
- `internal/lint-configs/` — 统一所有 lint 规则
- `internal/tsconfig/` — 统一所有 TypeScript 配置
- `unocss.config.ts` — 统一原子类样式
- 根 `eslint.config.mjs` / `prettier.config.mjs` / `stylelint.config.mjs`

## 适用场景对比

### Polyrepo 适合

- 单一产品，无多 UI 需求
- 小团队或个人项目
- 快速原型验证
- 不需要跨项目复用代码

### Monorepo 适合

- 需要支持多套 UI 或多个产品线
- 有大量可复用的基础设施
- 团队协作，需要统一工程规范
- 追求长期可维护性
- 需要构建缓存和任务并行化

## 迁移代价

从 Polyrepo 迁移到 Monorepo 的主要成本：

| 项目 | 工作量 | 一次性/持续 |
|------|--------|------------|
| 理解 pnpm workspace 概念 | 小 | 一次性 |
| 配置 Turbo | 小 | 一次性 |
| 拆分 packages | 中 | 一次性 |
| 迁移历史代码 | 中-大 | 一次性 |
| 团队学习成本 | 小-中 | 一次性 |

迁移后的长期收益：新增 UI 应用、共享基础设施升级的边际成本趋近于零。

## 结论

> 对于「多 UI 生态 + 共享基础设施 + 长期演进」的场景，Monorepo 是更合适的选择。

Fast Vue3 的迁移不是技术追新，而是工程规模和需求自然驱动的结果：
- 单一 Polyrepo 无法优雅地支持 5 套 UI 生态
- 共享基础设施在 Polyrepo 中只能靠手动复制维护
- Monorepo 将「版本一致 + 代码复用 + 工程统一」变成了架构层面的保证
