# Single application

Application logic follows Views → Store → API → HTTP. config/ui.ts provides a shared UI registry; Vite aliases select setup, theme provider, login form and showcase modules. The all mode composes seven showcases and uses Element Plus for login.

The application owns --fv-* design tokens and responsive layout. Ant Design/Naive/iDux use theme providers; Element Plus/Arco/TDesign use their theme selectors; DevUI uses its theme service. This keeps application styling independent of library resets.

Run pnpm check and build the selected UI mode. Also check desktop/mobile, light/dark and keyboard interaction. Mock only runs in development at /api/user/*.

[UI / Theme details](/en/polyrepo/ui-theme) · [HTTP / Mock](/en/polyrepo/http-mock)
