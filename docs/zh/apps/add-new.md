# 接入新应用

本页适用于 main。执行 `pnpm create-app` 选择应用名称、admin/site 和 UI 家族。随后安装依赖，执行根目录自动添加的 `pnpm dev:<name>` 和 `pnpm build:<name>`。

框架专属代码放入该应用；确实被多个应用共享的能力才提取到 packages。使用 @fast-vue3/vite-config、@fast-vue3/stores 和已有请求基础设施，避免重新引入不相干的封装。

修改脚手架自身时需重新 stub，具体见 [开发与脚手架](/zh/monorepo/development)。在 polyrepo 中新增 UI 不是创建 apps 目录，应使用 [UI 模式适配流程](/zh/polyrepo/ui-theme)。
