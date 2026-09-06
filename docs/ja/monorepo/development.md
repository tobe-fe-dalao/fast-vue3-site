# Main の開発とスキャフォールド

`pnpm install` 後、`pnpm dev` で対話選択、または `pnpm dev:<app-name>` で単一アプリを起動します。Spring Boot 連携では `VITE_DEV_BACKEND=server` を設定します。

```bash
pnpm create-app
pnpm -F @fast-vue3/vsh run stub
```

生成処理は `apps/<name>` と必要な dev/build コマンドだけを追加します。実行ファイルは `scripts/vsh/dist/index.mjs` を読むため stub の再生成が必要です。提出前に lint、typecheck、test、build を実行します。

