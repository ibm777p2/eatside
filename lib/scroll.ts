import type Lenis from 'lenis';

let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (instance) instance.scrollTo(el as HTMLElement, { offset: -60, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
}
