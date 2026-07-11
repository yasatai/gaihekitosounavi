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
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px)', () => {
        const hero = document.querySelector('[data-hero]');
        const inner = document.querySelector('[data-hero-inner]');
        if (!hero || !inner) return;

        gsap.to(inner, {
          yPercent: -14,
          autoAlpha: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
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
