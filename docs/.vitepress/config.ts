import { defineConfig, type DefaultTheme } from 'vitepress';

type LinkItem = readonly [text: string, link: string];
type TranslatedLocale = 'en' | 'ja' | 'zh-HK' | 'zh-TW';
type LocaleLabels = readonly [
  language: string,
  guide: string,
  gettingStarted: string,
  architecture: string,
  applications: string,
  packages: string,
];

const base = process.env.DOCS_BASE || '/fast-vue3-site/';
const group = (text: string, items: LinkItem[]): DefaultTheme.SidebarItem => ({
  text,
  items: items.map(([text, link]) => ({ text, link })),
});
const zh = [
  group('开始', [['选择分支','/zh/guide/getting-started'], ['架构对比','/zh/guide/architecture'], ['开发工作流','/zh/guide/workflow']]),
  group('Polyrepo · 单应用', [['快速开始','/zh/polyrepo/getting-started'], ['模块边界','/zh/polyrepo/architecture'], ['UI 与主题','/zh/polyrepo/ui-theme'], ['请求与 Mock','/zh/polyrepo/http-mock'], ['构建部署','/zh/polyrepo/build-deploy'], ['常见问题','/zh/polyrepo/troubleshooting']]),
  group('Main · Monorepo', [['整体架构','/zh/monorepo/architecture'], ['开发与脚手架','/zh/monorepo/development'], ['Mock 与请求','/zh/monorepo/mock-api'], ['真实后端联调','/zh/monorepo/backend-integration'], ['测试与质量门禁','/zh/monorepo/testing'], ['应用清单','/zh/apps/'], ['共享包','/zh/packages/']]),
  group('应用适配', [['Ant Design Vue','/zh/apps/antd'], ['Arco','/zh/apps/arco-design'], ['Element Plus','/zh/apps/element-plus'], ['Naive UI','/zh/apps/naive-ui'], ['TDesign','/zh/apps/tdesign'], ['iDux','/zh/apps/idux'], ['PrimeVue','/zh/apps/primevue']]),
  group('共享能力', [['API','/zh/packages/api'], ['Request','/zh/packages/request'], ['Stores','/zh/packages/stores'], ['Preferences','/zh/packages/preferences'], ['Layout','/zh/packages/layout'], ['Access','/zh/packages/access'], ['Styles','/zh/packages/styles'], ['Locales','/zh/packages/locales']]),
  group('后端服务', [['概览','/zh/server/'], ['快速开始','/zh/server/guide/getting-started'], ['配置与部署','/zh/server/guide/configuration'], ['测试策略','/zh/server/guide/testing'], ['接口契约','/zh/server/api/contracts'], ['认证与 RBAC','/zh/server/api/auth-rbac'], ['内容与门户','/zh/server/api/content-portal'], ['管理端数据','/zh/server/api/management']]),
];
function translated(lang: TranslatedLocale, labels: LocaleLabels) {
  const words = lang === 'en'
    ? {
        apps: 'UI adapters',
        architecture: 'Architecture',
        auth: 'Authentication and RBAC',
        backend: 'Backend integration',
        build: 'Build and deployment',
        configuration: 'Configuration and deployment',
        content: 'Content and portal',
        contract: 'API contract',
        development: 'Development and scaffolding',
        main: 'Main · Monorepo',
        management: 'Admin data',
        mock: 'Mock API and requests',
        overview: 'Overview',
        packages: 'Shared capabilities',
        server: 'Server',
        start: 'Start',
        testing: 'Testing',
        troubleshooting: 'Troubleshooting',
        workflow: 'Workflow',
      }
    : lang === 'ja'
      ? {
        apps: 'UI アダプター',
        architecture: 'アーキテクチャ',
        auth: '認証と RBAC',
        backend: 'バックエンド連携',
        build: 'ビルドとデプロイ',
        configuration: '設定とデプロイ',
        content: 'コンテンツとポータル',
        contract: 'API 契約',
        development: '開発とスキャフォールド',
        main: 'Main · モノレポ',
        management: '管理画面データ',
        mock: 'Mock API とリクエスト',
        overview: '概要',
        packages: '共通機能',
        server: 'サーバー',
        start: 'スタート',
        testing: 'テスト',
        troubleshooting: 'トラブルシューティング',
        workflow: 'ワークフロー',
        }
      : {
          apps: 'UI 適配',
          architecture: '架構',
          auth: '認證與 RBAC',
          backend: '後端連接',
          build: '建置與部署',
          configuration: '設定與部署',
          content: '內容與入口網站',
          contract: 'API 契約',
          development: '開發與腳手架',
          main: 'Main · Monorepo',
          management: '管理端資料',
          mock: 'Mock API 與請求',
          overview: '總覽',
          packages: '共用能力',
          server: '後端服務',
          start: '開始',
          testing: '測試',
          troubleshooting: '常見問題',
          workflow: '開發流程',
        };

  const localeCodes: Record<TranslatedLocale, string> = {
    en: 'en-US',
    ja: 'ja-JP',
    'zh-HK': 'zh-HK',
    'zh-TW': 'zh-TW',
  };

  return { lang: localeCodes[lang], label: labels[0], link: `/${lang}/`, themeConfig: {
    nav: [{text: labels[1], link: `/${lang}/guide/getting-started`}, {text: 'Polyrepo', link: `/${lang}/polyrepo/`}, {text: 'Main', link: `/${lang}/monorepo/`}, {text: words.server, link: `/${lang}/server/`}],
    sidebar: {[`/${lang}/`]: [
      group(words.start, [[labels[2],`/${lang}/guide/getting-started`],[labels[3],`/${lang}/guide/architecture`],[words.workflow,`/${lang}/guide/workflow`]]),
      group('Polyrepo', [[words.overview,`/${lang}/polyrepo/`],[labels[2],`/${lang}/polyrepo/getting-started`],[words.architecture,`/${lang}/polyrepo/architecture`],['UI / Theme',`/${lang}/polyrepo/ui-theme`],['HTTP / Mock',`/${lang}/polyrepo/http-mock`],[words.build,`/${lang}/polyrepo/build-deploy`],[words.troubleshooting,`/${lang}/polyrepo/troubleshooting`]]),
      group(words.main, [[words.overview,`/${lang}/monorepo/`],[words.architecture,`/${lang}/monorepo/architecture`],[words.development,`/${lang}/monorepo/development`],[words.mock,`/${lang}/monorepo/mock-api`],[words.backend,`/${lang}/monorepo/backend-integration`],[words.testing,`/${lang}/monorepo/testing`]]),
      group(words.apps, [['Ant Design Vue',`/${lang}/apps/antd`],['Arco Design',`/${lang}/apps/arco-design`],['Element Plus',`/${lang}/apps/element-plus`],['iDux',`/${lang}/apps/idux`],['Naive UI',`/${lang}/apps/naive-ui`],['PrimeVue',`/${lang}/apps/primevue`],['TDesign',`/${lang}/apps/tdesign`]]),
      group(words.packages, [['API',`/${lang}/packages/api`],['Request',`/${lang}/packages/request`],['Stores',`/${lang}/packages/stores`],['Preferences',`/${lang}/packages/preferences`],['Layout',`/${lang}/packages/layout`],['Access',`/${lang}/packages/access`],['Styles',`/${lang}/packages/styles`],['Locales',`/${lang}/packages/locales`],['Types',`/${lang}/packages/types`],['Utils',`/${lang}/packages/utils`]]),
      group(words.server, [[words.overview,`/${lang}/server/`],[labels[2],`/${lang}/server/guide/getting-started`],[words.configuration,`/${lang}/server/guide/configuration`],[words.testing,`/${lang}/server/guide/testing`],[words.contract,`/${lang}/server/api/contracts`],[words.auth,`/${lang}/server/api/auth-rbac`],[words.content,`/${lang}/server/api/content-portal`],[words.management,`/${lang}/server/api/management`]])
    ]}
  }};
}
const english = translated('en', ['English', 'Guide', 'Getting started', 'Architecture', 'Applications', 'Packages']);
export default defineConfig({
  base,
  title: 'Fast-Vue3',
  description: 'Architecture, UI theming, API integration, and development guides for Fast Vue3 applications and the Spring Boot server',
  cleanUrls: true,
  lastUpdated: true,
  head: [['link', {rel:'icon', type:'image/svg+xml', href:`${base}logo.svg`}]],
  locales: {
    root: {lang:'en-US', label:'English', themeConfig: english.themeConfig},
    zh: {lang:'zh-CN', label:'简体中文', link:'/zh/', themeConfig: {
      nav: [{text:'开始',link:'/zh/guide/getting-started'}, {text:'Polyrepo',link:'/zh/polyrepo/getting-started'}, {text:'Main',link:'/zh/monorepo/architecture'}, {text:'后端服务',link:'/zh/server/'}],
      sidebar: {'/zh/':zh},
      outlineTitle:'本页内容', docFooter:{prev:'上一页', next:'下一页'}, sidebarMenuLabel:'目录', returnToTopLabel:'回到顶部', darkModeSwitchLabel:'切换主题'
    }},
    'zh-TW': translated('zh-TW',['繁體中文（台灣）','指南','快速開始','架構','應用','套件']),
    'zh-HK': translated('zh-HK',['繁體中文（香港）','指南','快速開始','架構','應用','套件']),
    ja: translated('ja',['日本語','ガイド','はじめに','アーキテクチャ','アプリ','パッケージ'])
  },
  themeConfig: {
    logo:'/logo.svg',
    search:{provider:'local'},
    outline:[2,3],
    socialLinks:[{icon:'github',link:'https://github.com/tobe-fe-dalao/fast-vue3'}],
    editLink:{pattern:'https://github.com/tobe-fe-dalao/fast-vue3-site/edit/main/docs/:path',text:'Edit this page'},
    footer:{message:'Released under the MIT License.',copyright:'Fast-Vue3 · main · polyrepo · server'}
  }
});
