import{_ as a,o as n,c as i,ag as l}from"./chunks/framework.gmyryY1Z.js";const k=JSON.parse('{"title":"Polyrepo 历史架构","description":"","frontmatter":{},"headers":[],"relativePath":"zh/evolution/polyrepo.md","filePath":"zh/evolution/polyrepo.md","lastUpdated":null}'),e={name:"zh/evolution/polyrepo.md"};function p(t,s,o,r,h,c){return n(),i("div",null,[...s[0]||(s[0]=[l(`<h1 id="polyrepo-历史架构" tabindex="-1">Polyrepo 历史架构 <a class="header-anchor" href="#polyrepo-历史架构" aria-label="Permalink to &quot;Polyrepo 历史架构&quot;">​</a></h1><blockquote><p>本章记录 <code>polyrepo</code> 分支上的历史架构，仅供参考。该架构已归档，不再接受新功能开发。</p></blockquote><h2 id="原始目录结构" tabindex="-1">原始目录结构 <a class="header-anchor" href="#原始目录结构" aria-label="Permalink to &quot;原始目录结构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fast-vue3/          ← 单仓库，单应用</span></span>
<span class="line"><span>├── src/</span></span>
<span class="line"><span>│   ├── api/</span></span>
<span class="line"><span>│   │   └── user/</span></span>
<span class="line"><span>│   ├── assets/</span></span>
<span class="line"><span>│   │   ├── fonts/</span></span>
<span class="line"><span>│   │   ├── icons/</span></span>
<span class="line"><span>│   │   └── styles/</span></span>
<span class="line"><span>│   ├── components/</span></span>
<span class="line"><span>│   │   ├── Header/</span></span>
<span class="line"><span>│   │   └── SvgIcon/</span></span>
<span class="line"><span>│   ├── hooks/</span></span>
<span class="line"><span>│   ├── layout/</span></span>
<span class="line"><span>│   ├── router/</span></span>
<span class="line"><span>│   ├── store/</span></span>
<span class="line"><span>│   │   └── modules/</span></span>
<span class="line"><span>│   │       ├── app/</span></span>
<span class="line"><span>│   │       └── user/</span></span>
<span class="line"><span>│   ├── utils/</span></span>
<span class="line"><span>│   │   └── http/</span></span>
<span class="line"><span>│   │       └── axios/</span></span>
<span class="line"><span>│   └── views/</span></span>
<span class="line"><span>├── build/</span></span>
<span class="line"><span>│   └── vite/</span></span>
<span class="line"><span>│       └── plugins/</span></span>
<span class="line"><span>├── mock/</span></span>
<span class="line"><span>├── types/</span></span>
<span class="line"><span>├── public/</span></span>
<span class="line"><span>├── vite.config.mts</span></span>
<span class="line"><span>└── package.json</span></span></code></pre></div><h2 id="架构特征" tabindex="-1">架构特征 <a class="header-anchor" href="#架构特征" aria-label="Permalink to &quot;架构特征&quot;">​</a></h2><h3 id="优点" tabindex="-1">优点 <a class="header-anchor" href="#优点" aria-label="Permalink to &quot;优点&quot;">​</a></h3><ul><li><strong>简单直接</strong> — 单一仓库，上手成本低</li><li><strong>无额外工具</strong> — 不需要 Turbo、pnpm workspace</li><li><strong>快速启动</strong> — <code>npm install &amp;&amp; vite</code> 即可运行</li></ul><h3 id="技术债务" tabindex="-1">技术债务 <a class="header-anchor" href="#技术债务" aria-label="Permalink to &quot;技术债务&quot;">​</a></h3><table tabindex="0"><thead><tr><th>问题</th><th>影响</th></tr></thead><tbody><tr><td>所有代码混合在 <code>src/</code> 下</td><td>职责边界模糊，难以拆分复用</td></tr><tr><td>Vite 配置直接写在根目录</td><td>无法在多项目间共享</td></tr><tr><td>无 TypeScript 严格模式</td><td>类型安全性不足</td></tr><tr><td>依赖版本无锁定策略</td><td>升级风险高</td></tr><tr><td>缺乏代码规范工具链</td><td>多人协作质量参差不齐</td></tr></tbody></table><h2 id="phase-1-优化内容" tabindex="-1">Phase 1 优化内容 <a class="header-anchor" href="#phase-1-优化内容" aria-label="Permalink to &quot;Phase 1 优化内容&quot;">​</a></h2><p>在归档前，对 Polyrepo 进行了以下规范化工作：</p><h3 id="目录规范化" tabindex="-1">目录规范化 <a class="header-anchor" href="#目录规范化" aria-label="Permalink to &quot;目录规范化&quot;">​</a></h3><ul><li>整理 <code>src/</code> 下的模块划分</li><li>统一 <code>api/</code> 层结构（按业务模块分目录）</li><li>规范化 <code>store/modules/</code> 命名</li></ul><h3 id="工程配置优化" tabindex="-1">工程配置优化 <a class="header-anchor" href="#工程配置优化" aria-label="Permalink to &quot;工程配置优化&quot;">​</a></h3><ul><li>引入 <code>eslint.config.mjs</code>（Flat Config 格式）</li><li>统一 Prettier 配置</li><li>添加 Stylelint 支持 Less 和 Vue 文件</li><li>配置 <code>commitlint</code> + <code>czg</code> 交互式提交</li><li>引入 Lefthook 替代 Husky（更轻量）</li></ul><h3 id="typescript-规范化" tabindex="-1">TypeScript 规范化 <a class="header-anchor" href="#typescript-规范化" aria-label="Permalink to &quot;TypeScript 规范化&quot;">​</a></h3><ul><li>补全 <code>types/</code> 下的全局类型声明</li><li>统一环境变量类型（<code>ImportMetaEnv</code>）</li><li>规范化接口返回类型（<code>IResponse&lt;T&gt;</code>）</li></ul><h3 id="http-层规范" tabindex="-1">HTTP 层规范 <a class="header-anchor" href="#http-层规范" aria-label="Permalink to &quot;HTTP 层规范&quot;">​</a></h3><ul><li>封装 axios 实例，统一请求/响应拦截器</li><li>统一错误处理（HTTP 状态码映射）</li><li>规范 API 调用方式（<code>userApi.login()</code> 而非直接调用 axios）</li></ul><h2 id="归档过程" tabindex="-1">归档过程 <a class="header-anchor" href="#归档过程" aria-label="Permalink to &quot;归档过程&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. 在 main 上完成所有优化</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -A</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> commit</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -m</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;refactor: Phase 1 - Polyrepo 精炼与规范化&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 创建 polyrepo 归档分支</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> checkout</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -b</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> polyrepo</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. 在 polyrepo 分支打 tag</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tag</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> v0.3.0-polyrepo-final</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 4. 返回 main 准备重建</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> checkout</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> main</span></span></code></pre></div><p><code>polyrepo</code> 分支永久保留作为历史参考。</p><h2 id="局限性总结" tabindex="-1">局限性总结 <a class="header-anchor" href="#局限性总结" aria-label="Permalink to &quot;局限性总结&quot;">​</a></h2><p>Polyrepo 架构在以下场景下力不从心：</p><ol><li><strong>需要支持多套 UI</strong> — 必须 fork 整个仓库或大量复制代码</li><li><strong>团队协作</strong> — 没有清晰的包边界，难以分工</li><li><strong>依赖版本管理</strong> — 无 catalog 机制，依赖版本容易漂移</li><li><strong>代码复用</strong> — <code>src/utils</code>、<code>src/hooks</code> 等无法被其他项目直接引用</li><li><strong>构建优化</strong> — 缺乏 Turbo 等任务编排工具，无法利用构建缓存</li></ol><p>这些局限性是驱动向 Monorepo 迁移的根本原因。</p>`,26)])])}const u=a(e,[["render",p]]);export{k as __pageData,u as default};
