# Main モノレポの構成

main ブランチは実行アプリと再利用コードを分離します。

```text
apps/       管理画面、ポータル、Nitro Mock
packages/   API、Request、Store、設定、Layout、Access、Style、型
internal/   Vite、TypeScript、Lint、Node ツール
scripts/    起動選択とアプリ生成
```

アプリは `workspace:*` で共有パッケージを参照し、Turbo が依存グラフ順にビルドします。UI 固有コードは各アプリ、共通 API 契約は `@fast-vue3/api` に置きます。`VITE_DEV_BACKEND` が Nitro と Spring プロキシを切り替えます。

