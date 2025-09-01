import TextButton from '../TextButton';
import styles from './Project.module.css';

type Props = {
  title: string;
  info: string;
  imgSrc: string;
  imgAlt: string;
  demoLink?: string;
  codeLink: string;
};

export default function Project({ title, info, imgSrc, imgAlt, demoLink, codeLink }: Props) {
  return (
    <article className={styles.projectCard}>
      <div className={styles.media} aria-label={imgAlt}>
        {/* 16:9 media wrapper; use absolutely positioned img */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.enhancedImage} src={imgSrc} alt={imgAlt} loading="lazy" />
      </div>
      <div className={styles.textContent}>
        <h3 className="header-4">{title}</h3>
        <p>{info}</p>
      </div>
      <div className={styles.footer}>
        {demoLink ? <TextButton text="demo" url={demoLink} /> : null}
        <TextButton text="source" url={codeLink} />
      </div>
    </article>
  );
}
