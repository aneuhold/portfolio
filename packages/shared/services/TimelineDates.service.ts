import { eras } from '../config/eras';
import { projects } from '../config/projects';

/**
 * Month-precision date arithmetic for the timeline: turns dates into months, month grid lines, and
 * text. It knows nothing about rows, lanes, or which era a project belongs to.
 */
class TimelineDatesService {
  readonly #monthFormat = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  });

  readonly #currentMonth = this.#monthsSinceYearZero(new Date());

  readonly #firstMonth = Math.min(
    ...[...Object.values(eras), ...Object.values(projects)].map((item) =>
      this.#monthsSinceYearZero(item.startDate)
    )
  );

  /**
   * How many month columns there are. The last month grid line is one more than this.
   */
  get monthColumnCount(): number {
    return this.#currentMonth - this.#firstMonth + 1;
  }

  /**
   * Renders a month-precision range, such as "Sep 2025 – Jan 2026". An absent end reads as "now",
   * and a range that starts and ends in the same month collapses to that month.
   *
   * @param startDate The month the range opens in.
   * @param endDate The month it closes in, absent while it is still open.
   */
  formatRange(startDate: Date, endDate?: Date): string {
    const start = this.#monthFormat.format(startDate);
    if (!endDate) {
      return `${start} – now`;
    }
    if (this.isSingleMonth(startDate, endDate)) {
      return start;
    }
    return `${start} – ${this.#monthFormat.format(endDate)}`;
  }

  /**
   * How long a range ran, to the month, such as "4 yrs 3 mos" or "8 mos".
   *
   * @param startDate The month the range opens in.
   * @param endDate The month it closes in, absent while it is still open.
   */
  formatDuration(startDate: Date, endDate?: Date): string {
    const { start, end } = this.monthGridLineRange(startDate, endDate);
    const months = end - start;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return [
      years > 0 ? `${years} ${years === 1 ? 'yr' : 'yrs'}` : '',
      remainingMonths > 0 ? `${remainingMonths} ${remainingMonths === 1 ? 'mo' : 'mos'}` : ''
    ]
      .filter((part) => part !== '')
      .join(' ');
  }

  /**
   * Whether a range renders as one month, which it does when it opens and closes in the same one.
   * A range still open never does, since it reads as running to now.
   *
   * @param startDate The month the range opens in.
   * @param endDate The month it closes in, absent while it is still open.
   */
  isSingleMonth(startDate: Date, endDate?: Date): boolean {
    return (
      endDate !== undefined &&
      this.#monthFormat.format(startDate) === this.#monthFormat.format(endDate)
    );
  }

  /**
   * Whether a range came and went on a single date.
   *
   * @param startDate The date the range opens on.
   * @param endDate The date it closes on, absent while it is still open.
   */
  isSingleDate(startDate: Date, endDate?: Date): boolean {
    return endDate?.getTime() === startDate.getTime();
  }

  /**
   * The month grid lines a range runs between. The end date is exclusive, since an era ends on the
   * date the next one starts. A range still open reaches the last month grid line, and a range on a
   * single date still covers its month.
   *
   * @param startDate The month the range opens in.
   * @param endDate The month it closes in, absent while it is still open.
   */
  monthGridLineRange(startDate: Date, endDate?: Date): MonthGridLineRange {
    const start = this.#monthGridLine(startDate);
    const end = endDate ? this.#monthGridLine(endDate) : this.monthColumnCount + 1;
    return { start, end: Math.max(end, start + 1) };
  }

  /**
   * The month grid line each calendar year starts on, the most recent year first. The earliest year
   * starts at line 1 even when the first month column falls partway through it.
   */
  yearStartGridLines(): YearStartGridLine[] {
    const firstYear = Math.floor(this.#firstMonth / 12);
    const lastYear = Math.floor(this.#currentMonth / 12);
    return Array.from({ length: lastYear - firstYear + 1 }, (_, offset) => {
      const year = lastYear - offset;
      return { year, gridLine: Math.max(1, year * 12 - this.#firstMonth + 1) };
    });
  }

  /**
   * The month grid line a date's month starts on.
   *
   * @param date The date whose month is being placed.
   */
  #monthGridLine(date: Date): number {
    return this.#monthsSinceYearZero(date) - this.#firstMonth + 1;
  }

  /**
   * Counts months from year 0, so two dates subtract to the months between them.
   *
   * @param date The date being counted.
   */
  #monthsSinceYearZero(date: Date): number {
    return date.getUTCFullYear() * 12 + date.getUTCMonth();
  }
}

const timelineDatesService = new TimelineDatesService();

export { timelineDatesService };

/**
 * The month grid lines a range of dates runs between.
 *
 * A grid line is a numbered boundary between grid tracks, which is what `grid-row` and
 * `grid-column` place items by ([MDN: Grid lines](https://developer.mozilla.org/en-US/docs/Glossary/Grid_Lines)).
 * The month columns are one per month, from the month of the earliest start date of any era or
 * project through the current month, read from `new Date()` when this file loads. A month grid line
 * is a grid line between month columns: line 1 opens the first month column, line 2 the second, and
 * so on.
 */
type MonthGridLineRange = {
  start: number;
  /**
   * Exclusive, so `end - start` is the number of month columns covered.
   */
  end: number;
};

/**
 * Where a calendar year starts among the month columns.
 */
type YearStartGridLine = {
  year: number;
  gridLine: number;
};
