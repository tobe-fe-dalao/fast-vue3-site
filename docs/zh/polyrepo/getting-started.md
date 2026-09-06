# Polyrepo 快速开始

在 `polyrepo` 分支的根目录执行：

```sh
pnpm install --frozen-lockfile
pnpm dev
```

默认 `all` 展示七套 UI，端口 5173，绑定 `127.0.0.1`。端口冲突直接失败；使用 `.env.local` 的 `VITE_PORT` 更改端口，局域网测试使用 `pnpm dev --host 0.0.0.0`。

## 选择一套框架

```sh
pnpm dev:antd
# 或 dev:element / dev:naive / dev:arco / dev:tdesign / dev:devui / dev:idux
```

模式文件只覆盖差异，共同默认值在 `.env`。单框架模式控制打包的 UI 依赖；包管理器仍安装项目声明的所有框架，不会自动卸载其他组件库。

| 页面 | 路径 | 内容 |
| --- | --- | --- |
| 首页 | `/#/` | 项目入口与架构概览 |
| 组件实验室 | `/#/component` | 当前 UI 的按钮展示 |
| 数据图表 | `/#/contain` | ECharts 示例、容器缩放 |
| 页面示例 | `/#/demo` | 明确标注年份的静态统计卡片 |
| 登录 | `/#/login` | 当前 UI 的表单及 Mock 登录 |

默认页面公开访问，不包含完整后台权限系统。生产构建没有 Mock 服务，需要接入真实后端。
