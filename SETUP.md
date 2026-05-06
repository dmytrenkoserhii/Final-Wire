# Setup

## Requirements

- Node.js 20+
- pnpm 10+

## Install dependencies

Run only from repository root:

```bash
pnpm install
```

Do not run `npm install` or `pnpm install` inside `apps/*` or `packages/*`.

## Add new packages

Always add dependencies from repository root.

Add to `apps/web`:

```bash
pnpm add <package-name> -F web
```

Add to `apps/api`:

```bash
pnpm add <package-name> -F api
```

Add to `packages/shared`:

```bash
pnpm add <package-name> -F @final-wire/shared
```

Add dev dependency to a specific project:

```bash
pnpm add -D <package-name> -F <project-name>
```

Add dependency to all workspaces (rare):

```bash
pnpm -r add <package-name>
```

## Run projects

From repository root.

Run all projects in parallel:

```bash
pnpm dev
```

Run only API (NestJS):

```bash
pnpm --filter api dev
```

Run only Web (React/Vite):

```bash
pnpm --filter web dev
```

## Build

Build all:

```bash
pnpm build
```

Build only API:

```bash
pnpm --filter api build
```

Build only Web:

```bash
pnpm --filter web build
```

## Tests and lint

Run all tests:

```bash
pnpm test
```

Run all linters:

```bash
pnpm lint
```

Run API tests only:

```bash
pnpm --filter api test
```

## Notes

- One Git repository only at root.
- One primary `.gitignore` at root.
- `node_modules` is managed by pnpm workspace from root; do not manage it per app manually.
