<!--
  @component

  The stretch of time a timeline item covers, at month precision: either the range of months it ran
  over, or how long that was. An item still running reads as "now" in a range and "so far" in a
  duration.
-->
<script lang="ts" module>
  /**
   * The type sizes a `TimelineDates` renders at.
   */
  export enum TimelineDatesSize {
    Small = 'Small',
    Large = 'Large'
  }
</script>

<script lang="ts">
  import { TextColor, timelineDatesService } from 'shared';

  const {
    startDate,
    endDate,
    useDuration = false,
    size = TimelineDatesSize.Small,
    color = TextColor.Secondary,
    useMaxDateWidth = false
  }: {
    startDate: Date;
    endDate?: Date;
    /** Shows how long the item ran, such as "4 yrs 3 mos", instead of the range of months. */
    useDuration?: boolean;
    size?: TimelineDatesSize;
    color?: TextColor;
    /**
     * Holds the width of the widest date there is, so a column of them lines up. Has no effect with
     * `useDuration`.
     */
    useMaxDateWidth?: boolean;
  } = $props();

  const singleMonth = $derived(timelineDatesService.isSingleMonth(startDate, endDate));
  const text = $derived.by(() => {
    if (!useDuration) {
      return timelineDatesService.formatRange(startDate, endDate);
    }
    const duration = timelineDatesService.formatDuration(startDate, endDate);
    return endDate ? duration : `${duration} so far`;
  });
</script>

<span
  class="timeline-dates"
  class:caption-tabular={size === TimelineDatesSize.Small}
  class:header-3={size === TimelineDatesSize.Large}
  class:primary={color === TextColor.Primary}
  class:secondary={color === TextColor.Secondary}
  class:duration={useDuration}
  class:maxMonthWidth={useMaxDateWidth && !useDuration && singleMonth}
  class:maxRangeWidth={useMaxDateWidth && !useDuration && !singleMonth}>{text}</span
>

<style>
  .timeline-dates {
    /* Three characters of month, a space and four of year, and the half covers the letters, which
       run wider than the digit a ch measures. */
    --month-width: 8.5ch;
    --separator-width: 2.5ch;
    white-space: nowrap;
  }

  /* A card can redefine the theme's text colors, which is how one on a dark ground gets dates that
     read against it. */
  .primary {
    color: var(--color-text-primary);
  }

  .secondary {
    color: var(--color-text-secondary);
  }

  .caption-tabular.duration {
    line-height: normal;
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

  .header-3 {
    /* The large size steps down on a narrow screen. */
    @media (width < 40rem) {
      font-size: 1.5rem;
    }
  }
</style>
