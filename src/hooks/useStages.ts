import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Hero以降の各セクション。全て共通の背景写真（/section-bg.jpg）を「固定」で敷く
// （global.css の .is-paint::before が background-attachment: fixed）。
// そのため、スクロールしても背景は動かず、文字（内容）だけがスクロールで流れて動く。
// 内容（[data-stage-item]）はセクションが入ってくる時に1つずつ表示する。
// Cases (#sekou-link) は useHorizontalCases 側で背景を付与。
const STAGE_IDS = [
  'shindan-link',
  'hikaku-link',
  'service-link',
  'riyuu-link',
  'koe-link',
  'meyasu-link',
  'faq-link',
  'contact-link',
];

export function useStages() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const applied: HTMLElement[] = [];
    STAGE_IDS.forEach((id) => {
      const sec = document.getElementById(id);
      if (!sec) return;
      sec.classList.add('is-stage', 'is-paint');
      applied.push(sec);
    });

    const cleanupClasses = () => applied.forEach((s) => s.classList.remove('is-stage', 'is-paint'));

    if (reduce) {
      return cleanupClasses;
    }

    const ctx = gsap.context(() => {
      applied.forEach((sec) => {
        const items = gsap.utils.toArray<HTMLElement>(sec.querySelectorAll('[data-stage-item]'));
        if (!items.length) return;
        // セクションが入ってくる時に、内容を下から1つずつ（stagger）表示。
        // immediateRender:false → 初期状態を焼き付けないので、発火し損ねてもズレない。
        gsap.from(items, {
          autoAlpha: 0,
          y: 60,
          ease: 'power2.out',
          duration: 0.9,
          stagger: 0.18,
          immediateRender: false,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: sec, start: 'top 72%', once: true },
        });
      });
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      ctx.revert();
      cleanupClasses();
    };
  }, []);
}
