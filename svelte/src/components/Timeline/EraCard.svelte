<!--
  @component

  An era: a card saying who it was with, when it ran, and what it amounted to, with a rail running
  up the left of the page from the card to where the era ended.
-->
<script lang="ts">
  import { type Era, type TimelinePlacement, timelineService } from 'shared';

  const { era, placement }: { era: Era; placement: TimelinePlacement } = $props();
</script>

<section
  class="era"
  style:--row={placement.row}
  style:--rail-line={placement.railLine}
  style:--lane={placement.lane}
>
  <div class="rail"></div>
  <div class="card">
    <h2 class="header-4">{era.name}</h2>
    <p class="dates">{timelineService.formatRange(era.startDate, era.endDate)}</p>
    <p>{era.info}</p>
  </div>
</section>

<style>
  /* The era keeps its element for semantics, and display: contents lets its rail and card place
     directly onto the timeline grid instead of into a box of their own. */
  .era {
    display: contents;
  }

  /* Each era further down the page sits a step closer to the background, so color reads as
     recency. The rail and the card take their step from the same row, so the join between them
     stays invisible. */
  .rail,
  .card {
    background: color-mix(
      in oklab,
      var(--color-primary) calc(40% - var(--row) * 1%),
      var(--background)
    );
  }

  .rail {
    grid-column: 1;
    grid-row: var(--rail-line) / var(--row);
    border-radius: var(--corner) var(--corner) 0 0;
  }

  .card {
    grid-column: 1 / -1;
    grid-row: var(--row);
    /* Stop short of the project rails crossing this row. */
    margin-inline-end: calc(var(--lane) * var(--lane-width));
    margin-block-end: calc(var(--standard-spacing) * 4);
    padding: calc(var(--standard-spacing) * 2);
    border-radius: 0 var(--corner) var(--corner) var(--corner);
  }
</style>
