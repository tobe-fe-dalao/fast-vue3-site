# Admin data APIs

The following endpoints require authentication and supply replaceable data to the admin applications:

- `GET /api/v1/dashboard/stats`
- `GET /api/v1/analytics/overview`
- `GET /api/v1/data/overview`
- `GET /api/v1/log/login`, `/operation`, and `/error`
- `GET /api/v1/config/list`, `/dept/list`, `/dict/list`, and `/notice/list`
- `GET /api/v1/monitor/online` and `/monitor/server`

The current aggregate endpoints use deterministic demo data. Preserve their response types if the implementation moves to a database or monitoring platform.

`GET /api/v1/analytics/overview` requires `analytics:view`, and `GET /api/v1/data/overview` requires `data:view`. Migration `V8__analytics_permissions.sql` grants both permissions to the administrator role.
