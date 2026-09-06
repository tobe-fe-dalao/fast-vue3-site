# Troubleshooting

## Cannot GET /

Confirm the selected dev script and Vite base, then open the exact URL printed by Vite.

## Styles differ between modes

Check alias resolution, provider order, and UI-specific style imports. Clear Vite's cache after changing modes.

## Dark page with light components

Map semantic theme preferences into the selected component provider; CSS background variables alone cannot restyle library internals.

## Login redirects after failure or returns HTML

Verify the API proxy, response content type, success code, and that navigation occurs only after tokens are stored.

