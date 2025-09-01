import Link from '$components/Link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className="header-6">
        See the code for this website{' '}
        <Link
          linkText="here!"
          url="https://github.com/aneuhold/portfolio"
          ariaLabel="Portfolio GitHub Repo"
        />
      </span>
      <span className="subtitle-1">©{new Date().getFullYear()} Anton Neuhold</span>
    </footer>
  );
}
