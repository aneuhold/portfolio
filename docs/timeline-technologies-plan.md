# Timeline Technologies Plan

Brings the layer badges from the `/ideas` route onto the timeline's era and project cards: each item's technologies, grouped by layer, in one split badge per layer under the summary. Svelte only. The ideas route and its components are removed once the badges are on the real cards.

## Design

### Technology data moves into `shared`

`packages/shared/config/eras.ts` and `projects.ts` hold the site's content, so the data they reference sits beside them. `svelte/src/components/Ideas/technologies.ts` moves to `packages/shared/config/technologies.ts`.

- It keeps `Technology`, `TechnologyLayer`, `TechnologyGroup`, `technologies`, and the unexported `TechnologyInfo`.
- It drops `TechnologyPillsProps`; `exampleStacks`, whose two stacks move into `secondNature` and `mesoPro`; and `brandColor`, which the layer badges never read.
- `svgIconPath` becomes optional (see "Logos Simple Icons doesn't carry").
- `TimelineItemBase` gains a required `technologyGroups: TechnologyGroup[]`, since eras and projects both carry one. Its type-only import from `../config/technologies` is the first import in `types/` that points at `config/`, but it adds no runtime cycle, and it keeps the group type beside the enums it references.
- `packages/shared/index.ts` exports `technologies` and the `TechnologyGroup` type, the two things the Svelte component reads.

### One component renders the badges on both cards

`svelte/src/components/Ideas/Pills/LayerBadges.svelte` becomes `svelte/src/components/Timeline/TimelineTechnologies.svelte`, named like `TimelineDates.svelte`, the other component that renders a `TimelineItemBase` field on both kinds of card.

- Props are `technologyGroups` and `onDarkGround`. The outline and text already follow the surrounding text color, so `onDarkGround` only swaps the layer cap's tint. `EraCard` passes it the way it passes `color={TextColor.Inherit}` to `TimelineDates`.
- The logo `<svg>` from `TechnologyLogo.svelte` is inlined, the way `SocialLink.svelte` draws its icon, and `--logo-size` and `--logo-color` give way to plain rules in the component.
- The markup and CSS otherwise carry over unchanged.

### Placement

Both cards put the badges under the summary, in a `.technologies` wrapper that shares the grid placement of `.info`. This follows the way `EraCard` wraps `TimelineDates` in `.tenure` to place it.

- `EraCard.svelte`: the wrapper comes right after `.info` and joins the `.info, .runningAtStart` rule. "Still running from before" stays last.
- `ProjectCardContent.svelte`: the wrapper comes right after `.info` inside `.cardText` and joins `.info`'s `grid-column: 1 / -1`. The links stay pinned below.
- `Timeline.svelte` fades each card's direct children while another item is hovered, which already covers both wrappers.
- Dated rows (single-date projects) don't render `ProjectCardContent`, so they show no badges. See the open questions.

### Logos Simple Icons doesn't carry

Simple Icons 16.30.0 has no logo for C#, Azure, Java, or Sveltia CMS (checked against its data file). Its MUI logo belongs to the React library, not Svelte Material UI. C# and Azure are named in The Predictive Index's summary, so they can't simply be left out. With `svgIconPath` optional, the component draws a logo only when there is one, and these technologies show their name alone.

## Draft stacks

Drafted from each item's summary and, where the repo is public or local, its manifests. Confirm or correct these before step 2. The layers are Frontend, Backend, Mobile, Platform, Tooling, and Language.

