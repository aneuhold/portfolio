<!--
  @component

  The stretch of time a timeline item covers, at month precision. An item still running reads as
  "now".
-->
<script lang="ts">
  import { timelineService } from 'shared';

  const { startDate, endDate }: { startDate: Date; endDate?: Date } = $props();
</script>

<span class="dates">{timelineService.formatRange(startDate, endDate)}</span>

<style>
  /* Tabular figures so the ranges line up down the page. The color is the surrounding card's, which
     is how a card on a dark ground gets a range that reads against it. */
  .dates {
    color: var(--color-text-secondary);
    font-size: 0.8125rem;
    line-height: 1.75;
    letter-spacing: 0.02em;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
</style>
