import { eras, type Era } from '../config/eras';
import { projects, ProjectTier, type Project } from '../config/projects';
import { TimelineItemKind } from '../types/TimelineItemBase';

/**
 * Derives the timeline from the era and project data. Nothing links a project to an era in the
 * data itself, so both the order and the placements are worked out here from the dates alone.
 */
class TimelineService {
  #timeline?: TimelineEntry[];

  readonly #monthFormat = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  });

  /**
   * Every era and project in one reverse chronological list, so scrolling down moves backwards
   * through time, with the grid placement of each. Built once and reused.
   */
  build(): TimelineEntry[] {
    const timeline = this.#timeline ?? this.#buildTimeline();
    this.#timeline = timeline;
    return timeline;
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

  #buildTimeline(): TimelineEntry[] {
    const now = new Date();
    const items: TimelineItem[] = [...Object.values(eras), ...Object.values(projects)];
    items.sort((a, b) => this.#cardDate(b, now) - this.#cardDate(a, now));
    return this.#placeItems(items, now);
  }

  /**
   * Gives every item its row, and the number of lanes taken up beside it by the project rails
   * that pass through that row.
   *
   * A card inset by a given number of lanes still reaches the edge of the innermost lane it clears,
   * so it would overlap a rail running down that lane. Every item is therefore inset past all the
   * rails crossing its row, and a project's own rail runs down the next lane out. A lane is free
   * again for a later item once the rail in it has reached its project's start date.
   *
   * @param items The ordered timeline.
   * @param now Stands in for the end of anything still ongoing.
   */
  #placeItems(items: TimelineItem[], now: Date): TimelineEntry[] {
    const laneLastRows: number[] = [];
    let previousEraRow = 0;

    return items.map((item, index) => {
      const row = index + 1;
      const lane = laneLastRows.reduce(
        (depth, lastRow, index) => (lastRow >= row ? index + 1 : depth),
        0
      );
      let railLine: number;

      if (item.kind === TimelineItemKind.Era) {
        railLine = previousEraRow + 1;
        previousEraRow = row;
      } else if (item.tier === ProjectTier.Compact) {
        railLine = row + 1;
      } else {
        railLine = this.#projectRailLine(items, item, now);
        laneLastRows[lane] = railLine - 1;
      }

      return { item, placement: { row, railLine, lane } };
    });
  }

  /**
   * The grid line a project's rail reaches: the line between the last item newer than the project's
   * start date and the first item older than it, which is where that date falls in the order.
   *
   * @param items The ordered timeline.
   * @param project The project whose rail is being measured.
   * @param now Stands in for the end of anything still ongoing.
   */
  #projectRailLine(items: TimelineItem[], project: Project, now: Date): number {
    const startTime = project.startDate.getTime();
    const firstOlder = items.findIndex((item) => this.#cardDate(item, now) < startTime);
    return (firstOlder === -1 ? items.length : firstOlder) + 1;
  }

  /**
   * The date an item's card is placed by: an era's start date, and a project's end date, or today
   * while it is ongoing. Sorting on that alone puts an era's card below every project that ended
   * during it, and leaves a project that started earlier free to reach back past it.
   *
   * @param item The era or project being placed.
   * @param now Stands in for the end of anything still ongoing.
   */
  #cardDate(item: TimelineItem, now: Date): number {
    return item.kind === TimelineItemKind.Era
      ? item.startDate.getTime()
      : (item.endDate ?? now).getTime();
  }
}

const timelineService = new TimelineService();

export { timelineService };

/**
 * One element of the timeline, with the grid placement worked out for it.
 */
type TimelineEntry = {
  item: TimelineItem;
  placement: TimelinePlacement;
};

/**
 * An era or a project.
 */
type TimelineItem = Era | Project;

/**
 * Where an item sits on the page grid.
 */
export type TimelinePlacement = {
  /**
   * The row the item's card occupies.
   */
  row: number;
  /**
   * The grid line the item's rail reaches: above the card for an era, whose rail runs up to where
   * the era ended, and below it for a project, whose rail runs down to where the project started.
   */
  railLine: number;
  /**
   * How many lanes are in use to the item's right, which is both how far its card stops short of
   * the edge and, for a project, the lane its own rail runs down.
   */
  lane: number;
};
