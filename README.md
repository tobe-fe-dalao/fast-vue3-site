# Fast Vue3 Documentation

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文（台灣）](README.zh-TW.md) | [繁體中文（香港）](README.zh-HK.md) | [日本語](README.ja.md)

This VitePress site is the single documentation home for the Fast Vue3 ecosystem:

- `main`: a pnpm/Turbo monorepo with independent admin, portal, and Nitro mock applications;
- `polyrepo`: a focused Vue application with build-time UI-library selection.
- `fast-vue3-server`: the Spring Boot reference backend and shared `/api/v1` contract.

Published site: <https://tobe-fe-dalao.github.io/fast-vue3-site/>

English is the canonical documentation language. Simplified Chinese, Traditional Chinese (Taiwan and Hong Kong), and Japanese translations are available from the language menu.

## Requirements

- Node.js 22.18 or newer
- pnpm 9.15.4

## Commands

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

The local URL is `http://127.0.0.1:5174/fast-vue3-site/`. Generated `.vitepress/cache` and `.vitepress/dist` files must not be committed.

## Content map

- `docs/en`: canonical guides for branch selection, architecture, application development, mock API, real backend integration, and testing;
- `docs/<locale>/server`: backend setup, configuration, testing, authentication, RBAC, content, and API contracts migrated from `fast-vue3-server`;
- `docs/zh`: Chinese translations and expanded package/application references;
- `docs/ja`: Japanese translations;
- `docs/guide`: compatibility notices for legacy links.

The default deployment base is `/fast-vue3-site/`. Use `DOCS_BASE=/ pnpm build` for a root-domain deployment.

All long-form project documentation belongs here; application and server repositories should keep concise README files that link to the relevant pages. API documentation follows the real contract shared by `fast-vue3`, its Nitro mock, and `fast-vue3-server`. Public site reads are anonymous; admin operations, blog comment submission, and pricing checkout require authentication.
