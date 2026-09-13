import { type Project } from 'shared';
import TimelineDates from '../TimelineDates';
import TimelineTechnologies from '../TimelineTechnologies';
import ProjectCardActions from './ProjectCardActions';
import styles from './ProjectCardContent.module.css';

/**
 * A project's text, technologies, and links.
 */
export default function ProjectCardContent({ project }: { project: Project }) {
  return (
    <div className={styles.cardContent}>
      <div className={styles.cardText}>
        <h3 className="header-6">{project.name}</h3>
        <TimelineDates startDate={project.startDate} endDate={project.endDate} />
        <p className={styles.info}>{project.info}</p>
        <div className={styles.technologies}>
          <TimelineTechnologies technologyGroups={project.technologyGroups} />
        </div>
      </div>
      <ProjectCardActions project={project} />
    </div>
  );
}
