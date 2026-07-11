import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LogoMarkLight } from './Icons';
import styles from './Loader.module.css';

export function Loader() {
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const jaRef = useRef<HTMLSpanElement>(null);
  const enRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add('is-loading');
    // ここで確実に manual にしておくと、ブラウザがリロード時に前回位置へ復元しないので、
    // そもそも復元→Heroへスクロールという動き自体が起きない（Heroが最初から表示される）。
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const reveal = () => {
      root.classList.add('is-loaded');
      // Section positions are final now that scroll is unlocked — recompute triggers.
      ScrollTrigger.refresh();
    };
    const finish = () => {
      root.classList.remove('is-loading');
      reveal();
      // コンテンツの高さが確定したこの時点で先頭へ固定（アニメーションなし）。
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }));
      setDone(true);
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      finish();
      return;
    }

    // Safety net: never leave the site trapped behind the curtain.
    const failSafe = window.setTimeout(finish, 4000);

    const ctx = gsap.context(() => {
      gsap.set([markRef.current, jaRef.current, enRef.current], { autoAlpha: 0, y: 14 });
      gsap.set(lineRef.current, { scaleX: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          window.clearTimeout(failSafe);
          finish();
        },
      });

      tl.to(markRef.current, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' })
        .to([jaRef.current, enRef.current], { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 }, '-=0.2')
        .to(lineRef.current, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, '-=0.15')
        .to({}, { duration: 0.35 })
        .to(overlayRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          onStart: reveal,
        });
    });

    return () => {
      window.clearTimeout(failSafe);
      ctx.revert();
    };
  }, []);

  if (done) return null;

  return (
    <div className={styles.overlay} ref={overlayRef} aria-hidden>
      <div className={styles.inner}>
        <div className={styles.mark} ref={markRef}>
          <LogoMarkLight size={56} />
        </div>
        <div className={styles.brand}>
          <span className={styles.ja} ref={jaRef}>
            外壁・屋根塗装ナビ
          </span>
          <span className={styles.en} ref={enRef}>
            MIYAGI PAINTING NAVI
          </span>
        </div>
        <div className={styles.line} ref={lineRef} />
      </div>
    </div>
  );
}
