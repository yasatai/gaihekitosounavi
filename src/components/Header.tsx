import { useEffect, useRef, useState } from 'react';
import { useIsDesktop } from '../hooks/useMediaQuery';
import { navLinks } from '../data/nav';
import { LogoMark } from './Icons';
import styles from './Header.module.css';

export function Header() {
  const isDesktop = useIsDesktop();
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = () => setNavOpen(false);

  // ヘッダーバーの実高さを CSS 変数 --header-h に反映する。
  // Hero の sticky 位置（ヘッダー直下）やアンカーのオフセットが実測値に追従し、
  // 「Heroが一度ヘッダーの下に潜ってから固定される」二段階の動きを防ぐ。
  // ドロワー（モバイルメニュー）は含めず、バー部分のみを測る。
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const apply = () => {
      // +1 はヘッダー下線（border-bottom）ぶん
      document.documentElement.style.setProperty('--header-h', `${el.offsetHeight + 1}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.bar} ref={barRef}>
        <a href="#top" className={styles.brand}>
          <LogoMark />
          <span className={styles.brandText}>
            <span className={styles.brandJa}>外壁・屋根塗装ナビ</span>
            <span className={styles.brandEn}>MIYAGI PAINTING NAVI</span>
          </span>
        </a>

        {isDesktop ? (
          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
            <a href="#contact-link" className={styles.navCta}>
              無料相談
            </a>
          </nav>
        ) : (
          <button
            type="button"
            className={styles.toggle}
            aria-label="メニューを開く"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        )}
      </div>

      {!isDesktop && navOpen && (
        <div className={styles.drawer}>
          <div className={styles.drawerInner}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.drawerLink}
                onClick={closeNav}
              >
                {link.longLabel ?? link.label}
              </a>
            ))}
            <a href="#contact-link" className={styles.drawerCta} onClick={closeNav}>
              無料相談はこちら
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
