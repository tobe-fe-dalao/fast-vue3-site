# Request、Mock、Login

成功レスポンスは `{ code, message, data }` から展開し、HTTP/業務 Error は読める例外へ変換します。Login 成功後にだけ Token を保存します。

Mock は実 API と Method、Path、Envelope、Error status を一致させます。実 Backend 連携は Page code ではなく API base/proxy を変更し、Login、Token header、401、保護 Resource を確認します。

