import styles from './TextButton.module.css';

export default function TextButton({ url, text }: { url: string; text: string }) {
  return (
    <a
      className={`button-text ${styles.button}`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  );
}
