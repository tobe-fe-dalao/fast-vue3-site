# @fast-vue3/locales

国际化资源包，提供 zh-CN 和 en-US 两种语言的翻译文本。

## 使用方式

```ts
import { zhCN, enUS, DEFAULT_LOCALE, SUPPORT_LOCALES } from '@fast-vue3/locales';
import type { LocaleMessages } from '@fast-vue3/locales';
```

## 语言资源结构

```ts
// zh-CN 示例
{
  common: {
    confirm: '确认',
    cancel: '取消',
    save: '保存',
    loading: '加载中...',
  },
  login: {
    title: '登录',
    username: '用户名',
    password: '密码',
    submit: '登录',
  },
  menu: {
    home: '首页',
    dashboard: '仪表盘',
  },
}
```

## 扩展语言资源

在 `packages/locales/src/langs/` 下添加新语言：

```ts
// packages/locales/src/langs/ja-JP/index.ts
export default {
  common: { confirm: '確認', cancel: 'キャンセル' },
  // ...
};
```

然后在 `index.ts` 中导出：

```ts
export { default as jaJP } from './ja-JP';
```

并在 `packages/@core/shared/src/constants/index.ts` 中添加到 `SUPPORT_LOCALES`。
