import projectImages, { getImageSrc } from '$lib/projectImages';
import projects, { type ProjectKey } from '$shared/config/projects';
import CardGrid from '../CardGrid';
import Project from './Project';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section id="projects" className={styles.container}>
      <CardGrid>
        {Object.entries(projects).map(([key, card]) => (
          <Project
            key={card.name}
            title={card.heading}
            info={card.info}
            imgSrc={getImageSrc(projectImages[key as ProjectKey])}
            imgAlt={card.thumbnailDescription}
            demoLink={card.demoLink}
            codeLink={card.codeLink}
          />
        ))}
      </CardGrid>
    </section>
  );
}
