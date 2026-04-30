# 启动项目

```bash
# 拉取项目
git clone https://github.com/tobe-fe-dalao/fast-vue3

# 安装依赖（推荐 pnpm）
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 可用脚本

| 命令                  | 说明                            |
| --------------------- | ------------------------------- |
| `pnpm dev`            | 启动开发服务器                  |
| `pnpm build`          | TypeScript 类型检查 + 生产构建  |
| `pnpm build:dev`      | 开发模式构建                    |
| `pnpm build:pro`      | 生产模式构建                    |
| `pnpm preview`        | 预览构建结果                    |
| `pnpm plop`           | 代码模板生成（页面/组件/Store） |
| `pnpm lint:eslint`    | ESLint 检查并修复               |
| `pnpm lint:prettier`  | Prettier 格式化                 |
| `pnpm lint:stylelint` | Stylelint 检查并修复            |
| `pnpm commit`         | 规范化 Git 提交                 |
