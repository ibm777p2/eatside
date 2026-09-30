'use client';

import { useEffect, useState, type RefObject } from 'react';

/** Tracks whether an element is near the viewport. `once` keeps it true after the first hit. */
export function useInView(ref: RefObject<Element | null>, { rootMargin = '200px', once = false } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, once]);

  return inView;
}
