# Authentication and RBAC

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/v1/auth/login` | Issue access and refresh tokens |
| POST | `/api/v1/auth/register` | Register without a Bearer token |
| POST | `/api/v1/auth/refresh` | Rotate tokens |
| POST | `/api/v1/auth/logout` | Revoke a refresh token |
| GET | `/api/v1/auth/me` | Current user, roles, and permissions |
| GET/POST | `/api/v1/users` | List/create users |
| GET/PUT/DELETE | `/api/v1/users/{id}` | Read/update/delete a user |
| GET/POST | `/api/v1/roles` | List/create roles |
| GET/PUT/DELETE | `/api/v1/roles/{id}` | Read/update/delete a role |
| GET | `/api/v1/permissions` | Permission catalog |
| GET | `/api/v1/menus` | Current user's menu tree |

Send access tokens as `Authorization: Bearer <token>`. Refresh tokens are only for refresh and logout operations.

The JWT filter explicitly accepts only claims with `type=access`; a refresh token cannot authenticate a resource request. Spring Security uses the first matching authorization rule, so public matchers remain before `anyRequest().authenticated()`. Authentication and access-denied handlers return the same API envelope for HTTP 401 and 403.

`analytics:view` and `data:view` protect operating-data endpoints. `GET /api/v1/menus` intentionally requires login but no management permission because it returns the current user's own navigation; `/menus/tree` and menu CRUD use `menu:*`.
