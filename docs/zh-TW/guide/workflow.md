# 開發流程

Main 在提交前執行 `pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm build`。Polyrepo 執行其 `pnpm check` 與所選 UI 模式建置。

API 變更必須同步 TypeScript 型別、Nitro Mock、Spring Boot、單元測試、整合測試與文件。

