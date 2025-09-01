import { ReactNode } from 'react';
import styles from './CardGrid.module.css';

export default function CardGrid({ children }: { children: ReactNode }) {
  return <div className={styles.cardGrid}>{children}</div>;
}
