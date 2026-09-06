# Ant Design Vue

适用分支：`main`。后台应用 `apps/web-antd`，门户应用 `apps/site-antd`。后台开发端口声明为 3001。

```sh
pnpm dev:web-antd
pnpm dev:site-antd
pnpm build:web-antd
```

UI 组件与主题初始化在应用内部，工程配置复用 @fast-vue3/vite-config。新增页面先确认该应用的 router/layout 约定，不要从其他 UI 应用直接复制组件前缀与全局样式。

[源码：`apps/web-antd/src/main.ts`](https://github.com/tobe-fe-dalao/fast-vue3/blob/main/apps/web-antd/src/main.ts) · [源码：`apps/web-antd/vite.config.ts`](https://github.com/tobe-fe-dalao/fast-vue3/blob/main/apps/web-antd/vite.config.ts)

Polyrepo 采用环境模式选择框架，区别见 [UI 模式](/zh/polyrepo/ui-theme)。PrimeVue 仅在 main，DevUI 仅在 polyrepo。
