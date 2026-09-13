import { type Project, timelineDatesService, type TimelinePlacement } from 'shared';
import styles from './ProjectRail.module.css';

/**
 * A project's part of the graph. Work that ran over a stretch of time gets a rail running up its
 * lane to the row where it ended, and a corner that turns it into the era rail, with a node and a
 * faint connector across to its card. Work that came and went on a single date gets a node on the
 * era rail.
 */
export default function ProjectRail({
  project,
  placement
}: {
  project: Project;
  placement: TimelinePlacement;
}) {
  const hasRailAbove = placement.railGridLine < placement.row;

  if (timelineDatesService.isSingleDate(project.startDate, project.endDate)) {
    return (
      <div
        className={styles.node}
        data-item={project.key}
        style={{ '--row': placement.row, '--era-depth': placement.eraDepth }}
      />
    );
  }

  return (
    <>
      <div
        className={`${styles.rail} ${hasRailAbove ? '' : styles.railStart}`}
        data-item={project.key}
        style={{
          '--row': placement.row,
          '--rail-grid-line': placement.railGridLine,
          '--grid-lane': placement.lane,
          '--grid-lane-span': placement.lane + 2
        }}
      />
      <div
        className={styles.corner}
        data-item={project.key}
        style={{
          '--row': placement.row,
          '--grid-lane': placement.lane,
          '--grid-lane-span': placement.lane + 2
        }}
      />
    </>
  );
}
