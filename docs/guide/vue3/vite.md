# Vite 插件集成

项目基于 **Vite 7** 构建，集成了丰富的插件体系。插件配置统一管理在 `build/vite/plugins/` 目录下，按功能拆分为独立模块。

## 集成的插件

| 插件                       | 说明                                         | 文件            |
| -------------------------- | -------------------------------------------- | --------------- |
| `@vitejs/plugin-vue`       | Vue 3 SFC 支持                               | 核心插件        |
| `@vitejs/plugin-vue-jsx`   | JSX/TSX 支持                                 | 核心插件        |
| `unplugin-vue-router`      | **文件路由**，自动根据 `src/views/` 生成路由 | `pages.ts`      |
| `unplugin-auto-import`     | API 自动导入（Vue、Pinia、VueRouter 等）     | `autoImport.ts` |
| `unplugin-vue-components`  | 组件自动注册（7+ UI 库 Resolver）            | `component.ts`  |
| `vite-plugin-svg-icons`    | SVG 图标自动加载                             | `svgIcons.ts`   |
| `unocss`                   | 原子化 CSS（替代 Tailwind）                  | `unocss.ts`     |
| `vite-plugin-mock`         | Mock 数据服务（仅开发环境）                  | `mock.ts`       |
| `vite-plugin-compression`  | Gzip 压缩（仅构建）                          | `compress.ts`   |
| `vite-plugin-imagemin`     | 图片压缩优化                                 | `imagemin.ts`   |
| `vite-plugin-progress`     | 构建进度条显示                               | `progress.ts`   |
| `vite-plugin-restart`      | 配置文件变更自动重启                         | `restart.ts`    |
| `rollup-plugin-visualizer` | 打包体积分析                                 | `visualizer.ts` |
| `vite-plugin-mkcert`       | 本地 HTTPS 证书                              | 核心插件        |
| `vite-plugin-static-copy`  | 静态资源复制                                 | 核心插件        |

## 插件加载流程

插件在 `build/vite/plugins/index.ts` 中统一编排，按环境条件加载：

```typescript
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  // 1. 文件路由（最先加载）
  // 2. Vue 核心插件
  // 3. 自动导入 + 组件注册
  // 4. UnoCSS + SVG Icons
  // 5. Mock（仅开发）
  // 6. 压缩 + 图片优化（仅构建）
  // 7. 进度条 + 可视化分析
}
```

更多关于 [Vite](https://cn.vitejs.dev/guide/)
