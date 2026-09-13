import { Fragment } from 'react';
import {
  type Era,
  TextColor,
  TimelineDatesSize,
  type TimelinePlacement,
  timelineService
} from 'shared';
import styles from './EraCard.module.css';
import TimelineDates from './TimelineDates';
import TimelineTechnologies from './TimelineTechnologies';

/**
 * The card heading its era, saying who it was with, when, for how long, what it amounted to, and
 * the technologies behind it. On a narrow screen, where there are no project rails, the card also
 * names the projects still running from before the era began.
 */
export default function EraCard({ era, placement }: { era: Era; placement: TimelinePlacement }) {
  const projectsRunningAtStart = timelineService.projectsRunningAtStart(era);

  return (
    <section
      className={styles.card}
      data-item={era.key}
      style={{ '--row': placement.row, '--era-depth': placement.eraDepth }}
      data-year={placement.year}
    >
      <h2 className="header-4">{era.name}</h2>
      <p className={styles.tenure}>
        <TimelineDates
          startDate={era.startDate}
          endDate={era.endDate}
          useDuration
          size={TimelineDatesSize.Large}
          color={TextColor.Inherit}
        />
      </p>
      <TimelineDates startDate={era.startDate} endDate={era.endDate} />
      <p className={styles.info}>{era.info}</p>
      <div className={styles.technologies}>
        <TimelineTechnologies technologyGroups={era.technologyGroups} onDarkGround />
      </div>
      {projectsRunningAtStart.length > 0 ? (
        <p className={styles.runningAtStart}>
          Still running from before:{' '}
          {projectsRunningAtStart.map((project, index) => (
            <Fragment key={project.key}>
              {index > 0 ? ', ' : ''}
              <a href={`#project-${project.key}`}>{project.name}</a>
            </Fragment>
          ))}
        </p>
      ) : null}
    </section>
  );
}
