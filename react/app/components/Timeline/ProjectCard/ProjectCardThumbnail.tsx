import ExportedImage from 'next-image-export-optimizer';
import { type Project } from 'shared';
import projectImages from '../../../lib/projectImages';
import styles from './ProjectCardThumbnail.module.css';

/**
 * A project's thumbnail image.
 */
export default function ProjectCardThumbnail({
  project,
  preload = false
}: {
  project: Project;
  /** Whether the image is preloaded, for a card likely to be among the first seen. */
  preload?: boolean;
}) {
  return (
    <ExportedImage
      className={styles.thumbnail}
      src={projectImages[project.key]}
      alt={project.thumbnailDescription}
      placeholder="blur"
      sizes="(min-resolution: 2x) 600px, 300px"
      preload={preload}
      loading={preload ? 'eager' : 'lazy'}
    />
  );
}
