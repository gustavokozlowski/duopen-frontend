# Project Agent Notes

## Scope

This workspace is a Bun + React 19 app with a Bun server and a React SPA.

## Commands

- Install deps: `bun install` (see [README.md](README.md))
- Dev server with HMR: `bun dev` (see [package.json](package.json))
- Build: `bun build ./src/index.html --outdir=dist ...` (see [package.json](package.json))
- Prod start: `bun start` (see [package.json](package.json))

## Entry Points

- Bun server routes: [src/index.ts](src/index.ts)
- HTML shell: [src/index.html](src/index.html)
- React app entry: [src/frontend.tsx](src/frontend.tsx)
- Root component: [src/App.tsx](src/App.tsx)

## Conventions And Notes

- Client env vars must be prefixed with `BUN_PUBLIC_` (see [bunfig.toml](bunfig.toml)).
- TypeScript path alias `@/*` maps to `./src/*` (see [tsconfig.json](tsconfig.json)).
- HMR uses `import.meta.hot` in the React entry; preserve this when editing [src/frontend.tsx](src/frontend.tsx).
- API routes are declared in the Bun `serve` `routes` map in [src/index.ts](src/index.ts).
- Styling is global in [src/index.css](src/index.css); no CSS modules are used yet.

## Tests

- No tests configured. Ask before adding a new test framework or scripts.
