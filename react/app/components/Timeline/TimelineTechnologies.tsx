import { technologies, type TechnologyGroup } from 'shared';
import styles from './TimelineTechnologies.module.css';

/**
 * The technologies behind a timeline item, grouped by the layer of the system they make up, in one
 * split badge per layer like the status badges at the top of a README: the layer's name on a tinted
 * cap, then the logo and name of each technology in it.
 */
export default function TimelineTechnologies({
  technologyGroups,
  onDarkGround = false
}: {
  technologyGroups: TechnologyGroup[];
  /** Whether the badges sit on a dark ground, which the layer's cap is tinted to read against. */
  onDarkGround?: boolean;
}) {
  return (
    <ul
      className={`${styles.badges} ${onDarkGround ? styles.onDarkGround : ''}`}
      aria-label="Technologies by layer"
    >
      {technologyGroups.map((group) => (
        <li key={group.layer} className={styles.badge}>
          <span className={styles.layer}>{group.layer}</span>
          <ul className={styles.stack}>
            {group.technologies.map((technology) => {
              const { name, svgIconPath } = technologies[technology];
              return (
                <li key={technology}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={svgIconPath} />
                  </svg>
                  {name}
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}
