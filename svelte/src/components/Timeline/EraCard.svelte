<!--
  @component

  An era: a card saying who it was with, when it ran, and what it amounted to, with a rail running
  up the left of the page from the card to where the era ended.
-->
<script lang="ts">
  import { type Era, type TimelinePlacement } from 'shared';
  import TimelineDates from './TimelineDates.svelte';

  const { era, placement }: { era: Era; placement: TimelinePlacement } = $props();
</script>

<section
  class="era"
  style:--row={placement.row}
  style:--rail-line={placement.railLine}
  style:--lane={placement.lane}
  style:--era-depth={placement.eraDepth}
>
  <div class="rail"></div>
  <div class="card">
    <h2 class="header-4">{era.name}</h2>
    <TimelineDates startDate={era.startDate} endDate={era.endDate} />
    <p class="info">{era.info}</p>
  </div>
</section>

<style>
  /* The era keeps its element for semantics, and display: contents lets its rail and card place
     directly onto the timeline grid instead of into a box of their own. */
  .era {
    /* How much of the primary's chroma each era further back gives up, and the floor it stops at.
       Lightness is held, which keeps the contrast of the white text the same at every step. */
    --era-lightness: 44%;
    --era-chroma-step: 0.27;
    --era-chroma-floor: 0.15;
    /* Kinda crazy fill calculation to just make it a little darker as it goes down. */
    --era-color: oklch(
      from var(--color-primary) var(--era-lightness)
        calc(c * max(var(--era-chroma-floor), 1 - var(--era-depth) * var(--era-chroma-step))) h
    );

    display: contents;
  }

  .rail,
  .card {
    background-color: var(--era-color);
    color: var(--background);
  }

  .rail {
    position: relative;
    grid-column: 1;
    grid-row: var(--rail-line) / var(--row);
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }

  /* Rounds the corner into the card */
  .rail::after {
    content: '';
    position: absolute;
    inset-block-end: 0;
    inset-inline-start: 100%;
    inline-size: var(--radius-lg);
    block-size: var(--radius-lg);
    background: radial-gradient(
      circle at 100% 0,
      transparent calc(var(--radius-lg) - 1px),
      var(--era-color) var(--radius-lg)
    );
  }

  /* Name and dates share the first line, the summary takes the second. */
  .card {
    /* The ground here is dark, so a step back from the name is a step off white, not off black. */
    --color-text-secondary: color-mix(in oklab, var(--background) 76%, transparent);

    grid-column: 1 / -1;
    grid-row: var(--row);
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    column-gap: calc(var(--standard-spacing) * 2);
    row-gap: var(--standard-spacing);
    /* Stops short of the project rails crossing this row. */
    margin-inline-end: calc(var(--lane) * var(--lane-width));
    margin-block-end: var(--era-gap);
    padding: calc(var(--card-padding) * 1.5);
    border-radius: 0 var(--radius-lg) var(--radius-lg) var(--radius-lg);
    box-shadow: var(--shadow-resting);
  }

  h2 {
    text-wrap: balance;
  }

  .info {
    grid-column: 1 / -1;
    color: var(--color-text-secondary);
    text-wrap: pretty;
  }

  /* The card is as wide as the page, so it steps down at the width the timeline itself does: the
     dates drop under the name rather than squeezing it. */
  @media (width < 40rem) {
    .card {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
