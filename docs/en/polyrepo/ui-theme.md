# UI modes and theme compatibility

Each mode has four build-time adapters: component exports, provider setup, login presentation, and theme mapping. Business views should import the stable alias instead of a library package directly.

Use semantic tokens for surface, text, border, primary, success, warning, and danger colors. Keep reset and layout rules shared; scope library overrides to their adapter. When adding a framework, implement all four adapters, add its dev/build scripts, and verify light, dark, mobile, forms, overlays, and authentication.

