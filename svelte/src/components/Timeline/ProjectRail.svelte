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
  <div
    class="node"
    data-item={project.key}
    style:--row={placement.row}
    style:--era-depth={placement.eraDepth}
  ></div>
{:else}
  <div
    class="rail"
    class:railStart={!hasRailAbove}
    data-item={project.key}
    style:--row={placement.row}
    style:--rail-grid-line={placement.railGridLine}
    style:--grid-lane={placement.lane}
    style:--grid-lane-span={placement.lane + 2}
  ></div>
  <div
    class="corner"
    data-item={project.key}
    style:--row={placement.row}
    style:--grid-lane={placement.lane}
    style:--grid-lane-span={placement.lane + 2}
  ></div>
{/if}

<style>
  /* The lane is the last column of the span, so the rail and the corner both end in it. */
  .rail,
  .corner {
    grid-column: 2 / span var(--grid-lane-span);

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
    margin-inline-end: calc((var(--grid-lane-width) - var(--project-rail-width)) / 2);
    border-radius: var(--project-rail-width) var(--project-rail-width) 0 0;
    background-color: var(--rail-color);
    box-shadow: 0 0 0 var(--swell) var(--rail-color);

    /* Stretches the hover target across the whole lane without drawing anything. It stays in flow,
       so the rail paints where it always has, under the corners. */
    &::before {
      content: '';
      display: block;
      block-size: 100%;
      margin-inline: calc((var(--project-rail-width) - var(--grid-lane-width)) / 2);
    }

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
    margin-inline: calc((var(--grid-lane-width) + var(--era-rail-width)) / 2)
      calc((var(--grid-lane-width) - var(--project-rail-width)) / 2);
    border-inline-end: var(--project-rail-width) solid var(--rail-color);
    border-block-end: var(--project-rail-width) solid var(--rail-color);
    border-end-end-radius: var(--radius-lg);
    /* The border can't widen without moving the layout, so shadows widen it instead: offset out
       past the turn for its outer side, and inset along each stroke for its inner side. */
    box-shadow:
      var(--swell) var(--swell) var(--rail-color),
      0 var(--swell) var(--rail-color),
      inset calc(-1 * var(--swell)) 0 var(--rail-color),
      inset 0 calc(-1 * var(--swell)) var(--rail-color);

    /* A faint line from the node across whatever lanes are left to its right, to the card. It
       turns solid while the project is active, and never takes the hover from the rails it
       crosses. */
    &::before {
      content: '';
      position: absolute;
      inset-block-start: var(--project-node-offset);
      inset-inline-start: calc(100% + var(--project-rail-width) / 2);
      inline-size: calc(
        var(--grid-lane-width) / 2 + (var(--grid-lanes) - var(--grid-lane) - 1) *
          var(--grid-lane-width) + var(--card-gap)
      );
      block-size: 2px;
      translate: 0 -50%;
      scale: 1 calc(1 + var(--grow));
      background-color: color-mix(
        in oklab,
        var(--rail-color) calc(40% + var(--lift) * 60%),
        transparent
      );
      pointer-events: none;
    }

    /* The node, centred on the rail, swelling while the project is active. The containing block
       stops inside the corner's border, so half the border width reaches the middle of the line. */
    &::after {
      content: '';
      position: absolute;
      inset-block-start: var(--project-node-offset);
      inset-inline-start: calc(100% + var(--project-rail-width) / 2);
      inline-size: var(--era-rail-width);
      block-size: var(--era-rail-width);
      translate: -50% -50%;
      scale: calc(1 + var(--grow) * 0.4);
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
    scale: calc(1 + var(--grow) * 0.4);
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
