# Overall Project Guidelines

- Frontend portfolio showcasing a Senior Software Engineer's work
- TypeScript monorepo with pnpm workspace management
- Two parallel implementations: SvelteKit and Next.js (React)
- Shared assets/config in `/shared/`, copied to both projects via `pnpm copy-shared-files`
- Tests: Vitest - always use Vitest extension, not terminal
- CI/CD: Parallel GitHub Actions jobs for Svelte and React with Netlify deployments
- Avoid code duplication; reuse existing code when possible
- Never write summary documents unless explicitly asked

## Project Structure

```
/                       # Root workspace
├── svelte/            # SvelteKit app (primary)
├── react/             # Next.js app (secondary)
├── shared/            # Shared config, styles, images
└── .github/
    ├── actions/setup-pnpm-workspace/  # Composite action for CI setup
    └── workflows/pull-request.yml     # Parallel build/deploy jobs/lighthouse checks
```

## Build System

- Root scripts orchestrate both projects (`pnpm svelte:build`, `pnpm react:build`)
- Shared files must be copied before builds via `pnpm copy-shared-files`
- GitHub Actions: Svelte and React jobs run in parallel with build caching
- Vite cache (Svelte) and Next.js cache preserved between CI runs

# Code Style (TypeScript)

## Types & Functions

- Add explicit types when unclear; extract complex object types to separate `type` declarations
- Use PascalCase for type names; file names should match the primary exported type
- Use arrow functions and `const`/`let` (never `var`)
- Use `async`/`await` instead of `.then()`

## Documentation & Naming

- Add JSDoc for all methods, functions, and classes (include `@param`, omit `@returns`)
- Add JSDoc for public class properties only if complex
- Never prefix functions/methods with underscores

## Class Structure

- Order methods by visibility: public, protected, private
- Within same visibility, order doesn't matter

## File Organization

### Imports

- Use named imports only (never `import * as`)
- Import at file top (inline only when absolutely necessary)

### Enums

- Use PascalCase for enum names and values
- Use TypeScript `enum` (not `const enum` or `type`)
