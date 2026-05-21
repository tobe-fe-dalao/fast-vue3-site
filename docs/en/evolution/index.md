# Architecture Evolution Overview

Fast Vue3 underwent a complete architectural evolution from **Polyrepo (single repo)** to **Monorepo (multi-package repo)**.

## Timeline

```
2022 ~ 2024          2025 Q1              2025 Q2 ~ present
────────────        ────────────         ────────────────
 Polyrepo phase       Archive phase         Monorepo phase
 Single app           polyrepo branch       main branch rebuilt
 Vite + Vue3          History preserved     Multi-app platform
 Standardization      Archived              5 UI ecosystems
```

## Two Architectures Preserved

| Branch | Architecture | Description |
|--------|-------------|-------------|
| `polyrepo` | Polyrepo | Historical legacy architecture, archived |
| `main` | Monorepo | New architecture, actively maintained |

The `polyrepo` branch is kept as a historical reference and receives no new feature development. All new work happens on `main`.

## Why Migrate

Core pain points of the Polyrepo phase:

1. **Version fragmentation** — All dependency versions scattered in a single `package.json`, hard to upgrade uniformly
2. **No code reuse** — Supporting multiple UI frameworks required duplicating the entire project
3. **Repeated config** — ESLint, TypeScript, Vite configs had to be rewritten for each project
4. **No package boundaries** — All code mixed under `src/`, unclear responsibilities
5. **Poor scalability** — Adding new tech stacks required forking the repository

Core problems Monorepo solves:

- **Unified version management** — pnpm workspace catalog
- **Shared infrastructure** — `packages/*` written once, reused everywhere
- **Scalability** — Adding a new UI ecosystem = adding one app in `apps/`
- **Clear boundaries** — Each package has a single responsibility with a clear API

## This Section

- [Polyrepo Historical Architecture](./polyrepo) — Original structure analysis, technical debt, optimization work
- [Monorepo New Architecture](./monorepo) — New architecture design, package splitting strategy, key decisions
- [Architecture Comparison](./comparison) — Pros/cons, use cases, decision rationale
