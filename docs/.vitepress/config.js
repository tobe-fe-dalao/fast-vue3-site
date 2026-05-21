import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/fast-vue3/',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', href: '/fast-vue3/favicon.ico' }],
  ],

  locales: {
    root: {
      lang: 'zh-CN',
      label: '中文',
      title: 'Fast Vue3',
      description: 'Vue3 Monorepo 工程平台 - 集成多 Admin UI 生态系统',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh/guide/getting-started', activeMatch: '/zh/guide/' },
          { text: '演进历史', link: '/zh/evolution/', activeMatch: '/zh/evolution/' },
          { text: '应用', link: '/zh/apps/', activeMatch: '/zh/apps/' },
          { text: '包', link: '/zh/packages/', activeMatch: '/zh/packages/' },
        ],
        sidebar: {
          '/zh/guide/': [
            {
              text: '指南',
              items: [
                { text: '快速上手', link: '/zh/guide/getting-started' },
                { text: '架构概览', link: '/zh/guide/architecture' },
                { text: '开发工作流', link: '/zh/guide/workflow' },
              ],
            },
          ],
          '/zh/evolution/': [
            {
              text: '架构演进',
              items: [
                { text: '演进概述', link: '/zh/evolution/' },
                { text: 'Polyrepo 历史架构', link: '/zh/evolution/polyrepo' },
                { text: 'Monorepo 新架构', link: '/zh/evolution/monorepo' },
                { text: '架构对比分析', link: '/zh/evolution/comparison' },
              ],
            },
          ],
          '/zh/apps/': [
            {
              text: '应用',
              items: [
                { text: '应用概览', link: '/zh/apps/' },
                { text: 'Ant Design Vue', link: '/zh/apps/antd' },
                { text: 'Element Plus', link: '/zh/apps/element-plus' },
                { text: 'Naive UI', link: '/zh/apps/naive-ui' },
                { text: 'Arco Design', link: '/zh/apps/arco-design' },
                { text: 'TDesign', link: '/zh/apps/tdesign' },
                { text: '接入新 UI 库', link: '/zh/apps/add-new' },
              ],
            },
          ],
          '/zh/packages/': [
            {
              text: '共享包',
              items: [
                { text: '包概览', link: '/zh/packages/' },
                { text: '@fast-vue3/shared', link: '/zh/packages/shared' },
                { text: '@fast-vue3/utils', link: '/zh/packages/utils' },
                { text: '@fast-vue3/stores', link: '/zh/packages/stores' },
                { text: '@fast-vue3/locales', link: '/zh/packages/locales' },
                { text: '@fast-vue3/request', link: '/zh/packages/request' },
                { text: '@fast-vue3/access', link: '/zh/packages/access' },
              ],
            },
          ],
        },
        editLink: {
          pattern: 'https://github.com/tobe-fe-dalao/fast-vue3/blob/main/fast-vue3-site/docs/:path',
          text: '在 GitHub 上编辑此页',
        },
        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © 2022-present Fonghehe',
        },
        docFooter: { prev: '上一页', next: '下一页' },
        outlineTitle: '本页目录',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
      },
    },
    en: {
      lang: 'en-US',
      label: 'English',
      title: 'Fast Vue3',
      description: 'Vue3 Monorepo Engineering Platform - Multi Admin UI Ecosystem',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/getting-started', activeMatch: '/en/guide/' },
          { text: 'Evolution', link: '/en/evolution/', activeMatch: '/en/evolution/' },
          { text: 'Apps', link: '/en/apps/', activeMatch: '/en/apps/' },
          { text: 'Packages', link: '/en/packages/', activeMatch: '/en/packages/' },
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Guide',
              items: [
                { text: 'Getting Started', link: '/en/guide/getting-started' },
                { text: 'Architecture Overview', link: '/en/guide/architecture' },
                { text: 'Development Workflow', link: '/en/guide/workflow' },
              ],
            },
          ],
          '/en/evolution/': [
            {
              text: 'Architecture Evolution',
              items: [
                { text: 'Overview', link: '/en/evolution/' },
                { text: 'Polyrepo Historical Architecture', link: '/en/evolution/polyrepo' },
                { text: 'Monorepo New Architecture', link: '/en/evolution/monorepo' },
                { text: 'Architecture Comparison', link: '/en/evolution/comparison' },
              ],
            },
          ],
          '/en/apps/': [
            {
              text: 'Apps',
              items: [
                { text: 'Apps Overview', link: '/en/apps/' },
                { text: 'Ant Design Vue', link: '/en/apps/antd' },
                { text: 'Element Plus', link: '/en/apps/element-plus' },
                { text: 'Naive UI', link: '/en/apps/naive-ui' },
                { text: 'Arco Design', link: '/en/apps/arco-design' },
                { text: 'TDesign', link: '/en/apps/tdesign' },
                { text: 'Add New UI Library', link: '/en/apps/add-new' },
              ],
            },
          ],
          '/en/packages/': [
            {
              text: 'Shared Packages',
              items: [
                { text: 'Packages Overview', link: '/en/packages/' },
                { text: '@fast-vue3/shared', link: '/en/packages/shared' },
                { text: '@fast-vue3/utils', link: '/en/packages/utils' },
                { text: '@fast-vue3/stores', link: '/en/packages/stores' },
                { text: '@fast-vue3/locales', link: '/en/packages/locales' },
                { text: '@fast-vue3/request', link: '/en/packages/request' },
                { text: '@fast-vue3/access', link: '/en/packages/access' },
              ],
            },
          ],
        },
        editLink: {
          pattern: 'https://github.com/tobe-fe-dalao/fast-vue3/blob/main/fast-vue3-site/docs/:path',
          text: 'Edit this page on GitHub',
        },
        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © 2022-present Fonghehe',
        },
      },
    },
    ja: {
      lang: 'ja-JP',
      label: '日本語',
      title: 'Fast Vue3',
      description: 'Vue3 Monorepo エンジニアリングプラットフォーム - 複数 Admin UI エコシステム',
      themeConfig: {
        nav: [
          { text: 'ガイド', link: '/ja/guide/getting-started', activeMatch: '/ja/guide/' },
          { text: '進化の歴史', link: '/ja/evolution/', activeMatch: '/ja/evolution/' },
          { text: 'アプリ', link: '/ja/apps/', activeMatch: '/ja/apps/' },
          { text: 'パッケージ', link: '/ja/packages/', activeMatch: '/ja/packages/' },
        ],
        sidebar: {
          '/ja/guide/': [
            {
              text: 'ガイド',
              items: [
                { text: 'クイックスタート', link: '/ja/guide/getting-started' },
                { text: 'アーキテクチャ概要', link: '/ja/guide/architecture' },
                { text: '開発ワークフロー', link: '/ja/guide/workflow' },
              ],
            },
          ],
          '/ja/evolution/': [
            {
              text: 'アーキテクチャの進化',
              items: [
                { text: '進化の概要', link: '/ja/evolution/' },
                { text: 'Polyrepo 旧アーキテクチャ', link: '/ja/evolution/polyrepo' },
                { text: 'Monorepo 新アーキテクチャ', link: '/ja/evolution/monorepo' },
                { text: 'アーキテクチャ比較', link: '/ja/evolution/comparison' },
              ],
            },
          ],
          '/ja/apps/': [
            {
              text: 'アプリ',
              items: [
                { text: 'アプリ概要', link: '/ja/apps/' },
                { text: 'Ant Design Vue', link: '/ja/apps/antd' },
                { text: 'Element Plus', link: '/ja/apps/element-plus' },
                { text: 'Naive UI', link: '/ja/apps/naive-ui' },
                { text: 'Arco Design', link: '/ja/apps/arco-design' },
                { text: 'TDesign', link: '/ja/apps/tdesign' },
                { text: '新しい UI ライブラリの追加', link: '/ja/apps/add-new' },
              ],
            },
          ],
          '/ja/packages/': [
            {
              text: '共有パッケージ',
              items: [
                { text: 'パッケージ概要', link: '/ja/packages/' },
                { text: '@fast-vue3/shared', link: '/ja/packages/shared' },
                { text: '@fast-vue3/utils', link: '/ja/packages/utils' },
                { text: '@fast-vue3/stores', link: '/ja/packages/stores' },
                { text: '@fast-vue3/locales', link: '/ja/packages/locales' },
                { text: '@fast-vue3/request', link: '/ja/packages/request' },
                { text: '@fast-vue3/access', link: '/ja/packages/access' },
              ],
            },
          ],
        },
        editLink: {
          pattern: 'https://github.com/tobe-fe-dalao/fast-vue3/blob/main/fast-vue3-site/docs/:path',
          text: 'GitHub でこのページを編集',
        },
        footer: {
          message: 'MIT ライセンスのもとでリリース。',
          copyright: 'Copyright © 2022-present Fonghehe',
        },
        docFooter: { prev: '前のページ', next: '次のページ' },
        outlineTitle: '目次',
        returnToTopLabel: 'トップに戻る',
      },
    },
  },

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tobe-fe-dalao/fast-vue3' },
    ],
    search: {
      provider: 'local',
    },
  },
})
