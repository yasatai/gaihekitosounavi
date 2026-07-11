import { useLayoutEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  /** small extra delay before the entrance starts */
  delay?: boolean;
  className?: string;
  as?: 'div' | 'section';
  /** animate direct children one-by-one (staggered) instead of the block as a whole */
  stagger?: boolean;
}

export function Reveal({
  children,
  delay = false,
  className = '',
  as = 'div',
  stagger = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : el;
      gsap.from(targets, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power2.out',
        delay: delay ? 0.08 : 0,
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: {
          trigger: el,
          start: 'top 84%',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, stagger]);

  const Tag = as;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
