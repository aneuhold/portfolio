# Timeline Prototype Promotion Plan

Replaces the Svelte home page's timeline with the prototype in `svelte/src/routes/ideas/`, under the current component, service, and type names, then deletes the prototype route.

> **React is out of scope.** This plan makes no React changes. If the React app fails any build, lint, or type-check step because of these changes, ignore it.

## What the prototype does

- At 48rem and wider, the timeline is drawn like `git log --graph`. Each era card sits above the projects started during it, with a rail running down the left to the next era. Each project card sits on the row where the project started, with a rail running up its lane to the row where it ended, or to "now".
- Below 48rem, the rails, year labels, and "now" line are hidden, the cards take the full width, and a to-scale overview of the whole career is pinned above them. Each mark in it links to its card.
- Both widths render the same cards in the same order. There are no hover effects.

## Terms

Each term means one thing throughout the code, and is defined in exactly one place: the doc comment on the type where the term first appears, shown in parentheses below. Every other comment that uses a term relies on that definition instead of restating it. Corner and node have no type, so both are defined once in `Timeline.svelte`, in the comment on the measurements that size them.

- **Row** (`TimelinePlacement.row`): one slot of the timeline grid, holding one era card, project card, or dated row.
- **Grid line** (`MonthGridLineRange`): a numbered boundary between grid tracks, which is what `grid-row` and `grid-column` place items by ([MDN: Grid lines](https://developer.mozilla.org/en-US/docs/Glossary/Grid_Lines)). Names for them say `gridLine` in full. The code uses two kinds:
  - **Row grid line** (`TimelinePlacement.railGridLine`): a grid line between rows of the timeline grid. `railGridLine` is the row grid line a rail reaches.
  - **Month grid line** (`MonthGridLineRange`): a grid line between month columns. Line 1 opens the first month column, line 2 the second, and so on. The overview places its era bars and project marks by month grid lines, and the timeline orders its rows by them.
- **Month columns** (`MonthGridLineRange`): the overview's columns, one per month from the month of the earliest `startDate` of any era or project through the current month, read from `new Date()` when `TimelineDates.service.ts` loads. As of September 2026 there are 115, from March 2017, when Arizona State University starts, through September 2026.
- **Rail** (`TimelinePlacement.railGridLine`): a drawn vertical bar. An era rail runs down from an era card to the next era's card. A project rail runs up its lane from a project card to the row where the project ended, or to the top while it is still running.
- **Lane** (`TimelinePlacement.lane`): a grid track holding project ranges that never overlap, so no two rails or marks in it collide. In the timeline it is a narrow column between the era rail and the cards; in the overview it is a row.
- **Corner** (`Timeline.svelte`): the rounded turn on a project card's row where its rail leaves the lane and meets the era rail.
- **Node** (`Timeline.svelte`): the circle where a card meets its rail.

## Naming

The current names cover everything except the pinned overview and the date math, which each get a file.

| Now | Becomes |
|---|---|
| `IdeaTimeline.svelte` + `BranchGraph.svelte` | `svelte/src/components/Timeline/Timeline.svelte` |
| `BranchGraphEra.svelte` | `svelte/src/components/Timeline/EraCard.svelte` |
| `BranchGraphProject.svelte` | `svelte/src/components/Timeline/ProjectCard/ProjectCard.svelte` |
| `GaugeStrip.svelte` | `svelte/src/components/Timeline/TimelineOverview.svelte` |
| Date math in `IdeaTimeline.service.ts` and `Timeline.service.ts` | `packages/shared/services/TimelineDates.service.ts` (`timelineDatesService`) |
| Ordering and lanes in `BranchGraph.service.ts` and `IdeaTimeline.service.ts` | `packages/shared/services/Timeline.service.ts` (`timelineService`) |
| `BranchPlacement` | `TimelinePlacement` |
| `BranchGraphRow` | `TimelineEntry` |
| `TimelinePlacement.railLine`, `--rail-line` | `TimelinePlacement.railGridLine`, `--rail-grid-line` |
| `span`, `MonthSpan` | `monthGridLineRange`, `MonthGridLineRange` |
| `axisMonths`, `--months` | `monthColumnCount`, `--month-columns` |
| `yearLines`, `YearLine` and its `line` | `yearStartGridLines`, `YearStartGridLine` and its `gridLine` |
| `assignLanes` | `assignLanesByOverlap` |
| `projectsCarriedInto` | `projectsRunningAtStart` |
| `timelineService.isCompact` | `timelineDatesService.isSingleDate` |
| `#sortKey` | `#cardMonthGridLine` |
| `#monthIndex` | `#monthsSinceYearZero` |
| `.trunk` (era), `.branch` (project) | `.rail` in `EraCard` and `ProjectCard` |
| `.elbow` | `.corner` |
| `.gaugeStrip` | `.overview` |
| `--trunk-width`, `--branch-width`, `--branch-color` | `--era-rail-width`, `--project-rail-width`, `--rail-color` |
| `--elbow-drop` | `--corner-drop` |

`TimelineOverview` and `TimelineDates.service.ts` follow the existing `TimelineDates` component's naming, and "overview" is not used anywhere in the repo.

## Steps

### 1. Move the date math into `TimelineDates.service.ts`

New file `packages/shared/services/TimelineDates.service.ts`, exporting `timelineDatesService` the way `Timeline.service.ts` exports `timelineService`. It holds everything that turns dates into months, month grid lines, or text, and nothing about rows, lanes, or which era a project belongs to. The one piece of timeline data it reads is the earliest start date in `eras` and `projects`, which opens the first month column.

- From `Timeline.service.ts`: `formatRange` and `isSingleMonth`, plus `isCompact` renamed `isSingleDate` and taking `(startDate, endDate)` like the other two.
- From `IdeaTimeline.service.ts`, renamed per the table and taking `(startDate, endDate)` instead of an era or project: `monthGridLineRange`, `formatDuration`, `monthColumnCount`, `yearStartGridLines`. `#monthGridLine` and `#monthsSinceYearZero` stay private.
- Export `timelineDatesService` from `packages/shared/index.ts`. `MonthGridLineRange` and `YearStartGridLine` stay unexported, like `TimelineEntry`.
- `TimelineDates.svelte` switches to `timelineDatesService`.

That is all of the date math. What stays in `Timeline.service.ts` works on eras, projects, rows, and lanes, taking month grid lines as its input.

### 2. Rebuild `Timeline.service.ts` around the new order

`packages/shared/services/Timeline.service.ts`

- Replace `#buildTimeline`, `#placeItems`, `#projectRailLine`, and `#cardDate` with the ordering and placement from `BranchGraph.service.ts`, renaming `#sortKey` to `#cardMonthGridLine` and reading month grid lines from `timelineDatesService`.
- Public, because components call them: `build()`, still returning `TimelineEntry[]`, plus `assignLanesByOverlap` and `projectsRunningAtStart`.
- Private: the sorted era and project lists, and era depth.
- The lane count the grid needs comes from the placements (step 3), so the prototype's `BranchGraph` result type is not carried over.
- `TimelinePlacement` renames `railLine` to `railGridLine`, gains `year`, and its docs change:
  - `railGridLine`: the row grid line an item's rail reaches. Below the card for an era, whose rail runs down to the next era's card; above the card for a project, whose rail runs up to the row where it ended.
  - `lane`: the lane a project's rail runs down, counted out from the era rail. Cards no longer stop short of lanes.
- Update the class JSDoc to describe the new order: each era's card above the projects started during it, and each project at the month it started.

### 3. Replace `Timeline.svelte`

`svelte/src/components/Timeline/Timeline.svelte`

- Take the markup and styles of `IdeaTimeline.svelte` and `BranchGraph.svelte`: a `section.timeline` holding `TimelineOverview`, then the grid as its own element, as the prototype has them.
- Declare the shared measurements on `section.timeline`, so the grid and the overview both inherit them.
- Derive `--lanes` from `build()`'s placements: the largest `lane`, plus 1.
- Move the era color derivation up from `EraCard.svelte`, keeping its `--era-lightness`, `--era-chroma-step`, and `--era-chroma-floor` names, and declare it on every descendant the way `IdeaTimeline.svelte` does, so the overview's era bars and the dated-row nodes get it too.
- Fewer sizing variables than the prototype:
  - The era rail's column is `--lane-width` wide, so `--trunk-column` goes away. The column narrows from 24px to 20px.
  - The gap between the lanes and the cards is `--card-gap`, already the same 16px, so `--content-gap` goes away.
  - The corner's radius is `--radius-lg` directly, so `--elbow-radius` goes away.
  - Nodes are `--era-rail-width` across, the same 12px, so `--node-size` goes away.
  - `--now-thickness` moves up from the overview, and the timeline's "now" line uses it instead of its literal 3px.
  - The rest are renamed per the table.

### 4. Replace `EraCard.svelte`

`svelte/src/components/Timeline/EraCard.svelte`

- Take `BranchGraphEra.svelte`: the rail running down to the next era with its node, the filled card with the tenure, and the "Still running from before" note shown below 48rem.
- `.trunk` becomes `.rail`, its custom properties change per the table, and `placement` is typed `TimelinePlacement`. The tenure comes from `timelineDatesService.formatDuration`, and the still-running projects from `timelineService.projectsRunningAtStart`.
- Drop its own `--era-color` declaration (step 3), and have the doc comment describe the card heading its era.

### 5. Replace `ProjectCard.svelte`

`svelte/src/components/Timeline/ProjectCard/ProjectCard.svelte`

- Take `BranchGraphProject.svelte`: the rail running up its lane, the corner turning into the era rail with its node and connector, the card with its duration under the thumbnail, and the dated row with its node on the era rail.
- `.branch` becomes `.rail` and `.elbow` becomes `.corner`, with their custom properties changed per the table and step 3. `placement` is typed `TimelinePlacement`, and `isSingleDate` and `formatDuration` come from `timelineDatesService`.
- `ProjectCardThumbnail`, `ProjectCardContent`, and `ProjectCardActions` are reused unchanged.

### 6. Move the overview

`svelte/src/routes/ideas/GaugeStrip.svelte` moves to `svelte/src/components/Timeline/TimelineOverview.svelte`.

- Read eras and projects from `timelineService.build()`, which is cached: filter by `TimelineItemKind`, and take each era's depth from its placement. Month grid lines, the month column count, and year starts come from `timelineDatesService`, and lanes from `timelineService.assignLanesByOverlap`.
- Rename `.gaugeStrip` to `.overview`, and reword comments that say "strip" or "gauge".
- Fewer sizing variables here too:
  - Marks use the inherited `--project-rail-width`, the same 4px as `--mark-thickness`, which goes away.
  - The era bar and the lanes share one thickness, 6px for both in the prototype. It is named `--overview-lane-width`, because reusing `--lane-width` would shadow the timeline's.
  - `--sticky-inset` goes away in favor of `--standard-spacing` directly.

### 7. Delete the prototype route, the refresh plan, and its wireframe

- Delete `svelte/src/routes/ideas/`. `svelte/src/routes/+page.svelte` already renders `Hero` then `Timeline`, so it needs no change.
- Delete `docs/site-refresh-plan.md` and `docs/wireframe/`.

## Validation

From the repo root, ignoring any failure that comes from the React app:

1. `pnpm test`
2. `pnpm lint`
3. `pnpm check`

Then on the running dev server (port 3020), check the home page at 1440px and 390px: rails and year labels at 48rem and wider, the pinned overview below that with marks that scroll to their cards, and no horizontal scrolling at either width.

## Open questions

- **Tests.** Only the home page smoke test exists, and `packages/shared` has no Vitest setup, so the new ordering, lane, and date logic stay untested unless that is added.
