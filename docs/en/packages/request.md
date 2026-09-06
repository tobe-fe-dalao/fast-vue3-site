# @fast-vue3/request

`createHttpClient` creates the Axios instance, attaches the stored Bearer token, and normalizes HTTP failures. `createRequest` exposes typed `get`, `post`, `put`, and `del` helpers and unwraps the common `{ code, message, data }` envelope.

Applications create one client using `VITE_APP_API_BASEURL` (normally `/api/v1`) and pass it to `createApi`. Keep transport behavior here and business endpoint paths in `@fast-vue3/api`.

