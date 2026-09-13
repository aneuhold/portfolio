# React Timeline Overhaul Plan

Brings the Svelte redesign to the React app: the timeline that replaces the project grid, and the style updates to the hero, social links, and text buttons. Component names, markup, and CSS values carry over one-to-one from `svelte/src/components/`, so this plan covers only the places where React and Next.js need a different approach.

## Where the React port differs

### Scoped styles become CSS modules

Next 16 builds CSS modules with Turbopack, which runs them through Lightning CSS and supports nesting ([Turbopack: CSS and styling](https://nextjs.org/docs/app/api-reference/turbopack#css-and-styling)). The Svelte `<style>` blocks carry over nearly as written: running the workspace's Lightning CSS 1.33.0 over the timeline styles flattened the nesting and left `oklch(from …)`, `color-mix()`, `round()`, gradient hue interpolation, and range media queries untouched. Five things change.

1. **Most `:global()` wrappers go away.** CSS modules rename only class and id selectors ([Lightning CSS: CSS modules](https://lightningcss.dev/css-modules.html)), so `*`, `[data-item]`, and `[data-year]` are written plainly. Turbopack turns off grid name scoping (`grid: false` in [`process.rs`](https://github.com/vercel/next.js/blob/v16.3.3/turbopack/crates/turbopack-css/src/process.rs)), so the overview's `years`, `eras`, and `lane` lines work unchanged. Where `:global` is still needed, only the function form `:global(...)` is supported ([Turbopack: unsupported features](https://nextjs.org/docs/app/api-reference/turbopack#unsupported-and-unplanned-features)).
2. **Selectors must be pure.** Turbopack fails the build on a selector with no local class or id ("Pure selectors must contain at least one local class or id", `CssValidator` in the same `process.rs`). Lightning CSS parses a nested `h2` as `& h2`, which passes, but the top-level `h2` in `EraCard.svelte` and `h3` in `ProjectCardContent.svelte` move inside the component's own class. The global type classes `TimelineDates.svelte` selects (`.header-3`, `.caption-tabular`) are compounded with a local class, as in `.timelineDates:global(.header-3)`.
3. **Class names are camelCase**, because they are read as `styles.name`. `timeline-dates` becomes `timelineDates`.
4. **Classes from another component go through `composes`.** `composes` is the CSS modules property that makes one class apply another whenever it is used: the name the module exports for the class carries both hashed classes, so the element gets both. With `from`, the other class comes from a different file ([Lightning CSS: Class composition](https://lightningcss.dev/css-modules.html#class-composition), [Dependencies](https://lightningcss.dev/css-modules.html#dependencies)). `Timeline.svelte` styles the `.card` and `.compactProject` of `EraCard` and `ProjectCard` through `:global()`, but each CSS module hashes its own class names. The `.card` rule in `EraCard.module.css`, and the `.card` and `.compactProject` rules in `ProjectCard.module.css`, each compose the same-named class from `Timeline.module.css`, so the selectors in `Timeline.module.css` stay as the Svelte file has them. Turbopack supports composing from another `.module.css`; only composing a plain `.css` file is unsupported (same Turbopack link as above).
5. **The universal rule in `Timeline` drops its specificity.** `.timeline :global(*)` declares `--rail-color` on every element with the same specificity as the `.card` and `.compactProject` rules that override it, so which one applies depends on stylesheet order. Turbopack orders CSS modules by JS import order ([Turbopack: CSS Module Ordering](https://nextjs.org/docs/app/api-reference/turbopack#css-module-ordering)), and the React components import their stylesheet after their children. `Timeline.module.css` writes the rule as `:where(.timeline) *`, so a component's own class overrides it in any order.

### Per-item custom properties need a type

Svelte's `style:--row={placement.row}` becomes `style={{ '--row': placement.row }}`, which React's `CSSProperties` rejects: it has no index signature. The doc comment on `CSSProperties` in `@types/react` says to add one through a type assertion or module augmentation, and links to [csstype: What should I do when I get type errors?](https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors), which recommends module augmentation with a `--${string}` index signature. `as` is off-limits, so this uses module augmentation.

- **Which module.** The csstype README augments `csstype`, but TypeScript resolves an augmented module's name the same way it resolves an import ([TypeScript: Module Augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)). Neither `react/node_modules` nor the root `node_modules` has `csstype`, because pnpm installs it only as a dependency of `@types/react`. The augmentation therefore targets `CSSProperties` in `react`, which the same comment allows, and types the values `string | number` rather than the README's `any`.
- **Which file.** Next says to put custom type declarations in a new `.d.ts` file rather than the generated `next-env.d.ts`, included from `tsconfig.json` ([Next.js: Custom type declarations](https://nextjs.org/docs/app/api-reference/config/typescript#custom-type-declarations)). The new file is `react/app/app.d.ts`, named after `svelte/src/app.d.ts`, and the existing `**/*.ts` entry in `react/tsconfig.json`'s `include` already covers it.

### `TimelineDatesSize` moves into `shared`

`TimelineDates.svelte` declares the enum in its module script. Exported beside the component from `TimelineDates.tsx`, it fails `react-refresh/only-export-components`, which the React config in `@aneuhold/eslint-config` turns on and which reports an exported enum as a non-component export (read in `eslint-plugin-react-refresh`'s source). It moves to `packages/shared/types/TimelineDatesSize.ts` next to `TextColor.ts`, so both apps import one copy.

### Thumbnails size themselves

`Project.tsx` fills a padded `.media` box using `ExportedImage`'s `fill`. `ProjectCardThumbnail.tsx` drops both and puts the `.thumbnail` class on the image, which sizes it through `inline-size`, `block-size: auto`, and `aspect-ratio`, as `enhanced:img` does in Svelte. `preload` and `loading` carry over from `Project.tsx`: `Timeline.tsx` passes `preload` to the first four project cards, the same count `Projects.tsx` preloads today, and `ProjectCard.tsx` hands it to the thumbnail. `react/app/lib/projectImages.ts` already has the same keys as the Svelte map.

## Steps

### 1. Move `TimelineDatesSize` into `shared`

- New `packages/shared/types/TimelineDatesSize.ts`, holding the enum and its doc comment from `TimelineDates.svelte`. Export it from `packages/shared/index.ts`.
- `TimelineDates.svelte` drops its module script, and it and `EraCard.svelte` import the enum from `shared`.
- `TimelineDates.svelte` holds the only enum declared in a Svelte file, and `svelte.config.js` enables `vitePreprocess({ script: true })` with a comment naming an enum as the reason. Remove the preprocessor if `pnpm check`, `pnpm test`, and `pnpm svelte:build` pass without it.

### 2. Move `--hairline` into `global.css`

- `packages/shared/global-styles/global.css` declares `--hairline` in `:root` beside the other colors, with its comment from `Timeline.svelte`. It is a theme color rather than a timeline measurement, and `global.css` is the only place `--color-text-primary` is defined, so it resolves to the same value at `:root`.
- `Timeline.svelte` drops its declaration, and `Timeline.module.css` doesn't have one.

### 3. Type custom properties in `style`

- New `react/app/app.d.ts` with the `CSSProperties` augmentation.
- The comment at the top of the file says why the file exists, so the reason is clear wherever it is read: it quotes the `CSSProperties` doc comment's advice to use module augmentation, links [csstype: What should I do when I get type errors?](https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors) and [Next.js: Custom type declarations](https://nextjs.org/docs/app/api-reference/config/typescript#custom-type-declarations), and says it augments `react` because `csstype` doesn't resolve from the app.

### 4. Port the timeline components

`react/app/components/Timeline/` mirrors `svelte/src/components/Timeline/` file for file, each `.tsx` with a `.module.css` beside it: `Timeline`, `TimelineOverview`, `TimelineDates`, `EraCard`, `EraRail`, `ProjectRail`, and `ProjectCard/` with `ProjectCard`, `ProjectCardThumbnail`, `ProjectCardContent`, and `ProjectCardActions`.

- The CSS follows the five rules above.
- `Timeline.tsx` replaces Svelte's `onMount` with `useEffect`, returning the cleanup `timelineLiftService.attach` gives back. A component that calls `useEffect` needs `'use client'` even in a static export ([Next.js: Static exports, Browser APIs](https://nextjs.org/docs/app/guides/static-exports#browser-apis)). `useGSAP` isn't used, because the service already creates and reverts its own `gsap.context`.
- `class:` directives become template literals, as in the existing React components.
- Every component rendered into `.grid` returns its elements with no wrapper, using a fragment where there are several. Each rail, node, and card is placed on `.grid` directly and styled by sibling selectors such as `.compactProject + .compactProject`.
- Each `@component` comment becomes the component's JSDoc.

### 5. Swap the page over

- `react/app/page.tsx` renders `Timeline` in place of `Projects`.
- Delete `react/app/components/Projects/`, `CardGrid.tsx`, and `AnimatedBorderBackground.tsx`, with their CSS modules. `Project.tsx` is the only user of `AnimatedBorderBackground`.

### 6. Port the smaller style changes

- `Hero.module.css`: the hero's block margin and the social links row's top margin from `Hero.svelte`. React renders the social links inside `Hero.tsx` rather than through a `SocialLink` component, so `.svgLink` takes the transitions and `--shadow-raised` hover from `SocialLink.svelte`.
- `TextButton.module.css`: the border, padding, radius, transitions, and hover from `TextButton.svelte`.

## Validation

From the repo root:

1. `pnpm test`, `pnpm lint`, `pnpm check`.
2. `pnpm react:build`. Turbopack reports impure selectors and unresolved `composes` here.
3. Compare the React dev server (port 3000) with the Svelte one (port 3020) at 1440px and 390px, using servers already running where there are any:
   - At 48rem and wider: rails, corners, nodes, year labels, the "now" line, and the hover lift.
   - Below 48rem: the pinned overview, its links jumping to cards, and the lift following scroll.
   - Era cards and dated rows glow in their era's color rather than a lane's, which confirms the `:where()` rule.
   - No horizontal scrolling at either width.
4. `pnpm react:lighthouse`, since the page's layout and images change.
