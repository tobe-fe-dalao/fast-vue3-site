# 多 UI 组件库集成

项目集成了 **7+** 主流 Vue 3 UI 组件库，通过 `unplugin-vue-components` 和 `unplugin-auto-import` 实现按需自动导入，无需手动注册。

## 已集成的组件库

| 组件库                                                    | 版本    | 说明                   |
| --------------------------------------------------------- | ------- | ---------------------- |
| [Element Plus](https://element-plus.org/)                 | ^2.13.7 | 饿了么团队出品         |
| [Ant Design Vue](https://antdv.com/)                      | ^4.2.6  | Ant Design 的 Vue 实现 |
| [Naive UI](https://www.naiveui.com/)                      | ^2.44.1 | 尤雨溪推荐             |
| [TDesign Vue Next](https://tdesign.tencent.com/vue-next/) | ^1.19.1 | 腾讯出品               |
| [Arco Design Vue](https://arco.design/vue/)               | ^2.57.0 | 字节跳动出品           |
| [Vue DevUI](https://vue-devui.github.io/)                 | ^1.6.34 | 华为 DevUI             |
| [iDux](https://idux.site/)                                | ^2.11.0 | iDux 组件库            |
| [VueUse Components](https://vueuse.org/)                  | ^14.2.1 | 实用工具组件           |

## 自动导入配置

组件自动注册在 `build/vite/plugins/component.ts`：

```typescript
import Components from "unplugin-vue-components/vite";
import {
  ElementPlusResolver,
  VueUseComponentsResolver,
  AntDesignVueResolver,
  TDesignResolver,
  NaiveUiResolver,
  DevUiResolver,
  IduxResolver,
} from "unplugin-vue-components/resolvers";
import { ArcoResolver } from "unplugin-vue-components/resolvers";

Components({
  dirs: ["src/components"],
  resolvers: [
    ElementPlusResolver(),
    VueUseComponentsResolver(),
    AntDesignVueResolver({ importStyle: false }),
    TDesignResolver({ library: "vue-next" }),
    NaiveUiResolver(),
    ArcoResolver({ sideEffect: true }),
    DevUiResolver(),
    IduxResolver(),
  ],
});
```

API 自动导入在 `build/vite/plugins/autoImport.ts`，包含 Vue、Pinia、VueRouter、VueUse 等常用 API 的自动导入。

## 移除不需要的组件库

1. 从 `package.json` 中移除对应依赖
2. 从 `build/vite/plugins/component.ts` 移除对应 Resolver
3. 从 `build/vite/plugins/autoImport.ts` 移除对应 Resolver
4. 从 `src/main.ts` 移除对应 CSS 导入
5. 运行 `pnpm install` 更新依赖
