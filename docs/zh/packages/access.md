# @fast-vue3/access

适用分支：`main`。路径：`packages/effects/access`。

可选的 setupAccessGuard 与 accessDirective；需在应用中明确注册。

setupAccessGuard(router, options) 安装路由守卫；accessDirective 在 mounted 时按 role 隐藏元素。它不是动态权限策略引擎，也不提供后端授权。web-antd 当前使用自己的守卫，请勿重复注册造成双重重定向。

[源码：`packages/effects/access/src/index.ts`](https://github.com/tobe-fe-dalao/fast-vue3/blob/main/packages/effects/access/src/index.ts)

[返回包清单](/zh/packages/)
