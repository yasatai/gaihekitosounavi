import { useEffect } from 'react';

/**
 * モバイルのみ: Heroを「スクロールで全内容を見せてから固定」する2段階演出。
 *
 * 仕組み:
 *   Heroが画面より高いとき、sticky の top を負の値にすると、Heroは下端が画面内
 *  （下部ナビの上）に来るまで普通にスクロールし、そこで固定される。固定後は
 *   従来どおり次セクション(.over-hero)が z-index で上に重なって上がってくる。
 *   → 「①スクロールで全部見せる → ②固定 → ③次セクションが重なる」を実現。
 *
 *   top = min(ヘッダー高, 画面高 − 下部ナビ高 − Hero内容高 − 余白)
 *     - 内容が画面に収まる → min はヘッダー高 = 即固定（従来と同じ）
 *     - 内容が画面より高い → 負値 = スクロールで全部見せてから固定
 *
 * PC(min-width:900px)は対象外（CSS側で top:var(--header-h) の即固定を使う）。
 * 値は CSS変数 --hero-sticky-top に入れ、Hero.module.css/global.css 側で参照する。
 */
export function useHeroPin() {
  useEffect(() => {
    const root = document.documentElement;
    const mql = window.matchMedia('(max-width: 899px)');
    const BUFFER = 12; // 内容下端と下部ナビの間に取る最小の余白

    const compute = () => {
      // PCでは無効化（stale値を残さないよう変数を消す）
      if (!mql.matches) {
        root.style.removeProperty('--hero-sticky-top');
        return;
      }
      const hero = document.querySelector<HTMLElement>('[data-hero]');
      const inner = hero?.querySelector<HTMLElement>('[data-hero-inner]');
      const content = inner?.firstElementChild as HTMLElement | null;
      if (!hero || !inner || !content) return;

      const headerH = parseFloat(getComputedStyle(root).getPropertyValue('--header-h')) || 69;
      const nav = document.querySelector<HTMLElement>('nav[aria-label="セクションメニュー"]');
      const navH = nav ? nav.offsetHeight : 0;
      const padTop = parseFloat(getComputedStyle(inner).paddingTop) || 0;
      // Hero上端から内容(注記)下端までの高さ。min-height由来の余白は含めない。
      const heroContentH = padTop + content.offsetHeight;

      const stickyTop = Math.min(headerH, window.innerHeight - navH - heroContentH - BUFFER);
      root.style.setProperty('--hero-sticky-top', `${Math.round(stickyTop)}px`);
    };

    compute();

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    window.addEventListener('resize', schedule);
    window.addEventListener('orientationchange', schedule);
    window.addEventListener('load', schedule);
    mql.addEventListener('change', schedule);

    // 内容の高さが変わる要因（フォント読込・折返し変化）に追従
    const hero = document.querySelector<HTMLElement>('[data-hero]');
    const ro = hero ? new ResizeObserver(schedule) : null;
    if (hero && ro) ro.observe(hero);
    document.fonts?.ready.then(schedule).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('orientationchange', schedule);
      window.removeEventListener('load', schedule);
      mql.removeEventListener('change', schedule);
      ro?.disconnect();
    };
  }, []);
}
