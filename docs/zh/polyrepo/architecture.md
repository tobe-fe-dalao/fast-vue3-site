# Polyrepo 模块边界

```text
config/ui.ts             # UI 清单、类型与模式校验
build/env.ts             # 构建变量解析
build/vite/              # 插件与代理
mock/                    # 仅开发期接口
src/api/                 # 接口与领域类型
src/store/               # Pinia 实例和业务状态
src/config/              # 浏览器 UI 配置和导航
src/plugins/             # UI 初始化
src/components/ui-theme/ # 框架主题 Provider
src/components/login-forms/ # 登录表单适配
src/components/showcase/ # 展示适配
src/composables/          # 表单和图表生命周期
src/styles/              # 应用设计变量与布局
src/views/               # 文件路由页面
```

## 入口顺序

`src/main.ts` 创建 Vue 实例，安装 Pinia，再初始化 UI 插件与主题，然后安装 Router 并挂载。DevUI 的主题监听依赖 Store，因此不能在 Pinia 安装之前执行。

`App.vue` 挂载构建期选择的 `@ui-theme`、统一 Header 和路由出口。页面不再各自创建不同 Header；导航数据不是第二份带组件导入的路由表。

## 类型和请求

API 层拥有用户类型，Store 依赖 API，API 不反向依赖 Store。HTTP 工厂可以注入 token 读取函数；Mock 辅助函数不进入浏览器依赖图。

## 文件路由

`build/vite/plugins/pages.ts` 扫描 `src/views`，排除 `components` 子目录。页面私有组件放在 `views/<page>/components`，以免意外成为路由。构建阶段关闭文件监听。

[源码：`vite.config.mts`](https://github.com/tobe-fe-dalao/fast-vue3/blob/polyrepo/vite.config.mts)
