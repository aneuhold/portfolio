<!--
  @component

  An era's L: a rail carrying its colour down the page, turning at the bottom into the card that
  says who it was with, when it ran, and what it amounted to.

  The L is never drawn as an L. It is two rectangles of one colour meeting at a square corner,
  which is what lets `border-radius` alone shape it: an outlined L would need a concave rounded
  corner, which CSS cannot produce.
-->
<script lang="ts">
  import type { Era } from '$shared/config/eras';
  import timelineService from '$shared/services/Timeline.service';

  const { era, row, railFrom }: { era: Era; row: number; railFrom: number } = $props();
</script>

<section class="era" style:--row={row} style:--from={railFrom}>
  <div class="rail"></div>
  <div class="card">
    <h2 class="header-4">{era.name}</h2>
    <p class="dates">{timelineService.formatRange(era.startDate, era.endDate)}</p>
    <p>{era.info}</p>
  </div>
</section>

<style>
  /* The era keeps its element for semantics while its two halves place onto the page grid. 
    display: contents makes it so that the grid will extend a little further to the next children.
  */
  .era {
    display: contents;
  }

  /* Each era further down the page sits a step closer to the background, so colour reads as
     recency. Both halves take their step from the same row, so the join stays invisible. */
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
    grid-row: var(--from) / var(--row);
    border-radius: var(--corner) var(--corner) 0 0;
  }

  .card {
    grid-column: 1 / -1;
    grid-row: var(--row);
    margin-block-end: calc(var(--standard-spacing) * 4);
    padding: calc(var(--standard-spacing) * 2);
    border-radius: 0 var(--corner) var(--corner) var(--corner);
  }
</style>
