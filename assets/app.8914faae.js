import{d as p,K as s,a2 as i,u,p as c,k as l,a3 as d,a4 as f,a5 as m,a6 as h,a7 as A,a8 as g,a9 as P,aa as v,ab as y,ac as C,ad as w,ae as _,af as b,ag as E}from"./chunks/framework.93b9f0ce.js";import{t as R}from"./chunks/theme.0de95a49.js";function r(e){if(e.extends){const a=r(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const n=r(R),D=p({name:"VitePressApp",setup(){const{site:e}=u();return c(()=>{l(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),d(),f(),m(),n.setup&&n.setup(),()=>h(n.Layout)}});async function O(){const e=T(),a=S();a.provide(A,e);const t=g(e.route);return a.provide(P,t),a.component("Content",v),a.component("ClientOnly",y),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),n.enhanceApp&&await n.enhanceApp({app:a,router:e,siteData:C}),{app:a,router:e,data:t}}function S(){return w(D)}function T(){let e=s,a;return _(t=>{let o=b(t);return e&&(a=o),(e||a===o)&&(o=o.replace(/\.js$/,".lean.js")),s&&(e=!1),E(()=>import(o),[])},n.NotFound)}s&&O().then(({app:e,router:a,data:t})=>{a.go().then(()=>{i(a.route,t.site),e.mount("#app")})});export{O as createApp};
