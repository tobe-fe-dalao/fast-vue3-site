# 管理画面データ API

ダッシュボード、分析、データ概要、ログ、設定、部署、辞書、通知、オンラインユーザー、サーバー監視の `/api/v1/**` API はすべて認証が必要です。

現在は UI バリエーション間で同じ挙動を得るため、決定的なデモデータを返します。DB や監視基盤へ置き換える場合もレスポンス型を維持してください。

`GET /api/v1/analytics/overview` は `analytics:view`、`GET /api/v1/data/overview` は `data:view` が必要です。`V8__analytics_permissions.sql` が管理者ロールへ両権限を追加します。
