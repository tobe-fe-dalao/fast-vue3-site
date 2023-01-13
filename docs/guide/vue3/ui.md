# 多 UI 组件库供选择

Vite 构建工具，使用 vite-plugin-style-import 和 unplugin-vue-components/vite 实现按需引入。

## 安装插件

```bash
yarn add vite-plugin-style-import -D
yarn add unplugin-vue-components/vite -D
```

## 使用组件库

在`build/vite/plugins/component.ts`下

```javascript
import { ElementPlusResolver, VueUseComponentsResolver, AntDesignVueResolver,TDesignResolver,NaiveUiResolver } from 'unplugin-vue-components/resolvers';
...
resolvers: [
  ElementPlusResolver(),
  VueUseComponentsResolver(),
  AntDesignVueResolver(),
  TDesignResolver(),
  NaiveUiResolver()
]
...
```

## 不需要某个组件库

1. yarn remove 不想要的组件的包
2. 删除对应的 resolvers

## 参考文档

- [ElementPlus](https://element-plus.gitee.io/zh-CN/component/button.html)

- [AntDesignVue](https://next.antdv.com/docs/vue/introduce-cn/)

- [TDesign](https://tdesign.tencent.com/vue-next/components/button)

- [Naive](https://www.naiveui.com/zh-CN/os-theme/components/avatar)
