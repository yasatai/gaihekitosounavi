import { useIsDesktop } from '../hooks/useMediaQuery';
import styles from './FloatingCta.module.css';

export function FloatingCta() {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return null;
  }

  return (
    <a href="#contact-link" className={styles.mobile}>
      無料相談はこちら
    </a>
  );
}
