# トラブルシューティング

## Cannot GET /

選択した dev script、Vite base、Vite が表示した URL を確認します。

## Mode ごとに Style が異なる

Alias、Provider 順、UI 固有 Style import を確認し、Mode 変更後に Vite cache を消します。

## Dark 背景でも Component が明るい

CSS 背景だけでなく、意味的 Theme 設定を UI Provider に渡します。

## Login 失敗後に遷移する、または HTML が返る

API proxy、Content-Type、成功 code を確認し、Token 保存後だけ遷移してください。

