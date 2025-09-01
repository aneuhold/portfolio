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
      <span className="subtitle-2">
        Built with React & Next.js •{' '}
        <Link
          linkText="View SvelteKit version"
          url="https://tonyneuhold.com"
          ariaLabel="SvelteKit version of portfolio"
        />
      </span>
      <span className="subtitle-1">©{new Date().getFullYear()} Anton Neuhold</span>
    </footer>
  );
}
