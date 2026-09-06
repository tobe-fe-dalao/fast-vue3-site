# 単一アプリ

依存方向は ページ → Store → API → HTTP です。config/ui.ts を基準に、Vite の別名で初期化、テーマ Provider、ログインフォーム、展示コンポーネントを選択します。all モードは 7 種の展示を組み合わせ、ログインには Element Plus を使用します。

アプリ自身の --fv-* 変数とレスポンシブレイアウトを使い、UI ライブラリの reset に依存しません。Ant Design/Naive/iDux は Provider、Element Plus/Arco/TDesign はテーマセレクター、DevUI はテーマサービスで切り替えます。

pnpm check と各モードのビルドに加え、モバイル幅、明暗テーマ、キーボード入力も確認します。Mock の /api/user/* は開発時のみ有効です。

[UI / Theme](/ja/polyrepo/ui-theme) · [HTTP / Mock](/ja/polyrepo/http-mock)
