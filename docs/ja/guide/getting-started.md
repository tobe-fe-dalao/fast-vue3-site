# ブランチの選択

Fast-Vue3 は main と polyrepo の並行ブランチを提供します。polyrepo はビルド時に UI を選択する単一 Vue アプリ、main は独立した管理画面とポータルを持つ pnpm/Turbo Workspace です。

共通開発環境には Node 22.18 以降を使用してください。pnpm のバージョンは各ブランチの packageManager に従います。ブランチ切り替え後は対応する lockfile で再インストールします。

| ブランチ | 起動 | UI 選択 | Mock アカウント |
| --- | --- | --- | --- |
| polyrepo | `pnpm dev` | VITE_UI_FRAMEWORK | test / test |
| main | `pnpm dev:web-antd` | apps の選択 | admin / 123456 |

Polyrepo の既定アドレスは 127.0.0.1:5173 です。DevUI は polyrepo、PrimeVue は main に含まれます。main は管理画面 7、ポータル 7、web-app、backend-mock の計 16 アプリです。`pnpm dev` は Nitro Mock を使い、`pnpm dev:server` は別途起動した Java API に接続します。7 つの `site-*` の公開コンテンツ画面は共有 API を利用します。本番環境には実際のバックエンドが必要です。

```sh
pnpm install --frozen-lockfile
pnpm dev
```
