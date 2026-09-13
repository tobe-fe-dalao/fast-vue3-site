# Enterprise domains

The Java service keeps enterprise features in vertical `module/<domain>/{api,service,persistence}` packages. Flyway `V9__enterprise_domains.sql` adds their tables and permissions; PostgreSQL stores business state, while Redis supports short-lived coordination. These routes use the [shared response contract](/en/server/api/contracts). The frontend client lives in `packages/effects/api/src/modules/enterprise.ts`.

## Tenant and organization

| Route | Purpose | Permission |
| --- | --- | --- |
| `GET /api/v1/tenants` | List tenants | `admin` role and `tenant:list` |
| `POST /api/v1/tenants` | Create a tenant and its administrator | `admin` role and `tenant:list` |
| `PUT /api/v1/tenants/{id}` | Update name, status, plan, or expiry | `admin` role and `tenant:list` |
| `GET /api/v1/organizations/current` | Read the current organization | `department:list` |
| `PUT /api/v1/organizations/{id}` | Update its name or status | `department:manage` |
| `GET /api/v1/departments` | Read the department tree | `department:list` |
| `GET /api/v1/departments/{id}/members` | Read department members | `department:list` |
| `POST /api/v1/departments` | Create a department | `department:manage` |
| `PUT /api/v1/departments/{id}` | Update a department | `department:manage` |
| `PUT /api/v1/departments/{id}/members/{userId}` | Assign a member | `department:manage` |
| `DELETE /api/v1/departments/{id}/members/{userId}` | Remove a member | `department:manage` |
| `DELETE /api/v1/departments/{id}` | Delete an eligible department | `department:manage` |

The signed access token supplies `tenantId`. MyBatis adds tenant predicates for protected tables, and services check business access as well. The bootstrap system administrator has an explicit cross-tenant path; ordinary tenant administrators do not. For anonymous `/api/v1/public/**` requests, `X-Tenant-Code` selects an active tenant and defaults to `default`. A missing, disabled, or expired tenant returns an error.

The Java login and registration requests accept an optional `tenantCode` (default `default`). The current frontend `LoginParams` and login forms do not expose that field, so the shipped UI signs in to the default tenant only. To test another tenant today, call the Java authentication API directly with `tenantCode`; frontend tenant switching requires a contract and UI change.

## Projects and tasks

| Route | Purpose | Permission |
| --- | --- | --- |
| `GET /api/v1/projects`, `GET /api/v1/projects/{id}` | List accessible projects or read one | `project:list` |
| `GET /api/v1/projects/{id}/activities` | Read project activity | `project:list` |
| `POST /api/v1/projects` | Create a project; requires `Idempotency-Key` | `project:create` |
| `PUT /api/v1/projects/{id}` | Update with a body `version` | `project:update` |
| `PUT /api/v1/projects/{id}/archive?version=N` | Archive a project | `project:update` |
| `PUT`, `DELETE /api/v1/projects/{id}/members/{userId}` | Add or remove a member | `project:update` |
| `GET`, `POST /api/v1/projects/{id}/tasks` | List or create tasks | `project:list` / `task:create` |
| `GET`, `PUT /api/v1/tasks/{id}` | Read or update a task; update needs `version` | `project:list` / `task:update` |
| `GET`, `POST /api/v1/tasks/{id}/comments` | Read or add comments | `project:list` |
| `GET /api/v1/tasks/{id}/activities` | Read field and status history | `project:list` |

The creator becomes project owner and member. Members can access their projects; an assignee must already be a project member. Archiving prevents new tasks and membership changes. A member with unfinished assigned tasks cannot be removed. Project and task writes record activity in the same transaction.

Task status follows `TODO → IN_PROGRESS → BLOCKED → IN_PROGRESS`, with `IN_PROGRESS → DONE`, and cancellation from `TODO`, `IN_PROGRESS`, or `BLOCKED`. `DONE` and `CANCELLED` are terminal. `priority` accepts `LOW`, `MEDIUM`, `HIGH`, or `URGENT`. Stale `version` values and illegal transitions return HTTP 409.

## Approvals, notifications, audit, and files

| Route | Purpose | Permission |
| --- | --- | --- |
| `GET`, `POST /api/v1/approvals` | List visible requests or create a draft | Authenticated / `approval:create` |
| `POST /api/v1/approvals/{id}/submit` | Submit with `Idempotency-Key` | `approval:create` |
| `POST /api/v1/approvals/{id}/approve`, `/reject` | Act on the pending step | `approval:action` |
| `POST /api/v1/approvals/{id}/cancel` | Cancel an owned draft or pending request | `approval:create` |
| `GET /api/v1/notifications`, `/unread-count` | Read personal notifications | Authenticated |
| `PUT /api/v1/notifications/{id}/read`, `/read-all` | Mark notifications read | Authenticated |
| `GET /api/v1/audit/operations` | Read operation metadata | `audit:view` |
| `POST /api/v1/files` | Upload multipart field `file` | `file:upload` |
| `GET /api/v1/files/{tenantId}/{filename}` | Download an authorized file | Authenticated |
| `DELETE /api/v1/files/{tenantId}/{filename}` | Delete a file | `file:upload` |

The reference approval flow is `DRAFT → PENDING → APPROVED` or `REJECTED`; the applicant can cancel a draft or pending request. Submission requires a department with a leader. The leader acts first, followed by an administrator. Notifications are created after the business transaction commits. The audit endpoint returns request metadata, separate from project and task activity; it does not expose request bodies. File storage uses tenant-specific local directories in this implementation.

`Idempotency-Key` is a Redis claim lasting 24 hours for project creation and approval submission. Reusing a key returns HTTP 409; it does **not** replay the first response. Use a new key for a distinct command. If a request may have completed before a network failure, read the resource before retrying.

## Frontend and mock scope

The `web-antd` application currently exposes project/task, approval, organization, tenant, audit, file, and notification screens. Other UI applications share the API package but do not automatically gain those screens. Nitro and the in-browser static preview use the in-memory `createStaticEnterpriseApi` fixture. They model routes and response shapes for development, not PostgreSQL transactions, Redis coordination, durable files, or full Java permission rules. Use [backend integration](/en/monorepo/backend-integration) when validating business behavior.
