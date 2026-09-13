import { timelineDatesService, TimelineItemKind, timelineService } from 'shared';
import styles from './TimelineOverview.module.css';

/**
 * The whole career to scale, pinned across the top of the cards on a narrow screen. Month columns
 * run from the earliest on the left to now on the right, with a bar for each era and a mark in a
 * lane for each project, linking to its card.
 */
export default function TimelineOverview() {
  const timeline = timelineService.build();
  const lanes = timelineService.assignLanesByOverlap(
    timeline.map(({ item }) => item).filter((item) => item.kind === TimelineItemKind.Project)
  );
  const laneCount = Math.max(...lanes.values()) + 1;
  const { monthColumnCount } = timelineDatesService;
  const yearStartGridLines = timelineDatesService.yearStartGridLines();

  // Each year runs to the start of the one after it, and the current year to the last month grid
  // line.
  const years = yearStartGridLines.map(({ year, gridLine }, index) => ({
    year,
    start: gridLine,
    end: index === 0 ? monthColumnCount + 1 : yearStartGridLines[index - 1].gridLine
  }));

  return (
    <nav
      className={styles.overview}
      aria-label="Career to scale"
      style={{ '--month-columns': monthColumnCount, '--overview-lanes': laneCount }}
    >
      {years.map(({ year, start, end }) => (
        <div key={year} className={styles.year} style={{ '--start': start, '--end': end }}>
          <span>{year}</span>
        </div>
      ))}
      {timeline.map(({ item, placement }) => {
        const { start, end } = timelineDatesService.monthGridLineRange(
          item.startDate,
          item.endDate
        );
        if (item.kind === TimelineItemKind.Era) {
          return (
            <div
              key={item.key}
              className={styles.era}
              data-item={item.key}
              style={{ '--era-depth': placement.eraDepth, '--start': start, '--end': end }}
            />
          );
        }
        const range = timelineDatesService.formatRange(item.startDate, item.endDate);
        const dotClass = timelineDatesService.isSingleDate(item.startDate, item.endDate)
          ? styles.dot
          : '';
        return (
          <a
            key={item.key}
            className={`${styles.mark} ${dotClass}`}
            href={`#project-${item.key}`}
            data-item={item.key}
            aria-label={`${item.name}, ${range}`}
            title={`${item.name}, ${range}`}
            style={{
              '--start': start,
              '--end': end,
              '--overview-lane': (lanes.get(item.key) ?? 0) + 1,
              '--grid-lane': placement.lane,
              '--era-depth': placement.eraDepth
            }}
          />
        );
      })}
    </nav>
  );
}
