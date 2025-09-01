import socialLinks from '$shared/config/socialLinks';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <div className={styles.hero}>
      <p className="header-4">
        <span>[Software Engineer]</span>
        <br />+
        <br />
        <i>&lt; Web Developer /&gt;</i>
      </p>
      <h1 className="header-2">Anton (Tony) Neuhold</h1>
      <p className={`header-6 ${styles.subtitle}`}>
        Hi! I'm a Senior Software Engineer with 4+ years of experience and a bachelors degree in
        Software Engineering from{' '}
        <a href="https://www.asu.edu/" target="_blank" rel="noopener noreferrer">
          Arizona State University
        </a>
        . I live in{' '}
        <a
          href="https://www.google.com/maps/place/Canby,+OR+97013/@45.2711453,-122.7227492,13z"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Canby, OR on Google Maps"
        >
          Canby, OR
        </a>
        .
        <br />
        <br />
        When not working, or learning new things about development, I like to exercise and hang out
        with my three pets and beautiful wife. Check out some social media links and projects below:
      </p>

      <div className={styles.heroButtons}>
        {socialLinks.map((obj) => (
          <a
            key={obj.name}
            className={styles.svgLink}
            href={obj.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={obj.name}
            title={obj.name}
          >
            <svg className={styles.svgIcon} viewBox="0 0 24 24" role="img">
              <title>{obj.name}</title>
              <path d={obj.svgIconPath} />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
