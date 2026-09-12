<!--
  @component

  The stretch of time a timeline item covers, at month precision. An item still running reads as
  "now".
-->
<script lang="ts">
  import { timelineDatesService } from 'shared';

  const {
    startDate,
    endDate,
    useMaxDateWidth = false
  }: {
    startDate: Date;
    endDate?: Date;
    /** Holds the width of the widest date there is, so a column of them lines up. */
    useMaxDateWidth?: boolean;
  } = $props();

  const singleMonth = $derived(timelineDatesService.isSingleMonth(startDate, endDate));
</script>

<span
  class="dates"
  class:maxMonthWidth={useMaxDateWidth && singleMonth}
  class:maxRangeWidth={useMaxDateWidth && !singleMonth}
  >{timelineDatesService.formatRange(startDate, endDate)}</span
>

<style>
  /* Tabular figures so the ranges line up down the page. The color is the surrounding card's, which
     is how a card on a dark ground gets a range that reads against it. */
  .dates {
    /* Three characters of month, a space and four of year, and the half covers the letters, which
       run wider than the digit a ch measures. */
    --month-width: 8.5ch;
    --separator-width: 2.5ch;

    color: var(--color-text-secondary);
    font-size: 0.8125rem;
    line-height: 1.75;
    letter-spacing: 0.02em;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  /* Holding the width of the widest date rather than each row's own gives a column of dates one
     edge for whatever follows them to start from. A range holds two of those and the separator
     between them, which is also wide enough for one running to now. */
  .maxMonthWidth,
  .maxRangeWidth {
    display: inline-block;
    min-inline-size: var(--month-width);
  }
  .maxRangeWidth {
    min-inline-size: calc(2 * var(--month-width) + var(--separator-width));
  }
</style>
