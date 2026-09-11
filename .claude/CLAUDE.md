@../README.md

# portfolio

## This repo

A frontend portfolio showcasing a Senior Software Engineer's work, managed with pnpm. Two parallel implementations of the same site, SvelteKit (primary) and Next.js (secondary), share assets and config from the `shared` workspace package. One pnpm workspace with one lockfile spans both apps and the package; each app builds separately and deploys to its own Netlify site.

### Structure

```
/                     # Workspace root: orchestration scripts, shared tooling config
├── svelte/           # SvelteKit app (primary)
├── react/            # Next.js app (secondary)
├── packages/shared/  # shared: config, global styles, project images
└── .github/
    ├── actions/setup-pnpm-workspace/  # Composite action for CI setup
    └── workflows/                     # Parallel Svelte and React build/deploy/lighthouse jobs
```

`packages/shared` publishes nothing and builds nothing. Its `exports` map points at TypeScript source, CSS, and PNGs directly, so both apps compile it as part of their own build and an edit is picked up with no intermediate step.

### Quick commands

Run these from the root directory.

- Install everything: `pnpm i`
- Svelte dev server: `pnpm svelte`
- React dev server: `pnpm react`
- Build: `pnpm svelte:build`, `pnpm react:build`, or `pnpm build` for both
- Test: `pnpm test` (Vitest, in the Svelte app)
- Lint: `pnpm lint` (root config plus both apps)
- Type check: `pnpm check` (svelte-check in svelte, `tsc` in react)
- Lighthouse: `pnpm svelte:lighthouse`, `pnpm react:lighthouse`, or `pnpm lighthouse` for both

### Important project files

- `pnpm-workspace.yaml`: the workspace member list, build allowlist, and release-age hold
- `tsconfig.json` at the root covers `packages/shared`; each app has its own `tsconfig.json`
- `packages/shared/package.json`: the `exports` map, which decides what the apps can import
- `svelte/svelte.config.js`: static adapter, mdsvex for `.md` routes, `$components` alias
- `svelte/vite.config.ts`: enhanced images, Vitest (jsdom) config
- `react/next.config.ts`: static export and image optimization; `transpilePackages` must list `shared` because Next does not compile packages under `node_modules` by default
- `packages/shared/config/projects.ts` and `packages/shared/config/socialLinks.ts`: content driving both sites
- `packages/shared/global-styles/global.css`: CSS custom properties used by both apps
- `lighthouserc.yml`: Lighthouse CI thresholds for both sites

### Conventions

- A change to the site's content or appearance belongs in both apps unless the request says otherwise. Keep the two implementations at parity.
- The React app uses CSS modules (`<Component>.module.css`) next to each component. The Svelte app uses component-scoped `<style>` blocks. Both draw colors from the custom properties in `packages/shared/global-styles/global.css`.
- Never write summary documents unless explicitly asked.
- Don't start the dev server on your own if it's already running. Check if the dev already has it running first and use that if it is.

### Before considering a task complete

1. Run + fix any issues that come up, all from the root: `pnpm test`, `pnpm lint`, `pnpm check`.

@../node_modules/@aneuhold/robot-instructions/src/instructions/lang/typescript.md
@../node_modules/@aneuhold/robot-instructions/src/instructions/lang/css.md
@../node_modules/@aneuhold/robot-instructions/src/instructions/runtime/node.md
@../node_modules/@aneuhold/robot-instructions/src/instructions/framework/svelte.md
@../node_modules/@aneuhold/robot-instructions/src/instructions/framework/sveltekit.md
@../node_modules/@aneuhold/robot-instructions/src/instructions/tooling/vitest.md
