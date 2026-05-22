# Polyrepo Architecture

> This chapter documents the architecture on the `polyrepo` branch — representing the best single-repo single-app engineering practices. It is maintained in parallel with the `main` branch.

## Original Structure

```
fast-vue3/          ← Single repo, single app
├── src/
│   ├── api/user/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── layout/
│   ├── router/
│   ├── store/modules/
│   ├── utils/http/axios/
│   └── views/
├── build/vite/plugins/
├── mock/
├── types/
├── vite.config.mts
└── package.json
```

## Characteristics

### Strengths

- **Simple** — Single repo, low barrier to entry
- **No extra tooling** — No Turbo or pnpm workspaces needed
- **Fast startup** — Just `npm install && vite`

### Technical Debt

| Issue                               | Impact                                        |
| ----------------------------------- | --------------------------------------------- |
| All code mixed under `src/`         | Blurred boundaries, hard to extract and reuse |
| Vite config at root                 | Cannot be shared across projects              |
| No TypeScript strict mode           | Insufficient type safety                      |
| No dependency version lock strategy | High upgrade risk                             |
| Missing linting toolchain           | Inconsistent code quality in team settings    |

## Phase 1 Improvements

Before archiving, the following standardization work was done:

### Directory Cleanup

- Reorganized module boundaries under `src/`
- Unified `api/` layer structure
- Standardized `store/modules/` naming

### Engineering Config

- Introduced `eslint.config.mjs` (Flat Config format)
- Unified Prettier configuration
- Added Stylelint for Less and Vue files
- Configured `commitlint` + `czg` interactive commits
- Replaced Husky with Lefthook (lighter weight)

### TypeScript Standardization

- Added global type declarations under `types/`
- Unified environment variable types (`ImportMetaEnv`)
- Standardized API response types (`IResponse<T>`)

### HTTP Layer

- Wrapped axios instance with interceptors
- Unified error handling (HTTP status code mapping)
- Standardized API calling pattern (`userApi.login()` over raw axios calls)

## Archive Process

```bash
# 1. Complete all improvements on main
git add -A && git commit -m "refactor: Phase 1 - Polyrepo refinement"

# 2. Create archive branch
git checkout -b polyrepo
git tag v0.3.0-polyrepo-final

# 3. Return to main for rebuild
git checkout main
```

## Limitations Summary

The Polyrepo architecture struggled with:

1. **Multiple UI frameworks** — Required forking or massively copying code
2. **Team collaboration** — No clear package boundaries for division of work
3. **Dependency management** — No catalog mechanism, version drift risk
4. **Code reuse** — `src/utils`, `src/hooks` couldn't be referenced by other projects
5. **Build optimization** — No task orchestration tool, no build caching

These limitations were the fundamental drivers for migrating to Monorepo.
