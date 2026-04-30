# ESLint + Prettier + Stylelint 统一开发规范

项目采用全链路代码规范方案，确保团队协作一致性。

## ESLint（代码规范）

使用 **ESLint 9 Flat Config** 格式（`eslint.config.mjs`），集成：

- `@vue/eslint-config-typescript` — Vue + TypeScript 规则
- `eslint-plugin-vue` — Vue 模板规则
- `eslint-plugin-simple-import-sort` — 自动排序 import 语句
- `@vue/eslint-config-prettier` — 关闭与 Prettier 冲突的规则

```bash
pnpm lint:eslint
```

## Prettier（代码格式化）

配置文件 `prettier.config.js`，主要配置：

- 单引号、尾逗号、分号
- Vue `<script>` 和 `<style>` 缩进
- 行宽 140 字符

```bash
pnpm lint:prettier
```

## Stylelint（样式规范）

配置文件 `stylelint.config.js`，支持 CSS / Less / SCSS / Vue SFC：

- CSS 属性排序（`stylelint-order`）
- Vue `:deep()`、`:global()` 伪类支持
- UnoCSS `@apply` 等指令支持

```bash
pnpm lint:stylelint
```

## Git 提交规范

- **Husky** — Git hooks 管理
- **Lint-Staged** — 仅检查暂存区文件
- **Commitizen + cz-git** — 交互式规范化提交

```bash
pnpm commit  # 交互式提交
```
