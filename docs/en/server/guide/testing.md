# Testing

```bash
./mvnw test
./mvnw clean verify
```

The suite has three layers:

1. service tests verify authentication and business rules;
2. `@WebMvcTest` verifies JSON contracts, validation, public allowlists, and 401/403 responses;
3. Testcontainers tests verify migrations and persistence with PostgreSQL and Redis when Docker is available.

Every endpoint should have a success case and an error or authentication case. `PortalControllerWebTest` covers anonymous content reads. `SiteInteractionControllerWebTest` proves that comments are publicly readable while comment creation and checkout require authentication.

For an end-to-end smoke test, start the Compose `app` profile, call a public endpoint without a token, assert a protected write returns 401, sign in, and retry with `Authorization: Bearer <accessToken>`.

For enterprise changes, run `clean verify` after the final edit. `TenantIsolationIntegrationTest` checks cross-tenant reads with PostgreSQL; `ProjectServiceTest`, `TaskStateTransitionTest`, `TaskOptimisticLockTest`, `ApprovalWorkflowTest`, `IdempotencyTest`, and `SecurityAccessTest` cover separate business and security rules. A documentation build checks links and rendering, not Java or frontend package behavior.
