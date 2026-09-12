<!--
  @component

  A project's part of the graph. Work that ran over a stretch of time gets a rail running up its lane
  to the row where it ended, and a corner that turns it into the era rail, with a node and a faint
  connector across to its card. Work that came and went on a single date gets a node on the era rail.
-->
<script lang="ts">
  import { type Project, timelineDatesService, type TimelinePlacement } from 'shared';

  const { project, placement }: { project: Project; placement: TimelinePlacement } = $props();

  const hasRailAbove = $derived(placement.railGridLine < placement.row);
</script>

{#if timelineDatesService.isSingleDate(project.startDate, project.endDate)}
  <div class="node" style:--row={placement.row} style:--era-depth={placement.eraDepth}></div>
{:else}
  <div
    class="rail"
    class:railStart={!hasRailAbove}
    style:--row={placement.row}
    style:--rail-grid-line={placement.railGridLine}
    style:--lane={placement.lane}
    style:--lane-span={placement.lane + 2}
  ></div>
  <div
    class="corner"
    style:--row={placement.row}
    style:--lane={placement.lane}
    style:--lane-span={placement.lane + 2}
  ></div>
{/if}

<style>
  /* The lane is the last column of the span, so the rail and the corner both end in it. Each lane
     turns the primary's hue a step further, so rails running side by side stay apart. */
  .rail,
  .corner {
    --rail-color: oklch(from var(--color-primary) 60% 0.13 calc(h + var(--lane) * 50));

    grid-column: 2 / span var(--lane-span);

    /* The overview pinned above the cards stands in for the rails on a narrow screen. */
    @media (width < 48rem) {
      display: none;
    }
  }

  /* Centred in its lane, running from the row where the project ended to the top of the card's row,
     where the corner carries it on. Its top end is rounded off. */
  .rail {
    grid-row: var(--rail-grid-line) / var(--row);
    justify-self: end;
    inline-size: var(--project-rail-width);
    margin-inline-end: calc((var(--lane-width) - var(--project-rail-width)) / 2);
    border-radius: var(--project-rail-width) var(--project-rail-width) 0 0;
    background-color: var(--rail-color);

    /* With no rows to run up, the rail is only its rounded top end, because the corner's border
       can't round both sides of its own top end. It is centred on the top edge of the card's row,
       which is where the rounding finishes and the corner's square top begins. */
    &.railStart {
      grid-row: var(--row);
      align-self: start;
      block-size: var(--project-rail-width);
      translate: 0 -50%;
    }
  }

  /* Carries the rail on down its lane past the node, then turns it and runs it back along the row
     to the edge of the era rail. */
  .corner {
    /* How far below the node the rail turns. */
    --corner-drop: calc(var(--standard-spacing) * 3);

    position: relative;
    grid-row: var(--row);
    align-self: start;
    block-size: calc(var(--project-node-offset) + var(--corner-drop));
    margin-inline: calc((var(--lane-width) + var(--era-rail-width)) / 2)
      calc((var(--lane-width) - var(--project-rail-width)) / 2);
    border-inline-end: var(--project-rail-width) solid var(--rail-color);
    border-block-end: var(--project-rail-width) solid var(--rail-color);
    border-end-end-radius: var(--radius-lg);

    /* A faint line from the node across whatever lanes are left to its right, to the card. */
    &::before {
      content: '';
      position: absolute;
      inset-block-start: var(--project-node-offset);
      inset-inline-start: calc(100% + var(--project-rail-width) / 2);
      inline-size: calc(
        var(--lane-width) / 2 + (var(--lanes) - var(--lane) - 1) * var(--lane-width) +
          var(--card-gap)
      );
      block-size: 2px;
      translate: 0 -50%;
      background-color: color-mix(in oklab, var(--rail-color) 40%, transparent);
    }

    /* The node, centred on the rail. The containing block stops inside the corner's border, so half
       the border width reaches the middle of the line. */
    &::after {
      content: '';
      position: absolute;
      inset-block-start: var(--project-node-offset);
      inset-inline-start: calc(100% + var(--project-rail-width) / 2);
      inline-size: var(--era-rail-width);
      block-size: var(--era-rail-width);
      translate: -50% -50%;
      border: var(--project-rail-width) solid var(--rail-color);
      border-radius: 50%;
      background-color: var(--background);
    }
  }

  /* A node on the era rail itself, for work with no rail of its own, centred on its dated row. It is
     positioned, like the era rail behind it, so it paints over it. */
  .node {
    position: relative;
    grid-column: 2;
    grid-row: var(--row);
    align-self: center;
    justify-self: center;
    inline-size: var(--era-rail-width);
    block-size: var(--era-rail-width);
    border: calc(var(--era-rail-width) / 4) solid var(--era-color);
    border-radius: 50%;
    background-color: var(--background);

    /* Gives way to the overview on a narrow screen, like the rails. */
    @media (width < 48rem) {
      display: none;
    }

    /* The last dated row in a run keeps a card gap below it, so its node keeps the same gap to
       stay centred on it. */
    &:not(:has(+ .node)) {
      margin-block-end: var(--card-gap);
    }
  }
</style>
