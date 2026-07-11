import { useEffect } from 'react';
import gsap from 'gsap';

/**
 * 施工事例: a full-screen stage whose cards auto-scroll sideways as a seamless
 * marquee (the items are rendered twice so the loop has no visible seam).
 * Pointer interaction (hover / touch) pauses it so a visitor can stop on a case
 * they like and use the before/after handle. No pinning — the page scrolls past
 * normally, so it can't collide with the neighbouring pinned sections.
 */
export function useHorizontalCases() {
  useEffect(() => {
    const sec = document.getElementById('sekou-link');
    if (!sec) return;

    sec.classList.add('is-stage', 'is-stage-cases', 'is-paint');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const track = sec.querySelector<HTMLElement>('[data-cases-track]');
    const viewport = sec.querySelector<HTMLElement>('.cases-viewport');
    if (reduce || !track) {
      return () => sec.classList.remove('is-stage', 'is-stage-cases', 'is-paint');
    }

    let tween: gsap.core.Tween | null = null;

    const build = () => {
      tween?.kill();
      gsap.set(track, { x: 0 });
      // The list is duplicated; shift = distance from the 1st item to its clone,
      // i.e. exactly one loop of the visible content (gap included).
      const half = track.children.length / 2;
      const first = track.children[0] as HTMLElement | undefined;
      const clone = track.children[half] as HTMLElement | undefined;
      if (!first || !clone) return;
      const shift = clone.offsetLeft - first.offsetLeft;
      if (shift <= 0) return;

      const speed = 55; // px / second
      tween = gsap.to(track, {
        x: -shift,
        duration: shift / speed,
        ease: 'none',
        repeat: -1,
      });
    };

    const start = window.setTimeout(build, 350);
    const onLoad = () => build();
    const onResize = () => build();
    window.addEventListener('load', onLoad);
    window.addEventListener('resize', onResize);

    const pause = () => tween?.pause();
    const resume = () => tween?.resume();
    const target = viewport ?? sec;
    target.addEventListener('pointerenter', pause);
    target.addEventListener('pointerleave', resume);

    return () => {
      window.clearTimeout(start);
      window.removeEventListener('load', onLoad);
      window.removeEventListener('resize', onResize);
      target.removeEventListener('pointerenter', pause);
      target.removeEventListener('pointerleave', resume);
      tween?.kill();
      sec.classList.remove('is-stage', 'is-stage-cases', 'is-paint');
    };
  }, []);
}
