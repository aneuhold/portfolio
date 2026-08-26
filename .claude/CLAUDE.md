@../README.md

# portfolio

## This repo

A frontend portfolio showcasing a Senior Software Engineer's work, managed with pnpm. Two parallel implementations of the same site, SvelteKit (primary) and Next.js (secondary), share assets and config from `shared/`. Each app has its own `package.json` and lockfile and deploys to its own Netlify site.

### Structure

```
/                # Root workspace: orchestration scripts, shared tooling config
├── svelte/      # SvelteKit app (primary)
├── react/       # Next.js app (secondary)
├── shared/      # Config, global styles, project images
└── .github/
    ├── actions/setup-pnpm-workspace/  # Composite action for CI setup
    └── workflows/                     # Parallel Svelte and React build/deploy/lighthouse jobs
```

`shared/` is copied into each app by `pnpm copy-shared-files`, which every build and test script runs first. The copies (`svelte/shared`, `react/shared`) are gitignored. Edit `shared/` at the root, never the copies. Reference it from Svelte through the `$shared` alias.

### Quick commands

Run these from the root directory.

- Install everything: `pnpm i` (root, react, and svelte)
- Svelte dev server: `pnpm svelte` (watches `shared/` alongside `vite dev`)
- React dev server: `pnpm react`
- Build: `pnpm svelte:build`, `pnpm react:build`, or `pnpm build` for both
- Test: `pnpm test` (Vitest, in the Svelte app)
- Lighthouse: `pnpm svelte:lighthouse`, `pnpm react:lighthouse`, or `pnpm lighthouse` for both

Lint and type checks live in the apps: `pnpm lint` in either app, `pnpm check` (svelte-check) in `svelte`.

### Important project files

- `svelte/svelte.config.js`: static adapter, mdsvex for `.md` routes, aliases (`$shared`, `$components`)
- `svelte/vite.config.ts`: enhanced images, Vitest (jsdom) config
- `react/next.config.ts` and `react/export-images.config.js`: static export and image optimization
- `shared/config/projects.ts` and `shared/config/socialLinks.ts`: content driving both sites
- `shared/global-styles/global.css`: CSS custom properties used by both apps
- `lighthouserc.yml`: Lighthouse CI thresholds for both sites

### Conventions

- A change to the site's content or appearance belongs in both apps unless the request says otherwise. Keep the two implementations at parity.
- The React app uses CSS modules (`<Component>.module.css`) next to each component. The Svelte app uses component-scoped `<style>` blocks. Both draw colors from the custom properties in `shared/global-styles/global.css`.
- Never write summary documents unless explicitly asked.

### Before considering a task complete

1. Run + fix any issues that come up: `pnpm test` at the root, then `pnpm lint` and `pnpm check` in `svelte`, and `pnpm lint` in `react`.

@../node_modules/@aneuhold/robot-instructions/src/instructions/lang/typescript.md
@../node_modules/@aneuhold/robot-instructions/src/instructions/lang/css.md
@../node_modules/@aneuhold/robot-instructions/src/instructions/runtime/node.md
@../node_modules/@aneuhold/robot-instructions/src/instructions/framework/svelte.md
@../node_modules/@aneuhold/robot-instructions/src/instructions/framework/sveltekit.md
@../node_modules/@aneuhold/robot-instructions/src/instructions/tooling/vitest.md
