import { useEffect, useRef, useState } from 'react';
import { useIsDesktop } from '../hooks/useMediaQuery';
import styles from './BottomNav.module.css';

// ボトムナビ（モバイル専用）: 各セクションへのメニュー。
// スクロール中のセクションをハイライトし、そのピルがバー内に見えるよう自動スクロールする。
const items = [
  { id: 'shindan-link', label: '診断' },
  { id: 'hikaku-link', label: '比較' },
  { id: 'service-link', label: 'サービス' },
  { id: 'riyuu-link', label: '選ばれる理由' },
  { id: 'sekou-link', label: '施工事例' },
  { id: 'koe-link', label: 'お客様の声' },
  { id: 'meyasu-link', label: '費用目安' },
  { id: 'faq-link', label: 'FAQ' },
  { id: 'contact-link', label: '無料相談' },
];

export function BottomNav() {
  const isDesktop = useIsDesktop();
  const [active, setActive] = useState<string | null>(null);
  const barRef = useRef<HTMLElement>(null);

  // 現在表示中のセクションを判定（画面の中央より上を基準線にする）
  useEffect(() => {
    if (isDesktop) return;
    let raf = 0;
    const update = () => {
      const line = window.innerHeight * 0.45;
      let current: string | null = null;
      for (const it of items) {
        const sec = document.getElementById(it.id);
        if (!sec) continue;
        const r = sec.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) {
          current = it.id;
          break;
        }
      }
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isDesktop]);

  // アクティブなピルがバーの見える位置に来るよう、バー内だけを横スクロール
  useEffect(() => {
    const bar = barRef.current;
    if (!bar || !active) return;
    const pill = bar.querySelector<HTMLElement>(`a[data-id="${active}"]`);
    if (!pill) return;
    const target = pill.offsetLeft - (bar.clientWidth - pill.offsetWidth) / 2;
    bar.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [active]);

  if (isDesktop) return null;

  return (
    <nav ref={barRef} className={styles.bar} aria-label="セクションメニュー">
      {items.map((it) => {
        const isContact = it.id === 'contact-link';
        const on = active === it.id;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            data-id={it.id}
            className={[
              styles.pill,
              isContact ? styles.contact : '',
              on ? styles.active : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-current={on ? 'true' : undefined}
          >
            {it.label}
          </a>
        );
      })}
    </nav>
  );
}
