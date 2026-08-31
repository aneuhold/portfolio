import eras, { type Era } from '../config/eras';
import projects, { type Project } from '../config/projects';
import { TimelineItemKind } from '../types/TimelineItemBase';

/**
 * One element of the timeline. Eras and projects sit in the same list because a project can span
 * several eras, so neither can own the other.
 */
export type TimelineItem = Era | Project;

/**
 * Derives the timeline from the era and project data. Nothing links a project to an era in the
 * data itself, so the order is worked out here from the dates alone.
 */
class TimelineService {
  readonly #monthFormat = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  });

  /**
   * Every era and project in one reverse chronological list, so scrolling down moves backwards
   * through time.
   */
  build(): TimelineItem[] {
    const now = new Date();
    const items: TimelineItem[] = [...Object.values(eras), ...Object.values(projects)];
    return items.sort((a, b) => this.#placement(b, now) - this.#placement(a, now));
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
    const end = this.#monthFormat.format(endDate);
    return start === end ? start : `${start} – ${end}`;
  }

  /**
   * Where an item sits on the timeline. An era is placed by its start, which is the foot of its L,
   * and a project by its most recent work. Sorting on that alone puts an era's card below the
   * projects that ended during it, and leaves a project whose work began earlier free to reach
   * back past it.
   *
   * @param item The era or project being placed.
   * @param now Stands in for the end of anything still ongoing.
   */
  #placement(item: TimelineItem, now: Date): number {
    return item.kind === TimelineItemKind.Era
      ? item.startDate.getTime()
      : (item.endDate ?? now).getTime();
  }
}

const timelineService = new TimelineService();
export default timelineService;
