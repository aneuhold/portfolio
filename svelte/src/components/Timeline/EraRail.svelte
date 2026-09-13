<!--
  @component

  An era's stretch of the era rail, running down from the era's card to the next era's card, with a
  node level with the card's name and a faint connector across to it.
-->
<script lang="ts">
  import { type Era, type TimelinePlacement } from 'shared';

  const { era, placement }: { era: Era; placement: TimelinePlacement } = $props();
</script>

<div
  class="rail"
  data-item={era.key}
  style:--row={placement.row}
  style:--rail-grid-line={placement.railGridLine}
  style:--era-depth={placement.eraDepth}
></div>

<style>
  /* Starts level with the era's card and stops short of the next era's by the card gap, so each era
     reads as its own stretch. Half its width of radius rounds both ends off. */
  .rail {
    position: relative;
    grid-column: 2;
    grid-row: var(--row) / var(--rail-grid-line);
    justify-self: center;
    inline-size: var(--era-rail-width);
    margin-block: var(--era-space) var(--card-gap);
    border-radius: calc(var(--era-rail-width) / 2);
    background-color: var(--era-color);
    box-shadow: 0 0 0 var(--swell) var(--era-color);

    /* The overview pinned above the cards stands in for the era rail on a narrow screen. */
    @media (width < 48rem) {
      display: none;
    }

    /* A faint line from the node, under the project rails, across to the card. It turns solid
       while the era is active, and never takes the hover from the rails it crosses. */
    &::before {
      content: '';
      position: absolute;
      inset-block-start: var(--era-node-offset);
      inset-inline-start: 50%;
      inline-size: var(--gutter-width);
      block-size: 2px;
      translate: 0 -50%;
      scale: 1 calc(1 + var(--grow));
      background-color: color-mix(
        in oklab,
        var(--era-color) calc(40% + var(--lift) * 60%),
        transparent
      );
      pointer-events: none;
    }

    &::after {
      content: '';
      position: absolute;
      inset-block-start: var(--era-node-offset);
      inset-inline-start: 50%;
      inline-size: var(--era-rail-width);
      block-size: var(--era-rail-width);
      translate: -50% -50%;
      scale: calc(1 + var(--grow) * 0.4);
      border: calc(var(--era-rail-width) / 3) solid var(--era-color);
      border-radius: 50%;
      background-color: var(--background);
    }
  }
</style>
