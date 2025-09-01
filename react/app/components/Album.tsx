import projectImages, { getImageSrc } from '$lib/projectImages';
import projects, { type ProjectKey } from '$shared/config/projects';
import styles from './Album.module.css';

export default function Album() {
  return (
    <section id="projects" className={styles.container}>
      <div className={styles.cardGrid}>
        {Object.entries(projects).map(([key, card]) => (
          <article className={styles.projectCard} key={card.name}>
            <div className={styles.media} aria-label={card.thumbnailDescription}>
              {/* 16:9 media wrapper; use absolutely positioned img */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.enhancedImage}
                src={getImageSrc(projectImages[key as ProjectKey])}
                alt={card.thumbnailDescription}
                loading="lazy"
              />
            </div>
            <div className={styles.textContent}>
              <h3 className="header-4">{card.heading}</h3>
              <p>{card.info}</p>
            </div>
            <div className={styles.projectCardFooter}>
              {card.demoLink ? (
                <a
                  className="button-text"
                  href={card.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Demo
                </a>
              ) : null}
              <a
                className="button-text"
                href={card.codeLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
