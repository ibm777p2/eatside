'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './Logo';
import { nav } from '@/lib/content';
import { scrollToHash } from '@/lib/scroll';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToHash(href);
  };

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#top" onClick={(e) => go(e, '#top')} aria-label="Eatside home">
            <Logo />
          </a>
          <nav className="nav-links" aria-label="Primary">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)}>
                {n.label}
              </a>
            ))}
          </nav>
          <a className="btn btn-primary nav-cta" href="#join" onClick={(e) => go(e, '#join')}>
            Join the residency <span className="arrow">→</span>
          </a>
          <button className="nav-burger" aria-label="Open menu" onClick={() => setOpen(true)}>
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 92% 5%)' }}
            animate={{ clipPath: 'circle(150% at 92% 5%)' }}
            exit={{ clipPath: 'circle(0% at 92% 5%)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-menu-top">
              <Logo className="" />
              <button className="nav-burger" aria-label="Close menu" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>
            <nav aria-label="Mobile">
              {nav.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={(e) => go(e, n.href)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6 }}
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <a className="btn btn-primary" href="#join" onClick={(e) => go(e, '#join')}>
              Join the residency <span className="arrow">→</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
