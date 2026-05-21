# Architecture Comparison

A multi-dimensional comparison between Polyrepo and Monorepo architectures.

## Summary Table

| Dimension | Polyrepo | Monorepo |
|-----------|---------|---------|
| Repo structure | Single repo, single app | Single repo, multiple packages & apps |
| Version management | Single package.json | pnpm workspace catalog |
| Build tooling | Direct vite | turbo + vite |
| Code reuse | Manual copy | workspace package references |
| UI expansion | Fork or copy | Add new app/ |
| Package boundaries | None (src/ mixed) | Clear (packages hierarchy) |
| Onboarding cost | Low | Medium (requires understanding turbo/pnpm workspace) |
| Long-term maintenance | High (grows with scale) | Low (shared infrastructure) |

## Dependency Version Management

**Polyrepo:**
```json
{
  "dependencies": {
    "vue": "^3.4.0",
    "ant-design-vue": "^4.1.0",
    "element-plus": "^2.6.0"
  }
}
```
All dependencies mixed in one file. Multiple projects risk version drift.

**Monorepo:**
```yaml
catalog:
  vue: ^3.5.17
  ant-design-vue: ^4.2.6
  element-plus: ^2.10.2
```
Centralized — upgrading affects all packages at once.

## Supporting Multiple UI Frameworks

**Polyrepo:** Each UI framework requires its own repository or project, with separate build configs and toolchains.

**Monorepo:**
- Create `apps/web-{name}/`
- Inherit `@fast-vue3/vite-config` (just pass in the UI resolver)
- Reuse all `packages/*` shared infrastructure
- Add a new UI framework in minutes

## Build Performance

**Polyrepo:** Every build is a full rebuild — no incremental caching.

**Monorepo (Turbo):**
- Build result caching (local `.turbo/cache`)
- Parallel builds across packages
- Only rebuild affected packages (`turbo --filter`)

## When to Use Each

### Polyrepo is appropriate for

- Single product with no multi-UI requirements
- Small teams or personal projects
- Rapid prototyping
- No cross-project code reuse needed

### Monorepo is appropriate for

- Multiple UI frameworks or product lines
- Large amounts of reusable infrastructure
- Team collaboration requiring consistent standards
- Long-term maintainability focus
- Need for build caching and task parallelism

## Migration Cost

| Item | Effort | One-time / Ongoing |
|------|--------|-------------------|
| Learning pnpm workspace | Small | One-time |
| Turbo configuration | Small | One-time |
| Splitting packages | Medium | One-time |
| Migrating existing code | Medium-Large | One-time |
| Team learning curve | Small-Medium | One-time |

Post-migration: marginal cost of adding new UI apps or upgrading shared infrastructure approaches zero.

## Conclusion

> For a "multi-UI ecosystem + shared infrastructure + long-term evolution" scenario, Monorepo is the better choice.

Fast Vue3's migration was not chasing new technology trends — it was a natural consequence of engineering scope and requirements:
- A single Polyrepo cannot elegantly support 5 UI ecosystems
- Shared infrastructure in Polyrepo can only be maintained through manual copying
- Monorepo makes "version consistency + code reuse + engineering uniformity" an architectural guarantee
