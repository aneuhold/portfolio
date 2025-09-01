import Image, { type StaticImageData } from 'next/image';
import TextButton from '../TextButton';
import styles from './Project.module.css';

type Props = {
  title: string;
  info: string;
  imgSrc: StaticImageData;
  imgAlt: string;
  demoLink?: string;
  codeLink: string;
};

export default function Project({ title, info, imgSrc, imgAlt, demoLink, codeLink }: Props) {
  return (
    <article className={styles.projectCard}>
      <div className={styles.media} aria-label={imgAlt}>
        {/* 16:9 media wrapper; use Next.js Image with fill for responsive layout */}
        <Image
          className={styles.enhancedImage}
          src={imgSrc}
          alt={imgAlt}
          placeholder="blur"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
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
