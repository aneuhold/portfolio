import { eras, type Era } from '../config/eras';
import { projects, type Project } from '../config/projects';
import { TimelineItemKind, type TimelineItemBase } from '../types/TimelineItemBase';
import { timelineDatesService } from './TimelineDates.service';

/**
 * Derives the timeline from the era and project data. Nothing links a project to an era in the
 * data itself, so the order, lanes, and rails are all worked out here from the dates alone: each
 * era's card sits above the projects started during it, and each project sits at the month it
 * started.
 */
class TimelineService {
  #timeline?: TimelineEntry[];

  readonly #erasNewestFirst: Era[] = Object.values(eras).sort(
    (a, b) => b.startDate.getTime() - a.startDate.getTime()
  );

  readonly #projectsNewestFirst: Project[] = Object.values(projects).sort(
    (a, b) => b.startDate.getTime() - a.startDate.getTime()
  );

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
   * Gives each item the lowest-numbered lane that is free for its whole range, so no two
   * overlapping items share one. The earliest start takes lane 0, and a lane is free again once the
   * range in it has ended.
   *
   * @param items The eras or projects that need lanes, in any order.
   */
  assignLanesByOverlap(items: TimelineItemBase[]): Map<string, number> {
    const laneEnds: number[] = [];
    const lanes = new Map<string, number>();
    const byStart = [...items].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    for (const item of byStart) {
      const { start, end } = timelineDatesService.monthGridLineRange(item.startDate, item.endDate);
      const freeLane = laneEnds.findIndex((laneEnd) => laneEnd <= start);
      const lane = freeLane === -1 ? laneEnds.length : freeLane;
      laneEnds[lane] = end;
      lanes.set(item.key, lane);
    }
    return lanes;
  }

  /**
   * The projects started before an era that were still running when it began, the most recent
   * first.
   *
   * @param era The era whose start the projects run past.
   */
  projectsRunningAtStart(era: Era): Project[] {
    const eraStart = timelineDatesService.monthGridLineRange(era.startDate, era.endDate).start;
    return this.#projectsNewestFirst.filter((project) => {
      const { start, end } = timelineDatesService.monthGridLineRange(
        project.startDate,
        project.endDate
      );
      return start < eraStart && end > eraStart;
    });
  }

  /**
   * Orders every era and project into rows, then places each one.
   *
   * Lanes are counted out from the era rail, with the most recently started project rails nearest
   * it. A project rail then turns into the era rail below every project rail still running beside
   * it, so its corner never crosses another rail.
   */
  #buildTimeline(): TimelineEntry[] {
    // Sorting is stable, so projects started in the same month keep their newest first order.
    const items: TimelineItem[] = [...this.#erasNewestFirst, ...this.#projectsNewestFirst].sort(
      (a, b) => this.#cardMonthGridLine(b) - this.#cardMonthGridLine(a)
    );
    const assignedLanes = this.assignLanesByOverlap(
      this.#projectsNewestFirst.filter(
        (project) => !timelineDatesService.isSingleDate(project.startDate, project.endDate)
      )
    );
    const laneCount = Math.max(0, ...assignedLanes.values()) + 1;
    const yearStartGridLines = timelineDatesService.yearStartGridLines();
    let previousYear: number | undefined;
    let eraDepth = 0;

    return items.map((item, index) => {
      const row = index + 1;
      const cardMonthGridLine = this.#cardMonthGridLine(item);
      const rowYear = yearStartGridLines.find(
        ({ gridLine }) => gridLine <= cardMonthGridLine
      )?.year;
      const year = rowYear === previousYear ? undefined : rowYear;
      previousYear = rowYear;
      let railGridLine = row + 1;
      let lane = 0;

      if (item.kind === TimelineItemKind.Era) {
        eraDepth = this.#eraDepth(item);
        const nextEra = items.findIndex(
          (other, otherIndex) => otherIndex > index && other.kind === TimelineItemKind.Era
        );
        railGridLine = (nextEra === -1 ? items.length : nextEra) + 1;
      } else {
        const assignedLane = assignedLanes.get(item.key);
        if (assignedLane !== undefined) {
          const { end } = timelineDatesService.monthGridLineRange(item.startDate, item.endDate);
          lane = laneCount - 1 - assignedLane;
          railGridLine = items.findIndex((other) => this.#cardMonthGridLine(other) < end) + 1;
        }
      }

      return { item, placement: { row, railGridLine, lane, eraDepth, year } };
    });
  }

  /**
   * The `eraDepth` of an era's own row. Used for coloring mainly.
   *
   * @param era The era being measured.
   */
  #eraDepth(era: Era): number {
    return this.#erasNewestFirst.indexOf(era);
  }

  /**
   * The month grid line an item's card is ordered by: a project's start, and halfway through an
   * era's last month column, so an era's card sits above everything started during it and below
   * anything started in the month it ended.
   *
   * @param item The era or project being ordered.
   */
  #cardMonthGridLine(item: TimelineItem): number {
    const { start, end } = timelineDatesService.monthGridLineRange(item.startDate, item.endDate);
    return item.kind === TimelineItemKind.Era ? end - 0.5 : start;
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
 * Where an item sits on the timeline grid.
 */
export type TimelinePlacement = {
  /**
   * The row the item's card occupies. A row is one slot of the timeline grid, holding one era card,
   * project card, or dated row.
   */
  row: number;
  /**
   * The row grid line the item's rail reaches: below the card for an era, and above the card for a
   * project.
   *
   * A row grid line is a grid line between rows of the timeline grid. A rail is a drawn vertical
   * bar. An era rail runs down from an era card to the next era's card. A project rail runs up its
   * lane from a project card to the row where the project ended, or to the top while it is still
   * running.
   */
  railGridLine: number;
  /**
   * The lane a project's rail runs in, counted out from the era rail starting at 0.
   *
   * A lane is a grid track holding project ranges that never overlap, so no two rails or marks in
   * it collide. In the timeline it is a narrow column between the era rail and the cards; in the
   * overview it is a row.
   */
  lane: number;
  /**
   * How many eras back from the present the era rail beside the row sits, so color can carry
   * recency. 0 is the most recent era.
   */
  eraDepth: number;
  /**
   * The calendar year, present only on the first row down the timeline that falls in it.
   */
  year: number | undefined;
};
