module.exports = {
  lang: "zh-CN",
  title: "fast-vue3",
  base: "/fast-vue3-site/",
  description: "一个开箱即用的vue h5脚手架",
  lastUpdated: true,
  head: [
    // 添加图标
    ["link", { rel: "icon", href: "/favicon.ico" }],
  ],
  themeConfig: {
    nav: nav(),
    sidebar: {
      "/guide/": sidebarGuide(),
      "/en_us/": "en_us",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/tobe-fe-dalao/fast-vue3" },
    ],
    editLink: {
      pattern:
        "https://github.com/tobe-fe-dalao/fast-vue3/blob/docs/docs/:path",
      text: "在GitHub编辑此页",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present Fonghehe",
    },
  },
};

function nav() {
  return [
    { text: "介绍", link: "/guide/" },
    { text: "加入我们", link: "https://github.com/tobe-fe-dalao/fast-vue3" },
  ];
}

function sidebarGuide() {
  return [
    {
      text: "前言",
      collapsible: true,
      items: [
        { text: "介绍", link: "/guide/" },
        { text: "快速上手", link: "/guide/start" },
        { text: "参与编辑", link: "/guide/edit" },
      ],
    },
    {
      text: "指南",
      collapsible: true,
      items: [
        { text: "启动项目", link: "/guide/vue3/start" },
        { text: "vite.config.ts 基础配置", link: "/guide/vue3/base" },
        { text: "vite插件集成", link: "/guide/vue3/vite" },
        { text: "多环境变量", link: "/guide/vue3/env" },
        { text: "UI组件库", link: "/guide/vue3/ui" },
        { text: "Pinia 状态管理", link: "/guide/vue3/pinia" },
        { text: "vue-router", link: "/guide/vue3/router" },
        { text: "axios 封装及接口管理", link: "/guide/vue3/axios" },
        { text: "alias", link: "/guide/vue3/alias" },
        { text: "proxy 跨域", link: "/guide/vue3/proxy" },
        {
          text: "统一开发规范",
          link: "/guide/vue3/lint",
        },
      ],
    },
  ];
}
