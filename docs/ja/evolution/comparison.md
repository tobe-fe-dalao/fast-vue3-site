# アーキテクチャ

Fast-Vue3 は main と polyrepo の並行ブランチを提供します。polyrepo はビルド時に UI を選択する単一 Vue アプリ、main は独立した管理画面とポータルを持つ pnpm/Turbo Workspace です。

apps は独立した管理画面とポータル、packages は request/stores/preferences/styles/layout/access/locales と共有型、internal は Vite/TypeScript/lint、scripts は vsh と turbo-run を担当します。

workspace:* はローカルパッケージ、catalog: は共通バージョンを参照します。Turbo の dev/build は上流の ^build に依存します。Vite 設定は dist/index.mjs から読み込むため、ツール変更後は stub/build が必要です。

pnpm create-app は admin/site を生成し、ルートに dev/build スクリプトを追加します。main の createHttpClient は Axios インスタンスを返し、createRequest が result を取り出します。polyrepo の ApiError や 204 処理と同一ではありません。

[ブランチの選択](/ja/guide/getting-started)
