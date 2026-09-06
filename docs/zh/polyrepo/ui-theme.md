# UI 模式与样式兼容

## 四类构建期适配

| 别名 | 责任 |
| --- | --- |
| `@ui-setup` | 必要样式、全局组件、主题服务初始化 |
| `@ui-theme` | 框架 Theme/Config Provider |
| `@login-adapter` | 用户名、密码输入和 submit 事件 |
| `@ui-showcase` | 当前框架组件示例 |

`all` 组合各展示组件，登录复用 Element Plus；不复制七套页面业务逻辑。Ant Design 使用 `ant-` 前缀，Arco 使用 `a-`，避免解析器冲突。

## 样式约束

应用颜色使用 `--fv-*`，页面类名使用 `fv-*` 或 scoped CSS。不要直接把 Arco 的 `--color-text-*` 当成所有页面的设计变量，也不要使用全局 `input { border: none }`、`a { color: black !important }` 覆盖第三方组件。

页面布局由应用控制：展示按钮使用可换行的 flex 容器；登录表单宽度由响应式面板决定；图表使用容器 ref 和 ResizeObserver；避免固定 550px 侧栏或重复 `100vh` 导致溢出。

| UI | 深浅主题实现 |
| --- | --- |
| Ant Design Vue | ConfigProvider 的 theme algorithm |
| Naive UI | NConfigProvider 与 darkTheme |
| iDux | IxThemeProvider 的 presetTheme |
| Element Plus | `.dark` 与 dark/css-vars.css |
| Arco | body 的 arco-theme 属性 |
| TDesign | html 的 theme-mode 属性 |
| DevUI | ThemeService.applyTheme |

同一 Pinia 状态驱动所有适配。DevUI 的内部 `d-icon` 需要显式注册；其组件 resolver 不能用于任意脚本标识符自动导入。

## 新增框架

更新 `config/ui.ts`、resolver 清单、四类适配文件、`.env.<mode>` 和 package scripts；将框架加入 CI 构建矩阵。新增组件要分别验证浅色、深色、窄屏、键盘输入和浏览器控制台。内置示例覆盖的是现有表单/按钮，不表示所有第三方弹层组合都已验证。
