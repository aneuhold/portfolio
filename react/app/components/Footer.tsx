import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className="header-6">
        See the code for this website{' '}
        <a href="https://github.com/aneuhold/portfolio" rel="noopener noreferrer" target="_blank">
          here!
        </a>
      </span>
      <span className="subtitle-1">©{new Date().getFullYear()} Anton Neuhold</span>
    </footer>
  );
}
