import { type Project, timelineDatesService, type TimelinePlacement } from 'shared';
import Link from '../../Link';
import TimelineDates from '../TimelineDates';
import styles from './ProjectCard.module.css';
import ProjectCardContent from './ProjectCardContent';
import ProjectCardThumbnail from './ProjectCardThumbnail';

/**
 * One project. Work that ran over a stretch of time gets a card with its thumbnail, how long it
 * ran, and its summary and links. Work that came and went on a single date gets a dated row.
 */
export default function ProjectCard({
  project,
  placement,
  preload = false
}: {
  project: Project;
  placement: TimelinePlacement;
  /** Whether the thumbnail is preloaded, for a card likely to be among the first seen. */
  preload?: boolean;
}) {
  if (timelineDatesService.isSingleDate(project.startDate, project.endDate)) {
    return (
      <div
        className={styles.compactProject}
        id={`project-${project.key}`}
        data-item={project.key}
        style={{ '--row': placement.row, '--era-depth': placement.eraDepth }}
        data-year={placement.year}
      >
        <TimelineDates startDate={project.startDate} endDate={project.endDate} useMaxDateWidth />
        <Link url={project.codeLink} linkText={project.name} ariaLabel={project.name} />
      </div>
    );
  }

  return (
    <article
      className={styles.card}
      id={`project-${project.key}`}
      data-item={project.key}
      style={{ '--row': placement.row, '--grid-lane': placement.lane }}
      data-year={placement.year}
    >
      <div className={styles.media}>
        <ProjectCardThumbnail project={project} preload={preload} />
        <TimelineDates startDate={project.startDate} endDate={project.endDate} useDuration />
      </div>
      <ProjectCardContent project={project} />
    </article>
  );
}
