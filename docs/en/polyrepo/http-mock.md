# Requests, mock data, and login

Business requests use one response convention: successful data is unwrapped from `{ code, message, data }`, and HTTP or business failures become readable exceptions. The login flow stores tokens only after a successful response.

Development mock handlers must match the real method, path, envelope, and error status. To connect a real backend, update the API base/proxy configuration rather than page code, then verify login, token headers, 401 handling, and at least one protected resource.

