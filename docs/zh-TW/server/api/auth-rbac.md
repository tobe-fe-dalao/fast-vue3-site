# 認證與 RBAC

`POST /auth/login` 發出 Access/Refresh Token；`/auth/refresh` 輪替 Token；`/auth/logout` 撤銷 Refresh Token；`GET /auth/me` 回傳目前使用者、角色與權限。

Access Token 以 `Authorization: Bearer <token>` 傳送。Refresh Token 不能當成 Access Token。Spring Security 依第一個 matcher 決定規則，因此公開白名單必須位於 `anyRequest().authenticated()` 之前。

`analytics:view` 與 `data:view` 保護經營資料；`GET /menus` 只需登入以取得自己的選單，而管理端 `/menus/tree` 與 CRUD 使用 `menu:*` 權限。
