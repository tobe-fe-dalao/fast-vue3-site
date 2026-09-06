# Polyrepo のモジュール境界

Polyrepo は単独デプロイ可能な一つの Vue アプリです。ビルド時 Alias で UI Component、Login、Theme adapter を選択し、Business view、Router、Store、Request は共通化します。

Entry は Style、選択 UI Provider、Pinia、Router、Mount の順に初期化します。File route が Route table を生成します。API 型は UI ライブラリに依存させません。

