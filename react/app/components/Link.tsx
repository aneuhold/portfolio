import styles from './Link.module.css';

export default function Link({
  url,
  linkText,
  ariaLabel
}: {
  url: string;
  linkText: string;
  ariaLabel: string;
}) {
  return (
    <a
      rel="noopener noreferrer"
      target="_blank"
      href={url}
      aria-label={ariaLabel}
      className={styles.link}
    >
      {linkText}
    </a>
  );
}
