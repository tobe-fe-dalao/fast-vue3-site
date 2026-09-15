# テストと品質ゲート

```bash
pnpm lint
pnpm typecheck
pnpm -F @fast-vue3/api test
pnpm -F @fast-vue3/backend-mock test
pnpm build
```

API パッケージのテストは共有クライアントの URL、メソッド、パラメーターを検証し、backend-mock のテストは起動した Nitro サーバーを HTTP で検証します。

`pnpm typecheck` は Vite 設定と `vsh` の TypeScript ソースも検査し、Mock のポート選択やスキャフォールド処理の型エラーを検出します。

ポータル変更では、公開コンテンツが Token なしで成功すること、匿名のコメント投稿・注文が 401 になり、ログイン後に成功することの両方をテストします。
