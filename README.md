# Fast-Vue3 文档站

[Fast-Vue3](https://github.com/tobe-fe-dalao/fast-vue3) 的文档站，基于 VitePress 构建。

## 本地开发

```bash
pnpm install
pnpm start
```

## 构建

```bash
pnpm build
```

## 文档结构

```
docs/
├── index.md              # 首页
├── guide/
│   ├── index.md          # 介绍
│   ├── start.md          # 快速上手
│   ├── edit.md           # 参与编辑
│   └── vue3/
│       ├── start.md      # 启动项目
│       ├── base.md       # Vite 基础配置
│       ├── vite.md       # Vite 插件集成
│       ├── env.md        # 多环境变量
│       ├── ui.md         # UI 组件库
│       ├── pinia.md      # Pinia 状态管理
│       ├── router.md     # Vue Router
│       ├── axios.md      # Axios 封装
│       ├── alias.md      # 路径别名
│       ├── proxy.md      # 代理配置
│       └── lint.md       # 代码规范
└── .vitepress/
    └── config.js         # VitePress 配置
```
