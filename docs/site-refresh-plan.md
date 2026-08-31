# Site Refresh Plan

Status: design direction agreed, data sources identified.

## Requirements

Verbatim from the request:

1. I want to clear out a lot of the PoC / old projects. Maybe relegating them to a small section from purely a historical perspective, so folks can see my history and progression. But not front-and center.
2. I want my previous work experience to be shown.
3. I want to use fancier CSS features, but still keep the site very performant.
4. It needs to work in both React and Svelte (honestly, this should change literally nothing, I know how to do everything I could possibly need to in both, just don't suggest some React-only hacky shortcut or something).
5. Everything on the site needs to be by the books. Not some "fresh-out-of-bootcamp only knows React" kind of code. But clean, dynamic, small code that does things clearly, and well. Plus follows modern web standards.

Added during design review:

- Keep the existing color choices and the HDR gradient. Keep the hero broadly as it is. Everything else is open.
- Dark mode is a token swap, deferred to a later pass.
- Do not call the older projects an "archive". Everything carries a timestamp and reads as a timeline.
- The era color moves to the side rather than sitting behind the work, so an era never looks like it owns the projects shown against it.
- The date gauge appears on both the left and the right edge when the screen is wide enough for it. The wireframe shows the right-hand one only; the final design mirrors it once there is room, and drops to one side, then to none, as the viewport narrows.

## Design Direction

### Concept

One page, one scroll, reverse chronological. The page is a timeline of eras. An era is a job or a stretch of school. Scrolling down moves backwards through time.

Within an era, the projects that started during it come first, and the era's own card lands at the bottom, so the work introduces itself and the context follows. Crossing into the next era changes the backdrop.

`docs/wireframe/index.html` is the working wireframe of this, with placeholder content.

### Data

Two types, `Era` in a new `shared/config/eras.ts` and `Project` in the existing `shared/config/projects.ts`. Dates are month precision, with the day set to 1.

```ts
type Era = {
  name: string;
  info: string;
  startDate: Date;
  endDate?: Date;
};

type Project = {
  name: string;
  heading: string;
  info: string;
  startDate: Date;
  endDate?: Date;
  demoLink?: string;
  codeLink: string;
  thumbnailDescription: string;
};
```

An absent `endDate` means ongoing: the current job, or a project still being worked on.

Nothing links a project to an era. Membership is derived from the dates, which keeps one fact in one place and means adding a job later re-slots the projects around it without touching `projects.ts`. Eras sort by `startDate` descending. `endDate`, or today when it is absent, places a project's card; `startDate` places the foot of its stem. A project whose `startDate` falls in an earlier era than its card is exactly the case the shape language describes as a stem crossing an era boundary.

Still open on `Project`: the featured and compact tiers. The design calls for the distinction and it is not on the type yet.

### Requirement 1, resolved by the structure

The old freeCodeCamp and coursework projects are not deleted and not hidden behind a euphemism. They sit where they belong in time, under the university backdrop, rendered as compact dated rows instead of image cards. Nothing above them competes for attention, and a reader who cares about progression scrolls to find it.

The word "archive" never appears. Each era section is headed by the organization and its date range, which is a truer label than any category name.

### Shape language

Two shapes, one rotated from the other. See `docs/wireframe/index.html`.

**An era is an L.** A vertical rail carries the era color down the left, and at the bottom it turns right into the employer card. One continuous form, no overlap and no seam.

**A project is the same L turned 180 degrees.** A card runs across the top and a narrow stem descends from its right end, reaching back down to the date the project started. A stem that crosses an era boundary means the project outlived the job it began in.

Each project takes one lane further inward than the one above it, so its card is shorter by exactly one lane width and the stems never collide. Lanes are reused once a stem has ended.

Both shapes are filled rather than outlined. Two abutting fills of one color read as a single shape, which is what makes the join clean. An outline would need a concave rounded corner, which `border-radius` cannot produce, and would mean an SVG path or a clipped double layer for no gain.

The era color therefore appears only on the L, never behind the work. Color on the axis reads as "when". Color behind the work reads as "who for".

### Layout

One grid for the whole page. Column 1 is the era rail, column 2 is the content, and the remaining columns are stem lanes. Rows are slots: one per project, one per employer card.

Because every element sits on that one grid, a stem runs from its own card down into an earlier era without leaving it, and nothing needs measuring at runtime. Eras carry `display: contents` so they stay real elements for semantics while their children place directly onto the timeline grid.

A project element spans from its card down to its start slot, so most of its area is empty. That area takes `pointer-events: none`, with the card and stem re-enabling it, otherwise the empty span swallows clicks meant for what sits beneath.

### What the HDR gradient does

`--hdr-gradient` currently fires on card hover and reads as decoration. It gets a job instead: it is the marker for "now".

It is the top of the gutter. In the current era the band carries the full HDR conic gradient, and each era down the page steps it toward flat and unsaturated. One element carries both the era identity and the narrative of recency. It also keeps its hover role on featured cards, which is where it already earns its place.

### Motion

Animation runs on GSAP with ScrollTrigger.

`@gsap/react` provides the React adapter. There is no `@gsap/svelte`; the Svelte side uses a Svelte action, which is the idiomatic place for element lifecycle work.

#### Keeping both apps in step

GSAP itself is framework-agnostic. The risk is that the integration code diverges, which is the opposite of the consistency it is being adopted for. So the animation definitions do not live in components.

`shared/lib/` holds the timeline builders. Each takes the elements it animates and returns a configured GSAP timeline or ScrollTrigger, with no framework imports. Both apps call the same builder, so choreography is defined once and reviewed in one place.

Each app supplies only the thin adapter its framework requires: `useGSAP` from `@gsap/react` on the React side, a Svelte action on the Svelte side. Both do nothing but hand elements to a shared builder and dispose of it on teardown.

`gsap.matchMedia()` handles `prefers-reduced-motion` in one place, replacing per-component media queries. Under a reduced-motion preference the timeline is not built, and the layout stands on its own.

#### What stays in CSS

Anything that scroll position expresses directly, because it costs nothing and cannot fall out of sync:

- `position: sticky` for era labels, which are pushed out of frame by the next era.
- The gutter's per-era segmentation, which scrolls at page speed.

Easing and duration tokens live in `shared/global-styles/motion.css` so CSS transitions and GSAP defaults draw on the same values.

### Components

Both apps get the same set, Svelte with scoped `<style>` blocks and React with CSS modules, per existing convention.

| Component      | Role                                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `Timeline`     | Owns the page grid and renders every era in order. Replaces today's `Projects`.                                           |
| `EraContainer` | One era: its rail, its `ProjectCard`s, and its `EraCard` at the bottom.                                                   |
| `EraCard`      | The era's `name`, its date range, and its `info`.                                                                         |
| `ProjectCard`  | One project: the card and the stem down to its start date. Featured projects show an image, compact ones are a dated row. |

`Hero`, `Footer`, `Link`, `SocialLink`, `TextButton`, and `AnimatedBorderBackground` carry over. `CardGrid` is not used by the timeline; projects place directly onto the page grid.

### CSS features in play

Each is either safely ignorable or wrapped in `@supports`.

- **`position: sticky`** for era labels. The load-bearing piece, and the oldest technique here.
- **`@property`** to type the gradient angle on `AnimatedBorderBackground`, so it interpolates instead of animating a 200%-sized rotating pseudo-element. Cheaper and smoother than the current implementation.
- **Relative color syntax and `color-mix()`** to derive era palettes from one hue each.
- **Container queries** on project cards, so a card responds to its column rather than the viewport.
- **`text-wrap: balance`** on headings, `pretty` on body copy.

Support for each is verified against the specification and current browser data before it is committed, not assumed.

## Current State

Both apps render `Hero`, `Projects`, `Footer` on one page. The Svelte app also has `/blog`, rendering `src/posts/*.md` through mdsvex and `marked`. That route is untouched by this work.

`shared/config/projects.ts` holds 18 projects in one flat, untiered object, all rendered into a single `CardGrid`, so a published npm library sits next to a freeCodeCamp pomodoro clock. There is no work experience data anywhere in the repo.

`shared/global-styles/global.css` defines the theme on `:root`: a green primary, an orange accent, a mint green, a Material-derived type scale, and a fixed three-stop `linear-gradient` page background. Light mode only. Several card shadows are hardcoded `rgb(0 0 0 / n%)` rather than tokens, and get tokenized as part of this work.

## Data Sources

Neither dataset exists in this repo. Both are gathered at the start of implementation and written directly into the new structures.

### Eras, from the resume repository

`aneuhold/resume` holds the work history in `src/data/`, aggregated by `careerData.ts`:

- `src/data/experience/` exports an `Experience` per job: `company`, `location`, `startDate`, `endDate`, and a `positions` map of titles held.
- `src/data/education/` exports an `Education` per institution: `institution`, `degree`, `location`, `startDate`, `endDate`.

Both already use `Date` with an optional `endDate`, so the dates copy across unchanged and an ongoing entry stays ongoing. `name` comes from `company` or `institution`. `info` is the one field with no counterpart, and gets written for the timeline rather than lifted: the resume entries carry per-position responsibilities, which is more than an era card should say.

The data is copied, not imported. The two repos stay independent, and the timeline shows a deliberately shorter version of the history.

### Project dates, from GitHub activity

Each project's `codeLink` points at its repository, so commit history gives the `startDate` and, where work has stopped, the `endDate`. Two cases need care:

- Some links point into a monorepo subdirectory, such as `ts-libs/tree/main/packages/local-npm-registry`. Those need commit history scoped to that path, not the repository's creation date.
- Some point at repositories under another owner, such as `halomod/TheHaloMod-SPA`.

Month precision is enough, so a first and last commit rounded to the month is the whole job.

## Implementation Steps

To be filled in once the data above is in hand.
