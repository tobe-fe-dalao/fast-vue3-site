# 快速上手

## Node 版本要求

推荐 Node.js 18+ 或 22+（LTS）版本。项目使用 `@tsconfig/node22` 作为 Node 端 TypeScript 配置基础。你可以使用 [nvm](https://github.com/nvm-sh/nvm) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows) 在同一台电脑上管理多个 Node 版本。

## 编辑器

推荐使用 VS Code 或 WebStorm，搭配以下插件获得最佳开发体验：

- **Vue - Official**（VS Code）—— Vue 3 语言支持
- **ESLint** —— 代码规范检查
- **Prettier** —— 代码格式化
- **UnoCSS** —— 原子化 CSS 智能提示

## 包管理器

推荐使用 **pnpm**（首选）或 yarn。项目使用 pnpm 作为默认包管理器，lockfile 为 `pnpm-lock.yaml`。

```bash
# 安装 pnpm（如未安装）
npm install -g pnpm
```
