import { type Project } from 'shared';
import TextButton from '../../TextButton';
import styles from './ProjectCardActions.module.css';

/**
 * A project's demo and source links.
 */
export default function ProjectCardActions({ project }: { project: Project }) {
  return (
    <div className={styles.links}>
      {project.demoLink ? <TextButton text="demo" url={project.demoLink} /> : null}
      <TextButton text="source" url={project.codeLink} />
    </div>
  );
}
