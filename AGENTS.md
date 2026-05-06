# Repository Guidelines

## Project Structure & Module Organization

This repository is a `pnpm` workspace monorepo.

- `apps/web`: React 19 + Vite frontend (`src/`, `public/`)
- `apps/api`: NestJS backend (`src/`, `test/`)
- `packages/shared`: shared TypeScript exports
- `packages/game-engine`: shared game-domain module
- `docs/`: product, API, database, and architecture notes
- `infra/docker`: Dockerfiles and `docker-compose.yml`

Keep cross-app types in `packages/shared`. Put backend-only domain logic in `packages/game-engine` instead of duplicating it in `apps/api`.

## Build, Test, and Development Commands

Run commands from the repository root unless a section says otherwise.

- `pnpm install`: install all workspace dependencies
- `pnpm dev`: run all workspace dev servers in parallel
- `pnpm --filter web dev`: start the Vite frontend only
- `pnpm --filter api dev`: start the NestJS API in watch mode
- `pnpm build`: build all workspaces
- `pnpm test`: run workspace tests
- `pnpm --filter api test:e2e`: run API end-to-end tests
- `pnpm lint`: run linting across workspaces
- `pnpm format` / `pnpm format:check`: apply or verify Prettier formatting

Do not run `npm install` or workspace-local installs inside `apps/*` or `packages/*`.

## Coding Style & Naming Conventions

TypeScript is the default across the repo. Prettier enforces `singleQuote: true`, `semi: false`, `trailingComma: all`, and `printWidth: 100`.

Use:

- `PascalCase` for React components and NestJS classes
- `camelCase` for variables and functions
- `kebab-case` for non-component filenames when no framework convention overrides it
- `*.spec.ts` for unit tests and `*.e2e-spec.ts` for API e2e tests

Use ESLint in both apps before opening a PR.

## Testing Guidelines

Current automated tests are concentrated in `apps/api` using Jest and Supertest. Keep unit tests beside source files in `apps/api/src`, and e2e tests in `apps/api/test`.

Add or update tests for behavior changes in controllers, services, and shared contracts. At minimum, run `pnpm test` and any impacted filtered test command before pushing.

## Commit & Pull Request Guidelines

Current history uses a scoped conventional style, for example: `init(setup): project structure`.

Follow `<type>(<scope>): <summary>` where possible, such as `feat(api): add match endpoint` or `fix(web): guard empty state`.

PRs should include:

- a short description of the change
- linked issue or task when available
- test notes (`pnpm test`, `pnpm lint`, filtered commands)
- screenshots for UI changes in `apps/web`
