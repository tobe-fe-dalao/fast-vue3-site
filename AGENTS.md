# Agent Notes

This repository is the single VitePress documentation site for the Fast Vue3 ecosystem: the `main` monorepo, the `polyrepo` application, and the `fast-vue3-server` Spring Boot backend.

## Documentation Ownership

- The published site is `https://tobe-fe-dalao.github.io/fast-vue3-site/`.
- Long-form documentation belongs here. The frontend and backend code repositories should keep concise README files that link to this site.
- English content is canonical. Keep Simplified Chinese, Traditional Chinese (Taiwan and Hong Kong), and Japanese documentation aligned for shared behavior and navigation.

## Repository Shape

- `docs/index.md`: global English landing page.
- `docs/en`, `docs/zh`, `docs/zh-TW`, `docs/zh-HK`, `docs/ja`: locale roots.
- `docs/<locale>/guide`: branch selection and contributor workflow.
- `docs/<locale>/polyrepo`: the focused single-application architecture.
- `docs/<locale>/monorepo`: the main pnpm/Turbo workspace.
- `docs/<locale>/apps` and `docs/<locale>/packages`: application adapters and shared packages.
- `docs/<locale>/server`: Spring Boot setup, deployment, testing, authentication, RBAC, content, and API contracts.
- `docs/guide`: legacy-route compatibility pages; do not treat them as canonical content.
- `docs/.vitepress/config.ts`: locale definitions, navigation, sidebars, metadata, and deployment base.
- `docs/.vitepress/theme`: site-specific presentation only; keep content in Markdown.

## Common Commands

- Install with `pnpm install --frozen-lockfile`.
- Run locally with `pnpm dev` at `http://127.0.0.1:5174/fast-vue3-site/`.
- Build and validate links with `pnpm build`.
- Preview the production build with `pnpm preview`.
- Use `DOCS_BASE=/ pnpm build` only for root-domain deployment; GitHub Pages uses the default `/fast-vue3-site/` base.

## Content And Navigation Rules

- Use absolute site routes such as `/en/server/guide/getting-started`; do not include the deployment base in Markdown links.
- When adding, moving, or renaming a page, update the matching locale navigation/sidebar in `docs/.vitepress/config.ts` and run the full build to catch dead links.
- Keep route structures consistent across locales even when a translation is intentionally shorter.
- Document behavior that exists in source and tests. Avoid aspirational API, configuration, or security claims.
- When `/api/v1` changes, verify the Java server, frontend API types and clients, Nitro mock, tests, and server documentation remain aligned.
- README files describe how to work on this documentation repository; detailed product guidance belongs under `docs/`.

## Deployment And Generated Files

- `.github/workflows/deploy.yml` is the canonical GitHub Pages workflow.
- Do not commit `node_modules/`, `docs/.vitepress/cache/`, `docs/.vitepress/dist/`, logs, or OS metadata.
- Treat `package.json`, `pnpm-lock.yaml`, and `pnpm-workspace.yaml` as source. Keep the declared pnpm version and CI setup compatible.
