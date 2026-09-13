import { type Era, type TimelinePlacement } from 'shared';
import styles from './EraRail.module.css';

/**
 * An era's stretch of the era rail, running down from the era's card to the next era's card, with
 * a node level with the card's name and a faint connector across to it.
 */
export default function EraRail({ era, placement }: { era: Era; placement: TimelinePlacement }) {
  return (
    <div
      className={styles.rail}
      data-item={era.key}
      style={{
        '--row': placement.row,
        '--rail-grid-line': placement.railGridLine,
        '--era-depth': placement.eraDepth
      }}
    />
  );
}
