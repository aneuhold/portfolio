import projectImages from '$lib/projectImages';
import projects from '$shared/config/projects';
import CardGrid from '../CardGrid';
import Project from './Project';
import styles from './Projects.module.css';

/**
 * Projects section component that displays a grid of project cards.
 * Fetches project data from configuration and renders each project as a card.
 */
export default function Projects() {
  return (
    <section id="projects" className={styles.container}>
      <CardGrid>
        {Object.entries(projects).map(([key, card], index) => (
          <Project
            key={card.name}
            title={card.name}
            info={card.info}
            imgSrc={projectImages[key]}
            imgAlt={card.thumbnailDescription}
            demoLink={card.demoLink}
            codeLink={card.codeLink}
            preload={index < 4} // Preload the first 4 images (likely above-the-fold)
          />
        ))}
      </CardGrid>
    </section>
  );
}