| Item | Layers | Drawn from |
|------|--------|------------|
| Second Nature | Frontend: Next.js, React; Backend: NestJS, GraphQL, Prisma; Language: TypeScript | Summary |
| The Predictive Index | Frontend: Angular, TypeScript; Backend: C#, Azure | Summary |
| Arizona State University | Language: Java, Python, Swift, TypeScript; Frontend: React, Vue.js | Guessed from the projects dated within it |
| SEO-First Serverless Website | Frontend: Astro, Svelte; Backend: Cloudflare Workers; Platform: Cloudflare Pages, Sveltia CMS | Summary, `aurora-colony-pub` |
| MesoPro | Frontend: SvelteKit, TypeScript; Mobile: Capacitor, Android; Backend: NestJS, MongoDB, Google Cloud | Summary, `workout`, `gcloud-backend`, `be-ts-db-lib` |
| Tiddly Drive 2 | Frontend: SvelteKit, TypeScript; Backend: Netlify Functions; Platform: Google Drive | `tiddlydrive` |
| Local NPM Registry | Tooling: Verdaccio, Node.js, TypeScript | Summary, `ts-libs` |
| Personal Dashboard | Frontend: SvelteKit, Svelte Material UI, TypeScript; Backend: NestJS, MongoDB, Google Cloud | Summary, `dashboard`, `gcloud-backend` |
| Personal TypeScript Libraries | Language: TypeScript; Platform: npm, JSR | Summary |
| Main Scripts | Tooling: Node.js, TypeScript | `main-scripts` |
| HaloMod SPA | Frontend: Vue.js; Backend: Python, Flask | `TheHaloMod-SPA` |
| PointSpire | Frontend: React, TypeScript, Material UI; Backend: Node.js, Express, MongoDB | Summary, `PointSpire` |
| Carpet Geeks Example Website | Frontend: Next.js, React, TypeScript; Platform: Netlify | `carpet-geeks`, demo URL |
| Next.js Invoices App (dated row) | Frontend: Next.js, React; Backend: PostgreSQL, Neon; Platform: Vercel | Summary |
| React Drum Machine, React Calculator, React Pomodoro Clock (dated rows) | Frontend: React | Summaries |
| MongoDB Exercise Tracker, URL Shortener (dated rows) | Backend: Node.js, Express, MongoDB | Summaries |
| Places Android App (dated row) | Mobile: Android; Language: Java | Repo languages |
| Places iOS App (dated row) | Mobile: iOS; Language: Swift | Repo languages |
| BattleShip (dated row) | Language: Java | Summary |
| BlackJack (dated row) | Language: Python | Summary |

## Steps

### 1. Move the technology data into `shared`

- Move `svelte/src/components/Ideas/technologies.ts` to `packages/shared/config/technologies.ts` with the changes above. Add every technology the confirmed stacks need, taking each logo's path from Simple Icons like the existing entries do, and extend `TechnologyLayer` to the confirmed layers.
- `packages/shared/types/TimelineItemBase.ts`: add `technologyGroups`.
- `packages/shared/index.ts`: export `technologies` and `TechnologyGroup`.

### 2. Give every era and project its stack

- `packages/shared/config/eras.ts` and `packages/shared/config/projects.ts`: add `technologyGroups` to every entry, from the confirmed table.

### 3. Render the badges on the cards

- Move `svelte/src/components/Ideas/Pills/LayerBadges.svelte` to `svelte/src/components/Timeline/TimelineTechnologies.svelte` with the changes above.
- `EraCard.svelte` and `ProjectCardContent.svelte`: render it as described under "Placement", with `EraCard` passing `onDarkGround`.

### 4. Remove the ideas route

- Delete `svelte/src/routes/ideas/` and what remains of `svelte/src/components/Ideas/`.

## Validation

From the repo root:

1. `pnpm test`, `pnpm lint`, `pnpm check`. `pnpm check` also type-checks React, which reads `projects` but doesn't render the new field.
2. `pnpm svelte:build`, to confirm the static adapter still prerenders every route with `/ideas` gone.
3. On the Svelte dev server (port 3020, reusing it if it's already running), at 1440px and 400px:
   - Every era and project card has its badges under the summary, wrapping cleanly, with C# and Azure shown by name alone.
   - Year labels, nodes, and connectors still line up with each card's name.
   - Hovering an item fades the other cards' badges along with the rest of their content.
   - Below 48rem, the overview's links still bring each card to the focus line.
   - No horizontal scrolling at either width.
4. `pnpm svelte:lighthouse`. Every card now carries inline logo paths, and the `technologies` data ships in the page's JavaScript, so check the `resource-summary` size budgets in `lighthouserc.yml`.

## Open questions

- Should dated rows show badges too? This plan fills in their data but leaves the rows as they are.
- Name-only entries for C#, Azure, Java, Sveltia CMS, and Svelte Material UI, or source official logos for some of them?
- The draft stacks and the six layer names.
