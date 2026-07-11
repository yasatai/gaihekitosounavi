import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Subtle scroll-linked parallax for the hero: the copy/CTA drift up and fade
 * as the hero scrolls out of view. Desktop only, and disabled for users who
 * prefer reduced motion.
 */
export function useHeroParallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const hero = document.querySelector('[data-hero]');
      const inner = document.querySelector('[data-hero-inner]');
      if (!hero || !inner) return;

      // Heroは sticky で固定され、次セクションが上に重なってくる。
      // その重なりが唐突に見えないよう、Heroの中身をスクロールに合わせて
      // 上へドリフトさせつつフェードアウト（全画面幅）。covered直前に消えるので滑らか。
      gsap.to(inner, {
        yPercent: -12,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          // Heroの下端が画面上端に来るまで（＝次セクションが覆い切るまで）にフェード完了
          end: 'bottom top',
          scrub: 0.4,
        },
      });
    });

    // Re-measure once images/fonts have settled.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      ctx.revert();
    };
  }, []);
}
