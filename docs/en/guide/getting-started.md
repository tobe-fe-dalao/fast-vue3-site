# Getting Started

## Prerequisites

| Tool    | Required Version |
| ------- | ---------------- |
| Node.js | >= 20.0.0        |
| pnpm    | >= 9.5.0         |
| Git     | >= 2.30          |

> Recommended: Use [Corepack](https://nodejs.org/api/corepack.html) to manage pnpm:
> `corepack enable && corepack prepare pnpm@9.15.9 --activate`

## Clone the Repository

```bash
git clone https://github.com/tobe-fe-dalao/fast-vue3.git
cd fast-vue3
```

## Install Dependencies

```bash
pnpm install
```

The `prepare` script runs automatically on first install and:

1. Installs Lefthook Git Hooks
2. Builds `@fast-vue3/vite-config` (compiles TypeScript source to ESM)

## Start the Development Server

Each UI ecosystem has its own dev command:

```bash
# Ant Design Vue (port 3001)
pnpm dev:antd

# Element Plus (port 3002)
pnpm dev:ele

# Naive UI (port 3003)
pnpm dev:naive

# Arco Design (port 3004)
pnpm dev:arco

# TDesign Vue Next (port 3005)
pnpm dev:tdesign
```

Turbo automatically builds dependencies (like `@fast-vue3/vite-config`) before starting any app.

## Build for Production

```bash
# Build all apps
pnpm build

# Build a single app
pnpm build:antd
pnpm build:ele
pnpm build:naive
pnpm build:arco
pnpm build:tdesign
```

## Type Checking

```bash
pnpm typecheck
```

## Linting

```bash
# Check
pnpm lint

# Auto-fix
pnpm lint:fix

# Format
pnpm format
```

## Committing Changes

Use `czg` for an interactive commit wizard:

```bash
pnpm commit
```

Pre-commit hooks run automatically:

- `lint-staged`: runs ESLint, Prettier, Stylelint on staged files
- `commitlint`: validates the commit message format

## Clean Build Artifacts

```bash
pnpm clean
```

Recursively removes `dist/`, `.turbo/`, `node_modules/`, and `.cache/` from all workspace packages.

## Project Structure

```
fast-vue3/
├── apps/                    # UI ecosystem apps
│   ├── web-antd/            # Ant Design Vue (port 3001)
│   ├── web-ele/             # Element Plus (port 3002)
│   ├── web-naive/           # Naive UI (port 3003)
│   ├── web-arco/            # Arco Design (port 3004)
│   └── web-tdesign/         # TDesign Vue Next (port 3005)
├── packages/                # Shared business packages
│   ├── @core/shared/        # Core types & constants
│   ├── utils/               # Utility functions
│   ├── stores/              # Pinia state management
│   ├── locales/             # i18n resources
│   └── effects/
│       ├── request/         # HTTP client wrapper
│       └── access/          # Route access guard
├── internal/                # Engineering infrastructure
│   ├── vite-config/         # Shared Vite config factory
│   ├── tsconfig/            # Base TypeScript configs
│   └── lint-configs/        # Lint rule packages
├── scripts/                 # Engineering scripts
├── turbo.json               # Turbo task orchestration
└── pnpm-workspace.yaml      # pnpm workspace + catalog config
```
