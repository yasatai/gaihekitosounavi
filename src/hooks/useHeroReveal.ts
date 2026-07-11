import { useEffect } from 'react';

/**
 * Heroのコピーを、オープニング終了後に「すりガラスが晴れる」ように順番に表示する。
 * - html.is-loaded（オープニング終了）を合図に開始
 * - DOM順に DELAYS のタイミングで 1つずつ表示（title「確かな…」= 1.0秒）
 * - 表示途中でスクロールされたら、残りを即時表示（時間を待たない）
 * - reduced-motion 時は即時すべて表示。モバイルでも同じロジックで動作。
 */
const DELAYS = [800, 1000, 1450, 1800, 2100]; // ms（[data-hero-reveal] のDOM順に対応）

export function useHeroReveal() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('[data-hero]');
    if (!hero) return;
    const items = Array.from(hero.querySelectorAll<HTMLElement>('[data-hero-reveal]'));
    if (!items.length) return;

    const showAllNow = () => items.forEach((el) => el.classList.add('is-in'));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showAllNow();
      return;
    }

    const timers: number[] = [];
    let started = false;

    const onScroll = () => {
      if (window.scrollY > 2) forceReveal();
    };

    // 途中スクロール時: 予約中のタイマーを止めて残りを即時表示
    const forceReveal = () => {
      timers.forEach((t) => window.clearTimeout(t));
      timers.length = 0;
      showAllNow();
      window.removeEventListener('scroll', onScroll);
    };

    const start = () => {
      if (started) return;
      started = true;
      items.forEach((el, i) => {
        const delay = DELAYS[i] ?? DELAYS[DELAYS.length - 1] + (i - DELAYS.length + 1) * 300;
        timers.push(window.setTimeout(() => el.classList.add('is-in'), delay));
      });
      window.addEventListener('scroll', onScroll, { passive: true });
    };

    const root = document.documentElement;
    let observer: MutationObserver | null = null;
    if (root.classList.contains('is-loaded')) {
      start();
    } else {
      observer = new MutationObserver(() => {
        if (root.classList.contains('is-loaded')) {
          observer?.disconnect();
          observer = null;
          start();
        }
      });
      observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    }

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener('scroll', onScroll);
      observer?.disconnect();
    };
  }, []);
}
