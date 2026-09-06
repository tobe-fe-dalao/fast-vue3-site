# 常见问题

## 页面显示 Cannot GET /

先核对终端中的实际地址。3000 是常用服务端口，可能被其他本地服务占用；默认应用现使用 `127.0.0.1:5173` 并启用 strictPort。端口占用时修改 `.env.local` 的 VITE_PORT 或停止你确认不用的服务，不要盲目结束未知进程。

## 单模式正常，all 模式样式不一致

检查是否引入多个全局 reset，页面是否借用了某组件库的变量，以及当前框架是否有对应 Provider。应用样式使用 `--fv-*`，避免通用类名污染。不要简单堆叠 `!important` 掩盖来源。

## 暗色背景正常，组件仍然是浅色

确认 App.vue 的 @ui-theme 生效，以及主题服务读取的是统一 Store。CSS-in-JS 框架需要 Provider，切换 html class 本身不够。

## 切换分支或 mode 后出现预构建错误

停止旧开发进程，按当前 lockfile 安装依赖，再执行 `pnpm dev --force` 重建 Vite 依赖缓存。不要把 main 的 node_modules 当成 polyrepo 的依赖使用。

## 登录失败仍跳页 / 接口返回 HTML

检查是否接到了正确服务和 API 前缀。响应必须符合业务协议；生产预览不包含开发 Mock。开发接口固定为 `/api/user/*`。
