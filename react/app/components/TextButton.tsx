import styles from './TextButton.module.css';

type Props = {
  url: string;
  text: string;
};

export default function TextButton({ url, text }: Props) {
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
