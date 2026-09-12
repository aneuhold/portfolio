<!--
  @component

  The page's timeline: every era and project in one reverse chronological list, so scrolling down
  moves backwards through time. Where there is room it is drawn like git log --graph, with each
  era's rail down the left and each project's rail running up its lane beside the cards. On a
  narrow screen the rails give way, the overview is pinned above the cards, and the cards take the
  full width.
-->
<script lang="ts">
  import { TimelineItemKind, timelineService } from 'shared';
  import EraCard from './EraCard.svelte';
  import EraRail from './EraRail.svelte';
  import ProjectCard from './ProjectCard/ProjectCard.svelte';
  import ProjectRail from './ProjectRail.svelte';
  import TimelineOverview from './TimelineOverview.svelte';

  const timeline = timelineService.build();
  const laneCount = Math.max(...timeline.map(({ placement }) => placement.lane)) + 1;
</script>

<section class="timeline">
  <TimelineOverview />
  <div class="grid" style:--lanes={laneCount}>
    <!-- Every rail comes before every card, so rails sit next to rails and cards next to cards in
      the markup, which is what a run of dated rows and their nodes are styled by. -->
    {#each timeline as { item, placement } (item.key)}
      {#if item.kind === TimelineItemKind.Era}
        <EraRail {placement} />
      {:else}
        <ProjectRail project={item} {placement} />
      {/if}
    {/each}
    {#each timeline as { item, placement } (item.key)}
      {#if item.kind === TimelineItemKind.Era}
        <EraCard era={item} {placement} />
      {:else}
        <ProjectCard project={item} {placement} />
      {/if}
    {/each}
    <p class="now" aria-hidden="true">now</p>
  </div>
</section>

<style>
  /* Every measurement the grid and the overview share is declared here, and they derive the
     rest. */
  .timeline {
    --year-width: calc(var(--standard-spacing) * 5);
    --lane-width: calc(var(--standard-spacing) * 2.5);
    /* A node is the circle where a card meets its rail. It is as wide across as the era rail. */
    --era-rail-width: calc(var(--standard-spacing) * 1.5);
    --project-rail-width: calc(var(--standard-spacing) / 2);
    --now-thickness: 3px;
    --card-padding: calc(var(--standard-spacing) * 2);
    /* How far down its card a node sits, which is level with the middle of the card's name. */
    --era-node-offset: calc(var(--card-padding) * 1.5 + 1rem);
    --project-node-offset: calc(var(--card-padding) + 1rem);
    --card-gap: calc(var(--standard-spacing) * 2);
    --era-gap: calc(var(--standard-spacing) * 6);
    /* How much of the primary's chroma each era further back gives up, and the floor it stops at.
       Lightness is held, which keeps the contrast of the white text the same at every step. */
    --era-lightness: 44%;
    --era-chroma-step: 0.27;
    --era-chroma-floor: 0.15;

    margin-inline: auto;
    max-inline-size: 68rem;
    padding: calc(var(--standard-spacing) * 3);
    /* The site centres its text; a timeline is read down a left edge. */
    text-align: start;

    @media (width < 48rem) {
      --era-gap: calc(var(--standard-spacing) * 4);
    }

    @media (width < 40rem) {
      padding-inline: calc(var(--standard-spacing) * 2);
    }

    /* Declared on every element rather than once, so each one resolves them from the --era-depth
       and --row it carries instead of from where the declaration sits. */
    :global(*) {
      --era-color: oklch(
        from var(--color-primary) var(--era-lightness)
          calc(c * max(var(--era-chroma-floor), 1 - var(--era-depth, 0) * var(--era-chroma-step))) h
      );
      /* The first era meets the top of the grid. Each one after it leaves a gap above, and the
         project rails running between the two eras cross it. */
      --era-space: calc(var(--era-gap) * min(1, var(--row) - 1));
    }
  }

  /* One grid for the whole timeline: a year column, the era rail, a column per lane, a gap, then
     the cards. A project rail runs up past the rows above its card without leaving the grid, and
     there is no row gap, because it has to run unbroken from one row into the next. */
  .grid {
    /* From the middle of the era rail to the leading edge of the cards, which is how far anything
       drawn on the era rail reaches across to a card. */
    --gutter-width: calc(
      var(--lane-width) / 2 + var(--lanes) * var(--lane-width) + var(--card-gap)
    );

    display: grid;
    grid-template-columns:
      var(--year-width) var(--lane-width) repeat(var(--lanes), var(--lane-width))
      var(--card-gap) minmax(0, 1fr);

    /* The overview takes over on a narrow screen, and the cards take the whole width. */
    @media (width < 48rem) {
      grid-template-columns: minmax(0, 1fr);
    }

    /* The year beside the first row of each year, measured back across the gutter from the row's
       leading edge and level with the row's node. */
    :global([data-year])::after {
      content: attr(data-year);
      position: absolute;
      inset-block-start: var(--node-offset);
      inset-inline-end: calc(100% + var(--gutter-width) + var(--lane-width) / 2);
      translate: 0 -50%;
      color: var(--color-text-primary);
      opacity: 0.65;
      font-size: 0.6875rem;
      font-weight: 400;
      letter-spacing: 0.08em;
      font-variant-numeric: tabular-nums;

      /* Gives way to the overview's year labels on a narrow screen. */
      @media (width < 48rem) {
        content: none;
      }
    }
  }

  /* Sits on the top edge of the grid, where every project rail still running begins. */
  .now {
    position: relative;
    grid-column: 1 / -2;
    grid-row: 1;
    align-self: start;
    translate: 0 -50%;
    color: color-mix(in oklab, var(--color-text-primary) 65%, transparent);
    font-size: 0.6875rem;
    line-height: 1;
    letter-spacing: 0.08em;

    /* Gives way to the overview's now line on a narrow screen. */
    @media (width < 48rem) {
      display: none;
    }

    /* The HDR gradient marks the present. It is conic, so its center sits just below the line,
       which then sweeps from violet through pink to orange from one end to the other. */
    &::after {
      content: '';
      position: absolute;
      inset-block-start: 50%;
      inset-inline: var(--year-width) 0;
      block-size: var(--now-thickness);
      translate: 0 -50%;
      border-radius: var(--now-thickness);
      background: var(--hdr-gradient) top / 100% calc(var(--standard-spacing) * 4) no-repeat;
    }
  }
</style>
