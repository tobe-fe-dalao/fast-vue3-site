# 認証と RBAC

| メソッド | パス | 用途 |
| --- | --- | --- |
| POST | `/api/v1/auth/login` | Access/Refresh Token の発行 |
| POST | `/api/v1/auth/register` | Bearer Token なしのユーザー登録 |
| POST | `/api/v1/auth/refresh` | Token の更新 |
| POST | `/api/v1/auth/logout` | Refresh Token の無効化 |
| GET | `/api/v1/auth/me` | 現在のユーザー、ロール、権限 |
| GET/POST | `/api/v1/users` | ユーザー一覧/作成 |
| GET/POST | `/api/v1/roles` | ロール一覧/作成 |
| GET | `/api/v1/permissions` | 権限一覧 |
| GET | `/api/v1/menus` | 現在のユーザーのメニュー |

Access Token は `Authorization: Bearer <token>` で送信します。Refresh Token は更新とログアウトにだけ使用します。

JWT Filter は `type=access` だけを認証し、Refresh Token を Resource Token として受け付けません。Spring Security は最初に一致した規則を使うため、公開 matcher は `anyRequest().authenticated()` より前に置きます。401 と 403 は共通 `ApiResponse` です。

`analytics:view` と `data:view` が経営データを保護します。`GET /api/v1/menus` は現在ユーザー自身の Navigation なので Login のみ、管理用 Tree/CRUD は `menu:*` を要求します。
