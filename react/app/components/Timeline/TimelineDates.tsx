import { TextColor, timelineDatesService, TimelineDatesSize } from 'shared';
import styles from './TimelineDates.module.css';

/**
 * The stretch of time a timeline item covers, at month precision: either the range of months it
 * ran over, or how long that was. An item still running reads as "now" in a range and "so far" in
 * a duration.
 */
export default function TimelineDates({
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
}) {
  const singleMonth = timelineDatesService.isSingleMonth(startDate, endDate);
  let text = timelineDatesService.formatRange(startDate, endDate);
  if (useDuration) {
    const duration = timelineDatesService.formatDuration(startDate, endDate);
    text = endDate ? duration : `${duration} so far`;
  }

  const sizeClass = size === TimelineDatesSize.Small ? 'caption-tabular' : 'header-3';
  const colorClass =
    color === TextColor.Primary
      ? styles.primary
      : color === TextColor.Secondary
        ? styles.secondary
        : '';
  const durationClass = useDuration ? styles.duration : '';
  let maxWidthClass = '';
  if (useMaxDateWidth && !useDuration) {
    maxWidthClass = singleMonth ? styles.maxMonthWidth : styles.maxRangeWidth;
  }

  return (
    <span
      className={`${styles.timelineDates} ${sizeClass} ${colorClass} ${durationClass} ${maxWidthClass}`}
    >
      {text}
    </span>
  );
}
