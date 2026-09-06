# Build, checks, and deployment

Use the script for the selected UI mode, then run its production build. Keep the same mode in local verification and CI so aliases resolve consistently.

Run lint, type checking, tests, and production build before deployment. Configure the API base URL at build or deployment time, serve history fallback for client-side routes, and never ship development mock credentials or secrets.

