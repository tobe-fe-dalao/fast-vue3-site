# アーキテクチャ

Fast-Vue3 は main と polyrepo の並行ブランチを提供します。polyrepo はビルド時に UI を選択する単一 Vue アプリ、main は独立した管理画面とポータルを持つ pnpm/Turbo Workspace です。

依存方向は ページ → Store → API → HTTP です。config/ui.ts を基準に、Vite の別名で初期化、テーマ Provider、ログインフォーム、展示コンポーネントを選択します。all モードは 7 種の展示を組み合わせ、ログインには Element Plus を使用します。

アプリ自身の --fv-* 変数とレスポンシブレイアウトを使い、UI ライブラリの reset に依存しません。Ant Design/Naive/iDux は Provider、Element Plus/Arco/TDesign はテーマセレクター、DevUI はテーマサービスで切り替えます。

pnpm check と各モードのビルドに加え、モバイル幅、明暗テーマ、キーボード入力も確認します。Mock の /api/user/* は開発時のみ有効です。

apps は独立した管理画面とポータル、packages は request/stores/preferences/styles/layout/access/locales と共有型、internal は Vite/TypeScript/lint、scripts は vsh と turbo-run を担当します。

workspace:* はローカルパッケージ、catalog: は共通バージョンを参照します。Turbo の dev/build は上流の ^build に依存します。Vite 設定は dist/index.mjs から読み込むため、ツール変更後は stub/build が必要です。

pnpm create-app は admin/site を生成し、ルートに dev/build スクリプトを追加します。main の createHttpClient は Axios インスタンスを返し、createRequest が result を取り出します。polyrepo の ApiError や 204 処理と同一ではありません。
