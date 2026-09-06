# Polyrepo module boundaries

Polyrepo is one independently deployable Vue application. Build-time aliases select the UI component, login, and theme adapters while business views, router, stores, and requests remain stable.

The entry initializes styles, the selected UI provider, Pinia, router, and application mount in that order. File-based routing generates the route table. Request types should describe the backend contract and must not depend on the selected component library.

