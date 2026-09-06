# @fast-vue3/stores

适用分支：`main`。路径：`packages/stores`。

setupStore、useAppStore、useUserStore，组合 Pinia 与持久化。

入口先 `setupStore(app)`，再使用 useUserStore。用户 Store 暴露 setUserInfo、setToken、logout，持久化 token/userName/avatar/role；接口请求由应用编排。

[源码：`packages/stores/src/index.ts`](https://github.com/tobe-fe-dalao/fast-vue3/blob/main/packages/stores/src/index.ts)

[返回包清单](/zh/packages/)
