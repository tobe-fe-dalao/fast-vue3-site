# Multi-app workspace

apps/ contains independently runnable admin and portal templates. packages/ contains request, stores, preferences, styles, layout, access, locales and shared contracts. internal/ contains Vite, TypeScript and lint tooling. scripts/ contains vsh and turbo-run.

workspace:* links local packages; catalog: centralizes dependency versions. Turbo dev/build depend on upstream ^build. The Vite config package loads dist/index.mjs, so tool changes require stub/build.

Use pnpm create-app to generate an admin or site app and add root dev/build scripts. Main’s request API returns an Axios instance from createHttpClient; createRequest unwraps result. Do not assume it implements polyrepo’s ApiError/204 handling.
